# Merge Queue & Manual Merge-Train Runbook (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Tuirlingt ar bhrainse scaoileadh

Rialaíonn an scuaine omni tuirlingthe go `release/vX.Y.Z`. Léigh an `mode` barrleibhéil i `config/merge-queue/config.json` ar an mbrainse réamhshocraithe sula dtagann tú i dtír PR. Féach [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** ritheann bailíochtú agus fágtar an tuirlingt go cumasc láimhe. Cuir `omni-queue` i bhfeidhm ar an PR ceadaithe ag a cheann deiridh. Seiceáil incháilitheacht le `npm run queue -- why <PR>`. Fan leis an bhfíorasc don cheann sin in `npm run queue -- history --base <branch>`. Lean ar aghaidh ar `would-land`. Ar `culprit-found` nó `would-dequeue`, coinnigh an cumasc agus socraigh an chúis.
- **Eisceachtaí scáth.** Is féidir le traein le CI iomlán glas in aghaidh an bhuntois reatha dul ar aghaidh gan fíorasc scuaine ar leith. Tá an eisceacht chéanna i gceist nuair atá an bunáit reatha sa cheann PR cheana féin.
- **`live`** úsáideann an lipéad `omni-queue` chun tuirlingt a spreagadh. Is í an scuaine amháin a thagann an PR i dtír. Fág orduithe chumasc agus brú díreach chuig an scuaine.

Teastaíonn údarú an úinéara agus na seiceálacha riachtanacha is infheidhme maidir le gach tabhairt i dtír. Cuir `omni-queue` i bhfeidhm ach amháin tar éis don úinéir tuirlingthe a údarú. Teastaíonn cinneadh `protected-approved` an úinéara don PR sin freisin le PRs ag baint le cosáin chosanta.

Éilíonn an tacar rialacha "Geataí glasa ar an scaoileadh gníomhach" glas `Gate / CI` agus `Gate / Quality` ar an ceann. Ná húsáid `--admin` choíche chun geata dearg a sheachbhóthar. Nascann bloic reo scaoilte isteach sa bhrainse reoite. Féach [Riail Crua 21](HARD_RULES_DETAIL.md). Ná lipéadaigh, cumasc ná brúigh chuig iarratas tarraingthe go bhfuil seisiún eile ag obair. Féach [Riail Crua 22](HARD_RULES_DETAIL.md).

## Iarratas tarraingt traenach

1. Tosaigh brainse traenach ag an mbunáit scaoilte reatha. Comhtháthaigh na ceannairí ball formheasta beachta ag baint úsáide as gealltanais chumaisc. A stair tiomantais a chaomhnú trí scuaise agus rebase a sheachaint.
2. Oscail iarratas tarraingthe amháin don bhrainse traenach. Bailíochtaigh an PR sin lena CI iomlán féin ar an mbunleid reatha. Seiceáil an barr bun agus cinn na mball formheasta arís sula dtagann tú i dtír. Athnuaigh an traein agus a CI nuair a athraíonn an t-iarrthóir bailíochtaithe.
3. Cuir PR na traenach i dtír le ceangal cumaisc faoin modh scuaine is infheidhme. I mód beo, caomhnaíonn modh tuirlingthe `merge-ff` na scuaine na gealltanais chumaisc. Is féidir teacht ar na baill bhunaidh ón bhrainse scaoileadh. Marcálann GitHub an ball PRs mar chumasc agus coinníonn na gealltanais a n-údair.

Sampla poiblí is [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Chomhcheangail sé 18 ball PRs agus tháinig i dtír le gealltanas cumaisc ar 2026-11-24.

Tagann sioncronú ar ais ó `main` go dtí an chéad bhrainse scaoilte eile trí ghealltanas cumaisc freisin. Is gá sinnsearacht `main` a chaomhnú le haghaidh sioncrónaithe níos déanaí. Féach [Leithlisiú Worktree](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## An bailíochtóir traenach cumasc áitiúil

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Faigheann an bailíochtóir an bonn agus na cinn PR agus nascann sé iad i gcrann oibre indiúscartha. Ritheann sé a sraith paireacht uair amháin ar an gcrann mar thoradh air. Má theip ar fháil nó ar chumasc coinbhleacht díshealbhaíonn PR sin agus leanann an script leis an PRs atá fágtha .

- **`--plan`** priontaí céimeanna agus bealaí amach an mhodha roghnaithe gan crann oibre a chruthú nó teagmháil a dhéanamh leis an gcianrialtán. Déan é a chomhcheangal le `--fast` chun an plean mear a iniúchadh.
- **`--fast`** ritheann na geataí statacha coitianta, na comhaid roghnaithe `node:test` athraithe faoi `tests/unit/`, agus `npm run test:vitest`. Rith bailíochtú iomlán áitiúil ar a laghad uair sa lá ar an rinn carntha agus tú ag úsáid mód tapa.
- **Mód iomlán** cuireann sé na geataí statacha lán-amháin agus ritheann `npm run test:unit` agus `npm run test:vitest`.

Athdhéantar geata statach atá ag teip ar an mbonn gan teagmháil má tá an bonnsteora ar fáil. Tuairiscíonn an script teipeanna oidhreachta agus leanann sé ar aghaidh nuair a bhíonn gach líne sáraithe aitheanta le feiceáil ar an mbonn freisin agus nach bhfuil méadú tagtha ar an líon iomlán.

| Scoir | Brí                                                                                                                                                                   |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`   | An plean a phriontáil nó an tsraith a chríochnú. Liostaítear san achoimre sraith aon teipeanna statacha a fuarthas le hoidhreacht agus PRs a scaoiltear amach.        |
| `1`   | Argóintí neamhbhailí, gan aon Seiceáil Git, theip ar réamheitilt, nó níor cuireadh ar bord PR.                                                                        |
| `2`   | Theip ar sheic suite agus níor cháiligh sé mar sheic le hoidhreacht. Is féidir leis an oibreoir an bhaisc a dhéroinnt, an PR ciontaithe a dhíbirt, agus athreáchtáil. |

Soláthraíonn pas áitiúil fianaise dhiagnóiseach do shainchomhad an úinéara amháin. Tá údarú úinéara fós ag teastáil le haghaidh gach tuirlingthe, a seiceálacha riachtanacha féin, agus fíorasc na scuaine scátha nuair is infheidhme.

## Sraitheadh

- **Le PR.** CI agus Cáilíocht roghnaigh seiceálacha bunaithe ar na cosáin athraithe. Ritheann Cód PRs geataí cáilíochta tapa agus tástálacha tionchar, le haonaid ar leith agus poist Vitest i CI.
- **In aghaidh an iarrthóra scuaine.** ritheann CI agus Cáilíocht an phróifíl iomlán don iarrthóir comhdhéanta ar a scuaine tag.
- **De réir leideanna scaoileadh.** Ritheann Release-Green geataí crua tapaidh ar bhrú a mheaitseálann a scagairí cosáin. Trí rith sceidealta in aghaidh an lae a úsáideann an scuab iomlán don bhrainse scaoileadh.
- **De réir scaoileadh.** Áirítear leis an maitrís CI iomlán shards E2E, bailíochtú pacáiste, deataigh tosaithe tarball, agus seiceálacha clúdaigh. Féach ar an [Seicliosta Eisiúna](RELEASE_CHECKLIST.md).

## Réamhriachtanais seiceála úra le haghaidh `merge-train.sh`

Ritheann an preflight roimh chruthú crainn oibre. Suiteáil spleáchais le `npm ci`. Deimhnigh go bhfuil `node_modules/.bin/tsc` inrite agus go bhfuil `node_modules/node_modules` as láthair. Seiceáil go n-éiríonn le `node_modules/.bin/bun --version`.

Má scipeáladh an postinstall Bun, rith `(cd node_modules/bun && node install.js)`. Úsáideann seiceálacha comhsheasmhachta agus siombailí aitheanta Bun. Ritheann an bailíochtóir `npm run check:cycles:ratchet` mar gheata blocála. Tá an t-ordú aonair `npm run check:cycles` comhairleach.

## Stair

Scoraíodh scuaine chumasc Mergify ar 2026-11-19.
