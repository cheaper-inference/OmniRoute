# 🗜️ Prompt Compression Guide — OmniRoute (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automatycznie oszczędzaj 15–95% tokenów w kwalifikującym się kontekście. Krótkie omówienie znajdziesz w [sekcji README dotyczącej kompresji](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Omówienie

OmniRoute implementuje modułowy potok kompresji promptów, który działa **proaktywnie**, zanim żądania trafią do dostawców nadrzędnych. Oznacza to, że tokeny są oszczędzane w sposób niezauważalny — bez konieczności wprowadzania zmian w przepływie pracy.

```
Żądanie klienta
  → Selektor strategii kompresji
    → Nadpisanie przez kombinację? → Użyj ustawienia kombinacji
    → Próg automatycznego uruchomienia? → Użyj trybu automatycznego
    → Tryb domyślny? → Użyj ustawienia globalnego
    → Wyłączone? → Pomiń kompresję
  → Wybrany tryb kompresji
    → Wyłączony: Bez kompresji
    → Lekki: Bezpieczne porządkowanie białych znaków i formatowania (~15%)
    → Standardowy: Usuwanie wypełniaczy w stylu mowy jaskiniowca (~30%)
    → Agresywny: Starzenie historii + podsumowywanie (~50%)
    → Ultra: Przycinanie heurystyczne + redukcja bloków kodu (~75%)
    → RTK: Filtrowanie danych wyjściowych terminala/narzędzi z uwzględnieniem poleceń (60–90% po stronie dostawcy nadrzędnego)
    → Warstwowy: Uporządkowany potok wielu silników, zwykle RTK, a następnie Caveman (78–95% kwalifikującego się zakresu)
  → Skompresowane żądanie → Dostawca
```

---

## Tryby kompresji

### Wyłączony

Kompresja nie jest stosowana. Wszystkie wiadomości są przekazywane bez zmian.

### Tryb lekki (~15% oszczędności, opóźnienie <1ms)

Najbezpieczniejszy tryb — bez zmian semantycznych, wyłącznie porządkowanie formatowania:

| Technika                 | Opis                                                           |
| ------------------------ | -------------------------------------------------------------- |
| `collapseWhitespace`     | Łączenie kolejnych pustych wierszy i usuwanie końcowych spacji |
| `dedupSystemPrompt`      | Usuwanie zduplikowanych wiadomości systemowych                 |
| `compressToolResults`    | Kompresowanie rozwlekłych wyników narzędzi/funkcji             |
| `removeRedundantContent` | Usuwanie powtarzających się instrukcji                         |
| `replaceImageUrls`       | Skracanie identyfikatorów URI danych obrazów base64            |

**Najlepszy do:** Stałego użycia i przepływów pracy o krytycznym znaczeniu dla bezpieczeństwa.

### Tryb standardowy (~30% oszczędności)

Inspirowany rozwiązaniem [Caveman](https://github.com/JuliusBrussee/caveman) — usuwa słowa-wypełniacze i rozwlekłe sformułowania, zachowując znaczenie:

- Usuwa słowa-wypełniacze („proszę”, „myślę, że”, „zasadniczo”, „właściwie”)
- Skraca rozwlekłe wyrażenia („w celu” → „aby”, „w wyniku” → „ponieważ”)
- Usuwa uprzejme asekuracyjne sformułowania („Czy zechcesz...”, „Jeśli mógłbyś...”)
- Ponad 30 reguł regex dostosowanych do promptów programistycznych

**Najlepszy do:** Codziennych zadań programistycznych i zespołów dbających o koszty.

### Tryb agresywny (~50% oszczędności)

Inteligentne zarządzanie historią podczas długich sesji:

- **Starzenie wiadomości** — starsze wiadomości są stopniowo coraz bardziej kompresowane
- **Kompresja wyników narzędzi** — długie wyniki narzędzi są skracane lub pomijane (pierwsze/ostatnie wiersze,
  filtrowanie wierszy z dopasowaniami, kompaktowanie kluczy JSON)
- **Mechanizmy ochrony integralności strukturalnej** — zapewniają spójność par `tool_use` + `tool_result`
- **Uwzględnianie okna kontekstu** — respektuje limity tokenów poszczególnych modeli

**Najlepszy do:** Rozbudowanych sesji debugowania i dużych baz kodu.

### Tryb Ultra (~75% oszczędności)

Maksymalna kompresja w scenariuszach, w których liczba tokenów ma krytyczne znaczenie:

- **Przycinanie heurystyczne** — przycinanie tokenów w prozie na podstawie punktacji
- **Zachowanie struktury** — wydzielone bloki kodu, kod wbudowany, adresy URL i identyfikatory są
  zastępowane znacznikami i ponownie wstawiane bez żadnych zmian; nigdy nie są przycinane
- **Opcjonalna warstwa SLM** — po skonfigurowaniu mały model lokalny może doprecyzować przycinanie
- Niezależny od trybu agresywnego: nie uruchamia starzenia wiadomości, kompresji wyników narzędzi
  ani awaryjnego modułu podsumowującego (tylko awaria warstwy SLM może skierować przebieg awaryjny
  przez tryb agresywny)

**Najlepszy do:** Sytuacji, w których wielokrotnie osiągasz limity kontekstu.

### Tryb RTK (60–90% po stronie dostawcy nadrzędnego)

Tryb RTK jest zoptymalizowany pod kątem obszernych wyników narzędzi pojawiających się w sesjach agentów programistycznych:

- Wykrywa klasy poleceń/wyników, takie jak `git status`, `git diff`, `git log`, narzędzia uruchamiające testy,
  kompilacje TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audyty/instalacje npm, logi Docker, wyniki narzędzi infrastrukturalnych
  oraz ogólne wyniki powłoki
- Stosuje pakiety filtrów JSON z `open-sse/services/compression/engines/rtk/filters/`
- Importuje filtry schematu RTK TOML v1 z projektowych lub globalnych plików `filters.toml`, z walidacją
  testów wbudowanych i kontrolą zaufania dla plików projektowych
- Zawiera 55 wbudowanych filtrów z osadzonymi przykładami weryfikacyjnymi
- Usuwa sekwencje sterujące ANSI, paski postępu, powtarzające się wiersze i nieistotny szum
- Zachowuje awarie, błędy, ostrzeżenia, zmienione pliki, podsumowania i końcową część długich wyników
- Obsługuje projektowe filtry z kontrolą zaufania, filtry globalne oraz opcjonalne odzyskiwanie zredagowanych surowych wyników

**Najlepszy do:** Sesji agentów obejmujących powłokę, kompilowanie, testowanie, git, grep i transkrypcje wyników plikowych.

### Tryb warstwowy (78–95% kwalifikującego się zakresu)

Tryb warstwowy uruchamia wiele silników kompresji w deterministycznej kolejności. Domyślny potok to:

```txt
RTK -> Caveman
```

Ta kolejność najpierw kompaktuje wyniki terminala/narzędzi, a następnie stosuje semantyczne skracanie Caveman do
pozostałej części promptu w języku naturalnym. Potoki warstwowe można konfigurować globalnie lub za pomocą
kombinacji kompresji przypisanych do kombinacji routingu.

**Najlepszy do:** Mieszanego kontekstu zawierającego duże logi narzędzi oraz instrukcje użytkownika lub podsumowania asystenta.

---

## Obliczanie oszczędności względem projektów bazowych

OmniRoute dokumentuje oszczędności wynikające z kompresji na podstawie dwóch źródeł: testów wydajności projektów bazowych oraz
własnej kompozycji silników OmniRoute.

| Źródło  | Wartość z README projektu bazowego użyta tutaj                                                                                                       |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` mniej tokenów wyjściowych, średnio `65%` oszczędności wyjścia w testach, zakres `22-87%` oraz narzędzie zapewniające `~46%` kompresji wejścia |
| RTK     | `60-90%` oszczędności dla danych wyjściowych poleceń; przykładowa sesja: `~118,000 -> ~23,900` tokenów, czyli oszczędność `79.7%` (`~80%`)           |

W przypadku nakładających się danych narzędzi i kontekstu domyślna kombinacja OmniRoute łączy silniki w następującej kolejności:

```txt
RTK -> Caveman
```

Łączne oszczędności są obliczane multiplikatywnie, a nie addytywnie:

```txt
łącznie = 1 - (1 - oszczędności RTK) * (1 - oszczędności wejścia Caveman)
średnia = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
zakres  = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Wartość `78-95%` ma zastosowanie, gdy zarówno RTK, jak i Caveman mogą zredukować te same dane wejściowe lub kontekst.
Tryb odpowiedzi wyjściowej Caveman jest niezależny: po jego włączeniu należy przyjąć własne oszczędności wyjścia Caveman (`65%`
średnio, `~75%` według głównej deklarowanej wartości, zakres `22-87%`). Łączne oszczędności rozliczeniowe zależą od proporcji danych wejściowych i wyjściowych.

### Co właściwie oznacza „kwalifikujący się”

Deklarowany zakres 15-95% jest rzeczywisty, ale dotyczy wyłącznie **nadmiarowej lub rozwlekłej** treści — powtarzających się
wierszy błędów, dziennika kompilacji zasypywanego tym samym ostrzeżeniem albo zbyt obszernego wyniku `grep`/odczytu pliku. **Nie**
oznacza to, że każde żądanie pozwala uzyskać takie oszczędności.

Potwierdzono empirycznie (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): uruchomienie
`stacked` (RTK + Caveman) na bloku `tool_result` w formacie Anthropic, zawierającym 300 identycznych
wierszy błędów, zapewniło **95.93% oszczędności tokenów / 96.26% oszczędności znaków** — dokładnie w deklarowanym
zakresie. Jednak ten sam potok zastosowany do zwykłych, pozbawionych nadmiarowości danych wyjściowych narzędzia (czystej listy dopasowań `grep`,
krótkiego odczytu pliku lub zwykłego tekstu konwersacyjnego) prawidłowo zapewnia **oszczędności bliskie zeru**, ponieważ
nie ma w nich powtarzalnych treści do usunięcia, a `validateCompression()` (`validation.ts`) nie zezwala na przekazanie
przekształconej treści, która usuwałaby lub zmieniała bloki kodu, adresy URL, nagłówki, wersje albo identyfikatory stałych zapisane WIELKIMI LITERAMI.

Jest to oczekiwane i bezpieczne zachowanie, a nie błąd: sesja programistyczna, która głównie odczytuje/przeszukuje czyste pliki,
zapewni umiarkowane łączne oszczędności nawet przy w pełni włączonej kompresji, natomiast sesja, która napotka zapętloną awarię
lub bardzo gadatliwy linter, osiągnie pełny zakres 78-95% dla tego ruchu. Nie należy uznawać niskiego łącznego procentu
oszczędności z pojedynczej sesji za dowód błędnej konfiguracji kompresji — najpierw należy sprawdzić, czy
bazowe dane wyjściowe narzędzia rzeczywiście były nadmiarowe.

---

## Wizualizacja oszczędności tokenów

```
Bez kompresji:          47K tokenów wysłanych do LLM
Z Lite:                 40K tokenów wysłanych          (15% oszczędności — bezpieczne, zawsze włączone)
Ze Standard:            33K tokenów wysłanych          (30% oszczędności — reguły caveman-speak)
Z Aggressive:           24K tokenów wysłanych          (50% oszczędności — starzenie + podsumowywanie)
Z Ultra:                12K tokenów wysłanych          (75% oszczędności — przycinanie heurystyczne)
Z RTK:                  19K-5K tokenów wysłanych       (60-90% oszczędności na danych wyjściowych poleceń/narzędzi)
Ze Stacked:             10K-2.5K tokenów wysłanych     (kwalifikujący się zakres 78-95% dla RTK+Caveman)
```

---

## Konfiguracja

### Panel

Przejdź do `Dashboard → Context & Cache`:

- **Caveman** — wybór trybu, pakiety językowe, podgląd i globalne ustawienia domyślne
- **RTK** — podgląd filtra poleceń, ustawienia bezpieczeństwa RTK i katalog filtrów
- **Compression Combos** — nazwane potoki silników przypisane do kombinacji routingu
- **Auto-Trigger Threshold** — automatyczne włączanie kompresji, gdy liczba tokenów przekroczy próg

### Nadpisanie dla kombinacji

W `Dashboard → Context & Cache → Compression Combos` przypisz kombinację kompresji do kombinacji
routingu:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Pozwala to używać wieloetapowej kompresji u darmowych dostawców i dostawców przeznaczonych do
programowania, zachowując jednocześnie tryb lekki w płatnych subskrypcjach.

To przypisanie „Nadpisanie dla kombinacji” jest innym mechanizmem sterującym niż nadpisanie
**trybu kompresji kombinacji routingu** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses —
schemat tego pola akceptuje również `rtk`, `stacked` i `omniglyph`) — to nadpisanie nie wybiera
nazwanego potoku kombinacji kompresji, lecz jedynie ustawia pole `compressionMode` używane przez
`resolveCompressionPlan`. Można je ustawić na karcie kombinacji (`Dashboard → Combos`) lub, od wersji
#6760, dla każdej kombinacji routingu na liście „Assign to routing” w
`Dashboard → Context & Cache → Compression Combos`, tuż obok opisanego powyżej pola wyboru
przypisania potoku. Oba interfejsy zapisują dane za pośrednictwem tego samego punktu końcowego
`PUT /api/combos/{id}`.

### Nadpisanie dla żądania

Wyślij nagłówek żądania `x-omniroute-compression`, aby nadpisać plan kompresji dla pojedynczego
żądania. Ma on najwyższy priorytet — zastępuje nadpisanie kombinacji routingu, aktywny profil,
automatyczne wyzwalanie oraz wartość domyślną z panelu. Nieznane wartości są ignorowane (żądanie
nigdy nie jest odrzucane), a globalny przełącznik główny nadal kontroluje wszystkie ustawienia:
gdy kompresja jest globalnie wyłączona, nagłówek nie może jej włączyć. Wartości:

| Wartość       | Efekt                                                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Brak kompresji dla tego żądania.                                                                                              |
| `default`     | Domyślny profil określony w panelu (ignoruje aktywny profil). Silniki stratne pozostają wyłączone.                            |
| `safe`        | Tak samo jak przy pominięciu nagłówka: tylko deduplikacja i redukcja białych znaków.                                          |
| `allow-lossy` | Zachowuje plan operatora tego żądania, w tym podsumowania, filtry trafności i zmiany stylu.                                   |
| `engine:<id>` | Pojedynczy silnik, jeśli jest włączony, np. `engine:rtk`. Jest to zgoda na użycie tego silnika dla danego żądania.            |
| `<combo>`     | Nazwana kombinacja, dopasowywana najpierw według nazwy (bez rozróżniania wielkości liter), a następnie według identyfikatora. |

Bez `allow-lossy`, `engine:<id>` lub nazwanej kombinacji silniki stratne nie są stosowane. Jeśli
kompresja jest włączona, żądanie nadal podlega deduplikacji sesji i redukcji białych znaków.

Zastosowany plan jest zwracany w nagłówku odpowiedzi
`X-OmniRoute-Compression: <mode>; source=<source>`, gdzie `<source>` przyjmuje jedną z wartości:
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` lub `off`.

### API

```bash
# Pobierz ustawienia kompresji
curl http://localhost:20128/api/settings/compression

# Zaktualizuj ustawienia kompresji
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Wyświetl podgląd określonego ładunku RTK/stacked
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Wyświetl listę pakietów filtrów RTK
curl http://localhost:20128/api/context/rtk/filters

# Przetestuj RTK bezpośrednio z opcjonalnymi metadanymi polecenia
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Co podlega ochronie

Silnik kompresji **zawsze zachowuje:**

- ✅ Bloki kodu (wydzielone i wbudowane)
- ✅ Adresy URL i ścieżki plików
- ✅ Struktury JSON i dane strukturalne
- ✅ Identyfikatory i chronione tokeny techniczne
- ✅ Wyrażenia matematyczne
- ✅ Definicje wywołań narzędzi/funkcji
- ✅ Prompty systemowe (w trybie lite)

Mechanizm odzyskiwania surowych danych wyjściowych RTK redaguje typowe klucze API, tokeny bearer, tokeny Slack, klucze dostępu AWS,
hasła, tokeny i dane poufne, zanim cokolwiek zostanie utrwalone.

---

## Statystyki kompresji

Każde skompresowane żądanie zawiera statystyki w logach serwera:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Harmonogram etapów

| Etap    | Tryby                                                                                                                                                         | Status    |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Etap 1  | Wyłączony, Lekki                                                                                                                                              | ✅ Wydano |
| Etap 2  | Standardowy, Agresywny, Ultra                                                                                                                                 | ✅ Wydano |
| Etap 3  | RTK, Stosowy, Kombinacje kompresji                                                                                                                            | ✅ Wydano |
| Etap 4  | Style danych wyjściowych, Ultra klasy SLM, zestaw ewaluacyjny                                                                                                 | ✅ Wydano |
| Etap 4C | Adaptacyjny budżet kontekstu („pokrętło”) — silnik obliczeniowy + API (`contextBudget` w `PUT /api/settings/compression`) + kontrolki trybu/polityki w panelu | ✅ Wydano |

---

## Podziękowania

Reguły kompresji trybu standardowego są inspirowane projektem **[Caveman](https://github.com/JuliusBrussee/caveman)** autorstwa **[Juliusa Brussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — popularnym projektem „po co używać wielu tokenów, skoro kilka wystarczy”. Caveman raportuje `~75%` mniej tokenów wyjściowych, średnią oszczędność danych wyjściowych w testach porównawczych na poziomie `65%`, zakres oszczędności danych wyjściowych `22-87%` oraz narzędzie do kompresji danych wejściowych na poziomie `~46%`.

Tryb RTK jest inspirowany projektem **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** autorstwa **[RTK AI](https://github.com/rtk-ai)** — wysokowydajnym projektem kompresji danych wyjściowych poleceń, przeznaczonym do filtrowania danych wyjściowych terminala, kompilacji, testów, systemu git i narzędzi. RTK raportuje oszczędności na poziomie `60-90%`, a przykładowa sesja w pliku README pokazuje oszczędność `~80%`.

---

## Zaawansowane systemy kompresji

Poza 7 trybami opisanymi powyżej (kod źródłowy akceptuje również tryby `codex-responses` i
`omniglyph`, których ten przewodnik nie omawia) poniższe sekcje opisują funkcje
działające wewnątrz tych trybów lub obok nich: kompresja wyników narzędzi i progresywne starzenie
to kroki 1 i 2 agresywnego silnika (tryb Aggressive oraz krok `aggressive`
potoku warstwowego), potok warstwowy określa sposób działania trybu Stacked, kompresja
uwzględniająca pamięć podręczną obniża `aggressive` i `ultra` do `standard` dla dostawców
korzystających z pamięci podręcznej, gdy kompresja jest włączona, a tryb odpowiedzi jaskiniowca
i style odpowiedzi są opcjonalnymi instrukcjami promptu systemowego,
domyślnie wyłączonymi, które kształtują odpowiedź modelu zamiast kompresować żądanie.

### Kompresja uwzględniająca pamięć podręczną

Niektórzy dostawcy (np. Anthropic z buforowaniem promptów) obsługują **buforowanie promptów**,
które pozwala im przechowywać części promptu w pamięci podręcznej, aby obniżyć koszty i opóźnienia. Gdy
buforowanie jest włączone, agresywna kompresja może w rzeczywistości **pogorszyć** wydajność,
ponieważ zmienia buforowane tokeny, unieważniając pamięć podręczną.

Moduł `cachingAware.ts` rozwiązuje ten problem przez **wykrywanie kontekstu buforowania** i
odpowiednie **dostosowywanie strategii kompresji**.

#### Jak to działa

1. **Wykrywanie kontekstu buforowania** — skanuje treść żądania w poszukiwaniu znaczników `cache_control`
2. **Identyfikowanie dostawców obsługujących buforowanie** — sprawdza, czy docelowy dostawca obsługuje buforowanie
3. **Dostosowywanie strategii** — obniża `aggressive`/`ultra` do `standard` dla dostawców obsługujących buforowanie
4. **Pomijanie promptu systemowego** — prompty systemowe są zazwyczaj buforowane, więc nie są kompresowane

Funkcja pomocnicza strategii zwraca również flagę `deterministicOnly`, ale konstruktor planu wykorzystuje
wyłącznie strategię — obecnie żaden dalszy element nie odczytuje tej flagi.

#### Przykład kodu

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Znacznik pamięci podręcznej
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kiedy używać

Kompresja uwzględniająca pamięć podręczną jest **zawsze włączona** — nie wymaga konfiguracji. Uruchamia się zawsze,
gdy kompresja jest włączona, a docelowy dostawca obsługuje buforowanie promptów (Anthropic, OpenAI
itp.); jawne znaczniki `cache_control` nie są wymagane — sam dostawca obsługujący buforowanie
powoduje obniżenie poziomu, natomiast same znaczniki nigdy tego nie robią (wykrywanie znaczników zasila telemetrię
pamięci podręcznej, a nie decyzję dotyczącą strategii).

### Progresywne starzenie

Długie konwersacje gromadzą wiele tur wiadomości, ale starsze tury stają się mniej
istotne. Moduł `progressiveAging.ts` **degraduje wiadomości według odległości tur**
(odległość jest mierzona od końca konwersacji). Przy dostarczanych wartościach domyślnych
(`verbatim: 2, light: 2, moderate: 3`):

- **Ostatnie 2 tury (odległość ≤ 2)**: zachowywane bez zmian
- **Odległość 3**: kompresja jaskiniowca (usuwanie wypełniaczy)
- **Odległość 4+**: wiadomości asystenta są podsumowywane; wiadomości użytkownika są ograniczane do pierwszego
  wiersza o maksymalnej długości 120 znaków; pozostałe role pozostają bez zmian. Prompty systemowe, wcześniej postarzone
  wiadomości oraz najnowsza wiadomość użytkownika są zawsze zachowywane bez zmian, niezależnie od odległości.
  Nic nie jest całkowicie usuwane, a zakres `light`
  jest nieosiągalny przy dostarczanych wartościach domyślnych (`light` jest równy `verbatim`).

#### Przykład kodu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 kolejnych tur ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // ostatnie 3 tury: bez zmian
  light: 8, // odległość <= 8: lekka kompresja
  moderate: 20, // odległość <= 20: kompresja jaskiniowca
  fullSummary: 5, // wymagane przez typ, nieodczytywane przez kod podziału na zakresy
  // odległość > 20: podsumowanie (asystent) / zachowanie pierwszego wiersza (użytkownik)
});

// saved = liczba zaoszczędzonych tokenów
```

#### Kiedy używać

Progresywne starzenie jest **zawsze włączone** w trybie `aggressive` — stanowi krok 2 funkcji
`compressAggressive()`. Tryb Ultra go nie uruchamia. Jest
szczególnie skuteczne w przypadku:

- Długotrwałych sesji programistycznych
- Konwersacji trwających wiele dni
- Przepływów pracy agentów z wieloma wywołaniami narzędzi

### Tryb odpowiedzi jaskiniowca

Tryb odpowiedzi jaskiniowca dodaje **instrukcje promptu systemowego**, które proszą sam model o
zwięzłą odpowiedź — poziom `lite` prosi o zwięzłe odpowiedzi zachowujące pełne zdania, `full`
prosi, aby „odpowiadać zwięźle jak inteligentny jaskiniowiec”, a `ultra` prosi o odpowiedzi telegraficzne;
instrukcje jedynie o to proszą i nie mogą tego zagwarantować. Żądania otrzymują je za pośrednictwem
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` najpierw ustala wybór za pomocą warstwy zgodności wstecznej
(`resolveOutputStyleSelection()` w
`open-sse/services/compression/outputStyles/backCompat.ts`), która, gdy `outputStyles`
jest pusty, mapuje włączony `cavemanOutputMode` na styl odpowiedzi `terse-prose` o
intensywności `cavemanOutputMode.intensity` (patrz Zgodność wsteczna poniżej); niepusty wybór `outputStyles`
jest używany bez zmian, a `cavemanOutputMode.enabled` i `intensity` nie mają wtedy
wpływu, natomiast przełącznik `autoClarity` nadal obowiązuje. Plik `outputMode.ts` zawiera
teksty instrukcji (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), mechanizm pomijania treści oraz
funkcję pomocniczą rozmieszczania używaną podczas wstrzykiwania; jego własny mechanizm wstrzykiwania `applyCavemanOutputMode()` nie ma
wywołań w środowisku produkcyjnym.

#### Jak to działa

Ten tryb nie kompresuje danych wejściowych. Dodaje blok instrukcji do promptu systemowego
(zobacz Jak działa wstrzykiwanie poniżej), a każdy tryb kompresji danych wejściowych wybrany dla żądania
nadal jest później uruchamiany na treści, która zawiera już ten blok. Przed wspólną
klauzulą ograniczeń, którą kończy się każdy poziom, angielski poziom `full` brzmi:

> „Odpowiadaj zwięźle jak inteligentny jaskiniowiec. Pomijaj przedimki (a/an/the), wypełniacze (just/really/basically/actually/simply), uprzejmości i asekuracyjne sformułowania. Fragmenty zdań są OK. Używaj krótkich synonimów (big zamiast extensive, fix zamiast implement). Zachowuj dokładnie całą treść techniczną, kod, błędy, adresy URL i identyfikatory.”

Działa to szczególnie dobrze w przypadku:

- Generowania kodu (zwięźlejsze dane wyjściowe = mniej tokenów)
- Szybkich pytań i odpowiedzi (bez potrzeby rozbudowanych wyjaśnień)
- Przetwarzania wsadowego (maksymalizacja przepustowości)

#### Kiedy używać

Tryb wyjściowy Caveman jest **opcjonalny**. Przy włączonej kompresji (`enabled: true`, główny przełącznik
na stronie ustawień kompresji) włącz go za pomocą `cavemanOutputMode.enabled`; `intensity`
wybiera `lite`, `full` lub `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Przełącznik **Tryb wyjściowy** kombinacji kompresji (`outputMode`, z poziomem w `outputModeIntensity`)
ustawia tę samą opcję dla żądań, których dotyczy dana kombinacja, a narzędzie MCP
`omniroute_set_compression_engine` zapisuje ją za pośrednictwem swojego argumentu logicznego `outputMode`.
Niepusty wybór `outputStyles` ma pierwszeństwo przed tym przełącznikiem. W panelu włączenie
stylu wyjściowego **Zwięzła proza** wstrzykuje ten sam blok (zobacz Style wyjściowe poniżej).

### Style wyjściowe (katalog)

Opisany wyżej tryb wyjściowy Caveman jest **starszą ścieżką pojedynczego stylu**. Faza 4 uogólniła go
do katalogu łączonych stylów wyjściowych: `OUTPUT_STYLE_CATALOG` w
`open-sse/services/compression/outputStyles/catalog.ts`. Każdy styl jest instrukcją promptu systemowego,
która nakazuje samemu modelowi generować tańsze dane wyjściowe; style można włączać
jednocześnie i są wstrzykiwane w kolejności katalogowej.

| Styl                               | `id`            | Działanie                                                                                                                                                                                                                                                                     | Języki instrukcji                                     |
| ---------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Zwięzła proza                      | `terse-prose`   | Pomija wypełniacze/przedimki/asekuracyjne sformułowania; zachowuje dokładnie treść techniczną. Ten sam tekst co w starszym trybie wyjściowym Caveman (przywoływany, a nie powielany).                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| Mniej kodu                         | `less-code`     | Drabina YAGNI: najmniejsza działająca zmiana, bez niezamówionych abstrakcji.                                                                                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| Kucyk (leniwy starszy programista) | `ponytail`      | „Najlepszy kod to kod, który nigdy nie powstał”: ponowne użycie > przepisywanie, przyczyna źródłowa > objaw, najkrótszy działający diff.                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| Mam ADHD (najpierw działanie)      | `i-have-adhd`   | Najpierw działanie (polecenie/ścieżka/fragment przed opisem), numerowane kroki o ograniczonej liczbie, JEDEN konkretny następny krok, bez wstępu/podsumowania/zakończeń. Zaadaptowano z [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| Filtr UI Antislop                  | `antislop-ui`   | Każda technika wizualna musi przejść test celowości (hierarchia, tożsamość, czytelność); bez domyślnych gradientów/szkła/poświaty, ograniczona paleta, bez szablonowych układów. Oba style antislop dodają ograniczenie zakazujące martwych kontrolek i zmyślonych twierdzeń. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| Filtr tekstu i ludzki Antislop     | `antislop-copy` | Konkretne teksty (bez pauzy em, ogólnikowych CTA, modnych haseł, chatbotowych zakończeń i zmyślonych faktów) oraz reguły dla ludzi: kontrast WCAG AA, widoczny fokus, obsługa klawiaturą, stany pusty/ładowania/błędu, przeorganizowanie układu na urządzeniach mobilnych.    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| Zwięzły CJK (文言)                 | `terse-cjk`     | Odpowiedź `full`/`ultra` w klasycznym języku chińskim (文言); `lite` wymaga jedynie krótkich odpowiedzi bez wyrazów funkcyjnych, uprzejmości i ozdobników.                                                                                                                    | zh (zależne od ustawień regionalnych, zobacz poniżej) |

Każdy styl ma trzy poziomy intensywności — `lite`, `full`, `ultra` — a każdy poziom
kończy się wspólną klauzulą ograniczeń (`SHARED_BOUNDARIES` w `outputMode.ts`), która
zachowuje dokładnie bloki kodu, ścieżki plików, polecenia, błędy i adresy URL. Teksty poziomów
`terse-prose` i `terse-cjk` dodają do tej listy identyfikatory.

`terse-cjk` jest ograniczony do ustawień regionalnych `zh` w dwóch miejscach. Strona ustawień kompresji wyświetla
jego wiersz tylko wtedy, gdy językiem interfejsu panelu jest chiński (`zh-CN` lub `zh-TW`), a
`applyOutputStyles()` wstrzykuje go tylko wtedy, gdy ustalonym językiem żądania (zobacz Wybór
języka poniżej) jest `zh`. Ukrycie wiersza nie usuwa zapisanego wyboru `terse-cjk`:
API ustawień akceptuje dowolny identyfikator stylu, a zapisanie innych stylów na stronie zachowuje go.
W czasie obsługi żądania jedyną kontrolą ustawień regionalnych jest sprawdzenie języka przez `applyOutputStyles()`.

#### Jak działa wstrzykiwanie

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) porównuje
wybór z katalogiem (nieznane identyfikatory i style niezgodne z ustawieniami regionalnymi
są pomijane, nigdy nie powodując błędu; wybór, który nie wskazuje żadnego stylu,
pozostawia treść bez zmian i jest pomijany jako `no_styles`), łączy wybrane instrukcje
w kolejności katalogowej, dodaje klauzulę ograniczeń **jeden raz** (wraz z klauzulą
bezpieczeństwa, `SAFETY_BOUNDARIES` lub jej tłumaczeniem, gdy wybrano `less-code` albo
`ponytail`) i rozpoczyna blok pojedynczym znacznikiem idempotencji
(`[OmniRoute Output Styles]`), dzięki czemu ponowne zastosowanie nie powoduje żadnych
zmian. Gdy ustalony język (zobacz sekcję Wybór języka poniżej) ma tłumaczenie,
wstrzykiwana jest zlokalizowana instrukcja zamiast angielskiej.

W przypadku treści z niepustą tablicą `messages` sprawdzenie idempotencji jest wykonywane
przed mechanizmem pomijania na podstawie zawartości: jeśli znacznik
`[OmniRoute Output Styles]` znajduje się już w polu `system` najwyższego poziomu (będącym
ciągiem znaków albo tablicą bloków zawartości) lub w komunikacie systemowym z zawartością
tekstową, treść pozostaje niezmieniona ze statusem `already_applied`, a sprawdzanie słów
kluczowych nie jest wykonywane. W przeciwnym razie mechanizm pomijania na podstawie
zawartości (`shouldBypassCavemanOutputMode()` w
`open-sse/services/compression/outputMode.ts`) sprawdza tekst trzech ostatnich
komunikatów, niezależnie od ich roli, i pomija style dla całej tury, gdy tekst pasuje do
słów kluczowych związanych z bezpieczeństwem, nieodwracalnymi działaniami lub
doprecyzowaniem albo do sekwencji zależnej od kolejności: `first`, `then`, `after that`,
`before`, `rollback` lub `backup`, po których w ciągu 240 znaków występuje `delete`,
`drop`, `migrate`, `deploy` lub `release`. Mechanizm pomijania działa, gdy przełącznik
**Auto-Clarity Bypass** (`cavemanOutputMode.autoClarity`, domyślnie włączony) jest
włączony; wyłączenie przełącznika powoduje pominięcie sprawdzania słów kluczowych.

Gdy mechanizm pomijania przepuści turę, `placeSystemInstruction()` (w tym samym pliku),
który nigdy nie tworzy nowego `messages[0]`, umieszcza blok w pierwszym znalezionym
spośród następujących miejsc:

1. Początkowy komunikat systemowy z zawartością tekstową: blok jest dodawany po jego
   tekście.
2. Pole `system` najwyższego poziomu: blok jest dodawany po tekście ciągu znaków albo
   jako nowy blok tekstowy do tablicy bloków zawartości.
3. Pierwszy późniejszy komunikat systemowy z zawartością tekstową: blok jest dodawany
   po jego tekście.
4. Żadne z powyższych: blok trafia do nowego komunikatu systemowego na końcu `messages`.

W przypadku treści bez tablicy `messages` (lub z pustą tablicą) mechanizm pomijania na
podstawie zawartości nie jest wykonywany, a pole `system` najwyższego poziomu nie jest
brane pod uwagę. Blok jest dodawany po tekście pola `instructions` będącego ciągiem
znaków, chyba że pole to zawiera już znacznik `[OmniRoute Output Styles]`; w takim
przypadku treść pozostaje niezmieniona ze statusem `already_applied`. Gdy treść nie ma
pola `instructions` będącego ciągiem znaków, ale zawiera `input` (ciąg znaków albo
tablicę), blok staje się wartością `instructions`, zastępując każdą wartość tego pola,
która nie jest ciągiem znaków. Treść bez pola `instructions` będącego ciągiem znaków ani
pola `input` będącego ciągiem znaków lub tablicą pozostaje niezmieniona i jest pomijana
ze statusem `no_messages`.

#### Jak włączyć

W panelu: **Kontekst kompresji → Ustawienia kompresji**
(`/dashboard/context/settings`), sekcja stylów wyjściowych: jeden wiersz na każdy styl,
z przełącznikiem włączania/wyłączania i selektorem poziomu. Style są wstrzykiwane, gdy
włączona jest sama kompresja (główny przełącznik strony, `enabled`). Przełącznik
**Auto-Clarity Bypass** znajduje się na stronie **Caveman**
(`/dashboard/context/caveman`), na karcie **Output Mode**. Programistycznie konfiguracja
kompresji przechowuje wybór w następującej postaci:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Zgodność wsteczna: gdy `outputStyles` jest puste, starsze ustawienie
`cavemanOutputMode.enabled` jest mapowane na `terse-prose` z poziomem określonym przez
`cavemanOutputMode.intensity`. Blok zaczyna się wtedy od znacznika
`[OmniRoute Output Styles]`, podczas gdy starszy mechanizm wstrzykiwania
`applyCavemanOutputMode()` używał `[OmniRoute Caveman Output Mode]`. Poniżej znacznika
tekst jest zgodny ze starszym wstrzyknięciem w językach en, pt-BR, es, de, fr, it, ru,
id i vi; w językach ja i zh zawiera jedną dodatkową spację przed klauzulą ograniczeń.
`terse-prose` ma tłumaczenia na języki pt-BR, es, de, fr, it, ru, zh, ja, id i vi,
dlatego żądanie, którego ustalonym językiem jest `hu`, otrzymuje tekst angielski, podczas
gdy starszy mechanizm wstrzykiwania używał tekstu węgierskiego.

Wybór języka stylu wyjściowego (`resolveOutputStyleLanguage()` w
`outputStyles/apply.ts`): przy włączonym `languageConfig.enabled` funkcja `autoDetect`
pobiera najnowszy komunikat użytkownika w tablicy `messages` żądania, który zawiera tekst
(zawartość będącą ciągiem znaków albo `text` jego części zawartości), i uruchamia na nim
detektor silnika Caveman (`detectCompressionLanguage()`). Detektor zwraca `zh` dla tekstu
zawierającego znaki Han, ale bez kany; w przeciwnym razie zwraca ten spośród języków
`it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` i `id`, który ma najwięcej dopasowań
podpowiedzi, a gdy nie ma żadnych dopasowań — `en`. Tekst, którego nie można
sklasyfikować, otrzymuje język angielski, nigdy `defaultLanguage`, natomiast `vi` nigdy
nie jest wykrywany, mimo że style zawierają tekst w języku `vi`. Treść interfejsu
Responses API przechowuje swoje tury w `input`, które nie jest próbkowane, dlatego
otrzymuje `defaultLanguage`, a następnie język angielski. Gdy żaden komunikat użytkownika
w `messages` nie zawiera tekstu lub gdy `autoDetect` jest wyłączone, stosowany jest
`defaultLanguage`, a następnie język angielski. Gdy `languageConfig.enabled` jest
wyłączone, używany jest język angielski — chyba że do żądania ma zastosowanie kombinacja
kompresji (kombinacja przypisana do kombinacji routingu żądania albo domyślna kombinacja
kompresji, do której chatCore przechodzi w przypadku wbudowanego potoku warstwowego):
zastosowanie kombinacji włącza `languageConfig.enabled` dla tego żądania i ustawia
`defaultLanguage` na podstawie pakietów językowych kombinacji (zapisana wartość, jeśli
należy do pakietów kombinacji; w przeciwnym razie pierwszy pakiet kombinacji, domyślnie
`en`), podczas gdy zapisane ustawienie `autoDetect` (domyślnie włączone) nadal
obowiązuje. Silnik wejściowy Caveman wybiera język pakietu reguł inaczej — osobno dla
każdej części tekstowej, a przy wyłączonym automatycznym wykrywaniu dodatkowo zależnie
od `enabledPacks`.

Macierz styl × język jest ustalana przez
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: każdy styl katalogu musi mieć
wpis w `BASELINE_LANGUAGES` testu; styl, który nie jest ograniczony do określonych ustawień regionalnych, musi zawierać
tłumaczenie pt-BR (ograniczony regionalnie styl `terse-cjk` jest zwolniony z tej reguły), chyba że jest
wymieniony w `KNOWN_ENGLISH_ONLY`, które może zawierać wyłącznie style bez jakichkolwiek tłumaczeń —
wymieniony styl, który ma choć jedno tłumaczenie, powoduje niepowodzenie testu; styl powoduje również niepowodzenie testu,
gdy traci język wymieniony w jego wpisie `BASELINE_LANGUAGES`. Aby dodać styl, zobacz
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresja wyników narzędzi

`compressToolResult()` w `open-sse/services/compression/toolResultCompressor.ts`
kompresuje tekst wyników narzędzi przy użyciu **5 strategii**. Próbuje ich w tej kolejności, a
pierwsza włączona strategia, której warunek pasuje do zawartości, określa wynik:

1. **`fileContent`**: zawartość składająca się z co najmniej 3 wierszy, w której co najmniej jeden wiersz, po pominięciu
   początkowych wcięć, zaczyna się od `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` lub `return ` (słowo kluczowe wraz ze spacją), albo od `if`,
   `for` lub `while`, po których występuje `(` lub ` (`, zachowuje pierwszych 20 i ostatnich 5 wierszy, z
   oznaczeniem pominiętego fragmentu pośrodku.
2. **`grepSearch`**: zawartość z co najmniej jednym wierszem w formacie `<path>:<digits>:`,
   gdzie tekst przed pierwszym dwukropkiem nie zawiera białych znaków, zachowuje tylko takie wiersze,
   maksymalnie 30, po których następuje liczba ewentualnych dalszych dopasowań oraz lista dopasowanych plików;
   wszystkie pozostałe wiersze są odrzucane. Jeden taki wiersz wystarczy do uruchomienia strategii, więc
   wiersz dziennika zaczynający się od znacznika czasu, takiego jak `12:30:45`, również jest uznawany za dopasowanie.
3. **`shellOutput`**: dane wyjściowe zawierające sekwencję ANSI CSI (`ESC[`, następnie cyfry lub
   średniki, a potem litera, jak w kodach kolorów) albo znak `$`, po którym w dowolnym miejscu
   tekstu występuje biały znak, tracą te sekwencje (inne sekwencje sterujące, takie jak `ESC[?25l` lub
   sekwencja OSC tytułu okna, są zachowywane) i zachowują ostatnich 50 wierszy, przy czym kolejne
   powtarzające się wiersze są scalane. Ponieważ ten warunek jest sprawdzany przed `json` i `errorMessage`,
   dane wyjściowe JSON lub błędu zawierające taki znak `$` nigdy do nich nie docierają, gdy
   `shellOutput` jest włączone.
4. **`json`**: ładunek JSON o długości ponad 2 000 znaków, który zaczyna się od `{` lub `[` (po
   opcjonalnych białych znakach) i daje się przeanalizować, jest podsumowywany: tablica zawierająca więcej niż 7 elementów zachowuje
   pierwszych 5 i ostatnie 2 elementy oraz ich łączną liczbę, a obiekt zachowuje pierwszych 20
   kluczy, przy czym każda wartość będąca zagnieżdżonym obiektem lub tablicą jest zastępowana symbolem zastępczym `{…N keys}`
   (dla tablicy N oznacza jej długość) oraz znacznikiem `_remaining_<N>_keys` zliczającym klucze
   pominięte po pierwszych 20. Wartości skalarne są kopiowane w całości, dlatego obiekt mający nie więcej niż 20 kluczy
   i niezawierający zagnieżdżonych wartości jest jedynie ponownie formatowany z wcięciami — wersja zminimalizowana zyskuje znaki
   i pozostaje niezmieniona.
5. **`errorMessage`**: dane wyjściowe, które zawierają w dowolnym miejscu i niezależnie od wielkości liter `error:`,
   `error ` (słowo zakończone spacją, jak w `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` lub `traceback`, zachowują pierwszy wiersz,
   kolejnych 10 wierszy oraz ostatnie 3, a wiersze pomiędzy nimi są zastępowane znacznikiem `… [N frames elided] …`.
   Znacznik pojawia się tylko wtedy, gdy po pierwszym wierszu występuje więcej niż 13 wierszy,
   dlatego dane wyjściowe błędu składające się z nie więcej niż 14 wierszy nie są skracane (przy 12 lub 13 wierszach
   ostatnie 3 powtarzają wiersze już zachowane).

Po dopasowaniu strategii późniejsze strategie nie są
wypróbowywane, nawet jeśli dopasowana strategia niczego nie oszczędza. Gdy dopasowana strategia nie oszczędza żadnych szacowanych tokenów (długość ÷ 4, zaokrąglona w górę) —
na przykład dla pliku przypominającego kod, który ma nie więcej niż 25 wierszy, lub tablicy JSON o długości ponad 2 000
znaków, która ma nie więcej niż 7 elementów — silnik agresywny zachowuje oryginalny wynik narzędzia:
oba miejsca wywołania (`compressAggressive()` i `compressAnthropicToolResultBlock()`)
zachowują oryginał, gdy `saved` wynosi 0 lub mniej, natomiast sama funkcja `compressToolResult()` nadal
zwraca wynik tej strategii. Etap wyniku narzędzia nie jest ostatnim słowem:
awaryjny mechanizm podsumowujący silnika może nadal skrócić wiadomość `tool` lub `function` dłuższą
niż 8 192 znaki (`maxTokensPerMessage`, 2 048, pomnożone przez 4).

#### Kiedy używać

Kompresja wyników narzędzi jest krokiem 1 silnika agresywnego (`compressAggressive()` w
`open-sse/services/compression/aggressive.ts`), dlatego działa w trybie Aggressive oraz w
kroku `aggressive` potoku stosowego. Kompresuje wiadomości `tool` i `function`
w formacie OpenAI oraz tekst wewnątrz bloków Anthropic `tool_result`. Każda strategia ma własny
przełącznik w `aggressive.toolStrategies`; wszystkie są domyślnie włączone. W panelu
przełączniki znajdują się w widoku **Advanced** strony Caveman, gdy kompresja jest włączona, a
domyślnym trybem jest Aggressive.

### Potok stosowy

Tryb stosowy uruchamia **wiele silników po kolei** — zwykle najpierw RTK
(60–90% oszczędności na danych wyjściowych narzędzi), a następnie Caveman na pozostałym tekście (~46% oszczędności
na danych wejściowych). Łącznie daje to **kwalifikujący się zakres 78–95%** (zobacz powyżej Obliczanie oszczędności nadrzędnych):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` daje średnio ≈89%.

#### Jak to działa

```
Dane wejściowe (1000 tokenów)
  → RTK (filtr uwzględniający polecenia) → 200 tokenów
    → Caveman (usuwanie wypełniaczy) → 108 tokenów
  → Dane wyjściowe (108 tokenów, ~89% oszczędności)
```

#### Kiedy używać

Używaj trybu stosowego w przypadku:

- Przepływów pracy intensywnie korzystających z narzędzi (programowanie agentowe, badania)
- Przetwarzania wsadowego uwzględniającego koszty
- Sytuacji, gdy potrzebujesz maksymalnej oszczędności tokenów

Potoki stosowe konfiguruje się za pomocą globalnego ustawienia kompresji `stackedPipeline`
lub za pomocą nazwanego zestawu kompresji przypisanego do zestawu routingu (zobacz
powyżej Nadpisanie dla zestawu) — nie za pomocą `modePack` automatycznego zestawu (to pole jedynie
ponownie waży wybór modelu automatycznego zestawu, a `stacked` nie jest prawidłową nazwą pakietu).

---

## Nadpisywanie kompresji dla kombinacji

Możesz nadpisać globalny tryb kompresji **dla każdej kombinacji osobno**, aby precyzyjnie dostosować zachowanie
do różnych przypadków użycia:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Jest to przydatne w przypadku:

- **Kombinacji do programowania**: użyj trybu `aggressive` podczas długich sesji
- **Kombinacji do szybkich pytań i odpowiedzi**: użyj trybu `lite`, aby uzyskać szybkie odpowiedzi
- **Kombinacji intensywnie korzystających z narzędzi**: użyj trybu `stacked`, aby uzyskać maksymalne oszczędności
- **Kombinacji produkcyjnych**: pozostaw nadpisywanie wyłączone w przypadku dostawców obsługujących buforowanie — zawsze aktywne
  dostosowanie uwzględniające pamięć podręczną automatycznie zmienia tryb `aggressive`/`ultra` na `standard`
  (nie istnieje możliwy do wybrania tryb `cache-aware`)

---

## Zobacz także

- [Konfiguracja środowiska](../reference/ENVIRONMENT.md) — zmienne środowiskowe kompresji
- [Przewodnik po architekturze](../architecture/ARCHITECTURE.md) — wewnętrzne mechanizmy potoku kompresji
- [Podręcznik użytkownika](../guides/USER_GUIDE.md) — rozpoczęcie pracy z kompresją
- [Kompresja RTK](./RTK_COMPRESSION.md) — filtry RTK, model zaufania, bramka weryfikacji i odzyskiwanie nieprzetworzonych danych wyjściowych
- [Mechanizmy kompresji](./COMPRESSION_ENGINES.md) — Caveman, RTK, tryb `stacked`, interfejsy API, MCP i panel sterowania
- [Format reguł kompresji](./COMPRESSION_RULES_FORMAT.md) — format pakietu reguł JSON
- [Pakiety językowe kompresji](./COMPRESSION_LANGUAGE_PACKS.md) — reguły Caveman specyficzne dla języka
