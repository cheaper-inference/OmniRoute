# REASONING_REPLAY (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Gerçeğin kaynağı:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Son güncelleme:** 2026-06-28 — v3.8.40

OmniRoute düşünme modu modelleri tarafından üretilen yardımcı `reasoning_content` yakalar ve yukarı akış sağlayıcısı ihtiyaç duyduğunda bunu çok dönüşlü isteklerde şeffaf bir şekilde yeniden oynatır. Bu, bir müşterinin konuşma geçmişinde önceki sıranın gerekçesi eksik olduğunda katı sağlayıcıların ortaya çıkardığı HTTP 400 hatalarını ortadan kaldırır.

## Bu Neden Var?

Birçok düşünme modu sağlayıcısı, eğer** önceki asistan mesajı orijinal `reasoning_content` içeriyor** . Yukarı akış, aşağıdaki gibi mesajlarla 400 değerini döndürür:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Ancak tipik istemciler (Cursor, Cline, Roo Code, OpenAI SDK) `reasoning_content` yeniden oynattıkları geçmişten çıkarırlar. OmniRoute bunu sunucu tarafı önbellekten geri yükler, böylece yukarı akışın gördüğü istek tutarlı olur. Sayı # #1628, önbelleğin işlem yeniden başlatıldığında hayatta kalması için hibrit memory/SQLite kalıcılığını tanıttı.

## Mimarlık

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), keyed by every tool_call.id
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

Yakalama `open-sse/handlers/chatCore.ts` gerçekleşir (iki `cacheReasoningFromAssistantMessage` çağrı sitesinde iki site). Yeniden oynatma, şema zorlamasından sonra ancak gönderilmeden önce `open-sse/translator/index.ts` gerçekleşir.

Düz (araç çağrısı olmayan) asistan dönüşleri farklı şekilde anahtarlanır: `buildAssistantMessageCacheKey()` oturum kapsamını artı o dönüşe kadar normalleştirilmiş OpenAI formatındaki transkripti özetler, çünkü DeepSeek `tools` mevcut olduğunda _her_ önceki turun gerekçesini gerektirir. Responses-API hedefleri için (örneğin, `/responses` yönlendirilen `opencode-go/deepseek-v4-flash`), yukarı akış gövdesi `messages` değil `input` taşır, bu nedenle `translateRequest()` (`open-sse/translator/index.ts`), bir geri çağırma seçeneği aracılığıyla sindirdiği pivot transkripti bildirir ve yakalama siteleri aynı transkripti sindirir. Yanıtlar yeniden oynatma geçişi, her kaynak formatı için OpenAI pivotunda çalışır, dolayısıyla Anthropic Mesaj istemcileri (Claude → OpenAI → Yanıtlar) da yeniden oynatılır.

## Depolama — Hibrit Bellek + SQLite

Hızlı yol, kilitlenme kurtarma ve kontrol paneli görünürlüğü için bir SQLite tablosu tarafından desteklenen bir bellek içi `Map` (oluşturma bazında LRU) kullanır.

| Katman | Uygulama                                    | Amaç                                                     |
| ------ | ------------------------------------------- | -------------------------------------------------------- |
| Hafıza | `open-sse/services/reasoningCache.ts` `Map` | Hızlı aramalar, en eskisi 200 yaşında tahliye edilir     |
| DB     | `reasoning_cache` tablosu (`src/lib/db/`)   | Yeniden başlatmalarda devam eder, istatistikleri artırır |

Yazılar her ikisine de gider. Okumalar önce belleğe başvurur, ardından DB geri döner (DB isabetleri tekrar belleğe yükseltilir). DB hataları ölümcül değildir — bellek içi önbellek sıcak yola hizmet vermeye devam eder.

**Varsayılanlar:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maksimum bellek girişi: `200` (`MAX_MEMORY_ENTRIES`)
- Tahliye: en eski `createdAt` ilk sırada

## Veritabanı Şeması

Taşıma: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Dizinler: `expires_at`, `provider`, `model`, `created_at`. `expires_at` Unix dönemi saniyeleri olarak saklanır; SELECT katmanı eski metin değerlerini `EXPIRES_AT_EPOCH_SQL` aracılığıyla normalleştirir.

## Sağlayıcı / Model Tespiti

`requiresReasoningReplay(provider, model)` `true` değerini döndürdüğünde yeniden oynatma etkinleştirilir. İşlev `open-sse/services/reasoningCache.ts` iki listeyi kontrol eder.

**Sağlayıcı IDs (tam eşleşme, büyük/küçük harfe duyarlı değil):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Normal ifade kalıplarını modelleyin (büyük/küçük harfe duyarlı değil):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` ve `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, isteğe bağlı `-free` son eki)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Yeni bir katı provider/model eklemek, bu listelerden birine ekleme yapmak ve tekrar enjeksiyonunu ileri süren bir birim testi yazmak anlamına gelir. PR açıklaması, değişikliği motive eden 400 yukarı akış dizesini tam olarak belirtmelidir.

## REST API

Önbellek `src/app/api/cache/reasoning/route.ts` altında iki uç noktayı ortaya çıkarır. Her ikisi de yönetim kimlik doğrulaması gerektirir ( `@/shared/utils/apiAuth` `isAuthenticated` ).

| Yöntem | Uç nokta                                                  | Tanım                                                                |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | İstatistik + sayfalandırılmış girişler                               |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrelenmiş listeleme (`limit` `[1, 200]` sabitlendi)               |
| DELETE | `/api/cache/reasoning`                                    | Her şeyi temizleyin (bellek + DB) ve hit/miss sayımlarını sıfırlayın |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Yalnızca bir sağlayıcıya ait girişleri temizle                       |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Tek bir girişi silme                                                 |

**GET yanıt şekli:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Operasyonel Notlar

- **Temizlemek:** `cleanupReasoningCache()` süresi dolmuş bellek girişlerini temizler ve `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` çalıştırır. Sağlık kontrolü çalışanları bunu periyodik olarak ararlar.
- **Kilitlenme kurtarma:** Yeniden başlatmanın ardından bellek boştur ancak DB hala süresi dolmamış girişleri tutmaktadır. Belirli bir `tool_call_id` için ilk arama bir DB isabetidir; sonraki aramalar hafıza isabetleridir.
- **Gerekçe yok, önbellek yok:** `cacheReasoningFromAssistantMessage` asistan mesajında `reasoning_content` / `reasoning` alanı olmadığında `0` döndürür, dolayısıyla düşünmeyen yanıtların hiçbir maliyeti yoktur.
- **Yazma da kapılıdır:** `chatCore.ts` her iki çağrı sitesi (akışsız ve akışlı) yalnızca `requiresReasoningReplay(provider, model)` `true` olduğunda `cacheReasoningFromAssistantMessage()` çağırır — okuma tarafı kontrolleriyle aynı yüklemdir. Hiçbir zaman bir tekrar sağlayıcıya dokunmayan kurulumlar, her muhakeme gerektiren yanıtta yazma, dizin güncellemesi ve try/catch için ödeme yapmayı durdurur.
- **Katı olmayan sağlayıcılar:** `requiresReasoningReplay` `false` ve hedef format OpenAI olduğunda çevirmen** şeritler** giden mesajlardan herhangi bir `reasoning_content` alanı — OpenAI Chat Completions bunu kabul etmez.

## Muse Opaque-Akıl Yürütme Sahipliği

Muse (`muse-code`), arayana bağlı opak akıl yürütmeyi (`encrypted_content`) döndürür. Farklı bir hesap veya hatırlatılan kimlik bilgisi altında yeniden oynatmak yukarı yönde başarısız olur, bu nedenle yerel OAuth istekleri, istek başına rotasyon yerine oturum düzeyinde sahiplik kullanır (`src/sse/services/museSessionOwnership.ts`, `src/sse/handlers/chat.ts` uygulanır). Açıkça seçilen API anahtarı bağlantıları ve yalnızca API anahtarı yapılandırmaları, bu sahiplik modu olmadan mevcut yönlendirmelerini korur.

- Her fırsatta kararlı bir ID oturumu sağlayın: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` veya `x-codex-session-id`; alternatif olarak gövdede `prompt_cache_key`, `session_id`, `conversation_id` veya `metadata.session_id` kullanın (bu öncelik sırasına göre). Eksik veya boş IDs iki veya daha fazla yerel OAuth hesabı etkin olduğunda 400 değerini döndürür; tek bir OAuth hesabıyla döndürülecek hiçbir şey yoktur, dolayısıyla böyle bir istek yönlendirmenin sabitlenmemiş olmasını sağlar. Kapsam arayanın OmniRoute API anahtarını ID içerir.
- Yeni bağımsız oturumlar, ID bağlantısına göre sıralanan, API anahtarı bağlantı ilkesinin izin verdiği aktif yerel OAuth hesapları arasında dönüşümlü olarak gerçekleşir. Round-robin, bağlantı bekleme süresindeki, terminal durumu (`banned`, `expired`, `credits_exhausted`) olan veya istenen model için model kilitli olan hesapları atlar; Muse yukarı akış arızaları, diğer sağlayıcılar gibi bekleme süresini ve kesici durumunu kaydeder. Açıkça zorlanan bir bağlantı, yeni bir oturum için sıralı işlemi atlar ancak mevcut sahibi geçersiz kılamaz.
- Sahibi başarılı bir yanıt verene kadar, sahibi kullanılamayan bir oturum, sağlıklı bir hesaptan yeniden talep edilir. İlk başarılı yanıtın ardından oturum, 30 gün (`MUSE_SESSION_IDLE_TTL_MS`) boyunca boşta kalana kadar söz konusu sahibine sabitlenmiş olarak kalır.
- Her devam ve araç-sonuç dönüşü oturum sahibine bağlı kalır: bağlantı, hesap kimliği ve çıkarım-kimlik bilgisi oluşturma, kimlik bilgisi yenileme yeniden denemeleri de dahil olmak üzere yukarı yöndeki girişimlerden önce tekrar kontrol edilir. Yanıt çağrısı IDs/item referansları ve Sohbet Tamamlama araç çağrısı IDs o oturum ve nesil için kaydedilmiş olmalıdır.
- `muse_session_ownership` ad alanındaki (`src/lib/db/museSessionOwnership.ts`)SQLite `key_value` kayıtları, sahipliği korur ve yeniden başlatmalar sırasında imleç döndürmeyi sürdürür. Her talep ve sunulan yanıt, oturumun etkinlik damgasını yeniler; `MUSE_SESSION_IDLE_TTL_MS` daha uzun süre boşta olan bir oturum, en fazla 10 dakikada bir ve sınırlı gruplar halinde budanır (sahip pini, sunulan bayrak ve kayıtlı opaque/reference karmaları), böylece geçmişinin daha sonraki bir tekrarı, bilinmeyen bir sahip olarak kapatılamaz. Kayıtlar, sırları veya konuşma geçmişini değil, hesap kimliğinin, kimlik bilgilerinin, opak içeriğin ve devam referanslarının bağlantı IDs ve karmalarını içerir. Müşteriler tüm geçmişlerini ve şeffaf olmayan gerekçelerini saklamalı ve göndermelidir.
- Bilinmeyen veya yabancı, şeffaf olmayan akıl yürütme, eksik bir sahip, kullanılamayan bir sahip hesabı veya kayıtlı geçmişe sahip bir nesil değişikliği, açık bir 4xx/503 — ile asla hesaplar arası yük devretmeyi sessiz bırakmaz ve akıl yürütmeyi asla bırakmaz.
- Hatırlatılan aynı hesap anahtarı yalnızca oturumda yeniden oynatılabilir bir geçmiş kaydedilmediğinde kullanılır; Kaydedilen oturumlar yeni başlatılana kadar başarısız olmaya devam ediyor.
- Boş bir yukarı akış yanıtı (`upstream_empty_response` / `empty_response`, arayan kişiye hiçbir şey gönderilmez), 0,5 saniye sonra ve ardından 1,5 saniye (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`) sonra aynı sahip üzerinde en fazla iki kez yeniden denenir. Tüm denemeler boşsa, orijinal 502, soğuma süresi veya kesici işareti olmadan iade edilir, böylece hatalı bir yanıt asla sahibini kilitlemez.
- Tüm `muse-code` istekleri, akış yazmaları da dahil olmak üzere semantik önbellek okuma ve yazma işlemlerini atlar, böylece önbelleğe alınmış opak çıktı farklı bir oturum sahibi edinemez.

Regresyon korumaları: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` ve `tests/unit/chatcore-semantic-cache.test.ts`.

## Ayrıca Bakınız

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — devre kesiciler, bekleme süreleri, model kilitlemeleri
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — yukarı akış 400'leri teşhis ediyor
- Kaynak: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Taşıma: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API rotası: `src/app/api/cache/reasoning/route.ts`
- Orijinal sayı: #1628
