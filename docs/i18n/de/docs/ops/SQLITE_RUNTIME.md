# SQLite Runtime Resolution (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute löst seinen SQLite-Treiber beim Start über eine 5-stufige Fallback-Kette auf:

1. **Mitgeliefertes `better-sqlite3`** (über `dependencies` in `package.json`)
   — am schnellsten, native Binärdatei, wird durch `npm install` installiert, wenn Build-Werkzeuge vorhanden sind.

2. **Zur Laufzeit installiertes `better-sqlite3`** (in `~/.omniroute/runtime/`)
   — wird beim ersten Start verzögert **ODER** durch `scripts/build/postinstall.mjs → scripts/postinstall.mjs` installiert.
   Validiert vor dem Laden die Magic Bytes der nativen `.node`-Datei (ELF / Mach-O / PE),
   um vor beschädigten Binärdateien oder solchen für die falsche Plattform zu schützen.

3. **`node:sqlite`** (Node ≥22.5-Standardbibliothek) — kein nativer Build erforderlich; wird verwendet, wenn
   beide better-sqlite3-Pfade fehlschlagen. Eingeschränkter Funktionsumfang.

4. **`sql.js`** (WASM) — letzter Fallback. Funktioniert überall, ist jedoch langsamer
   und schreibt Daten in Intervallen statt synchron.

## Warum diese Komplexität?

- **Windows EBUSY**: `npm install -g omniroute@latest` kann fehlschlagen, wenn die
  `better_sqlite3.node`-Datei der vorherigen Version durch einen laufenden Prozess gesperrt ist. Die
  Laufzeitinstallation in `~/.omniroute/runtime/` umgeht den globalen npm-Cache.
- **Keine Build-Werkzeuge**: Einige Umgebungen (Unternehmens-Windows ohne VS Build
  Tools, minimale Docker-Images) können `better-sqlite3` nicht kompilieren. Das Laufzeit-
  Installationsprogramm bezieht eine vorkompilierte Binärdatei aus der npm-Registry; die Fallback-
  Treiber stellen sicher, dass OmniRoute auch dann noch startet, wenn dies fehlschlägt.
- **Vom Netzwerk isolierte Systeme**: Wenn die npm-Registry nicht erreichbar ist, garantieren `node:sqlite`
  oder `sql.js` eine grundlegende Funktionalität.

## Magic-Byte-Validierung

Vor dem Laden einer zur Laufzeit installierten `.node`-Datei liest OmniRoute die ersten 8
Bytes und gleicht sie mit bekannten Plattform-Magic-Bytes ab:

| Plattform              | Bytes (hex)   | Bezeichnung |
| ---------------------- | ------------- | ----------- |
| Linux                  | `7F 45 4C 46` | `elf`       |
| macOS 64-Bit BE        | `FE ED FA CF` | `macho`     |
| macOS 64-Bit LE        | `CF FA ED FE` | `macho-le`  |
| macOS Fat (universell) | `CA FE BA BE` | `macho-fat` |
| Windows                | `4D 5A` (MZ)  | `pe`        |

Nicht übereinstimmende Magic Bytes → die Datei wird ignoriert, der Fallback wird mit dem nächsten Schritt fortgesetzt.

## Aktiven Treiber prüfen

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Manuelle Steuerung

```bash
# Postinstall-Aufwärmphase überspringen (für schnelle CI-Installationen)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Zur Laufzeit verwendetes better-sqlite3 zwangsweise neu installieren
rm -rf ~/.omniroute/runtime
omniroute  # wird beim nächsten Start neu installiert

# Prüfen, welcher Treiber aktiv ist
omniroute config db-info  # (falls der CLI-Befehl vorhanden ist)
```

## Diagnose synchroner Blockierungen

Legen Sie bei `better-sqlite3` vor dem Start `OMNIROUTE_SQLITE_SLOW_MS=200` fest, um
die Zeitmessung des synchronen Adapters zu aktivieren. Standardmäßig ist sie deaktiviert. Ein abgeschlossener Vorgang,
der mindestens so viele Millisekunden dauert, erzeugt eine `[SQLITE-SLOW]`-Warnung, höchstens einmal
alle zehn Sekunden pro Adapter. Die Warnung enthält ausschließlich den Treiber, die Vorgangsklasse
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, Transaktion oder Wartung) und
die verstrichenen Millisekunden: kein SQL, keine Bindungen, Zeilen, Pfade oder Ausnahmetexte.

Dies ist ein Diagnosehilfsmittel, kein Timeout und keine Abfrageoptimierung. Es kann weder
einen Vorgang melden, der nie zurückkehrt, noch CPU-Arbeit von Wartezeiten auf Datenträger unterscheiden,
das genaue SQL identifizieren oder Vorgänge beobachten, die über das rohe Treiber-Handle ausgeführt werden.
Die Dauer asynchroner Backups ist bewusst ausgeschlossen; andere SQLite-Treiber werden durch
diese Opt-in-Funktion nicht instrumentiert. Durch Deaktivieren der Variable wird der ursprüngliche Adapter
ohne Zeitmessungs-Wrapper wiederhergestellt. Das Datenbankschema und die gespeicherte Konfiguration bleiben unverändert.

Die Lag-Warnung von `/healthz` meldet den Höchstwert der Event-Loop-Verzögerung seit der vorherigen Messung,
nicht den Durchschnitt über die gesamte Laufzeit. Korrelieren Sie ihre Zeitstempel mit Warnungen zu langsamen Vorgängen
und Host-/Speichermetriken, bevor Sie eine Blockierung SQLite oder einem Datenträgerfehler zuschreiben.

## Referenz

Implementierung:

- `bin/cli/runtime/magicBytes.mjs` — Hilfsfunktionen zur Validierung binärer Magic Bytes
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-stufiger Laufzeit-Resolver + verzögertes Installationsprogramm
- `bin/cli/runtime/index.mjs` — Start-Orchestrator (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm-Postinstall-Hook (nicht kritische Aufwärmphase)
- `src/lib/db/core.ts` — Exporte von `ensureDbInitialized()` / `getDriverInfo()`

## Single-Writer-Topologie (HA wird nicht unterstützt)

Die obige Treiber-Fallback-Kette wird weiterhin in **einem Prozess** ausgeführt. Mit
standardmäßigem SQLite ist OmniRoute ein **Single Writer**:

- Verbinden Sie nicht zwei OmniRoute-Replikate mit derselben `storage.sqlite`-Datei.
- Ein Container-Neustart, Recreate-Deployment, OOM-Kill oder HEALTHCHECK-Neustart beendet
  jede laufende SSE-Sitzung. Im Standardpfad findet kein geordnetes Beenden der Sitzungen statt.
- Eine Orchestrator-Liveness-Prüfung, die einen langsamen `/healthz`-Endpunkt als Ausfall interpretiert, beendet das einzige
  Replikat. Bevorzugen Sie TCP-Liveness + HTTP-`/healthz`-Readiness. Siehe
  [Docker-Leitfaden — Verfügbarkeit](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  und [Empfehlungen für Kubernetes-Probes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
