# Merge Queue & Manual Merge-Train Runbook (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Nusileidimas ant išleidimo šakos

Visa eilė reguliuoja nusileidimus į `release/vX.Y.Z`. Perskaitykite aukščiausio lygio `mode` `config/merge-queue/config.json` numatytojoje šakoje prieš nusileisdami PR. Žr. [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** vykdo patvirtinimą ir palieka nukreipimą į rankinį sujungimą. Užtepkite `omni-queue` ant patvirtinto PR jo galutinėje galvutėje. Patikrinkite tinkamumą naudodami `npm run queue -- why <PR>`. Palaukite nuosprendžio už tą galvą `npm run queue -- history --base <branch>`. Tęskite `would-land`. `culprit-found` arba `would-dequeue` palaikykite sujungimą ir pašalinkite priežastį.
- **Šešėlių išimtys.** Traukinys su žaliu pilnu CI prieš dabartinį bazinį galiuką gali važiuoti be atskiro eilės verdikto. Ta pati išimtis taikoma, kai PR galvutėje jau yra dabartinis pagrindo antgalis.
- **`live`** naudoja `omni-queue` etiketę, kad suaktyvintų nusileidimą. Vien tik eilė patenka į PR. Palikite sujungimo komandas ir nukreipkite stūmimus į eilę.

Kiekvienam iškrovimui reikalingas savininko leidimas ir atitinkami privalomi patikrinimai. Taikyti `omni-queue` tik po to, kai savininkas leidžia nusileisti. Eilėje esantiems PRs liečiantiems apsaugotus kelius, taip pat reikalingas savininko `protected-approved` sprendimas dėl to PR.

Taisyklių rinkinys „Reikalauti žalių vartų aktyviam išleidimui“ reikalauja žalių `Gate / CI` ir `Gate / Quality` ant galvos. Niekada nenaudokite `--admin` kad apeitumėte raudonus vartus. Atleidžiami užšalimo blokai susilieja į užšaldytą šaką. Žr. [21 griežtą taisyklę](HARD_RULES_DETAIL.md). Niekada nežymėkite, nesujunkite ir nespauskite ištraukimo užklausos, kad veikia kita sesija. Žr. [22 griežtą taisyklę](HARD_RULES_DETAIL.md).

## Traukinio traukimo prašymas

1. Pradėkite traukinio atšaką nuo dabartinio atleidimo pagrindo galo. Integruokite tikslius patvirtintus narių vadovus naudodami sujungimo įsipareigojimus. Išsaugokite jų įsipareigojimų istoriją, vengdami skvošo ir pažeminimo.
2. Atidarykite vieną traukinio atšakos traukimo užklausą. Patvirtinkite tą PR naudodami visą CI dabartiniame pagrindiniame antgalyje. Prieš nusileisdami dar kartą patikrinkite pagrindo antgalį ir patvirtintas elementų galvutes. Atnaujinkite traukinį ir jo CI kai pasikeičia patvirtintas kandidatas.
3. Nustatyti traukinį PR su sujungimo įsipareigojimu pagal taikomą eilės režimą. Tiesioginiame režime eilės `merge-ff` nusileidimo metodas išsaugo sujungimo įsipareigojimus. Pradinės narių galvutės tampa pasiekiamos iš išleidimo šakos. GitHub pažymi narį PRs kaip sujungtą, o įsipareigojimai išlaiko savo autorius.

Viešas pavyzdys yra [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Jis sujungė 18 narių PRs ir susijungė 2026-11-24.

Sinchronizavimas iš `main` į kitą leidimo šaką taip pat vyksta per sujungimo įsipareigojimą. Norint vėliau sinchronizuoti, būtina išsaugoti `main` kilmę. Žr. [Darbo medžio izoliacija](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Vietinis sujungimo-traukinio tikrintuvas

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validatorius paima pagrindą ir PR galvutes ir sujungia jas į vienkartinį darbo medį. Jis vieną kartą paleidžia savo pariteto rinkinį gautame medyje. Nesėkmingas galvos gavimo arba sujungimo konfliktas išstumia tą PR, o scenarijus tęsiamas su likusiu PRs.

- **`--plan`** atspausdina pasirinkto režimo žingsnius ir išeina nesukūrę darbo medžio arba nesusisiekę su nuotolinio valdymo pultu. Sujunkite jį su `--fast`, kad patikrintumėte greitąjį planą.
- **`--fast`** paleidžia bendrus statinius vartus, pasirinktus pakeistus `node:test` failus, esančius `tests/unit/` ir `npm run test:vitest`. Kai naudojate greitąjį režimą, bent kartą per dieną atlikite visą sukaupto patarimo vietinį patvirtinimą.
- **Pilnas režimas** prideda tik visiškai statinius vartus ir paleidžia `npm run test:unit` ir `npm run test:vitest`.

Sugedę statiniai vartai pakartotinai paleidžiami ant nepaliesto pagrindo, jei yra bazinis zondas. Scenarijus praneša apie paveldėtas klaidas ir tęsiasi, kai bazėje taip pat atsiranda kiekviena atpažinto pažeidimo eilutė, o bendras skaičius nepadidėjo.

| Išeiti | Reikšmė                                                                                                                                               |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`    | Išspausdino planą arba užbaigė komplektą. Rinkinio santraukoje pateikiami visi paveldėti statiniai gedimai ir išmestas PRs.                           |
| `1`    | Netinkami argumentai, nėra „Git“ patikros, nepavyko išankstinis patikrinimas arba PR neįtraukta.                                                      |
| `2`    | Rinkinio patikrinimas nepavyko ir nebuvo laikomas paveldėtu. Operatorius gali padalinti paketą į pusę, išstumti pažeidžiantį PR ir paleisti iš naujo. |

Vietinis leidimas suteikia diagnostikos įrodymus tik savininko dokumentacijai. Kiekvienam nusileidimui vis tiek reikalingas savininko leidimas, reikiamos patikros ir šešėlinės eilės sprendimas, kai taikoma.

## Pakopų nustatymas

- **Pagal PR.** CI ir kokybės pasirinkimas tikrina pagal pakeistus kelius. Kodas PRs vykdo greitus kokybės vartus ir paveikiamus bandymus su atskiru vienetu ir Vitest užduotimis CI.
- **Už kandidatą į eilę.** CI ir Quality paleidžia visą profilį sudarytam kandidatui jo eilėje nuorod.
- **Pagal išleidimo patarimą.** „Release-Green“ paleidžia greitus tvirtus vartus, kai stūmimai atitinka jo kelio filtrus. Trys suplanuoti paleidimai per dieną naudoja visą išleidimo šakos nuvalymą.
- **Pagal leidimą.** Visą CI matricą sudaro E2E skeveldros, paketo patvirtinimas, tarball įkrovos dūmai ir aprėpties patikros. Žr. [išleidimo kontrolinį sąrašą](RELEASE_CHECKLIST.md).

## Būtinos `merge-train.sh` atsiskaitymo sąlygos

Išankstinis patikrinimas vyksta prieš sukuriant darbo medžius. Įdiekite priklausomybes su `npm ci`. Patvirtinkite, kad `node_modules/.bin/tsc` yra vykdomas ir kad `node_modules/node_modules` nėra. Patikrinkite, ar `node_modules/.bin/bun --version` pavyko.

Jei Bun postinstall buvo praleistas, paleiskite `(cd node_modules/bun && node install.js)`. Teikėjo nuoseklumo ir žinomų simbolių patikros naudoja Bun. Valdymo priemonė paleidžia `npm run check:cycles:ratchet` kaip blokavimo vartus. Atskira `npm run check:cycles` komanda yra patariamoji.

## Istorija

2026-11-19 sujungimo eilė buvo pašalinta.
