# Monitoring & Observability Guide (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **A Taƙaice**: OmniRoute yana zuwa da ginanniyar sa ido kan lafiyar tsarin, autopilot na masu samarwa, bibiyar ƙa'ida, da hooks na observability. Wannan jagorar ta ƙunshi dashboard, faɗakarwa, da warware matsaloli.

**Tushe:**

- `src/lib/monitoring/observability.ts` — hoton yanayin observability
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot na lafiyar combo
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot na mai samarwa
- `src/lib/monitoring/providerHealthMatrix.ts` — matrix na lafiyar masu samarwa
- `src/lib/localHealthCheck.ts` — binciken lafiya na gida
- `src/lib/tokenHealthCheck.ts` — lafiyar sabunta token
- `src/lib/proxyHealth.ts` — ma'ajiyar wucin gadi ta lafiyar proxy (an yi bayani a PROXY_GUIDE.md)

---

## Bayani Gabaɗaya

OmniRoute yana da **matakai 3 na sa ido**:

```
┌──────────────────────────────────────────────────────────────┐
│  Mataki 1: Lafiyar Tsari (matakin uwar garke)                 │
│  ├─ localHealthCheck.ts — DB, ports, native deps              │
│  ├─ db/healthCheck.ts — inganci, FK, abubuwan da ba su da iyaye│
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Mataki 2: Lafiyar Mai Samarwa (juriya ga kowane mai samarwa)  │
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldowns   │
│  ├─ providerHealthMatrix.ts — makin lafiya bisa mai samarwa/model │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Mataki 3: Observability Kai-tsaye (hotunan lokacin aiki)      │
│  ├─ observability.ts — circuit breakers, sessions, quota       │
│  ├─ tokenHealthCheck.ts — lafiyar sabunta OAuth token          │
│  └─ Kayan MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Shafukan Dashboard

### `/dashboard/health` (Lafiyar Tsari)

Babban dashboard na lafiya yana nuna:

| Sashe                                   | Abin da yake nunawa                                          |
| --------------------------------------- | ------------------------------------------------------------ |
| **Matsayin uwar garke**                 | Lokacin aiki, sigar, port, haɗin da ke aiki                  |
| **Database**                            | Haɗi, inganci, girman WAL, sauye-sauyen baya-bayan nan       |
| **Taƙaitaccen bayani kan masu samarwa** | Yawan masu aiki, yawan masu lafiya, yawan breaker da ke buɗe |
| **Masu sa ido kan ƙa'ida**              | Sessions masu aiki, faɗakarwa, waɗanda suka ƙare             |
| **Kurakuran baya-bayan nan**            | Kurakurai 10 na ƙarshe tare da stack traces                  |
| **Amfani da albarkatu**                 | Memory, CPU, alamar matsin heap                              |

### `/dashboard/providers` (Lafiyar Mai Samarwa)

Dashboard na kowane mai samarwa:

| Ginshiƙi    | Bayani                                                     |
| ----------- | ---------------------------------------------------------- |
| Mai Samarwa | ID na mai samarwa + sunan nuni                             |
| Lafiya      | Matsayin kore/rawaya/ja                                    |
| Circuit     | Yanayin buɗe/rufe/rabin-buɗe                               |
| Haɗe-haɗe   | Yawan haɗe-haɗe, sabuntawa na ƙarshe                       |
| Models      | Models da ake da su, lafiyar kowane model                  |
| Kuɗi        | Kuɗin yau, yanayin kwanaki 7                               |
| Kurakurai   | Yawan kurakuran awa 24 da suka gabata, babban ajin kuskure |

Danna wani mai samarwa don ganin:

- Buƙatun baya-bayan nan tare da cikakken rabon latency
- Makin lafiyar kowane haɗi
- Lockouts na kowane model
- Shawarwarin autopilot

### `/dashboard/quota` (Bibiyar Ƙa'ida)

Ga kowane API key:

- Amfani na yanzu idan aka kwatanta da iyaka (progress bar)
- Yanayin ƙa'ida (jadawalin kwanaki 30)
- Lokacin reset na gaba
- Tarihin faɗakarwa

### `/dashboard/combos` (Lafiyar Combo)

Ga kowane combo:

- Dabara + targets
- Lafiyar kowane target
- Abubuwan fallback na baya-bayan nan
- Adadin nasara (awa 24, kwanaki 7, kwanaki 30)

---

## Tabbatar da lafiya API

OmniRoute fallasa** biyu** HTTP lafiya saman. Ba musanyawa ba ne ga mawaƙa.

| Hanya                        | Manufar                                                             | Nauyi                              | Amfani don                                                                |
| ---------------------------- | ------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| `GET /healthz`               | Rayuwar rayuwa liveness/readiness (`ok` / `starting` / `stopping`)  | Karanci (tutar lokaci kawai)       | Kubernetes** shiri** ; taushi** rayuwa** idan dole ne kayi amfani da HTTP |
| `GET /api/monitoring/health` | Ƙirƙirar tsarin mai bada + mai zurfi (DB, heap, kirga catalog, ...) | Heavy (sync DB / aikin saka idanu) | Dashboards, blackbox zurfin cak, ginanniyar binciken lafiyar Docker       |

> **Lura:** Ana samun matrix na kiwon lafiya na mai ba da sabis, batutuwan autopilot, masu lura da ƙididdiga, lafiyar alama, da cikakkun bayanan latency fiye da `/api/monitoring/health` suna samuwa ta hanyar**MCP kayan aiki** `observability_snapshot` ya da** dashboard** shafukan — babu kwazo REST hanyoyi ga wadancan.

Dukansu hanyoyin suna gudana akan** Node taron madauki** kamar yadda ake buƙata. Hanya mai ɗaure CPU (babban aikin kundin kundin `GET /v1/models`, matsi mai tsayi / ƙidayar alama) na iya jinkirtawa.** duka** masu sarrafa HTTP, gami da `/healthz`. Matsakaicin madauki aikin ≠ ya mutu. Fi son gyara alade; Gyaran bincike yana rage kashe kashe karya kawai.

### Binciken makada mara nauyi

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + jiki `ok` lokacin da aka shirya lokacin rayuwar uwar garken
- **503** + `starting` / `stopping` yayin taya ko rufewa
- Aiwatar da: `src/app/healthz/route.ts` (no DB ping)

### Kiwon Lafiyar Tsari (zurfi)

```bash
GET /api/monitoring/health
```

Martani:

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

#### `credentialHealth`: bincike-cache vs SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` shine** in-memory bincike-cache ma'auni** , ba jibgewar `provider_connections.test_status` kai tsaye ba. Bayan #12532 hanyar nema tana karanta `getCachedCredentialHealthSummary()` kawai; Binciken baya yana sabunta cache daga madauki na taron.

| Layer                             | Ina                                                                   | Abin da ake nufi                                                                                                                                                                                                     |
| --------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Binciken cache ma'auni            | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Sakamakon binciken lafiya na ƙarshe har yanzu yana cikin ƙwaƙwalwar aiki. `source` kullum `probe-cache`.                                                                                                             |
| Cikakken bayanin haɗin da ya gaza | `credentialHealth.failedConnections`                                  | Yanzu** sai lokacin `failed > 0`** . Ƙididdigar jeri na cache tare da `status=error` (`connectionId`, `status`, sanitized `lastError` / `lastErrorType`). `failedOmitted` an saita lokacin da aka lissafta lissafin. |
| SQLite m status                   | `credentialHealth.staleDbNonOkCount`                                  | Adadin** aiki** (`is_active=1`) layuka masu haɗin gwiwa waɗanda `test_status` da ya dage ya zama sananne mara kyau (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                |

Matakan biyu na iya yin sabani da gangan:

- Ma'auni `failed=0` yayin da `staleDbNonOkCount>0` — SQLite har yanzu yana da m `test_status` (misali `expired` ko `credits_exhausted`) cewa sabon hoton cache na binciken baya ƙidaya a matsayin `status=error`.
- Auna `failed>0` yayin da SQLite yayi kama da lafiya — wani bincike na baya-bayan nan ya gaza kuma an adana shi; ba a sabunta layin DB ba, ko kuma an share shi daga baya.

Kar a faɗakar da `provider_connections.test_status` kawai lokacin da ake goge wannan ƙarshen ƙarshen. Yi amfani da `failed` + `failedConnections` don gazawar bincike kai tsaye, da `staleDbNonOkCount` lokacin da kuke buƙatar ƙididdige matsayi mai tsayi.

### Kubernetes bincike shawarwari

OmniRoute a** Tsarin Node guda ɗaya** (ɗaya madauki). Hannun jari Docker `HEALTHCHECK` yana `/healthz` mara nauyi. `/api/monitoring/health` da** yayi nauyi sosai** don kubelet rayuwa tazara.

| Bincike              | Manufar da aka ba da shawarar                                                  | Bayanan kula                                                                                                                                                                                                                                                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Farawa**           | HTTP `GET /healthz` mai dogon `failureThreshold` (ko babban `startPeriod`)     | Tushen sanyi + SQLite ƙaura na iya wuce daƙiƙa kaɗan                                                                                                                                                                                                                                                                                                                       |
| **Shiri**            | HTTP `GET /healthz`                                                            | Rayuwar rayuwa `ok` / `starting` / `stopping` (200 vs 503). Har yanzu yana murɗawa idan an katange madauki na CPU. A** 200 a cikin daƙiƙa masu yawa ba shi da lafiya** (#10303) — yana nufin an ji yunwar madauki na taron kafin mai sarrafa 3-byte ya gudu                                                                                                                |
| **Rayuwa**           | HTTP `GET /livez`,** ko TCP** akan babban tashar sabis (`PORT`, tsoho `20128`) | `/livez` yana raye-raye ne kawai (ko da yaushe 200 idan mai sarrafa yana gudana). Har yanzu yana raba madauki taron — mai aiki ≠ ya mutu, kuma baya gano yunwa-madauki (#10303) fiye da yadda TCP yake yi. Fi son**TCP** idan HTTP ya bincika lokaci ya ƙare a ƙarƙashin nauyin catalog/compression ; yi** ba** kashe kwafsa a kan gajerun rumfuna-madauki ta kowane hanya |
| **Lafiya mai zurfi** | `GET /api/monitoring/health` daga abin dubawa na waje                          | Ba don kubelet `livenessProbe` / m `readinessProbe`                                                                                                                                                                                                                                                                                                                        |

Siffar Misali (daidaita ƙofofin zuwa farkon sanyi da nauyin matsawa):

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

**Kar ka** maki kubelet** rayuwa** da `/api/monitoring/health`. Wannan hanyar tana yin aikin DB/monitoring na gaske kuma za ta yi ƙarya a ƙarƙashin kaya.

Mai alaƙa: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (bincike yayin da madauki taron ke aiki), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (farashin farashin hog), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (matsa lamba-count hog).

### systemd watchdog (daskararre taron madauki)

A kan na'ura mai tsari, OmniRoute yana gaya wa manajan sabis lokacin da ya shirya kuma ya ci gaba da yin pinging shi, don haka uwar garken da madauki na taron ya makale ana kashe shi kuma ya sake farawa maimakon tsayawa shiru. Ppings suna fitowa daga madauki na taron uwar garken: idan ya toshe, sai su tsaya, kuma tsarin yana sake farawa sabis da zarar `WatchdogSec` ya wuce ba tare da ɗaya ba.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) ta riga ta rubuta sashin mai amfani da wannan. Naúrar da kuka rubuta da kanku (tsohuwar `Type=simple`) ba ta samun mai tsaro, don haka ƙara waɗannan layukan zuwa sashin `[Service]` sa:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Naúrar da aka ƙirƙira tana saita `Restart=on-failure`, don haka ƙara wannan layin shima — ba tare da shi ba sai dai mai sa ido yana kashe sabis ɗin da ya makale maimakon sake kunna shi.

- `Type=notify`: ana "farawa" sabis ɗin lokacin da uwar garken ya aika `READY=1`, ba lokacin da tsari ya ƙare ba. `TimeoutStartSec` ya daure a hankali farawa.
- `NotifyAccess=all`: Ana aika pings ta hanyar tsarin uwar garken, wanda yaro ne na mai kula da `omniroute serve`.
- `WatchdogSec`: pings suna fita kowane sakan 60, don haka amfani** 120 ko fiye** . Ƙananan dabi'u za su sake kunna uwar garken lafiyayye.
- Gudu `omniroute serve` a gaba. `--daemon` yana cire uwar garken daga rukunin rukunin kuma sanarwar ba ta ƙarewa.

Bincika cewa yana aiki bayan sake farawa:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` yana nuna tsayayyen jinkiri kuma `WatchdogTimestamp` yana ci gaba kowane minti daya. Sake kunnawa wanda mai sa ido ya haifar ana rubuta shi azaman `Result=watchdog`. Don kashe pings yayin kiyaye naúrar yadda yake, saita `OMNIROUTE_DISABLE_SD_NOTIFY=1`; ba tare da `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) ba a aika komai.

Mai sa ido kawai yana bincika cewa madauki na taron yana ci gaba da gudana. Sabar da ke jinkiri amma har yanzu ba ta sake farawa ba.

### Aikin neman zaɓi na zaɓi (ƙwaƙwalwa, ƙwarewa, wartsakewa alama)

Cirar ƙwaƙwalwar ajiya, ƙwarewa, da wartsake alamar OAuth suna raba abubuwan** babban Node taron madauki** da `/healthz`. Siffofin dashboard-toggle ne (`memoryEnabled`, `skillsEnabled`), ba wurin tafkin ma'aikaci ba. Duba [Muhalli — kudin taron-madauki](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Lafiya Mai Ba da Lafiya

> **Babu REST ta ƙarshe.** Ana samun bayanan lafiyar mai bayarwa ta hanyar `observability_snapshot` kayan aiki MCP ko shafin `/dashboard/providers` dashboard.

### Cikakken Bayani

> **Babu REST ta ƙarshe.** Ana samun cikakken dalla-dalla ta kowane mai ba da labari ta shafin dashboard `/dashboard/providers`.

---

## Autopilot na Lafiyar Mai Samarwa

Module ɗin `providerHealthAutopilot.ts` wani **tsari ne mai gyara kansa** wanda yake:

1. Gano matsalolin mai samarwa (circuit a buɗe, lokutan jira, kullewa, gargaɗin ƙayyadaddun amfani)
2. Samar da **matakan da aka ba da shawarar ɗauka** don warware su
3. Idan an zaɓa, yana **aiwatar da matakan marasa haɗari sosai ta atomatik**

### Nau'ikan Matsalolin da Aka Gano

| Nau'in matsala               | Tsanani     | Misalin yanayi                                       |
| ---------------------------- | ----------- | ---------------------------------------------------- |
| `provider_circuit_open`      | mai tsanani | Circuit breaker ya buɗe bayan gazawa 5               |
| `provider_circuit_half_open` | gargaɗi     | Circuit yana gwada murmurewa                         |
| `connection_cooldown`        | gargaɗi     | Haɗin yana lokacin jira bayan 429                    |
| `stale_connection_error`     | gargaɗi     | Sabuntawa na ƙarshe ya gaza mintuna 30+ da suka wuce |
| `terminal_connection_error`  | mai tsanani | An soke OAuth, maɓalli ba ingantacce ba              |
| `inactive_connection`        | bayani      | An kashe haɗin a cikin saituna                       |
| `model_lockout`              | gargaɗi     | Takamaiman model yana cikin keɓewa                   |
| `quota_monitor_warning`      | gargaɗi     | Amfani da quota ya kai 80%+                          |

### Nau'ikan Matakan da Aka Samar

| Mataki                         | Haɗari     | Bayani                                  |
| ------------------------------ | ---------- | --------------------------------------- |
| `clear_provider_breaker`       | matsakaici | Sake saita circuit breaker zuwa rufaffe |
| `clear_connection_cooldown`    | ƙasa       | Cire lokacin jira daga wani haɗi        |
| `clear_stale_connection_error` | ƙasa       | Share alamar tsohon kuskure             |
| `clear_model_lockout`          | ƙasa       | Sake kunna model da aka keɓe            |
| `reactivate_connection`        | matsakaici | Sake kunna haɗin da aka kashe           |
| `deactivate_connection`        | babba      | Kashe haɗin da ke da matsala            |

### API

> **Babu REST endpoint.** Ana samun matsalolin autopilot ta kayan aikin MCP `observability_snapshot` ko dashboard. Autopilot yana aiki a ciki; ana daidaita halayyarsa ta settings DB (filin `autopilotMode` na kowane haɗi), ba ta environment variables ba — `grep -rn` don autopilot-mode env var ba ya dawo da sakamako ko ɗaya.

### Yanayin Autopilot

Autopilot yana aiki a **yanayin hannu** ta tsohuwa — yana gano matsaloli kuma yana samar da matakan da aka ba da shawarar ɗauka, amma ba ya aiwatar da su ta atomatik. Ana iya aiwatar da matakan ta dashboard.

---

## Autopilot na Lafiyar Combo

`comboHealthAutopilot.ts` shi ne makamancin autopilot na mai samarwa da aka keɓance **musamman ga combo**. Yana:

- Gano combos marasa lafiya
- Ba da shawarar sake jera targets
- Ba da shawarar kashe targets da suka lalace
- Cire matattun targets ta atomatik bayan gazawa N

### Misalan Matsalolin Combo

```
Combo "always-on" (dabarar fifiko)
├─ Target 1: openai/gpt-5 (lafiya)
├─ Target 2: anthropic/claude-opus-4-6 (⚠️ model a kulle har zuwa 14:00)
└─ Target 3: kiro/claude-sonnet-4-5 (lafiya)

Matakin da aka ba da shawara: Sake jeri — matsar da kiro sama da anthropic har sai lokacin kullewar ya ƙare
```

---

## Masu Sa Ido Kan Quota

`observability.ts` yana bayyana **masu sa ido kan quota na kowane session** ga masu samarwa na biyan kuɗin rajista (Claude Code, Codex, GitHub Copilot):

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

### Ma'anonin Matsayi

| Matsayi     | Lokacin da                      | Matakin UI                                 |
| ----------- | ------------------------------- | ------------------------------------------ |
| `starting`  | Ana gudanar da polling na farko | Alamar juyawa                              |
| `idle`      | Babu aiki na kwanan nan         | Ɓoye daga dashboard                        |
| `healthy`   | Fiye da 50% na quota ya rage    | Koriyar ɗigo                               |
| `warning`   | Ƙasa da 50% na quota ya rage    | Gargaɗin rawaya                            |
| `exhausted` | Quota = 0%                      | Jan toshewa, tura zuwa mai samarwa na gaba |
| `error`     | Polling ya gaza                 | Jan ɗigo, sake gwadawa nan ba da jimawa ba |

### API

> **Babu REST endpoint.** Ana samun bayanan mai sa ido kan quota ta kayan aikin MCP `observability_snapshot` ko dashboard.

---

## Hoton Halin Sa-ido

Kayan aikin MCP na `observability_snapshot` yana dawo da **cikakken hoton halin tsarin** ga wakilan AI:

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
  "quotaMonitors": {/* duba sama */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Wakilai suna amfani da wannan don yanke **shawarar hanyar turawa** — misali, "idan circuit na openai a buɗe yake, fara turawa zuwa anthropic".

---

## Binciken Lafiyar Token

Masu samar da OAuth (Claude Code, GitHub Copilot, Cursor) suna buƙatar **sabunta token lokaci-lokaci**. `src/lib/tokenHealthCheck.ts` yana gudanar da mai tsara aiki a bayan fage:

- **Zagayen dubawa**: kowane daƙiƙa 60 (dubawa a cikin `TICK_MS = 60 * 1000` a `src/lib/tokenHealthCheck.ts:30`)
- **Tsakanin lokacin binciken lafiya na kowace haɗi**: tsoho mintuna 60 (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); ana iya saita shi ta DB na saituna
- **Sabuntawa tun kafin 401**: interceptor na kowace haɗi ne ke kula da shi

### Matsayin Lafiyar Token

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

### Kanfigareshan

`tokenHealthCheck.ts` ne ke kula da kanfigareshan binciken lafiyar token a ciki.

### Lafiyar Token

> **Babu REST endpoint.** Ana samun bayanan lafiyar token ta dashboard ko kayan aikin MCP na `observability_snapshot`.

---

## Faɗakarwa

### Tashoshin da Aka Gina Ciki

OmniRoute yana goyon bayan **tashoshin faɗakarwa guda 3**:

| Tasha             | Saitawa        | Inda ake amfani da ita    |
| ----------------- | -------------- | ------------------------- |
| Tutawar dashboard | Kullum a kunne | Sanarwa a cikin manhaja   |
| Webhook           | Saita URL      | Slack, Discord, PagerDuty |
| Log               | Tsoho          | Don tattara log a waje    |

### Kanfigareshan Webhook

> **Lura:** Ana kula da kanfigareshan faɗakarwar webhook ta shafin Settings na dashboard. Duba UI na Settings don URL na webhook, tace abubuwan da suka faru, da keɓance payload.

### Nau'ikan Faɗakarwa

| Faɗakarwa                    | Lokacin da take faruwa                      | Tsananin tsoho |
| ---------------------------- | ------------------------------------------- | -------------- |
| `provider_circuit_open`      | Lokacin da circuit ya buɗe                  | critical       |
| `provider_circuit_half_open` | Lokacin da circuit ke gwada murmurewa       | info           |
| `quota_warning`              | Lokacin da quota ya kai 80%+                | warning        |
| `quota_exhausted`            | Lokacin da quota ya kai 100%                | critical       |
| `token_refresh_failed`       | Gazawar sabuntawa sau 3+ a jere             | warning        |
| `token_expired`              | Token ya wuce lokacin ƙarewarsa             | critical       |
| `combo_target_unhealthy`     | Combo target yana cooldown na awa 1+        | warning        |
| `db_integrity_warning`       | Keta FK > 0                                 | warning        |
| `heap_pressure`              | Amfani da heap > 80% na iyakar da aka saita | warning        |

---

## Ma'aunin Aiki

### Ma'aunan da Ake Bibiyarsu

| Ma'auni                 | Nau'i     | Tushe                           |
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

### Kason Jinkiri (p50/p95/p99)

> **Babu REST endpoint.** Ana samun bayanan kason jinkiri ta shafin dashboard na `/dashboard/health`. Ana shirin fitarwa zuwa Prometheus/OpenTelemetry a v3.9.

### Fitarwa zuwa Prometheus / OpenTelemetry (Mataki na 2)

An shirya don v3.9: fitarwa kai tsaye zuwa Prometheus, OpenTelemetry, Datadog.

A yanzu, tattara bayanai daga `/api/monitoring/health` ta amfani da kowane tsarin sa ido mai tushen HTTP (Prometheus blackbox exporter, Datadog HTTP check, da sauransu).

---

## Hanyoyin Saita Faɗakarwa

### Slack

> **Lura:** Ana saita faɗakarwar webhook ta shafin Settings na dashboard — babu keɓaɓɓun env vars na webhook (`grep -rn` yana dawo da sakamako sifili). Duba Settings UI don URL na webhook, tace abubuwan da suka faru, da keɓance payload.

### Discord

> Faɗakarwar webhook tana amfani da tsarin Settings UI iri ɗaya da Slack. Discord yana karɓar tsarin payload na JSON iri ɗaya.

### PagerDuty

> Faɗakarwar webhook tana amfani da tsarin Settings UI iri ɗaya. Ana saita routing keys na PagerDuty Events API v2 a cikin Settings UI.

### Webhook na Musamman (JSON)

> Duk wani HTTP endpoint da ke karɓar POST mai jikin JSON zai yi aiki. Saita URL ɗin a cikin Settings UI.

---

## Saitin Dashboard

### Keɓance Dashboard na Lafiyar Tsari

Ƙirƙiri `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Liƙa Provider a Sama

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Magance Matsaloli

### "Provider yana nuna yana lafiya amma buƙatu suna gaza"

1. Duba **matsalolin autopilot** — wataƙila an kulle wani model
2. Duba **kurakuran baya-bayan nan** don takamaiman rukunin kuskuren
3. Gwada **gwajin haɗi** a cikin katin provider
4. Duba ko provider ɗin ya fuskanci **iyakancewar adadin buƙatu daga upstream** (ba a iya gani a gida)

### "Quota yana nuna yana lafiya amma ina ganin 429s"

- 429 yana nufin provider ya ce ka yi amfani da quota ɗinka
- Bibiyar quota ta OmniRoute na iya zama **tsohuwa** — ingantaccen bayanin provider yana upstream
- Bayanan quota suna sabuntawa kai tsaye ta internal quota monitor

### "Combo yana gaza amma duk targets suna nuna suna lafiya"

- Duba dashboard na **lafiyar combo** don matsalolin jerin targets
- Duba **abubuwan fallback** — wataƙila combo yana ƙare duk zaɓuɓɓukansa da sauri
- Tabbatar cewa **strategy** ya dace da yanayin amfaninka (priority da round-robin da auto)

### "Gwajin lafiyar database yana gaza"

- Gudanar da `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Idan "ok" — faɗakarwar ƙarya ce, gwajin lafiyar yana da tsauri fiye da kima
- Idan wani abu dabam ne — **dakatar da OmniRoute** kuma bi [jagorar farfaɗowa daga bala'i](./DATABASE_GUIDE.md#disaster-recovery)

### "Matsin heap na memory ya kai matakin haɗari"

```bash
# Duba heap na yanzu
node -e "console.log(process.memoryUsage())"

# Jawo GC da hannu (idan --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Rage buƙatun da ake gudanarwa a lokaci guda (saita ta shafin Settings na dashboard, ba env var ba)
# Babu env var mai suna `MAX_CONCURRENT_REQUESTS` — saita shi a Settings → Concurrency.
```

---

## Duba Kuma

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — bibiyar amfani da kuɗi
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — tsarin DB + lafiyarsa
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — lafiyar proxy (ma'ajiyar wucin gadi daban)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — gine-ginen tsarin
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — cikakkun bayanai kan circuit breaker
- Tushe: `src/lib/monitoring/` (fayiloli 4, layukan lamba 2121)
