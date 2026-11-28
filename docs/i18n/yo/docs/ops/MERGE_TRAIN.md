# Merge Queue & Manual Merge-Train Runbook (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Ibalẹ lori a Tu eka

Omni-queue ṣe akoso awọn ibalẹ sinu `release/vX.Y.Z`. Ka `mode` ipele-oke ni `config/merge-queue/config.json` lori ẹka aiyipada ṣaaju ibalẹ PR. Wo [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** nṣiṣẹ afọwọsi ati ki o fi oju ibalẹ si a ọwọ àkópọ. Waye `omni-queue` si PR ti a fọwọsi ni ori ipari rẹ. Ṣayẹwo yiyẹ ni pẹlu `npm run queue -- why <PR>`. Duro fun idajo fun ori ni `npm run queue -- history --base <branch>`. Tẹsiwaju `would-land`. Lori `culprit-found` tabi `would-dequeue`, di irẹpọ naa mu ki o tun idi naa ṣe.
- **Awọn imukuro ojiji.** Ọkọ oju-irin pẹlu CI alawọ ewe ni kikun lodi si imọran ipilẹ lọwọlọwọ le tẹsiwaju laisi idajọ isinyi lọtọ. Iyatọ kanna kan nigbati ori PR ti ni imọran ipilẹ lọwọlọwọ.
- **`live`** nlo aami `omni-queue` lati ṣe okunfa ibalẹ. Awọn ti isinyi nikan ni awọn ilẹ PR. Fi awọn aṣẹ apapọ silẹ ati awọn titari taara si isinyi.

Gbogbo ibalẹ nilo aṣẹ eni ati awọn sọwedowo ti o nilo. Waye `omni-queue` nikan lẹhin ti oniwun ti fun ni aṣẹ ibalẹ. Queued PRs fọwọkan awọn ọna aabo tun nilo ipinnu `protected-approved` oniwun fun PR yẹn.

Awọn “Beere awọn ẹnu-ọna alawọ ewe lori itusilẹ lọwọ” awọn ofinet nilo `Gate / CI` alawọ ewe ati `Gate / Quality` lori ori. Maṣe lo `--admin` lati fori ẹnu-ọna pupa kan. Itusilẹ didi awọn bulọọki dapọ si ẹka tio tutunini. Wo [Ofin Lile 21](HARD_RULES_DETAIL.md). Maṣe ṣe aami, dapọ tabi Titari si ibeere fifa kan pe igba miiran n ṣiṣẹ. Wo [Ofin Lile 22](HARD_RULES_DETAIL.md).

## Reluwe fa ìbéèrè

1. Bẹrẹ ẹka ọkọ oju irin ni imọran ipilẹ itusilẹ lọwọlọwọ. Ṣepọ awọn olori ọmọ ẹgbẹ ti a fọwọsi gangan ni lilo awọn ifarapọ idapọ. Ṣetọju itan-akọọlẹ ifaramo wọn nipa yago fun elegede ati atunbere.
2. Ṣii ibeere fifa ọkan fun ẹka ọkọ oju irin. Fidi PR yẹn pẹlu CI kikun tirẹ lori imọran ipilẹ lọwọlọwọ. Tun ṣayẹwo imọran ipilẹ ati awọn olori ọmọ ẹgbẹ ti a fọwọsi ṣaaju ibalẹ. Sọ ọkọ oju irin naa ati CI rẹ nigbati oludije ti a fọwọsi ba yipada.
3. Gbe PR reluwe lọ pẹlu ifarapọ kan labẹ ipo isinyi to wulo. Ni ipo ifiwe, ọna ibalẹ `merge-ff` ti isinyi ṣe itọju awọn iṣẹ idapọ. Awọn olori ọmọ ẹgbẹ atilẹba ti o le de ọdọ lati ẹka itusilẹ. GitHub ṣe samisi ọmọ ẹgbẹ PRs bi a ti dapọ ati pe awọn iṣẹ ṣe idaduro awọn onkọwe wọn.

Apeere ti gbogbo eniyan ni [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). O darapọ PRs ọmọ ẹgbẹ 18 o si balẹ pẹlu ifarapọ kan ni 2026-11-24.

Amuṣiṣẹpọ-pada lati `main` si ẹka itusilẹ t’okan tun gbele nipasẹ ifarapọ kan. Titọju idile `main` nilo fun awọn amuṣiṣẹpọ nigbamii. Wo [Iyasọtọ Worktree](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Olufọwọsi iṣọpọ-ọkọ oju-irin agbegbe

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Olufọwọsi mu ipilẹ ati awọn olori PR ṣajọpọ wọn sinu igi iṣẹ isọnu. O gbalaye awọn oniwe-parity suite lẹẹkan lori Abajade igi. Ija ori ti o kuna tabi dapọ rogbodiyan jade pe PR ati iwe afọwọkọ naa tẹsiwaju pẹlu PRs to ku.

- **`--plan`** tẹjade awọn igbesẹ ipo ti o yan ati jade laisi ṣiṣẹda igi iṣẹ tabi kan si isakoṣo latọna jijin. Darapọ pẹlu `--fast` lati ṣayẹwo ero iyara naa.
- **`--fast`** nṣiṣẹ awọn ẹnu-ọna aimi ti o wọpọ, awọn faili `node:test` ti a ti yan labẹ `tests/unit/`, ati `npm run test:vitest`. Ṣiṣe afọwọsi agbegbe ni kikun ni o kere ju lẹẹkan lojoojumọ lori aaye ikojọpọ nigba lilo ipo iyara.
- **Ipo ni kikun** ṣe afikun awọn ẹnu-ọna aimi ni kikun ati ṣiṣe `npm run test:unit` ati `npm run test:vitest`.

Ẹnu-ọna aimi ti o kuna ni a tun ṣiṣẹ lori ipilẹ ti a ko fi ọwọ kan ti iwadii ipilẹ ba wa. Iwe afọwọkọ naa ṣe ijabọ awọn ikuna ti jogun ati tẹsiwaju nigbati gbogbo laini irufin ti a mọ tun han lori ipilẹ ati kika lapapọ ko ti dagba.

| Jade | Itumo                                                                                                     |
| ---- | --------------------------------------------------------------------------------------------------------- |
| `0`  | Tejede ètò tabi pari suite. Akopọ suite ṣe atokọ eyikeyi awọn ikuna aimi ti a jogun ati PRs ti a yọ jade. |
| `1`  | Awọn ariyanjiyan ti ko tọ, ko si isanwo Git, iṣaju iṣaaju ti kuna, tabi ko si PR ti o wọ.                 |
| `2`  | Ayẹwo suite kuna ati pe ko ṣe deede bi jogun. Oṣiṣẹ le pin ipin naa, yọ PR ti o ṣẹ, ati tun bẹrẹ.         |

Iwe-iwọle agbegbe kan n pese ẹri iwadii aisan fun iwe-ipamọ oniwun nikan. Ibalẹ kọọkan tun nilo aṣẹ oniwun, awọn sọwedowo ti o nilo tirẹ, ati idajọ isinyi ojiji nigbati o ba wulo.

## Tiering

- **Fun PR.** CI ati Didara yan awọn sọwedowo ti o da lori awọn ọna ti o yipada. Koodu PRs ṣiṣe awọn ẹnu-ọna didara iyara ati awọn idanwo ti o ni ipa, pẹlu ẹyọkan lọtọ ati awọn iṣẹ Vitest ni CI.
- **Fun ti isinyi oludije.** CI ati Didara ṣiṣe profaili ni kikun fun oludije ti o ni akopọ lori atunṣe isinyi rẹ.
- **Fun sample itusilẹ.** Tu-Green nṣiṣẹ awọn ẹnu-bode lile ni iyara lori awọn titari ti o baamu awọn asẹ ọna rẹ. Awọn ṣiṣe eto mẹta fun ọjọ kan lo gbigba ni kikun fun ẹka itusilẹ.
- **Fun idasilẹ.** Matrix CI ni kikun pẹlu awọn shards E2E, afọwọsi package, ẹfin bata bata bọọlu, ati awọn sọwedowo agbegbe. Wo Akojọ [Ayẹwo Tu silẹ](RELEASE_CHECKLIST.md).

## Awọn ohun pataki iṣayẹwo-ṣayẹwo fun `merge-train.sh`

Ikọju iṣaju n ṣiṣẹ ṣaaju ṣiṣẹda awọn igi iṣẹ. Fi awọn igbẹkẹle sori ẹrọ pẹlu `npm ci`. Jẹrisi pe `node_modules/.bin/tsc` jẹ ṣiṣe ati pe `node_modules/node_modules` ko si. Ṣayẹwo pe `node_modules/.bin/bun --version` ṣaṣeyọri.

Ti Bun postinstall ti fo, ṣiṣe `(cd node_modules/bun && node install.js)`. Aitasera olupese ati awọn sọwedowo aami-mọ lo Bun. Olufọwọsi nṣiṣẹ `npm run check:cycles:ratchet` bi ẹnu-ọna ìdènà. Aṣẹ `npm run check:cycles` imurasilẹ jẹ imọran.

## Itan

Ti isinyi akojọpọ Mergify ti fẹyìntì ni 2026-11-19.
