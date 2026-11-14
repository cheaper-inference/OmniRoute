# Cost & Spend Tracking (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇧🇦 [bs](../../../bs/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Wie OmniRoute die Kosten jeder Anfrage schätzt, erfasst und ausgibt — und warum die
Zahl im Dashboard ein **Einsparungstracker** und keine Rechnung ist.

Siehe auch: [Benutzerhandbuch](./USER_GUIDE.md) · [Funktionsübersicht](./FEATURES.md)

---

## Was es ist (und was nicht)

OmniRoute ordnet jeder Vervollständigung Kosten in USD pro Anfrage zu, indem die Anzahl
der Token mit den Preissätzen eines Modells multipliziert wird. Diese Zahlen bilden die
Grundlage für das **Kosten**-Dashboard, die CLI-Befehle `omniroute cost` /
`omniroute usage`, CSV-/JSON-Exporte und Budgets pro API-Schlüssel.

> **Die „Kosten“ im Dashboard sind ein Einsparungstracker und keine Rechnung.** OmniRoute
> stellt Ihnen niemals etwas in Rechnung — es leitet Ihre Anfragen an Anbieter weiter,
> die Sie bereits verbunden haben (Ihre eigenen Abonnements, kostenlosen Kontingente und
> API-Schlüssel). Wenn „Gesamtkosten von $290“ ausschließlich durch kostenlose Modelle
> entstanden sind, bedeutet das, dass Sie ungefähr **$290 _nicht_ an eine kostenpflichtige
> API gezahlt haben**. Der Betrag ist eine _Schätzung_ dessen, was derselbe Datenverkehr
> zu den regulären Listenpreisen gekostet hätte. So können Sie erkennen, worauf sich Ihre
> Nutzung konzentriert und wie viel Sie durch die Weiterleitung an günstigere oder
> kostenlose Anbieter einsparen.

Diese Einordnung wird direkt in der [README](../../README.md) des Projekts erläutert
(„die ‚Kosten‘ im Dashboard sind ein Einsparungstracker und keine Rechnung“).

Da es sich bei der Zahl um eine Schätzung handelt:

- Sie hängt von der Preistabelle ab, die OmniRoute für jedes Modell verwendet. Ein Modell
  ohne Preiseintrag verursacht Kosten von `0` (im Explorer wird es als Zeile
  „Legacy / Kostenlos“ angezeigt).
- Auch Datenverkehr über kostenlose Kontingente und Abonnements verursacht _geschätzte_
  Kosten — dies ist der Betrag, den Sie einsparen, und kein geschuldeter Betrag.

---

## Wie die Kosten geschätzt werden

### Die Preisquelle

Die Kosten stammen aus der zusammengeführten Preistabelle in [`src/lib/db/settings/pricing.ts`](../../src/lib/db/settings/pricing.ts), in dieser Rangfolge (** Höchste zuerst** ):

1. **Benutzerüberschreibungen** — Preise, die im Dashboard oder über `PATCH /api/pricing` (den `pricing` Namespace) festgelegt werden.
2. **models.dev-Synchronisierung** — Preise werden von `https://models.dev/api.json` (dem `models_dev_pricing` Namespace) abgerufen.
3. **LiteLLM Synchronisierung** — Preise werden aus dem öffentlichen `model_prices_and_context_window.json` von LiteLLM(dem `pricing_synced` Namespace) abgerufen.
4. **Hartcodierte Standardeinstellungen** — Preise werden in [`src/shared/constants/pricing/`](../../src/shared/constants/pricing/) versendet.

Bei gleichem provider/model überschreiben Werte aus Ebenen mit höherer Priorität übereinstimmende Felder in niedrigeren Ebenen. Felder, die in einer oberen Schicht fehlen, können dennoch aus einer unteren Schicht stammen. Die Reihenfolge bleibt auch dann festgelegt, wenn beide unabhängigen Synchronisierungsjobs gleichzeitig ausgeführt werden. `GET /api/pricing?includeSources=1` gibt `pricing` und `sourceMap` zurück, deren modellspezifische Beschriftungen (`user`, `modelsDev`, `litellm`, `default`) die Ebene mit der höchsten Priorität identifizieren, die dieses Modell enthält.

**LiteLLM Synchronisierung** ist Opt-in und standardmäßig deaktiviert. Seine Umgebungsvariablen (siehe [`.env.example`](../../.env.example) ) sind:

| Umgebungsvar            | Standard  | Zweck                                                                                  |
| ----------------------- | --------- | -------------------------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`   | Aktivieren Sie LiteLLM Preissynchronisierung im Hintergrund.                           |
| `PRICING_SYNC_INTERVAL` | `86400`   | Synchronisierungsintervall in Sekunden (täglich).                                      |
| `PRICING_SYNC_SOURCES`  | `litellm` | Quellenauswahl nur für diese Synchronisierung; Derzeit wird nur `litellm` unterstützt. |

**models.dev-Synchronisierung** ist von der LiteLLM -Synchronisierung getrennt und standardmäßig ebenfalls deaktiviert. Aktivieren Sie es in den Einstellungen (models.dev sync) oder verwenden Sie diese Variablen:

| Umgebungsvar               | Standard     | Zweck                                                                                                                                                                                |
| -------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MODELS_DEV_SYNC_ENABLED`  | _(unscharf)_ | Unscharf folgt dem Umschalten der Einstellungen; `1/true/on/yes` erzwingt das Einschalten und `0/false/off/no` erzwingt das Ausschalten (auch wenn die Einstellungen es aktivieren). |
| `MODELS_DEV_SYNC_INTERVAL` | `86400`      | Standardmäßiges models.dev-Synchronisierungsintervall in Sekunden (täglich).                                                                                                         |

`PRICING_SYNC_SOURCES` tut es** nicht** models.dev aktivieren; Es steuert nur die LiteLLM Synchronisierung. Durch das Löschen einer Benutzerüberschreibung wird keiner der synchronisierten Namespaces gelöscht. die nächste verfügbare Preisebene wird wirksam. Überprüfen Sie bei einem Modell ohne Preis sowohl die Synchronisierungseinstellungen als auch den `sourceMap`, bevor Sie eine manuelle Überschreibung hinzufügen.

### Die Kostenformel

Die Kosten werden pro Anfrage aus der Anzahl der Token und den Raten pro Million Token in [`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts) (`computeCostFromPricing` / `calculateCost`) berechnet:

- **Eingabe-Tokens** (abzüglich Cache-Lesevorgänge und Cache-Erstellungstoken) × `input` Rate.
- **Cache-Lese-Token** × `cached` Rate (fällt auf die Eingaberate zurück).
- **Token zur Cache-Erstellung** × `cache_creation` Rate (fällt auf die Eingaberate zurück).
- **Ausgabetoken** × `output` Rate.
- **Argumentationsmarken** × `reasoning` Rate (fällt auf die Ausgaberate zurück).

Alle Preise werden als USD pro 1.000.000 Token interpretiert. Eine Codex Dienststufe „Schnell“/„Priorität“ oder „Flex“ wendet einen Kostenmultiplikator (`getCodexFastCostMultiplier`) an. —. B. Flex wird mit einem Token-Rabatt von 50 % abgerechnet, angezeigt als** Flex-Einsparungen** im Armaturenbrett.

Modellnamen werden zuerst normalisiert (Anbieterpfadpräfixe wie `openai/` oder `accounts/fireworks/models/` werden entfernt), sodass historische Zeilen immer noch einem Preis entsprechen.

### Wie Ausgaben erfasst werden

- Die Kosten pro Anfrage werden bei Abschluss der Anfrage berechnet. Der Verbrauch gemeinsamer Kontingente wird beim nächsten Ereignisschleifen-Tick über [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts) geplant.
- API-Schlüsselausgaben werden vom [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) stapelweise gepuffert und geleert (Standard-Flush-Intervall von 60 Sekunden, Puffer für 1.000 Einträge). Einstellbar über:

  | Umgebungsvar                        | Standard | Zweck                                   |
  | ----------------------------------- | -------- | --------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000`  | Spülintervall in Millisekunden.         |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`   | Max. gepufferte Einträge vor dem Flush. |

Die Kosten bevorzugen eine exakte, vom Anbieter gemeldete Gebühr (`provider_cost_usd`), dann einen Anfrage-Snapshot zum Katalogpreis (`calculated_cost_usd`) und dann eine Token-Neubewertung aus dem aktuellen Katalog. Gespeicherte Kosten werden nicht erneut durch ihre Token-Zählungen belastet. Ältere Nur-Token-Zeilen ändern sich weiterhin, wenn sich ihr Katalogpreis ändert.

### OCR und Einbettungen

- Erfolgreiche `/v1/ocr` -Anfragen verwenden Upstream- `usage_info.pages_processed`, nicht den angeforderten Seitenbereich oder die Anzahl der zurückgegebenen Seitenobjekte. Die Schätzung beträgt Seiten × `ocr_cost_per_page` (absolute USD/page,** nicht** USD/million).
- Für Anfragen mit Dokument- oder Bounding-Box-Anmerkungen ist ein separater `ocr_cost_per_annotated_page` Tarif erforderlich. Ohne sie bleiben die Kosten unbekannt; Der normale OCR Tarif wird nicht stillschweigend ersetzt.
- LiteLLM sync ordnet sein Upstream- `annotation_cost_per_page` Feld `ocr_cost_per_annotated_page` zu und behält dabei den absoluten USD/page Wert und reine Annotationseinträge, einschließlich der expliziten Null, bei. Ein angegebenes kanonisches Feld hat Vorrang; Ungültige Aliaswerte werden ignoriert. Benutzerpreisüberschreibungen behalten ihre normale Priorität. Sehen Sie sich [OCR Preisschlüssel von LiteLLM](https://docs.litellm.ai/docs/providers/mistral_batches#batch-ocr-cost-tracking) an.
- OCR -Nutzung speichert die Seitenanzahl, den Stückpreis, die berechneten USD Kosten, API -Schlüssel und die ausgewählte Verbindung. Seiten werden niemals als Token dargestellt. Anrufprotokolle enthalten Abrechnungsmetadaten, keine Dokument- URLs, PDF -Bytes oder extrahierten Text.
- Erfolgreiche `/v1/embeddings` -Anfragen zeichnen eine Nutzungszeile pro physischem Batch auf, einschließlich separater Batches, die in derselben Millisekunde abgeschlossen wurden. Vom Anbieter gemeldete Gebühren haben Vorrang vor Token-Schätzungen; Für Combo-Wrapper wird keine Gebühr erhoben.
- Der Nutzungsverlauf, die Kostenanalyse, provider/account Fenster, Ausgabenlimits für API-Schlüssel, das Anforderungs-Kosten-Ledger und die täglichen Nutzungs-Rollups umfassen diese Gebühren. No-Log-Schlüssel behalten die numerische Abrechnung bei, ohne den Quelltext beizubehalten.
- Fehlende Nutzungen oder Tarife liegen vor** unbekannt** , nicht kostenlos: Der Response-Cost-Header wird weggelassen und die bestehende Richtlinie zur unbezahlten Nutzung gilt für begrenzte API Schlüssel. Explizit konfigurierte Zero-Tarife behalten ihre Gültigkeit bei der Null-Kosten-Nutzung.

Hierbei handelt es sich um eine reine Vorwärtsrechnung. Alte OCR/embedding -Aufrufe, die nie einen Nutzungsverlauf geschrieben haben, können aus dieser Migration nicht rekonstruiert werden. Katalogschätzungen sind USD Schätzungen, keine Rechnungen und beinhalten keine Währungsumrechnung, Steuern oder Rabatte.

### Sprache und Bilder

- Erfolgreiche `/v1/audio/transcriptions`, `/v1/audio/speech` und Bildgenerierungsversuche teilen sich die numerische Abrechnung. Direkt- und Kombinationsanrufe enthalten die API -Taste des Anrufers und die ausgewählte Verbindung. Ein Combo-Wrapper fügt niemals eine zweite Belastung hinzu.
- Vom Anbieter gemeldete USD -Lösungen gewinnen gegenüber einer Katalogschätzung, einschließlich einer expliziten Nullgebühr. OpenRouterJSON `usage.cost` wird auf `cost_usd` normalisiert. Andernfalls verwenden gemessene Token Token-Preise, Transkriptionssekunden verwenden Sekundenpreise, Spracheingaben verwenden Unicode-Zeichenanzahlen und Pauschalpreisbilder verwenden die tatsächlich zurückgegebene Anzahl, nicht die angeforderte `n`.
- Binäres OpenRouter TTS hat keinen JSON Nutzungskörper. Nachdem der Ton beendet ist oder der Anrufer abgebrochen hat, fragt OmniRoute seine Generierung ID auf dem ab** Dasselbe** OpenRouter Ursprung konfiguriert. Eine EU Anfrage greift niemals auf den globalen Ursprung zurück. Dies ist eine begrenzte, schreibgeschützte Suche. Die Synthese wird für die Buchhaltung nicht wiederholt. Abrechnungsdatensätze können angezeigt werden, nachdem die Audiowiedergabe beendet ist: Suchversuche werden bis zu etwa 52 Sekunden lang im Hintergrund ausgeführt, einschließlich Netzwerkfristen.
- Während dieser Suche enthält die Audioantwort `X-OmniRoute-Cost-Status: pending` und keinen Antwortkosten-Header. Die endgültige Gebühr erscheint nach dem Abgleich im Nutzungsverlauf, in der Analyse und im Hauptbuch. Wenn Metadaten nicht verfügbar sind, wird ein konfigurierter Tarif-Snapshot verwendet; andernfalls bleiben die Kosten unbekannt.
- Sekunden-, Zeichen- und Bildanzahlen verfügen über separate Abrechnungseinheitenfelder, niemals gefälschte Token-Zählungen. Bei der Buchhaltung werden nur numerische Verwendungen gespeichert, keine Sprachtexte, Transkripte oder Bildbytes. Bestehende Ausnahmen für unbezahlte Bilder bleiben unverändert: Ein wirklich fehlender Bildtarif sperrt einen begrenzten Schlüssel nicht neu, und in der Antwort wird der Kostenkopf weggelassen, anstatt den Anruf als kostenlos zu erklären. Bei einem Preisspeicherfehler bleiben weiterhin Nutzungsnachweise für die Durchsetzung bei Fail-Closing erhalten.

Es wird keine historische speech/image Ladung erfunden oder aufgefüllt. Die Rechnungsstellung des Anbieters bleibt die Referenz für Rechnungen und für Anrufe, deren Gebühr nicht gemeldet wurde.

---

## Dashboard: die Kostenseite

Die Seite **Kosten** befindet sich unter `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Ihre Hauptansicht ist der Tab **Kostenübersicht**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
der alle Daten über `GET /api/usage/analytics` lädt.

Angezeigte Inhalte:

- **Ausgabenkacheln** — geschätzte Ausgaben für _Heute (1d)_, _7d_, _30d_ und den ausgewählten
  Zeitraum. Zeitraumsauswahl: `7d`, `30d`, `90d`, `all`.
- **Hauptmetriken** — Anfragen im Zeitraum, aktive Anbieter, aktive Modelle, durchschnittliche
  Kosten pro Anfrage.
- **Kosten-Explorer** — eine sortier- und filterbare Tabelle, gruppiert nach **Anbieter**, **Modell**,
  **API-Schlüssel**, **Konto** oder **Service-Tarif**, mit Kosten, Anfragen, Tokens, durchschnittlichen
  Kosten pro Anfrage und prozentualem Anteil an den Gesamtkosten.
- **Token-Nutzung** — Gesamt-, Eingabe- und Ausgabe-Tokens sowie das Verhältnis von Eingabe zu Ausgabe.
- **Routing-Effizienz** — Anzahl der Fallbacks, Fallback-Rate und Abdeckung der angeforderten Modelle.
- **Monatliche Prognose** — prognostiziert die Ausgaben bis zum Monatsende anhand des jüngsten Tagesdurchschnitts.
- **Zeitraumvergleich** — prozentuale Veränderung zwischen der ersten und zweiten Hälfte des Zeitraums.
- **Diagramme** — täglicher Kostenverlauf, Anbieteranteil (Kreisdiagramm), Top-Anbieter, Top-Modelle, Kosten
  nach API-Schlüssel, Kosten nach Konto, wöchentliches Nutzungsmuster und eine Aktivitäts-Heatmap.
- **Export** — lädt den aktuellen Zeitraum als **CSV** oder **JSON** herunter (die Schaltflächen werden angezeigt,
  sobald Kostendaten ungleich null vorhanden sind).

Wenn kein Traffic mit Preisinformationen vorhanden ist, zeigen Zeilen anstelle von `$0` die Kennzeichnung „Legacy / Kostenlos“ an,
entsprechend dem Modell des Einsparungs-Trackers.

### Zugehörige Kosten-Unterseiten

Der Kostenbereich enthält außerdem folgende Seiten (alle unter `/dashboard/costs/`):

- **Preisgestaltung** (`/dashboard/costs/pricing`) — Preise pro Modell anzeigen und überschreiben (rendert
  den gemeinsamen Preisgestaltungs-Tab).
- **Budget** (`/dashboard/costs/budget`) — Ausgabenlimits pro Geltungsbereich festlegen (rendert den gemeinsamen
  Budget-Tab).
- **Kontingentfreigabe** (`/dashboard/costs/quota-share`) — gemeinsam genutzte Kontingentpools und Ansichten
  der Verbrauchsrate.

---

## API Endpunkte

Alle diese erfordern eine Verwaltungsauthentifizierung (loopback/JWT, über `requireManagementAuth`), sofern nicht anders angegeben.

### Nutzungs- und Kostenanalyse

| Verfahren | Endpunkt                 | Zweck                                                                                                                                                                     |
| --------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`     | `/api/usage/analytics`   | Vollständige cost/usage Analyse: Zusammenfassung, Tagestrend, nach provider/model/API key/account/tier. Abfrage: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`     | `/api/usage/utilization` | Kontingentauslastung pro Anbieter im Zeitverlauf. Abfrage: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                                   |
| `GET`     | `/api/usage/history`     | Rohe Nutzungsverlaufszeilen.                                                                                                                                              |
| `GET`     | `/api/usage/call-logs`   | Anrufprotokolle pro Anfrage (Modell, Token, Kosten, Latenz, Status).                                                                                                      |
| `GET`     | `/api/usage/quota`       | Status des Anbieterkontingents.                                                                                                                                           |
| `GET`     | `/api/usage/proxy-logs`  | Proxy-Anfrageprotokolle.                                                                                                                                                  |

### Budgets

| Verfahren | Endpunkt                 | Zweck                                                                                                 |
| --------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `GET`     | `/api/usage/budget`      | Kostenübersicht + -Budgetprüfung für einen API -Schlüssel (`apiKeyId` Abfrageparameter erforderlich). |
| `POST`    | `/api/usage/budget`      | Legen Sie daily/weekly/monthly USD Grenzwert für + Warnschwellenwert für einen API Schlüssel fest.    |
| `GET`     | `/api/usage/budget/bulk` | Massenbudgetzusammenfassungen für alle API -Schlüssel.                                                |

> Der Budget- API ist pro Umfang festgelegt**API Taste** (`apiKeyId`). Zu den von `GET /api/usage/budget` zurückgegebenen Grenzwerten gehören `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`, a `warningThreshold` und die laufenden Summen (`totalCostToday`, `totalCostMonth`, …).

### Preise

| Verfahren | Endpunkt                | Zweck                                                                                                                                                                                  |
| --------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`     | `/api/pricing`          | Zusammengeführte Preisgestaltung auf vier Ebenen (Benutzer, models.dev, LiteLLM, Standardwerte). `?includeSources=1` gibt `pricing` + `sourceMap`.                                     |
| `PATCH`   | `/api/pricing`          | Preise für `{ provider: { model: { input, output, cached, … } } }` überschreiben.                                                                                                      |
| `DELETE`  | `/api/pricing`          | Benutzerpreisüberschreibungen entfernen (optional durch `?provider=&model=` festgelegt); synchronisierte Tarife oder integrierte Standardeinstellungen bleiben als Fallbacks bestehen. |
| `GET`     | `/api/pricing/defaults` | Standard per-1M -Fallback-Raten anzeigen.                                                                                                                                              |
| `GET`     | `/api/pricing/models`   | Preise je nach Modell.                                                                                                                                                                 |
| `POST`    | `/api/pricing/sync`     | Lösen Sie eine manuelle Synchronisierung von externen Quellen aus (LiteLLM).                                                                                                           |
| `GET`     | `/api/pricing/sync`     | Aktueller Synchronisierungsstatus.                                                                                                                                                     |
| `DELETE`  | `/api/pricing/sync`     | Nur LiteLLM-synchronisierte Preise löschen (`pricing_synced`); models.dev-Daten sind separat.                                                                                          |

### Weitere kostenrelevante Endpunkte

| Verfahren | Endpunkt                      | Zweck                                                                                                              |
| --------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `GET`     | `/api/free-tier/summary`      | Gesamtzahl der in diesem Monat verwendeten Token des kostenlosen Modells und verbleibendes kostenloses Kontingent. |
| `GET`     | `/api/quota/pools/[id]/usage` | Verwendung für einen Pool mit gemeinsam genutzten Kontingenten.                                                    |

---

## CLI

Die CLI von OmniRoute stellt Befehle für Kosten, Nutzung und Preise bereit (registriert in
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Ein nach `/api/usage/analytics` aggregierter Kostenbericht.

```bash
omniroute cost                          # letzte 30 Tage, nach Anbieter gruppiert
omniroute cost --period 7d              # letzte 7 Tage
omniroute cost --group-by model         # gruppieren nach provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Spalten: Gruppe, Anfragen, Eingabe-/Ausgabe-Token, Kosten (USD) und prozentualer Anteil an der Gesamtsumme. Am Ende
wird eine Gesamtsummenzeile ausgegeben (unterdrückt mit `--quiet` oder `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # Kostenzusammenfassung pro Anbieter
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Budgets
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` liest `GET /api/pricing/defaults`. Um stattdessen die Preise einzelner Modelle
> zu bearbeiten, verwenden Sie die Dashboard-Seite **Pricing** oder `PATCH /api/pricing`.

---

## Fehlerbehebung

- **Alle Kosten werden als $0 / „Legacy / Free“ angezeigt.** Für die verwendeten Modelle ist kein Preiseintrag vorhanden.
  Aktivieren Sie die externe Synchronisierung (`PRICING_SYNC_ENABLED=true`) und führen Sie `omniroute pricing sync` aus oder
  legen Sie die Preise manuell über die Seite „Pricing“ / `PATCH /api/pricing` fest.
- **Ein historisches Modell hat einen falschen Preis.** Korrigieren Sie den Preis (durch Überschreiben oder erneutes Synchronisieren) – die Kosten werden
  bei jedem Abruf der Analysedaten anhand der Token-Anzahl neu berechnet, sodass die Schätzungen rückwirkend aktualisiert werden.
- **Die Ausgaben hinken den Echtzeitdaten hinterher.** Die Ausgaben pro Schlüssel werden gebündelt verarbeitet; verringern Sie
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS`, wenn Sie aktuellere Zahlen benötigen.

---

Informationen dazu, wie sich dies in das übergeordnete Dashboard einfügt, finden Sie im [Benutzerhandbuch](./USER_GUIDE.md) und
in der [Funktionsübersicht](./FEATURES.md).
