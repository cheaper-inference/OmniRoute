# 🐳 Docker Guide — OmniRoute (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Potpuna referenca za implementaciju pomoću Dockera. Za brzi početak pogledajte [odjeljak o Dockeru u README-u](../README.md#-docker).

## Sadržaj

- [Brzo pokretanje](#quick-run)
- [S datotekom okruženja](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Dostupni profili](#available-profiles)
- [Konfiguriranje CLI alata na glavnom računalu kada se OmniRoute izvodi u Dockeru](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis kao pomoćni spremnik](#redis-sidecar)
- [Compose za produkciju](#production-compose)
- [Faze Dockerfilea](#dockerfile-stages)
- [Kritične varijable okruženja](#critical-environment-variables)
- [Docker Compose s Caddyjem (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Oznake slika](#image-tags)
- [Ažuriranja nadzorne ploče u Dockeru](#dashboard-updates-in-docker)
- [Dostupnost: zadani SQLite podržava samo jednu repliku](#availability-default-sqlite-is-single-replica)
- [Regionalne pogreške Geminija unutar Dockera](#gemini-regional-errors-inside-docker)
- [Važne napomene](#important-notes)

---

## Brzo trčanje

> **Self-host u jednoj naredbi?** Pogledajte [Self-Host Guide](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (objavljena slika + Redis, samo povratna petlja, bez izbora profila). Quick Run u nastavku je staza s jednim spremnikom za korisnike koji već pokreću Redis negdje drugdje.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## S datotekom okruženja

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
# Osnovni profil (bez CLI alata)
docker compose --profile base up -d

# CLI profil (ugrađeni Claude Code, Codex i OpenClaw)
docker compose --profile cli up -d

# Profil glavnog računala (prvenstveno za Linux; binarne datoteke CLI alata glavnog računala montira samo za čitanje)
docker compose --profile host up -d

# Web-profil (Chromium/Playwright za pružatelje koji upotrebljavaju web-sesije)
docker compose --profile web up -d

# Kombinirajte CLI i pomoćni spremnik CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Dostupni profili

OmniRoute isporučuje Compose profile za glavne načine implementacije. Odaberite onaj koji odgovara vašem okruženju.

| Profil          | Usluga           | Kada upotrebljavati                                                                                                                                                                  | Naredba                                      |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (zadano) | `omniroute-base` | Poslužitelj bez grafičkog sučelja / minimalno izvršno okruženje, bez uključenih CLI alata pružatelja                                                                                 | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Agentski tijekovi rada koji pozivaju `omniroute providers/setup/doctor` i ugrađene CLI alate (Codex, Claude Code, Droid, OpenClaw)                                                   | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Linux glavna računala kojima je potreban pristup CLI alatima glavnog računala sličan opciji `network_mode`, montiranjem `~/.local/bin`, `~/.codex`, `~/.claude` itd. samo za čitanje | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Pokrenite pomoćni spremnik [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na priključku `8317` za prosljeđivanje nadređenom CLI proxyju                                 | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | Pružatelji web-sesija kojima je potreban preglednik: `gemini-web`, `claude-web`, `claude-turnstile` (izgrađuje `runner-web`, Chromium je uključen)                                   | `docker compose --profile web up -d`         |

> Moguće je kombinirati više profila: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfiguriranje CLI alata glavnog računala kada se OmniRoute izvodi u Dockeru

`omniroute setup-codex`, `setup-claude`, `config set <tool>` i gumb
**Spremi konfiguraciju** na nadzornoj ploči zapisuju datoteke poput `~/.codex/*.config.toml`. Te putanje
imaju značenje samo na računalu na kojem se CLI stvarno izvodi. Pokrenete li ih unutar
spremnika, zapis završava u vlastitom matičnom direktoriju spremnika (`/home/node` —
slika se izvodi kao `USER node`), gdje ga nijedan CLI glavnog računala nikada neće pročitati i odakle se
odbacuje čim se spremnik ponovno izradi.

OmniRoute to otkriva i odbija zapis uz prikaz uputa umjesto
prijavljivanja uspjeha koje ne možete iskoristiti: CLI završava s kodom `2`, a API odgovara statusom `422`
uz `containerEphemeralTarget: true`.

### Preporučeno: pokrenite CLI na glavnom računalu, a OmniRoute u Dockeru

Spremnik poslužuje API; CLI konfigurira alate na vašem glavnom računalu.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # usmjerite CLI prema spremniku
omniroute setup-codex                      # zapisuje stvarni ~/.codex na vašem glavnom računalu
```

Ovo je pravi izbor kada se Codex, Claude Code, Cursor ili slični alati izvode na vašem
prijenosnom računalu — što je uobičajena postavka.

### Alternativa: bind-montirajte konfiguracijske direktorije glavnog računala (profil `host`)

Ako želite da sam spremnik zapisuje konfiguraciju vašeg glavnog računala, montirajte
direktorije i usmjerite `CLI_CONFIG_HOME` na korijenski direktorij montiranja. Profil `host`
to već čini:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind-montiranje čini putanju pouzdanom: OmniRoute čita
`/proc/self/mountinfo` i dopušta zapisivanje u montirane putanje (kao i u direktorije
čiji su poddirektoriji točke montiranja, što je upravo gore prikazana struktura `/host-home`), dok
i dalje odbija nemontirane putanje.

### Zaobilazno rješenje: konfigurirajte CLI-jeve samog spremnika (koristite štedljivo)

Kada se CLI-jevi doista nalaze unutar spremnika (profil `cli`), zapisivanje
je namjerno. Proslijedite `--allow-container-write` bilo kojoj naredbi `setup-*` ili postavite
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` za poslužitelj. Zapisivanje se izvršava
uz upozorenje da neće preživjeti ponovno stvaranje spremnika.

> **Sigurnosno upozorenje — profil `cli` + montiranje `docker.sock`.**
> Profil `cli` bind-montira `/var/run/docker.sock` kako bi automatski program za ažuriranje unutar spremnika
> mogao ponovno izraditi skup servisa putem demona glavnog računala
> (`src/lib/system/autoUpdate.ts` provjerava postojanje tog socketa i preskače
> Dockerovu putanju kada nije prisutan). Taj socket predstavlja **granicu povjerenja s ovlastima roota
> na glavnom računalu**: sve što mu može pristupiti upravlja Dockerovim demonom na glavnom računalu kao
> root — može stvarati, pregledavati, zaustavljati i uklanjati bilo koji spremnik na glavnom računalu.
> Posljedice:
>
> 1. **Nikada ne izlažite port profila `cli` mreži.** Objavite
>    ga na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` dostupan putem LAN-a pretvara svaki RCE na razini nadzorne ploče u
>    potpuno ugrožavanje glavnog računala.
> 2. **Nemojte bind-montirati dodatne direktorije glavnog računala u profil `cli`.**
>    Dockerov socket uz bilo koje dodatno montiranje daje spremniku potpuni
>    pristup za čitanje i pisanje po vašem datotečnom sustavu i konfiguraciji glavnog računala. Ako alat treba
>    pristup projektu, pokrenite ga lokalno pomoću izvršne datoteke CLI-ja — nemojte ga montirati
>    u spremnik `cli`.
>
> Ako ne trebate automatsko ažuriranje unutar spremnika, nemojte uključivati profil `cli`
> (`COMPOSE_PROFILES=core,redis` ili kraće). Ostali profili ne
> montiraju Dockerov socket.
>
> Pogledajte `docs/security/MITM-TPROXY-DECRYPT.md` (git; nije ugrađeno u `/docs`) za povezani model prijetnji
> vezan uz MITM te `docs/security/SUPPLY_CHAIN.md` za
> lanac podrijetla izvršnih datoteka `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute se oslanja na Redis kao podršku za distribuirano ograničavanje brzine i dijeljenu predmemoriju. Usluga `redis` **uvijek je definirana** u datoteci `docker-compose.yml` (nije ograničena profilom) i pokreće se zajedno s bilo kojim drugim profilom.

| Pojedinost                    | Vrijednost                             |
| ----------------------------- | -------------------------------------- |
| Slika                         | `redis:7-alpine`                       |
| Naziv spremnika               | `omniroute-redis`                      |
| Interni priključak            | `6379`                                 |
| Priključak domaćina (zamjena) | `REDIS_PORT` (zadano `6379`)           |
| Adresa domaćina (zamjena)     | `REDIS_BIND_HOST` (zadano `127.0.0.1`) |
| Volumen                       | `omniroute-redis-data` → `/data`       |
| Provjera ispravnosti          | `redis-cli ping` (interval od 10 s)    |

Povezane varijable okruženja:

- `REDIS_URL` — niz za povezivanje koji se prosljeđuje aplikaciji (zadano `redis://redis:6379`).
- `REDIS_PORT` — mapiranje priključka na strani domaćina za Redisov spremnik.
- `REDIS_BIND_HOST` — mrežno sučelje domaćina na kojem se objavljuje priključak. Zadano je `127.0.0.1`.

> **Zašto se prema zadanim postavkama koristi povratna adresa:** sidecar se izvodi bez opcije `requirepass`, a spremnici
> aplikacije pristupaju mu putem Compose mreže (`redis:6379`) — objavljeni priključak
> služi samo za alate na strani domaćina (`redis-cli`, lokalni `npm run dev`). Objavljivanje na adresi
> `0.0.0.0` izložilo bi Redis bez autentifikacije svakom domaćinu na vašem LAN-u. Ako postavite
> `REDIS_BIND_HOST=0.0.0.0`, usluzi `command:` također dodajte `--requirepass`.

**Onemogućavanje Redisa** nije preporučljivo (ograničavanje brzine prijeći će na pričuvnu implementaciju u memoriji). Ako ga morate onemogućiti, uklonite ili zakomentirajte blok usluge `redis:` u datoteci `docker-compose.yml` ili ga skalirajte na nulu:

```bash
docker compose up -d --scale redis=0
```

## Produkcijski Compose

Za izoliranu produkcijsku snimku koja se izvodi uz razvojno okruženje upotrijebite `docker-compose.prod.yml`.

| Pojedinost                       | Vrijednost                                                                          |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| Datoteka                         | `docker-compose.prod.yml`                                                           |
| Zadani priključak nadzorne ploče | `PROD_DASHBOARD_PORT=20130` (mapiran na interni `${DASHBOARD_PORT:-20128}`)         |
| Zadani API priključak            | `PROD_API_PORT=20131`                                                               |
| Slika                            | `omniroute:prod` (izrađena iz cilja `runner-cli`)                                   |
| Redisov spremnik                 | `omniroute-redis-prod` (`redis:8.6.2`, namjenski volumen `redis-prod-data`)         |
| Podatkovni volumen               | `omniroute-prod-data` (imenovan, zadržava se nakon ponovnih izgradnji)              |
| Provjere ispravnosti             | `node healthcheck.mjs` + `redis-cli ping`, uz `depends_on` uvjetovan stanjem Redisa |

Način upotrebe:

```bash
# Izgradite i pokrenite produkcijski stog
docker compose -f docker-compose.prod.yml up -d --build

# Pratite zapise u stvarnom vremenu
docker compose -f docker-compose.prod.yml logs -f

# Zaustavite i uklonite stog (zadržite volumene)
docker compose -f docker-compose.prod.yml down
```

Produkcijski stog izvodi se paralelno s razvojnim Compose okruženjem (različiti nazivi spremnika, priključci i volumeni), pa možete nastaviti lokalni razvoj dok produkcijsko okruženje ostaje pokrenuto.

## Dockerfile faze

Repozitorij isporučuje Dockerfile u više faza (`Dockerfile`). Izložena su četiri stupnja; odaberite pravi `target` za svoj slučaj upotrebe.

| Pozornica     | Osnovna slika         | Svrha                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instalira deps (`npm ci --legacy-peer-deps`) i pokreće `npm run build` (Turbopack prema zadanim postavkama — pogledajte resurse za vrijeme izgradnje u nastavku)                                                                                                                                  |
| `runner-base` | `node:26-trixie-slim` | Vrijeme rada proizvodnje sa samostalnim izlazom Next.js.** Nema davatelja CLIs paketa.**                                                                                                                                                                                                          |
| `runner-cli`  | `runner-base`         | Dodaje `git`, `docker.io`, `docker-compose` i globalni CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Odaberite ovo za agentske tijekove rada.**                                                                                                                      |
| `runner-web`  | `runner-base`         | Dodaje Playwright + preglednik Chromium (`--with-deps`) za pružatelje web-sesija: `gemini-web`, `claude-web`, `claude-turnstile`.** Odaberite ovo kada koristite te pružatelje usluga** — obična slika ne uspijeva u trenutku zahtjeva bez njega (pogledajte `-web` bilješku pod Kanali izdanja). |

Ručno izradite određeni cilj:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Resursi vremena izgradnje

Tri argumenta izgradnje kontroliraju troškove `builder` faze. Oni su samo za vrijeme izgradnje — `OMNIROUTE_MEMORY_MB` (ispod) je zaseban gumb za vrijeme izvođenja.

| Build arg                   | Zadano | Učinak                                                                                          |
| --------------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` gradi s webpackom: manja vršna memorija, sporije. `1` se uključuje u Turbopack.             |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | V8 plafon hrpe (`--max-old-space-size`) za stvoreni `next build`.                               |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Hrani `CIRCLE_NODE_TOTAL`; Sljedeće izvodi `workers = N - 1` za prikupljanje podataka stranice. |

`OMNIROUTE_BUILD_WORKERS` je onaj koji se podiže na velikom graditelju i onaj na koga se sumnja kada ograničena gradnja umre** nakon** `✓ Compiled successfully`. Svaki page-data worker je vlastiti proces, kao i sam nadređeni `next build` ; živa VPS reprodukcija (pitanje #7518) izmjerila je vršni RSS svakog procesa na ~ 4,5 GB neovisno o `NODE_OPTIONS` heap oznaci (Turbopack kompajlira u native/Rust memoriju izvan V8 hrpe). Zadana vrijednost `2` (→ 1 radnik, ukupno 2 procesa) je veličine za 16 GB / 4 vCPU pokretača hostiranih na GitHubu koje koristi cjevovod za objavljivanje. Na `8` (→ 7 radnika) tom pokretaču je ponestalo memorije i buildkit nije uspio korak sa `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 radnika) još uvijek nije odgovarao nakon što je RSS po procesu izravno izmjeren umjesto izveden. `tests/unit/docker-build-memory-budget.test.ts` izvodi aritmetiku u odnosu na izmjerenu brojku i ne uspijeva ako bilo koji gumb preraste trkač.

Turbopack kompajlira u izvornoj Rust memoriji koja živi** vani** hrpu V8, tako da je `OMNIROUTE_BUILD_MEMORY_MB` ne omeđuje. Na hostu s gornjom granicom memorije izgradnju zatim SIGKILLed vrši OOM killer bez ikakvog teksta pogreške — jednostavno se zaustavlja usred `Creating an optimized production build`, što se čita kao zastoj, a ne nedostatak memorije. Zbog toga je `Dockerfile` zadana webpack (`OMNIROUTE_USE_TURBOPACK=0`), za razliku od `npm run dev` / `npm run build`, gdje je Turbopack zadana vrijednost koda: goli `docker build .` bez argumenata za izgradnju (ono što Railway i drugi hostovi s jednim klikom pokreću) ne smije tiho umrijeti na builderu s ograničenom memorijom. Objavljene slike već prolaze `OMNIROUTE_USE_TURBOPACK=0` eksplicitno u `docker-publish.yml`. Na builderu s dosta RAM, uključite se u Turbopack za bržu izgradnju:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` je omogućen, tako da `next build` pokreće nadređenog** i** radnički proces i svaki zasebno poštuje `OMNIROUTE_BUILD_MEMORY_MB`. Dimenzionirajte strop spremnika iznad otprilike dvostruko veće vrijednosti, ne jednom.

Izmjereno na ovom stablu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Skupljač  | Strop kontejnera | Proizlaziti                         |
| --------- | ---------------- | ----------------------------------- |
| Turbopack | 8 GiB / 16 GiB   | OOM-ubio u oba, tiho                |
| webpack   | 8 GiB            | graditi radnik SIGKILLed            |
| webpack   | 12 GiB           | uspio, dostigao vrhunac na 11,1 GiB |

### Zadane postavke vremena izvođenja

Zadane postavke koje je izvezao `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Ponašanje memorije u Docker:

- Slika postavlja `OMNIROUTE_MEMORY_MB=1024` i iz njega izvodi `NODE_OPTIONS=--max-old-space-size=1024`.
- Stvarni proces poslužitelja pokreće samostalni pokretač, koji čita `OMNIROUTE_MEMORY_MB` i dodaje `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Čvor koristi posljednju ponovljenu vrijednost `--max-old-space-size`, tako da postavljanje `OMNIROUTE_MEMORY_MB` kontrolira efektivno ograničenje gomile Docker.
- Budući da ga slika uvijek postavlja, zamjena pokretača kalibrirana RAM-om nikada se ne primjenjuje pod Docker. Izričito ga povećajte za radno opterećenje (tablica u nastavku). `2048` je još uvijek premalen za agenta za kodiranje `/v1/responses`.

### Runtime RAM za agente kodiranja

Zadana vrijednost 1 GiB Docker je dashboard/light-chat kat, a ne proizvodna veličina. Duga `POST /v1/responses` tijela (stotine poruka, deseci alata) zadržavaju višestruke grafove u memoriji tijekom kompresije. Dva preklapajuća zahtjeva ~ 3 MiB / ~ 750k-tokena prekinuli su V8 u** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) i također pogodio 16 GiB cgroup OOM. Pogledajte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Veličina** cgroup `--memory` iznad gomile** izvorni međuspremnici —, SQLite i međuprodukti kompresije nalaze se izvan V8.

| Radno opterećenje                            | `OMNIROUTE_MEMORY_MB`     | Spremnik / cgroup         | Bilješke                                                                                        |
| -------------------------------------------- | ------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------- |
| Nadzorna ploča, jedan lagani chat            | `1024` (zadana slika)     | ≥2 GiB                    |                                                                                                 |
| Jedan agent za kodiranje (Claude/Codex/Grok) | `8192`                    | ≥10 GiB                   | Tipična `/v1/responses` s jednom sesijom                                                        |
| Dva istovremena duga `/v1/responses`         | `10240`–`12288`           | ≥12–16 GiB                | Izmjeren V8 prekid na ~ 12 GiB                                                                  |
| Tri + istodobna duga konteksta               | nemojte na jednom procesu | serijalizirati / više RAM | Zadana ulaznica za tešku kategoriju je 1 u letu; njegovo podizanje bez RAM ponovno uvodi prekid |

`omniroute serve` na golom metalu kalibrira ~ 35% od RAM (stegnuti `[512, 4096]`) kada je `OMNIROUTE_MEMORY_MB`** nepostavljeno** . Docker uvijek postavlja `1024`, tako da se kalibracija nikada ne izvodi u službenoj slici.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Ključne varijable okruženja

Osim zadanih vrijednosti dokumentiranih u [ENVIRONMENT.md](../reference/ENVIRONMENT.md), sljedeće su varijable najvažnije pri pokretanju u Dockeru:

| Varijabla                     | Svrha                                                                                                                                                                                                                                                                             | Zadana vrijednost                  |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Dijeljena tajna za WebSocket most. **Obavezna u produkciji** — postavite je na snažan nasumični niz znakova.                                                                                                                                                                      | nije postavljeno (mora se navesti) |
| `REDIS_URL`                   | Niz za povezivanje s pozadinskim sustavom za ograničavanje učestalosti zahtjeva / predmemoriju                                                                                                                                                                                    | `redis://redis:6379`               |
| `REDIS_PORT`                  | Port na strani hosta za uključeni Redis spremnik                                                                                                                                                                                                                                  | `6379`                             |
| `REDIS_BIND_HOST`             | Mrežno sučelje hosta na kojem je objavljen port uključenog Redis spremnika (povratna petlja, osim ako ne dodate AUTH)                                                                                                                                                             | `127.0.0.1`                        |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Putanja na hostu montirana u profil `cli` na `/workspace/omniroute` za tijekove rada samostalnog ažuriranja                                                                                                                                                                       | `.` (trenutačni direktorij)        |
| `OMNIROUTE_MEMORY_MB`         | Gornja granica Node hrpe tijekom izvođenja za samostalni Docker poslužitelj; nadjačava prethodno navedenu zadanu vrijednost slike. Agenti za programiranje: `8192`+ (pogledajte [RAM tijekom izvođenja](#runtime-ram-for-coding-agents)).                                         | `1024`                             |
| `DASHBOARD_PORT` / `API_PORT` | Nadjačava izložene portove za nadzornu ploču (20128) i API (20129)                                                                                                                                                                                                                | `20128` / `20129`                  |
| `APP_BIND_HOST`               | Mrežno sučelje hosta na kojem docker-compose objavljuje portove nadzorne ploče/API-ja/WS-a uživo. Uz `REQUIRE_API_KEY=false` (zadano), `0.0.0.0` izlaže anonimni proxy `/v1` lokalnoj mreži — proširite dostupnost samo uz `REQUIRE_API_KEY=true` ili obrnuti proxy ispred njega. | `127.0.0.1`                        |
| `CLIPROXY_BIND_HOST`          | Mrežno sučelje hosta na kojem docker-compose objavljuje pomoćni spremnik `cliproxyapi` — njegov podatkovni volumen sadrži vjerodajnice pružatelja usluga.                                                                                                                         | `127.0.0.1`                        |
| `OMNIROUTE_PLUGINS_DIR`       | Direktorij koji skener dodataka tijekom izvođenja čita i u koji instalira dodatke. Postavite ga kada su dodaci montirani povezivanjem: zadana vrijednost slijedi `HOME`, koji slika ne mora izvoziti.                                                                             | `~/.omniroute/plugins`             |
| `OMNIROUTE_BASE_PATH`         | URL podputanja kada je aplikacija objavljena iza obrnutog proxyja (npr. `/omniroute`)                                                                                                                                                                                             | _(prazno = korijen)_               |
| `NEXT_PUBLIC_BASE_URL`        | Javno ishodište preglednika, uključujući podputanju (npr. `https://host/omniroute`)                                                                                                                                                                                               | nije postavljeno                   |
| `PROD_DASHBOARD_PORT`         | Port nadzorne ploče na strani hosta za `docker-compose.prod.yml`                                                                                                                                                                                                                  | `20130`                            |
| `CLIPROXYAPI_PORT`            | Port na strani hosta za pomoćni spremnik `cliproxyapi`                                                                                                                                                                                                                            | `8317`                             |

## Obrnuti proxy na podputu (Traefik / nginx)

Next.js `basePath` je kompajliran u samostalni paket. OmniRoute bilježi pečenu vrijednost u sentinel datoteku u korijenu aplikacije (napisanu tijekom `npm run build`; čita `scripts/docker/ensure-docker-base-path.mjs`) i uspoređuje je sa `OMNIROUTE_BASE_PATH` kada se spremnik pokrene. Kada se razlikuju, a slika je izgrađena za korijen domene, ulazna točka prepisuje samostalne manifeste, ugrađene `basePath`/`assetPrefix` literale (Sljedećih 16 renderira SSR sredstvo URLs iz samog `assetPrefix` — patcher zrcali podstazu u njega), pečeno `/_next/static` sredstvo URLs (manifesti reference klijenta, uvozi medija, unaprijed prikazane stranice s pogreškama) i klijent `process.env` shim prije pokretanja `node dev/run-standalone.mjs`.

### Nova verzija (preporučeno)

Postavite obje varijable u `.env`, zatim ponovno izgradite tako da se slika i vrijeme izvođenja slažu:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` prosljeđuje `OMNIROUTE_BASE_PATH` kao Docker build-arg i kao varijablu runtime okruženja.

### Unaprijed izgrađena korijenska slika + podput vremena izvođenja

Objavljene `cheaperinference/omniroute:*` slike izgrađene su za korijen domene. Još uvijek možete postaviti `OMNIROUTE_BASE_PATH` tijekom izvođenja; spremnik krpa paket jednom prilikom pokretanja. Uparite ga s odgovarajućim javnim izvorom:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurirajte obrnuti proxy za prosljeđivanje** puna** vanjski put (ne uklanjajte prefiks). Traefik bi trebao usmjeriti `PathPrefix(`/omniroute `)` u spremnik bez `StripPrefix`, tako da Next.js prima `/omniroute/...` i poslužuje sredstva od `/omniroute/_next/...`.

Docker provjera stanja provjerava krajnju točku životnog ciklusa laganog `/healthz` s prefiksom aktivni `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` ostaje dostupan za human/dashboard dijagnostiku; za usmjeravanje spremnika HEALTHCHECK natrag na njega (na primjer za duboku provedbu zdravlja), postavite `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Taj put je a** duboko** provjerite (DB + sažetak praćenja) — prikladno za Docker rijedak `HEALTHCHECK` ako se ponovno uključite, ali** ne** za Kubernetes `livenessProbe` intervale.

Za orkestratore (Kubernetes, Nomad, itd.):

| Sonda                | Radije                                                              | Izbjegavati                                                     |
| -------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------- |
| Živost               | HTTP `GET /livez` ili TCP na glavnom portu (`PORT`, zadano `20128`) | `/api/monitoring/health` kao živost                             |
| Spremnost            | HTTP `GET /healthz`                                                 | Kratka vremena čekanja koja petlju događaja tretiraju kao mrtvu |
| Duboka / crna kutija | `/api/monitoring/health`                                            | —                                                               |

`/healthz` izvještava o životnom ciklusu procesa (`ok` / `starting` / `stopping`). `/livez` je samo proces živ (200 kad god se rukovatelj može pokrenuti; ne čeka spremnost). Oba još uvijek rade na istoj petlji događaja čvora kao rukovanje zahtjevima, tako da katalog ili kompresija vezani za CPU mogu odgoditi — busy ≠ dead. Preferirajte TCP živost ako HTTP sonde isteknu. Potpuno vođenje sonde: [Vodič za praćenje — Preporuke Kubernetes sonde](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose with Caddy (HTTPS Auto-TLS)

OmniRoute se može sigurno izložiti korištenjem Caddyjevog automatskog SSL opskrbljivanja. Osigurajte DNS A zapis vaše domene pokazuje na IP vašeg poslužitelja.

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

Caddy postavlja standardna zaglavlja za prosljeđivanje za uzvodni kontejner. OmniRoute koristi `NEXT_PUBLIC_BASE_URL` kao kanonsko javno izvorište za OAuth povratne pozive i generirane javne veze; autentificirani zapisi na nadzornoj ploči koriste zahtjeve istog porijekla plus CSRF zaštitu vezanu za sesiju. Omogućite `OMNIROUTE_TRUST_PROXY` samo za napredne implementacije gdje namjerno želite da OmniRoute izvede javno podrijetlo iz pouzdanih proslijeđenih zaglavlja umjesto eksplicitne konfiguracije.

## Cloudflare Quick Tunnel

Podrška nadzorne ploče za Docker implementacije uključuje **Cloudflare Quick Tunnel** koji se pokreće jednim klikom na `Dashboard → Endpoints`. Pri prvom omogućivanju `cloudflared` se preuzima samo ako je potreban, pokreće se privremeni tunel prema vašoj trenutačnoj `/v1` krajnjoj točki, a generirani URL `https://*.trycloudflare.com/v1` prikazuje se neposredno ispod vašeg uobičajenog javnog URL-a.

Paneli tunela krajnjih točaka (Cloudflare, Tailscale, ngrok) mogu se prikazati ili sakriti putem `Settings → Appearance` bez promjene stanja aktivnog tunela.

### Napomene o tunelima

- URL-ovi Quick Tunnela privremeni su i mijenjaju se nakon svakog ponovnog pokretanja.
- Quick Tunneli ne obnavljaju se automatski nakon ponovnog pokretanja OmniRoutea ili spremnika. Po potrebi ih ponovno omogućite putem nadzorne ploče.
- Upravljana instalacija trenutačno podržava Linux, macOS i Windows na arhitekturama `x64` / `arm64`.
- Upravljani Quick Tunneli prema zadanim postavkama koriste HTTP/2 prijenos kako bi se izbjegla bučna upozorenja o QUIC UDP međuspremniku u ograničenim okruženjima spremnika. Postavite `CLOUDFLARED_PROTOCOL=quic` ili `auto` ako želite drukčiji prijenos.
- Docker slike uključuju sistemske korijenske CA certifikate i prosljeđuju ih upravljanom programu `cloudflared`, čime se izbjegavaju pogreške pouzdanosti TLS-a prilikom pokretanja tunela unutar spremnika.
- Postavite `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ako želite da OmniRoute koristi postojeću binarnu datoteku umjesto preuzimanja nove.

## Oznake slika

| Slika                        | Označiti | Veličina | Opis                                                   |
| ---------------------------- | -------- | -------- | ------------------------------------------------------ |
| `cheaperinference/omniroute` | `latest` | ~ 250 MB | Najviša** objavljeno** stabilni SemVer (ne git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250 MB | Prikvačite ovu klasu oznake za GitOps                  |

Iste slike objavljuju se u tri repozitorija, s istim pregledima po arhitekturi: `cheaperinference/omniroute` (Docker Hub, organizacija Cheaper Inference, od 3.8.53 nadalje), `ghcr.io/cheaper-inference/omniroute` i naslijeđeni `diegosouzapw/omniroute`, koji čuva svoju povijest povlačenja i još uvijek prima svako izdanje. Postojeće `diegosouzapw/omniroute` implementacije stalno se ažuriraju; promjena naziva slike nije obavezna. `:next` / `:next-web` kanal prije izdanja u nastavku objavljen je samo na `diegosouzapw/omniroute` i GHCR.

Multi-platformski manifest: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automatski odabire odgovarajuću arhitekturu; proslijedite `--platform linux/amd64` ako trebate forsirati AMD64 emulaciju na ARM hostovima.

### Otpustite kanale

OmniRoute objavljuje zasebne Docker kanale za stabilna izdanja, aktivno testiranje ogranaka izdanja i razvojne verzije.

| Kanal                           | Izvor                                  | Promjenjivost                       | Preporučena uporaba                                                                                                   |
| ------------------------------- | -------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned izdanje               | Nepromjenjivo                       | Proizvodne implementacije koje određuju točno izdanje                                                                 |
| `:latest` / `:latest-web`       | Najviša** objavljeno** stabilan SemVer | Promjenjivi stabilni pokazivač      | Follows stable releases **after** a SemVer publish job — does **not** track `main` or unreleased `release/v*` commits |
| `:next` / `:next-web`           | Trenutačna zadana `release/v*` grana   | Promjenjivi pokazivač prije izdanja | Testiranje popravaka koji su stigli na granu aktivnog izdanja, ali još nisu u stabilnom izdanju                       |
| `:main` / `:main-web`           | `main` grana                           | Promjenjivi pokazivač razvoja       | Samo testiranje razvoja i integracije                                                                                 |

#### Pružatelji web-sesija: `-web` slike

Svaki gornji kanal služi i kao `-web` oznaka (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), izgrađena od `runner-web` faze — iste slike plus Playwright i preglednik Chromium. Šalje se obična slika** bez** Krom; `gemini-web`, `claude-web` i `claude-turnstile` to trebaju.

Neuspjeh je odgođen, a ne vrijeme pokretanja: ti davatelji navode svoje modele i prikazuju se kao povezani na nadzornoj ploči, a samo prvi zahtjev ne uspije s

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ako koristite te pružatelje, povucite `-web` oznaku kanala na kojem ste već — ništa se drugo ne mijenja. Na npm/CLI instalaciji (bez Docker slike), ekvivalentan dio koji nedostaje je binarni preglednik: pokrenite `npx playwright install chromium` na hostu.

#### Korištenje kanala prije objave

`next` kanal se ponovno gradi pri svakom pritisku na trenutnu zadanu granu `release/v*` i objavljuje se i za AMD64 i ARM64. Starije grane održavanja ne mogu ga prebrisati. Kanal pruža sliku koja se može povući za popravke koji su spojeni u granu aktivnog izdanja prije nego što se izreže sljedeća stabilna oznaka.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Za Docker Compose, poništite oznaku slike koju koristi odabrani profil, zatim povucite i ponovno kreirajte uslugu:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sigurnost i povratak

`next` je plutajući kanal prije izdanja. Može se promijeniti bilo kojim pritiskom na granu aktivnog izdanja i jest** nije podržan za proizvodnu upotrebu** . Prikvačite sažetak slike dok procjenjujete određenu verziju:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Prije testiranja napravite sigurnosnu kopiju OmniRoute volumena podataka ili direktorija podataka montiranog vezanjem. Za vraćanje, vratite prethodno korištenu stabilnu verziju ili sažetak i ponovno izradite spremnik:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Release-branch build nikada ne može pomaknuti `latest`; samo prihvatljiva stabilna semantička verzija može promovirati stabilni pokazivač. `next` slike zadržavaju inspekciju slike izdanja i blokiranje vrata KRITIČNE ranjivosti.

**`latest` nije jamstvo valute za git.** Spojeni popravci na `main` ili na aktivnoj `release/v*` grani su** ne** u `:latest` dok se ne objavi stabilna SemVer slika i posao objavljivanja promovira `:latest` (isti sažetak kao onaj SemVer). Ako `latest` izgleda zamrznuto dok GitHub već pokazuje popravak, povucite `:next` da testirate granu izdanja ili pričekajte oznaku SemVer.

| želite                                                                       | Koristiti                             |
| ---------------------------------------------------------------------------- | ------------------------------------- |
| GitOps / proizvodnja koja ne smije zalutati                                  | Prikvači `:X.Y.Z` (ili sažetak slike) |
| Slijedite objavljene staje i prihvatite ponovno stvaranje pri svakom izdanju | `:latest`                             |
| Testirajte neobjavljene `release/v*` obveze                                  | `:next` (nije proizvodnja)            |
| Test `main`                                                                  | `:main` (nije proizvodnja)            |

## Ažuriranja nadzorne ploče u Dockeru

Spremnik iz objavljene slike ne može zamijeniti sam sebe. Kada OmniRoute otkrije da se izvodi unutar
spremnika (nema `.git` radnog stabla i nije npm instalacija), natpis za ažuriranje na početnoj nadzornoj ploči prikazuje
naredbu koju treba pokrenuti na glavnom računalu umjesto npm/git uputa, uz gumb za kopiranje:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Naziv usluge dolazi iz `AUTO_UPDATE_SERVICE` (zadano `omniroute`, usluga u
`docker-compose.selfhost.yml`). `pull` pomiče samo plutajuću oznaku (`latest`, `next`); kod fiksirane
oznake `:X.Y.Z` najprije uredite oznaku.

### Ažuriranja jednim klikom s pomoću datoteke okidača na glavnom računalu

Kako bi **Ažuriraj sada** nastavio raditi bez montiranja `/var/run/docker.sock` (što spremniku daje
root pristup glavnom računalu — pogledajte upozorenje za profil `cli` iznad), postavite `DOCKER_UPDATE_TRIGGER_FILE` na
usluzi OmniRoute i pokrenite nadzornik na glavnom računalu:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Putanja mora biti unutar `DATA_DIR` (relativne vrijednosti razrješavaju se u odnosu na njega); sve ostalo se
odbija. **Ažuriraj sada** zatim zapisuje `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` u tu
datoteku, odgovara statusom `202`, a nadzorna ploča ispituje `/api/system/version` sve dok nova verzija ne postane aktivna
te se potom ponovno učitava. OmniRoute u ovom načinu rada nikada ne pokreće ljusku ni Docker naredbu. Kao i kod svake radnje
ažuriranja, zahtjev se prihvaća samo od klijenata na povratnoj petlji/LAN-u.

Direktorij podataka montiran povezivanjem daje glavnom računalu stabilnu putanju za nadzor. Primjeri `systemd` jedinica
(prilagodite `/srv/omniroute` direktoriju koji sadrži vašu compose datoteku i `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Nadzor zahtjeva za ažuriranje s nadzorne ploče OmniRoutea

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Preuzimanje i ponovno stvaranje spremnika OmniRoute

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

Usluga uklanja zahtjev prije preuzimanja kako se neuspjelo izvođenje ne bi ponavljalo u petlji. Bez
`DOCKER_UPDATE_TRIGGER_FILE` nadzorna ploča zadržava ručni tijek naredbi.

## Dostupnost: zadana SQLite je jedna replika

Stock Docker / Kubernetes OmniRoute je** jedan čvorni proces + jedan SQLite pisač** . Visoka dostupnost je** nije podržano** na toj topologiji.

| Ograničenje                           | Posljedica                                                                                                                                                                                                                                                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Jedan pisac                           | učiniti** ne** pokrenuti više replika na istoj SQLite datoteci. To kvari DB.                                                                                                                                                                                                                                       |
| Recreate / restart / HEALTHCHECK kill | **Potpuni prekid** SSE tijekom leta, sesija nadzorne ploče i stanja u memoriji. Svaki povezani klijent pada. Novi zahtjevi tijekom prozora prazne krajnje točke dobivaju obrnuti proxy**`502 Bad Gateway: Unknown error`** , a ne OmniRoute JSON — klijenti ne mogu razlikovati ovo od greške pružatelja (#11015). |
| Ista petlja događaja kao `/healthz`   | Zauzet katalog ili kompresija mogu odgoditi sonde; kratko vrijeme, a zatim ponovno pokreće** samo** replika.                                                                                                                                                                                                       |

**Matrica sonde** (pogledajte i [preporuke Kubernetes sonde](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sonda          | Cilj                                                     | Nemojte koristiti                                               |
| -------------- | -------------------------------------------------------- | --------------------------------------------------------------- |
| Živost         | TCP na `PORT` (zadano `20128`), ili meki HTTP `/healthz` | `/api/monitoring/health`                                        |
| Spremnost      | HTTP `GET /healthz`                                      | Kratka vremena čekanja koja petlju događaja tretiraju kao mrtvu |
| Duboko / ljudi | `/api/monitoring/health`                                 | Automatizirani kubelet liveness                                 |

**Nadogradnje:** očekujte pad svake sesije. Iscijedite klijente ako možete; nema tekućeg ažuriranja na zadanom SQLite. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` također će zamijeniti jedini proces kada je spremnik nezdrav — isti radijus eksplozije.

Gotovi manifesti i Helm grafikon žive u `deploy/kubernetes/` i `deploy/helm/omniroute/` — pogledajte [vodič za implementaciju Kubernetesa](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes isječak za a** jedna replika** (Potrebno je ponovno kreiranje; nemojte podizati `replicas` na jednu SQLite datoteku):

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

`preStop` spavanje dopušta kubeu ispuštanje krajnjih točaka usluge prije SIGTERM tako** novi** promet prestaje udarati u proces umiranja. `/v1/responses` SSE tijekom leta troši se do `SHUTDOWN_TIMEOUT_MS` (zadano 30s) putem zakupa ulaznice teške kategorije (#11015). Novi zahtjevi koji još uvijek stignu do procesa dobivaju `503` + `Retry-After: 5`. Ponovno kreiraj prazninu krajnje točke dok zamjena nije spremna ostaje težak prekid rada — to je SQLite topologija, a ne pogrešna konfiguracija sonde.

Vanjski Postgres / HA za više pisaca je** ne** dokumentirani dionički put. Ako trebate HA, zadržite jednu repliku ili pokrenite topologiju koju je projekt testirao i zasebno dokumentirao. Rad Postgres/MySQL živi u [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Do te isporuke, jedini podržani način razmnožavanja** velika** `/v1/responses` kapacitet je N neovisnih procesa (sljedeći odjeljak), a ne `replicas > 1` na jednom volumenu.

## Skaliranje: N neovisnih procesa

### vlasništvo rotacije Codex tokena

Kopije jednog Codex računa ne smiju samostalno trošiti svoj token za jednokratnu upotrebu. Na instancama koje troše samo sinkronizirane vjerodajnice, postavite `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Ostavite ga nepostavljenim na vlasniku jedne rotacije. Svaki proces i dalje treba svoj vlastiti `DATA_DIR`; ova opcija ne dijeli SQLite niti pruža sinkronizaciju tokena ili distribuirano zaključavanje.

Pasivna instanca ponovno čita vezu kada je potrebno osvježenje i usvaja samo drugačiji pristupni token koji nije istekao. Inače je osvježavanje onemogućeno bez isteka ili deaktivacije veze ili brojanja neuspjeha prekidača osvježavanja. Pravi uzvodni neuspjesi provjere autentičnosti i dalje koriste normalno obračunavanje neuspjeha, eksponencijalno hlađenje i normalnu pogrešku klijenta; deaktivacija računa ostaje trajna. Sinkronizirajte vlasnikove rotirane tokene prije nego što pristupni tokeni isteknu (zadano proaktivno osvježavanje je pet minuta) ili ponovno uvezite Codex autent datoteku. Pasivni uvozi pohranjuju isporučene tokene bez njihove provjere na krajnjoj točki tokena. Ručno dashboard/API osvježavanje vraća `409 refresh_disabled`; nove OAuth prijave su nepromijenjene. Vidi [referencu okoline](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Proces One Node je** jedna hrpa V8** . Dva preklapajuća ~ 3 MiB / ~ 750k-tokena agenta za kodiranje `POST /v1/responses` (RTK + Caveman) prekidaju tu gomilu na ~ 12 Gi (`FATAL ERROR: Reached heap limit`) i mogu OOM 16 Gi cgrupu. Vidi [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). To mjerenje je a** memorijski proračun** upozorenje, nije proizvod hard-max od dva istovremena duga `/v1/responses`. Pristup teškom chatu ograničen je automatski izvedenim proračunom za unos bajtova (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) veličine tog istog V8/cgroup stropa — nadjačavajući ga prema gore (ili postavljajući naslijeđeno `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ograničenje broja zahtjeva) na već određen proces ponovno uvodi prekid. Mali chatovi, `/healthz`, `/v1/models` i MCP su** ne** u toj kapi.

### Jednoprocesni: više od dva duga `/v1/responses`

A** zdrav** proces (hrpa ispod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, zadana `0.75`)** svibanj** pokrenuti više od dva istovremena duga `POST /v1/responses` kada proračun inflight-bajta za cijeli proces (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) još ima mjesta. Tijela na ili iznad `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (zadano 256 KiB) uzimaju isti teški zakup kao zahtjevi za strukturu i koriste isti [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Deseci istodobnih dugih SSE klijenata (operatorima je često potrebno 40–50) je a** memorijski proračun** pitanje — veličina heap + primary/headroom utori + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nije teško ograničenje proizvoda "max 2". Pritisnuta gomila i dalje odbacuje s `503` koji se može ponovno pokušati pa se #7849 ne vraća.

Do** umnožiti gomile** (neovisni stari prostori V8)** danas** :

| učiniti                                                                                                                                                   | nemojte                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Trčanje** N containers/pods** , svaki sa svojim** vlastiti** `DATA_DIR` / volumen                                                                         | Postavite `replicas > 1` na jednu SQLite datoteku                       |
| Veličina težak in-flight + zdrav-headroom from heap / inflight-byte proračun; 1–2 je konzervativna #7849 zadana vrijednost, a ne tvrdi maksimum proizvoda | Dajte jednom procesu 8 × RAM i ograničenje broja                        |
| Neobavezno: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` za** dijeljeni brojači kvota**                                                           | Tretirajte Redis kao zajednički SQLite — to nije                        |
| Duplicirajte tajne pružatelja usluga u svaku instancu (ili prihvatite podijeljene nadzorne ploče)                                                         | Očekujte jednu nadzornu ploču/jedan zapisnik poziva u svim instancama   |
| Prednji s bilo kojim balanserom tereta; dovoljan je sticky pomoću API ključa ili sesije                                                                   | Zahtijevajte međuprogram specifičan za dobavljača s obzirom na veličinu |

Afinitet sesije prema računu također se može dijeliti putem Redis: postavite `OMNIROUTE_SESSION_AFFINITY_STORE=redis` i `REDIS_URL` na svaki proces, s istim `REDIS_KEY_PREFIX` i pozitivnom `sessionAffinityTtlMs` postavkom. Pinovi rješavaju raspršene identitete korisničkih računa na odgovarajuću lokalnu vezu svakog procesa, tako da OAuth računi s podudarnim metapodacima o identitetu ne moraju imati odgovarajuću vezu IDs. Poznati identiteti računa imaju prednost pred kontradiktornim lokalnim IDs u rezoluciji pina i čuvanom izbacivanju; zapisi bez identiteta (ili pozivatelji deložacije bez identiteta) zadržavaju naslijeđeni ID guard. Računi bez stabilnog identiteta upotrebe i dalje zahtijevaju podudaranje IDs. Redis pogreške ili pozivi duži od 100 ms vraćaju se na lokalni SQLite. Svaki Redis affinity store ograničava izvanredne operacije na 8, zaobilazi Redis odmah kada je pun i oslobađa utore samo kada se temeljni posao riješi, a ne u roku pozivatelja. Tijekom ispada Redis nema zajedničke istine: svaka se instanca vraća na svoj lokalni afinitet, sesije se mogu ponovno prikvačiti jednom po instanci, a instance se mogu razilaziti. Ljepljivost ponovno konvergira kroz Redis kada se oporavi. Vremensko ograničenje ograničava čekanje, a ne poslani EVAL, koji može sletjeti nakon vraćanja. Usmjeravanje pisanja uspoređuje točnu vrijednost opaženu odlukom o usmjeravanju, a ne novo čitanje vremena mutacije; uočeni promašaj ili SQLite zamjensko opažanje uspoređuje se kao odsutni Redis ključ. Zastarjeli pinovi se zamjenjuju u jednom CAS, tako da kasna naredba ne može zamijeniti ili izbrisati noviji, drugačiji pin. Redis čita atomski vraća vrijednost i preostali poslužitelj TTL; pozitivan PTTL (ili bez isteka) određuje život, a ne piščeva JSON vremenska oznaka ili čitačev sat. Lokalne snimke preslikavaju taj preostali TTL na lokalni rok; postojeći JSON ključevi ostaju čitljivi i njihovi neobrađeni bajtovi se zadržavaju za CAS. Redis je jedini izvor istine dok odgovara. Potvrđeni dijeljeni dodaci, dodiri i brisanja uklanjaju lokalni unos, nikad ga ne instalirajte niti osvježavajte. SQLite na putu Redis drži samo vlastite rezervne odluke ove instance od grešaka Redis, isteka vremena ili zasićenja pristupa, ograničeno TTL-om kao i prije. Lokalni pin koji nedostaje pri kasnijem prekidu košta jedno novo odabiranje (jedan promašaj brze predmemorije), a ne pogrešan ili izbačen račun. Odbijeni upserti vraćaju dijeljenog pobjednika i njegov preostali TTL atomski: obični odabir ponovno provjerava mapirani lokalni rok i koristi još uvijek živog kvalificiranog pobjednika, dodirujući korištenje i prijavu za taj račun bez drugog dijeljenog pisanja. Ako nije dostupan, odabir zadržava lokalnog kandidata, ostavlja zajednički pin nepromijenjen i emitira jednu poruku o otklanjanju pogrešaka. Odbijeno CAS ne piše SQLite; Redis pogreške, isteci vremena ili zasićenost pristupa primjenjuju postojeću lokalnu operaciju umjesto toga. Ako odgovor na poslanu mutaciju stigne nakon isteka vremena (prihvaćeno, odbijeno ili pogreška), usporedba i brisanje sinkrone točne serijalizirane vrijednosti uklanja samo rezervni redak isteka vremena identičan bajtu. Nema čekanja između te usporedbe i brisanja; sačuvano je novije pisanje ispada. Čuvano izbacivanje uklanja vlastiti lokalni pin neuspjelog računa čak i kada je Redis isključen, i ponovno ga čisti nakon potvrđenog zajedničkog izbacivanja. Raniji dijeljeni odgovori na čekanju ne mogu vratiti izbačeni lokalni pin jer dijeljeni uspjesi nikada ne pišu SQLite. Kasniji zamjenski prekid može ponovno pričvrstiti račun; kasnije prihvaćeno zajedničko pisanje postoji samo u Redis. Redis promašaji ne konzultirajte lokalno rezervno stanje. S isključenim pokretačem, novoodabrani pinovi zadržavaju naslijeđeni oblik SQLite JSON s četiri polja; samo Redis usmjeravanje dodaje raspršeni identitet računa. Unaprijed odabrane pribadače ponovno se provjeravaju na granici isteka. Redis odabir bez zakupa ponovno čita pohranu, ali sinkrono planiranje zakupa još uvijek može koristiti pin izbačen između prethodnog dohvaćanja i planiranja (prihvaćeni prozor najboljeg pokušaja). Obveza zakupa ne može promijeniti račune nakon trajnog zahtjeva: na odbijenom upsert-u zadržava traženog kandidata samo za taj zahtjev i ostavlja zajedničkog pobjednika netaknutim, tako da je dogovor među instancama ograničen na tom putu. Ostatak tablice i dalje vrijedi: ovo ne dijeli stalnost kombinirane sesije, izvorne Codex pribadače, semafore računa, zaključavanja, ograničenja potrošnje, konfiguraciju ili zapisnike poziva.

Hardver: istovremeni dugi `/v1/responses` po instanci je a** memorijski proračun** pitanje (hrpa + inflight-byte / #10110). `N` neovisni `DATA_DIR` i dalje množi hrpe: host RAM mora pokrivati `N × cgroup`, a ne "jedan 16 Gi pod s N = 8." Nikada `replicas > 1` na jednoj SQLite datoteci.

Sastavite skicu (dvije hrpe, dva sveska — ne `deploy.replicas: 2`):

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

Gustoća tijekom procesa (kompresija HTTP izolata) je [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jedan logički klaster u zajedničkom trajnom stanju je [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Gemini regionalne pogreške unutar Docker

Google AI Studio / Gemini API može vratiti HTTP 400 sa FAILED_PRECONDITION i `User location is not supported for the API use.` Uspješan zahtjev na hostu ne dokazuje da spremnik koristi istu izlaznu rutu. DNS redoslijed, IPv4/IPv6 povezanost, VPN usmjeravanje i konfigurirani proxy mogu se razlikovati. Provjerite [Google podržane regije](https://ai.google.dev/gemini-api/docs/available-regions) kao i stvarnu rutu veze; ova greška sama po sebi ne identificira loš API ključ.

### Preferirajte proxy specifičan za vezu

Upotrijebite OmniRoute- [ovu proxy konfiguraciju po vezi](../ops/PROXY_GUIDE.md#4-level-proxy-system) za pogođenu Gemini vezu, a zatim ponovite** Testirajte vezu** i mali zahtjev za isti model. Ovo zadržava opseg promjene usmjeravanja na toj vezi. Provjerite je li proxy dostupan iz spremnika i je li ga veza stvarno izabrala. Promjena rute ne jamči uzvodnu regionalnu prihvatljivost.

### Usporedite umrežavanje hosta i spremnika

Neka ključ, model i zahtjev budu identični kada se uspoređuju autentificirani rezultati; nikad ne lijepite vjerodajnice, proxy lozinke ili potpuna autorizacijska zaglavlja u problem. Prvo provjerite koje obitelji adresa OS rezolver nudi, koristeći istu naredbu na hostu i unutar spremnika:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Zamijenite `omniroute` uslugom koju pokrećete (na primjer, `omniroute-web`). Ove naredbe ispisuju obitelji adresa bez vjerodajnica ili IP adresa. Vraćeni `6` prikazuje samo IPv6 DNS rezultat: pokazuje** ne** dokazati upotrebljivu IPv6 rutu ili API pristup. Gdje je instaliran `curl`, usporedite `curl -4 -I https://generativelanguage.googleapis.com` sa `curl -6 -I https://generativelanguage.googleapis.com` u oba okruženja. HTTP odgovor dokazuje povezanost te sonde, čak i ako se radi o neautentificiranoj pogrešci; samo ovjereni model zahtjeva testira podobnost Gemini.

### Alternativa na razini glavnog računala: radna politika IPv6 i rezolvera

Izvjestitelj [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) vratio je pristup u svom okruženju omogućivši spremnik IPv6 i promijenivši odabir glibc adrese. Tretirajte ovo kao alternativu specifičnu za okoliš. Potvrdite radni host IPv6, spremnik egress/routing i pravila vatrozida prije podešavanja preferenci razrješitelja. Privatna ULA adresa sama po sebi ne uspostavlja javnu IPv6 vezu.

Za usluge koje su već priključene na zadanu mrežu Composea, ovaj fragment omogućuje IPv6 na toj mreži; zadržite ostatak svoje usluge, portova, volumena i konfiguracije:

```yaml
networks:
  default:
    enable_ipv6: true
```

Za imenovanu mrežu omogućite je na mreži kojoj se usluga zapravo pridružuje. Docker može dodijeliti ULA podmrežu; odaberite eksplicitnu podmrežu koja se ne preklapa samo kada vaša mreža to zahtijeva. Pogledajte [mrežne opcije Docker IPv6](https://docs.docker.com/engine/daemon/ipv6/) i [Compose network](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Na a** glibc temeljena slika** , `/etc/gai.conf` može promijeniti odabir adrese. Trenutno spremište Dockerfile koristi Debian; prilagođene slike temeljene na musl-u ne dijele ovaj mehanizam. Prijavljena prilagodba mijenja oznaku ULA iz `label fc00::/7 6` u `label fc00::/7 1`. Počnite od potpune tablice pravila slike i sačuvajte ostale unose: dodavanje `label` ili `precedence` unosa zamjenjuje tu zadanu tablicu, tako da datoteka koja sadrži samo promijenjeni redak nije dovoljna. [Referenca glibc konfiguracije](https://github.com/bminor/glibc/blob/master/posix/gai.conf) dokumentira tu semantiku. Povežite pregledanu datoteku samo za čitanje na `/etc/gai.conf` i ponovno kreirajte uslugu da je primijenite.

Ovo mijenja odabir OS adrese za** sav odlazni promet u tom spremniku** . Ne prisiljava svaku aplikaciju da izabere IPv6: DNS redoslijed čvora i odabir veze također su važni. Konkretno, `--dns-result-order=ipv4first` preferira IPv4 i nije lijek za kvar IPv4-only a. Vidi [čvor DNS naručivanje](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Ponovno testirajte Gemini i svoje druge pružatelje nakon bilo kakve promjene na razini hosta. Da biste se vratili, uklonite prilagođeni `gai.conf` montiranje, vratite prethodnu konfiguraciju mreže i ponovno kreirajte pogođeni service/network tijekom perioda održavanja. Ponovno stvaranje mreže može prekinuti druge spremnike koji su joj pripojeni; nemojte brisati trajni volumen podataka.

## Važne napomene

- **SQLite WAL način rada:** Naredbi `docker stop` treba omogućiti da se dovrši kako bi OmniRoute mogao zapisati najnovije promjene natrag u `storage.sqlite` putem kontrolne točke. Priložene Compose datoteke već postavljaju razdoblje odgode zaustavljanja na 40 s. Ako izravno pokrećete sliku, zadržite `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Postavite na `true` ako se rutinskim sigurnosnim kopijama i sigurnosnim kopijama prije zapisivanja upravlja izvana. Migracije postojećih baza podataka i dalje zahtijevaju vlastitu trajnu sigurnosnu snimku i zaštitu od masovne migracije.
- **Postojanost podataka:** Uvijek montirajte volumen na `/app/data` kako biste sačuvali bazu podataka, ključeve i konfiguracije nakon ponovnog pokretanja spremnika.
- **Konfiguracija priključka:** Nadjačajte varijablu okruženja `PORT` kako biste promijenili zadani priključak `20128`.

## Pogledajte i

- [Vodič za implementaciju na VM-u](../ops/VM_DEPLOYMENT_GUIDE.md) — Postavljanje VM-a, nginx-a i Cloudflarea
- [Vodič za implementaciju na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementacija na Fly.io
- [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Potpuna referenca za `.env`
