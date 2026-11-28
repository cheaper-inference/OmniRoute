# Quota Sharing Engine (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

title: "Silnik współdzielenia quota"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Silnik współdzielenia quota

> **Doc reference**: `docs/routing/QUOTA_SHARE.md`
> Część grupy B (plany 16 + 22).

---

## Przegląd

Silnik współdzielenia quota (Quota Sharing Engine) sprawiedliwie rozdziela
quota providera opartą na czasie (np. okno 5-godzinne Codex, Kimi 1500 req/h)
pomiędzy wiele kluczy API współdzielących to samo połączenie.

**Problem, który rozwiązuje:** OmniRoute proxy’uje wiele kluczy API względem
tego samego konta upstream providera. Bez logiki współdzielenia burst z klucza A
może wyczerpać quota providera na godzinę, blokując klucze B i C do resetu okna.
Silnik temu zapobiega przez:

1. Śledzenie rolling consumption każdego klucza per wymiar (%, requests, tokens, $).
2. Stosowanie work-conserving algorytmu fair-share: klucz może pożyczać z
   bezczynnych udziałów, dopóki globalna pula nie jest nasycona.
3. Egzekwowanie wyniku na hot path (`chatCore.ts`) zanim żądanie
   dotrze do upstream executor.

---

## Algorytm: sprawiedliwy podział i ochrona pracy

Zaimplementowano w `src/lib/quota/fairShare.ts`.

### Tryby

| Stan                                       | Tryb       | Zachowanie                                                                         |
| ------------------------------------------ | ---------- | ---------------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Hojny**  | Klucz może pożyczyć maksymalnie do limitu globalnego pomniejszonego o sumę zużycia |
| `globalUsedPercent >= saturationThreshold` | **Ścisły** | Egzekwuj ściśle indywidualny sprawiedliwy udział                                   |

Domyślne `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Te dwa tryby opisują pulę w domyślnym trybie pożyczania, `saturation`. Pula w trybie `consent` zawsze stosuje się do ścisłych zasad, niezależnie od nasycenia. Zobacz [Udzielanie pożyczek za zgodą (opcja dla każdej puli)](#consented-lending-per-pool-opt-in).

### Decyzja dotycząca wymiaru

Dla każdego aktywnego wymiaru w puli silnik oblicza:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

W przypadku wymiarów `percent` `consumed` pochodzi zamiast tego z księgi atrybucji (zobacz [Wymiary procentowe: atrybucja według klucza](#percent-dimensions-per-key-attribution) ).

Następnie:

- **`policy = hard`** : jeśli `consumed > fairShareAllowed` i tryb jest ścisły →** blok** .
- **`policy = soft`** : jeśli `consumed > fairShareAllowed` i tryb jest ścisły →** karać** (zmniejsz priorytet w kombinacji; nigdy nie blokuj na stałe).
- **`policy = burst`** : zezwól, dopóki istnieje globalny zapas, niezależnie od sprawiedliwego udziału.

### Czapka absolutna

`capValue` + `capUnit` na alokację to sztywny pułap niezależny od trybu lub polityki. Dowolny wymiar, w którym zawsze `consumed >= capValue`** bloki** żądanie. W przypadku czapki `percent` `consumed` jest tylko częścią przypisaną do klucza.

### Kontrola wielowymiarowa

Żądanie jest blokowane, jeśli** każdy** wymiar w puli mógłby to zablokować. Wymiary są niezależne. — wyczerpanie 5h% nie ma wpływu na wymiar tygodniowy.

### Pożyczanie

W trybie hojnym klucz, którego alokacja jest niewykorzystana, może wykorzystać nadwyżkę z nieprzydzielonych udziałów innych kluczy. Formuła to:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

gdzie `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Teto global (pula `limit` dla tego wymiaru) jest zawsze twardym sufitem.

### Udzielanie pożyczek za zgodą (opcja dla każdej puli)

Każda pula ma tryb pożyczania. `saturation` jest ustawieniem domyślnym i zachowuje powyższe zasady. W trybie `consent` klucz `hard` przekazuje swój udział tylko w zakresie, jaki inne klucze zgodziły się pożyczyć. Administrator ustawia tryb każdej puli. Każdy posiadacz klucza ustala własną zgodę poprzez [Zgodę użyczenia](#lending-consent).

Zgoda to wartość procentowa od 0 do 100 i opcjonalny termin w milisekundach epoki. Klucz pożycza ten procent swojego niewykorzystanego udziału, a termin przypada w przyszłości.

W przypadku jednego wymiaru `L` jest efektywnym limitem: limit planu pomnożony przez konta w puli. Bramka oblicza dla żądającego klucza:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` to waga klucza lub `100 / n` dla każdego klucza, gdy żaden z nich nie przekracza 0. `lend_k` to procent aktywności klucza i 0 po upływie terminu. Własna zgoda pytającego klucza nigdy się nie liczy. Klucz `hard` zostaje odrzucony, gdy jego zużycie osiągnie swój udział plus `borrowAvailable`.

Pojemność, której nie dotyczy żaden przydział (100 minus suma wag), nie podlega wypożyczeniu. Żaden klucz nie zgodził się go pożyczyć.

**Przykład.** `L` wynosi 1000.

| Klawisz | Waga | Udział | Strawiony | Pożycza |
| ------- | ---- | ------ | --------- | ------- |
| A       | 50   | 500    | 530       | 0%      |
| B       | 30   | 300    | 100       | 50%     |
| C       | 0    | 0      | 60        | 0%      |

- B pożycza 50% swoich wolnych 200, czyli 100. C wziął już 60 powyżej swojego udziału. A może pożyczyć 40.
- A jest podawane o godzinie 530 i odmawiane, gdy jego spożycie osiągnie 540.
- Zanim C czegokolwiek użył, z A na poziomie lub poniżej swojego udziału, C mógł pożyczyć 100.
- Zanim C czegokolwiek użył, mając A na poziomie 530, C mógł pożyczyć 70.

**Zerowa waga.** Klucz o wadze 0 ma udział równy 0. Jest obsługiwany tylko wtedy, gdy jego zużycie jest mniejsze niż pożyczają inni. Kiedy nikt nie pożycza, zostaje ona odrzucona już na pierwszy wniosek.

**Terminy.** Żadne zadanie w tle nie powoduje wygaśnięcia zgody. Każde żądanie porównuje termin ze swoim czasem i termin równy temu czasowi upłynął. Przechowywany termin, który nie jest liczbą skończoną lub przekracza największą datę, jaką może pomieścić `Date`, liczy się jako upłynął.

**`soft` i `burst`.** Kredyty ich nie ograniczają. Klucz `soft` traci priorytet po przekroczeniu jego udziału. Klucz `burst` przechodzi, dopóki w basenie jest miejsce. Sufit basenu nadal odrzuca każdy klucz, gdy suma puli osiągnie swój limit.

**Koszt na ścieżce żądania.** Pula `saturation` nie czyta nic więcej niż wcześniej. W puli `consent` wymiar przeliczalny odczytuje inne klucze tylko dla klucza `hard` na poziomie lub powyżej jego udziału, podczas gdy inny klucz pożycza. Następnie wykonuje jeden odczyt na drugi klucz, równolegle. Nieudany odczyt liczy się jako zużycie 0 dla tego klucza. Wymiar `percent` nie dodaje odczytu, ponieważ księga atrybucji zawiera każdy klucz.

**Edytowanie puli.** Edycja zachowuje zgodę kluczy, które pozostają. Dotyczy to edycji alokacji, zamian w całej grupie i wywołań `ensure`. Usunięty klucz traci swoją zgodę, a klucz dodany ponownie zaczyna się od 0. Trasy administracyjne zwracają zgodę każdego klucza i nigdy jej nie zapisują. Przełączenie puli z powrotem na `saturation` powoduje zachowanie wszystkich zapisanych zgód, co nie ma żadnego efektu w tym trybie. Ponowne przełączenie puli na `consent` powoduje reaktywację zapisanych zgód, których termin nie upłynął. Posiadacz klucza może wyczyścić zapisaną zgodę w dowolnym trybie.

**Aktualizacja.** Jeśli kolumny `lending_percent` i `lending_until` już istnieją, migracja dodaje tylko `borrow_mode`, a zapisane wartości procentowe pozostają bez zmian. Każda pula uruchamia się w trybie `saturation`. Włącz `consent` dla każdej puli w kreatorze puli. Z zapisanych wartości nie wynika nic.

**Ograniczenia.**

- Pożyczkodawca może znaleźć pulę u jej pułapu, zanim wykorzysta swój własny udział. Pojemność pożyczona przez innych wlicza się do całkowitej puli.
- Kontrola przebiega przed żądaniem i nie powoduje żadnych zastrzeżeń. Równoczesne żądania odczytują zużycie, zanim jakiekolwiek zostanie zarejestrowane, więc pożyczona pojemność może zostać wykorzystana więcej niż raz, w zależności od bieżących żądań. Kontrola udziału w trybie `saturation` ma tę samą właściwość.

---

## Licznik okna przesuwnego (Sliding Window Counter)

Zaimplementowany w `src/lib/quota/sqliteQuotaStore.ts` oraz `redisQuotaStore.ts`.

Dwa buckety na `(apiKeyId, dimensionKey)`:

- `curr`: bieżący bucket (`floor(nowMs / windowMs)`)
- `prev`: poprzedni bucket (`curr - 1`)

Efektywna wartość rolling:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precyzja**: ~99% dokładności. Błąd wynosi co najwyżej 1% rozmiaru okna na
granicy bucketów (właściwość przybliżenia 2-bucket).

### Współbieżność

Sterownik SQLite: mutex w pamięci per klucz `(apiKeyId | dimensionKey)` zapobiega
wyścigowi read-modify-write. Wzorzec jak anti-thundering-herd w `src/sse/services/auth.ts`.

Sterownik Redis: skrypt Lua EVAL do atomowego inkrementu — jako pojedyncza komenda Redis.

---

## Sterowniki (Drivers)

### SQLite (domyślny, 0-install)

- Tabela: `quota_consumption` (zob. migracje `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Najlepszy do wdrożeń single-instance.
- Cała persystencja w istniejącej bazie SQLite OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (opcjonalny, multi-instance)

- Wymaga pakietu npm `ioredis`.
- Liczniki w Redis; metadane (pools/allocations) nadal w SQLite.
- Najlepszy do wdrożeń multi-replica, gdzie liczniki muszą być współdzielone.

### Przełączanie sterowników

Przez UI ustawień (`/dashboard/settings` → Quota Store) lub zmienne env:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Ustawienie DB ma pierwszeństwo przed env. Jeśli `driver=redis`, ale brak URL albo
`ioredis` nie jest zainstalowany, fabryka wraca do SQLite i loguje ostrzeżenie.

Kolejność wyboru sterownika:

1. Ustawienie DB `quotaStore.driver`
2. Env `QUOTA_STORE_DRIVER`
3. Domyślnie: `sqlite`

---

## Wielowymiarowy

Pula może mieć wiele wymiarów. Każdy wymiar jest niezależny:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Przykład: plan Codex** (5h% + tygodniowo%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Żądanie musi spełniać wszystkie wymiary, aby było dozwolone.

### Wymiary procentowe: przypisanie do klucza

Plan procentowy podaje jedną wartość wykorzystania na konto i okno planu. Dostawca nie podaje licznika na klucz API.

Aby podzielić tę kwotę pomiędzy klucze, każda pula prowadzi księgę atrybucji dla każdego konta i okna planu. `src/lib/quota/percentLedger.ts` zawiera zasady zawarte w książce. `src/lib/quota/percentAttribution.ts` zamienia książkę na liczby używane przez egzekwowanie prawa. Wynikiem jest oszacowanie zbudowane na podstawie tokenów poszczególnych kluczowych tras.

#### Czytania, które poruszają książkę

Książka porusza się wyłącznie po figurze dostawcy dla żądanego okna planu. Te połączenia zgłaszają jedno:

| Dostawca                         | Zaplanuj okna  |
| -------------------------------- | -------------- |
| Claude, poprzez połączenie OAuth | `5h`, `weekly` |
| Codex                            | `5h`, `weekly` |

Nie liczą się jako odczyty:

- odpowiedź, którą klient dostawcy oznacza jako nieaktualną
- okno Claude którego procentu dostawca nie zgłosił
- postać innego okna lub najgorszy przypadek w poprzek okien
- rezerwowy nagłówek limitu szybkości
- nieudana lektura

Inni dostawcy, w tym Claude z kluczem API, nie mają książki. Każdy klucz jest obciążony opłatą w wysokości 0 procent jego wymiarów, tak jak przed tą zmianą.

Odczyt korzysta z 30-sekundowej pamięci podręcznej sygnału nasycenia. Odczyt Claude datowany jest na moment zaobserwowania liczby w nagłówkach odpowiedzi lub odczytania z punktu końcowego użycia, jeśli ten czas jest znany. Inne odczyty są datowane na czas utworzenia wpisu w pamięci podręcznej.

#### Co trzyma książka

Każde zarejestrowane żądanie dodaje swoje tokeny jednorazowo do licznika na pulę, konto i klucz. Licznik tylko rośnie. Książka zawiera trzy rzeczy:

- linia bazowa: liczba, kiedy książka została otwarta lub okno zostało ostatnio otwarte
- ostatnia zastosowana cyfra
- na klucz, jego licznik żetonów w tym samym momencie, zwany jego znakiem

Księga jest aktualizowana, gdy egzekwowanie prawa lub trasa użytkowania obliczają atrybucję. Zapisy są porównywane i ustawiane na numerze wersji. Pisarz, który raz przegrywa ponowną próbę przy świeżej lekturze.

#### Sposób obliczania części klucza

Część każdego klucza jest obliczana podczas czytania książki. Wzrost figury od linii bazowej jest dzielony pomiędzy klucze proporcjonalnie do żetonów, które każdy z nich poprowadził od swojego znaku.

Together, te żetony wyjaśniają maksymalnie jeden punkt figury na żetony `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` (domyślnie 1000). Wzrost, którego nie wyjaśniają, jest zewnętrzny. Linia bazowa jest również zewnętrzna.

Na przykład książka otwiera się o wartości 0. Klucz A następnie kieruje 900 000 tokenów, a klucz B – 100 000. Przy liczbie 60 część A wynosi 54 punkty, a część B wynosi 6.

Licznik poniżej znaku klucza został uruchomiony ponownie i liczy w całości. Klucz bez znaku, np. klucz dołączany do puli na środku okna, liczy wszystkie swoje żetony. Figurka opóźniona względem żetonów powoduje błąd, który znika przy następnym odczycie. Nie kumuluje się.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` jest czytane przy każdym przypisaniu. Wartość, która nie jest liczbą skończoną wynoszącą co najmniej 1, spada do 1000.

#### Jak lektura zmienia książkę

Obowiązuje pierwsza reguła dopasowania:

1. **Nie ma jeszcze książki:** czytanie otwiera księgę. Jej liczba stanowi linię bazową i każdy licznik jest oznaczony.
2. **Starsza lektura:** odczyt datowany przed ostatnim zastosowanym jest ignorowany. Podobnie jest z odczytem, którego czas resetowania jest dłuższy o ponad 30 minut od zapisanego.
3. **Nowe okno dostawcy:** czas resetowania dłuższy niż 30 minut później niż zapisany odwraca książkę. Liczba staje się linią bazową i każdy licznik jest ponownie zaznaczany. Klucze bez licznika opuszczają księgę.
4. **Zakończone okno:** zapisany czas resetowania, który nie jest późniejszy niż czas danych odczytu, oznacza, że okno się zakończyło. Lektura zmienia książkę, niezależnie od jej postaci.
5. **Wyższa liczba:** porusza się tylko ostatnia figurka. Linia bazowa i znaki pozostają.
6. **Ta sama liczba:** figura, linia bazowa i ślady pozostają. Napisano tylko czas resetu, którego brakuje w książce.
7. **Dolna liczba:** niższa liczba nigdy nie jest stosowana jako taka. Odwraca losy książki tylko wtedy, gdy trzymają się trzy rzeczy. Jest co najmniej dwie minuty nowszy od ostatniego zastosowanego odczytu. Nic nie mówi, że okno jest takie samo otwarte. Jest o ponad jeden punkt niższy.

Okno liczy się jako takie samo otwarte, gdy trzymają się trzy rzeczy. Obydwa czasy resetu są znane. Są w odległości 30 minut od siebie. Zapisany jest nadal przed odczytem. Niższa cyfra w tym oknie niczego nie zmienia.

Czas resetowania jest zapisywany tylko wtedy, gdy wyprzedza czas danych odczytu, który go niesie. Wyższa liczba przechowuje czas resetowania odczytu, gdy jest on użyteczny, i zachowuje zapisany czas w przeciwnym razie. Równa liczba rejestruje czas resetowania odczytu tylko wtedy, gdy książka go nie ma. To nie zmienia niczego innego. Niższa liczba, która nie powoduje zmiany zapisów księgowych, nie ma czasu resetowania.

#### Kiedy książka jest używana

Po przeczytaniu książka jest używana, chyba że zapisany czas resetowania nie jest późniejszy niż bieżący. Przypadek taki ma miejsce, gdy odczyt dokonany tuż przed resetem, np. podany z pamięci podręcznej, jest obserwowany tuż po nim.

Bez użytecznego odczytu, przechowywana książka jest używana tylko wtedy, gdy nadal może być książką bieżącego okna. Dzieje się tak w dwóch przypadkach:

- czas resetu jest znany i wciąż przed nami
- nie ma czasu resetowania, a ostatni odczyt, który go zmienił, ma najwyżej 15 minut

W przeciwnym razie nic nie jest przypisywane, jak wtedy, gdy nie ma książki. Książka, której zapisany czas resetowania minął, nigdy nie jest obciążana opłatą.

#### Egzekwowanie

Zużycie klucza w wymiarze procentowym to jego część przypisana plus udział części zewnętrznej. Część zewnętrzna najpierw korzysta z zdolności produkcyjnej bez roszczeń alokacyjnych (100 minus suma wag). Tylko nadwyżka jest dzielona pomiędzy klucze wagowo.

Zużycie to porównuje się z sprawiedliwym udziałem klucza, jak w każdym innym wymiarze. Tryb ścisły nadal rozpoczyna się, gdy sygnał nasycenia osiągnie `QUOTA_SATURATION_THRESHOLD` (domyślnie 0,5). Każda liczba jest skalowana według efektywnego limitu: limit na konto razy liczba kont w puli.

Limit absolutny z `capUnit: "percent"` liczy tylko część przypisaną do klawisza, skalowaną w ten sam sposób. Przyjmij limit na konto wynoszący 100 i k kont. Limit N zostaje osiągnięty, gdy część klucza na koncie obsługującym osiągnie punkty N/k. Każde konto jest sprawdzane w oparciu o własną księgę. Na przykład w przypadku dwóch kont limit 10 osiągany jest przy 5 punktach wartości jednego konta.

Gdy nie można odczytać sklepu, nic nie jest przypisywane i każdy klucz jest obciążany opłatą w wysokości 0 w tym wymiarze. Kiedy pisanie książki się nie powiedzie, atrybucja używa książki w takiej postaci, w jakiej została przeczytana. Nieudany zapis tokenu powoduje, że tokeny tego żądania są usuwane z księgi. Żaden z tych błędów nie blokuje żądania.

W puli `consent` formuła pożyczania wykorzystuje zużycie każdego klucza w wymiarze procentowym, jak opisano powyżej. Kiedy pożyczy się inny klucz, księga jest czytana raz i przypisana do każdego klucza. Bez książki użytkowej każdy klucz jest obciążony opłatą w wysokości 0. Klucz o wadze następnie przechodzi, a klucz o wadze 0 przechodzi tylko wtedy, gdy inny klucz zostanie pożyczony.

#### Droga użytkowania

`GET /api/quota/pools/{id}/usage` zgłasza te same liczby za pomocą tej samej funkcji. Wymiar procentowy ma jeden wpis na połączenie puli w `accounts`. Jego najwyższe poziomy `consumedTotal` i `perKey` odzwierciedlają pierwszy wpis.

Trasa uwzględnia także bieżący odczyt, dzięki czemu może przesuwać książkę zgodnie z żądaniem. `internal + external` może różnić się od `consumedTotal`, gdy nie ma użytecznego odczytu lub gdy nie stosuje się niższej wartości.

#### Przechowywanie i przechowywanie

Obydwa sklepy kwotowe prowadzą księgę. W SQLite automatyczne czyszczenie bazy danych, jeśli jest włączone, usuwa wiersze nieaktualizowane przez 60 dni. W Redis księgi i liczniki połączenia puli mają ten sam klucz. Wygasa po 60 dniach od ostatniego zapisu tokena lub zmiany księgi. Książka, która się nie zmienia, nie jest przepisana, dlatego granica jest ustawiana powyżej najdłuższego okna planu. Ręczny reset historii użytkowania czyści także księgi SQLite (patrz Ograniczenia).

#### Ograniczenia

- Cały wzrost kwoty konta od wartości bazowej jest dzielony przez tokeny, które każdy klucz przekierował od tego czasu. Kiedy ten wzrost nastąpił, nie ma znaczenia.
- Zatem użycie poza OmniRoute jest obciążane kluczami w wysokości odpowiadającej ich tokenom. Obejmuje to użycie dokonane przed pierwszym żądaniem klucza do okna, gdy książka była już otwarta.
- Przykładowo użycie na zewnątrz podnosi konto o 60 punktów przy braku kluczowych tras. Klucz następnie kieruje 30 000 tokenów, a liczba ta osiąga 60,6.
- Jeżeli księga była otwarta przed tym użyciem, część kluczowa wynosi 30 punktów. Posiada również 7,65 do użytku zewnętrznego, z czterema klawiszami o wadze 25.
- Jeśli książka została otwarta po tym użyciu, 60 punktów stanowi wartość bazową. Część klucza wynosi 0,6 punktu i ma 15 zastosowań zewnętrznych.
- Zapytanie lub wizyta na trasie użytkowania otwiera książkę. Zatem to, czy takie użycie liczy się jako punkt odniesienia, zależy od tego, kiedy książka została otwarta.
- Przy domyślnym poziomie klucz, który przesyła 60 000 tokenów podczas użycia na zewnątrz, podnosi konto o 60 punktów, a wszystkie 60 otrzymuje jako własną część.
- Przy podłodze wynoszącej 50 000 część własna wynosi 1,2 punktu. Pozostałe 58,8 są zewnętrzne i obciążane wagowo, jak w przypadku każdego zastosowania zewnętrznego.
- Ustaw `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` blisko kosztu jednego punktu w swoim planie. Użycie zewnętrzne obejmuje ruch na tym samym koncie z kluczy znajdujących się poza pulą.
- W każdym trybie obowiązuje ograniczenie procentowe. Klucz ograniczony może zostać odrzucony, jeśli konto jest znacznie poniżej progu nasycenia.
- Weź czapkę 10 i 12 punktów użytku zewnętrznego wcześniej w oknie. Klucz, który przesyła 20 000 tokenów, jest następnie odrzucany przy wartości konta wynoszącej 12,4%.
- Podział jest oszacowaniem według wolumenu symbolicznego. Żądanie liczy się jako jego żetony zachęty i żetony zakończenia. Zniżki na pamięci podręczne i ceny modeli nie zmieniają tej liczby.
- Żądanie, które nie kończy się statusem 200, nie rejestruje żadnych tokenów. Przykładami są strumień rozłączany przez klienta i błąd nadrzędny po zużyciu.
- Użycie spowodowane takim żądaniem jest obciążane kluczami, które zarejestrowały tokeny, do kwoty, na jaką pozwalają ich tokeny. Reszta jest zewnętrzna. Nie cofa się. Odpowiedź, która zgłasza brak użycia tokenu, również nie rejestruje żadnych tokenów.
- Użycie trwającego żądania może być widoczne w części innego aktywnego klucza dla całego żądania. Cofa się tylko wtedy, gdy żądanie kończy się statusem 200.
- Użycie już na koncie w momencie otwarcia książki liczy się jako zewnętrzne. Obejmuje to uaktualnienie, nową pulę i nowe konto. Użycie w nowym oknie przed pierwszym odczytem również liczy się jako zewnętrzne.
- Każdy klucz zaczyna się od udziału wagowego w tym użyciu, po braku roszczeń o alokację pojemności. Z jednym kontem na poziomie 85% i pięcioma kluczami o wadze 20, każdy zaczyna z 17 z 20 używanych.
- W puli obejmującej kilka kont wartość konta obsługującego jest doliczana do zsumowanego budżetu. To nie zmienia się w książce.
- Dolna liczba w oknie, które dostawca zgłasza jako otwarte, nie jest stosowana. Czas resetowania cofnięty o więcej niż 30 minut jest traktowany jako stary odczyt.
- W obu przypadkach książka zachowuje swój stan aż do upływu zapisanego czasu resetowania. Następnie książka nie jest ładowana, dopóki nie zostanie odczytana.
- Rozwiązaniem jest ręczne zresetowanie historii użytkowania (`POST /api/settings/purge-usage-history`). Czyści księgi atrybucji i ich liczniki tokenów w bazie danych SQLite.
- Okres `all` czyści każdą książkę i licznik. Krótszy okres czyści najpierw księgi, które nie zostały w nim zapisane. Następnie czyści liczniki, które nie są w nim zapisane, ale tylko dla połączenia z pulą, w którym nie ma już żadnych książek. Prowadzona książka nadal oznacza każdy klucz na blacie.
- Książka, której figura się nie poruszyła, nie jest przepisana, więc krótszy okres może również wyczyścić księgę bieżącego okna. Następne czytanie otwiera nową książkę z obecną liczbą.
- Reset nie dotyczy sklepu z kwotą Redis. Tam książka kończy się wraz ze swoim oknem lub wygasa po 60 dniach od ostatniego zapisu.
- Gdy dostawca nie wysyła czasu resetowania, okno, które resetuje się i uzupełnia powyżej starej wartości między dwoma odczytami, wygląda jak wyższa wartość. W książce zachowano starą linię bazową i oznaczenia.
- Odczyty datowane są według lokalnego zegara. Jeśli wyprzedzi dostawcę lub źródło poda czas resetowania nieco wcześniej, książka może wcześniej wykryć tę różnicę.
- Wzrost w tym krótkim okresie jest dzielony przez żetony w nim kierowane. Pierwsze czytanie w następnym oknie koryguje to. Jeżeli odwrócona książka nie zawiera czasu resetowania, korekta wymaga niższej wartości, co najmniej o dwie minuty nowszej niż ostatni zastosowany odczyt.
- Instancje, które współdzielą odczyty dat sklepu Redis z własnymi zegarami, więc synchronizuj te zegary. Odczyty instancji, której zegar działa z opóźnieniem, wyglądają na starsze i są ignorowane.
- Jeśli po zapisanym czasie resetowania nie zostanie osiągnięty żaden użyteczny odczyt, udziały procentowe poszczególnych klawiszy i górne wartości procentowe nie są wymuszane, dopóki odczyt nie powróci. Bez czasu resetowania rozpoczyna się on 15 minut po ostatnim czytaniu, które zmieniło książkę.
- W sklepie Redis książka nieużywana przez 60 dni może wygasnąć pomiędzy czekiem autorskim a jej zapisem. Następnie jest on ponownie tworzony w wersji powyżej 1, która jest prawidłowym stanem.

---

## Plan Resolver

Zaimplementowany w `src/lib/quota/planResolver.ts`.

Precedencja (od najwyższej do najniższej):

1. **Ręczny override w DB** — tabela `provider_plans`, per `connectionId`.
2. **Znany katalog** — `src/lib/quota/planRegistry.ts` (data-only).
3. **Pusty plan** — brak wymiarów, wymagana ręczna konfiguracja.

### Znany katalog

| Provider              | Dimensions                                                    |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, unknown), `tokens/weekly`               |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Brak domyślnego — wymagana ręczna konfiguracja                |

---

## Integracja rurociągów

### hak PRE (`open-sse/handlers/chatCore.ts`)

Działa przed nadrzędnym modułem wykonawczym, po sprawdzeniu uwierzytelnienia i zasad:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Otwieranie awaryjne** : jeśli `enforceQuotaShare` wyrzuci, żądanie zostanie przepuszczone z logiem `pino.warn`. Zapobiega to blokowaniu całego ruchu przez błąd mechanizmu przydziałów.

**Kiedy powróci pojemność.** Odmowa udziału w kluczu lub pułapu puli kończy się jednym z dwóch zdań, w obu trybach wypożyczenia:

- `percent` window: `. The <window> window resets at <time>.` Czas resetowania raportowany przez dostawcę.
- Jednostka policzalna: `. Enough <window> usage is expected to clear by <time>.` Czas jest górną granicą przesuwanego okna, jeśli klawisz nie wysyła nic innego.

`<time>` to natychmiastowy ISO 8601 w UTC. Odmowa powoduje wówczas `Retry-After`: całe sekundy do tej chwili plus jeden. Klient, który czeka tak długo, ponawia próbę co najwyżej jedną sekundę po chwili. Jeżeli moment nie jest znany, odmowa nie zawiera ani wyroku, ani nagłówka. Bezwzględna odmowa ograniczenia limitu nie oznacza żadnego z nich. Kod publiczny pozostaje `quota_share_blocked`.

Odmowa udostępnienia nie ma wpływu na udostępnione połączenie. Nie ustawia żadnego czasu odnowienia, blokady modelu ani awarii wyłącznika dostawcy, a inne klucze puli są nadal obsługiwane. Kiedy każdy cel kombinacji odmawia klucza do swojego udziału, kombinacja odpowiada na 429 bez czekania. Jego odpowiedź zawiera wskazówkę jako `Retry-After`. Ścieżka osadzania kończy swoją odmowę tym samym zdaniem i nie wysyła żadnego `Retry-After`.

### hak POST (rekordowe zużycie)

Po udanej odpowiedzi:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Notatka dryfująca** : jeśli `consume` nie powiedzie się po odpowiedzi, licznik kroczący zaniży wartość. Sygnał nasycenia od dostawcy (np. `anthropic-ratelimit-unified-5h-utilization`) koryguje globalne oszacowanie przy następnym żądaniu.

### Kombinacja miękkiej kary (`open-sse/services/combo.ts`)

Kiedy `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Kara jest nakładana po wszystkich innych czynnikach punktacji. Obniża prawdopodobieństwo automatycznego combo wybrania nasyconego klawisza bez jego twardego blokowania.

---

## UI Przewodnik

### `/dashboard/costs/quota-share` — Strona główna z basenami

Komponenty (wszystko w `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Część                  | Zamiar                                                                          |
| ---------------------- | ------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Karta wprowadzająca objaśniająca podział przydziałów nowym użytkownikom         |
| `CreatePoolModal`      | Utwórz nową pulę kwot (połączenie + nazwa + początkowe przydziały)              |
| `PoolCard`             | Podsumowanie dla puli: nazwa, połączenie, liczba alokacji                       |
| `DimensionBar`         | Pasek skumulowany według wymiarów: udział każdego klucza w globalnym użyciu +   |
| `AllocationTable`      | Tabela z konsumpcją, sprawiedliwym podziałem, deficit/surplus, flagą pożyczania |
| `BurnRateChart`        | Wykres liniowy współczynnika spalania EMA (leniwy Recharts przez `dynamic()`)   |
| `EditAllocationsModal` | Edytuj wagi alokacji, limity i zasady dla puli                                  |
| `BorrowModeField`      | Selektor trybu wypożyczenia (`saturation` lub `consent`) w kreatorze            |
| `LendingBadge`         | Odznaka tylko do odczytu na kluczu, który wypożycza, tylko w pulach `consent`   |

Plakietka pożyczkowa pokazuje procent i, jeśli jest ustawiony, termin w UTC z nazwą strefy. Ocenia termin na podstawie migawki użycia. Wygasły lub nieczytelny termin jest wyświetlany jako `lending expired`.

Haki strony:

- `usePools` — pobiera `GET /api/quota/pools` co 30 sekund.
- `usePoolUsage` — pobiera `GET /api/quota/pools/[id]/usage` na żądanie.
- `useLocalStoragePoolMigration` — uruchamia się raz na górze w celu migracji starszych danych LS.

Krok kluczy kreatora puli zawiera pole `Show usage by member to key holders`. Ustawia opcję `memberBreakdown` puli (zobacz [Użycie elementu](#member-usage) ). Poniżej kreator ostrzega, że ktoś, kto wie, jakiego klucza użyto, może dopasować pasek do tego klucza. Gdy to pole jest zaznaczone, informacja o tym pojawia się, gdy w kroku znajduje się mniej niż trzy lub więcej niż 20 kluczy, ponieważ paski pozostają wtedy ukryte. Zlicza klucze w kroku i nie jest w stanie określić, który z nich może wysyłać żądania.

### `/dashboard/costs/quota-share/plans` — Konfiguracja planu dostawcy

- `ProviderPlanConfigClient.tsx`: menu rozwijane umożliwiające wybór dostawcy, przeglądanie ustalonego planu (automatycznie z katalogu lub ręczne nadpisanie) i edytowanie wymiarów.
- Zmiany zapisz do `PUT /api/quota/plans/[connectionId]`.
- Usunięcie powoduje powrót do katalogu lub pustego planu.

---

## Limit samoobsługi API (opcja)

`GET /api/v1/me/quota/{provider}` (również obsługiwany w `/v1/me/quota/{provider}`) pozwala posiadaczowi klucza API odczytać za pomocą własnego klucza, jaka część współdzielonej subskrypcji należy do niego i co go blokuje. Trasa to cienka skorupa nad `src/server/selfService/quotaHandler.ts`; widok jest budowany przez `src/lib/quota/selfView.ts`, a jego kontraktem odpowiedzi jest `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` w `docs/openapi.yaml`).

### Włączanie i uwierzytelnianie

- Flaga funkcji `QUOTA_SELF_PANEL`, domyślna `false`. Gdy jest wyłączona, żądanie docierające do trasy otrzymuje kod 404. W przypadku `REQUIRE_API_KEY=true` polityka API klienta odrzuca brakujący lub nieprawidłowy klucz z kodem 401 przed uruchomieniem trasy, niezależnie od flagi. Żądanie bez klucza, ale z zalogowaną sesją pulpitu nawigacyjnego, przechodzi tę zasadę i otrzymuje własną odpowiedź trasy. Flaga jest rozpoznawana jak każda inna flaga (nadpisanie pulpitu nawigacyjnego lub REST, a następnie zmienna środowiskowa o tej samej nazwie); zobacz [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Nazwa wyświetlana każdej puli i etykieta każdego harmonogramu są zwracane posiadaczom kluczy puli dokładnie tak, jak zapisał je administrator. Przed włączeniem flagi sprawdź, czy są one przystosowane do odczytania przez posiadaczy kluczy.
- Klucz odczytywany jest tylko z nagłówków: `Authorization: Bearer <key>` lub `x-api-key: <key>`. Gdy oba zostaną wysłane, używany jest pierwszy, który sprawdza poprawność. Klucz w ciągu zapytania lub plik cookie jest ignorowany. Klucz środowiskowy serwera został odrzucony (401).
- Klucz wymaga zakresu `self:usage` (403 bez niego).
- Segment dostawcy jest przycinany, pisany małymi literami i sprawdzany względem `^[a-z0-9][a-z0-9._-]{0,63}$` (w przeciwnym razie 400), a następnie rozpoznawany przez rejestr dostawców, więc alias taki jak `cc` odczytuje pule `claude`. `claude` i `anthropic` czytają te same pule.

### Co pokazuje każda widoczność

| Widoczność    | Wymaga                                                                         | Pola                                                                                                                                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Udział własny | `self:usage`                                                                   | `pools[]` (ref, nazwa, dostawca, polityka, waga, limit), `dimensions[].yourShare`, `accounts[]` z `yourShare` (w oknie `percent` bez `attributed` i `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                        |
| Poziom konta  | `self:usage` + `self:account-quota` i dostawca w kluczu `sharedQuotaProviders` | dodaje `dimensions[].total`, `accounts[].dimensions[].account` i `accounts[].modelWindows`, `attributed` i `external` do `yourShare` okna `percent` i `members` do puli z włączonym użyciem członków (patrz [Użycie członków](#member-usage) ) |

- `sharedQuotaProviders` to ustawienie dla każdego klucza (`PUT /api/keys/[id]/self-service`): `null`, ustawienie domyślne, oznacza każdego dostawcę, do którego dociera klucz; `[]` oznacza brak. `accountVisible` każdej puli informuje, która widoczność została do niej zastosowana.
- Paski kont i okna modeli wyświetlane są tylko dla rachunków, z których połączenia może korzystać klucz. Gdy klucz ma listę dozwolonych połączeń, konto poza nim zachowuje wpis `Account N` bez `account` i `modelWindows`. Pusta lista oznacza brak ograniczeń, jak w przypadku `/v1/me/status`. Suma puli (`dimensions[].total`) nie zależy od tej listy.
- Dwie cyfry pokazane z samym `self:usage` pochodzą z użycia innych kluczy. `exhausted` budżetu harmonogramu odzwierciedla wykorzystanie każdego klucza w ramach tego harmonogramu. W puli, której wszystkie wagi wynoszą zero, kluczem `weight` jest `100 / number of members`. Obydwa są tym, co egzekwowanie dotyczy klucza.
- Pula jest identyfikowana tylko przez `ref`, nieprzezroczystą wartość powiązaną z kluczem wywołującym. Jego nazwa wyświetlana (`name`) jest dołączona w formie zapisanej przez administratora. `ref` pochodzi z klucza i puli z tajnym kluczem API serwera (`API_KEY_SECRET`). Klientom nie wolno tego utrwalać: zmienia się, jeśli ten sekret zostanie obrócony.
- Konta są wymienione jako `Account 1`, `Account 2`,… w kolejności puli. Nie jest zwracany żaden identyfikator puli, identyfikator połączenia, adres e-mail konta ani nazwa konta, a odpowiedź przechodzi przez schemat kontraktu, który pomija dowolne pole poza nim.
- Jednostki policzalne (`requests`, `tokens`, `usd`) są raportowane jako segment puli, który wymusza bramka kwotowa: `limit` = plan limit kont × w puli, `fairShare` = waga / 100 × `limit` (równy podział, gdy każda waga wynosi 0), `consumed` = własny licznik klucza w magazynie kwot, `remaining` = `fairShare` − `consumed`, najniższy poziom 0.
- `blocks.schedules` wyświetla okna harmonogramu klucza (`open`/`closed`, `blackout` lub `outside-window`, `retryAfterSeconds`, piętra rezerwowe i to, czy budżet okna jest wyczerpany); `blocks.modelCaps` podaje limity godzinowe dla poszczególnych modeli wraz ze zużyciem.
- Klucz spoza każdej puli dostawcy otrzymuje 200 z `pools: []`; `availableModels` (identyfikatory `qtSd/`, które klucz widzi w `/v1/models`), `expiresAt` i `apiBaseUrl` są nadal wypełnione.
- `apiBaseUrl` to `OMNIROUTE_PUBLIC_API_BASE_URL`, następnie `OMNIROUTE_PUBLIC_BASE_URL`, w przeciwnym razie `null`. Nigdy nie jest to źródło żądania.

### `status` i `reason`

| `status`      | Oznaczający                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Aktualna lektura.                                                                                                                                                                                                                                                                                                                                                                              |
| `stale`       | Odczyt konta w pamięci podręcznej jest oznaczony jako nieaktualny lub taki, którego resetowanie minęło od czasu odczytu. Numery są zachowane. Jedno okno modelu, którego czas resetowania minął, oznacza całą grupę `modelWindows` `stale`. Dla udziału własnego klucza w oknie `percent` : książka została przeczytana bez wczytywania konta w pamięci podręcznej bramy w celu potwierdzenia. |
| `unavailable` | Żadnego czytania; liczby to `null`, nigdy `0`. `reason` mówi dlaczego.                                                                                                                                                                                                                                                                                                                         |

| `reason`                          | Gdy                                                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Nie można odczytać magazynu kwot lub nie można odczytać ksiąg atrybucji.                                                                    |
| `percent_attribution_unavailable` | Udział klucza w oknie `percent` : nie istnieje jeszcze księga przypisań dla tego konta i okna lub księga nie zawiera listy klucza.          |
| `percent_window_ended`            | Udział klucza w oknie `percent` : książka należy do okna planu, które się zakończyło.                                                       |
| `account_not_used_by_key`         | Własny udział klucza w oknie `percent` : połączenie konta znajduje się poza dozwolonymi połączeniami klucza. Jego książka nie jest czytana. |
| `window_not_reported`             | Pamięć podręczna limitów dostawcy nie zawiera odczytów dla tego okna planu.                                                                 |
| `connection_lookup_failed`        | Nie można odczytać połączenia konta.                                                                                                        |
| `not_supported`                   | OmniRoute nie może odczytać limitów użytkowania dostawcy konta.                                                                             |
| `fetch_failed`                    | Nie można było odczytać odczytu z pamięci podręcznej i odświeżenie limitów dostawcy nie powiodło się.                                       |
| `not_available`                   | Odczyt nie zawiera okien użytkowania lub na koncie nie ma żadnych odczytów.                                                                 |

Gdy nie można odczytać magazynu kwot, pola `blocks` zabezpieczone przez magazyn ( `exhausted` budżetu harmonogramu, `consumed` i `reached` limitu modelu) również są `null`.

### Zgoda na pożyczkę

`PATCH /api/v1/me/quota/{provider}` rejestruje własną zgodę klucza wywołującego dla jednej puli. Używa flagi, nagłówków i reguł dostawcy `GET`. Zakres `self:usage` autoryzuje ten jeden zapis, chociaż jego nazwa jest czytana tylko do odczytu.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` to `ref` zwracane przez `GET` dla tej puli.
- `lendingPercent` jest liczbą całkowitą od 0 do 100. Wartość 0 kasuje zgodę i jej termin. Ciało z `lendingPercent` 0 jest akceptowane w obu modach.
- `lendingUntil` jest opcjonalne: milisekundy epoki lub `null` w przypadku braku terminu. Musi być w przyszłości i maksymalnie 8640000000000000. Wartość poniżej 100000000000 jest odczytywana jako sekundy i jest odrzucana.
- Każde inne pole jest odrzucane. Treść dłuższa niż 4096 bajtów jest odrzucana. Odczyt zatrzymuje się na tym rozmiarze, więc dłuższy korpus nigdy nie jest trzymany w całości.

Kontrole przebiegają w kolejności podanej w tabeli. Każda odmowa wykorzystuje standardową treść błędu ze stałym komunikatem. Odmowa jednego z tych czeków nic nie wpisuje.

| Status | Wiadomość                                                                                          | Gdy                                                                        |
| ------ | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 404    | `Not found`                                                                                        | Flaga `QUOTA_SELF_PANEL` jest wyłączona.                                   |
| 401    | `Valid API key required`                                                                           | Brakuje klucza, jest on nieprawidłowy lub jest kluczem środowiska serwera. |
| 403    | `API key lacks the self:usage scope`                                                               | W kluczu brakuje `self:usage`.                                             |
| 400    | `Invalid provider`                                                                                 | Segment dostawcy jest nieprawidłowy.                                       |
| 429    | `Too many lending changes. Retry later.`                                                           | Klucz przekroczył swój limit. Odpowiedź niesie `Retry-After`.              |
| 400    | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Treść nie jest JSON, jest za długa lub nie pasuje do schematu.             |
| 400    | `lendingUntil must be a Unix time in milliseconds`                                                 | Termin liczy się jako sekundy.                                             |
| 400    | `lendingUntil must be in the future`                                                               | Termin upływa w momencie złożenia wniosku lub wcześniej.                   |
| 404    | `Pool not found`                                                                                   | `ref` nie określa puli tego klucza dla tego dostawcy.                      |
| 403    | `Lending is not enabled for this pool`                                                             | Pula jest w trybie `saturation`, a `lendingPercent` jest powyżej 0.        |
| 500    | `Failed to build quota view`                                                                       | Jakakolwiek inna awaria. Jego przyczyna jest rejestrowana na serwerze.     |

Limit wynosi 20 żądań na 60 sekund dla każdego klucza. Liczy się każde żądanie, które przejdzie weryfikację dostawcy, nawet to odrzucone później lub takie, które niczego nie zmienia. Ma swój własny licznik, oprócz limitu liczby żądań klucza.

Żądanie zmieniające przechowywaną zgodę zapisuje jeden rekord audytu `quota.pool.lending.updated`. Nazywa klucz starymi i nowymi wartościami. Ten sam organ wysłany dwukrotnie, raz pisze i raz audytuje. Odpowiedź to 200 z pełnym widokiem `GET`, zbudowanym po zapisie.

Widok `GET` raportuje udzielanie kredytów w następujący sposób:

- Każda pula zawiera `borrowMode` (`saturation` lub `consent`) oraz własne klucze `lendingPercent` i `lendingUntil`.
- `lendingActive` to `true` tylko w puli `consent`, z wartością procentową powyżej 0 i nieosiągniętym terminem.
- W puli `consent` każde przeliczalne `dimensions[].yourShare` zawiera `borrowAvailable`. To jest to, czego klucz może teraz używać powyżej swojego udziału, pożyczonego przez inne klucze.
- `borrowAvailable` korzysta ze wzoru bramki. Czyta co drugi klucz, także wtedy, gdy klucz znajduje się pod jego udziałem. W przypadku klucza `hard` oznacza to jeden dodatkowy odczyt na inny klucz i przeliczalny wymiar, równolegle.
- `borrowAvailable` to `null` dla klucza `soft` lub `burst` i `null`, gdy odczyt się nie powiedzie.
- `borrowAvailable` to jedna cyfra dla wszystkich pozostałych kluczy razem. W puli dwóch kluczy jest to figurka drugiego klucza.
- `borrowAvailable` nie jest jeszcze raportowana dla okien `percent` ani w `accounts[]`.
- W puli `saturation` widok raportuje zapisaną zgodę z `lendingActive: false` i bez `borrowAvailable`.

### Błędy

Każda odpowiedź na tej drodze, sukces czy błąd, niesie ze sobą `Cache-Control: no-store`. Odmowa, która ma miejsce przed uruchomieniem trasy, nie powoduje jej przeniesienia, na przykład 401 polityki API klienta lub 403 filtra IP. Błędy trasy korzystają ze standardowej treści błędu ze stałym komunikatem: 400 (nieprawidłowy dostawca), 401 (brak lub nieprawidłowy klucz), 403 (brak `self:usage`), 404 (flaga wyłączona) i 500 (`Failed to build quota view`). 500 obejmuje wszelkie niepowodzenia, gdy żądanie dotrze do trasy, łącznie z samym wyszukiwaniem klucza; jego przyczyna jest rejestrowana na serwerze i nigdy nie jest zwracana. Błędy `PATCH` są wymienione w [Zgodzie użyczenia](#lending-consent).

### Ograniczenia

- `remaining` to część sprawiedliwego udziału klucza, której nie wykorzystał. To nie jest gwarancja. Klucz może zostać podany dalej, dopóki przy basenie jest wolne miejsce. Gdy suma puli osiągnie `limit`, każdy klucz puli zostanie odrzucony, niezależnie od jego własnego `remaining`, a klucz bez `self:account-quota` nie będzie mógł zobaczyć tej sumy.
- `remaining` nie uwzględnia bezwzględnego `cap` alokacji. Egzekucja odmawia wydania klucza, gdy jego własne zużycie w oknie jednostki cap osiągnie wartość capa.
- Pasek na poziomie konta pochodzi z pamięci podręcznej limitów dostawcy i może opóźnić wydanie decyzji o wyegzekwowaniu o kilka minut. Odczyt, którego czas resetowania minął, jest raportowany jako `stale`.
- Okna poszczególnych modeli (`modelWindows`) są raportowane tylko w przypadku dostawców, którzy mają mapowanie okien planu: obecnie Claude i Codex. W przypadku innych dostawców `modelWindows` jest nadal obecny, gdy wyświetlane są dane konta, z pustą listą `windows`.
- Udział własny klucza w oknie `percent` jest wartością szacunkową. Pochodzi z księgi atrybucji i zawiera wszystkie ograniczenia wymienione w sekcji „Wymiary procentowe: przypisanie według klucza” powyżej.
- `consumed` to liczba, którą egzekwowanie porównuje z sprawiedliwym udziałem. To jest dokładnie `attributed` plus `external`. `attributed` to część, w której książka podaje klucz do kierowanych przez nią tokenów. `external` to część klucza używana na koncie, której nie uwzględniają klucze puli.
- Obie części są wysyłane tylko wtedy, gdy `accountVisible` puli ma wartość true: klucz ma `self:account-quota`, a dostawca znajduje się w jego `sharedQuotaProviders`. Klucz bez niego otrzymuje sam `consumed`, z tymi samymi `status` i `reason`.
- Dzięki obu częściom i własnej masie uchwyt może obliczyć wykorzystanie poza basenem, co obciąża klucze basenu. Posiadacz z zakresem konta widzi już sumę konta.
- Klucz, który nie kierował niczego w oknie, może nadal odczytać swój ładunek zewnętrzny z `consumed`, ponieważ jego przypisana część wynosi wtedy 0.
- Na przykład książka otwiera się o wartości 0, a klucze A i B mają wagę 50 każdy. Klucz A kieruje 900 000 tokenów, a klucz B 100 000. Konto osiąga wtedy 60% limitu 100. Następnie `attributed` wynosi 54 dla klucza A i 6 dla klucza B, a `external` wynosi 0 dla obu.
- Widok czyta księgę i nigdy nie zapisuje jej stanu. Nie otwiera książki i nigdy nie prosi dostawcy o przeczytanie. W przypadku sklepu Redis odczyt usuwa w tle zastąpione pola wersji, tak jak robią to odczyty bramki.
- Udział jest `ok` tylko wtedy, gdy pamięć podręczna bramy przechowuje odczyt konta. Bez niego jest to `stale`, więc w puli bez niedawnego żądania wyświetla się jako prawdopodobnie nieaktualny.
- Dopóki żądanie nie przejdzie przez pulę, udział jest niedostępny. To żądanie otwiera księgę, a stan konta w tym momencie liczy się jako wykorzystanie dokonane poza pulą.
- W puli obejmującej kilka kont każdy wpis konta wykorzystuje własną księgę tego konta i limit jednego konta. Egzekucja skaluje obie strony według liczby rachunków, więc proporcja jest taka sama.
- Okna poszczególnych modeli nie mają udziału w kluczu. Książka nie zawiera danych dotyczących poszczególnych modeli.
- Rezerwowe piętra harmonogramu nie są oceniane przez widok: harmonogram może być wyświetlany jako `open` gdy żądanie zostanie odrzucone z powodu `schedule-reserve`.
- Gdy dwie pule tego samego klucza korzystają z połączenia, wymuszanie stosuje jedną z nich, a widok wyświetla oba.
- Nie ma limitu nieudanych prób klucza na adres: za odwrotnym proxy osoby wywołujące mogą współdzielić jeden adres (zależy to od tego, czy przekazywane adresy klientów są zaufane), więc blokada może odmówić trasy każdemu posiadaczowi klucza. W przypadku `REQUIRE_API_KEY=true` polityka API klienta odrzuca nieprawidłowy klucz przed uruchomieniem trasy, z treścią tej zasady 401 zamiast tej trasy.

### Wykorzystanie członków

Administrator może pozwolić posiadaczom kluczy zobaczyć, jak wykorzystanie okna rozkłada się pomiędzy członkami puli. Ta opcja to `memberBreakdown` puli, domyślnie wyłączona. Ustawia się to w kreatorze puli lub za pomocą `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` i `GET /api/quota/pools/{id}` zgłaszają to.

Wymiar widoku niesie `members` tylko wtedy, gdy wszystkie z nich spełniają:

- opcja basenu jest włączona
- w puli znajduje się maksymalnie 20 przydzielonych kluczy, a co najmniej trzy z nich mogą wysyłać żądania: aktywne, nieodwołane, niezablokowane i nie przeterminowane
- `accountVisible` puli jest prawdziwe: klucz ma `self:account-quota`, a dostawca znajduje się w jego `sharedQuotaProviders`
- w oknie `percent` połączenie konta jest tym, z którego może korzystać klucz
- Odczytany został udział klucza w tym oknie: jego `status` nie jest `unavailable`

W przeciwnym razie `members` jest nieobecna. To nigdy nie jest pusta lista.

- Każdy kawałek to `{ slot, consumed, isYou }`. Schemat odpowiedzi odrzuca wszelkie inne właściwości wycinka oraz listę zawierającą więcej niż 20 wycinków. Plasterki są wymienione w kolejności gniazd.
- Na każdy przydzielony klucz przypada jeden kawałek, włączając klucz, który nie może już wysyłać żądań. Członek bez użycia pokazuje prawdziwe zero.
- Szczelina 1 jest zawsze kluczem pytającym, przy czym `isYou` ma wartość true. Pozostałe numery slotów to rangi skrótu z kluczem. Jest kluczowany za pomocą `API_KEY_SECRET` i obejmuje pulę, klucz pytający i członka.
- Zatem liczby nie pokrywają się pomiędzy posiadaczami. Dla jednego posiadacza pozostają takie same pomiędzy wizytami. Mogą się zmienić, gdy klucz dołączy do puli lub ją opuści, lub gdy ten sekret zostanie obrócony.
- W przeliczalnym oknie kawałek jest licznikiem członka w magazynie kwot, tym samym licznikiem, co jego własny `consumed`.
- W oknie `percent` wycinek to część `attributed` członka, z tej samej książki czytanej jako udział własny klucza. Wykorzystanie poza pulą nigdy nie jest dzielone na kawałki. Ładunek ten jest podzielony według wagi, więc plasterki, które go niosły, pokazywałyby wagę.
- Każdy widok odczytuje równolegle jedną wartość na każdy inny element i policzalne okno. W oknie `percent` przeczytanie wycinków nie kosztuje więcej niż przeczytanie własnej książki udziału. Gdy nie można odczytać jednej wartości, w tym oknie nie ma `members`, a udział klucza pozostaje.
- Opcja i liczba możliwych do użycia kluczy są odczytywane raz na pulę i tylko dla klucza, który może widzieć dane konta. Nieudany odczyt opcji lub liczby użytecznych kluczy powoduje wyłączenie słupków dla tej puli. Serwer rejestruje ostrzeżenie i tworzona jest reszta widoku.

Paski nie mają żadnych nazw ani identyfikatorów. Nadal opowiadają posiadaczowi kluczy różne rzeczy o pozostałych członkach:

- Posiadacze nadal mogą dopasowywać plasterki według ich wartości.
- Stabilna numeracja pozwala posiadaczowi podążać za jednym członkiem w czasie.
- Liczba wycinków pokazuje, ile kluczy jest przydzielonych w puli.
- W puli trzech kluczy ktoś, kto wie, jakiego klucza użyto, może powiedzieć, jakiego klucza użyto jako ostatniego.
- Kiedy pula spadnie poniżej trzech możliwych do wykorzystania kluczy, paski znikają. Z wcześniejszych opinii nadal wynika, czego używał każdy członek.
- W przeliczalnym oknie suma puli pomniejszona o wycinki może pokazywać użycie kluczy, które nie są już przydzielone.
- Członek, który pokazuje zero na jednym koncie i używa na innym, może pokazać, który członek korzysta z którego konta.
- W przeliczalnej puli objętej polityką `hard` kawałek, który przestaje rosnąć przy sprawiedliwym udziale członka, wskazuje na wagę tego członka.

### Seria zastosowań (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (również podawane w `/v1/me/usage`) zwraca użycie i koszt własnych żądań klucza wywołującego: sumy, jeden wpis na dzień UTC, na dzień i model, na model i na dostawcę. Udostępnia flagę, reguły uwierzytelniania, zakres `self:usage`, `Cache-Control: no-store` i zachowanie związane z błędami powyższej trasy kwotowej. Klucz jest sprawdzany przed `range`. Błędy to 400 (`Invalid range`), 401, 403, 404 i 500 (`Failed to build usage`).

- `range` to jedna z `1d`, `7d`, `30d` (domyślnie) lub `90d`. Każda inna wartość, pusta wartość lub powtarzający się parametr to 400. Zbiór zatrzymuje się na `90d`, aby ograniczyć koszt połączenia. Widok odczytuje tylko surową historię użytkowania, nigdy codzienne podsumowania, które nie zawierają klucza.
- Wiersze są wybierane na podstawie identyfikatora klucza wywołującego. Kolumna z nazwą klucza nigdy nie jest dopasowywana, a wiersze zarejestrowane bez identyfikatora klucza nigdy nie są liczone.
- Budowanie serii uruchamia pięć zgrupowanych zapytań dotyczących wierszy klucza w oknie. Zbudowana seria jest ponownie używana przez 60 sekund na klucz i zakres, a ponownie użyte wywołanie nie jest uruchamiane. Jego `generatedAt` określa jego wiek.
- Okno kończy się po zbudowaniu serii. Wiersz wybity później, na przykład przez przechylenie zegara, nie jest liczony.
- `coverage.retentionDays` to ustawienie przechowywania surowej historii użytkowania dokonane przez operatora (`retention.usageHistory` w ustawieniach bazy danych). `coverage.truncatedByRetention` ma wartość true, gdy żądany zakres jest dłuższy niż to ustawienie. Porównuje dwie liczby i nie sprawdza, czy rzeczywiście brakuje wierszy.
- Dostawca jest zwracany zgodnie z zapisem dla własnych żądań klucza. Model to zarejestrowana nazwa po ostatnim `/` i wiersze są według niej grupowane. Żądanie kombi, którego każdy cel został odrzucony, jest rejestrowane z etykietą routingu jako dostawca (nazwa kombinacji, `auto` lub `combo`) i ciągiem modelu wysłanym przez klienta. Inne odrzucone żądania, na przykład dotyczące otwartego wyłącznika, przestoju modelu lub pominięcia przydziału, zatrzymują docelowego dostawcę i model.
- Oprócz liczby i kosztów odpowiedź niesie ze sobą średnie opóźnienia, wskaźniki powodzenia oraz czas pierwszego i ostatniego żądania.
- `byModel` wyświetla listę 50 par dostawców i modeli z największą liczbą żądań. W przypadku większej liczby par jego wpisy nie sumują się do `summary`, a `summary.uniqueModels` zlicza każdą zarejestrowaną pisownię modelu. `byModelTruncated` jest wówczas prawdą, a model, którego pary znajdują się po obu stronach cięcia, pokazuje częściowe sumy.
- Zgłoszono dwa koszty. `costUsd` to naliczony koszt, jak pokazują analizy użytkowania. Dostawcy subskrypcji ryczałtowych, tacy jak plan Claude Code, liczą tam 0 USD. `listPriceUsd` oznacza to samo użycie, wycenione według ceny katalogowej, łącznie z subskrypcjami. Żądanie, którego model nie ma wiersza cenowego, zlicza przechowywany koszt: koszt zgłoszony przez dostawcę lub obliczony podczas rejestrowania żądania. Tylko żądanie bez żadnego z nich liczy 0, bez znacznika, więc suma może być częściowa.
- Kontrakt odpowiedzi to `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` w `docs/openapi.yaml`).

### Strona samoobsługowa

Gdy `QUOTA_SELF_PANEL` jest włączona, `/quota/{provider}` jest stroną publiczną. Posiadacz klucza wpisuje tam klucz API i widzi pulę tego klucza dla dostawcy. W każdej puli znajduje się jedna karta w każdym oknie puli, z puli do wykorzystania dla wszystkich i własnego udziału klucza. Każde konto puli posiada własne karty, z przeznaczeniem do konta i udziałem klucza. Użycie konta pojawia się tylko wtedy, gdy klucz może zobaczyć dane konta. Strona zawiera także listę limitów każdego konta dla poszczególnych modeli oraz wykorzystanie klucza. Gdy harmonogram blokuje klucz w danej chwili, pojawia się powiadomienie. Karta zawiera listę wszystkich nasadek klucza według modelu i wskazuje te, które zostały osiągnięte. `{provider}` to identyfikator dostawcy lub jego alias (`/quota/claude`, `/quota/cc`). Nieznany dostawca i każda ścieżka `/quota/*`, gdy flaga jest wyłączona, odpowiedz 404. Pule w niestandardowym węźle zgodnym z OpenAI lub Anthropic nie mają strony. API nadal za nich odpowiada.

Strona nie ma sesji. Klucz jest wysyłany tylko w nagłówku `Authorization` `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` i `GET /api/v1/me/usage`, nigdy w URL. Klucz akceptowany przez serwer jest przechowywany w zakładce `sessionStorage`. Opcja „Zapamiętaj na tym urządzeniu” powoduje, że jest on przechowywany w `localStorage`, a opcja „Zapomnij klucz” usuwa go z obu. Klucz odrzucony przez serwer jest usuwany z magazynu.

Pula w trybie `consent` pokazuje kartę pożyczkową. Tam posiadacz klucza ustawia cały procent od 0 do 100 niewykorzystanego udziału klucza, który ma pożyczyć. Posiadacz wybiera także czas trwania zgody: do momentu wyłączenia, 1 godzinę, 8 godzin, 24 godziny, 7 dni lub 30 dni. Czas trwania liczy się od momentu zapisania. Póki termin obowiązuje, posiadacz może go zamiast tego zachować. Jeśli ten termin upłynie przed zapisaniem, karta nie wysyła niczego i prosi o inny wybór. Przy 0% żaden termin nie jest wysyłany. Na karcie widoczny jest zapisany termin wraz z nazwą strefy czasowej. Zgoda, której termin upłynął, jest oznaczona jako zakończona.

W przypadku klucza `hard` karta zawiera także listę, dla każdego okna puli, jakie inne klucze nadają mu w danej chwili. Każdy rząd to jedna cyfra dla wszystkich pozostałych kluczy razem. W puli dwóch kluczy jest to figurka drugiego klucza. Wartość, której widok nie raportuje, jest odczytywana jako niedostępna, a nie jako zero. W przypadku klucza `soft` lub `burst` na karcie jest napisane, że żadna liczba nie ma zastosowania.

Pula w trybie `saturation`, której klucz przechowuje procent powyżej 0, pokazuje tylko wypłatę. Mówi, że przechowywany procent nie ma tam żadnego wpływu. Przycisk Wypłata wysyła 0 bez terminu. Pula w trybie `saturation` z zapisanym 0 nie pokazuje żadnej karty kredytowej. Po zapisaniu karta, której zwrócony widok nie jest już potrzebny, pozostaje ze swoim komunikatem do czasu ponownej zmiany widoku strony.

Nic nie zostanie zapisane, dopóki posiadacz nie naciśnie przycisku Zapisz lub Wycofaj. Każde naciśnięcie wysyła jedno żądanie `PATCH /api/v1/me/quota/{provider}`, a drugie naciśnięcie nie wysyła niczego, podczas gdy pierwsze jest w toku. Ciało przenosi nieprzezroczysty `ref` puli z widoku, procentu i terminu. Odpowiedzią jest przebudowany widok przydziałów, który strona pokazuje bez drugiego odczytu. Gdy dwa zapisy nakładają się na siebie, strona odczytuje limit raz po ostatniej odpowiedzi. Strona nie przechowuje zgody w pamięci przeglądarki.

Odmowa zmiany jest wyjaśniona na karcie poprzez tekst wybrany ze statusu HTTP. Treść błędu nie została odczytana. Komunikat 401 informuje, że klucz nie został zaakceptowany i ponownie ładuje limit. Wartość 403 oznacza, że pula nie przyjmuje zmian w zakresie kredytów, a wartość 404 oznacza, że puli już nie ma. Obydwa oferują przycisk, który ponownie ładuje limit. Odpowiedź 400 lub inna 4xx prosi posiadacza o sprawdzenie wartości procentowej i terminu. 429 prosi posiadacza o czekanie, z sekundami `Retry-After` gdy daje mu odpowiedź. Odpowiedź 5xx, 408 lub awaria sieci oznacza, że zmiana mogła nie zostać zapisana i zachowuje wpisane wartości. Odpowiedź poza umową powoduje ponowne załadowanie limitu. Nieudane zapisanie samo w sobie nie powoduje usunięcia klucza. W przypadku odmowy ponownego załadowania, strona usuwa klucz, tak jak w przypadku każdej odmowy odczytu.

Po zaakceptowaniu klucza na stronie wyświetla się także karta „Skonfiguruj narzędzia” z trzema zakładkami. „Kod Claude ” daje blok `env` dla `~/.claude/settings.json`. „Shell” daje te same zmienne, co linie `export`. „Claude Desktop” podaje wartości okna wnioskowania innej firmy. Modele to modele podziału kwot, które klucz może wymagać dla tego dostawcy. Jeśli do klucza nie jest dołączona taka lista, blok zamiast tego włącza wykrywanie modelu bramy. Adres bramy jest publicznym źródłem API raportowanym przez serwer (`OMNIROUTE_PUBLIC_API_BASE_URL`, następnie `OMNIROUTE_PUBLIC_BASE_URL`). Jeśli żadne z nich nie jest ustawione, karta wyświetla symbol zastępczy i informuje posiadacza, aby zwrócił się do administratora. Klucz jest wyświetlany jako symbol zastępczy. Opcja „Dołącz mój klucz” powoduje umieszczenie całego klucza w tekście wyświetlanym na ekranie oraz w treści kopiowanej przez przycisk kopiowania. Trwa to do momentu wyczyszczenia skrzynki, zapomnienia lub wymiany klucza lub opuszczenia strony. Karta nie wysyła żadnych żądań ani nie umożliwia pobierania plików.

Odczyt znaków API `stale` jest pokazany jako prawdopodobnie nieaktualny. Odczyt oznaczany przez `unavailable` jest pokazywany wraz z przyczyną, nigdy jako zero.

W przypadku planów procentowych strona pobiera własny udział w kluczu, gdy API to zgłosi. Mówi, że liczba jest szacunkowa i nazywa jej dwie części. Limity dla poszczególnych modeli pokazują tylko konto.

Kiedy okno zawiera `members`, jego karta pokazuje również pasek z jednym segmentem na element, w kolejności miejsc. Segment klawisza pytającego wykorzystuje kolor akcentujący. Pozostałe segmenty zmieniają kolory wykresu motywu. Legenda tekstowa zawiera listę wszystkich segmentów wraz z ich wartościami, zatem nic nie zależy od koloru. Segmenty są oznaczone jako `You` lub `Member N`, gdzie N to szczelina.

### Dedykowany port dla strony

`QUOTA_PANEL_PORT` otwiera drugiego słuchacza, który obsługuje tylko stronę samoobsługową. Jest wyłączone, chyba że zmienna jest ustawiona. `QUOTA_PANEL_HOST` jest adresem powiązania i domyślnie jest to `127.0.0.1`.

Odbiornik przekazuje te ścieżki do głównego portu i odpowiada 404 dla każdej innej ścieżki:

| Ścieżka                                                                  | Służy                                |
| ------------------------------------------------------------------------ | ------------------------------------ |
| `/quota/{provider}`                                                      | Strona                               |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Widok limitu, który czyta strona     |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Seria zastosowań, którą czyta strona |
| `/_next/static/`                                                         | Skrypty, style i czcionki kompilacji |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Ikony                                |

`GET` i `HEAD` są przekazywane bez ciała. Przekazywane jest również jedno żądanie z treścią: `PATCH` ścieżki widoku przydziału, którą strona wysyła w celu zapisania wyboru pożyczki. Każda inna metoda odpowiada na 404, z wyjątkiem żądania CONNECT, którego połączenie zostaje zamknięte bez odpowiedzi. Każde inne żądanie, które deklaruje treść, odpowiada na 404, a jego połączenie zostaje zamknięte. Żądania aktualizacji są odrzucane, a ich połączenie zostaje zamknięte. Ścieżka z segmentem kropki lub znacznikiem fragmentu jest odrzucana, tak jak w porcie API. Podobnie jest z celem żądania ze znakiem poza drukowalnym ASCII. Parser HTTP odpowiada na surowy znak kontrolny w celu 400, przed własnym sprawdzeniem tego portu. Nagłówki żądań, które framework rezerwuje do własnego użytku, nie są przekazywane: nazwy zaczynające się od `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` lub `x-next-` oraz nazwy `x-matched-path` i `next-resume`. Żądanie jest przekazywane bez nich. Przez ten port nie można uzyskać dostępu do pulpitu nawigacyjnego, strony logowania, API zarządzania i tras wnioskowania.

`PATCH` musi przenosić `Content-Type: application/json` bez parametrów lub tylko z `charset=utf-8`. Musi zawierać jeden `Content-Length` od 1 do 4096, zapisany zwykłymi cyframi i bez `Transfer-Encoding`. `PATCH`, który łamie jedną z tych reguł, odpowiada na 404. Na niektóre zniekształcone długości, takie jak długość ze znakiem lub powtórzenie, parser HTTP odpowiada 400 przed własnym sprawdzeniem tego portu. Port odczytuje zadeklarowane bajty przed połączeniem się z portem głównym i czeka na nie maksymalnie 5 sekund. Ciało, które do tego czasu nie jest kompletne, odpowiada na numer 404 i jego połączenie zostaje zamknięte. W takim przypadku nic nie dotrze do głównego portu, ani gdy klient wyjdzie pierwszy. Port przekazuje dokładnie zadeklarowane bajty, z tym samym `Content-Length`. Bajty po nich są odczytywane jako kolejne żądanie połączenia. Odwrotne proxy TLS z przodu musi przekazywać `Content-Length` i nie może ponownie dzielić treści żądania. Główny port sprawdza klucz API w nagłówku `Authorization`, tak jak w przypadku `GET`.

Korpus 404 to `{"error":"not_found","message":"Not found."}`. Uszkodzony przekaźnik odpowiada na 502 (`api_bridge_unavailable`) lub 504 (`api_bridge_timeout`) bez pola `detail`.

Słuchacz nie czyta `QUOTA_SELF_PANEL` i nie włącza strony. Gdy flaga jest wyłączona, strona i jej API odpowiadają na porcie głównym 404, a słuchacz przekazuje tę odpowiedź.

Na serwerze deweloperskim (`next dev`) strona nie staje się interaktywna poprzez ten port. Programistyczne gniazdo hot-reload jest żądaniem aktualizacji, a port je odrzuca. Podczas programowania korzystaj z głównego portu.

Port obsługuje zwykłe HTTP, a strona wysyła klucze API. Zachowaj domyślny adres powiązania i umieść przed nim odwrotne proxy z TLS. Adres powiązania inny niż pętla zwrotna rejestruje to powiadomienie:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Element równorzędny pętli zwrotnej, który nie wysyła nagłówka przekazywania, liczy się jako lokalny na porcie głównym. Zatem serwer proxy na tym samym hoście musi wysłać `X-Forwarded-For`. Serwer proxy na adresie prywatnym jest zaufany dla tego nagłówka tylko za pomocą `OMNIROUTE_TRUST_PROXY=private` (lub `lan`). Każdy inny peer jest zgłaszany przez adres jego połączenia, a wysłane przez niego nagłówki przesyłania są odrzucane.

Odbiornik utrzymuje jednocześnie maksymalnie 256 połączeń. Klient ma 10 sekund na wysłanie nagłówków żądania i 30 sekund na wysłanie całego żądania. Bezczynne, utrzymywane połączenie zostanie zamknięte po około 5 sekundach. Połączenie, które nie jest aktywne przez 60 sekund, zostaje zamknięte. Wartości te są stałe. Ustaw także limity połączeń i szybkości na odwrotnym serwerze proxy. Odwrotny serwer proxy z przodu powinien utrzymywać bezczynne połączenia wychodzące przez mniej niż 5 sekund lub nie używać ich ponownie. Przekaźnik do głównego portu wykorzystuje limity czasu upstream portu API (`API_BRIDGE_*`).

Odbiornik uruchamia się również, gdy `API_PORT` nie jest ustawione. `QUOTA_PANEL_PORT` musi być portem od 1 do 65535, zapisanym wyłącznie cyframi. Musi różnić się od portu deski rozdzielczej i portu API. Gdy aktywny serwer WebSocket jest włączony, musi się także różnić od `LIVE_WS_PORT` (domyślnie 20132). Każda inna wartość niczego nie otwiera i rejestruje ostrzeżenie. Ostrzeżenie o odrzuconej wartości nadaje nazwę zmiennej i nie powtarza wartości. Port, który jest już używany, niczego nie otwiera i rejestruje to ostrzeżenie:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Po ustawieniu `OMNIROUTE_BASE_PATH` słuchacz oczekuje każdej ścieżki powyżej pod tym prefiksem. Użyj tego samego `OMNIROUTE_BASE_PATH` w czasie kompilacji i w czasie wykonywania. Zapisz go z ukośnikiem wiodącym i bez ukośnika końcowego, na przykład `/omniroute`. Inny kształt, w tym `/` i `/omniroute/`, powoduje wyłączenie portu z ostrzeżeniem, mimo że kompilacja akceptuje te formularze. To samo dotyczy ścieżki bazowej, której pierwszy segment określa trasę aplikacji: w każdym przypadku `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` lub `connect`.

Ograniczenia:

- `/quota/{provider}/` z ukośnikiem na końcu odpowiada 404 na tym porcie.
- Proces roboczy usługi i manifest aplikacji internetowej nie są obsługiwane na tym porcie.
- Na tym porcie nie jest wyświetlana niestandardowa ikona ulubionych ustawiona na pulpicie nawigacyjnym.
- Ikony nie są wyświetlane, gdy aplikacja działa w ścieżce podstawowej.
- Port mówi po prostu HTTP/1.1.
- Powiązanie, które się nie powiedzie, nie jest ponawiane do czasu ponownego uruchomienia procesu.
- Odbiornik nie ma limitu połączenia ani szybkości na adres klienta.
- Ta sekcja nie obejmuje konfiguracji kontenerów.

---

## Zmienne środowiskowe

| Zmienny                              | Domyślny       | Opis                                                                            |
| ------------------------------------ | -------------- | ------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`       | Sterownik do użycia: `sqlite` lub `redis`                                       |
| `QUOTA_STORE_REDIS_URL`              | _(pusty)_      | Redis URL, np `redis://localhost:6379`                                          |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`          | 0..1; `>= threshold` aktywuje tryb ścisły                                       |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`         | Żetony wyjaśniające co najwyżej jeden punkt procentowego okna planu             |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`          | 0..1; mnożnik dla wyniku kombinacji miękkiej polityki                           |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`           | Kilka dni przed usunięciem GC starych wiader `quota_consumption`                |
| `QUOTA_PANEL_PORT`                   | _(nieoprawny)_ | Dedykowany port dla strony samoobsługowej. Nieustawione oznacza brak słuchacza. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`    | Powiąż adres dla tego portu                                                     |

ustawienia DB (`quotaStore.*`) zastępują env vars.

---

## Rozwiązywanie problemów

### Redis skonfigurowany, ale nie łączy się

Sprawdź, że `ioredis` jest zainstalowany (`npm ls ioredis`) i `QUOTA_STORE_REDIS_URL`
jest osiągalny. Przy błędzie połączenia fabryka wraca do SQLite (log na poziomie
`warn`).

### `peek` zwraca stale / fail-open

Jeśli `peek` rzuci wyjątek, `enforceQuotaShare` traktuje wynik jako „allow” (fail-open).
Sprawdź logi `pino` pod kątem wpisów `quota:enforce` i `quota:factory`, aby znaleźć
przyczynę.

### Dryf licznika consumption

Jeśli rzeczywiste zużycie u providera różni się od liczników — to oczekiwane:
okno przesuwne 2-bucket ma ~1% błędu na granicach okien, a `consume` jest
fire-and-forget po odpowiedzi. Sygnał nasycenia (`saturationSignals.ts`)
odczytuje realną utylizację providera z TTL 30s i odpowiednio koryguje
`globalUsedPercent`.

### Pula pokazuje „no data” dla burn rate

`computeBurnRate` wymaga co najmniej 2 historycznych próbek. Nowe pule bez wcześniejszych
wywołań `consume` pokażą `tokensPerSecond: 0` oraz `timeToExhaustionMs: null`.

---

## Migracja z localStorage

Gdy `/dashboard/costs/quota-share` ładuje się po raz pierwszy, hook `useLocalStoragePoolMigration`
sprawdza:

1. `localStorage.getItem("omniroute:quota-share:pools")` jest niepuste.
2. `GET /api/quota/pools` zwraca `[]` (DB jest pusta).

Jeśli oba warunki są spełnione, wysyła każdą legacy pulę do `POST /api/quota/pools` wsadowo,
a następnie usuwa klucz localStorage. Migracja jest idempotentna: warunek 2 zapobiega
ponownej migracji.

---

## Klasyfikacja strategii wewnętrznej

`quota-share` to strategia routingu **wyłącznie wewnętrzna** (`INTERNAL_ROUTING_STRATEGY_VALUES` w
`src/shared/constants/routingStrategies.ts`). Używana wyłącznie przez systemowo tworzone
combo pul `qtSd/` i celowo wykluczona z `ROUTING_STRATEGY_VALUES`, żeby nigdy nie
pojawiła się jako opcja wybieralna przez użytkownika w UI ani API.

---

## Zasięg testowy

Dwie warstwy zautomatyzowanego pokrycia z silnikiem przydziału:

| Apartament            | Rozkaz                                                                 | Co obejmuje                                                                                                                                                                                        |
| :-------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jednostka (29 testów) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | harmonogram DRR, bramkowanie nasycenia, ograniczenia współbieżności, matematyka fairShare, kolejkowanie zaległości                                                                                 |
| Macierz całkowania    | `npm run test:combo:matrix`                                            | Kompleksowa decyzja o routingu w rzeczywistym potoku combo; DRR fairness + redukcja priorytetów poprzez aktywne szwy (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Matryca integracji działa w CI wraz ze wszystkimi 22 strategiami publicznymi. Zestaw jednostek może działać samodzielnie.

---

## Podsumowanie schematu DB

Trzy tabele dodane przez migracje `078`, `079` i `085`:

- `quota_pools` + `quota_allocations` — definicje puli i przydziały dla poszczególnych kluczy.
- `quota_consumption` — toczne liczniki 2-wiadrowe na `(apiKeyId, dimensionKey)`.
- `provider_plans` — ręczne nadpisanie planu dostawcy (wymiary JSON na connectionId).

Wszystkie tabele dodane poprzez idempotentne migracje `CREATE TABLE IF NOT EXISTS`.

Wyrażenie zgody dodaje trzy kolumny: `quota_allocations.lending_percent` (liczba całkowita, domyślnie 0), `quota_allocations.lending_until` (milisekundy epoki lub `NULL` w przypadku braku terminu) i `quota_pools.borrow_mode` (domyślnie `saturation`). Jego migracja dodaje tylko te kolumny i nie zapisuje istniejącego wiersza.

Księga atrybucji procentowej dodaje `quota_percent_ledger` (jeden wiersz na pulę, konto i okno planu) i `quota_percent_ledger_tokens` (jeden licznik tokenów na pulę, konto i klucz API ). `src/lib/db/quotaPercentLedger.ts` czyta i zapisuje je.
