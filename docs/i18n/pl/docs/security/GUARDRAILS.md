# Guardrails (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Źródło prawdy:** `src/lib/guardrails/`
> **Ostatnia aktualizacja:** 2026-08-29 — v3.8.51 (Pochodzenie transkrypcji Video Bridge jest deklarowane przez dzwoniącego,
> jeszcze nie zweryfikowane przez serwer — wyjaśniono zgodnie z #11661)

Guardrails wymuszają bezpieczeństwo, politykę i transformacje treści na granicy
między OmniRoute a dostawcami upstream. Każdy guardrail może kontrolować (i
opcjonalnie odrzucać, przekształcać lub dodawać adnotacje) ładunki żądań (`preCall`)
oraz odpowiedzi upstream (`postCall`).

System działa w trybie **fail-open**: jeśli guardrail zgłosi błąd podczas wykonywania,
rejestr zapisuje błąd i kontynuuje pracę z następnym guardrailem, zamiast przerywać
żądanie. Blokowanie jest jawną decyzją (`block: true`), nigdy przypadkiem.

## Wbudowane zabezpieczenia

Podczas importu rejestr automatycznie ładuje sześć zabezpieczeń w kolejności priorytetów
(zobacz `registry.ts` → `registerDefaultGuardrails()`):

| Priorytet | Nazwa               | Etap(y)        | Plik                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Niższe wartości priorytetu są wykonywane **jako pierwsze**.

### Most obrazu (`visionBridge.ts`) — Most modalności PR-1

Przechwytuje żądania zawierające obrazy, kierowane do **modeli bez obsługi obrazu**, i albo
przekierowuje całe żądanie do modelu obsługującego obraz, albo zastępuje części
zawierające obrazy opisami tekstowymi wygenerowanymi przez konfigurowalny model
wizyjny przed wywołaniem usługi nadrzędnej. Dzięki temu dostawcy obsługujący wyłącznie tekst
mogą w sposób niewidoczny obsługiwać ładunki multimodalne.

Przebieg:

1. Pomiń, jeśli model docelowy obsługuje już obraz (chyba że znajduje się na
   liście modeli z wymuszonym mostem `isVisionBridgeForcedModel`).
2. Wyodrębnij części zawierające obrazy za pomocą `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), która deleguje zadanie do **ujednoliconego
   detektora multimediów** `detectMediaParts()` w `open-sse/utils/mediaParts.ts` —
   jedynego źródła prawdy współdzielonego z filtrem zgodności combo.
   Wyodrębnianie jest ograniczone listą dozwolonych części najwyższego poziomu o kształtach,
   które `replaceImageParts` może ponownie wstawić (kontrakt wyodrębnianie↔zastępowanie): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` oraz Responses API `input_image`. Zagnieżdżone trafienia i
   kształty zawierające wyłącznie wskaźniki są przeznaczone dla filtra combo i nigdy nie są wyodrębniane.
   Pomiń, jeśli niczego nie znaleziono.
3. Ustal konfigurację środowiska wykonawczego za pomocą `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nowe klucze ustawień `modalityBridge*`
   mają pierwszeństwo; starsze klucze `visionBridge*` pozostają jako **mechanizm awaryjny przez jeden cykl**
   (okno wycofania zmian). Jeśli most jest wyłączony, pomiń przed rozpoczęciem przeglądania multimediów.
4. Selektor trybu (`modalityBridgeVisionMode`, zobacz tabelę poniżej) wybiera
   między przekierowaniem a opisem. Przekierowanie zwraca `modifiedPayload`, w którym zamieniono
   wyłącznie `model`, wraz z metadanymi `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ścieżka opisu: ogranicz liczbę obrazów do `maxImages`, utwórz prompt uwzględniający zadanie,
   sprawdź pamięć podręczną opisów, wywołaj model wizyjny **równolegle**
   (`Promise.allSettled`) i wstaw w miejsce obrazów części tekstowe
   `[Image N]: <description>`. Nieudane tworzenie opisu zwraca `null`, a oryginalna część
   zawierająca obraz zostaje **zachowana** (#4012) — z wyjątkiem ścieżki opisu combo, gdy
   nie udało się utworzyć żadnego opisu; w takim przypadku potwierdzona usługa nadrzędna bez obsługi obrazu otrzymuje
   symbol zastępczy `(unavailable — no vision-capable provider connected)` (#8430).
6. Zwróć `modifiedPayload` wraz z metadanymi (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selektor trybu (`modalityBridgeVisionMode`)

| Tryb       | Domyślny | Zachowanie                                                                                                                                                                                                                                                                                                                                                            |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Starsza heurystyka, bez zmian (#6640/#7204): modele inne niż combo/`auto/` są przekierowywane do najlepszego modelu wizyjnego, chyba że oryginalny model ma już użyteczne dane uwierzytelniające (wtedy tworzony jest opis); cele combo zawsze korzystają z opisu.                                                                                                    |
| `describe` |          | Zawsze twórz opis — blok przekierowania jest całkowicie pomijany; odpowiedzi zawsze udziela model wybrany przez użytkownika.                                                                                                                                                                                                                                          |
| `reroute`  |          | Wymuś przekierowanie: mechanizm zachowania modelu z danymi uwierzytelniającymi jest pomijany. Nadal obowiązuje kontrola danych uwierzytelniających **celu** przekierowania — gdy nie istnieje użyteczny cel wizyjny, żądanie przechodzi do tworzenia opisu, dzięki czemu nieprzetworzone obrazy nigdy nie trafiają do backendu obsługującego wyłącznie tekst (#8430). |

Wymuszone tryby kończą przetwarzanie **przed** uruchomieniem automatycznej heurystyki; zachowanie `auto`
jest identyczne bajt po bajcie z zabezpieczeniem sprzed PR-1.

#### Zakres klucza API (`visionBridgeKeyScope.ts`)

Gdy klucz API wywołującego ogranicza `allowedConnections`, pule limitów
(`allowedQuotas`) lub modele (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), most wybiera
wyłącznie modele przekierowania i opisu, których klucz może używać, na połączeniach, z których
klucz może korzystać. Wywołanie opisu zawsze przechodzi następnie przez pętlę zwrotną OmniRoute
z nagłówkiem `x-omniroute-self-loop-key-id`, dzięki czemu odbierające żądanie czatu
ponownie egzekwuje zasady połączeń i modeli dla danego klucza. `enforceApiKeyPolicy()`
honoruje ten nagłówek wyłącznie w połączeniu z tokenem bearer pętli zwrotnej, dlatego może on
jedynie zawężać dostęp, a identyfikator, którego nie można rozpoznać, jest odrzucany.

Jeśli żaden model wizyjny nie jest dozwolony dla danego klucza, ścieżka opisu ustępuje,
a żądanie przechodzi dalej bez zmian, zgodnie z tym samym zachowaniem fail-open co w przypadku wyłączonego
zabezpieczenia (metadane `{ skipped: true, reason: "no_permitted_vision_model" }`).
Żądania bez klucza oraz klucze bez tych ograniczeń działają dokładnie tak jak
wcześniej.

#### Prompt opisu uwzględniający zadanie (`modalityBridgeVisionTaskAware`)

Domyślnie **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dołącza
tekst **ostatniej wiadomości użytkownika** (skrócony do 500 znaków) do bazowego
promptu opisu, ukierunkowując opis na to, o co faktycznie zapytał użytkownik
(wzorzec codex-vision-proxy), oraz prosząc model wizyjny o transkrypcję
widocznego tekstu. Gdy flaga jest wyłączona — lub brak tekstu użytkownika —
bazowy prompt jest używany bez zmian.

Własne żądanie zgodne z OpenAI pętli zwrotnej opisu (`callVisionModelSingle()`
w `visionBridgeHelpers.ts`) zawsze ustawia `image_url.detail: "high"` —
bezwarunkowo, dla każdego wywołującego/dostawcy, niezależnie od jakiegokolwiek
sygnału klienta. Próbkowanie z niskim poziomem szczegółowości pogarsza
dokładność OCR dokładnie w zadaniu transkrypcji tekstu, o które prosi ten
prompt, dlatego samo wywołanie opisu zawsze żąda wysokiego poziomu
szczegółowości, niezależnie od poziomu szczegółowości użytego w pierwotnym
żądaniu przychodzącym. Wpływa to wyłącznie na wewnętrzną treść żądania opisu;
nie zmienia sposobu, w jaki OmniRoute przekazuje własne `image_url.detail`
wywołującego w żądaniu głównym — ta wartość domyślna jest stosowana osobno
i tylko dla wykrytych klientów OpenCode, w `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Gałąź formatu przewodowego
Anthropic w pętli zwrotnej opisu nie ma pola `detail` i żadna z tych wartości
domyślnych na nią nie wpływa.

#### Limit danych wyjściowych opisu (`modalityBridgeVisionMaxChars`)

| Klucz                          | Wartość domyślna | Zakres            |
| ------------------------------ | ---------------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`              | `0` lub 100–50000 |

`0` (wartość domyślna) oznacza **brak limitu** — opis zwracany przez
`callVisionModel()` jest przekazywany bez modyfikacji, z zachowaniem
dotychczasowego działania. Każda wartość z zakresu 100–50000 skraca opis,
dodając przyrostek `…`, zanim zostanie on wstawiony z powrotem jako
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` w
`src/lib/guardrails/visionBridge.ts`). Zwiększ tę wartość w przypadku zadań OCR
wymagających dużej szczegółowości, gdy model podrzędny potrzebuje pełnej
transkrypcji; zmniejsz ją, aby ograniczyć zużycie tokenów przez gadatliwe
modele wizyjne. Pole panelu znajduje się w sekcji Zaawansowane na karcie Vision
(`modality-bridge-max-chars` w `ModalityBridgeVisionTab.tsx`) i podnosi każdą
wartość od 1 do 99 do dolnej granicy 100, pozostawiając jawne `0` bez zmian —
`0` samo w sobie jest prawidłową wartością Zod
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a nie tylko
wartością domyślną oznaczającą „nie ustawiono”.

#### Pamięć podręczna opisów (`modalityBridge/bridgeCache.ts`)

Przechowywana w pamięci pamięć podręczna LRU + TTL dla wyników opisów,
współdzielona w obrębie całego procesu.
Klucz = `sha256(imageRef + composedPrompt + configuredBridgeModel)` z ramkowaniem
za pomocą prefiksu długości (bez kolizji granic pól). Składnikiem klucza
odpowiadającym modelowi jest **skonfigurowany** model mostu, a nie model, który
faktycznie odpowiedział — `callVisionModel` może wewnętrznie użyć modelu
zapasowego, a tworzenie klucza osobno dla każdej próby prowadziłoby do
fragmentacji pamięci podręcznej. Nieudane opisy nigdy nie są buforowane.
Ustawienia:

| Klucz                           | Wartość domyślna | Zakres  |
| ------------------------------- | ---------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`           | —       |
| `modalityBridgeCacheTtlMinutes` | `60`             | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`            | 10–5000 |

#### Normalizacja zdalnych obrazów (opis w pętli zwrotnej/pobieranie base64)

Gdy most sam pobiera **zdalny** obraz — na potrzeby własnego wywołania opisu
Anthropic oraz konwersji do base64 dla formatu przewodowego Claude
(`ensureBase64ImagesForClaudeWire`), w obu przypadkach za pośrednictwem
`fetchRemoteImageAsDataUri()` w `visionBridgeHelpers.ts` — wynikowy identyfikator
URI danych jest przepuszczany przez `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) przed osadzeniem w żądaniu do modelu
wizyjnego. Zbyt duże obrazy są skalowane w dół tak, aby ich **dłuższa krawędź
miała 2048px** (zgodnie z limitem zmiany rozmiaru już stosowanym po stronie
serwera przez OpenAI/Anthropic), co zmniejsza liczbę przesyłanych bajtów
i opóźnienie bez zmiany tego, co widzi model wizyjny. Zmiana rozmiaru używa
`sharp`, ładowanego za pomocą dynamicznego importu: na platformie, na której
nie uda się załadować jego natywnego pliku binarnego, `normalizeDataUri()`
**nigdy nie zgłasza wyjątku** — zamiast tego przekazuje oryginalne bajty bez
zmian, dzięki czemu ścieżka opisu/konwersji do base64 zawsze pozostaje
sprawna. Dane niebędące obrazem (pobranie, które nie zwróciło obrazu możliwego
do zdekodowania) również są przekazywane bez zmian. Ta normalizacja jest
ograniczona do obrazów pobieranych przez most na potrzeby własnego wywołania
zwrotnego — nigdy nie jest stosowana do nieprzetworzonego ładunku
przekazywanego przez wywołującego, zgodnie z zasadą modyfikacji wyłącznie po
wyrażeniu zgody (Twarda reguła nr 20).

#### Schemat ustawień i migracja

Nowe klucze `modalityBridge*` są walidowane przez Zod w `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trzy klucze `modalityBridgeCache*` oraz grupa
`modalityBridgeAudio*` używana przez Audio Bridge. Migracja
`141_modality_bridge_settings.sql` kopiuje istniejące starsze wartości
`visionBridge*` do odpowiadających im nowych kluczy (idempotentnie, nigdy nie
nadpisując wartości `modalityBridge*` ustawionej przez operatora); starsze
klucze pozostają akceptowane jako awaryjne źródło odczytu przez jeden cykl
wydania.

#### Nagłówek przejrzystości i statystyki

Odpowiedzi przekształcone przez opis zawierają
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(tworzony przez `buildModalityBridgeHeader()` w
`modalityBridge/bridgeStats.ts`, dodawany przez
`withModalityBridgeHeader()` w `src/sse/handlers/chatHelpers.ts`).
Przekierowane żądania **nie** otrzymują nagłówka — ładunek pozostał
niezmieniony, a zamiana modelu jest już widoczna w polu `model` treści
odpowiedzi.

`GET /api/modality-bridge/stats` (uwierzytelnianie administracyjne, ten sam poziom co
`GET /api/settings`) zwraca przechowywane w pamięci liczniki dla poszczególnych modalności:
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` dla `vision`, `audio` oraz
`video`. `averageLatencyMs` używa `latencySamples`, a nie wszystkich prób, jako
mianownika; operacja bez pomiaru czasu nie tworzy sztucznej próbki wynoszącej zero
milisekund. `bridged` pozostaje wstecznie kompatybilnym aliasem udanych
konwersji; nieudane próby nie zwiększają jego wartości.
Liczniki są zgodnie z założeniem resetowane po ponownym uruchomieniu procesu
(telemetria, nie rozliczenia).

#### Konfiguracja panelu

Dedykowana strona panelu jest dostępna pod adresem
`/dashboard/settings/modality-bridge`. Jej dostępne bezpośrednio przez URL karty `Vision`, `Audio`
oraz `Video` zachowują parametry zapytania podczas przełączania wartości `tab`.
Karta Vision udostępnia włączanie, tryb, wybór modelu (w tym automatyczny
domyślny wybór), monity uwzględniające zadanie, zaawansowane limity czasu/obrazu/długości
opisu/pamięci podręcznej, liczniki czasu wykonania oraz zabezpieczone żądanie
przykładowe. Karta Audio jest również aktywna: udostępnia włączanie, selektor modeli
wyłącznie STT z opcją Auto, limity czasu/maksymalnej długości klipu, liczniki audio
oraz test przykładowy `input_audio`. Karta Video jest funkcjonalna: raportuje
stan środowiska wykonawczego FFmpeg/ffprobe — jeden z czterech jawnych stanów interfejsu użytkownika (`unknown`, gdy
sondowanie trwa lub nie mogło zostać ukończone, `restricted` na hoście panelu
innym niż adres pętli zwrotnej, gdzie sondowanie jest pomijane po stronie klienta, `unavailable` po
przeprowadzeniu sondowania i potwierdzeniu braku narzędzi lub `available` wraz z wersjami FFmpeg/ffprobe) — trwale zapisuje
limity włączenia/modelu/klatek/wideo/czasu, filtruje selektor modeli do modeli
obsługujących przetwarzanie obrazu oraz udostępnia liczniki wideo.

Dotychczasowa karta Vision Bridge w ustawieniach AI jest łączem zapewniającym zgodność
z nową stroną; nie zawiera już drugiej kopii formularza. Sekcja Media Providers również
łączy przepływy pracy Image-to-Text oraz Speech-to-Text z odpowiednimi kartami Modality
Bridge, nie usuwając istniejącego środowiska testowego Speech-to-Text.

**Obejście kontroli dopuszczania dla pętli własnej:** gdy wywołanie opisu jest kierowane przez
własną pętlę `/v1` OmniRoute (niestandardowy model dostawcy), żądanie podrzędne wysyła
`x-omniroute-admission-bypass: internal` i jest uwierzytelniane przy użyciu rozpoznanych
danych dostępowych pętli własnej — lokalnej wartości zastępczej `sk_omniroute` w trybie lokalnym albo
skonfigurowanego przez operatora klucza środowiskowego `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (#1350), dzięki czemu
wdrożenia z `REQUIRE_API_KEY=true` nadal mogą wykonywać wywołanie opisu. Obejście
jest honorowane wyłącznie dla dokładnie tych danych dostępowych, więc klienci zewnętrzni nie mogą użyć tego
nagłówka do pominięcia kontroli dopuszczania.

Starsze wartości domyślne znajdują się w `src/shared/constants/visionBridgeDefaults.ts`;
nowe wartości domyślne trybu/uwzględniania zadania/pamięci podręcznej oraz mechanizm rozpoznawania ustawień znajdują się w
`src/shared/constants/modalityBridgeDefaults.ts`. Mechanizm ochronny udostępnia opcję konstruktora
`deps`, aby testy mogły wstrzykiwać fałszywe implementacje `getSettings` oraz
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Przechwytuje żądania czatu zawierające audio, zanim dotrą one do miejsca docelowego, o którym nie
wiadomo, czy akceptuje dane wejściowe audio. Nigdy nie przekierowuje żądania czatu: części audio są
transkrybowane za pośrednictwem istniejącego, zgodnego z OpenAI punktu końcowego multipart, a
wybrany model czatu kontynuuje pracę z transkrypcjami tekstowymi.

Przebieg:

1. Określ `supportsAudio` za pomocą `getResolvedModelCapabilities()`. Jawne
   metadane rejestru dostawców mają pierwszeństwo, następnie statyczne metadane modelu, a potem zsynchronizowane
   `modalities_input`. Zadeklarowana lista danych wejściowych bez `audio` daje wartość `false`; brak
   dowodów dotyczących możliwości daje wartość `null`. Zarówno `false`, jak i `null` aktywują
   konserwatywny most, natomiast `true` go omija.
2. Rozpoznaj ustawienia `modalityBridgeAudio*` i wyodrębnij możliwe do zastąpienia części audio najwyższego poziomu
   ze wszystkich wiadomości za pomocą współdzielonego detektora `detectMediaParts()`.
   Obsługiwane formaty przesyłanych danych to OpenAI `input_audio`, `audio_url` oraz
   `source.media_type: "audio/*"`. Zagnieżdżone audio jest wykrywane na potrzeby routingu, ale nie jest
   usuwane przez ścieżkę zastępowania. Ilość pracy jest ograniczona przez `modalityBridgeAudioMaxClips`;
   późniejsze części pozostają nietknięte.
3. Uwzględnij skonfigurowaną wartość `provider/model` albo pozwól, aby `selectAudioBridgeModel()` przeszła przez
   `AUDIO_TRANSCRIPTION_PROVIDERS` w stabilnej kolejności katalogowej i wybrała pierwszy
   model z użytecznymi, aktywnymi danymi dostępowymi dostawcy.
4. `callAudioTranscription()` konwertuje audio w formacie base64/data URI na część multipart
   `file` albo pobiera zdalny zasób `audio_url` za pośrednictwem zabezpieczenia wychodzącego zezwalającego wyłącznie na publiczne adresy,
   z przypięciem DNS i limitem 25 MB. Następnie wysyła metodą POST plik oraz wybrany
   model do lokalnej pętli własnej `/v1/audio/transcriptions`, uwierzytelnionej za pomocą
   `resolveSelfLoopBearer()`. Istniejąca trasa transkrypcji wykonuje standardowe
   wyszukiwanie danych dostępowych, obsługę okresów karencji/limitów szybkości oraz przekazanie do dostawcy.
5. Udane wywołania zastępują odpowiednie części tekstem `[Audio N]: <transcript>`. Wywołania
   są wykonywane za pomocą `Promise.allSettled`: pojedynczy błąd zachowuje oryginalną
   część audio (kontrakt #4012). Jeśli wszystkie wywołania zakończą się niepowodzeniem, a dla miejsca docelowego potwierdzono
   `supportsAudio === false`, części przyjmują postać
   `[Audio N]: (unavailable — no STT provider connected)` (kontrakt #8430). Dla
   nieznanego miejsca docelowego (`null`) wynik, w którym wszystkie wywołania zakończyły się niepowodzeniem, pozostaje nietknięty. Miejsce docelowe, dla którego potwierdzono
   obsługę wyłącznie tekstu i które nie ma użytecznych danych dostępowych STT, otrzymuje ten sam jawny
   tekst zastępczy bez wykonywania wywołania sieciowego.

Udane transkrypcje korzystają z ogólnoprocesowej pamięci podręcznej LRU/TTL Modality Bridge.
Klucz łączy odwołanie do audio, stabilną etykietę operacji `audio-transcription`
oraz wybrany model STT; niepowodzenia nigdy nie są buforowane. Próby audio aktualizują
współdzielone liczniki `bridged`, `cacheHits`, `failures` oraz `lastUsedAt`.
Przekształcone odpowiedzi zawierają
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nietknięte
żądania nie otrzymują segmentu Audio Bridge.

Ustawienia środowiska wykonawczego są przechowywane w bazie danych i walidowane przez Zod:

| Klucz                         | Domyślnie | Zakres                              |
| ----------------------------- | --------- | ----------------------------------- |
| `modalityBridgeAudioEnabled`  | `true`    | —                                   |
| `modalityBridgeAudioModel`    | `""`      | Automatycznie lub identyfikator STT |
| `modalityBridgeAudioTimeout`  | `60000`   | 1000–300000                         |
| `modalityBridgeAudioMaxClips` | `3`       | 1–10                                |

Współdzielona pamięć podręczna pozostaje kontrolowana przez `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` oraz `modalityBridgeCacheMaxEntries`.

### Most wideo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Przechwytuje części wideo najwyższego poziomu w `messages` interfejsu Chat Completions oraz
w `input` interfejsu Responses API, zanim zostanie wywołany model docelowy bez znanej natywnej obsługi wideo.
Obsługiwane formaty to `input_video`, `video_url`, `video_source`, adresy URL HTTPS
oraz identyfikatory URI danych `data:video/*;base64,...`. Same nazwy plików w tekście nie są traktowane
jako wideo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) odpowiada za przeglądanie żądania,
sprawdzanie możliwości/zasad, agregację w obrębie żądania oraz ładunek odpowiedzi.
Przetwarzanie każdego wideo — pobieranie, pamięć podręczna pełnych wyników, opisywanie sekwencji
klatek (z uwzględnieniem każdej transkrypcji dźwięku zadeklarowanej przez wywołującego) oraz metryki/przerywanie/czyszczenie
dla każdej próby — jest ukryte za `processVideoPart` w
`videoBridgePipeline.ts`, wywoływanym raz dla każdej części wideo w pętli `preCall`.
Moduł ten definiuje również jawne granice portów `VideoMediaBrokerPort`
(pobieranie bajtów i wyodrębnianie próbkowanych klatek), `VideoAudioTranscriptionPort`
(łączenie zadeklarowanej przez wywołującego transkrypcji dźwięku z podpisami próbkowanych klatek) oraz
`VideoDrilldownPort` (granica trwałego zapisu szczegółowej analizy klatek; nie jest jeszcze połączona
z `processVideoPart` — obecnie wpisy szczegółowej analizy zapisuje wyłącznie osobna trasa
`/api/modality-bridge/video/drilldown`).

Publiczna ścieżka żądania `/v1` nigdy nie importuje ani nie wywołuje podprocesu. Zdalne
pliki wideo są pobierane z limitem 50 MiB; osadzone pliki wideo w formacie base64 mają
konserwatywny limit 36 MiB zdekodowanych danych na każde wideo, aby otoczka
modelu/wiadomości/ramkowania mogła zmieścić się w publicznym limicie przyjmowania żądań JSON wynoszącym 50 MiB. Długość danych osadzonych
i szacowany rozmiar po zdekodowaniu są sprawdzane przed alokacją. HTTPS jest
wymagany dla początkowego zdalnego adresu URL oraz każdego przekierowania, z użyciem istniejącego
zabezpieczenia wychodzącego ograniczonego do publicznych zasobów i przypinania DNS. Następnie bajty przekraczają dokładnie określoną wewnętrzną
granicę brokera `POST /api/modality-bridge/video/extract`. Ta trasa jest zarówno
`LOCAL_ONLY`, jak i `SPAWN_CAPABLE`, akceptuje wyłącznie uwierzytelnione w obrębie procesu
żądanie z zaufanego interfejsu pętli zwrotnej i nigdy nie akceptuje adresu URL, ścieżki systemu plików, pliku wykonywalnego
ani listy argumentów. Potok rozmiaru treści interfejsu API oraz przyrostowy czytnik treści
procedury obsługi niezależnie wymuszają limit wejścia brokera wynoszący 50 MiB. Jego ograniczona kolejka przetwarza
jedno wyodrębnianie naraz, dopuszcza cztery oczekujące zadania i ogranicza oczekujące dane wejściowe do
100 MiB.

Wewnątrz brokera `ffprobe` odczytuje prywatny plik lokalny; stała lista
dozwolonych formatów wyklucza formaty list odtwarzania i manifestów. W przypadku dozwolonych kontenerów
z rodziny MOV zewnętrzne odwołania do danych MOV pozostają domyślnie wyłączone, a
stałe polecenie ich nie włącza. Zarówno `ffprobe`, jak i `ffmpeg` używają
listy dozwolonych protokołów ograniczonej wyłącznie do `file`, jednego wątku, stałych tablic argumentów, bez powłoki,
oraz plików wykonywalnych wyszukiwanych w `PATH`. Strumienie okładek w postaci załączonych obrazów nie są
kandydatami do odtwarzania. Wszystkie odtwarzalne strumienie muszą spełniać limity, a
jawny strumień domyślny ma pierwszeństwo przed deterministycznym wyborem strumienia o najniższym indeksie.
Pliki wideo są ograniczone do 600 sekund, 8 192 pikseli na wymiar oraz
33 554 432 pikseli źródłowych. FFmpeg próbkuje 1–16 klatek JPEG ze środkowych punktów, skaluje
dłuższą krawędź w dół do maksymalnie 1 024 pikseli bez powiększania mniejszych danych wejściowych i
nigdy nie otrzymuje adresu URL. Domyślnie próbkowanie ma wartość `uniform`. Opcjonalne
zasady `scene_aware` oraz eksperymentalna `segment_aware` wykonują jedno dodatkowe
stałe przejście FFmpeg po już zweryfikowanym lokalnym strumieniu, wybierają ograniczony zbiór
znaczników czasu scen `showinfo` i deterministycznie wracają do tych samych
równomiernych punktów środkowych w przypadku błędu detektora, przekroczenia limitu czasu, nieprawidłowych danych wyjściowych lub pustego
zbioru kandydatów. Tryb uwzględniający segmenty przydziela próbki z punktów środkowych proporcjonalnie do
zweryfikowanych interwałów scen; dowody dotyczące segmentów oraz zachowanie mechanizmu awaryjnego
opisano szczegółowo poniżej. Twardy limit 16 klatek jest
stosowany po dokonaniu wyboru w każdej zasadzie. Gdy żądanie uwzględniające sceny ma budżet wynoszący tylko
jedną klatkę, używa równomiernego punktu środkowego aktywnego pełnego wideo lub okna zakresu
i zgłasza `policyEffective: uniform`: jedna wybrana klatka sceny
nie może zachować obu krańców czasowych. Wywołujący może opcjonalnie podać
skończone okno zakresu (`start`/`end` w sekundach); granice są ograniczane do czasu trwania multimediów,
odwrócone lub nieskończone okna są odrzucane, a wszystkie zasady
próbkowania są stosowane wyłącznie wewnątrz znormalizowanego interwału. Wynikowe
okno jest uwzględniane w metadanych próbkowania oraz w niezaufanym prefiksie opisu,
aby modele niższego poziomu mogły odróżnić wybrany fragment od pełnej
osi czasu.

Semantyczne ukierunkowanie podpisów jest osobnym, jawnym ustawieniem. Domyślny tryb analizy `full`
zachowuje istniejący prompt dotyczący klatek i nigdy nie przekazuje tekstu żądania
do modelu generującego podpisy. W trybie `focused` most odczytuje wyłącznie najnowszy
niepusty `text`/`input_text` autorstwa użytkownika z tego samego kontenera Chat lub Responses,
normalizuje go do NFC, redukuje znaki sterujące i białe znaki
oraz ogranicza go do 500 punktów kodowych Unicode. Pusty wynik powoduje powrót do
dokładnego promptu `full`. Użyteczna wskazówka jest serializowana jako JSON w dedykowanym
bloku niezaufanego kontekstu użytkownika i może jedynie nadawać priorytet obserwowalnym szczegółom; nie
może zastąpić osobnego ostrzeżenia przed wykonywaniem instrukcji widocznych
lub słyszalnych w multimediach. Ukierunkowanie tekstowe nigdy nie wyprowadza `start`/`end` ani nie zmienia
próbnika czasowego.

#### Dowody strukturalne segmentów FU-07

`segment_aware` używa jednego ograniczonego przebiegu analizy wstępnej na wcześniej zweryfikowanym lokalnym strumieniu wideo. Stały łańcuch filtrów najpierw skaluje obraz do szerokości nie większej niż 320 pikseli, wykrywa zmiany scen i zamrożone przedziały, a następnie pobiera próbki z częstotliwością 1 klatki na sekundę w celu określenia rozmycia, średniej luminancji oraz informacji przestrzennej/czasowej. Przebieg jest ograniczony do 600 próbek strukturalnych, jednego wątku FFmpeg/filtra, tych samych list dozwolonych protokołów wyłącznie typu `file` i kontenerów, limitu danych wyjściowych procesu wynoszącego 1 MiB oraz maksymalnie 30 sekund w ramach współdzielonego mechanizmu przerwania/terminu brokera. Nigdy nie przyjmuje z żądania polecenia, filtra, ścieżki ani adresu URL.

Wartości strukturalne stanowią deterministyczne dane z próbkowania, a nie semantyczne rozumienie wideo. Nie służą do wnioskowania o obiektach, działaniach, napisach, mowie ani zamiarach użytkownika. Granice scen i zamrożeń tworzą segmenty; pokrycie zamrożeniem, rozmycie, ekspozycja, szczegółowość przestrzenna i zmienność czasowa wpływają wyłącznie na sposób przydzielania istniejącego budżetu 1–16 klatek. Całkowicie zamrożony segment jest ograniczany do jednej klatki, natomiast niezamrożone segmenty konkurują o pozostały budżet. Gdy liczba granic przekracza liczbę klatek, zachowywane jest równomierne pokrycie osi czasu, dzięki czemu szybkie cięcia na początku nie mogą przesłonić długiego segmentu końcowego. Granice scen znajdujące się w zakresie 1-sekundowej rozdzielczości analizy od granicy zamrożenia są scalane.

Brakujące filtry, nieprawidłowe lub puste dane, błąd detektora albo przekroczenie limitu czasu ograniczonej analizy wstępnej powodują bezpieczne przejście do dokładnie tej samej zasady równomiernego wyboru punktów środkowych. Przerwanie przez wywołującego lub upłynięcie terminu brokera nie powoduje takiego przejścia: kończy uruchomiony podproces, zapobiega późniejszemu wyodrębnianiu klatek, a prywatne drzewo tymczasowe jest usuwane w `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministyczne, rzeczywiste materiały testowe FFmpeg na potrzeby oceny oszczędności wywołań mechanizmu tworzenia podpisów po deduplikacji, przydzielania budżetu dla intensywnego ruchu, danych dotyczących rozmycia/ekspozycji/SI-TI, szybkich cięć z długą końcówką oraz wyników fałszywie dodatnich przy stopniowym przenikaniu. Rejestruje czas rzeczywisty analizy wstępnej, a tam, gdzie dostępne jest `/usr/bin/time`, także czas procesora procesu potomnego i szczytowe użycie RSS. Kontrole jakości obejmują wyłącznie strukturalne kryteria referencyjne. Jakość rzeczywistego modelu tworzenia podpisów pozostaje w stanie `HOLD`, ponieważ ten mechanizm testowy nie ma autoryzowanego punktu końcowego ani ustalonego systemu oceny. Oszczędności finansowe również pozostają w stanie `HOLD`, chyba że `--caption-cost-per-call-usd` dostarczy jawną, dodatnią wartość szacowanego kosztu pojedynczego wywołania; skrypt nigdy nie fabrykuje żadnego z tych wyników.

Rozmiar każdej klatki jest ograniczony do 4 MiB, łączny rozmiar wszystkich surowych klatek do 23 MiB, a rozmiar zserializowanej odpowiedzi brokera do 32 MiB. Prywatny katalog tymczasowy jest usuwany w `finally`. OmniRoute nie zawiera FFmpeg i nie akceptuje niestandardowej ścieżki do pliku wykonywalnego. Przed utworzeniem podpisów most stosuje zachowawczy przebieg deduplikacji wizualnej: każdy obraz JPEG jest redukowany do bufora skali szarości 16×16 i porównywany wyłącznie z ostatnią zachowaną klatką. W przypadku żądanego budżetu podpisów większego niż jedna klatka wyodrębnianie dostarcza ograniczoną pulę kandydatów liczącą maksymalnie dwukrotność tego budżetu i nigdy więcej niż 16 klatek. Żądany limit jest stosowany dopiero po deduplikacji, przy czym podczas końcowego przerzedzania zachowywani są pierwszy i ostatni wybrany kandydat, jeśli budżet wynosi co najmniej dwa. Wersjonowana zasada `grayscale-16x16-mean-cells-v2` używa większej z dwóch wartości: średniej różnicy luminancji oraz odsetka komórek miniatury, których znormalizowana różnica wynosi co najmniej 0,05. Próg duplikatu jest stałą 0,04, wybraną ze względu na przewidywalność, a nie udostępnioną jako ustawienie czasu wykonywania. Ten dodatkowy sygnał o wysokim kontraście pozwala zachować niewielkie zmiany ruchu i widocznego tekstu, które porównanie wyłącznie wartości średnich może ukryć. Błędy modułu porównującego lub dekodera powodują zachowanie pokrycia zamiast odrzucenia klatek. Metadane wyjściowe oddzielają wyodrębnionych kandydatów, pomyślnie użyte klatki i odrzucone duplikaty wizualne.

Jawnie oznaczona część wideo może zażądać arkusza stykowego ze znacznikami czasu. Most tworzy siatkę JPEG zawierającą maksymalnie 4 kolumny i 16 klatek. W każdej 512-pikselowej komórce znacznik czasu źródła jest trwale nanoszony na dolny pas o wysokim kontraście, a te same znaczniki czasu pozostają w metadanych tekstowych na potrzeby późniejszego powiązania i audytu. Rozmiar kompletnego obrazu JPEG pozostaje ograniczony do 32 MiB. Jeśli `sharp` nie może zdekodować lub utworzyć siatki, most wraca do poszczególnych klatek JPEG; przerwanie przez klienta jest nadal propagowane przez operację tworzenia arkusza.

Dane służące do zatwierdzenia wdrożenia są celowo oddzielone od syntetycznego mikrotestu wydajności kompozycji. `scripts/perf/video-bridge-contact-sheet-eval.ts` definiuje wersjonowany według schematu mechanizm testów A/B dla rzeczywistych modeli wizyjnych zgodnych z OpenAI. Mierzy liczbę tokenów zgłoszoną przez dostawcę, opóźnienie od początku do końca (w tym tworzenie arkusza), liczbę wywołań modelu oraz zachowanie faktów zdefiniowanych w manifeście. Surowe odpowiedzi modelu nie są zapisywane w raporcie; zachowywane są wyłącznie skróty SHA-256 i identyfikatory dopasowanych faktów. Mechanizm testowy nie wykonuje żadnego wywołania sieciowego ani płatnego wywołania modelu, chyba że przekazano `--execute-real` oraz skonfigurowano `--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez takiego jawnego rzeczywistego uruchomienia jego wynik w formacie możliwym do odczytu maszynowego pozostaje w stanie `HOLD`; same syntetyczne pomiary rozmiaru danych i liczby wywołań nie stanowią podstawy do zatwierdzenia wdrożenia.

Wywołujący mogą dołączyć opcjonalną tablicę `transcript.cues` do obsługiwanej części wideo, jeśli posiadają już zsynchronizowany tekst. Każdy element musi zawierać `text`, skończony przedział `start`/`end` mieszczący się w zbadanym czasie trwania oraz wartość `source` z listy dozwolonych wartości (`client`, `embedded` lub `audio-bridge`); `confidence` ma domyślną wartość `1` i musi mieścić się w przedziale od `0` do `1`. Identyczne elementy są scalane. OmniRoute nigdy nie rozpoczyna transkrypcji na podstawie tych metadanych: zweryfikowane elementy są kopiowane do opisanego wyniku wraz ze źródłem, poziomem ufności i przedziałem czasowym oraz są prezentowane jako niezaufane obserwacje obok podpisów klatek. Nieprawidłowy tekst, tekst spoza zakresu lub pozbawiony informacji o pochodzeniu jest odrzucany, zamiast być dołączany do strumienia podpisów. Oba kanały transkrypcji w treści żądania normalizują dostarczone informacje o pochodzeniu do wartości `client`, w tym samodzielnie zadeklarowane etykiety `embedded` lub `audio-bridge`. Tylko adapter należący do serwera może przypisać te zaufane etykiety za pośrednictwem dostępnego wyłącznie w kodzie argumentu `trustedSource`; pole JSON w żądaniu nie może dotrzeć do tego argumentu. Tekst transkrypcji pozostaje niezaufaną treścią pochodzącą z multimediów niezależnie od jego pochodzenia i nigdy nie może decydować o autoryzacji.

Zaawansowany wywołujący może dostarczyć ścieżkę `audioTranscript` dla tego samego wideo;
jest ona traktowana jako tekst dostarczony przez klienta, a nie jako dowód transkrypcji wykonanej przez serwer.
Warstwa scalająca przetwarza obserwacje wizualne i dźwiękowe z jednym
terminem i sygnałem przerwania, porządkuje je na wspólnej osi czasu, scala
identyczne duplikaty i zwraca wynik częściowy, gdy powodzeniem kończy się tylko jedna gałąź.
Nieprawidłowa ścieżka `audioTranscript` skutkuje takim wynikiem częściowym — opis
wizualny zostaje zachowany, a gałąź dźwiękowa rejestruje oczyszczony kod błędu —
zamiast powodować niepowodzenie całego wideo. Dostępność poszczególnych gałęzi, flaga wyniku częściowego
oraz oczyszczone kody błędów są zachowywane w opisanym wyniku, w
metadanych mechanizmów ochronnych (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), w metadanych pamięci podręcznej wyników oraz w licznikach
scalania mostu. Domyślna ścieżka Video Bridge nie wywołuje zamiany mowy na tekst
ani nie pobiera drugiej kopii multimediów; bez tej jawnie przekazanej ścieżki pozostaje
ograniczona wyłącznie do wideo.

**Przechowywanie transkrypcji (#12150 P1).** Ma to zastosowanie automatycznie za każdym razem, gdy
Video Bridge (który sam jest opcjonalny) renderuje wpis transkrypcji — nie istnieje oddzielna
flaga przechowywania. Gdy żądanie renderuje dowolny wpis transkrypcji (zadeklarowany przez wywołującego
`transcript` lub scalony `audioTranscript`), mechanizm ochronny oznacza je jako
`videoBridgeObserved` i tworzy zredagowaną kopię opisu wideo —
identycznie wyrenderowaną, lecz z tekstem swobodnym każdego wpisu zastąpionym przez
`[redacted-video-transcript]`, utworzoną poprzez podmianę pola wpisu strukturalnego
przed złożeniem ciągu znaków (nigdy poprzez analizę spłaszczonego tekstu, dzięki czemu żadna treść
wpisu — złośliwa ani zwykła, w tym treść zawierająca `]`, taka jak
`[inaudible]`/`[music]` — nie może się zachować). Utrwalona treść żądania w dzienniku wywołań zamienia
każdą część tekstową pochodzącą z wideo na tę zredagowaną kopię, dopasowując ją na podstawie równości
treści; punkt odniesienia `fullText` jest ponownie odczytywany z ukończonego ładunku mechanizmu ochronnego
sprzed wywołania, dzięki czemu dopasowanie nadal się udaje po tym, jak późniejsze mechanizmy ochronne łańcucha
(maskowanie danych osobowych i poświadczeń, priorytety 10/95) zmienią tekst opisu w miejscu, oraz
po przekształceniu tablicy komunikatów przez wstrzyknięcie monitu systemowego/przekazania/kontekstu Memory.
Treść wysyłana do modelu pozostaje niezmieniona. Zaobserwowane żądanie nie zapisuje również
żadnych trwałych danych w Memory (pomijane jest wyodrębnianie zarówno z żądania, jak i z odpowiedzi),
więc odpowiedź samego modelu nie może powielić tekstu transkrypcji w Memory.

**Nieprzetworzone pola wideo (#12430).** Gdy most jest włączony, a natywna obsługa wideo jest nieznana lub niedostępna, zdefiniowane pola `transcript`/`audioTranscript` również aktywują `videoBridgeObserved`, nawet po niepowodzeniu tworzenia opisu lub przekroczeniu limitu `maxVideos`. Wartości `null` i puste ciągi znaków są uwzględniane; nieobecne pola i metadane niezwiązane z wideo — nie. Przechowywane kopie redagują te pola lub pomijają żądanie, a pamięci podręczne i Memory są omijane.

Na tych ścieżkach rezerwowych prawidłowe wpisy wywołującego stają się obsługiwanymi częściami `text`/`input_text`
zamiast niestandardowymi polami dostawcy. Obie ścieżki dostarczone w żądaniu
pozostają niezaufanymi obserwacjami `client` z jawnym ostrzeżeniem, że wideo
nie zostało opisane, a znaczniki czasu nie zostały zweryfikowane względem multimediów. Istniejące
limity 256 wpisów/64 KiB łącznie oraz limity poszczególnych wpisów obowiązują łącznie dla obu ścieżek;
znaczniki czasu muszą mieścić się w 600-sekundowym limicie brokera i w każdym podanym oknie
fokusu. Nieprawidłowe ścieżki są odrzucane, a nie przekazywane jako dowolny tekst; prawidłowa
ścieżka równoległa może nadal zostać użyta, o ile ich łączny limit nie zostanie przekroczony. Pola o wartości null/puste
nie dodają tekstu. Ta ścieżka rezerwowa nie powoduje pobierania multimediów ani transkrypcji.
Pola rozszerzeń transkrypcji są usuwane z rezerwowego nośnika wideo oraz jego
obiektów `video_url`/`source`. Lista dozwolonych elementów protokołu OpenAI pozostaje restrykcyjna; nośniki wideo
o nieznanej obsłudze natywnej pozostają dostępne, a znane cele obsługujące wyłącznie tekst zachowują bezpieczne znaczniki.
Strukturalne, zredagowane kopie chronią dołączony tekst transkrypcji, podczas gdy
oryginalne żądanie należące do wywołującego pozostaje niezmienione. Cele z obsługą natywną oraz
wyłączone mosty zachowują dotychczasowe zachowanie polegające na pomijaniu.

Dodatkowe przechowywane kopie używają tego samego sygnału zaobserwowanego żądania. Nieprzetworzony
zrzut żądania klienta sprzed zastosowania mechanizmu ochronnego, oczekujące żądanie w pamięci oraz dziennik
wcześnie odrzuconych żądań strukturalnie zastępują pola transkrypcji w częściach wideo;
monity w postaci ciągów znaków generowane przez etapy potoku i przekazywanie kontekstu są redagowane
w miejscu docelowym utrwalanej treści żądania. Utrwalony znacznik `video_content_removed`
sprawia, że kontynuacja za pomocą `previous_response_id` kończy się bezpiecznym niepowodzeniem zamiast odtwarzać
tekst, który celowo odrzucono. Jeśli zaobserwowane żądanie utraci
zredagowaną kopię danej części przed zapisaniem w dzienniku albo choć jedna z kilku kopii wideo
nie zostanie dopasowana po późniejszych modyfikacjach żądania, przechowywana treść żądania jest
całkowicie pomijana zamiast zachowywać częściowo zredagowaną transkrypcję.

W przypadku zaobserwowanego żądania odpowiedź modelu może cytować dowolny fragment
transkrypcji bez granicy strukturalnego wpisu. Jej utrwalone pole `responseBody`
w dzienniku wywołań jest zatem zastępowane znacznikiem pominięcia; szczegółowy
artefakt potoku (który może zawierać treści od dostawcy/klienta oraz fragmenty strumienia)
nie jest przechowywany. Pamięci podręczne semantyczne, idempotencji oraz odtwarzania procesu rozumowania
pomijają odczyty i zapisy dla tego żądania. Żądanie dostawcy i odpowiedź
widoczna dla klienta pozostają niezmienione. Wczesne bajty podtrzymujące połączenie są usuwane z bufora tymczasowego,
gdy szczegółowy artefakt zostaje pominięty. Ostrzeżenie Kiro dotyczące nieprawidłowego EventStream
raportuje wyłącznie liczbę bajtów ładunku, nigdy jego zawartość ani nieprzetworzony błąd
parsera JSON.
Nie oznacza to, że przeprowadzono audyt wszystkich innych komunikatów diagnostycznych dostawców/wtyczek;
szerszy przegląd miejsc docelowych przechowywania jest śledzony w #11658.

Wewnętrzny cykl życia `/api/modality-bridge/video/drilldown` stanowi oddzielną,
uwierzytelnianą za pomocą loopback/token warstwę pamięci podręcznej. Każda operacja
wymaga również kanonicznego, nieprzezroczystego identyfikatora podmiotu. Zanim
wywołujący produkcyjny zostanie włączony, musi wyprowadzać ten identyfikator
z uwierzytelnionego tenanta i nigdy nie może przekazywać wartości wybranej przez
klienta. Klucze pamięci podręcznej wiążą ten podmiot z kanonicznymi
identyfikatorami sesji i odwołań do wideo, przechowują wyłącznie klucze
wyprowadzone za pomocą SHA-256 oraz ograniczają zarówno odczyty, jak i usuwanie
do tego samego podmiotu. Pamięć podręczna przechowuje maksymalnie 16 wyprowadzonych
klatek JPEG na wpis, wygasza je po dziesięciu minutach oraz obsługuje ograniczone
odczyty `start`/`end` lub jawne usunięcie sesji.

Każdy podmiot jest ograniczony do 16 wpisów i 64 MiB kanonicznych danych JPEG.
Limity te są niezależne od globalnego pułapu 64 wpisów/256 MiB: presja na limit
podmiotu powoduje usunięcie wyłącznie najdawniej używanych wpisów tego podmiotu,
zanim zostanie rozważone globalne usuwanie LRU. Wygasłe wpisy są usuwane zarówno
z rozliczenia podmiotu, jak i globalnego podczas aktywności pamięci podręcznej,
natomiast anulowanie i niepowodzenie walidacji nie zatwierdzają częściowego
zastąpienia.

Pamięć podręczna odrzuca niekanoniczne dane Base64, nadmiarowe dopełnienie, multimedia
inne niż JPEG, nieprawidłowe lub ucięte pliki JPEG oraz pliki JPEG, które generują
ostrzeżenie podczas ograniczonego, pełnego dekodowania obrazu przez `sharp`.
Każdy zaakceptowany obraz jest ponownie kodowany jako kanoniczny JPEG, a jego
szerokość i wysokość są wyprowadzane ze zdekodowanych bajtów zamiast z pól
przekazanych przez wywołującego. Wszelkie końcowe bajty poliglotyczne są odrzucane,
a nie zachowywane. Do obu limitów zaliczany jest wyłącznie ograniczony,
kanoniczny, skompresowany bufor. Limit transmisji JSON uwzględnia narzut Base64
dla pułapu 32 MiB zdekodowanych danych wejściowych. Każda
przechowywana derywacja rejestruje zweryfikowany format i rozdzielczość JPEG,
zasady próbkowania, wersję derywacji, czas utworzenia, obliczony przez serwer
skrót zawartości oraz skrót nadrzędnego odwołania wraz ze skrótem zawartości
nadrzędnej od zaufanego wywołującego. Anulowanie jest sprawdzane między
asynchronicznymi fazami dekodowania i obliczania skrótu, przed atomowym
zatwierdzeniem w pamięci podręcznej.

Ten etap nie łączy jeszcze producenta produkcyjnego z trasą i nie zapewnia
wyboru wariantów o wielu rozdzielczościach. Przezroczysta ścieżka żądania
Video Bridge nie powoduje zatem żadnej dodatkowej pracy, natomiast wyprowadzanie
identyfikatora podmiotu powiązanego z tenantem oraz pełny, wielorozdzielczy cykl
życia FU-08 pozostają jawnymi zadaniami do wykonania w przyszłości, zamiast być
udokumentowane jako ukończone zachowanie.

Klatki są kolejno opatrywane opisami przy użyciu skonfigurowanego modelu Video.
Puste nadpisanie Video dziedziczy ustawienie Vision; jeśli oba są puste,
automatyczny router Vision wybiera efektywny model obsługujący analizę obrazu.
Pomyślnie utworzone opisy zastępują oryginalną część stabilnym prefiksem
`[Video description:`, który oznacza również tekst jako niezaufaną obserwację
pochodzącą z multimediów i nakazuje modelom na dalszych etapach, aby nie
wykonywały instrukcji znalezionych w multimediach. Klucze pamięci podręcznej
opisów klatek obejmują bajty JPEG, prompt, znacznik czasu i efektywny model;
buforowane są wyłącznie pomyślnie utworzone opisy. Wpisy pamięci podręcznej
zachowują model, który faktycznie pomyślnie wygenerował wynik, w tym model
rezerwowy; most zgłasza `mixed`, gdy różne klatki zostały wygenerowane przez
różne modele. Trafienie w pamięci podręcznej ponownie wykorzystuje tożsamość
tego modelu zamiast przypisywać mu etykietę żądanego planu routingu. Pamięć
podręczna wyników dla całego wideo jest indeksowana według każdego parametru
wejściowego zmieniającego wynik — promptu, efektywnego modelu, zasad próbkowania,
liczby klatek, trybu analizy semantycznej, odcisku SHA-256 znormalizowanej
wskazówki dotyczącej obszaru zainteresowania, okna zainteresowania,
`transcript`, `audioTranscript` oraz flagi arkusza stykowego — dlatego zmiana
któregokolwiek z tych wymiarów powoduje chybienie pamięci podręcznej, a nigdy
ponowne użycie nieaktualnego wyniku. Wersja zasad deduplikacji wizualnej, próg
oraz ograniczona liczba klatek kandydujących są również jawnie uwzględnione
w kluczu i metadanych pamięci podręcznej wyników; zmiana zasad nie może więc
spowodować ponownego użycia nieaktualnego opisu całego wideo. Metadane v4
pamięci podręcznej wyników zachowują tryb i odcisk, lecz nigdy surowe zadanie
użytkownika. Metadane mechanizmu zabezpieczającego raportują zarówno żądany,
jak i efektywny tryb analizy; żądany tryb `focused` bez użytecznego tekstu
użytkownika jest raportowany jako efektywnie `full`.

Mechanizm zabezpieczający wyodrębnia każdą obsługiwaną część wideo, ale opisuje
nie więcej niż `modalityBridgeVideoMaxVideos`. W przypadku celu, dla którego
udowodniono `supportsVideo === false`, wideo zakończone niepowodzeniem oraz
wideo przekraczające limit są zastępowane jawnymi, bezpiecznymi znacznikami
tekstowymi, dzięki czemu żadne surowe wideo nie pozostaje w danych. Gdy
możliwości są nieznane, te części zachowują swój nośnik wideo; wszelkie
transkrypcje rezerwowe podlegają opisanej wyżej ograniczonej konwersji tekstu.
Cele z `supportsVideo === true` omijają most. Sygnał przerwania żądania klienta
jest propagowany przez pobieranie, kolejkę brokera, podprocesy i wywołania
generowania opisów; przerwania zatrzymują przetwarzanie między kolejnymi
materiałami wideo i nigdy nie powodują awaryjnego przepuszczenia surowych
multimediów.

Ustawienia środowiska uruchomieniowego są przechowywane w bazie danych
i walidowane za pomocą Zod:

| Klucz                               | Domyślna wartość | Zakres / zachowanie                                                                                                     |
| ----------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`          | Opcjonalne środowisko wykonawcze, włączane na żądanie                                                                   |
| `modalityBridgeVideoAnalysisMode`   | `"full"`         | `full` zachowuje ogólne podpisy; `focused` używa ograniczonego, niezaufanego kontekstu ostatniej wiadomości użytkownika |
| `modalityBridgeVideoModel`          | `""`             | Dziedziczy model Vision Bridge                                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`              | 1–16                                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`      | `uniform`, `scene_aware` lub proporcjonalne `segment_aware`; awaria detektora powoduje przejście awaryjne na `uniform`  |
| `modalityBridgeVideoMaxVideos`      | `1`              | 1–4                                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`         | 1000–120000 ms                                                                                                          |

Starsze utrwalone wartości limitu czasu dla wideo przekraczające 120 sekund są ograniczane do
terminu brokera; nowe ustawienia przekraczające ten limit są odrzucane.
`GET /api/modality-bridge/video/runtime` wymaga zaufanej, oznaczonej lokalności pętli zwrotnej
przed uwierzytelnianiem lub sprawdzaniem środowiska wykonawczego, a następnie wymaga
uwierzytelnienia administracyjnego. Zwraca wyłącznie `available`, oczyszczone wersje FFmpeg/ffprobe oraz stały
powód, gdy środowisko wykonawcze jest niedostępne. Wewnętrzny punkt końcowy ekstrakcji nie jest
publicznym API do przesyłania plików: nasycenie kolejki zwraca `503` wraz z `Retry-After`, rozłączenie
wywołującego zwraca `499`, a stały termin brokera zwraca `504`. Przekonwertowane odpowiedzi dodają
`video->text;model=<visionModel>;parts=<videos>` do centralnego nagłówka
`x-omniroute-modality-bridge` bez usuwania segmentów Vision ani Audio.

### Maskowanie danych osobowych (`piiMasker.ts`)

Działa na **obu** etapach.

- **`preCall`** klonuje ładunek, przechodzi przez `system`, `messages`, `input` i
  `prompt` (w tym elementy będące zwykłymi ciągami znaków) oraz stosuje `processPII()` (z
  `@/shared/utils/inputSanitizer`) do pól `content`/`text` zawierających ciągi znaków. Gdy
  `PII_REDACTION_ENABLED=true`, wykryte dane osobowe są redagowane w wychodzącym
  ładunku. Jest to niezależne od `INPUT_SANITIZER_MODE` (które kontroluje wyłącznie
  zasady dotyczące wstrzykiwania promptów). Gdy redagowanie jest wyłączone, wywołanie rejestruje liczbę
  wykryć bez modyfikowania treści.
- **`postCall`** wykonuje głębokie klonowanie odpowiedzi, uruchamia `sanitizePIIResponse()` oraz
  mechanizm maskujący strukturę Responses API (`maskResponsesOutput` — obejmuje
  `output_text` i `output[].content[].text`). Jeśli nastąpi jakakolwiek redakcja,
  zmodyfikowana odpowiedź zastępuje oryginalną.

Mechanizm ochronny nigdy nie blokuje; jedynie dodaje adnotacje (`meta.detections`,
`meta.redacted`) lub modyfikuje treść.

#### Wybór według typu, niestandardowe wzorce i liczniki wykryć

**Panel → Ustawienia → Bezpieczeństwo → Maskowanie danych osobowych** określa, _co_ jest maskowane. Nie
włącza ono maskowania: nadal odpowiadają za to `PII_REDACTION_ENABLED` (żądanie) oraz
`PII_RESPONSE_SANITIZATION` (odpowiedź + SSE), przy czym obie opcje są domyślnie wyłączone.

- **Wybór według typu** — wbudowane identyfikatory są wymienione w
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Brak ustawienia oznacza każdy
  typ (zachowanie sprzed wprowadzenia tego ustawienia). Wzorzec
  `ssn_us` silnika żądań jest mapowany na `ssn`. Szablony (Minimalny, Standardowy, Finansowy,
  Brazylijski, USA, Pełny) jedynie zaznaczają odpowiednie pola wyboru w interfejsie użytkownika.
- **Niestandardowe wzorce** — maksymalnie 20 wzorców wyrażeń regularnych lub symboli wieloznacznych (`*` = maksymalnie 64
  znaki niebędące białymi znakami, `?` = jeden znak). Dopasowania są zastępowane przez `[CUSTOM_REDACTED]`.
  Każdy wzorzec przechodzi przez `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): maksymalnie 500 znaków, flagi ograniczone
  do `g i m s u`, musi się kompilować, musi przejść kontrolę `safe-regex` (katastroficzny
  nawrót) i nie może dopasowywać pustego ciągu ani znacznika redakcji.
  Wzorzec, który nie przejdzie kontroli, jest odrzucany podczas zapisywania i testowania, a zapisany wiersz,
  który nie przejdzie kontroli, jest pomijany w czasie wykonywania zamiast kompilowany. Niestandardowe wzorce są
  uruchamiane tylko wtedy, gdy maskowanie jest włączone.
- **Liczniki wykryć** — liczba wykryć według typu (nigdy dopasowane wartości), przechowywana w
  pamięci i zerowana przy ponownym uruchomieniu (`src/lib/pii/piiDetectionStats.ts`). Liczniki
  zwiększają się tylko wtedy, gdy maskowanie jest włączone.

Ustawienia znajdują się w tabeli `key_value` (przestrzeń nazw `pii_settings`,
`src/lib/db/piiSettings.ts`) i są odczytywane za pośrednictwem pamięci podręcznej o czasie 1 s. API:

| Metoda | Ścieżka                  | Przeznaczenie                                                                |
| ------ | ------------------------ | ---------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stan flag, `enabledTypes`, `customPatterns`, liczniki wykryć                 |
| `PUT`  | `/api/settings/pii`      | Zastępuje `enabledTypes` (`null` = wszystkie) i/lub `customPatterns`         |
| `POST` | `/api/settings/pii/test` | Testuje jeden wzorzec na próbce o rozmiarze do 8 KB; nic nie jest zapisywane |

Wszystkie trzy wymagają uwierzytelnienia administracyjnego i walidują treść za pomocą Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Wstrzykiwanie promptów (`promptInjection.ts`)

Wykrywa wrogie struktury w treściach dostarczonych przez użytkownika i egzekwuje
skonfigurowane zasady. Zachowanie jest kontrolowane przez zmienne środowiskowe i opcje
konstruktora:

| Ustawienie      | Zmienna środowiskowa                                                                                 | Domyślnie | Działanie                                                                                                                                                                                                                                             |
| --------------- | ---------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Włączone        | `INPUT_SANITIZER_ENABLED`                                                                            | `true`    | Gdy ustawiono `false`, zabezpieczenie natychmiast kończy działanie.                                                                                                                                                                                   |
| Tryb            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`    | Polityka dotycząca wstrzyknięć: `block`, `warn` lub `log`. (`redact` jest akceptowane ze względu na zgodność wsteczną, ale **nie** usuwa tekstu wstrzyknięcia; przepisywanie danych PII w żądaniach jest kontrolowane przez `PII_REDACTION_ENABLED`.) |
| Próg blokowania | opcja `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`    | Minimalny poziom ważności wymagany do zablokowania. Przy ustawieniu domyślnym poziom średni służy wyłącznie do obserwacji.                                                                                                                            |

**Priorytet trybu** (`getMode`): `options.mode` wywołującego →
**nadpisanie flagą funkcji z bazy danych** `INJECTION_GUARD_MODE` (Panel → Ustawienia →
Flagi funkcji) → zmienna środowiskowa `INJECTION_GUARD_MODE` → zmienna środowiskowa `INPUT_SANITIZER_MODE` →
`warn`. Nadpisanie z panelu ma zatem pierwszeństwo przed zmiennymi środowiskowymi, dzięki czemu interfejs
Flag funkcji steruje działającym zabezpieczeniem na bieżąco (bez ponownego uruchamiania). Odczyt z bazy danych działa bezpiecznie w razie błędu:
jeśli wystąpi błąd, zabezpieczenie wraca do działania opartego na zmiennych środowiskowych, a gdy nie
ustawiono nadpisania, zachowanie jest identyczne jak przy rozstrzyganiu wyłącznie na podstawie zmiennych środowiskowych.

Źródła wykrywania:

1. `sanitizeRequest()` z `@/shared/utils/inputSanitizer` (współdzielony zestaw detektorów
   używany w innych miejscach potoku).
2. Wbudowane `DEFAULT_GUARD_PATTERNS` (obecnie `system_override_inline` i
   `markdown_system_block`, oba o poziomie ważności `high`).
3. Opcjonalne `customPatterns` przekazywane przez opcje konstruktora (ciągi znaków, wyrażenia regularne
   lub rekordy `{ name, pattern, severity }`).

Gdy `mode === "block"` **i** co najmniej jedno wykrycie osiąga próg
ważności, `preCall` zwraca `{ block: true, message: "Request rejected:
suspicious content detected" }`. W trybach `warn`/`log` zabezpieczenie zapisuje zdarzenie w dzienniku, ale
zezwala na wywołanie. Współdzielona funkcja pomocnicza `evaluatePromptInjection()` jest również eksportowana
dla wywołujących, którzy muszą oceniać prompty bez korzystania z rejestru.

**Limit skanowania (v3.8.20):** detektor sprawdza tylko **pierwsze 16 KB**
połączonego tekstu promptu — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajty) w
`src/shared/utils/inputSanitizer.ts`. Zarówno `detectInjection()`, jak i
`evaluatePromptInjection()` wykonują `slice(0, MAX_INJECTION_SCAN_BYTES)` przed uruchomieniem
pętli wzorców. Dyrektywy wstrzyknięcia znajdują się blisko początku danych wejściowych, więc
ogranicza to użycie CPU przez wyrażenia regularne oraz obciążenie GC w przypadku ładunków liczących setki KB bez osłabiania wykrywania (por.
#3932, #4041).

### Maskowanie danych uwierzytelniających (`credentialMasker.ts`)

Działa na **obu** etapach, jako ostatni element domyślnego łańcucha (priorytet `95`). Redaguje
dobrze znane wzorce kluczy API / tajnych tokenów w wychodzącym ładunku (treść
wiadomości, argumenty wywołań narzędzi, wyniki narzędzi) **oraz** w odpowiedzi dostawcy, dzięki czemu
dane uwierzytelniające wklejone do promptu (lub zwrócone przez wynik narzędzia) nie wyciekną
do zewnętrznego dostawcy ani z powrotem do klienta.

- **Wyłącznie po włączeniu**, zgodnie z tą samą konwencją co redagowanie PII (w sąsiedztwie Twardej reguły nr 20):
  wyłączone, chyba że `settings.credentialRedactionEnabled === true` **lub**
  `CREDENTIAL_REDACTION_ENABLED=true`. Gdy funkcja jest wyłączona, zabezpieczenie nie wykonuje żadnych działań —
  nigdy nie blokuje ani niczego nie przepisuje.
- `redactCredentials()` przechodzi przez całe drzewo ładunku/odpowiedzi (`walkValue()`,
  bezpiecznie pod względem zanieczyszczania prototypu, z ochroną przed cyklami za pomocą `WeakSet`) i zastępuje dopasowania
  symbolem zastępczym `[REDACTED:<type>]`, klonując wyłącznie te gałęzie, które
  rzeczywiście uległy zmianie.
- `CREDENTIAL_PATTERNS` obejmuje klucze dostawców LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokeny VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), klucze płatnicze (Stripe, Square), klucze
  chmurowe (klucz dostępu AWS, Twilio, SendGrid, Mailgun), klucze prywatne / JWT,
  ciągi połączeń zawierające dane uwierzytelniające (`mongodb://user:pass@...` itd.) oraz
  ogólny wzorzec wartości nagłówków `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Klucze mające postać nagłówków (`authorization`, `x-api-key`, `api-key`,
  `apikey`) są redagowane strukturalnie (tylko wartość, z zachowaniem prefiksu schematu, takiego jak
  `Bearer `/`Basic `), a nie za pomocą ogólnego tekstowego wyrażenia regularnego.
- Zabezpieczenie nigdy nie blokuje; jedynie przepisuje (`modifiedPayload` /
  `modifiedResponse`) i dodaje adnotacje (`meta.credentialsRedacted`, `meta.count`).

Test chroniący przed regresją: `tests/unit/credential-masker-guardrail.test.ts`.

## Kontrakt bazowy (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // wartość true powoduje natychmiastowe przerwanie łańcucha
  message?: string; // udostępniany w przypadku zablokowania
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // zwracany przez preCall w celu zmodyfikowania żądania
  modifiedResponse?: TValue; // zwracany przez postCall w celu zmodyfikowania odpowiedzi
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Mechanizm zabezpieczający sygnalizuje „brak zmian”, zwracając `void`, `{}` lub
`{ block: false }`. Zwrócenie `modifiedPayload`/`modifiedResponse` zastępuje
wartość przekazywaną dalej w łańcuchu do kolejnych mechanizmów zabezpieczających.
`signal?: AbortSignal` przekazuje cykl życia wywołującego do mechanizmów zabezpieczających. Przerwanie żądania stanowi celowy wyjątek od strategii fail-open: mosty multimedialne przerywają pracę i zwalniają zasoby bez przywracania nieprzetworzonych multimediów dla celu, o którym wiadomo, że ich nie obsługuje.

## Rejestr (`registry.ts`)

Singleton `guardrailRegistry` udostępnia:

- `register(guardrail)` — dodaje (lub zastępuje według znormalizowanej nazwy) zabezpieczenie i
  ponownie sortuje według rosnącego `priority`.
- `clear()` / `list()` — pomocnicze funkcje administracyjne.
- `runPreCallHooks(payload, context)` — iteruje aktywne zabezpieczenia, przekazuje
  `payload` przez `modifiedPayload` i zatrzymuje się przy pierwszym `block: true`.
- `runPostCallHooks(response, context)` — ten sam przepływ po stronie odpowiedzi.
- `resetGuardrailsForTests({ registerDefaults })` — czyści stan i opcjonalnie
  ponownie rejestruje wartości domyślne dla czystej izolacji testów.

Oba uruchamiacze zwracają `{ blocked, payload|response, results, guardrail?, message? }`,
gdzie `results` to tablica rekordów `GuardrailExecutionResult`, które zawierają
pola `blocked`, `skipped`, `modified`, `error` i `meta` dla każdego zabezpieczenia,
przydatne do śledzenia.

### Wyłączanie zabezpieczeń na żądanie

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agreguje
zdeduplikowaną listę nazw zabezpieczeń, które powinny zostać pominięte dla bieżącego
żądania. Źródła (wszystkie opcjonalne, wszystkie połączone):

- `apiKeyInfo.disabledGuardrails`
- Treść żądania `disabledGuardrails` (najwyższy poziom)
- Treść żądania `metadata.disabledGuardrails`
- Nagłówek `x-omniroute-disabled-guardrails` (lub starszy
  `x-disabled-guardrails`)

Wartości mogą być tablicami ciągów znaków lub ciągiem znaków oddzielonych przecinkami; nazwy są
normalizowane do małych liter w formacie kebab-case (`pii_masker` → `pii-masker`). Wynik
jest przekazywany przez `context.disabledGuardrails` do rejestru, który pomija
pasujące zabezpieczenia (`skipped: true` w `results`).

## Kolejność wykonania

Dla każdego żądania przechodzącego przez `src/sse/handlers/chat.ts` oraz
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` buduje listę pomijanych elementów z klucza API, treści (body)
   oraz nagłówków.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` uruchamia mechanizmy zabezpieczające (guardrails) w rosnącym
   porządku priorytetów:
   - Wyłączone zabezpieczenia są rejestrowane jako `skipped`.
   - Metoda `preCall` każdego zabezpieczenia może przepisać ładunek (payload) za pomocą `modifiedPayload`.
   - Pierwsze wystąpienie `block: true` przerywa łańcuch, a obsługa zwraca
     odpowiedź odrzucenia przez mechanizm zabezpieczający.
3. Potencjalnie przepisywany ładunek trafia do routingu hybrydowego (combo routing) oraz
   wysyłki nadrzędnej (upstream dispatch).
4. Po skompletowaniu odpowiedzi, `guardrailRegistry.runPostCallHooks(...)`
   uruchamia ten sam łańcuch dla odpowiedzi. Wystąpienie `block: true` w tym miejscu odrzuca
   odpowiedź nadrzędną.

Zabezpieczenia, które zgłaszają błędy, są rejestrowane z wpisem `error: <message>` i logowane przez
`logger.warn`, ale łańcuch jest kontynuowany — zgodnie z założeniem o otwartości na awarię (fail-open).

## Konfiguracja

Zmienne środowiskowe odczytywane przez wbudowane mechanizmy zabezpieczające:

| Zmienna                               | Używana przez             | Efekt                                                                                                                |
| ------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Ustawienie `false` wyłącza wykrywanie całkowicie.                                                                    |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Polityka wstrzykiwania: `warn`, `block` lub `log`. Starsza wartość `redact` nie modyfikuje tekstu wstrzyknięcia.     |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Tryb dla osłony wstrzyknięć; również flaga funkcji bazy danych, która **nadpisuje** zmienne środowiskowe (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimalny poziom ważności odrzucany przez `MODE=block`: `high` (domyślnie), `medium` lub `low`.                      |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Starszy alias dla `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                 |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Gdy `true`, dane PII w żądaniu są maskowane (niezależnie od trybu wstrzykiwania).                                    |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Steruje zachowaniem maskera po stronie odpowiedzi.                                                                   |

Zabezpieczenia Modality Bridge odczytują konfigurację wykonawczą z magazynu ustawień
opartego na bazie danych (`getSettings()`), a nie ze zmiennych środowiskowych. Kluczami głównymi dla wizji są
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` oraz
`modalityBridgeCacheMaxEntries`. Starsze klucze
`visionBridge*` są akceptowane tylko jako udokumentowane rozwiązanie zapasowe (fallback) odczytu na jeden cykl;
zapisy z panelu sterowania (dashboard) używają kluczy głównych. Wartości domyślne oraz moduł rozstrzygający mechanizm zapasowy znajdują się w
`src/shared/constants/modalityBridgeDefaults.ts`, a starsze stałe są zachowane w
`src/shared/constants/visionBridgeDefaults.ts`.

Audio używa ustawień `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` i `modalityBridgeAudioMaxClips`, a także współdzielonych
ustawień `modalityBridgeCache*`. Audio nie posiada mechanizmu zapasowego dla starszych kluczy, ponieważ te
klucze zostały wprowadzone wraz ze schematem Modality Bridge.

Wideo używa ustawień `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` oraz
`modalityBridgeVideoTimeout`, a także współdzielonych ustawień `modalityBridgeCache*`.
Jest domyślnie wyłączone, ponieważ pakiety FFmpeg/ffprobe są opcjonalnymi zależnościami operacyjnymi,
a tworzenie podpisów klatek (frame captioning) zwiększa opóźnienie oraz koszt modelu.

## Niestandardowe Guardraile

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Kroki:

1.  Utwórz `src/lib/guardrails/myGuardrail.ts` rozszerzający `BaseGuardrail`.
2.  Zaimplementuj `preCall` i/lub `postCall`.
3.  Zarejestruj podczas importu (push z `registerDefaultGuardrails`) lub
    wywołaj `guardrailRegistry.register(...)` w czasie wykonania — rejestr zastępuje
    każdy poprzedni guardrail o tej samej znormalizowanej nazwie.
4.  Dodaj testy w `tests/unit/` (istniejące przykłady:
    `tests/unit/guardrails-registry.test.ts`,
    `tests/unit/prompt-injection-guard.test.ts`,
    `tests/unit/guardrails/visionBridge.test.ts`).

## Testowanie

Użyj `resetGuardrailsForTests()` między testami, aby rozpocząć od znanego stanu.
Przekaż `{ registerDefaults: false }`, aby rozpocząć z pustym rejestrem i
zarejestrować tylko testowane guardraile. Vision Bridge akceptuje wstrzykiwanie zależności
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge udostępnia
równoważne punkty dla ustawień, możliwości, wyboru modelu STT, sprawdzania poświadczeń
i transkrypcji. Testy mogą zatem ćwiczyć oba przepływy bez dostępu do bazy danych
lub sieci.

## Zobacz także

- `src/lib/guardrails/` — implementacja
- `src/shared/utils/inputSanitizer.ts` — współdzielony detektor, który zasila
  ochronę przed wstrzykiwaniem promptów i maskowanie PII
- `src/shared/constants/visionBridgeDefaults.ts` — domyślne ustawienia Vision Bridge i
  lista modeli wymuszonego mostkowania
- `src/shared/constants/modalityBridgeDefaults.ts` — współdzielone domyślne ustawienia środowiska wykonawczego Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — warstwa ortogonalna (wyłącznik obwodu, czasy odnowienia)
- `docs/reference/ENVIRONMENT.md` — pełne odniesienie do zmiennych środowiskowych

## Pokrycie tras przez injection-guard i red-team (Faza 8 · Blok D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) obejmuje wszystkie trasy,
które akceptują prompty użytkownika. Szanuje `INJECTION_GUARD_MODE` (domyślnie `warn` = tylko logowanie;
`block` = zwraca HTTP 400 `SECURITY_001`).

| Typ                | Trasy                                                                                                                                                | Tryb domyślny |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Tekst (istniejący) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Generatywny        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Dane               | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Ekstrakcja tekstu (`extractMessageContents`) obejmuje `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nocne, `nightly-llm-security.yml`):** promptfoo waliduje, że każda trasa blokuje
korpus OWASP-LLM w `INJECTION_GUARD_MODE=block`; garak uruchamia sondy (pomija bez sekretu).
`moderations` jest uwzględnione dla spójności — operatorzy w trybie blokowania mogą je wyłączyć za pomocą
`resolveDisabledGuardrails`.

Nocny workflow (`.github/workflows/nightly-llm-security.yml`, cron + ręczne
uruchamianie) ma dwa zadania:

- **`promptfoo-guard` (blokujące)** — uruchamia `promptfoo eval -c promptfooconfig.yaml`
  z `INJECTION_GUARD_MODE=block`. Każdy przypadek adversarialny (np. "ignoruj wszystkie
  poprzednie instrukcje...", jailbreaki w stylu DAN) potwierdza, że odpowiedź zawiera
  `error.code === "SECURITY_001"`, tzn. że guard faktycznie odrzucił żądanie.
- **`garak` (doradcze)** — uruchamia garak `--probes promptinject,dan,leakreplay`
  przeciwko lokalnej instancji OmniRoute (`http://localhost:20128/v1`). Zależne od
  sekretu dostawcy (`PROMPTFOO_PROVIDER_KEY`); pomija się elegancko i jest sufiksowane
  `|| true`, więc raportuje bez powodowania błędu CI.

Pokrycie pomocnika guard (`createInjectionGuard` / `withInjectionGuard`)
obejmuje każdą trasę `/v1` zawierającą prompt; tekst promptu jest pobierany z
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` przez
`extractMessageContents()` w `src/shared/utils/inputSanitizer.ts`.
