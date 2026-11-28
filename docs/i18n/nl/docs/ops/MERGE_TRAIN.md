# Merge Queue & Manual Merge-Train Runbook (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Landen op een vrijgavetak

De omni-wachtrij regelt de landingen in `release/vX.Y.Z`. Lees de `mode` op het hoogste niveau in `config/merge-queue/config.json` op de standaardbranch voordat u een PR landt. Zie [Omni-wachtrij](OMNI_QUEUE.md).

- **`shadow`** voert de validatie uit en verlaat de landing naar een handmatige samenvoeging. Breng `omni-queue` aan op de goedgekeurde PR bij de laatste kop. Controleer of u in aanmerking komt met `npm run queue -- why <PR>`. Wacht op de uitspraak voor dat hoofd in `npm run queue -- history --base <branch>`. Ga verder met `would-land`. Houd op `culprit-found` of `would-dequeue` de samenvoeging vast en verhelp de oorzaak.
- **Schaduwuitzonderingen.** Een trein met groene volle CI tegen de huidige basistip kan zonder apart wachtrijoordeel doorrijden. Dezelfde uitzondering is van toepassing wanneer de PR kop al de huidige basistip bevat.
- **`live`** gebruikt het `omni-queue` label om de landing te activeren. Alleen al de wachtrij brengt de PR binnen. Laat samenvoegopdrachten en directe push-opdrachten naar de wachtrij.

Voor iedere landing is de toestemming van de eigenaar en de daarbij behorende vereiste controles vereist. Pas `omni-queue` pas toe nadat de eigenaar toestemming heeft gegeven om te landen. In de wachtrij geplaatste PRs die beschermde paden raken, vereisen ook de `protected-approved` beslissing van de eigenaar voor die PR.

De regelset "Vereist groene poorten bij actieve vrijgave" vereist groene `Gate / CI` en `Gate / Quality` op het hoofd. Gebruik `--admin` nooit om een rode poort te omzeilen. Een release-bevriezingsblok gaat over in de bevroren tak. Zie [harde regel 21](HARD_RULES_DETAIL.md). Label, merge of push nooit een pull-verzoek dat een andere sessie werkt. Zie [harde regel 22](HARD_RULES_DETAIL.md).

## Het treintrekverzoek

1. Start een treinvertakking op de huidige release-basispunt. Integreer de exact goedgekeurde lidhoofden met behulp van merge commits. Behoud hun commitgeschiedenis door squash en rebase te vermijden.
2. Open één pull-aanvraag voor de treintak. Valideer die PR met zijn eigen volledige CI op de huidige basistip. Controleer de basistip en de goedgekeurde lidkoppen opnieuw voordat u landt. Ververs de trein en zijn CI wanneer de gevalideerde kandidaat verandert.
3. Land de trein PR met een merge commit onder de toepasselijke wachtrijmodus. In de live-modus behoudt de `merge-ff` landingsmethode van de wachtrij de merge-commits. De oorspronkelijke ledenhoofden worden bereikbaar vanaf de releasetak. GitHub markeert het lid PRs als samengevoegd en de commits behouden hun auteurs.

Een openbaar voorbeeld is [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Het combineerde PRs met 18 leden en kwam op 24-11-2026 terecht met een fusieverplichting.

Een sync-back van `main` naar de volgende release branch komt ook terecht via een merge commit. Het behouden van de voorouders `main` is vereist voor latere synchronisaties. Zie [Werkboomisolatie](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## De lokale validator voor samenvoegtreinen

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

De validator haalt de basis- en PR -koppen op en combineert deze in een wegwerpbare werkboom. Het voert zijn pariteitssuite één keer uit op de resulterende boom. Een mislukt headfetch- of merge-conflict werpt die PR uit en het script gaat verder met de resterende PRs.

- **`--plan`** drukt de stappen van de geselecteerde modus af en sluit af zonder een werkboom te maken of contact op te nemen met de afstandsbediening. Combineer het met `--fast` om het snelle plan te bekijken.
- **`--fast`** voert de algemene statische poorten uit, de geselecteerde gewijzigde `node:test` bestanden onder `tests/unit/` en `npm run test:vitest`. Voer minstens één keer per dag een volledige lokale validatie uit op de verzamelde tip als u de snelle modus gebruikt.
- **Volledige modus** voegt de volledige statische poorten toe en voert `npm run test:unit` en `npm run test:vitest` uit.

Een falende statische poort wordt opnieuw uitgevoerd op de onaangeroerde basis als de basissonde beschikbaar is. Het script rapporteert overgeërfde fouten en gaat verder wanneer elke herkende overtredingslijn ook op de basis verschijnt en het totaal aantal niet is toegenomen.

| Uitgang | Betekenis                                                                                                                                                 |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`     | Het plan afgedrukt of de suite voltooid. In het suiteoverzicht worden eventuele overgenomen statische fouten en uitgeworpen PRs vermeld.                  |
| `1`     | Ongeldige argumenten, geen Git-checkout, mislukte preflight of geen PR boarding.                                                                          |
| `2`     | Een suitecontrole mislukte en kwalificeerde niet als geërfd. De operator kan de batch in tweeën delen, de overtredende PR uitwerpen en opnieuw uitvoeren. |

Een lokale pas levert uitsluitend diagnostisch bewijs voor het dossier van de eigenaar. Voor elke landing is nog steeds toestemming van de eigenaar vereist, de eigen vereiste controles en, indien van toepassing, het oordeel over de schaduwwachtrij.

## Niveaus

- **Per PR.** CI en kwaliteitsselectiecontroles op basis van de gewijzigde paden. Code PRs voert snelle kwaliteitspoorten en impacttests uit, met afzonderlijke eenheids- en Vitest -taken in CI.
- **Per wachtrijkandidaat.** CI en Quality voeren het volledige profiel uit voor de samengestelde kandidaat op zijn wachtrij ref.
- **Per releasetip.** Release-Green voert snelle, harde poorten uit bij aanvallen die overeenkomen met de padfilters. Drie geplande runs per dag maken gebruik van de volledige sweep voor de release branch.
- **Per uitgave.** De volledige CI matrix omvat E2E scherven, pakketvalidatie, tarball-bootrook en dekkingscontroles. Zie de [Vrijgavechecklist](RELEASE_CHECKLIST.md).

## Vereisten voor vers afrekenen voor `merge-train.sh`

De preflight wordt uitgevoerd voordat werkbomen worden gemaakt. Installeer afhankelijkheden met `npm ci`. Bevestig dat `node_modules/.bin/tsc` uitvoerbaar is en dat `node_modules/node_modules` afwezig is. Controleer of `node_modules/.bin/bun --version` slaagt.

Als de Bun postinstall is overgeslagen, voer dan `(cd node_modules/bun && node install.js)` uit. De providerconsistentie en bekende-symboolcontroles gebruiken Bun. De validator voert `npm run check:cycles:ratchet` uit als een blokkerende poort. Het zelfstandige `npm run check:cycles` commando is adviserend.

## Geschiedenis

De samenvoegwachtrij voor samenvoegen is op 19-11-2026 buiten gebruik gesteld.
