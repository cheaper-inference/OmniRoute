# Guardrails (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Verbindliche Quelle:** `src/lib/guardrails/`
> **Zuletzt aktualisiert:** 2026-08-29 — v3.8.51 (Die Herkunft des Video-Bridge-Transkripts wird vom Aufrufer deklariert,
> aber noch nicht serverseitig verifiziert — gemäß #11661 klargestellt)

Guardrails erzwingen Sicherheitsvorgaben, Richtlinien und Inhaltstransformationen an der Grenze
zwischen OmniRoute und vorgelagerten Anbietern. Jede Guardrail kann Anfrage-Payloads (`preCall`) und
Antworten vorgelagerter Anbieter (`postCall`) prüfen (und optional ablehnen, transformieren oder
mit Anmerkungen versehen).

Das System ist **fehlertolerant (Fail-open)**: Löst eine Guardrail während der Ausführung einen Fehler aus,
zeichnet die Registry den Fehler auf und fährt mit der nächsten Guardrail fort, anstatt die
Anfrage fehlschlagen zu lassen. Das Blockieren ist stets eine explizite Entscheidung (`block: true`)
und niemals ein Versehen.

## Integrierte Schutzmechanismen

Die Registry lädt beim Import automatisch sechs Schutzmechanismen in Prioritätsreihenfolge
(siehe `registry.ts` → `registerDefaultGuardrails()`):

| Priorität | Name                | Phase(n)       | Datei                 |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Niedrigere Prioritätsnummern werden **zuerst** ausgeführt.

### Vision Bridge (`visionBridge.ts`) — Modalitäts-Bridge PR-1

Fängt Anfragen mit Bildern ab, die an **Modelle ohne Vision-Unterstützung** gerichtet sind, und leitet entweder
die gesamte Anfrage an ein visionsfähiges Modell um oder ersetzt die Bildbestandteile
vor dem Upstream-Aufruf durch Textbeschreibungen, die von einem konfigurierbaren Vision-Modell
erzeugt werden. Dadurch können reine Textanbieter multimodale Payloads
transparent verarbeiten.

Ablauf:

1. Überspringen, wenn das Zielmodell bereits Vision unterstützt (es sei denn, es ist in der
   Liste für erzwungene Bridges `isVisionBridgeForcedModel` enthalten).
2. Bildbestandteile über `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`) extrahieren, das die Erkennung an den **vereinheitlichten
   Mediendetektor** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` delegiert — die
   zentrale, gemeinsam mit dem Combo-Kompatibilitätsfilter genutzte Referenz.
   Die Extraktion ist auf Bestandteile der obersten Ebene beschränkt, deren Formen
   `replaceImageParts` wieder einsetzen kann (der Extraktions↔Ersetzungs-Vertrag): OpenAI
   `image_url`, Anthropic-base64 `source.type:"base64"`, Anthropic-URL
   `source.type:"url"` und Responses API `input_image`. Verschachtelte Treffer und
   reine Indikatorformen sind Material für den Combo-Filter und werden niemals extrahiert.
   Überspringen, wenn keine gefunden werden.
3. Laufzeitkonfiguration über `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) auflösen: Neue `modalityBridge*`-
   Einstellungsschlüssel haben Vorrang; ältere `visionBridge*`-Schlüssel bleiben für **einen Zyklus
   als Fallback** erhalten (Rollback-Fenster). Vor jeglichem Durchlaufen der Medien überspringen,
   wenn die Bridge deaktiviert ist.
4. Der Modusauswähler (`modalityBridgeVisionMode`, siehe Tabelle unten) entscheidet
   zwischen Umleitung und Beschreibung. Bei einer Umleitung wird `modifiedPayload` zurückgegeben,
   wobei nur `model` ausgetauscht ist, zusammen mit den Metadaten
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beschreibungspfad: Bilder auf `maxImages` begrenzen, den aufgabenbezogenen Prompt erstellen,
   den Beschreibungs-Cache abfragen, das Vision-Modell **parallel**
   (`Promise.allSettled`) aufrufen und an ihrer Stelle Textbestandteile im Format
   `[Image N]: <description>` einfügen. Eine fehlgeschlagene Beschreibung ergibt `null`, und der
   ursprüngliche Bildbestandteil wird **beibehalten** (#4012) — außer im Combo-Beschreibungspfad,
   wenn alle Beschreibungen fehlgeschlagen sind; dort erhält ein bestätigter Upstream ohne
   Vision-Unterstützung stattdessen einen Stub
   `(unavailable — no vision-capable provider connected)` (#8430).
6. `modifiedPayload` + Metadaten (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) zurückgeben.

#### Modusauswähler (`modalityBridgeVisionMode`)

| Modus      | Standard | Verhalten                                                                                                                                                                                                                                                                                                                                                      |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Unveränderte bisherige Heuristik (#6640/#7204): Nicht-Combo-/`auto/`-Modelle werden an das beste Vision-Modell umgeleitet, sofern das ursprüngliche Modell nicht bereits verwendbare Zugangsdaten besitzt (dann wird beschrieben); Combo-Ziele verwenden immer die Beschreibung.                                                                               |
| `describe` |          | Immer beschreiben — der Umleitungsblock wird vollständig übersprungen; das vom Benutzer gewählte Modell antwortet immer.                                                                                                                                                                                                                                       |
| `reroute`  |          | Umleitung erzwingen: Die Schutzprüfung zum Beibehalten eines Modells mit Zugangsdaten wird umgangen. Die Prüfung der Zugangsdaten für das Umleitungs-**ziel** gilt weiterhin — wenn kein verwendbares Vision-Ziel vorhanden ist, fällt die Anfrage auf die Beschreibung zurück, damit unverarbeitete Bilder niemals ein reines Text-Backend erreichen (#8430). |

Erzwungene Modi führen einen Kurzschluss aus, **bevor** die automatische Heuristik ausgeführt wird; das Verhalten von `auto`
ist byte-identisch mit dem Schutzmechanismus vor PR-1.

#### API-Schlüssel-Geltungsbereich (`visionBridgeKeyScope.ts`)

Wenn der API-Schlüssel des Aufrufers `allowedConnections`, Kontingentpools
(`allowedQuotas`) oder Modelle (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) einschränkt, wählt die Bridge nur
Umleitungs- und Beschreibungsmodelle aus, die der Schlüssel verwenden darf, und zwar über Verbindungen,
die der Schlüssel verwenden darf. Der Beschreibungsaufruf läuft dann immer über die
OmniRoute-Selbstschleife mit dem Header `x-omniroute-self-loop-key-id`, sodass die empfangende
Chat-Anfrage die Verbindungs- und Modellrichtlinie dieses Schlüssels erneut durchsetzt.
`enforceApiKeyPolicy()` berücksichtigt diesen Header nur zusammen mit dem Bearer der Selbstschleife,
sodass er den Zugriff ausschließlich einschränken kann; eine ID, die nicht aufgelöst werden kann,
wird abgelehnt.

Wenn für den Schlüssel kein Vision-Modell zulässig ist, tritt der Beschreibungspfad zurück und
die Anfrage wird unverändert weitergeleitet. Dies entspricht demselben Fail-open-Verhalten wie bei einem
deaktivierten Schutzmechanismus (Metadaten `{ skipped: true, reason: "no_permitted_vision_model" }`).
Anfragen ohne Schlüssel sowie Schlüssel ohne diese Einschränkungen verhalten sich exakt wie
zuvor.

#### Aufgabenbezogener Beschreibungs-Prompt (`modalityBridgeVisionTaskAware`)

Standardmäßig **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) hängt
den Text der **letzten Benutzernachricht** (auf 500 Zeichen gekürzt) an den
grundlegenden Beschreibungs-Prompt an. Dadurch wird die Beschreibung auf das
ausgerichtet, wonach der Benutzer tatsächlich gefragt hat
(codex-vision-proxy-Muster), und das Vision-Modell wird aufgefordert, sichtbaren
Text zu transkribieren. Bei deaktiviertem Flag — oder wenn kein Benutzertext
vorhanden ist — wird der grundlegende Prompt unverändert verwendet.

Die eigene OpenAI-kompatible Anfrage der Beschreibungs-Selbstschleife
(`callVisionModelSingle()` in `visionBridgeHelpers.ts`) fordert immer
`image_url.detail: "high"` an — bedingungslos, für jeden Aufrufer/Provider und
ohne Abhängigkeit von einem Client-Signal. Sampling mit niedriger Detailstufe
verschlechtert die OCR-Genauigkeit gerade bei der Texttranskriptionsaufgabe,
die dieser Prompt verlangt. Daher fordert der Beschreibungsaufruf selbst immer
eine hohe Detailstufe an, unabhängig davon, welche Detailstufe die ursprüngliche
eingehende Anfrage verwendet hat. Dies betrifft nur den internen Request-Body
der Beschreibungsanfrage; es ändert nicht, wie OmniRoute das eigene
`image_url.detail` des Aufrufers in der primären Anfrage weiterleitet — dieser
Standardwert wird separat und nur für erkannte OpenCode-Clients in
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) angewendet.
Der Anthropic-Wire-Format-Zweig der Beschreibungs-Selbstschleife besitzt kein
`detail`-Feld und ist von beiden Standardwerten nicht betroffen.

#### Ausgabelimit für Beschreibungen (`modalityBridgeVisionMaxChars`)

| Schlüssel                      | Standardwert | Bereich            |
| ------------------------------ | ------------ | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`          | `0` oder 100–50000 |

`0` (Standardwert) bedeutet **kein Limit** — die von `callVisionModel()`
zurückgegebene Beschreibung wird unverändert weitergegeben, wodurch das
bestehende Verhalten erhalten bleibt. Jeder Wert im Bereich 100–50000 kürzt
die Beschreibung mit einem `…`-Suffix, bevor sie als
`[Image N]: <description>` wieder eingefügt wird
(`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`).
Erhöhen Sie diesen Wert für detailreiche OCR-Aufgaben, bei denen das
nachgelagerte Modell die vollständige Transkription benötigt; verringern Sie
ihn, um die Token-Nutzung bei ausgabefreudigen Vision-Modellen zu begrenzen.
Das Dashboard-Feld befindet sich im Bereich „Erweitert“ des Vision-Tabs
(`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) und hebt jeden
Wert zwischen 1 und 99 auf den Mindestwert 100 an, während eine explizite `0`
unverändert bleibt — `0` ist selbst ein gültiger Zod-Wert
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`) und nicht
lediglich der Standardwert für „nicht gesetzt“.

#### Beschreibungs-Cache (`modalityBridge/bridgeCache.ts`)

Prozessweit gemeinsam genutzter In-Memory-LRU- und TTL-Cache für
Beschreibungsausgaben. Schlüssel =
`sha256(imageRef + composedPrompt + configuredBridgeModel)` mit
Längenpräfix-Rahmung (keine Kollisionen an Feldgrenzen). Die Modellkomponente
ist das **konfigurierte** Bridge-Modell, nicht das Modell, das tatsächlich
geantwortet hat — `callVisionModel` kann intern auf ein Ersatzmodell
zurückgreifen, und eine Schlüsselbildung pro Versuch würde den Cache
fragmentieren. Fehlgeschlagene Beschreibungen werden niemals
zwischengespeichert. Einstellungen:

| Schlüssel                       | Standardwert | Bereich |
| ------------------------------- | ------------ | ------- |
| `modalityBridgeCacheEnabled`    | `true`       | —       |
| `modalityBridgeCacheTtlMinutes` | `60`         | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`        | 10–5000 |

#### Normalisierung entfernter Bilder (Selbstschleifen-Beschreibung/Base64-Abruf)

Wenn die Bridge selbst ein **entferntes** Bild abruft — beim
Anthropic-Beschreibungs-Selbstaufruf und bei der Base64-Konvertierung für das
Claude-Wire-Format (`ensureBase64ImagesForClaudeWire`), beide über
`fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — wird die
resultierende Daten-URI durch `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) verarbeitet, bevor sie in die Anfrage an
das Vision-Modell eingebettet wird. Übergroße Bilder werden auf eine
**2048px lange Kante** herunterskaliert (entsprechend dem Größenlimit, das
OpenAI/Anthropic bereits serverseitig anwenden). Dies reduziert
Upload-Datenmenge und -Latenz, ohne zu verändern, was das Vision-Modell sieht.
Für die Größenänderung wird `sharp` verwendet und per dynamischem Import
geladen: Auf einer Plattform, auf der dessen native Binärdatei nicht geladen
werden kann, löst `normalizeDataUri()` **niemals eine Ausnahme aus** — die
ursprünglichen Bytes werden stattdessen unverändert durchgereicht, sodass der
Pfad für Beschreibung/Base64-Konvertierung stets funktionsfähig bleibt.
Nicht-Bilddaten (ein Abruf, der kein dekodierbares Bild zurückgegeben hat)
werden ebenfalls unverändert durchgereicht. Diese Normalisierung ist auf Bilder
beschränkt, welche die Bridge für ihren eigenen Selbstaufruf abruft — sie wird
niemals auf die unveränderte Payload des Aufrufers angewendet, entsprechend dem
Prinzip, Änderungen ausschließlich per Opt-in vorzunehmen (Harte Regel #20).

#### Einstellungsschema + Migration

Die neuen `modalityBridge*`-Schlüssel werden in `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) mit Zod validiert:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, das
`modalityBridgeCache*`-Trio und die von der Audio Bridge verwendete
`modalityBridgeAudio*`-Gruppe. Die Migration
`141_modality_bridge_settings.sql` kopiert vorhandene ältere
`visionBridge*`-Werte in die entsprechenden neuen Schlüssel (idempotent und
ohne jemals einen vom Betreiber gesetzten `modalityBridge*`-Wert zu
überschreiben); die älteren Schlüssel werden für einen Release-Zyklus weiterhin
als Lese-Fallback akzeptiert.

#### Transparenz-Header + Statistiken

Durch Beschreibungen transformierte Antworten enthalten
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(erstellt von `buildModalityBridgeHeader()` in
`modalityBridge/bridgeStats.ts`, gesetzt von `withModalityBridgeHeader()` in
`src/sse/handlers/chatHelpers.ts`). Umgeleitete Anfragen erhalten **keinen**
Header — die Payload wurde nicht verändert, und der Modellwechsel ist bereits
im Feld `model` des Response-Bodys sichtbar.

`GET /api/modality-bridge/stats` (Management-Authentifizierung, dieselbe Stufe wie
`GET /api/settings`) gibt die In-Memory-Zähler pro Modalität
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` für `vision`, `audio` und
`video` zurück. `averageLatencyMs` verwendet `latencySamples` und nicht alle
Versuche als Nenner; eine Operation ohne Zeitmessung erzeugt nicht künstlich
eine Stichprobe von null Millisekunden. `bridged` bleibt der
abwärtskompatible Alias für erfolgreiche Konvertierungen; fehlgeschlagene
Versuche erhöhen diesen Zähler nicht.
Die Zähler werden beim Neustart des Prozesses absichtlich zurückgesetzt
(Telemetrie, keine Abrechnung).

#### Dashboard-Konfiguration

Die dedizierte Dashboard-Seite befindet sich unter
`/dashboard/settings/modality-bridge`. Ihre über die URL adressierbaren Tabs `Vision`, `Audio`
und `Video` behalten beim Wechsel des `tab`-Werts die Abfrageparameter bei.
Der Tab „Vision“ bietet Aktivierung, Modus, Modellauswahl (einschließlich der
automatischen Standardeinstellung), aufgabenbezogene Prompts, erweiterte Grenzwerte
für Zeitüberschreitung, Bilder, Beschreibungslänge und Cache, Laufzeitzähler
sowie eine abgesicherte Beispielanfrage. Der Tab „Audio“ ist ebenfalls funktionsfähig:
Er bietet Aktivierung, eine ausschließlich für STT vorgesehene Modellauswahl mit
„Auto“, Grenzwerte für Zeitüberschreitung und maximale Cliplänge, Audiozähler sowie
einen Beispieltest mit `input_audio`. Der Tab „Video“ ist funktionsfähig: Er zeigt
den Laufzeitstatus von FFmpeg/ffprobe an — einen von vier expliziten UI-Zuständen
(`unknown`, während die Prüfung läuft oder nicht abgeschlossen werden konnte,
`restricted` bei einem Dashboard-Host außerhalb des Loopbacks, bei dem die
Prüfung clientseitig übersprungen wird, `unavailable`, nachdem die Prüfung
durchgeführt und das Fehlen bestätigt wurde, oder `available` mit den
FFmpeg/ffprobe-Versionen) —, speichert Aktivierungs-, Modell-, Frame-, Video- und
Zeitüberschreitungsgrenzwerte dauerhaft, filtert die Modellauswahl nach
vision-fähigen Modellen und stellt Videozähler bereit.

Die frühere Vision-Bridge-Karte unter den KI-Einstellungen ist ein
Kompatibilitätslink zur neuen Seite; sie enthält keine zweite Kopie des Formulars
mehr. „Media Providers“ verknüpft außerdem die Workflows für Image-to-Text und
Speech-to-Text mit den entsprechenden Modality-Bridge-Tabs, ohne den vorhandenen
Speech-to-Text-Playground zu entfernen.

**Umgehung der Self-Loop-Zulassungsprüfung:** Wenn der Beschreibungsaufruf über
OmniRoutes eigenen `/v1`-Self-Loop geleitet wird (Modell eines nicht standardmäßigen
Providers), sendet die Unteranfrage
`x-omniroute-admission-bypass: internal` und wird mit den aufgelösten
Self-Loop-Zugangsdaten authentifiziert — dem lokalen `sk_omniroute`-Sentinel im
lokalen Modus oder dem vom Betreiber konfigurierten Umgebungsschlüssel
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (#1350), sodass Bereitstellungen mit
`REQUIRE_API_KEY=true` den Beschreibungsaufruf weiterhin ausführen können. Die
Umgehung wird nur für genau diese Zugangsdaten akzeptiert, sodass externe Clients
den Header nicht verwenden können, um die Zulassungsprüfung zu überspringen.

Die Legacy-Standardwerte befinden sich in
`src/shared/constants/visionBridgeDefaults.ts`; die neuen Standardwerte für
Modus, Aufgabenbezug und Cache sowie der Einstellungs-Resolver befinden sich in
`src/shared/constants/modalityBridgeDefaults.ts`. Der Guardrail stellt eine
Konstruktoroption `deps` bereit, damit Tests gefälschte Implementierungen von
`getSettings` und `callVisionModel` injizieren können.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Fängt Chat-Anfragen mit Audioinhalten ab, bevor sie ein Ziel erreichen, von dem
nicht bekannt ist, dass es Audioeingaben akzeptiert. Die Chat-Anfrage wird niemals
umgeleitet: Audioteile werden über den vorhandenen OpenAI-kompatiblen
Multipart-Endpunkt transkribiert, und das ausgewählte Chatmodell fährt mit den
Texttranskripten fort.

Ablauf:

1. `supportsAudio` über `getResolvedModelCapabilities()` auflösen. Explizite
   Metadaten aus der Provider-Registry haben Vorrang, gefolgt von statischen
   Modellmetadaten und anschließend synchronisierten `modalities_input`. Eine
   deklarierte Eingabeliste ohne `audio` ergibt `false`; wenn keine
   Fähigkeitsinformationen vorliegen, bleibt der Wert `null`. Sowohl `false`
   als auch `null` aktivieren die konservative Bridge, während `true` sie
   umgeht.
2. Die Einstellungen `modalityBridgeAudio*` auflösen und über den gemeinsamen
   Detektor `detectMediaParts()` austauschbare Audioelemente auf oberster Ebene
   aus jeder Nachricht extrahieren. Unterstützte Übertragungsformate sind
   OpenAI-`input_audio`, `audio_url` und `source.media_type: "audio/*"`.
   Verschachtelte Audioinhalte werden für das Routing erkannt, aber vom
   Austauschpfad nicht entfernt. Die Verarbeitung wird durch
   `modalityBridgeAudioMaxClips` begrenzt; nachfolgende Elemente bleiben
   unverändert.
3. Ein konfiguriertes `provider/model` berücksichtigen oder
   `selectAudioBridgeModel()` in stabiler Katalogreihenfolge durch
   `AUDIO_TRANSCRIPTION_PROVIDERS` laufen lassen und das erste Modell mit
   verwendbaren aktiven Provider-Zugangsdaten auswählen.
4. `callAudioTranscription()` konvertiert Base64-/Daten-URI-Audio in eine
   Multipart-`file` oder lädt eine entfernte `audio_url` über den ausschließlich
   öffentlichen ausgehenden Guard mit DNS-Pinning und einer Begrenzung auf
   25 MB herunter. Anschließend werden die Datei und das ausgewählte Modell per
   POST an den lokalen `/v1/audio/transcriptions`-Self-Loop gesendet, authentifiziert
   mit `resolveSelfLoopBearer()`. Die vorhandene Transkriptionsroute führt die
   normale Suche nach Zugangsdaten, die Behandlung von Abklingzeiten und
   Ratenbegrenzungen sowie die Provider-Weiterleitung durch.
5. Erfolgreiche Aufrufe ersetzen ihre Elemente durch
   `[Audio N]: <transcript>`. Die Aufrufe werden mit `Promise.allSettled`
   ausgeführt: Ein einzelner Fehler behält das ursprüngliche Audioelement bei
   (#4012-Vertrag). Wenn alle Aufrufe fehlschlagen und für das Ziel
   `supportsAudio === false` nachgewiesen ist, werden die Elemente zu
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-Vertrag). Bei
   einem unbekannten Ziel (`null`) bleibt das Ergebnis unverändert, wenn alle
   Aufrufe fehlschlagen. Ein nachweislich ausschließlich textbasiertes Ziel ohne
   verwendbare STT-Zugangsdaten erhält denselben expliziten Platzhalter, ohne
   dass ein Netzwerkaufruf erfolgt.

Erfolgreiche Transkripte verwenden den prozessweiten LRU-/TTL-Cache der Modality
Bridge. Der Schlüssel kombiniert die Audioreferenz, die stabile
Operationsbezeichnung `audio-transcription` und das ausgewählte STT-Modell;
Fehler werden niemals zwischengespeichert. Audioversuche aktualisieren die
gemeinsam genutzten Zähler `bridged`, `cacheHits`, `failures` und `lastUsedAt`.
Transformierte Antworten enthalten
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; unveränderte
Anfragen erhalten kein Audio-Bridge-Segment.

Die Laufzeiteinstellungen werden in der Datenbank gespeichert und mit Zod validiert:

| Schlüssel                     | Standardwert | Bereich          |
| ----------------------------- | ------------ | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`       | —                |
| `modalityBridgeAudioModel`    | `""`         | Auto oder STT-ID |
| `modalityBridgeAudioTimeout`  | `60000`      | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`          | 1–10             |

Der gemeinsam genutzte Cache wird weiterhin durch `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` und `modalityBridgeCacheMaxEntries` gesteuert.

### Video-Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Fängt Videoelemente der obersten Ebene in Chat-Completions-`messages` und im
Responses-API-`input` ab, bevor ein Ziel ohne bekannte native
Videounterstützung aufgerufen wird. Unterstützte Formen sind `input_video`,
`video_url`, `video_source`, HTTPS-URLs und
`data:video/*;base64,...`-Daten-URIs. Einfache Dateinamen im Text werden nicht
als Video behandelt.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) übernimmt die Traversierung
der Anfrage, die Prüfung von Fähigkeiten und Richtlinien, die Aggregation pro
Anfrage und die Antwortnutzlast. Die Verarbeitung pro Video – Beschaffung, der
Cache für vollständige Ergebnisse, die Beschreibung einer Bildsequenz (bei der
ein vom Aufrufer angegebenes Audiotranskript eingebunden wird) sowie
Metriken/Abbruch/Bereinigung pro Versuch – ist hinter `processVideoPart` in
`videoBridgePipeline.ts` verborgen, das innerhalb der Schleife von `preCall`
einmal pro Videoelement aufgerufen wird. Dieses Modul definiert außerdem die
expliziten Portgrenzen `VideoMediaBrokerPort` (Beschaffung von Bytes und
Extraktion abgetasteter Einzelbilder), `VideoAudioTranscriptionPort`
(Einbindung eines vom Aufrufer angegebenen Audiotranskripts in die abgetasteten
Bildunterschriften) und `VideoDrilldownPort` (die Persistenzgrenze für
Einzelbild-Drilldowns; noch nicht mit `processVideoPart` verbunden – derzeit
schreibt nur die separate Route `/api/modality-bridge/video/drilldown`
Drilldown-Einträge).

Der öffentliche `/v1`-Anfragepfad importiert oder startet niemals einen
Unterprozess. Remote-Videos werden unter Einhaltung einer Grenze von 50 MiB
heruntergeladen; für Base64-Videos im Inlineformat gilt eine konservative
Obergrenze von 36 MiB dekodierter Daten pro Video, damit die Hülle aus
Modell-, Nachrichten- und Framing-Daten innerhalb des öffentlichen
Zulassungslimits von 50 MiB für JSON-Anfragen bleiben kann. Inline-Länge und
Schätzwerte für die dekodierte Größe werden vor der Speicherzuweisung geprüft.
Für die ursprüngliche Remote-URL und jede Weiterleitung ist HTTPS erforderlich,
wobei die bestehende Schutzvorrichtung für ausschließlich öffentliche ausgehende
Verbindungen mit DNS-Pinning verwendet wird. Anschließend überschreiten die
Bytes exakt die interne Brokergrenze
`POST /api/modality-bridge/video/extract`. Diese Route ist sowohl `LOCAL_ONLY`
als auch `SPAWN_CAPABLE`, akzeptiert nur eine prozessintern authentifizierte,
vertrauenswürdige Loopback-Anfrage und niemals eine URL, einen Dateisystempfad,
eine ausführbare Datei oder eine Argumentliste. Die Pipeline zur Begrenzung der
API-Textkörpergröße und der inkrementelle Textkörperleser des Handlers erzwingen
unabhängig voneinander eine Eingabeobergrenze von 50 MiB für den Broker. Seine
begrenzte Warteschlange führt jeweils eine Extraktion aus, erlaubt vier
ausstehende Aufträge und begrenzt ausstehende Eingabedaten auf 100 MiB.

Innerhalb des Brokers liest `ffprobe` eine private lokale Datei; die feste
Format-Positivliste schließt Wiedergabelisten- und Manifestformate aus. Bei
zulässigen Containern der MOV-Familie bleiben externe MOV-Datenreferenzen
standardmäßig deaktiviert, und der feste Befehl aktiviert sie nicht. Sowohl
`ffprobe` als auch `ffmpeg` verwenden die ausschließlich auf `file` beschränkte
Protokoll-Positivliste, einen Thread, feste Argument-Arrays, keine Shell sowie
über `PATH` aufgelöste ausführbare Dateien. Coverstreams mit angehängten Bildern
gelten nicht als abspielbare Kandidaten. Alle abspielbaren Streams müssen die
Grenzwerte einhalten, wobei ein expliziter Standardstream vor dem
deterministischen Rückgriff auf den Stream mit dem niedrigsten Index bevorzugt
wird. Videos sind auf 600 Sekunden, 8.192 Pixel pro Dimension und 33.554.432
Quellpixel begrenzt. FFmpeg tastet 1–16 JPEG-Einzelbilder an den Mittelpunkten
ab, skaliert die lange Kante ohne Hochskalierung kleinerer Eingaben auf
höchstens 1.024 Pixel herunter und erhält niemals eine URL. Standardmäßig ist
die Abtastung `uniform`. Die optionalen Richtlinien `scene_aware` und die
experimentelle Richtlinie `segment_aware` führen einen zusätzlichen festen
FFmpeg-Durchlauf über den bereits validierten lokalen Stream aus, wählen eine
begrenzte Anzahl von `showinfo`-Szenenzeitstempeln aus und greifen bei einem
Detektorfehler, einer Zeitüberschreitung, fehlerhafter Ausgabe oder einer leeren
Kandidatenmenge deterministisch auf dieselben gleichmäßig verteilten
Mittelpunkte zurück. Der segmentbezogene Modus weist den validierten
Szenenintervallen proportionale Mittelpunktabtastungen zu; segmentbezogene
Nachweise und das Rückfallverhalten werden nachstehend ausführlich beschrieben.
Die feste Obergrenze von 16 Einzelbildern wird bei jeder Richtlinie nach der
Auswahl angewendet. Wenn eine szenenbezogene Anfrage nur über ein Budget von
einem Einzelbild verfügt, verwendet sie den gleichmäßig verteilten Mittelpunkt
des aktiven Gesamtvideo- oder Fokusfensters und meldet
`policyEffective: uniform`: Ein einzelnes ausgewähltes Szenenbild kann nicht
beide zeitlichen Enden bewahren. Ein Aufrufer kann optional ein endliches
Fokusfenster (`start`/`end` in Sekunden) angeben; die Grenzen werden auf die
Mediendauer beschränkt, umgekehrte oder nicht endliche Fenster werden
abgelehnt, und sämtliche Abtastrichtlinien werden ausschließlich innerhalb des
normalisierten Intervalls angewendet. Das resultierende Fenster wird in die
Abtastmetadaten und das Präfix der nicht vertrauenswürdigen Beschreibung
aufgenommen, damit nachgelagerte Modelle einen fokussierten Ausschnitt von der
vollständigen Zeitleiste unterscheiden können.

Der semantische Fokus für Bildunterschriften ist eine separate, explizite
Einstellung. Der standardmäßige Analysemodus `full` behält die bestehende
Eingabeaufforderung für Einzelbilder bei und leitet niemals Anfragetext an das
Bildunterschriftenmodell weiter. Im Modus `focused` liest die Bridge nur den
neuesten nicht leeren, vom Benutzer verfassten `text`/`input_text` aus
demselben Chat- oder Responses-Container, normalisiert ihn gemäß NFC, fasst
Steuerzeichen und Leerraum zusammen und begrenzt ihn auf 500
Unicode-Codepunkte. Ein leeres Ergebnis führt zu einem Rückgriff auf exakt die
`full`-Eingabeaufforderung. Ein verwendbarer Hinweis wird als JSON in einem
eigenen Block für nicht vertrauenswürdigen Benutzerkontext serialisiert und
darf nur beobachtbare Details priorisieren; er kann die separate Warnung,
sichtbaren oder hörbaren Anweisungen in den Medien nicht zu folgen, nicht außer
Kraft setzen. Der textuelle Fokus leitet niemals `start`/`end` ab und ändert
den zeitlichen Abtaster nicht.

#### FU-07 – struktureller Segmentnachweis

`segment_aware` verwendet einen einzigen begrenzten Voranalysedurchlauf über den bereits validierten lokalen Videostream. Die feste Filterkette skaliert zunächst auf eine Breite von höchstens 320 Pixeln, erkennt Szenenwechsel und eingefrorene Intervalle und führt dann mit 1 Bild pro Sekunde Stichproben für Unschärfe, durchschnittliche Luminanz sowie räumliche/zeitliche Informationen durch. Der Durchlauf ist auf 600 strukturelle Stichproben, einen FFmpeg-/Filter-Thread, dieselben Protokoll- und Container-Zulassungslisten ausschließlich für `file`, eine Begrenzung der Prozessausgabe auf 1 MiB und höchstens 30 Sekunden innerhalb des gemeinsamen Abbruch-/Fristmechanismus des Brokers beschränkt. Er übernimmt niemals einen Befehl, Filter, Pfad oder eine URL aus der Anfrage.

Die Strukturwerte sind deterministische Stichprobenbelege und kein semantisches Videoverständnis. Sie leiten daraus weder Motive, Handlungen, Untertitel, Sprache noch Benutzerabsichten ab. Szenen- und Standbildgrenzen bilden Segmente; Standbildabdeckung, Unschärfe, Belichtung, räumlicher Detailgrad und zeitliche Veränderung beeinflussen lediglich, wie das bestehende Budget von 1–16 Bildern zugewiesen wird. Ein vollständig eingefrorenes Segment wird auf ein Bild begrenzt, während nicht eingefrorene Segmente um das verbleibende Budget konkurrieren. Wenn mehr Grenzen als Bilder vorhanden sind, wird eine gleichmäßige Abdeckung der Zeitleiste beibehalten, damit schnelle frühe Schnitte kein langes nachfolgendes Segment verbergen können. Szenengrenzen, die innerhalb der Analyseauflösung von 1 Sekunde um eine Standbildgrenze liegen, werden zusammengeführt.

Fehlende Filter, fehlerhafte/leere Belege, ein Detektorfehler oder eine Zeitüberschreitung der begrenzten Voranalyse führen als offene Fehlerbehandlung exakt zur einheitlichen Mittelpunktstrategie zurück. Ein Abbruch durch den Aufrufer oder das Erreichen der Broker-Frist führt nicht zu dieser offenen Fehlerbehandlung: Dadurch wird der laufende Unterprozess beendet, eine spätere Bildextraktion verhindert und der private temporäre Verzeichnisbaum in `finally` entfernt.

`scripts/perf/video-bridge-fu07-eval.ts` erzeugt deterministische echte FFmpeg-Testdaten für Einsparungen bei Untertitelaufrufen nach der Deduplizierung, die Budgetzuweisung bei hoher Bewegungsdichte, Belege zu Unschärfe/Belichtung/SI-TI, schnelle Schnitte mit einem langen Ausklang sowie falsch positive Ergebnisse bei allmählichen Überblendungen. Das Skript zeichnet die reale Dauer der Voranalyse sowie, sofern `/usr/bin/time` verfügbar ist, die CPU-Zeit des Kindprozesses und den maximalen RSS-Speicherverbrauch auf. Seine Qualitätsprüfungen sind ausschließlich strukturelle Orakel. Die Qualität echter Untertitelmodelle verbleibt auf `HOLD`, da diese Testumgebung weder über einen autorisierten Endpunkt noch über einen eingefrorenen Prüfer verfügt. Monetäre Einsparungen verbleiben ebenfalls auf `HOLD`, sofern nicht mit `--caption-cost-per-call-usd` eine explizite positive Kostenschätzung pro Aufruf angegeben wird; das Skript erfindet keines der beiden Ergebnisse.

Jedes Bild ist auf 4 MiB, alle Rohbilder zusammen auf 23 MiB und die serialisierte Broker-Antwort auf 32 MiB begrenzt. Ein privates temporäres Verzeichnis wird in `finally` entfernt. OmniRoute enthält FFmpeg nicht und akzeptiert keinen benutzerdefinierten Pfad zur ausführbaren Datei. Vor der Untertitelung wendet die Bridge einen konservativen Durchlauf zur visuellen Deduplizierung an: Jedes JPEG wird auf einen 16×16-Graustufenpuffer reduziert und ausschließlich mit dem zuletzt beibehaltenen Bild verglichen. Bei einem angeforderten Untertitelbudget von mehr als einem Bild liefert die Extraktion einen begrenzten Kandidatenpool von bis zum Doppelten dieses Budgets und niemals mehr als 16 Bilder. Die angeforderte Obergrenze wird erst nach der Deduplizierung angewendet, wobei bei der abschließenden Ausdünnung der erste und der letzte ausgewählte Kandidat beibehalten werden, wenn das Budget mindestens zwei beträgt. Die versionierte Strategie `grayscale-16x16-mean-cells-v2` verwendet den größeren Wert aus der mittleren Luminanzdifferenz und dem Anteil der Miniaturbildzellen, deren normalisierte Differenz mindestens 0,05 beträgt. Der Duplikatschwellenwert ist die Konstante 0,04, die zugunsten der Vorhersagbarkeit gewählt wurde, anstatt als Laufzeiteinstellung verfügbar gemacht zu werden. Dieses sekundäre Signal mit hohem Kontrast bewahrt kleine Bewegungen und Änderungen an sichtbarem Text, die ein ausschließlich auf Mittelwerten basierender Vergleich verbergen kann. Fehler im Komparator oder Decoder führen als offene Fehlerbehandlung dazu, dass die Abdeckung erhalten bleibt. Die Ausgabemetadaten unterscheiden zwischen extrahierten Kandidaten, erfolgreich verwendeten Bildern und verworfenen visuellen Duplikaten.

Ein ausdrücklich gekennzeichneter Videoteil kann einen mit Zeitstempeln versehenen Kontaktabzug anfordern. Die Bridge erstellt ein JPEG-Raster aus höchstens 16 Bildern mit maximal 4 Spalten. In jede 512 Pixel große Zelle wird der Zeitstempel der Quelle in ein kontrastreiches Band am unteren Rand eingebrannt, während dieselben Zeitstempel zur nachgelagerten Zuordnung und Prüfung auch in den Textmetadaten verbleiben. Das vollständige JPEG bleibt auf 32 MiB begrenzt. Wenn `sharp` das Raster nicht decodieren oder zusammensetzen kann, greift die Bridge auf die einzelnen JPEG-Bilder zurück; ein Clientabbruch wird weiterhin durch den Kontaktabzugsvorgang weitergegeben.

Belege für eine Freigabe werden bewusst getrennt vom synthetischen Mikrobenchmark zur Zusammensetzung behandelt. `scripts/perf/video-bridge-contact-sheet-eval.ts` definiert eine schemaversionierte A/B-Testumgebung für echte OpenAI-kompatible Bildverarbeitungsmodelle. Sie misst die vom Anbieter gemeldeten Token, die gesamte reale Latenz einschließlich der Zusammensetzung des Kontaktabzugs, die Anzahl der Modellaufrufe und die Beibehaltung der im Manifest definierten Fakten. Unverarbeitete Modellantworten werden nicht in den Bericht geschrieben; beibehalten werden nur SHA-256-Digests und IDs übereinstimmender Fakten. Die Testumgebung führt keinen Netzwerk- oder kostenpflichtigen Modellaufruf durch, sofern nicht `--execute-real` übergeben wird und `--model`, `OMNIROUTE_BASE_URL` sowie `OMNIROUTE_API_KEY` konfiguriert sind. Ohne diesen expliziten echten Durchlauf verbleibt das maschinenlesbare Urteil auf `HOLD`; synthetische Messungen von Nutzdaten und Aufrufanzahl allein sind keine Freigabebelege.

Aufrufer können an einen unterstützten Videoteil ein optionales `transcript.cues`-Array anhängen, wenn sie bereits über zeitlich ausgerichteten Text verfügen. Jeder Eintrag muss `text`, ein endliches `start`-/`end`-Intervall innerhalb der ermittelten Dauer und eine in der Zulassungsliste enthaltene `source` (`client`, `embedded` oder `audio-bridge`) besitzen; `confidence` ist standardmäßig `1` und muss zwischen `0` und `1` liegen. Exakt identische Einträge werden zusammengeführt. OmniRoute startet anhand dieser Metadaten niemals eine Transkription: Validierte Einträge werden mit Quelle, Konfidenz und Intervall in das beschriebene Ergebnis kopiert und neben den Bilduntertiteln als nicht vertrauenswürdige Beobachtungen dargestellt. Ungültiger, außerhalb des zulässigen Bereichs liegender oder herkunftsloser Text wird zurückgewiesen, statt in den Untertitelstream aufgenommen zu werden. Beide Transkriptkanäle des Anfragekörpers normalisieren die angegebene Herkunft zu `client`, einschließlich selbst deklarierter Kennzeichnungen als `embedded` oder `audio-bridge`. Nur ein serverseitig verwalteter Adapter kann diese vertrauenswürdigen Kennzeichnungen über das ausschließlich im Code verfügbare Argument `trustedSource` zuweisen; ein JSON-Feld der Anfrage kann dieses Argument nicht erreichen. Transkripttext bleibt unabhängig von seiner Herkunft ein nicht vertrauenswürdiger, aus Medien abgeleiteter Inhalt und darf niemals über die Autorisierung entscheiden.

Ein fortgeschrittener Aufrufer kann eine `audioTranscript`-Spur für dasselbe Video bereitstellen;
sie wird als vom Client bereitgestellter Text behandelt, nicht als Nachweis einer serverseitigen Transkription.
Die Fusionsschnittstelle führt visuelle und akustische Beobachtungen innerhalb
einer gemeinsamen Frist und mit demselben Abbruchsignal aus, ordnet sie auf einer gemeinsamen Zeitleiste an, fasst
exakte Duplikate zusammen und meldet ein Teilergebnis, wenn nur eine Seite erfolgreich ist.
Ein ungültiges `audioTranscript` führt zu diesem Teilergebnis — die visuelle
Beschreibung bleibt erhalten und der Audiozweig zeichnet einen bereinigten Fehlercode auf —
anstatt das gesamte Video fehlschlagen zu lassen. Die Verfügbarkeit je Zweig, das Teilstatus-Flag
und die bereinigten Fehlercodes bleiben im beschriebenen Ergebnis, in den
Guardrail-Metadaten (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), in den Ergebnis-Cache-Metadaten und in den
Fusionszählern der Bridge erhalten. Der standardmäßige Video-Bridge-Pfad ruft weder Speech-to-Text
auf noch lädt er eine zweite Medienkopie herunter; ohne diese explizite Spur bleibt er
auf Video beschränkt.

**Aufbewahrung von Transkripten (#12150 P1).** Dies gilt automatisch, wenn die
Video Bridge (die selbst Opt-in ist) einen Transkripthinweis rendert — es gibt kein separates
Aufbewahrungs-Flag. Wenn eine Anfrage irgendeinen Transkripthinweis rendert (ein vom Aufrufer deklariertes
`transcript` oder ein fusioniertes `audioTranscript`), markiert die Guardrail sie als
`videoBridgeObserved` und erzeugt eine redigierte Schattenkopie der Videobeschreibung —
ein identisches Rendering, in dem der Freitextinhalt jedes Hinweises durch
`[redacted-video-transcript]` ersetzt wird, indem das strukturierte Hinweisfeld
vor dem Zusammensetzen der Zeichenfolge substituiert wird (niemals durch Parsen des abgeflachten Textes, sodass kein
Hinweisinhalt — weder adversarialer noch gewöhnlicher, einschließlich Inhalten mit `]` wie
`[inaudible]`/`[music]` — erhalten bleiben kann). Der persistierte Anfragekörper des Aufrufprotokolls ersetzt
jeden vom Video abgeleiteten Textteil durch diese redigierte Schattenkopie, abgeglichen anhand
der Inhaltsgleichheit; der `fullText`-Anker wird erneut aus der fertiggestellten Guardrail-Nutzlast
vor dem Aufruf gelesen, sodass der Abgleich auch dann noch erfolgreich ist, nachdem spätere verkettete Guardrails (die PII- und
Anmeldedaten-Maskierer mit den Prioritäten 10/95) den Beschreibungstext direkt überschreiben und
nachdem System-Prompt-/Handoff-/Memory-Injektionen das Nachrichten-Array umgeformt haben. Der
an das Modell gesendete Körper bleibt unverändert. Eine beobachtete Anfrage befüllt außerdem
keinen dauerhaften Memory-Speicher (sowohl die anfrage- als auch die antwortbasierte Extraktion werden übersprungen),
sodass die Antwort des Modells selbst keinen Transkripttext in Memory wiedergeben kann.

**Unverarbeitete Videofelder (#12430).** Wenn die Bridge aktiviert ist und die native Videounterstützung unbekannt ist oder fehlt, aktivieren definierte `transcript`-/`audioTranscript`-Felder ebenfalls `videoBridgeObserved`, selbst nach einem Fehler bei der Beschreibung oder einem `maxVideos`-Limit. `null` und leere Zeichenfolgen zählen; fehlende Felder und Nicht-Video-Metadaten nicht. Aufbewahrte Kopien redigieren diese Felder oder lassen die Anfrage weg, und Caches/Memory werden umgangen.

Auf diesen Fallback-Pfaden werden gültige, vom Aufrufer bereitgestellte Hinweise zu unterstützten `text`-/`input_text`-
Teilen anstatt zu nicht standardmäßigen Anbieterfeldern. Beide von der Anfrage bereitgestellten Spuren
bleiben nicht vertrauenswürdige `client`-Beobachtungen, mit einem ausdrücklichen Hinweis, dass das Video
nicht beschrieben wurde und Zeitstempel nicht anhand der Medien verifiziert wurden. Die bestehenden
Gesamt- und Pro-Hinweis-Budgets von 256 Hinweisen/64 KiB gelten zusammen für beide Spuren;
Zeitstempel müssen innerhalb der 600-Sekunden-Obergrenze des Brokers und eines gegebenenfalls bereitgestellten Fokusfensters
liegen. Ungültige Spuren werden verworfen und nicht als beliebiger Text weitergeleitet; eine gültige
Geschwisterspur kann weiterhin verwendet werden, sofern ihr gemeinsames Budget nicht überschritten wird. Null-/leere
Felder fügen keinen Text hinzu. Durch diesen Fallback werden weder Medien abgerufen noch Transkriptionen hinzugefügt.
Transkript-Erweiterungsfelder werden aus dem Fallback-Videoträger und seinen
`video_url`-/`source`-Objekten entfernt. Die OpenAI-Übertragungs-Positivliste bleibt strikt; unbekannt-native
Videoträger bleiben verfügbar und bekannte reine Textziele behalten sichere Markierungen.
Strukturierte Redaktions-Schattenkopien schützen den angehängten Transkripttext, während die
ursprüngliche, dem Aufrufer gehörende Anfrage unverändert bleibt. Nativ unterstützte Ziele und
deaktivierte Bridges behalten ihr bestehendes Umgehungsverhalten bei.

Zusätzliche aufbewahrte Kopien verwenden dasselbe Signal für beobachtete Anfragen. Der unverarbeitete
Client-Anfrage-Snapshot vor der Guardrail, die ausstehende Anfrage im Arbeitsspeicher und das Protokoll
frühzeitig abgelehnter Anfragen ersetzen Transkriptfelder in Videoteilen strukturell;
von Pipeline-Stufen und der Kontextübergabe synthetisierte Zeichenfolgen-Prompts werden
an der Senke für den persistierten Anfragekörper redigiert. Die persistierte Markierung `video_content_removed`
bewirkt, dass eine Fortsetzung per `previous_response_id` sicher fehlschlägt, anstatt Text zu rekonstruieren,
der absichtlich verworfen wurde. Wenn eine beobachtete Anfrage ihre
Redaktions-Schattenkopie je Teil vor der Protokollierung verliert oder auch nur eine von mehreren Video-Schattenkopien
nach späteren Anfragemutationen nicht mehr übereinstimmt, wird der aufbewahrte Anfragekörper
vollständig weggelassen, anstatt ein nur teilweise redigiertes Transkript aufzubewahren.

Bei einer beobachteten Anfrage könnte eine Modellantwort jeden beliebigen Teil des
Transkripts ohne strukturierte Hinweisgrenze zitieren. Ihr persistierter `responseBody`
im Aufrufprotokoll wird daher durch eine Auslassungsmarkierung ersetzt; das detaillierte
Pipeline-Artefakt (das Upstream-/Client-Körper und Stream-Blöcke enthalten kann)
wird nicht aufbewahrt. Semantik-, Idempotenz- und Reasoning-Replay-Caches umgehen
Lese- und Schreibvorgänge für diese Anfrage. Die Anbieteranfrage und die für den Client sichtbare
Antwort bleiben unverändert. Frühe Keepalive-Bytes werden aus dem temporären
Puffer entfernt, wenn das detaillierte Artefakt weggelassen wird. Kiros Warnung zu fehlerhaftem EventStream
meldet nur die Byteanzahl der Nutzlast, niemals deren Inhalt oder den unverarbeiteten Fehler
des JSON-Parsers.
Damit wird nicht behauptet, dass alle nicht damit zusammenhängenden Anbieter-/Plugin-Diagnosen
geprüft wurden; die umfassendere Prüfung persistierter Senken wird in #11658 nachverfolgt.

Der interne `/api/modality-bridge/video/drilldown`-Lebenszyklus ist eine separate,
durch Loopback/Token authentifizierte Cache-Infrastruktur. Jede Operation erfordert
außerdem eine kanonische, opake Principal-ID. Bevor ein Produktionsaufrufer aktiviert
wird, muss er diese ID aus dem authentifizierten Mandanten ableiten und darf niemals
einen vom Client ausgewählten Wert weiterleiten. Cache-Schlüssel binden diesen Principal
an kanonische Sitzungs- und Videoreferenz-IDs, speichern nur deren mittels SHA-256
abgeleitete Schlüssel und beschränken sowohl Lese- als auch Löschvorgänge auf denselben
Principal. Der Cache speichert höchstens 16 abgeleitete JPEG-Frames pro Eintrag, lässt
sie nach zehn Minuten ablaufen und unterstützt begrenzte Lesevorgänge mit
`start`/`end` oder das explizite Löschen einer Sitzung.

Jeder Principal ist auf 16 Einträge und 64 MiB kanonischer JPEG-Daten begrenzt. Diese
Grenzen gelten unabhängig von der globalen Obergrenze von 64 Einträgen/256 MiB: Bei
Auslastung des Principal-Kontingents werden nur die am längsten nicht verwendeten
Einträge dieses Principals entfernt, bevor eine globale LRU-Verdrängung in Betracht
gezogen wird. Abgelaufene Einträge werden bei Cache-Aktivität sowohl aus der
Principal- als auch aus der globalen Abrechnung entfernt, während bei Abbruch oder
Validierungsfehlern kein partieller Ersatz übernommen wird.

Der Cache weist nicht kanonisches Base64, übermäßiges Padding, Nicht-JPEG-Medien,
fehlerhafte oder abgeschnittene JPEGs sowie JPEGs zurück, die bei einer begrenzten
vollständigen Bilddekodierung mit `sharp` eine Warnung erzeugen. Jedes akzeptierte Bild
wird erneut als kanonisches JPEG kodiert; Breite und Höhe werden aus den dekodierten
Bytes abgeleitet, anstatt den Feldern des Aufrufers zu vertrauen, und nachgestellte
Polyglot-Bytes werden verworfen statt beibehalten. Nur der begrenzte kanonische,
komprimierte Puffer wird auf beide Kontingente angerechnet. Das JSON-Übertragungslimit
berücksichtigt den Base64-Overhead für die Obergrenze von 32 MiB für dekodierte
Eingaben. Jede gespeicherte Ableitung erfasst ihr validiertes JPEG-Format und ihre
Auflösung, die Sampling-Richtlinie, die Ableitungsversion, den Erstellungszeitpunkt,
den serverseitig berechneten Inhalts-Hash sowie die gehashte übergeordnete Referenz
zusammen mit dem Hash des übergeordneten Inhalts vom vertrauenswürdigen Aufrufer.
Zwischen asynchronen Dekodierungs-/Hash-Phasen wird vor der atomaren Cache-Übernahme
auf einen Abbruch geprüft.

Dieses Arbeitspaket verbindet noch keinen Produktions-Producer mit der Route und
stellt keine Auswahl von Varianten mit mehreren Auflösungen bereit. Der transparente
Anfragepfad der Video Bridge verursacht daher keinen zusätzlichen Aufwand, während
die mandantengebundene Principal-Ableitung und der vollständige
FU-08-Mehrfachauflösungs-Lebenszyklus explizite Folgearbeiten bleiben, statt als
vollständig implementiertes Verhalten dokumentiert zu werden.

Frames werden nacheinander mit dem konfigurierten Video-Modell beschriftet. Eine leere
Video-Überschreibung übernimmt die Vision-Einstellung; wenn beide leer sind, wählt der
Vision-Auto-Router das tatsächlich zu verwendende visionsfähige Modell aus.
Erfolgreiche Beschriftungen ersetzen den ursprünglichen Teil durch ein stabiles
`[Video description:`-Präfix, das den Text außerdem als nicht vertrauenswürdige,
aus Medien abgeleitete Beobachtung kennzeichnet und nachgelagerte Modelle anweist,
keinen in den Medien gefundenen Anweisungen zu folgen. Die Cache-Schlüssel für
Frame-Beschriftungen umfassen die JPEG-Bytes, den Prompt, den Zeitstempel und das
tatsächlich verwendete Modell; nur erfolgreiche Beschriftungen werden
zwischengespeichert. Cache-Einträge behalten das tatsächlich erfolgreiche
Producer-Modell bei, einschließlich eines Fallback-Modells; die Bridge meldet `mixed`,
wenn verschiedene Frames von unterschiedlichen Modellen erzeugt wurden. Bei einem
Cache-Treffer wird diese Producer-Identität wiederverwendet, statt sie als den
angeforderten Routing-Plan neu zu kennzeichnen. Der Ergebnis-Cache für das gesamte
Video wird anhand jeder Eingabe verschlüsselt, die die Ausgabe verändert — Prompt,
tatsächlich verwendetes Modell, Sampling-Richtlinie, Frame-Anzahl, semantischer
Analysemodus, SHA-256-Fingerabdruck des normalisierten Fokushinweises, Fokusfenster,
`transcript`, `audioTranscript` und das Kontaktbogen-Flag —, sodass jede Änderung an
einer dieser Dimensionen zu einem Cache-Fehlschlag führt und niemals zu einer
veralteten Wiederverwendung. Die Version der visuellen Deduplizierungsrichtlinie, der
Schwellenwert und die begrenzte Anzahl an Kandidaten-Frames werden ebenfalls
ausdrücklich im Ergebnis-Cache-Schlüssel und in den Metadaten festgehalten; eine
Richtlinienänderung kann daher keine veraltete Beschreibung des gesamten Videos
wiederverwenden. Die Metadaten des Ergebnis-Cache v4 enthalten den Modus und den
Fingerabdruck, niemals die unverarbeitete Benutzeraufgabe. Die
Guardrail-Metadaten melden sowohl den angeforderten als auch den tatsächlich
verwendeten Analysemodus; ein angeforderter `focused`-Modus ohne verwertbaren
Benutzertext wird effektiv als `full` gemeldet.

Die Guardrail extrahiert jeden unterstützten Videoteil, beschreibt jedoch höchstens
`modalityBridgeVideoMaxVideos`. Bei einem Ziel, für das
`supportsVideo === false` nachgewiesen wurde, werden fehlgeschlagene und über dem
Limit liegende Videos zu expliziten sicheren Textmarkierungen, sodass kein
unverarbeitetes Video erhalten bleibt. Wenn die Fähigkeit unbekannt ist, behalten
diese Teile ihren Videoträger bei; ein etwaiges Fallback-Transkript folgt der oben
beschriebenen begrenzten Textkonvertierung. Ziele mit `supportsVideo === true`
umgehen die Bridge. Das Abbruchsignal der Client-Anfrage wird an Download,
Broker-Warteschlange, Unterprozesse und Beschriftungsaufrufe weitergegeben;
Abbrüche stoppen zwischen Videos und führen niemals dazu, dass unverarbeitete
Medien ersatzweise durchgelassen werden.

Laufzeiteinstellungen werden in der DB gespeichert und mit Zod validiert:

| Schlüssel                           | Standardwert | Bereich / Verhalten                                                                                                                       |
| ----------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`      | Optionale Laufzeitumgebung, Opt-in                                                                                                        |
| `modalityBridgeVideoAnalysisMode`   | `"full"`     | `full` behält generische Beschriftungen bei; `focused` verwendet begrenzten, nicht vertrauenswürdigen Kontext der letzten Benutzereingabe |
| `modalityBridgeVideoModel`          | `""`         | Übernimmt das Vision-Bridge-Modell                                                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`          | 1–16                                                                                                                                      |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`  | `uniform`, `scene_aware` oder proportionales `segment_aware`; bei einem Detektorfehler wird auf `uniform` zurückgegriffen                 |
| `modalityBridgeVideoMaxVideos`      | `1`          | 1–4                                                                                                                                       |
| `modalityBridgeVideoTimeout`        | `120000`     | 1000–120000 ms                                                                                                                            |

Ältere persistierte Video-Timeout-Werte über 120 Sekunden werden auf die
Broker-Deadline begrenzt; neue Einstellungsänderungen oberhalb dieses Grenzwerts werden abgelehnt.
`GET /api/modality-bridge/video/runtime` erfordert vor der Authentifizierung oder Laufzeitprüfung
eine vertrauenswürdig markierte Loopback-Lokalität und anschließend eine
Management-Authentifizierung. Die Antwort enthält ausschließlich `available`, bereinigte FFmpeg-/ffprobe-Versionen und einen festen
Grund, wenn die Laufzeitumgebung nicht verfügbar ist. Der interne Extraktionsendpunkt ist keine
öffentliche Upload-API: Eine Warteschlangenüberlastung gibt `503` plus `Retry-After` zurück, ein
Verbindungsabbruch durch den Aufrufer gibt `499` zurück und die feste Broker-Deadline gibt `504` zurück. Konvertierte Antworten fügen
`video->text;model=<visionModel>;parts=<videos>` zum zentralen
`x-omniroute-modality-bridge`-Header hinzu, ohne Vision- oder Audiosegmente zu entfernen.

### PII-Maskierer (`piiMasker.ts`)

Wird in **beiden** Phasen ausgeführt.

- **`preCall`** klont die Nutzlast, durchläuft `system`, `messages`, `input` und
  `prompt` (einschließlich einfacher Zeichenfolgenelemente) und wendet `processPII()` (aus
  `@/shared/utils/inputSanitizer`) auf `content`-/`text`-Felder vom Typ Zeichenfolge an. Wenn
  `PII_REDACTION_ENABLED=true` gilt, werden erkannte personenbezogene Daten in der ausgehenden
  Nutzlast unkenntlich gemacht. Dies ist unabhängig von `INPUT_SANITIZER_MODE` (das nur die
  Richtlinie für Prompt-Injection steuert). Wenn die Unkenntlichmachung deaktiviert ist, zeichnet der Aufruf die Anzahl der
  Erkennungen auf, ohne den Inhalt umzuschreiben.
- **`postCall`** erstellt einen tiefen Klon der Antwort und führt `sanitizePIIResponse()` sowie
  den Maskierer für die Form der Responses-API (`maskResponsesOutput` — deckt
  `output_text` und `output[].content[].text` ab) aus. Wenn eine Unkenntlichmachung erfolgt,
  ersetzt die geänderte Antwort das Original.

Die Schutzmaßnahme blockiert niemals; sie versieht Inhalte lediglich mit Anmerkungen (`meta.detections`,
`meta.redacted`) oder schreibt sie um.

#### Auswahl nach Typ, benutzerdefinierte Muster und Erkennungszähler

Unter **Dashboard → Einstellungen → Sicherheit → PII-Maskierung** wird ausgewählt, _was_ maskiert wird. Dadurch
wird die Maskierung nicht aktiviert: Dafür sind weiterhin `PII_REDACTION_ENABLED` (Anfrage) und
`PII_RESPONSE_SANITIZATION` (Antwort + SSE) zuständig; beide sind standardmäßig deaktiviert.

- **Auswahl nach Typ** — die integrierten IDs sind in
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) aufgeführt. Nicht festgelegt bedeutet alle
  Typen (das Verhalten, bevor diese Einstellung eingeführt wurde). Das
  `ssn_us`-Muster der Anfrage-Engine wird `ssn` zugeordnet. Vorlagen (Minimal, Standard, Finanzen,
  Brasilien, USA, Vollständig) füllen lediglich die Kontrollkästchen in der Benutzeroberfläche aus.
- **Benutzerdefinierte Muster** — bis zu 20 reguläre Ausdrücke oder Platzhaltermuster (`*` = bis zu 64
  Zeichen außer Leerraumzeichen, `?` = eines). Übereinstimmungen werden zu `[CUSTOM_REDACTED]`.
  Jedes Muster wird durch `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`) verarbeitet: höchstens 500 Zeichen, Flags beschränkt
  auf `g i m s u`, muss kompilierbar sein, muss `safe-regex` bestehen (katastrophales
  Backtracking) und darf weder mit einer leeren Zeichenfolge noch mit einem Platzhalter für unkenntlich gemachte Daten übereinstimmen.
  Ein fehlerhaftes Muster wird beim Speichern und Testen abgelehnt, und eine gespeicherte Zeile,
  die fehlerhaft ist, wird zur Laufzeit übersprungen, anstatt kompiliert zu werden. Benutzerdefinierte Muster werden nur
  ausgeführt, während die Maskierung aktiviert ist.
- **Erkennungszähler** — Anzahl pro Typ (niemals die übereinstimmenden Werte), im
  Arbeitsspeicher gehalten und bei einem Neustart zurückgesetzt (`src/lib/pii/piiDetectionStats.ts`). Sie werden nur
  erhöht, während die Maskierung aktiviert ist.

Die Einstellungen befinden sich in der Tabelle `key_value` (Namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) und werden über einen 1-s-Cache gelesen. API:

| Methode | Pfad                     | Zweck                                                                               |
| ------- | ------------------------ | ----------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/pii`      | Status der Flags, `enabledTypes`, `customPatterns`, Erkennungszähler                |
| `PUT`   | `/api/settings/pii`      | Ersetzt `enabledTypes` (`null` = alle) und/oder `customPatterns`                    |
| `POST`  | `/api/settings/pii/test` | Testlauf eines Musters gegen ein Beispiel mit maximal 8 KB; nichts wird gespeichert |

Alle drei erfordern eine Management-Authentifizierung und validieren den Body mit Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Prompt-Injection (`promptInjection.ts`)

Erkennt schädliche Strukturen in von Benutzern bereitgestellten Inhalten und setzt die
konfigurierte Richtlinie durch. Das Verhalten wird durch Umgebungsvariablen und Konstruktoroptionen
gesteuert:

| Einstellung      | Umgebungsvariable                                                                                     | Standardwert | Auswirkung                                                                                                                                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktiviert        | `INPUT_SANITIZER_ENABLED`                                                                             | `true`       | Bei `false` wird die Guardrail kurzgeschlossen.                                                                                                                                                                                                                  |
| Modus            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`       | Injektionsrichtlinie: `block`, `warn` oder `log`. (`redact` wird aus Gründen der Abwärtskompatibilität akzeptiert, entfernt jedoch **keinen** Injektionstext; das Umschreiben personenbezogener Daten in Anfragen wird durch `PII_REDACTION_ENABLED` gesteuert.) |
| Blockierschwelle | Option `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (Alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`       | Mindestschweregrad, der zum Blockieren erforderlich ist. Bei der Standardeinstellung wird `Medium` nur beobachtet.                                                                                                                                               |

**Moduspriorität** (`getMode`): `options.mode` des Aufrufers →
**DB-Feature-Flag-Überschreibung** für `INJECTION_GUARD_MODE` (Dashboard → Einstellungen →
Feature-Flags) → Umgebungsvariable `INJECTION_GUARD_MODE` → Umgebungsvariable `INPUT_SANITIZER_MODE` →
`warn`. Eine Dashboard-Überschreibung hat daher Vorrang vor den Umgebungsvariablen, sodass die
Feature-Flags-Benutzeroberfläche die laufende Guard live steuert (kein Neustart erforderlich). Das Lesen
aus der DB ist ausfallsicher: Wenn dabei ein Fehler auftritt, greift die Guard auf das umgebungsvariablenbasierte
Verhalten zurück; wenn keine Überschreibung festgelegt ist, entspricht das Verhalten vollständig der
Auflösung ausschließlich über Umgebungsvariablen.

Erkennungsquellen:

1. `sanitizeRequest()` aus `@/shared/utils/inputSanitizer` (gemeinsamer Satz
   von Detektoren, der an anderer Stelle in der Pipeline verwendet wird).
2. Integrierte `DEFAULT_GUARD_PATTERNS` (derzeit `system_override_inline` und
   `markdown_system_block`, beide mit Schweregrad `high`).
3. Optionale `customPatterns`, die über Konstruktoroptionen übergeben werden (Zeichenfolgen, reguläre
   Ausdrücke oder Datensätze der Form `{ name, pattern, severity }`).

Wenn `mode === "block"` gilt **und** mindestens eine Erkennung den
Schwellenwert für den Schweregrad erreicht, gibt `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }` zurück. In den Modi `warn`/`log` protokolliert die Guardrail den
Vorfall, lässt den Aufruf jedoch zu. Die gemeinsame Hilfsfunktion `evaluatePromptInjection()` wird ebenfalls exportiert,
damit Aufrufer Prompts auswerten können, ohne die Registry zu durchlaufen.

**Scanbegrenzung (v3.8.20):** Der Detektor untersucht nur die **ersten 16 KB** des
zusammengefügten Prompttexts — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 Byte) in
`src/shared/utils/inputSanitizer.ts`. Sowohl `detectInjection()` als auch
`evaluatePromptInjection()` führen vor dem Durchlaufen der Muster
`slice(0, MAX_INJECTION_SCAN_BYTES)` aus. Injektionsanweisungen befinden sich üblicherweise am Anfang einer Eingabe, daher
begrenzt dies die Regex-CPU-/GC-Belastung bei Payloads mit mehreren Hundert KB, ohne die Erkennung zu schwächen (vgl.
#3932, #4041).

### Anmeldedaten-Maskierer (`credentialMasker.ts`)

Wird in **beiden** Phasen ausgeführt, in der Standardkette zuletzt (Priorität `95`). Schwärzt
bekannte API-Schlüssel-/Geheimtoken-Muster aus der ausgehenden Payload (Nachrichteninhalt,
Tool-Aufrufargumente, Tool-Ergebnisse) **und** aus der Provider-Antwort, sodass
in einen Prompt eingefügte Anmeldedaten (oder von einem Tool-Ergebnis zurückgegebene Anmeldedaten) weder
an den vorgelagerten Provider noch zurück an den Client gelangen.

- **Nur nach Aktivierung**, gemäß derselben Konvention wie bei der Schwärzung personenbezogener Daten (angrenzend an feste Regel Nr. 20):
  deaktiviert, sofern nicht `settings.credentialRedactionEnabled === true` **oder**
  `CREDENTIAL_REDACTION_ENABLED=true` gilt. Bei deaktivierter Funktion ist die Guardrail ein No-op —
  sie blockiert und verändert niemals etwas.
- `redactCredentials()` durchläuft den vollständigen Payload-/Antwortbaum (`walkValue()`,
  sicher gegen Prototype Pollution, mittels `WeakSet` gegen Zyklen abgesichert) und ersetzt Treffer durch
  einen Platzhalter der Form `[REDACTED:<type>]`, wobei nur tatsächlich
  geänderte Zweige geklont werden.
- `CREDENTIAL_PATTERNS` deckt Schlüssel von LLM-Providern (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-Tokens (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), Zahlungsschlüssel (Stripe, Square), Cloud-
  Schlüssel (AWS-Zugriffsschlüssel, Twilio, SendGrid, Mailgun), private Schlüssel/JWTs,
  Verbindungszeichenfolgen mit Anmeldedaten (`mongodb://user:pass@...` usw.) sowie
  ein generisches Muster für Header-Werte von `Authorization`/`x-api-key`/`api-key`/`apikey`
  ab. Header-artige Schlüssel (`authorization`, `x-api-key`, `api-key`,
  `apikey`) werden strukturell geschwärzt (nur der Wert, Schemapräfixe wie
  `Bearer `/`Basic ` bleiben erhalten) und nicht über den generischen Text-Regex.
- Die Guardrail blockiert niemals; sie schreibt lediglich um (`modifiedPayload` /
  `modifiedResponse`) und fügt Annotationen hinzu (`meta.credentialsRedacted`, `meta.count`).

Regressionsschutz: `tests/unit/credential-masker-guardrail.test.ts`.

## Basisvertrag (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true bricht die Kette vorzeitig ab
  message?: string; // wird beim Blockieren ausgegeben
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // wird von preCall zurückgegeben, um die Anfrage umzuschreiben
  modifiedResponse?: TValue; // wird von postCall zurückgegeben, um die Antwort umzuschreiben
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Eine Schutzvorrichtung signalisiert „keine Änderung“, indem sie entweder `void`, `{}` oder
`{ block: false }` zurückgibt. Die Rückgabe eines `modifiedPayload`/`modifiedResponse` ersetzt
den Wert, der für nachgelagerte Schutzvorrichtungen durch die Kette fließt.
`signal?: AbortSignal` überträgt den Lebenszyklus des Aufrufers an die Schutzvorrichtungen. Der Abbruch einer Anfrage ist die bewusste Fail-Open-Ausnahme: Medienbrücken beenden ihre Arbeit und führen Aufräumarbeiten durch, ohne rohe Medien für ein Ziel wiederherzustellen, von dem bekannt ist, dass es diese nicht unterstützt.

## Registrierung (`registry.ts`)

Der Singleton `guardrailRegistry` stellt Folgendes bereit:

- `register(guardrail)` — fügt eine Schutzvorrichtung hinzu (oder ersetzt sie anhand ihres normalisierten Namens) und
  sortiert erneut nach aufsteigender `priority`.
- `clear()` / `list()` — administrative Hilfsfunktionen.
- `runPreCallHooks(payload, context)` — durchläuft aktive Schutzvorrichtungen, reicht die
  Nutzlast über `modifiedPayload` weiter und stoppt beim ersten `block: true`.
- `runPostCallHooks(response, context)` — derselbe Ablauf auf der Antwortseite.
- `resetGuardrailsForTests({ registerDefaults })` — löscht den Zustand und registriert optional
  die Standardwerte erneut, um eine saubere Testisolation zu gewährleisten.

Beide Ausführungsfunktionen geben `{ blocked, payload|response, results, guardrail?, message? }`
zurück, wobei `results` ein Array von `GuardrailExecutionResult`-Datensätzen ist, die
für jede Schutzvorrichtung die Felder `blocked`, `skipped`, `modified`, `error` und `meta`
enthalten, was für die Ablaufverfolgung nützlich ist.

### Schutzvorrichtungen pro Anfrage deaktivieren

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` erstellt eine
deduplizierte Liste der Namen von Schutzvorrichtungen, die für die aktuelle
Anfrage übersprungen werden sollen. Quellen (alle optional, alle zusammengeführt):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` im Anfragekörper (auf oberster Ebene)
- `metadata.disabledGuardrails` im Anfragekörper
- Header `x-omniroute-disabled-guardrails` (oder veraltet
  `x-disabled-guardrails`)

Werte können Zeichenfolgen-Arrays oder eine kommagetrennte Zeichenfolge sein; Namen werden
in kleingeschriebene Kebab-Case-Schreibweise normalisiert (`pii_masker` → `pii-masker`). Das Ergebnis
wird über `context.disabledGuardrails` an die Registrierung übergeben, die
übereinstimmende Schutzvorrichtungen überspringt (`skipped: true` in `results`).

## Ausführungsreihenfolge

Für jede Anfrage, die `src/sse/handlers/chat.ts` und
`open-sse/handlers/chatCore.ts` durchläuft:

1. `resolveDisabledGuardrails(...)` erstellt anhand von API-Schlüssel, Body
   und Headern die Liste der zu überspringenden Guardrails.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` führt Guardrails in
   aufsteigender Prioritätsreihenfolge aus:
   - Deaktivierte Guardrails werden als `skipped` erfasst.
   - `preCall` jedes Guardrails kann die Nutzdaten über `modifiedPayload`
     umschreiben.
   - Das erste `block: true` bricht die Kette vorzeitig ab, und der Handler
     gibt eine Guardrail-Ablehnungsantwort zurück.
3. Die (möglicherweise umgeschriebenen) Nutzdaten werden an das Combo-Routing
   und die Upstream-Weiterleitung übergeben.
4. Nachdem die Antwort zusammengestellt wurde, führt
   `guardrailRegistry.runPostCallHooks(...)` dieselbe Kette für die Antwort
   aus. `block: true` verwirft hier die Upstream-Antwort.

Guardrails, die eine Ausnahme auslösen, werden mit `error: <message>` erfasst
und über `logger.warn` protokolliert, die Kette wird jedoch fortgesetzt —
dies entspricht dem Fail-Open-Prinzip.

## Konfiguration

Von den integrierten Guardrails gelesene Umgebungsvariablen:

| Variable                              | Verwendet von               | Auswirkung                                                                                                            |
| ------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`          | Auf `false` setzen, um die Erkennung vollständig zu deaktivieren.                                                     |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`          | Injektionsrichtlinie: `warn`, `block` oder `log`. Der Legacy-Wert `redact` schreibt Injektionstext nicht um.          |
| `INJECTION_GUARD_MODE`                | `prompt-injection`          | Modus für den Injektions-Guard; zugleich ein DB-Feature-Flag, das die Umgebungsvariablen **überschreibt** (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`          | Mindestschweregrad, den `MODE=block` ablehnt: `high` (Standard), `medium` oder `low`.                                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`          | Legacy-Alias für `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`                | Bei `true` werden personenbezogene Daten in Anfragen redigiert (unabhängig vom Injektionsmodus).                      |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nachgelagert) | Steuert das Maskierungsverhalten auf der Antwortseite.                                                                |

Die Modality-Bridge-Guardrails lesen die Laufzeitkonfiguration aus dem
DB-gestützten Einstellungsspeicher (`getSettings()`), nicht aus
Umgebungsvariablen. Die primären Schlüssel für Vision sind
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` und
`modalityBridgeCacheMaxEntries`. Die Legacy-Schlüssel
`visionBridge*` werden nur als dokumentierter Lese-Fallback für einen Zyklus
akzeptiert; Schreibvorgänge über das Dashboard verwenden die primären
Schlüssel. Standardwerte und der Fallback-Resolver befinden sich in
`src/shared/constants/modalityBridgeDefaults.ts`, während Legacy-Konstanten in
`src/shared/constants/visionBridgeDefaults.ts` beibehalten werden.

Audio verwendet `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` und `modalityBridgeAudioMaxClips` sowie die
gemeinsam genutzten `modalityBridgeCache*`-Einstellungen. Für Audio gibt es
keinen Legacy-Schlüssel-Fallback, da diese Schlüssel mit dem
Modality-Bridge-Schema eingeführt wurden.

Video verwendet `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` und
`modalityBridgeVideoTimeout` sowie die gemeinsam genutzten
`modalityBridgeCache*`-Einstellungen. Es ist standardmäßig deaktiviert, da
FFmpeg/ffprobe optionale betriebliche Abhängigkeiten sind und die
Frame-Beschriftung zusätzliche Latenz und Modellkosten verursacht.

## Benutzerdefinierte Guardrails

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Schritte:

1. Erstellen Sie `src/lib/guardrails/myGuardrail.ts` als Erweiterung von `BaseGuardrail`.
2. Implementieren Sie `preCall` und/oder `postCall`.
3. Registrieren Sie die Guardrail entweder beim Import (über `registerDefaultGuardrails`) oder
   rufen Sie zur Laufzeit `guardrailRegistry.register(...)` auf — die Registry ersetzt
   jede vorhandene Guardrail mit demselben normalisierten Namen.
4. Fügen Sie Tests unter `tests/unit/` hinzu (vorhandene Beispiele:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Tests

Verwenden Sie zwischen den Tests `resetGuardrailsForTests()`, um mit einem bekannten Zustand zu beginnen.
Übergeben Sie `{ registerDefaults: false }`, um mit einer leeren Registry zu beginnen und
nur die zu testenden Guardrails zu registrieren. Vision Bridge unterstützt Dependency
Injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge stellt entsprechende
Schnittstellen für Einstellungen, Fähigkeiten, STT-Modellauswahl, Anmeldedatenprüfungen
und Transkription bereit. Tests können daher beide Abläufe ohne Datenbank- oder
Netzwerkzugriff ausführen.

## Siehe auch

- `src/lib/guardrails/` — Implementierung
- `src/shared/utils/inputSanitizer.ts` — gemeinsamer Detektor, auf dem
  Prompt-Injection-Erkennung und PII-Maskierung basieren
- `src/shared/constants/visionBridgeDefaults.ts` — Standardwerte für Vision Bridge und
  Modellliste für erzwungenes Bridging
- `src/shared/constants/modalityBridgeDefaults.ts` — gemeinsame Laufzeitstandardwerte für Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — orthogonale Schicht (Circuit Breaker, Cooldowns)
- `docs/reference/ENVIRONMENT.md` — vollständige Referenz der Umgebungsvariablen

## Routenabdeckung des Injection-Guards und Red-Teaming (Phase 8 · Block D)

Der Injection-Guard (`createInjectionGuard` / `withInjectionGuard`) deckt alle Routen ab,
die Benutzer-Prompts akzeptieren. Er berücksichtigt `INJECTION_GUARD_MODE` (Standardwert `warn` = nur protokollieren;
`block` = gibt HTTP 400 `SECURITY_001` zurück).

| Typ              | Routen                                                                                                                                               | Standardmodus |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Text (vorhanden) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Generativ        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Daten            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Die Textextraktion (`extractMessageContents`) deckt `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ab.

**Red-Teaming (nächtlich, `nightly-llm-security.yml`):** promptfoo überprüft, dass jede Route
den OWASP-LLM-Korpus bei `INJECTION_GUARD_MODE=block` blockiert; garak führt Prüfungen aus (wird ohne Secret übersprungen).
`moderations` ist aus Konsistenzgründen enthalten — Betreiber können die Route im Blockierungsmodus über
`resolveDisabledGuardrails` ausnehmen.

Der nächtliche Workflow (`.github/workflows/nightly-llm-security.yml`, Cron + manueller
Start) umfasst zwei Jobs:

- **`promptfoo-guard` (blockierend)** — führt `promptfoo eval -c promptfooconfig.yaml`
  mit `INJECTION_GUARD_MODE=block` aus. Jeder adversariale Fall (z. B. „ignore all
  previous instructions…“, Jailbreaks im DAN-Stil) stellt sicher, dass die Antwort
  `error.code === "SECURITY_001"` enthält, d. h., dass die Guardrail die Anfrage tatsächlich abgelehnt hat.
- **`garak` (informativ)** — führt garak mit `--probes promptinject,dan,leakreplay`
  gegen eine lokale OmniRoute-Instanz (`http://localhost:20128/v1`) aus. Die Ausführung hängt von einem
  Provider-Secret (`PROMPTFOO_PROVIDER_KEY`) ab; ohne dieses wird sie ordnungsgemäß übersprungen und ist mit
  `|| true` versehen, sodass Ergebnisse gemeldet werden, ohne dass CI fehlschlägt.

Die Abdeckung des Guard-Helfers (`createInjectionGuard` / `withInjectionGuard`)
erstreckt sich über jede Prompt-verarbeitende `/v1`-Route; der Prompt-Text wird durch
`extractMessageContents()` in `src/shared/utils/inputSanitizer.ts` aus
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` extrahiert.
