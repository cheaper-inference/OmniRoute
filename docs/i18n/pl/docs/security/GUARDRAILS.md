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

## Wbudowane poręcze

Rejestr automatycznie ładuje sześć poręczy ochronnych w kolejności priorytetów podczas importu (patrz `registry.ts` → `registerDefaultGuardrails()`):

| Priorytet | Nazwa               | Gradacja)      | Plik                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Uruchamiane są numery o niższym priorytecie** Pierwszy** .

### Most Wizji (`visionBridge.ts`) — Most Modalny PR-1

Model podstawowy GLM 5.3 i `glm-5.3-{low,high,max}` mają jawne metadane `supportsVision:false` registry/spec. Warianty GLM 5.3 Flash pozostają modelami z natywną wizją. Trasa `/v1/messages` kodu Claude wchodzi do współdzielonego łańcucha poręczy przed wywołaniem `handleChat`** zanim** Tłumaczenie Claude-to-OpenAI; zagnieżdżone obrazy wyników narzędzia `Read` muszą zostać opisane lub obsłużone, zanim tłumaczenie przeniesie je do treści OpenAI `image_url` (#17069).

Przechwytuje żądania zawierające obrazy, których celem jest** modele bez wizji** i albo przekierowuje całe żądanie do modelu obsługującego wizję, albo zastępuje części obrazu opisami tekstowymi generowanymi przez konfigurowalny model wizyjny przed wywołaniem poprzedzającym. Dzięki temu dostawcy obsługujący wyłącznie tekst mogą w przejrzysty sposób obsługiwać ładunki multimodalne.

Przepływ:

1. Pomiń, jeśli model docelowy obsługuje już wizję (chyba że pojawia się na liście wymuszonego mostu `isVisionBridgeForcedModel`).
2. Wyodrębnij części obrazu za pomocą `extractImageParts(messages)` (`visionBridgeHelpers.ts`), który deleguje do** ujednolicony detektor mediów** `detectMediaParts()` w `open-sse/utils/mediaParts.ts` — pojedyncze źródło prawdy współdzielone z filtrem zgodności combo. Ekstrakcja jest dozwolona dla kształtów, `replaceImageParts` może ponownie połączyć (wyciąg ↔ zamień kontrakt): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` i Odpowiedzi API `input_image`. Pasujące obrazy zagnieżdżone w wynikach narzędzi Claude Code `tool_result.content` i Responses są również wyodrębniane i zastępowane ich oryginalnymi ścieżkami; Kształty przeznaczone wyłącznie do wskaźników są materiałem filtra kombinowanego i nie są wyodrębniane. Pomiń, jeśli nie znaleziono żadnego.
3. Rozwiąż konfigurację środowiska wykonawczego poprzez `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): nowe klucze ustawień `modalityBridge*` wygrywają; starsze klucze `visionBridge*` pozostają a** rezerwa jednocyklowa** (okno wycofania). Pomiń przed jakimkolwiek przejściem multimediów, gdy most jest wyłączony.
4. Selektor trybu (`modalityBridgeVisionMode`, patrz tabela poniżej) decyduje o przekierowaniu lub opisaniu. Reroute zwraca `modifiedPayload` tylko z zamienionym `model` plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Opisz ścieżkę: zakryj obrazy w `maxImages`, utwórz zachętę uwzględniającą zadania, sprawdź pamięć podręczną opisu, wywołaj model wizji** równolegle** (`Promise.allSettled`) i wstaw w ich miejsce fragmenty tekstu `[Image N]: <description>`. Nieudany opis daje `null`: surowy obraz jest zachowywany dla celów unknown/vision-capable (#4012), ale** potwierdzony bezpośredni cel tekstowy** lub kombinacja zerowej wizji otrzymuje wyraźny fragment tekstu `(unavailable — no vision-capable provider connected)` dla każdego nieopisanego obrazu, w tym częściowych błędów i obrazów przekraczających limit wywołania opisu (#17069). Istniejąca kombinacja, która zakończyła się niepowodzeniem, opisująca awarię, pozostaje niezmieniona (#8430).
6. Zwróć `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Selektor trybu (`modalityBridgeVisionMode`)

| Tryb       | Domyślny | Zachowanie                                                                                                                                                                                                                                                                                                 |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Starsza heurystyka, niezmieniona (#6640/#7204): modele inne niż combo/`auto/` przekierowują do najlepszego modelu wizji, chyba że oryginalny model ma już użyteczne referencje (wtedy opisz); cele kombi zawsze opisują.                                                                                   |
| `describe` |          | Zawsze opisz — blok przekierowania jest całkowicie pomijany; wybrany przez użytkownika model zawsze odpowiada.                                                                                                                                                                                             |
| `reroute`  |          | Wymuś przekierowanie: ominięcie zabezpieczenia modelu zachowania poświadczeń. Przekierowanie-** cel** Credential Guard nadal stosuje — gdy nie istnieje żaden użyteczny cel wizyjny, most blokuje się z wyraźnym błędem, zamiast opisywać lub wysyłać surowe obrazy do celu zawierającego wyłącznie tekst. |

Zwarcie w trybie wymuszonym** zanim** uruchamiana jest automatyczna heurystyka; Zachowanie `auto` jest bajtowo identyczne z zachowaniem poręczy pre-PR-1.

#### Zakres klucza API (`visionBridgeKeyScope.ts`)

Gdy klucz API wywołującego ogranicza `allowedConnections`, pule kwot (`allowedQuotas`) lub modele (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), most wybiera tylko przekierowanie i opisuje modele, których może używać klucz, w połączeniach, których może używać klucz. Wywołanie opisujące zawsze przechodzi przez pętlę własną OmniRoute z nagłówkiem `x-omniroute-self-loop-key-id`, więc odbierające żądanie czatu ponownie wymusza połączenie i politykę modelu tego klucza. `enforceApiKeyPolicy()` honoruje ten nagłówek tylko razem z nośnikiem pętli własnej, więc może jedynie zawęzić dostęp, a identyfikator, który nie zostanie rozwiązany, zostanie odrzucony.

Jeżeli dla klucza nie jest dozwolony żaden model wizyjny, a** potwierdzony cel tekstowy** odrzuca lokalnie żądanie obrazu za pomocą czystego HTTP 400 zamiast przekazywać bajty obrazu do niezdolnego źródła (#17069). W przypadku celów z nieznanymi lub natywnymi możliwościami widzenia ścieżka opisu zachowuje swoje poprzednie zachowanie w przypadku awarii (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Żądania bez klucza i klucze bez tych ograniczeń zachowują się dokładnie tak jak poprzednio.

#### Podpowiedź opisywania uwzględniająca zadania (`modalityBridgeVisionTaskAware`)

Domyślny** PRAWDA** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dołącza tekst** ostatnia wiadomość użytkownika** (skrócony do 500 znaków) do podstawowego podpowiedzi opisu, kierując opis w kierunku tego, o co faktycznie zapytał użytkownik (wzorzec codex-vision-proxy) i prosząc model wizji o transkrypcję widocznego tekstu. Z wyłączoną flagą — lub brakiem tekstu użytkownika — podstawowy znak zachęty jest używany bez zmian.

Opisane własne żądanie kompatybilne z OpenAI pętli własnej (`callVisionModelSingle()` w `visionBridgeHelpers.ts`) zawsze żąda `image_url.detail: "high"` — bezwarunkowo, dla każdego caller/provider, nie bramkowanego żadnym sygnałem klienta. Próbkowanie o niskiej szczegółowości pogarsza dokładność OCR dokładnie w przypadku zadania transkrypcji tekstu, o które pyta ten monit, więc samo wywołanie opisu zawsze wymaga podania dużej ilości szczegółów, niezależnie od poziomu szczegółowości użytego w pierwotnym żądaniu przychodzącym. Ma to wpływ tylko na treść żądania opisu wewnętrznego; nie zmienia to sposobu, w jaki OmniRoute przekazuje własne `image_url.detail` wywołującego na główne żądanie —, to ustawienie domyślne jest stosowane oddzielnie i tylko dla wykrytych klientów OpenCode, w `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Gałąź w formacie drutu Anthropic opisanej pętli własnej nie ma pola `detail` i żadne ustawienie domyślne nie ma na nią wpływu.

#### Opisz limit wyjściowy (`modalityBridgeVisionMaxChars`)

| Klawisz                        | Domyślny | Zakres            |
| ------------------------------ | -------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` lub 100–50000 |

`0` (domyślnie) oznacza** bez czapki** — opis zwrócony przez `callVisionModel()` przechodzi bez modyfikacji, zachowując istniejące zachowanie. Każda wartość z zakresu 100–50000 powoduje obcięcie opisu z przyrostkiem `…` przed ponownym połączeniem go w postać `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` w `src/lib/guardrails/visionBridge.ts`). Podnieś tę wartość w przypadku zadań OCR wymagających dużej ilości szczegółów, w których dalszy model wymaga pełnej transkrypcji; obniż go do ograniczonego użycia tokenów w modelach gawędziarskich. Pole panelu kontrolnego znajduje się na panelu Zaawansowane karty Wizja (`modality-bridge-max-chars` w `ModalityBridgeVisionTab.tsx`) i ogranicza dowolną wartość z zakresu od 1 do 99 aż do 100 pięter, pozostawiając jawne `0` nietknięte. — `0` jest prawidłową wartością Zod samą w sobie (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a nie tylko „nieustawioną” wartością domyślną.

#### Opisz pamięć podręczną (`modalityBridge/bridgeCache.ts`)

Pamięć podręczna LRU + TTL w pamięci do opisywania wyników, współdzielona w całym procesie. Klucz = `sha256(imageRef + composedPrompt + configuredBridgeModel)` z ramką z przedrostkiem długości (brak kolizji z granicami pola). Elementem modelu jest** skonfigurowany** model mostu, a nie model, który faktycznie odpowiedział — `callVisionModel` może cofnąć się wewnętrznie, a kluczowanie przy każdej próbie spowodowałoby fragmentację pamięci podręcznej. Nieudane opisy nigdy nie są buforowane. Ustawienia:

| Klawisz                         | Domyślny | Zakres  |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Zdalna normalizacja obrazu (pobieranie describe/base64 w pętli własnej)

Kiedy most pobiera a** zdalny** sam obraz — Anthropic opisuje samo wywołanie i konwersję w formacie base64 w formacie claude-wire (`ensureBase64ImagesForClaudeWire`), oba poprzez `fetchRemoteImageAsDataUri()` w `visionBridgeHelpers.ts` — wynikowe dane URI są przekazywane przez `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) przed osadzeniem w żądaniu modelu wizyjnego. Obrazy o dużych rozmiarach są zmniejszane do formatu A** Długa krawędź 2048px** (pasujące do limitu zmiany rozmiaru OpenAI/Anthropic stosowanego już po stronie serwera), co ogranicza przesyłanie bytes/latency bez zmiany tego, co widzi model wizji. Zmiana rozmiaru wykorzystuje `sharp`, ładowany przez import dynamiczny: na platformie, na której nie można załadować natywnego pliku binarnego, `normalizeDataUri()`** nigdy nie rzuca** — powraca do przekazywania oryginalnych bajtów, więc ścieżka describe/base64-conversion zawsze działa. Bajty inne niż obrazy (pobranie, które nie zwróciło obrazu dającego się zdekodować) również są przepuszczane w stanie nienaruszonym. Ta normalizacja obejmuje obrazy pobierane przez most dla własnego wywołania — Nigdy nie jest ona stosowana do surowego ładunku przekazującego wywołującego, zgodnie z zasadą mutacji typu „opt-in-only” (twarda reguła #20).

#### Ustawienia schematu migracji +

Nowe klawisze `modalityBridge*` są sprawdzane przez ZOD w `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*` i grupa `modalityBridgeAudio*` używana przez mostek audio. Migracja `141_modality_bridge_settings.sql` kopiuje istniejące wartości `visionBridge*` do pasujących nowych kluczy (idempotentne, nigdy nie zastępuje wartości `modalityBridge*` ustawionej przez operatora); starsze klucze pozostają akceptowane jako rezerwowe do odczytu w jednym cyklu wydawniczym.

#### Statystyki + nagłówka przejrzystości

Opisz przekształcone odpowiedzi niosące `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (zbudowane przez `buildModalityBridgeHeader()` w `modalityBridge/bridgeStats.ts`, oznaczone przez `withModalityBridgeHeader()` w `src/sse/handlers/chatHelpers.ts`). Przekierowane żądania otrzymują** NIE** header — ładunek pozostał niezmieniony, a zamiana modelu jest już widoczna w polu `model` treści odpowiedzi.

`GET /api/modality-bridge/stats` (uwierzytelnianie zarządzania, ten sam poziom co `GET /api/settings`) zwraca liczniki poszczególnych modalności w pamięci `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` dla `vision`, `audio` i `video`. `averageLatencyMs` używa `latencySamples`, a nie wszystkich prób, jako swojego mianownika; operacja bez pomiaru czasu nie tworzy próbki o zerowej milisekundie. `bridged` pozostaje kompatybilnym wstecz aliasem umożliwiającym pomyślne konwersje; nieudane próby nie powodują jego zwiększenia. Liczniki resetowane po ponownym uruchomieniu procesu zgodnie z projektem (telemetria, nie księgowanie).

#### Konfiguracja panelu

Dedykowana strona panelu kontrolnego to `/dashboard/settings/modality-bridge`. Zakładki `Vision`, `Audio` i `Video` z adresem URL zachowują parametry zapytania podczas przełączania wartości `tab`. Karta Wizja udostępnia informacje dotyczące włączania, trybu, wyboru modelu (w tym automatycznego domyślnego), podpowiedzi uwzględniających zadania, zaawansowanych limitów timeout/image/description-length/cache, liczników czasu wykonywania i strzeżonych żądań próbek. Karta Audio jest również aktywna: wyświetla włączenie, selektor modeli tylko STT z funkcją Auto, limitami timeout/max-clip, licznikami audio i próbnym testem `input_audio`. Karta Wideo jest funkcjonalna: raportuje stan środowiska wykonawczego FFmpeg/ffprobe — jest jednym z czterech jawnych stanów UI (`unknown` gdy sonda jest w locie lub nie może zostać ukończona, `restricted` na hoście panelu kontrolnego bez pętli zwrotnej, gdzie sonda jest pomijana po stronie klienta, `unavailable` po sondowaniu i potwierdzeniu jej braku lub `available` w wersjach FFmpeg/ffprobe ) — utrzymuje limity enable/model/frame/video/timeout, filtruje selektor modeli do modeli obsługujących wizję i udostępnia liczniki wideo.

Poprzednia karta Vision Bridge w ustawieniach AI jest łączem kompatybilności do nowej strony; nie posiada już drugiej kopii formularza. Dostawcy multimediów łączą także przepływy pracy przetwarzania obrazu na tekst i mowy na tekst z odpowiednimi zakładkami Modality Bridge bez usuwania istniejącego obszaru przetwarzania mowy na tekst.

**Obejście wejścia pętli własnej:** gdy wywołanie opisu przechodzi przez własną pętlę `/v1` OmniRoute(niestandardowy model dostawcy), żądanie podrzędne wysyła `x-omniroute-admission-bypass: internal` i jest uwierzytelniane za pomocą rozpoznanego poświadczenia pętli własnej — lokalnego strażnika `sk_omniroute` w trybie lokalnym lub skonfigurowanego przez operatora klucza `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env (#1350), więc wdrożenia `REQUIRE_API_KEY=true` mogą nadal uruchamiać wywołanie opisu. Obejście jest honorowane tylko w przypadku tych dokładnych poświadczeń, więc klienci zewnętrzni nie mogą używać nagłówka do pomijania wstępu.

Starsze ustawienia domyślne są dostępne w `src/shared/constants/visionBridgeDefaults.ts`; nowe ustawienia domyślne mode/task-aware/cache i narzędzie do rozpoznawania ustawień są dostępne w `src/shared/constants/modalityBridgeDefaults.ts`. Poręcz udostępnia opcję konstruktora `deps`, dzięki czemu testy mogą wstrzykiwać fałszywe implementacje `getSettings` i `callVisionModel`.

### Most audio (`audioBridge.ts`) — Mostek modalny PR-3

Przechwytuje żądania czatu zawierające dźwięk, zanim dotrą do celu, o którym nie wiadomo, czy akceptuje sygnał audio. Nigdy nie przekierowuje żądania czatu: części audio są transkrybowane przez istniejący wieloczęściowy punkt końcowy zgodny z OpenAI, a wybrany model czatu kontynuuje transkrypcje tekstowe.

Przepływ:

1. Rozwiąż `supportsAudio` poprzez `getResolvedModelCapabilities()`. Wygrywają jawne metadane rejestru dostawcy, następnie metadane modelu statycznego, a następnie synchronizowane `modalities_input`. Zadeklarowana lista wejściowa bez `audio` to `false`; nie ma dowodów na zdolność `null`. Zarówno `false` jak i `null` aktywują most konserwatywny, podczas gdy `true` go omija.
2. Rozwiąż ustawienia `modalityBridgeAudio*` i wyodrębnij możliwe do połączenia części audio najwyższego poziomu z każdej wiadomości za pomocą współdzielonego detektora `detectMediaParts()`. Obsługiwane kształty przewodów to OpenAI `input_audio`, `audio_url` i `source.media_type: "audio/*"`. Zagnieżdżony dźwięk jest wykrywany do trasowania, ale nie jest usuwany przez ścieżkę łączenia. Praca jest ograniczona przez `modalityBridgeAudioMaxClips`; późniejsze części pozostają nietknięte.
3. Honoruj skonfigurowane `provider/model` lub pozwól `selectAudioBridgeModel()` chodzić `AUDIO_TRANSCRIPTION_PROVIDERS` w stabilnej kolejności w katalogu i wybierz pierwszy model z użytecznymi poświadczeniami aktywnego dostawcy.
4. `callAudioTranscription()` konwertuje dźwięk base64/data-URI na wieloczęściowy `file` lub pobiera zdalne `audio_url` przez publiczną osłonę wychodzącą z przypinaniem DNS i ograniczeniem 25 MB. Następnie POSTs plik i wybrany model do lokalnej pętli własnej `/v1/audio/transcriptions`, uwierzytelnianej za pomocą `resolveSelfLoopBearer()`. Istniejąca trasa transkrypcji wykonuje normalne wyszukiwanie poświadczeń, obsługę cooldown/rate-limit i wysyłanie dostawcy.
5. Pomyślne wywołania zastępują ich części `[Audio N]: <transcript>`. Połączenia uruchamiane z `Promise.allSettled`: indywidualna awaria powoduje zachowanie oryginalnej części audio (umowa #4012 ). Jeśli każde wywołanie zakończy się niepowodzeniem, a cel zostanie udowodniony `supportsAudio === false`, części staną się `[Audio N]: (unavailable — no STT provider connected)` (kontrakt #8430 ). W przypadku nieznanego celu (`null`) wynik całkowitej porażki pozostaje niezmieniony. Sprawdzony cel tekstowy bez użytecznych poświadczeń STT otrzymuje ten sam wyraźny kod pośredniczący bez wykonywania połączenia sieciowego.

Pomyślne transkrypcje korzystają z pamięci podręcznej LRU/TTL obejmującej cały proces. Klucz łączy w sobie referencję audio, stabilną etykietę działania `audio-transcription` i wybrany model STT ; awarie nigdy nie są buforowane. Próby audio aktualizują współdzielone liczniki `bridged`, `cacheHits`, `failures` i `lastUsedAt`. Przekształcone odpowiedzi niosą `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nietknięte żądania nie otrzymują segmentu mostka audio.

Ustawienia środowiska wykonawczego są wspierane przez bazę danych i weryfikowane przez Zod:

| Klawisz                       | Domyślny | Zakres          |
| ----------------------------- | -------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —               |
| `modalityBridgeAudioModel`    | `""`     | Auto lub STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10            |

Udostępniona pamięć podręczna pozostaje kontrolowana przez `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Mostek wideo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Przechwytuje części wideo najwyższego poziomu w zakończeniach czatu `messages` i odpowiedziach API `input` zanim zostanie wywołany cel bez znanej natywnej obsługi wideo. Obsługiwane kształty to `input_video`, `video_url`, `video_source`, HTTPS URLs i `data:video/*;base64,...` data URIs. Zwykłe nazwy plików w tekście nie są traktowane jako wideo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) jest właścicielem przeglądania żądań, sprawdzania capability/policy, agregacji na żądanie i ładunku odpowiedzi. Pozyskiwanie — dla każdego wideo, pamięć podręczna całych wyników, opisująca sekwencję klatek (która łączy dowolny zapis audio zadeklarowany przez rozmówcę) i metrics/abort/cleanup — na próbę są ukryte za `processVideoPart` w `videoBridgePipeline.ts`, wywoływane raz na część wideo w pętli `preCall`. Moduł ten definiuje również jawne granice portów `VideoMediaBrokerPort` (pozyskiwanie bajtów i wyodrębnianie próbkowanych ramek), `VideoAudioTranscriptionPort` (łączenie transkrypcji audio zadeklarowanej przez rozmówcę z próbkowanymi napisami) i `VideoDrilldownPort` (starszy kształt surowego sklepu). Produkcja STT i retencja ramki skomponowane są wokół opisującego portu poprzez `createVideoSttAdapter` i `createVideoDrilldownAdapter`; ta ostatnia wykorzystuje wspólny cykl życia z nieprzezroczystym uchwytem.

Publiczna ścieżka żądania `/v1` nigdy nie importuje ani nie wywołuje podprocesu. Zdalne filmy są pobierane w ramach limitu 50 MiB ; filmy inline base64 mają konserwatywny limit 36 MiB dekodowanych na wideo, więc koperta model/messages/framing może pozostać w publicznym limicie przyjęć żądań JSON wynoszącym 50 MiB. Przed alokacją sprawdzane są szacunki długości wbudowanej i rozmiaru zdekodowanego. HTTPS jest wymagane na początkowym zdalnym URL i przy każdym przekierowaniu, przy użyciu istniejącej publicznej straży wychodzącej z przypinaniem DNS. Bajty następnie przekraczają dokładnie wewnętrzną granicę brokera `POST /api/modality-bridge/video/extract`. Ta trasa to zarówno `LOCAL_ONLY` jak i `SPAWN_CAPABLE`, akceptuje tylko uwierzytelnione dla każdego procesu żądanie zaufanej pętli zwrotnej i nigdy nie akceptuje URL, ścieżki systemu plików, pliku wykonywalnego ani listy argumentów. Potok wielkości ciała API i przyrostowy czytnik treści modułu obsługi niezależnie wymuszają ograniczenie wejściowe brokera wynoszące 50 MiB. Jej ograniczona kolejka uruchamia jedną ekstrakcję na raz, pozwala na cztery oczekujące zadania i ogranicza oczekujące dane wejściowe do 100 MiB.

Wewnątrz brokera `ffprobe` odczytuje prywatny plik lokalny; lista dozwolonych formatów o stałym formacie nie obejmuje formatów playlist i manifestów. W przypadku dozwolonych kontenerów z rodziny MOV zewnętrzne odniesienia do danych MOV pozostają domyślnie wyłączone, a polecenie fix nie włącza ich. Zarówno `ffprobe` jak i `ffmpeg` używają białej listy protokołu `file` -only, jednego wątku, tablic o stałych argumentach, braku powłoki i plików wykonywalnych przeniesionych z `PATH`. Strumienie okładek z załączonymi obrazkami nie są kandydatami do odtwarzania. Wszystkie odtwarzalne strumienie muszą spełniać te ograniczenia, a przed deterministycznym powrotem o najniższym indeksie preferowany jest jawny strumień domyślny. Filmy są ograniczone do 600 sekund, 8192 pikseli na wymiar i 33 554 432 pikseli źródłowych. FFmpeg próbkuje 1–16 klatek JPEG w punkcie środkowym, skaluje w dół długą krawędź do maksymalnie 1024 pikseli bez zwiększania skalowania mniejszych danych wejściowych i nigdy nie otrzymuje URL. Domyślnie próbkowanie to `uniform`. Opcjonalne zasady `scene_aware` i eksperymentalne zasady `segment_aware` wykonują jedno dodatkowe stałe przejście FFmpeg przez już zatwierdzony strumień lokalny, wybierają ograniczone znaczniki czasu sceny `showinfo` i deterministycznie wracają do tych samych jednolitych punktów środkowych w przypadku awarii detektora, przekroczenia limitu czasu, zniekształconego wyjścia lub pustego zestawu kandydatów. Tryb świadomy segmentów przydziela próbki punktu środkowego proporcjonalnie do zatwierdzonych interwałów scen; Poniżej szczegółowo opisano dowody uwzględniające segmenty i zachowania awaryjne. Twardy limit 16 ramek stosowany jest po dokonaniu wyboru w każdej polisie. Gdy żądanie uwzględniające scenę ma budżet tylko na jedną klatkę, wykorzystuje jednolity punkt środkowy aktywnego pełnego wideo lub okna fokusu i zgłasza `policyEffective: uniform`: pojedyncza wybrana klatka sceny nie może zachować obu końców czasowych. Osoba wywołująca może opcjonalnie zapewnić skończone okno skupienia (sekundy `start`/`end` ); granice są ograniczane do czasu trwania nośnika, okna odwrócone lub nieskończone są odrzucane, a wszystkie zasady próbkowania są wykonywane tylko w znormalizowanym przedziale. Wynikowe okno jest uwzględniane w metadanych próbkowania i w przedrostku niezaufanego opisu, dzięki czemu modele późniejsze mogą odróżnić ukierunkowany fragment od pełnej osi czasu.

Fokus na podpisy semantyczne to osobne, wyraźne ustawienie. Domyślny tryb analizy `full` zachowuje istniejący monit ramki i nigdy nie przekazuje tekstu żądania do modelu podpisu. W trybie `focused` most odczytuje tylko najnowsze niepuste `text`/`input_text` autorstwa użytkownika z tego samego kontenera Chat lub Responses, normalizuje je do NFC, zwija znaki sterujące i białe znaki oraz ogranicza je do 500 punktów kodowych Unicode. Pusty wynik odpowiada dokładnie podpowiedzi `full`. Użyteczna wskazówka jest serializowana jako JSON w dedykowanym bloku niezaufanego kontekstu użytkownika i może nadawać priorytet jedynie obserwowalnym szczegółom; nie może ono uchylić odrębnego ostrzeżenia przed przestrzeganiem instrukcji widocznych lub słyszalnych w mediach. Fokus tekstowy nigdy nie wnioskuje o `start`/`end` ani nie zmienia próbnika czasowego.

#### dowód segmentu strukturalnego FU-07

`segment_aware` wykorzystuje jeden ograniczony przebieg analizy wstępnej przez już zweryfikowany lokalny strumień wideo. Stały łańcuch filtrów najpierw skaluje się do maksymalnie 320 pikseli szerokości, wykrywa zmiany sceny i zatrzymane interwały, a następnie próbkuje z szybkością 1 klatki na sekundę w celu uzyskania informacji o rozmyciu, średniej luminacji i spatial/temporal. Przepustka jest ograniczona do 600 próbek strukturalnych, jednego wątku FFmpeg/filter, tego samego protokołu `file` -only i list dozwolonych kontenerów, ograniczenia wyjścia procesu 1 MiB i maksymalnie 30 sekund we współdzielonym abort/deadline. brokera. Nigdy nie akceptuje polecenia, filtra, ścieżki ani URL z żądania.

Wartości strukturalne stanowią deterministyczny dowód próbkowania, a nie semantyczne zrozumienie wideo. Nie sugerują tematów, działań, podpisów, mowy ani intencji użytkownika. Granice scen i zamrożenia tworzą segmenty; zamrożenie pokrycia, rozmycie, ekspozycja, szczegóły przestrzenne i zmiany czasowe wpływają jedynie na sposób alokacji istniejącego budżetu 1–16 klatek. Segment całkowicie zamrożony jest ograniczony do jednej klatki, natomiast segmenty niezamrożone konkurują o pozostały budżet. Gdy granice przekraczają liczbę klatek, zachowywane jest jednolite pokrycie osi czasu, więc szybkie wczesne cięcia nie mogą ukryć długiego końcowego segmentu. Granice scen w obrębie 1-sekundowej rozdzielczości analizy granicy zamrożenia są łączone.

Brakujące filtry, dowody malformed/empty, błąd detektora lub ograniczony limit czasu przed analizą nie otwierają się na dokładnie jednolitą politykę punktu środkowego. Przerwanie wywołującego lub ostateczny termin brokera nie kończą się niepowodzeniem: kończy to podproces w locie, zapobiega późniejszemu wyodrębnieniu ramki, a prywatne drzewo tymczasowe jest usuwane w `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministyczne, rzeczywiste urządzenia FFmpeg w celu oszczędności wywołań napisów po deduplikacji, alokacji budżetu przy gęstym ruchu, dowodów blur/exposure/SI-TI, szybkich cięć z długim ogonem i stopniowo zanikających fałszywych alarmów. Rejestruje czas ściany przed analizą oraz, jeśli dostępne jest `/usr/bin/time`, dziecko CPU i szczyt RSS. Kontrole jakości to wyłącznie wyrocznie strukturalne. Prawdziwa jakość modelu napisów pozostaje `HOLD` ponieważ ta uprząż nie ma autoryzowanego punktu końcowego ani zamrożonego sędziego. Oszczędności pieniężne również pozostaną `HOLD` chyba że `--caption-cost-per-call-usd` przedstawi wyraźne pozytywne szacunki na każde połączenie; skrypt nigdy nie tworzy żadnego wyniku.

Każda ramka jest ograniczona do 4 MiB, wszystkie surowe ramki łącznie do 23 MiB, a serializowana odpowiedź brokera do 32 MiB. Prywatny katalog tymczasowy został usunięty w `finally`. OmniRoute nie zawiera pakietu FFmpeg i nie akceptuje niestandardowej ścieżki pliku wykonywalnego. Przed napisami most stosuje konserwatywną deduplikację wizualną: każdy JPEG jest redukowany do bufora 16 × w skali szarości 16 i porównywany jest tylko z ostatnią zachowaną klatką. W przypadku żądanego budżetu napisów powyżej jednej klatki ekstrakcja zapewnia ograniczoną pulę kandydatów o wartości maksymalnie dwukrotnie większej niż budżet i nigdy nie większej niż 16 klatek. Żądany limit jest stosowany dopiero po deduplikacji, przy czym pierwszy i ostatni wybrany kandydaci są zachowywani podczas ostatecznego odchudzania, gdy budżet wynosi co najmniej dwa. Wersjonowana polityka `grayscale-16x16-mean-cells-v2` wykorzystuje większą ze średnich delta luma i stosunek komórek miniatur, których znormalizowana delta wynosi co najmniej 0,05. Próg duplikacji to stała 0,04, wybrana ze względu na przewidywalność, a nie ujawniana jako ustawienie środowiska wykonawczego. Ten wtórny sygnał o wysokim kontraście zachowuje niewielkie zmiany ruchu i widocznego tekstu, które mogą ukryć jedynie średnie porównania. Błędy komparatora lub dekodera nie otwierają się i utrzymują zasięg. Metadane wyjściowe oddzielają wyodrębnionych kandydatów, pomyślnie użyte ramki i usunięte duplikaty wizualne.

Wyraźnie oznaczona część wideo może wymagać stykówki ze znacznikiem czasu. Most buduje co najwyżej 4-kolumnową, 16-ramkową siatkę JPEG. Każda 512-pikselowa komórka wypala swój źródłowy znacznik czasu w dolnym paśmie o wysokim kontraście, podczas gdy te same znaczniki czasu pozostają w metadanych tekstowych na potrzeby powiązania i audytu w dalszej części. Kompletny JPEG pozostaje ograniczony do 32 MiB. Jeśli `sharp` nie może zdekodować ani ułożyć siatki, most wraca do poszczególnych ramek JPEG ; przerwanie klienta nadal propaguje się w operacji arkusza.

Dowody promocyjne są celowo oddzielone od mikrobenchmarku składu syntetycznego. `scripts/perf/video-bridge-contact-sheet-eval.ts` definiuje uprząż A/B w wersji schematu dla prawdziwych modeli wizyjnych kompatybilnych z OpenAI. Mierzy tokeny zgłaszane przez dostawcę, opóźnienie całej ściany (w tym skład arkusza), liczbę wywołań modelu i zachowanie faktów zdefiniowanych w manifeście. Surowe odpowiedzi modelu nie są zapisywane w raporcie; zachowywane są tylko skróty SHA-256 i dopasowany fakt IDs. Uprząż nie wykonuje połączeń sieciowych ani płatnych modeli, chyba że `--execute-real` zostanie przekazane i skonfigurowane zostaną `--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez tego wyraźnego, rzeczywistego przebiegu, jego werdykt do odczytu maszynowego pozostaje `HOLD`; Same syntetyczne pomiary payload/call-count nie są dowodem na promocję.

Rozmówcy mogą dołączyć opcjonalną tablicę `transcript.cues` do obsługiwanej części wideo, jeśli posiadają już wyrównany tekst. Każda pamięć musi zawierać `text`, skończony interwał `start`/`end` w badanym czasie trwania oraz `source` umieszczone na białej liście (`client`, `embedded` lub `audio-bridge`); `confidence` domyślnie wynosi `1` i musi pozostać pomiędzy `0` i `1`. Dokładne zduplikowane wskazówki są zwinięte. OmniRoute nigdy nie rozpoczyna transkrypcji z tych metadanych: zatwierdzone wskazówki są kopiowane do opisanego wyniku wraz ze źródłem, pewnością i interwałem i są renderowane jako niezaufane obserwacje obok podpisów klatek. Nieprawidłowy, spoza zakresu lub tekst bez pochodzenia jest odrzucany, a nie dodawany do strumienia napisów. Obydwa kanały transkrypcji treści żądania normalizują dostarczone pochodzenie do `client`, włączając w to samotwierdzone etykiety `embedded` lub `audio-bridge`. Tylko adapter będący własnością serwera może przypisać te zaufane etykiety za pomocą argumentu `trustedSource` zawierającego wyłącznie kod; pole żądania JSON nie może osiągnąć tego argumentu. Tekst transkrypcji pozostaje niezaufaną treścią pochodzącą z mediów, niezależnie od jej pochodzenia, i nigdy nie może decydować o autoryzacji.

Zaawansowany rozmówca może udostępnić ścieżkę `audioTranscript` dla tego samego filmu; jest on traktowany jako tekst dostarczony przez klienta, a nie jako dowód transkrypcji serwera. Połączenie fuzyjne przeprowadza obserwacje wizualne i dźwiękowe w jednym terminie i sygnalizuje przerwanie, porządkuje je na wspólnej osi czasu, zwija dokładne duplikaty i raportuje częściowy wynik, gdy tylko jedna strona odniesie sukces. Nieprawidłowe `audioTranscript` powoduje degradację do częściowego wyniku — Opis wizualny jest zachowywany, a gałąź audio rejestruje oczyszczony kod błędu — zamiast spowodować niepowodzenie całego wideo. Dostępność poszczególnych gałęzi, flaga częściowa i oczyszczone kody błędów są zachowywane w opisanym wyniku, w metadanych poręczy (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), w metadanych pamięci podręcznej wyników oraz w licznikach fuzji mostu. Domyślna ścieżka programu Video Bridge nie wywołuje zamiany mowy na tekst ani nie pobiera drugiej kopii multimedialnej; bez tej wyraźnej ścieżki pozostaje wyłącznie wideo.

**Zatrzymanie transkrypcji (#12150 P1).** Ma to zastosowanie automatycznie za każdym razem, gdy Video Bridge (sam w sobie wyraził zgodę) renderuje wskazówkę dotyczącą transkrypcji. — nie ma osobnej flagi przechowywania. Kiedy żądanie renderuje jakąkolwiek wskazówkę transkrypcyjną ( `transcript` zadeklarowaną przez wywołującego lub połączoną `audioTranscript`), barierka oznacza ją `videoBridgeObserved` i tworzy zredagowany cień opisu wideo — identyczny rendering, w którym treść dowolnego tekstu każdej podpowiedzi zostaje zastąpiona przez `[redacted-video-transcript]`, zbudowaną poprzez podstawienie ustrukturyzowanego pola sygnalizacji przed złożeniem ciągu (nigdy przez analizowanie spłaszczonego tekstu, więc nie ma treści wskazówki — kontradyktoryjnej lub zwykłe, w tym ciała zawierające `]` takie jak `[inaudible]`/`[music]` — które mogą przetrwać). Treść utrwalonego żądania dziennika połączeń zamienia każdą część tekstu pochodzącego z wideo na ten zredagowany cień, dopasowując równość treści; kotwica `fullText` jest ponownie odczytywana z gotowego ładunku poręczy przed wywołaniem, więc dopasowanie nadal kończy się sukcesem po tym, jak późniejsze poręcze łańcucha ( PII i maski poświadczeń, priorytety 10/95) przepiszą tekst opisu w miejscu i po wstrzyknięciu system-prompt/handoff/memory zmieniają kształt tablicy komunikatów. Ciało przesłane przed modelem pozostaje niezmienione. Zaobserwowane żądanie również nie zapełnia trwałej pamięci (pomijane jest zarówno wyodrębnianie na podstawie żądania, jak i odpowiedzi), więc własna odpowiedź modelu nie może odzwierciedlać tekstu transkrypcji w pamięci.

**Surowe pola wideo (#12430).** Gdy mostek jest włączony, a natywna obsługa wideo jest nieznana lub nieobecna, zdefiniowane pola `transcript`/`audioTranscript` również aktywują `videoBridgeObserved`, nawet po niepowodzeniu opisu lub przekroczeniu limitu `maxVideos`. `null` i puste ciągi znaków się liczą; nieobecne pola i metadane inne niż wideo – nie. Zachowane kopie usuwają te pola lub pomijają żądanie, a caches/Memory są pomijane.

Na tych ścieżkach rezerwowych prawidłowe wskazówki wywołującego stają się obsługiwanymi częściami `text`/`input_text`, a nie niestandardowymi polami dostawców. Obydwa utwory przesłane na żądanie pozostają niezaufanymi obserwacjami `client`, z wyraźnym ostrzeżeniem, że film nie został opisany, a znaczniki czasu nie zostały zweryfikowane w mediach. Istniejące budżety całkowite i per-cue 256-cue/64-KiB obowiązują łącznie na obu ścieżkach; znaczniki czasu muszą pasować do maksymalnego limitu 600 sekund brokera i dowolnego dostarczonego okna skupienia. Nieprawidłowe utwory są odrzucane i nie przesyłane dalej jako dowolny tekst; można nadal używać ważnego rodzeństwa, chyba że ich łączny budżet zostanie przekroczony. Pola Null/empty nie dodają tekstu. Ta opcja zastępcza nie dodaje pobierania multimediów ani transkrypcji. Pola rozszerzenia transkrypcji są usuwane z zapasowego nośnika wideo i jego obiektów `video_url`/`source`. Lista dozwolonych przewodów OpenAI pozostaje ścisła; nieznane natywne nośniki wideo pozostają dostępne, a znane cele tekstowe zachowują bezpieczne znaczniki. Ustrukturyzowane cienie redakcyjne chronią dołączony tekst transkrypcji, podczas gdy oryginalne żądanie należące do dzwoniącego pozostaje niezmienione. Cele i wyłączone mosty obsługiwane natywnie zachowują swoje dotychczasowe zachowanie obejścia.

Dodatkowe zachowane kopie wykorzystują ten sam sygnał zaobserwowanego żądania. Surowa migawka żądań klienta sprzed zabezpieczenia, żądanie oczekujące w pamięci i dziennik wczesnych odrzuconych żądań strukturalnie zastępują pola transkrypcji w częściach wideo; podpowiedzi ciągów syntetyzowane przez etapy potoku i przekazywanie kontekstu są redagowane w ujściu treści utrwalonego żądania. Utrwalony znacznik `video_content_removed` powoduje, że kontynuacja `previous_response_id` kończy się niepowodzeniem, zamiast rekonstruować tekst, który został celowo odrzucony. Jeśli zaobserwowane żądanie utraci cień redakcyjny dla poszczególnych części przed zarejestrowaniem lub nawet jeden z kilku cieni wideo nie będzie pasować po późniejszych mutacjach żądania, zachowana treść żądania zostanie całkowicie pominięta zamiast zachowywania częściowo zredagowanego transkrypcji.

W przypadku zaobserwowanego żądania odpowiedź modelu może zacytować dowolną część transkryptu bez ustrukturyzowanej granicy wskazówki. Dlatego jego utrwalony dziennik połączeń `responseBody` zostaje zastąpiony znacznikiem pominięcia; szczegółowy artefakt potoku (który może zawierać treści upstream/client i fragmenty strumienia) nie jest zachowywany. Pamięci podręczne semantyczne, idempotentne i wnioskowania-powtórki omijają odczyty i zapisy dla tego żądania. Żądanie dostawcy i odpowiedź widoczna dla klienta pozostają niezmienione. Wczesne bajty podtrzymujące są usuwane z bufora tymczasowego, gdy szczegółowy artefakt zostanie pominięty. Zniekształcone ostrzeżenie KiroEventStream tylko liczbę bajtów ładunku, nigdy jego zawartość ani surowy błąd parsera JSON. Nie oznacza to, że każda niepowiązana diagnostyka provider/plugin została skontrolowana; szerszy przebieg z zachowanym zlewem jest śledzony w #11658.

Wewnętrzny cykl życia `/api/modality-bridge/video/drilldown` jest oddzielnym podłożem pamięci podręcznej loopback/token-authenticated. Każda operacja wymaga również kanonicznej nieprzezroczystej zasady głównej ID. Przed włączeniem funkcji wywołującej produkcyjną musi ona wyprowadzić wartość ID od uwierzytelnionej dzierżawy i nigdy nie może przekazywać dalej wartości wybranej przez klienta. Klucze pamięci podręcznej wiążą tego podmiotu zabezpieczeń z sesją kanoniczną i odniesieniem wideo IDs, przechowują tylko klucze SHA-256-derived i obejmują zakres zarówno odczytu, jak i usunięcia w ramach tego samego podmiotu głównego. Pamięć podręczna przechowuje maksymalnie 16 pochodnych ramek JPEG na wpis, wygasa po dziesięciu minutach i obsługuje ograniczone odczyty `start`/`end` lub jawne usuwanie sesji.

Każdy podmiot główny jest ograniczony do 16 wpisów i 64 MiB kanonicznych danych JPEG. Limity te są niezależne od globalnego pułapu 64-entry/256 MiB : ciśnienie przydziału głównego eksmituje tylko wpisy tego zleceniodawcy, które były ostatnio używane przed uwzględnieniem globalnej eksmisji LRU. Wygasłe wpisy są usuwane zarówno z rozliczeń głównych, jak i globalnych w związku z aktywnością w pamięci podręcznej, a niepowodzenie anulowania i sprawdzania poprawności nie powoduje częściowej wymiany.

Pamięć podręczna odrzuca niekanoniczne pliki Base64, nadmierne wypełnienie, media inne niż JPEG, zniekształcone lub obcięte JPEGs i JPEGs, które generują ostrzeżenie podczas dekodowania `sharp` ograniczonego pełnego obrazu. Ponownie koduje każdy zaakceptowany obraz jako kanoniczny JPEG, wyznacza szerokość i wysokość z zdekodowanych bajtów zamiast ufać polom wywołującym i odrzuca wszelkie końcowe bajty poliglotów zamiast je zachowywać. Tylko ograniczony kanoniczny skompresowany bufor jest obciążany obydwoma przydziałami. Limit okablowania JSON obejmuje narzut Base64 dla sufitu z dekodowanym wejściem 32 MiB. Każde przechowywane wyprowadzenie zapisuje jego zweryfikowane JPEG format/resolution, zasady próbkowania, wersję wyprowadzenia, czas utworzenia, skrót treści obliczonej przez serwer i zaszyfrowane odwołanie do elementu nadrzędnego oraz skrót treści nadrzędnej zaufanego obiektu wywołującego. Anulowanie jest sprawdzane pomiędzy asynchronicznymi fazami decode/hash przed zatwierdzeniem atomowej pamięci podręcznej.

Producent produkcyjny ponownie wykorzystuje już wyprowadzone ramki brokera dopiero po udanej analizie wizualnej, bez drugiego wideo download/extraction. Wymaga to operatora `modalityBridgeVideoDrilldownEnabled=true`, ścisłego określenia części `drilldown: true` i uwierzytelnionego rekordu klucza API ID. Wartości principal/session zadeklarowane przez klienta nigdy nie ustanawiają własności. Bez wszystkich trzech warunków nie miesza, nie zmienia rozmiaru ani nie zachowuje dodatkowych klatek. Awaria retencji pozwala zachować użyteczną reakcję wizualną. Wyrażone żądania omijają pamięć podręczną wyników całego wideo, więc wyniki w pamięci podręcznej nigdy nie odtwarzają uchwytów.

Pomyślne odpowiedzi JSON i SSE ujawniają co najwyżej cztery nieprzezroczyste uchwyty w ograniczonym nagłówku `x-omniroute-video-drilldown`. Autoryzowane źródła przeglądarek mogą odczytać ten nagłówek bez rozszerzania polityki CORS Origin. Nowe uchwyty używają `v1.<32-byte random base64url token>`, a rejestr zachowuje tylko ich skróty SHA-256. Parser reader/header akceptuje również starsze tokeny 64-szesnastkowe. Uwierzytelnionym konsumentem publicznym jest `GET /api/v1/video-bridge/drilldown?handle=...`, niezależnie bramkowany przez `modalityBridgeVideoDrilldownRemoteEnabled=true`. Jawne utrwalone fałszywe odwołuje dostęp nawet wtedy, gdy włączona jest starsza wersja rezerwowa `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env. Utrzymanie produkcji ma analogiczną, starszą wersję rezerwową `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Obydwa rozwiązania rezerwowe są domyślnie wyłączone.

Konsument uzyskuje własność z uwierzytelnionego klucza i stosuje politykę kluczy: zarówno GET jak i DELETE należą do kategorii punktu końcowego `video`, łącznie z aliasami `/v1` i `/api/v1`. Klucze z niepustą listą dozwolonych punktów końcowych muszą zawierać `video`; nieograniczone klucze pozostają kompatybilne. Konsument zwraca ten sam kod 404 w przypadku nieznanych, wygasłych i uchwytów innego klucza. Akceptuje `variant=preview|standard|detail` (maksymalny wymiar JPEG 320/640/1280, nigdy nie zwiększany), `limit=1..8` (lub starszy alias `frames`, nigdy oba), zerowe `page` i opcjonalne sekundy skupienia `start`/`end`. Zduplikowane klucze zapytań i okna z odwróconym fokusem są odrzucane. Każdy zwrócony wariant zawiera skrót zawierający jego rzeczywistą treść i metadane dotyczące rzeczywistej rozdzielczości, powiązane z zachowanym źródłem. Warianty są tworzone na podstawie odczytu, a nie przechowywane jako dodatkowe zachowane kopie. Odpowiedź JSON, włączając Base64/envelope, jest ograniczona do 32 MiB; zbyt duża strona zwraca 413 i klient musi zażądać mniejszej liczby klatek. Odczytuje sprawdzenie anulowania przy każdej zmianie rozmiaru i ponowne sprawdzenie ważności uchwytu przed powrotem. `DELETE` według właściciela jest idempotentny; usunięcie lub wygaśnięcie TTL zwalnia zachowane źródło i rozliczanie użytkowania.

Udostępniony magazyn jest lokalny dla procesu: uchwyty wygasają po ponownym uruchomieniu i nie można ich przenosić pomiędzy niezależnymi procesami OmniRoute. Statystyki zarządzania ujawniają tylko skuteczne zasady przechowywania/zdalnego przechowywania i zagregowane zatrzymane tylko entries/bytes, nigdy media, referencje, główne IDs lub uchwyty. Panel ustawień wideo pokazuje te wartości i może zachować oba przełączniki zgody. Niniejsza dokumentacja wdrożeniowa nie stanowi dowodu wdrożenia ani promocji na żywo; Akceptacja modelu rzeczywistego jest śledzona osobno.

Klatki są opisywane sekwencyjnie zgodnie ze skonfigurowanym modelem wideo. Puste zastąpienie Wideo dziedziczy ustawienie Wizja; jeśli oba są puste, automatyczny router Vision wybiera efektywny model obsługujący wizję. Pomyślne podpisy zastępują oryginalną część stabilnym przedrostkiem `[Video description:`, który oznacza również tekst jako niezaufaną obserwację pochodzącą z mediów i informuje dalsze modele, aby nie postępowały zgodnie z instrukcjami znalezionymi w mediach. Klucze pamięci podręcznej podpisów klatek obejmują bajty JPEG, monit, znacznik czasu i model efektywny; tylko pomyślne napisy są buforowane. Wpisy w pamięci podręcznej zachowują rzeczywisty, pomyślny model producenta, w tym model awaryjny; most zgłasza `mixed` gdy różne modele zostały wyprodukowane przez różne modele. Trafienie w pamięć podręczną ponownie wykorzystuje tę tożsamość producenta, zamiast ponownie oznaczać ją jako żądany plan routingu. Pamięć podręczna wyników całego wideo jest wprowadzana na każdym wejściu, które zmienia wyjście —, efektywny model, zasady próbkowania, liczbę klatek, tryb analizy semantycznej, odcisk palca SHA-256 znormalizowanej wskazówki fokusu, okno fokusu, `transcript`, `audioTranscript` i flaga stykówki —, więc zmiana któregokolwiek z tych wymiarów to pominięcie pamięci podręcznej, a nie przestarzałe ponowne użycie. Wersja zasad deduplikacji wizualnej, próg i ograniczona liczba ramek kandydujących są również wyraźnie widoczne w kluczu i metadanych pamięci podręcznej wyników; dlatego w przypadku zmiany zasad nie można ponownie wykorzystać nieaktualnego opisu całego filmu. Metadane Result-cache v4 przechowują tryb i odcisk palca, a nie surowe zadanie użytkownika. Metadane Guardrail raportują zarówno żądane, jak i efektywne tryby analizy; żądany tryb `focused` bez użytecznego tekstu użytkownika jest raportowany jako efektywnie `full`.

Poręcz wyodrębnia każdą obsługiwaną część wideo, ale opisuje nie więcej niż `modalityBridgeVideoMaxVideos`. W przypadku celu, dla którego udowodniono, że ma on `supportsVideo === false`, filmy wideo, które zakończyły się niepowodzeniem lub przekroczyły limit, stają się wyraźnymi znacznikami bezpiecznego tekstu, więc żaden surowy film nie przetrwa. Gdy możliwości nie są znane, części te zachowują nośnik wideo; każdy transkrypt zastępczy jest zgodny z powyższą konwersją tekstu ograniczonego. Cele z `supportsVideo === true` omijają most. Sygnał przerwania żądania klienta rozprzestrzenia się poprzez pobieranie, kolejkę brokerów, podprocesy i wywołania napisów; przerywa przerwy między filmami i nigdy nie przestaje otwierać się na surowe media.

Ustawienia środowiska wykonawczego są wspierane przez bazę danych i weryfikowane przez Zod:

| Klawisz                             | Domyślny    | Zasięg/zachowanie                                                                                             |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Opcjonalny czas działania, możliwość wyrażenia zgody                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` zachowuje napisy ogólne; `focused` używa ograniczonego, niezaufanego kontekstu najnowszego użytkownika |
| `modalityBridgeVideoModel`          | `""`        | Odziedzicz model Vision Bridge                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                          |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` lub proporcjonalne `segment_aware`; awaria detektora spada do `uniform`              |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                           |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120 000 ms                                                                                               |

Starsze wersje utrwalone Wartości limitu czasu wideo powyżej 120 sekund są ograniczone do terminu brokera; nowe ustawienia zapisywane powyżej tego limitu są odrzucane. `GET /api/modality-bridge/video/runtime` wymaga zaufanej, ostemplowanej lokalizacji sprzężenia zwrotnego przed uwierzytelnieniem lub sondowaniem w czasie wykonywania, a następnie wymaga autoryzacji zarządzania. Zwraca tylko `available`, oczyszczone wersje FFmpeg/ffprobe i ustaloną przyczynę, gdy środowisko wykonawcze jest niedostępne. Wewnętrzny punkt końcowy ekstrakcji nie jest publicznym przesyłaniem API: nasycenie kolejki zwraca `503` plus `Retry-After`, rozłączenie rozmówcy zwraca `499`, a ustalony termin brokera zwraca `504`. Przekonwertowane odpowiedzi dodają `video->text;model=<visionModel>;parts=<videos>` do centralnego nagłówka `x-omniroute-modality-bridge` bez usuwania segmentów Vision lub Audio.

### PII maskująca (`piiMasker.ts`)

Działa dalej** Zarówno** gradacja.

- **`preCall`** klonuje ładunek, przechodzi `system`, `messages`, `input` i `prompt` (w tym zwykłe elementy łańcuchowe) i stosuje `processPII()` (z `@/shared/utils/inputSanitizer`) do pól łańcuchowych `content`/`text`. Gdy `PII_REDACTION_ENABLED=true`, wykryte PII jest redagowane w ładunku wychodzącym. Jest to niezależne od `INPUT_SANITIZER_MODE` (który kontroluje tylko politykę szybkiego wstrzykiwania). Gdy redakcja jest wyłączona, wykrywanie nagrań rozmów jest liczone bez przepisywania treści.
- **`postCall`** głęboko klonuje odpowiedź, uruchamia `sanitizePIIResponse()` plus masker kształtu Responses-API (`maskResponsesOutput` — obejmuje `output_text` i `output[].content[].text`). Jeśli nastąpi jakakolwiek redakcja, zmodyfikowana odpowiedź zastępuje oryginał.

Poręcz nigdy się nie blokuje; tylko dodaje adnotacje (`meta.detections`, `meta.redacted`) lub przepisuje.

#### Wybór według typu, niestandardowe wzorce i liczniki detekcji

**Pulpit nawigacyjny → Ustawienia → Bezpieczeństwo → PII maskowanie** wybiera _co_ jest maskowane. Nie włącza maskowania: jest to nadal `PII_REDACTION_ENABLED` (żądanie) i `PII_RESPONSE_SANITIZATION` (odpowiedź + SSE), oba domyślnie wyłączone.

- **Wybór według typu** — wbudowane identyfikatory są wymienione w `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nieustawiony oznacza każdy typ (zachowanie przed istnieniem tego ustawienia). Wzorzec `ssn_us` silnika żądań jest mapowany na `ssn`. Szablony (Minimalny, Standardowy, Finansowy, Brazylijski, USA, GDPR, POPIA, Pełny) wypełniają tylko pola wyboru w UI.
- **identyfikatory GDPR i POPIA** — dwanaście wbudowanych identyfikatorów obejmujących EU i południowoafrykańskie identyfikatory osobiste (tabela poniżej). Ich wyrażenia regularne, walidatory i znaczniki jurysdykcji znajdują się w jednej tabeli, `src/shared/utils/piiPatterns.ts`, z której korzystają zarówno narzędzie do czyszczenia odpowiedzi (`src/lib/piiSanitizer.ts`), jak i maskowanie żądań (`src/shared/utils/inputSanitizer.ts`). Dopasowanie jest redagowane tylko wtedy, gdy jego walidator je zaakceptuje; Sam ciąg cyfr nigdy nie wystarczy. Operator, który zapisał zawężony wybór zanim istniały te identyfikatory, zachowuje swoje zachowanie do czasu zaznaczenia nowych identyfikatorów.
- **Wzory niestandardowe** — do 20 wzorów wyrażeń regularnych lub symboli wieloznacznych (`*` = do 64 znaków innych niż białe znaki, `?` = jeden). Dopasowania stają się `[CUSTOM_REDACTED]`. Każdy wzorzec przechodzi przez `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): maksymalnie 500 znaków, flagi ograniczone do `g i m s u`, musi się skompilować, musi przejść `safe-regex` (katastrofalne cofanie się) i nie może pasować do pustego łańcucha ani symbolu zastępczego redakcji. Wzorzec, który się nie powiedzie, jest odrzucany podczas zapisywania i testowania, a przechowywany wiersz, który się nie powiedzie, jest pomijany w czasie wykonywania, zamiast być kompilowany. Wzory niestandardowe działają tylko wtedy, gdy włączone jest maskowanie.
- **Liczniki detekcji** — liczy według typu (nigdy dopasowane wartości), jest przechowywany w pamięci i resetowany przy ponownym uruchomieniu (`src/lib/pii/piiDetectionStats.ts`). Zwiększają się tylko wtedy, gdy włączone jest maskowanie.

Ustawienia znajdują się w tabeli `key_value` (przestrzeń nazw `pii_settings`, `src/lib/db/piiSettings.ts`) i są odczytywane przez 1-sekundową pamięć podręczną. API:

| Metoda | Ścieżka                  | Zamiar                                                                                                |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stan flagi, `enabledTypes`, `customPatterns`, liczniki detekcji                                       |
| `PUT`  | `/api/settings/pii`      | Zamień `enabledTypes` (`null` = all) and/or `customPatterns`                                          |
| `POST` | `/api/settings/pii/test` | Przeprowadź próbę próbną jednego wzoru na próbce o masie co najwyżej 8 KB; nic nie jest przechowywane |

Wszystkie trzy wymagają autoryzacji zarządzania i zatwierdzenia treści za pomocą Zod (`src/shared/validation/schemas/piiSettings.ts`). Z wyłączonym logowaniem (`requireLogin=false`) `GET` i testowy punkt końcowy są otwarte, ale `PUT` nadal potrzebuje sesji dashboardu, klucza `manage` -scope API, tokena dostępu `oma_` z zakresem zapisu lub wyższym, lub tokena CLI lub tokena usługi wewnętrznej wysłanego z pętli zwrotnej.

#### Identyfikatory GDPR (EU) i POPIA (RPA).

| Id                  | Identyfikator                                | Walidacja                                                                                |
| ------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `iban`              | IBAN                                         | Znany kraj, dokładna długość dla tego kraju, ISO 13616 MOD-97-10                         |
| `eu_vat`            | EU VAT numer                                 | Znany prefiks państwa członkowskiego i format liczb tego stanu (bez wyszukiwania VIES )  |
| `es_dni_nie`        | Hiszpański DNI / NIE                         | Litera kontrolna (mod wartości 23); NIE to `X/Y/Z` + 7 cyfr                              |
| `it_codice_fiscale` | Włoski kodeks fiskalny                       | Litera kontrolna z tabel pozycji odd/even                                                |
| `pl_pesel`          | polski PESEL                                 | Ważona suma kontrolna i istniejąca zakodowana data urodzenia                             |
| `nl_bsn`            | holenderski BSN                              | 11-dowód (wagi 9..2, -1)                                                                 |
| `de_steuer_id`      | Niemiecki Steuer-ID                          | ISO 7064 Mod 11,10 plus zasady struktury cyfr (bez wiodącego 0)                          |
| `se_personnummer`   | Szwedzki numer personalny                    | Luhn w ciągu ostatnich dziesięciu cyfr i prawdopodobna data urodzenia (10 lub 12 cyfr)   |
| `za_id`             | Numer ID Republiki Południowej Afryki        | Luhna na wszystkich 13 cyfrach, ważne urodzenie month/day, cyfra obywatelstwa 0 lub 1    |
| `za_phone`          | Telefon z Afryki Południowej                 | Przedrostek `+27` / `27` lub krajowa forma `0..` zapisana spacją lub łącznikiem          |
| `za_vat`            | Numer VAT Republiki Południowej Afryki       | 10 cyfr zaczynających się od `4`** I** „VAT” / „BTW” w 48 znakach wcześniej              |
| `za_tax_ref`        | Numer podatkowy Republiki Południowej Afryki | 10 cyfr zaczynających się `0`-`3`, Luhn,** I** „podatek” / „SARS” w 48 znakach wcześniej |

Ponieważ formaty składające się wyłącznie z cyfr kolidują z numerami zamówień, numerami kompilacji i znacznikami czasu, najsłabsze formaty (`za_vat`, `za_tax_ref`) wymagają słowa kluczowego cue, a sam dziesięciocyfrowy numer `0..` nie jest traktowany jako numer telefonu w Republice Południowej Afryki. Oddzielone IBANs (`GB29 NWBK ...`) nie są dopasowane. Na ścieżce przesyłania strumieniowego pamięć jest sprawdzana tylko w bieżącym fragmencie. Identyfikatory wyprzedzają ogólne wzorce telefonów, więc zweryfikowany identyfikator zachowuje swój własny symbol zastępczy (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Szablony `gdpr` i `popia` wybierają odpowiednio identyfikatory EU i południowoafrykańskie. Samo maskowanie pozostaje dobrowolne (twarda reguła #20): nic tutaj nie zmienia domyślnej flagi funkcji.

### Natychmiastowy zastrzyk (`promptInjection.ts`)

Wykrywa struktury kontradyktoryjne w treściach dostarczanych przez użytkowników i egzekwuje skonfigurowane zasady. Zachowanie zależy od zmiennych środowiskowych i opcji konstruktora:

| Ustawienie | Kop. zm                                                                                              | Domyślny | Efekt                                                                                                                                                                                                             |
| ---------- | ---------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Włączony   | `INPUT_SANITIZER_ENABLED`                                                                            | `true`   | Kiedy `false`, zwarcie poręczy.                                                                                                                                                                                   |
| Tryb       | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`   | Polityka wtrysku: `block`, `warn` lub `log`. (`redact` jest akceptowany dla zgodności wstecznej, ale tak** nie** tekst wtrysku paska; żądanie przepisywania PII jest kontrolowane przez `PII_REDACTION_ENABLED`.) |
| Próg bloku | opcja `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Minimalna ważność wymagana do zablokowania. Medium jest domyślnie przeznaczone tylko do obserwacji.                                                                                                               |

**Pierwszeństwo trybu** (`getMode`): rozmówca `options.mode` → `INJECTION_GUARD_MODE`** zastąpienie flagi funkcji DB** (Dashboard → Ustawienia → Funkcje Flagi) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Dlatego też obejście pulpitu nawigacyjnego wygrywa z env vars, więc flagi funkcji UI sterują działającym strażnikiem na żywo (bez ponownego uruchamiania). Odczyt DB jest odporny na awarie: w przypadku błędu strażnik powraca do zachowania opartego na env, a gdy nie ustawiono żadnego zastąpienia, zachowanie jest identyczne z rozdzielczością tylko env.

Źródła detekcji:

1. `sanitizeRequest()` z `@/shared/utils/inputSanitizer` (wspólny zestaw detektorów używany w innym miejscu rurociągu).
2. Wbudowane `DEFAULT_GUARD_PATTERNS` (obecnie `system_override_inline` i `markdown_system_block`, oba `high` ).
3. Opcjonalne `customPatterns` przekazywane przez opcje konstruktora (ciągi znaków, wyrażenia regularne lub rekordy `{ name, pattern, severity }` ).

Kiedy `mode === "block"`** I** co najmniej jedno wykrycie spełnia próg ważności, `preCall` zwraca `{ block: true, message: "Request rejected: suspicious content detected" }`. W trybach `warn`/`log` poręcz rejestruje, ale pozwala na połączenie. Udostępniony pomocnik `evaluatePromptInjection()` jest również eksportowany dla osób wywołujących, które muszą oceniać podpowiedzi bez przechodzenia przez rejestr.

**Skanowanie powiązane (v3.8.20):** detektor sprawdza tylko** pierwsze 16 KB** połączonego tekstu zachęty — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtów) w `src/shared/utils/inputSanitizer.ts`. Zarówno `detectInjection()`, jak i `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` przed uruchomieniem pętli wzorca. Dyrektywy wtrysku znajdują się w górnej części danych wejściowych, więc ogranicza to wyrażenie regularne CPU/GC na ładunkach o wielkości wieluset KB bez wykrywania osłabienia (por. #3932, #4041).

### Maska poświadczeń (`credentialMasker.ts`)

Działa dalej** Zarówno** etapy, ostatnie w domyślnym łańcuchu (priorytet `95`). Redaguje dobrze znane wzorce kluczy API/tajnych tokenów z ładunku wychodzącego (treść wiadomości, argumenty wywołania narzędzia, wyniki narzędzia)** I** odpowiedź dostawcy, więc dane uwierzytelniające wklejone do monitu (lub powtórzone w wyniku narzędzia) nie wyciekną do dostawcy wyższego szczebla ani z powrotem do klienta.

- **Tylko z możliwością wyrażenia zgody** , taka sama konwencja jak w przypadku redakcji PII (twarda reguła #20-adjacent): wyłączona, chyba że `settings.credentialRedactionEnabled === true`** Lub** `CREDENTIAL_REDACTION_ENABLED=true`. Po wyłączeniu barierka nie — nigdy nie blokuje i nie zapisuje ponownie.
- `redactCredentials()` przechodzi przez całe drzewo payload/response (`walkValue()`, prototype-pollution-safe, cyklicznie bezpieczny przez `WeakSet`) i zastępuje dopasowania symbolem zastępczym `[REDACTED:<type>]`, klonując tylko te gałęzie, które faktycznie się zmieniły.
- `CREDENTIAL_PATTERNS` obejmuje klucze dostawcy LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), tokeny VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), klucze płatnicze (Stripe, Square), klucze chmurowe (klucz dostępu AWS, Twilio, SendGrid, Mailgun), klucze prywatne / JWTs, ciągi połączeń niosące poświadczenia (`mongodb://user:pass@...` itp.) oraz ogólny wzorzec wartości nagłówka `Authorization`/`x-api-key`/`api-key`/`apikey`. Klucze w kształcie nagłówka (`authorization`, `x-api-key`, `api-key`, `apikey`) są redagowane strukturalnie (tylko wartość, zachowany przedrostek schematu taki jak `Bearer `/`Basic ` ), a nie poprzez ogólne wyrażenie regularne.
- Poręcz nigdy się nie blokuje; przepisuje tylko (`modifiedPayload` / `modifiedResponse`) i dodaje adnotacje (`meta.credentialsRedacted`, `meta.count`).

Strażnik regresji: `tests/unit/credential-masker-guardrail.test.ts`.

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
