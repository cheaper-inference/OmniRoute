# Custom JSON API provider nodes (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Niestandardowy węzeł JSON API łączy biznesowy punkt końcowy JSON, który nie obsługuje protokołu OpenAI ani Anthropic. OmniRoute wypełnia szablon żądania JSON, wysyła go do całego punktu końcowego URL, odczytuje odpowiedź ze ścieżki odpowiedzi i zwraca ją klientowi w formacie klienta (zakończenia czatu, odpowiedzi, wiadomości, ...).

Jest to węzeł kompatybilny z OpenAI z `apiType: "custom-json"`; jego identyfikator ma postać `openai-compatible-custom-json-<suffix>`. Formularz panelu nie jest jeszcze dostępny. Utwórz i edytuj te węzły za pomocą poniższego węzła dostawcy API.

## Utwórz węzeł

`POST /api/provider-nodes` (uwierzytelnienie zarządcze):

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl` jest** kompletny** punkt końcowy URL. Nic nie jest dołączane (bez `/chat/completions`, bez `/models`) i w przeciwieństwie do innych węzłów kompatybilnych z OpenAI, nie ma domyślnego URL. Musi to być `http(s)`, bez osadzonych poświadczeń lub `#fragment`, i przekazuje tę samą wychodzącą osłonę URL co każdy węzeł dostawcy, zarówno gdy węzeł jest zapisywany, jak i przy każdym żądaniu.
- Węzeł wysyłający klucz połączenia (`authType` `bearer` lub `api-key`, łącznie z wartością domyślną) musi używać `https://`. Zwykły `http://` jest akceptowany tylko w przypadku hosta z pętlą zwrotną (`localhost`, `127.0.0.0/8`, `::1`) lub z `authType: "none"`, który nie wysyła żadnego klucza. Prywatne adresy LAN (`10.x`, `172.16-31.x`, `192.168.x`) nie są wyłączone: każdy w tej sieci może odczytać klucz. Zapisanie takiego węzła kończy się niepowodzeniem w przypadku `400`, a węzeł zapisany wcześniej kończy się niepowodzeniem przy każdym żądaniu z tą samą wiadomością, przed wysłaniem jakiegokolwiek żądania. Aby uzyskać kluczowy punkt końcowy na LAN, umieść go za TLS (na przykład odwrotne proxy).
- `customJson` jest sprawdzane za pomocą Zod; nieznane klucze są odrzucane. Każde pole jest opcjonalne:

| Pole              | Wartości                               | Domyślny                                               |
| ----------------- | -------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                 | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`            | `bearer`                                               |
| `authHeader`      | nazwa nagłówka używana, gdy `api-key`  | `X-API-Key`                                            |
| `requestTemplate` | obiekt JSON (≤ 64 KB, głębokość ≤ 32)  | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | ścieżka polna lub `$` dla całego ciała | `choices[0].message.content`                           |

- Sekret pozostaje w kluczu API połączenia, nigdy w szablonie. `bearer` wysyła `Authorization: Bearer <key>`; `api-key` wysyła `<authHeader>: <key>`. Nagłówkiem uwierzytelniania nie może być nagłówek `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` ani nagłówek typu hop-by-hop. Dzięki `none` połączenia nie wymagają klucza.
- Dodatkowe nagłówki statyczne korzystają ze zwykłego `customHeaders` węzła (taka sama weryfikacja jak w przypadku każdego innego kompatybilnego węzła; nagłówki uwierzytelniania nie są tam dozwolone).

`PUT /api/provider-nodes/<id>` akceptuje to samo `customJson` i przepisuje `baseUrl` oraz konfigurację dla każdego istniejącego połączenia węzła. Pominięcie `customJson` powoduje zachowanie zapisanej konfiguracji; przełączenie `apiType` na `chat` lub `responses` usuwa je z węzła i jego połączeń.

Następnie jak zwykle dodaj połączenie do węzła (`POST /api/providers` z identyfikatorem węzła) i zażądaj `<prefix>/<model>`, na przykład `biz/assistant-v1`. Punkt końcowy nie udostępnia żadnej listy modeli, więc dodaj identyfikatory modeli ręcznie.

## Szablony żądań

Szablony są zwykłe JSON. Wartość ciągu może zawierać znaczniki `{{placeholder}}` ; nic nie jest oceniane ani wykonywane, a klucze obiektów nigdy nie są zastępowane.

| Symbol zastępczy     | Wartość                                                                                |
| -------------------- | -------------------------------------------------------------------------------------- |
| `{{prompt}}`         | Tekst ostatniej wiadomości użytkownika (części tekstowe połączone znakami nowej linii) |
| `{{messages}}`       | Rozmowa w formacie czatu OpenAI                                                        |
| `{{model}}`          | Żądany identyfikator modelu bez prefiksu dostawcy                                      |
| `{{stream}}`         | Zawsze `false` — punkt końcowy odpowiada jednym dokumentem JSON                        |
| `{{request.<path>}}` | Pole przetłumaczonego żądania (format czatu OpenAI ).                                  |

- Wartość będąca dokładnie jednym symbolem zastępczym zachowuje swój typ JSON (`"{{messages}}"` staje się tablicą); symbol zastępczy wewnątrz dłuższego ciągu znaków jest wstawiany jako tekst.
- Symbol zastępczy, który nie daje żadnego rezultatu, powoduje niepowodzenie żądania za pomocą HTTP 400 zamiast wysyłania niekompletnego ładunku.
- Ścieżki używają notacji kropkowej i indeksów numerycznych (`data.items[0].text`). `__proto__`, `prototype` i `constructor` są odrzucane w kluczach i ścieżkach.

## Odpowiedzi

Wartość `responsePath` staje się odpowiedzią asystenta: ciągi znaków przechodzą, inne wartości JSON są serializowane. Brakujące pole lub pole `null` albo treść inna niż JSON zwraca HTTP 502. Przekazywane są statusy błędów poprzedzających. W przypadku klientów strumieniowych OmniRoute czeka na całą odpowiedź JSON, a następnie emituje ją jako jeden fragment treści plus fragment końcowy; to nie jest przesyłanie strumieniowe tokenów. Wywołania narzędzi i pola użycia nie są mapowane.

## Nigdy nie odtwarzane

Żądanie biznesowe może mieć skutki uboczne, nawet jeśli zakończy się niepowodzeniem. dlatego OmniRoute wysyła to raz:

- brak ponownych prób transportu i brak dalszych przekierowań;
- brak ponownej próby na innym połączeniu (rezerwacja konta) — awaria zostaje zwrócona w niezmienionym stanie, a połączenie nie jest schładzane;
- brak powrotu do następnego celu kombinacji, nawet w przypadku pustej lub nieudanej odpowiedzi.

Oddzielne żądania klientów i panele fusion, które jawnie wywołują kilka modeli, nadal niezależnie wywołują punkt końcowy.

## Testowanie węzła

Zapisywanie połączenia, połączenie** Test** Kontrole stanu przycisków i tła nigdy nie wywołują punktu końcowego: sprawdzają jedynie zapisaną konfigurację i zgłaszają, że połączenie nie jest możliwe do zweryfikowania.

`POST /api/provider-nodes/validate` z `"apiType": "custom-json"` i polami węzłów (`baseUrl`, `apiKey`, `customJson`, opcjonalnie `customHeaders` i `modelId`) wysyła dokładnie jedno prawdziwe żądanie, z `ping` jako najnowszym tekstem użytkownika. Odpowiada `{ "valid": true }` lub status nadrzędny (nigdy organ nadrzędny).

## Składowanie

Konfiguracja jest przechowywana w `provider_nodes.custom_json_config_json` (migracja `240_provider_node_custom_json_config.sql`) i kopiowana do `providerSpecificData.customJson` każdego połączenia.

Implementacja: `open-sse/utils/customJson.ts` (walidacja i tworzenie szablonów), `open-sse/executors/customJson.ts` (executor), `open-sse/services/combo/noReplayLatch.ts` i `src/sse/handlers/chat/responsePolicies.ts` (no-replay).
