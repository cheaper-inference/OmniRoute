# 🐳 Docker Guide — OmniRoute (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Celoten referenčni priročnik za namestitev z Dockerjem. Za hiter začetek glejte [razdelek o Dockerju v datoteki README](../README.md#-docker).

## Kazalo vsebine

- [Hiter zagon](#quick-run)
- [Z datoteko okolja](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Razpoložljivi profili](#available-profiles)
- [Konfiguriranje gostiteljskih orodij CLI, ko OmniRoute deluje v Dockerju](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Stranski vsebnik Redis](#redis-sidecar)
- [Produkcijski Compose](#production-compose)
- [Faze datoteke Dockerfile](#dockerfile-stages)
- [Ključne okoljske spremenljivke](#critical-environment-variables)
- [Docker Compose s Caddyjem (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Hitri tunel Cloudflare](#cloudflare-quick-tunnel)
- [Oznake slik](#image-tags)
- [Posodobitve nadzorne plošče v Dockerju](#dashboard-updates-in-docker)
- [Razpoložljivost: privzeti SQLite podpira eno repliko](#availability-default-sqlite-is-single-replica)
- [Regionalne napake Gemini znotraj Dockerja](#gemini-regional-errors-inside-docker)
- [Pomembne opombe](#important-notes)

---

## Hitri tek

> **Samostojno gostovanje v enem ukazu?** Oglejte si [Vodnik za samostojno gostovanje](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (objavljena slika + Redis, samo povratna zanka, brez izbire profila). Spodnji hitri zagon je pot z enim vsebnikom za uporabnike, ki že izvajajo Redis drugje.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Z datoteko okolja

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
# Osnovni profil (brez orodij CLI)
docker compose --profile base up -d

# Profil CLI (vgrajeni Claude Code, Codex in OpenClaw)
docker compose --profile cli up -d

# Gostiteljski profil (prednostno za Linux; gostiteljske izvedljive datoteke CLI priklopi samo za branje)
docker compose --profile host up -d

# Spletni profil (Chromium/Playwright za ponudnike spletnih sej)
docker compose --profile web up -d

# Združite CLI in stranski vsebnik CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Razpoložljivi profili

OmniRoute vključuje profile Compose za glavne načine namestitve. Izberite tistega, ki ustreza vašemu okolju.

| Profil            | Storitev         | Kdaj ga uporabiti                                                                                                                                               | Ukaz                                         |
| ----------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (privzeto) | `omniroute-base` | Brezglavi strežnik/minimalno izvajalno okolje, brez vključenih orodij CLI ponudnikov                                                                            | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentski delovni tokovi, ki kličejo `omniroute providers/setup/doctor`, in vključena orodja CLI (Codex, Claude Code, Droid, OpenClaw)                           | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Gostitelji Linux, ki želijo dostop do gostiteljskih orodij CLI, podoben `network_mode`, s priklopom `~/.local/bin`, `~/.codex`, `~/.claude` itd. samo za branje | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Zagon stranskega vsebnika [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na vratih `8317` za posredovanje v nadrejeni posredniški strežnik CLI     | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Ponudniki spletnih sej, ki potrebujejo brskalnik: `gemini-web`, `claude-web`, `claude-turnstile` (zgradi `runner-web`, Chromium je vključen)                    | `docker compose --profile web up -d`         |

> Kombinirati je mogoče več profilov: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfiguriranje gostiteljskih orodij CLI, ko OmniRoute deluje v Dockerju

`omniroute setup-codex`, `setup-claude`, `config set <tool>` in gumb **Shrani konfiguracijo** na nadzorni plošči zapisujejo datoteke, kot je `~/.codex/*.config.toml`. Te poti imajo pomen samo v računalniku, v katerem se CLI dejansko izvaja. Če jih zaženete znotraj vsebnika, se datoteke zapišejo v lastni domači imenik vsebnika (`/home/node` — slika se izvaja kot `USER node`), kjer jih noben gostiteljski CLI ne bo nikoli prebral in kjer so zavržene takoj, ko je vsebnik znova ustvarjen.

OmniRoute to zazna in namesto poročanja o uspehu, ki ga ne morete izkoristiti, zavrne zapisovanje ter prikaže navodila: CLI se konča s kodo `2`, API pa odgovori s kodo `422` in `containerEphemeralTarget: true`.

### Priporočeno: zaženite CLI na gostitelju, OmniRoute pa v Dockerju

Vsebnik zagotavlja API; CLI konfigurira vaša gostiteljska orodja.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # usmerite CLI na vsebnik
omniroute setup-codex                      # zapiše dejanski ~/.codex na vašem gostitelju
```

To je prava izbira, kadar se Codex, Claude Code, Cursor ali podobna orodja izvajajo na vašem prenosniku — kar je običajna nastavitev.

### Alternativa: priklopite gostiteljske konfiguracijske imenike z vezanim priklopom (profil `host`)

Če želite, da vsebnik sam zapisuje vašo gostiteljsko konfiguracijo, vanj priklopite imenike in nastavite `CLI_CONFIG_HOME` na korenski imenik priklopa. Profil `host` to že omogoča:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Vezani priklop zagotavlja, da je pot vredna zaupanja: OmniRoute prebere `/proc/self/mountinfo` in dovoli zapisovanje v priklopljene poti (ter v imenike, katerih podrejeni imeniki so priklopi, kar natančno ustreza zgornji strukturi `/host-home`), medtem ko še vedno zavrača zapisovanje v nepriklopljene poti.

### Izhod v sili: konfigurirajte CLI-je samega vsebnika (uporabljajte zadržano)

Ko so CLI-ji dejansko znotraj vsebnika (profil `cli`), je zapisovanje namerno. Vsakemu ukazu `setup-*` podajte `--allow-container-write` ali za strežnik nastavite `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Zapisovanje se izvede z opozorilom, da podatki ne bodo ohranjeni po odstranitvi vsebnika.

> **Varnostno opozorilo — profil `cli` in priklop `docker.sock`.**
> Profil `cli` z vezanim priklopom priklopi `/var/run/docker.sock`, da lahko samodejni posodabljalnik znotraj vsebnika prek gostiteljskega demona znova ustvari sklad
> (`src/lib/system/autoUpdate.ts` preveri prisotnost te vtičnice in preskoči
> Dockerjevo pot, kadar je ni). Ta vtičnica je **meja zaupanja s korenskimi
> pravicami na gostitelju**: vse, kar lahko dostopa do nje, upravlja gostiteljski
> demon Docker kot korenski uporabnik — ustvari, pregleda, ustavi in odstrani
> lahko kateri koli vsebnik na gostitelju. Posledice:
>
> 1. **Vrat profila `cli` nikoli ne izpostavljajte omrežju.** Objavite
>    jih na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli`, dosegljiv iz omrežja LAN, spremeni kakršno koli oddaljeno
>    izvajanje kode na ravni nadzorne plošče v popoln prevzem gostitelja.
> 2. **V profil `cli` ne priklapljajte nobenih dodatnih gostiteljskih imenikov.**
>    Dockerjeva vtičnica skupaj s katerim koli dodatnim priklopom vsebniku
>    omogoči popoln dostop za branje in pisanje v vaš datotečni sistem ter
>    gostiteljsko konfiguracijo. Če mora orodje dostopati do projekta, ga
>    zaženite lokalno z binarno datoteko CLI — ne priklapljajte ga v vsebnik
>    `cli`.
>
> Če ne potrebujete samodejnega posodabljanja znotraj vsebnika, profila `cli`
> ne vklopite (`COMPOSE_PROFILES=core,redis` ali krajše). Drugi profili ne
> priklapljajo Dockerjeve vtičnice.
>
> Glejte `docs/security/MITM-TPROXY-DECRYPT.md` (git; ni prevedeno v `/docs`) za povezani model groženj
> glede MITM in `docs/security/SUPPLY_CHAIN.md` za verigo izvora binarnih
> datotek `codex`/`claude-code`/`droid`/`openclaw`.

## Spremljevalni vsebnik Redis

OmniRoute uporablja Redis za podporo porazdeljenemu omejevalniku hitrosti in skupnemu predpomnilniku. Storitev `redis` je **vedno definirana** v datoteki `docker-compose.yml` (ni omejena s profilom) in se zažene skupaj s katerim koli drugim profilom.

| Podrobnost                 | Vrednost                                 |
| -------------------------- | ---------------------------------------- |
| Slika                      | `redis:7-alpine`                         |
| Ime vsebnika               | `omniroute-redis`                        |
| Notranja vrata             | `6379`                                   |
| Vrata gostitelja (prepis)  | `REDIS_PORT` (privzeto `6379`)           |
| Vezava gostitelja (prepis) | `REDIS_BIND_HOST` (privzeto `127.0.0.1`) |
| Nosilec                    | `omniroute-redis-data` → `/data`         |
| Preverjanje stanja         | `redis-cli ping` (interval 10 s)         |

Povezane okoljske spremenljivke:

- `REDIS_URL` — povezovalni niz, posredovan aplikaciji (privzeto `redis://redis:6379`).
- `REDIS_PORT` — preslikava vrat na strani gostitelja za vsebnik Redis.
- `REDIS_BIND_HOST` — gostiteljski vmesnik, na katerem so objavljena vrata. Privzeta vrednost je `127.0.0.1`.

> **Zakaj je privzeto uporabljen povratnozančni vmesnik:** spremljevalni vsebnik se izvaja brez možnosti `requirepass`,
> vsebniki aplikacije pa do njega dostopajo prek omrežja Compose (`redis:6379`) — objavljena vrata
> so namenjena samo orodjem na strani gostitelja (`redis-cli`, lokalni `npm run dev`). Objava na
> `0.0.0.0` bi neoverjen Redis izpostavila vsakemu gostitelju v vašem omrežju LAN. Če nastavite
> `REDIS_BIND_HOST=0.0.0.0`, dodajte tudi `--requirepass` v `command:` storitve.

**Onemogočanje Redisa** ni priporočljivo (omejevalnik hitrosti bo prešel na manj zmogljivo nadomestno rešitev v pomnilniku). Če ga morate onemogočiti, odstranite ali zakomentirajte blok storitve `redis:` v datoteki `docker-compose.yml` oziroma zmanjšajte število primerkov na nič:

```bash
docker compose up -d --scale redis=0
```

## Produkcijski Compose

Za izoliran produkcijski posnetek, ki se izvaja poleg razvojnega okolja, uporabite `docker-compose.prod.yml`.

| Podrobnost                     | Vrednost                                                                                      |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| Datoteka                       | `docker-compose.prod.yml`                                                                     |
| Privzeta vrata nadzorne plošče | `PROD_DASHBOARD_PORT=20130` (preslikana na notranja `${DASHBOARD_PORT:-20128}`)               |
| Privzeta vrata API-ja          | `PROD_API_PORT=20131`                                                                         |
| Slika                          | `omniroute:prod` (zgrajena iz cilja `runner-cli`)                                             |
| Vsebnik Redis                  | `omniroute-redis-prod` (`redis:8.6.2`, namenski nosilec `redis-prod-data`)                    |
| Podatkovni nosilec             | `omniroute-prod-data` (imenovan, ohranjen med ponovnimi gradnjami)                            |
| Preverjanja stanja             | `node healthcheck.mjs` + `redis-cli ping`, pri čemer je `depends_on` pogojen s stanjem Redisa |

Uporaba:

```bash
# Zgradite in zaženite produkcijski sklad
docker compose -f docker-compose.prod.yml up -d --build

# Spremljajte dnevnike v živo
docker compose -f docker-compose.prod.yml logs -f

# Ustavite in odstranite sklad (ohranite nosilce)
docker compose -f docker-compose.prod.yml down
```

Produkcijski sklad se izvaja vzporedno z razvojnim okoljem Compose (uporablja drugačna imena vsebnikov, vrata in nosilce), zato lahko lokalno nadaljujete razvoj, medtem ko produkcijsko okolje ostane zagnano.

## Stopnje Dockerfile

Repozitorij pošilja večstopenjsko datoteko Docker (`Dockerfile`). Izpostavljene so štiri stopnje; izberite pravi `target` za vaš primer uporabe.

| Oder          | Osnovna slika         | Namen                                                                                                                                                                                                                                                                   |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Namesti deps (`npm ci --legacy-peer-deps`) in zažene `npm run build` (Turbopack privzeto — glejte vire za čas gradnje spodaj)                                                                                                                                           |
| `runner-base` | `node:26-trixie-slim` | Proizvodni čas izvajanja s samostojnim izhodom Next.js.** Ni ponudnika CLIs v paketu.**                                                                                                                                                                                 |
| `runner-cli`  | `runner-base`         | Doda `git`, `docker.io`, `docker-compose` in globalni CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Izberite to za agentske poteke dela.**                                                                                                 |
| `runner-web`  | `runner-base`         | Doda Playwright + brskalnik Chromium (`--with-deps`) za ponudnike spletnih sej: `gemini-web`, `claude-web`, `claude-turnstile`.** To izberite, ko uporabljate te ponudnike** — navadna slika ne uspe ob času zahteve brez nje (glejte opombo `-web` pod kanali izdaje). |

Ročno sestavite določen cilj:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Viri časa gradnje

Trije argumenti gradnje nadzorujejo stroške stopnje `builder`. So samo v času gradnje — `OMNIROUTE_MEMORY_MB` (spodaj) je ločen gumb za čas izvajanja.

| Gradi arg                   | Privzeto | Učinek                                                                                         |
| --------------------------- | -------- | ---------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` gradi s spletnim paketom: nižji konični pomnilnik, počasnejši. `1` se odloči za Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | Zgornja meja kopice V8 (`--max-old-space-size`) za sproženi `next build`.                      |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | Viri `CIRCLE_NODE_TOTAL`; Naprej izpelje `workers = N - 1` za zbiranje podatkov strani.        |

`OMNIROUTE_BUILD_WORKERS` je tisti, ki se dvigne pri velikem graditelju, in tisti, na katerega se sumi, ko omejena zgradba umre** po** `✓ Compiled successfully`. Vsak podatkovni delavec strani je svoj proces, prav tako nadrejeni `next build` sam; reprodukcija VPS v živo (težava #7518) je izmerila vrh RSS vsakega procesa pri ~ 4,5 GB neodvisno od zastavice kopice `NODE_OPTIONS` (Turbopack prevaja v pomnilnik native/Rust zunaj kopice V8). Privzeta vrednost `2` (1 delavec →, skupaj 2 procesa) je prilagojena za 16 izvajalcev GB / 4 vCPU ki jih gosti GitHub, ki jih uporablja cevovod za objavo. Pri `8` (→ 7 delavcev) je temu izvajalcu zmanjkalo pomnilnika in buildkit ni opravil koraka z `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 delavca) še vedno ni ustrezal, potem ko je bil RSS na proces izmerjen neposredno namesto sklepanja. `tests/unit/docker-build-memory-budget.test.ts` izvede aritmetiko glede na izmerjeno številko in ne uspe, če kateri koli gumb preraste tekač.

Turbopack prevaja v izvorni pomnilnik Rust, ki živi** zunaj** kup V8, zato ga `OMNIROUTE_BUILD_MEMORY_MB` ne omejuje. Na gostitelju z zgornjo mejo pomnilnika gradnjo nato SIGKILLed izvede uničevalec OOM brez nikakršnega besedila napake — preprosto ustavi sredi `Creating an optimized production build`, kar se bere kot zastoj in ne kot zmanjkalo pomnilnika. Zato je `Dockerfile` privzeto nastavljen na webpack (`OMNIROUTE_USE_TURBOPACK=0`), za razliko od `npm run dev` / `npm run build`, kjer je Turbopack privzeta koda: goli `docker build .` brez argov za gradnjo (kar izvajajo Railway in drugi gostitelji z enim klikom) ne sme tiho umreti v gradilniku z omejenim pomnilnikom. Objavljene slike že izrecno prehajajo `OMNIROUTE_USE_TURBOPACK=0` v `docker-publish.yml`. Na gradilniku z veliko RAM se odločite za Turbopack za hitrejšo gradnjo:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` je omogočen, zato `next build` izvaja nadrejenega** in** delavski proces in vsak posebej spoštuje `OMNIROUTE_BUILD_MEMORY_MB`. Velikost stropa zabojnika naj bo približno dvakratna, ne enkrat.

Izmerjeno na tem drevesu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler       | Strop kontejnerja | Rezultat                         |
| ------------- | ----------------- | -------------------------------- |
| Turbopack     | 8 GiB / 16 GiB    | OOM-ubil pri obeh, tiho          |
| spletni paket | 8 GiB             | gradbeni delavec SIGKILLed       |
| spletni paket | 12 GiB            | uspelo, dosegel vrh pri 11,1 GiB |

### Privzete nastavitve časa izvajanja

Privzete vrednosti, ki jih izvozi `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Obnašanje pomnilnika v Docker:

- Slika nastavi `OMNIROUTE_MEMORY_MB=1024` in iz njega izpelje `NODE_OPTIONS=--max-old-space-size=1024`.
- Dejanski proces strežnika zažene samostojni zaganjalnik, ki prebere `OMNIROUTE_MEMORY_MB` in doda `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Vozlišče uporablja zadnjo ponovljeno vrednost `--max-old-space-size`, zato nastavitev `OMNIROUTE_MEMORY_MB` nadzoruje efektivno omejitev kopice Docker.
- Ker ga slika vedno nastavi, lastna nadomestna rešitev zaganjalnika, umerjena z RAM-om, nikoli ne velja pod Docker. Povečajte ga izrecno za delovno obremenitev (tabela spodaj). `2048` je še vedno premajhen za kodirnega agenta `/v1/responses`.

### Izvajalni čas RAM za agente za kodiranje

Privzeta vrednost 1 GiB Docker je nadstropje dashboard/light-chat, ne velikost proizvodnje. Dolga telesa `POST /v1/responses` (na stotine sporočil, na desetine orodij) med stiskanjem ohranijo več grafov v pomnilniku. Dve prekrivajoči se zahtevi za žeton ~ 3 MiB / ~ 750k sta prekinili V8 ob** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) in prav tako zadel 16 GiB cgroup OOM. Glej [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Velikost** cgroup `--memory` nad kopico** izvorni medpomnilniki —, SQLite in vmesni deli za stiskanje so zunaj V8.

| Delovna obremenitev                  | `OMNIROUTE_MEMORY_MB`   | Vsebnik / cgroup     | Opombe                                                                                      |
| ------------------------------------ | ----------------------- | -------------------- | ------------------------------------------------------------------------------------------- |
| Nadzorna plošča, en lahkoten klepet  | `1024` (privzeta slika) | ≥2 GiB               |                                                                                             |
| En kodirni agent (Claude/Codex/Grok) | `8192`                  | ≥10 GiB              | Tipična `/v1/responses` z eno sejo                                                          |
| Dva sočasna dolga `/v1/responses`    | `10240`–`12288`         | ≥12–16 GiB           | Izmerjena prekinitev V8 pri ~ 12 GiB                                                        |
| Trije + sočasni dolgi konteksti      | ne na enem procesu      | serialize / more RAM | Privzeti sprejem za težke kategorije je 1 med letom; dvig brez RAM ponovno uvede prekinitev |

`omniroute serve` na goli kovini kalibrira ~ 35 % RAM (vpet `[512, 4096]`), ko je `OMNIROUTE_MEMORY_MB`** nenastavljeno** . Docker vedno nastavi `1024`, tako da se kalibracija nikoli ne izvaja v uradni podobi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Kritične okoljske spremenljivke

Poleg privzetih vrednosti, dokumentiranih v [ENVIRONMENT.md](../reference/ENVIRONMENT.md), so pri izvajanju v okolju Docker najpomembnejše naslednje spremenljivke:

| Spremenljivka                 | Namen                                                                                                                                                                                                                                                                                                    | Privzeto                       |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Skupna skrivnost za most WebSocket. **Obvezna v produkciji** — nastavite jo na močan naključni niz.                                                                                                                                                                                                      | ni nastavljeno (treba navesti) |
| `REDIS_URL`                   | Povezovalni niz za omejevalnik hitrosti / zaledni sistem predpomnilnika                                                                                                                                                                                                                                  | `redis://redis:6379`           |
| `REDIS_PORT`                  | Vrata na gostiteljski strani za priloženi vsebnik Redis                                                                                                                                                                                                                                                  | `6379`                         |
| `REDIS_BIND_HOST`             | Gostiteljski vmesnik, na katerem so objavljena vrata priloženega vsebnika Redis (povratna zanka, razen če dodate AUTH)                                                                                                                                                                                   | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Pot gostitelja, vpeta v profil `cli` na `/workspace/omniroute` za poteke dela samodejnega posodabljanja                                                                                                                                                                                                  | `.` (trenutni imenik)          |
| `OMNIROUTE_MEMORY_MB`         | Omejitev kopice Node med izvajanjem za samostojni strežnik Docker; preglasi zgornjo privzeto vrednost slike. Agenti za programiranje: `8192`+ (glejte [pomnilnik RAM med izvajanjem](#runtime-ram-for-coding-agents)).                                                                                   | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | Preglasi izpostavljena vrata za nadzorno ploščo (20128) in API (20129)                                                                                                                                                                                                                                   | `20128` / `20129`              |
| `APP_BIND_HOST`               | Gostiteljski vmesnik, na katerem docker-compose objavi vrata nadzorne plošče/API/live-WS. Če je `REQUIRE_API_KEY=false` (privzeto), `0.0.0.0` izpostavi anonimni posredniški strežnik `/v1` omrežju LAN — obseg razširite le z `REQUIRE_API_KEY=true` ali s povratnim posredniškim strežnikom pred njim. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | Gostiteljski vmesnik, na katerem docker-compose objavi stranski vsebnik `cliproxyapi` — njegov podatkovni nosilec vsebuje poverilnice ponudnika.                                                                                                                                                         | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | Imenik, ki ga pregledovalnik vtičnikov med izvajanjem prebere in vanj namešča vtičnike. Nastavite ga, ko so vtičniki vpeti z vezavno vpeto točko: privzeta vrednost sledi `HOME`, ki ga slika morda ne izvozi.                                                                                           | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | Podpot URL-ja, ko je aplikacija objavljena za povratnim posredniškim strežnikom (npr. `/omniroute`)                                                                                                                                                                                                      | _(prazno = korenska pot)_      |
| `NEXT_PUBLIC_BASE_URL`        | Javni izvor brskalnika, vključno s podpotjo (npr. `https://host/omniroute`)                                                                                                                                                                                                                              | ni nastavljeno                 |
| `PROD_DASHBOARD_PORT`         | Vrata nadzorne plošče na gostiteljski strani za `docker-compose.prod.yml`                                                                                                                                                                                                                                | `20130`                        |
| `CLIPROXYAPI_PORT`            | Vrata na gostiteljski strani za stranski vsebnik `cliproxyapi`                                                                                                                                                                                                                                           | `8317`                         |

## Povratni proxy na podpoti (Traefik / nginx)

Next.js `basePath` je preveden v samostojni sveženj. OmniRoute zabeleži pečeno vrednost v datoteko sentinel v korenu aplikacije (napisano med `npm run build`; prebere `scripts/docker/ensure-docker-base-path.mjs`) in jo primerja z `OMNIROUTE_BASE_PATH`, ko se vsebnik zažene. Ko se razlikujejo in je bila slika zgrajena za koren domene, vstopna točka prepiše samostojne manifeste, vdelane literale `basePath`/`assetPrefix` (naslednjih 16 upodobi SSR sredstvo URLs iz samega `assetPrefix` — popravljalec zrcali podpot vanj), pečeno sredstvo `/_next/static` URLs (manifesti sklicevanja odjemalca, uvozi medijev, vnaprej upodobljene strani z napakami) in odjemalca `process.env` shim pred zagonom `node dev/run-standalone.mjs`.

### Ustvari sestavo (priporočeno)

Nastavite obe spremenljivki v `.env`, nato znova sestavite, da se slika in izvajalno okolje ujemata:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` posreduje `OMNIROUTE_BASE_PATH` kot Docker build-arg in kot spremenljivko izvajalnega okolja.

### Vnaprej zgrajena korenska slika + izvajalna podpot

Objavljene slike `cheaperinference/omniroute:*` so izdelane za koren domene. Še vedno lahko nastavite `OMNIROUTE_BASE_PATH` med izvajanjem; vsebnik popravi sveženj enkrat ob zagonu. Seznanite ga z ustreznim javnim izvorom:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurirajte obratni proxy za posredovanje** poln** zunanja pot (ne odstranjujte predpone). Traefik bi moral usmeriti `PathPrefix(`/omniroute `)` v vsebnik brez `StripPrefix`, tako da Next.js prejme `/omniroute/...` in streže sredstva iz `/omniroute/_next/...`.

Zdravstveni pregled Docker preverja končno točko življenjskega cikla lahkega `/healthz` s predpono aktivno `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` ostaja na voljo za diagnostiko human/dashboard ; če želite vsebnik HEALTHCHECK usmeriti nazaj nanj (na primer za globoko uveljavljanje zdravja), nastavite `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Ta pot je a** globoko** preverite (DB + povzetek spremljanja) — primerno za Docker redko `HEALTHCHECK` če se ponovno odločite, vendar** ne** za intervale Kubernetes `livenessProbe`.

Za orkestratorje (Kubernetes, Nomad itd.):

| Sonda                 | Raje                                                                   | Izogibajte se                                                    |
| --------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Živahnost             | HTTP `GET /livez` ali TCP na glavnih vratih (`PORT`, privzeto `20128`) | `/api/monitoring/health` kot živahnost                           |
| Pripravljenost        | HTTP `GET /healthz`                                                    | Kratke časovne omejitve, ki zanko dogodkov obravnavajo kot mrtvo |
| Globoka / črna škatla | `/api/monitoring/health`                                               | —                                                                |

`/healthz` poroča o življenjskem ciklu procesa (`ok` / `starting` / `stopping`). `/livez` je samo procesno živ (200, kadar se lahko izvajalec zažene; ne čaka na pripravljenost). Oba se še vedno izvajata v isti zanki dogodkov Node kot obravnavanje zahtev, zato lahko katalog ali stiskanje, vezano na CPE, povzročijo zamudo — busy ≠ dead. Raje TCP liveness, če sonde HTTP potečejo. Celotno vodenje sonde: [Vodnik za spremljanje — Priporočila sonde Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose with Caddy (HTTPS Auto-TLS)

OmniRoute je mogoče varno izpostaviti s Caddyjevim samodejnim zagotavljanjem SSL. Zagotovite, da zapis DNS A vaše domene kaže na IP vašega strežnika.

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

Caddy nastavi standardne glave za posredovanje za zabojnik navzgor. OmniRoute uporablja `NEXT_PUBLIC_BASE_URL` kot kanonični javni izvor za povratne klice OAuth in ustvarjene javne povezave; overjeno pisanje na nadzorno ploščo uporablja zahteve istega izvora in zaščito CSRF vezano na sejo. Omogočite `OMNIROUTE_TRUST_PROXY` samo za napredne uvedbe, kjer namenoma želite, da OmniRoute izpelje javni izvor iz zaupanja vrednih posredovanih glav namesto izrecne konfiguracije.

## Cloudflare hitri tunel

Podpora na nadzorni plošči za uvedbe Docker vključuje en klik**Cloudflare hitri tunel** na `Dashboard → Endpoints`. Prvi omogoči prenose `cloudflared` samo, ko je to potrebno, zažene začasni tunel do vaše trenutne končne točke `/v1` in prikaže ustvarjeni `https://*.trycloudflare.com/v1` URL neposredno pod vašim običajnim javnim URL.

Plošče tunela končne točke (Cloudflare, Tailscale, ngrok) je mogoče prikazati ali skriti pred `Settings → Appearance` brez spreminjanja aktivnega stanja tunela.

### Tunnel Notes

- Quick Tunnel URLs je začasen in se spremeni po vsakem ponovnem zagonu.
- Hitri tuneli se po ponovnem zagonu OmniRoute ali vsebnika ne obnovijo samodejno. Po potrebi jih znova omogočite na nadzorni plošči.
- Upravljana namestitev trenutno podpira Linux, macOS in Windows na `x64` / `arm64`.
- Upravljani hitri tuneli privzeto uporabljajo HTTP/2 transport, da se izognejo hrupnim opozorilom medpomnilnika QUIC UDP v omejenih vsebniških okoljih. Nastavite `CLOUDFLARED_PROTOCOL=quic` ali `auto`, če želite drugačen prevoz.
- Docker slike združijo sistemske korenine CA in jih posredujejo upravljanemu `cloudflared`, ki se izogne napakam zaupanja TLS, ko se tunel zažene znotraj vsebnika.
- Nastavite `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` če želite, da OmniRoute namesto prenosa uporablja obstoječo dvojiško datoteko.

## Oznake slik

| Slika                        | Oznaka   | Velikost | Opis                                                    |
| ---------------------------- | -------- | -------- | ------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250 MB | Najvišje** objavljeno** stabilen SemVer (ne git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250 MB | Pripni ta razred oznake za GitOps                       |

Iste slike so objavljene v treh repozitorijih z enakimi izvlečki za vsako arhitekturo: `cheaperinference/omniroute` (Docker Hub, organizacija Cheaper Inference, od 3.8.53 naprej), `ghcr.io/cheaper-inference/omniroute` in stari `diegosouzapw/omniroute`, ki hrani svojo zgodovino umika in še vedno prejme vsako izdajo. Obstoječe uvedbe `diegosouzapw/omniroute` se nenehno posodabljajo; zamenjava imena slike ni obvezna. Spodnji kanal pred izdajo `:next` / `:next-web` je objavljen samo v `diegosouzapw/omniroute` in GHCR.

Manifest za več platform: izvorni `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker samodejno izbere ustrezno arhitekturo; prenesite `--platform linux/amd64`, če morate vsiliti emulacijo AMD64 na gostiteljih ARM.

### Sprostite kanale

OmniRoute objavlja ločene kanale Docker za stabilne izdaje, aktivno testiranje veje izdaje in razvojne gradnje.

| Kanal                           | Vir                                     | Spremenljivost                  | Priporočena uporaba                                                                                                   |
| ------------------------------- | --------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | izdaja Signed/versioned                 | Nespremenljivo                  | Produkcijske uvedbe, ki določajo natančno izdajo                                                                      |
| `:latest` / `:latest-web`       | Najvišje** objavljeno** stabilen SemVer | Spremenljiv stabilni kazalec    | Sledi stabilnim izdajam** po** objavo SemVer opravi —** ne** sledenje `main` ali neobjavljenim `release/v*` povezavam |
| `:next` / `:next-web`           | Trenutna privzeta veja `release/v*`     | Spremenljiv kazalec pred izdajo | Testiranje popravkov, ki so pristali na veji aktivne izdaje, vendar še niso v stabilni izdaji                         |
| `:main` / `:main-web`           | podružnica `main`                       | Spremenljiv razvojni kazalec    | Samo razvojno in integracijsko testiranje                                                                             |

#### Ponudniki spletnih sej: slike `-web`

Vsak zgornji kanal deluje kot oznaka `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), zgrajena iz stopnje `runner-web` — iste slike plus Playwright in brskalnik Chromium. Pošilja se navadna slika** brez** krom; `gemini-web`, `claude-web` in `claude-turnstile` ga potrebujejo.

Napaka je odložena, ne ob času zagona: ti ponudniki navedejo svoje modele in se na nadzorni plošči prikažejo kot povezani, in samo prva zahteva ne uspe z

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Če uporabljate te ponudnike, potegnite oznako `-web` kanala, na katerem ste že — nič drugega se ne spremeni. Pri namestitvi npm/CLI (brez slike Docker ) je enakovreden manjkajoči del dvojiška datoteka brskalnika: zaženite `npx playwright install chromium` na gostitelju.

#### Uporaba kanala pred izdajo

Kanal `next` se znova zgradi ob vsakem pritisku na trenutno privzeto vejo `release/v*` in je objavljen za AMD64 in ARM64. Starejše vzdrževalne veje ga ne morejo prepisati. Kanal zagotavlja sliko, ki jo je mogoče izvleči, za popravke, ki so bili združeni v vejo aktivne izdaje, preden se izreže naslednja stabilna oznaka.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Za Docker Compose preglasite slikovno oznako, ki jo uporablja izbrani profil, nato povlecite in znova ustvarite storitev:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Varnost in povrnitev nazaj

`next` je plavajoči kanal pred objavo. Lahko se spremeni ob katerem koli pritisku na vejo za aktivno izdajo in je** ni podprt za produkcijsko uporabo** . Pripnite izvleček slike med ocenjevanjem določene zgradbe:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Pred testiranjem naredite varnostno kopijo podatkovnega nosilca OmniRoute ali podatkovnega imenika, nameščenega na povezovanje. Če se želite vrniti nazaj, obnovite predhodno uporabljeno stabilno različico ali predelajte in znova ustvarite vsebnik:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Zgradba veje za izdajo nikoli ne more premakniti `latest`; samo primerna stabilna semantična različica lahko spodbuja stabilni kazalec. Slike `next` ohranijo pregled slike za izdajo in blokirajo vrata KRITIČNE ranljivosti.

**`latest` ni garancija valute za git.** Združeni popravki na `main` ali na aktivni veji `release/v*` so** ne** v `:latest`, dokler ni objavljena stabilna slika SemVer in opravilo objave ne promovira `:latest` (isti izvleček kot ta SemVer). Če je `latest` videti zamrznjen, medtem ko GitHub že prikazuje popravek, povlecite `:next`, da preizkusite vejo izdaje, ali počakajte na oznako SemVer.

| hočeš                                                                       | Uporaba                              |
| --------------------------------------------------------------------------- | ------------------------------------ |
| GitOps / proizvodnja, ki ne sme zanesti                                     | Pripni `:X.Y.Z` (ali povzetek slike) |
| Sledite objavljenim hlevom in sprejmite ponovno ustvarjanje ob vsaki izdaji | `:latest`                            |
| Preizkusite neobjavljene obveznosti `release/v*`                            | `:next` (ni proizvodnja)             |
| Test `main`                                                                 | `:main` (ni proizvodnja)             |

## Posodobitve nadzorne plošče v Dockerju

Vsebnik iz objavljene slike ne more zamenjati samega sebe. Ko OmniRoute zazna, da se izvaja znotraj
vsebnika (brez delovne kopije `.git` in ne kot namestitev npm), pasica za posodobitve na domači nadzorni plošči namesto navodil za npm/git prikaže
ukaz, ki ga je treba izvesti na gostitelju, skupaj z gumbom za kopiranje:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Ime storitve določa `AUTO_UPDATE_SERVICE` (privzeto `omniroute`, storitev v
`docker-compose.selfhost.yml`). `pull` posodobi samo plavajočo oznako (`latest`, `next`); pri pripeti
oznaki `:X.Y.Z` morate najprej urediti oznako.

### Posodobitve z enim klikom prek sprožilne datoteke na gostitelju

Če želite ohraniti delovanje možnosti **Posodobi zdaj**, ne da bi priklopili `/var/run/docker.sock` (kar vsebniku
omogoči korenski dostop do gostitelja — glejte zgornje opozorilo za profil `cli`), v storitvi
OmniRoute nastavite `DOCKER_UPDATE_TRIGGER_FILE` in na gostitelju zaženite nadzornik:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Pot mora biti znotraj `DATA_DIR` (relativne vrednosti se razrešijo glede nanj); vse drugo je
zavrnjeno. Možnost **Posodobi zdaj** nato v to datoteko zapiše `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }`,
vrne odgovor `202`, nadzorna plošča pa preverja `/api/system/version`, dokler ni nova različica
aktivna, nato pa se znova naloži. OmniRoute v tem načinu nikoli ne izvede lupinskega ukaza ali ukaza Docker.
Kot pri vsakem dejanju posodobitve je zahteva sprejeta samo od odjemalcev iz povratne zanke/LAN-a.

Podatkovni imenik, priklopljen z vezanim priklopom, gostitelju zagotavlja stabilno pot za spremljanje. Primeri enot `systemd`
(prilagodite `/srv/omniroute` imeniku, ki vsebuje vašo datoteko compose in `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Spremljaj zahteve za posodobitev z nadzorne plošče OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Prenesi in znova ustvari vsebnik OmniRoute

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

Storitev pred prenosom odstrani zahtevo, da se neuspešen zagon ne bi ponavljal v zanki. Brez
`DOCKER_UPDATE_TRIGGER_FILE` nadzorna plošča ohrani ročni postopek z ukazom.

## Razpoložljivost: privzeti SQLite je ena replika

Stock Docker / Kubernetes OmniRoute je** en proces vozlišča + en zapisovalnik SQLite** . Visoka razpoložljivost je** ni podprto** na to topologijo.

| Omejitev                                         | Posledica                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Samski pisatelj                                  | naredi** ne** zagnati več replik za isto datoteko SQLite. To pokvari DB.                                                                                                                                                                                                                                  |
| Znova ustvari / znova zaženi / uniči HEALTHCHECK | **Popolni izpad** SSE med letom, sej nadzorne plošče in stanja v pomnilniku. Vsaka povezana stranka odpade. Nove zahteve med oknom prazne končne točke dobijo povratni proxy**`502 Bad Gateway: Unknown error`** , ne OmniRoute JSON — odjemalci tega ne morejo razlikovati od napake ponudnika (#11015). |
| Ista zanka dogodkov kot `/healthz`               | Zaseden katalog ali stiskanje lahko zakasnijo sonde; kratek čas, nato znova zažene** samo** replika.                                                                                                                                                                                                      |

**Matrica sonde** (glejte tudi [priporočila sonde Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sonda            | Tarča                                                      | Ne uporabljajte                                                  |
| ---------------- | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| Živahnost        | TCP na `PORT` (privzeto `20128`) ali mehko HTTP `/healthz` | `/api/monitoring/health`                                         |
| Pripravljenost   | HTTP `GET /healthz`                                        | Kratke časovne omejitve, ki zanko dogodkov obravnavajo kot mrtvo |
| Globoko / ljudje | `/api/monitoring/health`                                   | Avtomatizirano kubelet liveness                                  |

**Nadgradnje:** pričakujte, da bo vsaka seja padla. Izčrpajte stranke, če lahko; na privzeti SQLite ni tekoče posodobitve. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` bo nadomestil tudi edini postopek, ko je vsebnik nezdrav – enak radij eksplozije.

Pripravljeni manifesti in grafikon Helm so v živo v `deploy/kubernetes/` in `deploy/helm/omniroute/` — glejte [vodnik za uvajanje Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Delček Kubernetes za a** ena replika** (Potrebno je ponovno ustvarjanje; ne dvignite `replicas` za eno datoteko SQLite ):

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

`preStop` spanje omogoča, da kube spusti storitvene končne točke pred SIGTERM torej** novo** promet ustavi proces umiranja. `/v1/responses` SSE med letom se izčrpa do `SHUTDOWN_TIMEOUT_MS` (privzeto 30 s) prek težkih vstopnih zakupov (#11015). Nove zahteve, ki še vedno dosežejo proces, dobijo `503` + `Retry-After: 5`. Vrzel Znova ustvari prazno končno točko, dokler zamenjava ni pripravljena, ostaja močan izpad — to je topologija SQLite, ne napačna konfiguracija sonde.

Zunanji Postgres /večzapisovalni HA je** ne** dokumentirana zaloga. Če potrebujete HA, obdržite eno repliko ali zaženite topologijo, ki jo je projekt preizkusil in dokumentiral ločeno. Delo Postgres/MySQL živi v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Dokler se to ne pošlje, je edini podprt način razmnoževanja** velik** Zmogljivost `/v1/responses` je N neodvisnih procesov (naslednji razdelek), ne `replicas > 1` na enem nosilcu.

## Razširitev: N neodvisnih procesov

### lastništvo rotacije žetona Codex

Kopije enega računa Codex ne smejo neodvisno porabiti njegovega žetona za osvežitev za enkratno uporabo. Na primerkih, ki uporabljajo samo sinhronizirane poverilnice, nastavite `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Pustite ga nenastavljenega pri lastniku ene rotacije. Vsak proces še vedno potrebuje svoj `DATA_DIR`; ta možnost niti ne deli SQLite niti ne zagotavlja sinhronizacije žetonov ali porazdeljenega zaklepanja.

Pasivni primerek ponovno prebere povezavo, ko je potrebna osvežitev, in sprejme samo drugačen žeton dostopa, ki še ni potekel. V nasprotnem primeru je osvežitev onemogočena, ne da bi potekla ali deaktivirala povezavo ali štela napako prekinitve osvežitve. Resnične napake pri preverjanju pristnosti navzgor še vedno uporabljajo običajno obračunavanje napak, eksponentno ohlajanje in običajno napako odjemalca; deaktivacija računa ostane trajna. Sinhronizirajte zasukane žetone lastnika, preden žetoni za dostop potečejo (privzeta prednost proaktivne osvežitve je pet minut) ali znova uvozite datoteko za preverjanje Codex. Pasivni uvozi shranijo dobavljene žetone, ne da bi jih preverili na končni točki žetona. Ročna osvežitev dashboard/API vrne `409 refresh_disabled`; nove prijave OAuth so nespremenjene. Glej [referenco okolja](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

One Node process is **one V8 heap**. Two overlapping ~3 MiB / ~750k-token coding-agent `POST /v1/responses` (RTK + Caveman) abort that heap at ~12 Gi (`FATAL ERROR: Reached heap limit`) and can OOM a 16 Gi cgroup. See [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). That measurement is a **memory-budget** warning, not a product hard-max of two concurrent long `/v1/responses`. Heavyweight chat admission is gated by an auto-derived ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) sized from that same V8/cgroup ceiling — overriding it upward (or setting the legacy `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap) on an already-sized process reintroduces the abort. Small chats, `/healthz`, `/v1/models`, and MCP are **not** in that cap.

### En proces: več kot dva dolga `/v1/responses`

A** zdravo** proces (kup pod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, privzeto `0.75`)** maj** zaženite več kot dva hkratna dolga `POST /v1/responses` ko je proračun v bajtu za celoten proces (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) še dovolj prostora. Telesa na ali nad `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (privzeto 256 KiB) sprejmejo enako težki zakup kot strukturno težke zahteve in uporabljajo isti [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Na desetine hkratnih dolgih odjemalcev SSE (operaterji pogosto potrebujejo 40–50) je a** pomnilniški proračun** vprašanje — kopica velikosti + primary/headroom reže + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ni stroga omejitev izdelka »največ 2«. Kopica pod pritiskom še vedno odpade z `503` ki ga je mogoče znova poskusiti, tako da se #7849 ne vrne.

Za** množijo kupe** (neodvisni stari prostori V8)** danes** :

| naredi                                                                                                                                                             | ne                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Teči** N containers/pods** , vsak s svojim** lasten** `DATA_DIR` / glasnost                                                                                        | Nastavite `replicas > 1` proti eni datoteki SQLite                                    |
| Velikost težka med letom + zdrav prostor za višino iz kopice / proračun v bajtih med letom; 1–2 je konzervativna privzeta vrednost #7849, ne trdi najvišji izdelek | Enemu procesu dajte 8 × RAM in neomejeno zgornjo mejo števila                         |
| Izbirno: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` za** skupni števci kvot**                                                                            | Obravnavajte Redis kot skupno SQLite — ni                                             |
| Podvojene skrivnosti ponudnika v vsako instanco (ali sprejmite particionirane nadzorne plošče)                                                                     | Pričakujte eno nadzorno ploščo/en dnevnik klicev v vseh instancah                     |
| Spredaj s katerim koli izravnalnikom obremenitve; dovolj je sticky z ključem API ali sejo                                                                          | Zahtevajte vmesno programsko opremo, specifično za prodajalca, ki se zaveda velikosti |

Afiniteto med sejo in računom lahko delite tudi prek Redis: nastavite `OMNIROUTE_SESSION_AFFINITY_STORE=redis` in `REDIS_URL` za vsak proces z enakim `REDIS_KEY_PREFIX` in pozitivno nastavitvijo `sessionAffinityTtlMs`. Zatiči razrešijo zgoščene identitete uporabniških računov v primerno lokalno povezavo vsakega procesa, zato računom OAuth z ujemajočimi se metapodatki o identiteti ni treba imeti ujemajoče se povezave IDs. Znane identitete računov imajo prednost pred protislovnimi lokalnimi IDs pri ločljivosti pin in varovanem izselitvi; zapisi brez identitete (ali klicatelji izselitve brez identitete) ohranijo zapuščino ID guard. Računi brez stabilne identitete uporabe še vedno zahtevajo ujemanje IDs. napake Redis ali klici, ki presegajo 100 ms, se vrnejo na lokalni SQLite. Vsaka shramba afinitete Redis omeji odprte operacije na 8, zaobide Redis takoj, ko je polna, in sprosti reže šele, ko se osnovno delo poravna, ne ob roku klicatelja. Med izpadom Redis ni skupne resnice: vsak primerek se vrne k svoji lokalni afiniteti, seje se lahko znova pripnejo enkrat na primerek in primerki se lahko razlikujejo. Lepljivost ponovno konvergira skozi Redis, ko si opomore. Časovna omejitev omejuje čakanje in ne poslanega EVAL, ki lahko pristane po nadomestnem delu. Zapisi pri usmerjanju primerjajo natančno vrednost, opaženo z odločitvijo o usmerjanju, ne novo branje časa mutacije; opazovano zgrešeno ali nadomestno opazovanje SQLite se primerja z odsotnim ključem Redis. Zastareli zatiči so zamenjani v enem CAS, tako da pozen ukaz ne more nadomestiti ali izbrisati novejšega, drugačnega zatiča. Redis bere atomsko vrne vrednost in preostali strežnik TTL; pozitiven PTTL (ali brez izteka) določa živost, ne pisateljev časovni žig JSON ali bralčeva ura. Lokalni posnetki preslikajo preostali TTL v lokalni rok; obstoječi ključi JSON ostanejo berljivi in njihovi neobdelani bajti se ohranijo za CAS. Redis je edini vir resnice, medtem ko odgovarja. Potrjene skupne vstavitve, dotiki in izbrisi odstranijo lokalni vnos, nikoli ga ne namestijo ali osvežijo. SQLite na poti Redis vsebuje samo lastne nadomestne odločitve tega primerka zaradi napak Redis, časovnih omejitev ali nasičenosti sprejema, omejeno na TTL kot prej. Manjkajoči lokalni pin ob kasnejšem izpadu stane en nov izbor (en zgrešen pozivni predpomnilnik), ne napačen ali izločen račun. Zavrnjeni upserti vrnejo zmagovalca v skupni rabi in njegov preostali TTL atomsko: običajni izbor ponovno preveri preslikani lokalni rok in uporabi še vedno živega upravičenega zmagovalca, pri čemer se dotakne uporabe in beleženja za ta račun brez drugega pisanja v skupni rabi. Če ni na voljo, izbira obdrži lokalnega kandidata, pusti pin v skupni rabi nespremenjen in odda eno sporočilo o odpravljanju napak. Zavrnjen CAS ne piše SQLite; Redis napake, časovne omejitve ali nasičenost sprejema namesto tega uporabi obstoječo lokalno operacijo. Če odgovor poslane mutacije prispe po časovni omejitvi (sprejeto, zavrnjeno ali napaka), sinhrona primerjava in brisanje natančnih serializiranih vrednosti odstrani samo bajtno identično nadomestno vrstico časovne omejitve. Med to primerjavo in brisanjem ni čakanja; novejši zapis izpada je ohranjen. Varovana izselitev odstrani lastni lokalni pin neuspešnega računa, tudi ko je Redis izključen, in ga znova očisti po potrjeni skupni izselitvi. Čakajoči prejšnji odgovori v skupni rabi ne morejo obnoviti izločenega lokalnega žebljička, ker skupni uspehi nikoli ne napišejo SQLite. Kasnejši nadomestni izpad lahko znova pripne račun; pozneje sprejeto skupno pisanje obstaja samo v Redis. Redis zgreši, ne posvetujte se z lokalnim rezervnim stanjem. Ko je gonilnik izklopljen, na novo izbrani keglji ohranijo staro obliko štirih polj SQLite JSON ; samo usmerjanje Redis doda zgoščeno identiteto računa. Vnaprej pridobljeni žebljički se ponovno preverijo na meji njihove veljavnosti. Izbira brez zakupa Redis ponovno prebere trgovino, vendar lahko sinhrono načrtovanje zakupa še vedno uporablja žebljiček, izločen med vnaprejšnjim prenosom in načrtovanjem (sprejeto okno najboljšega napora). Obveza zakupa ne more preklopiti med računi po trajni zahtevi: pri zavrnjeni vstavitvi obdrži zahtevanega kandidata samo za to zahtevo in pusti skupnega zmagovalca nedotaknjenega, tako da je dogovor med primerki omejen na to pot. Preostali del tabele še vedno velja: to ne deli lepljivosti kombinirane seje, izvornih žebljičkov Codex turn, semaforjev računov, zaklepanja, omejitev porabe, konfiguracije ali dnevnikov klicev.

Strojna oprema: sočasni dolgi `/v1/responses` na primerek je a** pomnilniški proračun** vprašanje (kup + inflight-byte / #10110). `N` neodvisen `DATA_DIR` s še vedno pomnožuje kopice: gostitelj RAM mora pokrivati `N × cgroup`, ne pa "en 16 Gi pod z N = 8." Nikoli ne `replicas > 1` v eni datoteki SQLite.

Sestavite skico (dva kupa, dva zvezka — ne `deploy.replicas: 2`):

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

Gostota med postopkom (stiskanje iz izolata HTTP ) je [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Ena logična gruča v trajnem stanju v skupni rabi je [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionalne napake Gemini znotraj Docker

Google AI Studio / Gemini API lahko vrne HTTP 400 z FAILED_PRECONDITION in `User location is not supported for the API use.` Uspešna zahteva na gostitelju ne dokazuje, da vsebnik uporablja isto izhodno pot. Naročanje DNS, povezljivost IPv4/IPv6, usmerjanje VPN in konfigurirani posredniki se lahko razlikujejo. Preverite [regije, ki jih podpira Google,](https://ai.google.dev/gemini-api/docs/available-regions) kot tudi dejansko pot povezave; sama ta napaka ne identificira slabega ključa API.

### Dajte prednost proxyju, specifičnemu za povezavo

Uporabite [konfiguracijo proxyja za posamezno povezavo](../ops/PROXY_GUIDE.md#4-level-proxy-system) OmniRoute za prizadeto povezavo Gemini, nato ponovite** Testna povezava** in majhna prošnja za isti model. To ohranja spremembo usmerjanja v obsegu te povezave. Preverite, ali je proxy dosegljiv iz vsebnika in ali ga povezava res izbere. Sprememba poti ne zagotavlja regionalne upravičenosti navzgor po toku.

### Primerjajte gostiteljsko in vsebniško omrežje

Pri primerjavi overjenih rezultatov naj bodo ključ, model in zahteva enaki; nikoli ne prilepite poverilnic, proxy gesel ali celotnih avtorizacijskih glav v težavo. Najprej preglejte, katere družine naslovov ponuja razreševalec OS, z uporabo istega ukaza na gostitelju in znotraj vsebnika:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Zamenjajte `omniroute` s storitvijo, ki jo izvajate (na primer `omniroute-web`). Ti ukazi natisnejo družine naslovov brez poverilnic ali naslovov IP. Vrnjeni `6` prikazuje le rezultat IPv6 DNS : prikazuje** ne** dokazati uporabno pot IPv6 ali dostop API. Kjer je nameščen `curl`, primerjajte `curl -4 -I https://generativelanguage.googleapis.com` z `curl -6 -I https://generativelanguage.googleapis.com` v obeh okoljih. Odgovor HTTP dokazuje povezljivost za to sondo, tudi če gre za nepreverjeno napako; samo overjena zahteva modela preizkusi primernost Gemini.

### Alternativa na ravni gostitelja: delujoča politika IPv6 in razreševalca

Poročevalec [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) je obnovil dostop v svojem okolju tako, da je omogočil vsebnik IPv6 in spremenil izbiro naslova glibc. Obravnavajte to kot alternativo, specifično za okolje. Potrdite delujoč gostitelj IPv6, vsebnik egress/routing in pravila požarnega zidu, preden prilagodite nastavitve razreševalnika. Zasebni naslov ULA sam po sebi ne vzpostavi javne povezave IPv6.

Za storitve, ki so že povezane s privzetim omrežjem Compose, ta fragment omogoča IPv6 v tem omrežju; ohranite preostalo storitev, vrata, količine in konfiguracijo:

```yaml
networks:
  default:
    enable_ipv6: true
```

Za imenovano omrežje ga omogočite v omrežju, ki se mu storitev dejansko pridruži. Docker lahko dodeli podomrežje ULA ; izberite eksplicitno podomrežje, ki se ne prekriva, le kadar to zahteva vaše omrežje. Glejte omrežne [možnosti](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) [Docker IPv6](https://docs.docker.com/engine/daemon/ipv6/) in Compose networking.

Na a** slika, ki temelji na glibc** , `/etc/gai.conf` lahko spremeni izbiro naslova. Trenutni repozitorij Dockerfile uporablja Debian; slike po meri, ki temeljijo na musl, nimajo tega mehanizma. Sporočena prilagoditev spremeni oznako ULA iz `label fc00::/7 6` v `label fc00::/7 1`. Začnite s celotno tabelo pravilnikov slike in ohranite njene druge vnose: dodajanje vnosa `label` ali `precedence` nadomesti to privzeto tabelo, zato datoteka, ki vsebuje samo spremenjeno vrstico, ne zadošča. [Referenca konfiguracije glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf) dokumentira to semantiko. Povežite pregledano datoteko samo za branje na `/etc/gai.conf` in znova ustvarite storitev, da jo uporabite.

To spremeni izbiro naslova OS za** ves izhodni promet v tem vsebniku** . Ne prisili vsake aplikacije, da izbere IPv6: pomembna sta tudi vrstni red DNS in izbira povezave Node. Zlasti `--dns-result-order=ipv4first` daje prednost IPv4 in ni zdravilo za napako IPv4-only. Glejte [Naročanje vozlišča DNS](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Po vsaki spremembi na ravni gostitelja znova preizkusite Gemini in druge ponudnike. Za vrnitev nazaj odstranite nastavek `gai.conf` po meri, obnovite prejšnjo omrežno konfiguracijo in znova ustvarite prizadeti service/network med vzdrževalnim obdobjem. Ponovno ustvarjanje omrežja lahko prekine druge vsebnike, ki so nanj priključeni; ne izbrišite obstojnega obsega podatkov.

## Pomembne opombe

- **Način WAL za SQLite:** Ukazu `docker stop` je treba omogočiti, da se dokonča, da lahko OmniRoute zapiše najnovejše spremembe nazaj v `storage.sqlite` prek kontrolne točke. Priložene datoteke Compose že nastavijo 40-sekundno obdobje za ustavitev. Če sliko zaganjate neposredno, ohranite `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Nastavite na `true`, če se rutinske varnostne kopije oziroma varnostne kopije pred zapisovanjem upravljajo zunanje. Selitve obstoječe podatkovne zbirke še vedno zahtevajo lasten trajen varnostni posnetek in zaščito pred množično selitvijo.
- **Trajnost podatkov:** Vedno priklopite nosilec na `/app/data`, da ohranite podatkovno zbirko, ključe in konfiguracije med ponovnimi zagoni vsebnika.
- **Konfiguracija vrat:** Če želite spremeniti privzeta vrata `20128`, preglasite okoljsko spremenljivko `PORT`.

## Glejte tudi

- [Vodnik za uvedbo v VM](../ops/VM_DEPLOYMENT_GUIDE.md) — nastavitev VM + nginx + Cloudflare
- [Vodnik za uvedbo v Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — uvedba v Fly.io
- [Konfiguracija okolja](../reference/ENVIRONMENT.md) — popoln pregled `.env`
