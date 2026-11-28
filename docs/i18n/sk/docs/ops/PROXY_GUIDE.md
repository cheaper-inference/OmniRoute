# 🌐 OmniRoute Proxy Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Obíďte geografické blokovania, chráňte svoju identitu a smerujte komunikáciu s AI cez ľubovoľný proxy server — bez akejkoľvek zložitosti konfigurácie.**

OmniRoute obsahuje plnohodnotný systém správy proxy serverov, ktorý umožňuje smerovať komunikáciu s nadradenými poskytovateľmi AI cez proxy servery HTTP, HTTPS alebo SOCKS5. Či už sa nachádzate v blokovanom regióne, potrebujete rotáciu IP adries alebo chcete maskovať digitálny odtlačok — táto príručka obsahuje všetko potrebné.

---

## Obsah

- [Prečo používať proxy servery?](#why-use-proxies)
- [Prehľad architektúry](#architecture-overview)
- [4-úrovňový systém proxy serverov](#4-level-proxy-system)
- [Register proxy serverov (CRUD)](#proxy-registry-crud)
- [Bezplatné trhovisko 1proxy](#1proxy-free-proxy-marketplace)
- [Rotácia proxy serverov](#proxy-rotation)
- [Ochrana pred detekciou a maskovanie](#anti-detection--stealth)
- [Režimy nadradeného proxy servera](#upstream-proxy-modes)
- [Používateľské rozhranie ovládacieho panela](#dashboard-ui)
- [Referenčná príručka API](#api-reference)
- [Premenné prostredia](#environment-variables)
- [Riešenie problémov](#troubleshooting)

---

## Prečo používať proxy servery?

Mnohí poskytovatelia AI obmedzujú prístup podľa geografického regiónu. Vývojári v **Rusku, Číne, Iráne, na Kube, v Turecku** a ďalších krajinách sa stretávajú s chybami, ako je:

```
unsupported_country_region_territory
```

Proxy servery sú užitočné aj mimo blokovaných regiónov:

| Prípad použitia                      | Opis                                                                                    |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| **Obídenie geografických obmedzení** | Prístup k OpenAI, Anthropic, Codex a Copilot z blokovaných krajín                       |
| **Rotácia IP adries**                | Rozdelenie požiadaviek medzi viacero IP adries s cieľom vyhnúť sa obmedzeniu frekvencie |
| **Súkromie**                         | Skrytie vašej skutočnej IP adresy pred nadradenými poskytovateľmi                       |
| **Súlad s predpismi**                | Smerovanie komunikácie cez konkrétne jurisdikcie                                        |
| **Testovanie**                       | Simulácia požiadaviek z rôznych regiónov                                                |

---

## Prehľad architektúry

```
┌───────────────────────────────────────────────────────────────┐
│                       Server OmniRoute                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Register    │    │ Dispečer     │    │ Načítanie        │  │
│  │ proxy       │───▶│ proxy        │───▶│ (undici)         │  │
│  │ (SQLite)    │    │ (s cache)    │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Synchroniz. │                        │ API nadradeného  │  │
│  │ 1proxy      │                        │ poskytovateľa    │  │
│  │ (bezpl. fond)│                       │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Kľúčové komponenty

| Komponent                   | Súbor                                        | Úloha                                                                          |
| --------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ |
| **Register proxy serverov** | `src/lib/db/proxies.ts`                      | Operácie CRUD pre záznamy proxy serverov a priradenia rozsahov                 |
| **Dispečer proxy serverov** | `open-sse/utils/proxyDispatcher.ts`          | Vytvára dispečery `undici` ProxyAgent/SOCKS s ukladaním do vyrovnávacej pamäte |
| **Načítanie cez proxy**     | `open-sse/utils/proxyFetch.ts`               | Obaľuje `fetch()` vložením dispečera proxy servera                             |
| **Trasa nastavení**         | `src/app/api/settings/proxy/route.ts`        | Staršie API konfigurácie proxy servera (GET/PUT/DELETE)                        |
| **Trasa správy**            | `src/app/api/v1/management/proxies/route.ts` | API registra pre operácie CRUD (GET/POST/PATCH/DELETE)                         |
| **Databáza 1proxy**         | `src/lib/db/oneproxy.ts`                     | Trvalé ukladanie údajov bezplatného trhoviska proxy serverov                   |

---

## Predvolený stav servera proxy pre nové účty

In** Nastavenia → Proxy → Globálna konfigurácia** , použite** Predvolene povoliť proxy pre nové pripojenia** vyberte počiatočný stav proxy novo pridaných účtov poskytovateľa.

Nové nastavenie riadi počiatočný stav proxy novo pridaných účtov poskytovateľa. Nezmení existujúce účty ani nenahradí globálny prepínač proxy. Jeho počiatočná hodnota zachováva predchádzajúce správanie. Ak chcete vytvoriť budúce účty s predvolene zakázaným serverom proxy, raz ho vypnite.

Predvoľba je uložená ako `defaultNewConnectionProxyEnabled` prostredníctvom existujúcich nastavení API. Keď sa neuloží, predvolene sa nastaví `true`. Uloženie `false` sa prejaví pri ďalších nových účtoch bez reštartu. `POST /api/providers` akceptuje voliteľné striktné booleovské `proxyEnabled`; explicitné `true` alebo `false` má prednosť pred predvoleným nastavením vytvorenia. Vynechanie duplicitného účtu alebo opätovné pripojenie OAuth zachová uložený stav tohto účtu. Jednotlivé účty je možné povoliť alebo zakázať aj neskôr.

Selektívne prenosy poskytovateľov používajú predvolené nastavenia cieľovej inštalácie pre nové účty a zachovávajú politiku cieľa pri nahrádzaní existujúcich účtov. Prepínače proxy nie sú prenosné polia prenosu. Úplná obnova zálohy a historická migrácia JSON/SQL si zachovávajú svoju existujúcu sémantiku obnovy, vrátane uložených hodnôt účtov a predvolených nastavení starých schém; úplné obnovenie nastavení môže tiež obnoviť túto predvoľbu.

Táto preferencia nepriraďuje proxy server ani neurčuje, že je v poriadku alebo sa používa. Skutočné smerovanie stále závisí od globálneho prepínača proxy a príslušnej konfigurácie proxy. Syntetickí poskytovatelia bez trvalého účtu, prevádzka OAuth pred vytvorením účtu, proxy servery environment/system a sieťovanie externých backendov sú mimo jej pôsobnosti.

## 4-úrovňový systém proxy

OmniRoute podporuje konfiguráciu proxy na **štyroch nezávislých úrovniach**, ktoré sa vyhodnocujú podľa priority:

```
Poradie vyhodnocovania priorít (od najvyššej → po najnižšiu):

  1. 🔵 Proxy účtu/pripojenia  →  pre každý API kľúč/pripojenie OAuth
  2. 🟡 Proxy poskytovateľa    →  pre každého poskytovateľa (napr. všetka komunikácia OpenAI)
  3. 🟠 Proxy kombinácie       →  pre každú kombináciu/konfiguráciu smerovania
  4. 🟢 Globálna proxy         →  všetka komunikácia, všetci poskytovatelia
```

### Ako funguje vyhodnocovanie

Keď OmniRoute odosiela požiadavku nadradenému poskytovateľovi, zavolá `resolveProxyForConnectionFromRegistry()`, ktorá postupne skontroluje jednotlivé úrovne:

1. **Úroveň účtu** — Je k tomuto konkrétnemu ID pripojenia priradená proxy?
2. **Úroveň poskytovateľa** — Je k tomuto poskytovateľovi (napr. `openai`) priradená proxy?
3. **Globálna úroveň** — Je nakonfigurovaná globálna proxy?
4. **Bez proxy** — Priame pripojenie k poskytovateľovi.

Použije sa prvá zhoda. To znamená, že môžete nastaviť globálnu proxy ako záložnú možnosť, no pre konkrétnych poskytovateľov alebo pripojenia ju prepísať.

### Čo sa smeruje cez proxy

| Typ komunikácie         | Cez proxy? | Poznámky                                     |
| ----------------------- | ---------- | -------------------------------------------- |
| Dokončovanie chatu      | ✅         | Všetky požiadavky `/v1/chat/completions`     |
| Vektorové reprezentácie | ✅         | `/v1/embeddings`                             |
| Generovanie obrázkov    | ✅         | `/v1/images/generations`                     |
| Zvuk (TTS/STT)          | ✅         | `/v1/audio/*`                                |
| Výmena tokenov OAuth    | ✅         | Rieši `unsupported_country_region_territory` |
| Testy pripojenia        | ✅         | Tlačidlo „Testovať pripojenie“ používa proxy |
| Obnovenie tokenov       | ✅         | Obnovenie OAuth na pozadí                    |
| Synchronizácia modelov  | ✅         | Výpis a zisťovanie modelov                   |

---

## Register proxy (CRUD)

Register proxy je tabuľka SQLite (`proxy_registry`), ktorá uchováva všetky vaše proxy. Každá proxy obsahuje:

| Pole       | Typ        | Popis                                                       |
| ---------- | ---------- | ----------------------------------------------------------- |
| `id`       | UUID       | Jedinečný identifikátor                                     |
| `name`     | Reťazec    | Zrozumiteľný názov                                          |
| `type`     | Reťazec    | Protokol: `http`, `https`, `socks5`                         |
| `host`     | Reťazec    | Názov hostiteľa alebo IP adresa proxy                       |
| `port`     | Celé číslo | Číslo portu                                                 |
| `username` | Reťazec    | Používateľské meno na autentifikáciu (v úložisku šifrované) |
| `password` | Reťazec    | Heslo na autentifikáciu (v úložisku šifrované)              |
| `region`   | Reťazec    | Označenie geografickej oblasti                              |
| `notes`    | Reťazec    | Voľné textové poznámky                                      |
| `status`   | Reťazec    | `active` alebo `inactive`                                   |
| `source`   | Reťazec    | `manual` alebo `oneproxy`                                   |

### Vytvorenie proxy

**Cez ovládací panel:**

1. Prejdite na **Nastavenia → Proxy**
2. Kliknite na **Pridať proxy**
3. Vyplňte typ, hostiteľa, port a voliteľné autentifikačné údaje
4. Uložte zmeny

**Cez API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Aktualizácia proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Poznámka:** Prihlasovacie údaje sa zachovajú, pokiaľ výslovne neodošlete neprázdne náhradné hodnoty. Odoslaním prázdnych reťazcov pre `username`/`password` sa uložené hodnoty zachovajú.

### Odstránenie proxy

```bash
# Zlyhá, ak je proxy priradená k ľubovoľnej úrovni
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Vynútené odstránenie (odstráni aj priradenia)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Výpis proxy

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Priraďovanie proxy k úrovniam

```bash
# Priradenie ku globálnej úrovni
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Priradenie ku konkrétnemu poskytovateľovi
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Priradenie ku konkrétnemu pripojeniu/kľúču
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Určenie výslednej proxy

Skontrolujte, ktorá proxy by sa použila pre dané pripojenie:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Vráti určenú proxy spolu s jej úrovňou (`account`, `provider` alebo `global`) a zdrojom.

### Hromadné priradenie

Priraďte jednu proxy k viacerým poskytovateľom alebo pripojeniam naraz:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Import/export

Proxy sú súčasťou systému **Zálohovanie/obnovenie**. Pri exporte konfigurácie OmniRoute:

1. Prejdite na **Ovládací panel → Nastavenia → Záloha**
2. Kliknite na **Exportovať** — register proxy a priradenia sú zahrnuté
3. Ak chcete konfiguráciu obnoviť, kliknite na **Importovať** a nahrajte súbor zálohy

Register proxy podporuje aj operáciu **upsert podľa hostiteľa+portu** — ak importujete proxy, ktorá už existuje (rovnaký hostiteľ a port), aktualizuje sa namiesto vytvorenia duplikátu.

### Migrácia staršej verzie

Ak ste nakonfigurovali proxy servery v staršej verzii (pred zavedením registra), OmniRoute ich automaticky migruje:

```
Staršie úložisko key_value → proxy_registry + proxy_assignments
```

Táto migrácia sa vykoná raz pri prvom spustení po inovácii. Ak ju chcete spustiť znova, použite `migrateLegacyProxyConfigToRegistry({ force: true })`.

---

## 1 proxy bezplatný server proxy

> 🆕** Prispel [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/cheaper-inference/OmniRoute/pull/1847) (vydanie [#1788](https://github.com/cheaper-inference/OmniRoute/issues/1788) )

OmniRoute sa integruje s** [1 proxy](https://1proxy-api.aitradepulse.com)** komunitná platforma na poskytovanie prístupu** stovky bezplatných overených serverov proxy** z celého sveta. Toto je ideálne pre používateľov, ktorí nemajú vlastnú proxy infraštruktúru.

### Ako to funguje

```
┌─────────────┐     Sync      ┌─────────────────┐    Rotate     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (external) │   up to 500   │  source=oneproxy │  by quality   │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **Synchronizovať** — OmniRoute načíta overené proxy z 1 proxy API
2. **Obchod** — Proxy sú uložené v rovnakej tabuľke `proxy_registry` ako `source = 'oneproxy'`
3. **Filter** — Filtrujte podľa protokolu, krajiny, skóre kvality
4. **Otočiť** — Vyberte si najlepší proxy pomocou kvalitných, náhodných alebo sekvenčných stratégií
5. **Autodegradácia** — Neúspešným proxy sa zníži skóre kvality; pod prahom → označené ako neaktívne

### Synchronizácia serverov proxy

**Cez Dashboard:**

1. Prejsť na** Nastavenia → 1proxy** tab
2. Kliknite** "Synchronizovať teraz"**
3. Zobraziť štatistiky: celkový počet proxy serverov, aktívny počet, priemerná kvalita, rozdelenie podľa krajín

**Cez API:**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtrovanie proxy serverov

```bash
# Filter by protocol
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filter by country
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filter by minimum quality score
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Combine filters
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Skóre kvality servera proxy

Každý 1 proxy server obsahuje metadáta:

| Pole            | Popis                                    |
| --------------- | ---------------------------------------- |
| `qualityScore`  | Hodnotenie 0-100 od overenia 1 proxy     |
| `latencyMs`     | Meraná latencia siete                    |
| `anonymity`     | `transparent`, `anonymous` alebo `elite` |
| `googleAccess`  | Či má proxy prístup k službám Google     |
| `countryCode`   | Dvojpísmenový kód krajiny ISO            |
| `lastValidated` | Časová pečiatka posledného overenia      |

Skóre kvality sa dynamicky upravujú:

- **Neúspešné žiadosti** znížiť skóre o 10 bodov
- **Skóre klesá na ≤ 10** → proxy je označený `inactive`
- Neaktívne proxy sú vylúčené z rotácie

### Stratégie rotácie

```bash
# Rotate by quality (best proxy first) — default
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Random rotation
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Sequential (least recently validated first)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Istič

1proxy synchronizácia má vstavaný istič:

- Po** 5 po sebe idúcich zlyhaní synchronizácie** , ďalšie pokusy o synchronizáciu sú zablokované
- Resetujte pomocou: `resetOneproxyCircuitBreaker()` alebo reštartujte server
- Stav synchronizácie je k dispozícii na `GET /api/settings/oneproxy?action=status`

### Vymazanie 1 proxy proxy

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Anti-Detection & Stealth

OmniRoute nesmeruje iba prenos cez proxy — ale robí to, aby vyzerala legitímne:

### TLS Spoofing odtlačkov prstov

Používa `wreq-js` na generovanie odtlačkov prstov TLS podobných prehliadaču, čím obchádza systémy detekcie botov, ktoré signalizujú podanie ruky TLS mimo prehliadača.

### CLI Zhoda odtlačkov prstov

The**CLI prepínač odtlačkov prstov** (`Settings → Security`) zmení poradie hlavičiek HTTP a polí tela JSON tak, aby zodpovedali presnému podpisu natívnych binárnych súborov CLI ( kód Claude, Codex atď.). Toto funguje** na vrchole** proxy:

```
Your IP (blocked) → Proxy IP (US) → Provider API
                    + TLS spoof
                    + CLI fingerprint
```

Dostanete oboje**IP maskovanie** a** požiadať o pravosť** súčasne.

### Zachovanie proxy IP

Farebne označené odznaky na paneli ukazujú, ktorá úroveň proxy je aktívna:

| Odznak | úroveň       | Význam                                                  |
| ------ | ------------ | ------------------------------------------------------- |
| 🟢     | globálne     | Všetka návštevnosť prechádza cez tento proxy server     |
| 🟡     | Poskytovateľ | Za proxy sa používa iba návštevnosť tohto poskytovateľa |
| 🔵     | Pripojenie   | Tento konkrétny key/account používa tento proxy         |

Odznak tiež zobrazuje vyriešený proxy IP na overenie.

---

## Režimy nadradenej proxy

Pre poskytovateľov, ktorí používajú vzor CLIProxyAPI, podporuje OmniRoute tri režimy nadradenej proxy:

| Režim         | Popis                                                     |
| ------------- | --------------------------------------------------------- |
| `native`      | OmniRoute spracováva smerovanie proxy priamo (predvolené) |
| `cliproxyapi` | Deleguje spracovanie externej inštancii CLIProxyAPI       |
| `fallback`    | Najprv vyskúša natívny režim, potom prejde na CLIProxyAPI |

Konfigurácia pre jednotlivých poskytovateľov:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Používateľské rozhranie ovládacieho panela

### Nastavenia → Karta Proxy

- Konfigurácia **globálnej proxy** (nastavuje sa raz pre všetok prenos)
- Nastavenia proxy pre **jednotlivých poskytovateľov**
- Priradenia proxy pre **jednotlivé pripojenia**
- **Test pripojenia** prostredníctvom nakonfigurovanej proxy
- **Farebne odlíšené odznaky** zobrazujúce aktívnu úroveň proxy

### Nastavenia → Karta 1proxy

- Tlačidlo **Synchronizovať teraz** na načítanie bezplatných proxy
- **Karty štatistík**: Celkom, Aktívne, Priemerná kvalita, Posledná synchronizácia
- **Filtre**: Protokol, Kód krajiny, Minimálna kvalita
- **Tabuľka proxy** s hostiteľom, protokolom, krajinou, skóre kvality, latenciou, anonymitou a prístupom ku Google
- Panel **stavu synchronizácie** so sledovaním úspešných/neúspešných pokusov a počtom po sebe nasledujúcich zlyhaní
- **Vymazať všetko** na odstránenie všetkých záznamov 1proxy

---

## Referenčná príručka API

### API nastavení proxy

| Metóda   | Koncový bod                                    | Popis                           |
| -------- | ---------------------------------------------- | ------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Získať úplnú konfiguráciu proxy |
| `GET`    | `/api/settings/proxy?level=global`             | Získať globálnu proxy           |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Získať proxy poskytovateľa      |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Určiť efektívnu proxy           |
| `PUT`    | `/api/settings/proxy`                          | Aktualizovať konfiguráciu proxy |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Odstrániť proxy na danej úrovni |

### API registra proxy

| Metóda   | Koncový bod                                       | Popis                   |
| -------- | ------------------------------------------------- | ----------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Zobraziť všetky proxy   |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Získať proxy podľa ID   |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Získať priradenia proxy |
| `POST`   | `/api/v1/management/proxies`                      | Vytvoriť proxy          |
| `PATCH`  | `/api/v1/management/proxies`                      | Aktualizovať proxy      |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Odstrániť proxy         |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Vynútiť odstránenie     |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Hromadne priradiť       |
| `GET`    | `/api/v1/management/proxies/assignments`          | Zobraziť priradenia     |
| `GET`    | `/api/v1/management/proxies/health`               | Štatistiky stavu proxy  |

### API tunelov

Informácie o sprístupnení vašej inštancie OmniRoute verejnému internetu (Cloudflare/ngrok/Tailscale) namiesto smerovania odchádzajúceho prenosu cez proxy nájdete v dokumente [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). REST API tunelov sa nachádza pod `/api/tunnels/{cloudflared,ngrok,tailscale}/*` a je nezávislé od reťazca odchádzajúcich proxy zdokumentovaného vyššie.

### API 1proxy

| Metóda   | Koncový bod                            | Popis                                   |
| -------- | -------------------------------------- | --------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Zobraziť proxy 1proxy                   |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Získať štatistiky a stav synchronizácie |
| `GET`    | `/api/settings/oneproxy?action=status` | Získať iba stav synchronizácie          |
| `POST`   | `/api/settings/oneproxy`               | Spustiť synchronizáciu                  |
| `POST`   | `/api/settings/oneproxy/rotate`        | Prepnúť na ďalšiu proxy                 |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Odstrániť jednu                         |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Vymazať všetky                          |

### API nadradenej proxy

| Metóda   | Koncový bod                       | Popis                                   |
| -------- | --------------------------------- | --------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Získať konfiguráciu nadradenej proxy    |
| `PUT`    | `/api/upstream-proxy/:providerId` | Nastaviť režim nadradenej proxy         |
| `DELETE` | `/api/upstream-proxy/:providerId` | Odstrániť konfiguráciu nadradenej proxy |

---

## Premenné prostredia

| Premenná              | Predvolená hodnota | Popis                                                                     |
| --------------------- | ------------------ | ------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`             | Povoliť podporu proxy SOCKS5 (predvolená hodnota `true` v `.env.example`) |

---

## Riešenie problémov

### „Proxy SOCKS5 je zakázané“

Nastavte `ENABLE_SOCKS5_PROXY=true` v súbore `.env` a reštartujte aplikáciu.

### Chyby „socket hang up“ pri použití proxy

Je to bežné pri lacných proxy, ktoré prerušujú neaktívne pripojenia. OmniRoute to už rieši nasledujúcimi spôsobmi:

- Zakázaním keep-alive pri pripojeniach cez proxy (`keepAliveTimeout: 1`)
- Zakázaním pipeliningu (`pipelining: 0`)
- Ukladaním dispečerov do vyrovnávacej pamäte, aby sa predišlo opakovaným handshakeom

Ak problém pretrváva, skúste inú proxy alebo použite funkciu rotácie 1proxy.

### „unsupported_country_region_territory“ počas OAuth

Uistite sa, že je proxy nakonfigurované **pred** spustením procesu OAuth. OmniRoute smeruje výmenu tokenov OAuth cez nakonfigurované proxy. Najskôr nastavte globálne proxy alebo proxy na úrovni poskytovateľa a potom sa pripojte.

### Proxy sa nepoužíva

Skontrolujte poradie vyhodnocovania:

1. Overte ho pomocou `GET /api/settings/proxy?resolve=your-connection-id`
2. Skontrolujte, či má proxy `status` nastavený na `active` (nie `inactive`)
3. Uistite sa, že rozsah priradenia proxy zodpovedá vášmu pripojeniu

### Synchronizácia 1proxy zlyháva

Skontrolujte stav synchronizácie:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Ak `consecutiveFailures >= 5`, aktivoval sa istič. Reštartujte server, aby sa resetoval, alebo počkajte na manuálny reset.

---

## Schéma databázy

### Tabuľka `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' alebo 'oneproxy'
  quality_score INTEGER,                     -- 0 – 100 (iba 1proxy)
  latency_ms INTEGER,                        -- milisekundy (iba 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- má prístup k službe Google? (1proxy)
  last_validated TEXT,                       -- časová značka ISO (1proxy)
  country_code TEXT,                         -- dvojpísmenový kód ISO (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabuľka `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID poskytovateľa, ID pripojenia alebo ID kombinácie
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Kontrola stavu proxy (v3.8.16+)

Mechanizmus **rýchleho zlyhania proxy** v OmniRoute (`src/lib/proxyHealth.ts`) rozpozná nefunkčné proxy za <2s pomocou rýchlej kontroly pripojenia TCP a následne **uloží výsledok do vyrovnávacej pamäte**, aby sa predišlo réžii pri každej požiadavke.

### Ako to funguje

```
Požiadavka ──▶ ProxyHealthCache.get(url)
                │
                ├─ Nájdené v cache + aktuálne?  ──▶ vrátiť stav z cache
                │
                └─ Nenájdené v cache / neaktuálne?  ──▶ TCP pripojenie k host:port
                                                          (časový limit: FAST_FAIL_TIMEOUT_MS)
                                                          ──▶ uložiť do cache na HEALTH_CACHE_TTL_MS
                                                          ──▶ vrátiť výsledok
```

Bez tohto mechanizmu by nefunkčné proxy blokovalo každú požiadavku počas celej hodnoty `PROXY_TIMEOUT_MS` (predvolene 30s), kým by zlyhala.

### Nastaviteľné premenné prostredia

| Premenná                     | Predvolená hodnota | Účel                                                                |
| ---------------------------- | ------------------ | ------------------------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`             | Časový limit pripojenia TCP pre každú kontrolu stavu                |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`            | Ako dlho sa výsledok kontroly stavu uchováva vo vyrovnávacej pamäti |

**Odporúčané hodnoty:**

| Scenár                          | Časový limit rýchleho zlyhania | TTL cache | Odôvodnenie                                                                       |
| ------------------------------- | ------------------------------ | --------- | --------------------------------------------------------------------------------- |
| Brána API s vysokou záťažou     | 1500ms                         | 60000ms   | Agresívne rýchle zlyhanie a dlhšia cache na zníženie počtu kontrol                |
| Geograficky distribuované uzly  | 3000ms                         | 15000ms   | Pomalšie siete potrebujú viac času; kratšia cache na rýchle prepnutie pri zlyhaní |
| Vývoj/testovanie                | 1000ms                         | 10000ms   | Rýchle iterácie pri lokálnych proxy                                               |
| Utajenie/ochrana pred detekciou | 2500ms                         | 45000ms   | Predchádza rýchlemu sondovaniu, ktoré by mohlo aktivovať obmedzenia frekvencie    |

### Kontrola stavu proxy

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Vynútiť opätovnú kontrolu konkrétneho proxy
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Príznak `stale` má hodnotu `true`, keď položka vo vyrovnávacej pamäti prekročila `HEALTH_CACHE_TTL_MS` a nasledujúca požiadavka spustí novú kontrolu.

### Predvolené hodnoty podľa typu proxy

Kontrola stavu používa rozumné predvolené hodnoty založené na schéme URL:

| Schéma                     | Predvolený port |
| -------------------------- | --------------- |
| `http://`                  | 8080            |
| `https://`                 | 443             |
| `socks5://` / `socks5h://` | 1080            |

Vlastné porty v URL (`http://host:9999`) majú vždy prednosť pred predvolenou hodnotou schémy.

---

## Analytika a pozorovateľnosť proxy serverov

OmniRoute sleduje využitie jednotlivých proxy serverov, aby operátorom pomohol diagnostikovať vzory smerovania, nárasty latencie a opakujúce sa zlyhania.

### Čo sa sleduje

Pre každú požiadavku odoslanú cez nakonfigurovaný proxy server zaznamenáva OmniRoute:

| Metrika      | Popis                                                                        |
| ------------ | ---------------------------------------------------------------------------- |
| `proxy_url`  | Úplná URL adresa proxy servera (prihlasovacie údaje sú maskované)            |
| `provider`   | ID nadradeného poskytovateľa (openai, anthropic atď.)                        |
| `latency_ms` | Celkový čas prenosu tam a späť vrátane nadviazania spojenia s proxy serverom |
| `connect_ms` | Iba čas nadviazania TCP spojenia                                             |
| `status`     | Stavový kód HTTP od nadradeného servera                                      |
| `error`      | Trieda chyby, ak požiadavka zlyhala                                          |
| `timestamp`  | ISO 8601 UTC                                                                 |

### Prístup k údajom

```bash
# Nedávne udalosti proxy serverov
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Skutočný koncový bod je `/api/usage/proxy-logs` (pozrite si `src/app/api/usage/proxy-logs/route.ts`). Tento koncový bod podporuje:

- `GET /api/usage/proxy-logs` — načítanie protokolov proxy serverov
- `DELETE /api/usage/proxy-logs` — vymazanie všetkých protokolov proxy serverov

V prípade potreby možno agregované štatistiky zisťovať priamo z tabuľky `proxy_logs` pomocou SQL. Používateľské rozhranie ovládacieho panela môže ponúkať agregované zobrazenia.

### Bežné vzory

**Zistenie nestabilného proxy servera** (striedavo funguje a zlyháva):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Vyhľadanie pomalých proxy serverov** (latencia p95 > 2 s):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Rozhodovací strom stratégie rotácie

Keď je k rozsahu priradených viacero proxy serverov, OmniRoute používa **stratégiu rotácie** na výber proxy servera pre každú požiadavku. Stratégia sa konfiguruje na úrovni rozsahu (globálne, pre jednotlivých poskytovateľov, pre jednotlivé účty alebo pre jednotlivé kombinácie).

### Dostupné stratégie

| Stratégia              | Kedy ju použiť                                       | Kompromis                                                                        |
| ---------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------- |
| `quality` (predvolená) | Produkčné prostredie s proxy servermi rôznej kvality | Uprednostňuje vysoko hodnotené proxy servery; nízko hodnotené môže zanedbávať    |
| `random`               | Rozloženie záťaže, ochrana súkromia                  | Rovnomerné rozloženie; ignoruje signály kvality                                  |
| `sequential`           | Ladenie, deterministické testovanie                  | Cyklicky prechádza proxy servery v danom poradí; správanie je ľahko pochopiteľné |

### Rozhodovací strom

```
                    Máte pre svoje proxy servery skóre kvality?
                    │
        ┌───────────┴───────────┐
        │                       │
       ÁNO                     NIE
        │                       │
   Majú všetky proxy           │
   servery približne           │
   rovnakú kvalitu?            │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  ÁNO       NIE              Použite
   │         │              `random`
   │         │              (rovnomerné
   │         │              rozloženie časom
   │         │              vytvorí údaje
   │         │              o kvalite)
   │         │
   │    Použite `quality`
   │    (najlepšie pre
   │    rôznu kvalitu)
   │
Použite `random`
(rovnomerne
rozloží záťaž)
```

## Automatické vylúčenie zlyhania pre vaše vlastné proxy

Fond 1proxy marketplace už sám o sebe automaticky degraduje neúspešné servery proxy (pozrite si [Skóre kvality servera proxy](#proxy-quality-scores) ). Pre proxy** vy** pridaný do registra, plánovač stavu na pozadí (`src/lib/proxyHealth/scheduler.ts`) poskytuje rovnaké správanie „vylúčiť mŕtveho člena z reťazca automaticky“ bez toho, aby sa čokoľvek vymazalo:

```bash
# .env — soft-disable a proxy after 3 consecutive failed probes, re-enable it
# automatically once it starts answering probes again.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Ako to zapadá do multi-proxy reťazca:

1. Plánovač testuje každého registrovaného proxy každé `PROXY_HEALTH_INTERVAL_MS` (predvolené 10 min; minimálne 1 min).
2. Po `PROXY_AUTO_REMOVE_AFTER` po sebe** presvedčivé** zlyhania (skutočné zlyhanie pripojenia — časový limit alebo vlastný 5xx cieľa sondy sa nikdy nepočíta, pozrite si [Kontrola stavu servera proxy](#proxy-health-checking-v3816) ), `status` servera proxy je nastavené na `dead`.
3. `dead` je jedným zo stavov, ktoré filter aktívneho stavu, ktorý používa rozlíšenie pool/rotation vylučuje, takže rotácia rozsahu (cyklus/náhodné / priliehavé / latencia / relácia — pozri [strom rozhodovania o stratégii rotácie](#rotation-strategy-decision-tree) ) okamžite zastaví odovzdávanie tohto proxy novým požiadavkám. Nie sú ovplyvnené žiadne iné servery proxy v oblasti a celá oblasť sa nikdy ticho nevráti späť k priamemu pripojeniu — pozri [4-úrovňový systém proxy](#4-level-proxy-system) pri zatvorení zlyhania.
4. Plánovač neustále skúma proxy servery `dead` v rovnakom intervale. Ďalšia úspešná sonda prevráti `status` späť na `active` a znova sa dostane do rotácie — nie je potrebné manuálne opätovné pridávanie.

Toto je zámerne** opt-in a nedeštruktívne** : predvolene plánovač počíta a zaznamenáva len zlyhania (pozri politiku C v `decision.ts`) a `PROXY_AUTO_DISABLE` nikdy nevymaže riadok —, na čo slúži samostatný, agresívnejší príznak `PROXY_AUTO_REMOVE`. Ak sú obe nastavené na `true`, vyhráva `PROXY_AUTO_REMOVE` (proxy, ktorý sa má vymazať, nemá zmysel pre mäkké vypnutie medzi tým). Úplný zoznam premenných nájdete v príručke [Environment Config](../reference/ENVIRONMENT.md).

---

> 📖** Súvisiaca dokumentácia:**
>
> - [Používateľská príručka](../guides/USER_GUIDE.md) — Všeobecné nastavenie a konfigurácia - [API Referencia](../reference/API_REFERENCE.md) — Úplná dokumentácia API - [Konfigurácia prostredia](../reference/ENVIRONMENT.md) — Všetky premenné prostredia
