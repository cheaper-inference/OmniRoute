# Monitoring & Observability Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute wordt geleverd met ingebouwde gezondheidsbewaking, een autopilot voor providers, quotumregistratie en observability-hooks. Deze handleiding behandelt het dashboard, waarschuwingen en probleemoplossing.

**Bronnen:**

- `src/lib/monitoring/observability.ts` — observability-snapshot
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot voor combinatiegezondheid
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot voor providers
- `src/lib/monitoring/providerHealthMatrix.ts` — gezondheidsmatrix voor providers
- `src/lib/localHealthCheck.ts` — lokale gezondheidscontrole
- `src/lib/tokenHealthCheck.ts` — gezondheid van tokenvernieuwing
- `src/lib/proxyHealth.ts` — cache voor proxygezondheid (behandeld in PROXY_GUIDE.md)

---

## Overzicht

OmniRoute heeft **3 bewakingslagen**:

```
┌──────────────────────────────────────────────────────────────┐
│  Laag 1: Systeemgezondheid (serverniveau)                     │
│  ├─ localHealthCheck.ts — DB, poorten, native afhankelijkheden│
│  ├─ db/healthCheck.ts — integriteit, FK, verweesde artefacten │
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Laag 2: Providergezondheid (veerkracht per provider)         │
│  ├─ providerHealthAutopilot.ts — circuitbreaker, afkoelperiodes│
│  ├─ providerHealthMatrix.ts — gezondheidsscores per provider/model│
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Laag 3: Live observability (runtime-snapshots)               │
│  ├─ observability.ts — circuitbreakers, sessies, quotum       │
│  ├─ tokenHealthCheck.ts — gezondheid van OAuth-tokenvernieuwing│
│  └─ MCP-tools: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Dashboardpagina's

### `/dashboard/health` (Systeemgezondheid)

Het algemene gezondheidsdashboard toont:

| Sectie                | Wat er wordt weergegeven                                    |
| --------------------- | ----------------------------------------------------------- |
| **Serverstatus**      | Uptime, versie, poort, actieve verbindingen                 |
| **Database**          | Verbinding, integriteit, WAL-grootte, recente migraties     |
| **Provideroverzicht** | Aantal actieve en gezonde providers en open circuitbreakers |
| **Quotummonitors**    | Actieve sessies, waarschuwingen, uitgeputte quota           |
| **Recente fouten**    | Laatste 10 fouten met stacktraces                           |
| **Resourcegebruik**   | Geheugen, CPU, indicator voor heapdruk                      |

### `/dashboard/providers` (Providergezondheid)

Dashboard per provider:

| Kolom        | Beschrijving                                                       |
| ------------ | ------------------------------------------------------------------ |
| Provider     | Provider-ID + weergavenaam                                         |
| Gezondheid   | Groene/gele/rode status                                            |
| Circuit      | Open/gesloten/halfopen status                                      |
| Verbindingen | Aantal verbindingen, laatste vernieuwing                           |
| Modellen     | Beschikbare modellen, gezondheid per model                         |
| Kosten       | Kosten van vandaag, trend over 7 dagen                             |
| Fouten       | Aantal fouten in de afgelopen 24 uur, meest voorkomende foutklasse |

Klik op een provider om het volgende te bekijken:

- Recente aanvragen met een uitsplitsing van de latentie
- Gezondheidsscores per verbinding
- Blokkeringen per model
- Aanbevelingen van de autopilot

### `/dashboard/quota` (Quotumregistratie)

Voor elke API-sleutel:

- Huidig gebruik ten opzichte van de limiet (voortgangsbalk)
- Quotumtrend (grafiek over 30 dagen)
- Tijdstip van de volgende reset
- Waarschuwingsgeschiedenis

### `/dashboard/combos` (Combinatiegezondheid)

Per combinatie:

- Strategie + doelen
- Gezondheid per doel
- Recente fallbackgebeurtenissen
- Succespercentage (24 uur, 7 dagen, 30 dagen)

---

## Gezondheidscheck API

OmniRoute blootlegt** twee** HTTP gezondheidsoppervlakken. Ze zijn niet uitwisselbaar voor orkestrators.

| Pad                          | Doel                                                                                | Gewicht                                    | Gebruik voor                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------- |
| `GET /healthz`               | Levenscyclus liveness/readiness (`ok` / `starting` / `stopping`)                    | Triviaal (alleen fasevlag)                 | Kubernetes** gereedheid** ; zacht** levendigheid** als u HTTP moet gebruiken |
| `GET /api/monitoring/health` | Samenvatting van de diepe systeemzqa + provider (DB, heap, catalogusaantallen, ...) | Zwaar (synchronisatie DB / monitoringwerk) | Dashboards, blackbox deep checks, Docker's ingebouwde healthcheck            |

> **Opmerking:** Gezondheidsmatrices van providers, problemen met de automatische piloot, quotamonitors, tokengezondheid en latentiedetails buiten `/api/monitoring/health` zijn beschikbaar via de**MCP -tool** `observability_snapshot` of de** dashboard** pagina's — daar zijn geen speciale REST routes voor.

Beide routes lopen over de** dezelfde knooppuntgebeurtenislus** als verzoekafhandeling. Een CPU-gebonden pad (groot `GET /v1/models` cataloguswerk, lange-contextcompressie / tokentelling) kan vertraging veroorzaken** alle** HTTP handlers, inclusief `/healthz`. Event-loop bezig ≠ proces dood. Geef er de voorkeur aan het varken te repareren; Het afstemmen van sondes vermindert alleen het aantal valse moorden.

### Lichtgewicht Orchestrator-sonde

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` wanneer de levenscyclusfase van de server gereed is
- **503** + `starting` / `stopping` tijdens het opstarten of afsluiten
- Implementatie: `src/app/healthz/route.ts` (geen DB -ping)

### Systeemstatus (diep)

```bash
GET /api/monitoring/health
```

Antwoord:

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

`GET /api/monitoring/health` → `credentialHealth` is de** in-memory probe-cache-meter** , geen live dump van `provider_connections.test_status`. Na #12532 leest het verzoekpad alleen `getCachedCredentialHealthSummary()` ; achtergrondsondes vernieuwen de cache van de gebeurtenislus.

| Laag                        | Waar                                                                  | Wat het betekent                                                                                                                                                                                                            |
| --------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Probe-cache-meter           | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | De laatste testresultaten voor de status van de referenties worden nog steeds in het procesgeheugen bewaard. `source` is altijd `probe-cache`.                                                                              |
| Mislukte verbindingsdetails | `credentialHealth.failedConnections`                                  | Cadeau** alleen als `failed > 0`** . Begrensde lijst met cacherijen met `status=error` (`connectionId`, `status`, opgeschoonde `lastError` / `lastErrorType`). `failedOmitted` wordt ingesteld toen de lijst werd afgedekt. |
| SQLite plakkerige status    | `credentialHealth.staleDbNonOkCount`                                  | Telling van** actief** (`is_active=1`) verbindingsrijen waarvan de persistente `test_status` een bekende niet-ok is (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                      |

De twee lagen kunnen het met opzet oneens zijn:

- Gauge `failed=0` terwijl `staleDbNonOkCount>0` — SQLite nog steeds een sticky `test_status` heeft (bijvoorbeeld `expired` of `credits_exhausted`) waarvan de laatste probe-cache-snapshot niet telt als `status=error`.
- Bepaal `failed>0` terwijl SQLite er gezond uitziet. — Een recente test is mislukt en wordt in de cache opgeslagen; de DB rij is niet bijgewerkt of is later gewist.

Waarschuw niet uitsluitend op `provider_connections.test_status` bij het schrapen van dit eindpunt. Gebruik `failed` + `failedConnections` voor live probe-fouten, en `staleDbNonOkCount` wanneer u de aanhoudende sticky-statustelling nodig hebt.

### Aanbevelingen voor Kubernetes-sondes

OmniRoute is een** enkel knooppuntproces** (één gebeurtenislus). Voorraad Docker `HEALTHCHECK` richt zich op lichtgewicht `/healthz`. `/api/monitoring/health` is** te zwaar** voor kubelet-levendigheidsintervallen.

| Doorvragen           | Aanbevolen doel                                                                   | Opmerkingen                                                                                                                                                                                                                                                                                                                                                          |
| -------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Opstarten**        | HTTP `GET /healthz` met een lange `failureThreshold` (of grote `startPeriod`)     | Koude start + SQLite migratie kan langer dan enkele seconden duren                                                                                                                                                                                                                                                                                                   |
| **Bereidheid**       | HTTP `GET /healthz`                                                               | Levenscyclus `ok` / `starting` / `stopping` (200 versus 503). Flapt nog steeds als de lus CPU-geblokkeerd is. A** 200 in meerdere seconden is niet gezond** (#10303) — betekent dat de gebeurtenislus was uitgehongerd voordat de handler van 3 bytes werd uitgevoerd                                                                                                |
| **Levendigheid**     | HTTP `GET /livez`,** of TCP** op de hoofdservicepoort (`PORT`, standaard `20128`) | `/livez` is alleen proces-levend (altijd 200 als de handler actief is). Het deelt nog steeds de gebeurtenislus — busy ≠ dead, en het detecteert event-loop starvation (#10303) niet beter dan TCP. De voorkeur geven aan**TCP** als HTTP tests time-out krijgen onder catalog/compression belasting; Doen** niet** dood de pod hoe dan ook op korte event-loop-boxen |
| **Diepe gezondheid** | `GET /api/monitoring/health` van een externe controleur                           | Niet voor kubelet `livenessProbe` / strakke `readinessProbe`                                                                                                                                                                                                                                                                                                         |

Voorbeeldvorm (pas de drempels aan uw koude start en compressiebelasting aan):

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

**Niet doen** punt kubelet** levendigheid** bij `/api/monitoring/health`. Dat pad doet echt DB/monitoring -werk en zal onder belasting vals-positief zijn.

Gerelateerd: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (probes terwijl de gebeurtenislus bezig is), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (catalogusprijshog), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (compressietokentellinghog).

### systemd watchdog (bevroren gebeurtenislus)

Op een systemd-host vertelt OmniRoute de servicemanager wanneer deze gereed is en blijft deze pingen, zodat een server waarvan de gebeurtenislus vastzit, wordt afgebroken en opnieuw wordt opgestart in plaats van stil te blijven. De pings komen uit de eigen gebeurtenislus van de server: wanneer deze blokkeert, stoppen ze en systemd start de service opnieuw zodra `WatchdogSec` zonder één is verstreken.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) schrijft hiermee al een gebruikerseenheid. Een eenheid die u zelf schrijft (de standaard `Type=simple`) krijgt geen watchdog, dus voeg deze regels toe aan de `[Service]` sectie:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

De gegenereerde eenheid stelt `Restart=on-failure` in, dus voeg die regel ook — toe. Zonder deze regel doodt de watchdog alleen de vastgelopen service in plaats van deze opnieuw te starten.

- `Type=notify`: de service wordt "gestart" wanneer de server `READY=1` verzendt, niet wanneer het proces wordt afgesplitst. `TimeoutStartSec` kent een trage start.
- `NotifyAccess=all`: de pings worden verzonden door het serverproces, dat een onderliggend onderdeel is van de `omniroute serve` supervisor.
- `WatchdogSec`: pings gaan elke 60 seconden uit, dus gebruik** 120 of meer** . Kleinere waarden zouden een gezonde server opnieuw opstarten.
- Voer `omniroute serve` uit op de voorgrond. `--daemon` koppelt de server los van de cgroup van de eenheid en de handshake wordt nooit voltooid.

Controleer of deze actief is na een herstart:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` toont de geconfigureerde vertraging en `WatchdogTimestamp` gaat elke minuut vooruit. Een herstart veroorzaakt door de watchdog wordt geregistreerd als `Result=watchdog`. Om de pings uit te schakelen terwijl het apparaat blijft zoals het is, stelt u `OMNIROUTE_DISABLE_SD_NOTIFY=1` in; zonder een `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) wordt er niets verzonden.

De watchdog controleert alleen of de gebeurtenislus blijft lopen. Een server die langzaam is maar nog steeds draait, wordt niet opnieuw opgestart.

### Optioneel verzoekpadwerk (geheugen, vaardigheden, tokenvernieuwing)

Geheugenextractie, injectie van vaardigheden en vernieuwing van OAuth tokens delen de** belangrijkste knooppuntgebeurtenislus** met `/healthz`. Het zijn dashboard-schakelfuncties (`memoryEnabled`, `skillsEnabled`), geen werkrolpool. Zie [Omgeving — gebeurtenisluskosten](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Gezondheid van de aanbieder

> **Geen REST eindpunt.** Gezondheidsgegevens van providers zijn beschikbaar via de MCP tool `observability_snapshot` of de dashboard `/dashboard/providers` -pagina.

### Providergegevens

> **Geen REST eindpunt.** Details per provider zijn beschikbaar via de dashboard `/dashboard/providers` pagina.

---

## Autopilot voor providerstatus

De module `providerHealthAutopilot.ts` is een **zelfherstellend systeem** dat:

1. Problemen met providers detecteert (open circuit, afkoelperiodes, blokkeringen, quotawaarschuwingen)
2. **Aanbevolen acties** genereert om deze op te lossen
3. Optioneel acties met een laag risico **automatisch uitvoert**

### Gedetecteerde probleemtypen

| Probleemtype                 | Ernstig- heid | Voorbeeldconditie                               |
| ---------------------------- | ------------- | ----------------------------------------------- |
| `provider_circuit_open`      | kritiek       | Circuitonderbreker open na 5 fouten             |
| `provider_circuit_half_open` | waarschuwing  | Circuit test herstel                            |
| `connection_cooldown`        | waarschuwing  | Verbinding in afkoelperiode na 429              |
| `stale_connection_error`     | waarschuwing  | Laatste vernieuwing 30+ minuten geleden mislukt |
| `terminal_connection_error`  | kritiek       | OAuth ingetrokken, sleutel ongeldig             |
| `inactive_connection`        | info          | Verbinding uitgeschakeld in instellingen        |
| `model_lockout`              | waarschuwing  | Specifiek model in quarantaine                  |
| `quota_monitor_warning`      | waarschuwing  | Quotum voor 80%+ gebruikt                       |

### Gegenereerde actietypen

| Actie                          | Risico    | Beschrijving                                      |
| ------------------------------ | --------- | ------------------------------------------------- |
| `clear_provider_breaker`       | gemiddeld | Stel de circuitonderbreker opnieuw in op gesloten |
| `clear_connection_cooldown`    | laag      | Verwijder de afkoelperiode van een verbinding     |
| `clear_stale_connection_error` | laag      | Wis de verouderde foutmarkering                   |
| `clear_model_lockout`          | laag      | Schakel een model in quarantaine opnieuw in       |
| `reactivate_connection`        | gemiddeld | Schakel een gedeactiveerde verbinding opnieuw in  |
| `deactivate_connection`        | hoog      | Schakel een problematische verbinding uit         |

### API

> **Geen REST-endpoint.** Autopilot-problemen zijn beschikbaar via de MCP-tool `observability_snapshot` of het dashboard. De autopilot wordt intern uitgevoerd; het gedrag ervan wordt geconfigureerd via de instellingendatabase (het veld `autopilotMode` per verbinding), niet via omgevingsvariabelen — `grep -rn` voor een omgevingsvariabele voor de autopilotmodus levert geen resultaten op.

### Autopilotmodus

De autopilot werkt standaard in de **handmatige modus** — problemen worden gedetecteerd en aanbevolen acties worden gegenereerd, maar deze worden niet automatisch toegepast. Acties kunnen via het dashboard worden toegepast.

---

## Autopilot voor combostatus

`comboHealthAutopilot.ts` is het **combospecifieke** equivalent van de providerautopilot. Deze:

- Detecteert ongezonde combo's
- Beveelt een andere volgorde van doelen aan
- Stelt voor defecte doelen uit te schakelen
- Verwijdert niet-werkende doelen automatisch na N fouten

### Voorbeelden van comboproblemen

```
Combo "always-on" (prioriteitsstrategie)
├─ Doel 1: openai/gpt-5 (gezond)
├─ Doel 2: anthropic/claude-opus-4-6 (⚠️ modelblokkering tot 14:00)
└─ Doel 3: kiro/claude-sonnet-4-5 (gezond)

Aanbevolen actie: Volgorde wijzigen — plaats kiro boven anthropic totdat de blokkering verloopt
```

---

## Quotummonitors

`observability.ts` stelt **quotummonitors per sessie** beschikbaar voor abonnementsproviders (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Betekenis van statussen

| Status      | Wanneer                         | UI-actie                                           |
| ----------- | ------------------------------- | -------------------------------------------------- |
| `starting`  | Eerste peiling wordt uitgevoerd | Laadindicator                                      |
| `idle`      | Geen recente activiteit         | Verborgen op het dashboard                         |
| `healthy`   | Meer dan 50% quotum resterend   | Groene stip                                        |
| `warning`   | Minder dan 50% quotum resterend | Gele waarschuwing                                  |
| `exhausted` | Quotum = 0%                     | Rode blokkering, routeer naar de volgende provider |
| `error`     | Peiling mislukt                 | Rode stip, probeer het snel opnieuw                |

### API

> **Geen REST-endpoint.** Gegevens van quotummonitors zijn beschikbaar via de MCP-tool `observability_snapshot` of het dashboard.

---

## Observability-snapshot

De MCP-tool `observability_snapshot` retourneert een **volledige systeemsnapshot** voor AI-agents:

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
  "quotaMonitors": {/* zie hierboven */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agents gebruiken dit om **routeringsbeslissingen** te nemen — bijvoorbeeld: "als het circuit van openai open is, routeer dan eerst naar anthropic".

---

## Tokenstatuscontrole

OAuth-providers (Claude Code, GitHub Copilot, Cursor) vereisen **periodieke tokenvernieuwing**. `src/lib/tokenHealthCheck.ts` voert een achtergrondplanner uit:

- **Sweep-tick**: elke 60 seconden (sweep in `TICK_MS = 60 * 1000` op `src/lib/tokenHealthCheck.ts:30`)
- **Interval voor statuscontrole per verbinding**: standaard 60 minuten (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); configureerbaar via de instellingendatabase
- **Preventieve vernieuwing bij 401**: afgehandeld door de interceptor per verbinding

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

### Configuratie

De configuratie van de tokenstatuscontrole wordt intern afgehandeld door `tokenHealthCheck.ts`.

### Tokenstatus

> **Geen REST-endpoint.** Tokenstatusgegevens zijn beschikbaar via het dashboard of de MCP-tool `observability_snapshot`.

---

## Waarschuwingen

### Ingebouwde kanalen

OmniRoute ondersteunt **3 waarschuwingskanalen**:

| Kanaal          | Configuratie     | Gebruiksscenario                      |
| --------------- | ---------------- | ------------------------------------- |
| Dashboardbanner | Altijd actief    | Meldingen in de app                   |
| Webhook         | URL configureren | Slack, Discord, PagerDuty             |
| Log             | Standaard        | Voor externe aggregatie van logboeken |

### Webhookconfiguratie

> **Opmerking:** De configuratie van webhookwaarschuwingen wordt afgehandeld via de pagina Instellingen van het dashboard. Raadpleeg de gebruikersinterface van Instellingen voor de webhook-URL, gebeurtenisfiltering en aanpassing van de payload.

### Waarschuwingstypen

| Waarschuwing                 | Wanneer                                     | Standaardernst |
| ---------------------------- | ------------------------------------------- | -------------- |
| `provider_circuit_open`      | Circuit wordt geopend                       | kritiek        |
| `provider_circuit_half_open` | Circuit test het herstel                    | info           |
| `quota_warning`              | Quotum op 80%+                              | waarschuwing   |
| `quota_exhausted`            | Quotum op 100%                              | kritiek        |
| `token_refresh_failed`       | 3+ opeenvolgende vernieuwingsfouten         | waarschuwing   |
| `token_expired`              | Token is verlopen                           | kritiek        |
| `combo_target_unhealthy`     | Combinatiedoel bevindt zich 1u+ in cooldown | waarschuwing   |
| `db_integrity_warning`       | FK-schendingen > 0                          | waarschuwing   |
| `heap_pressure`              | Heapgebruik > 80% van de drempelwaarde      | waarschuwing   |

---

## Prestatiestatistieken

### Bijgehouden statistieken

| Statistiek              | Type      | Bron                            |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | teller    | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | teller    | `services/usage.ts`             |
| `cost_usd`              | teller    | `services/usage.ts`             |
| `provider_errors`       | teller    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | teller    | `services/resilience.ts`        |
| `cache_hits`            | teller    | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | meter     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | meter     | `observability.ts`              |

### Latentiepercentielen (p50/p95/p99)

> **Geen REST-endpoint.** Gegevens over latentiepercentielen zijn beschikbaar via de dashboardpagina `/dashboard/health`. Export naar Prometheus/OpenTelemetry staat gepland voor v3.9.

### Export naar Prometheus / OpenTelemetry (fase 2)

Gepland voor v3.9: native export naar Prometheus, OpenTelemetry en Datadog.

Haal voorlopig gegevens op van `/api/monitoring/health` met een HTTP-gebaseerd monitoringsysteem (Prometheus blackbox exporter, Datadog HTTP check enz.).

---

## Recepten voor waarschuwingen

### Slack

> **Opmerking:** Webhookwaarschuwingen worden geconfigureerd via de pagina Instellingen van het dashboard — er zijn geen specifieke webhook-omgevingsvariabelen (`grep -rn` levert nul resultaten op). Raadpleeg de gebruikersinterface van Instellingen voor de webhook-URL, gebeurtenisfiltering en aanpassing van de payload.

### Discord

> Webhookwaarschuwingen gebruiken dezelfde configuratieprocedure in de gebruikersinterface van Instellingen als Slack. Discord accepteert dezelfde JSON-payloadstructuur.

### PagerDuty

> Webhookwaarschuwingen gebruiken dezelfde configuratieprocedure in de gebruikersinterface van Instellingen. Routingsleutels voor PagerDuty Events API v2 worden geconfigureerd in de gebruikersinterface van Instellingen.

### Aangepaste webhook (JSON)

> Elk HTTP-endpoint dat POST-verzoeken met een JSON-body accepteert, werkt. Configureer de URL in de gebruikersinterface van Instellingen.

---

## Dashboardconfiguratie

### Het statusdashboard aanpassen

Maak een `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Een provider bovenaan vastzetten

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Probleemoplossing

### "De provider meldt dat deze gezond is, maar verzoeken mislukken"

1. Controleer de **autopilot-problemen** — mogelijk is een model geblokkeerd
2. Bekijk de **recente fouten** voor de specifieke foutklasse
3. Probeer de **verbindingstest** op de providerkaart
4. Controleer of de provider **bovenstrooms een snelheidslimiet heeft bereikt** (lokaal niet zichtbaar)

### "Het quotum wordt als gezond weergegeven, maar ik zie 429-fouten"

- 429 betekent dat de provider aangeeft dat u uw quotum hebt opgebruikt
- De quotumregistratie van OmniRoute kan **verouderd** zijn — de gegevens van de bovenstroomse provider zijn leidend
- Quotumgegevens worden automatisch vernieuwd via de interne quotummonitor

### "De combinatie mislukt, maar alle doelen lijken gezond"

- Controleer het dashboard voor **combinatiestatus** op problemen met de volgorde van doelen
- Bekijk de **fallbackgebeurtenissen** — mogelijk raakt de combinatie te snel uitgeput
- Controleer of de **strategie** overeenkomt met uw gebruiksscenario (prioriteit versus round-robin versus automatisch)

### "De statuscontrole van de database mislukt"

- Voer `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` uit
- Als het resultaat "ok" is — vals alarm, de statuscontrole is te streng
- Bij elk ander resultaat — **stop OmniRoute** en volg de [handleiding voor noodherstel](./DATABASE_GUIDE.md#disaster-recovery)

### "De druk op het geheugengebied is kritiek"

```bash
# Controleer de huidige heap
node -e "console.log(process.memoryUsage())"

# Activeer handmatige garbagecollection (indien --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Verminder het aantal gelijktijdige verzoeken (stel dit in via de pagina Instellingen van het dashboard, niet via een omgevingsvariabele)
# Er is geen omgevingsvariabele `MAX_CONCURRENT_REQUESTS` — configureer dit via Instellingen → Gelijktijdigheid.
```

---

## Zie ook

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — gebruiks- en kostentracering
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — databaseschema en -status
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxystatus (afzonderlijke cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — systeemarchitectuur
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — details over de circuitbreaker
- Bron: `src/lib/monitoring/` (4 bestanden, 2121 regels code)
