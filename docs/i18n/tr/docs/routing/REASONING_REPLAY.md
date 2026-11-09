# Reasoning Replay Cache (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Doğruluk kaynağı:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Son güncelleme:** 2026-06-28 — v3.8.40

OmniRoute, düşünme modu modelleri tarafından üretilen asistan `reasoning_content` içeriğini yakalar ve yukarı akış sağlayıcısının bunu gerektirdiği çok turlu isteklerde şeffaf biçimde yeniden oynatır. Bu, istemcinin konuşma geçmişinde önceki turun akıl yürütme içeriği bulunmadığında katı sağlayıcıların döndürdüğü HTTP 400 hatalarını ortadan kaldırır.

## Neden Buna İhtiyaç Var?

Bazı düşünme modu sağlayıcıları, **önceki asistan mesajı özgün `reasoning_content` içeriğini barındırmadığı** sürece takip turunu reddeder. Yukarı akış, şuna benzer mesajlarla 400 döndürür:

```
Parametre Hatalı: Düşünme modundaki reasoning_content API'ye geri gönderilmelidir.
```

Ancak tipik istemciler (Cursor, Cline, Roo Code, OpenAI SDK), yeniden oynattıkları geçmişten `reasoning_content` alanını çıkarır. OmniRoute, yukarı akışın gördüğü isteğin tutarlı olması için bu içeriği sunucu tarafındaki bir önbellekten geri yükler. #1628 numaralı sorun, önbelleğin süreç yeniden başlatmalarından sonra da korunması için hibrit bellek/SQLite kalıcılığını kullanıma sundu.

## Mimari

```
Tur N (asistan oluşturur):
  → yanıt reasoning_content + tool_calls içerir
  → requiresReasoningReplay(provider, model) ise: cacheReasoningFromAssistantMessage()
      her tool_call.id ile anahtarlanmış olarak yazar (bellek + DB)
  → yanıtı istemciye iletir (istemci akıl yürütmeyi saklayabilir veya saklamayabilir)

Tur N+1 (istemci takip isteği gönderir):
  → çevirici şunu algılar: requiresReasoningReplay(provider, model) === true
  → tool_calls içeren ve reasoning_content içermeyen her asistan mesajı için:
      lookupReasoning(toolCalls[0].id) → bellek → DB
      isabet  → msg.reasoning_content = cached; recordReplay()
      ıskalama → msg.reasoning_content = "" (eski DeepSeek sürümleri için geriye dönük uyumluluk)
  → üst sağlayıcı tutarlı geçmişi görür → 400 hatası oluşmaz
```

Yakalama işlemi `open-sse/handlers/chatCore.ts` içinde (iki konumda, iki `cacheReasoningFromAssistantMessage` çağrı konumunda) gerçekleşir. Yeniden oynatma, `open-sse/translator/index.ts` içinde şema zorlamasından sonra ancak gönderimden önce gerçekleşir.

Düz (araç çağrısı içermeyen) asistan turları farklı şekilde anahtarlanır: DeepSeek, `tools` mevcut olduğunda önceki _her_ turun akıl yürütmesini gerektirdiği için `buildAssistantMessageCacheKey()`, oturum kapsamını ve o tura kadar normalleştirilmiş OpenAI biçimindeki dökümü özetler. Responses-API hedeflerinde (örneğin `/responses` hedefine yönlendirilen `opencode-go/deepseek-v4-flash`) üst sağlayıcı gövdesi `messages` değil `input` taşır; bu nedenle `translateRequest()` (`open-sse/translator/index.ts`), özetlediği pivot dökümü bir geri çağırma seçeneği aracılığıyla bildirir ve yakalama konumları da aynı dökümü özetler. Responses yeniden oynatma geçişi, her kaynak biçimi için OpenAI pivotu üzerinde çalışır; dolayısıyla Anthropic Messages istemcileri (Claude → OpenAI → Responses) için de yeniden oynatma gerçekleştirilir.

## Depolama — Hibrit Bellek + SQLite

Kritik yol, çökme sonrası kurtarma ve gösterge panelinde görünürlük için bir SQLite tablosuyla desteklenen bellek içi bir `Map` (oluşturma zamanına göre LRU) kullanır.

| Katman | Uygulama                                             | Amaç                                                 |
| ------ | ---------------------------------------------------- | ---------------------------------------------------- |
| Bellek | `open-sse/services/reasoningCache.ts` içindeki `Map` | Hızlı aramalar; 200'de en eski girdiyi çıkarır       |
| DB     | `reasoning_cache` tablosu (`src/lib/db/`)            | Yeniden başlatmalarda korunur, istatistikleri besler |

Yazma işlemleri her ikisine de yapılır. Okuma işlemleri önce belleğe başvurur, ardından DB'ye geri döner (DB isabetleri yeniden belleğe yükseltilir). DB hataları kritik değildir — bellek içi önbellek kritik yola hizmet vermeye devam eder.

**Varsayılanlar:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Azami bellek girdisi: `200` (`MAX_MEMORY_ENTRIES`)
- Çıkarma: önce en eski `createdAt`

## Veritabanı Şeması

Migrasyon: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

İndeksler: `expires_at`, `provider`, `model`, `created_at`. `expires_at`, Unix epoch saniyesi olarak saklanır; SELECT katmanı, eski metin değerlerini `EXPIRES_AT_EPOCH_SQL` aracılığıyla normalleştirir.

## Sağlayıcı / Model Algılama

`requiresReasoningReplay(provider, model)` işlevi `true` döndürdüğünde yeniden oynatma etkinleştirilir. İşlev, `open-sse/services/reasoningCache.ts` içindeki iki listeyi kontrol eder.

**Sağlayıcı kimlikleri (tam eşleşme, büyük/küçük harfe duyarsız):**

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

**Model regex kalıpları (büyük/küçük harfe duyarsız):**

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

Yeni bir katı sağlayıcı/model eklemek, bu listelerden birine ekleme yapmayı ve yeniden oynatma enjeksiyonunu doğrulayan bir birim testi yazmayı gerektirir. PR açıklamasında, değişikliğe neden olan yukarı akıştaki 400 hata dizesi tam olarak belirtilmelidir.

## REST API

Önbellek, `src/app/api/cache/reasoning/route.ts` altında iki uç nokta sunar. Her ikisi de yönetim kimlik doğrulaması gerektirir (`@/shared/utils/apiAuth` içindeki `isAuthenticated`).

| Yöntem | Uç nokta                                                  | Açıklama                                                                |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | İstatistikler + sayfalandırılmış girdiler                               |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrelenmiş listeleme (`limit`, `[1, 200]` aralığıyla sınırlandırılır) |
| DELETE | `/api/cache/reasoning`                                    | Her şeyi temizler (bellek + DB) ve isabet/ıskalama sayılarını sıfırlar  |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Yalnızca bir sağlayıcıya ait girdileri temizler                         |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Tek bir girdiyi siler                                                   |

**GET yanıt biçimi:**

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

- **Temizleme:** `cleanupReasoningCache()`, süresi dolmuş bellek girdilerini temizler ve `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` sorgusunu çalıştırır. Sistem durumu denetimi worker'ları bunu düzenli aralıklarla çağırır.
- **Çökme sonrası kurtarma:** Yeniden başlatmadan sonra bellek boştur ancak DB, süresi dolmamış girdileri tutmaya devam eder. Belirli bir `tool_call_id` için ilk arama bir DB isabetidir; sonraki aramalar bellek isabetidir.
- **Akıl yürütme yoksa önbellek de yok:** Asistan mesajında `reasoning_content` / `reasoning` alanı bulunmadığında `cacheReasoningFromAssistantMessage`, `0` döndürür; dolayısıyla düşünme içermeyen yanıtların maliyeti yoktur.
- **Yazma işlemi de koşula bağlıdır:** `chatCore.ts` içindeki her iki çağrı noktası da (akışsız ve akışlı), yalnızca `requiresReasoningReplay(provider, model)` değeri `true` olduğunda `cacheReasoningFromAssistantMessage()` işlevini çağırır — bu, okuma tarafının kontrol ettiği koşulla aynıdır. Hiçbir zaman yeniden oynatma sağlayıcısı kullanmayan kurulumlar, akıl yürütme içeren her yanıtta yazma, dizin güncelleme ve try/catch maliyetine katlanmaz.
- **Katı olmayan sağlayıcılar:** `requiresReasoningReplay` değeri `false` olduğunda ve hedef biçim OpenAI olduğunda çevirici, giden mesajlardaki tüm `reasoning_content` alanlarını **kaldırır** — OpenAI Chat Completions bunu kabul etmez.

## Muse opak akıl yürütme sahipliği

Muse (`muse-code`), çağırana bağlı opak akıl yürütme (`encrypted_content`) döndürür. Bunu farklı bir hesap veya yeniden üretilmiş kimlik bilgisiyle oynatmak üst hizmette başarısız olur; bu nedenle yerel OAuth istekleri, istek başına döndürme yerine oturum düzeyinde sahiplik kullanır (`src/sse/services/museSessionOwnership.ts`, `src/sse/handlers/chat.ts` içinde uygulanır). Açıkça seçilmiş API anahtarı bağlantıları ve yalnızca API anahtarlı yapılandırmalar, bu sahiplik modu olmadan mevcut yönlendirmelerini korur.

- Her turda kararlı bir oturum kimliği sağlayın: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` veya `x-codex-session-id`; alternatif olarak gövdede `prompt_cache_key`, `session_id`, `conversation_id` veya `metadata.session_id` kullanın (bu öncelik sırasıyla). İki veya daha fazla yerel OAuth hesabı etkinse eksik ya da boş kimlikler 400 döndürür; tek OAuth hesabında geçilecek başka hesap yoktur, dolayısıyla böyle bir istek sabitlenmemiş yönlendirmeyi korur. Kapsam, çağıranın OmniRoute API anahtarı kimliğini içerir.
- Yeni bağımsız oturumlar, API anahtarının bağlantı politikasının izin verdiği etkin yerel OAuth hesapları arasında bağlantı kimliğine göre sıralı olarak dönüşümlü dağıtılır. Döngüsel dağıtım; bağlantı bekleme süresindeki, son durumu (`banned`, `expired`, `credits_exhausted`) olan veya istenen model için kilitlenmiş hesapları atlar; Muse üst hizmet hataları diğer sağlayıcılar gibi bekleme süresi ve devre kesici durumu kaydeder. Açıkça zorlanan bir bağlantı, yeni oturumda döngüsel dağıtımı atlar ancak başarılı bir yanıt vermiş sahibin yerine geçemez.
- Sahip başarılı bir yanıt verene kadar, sahibi kullanılamaz hâle gelen oturum sağlıklı bir hesaba yeniden atanır. İlk başarılı yanıttan sonra oturum, 30 gün boşta kalana kadar o sahibe sabitlenir (`MUSE_SESSION_IDLE_TTL_MS`).
- Her devam ve araç sonucu turu oturum sahibine sabit kalır: bağlantı, hesap kimliği ve çıkarım kimlik bilgisinin nesli; bunlar kimlik bilgisi yenileme tekrarları dahil üst hizmet denemelerinden önce yeniden denetlenir. Responses çağrı kimlikleri/öğe başvuruları ve Chat Completions araç çağrısı kimlikleri, o oturum ve nesil için kaydedilmiş olmalıdır.
- `muse_session_ownership` ad alanındaki SQLite `key_value` kayıtları (`src/lib/db/museSessionOwnership.ts`), sahipliği ve dönüşüm imlecini yeniden başlatmalar boyunca korur. Her sahiplenme ve sunulan yanıt oturum etkinlik damgasını yeniler; `MUSE_SESSION_IDLE_TTL_MS` süresinden uzun boşta kalmış oturum temizlenir (sahip sabitlemesi, yanıt sunma bayrağı ve kaydedilmiş opak/başvuru karmaları), en fazla her 10 dakikada bir ve sınırlı gruplar hâlinde; böylece geçmişinin sonraki yeniden oynatımı bilinmeyen sahip olarak güvenli biçimde reddedilir. Kayıtlar bağlantı kimliklerini ve hesap kimliği, kimlik bilgileri, opak içerik ve devam başvurularının karmalarını içerir; sırları veya konuşma geçmişini içermez. İstemciler tam geçmişlerini ve opak akıl yürütmelerini tutmalı ve göndermelidir.
- Bilinmeyen veya başka hesaba ait opak akıl yürütme, eksik sahip, kullanılamayan sahip hesabı ya da kaydedilmiş geçmiş varken nesil değişimi açık bir 4xx/503 ile güvenli biçimde reddedilir — sessizce başka hesaba geçiş yapılmaz ve akıl yürütme asla atılmaz.
- Aynı hesap için yeniden üretilmiş anahtar yalnızca oturum yeniden oynatılabilir geçmiş kaydetmemişse benimsenir; kayıtlı geçmişi olan oturumlar yeniden başlatılana kadar güvenli ret durumunda kalır.
- Boş bir üst hizmet yanıtı (`upstream_empty_response` / `empty_response`, çağırana hiçbir şey gönderilmemiş) aynı sahiple en fazla iki kez, önce 0.5 s sonra 1.5 s bekleyerek yeniden denenir (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Tüm denemeler boşsa bekleme süresi veya devre kesici işaretlemesi olmadan özgün 502 döndürülür; böylece kararsız bir yanıt sahibi asla kilitlemez.
- Tüm `muse-code` istekleri, akış yazımları dahil semantik önbellek okuma ve yazmalarını atlar; böylece önbellekteki opak çıktı farklı bir oturum sahibi edinemez.

Regresyon korumaları: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` ve `tests/unit/chatcore-semantic-cache.test.ts`.

## Ayrıca Bakınız

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — devre kesiciler, bekleme süreleri, model kilitlemeleri
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — yukarı akış 400 hatalarını tanılama
- Kaynak: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Geçiş: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API rotası: `src/app/api/cache/reasoning/route.ts`
- Orijinal sorun: #1628
