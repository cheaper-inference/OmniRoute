# Release Checklist (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> ऑटोमेशनसाठी Claude कोड कौशल्यांचा फायदा घेणारा सुव्यवस्थित प्रकाशन प्रवाह.
>
> **रिलीज दरम्यान queue/branch हिरवा ठेवा:** [RELEASE_GREEN.md](./RELEASE_GREEN.md) पहा (`/green-prs` कुटुंब + `npm run check:release-green` + `/babysit` + रात्री). हे वेळोवेळी चालू — आणि विशेषतः** आधी** ही चेकलिस्ट — रिलीझ PR ला हिरवी करते.

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

## npm विश्वसनीय प्रकाशन (v3.8.51 पासून डीफॉल्ट) — विनंतीवर स्टेज केले, थेट फॉलबॅक म्हणून

`npm-publish.yml` द्वारे प्रकाशित करते** एनपीएम विश्वसनीय प्रकाशन (OIDC)** डीफॉल्टनुसार: `stage-npm` जॉब (github-होस्टेड) GitHub च्या id-टोकनची देवाणघेवाण करते अल्पकालीन npm क्रेडेंशियलसाठी — रिपॉजिटरी सिक्रेट्समध्ये दीर्घकालीन npm टोकन नाही, 2FA प्रॉम्प्ट नाही, प्रोव्हन्स संलग्न आहे. ते म्हणजे बायपास एनपीएम मंजूरी आता 2FA वगळणारे टोकन निवृत्त केले जात आहेत; हे WS1.3 गॅरंटी ठेवताना प्रकल्पाचा v3.8.48 पर्यंत पूर्ण स्वयंचलित प्रवाह पुनर्संचयित करते (लीक केलेले टोकन एकटे — प्रकाशित करू शकत नाही तेथे कोणतेही टोकन नाही).

**एक-वेळ सेटअप (मालक):** npmjs.com → पॅकेज `omniroute` → सेटिंग्ज → _Trusted Publisher_ → GitHub: मालक `diegosouzapw`, रेपो `OmniRoute`, वर्कफ्लो `npm-publish.yml` (पर्यावरण: काहीही नाही). ते अस्तित्वात येईपर्यंत, स्वयंचलित पायरी `ENEEDAUTH` सह अयशस्वी होते : `publish_mode=staged` (खाली) किंवा `direct` सह री-डिस्पॅच.

### स्टेज्ड प्रकाशन ( — `publish_mode=staged` विनंतीनुसार)

npm-publish वर्कफ्लो यापुढे थेट प्रकाशित करत नाही: ते पॅक केलेले टारबॉल बूट करते (`check:pack-boot`) आणि नंतर `npm stage publish` — चालवते जे अचूक बाइट्स रेजिस्ट्रीमध्ये पार्क केले जातात,** स्थापित करण्यायोग्य नाही** मालक मंजूर होईपर्यंत. मानवी 2FA गेट पुरावा AFTER वर हलवले, त्याच्या आधी नाही.

**वर्कफ्लो हिरवा झाल्यानंतर मालकाचा प्रवाह:**

1. `npm stage list omniroute` — स्टेज आयडी शोधा (वर्कफ्लो सारांशमध्ये देखील छापलेले).
2. स्टेज केलेले बाइट्स सत्यापित करा (शिफारस केलेले): `npm stage download <id>`, नंतर डाउनलोड केलेले टारबॉल तात्पुरते उपसर्ग मध्ये स्थापित करा आणि बूट करा (`npm run check:pack-boot` समान पॅक →CI मध्ये→ बूट निर्णय स्थापित करते ).
3. `npm stage approve <id>` — 2FA प्रॉम्प्ट IS प्रकाशित करा. `npm stage reject <id>` टाकून देतो.
4. पोस्ट-पब्लिश नेट: पोस्ट-पब्लिश व्हेरिफायर ( v3.8.49 प्लॅनचाWS1.4) सार्वजनिक रजिस्ट्रीमधून प्रकाशित आवृत्ती स्वच्छ कंटेनरमध्ये स्थापित करतो आणि बूट करतो.

**आणीबाणी फॉलबॅक:** `workflow_dispatch` सह `publish_mode=direct` वारसा तात्काळ `npm publish` पुनर्संचयित करते (स्टेजिंगनेच गैरवर्तन केले तरच वापरा; का रेकॉर्ड करा).

**वन-टाइम हार्डनिंग (मालक, npmjs.com):** केवळ-स्टेज मोडमध्ये `omniroute` साठी विश्वसनीय प्रकाशक कॉन्फिगर करा जेणेकरून लीक केलेले दीर्घकाळ टिकणारे टोकन कोठूनही थेट `npm publish` करू शकत नाही — CI फक्त स्टेज करू शकते; फक्त मालकाचे 2FA रिलीझ.

**तुटलेली आर्टिफॅक्ट प्लेबुक (अपरिवर्तित):** डीफॉल्ट रिफ्लेक्स म्हणून `npm deprecate omniroute@<bad> "<reason> — use <fixed>"` (मिनिटे, उलट करता येण्याजोगे); `npm unpublish` फक्त 72h/no-dependents विंडोच्या आत आणि कधीही प्रथम चाल म्हणून नाही. Docker: आवृत्ती टॅग कधीही पुन्हा लिहू नका — रोलबॅक `latest` ला शेवटच्या चांगल्या डायजेस्टवर पुन्हा निर्देशित करत आहे.

**Docker हब `latest` (प्रत्येक स्थिर SemVer प्रकाशनासाठी आवश्यक):** `docker-publish` कार्यप्रवाह टॅग करणे आवश्यक आहे** दोन्ही** `X.Y.Z` आणि, जेव्हा `should-promote-latest.sh` सहमत असेल तेव्हा हे सर्वोच्च स्थिर SemVer आहे, `:latest` सह** समान पचन** . नोकरीनंतर: हब `latest` डायजेस्ट नवीन SemVer डायजेस्ट आणि `last_updated` हलवलेल्या बरोबर आहे. रिलीझ नोट्स फक्त git वर अस्तित्वात असलेल्या फिक्सेसबद्दल बोलत असताना जुन्या बिल्डवर `:latest` सोडू नका. कंपोझ क्विकस्टार्ट्स `:latest` वापरतात; GitOps `X.Y.Z` पिन करत रहावे. [Docker रिलीझ चॅनेल](../guides/DOCKER_GUIDE.md#release-channels) आणि #10317 पहा.

**Docker हब संस्था भांडार (`cheaperinference/omniroute`):** Docker हब नेमस्पेसेसमध्ये रेपॉजिटरी हलवू शकत नाही, म्हणून `diegosouzapw/omniroute` त्याचा पुल इतिहास आणि प्रत्येक रिलीझ ठेवतो आणि `docker-publish` चे `mirror-org-dockerhub` जॉब प्रत्येक रिलीझ केलेली आवृत्ती (आणि `:latest` प्रमोट केल्यावर) `ghcr.io/cheaper-inference/omniroute` वरून संस्थेच्या भांडारात कॉपी करते. त्याला `DOCKERHUB_ORG_USERNAME` / `DOCKERHUB_ORG_TOKEN` रहस्ये आवश्यक आहेत; त्यांच्याशिवाय नोकरी "Docker Hub org मिरर वगळली" चेतावणीसह हिरवी राहते आणि इतर नोंदणी सामान्यपणे प्रकाशित होतात. तेथे नंतर रिलीझ केलेली आवृत्ती प्रकाशित करण्यासाठी, चालवा** क्रिया → मिरर Docker प्रतिमा Docker हब org → रन वर्कफ्लोवर** `version=X.Y.Z` सह (आणि सर्वोच्च स्थिर आवृत्तीसाठी `promote_latest` ): ते विद्यमान प्रतिमा कॉपी करते, पुनर्बांधणी नाही. त्या भांडाराचे Docker हब विहंगावलोकन हाताने सेट केले आहे: ते संपादित करणारे API ऑर्गनायझेशन ऍक्सेस टोकन नाकारतात.

हाच वर्कफ्लो 2027-06-30 पर्यंत प्रत्येक रिलीझ GHCR पॅकेज `ghcr.io/diegosouzapw/omniroute` वर कॉपी करतो, त्यामुळे त्यावर पिन केलेले इन्स्टॉल्स अपडेट होत राहतात; त्याच्या निर्देशांकात " `ghcr.io/cheaper-inference/omniroute` वर हलविले" वर्णन आहे. त्याला `GHCR_LEGACY_TOKEN` गुप्त ( `write:packages` सह `diegosouzapw` चे क्लासिक वैयक्तिक प्रवेश टोकन) आवश्यक आहे; त्याशिवाय "लेगेसी GHCR मिरर वगळले" चेतावणी देऊन नोकरी वगळली जाते.

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

## तपशीलवार चेकलिस्ट

### प्री-रिलीझ

- [ ] या प्रकाशनासाठी लक्ष्यित केलेले सर्व PRs `release/vX.Y.0` मध्ये विलीन केले आहेत
- [ ] या आवृत्तीसाठी सर्व खुल्या Linear/issue आयटम बंद आहेत किंवा पुढील माइलस्टोनवर ढकलले आहेत
- [ ] `release/vX.Y.0` शाखेवर CI हिरवा
- [ ] कोडमध्ये कोणतेही `TODO(release)` मार्कर नाहीत: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker बेस इमेज अद्ययावत (सध्या `node:24.15.0-trixie-slim`)

### आवृत्ती आणि चेंजलॉग

- [ ] `/version-bump-cc <patch|minor|major>` चालवा (Claude कोड कौशल्य)
  - अडथळे `package.json`, `electron/package.json`
  - शेवटच्या टॅगपासून git कमिटमधून `CHANGELOG.md` रीजनरेट करते
  - README.md बॅज अपडेट करते
- [ ] CHANGELOG.md मॅन्युअली पुनरावलोकन करा आणि आवश्यक असल्यास कमिट संदेश साफ करा
- [ ] `CHANGELOG.md` मधील नवीनतम Semver विभाग `package.json` आवृत्ती समान आहे याची खात्री करा
- [ ] आगामी कामासाठी `## [Unreleased]` हा पहिला चेंजलॉग विभाग म्हणून ठेवा
- [ ] अपडेट `docs/openapi.yaml` → `info.version` `package.json` आवृत्तीच्या बरोबरीचे असणे आवश्यक आहे

### कोड गुणवत्ता

- [ ] `npm run lint` — 0 त्रुटी (इशारे आधीच अस्तित्वात आहेत)
- [ ] `npm run typecheck:core` — स्वच्छ
- [ ] `npm run typecheck:noimplicit:core` — स्वच्छ (कडक)
- [ ] गोठलेल्या `metrics.cycles` कमाल मर्यादेत `npm run check:cycles:ratchet` — (कोणत्याही सायकलवर बेअर `check:cycles` 1 मधून बाहेर पडते, #15281)
- [ ] बजेटमध्ये`npm run check:any-budget:t11` —
- [ ] `npm run check:route-validation:t06` — स्वच्छ
- [ ] `npm run check:node-runtime` — समर्थित रनटाइम फ्लोर मेट (`>=22.22.2 <23`, `>=24.0.0 <27`, `src/shared/utils/nodeRuntimeSupport.ts` मध्ये प्रति `SUPPORTED_NODE_RANGE` ; `package.json` `engines` सह संरेखित )

### चाचणी

- [ ] `npm run test:unit` — पास
- [ ] `npm run test:vitest` — पास (MCP सर्व्हर, autoCombo, कॅशे)
- [ ] `npm run test:coverage` — गेट 60/60/60/60 समाधानी (statements/lines/functions/branches)
- [ ] `npm run test:integration` — पास (जर बदलल्यास DB / हँडलरला स्पर्श करा)
- [ ] `npm run test:combo:matrix` — पास (कॉम्बो स्ट्रॅटेजी मॅट्रिक्स: सर्व 22 सार्वजनिक राउटिंग स्ट्रॅटेजीजचे निवड निर्णय निश्चितपणे सिद्ध करते; कॉम्बो राउटिंग, स्ट्रॅटेजी रिझोल्यूशन किंवा फॉलबॅक लॉजिकला स्पर्श करताना चालवा)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (गेट केलेले रिअल-अपस्ट्रीम स्मोक; स्रोत VPS `root@192.168.0.15` वरून केवळ-वाचनीय DB स्नॅपशॉट; वास्तविक प्रदात्यांना हिट, खर्च क्रेडिट; कधीही CI मध्ये चालत नाही; गेटशिवाय स्वच्छपणे वगळले जाते)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS लाइव्ह स्मोक: प्लेन नोड ESM द्वारे लाइव्ह `.15` सर्व्हर विरुद्ध 7 HTTP परिस्थिती; `ssh root@192.168.0.15` आवश्यक आहे; creates/deletes फक्त `__live_test__*` कॉम्बोस; वास्तविक प्रदात्यांवर हिट; CI मध्ये कधीही चालत नाही)
- [ ] `npm run test:e2e` — पास (UI बदल)
- [ ] `npm run test:protocols:e2e` — पास (MCP/A2A बदल)
- [ ] `npm run test:ecosystem` — पास

### हुक (हस्की प्रमाणित)

हस्की हुक `.husky/` मध्ये राहतात आणि git ऑपरेशन्सवर आपोआप चालतात.

- **पूर्व वचनबद्ध:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **प्री-पुश:** जलद निर्धारक गेट्स — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (सक्रिय 2026-06-13). हेतुपुरस्सर `test:unit` (स्लो; CI `test-unit` जॉबद्वारे संरक्षित) वगळले आहे.
  - रिलीझ शाखा पुश करण्यापूर्वी `npm run test:unit` स्वहस्ते चालवा.

हुक अयशस्वी झाल्यास: मूळ समस्येचे निराकरण करा, `--no-verify` सह बायपास करू नका.

### पारंपारिक वचनबद्धते

सर्व रिलीझ-बाउंड कमिटने `type(scope): subject` फॉरमॅटचे पालन केले पाहिजे.

**वैध प्रकार:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**वैध व्याप्ती:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker` `authz` `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`

ब्रेकिंग बदल: स्कोप नंतर `BREAKING CHANGE:` फूटर किंवा `!` जोडा (उदा. `feat(api)!: drop /v0`).

### दस्तऐवजीकरण

- [ ] `npm run check:docs-sync` पास (प्री-कमिटद्वारे स्वयं-चालित)
- [ ] `npm run check:docs-all` पास. त्याची सल्लागार `check:deprecated-versions` फ्लॅग आवृत्त्या स्पष्टपणे OmniRoute (3.6.x आणि पूर्वीच्या) ला श्रेय देते आणि तारखांकडे दुर्लक्ष करते.
- [ ] `npm run check:env-doc-sync` बाहेर पडतो 0 — कोड ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env करार अखंड आहे
- [ ] पुनर्रचनेनंतर `npm run check:doc-links` 0 — मधून बाहेर पडतो, कोणतेही तुटलेले अंतर्गत मार्कडाउन संदर्भ नाहीत
- [ ] `docs/architecture/ARCHITECTURE.md` ने storage/runtime drift साठी पुनरावलोकन केले
- [ ] `docs/guides/TROUBLESHOOTING.md` env var आणि ऑपरेशनल ड्रिफ्टसाठी पुनरावलोकन केले
- [ ] `.env.example` बदलल्यास: `docs/reference/ENVIRONMENT.md` अद्यतनित केले
- [ ] नवीन वैशिष्ट्यामध्ये UI असल्यास : `docs/guides/USER_GUIDE.md` त्याचा उल्लेख करते
- [ ] नवीन वैशिष्ट्यामध्ये API असल्यास : `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` अद्यतनित केले आहे
- [ ] नवीन वैशिष्ट्य मॉड्यूल असल्यास: समर्पित `docs/<MODULE>.md` अस्तित्वात आहे
- [ ] बदलल्यास: `docs/guides/TROUBLESHOOTING.md` मध्ये स्थलांतर नोंद आहे

### i18n

- [ ] `npm run i18n:check` 0 — भाषांतर स्थिती (`.i18n-state.json`) स्त्रोत डॉक्ससह समक्रमित करते (कठोर मोडमध्ये कोणतेही प्रवाहित स्त्रोत नाहीत; शेवटच्या मिनिटांच्या डॉक टच-अपसाठी चेतावणी-मोड सल्ला स्वीकार्य आहे, परंतु टॅग करण्यापूर्वी 0 असावा)
- [ ] 80% कव्हरेज फ्लोअरवर किंवा त्याहून अधिक `npm run i18n:check-ui-coverage` प्रत्येक UI लोकेलमधून 0 — बाहेर पडते
- [ ] `npm run i18n:sync-ui:dry` सर्व 66 टार्गेट लोकेलमध्ये 0 गहाळ की नोंदवते ( `en` स्त्रोत वगळता प्रत्येक लोकेल)
- [ ] स्रोत इंग्रजी दस्तऐवज बदलल्यास, टॅग करण्यापूर्वी `npm run i18n:run` ( `.env` मध्ये `OMNIROUTE_TRANSLATION_API_KEY` आवश्यक आहे) चालवा
- [ ] भाषांतर योगदान किरकोळ असल्यास पुढील प्रकाशनासाठी पुढे ढकलले जाऊ शकते ( CHANGELOG मध्ये ट्रॅक)

### डेटाबेस स्थलांतर

- [ ] `src/lib/db/migrations/` कडे नवीन फाइल्स असल्यास:
  - [ ] प्रत्येक स्थलांतर अशक्त आहे (`CREATE TABLE IF NOT EXISTS`, इ.)
  - [ ] व्यवहारात गुंडाळलेले स्थलांतर
  - [ ] योग्यरित्या क्रमांकित (क्रमात कोणतेही अंतर नाही)
- [ ] ताज्या स्थापनेवर चाचणी करा: `~/.omniroute/omniroute.db` हटवा आणि `npm run dev` चालवा
- [ ] विद्यमान स्थापनेवर चाचणी करा: बॅकअप DB, रन माइग्रेशन, स्कीमा सत्यापित करा
- [ ] WAL फाइल्स (`-wal`, `-shm`) योग्यरित्या हाताळल्या गेल्यास जर स्थलांतराने सारणी पुन्हा लिहिली

### प्रदाता कॅटलॉग (Zod-प्रमाणित)

- [ ] `src/shared/constants/providers.ts` Zod स्कीमा लोडच्या वेळी वैध आहे
  - [ ] सर्व प्रदात्यांकडे आवश्यक फील्ड आहेत (`id`, `label`, `kind`, इ.)
  - [ ] `freeNote` नवीन मोफत प्रदात्यांसाठी प्रदान केले आहे
  - [ ] OAuth प्रदात्यांकडे `src/lib/oauth/constants/oauth.ts` मध्ये `oauthConfig` नोंदणीकृत आहे
- [ ] नवीन प्रदाता जोडल्यास: `open-sse/executors/` मधील संबंधित एक्झिक्युटर
- [ ] नॉन-ओपनएआय फॉरमॅट असल्यास: `open-sse/translator/` मध्ये अनुवादक
- [ ] `open-sse/config/providerRegistry.ts` मध्ये नोंदणीकृत मॉडेल
- [ ] `tests/unit/` कव्हर प्रदाता वर्गीकरण आणि राउटिंग मध्ये युनिट चाचण्या

### डेस्कटॉप (Electron)

`electron/` बदलल्यास:

- [ ] `npm run electron:smoke:packaged` पास
- [ ] `:win`, `:mac`, `:linux` पैकी किमान एकासाठी चाचणी केलेली बिल्ड
- [ ] कोड साइनिंग प्रमाणपत्रे कालबाह्य झाली नाहीत (स्वाक्षरी करत असल्यास)
- [ ] `electron/package.json` आवृत्ती रूट `package.json` शी जुळते
- [ ] `stable` ला रिलीझ करत असल्यास स्वयं-अपडेट चॅनेल पॉइंटर अद्यतनित केले

### लेआउट तयार करा

रेपॉजिटरी तीन वेगळ्या आउटपुट डिरेक्टरी वापरते — त्यांना कधीही मिसळत नाही:

| निर्देशिका | उद्देश                                                 | ट्रॅक केले?          |
| ---------- | ------------------------------------------------------ | -------------------- |
| `src/`     | अर्जाचा स्रोत (TypeScript / TSX)                       | होय                  |
| `.build/`  | बिल्ड इंटरमीडिएट्स — `next build` आउटपुट (`distDir`)   | नाही (गट दुर्लक्षित) |
| `dist/`    | `assembleStandalone` द्वारे शिप करण्यायोग्य npm बंडल — | नाही (गट दुर्लक्षित) |

> **ऑपरेटर टीप:** रिमोट VPS प्रतिमा निर्देशिका `/usr/lib/node_modules/omniroute/app/` राहते. फक्त द** इन-रेपो** बिल्ड आउटपुट हलवले (`app/` → `dist/`). रिमोट `dist/` `app/` — नाही VPS मार्ग बदल आवश्यक आहे.

**सिंगल-बिल्ड प्रवाह:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

NOT रन `npm run build` आणि त्यानंतर — तैनात करण्यासाठी स्वतंत्र `npm run build:cli` `npm run build:release` वापरा जे एका कमांडमध्ये स्वच्छ रीबिल्ड + सेंटिनल करते.

### कृत्रिमता प्रमाणीकरण

- [ ] `npm run build:release` यशस्वी आणि `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` क्लीन — नाही `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, किंवा इतर स्थानिक अवशेष
- [ ] `dist/server.js` बांधल्यानंतर अस्तित्वात आहे
- [ ] ऐच्छिक स्थानिक पॅकेज्ड-रनटाइम स्मोक: `npm run dev:candidate -- validate` पॅक केलेले `DATA_DIR` `npm run dev:candidate -- build` नंतर बुट करतो आणि `/api/health` + `/v1/models` तपासतो ( [योगदान गोल्डन पाथ](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) पहा)

### टॅगिंग आणि रिलीज

- [ ] `/generate-release-cc` चालवा (Claude कोड कौशल्य):
  - टॅग `vX.Y.Z` तयार करते
  - टॅग आणि शाखा ढकलते
  - चेंजलॉग बॉडीसह GitHub रिलीझ उघडते
  - Electron इंस्टॉलर संलग्न करते (असल्यास)
- [ ] किंवा व्यक्तिचलितपणे:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### तैनात करा

उपयोजित कौशल्ये प्रकाश rsync प्रवाह वापरा — no `npm pack`, no `npm i -g`:

- [ ] लक्ष्याशी जुळणारे तैनात कौशल्य वापरा:
  - `/deploy-vps-local-cc` — स्थानिक VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — दोन्ही
- [ ] तैनात करण्यापूर्वी, `dist/BUILD_SHA` == `git rev-parse --short HEAD` पुष्टी करा
- [ ] जेथे `node_modules` वास्तविक आहे तेथे बिल्ड चालवणे आवश्यक आहे (मुख्य चेकआउट किंवा `npm ci`'d worktree — NOT एक सिमलिंक केलेले वर्कट्री)
- [ ] धूर चाचणी उपयोजित उदाहरण:
  - उघडा `/dashboard/health` → तपासा आवृत्ती स्ट्रिंग रिलीझ जुळते
  - ज्ञात प्रदात्याविरुद्ध `/v1/chat/completions` विनंती चालवा
  - `/api/monitoring/health` `CLOSED` सर्किट ब्रेकर्स रिटर्न्सची पडताळणी करा
  - MCP वाहतूक प्रतिसादाची पुष्टी करा (`/mcp` HTTP, `/mcp-sse` SSE)

### पोस्ट-रिलीझ

- [ ] `/capture-release-evidences-cc` चालवा (Claude कोड कौशल्य)
  - नवीन वैशिष्ट्यांचे WebP screenshots/recordings कॅप्चर करते
  - रिलीझ नोट्स / ब्लॉग पोस्ट संलग्न करते
- [ ] रिलीजच्या घोषणेसह GitHub चर्चा / Discord अद्यतनित करा
- [ ] पुढील आवृत्तीसाठी मैलाचा दगड उघडा
- [ ] गंभीर असल्यास: ॲप-मधील बॅनरसाठी चर्चा पिन करा किंवा `news.json` मध्ये पोस्ट करा

### रडार सार्वजनिक-लाँच गेट

रडार घोषणा जाणूनबुजून `active: false` सह वचनबद्ध आहे. खालील प्रत्येक आयटमचा पुरावा दिल्यानंतर सक्रिय करणे हा एक वेगळा बदल आहे:

- [ ] सर्व स्टॅक केलेले रडार PRs विलीन केले आहेत आणि रिलीज-टिप CI हिरवा आहे
- [ ] डीफॉल्टनुसार `RADAR_ENABLED` अद्याप बंद असलेले OSS रडार मार्ग तैनात करा आणि धुम्रपान करा
- [ ] नामांकित रडार होस्टवर `GET /planos`, `/termos`, `/privacidade` आणि `/reembolso` धुवा
- [ ] खाजगी सेवेमध्ये रेकॉर्ड ऑपरेटर identity/contact/address आणि मालक-मंजूर कायदेशीर पुनरावलोकन
- [ ] फक्त चाचणी मोडमध्ये स्ट्राइप चेकआउट आणि स्वाक्षरी केलेले वेबहुक व्यायाम करा
- [ ] मंजूर sender/domain सह एक एनक्रिप्टेड व्यवहार-ईमेल वितरणाचा व्यायाम करा
- [ ] बॅकअप पुनर्संचयित करा आणि एक पर्यवेक्षित, बजेट-कॅप्ड संशोधन चालवा
- [ ] देणगीचा पुरावा स्वीकारण्यापूर्वी BRL/PIX पुनरावलोकन धोरण मंजूर करा
- [ ] आधीच्या गेट्सनंतरच सार्वजनिक चेकआउट सक्षम करा, नंतर नवीन `news.json` ID सक्रिय करा
- [ ] होम बॅनर स्थानिकीकृत प्रत वापरत असल्याचे सत्यापित करा आणि जुने ID डिसमिस केल्यानंतर नवीन ID पुन्हा दिसून येईल

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

डेव्हलप बंप कमिट हे गिट प्लंबिंगने तयार केले आहे (कार्यरत झाडाला स्पर्श केला जात नाही) आणि सायकल-ओपन कमिट सारख्याच पाच फायली जोडल्या जातात: `package.json`, `open-sse/package.json`, `electron/package.json`, `package-lock.json` आणि `docs/openapi.yaml`. `[4.0.0]` CHANGELOG विभाग आणि त्याचे i18n मिरर `develop` नंतर, त्याच्या पहिल्या PR आधी उघडले जातात. स्क्रिप्ट कधीही npm dist-tags — स्क्रॅच पॅकेजवर रिहर्सल बदलत नाही.

### PR पूर्वावलोकन आर्टिफॅक्ट (एकदा तयार करा, समान बाइट्सचा प्रचार करा)

`.github/workflows/preview-artifact.yml` PR हेडमधून एक प्रोडक्शन टारबॉल तयार करतो आणि अचूक बिल्ड (#8084 स्लाइस (a)) प्रमाणित करतो. सेम-रिपॉजिटरी PRs फक्त; काहीही प्रकाशित नाही.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # or add the `preview-artifact` label
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo cheaper-inference/OmniRoute
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
