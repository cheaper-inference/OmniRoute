# Release Checklist (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> Avtomatlaşdırma üçün Claude Code bacarıqlarından istifadə edən sadələşdirilmiş buraxılış axını.
>
> **Buraxılışlar arasında queue/branch yaşıl saxlayın:** bax [RELEASE_GREEN.md](./RELEASE_GREEN.md) (`/green-prs` ailəsi + `npm run check:release-green` + `/babysit` + gecə). Bu vaxtaşırı — və xüsusilə Running** əvvəl** bu yoxlama siyahısı — buraxılış PR başlanğıcını yaşıl edir.

## Qısa məzmun

```bash
# 1. Versiyanı artırın + CHANGELOG yaradın (bacarıq)
/version-bump-cc patch    # və ya minor/major

# 2. Keyfiyyət yoxlamasını lokal olaraq icra edin
npm run check              # lint + testlər
npm run test:coverage      # tam əhatə yoxlaması (60/60/60/60)

# 3. Qurun və tüstü testini icra edin
npm run build
npm run test:e2e           # istəyə bağlıdır, lakin tövsiyə olunur

# 4. Buraxılış yaradın (bacarıq)
/generate-release-cc

# 5. Yerləşdirin (bacarıq)
/deploy-vps-both-cc        # və ya akamai-cc / local-cc

# 6. Buraxılış sübutlarını toplayın (bacarıq)
/capture-release-evidences-cc
```

## npm Trusted Publishing (v3.8.51-dən bəri defolt) — sorğu əsasında hazırlanır, ehtiyat kimi birbaşa

`npm-publish.yml` vasitəsilə dərc edir** npm Etibarlı Nəşriyyat (OIDC)** defolt olaraq: `stage-npm` işi (github-host) GitHub-nin id-tokenini həmin iş üçün qısamüddətli npm etimadnaməsi ilə mübadilə edir — repozitor sirlərində uzunmüddətli npm nişanı yoxdur, 2FA sorğusu, mənbə əlavə edilmir. Bu, indi 2FA-nı atlayan tokenlərin ləğv edildiyi npm sanksiyalarıdır; WS1.3 zəmanətini saxlayarkən layihənin v3.8.48-ə qədər olan tam avtomatik axını bərpa edir (sızmış token tək dərc edilə bilməz — heç bir token yoxdur).

**Birdəfəlik quraşdırma (sahibi):** npmjs.com → paketi `omniroute` → Parametrlər → _Trusted Publisher_ → GitHub: sahibi `diegosouzapw`, repo `OmniRoute`, iş axını `npm-publish.yml` (mühit: heç biri). Bu mövcud olana qədər avtomatik addım `ENEEDAUTH` ilə uğursuz olur: `publish_mode=staged` (aşağıda) və ya `direct` ilə yenidən göndərin.

### Mərhələli nəşr (istək əsasında — `publish_mode=staged`)

npm-publish iş axını artıq birbaşa dərc etmir: o, paketlənmiş tarballu (`check:pack-boot`) yükləyir və sonra `npm stage publish` — işə salır, dəqiq baytlar reyestrdə saxlanılır,** quraşdırıla bilməz** sahibi razılaşana qədər. İnsan 2FA qapısı ondan əvvəl deyil, sübuta AFTER hərəkət etdi.

**İş axını yaşıllaşdıqdan sonra sahib axını:**

1. `npm stage list omniroute` — mərhələ identifikatorunu tapın (həmçinin iş axınının xülasəsində çap olunur).
2. Mərhələli baytları yoxlayın (tövsiyə olunur): `npm stage download <id>`, sonra yüklənmiş tarballu müvəqqəti prefiksə quraşdırın və onu yükləyin (`npm run check:pack-boot` eyni paketi avtomatlaşdırır →CI-də → yükləmə hökmünü quraşdırın).
3. `npm stage approve <id>` — 2FA tez dərc IS. `npm stage reject <id>` rədd edir.
4. Nəşrdən sonrakı şəbəkə: nəşrdən sonrakı doğrulayıcı (v3.8.49 planının WS1.4) nəşr edilmiş versiyanı ictimai reyestrdən təmiz konteynerə quraşdırır və onu işə salır.

**Fövqəladə hal:** `publish_mode=direct` ilə `workflow_dispatch` mirası dərhal `npm publish` bərpa edir (yalnız səhnələşdirmənin özü səhv davrandıqda istifadə edin; səbəbini qeyd edin).

**Birdəfəlik sərtləşmə (sahibi, npmjs.com):** Etibarlı Nəşriyyatı `omniroute` üçün yalnız mərhələ rejimində konfiqurasiya edin ki, sızan uzunömürlü token hər hansı bir yerdən birbaşa `npm publish` edə bilməyəcək — CI yalnız səhnələşdirə bilsin; yalnız sahibin 2FA buraxılışları.

**Sınıq-artifakt oyun kitabı (dəyişməmiş):** standart refleks kimi `npm deprecate omniroute@<bad> "<reason> — use <fixed>"` (dəqiqələr, geri dönən); `npm unpublish` yalnız 72h/no-dependents pəncərəsində və heç vaxt ilk hərəkət kimi deyil. Docker: versiya teqini heç vaxt yenidən yazmayın — rollback `latest` son yaxşı həzminə yönəldir.

**Docker Hub `latest` (required on every stable SemVer publish):** `docker-publish` iş axını etiketləməlidir** hər ikisi** `X.Y.Z` and, when `should-promote-latest.sh` agrees this is the highest stable SemVer, `:latest` with the** eyni həzm** . After the job: Hub `latest` digest equals the new SemVer digest and `last_updated` moved. Do not leave `:latest` on an older build while release notes talk about fixes that only exist on git. `:latest` istifadə edərək sürətli başlanğıcları yaradın; GitOps `X.Y.Z` sabitləməyə davam etməlidir. [Docker buraxılış kanallarına](../guides/DOCKER_GUIDE.md#release-channels) və #10317 baxın.

**Docker Hub təşkilat deposu (`cheaperinference/omniroute`):** Docker Hub repozitoriyanı ad boşluqları arasında köçürə bilməz, ona görə də `diegosouzapw/omniroute` çəkmə tarixçəsini və hər buraxılışı saxlayır və `docker-publish` -in `mirror-org-dockerhub` işi hər buraxılmış versiyanı (və irəli çəkildikdə `:latest` ) `ghcr.io/cheaper-inference/omniroute` -dan təşkilat deposuna köçürür. Bu `DOCKERHUB_ORG_USERNAME` / `DOCKERHUB_ORG_TOKEN` sirləri lazımdır; without them the job stays green with a "Docker Hub org mirror skipped" warning and the other registries publish normally. Buraxılmış versiyanı daha sonra orada dərc etmək üçün işə salın** Fəaliyyətlər → Docker şəklini Docker Hub org-a əks etdirin → Run iş axını** `version=X.Y.Z` ilə (və ən yüksək stabil versiya üçün `promote_latest` ): o, mövcud şəkilləri kopyalayır, yenidən qurulmur. Həmin repozitoriyanın Docker Hub icmalı əl ilə qurulur: onu redaktə edən API Təşkilat Giriş Tokenlərini rədd edir.

Eyni iş axını 2027-06-30 tarixinə qədər hər buraxılışı köhnə GHCR paketi `ghcr.io/diegosouzapw/omniroute` ə kopyalayır, ona görə də ona bərkidilmiş quraşdırmalar yenilənməyə davam edir; onun indeksi " `ghcr.io/cheaper-inference/omniroute` yə köçürüldü" təsvirini daşıyır. O `GHCR_LEGACY_TOKEN` sirrini tələb edir ( `write:packages` ilə `diegosouzapw` -nin klassik şəxsi giriş nişanı); onsuz bu iş "Legacy GHCR mirror atlandı" xəbərdarlığı ilə atlanır.

## Hotfix Fast-Lane (label `hotfix`)

`hotfix` etiketi ilə işarələnmiş PR ağır CI matrisini (9-parçalı E2E, coverage ratchet,
quality-gate, quality-extended) ötürür və sürətli, yüksək siqnallı yoxlamaları saxlayır: build,
unit shards, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
və tarball boot-smoke (`check:pack-boot`). Məqsəd: təxminən 33 dəqiqə əvəzinə ≤15 dəqiqəyə
uğurlu nəticə əldə etməkdir.

**Giriş siyasəti — dördünün də yerinə yetirilməsi tələb olunur (Chromium/VS Code/Node emergency lane-ləri əsasında):**

1. **Ciddilik**: production işlək deyil — yayımlanmış artifact yüklənmə zamanı çökür / təhlükəsizlik düzəlişi tələb olunur / buraxılışın bütün istifadəçiləri təsirlənir. "Vacib" sözü "işlək deyil" demək deyil.
2. **Səlahiyyət**: `hotfix` etiketini yalnız repository sahibi tətbiq edir. Etiket təsdiqin ÖZÜDÜR — campaign PR üzərində heç vaxt özünüz tətbiq etməyin.
3. **Sübut**: PR mətnində əvvəlki tam yaşıl heavy run-a (ötürülmüş job-ların yenidən təsdiq etməli olduğu suite) və düzəlişin özünün əvvəlcə uğursuz, sonra uğurlu olan testinə keçid verilir.
4. **Əhatə dairəsi**: yalnız cherry-pick — minimal düzəliş, refaktorinq və əlavə dəyişikliklər yoxdur.

Ötürülmüş coverage/ratchet səthi release branch-də növbəti tam run tərəfindən yenidən yoxlanılır
(davamlı release-green) — bu lane WAITING mərhələsini ötürür, validasiyanı deyil.
Yalnız testlərə aid diff-lər (`tests/` altındakı bütün fayllar, `tests/e2e/` altında heç bir fayl yoxdur)
E2E matrisini avtomatik ötürür, heç bir etiket tələb olunmur.

## Ətraflı Yoxlama Siyahısı

### Öncədən buraxılış

- [ ] Bu buraxılışa yönəlmiş bütün PRs `release/vX.Y.0` ilə birləşdirilib
- [ ] Bu versiya üçün bütün açıq Linear/issue elementləri bağlanır və ya növbəti mərhələyə keçirilir
- [ ] `release/vX.Y.0` filialında CI yaşıl
- [ ] Kodda `TODO(release)` markerləri yoxdur: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker əsas şəkli günə qədər (hazırda `node:24.15.0-trixie-slim`)

### Versiya və Dəyişikliklər

- [ ] Run `/version-bump-cc <patch|minor|major>` (Claude Code bacarıq)
  - Bumps `package.json`, `electron/package.json`
  - Son teqdən bəri git əməliyyatlarından `CHANGELOG.md` bərpa edir
  - README.md nişanlarını yeniləyir
- [ ] CHANGELOG.md əl ilə nəzərdən keçirin və lazım gələrsə, öhdəçilik mesajlarını təmizləyin
- [ ] `CHANGELOG.md` da ən son semver bölməsinin `package.json` versiyasına bərabər olduğundan əmin olun
- [ ] Qarşıdan gələn iş üçün ilk dəyişiklik jurnalı bölməsi olaraq `## [Unreleased]` saxlayın
- [ ] `docs/openapi.yaml` → `info.version` yeniləməsi `package.json` versiyasına bərabər olmalıdır

### Kod keyfiyyəti

- [ ] `npm run lint` — 0 xəta (xəbərdarlıqlar əvvəlcədən mövcuddur)
- [ ] `npm run typecheck:core` — təmiz
- [ ] `npm run typecheck:noimplicit:core` — təmiz (ciddi)
- [ ] donmuş `metrics.cycles` tavanı daxilində `npm run check:cycles:ratchet` — (çılpaq `check:cycles` istənilən dövrədə 1-dən çıxır, #15281)
- [ ] büdcə daxilində `npm run check:any-budget:t11` —
- [ ] `npm run check:route-validation:t06` — təmiz
- [ ] `npm run check:node-runtime` — dəstəklənən icra zamanı mərtəbəsi qarşılandı (`>=22.22.2 <23`, `>=24.0.0 <27`, `src/shared/utils/nodeRuntimeSupport.ts`-də hər `SUPPORTED_NODE_RANGE` ; `package.json` `engines` ilə düzülmüş )

### Test

- [ ] `npm run test:unit` — keçidi
- [ ] `npm run test:vitest` — pass (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — qapısı 60/60/60/60 razı (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (əgər DB / işləyicilərə toxunursa)
- [ ] `npm run test:combo:matrix` — keçidi (kombo strategiya matrisi: bütün 22 ictimai marşrutlaşdırma strategiyasının seçim qərarlarını qəti şəkildə sübut edir; birləşmiş marşrutlaşdırma, strategiya həlli və ya ehtiyat məntiqinə toxunarkən işləyin)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (qapalı real-yuxarı tüstü; VPS `root@192.168.0.15` dən yalnız oxumaq üçün DB snapshot mənbəyidir; real provayderləri vurur, kreditlərə xərclənir; heç vaxt CI də işləmir; qapı olmadan təmiz atlar)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS canlı tüstü: adi Node ESM vasitəsilə canlı `.15` serverinə qarşı 7 HTTP ssenari; `ssh root@192.168.0.15` tələb edir; creates/deletes yalnız `__live_test__*` kombinləri; real provayderləri vurur; heç vaxt CI-də işləmir)
- [ ] `npm run test:e2e` — pass (UI dəyişiklikləri)
- [ ] `npm run test:protocols:e2e` — pass (MCP/A2A dəyişiklikləri)
- [ ] `npm run test:ecosystem` — keçidi

### Qarmaqlar (Husky təsdiqlənmiş)

Husky qarmaqları `.husky/` -da yaşayır və git əməliyyatlarında avtomatik işləyir.

- **əvvəlcədən öhdəsindən gəlmək:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **əvvəlcədən itələmək:** sürətli deterministik qapılar — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivləşdirilmiş 2026-06-13). `test:unit` qəsdən istisna edir (yavaş; CI `test-unit` işi ilə əhatə olunur).
  - Buraxılış budaqlarını itələməzdən əvvəl `npm run test:unit` əl ilə işə salın.

Qarmaq uğursuz olarsa: əsas problemi həll edin, `--no-verify` ilə yan keçməyin.

### Adi Komitələr

Bütün buraxılışlarla bağlı öhdəliklər `type(scope): subject` formatına uyğun olmalıdır.

**Etibarlı növlər:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Etibarlı əhatə dairələri:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker` `authz` `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers` `executors`, `translator`, `domain`

Dəyişiklikləri pozan: əhatə dairəsindən sonra `BREAKING CHANGE:` altbilgisi və ya `!` əlavə edin (məsələn, `feat(api)!: drop /v0`).

### Sənədləşdirmə

- [ ] `npm run check:docs-sync` keçidləri (əvvəlcədən icra ilə avtomatik idarə olunur)
- [ ] `npm run check:docs-all` keçir. Məsləhətçi `check:deprecated-versions` açıq şəkildə OmniRoute (3.6.x və əvvəllər) ilə əlaqəli versiyaları qeyd edir və tarixləri nəzərə almır.
- [ ] `npm run check:env-doc-sync` çıxır 0 — kodu ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env müqaviləsi tam
- [ ] `npm run check:doc-links` yenidən strukturlaşdırıldıqdan sonra 0 — dən çıxır
- [ ] `docs/architecture/ARCHITECTURE.md` storage/runtime drift üçün nəzərdən keçirilir
- [ ] `docs/guides/TROUBLESHOOTING.md` env var və əməliyyat sürüşməsi üçün nəzərdən keçirilir
- [ ] `.env.example` dəyişdisə: `docs/reference/ENVIRONMENT.md` yeniləndi
- [ ] Yeni funksiyada UI varsa: `docs/guides/USER_GUIDE.md` bunu qeyd edir
- [ ] Yeni funksiyada API varsa: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` yeniləndi
- [ ] Yeni funksiya moduldursa: xüsusi `docs/<MODULE>.md` mövcuddur
- [ ] Dəyişiklik pozulursa: `docs/guides/TROUBLESHOOTING.md` miqrasiya qeydi var

### i18n

- [ ] `npm run i18n:check` mənbə sənədləri ilə sinxronlaşdırılaraq 0 — tərcümə vəziyyətindən (`.i18n-state.json`) çıxır (ciddi rejimdə sürüklənmiş mənbələr yoxdur; xəbərdarlıq rejimi məsləhəti son dəqiqə sənəd toxunuşları üçün məqbuldur, lakin etiketləmədən əvvəl 0 olmalıdır)
- [ ] `npm run i18n:check-ui-coverage` 80% əhatə dairəsi səviyyəsində və ya yuxarıda hər UI yerli 0 — çıxış edir
- [ ] `npm run i18n:sync-ui:dry` bütün 66 hədəf yerli ( `en` mənbəyi istisna olmaqla, hər bir yerli) üzrə 0 çatışmayan açarı bildirir
- [ ] Mənbə İngilis dili sənədləri dəyişdirilərsə, etiketləmədən əvvəl `npm run i18n:run` ( `.env`-də `OMNIROUTE_TRANSLATION_API_KEY` tələb olunur) işlədin
- [ ] Tərcümə töhfələri azdırsa, növbəti buraxılışa təxirə salına bilər ( CHANGELOG-da trek)

### Verilənlər Bazasının Miqrasiyaları

- [ ] `src/lib/db/migrations/` yeni fayllar varsa:
  - [ ] Hər bir köç idempotentdir (`CREATE TABLE IF NOT EXISTS` və s.)
  - [ ] Miqrasiya əməliyyatlara bükülmüşdür
  - [ ] Düzgün nömrələnmişdir (ardıcıllıqda boşluq yoxdur)
- [ ] Təzə quraşdırmada sınaqdan keçirin: `~/.omniroute/omniroute.db` silin və `npm run dev` işə salın
- [ ] Mövcud quraşdırmada sınaqdan keçirin: DB ehtiyat nüsxəsini çıxarın, miqrasiyanı işə salın, sxemi yoxlayın
- [ ] miqrasiya cədvəlləri yenidən yazırsa WAL faylları (`-wal`, `-shm`) düzgün idarə olunur

### Provayder Kataloqu (Zod ilə təsdiqlənmiş)

- [ ] `src/shared/constants/providers.ts` Zod sxemi yükləmə zamanı etibarlıdır
  - [ ] Bütün provayderlərdə tələb olunan sahələr var (`id`, `label`, `kind` və s.)
  - [ ] `freeNote` yeni pulsuz provayderlər üçün nəzərdə tutulmuşdur
  - [ ] OAuth provayderləri `src/lib/oauth/constants/oauth.ts`-də qeydiyyatdan keçmiş `oauthConfig` var
- [ ] Yeni provayder əlavə edilərsə: `open-sse/executors/`-da müvafiq icraçı
- [ ] Qeyri-OpenAI formatı varsa: `open-sse/translator/`-da tərcüməçi
- [ ] `open-sse/config/providerRegistry.ts`-da qeydiyyatdan keçmiş modellər
- [ ] `tests/unit/` -da vahid testləri provayderin təsnifatını və marşrutunu əhatə edir

### İş masası (Electron)

`electron/` dəyişibsə:

- [ ] `npm run electron:smoke:packaged` keçir
- [ ] Quraşdırmalar ən azı `:win`, `:mac`, `:linux` üçün sınaqdan keçirilmişdir
- [ ] Kod imzalama sertifikatlarının müddəti bitməyib (imzalanırsa)
- [ ] `electron/package.json` versiyası kök `package.json` ilə uyğun gəlir
- [ ] Avtomatik yeniləmə kanal göstəricisi `stable`-ya buraxılarsa yenilənir

### Quraşdırma Planı

Repozitoriya üç fərqli çıxış kataloqundan istifadə edir — onları heç vaxt qarışdırmır:

| kataloq   | Məqsəd                                                                   | İzlənildi?           |
| --------- | ------------------------------------------------------------------------ | -------------------- |
| `src/`    | Tətbiq mənbəyi (TypeScript / TSX)                                        | Bəli                 |
| `.build/` | Aralıq — `next build` çıxışı qurun (`distDir`)                           | Xeyr (götürülmüşdür) |
| `dist/`   | Göndərilə bilən npm paketi — `assembleStandalone` tərəfindən yığılmışdır | Xeyr (götürülmüşdür) |

> **Operator qeydi:** uzaq VPS şəkil kataloqu `/usr/lib/node_modules/omniroute/app/` olaraq qalır. Yalnız** repoda** qurma çıxışı köçürüldü (`app/` → `dist/`). Yerləşdirmə bacarıqları rsync `dist/` məzmununu uzaq `app/` dir — a VPS yolunda dəyişikliklər tələb etmir.

**Tək quruluşlu axın:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

NOT run `npm run build` ardınca ayrıca `npm run build:cli` — üçün `npm run build:release` istifadə edin, hansı ki, bir komandada + sentinel-in təmiz yenidən qurulmasını həyata keçirir.

### Artefaktın təsdiqi

- [ ] `npm run build:release` uğur qazanır və `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` təmiz — `app.__qa_backup`, `scripts/scratch`, `package-lock.json` və ya digər yerli qalıq yoxdur
- [ ] `dist/server.js` qurulduqdan sonra mövcuddur
- [ ] İsteğe bağlı yerli paketlənmiş iş zamanı tüstüsü: `npm run dev:candidate -- build` sonra `npm run dev:candidate -- validate` paketlənmiş tarballu təcrid olunmuş `DATA_DIR` də yükləyir və `/api/health` + `/v1/models` yoxlayır ( [Töhfə Qızıl Yoluna](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) baxın)

### Etiketləmə və Buraxılış

- [ ] Run `/generate-release-cc` (Claude Code bacarıq):
  - `vX.Y.Z` etiketi yaradır
  - Etiketi və filialı itələyir
  - Changelog gövdəsi ilə GitHub Release açır
  - Electron quraşdırıcılarını əlavə edir (əgər qurulmuşdursa)
- [ ] Və ya əl ilə:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Yerləşdirin

Yerləşdirmə bacarıqları yüngül rsync axınından istifadə edir — no `npm pack`, no `npm i -g`:

- [ ] Hədəfə uyğun gələn yerləşdirmə bacarığından istifadə edin:
  - `/deploy-vps-local-cc` — yerli VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — hər ikisi
- [ ] Yerləşdirmədən əvvəl `dist/BUILD_SHA` == `git rev-parse --short HEAD` təsdiqləyin
- [ ] Qurma `node_modules` real olduğu yerdə işləməlidir (əsas yoxlama və ya `npm ci`'d worktree — NOT simvolik iş ağacı)
- [ ] Duman testinin yerləşdirilmiş nümunəsi:
  - `/dashboard/health` → versiyasını yoxlayın sətir buraxılışa uyğun gəlir
  - Tanınmış provayderə qarşı `/v1/chat/completions` sorğusu işlədin
  - `/api/monitoring/health` `CLOSED` dövrə açarlarını qaytardığını yoxlayın
  - MCP nəqlinin cavab verməsini təsdiqləyin (`/mcp` HTTP, `/mcp-sse` SSE)

### Buraxılışdan sonrakı

- [ ] Run `/capture-release-evidences-cc` (Claude Code bacarıq)
  - Yeni funksiyaların WebP screenshots/recordings çəkir
  - Buraxılış qeydlərinə / blog yazısına əlavə olunur
- [ ] GitHub Discussions / Discord buraxılış elanı ilə yeniləyin
- [ ] Növbəti versiya üçün mərhələni açın
- [ ] Əgər kritikdirsə: proqramdaxili banner üçün müzakirə və ya postu `news.json` da yerləşdirin

### Radar ictimai buraxılış qapısı

Radar elanı qəsdən `active: false` ilə törədilir. Aşağıdakı hər bir element sübut edildikdən sonra aktivləşdirmə ayrıca dəyişiklikdir:

- [ ] Bütün yığılmış Radar PRs birləşdirilib və buraxılış ucu CI yaşıldır
- [ ] Defolt olaraq `RADAR_ENABLED` hələ də sönük vəziyyətdə OSS Radar marşrutlarını yerləşdirin və çəkin
- [ ] Adlandırılmış Radar hostunda `GET /planos`, `/termos`, `/privacidade` və `/reembolso` tüstüləyin
- [ ] Şəxsi xidmətdə operator identity/contact/address və sahibi tərəfindən təsdiqlənmiş hüquqi baxışı qeyd edin
- [ ] Stripe Checkout və imzalanmış webhooku yalnız test rejimində həyata keçirin
- [ ] Təsdiqlənmiş sender/domain ilə bir şifrəli tranzaksiya-e-poçt çatdırılmasını həyata keçirin
- [ ] Yedək nüsxəsinin bərpasını və bir nəzarət edilən, büdcə ilə məhdudlaşan tədqiqat işini sübut edin
- [ ] İanə sübutunu qəbul etməzdən əvvəl BRL/PIX baxış siyasətini təsdiq edin
- [ ] Yalnız əvvəlki qapılardan sonra ictimai Checkoutu aktiv edin, sonra yeni `news.json` ID aktivləşdirin
- [ ] Əsas səhifə bannerinin lokallaşdırılmış nüsxədən istifadə etdiyini və köhnə ID ləğv edildikdən sonra yeni ID yenidən göründüyünü yoxlayın

## Embedded Services smoke (v3.8.4+)

Embedded services dəyişikliklərini ehtiva edən hər hansı buraxılışı yayımlamazdan əvvəl aşağıdakıları yoxlayın:

### Təzə verilənlər bazası ilə yüklənmə (miqrasiya toqquşmalarını aşkar edir — v3.8.4 hotfix-dən sonra əlavə edilib)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — yüklənmə üçün 10 saniyə gözləyin
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` `"9router"` qaytarır (404 DEYİL, 500 DEYİL). `071_services.sql` miqrasiyasının tətbiq edildiyini və sətrin yaradıldığını təsdiqləyir.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` 3 sətir qaytarır.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` 2 sətir qaytarır (`070_webhooks_kind_metadata.sql` miqrasiyasının tətbiq edildiyini təsdiqləyir).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` uğurla tamamlanır — gələcək toqquşmaların qarşısını alır.

### 9Router

- [ ] `POST /api/services/9router/install` 2 dəqiqədən az müddətdə `installedVersion` ilə 200 qaytarır
- [ ] `POST /api/services/9router/start` 30 saniyədən az müddətdə 200 və `state: "running"` qaytarır
- [ ] `GET /api/services/9router/status` `health: "healthy"` bildirir
- [ ] `"model": "9router/auto/..."` ilə `POST /v1/chat/completions` 200 qaytarır (9Router üzərindən başdan-başa marşrutlaşdırma)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` proxy daxilində 9Router-in yerli interfeysini göstərir (birbaşa `127.0.0.1:port` iframe-i yoxdur)
- [ ] `POST /api/services/9router/rotate-key` `{ keyRotated: true }` qaytarır və xidmət problemsiz yenidən başladılır
- [ ] `POST /api/services/9router/stop` 200 və `state: "stopped"` qaytarır
- [ ] `GET /api/services/9router/logs?tail=50` son sətirləri ehtiva edən `snapshot` hadisəsi ilə SSE axını qaytarır
- [ ] PATH-də `npm` olmayan mühitdə quraşdırma 500 və istifadəçi üçün aydın (stack trace olmayan) xəta mesajı qaytarır

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` 2 dəqiqədən az müddətdə 200 qaytarır
- [ ] `POST /api/services/cliproxy/start` 30 saniyədən az müddətdə 200 və `state: "running"` qaytarır
- [ ] `GET /api/services/cliproxy/status` `health: "healthy"` bildirir
- [ ] `POST /api/services/cliproxy/stop` 200 və `state: "stopped"` qaytarır
- [ ] `GET /api/services/cliproxy/logs?tail=50` SSE axını qaytarır

### Təhlükəsizlik reqressiyası

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` `403 LOCAL_ONLY` qaytarır
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` `403 LOCAL_ONLY` qaytarır
- [ ] `/api/services/*` ünvanından qaytarılan xəta cavablarında `err.stack` və ya mütləq fayl yolları yoxdur

## v3.8.0+ yoxlamaları

İstənilən v3.8.x buraxılışını yayımlamazdan əvvəl aşağıdakı əlavə bəndləri yoxlayın:

- [ ] `omniroute --tray` macOS-da yüklənir (`systray2` `~/.omniroute/runtime/` qovluğuna quraşdırılıb)
- [ ] `omniroute --tray` Linux-da yüklənir (`DISPLAY` tələb olunur; təyin edilmədikdə bunu düzgün şəkildə bildirir)
- [ ] `omniroute --tray` Windows-da yüklənir (PowerShell NotifyIcon, əlavə ikilik fayllar olmadan)
- [ ] `omniroute config tray enable` avtomatik başladılma qeydini yaradır; `disable` onu silir
- [ ] `npm install -g omniroute@<this-version>` fatal xəta ilə dayanmadan postinstall mərhələsini icra edir
- [ ] Yeniləmə yolu optional asılılıqları saxlayır: `omniroute update --apply` və avtomatik yeniləyici
      `npm install -g … --include=optional` icra edir ki, `optionalDependencies` (`better-sqlite3`,
      `keytar`, `tls-client` və llmlingua SLM steki: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) yeniləmədən sonra qorunsun. Ultra `modelPath` SLM səviyyəsinə həmçinin
      tinybert modeli lazımdır; bu model ilk istifadədə `${DATA_DIR}/models/llmlingua` qovluğuna avtomatik yüklənir. Postinstall
      (`scripts/build/colocateOptionals.mjs`) daha sonra SLM optional closure-ını
      `dist/node_modules` qovluğuna birgə yerləşdirir ki, worker `@huggingface/transformers` ^4.2.0
      nümunəsinin YALNIZ BİR variantını həll etsin — standalone trace paketləri yalnız transformers-i, dinamik idxal edilən
      optional komponentləri deyil, paketləyir; buna görə worker llmlingua-2-ni root-un transformers-i ilə yükləyərdi
      və SLM səviyyəsi səssiz şəkildə fail-open vəziyyətinə keçərdi.
- [ ] `omniroute status` `.env` olmadan işləyir (CLI token yolu, yalnız loopback)
- [ ] `curl http://localhost:20128/api/shutdown` 401 qaytarır (həmişə qorunan marşrut)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` 401 qaytarır (loopback qoruması)
- [ ] İlk işə salınmada SQLite runtime `bundled` olaraq həll edilir (paketlənmiş ikilik fayl platforma üçün etibarlıdır)
- [ ] `node_modules/better-sqlite3` silindikdə SQLite runtime `runtime`-a keçir
- [ ] Smart MCP filter real `playwright-mcp browser_snapshot` çıxışını sıxışdırır (≥50% azalma)
- [ ] Bütün 10 `skills/omniroute*/SKILL.md` faylı raw GitHub URL-i vasitəsilə açıq şəkildə əldə edilə bilir
- [ ] İlk quraşdırmada onboarding wizard "How It Works" səviyyə turu addımını göstərir
- [ ] Əsas panelin səviyyə əhatəsi vidceti konfiqurasiya edilmiş/aktiv sayları göstərir

---

## 3.9.0 LTS kəsmə (3.8.58-də məşq edilmişdir)

v3.8.59-dan sonra növbəti versiya 3.9.0-dır və onun ucu iki uzunömürlü budaq olur: `stable/v3` (v3 LTS xətti, npm `latest`) və `develop` (v4, 4.0.0-a çatdı, npm `nightly`). branch/channel modeli, irəli port və etiketlər [RELEASE_STRATEGY.md-](./RELEASE_STRATEGY.md) dədir; plan [ROADMAP](../../ROADMAP.md) dadır (Mərhələ 3). Kəsmə bir dəfə aparılır; 3.8.58 çəngəldə başdan sona məşq edir və 3.8.59 [GO/NO-GO yoxlama siyahısı](./LTS_GO_NO_GO.md) ilə bağlanır.

### Dry run (yalnız oxumaq üçün, istənilən vaxt təhlükəsizdir)

```bash
npm run release:dry-run-lts-cut                       # the real cut: 3.9.0 from HEAD, previous tag v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # pin the source commit
```

`scripts/release/dry-run-lts-cut.mjs` executes nothing: it reads git and `gh` and prints the whole sequence — preconditions (source resolves, the source repository has full history — a shallow clone cannot push `stable/v3`, the receiving side rejects the pack at the first grafted parent, so cut from a full clone or `git fetch --unshallow origin` first — previous tag exists, `package.json` is the target version, a `release-freeze` issue is open, no open `Release branch not green` issue on an existing release branch — a branch that does not exist reports `?` unknown, never green — omni-queue lands the release PRs (G11: `config/merge-queue/config.json` valid, its `bases` manage the release branch, `mode` `live`, its label exists), the `release/*` ruleset still blocks deletion and force-push, and `stable/v3` and `develop` do not exist yet), the two branch steps, which dormant-workflow triggers and `if:` conditions turn true (and which stay gated by a repository variable or pinned to the canonical repository), the expected dist-tags (`latest` → 3.9.0, `next` and `nightly` empty) and the rollback. Exit `0` = `RESULT: READY`, `1` = a blocking precondition failed (`✗`), `2` = usage error. `--advisory <id,...>` downgrades a check to a warning (`!`) without hiding it.

3.9.0 buraxılışının dondurulması hələ də açıq — real kəsmənin quru işini həyata keçirin.

### 3.8.58 məşq (yalnız çəngəl)

```bash
# 1. Dry-run on the current tip with rehearsal parameters
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Execute against a FORK remote (origin, or any remote whose URL is the canonical
#    repository, is refused; every step asks for confirmation on the terminal)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Exercise the dormant workflows in the fork (workflow_dispatch where the dry-run
#    reports a canonical-repository pin), then roll back
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

İnkişaf etmə öhdəliyi git santexnika ilə qurulur (heç bir işləyən ağaca toxunulmur) və dövrə açıq öhdəliyi ilə eyni beş faylı vurur: `package.json`, `open-sse/package.json`, `electron/package.json`, `package-lock.json` və `docs/openapi.yaml`. `[4.0.0]` CHANGELOG bölməsi və onun i18n güzgüləri `develop` -də daha sonra, ilk PR dən əvvəl açılır. Skript heç vaxt npm dist-teqlərini dəyişmir — skretch paketindəkiləri təkrarlayır.

### PR önizləmə artefaktı (bir dəfə qurun, eyni baytları təşviq edin)

`.github/workflows/preview-artifact.yml` PR başlığından bir istehsal tarball qurur və bu dəqiq quruluşu təsdiqləyir (#8084 dilimi (a)). Yalnız eyni depo PRs ; heç nə dərc olunmur.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # or add the `preview-artifact` label
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo cheaper-inference/OmniRoute
npm install -g ./omniroute-*.tgz                          # preview install
```

Qaçış `npm ci`, `npm run build:release`, `npm run check:pack-artifact` edir, tarballu yığır, `npm run check:pack-boot` (saxta sirlər, efemer data direktoru) işlədir, yenidən paketlənir və həzm eyni olmadıqda uğursuz olur, sonra `artifact-identity.json` qeyd edir (head SHA, base SHA, lockfile build , ABI, buckfile arch , nodez , buzzler — `scripts/release/artifact-identity.mjs`) və ayrıca işdə tarballu təsdiqləyir. Önizləməni təşviq etmək həmin tarballu quraşdırmaq deməkdir: heç vaxt mənbədən yenidən qurmayın.

### Kəsmə (3.9.0, GO dan sonra)

1. GO [LTS_GO_NO_GO-da qeydə alınmışdır .md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` `RESULT: READY` çap edir.
3. Əmrləri ilə əl ilə `origin` -da budaqlar yaradın — skript `origin`-ə basmaqdan imtina edir. Nəzərdən keçirilmiş inkişaf öhdəliyindən təkrar istifadə etmək üçün əvvəlcə 3.9.0 ucunda `--execute` məşqini çəngəlinizə qarşı aparın; SHAs hər ikisini çap edir və eyni öhdəliklər itələnə bilər:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. İlk PR yerlərindən əvvəl `stable/v3` və `develop` (qaydalar + birləşmə növbəsi) qoruyun.
5. Fasiləsiz iş axınları filialın mövcudluğuna görə işə düşür: `forward-port.yml` ( `stable/v3`-ə təkan), `validate-stable-pr.yml` (PRs to `stable/v3`) və `nightly-v4-build.yml` ( `develop` qurur). Canlı yayıma başlamazdan əvvəl, `secrets.FORWARD_PORT_TOKEN` repozitoriya sirrini təyin edin (beləliklə, CI irəli port PRs üzərində işləyir); sahibi `vars.NIGHTLY_PUBLISH` repozitor dəyişənini `true` -ə təyin edənə və npm Trusted Publishing `nightly-v4-build.yml` qəbul edənə qədər gecə nəşriyyatı qeyri-aktiv qalır. Kanalın həlli `scripts/release/dist-tag.mjs`, eyni həlledici `npm-publish.yml` istifadə edir.
6. Kanalları yoxlayın: `npm view omniroute dist-tags --json` `latest` = 3.9.0-ı göstərir və v4 dərc olunana qədər `next` / `nightly` yoxdur.
7. Lazım gələrsə, geri qaytarma: `git push origin --delete refs/heads/stable/v3 refs/heads/develop` və `npm dist-tag add omniroute@3.8.59 latest`.

---

## Geri qaytarma

Buraxılışda kritik problem varsa:

1. `gh release edit vX.Y.Z --prerelease` (ən son buraxılış kimi işarələnməsin)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (yalnız istifadəçilər tərəfindən hələ qəbul edilməyibsə)
3. Və ya: `release/vX.Y.0` üzərində hotfix → patch buraxılışı `vX.Y.(Z+1)`
4. GitHub Discussions və Discord-da dərhal məlumat verin

## Sərt qaydalar

- Heç vaxt birbaşa `main` budağına commit etməyin
- Heç vaxt `main` və ya `release/*` budaqlarında `git push --force` istifadə etməyin
- Heç vaxt Husky hook-larını (`--no-verify`) ötürməyin
- Heç vaxt məxfi məlumatları, giriş məlumatlarını və ya `.env` fayllarını commit etməyin
- Coverage ≥60/60/60/60 səviyyəsində qalmalıdır (ifadələr/sətirlər/funksiyalar/budaqlar)
- `src/`, `open-sse/`, `electron/` və ya `bin/` daxilində production kodunu dəyişdirərkən həmişə testlər əlavə edin və ya mövcud testləri yeniləyin

## Avtomatlaşdırılmış sinxronizasiya yoxlaması

PR açmazdan əvvəl sənədlərin sinxronizasiya qoruyucusunu lokal olaraq işə salın:

```bash
npm run check:docs-sync
```

CI bu yoxlamanı `.github/workflows/ci.yml` faylında da işə salır (lint işi).
