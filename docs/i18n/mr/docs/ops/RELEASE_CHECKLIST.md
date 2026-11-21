# Release Checklist (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **शेवटचे अद्यतन:** 2026-08-28 — v3.8.51
> ऑटोमेशनसाठी Claude Code skills चा वापर करणारा सुव्यवस्थित रिलीज प्रवाह.
>
> **रिलीजदरम्यान queue/branch हिरवी ठेवा:** [RELEASE_GREEN.md](./RELEASE_GREEN.md) पहा
> (`/green-prs` family + `npm run check:release-green` + `/babysit` + nightly). हे नियमितपणे —
> आणि विशेषतः **या चेकलिस्टपूर्वी** — चालवल्याने रिलीज PR हिरव्या स्थितीत सुरू होते.

## थोडक्यात

```bash
# 1. आवृत्ती वाढवा + CHANGELOG तयार करा (skill)
/version-bump-cc patch    # किंवा minor/major

# 2. गुणवत्ता तपासणी स्थानिक पातळीवर चालवा
npm run check              # lint + चाचण्या
npm run test:coverage      # पूर्ण coverage gate (60/60/60/60)

# 3. Build आणि smoke चाचणी
npm run build
npm run test:e2e           # पर्यायी, परंतु शिफारसीय

# 4. रिलीज तयार करा (skill)
/generate-release-cc

# 5. Deploy करा (skill)
/deploy-vps-both-cc        # किंवा akamai-cc / local-cc

# 6. रिलीजचे पुरावे संकलित करा (skill)
/capture-release-evidences-cc
```

## npm Trusted Publishing (v3.8.51 पासून डीफॉल्ट) — विनंतीनुसार staged, fallback म्हणून direct

`npm-publish.yml` डीफॉल्टनुसार **npm Trusted Publishing (OIDC)** द्वारे प्रकाशित करते:
`stage-npm` job (github-hosted) त्या रनसाठी GitHub चे id-token अल्पकालीन npm
credential मध्ये रूपांतरित करते — repository secrets मध्ये दीर्घकालीन npm token नाही,
2FA prompt नाही आणि provenance जोडलेले असते.
2FA वगळणारे tokens आता निवृत्त केले जात असल्याने npm sanctions टाळण्याचा हा मार्ग आहे;
तो v3.8.48 पर्यंत प्रकल्पात असलेला पूर्णपणे स्वयंचलित प्रवाह पुनर्संचयित करतो आणि
WS1.3 ची हमी कायम ठेवतो (गळती झालेला token एकट्याने publish करू शकत नाही — tokenच नाही).

**एकदाच करायची सेटअप प्रक्रिया (मालक):** npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none). हे अस्तित्वात येईपर्यंत स्वयंचलित step `ENEEDAUTH` सह अयशस्वी होतो:
`publish_mode=staged` (खाली) किंवा `direct` वापरून पुन्हा dispatch करा.

### Staged publishing (विनंतीनुसार — `publish_mode=staged`)

npm-publish workflow आता थेट publish करत नाही: तो packed tarball
(`check:pack-boot`) boot करतो आणि त्यानंतर `npm stage publish` चालवतो — अचूक bytes
registry वर ठेवले जातात, **मालकाची मंजुरी मिळेपर्यंत install करता येत नाहीत**. मानवी
2FA gate proof नंतर हलवण्यात आला आहे, त्यापूर्वी नाही.

**Workflow green झाल्यानंतर मालकाची प्रक्रिया:**

1. `npm stage list omniroute` — stage id शोधा (तो workflow summary मध्येही छापला जातो).
2. Staged bytes पडताळा (शिफारसीय): `npm stage download <id>` चालवा, त्यानंतर
   डाउनलोड केलेला tarball तात्पुरत्या prefix मध्ये install करून boot करा
   (`npm run check:pack-boot` CI मध्ये pack→install→boot verdict स्वयंचलितपणे करतो).
3. `npm stage approve <id>` — 2FA prompt हाच publish आहे. `npm stage reject <id>` केल्यास तो टाकून दिला जातो.
4. Publish नंतरची तपासणी: post-publish verifier (v3.8.49 plan मधील WS1.4)
   public registry मधून प्रकाशित आवृत्ती स्वच्छ container मध्ये install करून boot करतो.

**आपत्कालीन fallback:** `publish_mode=direct` सह `workflow_dispatch` केल्यास
legacy तात्काळ `npm publish` पुनर्संचयित होते (staging मध्येच समस्या असल्यास वापरा;
का वापरले ते नोंदवा).

**एकदाच करायचे hardening (मालक, npmjs.com):** `omniroute` साठी Trusted Publisher
stage-only mode मध्ये configure करा, जेणेकरून गळती झालेला दीर्घकालीन token कुठूनही
थेट `npm publish` करू शकणार नाही — CI फक्त stage करू शकते; केवळ मालकाचे 2FA releases
करते.

**Broken-artifact playbook (अपरिवर्तित):** डीफॉल्ट उपाय म्हणून
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"` वापरा (काही मिनिटांत,
परत करता येण्यासारखे); `npm unpublish` केवळ 72 तासांच्या/no-dependents
window मध्ये वापरा आणि कधीही पहिली कृती म्हणून करू नका. Docker: आवृत्ती tag
कधीही पुन्हा लिहू नका — rollback म्हणजे `latest` ला शेवटच्या चांगल्या digest कडे
पुन्हा निर्देशित करणे.

**Docker Hub `latest` (प्रत्येक stable SemVer publish साठी आवश्यक):**
`docker-publish` workflow ने **दोन्ही** `X.Y.Z` tag करणे आवश्यक आहे आणि,
`should-promote-latest.sh` ही ही सर्वाधिक stable SemVer असल्याचे मान्य करत असल्यास,
`:latest` देखील **त्याच digest** सह tag करणे आवश्यक आहे. Job नंतर: Hub वरील
`latest` digest नवीन SemVer digest इतकाच असावा आणि `last_updated` बदललेले असावे.
Release notes मध्ये केवळ git वर अस्तित्वात असलेल्या दुरुस्त्यांचा उल्लेख असताना
जुन्या build वर `:latest` ठेवू नका. Compose quickstarts `:latest` वापरतात;
GitOps ने `X.Y.Z` pin करणे सुरू ठेवावे. [Docker release channels](../guides/DOCKER_GUIDE.md#release-channels)
आणि #10317 पहा.

**Docker Hub organization repository (`cheaperinference/omniroute`):** Docker Hub
repository ला namespaces मध्ये हलवू शकत नाही, त्यामुळे `diegosouzapw/omniroute`
आपला pull history आणि प्रत्येक release कायम ठेवतो आणि `docker-publish` मधील
`mirror-org-dockerhub` job प्रत्येक released version (आणि promote झाल्यावर `:latest`)
`ghcr.io/cheaper-inference/omniroute` मधून organization repository मध्ये copy करते.
यासाठी `DOCKERHUB_ORG_USERNAME` /
`DOCKERHUB_ORG_TOKEN` secrets आवश्यक आहेत; ते नसल्यास job "Docker Hub org
mirror skipped" warning सह green राहतो आणि इतर registries मध्ये नेहमीप्रमाणे publish होते.
नंतर तेथे released version publish करण्यासाठी **Actions → Mirror Docker image to the Docker Hub org → Run
workflow** चालवा आणि `version=X.Y.Z` (तसेच सर्वाधिक stable version साठी
`promote_latest`) द्या: यामुळे existing images copy होतात, rebuild होत नाही.

## हॉटफिक्स जलद मार्ग (लेबल `hotfix`)

`hotfix` लेबल असलेला PR हेवी CI मॅट्रिक्स (9-शार्ड E2E, कव्हरेज रॅचेट,
क्वालिटी-गेट, क्वालिटी-एक्स्टेंडेड) वगळतो आणि जलद, उच्च-सिग्नल गेट्स ठेवतो: बिल्ड,
युनिट शार्ड्स, इंटिग्रेशन, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
आणि टारबॉल बूट-स्मोक (`check:pack-boot`). लक्ष्य: ~33 मिनिटांऐवजी ≤15 मिनिटांत
ग्रीन.

**प्रवेश धोरण — चारही आवश्यकता अनिवार्य (Chromium/VS Code/Node आपत्कालीन मार्गांच्या धर्तीवर):**

1. **तीव्रता**: production खंडित आहे — प्रकाशित आर्टिफॅक्ट बूटवर क्रॅश होतो / सुरक्षा-दुरुस्ती आवश्यक आहे / रिलीज वापरणारा प्रत्येक वापरकर्ता प्रभावित आहे. "महत्त्वाचे" म्हणजे "खंडित" नव्हे.
2. **अधिकार**: केवळ repository owner `hotfix` लेबल लावतो. हे लेबलच मंजुरी आहे — campaign PR वर कधीही स्वयंसेवा करू नका.
3. **पुरावा**: PR body मध्ये मागील पूर्णपणे-ग्रीन हेवी रनची लिंक (वगळलेल्या जॉब्सनी पुन्हा वैध ठरवायचा suite) तसेच fix च्या स्वतःच्या अयशस्वी-नंतर-यशस्वी चाचणीची लिंक असावी.
4. **व्याप्ती**: केवळ cherry-pick — किमान fix, कोणतेही refactor नाहीत, कोणतेही ride-alongs नाहीत.

वगळलेली coverage/ratchet पृष्ठभाग release branch वरील पुढील पूर्ण रनद्वारे पुन्हा
वैध ठरवली जाते (continuous release-green) — हा मार्ग WAITING वगळतो, validation नाही.
केवळ tests-संबंधित diff (सर्व फाइल्स `tests/` अंतर्गत, `tests/e2e/` अंतर्गत एकही नाही)
E2E मॅट्रिक्स आपोआप वगळतो, कोणत्याही लेबलशिवाय.

## सविस्तर तपासणीसूची

### रिलीजपूर्व

- [ ] या रिलीजसाठी लक्ष्यित सर्व PR `release/vX.Y.0` मध्ये मर्ज केले आहेत
- [ ] या आवृत्तीसाठीचे सर्व खुले Linear/issue आयटम बंद केले आहेत किंवा पुढील milestone कडे ढकलले आहेत
- [ ] `release/vX.Y.0` branch वर CI ग्रीन आहे
- [ ] कोडमध्ये कोणतेही `TODO(release)` markers नाहीत: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker base image अद्ययावत आहे (सध्या `node:24.15.0-trixie-slim`)

### आवृत्ती आणि Changelog

- [ ] `/version-bump-cc <patch|minor|major>` चालवा (Claude Code skill)
  - `package.json`, `electron/package.json` मध्ये आवृत्ती वाढवतो
  - शेवटच्या tag पासूनच्या git commits मधून `CHANGELOG.md` पुन्हा तयार करतो
  - README.md badges अद्ययावत करतो
- [ ] `CHANGELOG.md` चे स्वहस्ते पुनरावलोकन करा आणि आवश्यक असल्यास commit messages स्वच्छ करा
- [ ] `CHANGELOG.md` मधील नवीनतम semver विभाग `package.json` आवृत्तीशी समान आहे याची खात्री करा
- [ ] आगामी कामासाठी `## [Unreleased]` हा पहिला changelog विभाग ठेवा
- [ ] `docs/openapi.yaml` → `info.version` हे `package.json` आवृत्तीशी समान असणे आवश्यक आहे

### कोड गुणवत्ता

- [ ] `npm run lint` — 0 errors (warnings पूर्वीपासून आहेत)
- [ ] `npm run typecheck:core` — स्वच्छ
- [ ] `npm run typecheck:noimplicit:core` — स्वच्छ (strict)
- [ ] `npm run check:cycles:ratchet` — गोठवलेल्या `metrics.cycles` कमाल मर्यादेत (साधा `check:cycles` कोणतेही cycle आढळल्यास 1 ने exit होतो, #15281)
- [ ] `npm run check:any-budget:t11` — budget मध्ये
- [ ] `npm run check:route-validation:t06` — स्वच्छ
- [ ] `npm run check:node-runtime` — समर्थित runtime floor पूर्ण (`>=22.22.2 <23`, `>=24.0.0 <27`, `src/shared/utils/nodeRuntimeSupport.ts` मधील `SUPPORTED_NODE_RANGE` नुसार; `package.json` मधील `engines` शी संरेखित)

### चाचणी

- [ ] `npm run test:unit` — उत्तीर्ण
- [ ] `npm run test:vitest` — उत्तीर्ण (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — gate 60/60/60/60 पूर्ण (statements/lines/functions/branches)
- [ ] `npm run test:integration` — उत्तीर्ण (बदल DB / handlers ला स्पर्श करत असल्यास)
- [ ] `npm run test:combo:matrix` — उत्तीर्ण (combo strategy matrix: सर्व 22 public routing strategies चे selection decisions निर्धारपूर्वक सिद्ध करते; combo routing, strategy resolution किंवा fallback logic ला स्पर्श करताना चालवा)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **पर्यायी/स्वहस्ते** (gated real-upstream smoke; VPS `root@192.168.0.15` वरून read-only DB snapshot घेतो; real providers ला hit करतो, credits खर्च होतात; CI मध्ये कधीही चालत नाही; gate शिवाय स्वच्छपणे skip होतो)
- [ ] `npm run test:combo:live:vps` — **पर्यायी/स्वहस्ते** (Phase-3 VPS live smoke: साध्या Node ESM द्वारे live `.15` server विरुद्ध 7 HTTP scenarios; `ssh root@192.168.0.15` आवश्यक; केवळ `__live_test__*` combos तयार/हटवतो; real providers ला hit करतो; CI मध्ये कधीही चालत नाही)
- [ ] `npm run test:e2e` — उत्तीर्ण (UI बदल)
- [ ] `npm run test:protocols:e2e` — उत्तीर्ण (MCP/A2A बदल)
- [ ] `npm run test:ecosystem` — उत्तीर्ण

### Hooks (Husky द्वारे वैध ठरवलेले)

Husky hooks `.husky/` मध्ये आहेत आणि git operations वर आपोआप चालतात.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** जलद निर्धारपूर्वक गेट्स — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (2026-06-13 रोजी सक्रिय). `test:unit` जाणूनबुजून वगळले आहे (मंद; CI `test-unit` job द्वारे समाविष्ट).
  - release branches push करण्यापूर्वी `npm run test:unit` स्वहस्ते चालवा.

Hook अयशस्वी झाल्यास: मूळ समस्या दुरुस्त करा, `--no-verify` वापरून बायपास करू नका.

### Conventional Commits

रिलीजसाठी असलेल्या सर्व commits ने `type(scope): subject` स्वरूपाचे पालन केले पाहिजे.

**वैध types:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**वैध scopes:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Breaking changes: `BREAKING CHANGE:` footer जोडा किंवा scope नंतर `!` जोडा (उदा. `feat(api)!: drop /v0`).

### दस्तऐवजीकरण

- [ ] `npm run check:docs-sync` यशस्वी होते (pre-commit द्वारे स्वयंचलितपणे चालवले जाते)
- [ ] `npm run check:docs-all` यशस्वी होते (umbrella: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` `0` सह बाहेर पडते — कोड ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env करार अबाधित आहे
- [ ] `npm run check:doc-links` `0` सह बाहेर पडते — पुनर्रचनेनंतर कोणतेही तुटलेले अंतर्गत markdown संदर्भ नाहीत
- [ ] `docs/architecture/ARCHITECTURE.md` मधील storage/runtime drift चे पुनरावलोकन केले
- [ ] `docs/guides/TROUBLESHOOTING.md` मधील env var आणि operational drift चे पुनरावलोकन केले
- [ ] `.env.example` मध्ये बदल असल्यास: `docs/reference/ENVIRONMENT.md` अद्ययावत केले
- [ ] नवीन feature ला UI असल्यास: `docs/guides/USER_GUIDE.md` मध्ये त्याचा उल्लेख आहे
- [ ] नवीन feature ला API असल्यास: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` अद्ययावत केले
- [ ] नवीन feature module असल्यास: समर्पित `docs/<MODULE>.md` अस्तित्वात आहे
- [ ] breaking change असल्यास: `docs/guides/TROUBLESHOOTING.md` मध्ये migration note आहे

### i18n

- [ ] `npm run i18n:check` `0` सह बाहेर पडते — translation state (`.i18n-state.json`) source docs शी समक्रमित आहे (strict mode मध्ये drifted sources नाहीत; शेवटच्या क्षणी केलेल्या doc touch-ups साठी warn-mode advisory स्वीकार्य आहे, परंतु tagging करण्यापूर्वी ते 0 असावे)
- [ ] `npm run i18n:check-ui-coverage` `0` सह बाहेर पडते — प्रत्येक UI locale किमान 80% coverage floor वर किंवा त्यापेक्षा जास्त आहे
- [ ] `npm run i18n:sync-ui:dry` सर्व 66 target locales मध्ये 0 missing keys दाखवते (`en` source वगळता प्रत्येक locale)
- [ ] source English docs मध्ये बदल असल्यास, tagging करण्यापूर्वी `npm run i18n:run` चालवा (`.env` मध्ये `OMNIROUTE_TRANSLATION_API_KEY` आवश्यक)
- [ ] minor असल्यास translation contributions पुढील release पर्यंत पुढे ढकलता येतात (CHANGELOG मध्ये नोंद ठेवा)

### Database Migrations

- [ ] `src/lib/db/migrations/` मध्ये नवीन files असल्यास:
  - [ ] प्रत्येक migration idempotent आहे (`CREATE TABLE IF NOT EXISTS`, इत्यादी)
  - [ ] Migrations transactions मध्ये wrapped आहेत
  - [ ] योग्य क्रमांक दिले आहेत (sequence मध्ये gaps नाहीत)
- [ ] नवीन install वर चाचणी करा: `~/.omniroute/omniroute.db` हटवा आणि `npm run dev` चालवा
- [ ] विद्यमान install वर चाचणी करा: DB चा backup घ्या, migration चालवा, schema सत्यापित करा
- [ ] Migration ने tables पुन्हा लिहिल्यास WAL files (`-wal`, `-shm`) योग्यरीत्या हाताळल्या आहेत

### Provider Catalog (Zod-validated)

- [ ] `src/shared/constants/providers.ts` Zod schema load time वेळी valid आहे
  - [ ] सर्व providers कडे आवश्यक fields (`id`, `label`, `kind`, इत्यादी) आहेत
  - [ ] नवीन free providers साठी `freeNote` दिले आहे
  - [ ] OAuth providers कडे `src/lib/oauth/constants/oauth.ts` मध्ये `oauthConfig` registered आहे
- [ ] नवीन provider जोडल्यास: `open-sse/executors/` मध्ये संबंधित executor आहे
- [ ] Non-OpenAI format असल्यास: `open-sse/translator/` मध्ये translator आहे
- [ ] `open-sse/config/providerRegistry.ts` मध्ये Models registered आहेत
- [ ] `tests/unit/` मधील Unit tests provider classification आणि routing समाविष्ट करतात

### Desktop (Electron)

`electron/` मध्ये बदल असल्यास:

- [ ] `npm run electron:smoke:packaged` यशस्वी होते
- [ ] किमान यापैकी एका `:win`, `:mac`, `:linux` साठी builds ची चाचणी केली
- [ ] Code signing certs कालबाह्य झालेले नाहीत (signing असल्यास)
- [ ] `electron/package.json` version root `package.json` शी जुळते
- [ ] Release `stable` वर करत असल्यास auto-update channel pointer अद्ययावत केला

### Build Layout

Repository तीन स्वतंत्र output directories वापरते — त्यांची कधीही गल्लत करू नका:

| Directory | Purpose                                                      | Tracked?        |
| --------- | ------------------------------------------------------------ | --------------- |
| `src/`    | Application source (TypeScript / TSX)                        | Yes             |
| `.build/` | Build intermediates — `next build` output (`distDir`)        | No (gitignored) |
| `dist/`   | Shippable npm bundle — `assembleStandalone` द्वारे assembled | No (gitignored) |

> **Operator note:** remote VPS image directory अजूनही `/usr/lib/node_modules/omniroute/app/` आहे.
> फक्त **in-repo** build output हलवले (`app/` → `dist/`). Deploy skills
> `dist/` मधील contents remote `app/` dir मध्ये rsync करतात — VPS path मध्ये कोणतेही बदल आवश्यक नाहीत.

**Single-build flow:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Deploy साठी `npm run build` चालवल्यानंतर स्वतंत्रपणे `npm run build:cli` चालवू नका — `npm run build:release` वापरा, जे एका command मध्ये clean rebuild + sentinel करते.

### Artifact Validation

- [ ] `npm run build:release` यशस्वी होते आणि `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` clean — `app.__qa_backup`, `scripts/scratch`, `package-lock.json` किंवा इतर local residue नाही
- [ ] Build नंतर `dist/server.js` अस्तित्वात आहे
- [ ] Optional local packaged-runtime smoke: `npm run dev:candidate -- build` नंतर `npm run dev:candidate -- validate` isolated `DATA_DIR` वर packed tarball boot करते आणि `/api/health` + `/v1/models` तपासते ([Contribution Golden Path](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) पहा)

### Tagging & Release

- [ ] `/generate-release-cc` (Claude Code skill) चालवा:
  - `vX.Y.Z` tag तयार करते
  - tag आणि branch push करते
  - changelog body सह GitHub Release उघडते
  - Electron installers जोडते (build केले असल्यास)
- [ ] किंवा manually:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deploy

Deploy skills light rsync flow वापरतात — `npm pack` नाही, `npm i -g` नाही:

- [ ] लक्ष्याशी जुळणारे deploy skill वापरा:
  - `/deploy-vps-local-cc` — स्थानिक VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — दोन्ही
- [ ] Deploy करण्यापूर्वी `dist/BUILD_SHA` == `git rev-parse --short HEAD` याची खात्री करा
- [ ] Build `node_modules` प्रत्यक्ष असलेल्या ठिकाणी चालला पाहिजे (मुख्य checkout किंवा `npm ci` केलेला worktree — symlink केलेला worktree NOT)
- [ ] Deployed instance ची smoke test करा:
  - `/dashboard/health` उघडा → version string release शी जुळते का ते तपासा
  - ज्ञात provider विरुद्ध `/v1/chat/completions` request चालवा
  - `/api/monitoring/health` `CLOSED` circuit breakers परत करते का ते पडताळा
  - MCP transports प्रतिसाद देतात याची खात्री करा (`/mcp` HTTP, `/mcp-sse` SSE)

### Release नंतर

- [ ] `/capture-release-evidences-cc` (Claude Code skill) चालवा
  - नवीन वैशिष्ट्यांचे WebP screenshots/recordings कॅप्चर करते
  - Release notes / blog post ला जोडते
- [ ] Release announcement सह GitHub Discussions / Discord अपडेट करा
- [ ] पुढील version साठी milestone उघडा
- [ ] Critical असल्यास: discussion pin करा किंवा in-app banner साठी `news.json` मध्ये post करा

### Radar public-launch gate

Radar announcement जाणूनबुजून `active: false` सह commit केलेली आहे. खालील प्रत्येक बाबीचा पुरावा मिळाल्यानंतर activation हा स्वतंत्र बदल आहे:

- [ ] सर्व stacked Radar PRs merge झाले आहेत आणि release-tip CI हिरवा आहे
- [ ] `RADAR_ENABLED` डीफॉल्टनुसार अजूनही बंद ठेवून OSS Radar routes deploy आणि smoke test करा
- [ ] नामनिर्दिष्ट Radar host वर `GET /planos`, `/termos`, `/privacidade`, आणि `/reembolso` ची smoke test करा
- [ ] Private service मध्ये operator ची ओळख/संपर्क/पत्ता आणि owner-approved legal review नोंदवा
- [ ] केवळ test mode मध्ये Stripe Checkout आणि signed webhook वापरून पाहा
- [ ] मंजूर sender/domain सह एका encrypted transactional-email delivery ची चाचणी करा
- [ ] Backup restore आणि एक supervised, budget-capped research run सिद्ध करा
- [ ] Donation evidence स्वीकारण्यापूर्वी BRL/PIX review policy मंजूर करा
- [ ] वरील gates पूर्ण झाल्यानंतरच public Checkout सक्षम करा, त्यानंतर नवीन `news.json` ID सक्रिय करा
- [ ] Home banner मध्ये localized copy वापरली जाते आणि जुनी ID dismiss केल्यानंतर नवीन ID पुन्हा दिसते याची पडताळणी करा

## एम्बेडेड सेवांची स्मोक चाचणी (v3.8.4+)

एम्बेडेड सेवांमध्ये बदल समाविष्ट असलेले कोणतेही रिलीज पाठवण्यापूर्वी, पुढील बाबी तपासा:

### नवीन DB बूट (मायग्रेशनमधील संघर्ष शोधतो — v3.8.4 हॉटफिक्सनंतर जोडले)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — बूटसाठी 10 सेकंद प्रतीक्षा करा
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` `"9router"` परत करते (404 किंवा 500 नाही). मायग्रेशन `071_services.sql` लागू झाले आहे आणि पंक्ती सीड केली आहे याची खात्री होते.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` 3 पंक्ती परत करते.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` 2 पंक्ती परत करते (`070_webhooks_kind_metadata.sql` लागू झाल्याची पडताळणी).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` यशस्वी होते — भविष्यातील संघर्षांपासून संरक्षण करते.

### 9Router

- [ ] `POST /api/services/9router/install` 2 मिनिटांच्या आत `installedVersion` सह 200 परत करते
- [ ] `POST /api/services/9router/start` 30 सेकंदांच्या आत 200 आणि `state: "running"` परत करते
- [ ] `GET /api/services/9router/status` `health: "healthy"` दर्शवते
- [ ] `"model": "9router/auto/..."` सह `POST /v1/chat/completions` 200 परत करते (9Router द्वारे एंड-टू-एंड रूटिंग)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` प्रॉक्सीच्या आत 9Router चा मूळ UI रेंडर करते (थेट `127.0.0.1:port` iframe नाही)
- [ ] `POST /api/services/9router/rotate-key` `{ keyRotated: true }` परत करते आणि सेवा स्वच्छपणे पुन्हा सुरू होते
- [ ] `POST /api/services/9router/stop` 200 आणि `state: "stopped"` परत करते
- [ ] `GET /api/services/9router/logs?tail=50` अलीकडील ओळी असलेल्या `snapshot` इव्हेंटसह SSE प्रवाह परत करते
- [ ] PATH मध्ये `npm` नसलेल्या वातावरणात इंस्टॉल केल्यास 500 आणि सुलभ (स्टॅक-ट्रेस नसलेला) त्रुटी संदेश परत होतो

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` 2 मिनिटांच्या आत 200 परत करते
- [ ] `POST /api/services/cliproxy/start` 30 सेकंदांच्या आत 200 आणि `state: "running"` परत करते
- [ ] `GET /api/services/cliproxy/status` `health: "healthy"` दर्शवते
- [ ] `POST /api/services/cliproxy/stop` 200 आणि `state: "stopped"` परत करते
- [ ] `GET /api/services/cliproxy/logs?tail=50` SSE प्रवाह परत करते

### सुरक्षा प्रतिगमन

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` `403 LOCAL_ONLY` परत करते
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` `403 LOCAL_ONLY` परत करते
- [ ] `/api/services/*` कडून मिळणाऱ्या त्रुटी प्रतिसादांमध्ये `err.stack` किंवा पूर्ण फाइल पथ समाविष्ट नसतात

## v3.8.0+ तपासण्या

कोणतेही v3.8.x रिलीज पाठवण्यापूर्वी, पुढील अतिरिक्त बाबी तपासा:

- [ ] `omniroute --tray` macOS वर बूट होते (`~/.omniroute/runtime/` मध्ये systray2 इंस्टॉल केलेले)
- [ ] `omniroute --tray` Linux वर बूट होते (DISPLAY आवश्यक; सेट केलेले नसल्यास सुसह्य त्रुटी)
- [ ] `omniroute --tray` Windows वर बूट होते (PowerShell NotifyIcon, अतिरिक्त बायनरी नाहीत)
- [ ] `omniroute config tray enable` ऑटोस्टार्ट नोंद तयार करते; disable ती काढून टाकते
- [ ] `npm install -g omniroute@<this-version>` गंभीर एक्झिटशिवाय postinstall चालवते
- [ ] अपडेटचा मार्ग optional deps जतन करतो: `omniroute update --apply` आणि auto-updater
      `npm install -g … --include=optional` चालवतात, त्यामुळे `optionalDependencies` (better-sqlite3,
      keytar, tls-client आणि llmlingua SLM स्टॅक: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) अपडेटनंतर टिकून राहतात. ultra `modelPath` SLM tier साठी tinybert
      model देखील आवश्यक आहे; पहिल्यांदा वापरताना ते `${DATA_DIR}/models/llmlingua` येथे आपोआप डाउनलोड केले जाते. Postinstall
      (`scripts/build/colocateOptionals.mjs`) नंतर SLM optional closure `dist/node_modules` मध्ये
      सह-स्थित करते, ज्यामुळे worker एकच `@huggingface/transformers` ^4.2.0
      instance resolve करतो — standalone trace bundles मध्ये फक्त transformers असतात, dynamically-imported
      optionals नसतात; त्यामुळे हे नसल्यास worker root च्या transformers विरुद्ध llmlingua-2 लोड करेल
      आणि SLM tier कोणतीही सूचना न देता fail-open होईल.
- [ ] `.env` शिवाय `omniroute status` कार्य करते (CLI token path, फक्त loopback)
- [ ] `curl http://localhost:20128/api/shutdown` 401 परत करते (नेहमी-संरक्षित route)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` 401 परत करते (loopback guard)
- [ ] पहिल्या रनवर SQLite runtime `bundled` वर resolve होते (bundled binary प्लॅटफॉर्मसाठी वैध)
- [ ] `node_modules/better-sqlite3` हटवल्यावर SQLite runtime `runtime` वर fallback होते
- [ ] Smart MCP filter खरे `playwright-mcp browser_snapshot` output संकुचित करते (किमान 50% घट)
- [ ] सर्व 10 `skills/omniroute*/SKILL.md` फाइल्स raw GitHub URL द्वारे सार्वजनिकरीत्या fetch करता येतात
- [ ] नवीन सेटअपवर onboarding wizard मध्ये "How It Works" tier tour पायरी दिसते
- [ ] Home dashboard tier coverage widget मध्ये configured/active संख्या दिसतात

---

## 3.9.0 LTS कट (3.8.58 मध्ये तालीम केली)

v3.8.59 नंतर पुढील आवृत्ती 3.9.0 आहे, आणि तिची टीप दोन दीर्घकालीन शाखा बनते: `stable/v3` (v3 LTS लाइन, npm `latest`) आणि `develop` (v4, 4.0.0 वर आदळली, npm `nightly`). branch/channel मॉडेल, फॉरवर्ड-पोर्ट आणि लेबले [RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md) मध्ये आहेत; योजना [ROADMAP](../../ROADMAP.md) मध्ये आहे (फेज 3). कट एकदा चालते; 3.8.58 फाट्यावर शेवटपर्यंत रिहर्सल करते आणि 3.8.59 [GO/NO-GO चेकलिस्टसह](./LTS_GO_NO_GO.md) बंद होते.

### ड्राय-रन (केवळ-वाचनीय, कधीही सुरक्षित)

```bash
npm run release:dry-run-lts-cut                       # the real cut: 3.9.0 from HEAD, previous tag v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # pin the source commit
```

`scripts/release/dry-run-lts-cut.mjs` executes nothing: it reads git and `gh` and prints the whole sequence — preconditions (source resolves, the source repository has full history — a shallow clone cannot push `stable/v3`, the receiving side rejects the pack at the first grafted parent, so cut from a full clone or `git fetch --unshallow origin` first — previous tag exists, `package.json` is the target version, a `release-freeze` issue is open, no open `Release branch not green` issue on an existing release branch — a branch that does not exist reports `?` unknown, never green — omni-queue lands the release PRs (G11: `config/merge-queue/config.json` valid, its `bases` manage the release branch, `mode` `live`, its label exists), the `release/*` ruleset still blocks deletion and force-push, and `stable/v3` and `develop` do not exist yet), the two branch steps, which dormant-workflow triggers and `if:` conditions turn true (and which stay gated by a repository variable or pinned to the canonical repository), the expected dist-tags (`latest` → 3.9.0, `next` and `nightly` empty) and the rollback. Exit `0` = `RESULT: READY`, `1` = a blocking precondition failed (`✗`), `2` = usage error. `--advisory <id,...>` downgrades a check to a warning (`!`) without hiding it.

रिअल कटचा ड्राय-रन चालवा जेव्हा 3.9.0 रिलीझ फ्रीझ अजूनही उघडे असेल — टॅग नंतर आणि फेज 12c फ्रीझ उचलण्यापूर्वी शाखा तयार केल्या जातात.

### ३.८.५८ तालीम (फक्त काटा)

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

डेव्हलप बंप कमिट हे गिट प्लंबिंगने तयार केले आहे (कार्यरत झाडाला स्पर्श केला जात नाही) आणि सायकल-ओपन कमिट सारख्याच पाच फायली जोडल्या जातात: `package.json`, `open-sse/package.json`, `electron/package.json`, `package-lock.json` आणि `docs/openapi.yaml`. `[4.0.0]` CHANGELOG विभाग आणि त्याचे i18n आरसे `develop` नंतर, त्याच्या पहिल्या PR आधी उघडले जातात. स्क्रिप्ट कधीही npm dist-tags — स्क्रॅच पॅकेजवर रिहर्सल बदलत नाही.

### PR पूर्वावलोकन आर्टिफॅक्ट (एकदा तयार करा, समान बाइट्सचा प्रचार करा)

`.github/workflows/preview-artifact.yml` PR हेडमधून एक प्रोडक्शन टारबॉल तयार करतो आणि अचूक बिल्ड (#8084 स्लाइस (a)) प्रमाणित करतो. सेम-रिपॉजिटरी PRs फक्त; काहीही प्रकाशित नाही.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # or add the `preview-artifact` label
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # preview install
```

रन `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, टारबॉल पॅक करते, `npm run check:pack-boot` (बनावट रहस्ये, क्षणिक डेटा dir) रन करते, डायजेस्ट एकसारखे नसल्यास री-पॅक करते आणि अयशस्वी होते, नंतर `artifact-identity.json` रेकॉर्ड करते (हेड SHA, बेस SHA, लॉकफायल ABI, बिल्ड पॉलिसी, प्लॅटफॉर्म — `scripts/release/artifact-identity.mjs`) आणि टारबॉलला वेगळ्या कामात साक्षांकित करते. पूर्वावलोकनाचा प्रचार करणे म्हणजे तो टारबॉल स्थापित करणे: स्त्रोतापासून कधीही पुन्हा तयार करू नका.

### कट (3.9.0, GO नंतर)

1. GO [LTS_GO_NO_GO मध्ये नोंदवले .md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` `RESULT: READY` प्रिंट करतो.
3. ड्राय-रन प्रिंट्स — स्क्रिप्टने `origin` वर ढकलण्यास नकार दिल्याने `origin` वर हाताने शाखा तयार करा. पुनरावलोकन केलेल्या डेव्हलपमेंट कमिटचा पुन्हा वापर करण्यासाठी, प्रथम तुमच्या फोर्कच्या विरूद्ध 3.9.0 टीपवर `--execute` तालीम चालवा; ते SHAs दोन्ही मुद्रित करते, आणि समान कमिट पुश केले जाऊ शकतात:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. पहिल्या PR उतरण्यापूर्वी `stable/v3` आणि `develop` (नियम + मर्ज रांग) संरक्षित करा.
5. सुप्त कार्यप्रवाह शाखा अस्तित्वानुसार चालू होतात: `forward-port.yml` ( `stable/v3` कडे ढकलणे), `validate-stable-pr.yml` (PRs ते `stable/v3`) आणि `nightly-v4-build.yml` ( `develop` बनवते). गो-लाइव्ह करण्यापूर्वी, `secrets.FORWARD_PORT_TOKEN` रेपॉजिटरी गुप्त सेट करा (म्हणून CI फॉरवर्ड-पोर्ट PRs वर चालते); जोपर्यंत मालक रिपॉजिटरी व्हेरिएबल `vars.NIGHTLY_PUBLISH` ला `true` वर सेट करत नाही आणि npm ट्रस्टेड पब्लिशिंग `nightly-v4-build.yml` स्वीकारत नाही तोपर्यंत रात्रीचे प्रकाशन बंद राहते. चॅनल रिझोल्यूशन `scripts/release/dist-tag.mjs` आहे, तोच रिझोल्व्हर `npm-publish.yml` वापरतो.
6. चॅनेल सत्यापित करा: `npm view omniroute dist-tags --json` `latest` = 3.9.0 दाखवते आणि v4 प्रकाशित होईपर्यंत `next` / `nightly` नाही.
7. रोलबॅक, आवश्यक असल्यास: `git push origin --delete refs/heads/stable/v3 refs/heads/develop` आणि `npm dist-tag add omniroute@3.8.59 latest`.

---

## रोलबॅक

रिलीजमध्ये गंभीर समस्या असल्यास:

1. `gh release edit vX.Y.Z --prerelease` (रिलीजला नवीनतम म्हणून चिन्हांकित होण्यापासून थांबवते)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (वापरकर्त्यांनी अद्याप स्वीकारलेले नसल्यासच)
3. किंवा: `release/vX.Y.0` वर हॉटफिक्स → पॅच रिलीज `vX.Y.(Z+1)`
4. GitHub Discussions आणि Discord वर त्वरित माहिती द्या

## कठोर नियम

- `main` वर थेट कमिट करू नका
- `main` किंवा `release/*` शाखांवर `git push --force` कधीही वापरू नका
- Husky हुक्स वगळू नका (`--no-verify`)
- सिक्रेट्स, क्रेडेन्शियल्स किंवा `.env` फाइल्स कधीही कमिट करू नका
- कव्हरेज ≥60/60/60/60 (स्टेटमेंट्स/लाइन्स/फंक्शन्स/ब्रांचेस) राहिले पाहिजे
- `src/`, `open-sse/`, `electron/` किंवा `bin/` मधील प्रोडक्शन कोड बदलताना नेहमी चाचण्या समाविष्ट करा किंवा अद्ययावत करा

## स्वयंचलित सिंक तपासणी

PR उघडण्यापूर्वी स्थानिक पातळीवर docs sync guard चालवा:

```bash
npm run check:docs-sync
```

CI ही तपासणी `.github/workflows/ci.yml` मधील लिंट जॉबमध्ये चालवते.
