# Monitoring & Observability Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

title: "Przewodnik monitorowania i obserwowalności"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Przewodnik monitorowania i obserwowalności

> **TL;DR**: OmniRoute dostarcza wbudowane monitorowanie kondycji, autopilota providerów, śledzenie limitów (quota) oraz haki obserwowalności. Ten przewodnik obejmuje dashboard, alerty i rozwiązywanie problemów.

**Źródła:**

- `src/lib/monitoring/observability.ts` — migawka obserwowalności
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot kondycji combo
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot providerów
- `src/lib/monitoring/providerHealthMatrix.ts` — macierz kondycji providerów
- `src/lib/localHealthCheck.ts` — lokalny health check
- `src/lib/tokenHealthCheck.ts` — kondycja odświeżania tokenów
- `src/lib/proxyHealth.ts` — cache kondycji proxy (opisany w PROXY_GUIDE.md)

---

## Przegląd

OmniRoute ma **3 warstwy monitorowania**:

```
┌──────────────────────────────────────────────────────────────┐
│  Warstwa 1: Kondycja systemu (poziom serwera)                 │
│  ├─ localHealthCheck.ts — DB, porty, natywne zależności       │
│  ├─ db/healthCheck.ts — integralność, FK, osierocone artefakty│
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Warstwa 2: Kondycja providerów (odporność per provider)      │
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldowny   │
│  ├─ providerHealthMatrix.ts — wyniki kondycji per provider/model │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Warstwa 3: Live obserwowalność (migawki runtime)             │
│  ├─ observability.ts — circuit breakery, sesje, quota         │
│  ├─ tokenHealthCheck.ts — kondycja odświeżania tokenów OAuth  │
│  └─ Narzędzia MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Strony dashboardu

### `/dashboard/health` (Kondycja systemu)

Dashboard kondycji najwyższego poziomu pokazuje:

| Sekcja                      | Co pokazuje                                              |
| --------------------------- | -------------------------------------------------------- |
| **Status serwera**          | Uptime, wersja, port, aktywne połączenia                 |
| **Baza danych**             | Połączenie, integralność, rozmiar WAL, ostatnie migracje |
| **Podsumowanie providerów** | Liczba aktywnych, zdrowych, otwartych breakerów          |
| **Monitory quota**          | Aktywne sesje, alertujące, wyczerpane                    |
| **Ostatnie błędy**          | Ostatnie 10 błędów ze stack trace                        |
| **Zużycie zasobów**         | Pamięć, CPU, wskaźnik ciśnienia heapa                    |

### `/dashboard/providers` (Kondycja providerów)

Dashboard per provider:

| Kolumna     | Opis                                  |
| ----------- | ------------------------------------- |
| Provider    | ID providera + nazwa wyświetlana      |
| Health      | Status zielony/żółty/czerwony         |
| Circuit     | Stan open/closed/half-open            |
| Connections | Liczba połączeń, ostatnie odświeżenie |
| Models      | Dostępne modele, kondycja per model   |
| Cost        | Dzisiejszy koszt, trend 7-dniowy      |
| Errors      | Liczba błędów z 24h, top klasa błędu  |

Kliknij providera, aby zobaczyć:

- Ostatnie żądania z rozbiciem latencji
- Wyniki kondycji per połączenie
- Lockouty per model
- Rekomendacje autopilota

### `/dashboard/quota` (Śledzenie limitów)

Dla każdego klucza API:

- Bieżące użycie vs limit (pasek postępu)
- Trend quota (wykres 30-dniowy)
- Czas następnego resetu
- Historia alertów

### `/dashboard/combos` (Kondycja combo)

Per combo:

- Strategia + cele (targets)
- Kondycja per target
- Ostatnie zdarzenia fallback
- Wskaźnik sukcesu (24h, 7d, 30d)

---

## Kontrola stanu zdrowia API

OmniRoute eksponuje** dwa** powierzchnie zdrowotne HTTP. Nie są one wymienne w przypadku orkiestratorów.

| Ścieżka                      | Zamiar                                                                      | Waga                                            | Użyj dla                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `GET /healthz`               | Cykl życia liveness/readiness (`ok` / `starting` / `stopping`)              | Trywialne (tylko flaga fazy)                    | Kubernetes** gotowość** ; miękki** żywotność** jeśli musisz użyć HTTP                    |
| `GET /api/monitoring/health` | Podsumowanie dostawcy głębokiego systemu + (DB, sterta, liczba katalogów,…) | Ciężki (synchronizacja DB / praca monitorująca) | Pulpity nawigacyjne, głębokie kontrole czarnej skrzynki, wbudowana kontrola stanu Docker |

> **Notatka:** Matryce kondycji dostawcy, problemy z autopilotem, monitory przydziałów, stan tokenów i szczegóły opóźnień poza `/api/monitoring/health` są dostępne za pośrednictwem** narzędzie MCP** `observability_snapshot` lub** panel** na stronach — nie ma dla nich dedykowanych tras REST.

Obie trasy biegną ul** ta sama pętla zdarzeń węzła** jako obsługa żądań. Ścieżka związana z procesorem (obsługa dużego katalogu `GET /v1/models`, kompresja długiego kontekstu/liczenie tokenów) może powodować opóźnienia** Wszystko** procedury obsługi HTTP, w tym `/healthz`. Zajęty proces ≠ w pętli zdarzeń, martwy. Wolę naprawiać wieprz; strojenie sondy zmniejsza jedynie liczbę fałszywych zabójstw.

### Lekka sonda orkiestracyjna

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` gdy faza cyklu życia serwera jest gotowa
- **503** + `starting` / `stopping` podczas uruchamiania lub zamykania
- Implementacja: `src/app/healthz/route.ts` (bez pingu DB )

### Stan systemu (głęboki)

```bash
GET /api/monitoring/health
```

Odpowiedź:

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

#### `credentialHealth`: pamięć podręczna sondy vs SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` to** wskaźnik sondy-pamięci podręcznej w pamięci** , a nie żywy zrzut `provider_connections.test_status`. Po #12532 ścieżka żądania brzmi tylko `getCachedCredentialHealthSummary()` ; sondy w tle odświeżają pamięć podręczną poza pętlą zdarzeń.

| Warstwa                           | Gdzie                                                                 | Co to znaczy                                                                                                                                                                                                                                      |
| --------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wskaźnik pamięci podręcznej sondy | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Wyniki ostatniego sondy kondycji poświadczeń są nadal przechowywane w pamięci procesu. `source` jest zawsze `probe-cache`.                                                                                                                        |
| Szczegóły nieudanego połączenia   | `credentialHealth.failedConnections`                                  | Obecny** tylko wtedy, gdy `failed > 0`** . Ograniczona lista wierszy pamięci podręcznej za pomocą `status=error` (`connectionId`, `status`, sanitized `lastError` / `lastErrorType`). `failedOmitted` jest ustawione, gdy lista była ograniczona. |
| SQLite status przyklejenia        | `credentialHealth.staleDbNonOkCount`                                  | Liczba** aktywny** (`is_active=1`) wiersze połączeń, których utrwalony `test_status` jest znanym nie-ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                                                        |

Obie warstwy mogą celowo się nie zgadzać:

- Zmierz `failed=0` podczas gdy `staleDbNonOkCount>0` — SQLite nadal ma lepkie `test_status` (na przykład `expired` lub `credits_exhausted`), że najnowszy obraz migawki pamięci podręcznej sondy nie liczy się jako `status=error`.
- Zmierz `failed>0` podczas gdy SQLite wygląda zdrowo. — ostatnia sonda nie powiodła się i jest przechowywana w pamięci podręcznej; wiersz DB nie został zaktualizowany lub został później wyczyszczony.

Nie ostrzegaj wyłącznie o `provider_connections.test_status` podczas skrobania tego punktu końcowego. Użyj `failed` + `failedConnections` w przypadku awarii sondy na żywo i `staleDbNonOkCount`, gdy potrzebujesz licznika trwałego statusu.

### Zalecenia dotyczące sondy Kubernetes

OmniRoute jest** proces pojedynczego węzła** (jedna pętla zdarzeń). Stock Docker `HEALTHCHECK` celuje w lekki `/healthz`. `/api/monitoring/health` jest** zbyt ciężki** dla przedziałów żywotności kubelet.

| Sonda                | Zalecany cel                                                                            | Notatki                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Uruchomienie**     | HTTP `GET /healthz` z długim `failureThreshold` (lub dużym `startPeriod`)               | Migracja + SQLite na zimno może trwać dłużej niż kilka sekund                                                                                                                                                                                                                                                                                                                 |
| **Gotowość**         | HTTP `GET /healthz`                                                                     | Cykl życia `ok` / `starting` / `stopping` (200 vs 503). Nadal trzepocze, jeśli pętla jest zablokowana przez procesor. A** 200 w ciągu wielu sekund nie jest zdrowe** (#10303) — oznacza to, że pętla zdarzeń została wyłączona przed uruchomieniem 3-bajtowej procedury obsługi                                                                                               |
| **Żywotność**        | HTTP `GET /livez`,** lub TCP** na głównym porcie serwisowym (`PORT`, domyślnie `20128`) | `/livez` jest aktywny tylko w procesie (zawsze 200, jeśli działa procedura obsługi). Nadal współdzieli pętlę zdarzeń — busy ≠ dead i nie wykrywa głodzenia pętli zdarzeń (#10303) lepiej niż TCP. Woleć**TCP** jeśli przekroczono limit czasu sond HTTP pod obciążeniem catalog/compression ; Do** nie** tak czy inaczej zabij kapsułę na krótkich straganach z pętlą zdarzeń |
| **Głębokie zdrowie** | `GET /api/monitoring/health` z zewnętrznego kontrolera                                  | Nie dla kubelet `livenessProbe` /tight `readinessProbe`                                                                                                                                                                                                                                                                                                                       |

Przykładowy kształt (dostosuj progi do obciążenia zimnego rozruchu i sprężania):

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

**Nie** punkt Kubelet** żywotność** w `/api/monitoring/health`. Ta ścieżka działa naprawdę DB/monitoring i będzie fałszywie dodatnia pod obciążeniem.

Powiązane: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (sonduje, gdy pętla zdarzeń jest zajęta), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (wieprz cenowy w katalogu), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (wieprz liczący tokeny kompresji).

### systemd watchdog (zamrożona pętla zdarzeń)

Na hoście systemowym OmniRoute informuje menedżera usług, kiedy jest gotowy, i ciągle go pinguje, więc serwer, którego pętla zdarzeń się zawiesiła, zostaje zabity i uruchomiony ponownie, zamiast pozostać nieaktywny i cichy. Pingi pochodzą z własnej pętli zdarzeń serwera: gdy się blokuje, zatrzymują się, a systemd ponownie uruchamia usługę, gdy `WatchdogSec` upłynie bez niej.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) zapisuje już w ten sposób jednostkę użytkownika. Jednostka, którą sam napiszesz (domyślnie `Type=simple`) nie ma watchdoga, więc dodaj te linie do jej sekcji `[Service]` :

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Wygenerowana jednostka ustawia `Restart=on-failure`, więc dodaj również tę linię — bez niej watchdog tylko zabija zablokowaną usługę zamiast ją ponownie uruchamiać.

- `Type=notify`: usługa jest „uruchamiana”, gdy serwer wysyła `READY=1`, a nie wtedy, gdy proces się rozwidla. `TimeoutStartSec` ogranicza powolny start.
- `NotifyAccess=all`: pingi są wysyłane przez proces serwera, który jest dzieckiem nadzorcy `omniroute serve`.
- `WatchdogSec`: pingi wychodzą co 60 sekund, więc używaj** 120 lub więcej** . Mniejsze wartości spowodują ponowne uruchomienie sprawnego serwera.
- Uruchom `omniroute serve` na pierwszym planie. `--daemon` odłącza serwer od grupy cgroup jednostki, a uzgadnianie powiadamiania nigdy się nie kończy.

Sprawdź, czy jest aktywny po ponownym uruchomieniu:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` pokazuje skonfigurowane opóźnienie, a `WatchdogTimestamp` przesuwa się do przodu co minutę. Ponowne uruchomienie spowodowane przez watchdog jest rejestrowane jako `Result=watchdog`. Aby wyłączyć pingi, pozostawiając urządzenie w niezmienionym stanie, ustaw `OMNIROUTE_DISABLE_SD_NOTIFY=1`; bez `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) nic nie jest wysyłane.

Watchdog sprawdza tylko, czy pętla zdarzeń nadal działa. Serwer, który działa powoli, ale nadal się uruchamia, nie jest uruchamiany ponownie.

### Opcjonalna praca na ścieżce żądania (pamięć, umiejętności, odświeżanie tokena)

Ekstrakcja pamięci, zastrzyk umiejętności i odświeżanie tokena OAuth udostępniają** główna pętla zdarzeń węzła** z `/healthz`. Są to funkcje przełączania pulpitu nawigacyjnego (`memoryEnabled`, `skillsEnabled`), a nie pula procesów roboczych. Zobacz [Koszt pętli zdarzeń w środowisku —](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Zdrowie dostawcy

> **Brak punktu końcowego REST.** Dane dotyczące kondycji dostawcy są dostępne za pośrednictwem narzędzia MCP `observability_snapshot` lub strony `/dashboard/providers` na pulpicie nawigacyjnym.

### Szczegóły dostawcy

> **Brak punktu końcowego REST.** Szczegóły dotyczące poszczególnych dostawców są dostępne na stronie `/dashboard/providers` w panelu kontrolnym.

---

## Autopilot kondycji providerów

Moduł `providerHealthAutopilot.ts` to **system samonaprawczy**, który:

1. Wykrywa problemy providerów (otwarty circuit, cooldowny, lockouty, ostrzeżenia quota)
2. Generuje **zalecane akcje** w celu ich rozwiązania
3. Opcjonalnie **auto-wykonuje** akcje niskiego ryzyka

### Wykrywane typy problemów

| Rodzaj problemu              | Severity | Przykładowy warunek                          |
| ---------------------------- | -------- | -------------------------------------------- |
| `provider_circuit_open`      | critical | Circuit breaker otwarty po 5 niepowodzeniach |
| `provider_circuit_half_open` | warning  | Circuit testuje odzyskiwanie                 |
| `connection_cooldown`        | warning  | Połączenie w cooldownie po 429               |
| `stale_connection_error`     | warning  | Ostatnie odświeżenie nieudane 30+ minut temu |
| `terminal_connection_error`  | critical | OAuth odwołany, klucz nieprawidłowy          |
| `inactive_connection`        | info     | Połączenie wyłączone w ustawieniach          |
| `model_lockout`              | warning  | Konkretny model w kwarantannie               |
| `quota_monitor_warning`      | warning  | Quota na 80%+ użycia                         |

### Generowane typy akcji

| Akcja                          | Ryzyko | Opis                                         |
| ------------------------------ | ------ | -------------------------------------------- |
| `clear_provider_breaker`       | medium | Reset circuit breakera do stanu closed       |
| `clear_connection_cooldown`    | low    | Usunięcie cooldownu z połączenia             |
| `clear_stale_connection_error` | low    | Wyczyszczenie flagi nieaktualnego błędu      |
| `clear_model_lockout`          | low    | Ponowne włączenie modelu w kwarantannie      |
| `reactivate_connection`        | medium | Ponowne włączenie dezaktywowanego połączenia |
| `deactivate_connection`        | high   | Wyłączenie problematycznego połączenia       |

### API

> **Brak endpointu REST.** Problemy autopilota są dostępne przez narzędzie MCP `observability_snapshot` lub dashboard. Autopilot działa wewnętrznie; jego zachowanie konfiguruje się przez settings DB (pole `autopilotMode` per połączenie), a nie zmienne środowiskowe — `grep -rn` dla env var trybu autopilota zwraca zero trafień.

### Tryb autopilota

Autopilot domyślnie działa w **trybie ręcznym** — wykrywa problemy i generuje zalecane akcje, ale nie stosuje ich automatycznie. Akcje można zastosować przez dashboard.

---

## Autopilot kondycji combo

`comboHealthAutopilot.ts` to **odpowiednik specyficzny dla combo** autopilota providerów. On:

- Wykrywa niezdrowe combo
- Rekomenduje zmianę kolejności targetów
- Sugeruje wyłączenie zepsutych targetów
- Auto-usuwa martwe targety po N niepowodzeniach

### Przykłady problemów combo

```
Combo "always-on" (priority strategy)
├─ Target 1: openai/gpt-5 (healthy)
├─ Target 2: anthropic/claude-opus-4-6 (⚠️ model lockout until 14:00)
└─ Target 3: kiro/claude-sonnet-4-5 (healthy)

Recommended action: Reorder — move kiro above anthropic until lockout expires
```

---

## Monitory quota

`observability.ts` udostępnia **monitory quota per sesja** dla providerów subskrypcyjnych (Claude Code, Codex, GitHub Copilot):

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

### Znaczenie statusów

| Status      | Kiedy                     | Akcja UI                                      |
| ----------- | ------------------------- | --------------------------------------------- |
| `starting`  | Trwa początkowy poll      | Spinner                                       |
| `idle`      | Brak niedawnej aktywności | Ukryty na dashboardzie                        |
| `healthy`   | Pozostało > 50% quota     | Zielona kropka                                |
| `warning`   | Pozostało < 50% quota     | Żółty alert                                   |
| `exhausted` | Quota = 0%                | Czerwony blok, routuj do następnego providera |
| `error`     | Polling nieudany          | Czerwona kropka, ponów wkrótce                |

### API

> **Brak endpointu REST.** Dane monitora quota są dostępne przez narzędzie MCP `observability_snapshot` lub dashboard.

---

## Migawka obserwowalności

Narzędzie MCP `observability_snapshot` zwraca **pełną migawkę systemu** dla agentów AI:

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
  "quotaMonitors": {/* patrz wyżej */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agenci wykorzystują ją do podejmowania **decyzji dotyczących routingu** — na przykład: „jeśli obwód openai jest otwarty, najpierw skieruj żądanie do anthropic”.

---

## Health check tokenów

Providery OAuth (Claude Code, GitHub Copilot, Cursor) potrzebują **okresowego odświeżania tokenów**. `src/lib/tokenHealthCheck.ts` uruchamia scheduler w tle:

- **Tick sweep**: co 60 sekund (sweep w `TICK_MS = 60 * 1000` w `src/lib/tokenHealthCheck.ts:30`)
- **Interwał health check per połączenie**: domyślnie 60 minut (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); konfigurowalny przez settings DB
- **Wyprzedzające odświeżenie przy 401**: obsługiwane przez interceptor per połączenie

### Status kondycji tokenu

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

### Konfiguracja

Konfiguracja health check tokenów jest obsługiwana wewnętrznie przez `tokenHealthCheck.ts`.

### Kondycja tokenów

> **Brak endpointu REST.** Dane kondycji tokenów są dostępne przez dashboard lub narzędzie MCP `observability_snapshot`.

---

## Alertowanie

### Wbudowane kanały

OmniRoute obsługuje **3 kanały alertów**:

| Kanał            | Konfiguracja    | Przypadek użycia               |
| ---------------- | --------------- | ------------------------------ |
| Dashboard banner | Zawsze włączony | Powiadomienia w aplikacji      |
| Webhook          | Skonfiguruj URL | Slack, Discord, PagerDuty      |
| Log              | Domyślny        | Do zewnętrznej agregacji logów |

### Konfiguracja webhooków

> **Uwaga:** Konfiguracja alertowania webhookami jest obsługiwana przez stronę Settings w dashboardzie. Zobacz UI Settings pod kątem URL webhooka, filtrowania zdarzeń i dostosowania payloadu.

### Typy alertów

| Alert                        | Kiedy                           | Domyślna severity |
| ---------------------------- | ------------------------------- | ----------------- |
| `provider_circuit_open`      | Circuit się otwiera             | critical          |
| `provider_circuit_half_open` | Circuit testuje odzyskiwanie    | info              |
| `quota_warning`              | Quota na 80%+                   | warning           |
| `quota_exhausted`            | Quota na 100%                   | critical          |
| `token_refresh_failed`       | 3+ kolejne nieudane odświeżenia | warning           |
| `token_expired`              | Token po wygaśnięciu            | critical          |
| `combo_target_unhealthy`     | Target combo w cooldownie 1h+   | warning           |
| `db_integrity_warning`       | Naruszenia FK > 0               | warning           |
| `heap_pressure`              | Użycie heapa > 80% progu        | warning           |

---

## Metryki wydajności

### Śledzone metryki

| Metryka                 | Typ       | Źródło                          |
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

### Percentyle latencji (p50/p95/p99)

> **Brak endpointu REST.** Dane percentyli latencji są dostępne przez stronę dashboardu `/dashboard/health`. Eksport Prometheus/OpenTelemetry jest planowany na v3.9.

### Eksport Prometheus / OpenTelemetry (Faza 2)

Planowane na v3.9: natywny eksport do Prometheus, OpenTelemetry, Datadog.

Na razie scrapuj `/api/monitoring/health` dowolnym systemem monitorowania opartym o HTTP (Prometheus blackbox exporter, Datadog HTTP check itd.).

---

## Przepisy alertowania

### Slack

> **Uwaga:** Alertowanie webhookami konfiguruje się przez stronę Settings w dashboardzie — nie ma dedykowanych env var webhooków (`grep -rn` zwraca zero trafień). Zobacz UI Settings pod kątem URL webhooka, filtrowania zdarzeń i dostosowania payloadu.

### Discord

> Alertowanie webhookami używa tego samego przepływu UI Settings co Slack. Discord akceptuje ten sam kształt payloadu JSON.

### PagerDuty

> Alertowanie webhookami używa tego samego przepływu UI Settings. Klucze routingu PagerDuty Events API v2 konfiguruje się w UI Settings.

### Własny webhook (JSON)

> Działa dowolny endpoint HTTP przyjmujący POST z ciałem JSON. Skonfiguruj URL w UI Settings.

---

## Konfiguracja dashboardu

### Dostosowanie dashboardu kondycji

Utwórz `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Przypięcie providera na górę

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Rozwiązywanie problemów

### „Provider pokazuje healthy, ale żądania padają”

1. Sprawdź **problemy autopilota** — może model jest zablokowany (lockout)
2. Spójrz na **ostatnie błędy** pod konkretną klasę błędu
3. Wypróbuj **test połączenia** na karcie providera
4. Sprawdź, czy provider jest **rate-limited upstream** (niewidoczne lokalnie)

### „Quota pokazuje healthy, a ja widzę 429”

- 429 oznacza, że provider twierdzi, iż wyczerpałeś limit
- Śledzenie quota w OmniRoute może być **nieaktualne** — prawda providera jest upstream
- Dane quota odświeżają się automatycznie przez wewnętrzny monitor quota

### „Combo pada, choć wszystkie targety wyglądają na healthy”

- Sprawdź dashboard **kondycji combo** pod kątem problemów z kolejnością targetów
- Spójrz na **zdarzenia fallback** — może combo wyczerpuje się zbyt szybko
- Zweryfikuj, czy **strategia** pasuje do przypadku użycia (priority vs round-robin vs auto)

### „Health check bazy danych nie przechodzi”

- Uruchom `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Jeśli "ok" — fałszywy alarm, health check jest zbyt rygorystyczny
- Jeśli cokolwiek innego — **zatrzymaj OmniRoute** i postępuj według [przewodnika disaster recovery](./DATABASE_GUIDE.md#disaster-recovery)

### „Ciśnienie heapa pamięci jest krytyczne”

```bash
# Check current heap
node -e "console.log(process.memoryUsage())"

# Trigger manual GC (if --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Reduce concurrent requests (set via the dashboard Settings page, not an env var)
# There is no `MAX_CONCURRENT_REQUESTS` env var — configure it in Settings → Concurrency.
```

---

## Zobacz też

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — śledzenie użycia i kosztów
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — schemat DB + kondycja
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — kondycja proxy (osobny cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — architektura systemu
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — szczegóły circuit breakera
- Źródło: `src/lib/monitoring/` (4 pliki, 2121 LOC)
