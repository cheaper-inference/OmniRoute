# 🌐 OmniRoute Proxy Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Omijaj blokady geograficzne, chroń swoją tożsamość i kieruj ruch AI przez dowolny serwer proxy — bez skomplikowanej konfiguracji.**

OmniRoute zawiera w pełni funkcjonalny system zarządzania serwerami proxy, który umożliwia kierowanie ruchu do nadrzędnych dostawców AI przez serwery proxy HTTP, HTTPS lub SOCKS5. Niezależnie od tego, czy znajdujesz się w regionie objętym blokadą, potrzebujesz rotacji adresów IP, czy chcesz korzystać z technik maskowania odcisku cyfrowego — ten przewodnik omawia wszystko.

---

## Spis treści

- [Dlaczego warto używać serwerów proxy?](#why-use-proxies)
- [Omówienie architektury](#architecture-overview)
- [4-poziomowy system proxy](#4-level-proxy-system)
- [Rejestr proxy (CRUD)](#proxy-registry-crud)
- [Bezpłatny rynek 1proxy](#1proxy-free-proxy-marketplace)
- [Rotacja proxy](#proxy-rotation)
- [Ochrona przed wykrywaniem i tryb maskowania](#anti-detection--stealth)
- [Tryby nadrzędnych serwerów proxy](#upstream-proxy-modes)
- [Interfejs panelu](#dashboard-ui)
- [Dokumentacja API](#api-reference)
- [Zmienne środowiskowe](#environment-variables)
- [Rozwiązywanie problemów](#troubleshooting)

---

## Dlaczego warto używać serwerów proxy?

Wielu dostawców AI ogranicza dostęp w zależności od regionu geograficznego. Programiści w **Rosji, Chinach, Iranie, na Kubie, w Turcji** i innych krajach napotykają błędy takie jak:

```
unsupported_country_region_territory
```

Nawet poza regionami objętymi blokadą serwery proxy są przydatne w następujących zastosowaniach:

| Zastosowanie                       | Opis                                                                   |
| ---------------------------------- | ---------------------------------------------------------------------- |
| **Omijanie blokad geograficznych** | Dostęp do OpenAI, Anthropic, Codex i Copilot z krajów objętych blokadą |
| **Rotacja adresów IP**             | Rozdzielanie żądań między wiele adresów IP w celu uniknięcia limitów   |
| **Prywatność**                     | Ukrywanie rzeczywistego adresu IP przed nadrzędnymi dostawcami         |
| **Zgodność z przepisami**          | Kierowanie ruchu przez określone jurysdykcje                           |
| **Testowanie**                     | Symulowanie żądań pochodzących z różnych regionów                      |

---

## Omówienie architektury

```
┌───────────────────────────────────────────────────────────────┐
│                       Serwer OmniRoute                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Rejestr     │    │ Dyspozytor   │    │ Pobieranie       │  │
│  │ proxy       │───▶│ proxy        │───▶│ (undici)         │  │
│  │ (SQLite)    │    │ (buforowany) │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Synchroniza-│                        │ API dostawcy     │  │
│  │ cja 1proxy  │                        │ nadrzędnego      │  │
│  │ (darmowa    │                        │                  │  │
│  │ pula)       │                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Kluczowe komponenty

| Komponent              | Plik                                         | Rola                                                               |
| ---------------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| **Rejestr proxy**      | `src/lib/db/proxies.ts`                      | Operacje CRUD dla wpisów proxy i przypisań zakresów                |
| **Dyspozytor proxy**   | `open-sse/utils/proxyDispatcher.ts`          | Tworzy dyspozytory `undici` ProxyAgent/SOCKS z obsługą buforowania |
| **Pobieranie proxy**   | `open-sse/utils/proxyFetch.ts`               | Opakowuje `fetch()`, wstrzykując dyspozytor proxy                  |
| **Trasa ustawień**     | `src/app/api/settings/proxy/route.ts`        | Starsze API konfiguracji proxy (GET/PUT/DELETE)                    |
| **Trasa zarządzania**  | `src/app/api/v1/management/proxies/route.ts` | API CRUD rejestru (GET/POST/PATCH/DELETE)                          |
| **Baza danych 1proxy** | `src/lib/db/oneproxy.ts`                     | Trwałe przechowywanie danych bezpłatnego rynku serwerów proxy      |

---

## Domyślny stan proxy dla nowych kont

W** Ustawienia → Proxy → Konfiguracja globalna** , używać** Włącz domyślnie serwer proxy dla nowych połączeń** aby wybrać początkowy stan proxy dla nowo dodanych kont dostawców.

Nowe ustawienie kontroluje początkowy stan serwera proxy nowo dodanych kont dostawców. Nie zmienia istniejących kont ani nie zastępuje globalnego przełącznika proxy. Jego wartość początkowa zachowuje poprzednie zachowanie. Wyłącz tę opcję raz, aby tworzyć przyszłe konta z domyślnie wyłączonym serwerem proxy.

Preferencje są przechowywane jako `defaultNewConnectionProxyEnabled` w istniejących ustawieniach API. Domyślnie jest to `true` jeśli nigdy nie jest zapisywany. Zapisanie `false` obowiązuje dla kolejnych nowych kont bez ponownego uruchamiania. `POST /api/providers` akceptuje opcjonalną, ścisłą wartość logiczną `proxyEnabled`; jawne `true` lub `false` ma pierwszeństwo przed domyślnym ustawieniem tworzenia. Pominięcie zduplikowanego konta lub ponowne połączenie OAuth zachowuje przechowywany stan tego konta. Konta indywidualne można później nadal włączać i wyłączać.

Selektywne transfery dostawców korzystają z ustawień domyślnych instalacji docelowej dla nowych kont i zachowują zasady docelowe podczas zastępowania istniejących kont. Przełączniki proxy nie są przenośnymi polami transferu. Pełne przywracanie kopii zapasowych i migracja historii JSON/SQL zachowują istniejącą semantykę przywracania, w tym zapisane wartości konta i domyślne ustawienia schematu starszego typu; pełne przywrócenie ustawień może również przywrócić tę preferencję.

Ta preferencja nie przypisuje serwera proxy ani nie ustala, czy jest on sprawny lub używany. Rzeczywisty routing nadal zależy od globalnego przełącznika proxy i odpowiedniej konfiguracji proxy. Dostawcy syntetyczni bez trwałego konta, ruch OAuth przed utworzeniem konta, serwery proxy environment/system i sieci zewnętrznych backendów są poza jego zakresem.

## 4-poziomowy system proxy

OmniRoute obsługuje konfigurację proxy w **czterech niezależnych zakresach**, rozstrzyganych według kolejności priorytetów:

```
Kolejność rozstrzygania priorytetów (od najwyższego → do najniższego):

  1. 🔵 Proxy konta/połączenia  →  dla każdego klucza API / połączenia OAuth
  2. 🟡 Proxy dostawcy          →  dla każdego dostawcy (np. cały ruch OpenAI)
  3. 🟠 Proxy kombinacji        →  dla każdej kombinacji/konfiguracji routingu
  4. 🟢 Globalne proxy          →  cały ruch, wszyscy dostawcy
```

### Jak działa rozstrzyganie

Gdy OmniRoute wysyła żądanie do dostawcy nadrzędnego, wywołuje funkcję `resolveProxyForConnectionFromRegistry()`, która sprawdza kolejno każdy poziom:

1. **Poziom konta** — Czy do tego konkretnego identyfikatora połączenia przypisano proxy?
2. **Poziom dostawcy** — Czy do tego dostawcy (np. `openai`) przypisano proxy?
3. **Poziom globalny** — Czy skonfigurowano globalne proxy?
4. **Brak proxy** — Bezpośrednie połączenie z dostawcą.

Obowiązuje pierwsze dopasowanie. Oznacza to, że można ustawić globalne proxy jako rozwiązanie zapasowe, a następnie zastąpić je dla określonych dostawców lub połączeń.

### Jaki ruch przechodzi przez proxy

| Typ ruchu             | Przez proxy? | Uwagi                                             |
| --------------------- | ------------ | ------------------------------------------------- |
| Uzupełnienia czatu    | ✅           | Wszystkie żądania `/v1/chat/completions`          |
| Embeddingi            | ✅           | `/v1/embeddings`                                  |
| Generowanie obrazów   | ✅           | `/v1/images/generations`                          |
| Dźwięk (TTS/STT)      | ✅           | `/v1/audio/*`                                     |
| Wymiana tokenu OAuth  | ✅           | Rozwiązuje `unsupported_country_region_territory` |
| Testy połączenia      | ✅           | Przycisk „Testuj połączenie” używa proxy          |
| Odświeżanie tokenu    | ✅           | Odnawianie OAuth w tle                            |
| Synchronizacja modeli | ✅           | Wyświetlanie i wykrywanie modeli                  |

---

## Rejestr proxy (CRUD)

Rejestr proxy to tabela SQLite (`proxy_registry`), w której przechowywane są wszystkie proxy. Każde proxy ma następujące pola:

| Pole       | Typ              | Opis                                                             |
| ---------- | ---------------- | ---------------------------------------------------------------- |
| `id`       | UUID             | Unikatowy identyfikator                                          |
| `name`     | Ciąg znaków      | Etykieta czytelna dla człowieka                                  |
| `type`     | Ciąg znaków      | Protokół: `http`, `https`, `socks5`                              |
| `host`     | Ciąg znaków      | Nazwa hosta lub adres IP proxy                                   |
| `port`     | Liczba całkowita | Numer portu                                                      |
| `username` | Ciąg znaków      | Nazwa użytkownika do uwierzytelniania (zaszyfrowana w spoczynku) |
| `password` | Ciąg znaków      | Hasło do uwierzytelniania (zaszyfrowane w spoczynku)             |
| `region`   | Ciąg znaków      | Etykieta regionu geograficznego                                  |
| `notes`    | Ciąg znaków      | Notatki w dowolnej formie                                        |
| `status`   | Ciąg znaków      | `active` lub `inactive`                                          |
| `source`   | Ciąg znaków      | `manual` lub `oneproxy`                                          |

### Tworzenie proxy

**Za pośrednictwem panelu:**

1. Przejdź do **Ustawienia → Proxy**
2. Kliknij **Dodaj proxy**
3. Wprowadź typ, host, port oraz opcjonalne dane uwierzytelniające
4. Zapisz

**Za pośrednictwem API:**

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

### Aktualizowanie proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Uwaga:** Dane uwierzytelniające są zachowywane, chyba że jawnie prześlesz niepuste wartości zastępcze. Przesłanie pustych ciągów znaków w polach `username`/`password` spowoduje zachowanie przechowywanych wartości.

### Usuwanie proxy

```bash
# Zakończy się niepowodzeniem, jeśli proxy jest przypisane do dowolnego zakresu
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Wymusza usunięcie (usuwa również przypisania)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Wyświetlanie listy proxy

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Przypisywanie proxy do zakresów

```bash
# Przypisz do zakresu globalnego
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Przypisz do określonego dostawcy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Przypisz do określonego połączenia/klucza
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Rozstrzyganie efektywnego proxy

Sprawdź, które proxy zostałoby użyte dla danego połączenia:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Zwraca rozstrzygnięte proxy wraz z jego poziomem (`account`, `provider` lub `global`) oraz źródłem.

### Przypisywanie zbiorcze

Przypisz jedno proxy do wielu dostawców lub połączeń jednocześnie:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Import/eksport

Proxy są uwzględniane w systemie **Kopii zapasowej/przywracania**. Podczas eksportowania konfiguracji OmniRoute:

1. Przejdź do **Panel → Ustawienia → Kopia zapasowa**
2. Kliknij **Eksportuj** — rejestr proxy i przypisania zostaną uwzględnione
3. Aby przywrócić konfigurację, kliknij **Importuj** i prześlij plik kopii zapasowej

Rejestr proxy obsługuje również operację **upsert według hosta i portu** — jeśli zaimportujesz proxy, które już istnieje (ten sam host i port), zostanie ono zaktualizowane zamiast utworzenia duplikatu.

### Migracja ze starszej wersji

Jeśli skonfigurowano serwery proxy w starszej wersji (sprzed wprowadzenia rejestru), OmniRoute automatycznie je zmigruje:

```
Starszy magazyn key_value → proxy_registry + proxy_assignments
```

Dzieje się to jednorazowo przy pierwszym uruchomieniu po aktualizacji. Użyj `migrateLegacyProxyConfigToRegistry({ force: true })`, aby ponownie przeprowadzić migrację.

---

## 1proxy Bezpłatny rynek proxy

> 🆕** Dodane przez [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/cheaper-inference/OmniRoute/pull/1847) (Problem [#1788](https://github.com/cheaper-inference/OmniRoute/issues/1788) )

OmniRoute integruje się z** [1 serwer proxy](https://1proxy-api.aitradepulse.com)** platforma społecznościowa, do której można uzyskać dostęp** setki bezpłatnych, zweryfikowanych serwerów proxy** z całego świata. Jest to idealne rozwiązanie dla użytkowników, którzy nie mają własnej infrastruktury proxy.

### Jak to działa

```
┌─────────────┐     Sync      ┌─────────────────┐    Rotate     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (external) │   up to 500   │  source=oneproxy │  by quality   │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **Synchronizuj** — OmniRoute pobiera sprawdzone proxy z 1proxy API
2. **Sklep** — Proxy są zapisywane w tej samej tabeli `proxy_registry` co `source = 'oneproxy'`
3. **Filtr** — Filtruj według protokołu, kraju i wyniku jakości
4. **Obracać** — Wybierz najlepszy serwer proxy, korzystając ze strategii jakościowej, losowej lub sekwencyjnej
5. **Autodegradacja** — Nieudane serwery proxy mają obniżony wynik jakości; poniżej progu → oznaczony jako nieaktywny

### Synchronizowanie serwerów proxy

**Za pośrednictwem panelu:**

1. Idź do** Ustawienia → 1proxy** patka
2. Trzask** „Synchronizuj teraz”**
3. Zobacz statystyki: łączna liczba serwerów proxy, liczba aktywnych, średnia jakość, podział według krajów

**Przez API:**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtrowanie serwerów proxy

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

### Wyniki jakości proxy

Każdy serwer proxy 1proxy zawiera metadane:

| Pole            | Opis                                                          |
| --------------- | ------------------------------------------------------------- |
| `qualityScore`  | Ocena 0-100 z walidacji 1proxy                                |
| `latencyMs`     | Zmierzone opóźnienie sieci                                    |
| `anonymity`     | `transparent`, `anonymous` lub `elite`                        |
| `googleAccess`  | Określa, czy serwer proxy może uzyskać dostęp do usług Google |
| `countryCode`   | Dwuliterowy kod kraju ISO                                     |
| `lastValidated` | Znacznik czasu ostatniej walidacji                            |

Wyniki jakości są dostosowywane dynamicznie:

- **Nieudane żądania** obniżyć wynik o 10 punktów
- **Wynik spada do ≤ 10** serwer proxy → jest oznaczony jako `inactive`
- Nieaktywne proxy są wyłączone z rotacji

### Strategie rotacyjne

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

### Wyłącznik automatyczny

Synchronizacja 1proxy ma wbudowany wyłącznik automatyczny:

- Po** 5 kolejnych błędów synchronizacji** , dalsze próby synchronizacji zostaną zablokowane
- Zresetuj za pomocą: `resetOneproxyCircuitBreaker()` lub zrestartuj serwer
- Stan synchronizacji jest dostępny na `GET /api/settings/oneproxy?action=status`

### Czyszczenie 1proxy proxy

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Ochrona przed wykrywaniem i ukrywanie się

OmniRoute nie tylko kieruje ruch przez serwer proxy — ale sprawia, że ruch wygląda na legalny:

### TLS Fałszowanie odcisków palców

Używa `wreq-js` do generowania odcisków palców TLS podobnych do przeglądarki, omijając systemy wykrywania botów, które flagują uściski dłoni TLS inne niż przeglądarka.

### CLI Dopasowanie odcisków palców

The**CLI Przełącznik odcisku palca** (`Settings → Security`) zmienia kolejność nagłówków HTTP i pól treści JSON, aby dopasować je do dokładnego podpisu natywnych plików binarnych CLI (kod Claude, Codex itp.). To działa** na górze** pełnomocnik:

```
Your IP (blocked) → Proxy IP (US) → Provider API
                    + TLS spoof
                    + CLI fingerprint
```

Dostajesz oba** maskowanie IP** I** poproś o autentyczność** jednocześnie.

### Pełnomocnik IP Konserwacja

Oznaczone kolorami plakietki na pulpicie nawigacyjnym pokazują, który poziom proxy jest aktywny:

| Odznaka | Poziom     | Oznaczający                                                 |
| ------- | ---------- | ----------------------------------------------------------- |
| 🟢      | Światowy   | Cały ruch przechodzi przez ten serwer proxy                 |
| 🟡      | Dostawca   | Tylko ruch tego dostawcy jest przesyłany przez serwer proxy |
| 🔵      | Połączenie | Ta konkretna key/account używa tego proxy                   |

Odznaka pokazuje również rozwiązany serwer proxy IP w celu weryfikacji.

---

## Tryby nadrzędnego proxy

W przypadku dostawców korzystających ze wzorca CLIProxyAPI OmniRoute obsługuje trzy tryby nadrzędnego proxy:

| Tryb          | Opis                                                       |
| ------------- | ---------------------------------------------------------- |
| `native`      | OmniRoute obsługuje routing proxy bezpośrednio (domyślnie) |
| `cliproxyapi` | Deleguje obsługę do zewnętrznej instancji CLIProxyAPI      |
| `fallback`    | Najpierw próbuje trybu natywnego, a następnie CLIProxyAPI  |

Konfiguracja dla poszczególnych dostawców:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Interfejs panelu

### Ustawienia → karta Proxy

- Konfiguracja **globalnego proxy** (ustawiana raz dla całego ruchu)
- Nadpisywanie ustawień proxy **dla poszczególnych dostawców**
- Przypisywanie proxy **do poszczególnych połączeń**
- **Test połączenia** przez skonfigurowany serwer proxy
- **Oznaczone kolorami plakietki** pokazujące aktywny poziom proxy

### Ustawienia → karta 1proxy

- Przycisk **Synchronizuj teraz** do pobierania bezpłatnych serwerów proxy
- **Karty statystyk**: Łącznie, Aktywne, Śr. jakość, Ostatnia synchronizacja
- **Filtry**: Protokół, Kod kraju, Min. jakość
- **Tabela proxy** zawierająca host, protokół, kraj, wynik jakości, opóźnienie, anonimowość i dostęp do Google
- Panel **stanu synchronizacji** ze śledzeniem powodzeń, niepowodzeń i liczby kolejnych niepowodzeń
- Opcja **Wyczyść wszystko** usuwająca wszystkie wpisy 1proxy

---

## Dokumentacja API

### API ustawień proxy

| Metoda   | Punkt końcowy                                  | Opis                               |
| -------- | ---------------------------------------------- | ---------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Pobiera pełną konfigurację proxy   |
| `GET`    | `/api/settings/proxy?level=global`             | Pobiera globalne proxy             |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Pobiera proxy dostawcy             |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Ustala efektywne proxy             |
| `PUT`    | `/api/settings/proxy`                          | Aktualizuje konfigurację proxy     |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Usuwa proxy na określonym poziomie |

### API rejestru proxy

| Metoda   | Punkt końcowy                                     | Opis                                |
| -------- | ------------------------------------------------- | ----------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Wyświetla listę wszystkich proxy    |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Pobiera proxy według identyfikatora |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Pobiera przypisania proxy           |
| `POST`   | `/api/v1/management/proxies`                      | Tworzy proxy                        |
| `PATCH`  | `/api/v1/management/proxies`                      | Aktualizuje proxy                   |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Usuwa proxy                         |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Wymusza usunięcie                   |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Przypisuje zbiorczo                 |
| `GET`    | `/api/v1/management/proxies/assignments`          | Wyświetla listę przypisań           |
| `GET`    | `/api/v1/management/proxies/health`               | Pobiera statystyki kondycji proxy   |

### API tuneli

Informacje o udostępnianiu instancji OmniRoute w publicznym internecie (Cloudflare/ngrok/Tailscale) zamiast kierowania ruchu wychodzącego przez proxy można znaleźć w pliku [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). Interfejs REST API tuneli znajduje się pod ścieżką `/api/tunnels/{cloudflared,ngrok,tailscale}/*` i jest niezależny od opisanego powyżej łańcucha wychodzących serwerów proxy.

### API 1proxy

| Metoda   | Punkt końcowy                          | Opis                                     |
| -------- | -------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Wyświetla listę serwerów proxy 1proxy    |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Pobiera statystyki i stan synchronizacji |
| `GET`    | `/api/settings/oneproxy?action=status` | Pobiera tylko stan synchronizacji        |
| `POST`   | `/api/settings/oneproxy`               | Uruchamia synchronizację                 |
| `POST`   | `/api/settings/oneproxy/rotate`        | Przełącza na następny serwer proxy       |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Usuwa jeden wpis                         |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Usuwa wszystkie wpisy                    |

### API nadrzędnego proxy

| Metoda   | Punkt końcowy                     | Opis                                   |
| -------- | --------------------------------- | -------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Pobiera konfigurację nadrzędnego proxy |
| `PUT`    | `/api/upstream-proxy/:providerId` | Ustawia tryb nadrzędnego proxy         |
| `DELETE` | `/api/upstream-proxy/:providerId` | Usuwa konfigurację nadrzędnego proxy   |

---

## Zmienne środowiskowe

| Zmienna               | Wartość domyślna | Opis                                                                  |
| --------------------- | ---------------- | --------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`           | Włącza obsługę proxy SOCKS5 (domyślnie `true` w pliku `.env.example`) |

---

## Rozwiązywanie problemów

### „Proxy SOCKS5 jest wyłączone”

Ustaw `ENABLE_SOCKS5_PROXY=true` w pliku `.env` i uruchom ponownie.

### Błędy „socket hang up” podczas korzystania z proxy

Jest to normalne w przypadku tanich serwerów proxy, które zrywają nieaktywne połączenia. OmniRoute już obsługuje ten problem poprzez:

- Wyłączenie utrzymywania aktywności połączeń proxy (`keepAliveTimeout: 1`)
- Wyłączenie potokowania (`pipelining: 0`)
- Buforowanie dyspozytorów, aby uniknąć powtarzania uzgadniania połączeń

Jeśli problem nadal występuje, wypróbuj inne proxy lub użyj funkcji rotacji 1proxy.

### „unsupported_country_region_territory” podczas OAuth

Upewnij się, że proxy zostało skonfigurowane **przed** rozpoczęciem procesu OAuth. OmniRoute kieruje wymianę tokenów OAuth przez skonfigurowane proxy. Najpierw ustaw proxy globalne lub na poziomie dostawcy, a następnie nawiąż połączenie.

### Proxy nie jest używane

Sprawdź kolejność rozstrzygania:

1. Zweryfikuj za pomocą `GET /api/settings/proxy?resolve=your-connection-id`
2. Sprawdź, czy `status` proxy ma wartość `active` (a nie `inactive`)
3. Upewnij się, że zakres przypisania proxy odpowiada Twojemu połączeniu

### Niepowodzenie synchronizacji 1proxy

Sprawdź stan synchronizacji:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Jeśli `consecutiveFailures >= 5`, wyłącznik automatyczny został aktywowany. Uruchom ponownie serwer, aby go zresetować, lub poczekaj na ręczne zresetowanie.

---

## Schemat bazy danych

### Tabela `proxy_registry`

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
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' lub 'oneproxy'
  quality_score INTEGER,                     -- 0–100 (tylko 1proxy)
  latency_ms INTEGER,                        -- milisekundy (tylko 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- czy ma dostęp do Google? (1proxy)
  last_validated TEXT,                       -- znacznik czasu ISO (1proxy)
  country_code TEXT,                         -- 2-literowy kod ISO (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabela `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- identyfikator dostawcy, połączenia lub kombinacji
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Sprawdzanie kondycji proxy (v3.8.16+)

Mechanizm **szybkiego wykrywania awarii proxy** w OmniRoute (`src/lib/proxyHealth.ts`) wykrywa niedziałające serwery proxy w czasie krótszym niż 2 s za pomocą szybkiego sprawdzenia połączenia TCP, a następnie **buforuje wynik**, aby uniknąć narzutu przy każdym żądaniu.

### Jak to działa

```
Żądanie ──▶ ProxyHealthCache.get(url)
             │
             ├─ Trafienie w pamięci podręcznej + aktualne?  ──▶ zwróć zapisany stan
             │
             └─ Brak w pamięci podręcznej / nieaktualne?  ──▶ połącz przez TCP z host:port
                                                               (limit czasu: FAST_FAIL_TIMEOUT_MS)
                                                               ──▶ zapisz na HEALTH_CACHE_TTL_MS
                                                               ──▶ zwróć wynik
```

Bez tego niedziałające proxy blokowałoby każde żądanie przez cały okres `PROXY_TIMEOUT_MS` (domyślnie 30 s), zanim wystąpiłby błąd.

### Konfigurowalne zmienne środowiskowe

| Zmienna                      | Wartość domyślna | Przeznaczenie                                               |
| ---------------------------- | ---------------- | ----------------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`           | Limit czasu połączenia TCP dla każdego sprawdzenia          |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`          | Czas przechowywania wyniku sprawdzenia w pamięci podręcznej |

**Zalecane wartości:**

| Scenariusz                               | Limit szybkiej awarii | TTL pamięci podręcznej | Uzasadnienie                                                                                    |
| ---------------------------------------- | --------------------- | ---------------------- | ----------------------------------------------------------------------------------------------- |
| Brama API o dużej przepustowości         | 1500ms                | 60000ms                | Agresywne szybkie przerywanie i dłuższe buforowanie ograniczające liczbę kontroli               |
| Węzły rozproszone geograficznie          | 3000ms                | 15000ms                | Wolniejsze sieci potrzebują więcej czasu; krótsze buforowanie przyspiesza przełączanie awaryjne |
| Programowanie / testowanie               | 1000ms                | 10000ms                | Szybkie iteracje na lokalnych serwerach proxy                                                   |
| Tryb dyskretny / ochrona przed wykryciem | 2500ms                | 45000ms                | Unikanie częstego sondowania, które mogłoby uruchomić ograniczenia liczby żądań                 |

### Sprawdzanie kondycji proxy

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Wymuś ponowne sprawdzenie określonego proxy
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Flaga `stale` ma wartość `true`, gdy wpis w pamięci podręcznej przekroczył `HEALTH_CACHE_TTL_MS`, a następne żądanie wywoła nowe sprawdzenie.

### Domyślne wartości według typu proxy

Sprawdzanie kondycji używa odpowiednich wartości domyślnych zależnych od schematu URL:

| Schemat                    | Port domyślny |
| -------------------------- | ------------- |
| `http://`                  | 8080          |
| `https://`                 | 443           |
| `socks5://` / `socks5h://` | 1080          |

Niestandardowe porty w adresie URL (`http://host:9999`) zawsze mają pierwszeństwo przed wartością domyślną schematu.

---

## Analityka i obserwowalność serwerów proxy

OmniRoute śledzi użycie poszczególnych serwerów proxy, aby pomóc operatorom diagnozować wzorce routingu, skoki opóźnień i powtarzające się awarie.

### Śledzone dane

Dla każdego żądania przechodzącego przez skonfigurowany serwer proxy OmniRoute rejestruje:

| Metryka      | Opis                                                                      |
| ------------ | ------------------------------------------------------------------------- |
| `proxy_url`  | Pełny URL serwera proxy (z ukrytymi danymi logowania)                     |
| `provider`   | Identyfikator dostawcy nadrzędnego (openai, anthropic itd.)               |
| `latency_ms` | Całkowity czas przesłania żądania i odpowiedzi, w tym uzgadnianie z proxy |
| `connect_ms` | Tylko czas nawiązania połączenia TCP                                      |
| `status`     | Kod statusu HTTP od dostawcy nadrzędnego                                  |
| `error`      | Klasa błędu, jeśli żądanie zakończyło się niepowodzeniem                  |
| `timestamp`  | ISO 8601 UTC                                                              |

### Dostęp do danych

```bash
# Ostatnie zdarzenia proxy
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Rzeczywisty punkt końcowy to `/api/usage/proxy-logs` (zobacz `src/app/api/usage/proxy-logs/route.ts`). Ten punkt końcowy obsługuje:

- `GET /api/usage/proxy-logs` — pobieranie dzienników proxy
- `DELETE /api/usage/proxy-logs` — usuwanie wszystkich dzienników proxy

W razie potrzeby zagregowane statystyki można pobierać bezpośrednio z tabeli `proxy_logs` za pomocą SQL. Interfejs panelu może udostępniać widoki zagregowane.

### Typowe wzorce

**Wykrywanie niestabilnego serwera proxy** (naprzemienne powodzenie i niepowodzenie):

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

**Wyszukiwanie powolnych serwerów proxy** (opóźnienie p95 > 2 s):

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

## Drzewo decyzyjne strategii rotacji

Gdy do zakresu przypisano wiele serwerów proxy, OmniRoute używa **strategii rotacji**, aby wybrać serwer używany dla każdego żądania. Strategię konfiguruje się na poziomie zakresu (globalnie, dla poszczególnych dostawców, kont lub kombinacji).

### Dostępne strategie

| Strategia            | Kiedy używać                                                     | Kompromis                                                            |
| -------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------- |
| `quality` (domyślna) | Środowisko produkcyjne z serwerami proxy o zróżnicowanej jakości | Preferuje wysoko oceniane serwery proxy; może pomijać nisko oceniane |
| `random`             | Rozkład obciążenia, prywatność                                   | Równomierny rozkład; ignoruje wskaźniki jakości                      |
| `sequential`         | Debugowanie, testy deterministyczne                              | Cyklicznie wybiera serwery proxy po kolei; łatwa do zrozumienia      |

### Drzewo decyzyjne

```
                    Czy masz oceny jakości swoich serwerów proxy?
                    │
        ┌───────────┴───────────┐
        │                       │
       TAK                     NIE
        │                       │
   Czy wszystkie serwery       │
   proxy mają zbliżoną          │
   jakość?                      │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  TAK       NIE               Użyj
   │         │              `random`
   │         │              (równomierny
   │         │              rozkład z czasem
   │         │              dostarcza danych
   │         │              o jakości)
   │         │
   │    Użyj `quality`
   │    (najlepsza dla
   │    zróżnicowanej jakości)
   │
Użyj `random`
(równomiernie
rozłóż obciążenie)
```

## Automatyczne wykluczanie awarii dla własnych serwerów proxy

Pula 1proxy marketplace już sama automatycznie degraduje uszkodzone serwery proxy (zobacz [Wyniki Jakości serwerów proxy](#proxy-quality-scores) ). Dla proxy** Ty** dodany do rejestru harmonogram kondycji tła (`src/lib/proxyHealth/scheduler.ts`) zapewnia to samo zachowanie „automatycznie wykluczaj martwego członka z łańcucha”, bez usuwania czegokolwiek:

```bash
# .env — soft-disable a proxy after 3 consecutive failed probes, re-enable it
# automatically once it starts answering probes again.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Jak to pasuje do łańcucha z wieloma serwerami proxy:

1. Program planujący sonduje każdy zarejestrowany serwer proxy co każde `PROXY_HEALTH_INTERVAL_MS` (domyślnie 10 minut; minimalnie 1 minuta).
2. Po `PROXY_AUTO_REMOVE_AFTER` kolejnych** rozstrzygający** awarie (rzeczywisty błąd połączenia — przekroczenie limitu czasu lub własne 5xx celu sondy nigdy się nie liczy, zobacz [Sprawdzanie stanu serwera proxy](#proxy-health-checking-v3816) ), `status` serwera proxy jest ustawione na `dead`.
3. `dead` to jeden ze statusów, który wyklucza filtr stanu aktywności używany przez rozdzielczość pool/rotation, więc rotacja zakresu (działanie okrężne / losowe / lepkie / opóźnienie / sesja — patrz [Drzewo decyzyjne strategii rotacji](#rotation-strategy-decision-tree) ) natychmiast przestaje przekazywać ten serwer proxy nowym żądaniom. Nie ma to wpływu na żadne inne serwery proxy w puli, a cała pula nigdy po cichu nie powraca do bezpośredniego połączenia. — patrz [4-poziomowy system proxy](#4-level-proxy-system) zapewniający zabezpieczenie przed awarią.
4. Program planujący sprawdza serwery proxy `dead` w tych samych odstępach czasu. Następna udana sonda odwraca `status` z powrotem do `active` i ponownie wchodzi w rotację — nie jest wymagane ręczne ponowne dodawanie.

To jest celowe** dobrowolne i nieniszczące** : domyślnie program planujący zlicza i rejestruje tylko awarie (zobacz politykę C w `decision.ts`), a `PROXY_AUTO_DISABLE` nigdy nie usuwa wiersza —, do czego służy osobna, bardziej agresywna flaga `PROXY_AUTO_REMOVE`. Jeśli oba są ustawione na `true`, wygrywa `PROXY_AUTO_REMOVE` (proxy, które ma zostać usunięte, nie ma zastosowania do miękkiego wyłączania pomiędzy). Pełną listę zmiennych znajdziesz w dokumentacji [konfiguracji środowiska](../reference/ENVIRONMENT.md).

---

> 📖** Powiązana dokumentacja:**
>
> - [Podręcznik użytkownika](../guides/USER_GUIDE.md) — Ogólna konfiguracja i konfiguracja - [API Odniesienie](../reference/API_REFERENCE.md) — Pełna dokumentacja API - [Konfiguracja środowiska](../reference/ENVIRONMENT.md) — Wszystkie zmienne środowiskowe
