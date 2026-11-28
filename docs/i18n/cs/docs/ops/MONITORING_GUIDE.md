# Monitoring & Observability Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute obsahuje integrované monitorování stavu, autopilota poskytovatelů, sledování kvót a integrační body pro observabilitu. Tato příručka popisuje řídicí panel, upozornění a řešení problémů.

**Zdroje:**

- `src/lib/monitoring/observability.ts` — snímek observability
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot stavu kombinací
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot poskytovatelů
- `src/lib/monitoring/providerHealthMatrix.ts` — matice stavu poskytovatelů
- `src/lib/localHealthCheck.ts` — místní kontrola stavu
- `src/lib/tokenHealthCheck.ts` — stav obnovování tokenů
- `src/lib/proxyHealth.ts` — mezipaměť stavu proxy (popsáno v PROXY_GUIDE.md)

---

## Přehled

OmniRoute má **3 vrstvy monitorování**:

```
┌──────────────────────────────────────────────────────────────┐
│  Vrstva 1: Stav systému (na úrovni serveru)                   │
│  ├─ localHealthCheck.ts — DB, porty, nativní závislosti       │
│  ├─ db/healthCheck.ts — integrita, FK, osiřelé artefakty      │
│  └─ Řídicí panel: /dashboard/health                           │
├──────────────────────────────────────────────────────────────┤
│  Vrstva 2: Stav poskytovatelů (odolnost jednotlivých poskytovatelů) │
│  ├─ providerHealthAutopilot.ts — jistič, prodlevy             │
│  ├─ providerHealthMatrix.ts — skóre stavu podle poskytovatele/modelu │
│  └─ Řídicí panel: /dashboard/providers                        │
├──────────────────────────────────────────────────────────────┤
│  Vrstva 3: Živá observabilita (snímky za běhu)                │
│  ├─ observability.ts — jističe, relace, kvóty                 │
│  ├─ tokenHealthCheck.ts — stav obnovování tokenů OAuth        │
│  └─ Nástroje MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Stránky řídicího panelu

### `/dashboard/health` (Stav systému)

Hlavní řídicí panel stavu zobrazuje:

| Sekce                    | Co zobrazuje                                              |
| ------------------------ | --------------------------------------------------------- |
| **Stav serveru**         | Doba provozu, verze, port, aktivní připojení              |
| **Databáze**             | Připojení, integrita, velikost WAL, nedávné migrace       |
| **Souhrn poskytovatelů** | Počet aktivních, počet zdravých, počet otevřených jističů |
| **Monitory kvót**        | Aktivní relace, upozornění, vyčerpané kvóty               |
| **Nedávné chyby**        | Posledních 10 chyb se zásobníky volání                    |
| **Využití prostředků**   | Paměť, CPU, ukazatel zatížení haldy                       |

### `/dashboard/providers` (Stav poskytovatelů)

Řídicí panel jednotlivých poskytovatelů:

| Sloupec      | Popis                                                 |
| ------------ | ----------------------------------------------------- |
| Poskytovatel | ID poskytovatele + zobrazovaný název                  |
| Stav         | Zelený/žlutý/červený stav                             |
| Jistič       | Otevřený/zavřený/napůl otevřený stav                  |
| Připojení    | Počet připojení, poslední obnovení                    |
| Modely       | Dostupné modely, stav jednotlivých modelů             |
| Náklady      | Dnešní náklady, trend za 7 dní                        |
| Chyby        | Počet chyb za posledních 24 h, nejčastější třída chyb |

Kliknutím na poskytovatele zobrazíte:

- Nedávné požadavky s rozpisem latence
- Skóre stavu jednotlivých připojení
- Uzamčení jednotlivých modelů
- Doporučení autopilota

### `/dashboard/quota` (Sledování kvót)

Pro každý klíč API:

- Aktuální využití oproti limitu (ukazatel průběhu)
- Trend kvóty (graf za 30 dní)
- Čas dalšího resetování
- Historie upozornění

### `/dashboard/combos` (Stav kombinací)

Pro každou kombinaci:

- Strategie + cíle
- Stav jednotlivých cílů
- Nedávné události přepnutí na náhradní variantu
- Míra úspěšnosti (24 h, 7 d, 30 d)

---

## Kontrola stavu API

OmniRoute vystavuje** dva** HTTP zdravotní povrchy. Pro orchestrátory nejsou zaměnitelné.

| Cesta                        | Účel                                                                    | Hmotnost                                      | Použijte pro                                                                 |
| ---------------------------- | ----------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------- |
| `GET /healthz`               | Životní cyklus liveness/readiness (`ok` / `starting` / `stopping`)      | Triviální (pouze příznak fáze)                | Kubernetes** připravenost** ; měkký** živost** pokud musíte použít HTTP      |
| `GET /api/monitoring/health` | Podrobné shrnutí poskytovatele + systému (DB, halda, počty katalogů, …) | Těžký (synchronizace DB / monitorovací práce) | Řídicí panely, hloubkové kontroly blackboxu, vestavěná kontrola stavu Docker |

> **Poznámka:** Matrice zdravotního stavu poskytovatele, problémy s autopilotem, monitory kvót, stav tokenu a podrobnosti o latenci nad rámec `/api/monitoring/health` jsou k dispozici prostřednictvím** nástroj MCP** `observability_snapshot` nebo the** přístrojová deska** stránky — pro ně neexistují žádné vyhrazené trasy REST.

Obě trasy vedou na** stejná smyčka událostí uzlu** jako vyřízení požadavku. Cesta vázaná na CPU (velká práce s katalogem `GET /v1/models`, komprese dlouhého kontextu / počítání tokenů) může zpozdit** vše** obslužné nástroje HTTP, včetně `/healthz`. Proces ≠ je zaneprázdněn smyčkou událostí. Dávejte přednost upevnění prase; ladění sondy pouze snižuje falešná zabití.

### Lehká orchestrátorová sonda

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` když je fáze životního cyklu serveru připravena
- **503** + `starting` / `stopping` během spouštění nebo vypínání
- Implementace: `src/app/healthz/route.ts` (žádný DB ping)

### Stav systému (hluboký)

```bash
GET /api/monitoring/health
```

Odpověď:

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

`GET /api/monitoring/health` → `credentialHealth` je** in-memory probe-cache gauge** , není živý výpis `provider_connections.test_status`. Po #12532 cesta požadavku čte pouze `getCachedCredentialHealthSummary()` ; sondy na pozadí obnovují mezipaměť mimo smyčku událostí.

| Vrstva                             | Kde                                                                   | Co to znamená                                                                                                                                                                                                              |
| ---------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Měřidlo probe-cache                | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Poslední výsledky sondy stavu pověření jsou stále uloženy v paměti procesu. `source` je vždy `probe-cache`.                                                                                                                |
| Podrobnosti o neúspěšném připojení | `credentialHealth.failedConnections`                                  | Současnost** jen když `failed > 0`** . Ohraničený seznam řádků mezipaměti se `status=error` (`connectionId`, `status`, sanitizované `lastError` / `lastErrorType`). `failedOmitted` je nastaveno, když byl seznam uzavřen. |
| SQLite lepkavý stav                | `credentialHealth.staleDbNonOkCount`                                  | Počet** aktivní** (`is_active=1`) spojovací řádky, jejichž trvalé `test_status` je známé non-ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                                         |

Tyto dvě vrstvy se mohou záměrně neshodovat:

- Měřidlo `failed=0` zatímco `staleDbNonOkCount>0` — SQLite má stále lepivé `test_status` (například `expired` nebo `credits_exhausted`), které nejnovější snímek mezipaměti sondy nepočítá jako `status=error`.
- Měřítko `failed>0` zatímco SQLite vypadá v pořádku — nedávná sonda selhala a je uložena v mezipaměti; řádek DB nebyl aktualizován nebo byl později vymazán.

Při odstraňování tohoto koncového bodu neupozorňujte pouze na `provider_connections.test_status`. Použijte `failed` + `failedConnections` pro selhání živé sondy a `staleDbNonOkCount` když potřebujete trvalý počet stálých stavů.

### Doporučení sondy Kubernetes

OmniRoute je a** proces jednoho uzlu** (jedna smyčka událostí). Sklad Docker `HEALTHCHECK` cíle lehké `/healthz`. `/api/monitoring/health` je** příliš těžké** pro intervaly živosti kubelet.

| Sonda              | Doporučený cíl                                                                       | Poznámky                                                                                                                                                                                                                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Spuštění**       | HTTP `GET /healthz` s dlouhým `failureThreshold` (nebo velkým `startPeriod`)         | Studený start migrace + SQLite může přesáhnout několik sekund                                                                                                                                                                                                                                                                                             |
| **Připravenost**   | HTTP `GET /healthz`                                                                  | Životní cyklus `ok` / `starting` / `stopping` (200 vs 503). Stále klapky, pokud je smyčka blokována CPU. A** 200 za několik sekund není zdravé** (#10303) — znamená, že smyčka událostí byla vyhladověna před spuštěním 3bajtového ovladače                                                                                                               |
| **Živost**         | HTTP `GET /livez`,** nebo TCP** na hlavním servisním portu (`PORT`, výchozí `20128`) | `/livez` je aktivní pouze v procesu (vždy 200, pokud je handler spuštěn). Stále sdílí smyčku událostí — busy ≠ dead a nedetekuje hladovění smyčky událostí (#10303) o nic lépe než TCP. Preferuji**TCP** pokud vyprší časový limit sond HTTP při zatížení catalog/compression ; dělat** ne** zabíjejte modul na krátkých smyčkách událostí v obou směrech |
| **Hluboké zdraví** | `GET /api/monitoring/health` z externí kontroly                                      | Ne pro kubelet `livenessProbe` / těsné `readinessProbe`                                                                                                                                                                                                                                                                                                   |

Příklad tvaru (upravte prahové hodnoty podle zatížení při studeném startu a kompresi):

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

**Ne** bodový kubelet** živost** v `/api/monitoring/health`. Tato cesta skutečně funguje DB/monitoring a při zatížení bude falešně pozitivní.

Související: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (sondy, když je smyčka událostí zaneprázdněna), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (katalogové cenotvorba), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (svině počítání kompresních tokenů).

### systemd watchdog (zmrazená smyčka událostí)

Na hostiteli systemd OmniRoute řekne správci služeb, když je připraven, a pokračuje v pingování, takže server, jehož smyčka událostí se zasekla, bude zabit a restartován místo toho, aby zůstal vzhůru a mlčel. Pingy pocházejí z vlastní smyčky událostí serveru: když se zablokuje, zastaví se a systemd restartuje službu, jakmile `WatchdogSec` uplyne bez jednoho.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) již s tímto zapisuje uživatelskou jednotku. Jednotka, kterou napíšete sami (výchozí `Type=simple`), nemá žádného hlídacího psa, takže do její sekce `[Service]` přidejte tyto řádky:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Vygenerovaná jednotka nastavuje `Restart=on-failure`, takže přidejte i tento řádek — bez něj hlídací pes pouze zabije zaseknutou službu místo restartu.

- `Type=notify`: služba je „spuštěna“, když server odešle `READY=1`, nikoli když se proces rozvětvuje. `TimeoutStartSec` omezuje pomalý start.
- `NotifyAccess=all`: pingy jsou odesílány procesem serveru, který je potomkem správce `omniroute serve`.
- `WatchdogSec`: pingy odcházejí každých 60 sekund, tak použijte** 120 nebo více** . Menší hodnoty by restartovaly zdravý server.
- Spusťte `omniroute serve` v popředí. `--daemon` odpojí server od cgroup jednotky a oznamovací handshake se nikdy nedokončí.

Zkontrolujte, zda je po restartu aktivní:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` ukazuje nakonfigurované zpoždění a `WatchdogTimestamp` se posouvá vpřed každou minutu. Restart způsobený hlídacím psem je zaznamenán jako `Result=watchdog`. Chcete-li vypnout pingy a ponechat jednotku tak, jak je, nastavte `OMNIROUTE_DISABLE_SD_NOTIFY=1`; bez `NOTIFY_SOCKET` (terminál, Docker, Electron, Windows) se nic neodešle.

Hlídací pes pouze kontroluje, zda smyčka událostí stále běží. Server, který je pomalý, ale stále se točí, není restartován.

### Volitelná práce na cestě požadavku (paměť, dovednosti, obnovení tokenu)

Extrakce paměti, vkládání dovedností a obnovení tokenu OAuth sdílejí** smyčka událostí hlavního uzlu** se `/healthz`. Jsou to funkce přepínání na řídicím panelu (`memoryEnabled`, `skillsEnabled`), nikoli fond pracovníků. Viz [Environment — event-loop cost](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Zdraví poskytovatele

> **Žádný koncový bod REST.** Údaje o stavu poskytovatele jsou k dispozici prostřednictvím nástroje MCP `observability_snapshot` nebo stránky řídicího panelu `/dashboard/providers`.

### Detail poskytovatele

> **Žádný koncový bod REST.** Podrobnosti o jednotlivých poskytovatelích jsou k dispozici na stránce `/dashboard/providers` řídicího panelu.

---

## Autopilot stavu poskytovatelů

Modul `providerHealthAutopilot.ts` je **samoopravný systém**, který:

1. Zjišťuje problémy poskytovatelů (otevřený jistič, čekací doby, blokace, upozornění na kvóty)
2. Generuje **doporučené akce** k jejich vyřešení
3. Volitelně **automaticky provádí** akce s nízkým rizikem

### Zjišťované typy problémů

| Druh problému                | Závažnost | Příklad stavu                               |
| ---------------------------- | --------- | ------------------------------------------- |
| `provider_circuit_open`      | kritická  | Jistič otevřen po 5 selháních               |
| `provider_circuit_half_open` | varování  | Jistič testuje obnovení provozu             |
| `connection_cooldown`        | varování  | Připojení v čekací době po chybě 429        |
| `stale_connection_error`     | varování  | Poslední obnovení selhalo před 30+ minutami |
| `terminal_connection_error`  | kritická  | OAuth odvolán, klíč je neplatný             |
| `inactive_connection`        | informace | Připojení zakázáno v nastavení              |
| `model_lockout`              | varování  | Konkrétní model je v karanténě              |
| `quota_monitor_warning`      | varování  | Využití kvóty dosáhlo 80 % nebo více        |

### Generované typy akcí

| Akce                           | Riziko  | Popis                                |
| ------------------------------ | ------- | ------------------------------------ |
| `clear_provider_breaker`       | střední | Resetovat jistič do zavřeného stavu  |
| `clear_connection_cooldown`    | nízké   | Odebrat čekací dobu z připojení      |
| `clear_stale_connection_error` | nízké   | Vymazat příznak zastaralé chyby      |
| `clear_model_lockout`          | nízké   | Znovu povolit model v karanténě      |
| `reactivate_connection`        | střední | Znovu povolit deaktivované připojení |
| `deactivate_connection`        | vysoké  | Zakázat problematické připojení      |

### API

> **Žádný koncový bod REST.** Problémy autopilota jsou dostupné prostřednictvím nástroje MCP `observability_snapshot` nebo řídicího panelu. Autopilot běží interně; jeho chování se konfiguruje prostřednictvím databáze nastavení (pole `autopilotMode` pro jednotlivá připojení), nikoli pomocí proměnných prostředí — příkaz `grep -rn` pro proměnnou prostředí režimu autopilota nenajde žádné výskyty.

### Režim autopilota

Autopilot ve výchozím nastavení pracuje v **ručním režimu** — zjišťuje problémy a generuje doporučené akce, ale automaticky je neprovádí. Akce lze provést prostřednictvím řídicího panelu.

---

## Autopilot stavu kombinací

`comboHealthAutopilot.ts` je **varianta autopilota specifická pro kombinace**, která odpovídá autopilotu poskytovatelů. Provádí následující:

- Zjišťuje kombinace v nevyhovujícím stavu
- Doporučuje změnu pořadí cílů
- Navrhuje zakázání nefunkčních cílů
- Po N selháních automaticky odebírá mrtvé cíle

### Příklady problémů kombinací

```
Kombinace "always-on" (strategie podle priority)
├─ Cíl 1: openai/gpt-5 (v pořádku)
├─ Cíl 2: anthropic/claude-opus-4-6 (⚠️ model blokován do 14:00)
└─ Cíl 3: kiro/claude-sonnet-4-5 (v pořádku)

Doporučená akce: Změnit pořadí — přesunout kiro nad anthropic, dokud blokace nevyprší
```

---

## Monitory kvót

`observability.ts` zpřístupňuje **monitory kvót pro jednotlivé relace** poskytovatelů předplatného (Claude Code, Codex, GitHub Copilot):

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

### Významy stavů

| Stav        | Kdy                       | Akce uživatelského rozhraní                     |
| ----------- | ------------------------- | ----------------------------------------------- |
| `starting`  | Probíhá úvodní dotazování | Ukazatel průběhu                                |
| `idle`      | Žádná nedávná aktivita    | Skryto na řídicím panelu                        |
| `healthy`   | Zbývá více než 50 % kvóty | Zelená tečka                                    |
| `warning`   | Zbývá méně než 50 % kvóty | Žluté upozornění                                |
| `exhausted` | Kvóta = 0 %               | Červený blok, směrovat na dalšího poskytovatele |
| `error`     | Dotazování selhalo        | Červená tečka, brzy opakovat                    |

### API

> **Žádný koncový bod REST.** Data monitoru kvót jsou dostupná prostřednictvím nástroje MCP `observability_snapshot` nebo řídicího panelu.

---

## Přehled pozorovatelnosti

Nástroj MCP `observability_snapshot` vrací **kompletní snímek systému** pro agenty AI:

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
  "quotaMonitors": {/* viz výše */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agenti jej používají k **rozhodování o směrování** — například „pokud je okruh openai otevřený, směruj nejprve na anthropic“.

---

## Kontrola stavu tokenů

Poskytovatelé OAuth (Claude Code, GitHub Copilot, Cursor) vyžadují **pravidelné obnovování tokenů**. `src/lib/tokenHealthCheck.ts` spouští plánovač na pozadí:

- **Cyklus kontroly**: každých 60 sekund (kontrola v `TICK_MS = 60 * 1000` v `src/lib/tokenHealthCheck.ts:30`)
- **Interval kontroly stavu jednotlivých připojení**: ve výchozím nastavení 60 minut (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); lze konfigurovat prostřednictvím databáze nastavení
- **Preventivní obnovení při odpovědi 401**: zajišťuje interceptor příslušného připojení

### Stav tokenů

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

### Konfigurace

Konfiguraci kontroly stavu tokenů interně zajišťuje `tokenHealthCheck.ts`.

### Stav tokenů

> **Žádný koncový bod REST.** Údaje o stavu tokenů jsou dostupné prostřednictvím řídicího panelu nebo nástroje MCP `observability_snapshot`.

---

## Upozorňování

### Vestavěné kanály

OmniRoute podporuje **3 kanály upozornění**:

| Kanál            | Nastavení          | Případ použití                 |
| ---------------- | ------------------ | ------------------------------ |
| Banner na panelu | Vždy zapnutý       | Oznámení v aplikaci            |
| Webhook          | Nakonfigurujte URL | Slack, Discord, PagerDuty      |
| Protokol         | Výchozí            | Pro externí agregaci protokolů |

### Konfigurace webhooku

> **Poznámka:** Konfigurace upozornění prostřednictvím webhooku se provádí na stránce Nastavení v řídicím panelu. Uživatelské rozhraní Nastavení umožňuje nastavit URL webhooku, filtrování událostí a přizpůsobení datové části.

### Typy upozornění

| Upozornění                   | Kdy                                                          | Výchozí závažnost |
| ---------------------------- | ------------------------------------------------------------ | ----------------- |
| `provider_circuit_open`      | Okruh se otevře                                              | kritická          |
| `provider_circuit_half_open` | Okruh testuje obnovení provozu                               | informační        |
| `quota_warning`              | Kvóta dosáhne 80 % nebo více                                 | varování          |
| `quota_exhausted`            | Kvóta dosáhne 100 %                                          | kritická          |
| `token_refresh_failed`       | 3 nebo více po sobě jdoucích selhání obnovení                | varování          |
| `token_expired`              | Vypršela platnost tokenu                                     | kritická          |
| `combo_target_unhealthy`     | Cíl kombinace je ve fázi cooldown po dobu 1 hodiny nebo déle | varování          |
| `db_integrity_warning`       | Počet porušení FK je větší než 0                             | varování          |
| `heap_pressure`              | Využití haldy překročí 80 % prahové hodnoty                  | varování          |

---

## Metriky výkonu

### Sledované metriky

| Metrika                 | Typ       | Zdroj                           |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | čítač     | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | čítač     | `services/usage.ts`             |
| `cost_usd`              | čítač     | `services/usage.ts`             |
| `provider_errors`       | čítač     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | čítač     | `services/resilience.ts`        |
| `cache_hits`            | čítač     | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | ukazatel  | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | ukazatel  | `observability.ts`              |

### Percentily latence (p50/p95/p99)

> **Žádný koncový bod REST.** Data percentilů latence jsou dostupná na stránce řídicího panelu `/dashboard/health`. Export do Promethea/OpenTelemetry je plánován pro v3.9.

### Export do Promethea / OpenTelemetry (2. fáze)

Pro v3.9 je plánován nativní export do Promethea, OpenTelemetry a Datadogu.

Prozatím načítejte `/api/monitoring/health` pomocí libovolného monitorovacího systému založeného na HTTP (Prometheus blackbox exporter, Datadog HTTP check atd.).

---

## Recepty pro výstrahy

### Slack

> **Poznámka:** Výstrahy přes webhook se konfigurují na stránce Nastavení řídicího panelu — neexistují žádné vyhrazené proměnné prostředí pro webhook (`grep -rn` nevrací žádné výsledky). URL webhooku, filtrování událostí a přizpůsobení datové části najdete v uživatelském rozhraní Nastavení.

### Discord

> Výstrahy přes webhook používají stejný postup v uživatelském rozhraní Nastavení jako Slack. Discord přijímá stejnou strukturu datové části JSON.

### PagerDuty

> Výstrahy přes webhook používají stejný postup v uživatelském rozhraní Nastavení. Směrovací klíče PagerDuty Events API v2 se konfigurují v uživatelském rozhraní Nastavení.

### Vlastní webhook (JSON)

> Bude fungovat libovolný koncový bod HTTP, který přijímá požadavky POST s tělem JSON. URL nakonfigurujte v uživatelském rozhraní Nastavení.

---

## Konfigurace řídicího panelu

### Přizpůsobení řídicího panelu stavu

Vytvořte soubor `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Připnutí poskytovatele nahoru

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Řešení problémů

### „Poskytovatel hlásí, že je v pořádku, ale požadavky selhávají“

1. Zkontrolujte **problémy autopilota** — některý model může být zablokován
2. Podívejte se na **nedávné chyby** pro konkrétní třídu chyby
3. Vyzkoušejte **test připojení** na kartě poskytovatele
4. Zkontrolujte, zda poskytovatel **neomezuje rychlost na nadřazené službě** (lokálně to není viditelné)

### „Kvóta je v pořádku, ale vidím chyby 429“

- 429 znamená, že podle poskytovatele jste vyčerpali svou kvótu
- Sledování kvót v OmniRoute může být **zastaralé** — rozhodující jsou údaje nadřazené služby poskytovatele
- Data o kvótách se automaticky obnovují prostřednictvím interního monitoru kvót

### „Kombinace selhává, ale všechny cíle vypadají v pořádku“

- Zkontrolujte na řídicím panelu **stav kombinace**, zda nedochází k problémům s pořadím cílů
- Podívejte se na **události přechodu na záložní řešení** — kombinace možná vyčerpává možnosti příliš rychle
- Ověřte, že **strategie** odpovídá vašemu případu použití (prioritní vs. round-robin vs. automatická)

### „Kontrola stavu databáze selhává“

- Spusťte `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Pokud vrátí „ok“ — jde o planý poplach, kontrola stavu je příliš přísná
- Pokud vrátí cokoli jiného — **zastavte OmniRoute** a postupujte podle [průvodce obnovou po havárii](./DATABASE_GUIDE.md#disaster-recovery)

### „Zatížení haldy paměti je kritické“

```bash
# Zkontrolujte aktuální haldu
node -e "console.log(process.memoryUsage())"

# Spusťte ruční GC (pokud je použito --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Snižte počet souběžných požadavků (nastavuje se na stránce Nastavení řídicího panelu, nikoli pomocí proměnné prostředí)
# Proměnná prostředí `MAX_CONCURRENT_REQUESTS` neexistuje — nakonfigurujte tuto hodnotu v Nastavení → Souběžnost.
```

---

## Viz také

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — sledování využití a nákladů
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — schéma databáze + stav
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — stav proxy (samostatná mezipaměť)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — architektura systému
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — podrobnosti o circuit breakeru
- Zdroj: `src/lib/monitoring/` (4 soubory, 2121 řádků kódu)
