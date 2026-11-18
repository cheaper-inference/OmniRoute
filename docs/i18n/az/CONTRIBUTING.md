# Contributing to OmniRoute (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## İnkişaf Mühiti

### İlkin tələblər

- **Node.js** `>=22.22.2 <23`, və ya `>=24.0.0 <27` (tövsiyə olunur: 24 LTS)
- **npm** 10+

> **Node 24 ilə Windows:** cari 24 LTS düzəliş buraxılışından istifadə edin (ən azı 24.20.0).
> Daha əvvəlki buraxılışlar `--test-force-exit` prosesi bağladıqda uğurlu testlərdən sonra
> prosesi dayandıra bilər. Node-un [Windows libuv düzəlişi](https://github.com/nodejs/node/pull/61999) bu
> icra mühiti qəzasını aradan qaldırır; test təsdiqləmələrini və runner-in çıxış yoxlamalarını aktiv saxlayın.

> **npm v11+ istifadəçiləri (Node 24+):** `npm install` əmrindən sonra native modulların quraşdırıldığını yoxlayın:
> `node -e "require('better-sqlite3')"`. Əgər `MODULE_NOT_FOUND` xətası ilə uğursuz olarsa,
> `npm approve-scripts better-sqlite3 && npm install` əmrini icra edin. Baxın:
> [Problemlərin aradan qaldırılması](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonlama və quraşdırma

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Mühit dəyişənləri

```bash
# Şablondan .env faylınızı yaradın
cp .env.example .env

# Tələb olunan məxfi açarları yaradın
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

İnkişaf üçün əsas dəyişənlər:

| Dəyişən                | İnkişaf üçün standart dəyər | Təsvir                          |
| ---------------------- | --------------------------- | ------------------------------- |
| `PORT`                 | `20128`                     | Server portu                    |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`    | Frontend üçün baza URL-i        |
| `JWT_SECRET`           | (yuxarıda yaradılır)        | JWT imzalama məxfi açarı        |
| `INITIAL_PASSWORD`     | `CHANGEME`                  | İlk giriş parolu                |
| `APP_LOG_LEVEL`        | `info`                      | Jurnal təfərrüatlılıq səviyyəsi |

### İdarə panelinin tənzimləmələri

İdarə paneli mühit dəyişənləri vasitəsilə də konfiqurasiya oluna bilən funksiyalar üçün UI keçidləri təqdim edir:

| Tənzimləmənin yeri       | Keçid                 | Təsvir                                        |
| ------------------------ | --------------------- | --------------------------------------------- |
| Tənzimləmələr → Qabaqcıl | Sazlama rejimi        | Sazlama sorğusu jurnallarını aktivləşdir (UI) |
| Tənzimləmələr → Ümumi    | Yan panelin görünməsi | Yan panel bölmələrini göstər/gizlət           |

Bu tənzimləmələr verilənlər bazasında saxlanılır və yenidən başladılmadan sonra qorunur; təyin edildikdə mühit dəyişəni standartlarını üstələyir.

### Lokal olaraq işə salma

```bash
# İnkişaf rejimi (hot reload)
npm run dev

# Production build
npm run build    # next build → .build/next/ sonra assembleStandalone → dist/
npm run start

# Contributor dəyişiklikləri üçün sürətli yalnız backend/API kompilyasiyası
npm run build:contributor

# Release build (təmiz yenidənqurma + HEAD sentinel — deploy üçün tələb olunur)
npm run build:release   # rm -rf .build dist və build + dist/BUILD_SHA yazır

# Ümumi port konfiqurasiyası
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Contributor build yalnız kompilyasiya yoxlaması həyata keçirir: standalone
distribusiyasını yığmır və optional native paketləmə aktivlərini build etmir. Göndərilə bilən paketi
yoxlamaq lazım olduqda adi production build-dən istifadə edin.

### Build çıxışının quruluşu

| Qovluq    | Məzmun                                                                       | İzlənilir |
| --------- | ---------------------------------------------------------------------------- | --------- |
| `src/`    | Tətbiq mənbə kodu (TypeScript / TSX)                                         | Bəli      |
| `.build/` | Aralıq fayllar — `next build` çıxışı (gitignored, `distDir = .build/next`)   | Xeyr      |
| `dist/`   | Göndərilə bilən paket — `assembleStandalone` tərəfindən yığılır (gitignored) | Xeyr      |

Build pipeline tək keçiddən ibarətdir:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js çıxışı)
  └─ assembleStandalone()                 (standalone + static + public + native aktivlərini köçürür)
       └─ çıxış: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` əlavə olaraq əvvəlcə hər iki qovluğu təmizləyir və
deploy bütövlüyü göstəricisi kimi `dist/BUILD_SHA` faylına
`git rev-parse --short HEAD` dəyərini yazır.

`npm run build:contributor` yalnız backend üçün build profilindən istifadə edir. Build zamanı
idarə panelinin UI fayllarını müvəqqəti olaraq stub-larla əvəz edir, API route handler-lərini saxlayır
və build-dən sonra orijinal faylları bərpa edir. İdarə panelinin UI-sına təsir edən dəyişikliklər və ya
tam release yoxlaması üçün `npm run build` əmrindən istifadə edin; contributor profili release build-i əvəz etmir.

> **VPS deploy qeydi:** uzaq image qovluğu `/usr/lib/node_modules/omniroute/app/`
> dəyişməz qalır. Deploy bacarıqları `dist/` məzmununu həmin qovluğa rsync edir.
> Yalnız repodaxili build çıxış yolu dəyişib (`app/` → `dist/`).

Standart URL-lər:

- **İdarə paneli**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git İş Axını

> ⚠️ **HEÇ VAXT birbaşa `main` budağına commit etməyin.** Həmişə xüsusiyyət budaqlarından istifadə edin.
>
> **PR bazası:** aktiv `release/vX.Y.Z` budağını (`main` deyil) hədəfləyin. Hər buraxılış üçün ayrıca budaq + buraxılış zamanı teq modelinə dair
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) sənədinə
> baxın.

```bash
# Aktiv buraxılışın son nöqtəsindən budaq yaradın (nümunə: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... dəyişiklikləri edin ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 olmaqla Pull Request açın
```

### Budaqların Adlandırılması

| Prefiks     | Məqsəd                       |
| ----------- | ---------------------------- |
| `feat/`     | Yeni xüsusiyyətlər           |
| `fix/`      | Xəta düzəlişləri             |
| `refactor/` | Kodun yenidən qurulması      |
| `docs/`     | Sənədləşdirmə dəyişiklikləri |
| `test/`     | Test əlavələri/düzəlişləri   |
| `chore/`    | Alətlər, CI, asılılıqlar     |

### Commit Mesajları

[Conventional Commits](https://www.conventionalcommits.org/) qaydalarına əməl edin:

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Əhatə dairələri (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Testlərin işə salınması

```bash
# Bütün testlər (unit + vitest + ecosystem + e2e)
npm run test:all

# Tək test faylı (Node.js-ın daxili test icraedicisi — əksər testlər bundan istifadə edir)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Yalnız dəyişikliyinizin təsir etdiyi unit testləri (CI keçidi ilə eyni TIA seçicisi, #8084)
npm run test:scoped            # son commit-dəki (və ya işçi ağacdakı) dəyişikliklər
npm run test:scoped:staged     # yalnız stage edilmiş dəyişikliklər — pre-commit icrası ilə yaxşı uyğunlaşır
npm run test:scoped:full       # əvvəlcə import qrafiki xəritəsini yenidən qurur (fayllar əlavə edildikdən/köçürüldükdən sonra)
# Exit 1 + "run the full suite" o deməkdir ki, mərkəzi fayl (tsconfig, package.json, …) və ya
# xəritələndirilməmiş mənbə dəyişib — seçici təhlükəsiz şəkildə uğursuz olur, heç vaxt səssizcə ötürmür.

# Vitest (MCP serveri, autoCombo, keş)
npm run test:vitest

# E2E testləri (Playwright tələb edir)
npm run test:e2e

# Protokol müştərilərinin E2E testləri (MCP nəqletmə mexanizmləri, A2A)
npm run test:protocols:e2e

# Ekosistem uyğunluğu testləri
npm run test:ecosystem

# Örtük keçidi: ifadələrin/sətirlərin/funksiyaların/budaqların 60%-i
npm run test:coverage
npm run coverage:report

# Lint + format yoxlaması
npm run lint
npm run check

# Keçidlə qorunan real yuxarı axın combo smoke testi (VPS girişi + real provayder kreditləri tələb edir)
# REAL provayderlərə sorğu göndərir — kiçik xərc yaradır. CI-da HEÇ VAXT işləmir. Keçid olmadan problemsiz ötürülür.
# Tələb olunur: ssh root@192.168.0.15 girişi (VPS-dən yalnız oxunan DB snapshot-ını mənbə kimi qoşur).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Mərhələ-3 VPS canlı smoke testi — sadə Node ESM skriptləri, canlı .15 serverinə birbaşa sorğu göndərir.
# Tələb olunur: ssh root@192.168.0.15 girişi (combo-lar SSH sqlite vasitəsilə yaradılır/silinir).
# REAL provayderlərə sorğu göndərir (kiçik xərc). Yalnız __live_test__* combo-larını yaradır/silir. CI-da HEÇ VAXT işləmir.
# .15 üzərində REQUIRE_API_KEY=false olduğuna görə API açarı lazım deyil, lakin təyin edilərsə COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY nəzərə alınır.
npm run test:combo:live:vps              # 7 HTTP ssenarisi (prioritet/dövrü/çəkili/xərc/fusion/auto + sağlamlıq)
npm run test:combo:live:vps:failover     # real provayderlərarası failover ssenarisi əlavə edir (cəmi 8)
```

Örtüklə bağlı qeydlər:

- `npm run test:coverage` əsas unit test dəsti üçün mənbə örtüyünü ölçür, `tests/**` qovluğunu istisna edir və `open-sse/**` qovluğunu daxil edir
- Pull request-lər ifadələr/sətirlər/funksiyalar/budaqlar üçün örtük keçidini **60%+** səviyyəsində saxlamalıdır
- PR `src/`, `open-sse/`, `electron/` və ya `bin/` daxilindəki istehsal kodunu dəyişirsə, həmin PR-da avtomatlaşdırılmış testlər əlavə edilməli və ya yenilənməlidir
- `npm run coverage:report` son örtük icrasından əldə edilən fayl-fayl ətraflı hesabatı çap edir
- `npm run test:coverage:legacy` tarixi müqayisə üçün köhnə metrikanı qoruyur
- Mərhələli örtük təkmilləşdirmə yol xəritəsi üçün `docs/ops/COVERAGE_PLAN.md` sənədinə baxın

### Pull Request tələbləri

PR açmazdan əvvəl dəyişdirdiyiniz hissə üçün fokuslanmış dövrəni icra etmək məqsədilə
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) təlimatından istifadə edin.
Tam unit test dəsti (4 CI shard-ı), Vitest, **60%+** örtük keçidi və istehsal build-i CI-ın
məsuliyyətidir — onları lokal olaraq işə salmaq PR yoxlamalarının onsuz da verməyəcəyi əlavə
məlumat vermir və daha zəif maşınlarda host-u həddən artıq yükləyə bilər (#8084):

- Dəyişikliyinizi əhatə edən test fayllarını işə salın: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` əmrini işə salın
- İstehsal kodu dəyişdikdə eyni PR-da avtomatlaşdırılmış testlər əlavə edin və ya yeniləyin
- `node:test` fayllarında hər bir üst səviyyəli `await` ifadəsini (məsələn, `await import(...)`) ilk `test()` / `describe()` çağırışından əvvəl yerləşdirin: `--test-force-exit` altında bundan sonra qeydiyyatdan keçirilən testlər səssizcə heç vaxt işləməyə bilər (#18045; `npm run check:test-tla-order` vasitəsilə məcburi yoxlanılır)
- İstehsal kodu dəyişdikdə dəyişdirilmiş və ya əlavə edilmiş test fayllarını PR təsvirinə daxil edin
- Layihə sirləri CI-da konfiqurasiya edilibsə, PR-da SonarQube nəticəsini yoxlayın

Cari test vəziyyəti: aşağıdakıları əhatə edən **122 unit test faylı**:

- Provayder tərcüməçiləri və format çevrilməsi
- Sürət məhdudlaşdırması, dövrə açarı və dayanıqlılıq
- Semantik keş, idempotentlik, gedişatın izlənməsi
- Verilənlər bazası əməliyyatları və sxem (21 DB modulu)
- OAuth axınları və autentifikasiya
- API endpoint validasiyası (Zod v4)
- MCP server alətləri və scope məhdudiyyətlərinin tətbiqi
- Yaddaş və Bacarıqlar sistemləri

---

## Kod üslubu

- **ESLint** — Dəyişiklikləri təsdiqləməzdən əvvəl `npm run lint` əmrini icra edin
- **Prettier** — Dəyişikliklərin təsdiqlənməsi zamanı `lint-staged` vasitəsilə avtomatik formatlanır (2 boşluq, nöqtəli vergüllər, qoşa dırnaqlar, 100 simvol eni, es5 son vergülləri)
- **TypeScript** — Bütün `src/` kodu `.ts`/`.tsx` istifadə edir; `open-sse/` isə `.ts`/`.js` istifadə edir; TSDoc (`@param`, `@returns`, `@throws`) ilə sənədləşdirin
- **`eval()` qadağandır** — ESLint `no-eval`, `no-implied-eval`, `no-new-func` qaydalarını tətbiq edir
- **Zod validasiyası** — Bütün API girişlərinin validasiyası üçün Zod v4 sxemlərindən istifadə edin
- **Adlandırma**: Fayllar = camelCase/kebab-case, komponentlər = PascalCase, sabitlər = UPPER_SNAKE

### Xətaların idarə edilməsi / boş catch blokları

Heç vaxt `catch` blokunu izahsız saxlamayın. Onu iki kateqoriyadan birinə aid edin (bu,
"SSE axınlarında xətaları heç vaxt səssizcə udmayın" sərt qaydasını praktikləşdirir):

- **Qəsdən edilən (özümüzə aid maksimum səy prinsipi ilə təmizləmə/telemetriya)** — burada xəta gözləniləndir və
  zərərsizdir; bir sətirlik əsaslandırıcı şərh əlavə edin, loqlama etməyin (hər sorğuda loqlama
  bu konvensiyanın qarşısını aldığı lazımsız səs-küydür).

  ```ts
  } catch {} // müştəri bağlantısı kəsildikdən sonra artıq bağlanmış kontrollerin bağlanması gözləniləndir
  ```

- **Loqlanmalıdır (xarici/çağıran tərəfindən təqdim edilən kod və ya xətanın udulması idarəetmə axınını dəyişir)** — `catch` blokunu
  saxlayın (onun axını pozmasına heç vaxt imkan verməyin), lakin xətanın aşkarlana bilməsi üçün kontekstli `console.debug`/`warn` çıxışı
  verin.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure geri çağırışında xəta:", e);
  }
  ```

Tətbiq edilmiş nümunələr üçün `open-sse/utils/stream.ts` və `open-sse/utils/streamHandler.ts` fayllarına baxın.

---

## Layihənin strukturu

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite domain modules + 130 migrations
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, 22 routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 150 executor modules (executor classes + per-provider helpers)
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (110 unique tools, 3 transports, 33 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (1,574 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/
├── adr/                     # Architecture Decision Records
├── architecture/            # System architecture & resilience
├── comparison/              # OmniRoute vs alternatives
├── compression/             # Compression guides & rules
├── dev/                     # Development guides
├── diagrams/                # Architecture diagrams
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # User guide, Docker, setup, troubleshooting
├── i18n/                    # Internationalized README translations
├── marketing/               # Marketing materials
├── ops/                     # Deployment, proxy, coverage, releases
├── providers/               # Provider-specific docs
├── reference/               # API reference, env vars, CLI tools, free tiers
├── releases/                # Release notes
├── routing/                 # Auto-combo engine, reasoning replay
├── screenshots/             # Dashboard screenshots
├── security/                # Guardrails, compliance, stealth, tokens
└── specs/                   # Design specs
```

---

## Yeni Provayderin Əlavə Edilməsi

### Addım 1: Provayder Sabitlərini Qeydiyyatdan Keçirin

`src/shared/constants/providers.ts` faylına əlavə edin — modul yüklənərkən Zod ilə doğrulanır.

### Addım 2: İcra Modulunu Əlavə Edin (xüsusi məntiq tələb olunarsa)

Baza icra modulunu genişləndirən icra modulunu `open-sse/executors/your-provider.ts` faylında yaradın.

### Addım 3: Tərcüməçi Əlavə Edin (OpenAI-dan fərqli format üçün)

Sorğu/cavab tərcüməçilərini `open-sse/translator/` qovluğunda yaradın.

### Addım 4: OAuth Konfiqurasiyasını Əlavə Edin (OAuth əsaslıdırsa)

OAuth giriş məlumatlarını `src/lib/oauth/constants/oauth.ts` faylına, xidməti isə `src/lib/oauth/services/` qovluğuna əlavə edin.

Əgər yuxarı axın provayderi açıq `CLI` / brauzer paketində ictimai OAuth `client_id`/`secret` və ya Firebase Web API açarı paylayırsa, onu sətir literalı kimi **yerləşdirməyin**. `open-sse/utils/publicCreds.ts` faylındakı `resolvePublicCred()` funksiyasından istifadə edin və `EMBEDDED_DEFAULTS` siyahısına maskalanmış bayt qeydi əlavə edin. Tam məcburi iş prosesi [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) sənədində təsvir edilib.

Emalçılar/icra modulları daxilində müştəriyə çatan xəta mesajları `open-sse/utils/error.ts` faylındakı `buildErrorBody()` / `sanitizeErrorMessage()` funksiyalarından keçməlidir — xam `err.stack` və ya `err.message` dəyərlərini heç vaxt Response gövdəsinə yerləşdirməyin. Baxın: [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Addım 5: Modelləri Qeydiyyatdan Keçirin

Model təriflərini `open-sse/config/providerRegistry.ts` faylına əlavə edin.

### Addım 6: Testləri Əlavə Edin

`tests/unit/` qovluğunda ən azı aşağıdakıları əhatə edən vahid testləri yazın:

- Provayderin qeydiyyatı
- Sorğu/cavab tərcüməsi
- Xətaların emalı

---

## Pull Request yoxlama siyahısı

- [ ] Testlər uğurla keçir (`npm test`)
- [ ] Lint yoxlaması uğurla keçir (`npm run lint`)
- [ ] Build uğurla tamamlanır (`npm run build`)
- [ ] Yeni ictimai funksiyalar və interfeyslər üçün TypeScript tipləri əlavə edilib
- [ ] Sərt kodlaşdırılmış məxfi məlumatlar və ya ehtiyat dəyərlər yoxdur
- [ ] İctimai upstream giriş məlumatları literal kimi deyil, `resolvePublicCred()` vasitəsilə daxil edilib (bax: [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md))
- [ ] Xəta cavabları `buildErrorBody()` / `sanitizeErrorMessage()` vasitəsilə yönləndirilir — cavab gövdələrində emal edilməmiş stack trace-lər yoxdur (bax: [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell komandaları (`exec` / `spawn`) icra vaxtı dəyərlərini sətir interpolasiyası ilə deyil, `env` vasitəsilə ötürür
- [ ] Bütün girişlər Zod sxemləri ilə yoxlanılır
- [ ] İstifadəçiyə təsir edən dəyişikliklər üçün `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` altında dəyişiklik jurnalının **fraqmenti** əlavə edilib (bax: [`changelog.d/README.md`](./changelog.d/README.md)) — `CHANGELOG.md` faylını birbaşa redaktə **etməyin**; fraqmentlər buraxılış zamanı birləşdirilir və PR-lər arasında heç vaxt ziddiyyət yaratmır
- [ ] Sənədləşmə yenilənib (tətbiq olunduğu halda)
- [ ] Yeni CodeQL / Secret-Scanning xəbərdarlıqları açılmayıb və ya hər biri müvafiq `docs/security/` sənədinə istinad edən texniki əsaslandırma ilə rədd edilib
- [ ] Alt proseslər yaradan marşrutlar (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts` faylında `isLocalOnlyPath()` kimi təsnif edilib — bax: [Sərt Qayda #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Commit mesajlarında AI/bot `Co-authored-by` treylerləri yoxdur (Sərt Qayda #16) — işindən yenidən istifadə edilən insan əməkdaşlara standart `Co-authored-by: Name <email>` treylerləri ilə istinad edilir

---

## Buraxılış

Buraxılışlar `/generate-release` iş axını vasitəsilə idarə olunur. Yeni GitHub Release yaradıldıqda, paket GitHub Actions vasitəsilə **avtomatik olaraq npm-də dərc edilir**.

VPS-də yerləşdirmələr üçün `npm run build` deyil, `npm run build:release` istifadə edin — bu əmr təmiz
yenidən qurma həyata keçirir, paketi `dist/` daxilində toplayır və `dist/BUILD_SHA` nəzarət faylını yazır.
Daha sonra `dist/` qovluğunu uzaq `app/` qovluğuna rsync edən `/deploy-vps-*-cc` bacarıqlarından istifadə edin.

---

## Yardım Almaq

- **Arxitektura**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) sənədinə baxın
- **API Arayışı**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) sənədinə baxın
- **Təhlükəsizlik sənədləri**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Əməliyyat sənədləri**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemlər**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
