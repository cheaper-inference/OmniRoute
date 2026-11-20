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

## Gyors futás

> **Öngazda egy parancsban?** Tekintse meg a [Self-Host Guide](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (közzétett kép + Redis, csak visszacsatolás, profilválasztás nélkül). Az alábbi Gyors futtatás az egytároló elérési útja azoknak a felhasználóknak, akik már máshol futtatják Redis.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Környezeti fájllal

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

## Dockerfile szakaszai

Az adattár egy többlépcsős Dockerfile-t (`Dockerfile`) szállít. Négy szakasz látható; válassza ki a megfelelő `target` az Ön használati esetéhez.

| Színpad       | Alapkép               | Cél                                                                                                                                                                                                                                                                                                      |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Telepíti a deps-t (`npm ci --legacy-peer-deps`) és futtatja `npm run build` (Turbopack alapértelmezés szerint — lásd alább az összeépítési idő erőforrásait)                                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Gyártási futásidő a Next.js önálló kimenettel.** Nincs szolgáltató CLIs csomagban.**                                                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Hozzáadja `git`, `docker.io`, `docker-compose` és globális CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Válassza ezt az ügynöki munkafolyamatokhoz.**                                                                                                                      |
| `runner-web`  | `runner-base`         | Hozzáadja Playwright + Chromium böngészőt (`--with-deps`) a webes munkamenet-szolgáltatók számára: `gemini-web`, `claude-web`, `claude-turnstile`.** Válassza ezt, ha ezeket a szolgáltatókat használja** — a sima kép kéréskor meghiúsul nélküle (lásd a `-web` megjegyzést a Kiadási csatornák alatt). |

Konkrét cél létrehozása manuálisan:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Építési idő erőforrások

Három build arg szabályozza, hogy mennyibe kerül a `builder` színpad. Csak felépítési idejűek. — `OMNIROUTE_MEMORY_MB` (lent) egy különálló, futásidejű gomb.

| Build arg                   | Alapértelmezett | Hatás                                                                                         |
| --------------------------- | --------------- | --------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`             | `0` webpack-kel épít: alacsonyabb csúcsmemória, lassabb. `1` a Turbopack t választja.         |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`          | V8 kupac mennyezet (`--max-old-space-size`) a megszületett `next build` számára .             |
| `OMNIROUTE_BUILD_WORKERS`   | `2`             | Táplálkozik `CIRCLE_NODE_TOTAL`; Következő levezeti `workers = N - 1` az oldaladatgyűjtéshez. |

`OMNIROUTE_BUILD_WORKERS` az, akit fel kell emelni egy nagy építőre, és az, aki gyanakszik, ha egy korlátozott építmény meghal** után** `✓ Compiled successfully`. Minden oldaladat-feldolgozó a saját folyamata, és maga a szülő `next build` is az; egy élő VPS reprodukció ( #7518 probléma) az egyes folyamatok RSS csúcsát ~ 4,5 GB -ban mérte, függetlenül a `NODE_OPTIONS` kupac jelzőtől (a Turbopack a V8 kupon kívüli native/Rust memóriában fordítja le). Az alapértelmezett `2` (→ 1 dolgozó, összesen 2 folyamat) a közzétételi folyamat által használt 16 GB / 4 vCPU GitHub által hosztolt futóhoz van méretezve. A `8` nél (→ 7 dolgozó) ennek a futónak elfogyott a memóriája, és a buildkit megbukta a lépést `ResourceExhausted: ... cannot allocate memory` rel; `3` (→ 2 dolgozó) még mindig nem illeszkedett, miután a folyamatonkénti RSS közvetlenül mérték ahelyett, hogy kikövetkeztetett volna. `tests/unit/docker-build-memory-budget.test.ts` a mért számhoz képest számol, és nem sikerül, ha valamelyik gomb túlnő a futón.

Turbopack a natív Rust memóriában állítja össze, amely él** kívül** a V8 kupac, tehát `OMNIROUTE_BUILD_MEMORY_MB` nem köti le. Memóriaplafonnal rendelkező gazdagépen a buildet ezután a OOM gyilkos hibaszöveg nélkül SIGKILLed — egyszerűen leáll a `Creating an optimized production build` közepén, ami inkább lefagy, mint kifogyott memória. Ez az oka annak, hogy a `Dockerfile` alapértelmezés szerint webpack (`OMNIROUTE_USE_TURBOPACK=0`), ellentétben `npm run dev` / `npm run build`, ahol Turbopack az alapértelmezett kód: egy csupasz `docker build .`, amely nem tartalmaz build arg-okat (amit a Railway és más egykattintásos gazdagépek futtatnak), nem halhat meg csendben egy memóriakorlátos builderen. A közzétett képek már kifejezetten átmennek `OMNIROUTE_USE_TURBOPACK=0` `docker-publish.yml` ben. Egy sok RAM rendelkező builder esetén válassza Turbopack a gyorsabb felépítés érdekében:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` engedélyezve van, tehát `next build` egy szülőt futtat** és** egy munkás folyamat, és mindegyik külön tiszteli `OMNIROUTE_BUILD_MEMORY_MB`. Mérje meg a konténer mennyezetét ennek az értéknek nagyjából kétszeresére, ne egyszer.

Ezen a fán mérve (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Konténer mennyezet | Eredmény                        |
| --------- | ------------------ | ------------------------------- |
| Turbopack | 8 GiB / 16 GiB     | OOM-ölte mindkettőt, némán      |
| webpack   | 8 GiB              | építeni munkás SIGKILLed        |
| webpack   | 12 GiB             | sikerült, 11,1 GiB-nál tetőzött |

### Futásidejű alapértelmezett beállítások

`runner-base` által exportált alapértelmezések: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Memória viselkedése Docker ban:

- A kép beállítja `OMNIROUTE_MEMORY_MB=1024`, és ebből származtatja `NODE_OPTIONS=--max-old-space-size=1024`.
- A tényleges szerverfolyamatot az önálló indító indítja el, amely beolvassa `OMNIROUTE_MEMORY_MB` és hozzáfűzi `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- A csomópont az utoljára ismételt `--max-old-space-size` értéket használja, így `OMNIROUTE_MEMORY_MB` beállítása szabályozza a tényleges Docker kupackorlátot.
- Mivel a kép mindig beállítja, az indító saját RAM-kalibrált tartaléka soha nem érvényes Docker alatt. Emelje fel kifejezetten a munkaterheléshez (az alábbi táblázat). `2048` még mindig túl kicsi `/v1/responses` kódolóügynökhöz.

### Futásidejű RAM kódoló ágensekhez

Az 1 GiB Docker alapértelmezett dashboard/light-chat padló, nem pedig gyártási méret. A hosszú `POST /v1/responses` testek (üzenetek százai, eszközök tízei) több memóriában lévő gráfot is megőriznek a tömörítés során. Két egymást átfedő ~ 3 MiB / ~ 750k-token kérés megszakította a V8-at** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) és egy 16 GiB cgroup OOM is eltalált. Lásd: [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Méret** cgroup `--memory` a kupac felett** — natív pufferek, SQLite és a tömörítés közbenső termékek a V8-on kívül helyezkednek el.

| Munkaterhelés                         | `OMNIROUTE_MEMORY_MB`        | Container / cgroup       | Megjegyzések                                                                                            |
| ------------------------------------- | ---------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| Irányítópult, egy könnyű csevegés     | `1024` (alapértelmezett kép) | ≥2 GiB                   |                                                                                                         |
| Egy kódoló ügynök (Claude/Codex/Grok) | `8192`                       | ≥10 GiB                  | Tipikus egymenetes `/v1/responses`                                                                      |
| Két egyidejű hosszú `/v1/responses`   | `10240`–`12288`              | ≥12–16 GiB               | Mért V8 megszakítás ~ 12 GiB kupacnál                                                                   |
| Három + egyidejű hosszú kontextus     | ne egy folyamaton            | szerializálás / több RAM | Az alapértelmezett nehézsúlyú felvétel 1 repülés közben; RAM nélküli emelése újra bevezeti az abortuszt |

`omniroute serve` a csupasz fémen kalibrálja ~RAM %-át (bilincselt `[512, 4096]`), amikor `OMNIROUTE_MEMORY_MB`** nincs beállítva** . Docker mindig `1024` értéket állítja be, így a kalibráció soha nem fut le a hivatalos képfájlban.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

Next.js `basePath` is compiled into the standalone bundle. OmniRoute records the baked value in a sentinel file at the app root (written during `npm run build`; read by `scripts/docker/ensure-docker-base-path.mjs`) and compares it with `OMNIROUTE_BASE_PATH` when the container starts. When they differ and the image was built for the domain root, the entrypoint rewrites the standalone manifests, the embedded `basePath`/`assetPrefix` literals (Next 16 renders SSR asset URLs from `assetPrefix` alone — the patcher mirrors the subpath into it), the baked `/_next/static` asset URLs (client-reference manifests, media imports, prerendered error pages) and the client `process.env` shim before `node dev/run-standalone.mjs` runs.

### Összeállítás létrehozása (ajánlott)

Állítsa be mindkét változót `.env`-ban, majd építse újra, hogy a kép és a futási idő megegyezzen:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` a `OMNIROUTE_BASE_PATH` Docker build-argként és futási környezeti változóként továbbítja.

### Előre beépített gyökérkép + futásidejű alútvonal

A közzétett `cheaperinference/omniroute:*` -képek a tartománygyökér számára készültek. Futás közben továbbra is beállíthatja `OMNIROUTE_BASE_PATH` ; a tároló indításkor egyszer javítja a köteget. Párosítsa a megfelelő nyilvános eredettel:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurálja a fordított proxyt a** tele** külső elérési út (ne törölje le az előtagot). A Traefiknek `PathPrefix(`/omniroute `)` a `StripPrefix` nélküli konténerhez kell irányítania, így Next.js megkapja `/omniroute/...` és kiszolgálja `/omniroute/_next/...` től származó eszközöket.

A Docker állapotellenőrzés megvizsgálja a könnyű `/healthz` életciklus-végpontját, amelynek előtagja az aktív `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` elérhető marad human/dashboard diagnosztikához; a HEALTHCHECK tároló visszafelé mutatásához (például a mélyreható egészségvédelem érdekében), állítsa be `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` értéket. Ez az út a** mély** ellenőrizze (DB + monitorozási összefoglaló) — megfelelő Docker ritka `HEALTHCHECK` jeihez, ha visszalép, de** nem** Kubernetes `livenessProbe` intervallumokhoz.

Hangszerelőknek (Kubernetes, Nomad stb.):

| Szonda          | Inkább                                                                   | Elkerül                                                                     |
| --------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Életesség       | HTTP `GET /livez` vagy TCP a fő porton (`PORT`, alapértelmezett `20128`) | `/api/monitoring/health` mint elevenség                                     |
| Készenlét       | HTTP `GET /healthz`                                                      | Szűk időtúllépések, amelyek az eseményhurok foglaltságát halottként kezelik |
| Mély / blackbox | `/api/monitoring/health`                                                 | —                                                                           |

`/healthz` a folyamat életciklusát jelenti (`ok` / `starting` / `stopping`). `/livez` csak folyamatban van (200, amikor a kezelő tud futni; nem várja meg a készenlétet). Mindkettő továbbra is — ≠ csomópont eseményhurkon fut, mint a kéréskezelés, így a CPU-hoz kötött katalógus vagy tömörítési munka késleltetheti őket. Ha HTTP szondák időtúllépnek, részesítse előnyben TCP élénkséget. Teljes útmutatás a szondához: [Monitoring guide — Kubernetes szonda ajánlások](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose with Caddy (HTTPS Auto-TLS)

OmniRoute biztonságosan elérhető a Caddy automatikus SSL kiépítésével. Győződjön meg arról, hogy a domain DNS A rekordja a szerver IP értékére mutat.

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

A Caddy beállítja a szabványos továbbítási fejléceket az upstream tárolóhoz. OmniRoute `NEXT_PUBLIC_BASE_URL` használja kanonikus nyilvános forrásként OAuth visszahívásokhoz és a generált nyilvános hivatkozásokhoz; A hitelesített műszerfali írások azonos eredetű kéréseket és munkamenethez kötött CSRF védelmet használnak. `OMNIROUTE_TRUST_PROXY` csak olyan speciális telepítéseknél engedélyezze, ahol szándékosan szeretné, hogy OmniRoute a nyilvános eredetet megbízható továbbított fejlécekből származtassa explicit konfiguráció helyett.

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

## Képcímkék

| Kép                          | Címke    | Méret    | Leírás                                                   |
| ---------------------------- | -------- | -------- | -------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250 MB | Legmagasabb** közzétett** stabil SemVer (nem git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250 MB | Rögzítse ezt a címkét GitOps hoz                         |

Ugyanazokat a képeket három tárhelyen teszik közzé, ugyanazokkal az architektúránkénti kivonatokkal: `cheaperinference/omniroute` (Docker Hub, a Cheaper Inference szervezet, 3.8.53-tól), `ghcr.io/cheaper-inference/omniroute` és a legacy `diegosouzapw/omniroute`, amely megőrzi lehívási előzményeit, és továbbra is megkap minden kiadást. A meglévő `diegosouzapw/omniroute` telepítések folyamatosan frissülnek; a kép nevének váltása nem kötelező. Az alábbi `:next` / `:next-web` kiadás előtti csatorna csak `diegosouzapw/omniroute` és GHCR számára érhető el.

Többplatformos jegyzék: `linux/amd64` + `linux/arm64` natív (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automatikusan kiválasztja a megfelelő architektúrát; adja át `--platform linux/amd64` ha AMD64 emulációt kell kényszerítenie a ARM állomásokon.

### Kiadási csatornák

OmniRoute különálló Docker csatornákat tesz közzé a stabil kiadásokhoz, az aktív kiadási ág teszteléséhez és a fejlesztési buildekhez.

| Csatorna                        | Forrás                                    | Változékonyság                     | Javasolt felhasználás                                                                                                                       |
| ------------------------------- | ----------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned kiadás                   | Változhatatlan                     | Pontos kiadást rögzítő éles telepítések                                                                                                     |
| `:latest` / `:latest-web`       | Legmagasabb** közzétett** stabil SemVer   | Változtatható stabil mutató        | Stabil kiadásokat követ** után** egy SemVer közzétételi feladatot — végez** nem** nyomon követi `main` vagy a kiadatlan `release/v*` commit |
| `:next` / `:next-web`           | Jelenlegi alapértelmezett `release/v*` ág | Változtatható kiadás előtti mutató | Olyan javítások tesztelése, amelyek az aktív kiadási ágban landoltak, de még nem stabil kiadásban                                           |
| `:main` / `:main-web`           | `main` ág                                 | Változtatható fejlesztési mutató   | Csak fejlesztési és integrációs tesztelés                                                                                                   |

#### Webes munkamenet-szolgáltatók: a `-web` képek

Minden fenti csatorna `-web` címkeként (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) működik, amely a `runner-web` szakaszból, a — azonos képből, valamint Playwright és egy Chromium böngészőből épül fel. A sima képet szállítják** nélkül** Króm; `gemini-web`, `claude-web` és `claude-turnstile` kell rá.

A hiba elhalasztható, nem az indítási idő: ezek a szolgáltatók listázzák modelljeiket, és összekapcsoltként jelennek meg az irányítópulton, és csak az első kérés sikertelen

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ha ezeket a szolgáltatókat használja, húzza ki annak a csatornának a `-web` címkéjét, amelyen már — van, semmi más nem változik. npm/CLI telepítés esetén (nincs Docker kép) a megfelelő hiányzó rész a böngésző bináris fájlja: futtassa `npx playwright install chromium` a gazdagépen.

#### A kiadás előtti csatorna használata

A `next` csatorna minden lenyomáskor újraépül az aktuális alapértelmezett `release/v*` ágra, és közzéteszik AMD64 és ARM64 számára is. A régebbi karbantartási ágak nem írhatják felül. A csatorna lehúzható képet biztosít azokhoz a javításokhoz, amelyek a következő stabil címke levágása előtt egyesültek az aktív kiadási ágba.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose esetén írja felül a kiválasztott profil által használt képcímkét, majd húzza ki és hozza létre újra a szolgáltatást:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Biztonság és visszafutás

`next` egy lebegő megjelenés előtti csatorna. Bármilyen lenyomáskor megváltozhat az aktív kioldó ágra, és az is** éles használatra nem támogatott** . A kép kivonat rögzítése egy adott build kiértékelése közben:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

A tesztelés előtt készítsen biztonsági másolatot a OmniRoute adatkötetről vagy a kötésen csatolt adatkönyvtárról. A visszaállításhoz állítsa vissza a korábban használt stabil verziót, vagy bontsa ki és hozza létre újra a tárolót:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Egy kiadási elágazású build soha nem mozgathatja `latest`; csak egy alkalmas stabil szemantikai verzió támogathatja a stabil mutatót. A `next` lemezképek megtartják a kiadási kép ellenőrzését és a CRITICAL sebezhetőségi kapu blokkolását.

**`latest` nem devizagarancia a git számára.** `main` vagy az aktív `release/v*` ág egyesített javításai a következők** nem** `:latest` ben mindaddig, amíg egy stabil SemVer kép meg nem jelenik, és a közzétételi feladat előlépteti `:latest` (ugyanaz a kivonat, mint a SemVer). Ha `latest` lefagyottnak tűnik, miközben GitHub már mutatja a javítást, húzza meg `:next` a kiadási ág teszteléséhez, vagy várja meg a SemVer címkét.

| Azt akarod                                                                   | Használat                                |
| ---------------------------------------------------------------------------- | ---------------------------------------- |
| GitOps / termelés, amely nem sodródhat                                       | `:X.Y.Z` rögzítése (vagy a kép kivonata) |
| Kövesd a közzétett istállókat, és fogadd el az újraalkotást minden kiadásnál | `:latest`                                |
| Tesztelje a kiadatlan `release/v*` commitokat                                | `:next` (nem gyártás)                    |
| Teszteld a `main`                                                            | `:main` (nem gyártás)                    |

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

## Elérhetőség: az alapértelmezett SQLite egyetlen replika

Stock Docker / Kubernetes OmniRoute is** one Node process + one SQLite író** . A magas rendelkezésre állás** nem támogatott** azon a topológián.

| Kényszer                                      | Következmény                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Egyedülálló író                               | Tedd** nem** futtasson több replikát ugyanazon SQLite fájlon. Ez elrontja a DB.                                                                                                                                                                                                                                                             |
| Újrakészítés / újraindítás / HEALTHCHECK kill | **Teljes leállás** a repülés közbeni SSE, a műszerfali munkamenetek és a memória állapota. Minden csatlakoztatott kliens leesik. Az üres végpont ablakban érkező új kérések fordított proxyt kapnak**`502 Bad Gateway: Unknown error`** , nem OmniRoute JSON — az ügyfelek nem tudják megkülönböztetni ezt a szolgáltatói hibától (#11015). |
| Ugyanaz az eseményhurok, mint `/healthz`      | Egy elfoglalt katalógus vagy tömörítés késleltetheti a szondákat; egy rövid időtúllépés, majd újraindítja a** csak** másolat.                                                                                                                                                                                                               |

**Szonda mátrix** (lásd még [a Kubernetes szonda ajánlásait](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Szonda         | Cél                                                             | Ne használja                                                                |
| -------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Életesség      | TCP `PORT` (alapértelmezett `20128`), vagy lágy HTTP `/healthz` | `/api/monitoring/health`                                                    |
| Készenlét      | HTTP `GET /healthz`                                             | Szűk időtúllépések, amelyek az eseményhurok foglaltságát halottként kezelik |
| Mély / emberek | `/api/monitoring/health`                                        | Automatizált kubelet életerő                                                |

**Frissítések:** számítson arra, hogy minden munkamenet leesik. Drain ügyfeleket, ha lehet; az alapértelmezett SQLite n nincs folyamatos frissítés. `restart: unless-stopped` plusz Docker összeállítása `HEALTHCHECK` az egyetlen folyamatot is lecseréli, ha a tároló egészségtelen – ugyanaz a robbanási sugár.

A kész jegyzékek és a Helm-diagram élőben `deploy/kubernetes/` és `deploy/helm/omniroute/` nyelven – lásd a [Kubernetes telepítési útmutatóját](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes kódrészlet a** egyetlen replika** (Újra létrehozás szükséges; ne emeljen `replicas` t egyetlen SQLite fájlra):

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

`preStop` sleep lehetővé teszi, hogy a kube eldobja a szolgáltatás végpontjait SIGTERM előtt, így** új** a forgalom leáll, sújtja a haldokló folyamatot. Repülés közbeni `/v1/responses` SSE `SHUTDOWN_TIMEOUT_MS` (alapértelmezett 30 mp) lemerül nehézsúlyú belépőbérleti szerződések révén (#11015). Azok az új kérések, amelyek még mindig elérik a folyamatot `503` + `Retry-After: 5` fájlt kapják. Az Üres végpont-rés újra létrehozása, amíg a csere kész állapotba nem kerül, továbbra is súlyos kimaradást jelent – ez a SQLite topológia, nem pedig egy próba hiba.

Külső Postgres / több író HA is** nem** dokumentált készletút. Ha HA van szüksége, tartson meg egyetlen replikát, vagy futtasson egy topológiát, amelyet a projekt külön tesztelt és dokumentált. A Postgres/MySQL mű a [#8075-](https://github.com/diegosouzapw/OmniRoute/issues/8075) ben lakik. Amíg ez kiszáll, az egyetlen támogatott módja a szaporításnak** nagy** `/v1/responses` kapacitás N független folyamat (következő rész), nem `replicas > 1` egy köteten.

## Kiméretezés: N független folyamat

### Codex token rotációs tulajdonjog

Egy Codex fiók másolatai nem használhatják fel önállóan az egyszer használatos frissítési tokent. Azokon a példányokon, amelyek csak szinkronizált hitelesítő adatokat használnak, állítsa be `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Hagyja beállítatlanul az egyszeri forgatás tulajdonosán. Minden folyamatnak szüksége van saját `DATA_DIR`; ez az opció nem osztja meg SQLite, és nem biztosít jogkivonat szinkronizálást vagy elosztott zárolást.

A passzív példány újraolvassa a kapcsolatot, amikor frissítésre van szükség, és csak egy másik, le nem járt hozzáférési jogkivonatot vesz át. Ellenkező esetben a frissítés le van tiltva a kapcsolat lejárta vagy inaktiválása nélkül, illetve a frissítési megszakító hibáinak számítása nélkül. A valódi upstream hitelesítési hibák továbbra is normál hibaelszámolást, exponenciális lehűlést és normál ügyfélhibát használnak; a fiók deaktiválása végleges marad. Szinkronizálja a tulajdonos elforgatott tokenjeit, mielőtt a hozzáférési jogkivonatok lejárnának (az alapértelmezett proaktív frissítési idő öt perc), vagy importálja újra a Codex auth fájlt. A passzív importálások a szolgáltatott tokeneket anélkül tárolják, hogy a jogkivonat végpontján érvényesítenék őket. A kézi dashboard/API frissítés `409 refresh_disabled` értéket adja vissza; az új OAuth bejelentkezési adatok változatlanok. Lásd [a környezeti referenciát](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

A One Node folyamat az** egy V8-as kupac** . Két egymást átfedő ~ 3 MiB / ~ 750k-token kódoló ágens, `POST /v1/responses` (RTK + Caveman) megszakítja ezt a kupacot ~ 12 Gi (`FATAL ERROR: Reached heap limit`) mellett, és OOM tud egy 16 Gi-s ccsoportot. Lásd [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ez a mérés a** memória-költségvetés** figyelmeztetés, nem egy termék hard-max két egyidejű hosszú `/v1/responses`. A nehézsúlyú csevegésbeengedést egy automatikusan származtatott feldolgozási bájt-költségkeret (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) korlátozza, amely ugyanabból V8/cgroup plafonból áll, a — felülbírálása (vagy az örökölt `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` kérésszám-korlát beállítása) egy már méretű folyamaton újra bevezeti a megszakítást. Kis csevegés, `/healthz`, `/v1/models` és MCP** nem** abban a sapkában.

### Egy folyamat: több mint két hosszú `/v1/responses`

A** egészséges** folyamat (halom `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` alatt, alapértelmezett `0.75`)** május** futtasson kettőnél több egyidejű hosszú `POST /v1/responses` ha a folyamatszintű bejárati bájt költségvetésben (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) még van hely. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` nél (alapértelmezett 256 KiB) vagy annál nagyobb testek ugyanazt a nehézsúlyú bérletet veszik fel, mint a szerkezet-súlyos kérések, és ugyanazt a [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape-t (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) használják. Több tíz egyidejű hosszú SSE kliens (az operátoroknak gyakran 40-50-re van szükségük) a** memória-költségvetés** kérdés — méret kupac + primary/headroom slot + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nem kemény „max 2” termékkorlát. Egy nyomás alatt álló kupac továbbra is lemerül az újrapróbálható `503` vel, így a #7849 nem tér vissza.

To** halmokat szaporítani** (független V8-as régi terek)** ma** :

| Tedd                                                                                                                                                  | Nem                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Fut** N containers/pods** , mindegyik a maga** saját** `DATA_DIR` / kötet                                                                             | Állítsa be `replicas > 1` egy SQLite fájlhoz                            |
| Nehéz repülés közbeni + egészséges fejtér halom / berepülési bájtos költségvetésből; 1–2 a konzervatív #7849-es alapértelmezés, nem kemény termék max | Adjon meg egy folyamatnak 8 × RAM és egy korlátlan számsapkát           |
| Nem kötelező: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` for** megosztott kvótaszámlálók**                                                  | Kezelje Redis megosztott SQLite — ként, ez nem az                       |
| A szolgáltatói titkok megkettőzése minden példányban (vagy particionált irányítópultok elfogadása)                                                    | Egy irányítópultra/egy hívásnaplóra számítson az egyes példányok között |
| Elöl bármilyen terheléselosztóval; elég a sticky by API gomb vagy session                                                                             | Megkövetel egy szállítóspecifikus, mérettudatos köztes szoftvert        |

A munkamenet és a fiók közötti affinitás Redis keresztül is megosztható: állítsa be `OMNIROUTE_SESSION_AFFINITY_STORE=redis` és `REDIS_URL` minden folyamathoz, ugyanazzal a `REDIS_KEY_PREFIX` vel és pozitív `sessionAffinityTtlMs` beállítással. A pinek feloldják a kivonatolt használati fiók identitásokat az egyes folyamatok jogosult helyi kapcsolataihoz, így az egyező identitás-metaadatokkal rendelkező OAuth -fiókoknak nem kell egyező IDs kapcsolattal rendelkezniük. Az ismert fiókazonosítók elsőbbséget élveznek az ellentmondásos helyi IDs szemben a tűfelbontásban és az őrzött kilakoltatásban; az identitás nélküli rekordok (vagy az identitás nélküli kilakoltatási hívók) megtartják az örökölt ID őrt. A stabil használati identitás nélküli fiókokhoz továbbra is meg kell egyezni IDs. Redis hibák vagy a 100 ms-ot meghaladó hívások a helyi SQLite re esnek vissza. Minden Redis affinitástároló 8-ra korlátozza a kiemelkedő műveleteket, azonnal megkerüli Redis, ha megtelik, és csak akkor szabadítja fel a réseket, amikor a mögöttes munka rendeződik, nem pedig a hívó határidejében. A Redis -kimaradás során nincs megosztott igazság: minden példány visszaesik a saját helyi rokonságához, a munkamenetek példányonként egyszer újra rögzíthetők, és a példányok eltérhetnek egymástól. A ragadósság újra konvergál Redis keresztül, amikor helyreáll. Az időtúllépési határok várnak, nem pedig egy elküldött EVAL, amely visszaesés után landolhat. Az útválasztási írások az útválasztási döntés által megfigyelt pontos értéket hasonlítják össze, nem pedig egy új mutációidő-olvasást; egy megfigyelt kihagyás vagy egy SQLite tartalék megfigyelés egy hiányzó Redis kulcshoz hasonlítható. Az elavult tűk cseréje egy CAS-ben történik, így a késői parancs nem cserélhet ki vagy törölhet újabb, eltérő tűt. Redis olvasása atomosan visszaadja a TTL értéket és a maradék szervert; a pozitív PTTL (vagy nincs lejárat) határozza meg az elevenséget, nem az író JSON időbélyege vagy az olvasó órája. A helyi pillanatképek leképezik a fennmaradó TTL t egy helyi határidőhöz; A meglévő JSON kulcsok olvashatóak maradnak, és nyers bájtjaik megmaradnak CAS számára. Redis az egyetlen igazságforrás, miközben válaszol. A megerősített megosztott feljavítások, érintések és törlések eltávolítják a helyi bejegyzést, soha nem telepítik vagy frissítik. A Redis útvonalon lévő SQLite csak ennek a példánynak Redis hibáiból, időtúllépéseiből vagy a belépési telítettségből származó tartalék döntéseit tartalmazza, a korábbiak szerint TTL-korlátozott. Egy későbbi kimaradásnál hiányzó helyi PIN-kód egy új választásba kerül (egy gyorsítótár-kihagyás), nem pedig egy rossz vagy kitiltott fiókba. Az elutasított feloldások atomosan visszaadják a megosztott nyertest és a maradék TTL t: a közönséges kiválasztás újraellenőrzi a feltérképezett helyi határidőt, és egy még élő jogosult nyertest használ, érintve az adott fiók használatát és naplózását további megosztott írás nélkül. Ha nem érhető el, a kijelölés megtartja a helyi jelöltet, a megosztott PIN-kódot változatlanul hagyja, és egy hibakeresési üzenetet küld. Elutasított CAS nem ír SQLite; Redis hibák, időtúllépések vagy belépési telítettség helyett a meglévő helyi műveletet alkalmazzák. Ha egy elküldött mutáció válasza időtúllépés után érkezik (elfogadva, elutasítva vagy hibásan), a szinkron, pontos soros érték összehasonlítása és törlése csak a bájt-azonos időtúllépési tartalék sort távolítja el. Az összehasonlítás és a törlés között nincs várakozás; egy újabb kimaradási írás megmarad. Az őrzött kilakoltatás eltávolítja a sikertelen fiók saját helyi PIN-kódját, még akkor is, ha Redis le van tiltva, és újra megtisztítja a megerősített megosztott kilakoltatást követően. A függőben lévő korábbi megosztott válaszok nem tudják visszaállítani a kilakoltatott helyi PIN-kódot, mert a megosztott sikerek soha nem írnak SQLite. Egy későbbi kiesés visszaállíthatja a fiókot; egy később elfogadott megosztott írás csak Redis ben létezik. Redis misses nem veszi figyelembe a helyi tartalék állapotot. Ha a meghajtó ki van kapcsolva, az újonnan kiválasztott csapok megtartják az örökölt négymezős SQLite JSON alakot; csak Redis útválasztás adja hozzá a kivonatolt fiókazonosítót. Az előre letöltött tűket a lejárati határon újra ellenőrzik. Redis nem bérleti kijelölés újraolvassa az áruházat, de a szinkron bérlettervezés továbbra is használhat egy kiürített tűt az előzetes letöltés és a tervezés között (egy elfogadott legjobb erőfeszítés ablak). A lízingkötelezettség nem válthat fiókot tartós követelés után: az elutasított feloldáskor csak az adott kérelemre igényelt jelöltet tartja meg, és érintetlenül hagyja a megosztott nyertest, így a példányok közötti megállapodás ezen az úton korlátozódik. A táblázat többi része továbbra is érvényes: ez nem osztja meg a kombinált munkamenetek ragadósságát, a natív Codex fordulótűket, a fiókszemaforokat, a kizárásokat, a költési limiteket, a konfigurációs vagy hívásnaplókat.

Hardver: példányonkénti párhuzamos hosszú `/v1/responses` a** memória-költségvetés** kérdés (heap + inflight-byte / #10110). `N` független `DATA_DIR` k továbbra is szoroznak kupacokat: RAM gazdagépnek `N × cgroup` kell lefednie, nem pedig „egy 16 Gi-s pod N = 8-cal”. Soha ne `replicas > 1` egy SQLite fájlon.

Vázlat összeállítása (két kupac, két kötet — nem `deploy.replicas: 2`):

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

A folyamat közbeni sűrűség (a HTTP izolátum tömörítése) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). A megosztott tartós állapot egyik logikai fürtje a [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
