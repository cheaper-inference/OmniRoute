# 🐳 Docker Guide — OmniRoute (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Kompletná referenčná príručka k nasadeniu pomocou Dockeru. Rýchly úvod nájdete v [sekcii Docker v súbore README](../README.md#-docker).

## Obsah

- [Rýchle spustenie](#quick-run)
- [Použitie súboru s premennými prostredia](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Dostupné profily](#available-profiles)
- [Konfigurácia hostiteľských nástrojov CLI pri spustení OmniRoute v Dockeri](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Sprievodný kontajner Redis](#redis-sidecar)
- [Produkčné nasadenie pomocou Compose](#production-compose)
- [Fázy súboru Dockerfile](#dockerfile-stages)
- [Kritické premenné prostredia](#critical-environment-variables)
- [Docker Compose s Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Rýchly tunel Cloudflare](#cloudflare-quick-tunnel)
- [Značky obrazov](#image-tags)
- [Aktualizácie ovládacieho panela v Dockeri](#dashboard-updates-in-docker)
- [Dostupnosť: predvolená databáza SQLite podporuje jednu repliku](#availability-default-sqlite-is-single-replica)
- [Regionálne chyby Gemini v Dockeri](#gemini-regional-errors-inside-docker)
- [Dôležité poznámky](#important-notes)

---

## Rýchly beh

> **Vlastný hostiteľ jedným príkazom?** Pozrite si [príručku vlastného hostiteľa](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (zverejnený obrázok + Redis, iba spätná slučka, bez výberu profilu). Rýchle spustenie nižšie je cesta s jedným kontajnerom pre používateľov, ktorí už používajú Redis inde.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## So súborom prostredia

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
# Základný profil (bez nástrojov CLI)
docker compose --profile base up -d

# Profil CLI (so zabudovanými Claude Code, Codex a OpenClaw)
docker compose --profile cli up -d

# Hostiteľský profil (primárne pre Linux; pripája hostiteľské binárne súbory CLI iba na čítanie)
docker compose --profile host up -d

# Webový profil (Chromium/Playwright pre poskytovateľov s webovou reláciou)
docker compose --profile web up -d

# Kombinácia CLI a sprievodného kontajnera CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Dostupné profily

OmniRoute poskytuje profily Compose pre hlavné spôsoby nasadenia. Vyberte ten, ktorý zodpovedá vášmu prostrediu.

| Profil              | Služba           | Kedy použiť                                                                                                                                                       | Príkaz                                       |
| ------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (predvolený) | `omniroute-base` | Bezobslužný server/minimálne runtime prostredie bez pribalených CLI poskytovateľov                                                                                | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | Agentné pracovné postupy, ktoré volajú `omniroute providers/setup/doctor`, a pribalené CLI (Codex, Claude Code, Droid, OpenClaw)                                  | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | Hostitelia so systémom Linux, ktorí chcú prístup podobný `network_mode` k hostiteľským CLI pripojením `~/.local/bin`, `~/.codex`, `~/.claude` atď. iba na čítanie | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | Spustenie sprievodného kontajnera [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na porte `8317` na sprostredkovanie upstream CLI                    | `docker compose --profile cliproxyapi up -d` |
| `web`               | `omniroute-web`  | Poskytovatelia s webovou reláciou, ktorí potrebujú prehliadač: `gemini-web`, `claude-web`, `claude-turnstile` (zostavuje `runner-web`, Chromium je súčasťou)      | `docker compose --profile web up -d`         |

> Je možné kombinovať viacero profilov: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurácia hostiteľských nástrojov CLI, keď OmniRoute beží v Dockeri

`omniroute setup-codex`, `setup-claude`, `config set <tool>` a tlačidlo
**Uložiť konfiguráciu** na ovládacom paneli zapisujú súbory, ako napríklad `~/.codex/*.config.toml`. Tieto cesty
majú význam iba v počítači, na ktorom sa CLI skutočne spúšťa. Ak ich spustíte
v kontajneri, zápis sa vykoná do domovského adresára samotného kontajnera (`/home/node` —
obraz beží s nastavením `USER node`), odkiaľ ich žiadne hostiteľské CLI nikdy nebude čítať a kde sa
zahodia ihneď po opätovnom vytvorení kontajnera.

OmniRoute to rozpozná a namiesto oznámenia úspechu, ktoré nemôžete využiť,
zápis odmietne a zobrazí pokyny: CLI skončí s kódom `2` a API odpovie stavom `422`
s `containerEphemeralTarget: true`.

### Odporúčané: spúšťajte CLI na hostiteľovi a OmniRoute v Dockeri

Kontajner poskytuje API; CLI konfiguruje vaše hostiteľské nástroje.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # nasmeruje CLI na kontajner
omniroute setup-codex                      # zapíše skutočný adresár ~/.codex na vašom hostiteľovi
```

Toto je správna voľba, keď Codex, Claude Code, Cursor alebo podobné nástroje bežia na vašom
notebooku — čo je obvyklé nastavenie.

### Alternatíva: pripojte konfiguračné adresáre hostiteľa pomocou bind mount (`host` profil)

Ak chcete, aby samotný kontajner zapisoval konfiguráciu na hostiteľovi, pripojte
adresáre a nastavte `CLI_CONFIG_HOME` na koreň pripojenia. Profil `host`
to už robí:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount zaručuje dôveryhodnosť cesty: OmniRoute číta
`/proc/self/mountinfo` a povoľuje zápis do pripojených ciest (a do adresárov,
ktorých podadresáre sú pripojené, čo presne zodpovedá vyššie uvedenej štruktúre `/host-home`), pričom
nepripojené cesty naďalej odmieta.

### Núdzové riešenie: konfigurácia vlastných CLI kontajnera (používajte striedmo)

Keď CLI skutočne existujú v kontajneri (profil `cli`), zápis
je zámerný. Odovzdajte `--allow-container-write` ľubovoľnému príkazu `setup-*` alebo nastavte
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` pre server. Zápis sa vykoná
s upozornením, že po zániku kontajnera sa nezachová.

> **Bezpečnostné upozornenie — profil `cli` + pripojenie `docker.sock`.**
> Profil `cli` pripája `/var/run/docker.sock` pomocou bind mount, aby automatická aktualizácia
> v kontajneri mohla opätovne vytvoriť zostavu prostredníctvom hostiteľského démona
> (`src/lib/system/autoUpdate.ts` zisťuje prítomnosť tohto socketu a preskočí
> cestu Dockeru, keď nie je prítomný). Tento socket predstavuje **hranicu dôvery s oprávneniami root
> na hostiteľovi**: čokoľvek, čo k nemu môže pristupovať, ovláda hostiteľského démona Docker ako
> root — môže vytvoriť, skontrolovať, zastaviť a odstrániť ľubovoľný kontajner na hostiteľovi.
> Dôsledky:
>
> 1. **Nikdy nesprístupňujte port profilu `cli` do siete.** Zverejnite
>    ho na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` dostupný zo siete LAN mení akékoľvek RCE na úrovni ovládacieho panela na
>    úplné kompromitovanie hostiteľa.
> 2. **Do profilu `cli` nepripájajte žiadne ďalšie hostiteľské adresáre.**
>    Docker socket spolu s akýmkoľvek ďalším pripojením poskytuje kontajneru úplný
>    prístup na čítanie a zápis do vášho súborového systému a konfigurácie hostiteľa. Ak nástroj potrebuje
>    vidieť projekt, spustite ho lokálne pomocou binárneho súboru CLI — nepripájajte ho
>    do kontajnera `cli`.
>
> Ak nepotrebujete automatickú aktualizáciu v kontajneri, profil `cli` nezapínajte
> (`COMPOSE_PROFILES=core,redis` alebo kratšie). Ostatné profily
> nepripájajú Docker socket.
>
> Súvisiaci model hrozieb týkajúci sa MITM nájdete v `docs/security/MITM-TPROXY-DECRYPT.md` (git; nie je skompilovaný do `/docs`)
> a reťazec pôvodu binárnych súborov
> `codex`/`claude-code`/`droid`/`openclaw` nájdete v `docs/security/SUPPLY_CHAIN.md`.

## Redis Sidecar

OmniRoute využíva Redis ako úložisko pre distribuovaný obmedzovač frekvencie požiadaviek a zdieľanú vyrovnávaciu pamäť. Služba `redis` je v súbore `docker-compose.yml` definovaná **vždy** (nie je podmienená žiadnym profilom) a spúšťa sa spolu s akýmkoľvek iným profilom.

| Detail                       | Hodnota                                    |
| ---------------------------- | ------------------------------------------ |
| Obraz                        | `redis:7-alpine`                           |
| Názov kontajnera             | `omniroute-redis`                          |
| Interný port                 | `6379`                                     |
| Port hostiteľa (prepísanie)  | `REDIS_PORT` (predvolene `6379`)           |
| Väzba hostiteľa (prepísanie) | `REDIS_BIND_HOST` (predvolene `127.0.0.1`) |
| Zväzok                       | `omniroute-redis-data` → `/data`           |
| Kontrola stavu               | `redis-cli ping` (interval 10 s)           |

Súvisiace premenné prostredia:

- `REDIS_URL` — reťazec pripojenia vložený do aplikácie (predvolene `redis://redis:6379`).
- `REDIS_PORT` — mapovanie portu kontajnera Redis na strane hostiteľa.
- `REDIS_BIND_HOST` — rozhranie hostiteľa, na ktorom je port zverejnený. Predvolená hodnota je `127.0.0.1`.

> **Prečo je predvolene použitá slučková adresa:** sidecar sa spúšťa bez `requirepass`
> a kontajnery aplikácie k nemu pristupujú cez sieť compose (`redis:6379`) — zverejnený port
> slúži iba pre nástroje na strane hostiteľa (`redis-cli`, lokálne `npm run dev`). Zverejnenie na
> `0.0.0.0` by sprístupnilo Redis bez overenia každému hostiteľovi vo vašej sieti LAN. Ak nastavíte
> `REDIS_BIND_HOST=0.0.0.0`, pridajte do položky `command:` danej služby aj `--requirepass`.

**Vypnutie systému Redis** sa neodporúča (obmedzovač frekvencie požiadaviek prejde na menej výkonnú záložnú implementáciu v pamäti). Ak je to nevyhnutné, odstráňte alebo zakomentujte blok služby `redis:` v súbore `docker-compose.yml`, prípadne nastavte počet jej inštancií na nulu:

```bash
docker compose up -d --scale redis=0
```

## Produkčný Compose

Ak chcete spustiť izolovanú produkčnú zostavu súbežne s vývojovou zostavou, použite `docker-compose.prod.yml`.

| Detail                     | Hodnota                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| Súbor                      | `docker-compose.prod.yml`                                                                        |
| Predvolený port dashboardu | `PROD_DASHBOARD_PORT=20130` (mapovaný na interný `${DASHBOARD_PORT:-20128}`)                     |
| Predvolený port API        | `PROD_API_PORT=20131`                                                                            |
| Obraz                      | `omniroute:prod` (zostavený z cieľa `runner-cli`)                                                |
| Kontajner Redis            | `omniroute-redis-prod` (`redis:8.6.2`, vyhradený zväzok `redis-prod-data`)                       |
| Dátový zväzok              | `omniroute-prod-data` (pomenovaný, zachovaný medzi opätovnými zostaveniami)                      |
| Kontroly stavu             | `node healthcheck.mjs` + `redis-cli ping`, pričom `depends_on` je podmienené stavom služby Redis |

Použitie:

```bash
# Zostavenie a spustenie produkčného stacku
docker compose -f docker-compose.prod.yml up -d --build

# Priebežné sledovanie protokolov
docker compose -f docker-compose.prod.yml logs -f

# Zastavenie a odstránenie stacku (zväzky sa zachovajú)
docker compose -f docker-compose.prod.yml down
```

Produkčný stack beží paralelne s vývojovou zostavou compose (používa odlišné názvy kontajnerov, porty a zväzky), takže môžete pokračovať v lokálnom vývoji, zatiaľ čo produkčná zostava zostáva spustená.

## Dockerfile Stages

Úložisko dodáva viacstupňový súbor Dockerfile (`Dockerfile`). Sú vystavené štyri stupne; vyberte si ten správny `target` pre váš prípad použitia.

| Etapa         | Základný obrázok      | Účel                                                                                                                                                                                                                                                                                                            |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Nainštaluje deps (`npm ci --legacy-peer-deps`) a spustí `npm run build` (Turbopack v predvolenom nastavení — pozri zdroje času zostavovania nižšie)                                                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Produkčný čas so samostatným výstupom Next.js.** Žiadny poskytovateľ CLIs nie je v balíku.**                                                                                                                                                                                                                    |
| `runner-cli`  | `runner-base`         | Pridá `git`, `docker.io`, `docker-compose` a globálne CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Túto možnosť vyberte pre pracovné postupy agentov.**                                                                                                                           |
| `runner-web`  | `runner-base`         | Pridáva Playwright + prehliadač Chromium (`--with-deps`) pre poskytovateľov webových relácií: `gemini-web`, `claude-web`, `claude-turnstile`.** Túto možnosť vyberte, keď používate týchto poskytovateľov** — obyčajný obrázok bez neho zlyhá v čase požiadavky (pozri poznámku `-web` v časti Kanály vydania). |

Manuálne zostavte konkrétny cieľ:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Zdroje času budovania

Tri zostavovacie argumenty určujú, koľko stojí fáza `builder`. Sú určené iba pre čas zostavenia — `OMNIROUTE_MEMORY_MB` (nižšie) je samostatný gombík pre čas potrebný na prevádzku.

| Zostavte arg                | Predvolené | Effect                                                                               |
| --------------------------- | ---------- | ------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | `0` sa vytvára s webpackom: nižšia špičková pamäť, pomalšia. `1` volí Turbopack.     |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | Strop haldy V8 (`--max-old-space-size`) pre vytvorený `next build`.                  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | Feeds `CIRCLE_NODE_TOTAL`; Ďalej odvodí `workers = N - 1` pre zber údajov o stránke. |

`OMNIROUTE_BUILD_WORKERS` je tá, ktorá sa má zvýšiť na veľkom staviteľovi a tá, ktorú treba podozrievať, keď obmedzená stavba zomrie** po** `✓ Compiled successfully`. Každý pracovník s údajmi o stránke je svoj vlastný proces, rovnako ako samotný rodičovský `next build` ; živá reprodukcia VPS (vydanie #7518) merala vrchol RSS každého procesu pri ~ 4,5 GB nezávisle od príznaku haldy `NODE_OPTIONS` (Turbopack sa kompiluje v pamäti native/Rust mimo haldy V8). Predvolená hodnota `2` (→ 1 pracovník, 2 procesy spolu) je dimenzovaná pre 16 GB / 4 vCPU hostovaných serverov GitHub, ktoré používa kanál publikovania. Pri `8` (→ 7 pracovníkov) tomuto bežcovi došla pamäť a zostava zlyhala v kroku s `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 pracovníci) stále nesedeli, keď sa RSS na proces meral priamo namiesto odvodenia. `tests/unit/docker-build-memory-budget.test.ts` vykoná aritmetiku voči nameranej hodnote a zlyhá, ak niektorý z gombíkov prerastie bežec.

Turbopack kompiluje v natívnej Rust pamäti, ktorá žije** vonku** halda V8, takže `OMNIROUTE_BUILD_MEMORY_MB` ju neviaže. Na hostiteľovi s pamäťovým stropom je zostavenie SIGKILLed OOM killer úplne bez chybového textu — sa jednoducho zastaví uprostred `Creating an optimized production build`, čo sa číta skôr ako zamrznutie než nedostatok pamäte. To je dôvod, prečo je `Dockerfile` predvolene nastavený na webpack (`OMNIROUTE_USE_TURBOPACK=0`), na rozdiel od `npm run dev` / `npm run build`, kde Turbopack je predvolený kód: holé `docker build .` bez argumentov zostavenia (ktoré prevádzkujú železnice a iní hostitelia na jedno kliknutie) nesmie ticho zomrieť na zostavovači s obmedzenou pamäťou. Publikované obrázky už prechádzajú `OMNIROUTE_USE_TURBOPACK=0` explicitne v `docker-publish.yml`. Na zostavovači s množstvom RAM aktivujte Turbopack pre rýchlejšie zostavenie:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` je povolený, takže `next build` spúšťa rodiča** a** robotnícky proces a každý vyznamenáva `OMNIROUTE_BUILD_MEMORY_MB` samostatne. Veľkosť stropu kontajnera je približne nad dvojnásobkom tejto hodnoty, nie raz.

Namerané na tomto strome (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Strop kontajnera | Výsledok                        |
| --------- | ---------------- | ------------------------------- |
| Turbopack | 8 GiB / 16 GiB   | OOM-zabil oboch, potichu        |
| webpack   | 8 GiB            | stavebný robotník SIGKILLed     |
| webpack   | 12 GiB           | uspel, dosiahol vrchol 11,1 GiB |

### Predvolené nastavenia pre runtime

Predvolené hodnoty exportované `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Správanie pamäte v Docker:

- Obrázok nastavuje `OMNIROUTE_MEMORY_MB=1024` a odvodzuje `NODE_OPTIONS=--max-old-space-size=1024` z neho.
- Samotný proces servera spúšťa samostatný spúšťač, ktorý číta `OMNIROUTE_MEMORY_MB` a pridáva `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Uzol používa poslednú opakovanú hodnotu `--max-old-space-size`, takže nastavenie `OMNIROUTE_MEMORY_MB` riadi efektívny limit haldy Docker.
- Pretože to vždy nastavuje obrázok, v rámci Docker sa nikdy nepoužije záložná funkcia RAM kalibrovaná spúšťačom. Zvýšte ju výslovne pre pracovné zaťaženie (tabuľka nižšie). `2048` je stále príliš malé pre kódovacieho agenta `/v1/responses`.

### Runtime RAM pre kódovacích agentov

Predvolená hodnota 1 GiB Docker je podlaha dashboard/light-chat, nie produkčná veľkosť. Dlhé telá `POST /v1/responses` (stovky správ, desiatky nástrojov) uchovávajú počas kompresie viacero grafov v pamäti. Dve prekrývajúce sa požiadavky na token ~ 3 MiB / ~ 750k prerušili V8 o** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) a tiež zasiahla 16 GiB cgroup OOM. Pozri [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Veľkosť** cgroup `--memory` nad haldou** Natívne vyrovnávacie pamäte —, SQLite a kompresné medziprodukty sú umiestnené mimo V8.

| Pracovná záťaž                           | `OMNIROUTE_MEMORY_MB`       | Kontajner / cgroup      | Poznámky                                                                                   |
| ---------------------------------------- | --------------------------- | ----------------------- | ------------------------------------------------------------------------------------------ |
| Prístrojová doska, jeden ľahký rozhovor  | `1024` (predvolený obrázok) | ≥2 GiB                  |                                                                                            |
| Jeden kódovací agent (Claude/Codex/Grok) | `8192`                      | ≥10 GiB                 | Typická `/v1/responses` s jednou reláciou                                                  |
| Dve súbežné dlhé `/v1/responses`         | `10240`–`12288`             | ≥12–16 GiB              | Namerané prerušenie V8 pri halde ~ 12 GiB                                                  |
| Tri + súbežné dlhé kontexty              | nie na jeden proces         | serializovať / viac RAM | Predvolený vstup pre ťažkú váhu je 1 počas letu; zvýšenie bez RAM znovu zavedie prerušenie |

`omniroute serve` na holom kove kalibruje ~ 35 % RAM (upnuté `[512, 4096]`), keď je `OMNIROUTE_MEMORY_MB`** odstaviť** . Docker vždy nastaví `1024`, takže kalibrácia nikdy neprebehne v oficiálnom obrázku.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Kritické premenné prostredia

Okrem predvolených hodnôt zdokumentovaných v súbore [ENVIRONMENT.md](../reference/ENVIRONMENT.md) sú pri spúšťaní v prostredí Docker najdôležitejšie nasledujúce premenné:

| Premenná                      | Účel                                                                                                                                                                                                                                                                                                               | Predvolená hodnota          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Zdieľaný tajný kľúč pre most WebSocket. **Vyžaduje sa v produkčnom prostredí** — nastavte ho na silný náhodný reťazec.                                                                                                                                                                                             | nenastavené (musí sa zadať) |
| `REDIS_URL`                   | Pripojovací reťazec pre obmedzovač frekvencie požiadaviek / backend vyrovnávacej pamäte                                                                                                                                                                                                                            | `redis://redis:6379`        |
| `REDIS_PORT`                  | Port hostiteľa pre pribalený kontajner Redis                                                                                                                                                                                                                                                                       | `6379`                      |
| `REDIS_BIND_HOST`             | Sieťové rozhranie hostiteľa, na ktorom je publikovaný port pribaleného kontajnera Redis (spätná slučka, pokiaľ nepridáte AUTH)                                                                                                                                                                                     | `127.0.0.1`                 |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Cesta na hostiteľovi pripojená do profilu `cli` ako `/workspace/omniroute` pre pracovné postupy samočinnej aktualizácie                                                                                                                                                                                            | `.` (aktuálny adresár)      |
| `OMNIROUTE_MEMORY_MB`         | Limit haldy Node za behu pre samostatný server Docker; prepisuje predvolenú hodnotu obrazu uvedenú vyššie. Agenti na programovanie: `8192`+ (pozrite si [RAM za behu](#runtime-ram-for-coding-agents)).                                                                                                            | `1024`                      |
| `DASHBOARD_PORT` / `API_PORT` | Prepíše sprístupnené porty pre ovládací panel (20128) a API (20129)                                                                                                                                                                                                                                                | `20128` / `20129`           |
| `APP_BIND_HOST`               | Sieťové rozhranie hostiteľa, na ktorom docker-compose publikuje porty ovládacieho panela/API/živého WS. Pri `REQUIRE_API_KEY=false` (predvolené nastavenie) sprístupní `0.0.0.0` anonymný proxy server `/v1` v sieti LAN — rozsah rozšírte iba s `REQUIRE_API_KEY=true` alebo s reverzným proxy serverom pred ním. | `127.0.0.1`                 |
| `CLIPROXY_BIND_HOST`          | Sieťové rozhranie hostiteľa, na ktorom docker-compose publikuje postranný kontajner `cliproxyapi` — jeho dátový zväzok obsahuje prihlasovacie údaje poskytovateľa.                                                                                                                                                 | `127.0.0.1`                 |
| `OMNIROUTE_PLUGINS_DIR`       | Adresár, ktorý skener doplnkov za behu prehľadáva a do ktorého doplnky inštaluje. Nastavte ho, keď sú doplnky pripojené pomocou bind mount: predvolená hodnota sa riadi premennou `HOME`, ktorú obraz nemusí exportovať.                                                                                           | `~/.omniroute/plugins`      |
| `OMNIROUTE_BASE_PATH`         | Podcesta URL, keď je aplikácia publikovaná za reverzným proxy serverom (napr. `/omniroute`)                                                                                                                                                                                                                        | _(prázdne = koreň)_         |
| `NEXT_PUBLIC_BASE_URL`        | Verejný zdroj prehliadača vrátane podcesty (napr. `https://host/omniroute`)                                                                                                                                                                                                                                        | nenastavené                 |
| `PROD_DASHBOARD_PORT`         | Port ovládacieho panela na strane hostiteľa pre `docker-compose.prod.yml`                                                                                                                                                                                                                                          | `20130`                     |
| `CLIPROXYAPI_PORT`            | Port na strane hostiteľa pre postranný kontajner `cliproxyapi`                                                                                                                                                                                                                                                     | `8317`                      |

## Reverzný proxy na podceste (Traefik / nginx)

Next.js `basePath` je zostavený do samostatného balíka. OmniRoute zaznamená pečenú hodnotu do súboru sentinelu v koreňovom adresári aplikácie (zapísaného počas `npm run build`; číta `scripts/docker/ensure-docker-base-path.mjs`) a porovná ju so `OMNIROUTE_BASE_PATH` pri spustení kontajnera. Keď sa líšia a obraz bol vytvorený pre koreňový adresár domény, vstupný bod prepíše samostatné manifesty, vložené literály `basePath`/`assetPrefix` (Ďalších 16 vykreslí SSR asset URLs zo samotného `assetPrefix` — patcher do neho zrkadlí podcestu), zapečený `/_next/static` `process.env` URLs (klient-referenčné manifesty zq predvykreslením a importovanie stránok klienta). `node dev/run-standalone.mjs` beží.

### Napísať zostavu (odporúčané)

Nastavte obe premenné v `.env` a potom znova vytvorte tak, aby sa obraz a runtime zhodovali:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` preposiela `OMNIROUTE_BASE_PATH` ako Docker build-arg a ako premennú prostredia runtime.

### Vopred zostavený koreňový obrázok + runtime subpath

Publikované obrázky `cheaperinference/omniroute:*` sú vytvorené pre koreňový adresár domény. Stále môžete nastaviť `OMNIROUTE_BASE_PATH` za behu; kontajner opraví balík raz pri spustení. Spárujte ho so zodpovedajúcim verejným pôvodom:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Nakonfigurujte reverzný proxy na preposielanie** plný** vonkajšia cesta (neodstraňujte predponu). Traefik by mal smerovať `PathPrefix(`/omniroute `)` do kontajnera bez `StripPrefix`, takže Next.js prijíma `/omniroute/...` a obsluhuje aktíva z `/omniroute/_next/...`.

Kontrola stavu Docker skúma ľahký koncový bod životného cyklu `/healthz` s predponou aktívnym `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` zostáva k dispozícii pre diagnostiku human/dashboard ; ak chcete nasmerovať kontajner HEALTHCHECK späť naň (napríklad pre hlboké posilnenie zdravia), nastavte `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Tá cesta je a** hlboký** check (DB + monitoring summary) — vhodné pre zriedkavý `HEALTHCHECK` Docker, ak sa znova prihlásite, ale** nie** pre intervaly Kubernetes `livenessProbe`.

Pre orchestrátorov (Kubernetes, Nomad atď.):

| Sonda           | Radšej                                                                    | Vyhnite sa                                                                      |
| --------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Živosť          | HTTP `GET /livez` alebo TCP na hlavnom porte (`PORT`, predvolené `20128`) | `/api/monitoring/health` ako živosť                                             |
| Pripravenosť    | HTTP `GET /healthz`                                                       | Krátke časové limity, ktoré považujú slučku udalostí za zaneprázdnenú ako mŕtvu |
| Deep / blackbox | `/api/monitoring/health`                                                  | —                                                                               |

`/healthz` hlási životný cyklus procesu (`ok` / `starting` / `stopping`). `/livez` je aktívny iba v procese (200, kedykoľvek môže handler spustiť; nečaká na pripravenosť). Obidva stále bežia na rovnakej slučke udalostí uzla ako spracovanie požiadaviek, takže katalóg alebo kompresia viazaná na CPU ich môže oneskoriť — busy ≠ dead. Uprednostnite živosť TCP, ak uplynie časový limit sond HTTP. Úplné pokyny k sonde: [Sprievodca monitorovaním — Odporúčania sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose with Caddy (HTTPS Auto-TLS)

OmniRoute môže byť bezpečne vystavená pomocou automatického poskytovania SSL Caddy. Uistite sa, že záznam DNS A vašej domény ukazuje na IP vášho servera.

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

Caddy nastavuje štandardné smerovacie hlavičky pre upstream kontajner. OmniRoute používa `NEXT_PUBLIC_BASE_URL` ako kanonický verejný pôvod pre spätné volania OAuth a generované verejné odkazy; overené zápisy na dashboard používajú požiadavky rovnakého pôvodu plus ochranu CSRF viazanú na reláciu. `OMNIROUTE_TRUST_PROXY` povoľte len pre pokročilé nasadenia, kde zámerne chcete, aby OmniRoute odvodil verejný pôvod z dôveryhodných preposlaných hlavičiek namiesto explicitnej konfigurácie.

## Cloudflare Rýchly tunel

Podpora dashboardu pre nasadenia Docker zahŕňa jedno kliknutie**Cloudflare rýchly tunel** na `Dashboard → Endpoints`. Prvý povolí sťahovanie `cloudflared` iba v prípade potreby, spustí dočasný tunel k vášmu aktuálnemu koncovému bodu `/v1` a zobrazí vygenerovaný `https://*.trycloudflare.com/v1` URL priamo pod bežným verejným URL.

Panely tunelov koncových bodov (Cloudflare, Tailscale, ngrok) je možné zobraziť alebo skryť pred `Settings → Appearance` bez zmeny aktívneho stavu tunela.

### Poznámky k tunelu

- Quick Tunnel URLs sú dočasné a menia sa po každom reštarte.
- Rýchle tunely sa po reštarte OmniRoute alebo kontajnera automaticky neobnovia. V prípade potreby ich znova povoľte z palubnej dosky.
- Riadená inštalácia momentálne podporuje Linux, macOS a Windows na `x64` / `arm64`.
- Spravované rýchle tunely predvolene používajú transport HTTP/2, aby sa predišlo hlučným upozorneniam QUIC UDP vyrovnávacej pamäte v prostrediach s obmedzenými kontajnermi. Ak chcete iný transport, nastavte `CLOUDFLARED_PROTOCOL=quic` alebo `auto`.
- Obrazy Docker spájajú systémové korene CA a odovzdávajú ich spravovanému `cloudflared`, čím sa vyhnete zlyhaniam dôvery TLS pri zavádzaní tunela vo vnútri kontajnera.
- Nastavte `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ak chcete, aby OmniRoute používal existujúci binárny súbor namiesto sťahovania.

## Značky obrázkov

| Obrázok                      | Tag      | Veľkosť  | Popis                                                     |
| ---------------------------- | -------- | -------- | --------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250 MB | Najvyššie** zverejnené** stabilný SemVer (nie git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250 MB | Pripnite túto triedu značky pre GitOps                    |

Rovnaké obrázky sú publikované v troch úložiskách s rovnakými súhrnmi podľa architektúry: `cheaperinference/omniroute` (Docker Hub, organizácia Cheaper Inference, od 3.8.53), `ghcr.io/cheaper-inference/omniroute` a staršia verzia `diegosouzapw/omniroute`, ktorá uchováva svoju históriu sťahovania a stále prijíma každé vydanie. Existujúce nasadenia `diegosouzapw/omniroute` sa neustále aktualizujú; prepnutie názvu obrázka je voliteľné. Kanál `:next` / `:next-web` pred vydaním nižšie je zverejnený len pre `diegosouzapw/omniroute` a GHCR.

Multiplatformový manifest: `linux/amd64` + `linux/arm64` natívny (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automaticky vyberie zodpovedajúcu architektúru; prejdite `--platform linux/amd64` ak potrebujete vynútiť emuláciu AMD64 na hostiteľoch ARM.

### Uvoľniť kanály

OmniRoute publikuje samostatné kanály Docker pre stabilné vydania, testovanie aktívnych verzií a vývojové zostavy.

| kanál                           | Zdroj                                    | Premenlivosť                      | Odporúčané použitie                                                                                                       |
| ------------------------------- | ---------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned uvoľnenie               | Nemenné                           | Produkčné nasadenia, ktoré pridávajú presné vydanie                                                                       |
| `:latest` / `:latest-web`       | Najvyššie** zverejnené** stabilná SemVer | Meniteľný stabilný ukazovateľ     | Nasleduje stabilné vydania** po** SemVer publikovať prácu — robí** nie** track `main` alebo nevydané `release/v*` commity |
| `:next` / `:next-web`           | Aktuálna predvolená vetva `release/v*`   | Meniteľný ukazovateľ pred vydaním | Testovanie opráv, ktoré pristáli vo vetve aktívneho vydania, ale ešte nie sú v stabilnom vydaní                           |
| `:main` / `:main-web`           | pobočka `main`                           | Meniteľný ukazovateľ vývoja       | Iba vývojové a integračné testovanie                                                                                      |

#### Poskytovatelia webových relácií: obrázky `-web`

Každý kanál vyššie slúži ako značka `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), ktorá je vytvorená z fázy `runner-web` — rovnakým obrázkom plus Playwright a prehliadačom Chromium. Vysiela sa obyčajný obrázok** bez** chróm; `gemini-web`, `claude-web` a `claude-turnstile` to potrebujú.

Zlyhanie sa odloží, nie čas spustenia: títo poskytovatelia uvedú svoje modely a zobrazia sa ako pripojené na informačnom paneli a iba prvá požiadavka zlyhá s

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ak používate týchto poskytovateľov, potiahnite značku `-web` kanála, na ktorom už ste — sa nič iné nezmení. Pri inštalácii npm/CLI (bez obrazu Docker ) je ekvivalentným chýbajúcim prvkom binárny súbor prehliadača: spustite `npx playwright install chromium` na hostiteľovi.

#### Použitie predbežného kanála

Kanál `next` je prebudovaný pri každom stlačení na aktuálnu predvolenú vetvu `release/v*` a je publikovaný pre AMD64 aj ARM64. Staršie pobočky údržby ho nemôžu prepísať. Kanál poskytuje stiahnuteľný obraz pre opravy, ktoré sa zlúčili do vetvy aktívneho vydania pred odstránením ďalšej stabilnej značky.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

V prípade Docker Compose prepíšte značku obrázka používanú vybratým profilom, potom vytiahnite a znova vytvorte službu:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Bezpečnosť a spätný chod

`next` je plávajúci kanál pred vydaním. Môže sa zmeniť pri akomkoľvek stlačení na vetvu aktívneho uvoľnenia a je** nie je podporované na produkčné použitie** . Pripnite súhrn obrázka pri vyhodnocovaní konkrétnej zostavy:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Pred testovaním si zálohujte dátový zväzok OmniRoute alebo dátový adresár pripojený k väzbe. Ak sa chcete vrátiť späť, obnovte predtým používanú stabilnú verziu alebo súhrn a znova vytvorte kontajner:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Zostavenie vetvy vydania nemôže nikdy presunúť `latest`; iba vhodná stabilná sémantická verzia môže podporovať stabilný ukazovateľ. Obrázky `next` si zachovávajú kontrolu uvoľneného obrazu a blokujú bránu kritickej zraniteľnosti.

**`latest` nie je menová záruka pre git.** Zlúčené opravy na `main` alebo na aktívnej vetve `release/v*` sú** nie** v `:latest`, kým sa nezverejní stabilný obrázok SemVer a úloha zverejnenia nepodporí `:latest` (rovnaký súhrn ako SemVer). Ak `latest` vyzerá zmrazené, zatiaľ čo GitHub už zobrazuje opravu, potiahnite `:next` a otestujte vetvu vydania alebo počkajte na značku SemVer.

| chceš                                                                    | Použite                            |
| ------------------------------------------------------------------------ | ---------------------------------- |
| GitOps / produkcia, ktorá sa nesmie unášať                               | Pin `:X.Y.Z` (alebo súhrn obrázka) |
| Sledujte publikované stajne a prijmite opätovnú tvorbu pri každom vydaní | `:latest`                          |
| Testovať nevydané `release/v*` commity                                   | `:next` (nie výroba)               |
| Test `main`                                                              | `:main` (nie výroba)               |

## Aktualizácie ovládacieho panela v Dockeri

Kontajner z publikovaného obrazu nemôže nahradiť sám seba. Keď OmniRoute zistí, že je spustený v
kontajneri (bez pracovnej kópie `.git` a nejde o inštaláciu npm), banner aktualizácie na domovskom ovládacom paneli zobrazí
príkaz, ktorý sa má spustiť na hostiteľovi, namiesto pokynov pre npm/git, spolu s tlačidlom na kopírovanie:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Názov služby pochádza z `AUTO_UPDATE_SERVICE` (predvolená hodnota je `omniroute`, čo je služba v
`docker-compose.selfhost.yml`). Príkaz `pull` aktualizuje iba pohyblivú značku (`latest`, `next`); pri pevne nastavenej
značke `:X.Y.Z` najskôr upravte značku.

### Aktualizácie jedným kliknutím pomocou spúšťacieho súboru na hostiteľovi

Ak chcete zachovať funkčnosť tlačidla **Aktualizovať teraz** bez pripojenia `/var/run/docker.sock` (ktoré poskytuje kontajneru
prístup root na hostiteľovi — pozrite si vyššie uvedené upozornenie profilu `cli`), nastavte `DOCKER_UPDATE_TRIGGER_FILE` v
službe OmniRoute a spustite na hostiteľovi proces sledovania:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Cesta musí byť v rámci `DATA_DIR` (relatívne hodnoty sa vyhodnocujú vzhľadom naň); všetky ostatné cesty sú
odmietnuté. Tlačidlo **Aktualizovať teraz** potom zapíše `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` do daného
súboru, odpovie stavom `202` a ovládací panel bude opakovane kontrolovať `/api/system/version`, kým nebude nová verzia
aktívna, a potom sa znova načíta. OmniRoute v tomto režime nikdy nespúšťa shell ani príkaz Dockeru. Rovnako ako pri každej
akcii aktualizácie je požiadavka prijatá iba od klientov na spätnej slučke alebo v sieti LAN.

Dátový adresár pripojený pomocou bind mountu poskytuje hostiteľovi stabilnú cestu na sledovanie. Vzorové jednotky `systemd`
(upravte `/srv/omniroute` tak, aby odkazovalo na adresár obsahujúci váš súbor Compose a `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Sledovanie požiadaviek na aktualizáciu z ovládacieho panela OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Stiahnutie a opätovné vytvorenie kontajnera OmniRoute

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

Služba odstráni požiadavku pred stiahnutím obrazu, aby sa neúspešné spustenie neopakovalo v slučke. Bez
`DOCKER_UPDATE_TRIGGER_FILE` ovládací panel naďalej používa postup s manuálnym príkazom.

## Dostupnosť: predvolená SQLite je jedna replika

Sklad Docker / Kubernetes OmniRoute je** jeden proces uzla + jeden zapisovač SQLite** . Vysoká dostupnosť je** nie je podporované** na tej topológii.

| Obmedzenie                                       | Dôsledok                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jediný spisovateľ                                | Do** nie** spustiť viacero replík proti rovnakému súboru SQLite. To kazí DB.                                                                                                                                                                                                                                     |
| Znovu vytvoriť / reštartovať / zabiť HEALTHCHECK | **Úplný výpadok** SSE počas letu, relácií hlavného panela a stavu v pamäti. Každý pripojený klient klesá. Nové požiadavky počas okna prázdneho koncového bodu získajú reverzný proxy**`502 Bad Gateway: Unknown error`** , nie OmniRoute JSON — klienti to nedokážu rozlíšiť od zlyhania poskytovateľa (#11015). |
| Rovnaká slučka udalostí ako `/healthz`           | Zaneprázdnený katalóg alebo kompresia môže oneskoriť sondy; krátky časový limit a potom sa reštartuje** iba** replika.                                                                                                                                                                                           |

**Matrica sondy** (pozri tiež [odporúčania sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sonda          | Cieľ                                                            | Nepoužívajte                                                                    |
| -------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Živosť         | TCP na `PORT` (predvolené `20128`), alebo mäkké HTTP `/healthz` | `/api/monitoring/health`                                                        |
| Pripravenosť   | HTTP `GET /healthz`                                             | Krátke časové limity, ktoré považujú slučku udalostí za zaneprázdnenú ako mŕtvu |
| Hlboké / ľudia | `/api/monitoring/health`                                        | Automatizovaná živosť kubeletu                                                  |

**Inovácie:** očakávať, že každá relácia klesne. Vypustite klientov, ak môžete; v predvolenom SQLite nie je žiadna priebežná aktualizácia. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` tiež nahradí jediný proces, keď je kontajner nezdravý – rovnaký rádius výbuchu.

Hotové manifesty a graf Helm žijú v `deploy/kubernetes/` a `deploy/helm/omniroute/` – pozrite si [príručku nasadenia Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Útržok Kubernetes pre a** jediná replika** (Vyžaduje sa opätovné vytvorenie; nezvyšujte `replicas` proti jednému súboru SQLite ):

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

`preStop` spánok umožňuje kube zahodiť koncové body služby pred SIGTERM** nové** doprava prestane zasahovať do umierajúceho procesu. `/v1/responses` SSE počas letu je vyčerpaný až do `SHUTDOWN_TIMEOUT_MS` (predvolených 30 s) prostredníctvom prenájmu vstupného s vysokou gramážou (#11015). Nové požiadavky, ktoré sa stále dostanú do procesu, dostanú `503` + `Retry-After: 5`. Medzera Obnoviť prázdny koncový bod, kým nebude náhrada pripravená, zostáva ťažkým výpadkom – to je topológia SQLite, nie chybná konfigurácia sondy.

Externý Postgres / multi-writer HA je** nie** zdokumentovaná dráha zásob. Ak potrebujete HA, ponechajte si jednu repliku alebo spustite topológiu, ktorú projekt otestoval a zdokumentoval samostatne. Práca Postgres/MySQL žije v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Do tej doby je to jediný podporovaný spôsob množenia** veľký** Kapacita `/v1/responses` je N nezávislých procesov (ďalšia sekcia), nie `replicas > 1` na jednom zväzku.

## Scale-out: N nezávislých procesov

### vlastníctvo rotácie tokenov Codex

Kópie jedného účtu Codex nesmú nezávisle spotrebovať jeho jednorazový obnovovací token. V inštanciách, ktoré využívajú iba synchronizované poverenia, nastavte `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Ponechajte ho nenastavené pre vlastníka jednej rotácie. Každý proces stále potrebuje svoj vlastný `DATA_DIR`; táto možnosť nezdieľa SQLite ani neposkytuje synchronizáciu tokenov ani distribuovaný zámok.

Pasívna inštancia znovu načíta pripojenie, keď je potrebná obnova, a prijme iba iný prístupový token, ktorému nevypršala platnosť. V opačnom prípade je obnovenie vypnuté bez vypršania platnosti alebo deaktivácie pripojenia alebo započítania zlyhania prerušovača obnovenia. Skutočné zlyhania autentifikácie proti prúdu stále využívajú bežné účtovanie zlyhaní, exponenciálne ochladzovanie a normálnu chybu klienta; deaktivácia účtu zostáva trvalá. Synchronizujte otočené tokeny vlastníka pred uplynutím platnosti prístupových tokenov (predvolená doba aktívneho obnovenia je päť minút) alebo znova naimportujte auth súbor Codex. Pasívne importy ukladajú dodané tokeny bez ich overenia na koncovom bode tokenu. Manuálne obnovenie dashboard/API vráti `409 refresh_disabled`; nové prihlasovacie údaje OAuth sú nezmenené. Pozri [referenciu prostredia](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Jeden proces uzla je** jedna hromada V8** . Dva prekrývajúce sa ~ 3 MiB / ~ 750k-token kódovací agent `POST /v1/responses` (RTK + Caveman) prerušia, že sa nahromadia na ~ 12 Gi (`FATAL ERROR: Reached heap limit`) a môžu OOM 16 Gi cgroup. Pozri [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). To meranie je a** pamäť-rozpočet** varovanie, nejde o produkt hard-max dvoch súbežných dlhých `/v1/responses`. Prijatie ťažkej konverzácie je hradené automaticky odvodeným bajtovým rozpočtom príjmu (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) s veľkosťou z rovnakého stropu V8/cgroup — ktorý ho prepíše smerom nahor (alebo nastavením starého obmedzenia počtu žiadostí `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ) v už tak veľkom procese, čím sa znovu zavedie prerušenie. Malé chaty, `/healthz`, `/v1/models` a MCP sú** nie** v tej čiapke.

### Jeden proces: viac ako dva dlhé `/v1/responses`

A** zdravý** proces (hromada pod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, predvolená `0.75`)** mája** spustiť viac ako dva súbežné dlhé `POST /v1/responses` keď má celý procesný rozpočet na bajt (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) stále miesto. Telá s `OMNIROUTE_CHAT_LARGE_BODY_BYTES` alebo nad ňou (predvolená hodnota 256 KiB) prevezmú rovnakú ťažkú váhu ako požiadavky so štruktúrou a používajú rovnaký [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` únik (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Desiatky súbežných dlhých klientov SSE (operátori často potrebujú 40–50) je a** pamäť-rozpočet** otázka — veľkosť halda + primary/headroom sloty + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nie je pevný limit produktu „max 2“. Natlakovaná halda sa stále sype s opakovaným `503`, takže #7849 sa nevracia.

Komu** množiť hromady** (nezávislé staré priestory V8)** dnes** :

| Do                                                                                                                                                        | nie                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Bežať** N containers/pods** , každý so svojím** vlastné** `DATA_DIR` / objem                                                                              | Nastavte `replicas > 1` proti jednému súboru SQLite                          |
| Veľkosť ťažké počas letu + zdravá výška z haldy / letového bajtového rozpočtu; 1–2 je konzervatívna predvolená hodnota #7849, nie je to tvrdý produkt max | Dajte jednému procesu 8 × RAM a neobmedzený počet                            |
| Voliteľné: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` pre** počítadlá zdieľaných kvót**                                                         | Považujte Redis za zdieľané SQLite — to nie je                               |
| Duplikovať tajomstvá poskytovateľa do každej inštancie (alebo akceptovať rozdelené dashboardy)                                                            | Očakávajte jeden informačný panel / jeden protokol hovorov medzi inštanciami |
| Predná časť s akýmkoľvek vyvažovačom zaťaženia; stačí prilepiť pomocou kľúča API alebo relácie                                                            | Vyžadovať midlvér zohľadňujúci veľkosť špecifického dodávateľa               |

Afinitu relácie k účtu možno zdieľať aj prostredníctvom Redis: nastavte `OMNIROUTE_SESSION_AFFINITY_STORE=redis` a `REDIS_URL` pre každý proces s rovnakým `REDIS_KEY_PREFIX` a kladným nastavením `sessionAffinityTtlMs`. Piny rozdeľujú hašované identity používateľských účtov na vhodné lokálne pripojenie každého procesu, takže účty OAuth so zodpovedajúcimi metadátami identity nemusia mať zodpovedajúce pripojenie IDs. Známe identity účtov majú prednosť pred protichodnými miestnymi IDs v rozlíšení pinov a stráženom vysťahovaní; záznamy bez identity (alebo žiadatelia o vysťahovanie bez identity) si zachovávajú dedičný strážca ID. Účty bez stabilnej identity používania stále vyžadujú zhodu IDs. Chyby Redis alebo hovory presahujúce 100 ms sa vrátia späť do lokálneho SQLite. Každý obchod s afinitou Redis obmedzuje zostávajúce operácie na 8, obchádza Redis okamžite, keď je plný, a uvoľňuje sloty iba vtedy, keď sa podkladová práca ustáli, nie v termíne volajúceho. Počas výpadku Redis neexistuje žiadna zdieľaná pravda: každá inštancia sa vráti k svojej vlastnej lokálnej afinite, relácie sa môžu znova pripnúť raz za inštanciu a inštancie sa môžu líšiť. Lepkavosť sa znova zbližuje cez Redis keď sa obnoví. Časový limit ohraničuje čakanie, nie odoslaný EVAL, ktorý môže pristáť po núdzovom režime. Smerovacie zápisy porovnávajú presnú hodnotu pozorovanú rozhodnutím o smerovaní, nie nové čítanie v čase mutácie; pozorovaná chyba alebo záložné pozorovanie SQLite sa porovnáva ako chýbajúci kľúč Redis. Zastarané piny sú nahradené jedným CAS, takže neskorý príkaz nemôže nahradiť alebo odstrániť novší, iný pin. Redis číta atómovo vráti hodnotu a zostávajúci server TTL; kladné PTTL (alebo žiadne uplynutie platnosti) určuje životnosť, nie časová pečiatka JSON zapisovateľa alebo hodiny čitateľa. Lokálne snímky mapujú zostávajúce TTL do lokálneho termínu; existujúce kľúče JSON zostanú čitateľné a ich nespracované bajty sa zachovajú pre CAS. Redis je jediným zdrojom pravdy, zatiaľ čo odpovedá. Potvrdené zdieľané upozornenia, dotyky a vymazania odstránia lokálny záznam, nikdy ho neinštalujte ani neobnovujte. SQLite na ceste Redis obsahuje iba vlastné záložné rozhodnutia tejto inštancie týkajúce sa chýb Redis, časových limitov alebo saturácie prijatia, ohraničené TTL ako predtým. Chýbajúci lokálny pin pri neskoršom výpadku stojí jeden nový výber (jedno zmeškanie rýchlej vyrovnávacej pamäte), nie nesprávny alebo vyradený účet. Odmietnuté upserts vracajú zdieľaného víťaza a jeho zostávajúce TTL atomicky: bežný výber znova skontroluje mapovaný miestny termín a použije stále živého oprávneného víťaza, pričom sa dotkne použitia a prihlásenia pre tento účet bez ďalšieho zdieľaného zápisu. Ak nie je k dispozícii, výber ponechá miestneho kandidáta, ponechá zdieľaný pin nezmenený a vydá jednu ladiacu správu. Odmietnuté CAS nezapisuje SQLite; chyby Redis, časové limity alebo saturácia prijatia namiesto toho použijú existujúcu lokálnu operáciu. Ak odpoveď odoslanej mutácie príde po uplynutí časového limitu (prijatá, odmietnutá alebo chyba), synchrónne presné porovnanie a vymazanie serializovanej hodnoty odstráni iba bajtovo identický riadok záložného limitu. Medzi týmto porovnaním a vypustením sa nečaká; novší zápis výpadku je zachovaný. Strážené vysťahovanie odstráni vlastný lokálny kód zlyhaného účtu aj pri vypnutom Redis a po potvrdenom zdieľanom vysťahovaní ho znova vyčistí. Čakajúce skoršie zdieľané odpovede nemôžu obnoviť vyradený lokálny pin, pretože zdieľané úspechy nikdy nezapíšu SQLite. Neskorší núdzový výpadok môže znova pripnúť účet; neskôr akceptovaný zdieľaný zápis existuje iba v Redis. Chyby Redis nekonzultujú miestny záložný štát. Keď je ovládač vypnutý, novo zvolené kolíky si zachovávajú starý štvorpoľový tvar SQLite JSON ; iba smerovanie Redis pridáva identitu hashovaného účtu. Vopred vyzdvihnuté kolíky sa znova skontrolujú na hranici ich platnosti. Redis výber bez prenájmu znova načíta obchod, ale synchrónne plánovanie prenájmu môže stále používať špendlík vyradený medzi predbežným načítaním a plánovaním (akceptované okno s najlepším úsilím). Potvrdenie o prenájme nemôže zmeniť účty po trvalom nároku: pri odmietnutom upsert si ponechá nárokovaného kandidáta len pre túto požiadavku a ponecháva zdieľaného víťaza nedotknutého, takže dohoda medzi inštanciami je ohraničená touto cestou. Zvyšok tabuľky stále platí: toto nezdieľa priľnavosť kombinovanej relácie, natívne Codex otočné kolíky, semafory účtov, uzamknutia, limity výdavkov, konfiguráciu alebo protokoly hovorov.

Hardvér: pre inštanciu súbežné dlhé `/v1/responses` je a** pamäť-rozpočet** otázka (hromada + inflight-byte / #10110). `N` nezávislé `DATA_DIR` s stále množia hromady: hostiteľ RAM musí pokrývať `N × cgroup`, nie „jeden 16 Gi pod s N = 8“. Nikdy `replicas > 1` na jeden súbor SQLite.

Zostavte náčrt (dve kôpky, dva zväzky — nie `deploy.replicas: 2`):

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

Hustota počas procesu (stlačenie izolátu HTTP ) je [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jeden logický klaster v zdieľanom trvalom stave je [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionálne chyby Gemini v Dockeri

Google AI Studio / Gemini API môže vrátiť HTTP 400 s chybou FAILED_PRECONDITION a
`User location is not supported for the API use.` Úspešná požiadavka na hostiteľovi
nedokazuje, že kontajner používa rovnakú odchádzajúcu trasu. Poradie DNS,
pripojenie IPv4/IPv6, smerovanie VPN a nakonfigurované proxy servery sa môžu líšiť. Skontrolujte
[regióny podporované Googlom](https://ai.google.dev/gemini-api/docs/available-regions),
ako aj skutočnú trasu pripojenia; samotná táto chyba neznamená, že kľúč API je nesprávny.

### Uprednostnite proxy špecifické pre pripojenie

Pre dotknuté pripojenie Gemini použite
[konfiguráciu proxy pre konkrétne pripojenie](../ops/PROXY_GUIDE.md#4-level-proxy-system)
v OmniRoute a potom zopakujte **Test pripojenia** a malú požiadavku
s rovnakým modelom. Takto zostane zmena smerovania obmedzená na dané pripojenie. Overte,
že proxy je dostupné z kontajnera a že ho pripojenie skutočne vyberá.
Zmena trasy nezaručuje regionálnu oprávnenosť u poskytovateľa.

### Porovnajte sieťové pripojenie hostiteľa a kontajnera

Pri porovnávaní autentifikovaných výsledkov zachovajte rovnaký kľúč, model aj požiadavku; nikdy
nevkladajte prihlasovacie údaje, heslá proxy ani úplné autorizačné hlavičky do hlásenia problému.
Najprv skontrolujte, ktoré rodiny adries ponúka systémový resolver, použitím rovnakého príkazu
na hostiteľovi aj vnútri kontajnera:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Nahraďte `omniroute` službou, ktorú používate (napríklad `omniroute-web`). Tieto
príkazy vypíšu rodiny adries bez prihlasovacích údajov alebo IP adries. Vrátená hodnota `6`
označuje iba výsledok DNS pre IPv6: **nedokazuje** použiteľnú trasu IPv6 ani prístup k API.
Ak je nainštalovaný `curl`, porovnajte `curl -4 -I https://generativelanguage.googleapis.com`
s `curl -6 -I https://generativelanguage.googleapis.com` v oboch prostrediach.
Odpoveď HTTP dokazuje konektivitu pre daný test, aj keď ide o neautentifikovanú
chybu; oprávnenosť na používanie Gemini overí iba autentifikovaná požiadavka modelu.

### Alternatíva na úrovni hostiteľa: funkčné IPv6 a politika resolvera

Autor hlásenia [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) obnovil
prístup vo svojom prostredí povolením IPv6 pre kontajnery a zmenou výberu adries v glibc.
Považujte to za alternatívu špecifickú pre dané prostredie. Pred úpravou preferencií resolvera
overte funkčnosť IPv6 na hostiteľovi, odchádzajúce pripojenie a smerovanie kontajnera, ako aj pravidlá firewallu.
Samotná súkromná adresa ULA nedokazuje verejnú konektivitu IPv6.

Pre služby, ktoré sú už pripojené k predvolenej sieti Compose, tento fragment povolí
IPv6 v danej sieti; zachovajte ostatné nastavenia služby, porty, zväzky a konfiguráciu:

```yaml
networks:
  default:
    enable_ipv6: true
```

Pri pomenovanej sieti povoľte túto možnosť v sieti, ku ktorej sa služba skutočne pripája. Docker môže
prideliť podsieť ULA; explicitnú, neprekrývajúcu sa podsieť vyberte iba vtedy, keď to vaša sieť
vyžaduje. Pozrite si dokumentáciu k
[sieťam IPv6 v Dockeri](https://docs.docker.com/engine/daemon/ipv6/)
a [možnostiam sietí Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

V **obraze založenom na glibc** môže `/etc/gai.conf` zmeniť výber adries. Aktuálny
Dockerfile repozitára používa Debian; vlastné obrazy založené na musl tento mechanizmus nepoužívajú.
Nahlásená úprava mení označenie ULA z `label fc00::/7 6` na
`label fc00::/7 1`. Začnite úplnou tabuľkou politík obrazu a zachovajte jej ostatné
položky: pridaním položky `label` alebo `precedence` sa nahradí predvolená tabuľka, takže súbor
obsahujúci iba zmenený riadok nestačí.
[Referenčná dokumentácia ku konfigurácii glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
opisuje túto sémantiku. Skontrolovaný súbor pripojte iba na čítanie k `/etc/gai.conf`
a službu znova vytvorte, aby sa zmena použila.

Tým sa zmení výber adries operačného systému pre **všetku odchádzajúcu komunikáciu v danom kontajneri**.
Neprinúti to každú aplikáciu zvoliť IPv6: dôležité je aj poradie DNS a výber
pripojenia v Node. Konkrétne `--dns-result-order=ipv4first` uprednostňuje IPv4 a
nie je riešením zlyhania spôsobeného výlučným použitím IPv4. Pozrite si
[poradie DNS v Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Po každej zmene na úrovni hostiteľa znova otestujte Gemini aj ostatných poskytovateľov. Ak chcete zmenu vrátiť späť,
odstráňte vlastné pripojenie súboru `gai.conf`, obnovte predchádzajúcu konfiguráciu siete a
počas servisného okna znova vytvorte dotknutú službu alebo sieť. Opätovné vytvorenie siete
môže prerušiť činnosť ostatných kontajnerov, ktoré sú k nej pripojené; neodstraňujte zväzok s trvalými údajmi.

## Dôležité poznámky

- **Režim SQLite WAL:** Príkazu `docker stop` je potrebné umožniť dokončenie, aby OmniRoute mohol zapísať najnovšie zmeny späť do `storage.sqlite` pomocou kontrolného bodu. Pribalené súbory Compose už nastavujú 40-sekundovú lehotu na zastavenie. Ak obraz spúšťate priamo, zachovajte `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Nastavte na `true`, ak sú pravidelné zálohy a zálohy pred zápisom spravované externe. Migrácie existujúcej databázy naďalej vyžadujú vlastnú trvalú bezpečnostnú snímku a ochranu pred hromadnou migráciou.
- **Trvalé uloženie údajov:** Vždy pripojte zväzok k `/app/data`, aby sa databáza, kľúče a konfigurácie zachovali aj po reštartovaní kontajnera.
- **Konfigurácia portu:** Ak chcete zmeniť predvolený port `20128`, prepíšte premennú prostredia `PORT`.

## Pozrite tiež

- [Príručka nasadenia na VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Nastavenie VM + nginx + Cloudflare
- [Príručka nasadenia na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Nasadenie na Fly.io
- [Konfigurácia prostredia](../reference/ENVIRONMENT.md) — Kompletný prehľad nastavení `.env`
