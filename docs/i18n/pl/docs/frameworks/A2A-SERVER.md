# OmniRoute A2A Server Documentation (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Protokół Agent-to-Agent v0.3 — OmniRoute jako inteligentny agent routingu

Interfejs A2A ma dwie formy:

- **JSON-RPC 2.0** pod adresem `POST /a2a` (kanoniczny punkt wejścia zdefiniowany w `src/app/a2a/route.ts`).
- **REST** w ramach `/api/a2a/*` na potrzeby pulpitów i narzędzi (status, lista zadań, anulowanie).

Zadania są śledzone przez `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, domyślny TTL wynosi 5 minut). Umiejętności są przekazywane do obsługi za pośrednictwem `A2A_SKILL_HANDLERS` w `src/lib/a2a/taskExecution.ts`.

## Wykrywanie agenta

```bash
curl http://localhost:20128/.well-known/agent.json
```

Zwraca kartę agenta opisującą możliwości i umiejętności OmniRoute oraz wymagania dotyczące uwierzytelniania.

Pole `version` karty agenta jest pobierane z `process.env.npm_package_version` (zobacz `src/app/.well-known/agent.json/route.ts:13`), dzięki czemu przy każdym wydaniu pozostaje automatycznie zsynchronizowane z `package.json`.

---

## Uwierzytelnianie

Wszystkie żądania do `/a2a` wymagają klucza API przekazanego w nagłówku `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Jeśli na serwerze nie skonfigurowano klucza API, uwierzytelnianie jest pomijane.

## Włączanie

A2A jest kontrolowane za pomocą przełącznika **Endpoints → A2A** i domyślnie pozostaje wyłączone. Gdy jest wyłączone,
`GET /api/a2a/status` zgłasza `status: "disabled"` oraz `online: false`; wywołania JSON-RPC kierowane do
`POST /a2a` zwracają HTTP 503 z kodem błędu JSON-RPC `-32000`.

---

## Metody JSON-RPC 2.0

### `message/send` — Wykonanie synchroniczne

Wysyła wiadomość do umiejętności i oczekuje na pełną odpowiedź.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

W przypadku `smart-routing` wartość `metadata.combo` jawnie zastępuje
`metadata.model` w żądaniu do bramy; jest wysyłana jako rzeczywisty `model`,
a nie jako ignorowane pole JSON `x-combo`. Nadal obowiązują standardowy klucz API bramy
oraz autoryzacja dla poszczególnych elementów docelowych. Nieprawidłowa lub pusta kombinacja jest odrzucana.

Wynik udostępnia pola `requested_combo` (intencja wywołującego), `dispatched_model`
(rzeczywiste żądanie do bramy), `response_model` (odpowiedź bramy) oraz
`confirmed_combo`. Ostatnie pole ma wartość `null`, chyba że brama jawnie
wskaże kombinację. Dzienniki decyzji A2A przypisują wykonanie wyłącznie do
potwierdzonej kombinacji, zachowując niepotwierdzone żądanie jako `requestedCombo`.

**Odpowiedź:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "requested_combo": "fast-coding",
      "confirmed_combo": null,
      "dispatched_model": "fast-coding",
      "response_model": "claude-sonnet",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — Strumieniowanie SSE

Działa tak samo jak `message/send`, ale zwraca zdarzenia Server-Sent Events, umożliwiając strumieniowanie w czasie rzeczywistym.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**Zdarzenia SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Sprawdzanie stanu zadania

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Anulowanie zadania

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Dostępne umiejętności

OmniRoute ujawnia 6 umiejętności A2A podłączonych do `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Każdy moduł umiejętności żyje w `src/lib/a2a/skills/`.

| Umiejętność                   | ID                   | Opis                                                                                                                                                          | Tagi                            | Przykłady                                    |
| :---------------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------ | :------------------------------------------- |
| Inteligentne wyznaczanie tras | `smart-routing`      | Kieruje monit przez optymalną provider/combo przy użyciu punktacji + silnika combo OmniRoute                                                                  | routing, dostawcy               | „Przekieruj ten monit przez najlepszy model” |
| Zarządzanie kwotami           | `quota-management`   | Raportuje stan limitów poszczególnych dostawców, pomaga dzwoniącym zdecydować, kiedy skorzystać z throttle/switch                                             | kontyngent, dostawcy            | „Sprawdź kwotę antropiczną”                  |
| Wykrywanie dostawcy           | `provider-discovery` | Wyświetla listę zainstalowanych dostawców z możliwościami, flagami poziomu bezpłatnego i statusem OAuth                                                       | dostawcy, odkrycie              | „Jaki dostawcy są dostępni?”                 |
| Analiza kosztów               | `cost-analysis`      | Szacuje koszt request/conversation, biorąc pod uwagę najnowsze użycie katalogu +                                                                              | koszt, zużycie                  | „Oszacuj koszt tej rozmowy”                  |
| Raport o stanie zdrowia       | `health-report`      | Łączy wyłącznik automatyczny, czas odnowienia i stan blokady według dostawcy                                                                                  | zdrowie, odporność              | „Pokaż stan zdrowia wszystkich dostawców”    |
| Lista możliwości              | `list-capabilities`  | Zwraca pełny 45-wpisowy katalog umiejętności agenta (konfiguracja 23 API + 21 CLI + 1) jako tabelę przecen z surowym SKILL.md URLs do wstrzykiwania kontekstu | katalog, odkrycie, umiejętności | „Wymień wszystkie możliwości OmniRoute ”     |

> Karta agenta powinna być zgodna z aktualnym katalogiem dostawców 386; liczba dostawców i metadane free/no-auth pochodzą z rejestru środowiska wykonawczego.

### `list-capabilities` Szczegóły umiejętności

Umiejętność `list-capabilities` jest szczególnie przydatna dla agentów zewnętrznych, którzy muszą odkryć, co ujawnia OmniRoute przed wysłaniem wywołań API. Zwraca ustrukturyzowany artefakt tabeli przecen:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Każdy wiersz zawiera kolumnę `rawUrl`, dzięki czemu agenci mogą natychmiast pobrać pełny SKILL.md. Pole `metadata.totalSkills` odzwierciedla rozmiar katalogu (obecnie 45). Implementacja: `src/lib/a2a/skills/listCapabilities.ts`. Zobacz także [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (pomocniczy)

Punkt końcowy JSON-RPC `/a2a` jest kanonicznym punktem wejścia A2A. Poniższe punkty końcowe REST zapewniają pomocniczy dostęp do pulpitów nawigacyjnych i narzędzi zewnętrznych:

| Punkt końcowy                | Metoda | Opis                                                              | Autoryt                                                                                                          |
| :--------------------------- | :----- | :---------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET    | Status serwera, zarejestrowane umiejętności                       | (publiczny)                                                                                                      |
| `/api/a2a/tasks`             | GET    | Lista zadań z filtrami                                            | klucz zarządzania lub API (patrz poniżej)                                                                        |
| `/api/a2a/tasks/[id]`        | GET    | Pobierz zadanie przez ID                                          | klucz zarządzania lub API (patrz poniżej)                                                                        |
| `/api/a2a/tasks/[id]/cancel` | POST   | Anuluj uruchomione zadanie                                        | klucz zarządzania lub API (patrz poniżej)                                                                        |
| `/.well-known/agent.json`    | GET    | Karta Agenta (odkrycie A2A )                                      | (publiczny, buforowany 3600s)                                                                                    |
| `/api/a2a/tasks`             | POST   | Delegacja przychodząca do floty OmniConductor (konduktor PRD RF5) | tak samo jak `GET` plus `OMNIROUTE_API_KEY`, jeśli ustawione, gdy `REQUIRE_API_KEY` jest wyłączone; `a2aEnabled` |

To, kto dotrze do tras `/api/a2a/tasks*` zależy od ustawień logowania i klucza API:

- `requireLogin=true` (domyślnie): oprogramowanie pośrednie akceptuje tylko poświadczenia zarządzania (sesja pulpitu nawigacyjnego, klucz `manage` -scope API, token dostępu `oma_` ) i `OMNIROUTE_API_KEY`. Zwykły klucz wnioskowania pobiera `403`. W nagłówku `Authorization` oprogramowanie pośredniczące przyjmuje tylko `OMNIROUTE_API_KEY` jako `Bearer <key>`; goły klawisz lub tabulator po tym, `Bearer` otrzyma `401`.
- `requireLogin=false` lub okno pętli zwrotnej przed włączeniem: z `REQUIRE_API_KEY=true` akceptowany jest każdy ważny klucz OmniRoute API lub dane uwierzytelniające do zarządzania, a anonimowi dzwoniący otrzymują `401`; przy wyłączonym `REQUIRE_API_KEY` trasy są otwarte.
- `POST /api/a2a/tasks` dodatkowo wymaga `OMNIROUTE_API_KEY` w nagłówku `Authorization` gdy ta zmienna jest ustawiona, a `REQUIRE_API_KEY` jest wyłączone. Inne nagłówki, takie jak `x-api-key`, nie liczą się tam. Przy wyłączonym logowaniu lub przed wejściem na pokład klucz jest przekazywany z prefiksem `Bearer` lub bez; przy włączonym logowaniu tylko `Bearer <key>` przechodzi przez oprogramowanie pośrednie.

Tam, gdzie wymagane jest poświadczenie, token `read` -scope `oma_` działa tylko dla `GET`.

**Delegacja konduktora przychodzącego (`POST /api/a2a/tasks`):** zewnętrzni agenci A2A delegują prace związane z kodowaniem flocie OmniConductor poprzez OmniRoute. Treść: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — tylko Umiejętności floty konduktorów (te ogłoszone na Karcie Agenta) podlegają delegowaniu; `metadata.conductor.repo.url` jest wymagany (flota działa na repozytoriach git). Trasa jest tłumaczona na `POST /v1/tasks` koncentratora przy użyciu `CONDUCTOR_ORCHESTRATOR_TOKEN` po stronie serwera (awaria `CONDUCTOR_HUB_TOKEN`) i zwraca `201 { conductor_task_id, state: "submitted" }`; stany zadań przepływają z powrotem przez lustro SSE→A2A (RF1) i są widoczne poprzez `GET /api/a2a/tasks?skill=conductor`.

---

## Dodanie nowej umiejętności

1. **Utwórz plik umiejętności:** `src/lib/a2a/skills/<your-skill>.ts`

   Eksportuj funkcję asynchroniczną `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Podążaj za kształtem istniejących umiejętności, takich jak `smartRouting.ts`. Jeśli umiejętność wywołuje ponownie do OmniRoute przez HTTP, zbuduj nagłówki za pomocą `buildSelfLoopHeaders(caller)` z `src/lib/a2a/selfLoopAuth.ts`, aby wywołanie działało z kluczem wywołującego A2A, a nie `OMNIROUTE_API_KEY`, i przekaż `redirect: "error"` do `fetch`, aby przekierowanie nigdy nie otrzymało klucza. Pomocnik buduje tylko nagłówki; każda umiejętność sama ustala politykę przekierowań. Rzuca `UnsafeSelfLoopTargetError` zamiast dołączać klucz, gdy rozwiązany podstawowy URL to zwykły http poza siecią prywatną (pętla zwrotna, nazwa kontenera lub usługi oraz adresy prywatne są w porządku) lub przechowuje dane uwierzytelniające, więc umiejętność, która połyka odrzucone wywołania, musi ponownie zgłosić ten błąd.

2. **Osoba zajmująca się rejestracją:** w `src/lib/a2a/taskExecution.ts` dodaj wpis do `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Ujawnij na karcie agenta:** w `src/lib/a2a/agentCardMetadata.ts` (współdzielonym przez `/.well-known/agent.json` i `/.well-known/agent-card.json`), dołącz do tablicy `skills` :

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Napisz testy:** `tests/unit/a2a-<your-skill>.test.ts`. Zakryj szczęśliwą ścieżkę ścieżki błędu +.

5. **Dokument** nowa umiejętność w tabeli `Available Skills` w tym pliku.

---

## Czas życia zadania

Zadania wygasają po upływie `ttlMinutes` (domyślnie 5 min) — wartość ta jest konfigurowana w konstruktorze `A2ATaskManager` w pliku `src/lib/a2a/taskManager.ts:82`. Aby ją dostosować, utwórz własną instancję `A2ATaskManager` i przekaż inną wartość (np. `new A2ATaskManager(15)` dla 15-minutowego czasu życia). Proces działający w tle usuwa wygasłe zadania co 60 sekund.

---

## Cykl życia zadania

```
przesłane → w toku → ukończone
                    → zakończone niepowodzeniem
                    → anulowane
```

- Zadania domyślnie wygasają po 5 minutach (zobacz [Czas życia zadania](#task-ttl))
- Stany końcowe: `completed`, `failed`, `cancelled`
- Dziennik zdarzeń rejestruje każdą zmianę stanu

---

## Kody błędów

| Kod    | Znaczenie                                |
| :----- | :--------------------------------------- |
| -32700 | Błąd parsowania (nieprawidłowy JSON)     |
| -32600 | Nieprawidłowe żądanie / Brak autoryzacji |
| -32601 | Nie znaleziono metody lub umiejętności   |
| -32602 | Nieprawidłowe parametry                  |
| -32603 | Błąd wewnętrzny                          |
| -32000 | Punkt końcowy A2A jest wyłączony         |

---

## Przykłady integracji

### Python (żądania)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (przynieś)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
