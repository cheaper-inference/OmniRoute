# 🌐 OmniRoute Proxy Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Obcházejte geografická omezení, chraňte svou identitu a směrujte provoz AI přes libovolný proxy server — bez složité konfigurace.**

OmniRoute obsahuje plnohodnotný systém pro správu proxy serverů, který umožňuje směrovat provoz k poskytovatelům AI přes proxy servery HTTP, HTTPS nebo SOCKS5. Ať už se nacházíte v blokované oblasti, potřebujete rotaci IP adres nebo chcete skrýt svůj digitální otisk — tato příručka pokrývá vše.

---

## Obsah

- [Proč používat proxy servery?](#why-use-proxies)
- [Přehled architektury](#architecture-overview)
- [Čtyřúrovňový systém proxy serverů](#4-level-proxy-system)
- [Registr proxy serverů (CRUD)](#proxy-registry-crud)
- [Bezplatné tržiště 1proxy](#1proxy-free-proxy-marketplace)
- [Rotace proxy serverů](#proxy-rotation)
- [Ochrana před detekcí a utajení](#anti-detection--stealth)
- [Režimy proxy serveru pro odchozí provoz](#upstream-proxy-modes)
- [Uživatelské rozhraní řídicího panelu](#dashboard-ui)
- [Referenční dokumentace API](#api-reference)
- [Proměnné prostředí](#environment-variables)
- [Řešení problémů](#troubleshooting)

---

## Proč používat proxy servery?

Mnoho poskytovatelů AI omezuje přístup podle geografické oblasti. Vývojáři v **Rusku, Číně, Íránu, na Kubě, v Turecku** a dalších zemích se setkávají s chybami, jako je:

```
unsupported_country_region_territory
```

Proxy servery jsou užitečné i mimo blokované oblasti:

| Případ použití                    | Popis                                                                     |
| --------------------------------- | ------------------------------------------------------------------------- |
| **Obejití geografických omezení** | Přístup k OpenAI, Anthropic, Codex a Copilot z blokovaných zemí           |
| **Rotace IP adres**               | Rozložení požadavků mezi více IP adres, aby se předešlo omezení frekvence |
| **Soukromí**                      | Skrytí vaší skutečné IP adresy před poskytovateli                         |
| **Dodržování předpisů**           | Směrování provozu přes konkrétní jurisdikce                               |
| **Testování**                     | Simulace požadavků z různých oblastí                                      |

---

## Přehled architektury

```
┌───────────────────────────────────────────────────────────────┐
│                       Server OmniRoute                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Registr     │    │ Dispečer     │    │ Fetch (undici)   │  │
│  │ proxy       │───▶│ proxy        │───▶│                  │  │
│  │ (SQLite)    │    │ (v mezipaměti)│   │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Synchronizace│                       │ API externího    │  │
│  │ 1proxy      │                        │ poskytovatele    │  │
│  │ (bezplatný fond)                     │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Klíčové komponenty

| Komponenta                 | Soubor                                       | Úloha                                                                          |
| -------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ |
| **Registr proxy serverů**  | `src/lib/db/proxies.ts`                      | Operace CRUD pro záznamy proxy serverů a přiřazení rozsahů                     |
| **Dispečer proxy serverů** | `open-sse/utils/proxyDispatcher.ts`          | Vytváří dispečery ProxyAgent/SOCKS knihovny `undici` s ukládáním do mezipaměti |
| **Proxy Fetch**            | `open-sse/utils/proxyFetch.ts`               | Obaluje `fetch()` a vkládá dispečer proxy serveru                              |
| **Trasa nastavení**        | `src/app/api/settings/proxy/route.ts`        | Starší API pro konfiguraci proxy serverů (GET/PUT/DELETE)                      |
| **Trasa správy**           | `src/app/api/v1/management/proxies/route.ts` | API registru pro operace CRUD (GET/POST/PATCH/DELETE)                          |
| **Databáze 1proxy**        | `src/lib/db/oneproxy.ts`                     | Trvalé ukládání dat bezplatného tržiště proxy serverů                          |

---

## Výchozí stav proxy pro nové účty

V** Nastavení → Proxy → Globální konfigurace** , použití** Ve výchozím nastavení povolit pro nová připojení proxy** vyberte počáteční stav proxy nově přidaných účtů poskytovatelů.

Nové nastavení řídí počáteční stav proxy nově přidaných účtů poskytovatelů. Nemění stávající účty ani nenahrazuje globální přepínač proxy. Jeho počáteční hodnota zachovává předchozí chování. Jednou jej vypněte, chcete-li vytvářet budoucí účty se serverem proxy ve výchozím nastavení vypnutým.

Předvolba je uložena jako `defaultNewConnectionProxyEnabled` prostřednictvím existujících Nastavení API. Výchozí hodnota je `true`, když se nikdy neuloží. Uložení `false` se projeví pro další nové účty bez restartu. `POST /api/providers` přijímá volitelný přísný booleovský `proxyEnabled`; explicitní `true` nebo `false` má přednost před výchozím nastavením vytvoření. Vynechání duplicitního účtu nebo opětovné připojení OAuth zachová uložený stav tohoto účtu. Jednotlivé účty lze povolit nebo zakázat i poté.

Převody selektivních poskytovatelů používají výchozí nastavení cílové instalace pro nové účty a zachovávají zásady cíle při nahrazování stávajících účtů. Přepínače proxy nejsou přenosná pole přenosu. Úplné obnovení zálohy a historická migrace JSON/SQL si zachovají svou stávající sémantiku obnovení, včetně uložených hodnot účtů a výchozích výchozích nastavení schémat; úplné obnovení nastavení může také obnovit tuto předvolbu.

Tato předvolba nepřiřazuje proxy ani neurčuje, že je v pořádku nebo se používá. Skutečné směrování stále závisí na globálním přepínači proxy a příslušné konfiguraci proxy. Syntetičtí poskytovatelé bez trvalého účtu, provoz OAuth před vytvořením účtu, proxy servery environment/system a síťování externích backendů jsou mimo jeho rozsah.

## Čtyřúrovňový systém proxy

OmniRoute podporuje konfiguraci proxy na **čtyřech nezávislých úrovních**, které se vyhodnocují podle priority:

```
Pořadí vyhodnocování priorit (od nejvyšší → po nejnižší):

  1. 🔵 Proxy účtu/připojení  →  pro jednotlivý klíč API / připojení OAuth
  2. 🟡 Proxy poskytovatele   →  pro jednotlivého poskytovatele (např. veškerý provoz OpenAI)
  3. 🟠 Proxy kombinace       →  pro jednotlivou kombinaci / konfiguraci směrování
  4. 🟢 Globální proxy        →  veškerý provoz, všichni poskytovatelé
```

### Jak vyhodnocování funguje

Když OmniRoute odešle požadavek nadřazenému poskytovateli, zavolá `resolveProxyForConnectionFromRegistry()`, která postupně zkontroluje jednotlivé úrovně:

1. **Úroveň účtu** — Je tomuto konkrétnímu ID připojení přiřazena proxy?
2. **Úroveň poskytovatele** — Je tomuto poskytovateli (např. `openai`) přiřazena proxy?
3. **Globální úroveň** — Je nakonfigurována globální proxy?
4. **Bez proxy** — Přímé připojení k poskytovateli.

Použije se první shoda. To znamená, že můžete nastavit globální proxy jako záložní možnost, ale přepsat ji pro konkrétní poskytovatele nebo připojení.

### Co je směrováno přes proxy

| Typ provozu            | Přes proxy? | Poznámky                                    |
| ---------------------- | ----------- | ------------------------------------------- |
| Dokončování chatu      | ✅          | Všechny požadavky `/v1/chat/completions`    |
| Vektorové reprezentace | ✅          | `/v1/embeddings`                            |
| Generování obrázků     | ✅          | `/v1/images/generations`                    |
| Zvuk (TTS/STT)         | ✅          | `/v1/audio/*`                               |
| Výměna tokenů OAuth    | ✅          | Řeší `unsupported_country_region_territory` |
| Testy připojení        | ✅          | Tlačítko „Test Connection“ používá proxy    |
| Obnovení tokenu        | ✅          | Obnovení OAuth na pozadí                    |
| Synchronizace modelů   | ✅          | Výpis a zjišťování modelů                   |

---

## Registr proxy (CRUD)

Registr proxy je tabulka SQLite (`proxy_registry`), která ukládá všechny vaše proxy. Každá proxy obsahuje:

| Pole       | Typ        | Popis                                                 |
| ---------- | ---------- | ----------------------------------------------------- |
| `id`       | UUID       | Jedinečný identifikátor                               |
| `name`     | Řetězec    | Popisek srozumitelný pro člověka                      |
| `type`     | Řetězec    | Protokol: `http`, `https`, `socks5`                   |
| `host`     | Řetězec    | Název hostitele nebo IP adresa proxy                  |
| `port`     | Celé číslo | Číslo portu                                           |
| `username` | Řetězec    | Uživatelské jméno pro ověření (šifrované při uložení) |
| `password` | Řetězec    | Heslo pro ověření (šifrované při uložení)             |
| `region`   | Řetězec    | Označení geografické oblasti                          |
| `notes`    | Řetězec    | Volné textové poznámky                                |
| `status`   | Řetězec    | `active` nebo `inactive`                              |
| `source`   | Řetězec    | `manual` nebo `oneproxy`                              |

### Vytvoření proxy

**Prostřednictvím řídicího panelu:**

1. Přejděte do **Settings → Proxy**
2. Klikněte na **Add Proxy**
3. Vyplňte typ, hostitele, port a případné přihlašovací údaje
4. Uložte změny

**Prostřednictvím API:**

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

### Aktualizace proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Poznámka:** Přihlašovací údaje zůstanou zachovány, pokud výslovně neodešlete neprázdné náhrady. Odesláním prázdných řetězců pro `username`/`password` zůstanou uložené hodnoty zachovány.

### Odstranění proxy

```bash
# Selže, pokud je proxy přiřazena k libovolné úrovni
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Vynucené odstranění (odstraní také přiřazení)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Výpis proxy

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Přiřazení proxy k úrovním

```bash
# Přiřazení ke globální úrovni
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Přiřazení ke konkrétnímu poskytovateli
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Přiřazení ke konkrétnímu připojení/klíči
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Určení výsledné proxy

Zjistěte, která proxy by byla použita pro dané připojení:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Vrátí vyhodnocenou proxy spolu s její úrovní (`account`, `provider` nebo `global`) a zdrojem.

### Hromadné přiřazení

Přiřaďte jednu proxy více poskytovatelům nebo připojením najednou:

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

Proxy jsou součástí systému **zálohování/obnovení**. Při exportu konfigurace OmniRoute:

1. Přejděte do **Dashboard → Settings → Backup**
2. Klikněte na **Export** — registr proxy a přiřazení jsou zahrnuty
3. Pro obnovení klikněte na **Import** a nahrajte soubor zálohy

Registr proxy podporuje také **upsert podle hostitele a portu** — pokud importujete proxy, která již existuje (stejný hostitel a port), aktualizuje se namísto vytvoření duplikátu.

### Migrace ze starší verze

Pokud jste nakonfigurovali proxy v dřívější verzi (před zavedením registru), OmniRoute je automaticky migruje:

```
Starší úložiště key_value → proxy_registry + proxy_assignments
```

K tomu dojde jednou při prvním spuštění po upgradu. Pro opětovné spuštění použijte `migrateLegacyProxyConfigToRegistry({ force: true })`.

---

## 1proxy Free Proxy Marketplace

> 🆕** Přispěl [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/cheaper-inference/OmniRoute/pull/1847) (vydání [#1788](https://github.com/cheaper-inference/OmniRoute/issues/1788) )

OmniRoute se integruje s** [1 proxy](https://1proxy-api.aitradepulse.com)** komunitní platforma, ke které bude přístup** stovky bezplatných, ověřených proxy** z celého světa. To je ideální pro uživatele, kteří nemají vlastní infrastrukturu proxy.

### Jak to funguje

```
┌─────────────┐     Sync      ┌─────────────────┐    Rotate     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (external) │   up to 500   │  source=oneproxy │  by quality   │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **Synchronizovat** — OmniRoute načte ověřené proxy z 1 proxy API
2. **Obchod** — Proxy jsou uloženy ve stejné tabulce `proxy_registry` jako `source = 'oneproxy'`
3. **Filtr** — Filtrujte podle protokolu, země, skóre kvality
4. **Střídat** — Vyberte nejlepší proxy pomocí kvalitních, náhodných nebo sekvenčních strategií
5. **Autodegradace** — Neúspěšným proxy se sníží skóre kvality; pod prahem → označeno jako neaktivní

### Synchronizace proxy

**Prostřednictvím řídicího panelu:**

1. Přejít na** Nastavení → 1proxy** tab
2. Klikněte** "Synchronizovat nyní"**
3. Zobrazit statistiky: celkový počet proxy, aktivní počet, průměrná kvalita, rozdělení podle zemí

**Přes API:**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtrování proxy

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

### Skóre kvality proxy

Každý 1 proxy server je dodáván s metadaty:

| Pole            | Popis                                        |
| --------------- | -------------------------------------------- |
| `qualityScore`  | Hodnocení 0-100 od ověření 1 proxy           |
| `latencyMs`     | Změřená latence sítě                         |
| `anonymity`     | `transparent`, `anonymous` nebo `elite`      |
| `googleAccess`  | Zda může proxy přistupovat ke službám Google |
| `countryCode`   | Dvoupísmenný kód země ISO                    |
| `lastValidated` | Časové razítko posledního ověření            |

Skóre kvality se dynamicky upravují:

- **Neúspěšné požadavky** snížit skóre o 10 bodů
- **Skóre klesá na ≤ 10** → proxy je označena `inactive`
- Neaktivní proxy jsou z rotace vyloučeny

### Strategie rotace

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

### Jistič

1proxy synchronizace má vestavěný jistič:

- Po** 5 po sobě jdoucích selhání synchronizace** , další pokusy o synchronizaci jsou blokovány
- Resetujte pomocí: `resetOneproxyCircuitBreaker()` nebo restartujte server
- Stav synchronizace je k dispozici na `GET /api/settings/oneproxy?action=status`

### Vymazání 1 proxy proxy

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Anti-Detection & Stealth

OmniRoute nejen směruje provoz přes proxy — ale provoz vypadá legitimně:

### TLS Falšování otisků prstů

Využívá `wreq-js` ke generování otisků prstů TLS podobných prohlížeči, čímž obchází systémy detekce botů, které signalizují handshake TLS bez prohlížeče.

### CLI Porovnání otisků prstů

The**CLI Přepínání otisků prstů** (`Settings → Security`) změní pořadí hlaviček HTTP a těles těla JSON tak, aby odpovídaly přesnému podpisu nativních binárních souborů CLI (kód Claude, Codex atd.). Tohle funguje** na vrcholu** proxy:

```
Your IP (blocked) → Proxy IP (US) → Provider API
                    + TLS spoof
                    + CLI fingerprint
```

Dostanete obojí**IP maskování** a** požadovat pravost** zároveň.

### Zachování proxy IP

Barevně odlišené odznaky na řídicím panelu ukazují, která úroveň proxy je aktivní:

| Odznak | Úroveň       | Význam                                                  |
| ------ | ------------ | ------------------------------------------------------- |
| 🟢     | Globální     | Veškerý provoz prochází tímto proxy serverem            |
| 🟡     | Poskytovatel | Přes proxy se používá pouze provoz tohoto poskytovatele |
| 🔵     | Spojení      | Tento konkrétní key/account používá tento proxy         |

Odznak také zobrazuje vyřešený proxy IP pro ověření.

---

## Režimy nadřazené proxy

U poskytovatelů používajících vzor CLIProxyAPI podporuje OmniRoute tři režimy nadřazené proxy:

| Režim         | Popis                                                     |
| ------------- | --------------------------------------------------------- |
| `native`      | OmniRoute zpracovává směrování přes proxy přímo (výchozí) |
| `cliproxyapi` | Deleguje zpracování externí instanci CLIProxyAPI          |
| `fallback`    | Nejprve zkusí nativní režim a poté přejde na CLIProxyAPI  |

Konfigurace pro jednotlivé poskytovatele:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Uživatelské rozhraní řídicího panelu

### Nastavení → Karta Proxy

- Konfigurace **globální proxy** (nastavuje se jednou pro veškerý provoz)
- Přepsání proxy **pro jednotlivé poskytovatele**
- Přiřazení proxy **pro jednotlivá připojení**
- **Test připojení** přes nakonfigurovanou proxy
- **Barevně odlišené štítky** zobrazující aktivní úroveň proxy

### Nastavení → Karta 1proxy

- Tlačítko **Synchronizovat nyní** pro načtení bezplatných proxy
- **Karty statistik**: Celkem, Aktivní, Průměrná kvalita, Poslední synchronizace
- **Filtry**: Protokol, Kód země, Minimální kvalita
- **Tabulka proxy** s hostitelem, protokolem, zemí, hodnocením kvality, latencí, anonymitou a přístupem ke službám Google
- Panel **stavu synchronizace** se sledováním úspěchů, selhání a počtu po sobě jdoucích selhání
- **Vymazat vše** pro odstranění všech záznamů 1proxy

---

## Referenční příručka API

### API nastavení proxy

| Metoda   | Koncový bod                                    | Popis                           |
| -------- | ---------------------------------------------- | ------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Získat úplnou konfiguraci proxy |
| `GET`    | `/api/settings/proxy?level=global`             | Získat globální proxy           |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Získat proxy poskytovatele      |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Zjistit výslednou proxy         |
| `PUT`    | `/api/settings/proxy`                          | Aktualizovat konfiguraci proxy  |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Odebrat proxy na dané úrovni    |

### API registru proxy

| Metoda   | Koncový bod                                       | Popis                  |
| -------- | ------------------------------------------------- | ---------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Vypsat všechny proxy   |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Získat proxy podle ID  |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Získat přiřazení proxy |
| `POST`   | `/api/v1/management/proxies`                      | Vytvořit proxy         |
| `PATCH`  | `/api/v1/management/proxies`                      | Aktualizovat proxy     |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Odstranit proxy        |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Vynutit odstranění     |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Hromadně přiřadit      |
| `GET`    | `/api/v1/management/proxies/assignments`          | Vypsat přiřazení       |
| `GET`    | `/api/v1/management/proxies/health`               | Statistiky stavu proxy |

### API tunelů

Informace o zpřístupnění instance OmniRoute veřejnému internetu (Cloudflare/ngrok/Tailscale) namísto směrování odchozího provozu přes proxy naleznete v souboru [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). REST API tunelů se nachází pod `/api/tunnels/{cloudflared,ngrok,tailscale}/*` a je nezávislé na výše zdokumentovaném řetězci odchozích proxy.

### API 1proxy

| Metoda   | Koncový bod                            | Popis                                  |
| -------- | -------------------------------------- | -------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Vypsat proxy 1proxy                    |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Získat statistiky a stav synchronizace |
| `GET`    | `/api/settings/oneproxy?action=status` | Získat pouze stav synchronizace        |
| `POST`   | `/api/settings/oneproxy`               | Spustit synchronizaci                  |
| `POST`   | `/api/settings/oneproxy/rotate`        | Přepnout na další proxy                |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Odstranit jednu proxy                  |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Vymazat vše                            |

### API nadřazené proxy

| Metoda   | Koncový bod                       | Popis                               |
| -------- | --------------------------------- | ----------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Získat konfiguraci nadřazené proxy  |
| `PUT`    | `/api/upstream-proxy/:providerId` | Nastavit režim nadřazené proxy      |
| `DELETE` | `/api/upstream-proxy/:providerId` | Odebrat konfiguraci nadřazené proxy |

---

## Proměnné prostředí

| Proměnná              | Výchozí hodnota | Popis                                                                  |
| --------------------- | --------------- | ---------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`          | Povolit podporu proxy SOCKS5 (výchozí hodnota `true` v `.env.example`) |

---

## Řešení problémů

### „Proxy SOCKS5 je zakázána“

Nastavte `ENABLE_SOCKS5_PROXY=true` v souboru `.env` a restartujte aplikaci.

### Chyby „socket hang up“ při použití proxy

U levných proxy, které ukončují neaktivní připojení, je to běžné. OmniRoute to již řeší následujícími způsoby:

- Zakázáním udržování připojení na proxy spojeních (`keepAliveTimeout: 1`)
- Zakázáním pipeliningu (`pipelining: 0`)
- Ukládáním dispatcherů do mezipaměti, aby se předešlo opakovaným handshakeům

Pokud problém přetrvává, zkuste jinou proxy nebo použijte funkci rotace 1proxy.

### „unsupported_country_region_territory“ během OAuth

Před zahájením procesu OAuth se ujistěte, že je proxy nakonfigurována. OmniRoute směruje výměnu tokenů OAuth přes nakonfigurovanou proxy. Nejprve nastavte globální proxy nebo proxy na úrovni poskytovatele a poté se připojte.

### Proxy se nepoužívá

Zkontrolujte pořadí vyhodnocování:

1. Ověřte jej pomocí `GET /api/settings/proxy?resolve=your-connection-id`
2. Zkontrolujte, zda je `status` proxy nastaven na `active` (nikoli `inactive`)
3. Ujistěte se, že rozsah přiřazení proxy odpovídá vašemu připojení

### Synchronizace 1proxy selhává

Zkontrolujte stav synchronizace:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Pokud je `consecutiveFailures >= 5`, byl aktivován jistič. Restartujte server, čímž jej resetujete, nebo počkejte na ruční resetování.

---

## Schéma databáze

### Tabulka `proxy_registry`

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
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' nebo 'oneproxy'
  quality_score INTEGER,                     -- 0–100 (pouze 1proxy)
  latency_ms INTEGER,                        -- milisekundy (pouze 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- má přístup ke Googlu? (1proxy)
  last_validated TEXT,                       -- časové razítko ISO (1proxy)
  country_code TEXT,                         -- dvoupísmenný kód ISO (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabulka `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID poskytovatele, ID připojení nebo ID kombinace
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Kontrola stavu proxy (v3.8.16+)

Mechanismus **rychlého selhání proxy** v OmniRoute (`src/lib/proxyHealth.ts`) detekuje nefunkční proxy za méně než 2 s pomocí rychlé kontroly připojení TCP a poté **uloží výsledek do mezipaměti**, aby se předešlo režii u každého požadavku.

### Jak to funguje

```
Požadavek ──▶ ProxyHealthCache.get(url)
               │
               ├─ Nález v mezipaměti + aktuální?  ──▶ vrátit stav z mezipaměti
               │
               └─ Nenalezeno v mezipaměti / zastaralé?  ──▶ připojit se přes TCP k host:port
                                                            (časový limit: FAST_FAIL_TIMEOUT_MS)
                                                            ──▶ uložit do mezipaměti na dobu HEALTH_CACHE_TTL_MS
                                                            ──▶ vrátit výsledek
```

Bez tohoto mechanismu by nefunkční proxy blokovala každý požadavek po celou dobu `PROXY_TIMEOUT_MS` (ve výchozím nastavení 30 s), než by došlo k selhání.

### Nastavitelné proměnné prostředí

| Proměnná                     | Výchozí hodnota | Účel                                                 |
| ---------------------------- | --------------- | ---------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`          | Časový limit připojení TCP pro každou kontrolu stavu |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`         | Doba uložení výsledku kontroly stavu do mezipaměti   |

**Doporučené hodnoty:**

| Scénář                                   | Časový limit rychlého selhání | TTL mezipaměti | Odůvodnění                                                                                  |
| ---------------------------------------- | ----------------------------- | -------------- | ------------------------------------------------------------------------------------------- |
| Brána API s vysokou propustností         | 1500ms                        | 60000ms        | Agresivní rychlé selhání, delší mezipaměť pro omezení kontrol                               |
| Geograficky distribuované uzly           | 3000ms                        | 15000ms        | Pomalejší sítě potřebují více času; kratší mezipaměť pro rychlé převzetí služeb při selhání |
| Vývoj / testování                        | 1000ms                        | 10000ms        | Rychlá iterace na místních proxy                                                            |
| Nenápadný provoz / ochrana proti detekci | 2500ms                        | 45000ms        | Zabraňuje rychlému testování, které by mohlo aktivovat omezení rychlosti                    |

### Kontrola stavu proxy

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Vynutit opětovnou kontrolu konkrétní proxy
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Příznak `stale` má hodnotu `true`, pokud záznam v mezipaměti překročil dobu `HEALTH_CACHE_TTL_MS`; následující požadavek pak spustí novou kontrolu.

### Výchozí hodnoty podle typu proxy

Kontrola stavu používá rozumné výchozí hodnoty podle schématu URL:

| Schéma                     | Výchozí port |
| -------------------------- | ------------ |
| `http://`                  | 8080         |
| `https://`                 | 443          |
| `socks5://` / `socks5h://` | 1080         |

Vlastní porty uvedené v URL (`http://host:9999`) mají vždy přednost před výchozím portem daného schématu.

---

## Analytika a pozorovatelnost proxy serverů

OmniRoute sleduje využití jednotlivých proxy serverů, aby operátorům pomohl diagnostikovat vzorce směrování, nárůsty latence a opakující se selhání.

### Co se sleduje

Pro každý požadavek směrovaný přes nakonfigurovaný proxy server zaznamenává OmniRoute následující údaje:

| Metrika      | Popis                                                        |
| ------------ | ------------------------------------------------------------ |
| `proxy_url`  | Úplná URL proxy serveru (s maskovanými přihlašovacími údaji) |
| `provider`   | ID poskytovatele nadřazené služby (openai, anthropic atd.)   |
| `latency_ms` | Celková doba odezvy včetně navázání spojení s proxy serverem |
| `connect_ms` | Pouze doba navázání TCP spojení                              |
| `status`     | Stavový kód HTTP z nadřazené služby                          |
| `error`      | Třída chyby, pokud požadavek selhal                          |
| `timestamp`  | ISO 8601 UTC                                                 |

### Přístup k datům

```bash
# Nedávné události proxy serverů
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Skutečný koncový bod je `/api/usage/proxy-logs` (viz `src/app/api/usage/proxy-logs/route.ts`). Tento koncový bod podporuje:

- `GET /api/usage/proxy-logs` — načtení protokolů proxy serverů
- `DELETE /api/usage/proxy-logs` — vymazání všech protokolů proxy serverů

V případě potřeby lze agregované statistiky získat přímo z tabulky `proxy_logs` pomocí SQL. Uživatelské rozhraní řídicího panelu může nabízet agregovaná zobrazení.

### Běžné vzorce

**Detekce nestabilního proxy serveru** (střídá úspěšné a neúspěšné požadavky):

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

**Vyhledání pomalých proxy serverů** (latence p95 > 2 s):

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

## Rozhodovací strom strategie rotace

Pokud je k jednomu rozsahu přiřazeno více proxy serverů, OmniRoute používá **strategii rotace**, pomocí které vybírá proxy server pro každý požadavek. Strategie se konfiguruje na úrovni rozsahu (globálně, pro jednotlivé poskytovatele, účty nebo kombinace).

### Dostupné strategie

| Strategie           | Kdy ji použít                                     | Kompromis                                                                         |
| ------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------- |
| `quality` (výchozí) | Produkční prostředí s proxy servery různé kvality | Upřednostňuje vysoce hodnocené proxy servery; méně hodnocené nemusí být využívány |
| `random`            | Rozložení zátěže, ochrana soukromí                | Rovnoměrné rozložení; ignoruje ukazatele kvality                                  |
| `sequential`        | Ladění, deterministické testování                 | Prochází proxy servery postupně v daném pořadí; snadno pochopitelné chování       |

### Rozhodovací strom

```
                    Máte pro své proxy servery skóre kvality?
                    │
        ┌───────────┴───────────┐
        │                       │
       ANO                     NE
        │                       │
   Mají všechny proxy          │
   servery přibližně             │
   stejnou kvalitu?              │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  ANO       NE                Použijte
   │         │              `random`
   │         │              (rovnoměrné
   │         │              rozložení postupně
   │         │              vytváří data
   │         │              o kvalitě)
   │         │
   │    Použijte `quality`
   │    (nejlepší pro
   │    různou kvalitu)
   │
Použijte `random`
(rovnoměrně
rozloží zátěž)
```

## Automatické vyloučení selhání pro vaše vlastní proxy

Fond tržiště 1proxy již sám o sobě automaticky degraduje neúspěšné proxy (viz [Skóre kvality proxy](#proxy-quality-scores) ). Pro proxy** Vy** přidaný do registru, plánovač stavu na pozadí (`src/lib/proxyHealth/scheduler.ts`) poskytuje stejné chování „vyloučit mrtvého člena z řetězce automaticky“, aniž by se cokoli smazalo:

```bash
# .env — soft-disable a proxy after 3 consecutive failed probes, re-enable it
# automatically once it starts answering probes again.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Jak to zapadá do multi-proxy řetězce:

1. Plánovač testuje každý registrovaný proxy každých `PROXY_HEALTH_INTERVAL_MS` (výchozí 10 min; minimálně 1 min).
2. Po `PROXY_AUTO_REMOVE_AFTER` po sobě** přesvědčivé** selhání (skutečné selhání připojení — časový limit nebo vlastní 5xx cíle sondy se nikdy nepočítá, viz [Kontrola stavu proxy](#proxy-health-checking-v3816) ), `status` proxy je nastaveno na `dead`.
3. `dead` je jedním ze stavů, které filtr živého stavu používaný rozlišením pool/rotation vylučuje, takže rotace rozsahu (cyklus/náhodné / lepivé / latence / relace — viz [strom rozhodnutí o strategii rotace](#rotation-strategy-decision-tree) ) okamžitě zastaví předávání tohoto proxy novým požadavkům. Nejsou ovlivněny žádné další proxy ve fondu a celý fond se nikdy tiše nevrátí zpět k přímému připojení — viz [4úrovňový systém proxy](#4-level-proxy-system) proti selhání zavření.
4. Plánovač udržuje sondování `dead` proxy ve stejném intervalu. Další úspěšná sonda převrátí `status` zpět na `active` a znovu vstoupí do rotace — bez nutnosti ručního opětovného přidání.

To je schválně** opt-in a nedestruktivní** : ve výchozím nastavení plánovač počítá a zaznamenává pouze selhání (viz zásada C v `decision.ts`) a `PROXY_AUTO_DISABLE` nikdy neodstraní řádek — k čemuž slouží samostatný agresivnější příznak `PROXY_AUTO_REMOVE`. Pokud jsou oba nastaveny na `true`, vyhraje `PROXY_AUTO_REMOVE` (proxy, který má být smazán, nemá využití pro měkké vypnutí mezi tím). Úplný seznam proměnných naleznete v Referenční příručce [konfigurace prostředí](../reference/ENVIRONMENT.md).

---

> 📖** Související dokumentace:**
>
> - [Uživatelská příručka](../guides/USER_GUIDE.md) — Obecné nastavení a konfigurace - [API Reference](../reference/API_REFERENCE.md) — Úplná dokumentace API - [Konfigurace prostředí](../reference/ENVIRONMENT.md) — Všechny proměnné prostředí
