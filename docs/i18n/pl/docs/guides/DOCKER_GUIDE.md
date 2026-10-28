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

## Szybkie uruchomienie

> **Chcesz samodzielnie hostować za pomocą jednego polecenia?** Zobacz
> [przewodnik samodzielnego hostowania](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (opublikowany obraz +
> Redis, dostęp wyłącznie przez interfejs loopback, bez wyboru profilu). Poniższa
> sekcja szybkiego uruchomienia opisuje wariant z jednym kontenerem dla użytkowników,
> którzy korzystają już z Redis uruchomionego w innym miejscu.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Z plikiem środowiskowym

```bash
# Najpierw skopiuj i edytuj plik .env
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

## Etapy Dockerfile

Repozytorium zawiera wieloetapowy Dockerfile (`Dockerfile`). Udostępnione są cztery etapy; wybierz odpowiedni `target` dla swojego zastosowania.

| Etap          | Obraz bazowy          | Przeznaczenie                                                                                                                                                                                                                                                                                                                  |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Instaluje zależności (`npm ci --legacy-peer-deps`) i uruchamia `npm run build` (domyślnie Turbopack — zobacz sekcję Zasoby podczas kompilacji poniżej)                                                                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | Środowisko uruchomieniowe produkcyjne z autonomicznymi wynikami kompilacji Next.js. **Nie zawiera interfejsów CLI dostawców.**                                                                                                                                                                                                 |
| `runner-cli`  | `runner-base`         | Dodaje `git`, `docker.io`, `docker-compose` oraz globalne interfejsy CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Wybierz ten etap dla przepływów pracy wykorzystujących agentów.**                                                                                                               |
| `runner-web`  | `runner-base`         | Dodaje Playwright oraz przeglądarkę Chromium (`--with-deps`) dla dostawców sesji internetowych: `gemini-web`, `claude-web`, `claude-turnstile`. **Wybierz ten etap, gdy korzystasz z tych dostawców** — bez niego podstawowy obraz zgłasza błąd podczas obsługi żądania (zobacz uwagę dotyczącą `-web` w sekcji Kanały wydań). |

Aby ręcznie zbudować określony etap:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Zasoby podczas kompilacji

Trzy argumenty kompilacji kontrolują zapotrzebowanie etapu `builder` na zasoby. Obowiązują one wyłącznie podczas kompilacji —
`OMNIROUTE_MEMORY_MB` (poniżej) jest osobnym parametrem środowiska uruchomieniowego.

| Argument kompilacji         | Wartość domyślna | Działanie                                                                                                |
| --------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`              | `0` kompiluje przy użyciu webpacka: niższe szczytowe zużycie pamięci, ale wolniej. `1` włącza Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`           | Limit sterty V8 (`--max-old-space-size`) dla uruchomionego procesu `next build`.                         |
| `OMNIROUTE_BUILD_WORKERS`   | `2`              | Ustawia `CIRCLE_NODE_TOTAL`; Next wyznacza `workers = N - 1` na potrzeby zbierania danych stron.         |

`OMNIROUTE_BUILD_WORKERS` należy zwiększyć na wydajnej maszynie kompilującej i podejrzewać
w pierwszej kolejności, gdy kompilacja przy ograniczonych zasobach przerywa się **po** komunikacie `✓ Compiled successfully`. Każdy
proces roboczy zbierający dane stron jest osobnym procesem, podobnie jak nadrzędny proces `next build`;
odtworzenie problemu na działającym VPS-ie (zgłoszenie #7518) wykazało szczytowe RSS każdego procesu
na poziomie ~4,5 GB, niezależnie od flagi sterty `NODE_OPTIONS` (Turbopack kompiluje z użyciem
natywnej pamięci/Rusta poza stertą V8). Domyślna wartość `2` (→ 1 proces roboczy, łącznie 2
procesy) została dobrana pod kątem hostowanych przez GitHub maszyn wykonawczych z 16 GB pamięci i 4 vCPU, których
używa potok publikowania. Przy wartości `8` (→ 7 procesów roboczych) na tej maszynie zabrakło pamięci, a
buildkit przerwał krok z błędem `ResourceExhausted: ... cannot allocate memory`;
wartość `3` (→ 2 procesy robocze) nadal się nie mieściła, gdy RSS poszczególnych procesów zmierzono
bezpośrednio zamiast je szacować. `tests/unit/docker-build-memory-budget.test.ts`
wykonuje obliczenia na podstawie zmierzonej wartości i kończy się niepowodzeniem, jeśli którykolwiek parametr
przekracza możliwości maszyny wykonawczej.

Turbopack kompiluje z użyciem natywnej pamięci Rusta, która znajduje się **poza** stertą V8, dlatego
`OMNIROUTE_BUILD_MEMORY_MB` jej nie ogranicza. Na hoście z limitem pamięci proces kompilacji
zostaje wówczas zakończony sygnałem SIGKILL przez mechanizm OOM bez żadnego komunikatu o błędzie — po prostu
zatrzymuje się w trakcie `Creating an optimized production build`, co wygląda raczej jak zawieszenie
niż brak pamięci. Dlatego `Dockerfile` domyślnie używa webpacka
(`OMNIROUTE_USE_TURBOPACK=0`), w przeciwieństwie do `npm run dev` / `npm run build`, gdzie
Turbopack jest domyślnie ustawiony w kodzie: zwykłe `docker build .` bez argumentów kompilacji (uruchamiane
przez Railway i inne platformy wdrożeniowe jednym kliknięciem) nie może po cichu kończyć się niepowodzeniem na maszynie
z ograniczoną pamięcią. Opublikowane obrazy już jawnie przekazują `OMNIROUTE_USE_TURBOPACK=0`
w pliku `docker-publish.yml`. Na maszynie kompilującej z dużą ilością pamięci RAM włącz
Turbopack, aby przyspieszyć kompilację:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

Opcja `webpackBuildWorker` jest włączona, dlatego `next build` uruchamia proces nadrzędny **oraz** proces roboczy,
a każdy z nich osobno respektuje `OMNIROUTE_BUILD_MEMORY_MB`. Limit pamięci kontenera należy ustawić
na wartość w przybliżeniu ponad dwukrotnie większą, a nie jednokrotnie większą.

Pomiary dla tego drzewa (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limit kontenera | Wynik                                                  |
| --------- | --------------- | ------------------------------------------------------ |
| Turbopack | 8 GiB / 16 GiB  | zakończony przez OOM przy obu limitach, bez komunikatu |
| webpack   | 8 GiB           | proces roboczy kompilacji zakończony sygnałem SIGKILL  |
| webpack   | 12 GiB          | powodzenie, szczytowe zużycie 11,1 GiB                 |

### Domyślne ustawienia środowiska uruchomieniowego

Wartości domyślne eksportowane przez `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Zachowanie pamięci w Dockerze:

- Obraz ustawia `OMNIROUTE_MEMORY_MB=1024` i na tej podstawie wyznacza `NODE_OPTIONS=--max-old-space-size=1024`.
- Właściwy proces serwera jest uruchamiany przez samodzielny program uruchamiający, który odczytuje `OMNIROUTE_MEMORY_MB` i dodaje `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node używa ostatniej powtórzonej wartości `--max-old-space-size`, dlatego ustawienie `OMNIROUTE_MEMORY_MB` kontroluje efektywny limit sterty w Dockerze.
- Ponieważ obraz zawsze ustawia tę zmienną, własny mechanizm zapasowy programu uruchamiającego, kalibrowany na podstawie ilości pamięci RAM, nigdy nie ma zastosowania w Dockerze. Należy jawnie zwiększyć tę wartość stosownie do obciążenia (tabela poniżej). `2048` to nadal za mało dla `/v1/responses` agentów programistycznych.

### Pamięć RAM środowiska uruchomieniowego dla agentów programistycznych

Domyślna wartość 1 GiB w Dockerze to minimum dla panelu i prostych czatów, a nie rozmiar odpowiedni dla środowiska produkcyjnego. Długie treści żądań `POST /v1/responses` (setki wiadomości, dziesiątki narzędzi) podczas kompresji przechowują w pamięci wiele grafów. Dwa nakładające się żądania o rozmiarze około 3 MiB / 750 tys. tokenów spowodowały przerwanie V8 przy **12 GiB** przestrzeni old-space (`FATAL ERROR: Reached heap limit`), a także wywołały błąd OOM cgroup przy 16 GiB. Zobacz [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Ustaw **`--memory` cgroup powyżej rozmiaru sterty** — natywne bufory, SQLite i pośrednie dane kompresji znajdują się poza V8.

| Obciążenie                                      | `OMNIROUTE_MEMORY_MB`            | Kontener / cgroup                    | Uwagi                                                                                                                                   |
| ----------------------------------------------- | -------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Panel, jeden prosty czat                        | `1024` (domyślna wartość obrazu) | ≥2 GiB                               |                                                                                                                                         |
| Jeden agent programistyczny (Claude/Codex/Grok) | `8192`                           | ≥10 GiB                              | Typowa pojedyncza sesja `/v1/responses`                                                                                                 |
| Dwa równoczesne długie `/v1/responses`          | `10240`–`12288`                  | ≥12–16 GiB                           | Zaobserwowane przerwanie V8 przy stercie około 12 GiB                                                                                   |
| Co najmniej trzy równoczesne długie konteksty   | nie uruchamiaj w jednym procesie | przetwarzanie szeregowe / więcej RAM | Domyślny limit obsługi ciężkich żądań wynosi 1 trwające żądanie; zwiększenie go bez dodatkowej pamięci RAM ponownie powoduje przerwanie |

`omniroute serve` na systemie bezpośrednio zainstalowanym na sprzęcie kalibruje limit do około 35% pamięci RAM (ograniczonego do zakresu `[512, 4096]`), gdy `OMNIROUTE_MEMORY_MB` jest **nieustawione**. Docker zawsze ustawia `1024`, dlatego ta kalibracja nigdy nie jest wykonywana w oficjalnym obrazie.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## Reverse proxy w podścieżce (Traefik / nginx)

Wartość `basePath` platformy Next.js jest kompilowana w autonomicznym pakiecie. OmniRoute zapisuje utrwaloną
wartość w pliku kontrolnym w katalogu głównym aplikacji (zapisywanym podczas `npm run build`; odczytywanym przez
`scripts/docker/ensure-docker-base-path.mjs`) i porównuje ją z
`OMNIROUTE_BASE_PATH` podczas uruchamiania kontenera. Gdy wartości są różne, a obraz został
zbudowany dla katalogu głównego domeny, skrypt wejściowy modyfikuje manifesty autonomicznego pakietu,
osadzone literały `basePath`/`assetPrefix` (Next 16 generuje adresy URL zasobów SSR wyłącznie na podstawie
`assetPrefix` — narzędzie modyfikujące odwzorowuje w nim podścieżkę), utrwalone
adresy URL zasobów `/_next/static` (manifesty referencji klienta, importy multimediów, wstępnie renderowane
strony błędów) oraz kliencki adapter `process.env`, zanim zostanie uruchomiony
`node dev/run-standalone.mjs`.

### Kompilacja za pomocą Compose (zalecane)

Ustaw obie zmienne w pliku `.env`, a następnie ponownie zbuduj obraz, aby konfiguracje obrazu i środowiska uruchomieniowego były zgodne:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

Plik `docker-compose.yml` przekazuje `OMNIROUTE_BASE_PATH` jako argument kompilacji Dockera oraz jako
zmienną środowiskową środowiska uruchomieniowego.

### Wstępnie zbudowany obraz dla katalogu głównego + podścieżka środowiska uruchomieniowego

Opublikowane obrazy `diegosouzapw/omniroute:*` są zbudowane dla katalogu głównego domeny. Nadal można
ustawić `OMNIROUTE_BASE_PATH` w środowisku uruchomieniowym; kontener jednorazowo modyfikuje pakiet podczas uruchamiania.
Należy użyć go wraz z pasującym publicznym adresem bazowym:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Skonfiguruj reverse proxy tak, aby przekazywało **pełną** ścieżkę zewnętrzną (nie usuwaj
prefiksu). Traefik powinien kierować `PathPrefix(`/omniroute`)` do kontenera bez
`StripPrefix`, dzięki czemu Next.js otrzyma `/omniroute/...` i będzie udostępniać zasoby z
`/omniroute/_next/...`.

Mechanizm kontroli kondycji Dockera odpytuje lekki punkt końcowy cyklu życia `/healthz`, poprzedzony
aktywną wartością `OMNIROUTE_BASE_PATH`. Punkt `/api/monitoring/health` pozostaje dostępny na potrzeby
diagnostyki wykonywanej przez człowieka lub pulpit; aby ponownie skierować na niego mechanizm HEALTHCHECK kontenera (na przykład
w celu wymuszania szczegółowej kontroli kondycji), ustaw `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ta ścieżka wykonuje **szczegółową** kontrolę (baza danych + podsumowanie monitorowania) — jest odpowiednia dla rzadko
wykonywanego przez Dockera mechanizmu `HEALTHCHECK`, jeśli zdecydujesz się go ponownie włączyć, ale **nie** dla interwałów
`livenessProbe` w Kubernetes.

W przypadku orkiestratorów (Kubernetes, Nomad itp.):

| Sonda                  | Preferowane                                                             | Należy unikać                                                       |
| ---------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Żywotność              | HTTP `GET /livez` lub TCP na głównym porcie (`PORT`, domyślnie `20128`) | `/api/monitoring/health` jako sondy żywotności                      |
| Gotowość               | HTTP `GET /healthz`                                                     | Krótkich limitów czasu, które uznają zajętą pętlę zdarzeń za awarię |
| Szczegółowa / blackbox | `/api/monitoring/health`                                                | —                                                                   |

`/healthz` raportuje stan cyklu życia procesu (`ok` / `starting` / `stopping`). `/livez` sprawdza
wyłącznie, czy proces działa (zwraca 200 zawsze, gdy procedura obsługi może zostać wykonana; nie czeka na
gotowość). Oba punkty nadal działają w tej samej pętli zdarzeń Node co obsługa żądań, dlatego
operacje na katalogu lub kompresji intensywnie wykorzystujące procesor mogą je opóźniać — zajęty ≠ niedziałający. Jeśli sondy HTTP
przekraczają limit czasu, preferuj sprawdzanie żywotności za pomocą TCP. Pełne zalecenia dotyczące sond:
[Przewodnik monitorowania — zalecenia dotyczące sond Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose z Caddy (automatyczne TLS dla HTTPS)

OmniRoute można bezpiecznie udostępnić za pomocą automatycznego konfigurowania certyfikatów SSL przez Caddy. Upewnij się, że rekord DNS typu A Twojej domeny wskazuje adres IP serwera.

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
      # Źródłowy adres widoczny dla przeglądarki, używany do wywołań zwrotnych OAuth, linków panelu i generowanych publicznych adresów URL.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Wewnętrzny adres URL między serwerami, używany przez zaplanowane zadania i wywołania do samej usługi.
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

Caddy ustawia standardowe nagłówki przekazywania dla kontenera nadrzędnego. OmniRoute używa
`NEXT_PUBLIC_BASE_URL` jako kanonicznego publicznego źródła wywołań zwrotnych OAuth i generowanych
linków publicznych; uwierzytelnione operacje zapisu w panelu używają żądań z tego samego źródła oraz
ochrony CSRF powiązanej z sesją. Włączaj `OMNIROUTE_TRUST_PROXY` tylko w zaawansowanych wdrożeniach,
w których celowo chcesz, aby OmniRoute ustalał publiczne źródło na podstawie zaufanych przekazanych
nagłówków zamiast jawnej konfiguracji.

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

| Obraz                    | Tag      | Rozmiar | Opis                                                               |
| ------------------------ | -------- | ------- | ------------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Najwyższa **opublikowana** stabilna wersja SemVer (nie git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Przypnij tę klasę tagów na potrzeby GitOps                         |

Manifest wieloplatformowy: natywne `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automatycznie wybiera pasującą architekturę; przekaż `--platform linux/amd64`, jeśli chcesz wymusić emulację AMD64 na hostach ARM.

### Kanały wydań

OmniRoute publikuje oddzielne kanały Docker dla stabilnych wydań, testowania aktywnej gałęzi wydania oraz kompilacji rozwojowych.

| Kanał                           | Źródło                                            | Zmienność                        | Zalecane użycie                                                                                                         |
| ------------------------------- | ------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Podpisane/wersjonowane wydanie                    | Niezmienny                       | Wdrożenia produkcyjne przypinające dokładną wersję                                                                      |
| `:latest` / `:latest-web`       | Najwyższa **opublikowana** stabilna wersja SemVer | Zmienny wskaźnik stabilny        | Śledzi stabilne wydania **po** zadaniu publikacji SemVer — **nie** śledzi `main` ani niewydanych commitów `release/v*`  |
| `:next` / `:next-web`           | Bieżąca domyślna gałąź `release/v*`               | Zmienny wskaźnik wersji wstępnej | Testowanie poprawek, które trafiły do aktywnej gałęzi wydania, ale nie zostały jeszcze uwzględnione w stabilnym wydaniu |
| `:main` / `:main-web`           | Gałąź `main`                                      | Zmienny wskaźnik rozwojowy       | Wyłącznie programowanie i testy integracyjne                                                                            |

#### Dostawcy sesji internetowych: obrazy `-web`

Każdy powyższy kanał ma również odpowiedni tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), zbudowany z etapu `runner-web` — jest to ten sam obraz, ale dodatkowo zawiera Playwright i przeglądarkę Chromium. Zwykły obraz jest dostarczany **bez** Chromium; `gemini-web`, `claude-web` i `claude-turnstile` go wymagają.

Błąd jest odroczony i nie występuje podczas uruchamiania: ci dostawcy wyświetlają swoje modele i są widoczni w panelu jako połączeni, a dopiero pierwsze żądanie kończy się błędem

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jeśli korzystasz z tych dostawców, pobierz tag `-web` kanału, którego już używasz — nic więcej się nie zmienia. W przypadku instalacji npm/CLI (bez obrazu Docker) brakującym odpowiednikiem jest plik wykonywalny przeglądarki: uruchom `npx playwright install chromium` na hoście.

#### Korzystanie z kanału wersji wstępnej

Kanał `next` jest przebudowywany przy każdym wypchnięciu zmian do bieżącej domyślnej gałęzi `release/v*` i publikowany zarówno dla architektury AMD64, jak i ARM64. Starsze gałęzie utrzymaniowe nie mogą go nadpisać. Kanał udostępnia obraz możliwy do pobrania, zawierający poprawki scalone z aktywną gałęzią wydania przed utworzeniem kolejnego stabilnego tagu.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

W przypadku Docker Compose zastąp tag obrazu używany przez wybrany profil, a następnie pobierz obraz i utwórz usługę ponownie:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Bezpieczeństwo i wycofywanie zmian

`next` jest ruchomym kanałem wersji przedpremierowych. Może zmienić się przy każdym wypchnięciu zmian do aktywnej gałęzi wydania i **nie jest przeznaczony do użytku produkcyjnego**. Podczas testowania określonej kompilacji przypnij skrót obrazu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Przed rozpoczęciem testów wykonaj kopię zapasową woluminu danych OmniRoute lub katalogu danych zamontowanego przez bind mount. Aby wycofać zmiany, przywróć poprzednio używaną stabilną wersję lub skrót obrazu i utwórz kontener ponownie:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Kompilacja z gałęzi wydania nigdy nie może zmienić `latest`; tylko kwalifikująca się stabilna wersja semantyczna może zaktualizować wskaźnik wersji stabilnej. Obrazy `next` zachowują kontrolę obrazu wydania oraz blokadę dotyczącą luk w zabezpieczeniach o poziomie CRITICAL.

**`latest` nie gwarantuje aktualności względem repozytorium git.** Poprawki scalone z `main` lub aktywną gałęzią `release/v*` **nie są** dostępne w `:latest`, dopóki nie zostanie opublikowany stabilny obraz SemVer, a zadanie publikowania nie zaktualizuje `:latest` (ten sam skrót co w przypadku tej wersji SemVer). Jeśli `latest` wydaje się nieaktualny, mimo że GitHub pokazuje już poprawkę, pobierz `:next`, aby przetestować gałąź wydania, lub poczekaj na tag SemVer.

| Cel                                                                                                  | Użyj                                  |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------- |
| GitOps / środowisko produkcyjne, które nie może ulegać zmianom                                       | Przypnij `:X.Y.Z` (lub skrót obrazu)  |
| Korzystanie z publikowanych wersji stabilnych i akceptowanie ponownego tworzenia przy każdym wydaniu | `:latest`                             |
| Testowanie niewydanych commitów z `release/v*`                                                       | `:next` (nie do użytku produkcyjnego) |
| Testowanie `main`                                                                                    | `:main` (nie do użytku produkcyjnego) |

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

| Ograniczenie                                  | Konsekwencja                                                                                                                                                                                                                                                                                                |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pojedynczy pisarz                             | Do** nie** uruchom wiele replik w tym samym pliku SQLite. To psuje DB.                                                                                                                                                                                                                                      |
| Odtwórz / uruchom ponownie / HEALTHCHECK kill | **Pełna awaria** SSE w locie, sesje na desce rozdzielczej i stan w pamięci. Każdy podłączony klient odpada. Nowe żądania w oknie pustego punktu końcowego otrzymują odwrotne proxy**`502 Bad Gateway: Unknown error`** , a nie OmniRoute JSON — klienci nie mogą odróżnić tego od awarii dostawcy (#11015). |
| Ta sama pętla zdarzeń co `/healthz`           | Zajęty katalog lub znacznik kompresji może opóźnić sondy; krótki limit czasu, a następnie uruchamia ponownie** tylko** replika.                                                                                                                                                                             |

**Matryca sondy** (zobacz także [zalecenia dotyczące sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sonda            | Cel                                                           | Nie używać                                                           |
| ---------------- | ------------------------------------------------------------- | -------------------------------------------------------------------- |
| Żywotność        | TCP na `PORT` (domyślnie `20128`) lub miękkie HTTP `/healthz` | `/api/monitoring/health`                                             |
| Gotowość         | HTTP `GET /healthz`                                           | Małe limity czasu, które traktują zajętość pętli zdarzeń jako martwą |
| Głęboko / ludzie | `/api/monitoring/health`                                      | Zautomatyzowana żywotność Kubelet                                    |

**Ulepszenia:** spodziewać się spadku każdej sesji. Jeśli możesz, pozbądź się klientów; nie ma ciągłej aktualizacji domyślnego SQLite. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` zastąpi także jedyny proces, gdy kontener jest w złym stanie — ten sam promień wybuchu.

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

`preStop` Sleep pozwala Kube upuścić punkty końcowe usługi przed SIGTERM więc** nowy** ruch przestaje uderzać w proces umierania. W locie `/v1/responses` SSE jest zużywane do `SHUTDOWN_TIMEOUT_MS` (domyślnie 30 s) poprzez dzierżawę wstępu dla wagi ciężkiej (#11015). Nowe żądania, które nadal docierają do procesu, otrzymują `503` + `Retry-After: 5`. Opcja Odtwórz lukę w pustym punkcie końcowym do czasu, aż wymiana będzie gotowa, pozostaje poważną awarią — to jest topologia SQLite, a nie błędna konfiguracja sondy.

Zewnętrzny Postgres / multi-writer HA to** nie** udokumentowana ścieżka zapasów. Jeśli potrzebujesz HA, zachowaj pojedynczą replikę lub uruchom topologię, którą projekt przetestował i udokumentował osobno. Praca Postgres/MySQL mieszka pod [numerem 8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Do tego czasu jest to jedyny obsługiwany sposób rozmnażania** duży** pojemność `/v1/responses` to N niezależnych procesów (następna sekcja), a nie `replicas > 1` na jednym woluminie.

## Skalowanie wszerz: N niezależnych procesów

Jeden proces Node to **jedna sterta V8**. Dwa nakładające się żądania agenta programistycznego `POST /v1/responses` (RTK + Caveman), każde o rozmiarze około 3 MiB / 750 tys. tokenów, powodują przerwanie działania tej sterty przy około 12 Gi (`FATAL ERROR: Reached heap limit`) i mogą doprowadzić do OOM w cgroup o rozmiarze 16 Gi. Zobacz [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ten pomiar stanowi ostrzeżenie dotyczące **budżetu pamięci**, a nie narzucony przez produkt sztywny limit dwóch równoczesnych długich żądań `/v1/responses`. Dopuszczanie obciążających żądań czatu jest kontrolowane przez automatycznie wyliczany budżet bajtów wejściowych (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), którego rozmiar wynika z tego samego limitu V8/cgroup — zwiększenie go przez nadpisanie (lub ustawienie starszego limitu liczby żądań `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) w procesie, którego rozmiar został już dobrany, ponownie prowadzi do przerwania działania. Małe czaty, `/healthz`, `/v1/models` i MCP **nie** podlegają temu limitowi.

### Jeden proces: więcej niż dwa długie żądania `/v1/responses`

**Zdrowy** proces (sterta poniżej `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, domyślnie `0.75`) **może** obsługiwać więcej niż dwa równoczesne długie żądania `POST /v1/responses`, jeśli ogólnoprocesowy budżet bajtów żądań w toku (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) nadal ma wolną pojemność. Treści żądań o rozmiarze równym lub większym niż `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (domyślnie 256 KiB) uzyskują tę samą dzierżawę dla dużego obciążenia co żądania o złożonej strukturze i korzystają z tego samego mechanizmu awaryjnego `tryAcquireHealthyHeadroom` z [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dziesiątki równoczesnych długich klientów SSE (operatorzy często potrzebują 40–50) to kwestia **budżetu pamięci** — należy dobrać rozmiar sterty, liczbę slotów podstawowych/rezerwowych oraz `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — a nie sztywny limit produktu wynoszący „maks. 2”. Proces z przeciążoną stertą nadal odrzuca żądania za pomocą umożliwiającego ponowienie kodu `503`, aby problem #7849 nie powrócił.

Aby **zwielokrotnić sterty** (niezależne przestrzenie old-space V8) **już dziś**:

| Rób                                                                                                                                                                                            | Nie rób                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Uruchamiaj **N kontenerów/podów**, każdy z **własnym** `DATA_DIR` / woluminem                                                                                                                  | Nie ustawiaj `replicas > 1` dla jednego pliku SQLite                                           |
| Dobieraj liczbę ciężkich żądań w toku i slotów rezerwowych na podstawie sterty / budżetu bajtów w toku; 1–2 to konserwatywna wartość domyślna wynikająca z #7849, a nie sztywny limit produktu | Nie przydzielaj jednemu procesowi 8× więcej RAM-u i nieograniczonego limitu liczby żądań       |
| Opcjonalnie: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` dla **współdzielonych liczników limitów**                                                                                    | Nie traktuj Redis jako współdzielonego SQLite — nim nie jest                                   |
| Powiel sekrety dostawców w każdej instancji (albo zaakceptuj oddzielne pulpity)                                                                                                                | Nie oczekuj jednego pulpitu / jednego dziennika wywołań we wszystkich instancjach              |
| Umieść przed instancjami dowolny moduł równoważenia obciążenia; trwałe przypisanie według klucza API lub sesji wystarczy                                                                       | Nie wymagaj specyficznego dla dostawcy oprogramowania pośredniczącego uwzględniającego rozmiar |

Sprzęt: liczba równoczesnych długich żądań `/v1/responses` na instancję to kwestia **budżetu pamięci** (sterta + bajty żądań w toku / #10110). `N` niezależnych katalogów `DATA_DIR` nadal oznacza zwielokrotnienie stert: pamięć RAM hosta musi pomieścić `N × cgroup`, a nie „jeden pod 16 Gi z N=8”. Nigdy nie używaj `replicas > 1` dla jednego pliku SQLite.

Przykładowa konfiguracja Compose (dwie sterty, dwa woluminy — nie `deploy.replicas: 2`):

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

Zwiększanie gęstości w obrębie procesu (kompresja poza izolatem HTTP) opisano w [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jeden logiczny klaster oparty na współdzielonym trwałym stanie opisano w [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
