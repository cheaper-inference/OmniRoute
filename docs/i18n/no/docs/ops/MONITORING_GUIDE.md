# Monitoring & Observability Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Kort fortalt**: OmniRoute leveres med innebygd tilstandsovervåking, autopilot for leverandører, kvotesporing og observerbarhetsintegrasjoner. Denne veiledningen dekker kontrollpanelet, varsler og feilsøking.

**Kilder:**

- `src/lib/monitoring/observability.ts` — øyeblikksbilde av observerbarhet
- `src/lib/monitoring/comboHealthAutopilot.ts` — tilstandsautopilot for kombinasjoner
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot for leverandører
- `src/lib/monitoring/providerHealthMatrix.ts` — tilstandsmatrise for leverandører
- `src/lib/localHealthCheck.ts` — lokal tilstandskontroll
- `src/lib/tokenHealthCheck.ts` — tilstand for tokenfornyelse
- `src/lib/proxyHealth.ts` — tilstandsbuffer for proxy (dekkes i PROXY_GUIDE.md)

---

## Oversikt

OmniRoute har **3 lag med overvåking**:

```
┌──────────────────────────────────────────────────────────────┐
│  Lag 1: Systemtilstand (servernivå)                           │
│  ├─ localHealthCheck.ts — database, porter, systemavhengigheter│
│  ├─ db/healthCheck.ts — integritet, FK, foreldreløse artefakter│
│  └─ Kontrollpanel: /dashboard/health                          │
├──────────────────────────────────────────────────────────────┤
│  Lag 2: Leverandørtilstand (robusthet per leverandør)         │
│  ├─ providerHealthAutopilot.ts — effektbryter, ventetider     │
│  ├─ providerHealthMatrix.ts — tilstandspoeng per leverandør/modell│
│  └─ Kontrollpanel: /dashboard/providers                       │
├──────────────────────────────────────────────────────────────┤
│  Lag 3: Sanntidsobserverbarhet (øyeblikksbilder under kjøring)│
│  ├─ observability.ts — effektbrytere, økter, kvote            │
│  ├─ tokenHealthCheck.ts — tilstand for OAuth-tokenfornyelse   │
│  └─ MCP-verktøy: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Kontrollpanelsider

### `/dashboard/health` (Systemtilstand)

Det overordnede tilstandskontrollpanelet viser:

| Del                      | Hva den viser                                             |
| ------------------------ | --------------------------------------------------------- |
| **Serverstatus**         | Oppetid, versjon, port, aktive tilkoblinger               |
| **Database**             | Tilkobling, integritet, WAL-størrelse, nylige migreringer |
| **Leverandørsammendrag** | Antall aktive, antall friske, antall åpne effektbrytere   |
| **Kvoteovervåkere**      | Aktive økter, varsler, oppbrukte kvoter                   |
| **Nylige feil**          | De siste 10 feilene med stakkspor                         |
| **Ressursbruk**          | Minne, prosessor, indikator for heap-belastning           |

### `/dashboard/providers` (Leverandørtilstand)

Kontrollpanel per leverandør:

| Kolonne      | Beskrivelse                                      |
| ------------ | ------------------------------------------------ |
| Leverandør   | Leverandør-ID + visningsnavn                     |
| Tilstand     | Grønn/gul/rød status                             |
| Effektbryter | Åpen/lukket/halvåpen tilstand                    |
| Tilkoblinger | Antall tilkoblinger, siste oppdatering           |
| Modeller     | Tilgjengelige modeller, tilstand per modell      |
| Kostnad      | Dagens kostnad, 7-dagers trend                   |
| Feil         | Antall feil siste 24 timer, vanligste feilklasse |

Klikk på en leverandør for å se:

- Nylige forespørsler med fordeling av forsinkelse
- Tilstandspoeng per tilkobling
- Sperringer per modell
- Anbefalinger fra autopiloten

### `/dashboard/quota` (Kvotesporing)

For hver API-nøkkel:

- Gjeldende bruk sammenlignet med grensen (fremdriftslinje)
- Kvotetrend (30-dagers diagram)
- Tidspunkt for neste nullstilling
- Varselhistorikk

### `/dashboard/combos` (Kombinasjonstilstand)

Per kombinasjon:

- Strategi + mål
- Tilstand per mål
- Nylige reservehendelser
- Suksessrate (24 t, 7 d, 30 d)

---

## Helsesjekk API

OmniRoute avslører** to** HTTP helseflater. De er ikke utskiftbare for orkestratorer.

| Sti                          | Hensikt                                                               | Vekt                               | Bruk for                                                           |
| ---------------------------- | --------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------ |
| `GET /healthz`               | Livssyklus liveness/readiness (`ok` / `starting` / `stopping`)        | Trivielt (kun faseflagg)           | Kubernetes** beredskap** ; myk** livlighet** hvis du må bruke HTTP |
| `GET /api/monitoring/health` | Deep system + -leverandørsammendrag (DB, heap, katalogtellinger, ...) | Tung (sync DB / overvåkingsarbeid) | Dashboards, blackbox dype sjekker, Docker innebygde helsesjekk     |

> **Note:** Leverandørhelsematriser, autopilotproblemer, kvotemonitorer, tokenhelse og latensdetaljer utover `/api/monitoring/health` er tilgjengelig via**MCP verktøy** `observability_snapshot` eller** dashbord** sider — det er ingen dedikerte REST -ruter for disse.

Begge rutene går på** samme Node-hendelsesløkke** som forespørselshåndtering. En CPU-bundet bane (stort `GET /v1/models` -katalogarbeid, langkontekstkomprimering / tokentelling) kan forsinke** alle** HTTP behandlere, inkludert `/healthz`. Event-loop opptatt ≠ prosess er død. Foretrekker å fikse grisen; sondeinnstilling reduserer bare falske drepinger.

### Lett orkestratorsonde

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` når serverens livssyklusfase er klar
- **503** + `starting` / `stopping` under oppstart eller avslutning
- Implementering: `src/app/healthz/route.ts` (ingen DB -ping)

### Systemhelse (dyp)

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

`GET /api/monitoring/health` → `credentialHealth` er** probe-cache-måler i minnet** , ikke en live dump av `provider_connections.test_status`. Etter #12532 leser forespørselsbanen kun `getCachedCredentialHealthSummary()` ; bakgrunnsprober oppdaterer hurtigbufferen fra hendelsessløyfen.

| Lag                         | Hvor                                                                  | Hva det betyr                                                                                                                                                                                                    |
| --------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Probe-cache-måler           | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Resultatene fra siste legitimasjon-helseprobe er fortsatt lagret i prosessminnet. `source` er alltid `probe-cache`.                                                                                              |
| Mislykket tilkoblingsdetalj | `credentialHealth.failedConnections`                                  | Nåværende** bare når `failed > 0`** . Avgrenset liste over cache-rader med `status=error` (`connectionId`, `status`, sanitized `lastError` / `lastErrorType`). `failedOmitted` er satt når listen ble begrenset. |
| SQLite klissete status      | `credentialHealth.staleDbNonOkCount`                                  | Antall av** aktiv** (`is_active=1`) tilkoblingsrader hvis vedvarende `test_status` er en kjent ikke-ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                        |

De to lagene kan være uenige med vilje:

- Mål `failed=0` mens `staleDbNonOkCount>0` — SQLite fortsatt har en klebrig `test_status` (for eksempel `expired` eller `credits_exhausted`) som det siste probe-cache øyeblikksbildet ikke teller som `status=error`.
- Mål `failed>0` mens SQLite ser frisk ut — en nylig sonde mislyktes og er bufret; DB raden har ikke blitt oppdatert, eller ble senere slettet.

Ikke varsle bare på `provider_connections.test_status` når du skraper dette endepunktet. Bruk `failed` + `failedConnections` for live-probefeil, og `staleDbNonOkCount` når du trenger den vedvarende sticky-status-tellingen.

### Kubernetes undersøker anbefalinger

OmniRoute er en** enkelt node prosess** (én hendelsesløkke). Aksje Docker `HEALTHCHECK` mål for lett `/healthz`. `/api/monitoring/health` er** for tung** for kubelet liveness intervaller.

| Probe         | Anbefalt mål                                                                       | Notater                                                                                                                                                                                                                                                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Oppstart**  | HTTP `GET /healthz` med en lang `failureThreshold` (eller stor `startPeriod`)      | Kaldstart + SQLite -migrering kan overstige noen få sekunder                                                                                                                                                                                                                                                                                 |
| **Beredskap** | HTTP `GET /healthz`                                                                | Livssyklus `ok` / `starting` / `stopping` (200 vs 503). Klaffer fortsatt hvis løkken er CPU-blokkert. EN** 200 på flere sekunder er ikke sunt** (#10303) — det betyr at hendelsesløkken ble sultet før 3-byte-behandleren kjørte                                                                                                             |
| **Livlighet** | HTTP `GET /livez`,** eller TCP** på hovedtjenesteporten (`PORT`, standard `20128`) | `/livez` er kun prosess-levende (alltid 200 hvis behandleren kjører). Den deler fortsatt hendelsessløyfen — busy ≠ dead, og den oppdager ikke event-loop sult (#10303) noe bedre enn TCP gjør. Foretrekker**TCP** hvis HTTP probene går ut under catalog/compression belastning; gjøre** ikke** drep poden på korte event-loop-boder uansett |
| **Dyp helse** | `GET /api/monitoring/health` fra en ekstern kontrollør                             | Ikke for kubelet `livenessProbe` / tight `readinessProbe`                                                                                                                                                                                                                                                                                    |

Eksempelform (juster terskler til kaldstart- og kompresjonsbelastningen):

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

**Ikke gjør det** punkt kubelet** livlighet** på `/api/monitoring/health`. Den banen gjør virkelig DB/monitoring -arbeid og vil være falsk-positiv under belastning.

Relatert: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (sonder mens hendelsessløyfen er opptatt), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (katalogprissvin), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (kompresjonstoken-count hog).

### systemd watchdog (frossen hendelsesløkke)

På en systemd-vert forteller OmniRoute servicelederen når den er klar og fortsetter å pinge den, så en server hvis hendelsessløyfe sitter fast blir drept og startet på nytt i stedet for å være oppe og stille. Pingene kommer fra serverens egen hendelsesløkke: når den blokkerer, stopper de, og systemd starter tjenesten på nytt når `WatchdogSec` går uten en.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) skriver allerede en brukerenhet med dette. En enhet du skriver selv (standard `Type=simple`) får ingen vakthund, så legg til disse linjene i `[Service]` delen:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Den genererte enheten setter `Restart=on-failure`, så legg til den linjen også — uten den dreper vakthunden bare den fastlåste tjenesten i stedet for å starte den på nytt.

- `Type=notify`: tjenesten "startes" når serveren sender `READY=1`, ikke når prosessen deler seg. `TimeoutStartSec` setter en treg start.
- `NotifyAccess=all`: Pingene sendes av serverprosessen, som er et barn av `omniroute serve` veilederen.
- `WatchdogSec`: ping går ut hvert 60. sekund, så bruk** 120 eller mer** . Mindre verdier vil starte en sunn server på nytt.
- Kjør `omniroute serve` i forgrunnen. `--daemon` kobler serveren fra enhetens cgroup og varslingshåndtrykket fullføres aldri.

Sjekk at den er aktiv etter omstart:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` viser den konfigurerte forsinkelsen og `WatchdogTimestamp` går fremover hvert minutt. En omstart forårsaket av vakthunden registreres som `Result=watchdog`. For å slå av pingene mens du beholder enheten som den er, sett `OMNIROUTE_DISABLE_SD_NOTIFY=1`; uten en `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) sendes ingenting.

Vakthunden sjekker bare at hendelsessløyfen fortsetter å kjøre. En server som er treg, men som fortsatt snur, startes ikke på nytt.

### Valgfri forespørselsbanearbeid (minne, ferdigheter, token-oppdatering)

Minneutvinning, ferdighetsinjeksjon og OAuth -token-oppdatering deler** hovednodehendelsesløkke** med `/healthz`. De er dashbord-vekslefunksjoner (`memoryEnabled`, `skillsEnabled`), ikke en arbeidergruppe. Se [miljø — event-loop kostnad](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Leverandørhelse

> **Ingen REST endepunkt.** Leverandørhelsedata er tilgjengelig via MCP -verktøyet `observability_snapshot` eller `/dashboard/providers` -siden for dashbordet.

### Leverandørdetaljer

> **Ingen REST endepunkt.** Detaljer per leverandør er tilgjengelig via `/dashboard/providers` siden for dashbordet.

---

## Autopilot for leverandørhelse

Modulen `providerHealthAutopilot.ts` er et **selvhelbredende system** som:

1. Oppdager leverandørproblemer (åpen kretsbryter, nedkjølingsperioder, sperringer, kvotevarsler)
2. Genererer **anbefalte handlinger** for å løse dem
3. Kan **utføre handlinger med lav risiko automatisk**

### Oppdagede problemtyper

| Problemtype                  | Alvorlighetsgrad | Eksempel på tilstand                       |
| ---------------------------- | ---------------- | ------------------------------------------ |
| `provider_circuit_open`      | kritisk          | Kretsbryter åpen etter 5 feil              |
| `provider_circuit_half_open` | advarsel         | Kretsen tester gjenoppretting              |
| `connection_cooldown`        | advarsel         | Tilkobling i nedkjøling etter 429          |
| `stale_connection_error`     | advarsel         | Siste oppdatering feilet for 30+ min siden |
| `terminal_connection_error`  | kritisk          | OAuth tilbakekalt, ugyldig nøkkel          |
| `inactive_connection`        | info             | Tilkobling deaktivert i innstillingene     |
| `model_lockout`              | advarsel         | Bestemt modell i karantene                 |
| `quota_monitor_warning`      | advarsel         | Kvotebruk på 80 % eller mer                |

### Genererte handlingstyper

| Handling                       | Risiko  | Beskrivelse                              |
| ------------------------------ | ------- | ---------------------------------------- |
| `clear_provider_breaker`       | middels | Tilbakestill kretsbryteren til lukket    |
| `clear_connection_cooldown`    | lav     | Fjern nedkjølingen fra en tilkobling     |
| `clear_stale_connection_error` | lav     | Fjern flagget for foreldet feil          |
| `clear_model_lockout`          | lav     | Aktiver en modell i karantene på nytt    |
| `reactivate_connection`        | middels | Aktiver en deaktivert tilkobling på nytt |
| `deactivate_connection`        | høy     | Deaktiver en problematisk tilkobling     |

### API

> **Ingen REST-endepunkt.** Autopilot-problemer er tilgjengelige via MCP-verktøyet `observability_snapshot` eller kontrollpanelet. Autopiloten kjører internt. Virkemåten konfigureres via innstillingsdatabasen (`autopilotMode`-feltet per tilkobling), ikke miljøvariabler — `grep -rn` etter en miljøvariabel for autopilotmodus gir ingen treff.

### Autopilotmodus

Autopiloten kjører som standard i **manuell modus** — den oppdager problemer og genererer anbefalte handlinger, men bruker dem ikke automatisk. Handlinger kan utføres via kontrollpanelet.

---

## Autopilot for kombinasjonshelse

`comboHealthAutopilot.ts` er den **kombinasjonsspesifikke** motsvarigheten til leverandørautopiloten. Den:

- Oppdager kombinasjoner med dårlig helsetilstand
- Anbefaler ny rekkefølge for mål
- Foreslår å deaktivere defekte mål
- Fjerner utilgjengelige mål automatisk etter N feil

### Eksempler på kombinasjonsproblemer

```
Kombinasjon "always-on" (prioritetsstrategi)
├─ Mål 1: openai/gpt-5 (frisk)
├─ Mål 2: anthropic/claude-opus-4-6 (⚠️ modell sperret frem til 14:00)
└─ Mål 3: kiro/claude-sonnet-4-5 (frisk)

Anbefalt handling: Endre rekkefølgen — flytt kiro over anthropic frem til sperringen utløper
```

---

## Kvotemonitorer

`observability.ts` eksponerer **kvotemonitorer per økt** for abonnementsleverandører (Claude Code, Codex, GitHub Copilot):

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

### Betydning av statuser

| Status      | Når                                | Handling i brukergrensesnittet      |
| ----------- | ---------------------------------- | ----------------------------------- |
| `starting`  | Første kontroll pågår              | Lasteindikator                      |
| `idle`      | Ingen nylig aktivitet              | Skjult fra kontrollpanelet          |
| `healthy`   | Mer enn 50 % av kvoten gjenstår    | Grønn prikk                         |
| `warning`   | Mindre enn 50 % av kvoten gjenstår | Gult varsel                         |
| `exhausted` | Kvoten er 0 %                      | Rød blokk, rut til neste leverandør |
| `error`     | Kontroll mislyktes                 | Rød prikk, prøv igjen snart         |

### API

> **Ingen REST-endepunkt.** Data fra kvotemonitoren er tilgjengelige via MCP-verktøyet `observability_snapshot` eller kontrollpanelet.

---

## Observerbarhetsøyeblikksbilde

MCP-verktøyet `observability_snapshot` returnerer et **fullstendig systemøyeblikksbilde** for AI-agenter:

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

Agenter bruker dette til å ta **rutingsbeslutninger** – for eksempel «hvis kretsen til openai er åpen, rut først til anthropic».

---

## Kontroll av tokenhelse

OAuth-leverandører (Claude Code, GitHub Copilot, Cursor) trenger **periodisk tokenoppdatering**. `src/lib/tokenHealthCheck.ts` kjører en bakgrunnsplanlegger:

- **Kontrollsyklus**: hvert 60. sekund (kontroll i `TICK_MS = 60 * 1000` i `src/lib/tokenHealthCheck.ts:30`)
- **Intervall for helsekontroll per tilkobling**: standardverdien er 60 minutter (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); kan konfigureres via innstillingsdatabasen
- **Proaktiv oppdatering ved 401**: håndteres av interceptoren for hver tilkobling

### Status for tokenhelse

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

### Konfigurasjon

Konfigurasjonen av kontrollen for tokenhelse håndteres internt av `tokenHealthCheck.ts`.

### Tokenhelse

> **Ingen REST-endepunkt.** Data om tokenhelse er tilgjengelig via kontrollpanelet eller MCP-verktøyet `observability_snapshot`.

---

## Varsling

### Innebygde kanaler

OmniRoute støtter **3 varslingskanaler**:

| Kanal               | Oppsett         | Bruksområde                 |
| ------------------- | --------------- | --------------------------- |
| Kontrollpanelbanner | Alltid aktivert | Varsler i appen             |
| Webhook             | Konfigurer URL  | Slack, Discord, PagerDuty   |
| Logg                | Standard        | For ekstern loggaggregering |

### Webhook-konfigurasjon

> **Merk:** Konfigurasjon av webhook-varsling håndteres via Innstillinger-siden i kontrollpanelet. Se innstillingsgrensesnittet for webhook-URL, hendelsesfiltrering og tilpasning av nyttelast.

### Varseltyper

| Varsel                       | Når                                                     | Standard alvorlighetsgrad |
| ---------------------------- | ------------------------------------------------------- | ------------------------- |
| `provider_circuit_open`      | Kretsen åpnes                                           | kritisk                   |
| `provider_circuit_half_open` | Kretsen tester gjenoppretting                           | informasjon               |
| `quota_warning`              | Kvoten er på 80 % eller mer                             | advarsel                  |
| `quota_exhausted`            | Kvoten er på 100 %                                      | kritisk                   |
| `token_refresh_failed`       | 3 eller flere påfølgende oppdateringsfeil               | advarsel                  |
| `token_expired`              | Tokenet har utløpt                                      | kritisk                   |
| `combo_target_unhealthy`     | Kombinasjonsmålet har vært i nedkjøling i 1 t eller mer | advarsel                  |
| `db_integrity_warning`       | FK-brudd > 0                                            | advarsel                  |
| `heap_pressure`              | Heap-bruk > 80 % av terskelen                           | advarsel                  |

---

## Ytelsesmålinger

### Sporede målinger

| Måling                  | Type      | Kilde                           |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | teller    | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | teller    | `services/usage.ts`             |
| `cost_usd`              | teller    | `services/usage.ts`             |
| `provider_errors`       | teller    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | teller    | `services/resilience.ts`        |
| `cache_hits`            | teller    | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | måler     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | måler     | `observability.ts`              |

### Latenspersentiler (p50/p95/p99)

> **Ingen REST-endepunkt.** Data om latenspersentiler er tilgjengelig via dashboardsiden `/dashboard/health`. Eksport til Prometheus/OpenTelemetry er planlagt for v3.9.

### Prometheus-/OpenTelemetry-eksport (fase 2)

Planlagt for v3.9: innebygd eksport til Prometheus, OpenTelemetry og Datadog.

Foreløpig kan `/api/monitoring/health` hentes av et hvilket som helst HTTP-basert overvåkingssystem (Prometheus blackbox exporter, Datadog HTTP check osv.).

---

## Oppskrifter for varsling

### Slack

> **Merk:** Webhook-varsling konfigureres via Innstillinger-siden i dashboardet – det finnes ingen dedikerte webhook-miljøvariabler (`grep -rn` gir null treff). Se brukergrensesnittet for Innstillinger for webhook-URL, hendelsesfiltrering og tilpasning av nyttelast.

### Discord

> Webhook-varsling bruker samme konfigurasjonsflyt i brukergrensesnittet for Innstillinger som Slack. Discord godtar samme format på JSON-nyttelasten.

### PagerDuty

> Webhook-varsling bruker samme konfigurasjonsflyt i brukergrensesnittet for Innstillinger. Rutingsnøkler for PagerDuty Events API v2 konfigureres i brukergrensesnittet for Innstillinger.

### Egendefinert webhook (JSON)

> Alle HTTP-endepunkter som godtar POST med JSON i forespørselskroppen, vil fungere. Konfigurer URL-en i brukergrensesnittet for Innstillinger.

---

## Konfigurasjon av dashboardet

### Tilpass helsedashboardet

Opprett `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Fest en leverandør øverst

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Feilsøking

### «Leverandøren sier at tilstanden er god, men forespørsler mislykkes»

1. Kontroller **autopilot-problemene** – kanskje en modell er sperret
2. Se på **nylige feil** for den spesifikke feilklassen
3. Prøv **tilkoblingstesten** i leverandørkortet
4. Kontroller om leverandøren er **hastighetsbegrenset oppstrøms** (ikke synlig lokalt)

### «Kvoten sier at tilstanden er god, men jeg ser 429-feil»

- 429 betyr at leverandøren sier at du har brukt opp kvoten din
- OmniRoutes kvotesporing kan være **utdatert** – leverandørens data oppstrøms er fasiten
- Kvotedata oppdateres automatisk via den interne kvotemonitoren

### «Kombinasjonen mislykkes, men alle målene ser ut til å ha god tilstand»

- Sjekk dashboardet for **kombinasjonstilstand** for problemer med målrekkefølgen
- Se på **reservehendelser** – kanskje kombinasjonen bruker opp alternativene for raskt
- Kontroller at **strategien** passer til bruksområdet ditt (prioritet kontra round-robin kontra automatisk)

### «Tilstandskontrollen for databasen mislykkes»

- Kjør `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Hvis resultatet er «ok» – falsk alarm; tilstandskontrollen er for streng
- Hvis resultatet er noe annet – **stopp OmniRoute** og følg [veiledningen for katastrofegjenoppretting](./DATABASE_GUIDE.md#disaster-recovery)

### «Minneheap-belastningen er kritisk»

```bash
# Kontroller gjeldende heap
node -e "console.log(process.memoryUsage())"

# Utløs manuell GC (hvis --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Reduser antallet samtidige forespørsler (angi dette via Innstillinger-siden i dashboardet, ikke en miljøvariabel)
# Det finnes ingen `MAX_CONCURRENT_REQUESTS`-miljøvariabel – konfigurer dette under Innstillinger → Samtidighet.
```

---

## Se også

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — sporing av bruk og kostnader
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — databaseskjema og -helse
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy-helse (separat hurtigbuffer)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — systemarkitektur
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — detaljer om kretsbryter
- Kilde: `src/lib/monitoring/` (4 filer, 2121 kodelinjer)
