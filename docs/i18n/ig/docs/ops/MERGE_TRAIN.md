# Merge Queue & Manual Merge-Train Runbook (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Ịdakwasị na ngalaba ntọhapụ

Omni kwụ n'ahịrị na-achịkwa ọdịda n'ime `release/vX.Y.Z`. Gụọ `mode` ọkwa dị elu na `config/merge-queue/config.json` na ngalaba ndabara tupu ị rute PR. Lee [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** na-agba ọsọ nkwado wee hapụ ọdịda na ngwakọta akwụkwọ ntuziaka. Tinye `omni-queue` na PR akwadoro n'isi ikpeazụ ya. Lelee ntozu na `npm run queue -- why <PR>`. Chere mkpebi maka isi ahụ na `npm run queue -- history --base <branch>`. Gaba na `would-land`. Na `culprit-found` ma ọ bụ `would-dequeue`, jide njikọ wee dozie ihe kpatara ya.
- **Mwepu onyinyo.** Ụgbọ oloko nwere CI akwụkwọ ndụ akwụkwọ ndụ zuru oke megide isi isi ugbu a nwere ike ịga n'ihu na-enweghị mkpebi kwụ n'ahịrị dị iche. Otu ihe ahụ na-emetụta mgbe isi PR nwere n'ọnụ isi ugbu a.
- **`live`** na-eji akara `omni-queue` kpalite ọdịda. Naanị kwụ n'ahịrị na-agbada PR. Hapụ iwu nchikota na ntinye aka na kwụ n'ahịrị.

Ọdịda ọ bụla chọrọ ikike onye nwe ya yana ndenye ego achọrọ. Tinye `omni-queue` naanị mgbe onye nwe ya nyechara ikike mbudata. PRs kwụ n'ahịrị emetụ n'ahụ ụzọ echedoro chọkwara mkpebi `protected-approved` onye nwe maka PR ahụ.

"Chọọ ọnụ ụzọ ndụ akwụkwọ ndụ na ntọhapụ nọ n'ọrụ" ruleset chọrọ akwụkwọ ndụ akwụkwọ ndụ `Gate / CI` na `Gate / Quality` n'isi. Ejila `--admin` gafee ọnụ ụzọ uhie. Ihe mgbochi ntọhapụ ntọhapụ jikọtara n'ime alaka oyi kpọnwụrụ. Lee [Iwu siri ike 21](HARD_RULES_DETAIL.md). Akpọla aha, jikọta ma ọ bụ kwanye na arịrịọ ịdọrọ na nnọkọ ọzọ na-arụ ọrụ. Lee [Iwu siri ike 22](HARD_RULES_DETAIL.md).

## Ụgbọ oloko dọkpụrụ arịrịọ

1. Malite alaka ụgbọ oloko n'ọnụ ntọala ntọala ugbu a. Jikọta ndị isi otu akwadoro site na iji mmekọ ọnụ. Chekwaa akụkọ ihe mere eme ha site n'izere skwọsh na rebase.
2. Mepee arịrịọ ịdọrọ maka alaka ụgbọ oloko. Kwado PR ahụ jiri CI nke ya zuru oke n'ọnụ ntọala dị ugbu a. Lelee ntụzịaka isi na isi ndị otu akwadoro tupu ịdatuo. Mee ka ụgbọ oloko na CI nwee ume mgbe onye ndoro-ndoro anya gbanwere.
3. Wetuo PR ụgbọ oloko ahụ na njikọ njikọta n'okpuru ọnọdụ kwụ n'ahịrị. N'ụdị ndụ, usoro mgbada `merge-ff` kwụ n'ahịrị na-echekwa njikọ aka. Ndị isi ndị otu mbụ na-aghọ ndị a na-enweta site na ngalaba ntọhapụ. GitHub na-akara onye otu PRs ka ejikọta ya na ihe omume ahụ na-ejigide ndị odee ha.

Ihe atụ ọha bụ [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Ọ jikọtara ndị otu PRs 18 wee rute na njikọta ọnụ na 2026-11-24.

Mmekọrịta-azụ si `main` gaa na ngalaba ntọhapụ na-esote ga-agbadata site na ntinye aka. Achọrọ ichekwa nna nna `main` maka mmekọ-azụ. Lee [Mwepu nke Worktree](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Ihe nkwado njikọ ụgbọ oloko mpaghara

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Onye nkwado ahụ na-ewepụta isi na isi PR wee jikọta ha n'osisi ọrụ enwere ike iwepu. Ọ na-agba ọsọ nke parity suite otu ugboro n'elu osisi nke pụta. Isi dara ada ma ọ bụ jikọta esemokwu na-ewepụ PR na edemede ahụ na-aga n'ihu na PRs fọdụrụnụ.

- **`--plan`** na-ebipụta usoro nke ahọpụtara wee pụọ na-emepụtaghị osisi ọrụ ma ọ bụ ịkpọtụrụ ebe dịpụrụ adịpụ. Jikọta ya na `--fast` iji nyochaa atụmatụ ngwa ngwa.
- **`--fast`** na-agba ọsọ ọnụ ụzọ static nkịtị, faịlụ `node:test` ahọpụtara gbanwere n'okpuru `tests/unit/`, yana `npm run test:vitest`. Gbaa nkwado mpaghara zuru oke ma ọ dịkarịa ala otu ugboro n'ụbọchị n'ọnụ ọnụ mgbe ị na-eji ọnọdụ ngwa ngwa.
- **Ụdị zuru oke** na-agbakwụnye ọnụ ụzọ ámá kwụ ọtọ zuru ezu ma na-agba `npm run test:unit` na `npm run test:vitest`.

A na-emegharị ọnụ ụzọ static na-ada ada na ntọala a na-emetụghị aka ma ọ bụrụ na nyocha ntọala dị. Edemede a na-akọ ọdịda ketara wee na-aga n'ihu mgbe ahịrị mmebi ọ bụla amatara pụtakwara na ntọala yana mkpokọta etolitebeghị.

| Ụzọ ọpụpụ | Pụtara                                                                                                                            |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `0`       | Bipụta atụmatụ ma ọ bụ mechaa suite ahụ. Nchịkọta ụlọ ahụ depụtara ọdịda adaghị ada ọ bụla ketara na PRs ewepụrụ.                 |
| `1`       | Arụmụka na-ezighi ezi, enweghị nlele Git, ụgbọ elu dara ada, ma ọ bụ enweghị PR banye.                                            |
| `2`       | Ntụle ego suite dara ma erughị eru ka eketara. Onye na-arụ ọrụ nwere ike kewaa ogbe ahụ, wepụ PR na-adịghị mma, wee malitegharịa. |

Akwụkwọ ngafe mpaghara na-enye ihe akaebe nyocha maka naanị dossier onye nwe ya. Ọdịda ọ bụla ka na-achọ ikike onye nwe ya, ndenye ego nke ya chọrọ, yana mkpebi kwụ n'ahịrị onyinyo mgbe ọ dị.

## Tiering

- **PR.** CI na Ogo họrọ ndenye ego dabere na ụzọ ndị gbanwere. Koodu PRs na-agba ọsọ ọnụ ụzọ ámá dị mma yana ule emetụtara, yana otu dị iche iche yana ọrụ Vitest na CI.
- **Onye na-azọ ọkwa kwụ n'ahịrị.** CI na Quality na-eme profaịlụ zuru oke maka onye omere mejupụtara na kwụ n'ahịrị ref.
- **Ọnụ ntọhapụ kwa ọ bụla.** Ntọhapụ-Green na-agba ọsọ ọsọ ọnụ ụzọ ámá siri ike na mkpọ nke dabara na nzacha ụzọ ya. A na-agba ọsọ atọ akwadoro kwa ụbọchị na-eji mkpochapụ zuru ezu maka alaka ụlọ ọrụ ntọhapụ.
- **Kwa ntọhapụ.** Matriks CI zuru ezu gụnyere E2E shards, nkwado ngwugwu, anwụrụ ọkụ bọọlụ tarball, na nlele mkpuchi. Hụ [ndepụta nlele mwepụta](RELEASE_CHECKLIST.md).

## Ihe achọrọ nlele ọhụrụ maka `merge-train.sh`

Ụgbọ elu na-ebu ụzọ na-aga tupu ịmepụta osisi ọrụ. Wụnye ndabere na `npm ci`. Kwenye na `node_modules/.bin/tsc` nwere ike ime ya na `node_modules/node_modules` adịghị. Lelee na `node_modules/.bin/bun --version` na-aga nke ọma.

Ọ bụrụ na awụsara Bun postinstall, gbaa `(cd node_modules/bun && node install.js)`. Nkwekọrịta onye na-eweta ya na nlele akara ama ama na-eji Bun. Ihe nkwado ahụ na-agba `npm run check:cycles:ratchet` dị ka ọnụ ụzọ mgbochi. Iwu `npm run check:cycles` kwụ ọtọ bụ ndụmọdụ.

## Akụkọ ihe mere eme

Ahịrị njikọ Mergify lara ezumike nká na 2026-11-19.
