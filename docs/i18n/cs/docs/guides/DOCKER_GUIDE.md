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

## Rychlý běh

> **Vlastní hostitel v jednom příkazu?** Viz [Průvodce vlastním hostitelem](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (publikovaný obrázek + Redis, pouze zpětná smyčka, bez volby profilu). Níže uvedené Rychlé spuštění je cesta s jedním kontejnerem pro uživatele, kteří již spouštějí Redis jinde.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Se souborem prostředí

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

## Fáze dockerfile

Úložiště dodává vícestupňový soubor Dockerfile (`Dockerfile`). Jsou vystaveny čtyři stupně; vyberte ten správný `target` pro váš případ použití.

| Fáze          | Základní obrázek      | Účel                                                                                                                                                                                                                                                                                                    |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Nainstaluje deps (`npm ci --legacy-peer-deps`) a spustí `npm run build` (Turbopack ve výchozím nastavení — viz zdroje v době sestavení níže)                                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | Produkční běh se samostatným výstupem Next.js.** Žádný poskytovatel CLIs není součástí balíčku.**                                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | Přidá `git`, `docker.io`, `docker-compose` a globální CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Vyberte toto pro agentní pracovní postupy.**                                                                                                                           |
| `runner-web`  | `runner-base`         | Přidává Playwright + prohlížeč Chromium (`--with-deps`) pro poskytovatele webových relací: `gemini-web`, `claude-web`, `claude-turnstile`.** Tuto možnost vyberte, když tyto poskytovatele používáte** — prostý obrázek selže v okamžiku požadavku bez něj (viz poznámka `-web` v části Kanály vydání). |

Ručně vytvořte konkrétní cíl:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Sestavte-time zdroje

Tři sestavovací argumenty řídí, kolik stojí fáze `builder`. Jsou pouze v době sestavení — `OMNIROUTE_MEMORY_MB` (níže) je samostatný, runtime knoflík.

| Sestavte arg                | Výchozí | Účinek                                                                          |
| --------------------------- | ------- | ------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | `0` se staví s webpackem: nižší špičková paměť, pomalejší. `1` volí Turbopack.  |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | Strop haldy V8 (`--max-old-space-size`) pro vytvořený `next build`.             |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Zdroje `CIRCLE_NODE_TOTAL`; Dále odvodí `workers = N - 1` pro sběr dat stránky. |

`OMNIROUTE_BUILD_WORKERS` je ta, která se má zvýšit na velkém staviteli a ta, kterou podezříváte, když omezená stavba zemře** po** `✓ Compiled successfully`. Každý pracovník s daty stránek je svým vlastním procesem, stejně jako samotný nadřazený `next build` ; živá reprodukce VPS (vydání #7518) měřila vrchol RSS každého procesu při ~ 4,5 GB nezávisle na příznaku haldy `NODE_OPTIONS` (Turbopack se kompiluje v paměti native/Rust mimo haldu V8). Výchozí hodnota `2` (→ 1 pracovník, celkem 2 procesy) je dimenzována pro 16 GB / 4 vCPU hostované běhy GitHub, které používá kanál publikování. Při `8` (→ 7 pracovníků) tomuto běžci došla paměť a sestava selhala v kroku s `ResourceExhausted: ... cannot allocate memory`; `3` (pracovníci → 2) stále neseděli, jakmile bylo RSS pro jednotlivé procesy měřeno přímo namísto odvození. `tests/unit/docker-build-memory-budget.test.ts` provede aritmetiku s naměřeným číslem a selže, pokud některý z knoflíků přeroste běžec.

Turbopack se zkompiluje v nativní paměti Rust, která žije** mimo** haldu V8, takže ji `OMNIROUTE_BUILD_MEMORY_MB` nesvazuje. Na hostiteli se stropem paměti je pak sestavení SIGKILLed zabijákem OOM bez vůbec žádného chybového textu — se jednoduše zastaví uprostřed `Creating an optimized production build`, což se čte spíše jako zablokování než jako nedostatek paměti. To je důvod, proč je `Dockerfile` výchozím nastavením webpack (`OMNIROUTE_USE_TURBOPACK=0`), na rozdíl od `npm run dev` / `npm run build`, kde Turbopack je výchozí kód: holý `docker build .` bez sestavení arg (to, co provozují Railway a další hostitelé na jedno kliknutí) nesmí tiše zemřít na staviteli s omezenou pamětí. Publikované obrázky již procházejí `OMNIROUTE_USE_TURBOPACK=0` explicitně v `docker-publish.yml`. Na staviteli s velkým množstvím RAM se přihlaste do Turbopack pro rychlejší sestavení:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` je povoleno, takže `next build` spouští rodiče** a** pracovní proces a každý vyznamenává `OMNIROUTE_BUILD_MEMORY_MB` samostatně. Velikost stropu kontejneru je zhruba nad dvojnásobkem této hodnoty, nikoli jednou.

Naměřeno na tomto stromě (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Strop kontejneru | Výsledek                          |
| --------- | ---------------- | --------------------------------- |
| Turbopack | 8 GiB / 16 GiB   | OOM-zabit na obou, tiše           |
| webpack   | 8 GiB            | stavební dělník SIGKILLed         |
| webpack   | 12 GiB           | uspěl, dosáhl vrcholu na 11,1 GiB |

### Výchozí nastavení za běhu

Výchozí hodnoty exportované `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Chování paměti v Docker:

- Obrázek nastavuje `OMNIROUTE_MEMORY_MB=1024` a odvozuje z něj `NODE_OPTIONS=--max-old-space-size=1024`.
- Vlastní proces serveru je spuštěn samostatným spouštěčem, který přečte `OMNIROUTE_MEMORY_MB` a připojí `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Uzel používá poslední opakovanou hodnotu `--max-old-space-size`, takže nastavení `OMNIROUTE_MEMORY_MB` řídí efektivní limit haldy Docker.
- Vzhledem k tomu, že to vždy nastavuje obrázek, vlastní spouštěcí nástroj kalibrovaný RAM se nikdy nepoužije pod Docker. Zvyšte ji explicitně pro pracovní zátěž (tabulka níže). `2048` je stále příliš malý pro kódovací agent `/v1/responses`.

### Runtime RAM pro kódovací agenty

Výchozí hodnota 1 GiB Docker je podlaha dashboard/light-chat, nikoli produkční velikost. Dlouhá těla `POST /v1/responses` (stovky zpráv, desítky nástrojů) uchovávají během komprese více grafů v paměti. Dva překrývající se požadavky ~ 3 MiB / ~ 750k-tokenů přerušily V8 v** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) a také zasáhl 16 GiB cgroup OOM. Viz [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Velikost** cgroup `--memory` nad haldou** Nativní vyrovnávací paměti —, SQLite a kompresní meziprodukty jsou umístěny mimo V8.

| Pracovní zátěž                           | `OMNIROUTE_MEMORY_MB`    | Kontejner / cgroup      | Poznámky                                                                          |
| ---------------------------------------- | ------------------------ | ----------------------- | --------------------------------------------------------------------------------- |
| Dashboard, jeden lehký chat              | `1024` (výchozí obrázek) | ≥2 GiB                  |                                                                                   |
| Jeden kódovací agent (Claude/Codex/Grok) | `8192`                   | ≥10 GiB                 | Typické jednosezení `/v1/responses`                                               |
| Dvě souběžné dlouhé `/v1/responses`      | `10240`–`12288`          | ≥12–16 GiB              | Naměřeno přerušení V8 na ~ 12 GiB                                                 |
| Tři + souběžné dlouhé kontexty           | ne na jeden proces       | serializovat / více RAM | Výchozí vstupné pro těžkou váhu je 1 za letu; zvýšení bez RAM znovu zavede potrat |

`omniroute serve` na holém kovu kalibruje ~ 35 % RAM (upnuté `[512, 4096]`), když je `OMNIROUTE_MEMORY_MB`** odstaveno** . Docker vždy nastaví `1024`, takže kalibrace nikdy neproběhne v oficiálním obrázku.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

## Reverzní proxy na dílčí cestě (Traefik / nginx)

Next.js `basePath` je zkompilován do samostatného balíčku. OmniRoute zaznamená pečenou hodnotu do souboru sentinelu v kořenovém adresáři aplikace (zapsaného během `npm run build`; čte `scripts/docker/ensure-docker-base-path.mjs`) a porovnává ji se `OMNIROUTE_BASE_PATH` při spuštění kontejneru. Když se liší a obraz byl vytvořen pro kořen domény, vstupní bod přepíše samostatné manifesty, vložené literály `basePath`/`assetPrefix` (Dalších 16 vykreslí SSR asset URLs ze samotného `assetPrefix` — patcher do něj zrcadlí podcestu), upečený `/_next/static` majetek URLs (klient-reference, manifesty předběžného vykreslení a import médií `process.env` ) před `node dev/run-standalone.mjs` běží.

### Vytvořit sestavení (doporučeno)

Nastavte obě proměnné v `.env` a poté znovu sestavte tak, aby obraz a runtime souhlasily:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` předává `OMNIROUTE_BASE_PATH` jako Docker build-arg a jako proměnnou běhového prostředí.

### Předem vytvořený kořenový obraz + runtime subpath

Publikované obrázky `cheaperinference/omniroute:*` jsou vytvořeny pro kořen domény. Stále můžete nastavit `OMNIROUTE_BASE_PATH` za běhu; kontejner opraví balíček jednou při spuštění. Spárujte jej s odpovídajícím veřejným původem:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Nakonfigurujte reverzní proxy pro předávání** plný** vnější cesta (neodstraňujte předponu). Traefik by měl směrovat `PathPrefix(`/omniroute `)` do kontejneru bez `StripPrefix`, takže Next.js přijímá `/omniroute/...` a obsluhuje aktiva z `/omniroute/_next/...`.

Kontrola stavu Docker zkoumá odlehčený koncový bod životního cyklu `/healthz` s předponou aktivní `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` zůstává k dispozici pro diagnostiku human/dashboard ; chcete-li kontejner HEALTHCHECK nasměrovat zpět na něj (například pro hluboké vynucení zdraví), nastavte `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Ta cesta je a** hluboký** check (DB + monitoring Summary) — vhodné pro Docker's občasné `HEALTHCHECK` pokud se znovu přihlásíte, ale** ne** pro intervaly Kubernetes `livenessProbe`.

Pro orchestrátory (Kubernetes, Nomad atd.):

| Sonda           | Preferuji                                                             | Vyhněte se                                                                         |
| --------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Živost          | HTTP `GET /livez` nebo TCP na hlavním portu (`PORT`, výchozí `20128`) | `/api/monitoring/health` jako živost                                               |
| Připravenost    | HTTP `GET /healthz`                                                   | Krátké časové limity, které považují smyčku událostí za zaneprázdněnou jako mrtvou |
| Deep / blackbox | `/api/monitoring/health`                                              | —                                                                                  |

`/healthz` hlásí životní cyklus procesu (`ok` / `starting` / `stopping`). `/livez` je aktivní pouze v procesu (200, kdykoli může handler spustit; nečeká na připravenost). Oba stále běží na stejné smyčce událostí Node jako zpracování požadavků, takže katalog nebo komprimační práce vázané na CPU je mohou zpozdit — busy ≠ dead. Upřednostněte živost TCP pokud vyprší časový limit sond HTTP. Úplný návod k sondě: [Průvodce monitorováním — Doporučení sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose with Caddy (HTTPS Auto-TLS)

OmniRoute lze bezpečně vystavit pomocí automatického SSL provizorního systému Caddy. Ujistěte se, že záznam DNS A vaší domény ukazuje na IP vašeho serveru.

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

Caddy nastavuje standardní předávací hlavičky pro upstream kontejner. OmniRoute používá `NEXT_PUBLIC_BASE_URL` jako kanonický veřejný původ pro zpětná volání OAuth a generované veřejné odkazy; ověřené zápisy na dashboard používají požadavky stejného původu plus ochranu CSRF vázanou na relaci. `OMNIROUTE_TRUST_PROXY` povolte pouze pro pokročilá nasazení, kde záměrně chcete, aby OmniRoute odvozoval veřejný původ z důvěryhodných předávaných hlaviček namísto explicitní konfigurace.

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

## Značky obrázků

| Obraz                        | Štítek   | Velikost | Popis                                                       |
| ---------------------------- | -------- | -------- | ----------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250 MB | Nejvyšší** zveřejněno** stabilní SemVer (nikoli git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250 MB | Připněte tuto třídu značky pro GitOps                       |

Stejné obrázky jsou publikovány do tří úložišť se stejnými přehledy podle architektury: `cheaperinference/omniroute` (Docker Hub, organizace Cheaper Inference, od 3.8.53 dále), `ghcr.io/cheaper-inference/omniroute` a starší verze `diegosouzapw/omniroute`, která uchovává svou historii stahování a stále přijímá každé vydání. Stávající nasazení `diegosouzapw/omniroute` se neustále aktualizují; přepnutí názvu obrázku je volitelné. Níže uvedený kanál předběžné verze `:next` / `:next-web` je publikován pouze pro `diegosouzapw/omniroute` a GHCR.

Multiplatformní manifest: `linux/amd64` + `linux/arm64` nativní (Apple Silicon, AWS Graviton, Raspberry Pi). Docker vybere odpovídající architekturu automaticky; předejte `--platform linux/amd64` pokud potřebujete vynutit emulaci AMD64 na hostitelích ARM.

### Uvolňovací kanály

OmniRoute publikuje samostatné kanály Docker pro stabilní verze, testování aktivních verzí a vývojové sestavení.

| Kanál                           | Zdroj                                   | Proměnlivost                   | Doporučené použití                                                                                                     |
| ------------------------------- | --------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned vydání                 | Neměnný                        | Produkční nasazení, které připíná přesné vydání                                                                        |
| `:latest` / `:latest-web`       | Nejvyšší** zveřejněno** stabilní SemVer | Proměnlivý stabilní ukazatel   | Následuje stabilní vydání** po** SemVer publikovat práci — dělá** ne** track `main` nebo nevydané `release/v*` commity |
| `:next` / `:next-web`           | Aktuální výchozí větev `release/v*`     | Proměnný ukazatel před vydáním | Testování oprav, které přistály ve větvi aktivního vydání, ale zatím nejsou ve stabilní verzi                          |
| `:main` / `:main-web`           | pobočka `main`                          | Proměnlivý vývojový ukazatel   | Pouze vývoj a testování integrace                                                                                      |

#### Poskytovatelé webových relací: obrázky `-web`

Každý kanál výše funguje jako značka `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), vytvořená z fáze `runner-web` — stejným obrázkem plus Playwright a prohlížečem Chromium. Prostý obrázek se odešle** bez** Chrom; `gemini-web`, `claude-web` a `claude-turnstile` to potřebují.

Selhání je odloženo, nikoli čas spuštění: tito poskytovatelé uvádějí své modely a zobrazují se jako připojené na řídicím panelu a pouze první požadavek selže s

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Pokud tyto poskytovatele používáte, vytáhněte značku `-web` kanálu, na kterém již jste, — se nic jiného nemění. Při instalaci npm/CLI (bez obrazu Docker ) je ekvivalentní chybějící část binární soubor prohlížeče: spusťte `npx playwright install chromium` na hostiteli.

#### Pomocí kanálu předběžné verze

Kanál `next` je přestavěn při každém push na aktuální výchozí větev `release/v*` a je publikován pro AMD64 i ARM64. Starší větve údržby jej nemohou přepsat. Kanál poskytuje stahovatelný obraz pro opravy, které se sloučily do větve aktivního vydání před tím, než bude vyříznut další stabilní tag.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Pro Docker Compose přepište značku obrázku používanou vybraným profilem, poté vytáhněte a znovu vytvořte službu:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Bezpečnost a návrat zpět

`next` je plovoucí kanál předběžné verze. Může se změnit při každém stisknutí na větev aktivního uvolnění a je** není podporováno pro produkční použití** . Připněte přehled obrázku při vyhodnocování konkrétního sestavení:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Před testováním zálohujte datový svazek OmniRoute nebo datový adresář připojený k vazbě. Chcete-li se vrátit zpět, obnovte dříve používanou stabilní verzi nebo výtah a znovu vytvořte kontejner:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Sestavení větve vydání nemůže nikdy přesunout `latest`; pouze vhodná stabilní sémantická verze může podporovat stabilní ukazatel. Obrázky `next` si uchovávají inspekci obrazu uvolnění a blokování brány kritické zranitelnosti.

**`latest` není měnová záruka pro git.** Sloučené opravy na `main` nebo na aktivní větvi `release/v*` jsou** ne** v `:latest` dokud není publikován stabilní obrázek SemVer a úloha publikování propaguje `:latest` (stejný výtah jako SemVer). Pokud `latest` vypadá jako zamrzlé, zatímco GitHub již zobrazuje opravu, vytáhněte `:next` a otestujte větev vydání nebo počkejte na značku SemVer.

| chcete                                                                | Použití                             |
| --------------------------------------------------------------------- | ----------------------------------- |
| GitOps / produkce, která nesmí driftovat                              | Pin `:X.Y.Z` (nebo přehled obrázku) |
| Sledujte publikované stáje a přijměte znovuvytvoření u každého vydání | `:latest`                           |
| Testovat nevydané `release/v*` commity                                | `:next` (ne výroba)                 |
| Test `main`                                                           | `:main` (ne výroba)                 |

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

## Dostupnost: výchozí SQLite je jedna replika

Akcie Docker / Kubernetes OmniRoute jsou** proces jednoho uzlu + jeden zapisovač SQLite** . Vysoká dostupnost je** není podporováno** na té topologii.

| Omezení                                          | Následek                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jediný spisovatel                                | Dělat** ne** spustit více replik proti stejnému souboru SQLite. To kazí DB.                                                                                                                                                                                                                                |
| Znovu vytvořit / restartovat / zabít HEALTHCHECK | **Plný výpadek** SSE za letu, relací řídicího panelu a stavu v paměti. Každý připojený klient vypadne. Nové požadavky během okna prázdného koncového bodu získají reverzní proxy**`502 Bad Gateway: Unknown error`** , ne OmniRoute JSON — klienti to nedokážou odlišit od selhání poskytovatele (#11015). |
| Stejná smyčka událostí jako `/healthz`           | Zaneprázdněný katalog nebo kompresní klíště mohou zpozdit sondy; krátký časový limit a poté se restartuje** pouze** replika.                                                                                                                                                                               |

**Matrice sondy** (viz také [doporučení Kubernetes sondy](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sonda          | Cíl                                                         | Nepoužívejte                                                                       |
| -------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Živost         | TCP na `PORT` (výchozí `20128`), nebo měkké HTTP `/healthz` | `/api/monitoring/health`                                                           |
| Připravenost   | HTTP `GET /healthz`                                         | Krátké časové limity, které považují smyčku událostí za zaneprázdněnou jako mrtvou |
| Hluboko / lidé | `/api/monitoring/health`                                    | Automatizovaná živost kubelet                                                      |

**Upgrady:** očekávat pokles každé relace. Vypusťte klienty, pokud můžete; na výchozí SQLite není žádná průběžná aktualizace. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` také nahradí jediný proces, když je kontejner nezdravý – stejný rádius výbuchu.

Hotové manifesty a Helm graf fungují v `deploy/kubernetes/` a `deploy/helm/omniroute/` – viz [Průvodce nasazením Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Fragment Kubernetes pro a** jediná replika** (Je vyžadováno opětovné vytvoření; nezvyšujte `replicas` proti jednomu souboru SQLite ):

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

`preStop` sleep umožňuje kube zahodit koncové body služby před SIGTERM tak** nový** provoz přestane narážet na proces umírání. `/v1/responses` SSE za letu je vyčerpán až na `SHUTDOWN_TIMEOUT_MS` (výchozí 30 s) prostřednictvím pronájmů vstupného s vysokou gramáží (#11015). Nové požadavky, které se stále dostanou do procesu, získají `503` + `Retry-After: 5`. Mezera Recreate empty-endpoint, dokud není náhrada připravena, zůstává těžkým výpadkem – to je topologie SQLite, nikoli chybná konfigurace sondy.

Externí Postgres / multi-writer HA je** ne** dokumentovaná dráha akcií. Pokud potřebujete HA, ponechte si jednu repliku nebo spusťte topologii, kterou projekt testoval a zdokumentoval samostatně. Práce Postgres/MySQL žije v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Do té doby je to jediný podporovaný způsob množení** velký** Kapacita `/v1/responses` je N nezávislých procesů (další sekce), nikoli `replicas > 1` na jednom svazku.

## Scale-out: N nezávislých procesů

### vlastnictví rotace tokenů Codex

Kopie jednoho účtu Codex nesmí nezávisle spotřebovat jeho jednorázový obnovovací token. V instancích, které využívají pouze synchronizovaná pověření, nastavte `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Ponechte ji nenastavenou pro vlastníka jedné rotace. Každý proces stále potřebuje svůj vlastní `DATA_DIR`; tato volba nesdílí SQLite ani neposkytuje synchronizaci tokenů ani distribuovaný zámek.

Pasivní instance znovu načte připojení, když je potřeba obnovení, a přijme pouze jiný, nevypršený přístupový token. V opačném případě je obnovení zakázáno, aniž by vypršela platnost nebo se deaktivovalo připojení nebo započítávalo selhání nástroje pro obnovení. Skutečná selhání autentizace proti proudu stále používají normální účtování selhání, exponenciální ochlazení a normální chybu klienta; deaktivace účtu zůstává trvalá. Synchronizujte otočené tokeny vlastníka před vypršením platnosti přístupových tokenů (výchozí proaktivní obnovovací interval je pět minut) nebo znovu naimportujte auth soubor Codex. Pasivní importy ukládají dodané tokeny, aniž by je ověřovaly na koncovém bodu tokenu. Ruční obnova dashboard/API vrátí `409 refresh_disabled`; nová přihlášení OAuth jsou nezměněna. Viz [reference prostředí](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Jeden proces uzlu je** jedna hromada V8** . Dva překrývající se ~ 3 MiB / ~ 750k-token kódovací agent `POST /v1/responses` (RTK + Caveman) přeruší, že se nahromadí na ~ 12 Gi (`FATAL ERROR: Reached heap limit`) a mohou OOM cgroup 16 Gi. Viz [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). To měření je a** paměť-rozpočet** varování, nejde o produkt hard-max dvou souběžných dlouhých `/v1/responses`. Příjem těžkého chatu je brán automaticky odvozeným příjmovým bajtovým rozpočtem (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) dimenzovaným ze stejného stropu V8/cgroup — který jej přepíše nahoru (nebo nastavením staršího omezení počtu požadavků `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ) u již tak velkého procesu znovu zavede přerušení. Malé chaty, `/healthz`, `/v1/models` a MCP jsou** ne** v té čepici.

### Jeden proces: více než dvě dlouhé `/v1/responses`

A** zdravý** proces (hromada pod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, výchozí `0.75`)** květen** spusťte více než dva souběžné dlouhé `POST /v1/responses` když je pro celý procesový bajtový rozpočet (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) stále místo. Těla se `OMNIROUTE_CHAT_LARGE_BODY_BYTES` nebo nad ním (výchozí 256 KiB) si berou stejný pronájem těžké váhy jako strukturně náročné požadavky a používají stejný [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Desítky souběžných dlouhých klientů SSE (operátoři často potřebují 40–50) je a** paměť-rozpočet** otázka — velikost haldy + primary/headroom sloty + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — není pevný limit produktu „max 2“. Tlakovaná hromada se stále odhazuje s opakovatelným `503`, takže #7849 se nevrací.

Na** množit hromady** (nezávislé staré prostory V8)** dnes** :

| Dělat                                                                                                                                                            | Ne                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Běh** N containers/pods** , každý se svým** vlastní** `DATA_DIR` / hlasitost                                                                                     | Nastavte `replicas > 1` proti jednomu souboru SQLite                    |
| Velikost těžký za letu + zdravá výška z haldy / letového bajtu rozpočtu; 1–2 je konzervativní výchozí hodnota #7849, nikoli maximální maximální hodnota produktu | Dejte jednomu procesu 8 × RAM a neomezené omezení počtu                 |
| Volitelné: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` pro** sdílená počítadla kvót**                                                                   | Považujte Redis za sdílené SQLite — to není                             |
| Duplikujte tajné klíče poskytovatele do každé instance (nebo přijměte rozdělené řídicí panely)                                                                   | Očekávejte jeden řídicí panel / jeden protokol volání napříč instancemi |
| Přední s jakýmkoli vyvažovačem zatížení; stačí sticky pomocí klíče API nebo session                                                                              | Vyžadovat middleware s ohledem na velikost specifického dodavatele      |

Afinitu relace k účtu lze také sdílet prostřednictvím Redis: nastavte `OMNIROUTE_SESSION_AFFINITY_STORE=redis` a `REDIS_URL` pro každý proces se stejným `REDIS_KEY_PREFIX` a kladným nastavením `sessionAffinityTtlMs`. Piny převádějí hašované identity uživatelských účtů na způsobilá místní připojení každého procesu, takže účty OAuth s odpovídajícími metadaty identity nemusí mít odpovídající připojení IDs. Známé identity účtů mají přednost před protichůdnými místními IDs v rozlišení pinů a hlídaném vystěhování; záznamy bez identity (nebo volající po vystěhování bez identity) si ponechávají starší stráž ID. Účty bez stabilní identity používání stále vyžadují shodu IDs. Chyby Redis nebo volání přesahující 100 ms se vrátí do místního SQLite. Každý afinitní obchod Redis omezuje zbývající operace na 8, obchází Redis okamžitě, když je plný, a uvolňuje sloty pouze tehdy, když se podkladová práce usadí, nikoli v termínu pro volání. Během výpadku Redis neexistuje žádná sdílená pravda: každá instance se vrátí ke své vlastní místní afinitě, relace se mohou znovu připnout jednou za instanci a instance se mohou rozcházet. Lepkavost znovu konverguje prostřednictvím Redis, když se obnoví. Časový limit omezuje čekání, nikoli odeslané EVAL, které může přistát po nouzovém režimu. Směrovací zápisy porovnávají přesnou hodnotu pozorovanou rozhodnutím o směrování, nikoli nové čtení v době mutace; pozorovaná chyba nebo záložní pozorování SQLite se porovnává jako chybějící klíč Redis. Zastaralé piny jsou nahrazeny jedním CAS, takže pozdní příkaz nemůže nahradit nebo odstranit novější, jiný pin. Redis čte atomicky vrátí hodnotu a zbývající server TTL; kladné PTTL (nebo žádné vypršení platnosti) určuje životnost, nikoli časové razítko JSON zapisovatele nebo hodiny čtenáře. Místní snímky mapují zbývající TTL do místního termínu; existující klíče JSON zůstávají čitelné a jejich nezpracované bajty jsou zachovány pro CAS. Redis je jediným zdrojem pravdy, zatímco odpovídá. Potvrzené sdílené upserts, touchs a deletes odstranit místní položku, nikdy ji neinstalovat ani aktualizovat. SQLite na cestě Redis obsahuje pouze vlastní nouzová rozhodnutí této instance z chyb Redis, vypršení časového limitu nebo saturace přijetí, ohraničená TTL jako dříve. Chybějící místní pin při pozdějším výpadku stojí jeden nový výběr (jedno vynechání rychlé mezipaměti), nikoli špatný nebo vyřazený účet. Odmítnuté upserts vrátí sdíleného vítěze a jeho zbývající TTL atomicky: běžný výběr znovu zkontroluje mapovaný místní termín a použije stále živého způsobilého vítěze, dotkne se použití a přihlášení pro daný účet bez dalšího sdíleného zápisu. Pokud není k dispozici, výběr zachová místního kandidáta, ponechá sdílený pin nezměněný a vydá jednu ladicí zprávu. Odmítnuté CAS nezapisuje SQLite; chyby Redis, časové limity nebo saturace přijetí místo toho použijí existující místní operaci. Pokud odpověď odeslané mutace dorazí po vypršení časového limitu (přijato, odmítnuto nebo došlo k chybě), synchronní přesné porovnávání a vymazání serializovaných hodnot odstraní pouze bajtově identický řádek záložního časového limitu. Mezi tímto srovnáním a výmazem není žádné čekání; zápis novějšího výpadku je zachován. Hlídané vystěhování odstraní vlastní místní pin účtu, který selhal, i když je Redis vypnutý, a po potvrzeném sdíleném vystěhování jej znovu vyčistí. Čekající dřívější sdílené odpovědi nemohou obnovit vyřazený místní pin, protože sdílené úspěchy nikdy nezapisují SQLite. Pozdější nouzový výpadek může znovu připnout účet; později přijatý sdílený zápis existuje pouze v Redis. Chyby Redis nekonzultují místní záložní stav. S vypnutým ovladačem si nově vybrané piny zachovávají původní čtyřpolní tvar SQLite JSON ; pouze směrování Redis přidá identitu hashovaného účtu. Předem načtené kolíky jsou znovu zkontrolovány na hranici vypršení platnosti. Redis non-lease selection znovu načte obchod, ale synchronní plánování pronájmu může stále používat pin vyřazený mezi přednačtením a plánováním (akceptované okno nejlepšího úsilí). Potvrzení o pronájmu nemůže přepnout účty po trvalé reklamaci: při odmítnutém upsert si ponechá nárokovaného kandidáta pouze pro tento požadavek a ponechá sdíleného vítěze nedotčeno, takže dohoda mezi instancemi je omezena touto cestou. Zbytek tabulky stále platí: toto nesdílí lepivost kombinované relace, nativní Codex turn piny, semafory účtů, uzamčení, limity výdajů, konfiguraci nebo protokoly hovorů.

Hardware: pro každou instanci souběžná dlouhá `/v1/responses` je a** paměť-rozpočet** otázka (hromada + inflight-byte / #10110). `N` nezávislé `DATA_DIR` s stále násobí hromady: hostitel RAM musí pokrývat `N × cgroup`, nikoli „jeden 16 Gi pod s N = 8“. Nikdy `replicas > 1` na jeden soubor SQLite.

Vytvořte náčrt (dvě hromady, dva svazky — ne `deploy.replicas: 2`):

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

Hustota během procesu (komprese z izolátu HTTP ) je [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jeden logický cluster ve sdíleném trvalém stavu je [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
