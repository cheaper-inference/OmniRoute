# Release-Green: candidate validation and evidence (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Sakin-Green yana lura da ƙayyadaddun alƙawari kuma yana ba da rahoton ingantaccen sakamakonsa. [Maganar Ƙofar Ƙofar Ƙirar](../architecture/QUALITY_GATES.md) tana bayyana bayanan martaba CI na yanzu, da ake buƙata da manufofin karɓa. [Manufar shigar da](../../config/quality/admission-policy.json) sigar ita ce kwangilar aiwatarwa don `Gate / CI` da `Gate / Quality`.

## CI da iyakokin masu kallo

`ci.yml` da `quality.yml` murfin yana jan buƙatun zuwa manyan rassan saki. Bayanan martaba da aka zaɓa yana ƙayyade ayyukan aiki. Cikakken CI kuma ya haɗa da hanyoyi waɗanda buƙatun ja na yau da kullun ba ya aiwatar da su. Sakamakon mai duba cikin sauri ba zai iya maye gurbin waɗancan ayyukan ba, kuma kammala aikin aikin ba zai iya maye gurbin karɓar sa ba.

Ginin samarwa na CI ne. Babu kwafin nasihar ginawa a cikin `quality.yml`. Rasa kayan tarihi, aikin da aka soke da ma'aunin da bai cika ba ba sa tabbatar da nasarar binciken da ake buƙata. Tabbatar da tushe na yanzu, shugaban da ɗan takarar da aka haɗa kafin karɓar sakamakon.

## Tabbatarwa na gida

Guda mai kallo a cikin itacen aiki mallakar bayan shirya abubuwan dogaronsa. Yi amfani da [bishiyar aiki da ka'idar albarkatu](WORKTREE_ISOLATION.md) kafin ingantaccen inganci.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Bayanan martaba mai sauri yana bangare. Cikakken bayanin martaba yana bincika buƙatun sa na ƙira kuma yana adana rasidun umarni; baya tabbatar da turawa ko musanyawa ga cak ɗin da aka karɓa. Rahoton ya bambanta gazawar aiwatarwa daga ma'aunin drift. Ratchets da ake buƙata suna ci gaba da toshewa bisa ga manufofin da aka zaɓa. Kar a tayar da tushe kawai don samun sakamako mai wucewa.

## Dare da sharewar hannu

Sakin dare da masu warware dacewa sun zaɓi reshen sakin canonical. Wannan zaɓin dole ne ya dace da reshe wanda ya jawo tafiyar aiki, kuma suites ɗin suna amfani da SHA maras canzawa na taron. Don aiwatar da aikin hannu, zaɓi sakin da aka yi niyya a cikin `release_branch` kuma aika akan wannan ref:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

An ƙi aika aika reshe kafin aiwatar da lambar da aka zaɓa. Mai masaukin babban suites yana duba `main` kuma tabbatar da cewa SHA ɗinsa har yanzu yana daidai da maƙasudin da aka warware kafin shigarwa. Idan babban motsi yayin ƙuduri, sake aiwatar da sharewar da bai cika ba akan sabon ƙaddamarwa. Kar a hada rasidin suite daga 'yan takara daban-daban.

## Rashin rashin daidaituwa da farfadowa

Yi amfani da abin da ya faru azaman fihirisar bincike, sannan duba ainihin gudu, ƙoƙari, gazawar mataki da kayan tarihi. Kwatanta daidai tushe da shaidar ɗan takara kafin a danganta gazawar ga mai ba da gudummawa. Kurakurai na ababen more rayuwa, lahani da aka gada, koma bayan ɗan takara da amincewar da ake jira suna buƙatar magunguna daban-daban.

Ƙwarewar `/green-prs`, `/sweep-reds`, `/validate-release-green` da `/babysit` suna tattara shaida kuma suna shirya gyare-gyare a ƙarƙashin ikon da aka rubuta. Kiyaye darajar mai ba da gudummawa, yi amfani da keɓaɓɓen rassan gyare-gyare, da kuma tabbatar da duk cak ɗin da ake buƙata kafin haɗuwa mai izini. Babu sakewa ta atomatik ko abin da zai maye gurbin ɗan takara mai wucewa.
