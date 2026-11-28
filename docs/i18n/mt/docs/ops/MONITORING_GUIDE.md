# Monitoring & Observability Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Fil-qosor**: OmniRoute jiġi b’monitoraġġ tas-saħħa integrat, pilota awtomatiku għall-fornituri, traċċar tal-kwoti, u punti ta’ integrazzjoni għall-osservabbiltà. Din il-gwida tkopri l-pannell, it-twissijiet, u s-soluzzjoni tal-problemi.

**Sorsi:**

- `src/lib/monitoring/observability.ts` — stampa tal-osservabbiltà
- `src/lib/monitoring/comboHealthAutopilot.ts` — pilota awtomatiku għas-saħħa tal-combo
- `src/lib/monitoring/providerHealthAutopilot.ts` — pilota awtomatiku għall-fornitur
- `src/lib/monitoring/providerHealthMatrix.ts` — matriċi tas-saħħa tal-fornituri
- `src/lib/localHealthCheck.ts` — kontroll lokali tas-saħħa
- `src/lib/tokenHealthCheck.ts` — saħħa tat-tiġdid tat-token
- `src/lib/proxyHealth.ts` — cache tas-saħħa tal-proxy (koperta fi PROXY_GUIDE.md)

---

## Ħarsa ġenerali

OmniRoute għandu **3 saffi ta’ monitoraġġ**:

```
┌──────────────────────────────────────────────────────────────┐
│  Saff 1: Saħħa tas-Sistema (fil-livell tas-server)            │
│  ├─ localHealthCheck.ts — DB, ports, dipendenzi nattivi       │
│  ├─ db/healthCheck.ts — integrità, FK, artefatti orfni        │
│  └─ Pannell: /dashboard/health                                │
├──────────────────────────────────────────────────────────────┤
│  Saff 2: Saħħa tal-Fornitur (reżiljenza għal kull fornitur)   │
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldowns   │
│  ├─ providerHealthMatrix.ts — punteġġi skont fornitur/mudell  │
│  └─ Pannell: /dashboard/providers                             │
├──────────────────────────────────────────────────────────────┤
│  Saff 3: Osservabbiltà Diretta (stampi waqt l-eżekuzzjoni)    │
│  ├─ observability.ts — circuit breakers, sessjonijiet, kwota  │
│  ├─ tokenHealthCheck.ts — saħħa tat-tiġdid tat-token OAuth    │
│  └─ Għodod MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Paġni tal-Pannell

### `/dashboard/health` (Saħħa tas-Sistema)

Il-pannell ewlieni tas-saħħa juri:

| Taqsima                    | X’juri                                                        |
| -------------------------- | ------------------------------------------------------------- |
| **Status tas-server**      | Ħin ta’ tħaddim, verżjoni, port, konnessjonijiet attivi       |
| **Bażi tad-data**          | Konnessjoni, integrità, daqs tal-WAL, migrazzjonijiet reċenti |
| **Sommarju tal-fornituri** | Għadd attiv, għadd f’saħħtu, għadd ta’ breakers miftuħa       |
| **Monitors tal-kwota**     | Sessjonijiet attivi, twissijiet, kwota eżawrita               |
| **Żbalji reċenti**         | L-aħħar 10 żbalji bi traċċi tal-munzell                       |
| **Użu tar-riżorsi**        | Memorja, CPU, indikatur tal-pressjoni tal-heap                |

### `/dashboard/providers` (Saħħa tal-Fornituri)

Pannell għal kull fornitur:

| Kolonna         | Deskrizzjoni                                                         |
| --------------- | -------------------------------------------------------------------- |
| Fornitur        | ID tal-fornitur + isem muri                                          |
| Saħħa           | Status aħdar/isfar/aħmar                                             |
| Circuit         | Stat miftuħ/magħluq/nofs miftuħ                                      |
| Konnessjonijiet | Għadd ta’ konnessjonijiet, l-aħħar tiġdid                            |
| Mudelli         | Mudelli disponibbli, saħħa għal kull mudell                          |
| Spiża           | L-ispiża tal-lum, xejra ta’ 7 ijiem                                  |
| Żbalji          | Għadd ta’ żbalji fl-aħħar 24 siegħa, l-aktar klassi ta’ żball komuni |

Ikklikkja fuq fornitur biex tara:

- Talbiet reċenti b’analiżi dettaljata tal-latenza
- Punteġġi tas-saħħa għal kull konnessjoni
- Imblukkar għal kull mudell
- Rakkomandazzjonijiet tal-pilota awtomatiku

### `/dashboard/quota` (Traċċar tal-Kwota)

Għal kull API key:

- Użu attwali mqabbel mal-limitu (strixxa tal-progress)
- Xejra tal-kwota (grafika ta’ 30 jum)
- Ħin tar-reset li jmiss
- Storja tat-twissijiet

### `/dashboard/combos` (Saħħa tal-Combo)

Għal kull combo:

- Strateġija + miri
- Saħħa għal kull mira
- Avvenimenti reċenti ta’ fallback
- Rata ta’ suċċess (24 siegħa, 7 ijiem, 30 jum)

---

## Health Check API

OmniRoute jesponi** tnejn** uċuħ tas-saħħa HTTP. Mhumiex interkambjabbli għall-orkestraturi.

| Mogħdija                     | Għan                                                                             | Piż                                                 | Uża għal                                                        |
| ---------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------- |
| `GET /healthz`               | Lifecycle liveness/readiness (`ok` / `starting` / `stopping`)                    | Trivjali (bandiera tal-fażi biss)                   | Kubernetes** prontezza** ; artab** ħajja** jekk trid tuża HTTP  |
| `GET /api/monitoring/health` | Sommarju tal-fornitur + tas-sistema profonda (DB, borġ, għadd ta' katalogu, ...) | Tqil (sinkronizzazzjoni DB / xogħol ta' monitoraġġ) | Dashboards, blackbox deep checks, Docker's built-in healthcheck |

> **Nota:** Il-matriċi tas-saħħa tal-fornitur, il-kwistjonijiet tal-awtopilota, il-monitors tal-kwoti, is-saħħa tat-tokens, u d-dettall tal-latency lil hinn minn `/api/monitoring/health` huma disponibbli permezz tal-** għodda MCP** `observability_snapshot` jew il** dashboard** paġni — m'hemmx rotot REST apposta għal dawk.

Iż-żewġ rotot jimxu fuq il-** istess linja ta 'avveniment Node** bħala trattament tat-talba. Mogħdija marbuta mas-CPU (xogħol ta' katalogu `GET /v1/models` kbir, kompressjoni ta' kuntest twil / għadd ta' tokens) tista' tittardja** kollha** HTTP handlers, inkluż `/healthz`. Event-loop busy ≠ proċess mejjet. Jippreferi li jiffissa l-hog; irfinar tas-sonda inaqqas biss qtil falz.

### Sonda orkestratur ħafifa

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` meta l-fażi taċ-ċiklu tal-ħajja tas-server tkun lesta
- **503** + `starting` / `stopping` waqt boot jew shutdown
- Implimentazzjoni: `src/app/healthz/route.ts` (l-ebda DB ping)

### Saħħa tas-Sistema (fond)

```bash
GET /api/monitoring/health
```

Risposta:

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

`GET /api/monitoring/health` → `credentialHealth` huwa l** fil-memorja sonda-cache gauge** , mhux miżbla ħaj ta `provider_connections.test_status`. Wara #12532 il-mogħdija tat-talba taqra `getCachedCredentialHealthSummary()` biss; sondi fl-isfond jġedded il-cache barra mill-loop tal-avveniment.

| Saff                           | Fejn                                                                  | Xi jfisser                                                                                                                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Probe-cache gauge              | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | L-aħħar riżultati tas-sonda tal-kredenzjali tas-saħħa għadhom miżmuma fil-memorja tal-proċess. `source` huwa dejjem `probe-cache`.                                                                                             |
| Dettall tal-konnessjoni fallut | `credentialHealth.failedConnections`                                  | Preżenti** biss meta `failed > 0`** . Lista delimitata ta' ringieli tal-cache `status=error` (`connectionId`, `status`, sanitized `lastError` / `lastErrorType`). `failedOmitted` huwa stabbilit meta l-lista kienet limitata. |
| SQLite status twaħħal          | `credentialHealth.staleDbNonOkCount`                                  | Għadd ta'** attiv** (`is_active=1`) ringieli ta’ konnessjoni li `test_status` persistenti tagħhom huwa mhux ok magħruf (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                      |

Iż-żewġ saffi jistgħu ma jaqblux apposta:

- Gauge `failed=0` filwaqt `staleDbNonOkCount>0` — SQLite għad għandu `test_status` li jwaħħal (per eżempju `expired` jew `credits_exhausted`) li l-aħħar snapshot probe-cache ma jgħoddx bħala `status=error`.
- Gauge `failed>0` filwaqt li SQLite jidher b'saħħtu — sonda riċenti falliet u hija mħaddma fil-cache; ir-ringiela DB ma ġietx aġġornata, jew aktar tard ġiet approvata.

Twissiex biss fuq `provider_connections.test_status` meta tobrox dan l-endpoint. Uża `failed` + `failedConnections` għal fallimenti tas-sonda ħajjin, u `staleDbNonOkCount` meta jkollok bżonn l-għadd persistenti tal-istatus li jwaħħal.

### Rakkomandazzjonijiet tas-sonda Kubernetes

OmniRoute hija a** proċess ta' Node wieħed** (linja ta' avveniment wieħed). Stock Docker `HEALTHCHECK` timmira `/healthz` ħafif . `/api/monitoring/health` huwa** tqil wisq** għall-intervalli tal-ħajja tal-kubelet.

| Sonda              | Mira rakkomandata                                                                        | Noti                                                                                                                                                                                                                                                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **L-istartjar**    | HTTP `GET /healthz` `failureThreshold` twil (jew `startPeriod` kbir)                     | Cold start + SQLite migration tista 'taqbeż ftit sekondi                                                                                                                                                                                                                                                                          |
| **Prontezza**      | HTTP `GET /healthz`                                                                      | Lifecycle `ok` / `starting` / `stopping` (200 vs 503). Xorta flaps jekk il-linja hija mblukkata mis-CPU. A** 200 f'diversi sekondi mhix b'saħħitha** (#10303) — dan ifisser li l-linja ta' l-avvenimenti tneħħa bil-ġuħ qabel ma dam il-handler ta' 3 byte                                                                        |
| **Ħajja**          | HTTP `GET /livez`,** jew TCP** fuq il-port tas-servizz ewlieni (`PORT`, default `20128`) | `/livez` huwa proċess-alive biss (dejjem 200 jekk il-handler jaħdem). Għadu jaqsam l-avveniment loop — busy ≠ dead, u ma jiskoprix event-loop starvation (#10303) aħjar minn TCP. Jippreferi**TCP** jekk HTTP sondi time out taħt tagħbija catalog/compression ; tagħmel** le** joqtlu l-powd fuq tilari qasir event-loop jew mod |
| **Saħħa profonda** | `GET /api/monitoring/health` minn kontrollur estern                                      | Mhux ghal kubelet `livenessProbe` / tight `readinessProbe`                                                                                                                                                                                                                                                                        |

Eżempju ta' għamla (aġġusta l-limiti għat-tagħbija tal-bidu kiesaħ u l-kompressjoni tiegħek):

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

**M'għandekx** punt kubelet** ħajja** `/api/monitoring/health`. Dik it-triq tagħmel xogħol DB/monitoring reali u se tkun pożittiva falza taħt tagħbija.

Relatati: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (sondi waqt li l-linja tal-avvenimenti hija okkupata), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (hog tal-ipprezzar tal-katalgu), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (hog ta 'kompressjoni ta' token-count).

### systemd watchdog (linja ta' avveniment iffriżat)

Fuq host systemd, OmniRoute jgħid lill-maniġer tas-servizz meta jkun lest u jibqa’ jagħmel ping, għalhekk server li l-loop ta’ l-avvenimenti tiegħu huwa mwaħħal jinqatel u jerġa’ jibda flok jibqa’ wieqaf u sieket. Il-pings jiġu mill-loop tal-avveniment tas-server stess: meta jimblokka, jieqfu, u systemd jerġa 'jibda s-servizz ladarba `WatchdogSec` jgħaddi mingħajr wieħed.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) diġà jikteb user unit b'dan. Unità li tikteb lilek innifsek (iż- `Type=simple` default) ma tieħu l-ebda għassies, għalhekk żid dawn il-linji mat-taqsima `[Service]` tagħha:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

L-unità ġġenerata tissettja `Restart=on-failure`, għalhekk żid dik il-linja wkoll — mingħajrha l-għassies joqtol biss is-servizz imwaħħal minflok jerġa' jibda.

- `Type=notify`: is-servizz "jinbeda" meta s-server jibgħat `READY=1`, mhux meta l-proċess jitbaxxa. `TimeoutStartSec` jillimita bidu bil-mod.
- `NotifyAccess=all`: il-pings jintbagħtu mill-proċess tas-server, li huwa tifel tas-superviżur `omniroute serve`.
- `WatchdogSec`: pings johorgu kull 60 sekonda, allura uża** 120 jew aktar** . Valuri iżgħar jerġgħu jibdew server b'saħħtu.
- Mexxi `omniroute serve` fil-foreground. `--daemon` jinqata 's-server mill-cgroup tal-unità u l-handshake notify qatt ma jitlesta.

Iċċekkja li hija attiva wara bidu mill-ġdid:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` juri d-dewmien konfigurat u `WatchdogTimestamp` jimxi 'l quddiem kull minuta. Startjar mill-ġdid ikkawżat mill-għassa huwa rreġistrat bħala `Result=watchdog`. Biex itfi l-pings waqt li żżomm l-unità kif inhi, issettja `OMNIROUTE_DISABLE_SD_NOTIFY=1`; mingħajr `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) ma jintbagħat xejn.

L-għassies jiċċekkja biss li l-loop tal-avveniment jibqa' għaddej. Server li jkun bil-mod iżda li għadu jdur ma jerġax jinbeda.

### Xogħol fakultattiv fit-triq talba (memorja, ħiliet, aġġornament tat-token)

L-estrazzjoni tal-memorja, l-injezzjoni tal-ħiliet, u l-aġġornament tat-token OAuth jaqsmu l-** linja ta 'avveniment Node prinċipali** ma `/healthz`. Huma karatteristiċi ta' dashboard-toggle (`memoryEnabled`, `skillsEnabled`), mhux grupp ta' ħaddiema. Ara [Ambjent — event-loop cost](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Saħħa tal-Fornitur

> **L-ebda endpoint REST.** Id-dejta dwar is-saħħa tal-fornitur hija disponibbli permezz tal-għodda MCP `observability_snapshot` jew il-paġna tad-dashboard `/dashboard/providers`.

### Dettall tal-Fornitur

> **L-ebda endpoint REST.** Dettall għal kull fornitur huwa disponibbli permezz tal-paġna `/dashboard/providers` tad-dashboard.

---

## Awtopilota tas-Saħħa tal-Fornituri

Il-modulu `providerHealthAutopilot.ts` huwa **sistema li ssewwi lilha nnifisha** li:

1. Tidentifika problemi tal-fornituri (ċirkwit miftuħ, perjodi ta’ stennija, imblukkar, twissijiet dwar il-kwota)
2. Tiġġenera **azzjonijiet rakkomandati** biex issolvihom
3. B’mod fakultattiv **teżegwixxi awtomatikament** azzjonijiet b’riskju baxx

### Tipi ta’ Problemi Identifikati

| Tip ta’ problema             | Severità | Eżempju ta’ kundizzjoni                     |
| ---------------------------- | -------- | ------------------------------------------- |
| `provider_circuit_open`      | kritika  | Circuit breaker miftuħ wara 5 fallimenti    |
| `provider_circuit_half_open` | twissija | Iċ-ċirkwit qed jittestja l-irkupru          |
| `connection_cooldown`        | twissija | Konnessjoni f’perjodu ta’ stennija wara 429 |
| `stale_connection_error`     | twissija | L-aħħar aġġornament falla 30+ minuta ilu    |
| `terminal_connection_error`  | kritika  | OAuth revokat, ċavetta invalida             |
| `inactive_connection`        | tagħrif  | Konnessjoni diżattivata fis-settings        |
| `model_lockout`              | twissija | Mudell speċifiku fi kwarantina              |
| `quota_monitor_warning`      | twissija | Użu tal-kwota ta’ 80%+                      |

### Tipi ta’ Azzjonijiet Iġġenerati

| Azzjoni                        | Riskju | Deskrizzjoni                                  |
| ------------------------------ | ------ | --------------------------------------------- |
| `clear_provider_breaker`       | medju  | Irrisettja ċ-circuit breaker għal magħluq     |
| `clear_connection_cooldown`    | baxx   | Neħħi l-perjodu ta’ stennija minn konnessjoni |
| `clear_stale_connection_error` | baxx   | Neħħi l-indikatur ta’ żball skadut            |
| `clear_model_lockout`          | baxx   | Erġa’ attiva mudell fi kwarantina             |
| `reactivate_connection`        | medju  | Erġa’ attiva konnessjoni diżattivata          |
| `deactivate_connection`        | għoli  | Iddiżattiva konnessjoni problematika          |

### API

> **M’hemm l-ebda endpoint REST.** Il-problemi tal-awtopilota huma disponibbli permezz tal-għodda MCP `observability_snapshot` jew tad-dashboard. L-awtopilota jaħdem internament; l-imġiba tiegħu tiġi kkonfigurata permezz tad-DB tas-settings (il-field `autopilotMode` għal kull konnessjoni), mhux permezz ta’ varjabbli tal-ambjent — `grep -rn` għal varjabbli tal-ambjent tal-modalità tal-awtopilota ma jsib xejn.

### Modalità tal-Awtopilota

B’mod awtomatiku, l-awtopilota jaħdem fil-**modalità manwali** — jidentifika l-problemi u jiġġenera azzjonijiet rakkomandati, iżda ma japplikahomx awtomatikament. L-azzjonijiet jistgħu jiġu applikati permezz tad-dashboard.

---

## Awtopilota tas-Saħħa tal-Combo

`comboHealthAutopilot.ts` huwa l-ekwivalenti **speċifiku għall-combo** tal-awtopilota tal-fornituri. Huwa:

- Jidentifika combos mhux f’saħħithom
- Jirrakkomanda li l-miri jerġgħu jiġu ordnati
- Jissuġġerixxi li jiġu diżattivati miri bil-ħsara
- Ineħħi awtomatikament miri mejta wara N fallimenti

### Eżempji ta’ Problemi tal-Combo

```
Combo "always-on" (strateġija ta’ prijorità)
├─ Mira 1: openai/gpt-5 (f’saħħitha)
├─ Mira 2: anthropic/claude-opus-4-6 (⚠️ mudell imblukkat sal-14:00)
└─ Mira 3: kiro/claude-sonnet-4-5 (f’saħħitha)

Azzjoni rakkomandata: Ordna mill-ġdid — mexxi lil kiro ’l fuq minn anthropic sakemm jiskadi l-imblukkar
```

---

## Monitors tal-Kwota

`observability.ts` jesponi **monitors tal-kwota għal kull sessjoni** għall-fornituri b’abbonament (Claude Code, Codex, GitHub Copilot):

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

### Tifsiriet tal-Istatus

| Status      | Meta                           | Azzjoni tal-UI                                  |
| ----------- | ------------------------------ | ----------------------------------------------- |
| `starting`  | L-ewwel stħarriġ għaddej       | Indikatur tat-tagħbija                          |
| `idle`      | Ebda attività reċenti          | Moħbi mid-dashboard                             |
| `healthy`   | Fadal aktar minn 50% tal-kwota | Tikka ħadra                                     |
| `warning`   | Fadal inqas minn 50% tal-kwota | Twissija safra                                  |
| `exhausted` | Kwota = 0%                     | Blokka ħamra, irrotta lejn il-fornitur li jmiss |
| `error`     | L-istħarriġ falla              | Tikka ħamra, erġa’ pprova dalwaqt               |

### API

> **M’hemm l-ebda endpoint REST.** Id-data tal-monitor tal-kwota hija disponibbli permezz tal-għodda MCP `observability_snapshot` jew tad-dashboard.

---

## Stampa tal-Osservabbiltà

L-għodda MCP `observability_snapshot` tirritorna **stampa sħiħa tas-sistema** għall-aġenti tal-AI:

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
  "quotaMonitors": {/* ara hawn fuq */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

L-aġenti jużaw dan biex jieħdu **deċiżjonijiet dwar ir-routing** — pereżempju, "jekk iċ-ċirkwit ta' openai huwa miftuħ, ibgħat it-traffiku l-ewwel lejn anthropic".

---

## Kontroll tas-Saħħa tat-Token

Il-fornituri OAuth (Claude Code, GitHub Copilot, Cursor) jeħtieġu **aġġornament perjodiku tat-token**. `src/lib/tokenHealthCheck.ts` iħaddem skedatur fl-isfond:

- **Ċiklu ta' kontroll**: kull 60 sekonda (il-kontroll f'`TICK_MS = 60 * 1000` f'`src/lib/tokenHealthCheck.ts:30`)
- **Intervall tal-kontroll tas-saħħa għal kull konnessjoni**: il-valur predefinit huwa 60 minuta (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); jista' jiġi kkonfigurat permezz tad-DB tas-settings
- **Aġġornament preventiv meta jseħħ 401**: jiġi ġestit mill-interċettur għal kull konnessjoni

### Status tas-Saħħa tat-Token

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

### Konfigurazzjoni

Il-konfigurazzjoni tal-kontroll tas-saħħa tat-token tiġi ġestita internament minn `tokenHealthCheck.ts`.

### Saħħa tat-Token

> **M'hemm l-ebda endpoint REST.** Id-data dwar is-saħħa tat-token hija disponibbli permezz tad-dashboard jew tal-għodda MCP `observability_snapshot`.

---

## Twissijiet

### Kanali Integrati

OmniRoute jappoġġja **3 kanali ta' twissija**:

| Kanal                | Konfigurazzjoni   | Każ ta' użu                          |
| -------------------- | ----------------- | ------------------------------------ |
| Banner tad-dashboard | Dejjem attiv      | Notifiki fl-applikazzjoni            |
| Webhook              | Ikkonfigura l-URL | Slack, Discord, PagerDuty            |
| Log                  | Predefinit        | Għall-aggregazzjoni esterna tal-logs |

### Konfigurazzjoni tal-Webhook

> **Nota:** Il-konfigurazzjoni tat-twissijiet permezz tal-webhook tiġi ġestita mill-paġna Settings tad-dashboard. Ara l-UI ta' Settings għall-URL tal-webhook, l-iffiltrar tal-avvenimenti, u l-personalizzazzjoni tal-payload.

### Tipi ta' Twissijiet

| Twissija                     | Meta                                       | Severità predefinita |
| ---------------------------- | ------------------------------------------ | -------------------- |
| `provider_circuit_open`      | Iċ-ċirkwit jinfetaħ                        | kritika              |
| `provider_circuit_half_open` | Iċ-ċirkwit ikun qed jittestja l-irkupru    | informazzjoni        |
| `quota_warning`              | Il-kwota tkun 80%+                         | twissija             |
| `quota_exhausted`            | Il-kwota tkun 100%                         | kritika              |
| `token_refresh_failed`       | 3+ fallimenti konsekuttivi fl-aġġornament  | twissija             |
| `token_expired`              | It-token ikun skada                        | kritika              |
| `combo_target_unhealthy`     | Il-mira tal-combo tkun f'cooldown għal 1h+ | twissija             |
| `db_integrity_warning`       | Ksur tal-FK > 0                            | twissija             |
| `heap_pressure`              | L-użu tal-heap > 80% tal-limitu            | twissija             |

---

## Metriċi tal-Prestazzjoni

### Metriċi Traċċati

| Metrika                 | Tip       | Sors                            |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | counter   | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | counter   | `services/usage.ts`             |
| `cost_usd`              | counter   | `services/usage.ts`             |
| `provider_errors`       | counter   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | counter   | `services/resilience.ts`        |
| `cache_hits`            | counter   | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | gauge     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | gauge     | `observability.ts`              |

### Perċentili tal-Latenza (p50/p95/p99)

> **L-ebda endpoint REST.** Id-data tal-perċentili tal-latenza hija disponibbli permezz tal-paġna `/dashboard/health` tad-dashboard. L-esportazzjoni għal Prometheus/OpenTelemetry hija ppjanata għal v3.9.

### Esportazzjoni għal Prometheus / OpenTelemetry (Fażi 2)

Ippjanata għal v3.9: esportazzjoni nattiva għal Prometheus, OpenTelemetry, Datadog.

Għalissa, iġbor id-data minn `/api/monitoring/health` bi kwalunkwe sistema ta’ monitoraġġ ibbażata fuq HTTP (Prometheus blackbox exporter, Datadog HTTP check, eċċ.).

---

## Riċetti għat-Twissijiet

### Slack

> **Nota:** It-twissijiet permezz ta’ webhook jiġu kkonfigurati mill-paġna Settings tad-dashboard — ma hemm l-ebda varjabbli tal-ambjent iddedikata għall-webhooks (`grep -rn` jirritorna żero riżultati). Ara l-UI ta’ Settings għall-URL tal-webhook, l-iffiltrar tal-avvenimenti, u l-personalizzazzjoni tal-payload.

### Discord

> It-twissijiet permezz ta’ webhook jużaw l-istess fluss tal-UI ta’ Settings bħal Slack. Discord jaċċetta l-istess struttura tal-payload JSON.

### PagerDuty

> It-twissijiet permezz ta’ webhook jużaw l-istess fluss tal-UI ta’ Settings. Iċ-ċwievet tar-routing tal-PagerDuty Events API v2 jiġu kkonfigurati fl-UI ta’ Settings.

### Webhook Personalizzat (JSON)

> Kwalunkwe endpoint HTTP li jaċċetta POST b’korp JSON jaħdem. Ikkonfigura l-URL fl-UI ta’ Settings.

---

## Konfigurazzjoni tad-Dashboard

### Ippersonalizza d-Dashboard tas-Saħħa

Oħloq `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Waħħal Fornitur Fin-naħa ta’ Fuq

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Soluzzjoni tal-Problemi

### "Il-fornitur jgħid li huwa f’saħħtu iżda t-talbiet ifallu"

1. Iċċekkja l-**kwistjonijiet tal-autopilot** — jista’ jkun li mudell huwa mblukkat
2. Ara l-**iżbalji reċenti** għall-klassi speċifika tal-iżball
3. Ipprova t-**test tal-konnessjoni** fil-kard tal-fornitur
4. Iċċekkja jekk il-fornitur huwiex **soġġett għal limitazzjoni tar-rata upstream** (mhux viżibbli lokalment)

### "Il-kwota tidher f’saħħitha iżda qed nara 429s"

- 429 ifisser li l-fornitur qed jgħid li użajt il-kwota tiegħek
- It-traċċar tal-kwota ta’ OmniRoute jista’ jkun **skadut** — il-verità tal-fornitur tinsab upstream
- Id-data tal-kwota tiġi aġġornata awtomatikament permezz tal-moniter intern tal-kwota

### "Il-combo qed ifalli iżda l-miri kollha jidhru f’saħħithom"

- Iċċekkja d-dashboard tas-**saħħa tal-combo** għal problemi fl-ordni tal-miri
- Ara l-**avvenimenti ta’ fallback** — jista’ jkun li l-combo qed teżawrixxi l-għażliet malajr wisq
- Ivverifika li l-**istrateġija** taqbel mal-każ tal-użu tiegħek (prijorità vs round-robin vs awtomatika)

### "Il-verifika tas-saħħa tad-database qed tfalli"

- Ħaddem `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Jekk tirritorna "ok" — huwa allarm falz, il-verifika tas-saħħa qed tkun stretta wisq
- Jekk tirritorna xi ħaġa oħra — **waqqaf OmniRoute** u segwi l-[gwida għall-irkupru minn diżastru](./DATABASE_GUIDE.md#disaster-recovery)

### "Il-pressjoni fuq il-heap tal-memorja hija kritika"

```bash
# Iċċekkja l-heap attwali
node -e "console.log(process.memoryUsage())"

# Attiva GC manwalment (jekk --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Naqqas it-talbiet konkorrenti (issettjah mid-dashboard fil-paġna Settings, mhux b’varjabbli tal-ambjent)
# Ma hemm l-ebda varjabbli tal-ambjent `MAX_CONCURRENT_REQUESTS` — ikkonfiguraha f’Settings → Concurrency.
```

---

## Ara Wkoll

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — monitoraġġ tal-użu u tal-ispejjeż
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — skema tad-DB + stat tas-saħħa
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — stat tas-saħħa tal-proxy (cache separata)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — arkitettura tas-sistema
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — dettalji dwar is-circuit breaker
- Sors: `src/lib/monitoring/` (4 fajls, 2121 linja ta’ kodiċi)
