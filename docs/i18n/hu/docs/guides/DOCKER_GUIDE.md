# 🐳 Docker Guide — OmniRoute (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Teljes körű Docker-telepítési referencia. A gyors kezdéshez lásd a [README Docker-szakaszát](../README.md#-docker).

## Tartalomjegyzék

- [Gyors futtatás](#quick-run)
- [Környezeti fájllal](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Elérhető profilok](#available-profiles)
- [A gazdagép CLI-eszközeinek konfigurálása, amikor az OmniRoute Dockerben fut](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-sidecar](#redis-sidecar)
- [Éles környezethez készült Compose](#production-compose)
- [A Dockerfile szakaszai](#dockerfile-stages)
- [Kritikus környezeti változók](#critical-environment-variables)
- [Docker Compose Caddyvel (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Rendszerképcímkék](#image-tags)
- [Az irányítópult frissítése Dockerben](#dashboard-updates-in-docker)
- [Rendelkezésre állás: az alapértelmezett SQLite egyetlen replikát támogat](#availability-default-sqlite-is-single-replica)
- [Gemini regionális hibák Dockerben](#gemini-regional-errors-inside-docker)
- [Fontos megjegyzések](#important-notes)

---

## Gyors futtatás

> **Saját üzemeltetés egyetlen paranccsal?** Lásd az
> [Önálló üzemeltetési útmutatót](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (közzétett rendszerkép +
> Redis, csak visszacsatolási címen érhető el, profilválasztás nélkül). Az alábbi gyors futtatási
> lehetőség az egyetlen konténeres megoldás azoknak a felhasználóknak, akik a Redist már máshol futtatják.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Környezeti fájllal

```bash
# Először másolja le és szerkessze a .env fájlt
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
# Alapprofil (CLI-eszközök nélkül)
docker compose --profile base up -d

# CLI-profil (beépített Claude Code, Codex és OpenClaw)
docker compose --profile cli up -d

# Gazdagépprofil (elsősorban Linuxhoz; csak olvasható módon csatolja a gazdagép CLI-binárisait)
docker compose --profile host up -d

# Webprofil (Chromium/Playwright a webes munkamenetet használó szolgáltatókhoz)
docker compose --profile web up -d

# CLI + CLIProxyAPI-sidecar kombinálása
docker compose --profile cli --profile cliproxyapi up -d
```

## Elérhető profilok

Az OmniRoute Compose-profilokat biztosít a fő telepítési kialakításokhoz. Válassza ki a környezetének megfelelőt.

| Profil                   | Szolgáltatás     | Mikor használja                                                                                                                                                            | Parancs                                      |
| ------------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (alapértelmezett) | `omniroute-base` | Grafikus felület nélküli kiszolgáló / minimális futtatókörnyezet, csomagolt szolgáltatói CLI-k nélkül                                                                      | `docker compose --profile base up -d`        |
| `cli`                    | `omniroute-cli`  | Agentikus munkafolyamatokhoz, amelyek meghívják az `omniroute providers/setup/doctor` parancsot és a csomagolt CLI-ket (Codex, Claude Code, Droid, OpenClaw)               | `docker compose --profile cli up -d`         |
| `host`                   | `omniroute-host` | Linux-gazdagépekhez, amelyek a `~/.local/bin`, `~/.codex`, `~/.claude` stb. csak olvasható csatolásával `network_mode`-szerű hozzáférést szeretnének a gazdagép CLI-jeihez | `docker compose --profile host up -d`        |
| `cliproxyapi`            | `cliproxyapi`    | A [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar futtatása a `8317` porton a felsőbb szintű CLI-proxyzáshoz                                           | `docker compose --profile cliproxyapi up -d` |
| `web`                    | `omniroute-web`  | Böngészőt igénylő, webes munkamenetet használó szolgáltatókhoz: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` build, beépített Chromiummal)                 | `docker compose --profile web up -d`         |

> Több profil is kombinálható: `docker compose --profile cli --profile cliproxyapi up -d`.

## A gazdagépi CLI-eszközök konfigurálása, amikor az OmniRoute Dockerben fut

Az `omniroute setup-codex`, a `setup-claude`, a `config set <tool>` és az irányítópult
**Konfiguráció mentése** gombja mind olyan fájlokat írnak, mint a `~/.codex/*.config.toml`. Ezeknek az elérési utaknak
csak azon a gépen van jelentésük, ahol a CLI ténylegesen fut. Ha ezeket a konténeren belül
futtatja, az írás a konténer saját kezdőkönyvtárába kerül (`/home/node` —
a lemezkép `USER node` felhasználóval fut), ahonnan a gazdagépi CLI soha nem fogja beolvasni, és ahol
a konténer újbóli létrehozásakor azonnal elvész.

Az OmniRoute észleli ezt, és a nem használható sikerjelzés helyett utasításokkal
megtagadja az írást: a CLI `2` kóddal lép ki, az API pedig `422`
választ ad `containerEphemeralTarget: true` értékkel.

### Javasolt: a CLI fusson a gazdagépen, az OmniRoute pedig Dockerben

A konténer szolgáltatja az API-t; a CLI a gazdagépi eszközöket konfigurálja.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # irányítsa a CLI-t a konténerre
omniroute setup-codex                      # kiírja a tényleges ~/.codex könyvtárat a gazdagépen
```

Ez a megfelelő választás, ha a Codex, a Claude Code, a Cursor vagy hasonló eszközök a
laptopján futnak — általában ez a szokásos felállás.

### Alternatíva: a gazdagépi konfigurációs könyvtárak bind csatolása (`host` profil)

Ha azt szeretné, hogy maga a konténer írja a gazdagépi konfigurációt, csatolja be a
könyvtárakat, és állítsa a `CLI_CONFIG_HOME` értékét a csatolás gyökérkönyvtárára. A `host` profil
ezt már eleve megteszi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

A bind csatolás teszi megbízhatóvá az elérési utat: az OmniRoute beolvassa a
`/proc/self/mountinfo` fájlt, és engedélyezi az írást a csatolt elérési utakra (valamint az olyan könyvtárakba,
amelyek gyermekei csatolási pontok, ami pontosan megfelel a fenti `/host-home` struktúrának), miközben
továbbra is megtagadja az írást a nem csatolt helyekre.

### Vészmegoldás: a konténer saját CLI-jeinek konfigurálása (csak indokolt esetben)

Ha a CLI-k valóban a konténeren belül találhatók (a `cli` profilban), az írás
szándékos. Adja át az `--allow-container-write` kapcsolót bármely `setup-*` parancsnak, vagy állítsa be az
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` értéket a kiszolgálóhoz. Az írás
egy arra figyelmeztető üzenet mellett folytatódik, hogy az eredmény nem marad meg a konténer megszűnése után.

> **Biztonsági figyelmeztetés — `cli` profil + `docker.sock` csatolás.**
> A `cli` profil bind csatolással csatolja a `/var/run/docker.sock` fájlt, hogy a konténeren belüli
> automatikus frissítő újra létrehozhassa a stacket a gazdagép démonjának használatával
> (az `src/lib/system/autoUpdate.ts` ellenőrzi ezt a socketet, és kihagyja a
> Docker-útvonalat, ha az nem található). Ez a socket **a gazdagépi root jogosultsághoz vezető bizalmi
> határ**: bármi, ami eléri, root jogosultsággal vezérelheti a gazdagép Docker-démonját —
> létrehozhatja, vizsgálhatja, leállíthatja és eltávolíthatja a gazdagép bármely konténerét.
> Következmények:
>
> 1. **Soha ne tegye elérhetővé a hálózaton a `cli` profil portját.** Tegye közzé
>    a `127.0.0.1` címen (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — egy LAN-ról elérhető `cli` profil esetén bármely, irányítópult-szintű RCE
>    a gazdagép teljes kompromittálásához vezet.
> 2. **Ne csatoljon további gazdagépi könyvtárakat a `cli` profilba.**
>    A Docker-socket és bármely további csatolás együttesen teljes olvasási/írási hozzáférést biztosít a konténernek
>    a fájlrendszerhez és a gazdagép konfigurációjához. Ha egy eszköznek látnia kell egy projektet,
>    futtassa helyileg a CLI binárissal — ne csatolja be a
>    `cli` konténerbe.
>
> Ha nincs szüksége konténeren belüli automatikus frissítésre, ne kapcsolja be a `cli` profilt
> (`COMPOSE_PROFILES=core,redis` vagy ennél rövidebb érték). A többi profil nem
> csatolja a Docker-socketet.
>
> A kapcsolódó MITM-fenyegetési modellért lásd a `docs/security/MITM-TPROXY-DECRYPT.md` fájlt (git; nincs belefordítva a `/docs` könyvtárba),
> a `codex`/`claude-code`/`droid`/`openclaw` binárisok eredetigazolási láncáért pedig a
> `docs/security/SUPPLY_CHAIN.md` fájlt.

## Redis sidecar

Az OmniRoute a Redisre támaszkodik az elosztott sebességkorlátozó és a megosztott gyorsítótár működtetéséhez. A `redis` szolgáltatás **mindig definiálva van** a `docker-compose.yml` fájlban (nincs profilhoz kötve), és minden más profillal együtt elindul.

| Részlet                     | Érték                                           |
| --------------------------- | ----------------------------------------------- |
| Lemezkép                    | `redis:7-alpine`                                |
| Konténer neve               | `omniroute-redis`                               |
| Belső port                  | `6379`                                          |
| Gazdagép portja (felülírás) | `REDIS_PORT` (alapértelmezés: `6379`)           |
| Gazdagép címe (felülírás)   | `REDIS_BIND_HOST` (alapértelmezés: `127.0.0.1`) |
| Kötet                       | `omniroute-redis-data` → `/data`                |
| Állapot-ellenőrzés          | `redis-cli ping` (10 másodperces időköz)        |

Kapcsolódó környezeti változók:

- `REDIS_URL` — az alkalmazásba átadott kapcsolati karakterlánc (alapértelmezés szerint `redis://redis:6379`).
- `REDIS_PORT` — a Redis-konténer gazdagépoldali portleképezése.
- `REDIS_BIND_HOST` — az a gazdagép-interfész, amelyen a port közzé van téve. Alapértelmezett értéke `127.0.0.1`.

> **Miért a visszacsatolási cím az alapértelmezett:** a sidecar `requirepass` nélkül fut, az
> alkalmazáskonténerek pedig a compose-hálózaton keresztül (`redis:6379`) érik el — a közzétett
> port csak a gazdagépoldali eszközök (`redis-cli`, helyi `npm run dev`) számára szükséges. A
> `0.0.0.0` címen való közzététel egy hitelesítés nélküli Redist tenne elérhetővé a helyi hálózat
> minden gazdagépe számára. Ha beállítja a `REDIS_BIND_HOST=0.0.0.0` értéket, adja hozzá a
> `--requirepass` kapcsolót is a szolgáltatás `command:` beállításához.

A **Redis letiltása** nem ajánlott (a sebességkorlátozó a memórián belüli tartalékmegoldásra áll vissza). Ha mégis szükséges, távolítsa el vagy tegye megjegyzésbe a `redis:` szolgáltatásblokkját a `docker-compose.yml` fájlban, vagy skálázza nullára:

```bash
docker compose up -d --scale redis=0
```

## Éles környezethez készült Compose

A fejlesztői környezet mellett futó, elkülönített éles pillanatképhez használja a `docker-compose.prod.yml` fájlt.

| Részlet                             | Érték                                                                              |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| Fájl                                | `docker-compose.prod.yml`                                                          |
| Irányítópult alapértelmezett portja | `PROD_DASHBOARD_PORT=20130` (a belső `${DASHBOARD_PORT:-20128}` portra leképezve)  |
| API alapértelmezett portja          | `PROD_API_PORT=20131`                                                              |
| Lemezkép                            | `omniroute:prod` (a `runner-cli` célból összeállítva)                              |
| Redis-konténer                      | `omniroute-redis-prod` (`redis:8.6.2`, dedikált `redis-prod-data` kötet)           |
| Adatkötet                           | `omniroute-prod-data` (elnevezett, újraépítések között megőrzött)                  |
| Állapot-ellenőrzések                | `node healthcheck.mjs` + `redis-cli ping`, a `depends_on` a Redis állapotától függ |

Használat:

```bash
# Az éles környezet összeállítása és elindítása
docker compose -f docker-compose.prod.yml up -d --build

# Naplók folyamatos megjelenítése
docker compose -f docker-compose.prod.yml logs -f

# Leállítás és eltávolítás (a kötetek megtartásával)
docker compose -f docker-compose.prod.yml down
```

Az éles környezet a fejlesztői compose-környezettel párhuzamosan fut (eltérő konténernevekkel, portokkal és kötetekkel), így helyben folytathatja a fejlesztést, miközben az éles környezet működésben marad.

## Dockerfile-szakaszok

A tároló egy többlépcsős Dockerfile-t (`Dockerfile`) tartalmaz. Négy szakasz érhető el; válaszd ki a felhasználási esetednek megfelelő `target` értéket.

| Szakasz       | Alaplemezkép          | Cél                                                                                                                                                                                                                                                                                                                                        |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Telepíti a függőségeket (`npm ci --legacy-peer-deps`), majd futtatja az `npm run build` parancsot (alapértelmezés szerint Turbopack — lásd alább a Fordítási erőforrások részt)                                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | Éles futtatókörnyezet a Next.js önálló kimenetével. **Nem tartalmaz szolgáltatói CLI-ket.**                                                                                                                                                                                                                                                |
| `runner-cli`  | `runner-base`         | Hozzáadja a `git`, `docker.io`, `docker-compose` eszközöket és a globális CLI-ket: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Ezt válaszd az ügynökalapú munkafolyamatokhoz.**                                                                                                                                   |
| `runner-web`  | `runner-base`         | Hozzáadja a Playwrightot és egy Chromium böngészőt (`--with-deps`) a webes munkamenetet használó szolgáltatókhoz: `gemini-web`, `claude-web`, `claude-turnstile`. **Ezt válaszd ezen szolgáltatók használatakor** — az alap lemezkép nélkülük a kérés feldolgozásakor hibát jelez (lásd a `-web` megjegyzést a Kiadási csatornák részben). |

Adott cél manuális összeállítása:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Fordítási erőforrások

Három összeállítási argumentum szabályozza a `builder` szakasz erőforrásigényét. Ezek kizárólag az összeállítás idején érvényesek —
az `OMNIROUTE_MEMORY_MB` (lásd alább) ettől független futásidejű beállítás.

| Összeállítási argumentum    | Alapérték | Hatás                                                                                                                          |
| --------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`       | A `0` webpackkel fordít: alacsonyabb csúcsmemória-igény, de lassabb. Az `1` engedélyezi a Turbopack használatát.               |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`    | A létrehozott `next build` folyamat V8-halmának felső korlátja (`--max-old-space-size`).                                       |
| `OMNIROUTE_BUILD_WORKERS`   | `2`       | Beállítja a `CIRCLE_NODE_TOTAL` értékét; a Next ebből számítja ki a `workers = N - 1` értéket az oldaladatok összegyűjtéséhez. |

Az `OMNIROUTE_BUILD_WORKERS` értékét érdemes növelni nagy teljesítményű összeállítási környezetben, és ezt kell
gyanúba venni, amikor egy korlátozott környezetben végzett összeállítás a `✓ Compiled successfully` üzenet **után** áll le. Minden
oldaladat-feldolgozó saját folyamatként fut, ahogyan maga a szülő `next build` is;
egy valós VPS-en végzett reprodukció (issue #7518) minden folyamat RSS-csúcsértékét
~4,5 GB-ra mérte, a `NODE_OPTIONS` halombeállítástól függetlenül (a Turbopack a
V8-halmon kívüli natív/Rust-memóriában fordít). Az alapértelmezett `2` érték (→ 1 feldolgozó, összesen 2
folyamat) a közzétételi folyamatban használt, GitHub által üzemeltetett 16 GB / 4 vCPU-s futtatókhoz
van méretezve. `8` értéknél (→ 7 feldolgozó) a futtató memóriája elfogyott, és
a buildkit a `ResourceExhausted: ... cannot allocate memory` hibával leállította a lépést;
még a `3` érték (→ 2 feldolgozó) sem fért el, amikor a folyamatonkénti RSS-t közvetlenül
mérték ahelyett, hogy következtettek volna rá. A `tests/unit/docker-build-memory-budget.test.ts`
a mért érték alapján végzi el a számítást, és hibát jelez, ha bármelyik beállítás
meghaladná a futtató kapacitását.

A Turbopack a V8-halmon **kívül** található natív Rust-memóriában fordít, ezért
az `OMNIROUTE_BUILD_MEMORY_MB` nem korlátozza azt. Memóriakorlátos gazdagépen az
OOM-kezelő ilyenkor mindenféle hibaüzenet nélkül SIGKILL jelzéssel leállítja az összeállítást — az egyszerűen
félbeszakad a `Creating an optimized production build` folyamat közben, ami inkább
lefagyásnak tűnik, mint memóriahiánynak. Ezért használ a `Dockerfile` alapértelmezés szerint webpacket
(`OMNIROUTE_USE_TURBOPACK=0`), ellentétben az `npm run dev` / `npm run build` parancsokkal, ahol
a kód alapértelmezése a Turbopack: egy minden összeállítási argumentum nélküli `docker build .` parancs (amelyet
a Railway és más egykattintásos szolgáltatók futtatnak) nem állhat le csendben egy memóriakorlátos
összeállítási környezetben. A közzétett lemezképek már explicit módon átadják az `OMNIROUTE_USE_TURBOPACK=0`
értéket a `docker-publish.yml` fájlban. Bőséges RAM-mal rendelkező összeállítási környezetben a gyorsabb összeállításhoz
engedélyezd a Turbopack használatát:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

A `webpackBuildWorker` engedélyezve van, ezért a `next build` egy szülő- **és** egy feldolgozó
folyamatot futtat, és mindkettő külön-külön figyelembe veszi az `OMNIROUTE_BUILD_MEMORY_MB` értékét. A konténer
memóriakorlátját ennek az értéknek nagyjából a kétszerese fölé állítsd, ne csupán egyszeresére.

Ezen a forrásfán mérve (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Csomagoló | Konténer memóriakorlátja | Eredmény                                                      |
| --------- | ------------------------ | ------------------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB           | mindkét esetben az OOM-kezelő állította le, hibaüzenet nélkül |
| webpack   | 8 GiB                    | a feldolgozófolyamatot SIGKILL állította le                   |
| webpack   | 12 GiB                   | sikeres, 11,1 GiB-os csúcsértékkel                            |

### Futásidejű alapértékek

A `runner-base` által exportált alapértékek: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Memóriakezelés Dockerben:

- A lemezkép beállítja az `OMNIROUTE_MEMORY_MB=1024` értéket, és ebből származtatja a `NODE_OPTIONS=--max-old-space-size=1024` értéket.
- A tényleges kiszolgálófolyamatot az önálló indító indítja el, amely beolvassa az `OMNIROUTE_MEMORY_MB` értékét, és hozzáfűzi a `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` kapcsolót.
- A Node az utolsóként megadott `--max-old-space-size` értéket használja, ezért az `OMNIROUTE_MEMORY_MB` beállítása határozza meg a Dockerben érvényes heaphatárt.
- Mivel a lemezkép ezt mindig beállítja, az indító saját, rendelkezésre álló RAM alapján kalibrált tartalékértéke Docker alatt soha nem lép életbe. Növelje meg kifejezetten az adott munkaterheléshez (lásd az alábbi táblázatot). A `2048` továbbra is túl kevés a kódoló ügynökök `/v1/responses` kéréseihez.

### Futásidejű RAM kódoló ügynökökhöz

Az alapértelmezett 1 GiB-os Docker-beállítás csak a vezérlőpulthoz és könnyű csevegéshez elegendő minimum, nem éles környezethez való méret. A hosszú `POST /v1/responses` törzsek (több száz üzenet, több tucat eszköz) a tömörítés során több memóriabeli gráfot is megőriznek. Két, egymást időben átfedő, egyenként körülbelül 3 MiB-os / 750 ezer tokenes kérés **12 GiB-os** old-space mellett is a V8 leállását okozta (`FATAL ERROR: Reached heap limit`), és egy 16 GiB-os cgroup esetén is OOM-hibát idézett elő. Lásd: [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

A **cgroup `--memory` értékét a heapméret fölé méretezze** — a natív pufferek, az SQLite és a tömörítés köztes adatai a V8-on kívül helyezkednek el.

| Munkaterhelés                             | `OMNIROUTE_MEMORY_MB`        | Konténer / cgroup            | Megjegyzések                                                                                                                      |
| ----------------------------------------- | ---------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Vezérlőpult, egy könnyű csevegés          | `1024` (lemezkép alapértéke) | ≥2 GiB                       |                                                                                                                                   |
| Egy kódoló ügynök (Claude/Codex/Grok)     | `8192`                       | ≥10 GiB                      | Tipikus egymunkamenetes `/v1/responses`                                                                                           |
| Két egyidejű hosszú `/v1/responses`       | `10240`–`12288`              | ≥12–16 GiB                   | Mért V8-leállás körülbelül 12 GiB-os heapnél                                                                                      |
| Három vagy több egyidejű hosszú kontextus | ne egy folyamatban           | soros végrehajtás / több RAM | Az alapértelmezett nehézsúlyú beléptetési korlát 1 folyamatban lévő kérés; RAM-bővítés nélküli növelése ismét előidézi a leállást |

Az `omniroute serve` közvetlenül a gépen futtatva a RAM körülbelül 35%-ára kalibrál (a `[512, 4096]` tartományra korlátozva), ha az `OMNIROUTE_MEMORY_MB` **nincs beállítva**. A Docker mindig `1024` értékre állítja, ezért ez a kalibrálás a hivatalos lemezképben soha nem fut le.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritikus környezeti változók

Az [ENVIRONMENT.md](../reference/ENVIRONMENT.md) fájlban dokumentált alapértékeken túl a következő változók a legfontosabbak Docker alatti futtatáskor:

| Változó                       | Rendeltetés                                                                                                                                                                                                                                                                                                                               | Alapértelmezett érték               |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | A WebSocket-híd megosztott titka. **Éles környezetben kötelező** — állítsa erős, véletlenszerű karakterláncra.                                                                                                                                                                                                                            | nincs beállítva (megadása kötelező) |
| `REDIS_URL`                   | A sebességkorlátozó/gyorsítótár háttérrendszerének kapcsolati karakterlánca                                                                                                                                                                                                                                                               | `redis://redis:6379`                |
| `REDIS_PORT`                  | A mellékelt Redis-konténer gazdagépen elérhető portja                                                                                                                                                                                                                                                                                     | `6379`                              |
| `REDIS_BIND_HOST`             | Az a gazdagép-interfész, amelyen a mellékelt Redis portja közzé van téve (loopback, hacsak nem ad hozzá AUTH-hitelesítést)                                                                                                                                                                                                                | `127.0.0.1`                         |
| `AUTO_UPDATE_HOST_REPO_DIR`   | A gazdagép azon elérési útja, amely az önfrissítési munkafolyamatokhoz a `cli` profilban a `/workspace/omniroute` helyre van csatolva                                                                                                                                                                                                     | `.` (aktuális könyvtár)             |
| `OMNIROUTE_MEMORY_MB`         | A Node futásidejű heapmemória-korlátja az önálló Docker-kiszolgálóhoz; felülírja a lemezkép fenti alapértékét. Kódoló ügynökök esetén: `8192`+ (lásd: [futásidejű RAM](#runtime-ram-for-coding-agents)).                                                                                                                                  | `1024`                              |
| `DASHBOARD_PORT` / `API_PORT` | Felülírja az irányítópult (20128) és az API (20129) közzétett portjait                                                                                                                                                                                                                                                                    | `20128` / `20129`                   |
| `APP_BIND_HOST`               | Az a gazdagép-interfész, amelyen a docker-compose közzéteszi az irányítópult/API/élő WS portjait. `REQUIRE_API_KEY=false` esetén (ez az alapértelmezés) a `0.0.0.0` elérhetővé teszi a névtelen `/v1` proxyt a LAN számára — csak `REQUIRE_API_KEY=true` mellett vagy elé helyezett fordított proxyval tegye szélesebb körben elérhetővé. | `127.0.0.1`                         |
| `CLIPROXY_BIND_HOST`          | Az a gazdagép-interfész, amelyen a docker-compose közzéteszi a `cliproxyapi` oldalkocsit — ennek adatkötete tárolja a szolgáltatói hitelesítő adatokat.                                                                                                                                                                                   | `127.0.0.1`                         |
| `OMNIROUTE_PLUGINS_DIR`       | Az a könyvtár, amelyet a futásidejű bővítménykereső olvas, és amelybe telepít. Állítsa be, ha a bővítmények bind mounttal vannak csatolva: az alapértelmezés a `HOME` értékét követi, amelyet egy lemezkép nem feltétlenül exportál.                                                                                                      | `~/.omniroute/plugins`              |
| `OMNIROUTE_BASE_PATH`         | URL-alútvonal, amikor az alkalmazást fordított proxy mögött teszik közzé (pl. `/omniroute`)                                                                                                                                                                                                                                               | _(üres = gyökér)_                   |
| `NEXT_PUBLIC_BASE_URL`        | Nyilvános böngészőeredet az alútvonallal együtt (pl. `https://host/omniroute`)                                                                                                                                                                                                                                                            | nincs beállítva                     |
| `PROD_DASHBOARD_PORT`         | Az irányítópult gazdagépoldali portja a `docker-compose.prod.yml` fájlhoz                                                                                                                                                                                                                                                                 | `20130`                             |
| `CLIPROXYAPI_PORT`            | A `cliproxyapi` oldalkocsi gazdagépoldali portja                                                                                                                                                                                                                                                                                          | `8317`                              |

## Fordított proxy egy alútvonalon (Traefik / nginx)

A Next.js `basePath` értéke belefordul az önálló csomagba. Az OmniRoute a beégetett
értéket egy, az alkalmazás gyökerében található jelzőfájlban rögzíti (amelyet az
`npm run build` ír, a `scripts/docker/ensure-docker-base-path.mjs` pedig olvas), és a
konténer indításakor összehasonlítja az `OMNIROUTE_BASE_PATH` értékével. Ha ezek
eltérnek, és a lemezkép a tartomány gyökeréhez készült, a belépési pont átírja az
önálló jegyzékeket, a beágyazott `basePath`/`assetPrefix` literálokat (a Next 16 az SSR
eszköz-URL-eket kizárólag az `assetPrefix` alapján rendereli — a javító az alútvonalat
ebbe is átmásolja), a beégetett `/_next/static` eszköz-URL-eket
(kliensreferencia-jegyzékek, médiaimportok, előre renderelt hibaoldalak), valamint a
kliens `process.env` helyettesítő rétegét, mielőtt a `node dev/run-standalone.mjs`
elindul.

### Compose-build (ajánlott)

Állítsa be mindkét változót a `.env` fájlban, majd építse újra a lemezképet, hogy a
lemezkép és a futtatókörnyezet beállításai megegyezzenek:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

A `docker-compose.yml` Docker-build argumentumként és futásidejű környezeti
változóként is továbbítja az `OMNIROUTE_BASE_PATH` értékét.

### Előre elkészített gyökérszintű lemezkép + futásidejű alútvonal

A közzétett `diegosouzapw/omniroute:*` lemezképek a tartomány gyökeréhez készültek.
Az `OMNIROUTE_BASE_PATH` futásidőben továbbra is beállítható; a konténer indításkor
egyszer módosítja a csomagot. Adja meg hozzá az egyező nyilvános origót:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Állítsa be a fordított proxyt úgy, hogy a **teljes** külső útvonalat továbbítsa (ne
távolítsa el az előtagot). A Traefiknek a `PathPrefix(`/omniroute`)` útvonalat
`StripPrefix` nélkül kell a konténerhez irányítania, hogy a Next.js az
`/omniroute/...` útvonalat kapja meg, és az eszközöket az
`/omniroute/_next/...` útvonalról szolgálja ki.

A Docker állapot-ellenőrzése az aktív `OMNIROUTE_BASE_PATH` előtaggal ellátott,
kis erőforrás-igényű `/healthz` életciklus-végpontot vizsgálja. Az
`/api/monitoring/health` továbbra is elérhető emberi vagy irányítópultos
diagnosztikához; ha a konténer HEALTHCHECK ellenőrzését ismét erre szeretné irányítani
(például mélyreható állapot-ellenőrzéshez), állítsa be az
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` értéket. Ez az útvonal **mélyreható**
ellenőrzést végez (adatbázis + monitorozási összegzés) — megfelelő a Docker ritkán
futó `HEALTHCHECK` ellenőrzéséhez, ha ezt újra engedélyezi, de **nem** megfelelő a
Kubernetes `livenessProbe` időközeihez.

Orkesztrátorokhoz (Kubernetes, Nomad stb.):

| Vizsgálat       | Előnyben részesítendő                                                     | Kerülendő                                                                          |
| --------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Életképesség    | HTTP `GET /livez`, vagy TCP a fő porton (`PORT`, alapértelmezés: `20128`) | Az `/api/monitoring/health` használata életképesség-vizsgálatként                  |
| Üzemkészség     | HTTP `GET /healthz`                                                       | Olyan szoros időkorlátok, amelyek az eseményhurok foglaltságát leállásként kezelik |
| Mély / blackbox | `/api/monitoring/health`                                                  | —                                                                                  |

A `/healthz` a folyamat életciklusáról ad jelentést (`ok` / `starting` / `stopping`).
A `/livez` csak azt ellenőrzi, hogy a folyamat életben van-e (200-as választ ad,
amikor a kezelő futni képes; nem várja meg az üzemkész állapotot). Mindkettő ugyanazon
a Node-eseményhurkon fut, mint a kérések kezelése, ezért a CPU-igényes katalógus- vagy
tömörítési műveletek késleltethetik őket — a foglalt ≠ leállt. Ha a HTTP-vizsgálatok
túllépik az időkorlátot, részesítse előnyben a TCP-alapú életképesség-vizsgálatot. A
vizsgálatok teljes útmutatója:
[Monitorozási útmutató — ajánlások Kubernetes-vizsgálatokhoz](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose Caddyvel (automatikus HTTPS/TLS)

Az OmniRoute biztonságosan elérhetővé tehető a Caddy automatikus SSL-kiépítésével. Győződjön meg arról, hogy a domain DNS A rekordja a szerver IP-címére mutat.

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
      # Böngészőből elérhető forrás az OAuth-visszahívásokhoz, az irányítópult hivatkozásaihoz és a generált nyilvános URL-ekhez.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Belső, szerverek közötti URL az ütemezett feladatokhoz és az önmagára irányuló lekérésekhez.
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

A Caddy beállítja a szabványos továbbítási fejléceket az upstream tároló számára. Az OmniRoute a
`NEXT_PUBLIC_BASE_URL` értékét használja az OAuth-visszahívások és a generált nyilvános
hivatkozások kanonikus nyilvános forrásaként; az irányítópult hitelesített írási műveletei azonos eredetű kéréseket és munkamenethez kötött CSRF-
védelmet használnak. Az `OMNIROUTE_TRUST_PROXY` beállítást csak olyan speciális telepítéseknél engedélyezze, amelyeknél szándékosan
azt szeretné, hogy az OmniRoute az explicit konfiguráció helyett megbízható továbbított fejlécekből
határozza meg a nyilvános forrást.

## Cloudflare Quick Tunnel

A Docker-telepítések irányítópult-támogatása egyetlen kattintással elérhető **Cloudflare Quick Tunnel** funkciót tartalmaz a `Dashboard → Endpoints` oldalon. Az első engedélyezés csak szükség esetén tölti le a `cloudflared` csomagot, elindít egy ideiglenes alagutat az aktuális `/v1` végponthoz, és a generált `https://*.trycloudflare.com/v1` URL-t közvetlenül a normál nyilvános URL alatt jeleníti meg.

A végpontok alagútpaneljei (Cloudflare, Tailscale, ngrok) megjeleníthetők vagy elrejthetők a `Settings → Appearance` oldalon az aktív alagút állapotának megváltoztatása nélkül.

### Megjegyzések az alagutakhoz

- A Quick Tunnel URL-ek ideiglenesek, és minden újraindítás után megváltoznak.
- A Quick Tunnels alagutak nem állnak automatikusan helyre az OmniRoute vagy a tároló újraindítása után. Szükség esetén engedélyezze őket újra az irányítópulton.
- A felügyelt telepítés jelenleg Linux, macOS és Windows rendszereken támogatott `x64` / `arm64` architektúrán.
- A felügyelt Quick Tunnels alapértelmezés szerint HTTP/2 átvitelt használ, hogy elkerülje a QUIC UDP-pufferekkel kapcsolatos, nagy mennyiségű figyelmeztetést a korlátozott tárolókörnyezetekben. Ha más átvitelt szeretne, állítsa a `CLOUDFLARED_PROTOCOL=quic` vagy `auto` értéket.
- A Docker-lemezképek tartalmazzák a rendszer legfelső szintű CA-tanúsítványait, és átadják őket a felügyelt `cloudflared` számára, így elkerülhetők a TLS-megbízhatósági hibák, amikor az alagút a tárolón belül indul el.
- Állítsa be a `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` értéket, ha azt szeretné, hogy az OmniRoute a letöltés helyett egy meglévő bináris fájlt használjon.

## Lemezképcímkék

| Lemezkép                 | Címke    | Méret  | Leírás                                                       |
| ------------------------ | -------- | ------ | ------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | A legmagasabb **közzétett** stabil SemVer (nem a git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps esetén rögzítsen ilyen típusú címkét                  |

Többplatformos manifest: natív `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). A Docker automatikusan kiválasztja a megfelelő architektúrát; adja meg a `--platform linux/amd64` kapcsolót, ha ARM-gazdagépeken kényszerítenie kell az AMD64-emulációt.

### Kiadási csatornák

Az OmniRoute külön Docker-csatornákat tesz közzé a stabil kiadásokhoz, az aktív kiadási ág teszteléséhez és a fejlesztői buildekhez.

| Csatorna                        | Forrás                                   | Módosíthatóság                      | Ajánlott használat                                                                                                                                   |
| ------------------------------- | ---------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Aláírt/verziózott kiadás                 | Nem módosítható                     | Olyan éles telepítések, amelyek pontos kiadáshoz vannak rögzítve                                                                                     |
| `:latest` / `:latest-web`       | Legmagasabb **közzétett** stabil SemVer  | Módosítható stabil mutató           | A stabil kiadásokat követi **egy SemVer-közzétételi feladat után** — **nem** követi a `main` ágat vagy a még kiadatlan `release/v*` véglegesítéseket |
| `:next` / `:next-web`           | Aktuális alapértelmezett `release/v*` ág | Módosítható előzetes kiadási mutató | Az aktív kiadási ágba már bekerült, de stabil kiadásban még nem szereplő javítások tesztelése                                                        |
| `:main` / `:main-web`           | `main` ág                                | Módosítható fejlesztési mutató      | Kizárólag fejlesztési és integrációs teszteléshez                                                                                                    |

#### Webes munkamenet-szolgáltatók: a `-web` lemezképek

Minden fenti csatornához tartozik egy `-web` címke is (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), amely a `runner-web` fázisból készül — ugyanaz a lemezkép, kiegészítve a Playwrighttal és egy Chromium böngészővel. A normál lemezkép **nem tartalmazza** a Chromiumot; a `gemini-web`, a `claude-web` és a `claude-turnstile` szolgáltatóknak szükségük van rá.

A hiba késleltetve, nem pedig indításkor jelentkezik: ezek a szolgáltatók felsorolják modelljeiket, és csatlakoztatottként jelennek meg az irányítópulton, de az első kérés a következő hibával meghiúsul:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ha ezeket a szolgáltatókat használja, töltse le annak a csatornának a `-web` címkéjét, amelyet már használ — semmi más nem változik. npm/CLI-telepítés esetén (Docker-lemezkép nélkül) az ennek megfelelő hiányzó összetevő a böngésző bináris fájlja: futtassa az `npx playwright install chromium` parancsot a gazdagépen.

#### Az előzetes kiadási csatorna használata

A `next` csatorna a jelenlegi alapértelmezett `release/v*` ágba történő minden push alkalmával újraépül, és AMD64, valamint ARM64 architektúrához is közzétételre kerül. A régebbi karbantartási ágak nem írhatják felül. A csatorna lehúzható rendszerképet biztosít azokhoz a javításokhoz, amelyek már beolvadtak az aktív kiadási ágba, de a következő stabil címke még nem készült el.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose esetén írja felül a kiválasztott profil által használt rendszerkép címkéjét, majd húzza le újra a rendszerképet, és hozza létre ismét a szolgáltatást:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Biztonság és visszaállítás

A `next` egy változó előzetes kiadási csatorna. Az aktív kiadási ágba történő bármely push hatására megváltozhat, és **éles környezetben való használata nem támogatott**. Egy adott build kiértékelése során rögzítse a rendszerkép kivonatát:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Tesztelés előtt készítsen biztonsági másolatot az OmniRoute adatkötetről vagy a bind mounttal csatolt adatkönyvtárról. A visszaállításhoz állítsa vissza a korábban használt stabil verziót vagy kivonatot, majd hozza létre ismét a konténert:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Egy kiadási ágból készült build soha nem mozdíthatja el a `latest` címkét; a stabil mutatót kizárólag egy arra jogosult stabil szemantikus verzió léptetheti elő. A `next` rendszerképekre továbbra is érvényes a kiadási rendszerképek ellenőrzése és a KRITIKUS sebezhetőségek esetén blokkoló biztonsági kapu.

**A `latest` nem garantálja, hogy a git legfrissebb állapotát tartalmazza.** A `main` vagy az aktív `release/v*` ágba beolvasztott javítások **nem** kerülnek bele a `:latest` rendszerképbe mindaddig, amíg nem tesznek közzé egy stabil SemVer-rendszerképet, és a közzétételi feladat elő nem lépteti a `:latest` címkét, amely így ugyanarra a kivonatra mutat, mint az adott SemVer-verzió. Ha úgy tűnik, hogy a `latest` nem frissül, miközben a GitHubon már látható a javítás, a kiadási ág teszteléséhez húzza le a `:next` rendszerképet, vagy várja meg a SemVer-címkét.

| Cél                                                                                    | Használat                                                  |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| GitOps / éles környezet, amelyben nem megengedett az eltérés                           | Rögzítse az `:X.Y.Z` címkét (vagy a rendszerkép kivonatát) |
| A közzétett stabil kiadások követése, minden kiadásnál elfogadva az újbóli létrehozást | `:latest`                                                  |
| Ki nem adott `release/v*` commitok tesztelése                                          | `:next` (nem éles használatra)                             |
| A `main` tesztelése                                                                    | `:main` (nem éles használatra)                             |

## Irányítópult-frissítések Dockerben

Egy közzétett lemezképből futó konténer nem tudja lecserélni önmagát. Amikor az OmniRoute azt észleli, hogy
konténerben fut (nincs `.git`-munkapéldány, és nem npm-telepítés), a kezdőlap irányítópultján lévő frissítési sáv
az npm/git-utasítások helyett a gazdagépen futtatandó parancsot jeleníti meg, egy másolási gombbal:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

A szolgáltatás neve az `AUTO_UPDATE_SERVICE` értékéből származik (alapértelmezés szerint `omniroute`, vagyis a
`docker-compose.selfhost.yml` szolgáltatása). A `pull` csak lebegő címkét (`latest`, `next`) frissít; rögzített
`:X.Y.Z` címke esetén először szerkessze a címkét.

### Egykattintásos frissítések gazdagépi triggerfájllal

Annak érdekében, hogy az **Update Now** továbbra is működjön a `/var/run/docker.sock` csatolása nélkül (ami a konténernek
root jogosultságot ad a gazdagépen — lásd a fenti `cli`-profilra vonatkozó figyelmeztetést), állítsa be a `DOCKER_UPDATE_TRIGGER_FILE` változót az
OmniRoute szolgáltatásban, és futtasson egy figyelőt a gazdagépen:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Az elérési útnak a `DATA_DIR` könyvtáron belül kell lennie (a relatív értékek ehhez képest lesznek feloldva); minden más
elutasításra kerül. Az **Update Now** ezután a `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` tartalmat írja ebbe a
fájlba, `202` választ ad, az irányítópult pedig addig kérdezi le az `/api/system/version` végpontot, amíg az új verzió éles nem lesz,
majd újratöltődik. Ebben a módban az OmniRoute soha nem futtat shell- vagy Docker-parancsot. Mint minden frissítési
műveletnél, a kérés csak loopback/LAN-kliensektől kerül elfogadásra.

Egy bind-csatolással elérhetővé tett adatkönyvtár stabil elérési utat biztosít a gazdagép számára a figyeléshez. Minta `systemd`-egységek
(igazítsa a `/srv/omniroute` értékét ahhoz a könyvtárhoz, amely a compose-fájlt és a `data/` könyvtárat tartalmazza):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Az OmniRoute irányítópult frissítési kéréseinek figyelése

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Az OmniRoute-konténer lekérése és újbóli létrehozása

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

A szolgáltatás a lekérés előtt eltávolítja a kérésfájlt, így egy sikertelen futás nem kerül végtelen ciklusba. A
`DOCKER_UPDATE_TRIGGER_FILE` nélkül az irányítópult továbbra is a kézi parancsos folyamatot használja.

## Rendelkezésre állás: az alapértelmezett SQLite egyetlen replikát támogat

Az alapértelmezett Docker-/Kubernetes-alapú OmniRoute **egy Node-folyamatból és egy SQLite-íróból** áll. A magas rendelkezésre állás ezen a topológián **nem támogatott**.

| Korlátozás                                                      | Következmény                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Egyetlen író                                                    | **Ne** futtasson több replikát ugyanazzal az SQLite-fájllal. Ez sérülést okoz az adatbázisban.                                                                                                                                                                                                                                                                                                                       |
| Újbóli létrehozás / újraindítás / leállítás a HEALTHCHECK által | A folyamatban lévő SSE-kapcsolatok, irányítópult-munkamenetek és memóriában tárolt állapot **teljes kiesése**. Minden csatlakoztatott kliens kapcsolata megszakad. Az üres végponttal rendelkező időszakban érkező új kérések OmniRoute JSON helyett fordított proxytól származó **`502 Bad Gateway: Unknown error`** választ kapnak — a kliensek ezt nem tudják megkülönböztetni egy szolgáltatói hibától (#11015). |
| Azonos eseményhurok, mint a `/healthz` esetén                   | Egy leterhelt katalógus- vagy tömörítési ciklus késleltetheti a vizsgálatokat; rövid időtúllépés esetén ezután újraindul az **egyetlen** replika.                                                                                                                                                                                                                                                                    |

**Vizsgálati mátrix** (lásd még: [Kubernetes-vizsgálati javaslatok](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Vizsgálat           | Cél                                                                                   | Ne használja ehhez                                                                |
| ------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Életképesség        | TCP a `PORT` porton (alapértelmezés szerint `20128`), vagy engedékeny HTTP `/healthz` | `/api/monitoring/health`                                                          |
| Készenlét           | HTTP `GET /healthz`                                                                   | Szigorú időtúllépések, amelyek az eseményhurok leterheltségét leállásként kezelik |
| Mélyreható / emberi | `/api/monitoring/health`                                                              | Automatizált kubelet-életképességi vizsgálat                                      |

**Frissítések:** számítson minden munkamenet megszakadására. Ha lehetséges, ürítse ki a klienseket; az alapértelmezett SQLite használatakor nincs gördülő frissítés. A Compose `restart: unless-stopped` beállítása és a Docker `HEALTHCHECK` szintén lecseréli az egyetlen folyamatot, amikor a konténer Unhealthy állapotba kerül — ugyanazzal a hatókörű kieséssel.

Kubernetes-részlet **egyetlen replikához** (a Recreate kötelező; ne növelje a `replicas` értékét egyetlen SQLite-fájl használata mellett):

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

A `preStop` alatti várakozás lehetővé teszi, hogy a kube eltávolítsa a Service-végpontokat a SIGTERM előtt, így az **új** forgalom már nem jut el a leálló folyamathoz. A folyamatban lévő `/v1/responses` SSE-kapcsolatok leürítésére legfeljebb a `SHUTDOWN_TIMEOUT_MS` által meghatározott ideig (alapértelmezés szerint 30 másodpercig) kerül sor a nehézsúlyú beléptetési lease-ek segítségével (#11015). A folyamathoz mégis eljutó új kérések `503` + `Retry-After: 5` választ kapnak. A Recreate stratégia miatt a cserepéldány Ready állapotba kerüléséig fennálló, végpont nélküli időszak továbbra is teljes szolgáltatáskiesést jelent — ez az SQLite-topológiából ered, nem a probe-ok hibás konfigurációjából.

A külső Postgres / több írópéldányos HA **nem** dokumentált, alapértelmezetten támogatott megoldás. Ha HA-ra van szüksége, tartson fenn egyetlen replikát, vagy használjon olyan topológiát, amelyet a projekt külön tesztelt és dokumentált. A Postgres/MySQL fejlesztése a [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) alatt követhető. Amíg ez nem jelenik meg, a **nagy** `/v1/responses` kapacitás növelésének egyetlen támogatott módja N független folyamat futtatása (lásd a következő szakaszt), nem pedig a `replicas > 1` használata egyetlen köteten.

## Horizontális skálázás: N független folyamat

Egy Node-folyamat **egy V8-halommal** rendelkezik. Két, egymást átfedő, ~3 MiB / ~750k tokenes kódolóügynök-`POST /v1/responses` kérés (RTK + Caveman) ~12 Gi méretnél leállítja ezt a halmot (`FATAL ERROR: Reached heap limit`), és egy 16 Gi méretű cgroup esetén OOM-hibát okozhat. Lásd: [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ez a mérés **memóriakeretre** vonatkozó figyelmeztetés, nem pedig a termék által megszabott, két párhuzamos hosszú `/v1/responses` kérésre vonatkozó merev felső korlát. A nagy erőforrás-igényű csevegések fogadását egy automatikusan meghatározott bemeneti bájtkeret (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) szabályozza, amelynek méretezése ugyanezen V8-/cgroup-korlát alapján történik — ennek felfelé történő felülbírálása (vagy a korábbi, kérésszám-alapú `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` korlát beállítása) egy már méretezett folyamatnál ismét előidézi a leállást. A kis csevegések, a `/healthz`, a `/v1/models` és az MCP **nem** tartoznak e korlát hatálya alá.

### Egy folyamat: kettőnél több hosszú `/v1/responses`

Egy **egészséges** folyamat (amelynek halma az `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, alapértelmezetten `0.75`, értéke alatt van) kettőnél több párhuzamos hosszú `POST /v1/responses` kérést **is futtathat**, ha a teljes folyamatra vonatkozó, folyamatban lévő bájtok keretében (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) még van hely. Az `OMNIROUTE_CHAT_LARGE_BODY_BYTES` értékét elérő vagy meghaladó törzsek (alapértelmezetten 256 KiB) ugyanazt a nagy erőforrás-igényű bérletet veszik igénybe, mint a szerkezetileg összetett kérések, és ugyanazt a [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) szerinti `tryAcquireHealthyHeadroom` kibúvót (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) használják. Több tíz párhuzamos hosszú SSE-kliens (az üzemeltetőknek gyakran 40–50-re van szükségük) **memóriakeret** kérdése — a halmot, az elsődleges/tartalék férőhelyeket és az `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` értékét kell megfelelően méretezni —, nem pedig a termék merev „legfeljebb 2” korlátja. A terhelt halom továbbra is megismételhető `503` válaszokkal utasítja el a kéréseket, hogy a #7849 ne térjen vissza.

A halmok **megsokszorozásához** (független V8 old-space területek) **jelenleg**:

| Ezt tegye                                                                                                                                                                                                              | Ezt ne tegye                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Futtasson **N konténert/podot**, mindegyiket **saját** `DATA_DIR` könyvtárral / kötettel                                                                                                                               | Ne állítson be `replicas > 1` értéket egyetlen SQLite-fájlhoz                |
| A nagy erőforrás-igényű, folyamatban lévő kérések és az egészséges tartalék méretezését a halom / a folyamatban lévő bájtok kerete alapján végezze; az 1–2 a #7849 konzervatív alapértelmezése, nem merev termékkorlát | Ne adjon egy folyamatnak 8× RAM-ot és korlátlan darabszámkorlátot            |
| Opcionális: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` a **megosztott kvótaszámlálókhoz**                                                                                                                    | Ne kezelje a Redist megosztott SQLite-ként — nem az                          |
| Másolja be a szolgáltatói titkokat minden példányba (vagy fogadja el a particionált irányítópultokat)                                                                                                                  | Ne számítson egyetlen közös irányítópultra / hívásnaplóra a példányok között |
| Helyezzen elé bármilyen terheléselosztót; elegendő az API-kulcs vagy munkamenet szerinti ragadósság                                                                                                                    | Ne követeljen gyártóspecifikus, méretérzékeny köztes réteget                 |

Hardver: az egy példányra jutó párhuzamos hosszú `/v1/responses` kérések száma **memóriakeret** kérdése (halom + folyamatban lévő bájtok / #10110). Az `N` független `DATA_DIR` továbbra is megsokszorozza a halmokat: a gazdagép RAM-jának `N × cgroup` kapacitást kell fedeznie, nem pedig „egy 16 Gi méretű podot N=8 mellett”. Soha ne használjon `replicas > 1` értéket egyetlen SQLite-fájlhoz.

Compose-vázlat (két halom, két kötet — nem `deploy.replicas: 2`):

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

A folyamaton belüli sűrűség (a tömörítés kivitele a HTTP-izolátumból) kérdése: [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Egyetlen logikai fürt megosztott, tartós állapoton: [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Gemini regionális hibák Dockerben

A Google AI Studio / Gemini API HTTP 400-as választ adhat FAILED_PRECONDITION állapottal és a következő üzenettel:
`User location is not supported for the API use.` A gazdagépen sikeres kérés nem bizonyítja, hogy a konténer ugyanazt a kimenő útvonalat használja. A DNS-sorrend,
az IPv4-/IPv6-kapcsolat, a VPN-útválasztás és a konfigurált proxyk eltérhetnek. Ellenőrizze
[a Google által támogatott régiókat](https://ai.google.dev/gemini-api/docs/available-regions),
valamint a tényleges kapcsolati útvonalat; ez a hiba önmagában nem jelenti azt, hogy az API-kulcs hibás.

### Részesítse előnyben a kapcsolatspecifikus proxyt

Használja az OmniRoute [kapcsolatonkénti proxykonfigurációját](../ops/PROXY_GUIDE.md#4-level-proxy-system)
az érintett Gemini-kapcsolathoz, majd ismételje meg a **Kapcsolat tesztelése** műveletet és egy kisebb kérést
ugyanazzal a modellel. Így az útválasztás módosítása az adott kapcsolatra korlátozódik. Ellenőrizze,
hogy a proxy elérhető-e a konténerből, és hogy a kapcsolat valóban azt választja-e.
Az útvonal módosítása nem garantálja, hogy a felsőbb szintű szolgáltatás regionális jogosultsági feltételei teljesülnek.

### A gazdagép és a konténer hálózatának összehasonlítása

A hitelesített eredmények összehasonlításakor használjon azonos kulcsot, modellt és kérést; soha
ne illesszen be hitelesítő adatokat, proxyjelszavakat vagy teljes engedélyezési fejléceket egy hibajegybe.
Először ellenőrizze, hogy az operációs rendszer névfeloldója mely címcsaládokat kínálja, ugyanazt a parancsot
használva a gazdagépen és a konténeren belül:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Cserélje le az `omniroute` értéket a futtatott szolgáltatásra (például `omniroute-web`). Ezek
a parancsok hitelesítő adatok és IP-címek nélkül írják ki a címcsaládokat. A visszaadott `6`
csak IPv6-os DNS-eredményt jelez: **nem** bizonyítja a használható IPv6-útvonal vagy az API-hozzáférés meglétét.
Ahol telepítve van a `curl`, hasonlítsa össze a `curl -4 -I https://generativelanguage.googleapis.com`
és a `curl -6 -I https://generativelanguage.googleapis.com` eredményét mindkét környezetben.
A HTTP-válasz igazolja az adott próba kapcsolati működését, még akkor is, ha az egy hitelesítés nélküli
hibaválasz; a Gemini-jogosultságot csak a hitelesített modellkérés ellenőrzi.

### Gazdagépszintű alternatíva: működő IPv6 és névfeloldási házirend

A [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) bejelentője úgy állította helyre
a hozzáférést a saját környezetében, hogy engedélyezte a konténeres IPv6-ot, és módosította a glibc címválasztását.
Ezt környezetspecifikus alternatívaként kezelje. A névfeloldási beállítások módosítása előtt ellenőrizze
a működő gazdagépi IPv6-ot, a konténer kimenő kapcsolatát/útválasztását és a tűzfalszabályokat.
Egy privát ULA-cím önmagában nem igazolja a nyilvános IPv6-kapcsolat meglétét.

A Compose alapértelmezett hálózatához már csatlakoztatott szolgáltatások esetében ez a részlet engedélyezi
az IPv6-ot az adott hálózaton; tartsa meg a szolgáltatás többi beállítását, portjait, köteteit és konfigurációját:

```yaml
networks:
  default:
    enable_ipv6: true
```

Elnevezett hálózat esetén azon a hálózaton engedélyezze, amelyhez a szolgáltatás ténylegesen csatlakozik. A Docker
kioszthat egy ULA-alhálózatot; explicit, átfedésmentes alhálózatot csak akkor válasszon, ha a hálózata
ezt megköveteli. Lásd a [Docker IPv6-hálózatkezelését](https://docs.docker.com/engine/daemon/ipv6/)
és a [Compose hálózati beállításait](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Egy **glibc-alapú lemezképen** az `/etc/gai.conf` módosíthatja a címválasztást. A jelenlegi
adattár Dockerfile-ja Debiant használ; az egyéni, musl-alapú lemezképek nem használják ugyanezt a mechanizmust.
A bejelentett módosítás az ULA-címke értékét `label fc00::/7 6` értékről
`label fc00::/7 1` értékre változtatja. Induljon ki a lemezkép teljes házirendtáblájából, és őrizze meg annak többi
bejegyzését: egy `label` vagy `precedence` bejegyzés hozzáadása lecseréli az alapértelmezett táblát, ezért egy
csak a módosított sort tartalmazó fájl nem elegendő. A
[glibc konfigurációs referenciája](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumentálja ezeket a működési szabályokat. Csatolja a felülvizsgált fájlt csak olvasható bind mountként az `/etc/gai.conf`
elérési útra, majd hozza létre újra a szolgáltatást a módosítás alkalmazásához.

Ez módosítja az operációs rendszer címválasztását az **adott konténer összes kimenő forgalmánál**.
Nem kényszerít minden alkalmazást az IPv6 választására: a Node DNS-sorrendje és kapcsolatválasztása
is számít. Különösen a `--dns-result-order=ipv4first` az IPv4-et részesíti előnyben, és
nem jelent megoldást egy kizárólag IPv4-en jelentkező hibára. Lásd a [Node DNS-sorrendjét](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Minden gazdagépszintű módosítás után tesztelje újra a Geminit és a többi szolgáltatót. A visszaállításhoz
távolítsa el az egyéni `gai.conf` csatolását, állítsa vissza a korábbi hálózati konfigurációt, és
egy karbantartási időszakban hozza létre újra az érintett szolgáltatást/hálózatot. Egy hálózat újbóli létrehozása
megszakíthatja a hozzá csatlakoztatott többi konténer működését; ne törölje a tartós adatkötetet.

## Fontos megjegyzések

- **SQLite WAL mód:** Biztosítani kell, hogy a `docker stop` befejeződhessen, így az OmniRoute ellenőrzőpontba mentheti a legutóbbi módosításokat a `storage.sqlite` fájlba. A mellékelt Compose-fájlok már 40 másodperces türelmi időt állítanak be a leállításhoz. Ha közvetlenül futtatja a rendszerképet, tartsa meg a `--stop-timeout 40` beállítást.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Állítsa `true` értékre, ha a rendszeres, illetve írás előtti biztonsági mentéseket külsőleg kezelik. A meglévő adatbázisok migrációjához továbbra is szükség van saját, tartós biztonsági pillanatképre és tömeges migráció elleni védelemre.
- **Adatmegőrzés:** Mindig csatoljon kötetet az `/app/data` elérési úthoz, hogy az adatbázis, a kulcsok és a konfigurációk a konténerek újraindításai között is megmaradjanak.
- **Portbeállítás:** Az alapértelmezett `20128` port módosításához írja felül a `PORT` környezeti változót.

## Lásd még

- [Virtuális gépes üzembe helyezési útmutató](../ops/VM_DEPLOYMENT_GUIDE.md) — Virtuális gép + nginx + Cloudflare beállítása
- [Fly.io üzembe helyezési útmutató](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Üzembe helyezés a Fly.io szolgáltatásban
- [Környezeti konfiguráció](../reference/ENVIRONMENT.md) — Teljes `.env`-referencia
