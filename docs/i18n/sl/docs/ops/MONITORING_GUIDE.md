# Monitoring & Observability Guide (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute vključuje vgrajeno spremljanje stanja, samodejno upravljanje ponudnikov, sledenje kvotam in priključke za opazljivost. Ta vodnik obravnava nadzorno ploščo, opozorila in odpravljanje težav.

**Viri:**

- `src/lib/monitoring/observability.ts` — posnetek opazljivosti
- `src/lib/monitoring/comboHealthAutopilot.ts` — samodejno upravljanje stanja kombinacij
- `src/lib/monitoring/providerHealthAutopilot.ts` — samodejno upravljanje ponudnikov
- `src/lib/monitoring/providerHealthMatrix.ts` — matrika stanja ponudnikov
- `src/lib/localHealthCheck.ts` — lokalno preverjanje stanja
- `src/lib/tokenHealthCheck.ts` — stanje osveževanja žetonov
- `src/lib/proxyHealth.ts` — predpomnilnik stanja posredniškega strežnika (obravnavan v PROXY_GUIDE.md)

---

## Pregled

OmniRoute ima **3 ravni spremljanja**:

```
┌──────────────────────────────────────────────────────────────┐
│  Raven 1: Stanje sistema (na ravni strežnika)                 │
│  ├─ localHealthCheck.ts — zbirka podatkov, vrata, izvorne odvisnosti │
│  ├─ db/healthCheck.ts — celovitost, tuji ključi, osiroteli artefakti │
│  └─ Nadzorna plošča: /dashboard/health                        │
├──────────────────────────────────────────────────────────────┤
│  Raven 2: Stanje ponudnikov (odpornost posameznih ponudnikov) │
│  ├─ providerHealthAutopilot.ts — odklopnik, obdobja mirovanja │
│  ├─ providerHealthMatrix.ts — ocene stanja po ponudniku/modelu │
│  └─ Nadzorna plošča: /dashboard/providers                     │
├──────────────────────────────────────────────────────────────┤
│  Raven 3: Opazljivost v živo (posnetki izvajanja)             │
│  ├─ observability.ts — odklopniki, seje, kvota                │
│  ├─ tokenHealthCheck.ts — stanje osveževanja žetonov OAuth    │
│  └─ Orodja MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Strani nadzorne plošče

### `/dashboard/health` (Stanje sistema)

Nadzorna plošča stanja najvišje ravni prikazuje:

| Razdelek                | Kaj prikazuje                                                  |
| ----------------------- | -------------------------------------------------------------- |
| **Stanje strežnika**    | Čas delovanja, različico, vrata, aktivne povezave              |
| **Zbirka podatkov**     | Povezavo, celovitost, velikost WAL, nedavne migracije          |
| **Povzetek ponudnikov** | Število aktivnih in zdravih ponudnikov ter odprtih odklopnikov |
| **Nadzorniki kvot**     | Aktivne seje, opozorila, izčrpane kvote                        |
| **Nedavne napake**      | Zadnjih 10 napak s sledmi sklada                               |
| **Poraba virov**        | Pomnilnik, CPE, kazalnik obremenitve kopice                    |

### `/dashboard/providers` (Stanje ponudnikov)

Nadzorna plošča za posamezne ponudnike:

| Stolpec   | Opis                                                         |
| --------- | ------------------------------------------------------------ |
| Ponudnik  | ID ponudnika + prikazno ime                                  |
| Stanje    | Zeleno/rumeno/rdeče stanje                                   |
| Odklopnik | Odprto/zaprto/polodprto stanje                               |
| Povezave  | Število povezav, zadnja osvežitev                            |
| Modeli    | Razpoložljivi modeli, stanje posameznega modela              |
| Stroški   | Današnji stroški, 7-dnevni trend                             |
| Napake    | Število napak v zadnjih 24 urah, najpogostejši razred napake |

Kliknite ponudnika, da si ogledate:

- Nedavne zahteve z razčlenitvijo zakasnitev
- Ocene stanja posameznih povezav
- Blokade posameznih modelov
- Priporočila samodejnega upravljanja

### `/dashboard/quota` (Sledenje kvotam)

Za vsak ključ API:

- Trenutna poraba glede na omejitev (vrstica napredka)
- Trend kvote (30-dnevni grafikon)
- Čas naslednje ponastavitve
- Zgodovina opozoril

### `/dashboard/combos` (Stanje kombinacij)

Za vsako kombinacijo:

- Strategija + cilji
- Stanje posameznega cilja
- Nedavni dogodki preklopa na nadomestno možnost
- Stopnja uspešnosti (24 ur, 7 dni, 30 dni)

---

## Pregled zdravja API

OmniRoute razkriva** dva** HTTP zdravstvene površine. Niso zamenljivi za orkestratorje.

| Pot                          | Namen                                                                   | Teža                                         | Uporabite za                                                                    |
| ---------------------------- | ----------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------- |
| `GET /healthz`               | Življenjski cikel liveness/readiness (`ok` / `starting` / `stopping`)   | Trivialno (samo fazna zastavica)             | Kubernetes** pripravljenost** ; mehko** živahnost** če morate uporabiti HTTP    |
| `GET /api/monitoring/health` | Povzetek ponudnika globokega sistema + (DB, heap, kataloško število, …) | Težko (sinhronizacija DB / spremljanje dela) | Nadzorne plošče, globoka preverjanja črne škatle, vgrajen pregled stanja Docker |

> **Opomba:** Zdravstvene matrike ponudnika, težave z avtopilotom, nadzorniki kvot, stanje žetona in podrobnosti o zakasnitvi zunaj `/api/monitoring/health` so na voljo prek** orodje MCP** `observability_snapshot` ali** armaturna plošča** strani — zanje ni namenskih poti REST.

Obe trasi potekata po** ista zanka dogodkov Node** kot obravnava zahtevkov. Pot, vezana na CPE (veliko delo kataloga `GET /v1/models`, stiskanje dolgega konteksta/štetje žetonov), lahko povzroči zamudo** vse** HTTP, vključno z `/healthz`. Zaseden proces ≠ z zanko dogodkov je mrtev. Raje popravi prašiča; uravnavanje sonde samo zmanjša lažne uboje.

### Lahka orkestrska sonda

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok`, ko bo faza življenjskega cikla strežnika pripravljena
- **503** + `starting` / `stopping` med zagonom ali zaustavitvijo
- Izvedba: `src/app/healthz/route.ts` (brez DB pinga)

### Zdravje sistema (globoko)

```bash
GET /api/monitoring/health
```

odgovor:

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

#### `credentialHealth`: probe-cache proti SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` je** merilnik predpomnilnika sonde v pomnilniku** , ne izpis `provider_connections.test_status` v živo. Za #12532 se pot zahteve bere samo `getCachedCredentialHealthSummary()` ; sonde v ozadju osvežijo predpomnilnik iz zanke dogodkov.

| Plast                           | kje                                                                   | Kaj to pomeni                                                                                                                                                                                                          |
| ------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Probe-cache merilnik            | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Zadnji rezultati preverjanja stanja poverilnice so še vedno v pomnilniku procesa. `source` je vedno `probe-cache`.                                                                                                     |
| Podrobnosti o neuspeli povezavi | `credentialHealth.failedConnections`                                  | Prisoten** samo ko `failed > 0`** . Omejen seznam vrstic predpomnilnika z `status=error` (`connectionId`, `status`, prečiščeno `lastError` / `lastErrorType`). `failedOmitted` je nastavljen, ko je bil seznam omejen. |
| lepljivo stanje SQLite          | `credentialHealth.staleDbNonOkCount`                                  | štetje** aktivna** (`is_active=1`) povezovalne vrstice, katerih vztrajni `test_status` je znano, da ni v redu (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                       |

Obe plasti se lahko namenoma ne strinjata:

- Izmerite `failed=0` medtem ko ima `staleDbNonOkCount>0` — SQLite še vedno lepljiv `test_status` (na primer `expired` ali `credits_exhausted`), da najnovejši posnetek predpomnilnika sonde ne šteje kot `status=error`.
- Merilnik `failed>0` medtem ko je SQLite videti zdrav — nedavna sonda ni uspela in je predpomnjena; vrstica DB ni bila posodobljena ali pa je bila pozneje izbrisana.

Pri strganju te končne točke ne opozarjajte samo na `provider_connections.test_status`. Uporabite `failed` + `failedConnections` za napake sonde v živo in `staleDbNonOkCount`, ko potrebujete stalno štetje lepljivega stanja.

### Priporočila sonde Kubernetes

OmniRoute je a** postopek z enim vozliščem** (ena zanka dogodkov). Stock Docker `HEALTHCHECK` cilja na lahek `/healthz`. `/api/monitoring/health` je** pretežka** za intervale kubelet liveness.

| Sonda               | Priporočen cilj                                                                       | Opombe                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Zagon**           | HTTP `GET /healthz` z dolgim `failureThreshold` (ali velikim `startPeriod`)           | Migracija + SQLite pri hladnem zagonu lahko traja več kot nekaj sekund                                                                                                                                                                                                                                                                           |
| **Pripravljenost**  | HTTP `GET /healthz`                                                                   | Življenjski cikel `ok` / `starting` / `stopping` (200 proti 503). Še vedno zaviha, če je zanka blokirana s strani procesorja. A** 200 v več sekundah ni zdravo** (#10303) — to pomeni, da je bila zanka dogodkov izčrpana, preden se je zagnal 3-bajtni upravljalnik                                                                             |
| **Živahnost**       | HTTP `GET /livez`,** ali TCP** na glavnih servisnih vratih (`PORT`, privzeto `20128`) | `/livez` je samo procesno živ (vedno 200, če se izvaja upravljavec). Še vedno si deli zanko dogodkov — busy ≠ dead in ne zaznava stradanja zanke dogodkov (#10303) nič bolje kot TCP. Raje**TCP** če sonde HTTP pretečejo pod obremenitvijo catalog/compression ; narediti** ne** tako ali tako ubijte pod na kratkih stojnicah z zanko dogodkov |
| **Globoko zdravje** | `GET /api/monitoring/health` iz zunanjega preverjalnika                               | Ni za kubelet `livenessProbe` / tight `readinessProbe`                                                                                                                                                                                                                                                                                           |

Primer oblike (prilagodite pragove svojemu hladnemu zagonu in obremenitvi stiskanja):

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

**ne** točka kubelet** živahnost** pri `/api/monitoring/health`. Ta pot dejansko deluje DB/monitoring in bo pod obremenitvijo lažno pozitivna.

Povezano: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (sondiranje, medtem ko je zanka dogodkov zasedena), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (povečanje cen kataloga), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (vprašanje števila žetonov stiskanja).

### nadzorni pes systemd (zamrznjena zanka dogodkov)

Na gostitelju systemd OmniRoute sporoči upravitelju storitev, ko je pripravljen, in ga še naprej pinga, tako da se strežnik, katerega zanka dogodkov se je zataknila, uniči in znova zažene, namesto da bi ostal pokonci in tiho. Pingi prihajajo iz lastne zanke dogodkov strežnika: ko blokirajo, se ustavijo in systemd znova zažene storitev, ko `WatchdogSec` mine brez enega.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) s tem že piše uporabniško enoto. Enota, ki jo napišete sami (privzeti `Type=simple`), ne dobi nadzornika, zato dodajte te vrstice v njen razdelek `[Service]` :

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Ustvarjena enota nastavi `Restart=on-failure`, zato dodajte tudi to vrstico — brez nje čuvaj samo ubije zataknjeno storitev, namesto da bi jo znova zagnal.

- `Type=notify`: storitev se "zažene", ko strežnik pošlje `READY=1`, ne ko se proces razcepi. `TimeoutStartSec` omejuje počasen začetek.
- `NotifyAccess=all`: pinge pošilja strežniški proces, ki je podrejeni nadzorniku `omniroute serve`.
- `WatchdogSec`: pingi gredo vsakih 60 sekund, zato uporabite** 120 ali več** . Manjše vrednosti bi znova zagnale zdrav strežnik.
- Zaženite `omniroute serve` v ospredju. `--daemon` loči strežnik od cgroup enote in rokovanje obveščanja se nikoli ne zaključi.

Preverite, ali je aktiven po ponovnem zagonu:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` prikazuje konfigurirano zakasnitev in `WatchdogTimestamp` se premakne naprej vsako minuto. Ponovni zagon, ki ga povzroči pes čuvaj, se zabeleži kot `Result=watchdog`. Če želite izklopiti pinge in ohraniti enoto takšno, kot je, nastavite `OMNIROUTE_DISABLE_SD_NOTIFY=1`; brez `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) se ne pošlje nič.

Watchdog samo preverja, ali se zanka dogodkov še naprej izvaja. Strežnik, ki je počasen, vendar še vedno deluje, se ne zažene znova.

### Izbirno delo na poti zahtev (spomin, veščine, osvežitev žetonov)

Ekstrakcija pomnilnika, vnos veščin in osvežitev žetona OAuth delijo** zanka dogodkov glavnega vozlišča** z `/healthz`. To so funkcije za preklop nadzorne plošče (`memoryEnabled`, `skillsEnabled`), ne skupina delavcev. Glejte [Okolje — event-loop cost](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Zdravje ponudnika

> **Ni končne točke REST.** Zdravstveni podatki ponudnika so na voljo prek orodja MCP `observability_snapshot` ali strani nadzorne plošče `/dashboard/providers`.

### Podatki o ponudniku

> **Ni končne točke REST.** Podrobnosti po ponudnikih so na voljo na strani `/dashboard/providers` nadzorne plošče.

---

## Samodejno upravljanje zdravja ponudnikov

Modul `providerHealthAutopilot.ts` je **samozdravilni sistem**, ki:

1. Zaznava težave ponudnikov (odprto vezje, obdobja ohlajanja, blokade, opozorila glede kvote)
2. Ustvarja **priporočena dejanja** za njihovo odpravljanje
3. Po želji **samodejno izvede** dejanja z nizkim tveganjem

### Zaznane vrste težav

| Vrsta težave                 | Resnost   | Primer pogoja                              |
| ---------------------------- | --------- | ------------------------------------------ |
| `provider_circuit_open`      | kritična  | Odklopnik odprt po 5 napakah               |
| `provider_circuit_half_open` | opozorilo | Vezje preizkuša obnovitev                  |
| `connection_cooldown`        | opozorilo | Povezava v obdobju ohlajanja po napaki 429 |
| `stale_connection_error`     | opozorilo | Zadnja osvežitev ni uspela pred 30+ min    |
| `terminal_connection_error`  | kritična  | OAuth preklican, ključ ni veljaven         |
| `inactive_connection`        | obvestilo | Povezava onemogočena v nastavitvah         |
| `model_lockout`              | opozorilo | Določen model v karanteni                  |
| `quota_monitor_warning`      | opozorilo | Poraba kvote je 80 % ali več               |

### Ustvarjene vrste dejanj

| Dejanje                        | Tveganje | Opis                                      |
| ------------------------------ | -------- | ----------------------------------------- |
| `clear_provider_breaker`       | srednje  | Ponastavi odklopnik vezja v zaprto stanje |
| `clear_connection_cooldown`    | nizko    | Odstrani obdobje ohlajanja povezave       |
| `clear_stale_connection_error` | nizko    | Počisti zastavico zastarele napake        |
| `clear_model_lockout`          | nizko    | Znova omogoči model v karanteni           |
| `reactivate_connection`        | srednje  | Znova omogoči deaktivirano povezavo       |
| `deactivate_connection`        | visoko   | Onemogoči problematično povezavo          |

### API

> **Ni končne točke REST.** Težave samodejnega upravljanja so na voljo prek orodja MCP `observability_snapshot` ali nadzorne plošče. Samodejno upravljanje se izvaja interno; njegovo vedenje se konfigurira prek podatkovne zbirke z nastavitvami (polje `autopilotMode` za posamezno povezavo), ne prek spremenljivk okolja — `grep -rn` za spremenljivko okolja načina samodejnega upravljanja ne vrne nobenega zadetka.

### Način samodejnega upravljanja

Samodejno upravljanje privzeto deluje v **ročnem načinu** — zaznava težave in ustvarja priporočena dejanja, vendar jih ne uporabi samodejno. Dejanja je mogoče uporabiti prek nadzorne plošče.

---

## Samodejno upravljanje zdravja kombinacij

`comboHealthAutopilot.ts` je ustreznik samodejnega upravljanja ponudnikov, namenjen **posebej kombinacijam**. Izvaja naslednje:

- Zaznava nezdrave kombinacije
- Priporoča preurejanje ciljev
- Predlaga onemogočanje nedelujočih ciljev
- Po N napakah samodejno odstrani nedelujoče cilje

### Primeri težav s kombinacijami

```
Kombinacija "always-on" (strategija prednostnega vrstnega reda)
├─ Cilj 1: openai/gpt-5 (zdrav)
├─ Cilj 2: anthropic/claude-opus-4-6 (⚠️ model blokiran do 14:00)
└─ Cilj 3: kiro/claude-sonnet-4-5 (zdrav)

Priporočeno dejanje: Preuredi — premakni kiro nad anthropic, dokler blokada ne poteče
```

---

## Nadzorniki kvot

`observability.ts` zagotavlja **nadzornike kvot za posamezne seje** za naročniške ponudnike (Claude Code, Codex, GitHub Copilot):

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

### Pomeni stanj

| Stanje      | Kdaj                          | Dejanje uporabniškega vmesnika                      |
| ----------- | ----------------------------- | --------------------------------------------------- |
| `starting`  | Začetno preverjanje poteka    | Kazalnik nalaganja                                  |
| `idle`      | Ni nedavne dejavnosti         | Skrito na nadzorni plošči                           |
| `healthy`   | Preostaja več kot 50 % kvote  | Zelena pika                                         |
| `warning`   | Preostaja manj kot 50 % kvote | Rumeno opozorilo                                    |
| `exhausted` | Kvota = 0 %                   | Rdeča blokada, preusmeritev k naslednjemu ponudniku |
| `error`     | Preverjanje ni uspelo         | Rdeča pika, kmalu ponovi poskus                     |

### API

> **Ni končne točke REST.** Podatki nadzornika kvot so na voljo prek orodja MCP `observability_snapshot` ali nadzorne plošče.

---

## Posnetek opazljivosti

Orodje MCP `observability_snapshot` vrne **popoln posnetek sistema** za agente umetne inteligence:

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
  "quotaMonitors": {/* glejte zgoraj */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agenti to uporabljajo za sprejemanje **odločitev o usmerjanju** — na primer: »če je vezje openai odprto, najprej usmeri na anthropic«.

---

## Preverjanje veljavnosti žetonov

Ponudniki OAuth (Claude Code, GitHub Copilot, Cursor) potrebujejo **periodično osveževanje žetonov**. `src/lib/tokenHealthCheck.ts` izvaja razporejevalnik v ozadju:

- **Cikel pregledovanja**: vsakih 60 sekund (pregledovanje v `TICK_MS = 60 * 1000` na `src/lib/tokenHealthCheck.ts:30`)
- **Interval preverjanja veljavnosti posamezne povezave**: privzeto 60 minut (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); nastavljivo prek podatkovne zbirke nastavitev
- **Preventivna osvežitev ob 401**: obravnava jo prestreznik posamezne povezave

### Stanje veljavnosti žetona

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

### Konfiguracija

Konfiguracijo preverjanja veljavnosti žetonov interno upravlja `tokenHealthCheck.ts`.

### Veljavnost žetonov

> **Ni končne točke REST.** Podatki o veljavnosti žetonov so na voljo prek nadzorne plošče ali orodja MCP `observability_snapshot`.

---

## Opozarjanje

### Vgrajeni kanali

OmniRoute podpira **3 kanale za opozorila**:

| Kanal                  | Nastavitev       | Primer uporabe                   |
| ---------------------- | ---------------- | -------------------------------- |
| Pasica nadzorne plošče | Vedno vklopljeno | Obvestila znotraj aplikacije     |
| Webhook                | Nastavite URL    | Slack, Discord, PagerDuty        |
| Dnevnik                | Privzeto         | Za zunanje združevanje dnevnikov |

### Konfiguracija webhooka

> **Opomba:** Konfiguracija opozarjanja prek webhooka se upravlja na strani z nastavitvami nadzorne plošče. V uporabniškem vmesniku nastavitev lahko določite URL webhooka, filtriranje dogodkov in prilagajanje koristne vsebine.

### Vrste opozoril

| Opozorilo                    | Kdaj                                          | Privzeta resnost |
| ---------------------------- | --------------------------------------------- | ---------------- |
| `provider_circuit_open`      | Vezje se odpre                                | kritično         |
| `provider_circuit_half_open` | Vezje preizkuša obnovitev                     | informativno     |
| `quota_warning`              | Kvota doseže 80 % ali več                     | opozorilo        |
| `quota_exhausted`            | Kvota doseže 100 %                            | kritično         |
| `token_refresh_failed`       | 3 ali več zaporednih neuspešnih osvežitev     | opozorilo        |
| `token_expired`              | Žetonu poteče veljavnost                      | kritično         |
| `combo_target_unhealthy`     | Kombinirani cilj je v ohlajanju 1 uro ali več | opozorilo        |
| `db_integrity_warning`       | Kršitve FK > 0                                | opozorilo        |
| `heap_pressure`              | Uporaba kopice > 80 % praga                   | opozorilo        |

---

## Meritve zmogljivosti

### Spremljane metrike

| Metrika                 | Vrsta     | Vir                             |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | števec    | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | števec    | `services/usage.ts`             |
| `cost_usd`              | števec    | `services/usage.ts`             |
| `provider_errors`       | števec    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | števec    | `services/resilience.ts`        |
| `cache_hits`            | števec    | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | merilnik  | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | merilnik  | `observability.ts`              |

### Percentili zakasnitve (p50/p95/p99)

> **Ni končne točke REST.** Podatki o percentilih zakasnitve so na voljo na strani nadzorne plošče `/dashboard/health`. Izvoz v Prometheus/OpenTelemetry je načrtovan za v3.9.

### Izvoz v Prometheus / OpenTelemetry (2. faza)

Za v3.9 je načrtovan izvorni izvoz v Prometheus, OpenTelemetry in Datadog.

Za zdaj pridobivajte podatke iz `/api/monitoring/health` s katerim koli sistemom za nadzor, ki temelji na HTTP (Prometheus blackbox exporter, preverjanje HTTP v Datadog itd.).

---

## Recepti za opozarjanje

### Slack

> **Opomba:** Opozarjanje prek webhooka se konfigurira na strani z nastavitvami nadzorne plošče — namenskih okoljskih spremenljivk za webhook ni (`grep -rn` ne vrne nobenega zadetka). V uporabniškem vmesniku nastavitev določite URL webhooka, filtriranje dogodkov in prilagoditev koristne vsebine.

### Discord

> Opozarjanje prek webhooka uporablja enak postopek v uporabniškem vmesniku nastavitev kot Slack. Discord sprejema enako obliko koristne vsebine JSON.

### PagerDuty

> Opozarjanje prek webhooka uporablja enak postopek v uporabniškem vmesniku nastavitev. Usmerjevalni ključi za PagerDuty Events API v2 se konfigurirajo v uporabniškem vmesniku nastavitev.

### Webhook po meri (JSON)

> Delovala bo katera koli končna točka HTTP, ki sprejema zahteve POST s telesom JSON. URL konfigurirajte v uporabniškem vmesniku nastavitev.

---

## Konfiguracija nadzorne plošče

### Prilagoditev nadzorne plošče stanja

Ustvarite `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Pripenjanje ponudnika na vrh

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Odpravljanje težav

### »Ponudnik je prikazan kot zdrav, vendar zahteve ne uspejo«

1. Preverite **težave avtopilota** — morda je model zaklenjen
2. V razdelku **nedavne napake** poiščite določen razred napake
3. Poskusite **preskus povezave** na kartici ponudnika
4. Preverite, ali je ponudnik **omejil hitrost na izvorni strani** (lokalno ni vidno)

### »Kvota je prikazana kot zdrava, vendar prejemam napake 429«

- 429 pomeni, da ponudnik sporoča, da ste porabili svojo kvoto
- Spremljanje kvote v OmniRoute je morda **zastarelo** — merodajni so podatki ponudnika na izvorni strani
- Podatki o kvoti se samodejno osvežujejo prek notranjega nadzornika kvote

### »Kombinacija ne deluje, vendar so vsi cilji videti zdravi«

- Na nadzorni plošči preverite **stanje kombinacije** glede težav z vrstnim redom ciljev
- Oglejte si **dogodke preklopa na nadomestno možnost** — kombinacija morda prehitro izčrpa vse možnosti
- Preverite, ali **strategija** ustreza vašemu primeru uporabe (prednostna, krožna ali samodejna)

### »Preverjanje stanja zbirke podatkov ne uspe«

- Zaženite `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Če je rezultat »ok« — gre za lažni alarm, preverjanje stanja je prestrogo
- Če je rezultat kar koli drugega — **ustavite OmniRoute** in sledite [vodniku za obnovitev po nesreči](./DATABASE_GUIDE.md#disaster-recovery)

### »Pritisk na pomnilniško kopico je kritičen«

```bash
# Preverite trenutno kopico
node -e "console.log(process.memoryUsage())"

# Ročno sprožite GC (če je uporabljen --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Zmanjšajte število sočasnih zahtev (nastavite na strani z nastavitvami nadzorne plošče, ne prek okoljske spremenljivke)
# Okoljska spremenljivka `MAX_CONCURRENT_REQUESTS` ne obstaja — nastavitev določite v Nastavitve → Sočasnost.
```

---

## Glejte tudi

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — spremljanje uporabe in stroškov
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — shema zbirke podatkov in stanje
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — stanje posredniškega strežnika (ločen predpomnilnik)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — arhitektura sistema
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — podrobnosti o prekinjevalniku tokokroga
- Izvorna koda: `src/lib/monitoring/` (4 datoteke, 2121 vrstic kode)
