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

### Aus

Keine Komprimierung. Alle Nachrichten werden unverändert durchgereicht.

### Lite-Modus (~15 % Ersparnis, <1 ms Latenz)

Der sicherste Modus – keine semantische Veränderung, nur Formatierungsbereinigung:

| Technik                  | Beschreibung                                                                |
| ------------------------ | --------------------------------------------------------------------------- |
| `collapseWhitespace`     | Fasst aufeinanderfolgende Leerzeilen und Leerzeichen am Zeilenende zusammen |
| `dedupSystemPrompt`      | Entfernt doppelte Systemnachrichten                                         |
| `compressToolResults`    | Komprimiert ausführliche Tool-/Funktionsausgaben                            |
| `removeRedundantContent` | Entfernt wiederholte Anweisungen                                            |
| `replaceImageUrls`       | Kürzt Base64-Bild-Daten-URIs                                                |

**Am besten geeignet für:** Dauerbetrieb, sicherheitskritische Workflows.

### Standard-Modus (~30 % Ersparnis)

Inspiriert von [Caveman](https://github.com/JuliusBrussee/caveman) – entfernt Füllwörter und ausschweifende Formulierungen, ohne die Bedeutung zu verändern:

- Entfernt Füllwörter ("please", "I think", "basically", "actually")
- Verdichtet ausschweifende Phrasen ("in order to" → "to", "as a result of" → "because")
- Entfernt höfliche Abschwächungen ("Would you mind...", "If you could possibly...")
- Über 30 Regex-Regeln, optimiert für Coding-Prompts

**Am besten geeignet für:** Tägliche Coding-Workflows, kostenbewusste Teams.

### Aggressiver Modus (~50 % Ersparnis)

Intelligente Verlaufsverwaltung für lange Sitzungen:

- **Nachrichten-Alterung** – ältere Nachrichten werden zunehmend stärker komprimiert
- **Tool-Ergebnis-Komprimierung** – lange Tool-Ausgaben werden gekürzt oder ausgelassen (erste/letzte Zeilen,
  Match-Zeilen-Filterung, JSON-Schlüssel-Verdichtung)
- **Wächter für strukturelle Integrität** – stellt sicher, dass `tool_use`- + `tool_result`-Paare konsistent bleiben
- **Kontextfenster-Berücksichtigung** – respektiert modellspezifische Token-Limits

**Am besten geeignet für:** Längere Debugging-Sitzungen, große Codebases.

### Ultra-Modus (~75 % Ersparnis)

Maximale Komprimierung für token-kritische Szenarien:

- **Heuristisches Pruning** – Score-basiertes Token-Pruning von Fließtext
- **Strukturerhaltung** – Codeblöcke mit Fences, Inline-Code, URLs und Bezeichner werden
  als Tombstones markiert und wortgetreu wieder eingefügt, niemals entfernt
- **Optionale SLM-Stufe** – ein kleines lokales Modell kann das Pruning verfeinern, sofern konfiguriert
- Unabhängig vom aggressiven Modus: Es findet kein Message-Aging, keine Tool-Ergebnis-Komprimierung
  und kein Fallback-Summarizer statt (nur ein Fehler der SLM-Stufe kann einen Fallback-Durchlauf
  über den aggressiven Modus auslösen)

**Am besten geeignet für:** Wenn Sie wiederholt an Kontextlimits stoßen.

### RTK-Modus (60–90 % Upstream-Bereich)

Der RTK-Modus ist für ausführliche Tool-Ausgaben optimiert, die in Coding-Agent-Sitzungen anfallen:

- Erkennt Befehls-/Ausgabeklassen wie `git status`, `git diff`, `git log`, Test-Runner,
  TypeScript/Vite/Webpack-Builds, ESLint/Biome/Prettier, npm audit/Installs, Docker-Logs, Infra-Ausgaben
  und generische Shell-Ausgaben
- Wendet JSON-Filterpakete aus `open-sse/services/compression/engines/rtk/filters/` an
- Importiert RTK-TOML-Schema-v1-Filter aus Projekt- oder globalen `filters.toml`-Dateien, mit Inline-Test-
  Validierung und Trust-Gating für Projektdateien
- Wird mit 56 integrierten Filtern inklusive Inline-Verifizierungsbeispielen ausgeliefert
- Entfernt ANSI-Steuersequenzen, Fortschrittsbalken, wiederholte Zeilen und nicht umsetzbares Rauschen
- Behält Fehlschläge, Fehler, Warnungen, geänderte Dateien, Zusammenfassungen und das Ende langer Ausgaben bei
- Unterstützt trust-gesteuerte Projektfilter, globale Filter und die optionale Wiederherstellung der
  geschwärzten Rohausgabe

**Am besten geeignet für:** Agent-Sitzungen mit Shell-, Build-, Test-, Git-, Grep- und Dateiausgabe-Transkripten.

### Stacked-Modus (78–95 % bei geeigneten Inhalten)

Der Stacked-Modus führt mehrere Komprimierungs-Engines in einer deterministischen Reihenfolge aus. Die Standard-Pipeline ist:

```txt
RTK -> Caveman
```

Diese Reihenfolge komprimiert zuerst die Terminal-/Tool-Ausgabe und wendet anschließend die semantische
Verdichtung von Caveman auf den verbleibenden natürlichsprachlichen Prompt an. Stacked-Pipelines können
global oder über Komprimierungs-Combos konfiguriert werden, die Routing-Combos zugewiesen sind.

**Am besten geeignet für:** Gemischte Kontexte mit großen Tool-Logs plus menschlichen Anweisungen oder Assistenten-Zusammenfassungen.

---

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
- **RTK** — Vorschau des Befehlsfilters, RTK-Sicherheitseinstellungen und Filterkatalog
- **Komprimierungskombinationen** — benannte Engine-Pipelines, die Routing-Kombinationen zugewiesen sind
- **Schwellenwert für automatische Aktivierung** — Komprimierung automatisch aktivieren, wenn die Tokenanzahl den Schwellenwert überschreitet

### Außerkraftsetzung pro Kombination

Weisen Sie unter `Dashboard → Context & Cache → Compression Combos` einer Routing-Kombination eine Komprimierungskombination zu:

```txt
Kombination: "free-tier-fallback"
  Komprimierungskombination: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Ziele:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

So können Sie gestapelte Komprimierung bei kostenlosen bzw. Coding-Anbietern verwenden und gleichzeitig für kostenpflichtige Abonnements den Lite-Modus beibehalten.

Diese Zuweisung zur „Außerkraftsetzung pro Kombination“ ist ein anderes Steuerelement als die Außerkraftsetzung des **Komprimierungsmodus der Routing-Kombination** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — das Schema des Felds akzeptiert außerdem `rtk`, `stacked` und `omniglyph`). Diese Außerkraftsetzung wählt keine benannte Komprimierungskombinations-Pipeline aus, sondern legt lediglich das von `resolveCompressionPlan` ausgewertete Feld `compressionMode` fest. Sie kann entweder auf der Kombinationskarte (`Dashboard → Combos`) oder seit #6760 pro Routing-Kombination in der Liste „Assign to routing“ unter `Dashboard → Context & Cache → Compression Combos` festgelegt werden, direkt neben dem oben dokumentierten Kontrollkästchen für die Pipeline-Zuweisung. Beide Oberflächen speichern ihre Einstellungen über denselben Endpunkt `PUT /api/combos/{id}`.

### Außerkraftsetzung pro Anfrage

Senden Sie den Anfrage-Header `x-omniroute-compression`, um den Komprimierungsplan für eine einzelne Anfrage außer Kraft zu setzen. Er hat die höchste Priorität — er überstimmt die Außerkraftsetzung der Routing-Kombination, das aktive Profil, die automatische Aktivierung und die Standardeinstellung des Panels. Unbekannte Werte werden ignoriert (die Anfrage wird niemals abgelehnt), und der globale Hauptschalter bleibt maßgeblich: Wenn die Komprimierung global deaktiviert ist, kann sie über den Header nicht aktiviert werden. Werte:

| Wert          | Wirkung                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Keine Komprimierung für diese Anfrage.                                                                                                              |
| `default`     | Das vom Panel abgeleitete Standardprofil (ignoriert das aktive Profil). Verlustbehaftete Engines bleiben deaktiviert.                               |
| `safe`        | Entspricht dem Weglassen des Headers: nur Deduplizierung und Zusammenfassung von Leerraum.                                                          |
| `allow-lossy` | Behält den Operatorplan dieser Anfrage bei, einschließlich Zusammenfassungen, Relevanzfiltern und Stilumschreibungen.                               |
| `engine:<id>` | Eine einzelne Engine, sofern aktiviert, z. B. `engine:rtk`. Dies ist die anfragebezogene Aktivierung für diese Engine.                              |
| `<combo>`     | Eine benannte Kombination, die zuerst anhand des Namens (ohne Beachtung der Groß-/Kleinschreibung) und anschließend anhand der ID abgeglichen wird. |

Ohne `allow-lossy`, `engine:<id>` oder eine benannte Kombination werden keine verlustbehafteten Engines angewendet. Wenn die Komprimierung aktiviert ist, erhält die Anfrage weiterhin Sitzungs-Deduplizierung und eine Zusammenfassung von Leerraum.

Der angewendete Plan wird im Antwort-Header `X-OmniRoute-Compression: <mode>; source=<source>` zurückgegeben, wobei `<source>` einer der Werte `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` oder `off` ist.

### API

```bash
# Komprimierungseinstellungen abrufen
curl http://localhost:20128/api/settings/compression

# Komprimierungseinstellungen aktualisieren
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Vorschau einer bestimmten RTK-/gestapelten Nutzlast anzeigen
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

## Erweiterte Komprimierungssysteme

Über die oben beschriebenen 7 Modi hinaus (der Quellcode akzeptiert auch die Modi `codex-responses` und
`omniglyph`, die in diesem Leitfaden nicht behandelt werden) behandeln die folgenden Abschnitte Funktionen,
die innerhalb dieser Modi oder zusammen mit ihnen verwendet werden: Tool Result Compression und Progressive Aging
sind die Schritte 1 und 2 der aggressiven Engine (Aggressive-Modus und ein `aggressive`-Schritt einer
gestapelten Pipeline), die Stacked Pipeline bestimmt, wie der Stacked-Modus ausgeführt wird, Cache-Aware Compression
stuft `aggressive` und `ultra` bei Caching-Anbietern auf `standard` herunter, solange die Komprimierung
aktiviert ist, und Caveman Output Mode sowie Output Styles sind optionale, standardmäßig deaktivierte
System-Prompt-Anweisungen, die die Ausgabe des Modells formen, anstatt die Anfrage zu komprimieren.

### Cache-bewusste Komprimierung

Einige Anbieter (wie Anthropic mit Prompt-Caching) unterstützen **Prompt-Caching**,
wodurch sie Teile des Prompts zwischenspeichern können, um Kosten und Latenz zu reduzieren. Wenn
Caching aktiviert ist, kann aggressive Komprimierung die Leistung tatsächlich **verschlechtern**,
weil sie die zwischengespeicherten Tokens verändert und dadurch den Cache ungültig macht.

Das Modul `cachingAware.ts` löst dieses Problem, indem es **den Caching-Kontext erkennt** und
**die Komprimierungsstrategie entsprechend anpasst**.

#### Funktionsweise

1. **Caching-Kontext erkennen** — Durchsucht den Anfrage-Body nach `cache_control`-Markierungen
2. **Caching-Anbieter identifizieren** — Prüft, ob der Zielanbieter Caching unterstützt
3. **Strategie anpassen** — Stuft `aggressive`/`ultra` für Caching-Anbieter auf `standard` herunter
4. **System-Prompt überspringen** — System-Prompts werden üblicherweise zwischengespeichert und daher nicht komprimiert

Die Strategie-Hilfsfunktion gibt außerdem ein `deterministicOnly`-Flag zurück, doch der Plan-Builder verwendet
nur die Strategie — derzeit liest keine nachgelagerte Komponente das Flag aus.

#### Codebeispiel

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache-Markierung
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Einsatzbereich

Cache-bewusste Komprimierung ist **immer aktiviert** — es ist keine Konfiguration erforderlich. Sie wird immer dann
angewendet, wenn die Komprimierung aktiviert ist und der Zielanbieter Prompt-Caching unterstützt (Anthropic, OpenAI
usw.); explizite `cache_control`-Markierungen sind nicht erforderlich — bereits ein Caching-Anbieter
löst die Herabstufung aus, während Markierungen allein dies niemals tun (die Markierungserkennung speist
Cache-Telemetriedaten, nicht die Strategieentscheidung).

### Progressive Alterung

Lange Unterhaltungen sammeln viele Nachrichtenwechsel an, ältere Wechsel verlieren jedoch
an Relevanz. Das Modul `progressiveAging.ts` **stuft Nachrichten abhängig von ihrer Entfernung zum aktuellen Gesprächsstand herab**
(wobei die Entfernung vom Ende der Unterhaltung aus gemessen wird). Mit den mitgelieferten Standardwerten
(`verbatim: 2, light: 2, moderate: 3`):

- **Letzte 2 Wechsel (Entfernung ≤ 2)**: Werden unverändert beibehalten
- **Entfernung 3**: Caveman-Komprimierung (Entfernung von Füllwörtern)
- **Entfernung 4+**: Assistant-Nachrichten werden zusammengefasst; User-Nachrichten werden auf ihre erste
  Zeile reduziert und auf 120 Zeichen begrenzt; andere Rollen bleiben unverändert. System-Prompts, bereits gealterte
  Nachrichten und die neueste User-Nachricht werden unabhängig von der Entfernung immer unverändert beibehalten.
  Nichts wird vollständig verworfen, und das `light`-Band ist mit den mitgelieferten Standardwerten nicht erreichbar
  (`light` entspricht `verbatim`).

#### Codebeispiel

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 weitere Wechsel ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // letzte 3 Wechsel: unverändert
  light: 8, // Entfernung <= 8: leichte Komprimierung
  moderate: 20, // Entfernung <= 20: Caveman-Komprimierung
  fullSummary: 5, // vom Typ vorgeschrieben, wird vom Banding-Code nicht gelesen
  // Entfernung > 20: zusammengefasst (Assistant) / erste Zeile beibehalten (User)
});

// saved = Anzahl der eingesparten Tokens
```

#### Einsatzbereich

Progressive Alterung ist im Modus `aggressive` **immer aktiviert** — sie ist Schritt 2 von
`compressAggressive()`. Der Ultra-Modus führt sie nicht aus. Sie ist besonders effektiv für:

- Lang andauernde Coding-Sitzungen
- Mehrtägige Unterhaltungen
- Agentische Workflows mit vielen Tool-Aufrufen

### Caveman-Ausgabemodus

Der Caveman-Ausgabemodus fügt **System-Prompt-Anweisungen** hinzu, die das Modell selbst zu
knappen Ausgaben auffordern — die Stufe `lite` verlangt prägnante Antworten, die vollständige Sätze beibehalten, `full`
fordert es auf, „knapp wie ein schlauer Höhlenmensch zu antworten“, und `ultra` verlangt eine telegrammartige Ausgabe;
die Anweisungen stellen lediglich eine Aufforderung dar und können dies nicht garantieren. Anfragen erhalten sie über
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` löst die Auswahl zunächst mit dem Abwärtskompatibilitäts-Shim auf
(`resolveOutputStyleSelection()` in
`open-sse/services/compression/outputStyles/backCompat.ts`), der bei leerem `outputStyles`
einen aktivierten `cavemanOutputMode` dem Ausgabestil `terse-prose` mit der unter
`cavemanOutputMode.intensity` festgelegten Intensität zuordnet (siehe Abwärtskompatibilität unten); eine nicht leere
`outputStyles`-Auswahl wird unverändert verwendet, und `cavemanOutputMode.enabled` sowie `intensity` haben dann keine
Auswirkung, während der Schalter `autoClarity` weiterhin angewendet wird. `outputMode.ts` enthält die
Anweisungstexte (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), die Umgehung anhand des Inhalts und die
Platzierungs-Hilfsfunktion, die von der Einfügung verwendet wird; die eigene Injector-Funktion `applyCavemanOutputMode()` hat keinen
Aufrufer im Produktivcode.

#### Funktionsweise

Dieser Modus komprimiert die Eingabe nicht. Er fügt dem System-Prompt einen Anweisungsblock hinzu
(siehe Funktionsweise der Injektion unten), und jeder für die Anfrage ausgewählte Eingabekomprimierungsmodus
wird anschließend weiterhin auf den Text angewendet, der nun den Block enthält. Vor der gemeinsamen
Begrenzungsklausel, mit der jede Stufe endet, lautet die englische Stufe `full`:

> "Antworte knapp wie kluger Höhlenmensch. Lasse Artikel (der/die/das/ein/eine), Füllwörter (nur/wirklich/im Grunde/tatsächlich/einfach), Höflichkeitsfloskeln und Einschränkungen weg. Satzfragmente OK. Kurze Synonyme (groß statt umfangreich, beheben statt implementieren). Behalte alle technischen Inhalte, Code, Fehler, URLs und Bezeichner exakt bei."

Dies funktioniert besonders gut für:

- Codegenerierung (knappere Ausgabe = weniger Tokens)
- Kurze Fragen und Antworten (keine ausführlichen Erklärungen erforderlich)
- Stapelverarbeitung (maximiert den Durchsatz)

#### Verwendung

Der Caveman-Ausgabemodus ist **optional**. Wenn die Komprimierung aktiviert ist (`enabled: true`, der Hauptschalter
auf der Seite „Compression Settings“), aktivieren Sie ihn mit `cavemanOutputMode.enabled`; `intensity`
wählt `lite`, `full` oder `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Der Schalter **Output Mode** einer Komprimierungskombination (`outputMode`, Stufe in `outputModeIntensity`)
legt denselben Schalter für die Anfragen fest, auf die diese Kombination angewendet wird, und das MCP-Tool
`omniroute_set_compression_engine` schreibt ihn über sein boolesches Argument `outputMode`.
Eine nicht leere `outputStyles`-Auswahl hat Vorrang vor diesem Schalter. Im
Dashboard injiziert die Aktivierung des Ausgabestils **Terse prose** denselben Block (siehe
„Output Styles“ unten).

### Ausgabestile (Katalog)

Der oben beschriebene Caveman-Ausgabemodus ist der **veraltete Einzelstilpfad**. Phase 4 hat ihn
zu einem Katalog kombinierbarer Ausgabestile verallgemeinert: `OUTPUT_STYLE_CATALOG` in
`open-sse/services/compression/outputStyles/catalog.ts`. Jeder Stil ist eine System-Prompt-Anweisung,
die das Modell selbst zu einer kostengünstigeren Ausgabe auffordert; Stile können gemeinsam aktiviert
werden und werden in Katalogreihenfolge injiziert.

| Stil                                     | `id`            | Funktionsweise                                                                                                                                                                                                                                                                                                | Anweisungssprachen                            |
| ---------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Knappe Prosa                             | `terse-prose`   | Lässt Füllwörter/Artikel/Einschränkungen weg; behält technische Inhalte exakt bei. Derselbe Text wie beim veralteten Caveman-Ausgabemodus (referenziert, nicht erneut ausgeschrieben).                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Weniger Code                             | `less-code`     | YAGNI-Leiter: kleinste funktionierende Änderung, keine unaufgeforderten Abstraktionen.                                                                                                                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Pferdeschwanz (fauler Senior-Entwickler) | `ponytail`      | „Der beste Code ist der Code, der nie geschrieben wurde“: Wiederverwendung > Neuschreiben, Ursache > Symptom, kürzester funktionierender Diff.                                                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ich habe ADHS (Handlung zuerst)          | `i-have-adhd`   | Handlung zuerst (Befehl/Pfad/Snippet vor Prosa), nummerierte begrenzte Schritte, EIN konkreter nächster Schritt, keine Einleitung/Zusammenfassung/Schlussformeln. Adaptiert von [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop-UI-Filter                       | `antislop-ui`   | Jede visuelle Technik muss einen Zwecktest bestehen (Hierarchie, Identität, Lesbarkeit); keine standardmäßigen Farbverläufe/Glaseffekte/Leuchteffekte, begrenzte Palette, keine Vorlagenlayouts. Beide Antislop-Stile ergänzen eine Begrenzung gegen funktionslose Steuerelemente und erfundene Behauptungen. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop-Text- und Menschenfilter        | `antislop-copy` | Konkrete Texte (keine Gedankenstriche, generischen CTAs, Schlagwörter, Chatbot-Schlussformeln oder erfundenen Fakten) plus Regeln für Menschen: WCAG-AA-Kontrast, sichtbarer Fokus, Tastaturzugänglichkeit, Leer-/Lade-/Fehlerzustände, mobile Umordnung.                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Knappes CJK (文言)                       | `terse-cjk`     | Antwortet bei `full`/`ultra` in klassischem Chinesisch (文言); `lite` fordert lediglich kurze Antworten ohne Funktionswörter, Höflichkeitsfloskeln oder Ausschmückungen an.                                                                                                                                   | zh (gebietsschemaabhängig, siehe unten)       |

Jeder Stil umfasst drei Intensitätsstufen — `lite`, `full`, `ultra` — und jede Stufe
endet mit der gemeinsamen Begrenzungsklausel (`SHARED_BOUNDARIES` in `outputMode.ts`), die
Codeblöcke, Dateipfade, Befehle, Fehler und URLs exakt beibehält. Die Stufentexte von
`terse-prose` und `terse-cjk` ergänzen diese Liste um Bezeichner.

`terse-cjk` ist an zwei Stellen auf das Gebietsschema `zh` beschränkt. Die Seite „Compression Settings“ zeigt
die entsprechende Zeile nur an, wenn die Sprache der Dashboard-Benutzeroberfläche Chinesisch ist (`zh-CN` oder `zh-TW`), und
`applyOutputStyles()` injiziert den Stil nur, wenn die aufgelöste Sprache der Anfrage (siehe
Sprachauswahl unten) `zh` ist. Das Ausblenden der Zeile löscht eine gespeicherte `terse-cjk`-Auswahl nicht:
Die Einstellungs-API akzeptiert jede Stil-ID, und beim Speichern anderer Stile auf der Seite bleibt sie erhalten. Zur
Anfragezeit ist die Sprachprüfung von `applyOutputStyles()` die einzige Gebietsschemabeschränkung.

#### Funktionsweise der Injektion

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) gleicht
die Auswahl mit dem Katalog ab (unbekannte IDs und Stile mit abweichender Locale werden
verworfen, ohne dass ein Fehler auftritt; wenn eine Auswahl zu keinem Stil aufgelöst
wird, bleibt der Body unverändert und wird als `no_styles` übersprungen), verkettet die
ausgewählten Anweisungen in der Reihenfolge des Katalogs, hängt die Begrenzungsklausel
**einmal** an (zusammen mit der Sicherheitsklausel, `SAFETY_BOUNDARIES` oder deren
Übersetzung, wenn `less-code` oder `ponytail` ausgewählt ist) und beginnt den Block mit
einem einzelnen Idempotenzmarker (`[OmniRoute Output Styles]`), sodass eine erneute
Anwendung keine Änderung bewirkt. Wenn für die aufgelöste Sprache (siehe
Sprachauswahl unten) eine Übersetzung vorhanden ist, wird statt der englischen
Anweisung die lokalisierte Anweisung eingefügt.

Bei einem Body mit einem nicht leeren `messages`-Array wird die Idempotenzprüfung vor
dem inhaltsbasierten Umgehen ausgeführt: Wenn der Marker
`[OmniRoute Output Styles]` bereits im `system`-Feld der obersten Ebene (als String oder
Content-Block-Array) oder in einer Systemnachricht mit String-Inhalt vorhanden ist,
bleibt der Body als `already_applied` unverändert, und es wird keine Schlüsselwortprüfung
ausgeführt. Andernfalls prüft ein inhaltsbasiertes Umgehen
(`shouldBypassCavemanOutputMode()` in
`open-sse/services/compression/outputMode.ts`) den Text der letzten drei Nachrichten,
unabhängig von deren Rolle, und überspringt die Stile für den gesamten Turn, wenn dieser
Text mit Schlüsselwörtern zu Sicherheit, irreversiblen Aktionen oder Rückfragen
übereinstimmt oder eine reihenfolgeabhängige Sequenz enthält: `first`, `then`,
`after that`, `before`, `rollback` oder `backup`, worauf innerhalb von 240 Zeichen
`delete`, `drop`, `migrate`, `deploy` oder `release` folgt. Das Umgehen wird ausgeführt,
solange der Schalter **Auto-Clarity Bypass** (`cavemanOutputMode.autoClarity`,
standardmäßig aktiviert) eingeschaltet ist; wird der Schalter ausgeschaltet, wird die
Schlüsselwortprüfung übersprungen.

Wenn das Umgehen den Turn passieren lässt, platziert `placeSystemInstruction()` (in
derselben Datei), das niemals ein neues `messages[0]` erstellt, den Block an der ersten
der folgenden gefundenen Stellen:

1. Eine führende Systemnachricht mit String-Inhalt: Der Block wird nach ihrem Text
   angehängt.
2. Das `system`-Feld der obersten Ebene: Der Block wird nach dem Text eines Strings
   angehängt oder einem Content-Block-Array als neuer Textblock hinzugefügt.
3. Die erste nachfolgende Systemnachricht mit String-Inhalt: Der Block wird nach ihrem
   Text angehängt.
4. Keine der obigen Stellen: Der Block wird in eine neue Systemnachricht am Ende von
   `messages` eingefügt.

Bei einem Body ohne `messages`-Array (oder mit einem leeren Array) wird kein
inhaltsbasiertes Umgehen ausgeführt, und ein `system`-Feld der obersten Ebene wird nicht
berücksichtigt. Der Block wird nach dem Text eines als String vorliegenden
`instructions`-Felds angehängt, sofern dieses Feld nicht bereits den Marker
`[OmniRoute Output Styles]` enthält; in diesem Fall bleibt der Body als
`already_applied` unverändert. Wenn der Body kein als String vorliegendes
`instructions`-Feld besitzt, aber `input` enthält (einen String oder ein Array), wird
der Block zu `instructions` und ersetzt dabei jeden dort zuvor vorhandenen
Nicht-String-Wert. Ein Body, der weder ein als String vorliegendes `instructions`-Feld
noch ein als String oder Array vorliegendes `input` besitzt, bleibt unverändert und
wird als `no_messages` übersprungen.

#### Aktivierung

Im Dashboard: **Kompressionskontext → Kompressionseinstellungen**
(`/dashboard/context/settings`), Abschnitt „Ausgabestile“: eine Zeile pro Stil mit
einem Ein/Aus-Schalter und einer Stufenauswahl. Stile werden eingefügt, während die
Kompression selbst aktiviert ist (der Hauptschalter der Seite, `enabled`). Der Schalter
**Auto-Clarity Bypass** befindet sich auf der Seite **Caveman**
(`/dashboard/context/caveman`) in deren Karte **Output Mode**. Programmatisch speichert
die Kompressionskonfiguration die Auswahl wie folgt:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Abwärtskompatibilität: Solange `outputStyles` leer ist, wird die ältere Einstellung
`cavemanOutputMode.enabled` auf `terse-prose` mit
`cavemanOutputMode.intensity` abgebildet. Der Block beginnt dann mit dem Marker
`[OmniRoute Output Styles]`, während der ältere Injector
`applyCavemanOutputMode()` den Marker `[OmniRoute Caveman Output Mode]` einfügte.
Unterhalb des Markers entspricht der Text in en, pt-BR, es, de, fr, it, ru, id und vi
der älteren Einfügung; in ja und zh enthält er vor der Begrenzungsklausel ein
zusätzliches Leerzeichen. `terse-prose` wird in pt-BR, es, de, fr, it, ru, zh, ja, id
und vi übersetzt, sodass eine Anfrage, deren aufgelöste Sprache `hu` ist, den englischen
Text erhält, während der ältere Injector den ungarischen Text verwendete.

Sprachauswahl für Ausgabestile (`resolveOutputStyleLanguage()` in
`outputStyles/apply.ts`): Wenn `languageConfig.enabled` aktiviert ist, nimmt
`autoDetect` die neueste Benutzernachricht mit Text aus dem `messages`-Array der Anfrage
(als String-Inhalt oder als `text` ihrer Inhaltsteile) und führt darauf die Erkennung
der Caveman-Engine (`detectCompressionLanguage()`) aus. Die Erkennung gibt `zh` für Text
mit Han-Zeichen und ohne Kana zurück; andernfalls gibt sie diejenige Sprache unter
`it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` und `id` zurück, die die meisten
Übereinstimmungen mit Sprachhinweisen aufweist, und `en`, wenn keine übereinstimmen —
Text, den sie nicht klassifizieren kann, erhält Englisch, niemals `defaultLanguage`,
und `vi` wird nie erkannt, obwohl die Stile Text in `vi` enthalten. Ein Body der
Responses API hält seine Turns in `input`, das nicht als Stichprobe verwendet wird,
und erhält daher `defaultLanguage`, anschließend Englisch. Wenn keine
Benutzernachricht in `messages` Text enthält oder `autoDetect` ausgeschaltet ist, wird
`defaultLanguage` verwendet, anschließend Englisch. Wenn `languageConfig.enabled`
ausgeschaltet ist, ist die Sprache Englisch — es sei denn, für die Anfrage gilt eine
Kompressionskombination (eine Kombination, die der Routing-Kombination der Anfrage
zugewiesen ist, oder die standardmäßige Kompressionskombination, auf die chatCore für
die integrierte gestapelte Pipeline zurückgreift): Durch Anwenden einer Kombination
wird `languageConfig.enabled` für diese Anfrage aktiviert und `defaultLanguage` anhand
der Sprachpakete der Kombination festgelegt (der gespeicherte Wert, wenn er zu den
Paketen der Kombination gehört, andernfalls das erste Paket der Kombination, das
standardmäßig `en` ist), während das gespeicherte `autoDetect` (standardmäßig
aktiviert) weiterhin gilt. Die Caveman-Eingabe-Engine wählt die Sprache ihres
Regelpakets anders aus — pro Textteil und bei ausgeschalteter automatischer Erkennung
abhängig von `enabledPacks`.

Die Stil-×-Sprachen-Matrix wird durch
`tests/unit/compression/output-styles-i18n-matrix.test.ts` festgeschrieben: Jeder Katalogstil benötigt einen
Eintrag in `BASELINE_LANGUAGES` des Tests; ein Stil, der nicht auf bestimmte Gebietsschemata beschränkt ist, muss mit einer
pt-BR-Übersetzung ausgeliefert werden (der auf bestimmte Gebietsschemata beschränkte Stil `terse-cjk` ist von dieser Regel ausgenommen), sofern er nicht
in `KNOWN_ENGLISH_ONLY` aufgeführt ist. Dort dürfen nur Stile ohne jegliche Übersetzungen enthalten sein —
ein aufgeführter Stil, für den irgendeine Übersetzung vorhanden ist, lässt den Test fehlschlagen; außerdem schlägt der Test für einen Stil fehl, wenn
eine Sprache verloren geht, die in seinem Eintrag unter `BASELINE_LANGUAGES` aufgeführt ist. Informationen zum Hinzufügen eines Stils finden Sie unter
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Komprimierung von Tool-Ergebnissen

`compressToolResult()` in `open-sse/services/compression/toolResultCompressor.ts`
komprimiert den Text von Tool-Ergebnissen mit **5 Strategien**. Sie werden in dieser Reihenfolge ausprobiert, und die
erste aktivierte Strategie, deren Prüfung auf den Inhalt zutrifft, bestimmt das Ergebnis:

1. **`fileContent`**: Bei Inhalten mit mindestens 3 Zeilen, von denen mindestens eine Zeile ohne Berücksichtigung
   führender Einrückungen mit `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` oder `return ` beginnt (das Schlüsselwort gefolgt von einem Leerzeichen), oder mit `if`,
   `for` oder `while`, gefolgt von `(` oder ` (`, werden die ersten 20 und letzten 5 Zeilen beibehalten und
   der ausgelassene Mittelteil markiert.
2. **`grepSearch`**: Bei Inhalten mit mindestens einer Zeile der Form `<path>:<digits>:`,
   wobei der Text vor dem ersten Doppelpunkt keine Leerzeichen enthält, werden nur diese Zeilen beibehalten,
   höchstens 30, gefolgt von der Anzahl etwaiger weiterer Treffer und der Liste der Dateien mit Treffern;
   alle anderen Zeilen werden verworfen. Eine solche Zeile genügt, um die Strategie auszulösen, daher
   zählt auch eine Protokollzeile, die mit einem Zeitstempel wie `12:30:45` beginnt.
3. **`shellOutput`**: Bei Ausgaben, die eine ANSI-CSI-Sequenz (`ESC[`, gefolgt von Ziffern oder
   Semikolons und anschließend einem Buchstaben, wie bei Farbcodes) oder irgendwo im Text ein `$` gefolgt von einem Leerzeichen
   enthalten, werden diese Sequenzen entfernt (andere Escape-Sequenzen wie `ESC[?25l` oder eine
   OSC-Fenstertitelsequenz bleiben erhalten) und die letzten 50 Zeilen beibehalten, wobei aufeinanderfolgende
   wiederholte Zeilen zusammengefasst werden. Da diese Prüfung vor `json` und `errorMessage` ausgeführt wird,
   werden JSON- oder Fehlerausgaben, die ein solches `$` enthalten, nie von diesen Strategien verarbeitet, solange
   `shellOutput` aktiviert ist.
4. **`json`**: Eine JSON-Nutzlast mit mehr als 2.000 Zeichen, die (nach optionalen
   Leerzeichen) mit `{` oder `[` beginnt und erfolgreich geparst werden kann, wird zusammengefasst: Bei einem Array mit mehr als 7 Elementen werden
   die ersten 5 und letzten 2 Elemente sowie die Gesamtzahl beibehalten, und bei einem Objekt werden die ersten 20
   Schlüssel beibehalten, wobei jeder Wert eines verschachtelten Objekts oder Arrays durch einen Platzhalter `{…N keys}`
   ersetzt wird (bei einem Array ist N dessen Länge) und eine Markierung `_remaining_<N>_keys` die Anzahl der
   nach den ersten 20 verworfenen Schlüssel angibt. Skalare Werte werden vollständig kopiert, sodass ein Objekt mit höchstens 20 Schlüsseln
   ohne verschachtelte Werte lediglich neu eingerückt wird — ein minimiertes Objekt wird dadurch länger
   und bleibt unverändert.
5. **`errorMessage`**: Bei Ausgaben, die an beliebiger Stelle und unabhängig von Groß- und Kleinschreibung `error:`,
   `error ` (das Wort gefolgt von einem Leerzeichen, wie in `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` oder `traceback` enthalten, werden die erste Zeile, die
   nächsten 10 Zeilen und die letzten 3 beibehalten; anstelle der dazwischenliegenden Zeilen wird eine Markierung
   `… [N frames elided] …` eingefügt. Die Markierung erscheint nur, wenn nach der ersten Zeile mehr als 13 Zeilen
   folgen, sodass Fehlerausgaben mit höchstens 14 Zeilen nicht gekürzt werden (bei 12 oder 13 Zeilen
   wiederholen die letzten 3 bereits beibehaltene Zeilen).

Nachdem eine Strategie zutrifft, werden spätere Strategien nicht mehr
ausprobiert, selbst wenn die Strategie keine Einsparung erzielt. Wenn die passende Strategie keine geschätzten Token einspart (Länge ÷ 4, aufgerundet) —
beispielsweise bei einer codeähnlichen Datei mit höchstens 25 Zeilen oder einem JSON-Array mit mehr als 2.000
Zeichen und höchstens 7 Elementen — behält die aggressive Engine das ursprüngliche Tool-Ergebnis bei:
Beide Aufrufer (`compressAggressive()` und `compressAnthropicToolResultBlock()`)
behalten das Original bei, wenn `saved` 0 oder weniger beträgt, während `compressToolResult()` selbst weiterhin
die Ausgabe dieser Strategie zurückgibt. Der Tool-Ergebnis-Schritt ist nicht die letzte Instanz: Der
Fallback-Zusammenfasser der Engine kann eine `tool`- oder `function`-Nachricht mit mehr als 8.192 Zeichen
(`maxTokensPerMessage`, 2.048, multipliziert mit 4) dennoch kürzen.

#### Wann verwenden

Die Komprimierung von Tool-Ergebnissen ist Schritt 1 der aggressiven Engine (`compressAggressive()` in
`open-sse/services/compression/aggressive.ts`), daher wird sie im aggressiven Modus und in einem
`aggressive`-Schritt einer gestapelten Pipeline ausgeführt. Sie komprimiert `tool`- und `function`-Nachrichten
im OpenAI-Format sowie den Text innerhalb von Anthropic-`tool_result`-Blöcken. Jede Strategie verfügt über einen eigenen
Schalter unter `aggressive.toolStrategies`; standardmäßig sind alle aktiviert. Im Dashboard befinden sich die
Schalter in der Ansicht **Advanced** der Caveman-Seite, wenn die Komprimierung aktiviert und der
Standardmodus auf „Aggressive“ eingestellt ist.

### Gestapelte Pipeline

Der gestapelte Modus führt **mehrere Engines nacheinander** aus — üblicherweise zuerst RTK
(60–90 % Einsparung bei Tool-Ausgaben), dann Caveman für den verbleibenden Text (~46 % Einsparung
bei der Eingabe). Kombiniert ergibt sich daraus der **zulässige Bereich von 78–95 %** (siehe oben „Upstream Savings Math“):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` ergibt durchschnittlich ≈89 %.

#### Funktionsweise

```
Eingabe (1000 Token)
  → RTK (befehlsabhängiger Filter) → 200 Token
    → Caveman (Entfernung von Fülltext) → 108 Token
  → Ausgabe (108 Token, ~89 % Einsparung)
```

#### Wann verwenden

Verwenden Sie den gestapelten Modus für:

- Tool-intensive Workflows (agentenbasiertes Programmieren, Recherche)
- Kostensensible Stapelverarbeitung
- Situationen, in denen Sie maximale Token-Einsparungen benötigen

Gestapelte Pipelines werden über die globale Komprimierungseinstellung `stackedPipeline`
oder über eine benannte Komprimierungskombination konfiguriert, die einer Routing-Kombination zugewiesen ist (siehe
oben „Per-Combo Override“) — nicht über `modePack` einer automatischen Kombination (dieses Feld
gewichtet lediglich die Modellauswahl für automatische Kombinationen neu, und `stacked` ist kein gültiger Paketname).

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
