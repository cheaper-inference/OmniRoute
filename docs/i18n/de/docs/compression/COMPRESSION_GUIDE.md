# 🗜️ Prompt Compression Guide — OmniRoute (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Sparen Sie automatisch 15–95 % bei geeigneten Kontextinhalten. Einen schnellen Überblick finden Sie im [README-Abschnitt zur Komprimierung](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Übersicht

OmniRoute implementiert eine modulare Pipeline zur Prompt-Komprimierung, die **proaktiv** ausgeführt wird, bevor Anfragen die Upstream-Anbieter erreichen. Dadurch werden Tokens transparent eingespart — Änderungen an Ihrem Workflow sind nicht erforderlich.

```
Client-Anfrage
  → Auswahl der Komprimierungsstrategie
    → Combo-Überschreibung? → Combo-Einstellung verwenden
    → Schwellenwert für automatische Auslösung? → Automatikmodus verwenden
    → Standardmodus? → Globale Einstellung verwenden
    → Aus? → Komprimierung überspringen
  → Ausgewählter Komprimierungsmodus
    → Aus: Keine Komprimierung
    → Lite: Sichere Bereinigung von Leerraum/Formatierung (~15 %)
    → Standard: Entfernung von Füllwörtern im Telegrammstil (~30 %)
    → Aggressiv: Alterung des Verlaufs + Zusammenfassung (~50 %)
    → Ultra: Heuristische Bereinigung + Ausdünnung von Codeblöcken (~75 %)
    → RTK: Befehlsorientierte Filterung von Terminal-/Tool-Ausgaben (60–90 % im Upstream-Bereich)
    → Gestapelt: Geordnete Pipeline mit mehreren Engines, üblicherweise RTK, dann Caveman (78–95 % im geeigneten Bereich)
  → Komprimierte Anfrage → Anbieter
```

---

## Komprimierungsmodi

### Deaktiviert

Keine Komprimierung angewendet. Alle Nachrichten werden unverändert weitergeleitet.

### Lite-Modus (~15 % Einsparung, <1 ms Latenz)

Der sicherste Modus – bereinigt die Formatierung. Die Kürzung von Tool-Ergebnissen ist verlustbehaftet. Daher wird im Standardpfad
(ohne `allow-lossy`, `engine:lite` oder die ausdrückliche Aktivierung einer benannten Kombination) der Lite-Modus mit
`compressToolResults: false` ausgeführt: Frühere Tool-Ergebnisse erreichen den Anbieter unverändert.

| Technik                  | Beschreibung                                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Führende und nachfolgende Leerzeilen sowie nachgestellte Leerzeichen zusammenführen                            |
| `dedupSystemPrompt`      | Doppelte Systemnachrichten entfernen                                                                           |
| `compressToolResults`    | Frühere Tool-Ergebnisse auf das Lite-Limit kürzen (verlustbehaftet: nur mit ausdrücklicher Anfrageaktivierung) |
| `removeRedundantContent` | Wiederholte Anweisungen entfernen                                                                              |
| `replaceImageUrls`       | Base64-Bilddaten-URIs verkürzen                                                                                |

**Am besten geeignet für:** Dauerhafte Nutzung und sicherheitskritische Workflows.

### Standardmodus (~30 % Einsparung)

Inspiriert von [Caveman](https://github.com/JuliusBrussee/caveman) – entfernt Füllwörter und ausführliche Formulierungen, wobei die Bedeutung erhalten bleibt:

- Entfernt Füllwörter („bitte“, „ich denke“, „im Grunde“, „tatsächlich“)
- Verdichtet ausführliche Formulierungen („um ... zu“ → „zu“, „als Folge von“ → „weil“)
- Entfernt höfliche Abschwächungen („Würde es Ihnen etwas ausmachen ...?“, „Wenn Sie vielleicht ... könnten ...“)
- Mehr als 30 reguläre Ausdrücke, abgestimmt auf Coding-Prompts

**Am besten geeignet für:** Tägliche Coding-Workflows und kostenbewusste Teams.

### Aggressiver Modus (~50 % Einsparung)

Intelligente Verwaltung des Verlaufs für lange Sitzungen:

- **Alterung von Nachrichten** – ältere Nachrichten werden schrittweise stärker komprimiert
- **Komprimierung von Tool-Ergebnissen** – lange Tool-Ausgaben werden gekürzt oder ausgelassen (erste/letzte Zeilen,
  Filterung nach Trefferzeilen, Kompaktierung von JSON-Schlüsseln)
- **Wächter für strukturelle Integrität** – stellt sicher, dass `tool_use`- und `tool_result`-Paare konsistent bleiben
- **Bewusstsein für das Kontextfenster** – berücksichtigt Token-Limits pro Modell

**Am besten geeignet für:** Längere Debugging-Sitzungen und große Codebasen.

### Ultra-Modus (~75 % Einsparung)

Maximale Komprimierung für tokenkritische Szenarien:

- **Heuristisches Beschneiden** – tokenbasiertes Beschneiden von Prosa anhand einer Bewertung
- **Strukturerhalt** – eingefasste Codeblöcke, Inline-Code, URLs und Bezeichner werden unverändert zwischengespeichert und wieder eingesetzt, niemals beschnitten
- **Optionales SLM-Tier** – ein kleines lokales Modell kann das Beschneiden verfeinern, wenn es konfiguriert ist
- Unabhängig vom aggressiven Modus: Es führt keine Nachrichtenalterung, Tool-Ergebnis-Komprimierung oder den Fallback-Summarizer aus (nur ein Fehler des SLM-Tiers kann einen Fallback-Durchlauf über den aggressiven Modus auslösen)

**Am besten geeignet für:** Situationen, in denen wiederholt Kontextlimits erreicht werden.

### RTK-Modus (60–90 % Upstream-Bereich)

Der RTK-Modus ist für ausführliche Tool-Ausgaben optimiert, die in Coding-Agent-Sitzungen auftreten:

- Erkennt Befehls-/Ausgabeklassen wie `git status`, `git diff`, `git log`, Test-Runner,
  TypeScript/Vite/Webpack-Builds, ESLint/Biome/Prettier, npm-Audits/-Installationen, Docker-Logs, Infrastruktur-
  ausgaben sowie allgemeine Shell-Ausgaben
- Wendet JSON-Filterpakete aus `open-sse/services/compression/engines/rtk/filters/` an
- Importiert RTK-TOML-Schema-v1-Filter aus projektweiten oder globalen `filters.toml`-Dateien, mit Inline-Test-
  validierung und Vertrauensprüfung für Projektdateien
- Enthält 56 integrierte Filter mit Inline-Verifizierungsbeispielen
- Entfernt ANSI-Steuersequenzen, Fortschrittsbalken, wiederholte Zeilen und nicht handlungsrelevantes Rauschen
- Bewahrt Fehler, Fehlermeldungen, Warnungen, geänderte Dateien, Zusammenfassungen und das Ende langer Ausgaben
- Unterstützt vertrauensgeprüfte Projektfilter, globale Filter und optional die Wiederherstellung redigierter Rohdaten

**Am besten geeignet für:** Agent-Sitzungen mit Shell-, Build-, Test-, Git-, Grep- und Dateiausgabe-Transkripten.

### Gestapelter Modus (78–95 % geeigneter Bereich)

Der gestapelte Modus führt mehrere Komprimierungs-Engines in einer deterministischen Reihenfolge aus. Die Standardpipeline lautet:

```txt
RTK -> Caveman
```

Diese Reihenfolge hält zunächst Terminal-/Tool-Ausgaben kompakt und wendet anschließend die semantische Verdichtung von Caveman auf
den verbleibenden natürlichsprachlichen Prompt an. Gestapelte Pipelines können global oder über Komprimierungskombinationen konfiguriert werden, die Routing-Kombinationen zugewiesen sind.

**Am besten geeignet für:** Gemischten Kontext mit großen Tool-Logs sowie menschlichen Anweisungen oder Assistentenzusammenfassungen.

## Berechnung der Upstream-Einsparungen

OmniRoute dokumentiert Komprimierungseinsparungen aus zwei Quellen: Benchmarks der Upstream-Projekte und
der eigenen Engine-Kombination von OmniRoute.

| Quelle  | Hier verwendete Angabe aus der Upstream-README                                                                                                        |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` weniger Ausgabe-Token, durchschnittlich `65%` Ausgabeeinsparung in Benchmarks, Spanne von `22-87%` und Tool zur Eingabekomprimierung um `~46%` |
| RTK     | `60-90%` Einsparung bei Befehlsausgaben; Beispielsitzung mit `~118,000 -> ~23,900` Token bzw. `79.7%` Einsparung (`~80%`)                             |

Bei sich überschneidenden Tool-/Kontext-Nutzdaten schaltet die standardmäßige OmniRoute-Kombination die Engines hintereinander:

```txt
RTK -> Caveman
```

Die kombinierten Einsparungen werden multipliziert, nicht addiert:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Der Wert von `78-95%` gilt, wenn sowohl RTK als auch Caveman dieselben Eingabe-/Kontext-Nutzdaten reduzieren können.
Der Caveman-Modus für Antwortausgaben ist davon getrennt: Wenn er aktiviert ist, gelten die eigenen Ausgabeeinsparungen von Caveman (`65%`
im Durchschnitt, `~75%` als hervorgehobener Wert, Spanne von `22-87%`). Die Gesamteinsparungen bei der Abrechnung hängen von Ihrem Verhältnis zwischen Prompts und Ausgaben ab.

### Was „geeignet“ tatsächlich bedeutet

Die hervorgehobene Spanne von 15-95% ist real, gilt jedoch nur für **redundante oder ausführliche** Inhalte — wiederholte
Fehlerzeilen, ein Build-Protokoll, das ständig dieselbe Warnung ausgibt, oder eine übergroße `grep`-/Dateileseausgabe. Das bedeutet
**nicht**, dass jede Anfrage entsprechend viel einspart.

Empirisch bestätigt (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): Ein
`stacked`-Durchlauf (RTK + Caveman) mit einem `tool_result`-Block im Anthropic-Format, der 300 identische
Fehlerzeilen enthielt, erzielte **95.93% Token-Einsparung / 96.26% Zeicheneinsparung** — eindeutig innerhalb der angegebenen
Spanne. Wird dieselbe Pipeline jedoch auf normale, nicht redundante Tool-Ausgaben angewendet (eine saubere `grep`-Trefferliste,
eine kurze Dateileseausgabe, gewöhnlicher Konversationstext), ergeben sich erwartungsgemäß **nahezu keine Einsparungen**, da
keine Wiederholungen entfernt werden können und `validateCompression()` (`validation.ts`) keine Überarbeitung ausliefert, die
Codeblöcke, URLs, Überschriften, Versionen oder Bezeichner für Konstanten in GROSSBUCHSTABEN entfernen oder verändern würde.

Dies ist das erwartete, sichere Verhalten und kein Fehler: Eine Coding-Sitzung, in der überwiegend saubere Dateien gelesen bzw. mit `grep` durchsucht werden, erzielt
selbst bei vollständig aktivierter Komprimierung nur moderate Gesamteinsparungen, während eine Sitzung mit einer fehlschlagenden
Schleife oder einem sehr ausführlichen Linter für diesen Datenverkehr die volle Spanne von 78-95% erreicht. Verwenden Sie den
niedrigen aggregierten Einsparungsprozentsatz einer einzelnen Sitzung nicht als Beleg dafür, dass die Komprimierung falsch konfiguriert ist — prüfen Sie zuerst, ob die
zugrunde liegende Tool-Ausgabe tatsächlich redundant war.

---

## Visualisierung der Token-Einsparungen

```
Ohne Komprimierung: 47K Token an das LLM gesendet
Mit Lite:           40K Token gesendet          (15% eingespart — sicher, immer aktiv)
Mit Standard:       33K Token gesendet          (30% eingespart — Caveman-Sprechregeln)
Mit Aggressive:     24K Token gesendet          (50% eingespart — Alterung + Zusammenfassung)
Mit Ultra:          12K Token gesendet          (75% eingespart — heuristische Bereinigung)
Mit RTK:            19K-5K Token gesendet       (60-90% bei Befehls-/Tool-Ausgaben eingespart)
Mit Stacked:        10K-2.5K Token gesendet     (geeignete RTK+Caveman-Spanne von 78-95%)
```

---

## Konfiguration

### Dashboard

Navigieren Sie zu `Dashboard → Context & Cache`:

- **Caveman** — Modusauswahl, Sprachpakete, Vorschau und globale Standardeinstellungen
- **RTK** — Vorschau der Befehlsfilter, RTK-Sicherheitseinstellungen und Filterkatalog
- **Compression Combos** — Benannte Engine-Pipelines, die Routing-Kombinationen zugewiesen sind
- **Auto-Trigger Threshold** — Komprimierung automatisch aktivieren, wenn die Tokenanzahl den Schwellenwert überschreitet

### Überschreibung pro Combo

Weisen Sie unter `Dashboard → Context & Cache → Compression Combos` eine Komprimierungs-Combo einer Routing-Kombination zu:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Damit können Sie gestapelte Komprimierung bei kostenlosen/Coding-Anbietern verwenden und gleichzeitig den Lite-Modus bei kostenpflichtigen Abonnements beibehalten.

Diese Zuweisung **„Per-Combo Override“** ist eine andere Steuerung als die Überschreibung des **Komprimierungsmodus der Routing-Kombination** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — das Schema des Feldes akzeptiert außerdem `rtk`, `stacked` und `omniglyph`) — diese Überschreibung wählt keine benannte Komprimierungs-Combo-Pipeline aus, sondern setzt lediglich das Feld `compressionMode`, das von `resolveCompressionPlan` ausgewertet wird. Sie kann entweder auf der Combo-Karte (`Dashboard → Combos`) oder seit #6760 pro Routing-Kombination in der Liste „Assign to routing“ unter
`Dashboard → Context & Cache → Compression Combos` festgelegt werden, direkt neben dem oben dokumentierten Kontrollkästchen für die Pipeline-Zuweisung. Beide Oberflächen speichern über denselben Endpunkt `PUT /api/combos/{id}`.

### Überschreibung pro Anfrage

Senden Sie den Anfrage-Header `x-omniroute-compression`, um den Komprimierungsplan für eine einzelne Anfrage zu überschreiben. Er hat die höchste Priorität — er setzt die Überschreibung der Routing-Kombination, das aktive Profil, den Auto-Trigger und den Panel-Default außer Kraft. Unbekannte Werte werden ignoriert (die Anfrage wird niemals abgewiesen), und der globale Hauptschalter gilt weiterhin für alles: Wenn die Komprimierung global deaktiviert ist, kann der Header sie nicht aktivieren. Werte:

| Wert          | Wirkung                                                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Keine Komprimierung für diese Anfrage.                                                                                     |
| `default`     | Das aus dem Panel abgeleitete Default-Profil (ignoriert das aktive Profil). Verlustbehaftete Engines bleiben deaktiviert.  |
| `safe`        | Dasselbe wie beim Weglassen des Headers.                                                                                   |
| `allow-lossy` | Den Operatorplan dieser Anfrage beibehalten, einschließlich Zusammenfassungen, Relevanzfiltern und Stilumschreibungen.     |
| `engine:<id>` | Eine einzelne Engine, wenn sie aktiviert ist, z. B. `engine:rtk`. Dies ist die Opt-in-Option pro Anfrage für diese Engine. |
| `<combo>`     | Eine benannte Combo, zuerst anhand des Namens (ohne Beachtung der Groß-/Kleinschreibung), danach anhand der ID gefunden.   |

Ohne `allow-lossy`, `engine:<id>` oder eine benannte Combo werden verlustbehaftete Engines nicht angewendet. Wenn ein verlustbehaftetes Default, ein Auto-Trigger oder eine Routing-Überschreibung herabgestuft wird, behält OmniRoute die erkannten verlustfreien Schritte aus der konfigurierten gestapelten Pipeline in der konfigurierten Reihenfolge bei. Es fällt nur dann auf `session-dedup → lite` zurück, wenn kein konfigurierter verlustfreier Schritt erhalten bleibt.

Die Vorschau **Effective pipeline** des Einstellungsfensters zeigt den gewöhnlichen Plan im Ruhezustand. Wenn ein Auto-Trigger ausgeführt werden kann, zeigt dieselbe Vorschau außerdem dessen bedingte effektive Pipeline, damit die Auflösung im Panel und die Laufzeitauflösung ohne Header übereinstimmen.

Der angewendete Plan wird im Antwort-Header `X-OmniRoute-Compression: <mode>; source=<source>` zurückgegeben, wobei `<source>` einer der Werte `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` oder `off` ist.

### API

```bash
# Komprimierungseinstellungen abrufen
curl http://localhost:20128/api/settings/compression

# Komprimierungseinstellungen aktualisieren
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Eine bestimmte RTK-/Stacked-Nutzlast in der Vorschau anzeigen
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK-Filterpakete auflisten
curl http://localhost:20128/api/context/rtk/filters

# RTK direkt mit optionalen Befehlsmetadaten testen
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Was geschützt wird

Die Komprimierungs-Engine **bewahrt immer Folgendes:**

- ✅ Codeblöcke (umschlossen und inline)
- ✅ URLs und Dateipfade
- ✅ JSON-Strukturen und strukturierte Daten
- ✅ Bezeichner und geschützte technische Tokens
- ✅ Mathematische Ausdrücke
- ✅ Definitionen von Tool-/Funktionsaufrufen
- ✅ System-Prompts (im Lite-Modus)

Die Wiederherstellung von RTK-Rohausgaben schwärzt gängige API-Schlüssel, Bearer-Tokens, Slack-Tokens, AWS-Zugriffsschlüssel,
Passwörter, Tokens und Geheimnisse, bevor irgendetwas dauerhaft gespeichert wird.

---

## Komprimierungsstatistiken

Jede komprimierte Anfrage enthält Statistiken in den Serverprotokollen:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Phasen-Roadmap

| Phase    | Modi                                                                                                                                                           | Status            |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Phase 1  | Off, Lite                                                                                                                                                      | ✅ Veröffentlicht |
| Phase 2  | Standard, Aggressive, Ultra                                                                                                                                    | ✅ Veröffentlicht |
| Phase 3  | RTK, Stacked, Komprimierungskombinationen                                                                                                                      | ✅ Veröffentlicht |
| Phase 4  | Ausgabestile, SLM-Tier Ultra, Evaluierungs-Harness                                                                                                             | ✅ Veröffentlicht |
| Phase 4C | Adaptives Kontextbudget („Regler“) — Berechnungs-Engine + API (`contextBudget` bei `PUT /api/settings/compression`) + Modus-/Richtliniensteuerung im Dashboard | ✅ Veröffentlicht |

---

## Danksagungen

Die Komprimierungsregeln des Standard-Modus sind von **[Caveman](https://github.com/JuliusBrussee/caveman)** von **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) inspiriert — dem viralen Projekt „why use many token when few token do trick“. Caveman gibt `~75%` weniger Ausgabe-Tokens, eine durchschnittliche Ausgabeeinsparung von `65%` in Benchmarks, eine Ausgabespanne von `22-87%` und ein Tool zur Eingabekomprimierung von `~46%` an.

Der RTK-Modus ist von **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** von **[RTK AI](https://github.com/rtk-ai)** inspiriert — dem Hochleistungsprojekt zur Komprimierung von Befehlsausgaben für Terminal-, Build-, Test-, Git- und Tool-Ausgabefilterung. RTK gibt Einsparungen von `60-90%` an, wobei die Beispielsitzung in der README eine Einsparung von `~80%` zeigt.

---

## Fortschrittliche Kompressionssysteme

Über die oben beschriebenen 7 Modi hinaus (die Quelle akzeptiert auch die Modi `codex-responses` und `omniglyph`, die in diesem Handbuch nicht behandelt werden) behandeln die folgenden Abschnitte Funktionen, die innerhalb oder neben diesen Modi funktionieren: Tool-Ergebniskomprimierung und progressive Alterung sind Schritte 1 und 2 der aggressiven Engine (aggressiver Modus und ein `aggressive` Schritt einer gestapelten Pipeline), die gestapelte Pipeline ist die Art und Weise, wie der gestapelte Modus ausgeführt wird, und die Cache-Aware-Komprimierung stuft `aggressive` und `ultra` auf `standard` für Caching-Anbieter während der Komprimierung herab ist aktiviert, und Caveman-Ausgabemodus und -Ausgabestile sind optionale, standardmäßig deaktivierte System-Eingabeaufforderungsanweisungen, die die Ausgabe des Modells formen, anstatt die Anforderung zu komprimieren.

### Cache-fähige Komprimierung

Einige Anbieter (wie Anthropic mit promptem Caching) unterstützen** sofortiges Caching** , wodurch sie Teile der Eingabeaufforderung zwischenspeichern können, um Kosten und Latenz zu reduzieren. Wenn Caching aktiviert ist, kann tatsächlich eine aggressive Komprimierung erfolgen** verletzt** Leistung, da es die zwischengespeicherten Token ändert und den Cache ungültig macht.

Das `cachingAware.ts` Modul löst dies durch** Erkennen des Caching-Kontexts** Und** Anpassen der Komprimierungsstrategie** entsprechend.

#### Wie es funktioniert

1. **Caching-Kontext erkennen** — Durchsucht den Anforderungstext nach `cache_control` Markierungen
2. **Identifizieren Sie Caching-Anbieter** — Prüft, ob der Zielanbieter Caching unterstützt
3. **Strategie anpassen** — stuft `aggressive`/`ultra` für Caching-Anbieter auf `standard` herab
4. **Systemaufforderung überspringen** — -Systemaufforderungen werden normalerweise zwischengespeichert, komprimieren Sie sie also nicht

Der Strategiehelfer gibt auch ein `deterministicOnly` Flag zurück, aber der Planersteller verwendet nur die Strategie — nichts Downstream liest das Flag heute.

#### Codebeispiel

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Wann zu verwenden

Cache-fähige Komprimierung ist** immer an** — keine Konfiguration erforderlich. Es wird immer dann aktiviert, wenn die Komprimierung aktiviert ist und der Zielanbieter Prompt-Caching unterstützt (Anthropic, OpenAI usw.). Explizite `cache_control` Marker sind nicht erforderlich, — ein Caching-Anbieter allein das Downgrade auslöst und Marker allein dies niemals tun (Markererkennung speist Cache-Telemetrie, nicht die Strategieentscheidung).

OpenRouter gilt nur für `anthropic/*` Modelle als Caching-Anbieter: Claude -Codeanfragen behalten ihre `cache_control` Haltepunkte (höchstens 4) und der Wächter schützt das Präfix, während jede andere OpenRouter Familie (`openai/`, `google/`, `qwen/`, …) entfernt und ungeschützt bleibt.

### Progressives Altern

Bei langen Gesprächen häufen sich viele Nachrichtenwechsel an, ältere Gesprächsrunden verlieren jedoch an Relevanz. Das `progressiveAging.ts` Modul** Degradiert Nachrichten je nach Abbiegeentfernung** (Entfernung gemessen vom Ende des Gesprächs). Mit den ausgelieferten Standardeinstellungen (`verbatim: 2, light: 2, moderate: 3`):

- **Letzte 2 Runden (Distanz ≤ 2)** : Wörtlich gehalten
- **Distanz 3** : Caveman-Komprimierung (Füllerentfernung)
- **Abstand 4 +** : Assistentennachrichten zusammengefasst; Benutzernachrichten werden auf die erste Zeile reduziert und sind auf 120 Zeichen begrenzt. andere Rollen unberührt. Systemansagen, bereits veraltete Nachrichten und die neueste Benutzernachricht werden unabhängig von der Entfernung immer wörtlich beibehalten. Es wird nichts komplett gelöscht und das `light` Band ist mit den ausgelieferten Standardeinstellungen (`light` gleich `verbatim`) nicht erreichbar.

#### Codebeispiel

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### Wann zu verwenden

Progressives Altern ist** immer an** Für `aggressive` Modus — ist es Schritt 2 von `compressAggressive()`. Im Ultra-Modus wird es nicht ausgeführt. Es ist besonders wirksam für:

- Lang laufende Codierungssitzungen
- Mehrtägige Gespräche
- Agentische Workflows mit vielen Tool-Aufrufen

### Caveman-Ausgabemodus

Caveman-Ausgabemodus hinzugefügt** Anweisungen zur Systemaufforderung** die das Modell selbst um `full` prägnante Ausgabe bitten — `ultra` `lite` Ebene verlangt nach prägnanten Antworten, die ganze Sätze enthalten. Anweisungen fragen nur, sie können es nicht garantieren. Anfragen erhalten sie über `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` löst zunächst die Auswahl mit dem Back-Compat-Shim (`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`) auf, der, während `outputStyles` leer ist, ein aktiviertes `cavemanOutputMode` dem `terse-prose` -Ausgabestil bei `cavemanOutputMode.intensity` zuordnet (siehe Back-compat unten); Eine nicht leere `outputStyles` Auswahl wird unverändert verwendet, und `cavemanOutputMode.enabled` und `intensity` haben dann keine Wirkung, während die `autoClarity` Umschaltung weiterhin gilt. `outputMode.ts` enthält die Anweisungstexte (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), die Inhaltsumgehung und den Platzierungshelfer, den die Injektion verwendet; Sein eigener `applyCavemanOutputMode()` Injektor hat keinen Produktionsaufrufer.

#### Wie es funktioniert

Dieser Modus komprimiert die Eingabe nicht. Es fügt der Systemeingabeaufforderung einen Anweisungsblock hinzu (siehe Funktionsweise der Injektion weiter unten), und jeder für die Anforderung ausgewählte Eingabekomprimierungsmodus wird anschließend weiterhin auf dem Hauptteil ausgeführt, der jetzt den Block trägt. Vor der Klausel über gemeinsame Grenzen, mit der jede Ebene endet, lautet die englische `full` Ebene:

> „Reagieren Sie knapp wie ein schlauer Höhlenmensch. Löschen Sie Artikel (a/an/the), Füllmaterial (just/really/basically/actually/simply), Höflichkeiten, Absicherungen. Fragmente OK. Kurze Synonyme (groß, nicht umfangreich, reparieren, nicht implementieren). Halten Sie alle technischen Inhalte, Codes, Fehler, URLs und Bezeichner genau.“

Dies funktioniert besonders gut für:

- Codegenerierung (kürzere Ausgabe = weniger Token)
- Kurze Fragen und Antworten (keine ausführlichen Erklärungen erforderlich)
- Stapelverarbeitung (Durchsatz maximieren)

#### Wann zu verwenden

Der Caveman-Ausgabemodus ist** Opt-in** . Wenn die Komprimierung aktiviert ist (`enabled: true`, der Hauptschalter auf der Seite „Komprimierungseinstellungen“), schalten Sie sie mit `cavemanOutputMode.enabled` ein. `intensity` wählt `lite`, `full` oder `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Eine Komprimierungskombination** Ausgabemodus** toggle (`outputMode`, Ebene in `outputModeIntensity`) setzt den gleichen Schalter für die Anforderungen, auf die Combo angewendet wird, und das `omniroute_set_compression_engine` MCP Tool schreibt ihn über sein boolesches `outputMode` Argument. Eine nicht leere `outputStyles` Auswahl hat Vorrang vor diesem Schalter. Aktivieren Sie im Dashboard die** Knappe Prosa** Der Ausgabestil fügt denselben Block ein (siehe Ausgabestile unten).

### Ausgabestile (Katalog)

Der obige Caveman-Ausgabemodus ist der** Legacy-Single-Style-Pfad** . Phase 4 verallgemeinerte es in einen Katalog zusammensetzbarer Ausgabestile: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Bei jedem Stil handelt es sich um eine systemgesteuerte Anweisung, die das Modell selbst um eine günstigere Ausgabe bittet. Stile können gemeinsam aktiviert werden und werden in der Katalogreihenfolge eingefügt.

| Stil                                     | `id`            | Was es bewirkt                                                                                                                                                                                                                                                | Unterrichtssprachen                           |
| ---------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Knappe Prosa                             | `terse-prose`   | Drop filler/articles/hedging; Halten Sie den technischen Inhalt genau. Gleicher Text wie im alten Caveman-Ausgabemodus (referenziert, nicht neu eingegeben).                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Weniger Code                             | `less-code`     | YAGNI -Leiter: kleinste Arbeitsänderung, keine ungefragten Abstraktionen.                                                                                                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Pferdeschwanz (fauler Senior-Entwickler) | `ponytail`      | „Der beste Code ist der Code, der nie geschrieben wurde“: Wiederverwendung > -Rewrite, Grundursache für > Symptom, kürzester Arbeitsunterschied.                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ich habe ADHD (Action-First)             | `i-have-adhd`   | Aktion zuerst (command/path/snippet vor Prosa), nummerierte begrenzte Schritte, ONE konkreter nächster Schritt, kein preamble/recap/closers. Angepasst von [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop- UI -Filter                     | `antislop-ui`   | Jede visuelle Technik muss einen Zwecktest bestehen (Hierarchie, Identität, Lesbarkeit); Kein Standard- gradients/glass/glow, begrenzte Palette, keine Vorlagenlayouts. Beide Antislop-Stile fügen eine Grenze ohne Dead-Controls/No-Fabricated-Claims hinzu. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop-Kopie und menschlicher Filter   | `antislop-copy` | Spezifischer Text (kein Geviertstrich, generisches CTAs, Schlagworte, Chatbot-Abschlüsse, erfundene Fakten) plus Personenregeln: WCAG AA Kontrast, sichtbarer Fokus, Tastaturreichweite, empty/loading/error Zustände, mobiler Reflow.                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                         | `terse-cjk`     | `full`/`ultra` -Antwort in klassischem Chinesisch (文言); `lite` bittet nur um kurze Antworten ohne Funktionswörter, Höflichkeiten oder Ausschmückungen.                                                                                                      | zh (lokal begrenzt, siehe unten)              |

Jeder Stil enthält drei Intensitätsstufen — `lite`, `full`, `ultra` — und jede Stufe endet mit der Shared-Begrenzungs-Klausel (`SHARED_BOUNDARIES` in `outputMode.ts`), die Codeblöcke, Dateipfade, Befehle, Fehler und URLs genau hält. Die Texte `terse-prose` und `terse-cjk` Ebene fügen dieser Liste Bezeichner hinzu.

`terse-cjk` ist an zwei Stellen lokal an `zh` gebunden. Die Seite „Komprimierungseinstellungen“ listet ihre Zeile nur auf, wenn die Dashboard UI Sprache Chinesisch (`zh-CN` oder `zh-TW`) ist, und `applyOutputStyles()` fügt sie nur ein, wenn die aufgelöste Sprache der Anfrage (siehe Sprachauswahl unten) `zh` ist. Durch das Ausblenden der Zeile wird eine gespeicherte `terse-cjk` Auswahl nicht gelöscht: Die Einstellungen API akzeptieren jede Stil-ID und das Speichern anderer Stile auf der Seite behält sie bei. Zum Zeitpunkt der Anforderung ist die `applyOutputStyles()` Sprachprüfung das einzige Gebietsschema-Gate.

#### So funktioniert die Injektion

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) löst die Auswahl anhand des Katalogs auf (unbekannte IDs und nicht mit dem Gebietsschema übereinstimmende Stile werden verworfen, es kommt nie zu einem Fehler; eine Auswahl, die in keinen Stil aufgelöst wird, lässt den Hauptteil unverändert und wird als `no_styles` übersprungen), verkettet die ausgewählten Anweisungen in der Katalogreihenfolge und hängt die Begrenzungsklausel an** einmal** (plus die Sicherheitsklausel `SAFETY_BOUNDARIES` oder ihre Übersetzung, wenn `less-code` oder `ponytail` ausgewählt ist) und beginnt den Block mit einem einzelnen Idempotenzmarker (`[OmniRoute Output Styles]`), sodass eine erneute Anwendung ein No-Op ist. Wenn die aufgelöste Sprache (siehe Sprachauswahl unten) über eine Übersetzung verfügt, wird die lokalisierte Anweisung anstelle von Englisch eingefügt.

Bei einem Körper mit einem nicht leeren `messages` -Array wird die Idempotenzprüfung vor der Inhaltsumgehung ausgeführt: Wenn sich die `[OmniRoute Output Styles]` Markierung bereits im `system` -Feld der obersten Ebene (einer Zeichenfolge oder einem Inhaltsblock-Array) oder in einer Systemnachricht mit Zeichenfolgeninhalt befindet, bleibt der Körper unverändert als `already_applied` und es wird keine Schlüsselwortprüfung ausgeführt. Andernfalls überprüft eine Inhaltsumgehung (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) den Text der letzten drei Nachrichten, unabhängig von ihrer Rolle, und überspringt die Stile für die gesamte Runde, wenn dieser Text mit seinen Sicherheits-, irreversiblen Aktions- oder Klarstellungsschlüsselwörtern oder einer reihenfolgesensitiven Sequenz übereinstimmt: `first`, `then`, `after that`, `before`, `rollback` oder `backup` gefolgt von `delete`, `drop`, `migrate`, `deploy` oder innerhalb von 240 Zeichen `release`. Der Bypass läuft während der** Auto-Clarity-Bypass** toggle (`cavemanOutputMode.autoClarity`, standardmäßig aktiviert) ist aktiviert; Wenn Sie den Schalter ausschalten, wird die Schlüsselwortprüfung übersprungen.

Wenn der Bypass die Kurve durchlässt, platziert `placeSystemInstruction()` (dieselbe Datei), die niemals ein neues `messages[0]` erstellt, den Block in der ersten dieser Dateien, die es findet:

1. Eine führende Systemmeldung mit Zeichenfolgeninhalt: Der Block wird nach seinem Text angehängt.
2. Das `system` -Feld der obersten Ebene: Der Block wird nach dem Text einer Zeichenfolge angehängt oder als neuer Textblock zu einem Inhaltsblock-Array hinzugefügt.
3. Die erste spätere Systemmeldung mit String-Inhalt: Der Block wird nach seinem Text angehängt.
4. Keines der oben genannten: Der Block geht am Ende von `messages` in eine neue Systemnachricht ein.

Auf einem Körper ohne ein `messages` Array (oder mit einem leeren) wird keine Inhaltsumgehung ausgeführt und ein `system` -Feld der obersten Ebene wird nicht konsultiert. Der Block wird nach dem Text eines String- `instructions` Felds angehängt, es sei denn, dieses Feld enthält bereits die `[OmniRoute Output Styles]` Markierung. In diesem Fall bleibt der Text unverändert als `already_applied`. Wenn der Körper kein String- `instructions` Feld, aber `input` (einen String oder ein Array) enthält, wird der Block zu `instructions` und ersetzt alle Nicht-String-Werte, die das Feld enthielt. Ein Körper ohne ein String- `instructions` Feld oder einen String oder ein Array `input` bleibt unverändert und wird als `no_messages` übersprungen.

#### So aktivieren Sie

Im Dashboard:** Komprimierungskontext → Komprimierungseinstellungen** (`/dashboard/context/settings`), Abschnitt „Ausgabestile“: eine Zeile pro Stil mit einem on/off -Schalter und einer Ebenenauswahl. Stile werden eingefügt, während die Komprimierung selbst aktiviert ist (der Master-Schalter der Seite, `enabled`). Der** Auto-Clarity-Bypass** Der Schalter befindet sich auf der** Höhlenmensch** Seite (`/dashboard/context/caveman`), in seiner** Ausgabemodus** Karte. Programmgesteuert behält die Komprimierungskonfiguration die Auswahl bei:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Rückkompatibilität: Während `outputStyles` leer ist, wird die alte `cavemanOutputMode.enabled` Einstellung `terse-prose` bei `cavemanOutputMode.intensity` zugeordnet. Der Block beginnt dann mit der `[OmniRoute Output Styles]` -Markierung, wo der alte `applyCavemanOutputMode()` Injektor `[OmniRoute Caveman Output Mode]` geschrieben hat. Unterhalb der Markierung entspricht der Text der Legacy-Injektion in en, pt-BR, es, de, fr, it, ru, id und vi; in ja und zh enthält es ein zusätzliches Leerzeichen vor der Boundary-Klausel. `terse-prose` übersetzt in pt-BR, es, de, fr, it, ru, zh, ja, id und vi, sodass eine Anfrage, deren aufgelöste Sprache `hu` ist, den englischen Text erhält, während der alte Injektor seinen ungarischen Text verwendet hat.

Sprachauswahl im Ausgabestil (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): Wenn `languageConfig.enabled` aktiviert ist, tastet `autoDetect` die neueste Benutzernachricht im `messages` Array der Anforderung ab, die Text (String-Inhalt oder `text` seiner Inhaltsteile) enthält, und führt den Detektor der Caveman-Engine (`detectCompressionLanguage()`) darauf aus. Der Detektor gibt `zh` für Text mit Han-Zeichen und ohne Kana zurück; andernfalls wird derjenige von `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` und `id` zurückgegeben, der die meisten Hinweisübereinstimmungen hat, und `en` wenn keiner mit — -Text übereinstimmt, den er nicht klassifizieren kann, erhält Englisch, niemals `defaultLanguage`, und `vi` wird nie erkannt, obwohl die Stile `vi` Text liefern. Der API Körper einer Antwort behält seine Runden in `input` bei, das nicht abgetastet wird, also erhält er `defaultLanguage` und dann Englisch. Wenn keine Benutzernachricht in `messages` Text enthält oder wenn `autoDetect` ausgeschaltet ist, gilt `defaultLanguage` und dann Englisch. Wenn `languageConfig.enabled` deaktiviert ist, ist die Sprache Englisch —, es sei denn, es wird eine Komprimierungskombination auf die Anforderung angewendet (eine Kombination, die der Routing-Kombination der Anforderung zugewiesen ist oder auf die standardmäßige Komprimierungskombination chatCore für die integrierte gestapelte Pipeline zurückgreift): Durch Anwenden einer Kombination wird `languageConfig.enabled` für diese Anforderung aktiviert und `defaultLanguage` aus den Sprachpaketen der Kombination festgelegt (der gespeicherte Wert, wenn es sich um eines der Pakete der Kombination handelt, andernfalls das erste Paket der Kombination, das standardmäßig `en` ist), während die gespeicherte Kombination aktiviert ist `autoDetect` (standardmäßig aktiviert) gilt weiterhin. Die Caveman-Eingabe-Engine wählt ihre Regelpaketsprache — je nach Textteil unterschiedlich aus und schaltet bei ausgeschalteter automatischer Erkennung auf `enabledPacks` um.

Die Stil- × -Sprachmatrix wird durch `tests/unit/compression/output-styles-i18n-matrix.test.ts` gepinnt: Jeder Katalogstil benötigt einen Eintrag im `BASELINE_LANGUAGES` des Tests; Ein Stil, der nicht lokal begrenzt ist, muss eine pt-BR-Übersetzung liefern (der gebietsgebundene `terse-cjk` ist von dieser Regel ausgenommen), es sei denn, er ist in `KNOWN_ENGLISH_ONLY` aufgeführt, das nur Stile ohne Übersetzungen enthalten darf. — Ein aufgelisteter Stil, der über eine Übersetzung verfügt, besteht den Test nicht. und ein Stil besteht den Test nicht, wenn er eine Sprache verliert, die in seinem `BASELINE_LANGUAGES` Eintrag aufgeführt ist. Informationen zum Hinzufügen eines Stils finden Sie [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Tool-Ergebniskomprimierung

`compressToolResult()` in `open-sse/services/compression/toolResultCompressor.ts` komprimiert Tool-Ergebnistext mit** 5 Strategien** . Es probiert sie in dieser Reihenfolge aus und die erste aktivierte Strategie, deren Prüfung mit dem Inhalt übereinstimmt, entscheidet über das Ergebnis:

1. **`fileContent`** : Inhalt von 3 oder mehr Zeilen, in denen mindestens eine Zeile, ohne Berücksichtigung des führenden Einzugs, mit `import `, `export `, `function `, `class `, `const `, `let `, `var ` oder `return ` (dem Schlüsselwort plus einem Leerzeichen) oder mit `if`, `for` oder `while` gefolgt von `(` oder ` (` beginnt, behält seine ersten 20 und letzten 5 Zeilen bei, wobei die eliminierte Mitte markiert ist.
2. **`grepSearch`** : Inhalt mit mindestens einer Zeile der Form `<path>:<digits>:`, wobei der Text vor dem ersten Doppelpunkt kein Leerzeichen enthält, behält nur diese Zeilen, höchstens 30, gefolgt von der Anzahl aller weiteren Übereinstimmungen und der Liste der übereinstimmenden Dateien; jede zweite Zeile wird gelöscht. Eine solche Zeile reicht aus, um die Strategie auszulösen, daher zählt auch eine Protokollzeile, die mit einem Zeitstempel wie `12:30:45` beginnt.
3. **`shellOutput`** : Eine Ausgabe, die eine ANSI CSI Sequenz (`ESC[` dann Ziffern oder Semikolons, dann ein Buchstabe, wie bei Farbcodes) oder ein `$` gefolgt von einem Leerzeichen an einer beliebigen Stelle im Text enthält, verliert diese Sequenzen (andere Escapezeichen wie `ESC[?25l` oder eine OSC -Fenstertitelsequenz werden beibehalten) und behält die letzten 50 Zeilen bei, wobei aufeinanderfolgende wiederholte Zeilen reduziert werden. Da diese Prüfung vor `json` und `errorMessage` ausgeführt wird, erreicht JSON oder eine Fehlerausgabe, die ein solches `$` enthält, diese niemals, solange `shellOutput` aktiviert ist.
4. **`json`** : Eine JSON Nutzlast mit mehr als 2.000 Zeichen, die mit `{` oder `[` (nach optionalem Leerzeichen) beginnt und analysiert wird, wird zusammengefasst: Ein Array mit mehr als 7 Elementen behält seine ersten 5 und letzten 2 Elemente sowie seine Gesamtanzahl, und ein Objekt behält seine ersten 20 Schlüssel, wobei jeder verschachtelte Objekt- oder Array-Wert durch einen `{…N keys}` Platzhalter (bei einem Array ist N seine Länge) und eine `_remaining_<N>_keys` Markierung ersetzt wird, die die Schlüssel zählt, die über das erste hinaus fallengelassen wurden 20. Skalare Werte werden als Ganzes kopiert, sodass ein Objekt mit 20 Schlüsseln oder weniger und ohne verschachtelte Werte nur neu eingerückt wird — ein verkleinertes Objekt mehr Zeichen erhält und unverändert bleibt.
5. **`errorMessage`** : Ausgabe, die an beliebiger Stelle und in beliebiger Groß-/Kleinschreibung `error:`, `error ` (das Wort gefolgt von einem Leerzeichen, wie in `no error found`), `[error]`, `exception:`, `exception `, `[exception]` oder `traceback` enthält, behält ihre erste Zeile, die nächsten 10 Zeilen und die letzten 3, mit einer `… [N frames elided] …` Markierung anstelle der Zeilen dazwischen. Die Markierung erscheint nur, wenn mehr als 13 Zeilen auf die erste Zeile folgen, sodass die Fehlerausgabe von 14 Zeilen oder weniger nicht gekürzt wird (bei 12 oder 13 Zeilen werden die letzten 3 Wiederholungszeilen bereits beibehalten).

Nachdem eine Strategie übereinstimmt, auch wenn sie nichts spart, werden die späteren Strategien nicht ausprobiert. Wenn die Matching-Strategie keine geschätzten Token speichert (Länge ÷ 4, aufgerundet), — zum Beispiel eine codeähnliche Datei mit 25 Zeilen oder weniger oder ein JSON Array mit mehr als 2.000 Zeichen mit 7 Elementen oder weniger — behält die aggressive Engine das ursprüngliche Tool-Ergebnis bei: Beide Aufrufer (`compressAggressive()` und `compressAnthropicToolResultBlock()`) behalten das Original, wenn `saved` 0 oder weniger ist, während `compressToolResult()` selbst immer noch die Ausgabe dieser Strategie zurückgibt. Der Tool-Ergebnis-Schritt ist nicht das letzte Wort: Der Fallback-Summierer der Engine kann eine `tool` oder `function` Nachricht, die länger als 8.192 Zeichen ist (`maxTokensPerMessage`, 2.048, mal 4), immer noch kürzen.

#### Wann zu verwenden

Die Tool-Ergebniskomprimierung ist Schritt 1 der aggressiven Engine (`compressAggressive()` in `open-sse/services/compression/aggressive.ts`), daher wird sie im aggressiven Modus und in einem `aggressive` Schritt einer gestapelten Pipeline ausgeführt. Es komprimiert OpenAI-förmige `tool` und `function` Nachrichten und den Text in Anthropic `tool_result` Blöcken. Jede Strategie verfügt unter `aggressive.toolStrategies` über einen eigenen Schalter, der standardmäßig aktiviert ist. Im Dashboard befinden sich die Schalter auf der Caveman-Seite** Fortschrittlich** Ansicht, während die Komprimierung aktiviert ist und der Standardmodus „Aggressiv“ ist.

### Gestapelte Pipeline

Der gestapelte Modus wird ausgeführt** mehrere Motoren nacheinander** — normalerweise zuerst RTK (60–90 % Einsparungen bei der Werkzeugausgabe), dann Caveman für den restlichen Text (~ 46 % Eingabeeinsparungen). Komponiert, das ist das** 78-95 % zulässiger Bereich** (siehe Upstream-Einsparungsrechnung oben): `1 - (1 - 0.60..0.90) × (1 - 0.46)` beträgt ≈ durchschnittlich 89 %.

#### Wie es funktioniert

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Wann zu verwenden

Verwenden Sie den Stapelmodus für:

- Toollastige Arbeitsabläufe (agentische Codierung, Recherche)
- Kostensensitive Batch-Verarbeitung
- Wenn Sie maximale Token-Einsparungen benötigen

Gestapelte Pipelines werden über die globale `stackedPipeline` Komprimierungseinstellung oder über eine benannte Komprimierungskombination konfiguriert, die einer Routing-Kombination zugewiesen ist (siehe Per-Combo-Override oben) — nicht über eine automatische Kombination `modePack` (dieses Feld gewichtet nur die Auswahl des automatischen Kombinationsmodells neu und `stacked` ist kein gültiger Paketname).

---

## Überschreibungen für Komprimierungskombinationen

Sie können den globalen Komprimierungsmodus **pro Kombination** überschreiben, um das Verhalten
für verschiedene Anwendungsfälle gezielt anzupassen:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Dies ist in folgenden Fällen nützlich:

- **Coding-Kombinationen**: Verwenden Sie den Modus `aggressive` für lange Sitzungen
- **Kombinationen für schnelle Fragen und Antworten**: Verwenden Sie den Modus `lite` für schnelle Antworten
- **Werkzeugintensive Kombinationen**: Verwenden Sie den Modus `stacked` für maximale Einsparungen
- **Produktionskombinationen**: Deaktivieren Sie die Überschreibung für Anbieter mit Caching — die stets aktive
  Cache-bewusste Anpassung stuft `aggressive`/`ultra` automatisch auf `standard` herab
  (es gibt keinen auswählbaren Modus `cache-aware`)

---

## Siehe auch

- [Umgebungskonfiguration](../reference/ENVIRONMENT.md) — Umgebungsvariablen für die Komprimierung
- [Architekturleitfaden](../architecture/ARCHITECTURE.md) — Interna der Komprimierungspipeline
- [Benutzerhandbuch](../guides/USER_GUIDE.md) — Erste Schritte mit der Komprimierung
- [RTK-Komprimierung](./RTK_COMPRESSION.md) — RTK-Filter, Vertrauensmodell, Prüf-Gate, Wiederherstellung der Rohausgabe
- [Komprimierungs-Engines](./COMPRESSION_ENGINES.md) — Caveman, RTK, Stacked, APIs, MCP, Dashboard
- [Format der Komprimierungsregeln](./COMPRESSION_RULES_FORMAT.md) — JSON-Format für Regelpakete
- [Sprachpakete für die Komprimierung](./COMPRESSION_LANGUAGE_PACKS.md) — Sprachspezifische Caveman-Regeln
