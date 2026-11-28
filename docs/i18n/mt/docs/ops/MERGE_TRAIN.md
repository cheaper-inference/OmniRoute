# Merge Queue & Manual Merge-Train Runbook (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Inżul fuq fergħa tar-rilaxx

L-omni-queue jirregola l-inżul `release/vX.Y.Z`. Aqra l- `mode` tal-ogħla livell `config/merge-queue/config.json` fuq il-fergħa default qabel ma tħoll PR. Ara [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** tmexxi l-validazzjoni u tħalli l-inżul għal amalgamazzjoni manwali. Applika `omni-queue` għaż- PR approvat fir-ras finali tiegħu. Iċċekkja l-eliġibilità ma `npm run queue -- why <PR>`. Stenna l-verdett għal dak ir-ras `npm run queue -- history --base <branch>`. Ipproċedi fuq `would-land`. Fuq `culprit-found` jew `would-dequeue`, żomm l-għaqda u waħħal il-kawża.
- **Shadow eċċezzjonijiet.** Ferrovija CI ħadra sħiħa kontra l-ponta tal-bażi kurrenti tista' tipproċedi mingħajr verdett tal-kju separat. L-istess eċċezzjoni tapplika meta r-ras PR diġà fiha l-ponta bażi attwali.
- **`live`** juża t-tikketta `omni-queue` biex iqanqal l-inżul. Il-kju waħdu jniżżel iż- PR. Ħalli l-kmandi tal-għaqda u l-imbuttar dirett lejn il-kju.

Kull inżul jeħtieġ l-awtorizzazzjoni tas-sid u l-kontrolli meħtieġa applikabbli. Applika `omni-queue` biss wara li s-sid ikun awtorizza l-inżul. PRs fil-kju li jmiss mogħdijiet protetti jeħtieġu wkoll id-deċiżjoni `protected-approved` tas-sid għal dak PR.

Ir-regoli "Jeħtieġu gradi ħodor fuq ir-rilaxx attiv" jeħtieġ `Gate / CI` aħdar u `Gate / Quality` fuq ir-ras. Qatt tuża `--admin` biex tevita gate aħmar. Blokki tal-friża rilaxx jingħaqdu fil-fergħa ffriżata. Ara [Regola Iebsa 21](HARD_RULES_DETAIL.md). Qatt ttikketta, tingħaqad jew timbotta għal talba tal-ġibda li sessjoni oħra tkun qed taħdem. Ara [Regola Iebsa 22](HARD_RULES_DETAIL.md).

## It-talba tal-ġibda tal-ferrovija

1. Ibda fergħa tal-ferrovija fil-ponta tal-bażi tar-rilaxx attwali. Integra l-kapijiet tal-membri approvati eżatti bl-użu ta 'merge commits. Ippreserva l-istorja tal-impenn tagħhom billi tevita squash u rebase.
2. Iftaħ talba waħda tal-ġibda għall-fergħa tal-ferrovija. Ivvalida dik PR biż CI sħiħ tagħha stess fuq il-ponta bażi kurrenti. Iċċekkja mill-ġdid il-ponta tal-bażi u l-irjus tal-membri approvati qabel l-inżul. Aġġorna l-ferrovija u CI tagħha meta l-kandidat validat jinbidel.
3. Inżul il-ferrovija PR b'merge commit taħt il-modalità kju applikabbli. Fil-modalità live, il-metodu tal-inżul `merge-ff` tal-kju jippreserva l-commits tal-merge. L-irjus tal-membri oriġinali jsiru aċċessibbli mill-fergħa tar-rilaxx. GitHub jimmarka l-membru PRs bħala magħqud u l-kommessi jżommu l-awturi tagħhom.

Eżempju pubbliku huwa [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Hija għaqqad 18-il membru PRs u niżel b'commit ta' merger fl-2026-11-24.

Sinkronizzazzjoni lura minn `main` għall-fergħa tar-rilaxx li jmiss tinżel ukoll permezz ta 'commit ta' merge. Il-preservazzjoni tal-antenati `main` hija meħtieġa għal sync-backs aktar tard. Ara [l-Iżolament tas-Siġar tax-Xogħol](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Il-validatur lokali tal-merge-trein

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Il-validatur iġib il-bażi u l-irjus PR u jgħaqqadhom f'siġra tax-xogħol li tintrema. Hija tmexxi l-parità suite tagħha darba fuq is-siġra li tirriżulta. Konflitt ta' head fetch jew ta' amalgamazzjoni fallut iwarrab dak PR u l-iskript ikompli biż- PRs li jifdal.

- **`--plan`** tipprintja l-passi u l-ħruġ tal-mod magħżul mingħajr ma toħloq siġra tax-xogħol jew tikkuntattja l-remote. Għaqqadha ma ' `--fast` biex tispezzjona l-pjan mgħaġġel.
- **`--fast`** imexxi l-gradi statiċi komuni, il-fajls `node:test` magħżula mibdula taħt `tests/unit/`, u `npm run test:vitest`. Mexxi validazzjoni lokali sħiħa mill-inqas darba kuljum fuq il-ponta akkumulata meta tuża l-modalità veloċi.
- **Modalità sħiħa** iżid il-gradi statiċi full-biss u jmexxi `npm run test:unit` u `npm run test:vitest`.

Xatba statika li tfalli terġa' titħaddem fuq il-bażi mhux mittiefsa jekk is-sonda bażi tkun disponibbli. L-iskrittura tirrapporta fallimenti wiret u tkompli meta kull linja ta 'ksur rikonoxxut tidher ukoll fuq il-bażi u l-għadd totali ma kiberx.

| Ħruġ | Tifsira                                                                                                                      |
| ---- | ---------------------------------------------------------------------------------------------------------------------------- |
| `0`  | Stampat il-pjan jew imlejt is-suite. Is-sommarju tas-suit jelenka kwalunkwe fallimenti statiċi li ntirtu u PRs ejected.      |
| `1`  | Argumenti invalidi, ebda checkout Git, preflight fallut, jew ebda PR abbord.                                                 |
| `2`  | Suite check falla u ma kkwalifikax bħala wiret. L-operatur jista' jqaxxar il-lott, jitfa' l PR li joffendi, u jerġa' jmexxi. |

Pass lokali jipprovdi evidenza dijanjostika għad-dossier tas-sid biss. Kull inżul xorta jeħtieġ l-awtorizzazzjoni tas-sid, il-kontrolli meħtieġa tiegħu stess, u l-verdett tal-kju shadow meta applikabbli.

## Tiring

- **Per PR.** CI u kontrolli tal-għażla tal-kwalità bbażati fuq il-mogħdijiet mibdula. Il-kodiċi PRs imexxi xtiebi ta 'kwalità veloċi u testijiet impatt, b'impjiegi separati ta' unità u Vitest CI.
- **Għal kull kandidat fil-kju.** CI u Kwalità jmexxu l-profil sħiħ għall-kandidat kompost fuq il-kju tiegħu ref.
- **Kull ponta rilaxx.** Rilaxx-Green imexxi xtiebi iebsin malajr fuq pushes li jaqblu mal-filtri tal-passaġġ tiegħu. Tliet ġirjiet skedati kuljum jużaw l-isweep sħiħ għall-fergħa tar-rilaxx.
- **Għal kull rilaxx.** Il-matriċi CI sħiħa tinkludi shards E2E, validazzjoni tal-pakkett, duħħan tarball boot, u kontrolli tal-kopertura. Ara l [-Lista ta' Kontroll tar-Rilaxx](RELEASE_CHECKLIST.md).

## Prerekwiżiti ta' checkout frisk għal `merge-train.sh`

It-titjira ta' qabel taħdem qabel ma toħloq siġar tax-xogħol. Installa dipendenzi `npm ci`. Ikkonferma li `node_modules/.bin/tsc` huwa eżekutibbli u li `node_modules/node_modules` huwa assenti. Iċċekkja li `node_modules/.bin/bun --version` jirnexxi.

Jekk Bun postinstall inqabeż, ħaddem `(cd node_modules/bun && node install.js)`. Il-konsistenza tal-fornitur u l-kontrolli tas-simbolu magħruf jużaw Bun. Il-validatur imexxi `npm run check:cycles:ratchet` bħala xatba tal-imblukkar. Il-kmand `npm run check:cycles` waħdu huwa konsultattiv.

## Storja

Il-kju ta' amalgamazzjoni ta' Mergify ġie rtirat fl-2026-11-19.
