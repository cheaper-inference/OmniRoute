# Merge Queue & Manual Merge-Train Runbook (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Atterrissage sur une branche de release

L'omni-file d'attente régit les atterrissages dans `release/vX.Y.Z`. Lisez le `mode` de niveau supérieur dans `config/merge-queue/config.json` sur la branche par défaut avant d'atterrir un PR. Voir [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** exécute la validation et laisse l'atterrissage à une fusion manuelle. Appliquez `omni-queue` sur le PR approuvé à sa tête finale. Vérifiez l'éligibilité avec `npm run queue -- why <PR>`. Attendez le verdict pour cette tête dans `npm run queue -- history --base <branch>`. Continuez sur `would-land`. Sur `culprit-found` ou `would-dequeue`, maintenez la fusion et corrigez la cause.
- **Exceptions fantômes.** Un train avec CI vert complet par rapport à la pointe de base actuelle peut continuer sans verdict de file d'attente séparé. La même exception s'applique lorsque la tête PR contient déjà la pointe de base actuelle.
- **`live`** utilise l'étiquette `omni-queue` pour déclencher l'atterrissage. La file d'attente seule obtient le PR. Laissez les commandes de fusion et dirigez les push vers la file d’attente.

Chaque atterrissage nécessite l'autorisation du propriétaire et les vérifications requises applicables. Appliquez `omni-queue` seulement après que le propriétaire a autorisé l'atterrissage. PRs en file d'attente touchant des chemins protégés nécessitent également la décision `protected-approved` du propriétaire pour ce PR.

L'ensemble de règles « Exiger des portes vertes sur la version active » nécessite `Gate / CI` et `Gate / Quality` verts sur la tête. N'utilisez jamais `--admin` pour contourner une porte rouge. Une version gelée des blocs fusionne dans la branche gelée. Voir [la règle stricte 21](HARD_RULES_DETAIL.md). Ne jamais étiqueter, fusionner ou envoyer une demande d'extraction indiquant qu'une autre session fonctionne. Voir [la règle stricte 22](HARD_RULES_DETAIL.md).

## La demande de tirage du train

1. Démarrez une branche de train à l'extrémité de la base de version actuelle. Intégrez les têtes de membres approuvées exactes à l’aide de validations de fusion. Préservez leur historique de validation en évitant les écrasements et les rebases.
2. Ouvrez une pull request pour la branche train. Validez ce PR avec son propre CI complet sur la pointe de base actuelle. Revérifiez la pointe de la base et les têtes de membre approuvées avant l'atterrissage. Actualisez le train et son CI lorsque le candidat validé change.
3. Atterrissez le train PR avec une validation de fusion dans le mode de file d'attente applicable. En mode live, la méthode d'atterrissage `merge-ff` de la file d'attente préserve les validations de fusion. Les têtes de membres d'origine deviennent accessibles depuis la branche de publication. GitHub marque le membre PRs comme fusionné et les commits conservent leurs auteurs.

Un exemple public est [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Il a combiné 18 membres PRs et a atterri avec un engagement de fusion le 2026-11-24.

Une synchronisation de `main` vers la branche de version suivante atterrit également via une validation de fusion. La préservation de l'ascendance `main` est requise pour les synchronisations ultérieures. Voir [Isolement de l'arbre de travail](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Le validateur local de train de fusion

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Le validateur récupère les têtes de base et PR et les combine dans un arbre de travail jetable. Il exécute sa suite de parité une fois sur l'arborescence résultante. Un échec de récupération de tête ou de fusion éjecte ce PR et le script continue avec le PRs restant.

- **`--plan`** imprime les étapes du mode sélectionné et quitte sans créer d'arbre de travail ni contacter la télécommande. Combinez-le avec `--fast` pour inspecter le plan rapide.
- **`--fast`** exécute les portes statiques communes, les fichiers `node:test` modifiés sélectionnés sous `tests/unit/` et `npm run test:vitest`. Exécutez une validation locale complète au moins une fois par jour sur le pourboire accumulé lorsque vous utilisez le mode rapide.
- **Mode complet** ajoute les portes statiques complètes uniquement et exécute `npm run test:unit` et `npm run test:vitest`.

Une porte statique défaillante est réexécutée sur la base intacte si la sonde de base est disponible. Le script signale les échecs hérités et continue lorsque chaque ligne de violation reconnue apparaît également sur la base et que le nombre total n'a pas augmenté.

| Sortie | Signification                                                                                                                                               |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`    | Imprimé le plan ou complété la suite. Le résumé de la suite répertorie tous les échecs statiques hérités et PRs éjectés.                                    |
| `1`    | Arguments invalides, pas de paiement Git, échec du contrôle en amont ou aucun PR embarqué.                                                                  |
| `2`    | Une vérification de suite a échoué et n’a pas été considérée comme héritée. L'opérateur peut diviser le lot en deux, éjecter le PR incriminé et réexécuter. |

Le laissez-passer local fournit un élément de diagnostic uniquement pour le dossier du propriétaire. Chaque atterrissage nécessite toujours l'autorisation du propriétaire, ses propres vérifications requises et le verdict de la file d'attente fantôme, le cas échéant.

## Hiérarchisation

- **Par PR.** CI et Quality sélectionnent les contrôles en fonction des chemins modifiés. Le code PRs exécute des portes de qualité rapides et des tests impactés, avec des tâches unitaires et Vitest séparées dans CI.
- **Par candidat de file d'attente.** CI et Quality exécutent le profil complet du candidat composé sur sa file d'attente réf.
- **Par conseil de version.** Release-Green exécute des portes dures et rapides sur les poussées qui correspondent à ses filtres de chemin. Trois exécutions planifiées par jour utilisent le balayage complet pour la branche de publication.
- **Par version.** La matrice CI complète comprend les fragments E2E, la validation des packages, la fumée de démarrage de l'archive tar et les contrôles de couverture. Consultez la [liste de contrôle de sortie](RELEASE_CHECKLIST.md).

## Conditions préalables au nouveau paiement pour `merge-train.sh`

Le contrôle en amont s'exécute avant de créer les arbres de travail. Installez les dépendances avec `npm ci`. Confirmez que `node_modules/.bin/tsc` est exécutable et que `node_modules/node_modules` est absent. Vérifiez que `node_modules/.bin/bun --version` réussit.

Si la post-installation Bun a été ignorée, exécutez `(cd node_modules/bun && node install.js)`. Les vérifications de cohérence du fournisseur et de symboles connus utilisent Bun. Le validateur exécute `npm run check:cycles:ratchet` comme porte de blocage. La commande `npm run check:cycles` autonome est consultative.

## Histoire

La file d'attente de fusion Mergify a été retirée le 19/11/2026.
