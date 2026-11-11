# Release-Green: candidate validation and evidence (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

റിലീസ്-ഗ്രീൻ ഒരു നിർദ്ദിഷ്ട പ്രതിബദ്ധത നിരീക്ഷിക്കുകയും അതിൻ്റെ മൂല്യനിർണ്ണയ ഫലങ്ങൾ റിപ്പോർട്ട് ചെയ്യുകയും ചെയ്യുന്നു. നിലവിലെ CI പ്രൊഫൈലുകൾ, ആവശ്യമായ പരിശോധനകൾ, സ്വീകാര്യത നയം എന്നിവ [ക്വാളിറ്റി ഗേറ്റ്സ് റഫറൻസ്](../architecture/QUALITY_GATES.md) നിർവചിക്കുന്നു. `config/quality/admission-policy.json` യിലെ പതിപ്പ് പ്രവേശന നയം `Gate / CI`, `Gate / Quality` എന്നിവയ്ക്കായുള്ള എക്സിക്യൂട്ടബിൾ കരാറാണ്.

## CI, നിരീക്ഷക വ്യാപ്തി

`ci.yml`, `quality.yml` കവർ റിക്വസ്റ്റുകൾ പ്രധാന, റിലീസ് ബ്രാഞ്ചുകളിലേക്ക് വലിച്ചിടുക. തിരഞ്ഞെടുത്ത പ്രൊഫൈൽ ഏതൊക്കെ ജോലികൾക്ക് ബാധകമാണ് എന്ന് നിർണ്ണയിക്കുന്നു. ഒരു സാധാരണ പുൾ അഭ്യർത്ഥന നടപ്പിലാക്കാത്ത പാതകളും ഫുൾ CI ഉൾപ്പെടുന്നു. ഒരു ദ്രുത നിരീക്ഷക ഫലത്തിന് ആ ജോലികൾ മാറ്റിസ്ഥാപിക്കാൻ കഴിയില്ല, കൂടാതെ പൂർത്തിയാക്കിയ വർക്ക്ഫ്ലോ റാപ്പറിന് അതിൻ്റെ രസീതുകൾ മാറ്റിസ്ഥാപിക്കാൻ കഴിയില്ല.

പ്രൊഡക്ഷൻ ബിൽഡ് CI യുടേതാണ്. `quality.yml` യിൽ ഡ്യൂപ്ലിക്കേറ്റ് അഡ്വൈസറി ബിൽഡ് ഇല്ല. നഷ്ടമായ പുരാവസ്തുക്കൾ, റദ്ദാക്കിയ ജോലികൾ, അപൂർണ്ണമായ അളവുകൾ എന്നിവ വിജയകരമായ ആവശ്യമായ പരിശോധന സ്ഥാപിക്കുന്നില്ല. ഫലങ്ങൾ അംഗീകരിക്കുന്നതിന് മുമ്പ് നിലവിലെ അടിസ്ഥാനം, തല, സംയോജിത കാൻഡിഡേറ്റ് എന്നിവ സ്ഥിരീകരിക്കുക.

## പ്രാദേശിക മൂല്യനിർണ്ണയം

അതിൻ്റെ ഡിപൻഡൻസികൾ തയ്യാറാക്കിയ ശേഷം ഉടമസ്ഥതയിലുള്ള ഒരു വർക്ക്ട്രീയിൽ നിരീക്ഷകനെ പ്രവർത്തിപ്പിക്കുക. കനത്ത മൂല്യനിർണ്ണയത്തിന് മുമ്പ് `docs/ops/WORKTREE_ISOLATION.md` യിലെ വർക്ക്ട്രീയും റിസോഴ്സ് പ്രോട്ടോക്കോളും പിന്തുടരുക.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

ദ്രുത പ്രൊഫൈൽ ഭാഗികമാണ്. പൂർണ്ണ പ്രൊഫൈൽ അതിൻ്റെ മാതൃകാപരമായ ആവശ്യകതകൾ പരിശോധിക്കുകയും കമാൻഡ് രസീതുകൾ സംരക്ഷിക്കുകയും ചെയ്യുന്നു; ഇത് വിന്യാസം സാക്ഷ്യപ്പെടുത്തുകയോ ബാധകമായ ഹോസ്റ്റ് ചെക്കുകൾക്ക് പകരമോ നൽകുന്നില്ല. മെട്രിക് ഡ്രിഫ്റ്റിൽ നിന്ന് എക്സിക്യൂഷൻ പരാജയത്തെ റിപ്പോർട്ട് വേർതിരിക്കുന്നു. തിരഞ്ഞെടുത്ത നയം അനുസരിച്ച് ആവശ്യമായ റാറ്റ്ചെറ്റുകൾ തടയുന്നത് തുടരും. പാസിംഗ് റിസൾട്ട് ലഭിക്കാൻ വേണ്ടി മാത്രം അടിസ്ഥാന രേഖ ഉയർത്തരുത്.

## രാത്രിയിലും മാനുവൽ സ്വീപ്പുകളും

രാത്രികാല റിലീസും കോംപാറ്റിബിലിറ്റി റിസോൾവറുകളും ഒരു കാനോനിക്കൽ റിലീസ് ബ്രാഞ്ച് തിരഞ്ഞെടുക്കുന്നു. ആ തിരഞ്ഞെടുപ്പ് വർക്ക്ഫ്ലോ പ്രവർത്തനക്ഷമമാക്കിയ ശാഖയുമായി പൊരുത്തപ്പെടണം, കൂടാതെ സ്യൂട്ടുകൾ ഇവൻ്റിൻ്റെ മാറ്റമില്ലാത്ത SHA ഉപയോഗിക്കുന്നു. മാനുവൽ എക്സിക്യൂഷനായി, `release_branch` യിൽ ഉദ്ദേശിച്ച റിലീസ് തിരഞ്ഞെടുത്ത് അതേ റെഫറിൽ അയയ്ക്കുക:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

തിരഞ്ഞെടുത്ത കോഡ് നടപ്പിലാക്കുന്നതിന് മുമ്പ് ക്രോസ്-ബ്രാഞ്ച് ഡിസ്പാച്ച് നിരസിക്കപ്പെട്ടു. ഹോസ്റ്റ് ചെയ്ത പ്രധാന സ്യൂട്ടുകൾ `main` ചെക്ക്ഔട്ട് ചെയ്ത് അതിൻ്റെ SHA ഇൻസ്റ്റാളുചെയ്യുന്നതിന് മുമ്പ് പരിഹരിച്ച ടാർഗെറ്റുമായി ഇപ്പോഴും പൊരുത്തപ്പെടുന്നുണ്ടോയെന്ന് പരിശോധിക്കുക. റെസലൂഷൻ സമയത്ത് പ്രധാന നീക്കങ്ങൾ ഉണ്ടെങ്കിൽ, പുതിയ കമ്മിറ്റിൽ അപൂർണ്ണമായ സ്വീപ്പ് വീണ്ടും പ്രവർത്തിപ്പിക്കുക. വ്യത്യസ്ത സ്ഥാനാർത്ഥികളിൽ നിന്നുള്ള സ്യൂട്ട് രസീതുകൾ സംയോജിപ്പിക്കരുത്.

## പരാജയ ട്രയേജും വീണ്ടെടുക്കലും

സംഭവം ഒരു ഡയഗ്നോസ്റ്റിക് ഇൻഡക്സായി ഉപയോഗിക്കുക, തുടർന്ന് കൃത്യമായ ഓട്ടം, ശ്രമം, പരാജയപ്പെട്ട ഘട്ടം, ആർട്ടിഫാക്റ്റ് എന്നിവ പരിശോധിക്കുക. ഒരു സംഭാവകനെ പരാജയപ്പെടുത്തുന്നതിന് മുമ്പ് തത്തുല്യമായ അടിസ്ഥാനവും സ്ഥാനാർത്ഥി തെളിവുകളും താരതമ്യം ചെയ്യുക. ഇൻഫ്രാസ്ട്രക്ചർ പിശകുകൾ, പാരമ്പര്യ വൈകല്യങ്ങൾ, കാൻഡിഡേറ്റ് റിഗ്രഷനുകൾ, തീർച്ചപ്പെടുത്താത്ത അംഗീകാരങ്ങൾ എന്നിവയ്ക്ക് വ്യത്യസ്ത പരിഹാരങ്ങൾ ആവശ്യമാണ്.

`/green-prs`, `/sweep-reds`, `/validate-release-green`, `/babysit` കഴിവുകൾ തെളിവുകൾ ശേഖരിക്കുകയും അവയുടെ ഡോക്യുമെൻ്റഡ് പരിധിയിൽ പരിഹാരങ്ങൾ തയ്യാറാക്കുകയും ചെയ്യുന്നു. കോൺട്രിബ്യൂട്ടർ ക്രെഡിറ്റ് സൂക്ഷിക്കുക, ഒറ്റപ്പെട്ട റിപ്പയർ ബ്രാഞ്ചുകൾ ഉപയോഗിക്കുക, അംഗീകൃത ലയനത്തിന് മുമ്പ് ആവശ്യമായ എല്ലാ പരിശോധനകളും പരിശോധിക്കുക. പാസായ നിലവിലെ കാൻഡിഡേറ്റിന് സ്വയമേവയുള്ള റീബേസ്ലൈൻ അല്ലെങ്കിൽ സംഭവം ക്ലോഷർ ബദലുകളൊന്നുമില്ല.
