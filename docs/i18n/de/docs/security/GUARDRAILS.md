# Guardrails (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Maßgebliche Quelle:** `src/lib/guardrails/`
> **Zuletzt aktualisiert:** 2026-10-17 — v3.8.52 (hinzugefügt: [Abdeckung und Grenzen](#coverage-and-limits):
> welche Routen und Antwortpfade die Hooks erreichen, die zusammengeführten Disable-Header (#16412), der
> Injection-Blockmodus als verbindliche Grenze (#16413) und was eine Antwort vor dem Post-Call sieht)

Guardrails erzwingen Sicherheits-, Richtlinien- und Inhaltstransformationen an der Grenze
zwischen OmniRoute und den Upstream-Anbietern. Jede Guardrail kann Request-Payloads
(`preCall`) und Upstream-Antworten (`postCall`) prüfen (und optional ablehnen,
transformieren oder annotieren).

Das System ist **fail-open**: Wenn eine Guardrail während der Ausführung einen Fehler
wirft, protokolliert die Registry den Fehler und fährt mit der nächsten Guardrail fort,
statt den Request fehlschlagen zu lassen. Blockieren ist eine explizite Entscheidung
(`block: true`), niemals ein Versehen. Die einzige Ausnahme ist ein abgebrochener
Request: Wenn das `signal` des Aufrufers abgebrochen wird, lehnt eine werfende
Guardrail den Hook-Lauf ab, statt übersprungen zu werden.

Die Hooks laufen **nicht** auf jeder Route und nicht für jede Antwort. Lesen Sie
[Abdeckung und Grenzen](#coverage-and-limits), bevor Sie sich auf eine Guardrail als
Sicherheitskontrolle verlassen.

## Eingebaute Guardrails

Die Registry lädt beim Import automatisch sechs Guardrails in Prioritätsreihenfolge
(siehe `registry.ts` → `registerDefaultGuardrails()`):

| Priorität | Name                | Stufe(n)       | Datei                 |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Niedrigere Prioritätsnummern laufen **zuerst**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Das GLM-5.3-Basismodell und `glm-5.3-{low,high,max}` haben explizite
`supportsVision:false`-Registry-/Spec-Metadaten. Die GLM-5.3-Flash-Varianten bleiben
nativ vision-fähige Modelle. Die `/v1/messages`-Route von Claude Code tritt in die
gemeinsame `handleChat`-Pre-Call-Guardrail-Kette ein, **bevor** die
Claude-zu-OpenAI-Übersetzung stattfindet; verschachtelte `Read`-Tool-Ergebnisbilder
müssen beschrieben oder verarbeitet werden, bevor diese Übersetzung sie in
OpenAI-`image_url`-Inhalte überführt (#17069).

Fängt bildhaltige Requests ab, die an **Nicht-Vision-Modelle** gerichtet sind, und
leitet entweder den gesamten Request an ein vision-fähiges Modell um oder ersetzt die
Bildteile vor dem Upstream-Aufruf durch Textbeschreibungen, die von einem
konfigurierbaren Vision-Modell erzeugt werden. Dadurch können reine Textanbieter
multimodale Payloads transparent verarbeiten.

Ablauf:

1. Überspringen, wenn das Zielmodell bereits Vision unterstützt (es sei denn, es
   erscheint in der Forced-Bridge-Liste `isVisionBridgeForcedModel`).
2. Bildteile über `extractImageParts(messages)` extrahieren
   (`visionBridgeHelpers.ts`), das an den **vereinheitlichten Mediendetektor**
   `detectMediaParts()` in `open-sse/utils/mediaParts.ts` delegiert — die einzige
   maßgebliche Quelle, die mit dem Kombo-Kompatibilitätsfilter geteilt wird.
   Die Extraktion ist per Allowlist auf die Formen beschränkt, die
   `replaceImageParts` wieder einfügen kann (der Extract↔Replace-Vertrag): OpenAI
   `image_url`, Anthropic Base64 `source.type:"base64"`, Anthropic-URL
   `source.type:"url"` und Responses-API `input_image`. Passende Bilder, die in
   Claude-Code-`tool_result.content` und Responses-Tool-Ausgaben verschachtelt sind,
   werden ebenfalls extrahiert und an ihren ursprünglichen Pfaden ersetzt; reine
   Indikator-Formen sind Kombo-Filter-Material und werden nicht extrahiert.
   Überspringen, wenn keine gefunden werden.
3. Laufzeitkonfiguration über `resolveVisionBridgeRuntimeSettings()` auflösen
   (`src/shared/constants/modalityBridgeDefaults.ts`): neue
   `modalityBridge*`-Einstellungsschlüssel haben Vorrang; die alten
   `visionBridge*`-Schlüssel bleiben ein **Ein-Zyklus-Fallback**
   (Rollback-Fenster). Überspringen, bevor irgendeine Medien-Durchquerung erfolgt,
   wenn die Bridge deaktiviert ist.
4. Der Modusselektor (`modalityBridgeVisionMode`, siehe Tabelle unten) entscheidet
   zwischen Umleiten und Beschreiben. Umleiten gibt `modifiedPayload` zurück, bei
   dem nur `model` ausgetauscht wurde, plus Meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beschreibungspfad: Bilder auf `maxImages` begrenzen, den aufgabenbezogenen Prompt
   zusammenstellen, den Beschreibungs-Cache konsultieren, das Vision-Modell
   **parallel** aufrufen (`Promise.allSettled`) und `[Image N]: <description>`-Textteile
   an deren Stelle einfügen. Eine fehlgeschlagene Beschreibung ergibt `null`: Das
   Rohbild wird für unbekannte/vision-fähige Ziele beibehalten (#4012), aber ein
   **bestätigtes reines Text-Direktziel** oder eine Kombo ganz ohne Vision erhält
   für jedes unbeschriebene Bild einen expliziten
   `(unavailable — no vision-capable provider connected)`-Text-Stub, einschließlich
   partieller Fehler und Bilder jenseits der Obergrenze für Beschreibungsaufrufe
   (#17069). Der bestehende Kombo-Beschreibungs-Fallback für den Fall, dass alle
   fehlschlagen, bleibt bestehen (#8430).
6. `modifiedPayload` + Meta zurückgeben (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Modusselektor (`modalityBridgeVisionMode`)

| Modus      | Standard | Verhalten                                                                                                                                                                                                                                                                                                             |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Legacy-Heuristik, unverändert (#6640/#7204): Nicht-Combo-/`auto/`-Modelle werden auf das beste Vision-Modell umgeleitet, es sei denn, das ursprüngliche Modell verfügt bereits über nutzbare Anmeldedaten (dann Describe); Combo-Ziele führen immer ein Describe durch.                                               |
| `describe` |          | Immer Describe — der Reroute-Block wird vollständig übersprungen; das vom Benutzer gewählte Modell antwortet immer.                                                                                                                                                                                                   |
| `reroute`  |          | Reroute erzwingen: Die Keep-Credentialed-Model-Schutzprüfung wird umgangen. Die Credential-Guard für das Reroute-**Ziel** gilt weiterhin — wenn kein nutzbares Vision-Ziel existiert, blockiert die Bridge mit einem klaren Fehler, statt ein Describe durchzuführen oder Rohbilder an ein reines Textziel zu senden. |

Erzwungene Modi schalten **vor** der Auto-Heuristik kurz; das `auto`-Verhalten
ist byte-identisch mit der Guardrail vor PR 1.

#### API-Schlüssel-Geltungsbereich (`visionBridgeKeyScope.ts`)

Wenn der API-Schlüssel des Aufrufers `allowedConnections`, Kontingent-Pools
(`allowedQuotas`) oder Modelle einschränkt (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), wählt die Bridge
nur Reroute- und Describe-Modelle aus, die der Schlüssel verwenden darf, auf
Verbindungen, die der Schlüssel verwenden darf. Der Describe-Aufruf läuft dann
immer über den OmniRoute-Self-Loop mit dem Header
`x-omniroute-self-loop-key-id`, sodass die empfangende Chat-Anfrage die
Verbindungs- und Modellrichtlinie dieses Schlüssels erneut durchsetzt.
`enforceApiKeyPolicy()` berücksichtigt diesen Header nur zusammen mit dem
Self-Loop-Bearer, sodass er den Zugriff nur einschränken kann; eine ID, die
nicht aufgelöst werden kann, wird abgelehnt.

Wenn für den Schlüssel kein Vision-Modell zulässig ist, lehnt ein
**bestätigtes reines Textziel** die Bildanfrage lokal mit einem klaren
HTTP 400 ab, statt Bildbytes an ein nicht dazu fähiges Upstream
weiterzuleiten (#17069). Für Ziele mit unbekannter oder nativer
Vision-Fähigkeit behält der Describe-Pfad sein bisheriges
Fail-open-Verhalten bei (Meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Anfragen ohne Schlüssel und Schlüssel ohne diese Einschränkungen verhalten
sich exakt wie zuvor.

#### Aufgabenbezogener Describe-Prompt (`modalityBridgeVisionTaskAware`)

Standard **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) hängt
den Text der **letzten Benutzernachricht** (auf 500 Zeichen gekürzt) an den
Basis-Describe-Prompt an, lenkt die Beschreibung auf das, was der Benutzer
tatsächlich gefragt hat (codex-vision-proxy-Muster), und bittet das
Vision-Modell, sichtbaren Text zu transkribieren. Bei deaktiviertem Flag —
oder ohne Benutzertext — wird der Basis-Prompt unverändert verwendet.

Die eigene OpenAI-kompatible Anfrage des Describe-Self-Loops
(`callVisionModelSingle()` in `visionBridgeHelpers.ts`) fordert immer
`image_url.detail: "high"` an — bedingungslos, für jeden Aufrufer/Provider,
nicht an ein Client-Signal gekoppelt. Low-Detail-Sampling verschlechtert die
OCR-Genauigkeit für genau die Text-Transkriptionsaufgabe, um die dieser
Prompt bittet. Daher fordert der Describe-Aufruf selbst immer eine hohe
Detailstufe an, unabhängig davon, welche Detailstufe die ursprüngliche
eingehende Anfrage verwendet hat. Dies betrifft nur den internen
Describe-Request-Body; es ändert nicht, wie OmniRoute das eigene
`image_url.detail` des Aufrufers bei der primären Anfrage weiterleitet —
dieser Standard wird separat angewendet, und nur für erkannte
OpenCode-Clients, in `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Der
Anthropic-Wire-Format-Zweig des Describe-Self-Loops hat kein `detail`-Feld
und ist von keinem der beiden Standards betroffen.

#### Describe-Ausgabelimit (`modalityBridgeVisionMaxChars`)

| Schlüssel                      | Standard | Bereich            |
| ------------------------------ | -------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`      | `0` oder 100–50000 |

`0` (Standard) bedeutet **kein Limit** — die von `callVisionModel()`
zurückgegebene Beschreibung wird unverändert durchgereicht, wodurch das
bestehende Verhalten erhalten bleibt. Jeder Wert im Bereich 100–50000 kürzt
die Beschreibung mit einem `…`-Suffix, bevor sie als
`[Image N]: <description>` wieder eingefügt wird
(`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`).
Erhöhen Sie diesen Wert für detailreiche OCR-Aufgaben, bei denen das
nachgelagerte Modell die vollständige Transkription benötigt; senken Sie ihn,
um die Token-Nutzung bei gesprächigen Vision-Modellen zu begrenzen. Das
Dashboard-Feld befindet sich im Advanced-Panel des Vision-Tabs
(`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) und begrenzt
jeden Wert zwischen 1 und 99 auf die Untergrenze von 100, während ein
explizites `0` unangetastet bleibt — `0` ist ein eigenständig gültiger
Zod-Wert (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`),
nicht nur der „nicht gesetzte" Standard.

#### Describe-Cache (`modalityBridge/bridgeCache.ts`)

In-Memory-LRU- + TTL-Cache für Describe-Ausgaben, prozessweit geteilt.
Schlüssel = `sha256(imageRef + composedPrompt + configuredBridgeModel)` mit
Length-Prefix-Framing (keine Feldgrenzen-Kollisionen). Die Modellkomponente
ist das **konfigurierte** Bridge-Modell, nicht das Modell, das tatsächlich
geantwortet hat — `callVisionModel` kann intern auf ein anderes Modell
zurückfallen, und eine Schlüsselung pro Versuch würde den Cache
fragmentieren. Fehlgeschlagene Describes werden niemals gecacht.
Einstellungen:

| Schlüssel                       | Standard | Bereich |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Normalisierung entfernter Bilder (Self-Loop-Describe/Base64-Abruf)

Wenn die Bridge selbst ein **entferntes** Bild abruft — der Anthropic-Describe-Self-Call und die Base64-Konvertierung im Claude-Wire-Format
(`ensureBase64ImagesForClaudeWire`), beide über
`fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — wird die resultierende Daten-URI durch `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) geleitet, bevor sie in die Vision-Modell-Anfrage eingebettet wird. Übergroße Bilder werden auf eine **lange Kante von 2048 px** verkleinert (entsprechend der Skalierungsobergrenze, die OpenAI/Anthropic bereits serverseitig anwenden), was Upload-Bytes/Latenz reduziert, ohne zu ändern, was das Vision-Modell sieht. Die Größenänderung verwendet `sharp`, geladen über dynamischen Import: Auf einer Plattform, auf der die native Binärdatei nicht geladen werden kann, **wirft** `normalizeDataUri()` **niemals einen Fehler** — es fällt auf ein Passthrough der Original-Bytes zurück, sodass der Describe-/Base64-Konvertierungspfad immer funktionsfähig bleibt. Nicht-Bild-Bytes (ein Abruf, der kein dekodierbares Bild zurückgegeben hat) werden ebenfalls unverändert durchgereicht. Diese Normalisierung ist auf Bilder beschränkt, die die Bridge für ihren eigenen Self-Call abruft — sie wird niemals auf die rohe Passthrough-Payload des Aufrufers angewendet, im Einklang mit dem Opt-in-only-Mutationsprinzip (Hard Rule #20).

#### Einstellungsschema + Migration

Die neuen `modalityBridge*`-Schlüssel werden in `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) per Zod validiert: `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, das `modalityBridgeCache*`-Trio und die
`modalityBridgeAudio*`-Gruppe, die von der Audio Bridge verwendet wird. Die Migration
`141_modality_bridge_settings.sql` kopiert vorhandene Legacy-`visionBridge*`-Werte in die passenden neuen Schlüssel (idempotent, überschreibt niemals einen vom Betreiber gesetzten `modalityBridge*`-Wert); die Legacy-Schlüssel bleiben für einen Release-Zyklus als Lese-Fallback akzeptiert.

#### Transparenz-Header + Statistiken

Describe-transformierte Antworten tragen
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(erstellt von `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`,
gesetzt von `withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`).
Umgeleitete Anfragen erhalten **keinen** Header — die Payload wurde unverändert gelassen und der Modellwechsel ist bereits im `model`-Feld des Antwortkörpers sichtbar.

`GET /api/modality-bridge/stats` (Management-Authentifizierung, gleiche Stufe wie
`GET /api/settings`) gibt die In-Memory-Zähler pro Modalität
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` für `vision`, `audio` und
`video` zurück. `averageLatencyMs` verwendet `latencySamples` als Nenner, nicht alle Versuche; eine Operation ohne Zeitmessung erzeugt kein künstliches Null-Millisekunden-Sample. `bridged` bleibt der abwärtskompatible Alias für erfolgreiche
Konvertierungen; fehlgeschlagene Versuche erhöhen ihn nicht.
Die Zähler werden bei Prozessneustart bewusst zurückgesetzt
(Telemetrie, keine Abrechnung).

#### Dashboard-Konfiguration

Die dedizierte Dashboard-Seite ist
`/dashboard/settings/modality-bridge`. Ihre URL-adressierbaren Tabs `Vision`, `Audio`
und `Video` behalten die Query-Parameter beim Wechsel des `tab`-Werts bei.
Der Vision-Tab bietet Aktivierung, Modus, Modellauswahl (einschließlich des automatischen
Standards), Task-Aware-Prompting, erweiterte Timeout-/Bild-/Beschreibungslängen-/Cache-
Limits, Laufzeitzähler und eine abgesicherte Beispielanfrage. Der Audio-Tab ist ebenfalls live: Er bietet
Aktivierung, eine Modellauswahl nur für STT mit Auto-Option, Timeout-/Max-Clip-Limits, Audio-
Zähler und einen `input_audio`-Beispieltest. Der Video-Tab ist funktionsfähig: Er meldet
den FFmpeg/ffprobe-Laufzeitzustand — einen von vier expliziten UI-Zuständen (`unknown`, während
die Prüfung läuft oder nicht abgeschlossen werden konnte, `restricted` auf einem Nicht-Loopback-
Dashboard-Host, auf dem die Prüfung clientseitig übersprungen wird, `unavailable`, sobald geprüft
und das Fehlen bestätigt wurde, oder `available` mit den FFmpeg/ffprobe-Versionen) — persistiert
Enable-/Modell-/Frame-/Video-/Timeout-Limits, filtert die Modellauswahl auf vision-fähige
Modelle und zeigt Video-Zähler.

Die frühere Vision-Bridge-Karte in den KI-Einstellungen ist ein Kompatibilitätslink zur
neuen Seite; sie besitzt keine zweite Kopie des Formulars mehr. Media Providers
verlinkt außerdem die Image-to-Text- und Speech-to-Text-Workflows mit den entsprechenden Modality-
Bridge-Tabs, ohne den vorhandenen Speech-to-Text-Playground zu entfernen.

**Self-Loop-Admission-Bypass:** Wenn der Describe-Call über OmniRoutes
eigenen `/v1`-Self-Loop (Non-Standard-Provider-Modell) geroutet wird, sendet
die Sub-Anfrage
`x-omniroute-admission-bypass: internal` und wird mit der aufgelösten
Self-Loop-Credential authentifiziert — dem lokalen `sk_omniroute`-Sentinel im lokalen Modus oder dem
vom Betreiber konfigurierten `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`-Env-Key (#1350), sodass
Deployments mit `REQUIRE_API_KEY=true` den Describe-Call weiterhin ausführen können. Der Bypass
wird nur für genau diese Credentials akzeptiert, sodass externe Clients den
Header nicht verwenden können, um die Admission zu umgehen.

Die Legacy-Defaults befinden sich in `src/shared/constants/visionBridgeDefaults.ts`; die
neuen Modus-/Task-Aware-/Cache-Defaults und der Settings-Resolver befinden sich in
`src/shared/constants/modalityBridgeDefaults.ts`. Die Guardrail stellt eine
`deps`-Konstruktoroption bereit, damit Tests Fake-Implementierungen von `getSettings` und
`callVisionModel` injizieren können.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Fängt Chat-Anfragen mit Audioinhalten ab, bevor sie ein Ziel erreichen, für das nicht
bekannt ist, dass es Audioeingaben akzeptiert. Sie leitet die Chat-Anfrage niemals um: Audio-Parts
werden über den vorhandenen OpenAI-kompatiblen Multipart-Endpunkt transkribiert, und
das gewählte Chat-Modell fährt mit den Texttranskripten fort.

Ablauf:

1. `supportsAudio` über `getResolvedModelCapabilities()` auflösen. Explizite
   Provider-Registry-Metadaten haben Vorrang, dann statische Modellmetadaten,
   dann synchronisiertes `modalities_input`. Eine deklarierte Eingabeliste ohne
   `audio` ergibt `false`; ohne Capability-Nachweis bleibt `null`. Sowohl
   `false` als auch `null` aktivieren die konservative Bridge, während `true`
   sie umgeht.
2. `modalityBridgeAudio*`-Einstellungen auflösen und über den gemeinsamen
   `detectMediaParts()`-Detektor splicefähige Top-Level-Audio-Parts aus jeder
   Nachricht extrahieren. Unterstützte Wire-Formate sind OpenAI `input_audio`,
   `audio_url` und `source.media_type: "audio/*"`. Verschachteltes Audio wird
   für das Routing erkannt, aber vom Splice-Pfad nicht entfernt. Die
   Verarbeitung wird durch `modalityBridgeAudioMaxClips` begrenzt; spätere
   Parts bleiben unberührt.
3. Ein konfiguriertes `provider/model` berücksichtigen oder
   `selectAudioBridgeModel()` `AUDIO_TRANSCRIPTION_PROVIDERS` in stabiler
   Katalogreihenfolge durchlaufen und das erste Modell mit einer nutzbaren
   aktiven Provider-Credential auswählen lassen.
4. `callAudioTranscription()` wandelt Base64-/Data-URI-Audio in eine
   Multipart-`file` um oder lädt eine entfernte `audio_url` über den
   Public-Only-Outbound-Guard mit DNS-Pinning und einer 25-MB-Grenze herunter.
   Anschließend POSTet es die Datei und das ausgewählte Modell an den lokalen
   `/v1/audio/transcriptions`-Self-Loop, authentifiziert mit
   `resolveSelfLoopBearer()`. Die bestehende Transkriptionsroute führt den
   normalen Credential-Lookup, die Cooldown-/Rate-Limit-Behandlung und den
   Provider-Dispatch durch.
5. Erfolgreiche Aufrufe ersetzen ihre Parts durch `[Audio N]: <transcript>`.
   Aufrufe laufen mit `Promise.allSettled`: Ein einzelner Fehlschlag erhält den
   ursprünglichen Audio-Part (#4012-Contract). Schlagen alle Aufrufe fehl und
   ist das Ziel nachweislich `supportsAudio === false`, werden die Parts zu
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-Contract).
   Bei einem unbekannten Ziel (`null`) bleibt ein reines Fehlschlag-Ergebnis
   unberührt. Ein nachweislich reines Textziel ohne nutzbare STT-Credential
   erhält denselben expliziten Stub, ohne einen Netzwerkaufruf auszulösen.

Erfolgreiche Transkripte nutzen den prozessweiten Modality-Bridge-LRU/TTL-Cache.
Der Schlüssel kombiniert die Audio-Referenz, das stabile
`audio-transcription`-Operationslabel und das ausgewählte STT-Modell;
Fehlschläge werden nie zwischengespeichert. Audio-Versuche aktualisieren die
gemeinsamen Zähler `bridged`, `cacheHits`, `failures` und `lastUsedAt`.
Transformierte Antworten tragen
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
unveränderte Anfragen erhalten kein Audio-Bridge-Segment.

Laufzeiteinstellungen sind datenbankgestützt und Zod-validiert:

| Schlüssel                     | Standardwert | Bereich          |
| ----------------------------- | ------------ | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`       | —                |
| `modalityBridgeAudioModel`    | `""`         | Auto oder STT-ID |
| `modalityBridgeAudioTimeout`  | `60000`      | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`          | 1–10             |

Der gemeinsame Cache bleibt durch `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` und `modalityBridgeCacheMaxEntries` gesteuert.

### Videobrücke (`videoBridge.ts`, `videoBridgePipeline.ts`)

Fängt Videoteile der obersten Ebene in Chat Completions `messages` und Responses API `input` ab, bevor ein Ziel ohne bekannte native Videounterstützung aufgerufen wird. Unterstützte Formen sind `input_video`, `video_url`, `video_source`, HTTPS URLs und `data:video/*;base64,...` data URIs. Einfache Dateinamen im Text werden nicht als Video behandelt.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ist für die Anforderungsdurchquerung, die capability/policy Prüfung, die Aggregation pro Anforderung und die Antwortnutzlast verantwortlich. — Erfassung pro Videoarbeit, der Gesamtergebnis-Cache, der eine Frame-Sequenz beschreibt (die alle vom Anrufer deklarierten Audiotranskripte zusammenführt) und pro Versuch metrics/abort/cleanup — ist hinter `processVideoPart` in `videoBridgePipeline.ts` verborgen und wird einmal pro Videoteil innerhalb `preCall`-Schleife aufgerufen. Dieses Modul definiert auch die expliziten Portgrenzen `VideoMediaBrokerPort` (Erfassen von Bytes und Extrahieren abgetasteter Frames), `VideoAudioTranscriptionPort` (Zusammenführen eines vom Anrufer deklarierten Audiotranskripts mit den abgetasteten Untertiteln) und `VideoDrilldownPort` (die alte Raw-Store-Form). Produktions- STT und Frame-Retention werden um den beschreibenden Port herum durch `createVideoSttAdapter` und `createVideoDrilldownAdapter` gebildet; Letzteres verwendet den gemeinsamen Lebenszyklus für undurchsichtige Handles.

Der öffentliche `/v1` Anforderungspfad importiert oder ruft niemals einen Unterprozess auf. Remote-Videos werden mit einer Grenze von 50 MiB heruntergeladen; Inline-Base64-Videos haben eine konservative Obergrenze von 36 MiB für die Decodierung pro Video, sodass der model/messages/framing Umschlag innerhalb der öffentlichen JSON Anforderungszulassungsgrenze von 50 MiB bleiben kann. Schätzungen der Inline-Länge und der dekodierten Größe werden vor der Zuweisung überprüft. HTTPS ist auf dem anfänglichen Remote- URL und jeder Weiterleitung erforderlich, wobei der vorhandene, nur für die Öffentlichkeit zugängliche Outbound-Guard mit DNS Pinning verwendet wird. Die Bytes überschreiten dann genau die interne Grenze `POST /api/modality-bridge/video/extract` Brokers. Diese Route ist sowohl `LOCAL_ONLY` als auch `SPAWN_CAPABLE`, akzeptiert nur eine pro Prozess authentifizierte, vertrauenswürdige Loopback-Anfrage und akzeptiert niemals einen URL, einen Dateisystempfad, eine ausführbare Datei oder eine Argumentliste. Die API Body-Size-Pipeline und der inkrementelle Body-Reader des Handlers erzwingen unabhängig voneinander eine 50- MiB -Broker-Eingabeobergrenze. Seine begrenzte Warteschlange führt jeweils eine Extraktion aus, lässt vier ausstehende Jobs zu und begrenzt ausstehende Eingaben auf 100 MiB.

Innerhalb des Brokers liest `ffprobe` eine private lokale Datei; Die Zulassungsliste für feste Formate schließt Wiedergabelisten- und Manifestformate aus. Für zulässige Container der MOV-Familie bleiben externe MOV -Datenverweise standardmäßig deaktiviert und der Befehl „fixed“ lässt sie nicht zu. Sowohl `ffprobe` als auch `ffmpeg` verwenden die `file` -only -Protokoll-Whitelist, einen Thread, feste Argumentarrays, keine Shell und ausführbare Dateien, die von `PATH` aufgelöst werden. Cover-Streams mit angehängten Bildern sind keine abspielbaren Kandidaten. Alle abspielbaren Streams müssen die Grenzwerte erfüllen, und ein expliziter Standardstream wird vor dem deterministischen Fallback mit dem niedrigsten Index bevorzugt. Videos sind auf 600 Sekunden, 8.192 Pixel pro Dimension und 33.554.432 Quellpixel begrenzt. FFmpeg tastet 1–16 Mittelpunkt JPEG Frames ab, skaliert die lange Kante auf höchstens 1.024 Pixel herunter, ohne kleinere Eingaben hochzuskalieren, und empfängt niemals ein URL. Die Stichprobe ist standardmäßig `uniform`. Die optionalen `scene_aware` und experimentellen `segment_aware` Richtlinien führen einen zusätzlichen festen FFmpeg Durchlauf über den bereits validierten lokalen Stream durch, wählen begrenzte `showinfo` Szenenzeitstempel aus und greifen deterministisch auf dieselben einheitlichen Mittelpunkte zurück, wenn ein Detektor ausfällt, eine Zeitüberschreitung auftritt, eine fehlerhafte Ausgabe vorliegt oder ein leerer Kandidatensatz vorhanden ist. Der segmentbewusste Modus weist Mittelpunktproben proportional zu den validierten Szenenintervallen zu; segmentbezogene Beweise und Fallback-Verhalten werden unten detailliert beschrieben. Die harte 16-Frame-Obergrenze wird nach der Auswahl in jeder Richtlinie angewendet. Wenn eine szenenbezogene Anfrage nur über ein Budget von einem Bild verfügt, verwendet sie den einheitlichen Mittelpunkt des aktiven Vollvideo- oder Fokusfensters und meldet `policyEffective: uniform`: Ein einzelnes ausgewähltes Szenenbild kann nicht beide zeitlichen Enden beibehalten. Ein Anrufer kann optional ein endliches Fokusfenster bereitstellen (`start`/`end` Sekunden); Grenzen werden auf die Mediendauer festgelegt, umgekehrte oder nicht endliche Fenster werden abgelehnt und alle Stichprobenrichtlinien werden nur innerhalb des normalisierten Intervalls durchgeführt. Das resultierende Fenster ist in den Sampling-Metadaten und im nicht vertrauenswürdigen Beschreibungspräfix enthalten, sodass nachgelagerte Modelle einen fokussierten Ausschnitt von der vollständigen Zeitleiste unterscheiden können.

Der semantische Beschriftungsfokus ist eine separate, explizite Einstellung. Der Standard- `full` -Analysemodus behält die vorhandene Frame-Eingabeaufforderung bei und leitet niemals Anforderungstext an das Beschriftungsmodell weiter. Im `focused` Modus liest die Bridge nur den neuesten, nicht leeren, vom Benutzer erstellten `text`/`input_text` aus demselben Chat- oder Antwortcontainer, normalisiert ihn auf NFC, reduziert Steuerzeichen und Leerzeichen und begrenzt ihn auf 500 Unicode-Codepunkte. Ein leeres Ergebnis greift auf die exakte `full` Eingabeaufforderung zurück. Ein verwendbarer Hinweis wird als JSON in einem dedizierten Block für den nicht vertrauenswürdigen Benutzerkontext serialisiert und priorisiert möglicherweise nur beobachtbare Details. Sie kann die gesonderte Warnung vor der Befolgung von Anweisungen, die in den Medien sichtbar oder hörbar sind, nicht außer Kraft setzen. Der Textfokus leitet niemals `start`/`end` ab oder ändert den zeitlichen Sampler.

#### Beweise FU-07 Struktursegmente

`segment_aware` verwendet einen begrenzten Voranalysedurchlauf über den bereits validierten lokalen Videostream. Die feste Filterkette skaliert zunächst auf eine Breite von höchstens 320 Pixeln, erkennt Szenenwechsel und eingefrorene Intervalle und tastet dann mit 1 Bild pro Sekunde Unschärfe, durchschnittliche Luma und spatial/temporal Informationen ab. Der Durchgang ist auf 600 Strukturbeispiele, einen FFmpeg/filter Thread, dasselbe `file` -only -Protokoll und dieselben Container-Zulassungslisten, eine 1- MiB -Prozessausgabegrenze und höchstens 30 Sekunden innerhalb der gemeinsamen abort/deadline. des Brokers beschränkt. Er akzeptiert niemals einen Befehl, Filter, Pfad oder URL von der Anfrage.

Bei den Strukturwerten handelt es sich um deterministische Sampling-Beweise, nicht um semantisches Videoverständnis. Sie lassen keine Rückschlüsse auf Themen, Aktionen, Bildunterschriften, Sprache oder Benutzerabsichten zu. Szenen- und Standbildgrenzen bilden Segmente; Standbildabdeckung, Unschärfe, Belichtung, räumliche Details und zeitliche Änderungen haben nur Einfluss darauf, wie das vorhandene Budget für 1–16 Bilder zugewiesen wird. Ein vollständig eingefrorenes Segment ist auf einen Frame begrenzt, während nicht eingefrorene Segmente um das verbleibende Budget konkurrieren. Wenn die Anzahl der Grenzen die Anzahl der Frames übersteigt, bleibt die einheitliche Timeline-Abdeckung erhalten, sodass schnelle frühe Schnitte ein langes nachlaufendes Segment nicht verdecken können. Szenengrenzen innerhalb der 1-Sekunden-Analyseauflösung einer Standbildgrenze werden zusammengeführt.

Fehlende Filter, malformed/empty -Beweise, ein Detektorfehler oder das begrenzte Zeitlimit vor der Analyse schlagen fehl, wenn die Richtlinie für den genauen einheitlichen Mittelpunkt gilt. Ein Aufrufer-Abbruch oder eine Broker-Frist schlägt nicht fehl: Es beendet den laufenden Unterprozess, verhindert eine spätere Frame-Extraktion und der private temporäre Baum wird in `finally` entfernt.

`scripts/perf/video-bridge-fu07-eval.ts` generiert deterministische echte FFmpeg Vorrichtungen für Einsparungen bei Untertitelaufrufen nach der Dedup-Operation, Budgetzuweisung bei dichter Bewegung, blur/exposure/SI-TI Beweis, schnelle Schnitte mit einem langen Schwanz und allmählich verblassende Fehlalarme. Es zeichnet die Wandzeit vor der Analyse und, sofern `/usr/bin/time` verfügbar ist, untergeordnete CPU und Spitzen- RSS auf. Seine Qualitätsprüfungen sind lediglich strukturelle Orakel. Die Qualität des echten Bildunterschriftenmodells bleibt `HOLD` da dieser Kabelbaum keinen autorisierten Endpunkt oder eingefrorenen Richter hat. Auch die monetären Einsparungen bleiben `HOLD` es sei denn, `--caption-cost-per-call-usd` liefert eine explizite positive Schätzung pro Anruf; Das Skript fabriziert niemals eines der beiden Ergebnisse.

Jeder Frame ist auf 4 MiB begrenzt, alle Rohframes zusammen auf 23 MiB und die serialisierte Broker-Antwort auf 32 MiB. Ein privates temporäres Verzeichnis wird in `finally` entfernt. OmniRoute bündelt FFmpeg nicht und akzeptiert keinen benutzerdefinierten ausführbaren Pfad. Vor der Untertitelung wendet die Bridge einen konservativen visuellen Deduplizierungsdurchlauf an: Jeder JPEG wird auf einen 16-×-16-Graustufenpuffer reduziert und nur mit dem letzten beibehaltenen Frame verglichen. Bei einem angeforderten Untertitelbudget von mehr als einem Frame liefert die Extraktion einen begrenzten Kandidatenpool von bis zum Doppelten dieses Budgets und nie mehr als 16 Frames. Die angeforderte Obergrenze wird erst nach der Deduplizierung angewendet, wobei die ersten und letzten ausgewählten Kandidaten bei der endgültigen Ausdünnung erhalten bleiben, wenn das Budget mindestens zwei beträgt. Die versionierte `grayscale-16x16-mean-cells-v2` Richtlinie verwendet den größeren Wert aus mittlerem Luma-Delta und dem Verhältnis von Miniaturzellen, deren normalisiertes Delta mindestens 0,05 beträgt. Der Duplikatschwellenwert ist die Konstante 0,04, die aus Gründen der Vorhersagbarkeit ausgewählt und nicht als Laufzeiteinstellung verfügbar gemacht wird. Dieses sekundäre Signal mit hohem Kontrast bewahrt kleine Bewegungs- und sichtbare Textänderungen, die ein reiner Mittelwertvergleich verbergen kann. Komparator- oder Decoderfehler schlagen fehl und behalten die Abdeckung bei. Ausgabemetadaten trennen extrahierte Kandidaten, erfolgreich verwendete Frames und gelöschte visuelle Duplikate.

Für einen explizit gekennzeichneten Videoteil kann ein Kontaktabzug mit Zeitstempel erforderlich sein. Die Brücke baut höchstens ein JPEG Gitter mit 4 Spalten und 16 Rahmen auf. Jede 512-Pixel-Zelle brennt ihren Quellzeitstempel in ein kontrastreiches unteres Band, während dieselben Zeitstempel in den Textmetadaten für nachgelagerte Zuordnung und Prüfung verbleiben. Der gesamte JPEG bleibt auf 32 MiB begrenzt. Wenn `sharp` das Raster nicht dekodieren oder zusammenstellen kann, greift die Brücke auf die einzelnen JPEG Frames zurück; Ein Client-Abbruch breitet sich weiterhin über den Blattvorgang aus.

Werbenachweise werden bewusst vom Mikrobenchmark der synthetischen Zusammensetzung getrennt. `scripts/perf/video-bridge-contact-sheet-eval.ts` definiert einen schemaversionierten A/B -Harness für echte OpenAI-kompatible Vision-Modelle. Es misst vom Anbieter gemeldete Token, die End-to-End-Wall-Latenz (einschließlich Blattzusammensetzung), die Anzahl der Modellaufrufe und die manifestdefinierte Faktenspeicherung. Rohe Modellantworten werden nicht in den Bericht geschrieben; Nur SHA-256 Digests und übereinstimmende Fakten IDs werden beibehalten. Der Kabelbaum führt keinen Netzwerk- oder kostenpflichtigen Modellanruf durch, es sei denn `--execute-real` wird übergeben und `--model`, `OMNIROUTE_BASE_URL` und `OMNIROUTE_API_KEY` sind konfiguriert. Ohne diesen expliziten realen Lauf bleibt sein maschinenlesbares Urteil `HOLD`; Synthetische payload/call-count Messungen allein sind kein Werbebeweis.

Anrufer können ein optionales `transcript.cues` Array an einen unterstützten Videoteil anhängen, wenn sie bereits über ausgerichteten Text verfügen. Jeder Cue muss `text`, ein endliches `start`/`end` Intervall innerhalb der untersuchten Dauer und ein auf der Whitelist aufgeführtes `source` (`client`, `embedded` oder `audio-bridge`) enthalten. `confidence` ist standardmäßig `1` und muss zwischen `0` und `1` bleiben. Genau doppelte Hinweise werden ausgeblendet. OmniRoute beginnt nie mit der Transkription dieser Metadaten: Validierte Hinweise werden mit Quelle, Konfidenz und Intervall in das beschriebene Ergebnis kopiert und als nicht vertrauenswürdige Beobachtungen neben den Bildunterschriften gerendert. Ungültiger, außerhalb des zulässigen Bereichs liegender oder herkunftsfreier Text wird zurückgewiesen und nicht in den Untertitel-Stream eingemischt. Beide Request-Body-Transkriptkanäle normalisieren die bereitgestellte Herkunft zu `client`, einschließlich selbstbehaupteter `embedded` oder `audio-bridge` Labels. Nur ein servereigener Adapter kann diese vertrauenswürdigen Labels über das Nur-Code-Argument `trustedSource` zuweisen; Ein Anforderungs- JSON Feld kann dieses Argument nicht erreichen. Der Transkripttext bleibt unabhängig von seiner Herkunft ein nicht vertrauenswürdiger Medieninhalt und darf niemals über die Autorisierung entscheiden.

Ein erfahrener Anrufer kann einen `audioTranscript` Track für dasselbe Video bereitstellen. Es wird als vom Client bereitgestellter Text behandelt, nicht als Beweis der Servertranskription. Die Fusionsnaht führt visuelle und akustische Beobachtungen unter einer Frist und einem Abbruchsignal durch, ordnet sie auf einer gemeinsamen Zeitachse an, kollabiert exakte Duplikate und meldet ein Teilergebnis, wenn nur eine Seite erfolgreich ist. Ein ungültiges `audioTranscript` degradiert zu diesem Teilergebnis — die visuelle Beschreibung bleibt erhalten und der Audiozweig zeichnet einen bereinigten Fehlercode — auf, anstatt das gesamte Video fehlschlagen zu lassen. Die Verfügbarkeit pro Zweig, das Teilflag und die bereinigten Fehlercodes bleiben im beschriebenen Ergebnis, in den Leitplanken-Metadaten (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), in den Ergebnis-Cache-Metadaten und in den Bridge-Fusion-Zählern erhalten. Der standardmäßige Video Bridge-Pfad ruft weder Sprache in Text auf noch lädt er eine zweite Medienkopie herunter. Ohne diesen expliziten Titel bleibt es nur ein Video.

**Transkriptaufbewahrung (#12150 P1).** Dies gilt automatisch, wenn die Video Bridge (selbst Opt-in) einen Transkript-Cue rendert, — gibt es kein separates Aufbewahrungsflag. Wenn eine Anfrage einen Transkript-Cue (ein vom Aufrufer deklariertes `transcript` oder ein verschmolzenes `audioTranscript`) rendert, markiert die Leitplanke ihn `videoBridgeObserved` und erzeugt einen geschwärzten Schatten der Videobeschreibung. — ist ein identisches Rendering, bei dem der Freitextkörper jedes Cues durch `[redacted-video-transcript]` ersetzt wird. Dies wird durch Ersetzen des strukturierten Cue-Felds vor dem Zusammensetzen der Zeichenfolge erstellt (niemals durch Parsen des abgeflachten Textes, also kein Cue-Inhalt — adversarial oder). gewöhnliche, einschließlich `]` enthaltende Körper wie `[inaudible]`/`[music]` — können überleben). Der persistente Anrufprotokoll-Anforderungstext tauscht jeden aus dem Video abgeleiteten Textteil gegen diesen geschwärzten Schatten aus, der durch Inhaltsgleichheit abgeglichen wird. Der `fullText` Anker wird aus der fertigen Leitplanken-Nutzlast vor dem Aufruf erneut gelesen, sodass die Übereinstimmung auch dann noch erfolgreich ist, wenn spätere Kettenleitplanken (die PII und Credential-Masker, Prioritäten 10/95) den Beschreibungstext an Ort und Stelle neu schreiben und nach system-prompt/handoff/memory Injektion das Nachrichtenarray umgestalten. Der vor dem Modell gesendete Körper bleibt unverändert. Eine beobachtete Anfrage füllt auch keinen dauerhaften Speicher (sowohl die von der Anfrage als auch der Antwort abgeleitete Extraktion wird übersprungen), sodass die eigene Antwort des Modells keinen Transkripttext in den Speicher zurückgeben kann.

**Rohvideofelder (#12430).** Wenn die Bridge aktiviert ist und die native Videounterstützung unbekannt ist oder nicht vorhanden ist, aktivieren definierte `transcript`/`audioTranscript` Felder auch `videoBridgeObserved`, selbst nach einem Beschreibungsfehler oder einem `maxVideos` Limit. `null` und leere Strings zählen; Fehlende Felder und Nicht-Video-Metadaten gelten nicht. Bei aufbewahrten Kopien werden diese Felder geschwärzt oder die Anforderung weggelassen, und caches/Memory werden umgangen.

Auf diesen Fallback-Pfaden werden gültige Anruferhinweise zu unterstützten `text`/`input_text` -Teilen und nicht zu nicht standardmäßigen Anbieterfeldern. Bei beiden auf Anfrage bereitgestellten Tracks handelt es sich weiterhin um nicht vertrauenswürdige `client` Beobachtungen, mit der ausdrücklichen Warnung, dass das Video nicht beschrieben wurde und die Zeitstempel nicht anhand der Medien überprüft wurden. Die bestehenden 256-cue/64-KiB Gesamt- und Pro-Cue-Budgets gelten für beide Tracks zusammen; Zeitstempel müssen zur 600-Sekunden-Obergrenze des Brokers und allen bereitgestellten Fokusfenstern passen. Ungültige Titel werden verworfen und nicht als beliebiger Text weitergeleitet. Ein gültiger Geschwisterteil kann weiterhin verwendet werden, es sei denn, sein Gesamtbudget wird überschritten. Null/empty Felder fügen keinen Text hinzu. Durch diesen Fallback wird kein Medienabruf oder keine Transkription hinzugefügt. Transkripterweiterungsfelder werden aus dem Fallback-Videoträger und seinen `video_url`/`source` -Objekten entfernt. Die OpenAI -Kabelzulassungsliste bleibt streng; Unbekannte native Videoträger bleiben verfügbar und bekannte Nur-Text-Ziele behalten sichere Markierungen. Strukturierte Schwärzungsschatten schützen den angehängten Transkripttext, während die ursprüngliche Anfrage des Anrufers unverändert bleibt. Native unterstützte Ziele und deaktivierte Bridges behalten ihr bestehendes Umgehungsverhalten bei.

Zusätzliche aufbewahrte Kopien verwenden dasselbe Observed-Request-Signal. Der rohe Pre-Guardrail-Client-Anfrage-Snapshot, die im Arbeitsspeicher ausstehende Anfrage und das Protokoll früher abgelehnter Anfragen ersetzen strukturell Transkriptfelder in Videoteilen; Durch Pipeline-Stufen und Kontextübergabe synthetisierte Zeichenfolgen-Eingabeaufforderungen werden an der Senke des persistenten Anforderungskörpers geschwärzt. Die persistente `video_content_removed` Markierung sorgt dafür, dass `previous_response_id` Fortsetzung nicht geschlossen werden kann, anstatt Text zu rekonstruieren, der absichtlich verworfen wurde. Wenn eine beobachtete Anfrage vor der Protokollierung ihren Redaktionsschatten pro Teil verliert oder sogar einer von mehreren Videoschatten nach späteren Anfragemutationen nicht übereinstimmt, wird der beibehaltene Anfragetext vollständig weggelassen, anstatt ein teilweise redigiertes Transkript beizubehalten.

Bei einer beobachteten Anfrage könnte eine Modellantwort einen beliebigen Teil des Transkripts ohne strukturierte Cue-Grenze zitieren. Sein persistentes Anrufprotokoll `responseBody` wird daher durch eine Auslassungsmarkierung ersetzt; Das detaillierte Pipeline-Artefakt (das upstream/client Körper und Stream-Chunks umfassen kann) wird nicht beibehalten. Semantik-, Idempotenz- und Reasoning-Replay-Caches umgehen Lese- und Schreibvorgänge für diese Anfrage. Die Anbieteranforderung und die für den Client sichtbare Antwort bleiben unverändert. Frühe Keepalive-Bytes werden aus dem temporären Puffer entfernt, wenn das detaillierte Artefakt weggelassen wird. Die fehlerhafte EventStream -Warnung von Kiro meldet nur die Anzahl der Nutzlastbytes, niemals deren Inhalte oder den Rohfehler des JSON Parsers. Dies bedeutet nicht, dass jede nicht verwandte provider/plugin Diagnose geprüft wurde; Der breitere Retained-Sink-Sweep wird in #11658 verfolgt.

Der interne `/api/modality-bridge/video/drilldown` Lebenszyklus ist ein separates loopback/token-authenticated Cache-Substrat. Jede Operation erfordert außerdem einen kanonischen undurchsichtigen Principal ID. Bevor ein Produktionsaufrufer aktiviert wird, muss er diesen ID vom authentifizierten Mandanten ableiten und darf niemals einen vom Client ausgewählten Wert weiterleiten. Cache-Schlüssel binden diesen Principal an die kanonische Sitzung und Videoreferenz IDs, speichern nur ihre SHA-256-derived Schlüssel und beschränken Lese- und Löschvorgänge auf denselben Principal. Der Cache speichert höchstens 16 abgeleitete JPEG Frames pro Eintrag, lässt sie nach zehn Minuten ablaufen und unterstützt begrenzte `start`/`end` -Lesevorgänge oder explizite Sitzungslöschung.

Jeder Prinzipal ist auf 16 Einträge und 64 MiB kanonischer JPEG Daten beschränkt. Diese Grenzwerte sind unabhängig von der globalen 64-entry/256 MiB Obergrenze: Durch den Prinzipalquotendruck werden nur die am wenigsten verwendeten Einträge dieses Prinzipals entfernt, bevor die globale LRU Räumung berücksichtigt wird. Abgelaufene Einträge werden aufgrund der Cache-Aktivität sowohl aus der Hauptbuchhaltung als auch aus der globalen Buchhaltung gelöscht, während Stornierungs- und Validierungsfehler nicht zu einer teilweisen Ersetzung führen.

Der Cache lehnt nicht-kanonisches Base64, überschüssiges Padding, Nicht-JPEG-Medien, fehlerhaftes oder abgeschnittenes JPEGs und JPEGs ab, die während einer begrenzten Vollbild `sharp` Dekodierung eine Warnung erzeugen. Es kodiert jedes akzeptierte Bild als kanonisches JPEG neu, leitet Breite und Höhe aus den dekodierten Bytes ab, anstatt den Aufruferfeldern zu vertrauen, und verwirft alle nachgestellten polyglotten Bytes, anstatt sie beizubehalten. Nur der begrenzte kanonische komprimierte Puffer wird auf beide Kontingente angerechnet. Das JSON -Drahtlimit beinhaltet den Base64-Overhead für die Obergrenze von 32 MiB für den dekodierten Eingang. Jede gespeicherte Ableitung zeichnet ihren validierten JPEG format/resolution, die Sampling-Richtlinie, die Ableitungsversion, die Erstellungszeit, den vom Server berechneten Inhalts-Hash und die gehashte übergeordnete Referenz sowie den übergeordneten Inhalts-Hash des vertrauenswürdigen Aufrufers auf. Der Abbruch wird zwischen asynchronen decode/hash Phasen vor dem Commit des atomaren Caches überprüft.

Der Produktionsproduzent verwendet bereits abgeleitete Broker-Frames erst nach erfolgreicher visueller Analyse wieder, ohne zweites Video download/extraction. Es sind der Operator `modalityBridgeVideoDrilldownEnabled=true`, ein strikter Teil- `drilldown: true` und ein authentifizierter API-Schlüsseldatensatz ID erforderlich. Vom Client deklarierte principal/session -Werte begründen niemals den Besitz. Ohne alle drei Bedingungen erfolgt kein Hashing, keine Größenänderung oder Beibehaltung zusätzlicher Frames. Bei einem Aufbewahrungsfehler bleibt die nutzbare visuelle Reaktion erhalten. Eingewilligte Anfragen umgehen den Ergebniscache für das gesamte Video, sodass zwischengespeicherte Ergebnisse niemals Handles wiedergeben.

Erfolgreiche JSON und SSE Antworten legen höchstens vier undurchsichtige Handles im begrenzten `x-omniroute-video-drilldown` Header offen. Autorisierte Browser-Ursprünge können diesen Header lesen, ohne die CORS Ursprungsrichtlinie zu erweitern. Neue Handles verwenden `v1.<32-byte random base64url token>` und die Registrierung behält nur ihre SHA-256 Hashes. Der reader/header Parser akzeptiert auch ältere 64-Hex-Token. Der authentifizierte öffentliche Verbraucher ist `GET /api/v1/video-bridge/drilldown?handle=...`, unabhängig gesteuert durch `modalityBridgeVideoDrilldownRemoteEnabled=true`. Explizites persistentes False widerruft den Zugriff, selbst wenn der Legacy- `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` Env-Fallback aktiviert ist. Bei der Produktionsaufbewahrung gibt es den analogen Legacy- `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` Fallback. Beide Fallbacks sind standardmäßig deaktiviert.

Der Verbraucher leitet den Besitz vom authentifizierten Schlüssel ab und wendet die Schlüsselrichtlinie an: Sowohl GET als auch DELETE gehören zur `video` Endpunktkategorie, einschließlich der Aliase `/v1` und `/api/v1`. Schlüssel mit einer nicht leeren Endpunkt-Zulassungsliste müssen `video` enthalten; Unbeschränkte Schlüssel bleiben kompatibel. Der Verbraucher gibt den gleichen 404-Fehler für unbekannte, abgelaufene und die Handles eines anderen Schlüssels zurück. Es akzeptiert `variant=preview|standard|detail` (maximale JPEG Dimension 320/640/1280, niemals hochskaliert), `limit=1..8` (oder den alten `frames` Alias, niemals beides), nullbasiertes `page` und optionale `start`/`end` Fokussekunden. Doppelte Abfrageschlüssel und umgekehrte Fokusfenster werden abgelehnt. Jede zurückgegebene Variante verfügt über einen Hash ihres tatsächlichen Inhalts und der tatsächlichen Auflösungsmetadaten, der mit der beibehaltenen Quelle verknüpft ist. Varianten werden beim Lesen abgeleitet und nicht als zusätzlich aufbewahrte Kopien gespeichert. Die JSON Antwort, einschließlich Base64/envelope, ist auf 32 MiB begrenzt; Eine übergroße Seite gibt 413 zurück und der Client muss weniger Frames anfordern. Liest den Abbruch bei jeder Größenänderung und überprüft die Handle-Gültigkeit erneut, bevor er zurückkehrt. `DELETE` nach Eigentümer ist idempotent; Beim Löschen oder TTL -Ablauf werden die beibehaltene Quelle und die Nutzungsabrechnung freigegeben.

Der gemeinsam genutzte Speicher ist prozesslokal: Handles verfallen beim Neustart und sind nicht zwischen unabhängigen OmniRoute Prozessen übertragbar. Verwaltungsstatistiken legen nur wirksame Aufbewahrungs-/Remote-Richtlinien und aggregierte zurückgehaltene entries/bytes offen, niemals Medien, Referenzen, Haupt- IDs oder Handles. Im Bereich „Videoeinstellungen“ werden diese Werte angezeigt und beide Zustimmungsschalter können beibehalten werden. Bei dieser Implementierungsdokumentation handelt es sich nicht um einen Live-Bereitstellungs- oder Promotion-Beweis; Die Akzeptanz des realen Modells wird separat erfasst.

Frames werden nacheinander mit dem konfigurierten Videomodell beschriftet. Eine leere Videoüberschreibung erbt die Vision-Einstellung; Wenn beide leer sind, wählt der Vision-Auto-Router das tatsächliche Vision-fähige Modell aus. Erfolgreiche Untertitel ersetzen den Originalteil durch ein stabiles `[Video description:` Präfix, das den Text auch als nicht vertrauenswürdige, von Medien abgeleitete Beobachtung markiert und nachgeschaltete Modelle anweist, den Anweisungen in den Medien nicht zu folgen. Zu den Cache-Schlüsseln für Bildunterschriften gehören die JPEG Bytes, die Eingabeaufforderung, der Zeitstempel und das effektive Modell. Nur erfolgreiche Untertitel werden zwischengespeichert. Cache-Einträge behalten das tatsächlich erfolgreiche Produzentenmodell bei, einschließlich eines Fallback-Modells; Die Brücke meldet `mixed` wenn unterschiedliche Rahmen von verschiedenen Modellen produziert wurden. Bei einem Cache-Treffer wird diese Herstelleridentität wiederverwendet, anstatt sie als angeforderten Routing-Plan umzukennen. Der Gesamtvideo-Ergebniscache wird bei jeder Eingabe verschlüsselt, die die Ausgabe — -Eingabeaufforderung, das effektive Modell, die Sampling-Richtlinie, die Frame-Anzahl, den semantischen Analysemodus, den SHA-256 Fingerabdruck des normalisierten Fokushinweises, das Fokusfenster, `transcript`, `audioTranscript` und das Kontaktblatt-Flag — ändert. Daher ist das Ändern einer dieser Dimensionen ein Cache-Fehler und niemals eine veraltete Wiederverwendung. Die Version der visuellen Deduplizierungsrichtlinie, der Schwellenwert und die Anzahl der begrenzten Kandidaten-Frames sind auch im Ergebnis-Cache-Schlüssel und in den Metadaten explizit angegeben. Eine Richtlinienänderung kann daher keine veraltete Beschreibung des gesamten Videos wiederverwenden. Die Metadaten des Result-Cache v4 behalten den Modus und den Fingerabdruck bei, niemals die reine Benutzeraufgabe. Guardrail-Metadaten melden sowohl den angeforderten als auch den effektiven Analysemodus; Ein angeforderter `focused` Modus ohne verwendbaren Benutzertext wird effektiv als `full` gemeldet.

Die Leitplanke extrahiert jeden unterstützten Videoteil, beschreibt jedoch nicht mehr als `modalityBridgeVideoMaxVideos`. Für ein Ziel, das nachweislich über `supportsVideo === false` verfügt, werden fehlgeschlagene und überbewertete Videos zu expliziten sicheren Textmarkierungen, sodass kein Rohvideo überlebt. Wenn die Leistungsfähigkeit unbekannt ist, behalten diese Teile ihren Videoträger; Jedes Fallback-Transkript folgt der oben beschriebenen begrenzten Textkonvertierung. Ziele mit `supportsVideo === true` umgehen die Brücke. Das Abbruchsignal der Clientanforderung breitet sich über Download, Broker-Warteschlange, Unterprozesse und Untertitelaufrufe aus; Abbrüche stoppen zwischen den Videos und versagen nie bei Rohmedien.

Laufzeiteinstellungen sind DB-gestützt und Zod-validiert:

| Schlüssel                           | Standard    | Reichweite / Verhalten                                                                                                                 |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Optionale Laufzeit, Opt-in                                                                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` behält generische Untertitel bei; `focused` verwendet einen begrenzten, nicht vertrauenswürdigen Kontext des neuesten Benutzers |
| `modalityBridgeVideoModel`          | `""`        | Erben Sie das Vision Bridge-Modell                                                                                                     |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` oder proportional `segment_aware`; Der Detektorausfall fällt auf `uniform` zurück                             |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                                         |

Legacy-dauerhafte Video-Timeout-Werte über 120 Sekunden werden auf die Broker-Frist beschränkt; Neue Einstellungen, die diesen Grenzwert überschreiten, werden abgelehnt. `GET /api/modality-bridge/video/runtime` erfordert vor der Authentifizierung oder Laufzeitprüfung eine vertrauenswürdige, gestempelte Loopback-Lokalität und anschließend eine Verwaltungsauthentifizierung. Es werden nur `available`, bereinigte FFmpeg/ffprobe Versionen und ein fester Grund zurückgegeben, wenn die Laufzeit nicht verfügbar ist. Der interne Extraktionsendpunkt ist kein öffentlicher Upload API: Die Warteschlangensättigung gibt `503` plus `Retry-After` zurück, eine Anrufertrennung gibt `499` zurück und die feste Broker-Deadline gibt `504` zurück. Konvertierte Antworten fügen `video->text;model=<visionModel>;parts=<videos>` zum zentralen `x-omniroute-modality-bridge` Header hinzu, ohne Vision- oder Audio-Segmente zu entfernen.

### PII Masker (`piiMasker.ts`)

Läuft weiter **beide** Stufen.

- **`preCall`** klont die Nutzlast, durchläuft `system`, `messages`, `input` und `prompt` (einschließlich einfacher Zeichenfolgenelemente) und wendet `processPII()` (von `@/shared/utils/inputSanitizer`) auf Zeichenfolgen `content`/`text` Felder an. Bei `PII_REDACTION_ENABLED=true` wird der erkannte PII in der ausgehenden Nutzlast geschwärzt. Dies ist unabhängig von `INPUT_SANITIZER_MODE` (das nur die Prompt-Injection-Richtlinie steuert). Wenn die Schwärzung deaktiviert ist, zeichnet der Anruf die Erkennungszahlen auf, ohne dass der Inhalt neu geschrieben wird.
- **`postCall`** Klont die Antwort tief, führt `sanitizePIIResponse()` und den Responses-API-Shape-Masker aus (`maskResponsesOutput` — deckt `output_text` und `output[].content[].text` ab). Bei einer Schwärzung ersetzt die geänderte Antwort das Original.

Die Leitplanke blockiert nie; es kommentiert nur (`meta.detections`, `meta.redacted`) oder schreibt neu.

#### Auswahl pro Typ, benutzerdefinierte Muster und Erkennungszähler

**Dashboard → -Einstellungen → Sicherheit → PII Maskierung** wählt aus, was maskiert wird. Die Maskierung wird nicht aktiviert: Das sind immer noch `PII_REDACTION_ENABLED` (Anfrage) und `PII_RESPONSE_SANITIZATION` (Antwort + SSE), beide standardmäßig deaktiviert.

- **Auswahl pro Typ** — Die integrierten IDs werden in `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) aufgeführt. Nicht gesetzt bedeutet jeden Typ (das Verhalten, bevor diese Einstellung existierte). Das `ssn_us` Muster der Anforderungs-Engine wird `ssn` zugeordnet. Vorlagen (Minimal, Standard, Finanziell, Brasilianisch, USA, GDPR, POPIA, Vollständig) füllen nur die Kontrollkästchen im UI aus.
- **GDPR und POPIA Kennungen** — zwölf integrierte IDs, die EU und südafrikanische persönliche Identifikatoren abdecken (Tabelle unten). Ihre regulären Ausdrücke, Validatoren und Jurisdiction-Tags befinden sich in einer Tabelle, `src/shared/utils/piiPatterns.ts`, die sowohl vom Response Sanitizer (`src/lib/piiSanitizer.ts`) als auch vom Request Masker (`src/shared/utils/inputSanitizer.ts`) genutzt wird. Eine Übereinstimmung wird nur dann geschwärzt, wenn ihr Validator sie akzeptiert; Eine bloße Ziffernfolge reicht nie aus. Ein Operator, der eine eingegrenzte Auswahl gespeichert hat, bevor diese IDs existierten, behält das Verhalten bei, bis die neuen IDs aktiviert werden.
- **Benutzerdefinierte Muster** — bis zu 20 Regex- oder Platzhaltermuster (`*` = bis zu 64 Nicht-Leerzeichen, `?` = eins). Übereinstimmungen werden zu `[CUSTOM_REDACTED]`. Jedes Muster durchläuft `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): höchstens 500 Zeichen, Flags auf `g i m s u` beschränkt, muss kompiliert werden, muss `safe-regex` bestehen (katastrophales Backtracking) und darf nicht mit einer leeren Zeichenfolge oder einem Schwärzungsplatzhalter übereinstimmen. Ein Muster, das fehlschlägt, wird beim Speichern und Testen abgelehnt, und eine gespeicherte Zeile, die fehlschlägt, wird zur Laufzeit übersprungen, anstatt kompiliert zu werden. Benutzerdefinierte Muster werden nur ausgeführt, wenn die Maskierung aktiviert ist.
- **Erkennungszähler** — Zählungen pro Typ (nie übereinstimmende Werte), werden im Speicher gehalten und beim Neustart zurückgesetzt (`src/lib/pii/piiDetectionStats.ts`). Sie nehmen nur zu, während die Maskierung aktiviert ist.

Die Einstellungen befinden sich in der `key_value` Tabelle (Namespace `pii_settings`, `src/lib/db/piiSettings.ts`) und werden über einen 1-s-Cache gelesen. API:

| Methode | Pfad                     | Zweck                                                                                       |
| ------- | ------------------------ | ------------------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/pii`      | Flag-Status, `enabledTypes`, `customPatterns`, Erkennungszähler                             |
| `PUT`   | `/api/settings/pii`      | Ersetzt `enabledTypes` (`null` = alle) und/oder `customPatterns`                            |
| `POST`  | `/api/settings/pii/test` | Testlauf eines Musters gegen eine Stichprobe von höchstens 8 KB; es wird nichts gespeichert |

Alle drei erfordern eine Managementauthentifizierung und validieren den Körper mit Zod (`src/shared/validation/schemas/piiSettings.ts`). Bei deaktivierter Anmeldung (`requireLogin=false`) sind `GET` und der Testendpunkt geöffnet, aber `PUT` benötigt weiterhin eine Dashboard-Sitzung, einen `manage` -scope API -Schlüssel, ein `oma_` Zugriffstoken mit Schreibbereich oder höher oder das vom Loopback gesendete CLI -Token oder interne Service-Token.

#### GDPR (EU) und POPIA (Südafrika) Kennungen

| ID                  | Kennung                         | Validierung                                                                                |
| ------------------- | ------------------------------- | ------------------------------------------------------------------------------------------ |
| `iban`              | IBAN                            | Bekanntes Land, exakte Länge für dieses Land, ISO 13616 MOD-97-10                          |
| `eu_vat`            | EU-Umsatzsteuer-ID              | Bekanntes Mitgliedstaatspräfix und Zahlenformat dieses Staats (keine VIES-Abfrage)         |
| `es_dni_nie`        | Spanische DNI / NIE             | Kontrollbuchstabe (Wert mod 23); NIE ist `X/Y/Z` + 7 Ziffern                               |
| `it_codice_fiscale` | Italienischer Codice Fiscale    | Kontrollbuchstabe aus Tabellen für ungerade/gerade Positionen                              |
| `pl_pesel`          | Polnische PESEL                 | Gewichtete Prüfsumme und plausible Bereiche für codierten Geburtsmonat/-tag                |
| `nl_bsn`            | Niederländische BSN             | 11-Probe (Gewichte 9..2, -1)                                                               |
| `de_steuer_id`      | Deutsche Steuer-ID              | ISO 7064 Mod 11,10 sowie Regeln zur Ziffernstruktur (keine führende 0)                     |
| `se_personnummer`   | Schwedische Personnummer        | Luhn über die letzten zehn Ziffern und plausibles Geburtsdatum (10 oder 12 Ziffern)        |
| `za_id`             | Südafrikanische ID-Nummer       | Luhn über alle 13 Ziffern, gültiger Geburtsmonat/-tag, Staatsangehörigkeitsziffer 0 oder 1 |
| `za_phone`          | Südafrikanische Telefonnummer   | Präfix `+27` / `27` oder nationale Form `0..` mit Leerzeichen oder Bindestrich             |
| `za_vat`            | Südafrikanische Umsatzsteuer-ID | 10 Ziffern beginnend mit `4` **und** „VAT“ / „BTW“ in den 48 Zeichen davor                 |
| `za_tax_ref`        | Südafrikanische Steuerreferenz  | 10 Ziffern beginnend mit `0`-`3`, Luhn **und** „tax“ / „SARS“ in den 48 Zeichen davor      |

Da die nur aus Ziffern bestehenden Formate mit Bestellnummern, Build-Nummern und Zeitstempeln kollidieren, benötigen die schwächsten Formate (`za_vat`, `za_tax_ref`) das Schlüsselwort cue, und eine bloße zehnstellige `0..` Nummer wird nicht als südafrikanische Telefonnummer behandelt. Abstands IBANs (`GB29 NWBK ...`) werden nicht abgeglichen. Auf dem Streaming-Pfad wird der Cue nur innerhalb des aktuellen Chunks nachgeschlagen. Die IDs stehen vor den generischen Telefonmustern, sodass ein validierter Bezeichner seinen eigenen Platzhalter behält (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Die `gdpr` und `popia` Vorlagen wählen die EU bzw. südafrikanischen IDs aus. Die Maskierung selbst bleibt Opt-in (harte Regel #20): Hier ändert sich nichts an einem Feature-Flag-Standard.

### Prompt-Injection (`promptInjection.ts`)

Erkennt adversariale Strukturen in von Benutzern bereitgestellten Inhalten und
setzt die konfigurierte Richtlinie durch. Das Verhalten wird über
Umgebungsvariablen und Konstruktoroptionen gesteuert:

| Einstellung      | Umgebungsvariable                                                                                     | Standard | Wirkung                                                                                                                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktiviert        | `INPUT_SANITIZER_ENABLED`                                                                             | `true`   | Bei `false` wird der Guardrail umgangen (Short-Circuit).                                                                                                                                                                                      |
| Modus            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`   | Injection-Richtlinie: `block`, `warn` oder `log`. (`redact` wird aus Gründen der Abwärtskompatibilität akzeptiert, entfernt aber **keinen** Injection-Text; das Umschreiben von PII in Anfragen wird über `PII_REDACTION_ENABLED` gesteuert.) |
| Blockierschwelle | Option `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (Alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Mindestschweregrad, der zum Blockieren erforderlich ist. Medium ist bei Standardeinstellung reine Beobachtung.                                                                                                                                |

**Modus-Priorität** (`getMode`): `options.mode` des Aufrufers →
`INJECTION_GUARD_MODE` **DB-Feature-Flag-Override** (Dashboard →
Einstellungen → Feature-Flags) → `INJECTION_GUARD_MODE` (Env) →
`INPUT_SANITIZER_MODE` (Env) → `warn`. Ein Dashboard-Override gewinnt daher
gegenüber den Umgebungsvariablen, sodass die Feature-Flags-UI den laufenden
Guard live steuert (kein Neustart). Der DB-Zugriff ist fail-safe: Tritt ein
Fehler auf, fällt der Guard auf das env-basierte Verhalten zurück, und ohne
gesetzten Override ist das Verhalten identisch zur reinen Env-Auflösung.

Erkennungsquellen:

1. `sanitizeRequest()` aus `@/shared/utils/inputSanitizer` (gemeinsamer
   Detektorsatz, der auch an anderer Stelle in der Pipeline verwendet wird).
2. Eingebaute `DEFAULT_GUARD_PATTERNS` (derzeit `system_override_inline` und
   `markdown_system_block`, beide mit Schweregrad `high`).
3. Optionale `customPatterns`, die über Konstruktoroptionen übergeben werden
   (Strings, Regex oder `{ name, pattern, severity }`-Einträge).

Wenn `mode === "block"` **und** mindestens eine Erkennung den Schweregrad-Schwellenwert erreicht, gibt `preCall` `{ block: true, message: "Request rejected: suspicious content detected" }` zurück. In den Modi `warn`/`log` protokolliert die Guardrail den Vorgang, lässt den Aufruf jedoch zu. Der gemeinsam genutzte Helfer `evaluatePromptInjection()` wird ebenfalls exportiert, für Aufrufer, die Prompts auswerten müssen, ohne über die Registry zu gehen.

**Scan-Grenze (v3.8.20):** Der Detektor prüft nur die **ersten 16 KB** des zusammengefügten Prompt-Textes — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 Bytes) in `src/shared/utils/inputSanitizer.ts`. Sowohl `detectInjection()` als auch `evaluatePromptInjection()` führen `slice(0, MAX_INJECTION_SCAN_BYTES)` aus, bevor die Musterschleife läuft. Injektionsanweisungen befinden sich nahe am Anfang einer Eingabe, sodass dies die Regex-CPU-/GC-Last bei Nutzlasten von mehreren hundert KB begrenzt, ohne die Erkennung zu schwächen (vgl. #3932, #4041).

### Credential-Masker (`credentialMasker.ts`)

Läuft in **beiden** Phasen, als Letztes in der Standardkette (Priorität `95`). Maskiert bekannte Muster von API-Schlüsseln / geheimen Tokens in der ausgehenden Nutzlast (Nachrichteninhalte, Tool-Aufrufargumente, Tool-Ergebnisse) **und** in der Provider-Antwort, sodass ein in einen Prompt eingefügtes Credential (oder eines, das von einem Tool-Ergebnis zurückgegeben wird) weder an den Upstream-Provider noch zurück an den Client gelangt.

- **Nur Opt-in**, dieselbe Konvention wie bei der PII-Redaktion (nahe an Hard Rule #20): deaktiviert, es sei denn, `settings.credentialRedactionEnabled === true` **oder** `CREDENTIAL_REDACTION_ENABLED=true`. Ist die Option ausgeschaltet, ist die Guardrail ein No-Op — sie blockiert nie und schreibt nie um.
- `redactCredentials()` durchläuft den gesamten Nutzlast-/Antwortbaum (`walkValue()`, sicher gegen Prototype Pollution, zyklensicher über `WeakSet`) und ersetzt Treffer durch einen `[REDACTED:<type>]`-Platzhalter, wobei nur die Zweige geklont werden, die tatsächlich geändert wurden.
- `CREDENTIAL_PATTERNS` deckt LLM-Provider-Schlüssel (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-Tokens (GitHub, Slack, Linear, Notion, npm, Postman, Discord), Zahlungsschlüssel (Stripe, Square), Cloud-Schlüssel (AWS Access Key, Twilio, SendGrid, Mailgun), private Schlüssel / JWTs, Verbindungszeichenfolgen mit Zugangsdaten (`mongodb://user:pass@...` usw.) sowie ein generisches Muster für `Authorization`-/`x-api-key`-/`api-key`-/`apikey`-Header-Werte ab. Header-förmige Schlüssel (`authorization`, `x-api-key`, `api-key`, `apikey`) werden strukturell maskiert (nur der Wert; das Schema-Präfix wie `Bearer `/`Basic ` bleibt erhalten) statt über die generische Text-Regex.
- Die Guardrail blockiert nie; sie schreibt nur um (`modifiedPayload` / `modifiedResponse`) und annotiert (`meta.credentialsRedacted`, `meta.count`).

Regressionsschutz: `tests/unit/credential-masker-guardrail.test.ts`.

## Basiskontrakt (`base.ts`)

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
  block?: boolean; // true schließt die Kette kurz
  message?: string; // wird beim Blockieren angezeigt
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // von preCall zurückgegeben, um die Anfrage umzuschreiben
  modifiedResponse?: TValue; // von postCall zurückgegeben, um die Antwort umzuschreiben
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

Ein Guardrail signalisiert „keine Änderung“, indem es entweder `void`, `{}` oder
`{ block: false }` zurückgibt. Die Rückgabe eines `modifiedPayload`/`modifiedResponse`
ersetzt den Wert, der für nachgelagerte Guardrails durch die Kette fließt.
`signal?: AbortSignal` überträgt den Lebenszyklus des Aufrufers in die Guardrails.
Ein Anfrageabbruch ist die bewusste Fail-Open-Ausnahme: Medienbrücken stoppen ihre
Arbeit und räumen auf, ohne Rohmedien in ein Ziel wiederherzustellen, von dem bekannt
ist, dass es diese nicht unterstützt.

## Registry (`registry.ts`)

Das Singleton `guardrailRegistry` stellt Folgendes bereit:

- `register(guardrail)` — fügt ein Guardrail hinzu (oder ersetzt es anhand des
  normalisierten Namens) und sortiert nach aufsteigender `priority` neu.
- `clear()` / `list()` — administrative Hilfsfunktionen.
- `runPreCallHooks(payload, context)` — iteriert über aktive Guardrails, führt die
  Payload durch `modifiedPayload` und stoppt beim ersten `block: true`.
- `runPostCallHooks(response, context)` — derselbe Ablauf auf der Antwortseite.
- `resetGuardrailsForTests({ registerDefaults })` — löscht den Zustand und
  registriert optional die Standardwerte neu, für eine saubere Testisolierung.

Beide Runner geben `{ blocked, payload|response, results, guardrail?, message? }`
zurück, wobei `results` ein Array von `GuardrailExecutionResult`-Einträgen ist, die
pro Guardrail die Felder `blocked`, `skipped`, `modified`, `error` und `meta`
enthalten – nützlich für das Tracing.

### Guardrails pro Anfrage deaktivieren

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` aggregiert eine
deduplizierte Liste von Guardrail-Namen, die für die aktuelle Anfrage übersprungen
werden sollen. Es gibt fünf Kanäle, die in dieser Reihenfolge gelesen und zu einer
Liste zusammengeführt werden (beim Deduplizieren gewinnt das erste Vorkommen):

1. `apiKeyInfo.disabledGuardrails`
2. Request-Body `disabledGuardrails` (oberste Ebene)
3. Request-Body `metadata.disabledGuardrails` (nur wenn `metadata` ein Objekt ist)
4. Header `x-omniroute-disabled-guardrails`
5. Legacy-Header `x-disabled-guardrails`

Alle fünf Kanäle werden zusammengeführt, einschließlich der beiden Header: Werden
sowohl `x-omniroute-disabled-guardrails` als auch `x-disabled-guardrails` gesendet,
wird die Vereinigungsmenge ihrer Listen übersprungen, und ein leerer moderner Header
verbirgt nicht mehr den Legacy-Header
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), behoben in
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Werte können Arrays von Strings oder ein kommagetrennter String sein; Namen werden
getrimmt und in Kleinbuchstaben-Kebab-Case normalisiert (`pii_masker` →
`pii-masker`), und leere Einträge werden verworfen. Das Ergebnis wird über
`context.disabledGuardrails` an die Registry übergeben, die übereinstimmende
Guardrails überspringt (`skipped: true` in `results`).

Die Deaktivierungsliste wirkt sich nur auf die **Registry** aus. Der
Prompt-Injection-Modus `block` ist eine verbindliche Grenze: Die Injection-Guard-Middleware
(`src/middleware/promptInjectionGuard.ts`) ruft `evaluatePromptInjection()`
ohne jegliche aufrufergesteuerte Deaktivierungsliste auf (der tote Aufruf
`resolveDisabledGuardrails({ body })`, den sie früher machte, wurde in
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934) entfernt), sodass
eine Anfrage, die `prompt-injection` deaktiviert, im Modus `block` weiterhin
abgelehnt wird. Das ist beabsichtigt. Die Deaktivierungskanäle werden vom Aufrufer
kontrolliert (Request-Body, Metadaten, Header), und ein Aufrufer darf nicht in der
Lage sein, eine Sicherheitskontrolle abzuschalten, die der Betreiber festgelegt hat
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Die
Header-Vereinigung aus [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
ändert nur, welche Registry-Guardrails übersprungen werden; sie ermöglicht es einem
Client nicht, die Middleware zu umgehen. Verbindliche Guardrail-Richtlinien pro
Schlüssel und pro Gruppe werden im v4-RFC
[#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417) verfolgt.
Siehe [Abdeckung und Grenzen](#coverage-and-limits).

## Ausführungsreihenfolge

Für jede Anfrage, die durch `src/sse/handlers/chat.ts` und
`open-sse/handlers/chatCore.ts` fließt (die Chat-Familien-Routen, die unter
[Abdeckung und Grenzen](#coverage-and-limits) aufgeführt sind):

1. `resolveDisabledGuardrails(...)` erstellt die Skip-Liste aus API-Schlüssel,
   Body und Headern.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` führt Guardrails in
   aufsteigender Prioritätsreihenfolge aus:
   - Deaktivierte Guardrails werden als `skipped` erfasst.
   - Das `preCall` jeder Guardrail kann die Payload über `modifiedPayload`
     umschreiben.
   - Das erste `block: true` unterbricht die Kette (Short-Circuit), und der
     Handler gibt eine Guardrail-Ablehnungsantwort zurück.
3. Die (möglicherweise umgeschriebene) Payload fließt in das Combo-Routing und
   den Upstream-Dispatch.
4. **Nur Non-Streaming:** Nachdem die Antwort zusammengesetzt wurde, führt
   `guardrailRegistry.runPostCallHooks(...)` dieselbe Kette auf der Antwort
   aus. `block: true` verwirft hier die Upstream-Antwort und gibt HTTP 400
   zurück. Gestreamte Antworten überspringen diesen Schritt vollständig.

Guardrails, die eine Ausnahme werfen, werden mit `error: <message>` erfasst und
über `logger.warn` protokolliert, aber die Kette läuft weiter — Fail-Open ist
hier bewusstes Design.

## Abdeckung und Grenzen

Die Guardrail-Registry ist ausschließlich in die Chat-Pipeline eingebunden.
Diese Grenzen sind durch
`tests/unit/guardrail-pipeline-wiring-characterization.test.ts` und
`tests/unit/guardrail-pipeline-characterization.test.ts` festgeschrieben;
aktualisieren Sie diese Tests bewusst, wenn sich das Verhalten ändert.

### Wo die Hooks laufen

| Hook / Steuerung                    | Läuft bei                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Anfragen, die von `handleChat` verarbeitet werden (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (und `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` sowie der Telegram-Chat-Proxy. Außerdem der Dashboard-Testendpunkt `/api/guardrails/test`. Ein Pre-Call-Block gibt HTTP 400 zurück. |
| `runPostCallHooks`                  | Nur **Non-Streaming**-Chat-Antworten (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Gestreamte Antworten erreichen ihn nie.                                                                                                                                                                                                                                                                                                                     |
| Streaming-PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), eingebunden in `streamingPipeline.ts`, wenn `PII_RESPONSE_SANITIZATION` aktiviert ist. Es ist keine Guardrail, daher wirken die Deaktivierungskanäle nicht darauf.                                                                                                                                                                                                                         |
| Injection-Guard-Middleware (Legacy) | Jede prompt-führende `/v1`-Route, einschließlich der Chat-Familie (siehe [Routen-Abdeckung](#injection-guard-route-coverage--red-team-phase-8--block-d)). Nur Prompt Injection.                                                                                                                                                                                                                                                                          |

### Was nicht abgedeckt ist

- **Medien-, Embeddings- und Datenrouten** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) erreichen die Registry nie.
  Dort laufen weder PII-Maskierung noch Credential-Maskierung noch eine
  Modalitätsbrücke. Ihre einzige Prüfung ist die
  Legacy-Injection-Guard-Middleware.
- **Gestreamte Antworten** erhalten keine Post-Call-Guardrails: kein
  `pii-masker`- oder `credential-masker`-Post-Call und kein Post-Call-Block.
  Nur die Streaming-PII-Transformation greift (wenn
  `PII_RESPONSE_SANITIZATION` aktiviert ist). Ein Credential, das in einer
  gestreamten Antwort zurückgegeben wird, wird nicht unkenntlich gemacht.
- **Deaktivierungskanäle vs. die Middleware (by Design):** Die Middleware
  wertet Prompt Injection mit ihrem eigenen Aufruf von
  `evaluatePromptInjection()` aus, ohne eine aufrufergesteuerte
  Deaktivierungsliste zu übergeben. Der `block`-Modus ist eine verbindliche
  Grenze, die aufrufergesteuerte Deaktivierungen nicht umgehen können, auch
  nicht auf Chat-Familien-Routen
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Das
  Deaktivieren von `prompt-injection` überspringt nur die Registry-Guardrail.

### Was eine Antwort vor dem Post-Call sieht

Auf dem Non-Streaming-Pfad lautet die Reihenfolge: Memory-Extraktion →
Ausführung eingebauter Tools → Post-Call-Guardrails → Post-Call-Block-Ausstieg
→ Semantic-Cache-Speicherung.

- **Speicherextraktion** und **Tool-Ausführung** sehen die Antwort, bevor
  Post-Call-Guardrails sie umschreiben oder blockieren können. Seit
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) leitet die
  Speicherextraktion den extrahierten Text durch `sanitizePII`, wenn
  `PII_RESPONSE_SANITIZATION` aktiviert ist (sowohl bei Streaming als auch bei
  Nicht-Streaming), aber eine Antwort, die der Post-Call später blockiert, wurde
  dennoch bereits dem Speicher und den Tools angeboten.
- **Der semantische Cache** speichert die Antwort nach dem Post-Call, sodass er
  die umgeschriebene Antwort speichert und eine blockierte Antwort niemals
  zwischengespeichert wird. Cache-Einträge werden pro API-Schlüssel abgelegt.

## Konfiguration

Umgebungsvariablen, die von den integrierten Guardrails gelesen werden:

| Variable                              | Verwendet von               | Wirkung                                                                                                      |
| ------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`          | Auf `false` setzen, um die Erkennung vollständig zu deaktivieren.                                            |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`          | Injection-Richtlinie: `warn`, `block` oder `log`. Der Legacy-Wert `redact` schreibt Injection-Text nicht um. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`          | Modus für den Injection-Guard; außerdem ein DB-Feature-Flag, das die Env-Vars **überschreibt** (DB > ENV).   |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`          | Mindestschweregrad, den `MODE=block` ablehnt: `high` (Standard), `medium` oder `low`.                        |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`          | Legacy-Alias für `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                          |
| `PII_REDACTION_ENABLED`               | `pii-masker`                | Wenn `true`, werden PII in Anfragen geschwärzt (unabhängig vom Injection-Modus).                             |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nachgelagert) | Steuert das Verhalten des Maskers auf der Antwortseite.                                                      |

Die Modality-Bridge-Guardrails lesen die Laufzeitkonfiguration aus dem
DB-gestützten Einstellungsspeicher (`getSettings()`), nicht aus Umgebungsvariablen.
Die primären Schlüssel von Vision sind
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` und
`modalityBridgeCacheMaxEntries`. Die Legacy-Schlüssel
`visionBridge*` werden nur als dokumentierter Lese-Fallback für einen Zyklus
akzeptiert; Dashboard-Schreibvorgänge verwenden die primären Schlüssel.
Standardwerte und der Fallback-Resolver befinden sich in
`src/shared/constants/modalityBridgeDefaults.ts`; Legacy-Konstanten bleiben
in `src/shared/constants/visionBridgeDefaults.ts` erhalten.

Audio verwendet `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` und `modalityBridgeAudioMaxClips` sowie die
gemeinsamen `modalityBridgeCache*`-Einstellungen. Audio hat keinen
Legacy-Schlüssel-Fallback, da diese Schlüssel mit dem Modality-Bridge-Schema
eingeführt wurden.

Video verwendet `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` und
`modalityBridgeVideoTimeout` sowie die gemeinsamen `modalityBridgeCache*`-Einstellungen.
Es ist standardmäßig deaktiviert, da FFmpeg/ffprobe optionale
Betriebsabhängigkeiten sind und das Captioning von Einzelbildern Latenz und
Modellkosten hinzufügt.

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

1. Erstellen Sie `src/lib/guardrails/myGuardrail.ts`, das `BaseGuardrail` erweitert.
2. Implementieren Sie `preCall` und/oder `postCall`.
3. Registrieren Sie entweder zur Importzeit (Push aus `registerDefaultGuardrails`) oder
   rufen Sie `guardrailRegistry.register(...)` zur Laufzeit auf — die Registry ersetzt
   jeden vorherigen Guardrail mit demselben normalisierten Namen.
4. Fügen Sie Tests unter `tests/unit/` hinzu (vorhandene Beispiele:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Tests

Verwenden Sie `resetGuardrailsForTests()` zwischen den Tests, um von einem bekannten
Zustand auszugehen. Übergeben Sie `{ registerDefaults: false }`, um mit einer leeren
Registry zu starten und nur die zu testenden Guardrails zu registrieren. Vision Bridge
akzeptiert Dependency Injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge
stellt die entsprechenden Nahtstellen für Einstellungen, Fähigkeiten, STT-Modellauswahl,
Zugangsdatenprüfungen und Transkription bereit. Tests können daher beide Abläufe ohne
DB- oder Netzwerkzugriff ausführen.

## Siehe auch

- `src/lib/guardrails/` — Implementierung
- `src/shared/utils/inputSanitizer.ts` — gemeinsamer Detektor, der Prompt-Injection-
  und PII-Maskierung ermöglicht
- `src/shared/constants/visionBridgeDefaults.ts` — Vision-Bridge-Standardeinstellungen
  und Liste der erzwungenen Bridge-Modelle
- `src/shared/constants/modalityBridgeDefaults.ts` — gemeinsame Vision-/Audio-Laufzeit-Standardeinstellungen
- `docs/architecture/RESILIENCE_GUIDE.md` — orthogonale Ebene (Circuit Breaker, Cooldowns)
- `docs/reference/ENVIRONMENT.md` — vollständige Referenz der Umgebungsvariablen

## Routenabdeckung des Injection-Guards & Red-Team (Phase 8 · Block D)

Der Injection-Guard (`createInjectionGuard` / `withInjectionGuard`) deckt alle Routen ab,
die Benutzer-Prompts akzeptieren. Er berücksichtigt `INJECTION_GUARD_MODE` (Standard `warn`
= nur protokollieren; `block` = gibt HTTP 400 `SECURITY_001` zurück).

| Typ              | Routen                                                                                                                                               | Standardmodus |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Text (vorhanden) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Generativ        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Daten            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Die Textextraktion (`extractMessageContents`) deckt `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ab.

**Red-Team (nächtlich, `nightly-llm-security.yml`):** promptfoo validiert, dass jede Route
das OWASP-LLM-Korpus bei `INJECTION_GUARD_MODE=block` blockiert; garak führt Probes aus
(wird ohne Secret übersprungen). `moderations` ist der Konsistenz halber enthalten. Der
Block-Modus ist eine verbindliche Grenze: `evaluatePromptInjection()` ignoriert die
anfragespezifische Deaktivierungsliste, die die Middleware übergibt, sodass
`disabledGuardrails` eine Route **nicht** davon ausnimmt
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Der Nightly-Workflow (`.github/workflows/nightly-llm-security.yml`, Cron + manueller
Dispatch) hat zwei Jobs:

- **`promptfoo-guard` (blockierend)** — führt `promptfoo eval -c promptfooconfig.yaml`
  mit `INJECTION_GUARD_MODE=block` aus. Jeder adversarische Testfall (z. B. "ignore all
  previous instructions…", DAN-ähnliche Jailbreaks) prüft, dass die Antwort
  `error.code === "SECURITY_001"` enthält, d. h. dass der Guard die Anfrage tatsächlich
  abgelehnt hat.
- **`garak` (nicht blockierend)** — führt garak `--probes promptinject,dan,leakreplay`
  gegen eine lokale OmniRoute-Instanz (`http://localhost:20128/v1`) aus. Abhängig von
  einem Provider-Secret (`PROMPTFOO_PROVIDER_KEY`); wird bei Fehlen sauber übersprungen
  und ist mit `|| true` versehen, sodass es Bericht erstattet, ohne die CI fehlschlagen
  zu lassen.

Die Abdeckung des Guard-Helfers (`createInjectionGuard` / `withInjectionGuard`) erstreckt
sich über jede prompt-führende `/v1`-Route; der Prompt-Text wird von
`extractMessageContents()` in `src/shared/utils/inputSanitizer.ts` aus
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` extrahiert.
