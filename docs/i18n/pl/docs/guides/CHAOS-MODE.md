# Chaos Mode (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Panel:** **Tryb Chaos** (pasek boczny) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sesja panelu) · `POST /api/skills/collect/chaos` (klucz API)  
> **Źródło:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Tryb Chaos wysyła **jedno zadanie do kilku dostawców jednocześnie** — każdy uczestniczący dostawca
udostępnia jedną instancję modelu, a wszystkie odpowiedzi są prezentowane obok siebie (lub łączone w sekwencję). Jest to
mechanizm wykonywania wielomodelowego, a nie strategia routingu: nie ma on żadnego wpływu na zwykły ruch
`/v1/chat/completions`.

**Wyjaśnienie — trzy różne elementy zawierają słowo „chaos” w nazwie:**

| Element                       | Czym jest                                                                                                                                                                                           | Gdzie opisano                                |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Tryb Chaos**                | Opisana tutaj strona panelu i interfejs API: rozsyła jedno zadanie do wielu dostawców (równolegle lub w trybie współpracy).                                                                         | Ten przewodnik                               |
| `auto/chaos`                  | Identyfikator modelu Auto-Combo: równoległe rozsyłanie, jeden model na dostawcę i po jednym wywołaniu nadrzędnym. Nie jest to wstrzykiwanie błędów ([szczegóły](#autochaos-równoległe-rozsyłanie)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Konfiguracja kombinacji Chaos | Utrwalona kombinacja z `config.chaos.enabled` rozsyła żądania w ten sam sposób (tylko przez API); `judgeModel` jedynie wybiera końcową odpowiedź, bez wywołania syntezy.                            | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: równoległe rozsyłanie

`auto/chaos` **nie** jest mechanizmem wstrzykiwania błędów ani testowania odporności. Żądanie
`model: "auto/chaos"` wysłane do `/v1/chat/completions`:

1. Tworzy panel zawierający **jeden model na dostawcę**: pierwszy model kandydujący każdego
   połączonego dostawcy, zgodnie z kolejnością w puli kandydatów, maksymalnie 5 członków
   (`OMNIROUTE_CHAOS_MAX_PANEL`, z górnym limitem 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Pakiet wag `chaos-mode`
   ustawia wyłącznie `weight` każdego członka; mechanizm rozsyłania nie odczytuje tej wartości.
2. Wysyła to samo żądanie do wszystkich członków panelu **równolegle**, więc jedno żądanie
   generuje jedno wywołanie nadrzędne na każdego członka panelu
   (`open-sse/services/autoCombo/chaosEngine.ts`, wywoływane z
   `open-sse/services/combo.ts`).
3. Przesyła jeden wiersz statusu dla każdego członka panelu w chwili otrzymania wyniku: domyślnie komentarz SSE
   (`: chaos <index> ok|fail <model>`), a także zdarzenie `omni-chaos-part`
   (`model`, `index`, `ok`, `error`), gdy żądanie ustawia
   `stream_options.include_chaos_parts: true`. Nie zawierają one tekstu odpowiedzi.
4. Wysyła **jedną** odpowiedź panelu jako końcowy fragment w stylu OpenAI: odpowiedź pierwszego
   członka panelu (`auto/chaos` ustawia go jako `judgeModel`), jeśli jego wywołanie zakończy się powodzeniem, a w przeciwnym razie
   odpowiedź ostatniego członka, którego wywołanie zakończyło się powodzeniem. Pozostałe odpowiedzi panelu nie są zwracane, więc
   płacisz za N wywołań, a otrzymujesz jedno ukończenie.

## Organizować coś

1. Otwarte** Pulpit nawigacyjny → tryb chaosu** (`/dashboard/chaos`).
2. Obróć to** NA** — Statki w trybie Chaosu** domyślnie wyłączone** (`enabled: false` w `src/lib/chaos/chaosConfig.ts`). Gdy jest wyłączony, `POST /api/chaos/run` odpowiada `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Wybierz uczestników i ustawienia domyślne (utrwalone dla każdej instancji za pośrednictwem magazynu ustawień):

   | Pole                | Oznaczający                                                                      | Domyślne / limity                                       |
   | ------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------- |
   | `enabled`           | Przełącznik główny                                                               | `false`                                                 |
   | `defaultMode`       | `parallel` lub `collaborative` (patrz poniżej)                                   | `parallel`                                              |
   | `providerOverrides` | Udział poszczególnych dostawców (`providerId`, opcjonalnie `modelId`, `enabled`) | puste = dla każdego aktywnego dostawcy, maksymalnie 200 |
   | `systemPrompt`      | Zastąpienie wbudowanego monitu systemu Chaos                                     | opcjonalnie, maks. 10 000 znaków                        |
   | `timeoutMs`         | Maksymalny czas na połączenie modelu                                             | `120000` (5 000–600 000)                                |
   | `maxTokens`         | `max_tokens` za połączenie modelu                                                | `4096` (256–128 000)                                    |

4. Daj każdemu uczestniczącemu dostawcy a** model** . Model dostawcy to `modelId` jego włączonego zastąpienia na stronie Tryb Chaosu (wygrywa), w przeciwnym razie** domyślny model** jego połączenia. Identyfikator dostawcy nigdy nie jest używany jako nazwa modelu. Dostawca, który nie ma żadnego z nich, nie jest** nie zadzwonił** : pojawia się w wynikach jako `status: "error"` z komunikatem _"Nie ustawiono modelu dla tego dostawcy. Ustaw dla niego model na stronie Tryb Chaosu lub model domyślny w połączeniu."_ i pustym `modelId`, podczas gdy pozostali dostawcy działają normalnie. Jeśli żaden wybrany dostawca nie ma modelu, uruchomienie zakończy się niepowodzeniem przed jakimkolwiek żądaniem nadrzędnym z komunikatem _"Żaden dostawca nie ma zestawu modelu. ..."_ (HTTP 500 na obu punktach końcowych).
5. Uruchom A** przetestuj na samej stronie** — panel wyników pokazuje odpowiedź, status i czas trwania każdego dostawcy.

## Tryby wykonywania

- **`parallel`** — każdy model otrzymuje jednocześnie to samo zadanie; wszystkie odpowiedzi są
  zwracane niezależnie.
- **`collaborative`** — modele działają **w łańcuchu**: każdy z nich widzi wynik poprzedniego modelu
  i otrzymuje polecenie jego dopracowania, rozszerzenia, skrytykowania lub zaproponowania alternatywy. Pole `summary`
  odpowiedzi łączy pomyślne wyniki w kolejności łańcucha (wykonania równoległe nie mają pola `summary`).

## API

### sesja panelu `POST /api/chaos/run` —

Uwierzytelnione za pomocą plików cookie (sesja zarządzania — patrz [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); używany przez stronę panelu kontrolnego.

```jsonc
// body
{
  "task": "Compare approaches to X", // required
  "providers": ["glm", "kimi"], // optional filter
  "mode": "parallel", // optional — overrides defaultMode
  "systemPrompt": "…", // optional override
  "maxTokens": 4096, // optional override
}
```

### `POST /api/skills/collect/chaos` — API klucz

Wariant tokena na okaziciela dla rozmówców zewnętrznych. Klucz musi nosić** Pozwolenie na tryb chaosu** (`chaosModeEnabled`), czyli** domyślnie wyłączone** — włącz to za pomocą klucza** Pulpit nawigacyjny → API Menedżer → klawisz edycji → uprawnienia → Tryb chaosu** . To samo ciało co powyżej.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Oba punkty końcowe zwracają ten sam kształt:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative mode only
}
```

## Rozwiązywanie problemów

- **`400 Chaos Mode is not enabled`** — krok 2 powyżej: przełącznik globalny jest wyłączony.
- **Klucz API zostaje odrzucony na `/api/skills/collect/chaos`** — kluczowi brakuje uprawnień `chaosModeEnabled` dla poszczególnych klawiszy (domyślnie wyłączone; jest to ustawienie, a nie błąd).
- **Dostawca pokazuje `No model set for this provider`** — ustaw swój model na stronie Tryb Chaosu lub model domyślny na swoim połączeniu (patrz Konfiguracja, krok 4).
- **W wynikach brakuje oczekiwanego dostawcy** — sprawdź `providerOverrides` na stronie Tryb Chaosu (wyłączone nadpisanie wyklucza to) i czy połączenie dostawcy jest aktywne.
