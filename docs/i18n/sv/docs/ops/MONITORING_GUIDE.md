# Monitoring & Observability Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Kort sagt**: OmniRoute levereras med inbyggd hälsoövervakning, autopilot för leverantörer, kvotspårning och observerbarhetshookar. Den här guiden beskriver instrumentpanelen, aviseringar och felsökning.

**Källor:**

- `src/lib/monitoring/observability.ts` — ögonblicksbild av observerbarhet
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot för kombinationshälsa
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot för leverantörer
- `src/lib/monitoring/providerHealthMatrix.ts` — matris för leverantörshälsa
- `src/lib/localHealthCheck.ts` — lokal hälsokontroll
- `src/lib/tokenHealthCheck.ts` — hälsa för tokenförnyelse
- `src/lib/proxyHealth.ts` — cache för proxyhälsa (beskrivs i PROXY_GUIDE.md)

---

## Översikt

OmniRoute har **3 övervakningslager**:

```
┌──────────────────────────────────────────────────────────────┐
│  Lager 1: Systemhälsa (servernivå)                            │
│  ├─ localHealthCheck.ts — databas, portar, inbyggda beroenden │
│  ├─ db/healthCheck.ts — integritet, FK, övergivna artefakter  │
│  └─ Instrumentpanel: /dashboard/health                        │
├──────────────────────────────────────────────────────────────┤
│  Lager 2: Leverantörshälsa (motståndskraft per leverantör)    │
│  ├─ providerHealthAutopilot.ts — brytare, vänteperioder       │
│  ├─ providerHealthMatrix.ts — hälsopoäng per leverantör/modell│
│  └─ Instrumentpanel: /dashboard/providers                     │
├──────────────────────────────────────────────────────────────┤
│  Lager 3: Observerbarhet i realtid (ögonblicksbilder)         │
│  ├─ observability.ts — brytare, sessioner, kvot               │
│  ├─ tokenHealthCheck.ts — hälsa för OAuth-tokenförnyelse      │
│  └─ MCP-verktyg: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Sidor på instrumentpanelen

### `/dashboard/health` (Systemhälsa)

Den övergripande instrumentpanelen för hälsa visar:

| Avsnitt                 | Vad det visar                                            |
| ----------------------- | -------------------------------------------------------- |
| **Serverstatus**        | Drifttid, version, port, aktiva anslutningar             |
| **Databas**             | Anslutning, integritet, WAL-storlek, senaste migreringar |
| **Leverantörsöversikt** | Antal aktiva, antal felfria, antal öppna brytare         |
| **Kvotövervakare**      | Aktiva sessioner, aviseringar, förbrukade kvoter         |
| **Senaste fel**         | De 10 senaste felen med stackspårningar                  |
| **Resursanvändning**    | Minne, CPU, indikator för heap-belastning                |

### `/dashboard/providers` (Leverantörshälsa)

Instrumentpanel per leverantör:

| Kolumn       | Beskrivning                                           |
| ------------ | ----------------------------------------------------- |
| Leverantör   | Leverantörs-ID + visningsnamn                         |
| Hälsa        | Grön/gul/röd status                                   |
| Brytare      | Öppet/stängt/halvöppet tillstånd                      |
| Anslutningar | Antal anslutningar, senaste uppdatering               |
| Modeller     | Tillgängliga modeller, hälsa per modell               |
| Kostnad      | Dagens kostnad, 7-dagarstrend                         |
| Fel          | Antal fel de senaste 24 timmarna, vanligaste felklass |

Klicka på en leverantör för att se:

- Senaste förfrågningar med uppdelning av latens
- Hälsopoäng per anslutning
- Spärrar per modell
- Rekommendationer från autopiloten

### `/dashboard/quota` (Kvotspårning)

För varje API-nyckel:

- Aktuell användning jämfört med gränsen (förloppsindikator)
- Kvottrend (30-dagarsdiagram)
- Tidpunkt för nästa återställning
- Aviseringshistorik

### `/dashboard/combos` (Kombinationshälsa)

Per kombination:

- Strategi + mål
- Hälsa per mål
- Senaste reservväxlingshändelser
- Lyckandefrekvens (24 h, 7 d, 30 d)

---

## Hälsokontroll API

OmniRoute avslöjar** två** HTTP hälsoytor. De är inte utbytbara för orkestratorer.

| Väg                          | Ändamål                                                              | Vikt                                | Använda                                                                |
| ---------------------------- | -------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------- |
| `GET /healthz`               | Livscykel liveness/readiness (`ok` / `starting` / `stopping`)        | Trivial (endast fasflagga)          | Kubernetes** beredskap** ; mjuk** livlighet** om du måste använda HTTP |
| `GET /api/monitoring/health` | Djup system + -leverantörssammanfattning (DB, heap, katalogantal, …) | Tung (sync DB / övervakningsarbete) | Dashboards, blackbox djupa kontroller, Docker inbyggda hälsokontroll   |

> **Notera:** Leverantörshälsomatriser, autopilotproblem, kvotövervakare, tokens hälsa och latensdetaljer utöver `/api/monitoring/health` är tillgängliga via**MCP verktyg** `observability_snapshot` eller** instrumentpanelen** sidor — det finns inga dedikerade REST -rutter för dessa.

Båda sträckorna går på** samma Node event loop** som förfrågningshantering. En CPU-bunden sökväg (stort `GET /v1/models` -katalogarbete, långkontextkomprimering / tokenräkning) kan fördröja** alla** HTTP hanterare, inklusive `/healthz`. Event-loop upptagen ≠ process död. Föredrar att fixa svinet; sondjustering minskar bara falska dödar.

### Lättvikts orkestratorprob

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` när serverns livscykelfas är klar
- **503** + `starting` / `stopping` under uppstart eller avstängning
- Implementering: `src/app/healthz/route.ts` (ingen DB -ping)

### Systemhälsa (djup)

```bash
GET /api/monitoring/health
```

Svar:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: probe-cache vs SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` är den** in-memory probe-cache-mätare** , inte en livedump av `provider_connections.test_status`. Efter #12532 läser sökvägen för begäran endast `getCachedCredentialHealthSummary()` ; bakgrundssonder uppdaterar cachen från händelseslingan.

| Lager                        | Där                                                                   | Vad det betyder                                                                                                                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Probe-cache-mätare           | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Resultaten från den senaste referens-hälsoproben finns fortfarande kvar i processminnet. `source` är alltid `probe-cache`.                                                                                        |
| Misslyckad anslutningsdetalj | `credentialHealth.failedConnections`                                  | Presentera** bara när `failed > 0`** . Avgränsad lista över cache-rader med `status=error` (`connectionId`, `status`, sanerad `lastError` / `lastErrorType`). `failedOmitted` ställs in när listan var begränsad. |
| SQLite klibbig status        | `credentialHealth.staleDbNonOkCount`                                  | Räkna av** aktiv** (`is_active=1`) anslutningsrader vars kvarstående `test_status` är en känd icke-ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                          |

De två lagren kan vara oense med avsikt:

- Mät `failed=0` medan `staleDbNonOkCount>0` — SQLite fortfarande har en klibbig `test_status` (till exempel `expired` eller `credits_exhausted`) att den senaste probe-cache-ögonblicksbilden inte räknas som `status=error`.
- Mät `failed>0` medan SQLite ser frisk ut — en ny sond misslyckades och cachelagras; DB raden har inte uppdaterats eller raderades senare.

Varna inte enbart på `provider_connections.test_status` när du skrapar denna slutpunkt. Använd `failed` + `failedConnections` för levande sondfel, och `staleDbNonOkCount` när du behöver den ihållande sticky-status-räkningen.

### Kubernetes undersöker rekommendationer

OmniRoute är en** enda nodprocess** (en händelseslinga). Aktie Docker `HEALTHCHECK` riktar sig mot lättvikts `/healthz`. `/api/monitoring/health` är** för tung** för kubelets livlighetsintervall.

| Sond           | Rekommenderat mål                                                                | Anteckningar                                                                                                                                                                                                                                                                                                                                        |
| -------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Uppstart**   | HTTP `GET /healthz` med en lång `failureThreshold` (eller stor `startPeriod`)    | Kallstart + SQLite migrering kan överstiga några sekunder                                                                                                                                                                                                                                                                                           |
| **Beredskap**  | HTTP `GET /healthz`                                                              | Livscykel `ok` / `starting` / `stopping` (200 vs 503). Klappar fortfarande om slingan är CPU-blockerad. A** 200 på flera sekunder är inte hälsosamt** (#10303) — det betyder att händelseslingan svältes innan 3-byte-hanteraren körde                                                                                                              |
| **Livlighet**  | HTTP `GET /livez`,** eller TCP** på huvudtjänstporten (`PORT`, standard `20128`) | `/livez` är endast process-live (alltid 200 om hanteraren körs). Den delar fortfarande händelseslingan — busy ≠ dead, och den upptäcker inte svält i händelseslingor (#10303) bättre än vad TCP gör. Föredra**TCP** om HTTP sonder tar timeout under catalog/compression belastning; do** inte** döda podden på korta event-loop-bås åt båda hållen |
| **Djup hälsa** | `GET /api/monitoring/health` från en extern checker                              | Inte för kubelet `livenessProbe` / tight `readinessProbe`                                                                                                                                                                                                                                                                                           |

Exempelform (justera tröskelvärdena till din kallstarts- och kompressionsbelastning):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Under event-loop stall HTTP /livez can still time out. TCP is the
  # conservative alternative:
  # tcpSocket:
  #   port: http
```

**Gör inte det** punkt kubelet** livlighet** på `/api/monitoring/health`. Den vägen fungerar riktigt DB/monitoring och kommer att vara falsk-positiv under belastning.

Relaterat: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (sonder när händelseslingan är upptagen), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (katalogprissättning), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (kompressionstoken-count hog).

### systemd watchdog (fryst händelseloop)

På en systemd-värd säger OmniRoute till servicehanteraren när den är klar och fortsätter att pinga den, så en server vars händelseslinga har fastnat dödas och startas om istället för att vara uppe och tyst. Pingarna kommer från serverns egen händelseslinga: när den blockeras stoppas de och systemd startar om tjänsten när `WatchdogSec` har förflutit utan en.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) skriver redan en användarenhet med detta. En enhet du skriver själv (standard `Type=simple`) får ingen vakthund, så lägg till dessa rader i dess `[Service]` sektion:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Den genererade enheten ställer in `Restart=on-failure`, så lägg till den raden också — utan den dödar watchdog bara den fastnade tjänsten istället för att starta om den.

- `Type=notify`: tjänsten "startas" när servern skickar `READY=1`, inte när processen splittras. `TimeoutStartSec` begränsar en långsam start.
- `NotifyAccess=all`: pingarna skickas av serverprocessen, som är ett barn till `omniroute serve` -övervakaren.
- `WatchdogSec`: ping slocknar var 60:e sekund, så använd** 120 eller mer** . Mindre värden skulle starta om en frisk server.
- Kör `omniroute serve` i förgrunden. `--daemon` kopplar bort servern från enhetens cgroup och meddelandehandskakningen slutförs aldrig.

Kontrollera att den är aktiv efter en omstart:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` visar den konfigurerade fördröjningen och `WatchdogTimestamp` går framåt varje minut. En omstart orsakad av watchdog registreras som `Result=watchdog`. För att stänga av pingarna medan du behåller enheten som den är, ställ in `OMNIROUTE_DISABLE_SD_NOTIFY=1`; utan en `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) skickas ingenting.

Vakthunden kontrollerar bara att händelseslingan fortsätter att köras. En server som är långsam men fortfarande vänder startas inte om.

### Valfritt arbete med begäranden (minne, färdigheter, token-uppdatering)

Minnesextraktion, färdighetsinjektion och OAuth token-uppdatering delar på** huvudnodens händelseslinga** med `/healthz`. De är funktioner för att växla instrumentpanelen (`memoryEnabled`, `skillsEnabled`), inte en arbetarpool. Se [Miljö — event-loop kostnad](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Leverantörshälsa

> **Ingen REST slutpunkt.** Leverantörshälsodata är tillgänglig via MCP -verktyget `observability_snapshot` eller instrumentpanelens `/dashboard/providers` sida.

### Leverantörsinformation

> **Ingen REST slutpunkt.** Detalj per leverantör är tillgänglig via `/dashboard/providers` sidan för instrumentpanelen.

---

## Autopilot för leverantörshälsa

Modulen `providerHealthAutopilot.ts` är ett **självläkande system** som:

1. Identifierar leverantörsproblem (öppen krets, nedkylningsperioder, spärrar, kvotvarningar)
2. Genererar **rekommenderade åtgärder** för att lösa dem
3. Kan **automatiskt utföra** åtgärder med låg risk

### Identifierade problemtyper

| Problemtyp                   | Allvarlighetsgrad | Exempel på villkor                                   |
| ---------------------------- | ----------------- | ---------------------------------------------------- |
| `provider_circuit_open`      | kritisk           | Kretsbrytaren öppnas efter 5 misslyckanden           |
| `provider_circuit_half_open` | varning           | Kretsens återställning testas                        |
| `connection_cooldown`        | varning           | Anslutningen är i nedkylning efter 429               |
| `stale_connection_error`     | varning           | Senaste uppdateringen misslyckades för 30+ min sedan |
| `terminal_connection_error`  | kritisk           | OAuth har återkallats, nyckeln är ogiltig            |
| `inactive_connection`        | info              | Anslutningen är inaktiverad i inställningarna        |
| `model_lockout`              | varning           | En specifik modell är i karantän                     |
| `quota_monitor_warning`      | varning           | Kvotan har uppnått 80 %+ användning                  |

### Genererade åtgärdstyper

| Åtgärd                         | Risk  | Beskrivning                              |
| ------------------------------ | ----- | ---------------------------------------- |
| `clear_provider_breaker`       | medel | Återställ kretsbrytaren till stängt läge |
| `clear_connection_cooldown`    | låg   | Ta bort nedkylningen från en anslutning  |
| `clear_stale_connection_error` | låg   | Rensa flaggan för inaktuellt fel         |
| `clear_model_lockout`          | låg   | Återaktivera en modell i karantän        |
| `reactivate_connection`        | medel | Återaktivera en inaktiverad anslutning   |
| `deactivate_connection`        | hög   | Inaktivera en problematisk anslutning    |

### API

> **Ingen REST-slutpunkt.** Autopilotproblem är tillgängliga via MCP-verktyget `observability_snapshot` eller kontrollpanelen. Autopiloten körs internt och dess beteende konfigureras via inställningsdatabasen (`autopilotMode`-fältet per anslutning), inte via miljövariabler — `grep -rn` efter en miljövariabel för autopilotläget ger noll träffar.

### Autopilotläge

Autopiloten körs som standard i **manuellt läge** — den identifierar problem och genererar rekommenderade åtgärder, men tillämpar dem inte automatiskt. Åtgärder kan tillämpas via kontrollpanelen.

---

## Autopilot för kombinationshälsa

`comboHealthAutopilot.ts` är den **kombinationsspecifika** motsvarigheten till leverantörsautopiloten. Den:

- Identifierar ohälsosamma kombinationer
- Rekommenderar omordning av mål
- Föreslår att trasiga mål inaktiveras
- Tar automatiskt bort obrukbara mål efter N misslyckanden

### Exempel på kombinationsproblem

```
Kombinationen "always-on" (prioritetsstrategi)
├─ Mål 1: openai/gpt-5 (fungerar)
├─ Mål 2: anthropic/claude-opus-4-6 (⚠️ modellspärr till 14:00)
└─ Mål 3: kiro/claude-sonnet-4-5 (fungerar)

Rekommenderad åtgärd: Ändra ordning — flytta kiro ovanför anthropic tills spärren upphör
```

---

## Kvotövervakare

`observability.ts` exponerar **kvotövervakare per session** för prenumerationsleverantörer (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0–100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Statusbetydelser

| Status      | När                               | Åtgärd i användargränssnittet              |
| ----------- | --------------------------------- | ------------------------------------------ |
| `starting`  | Inledande avläsning pågår         | Laddningsindikator                         |
| `idle`      | Ingen aktivitet nyligen           | Dold från kontrollpanelen                  |
| `healthy`   | Mer än 50 % av kvotan återstår    | Grön punkt                                 |
| `warning`   | Mindre än 50 % av kvotan återstår | Gul varning                                |
| `exhausted` | Kvot = 0 %                        | Rött block, dirigera till nästa leverantör |
| `error`     | Avläsningen misslyckades          | Röd punkt, försök snart igen               |

### API

> **Ingen REST-slutpunkt.** Data från kvotövervakaren är tillgängliga via MCP-verktyget `observability_snapshot` eller kontrollpanelen.

---

## Ögonblicksbild av observerbarhet

MCP-verktyget `observability_snapshot` returnerar en **fullständig systemögonblicksbild** för AI-agenter:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* se ovan */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agenter använder detta för att fatta **routningsbeslut** — till exempel: ”om openai-kretsen är öppen, routa först till anthropic”.

---

## Kontroll av tokenstatus

OAuth-leverantörer (Claude Code, GitHub Copilot, Cursor) behöver **regelbunden tokenuppdatering**. `src/lib/tokenHealthCheck.ts` kör en bakgrundsschemaläggare:

- **Kontrollcykel**: var 60:e sekund (kontroll i `TICK_MS = 60 * 1000` i `src/lib/tokenHealthCheck.ts:30`)
- **Intervall för hälsokontroll per anslutning**: standardvärdet är 60 minuter (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); kan konfigureras via inställningsdatabasen
- **Förebyggande uppdatering vid 401**: hanteras av avlyssnaren för respektive anslutning

### Tokenstatus

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Konfiguration

Konfigurationen av tokenhälsokontrollen hanteras internt av `tokenHealthCheck.ts`.

### Tokenhälsa

> **Ingen REST-slutpunkt.** Tokenhälsodata är tillgängliga via kontrollpanelen eller MCP-verktyget `observability_snapshot`.

---

## Aviseringar

### Inbyggda kanaler

OmniRoute stöder **3 aviseringskanaler**:

| Kanal                   | Konfiguration    | Användningsfall            |
| ----------------------- | ---------------- | -------------------------- |
| Kontrollpanelsbanderoll | Alltid aktiverad | Aviseringar i appen        |
| Webhook                 | Konfigurera URL  | Slack, Discord, PagerDuty  |
| Logg                    | Standard         | För extern loggaggregering |

### Webhook-konfiguration

> **Obs:** Konfiguration av webhook-aviseringar hanteras via sidan Inställningar i kontrollpanelen. Se inställningsgränssnittet för webhook-URL, händelsefiltrering och anpassning av nyttolast.

### Aviseringstyper

| Avisering                    | När                                       | Standardallvarlighetsgrad |
| ---------------------------- | ----------------------------------------- | ------------------------- |
| `provider_circuit_open`      | Kretsen öppnas                            | kritisk                   |
| `provider_circuit_half_open` | Kretsens återhämtning testas              | information               |
| `quota_warning`              | Kvoten är 80 % eller mer utnyttjad        | varning                   |
| `quota_exhausted`            | Kvoten är 100 % utnyttjad                 | kritisk                   |
| `token_refresh_failed`       | Minst 3 uppdateringsfel i följd           | varning                   |
| `token_expired`              | Token har passerat utgångstiden           | kritisk                   |
| `combo_target_unhealthy`     | Kombinationsmålet i vänteläge i minst 1 h | varning                   |
| `db_integrity_warning`       | FK-överträdelser > 0                      | varning                   |
| `heap_pressure`              | Heap-användning > 80 % av tröskelvärdet   | varning                   |

---

## Prestandamått

### Spårade mått

| Mått                    | Typ       | Källa                           |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | räknare   | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | räknare   | `services/usage.ts`             |
| `cost_usd`              | räknare   | `services/usage.ts`             |
| `provider_errors`       | räknare   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | räknare   | `services/resilience.ts`        |
| `cache_hits`            | räknare   | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | mätare    | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | mätare    | `observability.ts`              |

### Latenspercentiler (p50/p95/p99)

> **Ingen REST-slutpunkt.** Data om latenspercentiler är tillgänglig via dashboardsidan `/dashboard/health`. Export till Prometheus/OpenTelemetry planeras för v3.9.

### Export till Prometheus/OpenTelemetry (fas 2)

Planerat för v3.9: inbyggd export till Prometheus, OpenTelemetry och Datadog.

Tills vidare kan `/api/monitoring/health` avläsas med valfritt HTTP-baserat övervakningssystem (Prometheus blackbox exporter, Datadog HTTP check osv.).

---

## Recept för aviseringar

### Slack

> **Obs:** Webhook-aviseringar konfigureras via sidan Settings i dashboarden – det finns inga särskilda miljövariabler för webhooks (`grep -rn` ger noll träffar). Se gränssnittet under Settings för webhook-URL, händelsefiltrering och anpassning av nyttolasten.

### Discord

> Webhook-aviseringar använder samma flöde i gränssnittet under Settings som Slack. Discord godtar samma JSON-format för nyttolasten.

### PagerDuty

> Webhook-aviseringar använder samma flöde i gränssnittet under Settings. Routningsnycklar för PagerDuty Events API v2 konfigureras i gränssnittet under Settings.

### Anpassad webhook (JSON)

> Alla HTTP-slutpunkter som accepterar POST med en JSON-kropp fungerar. Konfigurera URL:en i gränssnittet under Settings.

---

## Dashboardkonfiguration

### Anpassa hälsodashboarden

Skapa `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Fäst en leverantör högst upp

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Felsökning

### "Leverantören uppges fungera men förfrågningar misslyckas"

1. Kontrollera **autopilotproblemen** – en modell kan vara spärrad
2. Titta på **senaste fel** för den specifika felklassen
3. Prova **anslutningstestet** i leverantörskortet
4. Kontrollera om leverantören är **hastighetsbegränsad uppströms** (syns inte lokalt)

### "Kvoten uppges vara okej men jag ser 429-fel"

- 429 innebär att leverantören uppger att du har förbrukat din kvot
- OmniRoutes kvotspårning kan vara **inaktuell** – det är leverantörens uppgifter uppströms som gäller
- Kvotdata uppdateras automatiskt via den interna kvotövervakaren

### "Kombinationen misslyckas men alla mål ser ut att fungera"

- Kontrollera dashboarden för **kombinationshälsa** efter problem med målens ordning
- Titta på **reservhändelser** – kombinationen kan förbruka alternativen för snabbt
- Kontrollera att **strategin** passar ditt användningsfall (prioritet kontra round-robin kontra automatisk)

### "Databasens hälsokontroll misslyckas"

- Kör `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Om resultatet är "ok" – falskt alarm, hälsokontrollen är för strikt
- Vid något annat resultat – **stoppa OmniRoute** och följ [guiden för katastrofåterställning](./DATABASE_GUIDE.md#disaster-recovery)

### "Minnets heap-belastning är kritisk"

```bash
# Kontrollera aktuell heap
node -e "console.log(process.memoryUsage())"

# Utlös manuell GC (om --expose-gc används)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Minska antalet samtidiga förfrågningar (ställs in via sidan Settings i dashboarden, inte via en miljövariabel)
# Det finns ingen miljövariabel med namnet `MAX_CONCURRENT_REQUESTS` – konfigurera detta under Settings → Concurrency.
```

---

## Se även

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — spårning av användning och kostnader
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — databasschema + hälsa
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxyhälsa (separat cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — systemarkitektur
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — detaljer om kretsbrytaren
- Källa: `src/lib/monitoring/` (4 filer, 2121 kodrader)
