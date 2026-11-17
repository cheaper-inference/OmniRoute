# Quality Gates Reference (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

ഈ പ്രമാണമാണ് OmniRoute-ലെ എല്ലാ CI ഗുണനിലവാര ഗേറ്റുകൾക്കുമുള്ള ആധികാരിക റഫറൻസ്.
ഓരോ ഗേറ്റും, അത് എന്താണ് സാധൂകരിക്കുന്നത്, ഏത് CI ജോബിലാണ് അത് പ്രവർത്തിക്കുന്നത്, അത്
ഒരു റാച്ചറ്റ് ബേസ്ലൈൻ ആണോ അതോ പാസ്/ഫെയിൽ നയമാണോ ഉപയോഗിക്കുന്നത്, ബിൽഡ് തടയുന്നതാണോ അതോ ഉപദേശാത്മകമാണോ എന്നിവ ഇതിൽ വിവരിക്കുന്നു.

ഒരു ഹ്രസ്വ സംഗ്രഹത്തിനും അനുവദനീയ പട്ടികാ നയത്തിനും `AGENTS.md`-ലെ
"ഗുണനിലവാര ഗേറ്റുകളും റാച്ചറ്റുകളും" വിഭാഗം കാണുക. ഇതേ സിസ്റ്റത്തിന്റെ നിർണായക വിലയിരുത്തൽ,
മെച്യൂരിറ്റി വർഗ്ഗീകരണം, ടൂൾ-അഗ്നോസ്റ്റിക് പുനരാവിഷ്കരണ പദ്ധതി എന്നിവയ്ക്കായി
[ഗുണനിലവാര ഗേറ്റ് പ്ലേബുക്ക്](../ops/QUALITY_GATE_PLAYBOOK.md) കാണുക.

---

## ഗേറ്റ് ഇൻവെന്ററിയും എക്സിക്യൂഷൻ പ്രൊഫൈലുകളും

### സ്ഥാനാർഥി സ്വീകരിക്കൽ

CI, Quality Gates വർക്ക്ഫ്ലോകൾ ഓരോന്നും സ്ഥിരമായ ഒരു വിധിനിർണ്ണയം പുറപ്പെടുവിക്കുന്നു: `Gate / CI`, `Gate / Quality`. അവയുടെ പതിപ്പിട്ട സ്വീകരണ നയം ഓരോ upstream ജോബിനെയും നിർബന്ധിതമോ ഉപദേശപരമോ ആയി പട്ടികപ്പെടുത്തുന്നു. ബാധകമായ നിർബന്ധിത ജോബ് വിജയിക്കണം: ലഭ്യമല്ലാത്തത്, റദ്ദാക്കപ്പെട്ടത്, ഒഴിവാക്കപ്പെട്ടത്, കാത്തിരിക്കുന്നതു, അറിയാത്ത ഫലങ്ങൾ എന്നിവയ്ക്ക് PASS സ്ഥാപിക്കാനാവില്ല. സാധുവായ docs-only അല്ലെങ്കിൽ catalog-only വർഗ്ഗീകരണം ഒരു കോഡ് ലെയ്നിനെ ബാധകമല്ലാത്തതാക്കാം; draft PR അംഗീകരിക്കപ്പെട്ട സ്ഥാനാർഥിയല്ല. `hotfix` ലേബൽ തെളിവ് ഒഴിവാക്കുന്നില്ല.

രണ്ട് വർക്ക്ഫ്ലോകളും main/release ബ്രാഞ്ചുകളിലേക്കുള്ള PR-കൾ, `main`-ലേക്കുള്ള pushes, manual dispatch, merge-group ഇവന്റുകൾ എന്നിവ കൈകാര്യം ചെയ്യുന്നു. Push, dispatch, merge-group എന്നിവ full selection പ്രവർത്തിപ്പിക്കുന്നു. `release/**`-ലേക്കുള്ള pushes ഇവ ആരംഭിക്കില്ല (2026-10-18): ഓരോ മാറ്റവും അതിന്റെ PR-ൽ തന്നെ matrix പ്രവർത്തിപ്പിച്ചുകഴിഞ്ഞു, കൂടാതെ merged combination Release-Green-ന്റെ ജോലിയാണ് (`docs/ops/RUNNER_BOX.md` → Hosted lane). Fork-ുകളും merge group-ുകളും സാധാരണ self-hosted runners തിരഞ്ഞെടുക്കുന്ന ജോലികൾക്കായി hosted runners ഉപയോഗിക്കുന്നു; rollout-ന് മുമ്പ് മതിയായ hosted capacity പരിശോധിക്കണം.

ഒരു സാധാരണ PR fast selection പ്രവർത്തിപ്പിക്കുന്നു. സ്വീകരണ നയത്തിലെ `full-code`, `full-code-e2e` ലെയ്നുകൾ (E2E, integration, package artifact, Electron smoke, Bun SQLite, ecosystem, protocol clients) Mergify queue draft-ലോ full run-ലോ മാത്രമേ പ്രവർത്തിക്കൂ:
`gh workflow run ci.yml --ref <branch>`.

ഓരോ JSON receipt-വും checkout ചെയ്ത SHA, workflow run, attempt എന്നിവ തിരിച്ചറിയുന്നു. CLI checkout/event SHA പൊരുത്തക്കേട് നിരസിക്കുന്നു. പുതിയതോ നീക്കംചെയ്തതോ ആയ lane നിശ്ശബ്ദമായി അപ്രത്യക്ഷമാകാതിരിക്കാനായി workflow tests policy membership-നെ verdict job-ന്റെ `needs` ലിസ്റ്റുമായി ബന്ധിപ്പിക്കുന്നു. Receipts അവയുടെ സ്വന്തം workflow-നെ മാത്രമാണ് ഉൾക്കൊള്ളുന്നത്; publication, deployment, അല്ലെങ്കിൽ നിലവിലുള്ള advisory scanner-ന്റെ ആന്തരിക പ്രവർത്തനങ്ങളെ അല്ല. രണ്ട് check പേരുകളും branch rules-ൽ സജീവമാക്കുന്നത് വേറിട്ടൊരു ഭരണപരമായ മാറ്റമാണ്; ഈ ജോബുകൾ ചേർത്തതുകൊണ്ട് മാത്രം ഒരു branch സംരക്ഷിക്കപ്പെടില്ല.

### Merge queue

`queue` ലേബൽ ഒരു PR-നെ Mergify queue-ലേക്ക് (`.mergify.yml`) അയയ്ക്കുന്നു. Mergify `mergify/merge-queue/` ബ്രാഞ്ചിൽ ഒരു draft PR തുറക്കുന്നു, അവിടെ CI full selection പ്രവർത്തിപ്പിക്കുന്നു, കൂടാതെ `Gate / CI`, `Gate / Quality`, `Merge integrity (changelog + generated skills)` എന്നിവ വിജയിച്ചാൽ യഥാർത്ഥ PR merge ചെയ്യുന്നു.

Mergify അതിന്റെ queue summary draft-ന്റെ വിവരണത്തിൽ എഴുതുന്നു, മറ്റ് ആപ്പുകൾക്കും അത് തിരുത്താനാകും. അത്തരമൊരു draft-ലുള്ള `pull_request` `edited` ഇവന്റ് സ്വന്തം concurrency group (`-queue-edit-<run_id>`) ഉപയോഗിക്കുന്നു; അതിനാൽ draft-ന്റെ യഥാർത്ഥ run റദ്ദാക്കാനാവില്ല, കൂടാതെ gate, matrix എന്നിവ ഒഴിവാക്കപ്പെടുന്നു. `Merge integrity` മാത്രമാണ് ഇപ്പോഴും പ്രവർത്തിക്കുന്നത്. ഒഴിവാക്കിയ gate job മറ്റൊരു check പേര് വഹിക്കുന്നു, കാരണം Mergify ഒഴിവാക്കിയ `Gate / CI`-യെ failed check ആയി കണക്കാക്കി PR-നെ queue-യിൽ നിന്ന് നീക്കംചെയ്യുന്നു.

Dequeue ചെയ്തതിന് ശേഷം ഒരു push PR-നെ എല്ലായ്പ്പോഴും വീണ്ടും queue-യിലേക്ക് ചേർക്കണമെന്നില്ല. അതിൽ `@mergifyio queue` എന്ന കമന്റ് ഇടുക.

### Acceptance reducer-ൽ നിലനിർത്തുന്ന തെളിവ്

`scripts/quality/validate-release-acceptance.mjs` നൽകിയിരിക്കുന്ന plan-ഉം അതിന്റെ manifests-ഉം reduce ചെയ്യുന്നു; plan പൂർണ്ണമായ release pipeline ഉൾക്കൊള്ളുന്നുവെന്ന് ഇത് സ്ഥാപിക്കുന്നില്ല. അതിന്റെ reports `releaseAcceptance: false` എന്ന് വ്യക്തമായി സജ്ജീകരിക്കുന്നു, ആ plan `VERIFIED` ആയിരിക്കുമ്പോഴും. `release-acceptance.yml` workflow ഇപ്പോഴും യഥാർത്ഥ build, package, boot, promotion receipts-ുകൾക്ക് പകരം shadow fixtures ഉപയോഗിക്കുന്നു.

നിലനിർത്തിയ തെളിവ് പരിശോധിക്കാൻ CLI-യ്ക്ക് `--evidence-root` ആവശ്യമാണ്. ഫയലുകൾ `<evidence-root>/<artifact_id>/<member>` എന്ന രീതിയിൽ resolve ചെയ്യുകയും SHA-256 ആയി hash ചെയ്യുകയും ചെയ്യുന്നു. തെളിവില്ലാത്ത PASS record, കാണാതായതോ മാറ്റം വരുത്തിയതോ ആയ ഫയൽ, സുരക്ഷിതമല്ലാത്ത path, അല്ലെങ്കിൽ symlink എന്നിവ verification തടയുന്നു. കാണാതായ ഫയലുകൾ ശൂന്യമായ വിജയകരമായ logs-നു തുല്യമല്ല. നിലവിലുള്ള SHA/run/attempt പരിശോധനകൾ സ്വതന്ത്രമായി തുടരുന്നു: പൊരുത്തപ്പെടുന്ന bytes പഴകിയ receipt-നെ രക്ഷിക്കില്ല. File integrity execution authenticity-യുടെയോ artifact promotion-യുടെയോ തെളിവല്ല.

### Static scan ഇൻവെന്ററി

പതിപ്പിട്ട npm-alias inventory-യും static-scan membership-ഉം `config/quality/gate-manifest.json`-ൽ നിലനിൽക്കുന്നു. `package.json`-നുസരിച്ചുള്ള script പേരുകളും കൃത്യമായ commands-ഉം സാധൂകരിക്കാൻ `npm run check:gate-manifest` പ്രവർത്തിപ്പിക്കുക; additions, removals, command drift എന്നിവ local hook-നെയും CI-യിലെ change-classification jobs-നെയും പരാജയപ്പെടുത്തുന്നു. ഒരു alias workflow job-ഓ matrix instance-ഓ test case-ഓ അല്ല: ഈ എണ്ണങ്ങൾ പരസ്പരം മാറ്റിസ്ഥാപിക്കാവുന്നതായി അവതരിപ്പിക്കരുത്.

തിരഞ്ഞെടുത്ത aliases പ്രവർത്തിപ്പിക്കാതെ പരിശോധിക്കാൻ `npm run quality:scan -- --list` അല്ലെങ്കിൽ `npm run quality:scan:fast -- --list` ഉപയോഗിക്കുക. runner npm entrypoint വിളിക്കുന്നതിനാൽ അതിന്റെ runtime (ക്രമീകരിച്ചിരിക്കുന്നിടത്ത് Bun ഉൾപ്പെടെ) നിലനിർത്തപ്പെടുന്നു. ആ profiles-ന് പുറത്തുള്ള aliases വേർതിരിച്ച് invoke ചെയ്യുന്നതായി manifest രേഖപ്പെടുത്തുന്നു, കൂടാതെ read-only scan profiles-ൽ maintenance commands നിരോധിച്ചിരിക്കുന്നു.

ഈ profiles static scan-നെ മാത്രമാണ് ഉൾക്കൊള്ളുന്നത്. Product tests, coverage, packaging, external checks, അല്ലെങ്കിൽ ഒരു സ്ഥാനാർഥിയുടെ പൂർണ്ണ release acceptance എന്നിവ ഇവ സാക്ഷ്യപ്പെടുത്തുന്നില്ല. Workflow admission, ബന്ധിപ്പിച്ചിരിക്കുന്ന `config/quality/admission-policy.json`, `scripts/quality/admission-verdict.mjs` എന്നിവ ഉപയോഗിക്കുന്നു. Release-observer profiles വേർതിരിച്ചാണ് നിലനിൽക്കുന്നത്; അവയുടെ ബാധകമായ checks-ഉം receipts-ഉം സ്വതന്ത്രമായി പരിശോധിക്കുക. Full observer-ന്റെ static commands `config/quality/release-green-static-profile.json`-ൽ പ്രഖ്യാപിച്ചിരിക്കുന്നു; ഇതിൽ `audit:deps`, mutation-test selection, translation checks എന്നിവ ഉൾപ്പെടുന്നു. Loader `package.json`-നെതിരെ npm commands-ഉം modeled CI/Quality declarations-ഉം സാധൂകരിക്കുന്നു; shell tokens arguments ആയി execute ചെയ്യുന്നതിനുപകരം drift നിരസിക്കുന്നു. Required scanner SKIP/INCOMPLETE output-ന് PASS സ്ഥാപിക്കാനാവില്ല. Profile അതിന്റെ external exclusions രേഖപ്പെടുത്തുന്നു; hosted coverage, test matrices, package, deployment evidence എന്നിവയ്ക്ക് പകരമാകുന്നില്ല. താഴെയുള്ള prose inventory ഒരു reference മാത്രമാണ്; ഒരു gate യഥാർത്ഥത്തിൽ പ്രവർത്തിച്ചുവെന്നതിന് തെളിവല്ല.

Scripts `scripts/check/` (policy gates), `scripts/quality/` (ratchet engine) എന്നിവയ്ക്കു കീഴിലാണ്. CI-യുടെ source of truth `.github/workflows/ci.yml` ആണ്.

### Release PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` main/release PR-കളിലും, `main`-ലേക്കുള്ള pushes-ലും, dispatch-ലും, merge groups-ലും CI-യെ പൂരിപ്പിക്കുന്നു. PR-കൾ path-filtered fast checks ഉപയോഗിക്കുന്നു. സ്ഥിരമായി disabled ആയിരുന്ന duplicate build നീക്കംചെയ്തു; യഥാർത്ഥ build/package/boot checks CI-ൽ തുടരുന്നു. Unit suite-യും vitest-ഉം CI-ൽ മാത്രം പ്രവർത്തിക്കുന്നു (`Unit Tests (N/8)`, `Vitest`).

| ജോലി                                             | പരിധി                                                                                                                                            | തടയൽ                |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `Docs Gates (fast-path)`                         | ഡോക്സ്/കോഡ് PRകൾ; API ഡോക്സ് റഫറൻസുകളും docs-all-ഉം                                                                                              | അതെ                 |
| `Fast Quality Gates`                             | കോഡ് PRകൾ; സ്റ്റാറ്റിക് പരിശോധനകൾ, ടൈപ്പ് ചെക്ക്, ഡാഷ്ബോർഡ് ടൈപ്പ് ചെക്ക്, ബാധിച്ച യൂണിറ്റ് ടെസ്റ്റുകൾ, മറന്നുപോയ സഹോദര ടെസ്റ്റുകൾ (അറിയിപ്പായി) |
| `No new ESLint warnings`                         | കോഡ് PRകൾ; suppressions-aware lint guard                                                                                                         | അതെ, forks ഉൾപ്പെടെ |
| `Merge integrity (changelog + generated skills)` | ഡ്രാഫ്റ്റ് അല്ലാത്ത PRകൾ; ചേഞ്ച്ലോഗും ജനറേറ്റ് ചെയ്ത സ്കിൽ സിങ്കും                                                                               | അതെ, forks ഉൾപ്പെടെ |

#### മറന്നുപോയ സഹോദര ടെസ്റ്റുകളുടെ റിപ്പോർട്ട്

`npm run check:forgotten-sibling-tests` എന്നത് `Fast Quality Gates`-ന്റെ ഒരു അറിയിപ്പ് ഘട്ടമായി പ്രവർത്തിക്കുകയും
ടെസ്റ്റ്-ഇംപാക്ട് മാപ്പിന് പിന്നിലെ അതേ ഇംപോർട്ട് റിസോൾവർ വീണ്ടും ഉപയോഗിക്കുകയും ചെയ്യുന്നു.
മാറ്റം വരുത്തിയ ഓരോ പ്രൊഡക്ഷൻ മോഡ്യൂളിനും, പുൾ റിക്വസ്റ്റ് ഡിഫിൽ സ്ഥാനാർഥി
ടെസ്റ്റ് ഇല്ലാത്തപ്പോൾ, നിർണായകമായ
`changed module/symbol -> static consumer -> candidate sibling test` ശൃംഖലകൾ ഇത് റിപ്പോർട്ട് ചെയ്യുന്നു. Markdown സംഗ്രഹവും JSON ഫലവും
തടയുന്ന റോൾഔട്ടിന് മുമ്പുള്ള കാലിബ്രേഷനായി `forgotten-sibling-tests` വർക്ക്ഫ്ലോ ആർട്ടിഫാക്റ്റായി സൂക്ഷിക്കുന്നു.

Barrel re-exports-ഉം dynamic imports-ഉം resolution diagnostics മാത്രമാണ്; അവ ഒരിക്കലും
തടയുന്ന കണ്ടെത്തൽ സൃഷ്ടിക്കില്ല. പരിശോധിച്ച ഒഴിവാക്കലുകൾ
`config/quality/forgotten-sibling-allowlist.json`-ൽ നിലനിൽക്കുന്നു. ഓരോ എൻട്രിയും consumer-നെയും candidate
test-നെയും വ്യക്തമാക്കുകയും, വ്യക്തമായ കാരണം നൽകുകയും, ഒരു GitHub issue അല്ലെങ്കിൽ pull request-ലേക്ക് ലിങ്ക് ചെയ്യുകയും വേണം. തെറ്റായ ഘടനയുള്ള എൻട്രികൾ അടച്ച നിലയിൽ പരാജയപ്പെടും. ഒഴിവാക്കലുകൾക്ക് ഇല്ലാതാക്കിയ candidate test-നെയോ `.skip`/`.todo` ചേർക്കുന്ന diff-നെയോ അടിച്ചമർത്താനാകില്ല;
assertion ദുർബലപ്പെടുത്തലും മറ്റ് masking-ഉം സ്വതന്ത്രമായി തടയുന്ന
`check:test-masking` ഗേറ്റിന്റെ ഉത്തരവാദിത്തത്തിലാണ്.

### ജോലി: `lint`

`main`-ലേക്കുള്ള എല്ലാ PRകളിലും ഇത് പ്രവർത്തിക്കുന്നു. പരാജയപ്പെട്ടാൽ merge തടയും.

| Script (`npm run ...`)            | Validates                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Blocking                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | Node.js പതിപ്പ് പിന്തുണയ്ക്കുന്ന പരിധിക്കുള്ളിലാണോ എന്ന് പരിശോധിക്കുന്നു                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | അതെ                                         |
| `check:cycles`                    | `src/` + `open-sse/` എന്നിവയിലുടനീളമുള്ള ചാക്രിക ഇമ്പോർട്ടുകൾ (AST-അടിസ്ഥാനത്തിലുള്ളത്, tsconfig `paths` പരിഹരിച്ചിരിക്കുന്നു). ഏതെങ്കിലും ചാക്രികത നിലവിലുണ്ടെങ്കിൽ Bare എപ്പോഴും 1 എന്ന നിലയിൽ പുറത്തുകടക്കുകയും ( #15281 മുതൽ fail-closed) SCC-കൾ പട്ടികപ്പെടുത്തുകയും ചെയ്യുന്നു. `check:cycles:ratchet` (CI പ്രവർത്തിപ്പിക്കുന്നത്) `quality-baseline.json`-ലെ `metrics.cycles` പരിധി കവിയുമ്പോൾ തടയുന്നു — നിലവിൽ 14, `direction: down`, അതിനാൽ ഇത് കുറയുക മാത്രമേ ചെയ്യാനാകൂ (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | അതെ (ratchet)                               |
| `check:boundary`                  | `open-sse → src` കപ്ലിംഗ്: എഞ്ചിനിൽ നിന്ന് ആപ്പിലേക്കുള്ള ഫയൽ-ടു-ഫയൽ ഇമ്പോർട്ടുകളുടെ തനത് എണ്ണം (`scripts/quality/measure-boundary.mjs`; എഡ്ജ് ലിസ്റ്റ് v4 core/module-split പരിഹാര ബാക്ക്ലോഗാണ്). Bare = ഉപദേശാത്മക റിപ്പോർട്ട് (`quality:boundary`-ന് സമാനം). `check:boundary:ratchet` (CI പ്രവർത്തിപ്പിക്കുന്നത്, `quality.yml`-ലെ fast-gates ratchet ലൂപ്പിലും ഉൾപ്പെടുന്നു) `quality-baseline.json`-ലെ `metrics.boundaryOpenSseToSrc` പരിധി കവിയുമ്പോൾ തടയുന്നു — അളന്ന 771-ൽ സീഡ് ചെയ്തിരിക്കുന്നു, `direction: down`; `--update` ഉപയോഗിച്ച് ഇത് കുറയ്ക്കാൻ മാത്രമേ കഴിയൂ; PR-കളിൽ base-relative (`--base-ref`, താഴെ കാണുക)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | അതെ (ratchet)                               |
| `check:route-validation:t06`      | എല്ലാ റൂട്ടുകളിലും Zod സ്കീമകൾ നിലവിലുണ്ടോ എന്ന് പരിശോധിക്കുന്നു (Tier 6 നയം)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | അതെ                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` എണ്ണ ബജറ്റിനെ കവിയുന്നില്ല (ടിയർ 11 കത്റാക്ക)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | അതെ                                         |
| `check:provider-consistency`      | `providers.ts`-ലുള്ള ഓരോ provider-നും `providerRegistry.ts`-ൽ പൊരുത്തപ്പെടുന്ന എൻട്രിയുണ്ട് (അതിന്റെ വിപരീതവും, allowlist-നുള്ളിൽ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | അതെ                                         |
| `check:model-lifecycle`           | കൈകൊണ്ട് പരിപാലിക്കുന്ന മൂന്ന് routing പട്ടികകൾ checked-in lifecycle snapshot (#11503)-നുമായി സ്ഥിരത പുലർത്തുന്നു: `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY`-ന് route ചെയ്യാൻ കഴിയുന്ന വിരമിച്ച id-കൾക്ക് സ്കോർ നൽകുന്നില്ല; ഓരോ `BUILT_IN_ALIASES` target-വും `REGISTRY`-ൽ ഉണ്ടായിരിക്കുകയും വിരമിച്ച-id snapshot-ൽ ഇല്ലാതിരിക്കുകയും ചെയ്യുന്നു; `REGISTRY`-ൽ ഇപ്പോഴും ഉള്ള ഓരോ വിരമിച്ച id-യും forward ചെയ്യപ്പെടുകയോ `allowedRetiredInCatalog`-ൽ പട്ടികപ്പെടുത്തിയിരിക്കുകയോ ചെയ്യുന്നു; കൂടാതെ snapshot-ൽ `DEFAULT_DEGRADATION_MAP`-ന്റെ source-ഓ target-ഓ വിരമിച്ചതായി രേഖപ്പെടുത്തിയിട്ടില്ല. ഒരു മോഡൽ നിലവിൽ live upstream വഴി സേവനം ലഭിക്കുന്നുണ്ടെന്ന് ഇത് തെളിയിക്കുന്നില്ല. Offline — `config/quality/model-lifecycle.json`-നുമായി താരതമ്യം ചെയ്യുന്നു; ഇത് കൈകൊണ്ട് `npm run quality:refresh-model-lifecycle` ഉപയോഗിച്ച് പുതുക്കുന്നു (നെറ്റ്വർക്ക് ആവശ്യമാണ്; CI-യിൽ ബന്ധിപ്പിച്ചിട്ടില്ല). `allowedRetiredInCatalog` ഒരു burn-down ratchet ആണ്: tracking issue ഉള്ളപ്പോൾ മാത്രം ഒരു എൻട്രി ചേർക്കുക.                                                                                                              | അതെ                                         |
| `check:fetch-targets`             | client-side `src/`-ലുള്ള ഓരോ `fetch("/api/...")`-ഉം യഥാർത്ഥ `route.ts`-ലേക്ക് resolve ചെയ്യുന്നു                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | അതെ                                         |
| `check:deps`                      | റിപ്പോസിറ്ററിയിലെ എല്ലാ `package.json` ഫയലുകളിലുമുള്ള `npm install` ചെയ്യാവുന്ന എല്ലാ deps-ഉം `dependency-allowlist.json`-ൽ ഉൾപ്പെട്ടിരിക്കുന്നു; പുതിയ unpinned അല്ലെങ്കിൽ slopsquatted packages ഫ്ലാഗ് ചെയ്യുന്നു                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | അതെ                                         |
| `audit:deps`                      | സ്വതന്ത്രമായ അഞ്ച് lockfile-കളുടെയും (root, Electron, OpenCode plugins v1/v2, provider) npm audit. Critical advisories ബ്ലോക്ക് ചെയ്യുന്നു; high advisories ദൃശ്യമായ മുന്നറിയിപ്പുകളായി തുടരുന്നു. ലഭ്യമല്ലാത്തതോ പരാജയപ്പെട്ടതോ ആയ audits INCOMPLETE ആയി കണക്കാക്കി ബ്ലോക്ക് ചെയ്യുന്നു; ഓരോ scope-ിനുമുള്ള lock hash-ുകളും reports-ുകളും സൂക്ഷിക്കുന്നു.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | അതെ                                         |
| `check:lockfile`                  | `package-lock.json` സമഗ്രത — https രജിസ്ട്രി, സമഗ്രത ഹാഷുകൾ, ഹോസ്റ്റ് ഓവർറൈഡുകളില്ല                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | അതെ                                         |
| `check:licenses`                  | പ്രൊഡക്ഷൻ ഡിപെൻഡൻസികൾക്കായുള്ള SPDX ലൈസൻസ് അനുവദനീയ പട്ടിക                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | അതെ                                         |
| `check:tracked-artifacts`         | ബിൽഡ് ആർട്ടിഫാക്റ്റുകളില്ല / കമ്മിറ്റ് ചെയ്ത `node_modules` സിംലിങ്കുകളില്ല (husky pre-commit-ലും പ്രവർത്തിക്കുന്നു; pre-push ഉദ്ദേശപൂർവ്വം ലഘുവാണ് — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | അതെ                                         |
| `check:ai-attribution`            | PR കമ്മിറ്റുകളിലെ, ശീർഷകത്തിലെ അല്ലെങ്കിൽ ഉള്ളടക്കത്തിലെ AI/bot `Co-Authored-By` ട്രെയിലറോ AI-ജനറേഷൻ ഫൂട്ടറോ ഇല്ല — ഹാർഡ് റൂൾ #16 (`quality.yml`-ലെ PR→`release/**` fast-gates ലൂപ്പിൽ — ഇവന്റ് പേലോഡ് വായിക്കുന്നു, PR-കൾക്ക് പുറത്താണെങ്കിൽ no-op — കൂടാതെ PR→`main`-നുള്ള `ci.yml` lint-ലെ PR-മാത്രമുള്ള ഘട്ടം; husky `commit-msg` ഹുക്കിലും; മനുഷ്യ സഹ-രചയിതാക്കൾ അനുവദനീയമാണ്; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | ഓരോ Vitest ഒഴിവാക്കലും ഒരു ട്രാക്കിംഗ് ഇഷ്യൂ വ്യക്തമാക്കുകയും `config/quality/vitest-exclusions.json`-ൽ പ്രത്യക്ഷപ്പെടുകയും വേണം (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | അതെ                                         |
| `check:file-size`                 | സോഴ്സ് ഫയലുകൾ (`.ts`/`.tsx` `src/`, `open-sse/`, `electron/`, `bin/` എന്നിവയിൽ) `cap` പരിധിക്കുള്ളിലും ടെസ്റ്റ് ഫയലുകൾ (`*.test.ts(x)`) `testCap` പരിധിക്കുള്ളിലും തുടരണം; `file-size-baseline.json`-ൽ ഫ്രീസ് ചെയ്ത ഫയലുകൾ (`frozen` / `testFrozen`) രേഖപ്പെടുത്തിയ വലുപ്പത്തേക്കാൾ വളരരുത്                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | അതെ                                         |
| `check:error-helper`              | executors/handlers-ലുള്ള പിശക് പ്രതികരണങ്ങൾ `buildErrorBody()` / `sanitizeErrorMessage()` ഉപയോഗിക്കുന്നു (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | അതെ                                         |
| `check:migration-numbering`       | Migration SQL ഫയലുകൾ തുടർച്ചയായ നമ്പറുകളിലാണ്; ഇടവിടുകളോ ആവർത്തനങ്ങളോ ഇല്ല                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | അതെ                                         |
| `check:public-creds`              | `publicCreds.ts`-ന് പുറത്തായി ലിറ്ററൽ OAuth `client_id`/`client_secret` അല്ലെങ്കിൽ Firebase Web കീകൾ ഇല്ല (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | അതെ                                         |
| `check:db-rules`                  | `src/lib/db/` മോഡ്യൂളുകൾക്ക് പുറത്തായി raw SQL ഇല്ല; `localDb.ts`-ൽ നിന്ന് barrel-imports ഇല്ല (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | അതെ                                         |
| `check:known-symbols`             | dispatch tables-ൽ രജിസ്റ്റർ ചെയ്ത Provider executors, routing strategies, translators എന്നിവ ഡിസ്കിലുള്ള ഫയലുകളുമായി പൊരുത്തപ്പെടുന്നു — orphaned അല്ലെങ്കിൽ undeclared symbols ഇല്ല                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | അതെ                                         |
| `check:route-guard-membership`    | child process ആരംഭിക്കുന്ന ഓരോ route-ഉം `isLocalOnlyPath()` ഉപയോഗിച്ച് വർഗ്ഗീകരിച്ചിരിക്കുന്നു (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | അതെ                                         |
| `check:test-discovery`            | റിപ്പോസിറ്ററിയിലെ എല്ലാ `*.test.ts` / `*.spec.ts` ഫയലുകളും കുറഞ്ഞത് ഒരു ടെസ്റ്റ് റണ്ണറെങ്കിലും ശേഖരിക്കുന്നു (റാച്ചെറ്റ്: `test-discovery-baseline.json`-ലെ അനാഥ പട്ടികയിൽ കുറവ് മാത്രമേ വരാവൂ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | അതെ                                         |
| `check:test-tla-order`            | `tests/unit`-ന് കീഴിലുള്ള ഒരു `node:test` ഫയലും ഒരു ടെസ്റ്റ് രജിസ്റ്റർ ചെയ്ത ശേഷം top-level `await` കൈവരിക്കുകയും തുടർന്ന് കൂടുതൽ ടെസ്റ്റുകൾ രജിസ്റ്റർ ചെയ്യുകയും ചെയ്യുന്നില്ല (#18045; റാച്ചെറ്റ്: `test-tla-order-allowlist.json`-ൽ കുറവ് മാത്രമേ വരാവൂ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | അതെ                                         |
| `check:agent-skills-sync`         | ജനറേറ്റ് ചെയ്ത agent-skills ആർട്ടിഫാക്റ്റുകൾ അവയുടെ ഉറവിട കാറ്റലോഗുമായി പൊരുത്തപ്പെടുന്നു (വ്യതിയാനമില്ല). റിലീസ് മോഡ് എല്ലാ skill-കളും പരിശോധിക്കുന്നു; ഒരു feature PR (`pr` mode) അതിന്റെ ജനറേറ്റ് ചെയ്ത ടെക്സ്റ്റ് തിരുത്തുന്ന skill-കൾ മാത്രം പരിശോധിക്കുന്നു — [ജനറേറ്റ് ചെയ്ത ഫയലുകളും ഡിറൈവ്ഡ് ബേസ്ലൈനുകളും](#generated-files-and-derived-baselines-written-at-release) കാണുക                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | Provider ലോഗോകൾ/ആസറ്റുകൾക്ക് രേഖപ്പെടുത്തിയ provenance എൻട്രി ഉണ്ടായിരിക്കണം                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | JSON കോൺഫിഗറേഷൻ ഫയലുകൾ പാഴ്സ് ചെയ്യുകയും റിപ്പോയുടെ lint നിയമങ്ങൾ പാലിക്കുകയും ചെയ്യുന്നു                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | പിശകുകളില്ലാത്ത TypeScript കംപൈലേഷൻ (അറിയിപ്പു മുന്നറിയിപ്പുകൾ മാത്രം)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | അതെ                                         |
| `typecheck:noimplicit:core`       | കർശനമായ `noImplicitAny` — ഭാവിയിലേക്ക് നോക്കുന്ന പരിശോധന; മുമ്പ് നിലവിലുണ്ടായിരുന്ന നിരവധി call site-ുകൾക്ക് ഇപ്പോഴും annotations ആവശ്യമാണ്                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **ഉപദേശാത്മകം** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` പരിധിയിൽ മാത്രം പ്രവർത്തിക്കുന്ന `tsc` (#7033) — `typecheck:core`-യുടെ തിരഞ്ഞെടുത്ത 27-ഫയൽ allowlist-ൽ dashboard-ിലെ ഒരു TSX ഫയലും ഉൾപ്പെടുന്നില്ല; കൂടാതെ `next.config.mjs`-ൽ `ignoreBuildErrors: true` സജ്ജീകരിച്ചിരിക്കുന്നതിനാൽ `next build` അതിലും type-check നടത്തില്ല. അതിനാൽ അവിടെയുള്ള orphaned-identifier regression-ുകൾ (#6625/#6909) CI-യിൽ കാണപ്പെടാതെ പോയിരുന്നു. ഓരോ ഫയലിനും/TS code-നും ഉള്ള ഉറച്ച baseline എണ്ണവുമായി (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` പോലെയുള്ള അതേ stale-enforcement മാതൃക) വ്യത്യാസം പരിശോധിക്കുന്നു — baselined count-നെക്കാൾ കൂടുതലായി പുതുതായി വന്ന പിശകുകൾ മാത്രമാണ് gate പരാജയപ്പെടുത്തുന്നത്; മുമ്പുണ്ടായിരുന്ന ഒരു പിശക് പരിഹരിക്കുമ്പോൾ `--update` ഉപയോഗിച്ച് എണ്ണം കുറയ്ക്കാം.                                                                                                                                                                                                                                                                                                                                       | അതെ                                         |
| `check:build-typecheck`           | `tsconfig.build.json` വഴി മുഴുവൻ ആപ്പിന്റെ production type check നടത്തുന്നു (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`); `typecheck:core`-യുടെ 27-ഫയൽ allowlist-ും dashboard gate-ും ഉൾക്കൊള്ളാത്ത പരിധിയാണിത്. `config/quality/build-typecheck-baseline.json`-വുമായി വ്യത്യാസം പരിശോധിക്കുന്നു; ഓരോ (ഫയൽ, code) എണ്ണത്തിലും പുതുതായി വന്നതോ വർധിച്ചതോ ആയ എണ്ണം gate പരാജയപ്പെടുത്തും, കുറഞ്ഞ എണ്ണം ratchet ചെയ്യാൻ ആവശ്യപ്പെടും. റൺ സമയത്ത് പുതുതായി വന്നതോ വർധിച്ചതോ ആയ ഒരു pair ഉണ്ടെങ്കിൽ `--update` നിരസിക്കും; `--force-regressions` നൽകിയാൽ മാത്രമേ അത് അനുവദിക്കൂ. അതുപോലെ, പുതുതായി നിശ്ശബ്ദമാക്കിയ ഒരു ഫയലും `--force-nocheck` നൽകിയില്ലെങ്കിൽ നിരസിക്കും. അതിനാൽ green ആക്കാൻ baseline വിശാലമാക്കുന്നതും സ്ഥിരമായ ഒരു silence അനുവദിക്കുന്നതും വേർതിരിച്ചുള്ള, ഉദ്ദേശപൂർവമായ രണ്ട് നടപടികളാണ്. വെറും `--force` നിരസിക്കപ്പെടും. കൂടാതെ `@ts-nocheck` ഉപയോഗിക്കുന്ന ഫയലുകൾക്കായി build scope-നെ `config/quality/ts-nocheck-baseline.json`-നെതിരെ പരിശോധിക്കുന്നു; അത്തരത്തിലുള്ള ഫയൽ യാതൊരു diagnostics-ഉം റിപ്പോർട്ട് ചെയ്യാത്തതിനാൽ, അല്ലാത്തപക്ഷം എല്ലാ gate-ുകളിലും അത് കാണപ്പെടാതെ പോകും. | അതെ                                         |

#### രണ്ട് typecheck പ്രോഗ്രാമുകൾ വ്യത്യസ്ത ഉത്തരങ്ങൾ നൽകുന്നു

`typecheck:core`-യും `check:build-typecheck`-വും വ്യത്യസ്ത options-ുകൾക്ക് കീഴിൽ വ്യത്യസ്ത
program-ുകൾ compile ചെയ്യുന്നു; അതിനാൽ ഒരേ ഫയൽ ഒന്നിൽ പിശകുകളില്ലാത്തതും മറ്റൊന്നിൽ
പിശകുകൾ നിറഞ്ഞതുമായിരിക്കാം.

`tsconfig.build.json`-ൽ `"strict": false` സജ്ജീകരിച്ചിരിക്കുന്നതിനാൽ `noImplicitAny` ഓഫ് ആണ്. Core
config കൂടുതൽ കർശനമായ options-ുകളോടെ തിരഞ്ഞെടുത്ത 27-ഫയൽ allowlist compile ചെയ്യുകയും ഓരോ
entry-യുടെയും import graph പിന്തുടരുകയും ചെയ്യുന്നു; അതിനാൽ build program-ിൽ ഒരിക്കലും
പ്രത്യക്ഷപ്പെടാത്ത ഫയലുകൾ പോലും അവിടെ പരിശോധിക്കപ്പെടുന്നു.

ഒരു ഫയൽ typed ആണോ എന്ന് വിലയിരുത്തുമ്പോൾ ഈ ഫലം പ്രധാനമാണ്: `check:build-typecheck`-ന്
കീഴിൽ diagnostics ഇല്ലെന്നത് **ഒന്നുമില്ല എന്നർത്ഥമല്ല**. 26 ഫയലുകളിൽ നിന്ന്
`@ts-nocheck` നീക്കം ചെയ്തപ്പോൾ, build program-ിൽ അവയിൽ 23 എണ്ണം വൃത്തിയായി നിന്നു;
അവയിൽ പതിനാറെണ്ണം strict program-ിൽ ഏകദേശം 120 implicit-any പിശകുകൾ പുറത്തുകൊണ്ടുവന്നു.
ഒരു ഫയൽ വൃത്തിയാണെന്ന് പറയുന്നതിന് മുമ്പ് രണ്ടും പരിശോധിക്കുക.

### Job: `quality-gate`

`test-coverage`-ന് ശേഷം പ്രവർത്തിക്കുന്നു. പരാജയപ്പെട്ടാൽ merge തടയും.

| സ്ക്രിപ്റ്റ്                 | സാധൂകരിക്കുന്നത്                                                                                                                                                                                            | തടയുന്നത്                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | `quality-metrics.json` പുറപ്പെടുവിക്കുന്നു (ESLint മുന്നറിയിപ്പുകളുടെ എണ്ണം, ലയിപ്പിച്ച shard റിപ്പോർട്ടിൽ നിന്നുള്ള coverage)                                                                              | അതെ (ratchet-ന്റെ upstream) |
| `quality:ratchet`            | `quality-baseline.json`-ലെ ഓരോ metric-വും regression സംഭവിച്ചിട്ടില്ല (ESLint മുന്നറിയിപ്പുകൾ ≤ baseline; coverage ≥ baseline)                                                                              | അതെ                         |
| `check:duplication`          | കോഡ് duplication (jscpd@4) `quality-baseline.json`-ലെ baseline കവിയുന്നില്ല                                                                                                                                 | അതെ                         |
| `check:complexity`           | ഫയൽ-തല cyclomatic complexity cap കവിയുന്നില്ല (core ESLint `complexity` + `max-lines-per-function`)                                                                                                         | അതെ                         |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — പ്രത്യേക ESLint pass; CI രണ്ടും ലയിപ്പിച്ച് ഒറ്റ `check:complexity-ratchets` ഘട്ടമായി പ്രവർത്തിപ്പിക്കുന്നു                                        | അതെ                         |
| `check:dead-code`            | ഉപയോഗിക്കാത്ത exports / files ratchet (knip) baseline-നെ അപേക്ഷിച്ച് regression സംഭവിക്കുന്നില്ല                                                                                                            | അതെ                         |
| `check:compression-budget`   | Compression benchmark budget — ഓരോ engine-നുമുള്ള token-savings floors regression സംഭവിക്കാതെ നിലനിൽക്കണം                                                                                                   | അതെ                         |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) regression സംഭവിക്കുന്നില്ല; `typecheck:noimplicit:core`-നെ പ്രധാനമായും ഉൾക്കൊള്ളുന്നു                                                                              | അതെ                         |
| `check:codeql-ratchet`       | Open CodeQL alert-ുകളുടെ എണ്ണം regression സംഭവിക്കുന്നില്ല (`gh api` വഴി വായിക്കുന്നു; token ഇല്ലെങ്കിൽ graceful-skip ചെയ്യുന്നു) — refresh cadence-നും manual trigger-നും താഴെയുള്ള "CodeQL ratchet" കാണുക | അതെ                         |

### Job: `quality-extended`

മുഴുവൻ job-ഉം advisory ആണ് (`continue-on-error: true`). npm-അടിസ്ഥാനത്തിലുള്ള ratchet-ുകൾ യഥാർത്ഥത്തിൽ പ്രവർത്തിക്കുന്നു; ബാഹ്യ scanner-ുകൾ `gh release download` വഴി ഇൻസ്റ്റാൾ ചെയ്യുകയും binary ഇപ്പോഴും ലഭ്യമല്ലെങ്കിൽ സ്വയം skip ചെയ്യുകയും ചെയ്യുന്നു (exit 0).

| സ്ക്രിപ്റ്റ്             | സാധൂകരിക്കുന്നത്                                                                                                                                                                                                                                      | തടയുന്നത്                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `check:circular-deps`    | Circular dependencies ഇല്ല (dpdm)                                                                                                                                                                                                                     | **Advisory**                                      |
| `check:bundle-size`      | Bundle size cap കവിയുന്നില്ല                                                                                                                                                                                                                          | **Advisory**                                      |
| `check:secrets`          | Secret scanning (gitleaks) — binary ലഭ്യമല്ലെങ്കിൽ skip ചെയ്യുന്നു                                                                                                                                                                                    | **Advisory**                                      |
| `check:vuln-ratchet`     | Dependency vulnerabilities (osv-scanner) regression സംഭവിക്കുന്നില്ല — അളക്കാത്തപ്പോൾ `--ratchet` INCOMPLETE ആയി പരാജയപ്പെടുന്നു (exit 2)                                                                                                             | **Advisory**                                      |
| `check:workflows`        | Workflow lint (actionlint + zizmor); scanner-ുകൾ ഇല്ലാതിരിക്കുക/തകരാറിലാകുക, അസാധുവായ reports, അല്ലെങ്കിൽ ratchet baseline ഇല്ലാതിരിക്കുക എന്നിവ INCOMPLETE ആയി പരാജയപ്പെടും. സാധുവായ findings തിരഞ്ഞെടുത്ത strict/advisory/ratchet policy പിന്തുടരും | Execution required; zizmor ratchet blocking in CI |
| `check:openapi-breaking` | Pin ചെയ്ത event commits-നെതിരായ Public API contract (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); ആവശ്യമായ measurement പരാജയപ്പെടുമ്പോൾ fail closed                                                         | **Blocking with --ratchet**                       |

### Job: `docs-sync-strict`

`main`-ലേക്കുള്ള എല്ലാ PR-കളിലും പ്രവർത്തിക്കുന്നു. പരാജയപ്പെട്ടാൽ merge തടയുന്നു.

| Script                         | സാധൂകരിക്കുന്നത്                                                                                                                                                                              | തടയുന്നത്                 |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check:docs-all`               | താഴെയുള്ള 6 ഉപ-ഗേറ്റുകൾ ക്രമമായി പ്രവർത്തിപ്പിക്കുന്ന മെറ്റാ-ഗേറ്റ്                                                                                                                           | അതെ                       |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI പതിപ്പ് ഏകോപനം; റിലീസ് മോഡിൽ 66 `llm.txt` മിററുകളും വിവർത്തനം ചെയ്ത CHANGELOG വിഭാഗങ്ങളും കൂടി (PR മോഡിൽ: മിററുകൾ ഏകോപിതമാണോ എന്ന് പരിശോധിക്കുന്നു)                       | അതെ                       |
| ↳ `check:docs-counts`          | പ്രോസിലെ എണ്ണങ്ങൾ (provider എണ്ണം, migration എണ്ണം മുതലായവ). രണ്ട് മോഡുകൾ: feature PR-കൾക്ക് `pr`, മറ്റിടങ്ങളിൽ `release` — താഴെയുള്ള "Derived values" കാണുക                                  | അതെ                       |
| ↳ `check:env-doc-sync`         | `.env.example`-ലുള്ള എല്ലാ env var-കളും ഒരു docs പട്ടികയിൽ രേഖപ്പെടുത്തിയിട്ടുണ്ടെന്നും തിരിച്ചും ഉറപ്പാക്കുന്നു                                                                              | അതെ                       |
| ↳ `check:deprecated-versions`  | docs-ൽ deprecated പതിപ്പ് സ്ട്രിംഗുകളൊന്നുമില്ലെന്ന് ഉറപ്പാക്കുന്നു                                                                                                                           | അതെ                       |
| ↳ `check:doc-links`            | docs-ലുള്ള ആന്തരിക markdown ലിങ്കുകൾ യഥാർത്ഥ ഫയലുകളിലേക്ക് പരിഹരിക്കപ്പെടുന്നുവെന്ന് ഉറപ്പാക്കുന്നു (`[text]`/`(path)` രൂപം)                                                                  | അതെ                       |
| ↳ `check:fabricated-docs`      | docs-ൽ പരാമർശിച്ചിരിക്കുന്ന routes, env vars, CLI commands, hook names, file paths എന്നിവ codebase-ൽ നിലവിലുണ്ടെന്ന് ഉറപ്പാക്കുന്നു. `--strict` ഉപയോഗിച്ച് hard gate; flag ഇല്ലാതെ soft-fail. | CI-യിൽ `--strict` വഴി അതെ |
| `check:cli-i18n`               | CLI `t()` കീകൾ `bin/cli/locales/en.json`-ൽ നിലവിലുണ്ടെന്ന് ഉറപ്പാക്കുന്നു (രണ്ട് മോഡുകളിലും); `en.json`-നോടുള്ള pt-BR / zh-CN / zh-TW സമതുല്യത റിലീസ് മോഡിൽ മാത്രം                            | അതെ                       |
| `check:openapi-coverage`       | OpenAPI സ്പെക് യഥാർത്ഥ routes-ന്റെ ratchet ചെയ്ത കുറഞ്ഞ പരിധിയെങ്കിലും ഉൾക്കൊള്ളുന്നുവെന്ന് ഉറപ്പാക്കുന്നു                                                                                    | അതെ                       |
| `check:openapi-security-tiers` | `openapi.yaml`-ലെ security tier annotation-കൾ `routeGuard.ts`-ലെ വർഗ്ഗീകരണങ്ങളുമായി ഏകോപിതമാണെന്ന് ഉറപ്പാക്കുന്നു                                                                             | **ഉപദേശാത്മകം**           |
| `check:openapi-routes`         | `openapi.yaml`-ലെ എല്ലാ path-കളും യഥാർത്ഥ `route.ts`-ലേക്ക് പരിഹരിക്കപ്പെടുന്നുവെന്ന് ഉറപ്പാക്കുന്നു (anti-hallucination)                                                                     | അതെ                       |
| `check:docs-symbols`           | `docs/**/*.md`-ലുള്ള എല്ലാ `/api/...` റഫറൻസുകളും യഥാർത്ഥ `route.ts`-ലേക്ക് പരിഹരിക്കപ്പെടുന്നുവെന്ന് ഉറപ്പാക്കുന്നു (anti-hallucination)                                                      | അതെ                       |
| `i18n translation drift`       | `docs/i18n/**` മിററുകൾ vs `.i18n-state.json` — PR-കളിൽ ഉപദേശാത്മകം (translation wave മിററുകൾ പുതുക്കുന്നു), push-ലും nightly-ലും കർശനമായി                                                     | PR-കളിൽ **ഉപദേശാത്മകം**   |

#### വിവർത്തന മിററുകൾ derived files ആണ് (PR മോഡ് vs റിലീസ് മോഡ്)

ഒരു feature PR-ൽ English source-കൾ മാത്രമേ തിരുത്തുകയുള്ളൂ. `docs/i18n/<locale>/**` മിററുകളും (66
`llm.txt` പകർപ്പുകളും വിവർത്തനം ചെയ്ത `CHANGELOG.md` ഫയലുകളും ഉൾപ്പെടെ) `.i18n-state.json`-ഉം translation wave (`docs/i18n-*` / `chore/i18n-*` branches, scheduled
`i18n-mirror-refresh.yml`) ഒരു ഘട്ടത്തിൽ പുനഃരചിക്കുന്നു; release-ലും (`npm run release:sync-changelog-i18n`) ഇത് നടക്കുന്നു. അതിനാൽ mirror
ഗേറ്റുകൾ രണ്ട് മോഡുകളിലാണ് പ്രവർത്തിക്കുന്നത്; `scripts/check/lib/gateMode.mjs` ആണ് ഇവ നിർണ്ണയിക്കുന്നത് (`--mode=pr|release`,
തുടർന്ന് `OMNIROUTE_GATE_MODE`, തുടർന്ന് Actions event; local run `release` ആയിരിക്കും):

- `check:docs-sync` — റിലീസ് മോഡിൽ എല്ലാ പരിശോധനകളും പ്രവർത്തിക്കുന്നു. PR മോഡിൽ package.json/OpenAPI പതിപ്പ്,
  റൂട്ട് CHANGELOG തലക്കെട്ടുകൾ, superseded-docs ഗാർഡ് എന്നിവ നിലനിർത്തുകയും, `llm.txt` മിറർ പകർപ്പുകൾക്കും
  വിവർത്തനം ചെയ്ത CHANGELOG വിഭാഗങ്ങൾക്കും `SKIP reason=pr-mode` പ്രിന്റ് ചെയ്യുകയും ചെയ്യുന്നു —
  എന്നാൽ PR `docs/i18n/**` കുടുംബത്തിന്റെ writer ആയി `config/quality/derived-paths/*.json`-ൽ പ്രഖ്യാപിച്ച
  head branch-ൽ നിന്നാണെങ്കിൽ രണ്ട് പരിശോധനകളും കർശനമായി പ്രവർത്തിക്കും. Diff base പരിഹരിക്കുമ്പോൾ,
  സ്വന്തം diff-ൽ `docs/i18n/<locale>/llm.txt` അല്ലെങ്കിൽ `CHANGELOG.md` തിരുത്തുന്ന മാറ്റം ആ പരിശോധന
  കർശനമായി നടത്തും. depth-1 checkout-ൽ ( `docs-sync-strict` job) diff base പരിഹരിക്കാനാകില്ല,
  അതിനാൽ PR മോഡ് base ആവശ്യമില്ലാത്ത ഒരു പരിശോധനയും നടത്തുന്നു: ഓരോ `llm.txt` മിററും നിലവിലുണ്ടാകണം,
  അതിന്റെ `---` separator നിലനിർത്തണം, കൂടാതെ റൂട്ടിലെ body-യോ മിക്ക മിററുകളും പങ്കിടുന്ന body-യോ
  ഉൾക്കൊള്ളണം. Base മാറിയാൽ എല്ലാ മിററുകളും ഒരുപോലെ പഴകിയതാകും, അത് വിജയിക്കും; എന്നാൽ ഒരു മിറർ
  കൈകൊണ്ട് തിരുത്തിയാൽ പരാജയപ്പെടും. depth-1 PR checkout-ൽ വിവർത്തനം ചെയ്ത `CHANGELOG.md`
  ഫയലുകൾക്ക് ഇത്തരത്തിലുള്ള പരിശോധനയില്ല.
- Pre-commit hook `check-docs-sync.mjs --mode=pr` പ്രവർത്തിപ്പിക്കുന്നു: ഒരു commit അത് ചെയ്യുന്ന
  മാറ്റത്തിന്റെ അടിസ്ഥാനത്തിലാണ് വിലയിരുത്തപ്പെടുന്നത്. Flag ഇല്ലാത്ത local run റിലീസ് മോഡിലാണ്
  പ്രവർത്തിക്കുക; root `llm.txt` തിരുത്തുന്ന ഒരു merged PR, ആ wave പ്രവർത്തിക്കുന്നതുവരെ അതേ base-ലെ
  എല്ലാ തുടർന്നുള്ള commit-ുകളെയും തടയും. Husky hook പ്രവർത്തിപ്പിക്കുന്ന mode-aware gate-ുകൾക്കും
  ഇതേ നിയമമാണ്: hook `--mode=pr` പാസാക്കുന്നു, കർശനമായ verdict റിലീസ്-മോഡ് run-ുകൾക്കൊപ്പം തന്നെ
  തുടരും (release PR, `main`-ലേക്കുള്ള pushes, സാധാരണ local run).
- Mirror-content unit tests (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`,
  `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`,
  `docs/*-locales`) — റിലീസ് മോഡ് എല്ലാ locale-ുകളും പരിശോധിക്കുന്നു. PR മോഡ് `.i18n-state.json`
  അനുസരിച്ച് English source-നൊപ്പം നിലവിലുള്ള മിററുകൾ മാത്രം പരിശോധിക്കുന്നു (മുഴുവൻ ഫയലിന്റെ hash,
  അല്ലെങ്കിൽ test pin ചെയ്യുന്ന വിഭാഗത്തിന്റെ രേഖപ്പെടുത്തിയ section hash), പഴകിയവ കാരണം സഹിതം
  ഒഴിവാക്കുന്നു. `target_hash` provenance പരിശോധനകൾ രണ്ട് മോഡുകളിലും എല്ലാ locale-ുകൾക്കും
  പ്രവർത്തിക്കുന്നു. Freshness ഓരോ `## ` വിഭാഗത്തിനും പ്രത്യേകം കണക്കാക്കുന്നു; unit
  `run-translation.mjs` hash ചെയ്യുന്നു. ദൈർഘ്യമേറിയ ഒരു വിഭാഗം (ഈ ഫയലിലെ gate inventory അതിന്റെ
  ഏകദേശം പകുതിയാണ്) അതിൽ വരുത്തുന്ന ഏതൊരു തിരുത്തലും ആ മിററുകളെ പഴകിയതാക്കും, അടുത്ത wave
  വരുന്നതുവരെ അവയുടെ PR-mode assertions ഒഴിവാക്കപ്പെടും. English source-ൽ ഇനി ഇല്ലാത്ത anchor
  മുഴുവൻ ഫയലുമായുള്ള താരതമ്യത്തിലേക്ക് fallback ചെയ്യും.
- `i18n translation drift` — PR-ുകളിൽ advisory, push, nightly, release cut എന്നിവയിൽ strict;
  അതിനാൽ പഴകിയ ഒരു മിററിനും release-ിൽ ship ചെയ്യാനാകില്ല.

`scripts/i18n/sync-llm-mirrors.mjs` (`syncLlmMirrors()` ആയും export ചെയ്യുന്നു, `--dry-run` സഹിതം)
`llm.txt` മിററുകൾ വീണ്ടും എഴുതുന്നു; release refresh, translation wave, scheduled
`i18n-mirror-refresh.yml` എന്നിവ ഇത് പ്രവർത്തിപ്പിക്കുന്നു (drift report അവ പട്ടികപ്പെടുത്താത്തതിനാൽ
refresh ഒരു dry run ഉപയോഗിച്ച് പഴകിയ `llm.txt` മിററുകൾ കണ്ടെത്തുകയും, തുടർന്ന്
`check:docs-all`-ന് മുമ്പ് അവ sync ചെയ്യുകയും ചെയ്യുന്നു).

`docs/diagrams/`-ലുള്ള പന്ത്രണ്ട് README SVG-കൾ generated ആണ്
(`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` അവയെല്ലാം വീണ്ടും generate
ചെയ്യുന്നു). ഓരോന്നിനും ഒരു byte-compare unit test ഉണ്ട്
(`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`), അത് റിലീസ് മോഡിൽ committed file
പഴകിയിരിക്കുമ്പോൾ പരാജയപ്പെടും; PR-ൽ `check:generated-artifacts` PR തിരുത്തിയ SVG-യെ
വിലയിരുത്തുകയും base-ന്റെ drift release refresh-ിന് വിട്ടുകൊടുക്കുകയും ചെയ്യുന്നു
([Generated files and derived baselines](#generated-files-and-derived-baselines-written-at-release)
കാണുക) — അതേസമയം `check:docs-counts` canonical numbers അവയുടെ `<text>` nodes-ൽ നിന്ന് വായിക്കുന്നു —
അതുകൊണ്ടാണ് outlining ഘട്ടം outline ചെയ്ത എല്ലാ string-ുകളും invisible `<text>` ആയി ഫയലിൽ
നിലനിർത്തുന്നത്. SVG canonical-numbers check `SVG_DIAGRAM_FILES`-ൽ പട്ടികപ്പെടുത്തിയ ഫയലുകൾ
വായിക്കുന്നു (`scripts/check/check-docs-counts-sync.mjs`):
`docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`,
`comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, കൂടാതെ
`public/images/tier-flow-dark.svg`, `tier-flow-light.svg`; free-forever, catalog-entry,
recurring-pool, scoring-factors അവകാശവാദങ്ങളും `promise-pillars.svg`,
`free-tier-budget.svg`, `strategies-grid.svg` വായിക്കുന്നു. ഈ generators വരയ്ക്കുന്ന counts
(provider total, MCP tools, routing strategies, free-forever providers, …)
`docs/reference/derived-facts.json` എന്ന facts snapshot-ൽ നിന്ന്
`scripts/docs/readmeFacts.mjs` വഴി ലഭിക്കുന്നു, literals-ൽ നിന്ന് അല്ല; അതിനാൽ ഏതൊരു branch-ലും
ഒരു diagram വീണ്ടും generate ചെയ്താൽ committed file പുനരുത്പാദിപ്പിക്കപ്പെടും.
`free-tier-budget.svg` അതേ snapshot-ൽ നിന്ന് (`code.freeTierBudget`, facts probe രേഖപ്പെടുത്തുന്ന
catalog summary) rows വരയ്ക്കുന്നു; അതിനാൽ `FREE_MODEL_BUDGETS`-ലുള്ള മാറ്റം അടുത്ത refresh-ൽ
card-ലേക്ക് എത്തും, CI ചുവപ്പാകില്ല.

### Derived values: `pr` and `release` gate modes

ഒരു feature PR അതിന്റെ base-ന്റെ state-നെ ആശ്രയിക്കുന്ന value ഒരിക്കലും എഴുതുന്നില്ല: provider,
migration, MCP-tool, strategy counts, README SVG numbers, facts snapshot എന്നിവ. ഒരു ഘട്ടം ഇവയെല്ലാം
വീണ്ടും കണക്കാക്കുന്നു — release-ും nightly derived-refresh PR-ും പ്രവർത്തിപ്പിക്കുന്ന
`npm run release:refresh-derived`. അതിനാൽ **releases-ിനിടയിൽ base live code-നേക്കാൾ പിന്നിലായിരിക്കും
എന്നത് ഉദ്ദേശപൂർവമാണ്**, കൂടാതെ live code-ുമായി tree താരതമ്യം ചെയ്യുന്ന ഒരു gate അല്ലെങ്കിൽ test,
ഒരു sibling provider ചേർത്തതിന് ശേഷമുള്ള എല്ലാ PR-കളിലും red ആയിരിക്കും. അതിനാൽ derived values
വിലയിരുത്തുന്ന gate-ുകൾ `scripts/check/lib/gateMode.mjs` പരിഹരിക്കുന്ന രണ്ട് മോഡുകളിലൊന്നിൽ
പ്രവർത്തിക്കുന്നു (ആദ്യ match ആണ് പ്രാബല്യത്തിൽ വരുന്നത്):

1. command line-ിലെ `--mode=pr|release`;
2. `OMNIROUTE_GATE_MODE` environment variable (`pr` അല്ലെങ്കിൽ `release`);
3. GitHub Actions event-ൽ നിന്ന് automatic ആയി: head `release/v*` അല്ലാത്ത
   `pull_request`, `merge_group`, അല്ലെങ്കിൽ `omni-queue/**`-ലേക്കുള്ള push → `pr`; മറ്റെല്ലാം
   (push, schedule, dispatch, release PR `release/v* → main`, ഏതൊരു local run-ും) → `release`.

ഓരോ മോഡിലും `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) പരാജയപ്പെടുന്ന
കാര്യങ്ങൾ:

| മോഡ്      | പരാജയപ്പെടുന്നത്                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | തത്സമയ വസ്തുതകൾ ആവശ്യമാണ് |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `release` | എല്ലാ പരിശോധനകളും, ട്രീയിൽ നിന്ന് ശേഖരിച്ച വസ്തുതകളുമായുള്ള കർശന സമത്വം (ഗേറ്റിനുണ്ടായിരുന്ന എപ്പോഴുമുള്ള പെരുമാറ്റം): പഴകിയ എണ്ണം, പതിപ്പ്, കവറേജ് പരിധി അല്ലെങ്കിൽ SVG സംഖ്യ എന്നിവയിലെ ഏതെങ്കിലും കർശനമായ വ്യതിയാനമാണ്                                                                                                                                                                                                                                                                                                                   | അതെ                       |
| `pr`      | മാറ്റം വരുത്തിയ ഭാഗം മാത്രം, അതേ ക്ലെയിം എക്സ്ട്രാക്ടറുകൾ ഉപയോഗിച്ച് PR അടിസ്ഥാനത്തിനെതിരെ താരതമ്യം ചെയ്യുന്നു: (1) ആ പരിശോധനയ്ക്കും ഫയലിനുമായി അടിസ്ഥാനത്തിൽ നിലവിലില്ലാത്ത ഒരു നിയന്ത്രിത മൂല്യം ("PR ഒരു നിയന്ത്രിത സംഖ്യ തിരുത്തി — ആ വരി അടിസ്ഥാനത്തിലെ ടെക്സ്റ്റിലേക്ക് പുനഃസ്ഥാപിക്കുക"); (2) അടിസ്ഥാനത്തിൽ ഉണ്ടായിരുന്ന ഒരു ആവശ്യമായ ക്ലെയിം ഹെഡിൽ നിന്ന് നഷ്ടപ്പെട്ടു. വസ്തുതകളൊന്നും ആവശ്യമില്ലാത്ത ഉള്ളടക്ക ഇൻവേരിയന്റുകൾ release മോഡിൽ പോലെ പ്രവർത്തിക്കും; release-മാത്രം പരിശോധനകൾ പട്ടികപ്പെടുത്തുകയും ഒഴിവാക്കുകയും ചെയ്യും | ഇല്ല                      |

ഏജന്റ്-നിർദ്ദേശ ഫയലുകളിൽ ഒരു ഡിറൈവുചെയ്ത എണ്ണവും ഇല്ല: `AGENTS.md`, `llm.txt` (അതിന്റെ
`docs/i18n/*/llm.txt` പകർപ്പുകളും), bs `AGENTS.md` ഫോർക്ക്, `open-sse/services/AGENTS.md`,
`src/shared/constants/agentSkills.ts`, `skills/README.md`, എല്ലാ `skills/*/SKILL.md` ഫയലുകളും
സോഴ്സിലേക്കും (ഉദാഹരണത്തിന് `src/shared/constants/routingStrategies.ts`-ലെ
`ROUTING_STRATEGY_VALUES`) കൂടാതെ `npm run facts`-ലേക്കും ചൂണ്ടിക്കാണിക്കുന്നു. "No derived counts (agent-instruction file …)" എന്ന ഇൻവേരിയന്റ് രണ്ട് മോഡുകളിലും അവിടെ ഒരു എണ്ണം (providers,
migrations, MCP tools and scopes, routing strategies, scoring factors, mode packs) കണ്ടെത്തിയാൽ
പരാജയപ്പെടും; അതിനാൽ release refresh-ന് ഒരു നിർദ്ദേശ ഫയലും വീണ്ടും എഴുതേണ്ടതില്ല.

`pr` മോഡിൽ എഴുത്തുകാരുടെ ബ്രാഞ്ചുകൾ നിയന്ത്രിത മൂല്യങ്ങൾ തിരുത്തിയേക്കാം: `chore/derived-*`
(രാത്രികാല refresh PR), `release/v*`, വിവർത്തന തരംഗങ്ങളായ `docs/i18n-*`, `chore/i18n-*`
(`scripts/check/lib/derivedClaimsDiff.mjs`). Queue ബാച്ചുകൾ (`merge_group`, Mergify drafts,
`omni-queue/**`) വീണ്ടും വിലയിരുത്തില്ല: ഗേറ്റ് ഓരോ PR-നെയും പ്രത്യേകം വിലയിരുത്തിയതിന്റെ
ആകെ ഫലമാണ് അവ.

പുറത്തുകടക്കൽ കോഡുകൾ: `0` ശുദ്ധം · `1` കർശനമായ വ്യതിയാനം (`--strict` ഉപയോഗിക്കുമ്പോഴുള്ള
സോഫ്റ്റ് വ്യതിയാനവും ഉൾപ്പെടെ) അല്ലെങ്കിൽ നിയന്ത്രിത-മൂല്യ ലംഘനം · `2` ഇൻഫ്രാസ്ട്രക്ചർ — കോഡ്
വസ്തുതകൾ ശേഖരിക്കാനായില്ല (tsx probe പരാജയപ്പെട്ടു അല്ലെങ്കിൽ സമയപരിധി കഴിഞ്ഞു; സമയപരിധി
`OMNIROUTE_FACTS_TIMEOUT_MS` ആണ്, ഡീഫോൾട്ട് 600000 ms) അല്ലെങ്കിൽ CI-യിൽ PR diff
അടിസ്ഥാനം പരിഹരിക്കാനായില്ല. പുറത്തുകടക്കൽ കോഡ് 2 ഒരിക്കലും ഡോക്യുമെന്റേഷൻ വ്യതിയാനമല്ല:
ജോബ് വീണ്ടും പ്രവർത്തിപ്പിക്കുകയോ പരിസ്ഥിതി ശരിയാക്കുകയോ ചെയ്യുക.

ഓരോ മോഡും എവിടെയാണ് പ്രവർത്തിക്കുന്നത്:

| എവിടെ                                                                                                            | മോഡ്                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ഫീച്ചർ PR — `ci.yml` ജോബ് `docs-sync-strict`, `quality.yml` ഘട്ടം "Docs accuracy"                                | `pr` (സ്വയമേവ); ജോബ് അടിസ്ഥാനം `BASE_SHA` ആയി കൈമാറുകയും `fetch-depth: 2` ഉപയോഗിച്ച് checkout ചെയ്യുകയും ചെയ്യുന്നു                                                                                                                           |
| `merge_group`, `omni-queue/**` സ്ഥാനാർഥികൾ, merge train-ന്റെ പൂർണ്ണ ഗേറ്റ് പട്ടിക                                | `pr`                                                                                                                                                                                                                                          |
| Release PR (`release/v* → main`), pushes, ഷെഡ്യൂൾ ചെയ്തതും മാനുവലുമായ റണ്ണുകൾ                                    | `release`                                                                                                                                                                                                                                     |
| Release-Green (`scripts/quality/validate-release-green.mjs`)                                                     | HARD ഇനങ്ങൾ `OMNIROUTE_GATE_MODE=pr` ഉപയോഗിച്ച് പ്രവർത്തിക്കുന്നു ("അടിസ്ഥാനം തകരാറിലാക്കിയോ?"); DRIFT ഇനം `derived-refresh` — `npm run release:refresh-derived -- --check` പ്രവർത്തിപ്പിക്കുന്നു (കർശന കാഴ്ച, base-red ഒരിക്കലും തുറക്കില്ല) |
| Release (`/generate-release` ഘട്ടങ്ങൾ 0a, 1; skill wiring പ്രത്യേകമായി ഉടമ-അംഗീകരിച്ച മാറ്റമാണ്)                 | `npm run release:refresh-derived` ഡിറൈവുചെയ്ത ഫയലുകൾ എഴുതുന്നു; Release PR-ന്റെ സ്വന്തം പരിശോധനകൾ തുടർന്ന് `release` മോഡിൽ പ്രവർത്തിക്കും                                                                                                     |
| `nightly-derived-refresh.yml` (ദിവസേന, ഏറ്റവും ഉയർന്ന `release/vX.Y.Z`, release-freeze-ന്റെ കീഴിൽ ഒഴിവാക്കുന്നു) | `npm run release:refresh-derived -- --profile=nightly`; വ്യത്യാസമുണ്ടെങ്കിൽ `chore/derived-refresh`-ൽ നിന്ന് ഒരു PR മാത്രം തുറന്നുവയ്ക്കുന്നു; ഒരിക്കലും merge ചെയ്യില്ല                                                                      |

ഇതിന് പിന്നിലെ കമാൻഡുകൾ:

- `npm run facts` എല്ലാ derived നമ്പറുകളും JSON ആയി പ്രിന്റ് ചെയ്യുന്നു (`scripts/release/facts.mjs`).
  `--key=code.mcpTools` ഒരു മൂല്യം പ്രിന്റ് ചെയ്യുന്നു, `--snapshot` live tree-യ്ക്ക് പകരം commit ചെയ്ത
  snapshot വായിക്കുന്നു. facts ശേഖരിക്കാനാകാത്തപ്പോൾ Exit 2.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) derived
  ഫയലുകൾ ഒരു pass-ൽ, ഈ ക്രമത്തിൽ പുനഃകണക്കാക്കുന്നു (`--only=`-യുടെ step ids): `provider-reference`
  (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (snapshot), `numbers` (counts gate-ന്റെ
  rewrite plan docs-ൽ പ്രയോഗിച്ച്, തുടർന്ന് അവയുടെ `docs/i18n/` mirrors-ലേക്ക് കൈമാറുന്നു),
  `readme-diagrams`, `skills` (generated `SKILL.md`), `e2e-timings` (tree-ൽ
  `syncE2eTimings` വരുന്നതുവരെ ഒഴിവാക്കുന്നു), `ui-keys` (`en.json`-ൽ നിന്ന് നീക്കം ചെയ്ത keys
  prune ചെയ്യുകയും, `--rewritten-since=<ref>` — default `origin/main` — ഉപയോഗിച്ച് കഴിഞ്ഞ
  release മുതൽ rewrite ചെയ്ത English values വീണ്ടും queue ചെയ്യുകയും ചെയ്യുന്നു),
  `llm-mirrors`, `verify-generated` (എഴുത്തിന് ശേഷം release mode-ൽ
  `check:generated-artifacts`, `check:agent-skills-sync` വിജയിക്കണം; `--check`-ലും
  `--only` ഇത് ഒഴിവാക്കുമ്പോഴും skip ചെയ്യുന്നു; പരാജയം exit 2). `changelog` step opt-in ആണ്
  (`--with-changelog`, release profile മാത്രം). `--profile=nightly` ഒരിക്കലും version claim
  മാറ്റില്ല. `-- --check` ഉപയോഗിക്കുമ്പോൾ ഒന്നും എഴുതില്ല; ഏതെങ്കിലും ഫയൽ മാറുമെന്നോ managed value-യ്ക്ക്
  manual edit ആവശ്യമാണെന്നോ ഉണ്ടെങ്കിൽ രണ്ടും ലിസ്റ്റ് ചെയ്ത് exit 1 നൽകും; infrastructure
  failure-ൽ exit 2. `--json` ഫലം JSON ആയി പ്രിന്റ് ചെയ്യുന്നു.
- `docs/reference/derived-facts.json` അവസാന refresh ഉപയോഗിച്ച facts-ന്റെ snapshot ആണ്. ഇത്
  എഴുതുന്നത് refresh മാത്രം. README SVG generators ഇത് വായിക്കുന്നു, കൂടാതെ PR സമയത്തെ unit tests
  committed docs-ഉം generated files-ഉം ഇതുമായി താരതമ്യം ചെയ്യുന്നു — live code-ുമായി ഒരിക്കലും
  താരതമ്യം ചെയ്യുന്നില്ല. suite-ന്റെ ഏക live comparison
  `tests/unit/check-docs-counts-sync.test.ts`-ലെ "the release refresh closes the cycle" ആണ്:
  live facts ഉപയോഗിച്ച് refresh-ന്റെ rewrite plan memory-യിൽ പ്രയോഗിക്കുമ്പോൾ report ചെയ്യാത്ത
  STRICT drift ഒന്നും ശേഷിക്കരുത്, കൂടാതെ വീണ്ടും planning ചെയ്യുമ്പോൾ ഒന്നും മാറരുത്.

പ്രാദേശികമായി പുനഃസൃഷ്ടിക്കാൻ (local run-ന്റെ default `release` ആണ്):

```bash
npm run check:docs-counts                                       # release: കർശനമായത്, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # feature PR വിലയിരുത്തപ്പെടുന്നത് ഇതിന്റെ അടിസ്ഥാനത്തിൽ
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # release rewrite ചെയ്യുന്നത് എന്താണെന്ന്
```

പരിഹരിക്കാവുന്ന base ഇല്ലെങ്കിൽ (`BASE_SHA`/`BASE_REF` ഇല്ല, local `origin/release/v<version>` ഇല്ല)
local `pr` run ഒരു മുന്നറിയിപ്പ് പ്രിന്റ് ചെയ്ത് പരാജയപ്പെടുന്നതിനുപകരം diff skip ചെയ്യുന്നു.

### Job: `i18n-ui-coverage`

| Script                            | Validates                                                                                                                                                                                                             | Blocking                |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `check-ui-keys-coverage` (inline) | UI i18n key coverage ≥ 65% ആണെന്ന് പരിശോധിക്കുന്നു                                                                                                                                                                    | Yes (both modes)        |
| `check:ui-icu`                    | ഓരോ UI catalog-ലെയും ഓരോ message-വും `IntlMessageFormat` ഉപയോഗിച്ച് compile ചെയ്യുന്നതായി പരിശോധിക്കുന്നു                                                                                                             | Yes (both modes)        |
| `check-ui-value-drift` (inline)   | rewrite ചെയ്ത English **value** പഴയ translation ഒന്നും ശേഷിക്കാത്തതാക്കുന്നു                                                                                                                                          | Yes (release mode only) |
| `check-new-key-coverage` (inline) | ഒരു **new** English key എല്ലാ locale-ലും translate ചെയ്തിട്ടുണ്ടെന്ന് പരിശോധിക്കുന്നു — ഒരു `__MISSING__:` marker നിരസിക്കുന്നു                                                                                       | Yes (release mode only) |
| `check-key-completeness` (inline) | ഓരോ UI catalog-ും (കൂടാതെ `--catalog=cli` ഉപയോഗിക്കുമ്പോൾ ഓരോ CLI catalog-ും) അതിന്റെ `en.json`-ലുള്ള അതേ key set കൃത്യമായി വഹിക്കുന്നു; `pr` mode-ൽ, PR മാറ്റിയ ഓരോ catalog-ും merge base-നോടു തന്നെ പരിശോധിക്കുന്നു | Yes (both modes)        |
| `check-translation-ratio`         | locale-പ്രകാരമുള്ള real-translation ratio (identical-to-English / placeholder / missing leaves outside the allowlist) `config/quality/i18n-translation-baseline.json` + slack കവിയരുത്                                | Yes (release mode only) |

`fetch-depth: 0` ആവശ്യമാണ് — value-drift gate `en.json`-നെ merge base-നോട് diff ചെയ്യുന്നു.

**രണ്ട് modes (2026-11-13 മുതൽ).** ഒരു feature PR `en.json`-ലും
(`bin/cli/locales/en.json`) keys ചേർക്കുകയോ rewrite ചെയ്യുകയോ ചെയ്യുന്നു, മറ്റ് locale ഒന്നും
touch ചെയ്യുന്നില്ല; `check:pr-derived-paths` (`pr-test-policy` job,
`config/quality/derived-paths/translation.json` family) അങ്ങനെ ചെയ്യുന്ന feature PR പരാജയപ്പെടുത്തുന്നു.
മറ്റ് locale-കൾ ഓരോ release-ലും ഒരിക്കൽ `release:refresh-derived` വഴി പൂർത്തിയാക്കുന്നു; ഇത്
`scripts/i18n/sync-ui-keys.mjs`-ലെ `syncUiKeys()` വിളിക്കുന്നു (missing keys ചേർക്കുക, dropped
keys prune ചെയ്യുക, rewritten English-ന്റെ translations `rewrittenSinceRef` ഉപയോഗിച്ച് mark ചെയ്യുക,
translate ചെയ്യുക), അല്ലെങ്കിൽ ഒരു translation wave വഴിയും. Gates mode വായിക്കുന്നത്
`scripts/check/lib/gateMode.mjs`-ൽ നിന്നാണ്: `pr` mode-ൽ (feature PR-കൾ,
`merge_group`, `omni-queue/**`) മുകളിലെ release-mode gates `SKIP reason=pr-mode` പ്രിന്റ് ചെയ്ത്
0 exit ചെയ്യുന്നു; `release` mode-ൽ (release PR, `main`-ലേക്കുള്ള pushes,
`workflow_dispatch`, local runs) അവ മുമ്പത്തെ പോലെ strict ആണ്, കൂടാതെ release PR-ൽ
diff-aware gates-ന് `BASE_REF=origin/main` ലഭിക്കുന്നതിനാൽ cycle ചേർത്തതോ rewrite ചെയ്തതോ ആയ
എല്ലാ keys-ഉം അവ വിലയിരുത്തുന്നു. `--mode=pr` ഉപയോഗിച്ച് feature-PR verdict local ആയി
preview ചെയ്യുക.

`pr` മോഡിൽ locale catalogs മാറ്റുന്ന PR (translation wave, release refresh, translation-only fix) ഒഴിവാക്കപ്പെടുന്നില്ല: `check-key-completeness` merge base-ലുള്ള അതേ catalog-ുമായി (`scripts/i18n/lib/touched-catalogs.mjs`) അത് മാറ്റിയ ഓരോ catalog-വും താരതമ്യം ചെയ്ത് വിലയിരുത്തുന്നു, കൂടാതെ catalog-ൽ നിന്ന് നഷ്ടപ്പെട്ട key, `en.json`-ൽ ഇല്ലാത്ത key, യഥാർത്ഥ translation `__MISSING__:` marker-ലേക്കോ English text-ലേക്കോ മാറിയത്, അല്ലെങ്കിൽ PR മാറ്റാതിരുന്ന ഒരു English string-ന്റെ placeholders/tags ഇനി interpolate ചെയ്യാത്ത value എന്നിവ കണ്ടെത്തിയാൽ പരാജയപ്പെടുന്നു. PR-ൽ പുതുതായി ചേർക്കുന്ന catalog-ിൽ മുഴുവൻ `en.json` key set ഉണ്ടായിരിക്കണം. ഒരു PR സ്പർശിക്കുന്ന catalog-ുകൾക്കായി ratio, CLI-parity gates കാണുന്നതെന്താണെന്ന് ഇത് ഉൾക്കൊള്ളുന്നു.

Locale-parity unit tests (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) `tests/_helpers/localeParityMode.ts` വഴി ഇതേ modes പിന്തുടരുന്നു: `pr` മോഡിൽ അവ key-parity assertions ഒഴിവാക്കുകയും, merge base മുതൽ English മാറിയ keys-ന്റെ placeholder parity release refresh-ന് വിട്ടുകൊടുക്കുകയും ചെയ്യുന്നു (unit-test job-ന്റെ shallow checkout-ന് അത് വായിക്കാൻ കഴിയാത്തപ്പോൾ എല്ലാ keys-ഉം). ആ helper ആണ് അംഗീകരിച്ചിട്ടുള്ള ഏക mode-conditional skip: `check:test-masking` `.skip(`, `{ skip: true }` എന്നിവ എണ്ണുന്നു, പക്ഷേ അത് മടക്കിനൽകുന്ന computed `{ skip: "<reason>" }` എണ്ണുന്നില്ല. അതിനാൽ `tests/unit/locale-parity-mode.test.ts` അത് ഉപയോഗിക്കാൻ അനുവദിച്ചിരിക്കുന്ന tests-ന്റെ പട്ടിക ഉറപ്പിക്കുന്നു — അതിലേക്ക് ഒന്ന് ചേർക്കുന്നത് review ചെയ്ത edit ആയിരിക്കണം.

#### `check-ui-value-drift` — stale-translation gate

മറ്റു gates-ുകൾക്ക് ഘടനാപരമായി കാണാൻ കഴിയാത്ത ഏക i18n regression ഇത് കണ്ടെത്തുന്നു: ഒരു English value പുനഃരചിക്കപ്പെടുകയും, മുൻ English-ൽ നിന്ന് ഉരുത്തിരിഞ്ഞ translations പിന്നിലാകുകയും ചെയ്യുന്നു. അതിനാൽ non-English users ആത്മവിശ്വാസം നൽകുന്നുവെങ്കിലും ഇപ്പോൾ തെറ്റായ copy വായിച്ചുകൊണ്ടിരിക്കും.

ഇത് യഥാർത്ഥത്തിൽ സംഭവിച്ചിട്ടുണ്ട്. Antigravity login helper ചേർന്നപ്പോൾ `oauthModal.googleOAuthWarning` പുനഃരചിക്കപ്പെട്ടു (#5203); **43 locales-ൽ 39 എണ്ണം** operators-നോട് "copy the full URL and paste it below" എന്ന് പറയുന്ന text നിലനിർത്തി — ആ provider-ന് പൂർത്തിയാക്കാൻ കഴിയാത്ത ഒരു flow. ഇത് #8463 വരെ ശ്രദ്ധിക്കപ്പെട്ടില്ല, കാരണം:

- `sync-ui-keys` **absent** ആയ keys മാത്രമാണ് backfill ചെയ്യുന്നത്; **stale** ആയവയല്ല;
- `check-ui-keys-coverage` key _presence_ എണ്ണുന്നു, അതിനാൽ stale translation covered ആയി കണക്കാക്കപ്പെടുന്നു;
- `check-translation-drift` `docs/i18n/<locale>/**.md` documentation mirrors പിന്തുടരുന്നു — അത് `src/i18n/messages/*.json` ഒരിക്കലും വായിക്കുന്നില്ല. ഇത് `docs-sync-strict` job-ൽ പ്രവർത്തിക്കുന്നു: PR-കളിൽ advisory, push-ലും nightly-ലും strict; translation wave mirrors refresh ചെയ്യുന്നു, feature PR അല്ല.

**Diff-aware, baseline-backed അല്ല.** ഇത് merge base-ലുള്ള `en.json` working tree-യിലുള്ളതുമായി താരതമ്യം ചെയ്യുന്നു; English value മാറിയ ഓരോ key-ക്കും untouched translation ഇപ്പോഴും കൈവശമുള്ള ഏതൊരു locale-യും stale ആണ്. ഇത് മുമ്പുണ്ടായിരുന്ന debt ഉദ്ദേശപൂർവ്വം **freeze** ചെയ്യുന്നു — ഒരു diff-ന് ദീർഘകാലമായി നിലനിൽക്കുന്ന translation ഏത് പഴയ English-ൽ നിന്നാണ് വന്നതെന്ന് വെളിപ്പെടുത്താൻ കഴിയില്ല, അതിനാൽ നിലവിലെ മാറ്റം സ്പർശിക്കുന്ന കാര്യങ്ങൾ മാത്രമാണ് gate വിലയിരുത്തുന്നത്. മറ്റൊരു മാർഗമായ per-key hash baseline-ന് ഏകദേശം 600 KB വലുപ്പമുള്ള generated file ആവശ്യമായി വരും, നിലവിലുള്ള ഏറ്റവും വലിയ baseline-നേക്കാൾ 3× കൂടുതലും, ഓരോ i18n PR-ലും churn ഉണ്ടാക്കുന്നതുമാകും.

ഇത് പാലിക്കാൻ രണ്ട് മാർഗങ്ങളുണ്ട്:

1. ബാധിച്ച translations update ചെയ്യുക, അല്ലെങ്കിൽ
2. അവയെ `__MISSING__:<new english>` ആയി സജ്ജമാക്കുക — runtime പിന്നീട് തിരുത്തിയ English നൽകും (`src/i18n/request.ts::deepMergeFallback`, #7258), കൂടാതെ ആ key translation-നായി queue ചെയ്യപ്പെടും.

String-ന്റെ **അർത്ഥം** മാറിയെങ്കിൽ, **key rename ചെയ്യുന്നതാണ്** ഉചിതം: പുതിയ key-ക്ക് stale translation പാരമ്പര്യമായി ലഭിക്കില്ല. #8463 ഉപയോഗിച്ച pattern ഇതാണ്.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Base catalog വായിക്കാൻ കഴിയാത്തപ്പോൾ (base ref ഇല്ലാത്ത shallow clone) `SKIP reason=base-unresolved` സഹിതം 0 exit ചെയ്യുന്നു, `check-openapi-breaking`-നെ അനുകരിച്ച്. Release mode-ൽ മാത്രം: ഒരു feature PR English പുനഃരചിച്ച് അവിടെ നിർത്തുന്നു; release refresh പിന്നിൽ അവശേഷിച്ച translations അടയാളപ്പെടുത്തുന്നു (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, അതേ `findStaleTranslations`).

### Job: `i18n`

പൂർണ്ണ i18n validation matrix (ഓരോ locale-നും ഒരു job). മുഴുവൻ job-ും advisory ആണ്.

| Script                          | Validates                                 | Blocking                                              |
| ------------------------------- | ----------------------------------------- | ----------------------------------------------------- |
| `validate_translation.py quick` | ഓരോ locale-ലെയും translation completeness | **Advisory** (`continue-on-error: true` on whole job) |

### Job: `pr-test-policy`

Pull requests-ൽ മാത്രം പ്രവർത്തിക്കുന്നു.

| Script                 | Validates                                                                                                                                                 | Blocking |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, അല്ലെങ്കിൽ `bin/` എന്നിവയിലെ production code മാറ്റുന്ന PR-കൾ tests ഉൾപ്പെടുത്തുകയോ update ചെയ്യുകയോ വേണം (Hard Rule #8) | Yes      |
| `check:test-masking`   | മാറ്റിയ test files net assert count കുറയ്ക്കുകയോ `assert.ok(true)` tautologies ചേർക്കുകയോ ചെയ്യുന്നില്ല                                                   | Yes      |
| `check:pr-evidence`    | മാറ്റത്തിനുള്ള test/VPS evidence PR body-യിൽ ഉദ്ധരിച്ചിട്ടുണ്ടോ (PR prose grep ചെയ്ത് Hard Rule #18 mechanize ചെയ്യുന്നു — fragile, Backlog കാണുക)        | Yes      |

### Job: `test-vitest`

`build`-ന് ശേഷം പ്രവർത്തിക്കുന്നു. പരാജയപ്പെട്ടാൽ merge തടയും.

| സ്യൂട്ട്         | പരിശോധിക്കുന്നത്                                         | ബ്ലോക്കിംഗ്                                                                                                                                |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP server (110 tools), autoCombo, cache — vitest runner | അതെ                                                                                                                                        |
| `test:vitest:ui` | UI component tests — vitest runner                       | **ബ്ലോക്കിംഗ്** — മുമ്പേ ഉണ്ടായിരുന്ന പരാജയങ്ങൾ `vitest.config.ts`-ൽ വ്യക്തമായി ഒഴിവാക്കിയിട്ടുണ്ട്; പുതിയ പരാജയങ്ങൾ ജോലി പരാജയപ്പെടുത്തും |

### രാത്രികാല വർക്ക്ഫ്ലോകൾ (ഷെഡ്യൂൾ ചെയ്തതും, ഉപദേശാത്മകവും)

ഇവ cron ഷെഡ്യൂളിലും (`workflow_dispatch`) പ്രവർത്തിക്കുന്നു, PR-കളിൽ ഒരിക്കലും പ്രവർത്തിക്കില്ല. ഇവയെല്ലാം ഉപദേശാത്മകമാണ്.

| വർക്ക്ഫ്ലോ             | പരിശോധിക്കുന്നത്                                                                                                                                                         | ബ്ലോക്കിംഗ്     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `nightly-property`     | റാൻഡം seed + ഉയർന്ന run count ഉപയോഗിച്ചുള്ള fast-check property tests                                                                                                    | **ഉപദേശാത്മകം** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                                    | **ഉപദേശാത്മകം** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (provider secret ഇല്ലെങ്കിൽ ഒഴിവാക്കും)                                                                            | **ഉപദേശാത്മകം** |
| `nightly-schemathesis` | ലൈവായ OmniRoute-നെതിരെ `docs/openapi.yaml` ഉപയോഗിച്ചുള്ള OpenAPI contract fuzzing (schemathesis) — spec violations / കൈകാര്യം ചെയ്യാത്ത 500s കണ്ടെത്തുന്നു (ഘട്ടം 8 B.4) | **ഉപദേശാത്മകം** |
| `nightly-mutation`     | fast unit lane-ലുള്ള Stryker mutation-testing score — നിലനിൽക്കുന്ന mutants ദുർബലമായ asserts കണ്ടെത്തുന്നു                                                               | **ഉപദേശാത്മകം** |
| `nightly-compat`       | പിന്തുണയ്ക്കുന്ന `engines.node` ശ്രേണികളിലുടനീളമുള്ള Node engine compatibility matrix                                                                                    | **ഉപദേശാത്മകം** |

പ്രകടനത്തിന്റെ അടിസ്ഥാന മാനങ്ങൾ (heap, TTFB, build time) രേഖപ്പെടുത്തുന്നതേയുള്ളൂ, അവ gate ചെയ്യില്ല: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) കാണുക (`npm run perf:lts-baseline`).

---

## Velocity ഘട്ടം (2026-08-30 → v4.0 LTS): എല്ലാ ബേസ്ലൈനുകളും 20% ഇളവാക്കി

ഉടമയുടെ തീരുമാനം (2026-08-30): v4.0 മോഡുലറൈസേഷൻ പൂർത്തിയാകുന്നതുവരെ, ഡെബ്റ്റ് പരിധി
പിടിച്ചുനിർത്തുന്നതിനേക്കാൾ ഷിപ്പിംഗ് വേഗതയ്ക്കാണ് കൂടുതൽ പ്രാധാന്യം. എല്ലാ **സംഖ്യാത്മക**
റാച്ചറ്റ് ബേസ്ലൈനുകളും ഓഡിറ്റ് ചെയ്യാവുന്ന ഒരു പാസിൽ 20% ഇളവാക്കി, ഘട്ടം
`config/quality/quality-baseline.json`-ൽ പ്രഖ്യാപിച്ചിരിക്കുന്നു:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| മാറ്റിയത്                                                                                                                                                                                                                  | സ്ഥലം                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — കുറയുന്നതാണ് മെച്ചമെന്ന കണക്കുകൾ ×1.2, കൂടുന്നതാണ് മെച്ചമെന്ന ശതമാനങ്ങൾ ÷1.2 (coverage floor 60 നിലനിർത്തി, `eslintErrors` 0 ആയി തുടരും, `eslintWarnings` 0 → ഫ്രീസ് ചെയ്ത suppression count-ന്റെ 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` കുറിപ്പിൽ ഓരോ before → after മാറ്റവും നൽകിയിട്ടുണ്ട്) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                           | `complexity-baseline.json`, `duplication-baseline.json`                                                     |
| `cap`, `testCap`, ഓരോ `frozen[*]` / `testFrozen[*]` line cap-ഉം ×1.2                                                                                                                                                       | `file-size-baseline.json`                                                                                   |
| ഓരോ ഫയലിലെയും / ഓരോ TS-code-ലെയും കണക്കുകൾ ×1.2                                                                                                                                                                            | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`      |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                        | `scripts/check/check-openapi-coverage.mjs`                                                                  |
| `_policy.requireTighten === false` ആയിരിക്കുമ്പോൾ `--require-tighten` നിർദേശാത്മകമാകുന്നു                                                                                                                                  | `scripts/quality/check-quality-ratchet.mjs`                                                                 |
| nightly `bank-ratchet-shrinks` താൽക്കാലികമായി നിർത്തുന്നു (അത് അളന്ന shrink ബാങ്ക് ചെയ്ത് ലഭിച്ച headroom ഇല്ലാതാക്കും)                                                                                                    | `.github/workflows/nightly-release-green.yml`                                                               |

അനുവദനപ്പട്ടികകൾ (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) ബജറ്റുകളല്ല, അവയിൽ മാറ്റം വരുത്തിയിട്ടില്ല. പാസ്/ഫെയിൽ നയാ ഗേറ്റുകൾ (secrets, SQL rules,
docs/env contract, i18n parity, unit tests) മാറ്റമില്ലാതെ തുടരുന്നു — പരാജയപ്പെട്ട ടെസ്റ്റ് ഇപ്പോഴും പരാജയപ്പെട്ട ടെസ്റ്റാണ്.

**ടൂളിംഗ്**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ഈ
  ഏകത്തവണത്തെ ഇളവ് (`scripts/quality/relax-baselines.mjs`); ഒരേ കുറിപ്പോടെ രണ്ടുതവണ പ്രവർത്തിപ്പിക്കാൻ വിസമ്മതിക്കും.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI ചെയ്യുന്നതുപോലെ എല്ലാ സംഖ്യാത്മക ഗേറ്റുകളും അളന്ന്, ഓരോ ഗേറ്റിനും ശേഷിക്കുന്ന headroom പ്രിന്റ് ചെയ്യുന്നു
  (`scripts/quality/baseline-headroom.mjs`). nightly `baseline-headroom` job workflow run summary-യിൽ
  പട്ടിക പ്രസിദ്ധീകരിക്കുകയും JSON/Markdown റിപ്പോർട്ട് `baseline-headroom-<run_id>` എന്ന പേരിൽ അപ്ലോഡ് ചെയ്യുകയും
  ചെയ്യുന്നു; അത് 90 ദിവസത്തേക്ക് സൂക്ഷിക്കും. Warning, critical വരികൾ cap-ന്റെ 10%-നുള്ളിലുള്ളതോ
  ഇതിനകം അതിൽ കൂടുതലായതോ ആയ ഗേറ്റുകളെ തിരിച്ചറിയുന്നു. ബജറ്റുകൾ ഉപയോഗിക്കപ്പെടുന്നതിന്റെ early warning ആയി
  ഈ റിപ്പോർട്ടുകൾ പരിശോധിക്കുക; പ്രശ്നമുള്ള ഗേറ്റിന്റെ `_rebaseline_*` കുറിപ്പുകൾ പരിശോധിക്കുക. Job ഇനി
  സ്ഥിരമായ issue സൃഷ്ടിക്കുകയോ അപ്ഡേറ്റ് ചെയ്യുകയോ ഇല്ല; #12149 മുമ്പത്തെ റിപ്പോർട്ട് ചരിത്രം സംരക്ഷിക്കുന്നു.

**പുതിയ-കോഡ് മോഡ് (Clean-as-You-Code) — 2026-08-30 മുതൽ, PR fast-path-ൽ മാത്രം**

`pull_request` ഇവന്റുകളിൽ `quality.yml`, `check:file-size`,
`check:complexity-ratchets`, `check:dead-code` എന്നിവയ്ക്ക് `--base-ref <PR base SHA>` നൽകുന്നു. `check:complexity-ratchets`, `check:dead-code` എന്നിവയ്ക്കായി
ഗേറ്റ് merge-base-നെ **PR സ്പർശിച്ച ഫയലുകളിൽ മാത്രം പരിമിതപ്പെടുത്തി** HEAD-ുമായി താരതമ്യം ചെയ്യുന്നു
(`scripts/check/newCodeMode.mjs`: merge-base താൽക്കാലികമായി ഉപയോഗിക്കുന്ന ഒരു
`git worktree`-യിൽ materialize ചെയ്യുന്നു, ESLint/knip അവിടെയും HEAD-ലും പ്രവർത്തിപ്പിക്കുന്നു, ഓരോ ഫയലിലെയും
കണക്കുകൾ തമ്മിൽ diff ചെയ്യുന്നു):

- **blocking** — PR മാറ്റം വരുത്തിയ ഫയലുകളിൽ cyclomatic/cognitive ലംഘനങ്ങളോ dead exports-ഓ PR ചേർത്താൽ
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` എന്നിവ ലോഗിൽ);
- **advisory** — ഫ്രീസ് ചെയ്ത ബേസ്ലൈനുമായി താരതമ്യം ചെയ്യുന്ന ആഗോള ആകെ എണ്ണം. പാരമ്പര്യമായി ലഭിച്ച drift
  ഒരു നിരപരാധിയായ PR-നെ ഒരിക്കലും red ആക്കില്ല; release reconciliation സമയത്ത് drift വീണ്ടും freeze ചെയ്യുകയും
  headroom job അത് നിരീക്ഷിക്കുകയും ചെയ്യും.

`check:file-size` base ref-നെ സ്വന്തം നിബന്ധനകൾ പ്രകാരം ഉപയോഗിക്കുന്നു
(`scripts/check/check-file-size.mjs`, #8522):
ഇത് tree-യിലെ എല്ലാ source, test ഫയലുകളും പരിശോധിക്കുന്നു, `git show` ഉപയോഗിച്ച് PR base-ൽ ഓരോ ഫയലിന്റെയും
line count വായിക്കുന്നു, കൂടാതെ അതിന്റെ baseline ceiling
(`frozen` / `testFrozen`, അല്ലെങ്കിൽ baseline-ന് പുറത്തുള്ള ഫയലിനുള്ള `cap` / `testCap`)യും base
size-ഉം തമ്മിലുള്ള വലുതായ മൂല്യം കടന്നാൽ മാത്രമേ ഒരു ഫയൽ പരാജയപ്പെടുകയുള്ളൂ. Base-ൽ തന്നെ drift ചെയ്തിട്ടുള്ള
ഒരു ഫയൽ അതിനാൽ നിരപരാധിയായ PR-നെ ഒരിക്കലും red ആക്കില്ല.

`check:boundary:ratchet` അതിന്റെ ഏക സംഖ്യയ്ക്കും ഇതേ നിയമം പ്രയോഗിക്കുന്നു
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR ഇവന്റുകളിൽ
`quality.yml`-ലെ ഫാസ്റ്റ്-ഗേറ്റുകളും `ci.yml`-ലെ lint ജോബും PR-ന്റെ base SHA കൈമാറുന്നു,
base commit ഒരു `git archive` എക്സ്പോർട്ടിൽ നിന്ന് അളക്കുന്നു, കൂടാതെ അതിന്റെ
`open-sse → src` എഡ്ജ് എണ്ണം `metrics.boundaryOpenSseToSrc`-നും base-ലെ എണ്ണത്തിനും ഇടയിലെ
വലുതിനെ കവിയുമ്പോഴേ PR പരാജയപ്പെടുകയുള്ളൂ. ceiling-നു മുകളിലുള്ള base drift
(`base drift herdado`) റിപ്പോർട്ട് ചെയ്യും, എന്നാൽ നിരപരാധിയായ PR-നെ ഒരിക്കലും ചുവപ്പിക്കില്ല;
push → main absolute ceiling നിലനിർത്തുന്നു, പരിഹരിക്കാനാകാത്ത base SHA ഒരു മുന്നറിയിപ്പോടെ
അതിലേക്കു fallback ചെയ്യും.

ഒരു omni-queue candidate (ഒരു push to `omni-queue/**`, [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md)
കാണുക) ഒരു pull request-നു നൽകുന്ന അതേ പരിഗണനയാണ് ലഭിക്കുന്നത്: ഇരു workflows-കളും
candidate base (`needs.changes.outputs.candidateBase`) `--base-ref` ആയി കൈമാറുന്നു, കൂടാതെ
`check:ts7-diagnostics-ratchet` അതിനെതിരെയും പ്രവർത്തിക്കുന്നു. പുതിയ-code ഗേറ്റുകളിലെ
രണ്ടിനും comparison base ആ SHA തന്നെയാണ്, top merge commit-ന്റെ ആദ്യ parent അല്ല; അതിനാൽ
batch-ലുള്ള ഓരോ pull request-വും വിലയിരുത്തപ്പെടുന്നു.

`workflow_dispatch` runs, release-green sweep, nightly headroom job എന്നിവയ്ക്ക് PR base
ഇല്ലാത്തതിനാൽ absolute (global) comparison നിലനിർത്തുന്നു. Coverage, duplication, type-coverage
എന്നിവ ഇപ്പോൾ global ആയി തുടരും (അവയുടെ tools ഓരോ ഫയലിനുമുള്ള diff കുറഞ്ഞ ചെലവിൽ
ഉൽപ്പാദിപ്പിക്കുന്നില്ല) — ഇതേ പരിഗണനയ്ക്കുള്ള candidates.

**v4.0-ൽ ഘട്ടം അവസാനിപ്പിക്കൽ (LTS = മുമ്പത്തേക്കാൾ കൂടുതൽ കർശനമായത്, "സാധാരണ നിലയിലേക്ക് മടങ്ങൽ" അല്ല)**

1. ശുദ്ധമായ `release/v4.0.0` tip-ൽ: രേഖയ്ക്കായി `npm run quality:headroom --json`, തുടർന്ന്
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, ഓരോ typecheck gate-ന്റെയും
   `--update` — എല്ലാ baselines-ഉം അളന്ന മൂല്യത്തിലേക്ക് താഴുന്നു.
2. `quality-baseline.json`-ൽ നിന്ന് `_policy` നീക്കം ചെയ്യുക (`--require-tighten`-നും nightly
   banking-നും വീണ്ടും arm ചെയ്യുന്നു), `check-openapi-coverage.mjs`-ൽ
   `THRESHOLD = 36` (അല്ലെങ്കിൽ അതിലും ഉയർന്നത്) പുനഃസ്ഥാപിക്കുക.
3. modularization ഫലപ്രദമായിടങ്ങളിൽ അളന്നതിനെക്കാൾ കൂടുതൽ കർശനമാക്കുക: file-size `cap` വീണ്ടും
   1000 (അല്ലെങ്കിൽ 800) ആക്കുക, coverage floors +5, modularized packages-ുകൾക്കുള്ള dead exports 0.

## റാച്ചറ്റ് അടിസ്ഥാനരേഖ (`quality-baseline.json`)

റാച്ചറ്റ് എഞ്ചിൻ (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` വായിച്ച്,
പുതുതായി ശേഖരിച്ച `quality-metrics.json`-നുമായി താരതമ്യം ചെയ്യുന്നു. ഏതെങ്കിലും മെട്രിക്
അതിന്റെ എപ്സിലോണിനെക്കാൾ കൂടുതലായി പിന്നോട്ടുപോയാൽ ബിൽഡ് പരാജയപ്പെടും.

നിലവിൽ ട്രാക്ക് ചെയ്യുന്ന മെട്രിക്കുകൾ:

| മെട്രിക്              | ദിശ    | അർത്ഥം                                      |
| --------------------- | ------ | ------------------------------------------- |
| `eslintWarnings`      | `down` | ESLint മുന്നറിയിപ്പുകളുടെ എണ്ണം വർധിക്കരുത് |
| `coverage.statements` | `up`   | സ്റ്റേറ്റ്മെന്റ് കവറേജ് കുറയരുത്            |
| `coverage.lines`      | `up`   | ലൈൻ കവറേജ് കുറയരുത്                         |
| `coverage.functions`  | `up`   | ഫംഗ്ഷൻ കവറേജ് കുറയരുത്                      |
| `coverage.branches`   | `up`   | ബ്രാഞ്ച് കവറേജ് കുറയരുത്                    |

യഥാർത്ഥമായ മെച്ചപ്പെടുത്തലിന് ശേഷം അടിസ്ഥാനരേഖ അപ്ഡേറ്റ് ചെയ്യാൻ:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ഫ്ലാഗ് നിലവിൽ അളന്ന മൂല്യങ്ങൾ `quality-baseline.json`-ലേക്ക് എഴുതുന്നു.
മെച്ചപ്പെടുത്തൽ രേഖപ്പെടുത്തുന്നത് റിലീസ്/രാത്രികാല പ്രവർത്തനമാണ്, ഫീച്ചർ PR-ന്റെ പ്രവർത്തനമല്ല:
`--require-tighten` (ഘട്ടം 6A.5) രേഖപ്പെടുത്താത്ത മെച്ചപ്പെടുത്തലിൽ റിലീസ് മോഡിൽ മാത്രമാണ്
പരാജയപ്പെടുന്നത് (push, schedule, റിലീസ് PR, ലോക്കൽ റണ്ണുകൾ). ഒരു ഫീച്ചർ PR-ൽ (`pr` ഗേറ്റ്
മോഡ്) ഇത് മെച്ചപ്പെടുത്തലിനെ വിവരമായി പ്രിന്റ് ചെയ്ത് വിജയിക്കും; പിന്നോട്ടുപോക്ക് രണ്ട് മോഡുകളിലും
പരാജയപ്പെടും. വേഗതാ ഘട്ടത്തിൽ എല്ലായിടത്തും ഇത് ഉപദേശാത്മകമാണ്
(`_policy.requireTighten: false`). കാണുക
[Generated files and derived baselines](#generated-files-and-derived-baselines-written-at-release).

### CodeQL റാച്ചറ്റ്: പുതുക്കൽ ഇടവേളയും മാനുവൽ ട്രിഗറും

`check:codeql-ratchet` വായിക്കുന്നത് **ഓരോ PR-നും പുതുക്കുന്നതല്ല, ഒരു ഷെഡ്യൂളിൽ പുതുക്കുന്ന
റിപ്പോസിറ്ററി നിലയാണ്.** `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup`
`state: configured`, `schedule: weekly` എന്ന് റിപ്പോർട്ട് ചെയ്യുന്നു: ഓരോ push-നും നടത്തുന്ന
വിശകലനം അല്ല, GitHub-ന്റെ default-setup സ്കാനാണ് ഇത്. ഇതിന്റെ ഫലമായി, അലർട്ടുകൾ
പരിഹരിക്കുന്ന ഒരു PR ലയിച്ചതിന് ശേഷം, അടുത്ത ഷെഡ്യൂൾ ചെയ്ത സ്കാൻ നടക്കുന്നതുവരെ റാച്ചറ്റ്
പഴയതും കൂടുതലുമായ എണ്ണമാണ് വായിക്കുന്നത് — അതിനാൽ പരിഹരിക്കുന്ന PR-യുടെ സ്വന്തം തുടർ
പ്രവർത്തനങ്ങൾ ഉൾപ്പെടെ, തുറന്നിരിക്കുന്ന എല്ലാ PR-കളിലും ഇത് പിന്നോട്ടുപോക്ക് റിപ്പോർട്ട് ചെയ്യും,
സ്കാൻ പുതുക്കുന്നതുവരെ.

**മാനുവൽ പുതുക്കൽ**: `gh workflow run codeql.yml --ref release/vX.Y.Z` വിശകലനം വീണ്ടും
നടത്തി മിനിറ്റുകൾക്കുള്ളിൽ അലർട്ടുകൾ വീണ്ടും പ്രസിദ്ധീകരിക്കും. ആദ്യം
`.github/workflows/codeql.yml` വായിക്കുക — അത് **GitHub-ന്റെ "default setup"**-മായി
സംഘർഷിക്കുന്നതിനാൽ ഇത് `workflow_dispatch`-only ആണെന്ന് അതിന്റെ ഹെഡർ വിശദീകരിക്കുന്നു
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
`push`/`pull_request`/`schedule` ട്രിഗറുകൾ പുനഃസ്ഥാപിക്കുന്നതിന് ആദ്യം ഒരു **ഉടമയുടെ
നടപടി** ആവശ്യമാണ്: Settings → Code security → CodeQL: Default → Advanced. ആ സ്വിച്ച്
ഓൺ ചെയ്യാതെ `schedule:` ട്രിഗർ ചേർക്കരുത് — അത് പരാജയപ്പെടുന്ന റണ്ണുകൾ മാത്രമേ ഉണ്ടാക്കൂ.

**എണ്ണം കുറയുമ്പോൾ അടിസ്ഥാനരേഖ കൂടുതൽ കർശനമാക്കുക** —
`node scripts/check/check-codeql-ratchet.mjs --update` പുതിയ അളന്ന എണ്ണം
`quality-baseline.json` → `metrics.codeqlAlerts.value`-ലേക്ക് എഴുതുന്നു. അതിനാൽ പഴയ
പരിധിയിലേക്ക് തിരിച്ചുള്ള പിന്നോട്ടുപോക്ക് റാച്ചറ്റ് നിശ്ശബ്ദമായി അനുവദിക്കില്ല. പ്രവർത്തിച്ച
ഉദാഹരണം (2026-09-02/03): PR #12502 7 യഥാർത്ഥ അലർട്ടുകൾ പരിഹരിച്ചു (അളന്ന നിലയിൽ തുറന്നവ
13 → 6); PR #12530 പൊരുത്തപ്പെടുന്നതിനായി ഫ്രീസ് ചെയ്ത അടിസ്ഥാനരേഖ 11 → 6 ആയി കർശനമാക്കി;
ശേഷിച്ച 6 എണ്ണം ഓരോ അലർട്ടിനുമുള്ള ന്യായീകരണത്തോടെ പിന്നീട് dismiss ചെയ്ത് തുറന്നവയുടെ എണ്ണം
0 ആക്കി.

**Dismissal-കൾ ഓപ്പറേറ്ററുടെ തീരുമാനമാണ് (കർശന നിയമം #14)** — സാങ്കേതിക ന്യായീകരണം
dismissal കമന്റിൽ രേഖപ്പെടുത്താതെ ഒരിക്കലും CodeQL അലർട്ട് dismiss ചെയ്യരുത്:
അപ്സ്ട്രീം-പ്രോട്ടോക്കോൾ ആവശ്യകതയ്ക്ക് `won't fix`, ടെസ്റ്റ് ഫിക്ചറിന് `used in tests`,
CodeQL-ന് കാണാനാകാത്ത സാനിറ്റൈസറിന് `false positive` (മുൻ മാതൃക:
`docs/security/ERROR_SANITIZATION.md`).

---

## ടെസ്റ്റ് റീട്രൈ നയം (WS5.4, v3.8.49)

റീട്രൈ ഓരോ റണ്ണറിനും പ്രത്യേകം ബാധകമാണ്; ഒരിക്കലും ആഗോളമായി എല്ലാത്തിനും ബാധകമാകില്ല — അത്തരം ഒരു ബ്ലാങ്കറ്റ് റീട്രൈ യഥാർത്ഥ റിഗ്രഷനുകളെ
കാണാൻ കഴിയാത്ത ഫ്ലേക്കുകളാക്കി മാറ്റുന്നു:

| റണ്ണർ            | നയം                                                                                                                                          | കാരണം                                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Playwright (e2e) | CI-യിൽ മാത്രം `retries: 1`, കൂടെ `trace: on-first-retry`                                                                                     | ബ്രൗസർ/നെറ്റ്വർക്ക് ടൈമിംഗ് യഥാർത്ഥത്തിൽ നിർണയിക്കാനാവാത്തതാണ്; ട്രേസോടുകൂടിയ ഒരു റീട്രൈ, ഒരു ഫ്ലേക്കിനെ രോഗനിർണയം നടത്താവുന്ന ആർട്ടിഫാക്റ്റാക്കി മാറ്റുന്നു |
| Vitest           | ആഗോള റീട്രൈ ഇല്ല. ഫ്ലേക്കിയാണെന്ന് തെളിയിക്കപ്പെട്ട ടെസ്റ്റിന് വ്യക്തമായ ഓരോ-ടെസ്റ്റ് റീട്രൈ നൽകും (diff-ൽ ദൃശ്യമാകും, PR-ൽ അവലോകനം ചെയ്യും) | ക്വാറന്റൈൻ പട്ടികയെ repo-യിൽ നിലനിർത്തുന്നു; ഒരിക്കലും അവ്യക്തമാക്കുന്നില്ല                                                                                  |
| node:test (unit) | ഒരിക്കലും റീട്രൈ ഇല്ല                                                                                                                        | ഫ്ലേക്കിയായ യൂണിറ്റ് ടെസ്റ്റ് ടെസ്റ്റിലെ ഒരു ബഗ് ആണ് — അത് പരിഹരിക്കുക, വീണ്ടും പ്രവർത്തിപ്പിച്ച് ഭാഗ്യം പരീക്ഷിക്കരുത്                                      |

ഫ്ലേക്ക് ടെലിമെട്രി ലഭ്യമായിക്കഴിഞ്ഞുള്ള ലക്ഷ്യ SLO-കൾ (WS5.2/5.3): ഓരോ ടെസ്റ്റിനും <1% ഫ്ലേക്ക് നിരക്ക്
("ഇപ്പോൾ പരിഹരിക്കുക" എന്ന പരിധി), ഓരോ പൈപ്പ്ലൈനും ≥95% വിജയനിരക്ക്. ഇവ വ്യവസായ റഫറൻസ് മൂല്യങ്ങളാണ് —
നമ്മുടെ സ്വന്തം അളവുകൾക്കനുസരിച്ച് വീണ്ടും കാലിബ്രേറ്റ് ചെയ്യുക.

## റിലീസ്-തല റാച്ചറ്റ് ഡ്രിഫ്റ്റ് (WS5.5, v3.8.49)

ഒരു റാച്ചറ്റ് (ഫയൽ വലുപ്പം, സങ്കീർണ്ണത, eslint മുന്നറിയിപ്പുകൾ) ശുദ്ധമായ റിലീസ്
ടിപ്പിൽ റിഗ്രസ് ചെയ്യുമ്പോൾ — അതായത്, മെർജുകളുടെ **സംയോജനമാണ്** അതിനെ റിഗ്രസ് ചെയ്തത്, ഒരു PR-നും അതിന്റെ
സ്വന്തം ബ്രാഞ്ചിൽ ആ റിഗ്രഷൻ ഒറ്റയ്ക്ക് പുനരാവിഷ്കരിക്കാൻ കഴിയുന്നില്ല — പരിഹാരം **റിലീസ് ക്യാപ്റ്റന്റെ ഉത്തരവാദിത്തമാണ്; ഒരിക്കൽ മാത്രം,
റിലീസ് ബ്രാഞ്ചിൽ**: എക്സ്ട്രാക്ഷൻ/റീഫാക്ടർ ചെയ്യുന്നതിന് മുൻഗണന നൽകുക; രേഖപ്പെടുത്തിയ
ന്യായീകരണ എൻട്രിയോടുകൂടി മാത്രമേ റീബേസ്ലൈൻ ചെയ്യാവൂ. കോമ്പിനേഷൻ ഡ്രിഫ്റ്റ് ഒരിക്കലും ഒരു കോൺട്രിബ്യൂട്ടർ PR-ലേക്ക് തള്ളരുത്, കൂടാതെ
ഓരോ PR-നും പ്രത്യേകം റീബേസ്ലൈൻ ചെയ്യരുത് (അത് യഥാർത്ഥ റിഗ്രഷനുകൾ മറയ്ക്കുന്നു). ആദ്യം വേർതിരിച്ചറിയുക: നിങ്ങളുടെ PR ആണ് അതിന് കാരണമായതെന്ന് കരുതുന്നതിന് മുമ്പ്,
ഒരു പ്രോബ് വർക്ക്ട്രീയിൽ ശുദ്ധമായ ടിപ്പിനെതിരെ പരാജയം പുനരാവിഷ്കരിക്കുക.

## ജനറേറ്റ് ചെയ്ത ഫയലുകളും ഡിറൈവുചെയ്ത ബേസ്ലൈനുകളും (റിലീസ് സമയത്ത് എഴുതുന്നത്)

പ്ലാൻ 2026-11-13 ("ഡിറൈവുചെയ്ത സംഖ്യകളും ടെക്സ്റ്റുകളും റിലീസ് സമയത്ത് മാത്രം പരിഹരിക്കുന്നു"): ഒരു ഫീച്ചർ PR
**ഉറവിടം** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, സ്കിൽ കാറ്റലോഗ്,
ഫ്രീ-ടയർ കാറ്റലോഗ്, ഒരു പുതിയ e2e സ്പെക് — മാറ്റുന്നു. ആ ഉറവിടത്തിൽ നിന്ന് കണക്കാക്കുന്ന ഫയലുകൾ ഇത്
പുനർജനിപ്പിക്കുന്നില്ല, കൂടാതെ അളന്ന മെച്ചപ്പെടുത്തലൊന്നും ഒരു ബേസ്ലൈനിലേക്ക് ബാങ്ക് ചെയ്യുന്നില്ല. ആ ഫയലുകൾ
റിലീസ് റിഫ്രഷ് (`release:refresh-derived`) വഴിയോ ഒരു നൈറ്റ്ലി റിഫ്രഷ് PR വഴിയോ ഒരിക്കൽ മാത്രം
എഴുതപ്പെടുന്നു. ഇതിന് മുമ്പ്, ഓരോ സഹോദര PR-വും തങ്ങളുടേതായ പുനർജനിപ്പിച്ച പകർപ്പ് ഉൾപ്പെടുത്തിയിരുന്നു; അടുത്ത
മർജുമായി അത് കോൺഫ്ലിക്റ്റ് ചെയ്യുകയും ചെയ്തു (2026-11-13: തുറന്ന 321 PR-കളിൽ 30 എണ്ണം
`PROVIDER_REFERENCE.md` പുനഃഎഴുതി, 26–28 എണ്ണം README ഡയഗ്രാമുകൾ പുനഃഎഴുതി).

**ഗാർഡ്.** `check:pr-derived-paths` (`pr-test-policy` ജോബ്) `config/quality/derived-paths/`-ലെ ഒരു
കുടുംബത്തിലെ ഫയലിനെ സ്പർശിക്കുന്ന ഫീച്ചർ PR പരാജയപ്പെടുത്തുന്നു:

| കുടുംബം     | ഫയലുകൾ                                                                                                                                                                                      | പുനഃഎഴുതുന്നത്                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; പന്ത്രണ്ട് ജനറേറ്റ് ചെയ്ത README SVG-കൾ; `skills/*/references/**`; കസ്റ്റം ബ്ലോക്ക് ഇല്ലാത്ത `SKILL.md` ഫയലുകൾ | `release:refresh-derived` (facts), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                           | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                     |

റൈറ്റർമാരായ (`release/v*`, `chore/derived-*`, ബേസ്ലൈനുകൾക്കായുള്ള `chore/bank-ratchet-*`) ഇവയ്ക്ക്
ഒഴിവുണ്ട്; ഒരു കുടുംബവും അതിന്റെ അനുബന്ധ ഫയലുകളും മാത്രം മാറ്റുന്ന PR-നും ഇതേ ഒഴിവുണ്ട്
(`generated`-നായി: ജനറേറ്റർ സ്ക്രിപ്റ്റുകൾ, അവയുടെ ടെസ്റ്റുകൾ, ഏജന്റ്-സ്കിൽ ഇൻപുട്ടുകൾ —
`src/shared/constants/agentSkills.ts`, കൈയെഴുതിയ `skills/**` ഡോക്സ്, `docs/openapi.yaml` —
കൂടാതെ `changelog.d/**`), ഉദാഹരണത്തിന്, പുനർജനിപ്പിച്ച SVG-യോടൊപ്പമുള്ള ഒരു ഹീറോ ലേയൗട്ട് മാറ്റം,
അല്ലെങ്കിൽ പുനർജനിപ്പിച്ച `SKILL.md` ഫയലുകൾ വായിക്കുന്ന ടെസ്റ്റുള്ള ഒരു സ്കിൽ പരിഹാരം. കൈയെഴുതിയ
`<!-- skill:custom-start -->` ബ്ലോക്കുള്ള `SKILL.md` കുടുംബത്തിൽ ഉൾപ്പെടുന്നില്ല: അതിലെ കസ്റ്റം ബ്ലോക്ക്
ഒരു ഫീച്ചറിനോടൊപ്പം തന്നെ എഡിറ്റ് ചെയ്യാവുന്നതായി തുടരും.

**ഓരോ ഗേറ്റ് മോഡിലുമുള്ള പരിശോധനകൾ** (`scripts/check/lib/gateMode.mjs`; ഹെൽപ്പർ
`scripts/check/lib/derivedArtifactScope.mjs`):

| പരിശോധന                                                                                 | `release` (push, schedule, release PR, local)                                                           | `pr` (feature PR, queue batch)                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:agent-skills-sync`                                                               | ഓരോ സ്കിലും ജനറേറ്റർ ഔട്ട്പുട്ടുമായി തുല്യമായിരിക്കണം                                                   | PR എഡിറ്റ് ചെയ്യുന്ന ജനറേറ്റ് ചെയ്ത ടെക്സ്റ്റ് (കസ്റ്റം ബ്ലോക്കിന് പുറത്തുള്ളത്) അല്ലെങ്കിൽ `references/` ഉള്ള സ്കിലുകൾ മാത്രം; അല്ലെങ്കിൽ `SKIP reason=pr-mode`                                                                                                   |
| `check:generated-artifacts` (README SVG-കളും e2e ടൈമിംഗുകളും; പൂർണ്ണ ചരിത്രം ആവശ്യമാണ്) | ഓരോ SVG-യും അതിന്റെ ജനറേറ്ററുമായി തുല്യമായിരിക്കണം; ഓരോ സ്പെക്കിനും ഒരു ടൈമിംഗ്സ് എൻട്രി ഉണ്ടായിരിക്കണം | PR എഡിറ്റ് ചെയ്യുന്ന ആർട്ടിഫാക്റ്റുകൾ മാത്രം; ശേഷിക്കുന്നവ `SKIP reason=pr-mode`; ഡിഫ് ബേസ് ഇല്ലെങ്കിൽ → എല്ലാ ആർട്ടിഫാക്റ്റുകളും വിലയിരുത്തപ്പെടും (fail-closed)                                                                                                  |
| README SVG ബൈറ്റ്-കംപെയർ ടെസ്റ്റുകൾ (`tests/unit/docs/readme-*-svg.test.ts`)            | ഓരോ SVG-യും                                                                                             | PR എഡിറ്റ് ചെയ്യുന്ന ഒരു SVG മാത്രം, ബേസ് പരിഹരിക്കാനാകുമ്പോൾ; `test-unit`-ന്റെ shallow PR checkout-ന് ബേസ് ഇല്ല, അതിനാൽ അവിടെ ടെസ്റ്റ് `SKIP reason=base-unresolved` ഉപയോഗിച്ച് ഒഴിവാക്കുകയും താരതമ്യം `check:generated-artifacts` കൈകാര്യം ചെയ്യുകയും ചെയ്യുന്നു |
| e2e ടൈമിംഗ്സ് പൂർണ്ണത (`tests/unit/balance-e2e-shards.test.ts`)                         | ഓരോ സ്പെക്കിനും ഒരു എൻട്രി ഉണ്ടായിരിക്കണം                                                               | SVG ടെസ്റ്റുകൾക്കുള്ള അതേ നിയമം (ഒരു പുതിയ സ്പെക് മീഡിയൻ ഭാരത്തോടെ പ്രവർത്തിക്കും)                                                                                                                                                                                 |
| `check-quality-ratchet.mjs --require-tighten`                                           | ബാങ്ക് ചെയ്യാത്ത മെച്ചപ്പെടുത്തൽ പരാജയപ്പെടും (`_policy` ഒഴികെ)                                         | മെച്ചപ്പെടുത്തൽ റിപ്പോർട്ട് ചെയ്യും, ഒരിക്കലും പരാജയപ്പെടില്ല; റിഗ്രഷൻ ഇപ്പോഴും പരാജയപ്പെടും                                                                                                                                                                       |

Release മോഡ്, split ചെയ്യുന്നതിന് മുമ്പ് ഈ checks-ക്കുണ്ടായിരുന്ന verdict-ുകളും exit code-ുകളും സന്ദേശങ്ങളും നിലനിർത്തുന്നു; പരമാവധി ഒരു വരി മാത്രമാണ് ചേർക്കുക, അതിൽ പരിഹരിച്ച മോഡ് (`[agent-skills-sync] mode=release (auto: local run)`) രേഖപ്പെടുത്തും.  
`node:test`-ന്റെ `{ skip: releaseOnlyUnlessTouched(...) }` ഓപ്ഷനിലൂടെയാണ് ടെസ്റ്റുകൾ ഒഴിവാക്കുന്നത്. `check:test-masking` ഇത് report-only ബ്ലോക്കിൽ പട്ടികപ്പെടുത്തുന്നു (`.skip(`-ഉം `{ skip: true }`-ഉം അല്ലാത്തതിനാൽ ഇത് hard skip ആയി കണക്കാക്കില്ല). Base പരിഹരിക്കാനാകുന്നിടത്ത് `check:generated-artifacts` പ്രവർത്തിക്കുന്നു: `lint` job-ൽ (`fetch-depth: 0`), `check:agent-skills-sync`-ന് തൊട്ടുപിന്നാലെ. പ്രാദേശികമായി, `npm run check:generated-artifacts -- --mode=pr` പ്രവർത്തിപ്പിച്ചാൽ PR-ൽ ആ ഘട്ടം എന്താണ് വിലയിരുത്തുന്നതെന്ന് കാണാം. `check:docs-counts`-ന്റെ provider-total cross-check (`"Provider reference total (doc vs live modules)"`) counts gate-ന്റെ ഭാഗമാണ്, കൂടാതെ ആ gate-ന്റെ സ്വന്തം മോഡുകൾ പിന്തുടരുന്നു.

ഒരു family-യിലും ഉൾപ്പെടാത്തവ, ഉദ്ദേശപൂർവ്വം: ആളുകൾ തീരുമാനിക്കുന്ന policy ഫയലുകൾ (`gate-manifest.json`, allowlists, `admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`), കൂടാതെ ഒരു feature PR-ന് code-നൊപ്പം ഒരുമിച്ച് തിരുത്തേണ്ടിവരാവുന്ന ceilings (`quality-baseline.json`-ലെ metric entries, typecheck/file-size/complexity baselines, `eslint-suppressions.json` — ഒരു PR frozen violation പരിഹരിക്കുമ്പോൾ pre-commit ESLint run ഇത് prune ചെയ്യും). `src/i18n/routeNamespaces.generated.json`-ഉം generated ആണെങ്കിലും feature PR-കളിൽ തന്നെ തുടരും: app ഇത് run time-ൽ import ചെയ്യുന്നതിനാൽ refresh വരുന്നതുവരെ കാത്തിരിക്കാനാകില്ല.

## റാച്ചറ്റ് ചുരുക്കങ്ങൾ ബാങ്ക് ചെയ്യൽ — താഴോട്ടുള്ള ദിശ (#8584)

റാച്ചറ്റ് പകുതി മാത്രമാണ് ഓട്ടോമാറ്റിക്, ഓട്ടോമാറ്റിക്കായിരിക്കുന്നത് തെറ്റായ പകുതിയുമാണ്. ഒരു പരിധി **ഉയർത്തുന്നത്**
പത്ത് സെക്കൻഡ് മാത്രം എടുക്കുന്ന മാനുവൽ JSON തിരുത്തലാണ്; പരാജയപ്പെടുന്ന PR-ന്റെ തടസ്സം നീക്കാനുള്ള ഏറ്റവും വേഗമേറിയ മാർഗവും അതാണ്.
ഒരു പരിധി **താഴ്ത്തുന്നതിന്**, ആരെങ്കിലും `--update` പ്രവർത്തിപ്പിച്ച് ഫലം കമ്മിറ്റ് ചെയ്യണം — കൂടാതെ
`bank-ratchet-shrinks` job വരുന്നതുവരെ ഒരു workflow-വും അത് പ്രവർത്തിപ്പിച്ചിരുന്നില്ല. അളന്ന ഫലം
(2026-07-25): 18 ഫ്രോസൺ ഫയലുകൾ ഇതിനകം 800-ലൈൻ പുതിയ-ഫയൽ പരിധിയിലോ അതിൽ താഴെയോ ആയിരുന്നു; ഏറ്റവും മോശമായത്
132× (`src/shared/validation/schemas.ts`, 2,523 പരിധി നിലനിർത്തുന്ന 19 വരികൾ); സങ്കീർണ്ണതാ പരിധി
~37 റീബേസ്ലൈൻ കുറിപ്പുകളിലൂടെ `1794 → 2169` ആയി ഉയർന്നു, കൃത്യമായി ഒരേയൊരു കുറവോടെ
(−1); കൂടാതെ "അടുത്ത സൈക്കിളിൽ `--update` വഴി കർശനമാക്കുക" എന്ന് 31 തവണ എഴുതിയെങ്കിലും
ഒരിക്കൽ മാത്രമാണ് പാലിക്കപ്പെട്ടത്. അതിന് അർഹത നൽകിയ കോഡിനേക്കാൾ കൂടുതൽ കാലം നിലനിൽക്കുന്ന ഒരു പരിധി, പൂർത്തിയാക്കിയ ഓരോ
ഡീകമ്പോസിഷനെയും നിശ്ശബ്ദമായി ആ ഫയൽ അടുത്തതായി തിരുത്തുന്നയാൾക്കുള്ള വളർച്ചാ അലവൻസാക്കി മാറ്റുന്നു.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** ആ ലൂപ്പ് അടയ്ക്കുന്നു:

|                    |                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| പ്രവർത്തിക്കുന്നത് | `schedule` (ദിവസം 3×) + `workflow_dispatch` — മനഃപൂർവം `push`-ൽ **അല്ല**                                               |
| അളക്കുന്നത്        | ഏറ്റവും ഉയർന്ന `release/vX.Y.Z`; `release-green`-ലെ അതേ റെസല്യൂഷനും ഇൻജക്ഷൻ ഗാർഡും                                     |
| എഴുതുന്നത്         | `check:file-size --update`, `check:complexity-ratchets --update` എന്നിവ (രണ്ടും രൂപകൽപ്പനപ്രകാരം ചുരുക്കൽ മാത്രം)      |
| പരിശോധിക്കുന്നത്   | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                               |
| അയയ്ക്കുന്നത്      | റിലീസ് ബ്രാഞ്ചിനെതിരെ എല്ലായ്പ്പോഴും നിലവിലുള്ള ഒരൊറ്റ PR — നിർബന്ധിതമായി അപ്ഡേറ്റ് ചെയ്യും, ഒരിക്കലും സ്പാം ചെയ്യില്ല |

ബാങ്കിംഗ് ഓരോ പുഷിനും പകരം ബാച്ചായാണ് നടത്തുന്നത്, കാരണം അതിന് ലേറ്റൻസി ആവശ്യകതയില്ല (8h-നുള്ളിൽ
ഒരു ചുരുക്കം ബാങ്ക് ചെയ്താൽ മതി); അതേസമയം ഓരോ മെർജിനുമുള്ള റൺ, മെർജ് കാമ്പെയ്നുകളുടെ സമയത്ത് PR ബ്രാഞ്ച് ആവർത്തിച്ച്
റീബിൽഡ് ചെയ്യുകയും ഓരോ തവണയും സമ്പൂർണ്ണ ESLint പരിശോധനയ്ക്കുള്ള ചെലവ് വഹിക്കുകയും ചെയ്യും. കണ്ടെത്തൽ `push`-ൽ തന്നെ തുടരുന്നു
(`release-green`); ബാങ്കിംഗ് മാത്രമാണ് ബാച്ച് ചെയ്യുന്നത്.

### സുരക്ഷാ വെരിഫയർ

job മേൽനോട്ടമില്ലാതെ ബേസ്ലൈനുകളിലേക്ക് എഴുതുന്നതിനാൽ, അത് സ്വീകാര്യമാക്കുന്നത് `verify-ratchet-bank.mjs` ആണ്.
ഇത് `--update`-ന് ശേഷമുള്ള ട്രീയെ `HEAD`-മായി diff ചെയ്യുകയും, ഓരോ മാറ്റവും താഴെപ്പറയുന്നവയിൽ ഒന്നല്ലെങ്കിൽ,
**ഏതെങ്കിലും കമ്മിറ്റ് ഉണ്ടാകുന്നതിന് മുമ്പ് job നിർത്തലാക്കുകയും** ചെയ്യുന്നു — ഒരു PR-ഉം തുറക്കില്ല:

- `frozen` / `testFrozen` സംഖ്യാ എൻട്രി **താഴ്ത്തിയത്** അല്ലെങ്കിൽ **നീക്കിയത്**
- `complexity-baseline.json` → `count` **താഴ്ത്തിയത്**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **താഴ്ത്തിയത്**

മറ്റെന്തും പരാജയപ്പെടും: ഒരു സംഖ്യ ഉയർത്തുക, ഒരു എൻട്രി ചേർക്കുക, `cap`/`testCap` മാറ്റുക, അല്ലെങ്കിൽ
ഒരു `_rebaseline_*` കുറിപ്പ് ഇല്ലാതാക്കുക/വീണ്ടും എഴുതുക (ഓരോ പരിധിയും എന്തുകൊണ്ട് നിലവിലുണ്ട് എന്നതിനുള്ള ഓഡിറ്റ് ട്രെയിലാണ് ആ കുറിപ്പുകൾ;
ഫയൽ എൻട്രികൾക്കൊപ്പം അതേ `frozen` ഒബ്ജക്റ്റിനുള്ളിലാണ് അവ സൂക്ഷിച്ചിരിക്കുന്നത്).
ഒരു പരിധി ഉയർത്താൻ കഴിയുന്ന ബോട്ട് നിലവിലെ അവസ്ഥയെക്കാൾ തീർച്ചയായും മോശമായിരിക്കും. റിഗ്രഷൻ
ഗാർഡ്: `tests/unit/verify-ratchet-bank.test.ts`.

job ഒരിക്കലും `release/*`-ലേക്ക് പുഷ് ചെയ്യില്ല — ഒരു മനുഷ്യൻ PR മെർജ് ചെയ്യുന്നതിനാൽ, തെറ്റായ അളവ്
അവലോകനം ചെയ്യപ്പെടാതെ ഉൾപ്പെടാൻ കഴിയില്ല.

## അനുവദനീയ പട്ടിക നയം

മുൻകൂട്ടി നിലനിന്ന ലംഘനങ്ങളിൽ പരാജയപ്പെടാൻ കഴിയാത്ത എല്ലാ ഗേറ്റുകളും ഒരു മരവിപ്പിച്ച അനുവദനീയ പട്ടിക ഉപയോഗിക്കുന്നു
(ഉദാ., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). നയം ഇതാണ്:

**മൂലകാരണമാണ് പരിഹരിക്കേണ്ടത്; ലംഘനം മുൻകൂട്ടി നിലനിന്നതും അതേ PR-ൽ
പരിഹരിക്കാൻ കഴിയാത്തതുമായ സാഹചര്യങ്ങളിൽ മാത്രം അനുവദനീയ പട്ടിക ഉപയോഗിക്കുക.**

അനുവദനീയ പട്ടികയിൽ ഒരു എൻട്രി ചേർക്കുമ്പോൾ:

1. വിശദീകരണത്തോടുകൂടിയ ഒരു കമന്റ് ഉൾപ്പെടുത്തുക.
2. ട്രാക്കിംഗ് ഇഷ്യൂ പരാമർശിക്കുക (ഉദാ., `// #3498 — Phase 2 feature, not yet implemented`).
3. ലംഘനം പരിഹരിക്കുന്ന അതേ PR-ൽ എൻട്രി നീക്കം ചെയ്യുക — സജീവമായ ഒരു ലംഘനം ഇനി
   അടിച്ചമർത്താത്ത പഴകിയ എൻട്രി തന്നെ ഒരു തകരാറാണ് (നടപ്പിലാക്കിയാൽ 6A.3 stale-enforcement
   ഒരു അനാഥ അനുവദനീയ പട്ടിക എൻട്രിയിലുള്ള ഗേറ്റിൽ പരാജയപ്പെടും).

ടെസ്റ്റുകൾ വേഗത്തിൽ വിജയിപ്പിക്കാനായി അനുവദനീയ പട്ടിക എൻട്രികൾ ചേർക്കരുത്. വളർന്നുകൊണ്ടിരിക്കുന്ന
അനുവദനീയ പട്ടികയോടുകൂടിയ പച്ച ഗേറ്റ് ഗുണനിലവാരത്തെക്കുറിച്ചുള്ള തെറ്റായ ധാരണയാണ്.

### നിങ്ങളുടെ PR-ൽ ഒരു ഗേറ്റ് പരാജയപ്പെടുമ്പോൾ

1. **ഗേറ്റിന്റെ ഔട്ട്പുട്ട് ശ്രദ്ധാപൂർവം വായിക്കുക** — നിയമം ലംഘിച്ച കൃത്യമായ ഫയലോ സിംബലോ അത് വ്യക്തമാക്കുന്നു.
2. **ലംഘനം പരിഹരിക്കുക** — മിക്ക ഗേറ്റുകളും കോഡ് ശരിയായ ഉടൻ വിജയിക്കുന്ന നിർണയാത്മക ഫയൽസിസ്റ്റം പരിശോധനകളാണ്.
3. **ലംഘനം മുൻകൂട്ടി നിലനിന്നതാണെങ്കിൽ** (അതായത്, നിങ്ങൾ അത് അവതരിപ്പിച്ചിട്ടില്ലെങ്കിലും ഗേറ്റ് ഇപ്പോൾ അത് ഉൾക്കൊള്ളുന്നുവെങ്കിൽ): വിശദീകരണ കമന്റും ട്രാക്കിംഗ് ഇഷ്യൂവും സഹിതം അനുവദനീയ പട്ടിക എൻട്രി ചേർക്കുക.
4. **ഗേറ്റ് ഒരു റാച്ചറ്റാണെങ്കിൽ** (കവറേജ്, ESLint മുന്നറിയിപ്പുകൾ, ഡ്യൂപ്ലിക്കേഷൻ, സങ്കീർണ്ണത):
   നിങ്ങളുടെ മാറ്റം മെട്രിക് മോശമാക്കി. അടിസ്ഥാന പ്രശ്നം പരിഹരിക്കുക, അല്ലെങ്കിൽ (അപൂർവമായി മാത്രം)
   മാറ്റം ഉദ്ദേശ്യപ്രകാരമുള്ളതും മെട്രിക് കുറയുന്നത് അംഗീകരിക്കാവുന്നതുമായെങ്കിൽ
   `npm run quality:ratchet -- --update` പ്രവർത്തിപ്പിക്കുക — എന്നാൽ PR വിവരണത്തിൽ കാരണം രേഖപ്പെടുത്തുക.
5. **ഉപദേശാത്മക ഗേറ്റുകൾ** (`continue-on-error: true`) വിവരാവശ്യത്തിനുള്ളവയാണ് — അവ
   ലയനം തടയില്ലെങ്കിലും CI സംഗ്രഹത്തിൽ പ്രത്യക്ഷപ്പെടും. എന്നിരുന്നാലും അവ പരിഹരിക്കുക.

---

## ഒരു പുതിയ ഗേറ്റ് ചേർക്കൽ

1. `scripts/check/check-<name>.mjs` (അല്ലെങ്കിൽ `.ts`) സൃഷ്ടിക്കുക. നയ ഗേറ്റുകൾ 0/1 നിലയിൽ പുറത്തുകടക്കുന്നു.
   റാച്ചെറ്റ്-രീതിയിലുള്ള ഗേറ്റുകൾ `collect-metrics.mjs` വഴി `quality-metrics.json`-ലേക്ക് ഒരു മെട്രിക് പുറപ്പെടുവിക്കുന്നു.
2. `package.json`-ലേക്ക് `"check:<name>": "node scripts/check/check-<name>.mjs"` ചേർക്കുക.
3. ഉചിതമായ ജോബിന് കീഴിൽ `.github/workflows/ci.yml`-ൽ അത് ബന്ധിപ്പിക്കുക
   (നയം → `lint` അല്ലെങ്കിൽ `docs-sync-strict`; റാച്ചെറ്റ് → `quality-gate`).
4. അതിന് ഒരു അനുവദനീയ പട്ടികയുണ്ടെങ്കിൽ, കാലഹരണപ്പെട്ട എൻട്രികൾ സ്വയമേവ കണ്ടെത്തുന്നതിനായി
   `scripts/check/lib/allowlist.mjs`-ൽ നിന്നുള്ള `reportStaleEntries()` പ്രയോഗിക്കുക.
5. ഗേറ്റിന്റെ കണ്ടെത്തൽ ലോജിക് ഉൾക്കൊള്ളുന്ന ഒരു ടെസ്റ്റ് `tests/unit/build/`-ൽ എഴുതുക.
6. ഈ പ്രമാണം അപ്ഡേറ്റ് ചെയ്യുക (പ്രസക്തമായ ജോബ് പട്ടികയിൽ ഒരു വരി ചേർക്കുക).

---

## ഏജന്റ് ടൂളിംഗ്: ലൂപ്പിനുള്ളിലെ LSP (ഓപ്റ്റ്-ഇൻ)

CI ഗേറ്റുകൾക്ക് പുറമേ, OmniRoute ഒരു **ഓപ്റ്റ്-ഇൻ** `agent-lsp` സ്കാഫോൾഡ്
(ഒരു പ്രോജക്റ്റ്-തല `.mcp.json`, Fase 7 Task 15) ഉൾപ്പെടുത്തിയിട്ടുണ്ട്. കോഡിംഗ് ഏജന്റുകൾക്ക് ഒരു TypeScript ലാംഗ്വേജ് സർവർ ലഭ്യമാക്കാൻ `.mcp.json`
സൃഷ്ടിക്കുക; അങ്ങനെ അവർ കോഡ് എഴുതുന്നതിന് **മുമ്പ്** സിംബലുകളും /
ഡയഗ്നോസ്റ്റിക്സും പരിഹരിക്കും — ഉറവിടത്തിൽത്തന്നെ "കെട്ടിച്ചമച്ച സിംബൽ" പിശകുകൾ കുറയ്ക്കുന്ന
`typecheck:core`-ന്റെ കംപൈൽ-ബിഫോർ-ക്ലെയിം സഹചാരിയാണിത്. ഇത് മനഃപൂർവം
സ്വയമേവ ലോഡ് ചെയ്യപ്പെടുന്നില്ല (MCP↔LSP ബ്രിഡ്ജ് നിങ്ങൾ തിരഞ്ഞെടുത്ത് പരിശോധിക്കണം); തകരാറുള്ള ഒരു എൻട്രി ഒരു
കണക്ഷൻ പിശക് ലോഗ് ചെയ്യുക മാത്രമേ ചെയ്യൂ, സെഷനുകളെ ഒരിക്കലും തകർക്കുകയില്ല.

---

## യുക്തിസഹീകരണ ബാക്ക്ലോഗ് (ROI അവലോകനം — ഘട്ടം 9 തരംഗം 3)

ഈ ഇൻവെന്ററി 2026-06-17-ന് `ci.yml`-നെതിരെ പൊരുത്തപ്പെടുത്തി പരിശോധിച്ചു (മുൻ പതിപ്പിൽ
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` എന്നിവ ഉണ്ടായിരുന്നില്ല). പൊരുത്തപ്പെടുത്തിയ സെറ്റിന്റെ ROI
അവലോകനത്തിൽ താഴെപ്പറയുന്ന യുക്തിസഹീകരണ സ്ഥാനാർഥികളെ കണ്ടെത്തി. **മെർജുകൾ യാന്ത്രിക CI
മാറ്റങ്ങളാണ്; ഫ്ലിപ്പുകളും നീക്കലുകളും ഓപ്പറേറ്റർക്കായി മാറ്റിവെച്ചിരിക്കുന്ന നയപരമായ തീരുമാനങ്ങളാണ്.** താഴെപ്പറയുന്നവയിൽ
ഒന്നും ഇതുവരെ പ്രയോഗിച്ചിട്ടില്ല.

**മുകളിൽ രേഖപ്പെടുത്താതിരുന്നത്** (ഉപദേശാത്മകം, കുറഞ്ഞ സിഗ്നൽ): `docs-lint` ജോബ്
(markdownlint + Vale, മുഴുവൻ ജോബിനും `continue-on-error`) കൂടാതെ സ്വതന്ത്ര സ്കാനർ വർക്ക്ഫ്ലോകൾ
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `quality-baseline.json`-ൽ
`semgrepFindings: 0` ഉണ്ട്, പക്ഷേ `ci.yml`-ൽ ഇത് ബ്ലോക്കിംഗ് റാച്ചറ്റുമായി ബന്ധിപ്പിച്ചിട്ടില്ല — മെട്രിക്
നിലവിൽ അനാഥമാണ്.

### മെർജ് / ഡ്യൂപ്ലിക്കേറ്റ് നീക്കം (യാന്ത്രികം, കുറഞ്ഞ അപകടസാധ്യത)

ഓരോ സ്ഥാനാർഥിയും 2026-06-17-ന് ലൈവ് ഗേറ്റ് നിലയ്ക്കെതിരെ പരിശോധിച്ച് സ്ഥിരീകരിച്ചു (വിശ്വസിക്കുക, പക്ഷേ പരിശോധിക്കുക);
നിരവധി "വ്യക്തമായ" മെർജുകൾ കടബാധ്യത മറച്ചുവെച്ചതായി തെളിഞ്ഞു, അതിനാൽ അവ **നേരിട്ട് മാറ്റിസ്ഥാപിക്കാവുന്നവയല്ല**.

- **`check:docs-sync` രണ്ട് തവണ പ്രവർത്തിക്കുന്നു** — `lint` ജോബിൽ സ്വതന്ത്രമായും വീണ്ടും `check:docs-all`-ന്റെ ഉള്ളിൽ (`docs-sync-strict`) കൂടാതെ husky pre-commit ഹുക്കിലും. ✅ **പൂർത്തിയായി** — സ്വതന്ത്രമായ `lint` ഇൻവൊക്കേഷൻ നീക്കം ചെയ്തു.
- **CVE സ്കാനിംഗ്** — ❌ **ശുദ്ധമായ മെർജ് അല്ല.** നിലവിലെ നയപ്രകാരം എല്ലാ അഞ്ച് ലോക്ക്ഫയലുകളിലുമുള്ള ഗുരുതര അഡ്വൈസറികളും അപൂർണ്ണമായ ഓഡിറ്റുകളും `audit:deps` ബ്ലോക്ക് ചെയ്യുന്നു, അതേസമയം ഉയർന്ന ഗൗരവമുള്ള അഡ്വൈസറികളെ മുന്നറിയിപ്പുകളായി റിപ്പോർട്ട് ചെയ്യുന്നു; `check:vuln-ratchet` (osv) ചെക്ക്-ഇൻ ചെയ്ത ബേസ്ലൈനുമായി താരതമ്യപ്പെടുത്തിയുള്ള _റിഗ്രഷൻ_ ഉണ്ടായാൽ മാത്രമേ പരാജയപ്പെടൂ, കൂടാതെ ആവശ്യമായപ്പോൾ അളവുകൾ ലഭ്യമല്ലെങ്കിൽ അത് നിരസിക്കുകയും ചെയ്യും. അർത്ഥതലങ്ങൾ വ്യത്യസ്തമാണ് — `audit:deps` നീക്കം ചെയ്താൽ സമ്പൂർണ്ണമായ ഗുരുതര-നില ഗേറ്റും സ്വതന്ത്ര പാക്കേജ് ഓഡിറ്റ് രസീതുകളും നഷ്ടപ്പെടും. രണ്ടും നിലനിർത്തുക.
- **സൈക്കിൾ കണ്ടെത്തൽ** — ✅ **പൂർത്തിയായി** (#15159 G-01/G-02). പഴയ വാചകം `check:cycles`-നെ "ഗ്രീൻ, ക്യൂറേറ്റ് ചെയ്ത" ഗേറ്റ് എന്ന് വിളിക്കുകയും `check:circular-deps` (dpdm) 91 സൈക്കിളുകൾ റിപ്പോർട്ട് ചെയ്തതിനാൽ അത് ബ്ലോക്കിംഗായി നിലനിർത്തണമെന്ന് ന്യായീകരിക്കുകയും ചെയ്തിരുന്നു. ആ ഗ്രീൻ **തെറ്റായ ഗ്രീൻ** ആയിരുന്നു: `check:cycles` 5 സബ്ഡയറക്ടറികൾ (450 ഫയലുകൾ) മാത്രം സ്കാൻ ചെയ്തു, സ്റ്റാറ്റിക് `import|export … from`-നോട് മാത്രം പൊരുത്തപ്പെട്ടു, എല്ലാ `@/` , `@omniroute/open-sse/` സ്പെസിഫയറുകളും ഒഴിവാക്കി; അതിനാൽ റിപ്പോസിറ്ററിയിൽ ആധിപത്യം പുലർത്തിയിരുന്ന ഡൈനാമിക്-ഇംപോർട്ട് + അലിയാസ് സൈക്കിളുകൾ കണ്ടെത്താൻ അതിന് കഴിഞ്ഞില്ല. പരിഹരിച്ചു: ഗേറ്റ് ഇപ്പോൾ `src` + `open-sse` (5023 ഫയലുകൾ) സഞ്ചരിക്കുകയും TypeScript AST-ൽ നിന്ന് സ്പെസിഫയറുകൾ ശേഖരിക്കുകയും ചെയ്യുന്നു (`import("…")` എണ്ണപ്പെടുന്നു, ടൈപ്പ്-പോസിഷനിലെ `typeof import("…")` എണ്ണപ്പെടുന്നില്ല), കൂടാതെ tsconfig `paths` പരിഹരിക്കുകയും ചെയ്യുന്നു. ഇത് 0 അല്ല, **14** സൈക്കിളുകൾ കണ്ടെത്തുന്നു. മുമ്പേ ഉണ്ടായിരുന്ന 14 സൈക്കിളുകൾ ഒരു ഗേറ്റ് PR-ൽ പരിഹരിക്കാനാകാത്തതിനാൽ, `check:cycles` ഇപ്പോൾ ഒരു **റാച്ചറ്റ്** ആണ് (`--ratchet`, `quality-baseline.json`-ലെ `metrics.cycles.value = 14` സീലിംഗ്, `direction: down`) — ഏത് _റിഗ്രഷനും_ ഇത് തടയുന്നു, എണ്ണം കുറയുക മാത്രമേ കഴിയൂ. CI `npm run check:cycles:ratchet` പ്രവർത്തിപ്പിക്കുന്നു. ബേൺ-ഡൗൺ **A-01**-നൊപ്പം നടക്കുന്നു. കൂടുതൽ വിശാലമായ രണ്ടാമത്തെ അഭിപ്രായമായി `check:circular-deps` (dpdm) ഉപദേശാത്മകമായി തുടരുന്നു.
- **സങ്കീർണ്ണത** — ✅ **പൂർത്തിയായി** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ഒരു ESLint വാക്ക്, `ruleId` പ്രകാരം എണ്ണുന്നു, അതിനാൽ cyclomatic+max-lines, cognitive ബേസ്ലൈനുകൾ സ്വതന്ത്രമായി തുടരുന്നു; വ്യക്തിഗത `check:complexity` / `check:cognitive-complexity` പ്രാദേശിക `--update`-നായി തുടരുന്നു.
- **`/api` ആന്റി-ഹാല്യൂസിനേഷൻ** — ✅ **പൂർത്തിയായി** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`-യുടെ ഒരു FS ഇൻവെന്ററി; openapi-routes + docs-symbols ഇപ്പോഴും സ്വതന്ത്രമായി റിപ്പോർട്ട് ചെയ്യുന്നു; വ്യക്തിഗതവ പ്രാദേശിക റണ്ണുകൾക്കായി തുടരുന്നു.
- **`check:node-runtime` 11 ജോബുകളിൽ പ്രവർത്തിക്കുന്നു** — ⚠️ **കുറഞ്ഞ ROI.** ഓരോന്നും വേറിട്ട റണ്ണറാണ്, പരിശോധനയ്ക്ക് <1s മാത്രം; ചെലവുകുറവ് ആകെ ഏകദേശം 10s, എന്നാൽ ഓരോ ജോബിനുമുള്ള വിലകുറഞ്ഞ ഗാർഡ് നഷ്ടപ്പെടും. ഈ മാറ്റത്തിനായി നടത്തുന്ന ഇടപെടൽ മൂല്യമുള്ളതല്ല.
- **CI lint-ലുള്ള `typecheck:noimplicit:core`** — ✅ `lint` ജോബിൽ നിന്ന് **നീക്കം ചെയ്തു** (അഡ്വൈസറിയായ `continue-on-error` ആയിരുന്നു); ബ്ലോക്കിംഗ് ടൈപ്പ് സർഫേസ് `typecheck:core` + `check:type-coverage` ആണ്. ലോക്കൽ സ്ക്രിപ്റ്റ് നിലനിർത്തി.

### ഫ്ലിപ്പ് / തീരുമാനം (ഓപ്പറേറ്റർ നയം)

- `check:openapi-security-tiers` (ഉപദേശാത്മകം) — ❌ **ശുദ്ധമായി ഫ്ലിപ്പ് ചെയ്യാനാകില്ല.** `LOCAL_ONLY_API_PREFIXES`-ന് കീഴിലുള്ള നിരവധി `traffic-inspector` റൂട്ടുകളിൽ `x-loopback-only: true` അനോട്ടേഷൻ ഇല്ലെന്ന് ഇത് മുന്നറിയിപ്പ് നൽകുന്നു, എങ്കിലും എക്സിറ്റ് 0 ആണ്. ഇത് എൻഫോഴ്സ് ചെയ്യുന്നതിന് ആദ്യം `openapi.yaml`-ൽ ആ അനോട്ടേഷനുകൾ ചേർക്കണം.
- `typecheck:noimplicit:core` (ഉപദേശാത്മകം) — ബ്ലോക്കിംഗ് `check:type-coverage` റാച്ചറ്റ് ഇത് വലിയ തോതിൽ ഉൾക്കൊള്ളുന്നു. ഇത് ഒരു റാച്ചറ്റാക്കി മാറ്റുക, അല്ലെങ്കിൽ ആവർത്തിക്കുന്ന രണ്ടാമത്തെ `tsc` പാസ് നീക്കം ചെയ്യുക.
- `test:vitest:ui` (ഇപ്പോൾ **ബ്ലോക്കിംഗ്**) — നിലവിലുള്ള പരാജയങ്ങൾ `vitest.config.ts`-ൽ `// #8618` ട്രാക്കിംഗ് കമന്റുകൾ ഉപയോഗിച്ച് വ്യക്തമായി ഒഴിവാക്കിയിരിക്കുന്നു; പുതിയ പരാജയങ്ങൾ ജോബ് പരാജയപ്പെടാൻ ഇടയാക്കും.
- `check:secrets` (gitleaks, 3 രേഖപ്പെടുത്തിയ false-positive-കളിൽ ഫ്രീസ് ചെയ്തിരിക്കുന്ന ബ്ലോക്കിംഗ് റാച്ചറ്റ്) — 0-ൽ എത്താൻ ആ 3 എണ്ണം അലോലിസ്റ്റ് ചെയ്യുക, അല്ലെങ്കിൽ ഉപദേശാത്മകമായി തരംതാഴ്ത്തുക. GitHub native secret-scanning + `check:public-creds` എന്നിവയുമായി ഓവർലാപ്പ് ചെയ്യുന്നു.
- `check:pr-evidence` (ബ്ലോക്കിംഗ്, PR-ബോഡി പ്രോസെ ഗ്രെപ്പ് ചെയ്യുന്നു) — false-positive-ുകളുടെ അപകടസാധ്യത ഉയർന്നതാണ്; ഇത് നീക്കം ചെയ്താൽ Hard Rule #18 എൻഫോഴ്സ്മെന്റ് ദുർബലമാകും, അതിനാൽ ഇത് യഥാർത്ഥ നയപരമായ തീരുമാനമാണ്.
- `semgrep` (ഉപദേശാത്മകമായ സ്വതന്ത്രം) — OWASP കുടുംബങ്ങൾക്കായി CodeQL-ുമായി ഓവർലാപ്പ് ചെയ്യുന്നു; അതിന്റെ ബേസ്ലൈൻ ഒരു റാച്ചറ്റുമായി ബന്ധിപ്പിക്കുക, അല്ലെങ്കിൽ നീക്കം ചെയ്യുക.

## അനുബന്ധ ഡോക്യുമെന്റേഷൻ

- Supply-chain (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — കീ-സെറ്റ് സമതുല്യതാ ഗേറ്റ്

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
ഓരോ `src/i18n/messages/<locale>.json`-ലെയും ലീഫ് കീ-സെറ്റിനെ `en.json`-വുമായി താരതമ്യം ചെയ്യുകയും,
കീ ചേർത്ത സമയമെന്തായാലും, ഏതെങ്കിലും ലീഫ് ഇല്ലാതെയോ അധികമായോ ഉണ്ടെങ്കിൽ പരാജയപ്പെടുകയും ചെയ്യുന്നു.
`__MISSING__:` പ്ലേസ്ഹോൾഡറുകൾ നിലവിലുള്ളതായി കണക്കാക്കുന്നു (അവയുടെ ഉള്ളടക്കം ratio gate-ന്റെ
ബിസിനസ് ലാജിക്കിൽപ്പെടുന്നു). രണ്ട് diff-അടിസ്ഥാനത്തിലുള്ള/ശതമാന ഗേറ്റുകളുടെ പൂർണ്ണ പൂരകമാണിത്:
`check-ui-keys-coverage` ഓരോ locale-ക്കും 80 % floor നിർബന്ധമാക്കുന്നു (ഏകദേശം 13,000-ൽ 43 കീകൾ
ഇല്ലാതിരുന്നാലും 99.7 % ആയി വായിക്കും), കൂടാതെ `check-new-key-coverage` `en.json`-ലേക്ക് PR ചേർക്കുന്ന
കീകൾ മാത്രം വിലയിരുത്തുന്നു. ഒരു locale batch അതിന്റെ branch cut ചെയ്ത ദിവസത്തെ `en.json`-ൽ നിന്ന്
ജനറേറ്റ് ചെയ്യപ്പെടുകയും, base കൂടുതൽ കീകൾ ചേർക്കുന്നതിനിടെ ദിവസങ്ങളോളം വിവർത്തനം ചെയ്യപ്പെടുകയും
ചെയ്യുന്നു; batch PR സ്വയം കീ ഒന്നും ചേർക്കുന്നില്ല, അതിനാൽ batch 1 (#13044) ഒൻപത് locale-കളിൽ
43 കീകൾ കുറവായി എത്തിയപ്പോഴും batch 2 (#13660) എട്ട് locale-കളിൽ 10 കീകൾ കുറവായി എത്തിയപ്പോഴും
രണ്ട് sibling-ുകളും നിശ്ശബ്ദമായി തുടർന്നു (2026-09-15). ചുവന്ന ഗേറ്റ് പരിഹരിക്കാൻ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ഉപയോഗിക്കുക; ഒരു `extra`
ലീഫ് source-ൽ നിന്ന് നീക്കം ചെയ്തതിനെ സൂചിപ്പിക്കുന്നു — `sync-ui-keys` അത് നീക്കം ചെയ്യും
(`--prune-extra`, default). പരാജയപ്പെടുത്താതെ റിപ്പോർട്ട് ചെയ്യാൻ `--warn` ഉപയോഗിക്കുക.
`--catalog=cli` `bin/cli/locales`-ലും ഇതേ താരതമ്യം നടത്തുന്നു
(`npm run i18n:check-keys:cli`); രണ്ട് ഘട്ടങ്ങളും `i18n-ui-coverage` job-ലാണ്. ഈ absolute check
release mode-ൽ മാത്രം പ്രവർത്തിക്കുന്നു: ഒരു feature PR-ന് `SKIP reason=pr-mode` കാണുകയും,
പരിഹാരം release refresh-ലോ translation wave-ലോ നടത്തുകയും വേണം, feature PR-ൽ അല്ല; locale
catalog-ുകളിൽ മാറ്റം വരുത്തുന്ന ഒരു PR-ൽ അവയിൽ ഓരോന്നും merge base-നോട് താരതമ്യം ചെയ്താണ്
വിലയിരുത്തപ്പെടുന്നത് (`i18n-ui-coverage` job-ലെ "Two modes" കാണുക).

#### `check-new-key-coverage` — പുതിയ കീ i18n ഗേറ്റ്

`check-ui-value-drift`-ന്റെ sibling ആണിത്. translations മാറ്റിവെച്ചിരിക്കെ ഒരു English value
**rewritten** ചെയ്തതിനെ അത് കണ്ടെത്തുന്നു; ചില locale-കൾക്ക് ലഭിക്കാതെ ഒരു English key
**added** ചെയ്തതിനെ ഇത് കണ്ടെത്തുന്നു.

`check-ui-keys-coverage`-ന് ഈ വിഭാഗം കണ്ടെത്താനാകില്ല: ഓരോ locale-ക്കും അത് ഒരു percentage floor
നിർബന്ധമാക്കുന്നു, ഏകദേശം 13,000 ലീഫുകളിൽ പതിനൊന്ന് കീകൾ ഇല്ലാതിരുന്നാലും coverage 99.9 % ആയി
തുടരും. ഓരോ ഭാഷയ്ക്കുമുള്ള ഒരു ശതമാനം കൊണ്ട് "ഈ feature വിവർത്തനം ചെയ്യാതെ shipped ചെയ്തു"
എന്ന് പ്രകടിപ്പിക്കാനാകില്ല — text ഇല്ലാത്ത ഒരു പുതിയ locale-ൽ മുഴുവൻ feature-വും എത്തിച്ചേരുകയും
നമ്പർ ഒരിക്കലും മാറാതിരിക്കുകയും ചെയ്യാം.

ഇത് രേഖപ്പെടുത്തുന്ന incident ഇതാണ്: Orchestration Canvas-ന്റെ Phase 3, അന്നുണ്ടായിരുന്ന 42 locale-കളിൽ
തന്റെ പതിനൊന്ന് കീകൾ വിവർത്തനം ചെയ്തു. മണിക്കൂറുകൾക്കുശേഷം EU-language batch (#13044) repo-യെ
51 locale-കളാക്കി, കൂടാതെ പുതുതായി വന്ന ഒൻപത് (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`)
locale-കൾക്ക് അവ ഒരിക്കലും ലഭിച്ചില്ല. `deepMergeFallback` ഇല്ലാത്ത കീയ്ക്ക് പകരം English നൽകുന്നതിനാൽ,
failure mode ശൂന്യമായ UI അല്ല, വിവർത്തനം ചെയ്യാത്ത UI ആയിരുന്നു — യഥാർത്ഥവും രൂപകൽപ്പനാപരമായി
നിശ്ശബ്ദവുമായിരുന്നു.

അതിന്റെ sibling പോലെ ഇതും **diff-aware** ആണ്; merge base-ലെ English-നെ working tree-യുമായി
താരതമ്യം ചെയ്യുന്നതിനാൽ, മുമ്പുണ്ടായിരുന്ന gaps മാറ്റമില്ലാതെ തുടരുകയും gate പ്രവർത്തനക്ഷമമാക്കാൻ
migration ആവശ്യമില്ലാതിരിക്കുകയും ചെയ്തു.

**A `__MISSING__:<english>` marker does not satisfy it (since 2026-09-17).** ഇത് മുമ്പ്
രേഖപ്പെടുത്തിയ deferral ആയിരുന്നു — runtime ശരിയായ English-ിലേക്ക് fallback ചെയ്യുന്നു — എന്നാൽ
2026-09-16-ന് എട്ട് feature PR-കൾ 61 കീകൾ ചേർത്ത് വിവർത്തനം ചെയ്യുന്നതിന് പകരം 65 locale-കളിലും
marker പതിപ്പിച്ചു: ഈ gate ഓരോന്നും അംഗീകരിച്ചു, ഒന്നും PR-കളെ തടഞ്ഞില്ല, തുടർന്ന് blocking
real-translation ratio gate release tip-ൽ എല്ലാവർക്കുമായി പരാജയപ്പെട്ടു (pt-BR 3.2 % > 2.5 % + 0.5).
ഇപ്പോൾ marker-നെ absent translation ആയി വിലയിരുത്തുന്നു. 2026-11-13 മുതൽ release mode-ൽ മാത്രം:
ഒരു feature PR-ന് `SKIP reason=pr-mode` കാണും, കൂടാതെ release PR-ൽ (`BASE_REF=origin/main`) cycle
ചേർത്ത എല്ലാ കീകളും gate വിലയിരുത്തും. release refresh-ലോ translation wave-ലോ ചുവന്ന ഗേറ്റ്
പരിഹരിക്കാൻ `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`
ഉപയോഗിക്കുക, അല്ലെങ്കിൽ `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, detached-safe, `OMNIROUTE_TRANSLATION_*` env ഇല്ലാതെ
ആരംഭിക്കാൻ വിസമ്മതിക്കുന്നു) ഉപയോഗിച്ച് എല്ലാ locale-കളിലും parallel ആയി നടത്തുക. English-ൽ തന്നെ
തുടരേണ്ട ഒരു key (pinned product/engine/flag name) `scripts/i18n/untranslatable-keys.json`-ൽ
ഉൾപ്പെടണം, marker-ന്റെ പിന്നിൽ ഒരിക്കലും വയ്ക്കരുത്. `vi` marker-ുകൾ പൂർണ്ണമായും നിരോധിക്കുന്നു
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — പാർക്ക് ചെയ്ത ടെസ്റ്റ് ഗേറ്റ്

`vitest.config.ts`-ന്റെ `exclude` ലിസ്റ്റിലുള്ള ഒരു ഫയൽ പ്രവർത്തിക്കാത്ത ഒരു test ആണ്, കൂടാതെ
tree വായിക്കുന്ന ഒരാൾക്ക് അത് coverage ആണെന്ന് തോന്നും. `// #8618 — pre-existing failure; remove this exclusion when fixed`
എന്ന comment-ന്റെ പിന്നിൽ അറുപത്തിരണ്ട് ഫയലുകൾ കൂടിച്ചേർന്നു. Issue #8618 2026-08-11-ന് അടച്ചപ്പോഴും,
അത് track ചെയ്തിരുന്ന ലിസ്റ്റ് 45 entries-ൽ നിന്ന് 62 ആയി വളർന്നു; ഓരോ പുതിയ entry-യും dead issue-നെ
ചൂണ്ടിക്കാണിക്കുന്ന comment പാരമ്പര്യമായി കൈവരിച്ചു. ഒടുവിൽ ലിസ്റ്റ് ഓരോ ഫയലായി അളന്നപ്പോൾ (#13204),
62-ൽ **51 എണ്ണം source മാറ്റമൊന്നുമില്ലാതെ നിലവിലെ tree-നെതിരെ പാസായി**.

യഥാർത്ഥ ഫയലിലേക്ക് resolve ചെയ്യുന്ന ഓരോ exclusion-വും (a) ഒരു tracking issue വ്യക്തമാക്കുകയും
(b) അളന്ന status സഹിതം `config/quality/vitest-exclusions.json`-ൽ പ്രത്യക്ഷപ്പെടുകയും വേണമെന്ന് gate
ആവശ്യപ്പെടുന്നു. അതിനാൽ 60-entry array-യിൽ മറ്റൊരു വരി ചേർക്കുന്നതിന് പകരം, സമർപ്പിത ഫയലിലെ
review ചെയ്യാവുന്ന diff ആയി അത് രേഖപ്പെടുത്തുന്നു. Excluded tests വീണ്ടും പ്രവർത്തിപ്പിക്കാതിരിക്കുകയാണ്
ഇത് ഉദ്ദേശപൂർവ്വം ചെയ്യുന്നത് — അതിന് ഏകദേശം 10 മിനിറ്റ് ചെലവാകും, periodic job-ലാണ് അത് വേണ്ടത്;
ഓരോന്നും അവസാനമായി അളന്ന സമയം inventory രേഖപ്പെടുത്തുന്നു.
