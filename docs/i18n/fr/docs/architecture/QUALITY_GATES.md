# Quality Gates Reference (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ce document constitue la référence faisant autorité pour tous les contrôles qualité de CI d’OmniRoute.
Il décrit chaque contrôle, ce qu’il valide, la tâche de CI dans laquelle il s’exécute, s’il utilise
une base de référence à effet de cliquet ou une politique de réussite/échec, et s’il bloque la compilation ou est consultatif.

Pour un bref résumé et la politique de liste d’autorisation, consultez la section « Quality Gates & Ratchets »
dans `AGENTS.md`. Pour l’évaluation critique, la classification de maturité et le
plan de réplication indépendant des outils du même système, consultez le
[guide des contrôles qualité](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventaire des gates et profils d’exécution

### Admission des candidats

Les workflows CI et Quality Gates émettent chacun un verdict stable : `Gate / CI` et
`Gate / Quality`. Leur politique d’admission versionnée répertorie chaque job en amont
comme obligatoire ou consultatif. Tout job obligatoire applicable doit réussir : les
résultats manquants, annulés, ignorés, en attente ou inconnus ne peuvent pas établir un
PASS. Une classification docs-only ou catalog-only valide peut rendre une voie de code
inapplicable ; une PR en brouillon n’est pas un candidat accepté. Un label `hotfix`
ne dispense pas de fournir les éléments probants.

Les deux workflows couvrent les PR vers les branches main/release, les pushs vers `main`,
les déclenchements manuels et les événements de groupe de fusion. Les pushs, les déclenchements
et les groupes de fusion exécutent la sélection complète. Les pushs vers `release/**` ne les
démarrent pas (2026-10-18) : chaque modification a déjà exécuté la matrice sur sa PR et la
combinaison fusionnée relève de Release-Green (`docs/ops/RUNNER_BOX.md` → voie hébergée). Les forks
et les groupes de fusion utilisent des runners hébergés pour les jobs qui sélectionneraient
autrement des runners auto-hébergés ; une capacité hébergée suffisante doit être vérifiée
avant le déploiement.

Une PR ordinaire exécute la sélection rapide. Les voies `full-code` et `full-code-e2e` de la
politique d’admission (E2E, intégration, artefact de package, test de fumée Electron, Bun SQLite,
écosystème et clients de protocole) ne s’exécutent que sur un brouillon de file d’attente Mergify
ou lors d’une exécution complète :
`gh workflow run ci.yml --ref <branch>`.

Chaque reçu JSON identifie le SHA extrait, l’exécution du workflow et la tentative.
La CLI rejette une non-correspondance entre le SHA extrait et celui de l’événement. Les tests
du workflow lient l’appartenance à la politique à la liste `needs` du job de verdict, afin
qu’une voie ajoutée ou supprimée ne puisse pas disparaître silencieusement.
Les reçus couvrent leur propre workflow, et non la publication, le déploiement ou les mécanismes
internes d’un scanner consultatif existant. L’activation des deux noms de vérification dans les
règles de branche constitue une modification administrative distincte ; l’ajout de ces jobs ne
protège pas une branche à lui seul.

### File d’attente de fusion

Le label `queue` envoie une PR dans la file d’attente Mergify (`.mergify.yml`). Mergify ouvre une
PR en brouillon sur une branche `mergify/merge-queue/`, CI y exécute la sélection complète, et la
PR d’origine est fusionnée lorsque `Gate / CI`, `Gate / Quality` et
`Merge integrity (changelog + generated skills)` réussissent.

Mergify écrit le résumé de sa file d’attente dans la description du brouillon, et d’autres
applications peuvent également le modifier. Un événement `pull_request` `edited` sur un tel
brouillon utilise son propre groupe de concurrence (`-queue-edit-<run_id>`), afin de ne pas
pouvoir annuler l’exécution réelle du brouillon, et ignore le gate ainsi que la matrice. Seul
`Merge integrity` continue de s’exécuter. Le job de gate ignoré porte un nom de vérification
différent, car Mergify interprète un `Gate / CI` ignoré comme un échec et retire la PR de la file
d’attente.

Après un retrait de la file d’attente, un push ne remet pas toujours la PR en file d’attente.
Ajoutez-y le commentaire `@mergifyio queue`.

### Inventaire des analyses statiques

L’inventaire versionné des alias npm et l’appartenance aux analyses statiques se trouvent dans
`config/quality/gate-manifest.json`. Exécutez `npm run check:gate-manifest` pour valider les noms
des scripts et les commandes exactes par rapport à `package.json` ; les ajouts, les suppressions
et les dérives de commandes font échouer à la fois le hook local et les jobs de classification
des modifications dans CI. Un alias n’est ni un job de workflow, ni une instance de matrice,
ni un cas de test : ces nombres ne doivent pas être présentés comme interchangeables.

Utilisez `npm run quality:scan -- --list` ou `npm run quality:scan:fast -- --list`
pour examiner les alias sélectionnés sans les exécuter. Le runner invoque le point d’entrée
npm, son environnement d’exécution est donc préservé, y compris Bun lorsqu’il est configuré.
Le manifeste consigne les alias extérieurs à ces profils comme étant invoqués séparément, et
les commandes de maintenance sont interdites dans les profils d’analyse en lecture seule.

Ces profils couvrent uniquement l’analyse statique. Ils ne certifient ni les tests du produit,
ni la couverture, ni le packaging, ni les vérifications externes, ni l’acceptation complète
d’un candidat pour une release. L’admission par workflow utilise le fichier lié
`config/quality/admission-policy.json` et `scripts/quality/admission-verdict.mjs`. Les profils
de release-observer restent distincts ; examinez séparément leurs vérifications et reçus
applicables. L’inventaire textuel ci-dessous constitue une référence, et non une preuve
qu’un gate a réellement été exécuté.

Les scripts se trouvent sous `scripts/check/` (gates de politique) et `scripts/quality/`
(moteur de ratchet). La source de vérité de CI est `.github/workflows/ci.yml`.

### Chemin rapide des PR de release (`quality.yml`)

`.github/workflows/quality.yml` complète CI pour les PR main/release, les pushs vers `main`,
les déclenchements et les groupes de fusion. Les PR utilisent des vérifications rapides filtrées
par chemin. Le build dupliqué désactivé en permanence a été supprimé ; les véritables
vérifications de build/package/démarrage restent dans CI. La suite unitaire et vitest
s’exécutent uniquement dans CI (`Unit Tests (N/8)` et `Vitest`).

| Job                                              | Portée                                                                                                                                | Bloquant                      |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `Docs Gates (fast-path)`                         | PR de documentation/code ; références de documentation API et docs-all                                                                | Oui                           |
| `Fast Quality Gates`                             | PR de code ; vérifications statiques, typecheck, typecheck du dashboard, tests unitaires affectés, tests frères oubliés (consultatif) |
| `No new ESLint warnings`                         | PR de code ; garde de lint tenant compte des suppressions                                                                             | Oui, y compris pour les forks |
| `Merge integrity (changelog + generated skills)` | PR hors brouillon ; synchronisation du changelog et des skills générés                                                                | Oui, y compris pour les forks |

#### Rapport sur les tests frères oubliés

`npm run check:forgotten-sibling-tests` s’exécute comme une étape consultative de `Fast Quality Gates` et réutilise
le résolveur d’importation sous-jacent à la carte d’impact des tests.
Pour chaque module de production modifié, cette commande signale des chaînes déterministes
`changed module/symbol -> static consumer -> candidate sibling test` lorsque le test candidat
est absent du diff de la pull request. Le résumé Markdown et le résultat JSON sont conservés en tant
qu’artefact de workflow `forgotten-sibling-tests` à des fins d’étalonnage avant tout déploiement bloquant.

Les réexportations via des fichiers barrel et les importations dynamiques servent uniquement au diagnostic
de résolution ; elles ne génèrent jamais de constat bloquant. Les exceptions validées se trouvent dans
`config/quality/forgotten-sibling-allowlist.json`. Chaque entrée doit indiquer le consommateur et le test
candidat, fournir une justification précise et contenir un lien vers une issue ou une pull request GitHub.
Les entrées mal formées provoquent un échec par défaut. Les exceptions ne peuvent pas masquer un test
candidat supprimé ni un diff qui ajoute `.skip`/`.todo` ; l’affaiblissement des assertions et les autres
formes de masquage restent sous la responsabilité de la barrière bloquante indépendante
`check:test-masking`.

### Tâche : `lint`

S’exécute sur chaque PR vers `main`. Bloque la fusion en cas d’échec.

| Script (`npm run ...`)            | Valide                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Bloquant                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `check:node-runtime`              | La version de Node.js se trouve dans la plage prise en charge                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui                                        |
| `check:cycles`                    | Les imports circulaires dans l’ensemble de `src/` + `open-sse/` (basé sur l’AST, avec résolution des `paths` de tsconfig). La commande seule se termine avec le code 1 dès qu’un cycle existe (échec par défaut depuis #15281) et répertorie les composantes fortement connexes. `check:cycles:ratchet` (exécuté par la CI) bloque lorsque le nombre dépasse le plafond `metrics.cycles` défini dans `quality-baseline.json` — actuellement 14, `direction: down`, il ne peut donc que diminuer (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oui (cliquet)                              |
| `check:boundary`                  | Couplage `open-sse → src` : imports uniques de fichier à fichier depuis le moteur vers l’application (`scripts/quality/measure-boundary.mjs` ; la liste des arêtes constitue le backlog de remédiation pour la séparation cœur/modules de la v4). Commande seule = rapport consultatif (identique à `quality:boundary`). `check:boundary:ratchet` (exécuté par la CI, également dans la boucle à cliquet des contrôles rapides de `quality.yml`) bloque lorsque le nombre dépasse le plafond `metrics.boundaryOpenSseToSrc` défini dans `quality-baseline.json` — initialisé à la valeur mesurée de 771, `direction: down` ; `--update` ne peut que l’abaisser ; relatif à la branche de base dans les PR (`--base-ref`, voir ci-dessous)                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oui (cliquet)                              |
| `check:route-validation:t06`      | Présence de schémas Zod sur toutes les routes (politique de niveau 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oui                                        |
| `check:any-budget:t11`            | Le nombre de `@ts-expect-error // any` ne dépasse pas le budget (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Oui                                        |
| `check:provider-consistency`      | Chaque fournisseur dans `providers.ts` possède une entrée correspondante dans `providerRegistry.ts` (et inversement, dans les limites de la liste d’autorisation)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Oui                                        |
| `check:model-lifecycle`           | Les trois tables de routage maintenues manuellement restent cohérentes avec l’instantané du cycle de vie archivé (#11503) : `FITNESS_TABLE` (`taskFitness.ts`) n’attribue de score à aucun identifiant retiré que `REGISTRY` peut acheminer ; chaque cible de `BUILT_IN_ALIASES` est présente dans `REGISTRY` et absente de l’instantané des identifiants retirés ; chaque identifiant retiré encore présent dans `REGISTRY` est transféré ou répertorié dans `allowedRetiredInCatalog` ; et aucune source ni cible de `DEFAULT_DEGRADATION_MAP` n’apparaît comme retirée dans cet instantané. Cela ne prouve pas qu’un modèle est actuellement servi par un fournisseur amont actif. Hors ligne — effectue une comparaison avec `config/quality/model-lifecycle.json`, actualisé manuellement avec `npm run quality:refresh-model-lifecycle` (réseau ; non intégré à la CI). `allowedRetiredInCatalog` est un mécanisme à cliquet de résorption : n’ajoutez une entrée qu’avec un ticket de suivi.                                                                                                                                                                                                                | Oui                                        |
| `check:fetch-targets`             | Chaque `fetch("/api/...")` dans le répertoire client `src/` correspond à un véritable `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oui                                        |
| `check:deps`                      | Toutes les dépendances installables via `npm install` dans chaque `package.json` du dépôt figurent dans `dependency-allowlist.json` ; les nouveaux packages non épinglés ou issus d’un détournement par nom similaire sont signalés                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Oui                                        |
| `audit:deps`                      | `npm audit` (racine + Electron) — aucun avis de sécurité de gravité élevée/critique (chevauche le contrôle OSV `check:vuln-ratchet` ; voir la liste des rationalisations en attente)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oui                                        |
| `check:lockfile`                  | intégrité `package-lock.json` registre https —, hachages d'intégrité, aucun remplacement d'hôte                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oui                                        |
| `check:licenses`                  | liste d'autorisation de licence SPDX pour les dépendances de production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oui                                        |
| `check:tracked-artifacts`         | Aucun artefact de construction / liens symboliques `node_modules` validés (fonctionne également dans le pré-commit husky ; le pré-push est intentionnellement léger — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Oui                                        |
| `check:ai-attribution`            | Pas de bande-annonce AI/bot `Co-Authored-By` ou de pied de page de génération AI dans les commits PR, le titre ou le corps — Hard Rule #16 (dans la boucle `quality.yml` fast-gates pour PR→ `release/**` — lit la charge utile de l'événement, no-op off PRs — et une étape PR uniquement dans `ci.yml` lint pour PR→ `main`; également le husky crochet `commit-msg` ; co-auteurs humains autorisés #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Chaque exclusion Vitest nomme un problème de suivi et apparaît dans `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oui                                        |
| `check:file-size`                 | Les fichiers sources (`.ts`/`.tsx` dans `src/`, `open-sse/`, `electron/`, `bin/`) restent dans `cap` et les fichiers de test (`*.test.ts(x)`) dans `testCap`; les fichiers gelés dans `file-size-baseline.json` (`frozen` / `testFrozen`) ne doivent pas dépasser leur taille enregistrée                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oui                                        |
| `check:error-helper`              | Les réponses d'erreur dans executors/handlers utilisent `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oui                                        |
| `check:migration-numbering`       | Les fichiers de migration SQL sont numérotés de manière séquentielle, sans lacunes ni doublons                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Oui                                        |
| `check:public-creds`              | Pas de clés littérales OAuth `client_id`/`client_secret` ou Firebase Web en dehors de `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oui                                        |
| `check:db-rules`                  | Pas de SQL brut en dehors des modules `src/lib/db/` ; pas d'importation de barils depuis `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Oui                                        |
| `check:known-symbols`             | Les exécuteurs du fournisseur, les stratégies de routage et les traducteurs enregistrés dans leurs tables de répartition correspondent aux fichiers sur le disque — pas de symboles orphelins ou non déclarés                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui                                        |
| `check:route-guard-membership`    | Chaque route qui génère un processus enfant est classée par `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oui                                        |
| `check:test-discovery`            | Chaque fichier `*.test.ts` / `*.spec.ts` du dépôt est collecté par au moins un exécuteur de tests (mécanisme à cliquet : la liste des fichiers orphelins dans `test-discovery-baseline.json` ne peut que diminuer)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oui                                        |
| `check:test-tla-order`            | Aucun fichier `node:test` sous `tests/unit` n’enregistre un test, n’atteint un `await` de niveau supérieur, puis n’enregistre d’autres tests (#18045 ; mécanisme à cliquet : `test-tla-order-allowlist.json` ne peut que diminuer)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oui                                        |
| `check:agent-skills-sync`         | Les artefacts agent-skills générés correspondent à leur catalogue source (aucune dérive)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | Les logos/ressources des fournisseurs disposent d’une entrée de provenance enregistrée                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | Les fichiers de configuration JSON sont analysés correctement et respectent les règles de lint du dépôt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | Compilation TypeScript sans erreur (avertissements à titre indicatif uniquement)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oui                                        |
| `typecheck:noimplicit:core`       | `noImplicitAny` strict — tourné vers l’avenir ; de nombreux sites d’appel préexistants nécessitent encore des annotations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **Informatif** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limité à `src/app/(dashboard)/**` (#7033) — la liste d’autorisation de 27 fichiers soigneusement sélectionnés de `typecheck:core` n’inclut aucun TSX du tableau de bord, et `next build` n’y effectue jamais non plus de vérification de types (`next.config.mjs` définit `ignoreBuildErrors: true`) ; les régressions d’identifiants orphelins à cet endroit (#6625/#6909) étaient donc invisibles pour la CI. Compare les résultats à une référence figée du nombre d’erreurs par fichier et par code TS (`config/quality/dashboard-typecheck-baseline.json`, selon le même modèle de détection d’obsolescence que `check:known-symbols`) — seules les NOUVELLES erreurs dépassant le nombre de référence font échouer le contrôle ; réduisez progressivement la référence avec `--update` lorsqu’une erreur préexistante est corrigée.                                                                                                                                                                                                                                                                                                                                                                    | Oui                                        |
| `check:build-typecheck`           | Vérification des types de production sur l’ensemble de l’application via `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), couvrant la surface que la liste d’autorisation de 27 fichiers de `typecheck:core` et le contrôle du tableau de bord ne couvrent pas. Compare les résultats à `config/quality/build-typecheck-baseline.json` ; un nombre nouveau ou accru pour une paire (fichier, code) entraîne un échec, tandis qu’un nombre inférieur demande de réduire la référence. `--update` refuse de s’exécuter si le résultat contient une paire nouvelle ou accrue, sauf si `--force-regressions` est fourni, et refuse qu’un fichier nouvellement désactivé soit ajouté, sauf si `--force-nocheck` est fourni ; élargir la référence pour obtenir un résultat positif et accorder une désactivation permanente constituent ainsi deux actes délibérés distincts. Une option `--force` seule est rejetée. Analyse également la portée de compilation à la recherche de `@ts-nocheck` par rapport à `config/quality/ts-nocheck-baseline.json`, car un fichier qui l’utilise ne signale aucun diagnostic et serait autrement invisible pour tous les contrôles. | Oui                                        |

#### Deux programmes de vérification des types donnent des réponses différentes

`typecheck:core` et `check:build-typecheck` compilent des programmes différents avec des
options différentes, et un même fichier peut ne présenter aucune erreur dans l’un et en
contenir de nombreuses dans l’autre.

`tsconfig.build.json` définit `"strict": false`, donc `noImplicitAny` est désactivé. La
configuration principale compile une liste d’autorisation soigneusement sélectionnée de
27 fichiers avec des options plus strictes et suit le graphe d’importation de chaque
entrée ; les fichiers qui n’apparaissent jamais dans le programme de compilation y sont
donc tout de même vérifiés.

Cette conséquence est importante pour déterminer si un fichier est typé : **zéro diagnostic
avec `check:build-typecheck` ne signifie pas zéro**. La suppression de `@ts-nocheck` dans 26
fichiers a montré que 23 d’entre eux ne présentaient aucune erreur dans le programme de
compilation ; seize de ces fichiers ont fait apparaître environ 120 erreurs de type
implicite dans le programme strict. Vérifiez les deux avant de considérer qu’un fichier
ne présente aucune erreur.

### Tâche : `quality-gate`

S’exécute après `test-coverage`. Bloque la fusion en cas d’échec.

| Script                       | Valide                                                                                                                                                                                             | Bloquant                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Génère `quality-metrics.json` (nombre d’avertissements ESLint, couverture issue du rapport fusionné des fragments)                                                                                 | Oui (en amont du cliquet) |
| `quality:ratchet`            | Chaque métrique de `quality-baseline.json` n’a pas régressé (avertissements ESLint ≤ référence ; couverture ≥ référence)                                                                           | Oui                       |
| `check:duplication`          | La duplication de code (jscpd@4) ne dépasse pas la référence définie dans `quality-baseline.json`                                                                                                  | Oui                       |
| `check:complexity`           | La complexité cyclomatique au niveau des fichiers ne dépasse pas le plafond (règles ESLint de base `complexity` + `max-lines-per-function`)                                                        | Oui                       |
| `check:cognitive-complexity` | Cliquet de complexité cognitive (`eslint-plugin-sonarjs`) — passe ESLint distincte ; la CI exécute les deux conjointement dans l’unique étape `check:complexity-ratchets`                          | Oui                       |
| `check:dead-code`            | Le cliquet des exports/fichiers inutilisés (knip) ne régresse pas par rapport à la référence                                                                                                       | Oui                       |
| `check:compression-budget`   | Budget du benchmark de compression — les seuils minimaux d’économie de jetons par moteur ne doivent pas régresser                                                                                  | Oui                       |
| `check:type-coverage`        | Le cliquet du pourcentage typé (`type-coverage`) ne régresse pas ; il couvre en grande partie `typecheck:noimplicit:core`                                                                          | Oui                       |
| `check:codeql-ratchet`       | Le nombre d’alertes CodeQL ouvertes ne régresse pas (lecture via `gh api` ; ignoré proprement sans jeton) — fréquence d’actualisation et déclenchement manuel : voir « Cliquet CodeQL » ci-dessous | Oui                       |

### Tâche : `quality-extended`

L’ensemble de la tâche est consultatif (`continue-on-error: true`). Les cliquets basés sur npm s’exécutent
réellement ; les scanners externes s’installent via `gh release download` et s’ignorent eux-mêmes (code de sortie 0)
lorsqu’un binaire est toujours absent.

| Script                   | Valide                                                                                                                                                                                                                                                                             | Bloquant                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `check:circular-deps`    | Aucune dépendance circulaire (dpdm)                                                                                                                                                                                                                                                | **Consultatif**                                        |
| `check:bundle-size`      | La taille du bundle ne dépasse pas le plafond                                                                                                                                                                                                                                      | **Consultatif**                                        |
| `check:secrets`          | Analyse des secrets (gitleaks) — ignorée si le binaire est absent                                                                                                                                                                                                                  | **Consultatif**                                        |
| `check:vuln-ratchet`     | Les vulnérabilités des dépendances (osv-scanner) ne régressent pas — ignoré si le binaire est absent                                                                                                                                                                               | **Consultatif**                                        |
| `check:workflows`        | Lint des workflows (actionlint + zizmor) ; les scanners manquants/défectueux, les rapports non valides ou l’absence de référence du cliquet provoquent un échec avec le statut INCOMPLETE. Les résultats valides suivent la politique stricte/consultative/de cliquet sélectionnée | Exécution requise ; cliquet zizmor bloquant dans la CI |
| `check:openapi-breaking` | Modifications incompatibles du contrat d’API publique (`openapi.yaml`) par rapport à la branche de base (oasdiff) — génère `openapiBreaking=N` ; ignoré si oasdiff est absent ou si la spécification de base ne peut pas être résolue                                              | **Consultatif**                                        |

### Tâche : `docs-sync-strict`

S’exécute sur chaque PR vers `main`. Bloque la fusion en cas d’échec.

| Script                         | Valide                                                                                                                                                                                                                       | Bloquant                     |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | Méta-contrôle qui exécute séquentiellement les 6 sous-contrôles ci-dessous                                                                                                                                                   | Oui                          |
| ↳ `check:docs-sync`            | Cohérence des versions entre CHANGELOG / OpenAPI / llm.txt                                                                                                                                                                   | Oui                          |
| ↳ `check:docs-counts`          | Les nombres indiqués dans le texte (nombre de fournisseurs, nombre de migrations, etc.) restent dans la fenêtre de cliquet des nombres réels                                                                                 | Oui                          |
| ↳ `check:env-doc-sync`         | Chaque variable d’environnement de `.env.example` est documentée dans un tableau de la documentation, et inversement                                                                                                         | Oui                          |
| ↳ `check:deprecated-versions`  | Aucune chaîne de version obsolète dans la documentation                                                                                                                                                                      | Oui                          |
| ↳ `check:doc-links`            | Les liens markdown internes de la documentation pointent vers des fichiers réels (forme `[text]`/`(path)`)                                                                                                                   | Oui                          |
| ↳ `check:fabricated-docs`      | Les routes, variables d’environnement, commandes CLI, noms de hooks et chemins de fichiers cités dans la documentation existent dans la base de code. Contrôle strict via `--strict` ; échec non bloquant sans cette option. | Oui (via `--strict` dans CI) |
| `check:cli-i18n`               | Les chaînes des commandes CLI sont présentes dans tous les fichiers de paramètres régionaux i18n                                                                                                                             | Oui                          |
| `check:openapi-coverage`       | La spécification OpenAPI couvre au moins un seuil plancher à cliquet des routes réelles                                                                                                                                      | Oui                          |
| `check:openapi-security-tiers` | Les annotations de niveaux de sécurité dans `openapi.yaml` sont cohérentes avec les classifications de `routeGuard.ts`                                                                                                       | **Consultatif**              |
| `check:openapi-routes`         | Chaque chemin de `openapi.yaml` correspond à un véritable `route.ts` (anti-hallucination)                                                                                                                                    | Oui                          |
| `check:docs-symbols`           | Chaque référence `/api/...` dans `docs/**/*.md` correspond à un véritable `route.ts` (anti-hallucination)                                                                                                                    | Oui                          |
| `i18n translation drift`       | Clés non traduites dans les fichiers de paramètres régionaux i18n — avertissement uniquement                                                                                                                                 | **Consultatif**              |

Les douze fichiers SVG du README sous `docs/diagrams/` sont générés (`scripts/docs/gen-readme-<name>.mjs` ;
`npm run docs:readme-diagrams` les régénère tous). Chacun dispose d’un test unitaire de comparaison octet par octet
(`tests/unit/docs/readme-*-svg.test.ts`, tâche `test-unit`) qui échoue lorsque le fichier validé dans le dépôt est
obsolète, et `check:docs-counts` lit les nombres de référence depuis leurs nœuds `<text>` — c’est pourquoi l’étape de
vectorisation conserve chaque chaîne vectorisée dans le fichier sous forme de `<text>` invisible. Le contrôle des nombres de référence des SVG lit les fichiers répertoriés dans
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) : `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, ainsi que `public/images/tier-flow-dark.svg` et `tier-flow-light.svg` ; les
affirmations concernant la gratuité permanente, les entrées du catalogue, le pool récurrent et les facteurs de notation lisent également
`promise-pillars.svg`, `free-tier-budget.svg` et `strategies-grid.svg`. `free-tier-budget.svg`
tire ses chiffres du chargeur de catalogue actif ; ainsi, toute modification de `FREE_MODEL_BUDGETS` ou du
nom d’affichage d’un fournisseur fait échouer CI jusqu’à ce que ce fichier soit régénéré.

### Tâche : `i18n-ui-coverage`

| Script                             | Valide                                                                                                                                                                                                                                | Bloquant        |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (intégré) | La couverture des clés i18n de l’interface utilisateur est ≥ 65 %                                                                                                                                                                     | Oui             |
| `check-ui-value-drift` (intégré)   | Une **valeur** anglaise réécrite ne laisse derrière elle aucune traduction obsolète                                                                                                                                                   | Oui             |
| `check-new-key-coverage` (intégré) | Une **nouvelle** clé anglaise est traduite dans chaque paramètre régional — un marqueur `__MISSING__:` est rejeté                                                                                                                     | Oui             |
| `check-translation-ratio`          | Le taux de traductions réelles par paramètre régional (valeurs identiques à l’anglais / espaces réservés / éléments manquants hors liste d’autorisation) ne doit pas dépasser `config/quality/i18n-translation-baseline.json` + marge | **Consultatif** |

Nécessite `fetch-depth: 0` — le contrôle de dérive des valeurs compare `en.json` à la base de fusion.

#### `check-ui-value-drift` — contrôle des traductions obsolètes

Détecte la régression i18n que les autres portes ne peuvent structurellement pas voir : une valeur anglaise est réécrite et les traductions dérivées de l'anglais _précédent_ restent en arrière, de sorte que les utilisateurs non anglais continuent de lire une copie rédigée avec confiance et désormais erronée.

Ceci a été expédié pour de vrai. `oauthModal.googleOAuthWarning` a été réécrit lorsque l'assistant de connexion Antigravity a atterri (#5203);** 39 sur 43 localités** conservé le texte indiquant aux opérateurs de "copier le URL complet et de le coller ci-dessous" — un flux qui ne peut pas être terminé pour ce fournisseur. C'est passé inaperçu jusqu'à #8463 car :

- `sync-ui-keys` ne remplit que les clés qui sont** absent** , jamais ceux qui sont** vicié** ;
- `check-ui-keys-coverage` compte la _présence_ de clé, donc une traduction obsolète est considérée comme couverte ;
- `check-translation-drift` suit la documentation `docs/i18n/<locale>/**.md` et reflète — il ne lit jamais `src/i18n/messages/*.json`. Blocage dans le travail `docs-sync-strict` depuis la resynchronisation 2026-09 : modifier un document de base → `npm run i18n:run -- --files=<doc>` (au niveau de la section, bon marché).

**Prise en compte des différences, non basée sur une ligne de base.** Il compare `en.json` à la base de fusion avec l'arbre de travail ; pour chaque clé dont la valeur anglaise a changé, toute langue contenant encore une traduction intacte est obsolète. Ceci délibérément** gèle la dette préexistante** — a diff ne peut pas révéler de quel vieil anglais provient une traduction de longue date, donc la porte juge uniquement ce que touche le changement actuel. L'alternative (une ligne de base de hachage par clé) coûterait un fichier généré ~ 600 KB, 3 × la plus grande ligne de base existante, tournant sur chaque i18n PR.

Deux façons de le satisfaire :

1. mettre à jour les traductions concernées, ou
2. définissez-les sur `__MISSING__:<new english>` — le moteur d'exécution sert ensuite l'anglais corrigé (`src/i18n/request.ts::deepMergeFallback`, #7258) et les files d'attente de clés pour la traduction.

Si la chaîne est** signification** changé, préfère** renommer la clé** : une nouvelle clé ne peut pas hériter d'une traduction obsolète. C'est le modèle utilisé par #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Quitte 0 avec `SKIP reason=base-unresolved` lorsque le catalogue de base ne peut pas être lu (clone superficiel sans la référence de base), en miroir `check-openapi-breaking`.

### Emploi : `i18n`

Matrice de validation i18n complète (une tâche par locale). L'ensemble du travail est consultatif.

| Scénario                        | Valide                                  | Blocage                                                         |
| ------------------------------- | --------------------------------------- | --------------------------------------------------------------- |
| `validate_translation.py quick` | Intégralité de la traduction par langue | **Consultatif** (`continue-on-error: true` sur tout le travail) |

### Emploi : `pr-test-policy`

S'exécute uniquement sur les demandes d'extraction.

| Scénario               | Valide                                                                                                                                       | Blocage |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PRs qui modifie le code de production dans `src/`, `open-sse/`, `electron/` ou `bin/` doit inclure ou mettre à jour les tests (Hard Rule #8) | Oui     |
| `check:test-masking`   | Les fichiers de test modifiés ne réduisent pas le nombre net d'assertions et n'ajoutent pas de tautologies `assert.ok(true)`                 | Oui     |
| `check:pr-evidence`    | le corps PR cite des preuves test/VPS pour le changement (mécanise Hard Rule #18 en saisissant la prose PR — fragile, voir Backlog)          | Oui     |

### Emploi : `test-vitest`

Fonctionne après `build`. Les blocs fusionnent en cas d'échec.

| Suite            | Valide                                                     | Blocage                                                                                                                             |
| ---------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | serveur MCP (110 outils), autoCombo, cache — vitest runner | Oui                                                                                                                                 |
| `test:vitest:ui` | test de composants UI — vitest runner                      | **Blocage** les échecs préexistants — sont explicitement exclus dans `vitest.config.ts`; de nouveaux échecs font échouer le travail |

### Flux de travail nocturnes (programmés, consultatifs)

Ceux-ci fonctionnent selon un planning cron (et `workflow_dispatch`), jamais sur PRs. Tous sont consultatifs.

| Workflow               | Valide                                                                                                                                                                                               | Bloquant        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | tests de propriétés fast-check avec une graine aléatoire et un nombre élevé d’exécutions                                                                                                             | **Consultatif** |
| `nightly-resilience`   | seuil de croissance du tas, injection chaotique de défaillances, test de charge/d’endurance k6                                                                                                       | **Consultatif** |
| `nightly-llm-security` | protection promptfoo contre les injections (mode blocage) + sondes garak (ignorées sans secret de fournisseur)                                                                                       | **Consultatif** |
| `nightly-schemathesis` | fuzzing du contrat OpenAPI (schemathesis) sur une instance OmniRoute active à l’aide de `docs/openapi.yaml` — détecte les violations de la spécification et les erreurs 500 non gérées (Phase 8 B.4) | **Consultatif** |
| `nightly-mutation`     | score des tests de mutation Stryker sur la voie rapide des tests unitaires — les mutants survivants révèlent des assertions insuffisantes                                                            | **Consultatif** |
| `nightly-compat`       | matrice de compatibilité du moteur Node pour les plages `engines.node` prises en charge                                                                                                              | **Consultatif** |

Les valeurs de référence des performances (tas, TTFB, durée de build) sont enregistrées, mais ne servent pas de seuil bloquant : consultez [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Phase de vélocité (2026-08-30 → v4.0 LTS) : tous les seuils de référence assouplis de 20 %

Décision du responsable (2026-08-30) : jusqu'à la modularisation de la v4.0, la rapidité de livraison compte davantage
que la maîtrise de la dette. Chaque seuil de référence **numérique** à effet de cliquet a été assoupli de 20 % en une
seule passe auditable, et la phase est déclarée dans `config/quality/quality-baseline.json` :

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Ce qui a changé                                                                                                                                                                                                                                                | Emplacement                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — nombres où une valeur inférieure est préférable ×1,2, pourcentages où une valeur supérieure est préférable ÷1,2 (plancher de couverture maintenu à 60, `eslintErrors` reste à 0, `eslintWarnings` 0 → 20 % du nombre figé de suppressions) | `quality-baseline.json` (la note `_relax_velocity_2026_08_30` répertorie chaque valeur avant → après)  |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                                                               | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, chaque plafond de lignes `frozen[*]` / `testFrozen[*]` ×1,2                                                                                                                                                                                  | `file-size-baseline.json`                                                                              |
| nombres par fichier / par code TS ×1,2                                                                                                                                                                                                                         | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                            | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` devient consultatif lorsque `_policy.requireTighten === false`                                                                                                                                                                             | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| la tâche nocturne `bank-ratchet-shrinks` est suspendue (elle enregistrerait la réduction mesurée et annulerait la marge)                                                                                                                                       | `.github/workflows/nightly-release-green.yml`                                                          |

Les listes d'autorisation (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) ne sont **pas** des budgets et n'ont pas été modifiées. Les barrières de validation de réussite/échec (secrets, règles SQL,
contrat documentation/environnement, parité i18n, tests unitaires) restent inchangées — un test rouge reste un test rouge.

**Outillage**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — l'assouplissement
  ponctuel (`scripts/quality/relax-baselines.mjs`) ; refuse de s'exécuter deux fois avec la
  même note.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mesure chaque barrière numérique de la même manière que la CI et affiche la marge restante pour chaque barrière
  (`scripts/quality/baseline-headroom.mjs`). La tâche nocturne `baseline-headroom` publie
  le tableau dans le résumé de l'exécution du workflow et téléverse son rapport JSON/Markdown sous le nom
  `baseline-headroom-<run_id>`, conservé pendant 90 jours. Les lignes d'avertissement et critiques identifient les barrières
  situées à moins de 10 % de leur plafond ou l'ayant déjà dépassé. Consultez ces rapports comme système d'alerte précoce
  concernant la consommation des budgets ; examinez les notes `_rebaseline_*` de la barrière en cause. La tâche ne
  crée ni ne met plus à jour de ticket permanent ; #12149 conserve l'historique des rapports antérieurs.

**Mode nouveau code (Clean-as-You-Code) — depuis le 2026-08-30, chemin rapide réservé aux PR**

Lors des événements `pull_request`, `quality.yml` transmet `--base-ref <PR base SHA>` à `check:file-size`,
`check:complexity-ratchets` et `check:dead-code`. Pour `check:complexity-ratchets` et
`check:dead-code`, la barrière compare HEAD à la base de fusion, **uniquement pour les fichiers modifiés par la PR**
(`scripts/check/newCodeMode.mjs` : la base de fusion est matérialisée dans un
`git worktree` temporaire, ESLint/knip s'exécutent à cet emplacement et sur HEAD, puis les nombres par fichier sont comparés) :

- **bloquant** — la PR a ajouté des violations de complexité cyclomatique/cognitive ou des exports morts dans les fichiers qu'elle a modifiés
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` dans le journal) ;
- **consultatif** — le total global par rapport au seuil de référence figé. Une dérive héritée ne fait jamais échouer
  une PR qui n'en est pas responsable ; la dérive est à nouveau figée lors de la réconciliation de la version et surveillée par la tâche de suivi de la marge.

`check:file-size` utilise la référence de base selon ses propres règles (`scripts/check/check-file-size.mjs`, #8522) :
il vérifie chaque fichier source et de test de l'arborescence, lit le nombre de lignes de chacun à la base de la PR
avec `git show`, et ne fait échouer un fichier que lorsqu'il dépasse la plus grande valeur entre son plafond de référence
(`frozen` / `testFrozen`, ou `cap` / `testCap` pour un fichier absent du référentiel)
et sa taille de base. Un fichier ayant déjà dérivé dans la base ne fait donc jamais échouer une PR qui n'en est pas responsable.

`check:boundary:ratchet` applique la même règle à son unique nombre
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`) : lors des événements de PR, les contrôles rapides de
`quality.yml` et la tâche de lint de `ci.yml` transmettent tous deux le SHA de base de la PR, le commit de base est
mesuré à partir d’un export `git archive`, et la PR échoue uniquement lorsque son nombre d’arêtes
`open-sse → src` dépasse la plus grande valeur entre `metrics.boundaryOpenSseToSrc` et le nombre de la base. Une dérive
de la base au-dessus du plafond est signalée (`base drift herdado`), mais ne met jamais en échec une PR qui n’en est pas responsable ; un push → main
conserve le plafond absolu, et un SHA de base impossible à résoudre entraîne un retour à celui-ci avec un avertissement.

Les exécutions `workflow_dispatch`, la vérification complète « release-green » et la tâche nocturne de marge n’ont pas de base de PR
et conservent la comparaison absolue (globale). La couverture, la duplication et la couverture des types restent globales
pour l’instant (leurs outils ne produisent pas de diff par fichier à moindre coût) — elles sont candidates au même traitement.

**Clôture de la phase à la v4.0 (LTS = plus stricte qu’avant, et non « retour à la normale »)**

1. Sur le tip pur de `release/v4.0.0` : `npm run quality:headroom --json` pour consignation, puis
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, ainsi que
   `--update` pour chaque contrôle de typecheck — chaque référence de base descend à la valeur mesurée.
2. Supprimer `_policy` de `quality-baseline.json` (réactive `--require-tighten` et la mise en réserve
   nocturne), restaurer `THRESHOLD = 36` (ou plus) dans `check-openapi-coverage.mjs`.
3. Resserrer au-delà des valeurs mesurées là où la modularisation a porté ses fruits : ramener le `cap`
   de taille de fichier à 1000 (ou 800), augmenter les seuils minimaux de couverture de 5, et fixer les exports morts à 0 pour les packages modularisés.

## Référence à effet de cliquet (`quality-baseline.json`)

Le moteur à effet de cliquet (`scripts/quality/check-quality-ratchet.mjs`) lit `quality-baseline.json`
et le compare au fichier `quality-metrics.json` nouvellement généré. Toute métrique qui régresse
au-delà de son epsilon fait échouer le build.

Métriques actuellement suivies :

| Métrique              | Direction | Signification                                           |
| --------------------- | --------- | ------------------------------------------------------- |
| `eslintWarnings`      | `down`    | Le nombre d’avertissements ESLint ne doit pas augmenter |
| `coverage.statements` | `up`      | La couverture des instructions ne doit pas diminuer     |
| `coverage.lines`      | `up`      | La couverture des lignes ne doit pas diminuer           |
| `coverage.functions`  | `up`      | La couverture des fonctions ne doit pas diminuer        |
| `coverage.branches`   | `up`      | La couverture des branches ne doit pas diminuer         |

Pour mettre à jour la référence après une amélioration réelle :

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

L’option `--update` écrit les valeurs actuellement mesurées dans `quality-baseline.json`.
Validez ce fichier avec la modification qui a amélioré la métrique. Une PR qui améliore une
métrique sans mettre à jour la référence sera détectée par `--require-tighten` (Phase 6A.5,
implémentation en attente).

### Cliquet CodeQL : fréquence d’actualisation et déclenchement manuel

`check:codeql-ratchet` lit **l’état du dépôt, actualisé selon une planification — et non pour chaque PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` indique
`state: configured`, `schedule: weekly` : il s’agit de l’analyse de configuration par défaut de GitHub,
et non d’une analyse effectuée à chaque push. Conséquence : après la fusion d’une PR qui CORRIGE des
alertes, le cliquet continue de lire l’ancien nombre, plus élevé, jusqu’à l’exécution de la prochaine
analyse planifiée — il signale donc une régression sur chaque PR ouverte, y compris sur les PR de suivi
de la PR corrective elle-même, jusqu’à ce que l’analyse soit actualisée.

**Actualisation manuelle** : `gh workflow run codeql.yml --ref release/vX.Y.Z` relance
l’analyse et republie les alertes en quelques minutes. Lisez d’abord `.github/workflows/codeql.yml`
— son en-tête explique qu’il utilise uniquement `workflow_dispatch` **car il entre en conflit avec
la « configuration par défaut » de GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). La restauration des déclencheurs `push`/`pull_request`/
`schedule` nécessite d’abord une **action du propriétaire** : Settings → Code security →
CodeQL: Default → Advanced. N’ajoutez pas de déclencheur `schedule:` sans effectuer ce changement —
cela ne produirait que des exécutions en échec.

**Resserrez la référence après la baisse du nombre** — `node scripts/check/check-codeql-ratchet.mjs
--update` écrit le nouveau nombre mesuré dans `quality-baseline.json` →
`metrics.codeqlAlerts.value`, afin que le cliquet n’autorise pas silencieusement une régression jusqu’à
l’ancien plafond. Exemple concret (2026-09-02/03) : la PR #12502 a corrigé 7 alertes réelles
(13 → 6 alertes ouvertes mesurées) ; la PR #12530 a resserré la référence figée de 11 → 6 pour
la faire correspondre ; les 6 alertes restantes ont ensuite été rejetées avec une justification
propre à chacune, ramenant leur nombre à 0 alerte ouverte.

**Les rejets relèvent de la décision de l’opérateur (Règle stricte nº 14)** — ne rejetez jamais une
alerte CodeQL sans consigner la justification technique dans le commentaire de rejet : `won't fix`
pour une exigence d’un protocole en amont, `used in tests` pour une fixture de test, `false positive`
pour un assainisseur que CodeQL ne peut pas détecter (précédent : `docs/security/ERROR_SANITIZATION.md`).

---

## Politique de nouvelle tentative des tests (WS5.4, v3.8.49)

Les nouvelles tentatives sont configurées par runner, jamais globalement — une nouvelle tentative globale transforme de véritables régressions
en instabilités invisibles :

| Runner           | Politique                                                                                                                                                             | Pourquoi                                                                                                                                                                            |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` uniquement dans la CI, avec `trace: on-first-retry`                                                                                                      | La temporisation du navigateur/réseau est réellement non déterministe ; une nouvelle tentative avec une trace transforme une instabilité en artefact exploitable pour le diagnostic |
| Vitest           | AUCUNE nouvelle tentative globale. Un test dont l'instabilité est avérée reçoit une nouvelle tentative explicite par test (visible dans le diff, examinée dans la PR) | Conserve la liste de quarantaine dans le dépôt, sans jamais la rendre opaque                                                                                                        |
| node:test (unit) | AUCUNE nouvelle tentative, sans exception                                                                                                                             | Un test unitaire instable est un bug dans le test — corrigez-le, ne le relancez pas au hasard                                                                                       |

SLO cibles une fois la télémétrie des instabilités disponible (WS5.2/5.3) : taux d'instabilité <1 % par test
(seuil « corriger maintenant »), taux de réussite ≥95 % par pipeline. Valeurs de référence du secteur —
à recalibrer d'après nos propres mesures.

## Dérive des cliquets au niveau de la release (WS5.5, v3.8.49)

Lorsqu'un cliquet (taille de fichier, complexité, avertissements eslint) régresse sur la pointe PURE de la release
— c'est-à-dire que la COMBINAISON des fusions l'a fait régresser et qu'aucune PR prise isolément ne reproduit
la régression sur sa propre branche — la correction incombe au **responsable de la release, une seule fois, sur la
branche de release** : privilégiez l'extraction ou le refactoring ; ne redéfinissez la référence qu'avec l'entrée
de justification documentée. Ne reportez jamais une dérive combinée sur la PR d'un contributeur et ne
redéfinissez jamais la référence pour chaque PR (cela masque les véritables régressions). Commencez par faire
la distinction : reproduisez l'échec sur la pointe pure dans un worktree d'investigation avant de supposer que votre PR l'a causé.

## Enregistrement des réductions de cliquets — la direction descendante (#8584)

Le cliquet n'est qu'à moitié automatique, et c'est la mauvaise moitié. **Augmenter** une limite consiste en une
modification JSON manuelle qui prend dix secondes et constitue le moyen le plus rapide de débloquer une PR en échec.
**Réduire** une limite exige que quelqu'un exécute `--update` et commite le résultat — et jusqu'à l'arrivée
du job `bank-ratchet-shrinks`, aucun workflow ne le faisait. Conséquence mesurée
(2026-07-25) : 18 fichiers gelés se trouvent déjà au niveau ou en dessous de la limite de 800 lignes pour les nouveaux fichiers, le pire
étant à 132× (`src/shared/validation/schemas.ts`, 19 lignes pour une limite de 2 523) ; le
plafond de complexité est passé de `1794 → 2169` au fil d'environ 37 notes de redéfinition de référence, avec exactement une
diminution (−1) ; et « resserrer via `--update` au prochain cycle » a été écrit 31 fois et respecté
une seule fois. Une limite qui survit au code qui l'a justifiée transforme silencieusement chaque
décomposition achevée en marge de croissance pour la prochaine personne qui modifiera le fichier.

`nightly-release-green.yml` → le job **`bank-ratchet-shrinks`** referme cette boucle :

|             |                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Exécuté sur | `schedule` (3×/jour) + `workflow_dispatch` — délibérément **pas** sur `push`                                                     |
| Mesure      | la branche `release/vX.Y.Z` la plus élevée, avec la même résolution et la même protection contre l'injection que `release-green` |
| Écrit       | `check:file-size --update` et `check:complexity-ratchets --update` (tous deux uniquement réducteurs par conception)              |
| Vérifie     | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                         |
| Livre       | une seule PR toujours à jour ciblant la branche de release — mise à jour forcée, sans jamais générer de spam                     |

L'enregistrement est effectué par lots plutôt qu'à chaque push, car il n'a aucune exigence de latence (une réduction
enregistrée sous 8 h convient), tandis qu'une exécution à chaque fusion reconstruirait la branche de la PR à plusieurs reprises
pendant les campagnes de fusion et paierait à chaque fois le coût d'un parcours ESLint complet. La détection reste déclenchée lors du
push (`release-green`) ; seul l'enregistrement est effectué par lots.

### Le vérificateur de sécurité

Le job écrit dans les références sans surveillance ; `verify-ratchet-bank.mjs` est donc ce qui rend
cela acceptable. Il compare l'arborescence après `--update` à `HEAD` et **interrompt le job
avant qu'un commit n'existe** — sans ouvrir de PR — sauf si chaque modification correspond à l'un des cas suivants :

- une entrée numérique `frozen` / `testFrozen` **réduite** ou **supprimée**
- `complexity-baseline.json` → `count` **réduit**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **réduit**

Toute autre modification provoque un échec : augmenter un nombre, ajouter une entrée, modifier `cap`/`testCap`, ou
supprimer/réécrire une note `_rebaseline_*` (ces notes constituent la piste d'audit expliquant l'existence de chaque
plafond et sont stockées dans le même objet `frozen` que les entrées de fichiers).
Un bot capable d'augmenter une limite serait strictement pire que le statu quo. Protection contre les
régressions : `tests/unit/verify-ratchet-bank.test.ts`.

Le job n'effectue jamais de push vers `release/*` — un humain fusionne la PR, de sorte qu'une mauvaise mesure
ne puisse pas être intégrée sans examen.

## Politique de liste d’autorisation

Chaque garde qui ne peut pas échouer en raison de violations préexistantes utilise une liste d’autorisation figée
(par exemple, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). La politique est la suivante :

**Corrigez la cause racine ; n’utilisez la liste d’autorisation que lorsque la violation est préexistante et
ne peut pas être corrigée dans la même PR.**

Lors de l’ajout d’une entrée à une liste d’autorisation :

1. Incluez un commentaire avec la justification.
2. Référencez le ticket de suivi (par exemple, `// #3498 — Fonctionnalité de la phase 2, pas encore implémentée`).
3. Supprimez l’entrée dans la même PR que celle qui corrige la violation — une entrée obsolète qui ne
   masque plus une violation active constitue elle-même un défaut (le contrôle des règles obsolètes de 6A.3
   fera échouer la garde pour une entrée orpheline de la liste d’autorisation une fois implémenté).

N’ajoutez **pas** d’entrées à la liste d’autorisation pour accélérer la réussite des tests. Une garde au vert avec une
liste d’autorisation qui s’allonge donne une fausse impression de qualité.

### Lorsqu’une garde échoue sur votre PR

1. **Lisez attentivement la sortie de la garde** — elle vous indique précisément quel fichier ou symbole a enfreint
   la règle.
2. **Corrigez la violation** — la plupart des gardes sont des vérifications déterministes du système de fichiers qui réussissent dès que
   le code est correct.
3. **Si la violation est préexistante** (c’est-à-dire que vous ne l’avez pas introduite, mais que la garde
   la couvre désormais) : ajoutez une entrée à la liste d’autorisation avec un commentaire de justification et un ticket de suivi.
4. **Si la garde est un mécanisme à seuil progressif** (couverture, avertissements ESLint, duplication, complexité) :
   votre modification a dégradé la métrique. Corrigez le problème sous-jacent ou, dans de rares cas, exécutez
   `npm run quality:ratchet -- --update` si la modification est intentionnelle et si la
   dégradation de la métrique est acceptable — mais expliquez pourquoi dans la description de la PR.
5. **Les gardes consultatives** (`continue-on-error: true`) sont informatives — elles ne bloquent pas
   la fusion, mais apparaissent dans le récapitulatif de la CI. Corrigez-les malgré tout.

---

## Ajout d’une nouvelle garde

1. Créez `scripts/check/check-<name>.mjs` (ou `.ts`). Les gardes de politique se terminent avec le code 0/1.
   Les gardes à seuil progressif émettent une métrique dans `quality-metrics.json` via `collect-metrics.mjs`.
2. Ajoutez `"check:<name>": "node scripts/check/check-<name>.mjs"` à `package.json`.
3. Intégrez-la dans `.github/workflows/ci.yml` sous la tâche appropriée
   (politique → `lint` ou `docs-sync-strict` ; seuil progressif → `quality-gate`).
4. Si elle possède une liste d’autorisation, appliquez `reportStaleEntries()` depuis
   `scripts/check/lib/allowlist.mjs` afin que les entrées obsolètes soient détectées automatiquement.
5. Écrivez un test dans `tests/unit/build/` couvrant la logique de détection de la garde.
6. Mettez à jour ce document (ajoutez une ligne au tableau de la tâche concernée).

---

## Outillage pour agents : LSP intégré à la boucle (facultatif)

Au-delà des gardes de la CI, OmniRoute fournit une structure `agent-lsp` **facultative**
(un fichier `.mcp.json` au niveau du projet, tâche 15 de la phase 7). Créez `.mcp.json`
pour exposer un serveur de langage TypeScript aux agents de programmation, afin qu’ils résolvent les symboles /
diagnostics **avant** d’écrire du code — un complément de compilation avant validation à
`typecheck:core` qui élimine à la source les erreurs de « symbole inventé ». Ce fichier n’est volontairement
pas chargé automatiquement (vous choisissez et vérifiez le pont MCP↔LSP) ; une entrée défectueuse ne fait que consigner une
erreur de connexion et n’interrompt jamais les sessions.

---

## Backlog de rationalisation (revue du ROI — Phase 9 Vague 3)

Cet inventaire a été rapproché de `ci.yml` le 2026-06-17 (la version précédente omettait
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Une revue du ROI de l’ensemble rapproché
a permis d’identifier les candidats à la rationalisation suivants. **Les fusions sont des
modifications mécaniques de la CI ; les basculements/suppressions sont des décisions de
politique réservées à l’opérateur.** Rien de ce qui suit n’est encore appliqué.

**Également non documentés ci-dessus** (consultatifs, signal faible) : la tâche `docs-lint`
(markdownlint + Vale, tâche entière avec `continue-on-error`) et les workflows d’analyse
autonomes `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` figure dans
`quality-baseline.json`, mais n’est relié à aucun cliquet bloquant dans `ci.yml` — la métrique
est actuellement orpheline.

### Fusion / déduplication (mécanique, risque plus faible)

Chaque candidat a été validé par rapport à l’état réel des contrôles le 2026-06-17 (faire
confiance, mais vérifier) ; plusieurs fusions « évidentes » se sont avérées masquer de la
dette et ne sont **pas** des remplacements directs sans risque.

- **`check:docs-sync` s’exécute deux fois** — de manière autonome dans la tâche `lint`, puis à nouveau dans `check:docs-all` (`docs-sync-strict`) et dans le hook de pré-commit husky. ✅ **TERMINÉ** — invocation autonome supprimée de `lint`.
- **Analyse des CVE** — ❌ **PAS une fusion sans risque.** `audit:deps` échoue de manière bloquante pour toute CVE élevée/critique ; `check:vuln-ratchet` (osv) échoue uniquement en cas de _régression_ par rapport à la référence (actuellement 1 MODERATE). Sémantiques différentes — supprimer `audit:deps` ferait perdre le contrôle absolu des niveaux élevé/critique. Conserver les deux.
- **Détection des cycles** — ✅ **TERMINÉ** (#15159 G-01/G-02). L’ancien texte qualifiait ici `check:cycles` de contrôle « vert, organisé » et justifiait son maintien comme contrôle bloquant parce que `check:circular-deps` (dpdm) signalait 91 cycles. Ce vert était un **faux vert** : `check:cycles` analysait 5 sous-répertoires (450 fichiers), ne détectait que les instructions statiques `import|export … from` et ignorait tous les spécificateurs `@/` et `@omniroute/open-sse/`, de sorte qu’il ne pouvait pas voir les cycles d’import dynamique et d’alias qui dominaient le dépôt. Correction effectuée : le contrôle parcourt désormais `src` + `open-sse` (5023 fichiers), collecte les spécificateurs depuis l’AST TypeScript (ainsi, `import("…")` est pris en compte, contrairement à `typeof import("…")` en position de type) et résout les `paths` de tsconfig. Il détecte **14** cycles, et non 0. Comme 14 cycles préexistants ne peuvent pas être corrigés dans une PR consacrée aux contrôles, `check:cycles` est désormais un **cliquet** (`--ratchet`, plafond `metrics.cycles.value = 14` dans `quality-baseline.json`, `direction: down`) — il bloque toute _régression_ et le nombre ne peut que diminuer. La CI exécute `npm run check:cycles:ratchet`. La résorption progressive est intégrée à **A-01**. `check:circular-deps` (dpdm) reste consultatif en tant que deuxième avis plus large.
- **Complexité** — ✅ **TERMINÉ** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`) : un seul parcours ESLint, avec des comptages par ruleId afin que les références cyclomatique+max-lines et cognitive restent indépendantes ; les commandes individuelles `check:complexity` / `check:cognitive-complexity` sont conservées pour les exécutions locales avec `--update`.
- **Anti-hallucination `/api`** — ✅ **TERMINÉ** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`) : un seul inventaire du système de fichiers pour `src/app/api`, openapi-routes + docs-symbols continuent à produire des rapports indépendants ; les commandes individuelles sont conservées pour les exécutions locales.
- **`check:node-runtime` s’exécute dans 11 tâches** — ⚠️ **faible ROI.** Chacune utilise un exécuteur distinct et le contrôle dure moins de 1 s ; économies totales d’environ 10 s, au prix de la perte d’une protection peu coûteuse pour chaque tâche. Cela ne justifie pas les perturbations.
- **`typecheck:noimplicit:core` dans le lint de la CI** — ✅ **supprimé de la tâche lint** (était consultatif avec `continue-on-error`) ; la surface de typage bloquante est `typecheck:core` + `check:type-coverage`. Script local conservé.

### Basculer / décider (politique de l’opérateur)

- `check:openapi-security-tiers` (consultatif) — ❌ **PAS directement basculable.** Il se termine avec le code 0, mais avertit que plusieurs routes `traffic-inspector` sous `LOCAL_ONLY_API_PREFIXES` ne comportent pas l’annotation `x-loopback-only: true`. Son application obligatoire nécessite d’abord l’ajout de ces annotations dans `openapi.yaml`.
- `typecheck:noimplicit:core` (consultatif) — largement couvert par le cliquet bloquant `check:type-coverage`. Le convertir en cliquet ou supprimer le second passage `tsc` redondant.
- `test:vitest:ui` (désormais **bloquant**) — les échecs préexistants sont explicitement exclus dans `vitest.config.ts` avec des commentaires de suivi `// #8618` ; les nouveaux échecs font échouer la tâche.
- `check:secrets` (gitleaks, cliquet bloquant figé à 3 faux positifs documentés) — ajouter les 3 à la liste d’autorisation pour atteindre 0, ou rétrograder le contrôle au statut consultatif. Recoupe l’analyse native des secrets de GitHub + `check:public-creds`.
- `check:pr-evidence` (bloquant, recherche du texte libre dans le corps de la PR avec grep) — risque élevé de faux positifs ; sa suppression affaiblirait l’application de la Règle stricte n° 18, il s’agit donc d’une véritable décision de politique.
- `semgrep` (workflow autonome consultatif) — recoupe CodeQL pour les familles OWASP ; relier sa référence à un cliquet ou le supprimer.

---

## Documentation connexe

- Chaîne d’approvisionnement (provenance, SBOM, Trivy, Scorecard) : [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — contrôle de parité des ensembles de clés

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, tâche `i18n-ui-coverage`).
Compare l’ensemble des clés terminales de chaque fichier `src/i18n/messages/<locale>.json` à celui de `en.json` et échoue
pour toute clé terminale absente ou supplémentaire, quelle que soit la date à laquelle elle a été ajoutée. Les espaces réservés
`__MISSING__:` sont considérés comme présents (leur contenu relève du contrôle de ratio). Il constitue le complément absolu
des deux contrôles basés sur les différences/pourcentages : `check-ui-keys-coverage` impose un seuil minimal de 80 % par
locale (43 clés absentes sur environ 13 000 donnent encore 99,7 %) et `check-new-key-coverage` évalue
uniquement les clés qu’une PR ajoute à `en.json`. Un lot de locales est généré à partir de la version de `en.json` disponible le jour
où sa branche est créée, puis sa traduction prend plusieurs jours pendant que la branche de base continue d’ajouter des clés ; la PR du lot n’ajoute elle-même
aucune clé, si bien que les deux contrôles apparentés sont restés silencieux lorsque le lot 1 (#13044) a été fusionné avec 43 clés manquantes dans neuf
locales, et le lot 2 (#13660) avec 10 clés manquantes dans huit locales (2026-09-15). Pour corriger un échec, utilisez
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ; une clé terminale `extra`
signifie que la source l’a supprimée — supprimez-la de la locale. `--warn` produit un rapport sans provoquer d’échec.
`--catalog=cli` exécute la même comparaison sur `bin/cli/locales` (`npm run i18n:check-keys:cli`) ;
les deux étapes se trouvent dans la tâche `i18n-ui-coverage`.

#### `check-new-key-coverage` — contrôle i18n des nouvelles clés

Contrôle apparenté à `check-ui-value-drift`. Ce dernier détecte une valeur anglaise qui a été **réécrite**
alors que ses traductions n’ont pas été mises à jour ; celui-ci détecte une clé anglaise qui a été **ajoutée**
sans que certaines locales ne la reçoivent.

`check-ui-keys-coverage` ne peut pas détecter ce type de problème : il impose un seuil de pourcentage par locale, et
onze clés absentes sur environ 13 000 maintiennent la couverture à 99,9 %. Un pourcentage par langue ne peut pas
exprimer « cette fonctionnalité a été livrée sans traduction » — une fonctionnalité entière peut arriver dans une nouvelle locale sans
aucun texte sans jamais faire varier ce chiffre.

L’incident qu’il formalise : la phase 3 de l’Orchestration Canvas a traduit ses onze clés dans
les 42 locales qui existaient alors. Quelques heures plus tard, le lot des langues de l’UE (#13044) a porté le dépôt
à 51 locales, et les neuf nouvelles (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ne les ont jamais
reçues. `deepMergeFallback` remplace une clé absente par sa version anglaise ; le problème s’est donc manifesté
par une interface non traduite plutôt que vide — un problème réel et silencieux par conception.

Comme son contrôle apparenté, il est **conscient des différences** : il compare l’anglais au point de divergence avec l’arborescence
de travail, de sorte que les lacunes préexistantes restent figées et que l’activation du contrôle ne nécessite aucune migration.

**Un marqueur `__MISSING__:<english>` ne satisfait pas ce contrôle (depuis le 2026-09-17).** Il constituait auparavant le
mécanisme de report documenté — l’environnement d’exécution se rabat sur un anglais correct — jusqu’à ce que huit PR de fonctionnalités du
2026-09-16 ajoutent 61 clés et placent le marqueur dans les 65 locales au lieu de les traduire : ce
contrôle les a toutes acceptées, rien n’a bloqué les PR, puis le contrôle bloquant du ratio de traductions réelles
a échoué à la pointe de la version pour tout le monde (pt-BR 3,2 % > 2,5 % + 0,5). Un marqueur est désormais considéré
comme une traduction absente. Pour corriger un échec, utilisez
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, ou
traitez toutes les locales en parallèle avec `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
compatible avec une exécution détachée et refusant de démarrer sans les variables d’environnement `OMNIROUTE_TRANSLATION_*`). Une clé qui doit rester
en anglais (nom de produit, moteur ou indicateur imposé) doit figurer dans `scripts/i18n/untranslatable-keys.json`,
jamais derrière un marqueur. `vi` interdit totalement les marqueurs (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — contrôle des tests mis de côté

Un fichier figurant dans la liste `exclude` de `vitest.config.ts` est un test qui ne s’exécute pas, mais qui donne une impression de
couverture à quiconque parcourt l’arborescence. Soixante-deux fichiers se sont accumulés derrière le commentaire
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Le ticket #8618 a été fermé le
2026-08-11 alors que la liste qu’il suivait est passée de 45 à 62 entrées, chacune des nouvelles entrées héritant d’un commentaire
renvoyant vers un ticket clos. Lorsque la liste a finalement été mesurée fichier par fichier (#13204), **51 des 62
tests réussissaient sur l’arborescence actuelle sans aucune modification du code source**.

Le contrôle exige que chaque exclusion correspondant à un fichier réel (a) indique un ticket de suivi et
(b) figure dans `config/quality/vitest-exclusions.json` avec son état mesuré, afin que tout ajout apparaisse comme une
différence vérifiable dans un fichier dédié plutôt que comme une ligne supplémentaire dans un tableau de 60 entrées. Il ne
réexécute délibérément pas les tests exclus — cela prend environ 10 minutes et relève d’une tâche périodique ; l’inventaire
consigne la date de la dernière mesure de chacun.
