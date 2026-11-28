# Merge Queue & Manual Merge-Train Runbook (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Kutua kwenye tawi la kutolewa

Foleni ya kila kitu inasimamia kutua kwenye `release/vX.Y.Z`. Soma `mode` ya kiwango cha juu katika `config/merge-queue/config.json` kwenye tawi chaguo-msingi kabla ya kutua PR. Angalia [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** huendesha uthibitishaji na kuacha kutua kwa muunganisho wa mwongozo. Omba `omni-queue` kwa PR iliyoidhinishwa kwenye kichwa chake cha mwisho. Angalia kustahiki kwa `npm run queue -- why <PR>`. Subiri uamuzi wa kichwa hicho katika `npm run queue -- history --base <branch>`. Endelea na `would-land`. Kwenye `culprit-found` au `would-dequeue`, shikilia unganisho na urekebishe sababu.
- **Vighairi vya kivuli.** Treni iliyo na CI ya kijani kibichi dhidi ya ncha ya msingi ya sasa inaweza kuendelea bila uamuzi tofauti wa foleni. Isipokuwa sawa inatumika wakati kichwa cha PR tayari kina ncha ya msingi ya sasa.
- **`live`** hutumia lebo `omni-queue` kusababisha kutua. Foleni pekee ndiyo inatua PR. Acha amri za kuunganisha na misukumo ya moja kwa moja kwenye foleni.

Kila kutua kunahitaji idhini ya mmiliki na ukaguzi unaohitajika. Omba `omni-queue` tu baada ya mmiliki kuidhinisha kutua. PRs zilizowekwa kwenye foleni zinazogusa njia zilizolindwa pia zinahitaji uamuzi `protected-approved` wa mmiliki kwa PR hiyo.

Kanuni ya "Inahitaji milango ya kijani kwenye toleo linalotumika" inahitaji `Gate / CI` ya kijani na `Gate / Quality` kichwani. Usiwahi kutumia `--admin` kukwepa lango jekundu. Vitalu vya kugandisha kutolewa huunganishwa kwenye tawi lililogandishwa. Tazama [Kanuni Ngumu ya 21](HARD_RULES_DETAIL.md). Usiweke lebo, kuunganisha au kusukuma kwa ombi la kuvuta ambalo kipindi kingine kinafanya kazi. Tazama [Kanuni Ngumu ya 22](HARD_RULES_DETAIL.md).

## Ombi la kuvuta treni

1. Anzisha tawi la treni kwenye kidokezo cha msingi cha toleo la sasa. Jumuisha wakuu wa wanachama walioidhinishwa kwa kutumia ahadi za kuunganisha. Hifadhi historia yao ya kujitolea kwa kuzuia boga na kuacha tena.
2. Fungua ombi moja la kuvuta kwa tawi la treni. Thibitisha PR hiyo kwa CI yake kamili kwenye ncha ya msingi ya sasa. Angalia tena kidokezo cha msingi na vichwa vya wanachama walioidhinishwa kabla ya kutua. Onyesha upya treni na CI yake wakati mgombeaji aliyeidhinishwa anabadilika.
3. Shika treni PR na ahadi ya kuunganisha chini ya hali ya foleni inayotumika. Katika hali ya moja kwa moja, njia ya kutua `merge-ff` ya foleni huhifadhi ahadi za kuunganisha. Vichwa vya wanachama asili vinaweza kufikiwa kutoka kwa tawi la toleo. GitHub inaweka alama kwa mwanachama PRs kama kuunganishwa na ahadi huhifadhi waandishi wao.

Mfano wa umma ni [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Ilijumuisha PRs wanachama 18 na ikatua na ahadi ya kuunganisha mnamo 2026-11-24.

Usawazishaji kutoka `main` hadi tawi linalofuata la kutolewa pia hutua kupitia ahadi ya kuunganisha. Kuhifadhi asili `main` inahitajika kwa usawazishaji wa baadaye. Tazama [Kutengwa kwa Mti wa Kazi](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Kithibitishaji cha ndani cha treni ya kuunganisha

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Kithibitishaji huchukua msingi na vichwa PR na kuvichanganya kwenye mti wa kazi unaoweza kutumika. Inaendesha safu yake ya usawa mara moja kwenye mti unaotokana. Uchoraji wa kichwa ulioshindwa au uunganisho wa mzozo huondoa PR na hati inaendelea na PRs iliyosalia.

- **`--plan`** huchapisha hatua za hali iliyochaguliwa na kutoka bila kuunda mti wa kazi au kuwasiliana na kidhibiti cha mbali. Ichanganye na `--fast` ili kukagua mpango wa haraka.
- **`--fast`** inaendesha malango tuli ya kawaida, faili zilizochaguliwa zilibadilisha `node:test` chini ya `tests/unit/`, na `npm run test:vitest`. Tekeleza uthibitishaji kamili wa ndani angalau mara moja kwa siku kwenye kidokezo kilichokusanywa unapotumia hali ya haraka.
- **Hali kamili** huongeza milango tuli kamili pekee na inaendesha `npm run test:unit` na `npm run test:vitest`.

Lango tuli lisilofanikiwa linarudishwa kwenye msingi ambao haujaguswa ikiwa uchunguzi wa msingi unapatikana. Hati huripoti hitilafu zilizorithiwa na inaendelea wakati kila mstari wa ukiukaji unaotambuliwa pia unaonekana kwenye msingi na hesabu ya jumla haijaongezeka.

| Utgång | Maana                                                                                                                                                 |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`    | Kuchapishwa mpango au kukamilisha Suite. Muhtasari wa kitengo huorodhesha mapungufu yoyote tuliyorithi na kutolewa PRs.                               |
| `1`    | Hoja batili, hakuna malipo ya Git, safari ya ndege ilishindwa, au hakuna PR iliyopakiwa.                                                              |
| `2`    | Ukaguzi wa vyumba haukufaulu na haukufaulu kama kurithiwa. Opereta anaweza kugawanya kundi hilo mara mbili, kuondoa PR iliyoudhi, na kutekeleza tena. |

Pasi ya ndani hutoa ushahidi wa uchunguzi kwa hati ya mmiliki pekee. Kila kutua bado kunahitaji uidhinishaji wa mmiliki, ukaguzi wake unaohitajika, na uamuzi wa foleni ya kivuli inapohitajika.

## Tiering

- **Kwa PR.** CI na Ubora huchagua hundi kulingana na njia zilizobadilishwa. Msimbo PRs huendesha milango ya ubora wa haraka na majaribio yaliyoathiriwa, na kitengo tofauti na kazi za Vitest katika CI.
- **Kwa mgombea wa foleni.** CI na Ubora huendesha wasifu kamili wa mgombeaji aliyetungwa kwenye rejeleo lake la foleni.
- **Kwa kidokezo cha kutolewa.** Release-Green huendesha milango migumu ya haraka kwenye misukumo inayolingana na vichujio vyake vya njia. Mikimbio mitatu iliyoratibiwa kwa siku hutumia kufagia kamili kwa tawi la kutolewa.
- **Kwa kutolewa.** Matrix kamili CI inajumuisha shadi za E2E, uthibitishaji wa kifurushi, moshi wa buti ya tarball, na ukaguzi wa chanjo. Tazama [Orodha hakiki ya Toleo](RELEASE_CHECKLIST.md).

## Masharti ya kulipia upya kwa `merge-train.sh`

Preflight huendesha kabla ya kuunda miti ya kazi. Sakinisha vitegemezi na `npm ci`. Thibitisha kuwa `node_modules/.bin/tsc` inaweza kutekelezwa na kwamba `node_modules/node_modules` haipo. Angalia kuwa `node_modules/.bin/bun --version` imefanikiwa.

Ikiwa usakinishaji wa Bun ulirukwa, endesha `(cd node_modules/bun && node install.js)`. Uthabiti wa mtoa huduma na ukaguzi wa alama unaojulikana hutumia Bun. Kithibitishaji huendesha `npm run check:cycles:ratchet` kama lango la kuzuia. Amri ya `npm run check:cycles` inayojitegemea ni ya ushauri.

## Historia

Foleni ya kuunganisha ya Mergify ilistaafu mnamo 2026-11-19.
