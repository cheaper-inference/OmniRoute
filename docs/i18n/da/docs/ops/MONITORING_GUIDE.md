# Monitoring & Observability Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Kort fortalt**: OmniRoute leveres med indbygget helbredsovervågning, autopilot til udbydere, kvotesporing og hooks til observerbarhed. Denne vejledning dækker dashboardet, advarsler og fejlfinding.

**Kilder:**

- `src/lib/monitoring/observability.ts` — øjebliksbillede af observerbarhed
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot til kombinationshelbred
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot til udbydere
- `src/lib/monitoring/providerHealthMatrix.ts` — helbredsmatrix for udbydere
- `src/lib/localHealthCheck.ts` — lokalt helbredstjek
- `src/lib/tokenHealthCheck.ts` — helbred for tokenfornyelse
- `src/lib/proxyHealth.ts` — cache for proxyhelbred (beskrevet i PROXY_GUIDE.md)

---

## Overblik

OmniRoute har **3 lag af overvågning**:

```
┌──────────────────────────────────────────────────────────────┐
│  Lag 1: Systemhelbred (serverniveau)                          │
│  ├─ localHealthCheck.ts — database, porte, native afhængigheder│
│  ├─ db/healthCheck.ts — integritet, FK, forældreløse artefakter│
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Lag 2: Udbyderhelbred (robusthed pr. udbyder)                │
│  ├─ providerHealthAutopilot.ts — circuit breaker, nedkøling   │
│  ├─ providerHealthMatrix.ts — helbredsscore pr. udbyder/model │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Lag 3: Live-observerbarhed (øjebliksbilleder under kørsel)   │
│  ├─ observability.ts — circuit breakers, sessioner, kvote     │
│  ├─ tokenHealthCheck.ts — helbred for OAuth-tokenfornyelse    │
│  └─ MCP-værktøjer: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Dashboardsider

### `/dashboard/health` (Systemhelbred)

Det overordnede helbredsdashboard viser:

| Sektion              | Hvad den viser                                              |
| -------------------- | ----------------------------------------------------------- |
| **Serverstatus**     | Oppetid, version, port, aktive forbindelser                 |
| **Database**         | Forbindelse, integritet, WAL-størrelse, seneste migreringer |
| **Udbyderoversigt**  | Antal aktive, antal sunde, antal åbne breakers              |
| **Kvotemonitorer**   | Aktive sessioner, advarsler, opbrugte kvoter                |
| **Seneste fejl**     | De seneste 10 fejl med stack traces                         |
| **Ressourceforbrug** | Hukommelse, CPU, indikator for heap-belastning              |

### `/dashboard/providers` (Udbyderhelbred)

Dashboard pr. udbyder:

| Kolonne      | Beskrivelse                                          |
| ------------ | ---------------------------------------------------- |
| Udbyder      | Udbyder-id + vist navn                               |
| Helbred      | Grøn/gul/rød status                                  |
| Circuit      | Åben/lukket/halvåben tilstand                        |
| Forbindelser | Antal forbindelser, seneste opdatering               |
| Modeller     | Tilgængelige modeller, helbred pr. model             |
| Omkostning   | Dagens omkostning, 7-dages tendens                   |
| Fejl         | Antal fejl de seneste 24 timer, hyppigste fejlklasse |

Klik på en udbyder for at se:

- Seneste anmodninger med opdeling af latenstid
- Helbredsscore pr. forbindelse
- Blokeringer pr. model
- Anbefalinger fra autopilot

### `/dashboard/quota` (Kvotetracking)

For hver API-nøgle:

- Aktuelt forbrug i forhold til grænsen (statuslinje)
- Kvotetendens (30-dages diagram)
- Tidspunkt for næste nulstilling
- Advarselshistorik

### `/dashboard/combos` (Kombinationshelbred)

Pr. kombination:

- Strategi + mål
- Helbred pr. mål
- Seneste fallback-hændelser
- Succesrate (24 timer, 7 dage, 30 dage)

---

## Sundhedstjek API

OmniRoute afslører** to** HTTP sundhedsoverflader. De er ikke udskiftelige for orkestratorer.

| Sti                          | Formål                                                         | Vægt                                 | Brug til                                                              |
| ---------------------------- | -------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| `GET /healthz`               | Livscyklus liveness/readiness (`ok` / `starting` / `stopping`) | Trivielt (kun faseflag)              | Kubernetes** beredskab** ; blød** livlighed** hvis du skal bruge HTTP |
| `GET /api/monitoring/health` | Dyb system + udbyder oversigt (DB, heap, katalog optælling, …) | Tung (sync DB / overvågningsarbejde) | Dashboards, blackbox dybe tjek, Docker indbyggede sundhedstjek        |

> **Note:** Udbydersundhedsmatricer, autopilotproblemer, kvotemonitorer, tokensundhed og latensdetaljer ud over `/api/monitoring/health` er tilgængelige via**MCP værktøj** `observability_snapshot` eller** dashboard** sider — der er ingen dedikerede REST ruter til dem.

Begge ruter kører på** samme Node-hændelsesløkke** som anmodningsbehandling. En CPU-bundet sti (stort `GET /v1/models` katalog arbejde, lang kontekst komprimering / token optælling) kan forsinke** alle** HTTP handlere, inklusive `/healthz`. Event-loop optaget ≠ proces død. Foretrækker at fiksere svinet; sondetuning reducerer kun falske drab.

### Letvægts orkestratorsonde

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` når serverens livscyklusfase er klar
- **503** + `starting` / `stopping` under opstart eller nedlukning
- Implementering: `src/app/healthz/route.ts` (ingen DB ping)

### Systemsundhed (dyb)

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

`GET /api/monitoring/health` → `credentialHealth` er den** in-memory probe-cache måler** , ikke en live dump af `provider_connections.test_status`. Efter #12532 læser anmodningsstien kun `getCachedCredentialHealthSummary()` ; baggrundsprober opdaterer cachen fra hændelsesløkken.

| Lag                                  | Hvor                                                                  | Hvad det betyder                                                                                                                                                                                                        |
| ------------------------------------ | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Probe-cache måler                    | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Sidste legitimations-sundhedsproberesultater opbevares stadig i proceshukommelsen. `source` er altid `probe-cache`.                                                                                                     |
| Oplysninger om mislykket forbindelse | `credentialHealth.failedConnections`                                  | Nuværende** kun når `failed > 0`** . Afgrænset liste over cache-rækker med `status=error` (`connectionId`, `status`, sanitized `lastError` / `lastErrorType`). `failedOmitted` er indstillet, da listen blev begrænset. |
| SQLite klæbrig status                | `credentialHealth.staleDbNonOkCount`                                  | Optælling af** aktiv** (`is_active=1`) forbindelsesrækker, hvis vedvarende `test_status` er en kendt ikke-ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                         |

De to lag kan være uenige med vilje:

- Mål `failed=0` mens `staleDbNonOkCount>0` — SQLite stadig har en sticky `test_status` (for eksempel `expired` eller `credits_exhausted`), at det seneste probe-cache-øjebliksbillede ikke tæller som `status=error`.
- Mål `failed>0` mens SQLite ser sund ud — en nylig probe mislykkedes og er cachelagret; DB rækken er ikke blevet opdateret eller blev senere ryddet.

Alarm ikke kun på `provider_connections.test_status`, når du skraber dette endepunkt. Brug `failed` + `failedConnections` til live-probefejl, og `staleDbNonOkCount` når du har brug for den vedvarende sticky-status-tælling.

### Kubernetes undersøger anbefalinger

OmniRoute er en** enkelt node proces** (én hændelsesløkke). Lager Docker `HEALTHCHECK` mål letvægts `/healthz`. `/api/monitoring/health` er** for tung** for kubelet liveness intervaller.

| sonde           | Anbefalet mål                                                                      | Noter                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Opstart**     | HTTP `GET /healthz` med en lang `failureThreshold` (eller stor `startPeriod`)      | Koldstart + SQLite -migrering kan overstige et par sekunder                                                                                                                                                                                                                                                                             |
| **Beredskab**   | HTTP `GET /healthz`                                                                | Livscyklus `ok` / `starting` / `stopping` (200 vs 503). Flapper stadig, hvis løkken er CPU-blokeret. EN** 200 på flere sekunder er ikke sundt** (#10303) — det betyder, at hændelsesløkken blev udsultet, før 3-byte-handleren kørte                                                                                                    |
| **Livlighed**   | HTTP `GET /livez`,** eller TCP** på hovedtjenesteporten (`PORT`, standard `20128`) | `/livez` er kun proces-levende (altid 200, hvis handleren kører). Den deler stadig begivenhedsløkken — busy ≠ dead, og den registrerer ikke event-loop sult (#10303) bedre end TCP gør. Foretrække**TCP** hvis HTTP -sonderne timeout under catalog/compression belastning; gør** ikke** dræb poden på korte event-loop-båse begge veje |
| **Dyb sundhed** | `GET /api/monitoring/health` fra en ekstern checker                                | Ikke til kubelet `livenessProbe` / stramme `readinessProbe`                                                                                                                                                                                                                                                                             |

Eksempel på form (tilpas tærskler til din koldstart og kompressionsbelastning):

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

**Gør ikke** punkt kubelet** livlighed** på `/api/monitoring/health`. Den vej udfører rigtigt DB/monitoring -arbejde og vil være falsk-positiv under belastning.

Relateret: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (sonder, mens hændelsesløkken er optaget), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (katalogprissvin), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (kompressionstoken-tæller).

### systemd vagthund (frossen hændelsesløkke)

På en systemd-vært fortæller OmniRoute serviceadministratoren, når den er klar, og bliver ved med at pinge den, så en server, hvis hændelsesløkke sidder fast, bliver dræbt og genstartet i stedet for at forblive oppe og stille. Pingene kommer fra serverens egen hændelsesløkke: når den blokerer, stopper de, og systemd genstarter tjenesten, når `WatchdogSec` udløber uden en.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) skriver allerede en brugerenhed med dette. En enhed du selv skriver (standard `Type=simple`) får ingen vagthund, så føj disse linjer til dens `[Service]` sektion:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Den genererede enhed sætter `Restart=on-failure`, så tilføj den linje også — uden den dræber vagthunden kun den fastlåste tjeneste i stedet for at genstarte den.

- `Type=notify`: tjenesten "startes", når serveren sender `READY=1`, ikke når processen gafler. `TimeoutStartSec` begrænser en langsom start.
- `NotifyAccess=all`: Pingene sendes af serverprocessen, som er et barn af `omniroute serve` supervisoren.
- `WatchdogSec`: ping går ud hvert 60. sekund, så brug** 120 eller mere** . Mindre værdier ville genstarte en sund server.
- Kør `omniroute serve` i forgrunden. `--daemon` adskiller serveren fra enhedens cgroup, og underretningshåndtrykket fuldføres aldrig.

Tjek, at den er aktiv efter en genstart:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` viser den konfigurerede forsinkelse, og `WatchdogTimestamp` bevæger sig frem hvert minut. En genstart forårsaget af vagthunden registreres som `Result=watchdog`. Indstil `OMNIROUTE_DISABLE_SD_NOTIFY=1`; uden en `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) sendes intet.

Vagthunden kontrollerer kun, at hændelsesløkken bliver ved med at køre. En server, der er langsom, men stadig drejer, genstartes ikke.

### Valgfri anmodningsstiarbejde (hukommelse, færdigheder, token-opdatering)

Hukommelsesudtrækning, færdighedsindsprøjtning og OAuth token-opdatering deler** hovedknudehændelsesløkke** med `/healthz`. De er dashboard-skift-funktioner (`memoryEnabled`, `skillsEnabled`), ikke en arbejderpulje. Se [miljø — event-loop omkostninger](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Udbyder sundhed

> **Intet REST endepunkt.** Udbyderens helbredsdata er tilgængelige via MCP -værktøjet `observability_snapshot` eller dashboard `/dashboard/providers` siden.

### Udbyderdetaljer

> **Intet REST endepunkt.** Per-udbyder detaljer er tilgængelige via dashboard `/dashboard/providers` siden.

---

## Autopilot for udbydersundhed

Modulet `providerHealthAutopilot.ts` er et **selvhelende system**, der:

1. Registrerer problemer med udbydere (åbent kredsløb, nedkølingsperioder, spærringer og kvoteadvarsler)
2. Genererer **anbefalede handlinger** for at løse dem
3. Kan **udføre handlinger med lav risiko automatisk**

### Registrerede problemtyper

| Problemtype                  | Alvorlighed | Eksempel på betingelse                        |
| ---------------------------- | ----------- | --------------------------------------------- |
| `provider_circuit_open`      | kritisk     | Kredsløbsafbryder åben efter 5 fejl           |
| `provider_circuit_half_open` | advarsel    | Kredsløbet tester genoprettelse               |
| `connection_cooldown`        | advarsel    | Forbindelse i nedkøling efter 429             |
| `stale_connection_error`     | advarsel    | Seneste opdatering fejlede for 30+ min. siden |
| `terminal_connection_error`  | kritisk     | OAuth tilbagekaldt, nøgle ugyldig             |
| `inactive_connection`        | info        | Forbindelse deaktiveret i indstillingerne     |
| `model_lockout`              | advarsel    | Specifik model i karantæne                    |
| `quota_monitor_warning`      | advarsel    | Kvoteforbrug på 80 % eller mere               |

### Genererede handlingstyper

| Handling                       | Risiko | Beskrivelse                            |
| ------------------------------ | ------ | -------------------------------------- |
| `clear_provider_breaker`       | middel | Nulstil kredsløbsafbryderen til lukket |
| `clear_connection_cooldown`    | lav    | Fjern nedkøling fra en forbindelse     |
| `clear_stale_connection_error` | lav    | Ryd markeringen for en forældet fejl   |
| `clear_model_lockout`          | lav    | Genaktivér en model i karantæne        |
| `reactivate_connection`        | middel | Genaktivér en deaktiveret forbindelse  |
| `deactivate_connection`        | høj    | Deaktivér en problematisk forbindelse  |

### API

> **Intet REST-slutpunkt.** Autopilot-problemer er tilgængelige via MCP-værktøjet `observability_snapshot` eller kontrolpanelet. Autopiloten kører internt, og dens adfærd konfigureres via indstillingsdatabasen (feltet `autopilotMode` pr. forbindelse), ikke via miljøvariabler — `grep -rn` efter en miljøvariabel for autopilottilstand giver ingen resultater.

### Autopilottilstand

Autopiloten fungerer som standard i **manuel tilstand** — den registrerer problemer og genererer anbefalede handlinger, men anvender dem ikke automatisk. Handlinger kan anvendes via kontrolpanelet.

---

## Autopilot for kombinationssundhed

`comboHealthAutopilot.ts` er den **kombinationsspecifikke** pendant til udbyderautopiloten. Den:

- Registrerer usunde kombinationer
- Anbefaler omrokering af mål
- Foreslår deaktivering af defekte mål
- Fjerner automatisk døde mål efter N fejl

### Eksempler på kombinationsproblemer

```
Kombinationen "always-on" (prioritetsstrategi)
├─ Mål 1: openai/gpt-5 (sund)
├─ Mål 2: anthropic/claude-opus-4-6 (⚠️ modelspærring indtil kl. 14.00)
└─ Mål 3: kiro/claude-sonnet-4-5 (sund)

Anbefalet handling: Omroker — flyt kiro over anthropic, indtil spærringen udløber
```

---

## Kvotemonitorer

`observability.ts` eksponerer **kvotemonitorer pr. session** for abonnementsudbydere (Claude Code, Codex, GitHub Copilot):

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

### Statusbetydninger

| Status      | Hvornår                           | UI-handling                              |
| ----------- | --------------------------------- | ---------------------------------------- |
| `starting`  | Første forespørgsel er i gang     | Indlæsningsindikator                     |
| `idle`      | Ingen nylig aktivitet             | Skjult fra kontrolpanelet                |
| `healthy`   | Mere end 50 % af kvoten tilbage   | Grøn prik                                |
| `warning`   | Mindre end 50 % af kvoten tilbage | Gul advarsel                             |
| `exhausted` | Kvote = 0 %                       | Rød blokering, dirigér til næste udbyder |
| `error`     | Forespørgsel mislykkedes          | Rød prik, prøv snart igen                |

### API

> **Intet REST-slutpunkt.** Kvotemonitordata er tilgængelige via MCP-værktøjet `observability_snapshot` eller kontrolpanelet.

---

## Observabilitetsøjebliksbillede

MCP-værktøjet `observability_snapshot` returnerer et **komplet systemøjebliksbillede** til AI-agenter:

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
  "quotaMonitors": {/* se ovenfor */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agenter bruger dette til at træffe **routingbeslutninger** — for eksempel: "Hvis openai-kredsløbet er åbent, skal der først routes til anthropic".

---

## Kontrol af tokenstatus

OAuth-udbydere (Claude Code, GitHub Copilot, Cursor) kræver **periodisk tokenfornyelse**. `src/lib/tokenHealthCheck.ts` kører en planlægger i baggrunden:

- **Gennemgangstik**: hvert 60. sekund (gennemgang i `TICK_MS = 60 * 1000` ved `src/lib/tokenHealthCheck.ts:30`)
- **Interval for statuskontrol pr. forbindelse**: som standard 60 minutter (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); kan konfigureres via indstillingsdatabasen
- **Forebyggende fornyelse ved 401**: håndteres af interceptoren for den enkelte forbindelse

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

Konfigurationen af kontrol af tokenstatus håndteres internt af `tokenHealthCheck.ts`.

### Tokenstatus

> **Intet REST-slutpunkt.** Data om tokenstatus er tilgængelige via dashboardet eller MCP-værktøjet `observability_snapshot`.

---

## Alarmering

### Indbyggede kanaler

OmniRoute understøtter **3 alarmkanaler**:

| Kanal           | Opsætning       | Anvendelse                     |
| --------------- | --------------- | ------------------------------ |
| Dashboardbanner | Altid aktiveret | Notifikationer i applikationen |
| Webhook         | Konfigurer URL  | Slack, Discord, PagerDuty      |
| Log             | Standard        | Til ekstern logaggregering     |

### Webhook-konfiguration

> **Bemærk:** Konfiguration af webhook-alarmering håndteres via siden Indstillinger i dashboardet. Se brugergrænsefladen for Indstillinger for webhook-URL, hændelsesfiltrering og tilpasning af payload.

### Alarmtyper

| Alarm                        | Hvornår                                        | Standardalvorlighed |
| ---------------------------- | ---------------------------------------------- | ------------------- |
| `provider_circuit_open`      | Kredsløbet åbnes                               | kritisk             |
| `provider_circuit_half_open` | Kredsløbet tester genoprettelse                | info                |
| `quota_warning`              | Kvoten er på 80 % eller derover                | advarsel            |
| `quota_exhausted`            | Kvoten er på 100 %                             | kritisk             |
| `token_refresh_failed`       | 3+ fortløbende fornyelsesfejl                  | advarsel            |
| `token_expired`              | Tokenets udløbstid er overskredet              | kritisk             |
| `combo_target_unhealthy`     | Kombinationsmålet har været i nedkøling i 1 t+ | advarsel            |
| `db_integrity_warning`       | FK-overtrædelser > 0                           | advarsel            |
| `heap_pressure`              | Heap-forbrug > 80 % af tærsklen                | advarsel            |

---

## Ydelsesmålinger

### Sporede målinger

| Måling                  | Type      | Kilde                           |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | tæller    | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | tæller    | `services/usage.ts`             |
| `cost_usd`              | tæller    | `services/usage.ts`             |
| `provider_errors`       | tæller    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | tæller    | `services/resilience.ts`        |
| `cache_hits`            | tæller    | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | måler     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | måler     | `observability.ts`              |

### Latenspercentiler (p50/p95/p99)

> **Intet REST-slutpunkt.** Data om latenspercentiler er tilgængelige via dashboardsiden `/dashboard/health`. Eksport til Prometheus/OpenTelemetry er planlagt til v3.9.

### Eksport til Prometheus/OpenTelemetry (fase 2)

Planlagt til v3.9: indbygget eksport til Prometheus, OpenTelemetry og Datadog.

Indtil videre kan `/api/monitoring/health` hentes med ethvert HTTP-baseret overvågningssystem (Prometheus blackbox exporter, Datadog HTTP check osv.).

---

## Opskrifter til alarmering

### Slack

> **Bemærk:** Webhook-alarmering konfigureres via siden Settings i dashboardet — der findes ingen dedikerede webhook-miljøvariabler (`grep -rn` returnerer ingen resultater). Se brugergrænsefladen under Settings for webhook-URL, hændelsesfiltrering og tilpasning af payload.

### Discord

> Webhook-alarmering bruger samme arbejdsgang i brugergrænsefladen under Settings som Slack. Discord accepterer samme JSON-payloadformat.

### PagerDuty

> Webhook-alarmering bruger samme arbejdsgang i brugergrænsefladen under Settings. Routingnøgler til PagerDuty Events API v2 konfigureres i brugergrænsefladen under Settings.

### Brugerdefineret webhook (JSON)

> Ethvert HTTP-slutpunkt, der accepterer POST med en JSON-body, kan bruges. Konfigurer URL'en i brugergrænsefladen under Settings.

---

## Konfiguration af dashboardet

### Tilpas sundhedsdashboardet

Opret en `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Fastgør en udbyder øverst

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Fejlfinding

### "Udbyderen angiver, at den er sund, men anmodninger mislykkes"

1. Kontrollér **autopilot-problemerne** — en model er måske blevet låst ude
2. Se under **seneste fejl** efter den specifikke fejlklasse
3. Prøv **forbindelsestesten** på udbyderkortet
4. Kontrollér, om udbyderen er **hastighedsbegrænset hos upstream-udbyderen** (ikke synligt lokalt)

### "Kvoten angives som sund, men jeg ser 429-fejl"

- 429 betyder, at udbyderen angiver, at du har opbrugt din kvote
- OmniRoutes kvotesporing kan være **forældet** — udbyderens oplysninger hos upstream-udbyderen er autoritative
- Kvotedata opdateres automatisk via den interne kvoteovervågning

### "Kombinationen fejler, men alle mål ser sunde ud"

- Kontrollér dashboardet for **kombinationssundhed** for problemer med målenes rækkefølge
- Se på **fallback-hændelser** — kombinationen opbruger måske sine muligheder for hurtigt
- Kontrollér, at **strategien** passer til dit anvendelsestilfælde (prioritet kontra round-robin kontra automatisk)

### "Databasens sundhedskontrol mislykkes"

- Kør `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Hvis resultatet er "ok" — falsk alarm; sundhedskontrollen er for streng
- Hvis resultatet er noget andet — **stop OmniRoute**, og følg [vejledningen til katastrofeberedskab](./DATABASE_GUIDE.md#disaster-recovery)

### "Presset på memory heap er kritisk"

```bash
# Kontrollér den aktuelle heap
node -e "console.log(process.memoryUsage())"

# Udløs manuel GC (hvis --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Reducer antallet af samtidige anmodninger (indstil via siden Settings i dashboardet, ikke via en miljøvariabel)
# Der findes ingen `MAX_CONCURRENT_REQUESTS`-miljøvariabel — konfigurer det under Settings → Concurrency.
```

---

## Se også

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — sporing af forbrug og omkostninger
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — databaseskema og sundhedstilstand
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxyens sundhedstilstand (separat cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — systemarkitektur
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — detaljer om circuit breaker
- Kilde: `src/lib/monitoring/` (4 filer, 2121 kodelinjer)
