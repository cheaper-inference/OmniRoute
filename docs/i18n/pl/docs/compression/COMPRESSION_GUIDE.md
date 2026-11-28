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

### Tryb Lite (oszczędność ~15%, opóźnienie <1 ms)

Najbezpieczniejszy tryb — porządkowanie formatowania. Obcinanie wyników narzędzi powoduje utratę danych, dlatego domyślna ścieżka (bez `allow-lossy`, `engine:lite` lub jawnej zgody na nazwany zestaw) uruchamia tryb lite z opcją
`compressToolResults: false`: wcześniejsze wyniki narzędzi docierają do dostawcy bez zmian.

| Technika                 | Opis                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Łączenie kolejnych pustych wierszy i końcowych spacji                                                         |
| `dedupSystemPrompt`      | Usuwanie zduplikowanych komunikatów systemowych                                                               |
| `compressToolResults`    | Obcinanie wcześniejszych wyników narzędzi do limitu trybu lite (stratne: tylko po wyraźnej zgodzie w żądaniu) |
| `removeRedundantContent` | Usuwanie powtarzających się instrukcji                                                                        |
| `replaceImageUrls`       | Skracanie identyfikatorów URI danych obrazów zakodowanych w base64                                            |

**Najlepszy wybór dla:** Zastosowań ciągłych i przepływów pracy o krytycznym znaczeniu dla bezpieczeństwa.

### Tryb standardowy (oszczędność ~30%)

Zainspirowany projektem [Caveman](https://github.com/JuliusBrussee/caveman) — usuwa słowa wypełniające i rozwlekłe sformułowania, zachowując znaczenie:

- Usuwa słowa wypełniające („please”, „I think”, „basically”, „actually”)
- Skraca rozwlekłe wyrażenia („in order to” → „to”, „as a result of” → „because”)
- Usuwa uprzejme wyrażenia łagodzące („Would you mind...”, „If you could possibly...”)
- Ponad 30 reguł wyrażeń regularnych dostosowanych do promptów programistycznych

**Najlepszy wybór dla:** Codziennej pracy programistycznej i zespołów zwracających uwagę na koszty.

### Tryb agresywny (oszczędność ~50%)

Inteligentne zarządzanie historią długich sesji:

- **Starzenie wiadomości** — starsze wiadomości są stopniowo kompresowane
- **Kompresja wyników narzędzi** — długie wyniki narzędzi są obcinane lub pomijane (pierwsze/ostatnie wiersze, filtrowanie wierszy zawierających dopasowania, kompaktyzacja kluczy JSON)
- **Strażnicy integralności struktury** — zapewniają spójność par `tool_use` + `tool_result`
- **Świadomość okna kontekstu** — uwzględnia limity tokenów poszczególnych modeli

**Najlepszy wybór dla:** Rozszerzonych sesji debugowania i dużych baz kodu.

### Tryb ultra (oszczędność ~75%)

Maksymalna kompresja w scenariuszach wymagających ograniczenia liczby tokenów:

- **Przycinanie heurystyczne** — oparte na ocenie przycinanie tokenów tekstu
- **Zachowanie struktury** — bloki kodu z ogrodzeniem, kod w tekście, adresy URL i identyfikatory są tymczasowo ukrywane, a następnie ponownie wstawiane dosłownie; nigdy nie są przycinane
- **Opcjonalny poziom SLM** — po skonfigurowaniu mały model lokalny może dopracować przycinanie
- Niezależny od trybu agresywnego: nie wykonuje starzenia wiadomości, kompresji wyników narzędzi ani awaryjnego podsumowania (tylko awaria poziomu SLM może przekierować awaryjne przetwarzanie przez tryb agresywny)

**Najlepszy wybór dla:** Sytuacji, w których wielokrotnie przekraczasz limity kontekstu.

### Tryb RTK (zakres upstream 60–90%)

Tryb RTK jest zoptymalizowany pod kątem rozwlekłych wyników narzędzi pojawiających się w sesjach agentów programistycznych:

- Wykrywa klasy poleceń/wyników, takie jak `git status`, `git diff`, `git log`, narzędzia uruchamiające testy, kompilacje TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audyty/instalacje npm, logi Dockera, wyniki narzędzi infrastruktury oraz ogólne wyniki powłoki
- Stosuje pakiety filtrów JSON z `open-sse/services/compression/engines/rtk/filters/`
- Importuje filtry schematu RTK TOML v1 z plików `filters.toml` projektu lub globalnych, z walidacją testów wbudowanych i kontrolą zaufania dla plików projektu
- Zawiera 56 wbudowanych filtrów z wbudowanymi przykładami weryfikacyjnymi
- Usuwa sekwencje sterujące ANSI, paski postępu, powtarzające się wiersze i nieistotne szumy
- Zachowuje niepowodzenia, błędy, ostrzeżenia, zmienione pliki, podsumowania i końcową część długich wyników
- Obsługuje filtry projektu z kontrolą zaufania, filtry globalne oraz opcjonalne odzyskiwanie zredagowanych surowych wyników

**Najlepszy wybór dla:** Sesji agentów korzystających z powłoki, kompilacji, testów, gita, grep i transkryptów wyników plików.

### Tryb skumulowany (kwalifikowany zakres 78–95%)

Tryb skumulowany uruchamia wiele silników kompresji w deterministycznej kolejności. Domyślny potok to:

```txt
RTK -> Caveman
```

Taka kolejność najpierw ogranicza wyniki terminala/narzędzi, a następnie stosuje kondensację semantyczną Caveman do pozostałego promptu w języku naturalnym. Potoki skumulowane można konfigurować globalnie lub za pomocą zestawów kompresji przypisanych do zestawów routingu.

**Najlepszy wybór dla:** Mieszanego kontekstu zawierającego duże logi narzędzi oraz instrukcje użytkownika lub podsumowania asystenta.

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

- **Caveman** — wybór trybu, pakiety językowe, podgląd i ustawienia globalne
- **RTK** — podgląd filtrowania poleceń, ustawienia bezpieczeństwa RTK i katalog filtrów
- **Compression Combos** — nazwane potoki silników przypisane do kombinacji routingu
- **Auto-Trigger Threshold** — automatyczne włączanie kompresji po przekroczeniu progu liczby tokenów

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

Pozwala to używać wielowarstwowej kompresji u dostawców bezpłatnych i przeznaczonych do kodowania,
z zachowaniem trybu lite w płatnych subskrypcjach.

To przypisanie „Per-Combo Override” jest innym mechanizmem niż nadpisanie **trybu kompresji
kombinacji routingu** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — schemat tego
pola akceptuje również `rtk`, `stacked` i `omniglyph`) — to nadpisanie nie wybiera nazwanego potoku
kombinacji kompresji; ustawia jedynie pole `compressionMode`, z którego korzysta
`resolveCompressionPlan`. Można je ustawić na karcie kombinacji (`Dashboard → Combos`) albo, od
#6760, dla każdej kombinacji routingu na liście „Assign to routing” w
`Dashboard → Context & Cache → Compression Combos`, tuż obok opisanego powyżej pola wyboru
przypisania potoku. Oba miejsca zapisują dane za pośrednictwem tego samego punktu końcowego
`PUT /api/combos/{id}`.

### Nadpisanie dla pojedynczego żądania

Wyślij nagłówek żądania `x-omniroute-compression`, aby nadpisać plan kompresji dla pojedynczego
żądania. Ma on najwyższy priorytet — ma pierwszeństwo przed nadpisaniem kombinacji routingu,
aktywnym profilem, automatycznym wyzwalaniem i wartością Default panelu. Nieznane wartości są
ignorowane (żądanie nigdy nie zostaje odrzucone), a globalny przełącznik główny nadal kontroluje
całość: gdy kompresja jest globalnie wyłączona, nagłówek nie może jej włączyć. Dostępne wartości:

| Wartość       | Działanie                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `off`         | Brak kompresji dla tego żądania.                                                                                               |
| `default`     | Profil Default określony przez panel (z pominięciem aktywnego profilu). Silniki stratne pozostają wyłączone.                   |
| `safe`        | To samo co w przypadku pominięcia nagłówka.                                                                                    |
| `allow-lossy` | Zachowuje plan operatora dla tego żądania, w tym podsumowania, filtry istotności i przekształcenia stylu.                      |
| `engine:<id>` | Pojedynczy silnik, jeśli jest włączony, np. `engine:rtk`. Jest to mechanizm jawnego włączenia tego silnika dla żądania.        |
| `<combo>`     | Nazwana kombinacja, dopasowywana najpierw według nazwy (bez uwzględniania wielkości liter), a następnie według identyfikatora. |

Bez `allow-lossy`, `engine:<id>` lub nazwanej kombinacji silniki stratne nie są stosowane. Gdy
stratny tryb Default, automatyczne wyzwalanie lub nadpisanie routingu zostanie obniżone,
OmniRoute zachowuje rozpoznane bezstratne kroki ze skonfigurowanego wielowarstwowego potoku,
w skonfigurowanej kolejności. Do `session-dedup → lite` powraca tylko wtedy, gdy nie przetrwa
żaden skonfigurowany krok bezstratny.

Podgląd **Effective pipeline** w panelu ustawień pokazuje zwykły plan zapisany w stanie. Gdy może
zostać uruchomione automatyczne wyzwalanie, ten sam podgląd pokazuje również warunkowy efektywny
potok, dzięki czemu rozwiązywanie konfiguracji w panelu i środowisku uruchomieniowym bez nagłówka
pozostają zgodne.

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

# Wyświetl pakiety filtrów RTK
curl http://localhost:20128/api/context/rtk/filters

# Przetestuj bezpośrednio RTK z opcjonalnymi metadanymi polecenia
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

Oprócz 7 trybów opisanych powyżej (źródło akceptuje również tryby `codex-responses` i `omniglyph`, których ten przewodnik nie omawia), poniższe sekcje opisują funkcje, które działają w tych trybach lub obok nich: Kompresja wyników narzędzia i Postępujące starzenie to kroki 1 i 2 agresywnego silnika (tryb agresywny i krok `aggressive` potoku skumulowanego), Stacked Pipeline opisuje sposób działania trybu Stacked, Kompresja z uwzględnieniem pamięci podręcznej obniża wersję `aggressive` i `ultra` do `standard` dla dostawcy buforowania, gdy włączona jest kompresja, a tryb wyjściowy jaskiniowca i style wyjściowe to instrukcje wyświetlane w systemie, domyślnie wyłączone, które kształtują dane wyjściowe modelu zamiast kompresować żądanie.

### Kompresja uwzględniająca pamięć podręczną

Niektórzy dostawcy (np. Anthropic z szybkim buforowaniem) obsługują** szybkie buforowanie** , co pozwala im buforować części monitu, aby zmniejszyć koszty i opóźnienia. Kiedy buforowanie jest włączone, w rzeczywistości może to nastąpić agresywna kompresja** zraniony** wydajność, ponieważ zmienia buforowane tokeny, unieważniając pamięć podręczną.

Moduł `cachingAware.ts` rozwiązuje ten problem** wykrywanie kontekstu buforowania** I** dostosowanie strategii kompresji** odpowiednio.

#### Jak to działa

1. **Wykryj kontekst buforowania** — Skanuje treść żądania w poszukiwaniu znaczników `cache_control`
2. **Zidentyfikuj dostawców pamięci podręcznej** — Sprawdza, czy docelowy dostawca obsługuje buforowanie
3. **Dostosuj strategię** — Obniża wersję `aggressive`/`ultra` do `standard` dla dostawców buforowania
4. **Pomiń monit systemowy** — Podpowiedzi systemowe są zwykle buforowane, więc nie kompresuj ich

Pomocnik strategii również zwraca flagę `deterministicOnly`, ale kreator planu wykorzystuje tylko strategię — nic poniżej nie czyta flagi dzisiaj.

#### Przykład kodu

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kiedy używać

Kompresja uwzględniająca pamięć podręczną to** zawsze włączone** — nie wymaga konfiguracji. Uruchamia się zawsze, gdy włączona jest kompresja, a dostawca docelowy obsługuje buforowanie natychmiastowe (Anthropic, OpenAI itp.); jawne znaczniki `cache_control` nie są wymagane, — sam dostawca buforowania powoduje obniżenie wersji, a same znaczniki nigdy tego nie robią (wykrywanie znaczników zasila telemetrię pamięci podręcznej, a nie decyzję o strategii).

OpenRouter liczy się jako dostawca pamięci podręcznej tylko dla modeli `anthropic/*` : żądania kodu Claude zachowują punkty przerwania `cache_control` (maksymalnie 4), a strażnik chroni prefiks, podczas gdy każda inna rodzina OpenRouter (`openai/`, `google/`, `qwen/`, …) pozostaje pozbawiona i niechroniona.

### Postępujące starzenie się

Długie rozmowy kumulują wiele zwrotów wiadomości, ale starsze tury stają się mniej istotne. Moduł `progressiveAging.ts`** degraduje wiadomości w zależności od odległości skrętu** (odległość mierzona od końca rozmowy). Z dostarczonymi ustawieniami domyślnymi (`verbatim: 2, light: 2, moderate: 3`):

- **Ostatnie 2 tury (odległość ≤ 2)** : Zachowane dosłownie
- **Odległość 3** : Kompresja jaskiniowca (usunięcie wypełniacza)
- **Odległość 4 +** : podsumowanie wiadomości Asystenta; wiadomości użytkownika zredukowane do pierwszej linii, ograniczone do 120 znaków; inne role bez zmian. Monity systemowe, już przestarzałe wiadomości i najnowsza wiadomość użytkownika są zawsze zachowywane dosłownie, niezależnie od odległości. Nic nie jest odrzucane od razu, a pasmo `light` jest nieosiągalne przy dostarczonych ustawieniach domyślnych (`light` równa się `verbatim`).

#### Przykład kodu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### Kiedy używać

Postępujące starzenie się jest** zawsze włączone** dla trybu `aggressive` — jest to krok 2 `compressAggressive()`. Tryb Ultra go nie uruchamia. Jest szczególnie skuteczny w przypadku:

- Długotrwałe sesje kodowania
- Wielodniowe rozmowy
- Agentyczne przepływy pracy z wieloma wywołaniami narzędzi

### Tryb wyjściowy jaskiniowca

Tryb wyjściowy Caveman dodaje** instrukcje monitu systemowego** które proszą sam model o zwięzłe wyjście — poziom `lite` prosi o zwięzłe odpowiedzi zawierające pełne zdania, `full` prosi o „odpowiedź zwięzłą jak mądry jaskiniowiec”, a `ultra` prosi o wynik telegraficzny; instrukcje tylko pytają, nie mogą tego zagwarantować. Żądania odbierają je przez `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` najpierw rozstrzyga wybór za pomocą podkładki zgodności wstecznej (`resolveOutputStyleSelection()` w `open-sse/services/compression/outputStyles/backCompat.ts`), która, podczas gdy `outputStyles` jest puste, odwzorowuje włączone `cavemanOutputMode` na styl wyjściowy `terse-prose` w `cavemanOutputMode.intensity` (patrz Kompatybilność wsteczna poniżej); niepusta selekcja `outputStyles` jest używana w takiej postaci, w jakiej jest, a `cavemanOutputMode.enabled` i `intensity` nie mają wtedy żadnego efektu, podczas gdy jego przełącznik `autoClarity` nadal obowiązuje. `outputMode.ts` przechowuje teksty instrukcji (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), obejście treści i pomocnika umieszczania używanego przez wtrysk; jego własny wtryskiwacz `applyCavemanOutputMode()` nie ma wywołującego produkcyjnego.

#### Jak to działa

Ten tryb nie kompresuje sygnału wejściowego. Dodaje blok instrukcji do podpowiedzi systemowej (patrz Jak działa wstrzykiwanie poniżej), a każdy tryb kompresji sygnału wejściowego wybrany dla żądania nadal działa później, w treści, która teraz zawiera blok. Przed klauzulą wspólnych granic, którą kończy się każdy poziom, angielski poziom `full` brzmi:

> „Odpowiadaj zwięźle jak mądry jaskiniowiec. Upuść artykuły (a/an/the), wypełniacz (just/really/basically/actually/simply), uprzejmości, zabezpieczenia. Fragmenty OK. Krótkie synonimy (duże, nie obszerne, poprawka, nie implementacja). Zachowaj dokładność wszystkich treści technicznych, kodu, błędów, URLs i identyfikatorów.

Działa to szczególnie dobrze w przypadku:

- Generowanie kodu (wyjście teser = mniej tokenów)
- Szybkie pytania i odpowiedzi (nie ma potrzeby skomplikowanych wyjaśnień)
- Przetwarzanie wsadowe (maksymalizacja przepustowości)

#### Kiedy używać

Tryb wyjściowy Jaskiniowiec to** wyrazić zgodę** . Przy włączonej kompresji (`enabled: true`, główny przełącznik na stronie Ustawienia kompresji), włącz ją za pomocą `cavemanOutputMode.enabled`; `intensity` wybiera `lite`, `full` lub `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kombinacja kompresji** Tryb wyjściowy** toggle (`outputMode`, poziom w `outputModeIntensity`) ustawia ten sam przełącznik dla żądań, do których odnosi się combo, a narzędzie `omniroute_set_compression_engine` MCP zapisuje go poprzez swój boolowski argument `outputMode`. Niepusty wybór `outputStyles` ma pierwszeństwo przed tym przełącznikiem. W panelu kontrolnym włącz opcję** Zwięzła proza** styl wyjściowy wstawia ten sam blok (patrz Style wyjściowe poniżej).

### Style wyjściowe (katalog)

Powyższy tryb wyjściowy jaskiniowca to** starsza ścieżka jednego stylu** . W fazie 4 uogólniono to w katalog stylów wyjściowych, które można komponować: `OUTPUT_STYLE_CATALOG` w `open-sse/services/compression/outputStyles/catalog.ts`. Każdy styl jest instrukcją systemową, która pyta sam model o tańsze dane wyjściowe; style można włączyć razem i są wstrzykiwane w kolejności katalogowej.

| Styl                                | `id`            | Co to robi                                                                                                                                                                                                                                                                    | Języki nauczania                              |
| ----------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Zwięzła proza                       | `terse-prose`   | upuść filler/articles/hedging; zachowaj dokładność techniczną. Ten sam tekst, co w starszym trybie wyjściowym jaskiniowca (odniesienie, nie wpisane ponownie).                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mniej kodu                          | `less-code`     | YAGNI drabina: najmniejsza zmiana robocza, żadnych niepotrzebnych abstrakcji.                                                                                                                                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kucyk (leniwy starszy programista)  | `ponytail`      | „Najlepszy kod to kod, który nigdy nie został napisany”: ponowne użycie przepisywania >, główna przyczyna symptomu >, najkrótsza działająca różnica.                                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mam ADHD (najpierw akcja)           | `i-have-adhd`   | Najpierw akcja (command/path/snippet przed prozą), ponumerowane, ograniczone kroki, ONE konkretny następny krok, bez preamble/recap/closers.. Zaadaptowano z [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Filtr przeciwpoślizgowy UI          | `antislop-ui`   | Każda technika wizualna musi przejść test celu (hierarchia, tożsamość, czytelność); brak domyślnego gradients/glass/glow, ograniczona paleta, brak układów szablonów. Obydwa style zapobiegania poślizgom dodają granicę bez martwych kontroli i bez sfabrykowanych roszczeń. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kopia antypoślizgowa i filtr ludzki | `antislop-copy` | Konkretny tekst (bez myślnika, ogólny CTAs, modne słowa, zamykacze chatbotów, wymyślone fakty) plus zasady dotyczące ludzi: kontrast WCAG AA, widoczny fokus, zasięg klawiatury, stany empty/loading/error, mobilny przepływ.                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Zwięzły CJK (文言)                  | `terse-cjk`     | odpowiedź `full`/`ultra` w klasycznym chińskim (文言); `lite` prosi jedynie o krótkie odpowiedzi, bez słów funkcyjnych, uprzejmości i ozdób.                                                                                                                                  | zh (ogrodzony lokalnie, patrz poniżej)        |

Każdy styl zawiera trzy poziomy intensywności — `lite`, `full`, `ultra` — i każdy poziom kończy się klauzulą wspólnych granic (`SHARED_BOUNDARIES` w `outputMode.ts`), która zapewnia dokładność bloków kodu, ścieżek plików, poleceń, błędów i URLs. Teksty poziomów `terse-prose` i `terse-cjk` dodają identyfikatory do tej listy.

`terse-cjk` jest bramkowane lokalnie do `zh` w dwóch miejscach. Strona Ustawienia kompresji wyświetla swój wiersz tylko wtedy, gdy językiem UI panelu kontrolnego jest chiński (`zh-CN` lub `zh-TW`), a `applyOutputStyles()` wstrzykuje go tylko wtedy, gdy rozwiązanym językiem żądania (patrz Wybór języka poniżej) jest `zh`. Ukrycie wiersza nie usuwa zapisanego wyboru `terse-cjk` : ustawienia API akceptują dowolny identyfikator stylu, a zapisanie innych stylów na stronie go zachowuje. W momencie żądania sprawdzenie języka `applyOutputStyles()` jest jedyną bramą ustawień regionalnych.

#### Jak działa zastrzyk

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) rozwiązuje selekcję względem katalogu (nieznane identyfikatory i style niezgodne z ustawieniami regionalnymi są usuwane, nigdy nie pojawia się błąd; wybór, który rozstrzyga się na brak stylu, pozostawia treść bez zmian, pomijaną jako `no_styles`), łączy wybrane instrukcje w kolejności katalogowej, dołącza klauzulę granic** raz** (plus klauzula bezpieczeństwa, `SAFETY_BOUNDARIES` lub jego tłumaczenie, gdy wybrano `less-code` lub `ponytail` ) i rozpoczyna blok z pojedynczym znacznikiem idempotencji (`[OmniRoute Output Styles]`), więc ponowne zastosowanie nie ma sensu. Gdy rozpoznany język (patrz Wybór języka poniżej) ma tłumaczenie, zamiast języka angielskiego wstawiana jest zlokalizowana instrukcja.

W treści z niepustą tablicą `messages` sprawdzanie idempotencji jest uruchamiane przed obejściem zawartości: gdy znacznik `[OmniRoute Output Styles]` znajduje się już w polu `system` najwyższego poziomu (ciąg znaków lub tablica bloków treści) lub w komunikacie systemowym z zawartością ciągu znaków, treść pozostaje niezmieniona jako `already_applied` i nie jest uruchamiana żadna kontrola słów kluczowych. W przeciwnym razie obejście treści (`shouldBypassCavemanOutputMode()` w `open-sse/services/compression/outputMode.ts`) sprawdza tekst trzech ostatnich wiadomości, niezależnie od ich roli, i pomija style przez całą turę, gdy tekst ten pasuje do słów kluczowych bezpieczeństwa, nieodwracalnego działania lub wyjaśniania lub sekwencji zależnej od kolejności: `first`, `then`, `after that`, `before`, `rollback` lub `backup` po których w ciągu 240 znaków następuje `delete`, `drop`, `migrate`, `deploy` lub `release`. Obwodnica działa w trakcie** Obejście automatycznej przejrzystości** przełącznik (`cavemanOutputMode.autoClarity`, domyślnie włączony) jest włączony; wyłączenie przełącznika powoduje pominięcie sprawdzania słów kluczowych.

Kiedy obejście pozwala na przejście, `placeSystemInstruction()` (ten sam plik), który nigdy nie tworzy nowego `messages[0]`, umieszcza blok w pierwszym ze znalezionych:

1. Wiodący komunikat systemowy z zawartością ciągu znaków: blok jest dołączany po jego tekście.
2. Pole `system` najwyższego poziomu: blok jest dołączany po tekście ciągu znaków lub dodawany jako nowy blok tekstowy do tablicy bloków treści.
3. Pierwszy późniejszy komunikat systemowy z zawartością ciągu znaków: blok jest dołączany po jego tekście.
4. Żadne z powyższych: blok przechodzi do nowego komunikatu systemowego na końcu `messages`.

W przypadku ciała bez tablicy `messages` (lub z pustą) nie jest uruchamiane żadne obejście treści i nie jest sprawdzane pole `system` najwyższego poziomu. Blok jest dołączany po tekście pola tekstowego `instructions`, chyba że to pole zawiera już znacznik `[OmniRoute Output Styles]`, w którym to przypadku treść pozostaje niezmieniona jako `already_applied`. Gdy treść nie zawiera pola tekstowego `instructions` ale zawiera `input` (łańcuch lub tablicę), blok staje się `instructions`, zastępując każdą wartość niebędącą ciągiem, która jest przechowywana w tym polu. Treść nie zawierająca ani pola tekstowego `instructions` ani ciągu znaków ani tablicy `input` pozostaje niezmieniona i pomijana jako `no_messages`.

#### Jak włączyć

W panelu:** Kontekst kompresji → Ustawienia kompresji** (`/dashboard/context/settings`), Sekcja stylów wyjściowych: jeden wiersz na styl z przełącznikiem on/off i selektorem poziomu. Style są wstrzykiwane, gdy włączona jest kompresja (główny przełącznik strony, `enabled`). The** Obejście automatycznej przejrzystości** przełącznik jest na** Jaskiniowiec** strona (`/dashboard/context/caveman`), w swoim** Tryb wyjściowy** karta. Programowo konfiguracja kompresji utrzymuje wybór jako:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Kompatybilność wsteczna: gdy `outputStyles` jest pusta, starsze ustawienie `cavemanOutputMode.enabled` jest mapowane na `terse-prose` w `cavemanOutputMode.intensity`. Następnie blok zaczyna się od znacznika `[OmniRoute Output Styles]`, w którym starszy wtryskiwacz `applyCavemanOutputMode()` zapisał `[OmniRoute Caveman Output Mode]`. Tekst poniżej znacznika odpowiada starszemu zastrzykowi w en, pt-BR, es, de, fr, it, ru, id i vi; w ja i zh dodaje jedną spację przed klauzulą granic. `terse-prose` przekłada się na pt-BR, es, de, fr, it, ru, zh, ja, id i vi, więc żądanie, którego rozpoznanym językiem jest `hu` otrzymuje tekst w języku angielskim, podczas gdy starszy wtryskiwacz użył węgierskiego.

Wybór języka stylu wyjściowego (`resolveOutputStyleLanguage()` w `outputStyles/apply.ts`): przy włączonym `languageConfig.enabled`, `autoDetect` próbkuje najnowszą wiadomość użytkownika w tablicy `messages` żądania, która zawiera tekst (treść ciągu lub `text` jego części zawartości) i uruchamia na niej detektor silnika Caveman (`detectCompressionLanguage()`). Detektor zwraca `zh` w przypadku tekstu zawierającego znaki Han i bez kana; w przeciwnym razie zwraca to, które z `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` i `id` ma najwięcej dopasowań podpowiedzi, a `en` gdy żaden nie pasuje do tekstu — którego nie może sklasyfikować, pobiera angielski, nigdy `defaultLanguage` i `vi` nigdy nie jest wykrywane, chociaż style dostarczają tekst `vi`. Treść odpowiedzi API zachowuje swoje zwroty w `input`, które nie jest próbkowane, więc otrzymuje `defaultLanguage`, a następnie angielski. Gdy żadna wiadomość użytkownika w `messages` nie zawiera tekstu lub gdy `autoDetect` jest wyłączona, obowiązuje `defaultLanguage`, a następnie angielski. Gdy `languageConfig.enabled` jest wyłączone, językiem jest angielski — chyba że do żądania zostanie zastosowana kombinacja kompresji (kombinacja przypisana do kombinacji routingu żądania lub domyślna kombinacja kompresji, do chatCore powraca dla wbudowanego potoku stosowego): zastosowanie kombinacji włącza `languageConfig.enabled` dla tego żądania i ustawia `defaultLanguage` z pakietów językowych kombinacji (zapisana wartość, jeśli jest to jeden z pakietów kombinacji, w przeciwnym razie pierwszy pakiet kombinacji, który domyślnie `en`), podczas gdy zapisane `autoDetect` (domyślnie włączone) nadal obowiązuje. Silnik wejściowy Cavemana wybiera język pakietu reguł w różny sposób — dla każdej części tekstu i, przy wyłączonym automatycznym wykrywaniu, bramkuje na `enabledPacks`.

Macierz języka stylów × jest przypinana przez `tests/unit/compression/output-styles-i18n-matrix.test.ts`: każdy styl katalogu wymaga wpisu w testowym `BASELINE_LANGUAGES`; styl, który nie jest ograniczony do ustawień regionalnych, musi zawierać tłumaczenie pt-BR ( `terse-cjk` z bramką do ustawień regionalnych jest wyłączony z tej reguły), chyba że jest wymieniony w `KNOWN_ENGLISH_ONLY`, które może zawierać tylko style bez żadnych tłumaczeń. — wymieniony styl, który ma jakiekolwiek tłumaczenie, nie przechodzi testu; a styl nie przechodzi testu, gdy traci język wymieniony na liście wpisów `BASELINE_LANGUAGES`. Aby dodać styl, zobacz [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresja wyniku narzędzia

`compressToolResult()` w `open-sse/services/compression/toolResultCompressor.ts` kompresuje tekst wyniku narzędzia za pomocą** 5 strategii** . Próbuje je w tej kolejności, a o wyniku decyduje pierwsza włączona strategia, której sprawdzenie odpowiada treści:

1. **`fileContent`** : zawartość 3 lub więcej linii, w których co najmniej jedna linia, ignorując wcięcia początkowe, zaczyna się od `import `, `export `, `function `, `class `, `const `, `let `, `var ` lub `return ` (słowo kluczowe plus spacja) lub od `if`, `for` lub `while` po którym następuje `(` lub ` (`, zachowuje pierwszych 20 i ostatnich 5 linii, z zaznaczonym środkiem.
2. **`grepSearch`** : treść zawierająca co najmniej jedną linię w postaci `<path>:<digits>:`, gdzie tekst przed pierwszym dwukropkiem nie zawiera białych znaków, zachowuje tylko te linie, maksymalnie 30, po których następuje liczba kolejnych dopasowań i lista dopasowanych plików; co druga linia jest usuwana. Jedna taka linia wystarczy, aby uruchomić strategię, więc linia logu rozpoczynająca się od znacznika czasu, takiego jak `12:30:45` również się liczy.
3. **`shellOutput`** : wyjście zawierające sekwencję ANSI CSI (`ESC[` następnie cyfry lub średniki, a następnie literę, jak w kodach kolorów) lub `$`, po którym następuje biała spacja w dowolnym miejscu tekstu, traci te sekwencje (inne znaki ucieczki, takie jak `ESC[?25l` lub sekwencja tytułu okna OSC, są zachowywane) i zachowuje ostatnie 50 linii, a kolejne powtarzające się linie są zwinięte. Ponieważ ta kontrola jest wykonywana przed `json` i `errorMessage`, JSON lub wyjście błędu zawierające takie `$` nigdy do nich nie dociera, gdy `shellOutput` jest włączone.
4. **`json`** : podsumowuje się ładunek JSON składający się z ponad 2000 znaków, zaczynający się od `{` lub `[` (po opcjonalnych białych znakach) i analizuje: tablica składająca się z więcej niż 7 elementów zachowuje swoje pierwsze 5 i ostatnie 2 elementy oraz całkowitą liczbę, a obiekt zachowuje swoje pierwsze 20 kluczy, przy czym każdy zagnieżdżony obiekt lub wartość tablicy zostaje zastąpiona symbolem zastępczym `{…N keys}` (w przypadku tablicy N to jej długość) i znacznikiem `_remaining_<N>_keys` zliczającym klucze opuszczone poza pierwsze 20. Wartości skalarne są kopiowane w całości, więc obiekt składający się z 20 lub mniej kluczy i bez zagnieżdżonych wartości jest ponownie wcięty. —, a zminimalizowany zyskuje znaki i pozostaje niezmieniony.
5. **`errorMessage`** : wyjście zawierające, gdziekolwiek i z dowolną literą, `error:`, `error ` (słowo, po którym następuje spacja, jak w przypadku `no error found`), `[error]`, `exception:`, `exception `, `[exception]` lub `traceback` zachowujące pierwszą linię, kolejnych 10 linii i ostatnie 3, ze znacznikiem `… [N frames elided] …` w miejscu linii między nimi. Znacznik pojawia się tylko wtedy, gdy za pierwszą linią podąża więcej niż 13 linii, więc wyjście błędu wynoszące 14 lub mniej linii nie jest skracane (przy 12 lub 13 liniach ostatnie 3 powtórzone linie są już zachowane).

Po dopasowaniu strategii, nawet takiej, która niczego nie oszczędza, późniejsze strategie nie są wypróbowywane. Kiedy strategia dopasowująca nie zapisuje żadnych szacunkowych tokenów (długość ÷ 4, zaokrąglona w górę) — na przykład plik kodowy zawierający 25 lub mniej linii, lub tablicę JSON zawierającą ponad 2000 znaków z 7 lub mniej elementami — agresywny silnik zachowuje oryginalny wynik narzędzia: oba obiekty wywołujące (`compressAggressive()` i `compressAnthropicToolResultBlock()`) zachowują oryginał, gdy `saved` wynosi 0 lub mniej, podczas gdy samo `compressToolResult()` nadal zwraca wynik tej strategii. Krok wyniku narzędzia nie jest ostatnim słowem: rezerwowy podsumowanie silnika może nadal skrócić wiadomość `tool` lub `function` dłuższą niż 8192 znaki (`maxTokensPerMessage`, 2048, razy 4).

#### Kiedy używać

Kompresja wyników narzędzia to krok 1 agresywnego silnika (`compressAggressive()` w `open-sse/services/compression/aggressive.ts`), więc działa w trybie agresywnym i w kroku `aggressive` potoku skumulowanego. Kompresuje wiadomości `tool` i `function` w kształcie OpenAI oraz tekst wewnątrz bloków Anthropic `tool_result`. Każda strategia ma swój własny przełącznik pod `aggressive.toolStrategies`, domyślnie wszystkie są włączone. Na pulpicie nawigacyjnym przełączniki znajdują się na stronie Jaskiniowca** Zaawansowany** wyświetlaj, gdy kompresja jest włączona, a tryb domyślny to Agresywny.

### Ułożony rurociąg

Tryb skumulowany działa** kilka silników po kolei** — zwykle najpierw RTK (60-90% oszczędności na wydajności narzędzia), następnie Caveman na pozostałym tekście (~ 46% oszczędności na wejściu). Skomponowany, tzn** 78-95% kwalifikującego się zakresu** (patrz matematyka dotycząca oszczędności w segmencie wydobycia powyżej): średnie `1 - (1 - 0.60..0.90) × (1 - 0.46)` ≈ 89%.

#### Jak to działa

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Kiedy używać

Użyj trybu skumulowanego dla:

- Przepływy pracy wymagające dużej ilości narzędzi (kodowanie agentowe, badania)
- Ekonomiczne przetwarzanie wsadowe
- Kiedy potrzebujesz maksymalnych oszczędności tokenów

Potoki skumulowane są konfigurowane poprzez globalne ustawienie kompresji `stackedPipeline` lub poprzez nazwaną kombinację kompresji przypisaną do kombinacji routingu (patrz Zastąpienie poszczególnych kombinacji powyżej) — a nie poprzez automatyczną kombinację `modePack` (to pole zmienia jedynie wagę wyboru modelu automatycznej kombinacji, a `stacked` nie jest prawidłową nazwą pakietu).

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
