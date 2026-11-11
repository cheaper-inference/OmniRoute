# Release-Green: candidate validation and evidence (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Ntọhapụ-Green na-enyocha otu nkwa ma na-akọpụta nsonaazụ nkwado ya. [Ntụtụ aka nke Quality Gates](../architecture/QUALITY_GATES.md) na-akọwa profaịlụ CI dị ugbu a, ndenye ego achọrọ na amụma nnabata. [Amụma nnabata](../../config/quality/admission-policy.json) mbiputegharị bụ nkwekọrịta enwere ike ime maka `Gate / CI` na `Gate / Quality`.

## CI na ihe nleba anya

`ci.yml` na `quality.yml` mkpuchi na-adọta arịrịọ n'ime isi wee wepụta alaka. Profaịlụ ahọpụtara na-ekpebi ọrụ ndị etinyere. CI zuru ezu tinyekwara ụzọ nke arịrịọ ịdọrọ nkịtị anaghị eme. Nsonaazụ onye nleba anya ngwa ngwa enweghị ike dochie ọrụ ndị ahụ, na ihe mkpuchi na-arụ ọrụ emechara enweghị ike dochie nnata ya.

Nrụpụta mmepụta bụ nke CI. Enweghị iwu ụlọ ndụmọdụ oyiri na `quality.yml`. Ihe ndị na-efu efu, ọrụ akagbuola na nha ezughị ezu anaghị ewepụta nlele achọrọ na-aga nke ọma. Kwado isi ugbu a, isi na onye ndoro-ndoro ochichi tupu ịnakwere nsonaazụ ya.

## Nkwado mpaghara

Gbaa onye na-ekiri ihe n'osisi ọrụ nwere mgbe ọ kwadochara ndabere ya. Jiri [usoro ọrụ na akụrụngwa](WORKTREE_ISOLATION.md) tupu akwado ya nke ukwuu.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Profaịlụ ngwa ngwa bụ akụkụ. Profaịlụ zuru ezu na-enyocha ihe ọ chọrọ ma chekwaa nnata iwu; ọ naghị akwado nnabata ma ọ bụ dochie anya ndenye ego kwadoro. Akụkọ ahụ na-egosi ọdịiche ọdịda mkpochapụ na mkpagharị metric. Ratchets achọrọ ka na-egbochi dịka amụma ahọpụtara siri dị. Ewelitela usoro mmalite naanị iji nweta nsonaazụ gafere.

## N'abalị na akwụkwọ ntuziaka

Ntọhapụ nke abalị na ndị na-ekpebi ndakọrịta na-ahọrọ ngalaba ntọhapụ nke akwụkwọ nsọ. Nhọrọ ahụ ga-adabarịrị alaka ụlọ ọrụ kpalitere usoro a na-arụ ọrụ, ụlọ ọrụ ahụ na-eji ihe omume SHA na-enweghị mgbanwe. Maka ogbugbu nke aka, họrọ ntọhapụ e bu n'obi na `release_branch` wee ziga n'otu ntugharị ahụ:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Ajuju izipu alaka ụlọ ọrụ tupu emee koodu ahọpụtara. Ndị isi ụlọ ahịa akwadoro na-elele `main` wee chọpụta na SHA ya ka dabara na ebumnuche edoziziri tupu echichi. Ọ bụrụ na isi na-eme n'oge mkpebi, megharịa ihicha ezughị ezu na nkwa ọhụrụ ahụ. Ejikọtala akwụkwọ nnata ụlọ akwụkwọ sitere n'aka ndị na-azọ ọkwa dị iche iche.

## Usoro ọdịda na mgbake

Jiri ihe merenụ dị ka ihe nrịbama nyocha, wee nyochaa ọsọ ọsọ, nwaa, nzọụkwụ na-ada ada na artifact. Tulee ntọala nhata na ihe akaebe onye ndoro-ndoro anya tupu ịkọwa ọdịda n'aka onye nkwado. Njehie akụrụngwa, ntụpọ ketara eketa, nkwụghachi azụ nke ndị ndoro-ndoro na nkwado na-echere chọrọ ọgwụgwọ dị iche iche.

The `/green-prs`, `/sweep-reds`, `/validate-release-green` na `/babysit` nkà na-anakọta ihe àmà na-akwadebe ndozi n'okpuru ha akwụkwọ ikike. Debe kredit onye nkwado, jiri ngalaba nrụzi dịpụrụ adịpụ, wee nyochaa ndenye ego niile achọrọ tupu njikọta ikike. Enweghị nrụzigharị akpaka ma ọ bụ ihe mmechi merenụ nọchiri anya onye ndoro-ndoro ochichi na-agafe ugbu a.
