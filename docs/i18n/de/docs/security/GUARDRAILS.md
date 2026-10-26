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

### Video-Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Fängt Top-Level-Video-Parts in Chat-Completions-`messages` und
Responses-API-`input` ab, bevor ein Ziel ohne bekannte native
Videounterstützung aufgerufen wird. Unterstützte Formate sind `input_video`,
`video_url`, `video_source`, HTTPS-URLs und `data:video/*;base64,...`-Data-URIs.
Reine Dateinamen im Text werden nicht als Video behandelt.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) übernimmt das Durchlaufen der
Anfrage, die Capability-/Policy-Prüfung, die Aggregation pro Anfrage und die
Antwort-Payload. Die Arbeit pro Video – Beschaffung, der Gesamtergebnis-Cache,
das Beschreiben einer Frame-Sequenz (die ein ggf. vom Aufrufer deklariertes
Audio-Transkript einbezieht) sowie Metriken/Abbruch/Bereinigung pro Versuch –
ist hinter `processVideoPart` in `videoBridgePipeline.ts` verborgen, das einmal
pro Video-Part innerhalb der Schleife von `preCall` aufgerufen wird. Dieses
Modul definiert außerdem die expliziten Port-Grenzen `VideoMediaBrokerPort`
(Beschaffung von Bytes und Extraktion gesampelter Frames),
`VideoAudioTranscriptionPort` (Zusammenführen eines vom Aufrufer deklarierten
Audio-Transkripts mit den gesampelten Captions) und `VideoDrilldownPort` (die
Frame-Drill-Down-Persistenzgrenze; noch nicht in `processVideoPart`
eingebunden – heute schreibt nur die separate Route
`/api/modality-bridge/video/drilldown` Drill-Down-Einträge).

Der öffentliche `/v1`-Anfragepfad importiert oder startet niemals einen
Subprozess. Entfernte Videos werden mit einer Obergrenze von 50 MiB
heruntergeladen; Inline-Base64-Videos haben eine konservative Obergrenze von
36 MiB dekodiert pro Video, damit die Modell-/Nachrichten-/Framing-Hülle
innerhalb des öffentlichen JSON-Annahmelimits von 50 MiB für Anfragen bleiben
kann. Inline-Länge und geschätzte Dekodiergröße werden vor der Allokation
geprüft. HTTPS ist für die ursprüngliche Remote-URL und jede Weiterleitung
erforderlich; dabei kommt der bestehende Public-Only-Outbound-Guard mit
DNS-Pinning zum Einsatz. Die Bytes durchqueren anschließend die exakte interne
`POST /api/modality-bridge/video/extract`-Broker-Grenze. Diese Route ist sowohl
`LOCAL_ONLY` als auch `SPAWN_CAPABLE`, akzeptiert nur eine pro Prozess
authentifizierte Trusted-Loopback-Anfrage und akzeptiert niemals eine URL,
einen Dateisystempfad, eine ausführbare Datei oder eine Argumentliste. Die
API-Body-Size-Pipeline und der inkrementelle Body-Reader des Handlers erzwingen
unabhängig voneinander eine Broker-Eingabegrenze von 50 MiB. Ihre begrenzte
Warteschlange führt jeweils nur eine Extraktion aus, erlaubt vier ausstehende
Jobs und begrenzt die ausstehende Eingabe auf 100 MiB.

Innerhalb des Brokers liest `ffprobe` eine private lokale Datei; die feste
Format-Allowlist schließt Playlist- und Manifestformate aus. Bei zulässigen
Containern der MOV-Familie bleiben externe MOV-Datenreferenzen standardmäßig
deaktiviert, und der feste Befehl aktiviert sie nicht. Sowohl `ffprobe` als
auch `ffmpeg` verwenden die `file`-only-Protokoll-Whitelist, einen Thread,
feste Argument-Arrays, keine Shell und aus `PATH` aufgelöste ausführbare
Dateien. Streams mit Attached-Picture-Covern sind keine abspielbaren
Kandidaten. Alle abspielbaren Streams müssen die Grenzwerte erfüllen, und ein
expliziter Standard-Stream wird vor dem deterministischen Fallback auf den
niedrigsten Index bevorzugt. Videos sind auf 600 Sekunden, 8.192 Pixel pro
Dimension und 33.554.432 Quellpixel begrenzt. FFmpeg nimmt 1–16
Mittelpunkt-JPEG-Frames auf, skaliert die lange Kante auf höchstens 1.024
Pixel herunter, ohne kleinere Eingaben hochzuskalieren, und erhält niemals
eine URL. Das Sampling ist standardmäßig `uniform`. Die optionale Richtlinie
`scene_aware` und die experimentelle Richtlinie `segment_aware` führen einen
zusätzlichen festen FFmpeg-Durchlauf über den bereits validierten lokalen
Stream durch, wählen eine begrenzte Anzahl von `showinfo`-Szenenzeitstempeln
aus und fallen bei Detektorausfall, Timeout, fehlerhafter Ausgabe oder einer
leeren Kandidatenmenge deterministisch auf dieselben Uniform-Mittelpunkte
zurück. Der Segment-Aware-Modus verteilt Mittelpunkt-Samples proportional zu
den validierten Szenenintervallen; Segment-Aware-Evidenz und
Fallback-Verhalten werden unten detailliert beschrieben. Die harte Obergrenze
von 16 Frames wird in jeder Richtlinie nach der Auswahl angewendet. Wenn eine
Scene-Aware-Anfrage nur ein Budget von einem Frame hat, verwendet sie den
Uniform-Mittelpunkt des aktiven Gesamtvideo- oder Fokusfensters und meldet
`policyEffective: uniform`: Ein einzelner ausgewählter Szenen-Frame kann
nicht beide zeitlichen Enden abdecken. Ein Aufrufer kann optional ein
endliches Fokusfenster (`start`/`end`-Sekunden) angeben; die Grenzen werden
auf die Mediendauer begrenzt, umgekehrte oder nicht endliche Fenster werden
abgelehnt, und alle Sampling-Richtlinien werden nur innerhalb des
normalisierten Intervalls ausgeführt. Das resultierende Fenster wird in den
Sampling-Metadaten und im Präfix der nicht vertrauenswürdigen Beschreibung
aufgenommen, damit nachgelagerte Modelle einen fokussierten Ausschnitt von
der vollständigen Zeitleiste unterscheiden können.

Der semantische Caption-Fokus ist eine separate, explizite Einstellung. Der
standardmäßige Analysemodus `full` behält den vorhandenen Frame-Prompt bei
und leitet niemals Anfragetext an das Caption-Modell weiter. Im Modus
`focused` liest die Bridge nur den neuesten nicht leeren, vom Benutzer
verfassten `text`/`input_text` aus demselben Chat- oder Responses-Container,
normalisiert ihn auf NFC, fasst Steuerzeichen und Leerraum zusammen und
begrenzt ihn auf 500 Unicode-Codepunkte. Ein leeres Ergebnis fällt auf den
exakten `full`-Prompt zurück. Ein verwertbarer Hinweis wird als JSON in einem
dedizierten Block für nicht vertrauenswürdigen Benutzerkontext serialisiert
und darf nur beobachtbare Details priorisieren; er kann die separate Warnung
vor dem Befolgen von im Medium sichtbaren oder hörbaren Anweisungen nicht
außer Kraft setzen. Der textuelle Fokus leitet niemals `start`/`end` ab und
verändert nicht den zeitlichen Sampler.

#### FU-07 Strukturelle Segment-Evidenz

`segment_aware` verwendet einen begrenzten Voranalyse-Durchlauf über den
bereits validierten lokalen Videostream. Die feste Filterkette skaliert
zuerst auf höchstens 320 Pixel Breite, erkennt Szenenwechsel und
eingefrorene Intervalle und sampelt dann mit 1 Frame pro Sekunde auf
Unschärfe, durchschnittliche Luma sowie räumliche/zeitliche Informationen.
Der Durchlauf ist auf 600 strukturelle Samples, einen FFmpeg-/Filter-Thread,
dieselben `file`-only-Protokoll- und Container-Allowlists, eine
Prozessausgabe-Obergrenze von 1 MiB und höchstens 30 Sekunden innerhalb der
gemeinsamen Abort-/Deadline des Brokers begrenzt. Er akzeptiert niemals
einen Befehl, Filter, Pfad oder eine URL aus der Anfrage.

Die strukturellen Werte sind deterministische Sampling-Evidenz, kein
semantisches Videoverständnis. Sie erschließen keine Subjekte, Aktionen,
Bildunterschriften, Sprache oder Benutzerabsichten. Szenen- und
Freeze-Grenzen bilden Segmente; Freeze-Abdeckung, Unschärfe, Belichtung,
räumliche Detailfülle und zeitliche Veränderung beeinflussen lediglich, wie
das vorhandene Budget von 1–16 Frames zugeteilt wird. Ein vollständig
eingefrorenes Segment wird auf einen Frame begrenzt, während nicht
eingefrorene Segmente um das verbleibende Budget konkurrieren. Wenn es mehr
Grenzen als Frames gibt, wird die gleichmäßige Abdeckung der Zeitleiste
beibehalten, damit schnelle frühe Schnitte kein langes abschließendes
Segment verdecken können. Szenengrenzen, die innerhalb der
1-Sekunden-Analyseauflösung einer Freeze-Grenze liegen, werden
zusammengeführt.

Fehlende Filter, fehlerhafte/leere Evidenz, ein Detektorfehler oder das
begrenzte Voranalyse-Timeout führen zu einem Fail-open auf die exakte
Uniform-Mittelpunkt-Richtlinie. Ein Abbruch durch den Aufrufer oder eine
Broker-Deadline führt zu keinem Fail-open: Er beendet den laufenden
Subprozess, verhindert jede spätere Frame-Extraktion, und der private
temporäre Verzeichnisbaum wird in `finally` entfernt.

`scripts/perf/video-bridge-fu07-eval.ts` erzeugt deterministische reale
FFmpeg-Fixtures für Einsparungen bei Caption-Aufrufen nach der
Deduplizierung, für die Budgetzuteilung bei dichter Bewegung, für
Unschärfe-/Belichtungs-/SI-TI-Evidenz, für schnelle Schnitte mit einem
langen auslaufenden Segment sowie für falsch-positive Erkennungen bei
allmählichen Überblendungen. Es erfasst die Wall-Time der Voranalyse und,
sofern `/usr/bin/time` verfügbar ist, die CPU-Zeit des Kindprozesses sowie
den Peak-RSS. Seine Qualitätsprüfungen sind ausschließlich strukturelle
Orakel. Die tatsächliche Qualität des Caption-Modells bleibt `HOLD`, da
dieses Harness weder über einen autorisierten Endpunkt noch über einen
fixierten Judge verfügt. Monetäre Einsparungen bleiben ebenfalls `HOLD`,
sofern `--caption-cost-per-call-usd` keine explizite positive Schätzung pro
Aufruf liefert; das Skript erfindet niemals eines der beiden Ergebnisse.

Jeder Frame ist auf 4 MiB begrenzt, alle Roh-Frames zusammen auf 23 MiB und die
serialisierte Broker-Antwort auf 32 MiB. Ein privates temporäres Verzeichnis
wird in `finally` entfernt. OmniRoute bündelt FFmpeg nicht und akzeptiert
keinen benutzerdefinierten Pfad zu einer ausführbaren Datei. Vor der
Bildbeschriftung führt die Bridge einen konservativen visuellen
Deduplizierungsdurchlauf durch: Jedes JPEG wird auf einen
16×16-Graustufenpuffer reduziert und nur mit dem zuletzt beibehaltenen Frame
verglichen. Bei einem angeforderten Beschriftungsbudget von mehr als einem
Frame liefert die Extraktion einen begrenzten Kandidatenpool von bis zum
Doppelten dieses Budgets und niemals mehr als 16 Frames. Die angeforderte
Obergrenze wird erst nach der Deduplizierung angewendet, wobei der erste und
der letzte ausgewählte Kandidat bei der abschließenden Ausdünnung beibehalten
werden, sofern das Budget mindestens zwei beträgt. Die versionierte Richtlinie
`grayscale-16x16-mean-cells-v2` verwendet den größeren der beiden Werte aus
mittlerem Luma-Delta und dem Verhältnis der Thumbnail-Zellen, deren
normalisiertes Delta mindestens 0.05 beträgt. Der Duplikatschwellenwert ist
die Konstante 0.04 – aus Gründen der Vorhersehbarkeit gewählt und nicht als
Laufzeiteinstellung offengelegt. Dieses sekundäre Hochkontrastsignal bewahrt
kleine Bewegungen und Änderungen sichtbaren Texts, die ein rein
mittelwertbasierter Vergleich verbergen kann. Fehler des Vergleichers oder
Dekodierers führen zu einem Fail-open-Verhalten und bewahren die Abdeckung.
Die Ausgabemetadaten trennen extrahierte Kandidaten, erfolgreich verwendete
Frames und verworfene visuelle Duplikate voneinander.

Ein explizit markierter Video-Part kann einen mit Zeitstempeln versehenen
Kontaktbogen anfordern. Die Bridge erstellt höchstens ein 4-spaltiges
JPEG-Raster mit 16 Frames. Jede 512-Pixel-Zelle brennt ihren Quellzeitstempel
in einen kontrastreichen Streifen am unteren Rand ein, während dieselben
Zeitstempel zur nachgelagerten Zuordnung und Prüfung zusätzlich in den
Textmetadaten verbleiben. Das vollständige JPEG bleibt auf 32 MiB begrenzt.
Wenn `sharp` das Raster nicht dekodieren oder zusammensetzen kann, greift die
Bridge auf die einzelnen JPEG-Frames zurück; ein Client-Abbruch propagiert
dennoch durch den Sheet-Vorgang.

Die Promotion-Evidenz ist bewusst vom synthetischen Kompositions-
Mikrobenchmark getrennt. `scripts/perf/video-bridge-contact-sheet-eval.ts`
definiert ein schemaversioniertes A/B-Test-Harness für echte
OpenAI-kompatible Vision-Modelle. Es misst die vom Provider gemeldeten
Tokens, die End-to-End-Wandzeitlatenz (einschließlich Sheet-Komposition), die
Anzahl der Modellaufrufe und die im Manifest definierte Faktenbeibehaltung.
Rohe Modellantworten werden nicht in den Bericht geschrieben; nur
SHA-256-Digests und abgeglichene Fakten-IDs werden aufbewahrt. Das Harness
führt keine Netzwerk- oder kostenpflichtigen Modellaufrufe durch, es sei
denn, `--execute-real` wird übergeben und `--model`, `OMNIROUTE_BASE_URL`
sowie `OMNIROUTE_API_KEY` sind konfiguriert. Ohne diesen expliziten realen
Lauf bleibt sein maschinenlesbares Urteil `HOLD`; synthetische
Payload-/Aufrufzählungs-Messungen allein sind keine Promotion-Evidenz.

Aufrufer können einem unterstützten Video-Part ein optionales
`transcript.cues`-Array anhängen, wenn sie bereits über zeitlich
abgestimmten Text verfügen. Jede Cue muss `text`, ein endliches
`start`/`end`-Intervall innerhalb der beim Probing ermittelten Dauer und eine
per Whitelist zugelassene `source` (`client`, `embedded` oder `audio-bridge`)
enthalten; `confidence` hat den Standardwert `1` und muss zwischen `0` und
`1` bleiben. Exakte doppelte Cues werden zusammengeführt. OmniRoute startet
niemals eine Transkription aus diesen Metadaten: Validierte Cues werden mit
Quelle, Konfidenz und Intervall in das beschriebene Ergebnis kopiert und als
nicht vertrauenswürdige Beobachtungen neben den Frame-Beschriftungen
dargestellt. Ungültiger, außerhalb des gültigen Bereichs liegender oder
herkunftslose Text wird abgelehnt, statt in den Beschriftungsstrom gemischt
zu werden. Beide Transkriptkanäle im Anfrage-Body normalisieren die
angegebene Herkunft auf `client`, einschließlich selbst deklarierter
`embedded`- oder `audio-bridge`-Labels. Nur ein serverseitig kontrollierter
Adapter kann diese vertrauenswürdigen Labels über das nur im Code
zugängliche Argument `trustedSource` zuweisen; ein JSON-Feld der Anfrage kann
dieses Argument nicht erreichen. Transkripttext bleibt unabhängig von seiner
Herkunft nicht vertrauenswürdiger, aus Medien abgeleiteter Inhalt und darf
niemals über eine Autorisierung entscheiden.

Ein fortgeschrittener Aufrufer kann für dasselbe Video einen
`audioTranscript`-Track bereitstellen; dieser wird als vom Client
bereitgestellter Text behandelt, nicht als Nachweis einer serverseitigen
Transkription. Die Fusionsnahtstelle führt visuelle und Audio-Beobachtungen
unter einem gemeinsamen Zeitlimit und Abbruchsignal aus, ordnet sie auf einer
gemeinsamen Zeitleiste an, führt exakte Duplikate zusammen und meldet ein
Teilergebnis, wenn nur eine Seite erfolgreich ist. Ein ungültiges
`audioTranscript` degradiert zu diesem Teilergebnis – die visuelle
Beschreibung wird beibehalten und der Audio-Zweig verzeichnet einen
bereinigten Fehlercode –, statt das gesamte Video fehlschlagen zu lassen. Die
Verfügbarkeit pro Zweig, das Partial-Flag und die bereinigten Fehlercodes
werden im beschriebenen Ergebnis, in den Guardrail-Metadaten
(`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), in den
Ergebnis-Cache-Metadaten und in den Fusionszählern der Bridge aufbewahrt. Der
standardmäßige Video-Bridge-Pfad ruft kein Speech-to-Text auf und lädt keine
zweite Medienkopie herunter; ohne diesen expliziten Track bleibt er rein auf
Video beschränkt.

**Transkript-Aufbewahrung (#12150 P1).** Dies gilt automatisch, wann immer die Video Bridge (selbst opt-in) einen Transkript-Cue rendert — es gibt kein separates Aufbewahrungs-Flag. Wenn eine Anfrage irgendeinen Transkript-Cue rendert (ein vom Aufrufer deklariertes `transcript` oder ein fusioniertes `audioTranscript`), markiert die Guardrail sie als `videoBridgeObserved` und erzeugt einen redigierten Schatten der Videobeschreibung — ein identisches Rendering, in dem der Freitextkörper jedes Cues durch `[redacted-video-transcript]` ersetzt ist, erstellt durch Substituieren des strukturierten Cue-Felds, bevor der String zusammengesetzt wird (niemals durch Parsen des abgeflachten Textes, sodass kein Cue-Inhalt — weder adversarial noch gewöhnlich, einschließlich Körpern, die `]` enthalten, wie `[inaudible]`/`[music]` — überleben kann). Der persistierte Call-Log-Anfragekörper tauscht jeden aus dem Video abgeleiteten Textteil gegen diesen redigierten Schatten aus, abgeglichen per Inhaltsgleichheit; der `fullText`-Anker wird aus der finalisierten Pre-Call-Guardrail-Payload erneut gelesen, sodass der Abgleich auch dann noch gelingt, wenn spätere Guardrails in der Kette (die PII- und Credential-Maskierer, Prioritäten 10/95) den Beschreibungstext an Ort und Stelle umschreiben und nachdem System-Prompt-/Handoff-/Memory-Injektion das Nachrichten-Array umgeformt hat. Der upstream an das Modell gesendete Körper bleibt unverändert. Eine beobachtete Anfrage füllt außerdem kein dauerhaftes Memory (sowohl anfrage- als auch antwortabgeleitete Extraktion werden übersprungen), sodass die eigene Antwort des Modells keinen Transkripttext in Memory zurückspiegeln kann.

**Rohe Videofelder (#12430).** Wenn die Bridge aktiviert ist und native Videounterstützung unbekannt ist oder fehlt, aktivieren definierte `transcript`/`audioTranscript`-Felder ebenfalls `videoBridgeObserved`, selbst nach einem Beschreibungsfehler oder einem `maxVideos`-Limit. `null` und leere Strings zählen; fehlende Felder und Nicht-Video-Metadaten nicht. Aufbewahrte Kopien redigieren diese Felder oder lassen die Anfrage weg, und Caches/Memory werden umgangen.

Auf diesen Fallback-Pfaden werden gültige Aufrufer-Cues zu unterstützten `text`/`input_text`-Teilen statt zu nicht standardkonformen Provider-Feldern. Beide anfrageseitig gelieferten Tracks bleiben nicht vertrauenswürdige `client`-Beobachtungen, mit einer expliziten Warnung, dass das Video nicht beschrieben und Zeitstempel nicht anhand der Medien verifiziert wurden. Die bestehenden Budgets von 256 Cues/64 KiB insgesamt und pro Cue gelten gemeinsam über beide Tracks hinweg; Zeitstempel müssen die 600-Sekunden-Obergrenze des Brokers und jedes mitgelieferte Fokusfenster einhalten. Ungültige Tracks werden verworfen, nicht als beliebiger Text weitergeleitet; ein gültiger Geschwister-Track kann dennoch verwendet werden, sofern ihr kombiniertes Budget nicht überschritten wird. Null-/leere Felder fügen keinen Text hinzu. Dieser Fallback fügt weder einen Media-Fetch noch eine Transkription hinzu. Transkript-Erweiterungsfelder werden aus dem Fallback-Video-Carrier und seinen `video_url`/`source`-Objekten entfernt. Die OpenAI-Wire-Allowlist bleibt strikt; Carrier mit unbekannter nativer Videounterstützung bleiben verfügbar und bekannte Nur-Text-Ziele behalten sichere Marker. Strukturierte Redaktionsschatten schützen den angehängten Transkripttext, während die ursprüngliche, dem Aufrufer gehörende Anfrage unverändert bleibt. Ziele mit nativer Unterstützung und deaktivierte Bridges behalten ihr bestehendes Bypass-Verhalten.

Zusätzliche aufbewahrte Kopien verwenden dasselbe Observed-Request-Signal. Der rohe Pre-Guardrail-Snapshot der Client-Anfrage, die ausstehende In-Memory-Anfrage und das frühe Protokoll abgelehnter Anfragen ersetzen Transkriptfelder in Videoteilen strukturell; String-Prompts, die von Pipeline-Stufen und Kontext-Handoff synthetisiert wurden, werden an der Senke des persistierten Anfragekörpers redigiert. Der persistierte `video_content_removed`-Marker lässt die Fortsetzung per `previous_response_id` geschlossen fehlschlagen, statt Text zu rekonstruieren, der absichtlich verworfen wurde. Wenn eine beobachtete Anfrage ihren Per-Part-Redaktionsschatten vor dem Logging verliert oder auch nur einer von mehreren Videoschatten nach späteren Anfragemutationen nicht mehr übereinstimmt, wird der aufbewahrte Anfragekörper vollständig weggelassen, statt ein teilweise redigiertes Transkript aufzubewahren.

Bei einer beobachteten Anfrage könnte eine Modellantwort einen beliebigen Teil des Transkripts ohne strukturierte Cue-Grenze zitieren. Ihr persistierter Call-Log-`responseBody` wird daher durch einen Weglassungsmarker ersetzt; das detaillierte Pipeline-Artefakt (das Upstream-/Client-Körper und Stream-Chunks enthalten kann) wird nicht aufbewahrt. Semantische Caches, Idempotenz-Caches und Reasoning-Replay-Caches umgehen Lese- und Schreibzugriffe für diese Anfrage. Die Provider-Anfrage und die client-sichtbare Antwort bleiben unverändert. Frühe Keepalive-Bytes werden aus dem temporären Puffer entleert, wenn das detaillierte Artefakt weggelassen wird. Kiros Warnung zu fehlerhaften EventStreams meldet nur die Byte-Anzahl der Payload, niemals deren Inhalt oder den rohen Fehler des JSON-Parsers. Dies behauptet nicht, dass jede nicht verwandte Provider-/Plugin-Diagnose auditiert wurde; die breitere Durchforstung der Aufbewahrungssenken wird in #11658 verfolgt.

Der interne `/api/modality-bridge/video/drilldown`-Lebenszyklus ist ein separates, per Loopback/Token authentifiziertes Cache-Substrat. Jede Operation erfordert außerdem eine kanonische opake Principal-ID. Bevor ein Produktionsaufrufer aktiviert wird, muss er diese ID vom authentifizierten Mandanten ableiten und darf niemals einen clientseitig gewählten Wert weiterleiten. Cache-Schlüssel binden diesen Principal an kanonische Sitzungs- und Videoreferenz-IDs, speichern nur ihre SHA-256-abgeleiteten Schlüssel und beschränken sowohl Lese- als auch Löschvorgänge auf denselben Principal. Der Cache speichert höchstens 16 abgeleitete JPEG-Frames pro Eintrag, lässt sie nach zehn Minuten ablaufen und unterstützt begrenzte `start`/`end`-Lesevorgänge oder explizites Sitzungslöschen.

Jeder Principal ist auf 16 Einträge und 64 MiB kanonischer JPEG-Daten begrenzt. Diese Limits sind unabhängig von der globalen Obergrenze von 64 Einträgen/256 MiB: Kontingentdruck eines Principals verdrängt nur die am längsten nicht verwendeten Einträge dieses Principals, bevor eine globale LRU-Verdrängung überhaupt in Betracht gezogen wird. Abgelaufene Einträge werden bei Cache-Aktivität sowohl aus der Principal- als auch aus der globalen Abrechnung entfernt, während Abbruch und Validierungsfehler keinen teilweisen Ersatz festschreiben.

Der Cache lehnt nicht-kanonisches Base64, übermäßiges Padding, Nicht-JPEG-Medien, fehlerhafte oder abgeschnittene JPEGs sowie JPEGs ab, die bei einer begrenzten Vollbild-Dekodierung mit `sharp` eine Warnung erzeugen. Er kodiert jedes akzeptierte Bild erneut als kanonisches JPEG, leitet Breite und Höhe aus den dekodierten Bytes ab, statt den Aufrufer-Feldern zu vertrauen, und verwirft etwaige angehängte Polyglot-Bytes, statt sie zu behalten. Nur der begrenzte kanonische komprimierte Puffer wird auf beide Kontingente angerechnet. Das JSON-Übertragungslimit berücksichtigt den Base64-Overhead für die Obergrenze von 32 MiB dekodierter Eingabedaten. Jede gespeicherte Ableitung erfasst ihr validiertes JPEG-Format/ihre Auflösung, die Sampling-Richtlinie, die Ableitungsversion, den Erstellungszeitpunkt, den serverseitig berechneten Inhalts-Hash sowie die gehashte Elternreferenz plus den Eltern-Inhalts-Hash des vertrauenswürdigen Aufrufers. Abbrüche werden zwischen den asynchronen Dekodier-/Hash-Phasen vor dem atomaren Cache-Commit geprüft.

Diese Tranche bindet noch keinen Produktions-Producer an die Route an und bietet keine Auswahl von Varianten mit mehreren Auflösungen. Der transparente Video-Bridge-Anfragepfad verursacht daher keinen zusätzlichen Aufwand, während die mandantengebundene Principal-Ableitung und der vollständige FU-08-Multi-Resolution-Lebenszyklus explizite Nachfolgearbeiten bleiben, statt als abgeschlossenes Verhalten dokumentiert zu werden.

Frames werden sequenziell mit dem konfigurierten Video-Modell beschriftet. Ein leeres Video-Override erbt die Vision-Einstellung; wenn beide leer sind, wählt der Vision-Auto-Router das effektive vision-fähige Modell. Erfolgreiche Beschriftungen ersetzen den ursprünglichen Part durch ein stabiles Präfix `[Video description:`, das den Text außerdem als nicht vertrauenswürdige, aus Medien abgeleitete Beobachtung kennzeichnet und nachgelagerte Modelle anweist, in den Medien gefundene Anweisungen nicht zu befolgen. Die Cache-Schlüssel für Frame-Beschriftungen umfassen die JPEG-Bytes, den Prompt, den Zeitstempel und das effektive Modell; nur erfolgreiche Beschriftungen werden zwischengespeichert. Cache-Einträge behalten das tatsächlich erfolgreiche Producer-Modell, einschließlich eines Fallback-Modells; die Bridge meldet `mixed`, wenn unterschiedliche Frames von unterschiedlichen Modellen erzeugt wurden. Ein Cache-Treffer verwendet diese Producer-Identität wieder, statt sie als den angeforderten Routing-Plan umzuetikettieren. Der Ergebnis-Cache für ganze Videos verwendet als Schlüssel jede Eingabe, die die Ausgabe verändert — Prompt, effektives Modell, Sampling-Richtlinie, Frame-Anzahl, semantischer Analysemodus, der SHA-256-Fingerabdruck des normalisierten Fokus-Hinweises, Fokusfenster, `transcript`, `audioTranscript` und das Kontaktabzug-Flag — sodass das Ändern einer dieser Dimensionen ein Cache-Miss ist, niemals eine veraltete Wiederverwendung. Version, Schwellenwert und begrenzte Anzahl der Kandidaten-Frames der visuellen Deduplizierungsrichtlinie sind ebenfalls explizit im Ergebnis-Cache-Schlüssel und in den Metadaten enthalten; eine Richtlinienänderung kann daher keine veraltete Ganzvideo-Beschreibung wiederverwenden. Die v4-Metadaten des Ergebnis-Caches behalten den Modus und den Fingerabdruck, niemals die rohe Benutzeraufgabe. Die Guardrail-Metadaten melden sowohl den angeforderten als auch den effektiven Analysemodus; ein angeforderter `focused`-Modus ohne verwertbaren Benutzertext wird als effektiv `full` gemeldet.

Die Guardrail extrahiert jeden unterstützten Video-Part, beschreibt aber nicht mehr als `modalityBridgeVideoMaxVideos`. Für ein Ziel, bei dem nachweislich `supportsVideo === false` gilt, werden fehlgeschlagene und über dem Limit liegende Videos zu expliziten sicheren Textmarkierungen, sodass kein rohes Video erhalten bleibt. Ist die Fähigkeit unbekannt, behalten diese Parts ihren Video-Träger; jedes Fallback-Transkript folgt der oben beschriebenen begrenzten Textkonvertierung. Ziele mit `supportsVideo === true` umgehen die Bridge. Das Abbruchsignal der Client-Anfrage propagiert durch Download, Broker-Warteschlange, Subprozesse und Beschriftungsaufrufe; Abbrüche stoppen zwischen den Videos und schlagen niemals offen zu Rohmedien durch.

Laufzeiteinstellungen sind in der Datenbank hinterlegt und Zod-validiert:

| Schlüssel                           | Standardwert | Bereich / Verhalten                                                                                                                         |
| ----------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`      | Optionale Laufzeiteinstellung, Opt-in                                                                                                       |
| `modalityBridgeVideoAnalysisMode`   | `"full"`     | `full` behält generische Beschriftungen bei; `focused` verwendet begrenzten, nicht vertrauenswürdigen Kontext der letzten Benutzernachricht |
| `modalityBridgeVideoModel`          | `""`         | Übernimmt das Vision-Bridge-Modell                                                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`          | 1–16                                                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`  | `uniform`, `scene_aware` oder proportionales `segment_aware`; bei Detektorfehler Rückfall auf `uniform`                                     |
| `modalityBridgeVideoMaxVideos`      | `1`          | 1–4                                                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`     | 1000–120000 ms                                                                                                                              |

Ältere persistierte Video-Timeout-Werte über 120 Sekunden werden auf die Broker-Deadline begrenzt; neue Einstellungsschreibvorgänge oberhalb dieses Limits werden abgelehnt. `GET /api/modality-bridge/video/runtime` erfordert vor der Authentifizierung oder Laufzeitprüfung eine vertrauenswürdig gestempelte Loopback-Lokalität und anschließend eine Management-Authentifizierung. Es gibt nur `available`, bereinigte FFmpeg/ffprobe-Versionen und einen festen Grund zurück, wenn die Laufzeit nicht verfügbar ist. Der interne Extraktions-Endpunkt ist keine öffentliche Upload-API: Bei Warteschlangensättigung wird `503` plus `Retry-After` zurückgegeben, bei einem Verbindungsabbruch des Aufrufers `499` und bei Erreichen der festen Broker-Deadline `504`. Konvertierte Antworten fügen `video->text;model=<visionModel>;parts=<videos>` zum zentralen `x-omniroute-modality-bridge`-Header hinzu, ohne Vision- oder Audio-Segmente zu entfernen.

### PII-Maskierung (`piiMasker.ts`)

Läuft in **beiden** Stufen.

- **`preCall`** klont die Payload, durchläuft `system`, `messages`, `input` und
  `prompt` (einschließlich reiner String-Elemente) und wendet `processPII()`
  (aus `@/shared/utils/inputSanitizer`) auf String-Felder vom Typ
  `content`/`text` an. Wenn `PII_REDACTION_ENABLED=true`, werden erkannte PII
  in der ausgehenden Payload geschwärzt. Dies ist unabhängig von
  `INPUT_SANITIZER_MODE` (das nur die Prompt-Injection-Richtlinie steuert).
  Wenn die Schwärzung deaktiviert ist, zeichnet der Aufruf Erkennungszähler
  auf, ohne Inhalte umzuschreiben.
- **`postCall`** erstellt eine Tiefenkopie der Antwort, führt
  `sanitizePIIResponse()` sowie den Maskierer für die Responses-API-Form aus
  (`maskResponsesOutput` — deckt `output_text` und
  `output[].content[].text` ab). Wenn eine Schwärzung stattfindet, ersetzt die
  geänderte Antwort das Original.

Der Guardrail blockiert niemals; er annotiert nur (`meta.detections`,
`meta.redacted`) oder schreibt um.

#### Typspezifische Auswahl, benutzerdefinierte Muster und Erkennungszähler

**Dashboard → Einstellungen → Sicherheit → PII-Maskierung** legt fest, _was_
maskiert wird. Es schaltet die Maskierung nicht ein: Das bleibt weiterhin
`PII_REDACTION_ENABLED` (Anfrage) und `PII_RESPONSE_SANITIZATION` (Antwort +
SSE), beide standardmäßig deaktiviert.

- **Typspezifische Auswahl** — die eingebauten IDs sind in
  `src/shared/constants/piiTypes.ts` aufgeführt (`PII_BUILTIN_TYPES`). Nicht
  gesetzt bedeutet alle Typen (das Verhalten, bevor diese Einstellung
  existierte). Das Muster `ssn_us` der Anfrage-Engine wird auf `ssn`
  abgebildet. Vorlagen (Minimal, Standard, Financial, Brazilian, USA, Full)
  füllen lediglich die Kontrollkästchen in der Benutzeroberfläche.
- **Benutzerdefinierte Muster** — bis zu 20 Regex- oder Platzhaltermuster
  (`*` = bis zu 64 Nicht-Leerzeichen, `?` = eines). Treffer werden zu
  `[CUSTOM_REDACTED]`. Jedes Muster durchläuft `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): höchstens 500 Zeichen, Flags auf
  `g i m s u` beschränkt, muss kompilieren, muss `safe-regex` bestehen
  (katastrophales Backtracking) und darf weder einen leeren String noch einen
  Schwärzungs-Platzhalter matchen. Ein Muster, das fehlschlägt, wird beim
  Speichern und beim Testen abgelehnt, und eine gespeicherte Zeile, die
  fehlschlägt, wird zur Laufzeit übersprungen, statt kompiliert zu werden.
  Benutzerdefinierte Muster laufen nur, solange die Maskierung aktiviert ist.
- **Erkennungszähler** — Zählungen pro Typ (niemals die gematchten Werte), im
  Speicher gehalten und beim Neustart zurückgesetzt
  (`src/lib/pii/piiDetectionStats.ts`). Sie erhöhen sich nur, solange die
  Maskierung aktiviert ist.

Die Einstellungen liegen in der Tabelle `key_value` (Namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) und werden über einen 1-s-Cache gelesen. API:

| Methode | Pfad                     | Zweck                                                                                       |
| ------- | ------------------------ | ------------------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/pii`      | Flag-Status, `enabledTypes`, `customPatterns`, Erkennungszähler                             |
| `PUT`   | `/api/settings/pii`      | Ersetzt `enabledTypes` (`null` = alle) und/oder `customPatterns`                            |
| `POST`  | `/api/settings/pii/test` | Testlauf eines Musters gegen eine Stichprobe von höchstens 8 KB; es wird nichts gespeichert |

Alle drei erfordern eine Management-Authentifizierung und validieren den Body
mit Zod (`src/shared/validation/schemas/piiSettings.ts`).

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
