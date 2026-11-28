# Monitoring & Observability Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: Az OmniRoute beépített állapotfigyelést, szolgáltatói autopilotot, kvótakövetést és megfigyelhetőségi hookokat tartalmaz. Ez az útmutató az irányítópultot, a riasztásokat és a hibaelhárítást ismerteti.

**Források:**

- `src/lib/monitoring/observability.ts` — megfigyelhetőségi pillanatkép
- `src/lib/monitoring/comboHealthAutopilot.ts` — kombinációállapot-autopilot
- `src/lib/monitoring/providerHealthAutopilot.ts` — szolgáltatói autopilot
- `src/lib/monitoring/providerHealthMatrix.ts` — szolgáltatói állapotmátrix
- `src/lib/localHealthCheck.ts` — helyi állapot-ellenőrzés
- `src/lib/tokenHealthCheck.ts` — tokenfrissítés állapota
- `src/lib/proxyHealth.ts` — proxyállapot-gyorsítótár (a PROXY_GUIDE.md ismerteti)

---

## Áttekintés

Az OmniRoute **3 megfigyelési réteggel** rendelkezik:

```
┌──────────────────────────────────────────────────────────────┐
│  1. réteg: Rendszerállapot (szerverszintű)                    │
│  ├─ localHealthCheck.ts — adatbázis, portok, natív függőségek │
│  ├─ db/healthCheck.ts — integritás, FK-k, árva összetevők      │
│  └─ Irányítópult: /dashboard/health                           │
├──────────────────────────────────────────────────────────────┤
│  2. réteg: Szolgáltatói állapot (szolgáltatónkénti ellenállás)│
│  ├─ providerHealthAutopilot.ts — áramkör-megszakító, várakozások│
│  ├─ providerHealthMatrix.ts — állapotpontszámok szolgáltató/modell szerint│
│  └─ Irányítópult: /dashboard/providers                        │
├──────────────────────────────────────────────────────────────┤
│  3. réteg: Élő megfigyelhetőség (futásidejű pillanatképek)    │
│  ├─ observability.ts — áramkör-megszakítók, munkamenetek, kvóta│
│  ├─ tokenHealthCheck.ts — OAuth-tokenfrissítés állapota       │
│  └─ MCP-eszközök: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Irányítópult-oldalak

### `/dashboard/health` (Rendszerállapot)

A legfelső szintű állapot-irányítópult a következőket jeleníti meg:

| Szakasz                    | Mit jelenít meg                                                         |
| -------------------------- | ----------------------------------------------------------------------- |
| **Szerver állapota**       | Üzemidő, verzió, port, aktív kapcsolatok                                |
| **Adatbázis**              | Kapcsolat, integritás, WAL-méret, legutóbbi migrációk                   |
| **Szolgáltatói összesítő** | Aktívak száma, kifogástalan állapotúak száma, nyitott megszakítók száma |
| **Kvótafigyelők**          | Aktív munkamenetek, riasztási állapot, kimerített kvóták                |
| **Legutóbbi hibák**        | Az utolsó 10 hiba veremkövetéssel                                       |
| **Erőforrás-használat**    | Memória, CPU, halomterhelés-jelző                                       |

### `/dashboard/providers` (Szolgáltatói állapot)

Szolgáltatónkénti irányítópult:

| Oszlop      | Leírás                                                    |
| ----------- | --------------------------------------------------------- |
| Szolgáltató | Szolgáltatói azonosító + megjelenítési név                |
| Állapot     | Zöld/sárga/piros állapot                                  |
| Áramkör     | Nyitott/zárt/félig nyitott állapot                        |
| Kapcsolatok | Kapcsolatok száma, legutóbbi frissítés                    |
| Modellek    | Elérhető modellek, modellenkénti állapot                  |
| Költség     | Mai költség, 7 napos trend                                |
| Hibák       | Az elmúlt 24 óra hibáinak száma, leggyakoribb hibaosztály |

Kattintson egy szolgáltatóra a következők megtekintéséhez:

- Legutóbbi kérések késleltetési bontással
- Kapcsolatonkénti állapotpontszámok
- Modellenkénti kizárások
- Autopilot-ajánlások

### `/dashboard/quota` (Kvótakövetés)

Minden API-kulcs esetén:

- Aktuális használat a korláthoz viszonyítva (folyamatjelző sáv)
- Kvótatrend (30 napos diagram)
- Következő visszaállítás időpontja
- Riasztási előzmények

### `/dashboard/combos` (Kombinációk állapota)

Kombinációnként:

- Stratégia + célok
- Célonkénti állapot
- Legutóbbi tartalékra váltási események
- Sikerességi arány (24 óra, 7 nap, 30 nap)

---

## állapotfelmérés API

OmniRoute kiteszi** két** HTTP egészségügyi felületek. Nem cserélhetők fel a hangszerelők számára.

| Útvonal                      | Cél                                                                        | Súly                                             | Használja                                                                      |
| ---------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------ |
| `GET /healthz`               | Életciklus liveness/readiness (`ok` / `starting` / `stopping`)             | Triviális (csak fázisjelző)                      | Kubernetes** készenlét** ; puha** elevenség** ha HTTP kell használnia          |
| `GET /api/monitoring/health` | Mélyrendszerű + -szolgáltató összefoglalója (DB, kupac, katalógusszámok,…) | Nehéz ( DB szinkronizálása / megfigyelési munka) | Irányítópultok, blackbox mélyellenőrzések, Docker beépített állapotellenőrzése |

> **Jegyzet:** A szolgáltatói állapotmátrixok, az autopilot-problémák, a kvótafigyelők, a token állapota és `/api/monitoring/health` túli késleltetési részletek elérhetők a**MCP eszköz** `observability_snapshot` vagy a** műszerfal** oldalak — nincsenek dedikált REST útvonalak ezekhez.

Mindkét útvonal a** ugyanaz a Node eseményhurok** kéréskezelésként. A CPU-hoz kötött útvonal (nagy `GET /v1/models` katalógusmunka, hosszú kontextusú tömörítés / token számlálás) késleltetheti** minden** HTTP kezelők, beleértve `/healthz`. Az eseményhurok foglalt ≠ folyamata leállt. Inkább rögzítse a disznót; A szonda hangolása csak csökkenti a hamis ölések számát.

### Könnyű hangszerelő szonda

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` ha a szerver életciklus fázisa készen áll
- **503** + `starting` / `stopping` rendszerindítás vagy leállítás közben
- Megvalósítás: `src/app/healthz/route.ts` (nincs DB ping)

### Rendszer állapota (mély)

```bash
GET /api/monitoring/health
```

Válasz:

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

`GET /api/monitoring/health` → `credentialHealth` az** a memóriában lévő próba-gyorsítótár mérőeszköz** , nem a `provider_connections.test_status` élő dumpja. #12532 után a kérés elérési útja csak `getCachedCredentialHealthSummary()` olvassa; háttérpróbák frissítik a gyorsítótárat az eseményhurokból.

| Réteg                          | Ahol                                                                  | Mit jelent                                                                                                                                                                                                                                      |
| ------------------------------ | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Probe-cache mérő               | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Az utolsó hitelesítő adatok-egészségügyi vizsgálat eredményei még mindig a folyamatmemóriában vannak tárolva. `source` mindig `probe-cache`.                                                                                                    |
| Sikertelen kapcsolat részletei | `credentialHealth.failedConnections`                                  | Jelenlegi** csak amikor `failed > 0`** . A gyorsítótár-sorok korlátozott listája `status=error` (`connectionId`, `status`, megtisztított `lastError` / `lastErrorType`). `failedOmitted` akkor van beállítva, amikor a lista felső határa volt. |
| SQLite ragadós állapot         | `credentialHealth.staleDbNonOkCount`                                  | Száma** aktív** (`is_active=1`) kapcsolódási sorok, amelyek megmaradt `test_status` je ismert nem-ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                                                         |

A két réteg szándékosan nem érthet egyet:

- Mérje meg `failed=0`, míg `staleDbNonOkCount>0` — SQLite ben még mindig van egy ragadós `test_status` (például `expired` vagy `credits_exhausted`), amely miatt a legutóbbi próba-gyorsítótár pillanatfelvétel nem számít `status=error` nak.
- Mérje meg `failed>0` miközben SQLite egészségesnek tűnik. — Egy nemrégiben végzett vizsgálat meghiúsult, és gyorsítótárban van; a DB sort nem frissítették, vagy később törölték.

Ennek a végpontnak a lekaparásakor ne csak `provider_connections.test_status` ra figyeljen. Használja `failed` + `failedConnections` az élő szondahiba esetén, és `staleDbNonOkCount` ha a tartós ragadós állapot számlálására van szüksége.

### Kubernetes szonda ajánlásai

OmniRoute egy** egyetlen csomópontos folyamat** (egy eseményhurok). Stock Docker `HEALTHCHECK` a könnyű `/healthz` célozza meg. `/api/monitoring/health` az** túl nehéz** kubelet elevenségi intervallumokhoz.

| Szonda            | Ajánlott cél                                                                         | Megjegyzések                                                                                                                                                                                                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Indítás**       | HTTP `GET /healthz` hosszú `failureThreshold` (vagy nagy `startPeriod`)              | Hidegindítás + SQLite migráció meghaladhatja néhány másodpercet                                                                                                                                                                                                                                                                                 |
| **Készenlét**     | HTTP `GET /healthz`                                                                  | Életciklus `ok` / `starting` / `stopping` (200 vs 503). Továbbra is csapkod, ha a hurok CPU-blokkolt. A** 200 másodperc alatt nem egészséges** (#10303) — azt jelenti, hogy az eseményhurok ki lett éhezve, mielőtt a 3 bájtos kezelő futott volna                                                                                              |
| **Életesség**     | HTTP `GET /livez`,** vagy TCP** a fő szervizporton (`PORT`, alapértelmezett `20128`) | `/livez` csak folyamatban van (mindig 200, ha a kezelő fut). Továbbra is megosztja a — busy ≠ dead eseményhurkot, és nem érzékeli jobban az eseményhurok éhezést (#10303), mint TCP. Inkább**TCP** ha HTTP szondák időtúllépése catalog/compression terhelés alatt; csináld** nem** öld meg a pod rövid eseményhurkos standokon bármelyik módon |
| **Mély egészség** | `GET /api/monitoring/health` külső ellenőrzőből                                      | Nem a kubelet `livenessProbe` / szűk `readinessProbe` számára                                                                                                                                                                                                                                                                                   |

Példaforma (igazítsa a küszöbértékeket a hidegindítási és kompressziós terheléshez):

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

**Nem** pont kubelet** elevenség** a `/api/monitoring/health`. Ez az elérési út valódi DB/monitoring munkát végez, és terhelés alatt hamis pozitív lesz.

Kapcsolódó: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (vizsgálat, amíg az eseményhurok foglalt), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (katalógus árképzési hog), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (tömörítési token-számláló hog).

### systemd watchdog (lefagyott eseményhurok)

A rendszeres gazdagépen OmniRoute közli a szolgáltatásmenedzserrel, ha készen áll, és folyamatosan pingeli, így az eseményhurok elakadt kiszolgálója megsemmisül és újraindul, ahelyett, hogy csendben maradna. A pingek a szerver saját eseményhurkából származnak: amikor az blokkol, leállnak, és a systemd újraindítja a szolgáltatást, ha `WatchdogSec` eltelik anélkül.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) ezzel már felhasználói egységet ír. A saját maga által írt egység (az alapértelmezett `Type=simple`) nem kap figyelőt, ezért adja hozzá a következő sorokat `[Service]` szakaszához:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

A generált egység beállítja `Restart=on-failure`, ezért add hozzá azt a sort is — nélküle a watchdog csak megöli az elakadt szolgáltatást ahelyett, hogy újraindítaná.

- `Type=notify`: a szolgáltatás akkor "indul el", amikor a szerver elküldi `READY=1`, nem pedig akkor, amikor a folyamat elágazik. `TimeoutStartSec` lassú indítást határol.
- `NotifyAccess=all`: a pingeket a szerver folyamat küldi, amely a `omniroute serve` felügyelő gyermeke.
- `WatchdogSec`: a pingek 60 másodpercenként kialszanak, ezért használd** 120 vagy több** . A kisebb értékek újraindítanák az egészséges szervert.
- Futtassa `omniroute serve` az előtérben. `--daemon` leválasztja a szervert az egység cgroupjáról, és az értesítési kézfogás soha nem fejeződik be.

Ellenőrizze, hogy újraindítás után aktív-e:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` mutatja a beállított késleltetést, és `WatchdogTimestamp` percenként halad előre. A watchdog által okozott újraindítás `Result=watchdog` ként kerül rögzítésre. A ping kikapcsolásához, miközben a készüléket a jelenlegi állapotában szeretné megtartani, állítsa be `OMNIROUTE_DISABLE_SD_NOTIFY=1`; `NOTIFY_SOCKET` nélkül (terminál, Docker, Electron, Windows) nem kerül elküldésre semmi.

A watchdog csak azt ellenőrzi, hogy az eseményhurok folyamatosan fut-e. A lassú, de még mindig forgó szerver nem indul újra.

### Választható kérési útvonal munka (memória, készségek, token frissítése)

Memóriakivonás, készségek beillesztése és OAuth token frissítése megosztja a** fő Node eseményhurok** `/healthz` vel. Ezek a műszerfal-váltó funkciók (`memoryEnabled`, `skillsEnabled`), nem egy dolgozói csoport. Lásd: [Környezetvédelem — eseményhurok költsége](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Szolgáltató egészsége

> **Nincs REST végpont.** A szolgáltató állapotára vonatkozó adatok a MCP eszköz `observability_snapshot` vagy az irányítópult `/dashboard/providers` oldalon keresztül érhetők el.

### Szolgáltató adatai

> **Nincs REST végpont.** A szolgáltatónkénti részletek az irányítópult `/dashboard/providers` oldalán érhetők el.

---

## Szolgáltató-állapot Autopilot

A `providerHealthAutopilot.ts` modul egy **öngyógyító rendszer**, amely:

1. Észleli a szolgáltatói problémákat (nyitott áramkör-megszakító, várakozási időszakok, kizárások, kvótafigyelmeztetések)
2. **Javasolt műveleteket** generál a megoldásukhoz
3. Opcionálisan **automatikusan végrehajtja** az alacsony kockázatú műveleteket

### Észlelt problématípusok

| Probléma típusa              | Súlyosság      | Példafeltétel                                       |
| ---------------------------- | -------------- | --------------------------------------------------- |
| `provider_circuit_open`      | kritikus       | Az áramkör-megszakító 5 hiba után kinyílt           |
| `provider_circuit_half_open` | figyelmeztetés | Az áramkör helyreállításának tesztelése             |
| `connection_cooldown`        | figyelmeztetés | A kapcsolat 429-es hiba után várakozik              |
| `stale_connection_error`     | figyelmeztetés | A legutóbbi frissítés több mint 30 perce sikertelen |
| `terminal_connection_error`  | kritikus       | Visszavont OAuth, érvénytelen kulcs                 |
| `inactive_connection`        | információ     | A kapcsolat le van tiltva a beállításokban          |
| `model_lockout`              | figyelmeztetés | Egy adott modell karanténban van                    |
| `quota_monitor_warning`      | figyelmeztetés | A kvótakihasználtság legalább 80%                   |

### Generált művelettípusok

| Művelet                        | Kockázat | Leírás                                               |
| ------------------------------ | -------- | ---------------------------------------------------- |
| `clear_provider_breaker`       | közepes  | Az áramkör-megszakító visszaállítása zárt állapotba  |
| `clear_connection_cooldown`    | alacsony | A várakozási időszak eltávolítása egy kapcsolatról   |
| `clear_stale_connection_error` | alacsony | Az elavult hibajelző törlése                         |
| `clear_model_lockout`          | alacsony | Egy karanténba helyezett modell újbóli engedélyezése |
| `reactivate_connection`        | közepes  | Egy deaktivált kapcsolat újbóli engedélyezése        |
| `deactivate_connection`        | magas    | Egy problémás kapcsolat letiltása                    |

### API

> **Nincs REST-végpont.** Az Autopilot problémái az `observability_snapshot` MCP-eszközön vagy az irányítópulton keresztül érhetők el. Az Autopilot belsőleg fut; a működése a beállítási adatbázison keresztül konfigurálható (kapcsolatonkénti `autopilotMode` mező), nem környezeti változókkal — az Autopilot mód környezeti változójára futtatott `grep -rn` nulla találatot ad vissza.

### Autopilot mód

Az Autopilot alapértelmezés szerint **kézi módban** működik — észleli a problémákat és javasolt műveleteket generál, de nem alkalmazza őket automatikusan. A műveletek az irányítópulton keresztül alkalmazhatók.

---

## Kombinációállapot-Autopilot

A `comboHealthAutopilot.ts` a szolgáltatói Autopilot **kombinációspecifikus** megfelelője. A következőket végzi:

- Észleli a nem megfelelő állapotú kombinációkat
- Javaslatot tesz a célok átrendezésére
- Javasolja a hibás célok letiltását
- N hiba után automatikusan eltávolítja a működésképtelen célokat

### Példák kombinációs problémákra

```
"always-on" kombináció (prioritási stratégia)
├─ 1. cél: openai/gpt-5 (megfelelő állapotú)
├─ 2. cél: anthropic/claude-opus-4-6 (⚠️ modellkizárás 14:00-ig)
└─ 3. cél: kiro/claude-sonnet-4-5 (megfelelő állapotú)

Javasolt művelet: Átrendezés — a kizárás lejártáig helyezze a kiro szolgáltatót az anthropic fölé
```

---

## Kvótafigyelők

Az `observability.ts` **munkamenetenkénti kvótafigyelőket** tesz elérhetővé az előfizetéses szolgáltatókhoz (Claude Code, Codex, GitHub Copilot):

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

### Az állapotok jelentése

| Állapot     | Mikor                                | Felhasználói felületi művelet                       |
| ----------- | ------------------------------------ | --------------------------------------------------- |
| `starting`  | A kezdeti lekérdezés folyamatban van | Folyamatjelző                                       |
| `idle`      | Nincs közelmúltbeli aktivitás        | Elrejtve az irányítópultról                         |
| `healthy`   | A kvóta több mint 50%-a megmaradt    | Zöld pont                                           |
| `warning`   | A kvóta kevesebb mint 50%-a maradt   | Sárga riasztás                                      |
| `exhausted` | Kvóta = 0%                           | Piros blokk, átirányítás a következő szolgáltatóhoz |
| `error`     | A lekérdezés sikertelen              | Piros pont, hamarosan újrapróbálkozás               |

### API

> **Nincs REST-végpont.** A kvótafigyelők adatai az `observability_snapshot` MCP-eszközön vagy az irányítópulton keresztül érhetők el.

---

## Megfigyelhetőségi pillanatkép

Az `observability_snapshot` MCP-eszköz **teljes rendszer-pillanatképet** ad vissza az AI-ügynökök számára:

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
  "quotaMonitors": {/* lásd fent */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Az ügynökök ezt **útválasztási döntésekhez** használják — például: „ha az openai áramköre nyitva van, először az anthropic felé irányíts”.

---

## Tokenállapot-ellenőrzés

Az OAuth-szolgáltatóknál (Claude Code, GitHub Copilot, Cursor) **rendszeres tokenfrissítésre** van szükség. A `src/lib/tokenHealthCheck.ts` egy háttérben futó ütemezőt működtet:

- **Ellenőrzési ciklus**: 60 másodpercenként (a ciklus értéke `TICK_MS = 60 * 1000` a `src/lib/tokenHealthCheck.ts:30` helyen)
- **Kapcsolatonkénti állapot-ellenőrzési időköz**: alapértelmezés szerint 60 perc (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); a beállítási adatbázison keresztül konfigurálható
- **Megelőző frissítés 401-es válasz esetén**: a kapcsolatonkénti interceptor kezeli

### Tokenállapot

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

### Konfiguráció

A tokenállapot-ellenőrzés konfigurációját a `tokenHealthCheck.ts` belsőleg kezeli.

### Tokenállapot

> **Nincs REST-végpont.** A tokenállapot adatai az irányítópulton vagy az `observability_snapshot` MCP-eszközön keresztül érhetők el.

---

## Riasztások

### Beépített csatornák

Az OmniRoute **3 riasztási csatornát** támogat:

| Csatorna              | Beállítás         | Felhasználási terület           |
| --------------------- | ----------------- | ------------------------------- |
| Irányítópult szalagja | Mindig aktív      | Alkalmazáson belüli értesítések |
| Webhook               | URL konfigurálása | Slack, Discord, PagerDuty       |
| Napló                 | Alapértelmezett   | Külső napló-aggregációhoz       |

### Webhook konfigurációja

> **Megjegyzés:** A webhook-riasztások konfigurációja az irányítópult Beállítások oldalán kezelhető. A webhook URL-jével, az eseményszűréssel és az adatcsomag testreszabásával kapcsolatban tekintse meg a Beállítások felhasználói felületét.

### Riasztástípusok

| Riasztás                     | Mikor                                                      | Alapértelmezett súlyosság |
| ---------------------------- | ---------------------------------------------------------- | ------------------------- |
| `provider_circuit_open`      | Az áramkör megnyílik                                       | kritikus                  |
| `provider_circuit_half_open` | Az áramkör teszteli a helyreállást                         | információ                |
| `quota_warning`              | A kvóta eléri vagy meghaladja a 80%-ot                     | figyelmeztetés            |
| `quota_exhausted`            | A kvóta eléri a 100%-ot                                    | kritikus                  |
| `token_refresh_failed`       | Legalább 3 egymást követő sikertelen frissítés             | figyelmeztetés            |
| `token_expired`              | A token lejárt                                             | kritikus                  |
| `combo_target_unhealthy`     | A kombinált cél legalább 1 órája várakozási állapotban van | figyelmeztetés            |
| `db_integrity_warning`       | Az idegenkulcs-sértések száma > 0                          | figyelmeztetés            |
| `heap_pressure`              | A halomhasználat meghaladja a küszöbérték 80%-át           | figyelmeztetés            |

---

## Teljesítménymutatók

### Nyomon követett mutatók

| Mutató                  | Típus      | Forrás                          |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | számláló   | `services/usage.ts`             |
| `request_latency_ms`    | hisztogram | `services/usage.ts`             |
| `tokens_consumed`       | számláló   | `services/usage.ts`             |
| `cost_usd`              | számláló   | `services/usage.ts`             |
| `provider_errors`       | számláló   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | számláló   | `services/resilience.ts`        |
| `cache_hits`            | számláló   | `services/signatureCache.ts`    |
| `compression_savings`   | hisztogram | `services/compression/stats.ts` |
| `quota_used`            | mérő       | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | mérő       | `observability.ts`              |

### Késleltetési percentilisek (p50/p95/p99)

> **Nincs REST-végpont.** A késleltetési percentilisek adatai az irányítópult `/dashboard/health` oldalán érhetők el. A Prometheus-/OpenTelemetry-export a v3.9 verzióra van tervezve.

### Prometheus-/OpenTelemetry-export (2. fázis)

A v3.9 verzióra tervezve: natív export Prometheus, OpenTelemetry és Datadog rendszerekbe.

Addig is kérdezze le az `/api/monitoring/health` végpontot bármilyen HTTP-alapú monitorozórendszerrel (Prometheus blackbox exporter, Datadog HTTP-ellenőrzés stb.).

---

## Riasztási receptek

### Slack

> **Megjegyzés:** A webhook-riasztások az irányítópult Beállítások oldalán konfigurálhatók — nincsenek dedikált webhook-környezeti változók (a `grep -rn` nulla találatot ad vissza). A webhook URL-jét, az eseményszűrést és az adatcsomag testreszabását a Beállítások felhasználói felületén találja.

### Discord

> A webhook-riasztások ugyanazon a Beállítások felhasználói felületén konfigurálhatók, mint a Slack esetében. A Discord ugyanazt a JSON-adatcsomag-formátumot fogadja el.

### PagerDuty

> A webhook-riasztások ugyanazon a Beállítások felhasználói felületén konfigurálhatók. A PagerDuty Events API v2 útválasztási kulcsai a Beállítások felhasználói felületén állíthatók be.

### Egyéni webhook (JSON)

> Bármely olyan HTTP-végpont használható, amely JSON-törzzsel rendelkező POST-kéréseket fogad. Az URL-t a Beállítások felhasználói felületén konfigurálja.

---

## Az irányítópult konfigurálása

### Az állapot-irányítópult testreszabása

Hozzon létre egy `~/.omniroute/dashboard.json` fájlt:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Szolgáltató rögzítése felülre

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Hibaelhárítás

### „A szolgáltató szerint minden rendben van, de a kérések sikertelenek”

1. Ellenőrizze az **autopilot problémáit** — lehetséges, hogy egy modell zárolva van
2. Tekintse meg a **legutóbbi hibákat** az adott hibaosztályhoz
3. Próbálja ki a **kapcsolati tesztet** a szolgáltatói kártyán
4. Ellenőrizze, hogy a szolgáltató **nem korlátozza-e a kérések gyakoriságát a felsőbb szinten** (helyileg nem látható)

### „A kvóta állapota megfelelő, de 429-es hibákat látok”

- A 429 azt jelenti, hogy a szolgáltató szerint felhasználta a kvótáját
- Az OmniRoute kvótakövetése **elavult** lehet — a szolgáltató felsőbb szintű adatai az irányadók
- A kvótaadatokat a belső kvótafigyelő automatikusan frissíti

### „A kombináció sikertelen, de minden cél állapota megfelelőnek tűnik”

- Ellenőrizze a **kombináció állapotát** megjelenítő irányítópulton, hogy vannak-e problémák a célok sorrendjével
- Tekintse meg a **tartalékra váltási eseményeket** — lehetséges, hogy a kombináció túl gyorsan kimeríti a lehetőségeket
- Ellenőrizze, hogy a **stratégia** megfelel-e a használati esetének (prioritásos, ciklikus vagy automatikus)

### „Az adatbázis állapotellenőrzése sikertelen”

- Futtassa a következőt: `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Ha az eredmény „ok” — téves riasztás, az állapotellenőrzés túl szigorú
- Ha bármi más — **állítsa le az OmniRoute-ot**, és kövesse a [vészhelyzeti helyreállítási útmutatót](./DATABASE_GUIDE.md#disaster-recovery)

### „A memóriahalom terhelése kritikus”

```bash
# Az aktuális halom ellenőrzése
node -e "console.log(process.memoryUsage())"

# Kézi GC indítása (ha --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# A párhuzamos kérések számának csökkentése (az irányítópult Beállítások oldalán állítható be, nem környezeti változóval)
# Nincs `MAX_CONCURRENT_REQUESTS` környezeti változó — a Beállítások → Párhuzamosság menüpontban konfigurálja.
```

---

## Lásd még

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — használat- és költségkövetés
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — adatbázisséma + állapot
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy állapota (külön gyorsítótár)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — rendszerarchitektúra
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — az áramkör-megszakító részletei
- Forrás: `src/lib/monitoring/` (4 fájl, 2121 kódsor)
