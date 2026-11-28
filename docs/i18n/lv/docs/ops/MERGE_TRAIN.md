# Merge Queue & Manual Merge-Train Runbook (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Piezemēšanās uz atbrīvošanas zara

Universālā rinda regulē nolaišanos `release/vX.Y.Z`. Pirms PR nolaišanas izlasiet augstākā līmeņa `mode` `config/merge-queue/config.json` noklusējuma zarā. Skatiet sadaļu [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** palaiž validāciju un atstāj nolaišanos uz manuālu sapludināšanu. Uzklājiet `omni-queue` apstiprinātajam PR tā galīgajā galā. Pārbaudiet atbilstību ar `npm run queue -- why <PR>`. Gaidiet spriedumu tai galvai `npm run queue -- history --base <branch>`. Turpiniet ar `would-land`. Uz `culprit-found` vai `would-dequeue` turiet sapludināšanu un novērsiet cēloni.
- **Ēnu izņēmumi.** Vilciens ar zaļu pilnu CI pret pašreizējo bāzes galu var braukt bez atsevišķa rindas sprieduma. Tas pats izņēmums attiecas uz gadījumiem, kad PR galviņā jau ir pašreizējais bāzes gals.
- **`live`** izmanto apzīmējumu `omni-queue`, lai aktivizētu piezemēšanos. Tikai rinda noved pie PR. Atstājiet apvienošanas komandas un virziet nosūtīšanu uz rindu.

Katrai izkraušanai ir nepieciešama īpašnieka atļauja un attiecīgās nepieciešamās pārbaudes. Uzklājiet `omni-queue` tikai pēc tam, kad īpašnieks ir atļāvis nosēšanos. Rindā ievietotam PRs kas pieskaras aizsargātiem ceļiem, arī ir nepieciešams īpašnieka `protected-approved` lēmums par šo PR.

Noteikumu kopai “Pieprasīt zaļus vārtus aktīvajā izlaišanā” ir nepieciešams zaļš `Gate / CI` un `Gate / Quality` uz galvas. Nekad neizmantojiet `--admin` lai apietu sarkanos vārtus. Atbrīvojamie saldēšanas bloki saplūst ar sasalušu zaru. Skatīt [21. stingro noteikumu](HARD_RULES_DETAIL.md). Nekad neiezīmējiet, neapvienojiet vai nespiediet uz vilkšanas pieprasījumu, ka cita sesija darbojas. Skatīt [22. stingro noteikumu](HARD_RULES_DETAIL.md).

## Vilciena vilkšanas pieprasījums

1. Sāciet vilciena atzaru pašreizējā atbrīvošanas pamatnes galā. Integrējiet precīzus apstiprinātos dalībnieku vadītājus, izmantojot sapludināšanas saistības. Saglabājiet viņu saistību vēsturi, izvairoties no ķirbja un pārmetumiem.
2. Atveriet vienu vilkšanas pieprasījumu vilciena atzaram. Apstipriniet šo PR ar savu pilno CI pašreizējā bāzes galā. Pirms nolaišanās vēlreiz pārbaudiet pamatnes galu un apstiprinātās detaļu galviņas. Atsvaidziniet vilcienu un tā CI, kad mainās apstiprinātais kandidāts.
3. Novietojiet vilcienu PR ar sapludināšanas apņemšanos saskaņā ar piemērojamo rindas režīmu. Tiešraides režīmā rindas `merge-ff` nolaišanās metode saglabā sapludināšanas saistības. Sākotnējās locekļu galvas kļūst sasniedzamas no atbrīvošanas filiāles. GitHub atzīmē dalībnieku PRs kā apvienotu, un saistības saglabā savus autorus.

Publisks piemērs ir [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Tajā tika apvienoti 18 biedri PRs, un tas tika noslēgts ar apvienošanas apņemšanos 2026. 11.24.

Sinhronizācija no `main` uz nākamo laidiena filiāli arī tiek veikta, izmantojot sapludināšanas apņemšanos. Vēlākām sinhronizācijām ir jāsaglabā `main` senči. Skatiet [Darbkoka izolāciju](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Vietējais sapludināšanas vilciena validators

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validators iegūst pamatni un PR galviņas un apvieno tās vienreiz lietojamā darba kokā. Tas vienreiz palaiž savu paritātes komplektu iegūtajā kokā. Neveiksmīga galvas ieneses vai sapludināšanas konflikts izstumj šo PR, un skripts tiek turpināts ar atlikušo PRs.

- **`--plan`** izdrukā izvēlētā režīma soļus un iziet, neizveidojot darbkoku vai nesazinoties ar tālvadības pulti. Apvienojiet to ar `--fast`, lai pārbaudītu ātro plānu.
- **`--fast`** palaiž parastos statiskos vārtus, atlasītos mainītos `node:test` failus zem `tests/unit/` un `npm run test:vitest`. Lietojot ātro režīmu, veiciet pilnu lokālo validāciju vismaz reizi dienā uzkrātajam padomam.
- **Pilns režīms** pievieno tikai statiskos vārtus un palaiž `npm run test:unit` un `npm run test:vitest`.

Ja ir pieejama bāzes zonde, neskartajā pamatnē tiek atkārtoti palaists statiskais vārti, kas nedarbojas. Skripts ziņo par iedzimtām kļūmēm un turpinās, kad katra atpazītā pārkāpuma rindiņa parādās arī bāzē un kopējais skaits nav pieaudzis.

| Iziet | Nozīme                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `0`   | Izdrukāja plānu vai pabeidza komplektu. Komplekta kopsavilkumā ir uzskaitītas visas iedzimtās statiskās kļūmes un izstumtais PRs.                      |
| `1`   | Nederīgi argumenti, nav Git izrakstīšanās, neizdevās pirmspārbaude vai nav PR iekāpšanas.                                                              |
| `2`   | Komplekta pārbaude neizdevās, un tā netika kvalificēta kā mantota. Operators var sadalīt partiju uz pusēm, izstumt aizskarošo PR un palaist atkārtoti. |

Vietējā caurlaide nodrošina diagnostikas pierādījumus tikai īpašnieka dokumentācijai. Katrai izkraušanai joprojām ir nepieciešama īpašnieka atļauja, pašas nepieciešamās pārbaudes un ēnu rindas spriedums, ja nepieciešams.

## Līmenis

- **Pēc PR.** CI un kvalitātes atlase pārbauda, pamatojoties uz mainītajiem ceļiem. Kods PRs veic ātrus kvalitātes vārtus un ietekmētos testus ar atsevišķu vienību un Vitest darbiem CI.
- **Katram rindas kandidātam.** CI un Quality izpilda pilnu profilu sastādītajam kandidātam savā rindā ref.
- **Pēc atbrīvošanas padoms.** Release-Green nodrošina ātrus un stingrus vārtus, veicot grūdienus, kas atbilst tā ceļa filtriem. Trīs ieplānotās darbības dienā izmanto pilnu slaucīšanu izlaišanas filiālei.
- **Par izlaidumu.** Pilnajā CI matricā ir iekļauti E2E shards, pakotnes validācija, tarball sāknēšanas dūmi un pārklājuma pārbaudes. Skatiet [izlaišanas kontrolsarakstu](RELEASE_CHECKLIST.md).

## Jaunas izrakstīšanās priekšnoteikumi `merge-train.sh`

Pirms darbkoku izveides notiek pirmslidojums. Instalējiet atkarības ar `npm ci`. Apstipriniet, ka `node_modules/.bin/tsc` ir izpildāms un ka `node_modules/node_modules` nav. Pārbaudiet, vai `node_modules/.bin/bun --version` izdodas.

Ja Bun pēcinstalēšana tika izlaista, palaidiet `(cd node_modules/bun && node install.js)`. Pakalpojumu sniedzēja konsekvences un zināmo simbolu pārbaudēs tiek izmantots Bun. Validators palaiž `npm run check:cycles:ratchet` kā bloķēšanas vārtus. Atsevišķa `npm run check:cycles` komanda ir konsultatīva.

## Vēsture

Mergify sapludināšanas rinda tika pārtraukta 19. 11.2026.
