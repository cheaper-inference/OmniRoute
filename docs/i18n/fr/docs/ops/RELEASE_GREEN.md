# Release-Green: candidate validation and evidence (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green observe un commit spécifique et rapporte ses résultats de validation. La [référence Quality Gates](../architecture/QUALITY_GATES.md) définit les profils CI actuels, les contrôles requis et la politique d'acceptation. La [politique d'admission](../../config/quality/admission-policy.json) versionnée est le contrat exécutable pour `Gate / CI` et `Gate / Quality`.

## CI et portée d'observateur

`ci.yml` et `quality.yml` couvrent les demandes d'extraction dans les branches principales et de version. Le profil sélectionné détermine les emplois postulant. CI complet comprend également des voies qu'une demande d'extraction ordinaire n'exécute pas. Un résultat d'observateur rapide ne peut pas remplacer ces tâches, et un wrapper de flux de travail terminé ne peut pas remplacer ses reçus.

La version de production appartient à CI. Il n'y a pas de version d'avis en double dans `quality.yml`. Les artefacts manquants, les travaux annulés et les mesures incomplètes ne permettent pas d'établir une vérification requise réussie. Confirmez la base actuelle, le chef et le candidat combiné avant d'accepter les résultats.

## Validation locale

Exécutez l'observateur dans un arbre de travail détenu après avoir préparé ses dépendances. Utilisez l' [arbre de travail et le protocole de ressources](WORKTREE_ISOLATION.md) avant une validation approfondie.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Le profil rapide est partiel. Le profil complet vérifie ses exigences modélisées et conserve les reçus de commande ; il ne certifie pas le déploiement et ne remplace pas les contrôles hébergés applicables. Le rapport distingue l’échec d’exécution de la dérive des métriques. Les cliquets requis restent bloquants selon la politique sélectionnée. N'élevez pas une ligne de base simplement pour obtenir un résultat satisfaisant.

## Balayages nocturnes et manuels

Les résolveurs de version nocturne et de compatibilité sélectionnent une branche de version canonique. Cette sélection doit correspondre à la branche qui a déclenché le flux de travail, et les suites utilisent le SHA immuable de l'événement. Pour une exécution manuelle, sélectionnez la version prévue dans `release_branch` et envoyez-la sur cette même référence :

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

L'envoi inter-branches est rejeté avant l'exécution du code sélectionné. Les suites principales hébergées extraient `main` et vérifient que son SHA correspond toujours à la cible résolue avant l'installation. Si main bouge pendant la résolution, réexécutez le balayage incomplet sur le nouveau commit. Ne combinez pas les reçus de suite de différents candidats.

## Triage des pannes et récupération

Utilisez l'incident comme index de diagnostic, puis inspectez l'exécution exacte, la tentative, l'étape ayant échoué et l'artefact. Comparez les preuves de base équivalentes et les preuves candidates avant d’attribuer un échec à un contributeur. Les erreurs d'infrastructure, les défauts hérités, les régressions des candidats et les approbations en attente nécessitent des remèdes différents.

Les compétences `/green-prs`, `/sweep-reds`, `/validate-release-green` et `/babysit` collectent des preuves et préparent des correctifs dans le cadre de leur portée documentée. Conservez le crédit du contributeur, utilisez des succursales de réparation isolées et vérifiez tous les contrôles requis avant une fusion autorisée. Aucune rebaseline automatique ou clôture d'incident ne remplace un candidat actuel qui réussit.
