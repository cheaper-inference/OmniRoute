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

## Hiter zagon

> **Samostojno gostovanje z enim ukazom?** Glejte
> [Vodnik za samostojno gostovanje](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (objavljena slika +
> Redis, dostop samo prek povratne zanke, brez izbire profila). Spodnji hitri zagon je
> način z enim vsebnikom za uporabnike, ki Redis že izvajajo drugje.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Z datoteko okolja

```bash
# Najprej kopirajte in uredite .env
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

## Faze Dockerfile

Repozitorij vključuje večstopenjski Dockerfile (`Dockerfile`). Na voljo so štiri faze; izberite ustrezni `target` za svoj primer uporabe.

| Faza          | Osnovna slika         | Namen                                                                                                                                                                                                                                                                                        |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Namesti odvisnosti (`npm ci --legacy-peer-deps`) in zažene `npm run build` (privzeto uporablja Turbopack — glejte spodnji razdelek Viri med gradnjo)                                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | Produkcijsko izvajalno okolje s samostojnim izhodom Next.js. **Orodja CLI ponudnikov niso vključena.**                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | Doda `git`, `docker.io`, `docker-compose` in globalna orodja CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **To možnost izberite za agentske delovne tokove.**                                                                                                     |
| `runner-web`  | `runner-base`         | Doda Playwright in brskalnik Chromium (`--with-deps`) za ponudnike spletnih sej: `gemini-web`, `claude-web`, `claude-turnstile`. **To možnost izberite, kadar uporabljate te ponudnike** — običajna slika brez tega odpove ob času zahteve (glejte opombo o `-web` v razdelku Kanali izdaj). |

Ročno zgradite določen cilj:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Viri med gradnjo

Trije argumenti gradnje določajo porabo virov faze `builder`. Veljajo samo med gradnjo —
`OMNIROUTE_MEMORY_MB` (spodaj) je ločena nastavitev za čas izvajanja.

| Argument gradnje            | Privzeto | Učinek                                                                                      |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` gradi z webpackom: manjša največja poraba pomnilnika, počasneje. `1` omogoči Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | Zgornja meja kopice V8 (`--max-old-space-size`) za zagnani `next build`.                    |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | Nastavi `CIRCLE_NODE_TOTAL`; Next izpelje `workers = N - 1` za zbiranje podatkov strani.    |

`OMNIROUTE_BUILD_WORKERS` je nastavitev, ki jo povečajte na zmogljivem gradniku, in
prva, na katero posumite, ko gradnja z omejenimi viri odpove **po** sporočilu
`✓ Compiled successfully`. Vsak delavec za podatke strani je ločen proces, prav
tako tudi nadrejeni proces `next build`; reprodukcija na delujočem VPS-u (težava
#7518) je izmerila največji RSS vsakega procesa pri približno 4,5 GB, neodvisno
od zastavice kopice `NODE_OPTIONS` (Turbopack prevaja v izvornem pomnilniku/Rustu
zunaj kopice V8). Privzeta vrednost `2` (→ 1 delavec, skupaj 2 procesa) je
prilagojena gostovanim izvajalnikom GitHub s 16 GB / 4 vCPU, ki jih uporablja
cevovod za objavljanje. Pri `8` (→ 7 delavcev) je temu izvajalniku zmanjkalo
pomnilnika in buildkit je prekinil korak z napako
`ResourceExhausted: ... cannot allocate memory`; tudi `3` (→ 2 delavca) ni bilo
dovolj, ko je bil RSS na proces izmerjen neposredno namesto ocenjen posredno.
`tests/unit/docker-build-memory-budget.test.ts` opravi izračun na podlagi
izmerjene vrednosti in odpove, če katera koli nastavitev preseže zmogljivost
izvajalnika.

Turbopack prevaja v izvornem pomnilniku Rusta, ki je **zunaj** kopice V8, zato ga
`OMNIROUTE_BUILD_MEMORY_MB` ne omejuje. Na gostitelju z omejitvijo pomnilnika
gradnjo nato brez kakršnega koli besedila napake s signalom SIGKILL prekine
mehanizem OOM — preprosto se ustavi sredi koraka
`Creating an optimized production build`, kar je videti kot zastoj in ne kot
pomanjkanje pomnilnika. Zato `Dockerfile` privzeto uporablja webpack
(`OMNIROUTE_USE_TURBOPACK=0`), za razliko od `npm run dev` / `npm run build`, kjer
je v kodi privzeto nastavljen Turbopack: goli `docker build .` brez argumentov
gradnje (kar izvajajo Railway in drugi gostitelji z namestitvijo z enim klikom)
na gradniku z omejenim pomnilnikom ne sme tiho odpovedati. Objavljene slike že
izrecno posredujejo `OMNIROUTE_USE_TURBOPACK=0` v `docker-publish.yml`. Na
gradniku z dovolj pomnilnika RAM omogočite Turbopack za hitrejšo gradnjo:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` je omogočen, zato `next build` zažene nadrejeni proces
**in** proces delavca, vsak od njiju pa ločeno upošteva
`OMNIROUTE_BUILD_MEMORY_MB`. Zgornjo mejo vsebnika nastavite na približno
dvakratnik te vrednosti, ne na enkratnik.

Izmerjeno na tem drevesu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Orodje za združevanje | Zgornja meja vsebnika | Rezultat                                     |
| --------------------- | --------------------- | -------------------------------------------- |
| Turbopack             | 8 GiB / 16 GiB        | pri obeh prekinjeno zaradi OOM, brez izpisa  |
| webpack               | 8 GiB                 | delavec gradnje prekinjen s signalom SIGKILL |
| webpack               | 12 GiB                | uspešno, največja poraba 11,1 GiB            |

### Privzete nastavitve med izvajanjem

Privzete vrednosti, ki jih izvozi `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Obnašanje pomnilnika v okolju Docker:

- Slika nastavi `OMNIROUTE_MEMORY_MB=1024` in iz te vrednosti izpelje `NODE_OPTIONS=--max-old-space-size=1024`.
- Dejanski strežniški proces zažene samostojni zaganjalnik, ki prebere `OMNIROUTE_MEMORY_MB` in doda `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node uporabi zadnjo ponovljeno vrednost `--max-old-space-size`, zato nastavitev `OMNIROUTE_MEMORY_MB` določa dejansko omejitev kopice v Dockerju.
- Ker jo slika vedno nastavi, se zaganjalnikova nadomestna nastavitev, prilagojena količini RAM-a, v Dockerju nikoli ne uporabi. Za delovno obremenitev jo izrecno povečajte (glejte spodnjo tabelo). `2048` je še vedno premalo za `/v1/responses` agenta za programiranje.

### RAM med izvajanjem za agente za programiranje

Privzeta nastavitev Dockerja 1 GiB je minimum za nadzorno ploščo in preprost klepet, ne pa velikost za produkcijsko okolje. Dolga telesa zahtev `POST /v1/responses` (na stotine sporočil, na desetine orodij) med stiskanjem ohranijo več grafov v pomnilniku. Dve prekrivajoči se zahtevi velikosti približno 3 MiB oziroma 750.000 žetonov sta povzročili prekinitev V8 pri **12 GiB** starega prostora (`FATAL ERROR: Reached heap limit`) in tudi OOM v cgroup z omejitvijo 16 GiB. Glejte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Nastavite **cgroup `--memory` nad velikost kopice** — izvorni medpomnilniki, SQLite in vmesni podatki stiskanja so zunaj V8.

| Delovna obremenitev                           | `OMNIROUTE_MEMORY_MB`          | Vsebnik / cgroup                | Opombe                                                                                                                       |
| --------------------------------------------- | ------------------------------ | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Nadzorna plošča, en preprost klepet           | `1024` (privzeto v sliki)      | ≥2 GiB                          |                                                                                                                              |
| En agent za programiranje (Claude/Codex/Grok) | `8192`                         | ≥10 GiB                         | Običajna seja z eno zahtevo `/v1/responses`                                                                                  |
| Dve sočasni dolgi zahtevi `/v1/responses`     | `10240`–`12288`                | ≥12–16 GiB                      | Izmerjena prekinitev V8 pri približno 12 GiB kopice                                                                          |
| Trije ali več sočasnih dolgih kontekstov      | ne uporabljajte v enem procesu | izvajajte zaporedno / več RAM-a | Privzeta omejitev za zahtevne operacije je 1 aktivna zahteva; njeno povečanje brez dodatnega RAM-a znova povzroči prekinitev |

`omniroute serve` na fizičnem sistemu nastavi približno 35 % RAM-a (omejeno na `[512, 4096]`), kadar `OMNIROUTE_MEMORY_MB` **ni nastavljena**. Docker vedno nastavi `1024`, zato se to prilagajanje v uradni sliki nikoli ne izvede.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## Obratni posredniški strežnik na podpoti (Traefik / nginx)

Vrednost `basePath` ogrodja Next.js je prevedena v samostojni paket. OmniRoute zapiše vgrajeno
vrednost v označevalno datoteko v korenu aplikacije (zapisano med `npm run build`; prebere jo
`scripts/docker/ensure-docker-base-path.mjs`) in jo ob zagonu vsebnika primerja z
`OMNIROUTE_BASE_PATH`. Če se vrednosti razlikujeta in je bila slika zgrajena za koren
domene, vstopna točka pred zagonom `node dev/run-standalone.mjs` prepiše manifeste
samostojnega paketa, vdelane literale `basePath`/`assetPrefix` (Next 16 upodablja URL-je
sredstev SSR samo iz `assetPrefix` — popravljalnik vanj preslika tudi podpot), vgrajene
URL-je sredstev `/_next/static` (manifesti sklicev odjemalca, uvozi predstavnostnih
datotek, vnaprej upodobljene strani z napakami) in odjemalski nadomestek za `process.env`.

### Gradnja s Compose (priporočeno)

Nastavite obe spremenljivki v `.env`, nato znova zgradite sliko, da se slika in izvajalno okolje ujemata:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` posreduje `OMNIROUTE_BASE_PATH` kot argument za gradnjo Docker in kot
spremenljivko izvajalnega okolja.

### Vnaprej zgrajena korenska slika + podpot med izvajanjem

Objavljene slike `diegosouzapw/omniroute:*` so zgrajene za koren domene. Kljub temu lahko
med izvajanjem nastavite `OMNIROUTE_BASE_PATH`; vsebnik ob zagonu enkrat popravi paket.
Uporabite jo skupaj z ustreznim javnim izvorom:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Obratni posredniški strežnik konfigurirajte tako, da posreduje **celotno** zunanjo pot
(ne odstranjujte predpone). Traefik naj usmeri `PathPrefix(`/omniroute`)` v vsebnik brez
`StripPrefix`, tako da Next.js prejme `/omniroute/...` in streže sredstva iz
`/omniroute/_next/...`.

Preverjanje zdravja Docker preverja lahkotno končno točko življenjskega cikla `/healthz`,
pred katero je dodana aktivna vrednost `OMNIROUTE_BASE_PATH`. Končna točka
`/api/monitoring/health` ostaja na voljo za diagnostiko za ljudi in nadzorne plošče; če
želite preverjanje HEALTHCHECK vsebnika znova usmeriti nanjo (na primer za uveljavljanje
poglobljenega preverjanja zdravja), nastavite
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Ta pot izvaja **poglobljeno**
preverjanje (podatkovna zbirka + povzetek spremljanja) — primerno za redko izvajani
Dockerjev `HEALTHCHECK`, če ga znova omogočite, vendar **ne** za intervale Kubernetes
`livenessProbe`.

Za orkestratorje (Kubernetes, Nomad itd.):

| Preverjanje            | Priporočeno                                                            | Izogibajte se                                                                |
| ---------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Živost                 | HTTP `GET /livez` ali TCP na glavnih vratih (`PORT`, privzeto `20128`) | `/api/monitoring/health` kot preverjanju živosti                             |
| Pripravljenost         | HTTP `GET /healthz`                                                    | Kratkim časovnim omejitvam, ki zasedeno zanko dogodkov obravnavajo kot mrtvo |
| Poglobljeno / blackbox | `/api/monitoring/health`                                               | —                                                                            |

`/healthz` poroča o življenjskem ciklu procesa (`ok` / `starting` / `stopping`). `/livez`
preverja samo, ali je proces živ (vrne 200, kadar koli se obravnavalnik lahko izvede; ne
čaka na pripravljenost). Obe končni točki se še vedno izvajata v isti zanki dogodkov Node
kot obravnavanje zahtev, zato ju lahko procesorsko zahtevna obdelava kataloga ali
stiskanje zakasni — zasedeno ≠ mrtvo. Če poteče časovna omejitev preverjanj HTTP, dajte
prednost preverjanju živosti TCP. Celotna navodila za preverjanja:
[Priročnik za spremljanje — priporočila za preverjanja Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose s Caddyjem (samodejni TLS za HTTPS)

OmniRoute lahko varno izpostavite s Caddyjevim samodejnim zagotavljanjem potrdil SSL. Prepričajte se, da zapis A DNS vaše domene kaže na naslov IP vašega strežnika.

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
      # Izvor, viden brskalniku, za povratne klice OAuth, povezave nadzorne plošče in ustvarjene javne URL-je.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Notranji URL med strežniki za načrtovana opravila / samodejne poizvedbe.
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

Caddy nastavi standardne glave za posredovanje za nadrejeni vsebnik. OmniRoute uporablja
`NEXT_PUBLIC_BASE_URL` kot kanonični javni izvor za povratne klice OAuth in ustvarjene javne
povezave; overjeni zapisi na nadzorni plošči uporabljajo zahteve istega izvora in zaščito CSRF,
vezano na sejo. Možnost `OMNIROUTE_TRUST_PROXY` omogočite samo pri naprednih uvedbah, pri katerih
želite, da OmniRoute javni izvor namesto iz izrecne konfiguracije določi iz zaupanja vrednih
posredovanih glav.

## Hitri tunel Cloudflare

Podpora nadzorne plošče za uvedbe Docker vključuje **hitri tunel Cloudflare** z enim klikom na `Nadzorna plošča → Končne točke`. Ob prvi omogočitvi se `cloudflared` prenese samo, ko je potreben, zažene začasni tunel do vaše trenutne končne točke `/v1` in prikaže ustvarjeni URL `https://*.trycloudflare.com/v1` neposredno pod vašim običajnim javnim URL-jem.

Plošče tunelov končnih točk (Cloudflare, Tailscale, ngrok) lahko prikažete ali skrijete v `Nastavitve → Videz`, ne da bi spremenili stanje aktivnega tunela.

### Opombe o tunelih

- URL-ji hitrih tunelov so začasni in se spremenijo po vsakem ponovnem zagonu.
- Hitri tuneli se po ponovnem zagonu OmniRoute ali vsebnika ne obnovijo samodejno. Ko jih potrebujete, jih znova omogočite na nadzorni plošči.
- Upravljana namestitev trenutno podpira Linux, macOS in Windows na arhitekturah `x64` / `arm64`.
- Upravljani hitri tuneli privzeto uporabljajo prenos HTTP/2, da se v omejenih okoljih vsebnikov izognejo motečim opozorilom o medpomnilniku UDP za QUIC. Nastavite `CLOUDFLARED_PROTOCOL=quic` ali `auto`, če želite drugačen prenos.
- Slike Docker vključujejo sistemske korenske overitelje potrdil in jih posredujejo upravljanemu programu `cloudflared`, kar prepreči napake zaupanja TLS, ko se tunel inicializira znotraj vsebnika.
- Nastavite `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, če želite, da OmniRoute namesto prenosa uporabi obstoječo izvršljivo datoteko.

## Oznake slik

| Slika                    | Oznaka   | Velikost | Opis                                                              |
| ------------------------ | -------- | -------- | ----------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB   | Najvišja **objavljena** stabilna različica SemVer (ne git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB   | Za GitOps pripnite ta razred oznake                               |

Večplatformni manifest: izvorna podpora za `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker samodejno izbere ustrezno arhitekturo; če morate na gostiteljih ARM vsiliti emulacijo AMD64, podajte `--platform linux/amd64`.

### Kanali izdaj

OmniRoute objavlja ločene kanale Docker za stabilne izdaje, aktivno preizkušanje veje izdaje in razvojne gradnje.

| Kanal                           | Vir                                               | Spremenljivost                  | Priporočena uporaba                                                                                                        |
| ------------------------------- | ------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Podpisana/različicena izdaja                      | Nespremenljiv                   | Produkcijske uvedbe, ki so pripete na točno določeno izdajo                                                                |
| `:latest` / `:latest-web`       | Najvišja **objavljena** stabilna različica SemVer | Spremenljiv stabilni kazalec    | Sledi stabilnim izdajam **po** opravilu objave SemVer — **ne** sledi veji `main` ali neobjavljenim spremembam `release/v*` |
| `:next` / `:next-web`           | Trenutna privzeta veja `release/v*`               | Spremenljiv predizdajni kazalec | Preizkušanje popravkov, ki so že vključeni v aktivno vejo izdaje, vendar še niso del stabilne izdaje                       |
| `:main` / `:main-web`           | Veja `main`                                       | Spremenljiv razvojni kazalec    | Samo za razvojno in integracijsko preizkušanje                                                                             |

#### Ponudniki spletnih sej: slike `-web`

Vsak zgornji kanal je na voljo tudi kot oznaka `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), zgrajena iz stopnje `runner-web` — gre za isto sliko z dodatkom Playwrighta in brskalnika Chromium. Običajna slika je dobavljena **brez** Chromiuma; `gemini-web`, `claude-web` in `claude-turnstile` ga potrebujejo.

Napaka je odložena in se ne pojavi ob zagonu: ti ponudniki navedejo svoje modele in so na nadzorni plošči prikazani kot povezani, odpove pa šele prva zahteva z naslednjim sporočilom:

```
[500]: Zunanjega modula playwright ni bilo mogoče naložiti: Napaka: Modula ni mogoče najti
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Če uporabljate te ponudnike, prenesite oznako `-web` kanala, ki ga že uporabljate — nič drugega se ne spremeni. Pri namestitvi z npm/CLI (brez slike Docker) manjka enakovreden del, in sicer binarna datoteka brskalnika: na gostitelju zaženite `npx playwright install chromium`.

#### Uporaba predizdajnega kanala

Kanal `next` se znova zgradi ob vsakem potisku v trenutno privzeto vejo `release/v*` in je objavljen tako za AMD64 kot ARM64. Starejše vzdrževalne veje ga ne morejo prepisati. Kanal zagotavlja sliko, ki jo je mogoče prenesti in vsebuje popravke, združene v aktivno vejo izdaje, preden je ustvarjena naslednja stabilna oznaka.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Za Docker Compose prepišite oznako slike, ki jo uporablja izbrani profil, nato prenesite sliko in znova ustvarite storitev:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Varnost in povrnitev

`next` je plavajoči kanal predizdajnih različic. Spremeni se lahko ob vsakem potisku v aktivno vejo izdaje in **ni podprt za uporabo v produkciji**. Med preverjanjem posamezne gradnje pripnite izvleček slike:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Pred preizkušanjem varnostno kopirajte podatkovni nosilec OmniRoute ali priklopljeni podatkovni imenik. Za povrnitev obnovite prej uporabljeno stabilno različico ali izvleček in znova ustvarite vsebnik:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Gradnja veje izdaje ne more nikoli premakniti oznake `latest`; stabilni kazalec lahko posodobi samo ustrezna stabilna semantična različica. Slike `next` ohranijo pregled slike izdaje in blokirno preverjanje KRITIČNIH ranljivosti.

**`latest` ni zagotovilo aktualnosti glede na git.** Združeni popravki v veji `main` ali aktivni veji `release/v*` **niso** vključeni v `:latest`, dokler ni objavljena stabilna slika SemVer in opravilo objave ne posodobi oznake `:latest` (z enakim izvlečkom kot ta SemVer). Če je videti, da je `latest` nespremenjen, čeprav GitHub že prikazuje popravek, prenesite `:next`, da preizkusite vejo izdaje, ali počakajte na oznako SemVer.

| Kaj želite                                                                               | Uporabite                              |
| ---------------------------------------------------------------------------------------- | -------------------------------------- |
| GitOps/produkcija, ki ne sme odstopati                                                   | Pripnite `:X.Y.Z` (ali izvleček slike) |
| Slediti objavljenim stabilnim različicam in sprejeti ponovno ustvarjanje ob vsaki izdaji | `:latest`                              |
| Preizkusiti neobjavljene uveljavitve `release/v*`                                        | `:next` (ne za produkcijo)             |
| Preizkusiti `main`                                                                       | `:main` (ne za produkcijo)             |

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

## Horizontalno skaliranje: N neodvisnih procesov

En proces Node predstavlja **eno gručo V8**. Dve prekrivajoči se zahtevi kodirnega agenta `POST /v1/responses` (RTK + Caveman), vsaka velika približno 3 MiB oziroma približno 750k žetonov, povzročita prekinitev te gruče pri približno 12 Gi (`FATAL ERROR: Reached heap limit`) in lahko povzročita OOM v cgroup z omejitvijo 16 Gi. Glejte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ta meritev je opozorilo glede **pomnilniškega proračuna**, ne trda omejitev izdelka na dve sočasni dolgotrajni zahtevi `/v1/responses`. Sprejem zahtevnih klepetov omejuje samodejno izpeljan proračun bajtov za vhodne podatke (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimenzioniran glede na isto omejitev V8/cgroup — zvišanje te vrednosti (ali nastavitev podedovane omejitve števila zahtev `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) v že dimenzioniranem procesu znova povzroči prekinitev. Majhni klepeti, `/healthz`, `/v1/models` in MCP **niso** vključeni v to omejitev.

### En proces: več kot dve dolgotrajni zahtevi `/v1/responses`

**Zdrav** proces (gruča pod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, privzeto `0.75`) **lahko** izvaja več kot dve sočasni dolgotrajni zahtevi `POST /v1/responses`, če ima procesni proračun bajtov za sočasne zahteve (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) še dovolj prostora. Telesa velikosti `OMNIROUTE_CHAT_LARGE_BODY_BYTES` ali več (privzeto 256 KiB) pridobijo isti zahteven zakup kot strukturno zahtevne zahteve in uporabljajo isti izhod `tryAcquireHealthyHeadroom` iz [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Več deset sočasnih dolgotrajnih odjemalcev SSE (upravljavci jih pogosto potrebujejo 40–50) je vprašanje **pomnilniškega proračuna** — ustrezno dimenzionirajte gručo + primarna/dodatna mesta + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — in ne trda omejitev izdelka »največ 2«. Obremenjena gruča še vedno zavrača zahteve s ponovljivim `503`, da se težava #7849 ne ponovi.

Če želite **pomnožiti gruče** (neodvisne stare prostore V8) **danes**:

| Storite                                                                                                                                                                                  | Ne storite                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Zaženite **N vsebnikov/podov**, vsakega z **lastnim** `DATA_DIR` / nosilcem                                                                                                              | Ne nastavite `replicas > 1` za eno datoteko SQLite                                |
| Dimenzionirajte zahtevne sočasne zahteve + zdravo rezervo glede na gručo / proračun bajtov za sočasne zahteve; 1–2 je konservativna privzeta vrednost iz #7849, ne trda omejitev izdelka | Enemu procesu ne dodelite 8× RAM-a in neomejene številske omejitve                |
| Izbirno: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` za **skupne števce kvot**                                                                                                  | Redisa ne obravnavajte kot skupnega SQLite — to ni                                |
| Podvojite skrivnosti ponudnikov v vsaki instanci (ali sprejmite ločene nadzorne plošče)                                                                                                  | Ne pričakujte ene nadzorne plošče / enega dnevnika klicev med instancami          |
| Pred instance postavite kateri koli izenačevalnik obremenitve; lepljivost po ključu API ali seji zadostuje                                                                               | Ne zahtevajte vmesne programske opreme določenega ponudnika, ki upošteva velikost |

Strojna oprema: število sočasnih dolgotrajnih zahtev `/v1/responses` na instanco je vprašanje **pomnilniškega proračuna** (gruča + bajti sočasnih zahtev / #10110). `N` neodvisnih imenikov `DATA_DIR` še vedno pomnoži gruče: pomnilnik RAM gostitelja mora pokriti `N × cgroup`, ne »en pod s 16 Gi in N=8«. Nikoli ne uporabljajte `replicas > 1` za eno datoteko SQLite.

Osnutek Compose (dve gruči, dva nosilca — ne `deploy.replicas: 2`):

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

Gostota znotraj procesa (stiskanje zunaj izolata HTTP) je opisana v [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Ena logična gruča na skupnem trajnem stanju je opisana v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionalne napake Gemini znotraj Dockerja

Google AI Studio / Gemini API lahko vrne HTTP 400 z napako FAILED_PRECONDITION in
`Lokacija uporabnika ni podprta za uporabo API-ja.` Uspešna zahteva na gostitelju
ne dokazuje, da vsebnik uporablja isto izhodno pot. Vrstni red DNS,
povezljivost IPv4/IPv6, usmerjanje VPN in nastavljeni posredniški strežniki se lahko razlikujejo. Preverite
[Googlove podprte regije](https://ai.google.dev/gemini-api/docs/available-regions)
in dejansko pot povezave; ta napaka sama po sebi ne pomeni, da je ključ API napačen.

### Prednostno uporabite posredniški strežnik za posamezno povezavo

Za prizadeto povezavo Gemini uporabite Omniroutovo
[nastavitev posredniškega strežnika za posamezno povezavo](../ops/PROXY_GUIDE.md#4-level-proxy-system),
nato pa znova izvedite **Preizkus povezave** in majhno zahtevo
z istim modelom. Tako sprememba usmerjanja ostane omejena na to povezavo. Preverite,
ali je posredniški strežnik dosegljiv iz vsebnika in ali ga povezava dejansko izbere.
Sprememba poti ne zagotavlja regionalne upravičenosti pri ponudniku.

### Primerjajte omrežne nastavitve gostitelja in vsebnika

Pri primerjavi overjenih rezultatov ohranite enake ključ, model in zahtevo; v prijavo težave nikoli
ne prilepite poverilnic, gesel posredniškega strežnika ali celotnih glav za avtorizacijo.
Najprej preverite, katere družine naslovov ponuja sistemski razreševalnik, tako da uporabite isti ukaz
na gostitelju in znotraj vsebnika:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` zamenjajte s storitvijo, ki jo izvajate (na primer `omniroute-web`). Ti
ukazi izpišejo družine naslovov brez poverilnic ali naslovov IP. Vrnjena vrednost `6`
pomeni samo rezultat DNS za IPv6: **ne** dokazuje uporabne poti IPv6 ali dostopa do API-ja.
Kjer je nameščen `curl`, primerjajte `curl -4 -I https://generativelanguage.googleapis.com`
z `curl -6 -I https://generativelanguage.googleapis.com` v obeh okoljih.
Odziv HTTP dokazuje povezljivost za ta preizkus, tudi če gre za neoverjeno
napako; upravičenost za Gemini preveri samo overjena zahteva modelu.

### Alternativa na ravni gostitelja: delujoč IPv6 in pravilnik razreševalnika

Prijavitelj težave [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) je v svojem okolju obnovil
dostop tako, da je omogočil IPv6 vsebnika in spremenil izbiro naslovov glibc.
To obravnavajte kot alternativo, značilno za posamezno okolje. Pred spreminjanjem prednostnih nastavitev razreševalnika preverite
delovanje IPv6 na gostitelju, izhodno povezljivost/usmerjanje vsebnika in pravila požarnega zidu.
Zasebni naslov ULA sam po sebi ne zagotavlja javne povezljivosti IPv6.

Za storitve, ki so že povezane s privzetim omrežjem Compose, ta fragment omogoči
IPv6 v tem omrežju; ohranite preostale nastavitve storitve, vrat, nosilcev in konfiguracije:

```yaml
networks:
  default:
    enable_ipv6: true
```

Pri poimenovanem omrežju ga omogočite v omrežju, s katerim je storitev dejansko povezana. Docker lahko
dodeli podomrežje ULA; izrecno, neprekrivajoče se podomrežje izberite samo, kadar ga vaše omrežje
zahteva. Glejte [Omrežja IPv6 v Dockerju](https://docs.docker.com/engine/daemon/ipv6/)
in [Možnosti omrežja Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

V **sliki, ki temelji na glibc**, lahko `/etc/gai.conf` spremeni izbiro naslovov. Trenutna
datoteka Dockerfile repozitorija uporablja Debian; prilagojene slike, ki temeljijo na musl, tega mehanizma ne uporabljajo.
Navedena prilagoditev spremeni oznako ULA iz `label fc00::/7 6` v
`label fc00::/7 1`. Začnite s celotno tabelo pravilnikov slike in ohranite druge
vnose: dodajanje vnosa `label` ali `precedence` nadomesti to privzeto tabelo, zato datoteka,
ki vsebuje samo spremenjeno vrstico, ne zadostuje.
[Referenca za konfiguracijo glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
opisuje to vedenje. Pregledano datoteko priklopite samo za branje na `/etc/gai.conf`
in znova ustvarite storitev, da uveljavite spremembo.

To spremeni izbiro naslovov operacijskega sistema za **ves izhodni promet v tem vsebniku**.
Ne prisili vsake aplikacije, da izbere IPv6: pomembna sta tudi vrstni red DNS in
izbira povezave v Node. Zlasti `--dns-result-order=ipv4first` daje prednost IPv4 in
ni rešitev za napako, ki se pojavlja samo pri IPv4. Glejte [Vrstni red DNS v Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Po vsaki spremembi na ravni gostitelja znova preizkusite Gemini in druge ponudnike. Za povrnitev sprememb
odstranite priklop prilagojene datoteke `gai.conf`, obnovite prejšnjo omrežno konfiguracijo in
v vzdrževalnem obdobju znova ustvarite prizadeto storitev/omrežje. Ponovno ustvarjanje omrežja
lahko prekine delovanje drugih vsebnikov, ki so povezani z njim; ne izbrišite trajnega podatkovnega nosilca.

## Pomembne opombe

- **Način WAL za SQLite:** Ukazu `docker stop` je treba omogočiti, da se dokonča, da lahko OmniRoute zapiše najnovejše spremembe nazaj v `storage.sqlite` prek kontrolne točke. Priložene datoteke Compose že nastavijo 40-sekundno obdobje za ustavitev. Če sliko zaganjate neposredno, ohranite `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Nastavite na `true`, če se rutinske varnostne kopije oziroma varnostne kopije pred zapisovanjem upravljajo zunanje. Selitve obstoječe podatkovne zbirke še vedno zahtevajo lasten trajen varnostni posnetek in zaščito pred množično selitvijo.
- **Trajnost podatkov:** Vedno priklopite nosilec na `/app/data`, da ohranite podatkovno zbirko, ključe in konfiguracije med ponovnimi zagoni vsebnika.
- **Konfiguracija vrat:** Če želite spremeniti privzeta vrata `20128`, preglasite okoljsko spremenljivko `PORT`.

## Glejte tudi

- [Vodnik za uvedbo v VM](../ops/VM_DEPLOYMENT_GUIDE.md) — nastavitev VM + nginx + Cloudflare
- [Vodnik za uvedbo v Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — uvedba v Fly.io
- [Konfiguracija okolja](../reference/ENVIRONMENT.md) — popoln pregled `.env`
