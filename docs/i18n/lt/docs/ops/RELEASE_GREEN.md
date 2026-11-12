# Release-Green: candidate validation and evidence (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green stebi konkretų įsipareigojimą ir praneša apie jo patvirtinimo rezultatus. [Kokybės vartų nuoroda](../architecture/QUALITY_GATES.md) apibrėžia dabartinius CI profilius, būtinus patikrinimus ir priėmimo politiką. Versionuota priėmimo politika `config/quality/admission-policy.json` yra vykdoma `Gate / CI` ir `Gate / Quality` sutartis.

## CI ir stebėtojo sritis

`ci.yml` ir `quality.yml` dangtelis patraukia užklausas į pagrindines ir išleidžia šakas. Pasirinktas profilis nustato, kurie darbai taikomi. Visas CI taip pat apima juostas, kurių įprasta traukimo užklausa nevykdo. Greitas stebėjimo rezultatas negali pakeisti tų užduočių, o užbaigtas darbo eigos paketas negali pakeisti jo kvitų.

Gamybos konstrukcija priklauso CI. `quality.yml` nėra pasikartojančių patariamųjų versijų. Trūksta artefaktų, atšauktas darbas ir nebaigti matavimai nereiškia sėkmingo reikalingo patikrinimo. Prieš priimdami rezultatus, patvirtinkite esamą bazę, galvą ir bendrą kandidatą.

## Vietinis patvirtinimas

Paruošę jo priklausomybes, paleiskite stebėtoją jam priklausančiame darbo medyje. Prieš intensyvų patvirtinimą vadovaukitės `docs/ops/WORKTREE_ISOLATION.md` darbo medžio ir išteklių protokolu.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Greitasis profilis yra dalinis. Visas profilis patikrina sumodeliuotus reikalavimus ir išsaugo komandų kvitus; jis nepatvirtina dislokavimo ir nepakeičia taikomų priglobtų patikrinimų. Ataskaitoje vykdymo gedimas atskiriamas nuo metrinio poslinkio. Reikalingi reketai lieka blokuoti pagal pasirinktą politiką. Nekelkite bazinės linijos vien tam, kad gautumėte teigiamą rezultatą.

## Naktinis ir rankinis šlavimas

Naktinis leidimas ir suderinamumo nustatymo priemonės pasirenka kanoninio išleidimo šaką. Šis pasirinkimas turi atitikti šaką, kuri suaktyvino darbo eigą, o rinkiniai naudoja nekintamą įvykio SHA. Jei norite vykdyti rankiniu būdu, `release_branch` pasirinkite numatytą leidimą ir išsiųskite tą pačią nuorodą:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Kryžminis išsiuntimas atmetamas prieš vykdant pasirinktą kodą. Priglobti pagrindiniai komplektai patikrina `main` ir prieš diegdami patikrina, ar jo SHA vis dar atitinka išspręstą tikslą. Jei pagrindiniai judesiai sprendžiant, pakartotinai paleiskite nebaigtą nušlavimą naujam įsipareigojimui. Nederinkite skirtingų kandidatų rinkinio kvitų.

## Nesėkmės skirstymas ir atkūrimas

Naudokite incidentą kaip diagnostikos indeksą, tada patikrinkite tikslų vykdymą, bandymą, nesėkmingą veiksmą ir artefaktą. Prieš priskirdami gedimą bendraautoriui, palyginkite lygiaverčius pagrindinius ir galimus įrodymus. Dėl infrastruktūros klaidų, paveldėtų defektų, kandidatų regresijų ir laukiančių patvirtinimų reikia įvairių priemonių.

`/green-prs`, `/sweep-reds`, `/validate-release-green` ir `/babysit` įgūdžiai renka įrodymus ir rengia pataisymus pagal jų dokumentuotą apimtį. Išsaugokite bendraautorio kreditą, naudokite atskiras remonto šakas ir patikrinkite visas reikalingas patikras prieš įgaliotą sujungimą. Joks automatinis pradinės linijos keitimas ar incidentų uždarymas nepakeičia praeinančio dabartinio kandidato.
