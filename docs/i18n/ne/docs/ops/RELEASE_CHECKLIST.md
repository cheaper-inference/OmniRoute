# Release Checklist (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **अन्तिम अद्यावधिक:** 2026-08-28 — v3.8.51
> स्वचालनका लागि Claude Code skills प्रयोग गर्ने सुव्यवस्थित release flow।
>
> **Release हरूबीच queue/branch लाई green राख्नुहोस्:** [RELEASE_GREEN.md](./RELEASE_GREEN.md) हेर्नुहोस्
> (`/green-prs` family + `npm run check:release-green` + `/babysit` + nightly)।
> यो आवधिक रूपमा — र विशेषगरी **यो checklist अघि** — चलाउँदा release PR green अवस्थाबाट सुरु हुन्छ।

## संक्षेपमा

```bash
# 1. संस्करण बढाउनुहोस् + CHANGELOG उत्पन्न गर्नुहोस् (skill)
/version-bump-cc patch    # वा minor/major

# 2. स्थानीय रूपमा quality gate चलाउनुहोस्
npm run check              # lint + tests
npm run test:coverage      # पूर्ण coverage gate (60/60/60/60)

# 3. Build र smoke
npm run build
npm run test:e2e           # वैकल्पिक, तर सिफारिस गरिएको

# 4. Release उत्पन्न गर्नुहोस् (skill)
/generate-release-cc

# 5. Deploy गर्नुहोस् (skill)
/deploy-vps-both-cc        # वा akamai-cc / local-cc

# 6. Release evidences सङ्कलन गर्नुहोस् (skill)
/capture-release-evidences-cc
```

## npm Trusted Publishing (v3.8.51 देखि default) — अनुरोधमा staged, fallback का रूपमा direct

`npm-publish.yml` ले default रूपमा **npm Trusted Publishing (OIDC)** मार्फत publish गर्छ:
`stage-npm` job (github-hosted) ले त्यस run का लागि GitHub को id-token लाई अल्पकालीन npm
credential मा exchange गर्छ — repository secrets मा कुनै दीर्घकालीन npm token हुँदैन, 2FA prompt हुँदैन, र provenance संलग्न हुन्छ।
यो अहिले 2FA लाई bypass गर्ने tokens हटाइँदै गर्दा npm sanctions लाई bypass गर्ने उपाय हो;
यसले WS1.3 guarantee कायम राख्दै project मा v3.8.48 सम्म रहेको पूर्ण स्वचालित flow पुनर्स्थापित गर्छ
(लिक भएको token ले मात्र publish गर्न सक्दैन — token नै हुँदैन)।

**एकपटकको setup (owner):** npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none)। यो setup नभएसम्म automatic step `ENEEDAUTH` सहित fail हुन्छ:
`publish_mode=staged` (तल) वा `direct` प्रयोग गरेर पुनः dispatch गर्नुहोस्।

### Staged publishing (अनुरोधमा — `publish_mode=staged`)

npm-publish workflow ले अब सिधै publish गर्दैन: यसले packed tarball
(`check:pack-boot`) boot गर्छ र त्यसपछि `npm stage publish` चलाउँछ — ठ्याक्कै ती bytes
registry मा राखिन्छन्, **owner ले approve नगरेसम्म install गर्न मिल्दैन**। Human 2FA gate
proof अघि होइन, **proof पछि** सारिएको छ।

**Workflow green भएपछि owner को flow:**

1. `npm stage list omniroute` — stage id पत्ता लगाउनुहोस् (workflow summary मा पनि देखाइन्छ)।
2. Staged bytes verify गर्नुहोस् (सिफारिस गरिएको): `npm stage download <id>` चलाउनुहोस्, त्यसपछि
   downloaded tarball लाई temporary prefix मा install गरी boot गर्नुहोस्
   (`npm run check:pack-boot` ले CI मा यही pack→install→boot verdict स्वचालित गर्छ)।
3. `npm stage approve <id>` — 2FA prompt नै publish हो। `npm stage reject <id>` ले यसलाई discard गर्छ।
4. Publish पछिको net: post-publish verifier (v3.8.49 plan को WS1.4) ले
   public registry बाट प्रकाशित version लाई clean container मा install गरी boot गर्छ।

**आपत्कालीन fallback:** `workflow_dispatch` मा `publish_mode=direct` प्रयोग गर्दा
legacy तत्काल `npm publish` पुनर्स्थापित हुन्छ (staging आफैंले गलत व्यवहार गरेमा मात्र प्रयोग गर्नुहोस्; कारण अभिलेख गर्नुहोस्)।

**एकपटकको hardening (owner, npmjs.com):** `omniroute` का लागि Trusted Publisher लाई
stage-only mode मा configure गर्नुहोस्, ताकि लिक भएको दीर्घकालीन token ले कतैबाट पनि
`npm publish` सिधै गर्न नसकोस् — CI ले केवल stage गर्न सक्छ; owner को 2FA ले मात्र release गर्छ।

**Broken-artifact playbook (अपरिवर्तित):** default reflex का रूपमा
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"` प्रयोग गर्नुहोस्
(मिनेटमै हुन्छ, reversible); `npm unpublish` लाई 72h/no-dependents window भित्र मात्र
प्रयोग गर्नुहोस् र पहिलो कदमका रूपमा कहिल्यै नगर्नुहोस्। Docker मा version tag कहिल्यै rewrite नगर्नुहोस् —
rollback भनेको `latest` लाई अन्तिम राम्रो digest मा repoint गर्नु हो।

**Docker Hub `latest` (हरेक stable SemVer publish मा आवश्यक):** `docker-publish` workflow ले
**दुवै** `X.Y.Z` र, `should-promote-latest.sh` ले यो सबैभन्दा उच्च stable SemVer भएको सहमति जनाएमा,
उही digest सहित `:latest` tag गर्नुपर्छ। Job पछि: Hub `latest` digest नयाँ SemVer digest बराबर हुनुपर्छ
र `last_updated` पनि अघि बढेको हुनुपर्छ। Release notes मा git मा मात्र भएका fixes को कुरा भइरहँदा
`:latest` लाई पुरानो build मा नराख्नुहोस्। Compose quickstarts ले `:latest` प्रयोग गर्छन्;
GitOps ले `X.Y.Z` मा pin गरिरहनुपर्छ। [Docker release channels](../guides/DOCKER_GUIDE.md#release-channels)
र #10317 हेर्नुहोस्।

**Docker Hub organization repository (`cheaperinference/omniroute`):** Docker Hub ले
repository लाई namespaces बीच सार्न सक्दैन, त्यसैले `diegosouzapw/omniroute` ले आफ्नो pull history
र हरेक release कायम राख्छ, र `docker-publish` को `mirror-org-dockerhub` job ले प्रत्येक released
version (र promote गरिएको बेला `:latest`) लाई `ghcr.io/cheaper-inference/omniroute` बाट
organization repository मा copy गर्छ। यसका लागि `DOCKERHUB_ORG_USERNAME` /
`DOCKERHUB_ORG_TOKEN` secrets आवश्यक छन्; ती नभए job "Docker Hub org
mirror skipped" warning सहित green रहन्छ र अन्य registries ले सामान्य रूपमा publish गर्छन्।
पछि released version publish गर्न **Actions → Mirror Docker image to the Docker Hub org → Run
workflow** चलाउनुहोस्, `version=X.Y.Z` (र सबैभन्दा उच्च stable version का लागि
`promote_latest`) सहित: यसले existing images copy गर्छ, rebuild गर्दैन।

## Hotfix Fast-Lane (लेबल `hotfix`)

`hotfix` लेबल गरिएको PR ले भारी CI म्याट्रिक्स (9-shard E2E, coverage ratchet,
quality-gate, quality-extended) लाई छोड्छ र तीव्र, उच्च-संकेत भएका गेटहरू कायम राख्छ: build,
unit shards, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
र tarball boot-smoke (`check:pack-boot`)। लक्ष्य: लगभग 33 मिनेटको सट्टा ≤15 मिनेटमा सफल हुनु।

**प्रवेश नीति — चारै वटा आवश्यक छन् (Chromium/VS Code/Node का आपत्कालीन लेनहरूमा आधारित):**

1. **गम्भीरता**: production बिग्रिएको छ — प्रकाशित artifact boot हुँदा crash हुन्छ / सुरक्षा सुधार आवश्यक छ / release का प्रत्येक प्रयोगकर्ता प्रभावित छन्। "महत्त्वपूर्ण" भनेको "बिग्रिएको" होइन।
2. **अधिकार**: repository owner ले मात्र `hotfix` लेबल लागू गर्छ। लेबल नै स्वीकृति हो — campaign PR मा कहिल्यै स्वयं लागू नगर्नुहोस्।
3. **प्रमाण**: PR body मा अघिल्लो पूर्ण रूपमा सफल heavy run (छोडिने jobs ले पुनः प्रमाणीकरण गर्ने suite) र fix को आफ्नै असफल-त्यसपछि-सफल test का लिङ्कहरू हुनुपर्छ।
4. **दायरा**: cherry-pick-only — न्यूनतम fix मात्र, refactors वा ride-alongs होइन।

छोडिएको coverage/ratchet surface लाई release branch मा हुने अर्को पूर्ण run (continuous release-green) ले पुनः प्रमाणीकरण गर्छ — यो लेनले WAITING लाई मात्र छोड्छ, validation लाई होइन।
Tests-only diffs (सबै files `tests/` अन्तर्गत र `tests/e2e/` अन्तर्गत कुनै पनि नभएका) ले कुनै label बिना नै E2E matrix स्वतः छोड्छन्।

## विस्तृत Checklist

### Release-पूर्व

- [ ] यस release लाई लक्षित गरेका सबै PR हरू `release/vX.Y.0` मा merge गरिएका छन्
- [ ] यस version का सबै खुला Linear/issue items बन्द गरिएका छन् वा अर्को milestone मा सारिएका छन्
- [ ] `release/vX.Y.0` branch मा CI सफल छ
- [ ] Code मा कुनै `TODO(release)` markers छैनन्: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker base image अद्यावधिक छ (हाल `node:24.15.0-trixie-slim`)

### Version र Changelog

- [ ] `/version-bump-cc <patch|minor|major>` चलाउनुहोस् (Claude Code skill)
  - `package.json`, `electron/package.json` मा version बढाउँछ
  - अघिल्लो tag पछिका git commits बाट `CHANGELOG.md` पुनः निर्माण गर्छ
  - README.md badges अद्यावधिक गर्छ
- [ ] `CHANGELOG.md` को म्यानुअल समीक्षा गर्नुहोस् र आवश्यक भए commit messages सफा गर्नुहोस्
- [ ] `CHANGELOG.md` को सबैभन्दा नयाँ semver section `package.json` version सँग बराबर छ भनी सुनिश्चित गर्नुहोस्
- [ ] आगामी कामका लागि `## [Unreleased]` लाई पहिलो changelog section का रूपमा राख्नुहोस्
- [ ] `docs/openapi.yaml` → `info.version` `package.json` version सँग बराबर हुनुपर्छ

### Code Quality

- [ ] `npm run lint` — 0 errors (warnings पहिलेदेखिका हुन्)
- [ ] `npm run typecheck:core` — स्वच्छ
- [ ] `npm run typecheck:noimplicit:core` — स्वच्छ (strict)
- [ ] `npm run check:cycles:ratchet` — frozen `metrics.cycles` ceiling भित्र (साधारण `check:cycles` कुनै पनि cycle मा 1 exit गर्छ, #15281)
- [ ] `npm run check:any-budget:t11` — budget भित्र
- [ ] `npm run check:route-validation:t06` — स्वच्छ
- [ ] `npm run check:node-runtime` — supported runtime floor पूरा भएको छ (`>=22.22.2 <23`, `>=24.0.0 <27`, `src/shared/utils/nodeRuntimeSupport.ts` मा रहेको `SUPPORTED_NODE_RANGE` अनुसार; `package.json` को `engines` सँग aligned)

### Testing

- [ ] `npm run test:unit` — सफल
- [ ] `npm run test:vitest` — सफल (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — gate 60/60/60/60 पूरा (statements/lines/functions/branches)
- [ ] `npm run test:integration` — सफल (परिवर्तनले DB / handlers छोएमा)
- [ ] `npm run test:combo:matrix` — सफल (combo strategy matrix: सबै 22 public routing strategies का selection decisions deterministic रूपमा प्रमाणित गर्छ; combo routing, strategy resolution, वा fallback logic मा परिवर्तन गर्दा चलाउनुहोस्)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **वैकल्पिक/manual** (gated real-upstream smoke; VPS `root@192.168.0.15` बाट read-only DB snapshot source गर्छ; वास्तविक providers मा request पठाउँछ, credits खर्च हुन्छ; CI मा कहिल्यै चल्दैन; gate बिना स्वच्छ रूपमा skip हुन्छ)
- [ ] `npm run test:combo:live:vps` — **वैकल्पिक/manual** (Phase-3 VPS live smoke: plain Node ESM मार्फत live `.15` server विरुद्ध 7 HTTP scenarios; `ssh root@192.168.0.15` आवश्यक; `__live_test__*` combos मात्र create/delete गर्छ; वास्तविक providers मा request पठाउँछ; CI मा कहिल्यै चल्दैन)
- [ ] `npm run test:e2e` — सफल (UI परिवर्तनहरू)
- [ ] `npm run test:protocols:e2e` — सफल (MCP/A2A परिवर्तनहरू)
- [ ] `npm run test:ecosystem` — सफल

### Hooks (Husky validated)

Husky hooks `.husky/` मा हुन्छन् र git operations मा स्वचालित रूपमा चल्छन्।

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** तीव्र deterministic gates — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (2026-06-13 मा सक्रिय गरिएको)। जानाजानी `test:unit` हटाइएको छ (ढिलो; CI को `test-unit` job ले समेट्छ)।
  - Release branches push गर्नुअघि `npm run test:unit` म्यानुअल रूपमा चलाउनुहोस्।

यदि कुनै hook असफल भयो भने: मूल समस्या समाधान गर्नुहोस्, `--no-verify` प्रयोग गरेर bypass नगर्नुहोस्।

### Conventional Commits

Release-bound सबै commits ले `type(scope): subject` format पालना गर्नुपर्छ।

**मान्य types:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**मान्य scopes:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Breaking changes: `BREAKING CHANGE:` footer वा scope पछि `!` थप्नुहोस् (जस्तै `feat(api)!: drop /v0`)।

### Documentation

- [ ] `npm run check:docs-sync` सफल हुन्छ (pre-commit द्वारा स्वचालित रूपमा चलाइन्छ)
- [ ] `npm run check:docs-all` सफल हुन्छ (समग्र: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` ले 0 मा exit गर्छ — code ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env contract अक्षुण्ण छ
- [ ] `npm run check:doc-links` ले 0 मा exit गर्छ — पुनर्संरचनापछि कुनै टुटेका आन्तरिक markdown सन्दर्भहरू छैनन्
- [ ] `docs/architecture/ARCHITECTURE.md` लाई storage/runtime drift का लागि समीक्षा गरिएको छ
- [ ] `docs/guides/TROUBLESHOOTING.md` लाई env var र operational drift का लागि समीक्षा गरिएको छ
- [ ] `.env.example` परिवर्तन गरिएको भए: `docs/reference/ENVIRONMENT.md` अद्यावधिक गरिएको छ
- [ ] नयाँ सुविधामा UI भए: `docs/guides/USER_GUIDE.md` मा यसको उल्लेख छ
- [ ] नयाँ सुविधामा API भए: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` अद्यावधिक गरिएको छ
- [ ] नयाँ सुविधा module भए: समर्पित `docs/<MODULE>.md` अवस्थित छ
- [ ] breaking change भए: `docs/guides/TROUBLESHOOTING.md` मा migration note छ

### i18n

- [ ] `npm run i18n:check` ले 0 मा exit गर्छ — अनुवाद अवस्था (`.i18n-state.json`) स्रोत docs सँग sync मा छ (strict mode मा drift भएका स्रोतहरू छैनन्; warn-mode advisory अन्तिम समयमा गरिएका doc touch-ups का लागि स्वीकार्य छ, तर tagging अघि 0 हुनुपर्छ)
- [ ] `npm run i18n:check-ui-coverage` ले 0 मा exit गर्छ — प्रत्येक UI locale कम्तीमा 80% coverage floor मा वा त्यसभन्दा माथि छ
- [ ] `npm run i18n:sync-ui:dry` ले सबै 66 target locales मा 0 missing keys रिपोर्ट गर्छ (`en` स्रोतबाहेक प्रत्येक locale)
- [ ] स्रोत English docs परिवर्तन भएका भए, tagging अघि `npm run i18n:run` चलाउनुहोस् (`.env` मा `OMNIROUTE_TRANSLATION_API_KEY` आवश्यक हुन्छ)
- [ ] अनुवाद योगदानहरू minor भए अर्को release सम्म स्थगित गर्न सकिन्छ (CHANGELOG मा track गर्नुहोस्)

### Database Migrations

- [ ] `src/lib/db/migrations/` मा नयाँ फाइलहरू भए:
  - [ ] प्रत्येक migration idempotent छ (`CREATE TABLE IF NOT EXISTS`, आदि)
  - [ ] Migrations transactions भित्र wrap गरिएका छन्
  - [ ] सही रूपमा नम्बर गरिएको छ (sequence मा कुनै gap छैन)
- [ ] नयाँ install मा परीक्षण गर्नुहोस्: `~/.omniroute/omniroute.db` हटाएर `npm run dev` चलाउनुहोस्
- [ ] विद्यमान install मा परीक्षण गर्नुहोस्: DB को backup लिएर migration चलाउनुहोस्, schema प्रमाणित गर्नुहोस्
- [ ] migration ले tables पुनर्लेखन गर्दा WAL files (`-wal`, `-shm`) सही रूपमा सम्हालिएका छन्

### Provider Catalog (Zod-validated)

- [ ] `src/shared/constants/providers.ts` Zod schema load time मा मान्य छ
  - [ ] सबै providers सँग आवश्यक fields (`id`, `label`, `kind`, आदि) छन्
  - [ ] नयाँ free providers का लागि `freeNote` प्रदान गरिएको छ
  - [ ] OAuth providers का लागि `src/lib/oauth/constants/oauth.ts` मा `oauthConfig` दर्ता गरिएको छ
- [ ] नयाँ provider थपिएको भए: `open-sse/executors/` मा सम्बन्धित executor छ
- [ ] non-OpenAI format भए: `open-sse/translator/` मा translator छ
- [ ] Models `open-sse/config/providerRegistry.ts` मा दर्ता गरिएका छन्
- [ ] `tests/unit/` मा provider classification र routing समेट्ने unit tests छन्

### Desktop (Electron)

`electron/` परिवर्तन गरिएको भए:

- [ ] `npm run electron:smoke:packaged` सफल हुन्छ
- [ ] कम्तीमा यीमध्ये एउटाका लागि builds परीक्षण गरिएका छन्: `:win`, `:mac`, `:linux`
- [ ] Code signing certs म्याद नाघेका छैनन् (signing गरिएमा)
- [ ] `electron/package.json` को version root `package.json` सँग मेल खान्छ
- [ ] `stable` मा release गर्दै भए auto-update channel pointer अद्यावधिक गरिएको छ

### Build Layout

Repository ले तीनवटा छुट्टाछुट्टै output directories प्रयोग गर्छ — तिनलाई कहिल्यै नमिसाउनुहोस्:

| Directory | Purpose                                                      | Tracked?        |
| --------- | ------------------------------------------------------------ | --------------- |
| `src/`    | Application source (TypeScript / TSX)                        | Yes             |
| `.build/` | Build intermediates — `next build` output (`distDir`)        | No (gitignored) |
| `dist/`   | Shippable npm bundle — `assembleStandalone` द्वारा assembled | No (gitignored) |

> **Operator note:** remote VPS image directory अझै `/usr/lib/node_modules/omniroute/app/` नै रहन्छ।
> केवल **in-repo** build output मात्र (`app/` → `dist/`) सारिएको हो। Deploy skills ले
> `dist/` का contents लाई remote `app/` dir मा rsync गर्छन् — VPS path मा कुनै परिवर्तन आवश्यक छैन।

**Single-build flow:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Deploy का लागि `npm run build` पछि छुट्टै `npm run build:cli` नचलाउनुहोस् — एउटै command मा clean rebuild + sentinel गर्ने `npm run build:release` प्रयोग गर्नुहोस्।

### Artifact Validation

- [ ] `npm run build:release` सफल हुन्छ र `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` clean छ — `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, वा अन्य local residue छैन
- [ ] build पछि `dist/server.js` अवस्थित छ
- [ ] वैकल्पिक local packaged-runtime smoke: `npm run dev:candidate -- build` पछि `npm run dev:candidate -- validate` चलाउँदा packed tarball लाई isolated `DATA_DIR` मा boot गर्छ र `/api/health` + `/v1/models` जाँच गर्छ ([Contribution Golden Path](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) हेर्नुहोस्)

### Tagging & Release

- [ ] `/generate-release-cc` (Claude Code skill) चलाउनुहोस्:
  - `vX.Y.Z` tag सिर्जना गर्छ
  - tag र branch push गर्छ
  - changelog body सहित GitHub Release खोल्छ
  - Electron installers attach गर्छ (build गरिएको भए)
- [ ] वा manually:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deploy

Deploy skills ले light rsync flow प्रयोग गर्छन् — `npm pack` छैन, `npm i -g` छैन:

- [ ] लक्ष्यसँग मिल्ने deploy skill प्रयोग गर्नुहोस्:
  - `/deploy-vps-local-cc` — स्थानीय VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — दुवै
- [ ] Deploy गर्नुअघि `dist/BUILD_SHA` == `git rev-parse --short HEAD` पुष्टि गर्नुहोस्
- [ ] Build `node_modules` वास्तविक भएको स्थानमा चल्नुपर्छ (मुख्य checkout वा `npm ci` गरिएको worktree — symlink गरिएको worktree होइन)
- [ ] Deploy गरिएको instance को smoke test गर्नुहोस्:
  - `/dashboard/health` खोल्नुहोस् → version string ले release सँग मेल खान्छ कि जाँच गर्नुहोस्
  - परिचित provider विरुद्ध `/v1/chat/completions` अनुरोध चलाउनुहोस्
  - `/api/monitoring/health` ले `CLOSED` circuit breakers फर्काउँछ कि पुष्टि गर्नुहोस्
  - MCP transports ले प्रतिक्रिया दिन्छन् कि पुष्टि गर्नुहोस् (`/mcp` HTTP, `/mcp-sse` SSE)

### Release पछाडि

- [ ] `/capture-release-evidences-cc` चलाउनुहोस् (Claude Code skill)
  - नयाँ सुविधाहरूका WebP screenshots/recordings खिच्छ
  - Release notes / blog post मा संलग्न गर्छ
- [ ] Release announcement सहित GitHub Discussions / Discord अपडेट गर्नुहोस्
- [ ] अर्को version का लागि milestone खोल्नुहोस्
- [ ] यदि critical छ भने: discussion pin गर्नुहोस् वा in-app banner का लागि `news.json` मा post गर्नुहोस्

### Radar सार्वजनिक-प्रक्षेपण gate

Radar announcement जानाजानी `active: false` सहित commit गरिएको छ। तलका प्रत्येक item को प्रमाण संकलन भएपछि मात्र activation का लागि छुट्टै
change गर्नुपर्छ:

- [ ] सबै stacked Radar PR हरू merge भएका छन् र release-tip CI हरियो छ
- [ ] `RADAR_ENABLED` पूर्वनिर्धारित रूपमा अझै off राखेर OSS Radar routes deploy र smoke test गर्नुहोस्
- [ ] नामित Radar host मा `GET /planos`, `/termos`, `/privacidade`, र `/reembolso` को smoke test गर्नुहोस्
- [ ] private service मा operator identity/contact/address र owner-approved legal review रेकर्ड गर्नुहोस्
- [ ] test mode मा मात्र Stripe Checkout र signed webhook प्रयोग गरेर जाँच गर्नुहोस्
- [ ] approved sender/domain प्रयोग गरी एउटा encrypted transactional-email delivery प्रयोग गरेर जाँच गर्नुहोस्
- [ ] backup restore र एउटा supervised, budget-capped research run प्रमाणित गर्नुहोस्
- [ ] donation evidence स्वीकार गर्नुअघि BRL/PIX review policy अनुमोदन गर्नुहोस्
- [ ] अघिल्ला gate हरू पूरा भएपछि मात्र public Checkout सक्षम गर्नुहोस्, त्यसपछि नयाँ `news.json` ID सक्रिय गर्नुहोस्
- [ ] Home banner ले localized copy प्रयोग गर्छ र पुरानो ID dismiss गरेपछि नयाँ ID पुनः देखा पर्छ कि पुष्टि गर्नुहोस्

## एम्बेडेड सेवाहरूको smoke (v3.8.4+)

एम्बेडेड सेवासम्बन्धी परिवर्तनहरू समावेश भएको कुनै पनि रिलिज पठाउनुअघि, निम्न कुराहरू जाँच गर्नुहोस्:

### नयाँ DB बुट (माइग्रेसन collision पत्ता लगाउँछ — v3.8.4 hotfix पछि थपिएको)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — बुट हुन 10 s पर्खनुहोस्
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` ले `"9router"` फर्काउँछ (404 होइन, 500 पनि होइन)। यसले माइग्रेसन `071_services.sql` लागू भएको र row seed भएको पुष्टि गर्छ।
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` ले 3 वटा row फर्काउँछ।
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` ले 2 वटा row फर्काउँछ (`070_webhooks_kind_metadata.sql` लागू भएको प्रमाणीकरण गर्छ)।
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` सफल हुन्छ — भविष्यका collision विरुद्ध सुरक्षा गर्छ।

### 9Router

- [ ] `POST /api/services/9router/install` ले 2 मिनेटभित्र `installedVersion` सहित 200 फर्काउँछ
- [ ] `POST /api/services/9router/start` ले 30 s भित्र 200 र `state: "running"` फर्काउँछ
- [ ] `GET /api/services/9router/status` ले `health: "healthy"` रिपोर्ट गर्छ
- [ ] `"model": "9router/auto/..."` सहितको `POST /v1/chat/completions` ले 200 फर्काउँछ (9Router मार्फत end-to-end routing)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` ले proxy भित्र 9Router को native UI render गर्छ (प्रत्यक्ष `127.0.0.1:port` iframe होइन)
- [ ] `POST /api/services/9router/rotate-key` ले `{ keyRotated: true }` फर्काउँछ र सेवा सफा रूपमा पुनः सुरु हुन्छ
- [ ] `POST /api/services/9router/stop` ले 200 र `state: "stopped"` फर्काउँछ
- [ ] `GET /api/services/9router/logs?tail=50` ले हालसालैका पङ्क्तिहरू समावेश भएको `snapshot` event सहित SSE stream फर्काउँछ
- [ ] `PATH` मा `npm` नभएको वातावरणमा install गर्दा stack trace नभएको, प्रयोगकर्तामैत्री त्रुटि सन्देशसहित 500 फर्काउँछ

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` ले 2 मिनेटभित्र 200 फर्काउँछ
- [ ] `POST /api/services/cliproxy/start` ले 30 s भित्र 200 र `state: "running"` फर्काउँछ
- [ ] `GET /api/services/cliproxy/status` ले `health: "healthy"` रिपोर्ट गर्छ
- [ ] `POST /api/services/cliproxy/stop` ले 200 र `state: "stopped"` फर्काउँछ
- [ ] `GET /api/services/cliproxy/logs?tail=50` ले SSE stream फर्काउँछ

### सुरक्षा regression

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` ले `403 LOCAL_ONLY` फर्काउँछ
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` ले `403 LOCAL_ONLY` फर्काउँछ
- [ ] `/api/services/*` का त्रुटि प्रतिक्रियाहरूमा `err.stack` वा absolute file paths हुँदैनन्

## v3.8.0+ जाँचहरू

कुनै पनि v3.8.x रिलिज पठाउनुअघि, यी अतिरिक्त कुराहरू जाँच गर्नुहोस्:

- [ ] `omniroute --tray` ले macOS मा बुट हुन्छ (`systray2` `~/.omniroute/runtime/` मा install गरिएको)
- [ ] `omniroute --tray` ले Linux मा बुट हुन्छ (`DISPLAY` आवश्यक; सेट नभए graceful error)
- [ ] `omniroute --tray` ले Windows मा बुट हुन्छ (PowerShell NotifyIcon, अतिरिक्त binary आवश्यक छैन)
- [ ] `omniroute config tray enable` ले autostart entry सिर्जना गर्छ; disable गर्दा हटाउँछ
- [ ] `npm install -g omniroute@<this-version>` ले fatal exit बिना postinstall चलाउँछ
- [ ] Update path ले optional deps सुरक्षित राख्छ: `omniroute update --apply` र auto-updater ले
      `npm install -g … --include=optional` चलाउँछन्, जसले `optionalDependencies` (better-sqlite3,
      keytar, tls-client, र llmlingua SLM stack: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) लाई update पछि पनि सुरक्षित राख्छ। ultra `modelPath` SLM tier लाई
      tinybert model पनि आवश्यक हुन्छ, जुन पहिलो प्रयोगमा `${DATA_DIR}/models/llmlingua` मा
      स्वतः download हुन्छ। त्यसपछि postinstall
      (`scripts/build/colocateOptionals.mjs`) ले SLM optional closure लाई `dist/node_modules` मा
      co-locate गर्छ, ताकि worker ले एउटै `@huggingface/transformers` ^4.2.0
      instance resolve गरोस् — standalone trace bundles ले transformers मात्र bundle गर्छन्,
      dynamically-imported optionals गर्दैनन्, त्यसैले यो बिना worker ले root को transformers
      विरुद्ध llmlingua-2 load गर्नेछ र SLM tier चुपचाप fail-open हुनेछ।
- [ ] `.env` बिना `omniroute status` काम गर्छ (CLI token path, loopback मात्र)
- [ ] `curl http://localhost:20128/api/shutdown` ले 401 फर्काउँछ (सधैं-सुरक्षित route)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` ले 401 फर्काउँछ (loopback guard)
- [ ] पहिलो run मा SQLite runtime `bundled` मा resolve हुन्छ (platform का लागि bundled binary मान्य)
- [ ] `node_modules/better-sqlite3` मेटाउँदा SQLite runtime `runtime` मा fallback हुन्छ
- [ ] Smart MCP filter ले वास्तविक `playwright-mcp browser_snapshot` output compress गर्छ (≥50% reduction)
- [ ] सबै 10 `skills/omniroute*/SKILL.md` files raw GitHub URL मार्फत सार्वजनिक रूपमा fetch गर्न सकिन्छ
- [ ] Fresh setup मा onboarding wizard ले "How It Works" tier tour step देखाउँछ
- [ ] Home dashboard को tier coverage widget ले configured/active counts देखाउँछ

---

## 3.9.0 LTS कट (3.8.58 मा पूर्वाभ्यास गरिएको)

v3.8.59 पछि अर्को संस्करण 3.9.0 हुनेछ, र यसको टिप दुई दीर्घकालीन शाखा बन्छ:
`stable/v3` (v3 LTS लाइन, npm `latest`) र `develop` (v4, 4.0.0 मा बम्प गरिएको, npm
`nightly`)। शाखा/च्यानल मोडेल, forward-port र लेबलहरू
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md) मा छन्; योजना [ROADMAP](../../ROADMAP.md) (चरण 3) मा छ। कट एकपटक मात्र चल्छ;
3.8.58 ले यसलाई फोर्कमा सुरुदेखि अन्त्यसम्म पूर्वाभ्यास गर्छ, र 3.8.59 ले
[GO/NO-GO checklist](./LTS_GO_NO_GO.md) मार्फत समापन गर्छ।

### Dry-run (पढ्न-मात्र, जुनसुकै बेला सुरक्षित)

```bash
npm run release:dry-run-lts-cut                       # वास्तविक कट: HEAD बाट 3.9.0, अघिल्लो ट्याग v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # स्रोत कमिट पिन गर्नुहोस्
```

`scripts/release/dry-run-lts-cut.mjs` ले केही पनि कार्यान्वयन गर्दैन: यसले git र `gh` पढ्छ र
पूरै क्रम प्रिन्ट गर्छ — पूर्वसर्तहरू (स्रोत resolve हुन्छ, स्रोत रिपोजिटरीमा पूर्ण इतिहास छ —
shallow clone ले `stable/v3` push गर्न सक्दैन, receiving side ले पहिलो grafted parent मै pack अस्वीकार गर्छ, त्यसैले
पूर्ण clone बाट कट गर्नुहोस् वा पहिले `git fetch --unshallow origin` चलाउनुहोस् — अघिल्लो
ट्याग अवस्थित छ, `package.json` लक्ष्य संस्करण हो, `release-freeze` issue खुला छ, अवस्थित release branch मा
खुला `Release branch not green` issue छैन
— अवस्थित नभएको शाखाले `?` अज्ञात देखाउँछ, कहिल्यै green होइन — Mergify `release` queue कन्फिगर गरिएको छ
(G11: `queue_rules`, `checks_timeout`, label `queue`), `release/*` ruleset ले अझै deletion र force-push रोक्छ,
र `stable/v3` तथा `develop` अझै अवस्थित छैनन्), दुई शाखा चरणहरू, dormant-workflow
triggers र `if:` conditions मध्ये कुन true हुन्छन् (र कुन repository variable द्वारा gated रहन्छन् वा
canonical repository मा pinned हुन्छन्), अपेक्षित dist-tags (`latest` → 3.9.0, `next` र
`nightly` खाली) र rollback। Exit `0` = `RESULT: READY`, `1` = कुनै blocking पूर्वसर्त
असफल भयो (`✗`), `2` = usage error। `--advisory <id,...>` ले कुनै जाँचलाई warning (`!`) मा
downgrade गर्छ, तर लुकाउँदैन।

3.9.0 release freeze अझै खुला रहँदा वास्तविक cut को dry-run चलाउनुहोस् — tag पछि र चरण 12c ले
freeze हटाउनुअघि शाखाहरू सिर्जना गरिन्छन्।

### 3.8.58 पूर्वाभ्यास (फोर्कमा मात्र)

```bash
# 1. पूर्वाभ्यासका प्यारामिटरहरूसहित हालको टिपमा Dry-run
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. FORK remote विरुद्ध कार्यान्वयन गर्नुहोस् (origin, वा canonical
#    repository को URL भएको कुनै पनि remote अस्वीकार गरिन्छ; प्रत्येक चरणले terminal मा पुष्टि माग्छ)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. फोर्कमा dormant workflows अभ्यास गर्नुहोस् (dry-run ले canonical-repository
#    pin रिपोर्ट गरेको ठाउँमा workflow_dispatch), त्यसपछि rollback गर्नुहोस्
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

develop bump commit git plumbing प्रयोग गरेर बनाइन्छ (working tree छोइँदैन) र cycle-open commit ले
बम्प गर्ने उही पाँच फाइलहरू बम्प गर्छ: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` र `docs/openapi.yaml`। `[4.0.0]`
CHANGELOG section र त्यसका i18n mirrors त्यसपछि `develop` मा खोलिन्छन्, यसको पहिलो
PR अघि। स्क्रिप्टले npm dist-tags कहिल्यै परिवर्तन गर्दैन — तिनको पूर्वाभ्यास scratch package मा गर्नुहोस्।

### PR preview artifact (एकपटक build गर्नुहोस्, उही bytes promote गर्नुहोस्)

`.github/workflows/preview-artifact.yml` ले PR head बाट एउटा production tarball build गर्छ र
त्यही exact build लाई validate गर्छ (#8084 slice (a))। Same-repository PR हरू मात्र; केही पनि publish हुँदैन।

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # वा `preview-artifact` label थप्नुहोस्
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # preview install
```

Run ले `npm ci`, `npm run build:release`, `npm run check:pack-artifact` चलाउँछ, tarball pack गर्छ,
`npm run check:pack-boot` चलाउँछ (नक्कली secrets, ephemeral data dir), फेरि pack गर्छ र digest
उस्तै नभए असफल हुन्छ, त्यसपछि `artifact-identity.json` रेकर्ड गर्छ (head SHA, base
SHA, lockfile hash, platform, arch, node ABI, bundler, build policy —
`scripts/release/artifact-identity.mjs`) र छुट्टै job मा tarball attest गर्छ। Preview promote गर्नु भनेको
त्यो tarball install गर्नु हो: source बाट कहिल्यै पुनः build नगर्नुहोस्।

### कट (3.9.0, GO पछि)

1. GO [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md) मा रेकर्ड गरिएको छ।
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` ले `RESULT: READY` प्रिन्ट गर्छ।
3. dry-run ले प्रिन्ट गरेका commands प्रयोग गरेर `origin` मा हातैले शाखाहरू सिर्जना गर्नुहोस् —
   स्क्रिप्टले `origin` मा push गर्न अस्वीकार गर्छ। समीक्षा गरिएको develop commit पुनः प्रयोग गर्न,
   पहिले आफ्नो फोर्कविरुद्ध 3.9.0 tip मा `--execute` rehearsal चलाउनुहोस्; यसले दुवै SHA प्रिन्ट गर्छ, र
   उही commits push गर्न सकिन्छ:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. पहिलो PR आउनुअघि `stable/v3` र `develop` लाई सुरक्षित गर्नुहोस् (rulesets + merge queue)।
5. निष्क्रिय workflows हरू शाखा अस्तित्वमा आएपछि सक्रिय हुन्छन्: `forward-port.yml` (`stable/v3` मा
   push), `validate-stable-pr.yml` (`stable/v3` मा जाने PR हरू) र `nightly-v4-build.yml`
   (`develop` का builds)। go-live अघि, repository secret `secrets.FORWARD_PORT_TOKEN` सेट गर्नुहोस् (ताकि CI
   forward-port PR हरूमा चलोस्); owner ले repository
   variable `vars.NIGHTLY_PUBLISH` लाई `true` मा सेट नगरेसम्म र npm Trusted Publishing ले
   `nightly-v4-build.yml` स्वीकार नगरेसम्म nightly publishing बन्द नै रहनेछ। Channel resolution `scripts/release/dist-tag.mjs` मा हुन्छ, जुन
   `npm-publish.yml` ले प्रयोग गर्ने उही resolver हो।
6. Channels प्रमाणित गर्नुहोस्: `npm view omniroute dist-tags --json` ले
   `latest` = 3.9.0 र v4 publish नभएसम्म `next` / `nightly` नभएको देखाउँछ।
7. आवश्यक परे rollback गर्नुहोस्: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   र `npm dist-tag add omniroute@3.8.59 latest`।

---

## रोलब्याक

यदि रिलिजमा गम्भीर समस्या छ भने:

1. `gh release edit vX.Y.Z --prerelease` (नवीनतम होइन भनेर चिन्ह लगाउँछ)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (प्रयोगकर्ताहरूले अझै अपनाइसकेका छैनन् भने मात्र)
3. वा: `release/vX.Y.0` मा हटकफिक्स → प्याच रिलिज `vX.Y.(Z+1)`
4. GitHub Discussions र Discord मा तुरुन्त जानकारी दिनुहोस्

## कडा नियमहरू

- `main` मा सिधै कमिट नगर्नुहोस्
- `main` वा `release/*` शाखाहरूमा `git push --force` प्रयोग नगर्नुहोस्
- Husky हुकहरू (`--no-verify`) कहिल्यै नछोड्नुहोस्
- गोप्य जानकारी, प्रमाणपत्रहरू वा `.env` फाइलहरू कमिट नगर्नुहोस्
- कभरेज ≥60/60/60/60 (स्टेटमेन्ट/लाइन/फङ्सन/ब्रान्च) कायम रहनुपर्छ
- `src/`, `open-sse/`, `electron/` वा `bin/` मा उत्पादन कोड परिवर्तन गर्दा सधैँ परीक्षणहरू समावेश वा अद्यावधिक गर्नुहोस्

## स्वचालित समक्रमण जाँच

PR खोल्नुअघि स्थानीय रूपमा डक्स समक्रमण गार्ड चलाउनुहोस्:

```bash
npm run check:docs-sync
```

CI ले `.github/workflows/ci.yml` (लिन्ट कार्य) मा पनि यो जाँच चलाउँछ।
