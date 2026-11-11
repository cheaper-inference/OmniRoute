# Release-Green: candidate validation and evidence (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Ang Release-Green ay nagmamasid sa isang partikular na commit at nag-uulat ng mga resulta ng pagpapatunay nito. Tinutukoy ng [sanggunian ng Quality Gates](../architecture/QUALITY_GATES.md) ang kasalukuyang mga profile CI, mga kinakailangang pagsusuri at patakaran sa pagtanggap. Ang bersyon na patakaran sa admission sa `config/quality/admission-policy.json` ay ang maipapatupad na kontrata para sa `Gate / CI` at `Gate / Quality`.

## CI at saklaw ng tagamasid

`ci.yml` at `quality.yml` ay sumasaklaw sa mga kahilingan sa paghila sa mga pangunahing branch at release. Tinutukoy ng napiling profile kung aling mga trabaho ang nalalapat. Kasama rin sa buong CI ang mga lane na hindi isinasagawa ng isang ordinaryong kahilingan sa paghila. Hindi mapapalitan ng mabilis na resulta ng tagamasid ang mga trabahong iyon, at hindi mapapalitan ng nakumpletong workflow wrapper ang mga resibo nito.

Ang production build ay nabibilang sa CI. Walang duplicate na advisory build sa `quality.yml`. Ang mga nawawalang artifact, nakanselang trabaho at hindi kumpletong mga sukat ay hindi nagtatag ng isang matagumpay na kinakailangang pagsusuri. Kumpirmahin ang kasalukuyang base, pinuno at pinagsamang kandidato bago tanggapin ang mga resulta.

## Lokal na pagpapatunay

Patakbuhin ang observer sa isang pag-aaring worktree pagkatapos ihanda ang mga dependency nito. Sundin ang worktree at resource protocol sa `docs/ops/WORKTREE_ISOLATION.md` bago ang mabigat na pagpapatunay.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Ang mabilisang profile ay bahagyang. Sinusuri ng buong profile ang mga modelong kinakailangan nito at pinapanatili ang mga resibo ng command; hindi nito pinapatunayan ang pag-deploy o kahalili para sa mga naaangkop na naka-host na mga tseke. Tinutukoy ng ulat ang kabiguan sa pagpapatupad mula sa metric drift. Ang mga kinakailangang ratchet ay nananatiling nakaharang ayon sa napiling patakaran. Huwag magtaas ng baseline para lamang makakuha ng pumasa na resulta.

## Gabi-gabi at manu-manong sweep

Ang gabi-gabing release at compatibility solver ay pumipili ng canonical release branch. Ang pagpipiliang iyon ay dapat tumugma sa sangay na nag-trigger sa daloy ng trabaho, at ginagamit ng mga suite ang hindi nababagong SHA ng kaganapan. Para sa manu-manong pagpapatupad, piliin ang nilalayong release sa `release_branch` at ipadala sa parehong ref:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Tinanggihan ang cross-branch dispatch bago isagawa ang napiling code. Na-host ang mga pangunahing suite na nag-checkout `main` at i-verify na ang SHA nito ay tumutugma pa rin sa nalutas na target bago i-install. Kung pangunahing gumagalaw sa panahon ng resolution, muling patakbuhin ang hindi kumpletong sweep sa bagong commit. Huwag pagsamahin ang mga suite na resibo mula sa iba't ibang kandidato.

## Triage at pagbawi ng pagkabigo

Gamitin ang insidente bilang diagnostic index, pagkatapos ay siyasatin ang eksaktong pagtakbo, pagtatangka, bagsak na hakbang at artifact. Ihambing ang katumbas na base at ebidensya ng kandidato bago iugnay ang isang pagkabigo sa isang nag-ambag. Ang mga pagkakamali sa imprastraktura, minanang mga depekto, regression ng kandidato at nakabinbing pag-apruba ay nangangailangan ng iba't ibang mga remedyo.

Ang mga kasanayan `/green-prs`, `/sweep-reds`, `/validate-release-green` at `/babysit` ay nangongolekta ng ebidensya at naghahanda ng mga pag-aayos sa ilalim ng kanilang nakadokumentong saklaw. Panatilihin ang credit ng contributor, gumamit ng mga nakahiwalay na sangay ng pag-aayos, at i-verify ang lahat ng kinakailangang pagsusuri bago ang isang awtorisadong pagsasama. Walang awtomatikong rebaseline o pagsasara ng insidente na kapalit para sa isang pumasa na kasalukuyang kandidato.
