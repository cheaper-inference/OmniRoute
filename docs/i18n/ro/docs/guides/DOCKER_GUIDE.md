# 🐳 Docker Guide — OmniRoute (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referință completă pentru implementarea cu Docker. Pentru o pornire rapidă, consultați [secțiunea Docker din README](../README.md#-docker).

## Cuprins

- [Rulare rapidă](#quick-run)
- [Cu fișier de mediu](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profiluri disponibile](#available-profiles)
- [Configurarea instrumentelor CLI de pe gazdă când OmniRoute rulează în Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Container auxiliar Redis](#redis-sidecar)
- [Compose pentru producție](#production-compose)
- [Etapele Dockerfile](#dockerfile-stages)
- [Variabile de mediu esențiale](#critical-environment-variables)
- [Docker Compose cu Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Tunel rapid Cloudflare](#cloudflare-quick-tunnel)
- [Etichete de imagine](#image-tags)
- [Actualizările panoului de control în Docker](#dashboard-updates-in-docker)
- [Disponibilitate: configurația SQLite implicită acceptă o singură replică](#availability-default-sqlite-is-single-replica)
- [Erori regionale Gemini în Docker](#gemini-regional-errors-inside-docker)
- [Note importante](#important-notes)

---

## Run rapid

> **Auto-gazdă într-o singură comandă?** Consultați [Ghidul de auto-găzduire](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (imagine publicată + Redis, doar loopback, fără alegere de profil). Quick Run de mai jos este calea cu un singur container pentru utilizatorii care rulează deja Redis în altă parte.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Cu fișierul de mediu

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
# Profil de bază (fără instrumente CLI)
docker compose --profile base up -d

# Profil CLI (Claude Code, Codex și OpenClaw integrate)
docker compose --profile cli up -d

# Profil pentru gazdă (conceput în principal pentru Linux; montează binarele CLI ale gazdei doar pentru citire)
docker compose --profile host up -d

# Profil web (Chromium/Playwright pentru furnizorii bazați pe sesiuni web)
docker compose --profile web up -d

# Combinați CLI cu containerul auxiliar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profiluri disponibile

OmniRoute include profiluri Compose pentru principalele tipuri de implementare. Alegeți-l pe cel care corespunde mediului dumneavoastră.

| Profil            | Serviciu         | Când se utilizează                                                                                                                                                       | Comandă                                      |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (implicit) | `omniroute-base` | Server fără interfață grafică / mediu de execuție minimal, fără instrumente CLI ale furnizorilor incluse                                                                 | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Fluxuri de lucru bazate pe agenți care apelează `omniroute providers/setup/doctor` și instrumentele CLI incluse (Codex, Claude Code, Droid, OpenClaw)                    | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Gazde Linux care necesită acces similar cu `network_mode` la instrumentele CLI ale gazdei, prin montarea `~/.local/bin`, `~/.codex`, `~/.claude` etc. doar pentru citire | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Rulează containerul auxiliar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) pe portul `8317` pentru proxy-ul CLI din amonte                                 | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Furnizori bazați pe sesiuni web care necesită un browser: `gemini-web`, `claude-web`, `claude-turnstile` (construiește `runner-web`, cu Chromium inclus)                 | `docker compose --profile web up -d`         |

> Pot fi combinate mai multe profiluri: `docker compose --profile cli --profile cliproxyapi up -d`.

## Configurarea instrumentelor CLI de pe gazdă când OmniRoute rulează în Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` și butonul
**Salvează configurația** din panoul de control scriu fișiere precum `~/.codex/*.config.toml`. Aceste căi
au sens numai pe mașina pe care rulează efectiv CLI-ul. Dacă le rulați în
container, scrierea ajunge în directorul home propriu al containerului (`/home/node` —
imaginea rulează cu `USER node`), de unde niciun CLI de pe gazdă nu le va citi vreodată și unde sunt
șterse în momentul în care containerul este recreat.

OmniRoute detectează această situație și refuză scrierea, oferind în schimb instrucțiuni,
în loc să raporteze un succes pe care nu îl puteți folosi: CLI-ul se încheie cu codul `2`, iar API-ul răspunde cu `422`
și `containerEphemeralTarget: true`.

### Recomandat: rulați CLI-ul pe gazdă și OmniRoute în Docker

Containerul furnizează API-ul; CLI-ul configurează instrumentele de pe gazdă.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # direcționează CLI-ul către container
omniroute setup-codex                      # scrie în directorul real ~/.codex de pe gazdă
```

Aceasta este alegerea potrivită atunci când Codex, Claude Code, Cursor sau instrumente similare rulează pe
laptopul dvs. — aceasta fiind configurația obișnuită.

### Alternativă: montați prin bind directoarele de configurare ale gazdei (profilul `host`)

Dacă doriți ca însuși containerul să scrie configurația de pe gazdă, montați
directoarele în container și setați `CLI_CONFIG_HOME` la rădăcina montării. Profilul `host`
face deja acest lucru:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Montarea prin bind este cea care face calea demnă de încredere: OmniRoute citește
`/proc/self/mountinfo` și permite scrierea în căile montate (și în directoarele
ai căror copii sunt puncte de montare, exact ca în structura `/host-home` de mai sus), refuzând
în continuare scrierea în cele nemontate.

### Soluție de rezervă: configurați CLI-urile proprii ale containerului (utilizați cu moderație)

Atunci când CLI-urile se află efectiv în interiorul containerului (profilul `cli`), scrierea
este intenționată. Transmiteți `--allow-container-write` oricărei comenzi `setup-*` sau setați
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` pentru server. Scrierea continuă
cu un avertisment că datele nu vor supraviețui containerului.

> **Avertisment de securitate — profilul `cli` + montarea `docker.sock`.**
> Profilul `cli` montează prin bind `/var/run/docker.sock`, astfel încât mecanismul de
> actualizare automată din container să poată recrea stiva folosind daemonul gazdei
> (`src/lib/system/autoUpdate.ts` verifică existența acelui socket și omite
> calea Docker atunci când acesta lipsește). Acel socket este **o limită de încredere
> echivalentă cu accesul root pe gazdă**: orice poate să îl acceseze controlează daemonul Docker al gazdei ca
> root — poate crea, inspecta, opri și elimina orice container de pe gazdă.
> Implicații:
>
> 1. **Nu expuneți niciodată portul profilului `cli` în rețea.** Publicați-l
>    pe `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — un profil `cli` accesibil din LAN transformă orice RCE la nivelul panoului de control în
>    compromiterea completă a gazdei.
> 2. **Nu montați prin bind directoare suplimentare ale gazdei în profilul `cli`.**
>    Socketul Docker împreună cu orice montare suplimentară oferă containerului acces complet de
>    citire/scriere la sistemul dvs. de fișiere și la configurația gazdei. Dacă un instrument trebuie să
>    acceseze un proiect, rulați-l local folosind binarul CLI — nu îl montați
>    în containerul `cli`.
>
> Dacă nu aveți nevoie de actualizare automată din container, nu activați profilul `cli`
> (`COMPOSE_PROFILES=core,redis` sau o variantă mai scurtă). Celelalte profiluri nu
> montează socketul Docker.
>
> Consultați `docs/security/MITM-TPROXY-DECRYPT.md` (git; necompilat în `/docs`) pentru modelul de amenințări asociat
> atacurilor MITM și `docs/security/SUPPLY_CHAIN.md` pentru
> lanțul de proveniență al binarelor `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar Redis

OmniRoute se bazează pe Redis pentru limitatorul distribuit al ratei și memoria cache partajată. Serviciul `redis` este definit **întotdeauna** în `docker-compose.yml` (nu este condiționat de niciun profil) și pornește împreună cu orice alt profil.

| Detaliu                     | Valoare                                  |
| --------------------------- | ---------------------------------------- |
| Imagine                     | `redis:7-alpine`                         |
| Numele containerului        | `omniroute-redis`                        |
| Port intern                 | `6379`                                   |
| Port gazdă (suprascriere)   | `REDIS_PORT` (implicit `6379`)           |
| Adresă gazdă (suprascriere) | `REDIS_BIND_HOST` (implicit `127.0.0.1`) |
| Volum                       | `omniroute-redis-data` → `/data`         |
| Verificare de funcționare   | `redis-cli ping` (interval de 10s)       |

Variabile de mediu asociate:

- `REDIS_URL` — șirul de conexiune injectat în aplicație (`redis://redis:6379` în mod implicit).
- `REDIS_PORT` — maparea portului de pe gazdă pentru containerul Redis.
- `REDIS_BIND_HOST` — interfața gazdei pe care este publicat portul. Valoarea implicită este `127.0.0.1`.

> **De ce se folosește implicit interfața loopback:** sidecar-ul rulează fără `requirepass`, iar containerele
> aplicației îl accesează prin rețeaua compose (`redis:6379`) — portul publicat există
> doar pentru instrumentele de pe gazdă (`redis-cli`, un `npm run dev` local). Publicarea pe
> `0.0.0.0` ar expune un Redis neautentificat tuturor gazdelor din rețeaua LAN. Dacă setați
> `REDIS_BIND_HOST=0.0.0.0`, adăugați și `--requirepass` la `command:` al serviciului.

**Dezactivarea Redis** nu este recomandată (limitatorul ratei va trece la o soluție de rezervă în memorie). Dacă este necesar, fie eliminați/comentați blocul serviciului `redis:` din `docker-compose.yml`, fie reduceți numărul de instanțe la zero:

```bash
docker compose up -d --scale redis=0
```

## Compose pentru producție

Pentru un instantaneu de producție izolat care rulează în paralel cu mediul de dezvoltare, utilizați `docker-compose.prod.yml`.

| Detaliu                             | Valoare                                                                                |
| ----------------------------------- | -------------------------------------------------------------------------------------- |
| Fișier                              | `docker-compose.prod.yml`                                                              |
| Port implicit pentru panoul de bord | `PROD_DASHBOARD_PORT=20130` (mapat la portul intern `${DASHBOARD_PORT:-20128}`)        |
| Port API implicit                   | `PROD_API_PORT=20131`                                                                  |
| Imagine                             | `omniroute:prod` (construită din ținta `runner-cli`)                                   |
| Container Redis                     | `omniroute-redis-prod` (`redis:8.6.2`, volum dedicat `redis-prod-data`)                |
| Volum de date                       | `omniroute-prod-data` (denumit, păstrat între reconstruiri)                            |
| Verificări de funcționare           | `node healthcheck.mjs` + `redis-cli ping`, cu `depends_on` condiționat de starea Redis |

Mod de utilizare:

```bash
# Construiți și porniți stiva de producție
docker compose -f docker-compose.prod.yml up -d --build

# Urmăriți jurnalele în timp real
docker compose -f docker-compose.prod.yml logs -f

# Opriți și eliminați stiva (păstrați volumele)
docker compose -f docker-compose.prod.yml down
```

Stiva de producție rulează în paralel cu configurația compose de dezvoltare (nume de containere, porturi și volume diferite), astfel încât puteți continua dezvoltarea locală în timp ce mediul de producție rămâne activ.

## Etapele Dockerfile

Depozitul furnizează un fișier Dockerfile în mai multe etape (`Dockerfile`). Sunt expuse patru etape; alege `target` potrivit pentru cazul tău de utilizare.

| Etapă         | Imagine de bază       | Scop                                                                                                                                                                                                                                                                                                          |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instalează deps (`npm ci --legacy-peer-deps`) și rulează `npm run build` (Turbopack în mod implicit — vezi mai jos Resursele din timpul construirii)                                                                                                                                                          |
| `runner-base` | `node:26-trixie-slim` | Timp de funcționare a producției cu ieșire autonomă Next.js.** Niciun furnizor CLIs inclus.**                                                                                                                                                                                                                 |
| `runner-cli`  | `runner-base`         | Adaugă `git`, `docker.io`, `docker-compose` și CLIs global : `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Alegeți acest lucru pentru fluxurile de lucru agentice.**                                                                                                                   |
| `runner-web`  | `runner-base`         | Adaugă Playwright + un browser Chromium (`--with-deps`) pentru furnizorii de sesiuni web: `gemini-web`, `claude-web`, `claude-turnstile`.** Alegeți acest lucru atunci când utilizați acei furnizori** — imaginea simplă eșuează la momentul solicitării fără ea (vezi nota `-web` de sub Canale de lansare). |

Creați manual o țintă specifică:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Resurse în timpul construirii

Trei argumente de construcție controlează cât costă etapa `builder`. Ele sunt doar în timpul construirii. — `OMNIROUTE_MEMORY_MB` (mai jos) este un buton separat, de rulare.

| Construiți arg              | Implicit | Efect                                                                                                   |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` se construiește cu webpack: memorie de vârf mai mică, mai lentă. `1` optează pentru Turbopack.      |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | plafon V8 heap (`--max-old-space-size`) pentru `next build` generat .                                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | Feeds `CIRCLE_NODE_TOTAL`; În continuare, derivă `workers = N - 1` pentru colectarea datelor de pagină. |

`OMNIROUTE_BUILD_WORKERS` este cel care trebuie să ridice pe un constructor mare și cel care să suspecteze când o construcție constrânsă moare** după** `✓ Compiled successfully`. Fiecare lucrător de date de pagină este propriul său proces, la fel și `next build` ul părinte însuși; o reproducere VPS live (problema #7518) a măsurat RSS de vârf al fiecărui proces la ~ 4,5 GB independent de indicatorul `NODE_OPTIONS` heap (Turbopack se compilează în memoria native/Rust în afara heap-ului V8). Valoarea implicită a `2` (→ 1 worker, 2 procese în total) este dimensionată pentru cei 16 GB / 4 vCPU găzduiți de rulare GitHub pe care le utilizează pipeline de publicare. La `8` (→ 7 lucrători) acel alergător a rămas fără memorie și kit-ul de construcție a eșuat pasul cu `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 lucrători) încă nu se potriveau odată ce RSS per proces a fost măsurat direct în loc de dedus. `tests/unit/docker-build-memory-budget.test.ts` face aritmetica față de cifra măsurată și nu reușește dacă oricare dintre butoanele depășește alergătorul.

Turbopack se compilează în memoria nativă Rust care trăiește** exterior** heap-ul V8, deci `OMNIROUTE_BUILD_MEMORY_MB` nu îl leagă. Pe o gazdă cu un plafon de memorie, construcția este apoi SIGKILLed de către ucigașul OOM fără niciun text de eroare — pur și simplu se oprește la mijlocul `Creating an optimized production build`, care se citește ca o blocare mai degrabă decât ca o memorie lipsită. Acesta este motivul pentru care `Dockerfile` este implicit la webpack (`OMNIROUTE_USE_TURBOPACK=0`), spre deosebire de `npm run dev` / `npm run build`, unde Turbopack este codul implicit: un `docker build .` gol fără argumente de construcție (ceea ce rulează Railway și alte gazde cu un singur clic) nu trebuie să moară în tăcere pe un constructor cu memorie limitată. Imaginile publicate trec deja `OMNIROUTE_USE_TURBOPACK=0` explicit în `docker-publish.yml`. Pentru un constructor cu multe RAM, optați pentru Turbopack pentru o construcție mai rapidă:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` este activat, deci `next build` rulează un părinte** şi** un proces de muncitor si fiecare onoreaza `OMNIROUTE_BUILD_MEMORY_MB` separat. Măriți plafonul containerului peste aproximativ de două ori această valoare, nu o dată.

Măsurat pe acest arbore (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler    | Plafonul containerului | Rezultat                             |
| ---------- | ---------------------- | ------------------------------------ |
| Turbopack  | 8 GiB / 16 GiB         | OOM-ucis la amândoi, în tăcere       |
| pachet web | 8 GiB                  | muncitor constructor SIGKILLed       |
| pachet web | 12 GiB                 | a reușit, a atins vârful la 11,1 GiB |

### Valori implicite de rulare

Valori implicite exportate de `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamentul memoriei în Docker:

- Imaginea setează `OMNIROUTE_MEMORY_MB=1024` și derivă `NODE_OPTIONS=--max-old-space-size=1024` din aceasta.
- Procesul propriu-zis al serverului este pornit de lansatorul autonom, care citește `OMNIROUTE_MEMORY_MB` și adaugă `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Nodul folosește ultima valoare `--max-old-space-size` repetată, astfel încât setarea `OMNIROUTE_MEMORY_MB` controlează limita efectivă a heap Docker.
- Deoarece imaginea o stabilește întotdeauna, funcția de rezervă calibrată de RAM propriu al lansatorului nu se aplică niciodată sub Docker. Creșteți-l în mod explicit pentru volumul de muncă (tabelul de mai jos). `2048` este încă prea mic pentru agentul de codificare `/v1/responses`.

### Runtime RAM pentru agenți de codare

Valoarea implicită de 1 GiB Docker este un etaj dashboard/light-chat, nu o dimensiune de producție. Corpurile `POST /v1/responses` lungi (sute de mesaje, zeci de instrumente) rețin mai multe grafice în memorie în timpul compresiei. Două cereri suprapuse ~ 3 MiB / ~ 750k-token au anulat V8 la un** 12 GiB** vechi-spațiu (`FATAL ERROR: Reached heap limit`) și, de asemenea, a lovit un 16 GiB cgroup OOM. Vezi [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensiune** cgroup `--memory` deasupra mormanului** Bufferele native —, SQLite și intermediarii de compresie se află în afara V8.

| Volumul de muncă                       | `OMNIROUTE_MEMORY_MB`         | Container / cgroup        | Note                                                                                             |
| -------------------------------------- | ----------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------ |
| Tabloul de bord, un chat ușor          | `1024` (imagine implicită)    | ≥2 GiB                    |                                                                                                  |
| Un agent de codare (Claude/Codex/Grok) | `8192`                        | ≥10 GiB                   | `/v1/responses` tipic cu o singură sesiune                                                       |
| Două `/v1/responses` lungi simultane   | `10240`–`12288`               | ≥12–16 GiB                | Avortarea V8 măsurată la ~ 12 GiB heap                                                           |
| Trei + contexte lungi concurente       | nu faceți pe un singur proces | serializa / mai multe RAM | Admiterea implicită la categoria grea este 1 în zbor; ridicarea lui fără RAM reintroduce avortul |

`omniroute serve` pe metal goale calibrează ~ 35% din RAM ( `[512, 4096]` prins) când `OMNIROUTE_MEMORY_MB` este** neasezat** . Docker setează întotdeauna `1024`, astfel încât calibrarea nu rulează niciodată în imaginea oficială.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Variabile de mediu critice

Pe lângă valorile implicite documentate în [ENVIRONMENT.md](../reference/ENVIRONMENT.md), următoarele variabile sunt cele mai importante atunci când se rulează în Docker:

| Variabilă                     | Scop                                                                                                                                                                                                                                                                             | Valoare implicită          |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Secret partajat pentru puntea WebSocket. **Obligatoriu în producție** — setați-l la un șir aleatoriu puternic.                                                                                                                                                                   | nesetat (trebuie furnizat) |
| `REDIS_URL`                   | Șir de conexiune pentru limitatorul de rată / backendul de cache                                                                                                                                                                                                                 | `redis://redis:6379`       |
| `REDIS_PORT`                  | Portul de pe gazdă pentru containerul Redis inclus                                                                                                                                                                                                                               | `6379`                     |
| `REDIS_BIND_HOST`             | Interfața gazdei pe care este publicat portul Redis inclus (loopback, dacă nu adăugați AUTH)                                                                                                                                                                                     | `127.0.0.1`                |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Calea de pe gazdă montată în profilul `cli` la `/workspace/omniroute` pentru fluxurile de lucru de autoactualizare                                                                                                                                                               | `.` (directorul curent)    |
| `OMNIROUTE_MEMORY_MB`         | Limita heap-ului Node în timpul rulării pentru serverul Docker autonom; suprascrie valoarea implicită a imaginii de mai sus. Agenți de programare: `8192`+ (consultați [memoria RAM de execuție](#runtime-ram-for-coding-agents)).                                               | `1024`                     |
| `DASHBOARD_PORT` / `API_PORT` | Suprascrie porturile expuse pentru panoul de control (20128) și API (20129)                                                                                                                                                                                                      | `20128` / `20129`          |
| `APP_BIND_HOST`               | Interfața gazdei pe care docker-compose publică porturile panoului de control/API/live-WS. Cu `REQUIRE_API_KEY=false` (valoarea implicită), `0.0.0.0` expune proxy-ul anonim `/v1` către LAN — extindeți accesul numai cu `REQUIRE_API_KEY=true` sau cu un proxy invers în față. | `127.0.0.1`                |
| `CLIPROXY_BIND_HOST`          | Interfața gazdei pe care docker-compose publică sidecar-ul `cliproxyapi` — volumul său de date conține acreditările furnizorilor.                                                                                                                                                | `127.0.0.1`                |
| `OMNIROUTE_PLUGINS_DIR`       | Directorul pe care scanerul de pluginuri din timpul rulării îl citește și în care instalează. Setați-l când pluginurile sunt montate prin bind mount: valoarea implicită urmează `HOME`, pe care o imagine nu este obligată să o exporte.                                        | `~/.omniroute/plugins`     |
| `OMNIROUTE_BASE_PATH`         | Subcalea URL atunci când aplicația este publicată în spatele unui proxy invers (de ex. `/omniroute`)                                                                                                                                                                             | _(gol = rădăcină)_         |
| `NEXT_PUBLIC_BASE_URL`        | Originea publică din browser, inclusiv subcalea (de ex. `https://host/omniroute`)                                                                                                                                                                                                | nesetat                    |
| `PROD_DASHBOARD_PORT`         | Portul panoului de control de pe gazdă pentru `docker-compose.prod.yml`                                                                                                                                                                                                          | `20130`                    |
| `CLIPROXYAPI_PORT`            | Portul de pe gazdă pentru sidecar-ul `cliproxyapi`                                                                                                                                                                                                                               | `8317`                     |

## Proxy invers pe o cale secundară (Traefik / nginx)

Next.js `basePath` este compilat în pachetul independent. OmniRoute înregistrează valoarea coaptă într-un fișier sentinel la rădăcina aplicației (scris în timpul `npm run build`; citit de `scripts/docker/ensure-docker-base-path.mjs`) și o compară cu `OMNIROUTE_BASE_PATH` când pornește containerul. Când acestea diferă și imaginea a fost construită pentru rădăcina domeniului, punctul de intrare rescrie manifestele de sine stătătoare, literalele `basePath`/`assetPrefix` încorporate (urmatorul 16 redă SSR asset URLs de la `assetPrefix` singur — patch-ul oglindește sub-calea în ea), URLs coapte `/_next/static` (eroare de importare de media clinder, manifestări de preferință, pagini) și clientul `process.env` shim înainte ca `node dev/run-standalone.mjs` să ruleze.

### Compune build (recomandat)

Setați ambele variabile în `.env`, apoi reconstruiți astfel încât imaginea și timpul de execuție să fie de acord:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` transmite `OMNIROUTE_BASE_PATH` ca Docker build-arg și ca variabilă de mediu de rulare.

### Subcale de rulare a imaginii rădăcină pre-construită +

Imaginile `cheaperinference/omniroute:*` publicate sunt create pentru rădăcina domeniului. Puteți încă seta `OMNIROUTE_BASE_PATH` în timpul execuției; containerul plasează pachetul o dată la pornire. Asociați-l cu originea publică care se potrivește:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configurați proxy invers pentru a redirecționa** deplin** cale externă (nu îndepărtați prefixul). Traefik ar trebui să direcționeze `PathPrefix(`/omniroute `)` către container fără `StripPrefix`, astfel încât Next.js primește `/omniroute/...` și servește active de la `/omniroute/_next/...`.

Verificarea sănătății Docker verifică punctul final al ciclului de viață `/healthz` ușor prefixat cu `OMNIROUTE_BASE_PATH` activ. `/api/monitoring/health` rămâne disponibil pentru diagnosticarea human/dashboard ; pentru a îndrepta containerul HEALTHCHECK înapoi spre el (de exemplu, pentru aplicarea profundă a sănătății), setați `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Acea cale este a** adânc** verificați (DB + monitoring summary) — adecvat pentru `HEALTHCHECK` rar al Docker dacă vă înscrieți din nou, dar** nu** pentru intervalele Kubernetes `livenessProbe`.

Pentru orchestratori (Kubernetes, Nomad etc.):

| Sondă                | Prefera                                                                  | Evita                                                                         |
| -------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Vioitate             | HTTP `GET /livez` sau TCP pe portul principal (`PORT`, implicit `20128`) | `/api/monitoring/health` ca viață                                             |
| Pregătire            | HTTP `GET /healthz`                                                      | Timeout-uri strânse care tratează bucla de evenimente ocupată ca fiind moartă |
| Adânc / cutie neagră | `/api/monitoring/health`                                                 | —                                                                             |

`/healthz` raportează ciclul de viață al procesului (`ok` / `starting` / `stopping`). `/livez` este doar proces-alive (200 ori de câte ori handlerul poate rula; nu așteaptă pregătirea). Ambele încă rulează pe aceeași buclă de evenimente Node ca și gestionarea cererilor, astfel încât catalogul legat de CPU sau munca de compresie le poate întârzia — busy ≠ dead. Preferați TCP liveness dacă HTTP sondele expiră. Ghid complet pentru sonde: [Ghid de monitorizare — Recomandări pentru sonde Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose with Caddy (HTTPS Auto-TLS)

OmniRoute poate fi expus în siguranță utilizând furnizarea automată SSL de la Caddy. Asigurați-vă că înregistrarea DNS A a domeniului dvs. indică IP serverului dvs.

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

Caddy setează anteturile de expediere standard pentru containerul din amonte. OmniRoute folosește `NEXT_PUBLIC_BASE_URL` ca origine publică canonică pentru apelurile inverse OAuth și legăturile publice generate; scrierile din tabloul de bord autentificat folosesc cereri de aceeași origine plus protecție CSRF legată de sesiune. Activați `OMNIROUTE_TRUST_PROXY` numai pentru implementări avansate în care doriți în mod intenționat ca OmniRoute să obțină originea publică din antetele redirecționate de încredere în loc de configurația explicită.

## Tunel rapid Cloudflare

Suportul tabloului de bord pentru implementările Docker include un **tunel rapid Cloudflare** cu un singur clic în `Dashboard → Endpoints`. La prima activare, `cloudflared` este descărcat numai atunci când este necesar, este pornit un tunel temporar către endpointul `/v1` curent, iar URL-ul `https://*.trycloudflare.com/v1` generat este afișat direct sub URL-ul public obișnuit.

Panourile de tunel pentru endpointuri (Cloudflare, Tailscale, ngrok) pot fi afișate sau ascunse din `Settings → Appearance` fără a modifica starea tunelului activ.

### Note despre tunel

- URL-urile tunelurilor rapide sunt temporare și se schimbă după fiecare repornire.
- Tunelurile rapide nu sunt restabilite automat după repornirea OmniRoute sau a containerului. Reactivați-le din tabloul de bord atunci când este necesar.
- Instalarea gestionată acceptă în prezent Linux, macOS și Windows pe `x64` / `arm64`.
- Tunelurile rapide gestionate utilizează implicit transportul HTTP/2 pentru a evita avertismentele zgomotoase privind memoria tampon UDP pentru QUIC în mediile de containere cu resurse limitate. Setați `CLOUDFLARED_PROTOCOL=quic` sau `auto` dacă doriți un transport diferit.
- Imaginile Docker includ certificatele CA rădăcină ale sistemului și le transmit către instanța `cloudflared` gestionată, ceea ce evită erorile de încredere TLS atunci când tunelul este inițializat în interiorul containerului.
- Setați `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` dacă doriți ca OmniRoute să utilizeze un binar existent în loc să descarce unul.

## Etichete de imagine

| Imagine                      | Etichetă | Dimensiune | Descriere                                                |
| ---------------------------- | -------- | ---------- | -------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250 MB   | Cel mai înalt** publicat** SemVer stabil (nu git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250 MB   | Fixați această clasă de etichete pentru GitOps           |

Aceleași imagini sunt publicate în trei depozite, cu aceleași rezumate pe arhitectură: `cheaperinference/omniroute` (Docker Hub, organizația Cheaper Inference, începând cu 3.8.53), `ghcr.io/cheaper-inference/omniroute` și moștenirea `diegosouzapw/omniroute`, care își păstrează istoricul de extragere și primește în continuare fiecare lansare. Implementările existente `diegosouzapw/omniroute` continuă să se actualizeze; schimbarea numelui imaginii este opțională. Canalul de pre-lansare `:next` / `:next-web` de mai jos este publicat numai pentru `diegosouzapw/omniroute` și GHCR.

Manifest multiplatformă: `linux/amd64` + `linux/arm64` nativ (Apple Silicon, AWS Graviton, Raspberry Pi). Docker selectează automat arhitectura potrivită; treceți `--platform linux/amd64` dacă trebuie să forțați emularea AMD64 pe gazdele ARM.

### Lansați canale

OmniRoute publică canale Docker separate pentru lansări stabile, testare activă a ramurilor de lansare și versiuni de dezvoltare.

| Canal                           | Sursă                                    | Mutabilitate                         | Utilizare recomandată                                                                                                     |
| ------------------------------- | ---------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | eliberare Signed/versioned               | Imuabil                              | Implementări de producție care fixează o lansare exactă                                                                   |
| `:latest` / `:latest-web`       | Cel mai înalt** publicat** SemVer stabil | Indicator stabil mutabil             | Urmează lansări stabile** după** a SemVer publish job — does** nu** urmăriți comiterile `main` sau `release/v*` nelansate |
| `:next` / `:next-web`           | Ramura `release/v*` implicită curentă    | Indicator de pre-lansare modificabil | Testarea corecțiilor care au ajuns pe ramura de lansare activă, dar nu sunt încă într-o ediție stabilă                    |
| `:main` / `:main-web`           | `main`                                   | Indicator de dezvoltare mutabil      | Numai teste de dezvoltare și integrare                                                                                    |

#### Furnizori de sesiuni web: imaginile `-web`

Fiecare canal de mai sus funcționează ca o etichetă `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), construit din etapa `runner-web` — aceeași imagine plus Playwright și un browser Chromium. Imaginea simplă este trimisă** fără** Crom; `gemini-web`, `claude-web` și `claude-turnstile` au nevoie de el.

Eșecul este amânat, nu timpul de pornire: acei furnizori își listează modelele și se afișează ca fiind conectați în tabloul de bord și doar prima solicitare eșuează cu

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Dacă utilizați acești furnizori, trageți eticheta `-web` a canalului pe care vă aflați deja — nimic altceva nu se schimbă. La o instalare npm/CLI (fără imagine Docker ), piesa echivalentă lipsă este binarul browserului: rulați `npx playwright install chromium` pe gazdă.

#### Folosind canalul de pre-lansare

Canalul `next` este reconstruit la fiecare apăsare către ramura `release/v*` implicită curentă și este publicat atât pentru AMD64 cât și ARM64. Ramurile de întreținere mai vechi nu o pot suprascrie. Canalul oferă o imagine extrasă pentru corecțiile care au fuzionat în ramura de lansare activă înainte ca următoarea etichetă stabilă să fie tăiată.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Pentru Docker Compose, suprascrieți eticheta de imagine utilizată de profilul selectat, apoi trageți și recreați serviciul:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Siguranță și rollback

`next` este un canal plutitor de pre-lansare. Se poate schimba la orice apăsare către ramura de eliberare activă și este** nu este acceptat pentru utilizare în producție** . Fixați rezumatul imaginii în timp ce evaluați o anumită construcție:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Înainte de testare, faceți o copie de rezervă a volumului de date OmniRoute sau a directorului de date montat în legătură. Pentru a derula înapoi, restaurați versiunea stabilă utilizată anterior sau digerați și recreați containerul:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

O construcție de lansare-ramură nu poate muta niciodată `latest`; numai o versiune semantică stabilă eligibilă poate promova indicatorul stabil. Imaginile `next` rețin inspecția imaginii de lansare și blocarea poarta de vulnerabilitate CRITICA.

**`latest` nu este o garanție valutară pentru git.** Remedierile îmbinate pe `main` sau pe ramura activă `release/v*` sunt** nu** în `:latest` până când este publicată o imagine SemVer stabilă și jobul de publicare promovează `:latest` (același digest ca acel SemVer). Dacă `latest` pare înghețat în timp ce GitHub arată deja remedierea, trageți `:next` pentru a testa ramura de lansare sau așteptați eticheta SemVer.

| Tu vrei                                                                  | Utilizare                                |
| ------------------------------------------------------------------------ | ---------------------------------------- |
| GitOps / producție care nu trebuie să derive                             | Fixați `:X.Y.Z` (sau rezumatul imaginii) |
| Urmăriți grajdurile publicate și acceptați o recreare la fiecare lansare | `:latest`                                |
| Testați comiterile `release/v*` nelansate                                | `:next` (nu producție)                   |
| Testează `main`                                                          | `:main` (nu producție)                   |

## Actualizări ale panoului de control în Docker

Un container creat dintr-o imagine publicată nu se poate înlocui singur. Când OmniRoute detectează că rulează într-un
container (fără un checkout `.git`, nefiind o instalare npm), bannerul de actualizare al panoului principal afișează
comanda care trebuie rulată pe gazdă în locul instrucțiunilor npm/git, împreună cu un buton de copiere:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Numele serviciului provine din `AUTO_UPDATE_SERVICE` (implicit `omniroute`, serviciul din
`docker-compose.selfhost.yml`). `pull` actualizează doar o etichetă flotantă (`latest`, `next`); dacă utilizați o etichetă
fixată `:X.Y.Z`, modificați mai întâi eticheta.

### Actualizări cu un singur clic folosind un fișier declanșator pe gazdă

Pentru ca **Actualizează acum** să funcționeze în continuare fără montarea `/var/run/docker.sock` (care îi acordă containerului
acces root pe gazdă — consultați avertismentul pentru profilul `cli` de mai sus), setați `DOCKER_UPDATE_TRIGGER_FILE` pentru
serviciul OmniRoute și rulați un proces de monitorizare pe gazdă:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Calea trebuie să se afle în `DATA_DIR` (valorile relative sunt rezolvate în raport cu acesta); orice altceva este
respins. **Actualizează acum** scrie apoi `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` în acel
fișier, răspunde cu `202`, iar panoul de control interoghează periodic `/api/system/version` până când noua versiune devine activă,
după care se reîncarcă. OmniRoute nu rulează niciodată o comandă shell sau Docker în acest mod. La fel ca în cazul oricărei acțiuni de
actualizare, solicitarea este acceptată numai de la clienți loopback/LAN.

Un director de date montat prin bind îi oferă gazdei o cale stabilă de monitorizat. Exemple de unități `systemd`
(ajustați `/srv/omniroute` la directorul care conține fișierul compose și `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Monitorizare solicitări de actualizare din panoul de control OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Descărcarea și recrearea containerului OmniRoute

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

Serviciul elimină solicitarea înainte de descărcare, astfel încât o execuție eșuată să nu intre într-o buclă. Fără
`DOCKER_UPDATE_TRIGGER_FILE`, panoul de control păstrează fluxul cu comandă manuală.

## Disponibilitate: SQLite implicit este o singură copie

Stock Docker / Kubernetes OmniRoute este** one Node process + one SQLite writer** . Disponibilitatea ridicată este** nesuportat** pe acea topologie.

| Constrângere                                 | Consecinţă                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Un singur scriitor                           | Do** nu** rulați mai multe replici împotriva aceluiași fișier SQLite. Asta corupe DB.                                                                                                                                                                                                                                                                               |
| Recreează / repornește / HEALTHCHECK ucide   | **Întreruperea completă** a SSE în timpul zborului, a sesiunilor de tablou de bord și a stării în memorie. Fiecare client conectat scade. Noile solicitări în timpul ferestrei de punct final goale primesc un proxy invers**`502 Bad Gateway: Unknown error`** , nu OmniRoute JSON — clienții nu pot distinge acest lucru de o defecțiune a furnizorului (#11015). |
| Aceeași buclă de evenimente ca și `/healthz` | Un catalog ocupat sau un bif de compresie poate întârzia probele; un scurt timeout apoi repornește** numai** replica.                                                                                                                                                                                                                                               |

**Matricea sondei** (vezi și [recomandările probei Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sondă          | Ţintă                                                      | Nu utilizați                                                                  |
| -------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Vioitate       | TCP pe `PORT` ( `20128` implicit) sau soft HTTP `/healthz` | `/api/monitoring/health`                                                      |
| Pregătire      | HTTP `GET /healthz`                                        | Timeout-uri strânse care tratează bucla de evenimente ocupată ca fiind moartă |
| Adânc / oameni | `/api/monitoring/health`                                   | Vioație automată a kubeletului                                                |

**Upgrade-uri:** așteptați ca fiecare sesiune să scadă. Scurgeți clienții dacă puteți; nu există nicio actualizare continuă pentru SQLite implicit. Compune `restart: unless-stopped` plus Docker `HEALTHCHECK` va înlocui, de asemenea, singurul proces atunci când containerul este nesănătos - aceeași rază de explozie.

Manifeste gata făcute și o diagramă Helm live în `deploy/kubernetes/` și `deploy/helm/omniroute/` — consultați [ghidul de implementare Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Fragment Kubernetes pentru a** replică unică** (Recrearea este necesară; nu ridicați `replicas` față de un fișier SQLite ):

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

`preStop` sleep permite lui Kube să renunțe la punctele finale ale serviciului înainte de SIGTERM așadar** nou** traficul încetează să lovească procesul de moarte. `/v1/responses` SSE în timpul zborului este scurs până la `SHUTDOWN_TIMEOUT_MS` (implicit 30s) prin contracte de închiriere de admitere grele (#11015). Solicitările noi care ajung încă în proces devin `503` + `Retry-After: 5`. Decalajul Recreează punctul final gol până când înlocuirea este gata rămâne o întrerupere gravă - adică topologia SQLite, nu o config greșită a sondei.

Postgres extern / multi-writer HA este** nu** o cale de stoc documentată. Dacă aveți nevoie HA, păstrați o singură replică sau rulați o topologie pe care proiectul a testat-o și documentată separat. Lucrarea Postgres/MySQL locuiește în [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Până la livrare, singura modalitate acceptată de a se înmulți** mare** Capacitatea `/v1/responses` este N procese independente (secțiunea următoare), nu `replicas > 1` pe un volum.

## Scale-out: N procese independente

### Proprietatea de rotație a jetoanelor Codex

Copiile unui cont Codex nu trebuie să consume în mod independent indicativul de reîmprospătare de unică folosință. În cazurile care consumă numai acreditări sincronizate, setați `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Lăsați-l nesetat pe proprietarul cu o singură rotație. Fiecare proces are nevoie de propriul `DATA_DIR`; această opțiune nici nu partajează SQLite și nici nu furnizează sincronizarea token-ului sau o blocare distribuită.

Instanța pasivă recitește conexiunea atunci când este necesară o reîmprospătare și adoptă doar un simbol de acces diferit, neexpirat. În caz contrar, reîmprospătarea este dezactivată fără a expira sau a dezactiva conexiunea sau a număra o eroare a întrerupătorului de reîmprospătare. Eșecurile reale de autentificare din amonte folosesc încă contabilizarea eșecului normal, răcirea exponențială și eroarea normală a clientului; dezactivarea contului rămâne permanentă. Sincronizați jetoanele rotite ale proprietarului înainte ca jetoanele de acces să expire (proiectul implicit de reîmprospătare proactivă este de cinci minute) sau reimportați fișierul de autentificare Codex. Importurile pasive stochează token-urile furnizate fără a le valida la punctul final al token-ului. Reîmprospătarea manuală dashboard/API returnează `409 refresh_disabled`; noile autentificări OAuth sunt neschimbate. Consultați [referința de mediu](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Procesul One Node este** o grămadă V8** . Două suprapuse ~ 3 MiB / ~ 750k-token-coding-agent `POST /v1/responses` (RTK + Caveman) anulează acel heap la ~ 12 Gi (`FATAL ERROR: Reached heap limit`) și pot OOM un cgroup de 16 Gi. Vezi [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Această măsurătoare este a** memorie-buget** avertisment, nu un produs hard-max de două `/v1/responses` lungi simultane. Admiterea de chat grea este blocată de un buget de octeți de asimilare auto-derivat (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) dimensionat din același plafon V8/cgroup — suprascriind-o în sus (sau setarea limitei de număr de cereri `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` moștenite) pe un proces deja dimensionat reintroduce anularea. Chaturile mici, `/healthz`, `/v1/models`, și MCP sunt** nu** in acel capac.

### Un singur proces: mai mult de două `/v1/responses` lungi

O** sănătos** proces (heap sub `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, implicit `0.75`)** mai** rulați mai mult de două `POST /v1/responses` lungi simultane atunci când bugetul de octeți de zbor la nivelul întregului proces (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) mai are spațiu. Corpurile la sau peste `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (implicit 256 KiB) acceptă aceeași închiriere grea ca și solicitările cu structură grea și folosesc aceeași evadare `tryAcquireHealthyHeadroom` [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Zeci de clienți SSE lungi concurenți (operatorii au adesea nevoie de 40–50) este a** memorie-buget** întrebare — size heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nu este o limită de produs „max. 2”. O grămadă sub presiune se pierde în continuare cu `503` reîncercat, astfel încât #7849 nu revine.

La** înmulți grămezi** (spații vechi V8 independente)** astăzi** :

| Do                                                                                                                                               | Nu                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Fugi** N containers/pods** , fiecare cu ei** proprii** `DATA_DIR` / volum                                                                        | Setați `replicas > 1` față de un fișier SQLite                            |
| Dimensiune grea în zbor + healthy-headroom din bugetul heap/inflight-byte; 1–2 este valoarea implicită conservatoare #7849, nu un produs dur max | Dați unui proces 8 × RAM și o limită de numărare nelimitată               |
| Opțional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` pentru** contoare de cote partajate**                                             | Tratați Redis ca SQLite — partajat, nu este                               |
| Duplicați secretele furnizorului în fiecare instanță (sau acceptați tablouri de bord partiționate)                                               | Așteptați-vă la un tablou de bord/un jurnal de apeluri în toate cazurile  |
| Față cu orice echilibrator de sarcină; sticky by API key sau session este suficient                                                              | Necesită un middleware specific de vânzător care ține seama de dimensiune |

Afinitatea dintre sesiune și cont poate fi partajată și prin Redis: setați `OMNIROUTE_SESSION_AFFINITY_STORE=redis` și `REDIS_URL` pe fiecare proces, cu același `REDIS_KEY_PREFIX` și o setare `sessionAffinityTtlMs` pozitivă. Pinurile rezolvă identitățile hashing ale conturilor de utilizare la conexiunea locală eligibilă a fiecărui proces, astfel încât conturile OAuth cu metadate de identitate corespunzătoare nu trebuie să aibă conexiunea IDs corespunzătoare. Identitățile de cont cunoscute au prioritate față de IDs local contradictoriu în rezoluția pinului și evacuarea supravegheată; înregistrările fără identitate (sau apelanții evacuați fără identitate) păstrează paza ID moștenită. Conturile fără o identitate stabilă de utilizare necesită în continuare potrivirea IDs. erorile Redis sau apelurile care depășesc 100 ms revin la SQLite local. Fiecare magazin de afinitate Redis limitează operațiunile restante la 8, ocolește Redis imediat când este plin și eliberează sloturi numai atunci când munca de bază se stabilește, nu la termenul limită al apelantului. În timpul unei întreruperi Redis nu există un adevăr comun: fiecare instanță revine la propria sa afinitate locală, sesiunile se pot fixa din nou o dată pe instanță și instanțele pot diverge. Adezivitatea re-converge prin Redis atunci când își revine. Timpul limită de așteptare, nu un EVAL trimis, care poate ateriza după fallback. Scrierile de rutare compară valoarea exactă observată de decizia de rutare, nu o citire proaspătă în timpul mutației; o ratare observată sau o observație de rezervă SQLite se compară ca o cheie Redis absentă. Pinurile învechite sunt înlocuite într-un singur CAS, astfel încât o comandă întârziată nu poate înlocui sau șterge un pin mai nou, diferit. Redis citește atomic returnează valoarea și serverul rămas TTL; PTTL pozitiv (sau fără expirare) determină vitalitatea, nu marcajul de timp JSON al scriitorului sau ceasul cititorului. Instantaneele locale cartografice care rămân TTL la un termen local; cheile JSON existente rămân lizibile și octeții lor bruti sunt păstrați pentru CAS. Redis este singura sursă de adevăr în timp ce răspunde. Suprasările, atingerile și ștergerile partajate confirmate elimină intrarea locală, nu o instalați sau reîmprospătați niciodată. SQLite pe calea Redis deține numai propriile decizii de rezervă ale acestei instanțe de la erori Redis, timeout-uri sau saturație de admitere, limitate de TTL ca înainte. Un PIN local lipsă la o întrerupere ulterioară costă o nouă alegere (o pierdere prompt-cache), nu un cont greșit sau evacuat. Încălțările respinse returnează câștigătorul partajat și TTL său rămas în mod atomic: selecția obișnuită verifică din nou termenul local mapat și folosește un câștigător eligibil încă în viață, atingând utilizarea și înregistrându-se pentru acel cont fără o altă scriere partajată. Dacă nu este disponibil, selecția păstrează candidatul local, lasă pinul partajat neschimbat și emite un mesaj de depanare. CAS respins nu scrie SQLite; Erorile Redis, timeout-urile sau saturația de admitere aplică în schimb operația locală existentă. Dacă răspunsul unei mutații trimise ajunge după expirarea timpului (acceptat, respins sau eroare), o comparare și ștergere a valorii serializate exacte sincrone elimină numai rândul de rezervă de timeout identic pentru octeți. Nu există nicio așteptare între acea comparație și ștergere; se păstrează o scriere de întrerupere mai nouă. Evacuarea supravegheată elimină propriul PIN local al contului eșuat chiar și cu Redis jos și îl curăță din nou după evacuarea partajată confirmată. În așteptarea răspunsurilor partajate anterioare, nu se poate restabili un PIN local evacuat, deoarece succesele partajate nu scriu niciodată SQLite. O întrerupere de rezervă ulterioară poate repune un cont; o scriere partajată acceptată ulterior există numai în Redis. Redis miss nu consultați statul de rezervă local. Cu driverul oprit, pinii nou selectați păstrează forma moștenită SQLite JSON cu patru câmpuri; numai rutarea Redis adaugă identitatea contului hashing. Pinurile preîncărcate sunt verificate din nou la limita lor de expirare. Redis non-lease selection recitește magazinul, dar planificarea sincronă a contractului de închiriere poate folosi totuși un indicator scos între preluare și planificare (o fereastră acceptată pentru cel mai bun efort). O comitere de închiriere nu poate schimba conturile după o revendicare durabilă: la upsert respins, acesta păstrează candidatul revendicat doar pentru acea cerere și îl lasă neatins pe câștigătorul comun, astfel încât acordul între cazuri este limitat pe acea cale. Restul tabelului se aplică în continuare: aceasta nu împărtășește adeziunea sesiunii combinate, pinii nativi Codex turn, semaforele contului, blocările, limitele de cheltuieli, configurația sau jurnalele de apeluri.

Hardware: `/v1/responses` lung concurent pe o instanță este a** memorie-buget** întrebare (heap + inflight-byte / #10110). `N` independent `DATA_DIR` s înmulțesc în continuare grămezi: gazda RAM trebuie să acopere `N × cgroup`, nu „un pod de 16 Gi cu N = 8”. Nu `replicas > 1` niciodată pe un fișier SQLite.

Compuneți schița (două grămezi, două volume — nu `deploy.replicas: 2`):

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

Densitatea în proces (compresia de pe izolatul HTTP ) este [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Un cluster logic pe starea durabilă partajată este [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Erori regionale Gemini în Docker

Google AI Studio / Gemini API poate returna HTTP 400 cu FAILED_PRECONDITION și
`User location is not supported for the API use.` O solicitare reușită pe gazdă
nu demonstrează că acel container utilizează aceeași rută de ieșire. Ordinea DNS,
conectivitatea IPv4/IPv6, rutarea VPN și proxy-urile configurate pot fi diferite. Verificați
[regiunile acceptate de Google](https://ai.google.dev/gemini-api/docs/available-regions),
precum și ruta efectivă a conexiunii; această eroare, de una singură, nu indică o cheie API nevalidă.

### Preferați un proxy specific conexiunii

Utilizați [configurarea proxy per conexiune](../ops/PROXY_GUIDE.md#4-level-proxy-system)
din OmniRoute pentru conexiunea Gemini afectată, apoi repetați **Test Connection** și o solicitare mică
folosind același model. Astfel, modificarea rutării rămâne limitată la conexiunea respectivă. Verificați
că proxy-ul este accesibil din container și că acea conexiune chiar îl selectează.
Schimbarea rutei nu garantează eligibilitatea regională la serviciul din amonte.

### Comparați rețeaua gazdei cu cea a containerului

Păstrați neschimbate cheia, modelul și solicitarea atunci când comparați rezultatele autentificate; nu
inserați niciodată într-o problemă raportată credențiale, parole de proxy sau antete de autorizare complete.
Mai întâi, verificați ce familii de adrese oferă resolverul sistemului de operare, utilizând aceeași comandă
pe gazdă și în interiorul containerului:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Înlocuiți `omniroute` cu serviciul pe care îl rulați (de exemplu, `omniroute-web`). Aceste
comenzi afișează familiile de adrese fără credențiale sau adrese IP. Valoarea returnată `6`
indică doar un rezultat DNS IPv6: aceasta **nu** demonstrează existența unei rute IPv6 utilizabile sau accesul la API.
Acolo unde este instalat `curl`, comparați `curl -4 -I https://generativelanguage.googleapis.com`
cu `curl -6 -I https://generativelanguage.googleapis.com` în ambele medii.
Un răspuns HTTP demonstrează conectivitatea pentru acea verificare, chiar dacă este o eroare
neautentificată; numai solicitarea autentificată către model testează eligibilitatea Gemini.

### Alternativă la nivelul gazdei: IPv6 funcțional și politica resolverului

Persoana care a raportat [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) a restabilit
accesul în mediul său activând IPv6 pentru containere și modificând selecția adreselor în glibc.
Tratați aceasta ca pe o alternativă specifică mediului. Confirmați că IPv6 funcționează pe gazdă,
precum și rutarea/ieșirea containerului și regulile firewallului, înainte de a ajusta preferințele resolverului.
O adresă ULA privată, de una singură, nu confirmă conectivitatea IPv6 publică.

Pentru serviciile deja atașate la rețeaua implicită a Compose, acest fragment activează
IPv6 în rețeaua respectivă; păstrați restul configurației serviciului, porturilor și volumelor:

```yaml
networks:
  default:
    enable_ipv6: true
```

Pentru o rețea denumită, activați această opțiune în rețeaua la care se conectează efectiv serviciul. Docker poate
aloca un subnet ULA; selectați un subnet explicit, fără suprapuneri, numai atunci când rețeaua
dumneavoastră impune acest lucru. Consultați [rețelele IPv6 Docker](https://docs.docker.com/engine/daemon/ipv6/)
și [opțiunile de rețea Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Într-o **imagine bazată pe glibc**, `/etc/gai.conf` poate modifica selecția adreselor. Fișierul Dockerfile
actual al depozitului utilizează Debian; imaginile personalizate bazate pe musl nu folosesc același mecanism.
Ajustarea raportată schimbă eticheta ULA din `label fc00::/7 6` în
`label fc00::/7 1`. Porniți de la tabelul complet de politici al imaginii și păstrați celelalte
intrări ale acestuia: adăugarea unei intrări `label` sau `precedence` înlocuiește tabelul implicit, astfel încât un fișier
care conține numai linia modificată este insuficient. Documentația
[de configurare glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
descrie această semantică. Montați fișierul verificat prin bind în modul doar pentru citire la `/etc/gai.conf`
și recreați serviciul pentru a aplica modificarea.

Aceasta modifică selecția adreselor la nivelul sistemului de operare pentru **tot traficul de ieșire din containerul respectiv**.
Nu obligă toate aplicațiile să aleagă IPv6: ordinea DNS și selecția conexiunii în Node
contează, de asemenea. În special, `--dns-result-order=ipv4first` acordă prioritate IPv4 și
nu reprezintă o soluție pentru o eroare care apare numai prin IPv4. Consultați [ordinea DNS în Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Retestați Gemini și ceilalți furnizori după orice modificare la nivelul gazdei. Pentru revenire,
eliminați montarea personalizată a `gai.conf`, restaurați configurația anterioară a rețelei și
recreați serviciul/rețeaua afectată în timpul unei ferestre de mentenanță. Recrearea unei rețele
poate întrerupe celelalte containere atașate acesteia; nu ștergeți volumul de date persistente.

## Note importante

- **Modul WAL SQLite:** Comanda `docker stop` trebuie lăsată să se finalizeze, astfel încât OmniRoute să poată salva cele mai recente modificări în `storage.sqlite` printr-un checkpoint. Fișierele Compose incluse configurează deja o perioadă de grație de 40 s pentru oprire. Dacă rulați imaginea direct, păstrați `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Setați la `true` dacă backupurile periodice/anterioare scrierii sunt gestionate extern. Migrările bazelor de date existente necesită în continuare propriul instantaneu de siguranță persistent și mecanismul de protecție pentru migrările în masă.
- **Persistența datelor:** Montați întotdeauna un volum la `/app/data` pentru a păstra baza de date, cheile și configurațiile la repornirea containerelor.
- **Configurarea portului:** Suprascrieți variabila de mediu `PORT` pentru a schimba portul implicit `20128`.

## Consultați și

- [Ghid de implementare pe o mașină virtuală](../ops/VM_DEPLOYMENT_GUIDE.md) — Configurare VM + nginx + Cloudflare
- [Ghid de implementare pe Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementare pe Fly.io
- [Configurarea mediului](../reference/ENVIRONMENT.md) — Referință completă pentru `.env`
