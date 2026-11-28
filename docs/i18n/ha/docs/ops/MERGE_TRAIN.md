# Merge Queue & Manual Merge-Train Runbook (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Saukowa akan reshen saki

Layin-omni-line yana sarrafa saukowa zuwa `release/vX.Y.Z`. Karanta babban matakin `mode` a cikin `config/merge-queue/config.json` akan tsoho reshe kafin saukar da PR. Duba [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** yana gudanar da tabbatarwa kuma ya bar saukowa zuwa haɗakar da hannu. Aiwatar da `omni-queue` zuwa ga PR da aka amince a kai na ƙarshe. Duba cancanta tare da `npm run queue -- why <PR>`. Jira hukuncin wannan shugaban a cikin `npm run queue -- history --base <branch>`. Ci gaba a kan `would-land`. A kan `culprit-found` ko `would-dequeue`, riƙe haɗin kuma gyara dalilin.
- **Banbancin inuwa.** Jirgin kasa mai koren cikakken CI a kan titin tushe na yanzu zai iya ci gaba ba tare da wani hukunci na daban ba. Irin wannan keɓancewar ya shafi lokacin da shugaban PR ya riga ya ƙunshi tip ɗin tushe na yanzu.
- **`live`** yana amfani da alamar `omni-queue` don jawo saukowa. Layin kawai ya sauka PR. Bar umarnin haɗuwa da turawa kai tsaye zuwa jerin gwano.

Kowane saukowa yana buƙatar izinin mai shi da abin da ake buƙata na cak. Aiwatar da `omni-queue` kawai bayan mai shi ya ba da izinin saukowa. PRs da aka yi layi na taɓa hanyoyin kariya kuma yana buƙatar shawarar `protected-approved` na mai shi na wannan PR.

"Bukatar korayen kore akan sakin aiki" ka'idojin suna buƙatar kore `Gate / CI` da `Gate / Quality` a kai. Kar a taɓa amfani da `--admin` don kewaya kofa ja. Tubalan daskarewar saki ya haɗu cikin reshen daskararre. Dubi [Dokokin Hard 21](HARD_RULES_DETAIL.md). Kada a taɓa yiwa alama, haɗa ko turawa zuwa buƙatar ja cewa wani zaman yana aiki. Dubi [Dokokin Hard 22](HARD_RULES_DETAIL.md).

## Buƙatar ja jirgin ƙasa

1. Fara reshen jirgin ƙasa a tip ɗin tushe na yanzu. Haɗa ainihin shugabannin membobin da aka amince da su ta amfani da ayyukan haɗaka. Kiyaye tarihin sadaukarwarsu ta hanyar guje wa ciyayi da sake zama.
2. Buɗe buƙatun ja ɗaya don reshen jirgin ƙasa. Tabbatar da wannan PR tare da nasa cikakken CI akan tip ɗin tushe na yanzu. Sake bincika tushen tushe da shugabannin membobin da aka amince kafin sauka. Sake sabunta jirgin kasa da CI lokacin da ingantaccen ɗan takara ya canza.
3. Kasa PR jirgin kasa tare da haɗa haɗin gwiwa a ƙarƙashin yanayin layin da ya dace. A cikin yanayin raye-raye, hanyar saukowa ta `merge-ff` na jerin gwano tana adana ayyukan haɗin gwiwa. Shugabannin memba na asali sun zama abin da za a iya samu daga reshen sakin. GitHub yana yiwa memba PRs alama a matsayin hade kuma ayyukan suna riƙe marubutan su.

Misalin jama'a shine [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Ya haɗu da memba 18 PRs kuma ya sauka tare da ƙaddamarwa akan 2026-11-24.

Mai daidaitawa daga `main` zuwa reshen sakewa na gaba shima ya sauka ta hanyar haɗin kai. Ana buƙatar adana zuriyar `main` don daidaitawa na baya. Dubi [Warewa Worktree](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Mai tabbatar da haɗin gwiwar jirgin ƙasa

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Mai inganci ya ɗauko tushe da kawunan PR ya haɗa su a cikin itacen aikin da za a iya zubarwa. Yana gudanar da suite ɗin sa sau ɗaya akan bishiyar da aka samu. Ƙunar kai ko haɗa rikici ya kasa fitar da PR kuma rubutun ya ci gaba da sauran PRs.

- **`--plan`** yana buga matakan da aka zaɓa kuma ya fita ba tare da ƙirƙirar itacen aiki ba ko tuntuɓar ramut. Haɗa shi da `--fast` don duba shirin mai sauri.
- **`--fast`** yana gudanar da ƙofofin gama gari, zaɓaɓɓun fayilolin `node:test` da aka canza a ƙarƙashin `tests/unit/`, da `npm run test:vitest`. Gudun ingantaccen ingantaccen gida aƙalla sau ɗaya a rana akan tarin tukwici lokacin amfani da yanayin sauri.
- **Cikakken yanayin** yana ƙara cikakkun ƙofofin tsaye kawai kuma yana gudanar da `npm run test:unit` da `npm run test:vitest`.

Ana sake kunna kofa a tsaye a kan tushen da ba a taɓa taɓa ba idan akwai binciken tushe. Rubutun ya ba da rahoton gazawar da aka gada kuma yana ci gaba lokacin da kowane layin keta da aka sani shima ya bayyana akan tushe kuma adadin bai girma ba.

| Fita | Ma'ana                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `0`  | Buga shirin ko kammala suite. Takaitacciyar suite ta lissafta duk wani gazawar da aka gada da kuma fitar da PRs.                   |
| `1`  | Hujjoji mara inganci, babu rajistan Git, gazawar riga-kafi, ko babu PR da aka hau.                                                 |
| `2`  | Chek suite ya gaza kuma bai cancanci matsayin gado ba. Mai aiki zai iya raba rukunin, fitar da PR mai laifi, kuma ya sake kunnawa. |

Fas ɗin gida yana ba da shaidar ganowa don takaddar mai shi kaɗai. Kowane saukowa har yanzu yana buƙatar izinin mai shi, bincikensa da ake buƙata, da hukuncin layin inuwa idan an zartar.

## Tiering

- **PR.** CI da Quality zaɓi cak bisa ga hanyoyin da aka canza. Lambar PRs tana gudanar da ƙofofin inganci da sauri da gwaje-gwaje masu tasiri, tare da rabe-rabe da ayyukan Vitest a cikin CI.
- **Kowane ɗan takarar jerin gwano.** CI da Quality suna gudanar da cikakken bayanin ɗan takarar da aka haɗa akan layi ref.
- **Tukwici na kowane saki.** Sakin-Green yana gudanar da ƙofofi masu ƙarfi a kan turawa waɗanda suka dace da matatun hanyar sa. Gudu uku da aka tsara a kowace rana suna amfani da cikakken sharewa don reshen sakin.
- **Kowane saki.** Cikakken CI matrix ya haɗa da shards E2E, ingantattun fakiti, hayaƙin tayal na kwal, da duban ɗaukar hoto. Dubi [Lissafin Sakin](RELEASE_CHECKLIST.md) Sakin .

## Abubuwan da ake buƙatun saɓo na dubawa don `merge-train.sh`

Jirgin yana gudana kafin ƙirƙirar bishiyar aiki. Shigar da abin dogaro da `npm ci`. Tabbatar da cewa za'a iya aiwatar da `node_modules/.bin/tsc` kuma `node_modules/node_modules` baya nan. Duba cewa `node_modules/.bin/bun --version` yayi nasara.

Idan an tsallake Bun postinstall, gudanar da `(cd node_modules/bun && node install.js)`. Daidaiton mai badawa da sanannun-tabbatattun alamun suna amfani da Bun. Mai inganci yana gudanar da `npm run check:cycles:ratchet` azaman ƙofar toshewa. Umurnin `npm run check:cycles` kadai nasiha ne.

## Tarihi

An yi ritayar layin haɗin kan Mergify a ranar 2026-11-19.
