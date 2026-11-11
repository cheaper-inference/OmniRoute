# Cost & Spend Tracking (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇧🇦 [bs](../../../bs/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Jak OmniRoute szacuje, rejestruje i raportuje koszt każdego żądania — i dlaczego numer panelu kontrolnego to a **narzędzie do śledzenia oszczędności** , a nie rachunek.

Zobacz także: [Podręcznik użytkownika](./USER_GUIDE.md) · [Galeria funkcji](./FEATURES.md)

---

## Czym jest (a czym nie jest)

OmniRoute przypisuje koszt w USD do każdego completion, mnożąc liczbę tokenów przez
stawki cenowe modelu. Te liczby zasilają dashboard **Costs**, CLI
`omniroute cost` / `omniroute usage`, eksporty CSV/JSON oraz budżety per klucz API.

> **„Koszt” na dashboardzie to tracker oszczędności, a nie rachunek.** OmniRoute nigdy
> Cię nie obciąża — kieruje żądania do providerów, których już podłączyłeś (własne
> subskrypcje, darmowe tiery i klucze API). „Łączny koszt $290” narosły wyłącznie na
> darmowych modelach oznacza mniej więcej **$290, których _nie_ zapłaciłeś** płatnemu
> API. Ta wartość to _szacunek_ tego, ile ten sam ruch kosztowałby według standardowych
> cenników — dzięki temu widać, gdzie koncentruje się użycie i ile oszczędzasz, kierując
> ruch do tańszych/darmowych providerów.

To ujęcie jest wprost w projekcie [README](../../README.md) („the dashboard
'cost' is a savings tracker, not a bill”).

Ponieważ liczba jest szacunkiem:

- Zależy od tabeli cen OmniRoute dla każdego modelu. Model bez wpisu cenowego
  wnosi koszt `0` (w explorerze widać go jako wiersz „Legacy / Free”).
- Ruch z free-tier i subskrypcji nadal narasta jako _szacowany_ koszt — to kwota,
  którą oszczędzasz, a nie kwota do zapłaty.

---

## Jak szacowane są koszty

### Źródło cen

Koszty pochodzą z połączonej tabeli cenowej w [`src/lib/db/settings/pricing.ts`](../../src/lib/db/settings/pricing.ts), w tej kolejności pierwszeństwa (**najpierw najwyższy** ):

1. **Zastąpienia użytkownika** Ceny — ustawiane w panelu kontrolnym lub poprzez `PATCH /api/pricing` (przestrzeń nazw `pricing` ).
2. **synchronizacja modeli.dev** Ceny — pobrane z `https://models.dev/api.json` (przestrzeń nazw `models_dev_pricing` ).
3. **Synchronizacja LiteLLM** Ceny — pobrane z publicznego LiteLLM(przestrzeni nazw `pricing_synced` ) `model_prices_and_context_window.json`.
4. **Zakodowane na stałe ustawienia domyślne** Stawki — wysyłane w [`src/shared/constants/pricing/`](../../src/shared/constants/pricing/).

W przypadku tego samego provider/model wartości z warstw o wyższym priorytecie zastępują pasujące pola w niższych warstwach; pola nieobecne w górnej warstwie mogą nadal pochodzić z dolnej warstwy. Kolejność jest stała, nawet jeśli oba niezależne zadania synchronizacji są uruchamiane w tym samym czasie. `GET /api/pricing?includeSources=1` zwraca `pricing` i `sourceMap`, których etykiety poszczególnych modeli (`user`, `modelsDev`, `litellm`, `default`) identyfikują warstwę o najwyższym priorytecie zawierającą ten model.

**Synchronizacja LiteLLM** jest opcjonalna, domyślnie wyłączona. Jego zmienne środowiskowe (patrz [`.env.example`](../../.env.example) ) to:

| Kop. zm                 | Domyślny  | Zamiar                                                                               |
| ----------------------- | --------- | ------------------------------------------------------------------------------------ |
| `PRICING_SYNC_ENABLED`  | `false`   | Włącz synchronizację cen LiteLLM w tle.                                              |
| `PRICING_SYNC_INTERVAL` | `86400`   | Interwał synchronizacji w sekundach (codziennie).                                    |
| `PRICING_SYNC_SOURCES`  | `litellm` | Wybór źródła tylko dla tej synchronizacji; obecnie obsługiwany jest tylko `litellm`. |

**synchronizacja modeli.dev** jest oddzielna od synchronizacji LiteLLM i jest również domyślnie wyłączona. Włącz tę opcję w Ustawieniach (synchronizacja modeli.dev) lub użyj tych zmiennych:

| Kop. zm                    | Domyślny       | Zamiar                                                                                                                                                              |
| -------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MODELS_DEV_SYNC_ENABLED`  | _(nieoprawny)_ | Nieustawione następuje po przełączeniu Ustawień; `1/true/on/yes` wymusza włączenie, a `0/false/off/no` wymusza wyłączenie (nawet jeśli Ustawienia na to pozwalają). |
| `MODELS_DEV_SYNC_INTERVAL` | `86400`        | Domyślny interwał synchronizacji models.dev w sekundach (dziennie).                                                                                                 |

`PRICING_SYNC_SOURCES` tak **nie** włącz models.dev; kontroluje tylko synchronizację LiteLLM. Usunięcie zastąpienia użytkownika nie powoduje wyczyszczenia żadnej zsynchronizowanej przestrzeni nazw; wchodzi w życie kolejna dostępna warstwa cenowa. W przypadku modelu niedrogiego sprawdź zarówno ustawienia synchronizacji, jak i `sourceMap` przed dodaniem ręcznego zastąpienia.

### Formuła kosztowa

Koszt jest obliczany na żądanie na podstawie liczby tokenów i stawek za milion tokenów w [`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts) (`computeCostFromPricing` / `calculateCost`):

- **Tokeny wejściowe** (minus odczyty pamięci podręcznej i tokeny tworzenia pamięci podręcznej) Szybkość × `input`.
- **Tokeny odczytu pamięci podręcznej** × Stawka `cached` (powraca do stawki wejściowej).
- **Tokeny tworzenia pamięci podręcznej** × Stawka `cache_creation` (powraca do stawki wejściowej).
- **Tokeny wyjściowe** Kurs × `output`.
- **Żetony rozumowania** × Stawka `reasoning` (powraca do stawki wyjściowej).

Wszystkie stawki są interpretowane jako USD na 1 000 000 tokenów. Warstwa usług „szybka”/„priorytetowa” lub „elastyczna” Codex stosuje mnożnik kosztów (`getCodexFastCostMultiplier`) —, np. Flex jest rozliczany z 50% rabatem za tokeny, wyświetlany jako **oszczędności elastyczne** w desce rozdzielczej.

Nazwy modeli są najpierw normalizowane (prefiksy ścieżek dostawców, takie jak `openai/` lub `accounts/fireworks/models/` są usuwane), więc wiersze historyczne nadal odpowiadają cenie.

### Sposób rejestrowania wydatków

- Koszt pojedynczego żądania jest obliczany w momencie zakończenia żądania. Zużycie współdzielonego limitu jest planowane w następnym takcie pętli zdarzeń za pośrednictwem [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- Wydatki na klucze API są buforowane i opróżniane partiami przez [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (domyślny interwał opróżniania 60 s, bufor na 1000 wpisów). Możliwość strojenia poprzez:

  | Kop. zm                             | Domyślny | Zamiar                                           |
  | ----------------------------------- | -------- | ------------------------------------------------ |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000`  | Interwał spłukiwania w milisekundach.            |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`   | Maksymalnie buforowane wpisy przed opróżnieniem. |

W kosztach preferowana jest dokładna opłata podana przez dostawcę (`provider_cost_usd`), następnie migawka żądania według cen katalogowych (`calculated_cost_usd`), a następnie ponowna wycena tokenowa z bieżącego katalogu. Przechowywane koszty nie są ponownie naliczane na podstawie liczby tokenów. Starsze wiersze zawierające tylko tokeny nadal zmieniają się, gdy zmienia się ich cena katalogowa.

### OCR i osadzanie

- Pomyślne żądania `/v1/ocr` wykorzystują nadrzędne `usage_info.pages_processed`, a nie żądany zakres stron lub liczbę zwróconych obiektów strony. Szacunek to strony × `ocr_cost_per_page` (absolutne USD/page,**nie** USD/million).
- Żądania z adnotacjami dotyczącymi dokumentów lub ramek ograniczających wymagają osobnej taryfy `ocr_cost_per_annotated_page`. Bez tego koszt pozostaje nieznany; zwykła taryfa OCR nie jest po cichu zastępowana.
- Synchronizacja LiteLLM mapuje swoje wcześniejsze pole `annotation_cost_per_page` na `ocr_cost_per_annotated_page`, zachowując bezwzględną wartość USD/page i wpisy zawierające wyłącznie adnotacje, w tym jawne zero. Dostarczone pole kanoniczne ma pierwszeństwo; nieprawidłowe wartości aliasów są ignorowane. Zastąpienia cen użytkownika zachowują swój normalny priorytet. Zobacz [klucze cenowe OCR LiteLLM](https://docs.litellm.ai/docs/providers/mistral_batches#batch-ocr-cost-tracking).
- Użycie OCR przechowuje liczbę stron, cenę jednostkową, obliczony koszt USD, klucz API i wybrane połączenie. Strony nigdy nie są reprezentowane jako tokeny. Dzienniki połączeń zawierają metadane rozliczeniowe, a nie dokument URLs, bajty PDF lub wyodrębniony tekst.
- Pomyślne żądania `/v1/embeddings` rejestrują jeden wiersz użycia na partię fizyczną, w tym oddzielne partie zakończone w tej samej milisekundie. Opłaty zgłaszane przez dostawcę mają pierwszeństwo przed szacunkami tokenów; owijarki combo nie dodają opłaty.
- Historia użytkowania, analiza kosztów, okna provider/account, limity wydatków klucza API, księga kosztów żądań i codzienne podsumowania użytkowania obejmują te opłaty. Klucze bez dziennika zachowują rozliczenie numeryczne bez zachowywania tekstu źródłowego.
- Brakujące informacje dotyczące wykorzystania lub taryf **nieznany** , nie jest bezpłatny: nagłówek „koszt odpowiedzi” został pominięty, a istniejąca polityka bezpłatnego użytkowania ma zastosowanie do ograniczonych kluczy API. Jawnie skonfigurowane stawki zerowe pozostają ważne przy zerowym koszcie użytkowania.

Jest to rachunkowość typu forward. Na podstawie tej migracji nie można odtworzyć starych wywołań OCR/embedding, które nigdy nie zapisywały historii użytkowania. Szacunki katalogowe są szacunkami USD, a nie fakturą i nie obejmują przeliczania walut, podatków ani rabatów.

### Mowa i obrazy

- Udane próby `/v1/audio/transcriptions`, `/v1/audio/speech` i generowania obrazu mają wspólną rachunkowość numeryczną. Połączenia bezpośrednie i kombi zawierają klucz API osoby dzwoniącej i wybrane połączenie; opakowanie combo nigdy nie dodaje drugiego obciążenia.
- USD zgłoszone przez dostawcę wygrywa w porównaniu z szacunkami katalogowymi, w tym wyraźną zerową opłatą. OpenRouterJSON `usage.cost` jest znormalizowany do `cost_usd`. W przeciwnym razie zmierzone tokeny korzystają z cen tokenów, sekundy transkrypcji korzystają z cen na sekundę, wprowadzanie mowy wykorzystuje liczbę znaków Unicode, a obrazy z ceną ryczałtową korzystają z faktycznie zwróconej liczby, a nie żądanego `n`.
- Binarny OpenRouter TTS nie ma treści użytkowej JSON. Po zakończeniu dźwięku lub anulowaniu przez osobę dzwoniącą OmniRoute wysyła zapytanie ID o generację na **To samo** skonfigurowane pochodzenie OpenRouter. Żądanie EU nigdy nie wraca do źródła globalnego. Jest to wyszukiwanie ograniczone, tylko do odczytu; synteza nie jest ponawiana do celów księgowych. Rekordy rozliczeniowe mogą pojawić się po zakończeniu odtwarzania dźwięku: ponowne wyszukiwanie odbywa się w tle przez maksymalnie około 52 sekundy, włączając terminy sieciowe.
- Podczas tego wyszukiwania odpowiedź audio ma `X-OmniRoute-Cost-Status: pending` i nie ma nagłówka kosztu odpowiedzi. Jego końcowa opłata pojawia się w historii użytkowania, analityce i księdze kluczy po uzgodnieniu. Jeśli metadane są niedostępne, używana jest skonfigurowana migawka taryfowa; w przeciwnym razie koszt pozostaje nieznany.
- Sekundy, znaki i liczby obrazów mają oddzielne pola jednostek rozliczeniowych, nigdy nie są liczone fałszywe tokeny. Księgowość zachowuje wyłącznie użycie numeryczne, a nie tekst mowy, transkrypcje lub bajty obrazu. Istniejące wyjątki dotyczące obrazów bez ceny pozostają niezmienione: taryfa dotycząca rzeczywiście brakującego obrazu nie blokuje nowego klucza z ograniczonym dostępem, a w odpowiedzi pomija się nagłówek kosztu, zamiast deklarować, że połączenie jest bezpłatne. W przypadku awarii magazynu cenowego nadal pozostają dowody użycia umożliwiające wymuszenie zamknięcia w przypadku awarii.

Nie wymyślono ani nie uzupełniono żadnych historycznych opłat speech/image. Rozliczenia z operatorem pozostają punktem odniesienia dla faktur i połączeń, których opłaty nie zostały zgłoszone.

---

## Dashboard: strona Costs

Strona **Costs** jest pod `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Główny widok to zakładka **Cost Overview**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
która ładuje wszystko z `GET /api/usage/analytics`.

Co pokazuje:

- **Kafelki wydatków** — szacowany wydatek za _Today (1d)_, _7d_, _30d_ oraz wybrany
  zakres. Selektor zakresu: `7d`, `30d`, `90d`, `all`.
- **Metryki nagłówkowe** — żądania w oknie, aktywni providerzy, aktywne modele, średni
  koszt na żądanie.
- **Cost Explorer** — sortowalna/filtrowalna tabela grupowana po **provider**, **model**,
  **API key**, **account** lub **service tier**, z kosztem, żądaniami, tokenami, średnim
  kosztem/żądanie oraz udziałem w całości w %.
- **Zużycie tokenów** — tokeny total / input / output oraz stosunek input:output.
- **Efektywność routingu** — liczba fallbacków, wskaźnik fallback oraz pokrycie
  żądanego modelu.
- **Prognoza miesięczna** — projekcja wydatku na koniec miesiąca ze średniej dziennej.
- **Porównanie okresów** — zmiana % między pierwszą a drugą połową okna.
- **Wykresy** — dzienny trend kosztów, udział providerów (pie), top providerzy, top
  modele, koszt wg klucza API, koszt wg konta, tygodniowy wzorzec użycia oraz heatmapa
  aktywności.
- **Eksport** — pobranie bieżącego okna jako **CSV** lub **JSON** (przyciski pojawiają
  się, gdy są niezerowe dane kosztowe).

Gdy nie ma wycenionego ruchu, wiersze renderują etykietę „Legacy / Free” zamiast `$0`,
zgodnie z modelem trackera oszczędności.

### Powiązane podstrony Costs

Obszar Costs hostuje też (wszystko pod `/dashboard/costs/`):

- **Pricing** (`/dashboard/costs/pricing`) — podgląd i nadpisywanie cen per model
  (renderuje wspólną zakładkę Pricing).
- **Budget** (`/dashboard/costs/budget`) — limity wydatków per scope (renderuje wspólną
  zakładkę Budget).
- **Quota Share** (`/dashboard/costs/quota-share`) — pule shared-quota i widoki
  burn-rate.

---

## Endpointy API

Wszystkie wymagają management auth (loopback/JWT, przez `requireManagementAuth`), o ile
nie zaznaczono inaczej.

### Analityka użycia i kosztów

| Method | Endpoint                 | Cel                                                                                                                                                             |
| ------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/analytics`   | Pełna analityka kosztów/użycia: summary, dzienny trend, wg provider/model/API key/account/tier. Query: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Wykorzystanie quota per provider w czasie. Query: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                                  |
| `GET`  | `/api/usage/history`     | Surowe wiersze historii użycia.                                                                                                                                 |
| `GET`  | `/api/usage/call-logs`   | Logi wywołań per request (model, tokeny, koszt, latency, status).                                                                                               |
| `GET`  | `/api/usage/quota`       | Status quota providera.                                                                                                                                         |
| `GET`  | `/api/usage/proxy-logs`  | Logi żądań proxy.                                                                                                                                               |

### Budżety

| Method | Endpoint                 | Cel                                                                                                  |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | Podsumowanie kosztów + sprawdzenie budżetu dla jednego klucza API (wymagany query param `apiKeyId`). |
| `POST` | `/api/usage/budget`      | Ustawia limity USD dzienny/tygodniowy/miesięczny + próg ostrzeżenia dla klucza API.                  |
| `GET`  | `/api/usage/budget/bulk` | Zbiorcze podsumowania budżetów dla kluczy API.                                                       |

> API budżetu jest scoped per **API key** (`apiKeyId`). Limity zwracane przez
> `GET /api/usage/budget` obejmują `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`,
> `warningThreshold` oraz bieżące sumy (`totalCostToday`, `totalCostMonth`, …).

### Pricing

| Method   | Endpoint                | Cel                                                                                                                                                                      |
| -------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/pricing`          | Scalone ceny z czterech warstw (użytkownik, models.dev, LiteLLM, domyślne). `?includeSources=1` zwraca `pricing` + `sourceMap`.                                          |
| `PATCH`  | `/api/pricing`          | Nadpisanie cen dla `{ provider: { model: { input, output, cached, … } } }`.                                                                                              |
| `DELETE` | `/api/pricing`          | Usuwa nadpisania cen użytkownika (opcjonalnie ograniczone przez `?provider=&model=`); zsynchronizowane ceny i wbudowane wartości domyślne pozostają źródłami zapasowymi. |
| `GET`    | `/api/pricing/defaults` | Pokazuje domyślne stawki fallback per-1M.                                                                                                                                |
| `GET`    | `/api/pricing/models`   | Ceny kluczowane po modelu.                                                                                                                                               |
| `POST`   | `/api/pricing/sync`     | Ręczny sync ze źródeł zewnętrznych (LiteLLM).                                                                                                                            |
| `GET`    | `/api/pricing/sync`     | Bieżący status sync.                                                                                                                                                     |
| `DELETE` | `/api/pricing/sync`     | Czyści wyłącznie ceny zsynchronizowane przez LiteLLM (`pricing_synced`); dane models.dev są oddzielne.                                                                   |

### Inne endpointy związane z kosztami

| Method | Endpoint                      | Cel                                                                          |
| ------ | ----------------------------- | ---------------------------------------------------------------------------- |
| `GET`  | `/api/free-tier/summary`      | Sumy tokenów darmowych modeli, used-this-month oraz pozostały darmowy limit. |
| `GET`  | `/api/quota/pools/[id]/usage` | Użycie dla puli shared-quota.                                                |

---

## CLI

CLI OmniRoute udostępnia komendy cost, usage i pricing (zarejestrowane w
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Raport kosztów agregowany z `/api/usage/analytics`.

```bash
omniroute cost                          # last 30d, grouped by provider
omniroute cost --period 7d              # last 7 days
omniroute cost --group-by model         # group by provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Kolumny: group, requests, tokens in/out, cost (USD) oraz % of total. Na końcu drukowana
jest linia grand total (tłumiona przez `--quiet` lub `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # per-provider cost summary
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Budgets
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` czyta `GET /api/pricing/defaults`. Aby edytować ceny
> poszczególnych modeli, użyj strony **Pricing** w dashboardzie lub `PATCH /api/pricing`.

---

## Rozwiązywanie problemów

- **Wszystkie koszty pokazują $0 / „Legacy / Free”.** Używane modele nie mają wpisu
  cenowego. Włącz zewnętrzny sync (`PRICING_SYNC_ENABLED=true`) i uruchom
  `omniroute pricing sync`, albo ustaw ceny ręcznie na stronie Pricing / przez
  `PATCH /api/pricing`.
- **Historyczny model ma złą cenę.** Popraw cenę (override lub re-sync) — koszt jest
  przeliczany z liczby tokenów przy każdym odczycie analytics, więc szacunki aktualizują
  się z mocą wsteczną.
- **Wydatki opóźniają się względem czasu rzeczywistego.** Spend per klucz jest batchowany;
  obniż `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS`, jeśli potrzebujesz świeższych liczb.

---

Gdzie to pasuje w szerszym dashboardzie, zobacz [Przewodnik użytkownika](./USER_GUIDE.md) i
[Galerię funkcji](./FEATURES.md).
