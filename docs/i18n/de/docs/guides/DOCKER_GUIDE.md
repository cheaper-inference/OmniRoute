# 🐳 Docker Guide — OmniRoute (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Vollständige Referenz für die Docker-Bereitstellung. Für einen schnellen Einstieg siehe den [Docker-Abschnitt der README](../README.md#-docker).

## Inhaltsverzeichnis

- [Schnellstart](#quick-run)
- [Mit Umgebungsdatei](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Verfügbare Profile](#available-profiles)
- [Konfiguration von CLI-Tools auf dem Host, wenn OmniRoute in Docker ausgeführt wird](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-Sidecar](#redis-sidecar)
- [Produktions-Compose](#production-compose)
- [Dockerfile-Stufen](#dockerfile-stages)
- [Kritische Umgebungsvariablen](#critical-environment-variables)
- [Docker Compose mit Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image-Tags](#image-tags)
- [Dashboard-Aktualisierungen in Docker](#dashboard-updates-in-docker)
- [Verfügbarkeit: Standard-SQLite unterstützt nur eine Replik](#availability-default-sqlite-is-single-replica)
- [Regionale Gemini-Fehler innerhalb von Docker](#gemini-regional-errors-inside-docker)
- [Wichtige Hinweise](#important-notes)

---

## Schneller Lauf

> **Selbsthosting mit einem Befehl?** Weitere Informationen finden Sie im [Self-Host-Handbuch](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (veröffentlichtes Bild + Redis, nur Loopback, keine Profilauswahl). Der folgende Quick Run ist der Einzel-Container-Pfad für Benutzer, die Redis bereits an anderer Stelle ausführen.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Mit Umgebungsdatei

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
# Basisprofil (ohne CLI-Tools)
docker compose --profile base up -d

# CLI-Profil (Claude Code, Codex und OpenClaw integriert)
docker compose --profile cli up -d

# Host-Profil (primär für Linux; bindet CLI-Binärdateien des Hosts schreibgeschützt ein)
docker compose --profile host up -d

# Webprofil (Chromium/Playwright für Websitzungsanbieter)
docker compose --profile web up -d

# CLI und CLIProxyAPI-Sidecar kombinieren
docker compose --profile cli --profile cliproxyapi up -d
```

## Verfügbare Profile

OmniRoute enthält Compose-Profile für die wichtigsten Bereitstellungsszenarien. Wählen Sie das Profil aus, das zu Ihrer Umgebung passt.

| Profil            | Dienst           | Verwendungszweck                                                                                                                                                    | Befehl                                       |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (Standard) | `omniroute-base` | Headless-Server/minimale Laufzeitumgebung, keine Anbieter-CLIs enthalten                                                                                            | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentenbasierte Workflows, die `omniroute providers/setup/doctor` und integrierte CLIs (Codex, Claude Code, Droid, OpenClaw) aufrufen                               | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux-Hosts, die durch schreibgeschütztes Einbinden von `~/.local/bin`, `~/.codex`, `~/.claude` usw. einen `network_mode`-ähnlichen Zugriff auf Host-CLIs benötigen | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Den [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)-Sidecar auf Port `8317` für Upstream-CLI-Proxying ausführen                                         | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Websitzungsanbieter, die einen Browser benötigen: `gemini-web`, `claude-web`, `claude-turnstile` (erstellt `runner-web`, Chromium enthalten)                        | `docker compose --profile web up -d`         |

> Mehrere Profile können kombiniert werden: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurieren von Host-CLI-Tools, wenn OmniRoute in Docker ausgeführt wird

`omniroute setup-codex`, `setup-claude`, `config set <tool>` und die Schaltfläche
**Konfiguration speichern** im Dashboard schreiben jeweils Dateien wie `~/.codex/*.config.toml`. Diese Pfade
sind nur auf dem Rechner relevant, auf dem die CLI tatsächlich ausgeführt wird. Werden die Befehle innerhalb
des Containers ausgeführt, landen die Schreibvorgänge im Home-Verzeichnis des Containers (`/home/node` —
das Image wird mit `USER node` ausgeführt), wo keine Host-CLI sie jemals liest und wo sie
verworfen werden, sobald der Container neu erstellt wird.

OmniRoute erkennt dies und verweigert den Schreibvorgang mit entsprechenden Anweisungen, statt
einen nicht nutzbaren Erfolg zu melden: Die CLI wird mit `2` beendet und die API antwortet mit `422`
und `containerEphemeralTarget: true`.

### Empfohlen: CLI auf dem Host, OmniRoute in Docker ausführen

Der Container stellt die API bereit; die CLI konfiguriert Ihre Host-Tools.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI auf den Container ausrichten
omniroute setup-codex                      # schreibt in das tatsächliche ~/.codex auf Ihrem Host
```

Dies ist die richtige Wahl, wenn Codex, Claude Code, Cursor oder ähnliche Tools auf Ihrem
Laptop ausgeführt werden — was der üblichen Konfiguration entspricht.

### Alternative: Host-Konfigurationsverzeichnisse per Bind-Mount einbinden (`host`-Profil)

Wenn der Container selbst Ihre Host-Konfiguration schreiben soll, binden Sie die
Verzeichnisse ein und lassen Sie `CLI_CONFIG_HOME` auf das Wurzelverzeichnis des Mounts verweisen. Das `host`-Profil
übernimmt dies bereits:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Ein Bind-Mount macht den Pfad vertrauenswürdig: OmniRoute liest
`/proc/self/mountinfo` und erlaubt Schreibvorgänge in eingehängte Pfade (sowie in Verzeichnisse,
deren Unterverzeichnisse Mounts sind, was exakt der oben gezeigten Struktur von `/host-home` entspricht), während
Schreibvorgänge in nicht eingehängte Pfade weiterhin verweigert werden.

### Ausweichoption: Die containerinternen CLIs konfigurieren (sparsam verwenden)

Wenn sich die CLIs tatsächlich innerhalb des Containers befinden (das `cli`-Profil), ist der Schreibvorgang
beabsichtigt. Übergeben Sie `--allow-container-write` an einen beliebigen `setup-*`-Befehl oder setzen Sie
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` für den Server. Der Schreibvorgang wird
mit einer Warnung fortgesetzt, dass die Änderungen den Container nicht überdauern.

> **Sicherheitswarnung — `cli`-Profil + `docker.sock`-Mount.**
> Das `cli`-Profil bindet `/var/run/docker.sock` per Bind-Mount ein, damit der containerinterne
> automatische Updater den Stack über den Host-Daemon neu erstellen kann
> (`src/lib/system/autoUpdate.ts` prüft, ob dieser Socket vorhanden ist, und überspringt den
> Docker-Pfad, wenn er fehlt). Dieser Socket ist **eine Vertrauensgrenze mit Host-Root-Rechten**:
> Alles, was darauf zugreifen kann, steuert den Docker-Daemon des Hosts als
> root — es kann jeden Container auf dem Host erstellen, untersuchen, stoppen und entfernen.
> Auswirkungen:
>
> 1. **Geben Sie den Port des `cli`-Profils niemals für das Netzwerk frei.** Veröffentlichen
>    Sie ihn unter `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — ein im LAN erreichbares `cli`-Profil macht jede RCE auf Dashboard-Ebene zu einer
>    vollständigen Kompromittierung des Hosts.
> 2. **Binden Sie keine zusätzlichen Host-Verzeichnisse in das `cli`-Profil ein.**
>    Der Docker-Socket zusammen mit jedem weiteren Mount gewährt dem Container vollständigen
>    Lese-/Schreibzugriff auf Ihr Dateisystem und Ihre Host-Konfiguration. Wenn ein Tool
>    auf ein Projekt zugreifen muss, führen Sie es lokal mit dem CLI-Binary aus — binden Sie es nicht
>    in den `cli`-Container ein.
>
> Wenn Sie keine containerinterne automatische Aktualisierung benötigen, lassen Sie das `cli`-Profil deaktiviert
> (`COMPOSE_PROFILES=core,redis` oder kürzer). Die anderen Profile binden
> den Docker-Socket nicht ein.
>
> Siehe `docs/security/MITM-TPROXY-DECRYPT.md` (git; nicht in `/docs` kompiliert) für das zugehörige Bedrohungsmodell
> rund um MITM sowie `docs/security/SUPPLY_CHAIN.md` für die
> Herkunftskette der Binärdateien `codex`/`claude-code`/`droid`/`openclaw`.

## Redis-Sidecar

OmniRoute verwendet Redis als Backend für den verteilten Rate-Limiter und den gemeinsam genutzten Cache. Der Dienst `redis` ist in `docker-compose.yml` **immer definiert** (er ist an kein Profil gebunden) und wird zusammen mit jedem anderen Profil gestartet.

| Detail                        | Wert                                          |
| ----------------------------- | --------------------------------------------- |
| Image                         | `redis:7-alpine`                              |
| Containername                 | `omniroute-redis`                             |
| Interner Port                 | `6379`                                        |
| Host-Port (überschreibbar)    | `REDIS_PORT` (Standardwert: `6379`)           |
| Host-Bindung (überschreibbar) | `REDIS_BIND_HOST` (Standardwert: `127.0.0.1`) |
| Volume                        | `omniroute-redis-data` → `/data`              |
| Healthcheck                   | `redis-cli ping` (10-Sekunden-Intervall)      |

Zugehörige Umgebungsvariablen:

- `REDIS_URL` — in die Anwendung injizierte Verbindungszeichenfolge (standardmäßig `redis://redis:6379`).
- `REDIS_PORT` — hostseitige Portzuordnung für den Redis-Container.
- `REDIS_BIND_HOST` — Host-Schnittstelle, auf der der Port veröffentlicht wird. Standardmäßig `127.0.0.1`.

> **Warum standardmäßig Loopback verwendet wird:** Der Sidecar wird ohne `requirepass`
> ausgeführt, und die Anwendungscontainer erreichen ihn über das Compose-Netzwerk
> (`redis:6379`) — der veröffentlichte Port ist nur für hostseitige Werkzeuge
> (`redis-cli`, ein lokales `npm run dev`) vorgesehen. Eine Veröffentlichung auf
> `0.0.0.0` würde eine nicht authentifizierte Redis-Instanz für jeden Host in Ihrem LAN
> zugänglich machen. Wenn Sie `REDIS_BIND_HOST=0.0.0.0` festlegen, fügen Sie außerdem
> `--requirepass` zum `command:` des Dienstes hinzu.

Das **Deaktivieren von Redis** wird nicht empfohlen (der Rate-Limiter wechselt auf einen speicherinternen Fallback mit eingeschränkter Funktionalität). Falls es dennoch erforderlich ist, entfernen Sie entweder den Dienstblock `redis:` aus `docker-compose.yml` bzw. kommentieren Sie ihn aus, oder skalieren Sie ihn auf null:

```bash
docker compose up -d --scale redis=0
```

## Produktions-Compose

Verwenden Sie `docker-compose.prod.yml` für einen isolierten Produktions-Snapshot, der parallel zur Entwicklungsumgebung ausgeführt wird.

| Detail                         | Wert                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------- |
| Datei                          | `docker-compose.prod.yml`                                                                         |
| Standardmäßiger Dashboard-Port | `PROD_DASHBOARD_PORT=20130` (dem internen `${DASHBOARD_PORT:-20128}` zugeordnet)                  |
| Standardmäßiger API-Port       | `PROD_API_PORT=20131`                                                                             |
| Image                          | `omniroute:prod` (aus dem Target `runner-cli` erstellt)                                           |
| Redis-Container                | `omniroute-redis-prod` (`redis:8.6.2`, dediziertes Volume `redis-prod-data`)                      |
| Daten-Volume                   | `omniroute-prod-data` (benannt, bleibt über Neuerstellungen hinweg erhalten)                      |
| Healthchecks                   | `node healthcheck.mjs` + `redis-cli ping`, wobei `depends_on` vom Redis-Integritätsstatus abhängt |

Verwendung:

```bash
# Produktions-Stack erstellen und starten
docker compose -f docker-compose.prod.yml up -d --build

# Logs fortlaufend anzeigen
docker compose -f docker-compose.prod.yml logs -f

# Herunterfahren (Volumes beibehalten)
docker compose -f docker-compose.prod.yml down
```

Der Produktions-Stack wird parallel zum Entwicklungs-Compose ausgeführt (mit unterschiedlichen Containernamen, Ports und Volumes), sodass Sie lokal weiterarbeiten können, während die Produktionsumgebung aktiv bleibt.

## Dockerfile-Stufen

Das Repository liefert eine mehrstufige Docker-Datei (`Dockerfile`). Vier Stufen sind freigelegt; Wählen Sie den richtigen `target` für Ihren Anwendungsfall.

| Bühne         | Basisbild             | Zweck                                                                                                                                                                                                                                                                                                          |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installiert deps (`npm ci --legacy-peer-deps`) und führt `npm run build` aus (standardmäßig — Turbopack, siehe Build-Time-Ressourcen unten).                                                                                                                                                                   |
| `runner-base` | `node:26-trixie-slim` | Produktionslaufzeit mit der eigenständigen Next.js Ausgabe.** Kein Anbieter CLIs gebündelt.**                                                                                                                                                                                                                  |
| `runner-cli`  | `runner-base`         | Fügt `git`, `docker.io`, `docker-compose` und globales CLIs hinzu: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Wählen Sie dies für Agenten-Workflows.**                                                                                                                               |
| `runner-web`  | `runner-base`         | Fügt Playwright + einen Chromium-Browser (`--with-deps`) für Websitzungsanbieter hinzu: `gemini-web`, `claude-web`, `claude-turnstile`.** Wählen Sie diese Option, wenn Sie diese Anbieter nutzen** — schlägt das einfache Bild bei Anforderung ohne es fehl (siehe den `-web` -Hinweis unter Release-Kanäle). |

Erstellen Sie manuell ein bestimmtes Ziel:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ressourcen zur Build-Zeit

Drei Build-Argumente steuern, was die `builder` Stufe kostet. Sie dienen nur zur Erstellungszeit. — `OMNIROUTE_MEMORY_MB` (unten) ist ein separater Laufzeitknopf.

| Argument erstellen          | Standard | Wirkung                                                                                                 |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` erstellt mit Webpack: geringerer Spitzenspeicher, langsamer. `1` entscheidet sich für Turbopack.    |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | V8-Heap-Obergrenze (`--max-old-space-size`) für den erzeugten `next build`.                             |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | Feeds `CIRCLE_NODE_TOTAL`; Als nächstes wird `workers = N - 1` für die Seitendatenerfassung abgeleitet. |

`OMNIROUTE_BUILD_WORKERS` ist derjenige, der einen großen Builder anspricht, und derjenige, der Verdacht schöpft, wenn ein eingeschränkter Build stirbt** nach** `✓ Compiled successfully`. Jeder Seitendaten-Worker ist ein eigener Prozess, ebenso wie der übergeordnete `next build` selbst; Bei einer Live VPS Reproduktion (Problem #7518) wurde der Spitzen- RSS jedes Prozesses bei ~ 4,5 GB unabhängig vom `NODE_OPTIONS` Heap-Flag gemessen (Turbopack wird im native/Rust Speicher außerhalb des V8-Heaps kompiliert). Der Standardwert von `2` (→ 1 Worker, 2 Prozesse insgesamt) ist für die 16 GB / 4 vCPU -GitHub-gehosteten Läufer ausgelegt, die die Veröffentlichungspipeline verwendet. Bei `8` (→ 7 Worker) ging diesem Läufer der Speicher aus und Buildkit schlug den Schritt mit `ResourceExhausted: ... cannot allocate memory` fehl; `3` (→ 2 Worker) passten immer noch nicht, nachdem der RSS pro Prozess direkt gemessen statt abgeleitet wurde. `tests/unit/docker-build-memory-budget.test.ts` rechnet anhand der gemessenen Zahl und schlägt fehl, wenn einer der Knöpfe über den Läufer hinausragt.

Turbopack kompiliert im nativen Rust-Speicher, der lebt** draußen** der V8-Heap, daher bindet `OMNIROUTE_BUILD_MEMORY_MB` ihn nicht. Auf einem Host mit einer Speicherobergrenze wird der Build dann vom OOM Killer ohne Fehlertext SIGKILLed, — wird einfach mitten in `Creating an optimized production build` angehalten, was sich eher wie ein Hängen als wie ein Mangel an Speicher liest. Aus diesem Grund verwendet `Dockerfile` standardmäßig Webpack (`OMNIROUTE_USE_TURBOPACK=0`), im Gegensatz zu `npm run dev` / `npm run build`, wo Turbopack der Codestandard ist: Ein nackter `docker build .` ohne Build-Argumente (was Railway und andere One-Click-Hosts ausführen) darf auf einem Builder mit begrenztem Speicher nicht stillschweigend sterben. Die veröffentlichten Bilder übergeben `OMNIROUTE_USE_TURBOPACK=0` bereits explizit in `docker-publish.yml`. Entscheiden Sie sich bei einem Builder mit reichlich RAM für einen schnelleren Build für Turbopack :

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ist aktiviert, daher führt `next build` ein übergeordnetes Element aus** Und** ein Arbeitsprozess und jeder berücksichtigt `OMNIROUTE_BUILD_MEMORY_MB` separat. Bemessen Sie die Containerdecke auf etwa das Doppelte dieses Wertes, nicht nur einmal.

Gemessen an diesem Baum (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Containerdecke | Ergebnis                                                    |
| --------- | -------------- | ----------------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB | OOM-getötet auf beide, lautlos                              |
| Webpack   | 8 GiB          | Bauarbeiter SIGKILLed                                       |
| Webpack   | 12 GiB         | war erfolgreich und erreichte einen Höchstwert von 11,1 GiB |

### Laufzeitstandards

Von `runner-base` exportierte Standardwerte: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Speicherverhalten in Docker:

- Das Bild legt `OMNIROUTE_MEMORY_MB=1024` fest und leitet daraus `NODE_OPTIONS=--max-old-space-size=1024` ab.
- Der eigentliche Serverprozess wird vom eigenständigen Launcher gestartet, der `OMNIROUTE_MEMORY_MB` liest und `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` anhängt.
- Der Knoten verwendet den zuletzt wiederholten `--max-old-space-size` Wert, daher steuert die Einstellung `OMNIROUTE_MEMORY_MB` das effektive Docker Heap-Limit.
- Da das Image es immer festlegt, gilt der RAM-kalibrierte Fallback des Launchers unter Docker nie. Erhöhen Sie es explizit für die Arbeitslast (Tabelle unten). `2048` ist immer noch zu klein für den Coding-Agent `/v1/responses`.

### Laufzeit RAM für Codierungsagenten

Die Standardgröße von 1 GiB Docker ist eine dashboard/light-chat Untergrenze, keine Produktionsgröße. Lange `POST /v1/responses` Körper (Hunderte Nachrichten, Dutzende Tools) behalten während der Komprimierung mehrere Diagramme im Speicher bei. Zwei überlappende ~ 3 MiB / ~ 750k-Token-Anfragen haben V8 um a abgebrochen** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) und traf auch eine 16 GiB cgroup OOM. Siehe [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Größe** cgroup `--memory` über dem Heap** Die nativen — -Puffer, SQLite und Komprimierungszwischenprodukte befinden sich außerhalb von V8.

| Arbeitsbelastung                         | `OMNIROUTE_MEMORY_MB`   | Container/Gruppe         | Notizen                                                                                                                                   |
| ---------------------------------------- | ----------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard, ein leichter Chat             | `1024` (Bildstandard)   | ≥2 GiB                   |                                                                                                                                           |
| Ein Codierungsagent (Claude/Codex/Grok)  | `8192`                  | ≥10 GiB                  | Typisches Einzelsitzungs- `/v1/responses`                                                                                                 |
| Zwei gleichzeitige lange `/v1/responses` | `10240`–`12288`         | ≥12–16 GiB               | Gemessener V8-Abbruch bei ~ 12 GiB -Heap                                                                                                  |
| Drei gleichzeitige lange + Kontexte      | nicht auf einen Prozess | serialisieren / mehr RAM | Der Standardzugang im Schwergewicht beträgt 1 Person während des Fluges; Wenn Sie es ohne RAM erhöhen, wird der Abbruch erneut eingeführt |

`omniroute serve` auf Bare-Metal kalibriert ~ auf 35 % von RAM (geklemmter `[512, 4096]`), wenn `OMNIROUTE_MEMORY_MB` gleich ist** nicht gesetzt** . Docker setzt immer `1024`, sodass die Kalibrierung nie im offiziellen Image ausgeführt wird.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Kritische Umgebungsvariablen

Über die in [ENVIRONMENT.md](../reference/ENVIRONMENT.md) dokumentierten Standardwerte hinaus sind die folgenden Variablen beim Betrieb unter Docker besonders wichtig:

| Variable                      | Zweck                                                                                                                                                                                                                                                                             | Standard                              |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Gemeinsames Geheimnis für die WebSocket-Bridge. **In der Produktion erforderlich** — auf eine starke zufällige Zeichenfolge setzen.                                                                                                                                               | nicht gesetzt (muss angegeben werden) |
| `REDIS_URL`                   | Verbindungszeichenfolge für das Backend des Rate-Limiters/Caches                                                                                                                                                                                                                  | `redis://redis:6379`                  |
| `REDIS_PORT`                  | Hostseitiger Port für den mitgelieferten Redis-Container                                                                                                                                                                                                                          | `6379`                                |
| `REDIS_BIND_HOST`             | Hostschnittstelle, an der der Port des mitgelieferten Redis-Containers veröffentlicht wird (Loopback, sofern Sie nicht AUTH hinzufügen)                                                                                                                                           | `127.0.0.1`                           |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Hostpfad, der für Self-Update-Workflows im Profil `cli` unter `/workspace/omniroute` eingehängt wird                                                                                                                                                                              | `.` (aktuelles Verzeichnis)           |
| `OMNIROUTE_MEMORY_MB`         | Obergrenze des Node-Heaps zur Laufzeit für den eigenständigen Docker-Server; überschreibt den obigen Standardwert des Images. Coding-Agenten: `8192`+ (siehe [Laufzeit-RAM](#runtime-ram-for-coding-agents)).                                                                     | `1024`                                |
| `DASHBOARD_PORT` / `API_PORT` | Überschreibt die veröffentlichten Ports für Dashboard (20128) und API (20129)                                                                                                                                                                                                     | `20128` / `20129`                     |
| `APP_BIND_HOST`               | Hostschnittstelle, an der docker-compose die Dashboard-/API-/Live-WS-Ports veröffentlicht. Bei `REQUIRE_API_KEY=false` (Standard) macht `0.0.0.0` den anonymen `/v1`-Proxy im LAN zugänglich — nur mit `REQUIRE_API_KEY=true` oder einem vorgeschalteten Reverse-Proxy erweitern. | `127.0.0.1`                           |
| `CLIPROXY_BIND_HOST`          | Hostschnittstelle, an der docker-compose den Sidecar `cliproxyapi` veröffentlicht — sein Daten-Volume enthält die Anmeldedaten des Providers.                                                                                                                                     | `127.0.0.1`                           |
| `OMNIROUTE_PLUGINS_DIR`       | Verzeichnis, das der Laufzeit-Plugin-Scanner liest und in dem er installiert. Festlegen, wenn Plugins per Bind-Mount eingebunden werden: Der Standardwert folgt `HOME`, das ein Image nicht zwingend exportiert.                                                                  | `~/.omniroute/plugins`                |
| `OMNIROUTE_BASE_PATH`         | URL-Unterpfad, wenn die App hinter einem Reverse-Proxy veröffentlicht wird (z. B. `/omniroute`)                                                                                                                                                                                   | _(leer = Stammverzeichnis)_           |
| `NEXT_PUBLIC_BASE_URL`        | Öffentlicher Browser-Ursprung einschließlich des Unterpfads (z. B. `https://host/omniroute`)                                                                                                                                                                                      | nicht gesetzt                         |
| `PROD_DASHBOARD_PORT`         | Hostseitiger Dashboard-Port für `docker-compose.prod.yml`                                                                                                                                                                                                                         | `20130`                               |
| `CLIPROXYAPI_PORT`            | Hostseitiger Port für den Sidecar `cliproxyapi`                                                                                                                                                                                                                                   | `8317`                                |

## Reverse Proxy auf einem Unterpfad (Traefik / Nginx)

Next.js `basePath` wird in das eigenständige Bundle kompiliert. OmniRoute zeichnet den gebackenen Wert in einer Sentinel-Datei im App-Stammverzeichnis auf (geschrieben während `npm run build`; gelesen von `scripts/docker/ensure-docker-base-path.mjs`) und vergleicht ihn mit `OMNIROUTE_BASE_PATH` wenn der Container startet. Wenn sie sich unterscheiden und das Image für den Domänenstamm erstellt wurde, schreibt der Einstiegspunkt die eigenständigen Manifeste, die eingebetteten `basePath`/`assetPrefix` -Literale (die nächsten 16 rendern SSR Asset URLs nur aus `assetPrefix` — der Patcher spiegelt den Unterpfad darin), das gebackene `/_next/static` Asset URLs (Client-Referenzmanifeste, Medienimporte, vorgerenderte Fehlerseiten) und den Client `process.env` Shim neu, bevor `node dev/run-standalone.mjs` ausgeführt wird.

### Build erstellen (empfohlen)

Legen Sie beide Variablen in `.env` fest und erstellen Sie dann neu, sodass Image und Laufzeit übereinstimmen:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` leitet `OMNIROUTE_BASE_PATH` als Docker -Build-Argument und als Laufzeitumgebungsvariable weiter.

### Vorgefertigter Root-Image- + -Laufzeit-Unterpfad

Veröffentlichte `cheaperinference/omniroute:*` Images werden für den Domänenstamm erstellt. Sie können `OMNIROUTE_BASE_PATH` weiterhin zur Laufzeit festlegen. Der Container patcht das Bundle einmal beim Start. Koppeln Sie es mit dem passenden öffentlichen Ursprung:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurieren Sie den Reverse-Proxy für die Weiterleitung** voll** Externer Pfad (Präfix nicht entfernen). Traefik sollte `PathPrefix(`/omniroute `)` ohne `StripPrefix` an den Container weiterleiten, sodass Next.js `/omniroute/...` empfängt und Assets von `/omniroute/_next/...` bereitstellt.

Der Docker Healthcheck prüft den Lightweight- `/healthz` Lebenszyklusendpunkt, dem das aktive `OMNIROUTE_BASE_PATH` vorangestellt ist. `/api/monitoring/health` bleibt für human/dashboard -Diagnose verfügbar; Um den Container HEALTHCHECK wieder darauf zu verweisen (z. B. für eine umfassende Gesundheitsdurchsetzung), legen Sie `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` fest. Dieser Weg ist ein** tief** Überprüfen Sie (DB + Überwachungszusammenfassung) — geeignet für Docker's seltenes `HEALTHCHECK` wenn Sie sich wieder anmelden, aber** nicht** für Kubernetes `livenessProbe` Intervalle.

Für Orchestratoren (Kubernetes, Nomad usw.):

| Sonde           | Bevorzugen                                                         | Vermeiden                                                                            |
| --------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Lebendigkeit    | HTTP `GET /livez` oder TCP am Hauptport (`PORT`, Standard `20128`) | `/api/monitoring/health` als Lebendigkeit                                            |
| Bereitschaft    | HTTP `GET /healthz`                                                | Enge Zeitüberschreitungen, die die Auslastung der Ereignisschleife als tot behandeln |
| Tief / Blackbox | `/api/monitoring/health`                                           | —                                                                                    |

`/healthz` meldet den Prozesslebenszyklus (`ok` / `starting` / `stopping`). `/livez` ist nur prozessaktiv (200, wann immer der Handler ausgeführt werden kann; es wartet nicht auf Bereitschaft). Beide laufen immer noch in derselben Node ≠ Ereignisschleife wie die Anforderungsverarbeitung, sodass CPU-gebundene Katalog- oder Komprimierungsarbeiten sie — können. Bevorzugen Sie TCP Liveness, wenn bei HTTP Probes eine Zeitüberschreitung auftritt. Vollständige Probe-Anleitung: [Überwachungsleitfaden — Kubernetes-Probe-Empfehlungen](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose mit Caddy (HTTPS Auto-TLS)

OmniRoute kann mithilfe der automatischen SSL Bereitstellung von Caddy sicher verfügbar gemacht werden. Stellen Sie sicher, DNS A-Eintrag Ihrer Domain auf IP Ihres Servers verweist.

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

Caddy legt die Standard-Weiterleitungsheader für den Upstream-Container fest. OmniRoute verwendet `NEXT_PUBLIC_BASE_URL` als kanonischen öffentlichen Ursprung für OAuth -Rückrufe und generierte öffentliche Links; Authentifizierte Dashboard-Schreibvorgänge verwenden Anfragen gleichen Ursprungs plus sitzungsgebundenen CSRF Schutz. Aktivieren Sie `OMNIROUTE_TRUST_PROXY` nur für erweiterte Bereitstellungen, bei denen Sie möchten, dass OmniRoute den öffentlichen Ursprung absichtlich aus vertrauenswürdigen weitergeleiteten Headern und nicht aus einer expliziten Konfiguration ableitet.

## Cloudflare Quick Tunnel

Die Dashboard-Unterstützung für Docker-Bereitstellungen umfasst unter `Dashboard → Endpoints` einen **Cloudflare Quick Tunnel** mit nur einem Klick. Bei der ersten Aktivierung wird `cloudflared` nur bei Bedarf heruntergeladen, ein temporärer Tunnel zu Ihrem aktuellen `/v1`-Endpunkt gestartet und die generierte URL `https://*.trycloudflare.com/v1` direkt unter Ihrer normalen öffentlichen URL angezeigt.

Endpunkt-Tunnelbereiche (Cloudflare, Tailscale, ngrok) können unter `Settings → Appearance` ein- oder ausgeblendet werden, ohne den aktiven Tunnelstatus zu ändern.

### Hinweise zu Tunneln

- Quick-Tunnel-URLs sind temporär und ändern sich nach jedem Neustart.
- Quick Tunnels werden nach einem Neustart von OmniRoute oder des Containers nicht automatisch wiederhergestellt. Aktivieren Sie sie bei Bedarf erneut über das Dashboard.
- Die verwaltete Installation unterstützt derzeit Linux, macOS und Windows auf `x64` / `arm64`.
- Verwaltete Quick Tunnels verwenden standardmäßig HTTP/2 als Transportprotokoll, um störende QUIC-UDP-Pufferwarnungen in eingeschränkten Containerumgebungen zu vermeiden. Setzen Sie `CLOUDFLARED_PROTOCOL=quic` oder `auto`, wenn Sie ein anderes Transportprotokoll verwenden möchten.
- Docker-Images enthalten die CA-Stammzertifikate des Systems und übergeben sie an das verwaltete `cloudflared`. Dadurch werden TLS-Vertrauensfehler vermieden, wenn der Tunnel innerhalb des Containers initialisiert wird.
- Setzen Sie `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, wenn OmniRoute eine vorhandene Binärdatei verwenden soll, anstatt eine herunterzuladen.

## Bild-Tags

| Bild                         | Etikett  | Größe    | Beschreibung                                                  |
| ---------------------------- | -------- | -------- | ------------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250 MB | Höchste** veröffentlicht** stabiles SemVer (nicht git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250 MB | Pinne diese Tag-Klasse für GitOps                             |

Dieselben Bilder werden in drei Repositories mit denselben Digests pro Architektur veröffentlicht: `cheaperinference/omniroute` (Docker Hub, die Cheaper Inference-Organisation, ab 3.8.53), `ghcr.io/cheaper-inference/omniroute` und das alte `diegosouzapw/omniroute`, das seinen Pull-Verlauf beibehält und dennoch jede Veröffentlichung erhält. Vorhandene `diegosouzapw/omniroute` -Bereitstellungen werden ständig aktualisiert; Das Ändern des Bildnamens ist optional. Der unten aufgeführte Vorabversionskanal `:next` / `:next-web` wird nur für `diegosouzapw/omniroute` und GHCR veröffentlicht.

Multiplattform-Manifest: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). Docker wählt automatisch die passende Architektur aus; Übergeben Sie `--platform linux/amd64` wenn Sie AMD64 Emulation auf ARM -Hosts erzwingen müssen.

### Release-Kanäle

OmniRoute veröffentlicht separate Docker Kanäle für stabile Releases, aktive Release-Branch-Tests und Entwicklungs-Builds.

| Kanal                           | Quelle                                    | Wandlungsfähigkeit                | Empfohlene Verwendung                                                                                                                                      |
| ------------------------------- | ----------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned -Veröffentlichung        | Unveränderlich                    | Produktionsbereitstellungen, die eine genaue Version festlegen                                                                                             |
| `:latest` / `:latest-web`       | Höchste** veröffentlicht** stabile SemVer | Veränderbarer stabiler Zeiger     | Folgt stabilen Versionen** nach** Ein SemVer -Veröffentlichungsjob, — ausführt** nicht** Verfolgen Sie `main` oder unveröffentlichte `release/v*` -Commits |
| `:next` / `:next-web`           | Aktueller Standard- `release/v*` Zweig    | Veränderbarer Vorabversionszeiger | Testen von Fixes, die im aktiven Release-Zweig gelandet sind, sich aber noch nicht in einem stabilen Release befinden                                      |
| `:main` / `:main-web`           | `main` -Filiale                           | Veränderbarer Entwicklungszeiger  | Nur Entwicklungs- und Integrationstests                                                                                                                    |

#### Anbieter von Websitzungen: die `-web` Bilder

Jeder oben genannte Kanal fungiert gleichzeitig als `-web` Tag (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), der aus der `runner-web` Stufe — das gleiche Bild plus Playwright und einen Chromium-Browser erstellt. Das einfache Bild wird versendet** ohne** Chrom; `gemini-web`, `claude-web` und `claude-turnstile` brauchen es.

Der Fehler wird verzögert und nicht zum Startzeitpunkt: Diese Anbieter listen ihre Modelle auf und zeigen sie im Dashboard als verbunden an, und nur die erste Anfrage schlägt fehl

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Wenn Sie diese Anbieter nutzen, ziehen Sie den `-web` -Tag des Kanals, auf dem Sie sich bereits befinden — ändert nichts anderes. Bei einer npm/CLI -Installation (kein Docker Image) fehlt als entsprechendes Teil die Browser-Binärdatei: Führen Sie `npx playwright install chromium` auf dem Host aus.

#### Nutzung des Vorabversionskanals

Der `next` Kanal wird bei jedem Push zum aktuellen Standard `release/v*` Zweig neu erstellt und sowohl für AMD64 als auch ARM64 veröffentlicht. Ältere Wartungszweige können es nicht überschreiben. Der Kanal stellt ein Pull-Image für Fixes bereit, die in den aktiven Release-Zweig integriert wurden, bevor das nächste Stable-Tag entfernt wird.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Überschreiben Sie für Docker Compose das vom ausgewählten Profil verwendete Bild-Tag, ziehen Sie dann den Dienst ab und erstellen Sie ihn neu:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sicherheit und Rollback

`next` ist ein schwebender Vorabversionskanal. Es kann sich bei jedem Push zum aktiven Release-Zweig ändern und ist es auch** wird für den Produktionseinsatz nicht unterstützt** . Pingen Sie den Image-Digest an, während Sie einen bestimmten Build evaluieren:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sichern Sie vor dem Testen das OmniRoute Datenvolumen oder das angebundene Datenverzeichnis. Um ein Rollback durchzuführen, stellen Sie die zuvor verwendete stabile Version wieder her oder digest und erstellen Sie den Container neu:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Ein Release-Branch-Build kann niemals `latest` verschieben; Nur eine geeignete stabile semantische Version darf den stabilen Zeiger hochstufen. Die `next` Images behalten die Release-Image-Inspektion und das Blocking-CRITICAL-Vulnerability-Gate bei.

**`latest` ist keine Währungsgarantie für Git.** Zusammengeführte Fixes auf `main` oder im aktiven `release/v*` Zweig sind** nicht** in `:latest`, bis ein stabiles SemVer Image veröffentlicht wird und der Veröffentlichungsjob `:latest` fördert (gleicher Digest wie SemVer). Wenn `latest` eingefroren aussieht, während GitHub den Fix bereits anzeigt, ziehen Sie `:next`, um den Release-Zweig zu testen, oder warten Sie auf das SemVer -Tag.

| Du willst                                                                                                 | Verwenden                          |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| GitOps / Produktion, die nicht driften darf                                                               | Pin `:X.Y.Z` (oder der Bildauszug) |
| Folgen Sie den veröffentlichten Stables und akzeptieren Sie bei jeder Veröffentlichung eine Neuerstellung | `:latest`                          |
| Testen Sie unveröffentlichte `release/v*` -Commits                                                        | `:next` (nicht Produktion)         |
| Testen Sie `main`                                                                                         | `:main` (nicht Produktion)         |

## Dashboard-Updates in Docker

Ein Container aus einem veröffentlichten Image kann sich nicht selbst ersetzen. Wenn OmniRoute erkennt, dass es innerhalb eines Containers ausgeführt wird (kein `.git`-Checkout, keine npm-Installation), zeigt das Update-Banner des Start-Dashboards anstelle der npm-/git-Anweisungen den auszuführenden Host-Befehl mit einer Kopierschaltfläche an:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Der Dienstname stammt aus `AUTO_UPDATE_SERVICE` (Standardwert `omniroute`, der Dienst in `docker-compose.selfhost.yml`). `pull` aktualisiert nur ein gleitendes Tag (`latest`, `next`); bei einem festgelegten `:X.Y.Z`-Tag muss zuerst das Tag geändert werden.

### Ein-Klick-Updates mit einer Host-Triggerdatei

Damit **Jetzt aktualisieren** weiterhin funktioniert, ohne `/var/run/docker.sock` einzubinden (wodurch der Container Root-Zugriff auf dem Host erhält — siehe die Warnung zum `cli`-Profil oben), setzen Sie `DOCKER_UPDATE_TRIGGER_FILE` für den OmniRoute-Dienst und führen Sie einen Watcher auf dem Host aus:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Der Pfad muss sich innerhalb von `DATA_DIR` befinden (relative Werte werden relativ dazu aufgelöst); alle anderen Pfade werden abgelehnt. **Jetzt aktualisieren** schreibt dann `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` in diese Datei, antwortet mit `202`, und das Dashboard fragt `/api/system/version` ab, bis die neue Version aktiv ist, und lädt anschließend neu. OmniRoute führt in diesem Modus niemals einen Shell- oder Docker-Befehl aus. Wie bei jeder Update-Aktion wird die Anfrage nur von Loopback-/LAN-Clients akzeptiert.

Ein per Bind-Mount eingebundenes Datenverzeichnis stellt dem Host einen stabilen zu überwachenden Pfad bereit. Beispielhafte `systemd`-Units (passen Sie `/srv/omniroute` an das Verzeichnis an, das Ihre Compose-Datei und `data/` enthält):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Auf Update-Anfragen des OmniRoute-Dashboards warten

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=OmniRoute-Container abrufen und neu erstellen

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

Der Dienst entfernt die Anfrage vor dem Abruf, damit ein fehlgeschlagener Durchlauf keine Schleife verursacht. Ohne `DOCKER_UPDATE_TRIGGER_FILE` behält das Dashboard den Ablauf mit dem manuellen Befehl bei.

## Verfügbarkeit: Standardmäßig ist SQLite ein Einzelreplikat

Lagerbestand Docker / Kubernetes OmniRoute ist** ein Knotenprozess + ein SQLite Writer** . Hohe Verfügbarkeit ist** nicht unterstützt** auf dieser Topologie.

| Zwang                                          | Folge                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Einzelautor                                    | Tun** nicht** Führen Sie mehrere Replikate für dieselbe SQLite Datei aus. Das beschädigt die DB.                                                                                                                                                                                                                                                     |
| Neu erstellen / neu starten / HEALTHCHECK Kill | **Vollständiger Ausfall** von In-Flight- SSE, Dashboard-Sitzungen und In-Memory-Status. Jeder verbundene Client bricht ab. Neue Anfragen während des Fensters „leerer Endpunkt“ erhalten einen Reverse-Proxy**`502 Bad Gateway: Unknown error`** , nicht OmniRoute JSON – Clients können dies nicht von einem Anbieterfehler unterscheiden (#11015). |
| Gleiche Ereignisschleife wie `/healthz`        | Ein ausgelasteter Katalog oder ein Komprimierungs-Tick können Prüfungen verzögern. Nach einer kurzen Zeitüberschreitung wird dann neu gestartet** nur** Replik.                                                                                                                                                                                      |

**Sondenmatrix** (siehe auch [Kubernetes-Probe-Empfehlungen](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sonde           | Ziel                                                        | Nicht verwenden                                                                      |
| --------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Lebendigkeit    | TCP auf `PORT` (Standard `20128`) oder Soft HTTP `/healthz` | `/api/monitoring/health`                                                             |
| Bereitschaft    | HTTP `GET /healthz`                                         | Enge Zeitüberschreitungen, die die Auslastung der Ereignisschleife als tot behandeln |
| Tief / Menschen | `/api/monitoring/health`                                    | Automatisierte Kubelet-Lebendigkeit                                                  |

**Upgrades:** Erwarten Sie, dass jede Sitzung unterbrochen wird. Entleeren Sie Kunden, wenn Sie können; Es gibt kein rollierendes Update für die Standard SQLite. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` ersetzt auch den einzigen Prozess, wenn der Container fehlerhaft ist – gleicher Explosionsradius.

Vorgefertigte Manifeste und ein Helm-Diagramm live in `deploy/kubernetes/` und `deploy/helm/omniroute/` – siehe [Kubernetes-Bereitstellungshandbuch](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes-Snippet für a** einzelne Replik** (Neu erstellen ist erforderlich; `replicas` nicht für eine SQLite Datei erhöhen):

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

`preStop` Sleep kann Kube Service-Endpunkte vor SIGTERM löschen** neu** Der Verkehr hört auf, den sterbenden Prozess zu treffen. Während des Fluges wird `/v1/responses` SSE über Schwergewichtszulassungsverträge (#11015) auf `SHUTDOWN_TIMEOUT_MS` (Standard 30s) entleert. Neue Anfragen, die den Prozess noch erreichen, erhalten `503` + `Retry-After: 5`. Die Lücke „Leeren Endpunkt neu erstellen, bis der Ersatz bereit ist“ bleibt ein schwerer Ausfall – das ist die SQLite -Topologie und keine Probe-Fehlkonfiguration.

Externes Postgres / Multi-Writer HA ist** nicht** ein dokumentierter Lagerweg. Wenn Sie HA benötigen, behalten Sie ein einzelnes Replikat bei oder führen Sie eine Topologie aus, die das Projekt separat getestet und dokumentiert hat. Das Postgres/MySQL Werk befindet sich in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Bis dahin ist die einzige unterstützte Möglichkeit zur Vermehrung** groß** `/v1/responses` Kapazität beträgt N unabhängige Prozesse (nächster Abschnitt), nicht `replicas > 1` auf einem Volume.

## Scale-out: N unabhängige Prozesse

### Codex Token-Rotationsbesitz

Kopien eines Codex Kontos dürfen dessen Einmal-Aktualisierungstoken nicht unabhängig voneinander verbrauchen. Legen Sie auf Instanzen, die nur synchronisierte Anmeldeinformationen verwenden, `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (Alias `cx`) fest. Lassen Sie es für den Einzelrotationseigentümer deaktiviert. Jeder Prozess benötigt weiterhin seinen eigenen `DATA_DIR`; Diese Option teilt weder SQLite noch stellt sie eine Token-Synchronisierung oder eine verteilte Sperre bereit.

Die passive Instanz liest die Verbindung erneut, wenn eine Aktualisierung erforderlich ist, und übernimmt nur ein anderes, nicht abgelaufenes Zugriffstoken. Andernfalls wird die Aktualisierung deaktiviert, ohne dass die Verbindung abläuft oder deaktiviert wird oder ein Aktualisierungsunterbrechungsfehler gezählt wird. Echte Upstream-Authentifizierungsfehler nutzen immer noch die normale Fehlerabrechnung, die exponentielle Abklingzeit und den normalen Client-Fehler; Die Kontodeaktivierung bleibt dauerhaft. Synchronisieren Sie die rotierten Token des Eigentümers, bevor die Zugriffstoken ablaufen (der standardmäßige proaktive Aktualisierungsvorlauf beträgt fünf Minuten), oder importieren Sie die Codex Authentifizierungsdatei erneut. Passive Importe speichern die bereitgestellten Token, ohne sie am Token-Endpunkt zu validieren. Manuelle dashboard/API -Aktualisierung gibt `409 refresh_disabled` zurück; Neue OAuth Anmeldungen bleiben unverändert. Siehe [Umgebungsreferenz](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Ein Knotenprozess ist** ein V8-Haufen** . Zwei überlappende ~ 3 MiB / ~ 750k-Token Coding-Agent `POST /v1/responses` (RTK + Caveman) brechen diesen Heap bei ~ 12 Gi (`FATAL ERROR: Reached heap limit`) ab und können eine 16 Gi cgroup OOM. Siehe [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Diese Messung ist ein** Speicherbudget** Achtung, kein Hard-Max-Produkt von zwei gleichzeitigen langen `/v1/responses`. Der Schwergewichts-Chat-Zugang wird durch ein automatisch abgeleitetes Ingest-Byte-Budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) eingeschränkt, dessen Größe von der gleichen V8/cgroup Obergrenze abhängt. Wenn — es nach oben überschreibt (oder die alte `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` Anforderungsanzahl-Obergrenze festlegt), führt dies bei einem bereits dimensionierten Prozess den Abbruch erneut ein. Kleine Chats, `/healthz`, `/v1/models` und MCP sind** nicht** in dieser Kappe.

### Ein Prozess: mehr als zwei lange `/v1/responses`

A** gesund** Prozess (Heap unter `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, Standard `0.75`)** Mai** Führen Sie mehr als zwei lange `POST /v1/responses` gleichzeitig aus, wenn das prozessweite Inflight-Byte-Budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) noch Platz bietet. Körper mit oder über `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (Standard 256 KiB) nehmen die gleiche Schwergewichts-Lease wie strukturintensive Anfragen an und verwenden dasselbe [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` Escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dutzende gleichzeitiger langer SSE Clients (Betreiber benötigen oft 40–50) ist ein** Speicherbudget** Frage — Größe Heap + primary/headroom Slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — kein hartes Produktlimit „maximal 2“. Ein unter Druck stehender Heap bricht immer noch mit wiederholbarem `503` ab, sodass #7849 nicht zurückkehrt.

Zu** Haufen vervielfachen** (unabhängige V8 Old-Spaces)** Heute** :

| Tun                                                                                                                                                             | Nicht                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Laufen** N containers/pods** , jeder mit seinem** eigen** `DATA_DIR` / Lautstärke                                                                               | Legen Sie `replicas > 1` für eine SQLite Datei fest                 |
| Größe schweres In-Flight- + -Gesundheitsspielraum aus Heap/Inflight-Byte-Budget; 1–2 ist die konservative Standardeinstellung #7849, kein hartes Produktmaximum | Geben Sie einem Prozess 8 × RAM und eine unbegrenzte Anzahlanzahl   |
| Optional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` für** gemeinsam genutzte Kontingentzähler**                                                      | Behandeln Sie Redis als gemeinsam genutztes SQLite — ist dies nicht |
| Provider-Geheimnisse in jeder Instanz duplizieren (oder partitionierte Dashboards akzeptieren)                                                                  | Erwarten Sie ein Dashboard/ein Anrufprotokoll für alle Instanzen    |
| Vorne mit beliebigem Load Balancer; Sticky by API Key oder Session reicht aus                                                                                   | Erfordern eine herstellerspezifische, größenbewusste Middleware     |

Die Affinität zwischen Sitzung und Konto kann auch über Redis geteilt werden: Legen Sie `OMNIROUTE_SESSION_AFFINITY_STORE=redis` und `REDIS_URL` für jeden Prozess fest, mit demselben `REDIS_KEY_PREFIX` und einer positiven `sessionAffinityTtlMs` Einstellung. Pins lösen gehashte Nutzungskontoidentitäten in die berechtigten lokalen Verbindungen jedes Prozesses auf, sodass OAuth Konten mit übereinstimmenden Identitätsmetadaten keine übereinstimmende Verbindung IDs haben müssen. Bekannte Kontoidentitäten haben bei der PIN-Auflösung und der geschützten Entfernung Vorrang vor widersprüchlichen lokalen IDs. Datensätze ohne Identität (oder Räumungsaufrufer ohne Identität) behalten den alten ID Schutz. Konten ohne stabile Nutzungsidentität erfordern weiterhin den Abgleich von IDs. Redis Fehler oder Aufrufe, die 100 ms überschreiten, fallen auf lokales SQLite zurück. Jeder Redis -Affinitätsspeicher begrenzt ausstehende Vorgänge auf 8, umgeht Redis sofort, wenn er voll ist, und gibt Slots nur frei, wenn die zugrunde liegende Arbeit erledigt ist, nicht zum Zeitpunkt des Anrufers. Während eines Redis -Ausfalls gibt es keine gemeinsame Wahrheit: Jede Instanz greift auf ihre eigene lokale Affinität zurück, Sitzungen können einmal pro Instanz neu angeheftet werden und Instanzen können voneinander abweichen. Die Klebrigkeit konvergiert durch Redis wieder, wenn sie sich erholt. Die Zeitüberschreitung begrenzt das Warten, nicht ein gesendetes EVAL, das nach einem Fallback landen kann. Routing-Schreibvorgänge vergleichen den genauen Wert, der durch die Routing-Entscheidung beobachtet wurde, nicht einen neuen Lesevorgang zur Mutationszeit. Ein beobachteter Fehlschlag oder eine SQLite Fallback-Beobachtung wird als fehlender Redis Schlüssel verglichen. Veraltete Pins werden in einem CAS ersetzt, sodass ein späterer Befehl keinen neueren, anderen Pin ersetzen oder löschen kann. Redis liest atomar und gibt den Wert und den verbleibenden Server zurück TTL; positives PTTL (oder kein Ablauf) bestimmt die Lebendigkeit, nicht der JSON Zeitstempel des Autors oder die Uhr des Lesers. Lokale Snapshots ordnen den verbleibenden TTL einem lokalen Termin zu; Vorhandene JSON Schlüssel bleiben lesbar und ihre Rohbytes bleiben für CAS erhalten. Redis ist die einzige Quelle der Wahrheit, während es antwortet. Bestätigte freigegebene Upserts, Berührungen und Löschungen entfernen den lokalen Eintrag, installieren oder aktualisieren ihn niemals. SQLite auf dem Redis Pfad enthält nur die eigenen Fallback-Entscheidungen dieser Instanz aufgrund von Redis Fehlern, Zeitüberschreitungen oder Zulassungssättigung, TTL-begrenzt wie zuvor. Ein fehlender lokaler Pin bei einem späteren Ausfall kostet einen neuen Pick (einen Prompt-Cache-Fehler), kein falsches oder gelöschtes Konto. Abgelehnte Upserts geben den gemeinsamen Gewinner und seinen verbleibenden TTL atomar zurück: Bei der normalen Auswahl wird die zugeordnete lokale Frist erneut überprüft und ein noch aktiver berechtigter Gewinner verwendet, wobei die Nutzung und Protokollierung für dieses Konto ohne einen weiteren gemeinsamen Schreibvorgang berührt wird. Wenn er nicht verfügbar ist, behält die Auswahl den lokalen Kandidaten bei, lässt die gemeinsame PIN unverändert und gibt eine Debug-Meldung aus. Abgelehnt CAS schreibt SQLite nicht; Redis Fehler, Timeouts oder Zulassungssättigung wenden stattdessen den vorhandenen lokalen Vorgang an. Wenn die Antwort einer gesendeten Mutation nach einer Zeitüberschreitung eintrifft (akzeptiert, abgelehnt oder Fehler), wird durch einen synchronen Vergleich und Löschvorgang mit genau serialisierten Werten nur die byteidentische Zeitüberschreitungs-Fallbackzeile entfernt. Zwischen diesem Vergleich und der Löschung gibt es keine Wartezeit; Ein neuerer Ausfallschreibvorgang bleibt erhalten. Die geschützte Eviction entfernt die eigene lokale PIN des ausgefallenen Kontos, auch wenn Redis deaktiviert ist, und bereinigt sie erneut, nachdem die gemeinsame Eviction bestätigt wurde. Ausstehende frühere geteilte Antworten können einen entfernten lokalen Pin nicht wiederherstellen, da geteilte Erfolge niemals SQLite schreiben. Bei einem späteren Ausfall kann ein Konto erneut gepinnt werden; ein später akzeptierter Shared Write existiert nur in Redis. Redis Fehler konsultieren den lokalen Fallback-Status nicht. Bei ausgeschaltetem Treiber behalten neu ausgewählte Pins die alte Vierfeldform SQLite JSON bei; Nur das Redis Routing fügt die gehashte Kontoidentität hinzu. Vorab abgerufene Pins werden an ihrer Ablaufgrenze erneut überprüft. Redis -Nicht-Lease-Auswahl liest den Speicher erneut, aber die synchrone Lease-Planung kann immer noch einen Pin verwenden, der zwischen Prefetch und Planung entfernt wird (ein akzeptiertes Best-Effort-Fenster). Ein Lease-Commit kann nach einem dauerhaften Anspruch nicht das Konto wechseln: Bei einem abgelehnten Upsert behält es nur den beanspruchten Kandidaten für diese Anfrage und lässt den gemeinsamen Gewinner unberührt, sodass die Vereinbarung zwischen Instanzen auf diesen Pfad beschränkt ist. Der Rest der Tabelle gilt weiterhin: Hier werden weder Combo-Session-Stickiness noch native Codex Turn-Pins, Konto-Semaphoren, Sperrungen, Ausgabenlimits, Konfiguration oder Anrufprotokolle geteilt.

Hardware: Gleichzeitiges langes `/v1/responses` pro Instanz ist ein** Speicherbudget** Frage (Heap + Inflight-Byte / #10110). `N` unabhängige `DATA_DIR` s vervielfachen immer noch Heaps: Host RAM muss `N × cgroup` abdecken, nicht „ein 16-Gi-Pod mit N = 8“. Niemals `replicas > 1` für eine SQLite Datei.

Skizze erstellen (zwei Heaps, zwei Bände — nicht `deploy.replicas: 2`):

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

Die Dichte im Prozess (Komprimierung des HTTP Isolats) beträgt [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Ein logischer Cluster im gemeinsam genutzten dauerhaften Zustand ist [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionale Gemini-Fehler innerhalb von Docker

Google AI Studio / Gemini API kann HTTP 400 mit FAILED_PRECONDITION und
`User location is not supported for the API use.` zurückgeben. Eine erfolgreiche Anfrage auf dem Host
beweist nicht, dass der Container dieselbe ausgehende Route verwendet. DNS-Reihenfolge,
IPv4-/IPv6-Konnektivität, VPN-Routing und konfigurierte Proxys können sich unterscheiden. Prüfen Sie
[Googles unterstützte Regionen](https://ai.google.dev/gemini-api/docs/available-regions)
sowie die tatsächliche Verbindungsroute; dieser Fehler allein weist nicht auf einen ungültigen API-Schlüssel hin.

### Verbindungsspezifischen Proxy bevorzugen

Verwenden Sie die [Proxy-Konfiguration pro Verbindung](../ops/PROXY_GUIDE.md#4-level-proxy-system)
von OmniRoute für die betroffene Gemini-Verbindung und wiederholen Sie anschließend **Verbindung testen** sowie eine kleine Anfrage
mit demselben Modell. Dadurch bleibt die Routing-Änderung auf diese Verbindung beschränkt. Stellen Sie sicher,
dass der Proxy vom Container aus erreichbar ist und dass die Verbindung ihn tatsächlich auswählt.
Eine Änderung der Route garantiert nicht, dass die regionalen Voraussetzungen des Upstream-Dienstes erfüllt sind.

### Netzwerk des Hosts und Containers vergleichen

Verwenden Sie beim Vergleich authentifizierter Ergebnisse denselben Schlüssel, dasselbe Modell und dieselbe Anfrage; fügen Sie niemals
Anmeldedaten, Proxy-Passwörter oder vollständige Autorisierungsheader in ein Issue ein.
Prüfen Sie zunächst, welche Adressfamilien der Resolver des Betriebssystems bereitstellt, und verwenden Sie dazu denselben Befehl
auf dem Host und innerhalb des Containers:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Ersetzen Sie `omniroute` durch den von Ihnen ausgeführten Dienst (zum Beispiel `omniroute-web`). Diese
Befehle geben Adressfamilien ohne Anmeldedaten oder IP-Adressen aus. Eine zurückgegebene `6`
zeigt lediglich ein IPv6-DNS-Ergebnis an: Sie beweist **weder** eine nutzbare IPv6-Route noch den API-Zugriff.
Wenn `curl` installiert ist, vergleichen Sie `curl -4 -I https://generativelanguage.googleapis.com`
mit `curl -6 -I https://generativelanguage.googleapis.com` in beiden Umgebungen.
Eine HTTP-Antwort belegt die Konnektivität für diesen Test, auch wenn es sich um einen nicht authentifizierten
Fehler handelt; nur die authentifizierte Modellanfrage prüft die Gemini-Berechtigung.

### Alternative auf Host-Ebene: funktionierendes IPv6 und Resolver-Richtlinie

Der Melder von [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) stellte
den Zugriff in seiner Umgebung wieder her, indem er IPv6 für Container aktivierte und die glibc-Adressauswahl
änderte. Betrachten Sie dies als umgebungsspezifische Alternative. Vergewissern Sie sich, dass
IPv6 auf dem Host, der ausgehende Datenverkehr bzw. das Routing des Containers und die Firewall-Regeln funktionieren, bevor Sie die Resolver-Einstellungen anpassen.
Eine private ULA-Adresse allein stellt keine öffentliche IPv6-Konnektivität her.

Für Dienste, die bereits mit dem Standardnetzwerk von Compose verbunden sind, aktiviert dieses Fragment
IPv6 in diesem Netzwerk; behalten Sie die übrigen Dienst-, Port-, Volume- und Konfigurationseinstellungen bei:

```yaml
networks:
  default:
    enable_ipv6: true
```

Aktivieren Sie IPv6 bei einem benannten Netzwerk in dem Netzwerk, mit dem der Dienst tatsächlich verbunden ist. Docker kann
ein ULA-Subnetz zuweisen; wählen Sie nur dann ein explizites, nicht überlappendes Subnetz aus, wenn Ihr Netzwerk
dies erfordert. Siehe [IPv6-Netzwerke in Docker](https://docs.docker.com/engine/daemon/ipv6/)
und [Compose-Netzwerkoptionen](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Bei einem **glibc-basierten Image** kann `/etc/gai.conf` die Adressauswahl ändern. Das aktuelle
Dockerfile des Repositorys verwendet Debian; benutzerdefinierte musl-basierte Images nutzen diesen Mechanismus nicht.
Die gemeldete Anpassung ändert das ULA-Label von `label fc00::/7 6` in
`label fc00::/7 1`. Gehen Sie von der vollständigen Richtlinientabelle des Images aus und behalten Sie deren übrige
Einträge bei: Das Hinzufügen eines `label`- oder `precedence`-Eintrags ersetzt diese Standardtabelle, sodass eine Datei,
die nur die geänderte Zeile enthält, nicht ausreicht. Die
[glibc-Konfigurationsreferenz](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumentiert diese Semantik. Binden Sie die geprüfte Datei schreibgeschützt unter `/etc/gai.conf` ein
und erstellen Sie den Dienst neu, um sie anzuwenden.

Dadurch ändert sich die Adressauswahl des Betriebssystems für **den gesamten ausgehenden Datenverkehr in diesem Container**.
Es zwingt nicht jede Anwendung dazu, IPv6 auszuwählen: Auch die DNS-Reihenfolge und
Verbindungsauswahl von Node sind relevant. Insbesondere bevorzugt `--dns-result-order=ipv4first` IPv4 und
ist keine Lösung für einen reinen IPv4-Fehler. Siehe [DNS-Reihenfolge in Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Testen Sie Gemini und Ihre anderen Anbieter nach jeder Änderung auf Host-Ebene erneut. Um die Änderung rückgängig zu machen,
entfernen Sie den benutzerdefinierten `gai.conf`-Mount, stellen Sie die vorherige Netzwerkkonfiguration wieder her und
erstellen Sie den betroffenen Dienst bzw. das betroffene Netzwerk während eines Wartungsfensters neu. Das Neuerstellen eines Netzwerks
kann andere damit verbundene Container unterbrechen; löschen Sie nicht das persistente Daten-Volume.

## Wichtige Hinweise

- **SQLite-WAL-Modus:** `docker stop` sollte vollständig ausgeführt werden, damit OmniRoute die neuesten Änderungen per Checkpoint in `storage.sqlite` zurückschreiben kann. Die mitgelieferten Compose-Dateien legen bereits eine Karenzzeit von 40 Sekunden für das Stoppen fest. Wenn Sie das Image direkt ausführen, behalten Sie `--stop-timeout 40` bei.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Setzen Sie die Variable auf `true`, wenn routinemäßige bzw. vor Schreibvorgängen erstellte Backups extern verwaltet werden. Migrationen bestehender Datenbanken erfordern weiterhin einen eigenen dauerhaften Sicherheits-Snapshot und einen Schutzmechanismus für Massenmigrationen.
- **Datenpersistenz:** Binden Sie immer ein Volume unter `/app/data` ein, damit Ihre Datenbank, Schlüssel und Konfigurationen auch nach Container-Neustarts erhalten bleiben.
- **Portkonfiguration:** Überschreiben Sie die Umgebungsvariable `PORT`, um den Standardport `20128` zu ändern.

## Siehe auch

- [Anleitung zur VM-Bereitstellung](../ops/VM_DEPLOYMENT_GUIDE.md) — Einrichtung mit VM + nginx + Cloudflare
- [Anleitung zur Bereitstellung auf Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Bereitstellung auf Fly.io
- [Umgebungskonfiguration](../reference/ENVIRONMENT.md) — Vollständige `.env`-Referenz
