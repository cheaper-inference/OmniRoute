# Guardrails (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Źródło prawdy:** `src/lib/guardrails/`
> **Ostatnia aktualizacja:** 2026-10-17 — v3.8.52 (dodano [Pokrycie i ograniczenia](#coverage-and-limits):
> które trasy i ścieżki odpowiedzi obejmują hooki, scalone nagłówki wyłączające (#16412), tryb blokowania
> wstrzykiwań jako obowiązkową granicę (#16413) oraz co widzi odpowiedź przed post-call)

Guardraile wymuszają bezpieczeństwo, polityki i transformacje treści na granicy
między OmniRoute a dostawcami upstream. Każdy guardrail może sprawdzać (i
opcjonalnie odrzucać, transformować lub adnotować) ładunki żądań (`preCall`)
oraz odpowiedzi upstream (`postCall`).

System działa w trybie **fail-open**: jeśli guardrail rzuci wyjątek podczas
wykonywania, rejestr zapisuje błąd i kontynuuje z następnym guardrailem, zamiast
przerywać żądanie. Blokowanie jest jawną decyzją (`block: true`), nigdy
przypadkiem. Jedynym wyjątkiem jest przerwane żądanie: gdy `signal`
wywołującego zostanie przerwany, rzucający wyjątek guardrail odrzuca uruchomienie
hooka, zamiast zostać pominiętym.

Hooki **nie** uruchamiają się na każdej trasie ani dla każdej odpowiedzi.
Przeczytaj [Pokrycie i ograniczenia](#coverage-and-limits), zanim zaczniesz
polegać na guardrailu jako mechanizmie bezpieczeństwa.

## Wbudowane guardraile

Rejestr automatycznie ładuje sześć guardraili w kolejności priorytetów przy
imporcie (zobacz `registry.ts` → `registerDefaultGuardrails()`):

| Priorytet | Nazwa               | Etap(y)        | Plik                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Niższe numery priorytetów uruchamiają się **jako pierwsze**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Model bazowy GLM 5.3 oraz `glm-5.3-{low,high,max}` mają jawnie ustawione
metadane rejestru/specyfikacji `supportsVision:false`. Warianty GLM 5.3 Flash
pozostają modelami natywnie obsługującymi wizję. Trasa `/v1/messages` Claude
Code wchodzi do współdzielonego łańcucha guardraili pre-call `handleChat`
**przed** tłumaczeniem Claude-na-OpenAI; zagnieżdżone obrazy z wyników narzędzia
`Read` muszą zostać opisane lub obsłużone, zanim to tłumaczenie przeniesie je
do treści OpenAI `image_url` (#17069).

Przechwytuje żądania zawierające obrazy, skierowane do **modeli bez obsługi
wizji**, i albo przekierowuje całe żądanie do modelu obsługującego wizję, albo
zastępuje części z obrazami opisami tekstowymi generowanymi przez
konfigurowalny model wizyjny przed wywołaniem upstream. Pozwala to dostawcom
obsługującym wyłącznie tekst transparentnie obsługiwać ładunki multimodalne.

Przepływ:

1. Pomiń, jeśli model docelowy już obsługuje wizję (chyba że występuje na liście
   wymuszonego mostu `isVisionBridgeForcedModel`).
2. Wyodrębnij części z obrazami za pomocą `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), która deleguje do **zunifikowanego detektora
   mediów** `detectMediaParts()` w `open-sse/utils/mediaParts.ts` — jedynego
   źródła prawdy współdzielonego z filtrem zgodności combo. Ekstrakcja jest
   ograniczona listą dozwolonych do kształtów, które `replaceImageParts` może
   wstawić z powrotem (kontrakt extract↔replace): OpenAI `image_url`, Anthropic
   base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` oraz
   Responses API `input_image`. Pasujące obrazy zagnieżdżone wewnątrz
   `tool_result.content` Claude Code i wyników narzędzi Responses również są
   wyodrębniane i zastępowane w ich oryginalnych ścieżkach; kształty czysto
   wskaźnikowe są materiałem dla filtra combo i nie są wyodrębniane.
   Pomiń, jeśli nic nie znaleziono.
3. Rozwiąż konfigurację środowiska uruchomieniowego za pomocą
   `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nowe klucze ustawień
   `modalityBridge*` mają pierwszeństwo; starsze klucze `visionBridge*` pozostają
   **awaryjnym wariantem na jeden cykl** (okno wycofania). Pomiń przed
   jakimkolwiek przechodzeniem po mediach, gdy most jest wyłączony.
4. Selektor trybu (`modalityBridgeVisionMode`, zobacz tabelę poniżej) decyduje
   o przekierowaniu vs opisaniu. Przekierowanie zwraca `modifiedPayload` tylko
   z podmienionym `model`, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ścieżka opisywania: ogranicz liczbę obrazów do `maxImages`, zbuduj prompt
   uwzględniający zadanie, sprawdź pamięć podręczną opisów, wywołaj model
   wizyjny **równolegle** (`Promise.allSettled`) i wstrzyknij w ich miejsce
   części tekstowe `[Image N]: <description>`. Nieudany opis zwraca `null`:
   surowy obraz jest zachowywany dla nieznanych/wizyjnych celów (#4012), ale
   **potwierdzony cel bezpośredni wyłącznie tekstowy** lub combo bez wizji
   otrzymuje jawny zastępczy tekst
   `(unavailable — no vision-capable provider connected)` dla każdego
   nieopisanego obrazu, w tym przy częściowych niepowodzeniach i obrazach
   powyżej limitu wywołań opisywania (#17069). Istniejące zabezpieczenie
   awaryjne combo przy niepowodzeniu wszystkich opisów pozostaje na miejscu
   (#8430).
6. Zwróć `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selektor trybu (`modalityBridgeVisionMode`)

| Tryb       | Domyślnie | Zachowanie                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔         | Dotychczasowa heurystyka, bez zmian (#6640/#7204): modele niebędące combo/`auto/` są przekierowywane do najlepszego modelu wizyjnego, chyba że oryginalny model ma już użyteczne dane uwierzytelniające (wtedy describe); cele combo zawsze wykonują describe.                                                                                                      |
| `describe` |           | Zawsze describe — blok przekierowania jest całkowicie pomijany; model wybrany przez użytkownika zawsze odpowiada.                                                                                                                                                                                                                                                   |
| `reroute`  |           | Wymuś przekierowanie: zabezpieczenie zachowujące model z danymi uwierzytelniającymi jest obchodzone. Zabezpieczenie danych uwierzytelniających **celu** przekierowania nadal obowiązuje — gdy nie istnieje użyteczny cel wizyjny, most blokuje żądanie czytelnym błędem zamiast wykonywać describe lub wysyłać surowe obrazy do celu obsługującego wyłącznie tekst. |

Tryby wymuszone przerywają przetwarzanie **przed** uruchomieniem heurystyki auto;
zachowanie `auto` jest identyczne co do bajtu z zabezpieczeniem sprzed PR-1.

#### Zakres klucza API (`visionBridgeKeyScope.ts`)

Gdy klucz API wywołującego ogranicza `allowedConnections`, pule limitów
(`allowedQuotas`) lub modele (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), most wybiera
wyłącznie modele przekierowania i describe, których klucz może używać, na
połączeniach, których klucz może używać. Wywołanie describe zawsze przechodzi
następnie przez pętlę zwrotną (self-loop) OmniRoute z nagłówkiem
`x-omniroute-self-loop-key-id`, więc odbierające żądanie czatu ponownie wymusza
politykę połączeń i modeli tego klucza. `enforceApiKeyPolicy()` respektuje ten
nagłówek tylko w połączeniu z tokenem bearer pętli zwrotnej, więc może jedynie
zawęzić dostęp, a identyfikator, którego nie można rozpoznać, jest odrzucany.

Jeśli dla klucza nie jest dozwolony żaden model wizyjny, **potwierdzony cel
obsługujący wyłącznie tekst** odrzuca żądanie obrazu lokalnie czytelnym błędem
HTTP 400 zamiast przekazywać bajty obrazu do upstreamu, który ich nie obsługuje
(#17069). Dla celów o nieznanej lub natywnej zdolności wizyjnej ścieżka describe
zachowuje dotychczasowe zachowanie fail-open (meta
`{ skipped: true, reason: "no_permitted_vision_model" }`). Żądania bez klucza
oraz klucze bez tych ograniczeń zachowują się dokładnie tak jak wcześniej.

#### Prompt describe uwzględniający zadanie (`modalityBridgeVisionTaskAware`)

Domyślnie **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dołącza
tekst **ostatniej wiadomości użytkownika** (obcięty do 500 znaków) do
podstawowego promptu describe, ukierunkowując opis na to, o co użytkownik
faktycznie zapytał (wzorzec codex-vision-proxy), i prosząc model wizyjny o
transkrypcję widocznego tekstu. Przy wyłączonej fladze — lub braku tekstu
użytkownika — podstawowy prompt jest używany bez zmian.

Własne żądanie zgodne z OpenAI w pętli zwrotnej describe
(`callVisionModelSingle()` w `visionBridgeHelpers.ts`) zawsze żąda
`image_url.detail: "high"` — bezwarunkowo, dla każdego wywołującego/dostawcy,
niezależnie od jakiegokolwiek sygnału klienta. Próbkowanie o niskiej
szczegółowości obniża dokładność OCR dokładnie w zadaniu transkrypcji tekstu,
o które prosi ten prompt, więc samo wywołanie describe zawsze żąda wysokiej
szczegółowości, niezależnie od poziomu szczegółowości użytego w oryginalnym
żądaniu przychodzącym. Dotyczy to wyłącznie treści wewnętrznego żądania
describe; nie zmienia to sposobu, w jaki OmniRoute przekazuje własne
`image_url.detail` wywołującego w żądaniu głównym — ta wartość domyślna jest
stosowana osobno i tylko dla wykrytych klientów OpenCode, w
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Gałąź
formatu sieciowego Anthropic w pętli zwrotnej describe nie ma pola `detail` i
nie podlega żadnej z tych wartości domyślnych.

#### Limit długości wyniku describe (`modalityBridgeVisionMaxChars`)

| Klucz                          | Domyślnie | Zakres            |
| ------------------------------ | --------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`       | `0` lub 100–50000 |

`0` (domyślnie) oznacza **brak limitu** — opis zwrócony przez
`callVisionModel()` jest przekazywany bez zmian, zachowując dotychczasowe
zachowanie. Każda wartość z zakresu 100–50000 obcina opis z sufiksem `…`,
zanim zostanie wstawiony z powrotem jako `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` w `src/lib/guardrails/visionBridge.ts`).
Zwiększ tę wartość dla zadań OCR wymagających dużej szczegółowości, gdzie model
docelowy potrzebuje pełnej transkrypcji; zmniejsz ją, aby ograniczyć zużycie
tokenów przez gadatliwe modele wizyjne. Pole panelu znajduje się w panelu
Zaawansowane zakładki Vision (`modality-bridge-max-chars` w
`ModalityBridgeVisionTab.tsx`) i podnosi każdą wartość z zakresu 1–99 do progu
100, pozostawiając jawne `0` bez zmian — `0` jest samodzielnie prawidłową
wartością Zod (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`),
a nie tylko „nieustawioną" wartością domyślną.

#### Pamięć podręczna describe (`modalityBridge/bridgeCache.ts`)

Pamięć podręczna LRU + TTL w pamięci operacyjnej dla wyników describe,
współdzielona w całym procesie. Klucz =
`sha256(imageRef + composedPrompt + configuredBridgeModel)` z ramkowaniem z
prefiksem długości (brak kolizji na granicach pól). Składnikiem modelu jest
**skonfigurowany** model mosta, a nie model, który faktycznie odpowiedział —
`callVisionModel` może wewnętrznie przełączyć się na model zapasowy, a
kluczowanie według prób fragmentowałoby pamięć podręczną. Nieudane wywołania
describe nigdy nie są buforowane. Ustawienia:

| Klucz                           | Domyślnie | Zakres  |
| ------------------------------- | --------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`    | —       |
| `modalityBridgeCacheTtlMinutes` | `60`      | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`     | 10–5000 |

#### Normalizacja zdalnych obrazów (pobieranie self-loop describe/base64)

Gdy most samodzielnie pobiera **zdalny** obraz — samowywołanie describe
Anthropic oraz konwersję base64 formatu claude-wire
(`ensureBase64ImagesForClaudeWire`), oba przez
`fetchRemoteImageAsDataUri()` w `visionBridgeHelpers.ts` — powstały data
URI jest przepuszczany przez `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`), zanim zostanie osadzony w żądaniu
modelu wizyjnego. Zbyt duże obrazy są zmniejszane do **dłuższej krawędzi
2048px** (co odpowiada limitowi skalowania, który OpenAI/Anthropic już
stosują po stronie serwera), co redukuje liczbę przesyłanych bajtów i
opóźnienie, nie zmieniając tego, co widzi model wizyjny. Skalowanie
korzysta z `sharp`, ładowanego przez dynamiczny import: na platformie,
gdzie nie udaje się załadować jego natywnego pliku binarnego,
`normalizeDataUri()` **nigdy nie rzuca wyjątku** — przechodzi do
przekazania oryginalnych bajtów bez zmian, więc ścieżka
describe/konwersji base64 zawsze działa. Bajty niebędące obrazami
(pobranie, które nie zwróciło dekodowalnego obrazu) również są
przekazywane bez zmian. Ta normalizacja jest ograniczona do obrazów,
które most pobiera na potrzeby własnego samowywołania — nigdy nie jest
stosowana do surowego ładunku passthrough wywołującego, zgodnie z zasadą
modyfikacji wyłącznie opt-in (Twarda Zasada nr 20).

#### Schemat ustawień + migracja

Nowe klucze `modalityBridge*` są walidowane przez Zod w
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trio
`modalityBridgeCache*` oraz grupa `modalityBridgeAudio*` używana przez
Audio Bridge. Migracja `141_modality_bridge_settings.sql` kopiuje
istniejące starsze wartości `visionBridge*` do odpowiadających im nowych
kluczy (idempotentnie, nigdy nie nadpisuje wartości `modalityBridge*`
ustawionej przez operatora); stare klucze pozostają akceptowane jako
awaryjny odczyt przez jeden cykl wydania.

#### Nagłówek transparentności + statystyki

Odpowiedzi przekształcone przez describe zawierają
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(budowany przez `buildModalityBridgeHeader()` w
`modalityBridge/bridgeStats.ts`, dołączany przez
`withModalityBridgeHeader()` w `src/sse/handlers/chatHelpers.ts`).
Żądania przekierowane **nie** otrzymują nagłówka — ładunek pozostał
nietknięty, a podmiana modelu jest już widoczna w polu `model` treści
odpowiedzi.

`GET /api/modality-bridge/stats` (uwierzytelnianie zarządcze, ten sam
poziom co `GET /api/settings`) zwraca przechowywane w pamięci liczniki
per modalność `{ attempts, successes, bridged, cacheHits, failures,
totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` dla
`vision`, `audio` i `video`. `averageLatencyMs` używa jako mianownika
`latencySamples`, a nie wszystkich prób; operacja bez pomiaru czasu nie
fabrykuje próbki o zerowym czasie. `bridged` pozostaje wstecznie
kompatybilnym aliasem udanych konwersji; nieudane próby go nie
zwiększają. Liczniki resetują się przy restarcie procesu z założenia
(telemetria, nie księgowość).

#### Konfiguracja dashboardu

Dedykowana strona dashboardu to `/dashboard/settings/modality-bridge`.
Jej adresowalne przez URL karty `Vision`, `Audio` i `Video` zachowują
parametry zapytania podczas przełączania wartości `tab`. Karta Vision
udostępnia włączanie, tryb, wybór modelu (w tym automatyczny domyślny),
promptowanie zależne od zadania, zaawansowane limity
timeoutu/obrazów/długości opisu/pamięci podręcznej, liczniki runtime
oraz strzeżone przykładowe żądanie. Karta Audio również jest aktywna:
udostępnia włączanie, selektor modeli wyłącznie STT z opcją Auto, limity
timeoutu/maksymalnej długości klipu, liczniki audio oraz przykładowy
test `input_audio`. Karta Video jest funkcjonalna: raportuje stan
środowiska FFmpeg/ffprobe — jeden z czterech wyraźnych stanów UI
(`unknown`, gdy sonda jest w toku lub nie mogła się zakończyć,
`restricted` na hoście dashboardu innym niż loopback, gdzie sonda jest
pomijana po stronie klienta, `unavailable` po sondowaniu i potwierdzeniu
braku, lub `available` z wersjami FFmpeg/ffprobe) — zapisuje limity
włączenia/modelu/klatek/wideo/timeoutu, filtruje selektor modeli do
modeli z obsługą wizji i udostępnia liczniki wideo.

Dawna karta Vision Bridge w ustawieniach AI jest linkiem kompatybilności
do nowej strony; nie posiada już drugiej kopii formularza. Media
Providers również linkuje przepływy pracy Image-to-Text i
Speech-to-Text do odpowiednich kart Modality Bridge, nie usuwając
istniejącego placu zabaw Speech-to-Text.

**Obejście kontroli dostępu self-loop:** gdy wywołanie describe jest
kierowane przez własny self-loop `/v1` OmniRoute (niestandardowy model
dostawcy), podżądanie wysyła `x-omniroute-admission-bypass: internal` i
jest uwierzytelniane rozstrzygniętym poświadczeniem self-loop —
lokalnym wartownikiem `sk_omniroute` w trybie lokalnym lub
skonfigurowanym przez operatora kluczem środowiskowym `OMNIROUTE_API_KEY`
/ `ROUTER_API_KEY` (#1350), aby wdrożenia z `REQUIRE_API_KEY=true` nadal
mogły wykonywać wywołanie describe. Obejście jest honorowane tylko dla
dokładnie tych poświadczeń, więc zewnętrzni klienci nie mogą użyć
nagłówka do pominięcia kontroli dostępu.

Starsze wartości domyślne znajdują się w
`src/shared/constants/visionBridgeDefaults.ts`; nowe wartości domyślne
trybu/task-aware/pamięci podręcznej oraz resolver ustawień znajdują się
w `src/shared/constants/modalityBridgeDefaults.ts`. Guardrail
udostępnia opcję konstruktora `deps`, aby testy mogły wstrzykiwać
fałszywe implementacje `getSettings` i `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Przechwytuje żądania czatu zawierające audio, zanim dotrą do celu, o
którym nie wiadomo, że akceptuje wejście audio. Nigdy nie przekierowuje
żądania czatu: części audio są transkrybowane przez istniejący endpoint
multipart zgodny z OpenAI, a wybrany model czatu kontynuuje pracę z
tekstowymi transkrypcjami.

Przepływ:

1. Ustal `supportsAudio` za pomocą `getResolvedModelCapabilities()`. Pierwszeństwo mają jawne metadane rejestru dostawców, następnie statyczne metadane modelu, a potem zsynchronizowane `modalities_input`. Zadeklarowana lista wejść bez `audio` daje `false`; brak dowodów na możliwości pozostaje `null`. Zarówno `false`, jak i `null` aktywuje zachowawczy mostek, natomiast `true` go omija.
2. Ustal ustawienia `modalityBridgeAudio*` i wyodrębnij z każdej wiadomości nadające się do podmiany części audio najwyższego poziomu za pomocą współdzielonego detektora `detectMediaParts()`. Obsługiwane formaty przesyłowe to OpenAI `input_audio`, `audio_url` oraz `source.media_type: "audio/*"`. Zagnieżdżone audio jest wykrywane na potrzeby routingu, ale nie jest usuwane przez ścieżkę podmiany. Praca jest ograniczona przez `modalityBridgeAudioMaxClips`; późniejsze części pozostają nietknięte.
3. Uwzględnij skonfigurowany `provider/model` albo pozwól, aby `selectAudioBridgeModel()` przeszedł przez `AUDIO_TRANSCRIPTION_PROVIDERS` w stabilnej kolejności katalogowej i wybrał pierwszy model z użytecznym, aktywnym poświadczeniem dostawcy.
4. `callAudioTranscription()` konwertuje audio base64/data-URI na multipart `file` lub pobiera zdalny `audio_url` przez zaporę wychodzącą ograniczoną do adresów publicznych, z przypięciem DNS i limitem 25 MB. Następnie wysyła metodą POST plik i wybrany model do lokalnej pętli zwrotnej `/v1/audio/transcriptions`, z uwierzytelnieniem przez `resolveSelfLoopBearer()`. Istniejąca trasa transkrypcji wykonuje normalne wyszukiwanie poświadczeń, obsługę cooldown/limitów szybkości oraz dyspozycję do dostawcy.
5. Udane wywołania zastępują swoje części treścią `[Audio N]: <transcript>`. Wywołania są wykonywane z `Promise.allSettled`: pojedyncze niepowodzenie zachowuje daną oryginalną część audio (kontrakt #4012). Jeśli wszystkie wywołania się nie powiodą, a cel ma udowodnione `supportsAudio === false`, części przyjmują postać `[Audio N]: (unavailable — no STT provider connected)` (kontrakt #8430). Dla nieznanego celu (`null`) wynik złożony z samych niepowodzeń pozostaje nietknięty. Udowodniony cel wyłącznie tekstowy bez użytecznego poświadczenia STT otrzymuje ten sam jawny zastępnik bez wykonywania wywołania sieciowego.

Udane transkrypcje korzystają z ogólnoprocesowej pamięci podręcznej LRU/TTL Modality Bridge. Klucz łączy odniesienie do audio, stabilną etykietę operacji `audio-transcription` oraz wybrany model STT; niepowodzenia nigdy nie są buforowane. Próby audio aktualizują współdzielone liczniki `bridged`, `cacheHits`, `failures` i `lastUsedAt`. Przekształcone odpowiedzi zawierają `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nietknięte żądania nie otrzymują segmentu Audio Bridge.

Ustawienia środowiska uruchomieniowego są przechowywane w bazie danych i walidowane przez Zod:

| Klucz                         | Wartość domyślna | Zakres          |
| ----------------------------- | ---------------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`           | —               |
| `modalityBridgeAudioModel`    | `""`             | Auto lub ID STT |
| `modalityBridgeAudioTimeout`  | `60000`          | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`              | 1–10            |

Współdzieloną pamięcią podręczną nadal sterują `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` oraz `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Przechwytuje części wideo najwyższego poziomu w `messages` Chat Completions oraz `input` Responses API, zanim zostanie wywołany cel bez znanej natywnej obsługi wideo. Obsługiwane formy to `input_video`, `video_url`, `video_source`, adresy URL HTTPS oraz identyfikatory URI danych `data:video/*;base64,...`. Zwykłe nazwy plików w tekście nie są traktowane jako wideo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) odpowiada za przechodzenie po żądaniu, sprawdzenie możliwości/polityki, agregację w obrębie żądania oraz ładunek odpowiedzi. Praca na poziomie pojedynczego wideo — pozyskanie, pamięć podręczna pełnego wyniku, opisanie sekwencji klatek (które łączy dowolną zadeklarowaną przez wywołującego transkrypcję audio) oraz metryki/przerwanie/sprzątanie dla każdej próby — jest ukryta za `processVideoPart` w `videoBridgePipeline.ts`, wywoływanym raz na część wideo w pętli `preCall`. Moduł ten definiuje również jawne granice portów `VideoMediaBrokerPort` (pozyskiwanie bajtów i wyodrębnianie próbkowanych klatek), `VideoAudioTranscriptionPort` (łączenie zadeklarowanej przez wywołującego transkrypcji audio z podpisami próbkowanych klatek) oraz `VideoDrilldownPort` (granica trwałości drill-down klatek; nie jest jeszcze podłączona do `processVideoPart` — obecnie tylko osobna trasa `/api/modality-bridge/video/drilldown` zapisuje wpisy drill-down).

Publiczna ścieżka żądań `/v1` nigdy nie importuje ani nie wywołuje podprocesu. Zdalne wideo jest pobierane z limitem 50 MiB; wideo inline base64 ma zachowawczy limit 36 MiB po dekodowaniu na jedno wideo, tak aby koperta obejmująca model, wiadomości i ramkowanie mogła pozostać w granicach publicznego limitu dopuszczania żądań JSON wynoszącego 50 MiB. Długość inline oraz szacunki rozmiaru po dekodowaniu są sprawdzane przed alokacją. Protokół HTTPS jest wymagany dla początkowego zdalnego adresu URL i każdego przekierowania, z użyciem istniejącej zapory wychodzącej ograniczonej do adresów publicznych z przypięciem DNS. Bajty przechodzą następnie przez ścisłą wewnętrzną granicę brokera `POST /api/modality-bridge/video/extract`. Trasa ta jest jednocześnie `LOCAL_ONLY` i `SPAWN_CAPABLE`, akceptuje wyłącznie żądanie uwierzytelnione w obrębie procesu z zaufanego loopback i nigdy nie akceptuje adresu URL, ścieżki systemu plików, pliku wykonywalnego ani listy argumentów. Potok rozmiaru treści API oraz przyrostowy czytnik treści procedury obsługi niezależnie wymuszają limit wejścia brokera wynoszący 50 MiB. Jej ograniczona kolejka wykonuje jedną ekstrakcję naraz, dopuszcza cztery oczekujące zadania i ogranicza oczekujące wejście do 100 MiB.

Wewnątrz brokera `ffprobe` odczytuje prywatny plik lokalny; stała lista dozwolonych formatów wyklucza formaty playlist i manifestów. W przypadku dozwolonych kontenerów z rodziny MOV zewnętrzne odwołania do danych MOV pozostają domyślnie wyłączone, a stałe polecenie ich nie włącza. Zarówno `ffprobe`, jak i `ffmpeg` korzystają z listy dozwolonych protokołów ograniczonej do `file`, jednego wątku, stałych tablic argumentów, bez powłoki, a pliki wykonywalne są rozpoznawane z `PATH`. Strumienie z osadzoną okładką (attached picture) nie są kandydatami do odtwarzania. Wszystkie strumienie nadające się do odtwarzania muszą spełniać limity, a jawny strumień domyślny ma pierwszeństwo przed deterministycznym wyborem strumienia o najniższym indeksie. Materiały wideo są ograniczone do 600 sekund, 8 192 pikseli na wymiar oraz 33 554 432 pikseli źródłowych. FFmpeg próbkuje 1–16 środkowych klatek JPEG, zmniejsza dłuższą krawędź do maksymalnie 1 024 pikseli bez powiększania mniejszych wejść i nigdy nie otrzymuje adresu URL. Domyślnym trybem próbkowania jest `uniform`. Opcjonalna polityka `scene_aware` oraz eksperymentalna polityka `segment_aware` wykonują jedno dodatkowe, stałe przejście FFmpeg nad już zweryfikowanym lokalnym strumieniem, wybierają ograniczone znaczniki czasu scen z `showinfo` i w razie awarii detektora, przekroczenia limitu czasu, nieprawidłowego wyniku lub pustego zbioru kandydatów deterministycznie wracają do tych samych jednolitych punktów środkowych. Tryb segment-aware przydziela próbki punktów środkowych proporcjonalnie do zweryfikowanych interwałów scen; dane pomiarowe trybu segment-aware oraz zachowanie awaryjne opisano szczegółowo poniżej. Twardy limit 16 klatek jest stosowany po selekcji w każdej polityce. Gdy żądanie scene-aware ma budżet tylko jednej klatki, używa jednolitego punktu środkowego aktywnego okna pełnego wideo lub okna skupienia i zgłasza `policyEffective: uniform`: pojedyncza wybrana klatka sceny nie może zachować obu krańców czasowych. Wywołujący może opcjonalnie podać skończone okno skupienia (sekundy `start`/`end`); granice są przycinane do czasu trwania multimediów, odwrócone lub nieskończone okna są odrzucane, a wszystkie polityki próbkowania są wykonywane wyłącznie wewnątrz znormalizowanego przedziału. Wynikowe okno jest dołączane do metadanych próbkowania oraz do prefiksu niezaufanego opisu, aby modele dalszego przetwarzania mogły odróżnić skupiony fragment od pełnej osi czasu.

Semantyczne skupienie podpisów to osobne, jawne ustawienie. Domyślny tryb analizy `full` zachowuje istniejący prompt klatki i nigdy nie przekazuje tekstu żądania do modelu generującego podpisy. W trybie `focused` mostek odczytuje wyłącznie najnowszy niepusty, pochodzący od użytkownika `text`/`input_text` z tego samego kontenera Chat lub Responses, normalizuje go do NFC, zwija znaki sterujące i białe znaki oraz ogranicza go do 500 punktów kodowych Unicode. Pusty wynik powoduje powrót do dokładnego promptu `full`. Użyteczna wskazówka jest serializowana jako JSON w dedykowanym bloku niezaufanego kontekstu użytkownika i może jedynie priorytetyzować obserwowalne szczegóły; nie może nadpisać osobnego ostrzeżenia przed wykonywaniem instrukcji widocznych lub słyszalnych w multimediach. Skupienie tekstowe nigdy nie wyprowadza `start`/`end` ani nie zmienia próbnika czasowego.

#### FU-07 strukturalne dane pomiarowe segmentów

`segment_aware` wykorzystuje jedno ograniczone przejście wstępnej analizy nad już zweryfikowanym lokalnym strumieniem wideo. Stały łańcuch filtrów najpierw skaluje obraz do szerokości maksymalnie 320 pikseli, wykrywa zmiany scen i zamrożone interwały, a następnie próbkuje z częstotliwością 1 klatki na sekundę pod kątem rozmycia, średniej luminancji oraz informacji przestrzennej/czasowej. Przejście jest ograniczone do 600 próbek strukturalnych, jednego wątku FFmpeg/filtrów, tych samych list dozwolonych protokołów ograniczonych do `file` oraz kontenerów, granicy 1 MiB wyjścia procesu i maksymalnie 30 sekund w ramach wspólnego limitu przerwania/terminu brokera. Nigdy nie przyjmuje polecenia, filtra, ścieżki ani adresu URL z żądania.

Wartości strukturalne są deterministycznymi danymi pomiarowymi próbkowania, a nie semantycznym rozumieniem wideo. Nie wnioskują o tematach, działaniach, podpisach, mowie ani intencjach użytkownika. Granice scen i zamrożeń tworzą segmenty; pokrycie zamrożenia, rozmycie, ekspozycja, szczegółowość przestrzenna i zmiana czasowa wpływają jedynie na sposób przydziału istniejącego budżetu 1–16 klatek. W pełni zamrożony segment jest ograniczony do jednej klatki, podczas gdy segmenty niezamrożone konkurują o pozostały budżet. Gdy granic jest więcej niż klatek, zachowane zostaje jednolite pokrycie osi czasu, aby szybkie wczesne cięcia nie mogły ukryć długiego końcowego segmentu. Granice scen znajdujące się w obrębie 1-sekundowej rozdzielczości analizy od granicy zamrożenia są łączone.

Brakujące filtry, nieprawidłowe/puste dane pomiarowe, błąd detektora lub przekroczenie ograniczonego limitu czasu wstępnej analizy powodują awaryjne przejście (fail open) do dokładnej polityki jednolitych punktów środkowych. Przerwanie przez wywołującego lub termin brokera nie powoduje przejścia fail-open: przerywa trwający podproces, uniemożliwia późniejszą ekstrakcję klatek, a prywatne drzewo katalogów tymczasowych jest usuwane w `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministyczne, rzeczywiste fixture'y FFmpeg dla oszczędności wywołań podpisów po deduplikacji, przydziału budżetu przy gęstym ruchu, danych pomiarowych rozmycia/ekspozycji/SI-TI, szybkich cięć z długim ogonem oraz fałszywie dodatnich wyników dla stopniowych przeniknięć (fade). Rejestruje czas rzeczywisty wstępnej analizy oraz — tam, gdzie dostępny jest `/usr/bin/time` — czas CPU procesu potomnego i szczytowe RSS. Jego kontrole jakości są wyłącznie wyroczniami strukturalnymi. Rzeczywista jakość modelu podpisów pozostaje w stanie `HOLD`, ponieważ to środowisko testowe nie ma autoryzowanego punktu końcowego ani zamrożonego sędziego. Oszczędności pieniężne również pozostają w stanie `HOLD`, chyba że `--caption-cost-per-call-usd` dostarczy jawnie dodatni szacunek kosztu na wywołanie; skrypt nigdy nie zmyśla żadnego z tych wyników.

Każda klatka jest ograniczona do 4 MiB, wszystkie surowe klatki łącznie do 23 MiB, a zserializowana odpowiedź brokera do 32 MiB. Prywatny katalog tymczasowy jest usuwany w `finally`. OmniRoute nie zawiera w pakiecie FFmpeg i nie akceptuje niestandardowej ścieżki pliku wykonywalnego. Przed generowaniem podpisów most stosuje konserwatywny etap wizualnej deduplikacji: każdy plik JPEG jest redukowany do bufora w skali szarości 16×16 i porównywany wyłącznie z ostatnią zachowaną klatką. Dla żądanego budżetu podpisów powyżej jednej klatki ekstrakcja dostarcza ograniczoną pulę kandydatów wynoszącą maksymalnie dwukrotność tego budżetu i nigdy więcej niż 16 klatek. Żądany limit jest stosowany dopiero po deduplikacji, przy czym pierwszy i ostatni wybrany kandydat są zachowywani podczas końcowego przerzedzania, gdy budżet wynosi co najmniej dwa. Wersjonowana polityka `grayscale-16x16-mean-cells-v2` używa większej z dwóch wartości: średniej różnicy luminancji oraz odsetka komórek miniatury, których znormalizowana różnica wynosi co najmniej 0.05. Próg duplikatu stanowi stała 0.04, wybrana dla przewidywalności, a nie udostępniana jako ustawienie wykonawcze. Ten drugorzędny sygnał wysokiego kontrastu zachowuje niewielkie ruchy i zmiany widocznego tekstu, które porównanie oparte wyłącznie na średniej może ukryć. Błędy komparatora lub dekodera działają w trybie fail-open i zachowują pokrycie. Metadane wyjściowe rozdzielają wyodrębnionych kandydatów, pomyślnie użyte klatki oraz odrzucone duplikaty wizualne.

Jawnie oznaczona część wideo może zażądać arkusza kontaktowego ze znacznikami czasu. Most buduje co najwyżej 4-kolumnową, 16-klatkową siatkę JPEG. Każda komórka o rozmiarze 512 pikseli wypala swój źródłowy znacznik czasu w wysokokontrastowym dolnym pasie, podczas gdy te same znaczniki czasu pozostają w metadanych tekstowych na potrzeby późniejszego powiązania i audytu. Kompletny plik JPEG pozostaje ograniczony do 32 MiB. Jeśli `sharp` nie może zdekodować ani złożyć siatki, most wraca do pojedynczych klatek JPEG; przerwanie po stronie klienta nadal propaguje przez operację arkusza.

Dowody promocji są celowo oddzielone od syntetycznego mikrobenchmarku kompozycji. `scripts/perf/video-bridge-contact-sheet-eval.ts` definiuje wersjonowane schematem środowisko testowe A/B dla rzeczywistych modeli wizyjnych zgodnych z OpenAI. Mierzy ono tokeny raportowane przez dostawcę, całkowite opóźnienie zegarowe od początku do końca (w tym kompozycję arkusza), liczbę wywołań modelu oraz retencję faktów zdefiniowaną w manifeście. Surowe odpowiedzi modelu nie są zapisywane w raporcie; zachowywane są jedynie skróty SHA-256 oraz dopasowane identyfikatory faktów. Środowisko nie wykonuje żadnych wywołań sieciowych ani płatnych wywołań modelu, chyba że przekazano `--execute-real` oraz skonfigurowano `--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez takiego jawnego, rzeczywistego uruchomienia jego maszynowo odczytywalny werdykt pozostaje `HOLD`; same syntetyczne pomiary ładunku i liczby wywołań nie stanowią dowodu promocji.

Wywołujący mogą dołączyć opcjonalną tablicę `transcript.cues` do obsługiwanej części wideo, gdy dysponują już wyrównanym tekstem. Każdy cue musi zawierać `text`, skończony przedział `start`/`end` mieszczący się w obrębie wykrytego czasu trwania oraz umieszczone na liście dozwolonych `source` (`client`, `embedded` lub `audio-bridge`); `confidence` domyślnie wynosi `1` i musi pozostawać między `0` a `1`. Dokładne duplikaty cue są łączone. OmniRoute nigdy nie rozpoczyna transkrypcji na podstawie tych metadanych: zweryfikowane cue są kopiowane do opisywanego wyniku wraz ze źródłem, pewnością i przedziałem oraz są renderowane jako niezaufane obserwacje obok podpisów klatek. Nieprawidłowy tekst, tekst poza zakresem lub pozbawiony pochodzenia jest odrzucany, a nie mieszany ze strumieniem podpisów. Oba kanały transkrypcji w treści żądania normalizują podane pochodzenie do `client`, w tym samozadeklarowane etykiety `embedded` lub `audio-bridge`. Tylko adapter należący do serwera może przypisać te zaufane etykiety za pomocą dostępnego wyłącznie w kodzie argumentu `trustedSource`; pole JSON żądania nie może dotrzeć do tego argumentu. Tekst transkrypcji pozostaje niezaufaną treścią pochodzącą z mediów, niezależnie od jej pochodzenia, i nigdy nie może determinować autoryzacji.

Zaawansowany wywołujący może dostarczyć ścieżkę `audioTranscript` dla tego samego wideo; jest ona traktowana jako tekst dostarczony przez klienta, a nie dowód serwerowej transkrypcji. Punkt styku fuzji uruchamia obserwacje wizualne i dźwiękowe w ramach jednego terminu i sygnału przerwania, porządkuje je na wspólnej osi czasu, łączy dokładne duplikaty i zgłasza wynik częściowy, gdy powiedzie się tylko jedna strona. Nieprawidłowy `audioTranscript` degraduje do takiego wyniku częściowego — opis wizualny jest zachowywany, a gałąź audio rejestruje oczyszczony kod błędu — zamiast powodować niepowodzenie całego wideo. Dostępność poszczególnych gałęzi, flaga częściowości oraz oczyszczone kody błędów są zachowywane w opisywanym wyniku, w metadanych barier ochronnych (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), w metadanych pamięci podręcznej wyników oraz w licznikach fuzji mostu. Domyślna ścieżka Video Bridge nie wywołuje zamiany mowy na tekst ani nie pobiera drugiej kopii mediów; bez tej jawnej ścieżki pozostaje wyłącznie wideo.

**Przechowywanie transkrypcji (#12150 P1).** Ma to zastosowanie automatycznie za każdym razem, gdy Video Bridge (sam opcjonalny) renderuje cue transkrypcji — nie istnieje osobna flaga przechowywania. Gdy żądanie renderuje jakikolwiek cue transkrypcji (zadeklarowany przez wywołującego `transcript` lub scalony `audioTranscript`), guardrail oznacza je jako `videoBridgeObserved` i tworzy zanonimizowany cień opisu wideo — identyczne renderowanie, w którym dowolna treść tekstowa każdego cue zostaje zastąpiona przez `[redacted-video-transcript]`, budowane przez podstawienie ustrukturyzowanego pola cue przed złożeniem ciągu znaków (nigdy przez parsowanie spłaszczonego tekstu, dzięki czemu żadna treść cue — wroga ani zwykła, w tym treści zawierające `]`, takie jak `[inaudible]`/`[music]` — nie może przetrwać). Zachowane ciało żądania w dzienniku wywołań zastępuje każdą część tekstową pochodzącą z wideo tym zanonimizowanym cieniem, dopasowywanym po równości treści; kotwica `fullText` jest ponownie odczytywana z gotowego ładunku guardrail sprzed wywołania, więc dopasowanie nadal się powiedzie po tym, jak późniejsze guardraile łańcucha (maskery PII i poświadczeń, priorytety 10/95) przepiszą tekst opisu w miejscu oraz po tym, jak wstrzyknięcie system-prompt/handoff/memory przekształci tablicę wiadomości. Ciało wysyłane w górę strumienia do modelu pozostaje niezmienione. Obserwowane żądanie nie zapełnia również trwałej pamięci Memory (pomijana jest ekstrakcja zarówno z żądania, jak i z odpowiedzi), więc własna odpowiedź modelu nie może odbić tekstu transkrypcji do Memory.

**Surowe pola wideo (#12430).** Gdy mostek jest włączony, a natywne wsparcie wideo jest nieznane lub nieobecne, zdefiniowane pola `transcript`/`audioTranscript` również aktywują `videoBridgeObserved`, nawet po niepowodzeniu opisu lub limicie `maxVideos`. `null` i puste ciągi znaków są liczone; nieobecne pola i metadane niebędące wideo — nie. Zachowane kopie anonimizują te pola lub pomijają żądanie, a pamięci podręczne/Memory są omijane.

Na tych ścieżkach awaryjnych prawidłowe cue wywołującego stają się obsługiwanymi częściami `text`/`input_text` zamiast niestandardowymi polami dostawcy. Obie ścieżki dostarczone w żądaniu pozostają niezaufanymi obserwacjami `client`, z wyraźnym ostrzeżeniem, że wideo nie zostało opisane, a znaczniki czasu nie zostały zweryfikowane względem mediów. Istniejące budżety łączne 256 cue/64 KiB oraz budżet na cue obowiązują łącznie dla obu ścieżek; znaczniki czasu muszą mieścić się w limicie 600 sekund brokera oraz w dowolnym dostarczonym oknie fokusu. Nieprawidłowe ścieżki są odrzucane, a nie przekazywane jako dowolny tekst; prawidłowa ścieżka siostrzana może nadal zostać użyta, chyba że ich łączny budżet zostanie przekroczony. Pola null/puste nie dodają tekstu. Ta ścieżka awaryjna nie dodaje pobierania mediów ani transkrypcji. Pola rozszerzeń transkrypcji są usuwane z awaryjnego nośnika wideo oraz jego obiektów `video_url`/`source`. Allowlist interfejsu wire OpenAI pozostaje restrykcyjna; nośniki wideo o nieznanym natywnym wsparciu pozostają dostępne, a znane cele czysto tekstowe zachowują bezpieczne znaczniki. Ustrukturyzowane cienie anonimizacji chronią dołączony tekst transkrypcji, podczas gdy oryginalne żądanie należące do wywołującego pozostaje niezmienione. Cele z natywnym wsparciem oraz wyłączone mostki zachowują dotychczasowe zachowanie omijania.

Dodatkowe zachowane kopie korzystają z tego samego sygnału obserwowanego żądania. Surowa migawka żądania klienta sprzed guardraili, żądanie oczekujące w pamięci oraz wczesny dziennik odrzuconych żądań strukturalnie zastępują pola transkrypcji w częściach wideo; prompty w postaci ciągów znaków syntetyzowane przez etapy potoku i przekazanie kontekstu są anonimizowane w ujściu trwałego ciała żądania. Zachowany znacznik `video_content_removed` sprawia, że kontynuacja `previous_response_id` kończy się bezpiecznie niepowodzeniem (fail closed) zamiast rekonstruować tekst, który został celowo odrzucony. Jeśli obserwowane żądanie utraci swój cień anonimizacji dla poszczególnych części przed zalogowaniem, lub nawet jeden z kilku cieni wideo nie dopasuje się po późniejszych mutacjach żądania, zachowane ciało żądania jest całkowicie pomijane zamiast zachowywania częściowo zanonimizowanej transkrypcji.

W przypadku obserwowanego żądania odpowiedź modelu może cytować dowolną część transkrypcji bez ustrukturyzowanej granicy cue. Jej zachowane `responseBody` w dzienniku wywołań jest zatem zastępowane znacznikiem pominięcia; szczegółowy artefakt potoku (który może zawierać ciała upstream/client oraz fragmenty strumienia) nie jest zachowywany. Pamięci podręczne semantyczne, idempotencji i odtwarzania rozumowania omijają odczyty i zapisy dla tego żądania. Żądanie dostawcy oraz odpowiedź widoczna dla klienta pozostają niezmienione. Wczesne bajty keepalive są usuwane z bufora tymczasowego, gdy szczegółowy artefakt jest pomijany. Ostrzeżenie Kiro o nieprawidłowym EventStream raportuje jedynie liczbę bajtów ładunku, nigdy jego treść ani surowy błąd parsera JSON.
Nie oznacza to, że każda niezwiązana diagnostyka dostawcy/wtyczki została zaudytowana; szersze czyszczenie zachowanych ujść jest śledzone w #11658.

Wewnętrzny cykl życia `/api/modality-bridge/video/drilldown` stanowi osobne podłoże pamięci podręcznej z uwierzytelnianiem loopback/token. Każda operacja wymaga również kanonicznego, nieprzejrzystego identyfikatora podmiotu (principal ID). Zanim produkcyjny wywołujący zostanie włączony, musi wyprowadzić ten identyfikator z uwierzytelnionego tenanta i nigdy nie może przekazywać wartości wybranej przez klienta. Klucze pamięci podręcznej wiążą ten podmiot z kanonicznymi identyfikatorami sesji i referencji wideo, przechowują wyłącznie ich klucze pochodzące z SHA-256 i ograniczają zakres zarówno odczytów, jak i usuwania do tego samego podmiotu. Pamięć podręczna przechowuje maksymalnie 16 pochodnych ramek JPEG na wpis, wygasza je po dziesięciu minutach i obsługuje ograniczone odczyty `start`/`end` lub jawne usunięcie sesji.

Każdy podmiot jest ograniczony do 16 wpisów i 64 MiB kanonicznych danych JPEG. Te limity są niezależne od globalnego pułapu 64 wpisów/256 MiB: presja kwoty podmiotu usuwa wyłącznie najdawniej używane wpisy tego podmiotu, zanim rozważone zostanie globalne usunięcie LRU. Wygasłe wpisy są usuwane z rozliczeń zarówno podmiotu, jak i globalnych przy aktywności pamięci podręcznej, podczas gdy anulowanie i niepowodzenie walidacji nie zatwierdzają częściowej podmiany.

Pamięć podręczna odrzuca niekanoniczny Base64, nadmiarowe wypełnienie, media inne niż JPEG, uszkodzone lub obcięte pliki JPEG oraz pliki JPEG generujące ostrzeżenie podczas ograniczonego dekodowania pełnego obrazu za pomocą `sharp`. Każdy zaakceptowany obraz jest ponownie kodowany jako kanoniczny JPEG, a szerokość i wysokość są wyprowadzane z zdekodowanych bajtów zamiast polegać na polach wywołującego; wszelkie końcowe bajty poliglotyczne są odrzucane, a nie zachowywane. Tylko ograniczony, kanoniczny, skompresowany bufor jest wliczany do obu kwot. Limit transmisji JSON obejmuje narzut Base64 dla górnej granicy 32 MiB zdekodowanych danych wejściowych. Każda zapisana deriwacja rejestruje zweryfikowany format/rozdzielczość JPEG, politykę próbkowania, wersję derywacji, czas utworzenia, obliczony przez serwer skrót zawartości oraz zahaszowane odwołanie do rodzica plus skrót zawartości rodzica zaufanego wywołującego. Anulowanie jest sprawdzane między asynchronicznymi fazami dekodowania/haszowania przed atomowym zatwierdzeniem do pamięci podręcznej.

Ta transza nie łączy jeszcze produkcyjnego producenta z trasą i nie zapewnia wyboru wariantów wielorozdzielczych. Przezroczysta ścieżka żądań Video Bridge nie wiąże się zatem z żadną dodatkową pracą, podczas gdy derywacja podmiotu powiązana z najemcą oraz pełny cykl życia wielorozdzielczości FU-08 pozostają wyraźnie określoną pracą uzupełniającą, a nie zachowaniem udokumentowanym jako kompletne.

Klatki są opisywane sekwencyjnie przy użyciu skonfigurowanego modelu Video. Puste nadpisanie Video dziedziczy ustawienie Vision; jeśli oba są puste, auto-router Vision wybiera efektywny model obsługujący wizję. Udane opisy zastępują oryginalną część stabilnym prefiksem `[Video description:`, który oznacza również tekst jako niezaufaną obserwację pochodzącą z mediów i nakazuje modelom dalszego przetwarzania nie stosować się do instrukcji znalezionych w mediach. Klucze pamięci podręcznej opisów klatek obejmują bajty JPEG, prompt, znacznik czasu i efektywny model; tylko udane opisy są buforowane. Wpisy pamięci podręcznej zachowują rzeczywisty model producenta, który odniósł sukces, w tym model zapasowy; most zgłasza `mixed`, gdy różne klatki zostały wygenerowane przez różne modele. Trafienie w pamięć podręczną ponownie wykorzystuje tę tożsamość producenta zamiast przemianowywania jej na żądany plan routingu. Pamięć podręczna wyników całego wideo jest kluczowana na każdym wejściu, które zmienia wynik — prompt, efektywny model, polityka próbkowania, liczba klatek, tryb analizy semantycznej, odcisk SHA-256 znormalizowanej wskazówki fokusu, okno fokusu, `transcript`, `audioTranscript` oraz flaga arkusza kontaktowego — więc zmiana dowolnego z tych wymiarów jest chybieniem pamięci podręcznej, nigdy nieświeżym ponownym użyciem. Wersja polityki deduplikacji wizualnej, próg i ograniczona liczba klatek kandydujących są również jawnie obecne w kluczu i metadanych pamięci podręcznej wyników; zmiana polityki nie może zatem ponownie wykorzystać nieświeżego opisu całego wideo. Metadane pamięci podręcznej wyników v4 zachowują tryb i odcisk, nigdy surowe zadanie użytkownika. Metadane zabezpieczenia zgłaszają zarówno żądany, jak i efektywny tryb analizy; żądany tryb `focused` bez użytecznego tekstu użytkownika jest zgłaszany jako efektywnie `full`.

Zabezpieczenie wyodrębnia każdą obsługiwaną część wideo, ale opisuje nie więcej niż `modalityBridgeVideoMaxVideos`. W przypadku celu, o którym stwierdzono, że ma `supportsVideo === false`, nieudane i przekraczające limit filmy stają się jawnymi bezpiecznymi znacznikami tekstowymi, dzięki czemu żadne surowe wideo nie przetrwa. Gdy możliwość jest nieznana, te części zachowują swój nośnik wideo; każda zapasowa transkrypcja podlega ograniczonej konwersji tekstu opisanej powyżej. Cele z `supportsVideo === true` omijają most. Sygnał przerwania żądania klienta propaguje przez pobieranie, kolejkę brokera, podprocesy i wywołania opisów; przerwania zatrzymują się między filmami i nigdy nie zawodzą w sposób przepuszczający surowe media.

Ustawienia środowiska wykonawczego są przechowywane w bazie danych i walidowane przez Zod:

| Klucz                               | Wartość domyślna | Zakres / zachowanie                                                                                         |
| ----------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`          | Opcjonalne w czasie wykonywania, wymaga włączenia (opt-in)                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`         | `full` zachowuje ogólne opisy; `focused` używa ograniczonego, niezaufanego kontekstu ostatniego użytkownika |
| `modalityBridgeVideoModel`          | `""`             | Dziedzicz model Vision Bridge                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`              | 1–16                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`      | `uniform`, `scene_aware` lub proporcjonalny `segment_aware`; awaria detektora powoduje powrót do `uniform`  |
| `modalityBridgeVideoMaxVideos`      | `1`              | 1–4                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`         | 1000–120000 ms                                                                                              |

Starsze zachowane wartości limitu czasu Video powyżej 120 sekund są obcinane do terminu brokera; nowe zapisy ustawień powyżej tego limitu są odrzucane. `GET /api/modality-bridge/video/runtime` wymaga zaufanej, oznaczonej lokalności loopback przed uwierzytelnieniem lub sondowaniem środowiska wykonawczego, a następnie wymaga uwierzytelnienia zarządczego. Zwraca tylko `available`, oczyszczone wersje FFmpeg/ffprobe oraz stały powód, gdy środowisko wykonawcze jest niedostępne. Wewnętrzny punkt końcowy ekstrakcji nie jest publicznym API przesyłania: nasycenie kolejki zwraca `503` plus `Retry-After`, rozłączenie wywołującego zwraca `499`, a stały termin brokera zwraca `504`. Skonwertowane odpowiedzi dodają `video->text;model=<visionModel>;parts=<videos>` do centralnego nagłówka `x-omniroute-modality-bridge` bez usuwania segmentów Vision lub Audio.

### PII Masker (`piiMasker.ts`)

Działa na **obu** etapach.

- **`preCall`** klonuje payload, przechodzi przez `system`, `messages`, `input` i
  `prompt` (w tym elementy będące zwykłymi ciągami znaków) i stosuje
  `processPII()` (z `@/shared/utils/inputSanitizer`) do pól `content`/`text`
  typu string. Gdy `PII_REDACTION_ENABLED=true`, wykryte dane PII są maskowane
  w wychodzącym payloadzie. Jest to niezależne od `INPUT_SANITIZER_MODE` (który
  kontroluje wyłącznie politykę prompt-injection). Gdy maskowanie jest
  wyłączone, wywołanie rejestruje liczby wykryć bez przepisywania treści.
- **`postCall`** głęboko klonuje odpowiedź, uruchamia `sanitizePIIResponse()`
  oraz masker kształtu Responses API (`maskResponsesOutput` — obejmuje
  `output_text` i `output[].content[].text`). Jeśli nastąpi jakiekolwiek
  maskowanie, zmodyfikowana odpowiedź zastępuje oryginał.

Guardrail nigdy nie blokuje; jedynie dodaje adnotacje (`meta.detections`,
`meta.redacted`) lub przepisuje treść.

#### Wybór według typu, wzorce niestandardowe i liczniki wykryć

**Panel → Ustawienia → Bezpieczeństwo → Maskowanie PII** wybiera, _co_ jest
maskowane. Nie włącza ono maskowania: to nadal zależy od
`PII_REDACTION_ENABLED` (żądanie) i `PII_RESPONSE_SANITIZATION` (odpowiedź +
SSE) — obie flagi są domyślnie wyłączone.

- **Wybór według typu** — wbudowane identyfikatory są wymienione w
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Brak ustawienia
  oznacza każdy typ (zachowanie sprzed wprowadzenia tej opcji). Wzorzec
  `ssn_us` silnika żądań jest mapowany na `ssn`. Szablony (Minimalny,
  Standardowy, Finansowy, Brazylijski, USA, Pełny) wypełniają jedynie pola
  wyboru w interfejsie użytkownika.
- **Wzorce niestandardowe** — maksymalnie 20 wzorców regex lub wildcard (`*` =
  do 64 znaków niebędących białymi znakami, `?` = jeden). Dopasowania stają się
  `[CUSTOM_REDACTED]`. Każdy wzorzec przechodzi przez
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`):
  maksymalnie 500 znaków, flagi ograniczone do `g i m s u`, musi się
  skompilować, musi przejść `safe-regex` (katastrofalne cofanie) i nie może
  dopasowywać pustego ciągu ani symbolu zastępczego maskowania. Wzorzec, który
  nie przechodzi walidacji, jest odrzucany przy zapisie i przy teście, a
  zapisany wiersz, który jej nie przechodzi, jest pomijany w czasie wykonania
  zamiast być kompilowany. Wzorce niestandardowe działają tylko przy włączonym
  maskowaniu.
- **Liczniki wykryć** — liczby według typu (nigdy dopasowane wartości),
  przechowywane w pamięci i resetowane przy restarcie
  (`src/lib/pii/piiDetectionStats.ts`). Rosną tylko przy włączonym maskowaniu.

Ustawienia znajdują się w tabeli `key_value` (przestrzeń nazw `pii_settings`,
`src/lib/db/piiSettings.ts`) i są odczytywane przez cache o czasie życia 1 s.
API:

| Metoda | Ścieżka                  | Przeznaczenie                                                                 |
| ------ | ------------------------ | ----------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stan flag, `enabledTypes`, `customPatterns`, liczniki wykryć                  |
| `PUT`  | `/api/settings/pii`      | Zastępuje `enabledTypes` (`null` = wszystkie) i/lub `customPatterns`          |
| `POST` | `/api/settings/pii/test` | Próbne uruchomienie jednego wzorca na próbce do 8 KB; nic nie jest zapisywane |

Wszystkie trzy wymagają uwierzytelnienia administracyjnego i walidują treść
żądania za pomocą Zod (`src/shared/validation/schemas/piiSettings.ts`).

### Iniekcja promptu (`promptInjection.ts`)

Wykrywa adversarialne struktury w treści dostarczonej przez użytkownika i
wymusza skonfigurowaną politykę. Zachowanie jest sterowane zmiennymi
środowiskowymi i opcjami konstruktora:

| Ustawienie      | Zmienna środowiskowa                                                                                 | Domyślne | Efekt                                                                                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Włączone        | `INPUT_SANITIZER_ENABLED`                                                                            | `true`   | Gdy `false`, guardrail jest pomijany.                                                                                                                                                                 |
| Tryb            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`   | Polityka iniekcji: `block`, `warn` lub `log`. (`redact` jest akceptowane dla zgodności wstecznej, ale **nie** usuwa tekstu iniekcji; przepisywanie PII w żądaniu kontroluje `PII_REDACTION_ENABLED`.) |
| Próg blokowania | opcja `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Minimalna ważność wymagana do zablokowania. Przy domyślnym progu poziom medium jest tylko obserwowany.                                                                                                |

**Pierwszeństwo trybów** (`getMode`): `options.mode` wywołującego →
**nadpisanie flagą funkcji z bazy danych** `INJECTION_GUARD_MODE` (Panel →
Ustawienia → Flagi funkcji) → zmienna środowiskowa `INJECTION_GUARD_MODE` →
zmienna środowiskowa `INPUT_SANITIZER_MODE` → `warn`. Nadpisanie z panelu
wygrywa zatem ze zmiennymi środowiskowymi, więc interfejs flag funkcji steruje
działającym guardrailem na żywo (bez restartu). Odczyt z bazy danych jest
odporny na błędy (fail-safe): jeśli się nie powiedzie, guardrail wraca do
zachowania opartego na zmiennych środowiskowych, a gdy nadpisanie nie jest
ustawione, zachowanie jest identyczne jak przy rozwiązywaniu wyłącznie na
podstawie zmiennych środowiskowych.

Źródła wykrywania:

1. `sanitizeRequest()` z `@/shared/utils/inputSanitizer` (współdzielony zestaw
   detektorów używany w innych miejscach potoku).
2. Wbudowane `DEFAULT_GUARD_PATTERNS` (obecnie `system_override_inline` i
   `markdown_system_block`, oba o ważności `high`).
3. Opcjonalne `customPatterns` przekazywane przez opcje konstruktora (ciągi
   znaków, wyrażenia regularne lub rekordy `{ name, pattern, severity }`).

Gdy `mode === "block"` **oraz** co najmniej jedno wykrycie osiąga próg
istotności, `preCall` zwraca `{ block: true, message: "Request rejected:
suspicious content detected" }`. W trybach `warn`/`log` guardrail odnotowuje
zdarzenie w logu, ale dopuszcza wywołanie. Współdzielona funkcja pomocnicza
`evaluatePromptInjection()` jest również eksportowana — dla wywołujących,
którzy muszą oceniać prompty bez przechodzenia przez rejestr.

**Limit skanowania (v3.8.20):** detektor sprawdza wyłącznie **pierwsze 16 KB**
połączonego tekstu promptu — `MAX_INJECTION_SCAN_BYTES = 16 * 1024`
(16 384 bajtów) w `src/shared/utils/inputSanitizer.ts`. Zarówno
`detectInjection()`, jak i `evaluatePromptInjection()` wykonują
`slice(0, MAX_INJECTION_SCAN_BYTES)` przed uruchomieniem pętli wzorców.
Dyrektywy iniekcji znajdują się blisko początku danych wejściowych, więc
ogranicza to koszt CPU/GC wyrażeń regularnych przy ładunkach liczących wiele
setek KB, bez osłabiania wykrywania (por. #3932, #4041).

### Maskowanie danych uwierzytelniających (`credentialMasker.ts`)

Działa na **obu** etapach, jako ostatni w domyślnym łańcuchu (priorytet `95`).
Maskuje dobrze znane wzorce kluczy API / tajnych tokenów w wychodzącym ładunku
(treść wiadomości, argumenty wywołań narzędzi, wyniki narzędzi) **oraz** w
odpowiedzi dostawcy, dzięki czemu poświadczenie wklejone do promptu (lub
zwrócone echem przez wynik narzędzia) nie wycieka do dostawcy upstream ani z
powrotem do klienta.

- **Tylko jako opt-in**, zgodnie z tą samą konwencją co maskowanie danych PII
  (pokrewne Twardej Zasadzie nr 20): wyłączone, chyba że
  `settings.credentialRedactionEnabled === true` **lub**
  `CREDENTIAL_REDACTION_ENABLED=true`. Gdy opcja jest wyłączona, guardrail jest
  operacją pustą (no-op) — nigdy nie blokuje i nigdy niczego nie przepisuje.
- `redactCredentials()` przechodzi po całym drzewie ładunku/odpowiedzi
  (`walkValue()`, bezpieczne pod kątem zanieczyszczenia prototypów oraz cykli
  dzięki `WeakSet`) i zastępuje dopasowania symbolem zastępczym
  `[REDACTED:<type>]`, klonując wyłącznie gałęzie, które faktycznie uległy
  zmianie.
- `CREDENTIAL_PATTERNS` obejmuje klucze dostawców LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokeny VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), klucze płatnicze (Stripe, Square),
  klucze chmurowe (klucz dostępu AWS, Twilio, SendGrid, Mailgun), klucze
  prywatne / tokeny JWT, parametry połączeń zawierające poświadczenia
  (`mongodb://user:pass@...` itp.) oraz ogólny wzorzec wartości nagłówków
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Klucze w postaci nagłówków
  (`authorization`, `x-api-key`, `api-key`, `apikey`) są maskowane strukturalnie
  (tylko wartość; prefiks schematu, np. `Bearer `/`Basic `, pozostaje
  zachowany), a nie za pomocą ogólnego wyrażenia regularnego.
- Guardrail nigdy nie blokuje; jedynie przepisuje dane (`modifiedPayload` /
  `modifiedResponse`) i dodaje adnotacje (`meta.credentialsRedacted`,
  `meta.count`).

Ochrona przed regresją: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // true przerywa łańcuch
  message?: string; // wyświetlana przy blokowaniu
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // zwracany przez preCall, aby przepisać żądanie
  modifiedResponse?: TValue; // zwracany przez postCall, aby przepisać odpowiedź
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

Guardrail sygnalizuje „brak zmian”, zwracając `void`, `{}` lub
`{ block: false }`. Zwrócenie `modifiedPayload`/`modifiedResponse` zastępuje
wartość przepływającą przez łańcuch dla kolejnych guardraili.
`signal?: AbortSignal` przenosi cykl życia wywołania do guardraili. Przerwanie żądania (abort) jest celowym wyjątkiem fail-open: mostki mediów przerywają pracę i sprzątają, nie przywracając surowych mediów do celu, o którym wiadomo, że ich nie obsługuje.

## Rejestr (`registry.ts`)

Singleton `guardrailRegistry` udostępnia:

- `register(guardrail)` — dodaje (lub zastępuje według znormalizowanej nazwy) guardrail i
  ponownie sortuje według rosnącego `priority`.
- `clear()` / `list()` — pomocnicze funkcje administracyjne.
- `runPreCallHooks(payload, context)` — iteruje po aktywnych guardrailach, przekazuje
  payload przez `modifiedPayload` i zatrzymuje się na pierwszym `block: true`.
- `runPostCallHooks(response, context)` — ten sam przepływ po stronie odpowiedzi.
- `resetGuardrailsForTests({ registerDefaults })` — czyści stan i opcjonalnie
  rejestruje ponownie domyślne guardraile, zapewniając czystą izolację testów.

Obie funkcje uruchamiające zwracają `{ blocked, payload|response, results, guardrail?, message? }`,
gdzie `results` jest tablicą rekordów `GuardrailExecutionResult` zawierających
pola `blocked`, `skipped`, `modified`, `error` i `meta` dla każdego guardraila,
przydatne do śledzenia.

### Wyłączanie guardraili dla pojedynczego żądania

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agreguje
zdeduplikowaną listę nazw guardraili, które powinny zostać pominięte dla bieżącego
żądania. Istnieje pięć kanałów, odczytywanych w tej kolejności i scalanych w jedną listę
(przy deduplikacji wygrywa pierwsze wystąpienie):

1. `apiKeyInfo.disabledGuardrails`
2. Treść żądania `disabledGuardrails` (najwyższy poziom)
3. Treść żądania `metadata.disabledGuardrails` (tylko gdy `metadata` jest obiektem)
4. Nagłówek `x-omniroute-disabled-guardrails`
5. Starszy nagłówek `x-disabled-guardrails`

Wszystkie pięć kanałów jest scalanych, w tym oba nagłówki: wysłanie zarówno
`x-omniroute-disabled-guardrails`, jak i `x-disabled-guardrails` powoduje pominięcie sumy
ich list, a pusty nowoczesny nagłówek nie ukrywa już starszego
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), naprawione w
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Wartości mogą być tablicami ciągów znaków lub ciągiem rozdzielonym przecinkami; nazwy są
przycinane i normalizowane do małych liter w formacie kebab-case (`pii_masker` → `pii-masker`),
a puste wpisy są odrzucane. Wynik jest przekazywany przez `context.disabledGuardrails`
do rejestru, który pomija pasujące guardraile (`skipped: true` w `results`).

Lista wyłączeń wpływa wyłącznie na **rejestr**. Tryb `block` dla prompt injection jest
obowiązkową granicą: middleware injection-guard
(`src/middleware/promptInjectionGuard.ts`) wywołuje `evaluatePromptInjection()`
bez żadnej kontrolowanej przez wywołującego listy wyłączeń (martwe wywołanie
`resolveDisabledGuardrails({ body })`, które wcześniej wykonywał, zostało usunięte w
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), więc żądanie
wyłączające `prompt-injection` jest nadal odrzucane w trybie `block`. Jest to
zamierzone. Kanały wyłączeń są kontrolowane przez wywołującego (treść żądania,
metadane, nagłówki), a wywołujący nie może mieć możliwości wyłączenia zabezpieczenia
ustawionego przez operatora
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Suma nagłówków
z [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
zmienia jedynie to, które guardraile rejestru są pomijane; nie pozwala klientowi
ominąć middleware. Obowiązkowe polityki guardraili per klucz i per grupa są
śledzone w RFC v4 [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Zobacz [Pokrycie i ograniczenia](#coverage-and-limits).

## Kolejność wykonania

Dla każdego żądania przepływającego przez `src/sse/handlers/chat.ts` oraz
`open-sse/handlers/chatCore.ts` (trasy rodziny chat wymienione w sekcji
[Zakres i ograniczenia](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` buduje listę pomijanych elementów na podstawie
   klucza API, treści żądania (body) i nagłówków.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` uruchamia guardraile w rosnącej
   kolejności priorytetów:
   - Wyłączone guardraile są rejestrowane jako `skipped`.
   - Metoda `preCall` każdego guardraila może zmodyfikować ładunek (payload)
     poprzez `modifiedPayload`.
   - Pierwsze wystąpienie `block: true` przerywa łańcuch, a handler zwraca
     odpowiedź odrzucenia przez guardrail.
3. (Potencjalnie zmodyfikowany) ładunek trafia do routingu combo i dyspozycji
   upstream.
4. **Tylko tryb non-streaming:** po złożeniu odpowiedzi
   `guardrailRegistry.runPostCallHooks(...)` uruchamia ten sam łańcuch na
   odpowiedzi. `block: true` na tym etapie odrzuca odpowiedź upstream i zwraca
   HTTP 400. Odpowiedzi strumieniowe całkowicie pomijają ten krok.

Guardraile, które rzucą wyjątek, są rejestrowane z `error: <message>` i logowane
przez `logger.warn`, ale łańcuch jest kontynuowany — zgodnie z zasadą fail-open.

## Zakres i ograniczenia

Rejestr guardraili jest podłączony wyłącznie do potoku chat. Te ograniczenia są
przypięte przez testy `tests/unit/guardrail-pipeline-wiring-characterization.test.ts`
oraz `tests/unit/guardrail-pipeline-characterization.test.ts`; aktualizuj je
świadomie przy każdej zmianie zachowania.

### Gdzie uruchamiane są hooki

| Hook / mechanizm                    | Uruchamiany dla                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `runPreCallHooks`                   | Żądania obsługiwane przez `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (oraz `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` oraz proxy czatu Telegrama. Ponadto testowy endpoint dashboardu `/api/guardrails/test`. Blokada pre-call zwraca HTTP 400. |
| `runPostCallHooks`                  | Wyłącznie odpowiedzi chat **bez strumieniowania** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Odpowiedzi strumieniowe nigdy do niego nie trafiają.                                                                                                                                                                                                                                                                       |
| Strumieniowa obsługa PII            | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), podłączany w `streamingPipeline.ts`, gdy `PII_RESPONSE_SANITIZATION` jest włączone. Nie jest to guardrail, więc kanały wyłączania nie mają na niego wpływu.                                                                                                                                                                                                            |
| Middleware injection-guard (legacy) | Każda trasa `/v1` przenosząca prompty, w tym rodzina chat (zobacz [zakres tras](#injection-guard-route-coverage--red-team-phase-8--block-d)). Tylko prompt injection.                                                                                                                                                                                                                                                                |

### Czego to nie obejmuje

- **Trasy mediów, embeddingów i danych** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) nigdy nie trafiają do rejestru.
  Nie działa tam maskowanie PII, maskowanie poświadczeń ani modality bridge.
  Ich jedynym zabezpieczeniem jest legacy middleware injection-guard.
- **Odpowiedzi strumieniowe** nie przechodzą przez guardraile post-call: brak
  post-call `pii-masker` i `credential-masker` oraz brak blokady post-call.
  Stosowany jest wyłącznie strumieniowy transform PII (gdy
  `PII_RESPONSE_SANITIZATION` jest włączone). Poświadczenie powtórzone
  w odpowiedzi strumieniowej nie jest redagowane.
- **Kanały wyłączania a middleware (zgodnie z założeniami):** middleware ocenia
  prompt injection własnym wywołaniem `evaluatePromptInjection()`, bez
  przekazywania jakiejkolwiek kontrolowanej przez wywołującego listy wyłączeń.
  Tryb `block` jest obowiązkową granicą, której wyłączenia kontrolowane przez
  wywołującego nie mogą ominąć — również na trasach rodziny chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Wyłączenie
  `prompt-injection` pomija jedynie guardrail z rejestru.

### Co widzi odpowiedź przed post-call

Na ścieżce non-streaming kolejność jest następująca: ekstrakcja pamięci →
wykonanie wbudowanych narzędzi → guardraile post-call → wyjście przez blokadę
post-call → zapis w semantic-cache.

- **Ekstrakcja pamięci** i **wykonywanie narzędzi** widzą odpowiedź, zanim
  zabezpieczenia po wywołaniu będą mogły ją przepisać lub zablokować. Począwszy
  od [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), ekstrakcja
  pamięci przepuszcza wyodrębniony tekst przez `sanitizePII`, gdy włączone jest
  `PII_RESPONSE_SANITIZATION` (zarówno w trybie strumieniowym, jak i
  niestrumieniowym), ale odpowiedź, którą zabezpieczenia po wywołaniu później
  zablokują, została już udostępniona pamięci i narzędziom.
- **Semantyczna pamięć podręczna** przechowuje odpowiedź dopiero po wywołaniu,
  więc zapisuje przepisaną odpowiedź, a zablokowana odpowiedź nigdy nie trafia
  do pamięci podręcznej. Wpisy pamięci podręcznej są kluczowane według klucza
  API.

## Konfiguracja

Zmienne środowiskowe odczytywane przez wbudowane zabezpieczenia:

| Zmienna                               | Używana przez                  | Działanie                                                                                                                   |
| ------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`             | Ustaw `false`, aby całkowicie wyłączyć wykrywanie.                                                                          |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`             | Polityka wstrzykiwań: `warn`, `block` lub `log`. Przestarzała wartość `redact` nie przepisuje tekstu wstrzyknięcia.         |
| `INJECTION_GUARD_MODE`                | `prompt-injection`             | Tryb strażnika wstrzykiwań; jednocześnie flaga funkcji w bazie danych, która **nadpisuje** zmienne środowiskowe (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`             | Minimalny poziom zagrożenia, który `MODE=block` odrzuca: `high` (domyślnie), `medium` lub `low`.                            |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`             | Przestarzały alias dla `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`                   | Gdy `true`, dane PII w żądaniu są maskowane (niezależnie od trybu wstrzykiwań).                                             |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (w dół przepływu) | Steruje zachowaniem maskera po stronie odpowiedzi.                                                                          |

Zabezpieczenia Modality Bridge odczytują konfigurację środowiska wykonawczego
z magazynu ustawień wspieranego przez bazę danych (`getSettings()`), a nie ze
zmiennych środowiskowych. Podstawowe klucze modułu Vision to
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` oraz
`modalityBridgeCacheMaxEntries`. Przestarzałe klucze
`visionBridge*` są akceptowane wyłącznie jako udokumentowany,
jednocyklowy mechanizm awaryjnego odczytu; zapisy z pulpitu używają kluczy
podstawowych. Wartości domyślne i mechanizm rozwiązywania awaryjnego
znajdują się w `src/shared/constants/modalityBridgeDefaults.ts`, a przestarzałe
stałe zachowano w `src/shared/constants/visionBridgeDefaults.ts`.

Audio korzysta z `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` i `modalityBridgeAudioMaxClips` oraz ze wspólnych
ustawień `modalityBridgeCache*`. Audio nie ma mechanizmu awaryjnego dla
przestarzałych kluczy, ponieważ klucze te wprowadzono razem ze schematem
Modality Bridge.

Video korzysta z `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` i
`modalityBridgeVideoTimeout` oraz ze wspólnych ustawień `modalityBridgeCache*`.
Jest domyślnie wyłączone, ponieważ FFmpeg/ffprobe są opcjonalnymi zależnościami
operacyjnymi, a generowanie podpisów klatek zwiększa opóźnienie i koszt modelu.

## Niestandardowe guardraile

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

1. Utwórz `src/lib/guardrails/myGuardrail.ts` rozszerzający `BaseGuardrail`.
2. Zaimplementuj `preCall` i/lub `postCall`.
3. Zarejestruj albo w momencie importu (push z `registerDefaultGuardrails`), albo
   wywołaj `guardrailRegistry.register(...)` w czasie działania — rejestr zastępuje
   każdy wcześniejszy guardrail o tej samej znormalizowanej nazwie.
4. Dodaj testy w katalogu `tests/unit/` (istniejące przykłady:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testowanie

Używaj `resetGuardrailsForTests()` między testami, aby zaczynać od znanego stanu.
Przekaż `{ registerDefaults: false }`, aby zacząć z pustym rejestrem i rejestrować
tylko testowane guardraile. Vision Bridge obsługuje wstrzykiwanie zależności
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge udostępnia równoważne
punkty wpięcia dla ustawień, możliwości, wyboru modelu STT, weryfikacji poświadczeń
i transkrypcji. Dzięki temu testy mogą sprawdzać oba przepływy bez dostępu do bazy
danych i sieci.

## Zobacz także

- `src/lib/guardrails/` — implementacja
- `src/shared/utils/inputSanitizer.ts` — współdzielony detektor zasilający
  wykrywanie prompt-injection i maskowanie PII
- `src/shared/constants/visionBridgeDefaults.ts` — domyślne ustawienia Vision Bridge i
  lista modeli z wymuszonym mostem
- `src/shared/constants/modalityBridgeDefaults.ts` — współdzielone domyślne ustawienia runtime dla Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — warstwa ortogonalna (circuit breaker, okresy wyciszenia)
- `docs/reference/ENVIRONMENT.md` — pełna dokumentacja zmiennych środowiskowych

## Pokrycie tras przez injection-guard i red-team (Faza 8 · Blok D)

Zabezpieczenie przed injekcjami (`createInjectionGuard` / `withInjectionGuard`) obejmuje
wszystkie trasy przyjmujące prompty użytkownika. Respektuje zmienną `INJECTION_GUARD_MODE`
(domyślnie `warn` = tylko logowanie; `block` = zwraca HTTP 400 `SECURITY_001`).

| Typ                   | Trasy                                                                                                                                                | Tryb domyślny |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Tekstowe (istniejące) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Generatywne           | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Dane                  | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Ekstrakcja tekstu (`extractMessageContents`) obejmuje `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nocny, `nightly-llm-security.yml`):** promptfoo weryfikuje, że każda trasa
blokuje korpus OWASP-LLM przy `INJECTION_GUARD_MODE=block`; garak uruchamia sondy
(pomija, gdy brak sekretu). `moderations` jest uwzględnione dla spójności. Tryb block
jest obowiązkową granicą: `evaluatePromptInjection()` ignoruje przekazywaną przez
middleware listę wyłączeń per-żądanie, więc `disabledGuardrails` **nie** zwalnia
trasy z tego zabezpieczenia ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Nocny workflow (`.github/workflows/nightly-llm-security.yml`, cron + ręczne
wyzwalanie) ma dwa zadania:

- **`promptfoo-guard` (blokujące)** — uruchamia `promptfoo eval -c promptfooconfig.yaml`
  z `INJECTION_GUARD_MODE=block`. Każdy przypadek adversarialny (np. „ignore all
  previous instructions…", jailbreaki w stylu DAN) sprawdza, czy odpowiedź zawiera
  `error.code === "SECURITY_001"`, tzn. czy zabezpieczenie faktycznie odrzuciło żądanie.
- **`garak` (doradcze)** — uruchamia garak `--probes promptinject,dan,leakreplay`
  przeciwko lokalnej instancji OmniRoute (`http://localhost:20128/v1`). Uzależnione
  od sekretu dostawcy (`PROMPTFOO_PROVIDER_KEY`); w razie braku pomija się bezbłędnie
  i ma przyrostek `|| true`, więc raportuje bez przerywania CI.

Pokrycie helpera zabezpieczającego (`createInjectionGuard` / `withInjectionGuard`)
obejmuje każdą trasę `/v1` przyjmującą prompt; tekst promptu jest pobierany z
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` przez
`extractMessageContents()` w `src/shared/utils/inputSanitizer.ts`.
