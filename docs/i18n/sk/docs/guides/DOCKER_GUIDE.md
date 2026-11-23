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

## Rýchle spustenie

> **Vlastné hostenie jediným príkazom?** Pozrite si
> [príručku vlastného hostenia](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (zverejnený obraz +
> Redis, iba na rozhraní loopback, bez výberu profilu). Nižšie uvedené rýchle spustenie
> predstavuje postup s jedným kontajnerom pre používateľov, ktorí už Redis prevádzkujú inde.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Použitie súboru s premennými prostredia

```bash
# Najskôr skopírujte a upravte .env
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

## Fázy Dockerfile

Repozitár obsahuje viacfázový Dockerfile (`Dockerfile`). K dispozícii sú štyri fázy; vyberte správny `target` pre svoj prípad použitia.

| Fáza          | Základný obraz        | Účel                                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Nainštaluje závislosti (`npm ci --legacy-peer-deps`) a spustí `npm run build` (predvolene Turbopack — pozrite si časť Zdroje počas zostavovania nižšie)                                                                                                                                                    |
| `runner-base` | `node:26-trixie-slim` | Produkčné behové prostredie so samostatným výstupom Next.js. **Neobsahuje žiadne CLI poskytovateľov.**                                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Pridáva `git`, `docker.io`, `docker-compose` a globálne CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Vyberte túto fázu pre agentné pracovné postupy.**                                                                                                                        |
| `runner-web`  | `runner-base`         | Pridáva Playwright a prehliadač Chromium (`--with-deps`) pre poskytovateľov webových relácií: `gemini-web`, `claude-web`, `claude-turnstile`. **Vyberte túto fázu, keď používate týchto poskytovateľov** — obyčajný obraz bez nej zlyhá pri požiadavke (pozrite si poznámku `-web` v časti Kanály vydaní). |

Manuálne zostavenie konkrétneho cieľa:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Zdroje počas zostavovania

Nároky fázy `builder` riadia tri argumenty zostavenia. Platia iba počas zostavovania —
`OMNIROUTE_MEMORY_MB` (nižšie) je samostatné nastavenie pre beh aplikácie.

| Argument zostavenia         | Predvolená hodnota | Účinok                                                                                               |
| --------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`                | `0` zostavuje pomocou webpacku: nižšia špičková spotreba pamäte, ale pomalšie. `1` zapína Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`             | Limit haldy V8 (`--max-old-space-size`) pre spustený proces `next build`.                            |
| `OMNIROUTE_BUILD_WORKERS`   | `2`                | Nastavuje `CIRCLE_NODE_TOTAL`; Next odvodí `workers = N - 1` pre zhromažďovanie údajov stránok.      |

`OMNIROUTE_BUILD_WORKERS` je parameter, ktorý treba zvýšiť na výkonnom zostavovacom systéme, a zároveň parameter,
ktorý treba preveriť, keď zostavovanie s obmedzenými zdrojmi zlyhá **po** hlásení `✓ Compiled successfully`. Každý
pracovný proces pre údaje stránok je samostatným procesom, rovnako ako samotný rodičovský proces `next build`;
reprodukcia na živom VPS (problém #7518) namerala špičkové RSS každého procesu na úrovni
~4,5 GB bez ohľadu na príznak haldy `NODE_OPTIONS` (Turbopack kompiluje v natívnej/Rust pamäti
mimo haldy V8). Predvolená hodnota `2` (→ 1 pracovný proces, celkovo 2
procesy) je nastavená pre hostované spúšťacie prostredia GitHub so 16 GB / 4 vCPU, ktoré používa
publikačný kanál. Pri hodnote `8` (→ 7 pracovných procesov) sa tomuto spúšťaciemu prostrediu minula pamäť a
buildkit ukončil krok s chybou `ResourceExhausted: ... cannot allocate memory`;
hodnota `3` (→ 2 pracovné procesy) sa stále nezmestila, keď sa RSS jednotlivých procesov zmeralo
priamo namiesto odvodenia. `tests/unit/docker-build-memory-budget.test.ts`
vykonáva výpočet podľa nameranej hodnoty a zlyhá, ak ktorýkoľvek z parametrov
prekročí možnosti spúšťacieho prostredia.

Turbopack kompiluje v natívnej pamäti Rust, ktorá sa nachádza **mimo** haldy V8, takže
`OMNIROUTE_BUILD_MEMORY_MB` ju neobmedzuje. Na hostiteľovi s pamäťovým limitom
potom nástroj OOM killer ukončí zostavovanie signálom SIGKILL úplne bez chybového textu — jednoducho
sa zastaví uprostred kroku `Creating an optimized production build`, čo vyzerá skôr ako zamrznutie
než ako nedostatok pamäte. Preto `Dockerfile` predvolene používa webpack
(`OMNIROUTE_USE_TURBOPACK=0`), na rozdiel od `npm run dev` / `npm run build`, kde
je v kóde predvolený Turbopack: obyčajný príkaz `docker build .` bez argumentov zostavenia (ktorý
spúšťa Railway a ďalší hostitelia s nasadením jedným kliknutím) nesmie na zostavovacom systéme
s obmedzenou pamäťou potichu zlyhať. Publikované obrazy už explicitne odovzdávajú
`OMNIROUTE_USE_TURBOPACK=0` v súbore `docker-publish.yml`. Na zostavovacom systéme s dostatkom RAM
zapnite Turbopack, aby bolo zostavovanie rýchlejšie:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` je zapnutý, takže `next build` spúšťa rodičovský **aj** pracovný
proces a každý z nich samostatne rešpektuje `OMNIROUTE_BUILD_MEMORY_MB`. Nastavte limit kontajnera
približne nad dvojnásobok tejto hodnoty, nie iba nad jej jednonásobok.

Merané v tomto strome (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Nástroj na zostavovanie | Limit kontajnera | Výsledok                                             |
| ----------------------- | ---------------- | ---------------------------------------------------- |
| Turbopack               | 8 GiB / 16 GiB   | v oboch prípadoch potichu ukončené nástrojom OOM     |
| webpack                 | 8 GiB            | pracovný proces zostavenia ukončený signálom SIGKILL |
| webpack                 | 12 GiB           | úspešné, špička na úrovni 11,1 GiB                   |

### Predvolené nastavenia behu

Predvolené hodnoty exportované fázou `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Správanie pamäte v Dockeri:

- Obraz nastavuje `OMNIROUTE_MEMORY_MB=1024` a odvodzuje z neho `NODE_OPTIONS=--max-old-space-size=1024`.
- Samotný serverový proces spúšťa samostatný spúšťač, ktorý načíta `OMNIROUTE_MEMORY_MB` a pridá `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node používa poslednú zopakovanú hodnotu `--max-old-space-size`, takže nastavenie `OMNIROUTE_MEMORY_MB` riadi efektívny limit haldy v Dockeri.
- Keďže ho obraz nastavuje vždy, vlastná záložná hodnota spúšťača kalibrovaná podľa RAM sa v Dockeri nikdy nepoužije. Pre danú záťaž ju explicitne zvýšte (pozrite tabuľku nižšie). Hodnota `2048` je pre `/v1/responses` kódovacích agentov stále príliš nízka.

### Operačná pamäť pre kódovacích agentov

Predvolená hodnota 1 GiB v Dockeri je minimom pre ovládací panel alebo nenáročný čet, nie veľkosťou pre produkčné nasadenie. Dlhé telá požiadaviek `POST /v1/responses` (stovky správ, desiatky nástrojov) počas kompresie uchovávajú v pamäti viacero grafov. Dve prekrývajúce sa požiadavky s veľkosťou približne 3 MiB / 750 000 tokenov spôsobili ukončenie V8 pri **12 GiB** priestoru starej generácie (`FATAL ERROR: Reached heap limit`) a tiež OOM v cgroup s limitom 16 GiB. Pozrite si [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Nastavte **cgroup `--memory` nad veľkosť haldy** — natívne vyrovnávacie pamäte, SQLite a medzivýsledky kompresie sa nachádzajú mimo V8.

| Pracovná záťaž                              | `OMNIROUTE_MEMORY_MB`        | Kontajner / cgroup          | Poznámky                                                                                                                |
| ------------------------------------------- | ---------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Ovládací panel, jeden nenáročný čet         | `1024` (predvolené v obraze) | ≥2 GiB                      |                                                                                                                         |
| Jeden kódovací agent (Claude/Codex/Grok)    | `8192`                       | ≥10 GiB                     | Typická relácia jedného agenta s `/v1/responses`                                                                        |
| Dve súbežné dlhé požiadavky `/v1/responses` | `10240`–`12288`              | ≥12–16 GiB                  | Namerané ukončenie V8 pri halde s veľkosťou približne 12 GiB                                                            |
| Tri alebo viac súbežných dlhých kontextov   | nespúšťajte v jednom procese | serializujte / pridajte RAM | Predvolene je povolená 1 prebiehajúca náročná požiadavka; zvýšenie tohto limitu bez pridania RAM opäť spôsobí ukončenie |

`omniroute serve` na fyzickom systéme kalibruje približne 35 % RAM (s obmedzením na rozsah `[512, 4096]`), keď premenná `OMNIROUTE_MEMORY_MB` **nie je nastavená**. Docker vždy nastavuje hodnotu `1024`, takže táto kalibrácia sa v oficiálnom obraze nikdy nevykoná.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## Reverzný proxy server na podceste (Traefik / nginx)

Hodnota `basePath` systému Next.js sa skompiluje do samostatného balíka. OmniRoute zaznamená vloženú
hodnotu do kontrolného súboru v koreňovom adresári aplikácie (zapíše sa počas `npm run build`; číta ho
`scripts/docker/ensure-docker-base-path.mjs`) a pri spustení kontajnera ju porovná s
`OMNIROUTE_BASE_PATH`. Keď sa hodnoty líšia a obraz bol zostavený pre koreň domény,
vstupný bod prepíše manifesty samostatného balíka, vložené literály
`basePath`/`assetPrefix` (Next 16 vykresľuje adresy URL prostriedkov SSR iba z
`assetPrefix` — nástroj na úpravu doň zrkadlovo zapíše podcestu), vložené adresy URL prostriedkov
`/_next/static` (manifesty odkazov klienta, importy médií, predvykreslené
chybové stránky) a klientsku náhradu `process.env` pred spustením
`node dev/run-standalone.mjs`.

### Zostavenie pomocou Compose (odporúčané)

Nastavte obe premenné v `.env` a potom obraz znova zostavte, aby sa jeho konfigurácia zhodovala s konfiguráciou za behu:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` odovzdáva `OMNIROUTE_BASE_PATH` ako argument zostavenia Dockeru aj ako
premennú prostredia za behu.

### Vopred zostavený koreňový obraz + podcesta za behu

Publikované obrazy `diegosouzapw/omniroute:*` sú zostavené pre koreň domény. Stále môžete
nastaviť `OMNIROUTE_BASE_PATH` za behu; kontajner pri spustení jednorazovo upraví balík.
Skombinujte ju so zodpovedajúcim verejným pôvodom:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Nakonfigurujte reverzný proxy server tak, aby preposielal **celú** externú cestu (neodstraňujte
prefix). Traefik by mal smerovať `PathPrefix(`/omniroute`)` do kontajnera bez
`StripPrefix`, aby Next.js prijímal `/omniroute/...` a poskytoval prostriedky z
`/omniroute/_next/...`.

Kontrola stavu Dockeru overuje odľahčený koncový bod životného cyklu `/healthz` s prefixom
aktívnej hodnoty `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` zostáva dostupný na
diagnostiku pre používateľov a informačné panely; ak naň chcete znova nasmerovať HEALTHCHECK kontajnera (napríklad
na dôkladnú kontrolu stavu), nastavte `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Táto cesta vykonáva **hĺbkovú** kontrolu (databáza + súhrn monitorovania) — je vhodná pre
zriedkavý Docker `HEALTHCHECK`, ak sa ho rozhodnete znova používať, ale **nie** pre intervaly
Kubernetes `livenessProbe`.

Pre orchestrátory (Kubernetes, Nomad atď.):

| Sonda              | Uprednostnite                                                             | Vyhnite sa                                                                         |
| ------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Životnosť          | HTTP `GET /livez` alebo TCP na hlavnom porte (`PORT`, predvolene `20128`) | `/api/monitoring/health` ako sonde životnosti                                      |
| Pripravenosť       | HTTP `GET /healthz`                                                       | Krátkym časovým limitom, ktoré považujú zaneprázdnenú slučku udalostí za nefunkčnú |
| Hĺbková / blackbox | `/api/monitoring/health`                                                  | —                                                                                  |

`/healthz` hlási stav životného cyklu procesu (`ok` / `starting` / `stopping`). `/livez` iba
overuje, či je proces aktívny (vráti 200 vždy, keď sa obslužný program môže spustiť; nečaká na
pripravenosť). Obe kontroly stále bežia v rovnakej slučke udalostí Node ako spracovanie požiadaviek, takže
spracovanie katalógu alebo kompresia náročná na CPU ich môžu oneskoriť — zaneprázdnený ≠ nefunkčný. Ak
vyprší časový limit HTTP sond, uprednostnite kontrolu životnosti cez TCP. Úplné odporúčania pre sondy:
[Sprievodca monitorovaním — odporúčania pre sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose s Caddy (automatické TLS pre HTTPS)

OmniRoute možno bezpečne sprístupniť pomocou automatického poskytovania SSL certifikátov v Caddy. Uistite sa, že DNS záznam A vašej domény smeruje na IP adresu vášho servera.

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
      # Verejný pôvod pre prehliadač používaný pre spätné volania OAuth, odkazy ovládacieho panela a generované verejné URL adresy.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interná URL adresa medzi servermi pre naplánované úlohy / požiadavky na seba samého.
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

Caddy nastavuje štandardné hlavičky preposielania pre nadradený kontajner. OmniRoute používa
`NEXT_PUBLIC_BASE_URL` ako kanonický verejný pôvod pre spätné volania OAuth a generované verejné
odkazy; autentifikované zápisy ovládacieho panela používajú požiadavky rovnakého pôvodu spolu s ochranou CSRF
viazanou na reláciu. `OMNIROUTE_TRUST_PROXY` povoľte iba pri pokročilých nasadeniach, pri ktorých zámerne
chcete, aby OmniRoute odvodzoval verejný pôvod z dôveryhodných preposlaných hlavičiek namiesto explicitnej
konfigurácie.

## Rýchly tunel Cloudflare

Podpora ovládacieho panela pre nasadenia Docker zahŕňa **rýchly tunel Cloudflare** na jedno kliknutie v časti `Ovládací panel → Koncové body`. Pri prvom povolení sa `cloudflared` stiahne iba v prípade potreby, spustí sa dočasný tunel k vášmu aktuálnemu koncovému bodu `/v1` a vygenerovaná URL adresa `https://*.trycloudflare.com/v1` sa zobrazí priamo pod vašou bežnou verejnou URL adresou.

Panely tunelov koncových bodov (Cloudflare, Tailscale, ngrok) možno zobraziť alebo skryť v časti `Nastavenia → Vzhľad` bez zmeny stavu aktívneho tunela.

### Poznámky k tunelom

- URL adresy rýchlych tunelov sú dočasné a menia sa po každom reštarte.
- Rýchle tunely sa po reštarte OmniRoute alebo kontajnera automaticky neobnovia. V prípade potreby ich znova povoľte z ovládacieho panela.
- Spravovaná inštalácia v súčasnosti podporuje Linux, macOS a Windows na `x64` / `arm64`.
- Spravované rýchle tunely predvolene používajú prenos HTTP/2, aby sa zabránilo rušivým upozorneniam na vyrovnávaciu pamäť UDP protokolu QUIC v obmedzených kontajnerových prostrediach. Ak chcete použiť iný prenos, nastavte `CLOUDFLARED_PROTOCOL=quic` alebo `auto`.
- Obrazy Docker obsahujú systémové koreňové certifikáty CA a odovzdávajú ich spravovanému procesu `cloudflared`, čím sa zabraňuje zlyhaniam dôveryhodnosti TLS pri inicializácii tunela v kontajneri.
- Ak chcete, aby OmniRoute namiesto sťahovania použil existujúci binárny súbor, nastavte `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`.

## Značky obrazov

| Obraz                    | Značka   | Veľkosť | Popis                                                             |
| ------------------------ | -------- | ------- | ----------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Najvyššia **publikovaná** stabilná verzia SemVer (nie git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Pre GitOps pripnite túto triedu značiek                           |

Manifest pre viacero platforiem: natívne `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automaticky vyberie zodpovedajúcu architektúru; ak potrebujete vynútiť emuláciu AMD64 na hostiteľoch ARM, zadajte `--platform linux/amd64`.

### Kanály vydaní

OmniRoute publikuje samostatné kanály Docker pre stabilné vydania, testovanie aktívnej vetvy vydania a vývojové zostavy.

| Kanál                           | Zdroj                                            | Meniteľnosť                    | Odporúčané použitie                                                                                                |
| ------------------------------- | ------------------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Podpísané/verzionované vydanie                   | Nemenné                        | Produkčné nasadenia, ktoré sú pripnuté na presné vydanie                                                           |
| `:latest` / `:latest-web`       | Najvyššia **publikovaná** stabilná verzia SemVer | Meniteľný stabilný ukazovateľ  | Sleduje stabilné vydania **po** úlohe publikovania SemVer — **nesleduje** `main` ani nevydané revízie `release/v*` |
| `:next` / `:next-web`           | Aktuálna predvolená vetva `release/v*`           | Meniteľný predbežný ukazovateľ | Testovanie opráv, ktoré sa dostali do aktívnej vetvy vydania, ale ešte nie sú súčasťou stabilného vydania          |
| `:main` / `:main-web`           | Vetva `main`                                     | Meniteľný vývojový ukazovateľ  | Iba na vývojové a integračné testovanie                                                                            |

#### Poskytovatelia webových relácií: obrazy `-web`

Každý z vyššie uvedených kanálov je dostupný aj ako značka `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) zostavená z fázy `runner-web` — ide o rovnaký obraz doplnený o Playwright a prehliadač Chromium. Bežný obraz sa dodáva **bez** prehliadača Chromium; `gemini-web`, `claude-web` a `claude-turnstile` ho vyžadujú.

Zlyhanie je odložené a nenastáva pri spustení: títo poskytovatelia zobrazujú svoje modely a v ovládacom paneli sa javia ako pripojení, pričom zlyhá až prvá požiadavka s hlásením

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ak používate týchto poskytovateľov, stiahnite značku `-web` kanála, ktorý už používate — nič iné sa nemení. Pri inštalácii cez npm/CLI (bez obrazu Docker) je ekvivalentnou chýbajúcou súčasťou binárny súbor prehliadača: na hostiteľovi spustite `npx playwright install chromium`.

#### Používanie kanála predbežných vydaní

Kanál `next` sa zostavuje nanovo pri každom pushnutí do aktuálnej predvolenej vetvy `release/v*` a publikuje sa pre architektúry AMD64 aj ARM64. Staršie vetvy údržby ho nemôžu prepísať. Kanál poskytuje stiahnuteľný obraz s opravami, ktoré boli zlúčené do aktívnej vetvy vydania ešte pred vytvorením ďalšieho stabilného tagu.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

V prípade Docker Compose prepíšte tag obrazu používaný vybraným profilom, potom stiahnite obraz a znova vytvorte službu:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Bezpečnosť a návrat k predchádzajúcej verzii

`next` je pohyblivý kanál predbežných vydaní. Môže sa zmeniť pri každom pushnutí do aktívnej vetvy vydania a **nie je podporovaný na produkčné použitie**. Pri vyhodnocovaní konkrétneho zostavenia pripnite digest obrazu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Pred testovaním zálohujte dátový zväzok OmniRoute alebo pripojený dátový adresár. Ak sa chcete vrátiť k predchádzajúcej verzii, obnovte predtým používanú stabilnú verziu alebo digest a znova vytvorte kontajner:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Zostavenie z vetvy vydania nikdy nemôže posunúť `latest`; stabilný ukazovateľ môže aktualizovať iba vyhovujúca stabilná sémantická verzia. Obrazy `next` si zachovávajú kontrolu obrazu vydania a blokujúcu bránu pre zraniteľnosti úrovne CRITICAL.

**`latest` nezaručuje aktuálnosť voči git.** Zlúčené opravy vo vetve `main` alebo v aktívnej vetve `release/v*` sa v `:latest` **nenachádzajú**, kým sa nepublikuje stabilný obraz SemVer a úloha publikovania nepovýši `:latest` (rovnaký digest ako daná verzia SemVer). Ak sa zdá, že `latest` zostal nezmenený, hoci GitHub už opravu zobrazuje, stiahnite `:next` a otestujte vetvu vydania alebo počkajte na tag SemVer.

| Čo chcete                                                                               | Použite                                 |
| --------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps/produkčné prostredie, ktoré sa nesmie svojvoľne meniť                            | Pripnite `:X.Y.Z` (alebo digest obrazu) |
| Sledovať publikované stabilné verzie a pri každom vydaní akceptovať opätovné vytvorenie | `:latest`                               |
| Testovať nevydané commity `release/v*`                                                  | `:next` (nie pre produkciu)             |
| Testovať `main`                                                                         | `:main` (nie pre produkciu)             |

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

## Dostupnosť: predvolená databáza SQLite podporuje jednu repliku

Štandardná konfigurácia OmniRoute pre Docker/Kubernetes pozostáva z **jedného procesu Node + jedného zapisovacieho procesu SQLite**. Vysoká dostupnosť **nie je v tejto topológii podporovaná**.

| Obmedzenie                                            | Dôsledok                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jeden zapisovací proces                               | **Nespúšťajte** viacero replík nad rovnakým súborom SQLite. Došlo by k poškodeniu databázy.                                                                                                                                                                                                                                                                       |
| Opätovné vytvorenie/reštart/ukončenie cez HEALTHCHECK | **Úplný výpadok** prebiehajúcich spojení SSE, relácií ovládacieho panela a stavu v pamäti. Každý pripojený klient sa odpojí. Nové požiadavky počas obdobia bez dostupného koncového bodu dostanú od reverzného proxy servera odpoveď **`502 Bad Gateway: Unknown error`**, nie JSON z OmniRoute — klienti to nedokážu odlíšiť od zlyhania poskytovateľa (#11015). |
| Rovnaká slučka udalostí ako `/healthz`                | Vyťažená operácia katalógu alebo kompresie môže oneskoriť sondy; krátky časový limit potom reštartuje **jedinú** repliku.                                                                                                                                                                                                                                         |

**Matica sond** (pozrite si aj [odporúčania pre sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Sonda                   | Cieľ                                                                | Nepoužívajte                                                               |
| ----------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Životnosť               | TCP na `PORT` (predvolene `20128`) alebo jednoduché HTTP `/healthz` | `/api/monitoring/health`                                                   |
| Pripravenosť            | HTTP `GET /healthz`                                                 | Krátke časové limity, ktoré považujú vyťaženú slučku udalostí za nefunkčnú |
| Hĺbková/ľudská kontrola | `/api/monitoring/health`                                            | Automatizovanú kontrolu životnosti kubeletu                                |

**Aktualizácie:** počítajte s ukončením každej relácie. Ak môžete, odpojte klientov riadeným spôsobom; s predvolenou databázou SQLite nie je priebežná aktualizácia možná. Nastavenie Compose `restart: unless-stopped` spolu s Docker `HEALTHCHECK` tiež nahradí jediný proces, keď kontajner prejde do stavu Unhealthy — s rovnakým rozsahom dopadu.

Úryvok konfigurácie Kubernetes pre **jednu repliku** (vyžaduje sa Recreate; nezvyšujte hodnotu `replicas` pre jeden súbor SQLite):

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

Čakanie `preStop` umožní kube odstrániť koncové body Service pred SIGTERM, takže **nová** prevádzka prestane smerovať na ukončovaný proces. Prebiehajúce SSE `/v1/responses` sa dokončia najneskôr do uplynutia `SHUTDOWN_TIMEOUT_MS` (predvolene 30 s) pomocou oprávnení na prijímanie náročných požiadaviek (#11015). Nové požiadavky, ktoré sa napriek tomu dostanú k procesu, dostanú `503` + `Retry-After: 5`. Medzera s prázdnymi koncovými bodmi pri Recreate, kým nebude náhrada v stave Ready, zostáva úplným výpadkom — ide o topológiu SQLite, nie o nesprávnu konfiguráciu sondy.

Externý Postgres / HA s viacerými zapisujúcimi inštanciami **nie je** zdokumentovaný štandardne podporovaný spôsob nasadenia. Ak potrebujete HA, zachovajte jednu repliku alebo použite topológiu, ktorú projekt samostatne otestoval a zdokumentoval. Práce na podpore Postgres/MySQL sú sledované v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Kým nebude táto podpora vydaná, jediným podporovaným spôsobom zvýšenia kapacity **veľkých** `/v1/responses` je N nezávislých procesov (ďalšia časť), nie `replicas > 1` na jednom zväzku.

## Horizontálne škálovanie: N nezávislých procesov

Jeden proces Node predstavuje **jednu haldu V8**. Dve prekrývajúce sa požiadavky kódovacieho agenta `POST /v1/responses` (RTK + Caveman) s veľkosťou ~3 MiB / ~750 000 tokenov prerušia túto haldu pri ~12 Gi (`FATAL ERROR: Reached heap limit`) a môžu spôsobiť nedostatok pamäte v 16 Gi cgroup. Pozrite si [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Toto meranie je upozornením na **pamäťový rozpočet**, nie pevne stanoveným produktovým limitom dvoch súbežných dlhých požiadaviek `/v1/responses`. Prijímanie náročných chatových požiadaviek je riadené automaticky odvodeným rozpočtom bajtov na vstupe (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), ktorého veľkosť vychádza z rovnakého limitu V8/cgroup — jeho zvýšenie (alebo nastavenie staršieho limitu počtu požiadaviek `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) v procese, ktorého veľkosť už bola určená, znova spôsobí prerušenie. Malé chaty, `/healthz`, `/v1/models` a MCP **nie sú** zahrnuté do tohto limitu.

### Jeden proces: viac než dve dlhé požiadavky `/v1/responses`

**Zdravý** proces (halda pod hodnotou `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, predvolene `0.75`) **môže** spracúvať viac než dve súbežné dlhé požiadavky `POST /v1/responses`, pokiaľ je v celoprocesovom rozpočte bajtov rozpracovaných požiadaviek (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) stále dostatok miesta. Telá s veľkosťou aspoň `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (predvolene 256 KiB) získavajú rovnaký prenájom prostriedkov ako štruktúrne náročné požiadavky a používajú rovnaký únikový mechanizmus `tryAcquireHealthyHeadroom` z [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Desiatky súbežných dlhých klientov SSE (prevádzkovatelia ich často potrebujú 40 – 50) sú otázkou **pamäťového rozpočtu** — nastavte veľkosť haldy, primárnych/doplnkových slotov a `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nie pevného produktového limitu „max. 2“. Proces s preťaženou haldou naďalej odmieta požiadavky pomocou opakovateľnej chyby `503`, aby sa problém #7849 nevrátil.

Ak chcete **znásobiť počet háld** (nezávislé staré priestory V8) **už dnes**:

| Odporúčané                                                                                                                                                                                          | Neodporúčané                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Spustite **N kontajnerov/podov**, každý s **vlastným** `DATA_DIR` / zväzkom                                                                                                                         | Nastaviť `replicas > 1` pre jeden súbor SQLite                        |
| Dimenzujte náročné rozpracované požiadavky a zdravú rezervu podľa haldy / rozpočtu bajtov rozpracovaných požiadaviek; 1 – 2 je konzervatívna predvolená hodnota z #7849, nie pevný produktový limit | Poskytnúť jednému procesu 8× viac RAM a neobmedzený limit počtu       |
| Voliteľne: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` pre **zdieľané počítadlá kvót**                                                                                                     | Považovať Redis za zdieľanú databázu SQLite — nie je ňou              |
| Skopírujte tajné údaje poskytovateľov do každej inštancie (alebo akceptujte oddelené informačné panely)                                                                                             | Očakávať jeden informačný panel / jeden protokol volaní pre inštancie |
| Použite ľubovoľný nástroj na vyvažovanie záťaže; postačuje smerovanie podľa API kľúča alebo relácie                                                                                                 | Vyžadovať middleware konkrétneho dodávateľa zohľadňujúci veľkosť      |

Hardvér: počet súbežných dlhých požiadaviek `/v1/responses` na inštanciu je otázkou **pamäťového rozpočtu** (halda + bajty rozpracovaných požiadaviek / #10110). `N` nezávislých adresárov `DATA_DIR` naďalej znásobuje počet háld: RAM hostiteľa musí postačovať na `N × cgroup`, nie na „jeden 16 Gi pod s N=8“. Nikdy nepoužívajte `replicas > 1` s jedným súborom SQLite.

Náčrt konfigurácie Compose (dve haldy, dva zväzky — nie `deploy.replicas: 2`):

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

Hustota v rámci procesu (kompresia mimo izolátu HTTP) je predmetom [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jeden logický klaster nad zdieľaným trvalým stavom je predmetom [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
