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

## Brzo pokretanje

> **Želite samostalno hostiranje jednom naredbom?** Pogledajte
> [Vodič za samostalno hostiranje](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (objavljena slika +
> Redis, samo povratno sučelje, bez odabira profila). Brzo pokretanje u nastavku
> način je rada s jednim spremnikom za korisnike koji već pokreću Redis drugdje.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## S datotekom okruženja

```bash
# Najprije kopirajte i uredite .env
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

## Faze Dockerfilea

Repozitorij sadrži višefazni Dockerfile (`Dockerfile`). Dostupne su četiri faze; odaberite odgovarajući `target` za svoj slučaj upotrebe.

| Faza          | Osnovna slika         | Namjena                                                                                                                                                                                                                                                                                                     |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instalira ovisnosti (`npm ci --legacy-peer-deps`) i pokreće `npm run build` (Turbopack prema zadanim postavkama — pogledajte odjeljak Resursi tijekom izgradnje u nastavku)                                                                                                                                 |
| `runner-base` | `node:26-trixie-slim` | Produkcijsko izvršno okruženje sa samostalnim izlazom Next.js-a. **Ne sadrži CLI-je pružatelja.**                                                                                                                                                                                                           |
| `runner-cli`  | `runner-base`         | Dodaje `git`, `docker.io`, `docker-compose` i globalne CLI-je: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Odaberite ovu fazu za agentske tijekove rada.**                                                                                                                         |
| `runner-web`  | `runner-base`         | Dodaje Playwright i preglednik Chromium (`--with-deps`) za pružatelje web-sesija: `gemini-web`, `claude-web`, `claude-turnstile`. **Odaberite ovu fazu kada upotrebljavate te pružatelje** — obična slika bez nje ne uspijeva pri obradi zahtjeva (pogledajte napomenu o `-web` u odjeljku Kanali izdanja). |

Ručno izgradite određeni cilj:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Resursi tijekom izgradnje

Tri argumenta izgradnje određuju zahtjevnost faze `builder`. Primjenjuju se samo tijekom izgradnje —
`OMNIROUTE_MEMORY_MB` (u nastavku) zasebna je postavka za vrijeme izvođenja.

| Argument izgradnje          | Zadano | Učinak                                                                                           |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` gradi pomoću webpacka: manja vršna potrošnja memorije, ali sporije. `1` uključuje Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Gornja granica V8 hrpe (`--max-old-space-size`) za pokrenuti `next build`.                       |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Postavlja `CIRCLE_NODE_TOTAL`; Next izvodi `workers = N - 1` za prikupljanje podataka stranica.  |

`OMNIROUTE_BUILD_WORKERS` treba povećati na snažnom sustavu za izgradnju, a na njega
treba posumnjati kada izgradnja s ograničenim resursima prekine **nakon** poruke `✓ Compiled successfully`. Svaki
radni proces za podatke stranica zaseban je proces, kao i sam nadređeni proces `next build`;
reprodukcija na aktivnom VPS-u (problem #7518) izmjerila je vršni RSS svakog procesa na
~4.5 GB, neovisno o opciji hrpe `NODE_OPTIONS` (Turbopack kompilira u
izvornoj/Rust memoriji izvan V8 hrpe). Zadana vrijednost `2` (→ 1 radni proces, ukupno 2
procesa) prilagođena je GitHubovim hostanim izvršiteljima sa 16 GB / 4 vCPU-a koje
upotrebljava cjevovod za objavljivanje. Pri vrijednosti `8` (→ 7 radnih procesa) tom je izvršitelju ponestalo memorije i
buildkit je prekinuo korak pogreškom `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 radna procesa) i dalje nije stalo u memoriju nakon što je RSS po procesu izmjeren
izravno umjesto da bude procijenjen. `tests/unit/docker-build-memory-budget.test.ts`
izvodi izračun na temelju izmjerene vrijednosti i ne prolazi ako bilo koja postavka
preraste kapacitet izvršitelja.

Turbopack kompilira u izvornoj Rust memoriji koja se nalazi **izvan** V8 hrpe, pa je
`OMNIROUTE_BUILD_MEMORY_MB` ne ograničava. Na hostu s ograničenjem memorije
OOM killer tada prekida izgradnju signalom SIGKILL bez ikakvog teksta pogreške — ona se jednostavno
zaustavi usred koraka `Creating an optimized production build`, što izgleda kao zastoj, a ne
kao nedostatak memorije. Zato `Dockerfile` prema zadanim postavkama upotrebljava webpack
(`OMNIROUTE_USE_TURBOPACK=0`), za razliku od `npm run dev` / `npm run build`, gdje je
Turbopack zadani izbor u kodu: obični `docker build .` bez argumenata izgradnje (što
pokreću Railway i drugi hostovi s postavljanjem jednim klikom) ne smije se tiho prekinuti na
sustavu za izgradnju s ograničenom memorijom. Objavljene slike već eksplicitno prosljeđuju
`OMNIROUTE_USE_TURBOPACK=0` u datoteci `docker-publish.yml`. Na sustavu za izgradnju s mnogo RAM-a uključite
Turbopack radi brže izgradnje:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` je omogućen, pa `next build` pokreće nadređeni **i** radni
proces, a svaki zasebno poštuje `OMNIROUTE_BUILD_MEMORY_MB`. Ograničenje memorije spremnika
postavite iznad približno dvostruke vrijednosti, a ne samo iznad jedne.

Izmjereno na ovom stablu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Alat za objedinjavanje | Ograničenje spremnika | Rezultat                                            |
| ---------------------- | --------------------- | --------------------------------------------------- |
| Turbopack              | 8 GiB / 16 GiB        | OOM ga je prekinuo pri obje vrijednosti, bez poruke |
| webpack                | 8 GiB                 | radni proces izgradnje prekinut je signalom SIGKILL |
| webpack                | 12 GiB                | uspjelo, vršna potrošnja iznosila je 11.1 GiB       |

### Zadane postavke tijekom izvođenja

Zadane vrijednosti koje izvozi `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Ponašanje memorije u Dockeru:

- Slika postavlja `OMNIROUTE_MEMORY_MB=1024` i iz toga izvodi `NODE_OPTIONS=--max-old-space-size=1024`.
- Stvarni poslužiteljski proces pokreće samostalni pokretač, koji čita `OMNIROUTE_MEMORY_MB` i dodaje `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node koristi posljednju ponovljenu vrijednost `--max-old-space-size`, pa postavljanje varijable `OMNIROUTE_MEMORY_MB` određuje efektivno ograničenje heap memorije u Dockeru.
- Budući da je slika uvijek postavlja, pokretačeva vlastita pričuvna vrijednost prilagođena RAM-u nikada se ne primjenjuje u Dockeru. Izričito je povećajte za radno opterećenje (tablica u nastavku). `2048` je i dalje premalo za `/v1/responses` agenta za programiranje.

### Radna memorija za agente za programiranje

Zadana vrijednost od 1 GiB u Dockeru donja je granica za nadzornu ploču i lagani razgovor, a ne veličina za produkcijsko okruženje. Duga tijela zahtjeva `POST /v1/responses` (stotine poruka, deseci alata) tijekom kompresije zadržavaju više grafova u memoriji. Dva preklapajuća zahtjeva od ~3 MiB / ~750 tisuća tokena prekinula su V8 uz **12 GiB** old-space memorije (`FATAL ERROR: Reached heap limit`) te također dosegnula OOM ograničenje cgroupa od 16 GiB. Pogledajte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Postavite veličinu **cgroup memorije `--memory` iznad veličine heap memorije** — izvorni međuspremnici, SQLite i međurezultati kompresije nalaze se izvan V8 memorije.

| Radno opterećenje                                | `OMNIROUTE_MEMORY_MB`     | Kontejner / cgroup           | Napomene                                                                                                                |
| ------------------------------------------------ | ------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Nadzorna ploča, jedan lagani razgovor            | `1024` (zadano u slici)   | ≥2 GiB                       |                                                                                                                         |
| Jedan agent za programiranje (Claude/Codex/Grok) | `8192`                    | ≥10 GiB                      | Tipična pojedinačna sesija `/v1/responses`                                                                              |
| Dva istodobna duga zahtjeva `/v1/responses`      | `10240`–`12288`           | ≥12–16 GiB                   | Izmjeren prekid V8 pri ~12 GiB heap memorije                                                                            |
| Tri ili više istodobnih dugih konteksta          | nemojte na jednom procesu | serijalizirajte / više RAM-a | Zadano ograničenje zahtjevnih operacija jest 1 zahtjev u obradi; povećavanje bez dodatnog RAM-a ponovno uzrokuje prekid |

`omniroute serve` na fizičkom sustavu prilagođava vrijednost na ~35 % RAM-a (ograničeno na `[512, 4096]`) kada `OMNIROUTE_MEMORY_MB` **nije postavljen**. Docker uvijek postavlja `1024`, pa se to prilagođavanje nikada ne izvršava u službenoj slici.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## Obrnuti proxy na podputanji (Traefik / nginx)

Next.js `basePath` kompilira se u samostalni paket. OmniRoute bilježi ugrađenu
vrijednost u kontrolnu datoteku u korijenu aplikacije (zapisuje se tijekom `npm run build`; čita je
`scripts/docker/ensure-docker-base-path.mjs`) i uspoređuje je s
`OMNIROUTE_BASE_PATH` pri pokretanju spremnika. Kada se razlikuju, a slika je
izgrađena za korijen domene, ulazna točka prepravlja samostalne manifeste,
ugrađene literale `basePath`/`assetPrefix` (Next 16 iscrtava URL-ove SSR resursa samo iz
`assetPrefix` — alat za izmjene preslikava podputanju i u njega), ugrađene
URL-ove resursa `/_next/static` (manifesti referenci klijenta, uvozi medijskih sadržaja, unaprijed iscrtane
stranice pogrešaka) i klijentsku zamjenu za `process.env` prije pokretanja
`node dev/run-standalone.mjs`.

### Izgradnja pomoću Composea (preporučeno)

Postavite obje varijable u `.env`, a zatim ponovno izgradite kako bi slika i okruženje izvođenja bili usklađeni:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` prosljeđuje `OMNIROUTE_BASE_PATH` kao argument Dockerove izgradnje i kao
varijablu okruženja izvođenja.

### Unaprijed izgrađena korijenska slika + podputanja tijekom izvođenja

Objavljene slike `diegosouzapw/omniroute:*` izgrađene su za korijen domene. I dalje možete
postaviti `OMNIROUTE_BASE_PATH` tijekom izvođenja; spremnik jednokratno zakrpa paket pri pokretanju.
Uparite je s odgovarajućim javnim ishodištem:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurirajte obrnuti proxy da prosljeđuje **cijelu** vanjsku putanju (nemojte uklanjati
prefiks). Traefik treba usmjeravati `PathPrefix(`/omniroute`)` prema spremniku bez
`StripPrefix`, kako bi Next.js primao `/omniroute/...` i posluživao resurse iz
`/omniroute/_next/...`.

Dockerova provjera stanja ispituje laganu krajnju točku životnog ciklusa `/healthz`, kojoj je dodan
aktivni prefiks `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` ostaje dostupan za
dijagnostiku namijenjenu korisnicima/nadzornim pločama; kako biste HEALTHCHECK spremnika ponovno usmjerili na njega (primjerice
radi provođenja dubinske provjere stanja), postavite `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ta je putanja **dubinska** provjera (baza podataka + sažetak nadzora) — prikladna za Dockerov
rijetki `HEALTHCHECK` ako ga odlučite ponovno uključiti, ali **nije** prikladna za intervale Kubernetesova
`livenessProbe`.

Za orkestratore (Kubernetes, Nomad itd.):

| Provjera            | Preporučeno                                                              | Izbjegavati                                                               |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Aktivnost           | HTTP `GET /livez` ili TCP na glavnom priključku (`PORT`, zadano `20128`) | `/api/monitoring/health` kao provjeru aktivnosti                          |
| Spremnost           | HTTP `GET /healthz`                                                      | Kratka vremenska ograničenja koja zauzetu petlju događaja smatraju mrtvom |
| Dubinska / blackbox | `/api/monitoring/health`                                                 | —                                                                         |

`/healthz` izvještava o životnom ciklusu procesa (`ok` / `starting` / `stopping`). `/livez` je
samo provjera aktivnosti procesa (200 kad god se rukovatelj može pokrenuti; ne čeka
spremnost). Obje se i dalje izvršavaju u istoj Node petlji događaja kao i obrada zahtjeva, pa ih
rad na katalogu ili kompresiji koji intenzivno opterećuje CPU može odgoditi — zauzeto ≠ mrtvo. Ako HTTP
provjere isteknu, prednost dajte TCP provjeri aktivnosti. Potpune smjernice za provjere:
[Vodič za nadzor — preporuke za Kubernetes provjere](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose s Caddyjem (HTTPS Auto-TLS)

OmniRoute se može sigurno izložiti pomoću Caddyjeva automatskog postavljanja SSL-a. Provjerite pokazuje li DNS A zapis vaše domene na IP adresu vašeg poslužitelja.

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
      # Izvor vidljiv pregledniku za OAuth povratne pozive, poveznice nadzorne ploče i generirane javne URL-ove.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interni URL između poslužitelja za zakazane zadatke / dohvaćanja samog servisa.
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

Caddy postavlja standardna zaglavlja za prosljeđivanje prema nadređenom spremniku. OmniRoute koristi
`NEXT_PUBLIC_BASE_URL` kao kanonsko javno izvorište za OAuth povratne pozive i generirane javne
poveznice; autentificirani zahtjevi za zapisivanje s nadzorne ploče upotrebljavaju zahtjeve istog izvorišta uz CSRF
zaštitu povezanu sa sesijom. Omogućite `OMNIROUTE_TRUST_PROXY` samo za napredne implementacije u kojima namjerno
želite da OmniRoute određuje javno izvorište iz pouzdanih proslijeđenih zaglavlja umjesto izričite
konfiguracije.

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

| Slika                    | Oznaka   | Veličina | Opis                                                   |
| ------------------------ | -------- | -------- | ------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB   | Najviši **objavljeni** stabilni SemVer (ne git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB   | Fiksirajte ovu klasu oznake za GitOps                  |

Višeplatformski manifest: izvorni `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automatski odabire odgovarajuću arhitekturu; proslijedite `--platform linux/amd64` ako trebate prisiliti emulaciju AMD64 na ARM računalima.

### Kanali izdanja

OmniRoute objavljuje zasebne Docker kanale za stabilna izdanja, testiranje aktivne grane izdanja i razvojne međuverzije.

| Kanal                           | Izvor                                  | Promjenjivost                    | Preporučena upotreba                                                                                                          |
| ------------------------------- | -------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Potpisano/verzionirano izdanje         | Nepromjenjiv                     | Produkcijske implementacije koje su fiksirane na točno određeno izdanje                                                       |
| `:latest` / `:latest-web`       | Najviši **objavljeni** stabilni SemVer | Promjenjiv stabilni pokazivač    | Prati stabilna izdanja **nakon** zadatka objave SemVera — **ne** prati `main` ni neobjavljene potvrde na granama `release/v*` |
| `:next` / `:next-web`           | Trenutačna zadana grana `release/v*`   | Promjenjiv pokazivač predizdanja | Testiranje ispravaka koji su stigli na aktivnu granu izdanja, ali još nisu dio stabilnog izdanja                              |
| `:main` / `:main-web`           | Grana `main`                           | Promjenjiv razvojni pokazivač    | Samo za razvojno i integracijsko testiranje                                                                                   |

#### Davatelji web-sesija: slike `-web`

Svaki prethodno navedeni kanal dostupan je i kao oznaka `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), izgrađena iz faze `runner-web` — to je ista slika uz Playwright i preglednik Chromium. Obična slika isporučuje se **bez** Chromiuma; `gemini-web`, `claude-web` i `claude-turnstile` ga zahtijevaju.

Pogreška je odgođena i ne pojavljuje se pri pokretanju: ti davatelji navode svoje modele i prikazuju se kao povezani na nadzornoj ploči, a tek prvi zahtjev završava neuspješno uz

```
[500]: Učitavanje vanjskog modula playwright nije uspjelo: Pogreška: Modul nije moguće pronaći
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ako upotrebljavate te davatelje, preuzmite oznaku `-web` kanala koji već koristite — ništa se drugo ne mijenja. Kod npm/CLI instalacije (bez Docker slike) nedostajući ekvivalent je binarna datoteka preglednika: pokrenite `npx playwright install chromium` na glavnom računalu.

#### Upotreba kanala predizdanja

Kanal `next` ponovno se izgrađuje pri svakom slanju promjena na trenutačnu zadanu granu `release/v*` i objavljuje se za AMD64 i ARM64. Starije grane za održavanje ne mogu ga prebrisati. Kanal pruža sliku koja se može dohvatiti, a sadrži ispravke spojene u aktivnu granu izdanja prije izrade sljedeće stabilne oznake.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Za Docker Compose nadjačajte oznaku slike koju koristi odabrani profil, zatim dohvatite sliku i ponovno stvorite uslugu:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sigurnost i vraćanje na prethodnu verziju

`next` je promjenjivi kanal predizdanja. Može se promijeniti pri svakom slanju promjena na aktivnu granu izdanja i **nije podržan za produkcijsku upotrebu**. Prilikom procjene određene međuverzije prikvačite sažetak slike:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Prije testiranja izradite sigurnosnu kopiju podatkovnog volumena OmniRoutea ili podatkovnog direktorija montiranog povezivanjem. Za vraćanje na prethodno stanje obnovite prethodno korištenu stabilnu verziju ili sažetak te ponovno stvorite spremnik:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Međuverzija grane izdanja nikada ne može pomaknuti `latest`; stabilni pokazivač može unaprijediti samo prihvatljiva stabilna semantička verzija. Slike `next` zadržavaju provjeru slike izdanja i blokirajuća vrata za CRITICAL ranjivosti.

**`latest` nije jamstvo aktualnosti u odnosu na git.** Spojeni ispravci na grani `main` ili aktivnoj grani `release/v*` **ne nalaze se** u `:latest` sve dok se ne objavi stabilna SemVer slika i zadatak objavljivanja ne unaprijedi `:latest` (isti sažetak kao za taj SemVer). Ako se čini da je `latest` zamrznut, a GitHub već prikazuje ispravak, dohvatite `:next` kako biste testirali granu izdanja ili pričekajte SemVer oznaku.

| Želite                                                                                | Upotrijebite                            |
| ------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / produkciju koja ne smije odstupati                                           | Prikvačite `:X.Y.Z` (ili sažetak slike) |
| Pratiti objavljena stabilna izdanja i prihvatiti ponovno stvaranje pri svakom izdanju | `:latest`                               |
| Testirati neobjavljene promjene grane `release/v*`                                    | `:next` (nije za produkciju)            |
| Testirati `main`                                                                      | `:main` (nije za produkciju)            |

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

## Horizontalno skaliranje: N neovisnih procesa

Jedan Node proces predstavlja **jednu V8 hrpu**. Dva preklapajuća zahtjeva agenta za kodiranje `POST /v1/responses` (RTK + Caveman), svaki veličine ~3 MiB / ~750k tokena, ruše tu hrpu na ~12 Gi (`FATAL ERROR: Reached heap limit`) i mogu uzrokovati OOM u cgroupu od 16 Gi. Pogledajte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). To mjerenje upozorava na **memorijski proračun**, a nije strogo ograničenje proizvoda na dva istodobna duga zahtjeva `/v1/responses`. Prihvat zahtjevnih razgovora ograničen je automatski izvedenim proračunom ulaznih bajtova (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) određenim prema istoj granici V8-a/cgroupa — povećavanje te vrijednosti (ili postavljanje starog ograničenja broja zahtjeva `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) na procesu koji je već dimenzioniran ponovno uzrokuje rušenje. Mali razgovori, `/healthz`, `/v1/models` i MCP **nisu** obuhvaćeni tim ograničenjem.

### Jedan proces: više od dva duga zahtjeva `/v1/responses`

**Zdrav** proces (hrpa ispod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, zadano `0.75`) **može** izvršavati više od dva istodobna duga zahtjeva `POST /v1/responses` kada u proračunu bajtova zahtjeva u obradi na razini cijelog procesa (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) još ima prostora. Tijela veličine jednake ili veće od `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (zadano 256 KiB) zauzimaju isti zakup za zahtjevna opterećenja kao i strukturno zahtjevni zahtjevi te koriste isti izlaz `tryAcquireHealthyHeadroom` iz [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Deseci istodobnih dugotrajnih SSE klijenata (operatorima je često potrebno 40–50) pitanje su **memorijskog proračuna** — dimenzionirajte hrpu + primarne/dodatne utore + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — a ne strogog ograničenja proizvoda na „najviše 2”. Proces s opterećenom hrpom i dalje odbacuje zahtjeve uz ponovljivu pogrešku `503` kako se problem #7849 ne bi vratio.

Za **umnožavanje hrpa** (neovisnih starih prostora V8-a) **danas**:

| Učinite                                                                                                                                                                                                     | Nemojte                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Pokrenite **N kontejnera/podova**, svaki sa **svojim** `DATA_DIR` / volumenom                                                                                                                               | Postaviti `replicas > 1` nad jednom SQLite datotekom                              |
| Dimenzionirajte zahtjevne zahtjeve u obradi + dodatni kapacitet zdravog procesa prema proračunu hrpe / bajtova u obradi; 1–2 konzervativna je zadana vrijednost za #7849, a ne strogo ograničenje proizvoda | Dodijeliti jednom procesu 8× više RAM-a i neograničeno ograničenje broja zahtjeva |
| Neobavezno: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` za **dijeljene brojače kvota**                                                                                                             | Smatrati Redis dijeljenim SQLiteom — nije to                                      |
| Duplicirajte tajne pružatelja u svakoj instanci (ili prihvatite odvojene nadzorne ploče)                                                                                                                    | Očekivati jednu nadzornu ploču / jedan zapisnik poziva za sve instance            |
| Postavite bilo koji balanser opterećenja ispred instanci; dovoljno je održavanje afiniteta prema API ključu ili sesiji                                                                                      | Zahtijevati posrednički sloj određenog dobavljača koji uzima u obzir veličinu     |

Hardver: broj istodobnih dugih zahtjeva `/v1/responses` po instanci pitanje je **memorijskog proračuna** (hrpa + bajtovi zahtjeva u obradi / #10110). `N` neovisnih direktorija `DATA_DIR` i dalje umnožava hrpe: RAM glavnog računala mora pokriti `N × cgroup`, a ne „jedan pod od 16 Gi s N=8”. Nikada nemojte koristiti `replicas > 1` nad jednom SQLite datotekom.

Primjer za Compose (dvije hrpe, dva volumena — ne `deploy.replicas: 2`):

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

Gustoća unutar procesa (kompresija izvan HTTP izolata) obrađena je u [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jedan logički klaster na dijeljenom trajnom stanju obrađen je u [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionalne pogreške Geminija unutar Dockera

Google AI Studio / Gemini API može vratiti HTTP 400 sa statusom FAILED_PRECONDITION i porukom
`Lokacija korisnika nije podržana za upotrebu API-ja.` Uspješan zahtjev na glavnom računalu
ne dokazuje da spremnik koristi istu izlaznu rutu. Redoslijed DNS-a,
IPv4/IPv6 povezivost, VPN usmjeravanje i konfigurirani proxyji mogu se razlikovati. Provjerite
[Googleove podržane regije](https://ai.google.dev/gemini-api/docs/available-regions)
kao i stvarnu rutu veze; sama ova pogreška ne ukazuje na neispravan API ključ.

### Dajte prednost proxyju specifičnom za vezu

Upotrijebite OmniRouteovu [konfiguraciju proxyja za pojedinačnu vezu](../ops/PROXY_GUIDE.md#4-level-proxy-system)
za zahvaćenu Gemini vezu, a zatim ponovite **Testiranje veze** i mali zahtjev
s istim modelom. Time promjena usmjeravanja ostaje ograničena na tu vezu. Provjerite
je li proxy dostupan iz spremnika i odabire li ga veza doista.
Promjena rute ne jamči da će udaljena usluga smatrati regiju prihvatljivom.

### Usporedite mrežne postavke glavnog računala i spremnika

Pri usporedbi autentificiranih rezultata ključ, model i zahtjev moraju ostati identični; nikada
ne lijepite vjerodajnice, lozinke proxyja ili potpuna autorizacijska zaglavlja u prijavu problema.
Najprije provjerite koje obitelji adresa nudi razrješivač operacijskog sustava koristeći istu naredbu
na glavnom računalu i unutar spremnika:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Zamijenite `omniroute` servisom koji pokrećete (na primjer, `omniroute-web`). Ove
naredbe ispisuju obitelji adresa bez vjerodajnica ili IP adresa. Vraćena vrijednost `6`
pokazuje samo IPv6 DNS rezultat: ona **ne** dokazuje postojanje upotrebljive IPv6 rute ni pristupa API-ju.
Gdje je instaliran `curl`, usporedite `curl -4 -I https://generativelanguage.googleapis.com`
s `curl -6 -I https://generativelanguage.googleapis.com` u oba okruženja.
HTTP odgovor dokazuje povezivost za tu provjeru, čak i ako je riječ o pogrešci zbog izostanka autentifikacije;
samo autentificirani zahtjev modelu provjerava ispunjava li okruženje uvjete za pristup Geminiju.

### Alternativa na razini glavnog računala: funkcionalan IPv6 i pravila razrješivača

Autor prijave [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) ponovno je uspostavio
pristup u svojem okruženju omogućavanjem IPv6 podrške za spremnike i promjenom glibc odabira adresa.
Smatrajte to alternativom specifičnom za okruženje. Prije prilagodbe preferencija razrješivača potvrdite
da IPv6 na glavnom računalu radi te provjerite izlaznu vezu/usmjeravanje spremnika i pravila vatrozida.
Sama privatna ULA adresa ne potvrđuje javnu IPv6 povezivost.

Za servise koji su već povezani sa zadanom Compose mrežom, ovaj fragment omogućuje
IPv6 na toj mreži; zadržite ostatak konfiguracije servisa, priključaka, volumena i ostalih postavki:

```yaml
networks:
  default:
    enable_ipv6: true
```

Za imenovanu mrežu omogućite IPv6 na mreži s kojom se servis doista povezuje. Docker može
dodijeliti ULA podmrežu; odaberite izričitu podmrežu koja se ne preklapa samo kada to vaša mreža
zahtijeva. Pogledajte [Dockerovo IPv6 umrežavanje](https://docs.docker.com/engine/daemon/ipv6/)
i [opcije Compose mreže](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Na **slici temeljenoj na glibc-u**, `/etc/gai.conf` može promijeniti odabir adresa. Trenutačni
Dockerfile repozitorija koristi Debian; prilagođene slike temeljene na musl-u nemaju isti mehanizam.
Prijavljena prilagodba mijenja ULA oznaku iz `label fc00::/7 6` u
`label fc00::/7 1`. Počnite s potpunom tablicom pravila slike i sačuvajte ostale
unose: dodavanje unosa `label` ili `precedence` zamjenjuje tu zadanu tablicu, stoga datoteka
koja sadrži samo promijenjeni redak nije dovoljna.
[Referenca konfiguracije glibc-a](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumentira tu semantiku. Pregledanu datoteku montirajte kao povezani, samo-za-čitanje resurs na `/etc/gai.conf`
i ponovno izradite servis kako biste primijenili promjenu.

Time se mijenja odabir adresa operacijskog sustava za **sav izlazni promet iz tog spremnika**.
To ne prisiljava svaku aplikaciju da odabere IPv6: važni su i Nodeov redoslijed DNS-a te
odabir veze. Konkretno, `--dns-result-order=ipv4first` daje prednost IPv4 protokolu i
nije rješenje za kvar ograničen na IPv4. Pogledajte [redoslijed DNS-a u Nodeu](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Nakon svake promjene na razini glavnog računala ponovno testirajte Gemini i druge pružatelje usluga. Za vraćanje promjena
uklonite prilagođeno montiranje datoteke `gai.conf`, vratite prethodnu mrežnu konfiguraciju i
ponovno izradite zahvaćeni servis/mrežu tijekom razdoblja održavanja. Ponovna izrada mreže
može prekinuti rad drugih spremnika povezanih s njom; nemojte brisati trajni podatkovni volumen.

## Važne napomene

- **SQLite WAL način rada:** Naredbi `docker stop` treba omogućiti da se dovrši kako bi OmniRoute mogao zapisati najnovije promjene natrag u `storage.sqlite` putem kontrolne točke. Priložene Compose datoteke već postavljaju razdoblje odgode zaustavljanja na 40 s. Ako izravno pokrećete sliku, zadržite `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Postavite na `true` ako se rutinskim sigurnosnim kopijama i sigurnosnim kopijama prije zapisivanja upravlja izvana. Migracije postojećih baza podataka i dalje zahtijevaju vlastitu trajnu sigurnosnu snimku i zaštitu od masovne migracije.
- **Postojanost podataka:** Uvijek montirajte volumen na `/app/data` kako biste sačuvali bazu podataka, ključeve i konfiguracije nakon ponovnog pokretanja spremnika.
- **Konfiguracija priključka:** Nadjačajte varijablu okruženja `PORT` kako biste promijenili zadani priključak `20128`.

## Pogledajte i

- [Vodič za implementaciju na VM-u](../ops/VM_DEPLOYMENT_GUIDE.md) — Postavljanje VM-a, nginx-a i Cloudflarea
- [Vodič za implementaciju na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementacija na Fly.io
- [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Potpuna referenca za `.env`
