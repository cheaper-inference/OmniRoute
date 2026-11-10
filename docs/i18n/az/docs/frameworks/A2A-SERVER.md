# OmniRoute A2A Server Documentation (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agentlərarası Protokol v0.3 — ağıllı marşrutlaşdırma agenti kimi OmniRoute

A2A interfeysinin iki üzü var:

- **JSON-RPC 2.0** — `POST /a2a` ünvanında (kanonik giriş nöqtəsi, `src/app/a2a/route.ts` faylında müəyyən edilib).
- **REST** — idarəetmə panelləri və alətlər üçün `/api/a2a/*` altında (status, tapşırıq siyahısı, ləğvetmə).

Tapşırıqlar `A2ATaskManager` tərəfindən izlənilir (`src/lib/a2a/taskManager.ts`, standart olaraq 5 dəqiqəlik TTL). Bacarıqlar `src/lib/a2a/taskExecution.ts` faylındakı `A2A_SKILL_HANDLERS` vasitəsilə yönləndirilir.

## Agentin aşkarlanması

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute-un imkanlarını, bacarıqlarını və autentifikasiya tələblərini təsvir edən Agent Kartını qaytarır.

Agent Kartının `version` sahəsi `process.env.npm_package_version` dəyişənindən alınır (`src/app/.well-known/agent.json/route.ts:13` bölməsinə baxın), buna görə də hər buraxılışda `package.json` ilə avtomatik sinxronlaşdırılır.

---

## Autentifikasiya

Bütün `/a2a` sorğuları `Authorization` başlığı vasitəsilə API açarı tələb edir:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Serverdə heç bir API açarı konfiqurasiya edilməyibsə, autentifikasiya ötürülür.

## Aktivləşdirmə

A2A **Endpoints → A2A** keçidi ilə idarə olunur və standart olaraq deaktivdir. Deaktiv olduqda,
`GET /api/a2a/status` sorğusu `status: "disabled"` və `online: false` qaytarır; `POST /a2a`
ünvanına JSON-RPC çağırışları isə `-32000` JSON-RPC xəta kodu ilə HTTP 503 qaytarır.

---

## JSON-RPC 2.0 Metodları

### `message/send` — Sinxron İcra

Bacarıq moduluna mesaj göndərir və tam cavabı gözləyir.

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

`smart-routing` üçün `metadata.combo`, şlüz sorğusunda `metadata.model` dəyərini açıq şəkildə əvəz edir; o, nəzərə alınmayan `x-combo` JSON sahəsi kimi deyil, həqiqi `model` kimi göndərilir. Şlüzün standart API açarı və hər bir hədəf üzrə avtorizasiya qaydaları qüvvədə qalır. Yanlış və ya boş kombinasiya rədd edilir.

Nəticə `requested_combo` (çağıranın niyyəti), `dispatched_model` (faktiki şlüz sorğusu), `response_model` (şlüz cavabı) və `confirmed_combo` sahələrini təqdim edir. Şlüz kombinasiyanı açıq şəkildə müəyyən etmədikdə sonuncu sahə `null` olur. A2A qərar jurnalları icranı yalnız təsdiqlənmiş kombinasiyaya aid edir və təsdiqlənməmiş sorğunu `requestedCombo` kimi saxlayır.

**Cavab:**

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

### `message/stream` — SSE Axın Ötürməsi

`message/send` ilə eynidir, lakin real vaxt rejimində axın ötürməsi üçün Server-Sent Events qaytarır.

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

**SSE Hadisələri:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Tapşırıq Statusunun Sorğulanması

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Tapşırığın Ləğv Edilməsi

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Mövcud Bacarıqlar

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` də simli 6 A2A bacarığını ifşa edir. Hər bir bacarıq modulu `src/lib/a2a/skills/` də yaşayır.

| Bacarıq                | ID                   | Təsvir                                                                                                                                                       | Teqlər                        | Nümunələr                                             |
| :--------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------- | :---------------------------------------------------- |
| Ağıllı marşrutlaşdırma | `smart-routing`      | OmniRoute-nin kombo mühərriki + hesabından istifadə edərək optimal provider/combo vasitəsilə sorğu yönləndirir                                               | marşrutlaşdırma, provayderlər | "Bu əmri ən yaxşı model vasitəsilə yönləndirin"       |
| Kvota İdarəetmə        | `quota-management`   | Provayderə görə kvota vəziyyəti haqqında hesabat verir, zəng edənlərə throttle/switch ya nə vaxt qərar verməsinə kömək edir                                  | kvota, provayderlər           | "Antropik üçün kvotanı yoxlayın"                      |
| Provayder kəşfi        | `provider-discovery` | İmkanları, sərbəst səviyyəli bayraqları, OAuth statusu olan quraşdırılmış provayderləri siyahıya alır                                                        | təminatçılar, kəşf            | "Hansı provayderlər mövcuddur?"                       |
| Xərclərin təhlili      | `cost-analysis`      | Kataloq + son istifadəsini nəzərə alaraq request/conversation nın qiymətini təxmin edir                                                                      | xərc, istifadə                | "Bu söhbətin təxmini dəyəri"                          |
| Sağlamlıq Hesabatı     | `health-report`      | Bir provayder üçün dövrə açarı, soyuducu, kilidləmə vəziyyəti                                                                                                | sağlamlıq, dözümlülük         | "Bütün provayderlərin sağlamlıq vəziyyətini göstərin" |
| Bacarıqların siyahısı  | `list-capabilities`  | Tam 45 girişli Agent Bacarıqları kataloqunu (23 API + 21 CLI + 1 konfiqurasiya) kontekst yeridilməsi üçün xam SKILL.md URLs ilə qiymət cədvəli kimi qaytarır | kataloq, kəşf, bacarıqlar     | "Bütün OmniRoute imkanlarını sadalayın"               |

> Agent Kartı canlı 387 provayder kataloqu ilə uyğunlaşdırılmalıdır; provayder sayları və free/no-auth metaməlumatları icra vaxtı reyestrindən əldə edilir.

### `list-capabilities` Bacarıq Təfərrüatı

`list-capabilities` bacarığı API zəngləri göndərməzdən əvvəl OmniRoute nələri ifşa etdiyini kəşf etməli olan xarici agentlər üçün xüsusilə faydalıdır. Strukturlaşdırılmış işarələmə cədvəli artefaktını qaytarır:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Hər bir sıra `rawUrl` sütununu ehtiva edir ki, agentlər dərhal tam SKILL.md əldə edə bilsinlər. `metadata.totalSkills` sahəsi kataloq ölçüsünü əks etdirir (bu gün 45). İcra: `src/lib/a2a/skills/listCapabilities.ts`. Həmçinin baxın [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (köməkçi)

JSON-RPC son nöqtəsi `/a2a` kanonik A2A giriş nöqtəsidir. Aşağıdakı REST son nöqtələri tablosuna və xarici alətlərə köməkçi girişi təmin edir:

| Son nöqtə                    | Metod | Təsvir                                                             | Auth                                                                                                      |
| :--------------------------- | :---- | :----------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET   | Server statusu, qeydiyyatdan keçmiş bacarıqlar                     | (ictimai)                                                                                                 |
| `/api/a2a/tasks`             | GET   | Filtrlərlə tapşırıqları siyahıya salın                             | idarəetmə və ya API açarı (aşağıya bax)                                                                   |
| `/api/a2a/tasks/[id]`        | GET   | ID ilə tapşırıq alın                                               | idarəetmə və ya API açarı (aşağıya bax)                                                                   |
| `/api/a2a/tasks/[id]/cancel` | POST  | Çalışan tapşırığı ləğv edin                                        | idarəetmə və ya API açarı (aşağıya bax)                                                                   |
| `/.well-known/agent.json`    | GET   | Agent Kartı (A2A kəşfi)                                            | (ictimai, keşlənmiş 3600s)                                                                                |
| `/api/a2a/tasks`             | POST  | OmniConductor donanmasına gələn nümayəndə heyəti (Dirijor PRD RF5) | `GET` ilə eyni, üstəgəl `REQUIRE_API_KEY` söndürüldükdə təyin olunarsa `OMNIROUTE_API_KEY` ; `a2aEnabled` |

`/api/a2a/tasks*` marşrutlarına kimin keçəcəyi giriş və API açarı parametrlərindən asılıdır:

- `requireLogin=true` (defolt): ara proqram yalnız idarəetmə etimadnaməsini qəbul edir (iş paneli sessiyası, `manage` -scope API açarı, `oma_` giriş nişanı) və `OMNIROUTE_API_KEY`. Sadə bir nəticə çıxarma açarı `403` alır. `Authorization` başlığında ara proqram yalnız `OMNIROUTE_API_KEY` `Bearer <key>` kimi qəbul edir; `Bearer` `401` aldıqdan sonra çılpaq açar və ya tab.
- `requireLogin=false`, və ya işə başlamazdan əvvəl geri dönmə pəncərəsi: `REQUIRE_API_KEY=true` ilə hər hansı etibarlı OmniRoute API açarı və ya idarəetmə etimadnaməsi qəbul edilir və anonim zəng edənlər `401` əldə edir; `REQUIRE_API_KEY` off ilə marşrutlar açıqdır.
- `POST /api/a2a/tasks` əlavə olaraq həmin dəyişən təyin edildikdə və `REQUIRE_API_KEY` söndürüldükdə `Authorization` başlığında `OMNIROUTE_API_KEY` tələb edir. `x-api-key` kimi digər başlıqlar orada sayılmır. Giriş söndürüldükdə və ya işə başlamazdan əvvəl açar `Bearer` prefiksi ilə və ya olmadan keçir; giriş ilə yalnız `Bearer <key>` ara proqramdan keçir.

Etibarnamə tələb olunduqda, `read` -scope `oma_` nişanı yalnız `GET` üçün işləyir.

**Gələn Dirijor nümayəndə heyəti (`POST /api/a2a/tasks`):** xarici A2A agentləri kodlaşdırma işini OmniRoute vasitəsilə OmniConductor donanmasına həvalə edir. Bədən: yalnız `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — Dirijor donanmasının bacarıqları (Agent Kartında elan edilənlər) səlahiyyət verilir; `metadata.conductor.repo.url` tələb olunur (donanma git reposlarında işləyir). Marşrut server tərəfindəki `CONDUCTOR_ORCHESTRATOR_TOKEN` (geri dönüş `CONDUCTOR_HUB_TOKEN`) istifadə edərək mərkəzin `POST /v1/tasks` -a çevrilir və `201 { conductor_task_id, state: "submitted" }` qaytarır; tapşırıq dövlətləri SSE→A2A güzgü (RF1) vasitəsilə geri axır və `GET /api/a2a/tasks?skill=conductor` vasitəsilə görünür .

---

## Yeni Bacarıq əlavə etmək

1. **Bacarıq faylı yaradın:** `src/lib/a2a/skills/<your-skill>.ts`

   `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>` async funksiyasını ixrac edin. `smartRouting.ts` kimi mövcud bacarıqların formasına əməl edin. Əgər bacarıq HTTP üzərindən OmniRoute ə geri çağırırsa, başlıqları `src/lib/a2a/selfLoopAuth.ts` -dən `buildSelfLoopHeaders(caller)` ilə qurun ki, zəng `OMNIROUTE_API_KEY` deyil, A2A zəng edənin açarı ilə işləsin və `redirect: "error"` `fetch` -ə ötürün ki, yönləndirmə heç vaxt açarı əldə etməsin. Köməkçi yalnız başlıqlar qurur; hər bir bacarıq yönləndirmə siyasətini özü təyin edir. Həll edilmiş URL bazası şəxsi şəbəkədən kənarda sadə http olduqda (döngü, konteyner və ya xidmət adı və şəxsi ünvanlar yaxşıdır) və ya etimadnaməyə malik olduqda açar əlavə etmək əvəzinə `UnsafeSelfLoopTargetError` atır, ona görə də rədd edilmiş zəngləri udan bacarıq həmin səhvi yenidən atmalıdır.

2. **Qeydiyyat işləyicisi:** `src/lib/a2a/taskExecution.ts` da `A2A_SKILL_HANDLERS`-ə giriş əlavə edin:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Agent Kartında ifşa:** `src/lib/a2a/agentCardMetadata.ts` da ( `/.well-known/agent.json` və `/.well-known/agent-card.json` tərəfindən paylaşılır), `skills` massivinə əlavə edin:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Testləri yazın:** `tests/unit/a2a-<your-skill>.test.ts`. Xoşbəxt yolu + xəta yolunu əhatə edin.

5. **Sənəd** bu faylın `Available Skills` cədvəlindəki yeni bacarıq.

---

## Tapşırığın TTL-i

Tapşırıqlar `ttlMinutes` müddətindən sonra başa çatır (standart olaraq 5 dəq.) — bu parametr `src/lib/a2a/taskManager.ts:82` ünvanında `A2ATaskManager` konstruktorunda konfiqurasiya edilir. Fərdiləşdirmək üçün `A2ATaskManager` instansiyasını fork edin və fərqli dəyər ötürün (məsələn, 15 dəqiqəlik TTL üçün `new A2ATaskManager(15)`). Arxa fon intervalı vaxtı keçmiş tapşırıqları hər 60 saniyədən bir təmizləyir.

---

## Tapşırığın həyat dövrü

```
təqdim edilib → icra olunur → tamamlanıb
                           → uğursuz olub
                           → ləğv edilib
```

- Tapşırıqlar standart olaraq 5 dəqiqədən sonra başa çatır (baxın: [Tapşırığın TTL-i](#task-ttl))
- Son vəziyyətlər: `completed`, `failed`, `cancelled`
- Hadisələr jurnalı hər vəziyyət keçidini izləyir

---

## Xəta kodları

| Kod    | Mənası                         |
| :----- | :----------------------------- |
| -32700 | Təhlil xətası (etibarsız JSON) |
| -32600 | Etibarsız sorğu / İcazəsiz     |
| -32601 | Metod və ya bacarıq tapılmadı  |
| -32602 | Etibarsız parametrlər          |
| -32603 | Daxili xəta                    |
| -32000 | A2A son nöqtəsi deaktiv edilib |

---

## İnteqrasiya nümunələri

### Python (istəklər)

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

### TypeScript (gətirmək)

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
