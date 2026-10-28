# 🐳 Docker Guide — OmniRoute (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Potpuna referenca za implementaciju putem Dockera. Za brzi početak pogledajte [Docker odjeljak u README-u](../README.md#-docker).

## Sadržaj

- [Brzo pokretanje](#quick-run)
- [S datotekom okruženja](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Dostupni profili](#available-profiles)
- [Konfiguriranje CLI alata na hostu kada OmniRoute radi u Dockeru](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis pomoćni kontejner](#redis-sidecar)
- [Produkcijski Compose](#production-compose)
- [Faze Dockerfilea](#dockerfile-stages)
- [Kritične varijable okruženja](#critical-environment-variables)
- [Docker Compose s Caddyjem (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare brzi tunel](#cloudflare-quick-tunnel)
- [Oznake slika](#image-tags)
- [Ažuriranja kontrolne table u Dockeru](#dashboard-updates-in-docker)
- [Dostupnost: zadani SQLite podržava jednu repliku](#availability-default-sqlite-is-single-replica)
- [Gemini regionalne greške unutar Dockera](#gemini-regional-errors-inside-docker)
- [Važne napomene](#important-notes)

---

## Brzo pokretanje

> **Samostalno hostovanje jednom naredbom?** Pogledajte
> [Vodič za samostalno hostovanje](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (objavljena slika +
> Redis, samo povratna petlja, bez izbora profila). Brzo pokretanje u nastavku
> predstavlja postupak s jednim kontejnerom za korisnike koji Redis već pokreću drugdje.

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
# Prvo kopirajte i uredite .env
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

# Profil hosta (prvenstveno za Linux; montira CLI izvršne datoteke hosta samo za čitanje)
docker compose --profile host up -d

# Web profil (Chromium/Playwright za pružaoce web sesija)
docker compose --profile web up -d

# Kombinirajte CLI i CLIProxyAPI pomoćni kontejner
docker compose --profile cli --profile cliproxyapi up -d
```

## Dostupni profili

OmniRoute isporučuje Compose profile za glavne vrste implementacije. Odaberite onaj koji odgovara vašem okruženju.

| Profil          | Usluga           | Kada koristiti                                                                                                                                                   | Naredba                                      |
| --------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (zadano) | `omniroute-base` | Server bez grafičkog interfejsa / minimalno izvršno okruženje, bez uključenih CLI alata pružalaca                                                                | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Agentski tokovi rada koji pozivaju `omniroute providers/setup/doctor` i uključene CLI alate (Codex, Claude Code, Droid, OpenClaw)                                | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Linux hostovi kojima je potreban pristup CLI alatima hosta nalik opciji `network_mode`, montiranjem `~/.local/bin`, `~/.codex`, `~/.claude` itd. samo za čitanje | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Pokrenite pomoćni kontejner [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na portu `8317` za posredovanje prema nadređenim CLI servisima           | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | Pružaoci web sesija kojima je potreban preglednik: `gemini-web`, `claude-web`, `claude-turnstile` (gradi `runner-web`, Chromium je uključen)                     | `docker compose --profile web up -d`         |

> Moguće je kombinirati više profila: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfiguriranje host CLI alata kada se OmniRoute izvršava u Dockeru

`omniroute setup-codex`, `setup-claude`, `config set <tool>` i dugme
**Sačuvaj konfiguraciju** na kontrolnoj ploči zapisuju datoteke poput `~/.codex/*.config.toml`. Te putanje
imaju značenje samo na računaru na kojem se CLI stvarno izvršava. Ako ih pokrenete unutar
kontejnera, zapisivanje završava u vlastitom početnom direktoriju kontejnera (`/home/node` —
slika se izvršava kao `USER node`), odakle ga nijedan host CLI nikada neće pročitati i gdje se
odbacuje čim se kontejner ponovo kreira.

OmniRoute ovo otkriva i odbija zapisivanje uz prikaz uputa umjesto
prijavljivanja uspjeha koji ne možete iskoristiti: CLI završava s kodom `2`, a API odgovara statusom `422`
uz `containerEphemeralTarget: true`.

### Preporučeno: pokrenite CLI na hostu, a OmniRoute u Dockeru

Kontejner poslužuje API; CLI konfigurira vaše host alate.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # usmjerite CLI na kontejner
omniroute setup-codex                      # zapisuje stvarni ~/.codex na vašem hostu
```

Ovo je pravi izbor kada se Codex, Claude Code, Cursor ili slični alati izvršavaju na vašem
laptopu — što je uobičajena postavka.

### Alternativa: bind-mount direktorija host konfiguracije (`host` profil)

Ako želite da sam kontejner zapisuje vašu host konfiguraciju, montirajte
direktorije i usmjerite `CLI_CONFIG_HOME` na korijen tačke montiranja. Profil `host`
to već radi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount čini putanju pouzdanom: OmniRoute čita
`/proc/self/mountinfo` i dozvoljava zapisivanje na montirane putanje (i u direktorije
čija su djeca tačke montiranja, što je upravo struktura `/host-home` iznad), dok
i dalje odbija nemontirane putanje.

### Izlaz u nuždi: konfigurirajte vlastite CLI alate kontejnera (koristite štedljivo)

Kada se CLI alati zaista nalaze unutar kontejnera (profil `cli`), zapisivanje
je namjerno. Proslijedite `--allow-container-write` bilo kojoj naredbi `setup-*` ili postavite
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` za server. Zapisivanje se izvršava
uz upozorenje da neće preživjeti ponovno kreiranje kontejnera.

> **Sigurnosno upozorenje — profil `cli` + montiranje `docker.sock`.**
> Profil `cli` bind-mounta `/var/run/docker.sock` kako bi program za automatsko ažuriranje
> unutar kontejnera mogao ponovo kreirati stack putem host daemona
> (`src/lib/system/autoUpdate.ts` provjerava prisustvo tog socketa i preskače
> Docker putanju kada nije prisutan). Taj socket predstavlja **granicu povjerenja s root pristupom hostu**:
> sve što mu može pristupiti upravlja host Docker daemonom kao
> root — može kreirati, pregledavati, zaustavljati i uklanjati bilo koji kontejner na hostu.
> Posljedice:
>
> 1. **Nikada ne izlažite port profila `cli` mreži.** Objavite
>    ga na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` dostupan putem LAN-a pretvara svaki RCE na nivou kontrolne ploče u
>    potpuno kompromitiranje hosta.
> 2. **Nemojte bind-mountati dodatne host direktorije u profil `cli`.**
>    Docker socket uz bilo koje dodatno montiranje daje kontejneru puni
>    pristup za čitanje i pisanje vašeg datotečnog sistema i host konfiguracije. Ako alat treba
>    pristup projektu, pokrenite ga lokalno pomoću CLI binarne datoteke — nemojte ga montirati
>    u `cli` kontejner.
>
> Ako vam nije potrebno automatsko ažuriranje unutar kontejnera, nemojte uključivati profil `cli`
> (`COMPOSE_PROFILES=core,redis` ili kraće). Ostali profili ne
> montiraju Docker socket.
>
> Pogledajte `docs/security/MITM-TPROXY-DECRYPT.md` (git; nije uključen u `/docs`) za povezani model prijetnji
> u vezi s MITM-om i `docs/security/SUPPLY_CHAIN.md` za lanac porijekla binarnih datoteka
> `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute se oslanja na Redis za distribuirani limitator brzine i dijeljeni keš. Servis `redis` je **uvijek definisan** u datoteci `docker-compose.yml` (nije ograničen profilom) i pokreće se zajedno sa svakim drugim profilom.

| Detalj                 | Vrijednost                                |
| ---------------------- | ----------------------------------------- |
| Slika                  | `redis:7-alpine`                          |
| Naziv kontejnera       | `omniroute-redis`                         |
| Interni port           | `6379`                                    |
| Port hosta (zamjena)   | `REDIS_PORT` (zadano je `6379`)           |
| Adresa hosta (zamjena) | `REDIS_BIND_HOST` (zadano je `127.0.0.1`) |
| Volumen                | `omniroute-redis-data` → `/data`          |
| Provjera ispravnosti   | `redis-cli ping` (interval od 10 s)       |

Povezane varijable okruženja:

- `REDIS_URL` — string veze koji se prosljeđuje aplikaciji (zadano je `redis://redis:6379`).
- `REDIS_PORT` — mapiranje porta na strani hosta za Redis kontejner.
- `REDIS_BIND_HOST` — interfejs hosta na kojem se port objavljuje. Zadano je `127.0.0.1`.

> **Zašto je zadana povratna petlja:** sidecar se pokreće bez opcije `requirepass`, a kontejneri
> aplikacije pristupaju mu preko compose mreže (`redis:6379`) — objavljeni port služi
> samo za alate na strani hosta (`redis-cli`, lokalni `npm run dev`). Objavljivanje na
> `0.0.0.0` izložilo bi Redis bez autentifikacije svakom hostu na vašoj lokalnoj mreži. Ako postavite
> `REDIS_BIND_HOST=0.0.0.0`, također dodajte `--requirepass` u `command:` servisa.

**Onemogućavanje Redisa** se ne preporučuje (limitator brzine će prijeći na rezervno rješenje u memoriji). Ako to ipak morate učiniti, uklonite/komentarišite blok servisa `redis:` u datoteci `docker-compose.yml` ili ga skalirajte na nulu:

```bash
docker compose up -d --scale redis=0
```

## Produkcijski Compose

Za izolovanu produkcijsku instancu koja se izvršava paralelno s razvojnim okruženjem koristite `docker-compose.prod.yml`.

| Detalj                      | Vrijednost                                                                          |
| --------------------------- | ----------------------------------------------------------------------------------- |
| Datoteka                    | `docker-compose.prod.yml`                                                           |
| Zadani port kontrolne ploče | `PROD_DASHBOARD_PORT=20130` (mapiran na interni `${DASHBOARD_PORT:-20128}`)         |
| Zadani API port             | `PROD_API_PORT=20131`                                                               |
| Slika                       | `omniroute:prod` (izgrađena iz cilja `runner-cli`)                                  |
| Redis kontejner             | `omniroute-redis-prod` (`redis:8.6.2`, namjenski volumen `redis-prod-data`)         |
| Volumen podataka            | `omniroute-prod-data` (imenovan, zadržava se nakon ponovnih izgradnji)              |
| Provjere ispravnosti        | `node healthcheck.mjs` + `redis-cli ping`, uz `depends_on` uslovljen stanjem Redisa |

Način korištenja:

```bash
# Izgradite i pokrenite produkcijski skup servisa
docker compose -f docker-compose.prod.yml up -d --build

# Pratite zapise u stvarnom vremenu
docker compose -f docker-compose.prod.yml logs -f

# Zaustavite i uklonite skup servisa (zadržite volumene)
docker compose -f docker-compose.prod.yml down
```

Produkcijski skup servisa izvršava se paralelno s razvojnim compose okruženjem (različiti nazivi kontejnera, portovi i volumeni), tako da možete nastaviti s lokalnim razvojem dok produkcija ostaje pokrenuta.

## Faze Dockerfilea

Repozitorij isporučuje višefazni Dockerfile (`Dockerfile`). Dostupne su četiri faze; odaberite odgovarajući `target` za svoj slučaj upotrebe.

| Faza          | Osnovna slika         | Namjena                                                                                                                                                                                                                                                                                  |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instalira zavisnosti (`npm ci --legacy-peer-deps`) i pokreće `npm run build` (podrazumijevano koristi Turbopack — pogledajte Resursi tokom izgradnje u nastavku)                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | Produkcijsko izvršno okruženje sa samostalnim Next.js izlazom. **CLI alati pružalaca nisu uključeni.**                                                                                                                                                                                   |
| `runner-cli`  | `runner-base`         | Dodaje `git`, `docker.io`, `docker-compose` i globalne CLI alate: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Odaberite ovo za agentske tokove rada.**                                                                                                          |
| `runner-web`  | `runner-base`         | Dodaje Playwright + Chromium preglednik (`--with-deps`) za pružaoce web-sesija: `gemini-web`, `claude-web`, `claude-turnstile`. **Odaberite ovo kada koristite te pružaoce** — obična slika bez toga neće uspjeti pri obradi zahtjeva (pogledajte napomenu o `-web` pod Kanali izdanja). |

Ručno izgradite određeni cilj:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Resursi tokom izgradnje

Tri argumenta izgradnje određuju zahtjeve faze `builder`. Primjenjuju se samo tokom izgradnje —
`OMNIROUTE_MEMORY_MB` (u nastavku) zasebna je postavka za vrijeme izvršavanja.

| Argument izgradnje          | Zadano | Efekat                                                                                                         |
| --------------------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` gradi pomoću webpacka: manja vršna potrošnja memorije, ali sporije. `1` uključuje Turbopack.               |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Ograničenje V8 heap memorije (`--max-old-space-size`) za pokrenuti `next build`.                               |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Prosljeđuje vrijednost u `CIRCLE_NODE_TOTAL`; Next izvodi `workers = N - 1` za prikupljanje podataka stranica. |

`OMNIROUTE_BUILD_WORKERS` treba povećati na moćnom sistemu za izgradnju, a na
njega treba posumnjati kada izgradnja s ograničenim resursima ne uspije **nakon**
poruke `✓ Compiled successfully`. Svaki radni proces za podatke stranica zaseban
je proces, kao i sam nadređeni proces `next build`; reprodukcija na aktivnom
VPS-u (problem #7518) izmjerila je vršni RSS svakog procesa na ~4,5 GB, nezavisno
od heap zastavice `NODE_OPTIONS` (Turbopack kompajlira u izvornoj/Rust memoriji
izvan V8 heapa). Zadana vrijednost `2` (→ 1 radni proces, ukupno 2 procesa)
prilagođena je GitHubovim hostovanim izvršnim sistemima sa 16 GB / 4 vCPU koje
koristi proces objavljivanja. Pri vrijednosti `8` (→ 7 radnih procesa) tom je
sistemu ponestalo memorije, a buildkit je prekinuo korak uz poruku
`ResourceExhausted: ... cannot allocate memory`; vrijednost `3` (→ 2 radna
procesa) i dalje nije bila dovoljna nakon što je RSS po procesu direktno izmjeren
umjesto da bude procijenjen. `tests/unit/docker-build-memory-budget.test.ts`
izvodi proračun na osnovu izmjerene vrijednosti i ne uspijeva ako bilo koja
postavka premaši kapacitet izvršnog sistema.

Turbopack kompajlira u izvornoj Rust memoriji koja se nalazi **izvan** V8 heapa,
pa je `OMNIROUTE_BUILD_MEMORY_MB` ne ograničava. Na hostu s ograničenjem memorije
OOM killer tada prekida izgradnju signalom SIGKILL bez ikakvog teksta greške —
ona se jednostavno zaustavi usred koraka `Creating an optimized production build`,
što djeluje kao zastoj, a ne kao nedostatak memorije. Zato `Dockerfile`
podrazumijevano koristi webpack (`OMNIROUTE_USE_TURBOPACK=0`), za razliku od
`npm run dev` / `npm run build`, gdje je Turbopack zadana postavka u kodu:
obični `docker build .` bez argumenata izgradnje (što pokreću Railway i drugi
hostovi za implementaciju jednim klikom) ne smije se tiho prekinuti na sistemu
za izgradnju s ograničenom memorijom. Objavljene slike već eksplicitno
prosljeđuju `OMNIROUTE_USE_TURBOPACK=0` u `docker-publish.yml`. Na sistemu za
izgradnju s mnogo RAM-a uključite Turbopack radi brže izgradnje:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` je omogućen, pa `next build` pokreće nadređeni **i** radni
proces, a svaki zasebno poštuje `OMNIROUTE_BUILD_MEMORY_MB`. Postavite ograničenje
kontejnera na vrijednost nešto veću od približno dvostruke vrijednosti te
postavke, a ne samo jednake vrijednosti.

Izmjereno na ovom stablu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Alat za pakovanje | Ograničenje kontejnera | Rezultat                                         |
| ----------------- | ---------------------- | ------------------------------------------------ |
| Turbopack         | 8 GiB / 16 GiB         | OOM killer ga je prekinuo u oba slučaja, tiho    |
| webpack           | 8 GiB                  | radni proces izgradnje prekinut signalom SIGKILL |
| webpack           | 12 GiB                 | uspješno, vršna potrošnja od 11,1 GiB            |

### Zadane postavke izvršavanja

Zadane vrijednosti koje izvozi `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Ponašanje memorije u Dockeru:

- Slika postavlja `OMNIROUTE_MEMORY_MB=1024` i iz njega izvodi `NODE_OPTIONS=--max-old-space-size=1024`.
- Stvarni serverski proces pokreće samostalni pokretač, koji čita `OMNIROUTE_MEMORY_MB` i dodaje `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node koristi posljednju ponovljenu vrijednost `--max-old-space-size`, pa postavljanje `OMNIROUTE_MEMORY_MB` kontroliše efektivno ograničenje Docker heap memorije.
- Budući da ga slika uvijek postavlja, vlastita rezervna vrijednost pokretača, prilagođena RAM-u, nikad se ne primjenjuje pod Dockerom. Eksplicitno je povećajte za radno opterećenje (tabela ispod). `2048` je i dalje premalo za `/v1/responses` agenta za kodiranje.

### RAM tokom izvršavanja za agente za kodiranje

Dockerova zadana vrijednost od 1 GiB predstavlja minimum za kontrolnu ploču i lagani razgovor, a ne veličinu za produkciju. Duga tijela zahtjeva `POST /v1/responses` (stotine poruka, deseci alata) zadržavaju više grafova u memoriji tokom kompresije. Dva preklapajuća zahtjeva veličine ~3 MiB / ~750k tokena uzrokovala su prekid V8 procesa pri **12 GiB** old-space memorije (`FATAL ERROR: Reached heap limit`) i također dostigla OOM ograničenje cgroupa od 16 GiB. Pogledajte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Postavite **cgroup `--memory` iznad veličine heapa** — izvorni međuspremnici, SQLite i međurezultati kompresije nalaze se izvan V8.

| Radno opterećenje                             | `OMNIROUTE_MEMORY_MB`     | Kontejner / cgroup         | Napomene                                                                                                                |
| --------------------------------------------- | ------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Kontrolna ploča, jedan lagani razgovor        | `1024` (zadano u slici)   | ≥2 GiB                     |                                                                                                                         |
| Jedan agent za kodiranje (Claude/Codex/Grok)  | `8192`                    | ≥10 GiB                    | Tipična jedna sesija `/v1/responses`                                                                                    |
| Dva istovremena duga zahtjeva `/v1/responses` | `10240`–`12288`           | ≥12–16 GiB                 | Izmjeren prekid V8 procesa pri heap memoriji od ~12 GiB                                                                 |
| Tri ili više istovremenih dugih konteksta     | nemojte na jednom procesu | serijalizujte / više RAM-a | Zadano ograničenje za zahtjevna opterećenja je 1 aktivni zahtjev; povećavanje bez dodatnog RAM-a ponovo uzrokuje prekid |

`omniroute serve` na fizičkom sistemu kalibriše ~35% RAM-a (ograničeno na `[512, 4096]`) kada `OMNIROUTE_MEMORY_MB` **nije postavljen**. Docker uvijek postavlja `1024`, pa se ta kalibracija nikad ne izvršava u službenoj slici.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritične varijable okruženja

Pored zadanih vrijednosti dokumentovanih u [ENVIRONMENT.md](../reference/ENVIRONMENT.md), sljedeće varijable su najvažnije pri pokretanju unutar Dockera:

| Varijabla                     | Svrha                                                                                                                                                                                                                                                                                     | Zadana vrijednost                  |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Dijeljena tajna za WebSocket most. **Obavezna u produkciji** — postavite je na snažan nasumični niz znakova.                                                                                                                                                                              | nije postavljeno (mora se navesti) |
| `REDIS_URL`                   | Niz za povezivanje s pozadinskim sistemom za ograničavanje brzine / keširanje                                                                                                                                                                                                             | `redis://redis:6379`               |
| `REDIS_PORT`                  | Port na strani hosta za uključeni Redis kontejner                                                                                                                                                                                                                                         | `6379`                             |
| `REDIS_BIND_HOST`             | Mrežno sučelje hosta na kojem se objavljuje uključeni Redis port (povratna petlja, osim ako dodate AUTH)                                                                                                                                                                                  | `127.0.0.1`                        |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Putanja na hostu montirana u profil `cli` na `/workspace/omniroute` za tokove rada samostalnog ažuriranja                                                                                                                                                                                 | `.` (trenutni direktorij)          |
| `OMNIROUTE_MEMORY_MB`         | Ograničenje Node heap memorije tokom izvršavanja za Docker samostalni server; nadjačava zadanu vrijednost slike navedenu iznad. Agenti za kodiranje: `8192`+ (pogledajte [RAM tokom izvršavanja](#runtime-ram-for-coding-agents)).                                                        | `1024`                             |
| `DASHBOARD_PORT` / `API_PORT` | Nadjačava izložene portove za kontrolnu ploču (20128) i API (20129)                                                                                                                                                                                                                       | `20128` / `20129`                  |
| `APP_BIND_HOST`               | Mrežno sučelje hosta na kojem docker-compose objavljuje portove kontrolne ploče/API-ja/live-WS-a. Kada je `REQUIRE_API_KEY=false` (zadano), `0.0.0.0` izlaže anonimni `/v1` proxy lokalnoj mreži — proširite pristup samo uz `REQUIRE_API_KEY=true` ili reverzni proxy ispred aplikacije. | `127.0.0.1`                        |
| `CLIPROXY_BIND_HOST`          | Mrežno sučelje hosta na kojem docker-compose objavljuje pomoćni kontejner `cliproxyapi` — njegov volumen podataka sadrži pristupne podatke pružatelja usluga.                                                                                                                             | `127.0.0.1`                        |
| `OMNIROUTE_PLUGINS_DIR`       | Direktorij koji skener dodataka tokom izvršavanja čita i u koji instalira dodatke. Postavite ga kada su dodaci montirani povezivanjem: zadana vrijednost prati `HOME`, koji slika ne mora izvoziti.                                                                                       | `~/.omniroute/plugins`             |
| `OMNIROUTE_BASE_PATH`         | URL podputanja kada je aplikacija objavljena iza reverznog proxyja (npr. `/omniroute`)                                                                                                                                                                                                    | _(prazno = korijen)_               |
| `NEXT_PUBLIC_BASE_URL`        | Javno ishodište preglednika uključujući podputanju (npr. `https://host/omniroute`)                                                                                                                                                                                                        | nije postavljeno                   |
| `PROD_DASHBOARD_PORT`         | Port kontrolne ploče na strani hosta za `docker-compose.prod.yml`                                                                                                                                                                                                                         | `20130`                            |
| `CLIPROXYAPI_PORT`            | Port na strani hosta za pomoćni kontejner `cliproxyapi`                                                                                                                                                                                                                                   | `8317`                             |

## Obrnuti proxy na podputanji (Traefik / nginx)

Next.js `basePath` se ugrađuje u samostalni paket. OmniRoute bilježi ugrađenu
vrijednost u sentinel datoteci u korijenu aplikacije (zapisuje se tokom `npm run build`;
čita je `scripts/docker/ensure-docker-base-path.mjs`) i poredi je s
`OMNIROUTE_BASE_PATH` prilikom pokretanja kontejnera. Kada se vrijednosti razlikuju, a
slika je izgrađena za korijen domene, ulazna tačka prepisuje samostalne manifeste,
ugrađene literale `basePath`/`assetPrefix` (Next 16 generiše URL-ove SSR resursa samo
iz `assetPrefix` — alat za izmjene u njega preslikava podputanju), ugrađene URL-ove
resursa `/_next/static` (manifesti klijentskih referenci, uvozi medijskih sadržaja,
unaprijed generisane stranice grešaka) i klijentski `process.env` shim prije nego što
se pokrene `node dev/run-standalone.mjs`.

### Izgradnja pomoću Composea (preporučeno)

Postavite obje varijable u `.env`, a zatim ponovo izgradite kako bi slika i okruženje
izvršavanja bili usklađeni:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` prosljeđuje `OMNIROUTE_BASE_PATH` kao Docker argument izgradnje i
kao varijablu okruženja za vrijeme izvršavanja.

### Unaprijed izgrađena korijenska slika + podputanja za vrijeme izvršavanja

Objavljene slike `diegosouzapw/omniroute:*` izgrađene su za korijen domene. I dalje
možete postaviti `OMNIROUTE_BASE_PATH` za vrijeme izvršavanja; kontejner će jednom
izmijeniti paket prilikom pokretanja. Uparite ga s odgovarajućim javnim ishodištem:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurišite obrnuti proxy tako da prosljeđuje **punu** vanjsku putanju (nemojte
uklanjati prefiks). Traefik treba usmjeravati `PathPrefix(`/omniroute`)` prema
kontejneru bez `StripPrefix`, kako bi Next.js primao `/omniroute/...` i posluživao
resurse iz `/omniroute/_next/...`.

Docker provjera stanja ispituje laganu krajnju tačku životnog ciklusa `/healthz` s
prefiksom aktivnog `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` ostaje dostupan za
dijagnostiku namijenjenu korisnicima/kontrolnim pločama; da biste kontejnerski
HEALTHCHECK ponovo usmjerili na njega (naprimjer, radi provođenja dubinske provjere
stanja), postavite `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Ta putanja
predstavlja **dubinsku** provjeru (baza podataka + sažetak nadzora) — prikladnu za
Dockerov rijetki `HEALTHCHECK` ako je ponovo omogućite, ali **ne** i za intervale
Kubernetesovog `livenessProbe`.

Za orkestratore (Kubernetes, Nomad itd.):

| Provjera           | Preporučeno                                                         | Izbjegavati                                                      |
| ------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Aktivnost          | HTTP `GET /livez` ili TCP na glavnom portu (`PORT`, zadano `20128`) | `/api/monitoring/health` kao provjeru aktivnosti                 |
| Spremnost          | HTTP `GET /healthz`                                                 | Kratka vremenska ograničenja koja zauzetu petlju smatraju mrtvom |
| Dubinska / vanjska | `/api/monitoring/health`                                            | —                                                                |

`/healthz` izvještava o životnom ciklusu procesa (`ok` / `starting` / `stopping`).
`/livez` provjerava samo je li proces aktivan (200 kad god se obrađivač može izvršiti;
ne čeka spremnost). Obje se i dalje izvršavaju u istoj Node petlji događaja kao i
obrada zahtjeva, pa ih procesorski zahtjevna obrada kataloga ili kompresija može
odgoditi — zauzeto ≠ mrtvo. Ako HTTP provjere prekorače vremensko ograničenje,
preferirajte TCP provjeru aktivnosti. Potpune smjernice za provjere:
[Vodič za nadzor — preporuke za Kubernetes provjere](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose s Caddyjem (automatski TLS za HTTPS)

OmniRoute se može sigurno izložiti pomoću Caddyjevog automatskog pribavljanja SSL certifikata. Provjerite pokazuje li DNS A zapis vaše domene na IP adresu vašeg servera.

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
      # Ishodište vidljivo pregledniku za OAuth povratne pozive, poveznice kontrolne ploče i generirane javne URL-ove.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interni URL između servera za zakazane zadatke / vlastite zahtjeve.
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

Caddy postavlja standardna zaglavlja za prosljeđivanje prema nadređenom kontejneru. OmniRoute koristi
`NEXT_PUBLIC_BASE_URL` kao kanonsko javno ishodište za OAuth povratne pozive i generirane javne
poveznice; autentificirani upisi na kontrolnoj ploči koriste zahtjeve istog porijekla zajedno sa CSRF
zaštitom vezanom za sesiju. Omogućite `OMNIROUTE_TRUST_PROXY` samo za napredne implementacije kod kojih namjerno
želite da OmniRoute izvodi javno ishodište iz pouzdanih proslijeđenih zaglavlja umjesto izričite
konfiguracije.

## Cloudflare Quick Tunnel

Podrška kontrolne ploče za Docker implementacije uključuje **Cloudflare Quick Tunnel** koji se pokreće jednim klikom na `Kontrolna ploča → Krajnje tačke`. Prvim omogućavanjem preuzima se `cloudflared` samo kada je potreban, pokreće se privremeni tunel prema vašoj trenutnoj `/v1` krajnjoj tački i prikazuje se generirani URL `https://*.trycloudflare.com/v1` neposredno ispod vašeg uobičajenog javnog URL-a.

Paneli tunela krajnjih tačaka (Cloudflare, Tailscale, ngrok) mogu se prikazati ili sakriti putem `Postavke → Izgled` bez promjene stanja aktivnog tunela.

### Napomene o tunelu

- URL-ovi Quick Tunnela su privremeni i mijenjaju se nakon svakog ponovnog pokretanja.
- Quick Tunnel tuneli se ne obnavljaju automatski nakon ponovnog pokretanja OmniRoutea ili kontejnera. Kada je potrebno, ponovo ih omogućite putem kontrolne ploče.
- Upravljana instalacija trenutno podržava Linux, macOS i Windows na arhitekturama `x64` / `arm64`.
- Upravljani Quick Tunnel tuneli podrazumijevano koriste HTTP/2 transport kako bi se izbjegla učestala upozorenja o QUIC UDP međuspremniku u ograničenim kontejnerskim okruženjima. Postavite `CLOUDFLARED_PROTOCOL=quic` ili `auto` ako želite drugačiji transport.
- Docker slike uključuju korijenske CA certifikate sistema i prosljeđuju ih upravljanom procesu `cloudflared`, čime se izbjegavaju greške TLS povjerenja kada se tunel pokreće unutar kontejnera.
- Postavite `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ako želite da OmniRoute koristi postojeću binarnu datoteku umjesto preuzimanja nove.

## Oznake slika

| Slika                    | Oznaka   | Veličina | Opis                                                           |
| ------------------------ | -------- | -------- | -------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB   | Najviša **objavljena** stabilna SemVer verzija (ne git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB   | Fiksirajte ovu vrstu oznake za GitOps                          |

Manifest za više platformi: izvorni `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automatski odabire odgovarajuću arhitekturu; proslijedite `--platform linux/amd64` ako trebate prisilno koristiti AMD64 emulaciju na ARM hostovima.

### Kanali izdanja

OmniRoute objavljuje odvojene Docker kanale za stabilna izdanja, aktivno testiranje grane izdanja i razvojne verzije.

| Kanal                           | Izvor                                          | Promjenjivost                     | Preporučena upotreba                                                                                                                      |
| ------------------------------- | ---------------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Potpisano/verzionirano izdanje                 | Nepromjenjivo                     | Produkcijske implementacije koje su fiksirane na tačno određeno izdanje                                                                   |
| `:latest` / `:latest-web`       | Najviša **objavljena** stabilna SemVer verzija | Promjenjivi stabilni pokazivač    | Prati stabilna izdanja **nakon** zadatka objavljivanja SemVer verzije — **ne** prati `main` niti neobjavljene promjene grane `release/v*` |
| `:next` / `:next-web`           | Trenutna zadana grana `release/v*`             | Promjenjivi pokazivač predizdanja | Testiranje ispravki koje su uključene u aktivnu granu izdanja, ali još nisu dio stabilnog izdanja                                         |
| `:main` / `:main-web`           | Grana `main`                                   | Promjenjivi razvojni pokazivač    | Samo za razvojno i integracijsko testiranje                                                                                               |

#### Pružaoci web-sesija: `-web` slike

Svaki od navedenih kanala također je dostupan kao `-web` oznaka (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), izgrađena iz faze `runner-web` — ista slika uz Playwright i preglednik Chromium. Osnovna slika isporučuje se **bez** Chromiuma; potreban je za `gemini-web`, `claude-web` i `claude-turnstile`.

Greška se odgađa i ne javlja se prilikom pokretanja: ovi pružaoci navode svoje modele i prikazuju se kao povezani na kontrolnoj ploči, a tek prvi zahtjev završava neuspješno uz poruku

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ako koristite ove pružaoce, preuzmite `-web` oznaku kanala koji već koristite — ništa drugo se ne mijenja. Kod npm/CLI instalacije (bez Docker slike), odgovarajući dio koji nedostaje jeste binarna datoteka preglednika: pokrenite `npx playwright install chromium` na hostu.

#### Korištenje kanala predizdanja

Kanal `next` se ponovo izgrađuje pri svakom pushu na trenutnu zadanu granu `release/v*` i objavljuje se za AMD64 i ARM64. Starije grane za održavanje ne mogu ga prepisati. Kanal pruža sliku koja se može preuzeti i koja sadrži ispravke spojene u aktivnu granu izdanja prije objavljivanja sljedeće stabilne oznake.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Za Docker Compose, promijenite oznaku slike koju koristi odabrani profil, a zatim preuzmite sliku i ponovo kreirajte servis:

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

`next` je promjenjivi kanal predizdanja. Može se promijeniti pri svakom pushu na aktivnu granu izdanja i **nije podržan za produkcijsku upotrebu**. Prilikom procjene određene verzije prikvačite sažetak slike:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Prije testiranja napravite sigurnosnu kopiju OmniRoute volumena podataka ili montiranog direktorija podataka. Za vraćanje na prethodnu verziju vratite ranije korištenu stabilnu verziju ili sažetak i ponovo kreirajte kontejner:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Izgradnja iz grane izdanja nikada ne može pomjeriti `latest`; samo odgovarajuća stabilna semantička verzija može ažurirati pokazivač stabilnog izdanja. Slike `next` zadržavaju provjeru slike izdanja i obaveznu provjeru koja blokira CRITICAL ranjivosti.

**`latest` nije garancija aktuelnosti u odnosu na git.** Spojene ispravke na grani `main` ili aktivnoj grani `release/v*` **nisu** uključene u `:latest` sve dok se ne objavi stabilna SemVer slika i zadatak objavljivanja ne ažurira `:latest` (isti sažetak kao za tu SemVer verziju). Ako `latest` izgleda nepromijenjeno dok GitHub već prikazuje ispravku, preuzmite `:next` kako biste testirali granu izdanja ili sačekajte SemVer oznaku.

| Želite                                                                                | Koristite                               |
| ------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / produkciju koja ne smije odstupati                                           | Prikvačite `:X.Y.Z` (ili sažetak slike) |
| Pratiti objavljena stabilna izdanja i prihvatiti ponovno kreiranje pri svakom izdanju | `:latest`                               |
| Testirati neobjavljene commitove grane `release/v*`                                   | `:next` (nije za produkciju)            |
| Testirati `main`                                                                      | `:main` (nije za produkciju)            |

## Ažuriranja kontrolne ploče u Dockeru

Kontejner iz objavljene slike ne može zamijeniti sam sebe. Kada OmniRoute otkrije da se izvršava unutar
kontejnera (nema `.git` radne kopije i nije npm instalacija), baner za ažuriranje na početnoj kontrolnoj ploči prikazuje
naredbu koju treba pokrenuti na hostu umjesto npm/git uputa, zajedno s dugmetom za kopiranje:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Naziv servisa dolazi iz `AUTO_UPDATE_SERVICE` (zadano je `omniroute`, servis u
`docker-compose.selfhost.yml`). `pull` pomjera samo promjenjivu oznaku (`latest`, `next`); ako koristite fiksiranu
oznaku `:X.Y.Z`, prvo uredite oznaku.

### Ažuriranja jednim klikom pomoću datoteke okidača na hostu

Da bi opcija **Ažuriraj sada** nastavila raditi bez montiranja `/var/run/docker.sock` (što kontejneru daje
root pristup hostu — pogledajte upozorenje za profil `cli` iznad), postavite `DOCKER_UPDATE_TRIGGER_FILE` na
OmniRoute servisu i pokrenite nadzornik na hostu:

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
datoteku, odgovara statusom `202`, a kontrolna ploča periodično provjerava `/api/system/version` dok nova verzija ne postane aktivna
i zatim se ponovo učitava. OmniRoute u ovom režimu nikada ne pokreće shell ili Docker naredbu. Kao i kod svake radnje
ažuriranja, zahtjev se prihvata samo od loopback/LAN klijenata.

Direktorij podataka montiran pomoću bind mounta daje hostu stabilnu putanju za nadzor. Primjeri `systemd` jedinica
(prilagodite `/srv/omniroute` direktoriju koji sadrži vašu compose datoteku i `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Nadziranje zahtjeva za ažuriranje iz OmniRoute kontrolne ploče

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Preuzimanje i ponovno kreiranje OmniRoute kontejnera

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

Servis uklanja zahtjev prije preuzimanja kako se neuspjelo izvršavanje ne bi ponavljalo u petlji. Bez
`DOCKER_UPDATE_TRIGGER_FILE` kontrolna ploča zadržava postupak s ručnom naredbom.

## Dostupnost: default SQLite je jedna replika

Stock Docker / Kubernetes OmniRoute je** jedan čvor proces + jedan SQLite pisac** . Visoka dostupnost je** nije podržano** na toj topologiji.

| Ograničenje                           | Posljedica                                                                                                                                                                                                                                                                                            |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jedan pisac                           | Uradi** ne** pokrenite više replika na istom SQLite fajlu. To kvari DB.                                                                                                                                                                                                                               |
| Recreate / restart / HEALTHCHECK kill | **Puni prekid** SSE u letu, sesije nadzorne ploče i stanje u memoriji. Svaki povezani klijent pada. Novi zahtjevi tokom prozora prazne krajnje tačke dobijaju reverse-proxy**`502 Bad Gateway: Unknown error`** , ne OmniRoute JSON — klijenti ne mogu razlikovati ovo od greške provajdera (#11015). |
| Ista petlja događaja kao `/healthz`   | Zauzet katalog ili kvačica kompresije mogu odgoditi sonde; kratko vremensko ograničenje zatim ponovo pokreće** samo** replika.                                                                                                                                                                        |

**Matrica sonde** (vidi i [preporuke Kubernetes sonde](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sonda          | Target                                                   | Nemojte koristiti                                                 |
| -------------- | -------------------------------------------------------- | ----------------------------------------------------------------- |
| Živost         | TCP na `PORT` (zadano `20128`), ili meki HTTP `/healthz` | `/api/monitoring/health`                                          |
| Spremnost      | HTTP `GET /healthz`                                      | Kratki tajm-auti koji tretiraju zauzetu petlju događaja kao mrtvu |
| Duboko / ljudi | `/api/monitoring/health`                                 | Automatizovana živost kubeleta                                    |

**Nadogradnje:** očekujte pad svake sesije. Ispraznite klijente ako možete; nema tekućeg ažuriranja za default SQLite. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` će također zamijeniti jedini proces kada je kontejner Nezdrav - isti radijus eksplozije.

Gotovi manifesti i Helm grafikon žive u `deploy/kubernetes/` i `deploy/helm/omniroute/` - pogledajte [vodič za implementaciju Kubernetesa](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes isječak za a** pojedinačna replika** (Ponovno kreiranje je potrebno; nemojte podizati `replicas` na jednu SQLite datoteku):

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

`preStop` sleep omogućava kube-u da ispusti krajnje tačke usluge prije SIGTERM a** novo** saobraćaj prestaje da utiče na proces odumiranja. U toku leta `/v1/responses` SSE se iscrpljuje do `SHUTDOWN_TIMEOUT_MS` (podrazumevano 30s) putem zakupa teške kategorije (#11015). Novi zahtjevi koji još uvijek stignu do procesa dobivaju `503` + `Retry-After: 5`. Ponovo kreiraj prazninu krajnje tačke dok zamena ne bude spremna ostaje težak prekid — to je SQLite topologija, a ne pogrešna konfiguracija sonde.

Vanjski Postgres / multi-pisač HA je** ne** dokumentovani put zaliha. Ako vam je potreban HA, zadržite jednu repliku ili pokrenite topologiju koju je projekat testirao i dokumentovao zasebno. Postgres/MySQL rad živi u [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Dok se to ne isporuči, jedini podržani način množenja** veliki** `/v1/responses` kapacitet je N nezavisnih procesa (sljedeći odjeljak), a ne `replicas > 1` na jednom volumenu.

## Horizontalno skaliranje: N nezavisnih procesa

Jedan Node proces predstavlja **jednu V8 hrpu**. Dva preklapajuća zahtjeva agenta za kodiranje `POST /v1/responses` veličine ~3 MiB / ~750k tokena (RTK + Caveman) prekidaju tu hrpu pri ~12 Gi (`FATAL ERROR: Reached heap limit`) i mogu izazvati OOM u cgroupu od 16 Gi. Pogledajte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). To mjerenje je upozorenje vezano za **memorijski budžet**, a ne čvrsto ograničenje proizvoda na dva istovremena duga `/v1/responses` zahtjeva. Prihvatanje zahtjevnih chat zahtjeva kontrolira se automatski izvedenim budžetom ulaznih bajtova (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimenzioniranim prema istom V8/cgroup ograničenju — povećavanje te vrijednosti (ili postavljanje zastarjelog ograničenja broja zahtjeva `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) na već dimenzioniranom procesu ponovo dovodi do prekida. Mali chat zahtjevi, `/healthz`, `/v1/models` i MCP **nisu** obuhvaćeni tim ograničenjem.

### Jedan proces: više od dva duga `/v1/responses` zahtjeva

**Zdrav** proces (hrpa ispod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, zadano `0.75`) **može** izvršavati više od dva istovremena duga `POST /v1/responses` zahtjeva kada u budžetu bajtova zahtjeva u obradi na nivou procesa (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) još uvijek ima prostora. Tijela zahtjeva veličine jednake ili veće od `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (zadano 256 KiB) zauzimaju isti resursni najam kao strukturno zahtjevni zahtjevi i koriste isti [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` izlaz (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Deseci istovremenih dugih SSE klijenata (operatorima često treba 40–50) predstavljaju pitanje **memorijskog budžeta** — dimenzionirajte hrpu + primarne/dodatne slotove + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — a ne čvrsto ograničenje proizvoda na „najviše 2“. Hrpa pod pritiskom i dalje odbacuje zahtjeve uz ponovljivi `503` kako se problem #7849 ne bi vratio.

Da biste **umnožili hrpe** (nezavisni V8 old-space prostori) **danas**:

| Uradite                                                                                                                                                                                                         | Nemojte                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Pokrenite **N kontejnera/podova**, svaki sa svojim **vlastitim** `DATA_DIR` direktorijem / volumenom                                                                                                            | Postaviti `replicas > 1` nad jednom SQLite datotekom                              |
| Dimenzionirajte zahtjevne zahtjeve u obradi + dodatne slotove za zdravu hrpu prema budžetu hrpe / bajtova zahtjeva u obradi; 1–2 je konzervativna zadana vrijednost iz #7849, a ne čvrsto ograničenje proizvoda | Dodijeliti jednom procesu 8× više RAM-a i neograničeno ograničenje broja zahtjeva |
| Opcionalno: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` za **dijeljene brojače kvota**                                                                                                                 | Tretirati Redis kao dijeljeni SQLite — on to nije                                 |
| Kopirajte tajne pružatelja usluga u svaku instancu (ili prihvatite odvojene kontrolne ploče)                                                                                                                    | Očekivati jednu kontrolnu ploču / jedan dnevnik poziva za sve instance            |
| Postavite bilo koji balansator opterećenja ispred instanci; dovoljno je vezivanje prema API ključu ili sesiji                                                                                                   | Zahtijevati međuverziju specifičnu za dobavljača koja uzima u obzir veličinu      |

Hardver: broj istovremenih dugih `/v1/responses` zahtjeva po instanci pitanje je **memorijskog budžeta** (hrpa + bajtovi zahtjeva u obradi / #10110). `N` nezavisnih `DATA_DIR` direktorija i dalje umnožava hrpe: RAM glavnog računara mora pokriti `N × cgroup`, a ne „jedan pod od 16 Gi sa N=8“. Nikada nemojte koristiti `replicas > 1` nad jednom SQLite datotekom.

Primjer Compose konfiguracije (dvije hrpe, dva volumena — ne `deploy.replicas: 2`):

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

## Gemini regionalne greške unutar Dockera

Google AI Studio / Gemini API može vratiti HTTP 400 sa FAILED_PRECONDITION i porukom
`User location is not supported for the API use.` Uspješan zahtjev na hostu
ne dokazuje da kontejner koristi istu izlaznu rutu. Redoslijed DNS-a,
IPv4/IPv6 povezivost, VPN usmjeravanje i konfigurirani proxy serveri mogu se razlikovati. Provjerite
[Googleove podržane regije](https://ai.google.dev/gemini-api/docs/available-regions)
kao i stvarnu rutu veze; sama ova greška ne ukazuje na neispravan API ključ.

### Dajte prednost proxyju specifičnom za vezu

Koristite OmniRouteovu [konfiguraciju proxyja po vezi](../ops/PROXY_GUIDE.md#4-level-proxy-system)
za pogođenu Gemini vezu, zatim ponovite **Test Connection** i mali zahtjev
s istim modelom. Time se promjena usmjeravanja ograničava na tu vezu. Provjerite
je li proxy dostupan iz kontejnera i odabire li ga veza zaista.
Promjena rute ne garantuje regionalnu podobnost kod pružaoca usluge.

### Uporedite mrežne postavke hosta i kontejnera

Prilikom poređenja autentificiranih rezultata zadržite isti ključ, model i zahtjev; nikada
ne lijepite pristupne podatke, lozinke proxyja ili kompletna autorizacijska zaglavlja u prijavu problema.
Najprije provjerite koje porodice adresa nudi sistemski razrješivač, koristeći istu naredbu
na hostu i unutar kontejnera:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Zamijenite `omniroute` servisom koji koristite (na primjer, `omniroute-web`). Ove
naredbe ispisuju porodice adresa bez pristupnih podataka ili IP adresa. Vraćena vrijednost `6`
samo pokazuje IPv6 DNS rezultat: ona **ne** dokazuje postojanje upotrebljive IPv6 rute ili pristupa API-ju.
Tamo gdje je `curl` instaliran, uporedite `curl -4 -I https://generativelanguage.googleapis.com`
sa `curl -6 -I https://generativelanguage.googleapis.com` u oba okruženja.
HTTP odgovor dokazuje povezivost za tu provjeru, čak i ako je riječ o grešci
bez autentifikacije; samo autentificirani zahtjev prema modelu testira podobnost za Gemini.

### Alternativa na nivou hosta: funkcionalan IPv6 i politika razrješivača

Autor prijave [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) obnovio je
pristup u svom okruženju omogućavanjem IPv6 podrške za kontejnere i promjenom glibc odabira
adresa. Ovo tretirajte kao alternativu specifičnu za okruženje. Potvrdite ispravan rad IPv6-a
na hostu, izlazno povezivanje/usmjeravanje kontejnera i pravila vatrozida prije prilagođavanja postavki razrješivača.
Privatna ULA adresa sama po sebi ne potvrđuje javnu IPv6 povezivost.

Za servise koji su već povezani s podrazumijevanom Compose mrežom, ovaj fragment omogućava
IPv6 na toj mreži; zadržite ostatak konfiguracije servisa, portove, volumene i druge postavke:

```yaml
networks:
  default:
    enable_ipv6: true
```

Za imenovanu mrežu omogućite ga na mreži kojoj se servis zaista pridružuje. Docker može
dodijeliti ULA podmrežu; odaberite eksplicitnu podmrežu koja se ne preklapa samo kada to vaša mreža
zahtijeva. Pogledajte [Docker IPv6 umrežavanje](https://docs.docker.com/engine/daemon/ipv6/)
i [Opcije Compose mreže](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Na **slici zasnovanoj na glibc-u**, `/etc/gai.conf` može promijeniti odabir adresa. Trenutni
Dockerfile repozitorija koristi Debian; prilagođene slike zasnovane na musl-u ne koriste ovaj mehanizam.
Prijavljena prilagodba mijenja ULA oznaku iz `label fc00::/7 6` u
`label fc00::/7 1`. Počnite od kompletne tabele politika slike i sačuvajte njene ostale
unose: dodavanje unosa `label` ili `precedence` zamjenjuje tu podrazumijevanu tabelu, pa datoteka
koja sadrži samo promijenjeni red nije dovoljna.
[Referenca za glibc konfiguraciju](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumentuje ovu semantiku. Montirajte pregledanu datoteku samo za čitanje na `/etc/gai.conf`
i ponovo kreirajte servis kako biste primijenili promjenu.

Ovo mijenja sistemski odabir adresa za **sav izlazni saobraćaj u tom kontejneru**.
Ne prisiljava svaku aplikaciju da odabere IPv6: Nodeov redoslijed DNS-a i odabir
veze također su važni. Konkretno, `--dns-result-order=ipv4first` daje prednost IPv4-u i
nije rješenje za kvar ograničen na IPv4. Pogledajte [Nodeov redoslijed DNS-a](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Ponovo testirajte Gemini i druge pružaoce usluga nakon svake promjene na nivou hosta. Za vraćanje
prethodnog stanja uklonite prilagođeno montiranje `gai.conf`, vratite prethodnu mrežnu konfiguraciju i
ponovo kreirajte pogođeni servis/mrežu tokom perioda održavanja. Ponovno kreiranje mreže
može prekinuti rad drugih kontejnera povezanih s njom; nemojte brisati volumen s trajnim podacima.

## Važne napomene

- **SQLite WAL način rada:** Treba omogućiti da se `docker stop` završi kako bi OmniRoute mogao zapisati najnovije promjene nazad u `storage.sqlite` putem kontrolne tačke. Priložene Compose datoteke već postavljaju period odgode zaustavljanja na 40 s. Ako direktno pokrećete sliku, zadržite `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Postavite na `true` ako se rutinskim sigurnosnim kopijama/sigurnosnim kopijama prije zapisivanja upravlja eksterno. Migracije postojeće baze podataka i dalje zahtijevaju vlastiti trajni sigurnosni snimak i zaštitu od masovne migracije.
- **Trajnost podataka:** Uvijek montirajte volumen na `/app/data` kako biste sačuvali bazu podataka, ključeve i konfiguracije između ponovnih pokretanja kontejnera.
- **Konfiguracija porta:** Nadjačajte varijablu okruženja `PORT` kako biste promijenili zadani port `20128`.

## Pogledajte također

- [Vodič za implementaciju na VM-u](../ops/VM_DEPLOYMENT_GUIDE.md) — Postavljanje VM-a, nginx-a i Cloudflarea
- [Vodič za implementaciju na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementacija na Fly.io
- [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Potpuna referenca za `.env`
