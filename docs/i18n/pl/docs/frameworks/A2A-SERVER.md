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

OmniRoute udostępnia 6 umiejętności A2A podłączonych w `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Każdy moduł umiejętności znajduje się w `src/lib/a2a/skills/`.

| Umiejętność        | ID                   | Opis                                                                                                                                                          | Tagi                       | Przykłady                                     |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------- | :-------------------------------------------- |
| Smart Routing      | `smart-routing`      | Kieruje prompt przez optymalnego dostawcę/kombo, korzystając z silnika combo OmniRoute oraz punktacji                                                         | routing, providers         | "Przekieruj ten prompt przez najlepszy model" |
| Quota Management   | `quota-management`   | Raportuje stan limitów (quota) dla poszczególnych dostawców, pomaga wywołującym zdecydować, kiedy ograniczyć ruch lub przełączyć dostawcę                     | quota, providers           | "Sprawdź limit dla anthropic"                 |
| Provider Discovery | `provider-discovery` | Wyświetla listę zainstalowanych dostawców wraz z możliwościami, flagami darmowego planu i statusem OAuth                                                      | providers, discovery       | "Jacy dostawcy są dostępni?"                  |
| Cost Analysis      | `cost-analysis`      | Szacuje koszt żądania/konwersacji na podstawie katalogu i ostatniego użycia                                                                                   | cost, usage                | "Oszacuj koszt tej konwersacji"               |
| Health Report      | `health-report`      | Agreguje stan circuit breakera, cooldownu i blokady dla każdego dostawcy                                                                                      | health, resilience         | "Pokaż stan zdrowia wszystkich dostawców"     |
| List Capabilities  | `list-capabilities`  | Zwraca pełny, 45-pozycyjny katalog Agent Skills (23 API + 21 CLI + 1 config) jako tabelę markdown z surowymi adresami URL SKILL.md do wstrzykiwania kontekstu | catalog, discovery, skills | "Wymień wszystkie możliwości OmniRoute"       |

> Kartę agenta (Agent Card) należy utrzymywać w zgodności z aktywnym katalogiem 375 dostawców; liczby dostawców oraz metadane dotyczące darmowego dostępu/braku uwierzytelniania pochodzą z rejestru środowiska uruchomieniowego.

### Szczegóły umiejętności `list-capabilities`

Umiejętność `list-capabilities` jest szczególnie przydatna dla zewnętrznych agentów, którzy muszą wykryć, co udostępnia OmniRoute, przed wysłaniem wywołań API. Zwraca ona artefakt w postaci ustrukturyzowanej tabeli markdown:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Każdy wiersz zawiera kolumnę `rawUrl`, dzięki czemu agenty mogą natychmiast pobrać pełny plik SKILL.md. Pole `metadata.totalSkills` odzwierciedla rozmiar katalogu (obecnie 45). Implementacja: `src/lib/a2a/skills/listCapabilities.ts`. Zobacz także [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (pomocnicze)

Punkt końcowy JSON-RPC `/a2a` jest kanonicznym punktem wejścia A2A. Poniższe punkty końcowe REST zapewniają pomocniczy dostęp dla pulpitów i narzędzi zewnętrznych:

| Punkt końcowy                | Metoda | Opis                                                                | Uwierzytelnianie                                   |
| :--------------------------- | :----- | :------------------------------------------------------------------ | :------------------------------------------------- |
| `/api/a2a/status`            | GET    | Stan serwera, zarejestrowane umiejętności                           | (publiczne)                                        |
| `/api/a2a/tasks`             | GET    | Lista zadań z filtrami                                              | zarządzanie                                        |
| `/api/a2a/tasks/[id]`        | GET    | Pobranie zadania według identyfikatora                              | zarządzanie                                        |
| `/api/a2a/tasks/[id]/cancel` | POST   | Anulowanie wykonywanego zadania                                     | zarządzanie                                        |
| `/.well-known/agent.json`    | GET    | Karta agenta (wykrywanie A2A)                                       | (publiczne, buforowane przez 3600s)                |
| `/api/a2a/tasks`             | POST   | Delegowanie przychodzące do floty OmniConductor (Conductor PRD RF5) | Bearer względem `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Przychodzące delegowanie Conductor (`POST /api/a2a/tasks`):** zewnętrzni agenci A2A delegują prace programistyczne do floty OmniConductor za pośrednictwem OmniRoute. Treść żądania: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — delegować można wyłącznie umiejętności floty Conductor (te ogłoszone na Karcie agenta); pole `metadata.conductor.repo.url` jest wymagane (flota pracuje na repozytoriach git). Trasa przekłada żądanie na `POST /v1/tasks` huba, używając po stronie serwera `CONDUCTOR_ORCHESTRATOR_TOKEN` (zastępczo `CONDUCTOR_HUB_TOKEN`), i zwraca `201 { conductor_task_id, state: "submitted" }`; stany zadań są przekazywane zwrotnie przez lustro SSE→A2A (RF1) i są widoczne za pośrednictwem `GET /api/a2a/tasks?skill=conductor`.

---

## Dodawanie nowej umiejętności

1. **Utwórz plik umiejętności:** `src/lib/a2a/skills/<your-skill>.ts`

   Wyeksportuj funkcję asynchroniczną `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Zachowaj strukturę istniejących umiejętności, takich jak `smartRouting.ts`.

2. **Zarejestruj procedurę obsługi:** w pliku `src/lib/a2a/taskExecution.ts` dodaj wpis do `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...istniejące umiejętności
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Udostępnij na Karcie agenta:** w pliku `src/app/.well-known/agent.json/route.ts` dołącz wpis do tablicy `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Twoja umiejętność",
     "description": "Krótki opis skoncentrowany na przeznaczeniu",
     "tags": ["routing", "quota"],
     "examples": ["Przykładowe wywołanie w języku naturalnym"]
   }
   ```

4. **Napisz testy:** `tests/unit/a2a-<your-skill>.test.ts`. Uwzględnij poprawny przebieg i ścieżkę błędu.

5. **Udokumentuj** nową umiejętność w tabeli `Dostępne umiejętności` w tym pliku.

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

### Python (requests)

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

### TypeScript (fetch)

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
