# Merge Queue & Manual Merge-Train Runbook (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Landing sa isang release branch

Pinamamahalaan ng omni-queue ang mga landing sa `release/vX.Y.Z`. Basahin ang pinakamataas na antas `mode` sa `config/merge-queue/config.json` sa default na sangay bago mag-landing ng PR. Tingnan ang [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** nagpapatakbo ng pagpapatunay at iniiwan ang landing sa isang manu-manong pagsasama. Ilapat ang `omni-queue` sa naaprubahang PR sa huling ulo nito. Suriin ang pagiging karapat-dapat sa `npm run queue -- why <PR>`. Hintayin ang hatol para sa ulo na iyon sa `npm run queue -- history --base <branch>`. Magpatuloy sa `would-land`. Sa `culprit-found` o `would-dequeue`, pindutin nang matagal ang merge at ayusin ang dahilan.
- **Mga pagbubukod sa anino.** Ang isang tren na may berdeng buong CI laban sa kasalukuyang base tip ay maaaring magpatuloy nang walang hiwalay na hatol sa pila. Nalalapat ang parehong pagbubukod kapag ang PR head ay naglalaman na ng kasalukuyang base tip.
- **`live`** gumagamit ng `omni-queue` label para i-trigger ang landing. Ang pila lang ay nakarating sa PR. Iwanan ang mga merge command at direktang push sa queue.

Ang bawat landing ay nangangailangan ng awtorisasyon ng may-ari at ang mga naaangkop na kinakailangang tseke. Mag-apply lang `omni-queue` pagkatapos ng awtorisadong landing ng may-ari. Nangangailangan din ng `protected-approved` na desisyon ng may-ari ang PRs na humahawak sa mga protektadong landas para sa PR na iyon.

Ang ruleset na "Require green gates on the active release" ay nangangailangan ng berdeng `Gate / CI` at `Gate / Quality` sa ulo. Huwag kailanman gumamit `--admin` upang i-bypass ang isang pulang gate. Ang isang release freeze block ay sumasama sa frozen na sangay. Tingnan ang [Hard Rule 21](HARD_RULES_DETAIL.md). Huwag kailanman lagyan ng label, pagsamahin o itulak sa isang kahilingan sa paghila na gumagana ang isa pang session. Tingnan ang [Hard Rule 22](HARD_RULES_DETAIL.md).

## Ang kahilingan sa paghila ng tren

1. Magsimula ng branch ng tren sa kasalukuyang release base tip. Isama ang eksaktong naaprubahang mga pinuno ng miyembro gamit ang mga merge commit. Panatilihin ang kanilang commit history sa pamamagitan ng pag-iwas sa squash at rebase.
2. Buksan ang isang kahilingan sa paghila para sa sangay ng tren. I-validate PR na iyon gamit ang sarili nitong buong CI sa kasalukuyang base tip. Suriin muli ang base tip at ang mga naaprubahang pinuno ng miyembro bago lumapag. I-refresh ang tren at ang CI nito kapag nagbago ang napatunayang kandidato.
3. Landin ang train PR gamit ang merge commit sa ilalim ng naaangkop na queue mode. Sa live mode, pinapanatili ng `merge-ff` landing method ng queue ang merge commits. Ang orihinal na mga pinuno ng miyembro ay maaaring maabot mula sa sangay ng paglabas. minarkahan ng GitHub ang miyembro PRs bilang pinagsama at pinapanatili ng mga commit ang kanilang mga may-akda.

Ang isang pampublikong halimbawa ay [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Pinagsama nito ang 18 miyembrong PRs at nakarating sa isang merge commit noong 2026-11-24.

Ang isang sync-back mula `main` patungo sa susunod na release branch ay dumarating din sa pamamagitan ng isang merge commit. Ang pagpapanatili ng `main` ancestry ay kinakailangan para sa pag-sync-back sa ibang pagkakataon. Tingnan ang [Worktree Isolation](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Ang lokal na merge-train validator

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Kinukuha ng validator ang base at PR head at pinagsasama ang mga ito sa isang disposable worktree. Pinapatakbo nito ang parity suite nito nang isang beses sa resultang puno. Ang isang bigong head fetch o merge na conflict ay naglalabas na ang PR at ang script ay nagpapatuloy sa natitirang PRs.

- **`--plan`** nagpi-print ng mga hakbang at paglabas ng napiling mode nang hindi gumagawa ng worktree o nakikipag-ugnayan sa remote. Pagsamahin ito sa `--fast` upang siyasatin ang mabilis na plano.
- **`--fast`** nagpapatakbo ng mga karaniwang static na gate, ang napiling binagong `node:test` file sa ilalim ng `tests/unit/`, at `npm run test:vitest`. Magpatakbo ng buong lokal na pagpapatunay nang hindi bababa sa isang beses sa isang araw sa naipon na tip kapag gumagamit ng fast mode.
- **Buong mode** idinaragdag ang ganap na static na gate at nagpapatakbo `npm run test:unit` at `npm run test:vitest`.

Ang isang bagsak na static na gate ay muling ipapalabas sa hindi nagalaw na base kung ang base probe ay magagamit. Ang script ay nag-uulat ng mga minanang pagkabigo at nagpapatuloy kapag ang bawat kinikilalang linya ng paglabag ay lumabas din sa base at ang kabuuang bilang ay hindi lumaki.

| Lumabas | Ibig sabihin                                                                                                                                                     |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`     | Na-print ang plano o natapos ang suite. Inililista ng buod ng suite ang anumang minanang static na mga pagkabigo at na-eject PRs.                                |
| `1`     | Mga di-wastong argumento, walang Git checkout, nabigong preflight, o walang PR na nakasakay.                                                                     |
| `2`     | Nabigo ang isang suite check at hindi naging kwalipikado bilang minana. Maaaring hatiin ng operator ang batch, i-eject ang nakakasakit PR, at muling patakbuhin. |

Ang isang lokal na pass ay nagbibigay ng diagnostic na ebidensya para lamang sa dossier ng may-ari. Nangangailangan pa rin ang bawat landing ng awtorisasyon ng may-ari, sarili nitong mga kinakailangang pagsusuri, at ang hatol ng shadow queue kapag naaangkop.

## Tiering

- **Per PR.** CI at Quality piliin ang mga tseke batay sa mga binagong landas. Ang code PRs ay nagpapatakbo ng mabilis na kalidad ng mga gate at naapektuhang mga pagsubok, na may magkahiwalay na unit at Vitest na trabaho sa CI.
- **Bawat kandidato sa pila.** Pinapatakbo ng CI at Quality ang buong profile para sa binubuong kandidato sa queue ref nito.
- **Bawat tip sa paglabas.** Ang Release-Green ay nagpapatakbo ng mabilis na hard gate sa mga push na tumutugma sa mga filter ng path nito. Tatlong naka-iskedyul na pagtakbo bawat araw ang gumamit ng buong sweep para sa release branch.
- **Bawat release.** Kasama sa buong CI matrix ang E2E shards, pagpapatunay ng package, usok ng tarball boot, at mga pagsusuri sa saklaw. Tingnan ang [Release Checklist](RELEASE_CHECKLIST.md).

## Fresh-checkout prerequisites para sa `merge-train.sh`

Ang preflight ay tumatakbo bago gumawa ng mga worktree. Mag-install ng mga dependency na may `npm ci`. Kumpirmahin na ang `node_modules/.bin/tsc` ay executable at ang `node_modules/node_modules` ay wala. Tingnan kung nagtagumpay ang `node_modules/.bin/bun --version`.

Kung nilaktawan ang Bun postinstall, patakbuhin ang `(cd node_modules/bun && node install.js)`. Ang pagkakapare-pareho ng provider at mga kilalang-simbulo na pagsusuri ay gumagamit Bun. Ang validator ay nagpapatakbo ng `npm run check:cycles:ratchet` bilang isang blocking gate. Ang standalone `npm run check:cycles` command ay advisory.

## Kasaysayan

Ang merge na pila ng Mergify ay itinigil noong 2026-11-19.
