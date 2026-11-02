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

### സ്ഥാനാർത്ഥി പ്രവേശനം

CI, Quality Gates വർക്ക്ഫ്ലോകൾ ഓരോന്നും സ്ഥിരമായ വിധി പുറപ്പെടുവിക്കുന്നു: `Gate / CI`,
`Gate / Quality`. അവയുടെ പതിപ്പ് പ്രവേശന നയം ഓരോ അപ്സ്ട്രീം ജോബിയെയും ആവശ്യമായതോ
ഉപദേശകമോ ആയി പട്ടികപ്പെടുത്തുന്നു. ബാധകമായ ആവശ്യ ജോബി വിജയിക്കണം: ലഭ്യമല്ലാത്തതും,
റദ്ദാക്കിയതും, ഒഴിവാക്കിയതും, തീർപ്പാക്കാത്തതും, അജ്ഞാതവുമായ ഫലങ്ങൾക്ക് PASS
സ്ഥാപിക്കാൻ കഴിയില്ല. സാധുവായ docs-only അല്ലെങ്കിൽ catalog-only വർഗ്ഗീകരണത്തിന് ഒരു
കോഡ് ലേനെ ബാധകമല്ലാത്തതാക്കാൻ കഴിയും; ഡ്രാഫ്റ്റ് PR അംഗീകൃത സ്ഥാനാർത്ഥിയല്ല. ഒരു
`hotfix` ലേബൽ തെളിവിനെ ഒഴിവാക്കുന്നില്ല.

രണ്ട് വർക്ക്ഫ്ലോകളും main/release ബ്രാഞ്ചുകളിലേക്കുള്ള PR-കളെയും, `main`-ലേക്കുള്ള പുഷുകളെയും,
മാനുവൽ ഡിസ്പാച്ചിനെയും, മെർജ്-ഗ്രൂപ്പ് ഇവന്റുകളെയും ഉൾക്കൊള്ളുന്നു. Push, dispatch,
merge-group എന്നിവ മുഴുവൻ തിരഞ്ഞെടുക്കലും പ്രവർത്തിപ്പിക്കുന്നു. `release/**`-ലേക്കുള്ള
പുഷുകൾ അവയെ ആരംഭിക്കുന്നില്ല (2026-10-18): ഓരോ മാറ്റവും അതിന്റെ PR-ൽ മാട്രിക്സ് ഇതിനകം
പ്രവർത്തിപ്പിച്ചു, കൂടാതെ ലയിപ്പിച്ച സംയോജനം Release-Green-ന്റെ ജോബിയാണ്
(`docs/ops/RUNNER_BOX.md` → Hosted lane). മറ്റൊരുവിധത്തിൽ self-hosted റണ്ണറുകൾ
തിരഞ്ഞെടുക്കുന്ന ജോബികൾക്കായി ഫോർക്കുകളും മെർജ് ഗ്രൂപ്പുകളും hosted റണ്ണറുകൾ
ഉപയോഗിക്കുന്നു; റോൾഔട്ടിന് മുമ്പ് മതിയായ hosted ശേഷി പരിശോധിച്ചുറപ്പിക്കണം.

ഓരോ JSON രസീതിയും ചെക്ക്ഔട്ട് ചെയ്ത SHA, വർക്ക്ഫ്ലോ റൺ, ശ്രമം എന്നിവയെ തിരിച്ചറിയുന്നു.
CLI ഒരു checkout/event SHA പൊരുത്തക്കേട് നിരസിക്കുന്നു. വർക്ക്ഫ്ലോ ടെസ്റ്റുകൾ നയ
അംഗത്വത്തെ വിധി ജോബിയുടെ `needs` പട്ടികയുമായി ബന്ധിപ്പിക്കുന്നു, അതിനാൽ പുതിയതോ
നീക്കം ചെയ്തതോ ആയ ലേന് നിശ്ശബ്ദമായി അപ്രത്യക്ഷമാകാൻ കഴിയില്ല. രസീതികൾ അവയുടെ സ്വന്തം
വർക്ക്ഫ്ലോയെ മാത്രമേ ഉൾക്കൊള്ളൂ; പ്രസിദ്ധീകരണം, വിന്യാസം, അല്ലെങ്കിൽ നിലവിലുള്ള
ഉപദേശക സ്കാനറിന്റെ ആന്തരികങ്ങളെ അല്ല. ബ്രാഞ്ച് നിയമങ്ങളിൽ രണ്ട് ചെക്ക് പേരുകളും
സജീവമാക്കുന്നത് ഒരു പ്രത്യേക ഭരണ മാറ്റമാണ്; ഈ ജോബികൾ ചേർക്കുന്നത് തന്നെയായി ഒരു
ബ്രാഞ്ചിനെ പരിരക്ഷിക്കുന്നില്ല.

### സ്റ്റാറ്റിക് സ്കാൻ ഇൻവെന്ററി

പതിപ്പ് npm-alias ഇൻവെന്ററിയും static-scan അംഗത്വവും
`config/quality/gate-manifest.json`-ൽ ആണ്. സ്ക്രിപ്റ്റ് പേരുകളെയും കൃത്യമായ
കമാൻഡുകളെയും `package.json`-മായി സാധൂകരിക്കാൻ `npm run check:gate-manifest`
പ്രവർത്തിപ്പിക്കുക; ചേർക്കലുകൾ, നീക്കംചെയ്യലുകൾ, കമാൻഡ് ഡ്രിഫ്റ്റ് എന്നിവ ലോക്കൽ
ഹുക്കിനെയും CI-യിലെ മാറ്റം-വർഗ്ഗീകരണ ജോബികളെയും പരാജയപ്പെടുത്തും. ഒരു alias ഒരു
വർക്ക്ഫ്ലോ ജോബിയോ, മാട്രിക്സ് ഇൻസ്റ്റൻസോ, ടെസ്റ്റ് കേസോ അല്ല: ഈ എണ്ണങ്ങളെ
പരസ്പരം മാറ്റാവുന്നവയായി അവതരിപ്പിക്കരുത്.

തിരഞ്ഞെടുത്ത alias-കളെ പ്രവർത്തിപ്പിക്കാതെ പരിശോധിക്കാൻ
`npm run quality:scan -- --list` അല്ലെങ്കിൽ `npm run quality:scan:fast -- --list`
ഉപയോഗിക്കുക. റണ്ണർ npm എൻട്രിപോയിന്റിനെ വിളിക്കുന്നു, അതിനാൽ അതിന്റെ റൺടൈം
(കോൺഫിഗർ ചെയ്തിടത്ത് Bun ഉൾപ്പെടെ) സംരക്ഷിക്കപ്പെടുന്നു. ആ പ്രൊഫൈലുകൾക്ക് പുറത്തുള്ള
alias-കളെ മാനിഫെസ്റ്റ് പ്രത്യേകമായി വിളിക്കപ്പെട്ടതായി രേഖപ്പെടുത്തുന്നു, കൂടാതെ
read-only സ്കാൻ പ്രൊഫൈലുകളിൽ മെയിന്റനൻസ് കമാൻഡുകൾ നിഷിദ്ധമാണ്.

ഈ പ്രൊഫൈലുകൾ സ്റ്റാറ്റിക് സ്കാൻ മാത്രമേ ഉൾക്കൊള്ളൂ. അവ പ്രോഡക്ട് ടെസ്റ്റുകൾ,
കവറേജ്, പാക്കേജിംഗ്, ബാഹ്യ പരിശോധനകൾ, അല്ലെങ്കിൽ ഒരു സ്ഥാനാർത്ഥിയുടെ പൂർണ്ണ റിലീസ്
അംഗീകാരം എന്നിവയെ സാക്ഷ്യപ്പെടുത്തുന്നില്ല. വർക്ക്ഫ്ലോ പ്രവേശനം ലിങ്ക് ചെയ്ത
`config/quality/admission-policy.json`-ഉം `scripts/quality/admission-verdict.mjs`-ഉം
ഉപയോഗിക്കുന്നു. Release-observer പ്രൊഫൈലുകൾ പ്രത്യേകമായി തുടരുന്നു; അവയുടെ ബാധകമായ
പരിശോധനകളും രസീതികളും സ്വതന്ത്രമായി പരിശോധിക്കുക. ചുവടെയുള്ള ഗദ്യ ഇൻവെന്ററി ഒരു
റഫറൻസ് മാത്രമാണ്, ഒരു ഗേറ്റ് യഥാർത്ഥത്തിൽ പ്രവർത്തിച്ചതിനുള്ള തെളിവല്ല.

സ്ക്രിപ്റ്റുകൾ `scripts/check/` (നയ ഗേറ്റുകൾ), `scripts/quality/` (റാച്ചറ്റ് എഞ്ചിൻ)
എന്നിവയുടെ കീഴിലാണ്. CI-യുടെ സത്യ സ്രോതസ്സ് `.github/workflows/ci.yml` ആണ്.

### റിലീസ് PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` main/release PR-കൾ, `main`-ലേക്കുള്ള പുഷുകൾ, ഡിസ്പാച്ച്,
മെർജ് ഗ്രൂപ്പുകൾ എന്നിവയിൽ CI-യെ പൂരിപ്പിക്കുന്നു. PR-കൾ path-filtered വേഗതയുള്ള
പരിശോധനകൾ ഉപയോഗിക്കുന്നു. സ്ഥിരമായി അപ്രാപ്തമാക്കിയിരുന്ന ഡ്യൂപ്ലിക്കേറ്റ് ബിൽഡ്
നീക്കം ചെയ്തു; യഥാർത്ഥ build/package/boot പരിശോധനകൾ CI-യിൽ തുടരുന്നു.

| ജോബി                                             | പരിധി                                                                                                                                                                                                                                                       | തടയുന്നത്               |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PR-കൾ; API docs refs, docs-all എന്നിവ                                                                                                                                                                                                             | അതെ                     |
| `Fast Quality Gates`                             | Code PR-കൾ; സ്റ്റാറ്റിക് പരിശോധനകൾ, typecheck, ഡാഷ്ബോർഡ് typecheck, ബാധിക്കപ്പെട്ട യൂണിറ്റ് ടെസ്റ്റുകൾ                                                                                                                                                      | അതെ                     |
| `Forgotten sibling tests`                        | Code PR-കൾ; മാറ്റങ്ങൾ വരുത്തിയ മൊഡ്യൂളുകൾ സ്റ്റാറ്റിക് ഉപഭോക്താക്കളിലേക്കും സ്ഥാനാർത്ഥി സിബ്ലിംഗ് ടെസ്റ്റുകളിലേക്കും പിന്തുടരുന്നു; barrel, dynamic-import പാതകൾ ഉപദേശക ഡയഗ്നോസ്റ്റിക്സായി റിപ്പോർട്ട് ചെയ്യപ്പെടുന്നു, റഫറൻസ് ചെയ്ത allowlist അപവാദങ്ങളോടെ | **ഉപദേശകം**             |
| `Vitest (fast-path)`                             | Code PR-കൾ; വേഗതയുള്ള vitest സ്യൂട്ട്                                                                                                                                                                                                                       | അതെ                     |
| `Unit Tests fast-path`                           | Code PR-കൾ; 4-shard യൂണിറ്റ് സ്യൂട്ട്                                                                                                                                                                                                                       | അതെ                     |
| `No new ESLint warnings`                         | Code PR-കൾ; സപ്രഷനുകൾ മനസ്സിലാക്കുന്ന lint ഗാർഡ്                                                                                                                                                                                                            | അതെ, ഫോർക്കുകൾ ഉൾപ്പെടെ |
| `Merge integrity (changelog + generated skills)` | ഡ്രാഫ്റ്റ് അല്ലാത്ത PR-കൾ; changelog, ജനറേറ്റ് ചെയ്ത skill സമന്വയം                                                                                                                                                                                          | അതെ, ഫോർക്കുകൾ ഉൾപ്പെടെ |

#### Forgotten sibling tests റിപ്പോർട്ട്

`npm run check:forgotten-sibling-tests` ടെസ്റ്റ്-ഇംപാക്ട് മാപ്പിന് പിന്നിലെ ഇംപോർട്ട് റിസോൾവർ പുനരുപയോഗിക്കുന്നു.
ഓരോ മാറ്റം വരുത്തിയ പ്രൊഡക്ഷൻ മൊഡ്യൂളിനും, കാൻഡിഡേറ്റ് ടെസ്റ്റ് പുൾ-റിക്വസ്റ്റ് ഡിഫിൽ
ഇല്ലാത്തപ്പോൾ, അത് ഡിറ്റർമിനിസ്റ്റിക് `changed module/symbol -> static consumer -> candidate sibling test`
ചെയിനുകൾ റിപ്പോർട്ട് ചെയ്യുന്നു. മാർക്ക്ഡൗൺ സമ്മറിയും JSON ഫലവും ഏതെങ്കിലും ബ്ലോക്കിംഗ്
റോൾഔട്ടിന് മുമ്പുള്ള കാലിബ്രേഷനായി `forgotten-sibling-tests` വർക്ക്ഫ്ലോ ആർട്ടിഫാക്ടായി സൂക്ഷിക്കും.

ബാരൽ റീ-എക്സ്പോർട്ടുകളും ഡൈനാമിക് ഇംപോർട്ടുകളും റിസൊലൂഷൻ ഡയഗ്നോസ്റ്റിക്സ് മാത്രമാണ്; അവ
ഒരിക്കലും ബ്ലോക്കിംഗ് ഫൈൻഡിംഗ് സൃഷ്ടിക്കില്ല. അവലോകനം ചെയ്ത എക്സ്സെപ്ഷനുകൾ
`config/quality/forgotten-sibling-allowlist.json`-ലാണ് ഉള്ളത്. ഓരോ എൻട്രിയും കൻസ്യൂമറുടെയും കാൻഡിഡേറ്റ്
ടെസ്റ്റിന്റെയും പേര് വ്യക്തമാക്കണം, ഒരു നിർദ്ദിഷ്ട ന്യായോചനം നൽകണം, ഒരു GitHub ഇഷ്യൂ അല്ലെങ്കിൽ പുൾ
റിക്വസ്റ്റ് ലിങ്ക് ചെയ്യണം. രൂപഭ്രഷ്ടമായ എൻട്രികൾ ഫെയിൽ ക്ലോസ്ഡ് ആകും. എക്സ്സെപ്ഷനുകൾക്ക് ഇല്ലാതാക്കിയ ഒരു
കാൻഡിഡേറ്റ് ടെസ്റ്റിനെയോ `.skip`/`.todo` ചേർക്കുന്ന ഒരു ഡിഫിനെയോ അടിച്ചമർത്താൻ കഴിയില്ല; അസർഷൻ
ദുർബലപ്പെടുത്തലും മറ്റ് മാസ്കിംഗും സ്വതന്ത്രമായി ബ്ലോക്കിംഗ് ചെയ്യുന്ന `check:test-masking` ഗേറ്റിന്റെ
ഉടമസ്ഥതയിൽ തുടരും.

### ജോലി: `lint`

`main`-ലേക്കുള്ള ഓരോ PR-ലും റൺ ചെയ്യുന്നു. പരാജയപ്പെടുമ്പോൾ മെർജ് തടയുന്നു.

| സ്ക്രിപ്റ്റ് (`npm run ...`)      | സാധൂകരിക്കുന്നത്                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | തടയുന്നത്                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Node.js പതിപ്പ് പിന്തുണയ്ക്കുന്ന പരിധിക്കുള്ളിലാണ്                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | അതെ                                         |
| `check:cycles`                    | `src/` + `open-sse/` മുഴുവനായുള്ള സർക്കുലാർ ഇമ്പോർട്ടുകൾ (AST-അടിസ്ഥാനമാക്കിയുള്ളത്, tsconfig `paths` പരിഹരിച്ചിരിക്കുന്നു). ഏതെങ്കിലും സൈക്കിൾ നിലനിൽക്കുമ്പോഴെല്ലാം bare ആയി exit 1 ചെയ്യുന്നു (#15281 മുതൽ fail-closed), SCC-കൾ ലിസ്റ്റ് ചെയ്യുന്നു. `check:cycles:ratchet` (CI റൺ ചെയ്യുന്നത്) `quality-baseline.json`-ലെ `metrics.cycles` പരിധി എണ്ണം കവിയുമ്പോൾ തടയുന്നു — നിലവിൽ 14, `direction: down`, അതിനാൽ ഇത് കുറയുക മാത്രം ചെയ്യും (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | അതെ (ratchet)                               |
| `check:boundary`                  | `open-sse → src` കപ്പ്ലിംഗ്: എഞ്ചിനിൽ നിന്ന് ആപ്പിലേക്കുള്ള യുനീക്ക് ഫയൽ-ടു-ഫയൽ ഇമ്പോർട്ടുകൾ (`scripts/quality/measure-boundary.mjs`; എഡ്ജ് ലിസ്റ്റ് v4 core/module-split remediation ബാക്ക്ലോഗ് ആണ്). Bare = ഉപദേശക റിപ്പോർട്ട് (`quality:boundary` പോലെ തന്നെ). `check:boundary:ratchet` (CI റൺ ചെയ്യുന്നത്, `quality.yml` fast-gates ratchet ലൂപ്പിലും ഉണ്ട്) `quality-baseline.json`-ലെ `metrics.boundaryOpenSseToSrc` പരിധി എണ്ണം കവിയുമ്പോൾ തടയുന്നു — അളന്ന 771-ൽ സീഡ് ചെയ്തത്, `direction: down`; `--update` ഇത് കുറയ്ക്കുക മാത്രം ചെയ്യും; PR-കളിൽ base-relative (`--base-ref`, താഴെ കാണുക)                                                                                                                                                                                                                                                                                                                                                                                                                              | അതെ (ratchet)                               |
| `check:route-validation:t06`      | എല്ലാ റൂട്ടുകളിലും Zod സ്കീമകൾ ഉണ്ട് (Tier 6 നയം)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | അതെ                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` എണ്ണം ബജറ്റ് കവിയുന്നില്ല (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | അതെ                                         |
| `check:provider-consistency`      | `providers.ts`-ലെ ഓരോ provider-നും `providerRegistry.ts`-ൽ അനുബന്ധ എൻട്രി ഉണ്ട് (തിരിച്ചും, allowlist-നുള്ളിൽ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | അതെ                                         |
| `check:model-lifecycle`           | കൈകൊണ്ട് പരിപാലിക്കുന്ന മൂന്ന് റൂട്ടിംഗ് ടേബിളുകളും ചെക്ക്-ഇൻ ചെയ്ത ലൈഫ്സൈക്കിൾ സ്നാപ്പ്ഷോട്ടുമായി (#11503) പൊരുത്തപ്പെടുന്നു: `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY`-ക്ക് റൂട്ട് ചെയ്യാൻ കഴിയുന്ന റിട്ടയർ ചെയ്ത ഏതെങ്കിലും id-ക്ക് സ്കോർ നൽകുന്നില്ല; ഓരോ `BUILT_IN_ALIASES` ടാർഗെറ്റും `REGISTRY`-യിൽ ഉണ്ട്, റിട്ടയർ ചെയ്ത-id സ്നാപ്പ്ഷോട്ടിൽ ഇല്ല; `REGISTRY`-യിൽ ഇപ്പോഴും ഉള്ള ഓരോ റിട്ടയർ ചെയ്ത id-യും ഫോർവേഡ് ചെയ്യപ്പെടുന്നു അല്ലെങ്കിൽ `allowedRetiredInCatalog`-ൽ ലിസ്റ്റ് ചെയ്തിരിക്കുന്നു; കൂടാതെ ആ സ്നാപ്പ്ഷോട്ടിൽ `DEFAULT_DEGRADATION_MAP`-ന്റെ ഏതെങ്കിലും സോഴ്സോ ടാർഗെറ്റോ റിട്ടയർ ചെയ്തതായി കാണുന്നില്ല. ഒരു മോഡൽ നിലവിൽ ഒരു ലൈവ് അപ്സ്ട്രീം സർവ് ചെയ്യുന്നുണ്ടെന്ന് ഇത് തെളിയിക്കുന്നില്ല. ഓഫ്ലൈൻ — `config/quality/model-lifecycle.json`-മായി താരതമ്യം ചെയ്യുന്നു, `npm run quality:refresh-model-lifecycle` ഉപയോഗിച്ച് കൈകൊണ്ട് പുതുക്കുന്നു (നെറ്റ്വർക്ക്; CI-യിൽ ബന്ധിപ്പിച്ചിട്ടില്ല). `allowedRetiredInCatalog` ഒരു burn-down ratchet ആണ്: ഒരു ട്രാക്കിംഗ് ഇഷ്യൂ ഉണ്ടെങ്കിൽ മാത്രം എൻട്രി ചേർക്കുക. | അതെ                                         |
| `check:fetch-targets`             | ക്ലയന്റ്-സൈഡ് `src/`-ലെ ഓരോ `fetch("/api/...")`-ഉം യഥാർത്ഥ `route.ts`-ലേക്ക് റിസോൾവ് ചെയ്യുന്നു                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | അതെ                                         |
| `check:deps`                      | റെപ്പോയിലെ ഓരോ `package.json`-ലുമുള്ള `npm install` ചെയ്യാവുന്ന എല്ലാ deps-ഉം `dependency-allowlist.json`-ൽ ഉണ്ട്; പുതിയ unpinned അല്ലെങ്കിൽ slopsquatted പാക്കേജുകൾ ഫ്ലാഗ് ചെയ്യപ്പെടുന്നു                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | അതെ                                         |
| `audit:deps`                      | `npm audit` (root + electron) — high/critical advisories ഇല്ല (osv `check:vuln-ratchet`-മായി ഓവർലാപ്പ് ചെയ്യുന്നു; Rationalization Backlog കാണുക)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | അതെ                                         |
| `check:lockfile`                  | `package-lock.json` സമഗ്രത — https രജിസ്ട്രി, സമഗ്രത ഹാഷുകൾ, ഹോസ്റ്റ് ഓവർറൈഡുകൾ ഇല്ല                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | അതെ                                         |
| `check:licenses`                  | പ്രൊഡക്ഷൻ ഡിപൻഡൻസികൾക്കുള്ള SPDX ലൈസൻസ് അനുവദനീയപട്ടിക                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | അതെ                                         |
| `check:tracked-artifacts`         | ബിൽഡ് ആർട്ടിഫാക്ടുകളോ കമ്മിറ്റ് ചെയ്ത `node_modules` സിംലിങ്കുകളോ ഇല്ല (husky pre-commit-ലും പ്രവർത്തിക്കുന്നു; pre-push മനഃപൂർവ്വം ലഘുവാണ് — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | അതെ                                         |
| `check:ai-attribution`            | PR കമ്മിറ്റുകളിൽ, ടൈറ്റിലിൽ അല്ലെങ്കിൽ ബോഡിയിൽ AI/bot `Co-Authored-By` ട്രെയിലറോ AI-ജനറേഷൻ ഫൂട്ടറോ ഇല്ല — ഹാർഡ് റൂൾ #16 (PR→`release/**`-നുള്ള `quality.yml` fast-gates ലൂപ്പിൽ — ഇവന്റ് പേലോഡ് വായിക്കുന്നു, PR-കൾക്ക് പുറത്ത് no-op — കൂടാതെ PR→`main`-നുള്ള `ci.yml` lint-ൽ PR-മാത്രം ഘട്ടം; husky `commit-msg` ഹുക്കും; മനുഷ്യ സഹ-രചയിതാക്കളെ അനുവദിക്കുന്നു; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | ഓരോ Vitest ഒഴിവാക്കലും ഒരു ട്രാക്കിംഗ് ഇഷ്യുവിനെ പരാമർശിക്കുകയും `config/quality/vitest-exclusions.json`-ൽ ഉൾപ്പെടുകയും വേണം (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | അതെ                                         |
| `check:file-size`                 | സോഴ്സ് ഫയലുകൾ (`src/`, `open-sse/`, `electron/`, `bin/` എന്നിവയിലെ `.ts`/`.tsx`) `cap`-നുള്ളിലും ടെസ്റ്റ് ഫയലുകൾ (`*.test.ts(x)`) `testCap`-നുള്ളിലും നിലനിൽക്കണം; `file-size-baseline.json`-ൽ ഫ്രോസൺ ചെയ്ത ഫയലുകൾ (`frozen` / `testFrozen`) അവയുടെ രേഖപ്പെടുത്തിയ വലുപ്പം കവിഞ്ഞ് വളരാൻ പാടില്ല                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | അതെ                                         |
| `check:error-helper`              | executors/handlers-കളിലെ എറർ പ്രതികരണങ്ങൾ `buildErrorBody()` / `sanitizeErrorMessage()` ഉപയോഗിക്കുന്നു (കർശന നിയമം #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | അതെ                                         |
| `check:migration-numbering`       | മൈഗ്രേഷൻ SQL ഫയലുകൾ തുടർച്ചയായി നമ്പർ ചെയ്തിരിക്കുന്നു, വിടവുകളോ തനിപ്പകർപ്പുകളോ ഇല്ല                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | അതെ                                         |
| `check:public-creds`              | `publicCreds.ts`-ന് പുറത്ത് ലിറ്ററൽ OAuth `client_id`/`client_secret` അല്ലെങ്കിൽ Firebase Web കീകൾ ഇല്ല (കർശന നിയമം #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | അതെ                                         |
| `check:db-rules`                  | `src/lib/db/` മൊഡ്യൂളുകൾക്ക് പുറത്ത് റോ SQL ഇല്ല; `localDb.ts`-ൽ നിന്ന് barrel-imports ഇല്ല (കർശന നിയമങ്ങൾ #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | അതെ                                         |
| `check:known-symbols`             | അവയുടെ ഡിസ്പാച്ച് ടേബിളുകളിൽ രജിസ്റ്റർ ചെയ്തിരിക്കുന്ന പ്രൊവൈഡർ executors, റൂട്ടിംഗ് സ്ട്രാറ്റജികൾ, ട്രാൻസ്ലേറ്ററുകൾ എന്നിവ ഡിസ്കിലുള്ള ഫയലുകളുമായി പൊരുത്തപ്പെടുന്നു — അനാഥമായോ പ്രഖ്യാപിക്കാത്തോ ആയ സിംബലുകളൊന്നുമില്ല                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | അതെ                                         |
| `check:route-guard-membership`    | ചൈൽഡ് പ്രോസസ് സ്പോൺ ചെയ്യുന്ന ഓരോ റൂട്ടും `isLocalOnlyPath()` വഴി തരംതിരിക്കപ്പെട്ടിരിക്കുന്നു (കർശന നിയമങ്ങൾ #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | അതെ                                         |
| `check:test-discovery`            | റെപ്പോയിലെ ഓരോ `*.test.ts` / `*.spec.ts` ഫയലും കുറഞ്ഞത് ഒരു ടെസ്റ്റ് റണ്ണർ എങ്കിലും ശേഖരിക്കുന്നു (ratchet: `test-discovery-baseline.json`-ലെ അനാഥ പട്ടിക ചുരുങ്ങാൻ മാത്രമേ കഴിയൂ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | അതെ                                         |
| `check:test-tla-order`            | `tests/unit`-ന് കീഴിലുള്ള ഒരു `node:test` ഫയലും ഒരു ടെസ്റ്റ് രജിസ്റ്റർ ചെയ്ത്, ഒരു ടോപ്പ്-ലെവൽ `await`-ൽ എത്തിയതിന് ശേഷം, കൂടുതൽ രജിസ്റ്റർ ചെയ്യുന്നില്ല (#18045; ratchet: `test-tla-order-allowlist.json` ചുരുങ്ങാൻ മാത്രമേ കഴിയൂ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | അതെ                                         |
| `check:agent-skills-sync`         | ജനറേറ്റ് ചെയ്ത agent-skills ആർട്ടിഫാക്ടുകൾ അവയുടെ സോഴ്സ് കാറ്റലോഗുമായി പൊരുത്തപ്പെടുന്നു (വ്യതിയാനമില്ല)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | പ്രൊവൈഡർ ലോഗോകൾ/ആസെറ്റുകൾ രേഖപ്പെടുത്തിയ provenance എൻട്രി കൊണ്ടുപോകുന്നു                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | JSON കോൺഫിഗ് ഫയലുകൾ പാർസ് ചെയ്യുകയും റെപ്പോ lint നിയമങ്ങൾ പാലിക്കുകയും ചെയ്യുന്നു                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `typecheck:core`                  | പിശകുകളില്ലാത്ത TypeScript കംപൈലേഷൻ (ഉപദേശാത്മക മുന്നറിയിപ്പുകൾ മാത്രം)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | അതെ                                         |
| `typecheck:noimplicit:core`       | കർശനമായ `noImplicitAny` — മുന്നോട്ടുനോക്കുന്നത്; നിലവിലുള്ള പല കോൾ സൈറ്റുകൾക്കും ഇനിയും അനോട്ടേഷനുകൾ ആവശ്യമുണ്ട്                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **ഉപദേശാത്മകം** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**`-ലേക്ക് പരിമിതപ്പെടുത്തിയ `tsc` (#7033) — `typecheck:core`-ന്റെ തിരഞ്ഞെടുത്ത 27-ഫയൽ allowlist-ൽ ഡാഷ്ബോർഡ് TSX ഒന്നും ഉൾപ്പെടുന്നില്ല, `next build`-ഉം അതിനെ ഒരിക്കലും type-check ചെയ്യുന്നില്ല (`next.config.mjs` `ignoreBuildErrors: true` ആയി സജ്ജീകരിക്കുന്നു), അതിനാൽ അവിടത്തെ orphaned-identifier റിഗ്രഷനുകൾ (#6625/#6909) CI-ക്ക് ദൃശ്യമല്ലായിരുന്നു. മരവിപ്പിച്ച ഫയൽ-തല/TS-കോഡ്-തല എണ്ണം ബേസ്ലൈനുമായി താരതമ്യം ചെയ്യുന്നു (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols`-ന്റെ അതേ stale-enforcement പാറ്റേൺ) — ബേസ്ലൈൻ ചെയ്ത എണ്ണത്തേക്കാൾ കൂടുതലുള്ള പുതിയ പിശകുകൾ മാത്രമേ ഗേറ്റ് പരാജയപ്പെടുത്തൂ; നിലവിലുള്ള ഒരു പിശക് പരിഹരിക്കുമ്പോൾ `--update` ഉപയോഗിച്ച് റാച്ചറ്റ് താഴ്ത്തുക.                                                                                                                                                                                                                                                                                    | അതെ                                         |

### ജോബ്: `quality-gate`

`test-coverage`-ിന് ശേഷം പ്രവർത്തിക്കുന്നു. പരാജയപ്പെട്ടാൽ മേർജ് തടയുന്നു.

| സ്ക്രിപ്റ്റ്                 | പരിശോധിക്കുന്നത്                                                                                                                                                                                 | തടയുന്നത്                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| `quality:collect`            | `quality-metrics.json` പുറപ്പെടുവിക്കുന്നു (ESLint മുന്നറിയിപ്പ് എണ്ണം, ലയിപ്പിച്ച ഷാർഡ് റിപ്പോർട്ടിൽ നിന്നുള്ള കവറേജ്)                                                                          | അതെ (റാച്ചറ്റിന്റെ അപ്പ്സ്ട്രീം) |
| `quality:ratchet`            | `quality-baseline.json`-ലെ ഓരോ മെട്രിക്കും റിഗ്രസ് ചെയ്തിട്ടില്ല (ESLint മുന്നറിയിപ്പുകൾ ≤ ബേസ്ലൈൻ; കവറേജ് ≥ ബേസ്ലൈൻ)                                                                            | അതെ                              |
| `check:duplication`          | കോഡ് ഡ്യൂപ്ലിക്കേഷൻ (jscpd@4) `quality-baseline.json`-ലെ ബേസ്ലൈൻ കവിയുന്നില്ല                                                                                                                    | അതെ                              |
| `check:complexity`           | ഫയൽ-തല സൈക്ലോമാറ്റിക് സങ്കീർണ്ണത പരിധി കവിയുന്നില്ല (കോർ ESLint `complexity` + `max-lines-per-function`)                                                                                         | അതെ                              |
| `check:cognitive-complexity` | കോഗ്നിറ്റീവ് സങ്കീർണ്ണത റാച്ചറ്റ് (`eslint-plugin-sonarjs`) — പ്രത്യേക ESLint പാസ്; CI രണ്ടും ലയിപ്പിച്ച് ഒരൊറ്റ `check:complexity-ratchets` ഘട്ടമായി പ്രവർത്തിപ്പിക്കുന്നു                      | അതെ                              |
| `check:dead-code`            | ഉപയോഗിക്കാത്ത എക്സ്പോർട്ടുകൾ / ഫയലുകൾ റാച്ചറ്റ് (knip) ബേസ്ലൈനുമായി താരതമ്യപ്പെടുത്തുമ്പോൾ റിഗ്രസ് ചെയ്യുന്നില്ല                                                                                 | അതെ                              |
| `check:compression-budget`   | കംപ്രഷൻ ബെഞ്ച്മാർക്ക് ബജറ്റ് — എഞ്ചിൻ-തല ടോക്കൺ-ലാഭ പരിധികൾ റിഗ്രസ് ചെയ്യരുത്                                                                                                                    | അതെ                              |
| `check:type-coverage`        | ശതമാനം-ടൈപ്പ് ചെയ്തതിന്റെ റാച്ചറ്റ് (`type-coverage`) റിഗ്രസ് ചെയ്യുന്നില്ല; `typecheck:noimplicit:core`-നെ വലിയ അളവിൽ ഉൾക്കൊള്ളുന്നു                                                            | അതെ                              |
| `check:codeql-ratchet`       | തുറന്ന CodeQL അലേർട്ട് എണ്ണം റിഗ്രസ് ചെയ്യുന്നില്ല (`gh api` വഴി വായിക്കുന്നു; ടോക്കൺ ഇല്ലാത്തപ്പോൾ സുഗമമായി ഒഴിവാക്കുന്നു) — പുതുക്കൽ ആവൃത്തിയും മാനുവൽ ട്രിഗറും: താഴെ "CodeQL റാച്ചറ്റ്" കാണുക | അതെ                              |

### ജോബ്: `quality-extended`

മുഴുവൻ ജോബും ഉപദേശപരമാണ് (`continue-on-error: true`). npm-അധിഷ്ഠിത റാച്ചറ്റുകൾ യഥാർത്ഥത്തിൽ
പ്രവർത്തിക്കുന്നു; ബാഹ്യ സ്കാനറുകൾ `gh release download` വഴി ഇൻസ്റ്റാൾ ചെയ്യുകയും
ബൈനറി ഇപ്പോഴും ലഭ്യമല്ലാത്തപ്പോൾ സ്വയം ഒഴിവാക്കുകയും (exit 0) ചെയ്യുന്നു.

| സ്ക്രിപ്റ്റ്             | പരിശോധിക്കുന്നത്                                                                                                                                                                                                                                               | തടയുന്നത്                                                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `check:circular-deps`    | സർക്കുലർ ഡിപൻഡൻസികൾ ഇല്ല (dpdm)                                                                                                                                                                                                                                | **ഉപദേശപരം**                                              |
| `check:bundle-size`      | ബണ്ടിൽ വലുപ്പം പരിധി കവിയുന്നില്ല                                                                                                                                                                                                                              | **ഉപദേശപരം**                                              |
| `check:secrets`          | സീക്രട്ട് സ്കാനിംഗ് (gitleaks) — ബൈനറി ഇല്ലെങ്കിൽ ഒഴിവാക്കുന്നു                                                                                                                                                                                                | **ഉപദേശപരം**                                              |
| `check:vuln-ratchet`     | ഡിപൻഡൻസി ദുര്ബലതകൾ (osv-scanner) റിഗ്രസ് ചെയ്യുന്നില്ല — ബൈനറി ഇല്ലെങ്കിൽ ഒഴിവാക്കുന്നു                                                                                                                                                                        | **ഉപദേശപരം**                                              |
| `check:workflows`        | വർക്ക്ഫ്ലോ ലിന്റ് (actionlint + zizmor); നഷ്ടപ്പെട്ട/തകരാറിലുള്ള സ്കാനറുകൾ, അസാധുവായ റിപ്പോർട്ടുകൾ അല്ലെങ്കിൽ നഷ്ടപ്പെട്ട റാച്ചറ്റ് ബേസ്ലൈൻ എന്നിവ INCOMPLETE ആയി പരാജയപ്പെടുന്നു. സാധുവായ കണ്ടെത്തലുകൾ തിരഞ്ഞെടുത്ത strict/advisory/ratchet നയം പിന്തുടരുന്നു | എക്സിക്യൂഷൻ നിർബന്ധമാണ്; CI-യിൽ zizmor റാച്ചറ്റ് തടയുന്നു |
| `check:openapi-breaking` | പബ്ലിക് API കോൺട്രാക്ടിലെ (`openapi.yaml`) ബ്രേക്കിംഗ് മാറ്റങ്ങൾ ബേസ് ബ്രാഞ്ചുമായി താരതമ്യം ചെയ്യുന്നു (oasdiff) — `openapiBreaking=N` പുറപ്പെടുവിക്കുന്നു; oasdiff ഇല്ലെങ്കിലോ ബേസ് സ്പെസിഫിക്കേഷൻ പരിഹരിക്കാൻ കഴിയാത്തതാണെങ്കിലോ ഒഴിവാക്കുന്നു               | **ഉപദേശപരം**                                              |

### ജോബ്: `docs-sync-strict`

`main`-ലേക്കുള്ള ഓരോ PR-ലും പ്രവർത്തിക്കുന്നു. പരാജയപ്പെട്ടാൽ മേർജ് തടയുന്നു.

| സ്ക്രിപ്റ്റ്                   | സാധൂകരിക്കുന്നത്                                                                                                                                                                            | തടയുന്നത്                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | താഴെ പറയുന്ന 6 ഉപ-ഗേറ്റുകൾ ക്രമാനുസൃതം പ്രവർത്തിപ്പിക്കുന്ന മെറ്റാ-ഗേറ്റ്                                                                                                                   | അതെ                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt പതിപ്പ് സ്ഥിരത                                                                                                                                                | അതെ                         |
| ↳ `check:docs-counts`          | ഗദ്യത്തിലെ എണ്ണങ്ങൾ (പ്രൊവൈഡർ എണ്ണം, മൈഗ്രേഷൻ എണ്ണം തുടങ്ങിയവ) യഥാർത്ഥ എണ്ണങ്ങളുടെ റാച്ചറ്റ് വിൻഡോയ്ക്കുള്ളിലാണ്                                                                            | അതെ                         |
| ↳ `check:env-doc-sync`         | `.env.example`-ലെ ഓരോ എൻവ് വേരിയബിളും ഒരു ഡോക്സ് ടേബിളിൽ രേഖപ്പെടുത്തിയിരിക്കുന്നു, തിരിച്ചും                                                                                               | അതെ                         |
| ↳ `check:deprecated-versions`  | ഡോക്സിൽ ഉപേക്ഷിത പതിപ്പ് സ്ട്രിംഗുകളൊന്നുമില്ല                                                                                                                                              | അതെ                         |
| ↳ `check:doc-links`            | ഡോക്സിലെ ആന്തരിക മാർക്ക്ഡൗൺ ലിങ്കുകൾ യഥാർത്ഥ ഫയലുകളിലേക്ക് പരിഹരിക്കുന്നു (`[text]`/`(path)` രൂപത്തിൽ)                                                                                      | അതെ                         |
| ↳ `check:fabricated-docs`      | ഡോക്സിൽ ഉദ്ധരിച്ചിരിക്കുന്ന റൂട്ടുകൾ, എൻവ് വേരിയബിളുകൾ, CLI കമാൻഡുകൾ, ഹുക്ക് പേരുകൾ, ഫയൽ പാതകൾ എന്നിവ കോഡ്ബേസിൽ നിലവിലുണ്ട്. `--strict` വഴി ഹാർഡ് ഗേറ്റ്; ഫ്ലാഗ് ഇല്ലെങ്കിൽ സോഫ്റ്റ്-ഫെയിൽ. | അതെ (CI-യിൽ `--strict` വഴി) |
| `check:cli-i18n`               | CLI കമാൻഡ് സ്ട്രിംഗുകൾ എല്ലാ i18n ലോക്കേൽ ഫയലുകളിലുമുണ്ട്                                                                                                                                   | അതെ                         |
| `check:openapi-coverage`       | OpenAPI സ്പെക് യഥാർത്ഥ റൂട്ടുകളുടെ റാച്ചറ്റ് ചെയ്യപ്പെട്ട ഏറ്റവും കുറഞ്ഞ പരിധിയെങ്കിലും ഉൾക്കൊള്ളുന്നു                                                                                      | അതെ                         |
| `check:openapi-security-tiers` | `openapi.yaml`-ലെ സെക്യൂരിറ്റി ടയർ അനോട്ടേഷനുകൾ `routeGuard.ts` തരംതിരിവുകളുമായി പൊരുത്തപ്പെടുന്നു                                                                                          | **ഉപദേശകം**                 |
| `check:openapi-routes`         | `openapi.yaml`-ലെ ഓരോ പാതയും യഥാർത്ഥ `route.ts`-ലേക്ക് പരിഹരിക്കുന്നു (ആന്റി-ഹാലുസിനേഷൻ)                                                                                                    | അതെ                         |
| `check:docs-symbols`           | `docs/**/*.md`-ലെ ഓരോ `/api/...` റഫറൻസും യഥാർത്ഥ `route.ts`-ലേക്ക് പരിഹരിക്കുന്നു (ആന്റി-ഹാലുസിനേഷൻ)                                                                                        | അതെ                         |
| `i18n translation drift`       | i18n ലോക്കേൽ ഫയലുകളിലെ വിവർത്തനം ചെയ്യാത്ത കീകൾ — മുന്നറിയിപ്പ് മാത്രം                                                                                                                      | **ഉപദേശകം**                 |

`docs/diagrams/`-ലെ പന്ത്രണ്ട് README SVG-കൾ ജനറേറ്റ് ചെയ്യപ്പെട്ടവയാണ് (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` എല്ലാവയെയും പുനർജനറേറ്റ് ചെയ്യും). ഓരോന്നിനും ഒരു ബൈറ്റ്-താരതമ്യ യൂണിറ്റ് ടെസ്റ്റുണ്ട്
(`tests/unit/docs/readme-*-svg.test.ts`, ജോബ് `test-unit`), കമിറ്റ് ചെയ്ത ഫയൽ കാലഹരണപ്പെട്ടതാണെങ്കിൽ അത് പരാജയപ്പെടും;
കൂടാതെ `check:docs-counts` അവയുടെ `<text>` നോഡുകളിൽ നിന്ന് കാനോണിക്കൽ നമ്പറുകൾ വായിക്കുന്നു — അതുകൊണ്ടാണ്
നമ്പറുകൾ ഒരിക്കലും പാതകളായി ഔട്ട്ലൈൻ ചെയ്യാത്തത്. SVG കാനോണിക്കൽ-നമ്പറുകൾ പരിശോധന
`SVG_DIAGRAM_FILES`-ൽ (`scripts/check/check-docs-counts-sync.mjs`) ലിസ്റ്റ് ചെയ്തിരിക്കുന്ന ഫയലുകൾ വായിക്കുന്നു:
`docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`,
`cli-terminal.svg`, `tier-cascade.svg`, കൂടാതെ `public/images/tier-flow-dark.svg`, `tier-flow-light.svg` എന്നിവയും;
free-forever, catalog-entry, recurring-pool, scoring-factors എന്നീ ക്ലെയിമുകളും `promise-pillars.svg`,
`free-tier-budget.svg`, `strategies-grid.svg` എന്നിവ വായിക്കുന്നു. `free-tier-budget.svg` അതിന്റെ കണക്കുകൾ
ലൈവ് കാറ്റലോഗ് ലോഡറിൽ നിന്ന് എടുക്കുന്നു, അതിനാൽ `FREE_MODEL_BUDGETS`-ലോ ഒരു പ്രൊവൈഡർ ഡിസ്പ്ലേ പേരിലോ
ഉണ്ടാകുന്ന മാറ്റം ആ ഫയൽ പുനർജനറേറ്റ് ചെയ്യുന്നതുവരെ CI-യെ ചുവപ്പിക്കും.

### ജോബ്: `i18n-ui-coverage`

| സ്ക്രിപ്റ്റ്                     | സാധൂകരിക്കുന്നത്                                                                                                                                                                                       | തടയുന്നത്   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check-ui-keys-coverage` (ഇൻലൈൻ) | UI i18n കീ കവറേജ് ≥ 65% ആണ്                                                                                                                                                                            | അതെ         |
| `check-ui-value-drift` (ഇൻലൈൻ)   | പുനഃരചിക്കപ്പെട്ട ഒരു ഇംഗ്ലീഷ് **വാല്യു** പഴയ വിവർത്തനം പിന്നിൽ അവശേഷിപ്പിക്കുന്നില്ല                                                                                                                  | അതെ         |
| `check-new-key-coverage` (ഇൻലൈൻ) | ഒരു **പുതിയ** ഇംഗ്ലീഷ് കീ എല്ലാ ലോക്കേലിലും വിവർത്തനം ചെയ്യപ്പെട്ടിരിക്കുന്നു — ഒരു `__MISSING__:` മാർക്കർ നിരസിക്കപ്പെടും                                                                             | അതെ         |
| `check-translation-ratio`        | ഓരോ ലോക്കേലിലെയും യഥാർത്ഥ-വിവർത്തന അനുപാതം (ഇംഗ്ലീഷിന് തുല്യമായവ / പ്ലേസ്ഹോൾഡർ / അലവ്ലിസ്റ്റിന് പുറത്തുള്ള മിസ്സിംഗ് ലീഫുകൾ) `config/quality/i18n-translation-baseline.json` + സ്ലാക്ക് കവിയാൻ പാടില്ല | **ഉപദേശകം** |

`fetch-depth: 0` ആവശ്യമാണ് — വാല്യു-ഡ്രിഫ്റ്റ് ഗേറ്റ് `en.json`-നെ മെർജ് ബേസിനെതിരെ ഡിഫ് ചെയ്യുന്നു.

#### `check-ui-value-drift` — കാലഹരണപ്പെട്ട-വിവർത്തന ഗേറ്റ്

മറ്റ് ഗേറ്റുകൾക്ക് ഘടനാപരമായി കാണാൻ കഴിയാത്ത ഒരേയൊരു i18n റിഗ്രഷനെ ഇത് പിടികൂടുന്നു: ഒരു ഇംഗ്ലീഷ് വാല്യു പുനഃരചിക്കപ്പെടുമ്പോൾ, _മുൻ_ ഇംഗ്ലീഷിൽ നിന്ന് ഉരുത്തിരിഞ്ഞ വിവർത്തനങ്ങൾ പിന്നിൽ തന്നെ തുടരുന്നു, അതിനാൽ ഇംഗ്ലീഷേറ്റര ഉപയോക്താക്കൾ ആത്മവിശ്വാസത്തോടെ എഴുതിയ, ഇപ്പോൾ തെറ്റായതായ കോപ്പി വായിച്ചുകൊണ്ടേ ഇരിക്കും.

ഇത് യഥാർത്ഥത്തിൽ ഷിപ്പ് ആയിട്ടുണ്ട്. Antigravity ലോഗിൻ ഹെൽപ്പർ എത്തിയപ്പോൾ (#5203) `oauthModal.googleOAuthWarning` പുനഃരചിക്കപ്പെട്ടു; **43-ൽ 39 ലോക്കേലുകളും** ഓപ്പറേറ്റർമാരോട് "മുഴുവൻ URL-ഉം പകർത്തി താഴെ ഒട്ടിക്കുക" എന്ന് പറയുന്ന ടെക്സ്റ്റ് നിലനിർത്തി — ആ പ്രൊവൈഡറിന് ഒരിക്കലും പൂർത്തിയാക്കാൻ കഴിയാത്ത ഒരു ഫ്ലോ. #8463 വരെ ഇത് ശ്രദ്ധിക്കപ്പെട്ടിരുന്നില്ല, കാരണം:

- `sync-ui-keys` **അനുപস্থിതമായ** കീകൾ മാത്രമേ ബാക്ക്ഫിൽ ചെയ്യൂ; **കാലഹരണപ്പെട്ടവയെ** ഒരിക്കലും തൊടുന്നില്ല;
- `check-ui-keys-coverage` കീയുടെ _സാന്നിധ്യം_ എണ്ണുന്നു, അതിനാൽ കാലഹരണപ്പെട്ട ഒരു വിവർത്തനവും കവർ ചെയ്തതായി സ്കോർ ചെയ്യപ്പെടും;
- `check-translation-drift` `docs/i18n/<locale>/**.md` ഡോക്യുമെന്റേഷൻ മിററുകളെ ട്രാക്ക് ചെയ്യുന്നു — ഇത് ഒരിക്കലും `src/i18n/messages/*.json` വായിക്കുന്നില്ല. 2026-09 റീ-സിങ്ക് മുതൽ `docs-sync-strict` ജോബിൽ ബ്ലോക്കിംഗ് ആണ്: ഒരു കോർ ഡോക് എഡിറ്റ് ചെയ്യുക → `npm run i18n:run -- --files=<doc>` (സെക്ഷൻ-തലത്തിൽ, ചെലവ് കുറഞ്ഞത്).

**ഡിഫ്-അവെയർ ആണ്, ബേസ്ലൈൻ-ബാക്കഡ് അല്ല.** ഇത് മെർജ് ബേസിലെ `en.json` വർക്കിംഗ് ട്രീയുമായി താരതമ്യം ചെയ്യുന്നു; ഇംഗ്ലീഷ് വാല്യു മാറിയ ഓരോ കീയ്ക്കും, തൊടാതെ നിൽക്കുന്ന വിവർത്തനം നിലനിർത്തുന്ന ഏത് ലോക്കേലും കാലഹരണപ്പെട്ടതാണ്. ഇത് ബോധപൂർവ്വം **മുൻകൂടിയുണ്ടായ കടം ഫ്രീസ് ചെയ്യുന്നു** — ദീർഘകാലമായി നിലനിൽക്കുന്ന ഒരു വിവർത്തനം ഏത് പഴയ ഇംഗ്ലീഷിൽ നിന്നാണ് വന്നതെന്ന് ഒരു ഡിഫിന് വെളിപ്പെടുത്താൻ കഴിയില്ല, അതിനാൽ നിലവിലെ മാറ്റം സ്പർശിക്കുന്നത് മാത്രമേ ഗേറ്റ് വിധിക്കൂ. ബദൽ (കീ-തല ഹാഷ് ബേസ്ലൈൻ) ഏകദേശം 600 KB വരുന്ന ഒരു ജനറേറ്റഡ് ഫയലാണ് ചെലവാക്കുക — നിലവിലുള്ള ഏറ്റവും വലിയ ബേസ്ലൈന്റെ 3× മടങ്ങ് — ഓരോ i18n PR-ലും മാറ്റങ്ങൾക്ക് വിധേയമാകും.

ഇത് തൃപ്തിപ്പെടുത്താൻ രണ്ട് വഴികളുണ്ട്:

1. ബാധിക്കപ്പെട്ട വിവർത്തനങ്ങൾ അപ്ഡേറ്റ് ചെയ്യുക, അല്ലെങ്കിൽ
2. അവ `__MISSING__:<new english>` ആയി സജ്ജീകരിക്കുക — അപ്പോൾ റൺടൈം ശരിയാക്കിയ ഇംഗ്ലീഷ് സെർവ് ചെയ്യും
   (`src/i18n/request.ts::deepMergeFallback`, #7258), കീ വിവർത്തനത്തിനായി ക്യൂവിൽ ചേരും.

സ്ട്രിംഗിന്റെ **അർത്ഥം** മാറിയെങ്കിൽ, **കീ പുനർനാമകരണം ചെയ്യുന്നതാണ്** അഭികാമ്യം: ഒരു പുതിയ കീയ്ക്ക് കാലഹരണപ്പെട്ട വിവർത്തനം പാരമ്പര്യമായി ലഭിക്കില്ല. #8463 ഉപയോഗിച്ച പാറ്റേൺ അതാണ്.

```bash
npm run i18n:check-value-drift          # സ്ട്രിക്റ്റ് (CI ഓടിക്കുന്നത്)
npm run i18n:check-value-drift:warn     # റിപ്പോർട്ട് മാത്രം
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

ബേസ് കാറ്റലോഗ് വായിക്കാൻ കഴിയാത്തപ്പോൾ (ബേസ് റഫ് ഇല്ലാത്ത ഷാലോ ക്ലോൺ) `SKIP reason=base-unresolved` എന്നതോടെ 0 എക്സിറ്റ് കോഡിൽ പുറത്തുകടക്കും, `check-openapi-breaking`-നെ അനുകരിച്ചുകൊണ്ട്.

### ജോബ്: `i18n`

പൂർണ്ണ i18n വാലിഡേഷൻ മാട്രിക്സ് (ഓരോ ലോക്കേലിനും ഒരു ജോബ്). ജോബ് മുഴുവൻ ഉപദേശാത്മകമാണ്.

| സ്ക്രിപ്റ്റ്                    | വാലിഡേറ്റ് ചെയ്യുന്നത്               | ബ്ലോക്കിംഗ്                                             |
| ------------------------------- | ------------------------------------ | ------------------------------------------------------- |
| `validate_translation.py quick` | ലോക്കേൽ തലത്തിലുള്ള വിവർത്തന പൂർണ്ണത | **ഉപദേശാത്മകം** (ജോബ് മുഴുവൻ `continue-on-error: true`) |

### ജോബ്: `pr-test-policy`

പുൾ റിക്വസ്റ്റുകളിൽ മാത്രം ഓടുന്നു.

| സ്ക്രിപ്റ്റ്           | വാലിഡേറ്റ് ചെയ്യുന്നത്                                                                                                                                    | ബ്ലോക്കിംഗ് |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, അല്ലെങ്കിൽ `bin/`-ൽ പ്രൊഡക്ഷൻ കോഡ് മാറ്റുന്ന PR-കൾ ടെസ്റ്റുകൾ ഉൾപ്പെടുത്തുകയോ അപ്ഡേറ്റ് ചെയ്യുകയോ വേണം (Hard Rule #8)   | അതെ         |
| `check:test-masking`   | മാറിയ ടെസ്റ്റ് ഫയലുകൾ ആകെ അസർട്ട് എണ്ണം കുറയ്ക്കുന്നില്ല, അല്ലെങ്കിൽ `assert.ok(true)` ടോട്ടോളജികൾ ചേർക്കുന്നില്ല                                         | അതെ         |
| `check:pr-evidence`    | PR ബോഡി മാറ്റത്തിനുള്ള ടെസ്റ്റ്/VPS തെളിവുകൾ ഉദ്ധരിക്കുന്നു (PR പ്രോസ ഗ്രെപ്പ് ചെയ്തുകൊണ്ട് Hard Rule #18-എ മെക്കനൈസ് ചെയ്യുന്നു — ദുർബലം, Backlog കാണുക) | അതെ         |

### ജോബ്: `test-vitest`

`build`-ന് ശേഷം ഓടുന്നു. പരാജയപ്പെട്ടാൽ മെർജ് ബ്ലോക്ക് ചെയ്യും.

| സ്യൂട്ട്         | വാലിഡേറ്റ് ചെയ്യുന്നത്                                 | ബ്ലോക്കിംഗ്                                                                                                                         |
| ---------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP സെർവർ (110 ടൂളുകൾ), autoCombo, കാഷെ — vitest റണ്ണർ | അതെ                                                                                                                                 |
| `test:vitest:ui` | UI കോമ്പോണന്റ് ടെസ്റ്റുകൾ — vitest റണ്ണർ               | **ബ്ലോക്കിംഗ്** — നിലവിലുള്ള പരാജയങ്ങൾ `vitest.config.ts`-ൽ വ്യക്തമായി ഒഴിവാക്കിയിരിക്കുന്നു; പുതിയ പരാജയങ്ങൾ ജോബ് പരാജയപ്പെടുത്തും |

### നൈറ്റ്ലി വർക്ക്ഫ്ലോകൾ (ഷെഡ്യൂൾ ചെയ്തവ, ഉപദേശാത്മകം)

ഇവ ഒരു cron ഷെഡ്യൂളിലാണ് (ഒപ്പം `workflow_dispatch`) ഓടുന്നത്, ഒരിക്കലും PR-കളിൽ അല്ല. എല്ലാം ഉപദേശാത്മകമാണ്.

| വർക്ക്ഫ്ലോ             | സാധൂകരിക്കുന്നത്                                                                                                                                                                       | തടസ്സം      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | റാൻഡം സീഡ് + ഉയർന്ന റൺ എണ്ണം ഉപയോഗിച്ചുള്ള fast-check പ്രോപ്പർട്ടി ടെസ്റ്റുകൾ                                                                                                          | **ഉപദേശകം** |
| `nightly-resilience`   | heap-growth ഗേറ്റ്, ക്യോസ് ഫോൾട്ട്-ഇൻജക്ഷൻ, k6 ലോഡ്/സോക്ക്                                                                                                                             | **ഉപദേശകം** |
| `nightly-llm-security` | promptfoo ഇൻജക്ഷൻ ഗാർഡ് (ബ്ലോക്ക് മോഡ്) + garak പ്രോബുകൾ (പ്രൊവൈഡർ സീക്രട്ട് ഇല്ലാത്തപ്പോൾ ഒഴിവാക്കും)                                                                                 | **ഉപദേശകം** |
| `nightly-schemathesis` | `docs/openapi.yaml` ഉപയോഗിച്ച് ലൈവ് OmniRoute-നെതിരെ OpenAPI കോൺട്രാക്ട് ഫസ്സിംഗ് (schemathesis) — സ്പെക് ലംഘനങ്ങളും കൈകാര്യം ചെയ്യാത്ത 500-കളും വെളിച്ചത്തുകൊണ്ടുവരുന്നു (Fase 8 B.4) | **ഉപദേശകം** |
| `nightly-mutation`     | ഫാസ്റ്റ് യൂണിറ്റ് ലെയിനിലെ Stryker മ്യൂട്ടേഷൻ-ടെസ്റ്റിംഗ് സ്കോർ — അവശേഷിക്കുന്ന മ്യൂട്ടന്റുകൾ ദുർബലമായ അസേർട്ടുകൾ തിരിച്ചറിയാൻ സഹായിക്കുന്നു                                           | **ഉപദേശകം** |
| `nightly-compat`       | പിന്തുണയ്ക്കുന്ന `engines.node` റേഞ്ചുകളിലുടനീളമുള്ള Node എഞ്ചിൻ അനുയോജ്യത മാട്രിക്സ്                                                                                                  | **ഉപദേശകം** |

പെർഫോമൻസ് ബേസ്ലൈനുകൾ (heap, TTFB, ബിൽഡ് സമയം) രേഖപ്പെടുത്തുക മാത്രമാണ് ചെയ്യുന്നത്, ഗേറ്റ് ചെയ്യുന്നില്ല: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) കാണുക (`npm run perf:lts-baseline`).

---

## വേഗതാ ഘട്ടം (2026-08-30 → v4.0 LTS): എല്ലാ അടിസ്ഥാനപരിധികളിലും 20% ഇളവ് നൽകി

ഉടമയുടെ തീരുമാനം (2026-08-30): v4.0 മോഡുലറൈസേഷൻ വരെ, സാങ്കേതിക കടത്തിന്റെ പരിധി നിലനിർത്തുന്നതിനെക്കാൾ
വേഗത്തിൽ റിലീസ് ചെയ്യുന്നതിനാണ് പ്രാധാന്യം. എല്ലാ **സംഖ്യാത്മക** റാച്ചറ്റ് അടിസ്ഥാനപരിധികളിലും ഓഡിറ്റ് ചെയ്യാവുന്ന
ഒരൊറ്റ നടപടിയിലൂടെ 20% ഇളവ് നൽകി; ഈ ഘട്ടം `config/quality/quality-baseline.json`-ൽ പ്രഖ്യാപിച്ചിട്ടുണ്ട്:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| എന്താണ് മാറിയത്                                                                                                                                                                                                        | എവിടെ                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — കുറഞ്ഞാൽ മെച്ചമായ എണ്ണങ്ങൾ ×1.2, കൂടിയാൽ മെച്ചമായ ശതമാനങ്ങൾ ÷1.2 (കവറേജ് കുറഞ്ഞപരിധി 60 ആയി നിലനിർത്തി, `eslintErrors` 0 ആയി തുടരുന്നു, `eslintWarnings` 0 → ഫ്രീസ് ചെയ്ത സപ്രഷൻ എണ്ണത്തിന്റെ 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` കുറിപ്പിൽ മുമ്പുള്ളത് → ശേഷമുള്ളത് എന്ന രീതിയിൽ എല്ലാം പട്ടികപ്പെടുത്തിയിരിക്കുന്നു) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                       | `complexity-baseline.json`, `duplication-baseline.json`                                                                                    |
| `cap`, `testCap`, എല്ലാ `frozen[*]` / `testFrozen[*]` വരി പരിധികളും ×1.2                                                                                                                                               | `file-size-baseline.json`                                                                                                                  |
| ഓരോ ഫയലിലെയും / ഓരോ TS കോഡിലെയും എണ്ണങ്ങൾ ×1.2                                                                                                                                                                         | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`                                     |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                    | `scripts/check/check-openapi-coverage.mjs`                                                                                                 |
| `_policy.requireTighten === false` ആയിരിക്കുമ്പോൾ `--require-tighten` ഉപദേശപരമാകുന്നു                                                                                                                                  | `scripts/quality/check-quality-ratchet.mjs`                                                                                                |
| രാത്രികാല `bank-ratchet-shrinks` താൽക്കാലികമായി നിർത്തുന്നു (അത് അളന്ന ചുരുക്കം രേഖപ്പെടുത്തി ലഭ്യമായ അധികപരിധി ഇല്ലാതാക്കുമായിരുന്നു)                                                                                 | `.github/workflows/nightly-release-green.yml`                                                                                              |

അനുമതിപ്പട്ടികകൾ (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) ബജറ്റുകളല്ല, അവയിൽ മാറ്റം വരുത്തിയിട്ടില്ല. പാസ്/പരാജയ നയ ഗേറ്റുകൾ (രഹസ്യങ്ങൾ, SQL നിയമങ്ങൾ,
ഡോക്സ്/env കരാർ, i18n തുല്യത, യൂണിറ്റ് ടെസ്റ്റുകൾ) മാറ്റമില്ലാതെ തുടരുന്നു — പരാജയപ്പെട്ട ടെസ്റ്റ് ഇപ്പോഴും പരാജയപ്പെട്ട ടെസ്റ്റ് തന്നെയാണ്.

**ടൂളിംഗ്**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ഒറ്റത്തവണയുള്ള
  ഇളവ് (`scripts/quality/relax-baselines.mjs`); ഒരേ കുറിപ്പുപയോഗിച്ച് രണ്ടുതവണ പ്രവർത്തിക്കാൻ അനുവദിക്കില്ല.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI അളക്കുന്ന അതേ രീതിയിൽ ഓരോ സംഖ്യാത്മക ഗേറ്റും അളക്കുകയും ഓരോ ഗേറ്റിലും ശേഷിക്കുന്ന അധികപരിധി പ്രദർശിപ്പിക്കുകയും ചെയ്യുന്നു
  (`scripts/quality/baseline-headroom.mjs`). രാത്രികാല `baseline-headroom` ജോലി, വർക്ക്ഫ്ലോ റൺ സംഗ്രഹത്തിൽ
  പട്ടിക പ്രസിദ്ധീകരിക്കുകയും അതിന്റെ JSON/Markdown റിപ്പോർട്ട്
  `baseline-headroom-<run_id>` ആയി അപ്ലോഡ് ചെയ്യുകയും 90 ദിവസത്തേക്ക് സൂക്ഷിക്കുകയും ചെയ്യുന്നു. മുന്നറിയിപ്പ്, ഗുരുതരം എന്നീ വരികൾ,
  സ്വന്തം പരിധിയുടെ 10%-നുള്ളിലുള്ളതോ ഇതിനകം അത് കവിഞ്ഞതോ ആയ ഗേറ്റുകളെ തിരിച്ചറിയുന്നു. ബജറ്റുകൾ ഉപയോഗിക്കപ്പെടുന്നതിന്റെ
  മുൻകൂർ മുന്നറിയിപ്പായി ഈ റിപ്പോർട്ടുകൾ പരിശോധിക്കുക; പ്രശ്നമുണ്ടാക്കുന്ന ഗേറ്റിന്റെ `_rebaseline_*` കുറിപ്പുകൾ പരിശോധിക്കുക. ഈ ജോലി ഇനി
  സ്ഥിരമായ ഒരു ഇഷ്യൂ സൃഷ്ടിക്കുകയോ അപ്ഡേറ്റ് ചെയ്യുകയോ ഇല്ല; മുമ്പത്തെ റിപ്പോർട്ട് ചരിത്രം #12149-ൽ സംരക്ഷിച്ചിരിക്കുന്നു.

**പുതിയ-കോഡ് മോഡ് (Clean-as-You-Code) — 2026-08-30 മുതൽ, PR അതിവേഗ പാതയിൽ മാത്രം**

`pull_request` ഇവന്റുകളിൽ `quality.yml`, `check:file-size`,
`check:complexity-ratchets`, `check:dead-code` എന്നിവയ്ക്ക് `--base-ref <PR base SHA>` കൈമാറുന്നു. `check:complexity-ratchets`,
`check:dead-code` എന്നിവയ്ക്കായി, ഗേറ്റ് HEAD-നെ മെർജ്-ബേസുമായി താരതമ്യം ചെയ്യുന്നത് **PR മാറ്റം വരുത്തിയ ഫയലുകളിൽ
മാത്രമായി പരിമിതപ്പെടുത്തിയാണ്** (`scripts/check/newCodeMode.mjs`: മെർജ്-ബേസ് താൽക്കാലികമായ ഒരു
`git worktree`-ൽ സൃഷ്ടിക്കുന്നു, അവിടെയും HEAD-ലും ESLint/knip പ്രവർത്തിപ്പിക്കുന്നു, തുടർന്ന് ഓരോ ഫയലിലെയും എണ്ണങ്ങളുടെ വ്യത്യാസം കണക്കാക്കുന്നു):

- **തടയുന്നത്** — PR മാറ്റം വരുത്തിയ ഫയലുകളിൽ സൈക്ലോമാറ്റിക്/കോഗ്നിറ്റീവ് ലംഘനങ്ങളോ ഉപയോഗിക്കാത്ത എക്സ്പോർട്ടുകളോ ചേർത്തു
  (ലോഗിൽ `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **ഉപദേശപരം** — ഫ്രീസ് ചെയ്ത അടിസ്ഥാനപരിധിയുമായി താരതമ്യം ചെയ്ത ആഗോള മൊത്തം. പാരമ്പര്യമായി ലഭിച്ച വ്യതിയാനം നിരപരാധിയായ
  PR-നെ ഒരിക്കലും പരാജയപ്പെടുത്തില്ല; റിലീസ് അനുരഞ്ജന സമയത്ത് ആ വ്യതിയാനം വീണ്ടും ഫ്രീസ് ചെയ്യുകയും headroom ജോലി നിരീക്ഷിക്കുകയും ചെയ്യും.

`check:file-size` അതിന്റേതായ വ്യവസ്ഥകളിൽ ബേസ് റെഫ് ഉപയോഗിക്കുന്നു (`scripts/check/check-file-size.mjs`, #8522):
ട്രീയിലെ എല്ലാ സോഴ്സ്, ടെസ്റ്റ് ഫയലുകളും ഇത് പരിശോധിക്കുന്നു; PR ബേസിൽ ഓരോ ഫയലിലെയും വരികളുടെ എണ്ണം
`git show` ഉപയോഗിച്ച് വായിക്കുന്നു; തുടർന്ന്, ഒരു ഫയൽ അതിന്റെ അടിസ്ഥാനപരിധി സീലിങ്ങിലും
(`frozen` / `testFrozen`, അല്ലെങ്കിൽ അടിസ്ഥാനപരിധിക്ക് പുറത്തുള്ള ഫയലിന് `cap` / `testCap`) അതിന്റെ ബേസ്
വലുപ്പത്തിലും വലുതായതിനെക്കാൾ കൂടുതലാകുമ്പോൾ മാത്രമാണ് അതിനെ പരാജയപ്പെടുത്തുന്നത്. അതിനാൽ ബേസിൽ ഇതിനകം വ്യതിയാനം വന്ന ഒരു ഫയൽ നിരപരാധിയായ PR-നെ ഒരിക്കലും പരാജയപ്പെടുത്തില്ല.

`check:boundary:ratchet` അതിന്റെ ഏക സംഖ്യയ്ക്കും ഇതേ നിയമം പ്രയോഗിക്കുന്നു
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR ഇവന്റുകളിൽ
`quality.yml` fast-gates-ഉം `ci.yml` lint job-ഉം PR base SHA കൈമാറുന്നു, base commit ഒരു
`git archive` export-ൽനിന്ന് അളക്കപ്പെടുന്നു, കൂടാതെ അതിന്റെ `open-sse → src` edge
എണ്ണം `metrics.boundaryOpenSseToSrc`-ന്റെയും base-ലെ എണ്ണത്തിന്റെയും വലിയ മൂല്യത്തെ
മറികടക്കുമ്പോൾ മാത്രമാണ് PR പരാജയപ്പെടുന്നത്. പരിധിക്ക് മുകളിലുള്ള base drift
റിപ്പോർട്ട് ചെയ്യപ്പെടുന്നു (`base drift herdado`), പക്ഷേ കുറ്റമില്ലാത്ത ഒരു PR-നെ ഒരിക്കലും
പരാജയപ്പെടുത്തില്ല; push → main കേവല പരിധി നിലനിർത്തുന്നു, പരിഹരിക്കാനാകാത്ത ഒരു base SHA
ഒരു മുന്നറിയിപ്പോടെ അതിലേക്ക് fallback ചെയ്യുന്നു.

`workflow_dispatch` runs, release-green sweep, nightly headroom job എന്നിവയ്ക്ക് PR base
ഇല്ലാത്തതിനാൽ അവ കേവലമായ (global) താരതമ്യം നിലനിർത്തുന്നു. Coverage, duplication,
type-coverage എന്നിവ ഇപ്പോൾ global ആയി തുടരുന്നു (അവയുടെ tools ചെലവ് കുറഞ്ഞ രീതിയിൽ
per-file diff സൃഷ്ടിക്കുന്നില്ല) — ഇതേ പരിചരണത്തിനുള്ള സാധ്യതയുള്ളവയാണ് അവ.

**v4.0-ൽ phase അവസാനിപ്പിക്കൽ (LTS = മുമ്പത്തേതിനേക്കാൾ കർശനമായത്, "സാധാരണ നിലയിലേക്കുള്ള മടക്കം" അല്ല)**

1. ശുദ്ധമായ `release/v4.0.0` tip-ൽ: രേഖയ്ക്കായി `npm run quality:headroom --json`, തുടർന്ന്
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, ഓരോ typecheck gate-ന്റെയും
   `--update` — എല്ലാ baseline-കളും അളന്ന മൂല്യത്തിലേക്ക് താഴുന്നു.
2. `quality-baseline.json`-ൽനിന്ന് `_policy` ഇല്ലാതാക്കുക (`--require-tighten`-ഉം nightly
   banking-ഉം വീണ്ടും സജ്ജമാക്കുന്നു), `check-openapi-coverage.mjs`-ൽ `THRESHOLD = 36`
   (അല്ലെങ്കിൽ അതിലും ഉയർന്നത്) പുനഃസ്ഥാപിക്കുക.
3. Modularization ഫലം നൽകിയ ഇടങ്ങളിൽ അളന്ന മൂല്യത്തേക്കാൾ കൂടുതൽ കർശനമാക്കുക: file-size
   `cap` വീണ്ടും 1000-ലേക്ക് (അല്ലെങ്കിൽ 800), coverage floors +5, modularized packages-ന്
   dead exports 0.

## റാച്ചറ്റ് ബേസ്ലൈൻ (`quality-baseline.json`)

റാച്ചറ്റ് എൻജിൻ (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` വായിക്കുകയും
പുതുതായി ശേഖരിച്ച `quality-metrics.json`-മായി അതിനെ താരതമ്യം ചെയ്യുകയും ചെയ്യുന്നു. അനുവദനീയമായ എപ്സിലോണിനപ്പുറം
പിന്നോട്ട് പോകുന്ന ഏതൊരു മെട്രിക്കും ബിൽഡ് പരാജയപ്പെടാൻ കാരണമാകും.

നിലവിൽ ട്രാക്ക് ചെയ്യുന്ന മെട്രിക്കുകൾ:

| മെട്രിക്              | ദിശ    | അർത്ഥം                                  |
| --------------------- | ------ | --------------------------------------- |
| `eslintWarnings`      | `down` | ESLint മുന്നറിയിപ്പുകളുടെ എണ്ണം കൂടരുത് |
| `coverage.statements` | `up`   | സ്റ്റേറ്റ്മെന്റ് കവറേജ് കുറയരുത്        |
| `coverage.lines`      | `up`   | ലൈൻ കവറേജ് കുറയരുത്                     |
| `coverage.functions`  | `up`   | ഫംഗ്ഷൻ കവറേജ് കുറയരുത്                  |
| `coverage.branches`   | `up`   | ബ്രാഞ്ച് കവറേജ് കുറയരുത്                |

യഥാർഥമായൊരു മെച്ചപ്പെടുത്തലിനുശേഷം ബേസ്ലൈൻ പുതുക്കാൻ:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ഫ്ലാഗ് നിലവിൽ അളന്ന മൂല്യങ്ങൾ `quality-baseline.json`-ലേക്ക് എഴുതുന്നു.
മെട്രിക് മെച്ചപ്പെടുത്തിയ മാറ്റത്തോടൊപ്പം ഈ ഫയലും കമ്മിറ്റ് ചെയ്യുക. ബേസ്ലൈൻ പുതുക്കാതെ
ഒരു മെട്രിക് മെച്ചപ്പെടുത്തുന്ന PR, `--require-tighten` വഴി കണ്ടെത്തപ്പെടും (ഘട്ടം 6A.5,
നടപ്പാക്കൽ ശേഷിക്കുന്നു).

### CodeQL റാച്ചറ്റ്: പുതുക്കൽ ആവൃത്തിയും മാനുവൽ ട്രിഗറും

`check:codeql-ratchet` വായിക്കുന്നത് **ഒരു ഷെഡ്യൂൾ അനുസരിച്ച് പുതുക്കുന്ന റിപ്പോയുടെ അവസ്ഥയാണ് — ഓരോ PR-നും പ്രത്യേകം അല്ല.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` റിപ്പോർട്ട് ചെയ്യുന്നത്
`state: configured`, `schedule: weekly` എന്നാണ്: ഇത് GitHub-ന്റെ ഡിഫോൾട്ട്-സെറ്റപ്പ് സ്കാനാണ്, ഓരോ പുഷിനുമുള്ള
വിശകലനമല്ല. അനന്തരഫലം: അലർട്ടുകൾ പരിഹരിക്കുന്ന ഒരു PR മെർജ് ചെയ്തശേഷവും, അടുത്ത ഷെഡ്യൂൾ ചെയ്ത സ്കാൻ
പ്രവർത്തിക്കുന്നതുവരെ റാച്ചറ്റ് പഴയതും കൂടുതലുമായ എണ്ണം വായിച്ചുകൊണ്ടിരിക്കും — അതിനാൽ സ്കാൻ പുതുക്കിയ നിലയിലെത്തുന്നതുവരെ,
പരിഹാര PR-ന്റെ സ്വന്തം തുടർ PR-കൾ ഉൾപ്പെടെ തുറന്നിരിക്കുന്ന എല്ലാ PR-ലും അത് ഒരു റിഗ്രഷൻ റിപ്പോർട്ട് ചെയ്യും.

**മാനുവൽ പുതുക്കൽ**: `gh workflow run codeql.yml --ref release/vX.Y.Z` വിശകലനം വീണ്ടും പ്രവർത്തിപ്പിക്കുകയും
മിനിറ്റുകൾക്കുള്ളിൽ അലർട്ടുകൾ വീണ്ടും പ്രസിദ്ധീകരിക്കുകയും ചെയ്യുന്നു. ആദ്യം `.github/workflows/codeql.yml`
വായിക്കുക — GitHub-ന്റെ "ഡിഫോൾട്ട് സെറ്റപ്പുമായി ഇത് വൈരുധ്യമുണ്ടാക്കുന്നതിനാൽ" ഇത് `workflow_dispatch`-മാത്രമാണെന്ന്
അതിന്റെ ഹെഡർ വിശദീകരിക്കുന്നു (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). `push`/`pull_request`/
`schedule` ട്രിഗറുകൾ പുനഃസ്ഥാപിക്കുന്നതിന് ആദ്യം **ഉടമയുടെ നടപടി** ആവശ്യമാണ്: Settings → Code security →
CodeQL: Default → Advanced. ആ മാറ്റം വരുത്താതെ ഒരു `schedule:` ട്രിഗർ ചേർക്കരുത് — അത്
പരാജയപ്പെടുന്ന റണ്ണുകൾ മാത്രമേ സൃഷ്ടിക്കൂ.

**എണ്ണം കുറഞ്ഞശേഷം ബേസ്ലൈൻ കർശനമാക്കുക** — `node scripts/check/check-codeql-ratchet.mjs
--update` പുതുതായി അളന്ന എണ്ണം `quality-baseline.json` →
`metrics.codeqlAlerts.value`-ലേക്ക് എഴുതുന്നു; അതിനാൽ പഴയ പരമാവധി പരിധിയിലേക്കുള്ള ഒരു റിഗ്രഷൻ റാച്ചറ്റ് നിശ്ശബ്ദമായി
അനുവദിക്കില്ല. പ്രായോഗിക ഉദാഹരണം (2026-09-02/03): PR #12502 യഥാർഥമായ 7 അലർട്ടുകൾ പരിഹരിച്ചു
(അളന്ന തുറന്ന അലർട്ടുകൾ 13 → 6); അതുമായി പൊരുത്തപ്പെടാൻ PR #12530 നിശ്ചലപ്പെടുത്തിയ ബേസ്ലൈൻ 11 → 6 ആയി കർശനമാക്കി;
ശേഷിച്ച 6 അലർട്ടുകൾ ഓരോന്നിനും പ്രത്യേകം ന്യായീകരണം നൽകി നിരസിച്ച്, തുറന്ന അലർട്ടുകളുടെ എണ്ണം 0 ആക്കി.

**നിരസിക്കലുകൾ ഓപ്പറേറ്ററുടെ തീരുമാനമാണ് (കർശന നിയമം #14)** — നിരസിക്കൽ കമന്റിൽ സാങ്കേതിക ന്യായീകരണം
രേഖപ്പെടുത്താതെ ഒരു CodeQL അലർട്ടും ഒരിക്കലും നിരസിക്കരുത്: അപ്സ്ട്രീം-പ്രോട്ടോക്കോൾ ആവശ്യകതയ്ക്ക് `won't fix`,
ഒരു ടെസ്റ്റ് ഫിക്സ്ചറിന് `used in tests`, CodeQL-ന് കണ്ടെത്താനാകാത്ത ഒരു സാനിറ്റൈസറിന് `false positive`
(മുൻമാതൃക: `docs/security/ERROR_SANITIZATION.md`).

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

## അനുവദനീയ പട്ടികാ നയം

മുൻപേ നിലവിലുണ്ടായിരുന്ന ലംഘനങ്ങളിൽ പരാജയപ്പെടാൻ പാടില്ലാത്ത എല്ലാ ഗേറ്റുകളും സ്ഥിരപ്പെടുത്തിയ ഒരു അനുവദനീയ പട്ടിക ഉപയോഗിക്കുന്നു
(ഉദാ., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). നയം ഇതാണ്:

**മൂലകാരണം പരിഹരിക്കുക; ലംഘനം മുൻപേ നിലവിലുണ്ടായിരിക്കുകയും അതേ PR-ൽ പരിഹരിക്കാൻ കഴിയാതിരിക്കുകയും ചെയ്യുമ്പോൾ മാത്രം അനുവദനീയ പട്ടിക ഉപയോഗിക്കുക.**

ഒരു അനുവദനീയ പട്ടികയിലേക്ക് എൻട്രി ചേർക്കുമ്പോൾ:

1. ന്യായീകരണം ഉൾക്കൊള്ളുന്ന ഒരു കമന്റ് ചേർക്കുക.
2. ട്രാക്കിംഗ് ഇഷ്യൂവിനെ പരാമർശിക്കുക (ഉദാ., `// #3498 — ഘട്ടം 2 സവിശേഷത, ഇതുവരെ നടപ്പാക്കിയിട്ടില്ല`).
3. ലംഘനം പരിഹരിക്കുന്ന അതേ PR-ൽ ആ എൻട്രി നീക്കം ചെയ്യുക — സജീവമായ ഒരു ലംഘനത്തെ ഇനി ഒഴിവാക്കാത്ത കാലഹരണപ്പെട്ട എൻട്രി തന്നെ ഒരു തകരാറാണ് (നടപ്പാക്കിയശേഷം, അനാഥമായ അനുവദനീയ പട്ടികാ എൻട്രിയിൽ 6A.3 stale-enforcement ഗേറ്റ് പരാജയപ്പെടും).

ടെസ്റ്റുകൾ വേഗത്തിൽ പാസാക്കാൻ അനുവദനീയ പട്ടികാ എൻട്രികൾ ചേർക്കരുത്. വളർന്നുകൊണ്ടിരിക്കുന്ന
അനുവദനീയ പട്ടികയോടുകൂടിയ ഗ്രീൻ ഗേറ്റ് ഗുണനിലവാരത്തെക്കുറിച്ചുള്ള വ്യാജമായ ആത്മവിശ്വാസമാണ്.

### നിങ്ങളുടെ PR-ൽ ഒരു ഗേറ്റ് പരാജയപ്പെടുമ്പോൾ

1. **ഗേറ്റ് ഔട്ട്പുട്ട് ശ്രദ്ധാപൂർവം വായിക്കുക** — ഏത് ഫയലോ സിംബലോ നിയമം ലംഘിച്ചുവെന്ന് അത് കൃത്യമായി വ്യക്തമാക്കുന്നു.
2. **ലംഘനം പരിഹരിക്കുക** — ഭൂരിഭാഗം ഗേറ്റുകളും നിർണായകമായ ഫയൽസിസ്റ്റം പരിശോധനകളാണ്; കോഡ് ശരിയായ ഉടൻ അവ പാസാകും.
3. **ലംഘനം മുൻപേ നിലവിലുണ്ടായിരുന്നതാണെങ്കിൽ** (അതായത്, നിങ്ങൾ അത് അവതരിപ്പിച്ചതല്ലെങ്കിലും ഇപ്പോൾ ഗേറ്റ് അതിനെ ഉൾക്കൊള്ളുന്നു): ന്യായീകരണ കമന്റും ട്രാക്കിംഗ് ഇഷ്യൂവും സഹിതം അനുവദനീയ പട്ടികാ എൻട്രി ചേർക്കുക.
4. **ഗേറ്റ് ഒരു റാച്ചെറ്റാണെങ്കിൽ** (കവറേജ്, ESLint മുന്നറിയിപ്പുകൾ, ആവർത്തനം, സങ്കീർണ്ണത):
   നിങ്ങളുടെ മാറ്റം മെട്രിക് മോശമാക്കി. അടിസ്ഥാന പ്രശ്നം പരിഹരിക്കുക, അല്ലെങ്കിൽ മാറ്റം ഉദ്ദേശ്യപൂർവവും മെട്രിക്കിന്റെ നിലവാരത്തകർച്ച സ്വീകാര്യവുമാണെങ്കിൽ (അപൂർവമായി) `npm run quality:ratchet -- --update` പ്രവർത്തിപ്പിക്കുക — എന്നാൽ അതിന്റെ കാരണം PR വിവരണത്തിൽ രേഖപ്പെടുത്തുക.
5. **ഉപദേശാത്മക ഗേറ്റുകൾ** (`continue-on-error: true`) വിവരദായകമാണ് — അവ ലയനം തടയില്ലെങ്കിലും CI സംഗ്രഹത്തിൽ ദൃശ്യമാകും. എന്നിരുന്നാലും അവ പരിഹരിക്കുക.

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

## യുക്തിസഹമാക്കൽ ബാക്ക്ലോഗ് (ROI അവലോകനം — ഘട്ടം 9 തരംഗം 3)

ഈ ഇൻവെന്ററി 2026-06-17-ന് `ci.yml`-മായി പൊരുത്തപ്പെടുത്തി (മുൻ പതിപ്പിൽ
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` എന്നിവ വിട്ടുപോയിരുന്നു). പൊരുത്തപ്പെടുത്തിയ സെറ്റിന്റെ ROI അവലോകനം
താഴെപ്പറയുന്ന യുക്തിസഹമാക്കൽ സ്ഥാനാർഥികളെ കണ്ടെത്തി. **ലയിപ്പിക്കലുകൾ യാന്ത്രിക CI
മാറ്റങ്ങളാണ്; ഫ്ലിപ്പുകൾ/ഒഴിവാക്കലുകൾ ഓപ്പറേറ്റർക്കായി നീക്കിവച്ചിരിക്കുന്ന നയപരമായ തീരുമാനങ്ങളാണ്.** താഴെപ്പറയുന്നവയിൽ
ഒന്നും ഇതുവരെ പ്രയോഗിച്ചിട്ടില്ല.

**മുകളിൽ രേഖപ്പെടുത്താത്തവയും** (ഉപദേശാത്മകം, കുറഞ്ഞ സിഗ്നൽ): `docs-lint` ജോലി
(markdownlint + Vale, മുഴുവൻ ജോലിക്കും `continue-on-error`) കൂടാതെ സ്വതന്ത്ര സ്കാനർ വർക്ക്ഫ്ലോകളായ
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `quality-baseline.json`-ൽ
`semgrepFindings: 0` ഉണ്ട്, എന്നാൽ `ci.yml`-ലെ ഒരു ബ്ലോക്കിങ് റാച്ചറ്റുമായി അത് ബന്ധിപ്പിച്ചിട്ടില്ല — ഈ മെട്രിക്
നിലവിൽ അനാഥമാണ്.

### ലയിപ്പിക്കൽ / ഡ്യൂപ്ലിക്കേഷൻ നീക്കംചെയ്യൽ (യാന്ത്രികം, കുറഞ്ഞ അപകടസാധ്യത)

ഓരോ സ്ഥാനാർഥിയെയും 2026-06-17-ലെ തത്സമയ ഗേറ്റ് നിലയ്ക്കെതിരെ സാധൂകരിച്ചു (വിശ്വസിക്കുക, എന്നാൽ പരിശോധിക്കുക);
"വ്യക്തമായ" പല ലയിപ്പിക്കലുകളും മറഞ്ഞിരിക്കുന്ന സാങ്കേതിക കടം ഒളിപ്പിക്കുന്നതായി കണ്ടെത്തി, അവ **ശുദ്ധമായ പകരക്കാരല്ല**.

- **`check:docs-sync` രണ്ടുതവണ പ്രവർത്തിക്കുന്നു** — `lint` ജോലിയിൽ സ്വതന്ത്രമായും `check:docs-all` (`docs-sync-strict`)-ന്റെ ഉള്ളിലും husky pre-commit ഹുക്കിലും വീണ്ടും. ✅ **പൂർത്തിയായി** — സ്വതന്ത്ര `lint` ഇൻവൊക്കേഷൻ നീക്കംചെയ്തു.
- **CVE സ്കാനിങ്** — ❌ **ശുദ്ധമായി ലയിപ്പിക്കാനാകില്ല.** ഏതെങ്കിലും high/critical CVE കണ്ടെത്തിയാൽ `audit:deps` കർശനമായി പരാജയപ്പെടുന്നു; `check:vuln-ratchet` (osv) ബേസ്ലൈനുമായി താരതമ്യപ്പെടുത്തിയുള്ള ഒരു _പിന്നോട്ടുപോക്ക്_ ഉണ്ടായാൽ മാത്രമാണ് പരാജയപ്പെടുന്നത് (നിലവിൽ 1 MODERATE). അർത്ഥശാസ്ത്രം വ്യത്യസ്തമാണ് — `audit:deps` ഒഴിവാക്കിയാൽ സമ്പൂർണ്ണ high/critical ഗേറ്റ് നഷ്ടപ്പെടും. രണ്ടും നിലനിർത്തുക.
- **സൈക്കിൾ കണ്ടെത്തൽ** — ✅ **പൂർത്തിയായി** (#15159 G-01/G-02). ഇവിടെയുള്ള പഴയ വാചകം `check:cycles`-നെ "ഹരിതമായ, ക്യൂറേറ്റ് ചെയ്ത" ഗേറ്റ് എന്ന് വിളിക്കുകയും `check:circular-deps` (dpdm) 91 സൈക്കിളുകൾ റിപ്പോർട്ട് ചെയ്തതിനാൽ അത് ബ്ലോക്കിങ്ങായി നിലനിർത്തുന്നതിനെ ന്യായീകരിക്കുകയും ചെയ്തിരുന്നു. ആ ഹരിതനില ഒരു **വ്യാജ ഹരിതനില** ആയിരുന്നു: `check:cycles` 5 ഉപഡയറക്ടറികൾ (450 ഫയലുകൾ) സ്കാൻ ചെയ്തു, സ്റ്റാറ്റിക് `import|export … from` മാത്രമാണ് പൊരുത്തപ്പെടുത്തിയത്, കൂടാതെ എല്ലാ `@/`, `@omniroute/open-sse/` സ്പെസിഫയറുകളും ഒഴിവാക്കി; അതിനാൽ റിപ്പോയിൽ ആധിപത്യം പുലർത്തിയ dynamic-import + alias സൈക്കിളുകൾ അതിന് കാണാനായില്ല. പരിഹരിച്ചു: ഗേറ്റ് ഇപ്പോൾ `src` + `open-sse` (5023 ഫയലുകൾ) പരിശോധിക്കുന്നു, TypeScript AST-യിൽ നിന്ന് സ്പെസിഫയറുകൾ ശേഖരിക്കുന്നു (അതിനാൽ `import("…")` കണക്കാക്കപ്പെടും, എന്നാൽ type-position `typeof import("…")` കണക്കാക്കപ്പെടില്ല), കൂടാതെ tsconfig `paths` റിസോൾവ് ചെയ്യുന്നു. ഇത് 0 അല്ല, **14** സൈക്കിളുകൾ കണ്ടെത്തുന്നു. നിലവിലുള്ള 14 സൈക്കിളുകൾ ഒരു ഗേറ്റ് PR-ൽ പരിഹരിക്കാനാകാത്തതിനാൽ, `check:cycles` ഇപ്പോൾ ഒരു **റാച്ചറ്റ്** ആണ് (`--ratchet`, `quality-baseline.json`-ൽ പരിധി `metrics.cycles.value = 14`, `direction: down`) — ഏതൊരു _പിന്നോട്ടുപോക്കും_ ഇത് തടയുന്നു, എണ്ണം കുറയുക മാത്രമേ ചെയ്യാനാകൂ. CI `npm run check:cycles:ratchet` പ്രവർത്തിപ്പിക്കുന്നു. കുറച്ചുകൊണ്ടുവരൽ **A-01**-നൊപ്പം നടക്കും. വിശാലമായ രണ്ടാമത്തെ അഭിപ്രായമായി `check:circular-deps` (dpdm) ഉപദേശാത്മകമായി തുടരുന്നു.
- **സങ്കീർണ്ണത** — ✅ **പൂർത്തിയായി** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ഒരൊറ്റ ESLint പരിശോധന, ruleId അനുസരിച്ച് എണ്ണുന്നതിനാൽ cyclomatic+max-lines, cognitive ബേസ്ലൈനുകൾ സ്വതന്ത്രമായി തുടരുന്നു; പ്രാദേശിക `--update`-നായി വ്യക്തിഗത `check:complexity` / `check:cognitive-complexity` നിലനിർത്തിയിട്ടുണ്ട്.
- **`/api` ആന്റി-ഹാലൂസിനേഷൻ** — ✅ **പൂർത്തിയായി** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`-യുടെ ഒരൊറ്റ FS ഇൻവെന്ററി, openapi-routes + docs-symbols ഇപ്പോഴും സ്വതന്ത്രമായി റിപ്പോർട്ട് ചെയ്യുന്നു; പ്രാദേശിക റണ്ണുകൾക്കായി വ്യക്തിഗതവ നിലനിർത്തിയിട്ടുണ്ട്.
- **`check:node-runtime` 11 ജോലികളിൽ പ്രവർത്തിക്കുന്നു** — ⚠️ **കുറഞ്ഞ ROI.** ഓരോന്നും പ്രത്യേക റണ്ണറാണ്, പരിശോധന <1s ആണ്; വിലകുറഞ്ഞ ഓരോ-ജോലി സംരക്ഷണവും നഷ്ടപ്പെടുന്നതിന് പകരമായി മൊത്തം ലാഭം ~10s മാത്രം. മാറ്റത്തിന്റെ ബുദ്ധിമുട്ടിന് തക്ക മൂല്യമില്ല.
- **CI lint-ലെ `typecheck:noimplicit:core`** — ✅ **lint ജോലിയിൽ നിന്ന് നീക്കംചെയ്തു** (ഉപദേശാത്മകമായ `continue-on-error` ആയിരുന്നു); ബ്ലോക്കിങ് ടൈപ്പ് ഉപരിതലം `typecheck:core` + `check:type-coverage` ആണ്. പ്രാദേശിക സ്ക്രിപ്റ്റ് നിലനിർത്തി.

### ഫ്ലിപ്പ് / തീരുമാനം (ഓപ്പറേറ്റർ നയം)

- `check:openapi-security-tiers` (ഉപദേശാത്മകം) — ❌ **വൃത്തിയായി ഫ്ലിപ്പ് ചെയ്യാനാകില്ല.** ഇത് 0-ൽ എക്സിറ്റ് ചെയ്യുന്നുവെങ്കിലും `LOCAL_ONLY_API_PREFIXES`-ന്റെ കീഴിലുള്ള നിരവധി `traffic-inspector` റൂട്ടുകളിൽ `x-loopback-only: true` അനോട്ടേഷൻ ഇല്ലെന്ന് മുന്നറിയിപ്പ് നൽകുന്നു. ഇത് നിർബന്ധമാക്കുന്നതിന് ആദ്യം ആ അനോട്ടേഷനുകൾ `openapi.yaml`-ൽ ചേർക്കേണ്ടതുണ്ട്.
- `typecheck:noimplicit:core` (ഉപദേശാത്മകം) — ബ്ലോക്കിങ് `check:type-coverage` റാച്ചറ്റ് ഇതിനെ വലിയൊരളവിൽ ഉൾക്കൊള്ളുന്നു. ഒരു റാച്ചറ്റിലേക്ക് ഫ്ലിപ്പ് ചെയ്യുക, അല്ലെങ്കിൽ ആവർത്തനമായ രണ്ടാമത്തെ `tsc` പാസ് ഒഴിവാക്കുക.
- `test:vitest:ui` (ഇപ്പോൾ **ബ്ലോക്കിങ്**) — മുൻപേ നിലവിലുണ്ടായിരുന്ന പരാജയങ്ങൾ `vitest.config.ts`-ൽ `// #8618` ട്രാക്കിങ് കമന്റുകൾ ഉപയോഗിച്ച് വ്യക്തമായി ഒഴിവാക്കിയിട്ടുണ്ട്; പുതിയ പരാജയങ്ങൾ ജോലി പരാജയപ്പെടുത്തും.
- `check:secrets` (gitleaks, രേഖപ്പെടുത്തിയ 3 false-positive-ുകളിൽ ഫ്രീസ് ചെയ്ത ബ്ലോക്കിങ് റാച്ചറ്റ്) — 0-ൽ എത്താൻ ആ 3 എണ്ണം allowlist ചെയ്യുക, അല്ലെങ്കിൽ ഉപദേശാത്മകമായി തരംതാഴ്ത്തുക. GitHub-ന്റെ നേറ്റീവ് secret-scanning + `check:public-creds` എന്നിവയുമായി ഓവർലാപ്പ് ചെയ്യുന്നു.
- `check:pr-evidence` (ബ്ലോക്കിങ്, PR-body ഗദ്യം greps ചെയ്യുന്നു) — false-positive സാധ്യത ഉയർന്നതാണ്; ഒഴിവാക്കിയാൽ Hard Rule #18 നടപ്പാക്കൽ ദുർബലമാകും, അതിനാൽ ഇത് യഥാർത്ഥ നയപരമായ തീരുമാനമാണ്.
- `semgrep` (ഉപദേശാത്മക സ്വതന്ത്ര ഘടകം) — OWASP കുടുംബങ്ങളിൽ CodeQL-മായി ഓവർലാപ്പ് ചെയ്യുന്നു; അതിന്റെ ബേസ്ലൈൻ ഒരു റാച്ചറ്റുമായി ബന്ധിപ്പിക്കുക, അല്ലെങ്കിൽ ഒഴിവാക്കുക.

---

## അനുബന്ധ ഡോക്യുമെന്റേഷൻ

- സപ്ലൈ ചെയിൻ (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — കീ-സെറ്റ് പാരിറ്റി ഗേറ്റ്

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, ജോലി `i18n-ui-coverage`).
ഓരോ `src/i18n/messages/<locale>.json`-ലെയും ലീഫ് കീ സെറ്റിനെ `en.json`-മായി താരതമ്യം ചെയ്യുകയും,
കീ എപ്പോൾ ചേർത്തതാണെന്നത് പരിഗണിക്കാതെ, ഏതെങ്കിലും ലീഫ് ഇല്ലാതിരിക്കുകയോ അധികമായിരിക്കുകയോ ചെയ്താൽ
പരാജയപ്പെടുകയും ചെയ്യുന്നു. `__MISSING__:` പ്ലേസ്ഹോൾഡറുകൾ നിലവിലുള്ളതായി കണക്കാക്കപ്പെടുന്നു
(അവയുടെ ഉള്ളടക്കം റേഷ്യോ ഗേറ്റിന്റെ പരിധിയിലാണ്). ഡിഫ് അടിസ്ഥാനമാക്കിയുള്ള/ശതമാന അടിസ്ഥാനമാക്കിയുള്ള
രണ്ട് ഗേറ്റുകളുടെയും സമ്പൂർണ്ണ പൂരകമാണിത്: `check-ui-keys-coverage` ഓരോ locale-നും 80 % എന്ന
കുറഞ്ഞ പരിധി നിർബന്ധമാക്കുന്നു (~13,000 കീകളിൽ 43 എണ്ണം ഇല്ലെങ്കിലും 99.7 % എന്നാണ് കാണിക്കുക);
`check-new-key-coverage` ഒരു PR `en.json`-ലേക്ക് ചേർക്കുന്ന കീകൾ മാത്രം വിലയിരുത്തുന്നു. ഒരു locale
ബാച്ചിന്റെ branch സൃഷ്ടിക്കുന്ന ദിവസത്തെ `en.json`-ൽ നിന്നാണ് അത് ജനറേറ്റ് ചെയ്യുന്നത്; base പുതിയ
കീകൾ ചേർത്തുകൊണ്ടിരിക്കുമ്പോൾ, ദിവസങ്ങളോളം വിവർത്തനം തുടരുന്നു. ബാച്ച് PR സ്വയം പുതിയ കീകളൊന്നും
ചേർക്കാത്തതിനാൽ, batch 1 (#13044) ഒൻപത് locale-കളിൽ 43 കീകൾ കുറവായും batch 2 (#13660) എട്ട്
locale-കളിൽ 10 കീകൾ കുറവായും ലാൻഡ് ചെയ്തപ്പോൾ രണ്ട് സഹോദര ഗേറ്റുകളും നിശ്ശബ്ദമായിരുന്നു
(2026-09-15). പരാജയം പരിഹരിക്കാൻ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ഉപയോഗിക്കുക; ഒരു `extra`
ലീഫ് എന്നത് source-ൽ നിന്ന് അത് നീക്കം ചെയ്തുവെന്നാണ് അർത്ഥം — locale-ൽ നിന്ന് അത് ഇല്ലാതാക്കുക.
`--warn` പരാജയപ്പെടുത്താതെ റിപ്പോർട്ട് ചെയ്യുന്നു. `--catalog=cli` ഉപയോഗിച്ചാൽ ഇതേ താരതമ്യം
`bin/cli/locales`-ൽ നടത്തുന്നു (`npm run i18n:check-keys:cli`); രണ്ട് ഘട്ടങ്ങളും
`i18n-ui-coverage` ജോലിയിലാണ്.

#### `check-new-key-coverage` — പുതിയ കീയ്ക്കുള്ള i18n ഗേറ്റ്

`check-ui-value-drift`-ന്റെ സഹോദര ഗേറ്റ്. വിവർത്തനങ്ങൾ പുതുക്കാതെ വിട്ടിരിക്കെ ഒരു ഇംഗ്ലീഷ് മൂല്യം
**വീണ്ടും എഴുതിയാൽ** അത് ആ ഗേറ്റ് കണ്ടെത്തുന്നു; ഒരു ഇംഗ്ലീഷ് കീ **ചേർത്തിരിക്കെ** ചില locale-കൾക്ക്
അത് ലഭിക്കാതെ പോയാൽ ഈ ഗേറ്റ് കണ്ടെത്തുന്നു.

`check-ui-keys-coverage`-ന് ഈ വിഭാഗം കണ്ടെത്താനാവില്ല: അത് ഓരോ locale-നും ഒരു ശതമാനപരമായ കുറഞ്ഞ
പരിധി നിർബന്ധമാക്കുന്നു; ~13,000 ലീഫുകളിൽ പതിനൊന്ന് കീകൾ ഇല്ലെങ്കിലും coverage 99.9% ആയിരിക്കും.
ഓരോ ഭാഷയ്ക്കുമുള്ള ഒരു ശതമാനത്തിന് "ഈ ഫീച്ചർ വിവർത്തനം ചെയ്യാതെ പുറത്തിറങ്ങി" എന്ന് പ്രകടിപ്പിക്കാനാവില്ല
— ഒരു മുഴുവൻ ഫീച്ചറും ഒരു പുതിയ locale-ൽ ടെക്സ്റ്റൊന്നുമില്ലാതെ ലാൻഡ് ചെയ്യുകയും ആ സംഖ്യയിൽ യാതൊരു
മാറ്റവും ഉണ്ടാക്കാതിരിക്കുകയും ചെയ്യാം.

ഇത് രേഖപ്പെടുത്തുന്ന സംഭവം: Orchestration Canvas-ന്റെ Phase 3-ലെ പതിനൊന്ന് കീകൾ അന്ന് നിലവിലുണ്ടായിരുന്ന
42 locale-കളിലേക്കും വിവർത്തനം ചെയ്തു. മണിക്കൂറുകൾക്കുശേഷം EU-language batch (#13044) repo-യെ
51 locale-കളിലേക്ക് എത്തിച്ചു; പുതുതായി വന്ന ഒൻപത് locale-കൾക്ക് (`el`, `et`, `ga`, `hr`, `lt`,
`lv`, `mt`, `sl`, `sr`) അവ ഒരിക്കലും ലഭിച്ചില്ല. ഒരു കീ ഇല്ലെങ്കിൽ `deepMergeFallback` പകരം ഇംഗ്ലീഷ്
നൽകുന്നതിനാൽ, ശൂന്യമായ UI-യ്ക്ക് പകരം വിവർത്തനം ചെയ്യാത്ത UI ആയിരുന്നു പരാജയരീതി — യഥാർത്ഥമായതും
രൂപകൽപ്പനാപരമായി നിശ്ശബ്ദമായതും.

അതിന്റെ സഹോദര ഗേറ്റ് പോലെതന്നെ ഇതും **diff-aware** ആണ്; merge base-ലെ ഇംഗ്ലീഷിനെ working tree-യുമായി
താരതമ്യം ചെയ്യുന്നതിനാൽ, നേരത്തേ നിലവിലുണ്ടായിരുന്ന വിടവുകൾ അതേപടി നിലനിൽക്കുകയും ഗേറ്റ് പ്രവർത്തനക്ഷമമാക്കാൻ
migration ആവശ്യമില്ലാതിരിക്കുകയും ചെയ്യുന്നു.

**ഒരു `__MISSING__:<english>` മാർക്കർ ഇതിനെ തൃപ്തിപ്പെടുത്തുന്നില്ല (2026-09-17 മുതൽ).** മുമ്പ് ഇത്
രേഖപ്പെടുത്തിയിരുന്ന മാറ്റിവെക്കൽ മാർഗമായിരുന്നു — runtime ശരിയായ ഇംഗ്ലീഷിലേക്ക് fallback ചെയ്യുന്നു —
എന്നാൽ 2026-09-16-ലെ എട്ട് feature PR-കൾ 61 കീകൾ ചേർക്കുകയും വിവർത്തനം ചെയ്യുന്നതിനുപകരം എല്ലാ 65
locale-കളിലും മാർക്കർ പതിപ്പിക്കുകയും ചെയ്തു: ഈ ഗേറ്റ് അവയെല്ലാം അംഗീകരിച്ചു, PR-കളെ ഒന്നും തടഞ്ഞില്ല,
തുടർന്ന് തടസ്സപ്പെടുത്തുന്ന യഥാർത്ഥ-വിവർത്തന റേഷ്യോ ഗേറ്റ് release tip-ൽ എല്ലാവർക്കുമായി പരാജയപ്പെട്ടു
(pt-BR 3.2 % > 2.5 % + 0.5). ഇപ്പോൾ ഒരു മാർക്കർ ഇല്ലാത്ത വിവർത്തനമായി കണക്കാക്കപ്പെടുന്നു. പരാജയം
പരിഹരിക്കാൻ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`
ഉപയോഗിക്കുക; അല്ലെങ്കിൽ `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, detached-safe, `OMNIROUTE_TRANSLATION_*` env ഇല്ലാതെ
ആരംഭിക്കാൻ വിസമ്മതിക്കുന്നു) ഉപയോഗിച്ച് എല്ലാ locale-കളും സമാന്തരമായി പരിഹരിക്കുക. ഇംഗ്ലീഷിൽ തന്നെ
തുടരേണ്ട ഒരു കീ (നിശ്ചിത product/engine/flag പേര്) `scripts/i18n/untranslatable-keys.json`-ലാണ്
ഉൾപ്പെടുത്തേണ്ടത്; ഒരിക്കലും മാർക്കറിന് പിന്നിലല്ല. `vi` മാർക്കറുകൾ പൂർണ്ണമായും നിരോധിക്കുന്നു
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — മാറ്റിവെച്ച ടെസ്റ്റുകളുടെ ഗേറ്റ്

`vitest.config.ts`-ലെ `exclude` പട്ടികയിലുള്ള ഒരു ഫയൽ പ്രവർത്തിപ്പിക്കപ്പെടാത്ത ഒരു ടെസ്റ്റാണ്; tree
വായിക്കുന്നവർക്ക് അത് coverage പോലെ തോന്നുകയും ചെയ്യും. അറുപത്തിരണ്ട് ഫയലുകൾ
`// #8618 — pre-existing failure; remove this exclusion when fixed` എന്ന കമന്റിന് പിന്നിൽ
കുമിഞ്ഞുകൂടി. Issue #8618, 2026-08-11-ന് അടച്ചു; എന്നാൽ അത് ട്രാക്ക് ചെയ്തിരുന്ന പട്ടിക 45
എൻട്രികളിൽ നിന്ന് 62 ആയി വളർന്നു, പുതുതായി ചേർന്ന ഓരോ എൻട്രിയും അവസാനിച്ചുപോയ issue-ലേക്ക്
ചൂണ്ടിക്കാണിക്കുന്ന കമന്റ് ഏറ്റെടുത്തു. ഒടുവിൽ പട്ടികയിലെ ഓരോ ഫയലും പ്രത്യേകം അളന്നപ്പോൾ (#13204),
**62-ൽ 51 എണ്ണം source-ൽ യാതൊരു മാറ്റവുമില്ലാതെ നിലവിലെ tree-യ്ക്കെതിരെ വിജയിച്ചു**.

യഥാർത്ഥ ഫയലിലേക്ക് resolve ചെയ്യുന്ന ഓരോ exclusion-നും (a) ഒരു tracking issue വ്യക്തമാക്കണമെന്നും
(b) അതിന്റെ അളന്ന status സഹിതം `config/quality/vitest-exclusions.json`-ൽ ഉൾപ്പെടണമെന്നും ഗേറ്റ്
നിർബന്ധമാക്കുന്നു. അതിനാൽ പുതിയൊരു exclusion ചേർക്കുന്നത് 60-entry array-യിലെ മറ്റൊരു വരിയാകുന്നതിനുപകരം
ഒരു സമർപ്പിത ഫയലിലെ review ചെയ്യാവുന്ന diff ആകുന്നു. ഒഴിവാക്കിയ ടെസ്റ്റുകൾ ഇത് മനഃപൂർവം വീണ്ടും
പ്രവർത്തിപ്പിക്കുന്നില്ല — അതിന് ~10 മിനിറ്റ് ചെലവാകും, അത് ഒരു periodic job-ലാണ് ഉൾപ്പെടേണ്ടത്;
ഓരോന്നും അവസാനം അളന്ന സമയം inventory രേഖപ്പെടുത്തുന്നു.
