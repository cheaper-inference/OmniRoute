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

## Profils d’inventaire et d’exécution des portes

### Admission des candidats

Les workflows CI et Quality Gates émettent chacun un verdict stable : `Gate / CI` et `Gate / Quality`. Leur politique d'admission versionnée énumère chaque emploi en amont comme requis ou consultatif. Une tâche requise applicable doit réussir : les résultats manquants, annulés, ignorés, en attente et inconnus ne peuvent pas établir PASS. Une classification valide de documents uniquement ou de catalogue uniquement peut rendre une voie de code inapplicable ; un projet PR n'est pas un candidat accepté. Une étiquette `hotfix` ne renonce pas aux preuves.

Les deux flux de travail couvrent PRs dans les branches main/release, les push vers `main`, la répartition manuelle et les événements de groupe de fusion. Push, dispatch et merge-group exécutent la sélection complète. Les poussées vers `release/**` ne les démarrent pas (18/10/2026) : chaque modification a déjà exécuté la matrice sur son PR et la combinaison fusionnée est le travail de Release-Green (voie hébergée `docs/ops/RUNNER_BOX.md` → ). Les forks et les groupes de fusion utilisent des exécuteurs hébergés pour les tâches qui autrement sélectionnent des exécuteurs auto-hébergés ; une capacité hébergée suffisante doit être vérifiée avant le déploiement.

Un PR ordinaire exécute la sélection rapide. Les voies `full-code` et `full-code-e2e` de la politique d'admission (E2E, Integration, Package Artefact, Electron Smoke, Bun SQLite, Ecosystem et Protocol Clients) s'exécutent uniquement sur un brouillon de file d'attente Mergify ou sur une exécution complète : `gh workflow run ci.yml --ref <branch>`.

Chaque reçu JSON identifie le SHA extrait, l'exécution et la tentative de flux de travail. Le CLI rejette une inadéquation checkout/event SHA. Les tests de workflow lient l'adhésion à la stratégie à la liste `needs` de la tâche de verdict afin qu'une voie nouvelle ou supprimée ne puisse pas disparaître silencieusement. Les reçus couvrent leur propre flux de travail, et non la publication, le déploiement ou les éléments internes d'un scanner consultatif existant. L'activation des deux noms de contrôle dans les règles de branche est une modification administrative distincte ; l’ajout de ces emplois ne protège pas en soi une succursale.

### Fusionner la file d'attente

L'étiquette `queue` envoie un PR à la file d'attente Mergify (`.mergify.yml`). Mergify ouvre un brouillon PR sur une branche `mergify/merge-queue/`, CI y exécute la sélection complète et le PR original fusionne lorsque `Gate / CI`, `Gate / Quality` et `Merge integrity (changelog + generated skills)` passent.

Mergify écrit son résumé de file d'attente dans la description du brouillon, et d'autres applications peuvent également le modifier. Un événement `pull_request` `edited` sur un tel brouillon prend son propre groupe de concurrence (`-queue-edit-<run_id>`), il ne peut donc pas annuler l'exécution réelle du brouillon et ignore la porte et la matrice. Seul `Merge integrity` fonctionne toujours. Le travail de porte ignoré porte un nom de contrôle différent, car Mergify lit un `Gate / CI` ignoré comme un échec de contrôle et retire le PR.

Après une sortie de file d'attente, un push ne remet pas toujours le PR en file d'attente. Commentez `@mergifyio queue` dessus.

### Preuve conservée dans le réducteur d'acceptation

`scripts/quality/validate-release-acceptance.mjs` réduit un plan fourni et ses manifestes ; il n’établit pas que le plan couvre l’intégralité du pipeline de libération. Ses rapports définissent explicitement `releaseAcceptance: false`, même lorsque ce plan est `VERIFIED`. Le flux de travail `release-acceptance.yml` utilise toujours des appareils fantômes, et non de véritables reçus de construction, de package, de démarrage ou de promotion.

Le CLI exige que `--evidence-root` vérifie les preuves conservées. Les fichiers sont résolus en tant que `<evidence-root>/<artifact_id>/<member>` et hachés en tant que SHA-256. Un enregistrement PASS sans preuve, un fichier manquant ou modifié, un chemin dangereux ou un lien symbolique empêche la vérification. Les fichiers manquants ne sont pas équivalents à des journaux de réussite vides. Les contrôles SHA/run/attempt existants restent indépendants : les octets correspondants ne peuvent pas récupérer un reçu périmé. L'intégrité des fichiers ne constitue pas une preuve de l'authenticité de l'exécution ou de la promotion d'un artefact.

### Inventaire d'analyse statique

L'inventaire npm-alias versionné et l'adhésion à l'analyse statique se trouvent dans `config/quality/gate-manifest.json`. Exécutez `npm run check:gate-manifest` pour valider les noms de script et les commandes exactes par rapport à `package.json`; les ajouts, les suppressions et la dérive des commandes échouent à la fois au hook local et aux tâches de classification des changements dans CI. Un alias n'est pas une tâche de workflow, une instance matricielle ou un scénario de test : ces décomptes ne doivent pas être présentés comme interchangeables.

Utilisez `npm run quality:scan -- --list` ou `npm run quality:scan:fast -- --list` pour inspecter les alias sélectionnés sans les exécuter. Le coureur invoque le point d'entrée npm, de sorte que son environnement d'exécution (y compris Bun lorsqu'il est configuré) est préservé. Le manifeste enregistre les alias en dehors de ces profils comme invoqués séparément, et les commandes de maintenance sont interdites dans les profils d'analyse en lecture seule.

Ces profils couvrent uniquement l'analyse statique. Ils ne certifient pas les tests de produits, la couverture, l'emballage, les contrôles externes ou l'acceptation complète d'un candidat. L'admission au workflow utilise les `config/quality/admission-policy.json` et `scripts/quality/admission-verdict.mjs` liés. Les profils d’observateurs de libération restent distincts ; inspecter leurs chèques et reçus applicables de manière indépendante. Les commandes statiques de l'observateur complet sont déclarées dans `config/quality/release-green-static-profile.json`, y compris `audit:deps`, la sélection des tests de mutation et les contrôles de traduction. Le chargeur valide les commandes npm par rapport aux déclarations package.json et CI/Quality modélisées ; il rejette la dérive au lieu d'exécuter des jetons shell comme arguments. La sortie SKIP/INCOMPLETE requise du scanner ne peut pas établir PASS. Le profil enregistre ses exclusions externes et ne remplace pas la couverture hébergée, les matrices de test, les packages ou les preuves de déploiement. L'inventaire en prose ci-dessous est une référence et non une preuve qu'une porte a réellement fonctionné.

Les scripts vivent sous `scripts/check/` (portes de politique) et `scripts/quality/` (moteur à cliquet). La source de vérité CI est `.github/workflows/ci.yml`.

### Libérer le chemin rapide PR (`quality.yml`)

`.github/workflows/quality.yml` complète CI sur main/release PRs, pousse vers `main`, répartit et fusionne les groupes. PRs utilise des vérifications rapides filtrées par chemin. La version en double désactivée de façon permanente a été supprimée ; les vrais contrôles build/package/boot restent dans CI. La suite unitaire et vitest fonctionnent uniquement en CI (`Unit Tests (N/8)` et `Vitest`).

| Emploi                                           | Portée                                                                                                                                                             | Blocage                        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs et docs-all                                                                                                                           | Oui                            |
| `Fast Quality Gates`                             | PRs; vérifications statiques, vérification de type, vérification de type du tableau de bord, tests unitaires impactés, tests frères et sœurs oubliés (consultatif) |
| `No new ESLint warnings`                         | PRs; protection anti-peluches sensible aux suppressions                                                                                                            | Oui, y compris les fourchettes |
| `Merge integrity (changelog + generated skills)` | PRs non brouillon ; journal des modifications et synchronisation des compétences générées                                                                          | Oui, y compris les fourchettes |

#### Rapport de tests de frères et sœurs oubliés

`npm run check:forgotten-sibling-tests` s'exécute comme une étape consultative de `Fast Quality Gates` et réutilise le résolveur d'importation derrière la carte test-impact. Pour chaque module de production modifié, il signale les chaînes `changed module/symbol -> static consumer -> candidate sibling test` déterministes lorsque le test candidat est absent du diff pull-request. Le résumé Markdown et le résultat JSON sont conservés en tant qu'artefact de flux de travail `forgotten-sibling-tests` pour l'étalonnage avant tout déploiement de blocage.

Les réexportations de barils et les importations dynamiques sont uniquement des diagnostics de résolution ; ils ne créent jamais de constatation bloquante. Les exceptions examinées sont disponibles dans `config/quality/forgotten-sibling-allowlist.json`. Chaque entrée doit nommer le test consommateur et candidat, donner une justification spécifique et lier un problème GitHub ou une pull request. Les entrées mal formées ne sont pas fermées. Les exceptions ne peuvent pas supprimer un test candidat supprimé ou un diff qui ajoute `.skip`/`.todo`; l'affaiblissement des assertions et autres masquages restent la propriété de la porte `check:test-masking` bloquant indépendamment.

### Emploi : `lint`

S'exécute sur chaque PR à `main`. Les blocs fusionnent en cas d'échec.

| Script (`npm run ...`)            | Valide                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blocage                                     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | La version Node.js se situe dans la plage prise en charge                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oui                                         |
| `check:cycles`                    | Importations circulaires sur l'ensemble de `src/` + `open-sse/` (basé sur AST, tsconfig `paths` résolu). Bare quitte 1 chaque fois qu'un cycle existe (fermé en cas d'échec depuis #15281) et répertorie le SCCs. `check:cycles:ratchet` (ce que CI exécute) se bloque lorsque le nombre dépasse le plafond `metrics.cycles` dans `quality-baseline.json` — actuellement 14, `direction: down`, donc il ne peut que tomber (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oui (cliquet)                               |
| `check:boundary`                  | Couplage `open-sse → src` : importations de fichier à fichier uniques du moteur vers l'application (`scripts/quality/measure-boundary.mjs`; la liste des bords est le backlog de remédiation core/module-split v4). Rapport consultatif = nu (identique à `quality:boundary`). `check:boundary:ratchet` (ce que CI exécute, également dans la boucle à cliquet à portes rapides `quality.yml` ) se bloque lorsque le nombre dépasse le plafond `metrics.boundaryOpenSseToSrc` dans `quality-baseline.json` — ensemencé à 771 mesuré, `direction: down`; `--update` ne fait que le baisser ; base-relative sur PRs (`--base-ref`, voir ci-dessous)                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui (cliquet)                               |
| `check:route-validation:t06`      | schémas Zod présents sur toutes les routes (politique de niveau 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Oui                                         |
| `check:any-budget:t11`            | Le nombre `@ts-expect-error // any` ne dépasse pas le budget (catraca de niveau 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oui                                         |
| `check:provider-consistency`      | Chaque fournisseur de `providers.ts` a une entrée correspondante dans `providerRegistry.ts` (et vice-versa, dans la liste autorisée)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oui                                         |
| `check:model-lifecycle`           | Les trois tables de routage gérées manuellement restent cohérentes avec l'instantané du cycle de vie enregistré (#11503) : `FITNESS_TABLE` (`taskFitness.ts`) n'obtient aucun identifiant retiré que `REGISTRY` peut acheminer ; chaque cible `BUILT_IN_ALIASES` est présente dans `REGISTRY` et absente de l'instantané retiré-id ; chaque identifiant retraité encore dans `REGISTRY` est transmis ou répertorié dans `allowedRetiredInCatalog`; et aucune source ou cible `DEFAULT_DEGRADATION_MAP` ne semble retirée dans cet instantané. Cela ne prouve pas qu'un modèle soit actuellement servi par un live en amont. Hors ligne — se compare à `config/quality/model-lifecycle.json`, actualisé à la main avec `npm run quality:refresh-model-lifecycle` (réseau ; non connecté à CI). `allowedRetiredInCatalog` est un cliquet de burn-down : ajoutez une entrée uniquement avec un problème de suivi.                                                                                                                                                                         | Oui                                         |
| `check:fetch-targets`             | Chaque `fetch("/api/...")` dans `src/` côté client se résout en un vrai `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Oui                                         |
| `check:deps`                      | Tous les dépôts `npm install` -able sur chaque `package.json` du dépôt sont en `dependency-allowlist.json`; nouveaux packages non épinglés ou slopsquattés signalés                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oui                                         |
| `audit:deps`                      | Audit npm des cinq fichiers de verrouillage indépendants (plugins racine, Electron, OpenCode, v1/v2 et fournisseur). Blocage des avis critiques ; les avis élevés restent des avertissements visibles. les audits Missing/failed sont INCOMPLETE et block ; les hachages de verrouillage et les rapports par portée sont conservés.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oui                                         |
| `check:lockfile`                  | intégrité `package-lock.json` registre https —, hachages d'intégrité, aucun remplacement d'hôte                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oui                                         |
| `check:licenses`                  | liste d'autorisation de licence SPDX pour les dépendances de production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Oui                                         |
| `check:tracked-artifacts`         | Aucun artefact de construction / liens symboliques `node_modules` validés (fonctionne également dans le pré-commit husky ; le pré-push est intentionnellement léger — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Oui                                         |
| `check:ai-attribution`            | Pas de bande-annonce AI/bot `Co-Authored-By` ou de pied de page de génération AI dans les commits PR, le titre ou le corps — Hard Rule #16 (dans la boucle `quality.yml` fast-gates pour PR→ `release/**` — lit la charge utile de l'événement, no-op off PRs — et une étape PR uniquement dans `ci.yml` lint pour PR→ `main`; également le husky crochet `commit-msg` ; co-auteurs humains autorisés #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:vitest-exclusions`         | Chaque exclusion Vitest nomme un problème de suivi et apparaît dans `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oui                                         |
| `check:file-size`                 | Les fichiers sources (`.ts`/`.tsx` dans `src/`, `open-sse/`, `electron/`, `bin/`) restent dans `cap` et les fichiers de test (`*.test.ts(x)`) dans `testCap`; les fichiers gelés dans `file-size-baseline.json` (`frozen` / `testFrozen`) ne doivent pas dépasser leur taille enregistrée                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oui                                         |
| `check:error-helper`              | Les réponses d'erreur dans executors/handlers utilisent `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Oui                                         |
| `check:migration-numbering`       | Les fichiers de migration SQL sont numérotés de manière séquentielle, sans lacunes ni doublons                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Oui                                         |
| `check:public-creds`              | Pas de clés littérales OAuth `client_id`/`client_secret` ou Firebase Web en dehors de `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oui                                         |
| `check:db-rules`                  | Pas de SQL brut en dehors des modules `src/lib/db/` ; pas d'importation de barils depuis `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oui                                         |
| `check:known-symbols`             | Les exécuteurs du fournisseur, les stratégies de routage et les traducteurs enregistrés dans leurs tables de répartition correspondent aux fichiers sur le disque — pas de symboles orphelins ou non déclarés                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oui                                         |
| `check:route-guard-membership`    | Chaque route qui génère un processus enfant est classée par `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oui                                         |
| `check:test-discovery`            | Chaque fichier `*.test.ts` / `*.spec.ts` du dépôt est collecté par au moins un exécuteur de test (ratchet : la liste des orphelins dans `test-discovery-baseline.json` ne peut que diminuer)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Oui                                         |
| `check:test-tla-order`            | Aucun fichier `node:test` sous `tests/unit` n'enregistre un test, n'atteint un `await` de niveau supérieur, puis n'en enregistre davantage (#18045; ratchet : `test-tla-order-allowlist.json` ne peut que rétrécir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oui                                         |
| `check:agent-skills-sync`         | Les artefacts de compétences d'agent générés correspondent à leur catalogue source (pas de dérive)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | Le fournisseur logos/assets comporte une entrée de provenance enregistrée                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | les fichiers de configuration JSON analysent et satisfont aux règles de repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | compilation TypeScript sans erreurs (avertissements consultatifs uniquement)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Oui                                         |
| `typecheck:noimplicit:core`       | `noImplicitAny` strict — vers l'avenir ; de nombreux sites d'appel préexistants ont encore besoin d'annotations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Consultatif** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` étendu à `src/app/(dashboard)/**` (#7033) — La liste autorisée de 27 fichiers de `typecheck:core` n'inclut aucun tableau de bord TSX, et `next build` ne le vérifie jamais non plus (`next.config.mjs` définit `ignoreBuildErrors: true`), donc les régressions d'identifiants orphelins (#6625/#6909) étaient invisibles pour CI. Les différences par rapport à une ligne de base de décompte per-file/per-TS-code gelée (`config/quality/dashboard-typecheck-baseline.json`, même modèle d'application obsolète que `check:known-symbols`) — seules les erreurs NEW au-delà du décompte de base font échouer la porte ; diminuez avec `--update` lorsqu'une erreur préexistante est corrigée.                                                                                                                                                                                                                                                                                                                                                                                  | Oui                                         |
| `check:build-typecheck`           | La vérification du type de production de l'application entière sur `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), la liste autorisée de 27 fichiers de la surface `typecheck:core` et la porte du tableau de bord ne couvrent pas. Diffs avec `config/quality/build-typecheck-baseline.json`; un décompte nouveau ou augmenté par (fichier, code) échoue, un décompte inférieur vous demande de cliqueter. `--update` refuse tant que l'exécution contient une paire nouvelle ou augmentée à moins que `--force-regressions` ne soit transmis, et refuse un fichier nouvellement réduit au silence à moins que `--force-nocheck` ne soit transmis, donc élargir la ligne de base pour passer au vert et accorder un silence permanent sont deux actes délibérés distincts. Un `--force` nu est rejeté. Analyse également la portée de construction de `@ts-nocheck` par rapport à `config/quality/ts-nocheck-baseline.json`, car un fichier qui l'utilise ne signale aucun diagnostic et serait autrement invisible pour chaque porte. | Oui                                         |

#### Deux programmes de vérification de type répondent différemment

`typecheck:core` et `check:build-typecheck` compilent différents programmes sous différentes options, et le même fichier peut être propre dans l'un et plein d'erreurs dans l'autre.

`tsconfig.build.json` définit `"strict": false`, donc `noImplicitAny` est désactivé. La configuration principale compile une liste autorisée de 27 fichiers avec des options plus strictes et suit le graphique d'importation de chaque entrée, de sorte que les fichiers qui n'apparaissent jamais dans le programme de construction y sont toujours vérifiés.

La conséquence est importante pour juger si un fichier est typé :** zéro diagnostic sous `check:build-typecheck` ne signifie pas zéro** . La suppression de `@ts-nocheck` de 26 fichiers a montré que 23 d'entre eux étaient propres dans le programme de construction ; seize d’entre elles ont fait apparaître environ 120 erreurs implicites au sens strict. Vérifiez les deux avant d’appeler un fichier propre.

### Emploi : `quality-gate`

Fonctionne après `test-coverage`. Les blocs fusionnent en cas d'échec.

| Scénario                     | Valide                                                                                                                                                                                           | Blocage                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `quality:collect`            | Émet `quality-metrics.json` (nombre d'avertissements ESLint, couverture du rapport de fragment fusionné)                                                                                         | Oui (en amont du cliquet) |
| `quality:ratchet`            | Chaque métrique de `quality-baseline.json` n'a pas régressé (avertissements ESLint référence ≤ ; couverture, référence ≥ )                                                                       | Oui                       |
| `check:duplication`          | La duplication de code (jscpd@4) ne dépasse pas la ligne de base dans `quality-baseline.json`                                                                                                    | Oui                       |
| `check:complexity`           | La complexité cyclomatique au niveau du fichier ne dépasse pas le plafond (core ESLint `complexity` + `max-lines-per-function`)                                                                  | Oui                       |
| `check:cognitive-complexity` | Cliquet de complexité cognitive (`eslint-plugin-sonarjs`) — passe ESLint séparée ; CI exécute les deux fusionnés en une seule étape `check:complexity-ratchets`                                  | Oui                       |
| `check:dead-code`            | Le cliquet des exportations/fichiers inutilisés (knip) ne régresse pas par rapport à la ligne de base                                                                                            | Oui                       |
| `check:compression-budget`   | Le budget de référence de compression — par moteur les planchers d'économies de jetons ne doivent pas régresser                                                                                  | Oui                       |
| `check:type-coverage`        | Le cliquet typé en pourcentage (`type-coverage`) ne régresse pas ; englobe largement `typecheck:noimplicit:core`                                                                                 | Oui                       |
| `check:codeql-ratchet`       | Le nombre d'alertes CodeQL ouvertes ne régresse pas (lectures via `gh api`; saut gracieux sans jeton) Cadence de rafraîchissement — et déclenchement manuel : voir " Ratchet CodeQL " ci-dessous | Oui                       |

### Emploi : `quality-extended`

L'ensemble du travail est consultatif (`continue-on-error: true`). Les cliquets basés sur NPM fonctionnent réellement ; les scanners externes s'installent via `gh release download` et s'auto-sautent (sortie 0) lorsqu'un binaire est toujours absent.

| Scénario                 | Valide                                                                                                                                                                                                                                                          | Blocage                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | Aucune dépendance circulaire (dpdm)                                                                                                                                                                                                                             | **Consultatif**                                       |
| `check:bundle-size`      | La taille du paquet ne dépasse pas le plafond                                                                                                                                                                                                                   | **Consultatif**                                       |
| `check:secrets`          | Analyse secrète (gitleaks) — saute si le binaire est absent                                                                                                                                                                                                     | **Consultatif**                                       |
| `check:vuln-ratchet`     | Les vulnérabilités de dépendance (osv-scanner) ne régressent pas. — `--ratchet` échoue en tant que INCOMPLETE (sortie 2) s'il n'est pas mesuré                                                                                                                  | **Consultatif**                                       |
| `check:workflows`        | Charpie de flux de travail (actionlint + zizmor); Les scanners missing/broken, les rapports invalides ou la ligne de base de cliquet manquante échouent en tant que INCOMPLETE. Les résultats valides suivent la politique strict/advisory/ratchet sélectionnée | Exécution requise ; blocage du cliquet zizmor dans CI |
| `check:openapi-breaking` | Contrat public API contre les validations d'événements épinglés (base de fusion PR, pousser avant, base de groupe de fusion ; premier parent de la caisse scheduled/manual ) ; la mesure requise échoue fermée                                                  | **Bloquer avec --ratchet**                            |

### Emploi : `docs-sync-strict`

S'exécute sur chaque PR à `main`. Les blocs fusionnent en cas d'échec.

| Scénario                       | Valide                                                                                                                                                                                                                  | Blocage                      |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | Méta-porte qui exécute les 6 sous-portes ci-dessous de manière séquentielle                                                                                                                                             | Oui                          |
| ↳ `check:docs-sync`            | Cohérence des versions CHANGELOG / OpenAPI / llm.txt                                                                                                                                                                    | Oui                          |
| ↳ `check:docs-counts`          | Les décomptes en prose (nombre de prestataires, nombre de migrations, etc.) se situent dans la fenêtre à cliquet des décomptes réels                                                                                    | Oui                          |
| ↳ `check:env-doc-sync`         | Chaque variable d'environnement dans `.env.example` est documentée dans une table docs, et vice versa                                                                                                                   | Oui                          |
| ↳ `check:deprecated-versions`  | Aucune chaîne de version obsolète dans la documentation                                                                                                                                                                 | Oui                          |
| ↳ `check:doc-links`            | Les liens de démarque internes dans les documents sont résolus en fichiers réels (formulaire `[text]`/`(path)` )                                                                                                        | Oui                          |
| ↳ `check:fabricated-docs`      | Les routes, les variables d'environnement, les commandes CLI, les noms de hook et les chemins de fichiers cités dans la documentation existent dans la base de code. Porte dure via `--strict`; soft-fail sans drapeau. | Oui (via `--strict` dans CI) |
| `check:cli-i18n`               | Les chaînes de commande CLI sont présentes dans tous les fichiers de paramètres régionaux i18n                                                                                                                          | Oui                          |
| `check:openapi-coverage`       | la spécification OpenAPI couvre au moins un plancher à cliquet d'itinéraires réels                                                                                                                                      | Oui                          |
| `check:openapi-security-tiers` | Les annotations du niveau de sécurité dans `openapi.yaml` sont cohérentes avec les classifications `routeGuard.ts`                                                                                                      | **Consultatif**              |
| `check:openapi-routes`         | Chaque chemin dans `openapi.yaml` se résout en un vrai `route.ts` (anti-hallucination)                                                                                                                                  | Oui                          |
| `check:docs-symbols`           | Chaque référence `/api/...` dans `docs/**/*.md` se résout en un vrai `route.ts` (anti-hallucination)                                                                                                                    | Oui                          |
| `i18n translation drift`       | Clés non traduites dans les fichiers de paramètres régionaux i18n, avertissement — uniquement                                                                                                                           | **Consultatif**              |

Les douze README SVGs sous `docs/diagrams/` sont générés (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` les régénère tous). Chacun a un test unitaire de comparaison d'octets (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) qui échoue lorsque le fichier validé est obsolète, et `check:docs-counts` lit les nombres canoniques à partir de leurs nœuds `<text>` — c'est pourquoi l'étape de description conserve chaque chaîne décrite dans le fichier comme invisible `<text>`. La vérification des nombres canoniques SVG lit les fichiers répertoriés dans `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) : `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` et `tier-flow-light.svg`; les revendications de gratuité pour toujours, d'entrée dans le catalogue, de pool récurrent et de facteurs de notation se lisent également `promise-pillars.svg`, `free-tier-budget.svg` et `strategies-grid.svg`. `free-tier-budget.svg` tire ses chiffres du chargeur de catalogue en direct, donc un changement vers `FREE_MODEL_BUDGETS` ou vers un nom d'affichage de fournisseur reds CI jusqu'à ce que ce fichier soit régénéré.

### Emploi : `i18n-ui-coverage`

| Scénario                            | Valide                                                                                                                                                                                                              | Blocage         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (en ligne) | La couverture clé UI i18n est ≥ 65 %                                                                                                                                                                                | Oui             |
| `check-ui-value-drift` (en ligne)   | Un anglais réécrit** valeur** ne laisse aucune traduction périmée derrière                                                                                                                                          | Oui             |
| `check-new-key-coverage` (en ligne) | UN** nouveau** La clé anglaise est traduite dans chaque locale — un marqueur `__MISSING__:` est rejeté                                                                                                              | Oui             |
| `check-translation-ratio`           | Le taux de traduction réelle par langue (identique à l'anglais / espace réservé / feuilles manquantes en dehors de la liste autorisée) ne doit pas dépasser `config/quality/i18n-translation-baseline.json` + slack | **Consultatif** |

Nécessite `fetch-depth: 0` —, la porte de dérive de valeur diffère `en.json` par rapport à la base de fusion.

#### `check-ui-value-drift` — porte de traduction périmée

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
| `test:vitest:ui` | tests de composants UI — vitest runner                     | **Blocage** les échecs préexistants — sont explicitement exclus dans `vitest.config.ts`; de nouveaux échecs font échouer le travail |

### Flux de travail nocturnes (programmés, consultatifs)

Ceux-ci fonctionnent selon un planning cron (et `workflow_dispatch`), jamais sur PRs. Tous sont consultatifs.

| Flux de travail        | Valide                                                                                                                                                                        | Blocage         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | tests de propriété à vérification rapide avec un nombre élevé d'exécutions + de graine aléatoire                                                                              | **Consultatif** |
| `nightly-resilience`   | porte de croissance en tas, injection de fautes de chaos, k6 load/soak                                                                                                        | **Consultatif** |
| `nightly-llm-security` | promptfoo injection guard (mode bloc) sondes + garak (ignorées sans secret du fournisseur)                                                                                    | **Consultatif** |
| `nightly-schemathesis` | Contrat OpenAPI fuzzing (schémathèse) contre un OmniRoute en direct utilisant des violations de spécifications de surfaces `docs/openapi.yaml` — / 500 non gérés (Fase 8 B.4) | **Consultatif** |
| `nightly-mutation`     | Le score des tests de mutation Stryker sur la voie de l'unité rapide — les mutants survivants font surface selon des affirmations faibles                                     | **Consultatif** |
| `nightly-compat`       | Matrice de compatibilité des moteurs de nœuds pour les plages `engines.node` prises en charge                                                                                 | **Consultatif** |

Les références de performances (tas, TTFB, temps de construction) sont enregistrées, non fermées : voir [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

## Ligne de base à cliquet (`quality-baseline.json`)

Le moteur à cliquet (`scripts/quality/check-quality-ratchet.mjs`) lit `quality-baseline.json` et le compare au `quality-metrics.json` fraîchement collecté. Toute métrique qui régresse au-delà de son epsilon échoue à la construction.

Métriques actuellement suivies :

| Métrique              | Direction | Signification                                           |
| --------------------- | --------- | ------------------------------------------------------- |
| `eslintWarnings`      | `down`    | le nombre d'avertissements ESLint ne doit pas augmenter |
| `coverage.statements` | `up`      | La couverture du relevé ne doit pas diminuer            |
| `coverage.lines`      | `up`      | La couverture des lignes ne doit pas baisser            |
| `coverage.functions`  | `up`      | La couverture fonctionnelle ne doit pas diminuer        |
| `coverage.branches`   | `up`      | La couverture des succursales ne doit pas baisser       |

Pour mettre à jour la baseline après une réelle amélioration :

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Le drapeau `--update` écrit les valeurs mesurées actuelles dans `quality-baseline.json`. Validez ce fichier parallèlement à la modification qui a amélioré la métrique. Un PR qui améliore une métrique sans mettre à jour la ligne de base sera intercepté par `--require-tighten` (Fase 6A.5, en attente de mise en œuvre).

### Ratchet CodeQL : cadence de rafraîchissement et déclenchement manuel

`check:codeql-ratchet` lit** état du dépôt, actualisé selon un calendrier — et non par PR.** `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` rapporte `state: configured`, `schedule: weekly`: l'analyse de configuration par défaut de GitHub, pas une analyse par poussée. Conséquence : après la fusion d'un PR that FIXES alerts, le cliquet continue de lire l'ancien compte plus élevé jusqu'à ce que la prochaine analyse planifiée exécute — il signale donc une régression sur chaque PR ouvert, y compris les propres suivis du correctif PR, jusqu'à ce que l'analyse rattrape son retard.

**Actualisation manuelle** : `gh workflow run codeql.yml --ref release/vX.Y.Z` réexécute l'analyse et republie les alertes en quelques minutes. Lisez d'abord `.github/workflows/codeql.yml` — son en-tête explique qu'il s'agit `workflow_dispatch` -only** car il est en conflit avec la "configuration par défaut" de GitHub** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`). La restauration des déclencheurs `push`/`pull_request`/ `schedule` nécessite un** action du propriétaire en premier** : Paramètres → Sécurité du code → CodeQL: Par défaut → Advanced. N'ajoutez pas de déclencheur `schedule:` sans ce commutateur — cela ne produira que des exécutions défaillantes.

**Resserrez la ligne de base après que le décompte ait diminué** — `node scripts/check/check-codeql-ratchet.mjs --update` écrit le nouveau décompte mesuré dans `quality-baseline.json` → `metrics.codeqlAlerts.value`, de sorte que le cliquet ne permet pas silencieusement une régression jusqu'à l'ancien plafond. Exemple fonctionnel (2026-09-02/03) : PR #12502 a corrigé 7 alertes réelles (13 → 6 mesurées ouvertes) ; PR #12530 a resserré la ligne de base gelée 11 → 6 pour correspondre ; les 6 restants ont ensuite été rejetés avec une justification par alerte jusqu'à 0 ouvert.

**Les licenciements sont à la discrétion de l'opérateur (Hard Rule #14)** — ne rejette jamais une alerte CodeQL sans enregistrer la justification technique dans le commentaire de rejet : `won't fix` pour une exigence de protocole en amont, `used in tests` pour un appareil de test, `false positive` pour un désinfectant CodeQL ne peut pas voir (précédent : `docs/security/ERROR_SANITIZATION.md`).

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

## Politique de liste d'autorisation

Chaque porte qui ne peut pas échouer en raison de violations préexistantes utilise une liste verte gelée (par exemple, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). La politique est la suivante :

**Corrigez la cause première ; utilisez la liste verte uniquement lorsque la violation est préexistante et ne peut pas être corrigée dans le même PR.**

Lors de l'ajout d'une entrée à une liste verte :

1. Incluez un commentaire avec la justification.
2. Faites référence au problème de suivi (par exemple, `// #3498 — Phase 2 feature, not yet implemented`).
3. Supprimez l'entrée dans le même PR qui corrige la violation — Une entrée obsolète qui ne supprime plus une violation active est en soi un défaut (6A.3, l'application obsolète fera échouer la porte sur une entrée de liste autorisée orpheline une fois implémentée).

Faire** pas** ajoutez des entrées de liste verte pour accélérer la réussite des tests. Un portail vert avec une liste d’autorisation croissante est un faux sentiment de qualité.

### Quand un portail tombe en panne sur votre PR

1. **Lisez attentivement la sortie de la porte** — il vous indique exactement quel fichier ou symbole a violé la règle.
2. **Corriger la violation** — la plupart des portes sont des vérifications déterministes du système de fichiers qui réussissent dès que le code est correct.
3. **Si la violation est préexistante** (c'est-à-dire que vous ne l'avez pas introduit mais que la porte le couvre désormais) : ajoutez une entrée de liste verte avec un commentaire de justification et un problème de suivi.
4. **Si le portail est un cliquet** (couverture, avertissements ESLint, duplication, complexité) : votre modification a aggravé la métrique. Résolvez le problème sous-jacent ou (rarement) exécutez `npm run quality:ratchet -- --update` si le changement est intentionnel et que la dégradation des métriques est acceptable — mais expliquez pourquoi dans la description PR.
5. **Portes consultatives** (`continue-on-error: true`) sont — informatifs, ils ne bloquent pas la fusion mais apparaissent dans le résumé CI. Réparez-les quand même.

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

## Carnet de rationalisation (ROI review — Fase 9 Onda 3)

Cet inventaire a été rapproché de `ci.yml` le 17/06/2026 (la version précédente omettait `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). Un examen ROI de l'ensemble réconcilié a identifié les candidats de rationalisation suivants.** Les fusions sont des changements mécaniques CI ; les flips/drops sont des décisions politiques réservées à l'opérateur.** Rien ci-dessous n’est encore appliqué.

**Également non documenté ci-dessus** (avis, signal faible) : le travail `docs-lint` (markdownlint + Vale, travail entier `continue-on-error`) et les flux de travail du scanner autonome `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` est dans `quality-baseline.json` mais n'est pas connecté à un cliquet de blocage dans `ci.yml` — la métrique est actuellement orpheline.

### Fusion/déduplication (mécanique, risque moindre)

Chaque candidat a été validé par rapport à l'état de la porte en direct le 17/06/2026 (faire confiance mais vérifier) ; plusieurs fusions « évidentes » se sont avérées cacher la dette et sont** pas** des lieux d'accueil propres.

- **`check:docs-sync` court deux fois** — autonome dans le travail `lint` et à nouveau dans `check:docs-all` (`docs-sync-strict`) et le hook de pré-commit husky. ✅**DONE** Invocation `lint` autonome — supprimée.
- **numérisation CVE** — ❌**NOT une fusion propre.** `audit:deps` bloque les avis critiques et les audits incomplets dans les cinq fichiers de verrouillage, tout en signalant les avis élevés sous forme d'avertissements dans le cadre de la politique actuelle ; `check:vuln-ratchet` (osv) échoue uniquement sur une _régression_ par rapport à la ligne de base enregistrée et rejette les mesures manquantes lorsque cela est nécessaire. Différentes sémantiques — abandonnant `audit:deps` perdraient la porte critique absolue et les reçus d'audit indépendants des packages. Gardez les deux.
- **Détection de cycles** — ✅**DONE** (#15159 G-01/G-02). L'ancien texte ici appelait `check:cycles` « la porte verte, organisée » et justifiait son maintien car `check:circular-deps` (dpdm) rapportait 91 cycles. Ce vert était un** faux vert** : `check:cycles` a analysé 5 sous-répertoires (450 fichiers), ne correspondait qu'à `import|export … from` statique et a supprimé tous les spécificateurs `@/` et `@omniroute/open-sse/`, de sorte qu'il ne pouvait pas voir les cycles d'alias + d'importation dynamique qui dominaient le dépôt. Corrigé : la porte parcourt désormais `src` + `open-sse` (5023 fichiers), collecte les spécificateurs du TypeScript AST (donc `import("…")` compte et type-position `typeof import("…")` ne le fait pas) et résout tsconfig `paths`. Il trouve** 14** cycles, pas 0. Parce que 14 cycles préexistants ne peuvent pas être corrigés dans une porte PR, `check:cycles` est maintenant un** rochet** (`--ratchet`, plafond `metrics.cycles.value = 14` dans `quality-baseline.json`, `direction: down`) — il bloque toute _régression_ et le décompte ne peut que baisser. CI exécute `npm run check:cycles:ratchet`. Des balades brûlantes avec**A-01** . `check:circular-deps` (dpdm) reste consultatif en tant que deuxième avis plus large.
- **Complexité** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`) : une marche ESLint, compte par ruleId afin que les lignes maximales cyclomatiques + et les lignes de base cognitives restent indépendantes ; `check:complexity` / `check:cognitive-complexity` individuels restent pour `--update` locaux.
- **`/api` anti-hallucination** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`) : un inventaire FS de `src/app/api`, les openapi-routes + docs-symboles rapportent toujours indépendamment ; les individus restent pour les courses locales.
- **`check:node-runtime` exécute 11 emplois** — ⚠️** ROI faible.** Chacun est un coureur distinct et le contrôle est < 1s ; économies totales de 10 ~, contre la perte d'une garde bon marché par emploi. Cela n’en vaut pas la peine.
- **`typecheck:noimplicit:core` sur les peluches CI** — ✅** retiré du travail de charpie** (était consultatif `continue-on-error`); la surface de type blocage est `typecheck:core` + `check:type-coverage`. Écriture locale conservée.

### Retourner / décider (politique de l'opérateur)

- `check:openapi-security-tiers` (consultatif) — ❌**NOT proprement retourneable.** Il quitte 0 mais avertit que plusieurs routes `traffic-inspector` sous `LOCAL_ONLY_API_PREFIXES` n'ont pas l'annotation `x-loopback-only: true`. Son application nécessite d'abord d'ajouter ces annotations à `openapi.yaml`.
- `typecheck:noimplicit:core` (consultatif) — largement englobé par le cliquet bloquant `check:type-coverage`. Basculez vers un cliquet ou abandonnez la deuxième passe `tsc` redondante.
- `test:vitest:ui` (maintenant** blocage** ) les échecs préexistants — sont explicitement exclus dans `vitest.config.ts` avec les commentaires de suivi `// #8618` ; de nouveaux échecs font échouer le travail.
- `check:secrets` (gitleaks, blocage du cliquet gelé à 3 faux positifs documentés) — autorise les 3 à atteindre 0, ou rétrograde au statut consultatif. GitHub l'analyse secrète native + `check:public-creds`.
- `check:pr-evidence` (blocage, greps PR-body prose) — risque de faux positif élevé ; affaiblit l'application de la règle stricte #18 en cas d'abandon, il s'agit donc d'un véritable appel politique.
- `semgrep` (consultatif autonome) — chevauche CodeQL pour les familles OWASP ; câblez sa ligne de base à un cliquet ou à une chute.

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
