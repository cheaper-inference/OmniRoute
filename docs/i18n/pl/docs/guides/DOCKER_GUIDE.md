# 🐳 Docker Guide — OmniRoute (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Kompletny przewodnik dotyczący wdrażania za pomocą Dockera. Aby szybko rozpocząć, zobacz [sekcję README dotyczącą Dockera](../README.md#-docker).

## Spis treści

- [Szybkie uruchomienie](#quick-run)
- [Z plikiem środowiskowym](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Dostępne profile](#available-profiles)
- [Konfigurowanie narzędzi CLI hosta, gdy OmniRoute działa w Dockerze](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Kontener pomocniczy Redis](#redis-sidecar)
- [Compose dla środowiska produkcyjnego](#production-compose)
- [Etapy pliku Dockerfile](#dockerfile-stages)
- [Krytyczne zmienne środowiskowe](#critical-environment-variables)
- [Docker Compose z Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Szybki tunel Cloudflare](#cloudflare-quick-tunnel)
- [Tagi obrazów](#image-tags)
- [Aktualizacje panelu w Dockerze](#dashboard-updates-in-docker)
- [Dostępność: domyślna baza SQLite obsługuje jedną replikę](#availability-default-sqlite-is-single-replica)
- [Błędy regionalne Gemini w Dockerze](#gemini-regional-errors-inside-docker)
- [Ważne uwagi](#important-notes)

---

## Szybki bieg

> **Self-host w jednym poleceniu?** Zobacz [Przewodnik po Self-Hoście](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (opublikowany obraz + Redis, tylko pętla zwrotna, bez wyboru profilu). Poniższe Szybkie uruchomienie to ścieżka z jednym kontenerem dla użytkowników, którzy już korzystają Redis gdzie indziej.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Z plikiem środowiska

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
# Profil podstawowy (bez narzędzi CLI)
docker compose --profile base up -d

# Profil CLI (wbudowane Claude Code, Codex i OpenClaw)
docker compose --profile cli up -d

# Profil hosta (przeznaczony głównie dla systemu Linux; montuje pliki binarne CLI hosta tylko do odczytu)
docker compose --profile host up -d

# Profil webowy (Chromium/Playwright dla dostawców korzystających z sesji internetowych)
docker compose --profile web up -d

# Połączenie profilu CLI z kontenerem pomocniczym CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Dostępne profile

OmniRoute udostępnia profile Compose dla głównych wariantów wdrożenia. Wybierz profil odpowiadający Twojemu środowisku.

| Profil            | Usługa           | Kiedy używać                                                                                                                                                                     | Polecenie                                    |
| ----------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (domyślny) | `omniroute-base` | Serwer bez interfejsu graficznego / minimalne środowisko uruchomieniowe, bez dołączonych narzędzi CLI dostawców                                                                  | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Przepływy pracy agentów wywołujące `omniroute providers/setup/doctor` oraz dołączone narzędzia CLI (Codex, Claude Code, Droid, OpenClaw)                                         | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Hosty z systemem Linux, które chcą uzyskać dostęp podobny do `network_mode` do narzędzi CLI hosta przez montowanie `~/.local/bin`, `~/.codex`, `~/.claude` itd. tylko do odczytu | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Uruchamia kontener pomocniczy [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na porcie `8317` w celu pośredniczenia w dostępie do nadrzędnych narzędzi CLI          | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Dostawcy korzystający z sesji internetowych, którzy wymagają przeglądarki: `gemini-web`, `claude-web`, `claude-turnstile` (buduje `runner-web`, Chromium w zestawie)             | `docker compose --profile web up -d`         |

> Można łączyć wiele profili: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurowanie narzędzi CLI hosta, gdy OmniRoute działa w Dockerze

`omniroute setup-codex`, `setup-claude`, `config set <tool>` oraz przycisk
**Zapisz konfigurację** w panelu zapisują pliki takie jak `~/.codex/*.config.toml`. Ścieżki te
mają znaczenie wyłącznie na maszynie, na której faktycznie działa CLI. Uruchomienie
tych poleceń wewnątrz kontenera powoduje zapis w katalogu domowym kontenera (`/home/node` —
obraz działa jako `USER node`), z którego żadne CLI hosta nigdy ich nie odczyta i którego
zawartość zostanie usunięta w chwili ponownego utworzenia kontenera.

OmniRoute wykrywa tę sytuację i zamiast zgłaszać sukces, z którego nie można skorzystać,
odmawia zapisu oraz wyświetla instrukcje: CLI kończy działanie z kodem `2`, a API odpowiada
kodem `422` z `containerEphemeralTarget: true`.

### Zalecane: uruchom CLI na hoście, a OmniRoute w Dockerze

Kontener udostępnia API, natomiast CLI konfiguruje narzędzia na hoście.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # skieruj CLI do kontenera
omniroute setup-codex                      # zapisuje właściwy katalog ~/.codex na hoście
```

To właściwy wybór, gdy Codex, Claude Code, Cursor lub podobne narzędzia działają na
laptopie — a jest to typowa konfiguracja.

### Alternatywa: zamontuj katalogi konfiguracyjne hosta (`host` profile)

Jeśli chcesz, aby sam kontener zapisywał konfigurację hosta, zamontuj w nim odpowiednie
katalogi i ustaw `CLI_CONFIG_HOME` na katalog główny montowania. Profil `host`
już to robi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

To właśnie montowanie typu bind sprawia, że ścieżce można zaufać: OmniRoute odczytuje
`/proc/self/mountinfo` i zezwala na zapis do zamontowanych ścieżek (oraz do katalogów,
których katalogi podrzędne są punktami montowania — dokładnie tak jak `/host-home`
powyżej), nadal odmawiając zapisu do niezamontowanych ścieżek.

### Obejście: skonfiguruj narzędzia CLI samego kontenera (używaj oszczędnie)

Jeśli narzędzia CLI rzeczywiście znajdują się wewnątrz kontenera (profil `cli`), zapis
jest zamierzony. Przekaż `--allow-container-write` do dowolnego polecenia `setup-*`
albo ustaw `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` dla serwera. Zapis zostanie
wykonany wraz z ostrzeżeniem, że nie przetrwa usunięcia kontenera.

> **Ostrzeżenie dotyczące bezpieczeństwa — profil `cli` i montowanie `docker.sock`.**
> Profil `cli` montuje `/var/run/docker.sock`, aby automatyczny aktualizator wewnątrz
> kontenera mógł ponownie utworzyć stos za pośrednictwem demona hosta
> (`src/lib/system/autoUpdate.ts` sprawdza obecność tego gniazda i pomija
> ścieżkę Dockera, gdy go nie ma). To gniazdo stanowi **granicę zaufania zapewniającą
> uprawnienia root na hoście**: wszystko, co może uzyskać do niego dostęp, steruje demonem
> Dockera na hoście jako root — może tworzyć, sprawdzać, zatrzymywać i usuwać dowolne
> kontenery na hoście. Konsekwencje:
>
> 1. **Nigdy nie udostępniaj portu profilu `cli` w sieci.** Opublikuj
>    go na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` dostępny z sieci LAN sprawia, że dowolna luka RCE na poziomie
>    panelu prowadzi do pełnego przejęcia hosta.
> 2. **Nie montuj żadnych dodatkowych katalogów hosta w profilu `cli`.**
>    Gniazdo Dockera wraz z jakimkolwiek dodatkowym montowaniem zapewnia kontenerowi
>    pełny dostęp do odczytu i zapisu systemu plików oraz konfiguracji hosta. Jeśli
>    narzędzie musi mieć dostęp do projektu, uruchom je lokalnie za pomocą pliku binarnego
>    CLI — nie montuj projektu w kontenerze `cli`.
>
> Jeśli nie potrzebujesz automatycznej aktualizacji z wnętrza kontenera, pozostaw profil
> `cli` wyłączony (`COMPOSE_PROFILES=core,redis` lub krócej). Pozostałe profile nie
> montują gniazda Dockera.
>
> Powiązany model zagrożeń dotyczący MITM opisano w pliku
> `docs/security/MITM-TPROXY-DECRYPT.md` (git; nie jest kompilowany do `/docs`),
> a łańcuch pochodzenia plików binarnych
> `codex`/`claude-code`/`droid`/`openclaw` — w pliku `docs/security/SUPPLY_CHAIN.md`.

## Sidecar Redis

OmniRoute korzysta z Redis jako zaplecza rozproszonego ogranicznika częstotliwości żądań i współdzielonej pamięci podręcznej. Usługa `redis` jest **zawsze zdefiniowana** w pliku `docker-compose.yml` (nie jest ograniczona żadnym profilem) i uruchamia się wraz z każdym innym profilem.

| Szczegół                   | Wartość                                   |
| -------------------------- | ----------------------------------------- |
| Obraz                      | `redis:7-alpine`                          |
| Nazwa kontenera            | `omniroute-redis`                         |
| Port wewnętrzny            | `6379`                                    |
| Port hosta (nadpisywalny)  | `REDIS_PORT` (domyślnie `6379`)           |
| Adres hosta (nadpisywalny) | `REDIS_BIND_HOST` (domyślnie `127.0.0.1`) |
| Wolumin                    | `omniroute-redis-data` → `/data`          |
| Kontrola stanu             | `redis-cli ping` (interwał 10 s)          |

Powiązane zmienne środowiskowe:

- `REDIS_URL` — ciąg połączenia przekazywany do aplikacji (domyślnie `redis://redis:6379`).
- `REDIS_PORT` — mapowanie portu kontenera Redis po stronie hosta.
- `REDIS_BIND_HOST` — interfejs hosta, na którym publikowany jest port. Domyślnie `127.0.0.1`.

> **Dlaczego domyślnie używany jest interfejs loopback:** sidecar działa bez `requirepass`, a kontenery
> aplikacji komunikują się z nim przez sieć compose (`redis:6379`) — opublikowany port służy
> wyłącznie narzędziom działającym po stronie hosta (`redis-cli`, lokalne `npm run dev`). Publikowanie na
> `0.0.0.0` udostępniłoby nieuwierzytelnioną usługę Redis każdemu hostowi w sieci LAN. Jeśli ustawisz
> `REDIS_BIND_HOST=0.0.0.0`, dodaj również `--requirepass` do pola `command:` usługi.

**Wyłączanie Redis** nie jest zalecane (ogranicznik częstotliwości żądań przełączy się na awaryjny tryb działający w pamięci). Jeśli jest to konieczne, usuń lub zakomentuj blok usługi `redis:` w pliku `docker-compose.yml` albo przeskaluj ją do zera:

```bash
docker compose up -d --scale redis=0
```

## Compose dla środowiska produkcyjnego

Aby uruchomić odizolowaną produkcyjną instancję równolegle ze środowiskiem deweloperskim, użyj pliku `docker-compose.prod.yml`.

| Szczegół             | Wartość                                                                           |
| -------------------- | --------------------------------------------------------------------------------- |
| Plik                 | `docker-compose.prod.yml`                                                         |
| Domyślny port panelu | `PROD_DASHBOARD_PORT=20130` (mapowany na wewnętrzny `${DASHBOARD_PORT:-20128}`)   |
| Domyślny port API    | `PROD_API_PORT=20131`                                                             |
| Obraz                | `omniroute:prod` (zbudowany z etapu docelowego `runner-cli`)                      |
| Kontener Redis       | `omniroute-redis-prod` (`redis:8.6.2`, dedykowany wolumin `redis-prod-data`)      |
| Wolumin danych       | `omniroute-prod-data` (nazwany, zachowywany między przebudowaniami)               |
| Kontrole stanu       | `node healthcheck.mjs` + `redis-cli ping`, z `depends_on` zależnym od stanu Redis |

Sposób użycia:

```bash
# Zbuduj i uruchom stos produkcyjny
docker compose -f docker-compose.prod.yml up -d --build

# Wyświetlaj logi na bieżąco
docker compose -f docker-compose.prod.yml logs -f

# Zatrzymaj i usuń stos (zachowaj woluminy)
docker compose -f docker-compose.prod.yml down
```

Stos produkcyjny działa równolegle ze stosem deweloperskim compose (używa innych nazw kontenerów, portów i woluminów), dzięki czemu możesz kontynuować lokalne prace, podczas gdy środowisko produkcyjne pozostaje uruchomione.

## Etapy pliku Docker

Repozytorium dostarcza wieloetapowy plik Dockerfile (`Dockerfile`). Eksponowane są cztery etapy; wybierz odpowiedni `target` dla swojego przypadku użycia.

| Scena         | Obraz bazowy          | Zamiar                                                                                                                                                                                                                                                                                                                                   |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instaluje deps (`npm ci --legacy-peer-deps`) i uruchamia `npm run build` ( domyślnie Turbopack — patrz Zasoby kompilacji poniżej)                                                                                                                                                                                                        |
| `runner-base` | `node:26-trixie-slim` | Środowisko produkcyjne z niezależnym wyjściem Next.js.** Brak dostawcy CLIs w pakiecie.**                                                                                                                                                                                                                                                |
| `runner-cli`  | `runner-base`         | Dodaje `git`, `docker.io`, `docker-compose` i globalne CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Wybierz tę opcję dla przepływów pracy agenta.**                                                                                                                                                        |
| `runner-web`  | `runner-base`         | Dodaje Playwright + przeglądarkę Chromium (`--with-deps`) dla dostawców sesji internetowych: `gemini-web`, `claude-web`, `claude-turnstile`.** Wybierz tę opcję, jeśli korzystasz z usług tych dostawców** — zwykły obraz kończy się niepowodzeniem w momencie żądania bez niego (patrz uwaga dotycząca `-web` w sekcji Kanały wydania). |

Zbuduj konkretny cel ręcznie:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Zasoby czasu kompilacji

Trzy argumenty kompilacji kontrolują koszty etapu `builder`. Są przeznaczone wyłącznie do czasu kompilacji. — `OMNIROUTE_MEMORY_MB` (poniżej) to oddzielne pokrętło służące do uruchamiania.

| Zbuduj argument             | Domyślny | Efekt                                                                                                       |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` buduje się z pakietem internetowym: niższa pamięć szczytowa, wolniejsza. `1` decyduje się na Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | Sufit sterty V8 (`--max-old-space-size`) dla spawnowanego `next build`.                                     |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | Pasze `CIRCLE_NODE_TOTAL`; Następnie wyprowadzamy `workers = N - 1` do zbierania danych stron.              |

`OMNIROUTE_BUILD_WORKERS` to ten, który podnosi się na dużego konstruktora i ten, który podejrzewa, gdy ograniczona kompilacja umrze** Po** `✓ Compiled successfully`. Każdy proces roboczy danych strony jest własnym procesem, podobnie jak sam nadrzędny `next build` ; reprodukcja VPS na żywo (problem #7518) zmierzyła szczyt RSS każdego procesu przy ~ 4,5 GB niezależnie od flagi sterty `NODE_OPTIONS` (Turbopack kompiluje się w pamięci native/Rust poza stertą V8). Wartość domyślna `2` (→ 1 proces roboczy, łącznie 2 procesy) jest dostosowana do 16 GB / 4 vCPU hostowanych elementów uruchamiających GitHub, z których korzysta potok publikowania. W `8` (→ 7 pracowników) temu biegaczowi zabrakło pamięci i zestawowi kompilacji nie udało się wykonać kroku z `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 pracowników) nadal nie pasowało, gdy RSS na proces mierzono bezpośrednio, a nie wywnioskowano. `tests/unit/docker-build-memory-budget.test.ts` wykonuje arytmetykę na podstawie zmierzonej wartości i kończy się niepowodzeniem, jeśli któreś z pokręteł przekracza prowadnicę.

Turbopack kompiluje się w natywnej pamięci Rusta, która żyje** poza** stertę V8, więc `OMNIROUTE_BUILD_MEMORY_MB` jej nie ogranicza. Na hoście z limitem pamięci kompilacja jest następnie SIGKILLed przez zabójcę OOM bez żadnego tekstu błędu. — po prostu zatrzymuje się w połowie `Creating an optimized production build`, co brzmi raczej jak zawieszenie, a nie brak pamięci. Dlatego właśnie `Dockerfile` domyślnie wybiera webpack (`OMNIROUTE_USE_TURBOPACK=0`), w przeciwieństwie do `npm run dev` / `npm run build`, gdzie Turbopack jest domyślnym kodem: gołe `docker build .` bez argumentów kompilacji (które uruchamiają Railway i inne hosty uruchamiane jednym kliknięciem) nie może po cichu umierać w kreatorze z ograniczoną pamięcią. Opublikowane obrazy już jawnie przekazują `OMNIROUTE_USE_TURBOPACK=0` w `docker-publish.yml`. W kreatorze z dużą ilością RAM wybierz Turbopack, aby przyspieszyć kompilację:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` jest włączone, więc `next build` uruchamia rodzica** I** proces roboczy i każdy z nich honoruje `OMNIROUTE_BUILD_MEMORY_MB` osobno. Zwymiaruj sufit kontenera powyżej mniej więcej dwukrotnie większej wartości, a nie raz.

Zmierzone na tym drzewie (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Pakieter           | Sufit kontenerowy | Wynik                                            |
| ------------------ | ----------------- | ------------------------------------------------ |
| Turbopack          | 8 GiB / 16 GiB    | OOM-zabity w obu przypadkach, po cichu           |
| pakiet internetowy | 8 GiB             | pracownik budowlany SIGKILLed                    |
| pakiet internetowy | 12 GiB            | udało się, osiągnęło szczyt na poziomie 11,1 GiB |

### Domyślne ustawienia środowiska wykonawczego

Wartości domyślne eksportowane przez `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Zachowanie pamięci w Docker:

- Obraz ustawia `OMNIROUTE_MEMORY_MB=1024` i wyprowadza z niego `NODE_OPTIONS=--max-old-space-size=1024`.
- Właściwy proces serwera jest uruchamiany przez samodzielny program uruchamiający, który odczytuje `OMNIROUTE_MEMORY_MB` i dołącza `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Węzeł wykorzystuje ostatnią powtórzoną wartość `--max-old-space-size`, więc ustawienie `OMNIROUTE_MEMORY_MB` kontroluje efektywny limit sterty Docker.
- Ponieważ obraz zawsze to ustawia, kalibracja RAM programu uruchamiającego nigdy nie ma zastosowania w przypadku Docker. Podnieś go jawnie dla obciążenia (tabela poniżej). `2048` jest wciąż za mały dla agenta kodującego `/v1/responses`.

### Runtime RAM dla agentów kodujących

Wartość domyślna 1 GiB Docker to podłoga dashboard/light-chat, a nie wielkość produkcyjna. Długie treści `POST /v1/responses` (setki wiadomości, dziesiątki narzędzi) zachowują podczas kompresji wiele wykresów w pamięci. Dwa nakładające się żądania ~ 3 MiB / ~ 750 tys. tokenów przerwały V8 w pewnym momencie** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`), a także uderzył 16 GiB cgroup OOM. Zobacz [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Rozmiar** cgroup `--memory` nad stertą** Bufory natywne —, SQLite i pośrednie kompresje znajdują się poza V8.

| Obciążenie pracą                         | `OMNIROUTE_MEMORY_MB`   | Kontener/grupa c          | Notatki                                                                                             |
| ---------------------------------------- | ----------------------- | ------------------------- | --------------------------------------------------------------------------------------------------- |
| Pulpit nawigacyjny, jeden lekki czat     | `1024` (domyślny obraz) | ≥2 GiB                    |                                                                                                     |
| Jeden agent kodujący (Claude/Codex/Grok) | `8192`                  | ≥10 GiB                   | Typowa jednosesyjna `/v1/responses`                                                                 |
| Dwa jednoczesne długie `/v1/responses`   | `10240`–`12288`         | ≥12–16 GiB                | Zmierzono przerwanie pracy V8 na ~ 12 GiB                                                           |
| Trzy równoczesne długie konteksty +      | nie w jednym procesie   | serializować / więcej RAM | Domyślny wstęp do wagi ciężkiej to 1 w locie; podniesienie go bez RAM ponownie wprowadza przerwanie |

`omniroute serve` na gołym metalu kalibruje ~ 35% RAM (zaciśnięty `[512, 4096]`), gdy `OMNIROUTE_MEMORY_MB` jest** nieoprawny** . Docker zawsze ustawia `1024`, więc kalibracja nigdy nie przebiega na oficjalnym obrazie.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Krytyczne zmienne środowiskowe

Oprócz wartości domyślnych udokumentowanych w pliku [ENVIRONMENT.md](../reference/ENVIRONMENT.md), podczas uruchamiania w środowisku Docker najważniejsze są następujące zmienne:

| Zmienna                       | Przeznaczenie                                                                                                                                                                                                                                                               | Wartość domyślna               |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Współdzielony sekret mostu WebSocket. **Wymagany w środowisku produkcyjnym** — ustaw silny losowy ciąg znaków.                                                                                                                                                              | nieustawiona (należy ją podać) |
| `REDIS_URL`                   | Ciąg połączenia z backendem ogranicznika częstotliwości żądań / pamięci podręcznej                                                                                                                                                                                          | `redis://redis:6379`           |
| `REDIS_PORT`                  | Port hosta dla dołączonego kontenera Redis                                                                                                                                                                                                                                  | `6379`                         |
| `REDIS_BIND_HOST`             | Interfejs hosta, na którym publikowany jest port dołączonego kontenera Redis (interfejs pętli zwrotnej, chyba że dodasz AUTH)                                                                                                                                               | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Ścieżka hosta montowana w profilu `cli` jako `/workspace/omniroute` na potrzeby procedur samodzielnej aktualizacji                                                                                                                                                          | `.` (bieżący katalog)          |
| `OMNIROUTE_MEMORY_MB`         | Limit sterty środowiska Node dla autonomicznego serwera Docker; zastępuje powyższą wartość domyślną obrazu. Agenty programistyczne: `8192`+ (zobacz [pamięć RAM środowiska uruchomieniowego](#runtime-ram-for-coding-agents)).                                              | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | Zastępuje udostępnione porty panelu (20128) i API (20129)                                                                                                                                                                                                                   | `20128` / `20129`              |
| `APP_BIND_HOST`               | Interfejs hosta, na którym docker-compose publikuje porty panelu, API i live-WS. Gdy `REQUIRE_API_KEY=false` (wartość domyślna), `0.0.0.0` udostępnia anonimowy serwer proxy `/v1` w sieci LAN — zakres rozszerzaj tylko przy `REQUIRE_API_KEY=true` lub z odwrotnym proxy. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | Interfejs hosta, na którym docker-compose publikuje kontener pomocniczy `cliproxyapi` — jego wolumin danych przechowuje dane uwierzytelniające dostawców.                                                                                                                   | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | Katalog odczytywany przez skaner wtyczek środowiska uruchomieniowego i używany do ich instalacji. Ustaw go, gdy wtyczki są montowane przez powiązanie: wartość domyślna zależy od `HOME`, którego obraz nie musi eksportować.                                               | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | Podścieżka URL, gdy aplikacja jest publikowana za odwrotnym proxy (np. `/omniroute`)                                                                                                                                                                                        | _(pusta = katalog główny)_     |
| `NEXT_PUBLIC_BASE_URL`        | Publiczne źródło przeglądarki uwzględniające podścieżkę (np. `https://host/omniroute`)                                                                                                                                                                                      | nieustawiona                   |
| `PROD_DASHBOARD_PORT`         | Port hosta dla panelu w pliku `docker-compose.prod.yml`                                                                                                                                                                                                                     | `20130`                        |
| `CLIPROXYAPI_PORT`            | Port hosta dla kontenera pomocniczego `cliproxyapi`                                                                                                                                                                                                                         | `8317`                         |

## Odwrotne proxy na ścieżce podrzędnej (Traefik / nginx)

Next.js `basePath` jest kompilowany w samodzielny pakiet. OmniRoute zapisuje wypaloną wartość w pliku wartowniczym w katalogu głównym aplikacji (zapisywanym podczas `npm run build`; czytany przez `scripts/docker/ensure-docker-base-path.mjs`) i porównuje ją z `OMNIROUTE_BASE_PATH` podczas uruchamiania kontenera. Kiedy się różnią i obraz został zbudowany dla katalogu głównego domeny, punkt wejścia przepisuje samodzielne manifesty, osadzone literały `basePath`/`assetPrefix` (następne 16 renderuje zasób SSR URLs z samego `assetPrefix` — patcher odzwierciedla w nim podścieżkę), wypalony zasób `/_next/static` URLs (manifesty referencyjne klienta, importy multimediów, wstępnie renderowane strony błędów) i podkładka `process.env` klienta przed `node dev/run-standalone.mjs` biegnie.

### Kompilacja tworzenia kompozycji (zalecana)

Ustaw obie zmienne w `.env`, a następnie przebuduj, aby obraz i środowisko wykonawcze były zgodne:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` przekazuje `OMNIROUTE_BASE_PATH` jako argument kompilacji Docker i jako zmienną środowiskową środowiska wykonawczego.

### Wstępnie zbudowana podścieżka środowiska wykonawczego + obrazu głównego

Opublikowane obrazy `cheaperinference/omniroute:*` są tworzone dla katalogu głównego domeny. Nadal możesz ustawić `OMNIROUTE_BASE_PATH` w czasie wykonywania; kontener łata pakiet raz podczas uruchamiania. Połącz go z pasującym źródłem publicznym:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Skonfiguruj odwrotne proxy, aby przesyłać dalej** pełny** ścieżka zewnętrzna (nie usuwaj przedrostka). Traefik powinien skierować `PathPrefix(`/omniroute `)` do kontenera bez `StripPrefix`, więc Next.js otrzyma `/omniroute/...` i udostępni zasoby z `/omniroute/_next/...`.

Kontrola kondycji Docker sprawdza lekki punkt końcowy cyklu życia `/healthz` poprzedzony aktywnym `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` pozostaje dostępny do diagnostyki human/dashboard ; aby skierować na niego kontener HEALTHCHECK (na przykład w celu głębokiego egzekwowania stanu zdrowia), ustaw `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Ta ścieżka to A** głęboko** sprawdź (podsumowanie monitorowania DB + ) — odpowiednie dla rzadkiego `HEALTHCHECK` Docker, jeśli zdecydujesz się ponownie, ale** nie** dla interwałów Kubernetes `livenessProbe`.

Dla orkiestratorów (Kubernetes, Nomad itp.):

| Sonda                     | Woleć                                                                   | Unikać                                                               |
| ------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Żywotność                 | HTTP `GET /livez` lub TCP na głównym porcie (`PORT`, domyślnie `20128`) | `/api/monitoring/health` jako żywotność                              |
| Gotowość                  | HTTP `GET /healthz`                                                     | Małe limity czasu, które traktują zajętość pętli zdarzeń jako martwą |
| Głęboka / czarna skrzynka | `/api/monitoring/health`                                                | —                                                                    |

`/healthz` raportuje cykl życia procesu (`ok` / `starting` / `stopping`). `/livez` jest aktywny tylko w procesie (200, ilekroć program obsługi może działać; nie czeka na gotowość). Obydwa w dalszym ciągu działają w tej samej pętli zdarzeń węzła co obsługa żądań, więc katalogowanie powiązane z procesorem lub kompresja mogą je opóźnić. — busy ≠ dead. Preferuj żywotność TCP jeśli przekroczono limit czasu sond HTTP. Pełne wskazówki dotyczące sondy: [Przewodnik dotyczący monitorowania — Zalecenia dotyczące sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Komponuj za pomocą Caddy (HTTPS Auto-TLS)

OmniRoute można bezpiecznie ujawnić za pomocą automatycznego udostępniania SSL Caddy. Upewnij się, że rekord DNS A Twojej domeny wskazuje na IP Twojego serwera.

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

Caddy ustawia standardowe nagłówki przesyłania dla kontenera nadrzędnego. OmniRoute używa `NEXT_PUBLIC_BASE_URL` jako kanonicznego źródła publicznego dla wywołań zwrotnych OAuth i generowanych łączy publicznych; uwierzytelnione zapisy na pulpicie nawigacyjnym wykorzystują żądania tego samego źródła oraz ochronę CSRF związaną z sesją. Włącz `OMNIROUTE_TRUST_PROXY` tylko w przypadku zaawansowanych wdrożeń, w których celowo chcesz, aby OmniRoute pobierał publiczne pochodzenie z zaufanych przekazywanych nagłówków zamiast jawnej konfiguracji.

## Szybki tunel Cloudflare

Obsługa panelu dla wdrożeń Docker obejmuje uruchamiany jednym kliknięciem **szybki tunel Cloudflare** na stronie `Dashboard → Endpoints`. Pierwsze włączenie pobiera `cloudflared` tylko wtedy, gdy jest potrzebny, uruchamia tymczasowy tunel do bieżącego punktu końcowego `/v1` i wyświetla wygenerowany adres URL `https://*.trycloudflare.com/v1` bezpośrednio pod standardowym publicznym adresem URL.

Panele tuneli punktów końcowych (Cloudflare, Tailscale, ngrok) można pokazywać lub ukrywać w `Settings → Appearance` bez zmiany stanu aktywnego tunelu.

### Uwagi dotyczące tuneli

- Adresy URL szybkich tuneli są tymczasowe i zmieniają się po każdym ponownym uruchomieniu.
- Szybkie tunele nie są automatycznie przywracane po ponownym uruchomieniu OmniRoute lub kontenera. W razie potrzeby włącz je ponownie z poziomu panelu.
- Instalacja zarządzana obsługuje obecnie systemy Linux, macOS i Windows na architekturach `x64` / `arm64`.
- Zarządzane szybkie tunele domyślnie używają transportu HTTP/2, aby uniknąć uciążliwych ostrzeżeń dotyczących bufora UDP protokołu QUIC w środowiskach kontenerowych z ograniczonymi zasobami. Ustaw `CLOUDFLARED_PROTOCOL=quic` lub `auto`, jeśli chcesz użyć innego transportu.
- Obrazy Docker zawierają systemowe główne certyfikaty CA i przekazują je do zarządzanego procesu `cloudflared`, co pozwala uniknąć błędów zaufania TLS podczas uruchamiania tunelu wewnątrz kontenera.
- Ustaw `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, jeśli chcesz, aby OmniRoute używał istniejącego pliku wykonywalnego zamiast pobierać nowy.

## Tagi obrazów

| Obraz                        | Etykietka | Rozmiar | Opis                                                        |
| ---------------------------- | --------- | ------- | ----------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest`  | ~ 250MB | Najwyższy** opublikowany** stabilny SemVer (nie git `main`) |
| `cheaperinference/omniroute` | `3.8.54`  | ~ 250MB | Przypnij tę klasę tagu dla GitOps                           |

Te same obrazy są publikowane w trzech repozytoriach z tymi samymi skrótami dla poszczególnych architektur: `cheaperinference/omniroute` (Docker Hub, organizacja Cheaper Inference, od wersji 3.8.53), `ghcr.io/cheaper-inference/omniroute` i starsze `diegosouzapw/omniroute`, które przechowuje historię ściągania i nadal otrzymuje każdą wersję. Istniejące wdrożenia `diegosouzapw/omniroute` są stale aktualizowane; zmiana nazwy obrazu jest opcjonalna. Poniższy kanał przedpremierowy `:next` / `:next-web` jest opublikowany tylko dla `diegosouzapw/omniroute` i GHCR.

Manifest wieloplatformowy: natywny `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automatycznie wybiera pasującą architekturę; przekaż `--platform linux/amd64` jeśli chcesz wymusić emulację AMD64 na hostach ARM.

### Zwolnij kanały

OmniRoute publikuje osobne kanały Docker dla wydań stabilnych, testowania aktywnych gałęzi wydań i kompilacji programistycznych.

| Kanał                           | Źródło                                     | Zmienność                        | Zalecane użycie                                                                                                                                               |
| ------------------------------- | ------------------------------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | wydanie Signed/versioned                   | Niezmienny                       | Wdrożenia produkcyjne, które przypinają dokładną wersję                                                                                                       |
| `:latest` / `:latest-web`       | Najwyższy** opublikowany** stabilny SemVer | Zmienny stabilny wskaźnik        | Podąża za stabilnymi wydaniami** Po** zadanie publikowania SemVer wykonuje —** nie** śledź zatwierdzenia `main` lub niepublikowane zatwierdzenia `release/v*` |
| `:next` / `:next-web`           | Bieżąca domyślna gałąź `release/v*`        | Zmienny wskaźnik wersji wstępnej | Testowanie poprawek, które wylądowały w gałęzi aktywnego wydania, ale nie są jeszcze w wydaniu stabilnym                                                      |
| `:main` / `:main-web`           | oddział `main`                             | Zmienny wskaźnik rozwoju         | Tylko testy rozwojowe i integracyjne                                                                                                                          |

#### Dostawcy sesji internetowych: obrazy `-web`

Każdy kanał powyżej pełni także funkcję tagu `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), zbudowanego ze etapu `runner-web` — tego samego obrazu plus Playwright i przeglądarka Chromium. Zwykły obraz jest dostarczany** bez** Chrom; `gemini-web`, `claude-web` i `claude-turnstile` tego potrzebują.

Awaria jest odroczona, a nie czas uruchomienia: dostawcy ci wyświetlają swoje modele i wyświetlają się na pulpicie nawigacyjnym jako połączone, a tylko pierwsze żądanie kończy się niepowodzeniem

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jeśli korzystasz z usług tych dostawców, ściągnij tag `-web` kanału, na którym już jesteś — nic innego się nie zmieni. W przypadku instalacji npm/CLI (bez obrazu Docker ) równoważnym brakującym elementem jest plik binarny przeglądarki: uruchom `npx playwright install chromium` na hoście.

#### Korzystanie z kanału przedpremierowego

Kanał `next` jest przebudowywany przy każdym wypchnięciu do bieżącej domyślnej gałęzi `release/v*` i publikowany zarówno dla AMD64 jak i ARM64. Starsze gałęzie konserwacji nie mogą go zastąpić. Kanał udostępnia obraz do ściągnięcia dla poprawek, które zostały scalone z gałęzią aktywnego wydania przed wycięciem kolejnego stabilnego znacznika.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

W przypadku Docker Compose zastąp znacznik obrazu używany przez wybrany profil, a następnie pobierz i utwórz ponownie usługę:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Bezpieczeństwo i wycofanie

`next` to pływający kanał przedpremierowy. Może się zmienić po każdym wypchnięciu do gałęzi aktywnego wydania i tak jest** nie jest obsługiwany do użytku produkcyjnego** . Przypnij podsumowanie obrazu podczas oceniania konkretnej kompilacji:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Przed testowaniem wykonaj kopię zapasową woluminu danych OmniRoute lub katalogu danych zamontowanego przez bind. Aby cofnąć, przywróć poprzednio używaną wersję stabilną lub przeanalizuj i utwórz ponownie kontener:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Kompilacja z gałęzi wydania nigdy nie może przenieść `latest`; tylko kwalifikująca się stabilna wersja semantyczna może promować stabilny wskaźnik. Obrazy `next` zachowują kontrolę obrazu wydania i blokowanie bramki krytycznej.

**`latest` nie jest gwarancją walutową dla gita.** Połączone poprawki w `main` lub aktywnej gałęzi `release/v*` to** nie** w `:latest` do czasu opublikowania stabilnego obrazu SemVer i zadanie publikowania promuje `:latest` (to samo podsumowanie co SemVer). Jeśli `latest` wygląda na zamrożone, podczas gdy GitHub już pokazuje poprawkę, pociągnij `:next`, aby przetestować gałąź wydania lub poczekaj na znacznik SemVer.

| Chcesz                                                             | Używać                               |
| ------------------------------------------------------------------ | ------------------------------------ |
| GitOps / produkcja, która nie może dryfować                        | Przypnij `:X.Y.Z` (lub skrót obrazu) |
| Śledź opublikowane stajnie i akceptuj odtworzenie w każdym wydaniu | `:latest`                            |
| Przetestuj niewydane zatwierdzenia `release/v*`                    | `:next` (nie produkcja)              |
| Przetestuj `main`                                                  | `:main` (nie produkcja)              |

## Aktualizacje panelu w Dockerze

Kontener uruchomiony z opublikowanego obrazu nie może zastąpić samego siebie. Gdy OmniRoute wykryje, że działa wewnątrz
kontenera (brak kopii roboczej `.git`, nie jest to instalacja npm), baner aktualizacji w głównym panelu pokazuje
polecenie do uruchomienia na hoście zamiast instrukcji npm/git, wraz z przyciskiem kopiowania:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Nazwa usługi pochodzi ze zmiennej `AUTO_UPDATE_SERVICE` (domyślnie `omniroute`, czyli usługa zdefiniowana w
`docker-compose.selfhost.yml`). Polecenie `pull` aktualizuje tylko ruchomy tag (`latest`, `next`); w przypadku przypiętego
tagu `:X.Y.Z` najpierw zmień tag.

### Aktualizacje jednym kliknięciem z plikiem wyzwalającym na hoście

Aby funkcja **Aktualizuj teraz** działała bez montowania `/var/run/docker.sock` (co daje kontenerowi
uprawnienia roota na hoście — zobacz powyższe ostrzeżenie dotyczące profilu `cli`), ustaw `DOCKER_UPDATE_TRIGGER_FILE` dla
usługi OmniRoute i uruchom proces monitorujący na hoście:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Ścieżka musi znajdować się wewnątrz `DATA_DIR` (wartości względne są rozwiązywane względem niego); każda inna lokalizacja jest
odrzucana. Funkcja **Aktualizuj teraz** zapisuje następnie `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` do tego
pliku, zwraca odpowiedź `202`, a panel cyklicznie odpytuje `/api/system/version`, dopóki nowa wersja nie zostanie uruchomiona,
po czym przeładowuje stronę. W tym trybie OmniRoute nigdy nie uruchamia powłoki ani polecenia Dockera. Tak jak w przypadku każdej operacji
aktualizacji, żądanie jest akceptowane wyłącznie od klientów z interfejsu loopback lub sieci LAN.

Katalog danych zamontowany za pomocą bind mount zapewnia hostowi stabilną ścieżkę do monitorowania. Przykładowe jednostki `systemd`
(dostosuj `/srv/omniroute` do katalogu zawierającego plik Compose oraz katalog `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Monitorowanie żądań aktualizacji OmniRoute z panelu

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Pobranie i ponowne utworzenie kontenera OmniRoute

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

Usługa usuwa żądanie przed pobraniem obrazu, aby nieudane uruchomienie nie powodowało pętli. Bez
`DOCKER_UPDATE_TRIGGER_FILE` panel zachowuje ręczny proces wykonywania polecenia.

## Dostępność: domyślnie SQLite to pojedyncza replika

Stock Docker / Kubernetes OmniRoute jest** jeden proces węzłowy + jeden zapisujący SQLite** . Wysoka dostępność jest** nieobsługiwane** na tej topologii.

| Ograniczenie                                  | Konsekwencja                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pojedynczy pisarz                             | Do** nie** uruchom wiele replik w tym samym pliku SQLite. To psuje DB.                                                                                                                                                                                                                                        |
| Odtwórz / uruchom ponownie / HEALTHCHECK kill | **Pełna awaria** SSE w locie, sesje na desce rozdzielczej i stan w pamięci. Każdy podłączony klient odpada. Nowe żądania w oknie pustego punktu końcowego otrzymują odwrotne proxy**`502 Bad Gateway: Unknown error`** , not OmniRoute JSON Klienci — nie potrafią odróżnić tego od awarii dostawcy (#11015). |
| Ta sama pętla zdarzeń co `/healthz`           | Zajęty katalog lub znacznik kompresji może opóźnić sondy; krótki limit czasu, a następnie uruchamia ponownie** tylko** replika.                                                                                                                                                                               |

**Matryca sondy** (zobacz także [zalecenia dotyczące sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sonda            | Cel                                                           | Nie używać                                                           |
| ---------------- | ------------------------------------------------------------- | -------------------------------------------------------------------- |
| Żywotność        | TCP na `PORT` (domyślnie `20128`) lub miękkie HTTP `/healthz` | `/api/monitoring/health`                                             |
| Gotowość         | HTTP `GET /healthz`                                           | Małe limity czasu, które traktują zajętość pętli zdarzeń jako martwą |
| Głęboko / ludzie | `/api/monitoring/health`                                      | Zautomatyzowana żywotność Kubelet                                    |

**Ulepszenia:** spodziewać się spadku każdej sesji. Jeśli możesz, pozbądź się klientów; nie ma ciągłej aktualizacji domyślnego SQLite. Komponuj `restart: unless-stopped` plus Docker `HEALTHCHECK` zastąpi także jedyny proces, gdy kontener jest niezdrowy — tym samym promieniu wybuchu.

Gotowe manifesty i wykres Helm działają w `deploy/kubernetes/` i `deploy/helm/omniroute/` — zobacz [przewodnik wdrażania Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Fragment Kubernetesa dla a** pojedyncza replika** (Wymagane jest ponowne utworzenie; nie podnoś `replicas` w stosunku do jednego pliku SQLite ):

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

`preStop` Sleep pozwala Kube upuszczać punkty końcowe usługi przed SIGTERM więc** nowy** ruch przestaje uderzać w proces umierania. W locie `/v1/responses` SSE jest zużywane do `SHUTDOWN_TIMEOUT_MS` (domyślnie 30 s) poprzez umowy najmu wstępu dla wagi ciężkiej (#11015). Nowe żądania, które nadal docierają do procesu, otrzymują `503` + `Retry-After: 5`. Opcja Odtwórz lukę pustego punktu końcowego do czasu, aż wymiana będzie gotowa, pozostaje poważną awarią — czyli topologią SQLite, a nie błędną konfiguracją sondy.

Zewnętrzny Postgres / multi-writer HA to** nie** udokumentowana ścieżka zapasów. Jeśli potrzebujesz HA, zachowaj pojedynczą replikę lub uruchom topologię, którą projekt przetestował i udokumentował osobno. Praca Postgres/MySQL mieszka w [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Do tego czasu jest to jedyny obsługiwany sposób rozmnażania** duży** pojemność `/v1/responses` to N niezależnych procesów (następna sekcja), a nie `replicas > 1` na jednym woluminie.

## Skalowanie w poziomie: N niezależnych procesów

### Własność rotacyjna tokena Codex

Kopie jednego konta Codex nie mogą niezależnie zużywać jego jednorazowego tokena odświeżającego. W instancjach, które korzystają tylko z zsynchronizowanych poświadczeń, ustaw `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Pozostaw tę opcję nieskonfigurowaną dla pojedynczego właściciela rotacji. Każdy proces nadal potrzebuje własnego `DATA_DIR`; ta opcja nie udostępnia SQLite, nie zapewnia synchronizacji tokenów ani rozproszonej blokady.

Instancja pasywna ponownie odczytuje połączenie, gdy potrzebne jest odświeżenie i przyjmuje tylko inny, niewygasły token dostępu. W przeciwnym razie odświeżanie jest wyłączone bez wygaśnięcia lub dezaktywacji połączenia lub zliczenia awarii przerywacza odświeżania. Prawdziwe błędy uwierzytelniania nadrzędnego w dalszym ciągu korzystają z normalnego rozliczania błędów, wykładniczego czasu oczekiwania i normalnego błędu klienta; dezaktywacja konta pozostaje trwała. Zsynchronizuj obrócone tokeny właściciela przed wygaśnięciem tokenów dostępu (domyślny czas proaktywnego odświeżania wynosi pięć minut) lub ponownie zaimportuj plik uwierzytelniający Codex. Importy pasywne przechowują dostarczone tokeny bez sprawdzania ich poprawności w punkcie końcowym tokenu. Ręczne odświeżanie dashboard/API zwraca `409 refresh_disabled`; nowe loginy OAuth pozostają niezmienione. Zobacz [informacje o środowisku](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Proces jednego węzła to** jedna sterta V8** . Dwa nakładające się ~ 3 MiB / ~ 750k-token-agent kodujący `POST /v1/responses` (RTK + Caveman) przerywają tę stertę w ~ 12 Gi (`FATAL ERROR: Reached heap limit`) i mogą OOM a 16 Gi cgroup. Zobacz [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ten pomiar to a** budżet pamięci** ostrzeżenie, a nie produkt typu hard-max dwóch równoczesnych długich `/v1/responses`. Wstęp na czat o dużej wadze jest bramkowany przez automatycznie wyprowadzany budżet bajtów wejściowych (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) o rozmiarze odpowiadającym temu samemu pułapowi V8/cgroup — zastępując go w górę (lub ustawiając dotychczasowy limit liczby żądań `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ) w procesie o już ustalonym rozmiarze ponownie wprowadza przerwanie. Małe czaty, `/healthz`, `/v1/models` i MCP są** nie** w tej czapce.

### Jeden proces: więcej niż dwa długie `/v1/responses`

A** zdrowy** proces (sterta poniżej `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, domyślnie `0.75`)** móc** uruchom więcej niż dwa równoczesne długie `POST /v1/responses` gdy budżet bajtów obejmujący cały proces (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) nadal jest wolny. Obiekty na poziomie `OMNIROUTE_CHAT_LARGE_BODY_BYTES` lub wyższym (domyślnie 256 KiB) przyjmują tę samą dzierżawę o dużej wadze, co żądania o dużej strukturze i używają tego samego [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ucieczki `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dziesiątki jednoczesnych długich klientów SSE (operatorzy często potrzebują 40–50) to a** budżet pamięci** pytanie — rozmiar sterty + primary/headroom sloty + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nie jest to sztywny limit produktów „max 2”. Sterta pod ciśnieniem nadal się rozładowuje z możliwością ponownej próby `503`, więc #7849 nie powraca.

Do** pomnożyć stosy** (niezależne stare przestrzenie V8)** Dzisiaj** :

| Do                                                                                                                                                   | Nie                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Uruchomić** N containers/pods** , każdy ze swoim** własny** `DATA_DIR` / objętość                                                                    | Ustaw `replicas > 1` na jeden plik SQLite                                                    |
| Rozmiar duży w locie + zdrowy zapas z budżetu sterty/bajtów w locie; 1–2 to konserwatywna wartość domyślna nr #7849, a nie twardy produkt maksymalny | Daj jednemu procesowi 8 × RAM i nieograniczony limit liczby                                  |
| Opcjonalnie: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` dla** wspólne liczniki przydziałów**                                               | Traktuj Redis jako współdzielone SQLite — tak nie jest                                       |
| Zduplikuj klucze tajne dostawcy w każdej instancji (lub zaakceptuj podzielone na partycje pulpity nawigacyjne)                                       | Spodziewaj się jednego pulpitu nawigacyjnego / jednego dziennika połączeń między instancjami |
| Przód z dowolnym modułem równoważenia obciążenia; wystarczy przykleić się do klucza API lub sesji                                                    | Wymagaj oprogramowania pośredniego uwzględniającego rozmiar specyficznego dla dostawcy       |

Powinowactwo sesji do konta może być również współużytkowane przez Redis: ustaw `OMNIROUTE_SESSION_AFFINITY_STORE=redis` i `REDIS_URL` w każdym procesie, z tym samym `REDIS_KEY_PREFIX` i dodatnim ustawieniem `sessionAffinityTtlMs`. Piny rozwiązują zahaszowane tożsamości kont użytkowania dla kwalifikującego się połączenia lokalnego każdego procesu, więc konta OAuth z pasującymi metadanymi tożsamości nie muszą mieć pasującego połączenia IDs. Znane tożsamości kont mają pierwszeństwo przed sprzecznymi lokalnymi IDs w rozpoznawaniu pinów i strzeżonej eksmisji; rekordy bez tożsamości (lub osoby dzwoniące do eksmisji bez tożsamości) zachowują starszą funkcję ID Guard. Konta bez stabilnej tożsamości użytkowania nadal wymagają dopasowania IDs. Błędy Redis lub wywołania przekraczające 100 ms wracają do lokalnego SQLite. Każdy magazyn powinowactwa Redis ogranicza zaległe operacje do 8, omija Redis natychmiast po zapełnieniu i zwalnia sloty tylko wtedy, gdy podstawowa praca zostanie ustalona, a nie w ostatecznym terminie dzwoniącego. Podczas awarii Redis nie ma wspólnej prawdy: każda instancja powraca do swojego lokalnego powinowactwa, sesje mogą być ponownie przypinane raz na instancję, a instancje mogą się różnić. Lepkość ponownie zbiega się poprzez Redis gdy się regeneruje. Limit czasu ogranicza oczekiwanie, a nie wysłane EVAL, które może wylądować po powrocie. Zapisy routingu porównują dokładną wartość zaobserwowaną w decyzji o routingu, a nie nowy odczyt czasu mutacji; zaobserwowane chybienie lub obserwacja rezerwowa SQLite jest porównywana jako brak klucza Redis. Przestarzałe piny są zastępowane w jednym CAS, więc późne polecenie nie może zastąpić ani usunąć nowszego, innego pinu. Redis odczytuje niepodzielnie zwracaną wartość i pozostały serwer TTL; dodatnie PTTL (lub brak wygaśnięcia) określa żywotność, a nie znacznik czasu JSON autora lub zegar czytelnika. Lokalne migawki odwzorowują pozostałe TTL na lokalny termin ostateczny; istniejące klucze JSON pozostają czytelne, a ich nieprzetworzone bajty są zachowywane dla CAS. Redis jest jedynym źródłem prawdy, gdy odpowiada. Potwierdzone udostępnione wstawki, dotknięcia i usunięcia usuwają wpis lokalny, nigdy go nie instaluj ani nie odświeżaj. SQLite na ścieżce Redis przechowuje tylko własne decyzje awaryjne tej instancji dotyczące błędów Redis, przekroczeń limitu czasu lub nasycenia przyjęć, jak poprzednio ograniczone TTL. Brakujący lokalny kod PIN w przypadku późniejszej awarii kosztuje jedno nowe wybranie (jedno pominięcie pamięci podręcznej), a nie błędne lub eksmitowane konto. Odrzucone wpisy zwracają wspólnego zwycięzcę i pozostałe TTL atomowo: zwykła selekcja ponownie sprawdza zmapowany lokalny termin i wykorzystuje wciąż aktualnego kwalifikującego się zwycięzcę, dotykając użycia i logowania dla tego konta bez kolejnego udostępnionego zapisu. Jeśli jest niedostępny, wybór utrzymuje lokalnego kandydata, pozostawia współdzielony kod PIN bez zmian i emituje jeden komunikat debugowania. Odrzucony CAS nie zapisuje SQLite; Błędy Redis, przekroczenia limitu czasu lub nasycenie przyjęć powodują zamiast tego zastosowanie istniejącej operacji lokalnej. Jeśli odpowiedź wysłanej mutacji nadejdzie po przekroczeniu limitu czasu (zaakceptowana, odrzucona lub wystąpiła błąd), synchroniczne dokładne porównanie i usunięcie wartości serializowanej usuwa tylko wiersz rezerwowy limitu czasu o identycznym bajcie. Pomiędzy tym porównaniem a usunięciem nie ma okresu oczekiwania; nowszy zapis awarii zostaje zachowany. Strzeżona eksmisja usuwa lokalny kod PIN uszkodzonego konta nawet przy wyłączonym Redis i czyści go ponownie po potwierdzeniu wspólnego eksmisji. Oczekujące wcześniejsze udostępnione odpowiedzi nie mogą przywrócić eksmitowanego lokalnego kodu PIN, ponieważ wspólne sukcesy nigdy nie powodują zapisu SQLite. W przypadku późniejszej awarii możliwe jest ponowne zablokowanie konta; później zaakceptowany zapis współdzielony istnieje tylko w Redis. Redis tęskni, nie sprawdzaj lokalnego stanu awaryjnego. Po wyłączeniu sterownika nowo wybrane piny zachowują tradycyjny czteropolowy kształt SQLite JSON ; tylko routing Redis dodaje zaszyfrowaną tożsamość konta. Wstępnie pobrane szpilki są ponownie sprawdzane na granicy ważności. Redis non-lease choice ponownie odczytuje sklep, ale synchroniczne planowanie najmu może nadal wykorzystywać pin eksmitowany pomiędzy pobieraniem wstępnym a planowaniem (akceptowane okno best-effort). Zatwierdzenie dzierżawy nie może przełączyć kont po trwałym roszczeniu: w przypadku odrzuconego żądania zatrzymuje żądanego kandydata tylko dla tego żądania i pozostawia wspólnego zwycięzcę nietkniętego, więc zgoda między instancjami jest ograniczona na tej ścieżce. Reszta tabeli nadal ma zastosowanie: nie dotyczy to lepkości sesji combo, natywnych pinów skrętu Codex, semaforów kont, blokad, limitów wydatków, konfiguracji ani dzienników połączeń.

Sprzęt: współbieżne długie `/v1/responses` na instancję to a** budżet pamięci** pytanie (sterta + inflight-byte / #10110). `N` niezależne `DATA_DIR` s wciąż mnożą sterty: host RAM musi pokrywać `N × cgroup`, a nie „jeden 16 Gi pod z N = 8”. Nigdy `replicas > 1` na jednym pliku SQLite.

Utwórz szkic (dwa stosy, dwa tomy — a nie `deploy.replicas: 2`):

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

Gęstość w procesie (kompresja izolatu HTTP ) wynosi [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jeden klaster logiczny we współdzielonym trwałym stanie to [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Błędy regionalne Gemini wewnątrz Dockera

Google AI Studio / Gemini API może zwrócić HTTP 400 z kodem FAILED_PRECONDITION i komunikatem
`User location is not supported for the API use.` Pomyślne żądanie na hoście
nie dowodzi, że kontener korzysta z tej samej trasy wychodzącej. Kolejność DNS,
łączność IPv4/IPv6, routing VPN i skonfigurowane serwery proxy mogą się różnić. Sprawdź
[regiony obsługiwane przez Google](https://ai.google.dev/gemini-api/docs/available-regions),
a także rzeczywistą trasę połączenia; sam ten błąd nie wskazuje na nieprawidłowy klucz API.

### Preferuj proxy przypisane do połączenia

Użyj [konfiguracji proxy dla poszczególnych połączeń](../ops/PROXY_GUIDE.md#4-level-proxy-system)
w OmniRoute dla połączenia Gemini, którego dotyczy problem, a następnie ponownie wykonaj
**Test Connection** oraz małe żądanie z użyciem tego samego modelu. Dzięki temu zmiana
routingu pozostaje ograniczona do tego połączenia. Sprawdź, czy proxy jest osiągalne
z kontenera oraz czy połączenie faktycznie je wybiera. Zmiana trasy nie gwarantuje
spełnienia regionalnych wymagań usługi nadrzędnej.

### Porównaj sieć hosta i kontenera

Podczas porównywania wyników uwierzytelnionych zachowaj ten sam klucz, model i żądanie;
nigdy nie wklejaj do zgłoszenia danych uwierzytelniających, haseł proxy ani kompletnych
nagłówków autoryzacji. Najpierw sprawdź, jakie rodziny adresów udostępnia systemowy
mechanizm rozpoznawania nazw, używając tego samego polecenia na hoście i wewnątrz kontenera:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Zastąp `omniroute` nazwą uruchamianej usługi (na przykład `omniroute-web`). Te
polecenia wyświetlają rodziny adresów bez danych uwierzytelniających ani adresów IP.
Zwrócona wartość `6` wskazuje jedynie wynik DNS dla IPv6: **nie** dowodzi istnienia
działającej trasy IPv6 ani dostępu do API. Jeśli zainstalowano `curl`, porównaj
`curl -4 -I https://generativelanguage.googleapis.com` z
`curl -6 -I https://generativelanguage.googleapis.com` w obu środowiskach.
Odpowiedź HTTP potwierdza łączność dla tej próby, nawet jeśli jest to nieuwierzytelniony
błąd; tylko uwierzytelnione żądanie do modelu sprawdza możliwość korzystania z Gemini.

### Alternatywa na poziomie hosta: działające IPv6 i polityka mechanizmu rozpoznawania nazw

Osoba zgłaszająca [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) przywróciła
dostęp w swoim środowisku, włączając IPv6 dla kontenera i zmieniając sposób wyboru
adresów przez glibc. Traktuj to jako alternatywę specyficzną dla danego środowiska.
Przed zmianą preferencji mechanizmu rozpoznawania nazw potwierdź działanie IPv6 na
hoście, ruch wychodzący i routing kontenera oraz reguły zapory sieciowej.
Sam prywatny adres ULA nie potwierdza publicznej łączności IPv6.

W przypadku usług już podłączonych do domyślnej sieci Compose poniższy fragment włącza
IPv6 w tej sieci; zachowaj pozostałą część konfiguracji usługi, porty, woluminy i ustawienia:

```yaml
networks:
  default:
    enable_ipv6: true
```

W przypadku sieci nazwanej włącz tę opcję w sieci, do której usługa faktycznie jest
podłączona. Docker może przydzielić podsieć ULA; wybierz jawną, nienakładającą się
podsieć tylko wtedy, gdy wymaga tego Twoja sieć. Zobacz
[obsługę sieci IPv6 w Dockerze](https://docs.docker.com/engine/daemon/ipv6/)
oraz [opcje sieci Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

W **obrazie opartym na glibc** plik `/etc/gai.conf` może zmieniać sposób wyboru adresów.
Bieżący plik Dockerfile repozytorium używa Debiana; niestandardowe obrazy oparte na musl
nie korzystają z tego mechanizmu. Opisana zmiana modyfikuje etykietę ULA z
`label fc00::/7 6` na `label fc00::/7 1`. Zacznij od kompletnej tabeli polityk obrazu
i zachowaj jej pozostałe wpisy: dodanie wpisu `label` lub `precedence` zastępuje tę
domyślną tabelę, dlatego plik zawierający wyłącznie zmieniony wiersz jest niewystarczający.
[Dokumentacja konfiguracji glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
opisuje tę semantykę. Zamontuj zweryfikowany plik tylko do odczytu w `/etc/gai.conf`
i odtwórz usługę, aby zastosować zmianę.

Zmienia to sposób wyboru adresów przez system operacyjny dla **całego ruchu wychodzącego
z tego kontenera**. Nie wymusza to wyboru IPv6 przez każdą aplikację: znaczenie mają
również kolejność DNS i sposób wyboru połączenia przez Node. W szczególności
`--dns-result-order=ipv4first` preferuje IPv4 i nie jest rozwiązaniem problemu
występującego wyłącznie przy IPv4. Zobacz [kolejność DNS w Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Po każdej zmianie na poziomie hosta ponownie przetestuj Gemini i pozostałych dostawców.
Aby wycofać zmianę, usuń niestandardowe montowanie pliku `gai.conf`, przywróć poprzednią
konfigurację sieci i odtwórz usługę lub sieć, której dotyczy problem, podczas okna
serwisowego. Odtworzenie sieci może przerwać działanie innych podłączonych do niej
kontenerów; nie usuwaj woluminu z trwałymi danymi.

## Ważne uwagi

- **Tryb WAL SQLite:** Polecenie `docker stop` powinno mieć możliwość pełnego zakończenia działania, aby OmniRoute mógł zapisać najnowsze zmiany kontrolne z powrotem do `storage.sqlite`. Dołączone pliki Compose mają już ustawiony 40-sekundowy okres łagodnego zatrzymywania. Jeśli uruchamiasz obraz bezpośrednio, zachowaj opcję `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Ustaw na `true`, jeśli rutynowe kopie zapasowe i kopie przed zapisem są zarządzane zewnętrznie. Migracje istniejącej bazy danych nadal wymagają własnej trwałej migawki bezpieczeństwa oraz zabezpieczenia przed masową migracją.
- **Trwałość danych:** Zawsze montuj wolumin w `/app/data`, aby zachować bazę danych, klucze i konfiguracje po ponownym uruchomieniu kontenera.
- **Konfiguracja portu:** Nadpisz zmienną środowiskową `PORT`, aby zmienić domyślny port `20128`.

## Zobacz także

- [Przewodnik wdrażania na maszynie wirtualnej](../ops/VM_DEPLOYMENT_GUIDE.md) — konfiguracja maszyny wirtualnej + nginx + Cloudflare
- [Przewodnik wdrażania na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — wdrażanie na Fly.io
- [Konfiguracja środowiska](../reference/ENVIRONMENT.md) — kompletna dokumentacja pliku `.env`
