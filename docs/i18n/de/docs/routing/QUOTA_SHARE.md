# Quota Sharing Engine (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumentreferenz**: `docs/routing/QUOTA_SHARE.md`
> Teil von Gruppe B (Pläne 16 + 22).

---

## Überblick

Die Quota-Sharing-Engine verteilt das zeitbasierte Kontingent eines Anbieters (z. B. Codex-
5-Stunden-Fenster, Kimi 1500 Anfragen/h) fair auf mehrere API-Schlüssel, die dieselbe
Verbindung verwenden.

**Gelöstes Problem:** OmniRoute leitet viele API-Schlüssel über dasselbe Konto beim
Upstream-Anbieter weiter. Ohne Freigabelogik kann eine Lastspitze von Schlüssel A das
Anbieterkontingent für die Stunde ausschöpfen, sodass die Schlüssel B und C blockiert
bleiben, bis das Fenster zurückgesetzt wird. Die Engine verhindert dies durch:

1. Nachverfolgung des rollierenden Verbrauchs jedes Schlüssels pro Dimension (%, Anfragen, Token, $).
2. Anwendung eines arbeitserhaltenden Fair-Share-Algorithmus: Ein Schlüssel darf ungenutzte
   Anteile verwenden, solange der globale Pool nicht ausgelastet ist.
3. Durchsetzung des Ergebnisses im kritischen Pfad (`chatCore.ts`), bevor die Anfrage
   den Upstream-Executor erreicht.

---

## Algorithmus: Fair-Share Work-Conserving

In `src/lib/quota/fairShare.ts` implementiert.

### Modi

| Zustand                                    | Modus         | Verhalten                                                                                           |
| ------------------------------------------ | ------------- | --------------------------------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Großzügig** | Der Schlüssel kann bis zum globalen Limit abzüglich der verbrauchten Gesamtsumme ausgeliehen werden |
| `globalUsedPercent >= saturationThreshold` | **Strikt**    | Setzen Sie den individuellen fairen Anteil strikt durch                                             |

Standard- `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Diese beiden Modi beschreiben einen Pool im Standardausleihmodus `saturation`. Ein Pool im `consent` Modus wendet unabhängig von der Sättigung immer die strengen Regeln an. Siehe [Einvernehmliche Kreditvergabe (Opt-in pro Pool)](#consented-lending-per-pool-opt-in).

### Entscheidung pro Dimension

Für jede aktive Dimension im Pool berechnet die Engine Folgendes:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Bei `percent` Dimensionen stammt `consumed` stattdessen aus dem Attributionsbuch (siehe [Prozentdimensionen: Attribution pro Schlüssel](#percent-dimensions-per-key-attribution) ).

Dann:

- **`policy = hard`** : wenn `consumed > fairShareAllowed` und Modus strikt → sind** Block** .
- **`policy = soft`** : wenn `consumed > fairShareAllowed` und Modus strikt → sind** bestrafen** (in Kombinationen herabsetzen; niemals hart blockieren).
- **`policy = burst`** : Zulassen, solange globaler Spielraum vorhanden ist, unabhängig vom fairen Anteil.

### Cap absolut

`capValue` + `capUnit` für eine Zuteilung ist eine feste Obergrenze, unabhängig von Modus oder Richtlinie. Jede Dimension, in der immer `consumed >= capValue`** Blöcke** die Anfrage. Bei einer `percent` -Kappe ist `consumed` nur der Teil, der dem Schlüssel zugeordnet ist.

### Mehrdimensionale Prüfung

Eine Anfrage wird blockiert, wenn** beliebig** Dimension im Pool würde es blockieren. Die Dimensionen sind unabhängig — eine 5-Stunden-%-Erschöpfung keinen Einfluss auf die wöchentliche %-Dimension hat.

### Ausleihen

Im großzügigen Modus kann ein Schlüssel, dessen Zuteilung nicht ausreichend genutzt wird, Überschüsse aus den nicht zugewiesenen Anteilen anderer Schlüssel verwenden. Die Formel lautet:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

wo `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Das globale Teto (Pool `limit` für diese Dimension) ist immer die harte Obergrenze.

### Einverstandene Kreditvergabe (Opt-in pro Pool)

Jeder Pool verfügt über einen Ausleihmodus. `saturation` ist die Standardeinstellung und behält die oben genannten Regeln bei. Im `consent` Modus gibt ein `hard` Schlüssel seinen Anteil nur innerhalb der Kapazität weiter, die andere Schlüssel zugestimmt haben, zu verleihen. Der Administrator legt den Modus jedes Pools fest. Jeder Schlüsselinhaber legt seine eigene Einwilligung durch [die Lending-Einwilligung](#lending-consent) fest.

Eine Einwilligung ist ein Prozentsatz von 0 bis 100 und eine optionale Frist in Epochenmillisekunden. Der Schlüssel verleiht diesen Prozentsatz seines ungenutzten Anteils, solange die Frist in der Zukunft liegt.

Für eine Dimension ist `L` das effektive Limit: das Planlimit multipliziert mit den Konten im Pool. Das Gate berechnet für den anfordernden Schlüssel:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` ist die Gewichtung des Schlüssels oder `100 / n` für jeden Schlüssel, wenn keine Gewichtung über 0 liegt. `lend_k` ist der aktive Prozentsatz des Schlüssels und 0, sobald seine Frist abgelaufen ist. Die eigene Zustimmung des anfordernden Schlüssels zählt niemals. Ein `hard` Schlüssel wird abgelehnt, sobald sein Verbrauch seinen Anteil plus `borrowAvailable` erreicht.

Kapazität, für die keine Zuteilungsansprüche vorliegen (100 minus der Summe der Gewichte), ist nicht ausleihbar. Es wurde kein Schlüssel zur Ausleihe vereinbart.

**Beispiel.** `L` ist 1000.

| Schlüssel | Gewicht | Aktie | Verbraucht | Verleiht |
| --------- | ------- | ----- | ---------- | -------- |
| A         | 50      | 500   | 530        | 0%       |
| B         | 30      | 300   | 100        | 50%      |
| C         | 0       | 0     | 60         | 0%       |

- B verleiht 50 % seiner ungenutzten 200, also 100. C hat bereits 60 mehr als seinen Anteil genommen. A kann sich 40 leihen.
- A wird bei 530 bedient und abgelehnt, sobald sein Verbrauch 540 erreicht.
- Bevor C etwas verbrauchte und A seinen Anteil erreichte oder unterschritt, konnte C 100 leihen.
- Bevor C etwas verbrauchte und A 530 hatte, konnte C 70 leihen.

**Null Gewicht.** Ein Schlüssel mit Gewicht 0 hat einen Anteil von 0. Er wird nur bedient, solange sein Verbrauch unter dem liegt, was andere verleihen. Wenn niemand einen Kredit gewährt, wird er von der ersten Anfrage an abgelehnt.

**Fristen.** Bei keiner Hintergrundaufgabe läuft eine Einwilligung ab. Jede Anfrage vergleicht die Frist mit ihrer eigenen Zeit und eine dieser Zeit entsprechende Frist ist verstrichen. Eine gespeicherte Frist, die keine endliche Zahl ist oder nach dem größten Datum liegt, das ein `Date` enthalten kann, gilt als verstrichen.

**`soft` und `burst`.** Die Kreditvergabe schränkt sie nicht ein. Sobald ein `soft` -Schlüssel seinen Anteil überschreitet, wird die Priorität herabgestuft. Ein `burst` -Schlüssel geht weiter, solange der Pool Platz hat. Die Beckendecke verweigert weiterhin jeden Schlüssel, sobald die Gesamtsumme des Beckens ihr Limit erreicht.

**Kosten auf dem Anforderungspfad.** Ein `saturation` Pool liest nichts mehr als zuvor. In einem `consent` Pool liest eine zählbare Dimension die anderen Schlüssel nur für einen `hard` Schlüssel auf oder über seinem Anteil, während ein anderer Schlüssel ausleiht. Anschließend wird parallel ein Lesevorgang für jeden anderen Schlüssel durchgeführt. Ein fehlgeschlagener Lesevorgang zählt als Verbrauch von 0 für diesen Schlüssel. Eine `percent` Dimension fügt kein Lesen hinzu, da das Attributionsbuch jeden Schlüssel enthält.

**Bearbeiten eines Pools.** Eine Bearbeitung behält die Zustimmung der verbleibenden Schlüssel bei. Dies gilt für Zuordnungsänderungen, gruppenweite Ersetzungen und `ensure` Aufrufe. Ein entfernter Schlüssel verliert seine Zustimmung und ein wieder hinzugefügter Schlüssel beginnt bei 0. Die Admin-Routen geben die Zustimmung jedes Schlüssels zurück und schreiben ihn nie. Wenn Sie einen Pool zurück auf `saturation` umstellen, bleiben alle gespeicherten Einwilligungen erhalten, was in diesem Modus keine Auswirkungen hat. Durch die erneute Umstellung des Pools auf `consent` werden die gespeicherten Einwilligungen reaktiviert, deren Frist noch nicht abgelaufen ist. Ein Schlüsselinhaber kann eine gespeicherte Einwilligung in beiden Modi löschen.

**Upgrade.** Wenn die Spalten `lending_percent` und `lending_until` bereits vorhanden sind, wird durch die Migration nur `borrow_mode` hinzugefügt und die gespeicherten Prozentsätze bleiben unverändert. Jeder Pool startet im `saturation` Modus. Aktivieren Sie `consent` pro Pool im Pool-Assistenten. Aus den gespeicherten Werten wird nichts abgeleitet.

**Einschränkungen.**

- Ein Kreditgeber kann den Pool an seiner Obergrenze finden, bevor er seinen eigenen Anteil nutzt. Die von anderen ausgeliehene Kapazität wird auf die Gesamtsumme des Pools angerechnet.
- Die Prüfung läuft vor der Anfrage und reserviert nichts. Gleichzeitige Anforderungen lesen den Verbrauch, bevor er aufgezeichnet wird, sodass die verliehene Kapazität mehr als einmal verbraucht werden kann, begrenzt durch die Anforderungen im Flug. Die Freigabeprüfung des `saturation` Modus hat die gleiche Eigenschaft.

---

## Zähler mit gleitendem Fenster

Implementiert in `src/lib/quota/sqliteQuotaStore.ts` und `redisQuotaStore.ts`.

Zwei Buckets pro `(apiKeyId, dimensionKey)`:

- `curr`: aktueller Bucket (`floor(nowMs / windowMs)`)
- `prev`: vorheriger Bucket (`curr - 1`)

Effektiver rollierender Wert:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Genauigkeit**: ca. 99 %. Der Fehler beträgt an der Grenze zwischen Buckets höchstens 1 % der
Fenstergröße (bedingt durch die 2-Bucket-Approximation).

### Nebenläufigkeit

SQLite-Treiber: Ein In-Memory-Mutex pro Schlüssel `(apiKeyId | dimensionKey)` verhindert den
Read-Modify-Write-Wettlauf. Das Muster entspricht dem Anti-Thundering-Herd-Ansatz aus `src/sse/services/auth.ts`.

Redis-Treiber: Lua-EVAL-Skript für atomare Inkrementierung — wird als einzelner Redis-Befehl ausgeführt.

---

## Treiber

### SQLite (Standard, ohne Installation)

- Tabelle: `quota_consumption` (siehe Migration `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Am besten für Bereitstellungen mit einer einzelnen Instanz geeignet.
- Die gesamte Persistenz erfolgt in der bestehenden OmniRoute-SQLite-DB (`DATA_DIR/storage.sqlite`).

### Redis (optional, mehrere Instanzen)

- Erfordert das npm-Paket `ioredis`.
- Zähler werden in Redis gespeichert; Metadaten (Pools/Zuweisungen) verbleiben in SQLite.
- Am besten für Bereitstellungen mit mehreren Replikaten geeignet, bei denen Zähler gemeinsam genutzt werden müssen.

### Wechseln des Treibers

Über die Einstellungsoberfläche (`/dashboard/settings` → Quota-Speicher) oder über Umgebungsvariablen:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Die DB-Einstellung hat Vorrang vor der Umgebungsvariable. Wenn `driver=redis` festgelegt ist, aber die URL fehlt oder
`ioredis` nicht installiert ist, greift die Factory auf SQLite zurück und protokolliert eine Warnung.

Reihenfolge der Treiberauswahl:

1. DB-Einstellung `quotaStore.driver`
2. Umgebungsvariable `QUOTA_STORE_DRIVER`
3. Standard: `sqlite`

---

## Mehrdimensional

Ein Pool kann mehrere Dimensionen haben. Jede Dimension ist unabhängig:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Beispiel: Codex Plan** (5h% + wöchentlich%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Eine Anfrage muss alle Dimensionen erfüllen, um zulässig zu sein.

### Prozentdimensionen: Attribution pro Schlüssel

Ein Prozentplan meldet eine Nutzungszahl pro Konto und Planfenster. Der Anbieter gibt keinen Zähler pro API -Schlüssel an.

Um diese Zahl auf die Schlüssel aufzuteilen, führt jeder Pool ein Zuordnungsbuch pro Konto und Planfenster. `src/lib/quota/percentLedger.ts` hält die Regeln des Buches. `src/lib/quota/percentAttribution.ts` wandelt das Buch in die Zahlen um, die von der Durchsetzung verwendet werden. Das Ergebnis ist eine Schätzung, die aus den Token jeder Schlüsselroute erstellt wird.

#### Lesungen, die das Buch bewegen

Das Buch bewegt sich nur auf der eigenen Figur des Anbieters für das gewünschte Planfenster. Diese Verbindungen melden einen:

| Anbieter                           | Fenster planen |
| ---------------------------------- | -------------- |
| Claude über eine OAuth -Verbindung | `5h`, `weekly` |
| Codex                              | `5h`, `weekly` |

Diese gelten nicht als Lesung:

- eine Antwort, die der Anbieter-Client als veraltet markiert
- ein Claude -Fenster, dessen Prozentsatz der Anbieter nicht gemeldet hat
- die Figur eines anderen Fensters oder im schlimmsten Fall mehrere Fenster
- der Rate-Limit-Header-Fallback
- eine fehlgeschlagene Lektüre

Andere Anbieter, darunter Claude mit einem API -Schlüssel, haben kein Buch. Die prozentualen Dimensionen jedes Schlüssels werden wie vor dieser Änderung mit 0 berechnet.

Ein Messwert teilt sich den 30-Sekunden-Cache des Sättigungssignals. Ein Claude -Messwert wird auf den Zeitpunkt datiert, an dem die Zahl in Antwortheadern beobachtet oder vom Verwendungsendpunkt gelesen wurde, wenn dieser Zeitpunkt bekannt ist. Andere Messwerte sind auf den Zeitpunkt der Erstellung dieses Cache-Eintrags datiert.

#### Was das Buch behält

Jede aufgezeichnete Anfrage fügt ihre Token einmal einem Zähler pro Pool, Konto und Schlüssel hinzu. Ein Zähler wächst nur. Das Buch enthält drei Dinge:

- die Grundlinie: die Zahl, wann das Buch geöffnet oder das Fenster zuletzt gedreht wurde
- die letzte angewendete Zahl
- pro Schlüssel, sein Token-Zähler im selben Moment, seine Marke genannt

Das Buch wird aktualisiert, wenn die Durchsetzung oder die Nutzungsroute die Zuordnung berechnet. Schreibvorgänge werden anhand einer Revisionsnummer verglichen und festgelegt. Ein Autor, der bei einer neuen Lektüre einmal einen Wiederholungsversuch verliert.

#### Wie der Anteil eines Schlüssels berechnet wird

Der Anteil jedes Schlüssels wird berechnet, wenn das Buch gelesen wird. Das Wachstum der Zahl seit der Grundlinie wird zwischen den Schlüsseln im Verhältnis zu den Token aufgeteilt, die jeder seit seiner Markierung weitergeleitet hat.

Together, diese Token erklären höchstens einen Punkt der Zahl pro `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` -Token (Standard 1.000). Das Wachstum, das sie nicht erklären, ist äußerlich. Auch die Grundlinie ist extern.

Beispielsweise öffnet sich ein Buch bei 0. Schlüssel A leitet dann 900.000 Token weiter und Schlüssel B leitet 100.000 weiter. Bei einem Wert von 60 beträgt der Anteil von A 54 Punkte und der Anteil von B 6.

Ein Zähler unterhalb der Markierung seiner Taste hat neu gestartet und zählt vollständig. Ein Schlüssel ohne Markierung, beispielsweise ein Schlüssel, der sich in der Mitte eines Fensters dem Pool anschließt, zählt alle seine Token. Eine Zahl, die hinter den Token zurückbleibt, verursacht einen Fehler, der beim nächsten Lesen verschwindet. Es sammelt sich nicht an.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` ist auf jeder Namensnennung zu lesen. Ein Wert, der keine endliche Zahl von mindestens 1 ist, fällt auf 1.000 zurück.

#### Wie eine Lektüre das Buch verändert

Es gilt die erste Matching-Regel:

1. **Noch kein Buch:** Die Lesung öffnet das Buch. Seine Figur ist die Grundlinie und jeder Zähler ist markiert.
2. **Ältere Lektüre:** Eine Lesung, die vor der zuletzt angewendeten Lesung datiert ist, wird ignoriert. Dies gilt auch für einen Messwert, dessen Rücksetzzeit mehr als 30 Minuten vor der gespeicherten liegt.
3. **Neues Anbieterfenster:** Eine Reset-Zeit, die mehr als 30 Minuten später als die gespeicherte liegt, schaltet das Buch um. Die Zahl wird zur Grundlinie und jeder Zähler wird erneut markiert. Schlüssel ohne Schalter hinterlassen Sie im Buch.
4. **Beendetes Fenster:** Eine gespeicherte Rücksetzzeit, die nicht nach der Datenzeit des Messwerts liegt, bedeutet, dass das Fenster beendet ist. Die Lektüre verändert das Buch, egal welche Figur es hat.
5. **Höhere Zahl:** nur die letzte Figur bewegt sich. Die Grundlinie und die Markierungen bleiben erhalten.
6. **Gleiche Abbildung:** Figur, Grundlinie und Markierungen bleiben erhalten. Lediglich eine Nachstellzeit, die dem Buch fehlt, wird geschrieben.
7. **Untere Abbildung:** ein niedrigerer Wert wird niemals als solcher angewendet. Es dreht sich das Buch erst um, wenn drei Dinge zutreffen. Er ist mindestens zwei Minuten neuer als der zuletzt angewendete Messwert. Nichts sagt aus, dass das Fenster noch dasselbe ist wie das offene. Es ist mehr als einen Punkt niedriger.

Das Fenster zählt als dasselbe offene Fenster, wenn drei Dinge zutreffen. Beide Rücksetzzeiten sind bekannt. Sie sind innerhalb von 30 Minuten voneinander entfernt. Der gespeicherte ist dem Messwert noch voraus. Eine niedrigere Zahl innerhalb dieses Fensters ändert nichts.

Eine Rücksetzzeit wird nur gespeichert, solange sie vor der Datenzeit des Messwerts liegt, der sie trägt. Eine höhere Zahl speichert die Rücksetzzeit ihres Messwerts, wenn diese verwendbar ist, und behält die gespeicherte Zeit ansonsten bei. Eine gleiche Zahl zeichnet die Rücksetzzeit ihres Messwerts nur dann auf, wenn das Buch keine hat. Sonst ändert es nichts. Eine niedrigere Zahl, die das Buch nicht umdreht, zeichnet keine Rücksetzzeit auf.

#### Wenn das Buch verwendet wird

Nach einer Lektüre wird das Buch verwendet, es sei denn, die gespeicherte Rücksetzzeit liegt nicht nach der aktuellen Zeit. Dieser Fall tritt auf, wenn ein unmittelbar vor dem Zurücksetzen vorgenommener Messwert, beispielsweise einer aus dem Cache, unmittelbar danach beobachtet wird.

Ohne eine nutzbare Lektüre wird das gespeicherte Buch nur verwendet, solange es noch das Buch des aktuellen Fensters sein kann. Das gilt in zwei Fällen:

- Die Rücksetzzeit ist bekannt und liegt noch in der Zukunft
- Es gibt keine Rücksetzzeit und der letzte Messwert, der ihn geändert hat, ist höchstens 15 Minuten alt

Sonst wird nichts zugeschrieben, wie wenn es kein Buch gibt. Ein Buch, dessen gespeicherte Rücksetzzeit abgelaufen ist, wird nie belastet.

#### Durchsetzung

Der Verbrauch eines Schlüssels in einer Prozentdimension ist sein zugeschriebener Teil plus ein Anteil des externen Teils. Der externe Teil nutzt zunächst die Kapazität ohne Zuteilungsansprüche (100 minus der Summe der Gewichte). Nur der Überschuss wird nach Gewicht auf die Schlüssel aufgeteilt.

Dieser Verbrauch wird wie bei jeder anderen Dimension mit dem gerechten Anteil des Schlüssels verglichen. Der strenge Modus startet immer noch, wenn das Sättigungssignal `QUOTA_SATURATION_THRESHOLD` (Standard 0,5) erreicht. Jede Zahl wird durch das effektive Limit skaliert: das Limit pro Konto multipliziert mit der Anzahl der Konten im Pool.

Eine absolute Obergrenze mit `capUnit: "percent"` zählt nur den Teil, der dem Schlüssel zugeordnet ist, und zwar auf die gleiche Weise skaliert. Nehmen Sie ein Limit von 100 und k Konten pro Konto an. Eine Obergrenze von N wird dann erreicht, wenn der Schlüsselanteil an der Zahl des bedienenden Kontos N/k Punkte erreicht. Jedes Konto wird mit seinem eigenen Buch verglichen. Bei zwei Konten wird beispielsweise eine Obergrenze von 10 bei 5 Punkten der Zahl eines Kontos erreicht.

Wenn der Speicher nicht gelesen werden kann, wird nichts attributiert und jeder Schlüssel wird in dieser Dimension mit 0 berechnet. Wenn das Schreiben eines Buchs fehlschlägt, wird bei der Zuschreibung das Buch so verwendet, wie es gelesen wurde. Bei einem fehlgeschlagenen Token-Schreibvorgang bleiben die Token dieser Anforderung aus dem Buch entfernt. Keiner dieser Fehler blockiert eine Anfrage.

In einem `consent` Pool verwendet die Kreditformel den Verbrauch jedes Schlüssels in der Prozentdimension, wie oben beschrieben. Wenn ein anderer Schlüssel ausgeliehen wird, wird das Buch einmal gelesen und jedem Schlüssel zugeordnet. Ohne ein verwendbares Buch wird jeder Schlüssel mit 0 belastet. Ein Schlüssel mit einem Gewicht geht dann durch, und ein Schlüssel mit dem Gewicht 0 geht nur durch, wenn ein anderer Schlüssel verleiht.

#### Nutzungsroute

`GET /api/quota/pools/{id}/usage` meldet dieselben Zahlen über dieselbe Funktion. Eine Prozentdimension hat einen Eintrag pro Poolverbindung in `accounts`. Die obersten Ebenen `consumedTotal` und `perKey` spiegeln den ersten Eintrag wider.

Die Route wendet auch die aktuelle Lektüre an, sodass das Buch wie bei einer Anfrage weitergeschaltet werden kann. `internal + external` kann von `consumedTotal` abweichen, wenn kein brauchbarer Messwert vorliegt oder wenn kein niedrigerer Wert angewendet wird.

#### Lagerung und Aufbewahrung

Beide Quotengeschäfte führen das Buch. Bei SQLite entfernt die automatische Datenbankbereinigung, wenn sie aktiviert ist, Zeilen, die 60 Tage lang nicht aktualisiert wurden. Auf Redis teilen sich die Bücher und Zähler einer Poolverbindung einen Schlüssel. Es läuft 60 Tage nach dem letzten Token-Schreibvorgang oder der letzten Buchänderung ab. Ein Buch, das sich nicht ändert, wird nicht neu geschrieben, daher wird der Grenzwert über dem längsten Planfenster festgelegt. Durch das manuelle Zurücksetzen des Nutzungsverlaufs werden auch die Bücher auf SQLite gelöscht (siehe Einschränkungen).

#### Einschränkungen

- Das gesamte Wachstum der Kontozahl seit der Basislinie wird durch die Token aufgeteilt, die jeder Schlüssel seitdem weitergeleitet hat. Es spielt keine Rolle, wann dieses Wachstum stattgefunden hat.
- Daher wird die Nutzung außerhalb OmniRoute den Schlüsseln bis zu dem Betrag in Rechnung gestellt, den ihre Token zulassen. Dazu gehört auch die Nutzung vor der ersten Anforderung des Fensters durch einen Schlüssel, als das Buch bereits geöffnet war.
- Beispielsweise erhöht die Außennutzung das Konto um 60 Punkte, während keine Schlüsselrouten vorhanden sind. Ein Schlüssel leitet dann 30.000 Token weiter und die Zahl erreicht 60,6.
- Wenn das Buch vor dieser Verwendung geöffnet war, beträgt der Schlüsselanteil 30 Punkte. Es verfügt außerdem über eine Außenlast von 7,65 und vier Tasten mit einem Gewicht von 25.
- Wenn das Buch nach dieser Verwendung geöffnet wurde, gelten die 60 Punkte als Basiswert. Der Anteil des Schlüssels beträgt 0,6 Punkte und er trägt 15 der externen Nutzung.
- Eine Anfrage oder ein Besuch der Nutzungsroute öffnet das Buch. Ob eine solche Nutzung als Basis gilt, hängt also davon ab, wann das Buch geöffnet wurde.
- Mit der Standarduntergrenze erhält ein Schlüssel, der 60.000 Token weiterleitet, während die externe Verwendung das Konto um 60 Punkte erhöht, alle 60 als seinen eigenen Teil.
- Bei einer Untergrenze von 50.000 beträgt der Eigenanteil 1,2 Punkte. Die anderen 58,8 sind extern und werden wie bei jeder externen Verwendung nach Gewicht berechnet.
- Stellen Sie `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` in etwa auf die Kosten ein, die ein Punkt in Ihrem Plan kostet. Die externe Nutzung umfasst den Datenverkehr auf demselben Konto von Schlüsseln außerhalb des Pools.
- In jedem Modus gilt eine prozentuale Obergrenze. Ein begrenzter Schlüssel kann abgelehnt werden, solange das Konto weit unter der Sättigungsschwelle liegt.
- Nehmen Sie zu Beginn des Fensters eine Obergrenze von 10 und 12 Punkten für die Verwendung im Freien. Ein Schlüssel, der 20.000 Token weiterleitet, wird dann bei einem Kontowert von 12,4 % abgelehnt.
- Die Aufteilung ist eine Schätzung nach Token-Volumen. Eine Anfrage zählt als ihre Eingabeaufforderungs-Tokens plus ihre Abschluss-Tokens. Cache-Rabatte und Modellpreise ändern daran nichts.
- Eine Anfrage, die nicht mit Status 200 endet, erfasst keine Token. Beispiele hierfür sind ein Stream, den der Client trennt, und ein Upstream-Fehler, nachdem die Nutzung verbraucht wurde.
- Die durch eine solche Anfrage verursachte Nutzung wird den Schlüsseln in Rechnung gestellt, die Token aufgezeichnet haben, bis zu dem, was ihre Token zulassen. Der Rest ist äußerlich. Es bewegt sich nicht zurück. Eine Antwort, die keine Token-Nutzung meldet, zeichnet auch keine Token auf.
- Die Verwendung einer laufenden Anfrage kann im Teil eines anderen aktiven Schlüssels für die gesamte Anfrage angezeigt werden. Es wird erst zurückgesetzt, wenn die Anfrage mit dem Status 200 endet.
- Als extern gilt die Nutzung, die beim Öffnen eines Buchs bereits auf dem Konto vorhanden ist. Dies umfasst ein Upgrade, einen neuen Pool und ein neues Konto. Als extern gilt auch die Nutzung in einem neuen Fenster vor der ersten Lesung.
- Jeder Schlüssel beginnt mit seinem Gewichtsanteil an dieser Nutzung, danach gibt es keine Zuteilungsansprüche für die Kapazität. Mit einem Konto bei 85 % und fünf Schlüsseln mit der Gewichtung 20 beginnt jeder mit 17 seiner 20 im Einsatz.
- In einem Pool mit mehreren Konten wird der Betrag des bedienenden Kontos auf das Gesamtbudget angewendet. Dies bleibt im Buch unverändert.
- Eine untere Zahl innerhalb eines Fensters, das der Anbieter als geöffnet meldet, wird nicht angewendet. Eine Rücksetzzeit, die um mehr als 30 Minuten zurückgeht, wird als alter Messwert behandelt.
- In beiden Fällen behält das Buch seinen Zustand bei, bis die gespeicherte Rücksetzzeit abgelaufen ist. Danach wird das Buch erst dann aufgeladen, wenn eine Lektüre es umdreht.
- Abhilfe schafft das manuelle Zurücksetzen des Nutzungsverlaufs (`POST /api/settings/purge-usage-history`). Es löscht die Attributionsbücher und ihre Token-Zähler in der SQLite Datenbank.
- Die `all` Periode löscht jedes Buch und jeden Zähler. Ein kürzerer Zeitraum löscht zunächst die darin nicht geschriebenen Bücher. Anschließend werden die nicht darin geschriebenen Zähler gelöscht, jedoch nur für eine Poolverbindung, für die kein Buch mehr vorhanden ist. Ein geführtes Buch markiert immer noch jeden Schlüssel auf seinem Zähler.
- Ein Buch, dessen Figur sich nicht bewegt hat, wird nicht neu geschrieben, sodass auch ein kürzerer Zeitraum das Buch des aktuellen Fensters löschen kann. Bei der nächsten Lesung wird dann ein neues Buch mit der aktuellen Zahl geöffnet.
- Das Zurücksetzen berührt keinen Redis -Kontingentspeicher. Dort endet ein Buch mit seinem Fenster oder läuft 60 Tage nach dem letzten Schreiben ab.
- Wenn der Anbieter keine Rücksetzzeit sendet, sieht ein Fenster, das zwischen zwei Messwerten zurückgesetzt und über den alten Wert hinaus gefüllt wird, wie ein höherer Wert aus. Das Buch behält die alte Grundlinie und Markierungen.
- Die Messwerte werden durch die örtliche Uhr datiert. Wenn es dem des Anbieters voraus ist oder eine Quelle etwas früher einen Reset-Zeitpunkt meldet, kann es sein, dass das Buch diesen Unterschied frühzeitig erkennt.
- Das Wachstum in dieser kurzen Zeitspanne wird durch die darin weitergeleiteten Token aufgeteilt. Die erste Lesung des nächsten Fensters korrigiert es. Wenn das umgedrehte Buch keine Reset-Zeit enthält, ist für diese Korrektur ein niedrigerer Wert erforderlich, der mindestens zwei Minuten neuer ist als der zuletzt angewendete Messwert.
- Instanzen, die einen Redis gemeinsam nutzen, speichern Datumswerte mit ihren eigenen Uhren, also halten Sie diese Uhren synchron. Messwerte einer Instanz, deren Uhr hinterherläuft, sehen älter aus und werden ignoriert.
- Wenn nach der gespeicherten Rücksetzzeit kein nutzbarer Messwert eintrifft, werden prozentuale Anteile und Prozentobergrenzen pro Schlüssel nicht erzwungen, bis ein Messwert zurückgegeben wird. Ohne Rücksetzzeit beginnt diese 15 Minuten nach der letzten Lektüre, die das Buch verändert hat.
- Im Redis -Shop kann ein Buch, das 60 Tage lang inaktiv war, zwischen der Ausstellung eines Autorenschecks und dem Schreiben ablaufen. Anschließend wird es mit einer Revision über 1 neu erstellt, was einem gültigen Zustand entspricht.

---

## Tarifauflösung

Implementiert in `src/lib/quota/planResolver.ts`.

Priorität (von der höchsten zur niedrigsten):

1. **Manuelle DB-Überschreibung** — Tabelle `provider_plans`, pro `connectionId`.
2. **Bekannter Katalog** — `src/lib/quota/planRegistry.ts` (nur Daten).
3. **Leerer Tarif** — keine Dimensionen, manuelle Konfiguration erforderlich.

### Bekannter Katalog

| Anbieter              | Dimensionen                                                   |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, unbekannt), `tokens/weekly`             |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Kein Standard — manuelle Konfiguration erforderlich           |

---

## Pipeline-Integration

### PRE Haken (`open-sse/handlers/chatCore.ts`)

Wird vor dem Upstream-Executor nach Authentifizierungs- und Richtlinienprüfungen ausgeführt:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Fail-open** : Wenn `enforceQuotaShare` einen Fehler auslöst, wird die Anfrage mit einem `pino.warn` Protokoll durchgelassen. Dadurch wird verhindert, dass ein Kontingent-Engine-Fehler den gesamten Datenverkehr blockiert.

**Wenn die Kapazität zurückkehrt.** Eine Ablehnung am Schlüsselanteil oder an der Poolobergrenze endet in beiden Ausleihmodi mit einem von zwei Sätzen:

- `percent` Fenster: `. The <window> window resets at <time>.` Die Uhrzeit ist der Reset, den der Anbieter meldet.
- Zählbare Einheit: `. Enough <window> usage is expected to clear by <time>.` Die Zeit ist eine Obergrenze aus dem Schiebefenster, sofern der Schlüssel nichts anderes sendet.

`<time>` ist ein ISO 8601-Instant in UTC. Die Ablehnung trägt dann `Retry-After`: die gesamten Sekunden bis zu diesem Zeitpunkt plus eins. Ein Client, der so lange wartet, versucht es höchstens eine Sekunde nach dem Zeitpunkt erneut. Wenn der Zeitpunkt nicht bekannt ist, enthält die Ablehnung weder den Satz noch die Kopfzeile. Eine absolute Verweigerung der Obergrenze hat keines von beidem zur Folge. Der öffentliche Code bleibt `quota_share_blocked`.

Eine Freigabeverweigerung berührt nicht die gemeinsame Verbindung. Es werden keine Abklingzeit, keine Modellsperre und kein Ausfall des Provider-Breakers festgelegt, und die anderen Schlüssel des Pools werden weiterhin bedient. Wenn jedes Ziel einer Combo den Schlüssel für seinen Anteil verweigert, antwortet die Combo ohne zu warten mit 429. Seine Antwort trägt den Hinweis als `Retry-After`. Der Embeddings-Pfad beendet seine Ablehnung mit demselben Satz und sendet no `Retry-After`.

### POST -Hook (Rekordverbrauch)

Nach erfolgreicher Antwort:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Driftnotiz** : Wenn `consume` nach der Antwort fehlschlägt, zählt der fortlaufende Zähler zu wenig. Das Sättigungssignal vom Anbieter (z. B. `anthropic-ratelimit-unified-5h-utilization`) korrigiert die globale Schätzung bei der nächsten Anfrage.

### Kombinierte weiche Strafe (`open-sse/services/combo.ts`)

Wenn `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Die Strafe wird nach allen anderen Wertungsfaktoren verhängt. Es verringert die Wahrscheinlichkeit der automatischen Kombination, einen gesättigten Schlüssel auszuwählen, ohne ihn hart zu blockieren.

---

## UI Komplettlösung

### `/dashboard/costs/quota-share` — Hauptseite der Pools

Komponenten (alle in `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponente             | Zweck                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Einführungskarte, die neuen Benutzern die Quotenteilung erklärt                     |
| `CreatePoolModal`      | Erstellen Sie einen neuen Kontingentpool (Verbindung + Name + Erstzuweisungen)      |
| `PoolCard`             | Zusammenfassung pro Pool: Name, Verbindung, Zuordnungsanzahl                        |
| `DimensionBar`         | Gestapelter Balken pro Dimension: + globale Nutzung jedes Schlüssels                |
| `AllocationTable`      | Tabelle mit der Flagge „verbraucht“, „gerechter Anteil“, deficit/surplus, „leihen“. |
| `BurnRateChart`        | EMA Burn-Rate-Liniendiagramm (Lazy Recharts über `dynamic()`)                       |
| `EditAllocationsModal` | Bearbeiten Sie Zuordnungsgewichtungen, Obergrenzen und Richtlinien für einen Pool   |
| `BorrowModeField`      | Auswahl des Ausleihmodus (`saturation` oder `consent`) im Assistenten               |
| `LendingBadge`         | Nur-Lese-Abzeichen auf einem Schlüssel, der verliehen wird, nur in `consent` Pools  |

Der Ausleihausweis zeigt den Prozentsatz und, sofern festgelegt, die Frist in UTC mit der genannten Zone an. Die Frist wird zum Zeitpunkt des Nutzungs-Snapshots beurteilt. Eine abgelaufene oder nicht lesbare Frist wird als `lending expired` angezeigt.

Die Seiten-Hooks:

- `usePools` — ruft alle 30 Sekunden `GET /api/quota/pools`.
- `usePoolUsage` — ruft `GET /api/quota/pools/[id]/usage` bei Bedarf ab.
- `useLocalStoragePoolMigration` — wird einmal beim Mounten ausgeführt, um ältere LS Daten zu migrieren.

Der Schlüsselschritt des Pool-Assistenten verfügt über ein `Show usage by member to key holders` Feld. Es legt die `memberBreakdown` Option des Pools fest (siehe [Mitgliedernutzung](#member-usage) ). Darunter warnt der Assistent, dass jemand, der weiß, welcher Schlüssel verwendet wurde, einen Balken diesem Schlüssel zuordnen kann. Wenn das Kästchen aktiviert ist, wird dies angezeigt, wenn der Schritt weniger als drei oder mehr als 20 Tasten auflistet, da die Balken dann ausgeblendet bleiben. Es zählt die Schlüssel im Schritt und kann nicht sagen, welcher von ihnen Anfragen stellen kann.

### `/dashboard/costs/quota-share/plans` — Provider-Plan-Konfiguration

- `ProviderPlanConfigClient.tsx`: Dropdown-Menü zum Auswählen eines Anbieters, Anzeigen des gelösten Plans (automatisch aus dem Katalog oder manuelles Überschreiben) und Bearbeiten von Dimensionen.
- Änderungen werden in `PUT /api/quota/plans/[connectionId]` geschrieben.
- Beim Löschen wird auf den Katalog oder den leeren Plan zurückgegriffen.

---

## Self-Service-Kontingent API (Opt-in)

`GET /api/v1/me/quota/{provider}` (wird auch bei `/v1/me/quota/{provider}` bereitgestellt) kann ein API -Schlüsselinhaber mit seinem eigenen Schlüssel lesen, wie viel von einem gemeinsamen Abonnement ihm gehört und was ihn blockiert. Die Route ist eine dünne Hülle über `src/server/selfService/quotaHandler.ts`; Die Ansicht wird von `src/lib/quota/selfView.ts` erstellt und ihr Antwortvertrag ist `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` in `docs/openapi.yaml`).

### Aktivierung und Authentifizierung

- Feature-Flag `QUOTA_SELF_PANEL`, Standard `false`. Während es ausgeschaltet ist, erhält eine Anfrage, die die Route erreicht, 404. Mit `REQUIRE_API_KEY=true` lehnt die API Richtlinie des Clients einen fehlenden oder ungültigen Schlüssel mit 401 ab, bevor die Route ausgeführt wird, unabhängig von der Flagge. Eine Anfrage ohne Schlüssel, aber mit einer angemeldeten Dashboard-Sitzung übergibt diese Richtlinie und erhält die eigene Antwort der Route. Das Flag wird wie jedes andere Flag aufgelöst (Dashboard- oder REST -Override, dann die Umgebungsvariable mit demselben Namen); siehe [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Der Anzeigename jedes Pools und die Beschriftung jedes Zeitplans werden genau so an die Schlüsselinhaber des Pools zurückgegeben, wie der Administrator sie geschrieben hat. Überprüfen Sie vor dem Einschalten der Flagge, ob sie für die Schlüsselinhaber lesbar ist.
- Der Schlüssel wird nur aus Headern gelesen: `Authorization: Bearer <key>` oder `x-api-key: <key>`. Wenn beide gesendet werden, wird der erste validierte verwendet. Ein Schlüssel in der Abfragezeichenfolge oder ein Cookie wird ignoriert. Der Umgebungsschlüssel des Servers wird abgelehnt (401).
- Der Schlüssel benötigt den `self:usage` Bereich (403 ohne ihn).
- Das Anbietersegment wird gekürzt, in Kleinbuchstaben geschrieben und mit `^[a-z0-9][a-z0-9._-]{0,63}$` (andernfalls 400) verglichen und dann über die Anbieterregistrierung aufgelöst, sodass ein Alias wie `cc` die `claude` Pools liest. `claude` und `anthropic` lesen dieselben Pools.

### Was jede Sichtbarkeit zeigt

| Sichtweite     | Erfordert                                                                                     | Felder                                                                                                                                                                                                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eigener Anteil | `self:usage`                                                                                  | `pools[]` (Ref, Name, Anbieter, Richtlinie, Gewicht, Obergrenze), `dimensions[].yourShare`, `accounts[]` mit `yourShare` (in einem `percent` Fenster ohne `attributed` und `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                                  |
| Kontoebene     | `self:usage` + `self:account-quota` und der Anbieter im `sharedQuotaProviders` des Schlüssels | Fügt `dimensions[].total`, `accounts[].dimensions[].account` und `accounts[].modelWindows`, `attributed` und `external` zum `yourShare` eines `percent` Fensters und `members` zu einem Pool mit aktivierter Mitgliedsnutzung hinzu (siehe [Mitgliedsnutzung](#member-usage) ). |

- `sharedQuotaProviders` ist eine Einstellung pro Schlüssel (`PUT /api/keys/[id]/self-service`): `null`, die Standardeinstellung, bedeutet jeden Anbieter, den der Schlüssel erreicht; `[]` bedeutet keine. Die `accountVisible` jedes Pools gibt an, welche Sichtbarkeit auf ihn angewendet wurde.
- Kontoleisten und Modellfenster werden nur für Konten angezeigt, deren Verbindung der Schlüssel verwenden darf. Wenn der Schlüssel eine Liste zulässiger Verbindungen enthält, behält ein Konto außerhalb des Schlüssels seinen `Account N` Eintrag ohne `account` oder `modelWindows`. Eine leere Liste bedeutet keine Einschränkung, wie bei `/v1/me/status`. Die Poolsumme (`dimensions[].total`) hängt nicht von dieser Liste ab.
- Zwei Figuren, die nur mit `self:usage` dargestellt sind, stammen aus der Verwendung anderer Schlüssel. Der `exhausted` eines Zeitplanbudgets spiegelt den Verbrauch jedes Schlüssels in diesem Zeitplan wider. In einem Pool, dessen Gewichtungen alle Null sind, ist der `weight` des Schlüssels `100 / number of members`. Beides gilt für die Durchsetzung des Schlüssels.
- Ein Pool wird nur durch `ref` identifiziert, einen undurchsichtigen Wert, der an den aufrufenden Schlüssel gebunden ist. Sein Anzeigename (`name`) ist so enthalten, wie ihn der Administrator geschrieben hat. Ein `ref` wird aus dem Schlüssel und dem Pool mit dem API-Schlüsselgeheimnis des Servers (`API_KEY_SECRET`) abgeleitet. Clients dürfen es nicht beibehalten: Es ändert sich, wenn dieses Geheimnis rotiert wird.
- Konten werden als `Account 1`, `Account 2`, … in Poolreihenfolge aufgeführt. Es wird keine Pool-ID, Verbindungs-ID, Konto-E-Mail-Adresse oder Kontoname zurückgegeben, und die Antwort durchläuft das Vertragsschema, das alle Felder außerhalb davon löscht.
- Zählbare Einheiten (`requests`, `tokens`, `usd`) werden als Pool-Bucket gemeldet, den das Quoten-Gate erzwingt: `limit` = Planlimit × Konten im Pool, `fairShare` = Gewicht / 100 × `limit` (gleiche Aufteilung, wenn jedes Gewicht 0 ist), `consumed` = der eigene Zähler des Schlüssels im Quotenspeicher, `remaining` = `fairShare` − `consumed`, auf 0 gesetzt.
- `blocks.schedules` listet die Zeitplanfenster des Schlüssels auf (`open`/`closed`, `blackout` oder `outside-window`, `retryAfterSeconds`, Reserveebenen und ob das Budget des Fensters ausgegeben wird); `blocks.modelCaps` listet seine stündlichen Obergrenzen pro Modell mit Verbrauch auf.
- Ein Schlüssel außerhalb jedes Pools des Anbieters erhält mit `pools: []` 200; `availableModels` (die `qtSd/` IDs, die der Schlüssel in `/v1/models` sieht), `expiresAt` und `apiBaseUrl` sind weiterhin gefüllt.
- `apiBaseUrl` ist `OMNIROUTE_PUBLIC_API_BASE_URL`, dann `OMNIROUTE_PUBLIC_BASE_URL`, sonst `null`. Es ist niemals der eigene Ursprung der Anfrage.

### `status` und `reason`

| `status`      | Bedeutung                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Eine aktuelle Lektüre.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `stale`       | Eine zwischengespeicherte Kontolesung, die als veraltet markiert ist, oder eine, deren Rücksetzzeit seit der Lektüre abgelaufen ist. Zahlen bleiben erhalten. Ein Modellfenster, dessen Rücksetzzeit abgelaufen ist, markiert die gesamte `modelWindows` Gruppe `stale`. Für den eigenen Anteil des Schlüssels an einem `percent` Fenster: Das Buch wurde ohne eine Kontolesung im Cache des Gates gelesen, um es zu bestätigen. |
| `unavailable` | Keine Lektüre; Die Zahlen sind `null`, niemals `0`. `reason` sagt warum.                                                                                                                                                                                                                                                                                                                                                         |

| `reason`                          | Wann                                                                                                                                                                             |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Der Quotenspeicher konnte nicht gelesen werden oder er kann keine Attributionsbücher lesen.                                                                                      |
| `percent_attribution_unavailable` | Der eigene Anteil des Schlüssels an einem `percent` Fenster: Für dieses Konto und Fenster existiert noch kein Zuordnungsbuch, oder das Buch listet den Schlüssel nicht auf.      |
| `percent_window_ended`            | Der eigene Anteil des Schlüssels an einem `percent` -Fenster: Das Buch gehört zu einem Planfenster, das beendet wurde.                                                           |
| `account_not_used_by_key`         | Der eigene Anteil des Schlüssels an einem `percent` Fenster: Die Verbindung des Kontos liegt außerhalb der zulässigen Verbindungen des Schlüssels. Sein Buch wird nicht gelesen. |
| `window_not_reported`             | Der Provider-Limits-Cache hat für dieses Planfenster keine Lesewerte.                                                                                                            |
| `connection_lookup_failed`        | Die Verbindung des Kontos konnte nicht gelesen werden.                                                                                                                           |
| `not_supported`                   | OmniRoute kann die Nutzungsbeschränkungen für den Kontoanbieter nicht lesen.                                                                                                     |
| `fetch_failed`                    | Es konnte kein zwischengespeicherter Lesevorgang verwendet werden und die Aktualisierung der Anbieterlimits ist fehlgeschlagen.                                                  |
| `not_available`                   | Der Messwert weist keine Nutzungsfenster auf, oder das Konto weist überhaupt keinen Messwert auf.                                                                                |

Wenn der Quotenspeicher nicht gelesen werden kann, sind die speichergestützten Felder von `blocks` ( `exhausted` eines Zeitplanbudgets, `consumed` und `reached` einer Modellobergrenze) ebenfalls `null`.

### Einwilligung zur Kreditvergabe

`PATCH /api/v1/me/quota/{provider}` zeichnet die eigene Zustimmung des aufrufenden Schlüssels für einen Pool auf. Es verwendet die Flag-, Header- und Providerregeln von `GET`. Der `self:usage` Bereich autorisiert diesen einen Schreibvorgang, obwohl sein Name schreibgeschützt ist.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` ist der `ref` den der `GET` für diesen Pool zurückgibt.
- `lendingPercent` ist eine ganze Zahl von 0 bis 100. Ein Wert von 0 löscht die Einwilligung und ihre Frist. Ein Körper mit `lendingPercent` 0 wird in beiden Modi akzeptiert.
- `lendingUntil` ist optional: Epochen-Millisekunden oder `null` für keine Frist. Er muss in der Zukunft liegen und darf höchstens 8640000000000000 sein. Ein Wert unter 100000000000 wird als Sekunden gelesen und wird abgelehnt.
- Alle anderen Felder werden abgelehnt. Ein Text, der länger als 4096 Byte ist, wird abgelehnt. Der Lesevorgang stoppt bei dieser Größe, daher wird ein längerer Körper niemals im Ganzen gehalten.

Die Prüfungen werden in der Reihenfolge dieser Tabelle ausgeführt. Bei jeder Ablehnung wird der Standardfehlertext mit einer festen Nachricht verwendet. Eine Ablehnung durch einen dieser Schecks bringt nichts.

| Status | Nachricht                                                                                          | Wann                                                                                              |
| ------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 404    | `Not found`                                                                                        | Die `QUOTA_SELF_PANEL` Flagge ist ausgeschaltet.                                                  |
| 401    | `Valid API key required`                                                                           | Der Schlüssel fehlt oder ist ungültig oder es handelt sich um den Umgebungsschlüssel des Servers. |
| 403    | `API key lacks the self:usage scope`                                                               | Dem Schlüssel fehlt `self:usage`.                                                                 |
| 400    | `Invalid provider`                                                                                 | Das Anbietersegment ist ungültig.                                                                 |
| 429    | `Too many lending changes. Retry later.`                                                           | Der Schlüssel hat sein Limit überschritten. Die Antwort trägt `Retry-After`.                      |
| 400    | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Der Text ist nicht JSON, zu lang oder entspricht nicht dem Schema.                                |
| 400    | `lendingUntil must be a Unix time in milliseconds`                                                 | Die Frist beträgt Sekunden.                                                                       |
| 400    | `lendingUntil must be in the future`                                                               | Die Frist liegt bei oder vor dem Zeitpunkt der Anfrage.                                           |
| 404    | `Pool not found`                                                                                   | Die `ref` nennt für diesen Anbieter keinen Pool dieses Schlüssels.                                |
| 403    | `Lending is not enabled for this pool`                                                             | Der Pool befindet sich im `saturation` Modus und `lendingPercent` liegt über 0.                   |
| 500    | `Failed to build quota view`                                                                       | Jeder andere Fehler. Die Ursache wird auf dem Server protokolliert.                               |

Das Limit beträgt 20 Anfragen pro 60 Sekunden für jeden Schlüssel. Jede Anfrage, die den Provider-Check besteht, zählt, auch wenn sie später abgelehnt wird oder sich nichts ändert. Es verfügt über einen eigenen Zähler, abgesehen vom Anforderungsratenlimit des Schlüssels.

Eine Anfrage, die die gespeicherte Einwilligung ändert, schreibt einen `quota.pool.lending.updated` -Prüfdatensatz. Es benennt den Schlüssel mit den alten und neuen Werten. Die gleiche Stelle sendet zweimal, schreibt einmal und prüft einmal. Die Antwort lautet 200 mit der vollständigen `GET` Ansicht, die nach dem Schreiben erstellt wird.

Die `GET` Ansicht meldet die Kreditvergabe wie folgt:

- Jeder Pool trägt `borrowMode` (`saturation` oder `consent`) und die eigenen `lendingPercent` und `lendingUntil` des Schlüssels.
- `lendingActive` ist nur `true` in einem `consent` Pool, mit einem Prozentsatz über 0 und einer nicht erreichten Frist.
- In einem `consent` Pool trägt jeder zählbare `dimensions[].yourShare` `borrowAvailable`. Es ist das, was der Schlüssel jetzt über seinen von den anderen Schlüsseln verliehenen Anteil hinaus nutzen kann.
- `borrowAvailable` verwendet die Formel des Tors. Es liest jeden anderen Schlüssel, auch solange der Schlüssel unter seiner Freigabe liegt. Für einen `hard` -Schlüssel ist das ein zusätzlicher Lesevorgang pro anderem Schlüssel und zählbarer Dimension parallel.
- `borrowAvailable` ist `null` für einen `soft` oder `burst` Schlüssel und `null`, wenn ein Lesevorgang fehlschlägt.
- `borrowAvailable` ist eine Zahl für alle anderen Schlüssel zusammen. In einem Pool aus zwei Schlüsseln ist es die eigene Figur des anderen Schlüssels.
- `borrowAvailable` wird noch nicht für `percent` Windows oder in `accounts[]` gemeldet.
- In einem `saturation` Pool meldet die Ansicht die gespeicherte Einwilligung mit `lendingActive: false` und ohne `borrowAvailable`.

### Fehler

Jede Antwort auf dieser Route, ob Erfolg oder Fehler, trägt `Cache-Control: no-store`. Eine Ablehnung, die erfolgt, bevor die Route ausgeführt wird, überträgt sie nicht, beispielsweise die 401 der Client API Richtlinie oder die 403 des IP Filters. Fehler der Route verwenden den Standardfehlertext mit einer festen Meldung: 400 (ungültiger Anbieter), 401 (fehlender oder ungültiger Schlüssel), 403 (fehlendes `self:usage`), 404 (Flag aus) und 500 (`Failed to build quota view`). Der 500 deckt alle Fehler ab, sobald die Anfrage die Route erreicht, einschließlich der Schlüsselsuche selbst; Die Ursache wird auf dem Server protokolliert und nie zurückgegeben. Die Fehler des `PATCH` sind in [der Leihgenehmigung](#lending-consent) aufgeführt.

### Einschränkungen

- `remaining` ist der Teil des fairen Anteils des Schlüssels, den er nicht verwendet hat. Es handelt sich nicht um eine Garantie. Ein Schlüssel kann darüber hinaus noch ausgegeben werden, solange im Pool noch Platz ist. Sobald die Gesamtsumme des Pools `limit` erreicht, wird jeder Schlüssel des Pools abgelehnt, unabhängig von seinem eigenen `remaining`, und ein Schlüssel ohne `self:account-quota` kann diese Gesamtsumme nicht sehen.
- `remaining` berücksichtigt nicht den absoluten `cap` der Zuordnung. Die Durchsetzung verweigert den Schlüssel, sobald der eigene Verbrauch in einem Fenster der Einheit des Caps den Wert des Caps erreicht.
- Die Leiste auf Kontoebene stammt aus dem Provider-Limits-Cache und kann die Durchsetzungsentscheidung um einige Minuten verzögern. Ein Messwert, dessen Rücksetzzeit abgelaufen ist, wird als `stale` gemeldet.
- Fenster pro Modell (`modelWindows`) werden heute nur für Anbieter gemeldet, die über eine Plan-Fenster-Zuordnung verfügen: Claude und Codex. Bei anderen Anbietern ist `modelWindows` weiterhin vorhanden, wenn Kontodaten angezeigt werden, mit einer leeren `windows` Liste.
- Der Eigenanteil des Schlüssels an einem `percent` Fenster ist eine Schätzung. Es stammt aus dem Attributionsbuch und weist alle oben unter „Prozentdimensionen: Attribution pro Schlüssel“ aufgeführten Einschränkungen auf.
- `consumed` ist die Zahl, die die Durchsetzung mit dem fairen Anteil vergleicht. Es ist genau `attributed` plus `external`. `attributed` ist der Teil, in dem das Buch den Schlüssel für die weitergeleiteten Token bereitstellt. `external` ist der Teil der Kontonutzung des Schlüssels, der nicht durch die Schlüssel des Pools berücksichtigt wird.
- Beide Teile werden nur gesendet, wenn `accountVisible` des Pools wahr ist: Der Schlüssel hat `self:account-quota` und der Anbieter ist in seinem `sharedQuotaProviders`. Ein Schlüssel ohne ihn erhält nur `consumed`, mit demselben `status` und `reason`.
- Mit beiden Teilen und seinem Eigengewicht kann ein Halter die Nutzung außerhalb des Beckens ermitteln, die zu Lasten der Beckenschlüssel geht. Ein Inhaber mit Kontoumfang sieht bereits die Kontosumme.
- Ein Schlüssel, der nichts im Fenster weitergeleitet hat, kann seine externe Ladung immer noch aus `consumed` lesen, da sein zugeordneter Teil dann 0 ist.
- Beispielsweise öffnet sich ein Buch bei 0, wobei die Tasten A und B jeweils eine Gewichtung von 50 haben. Schlüssel A leitet 900.000 Token und Schlüssel B 100.000. Das Konto erreicht dann 60 % eines Limits von 100. Dann ist `attributed` 54 für Schlüssel A und 6 für Schlüssel B, und `external` ist für beide 0.
- Die Ansicht liest das Buch und schreibt niemals seinen Zustand. Es wird kein Buch geöffnet und der Anbieter wird nie um eine Lektüre gebeten. Beim Redis Store entfernt ein Lesevorgang im Hintergrund überholte Revisionsfelder, wie dies auch bei den Lesevorgängen des Gates der Fall ist.
- Die Freigabe ist nur `ok` solange der Cache des Gates einen Lesevorgang des Kontos speichert. Ohne eine ist es `stale`, daher wird es in einem Pool ohne aktuelle Anfrage als möglicherweise veraltet angezeigt.
- Bis eine Anfrage den Pool durchläuft, ist die Freigabe nicht verfügbar. Durch diese Anfrage wird das Buch geöffnet, und der aktuelle Kontostand gilt als außerhalb des Pools erfolgte Nutzung.
- In einem Pool mit mehreren Konten verwendet jeder Kontoeintrag das eigene Kontobuch und das Limit eines Kontos. Die Durchsetzung skaliert beide Seiten nach der Anzahl der Konten, sodass der Anteil gleich ist.
- Fenster pro Modell enthalten keinen Anteil für den Schlüssel. Das Buch speichert keine Daten pro Modell.
- Reserveböden eines Zeitplans werden von der Ansicht nicht ausgewertet: Ein Zeitplan kann als `open` angezeigt werden, während eine Anfrage mit der Begründung `schedule-reserve` abgelehnt wird.
- Wenn zwei Pools mit demselben Schlüssel eine Verbindung gemeinsam nutzen, wendet die Durchsetzung einen davon an und die Ansicht listet beide auf.
- Es gibt keine Beschränkung pro Adresse für fehlgeschlagene Schlüsselversuche: Hinter einem Reverse-Proxy können Anrufer eine Adresse gemeinsam nutzen (dies hängt davon ab, ob weitergeleitete Client-Adressen vertrauenswürdig sind), sodass eine Sperrung die Route für jeden Schlüsselinhaber verweigern könnte. Mit `REQUIRE_API_KEY=true` wird ein ungültiger Schlüssel von der Client- API -Richtlinie abgelehnt, bevor die Route ausgeführt wird, wobei der 401-Body dieser Richtlinie anstelle des dieser Route verwendet wird.

### Nutzung durch Mitglieder

Ein Administrator kann Schlüsselinhabern zeigen, wie die Nutzung eines Fensters zwischen den Mitgliedern des Pools aufgeteilt wird. Die Option ist `memberBreakdown` des Pools, standardmäßig deaktiviert. Es wird im Pool-Assistenten oder mit `PATCH /api/quota/pools/{id}` eingestellt. `GET /api/quota/pools` und `GET /api/quota/pools/{id}` melden es.

Eine Dimension der Ansicht trägt nur dann `members`, wenn alle dieser Punkte zutreffen:

- Die Option für den Pool ist aktiviert
- Der Pool verfügt über höchstens 20 zugewiesene Schlüssel, und mindestens drei davon können Anfragen stellen: aktiv, nicht widerrufen, nicht gesperrt und nicht abgelaufen
- Das `accountVisible` des Pools ist wahr: Der Schlüssel hat `self:account-quota` und der Anbieter befindet sich in seinem `sharedQuotaProviders`
- In einem `percent` Fenster ist die Verbindung des Kontos eine, die der Schlüssel verwenden darf
- Der eigene Anteil des Schlüssels an diesem Fenster wurde gelesen: Sein `status` ist nicht `unavailable`

Ansonsten fehlt `members`. Es ist nie eine leere Liste.

- Jedes Slice ist `{ slot, consumed, isYou }`. Das Antwortschema lehnt alle anderen Eigenschaften eines Slices und einer Liste mit mehr als 20 Slices ab. Die Slices werden in der Reihenfolge der Slots aufgelistet.
- Es gibt einen Slice pro zugewiesenem Schlüssel, einschließlich eines Schlüssels, der keine Anfragen mehr stellen kann. Ein Element ohne Verwendung zeigt eine echte Null.
- Steckplatz 1 ist immer der fragende Schlüssel, wobei `isYou` wahr ist. Die anderen Slot-Nummern sind Ränge eines verschlüsselten Hashs. Es ist mit `API_KEY_SECRET` verschlüsselt und deckt den Pool, den fragenden Schlüssel und das Mitglied ab.
- Daher stimmen die Zahlen zwischen den Inhabern nicht überein. Für einen Inhaber bleiben sie zwischen den Besuchen gleich. Sie können sich ändern, wenn ein Schlüssel dem Pool beitritt oder ihn verlässt oder wenn dieses Geheimnis rotiert wird.
- In einem zählbaren Fenster ist ein Slice der Zähler des Mitglieds im Quotenspeicher, derselbe Zähler wie sein eigenes `consumed`.
- In einem `percent` Fenster ist ein Slice der `attributed` Teil des Mitglieds, der aus demselben Buch stammt wie der eigene Anteil des Schlüssels. Die Nutzung außerhalb des Pools wird niemals in Abschnitte aufgeteilt. Diese Ladung ist nach Gewicht aufgeteilt, daher würden die Scheiben, die sie trugen, die Gewichte anzeigen.
- Jede Ansicht liest parallel einen Wert pro anderem Mitglied und zählbarem Fenster. In einem `percent` Fenster kosten die Slices keinen Lesevorgang, der über den Lesevorgang des eigenen Buches hinausgeht. Wenn ein Wert nicht gelesen werden kann, hat dieses Fenster kein `members` und der eigene Anteil des Schlüssels bleibt bestehen.
- Die Option und die Anzahl der verwendbaren Schlüssel werden einmal pro Pool gelesen, und zwar nur für einen Schlüssel, der Kontodaten sehen darf. Wenn das Lesen der Option oder der Anzahl der verwendbaren Schlüssel fehlschlägt, werden die Balken für diesen Pool deaktiviert. Der Server protokolliert eine Warnung und der Rest der Ansicht wird erstellt.

Die Barren tragen keine Namen oder IDs. Sie erzählen einem Schlüsselinhaber immer noch Dinge über die anderen Mitglieder:

- Inhaber können Slices weiterhin anhand ihrer Werte zuordnen.
- Eine stabile Nummerierung ermöglicht es einem Inhaber, einem Mitglied im Laufe der Zeit zu folgen.
- Die Anzahl der Slices zeigt, wie viele Schlüssel im Pool zugeordnet sind.
- In einem Pool von drei Schlüsseln kann jemand, der weiß, welcher Schlüssel verwendet wurde, erkennen, welcher Schlüssel zuletzt verwendet wurde.
- Wenn ein Pool unter drei nutzbare Tasten fällt, verschwinden die Balken. Frühere Ansichten zeigen immer noch, was jedes Mitglied verwendet hat.
- In einem zählbaren Fenster kann die Pool-Gesamtsumme abzüglich der Slices die Verwendung von Schlüsseln anzeigen, die nicht mehr zugewiesen sind.
- Ein Mitglied, das auf einem Konto Null und auf einem anderen Konto „Nutzung“ anzeigt, kann anzeigen, welches Mitglied welches Konto verwendet.
- In einem zählbaren Pool mit der `hard` -Richtlinie weist ein Slice, der beim fairen Anteil eines Mitglieds nicht mehr wächst, auf das Gewicht dieses Mitglieds hin.

### Nutzungsreihe (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (wird auch bei `/v1/me/usage` bereitgestellt) gibt die Nutzung und die Kosten der eigenen Anfragen des aufrufenden Schlüssels zurück: Gesamtsummen, ein Eintrag pro UTC Tag, pro Tag und Modell, pro Modell und pro Anbieter. Es teilt das Flag, die Authentifizierungsregeln, den `self:usage` Bereich, `Cache-Control: no-store` und das Fehlerverhalten der oben genannten Quotenroute. Der Schlüssel wird vor `range` überprüft. Fehler sind 400 (`Invalid range`), 401, 403, 404 und 500 (`Failed to build usage`).

- `range` ist eines von `1d`, `7d`, `30d` (Standard) oder `90d`. Jeder andere Wert, ein leerer Wert oder ein wiederholter Parameter ist ein 400. Der Satz stoppt bei `90d`, um die Kosten eines Anrufs zu begrenzen. Die Ansicht liest nur den rohen Nutzungsverlauf, niemals die täglichen Zusammenfassungen, die keinen Schlüssel enthalten.
- Zeilen werden anhand der ID des aufrufenden Schlüssels ausgewählt. Die Spalte „Schlüsselname“ wird nie abgeglichen und Zeilen, die ohne Schlüssel-ID aufgezeichnet werden, werden nie gezählt.
- Beim Erstellen einer Serie werden fünf gruppierte Abfragen für die Schlüsselzeilen im Fenster ausgeführt. Die erstellte Serie wird pro Taste und Bereich 60 Sekunden lang wiederverwendet, und ein wiederverwendeter Aufruf führt keine aus. Sein `generatedAt` verrät sein Alter.
- Das Fenster endet, wenn die Serie erstellt ist. Eine später gestempelte Zeile, beispielsweise durch Taktversatz, wird nicht gezählt.
- `coverage.retentionDays` ist die Einstellung des Betreibers für die Aufbewahrung des Rohnutzungsverlaufs (`retention.usageHistory` in den Datenbankeinstellungen). `coverage.truncatedByRetention` ist wahr, wenn der angeforderte Bereich länger als diese Einstellung ist. Es vergleicht die beiden Zahlen und prüft nicht, ob tatsächlich Zeilen fehlen.
- Der Anbieter wird wie für die eigenen Anfragen des Schlüssels aufgezeichnet zurückgegeben. Model ist der aufgezeichnete Name nach seinem letzten `/`, und Zeilen werden danach gruppiert. Eine Combo-Anfrage, deren jedes Ziel abgelehnt wurde, wird mit dem Routing-Label als Anbieter (dem Combo-Namen, `auto` oder `combo`) und der vom Client gesendeten Modellzeichenfolge aufgezeichnet. Andere abgelehnte Anfragen, beispielsweise durch einen offenen Leistungsschalter, eine Modellabklingzeit oder einen auf Quote geparkten Skip, behalten den Zielanbieter und das Zielmodell.
- Neben Anzahl und Kosten enthält die Antwort durchschnittliche Latenz, Erfolgsraten und die Zeiten der ersten und letzten Anfrage.
- `byModel` listet die 50 Anbieter-Modell-Paare mit den meisten Anfragen auf. Bei mehr Paaren addieren sich die Einträge nicht zu `summary` und `summary.uniqueModels` zählt jede aufgezeichnete Modellschreibweise. Dann ist `byModelTruncated` wahr, und ein Modell, dessen Paare auf beiden Seiten des Schnitts liegen, zeigt Teilsummen.
- Es werden zwei Kosten gemeldet. `costUsd` sind die in Rechnung gestellten Kosten, wie die Nutzungsanalysen zeigen. Flatrate-Abonnementanbieter wie der Claude -Code-Plan zählen dort mit 0 $. `listPriceUsd` ist die gleiche Nutzung zum Listenpreis, Abonnements inbegriffen. Eine Anfrage, deren Modell keine Preiszeile enthält, zählt ihre gespeicherten Kosten: Kosten, die der Anbieter gemeldet hat, oder Kosten, die bei der Aufzeichnung der Anfrage berechnet wurden. Nur eine Anfrage ohne keine zählt 0, ohne Markierung, sodass die Gesamtsumme teilweise sein kann.
- Der Antwortvertrag ist `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` in `docs/openapi.yaml`).

### Self-Service-Seite

Wenn `QUOTA_SELF_PANEL` aktiviert ist, ist `/quota/{provider}` eine öffentliche Seite. Ein Schlüsselinhaber gibt dort einen API -Schlüssel ein und sieht die Pools dieses Schlüssels für den Anbieter. Jeder Pool zeigt pro Poolfenster eine Karte, mit der Nutzung des Pools für alle und dem eigenen Anteil des Schlüssels. Jedes Konto des Pools verfügt über eigene Karten mit der Kontonutzung und dem Schlüsselanteil. Die Verwendung des Kontos wird nur angezeigt, wenn der Schlüssel möglicherweise Kontodaten sieht. Auf der Seite werden auch die Limits pro Modell für jedes Konto und die eigene Nutzung des Schlüssels aufgeführt. Wenn ein Zeitplan den Schlüssel gerade blockiert, erscheint ein Hinweis. Eine Karte listet jede Modellkappe des Schlüssels mit ihrer Verwendung auf und markiert die erreichten. `{provider}` ist eine Anbieter-ID oder ihr Alias (`/quota/claude`, `/quota/cc`). Ein unbekannter Anbieter und jeder `/quota/*` -Pfad, während das Flag deaktiviert ist, antworten mit 404. Pools auf einem benutzerdefinierten OpenAI- oder Anthropic-kompatiblen Knoten haben keine Seite. Der API ist immer noch für sie verantwortlich.

Die Seite hat keine Sitzung. Der Schlüssel wird nur im `Authorization` Header von `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` und `GET /api/v1/me/usage` gesendet, niemals in einem URL. Ein vom Server akzeptierter Schlüssel wird im `sessionStorage` der Registerkarte gespeichert. Mit „Auf diesem Gerät merken“ bleibt er stattdessen in `localStorage` erhalten und mit „Schlüssel vergessen“ wird er aus beiden entfernt. Ein vom Server abgelehnter Schlüssel wird aus dem Speicher entfernt.

Ein Pool im `consent` Modus zeigt eine Leihkarte. Dort legt der Schlüsselinhaber einen ganzen Prozentsatz von 0 bis 100 des Leerlaufanteils des Schlüssels zum Verleihen fest. Der Inhaber wählt auch, wie lange die Einwilligung gültig ist: bis zum Ausschalten, 1 Stunde, 8 Stunden, 24 Stunden, 7 Tage oder 30 Tage. Eine Dauer gilt ab dem Zeitpunkt der Speicherung. Während eine Frist in Kraft ist, kann der Inhaber diese stattdessen beibehalten. Wenn diese Frist vor dem Speichern verstrichen ist, sendet die Karte nichts und fragt nach einer anderen Auswahl. Bei 0 % wird keine Frist gesendet. Auf der Karte wird der hinterlegte Termin mit Angabe der Zeitzone angezeigt. Eine Einwilligung, deren Frist abgelaufen ist, wird als beendet angezeigt.

Für einen `hard` -Schlüssel listet die Karte außerdem pro Poolfenster auf, welche anderen Schlüssel dem Schlüssel derzeit verliehen werden. Jede Zeile ist eine Zahl für alle anderen Schlüssel zusammen. In einem Pool aus zwei Schlüsseln ist es die eigene Figur des anderen Schlüssels. Eine Zahl, die die Ansicht nicht meldet, wird als nicht verfügbar und nicht als Null angezeigt. Für einen `soft` oder `burst` Schlüssel steht auf der Karte, dass keine Zahl gilt.

Ein Pool im `saturation` -Modus, dessen Schlüssel einen Prozentsatz über 0 speichert, zeigt nur eine Auszahlung an. Dort steht, dass der hinterlegte Prozentsatz keine Auswirkung hat. Die Schaltfläche „Abheben“ sendet 0 ohne Frist. Ein Pool im `saturation` -Modus mit einer gespeicherten 0 zeigt keine Leihkarte an. Nach dem Speichern bleibt eine Karte, die die zurückgegebene Ansicht nicht mehr benötigt, bei ihrer Nachricht, bis sich die Ansicht der Seite erneut ändert.

Es wird nichts gespeichert, bis der Inhaber auf „Speichern“ oder „Abheben“ klickt. Bei jedem Tastendruck wird eine `PATCH /api/v1/me/quota/{provider}` -Anfrage gesendet, bei einem zweiten Tastendruck wird nichts gesendet, während der erste Tastendruck noch aussteht. Der Körper trägt den undurchsichtigen `ref` des Pools aus der Ansicht, dem Prozentsatz und der Frist. Die Antwort ist die neu erstellte Kontingentansicht, und die Seite zeigt sie ohne zweites Lesen an. Wenn sich zwei Speicherungen überschneiden, liest die Seite die Quote einmal nach der letzten Antwort. Die Seite speichert die Einwilligung nicht im Browserspeicher.

Eine abgelehnte Änderung wird auf der Karte durch einen aus dem HTTP Status gewählten Text erklärt. Der Fehlertext wird nicht gelesen. Ein 401 meldet, dass der Schlüssel nicht akzeptiert wurde und lädt das Kontingent neu. Ein 403-Fehler besagt, dass der Pool keine Änderungen bei der Kreditvergabe annimmt, und ein 404-Fehler besagt, dass der Pool nicht mehr vorhanden ist. Beide bieten einen Button, der das Kontingent neu lädt. Eine 400- oder eine andere 4xx-Antwort fordert den Inhaber auf, den Prozentsatz und die Frist zu überprüfen. A 429 fordert den Inhaber auf, mit den Sekunden von `Retry-After` zu warten, wenn die Antwort gegeben wird. Eine 5xx-Antwort, ein 408 oder ein Netzwerkfehler weist darauf hin, dass die Änderung möglicherweise nicht gespeichert wurde, und behält die eingegebenen Werte bei. Eine Antwort außerhalb des Vertrags lädt das Kontingent neu. Bei einem fehlgeschlagenen Speichern wird der Schlüssel nicht automatisch entfernt. Wenn das erneute Laden verweigert wird, entfernt die Seite den Schlüssel wie bei jedem verweigerten Lesevorgang.

Sobald ein Schlüssel akzeptiert wurde, wird auf der Seite auch eine Karte „Einrichten Ihrer Werkzeuge“ mit drei Registerkarten angezeigt. „Claude Code“ gibt den `env` Block für `~/.claude/settings.json` an. „Shell“ liefert die gleichen Variablen wie `export` Zeilen. „Claude Desktop“ gibt die Werte für sein Drittanbieter-Inferenzfenster an. Bei den Modellen handelt es sich um die Quotenanteilsmodelle, die der Schlüssel für diesen Anbieter verlangen kann. Wenn keine solche Liste mit dem Schlüssel geliefert wird, aktiviert der Block stattdessen die Gateway-Modellerkennung. Die Gateway-Adresse ist der öffentliche API -Ursprung, den der Server meldet (`OMNIROUTE_PUBLIC_API_BASE_URL`, dann `OMNIROUTE_PUBLIC_BASE_URL`). Wenn keines von beiden festgelegt ist, zeigt die Karte einen Platzhalter an und fordert den Inhaber auf, den Administrator zu fragen. Der Schlüssel wird als Platzhalter angezeigt. „Meinen Schlüssel einschließen“ fügt den gesamten Schlüssel in den Text auf dem Bildschirm ein und kopiert ihn über die Schaltfläche „Kopieren“. Das dauert so lange, bis die Box geleert wird, der Schlüssel vergessen oder ersetzt wird oder die Seite verlassen wird. Die Karte sendet keine Anfrage und bietet keinen Datei-Download an.

Eine Lesung, bei der API `stale` markiert, wird als möglicherweise veraltet angezeigt. Ein mit `unavailable` markierter Messwert wird mit seinem Grund angezeigt, niemals als Null.

Bei Prozentplänen zieht die Seite den eigenen Anteil des Schlüssels, wenn die API ihn meldet. Darin heißt es, dass es sich bei der Zahl um eine Schätzung handelt und benennt ihre beiden Teile. Die Limits pro Modell zeigen nur das Konto an.

Wenn ein Fenster `members` trägt, zeigt seine Karte auch einen Balken mit einem Segment pro Mitglied in der Reihenfolge der Slots. Das Segment des Frageschlüssels verwendet die Akzentfarbe. Die anderen Segmente durchlaufen die Diagrammfarben des Themas. Eine Textlegende listet jedes Segment mit seinem Wert auf, sodass nichts von der Farbe abhängt. Segmente werden `You` oder `Member N` bezeichnet, wobei N der Slot ist.

### Dedizierter Port für die Seite

`QUOTA_PANEL_PORT` öffnet einen zweiten Listener, der nur die Self-Service-Seite bedient. Es ist ausgeschaltet, es sei denn, die Variable ist gesetzt. `QUOTA_PANEL_HOST` ist die Bindungsadresse und standardmäßig `127.0.0.1`.

Der Listener leitet diese Pfade an den Hauptport weiter und antwortet für jeden anderen Pfad mit 404:

| Weg                                                                      | Dient                                      |
| ------------------------------------------------------------------------ | ------------------------------------------ |
| `/quota/{provider}`                                                      | Die Seite                                  |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Die Kontingentansicht, die die Seite liest |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Die Nutzungsserie, die die Seite liest     |
| `/_next/static/`                                                         | Skripte, Stile und Schriftarten des Builds |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Symbole                                    |

`GET` und `HEAD` werden ohne Text weitergeleitet. Eine Anfrage mit einem Text wird ebenfalls weitergeleitet: ein `PATCH` des Kontingent-Ansichtspfads, den die Seite sendet, um eine Ausleihauswahl zu speichern. Jede andere Methode antwortet mit 404, außer einer CONNECT Anfrage, deren Verbindung ohne Antwort geschlossen wird. Jede andere Anfrage, die einen Körper deklariert, antwortet mit 404 und ihre Verbindung wird geschlossen. Upgrade-Anfragen werden abgelehnt und ihre Verbindung wird geschlossen. Ein Pfad mit einem Punktsegment oder einer Fragmentmarkierung wird abgelehnt, wie beim API Port. Dies gilt auch für ein Anforderungsziel mit einem Zeichen außerhalb des druckbaren ASCII. Ein rohes Steuerzeichen im Ziel wird vom HTTP Parser vor der eigenen Prüfung dieses Ports mit 400 beantwortet. Anforderungsheader, die das Framework für die eigene Verwendung reserviert, werden nicht weitergeleitet: Namen, die mit `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` oder `x-next-` beginnen, sowie die Namen `x-matched-path` und `next-resume`. Die Anfrage wird ohne sie weitergeleitet. Das Dashboard, die Anmeldeseite, das Management- API und die Inferenzrouten sind über diesen Port nicht erreichbar.

Der `PATCH` muss `Content-Type: application/json` enthalten, ohne Parameter oder nur mit `charset=utf-8`. Es muss einen `Content-Length` von 1 bis 4096 enthalten, geschrieben als einfache Ziffern, und keinen `Transfer-Encoding`. Ein `PATCH`, der gegen eine dieser Regeln verstößt, antwortet mit 404. Einige fehlerhafte Längen, wie etwa eine mit Vorzeichen versehene oder eine wiederholte, werden vom HTTP Parser vor der eigenen Prüfung dieses Ports mit 400 beantwortet. Der Port liest die deklarierten Bytes, bevor er den Hauptport kontaktiert, und wartet höchstens 5 Sekunden darauf. Ein Körper, der bis dahin noch nicht vollständig ist, antwortet mit 404 und seine Verbindung wird geschlossen. In diesem Fall erreicht nichts den Haupthafen oder wenn der Client ihn zuerst verlässt. Der Port leitet genau die deklarierten Bytes mit demselben `Content-Length` weiter. Die darauffolgenden Bytes werden als nächste Anfrage auf der Verbindung gelesen. Ein vorangehender TLS Reverse-Proxy muss `Content-Length` weiterleiten und darf den Anforderungstext nicht erneut aufteilen. Der Hauptport prüft den API Schlüssel im `Authorization` Header, wie beim `GET`.

Der 404-Körper ist `{"error":"not_found","message":"Not found."}`. Ein ausgefallenes Relay antwortet mit 502 (`api_bridge_unavailable`) oder 504 (`api_bridge_timeout`) ohne `detail` Feld.

Der Listener liest `QUOTA_SELF_PANEL` nicht und schaltet die Seite nicht ein. Während das Flag ausgeschaltet ist, antworten die Seite und ihr API mit 404 auf dem Hauptport, und der Listener leitet diese Antwort weiter.

Unter dem Entwicklungsserver (`next dev`) wird die Seite über diesen Port nicht interaktiv. Der Entwicklungs-Hot-Reload-Socket ist eine Upgrade-Anfrage und der Port lehnt diese ab. Verwenden Sie während der Entwicklung den Hauptanschluss.

Der Port stellt einfaches HTTP bereit und die Seite sendet API -Schlüssel. Behalten Sie die Standardbindungsadresse bei und fügen Sie einen Reverse-Proxy mit davor TLS ein. Eine andere Bindungsadresse als Loopback protokolliert diesen Hinweis:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Ein Loopback-Peer, der keinen Weiterleitungsheader sendet, gilt als lokal am Hauptport. Daher muss ein Proxy auf demselben Host `X-Forwarded-For` senden. Einem Proxy an einer privaten Adresse wird für diesen Header nur mit `OMNIROUTE_TRUST_PROXY=private` (oder `lan`) vertraut. Jeder andere Peer wird über die Adresse seiner Verbindung gemeldet und die von ihm gesendeten Weiterleitungsheader werden verworfen.

Der Listener hält maximal 256 Verbindungen gleichzeitig. Ein Client hat 10 Sekunden Zeit, um die Anforderungsheader zu senden, und 30 Sekunden, um die gesamte Anforderung zu senden. Eine inaktive Keep-Alive-Verbindung wird nach etwa 5 Sekunden geschlossen. Eine Verbindung ohne Aktivität für 60 Sekunden wird geschlossen. Diese Werte sind fest vorgegeben. Legen Sie Verbindungs- und Geschwindigkeitsbegrenzungen auch für den Reverse-Proxy davor fest. Ein vorgelagerter Reverse-Proxy sollte seine inaktiven Upstream-Verbindungen weniger als 5 Sekunden lang aufrechterhalten oder sie nicht wiederverwenden. Das Relay zum Hauptport nutzt die Upstream-Timeouts des API Ports (`API_BRIDGE_*`).

Der Listener startet auch, wenn `API_PORT` nicht festgelegt ist. `QUOTA_PANEL_PORT` muss ein Port von 1 bis 65535 sein, der nur in Ziffern geschrieben werden darf. Er muss sich vom Dashboard-Port und dem API Port unterscheiden. Während der Live WebSocket -Server aktiv ist, muss er sich auch von `LIVE_WS_PORT` unterscheiden (Standard 20132). Jeder andere Wert öffnet nichts und protokolliert eine Warnung. Eine Warnung zu einem abgelehnten Wert benennt die Variable und wiederholt den Wert nicht. Ein Port, der bereits verwendet wird, öffnet nichts und protokolliert diese Warnung:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Wenn `OMNIROUTE_BASE_PATH` festgelegt ist, erwartet der Listener jeden oben genannten Pfad unter diesem Präfix. Verwenden Sie zur Erstellungszeit und zur Laufzeit dasselbe `OMNIROUTE_BASE_PATH`. Schreiben Sie es mit einem führenden Schrägstrich und ohne abschließenden Schrägstrich, zum Beispiel `/omniroute`. Eine andere Form, einschließlich `/` und `/omniroute/`, lässt den Port mit einer Warnung aus, obwohl der Build diese Formen akzeptiert. Dies gilt auch für einen Basispfad, dessen erstes Segment eine Anwendungsroute benennt: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` oder `connect`, auf jeden Fall.

Einschränkungen:

- `/quota/{provider}/` mit einem abschließenden Schrägstrich antwortet auf diesem Port mit 404.
- Der Service Worker und das Web-App-Manifest werden an diesem Port nicht bereitgestellt.
- Ein im Dashboard festgelegtes benutzerdefiniertes Favicon wird auf diesem Port nicht angezeigt.
- Symbole werden nicht angezeigt, wenn die Anwendung unter einem Basispfad ausgeführt wird.
- Der Hafen spricht HTTP/1.1.
- Eine fehlgeschlagene Bindung wird erst dann wiederholt, wenn der Prozess neu gestartet wird.
- Für den Listener gibt es keine Verbindungs- oder Ratenbegrenzung pro Clientadresse.
- Container-Setups werden in diesem Abschnitt nicht behandelt.

---

## Umgebungsvariablen

| Variable                             | Standard     | Beschreibung                                                              |
| ------------------------------------ | ------------ | ------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`     | Zu verwendender Treiber: `sqlite` oder `redis`                            |
| `QUOTA_STORE_REDIS_URL`              | _(leer)_     | Redis URL, z. B. `redis://localhost:6379`                                 |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`        | 0..1; `>= threshold` aktiviert den strikten Modus                         |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`       | Token, die höchstens einen Punkt eines Prozentplanfensters erklären       |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`        | 0..1; Multiplikator für den Soft-Policy-Combo-Score                       |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`         | Tage bevor GC alte `quota_consumption` Buckets entfernt                   |
| `QUOTA_PANEL_PORT`                   | _(unscharf)_ | Dedizierter Port für die Self-Service-Seite. Unset bedeutet kein Zuhörer. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`  | Bindeadresse für diesen Port                                              |

DB Einstellungen (`quotaStore.*`) überschreiben Env-Variablen.

---

## Fehlerbehebung

### Redis ist konfiguriert, stellt aber keine Verbindung her

Prüfen Sie, ob `ioredis` installiert ist (`npm ls ioredis`) und ob
`QUOTA_STORE_REDIS_URL` erreichbar ist. Bei einem Verbindungsfehler greift die Factory auf SQLite zurück (protokolliert auf
`warn`-Ebene).

### `peek` gibt veraltete Daten zurück / Fail-Open

Wenn `peek` eine Ausnahme auslöst, behandelt `enforceQuotaShare` das Ergebnis als „zulassen“ (Fail-Open).
Prüfen Sie die `pino`-Protokolle auf Einträge zu `quota:enforce` und `quota:factory`, um
die Ursache zu ermitteln.

### Abweichung des Verbrauchszählers

Wenn die tatsächliche Anbieternutzung von den Zählern abweicht, ist dies zu erwarten — das
gleitende 2-Bucket-Fenster weist an den Fenstergrenzen einen Fehler von etwa 1 % auf, und `consume` wird
nach der Antwort ohne Warten auf den Abschluss ausgeführt. Das Sättigungssignal (`saturationSignals.ts`)
liest die tatsächliche Anbieterauslastung mit einer TTL von 30 Sekunden und passt `globalUsedPercent`
entsprechend an.

### Pool zeigt „keine Daten“ für die Verbrauchsrate

`computeBurnRate` benötigt mindestens 2 historische Stichproben. Neue Pools ohne vorherige
`consume`-Aufrufe zeigen `tokensPerSecond: 0` und `timeToExhaustionMs: null` an.

---

## Migration von localStorage

Beim ersten Laden von `/dashboard/costs/quota-share` prüft der Hook `useLocalStoragePoolMigration`:

1. `localStorage.getItem("omniroute:quota-share:pools")` ist nicht leer.
2. `GET /api/quota/pools` gibt `[]` zurück (die DB ist leer).

Wenn beide Bedingungen erfüllt sind, sendet er jeden Legacy-Pool gesammelt an `POST /api/quota/pools` und entfernt anschließend den localStorage-Schlüssel. Die Migration ist idempotent: Bedingung 2 verhindert eine erneute Migration.

---

## Interne Strategieklassifizierung

`quota-share` ist eine **ausschließlich interne** Routing-Strategie (`INTERNAL_ROUTING_STRATEGY_VALUES` in `src/shared/constants/routingStrategies.ts`). Sie wird ausschließlich von systemseitig erstellten `qtSd/`-Pool-Kombinationen verwendet und bewusst aus `ROUTING_STRATEGY_VALUES` ausgeschlossen, sodass sie weder in der Benutzeroberfläche noch in der API als vom Benutzer auswählbare Option erscheint.

---

## Testabdeckung

Zwei Ebenen der automatisierten Abdeckung werden mit der Quote-Share-Engine geliefert:

| Suite              | Befehl                                                                 | Was es abdeckt                                                                                                                                                                                          |
| :----------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Einheit (29 Tests) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR -Scheduler, Sättigungsgating, Parallelitätsbeschränkungen, fairShare Mathematik, Backlog-Warteschlangen                                                                                             |
| Integrationsmatrix | `npm run test:combo:matrix`                                            | End-to-End-Routing-Entscheidung durch die echte Combo-Pipeline; DRR Fairness + -Sättigungsdepriorisierung über Live-Seams (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Die Integrationsmatrix läuft in CI neben allen 22 öffentlichen Strategien. Die Unit Suite kann eigenständig betrieben werden.

---

## Zusammenfassung DB Schemas

Drei durch die Migrationen `078`, `079` und `085` hinzugefügte Tabellen:

- `quota_pools` + `quota_allocations` — Pooldefinitionen und Zuweisungen pro Schlüssel.
- `quota_consumption` — rollende 2-Bucket-Zähler pro `(apiKeyId, dimensionKey)`.
- `provider_plans` — manuelle Anbieterplanüberschreibungen (Abmessungen JSON pro connectionId).

Alle Tabellen wurden über idempotente `CREATE TABLE IF NOT EXISTS` Migrationen hinzugefügt.

Bei der Kreditvergabe mit Zustimmung werden drei Spalten hinzugefügt: `quota_allocations.lending_percent` (Ganzzahl, Standardwert 0), `quota_allocations.lending_until` (Epochenmillisekunden oder `NULL` für keine Frist) und `quota_pools.borrow_mode` (Standardwert `saturation`). Bei der Migration werden nur diese Spalten hinzugefügt und keine vorhandene Zeile geschrieben.

Das prozentuale Attributionsbuch fügt `quota_percent_ledger` (eine Zeile pro Pool, Konto und Planfenster) und `quota_percent_ledger_tokens` (einen Token-Zähler pro Pool, Konto und API Schlüssel) hinzu. `src/lib/db/quotaPercentLedger.ts` liest und schreibt sie.
