# Repository Map (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Her dizin ve kök dosya için tek satırlık açıklama.**
> Son güncelleme: 2026-06-28 — OmniRoute v3.8.40
>
> Kod tabanında hızla gezinmek için bu haritayı kullanın. Ayrıntılı incelemeler için ilgili belgelere yönlendiren bağlantıları izleyin.

## Üst düzey ağaç

```
OmniRoute/
├── src/                  # Next.js 16 uygulaması (kullanıcı arayüzü + API rotaları + kütüphaneler + alan mantığı + sunucu)
├── open-sse/             # Akış motoru çalışma alanı (işleyiciler, yürütücüler, çevirici, MCP sunucusu)
├── packages/            # npm çalışma alanları: ui-kit (pakete dahil edilmiş Keak CI UI Kit) ve browser-pool
├── electron/             # Masaüstü sarmalayıcısı (Electron 41 + electron-builder 26.10)
├── bin/                  # CLI giriş noktası ve komut işleyicileri
├── scripts/              # Derleme, denetim, eşitleme ve tek seferlik betikler
├── docs/                 # Herkese açık belgeler (şu anda buradasınız)
├── tests/                # Tüm test paketleri (birim, entegrasyon, e2e, protokol istemcileri)
├── public/               # Next.js statik varlıkları, PWA manifesti, service worker, simgeler
├── config/               # Statik yapılandırma + kalite eşiği durumu (i18n, payloadRules, quality/)
├── images/               # Pazarlama / README görsel varlıkları
├── @omniroute/           # Yayımlanabilir tamamlayıcı paketler (opencode-plugin, opencode-provider)
├── skills/               # CLI/ajan beceri paketleri (cli-* + omni-* + config-codex-cli)
├── examples/             # Örnek eklentiler + omniroute-cmd-hello başlangıç projesi
├── contrib/              # Topluluk katkıları (podman/)
├── .source/              # Fumadocs kaynak yapılandırması (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions iş akışları + sorun şablonları + PR şablonu
├── .husky/               # Git kancaları (pre-commit, pre-push)
├── .claude/              # Claude Code eğik çizgi komutları (proje kapsamlı)
├── .agents/              # Codex / genel ajan iş akışları + beceriler (.claude/ yansısı)
├── .vscode/              # VS Code çalışma alanı ayarları
├── _ideia/               # Planlama notları (gayriresmî; dağıtıma dahil edilmez)
├── _mono_repo/           # Geçmiş alt projeler (cloud, site, vscode-extension)
├── _references/          # İlgili OSS projelerinden salt okunur referans klonları
├── _tasks/               # Sürüm bazında görev takip dosyaları (gayriresmî)
├── .build/ .worktrees/ dist/   # Yerel derleme / git-worktree / derleme çıktısı geçici alanı (gitignored)
├── .issues/              # Yerel sorun önbelleği (gitignored)
├── .playwright-mcp/      # Playwright MCP test çıktıları
├── coverage/             # c8 kapsam çıktısı (gitignored)
├── logs/                 # Çalışma zamanı günlükleri (gitignored)
├── node_modules/         # Bağımlılıklar (gitignored)
├── package/              # npm pack hazırlama alanı (derleme çıktısı)
├── .next/                # Next.js derleme çıktısı (gitignored)
└── (kök dosyalar — aşağıya bakın)
```

---

## Kök dosyalar

| Dosya                                       | Amaç                                                                                                 |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **README.md**                               | Pazarlama açılış sayfası + hızlı başlangıç + özellik matrisi (ayrıca bkz. `llm.txt`)                 |
| **CHANGELOG.md**                            | Sürüm başına değişiklik günlüğü (`/version-bump-cc` becerisi tarafından otomatik oluşturulur)        |
| **LICENSE**                                 | MIT lisans metni                                                                                     |
| **CLAUDE.md**                               | Claude Code aracıları için proje kuralları (katı kurallar, kurallar bütünü, senaryolar)              |
| **AGENTS.md**                               | CLAUDE.md ile aynı, ancak Claude dışındaki yapay zekâ aracıları için (Codex, Cursor vb.)             |
| **GEMINI.md**                               | Gemini tabanlı aracılar için özlü kurallar (CLAUDE.md'nin alt kümesi)                                |
| **CONTRIBUTING.md**                         | Katkıda bulunanlar için kılavuz: kurulum, conventional commit'ler, test, PR akışı                    |
| **SECURITY.md**                             | Güvenlik açığı bildirim politikası, desteklenen sürümler, tehdit modeli                              |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — topluluk davranışına ilişkin beklentiler                                      |
| **llm.txt**                                 | LLM tarayıcıları için optimize edilmiş düz metin açılış sayfası (yapay zekâ asistanları için SEO)    |
| **package.json**                            | npm manifestosu, betikler, bağımlılıklar, çalışma ortamları, c8 kapsam eşiği                         |
| **package-lock.json**                       | Kilitlenmiş bağımlılık ağacı                                                                         |
| **tsconfig.json**                           | Kök TypeScript yapılandırması                                                                        |
| **tsconfig.typecheck-core.json**            | `src/` çekirdeği için tür denetimi yapılandırması                                                    |
| **tsconfig.typecheck-noimplicit-core.json** | Katı (`noImplicitAny`) tür denetimi                                                                  |
| **tsconfig.tsbuildinfo**                    | TS artımlı derleme önbelleği (git tarafından yok sayılır)                                            |
| **next.config.mjs**                         | Next.js 16 derleme yapılandırması (bağımsız çıktı)                                                   |
| **next-env.d.ts**                           | Next.js tarafından otomatik oluşturulan ortam türleri                                                |
| **eslint.config.mjs**                       | ESLint düz yapılandırması (proje alanına göre kurallar)                                              |
| **prettier.config.mjs**                     | Prettier biçimlendirme kuralları                                                                     |
| **postcss.config.mjs**                      | Tailwind/CSS işlem hattı için PostCSS yapılandırması                                                 |
| **playwright.config.ts**                    | Playwright E2E test yapılandırması                                                                   |
| **vitest.config.ts**                        | Vitest yapılandırması (varsayılan paket)                                                             |
| **vitest.mcp.config.ts**                    | MCP sunucusu / autoCombo / önbellek paketleri için Vitest yapılandırması                             |
| **sonar-project.properties**                | SonarQube/SonarCloud yapılandırması (kod kalitesi)                                                   |
| **Dockerfile**                              | Çok aşamalı Docker derlemesi (builder → runner-base → runner-cli)                                    |
| **docker-compose.yml**                      | 4 profilli geliştirme compose yapılandırması (base, cli, host, cliproxyapi) + redis yan hizmeti      |
| **docker-compose.prod.yml**                 | Üretim compose yapılandırması (20130 numaralı port, redis, adlandırılmış birimler)                   |
| **.dockerignore**                           | Docker bağlamından hariç tutulan dosyalar                                                            |
| **fly.toml**                                | Fly.io dağıtım yapılandırması (`sin` bölgesi, 20128 numaralı port, /data birimi)                     |
| **.env.example**                            | Ortam dosyası şablonu (ilk kurulumda otomatik olarak `.env` dosyasına kopyalanır)                    |
| **.gitignore**                              | Git yok sayma kalıpları                                                                              |
| **.npmignore**                              | npm yayımlama hariç tutma listesi                                                                    |
| **.npmrc**                                  | npm yapılandırması (kayıt deposu, kilit dosyası politikası)                                          |
| **.node-version**                           | Node sürüm sabitlemesi (nvm uyumlu araçlar tarafından kullanılır)                                    |
| **.nvmrc**                                  | nvm için Node sürüm sabitlemesi                                                                      |
| **eslint.complexity.config.mjs**            | Karmaşıklık mandalı için ESLint yapılandırması (`scripts/check/check-complexity.mjs --config`)       |
| **eslint.sonarjs.config.mjs**               | SonarJS kuralları için ESLint yapılandırması (bilişsel karmaşıklık / yineleme)                       |
| **source.config.ts**                        | Fumadocs `defineDocs` kaynak yapılandırması (`.source/` girdisini sağlar)                            |
| **knip.json**                               | Knip yapılandırması — kullanılmayan dosyalar/dışa aktarımlar/bağımlılıklar (ölü kod geçidini besler) |
| **stryker.conf.json**                       | Stryker mutasyon testi yapılandırması                                                                |
| **.size-limit.json**                        | size-limit paket bütçesi yapılandırması                                                              |
| **promptfooconfig.yaml**                    | promptfoo değerlendirme yapılandırması                                                               |
| **.gitleaks.toml**                          | gitleaks gizli bilgi tarama kural kümesi                                                             |
| **.zizmor.yml**                             | zizmor GitHub Actions güvenlik lint yapılandırması                                                   |
| **socket.yml**                              | Socket.dev tedarik zinciri yapılandırması                                                            |
| **news.json**                               | Yerelleştirilmiş v2 duyuru akışı; Radar lansman öğesi devre dışı olarak sunulur                      |
| **flake.nix** / **flake.lock**              | Nix geliştirme kabuğu tanımı + kilit dosyası                                                         |
| **.env**                                    | Yerel gizli bilgiler (git tarafından yok sayılır — `.env.example` dosyasından oluşturulur)           |

> **v3.8.26 sürümünde kök dizinden taşındı (sadeleştirme):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` ve oluşturulan `quality-metrics.json` (git tarafından yok sayılır). Bkz. [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js uygulaması

```
src/
├── app/                 # App Router (pages + API routes + status pages + landing)
├── lib/                 # Core libraries / domain modules (80 subdirs + ~70 top-level files)
├── domain/              # Pure domain logic (policy engine, fallback, cost, lockout, comboResolver, assessment)
├── server/              # Server-only modules (authz pipeline, cors, auth middleware) — cannot import from client
├── shared/              # Shared between server and client where safe (constants, types, validation, contracts, utils)
├── i18n/                # next-intl config + per-locale message JSON (67 locales)
├── middleware/          # Next.js middleware (request enrichment, locale detection)
├── mitm/                # MITM proxy core: cert gen/install, handlers, targets, inspector, masks, passthrough
│   ├── handlers/        # 9 IDE-agent handler classes extending MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Traffic capture layer: buffer (in-memory ring), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Model adapter glue (legacy shim)
├── scripts/             # In-tree maintenance scripts (e.g., backfillAggregation)
├── sse/                 # Legacy SSE handlers/services (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Legacy in-memory store (being phased out for src/lib/db)
├── types/               # Shared TS type files
├── instrumentation.ts   # Next.js telemetry hook (browser + edge)
├── instrumentation-node.ts  # Node-only instrumentation
└── proxy.ts             # HTTP-proxy entry shim
```

### `src/app/` — Uygulama Yönlendiricisi (Next.js 16)

| Yol                                                                          | Amaç                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Herkese açık OpenAI uyumlu API (~ 25 alt rota: sohbet, tamamlamalar, yerleştirmeler, dosyalar, gruplar, ses, resimler, videolar, müzik, yeniden sıralama, denetlemeler, arama, ws, aracılar, hesaplar, sağlayıcılar vb.)                                                                                               |
| `app/api/v1beta/`                                                            | Gemini tarzı API uç noktaları                                                                                                                                                                                                                                                                                          |
| `app/api/playground/`                                                        | Playground Studio rotaları: `improve-prompt/` (POST — LLM istemi yeniden yazan), `presets/` (GET listesi / POST oluştur), `presets/[id]/` (GET / PUT / DELETE) - bkz `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                            |
| `app/api/` (v1 olmayan)                                                      | Management/admin rotaları (~ 60 dizinleri: sağlayıcılar, kombinasyonlar, ayarlar, mcp, a2a, değerlendirmeler, bellek, beceriler, web kancaları, uyumluluk, esneklik, izleme, tüneller, iklimlendirme araçları vb.)                                                                                                     |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 yol (sunucu kontrolü, aracı state/DNS/mappings, bypass, sertifika, yukarı akış CA). LOCAL_ONLY + SPAWN_CAPABLE. Bkz `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                     |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16 + rotası (istekler, oturumlar, ana bilgisayarlar, yakalama modları, dışa aktarma, ws). LOCAL_ONLY + SPAWN_CAPABLE. `docs/frameworks/TRAFFIC_INSPECTOR.md §8` bakın.                                                                                                               |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 giriş noktası (`POST /a2a`)                                                                                                                                                                                                                                                                           |
| `app/.well-known/agent.json/`                                                | A2A Temsilci Kartı (keşif)                                                                                                                                                                                                                                                                                             |
| `app/(dashboard)/dashboard/`                                                 | Kontrol paneli UI sayfaları (50 + bölümü, ~ 118 page.tsx dosyaları: sağlayıcılar, kombinasyonlar, ayarlar, bellek, beceriler, web kancaları, değerlendirmeler, denetim, toplu iş, önbellek, maliyetler, sağlık, sistem, etkinlik vb.)                                                                                  |
| `app/(dashboard)/dashboard/search-tools/`                                    | Arama Araçları Studio UI (3 sekme: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — bkz `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                         |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (3 sekmeli kabuk), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge kontrol paneli sayfası — sunucu kartı, 9 aracı kartı, kurulum sihirbazı, model eşleme, atlama listesi. i18n PT-BR + EN. Bkz `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                              |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector kontrol paneli sayfası — DevTools bölmesi, 7 ayrıntı sekmesi, 4 yakalama modu geçişi, oturum kaydedici, bağlam renklendirme. i18n PT-BR + EN. Bkz `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                            |
| `app/(dashboard)/dashboard/activity/`                                        | Etkinlik besleme sayfası (Grup B): `page.tsx` (sunucu) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — bkz `docs/architecture/MONITORING_SECTIONS.md`                                                                                                            |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Kota Paylaşımı sayfası (Grup B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                           |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Sağlayıcı planı yapılandırma sayfası (Grup B): `page.tsx` + `ProviderPlanConfigClient.tsx` — bağlantı geçersiz kılma başına kota boyutları                                                                                                                                                                             |
| `app/docs/`                                                                  | Gömülü belge görüntüleyici ( `docs/*.md` oluşturur)                                                                                                                                                                                                                                                                    |
| `app/landing/`                                                               | Pazarlama açılış sayfası                                                                                                                                                                                                                                                                                               |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Kimlik doğrulamayla ilgili sayfalar                                                                                                                                                                                                                                                                                    |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP hata sayfaları                                                                                                                                                                                                                                                                                                    |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Static/status sayfaları                                                                                                                                                                                                                                                                                                |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Kök düzeni, ana sayfa, PWA bildirimi, global CSS                                                                                                                                                                                                                                                                       |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Hata sınırları                                                                                                                                                                                                                                                                                                         |

### `src/lib/` — Çekirdek kitaplıkları (~ 50 modül)

| Modül                                    | Amaç                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A protokolü görev yöneticisi, beceriler (5), akış                                                                                                                                                                                                                                                                   |
| `acp/`                                   | CLI Temsilci Kaydı (yerel CLI keşfi - bkz. `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                |
| `api/`                                   | Paylaşılan API yardımcıları (`requireManagementAuth`, doğrulama)                                                                                                                                                                                                                                                      |
| `auth/`                                  | Oturum, parola karma, belirteç doğrulama                                                                                                                                                                                                                                                                              |
| `batches/`                               | OpenAI Toplu API işleyicileri                                                                                                                                                                                                                                                                                         |
| `catalog/`                               | Sağlayıcı kataloğu Zod doğrulaması + yeteneği çözünürlüğü                                                                                                                                                                                                                                                             |
| `cloudAgent/`                            | Bulut Aracıları (Codex Cloud, Devin, Jules) — bkz `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                    |
| `combos/`                                | Birleşik çözüm + yeniden sıralama yardımcıları                                                                                                                                                                                                                                                                        |
| `audit/`                                 | Etkinlik akışı yardımcıları: `highLevelActions.ts` (izin verilenler listesi + `isHighLevelAction()`), `activityIcons.ts` (eylem → icon/verb haritası), `timeline.ts` (groupByDay/relativeTime) - bkz `docs/architecture/MONITORING_SECTIONS.md`                                                                       |
| `compliance/`                            | Denetim günlüğü + sağlayıcı denetimi - bkz `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                              |
| `compression/`                           | Sıkıştırma motoru tutkalı (motorlar `open-sse/services/compression/` yaşıyor)                                                                                                                                                                                                                                         |
| `config/`                                | Çalışma zamanı yapılandırma yardımcıları                                                                                                                                                                                                                                                                              |
| `db/`                                    | 120 + alanı DB modülleri + 168 geçiş ( SQLite için her zaman buradan geçin)                                                                                                                                                                                                                                           |
| `quota/`                                 | Kota Paylaşım Motoru: `dimensions.ts` (types/Zod), `types.ts` (QuotaStore arayüzü), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` - bkz `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Radar serbest model katalog istemcisi: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) - bkz `docs/frameworks/RADAR.md`                                                                                                                                    |
| `display/`                               | UI biçimlendirme yardımcıları (maliyet, gecikme vb.)                                                                                                                                                                                                                                                                  |
| `embeddings/`                            | Gömme hizmeti yardımcıları                                                                                                                                                                                                                                                                                            |
| `env/`                                   | Env değişkeni ayrıştırma + doğrulaması                                                                                                                                                                                                                                                                                |
| `evals/`                                 | Değerlendirme çerçevesi (ürünler, çalıştırıcı, çalışma zamanı) - bkz `docs/frameworks/EVALS.md`                                                                                                                                                                                                                       |
| `guardrails/`                            | PII maskeleyici, hızlı enjeksiyon, görüş köprüsü - bkz `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                  |
| `jobs/`                                  | Arka plan işleri (cron benzeri)                                                                                                                                                                                                                                                                                       |
| `memory/`                                | Konuşma belleği (SQLite FTS5 + sqlite-vec hybrid RRF + Qdrant tier 2) - bkz `docs/frameworks/MEMORY.md`                                                                                                                                                                                                               |
| `memory/embedding/`                      | Çok kaynaklı gömme katmanı: `index.ts` (çözücü), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                             |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 sarmalayıcı — KNN kaba kuvvet + hibrit RRF (FTS5 + vektörü, k = 60). Lazy-init, sqlite-vec kullanılamadığında zarif bir şekilde bozulur. (plan 21)                                                                                                                                                  |
| `memory/reindex.ts`                      | `runReindexBatch()` — anıları arka planda `needs_reindex=1` ile işler; `POST /api/memory/reindex` ve tembel dolgu yolu tarafından çağrılır. (plan 21)                                                                                                                                                                 |
| `monitoring/`                            | Sağlık kontrolleri, emisyon ölçümleri                                                                                                                                                                                                                                                                                 |
| `oauth/`                                 | 22 sağlayıcı modülü için OAuth/import akışları (agy, antigravity, Claude, cline, codebuddy-cn, codex, imleç, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                             |
| `plugins/`                               | Eklenti kaydı                                                                                                                                                                                                                                                                                                         |
| `promptCache/`                           | Antropik tarzda bilgi istemi önbellek kesme noktaları                                                                                                                                                                                                                                                                 |
| `skills/`                                | Beceri çerçevesi (yerleşik + market + SkillsSH) - bkz `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                     |
| `playground/`                            | Playground Studio'nun paylaşılan yardımcıları: `codeExport.ts` (curl/Python/TS oluşturucu), `promptImprover.ts` (meta istem oluşturucu), `streamMetrics.ts` (saf TTFT/TPS), `types.ts` (fiyatlandırma tablosu) - bkz `docs/frameworks/PLAYGROUND_STUDIO.md`                                                           |
| `webhookDispatcher.ts`                   | HMAC webhook teslimi - bkz `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                              |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Tünel yöneticileri - bkz `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                  |
| `cloudSync.ts`, `initCloudSync.ts`       | Durumun isteğe bağlı bulut senkronizasyonu                                                                                                                                                                                                                                                                            |
| `localDb.ts`                             | Db modülleri için yeniden dışa aktarma varili (mantık yok - yalnızca yeniden dışa aktarma)                                                                                                                                                                                                                            |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | + uyumsuzluğunu önbelleğe alma isteği                                                                                                                                                                                                                                                                                 |
| (~ 30 üst düzey dosya daha)              | Uzmanlaşmış yardımcılar (logEnv, modelsDevSync, piiSanitizer, vb.)                                                                                                                                                                                                                                                    |

### `src/lib/db/` — Veritabanı (147 modül + 208 geçişi)

| Alt dizin                 | Amaç                                                                                                                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `db/core.ts`              | WAL günlük kaydı ile `getDbInstance()` singleton                                                                                                                                                                                     |
| `db/migrations/`          | Sürümlendirilmiş SQL dosyaları (idempotent, işlemsel). `073_memory_vec.sql` `memory_vec_meta` + `needs_reindex` sütununu ekler (plan 21).                                                                                            |
| `db/playgroundPresets.ts` | Playground Studio ön ayarları için CRUD modülü (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)                                                        |
| `db/memoryVec.ts`         | `memory_vec_meta` için CRUD (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` vb. (plan 21)                                                                           |
| `db/<domain>.ts`          | Etki alanı başına bir modül: sağlayıcılar, kombinasyonlar, apiKey'ler, kullanıcılar, oturumlar, kullanım, denetim günlüğü, web kancaları, beceriler, bellek_girişleri, cloud_agent_tasks, değerlendirmeler* \* , Reasoning_cache vb. |

### `src/domain/`

| Modül                  | Amaç                                                       |
| ---------------------- | ---------------------------------------------------------- |
| `policy.ts`            | Politika motoru                                            |
| `fallbackPolicy.ts`    | Geri dönüş karar ağacı                                     |
| `costRules.ts`         | Maliyet hesaplama kuralları                                |
| `lockoutPolicy.ts`     | Model/connection kilitleme politikası                      |
| `tagRouter.ts`         | Etiket tabanlı yönlendirme                                 |
| `comboResolver.ts`     | Birleşik çözünürlük (birleşik motor tarafından kullanılır) |
| `modelAvailability.ts` | Model başına kullanılabilirlik kontrolü                    |
| `assessment/`          | Model değerlendirmesi (RFC-OTOMATİK DEĞERLENDİRME Aşama 1) |

### `src/server/`

| Modül    | Amaç                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| `authz/` | Yetkilendirme hattı: `classify` → `policies` → `enforce` - bkz `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS yapılandırması                                                                               |
| `auth/`  | Oturum ara yazılımı                                                                               |

### `src/shared/`

| Modül                            | Amaç                                                                                                             |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `components/`                    | Kontrol paneli bileşeni API: `packages/ui-kit` üzerindeki adaptörler - bkz. `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: ekranlar tarafından kullanılan simge adları → Lucide bileşenleri (`<Icon>`)                          |
| `constants/providers.ts`         | **377 sağlayıcı** Zod doğrulaması ile (gerçeğin kaynağı)                                                         |
| `constants/cliTools.ts`          | Harici CLI aracı kaydı                                                                                           |
| `constants/routingStrategies.ts` | **20 yönlendirme stratejisi** önceliklere sahip                                                                  |
| `constants/publicApiRoutes.ts`   | Taşıyıcı (yönetim vs.) kimlik doğrulaması gerektiren rotalar                                                     |
| `constants/upstreamHeaders.ts`   | Yukarı akış istekleri için başlık reddetme listesi                                                               |
| `validation/schemas.ts`          | ~ 80 Zod şemaları ( API sözleşmeleri için tek gerçek kaynak)                                                     |
| `validation/helpers.ts`          | Zod doğrulama yardımcıları (`validateBody` vb.)                                                                  |
| `types/`                         | Paylaşılan TS türleri                                                                                            |
| `contracts/`                     | Kamu API sözleşmeleri ( `files:` tarafından `package.json` tüketilir)                                            |
| `utils/circuitBreaker.ts`        | Sağlayıcı devre kesici (bkz. `docs/architecture/RESILIENCE_GUIDE.md`)                                            |
| `utils/apiAuth.ts`               | API anahtar doğrulaması, kapsam kontrolü                                                                         |
| `utils/fetchTimeout.ts`          | yukarı akış getirme için Timeout/abort sarmalayıcıları                                                           |
| `utils/releaseNotes.ts`          | Kapalı v2/legacy duyuru ayrıştırıcısı, yerelleştirme ve ID reddedilmesi                                          |

---

## `open-sse/` — Akış Motoru Çalışma Alanı

Ayrı npm çalışma alanı (`@omniroute/open-sse`). İstek işleme ve sağlayıcı yürütme işlemlerini gerçekleştirir.

```
open-sse/
├── handlers/            # 16 dosya (12 işleyici + 4 yardımcı): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search vb.
├── executors/           # 150 yürütücü modülü (BaseExecutor sınıfını genişleten sınıflar + sağlayıcı başına yardımcılar)
├── translator/          # Biçim dönüştürücüler (9 istek, 9 yanıt, 9 yardımcı)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ hizmet modülü (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM vb.)
├── mcp-server/          # MCP sunucusu (110 araç, 3 aktarım, 33 kapsam)
├── config/              # Sağlayıcı/model kayıtları, başlık yapılandırması, model takma adları
├── utils/               # TLS istemcisi, proxy fetch/dispatcher, ağ yardımcıları
├── index.ts             # Çalışma alanı giriş noktası
├── package.json         # Çalışma alanı manifesti
├── tsconfig.json        # Çalışma alanı TS yapılandırması
└── types.d.ts           # Çalışma alanı tür bildirimleri
```

### `open-sse/mcp-server/`

| Yol                         | Amaç                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| `server.ts`                 | MCP sunucusu yaşam döngüsü (stdio + HTTP aktarımları)                                            |
| `httpTransport.ts`          | HTTP Streamable + SSE aktarımları (`/api/mcp/sse`, `/api/mcp/stream`)                            |
| `audit.ts`                  | `mcp_tool_audit` tablosuna denetim günlükleme                                                    |
| `scopeEnforcement.ts`       | Araç başına kapsam doğrulaması                                                                   |
| `runtimeHeartbeat.ts`       | `DATA_DIR/runtime/mcp-heartbeat.json` dosyasına sistem durumu sinyali                            |
| `descriptionCompressor.ts`  | Bağlamdan tasarruf etmek için araç açıklaması meta verilerini sıkıştırır                         |
| `schemas/tools.ts`          | 36 temel araç tanımı + kapsamlar                                                                 |
| `tools/advancedTools.ts`    | Gelişmiş araç uygulamaları                                                                       |
| `tools/memoryTools.ts`      | 3 bellek aracı (arama/ekleme/temizleme)                                                          |
| `tools/skillTools.ts`       | 4 beceri aracı (listeleme/etkinleştirme/yürütme/yürütmeler)                                      |
| `tools/compressionTools.ts` | 5 sıkıştırma aracı                                                                               |
| `README.md`                 | Dahili MCP sunucusu README dosyası (`docs/frameworks/MCP-SERVER.md` üzerinden çapraz bağlantılı) |

---

## `packages/` — Çalışma Alanları

| Yol                      | Amaç                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — kaynak olarak kullanılan (derleme yok) Keak CI UI Kit'in projeye dahil edilmiş anlık görüntüsü (`private`, `UNLICENSED`). `UPSTREAM.md`, üst kaynak commit'ini sabitler ve lisans yetkilendirmesini kaydeder; `PATCHES.md`, yerel yamaları listeler (yok); `src/` yalnızca `scripts/dev/sync-ui-kit.sh` tarafından senkronize edilir ve `npm run check:ui-kit-snapshot` ile korunur. Bkz. `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — isteğe bağlı tarayıcı havuzu hizmeti (CloakBrowser ve Playwright destekli sohbet)                                                                                                                                                                                                                                                                                                                                        |

---

## `electron/` — Masaüstü Sarmalayıcısı

| Dosya            | Amaç                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `main.js`        | Electron ana süreci (BrowserWindow, gömülü Next.js sunucusu, tepsi, otomatik güncelleme) |
| `preload.js`     | IPC köprüsü (contextBridge → `window.omniroute`)                                         |
| `package.json`   | electron-builder yapılandırması + Electron 41 + electron-builder 26.10 bağımlılıkları    |
| `assets/`        | Uygulama simgeleri (Windows .ico, macOS .icns, Linux .png)                               |
| `dist-electron/` | Derleme çıktısı (git tarafından yok sayılır)                                             |
| `types.d.ts`     | İşleyici köprüsü için tür bildirimleri                                                   |
| `README.md`      | Dahili Electron README dosyası (ayrıca bkz. `docs/guides/ELECTRON_GUIDE.md`)             |

---

## `bin/` — CLI

| Dosya                                                                                                       | Amaç                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Ana CLI giriş noktası — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` vb. |
| `reset-password.mjs`                                                                                        | Bağımsız parola sıfırlama CLI'ı                                                                                                 |
| `cli/commands/setup.mjs`                                                                                    | Etkileşimli + etkileşimsiz kurulum sihirbazı                                                                                    |
| `cli/commands/doctor.mjs`                                                                                   | Sistem sağlığı tanılamaları (8+ kontrol)                                                                                        |
| `cli/commands/providers.mjs`                                                                                | Sağlayıcıları listeleme/test etme/doğrulama                                                                                     |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI yardımcı modülleri                                                                                                          |
| `cli/tray/tray.ts`                                                                                          | Sistem tepsisi entegrasyonu (platformlar arası: Windows'ta NotifyIcon, macOS/Linux'ta systray2)                                 |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon arka ucu (Windows, sıfır yeni ikili dosya)                                                                |
| `cli/tray/autostart.ts`                                                                                     | Platformlar arası otomatik başlatma (LaunchAgent / .desktop / kayıt defteri)                                                    |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5 adımlı SQLite sürücüsü çözümleme zinciri (paketlenmiş → çalışma zamanı → gecikmeli kurulum → node:sqlite → sql.js)            |
| `cli/runtime/magicBytes.mjs`                                                                                | İkili dosya sihirli bayt doğrulaması (ELF / Mach-O / Mach-O fat / PE)                                                           |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — postinstall / ilk başlatma sırasında sürücüleri önceden çözümler                                           |
| `nodeRuntimeSupport.mjs`                                                                                    | Kurulum sırasında desteklenen Node.js sürümünü doğrular                                                                         |

---

## `skills/` — Herkese Açık Agent Becerileri

| Dosya                        | Amaç                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | Harici AI agentları (Claude Desktop, ChatGPT, Cursor, Cline) için 10 beceri manifesti |

---

## `scripts/` — Derleme ve Kontrol Betikleri

| Betik                               | Amaç                                                                                                |
| ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Ortam değişkenlerini yükleyen geliştirme/başlatma çalıştırıcısı                                     |
| `build-next-isolated.mjs`           | Bağımsız derleme (Next.js 16 standalone)                                                            |
| `prepublish.ts`                     | `npm pack` öncesi paket hazırlığı                                                                   |
| `postinstall.mjs`                   | İlk kurulumda `.env.example` dosyasından otomatik olarak `.env` oluşturur                           |
| `sync-env.mjs`                      | `.env` anahtarlarını `.env.example` ile yeniden eşitler                                             |
| `check-cycles.mjs`                  | Döngüsel bağımlılıkları algılar                                                                     |
| `check-route-validation.mjs`        | Tüm API rotalarında Zod doğrulaması bulunduğunu doğrular                                            |
| `check-t11-any-budget.mjs`          | Dosya başına açık `any` bütçesini uygular                                                           |
| `check-docs-sync.mjs`               | Dokümantasyon sürüm eşitlemesini doğrular (mevcut ön işleme kontrolü)                               |
| **`check-env-doc-sync.mjs`**        | YENİ: Koddaki ortam değişkenlerini `.env.example` ve `ENVIRONMENT.md` ile çapraz kontrol eder       |
| **`check-docs-counts-sync.mjs`**    | YENİ: Sayıların (yürütücüler, stratejiler, OAuth, A2A becerileri) dokümanlarla eşleşmesini doğrular |
| **`check-deprecated-versions.mjs`** | YENİ: Dokümanlardaki güncelliğini yitirmiş sürümleri/tarihleri işaretler                            |
| `check-supported-node-runtime.ts`   | Mevcut Node sürümünün desteklendiğini doğrular                                                      |
| `check-pr-test-policy.mjs`          | Üretim kodu değişikliklerinde "testler gereklidir" kuralını uygular                                 |
| **`gen-provider-reference.ts`**     | YENİ: Katalogdan otomatik olarak `docs/reference/PROVIDER_REFERENCE.md` oluşturur                   |
| `i18n/generate-multilang.mjs`       | Google Translate aracılığıyla kullanıcı arayüzü dizelerini ve dokümanları çevirir                   |
| `i18n_autotranslate.py`             | LLM tabanlı doküman çeviri işlem hattı                                                              |
| `validate_translation.py`           | Yerel ayar başına çeviri doğrulaması                                                                |
| `check_translations.py`             | Kod tarafında i18n anahtarı kontrolü                                                                |
| `run-playwright-tests.mjs`          | Playwright E2E çalıştırıcısı                                                                        |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E çalıştırıcısı                                                                           |
| `run-ecosystem-tests.mjs`           | Ekosistem (sağlayıcı entegrasyonu) testleri                                                         |
| `test-report-summary.mjs`           | Kapsam özeti markdown'ı oluşturur                                                                   |
| `smoke-electron-packaged.mjs`       | Paketlenmiş Electron derlemesine temel işlev testi uygular                                          |
| `native-binary-compat.mjs`          | Yerel bağımlılıkların (`better-sqlite3`) Electron'ın Node sürümüyle eşleştiğini doğrular            |
| `validate-pack-artifact.ts`         | npm paket çıktısını doğrular                                                                        |
| `responses-ws-proxy.mjs`            | Codex Responses API için WebSocket köprüsü                                                          |
| `v1-ws-bridge.mjs`                  | `/api/v1/ws` uç noktası için WebSocket köprüsü                                                      |
| `standalone-server-ws.mjs`          | Bağımsız WS sunucusu çalıştırıcısı                                                                  |
| `system-info.mjs`                   | Destek amacıyla sistem/çalışma zamanı bilgilerini yazdırır                                          |
| `healthcheck.mjs`                   | Tek seferlik sistem durumu kontrolü (Docker HEALTHCHECK tarafından kullanılır)                      |
| `uninstall.mjs`                     | Temiz kaldırma betiği                                                                               |
| `dev/sync-ui-kit.sh`                | Sabitlenmiş bir commit'teki CI UI Kit `src/` içeriğini `packages/ui-kit/src` konumuna kopyalar      |
| `check/check-ui-kit-snapshot.mjs`   | Ön işleme geçidi: `packages/ui-kit/src`, sabitlenmiş upstream commit ile eşleşir                    |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — kullanımda olup `ICON_MAP` tarafından eşlenmeyen simge adları              |
| `dev/codemod-material-icons.mjs`    | Değişmez Material Symbols span'lerini `<Icon>` olarak yeniden yazar (geçiş araçları)                |

---

## `docs/` — Genel Belgeler (7 kök dosya + 17 alt dizin)

### Üst düzey kılavuzlar

| Doktor                      | Amaç                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| `ARCHITECTURE.md`           | Üst düzey mimari, alt sistem haritası, gösterge paneli yüzeyi                                          |
| `CODEBASE_DOCUMENTATION.md` | Mühendislik referansı: dizinler, modüller, kurallar                                                    |
| `FEATURES.md`               | v3.8'in öne çıkan özelliklerini içeren özellik matrisi                                                 |
| `USER_GUIDE.md`             | Son kullanıcı kılavuzu (kurulum, modeller, kombinasyonlar, CLIs, ses vb.)                              |
| `API_REFERENCE.md`          | Kimlik doğrulama modeliyle API uç nokta referansı                                                      |
| `openapi.yaml`              | OpenAPI 3.0 spesifikasyonu (121 yol)                                                                   |
| `SETUP_GUIDE.md`            | Kurulum yöntemleri (npm, npx, Docker, Electron, Termux, kaynak)                                        |
| `ENVIRONMENT.md`            | Tüm env değişkenleri (~ 800 belgelenmiştir, ~ 3.050 satır `.env.example`)                              |
| `TROUBLESHOOTING.md`        | Yaygın hatalar + v3.8.0'da bilinen sorunlar                                                            |
| `RELEASE_CHECKLIST.md`      | Tam sürüm akışı (beceriler, husky, geleneksel taahhütler, dağıtım)                                     |
| `COVERAGE_PLAN.md`          | Kapsam hedefleri ve mevcut durum                                                                       |
| `FREE_TIERS.md`             | Seçilmiş ücretsiz katmanlı sağlayıcılar (48 + ücretsiz + 11 OAuth)                                     |
| `CLI-TOOLS.md`              | Harici CLI entegrasyonları + Dahili OmniRoute CLI                                                      |
| `I18N.md`                   | i18n mimarisi, dil ekleme, 67 yerel ayar                                                               |
| `UNINSTALL.md`              | Kaldırma adımlarını temizleyin                                                                         |
| `PROVIDER_REFERENCE.md`     | **Otomatik olarak oluşturuldu** 377 sağlayıcının kataloğu (yenileme: `npm run gen:provider-reference`) |

### Alt sistem derinlemesine incelemeleri

| Doktor                                          | Amaç                                                                       |
| ----------------------------------------------- | -------------------------------------------------------------------------- |
| `MCP-SERVER.md`                                 | MCP sunucusu: 110 araç, 3 aktarım, 33 kapsam, REST uç noktaları            |
| `A2A-SERVER.md`                                 | A2A v0.3: JSON-RPC, 6 beceri, REST yardımcıları, temsilci kartı            |
| `AGENT_PROTOCOLS_GUIDE.md`                      | Birleşik kılavuz: A2A, ACP ve Cloud Agent'lar                              |
| `CLOUD_AGENT.md`                                | Codex Cloud / Devin / Jules orkestrasyonu                                  |
| `SKILLS.md`                                     | Beceri çerçevesi (yerleşik + market + SkillsSH + korumalı alan)            |
| `RADAR.md`                                      | Radarsız model katalog katmanı (`RADAR_ENABLED`, varsayılan olarak kapalı) |
| `MEMORY.md`                                     | Bellek sistemi (SQLite FTS5 + Qdrant)                                      |
| `EVALS.md`                                      | Değerlendirme çerçevesi (süitler, çalıştırmalar, değerlendirme listeleri)  |
| `GUARDRAILS.md`                                 | PII maskeleyici, hızlı enjeksiyon, görüş köprüsü                           |
| `COMPLIANCE.md`                                 | Denetim günlüğü, saklama, noLog devre dışı bırakma                         |
| `WEBHOOKS.md`                                   | HMAC imzalı web kancası teslimi                                            |
| `REASONING_REPLAY.md`                           | `reasoning_content` için hibrit memory/SQLite önbelleği                    |
| `AUTHZ_GUIDE.md`                                | Yetkilendirme hattı (`classify` → `policies` → `enforce`)                  |
| `RESILIENCE_GUIDE.md`                           | Devre kesici + soğuma süresi + modeli kilitleme                            |
| `docs/security/STEALTH_GUIDE.md` (yalnızca git) | TLS parmak izi (JA3/JA4), Claude Kodu CCH, MITM sertifikası                |
| `AUTO-COMBO.md`                                 | Otomatik Kombo motoru (16 faktörlü puanlama, 6 mod paketi, sanal fabrika)  |

### Sıkıştırma

| Doktor                          | Amaç                                            |
| ------------------------------- | ----------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Sıkıştırma modlarına genel bakış + yol haritası |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK motorları, kayıt sözleşmesi       |
| `COMPRESSION_RULES_FORMAT.md`   | Mağara adamı kural paketi JSON şeması           |
| `COMPRESSION_LANGUAGE_PACKS.md` | Dil başına kural paketi envanteri               |
| `RTK_COMPRESSION.md`            | RTK bildirimsel boru hattı (56 filtre)          |

### Dağıtım

| Doktor                       | Amaç                                                               |
| ---------------------------- | ------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | Docker yapısı, profiller (base/cli/host/cliproxyapi), Redis sepeti |
| `VM_DEPLOYMENT_GUIDE.md`     | Genel VM/VPS dağıtımı (Ubuntu/Debian + nginx + systemd)            |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io dağıtımı (şu anda yalnızca Çince)                           |
| `TERMUX_GUIDE.md`            | Termux aracılığıyla Android başsız                                 |
| `PWA_GUIDE.md`               | Aşamalı Web Uygulaması yükleme + hizmet çalışanı                   |
| `ELECTRON_GUIDE.md`          | Masaüstü uygulaması oluşturma + işareti + dağıtımı                 |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Huni                               |
| `PROXY_GUIDE.md`             | 4 seviyeli giden proxy + 1proxy pazarı                             |

### Alt dizinler

| Alt dizin             | Amaç                                                                                                                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Yerelleştirilmiş belge çevirileri (41 yerel ayar)                                                                                                                                                     |
| `docs/screenshots/`   | Kılavuzlar için resim öğeleri                                                                                                                                                                         |
| `_tasks/superpowers/` | süper güçlerden Plans/specs (`writing-plans`/`brainstorming`) + araştırması — izole edilmiş, ayrı versiyonlu repo, ana ağaç tarafından yok sayıldı. Bkz CLAUDE.md → "Planlama ve Araştırma Eserleri". |

---

## `tests/` — Test Paketleri

| Alt dizin                            | Tür                                     | Çalıştırıcı                                    |
| ------------------------------------ | --------------------------------------- | ---------------------------------------------- |
| `tests/unit/`                        | Birim testleri (~4.800 dosya, en hızlı) | Node yerel test çalıştırıcısı                  |
| `tests/integration/`                 | Çok modüllü + DB entegrasyon testleri   | Node yerel test çalıştırıcısı (eşzamanlılık 1) |
| `tests/e2e/`                         | UI + iş akışı E2E                       | Playwright                                     |
| `tests/e2e/protocol-clients.test.ts` | MCP + A2A gerçek istemci E2E            | Özel protokol istemcileri                      |
| `tests/e2e/ecosystem.test.ts`        | Sağlayıcı entegrasyonu (ağa erişen)     | Node yerel test çalıştırıcısı                  |

---

## `public/` — Statik Varlıklar

| Yol                 | Amaç                                                                    |
| ------------------- | ----------------------------------------------------------------------- |
| `public/` (kök)     | Favicon'lar, robots.txt, manifest, service worker, pazarlama görselleri |
| `public/providers/` | Sağlayıcı logosu PNG/SVG (dashboard'da kullanılır)                      |

---

## `config/` — Statik Yapılandırmalar + Kalite Geçidi Durumu

Dağıtılan yapılandırma şablonlarının yanı sıra commit edilmiş kalite geçidi temel değerleri
(kök dizini sade tutmak için v3.8.26 sürümünde repo kökünden buraya taşındı).

| Yol                                           | Amaç                                                                                                      |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Yerel ayar listesi + meta veriler (42 yerel ayar sayısı için kurallı kaynak)                              |
| `config/i18n-schema.json`                     | `i18n.json` dosyasını doğrulayan JSON şeması                                                              |
| `config/payloadRules.json`                    | Üst akış yükü temizleme kuralları                                                                         |
| `config/quality/quality-baseline.json`        | Çok metrikli mandal temel değeri (`scripts/quality/check-quality-ratchet.mjs`)                            |
| `config/quality/complexity-baseline.json`     | Sabitlenmiş ESLint karmaşıklık temel değeri (`check-complexity.mjs`)                                      |
| `config/quality/duplication-baseline.json`    | Sabitlenmiş jscpd yineleme temel değeri (`check-duplication.mjs`)                                         |
| `config/quality/file-size-baseline.json`      | Sabitlenmiş dosya başına boyut temel değeri (`check-file-size.mjs`)                                       |
| `config/quality/test-discovery-baseline.json` | Sabitlenmiş yetim test temel değeri (`check-test-discovery.mjs`)                                          |
| `config/quality/dependency-allowlist.json`    | Onaylanmış bağımlılıklar izin listesi (`check-deps.mjs`)                                                  |
| `config/quality/.license-allowlist.json`      | SPDX lisans izin listesi (`check-licenses.mjs`)                                                           |
| `config/quality/quality-metrics.json`         | Geçici olarak toplanan metrikler (`collect-metrics.mjs` tarafından oluşturulur; **gitignore kapsamında**) |

---

## `.github/` — GitHub Entegrasyonu

| Yol                                | Amaç                                                                   |
| ---------------------------------- | ---------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD iş akışları (lint, test, kapsam, sürüm yayımlama) |
| `.github/ISSUE_TEMPLATE/`          | Hata/özellik issue şablonları                                          |
| `.github/pull_request_template.md` | PR şablonu                                                             |
| `.github/dependabot.yml`           | Bağımlılık güncelleme yapılandırması                                   |

---

## `.husky/` — Git Hook'ları

| Dosya        | Amaç                                                                                                      |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| `pre-commit` | `lint-staged + check-docs-sync + check:any-budget:t11` komutlarını çalıştırır                             |
| `pre-push`   | Şu anda devre dışıdır (yorum satırına alınmıştır). `npm run test:unit` komutunu manuel olarak çalıştırın. |
| `_/`         | Husky'nin dahili dosyaları                                                                                |

---

## `.claude/` — Claude Code Eğik Çizgi Komutları

| Dosya                                               | Amaç                                                                          |
| --------------------------------------------------- | ----------------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — sürümü yükseltir + otomatik değişiklik günlüğü oluşturur |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — eksiksiz sürüm yayımlama iş akışı                    |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | VPS'ye dağıtım yapar                                                          |
| `commands/capture-release-evidences-cc.md`          | Yeni özellikleri tarayıcıda WebP olarak kaydeder                              |
| `commands/review-{prs,discussions}-cc.md`           | GitHub PR'larını/tartışmalarını sınıflandırır                                 |
| `commands/{review-issues,implement-features}-cc.md` | Issue iş akışları                                                             |
| `settings.local.json`                               | Proje bazında Claude Code ayarları                                            |

---

## `.agents/` — Genel Aracı İş Akışları (Codex / Cursor / vb.)

| Yol                      | Amaç                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `workflows/*-ag.md`      | 11 iş akışı tanımı (`.claude/commands/` dizininin yansıması) |
| `skills/<name>/SKILL.md` | Codex Yürütme Notları içeren 9 beceri tanımı                 |

> **Not:** İş akışları ve komutlar şu anda bayt bayt aynıdır. `.agents/` farklı bir aracı çalışma zamanını (Codex) hedeflemek üzere tasarlandıysa varyantların anlamlı biçimde farklılaşması gerekir.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Ana Ağacın Dışında

Alt çizgiyle başlayan bu dizinler, dağıtıma dahil edilmeyen içerikleri barındırır:

- **`_ideia/`** — tasarım notları (defer / notfit / viable kategorileri)
- **`_mono_repo/`** — geçmiş alt projeler (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — geliştirme sırasında çapraz referans amacıyla ilgili OSS projelerinin (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api vb.) salt okunur klonları
- **`_tasks/`** — sürüm bazında görev izleme dosyaları (gayriresmî)

`npm pack` çıktısına dahil edilmez. Bkz. `.npmignore`.

---

## Oluşturulan / Git Tarafından Yok Sayılanlar

| Yol                    | Amaç                          |
| ---------------------- | ----------------------------- |
| `node_modules/`        | npm bağımlılıkları            |
| `.next/`               | Next.js derleme çıktısı       |
| `coverage/`            | c8 kapsam raporları           |
| `logs/`                | Çalışma zamanı günlükleri     |
| `package/`             | npm pack hazırlama alanı      |
| `.playwright-mcp/`     | Playwright MCP test yapıtları |
| `.issues/`             | Yerel sorun önbelleği         |
| `tsconfig.tsbuildinfo` | TS artımlı derleme önbelleği  |

---

## Gezinme ipuçları

- **Yeni katkıda bulunan biri misiniz?** `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md` dosyalarını okuyun.
- **Sağlayıcı mı ekliyorsunuz?** `docs/architecture/ARCHITECTURE.md § Adding a New Provider` bölümünü izleyin ve `docs/reference/PROVIDER_REFERENCE.md` ile çapraz kontrol yapın.
- **Rota mı ekliyorsunuz?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` + `src/shared/validation/schemas.ts`.
- **MCP aracı mı ekliyorsunuz?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **A2A becerisi mi ekliyorsunuz?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Yerel olarak mı çalıştırıyorsunuz?** `docs/guides/SETUP_GUIDE.md`.
- **Dağıtım mı yapıyorsunuz?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Sürüm mü yayımlıyorsunuz?** `docs/ops/RELEASE_CHECKLIST.md` (ve `/generate-release-cc` Claude Code becerisi).
