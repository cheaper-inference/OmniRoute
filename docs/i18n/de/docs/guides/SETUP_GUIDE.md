# 📖 Setup Guide — OmniRoute (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Vollständige Einrichtungsreferenz für OmniRoute. Eine Kurzfassung finden Sie im [Schnellstart in der README](../README.md#-quick-start).

## Inhaltsverzeichnis

- [Installationsmethoden](#install-methods)
- [Konfiguration der CLI-Tools](#cli-tool-configuration)
- [Protokolleinrichtung (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Timeout-Konfiguration](#timeout-configuration)
- [Modus mit getrennten Ports](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Deinstallation](#uninstalling)

---

## Methoden installieren

### npm (empfohlen)

```bash
npm install -g omniroute
omniroute
```

Das Dashboard wird bei `http://localhost:20128` und API geöffnet. Basis URL ist `http://localhost:20128/v1`.

> **npm-Benutzer:** Wenn npm warnt, dass Installationsskripte blockiert wurden (z. B. `omniroute`, `better-sqlite3`), lesen Sie [Fehlerbehebung bei blockierten — npm install-scripts](./TROUBLESHOOTING.md#npm-install-scripts-blocked-warning-global-install).

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm-Benutzer:** Das `--allow-build` Flag ist erforderlich, um native Build-Skripte für `better-sqlite3` und `@swc/core` zu aktivieren. Der Befehl `pnpm approve-builds -g` wird für globale Installationen auf pnpm v11 nicht unterstützt.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

Das [AUR Paket](https://aur.archlinux.org/packages/omniroute-bin) installiert OmniRoute und stellt einen systemd-Benutzerdienst bereit.

### Von der Quelle

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Windows -Hinweis:** Standardmäßig verwendet OmniRoute `%APPDATA%\omniroute`, wenn das alte `%USERPROFILE%\.omniroute` Verzeichnis nicht vorhanden ist. Stellen Sie `DATA_DIR` so ein, dass ein anderer Speicherort für das Datenverzeichnis ausgewählt wird.

> **Notiz:** `npm install` generiert bei der ersten Ausführung automatisch `.env` aus `.env.example`. Bei späteren Installationen wird ein vorhandener `.env` nicht überschrieben, sodass Anpassungen erhalten bleiben. Um ein erneutes Seeding durchzuführen, löschen Sie `.env` vor der erneuten Ausführung.

### Docker

Die vollständige Docker Einrichtung einschließlich Compose-Profilen und Caddy HTTPS finden Sie im [Docker Handbuch](./DOCKER_GUIDE.md).

### Desktop-App (Electron)

OmniRoute liefert einen Desktop-Wrapper, der auf Electron 41 + Electron-Builder 26.10 basiert. Verfügbare Skripte (Arbeitsbereich-Root):

```bash
npm run electron:dev          # Run desktop with hot-reload
npm run electron:build        # Build for current OS (auto-detected)
npm run electron:build:win    # Windows installer (NSIS + portable)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Smoke-test packaged build
```

Versionen der Desktop-Installationsprogramme sind an GitHub Releases angehängt. Den vollständigen ausführlichen Einblick Electron (Signierung, IPC Bridge, Distributionen) finden Sie unter [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(criado em fase posterior)_.

### Headless-Server (CI/automation)

Für unbeaufsichtigte Setups (Docker, Kubernetes, CI) verwenden Sie:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

In Kombination mit Umgebungsvariablen (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` usw.) können Sie so eine vollständig skriptfähige OmniRoute Instanz erstellen.

### CLI Optionen

| Befehl                  | Beschreibung                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| `omniroute`             | Server starten (`PORT=20128`, API und Dashboard auf demselben Port)                        |
| `omniroute setup`       | Geführtes CLI -Onboarding für Passwort und ersten Anbieter                                 |
| `omniroute doctor`      | Führen Sie lokale Integritätsprüfungen durch, ohne den Server zu starten                   |
| `omniroute providers`   | Entdecken, listen, validieren und testen Sie Anbieter von CLI                              |
| `omniroute config`      | CLI Tool-Konfiguration — Konfigurationen auflisten, abrufen, festlegen und validieren      |
| `omniroute status`      | Offline-Status-Dashboard — Version, DB, Tools, Konfiguration                               |
| `omniroute logs`        | Streamen Sie Nutzungsprotokolle vom API (unterstützt `--follow`)                           |
| `omniroute update`      | Suchen Sie nach OmniRoute Updates oder wenden Sie diese an                                 |
| `omniroute provider`    | Verwalten Sie Anbieterverbindungen — Hinzufügen, Auflisten, Entfernen, Testen und Standard |
| `omniroute --port 3000` | Setzen Sie den canonical/API Port auf 3000                                                 |
| `omniroute --mcp`       | MCP Server starten (STDIO-Transport)                                                       |
| `omniroute --no-open`   | Browser nicht automatisch öffnen                                                           |
| `omniroute --help`      | Hilfe anzeigen                                                                             |

Das Headless-Setup kann mit Flags oder Umgebungsvariablen per Skript ausgeführt werden:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Führen Sie eine lokale Diagnose aus, ohne das Dashboard zu öffnen:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Verwalten Sie Anbieter über SSH oder Skripte, ohne das Dashboard zu öffnen:

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## Konfiguration von CLI-Tools

### 1) Anbieter verbinden und API-Schlüssel erstellen

1. Öffnen Sie Dashboard → `Providers` und verbinden Sie mindestens einen Anbieter (OAuth oder API-Schlüssel).
2. Öffnen Sie Dashboard → `Endpoints` und erstellen Sie einen API-Schlüssel.
3. (Optional) Öffnen Sie Dashboard → `Combos` und legen Sie Ihre Fallback-Kette fest.

### 2) Ihr Coding-Tool konfigurieren

```txt
Basis-URL:   http://localhost:20128/v1
API-Schlüssel: [von der Endpoint-Seite kopieren]
Modell:      if/qwen3.8-max-preview (oder ein beliebiges Anbieter-/Modellpräfix)
```

Falls Ihr Editor `Authorization: Bearer ...` nicht senden kann, verwenden Sie stattdessen die tokenisierte Kompatibilitätsbasis:

```txt
Basis-URL:        http://localhost:20128/api/v1/vscode/YOUR_KEY/
Modell-URL:       http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Chat-URL:         http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama-Tags-URL:  http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Funktioniert mit Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode und OpenAI-kompatiblen SDKs.

#### Automatische Konfiguration mit `setup-*`

Anstatt die Basis-URL und den Schlüssel manuell einzufügen, lassen Sie OmniRoute die
jeweilige Konfiguration jedes Tools anhand des aktuellen Modellkatalogs erstellen. Ein Befehl pro Tool:

```bash
omniroute setup-codex        # Profile unter ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (OpenAI-kompatibel)
omniroute setup-cline        # Einstellungen für Cline CLI und die VS-Code-Erweiterung
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # gibt die auszuführenden Schritte in Cursor aus
omniroute setup-roo          # Roo-Code-Import und autoImport-Zeiger
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-zed          # ~/.config/zed/settings.json (openai_compatible)
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json und ~/.qwen/.env
```

Jeder Befehl akzeptiert `--remote <url> --api-key <key>`, um ein lokales Tool für eine
**entfernte** OmniRoute-Instanz zu konfigurieren, sowie `--dry-run` für eine Vorschau. Um eine CLI mit den richtigen
eingefügten Umgebungsvariablen zu starten, ohne überhaupt eine Konfiguration zu schreiben, verwenden Sie den generischen Starter
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
die bisherigen toolspezifischen Starter `omniroute launch` (Claude Code) und
`omniroute launch-codex` (Codex) bleiben verfügbar.

Die vollständige Tabelle (welche Dateien die einzelnen Befehle schreiben, alle Flags, lokal im Vergleich zu entfernt, Basis-URL-
`/v1`-Konventionen) finden Sie unter **[CLI-Integrationen](./CLI-INTEGRATIONS.md)**.

Eine ausführliche Konfiguration für die einzelnen Tools (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot und weitere) finden Sie im entsprechenden **[Leitfaden für CLI-Tools](../reference/CLI-TOOLS.md)**.

---

## Protokoll-Setup (MCP + A2A)

### MCP Setup (Modellkontextprotokoll)

Starten Sie MCP -Transport im stdio-Modus:

```bash
omniroute --mcp
```

Empfohlener Validierungsablauf:

```bash
# 1. Start MCP server
omniroute --mcp

# 2. From your MCP client, call:
omniroute_get_health        # Should return system health
omniroute_list_combos       # Should return active combos

# 3. Or run the full E2E suite:
npm run test:protocols:e2e
```

#### MCP Client-Konfiguration

**Claude Code:**

Claude Code stellt eine Verbindung über HTTP, was `omniroute --mcp` (stdio) nicht startet. Der HTTP Transport ist standardmäßig deaktiviert: Aktivieren Sie ihn zuerst auf dem laufenden Server. Wenn die Dashboard-Anmeldung aktiviert ist, erhält eine Anfrage ohne Anmeldeinformationen `401`. Übergeben Sie also einen API -Schlüssel, der `mcp:connect` (oder `manage`) enthält. Ein Schlüssel ohne `manage`/`admin` benötigt auch den Gültigkeitsbereich jedes Tools (siehe [MCP Server → MCP Tool Scopes](../frameworks/MCP-SERVER.md#mcp-tool-scopes) ).

```bash
omniroute mcp enable --transport streamable-http
claude mcp add --transport http omniroute http://localhost:20128/api/mcp/stream \
  --header "Authorization: Bearer your-key"
```

**Cursor / Cline:**

Fügen Sie zu Ihren MCP Einstellungen hinzu (stdio, mit der Taste, damit der Anrufer einen Prinzipal hat):

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {
        "OMNIROUTE_API_KEY": "your-key",
        "OMNIROUTE_BASE_URL": "http://localhost:20128"
      }
    }
  }
}
```

Oder, wenn `mcpTransport` `streamable-http` ist (setzen Sie es auf `/dashboard/mcp` oder mit `omniroute mcp enable --transport streamable-http`), verweisen Sie auf den Remote MCP Servereintrag des Clients auf `http://localhost:20128/api/mcp/stream`.

Der Schlüssel wird als `Authorization: Bearer <api-key>` übertragen (siehe [MCP Server → Remotezugriff](../frameworks/MCP-SERVER.md#remote-access-manage-scope-bypass) für Remote-Hosts; ein Remote-Schlüssel benötigt `mcp:connect` plus seine read/write Bereiche).

**Vollständige MCP -Dokumentation:** [MCP Server README](../../open-sse/mcp-server/README.md) — 110 Tools, IDE Konfigurationen, Python/TS/Go Clients. Bedienerreferenz für die Komprimierungs- CCR/dedup Tools (Markierungen, Voraussetzungen, Bereiche pro Tool, Abrufpaginierung, Diagnose): [Komprimierungs-Engines → -Voraussetzungen/Bedienerhandbuch](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup).

### A2A Setup (Agent-zu-Agent-Protokoll)

Überprüfen Sie die Agentenkarte:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Senden Sie eine Aufgabe:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Vollständige A2A -Dokumentation:** [A2A Server README](../../src/lib/a2a/README.md) — JSON-RPC 2.0, Fähigkeiten, Streaming, Aufgabenlebenszyklus.

---

## Timeout-Konfiguration

### Grundlegende Timeouts

Für die meisten Bereitstellungen benötigen Sie nur diese beiden Variablen:

| Variable                 | Standardwert                   | Zweck                                                                                                                                                                         |
| ------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                       | Gemeinsamer Ausgangswert für den Timeout bis zum Beginn der Upstream-Antwort, verborgene Undici-Timeouts, TLS-Fingerprint-Anfragen und Anfrage-/Proxy-Timeouts der API-Bridge |
| `STREAM_IDLE_TIMEOUT_MS` | übernimmt `REQUEST_TIMEOUT_MS` | Maximaler Abstand zwischen Streaming-Chunks, bevor OmniRoute den SSE-Stream abbricht                                                                                          |

Die Abwärtskompatibilität bleibt erhalten: Vorhandene Variablen wie `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` und andere schichtspezifische Timeout-Variablen funktionieren weiterhin und überschreiben den gemeinsamen Ausgangswert.

### Anbieterspezifische Hinweise

Für Claude Code-kompatible Upstreams (`anthropic-compatible-cc-*`) leitet OmniRoute den ausgehenden Header `X-Stainless-Timeout` aus dem ermittelten Fetch-Timeout ab, damit die anbieterseitigen Lese-Timeouts mit Ihrer Umgebungskonfiguration übereinstimmen.

Bei Claude Code-kompatiblen Reverse-Proxys von Drittanbietern verwendet OmniRoute standardmäßig einen konservativen `anthropic-beta`-Satz und leitet, wenn `Client Cache Control` auf `Auto` belassen wird, nur vom Client bereitgestellte `cache_control`-Markierungen weiter. Aktivieren Sie den verbindungsspezifischen Schalter „Enable redact-thinking beta“ nur, wenn der Upstream ausdrücklich Claude-Streams mit redigierten Denkprozessen erfordert.

### Erweiterte Timeout-Überschreibungen

| Variable                                 | Standardwert                                 | Zweck                                                                                       |
| ---------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | übernimmt `REQUEST_TIMEOUT_MS`               | Timeout bis zum Beginn der Upstream-Antwort, der bis zum Eintreffen der Antwort-Header gilt |
| `FETCH_HEADERS_TIMEOUT_MS`               | übernimmt `FETCH_TIMEOUT_MS`                 | Undici-Zeitlimit für den Empfang der Upstream-Antwort-Header                                |
| `FETCH_BODY_TIMEOUT_MS`                  | übernimmt `FETCH_TIMEOUT_MS`                 | Undici-Zeitlimit zwischen Upstream-Body-Chunks (`0` deaktiviert es)                         |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                      | Undici-Timeout für den TCP-Verbindungsaufbau                                                |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                       | Undici-Timeout für inaktive Keep-Alive-Sockets                                              |
| `TLS_CLIENT_TIMEOUT_MS`                  | übernimmt `FETCH_TIMEOUT_MS`                 | Timeout für über `wreq-js` ausgeführte TLS-Fingerprint-Anfragen                             |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | übernimmt `REQUEST_TIMEOUT_MS` oder `600000` | Timeout für die `/v1`-Proxy-Weiterleitung vom API-Port zum Dashboard-Port                   |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`   | Timeout für eingehende Anfragen auf dem API-Bridge-Server                                   |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                      | Timeout für eingehende Header auf dem API-Bridge-Server                                     |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                       | Keep-Alive-Timeout auf dem API-Bridge-Server                                                |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                          | Timeout bei Socket-Inaktivität auf dem API-Bridge-Server (`0` deaktiviert ihn)              |

> **Hinweis:** Bei Streaming-Anfragen deckt `FETCH_TIMEOUT_MS` nur den Verbindungsaufbau beziehungsweise das Warten auf die erste Upstream-Antwort ab. Sobald der Stream aktiv ist, bricht OmniRoute nur bei einem tatsächlichen Stillstand (`STREAM_IDLE_TIMEOUT_MS`) oder bei Inaktivität des Undici-Bodys (`FETCH_BODY_TIMEOUT_MS`) ab.

### Reverse-Proxy-Kompatibilität

Wenn Sie OmniRoute hinter Nginx, Caddy, Cloudflare oder einem anderen Reverse-Proxy betreiben, stellen Sie sicher, dass die Proxy-Timeouts ebenfalls höher als Ihre OmniRoute-Stream-/Fetch-Timeouts sind.

---

## Modus mit getrennten Ports

Führen Sie API und Dashboard für erweiterte Szenarien (Reverse-Proxy, Container-Netzwerke) auf getrennten Ports aus:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Ungültige Linux (xbps-src).

Für Void Linux Benutzer können Sie mit `xbps-src` ein natives Paket erstellen. Speichern Sie diesen Block als `srcpkgs/omniroute/template`:

```bash
# Template file for 'omniroute'
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/cheaper-inference/OmniRoute"
distfiles="https://github.com/cheaper-inference/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# Regenerate the checksum for each release with:
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/cheaper-inference/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

---

## Deinstallation

| Befehl                   | Aktion                                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Entfernt die Systemanwendung, **behält jedoch Ihre Datenbank und Konfigurationen** in `~/.omniroute`. |
| `npm run uninstall:full` | Entfernt die Anwendung UND **löscht dauerhaft alle Konfigurationen, Schlüssel und Datenbanken**.      |

> Ausführliche Anweisungen zur Deinstallation für alle Methoden finden Sie unter [UNINSTALL.md](./UNINSTALL.md).
