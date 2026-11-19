# Chaos Mode (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Chaos Mode** (Seitenleiste) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (Dashboard-Sitzung) · `POST /api/skills/collect/chaos` (API-Schlüssel)  
> **Quellcode:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode sendet **eine Aufgabe gleichzeitig an mehrere Anbieter** — jeder beteiligte Anbieter
steuert eine Modellinstanz bei, und Sie erhalten alle Antworten nebeneinander (oder verkettet). Es
handelt sich um eine Ausführungsoberfläche für mehrere Modelle, nicht um eine Routing-Strategie: Ihr normaler
`/v1/chat/completions`-Datenverkehr wird davon niemals beeinflusst.

**Begriffsklärung — drei verschiedene Dinge werden mit „chaos“ im Namen ausgeliefert:**

| Element                   | Beschreibung                                                                                                                                                                         | Dokumentation                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Chaos Mode**            | Die hier beschriebene Dashboard-Seite und API: Eine Aufgabe wird auf viele Anbieter verteilt (parallel oder kollaborativ).                                                           | Dieser Leitfaden                             |
| `auto/chaos`              | Auto-Combo-Modell-ID: parallele Verteilung, ein Modell pro Anbieter, jeweils ein Upstream-Aufruf. Keine Fehlerinjektion ([Details](#autochaos-parallel-fan-out)).                    | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos-Combo-Konfiguration | Eine persistierte Combo mit `config.chaos.enabled` verteilt Anfragen auf dieselbe Weise (nur per API); `judgeModel` wählt lediglich die endgültige Antwort aus, ohne Syntheseaufruf. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: parallele Verteilung

`auto/chaos` ist **kein** Mechanismus zur Fehlerinjektion oder zum Testen der Ausfallsicherheit. Eine Anfrage
mit `model: "auto/chaos"` an `/v1/chat/completions`:

1. Erstellt ein Panel aus **einem Modell pro Anbieter**: dem ersten Kandidaten jedes
   verbundenen Anbieters, in der Reihenfolge des Kandidatenpools, mit bis zu 5 Mitgliedern
   (`OMNIROUTE_CHAOS_MAX_PANEL`, begrenzt auf 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Das `chaos-mode`-Gewichtungspaket
   legt lediglich den `weight` jedes Mitglieds fest; die Verteilung wertet ihn nicht aus.
2. Sendet dieselbe Anfrage **parallel** an jedes Panelmitglied, sodass eine Anfrage
   einen Upstream-Aufruf pro Panelmitglied verursacht
   (`open-sse/services/autoCombo/chaosEngine.ts`, ausgelöst durch
   `open-sse/services/combo.ts`).
3. Streamt für jedes Panelmitglied bei dessen Eintreffen eine Statuszeile: standardmäßig
   einen SSE-Kommentar (`: chaos <index> ok|fail <model>`) sowie ein `omni-chaos-part`-Ereignis
   (`model`, `index`, `ok`, `error`), wenn die Anfrage
   `stream_options.include_chaos_parts: true` setzt. Diese enthalten keinen Antworttext.
4. Sendet **eine** Panelantwort als finalen Chunk im OpenAI-Stil: die Antwort des ersten
   Panelmitglieds (`auto/chaos` legt es als `judgeModel` fest), wenn dieses erfolgreich ist,
   andernfalls die des letzten erfolgreichen Mitglieds. Die anderen Panelantworten werden nicht
   zurückgegeben, sodass Sie für N Aufrufe bezahlen und eine Vervollständigung erhalten.

## Aufstellen

1. Offen** Dashboard → Chaos-Modus** (`/dashboard/chaos`).
2. Drehen Sie es** An** — Chaos Mode wird ausgeliefert** standardmäßig deaktiviert** (`enabled: false` in `src/lib/chaos/chaosConfig.ts`). Im deaktivierten Zustand antwortet `POST /api/chaos/run` `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Wählen Sie die Teilnehmer und Standardeinstellungen aus (die pro Instanz über den Einstellungsspeicher beibehalten werden):

   | Feld                | Bedeutung                                                            | Standard / Grenzen                          |
   | ------------------- | -------------------------------------------------------------------- | ------------------------------------------- |
   | `enabled`           | Hauptschalter                                                        | `false`                                     |
   | `defaultMode`       | `parallel` oder `collaborative` (siehe unten)                        | `parallel`                                  |
   | `providerOverrides` | Teilnahme pro Anbieter (`providerId`, optional `modelId`, `enabled`) | leer = bei jedem aktiven Anbieter, max. 200 |
   | `systemPrompt`      | Überschreiben Sie die integrierte Chaos-Systemeingabeaufforderung    | optional, max. 10.000 Zeichen               |
   | `timeoutMs`         | Maximale Zeit pro Modellaufruf                                       | `120000` (5 000–600 000)                    |
   | `maxTokens`         | `max_tokens` pro Modellaufruf                                        | `4096` (256–128 000)                        |

4. Geben Sie jedem teilnehmenden Anbieter eine** Modell** . Das Modell eines Anbieters ist die `modelId` seiner aktivierten Überschreibung auf der Chaos-Modus-Seite (es gewinnt), andernfalls die** Standardmodell** seiner Verbindung. Eine Anbieter-ID wird niemals als Modellname verwendet. Ein Anbieter, der weder das eine noch das andere hat** nicht angerufen** : Es wird in den Ergebnissen als `status: "error"` mit der Meldung _"Kein Modell für diesen Anbieter festgelegt. Legen Sie ein Modell dafür auf der Chaos-Modus-Seite oder ein Standardmodell für die Verbindung fest."_ und einem leeren `modelId` angezeigt, während die anderen Anbieter normal ausgeführt werden. Wenn kein ausgewählter Anbieter über ein Modell verfügt, schlägt die Ausführung vor jeder Upstream-Anfrage mit _"Kein Anbieter hat ein Modellsatz. …"_ (HTTP 500 auf beiden Endpunkten) fehl.
5. Führen Sie a aus** Testen Sie die Seite selbst** — Im Ergebnisbereich werden die Antwort, der Status und die Dauer jedes Anbieters angezeigt.

## Ausführungsmodi

- **`parallel`** — jedes Modell erhält gleichzeitig dieselbe Aufgabe; Sie erhalten alle Antworten
  unabhängig voneinander.
- **`collaborative`** — die Modelle werden **in einer Kette** ausgeführt: Jedes Modell sieht die Ausgabe des
  vorherigen Modells und wird gebeten, sie zu verfeinern, zu erweitern, zu kritisieren oder eine Alternative anzubieten. Das Feld `summary`
  der Antwort verkettet die erfolgreichen Ausgaben in der Reihenfolge der Kette (parallele Ausführungen haben kein `summary`).

## API

### `POST /api/chaos/run` — Dashboard-Sitzung

Cookie-authentifiziert (die Verwaltungssitzung — siehe [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); Wird von der Dashboard-Seite verwendet.

```jsonc
// body
{
  "task": "Compare approaches to X", // required
  "providers": ["glm", "kimi"], // optional filter
  "mode": "parallel", // optional — overrides defaultMode
  "systemPrompt": "…", // optional override
  "maxTokens": 4096, // optional override
}
```

### `POST /api/skills/collect/chaos` — API Taste

Bearer-Token-Variante für externe Anrufer. Der Schlüssel muss das tragen** Berechtigung für den Chaos-Modus** (`chaosModeEnabled`), das heißt** standardmäßig deaktiviert** — aktiviert es per Eingabe** Dashboard → API Manager → Schlüssel bearbeiten → Berechtigungen → Chaos-Modus** . Gleicher Körper wie oben.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Beide Endpunkte geben die gleiche Form zurück:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative mode only
}
```

## Fehlerbehebung

- **`400 Chaos Mode is not enabled`** — Schritt 2 oben: Der globale Schalter ist ausgeschaltet.
- **API -Schlüssel wird auf `/api/skills/collect/chaos` abgelehnt** — Dem Schlüssel fehlt die `chaosModeEnabled` -Berechtigung pro Schlüssel (standardmäßig deaktiviert; dies ist eine Einstellung, kein Fehler).
- **Ein Anbieter zeigt `No model set for this provider`** — hat sein Modell auf der Chaos-Modus-Seite oder ein Standardmodell für seine Verbindung festgelegt (siehe Setup, Schritt 4).
- **Ein von Ihnen erwarteter Anbieter fehlt in den Ergebnissen** — prüft `providerOverrides` auf der Chaos-Modus-Seite (eine deaktivierte Überschreibung schließt es aus) und ob die Provider-Verbindung aktiv ist.
