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

Les workflows CI et Quality Gates produisent chacun un verdict stable : `Gate / CI` et
`Gate / Quality`. Leur politique d’admission versionnée répertorie chaque job en amont
comme requis ou consultatif. Un job requis applicable doit réussir : les résultats
absents, annulés, ignorés, en attente ou inconnus ne peuvent pas établir un PASS. Une
classification valide limitée à la documentation ou au catalogue peut rendre une voie
de code non applicable ; une PR en brouillon n’est pas un candidat accepté. Un libellé
`hotfix` ne dispense pas de fournir des preuves.

Les deux workflows couvrent les PR vers les branches main/release, les pushs vers `main`,
le déclenchement manuel et les événements de groupe de fusion. Les pushs, les déclenchements
manuels et les groupes de fusion exécutent la sélection complète. Les pushs vers
`release/**` ne les démarrent pas (2026-10-18) : chaque modification a déjà exécuté la
matrice dans sa PR, et la combinaison fusionnée relève de Release-Green
(`docs/ops/RUNNER_BOX.md` → Voie hébergée). Les forks et les groupes de fusion utilisent
des runners hébergés pour les jobs qui sélectionnent normalement des runners auto-hébergés ;
une capacité hébergée suffisante doit être vérifiée avant le déploiement.

Chaque reçu JSON identifie le SHA extrait, l’exécution du workflow et la tentative.
La CLI rejette toute non-correspondance entre le SHA de l’extraction et celui de l’événement.
Les tests du workflow lient l’appartenance à la politique à la liste `needs` du job de verdict,
afin qu’une voie ajoutée ou supprimée ne puisse pas disparaître silencieusement.
Les reçus couvrent leur propre workflow, et non la publication, le déploiement ou le fonctionnement interne d’un scanner consultatif existant. Rendre obligatoires les vérifications applicables dans les règles de branche constitue une modification administrative distincte ; définir leurs tâches ne protège pas en soi une branche.

`API Route Typecheck` est une vérification de workflow indépendante, qui ne fait partie ni des verdicts agrégés ni du profil statique de l’observateur local complet. Examinez son résultat séparément pour le candidat exact. `.github/workflows/api-route-typecheck.yml` s’exécute pour les PR ciblant `main` ou `release/**`, les poussées vers l’une ou l’autre famille de branches, ainsi que les déclenchements manuels. Il ne comporte aucun filtre de chemin. Le changement de branche cible d’une PR demande une nouvelle vérification ; les modifications du corps ou du titre utilisent le nom réservé à l’observation `Admission not requested / API Route Typecheck` et ne peuvent pas remplacer la vérification d’admission. Le workflow ne déclare aucun déclencheur de groupe de fusion. Tout déploiement d’une file d’attente de fusion qui exige cette vérification doit d’abord établir son exécution pour cet événement.

### Capacité d’exécution de l’interface utilisateur

CI exécute l’inventaire complet de l’interface utilisateur sous forme de quatre partitions
de matrice `test-vitest`, chacune comportant au maximum deux workers et conservant le
délai d’expiration existant de 15 minutes par job. La première partition exécute également
la suite Vitest MCP/autoCombo. Le résultat du job requis couvre chaque élément de la matrice ;
l’échec ou l’annulation d’une partition ne peut pas établir l’admission du candidat.

L’observateur nocturne conserve un reçu distinct correspondant exactement au candidat pour
chaque partition de l’interface utilisateur, y compris l’exécution MCP dans le premier reçu.
Les quatre reçus, les journaux et les identités d’exécution correspondantes sont requis.
La commande locale `npm run test:vitest:ui` sélectionne toujours la suite complète ; une seule
exécution avec `--shard` ne constitue qu’une preuve partielle.

### Collecte de la couverture unitaire

Les douze partitions unitaires collectent la couverture V8 pendant l’exécution existante de
leurs tests. Une partition réussie exécute `scripts/ci/compact-v8-coverage.mjs` afin de compresser
les fichiers d’origine sans générer de rapport Istanbul intermédiaire. Le job Coverage final
vérifie les douze manifestes par rapport au SHA du candidat, au runtime, à la racine des sources
et aux hachages des données, puis exécute les rapporteurs de c8 et les seuils de couverture
existants. Les entrées conservent l’ordre global des noms de fichiers de c8 ; une pré-fusion
par partition n’est pas sûre pour une couverture mixte des fonctions et des blocs. Les
partitions absentes, mal formées ou incompatibles font échouer l’admission. Les partitions
de test ayant échoué conservent séparément la couverture de diagnostic brute ; celle-ci ne
peut pas être intégrée à la fusion finale.

### Reçus de progression de l’exécution des tests unitaires

La commande partagée `test:unit:ci:shard` enregistre les phases `primary`, `dashboard` et `serial`
via `scripts/ci/unit-progress-reporter.mjs`. Le rapport de test habituel reste
disponible. Un reçu distinct contenant uniquement des métadonnées enregistre le début et la fin de chaque fichier,
et un signal périodique toutes les 30 secondes répertorie les fichiers toujours actifs ainsi que leur durée d’exécution. Il enregistre
uniquement les métadonnées d’exécution autorisées ; les descriptions des tests, les sorties, le contenu des erreurs et l’environnement
complet ne sont pas sérialisés.

CI et Quality conservent les fichiers JSONL sous les noms `unit-progress-ci-<run>-<attempt>-<shard>` et
`unit-progress-quality-<run>-<attempt>-<shard>`. L’expiration du délai d’une tâche peut empêcher le téléversement ultérieur ;
les signaux périodiques déjà émis restent des éléments de diagnostic. L’absence de signaux périodiques peut également indiquer
un processus d’exécution bloqué ou arrêté. Ces reçus préservent la sélection des tests,
la concurrence, les échéances et le statut de sortie existants ; ils ne constituent pas des décisions d’admission des candidats.

### Preuves conservées dans le réducteur d’acceptation

`scripts/quality/validate-release-acceptance.mjs` agrège un plan fourni et ses manifestes ; il n’établit pas que le plan couvre l’ensemble du pipeline de publication. Ses rapports fixent explicitement `releaseAcceptance: false`, même lorsque ce plan est `VERIFIED`. Le workflow `release-acceptance.yml` utilise encore des fixtures de simulation, et non des reçus réels de compilation, de packaging, de démarrage ou de promotion.

La CLI exige `--evidence-root` pour vérifier les preuves conservées. Les fichiers sont résolus sous `<evidence-root>/<artifact_id>/<member>` et hachés avec SHA-256. Un enregistrement PASS sans preuves, un fichier absent ou modifié, un chemin non sûr ou un lien symbolique empêche la vérification. Des fichiers absents ne valent pas des journaux vides d’exécutions réussies. Les contrôles SHA/run/attempt existants restent indépendants : des octets identiques ne peuvent pas valider un reçu périmé. L’intégrité d’un fichier ne prouve ni l’authenticité de l’exécution ni la promotion de l’artefact.

### Inventaire des analyses statiques

L’inventaire versionné des alias npm et l’appartenance aux analyses statiques se trouvent dans
`config/quality/gate-manifest.json`. Exécutez `npm run check:gate-manifest` pour valider les noms
des scripts et les commandes exactes par rapport à `package.json` ; les ajouts, les suppressions
et les dérives de commandes font échouer à la fois le hook local et les jobs de classification
des modifications dans CI. Un alias n’est ni un job de workflow, ni une instance de matrice,
ni un cas de test : ces nombres ne doivent pas être présentés comme interchangeables.

Utilisez `npm run quality:scan -- --list` ou `npm run quality:scan:fast -- --list`
pour examiner les alias sélectionnés sans les exécuter. Le runner appelle le point d’entrée
npm, de sorte que son runtime, y compris Bun lorsqu’il est configuré, est préservé.
Le manifeste consigne les alias situés hors de ces profils comme étant appelés séparément,
et les commandes de maintenance sont interdites dans les profils d’analyse en lecture seule.

Ces profils couvrent uniquement l’analyse statique. Ils ne certifient ni les tests du produit,
ni la couverture, ni la création des packages, ni les vérifications externes, ni l’acceptation
complète d’un candidat pour la release. L’admission du workflow utilise les fichiers liés
`config/quality/admission-policy.json` et `scripts/quality/admission-verdict.mjs`. Les profils
de l’observateur de release restent distincts ; examinez séparément leurs vérifications et
reçus applicables. Les commandes statiques de l’observateur complet sont déclarées dans
`config/quality/release-green-static-profile.json`, notamment `audit:deps`, la sélection des
tests de mutation et les vérifications de traduction. Le chargeur valide les commandes npm
par rapport à package.json et aux déclarations CI/Quality modélisées ; il rejette les dérives
au lieu d’exécuter les tokens shell comme arguments. Une sortie SKIP/INCOMPLETE d’un scanner
requis ne peut pas établir un PASS. Le profil consigne ses exclusions externes et ne remplace
pas les preuves de couverture hébergée, de matrices de tests, de package ou de déploiement.
L’inventaire textuel ci-dessous sert de référence et ne prouve pas qu’un gate a réellement
été exécuté.

Les scripts se trouvent sous `scripts/check/` pour les gates de politique et sous
`scripts/quality/` pour le moteur de progression contrôlée. La source de vérité de CI est
`.github/workflows/ci.yml`.

### État de santé de la documentation de base publiée

`.github/workflows/i18n-base-health.yml` surveille l’état de santé de la documentation après certaines
publications sur `main` et `release/v*`, ainsi que lors d’un déclenchement manuel. Ses filtres couvrent la documentation,
les fichiers Markdown à la racine, `llm.txt`, l’état et la configuration des traductions, ainsi que les outils i18n concernés.
L’unique tâche `Published base documentation health` utilise une instance Ubuntu hébergée et un délai maximal
de cinq minutes. Elle effectue une validation en lecture seule et génère un reçu de diagnostic sans
installation de dépendances, traduction ni adoption d’état.

`scripts/i18n/check-base-health.mjs` exige l’absence de toute incohérence liée aux hachages sources, aux cibles manquantes, aux hachages cibles,
aux traductions obsolètes et au cache des sections. Il valide également la portée actuelle
des documents et des paramètres régionaux principaux, ainsi que leur provenance enregistrée. Un contexte non valide, une couverture incomplète
ou une interruption du vérificateur produit `INCOMPLETE` ; une dérive confirmée produit `FAIL`. Dans les deux cas,
le statut de sortie indique un échec. Le reçu est lié au SHA du checkout, au workflow, à l’exécution et
à la tentative, et il est conservé sous le nom `i18n-base-health-<sha>-<run>-<attempt>`.

Il s’agit d’une observation indépendante de la base publiée. Elle n’ajoute aucun événement de PR ou
de groupe de fusion, aucune vérification de PR obligatoire, aucun alias npm ni aucun membre de profil d’analyse statique.
La politique différentielle existante pour les PR et les classifications consultatives du vérificateur sous-jacent
restent distinctes. Un téléversement réussi ne peut pas transformer en PASS un résultat de contrôle de santé ayant échoué.

### Voie rapide des PR de release (`quality.yml`)

`.github/workflows/quality.yml` complète CI pour les PR main/release, les pushs vers `main`,
les déclenchements manuels et les groupes de fusion. Les PR utilisent des vérifications rapides
filtrées selon les chemins. Le build dupliqué, désactivé de façon permanente, a été supprimé ;
les véritables vérifications de build, de package et de démarrage restent dans CI.

| Tâche                                            | Portée                                                                                                                                                                                                                                                               | Bloquante                |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | PR de documentation/code ; références de la documentation de l’API et ensemble de la documentation                                                                                                                                                                   | Oui                      |
| `Fast Quality Gates`                             | PR de code ; vérifications statiques, vérification des types, vérification des types du tableau de bord, tests unitaires concernés                                                                                                                                   | Oui                      |
| `Forgotten sibling tests`                        | PR de code ; modules modifiés suivis jusqu’aux consommateurs statiques et aux tests apparentés candidats ; les chemins de barrel et d’importation dynamique sont signalés comme diagnostics consultatifs, avec les exceptions référencées de la liste d’autorisation | **Consultative**         |
| `Vitest (fast-path)`                             | PR de code ; suite Vitest rapide                                                                                                                                                                                                                                     | Oui                      |
| `Unit Tests fast-path`                           | PR de code ; suite de tests unitaires répartie en 4 fragments                                                                                                                                                                                                        | Oui                      |
| `No new ESLint warnings`                         | PR de code ; garde de lint tenant compte des suppressions                                                                                                                                                                                                            | Oui, y compris les forks |
| `Merge integrity (changelog + generated skills)` | PR non brouillons ; synchronisation du journal des modifications et des compétences générées                                                                                                                                                                         | Oui, y compris les forks |

#### Rapport sur les tests apparentés oubliés

`npm run check:forgotten-sibling-tests` réutilise le résolveur d’importations qui sous-tend la carte d’impact des tests.
Pour chaque module de production modifié, il signale des chaînes déterministes
`changed module/symbol -> static consumer -> candidate sibling test` lorsque le test candidat
est absent du diff de la pull request. Le résumé Markdown et le résultat JSON sont conservés comme
artefact de workflow `forgotten-sibling-tests` à des fins d’étalonnage avant tout déploiement bloquant.

Les réexportations via des barrels et les importations dynamiques constituent uniquement des diagnostics de résolution ; elles ne génèrent jamais de
constat bloquant. Les exceptions examinées se trouvent dans
`config/quality/forgotten-sibling-allowlist.json`. Chaque entrée doit nommer le consommateur et le test
candidat, fournir une justification précise et contenir un lien vers une issue ou une pull request GitHub. Les entrées mal formées entraînent
un échec par défaut. Les exceptions ne peuvent pas masquer un test candidat supprimé ni un diff qui ajoute `.skip`/`.todo` ;
l’affaiblissement des assertions et les autres formes de masquage restent sous la responsabilité de la porte
`check:test-masking`, qui est bloquante de manière indépendante.

### Tâche : `lint`

S’exécute sur chaque PR vers `main`. Bloque la fusion en cas d’échec.

| Script (`npm run ...`)            | Valide                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bloquant                                    |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | La version de Node.js se situe dans la plage prise en charge                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oui                                         |
| `check:test-tla-order`            | Aucun fichier `node:test` sous `tests/unit` n’enregistre un test, ne rencontre ensuite un `await` de niveau supérieur, puis n’enregistre d’autres tests (#18045 ; mécanisme à cliquet : `test-tla-order-allowlist.json` ne peut que diminuer)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Oui                                         |
| `check:cycles`                    | Les imports circulaires dans l’ensemble de `src/` + `open-sse/` (basé sur l’AST, avec résolution des `paths` de tsconfig). La commande seule se termine avec le code 1 dès qu’un cycle existe (échec par défaut depuis #15281) et répertorie les SCC. `check:cycles:ratchet` (exécuté par la CI) bloque lorsque le nombre dépasse le plafond `metrics.cycles` défini dans `quality-baseline.json` — actuellement 14, `direction: down`, il ne peut donc que diminuer (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oui (mécanisme à cliquet)                   |
| `check:boundary`                  | Le couplage `open-sse → src` : imports uniques de fichier à fichier du moteur vers l’application (`scripts/quality/measure-boundary.mjs` ; la liste des arêtes constitue le backlog de remédiation pour la séparation du cœur et des modules de la v4). La commande seule produit un rapport consultatif (identique à `quality:boundary`). `check:boundary:ratchet` (exécuté par la CI, également dans la boucle à cliquet des contrôles rapides de `quality.yml`) bloque lorsque le nombre dépasse le plafond `metrics.boundaryOpenSseToSrc` défini dans `quality-baseline.json` — initialisé à la valeur mesurée de 771, `direction: down` ; `--update` ne peut que l’abaisser ; relatif à la branche de base pour les PR (`--base-ref`, voir ci-dessous)                                                                                                                                                                                                                                         | Oui (mécanisme à cliquet)                   |
| `check:route-validation:t06`      | Schémas Zod présents sur toutes les routes (politique de niveau 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Oui                                         |
| `check:any-budget:t11`            | Le nombre de `@ts-expect-error // any` ne dépasse pas le budget (contrôle de niveau 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oui                                         |
| `check:provider-consistency`      | Chaque fournisseur dans `providers.ts` possède une entrée correspondante dans `providerRegistry.ts` (et inversement, dans les limites de la liste d’autorisation)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oui                                         |
| `check:model-lifecycle`           | Les trois tables de routage maintenues manuellement restent cohérentes avec l’instantané du cycle de vie archivé (#11503) : `FITNESS_TABLE` (`taskFitness.ts`) n’attribue de score à aucun identifiant retiré que `REGISTRY` peut acheminer ; chaque cible de `BUILT_IN_ALIASES` est présente dans `REGISTRY` et absente de l’instantané des identifiants retirés ; chaque identifiant retiré encore présent dans `REGISTRY` est redirigé ou répertorié dans `allowedRetiredInCatalog` ; et aucune source ni cible de `DEFAULT_DEGRADATION_MAP` n’apparaît comme retirée dans cet instantané. Cela ne prouve pas qu’un modèle est actuellement servi par un fournisseur amont actif. Hors ligne — effectue une comparaison avec `config/quality/model-lifecycle.json`, actualisé manuellement avec `npm run quality:refresh-model-lifecycle` (réseau ; non intégré à la CI). `allowedRetiredInCatalog` est un mécanisme de réduction progressive : n’ajoutez une entrée qu’avec un ticket de suivi. | Oui                                         |
| `check:fetch-targets`             | Chaque `fetch("/api/...")` dans le répertoire client `src/` correspond à un véritable fichier `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oui                                         |
| `check:deps`                      | Toutes les dépendances installables via `npm install` dans chaque fichier `package.json` du dépôt figurent dans `dependency-allowlist.json` ; les nouveaux packages sans version verrouillée ou issus de slopsquatting sont signalés                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Oui                                         |
| `audit:deps`                      | Audit npm des cinq fichiers de verrouillage indépendants (racine, Electron, plugins OpenCode v1/v2 et fournisseur). Les avis critiques sont bloquants ; les avis de niveau élevé restent des avertissements visibles. Les audits manquants/ayant échoué sont INCOMPLETS et bloquants ; les empreintes des fichiers de verrouillage et les rapports sont conservés pour chaque périmètre.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oui                                         |
| `check:lockfile`                  | Intégrité de `package-lock.json` — registre https, empreintes d’intégrité, aucune substitution d’hôte                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oui                                         |
| `check:licenses`                  | Liste d’autorisation des licences SPDX pour les dépendances de production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Oui                                         |
| `check:tracked-artifacts`         | Aucun artefact de compilation / lien symbolique `node_modules` validé (également exécuté par le hook husky de pré-commit ; le pré-push est intentionnellement léger — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oui                                         |
| `check:ai-attribution`            | Aucun trailer `Co-Authored-By` d’IA/bot ni pied de page indiquant une génération par IA dans les commits, le titre ou le corps de la PR — règle stricte nº 16 (dans la boucle de contrôles rapides de `quality.yml` pour les PR→`release/**` — lit la charge utile de l’événement, ne fait rien hors des PR — et dans une étape réservée aux PR de la vérification lint de `ci.yml` pour les PR→`main` ; également dans le hook husky `commit-msg` ; coauteurs humains autorisés ; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Chaque exclusion Vitest mentionne une issue de suivi et figure dans `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Oui                                         |
| `check:file-size`                 | Les fichiers source (`.ts`/`.tsx` dans `src/`, `open-sse/`, `electron/`, `bin/`) restent dans la limite de `cap` et les fichiers de test (`*.test.ts(x)`) dans celle de `testCap` ; les fichiers figés dans `file-size-baseline.json` (`frozen` / `testFrozen`) ne doivent pas dépasser leur taille enregistrée                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Oui                                         |
| `check:error-helper`              | Les réponses d’erreur dans les exécuteurs/gestionnaires utilisent `buildErrorBody()` / `sanitizeErrorMessage()` (règle stricte nº 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oui                                         |
| `check:migration-numbering`       | Les fichiers SQL de migration sont numérotés séquentiellement, sans aucun numéro manquant ni doublon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Oui                                         |
| `check:public-creds`              | Aucun identifiant OAuth `client_id`/`client_secret` ni aucune clé Web Firebase en dur en dehors de `publicCreds.ts` (règle stricte nº 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Oui                                         |
| `check:db-rules`                  | Aucune requête SQL brute en dehors des modules de `src/lib/db/` ; aucun import depuis le fichier d’agrégation `localDb.ts` (règles strictes nº 2/5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oui                                         |
| `check:known-symbols`             | Les exécuteurs de fournisseurs, les stratégies de routage et les traducteurs enregistrés dans leurs tables de répartition correspondent aux fichiers présents sur le disque — aucun symbole orphelin ou non déclaré                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oui                                         |
| `check:route-guard-membership`    | Chaque route qui lance un processus enfant est classée par `isLocalOnlyPath()` (Règles impératives #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Oui                                         |
| `check:test-discovery`            | Chaque fichier `*.test.ts` / `*.spec.ts` du dépôt est collecté par au moins un exécuteur de tests (mécanisme à cliquet : la liste des fichiers orphelins dans `test-discovery-baseline.json` ne peut que diminuer)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Oui                                         |
| `check:agent-skills-sync`         | Les artefacts générés des compétences d’agent correspondent à leur catalogue source (aucune dérive)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | Les logos/ressources des fournisseurs disposent d’une entrée de provenance enregistrée                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | Les fichiers de configuration JSON sont analysés correctement et respectent les règles de lint du dépôt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | Compilation TypeScript sans erreur (avertissements consultatifs uniquement)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Oui                                         |
| `typecheck:noimplicit:core`       | Mode strict `noImplicitAny` — objectif à terme ; de nombreux sites d’appel préexistants nécessitent encore des annotations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **Consultatif** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limité à `src/app/(dashboard)/**` (#7033) — la liste d’autorisation organisée de 27 fichiers de `typecheck:core` n’inclut aucun TSX du tableau de bord, et `next build` ne les soumet jamais non plus à la vérification des types (`next.config.mjs` définit `ignoreBuildErrors: true`) ; les régressions liées aux identifiants orphelins à cet endroit (#6625/#6909) étaient donc invisibles pour la CI. Compare les résultats à une référence figée du nombre d’erreurs par fichier et par code TS (`config/quality/dashboard-typecheck-baseline.json`, selon le même modèle de vérification d’obsolescence que `check:known-symbols`) — seules les NOUVELLES erreurs dépassant le nombre de référence font échouer la barrière ; abaissez progressivement la référence avec `--update` lorsqu’une erreur préexistante est corrigée.                                                                                                                                                       | Oui                                         |

### Tâche : `quality-gate`

S’exécute après `test-coverage`. Bloque la fusion en cas d’échec.

| Script                       | Vérifie                                                                                                                                                                                                                        | Bloquant                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `quality:collect`            | Génère `quality-metrics.json` (nombre d’avertissements ESLint, couverture issue du rapport fusionné des fragments)                                                                                                             | Oui (en amont du mécanisme de progression) |
| `quality:ratchet`            | Aucune métrique de `quality-baseline.json` n’a régressé (avertissements ESLint ≤ référence ; couverture ≥ référence)                                                                                                           | Oui                                        |
| `check:duplication`          | La duplication de code (jscpd@4) ne dépasse pas la référence définie dans `quality-baseline.json`                                                                                                                              | Oui                                        |
| `check:complexity`           | La complexité cyclomatique au niveau des fichiers ne dépasse pas la limite (`complexity` du cœur d’ESLint + `max-lines-per-function`)                                                                                          | Oui                                        |
| `check:cognitive-complexity` | Mécanisme de progression de la complexité cognitive (`eslint-plugin-sonarjs`) — passe ESLint distincte ; la CI exécute les deux de manière fusionnée dans l’unique étape `check:complexity-ratchets`                           | Oui                                        |
| `check:dead-code`            | Le mécanisme de progression des exports/fichiers inutilisés (knip) ne régresse pas par rapport à la référence                                                                                                                  | Oui                                        |
| `check:compression-budget`   | Budget du benchmark de compression — les seuils minimaux d’économie de jetons par moteur ne doivent pas régresser                                                                                                              | Oui                                        |
| `check:type-coverage`        | Le mécanisme de progression du pourcentage typé (`type-coverage`) ne régresse pas ; remplace en grande partie `typecheck:noimplicit:core`                                                                                      | Oui                                        |
| `check:codeql-ratchet`       | Le nombre d’alertes CodeQL ouvertes ne régresse pas (lecture via `gh api` ; omission contrôlée sans jeton) — pour la fréquence d’actualisation et le déclenchement manuel, voir « Mécanisme de progression CodeQL » ci-dessous | Oui                                        |

### Tâche : `quality-extended`

La tâche bloque les candidats concernés. La taille du bundle, les secrets détectés, les
vulnérabilités détectées, les problèmes détectés dans les workflows et les modifications
OpenAPI sont contrôlés au moyen de mécanismes de progression obligatoires.
Les diagnostics de dépendances circulaires restent consultatifs. L’installation des
analyseurs est obligatoire : `scripts/ci/install-quality-scanners.sh` fournit les versions
épinglées et propage les échecs d’installation. Les outils manquants, les rapports non
valides ou les références manquantes laissent la barrière obligatoire de l’analyseur
INCOMPLÈTE.

| Script                   | Valide                                                                                                                                                                                                                                                                      | Blocage                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `check:circular-deps`    | Aucune dépendance circulaire (dpdm)                                                                                                                                                                                                                                         | **Consultatif**                                            |
| `check:bundle-size`      | La taille du bundle ne dépasse pas la limite ; une mesure indisponible entraîne un échec                                                                                                                                                                                    | **Bloquant avec --ratchet**                                |
| `check:secrets`          | Les résultats de Gitleaks ne régressent pas ; les analyses obligatoires rejettent les outils, sources ou références manquants, les analyses ayant échoué et les rapports non valides                                                                                        | **Bloquant avec --ratchet**                                |
| `check:vuln-ratchet`     | Les vulnérabilités des dépendances ne régressent pas ; les analyses obligatoires rejettent les outils manquants, les rapports non valides ou les références manquantes                                                                                                      | **Bloquant avec --ratchet**                                |
| `check:workflows`        | Lint des workflows (actionlint + zizmor) ; les scanners manquants/défectueux, les rapports non valides ou l'absence de référence de progression échouent avec l'état INCOMPLET. Les résultats valides suivent la politique stricte/consultative/de progression sélectionnée | Exécution obligatoire ; progression zizmor bloquante en CI |
| `check:openapi-breaking` | Contrat d'API publique comparé aux commits d'événements épinglés (base de fusion de la PR, état antérieur au push, base du groupe de fusion ; premier parent du checkout planifié/manuel) ; toute mesure obligatoire échoue de manière sécurisée                            | **Bloquant avec --ratchet**                                |

### Tâche : `docs-sync-strict`

Pour les pull requests vers `main` ou `release/**`, cette tâche ne s’exécute que pour les candidats qui ne sont pas des brouillons (ou qui proviennent d’une file de confiance) et qui sont classés comme modifications de documentation ou de code. Elle s’exécute aussi lors d’événements CI hors PR ; le déclencheur push de ce workflow couvre uniquement `main`, pas `release/**`. Une étape qui se termine avec un code non nul bloque la tâche ; les constats purement informatifs et les exemptions documentées ci-dessous ne la bloquent pas.

| Script                         | Valide                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blocage                                                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Méta-contrôle qui exécute séquentiellement les 7 sous-contrôles ci-dessous                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oui                                                                                                                                        |
| ↳ `check:docs-sync`            | Cohérence des versions du paquet/OpenAPI/CHANGELOG, miroirs exacts de `llm.txt`, invariants de sections/taille du CHANGELOG traduit et absence de documents dupliqués devenus caducs                                                                                                                                                                                                                                                                                                                                                                                                   | Oui                                                                                                                                        |
| ↳ `check:docs-frontmatter`     | Les pages de documentation compilées comportent des titres de frontmatter valides                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui                                                                                                                                        |
| ↳ `check:docs-counts`          | Les invariants de comptage à forte fiabilité sont stricts ; les vérifications heuristiques du nombre de fichiers ne font qu’avertir, sauf si le script reçoit `--strict` (le méta-contrôle CI ne le transmet pas)                                                                                                                                                                                                                                                                                                                                                                      | Niveau strict bloquant ; niveau souple informatif                                                                                          |
| ↳ `check:env-doc-sync`         | Les lectures de variables d’environnement dans le code source, `.env.example` et `docs/reference/ENVIRONMENT.md` concordent après application des listes d’exceptions explicites ignore, doc-only et env-only                                                                                                                                                                                                                                                                                                                                                                          | Oui, hors des listes d’exceptions documentées                                                                                              |
| ↳ `check:deprecated-versions`  | Signale les versions potentiellement obsolètes hors des contextes historiques sûrs et les dates de mise à jour anciennes, en excluant les documents ignorés                                                                                                                                                                                                                                                                                                                                                                                                                            | Informatif dans la configuration CI actuelle (`--strict` n’est pas transmis)                                                               |
| ↳ `check:doc-links`            | Les liens markdown internes de la documentation renvoient vers des fichiers existants (forme `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oui                                                                                                                                        |
| ↳ `check:fabricated-docs`      | Les routes, variables d'environnement, commandes CLI, noms de hooks et chemins de fichiers cités dans la documentation existent dans la base de code. Contrôle strict via `--strict` ; échec non bloquant sans cette option.                                                                                                                                                                                                                                                                                                                                                           | Oui (via `--strict` en CI)                                                                                                                 |
| `check:cli-i18n`               | Les clés CLI `t()` utilisées existent dans `en` ; `pt-BR` conserve toutes les sections de premier niveau ; `zh-CN` et `zh-TW` contiennent toutes les clés de `en`                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui                                                                                                                                        |
| `check:openapi-coverage`       | La spécification OpenAPI couvre au moins un seuil progressif de routes réelles                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Oui                                                                                                                                        |
| `check:openapi-security-tiers` | Les annotations déclarées `x-loopback-only`/`x-always-protected` doivent être étayées par `routeGuard.ts` ; les erreurs d’analyse et les incohérences du contrôle direct sont bloquantes. Le contrôle inverse des `x-loopback-only` manquants sous les préfixes exclusivement locaux émet des avertissements ; les routes définies uniquement par des motifs sont exclues de ce contrôle inverse.                                                                                                                                                                                      | Analyse/contrôles directs bloquants ; contrôle inverse informatif                                                                          |
| `check:openapi-routes`         | Chaque chemin `/api...` de `openapi.yaml` correspond à une route réelle sans tenir compte des noms des paramètres, après application de la liste d’exceptions justifiée `KNOWN_STALE_SPEC` ; les entrées obsolètes de cette liste provoquent aussi un échec                                                                                                                                                                                                                                                                                                                            | Oui                                                                                                                                        |
| `check:docs-symbols`           | Les références URL internes `/api/...` dans les documents canoniques non miroirs correspondent à une route réelle ou à une famille de routes ; les références proxy/amont/espace réservé/fichier et les entrées justifiées `KNOWN_STALE_DOC_REFS` sont exclues, et les entrées obsolètes de la liste provoquent un échec                                                                                                                                                                                                                                                               | Oui                                                                                                                                        |
| `i18n translation drift`       | Vérifie les empreintes source/cible des documents principaux et la provenance de la traduction. La comparaison des PR n’autorise que les échecs hérités identiques ; les incohérences nouvelles ou non vérifiées de source, de cible absente, d’empreinte cible, de traduction obsolète ou de cache de sections bloquent. Hors comparaison des PR, les échecs de source/cible absente/empreinte cible bloquent, tandis que les traductions obsolètes et les caches de sections incohérents restent consultatifs. L’absence d’un cache de sections au format ancien n’est pas un échec. | La dérive nouvelle/non vérifiée en PR bloque ; la dérive héritée identique est consultative ; les règles hors PR dépendent du type d’échec |

### Tâche : `i18n-ui-coverage`

| Script                            | Valide                                                                                                                                                                                                                    | Bloquant     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (inline) | La couverture des clés d’i18n de l’interface utilisateur est ≥ 65 %                                                                                                                                                       | Oui          |
| `check-ui-value-drift` (inline)   | Une **valeur** anglaise réécrite ne laisse derrière elle aucune traduction obsolète                                                                                                                                       | Oui          |
| `check-new-key-coverage` (inline) | Une **nouvelle** clé anglaise est traduite dans chaque langue — un marqueur `__MISSING__:` est rejeté                                                                                                                     | Oui          |
| `check-translation-ratio`         | Le taux de traductions réelles par langue (entrées identiques à l’anglais, substituts ou entrées manquantes hors de la liste d’autorisation) ne doit pas dépasser `config/quality/i18n-translation-baseline.json` + marge | **Bloquant** |

Nécessite `fetch-depth: 0` — le contrôle de dérive des valeurs compare `en.json` à la base de fusion.

#### `check-ui-value-drift` — contrôle des traductions obsolètes

Détecte la régression i18n que les autres contrôles ne peuvent structurellement pas repérer : une valeur anglaise
est réécrite tandis que les traductions dérivées de l’anglais _précédent_ restent en place, si bien que
les utilisateurs non anglophones continuent à lire un texte formulé avec assurance, mais désormais erroné.

Cela s’est réellement produit en production. `oauthModal.googleOAuthWarning` a été réécrit lors de l’intégration de
l’assistant de connexion Antigravity (#5203) ; **39 langues sur 43** ont conservé un texte demandant aux opérateurs de « copier
l’URL complète et la coller ci-dessous » — un flux qui ne peut pas aboutir pour ce fournisseur. Cela est passé
inaperçu jusqu’à #8463, car :

- `sync-ui-keys` ne complète que les clés **absentes**, jamais celles qui sont **obsolètes** ;
- `check-ui-keys-coverage` comptabilise la _présence_ des clés, une traduction obsolète est donc considérée comme couverte ;
- `check-translation-drift` suit les miroirs de documentation `docs/i18n/<locale>/**.md` —
  il ne lit jamais `src/i18n/messages/*.json`. Bloquant dans la tâche `docs-sync-strict` depuis la
  resynchronisation de 2026-09 : modifiez un document principal → `npm run i18n:run -- --files=<doc>` (au niveau de la section, peu coûteux).

**Fondé sur les différences, et non sur une référence.** Il compare le fichier `en.json` de la base de fusion à
l’arborescence de travail ; pour chaque clé dont la valeur anglaise a changé, toute langue qui conserve encore une
traduction inchangée est obsolète. Cela **fige délibérément la dette existante** — une différence
ne permet pas de déterminer de quel ancien texte anglais provient une traduction existant depuis longtemps ; le contrôle évalue donc
uniquement ce que la modification actuelle touche. L’autre possibilité (une référence de hachage par clé) nécessiterait
un fichier généré d’environ 600 Ko, soit 3× la taille de la plus grande référence existante, et entraînerait des modifications à chaque PR i18n.

Deux façons de satisfaire ce contrôle :

1. mettre à jour les traductions concernées, ou
2. les définir sur `__MISSING__:<new english>` — l’environnement d’exécution fournit alors le texte anglais corrigé
   (`src/i18n/request.ts::deepMergeFallback`, #7258) et la clé est mise en attente de traduction.

Si le **sens** de la chaîne a changé, préférez **renommer la clé** : une nouvelle clé ne peut pas hériter
d’une traduction obsolète. C’est le modèle utilisé par #8463.

```bash
npm run i18n:check-value-drift          # strict (ce que la CI exécute)
npm run i18n:check-value-drift:warn     # rapport uniquement
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Les contrôles de dérive des valeurs et de nouvelles clés partagent une même comparaison immuable fournie par
`scripts/i18n/resolve-ui-diff-base.mjs`. Le workflow transmet aux deux contrôles les mêmes SHA de base, de pointe de base et
de candidat. Les exécutions liées à une PR ou à un reciblage de base, à un push et à un groupe de fusion utilisent le contexte de leur événement.
Le déclenchement manuel pour une branche candidate nécessite sa PR ouverte exacte ou l’entrée explicite
`i18n_base_sha`. Le déclenchement manuel ou l’observation planifiée de `main` ou de `release/vX.Y.Z`
sans cette entrée compare le dernier commit à son premier parent ; il ne s’agit pas d’un audit de
toute la dette de traduction héritée. L’exécution locale nécessite une base de comparaison explicite,
par exemple la commande `BASE_REF` ci-dessus.

Un contexte de comparaison manquant ou ambigu, un catalogue requis illisible ou non valide, ainsi
qu’un candidat modifié produisent l’état `INCOMPLETE` avec le code de sortie **2**, y compris en mode avertissement.
La lecture des catalogues utilise `scripts/i18n/read-ui-catalog.mjs` ; les échecs de lecture ne sont pas remplacés
par des objets vides. Ni une base indisponible ni des données d’entrée incomplètes ne permettent d’établir l’état PASS.

### Tâche : `i18n`

Matrice complète de validation i18n (une tâche par langue). La tâche entière est consultative.

| Script                          | Valide                                     | Bloquant                                                       |
| ------------------------------- | ------------------------------------------ | -------------------------------------------------------------- |
| `validate_translation.py quick` | L’exhaustivité de la traduction par langue | **Consultatif** (`continue-on-error: true` sur toute la tâche) |

### Tâche : `pr-test-policy`

S’exécute uniquement sur les pull requests.

| Script                 | Valide                                                                                                                                                            | Bloquant |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | Les PR qui modifient le code de production dans `src/`, `open-sse/`, `electron/` ou `bin/` doivent inclure ou mettre à jour des tests (règle stricte nº 8)        | Oui      |
| `check:test-masking`   | Les fichiers de test modifiés ne réduisent pas le nombre net d’assertions et n’ajoutent pas de tautologies `assert.ok(true)`                                      | Oui      |
| `check:pr-evidence`    | Le corps de la PR cite des preuves de test/VPS pour la modification (automatise la règle stricte nº 18 en analysant le texte de la PR — fragile, voir le backlog) | Oui      |

### Tâche : `test-vitest`

Nécessite la tâche de classification `changes`. Les fragments de matrice applicables bloquent la fusion en cas d’échec.

| Suite            | Valide                                                        | Bloquant                                                                                                                           |
| ---------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Serveur MCP (110 outils), autoCombo, cache — exécuteur vitest | Oui                                                                                                                                |
| `test:vitest:ui` | Tests des composants de l’interface — exécuteur vitest        | **Bloquant** — les échecs préexistants sont explicitement exclus dans `vitest.config.ts` ; tout nouvel échec fait échouer la tâche |

### Workflows nocturnes (planifiés, consultatifs)

Ils s’exécutent selon une planification cron (ainsi qu’avec `workflow_dispatch`), jamais sur les PR. Ils sont tous consultatifs.

| Workflow               | Valide                                                                                                                                                                                               | Bloquant        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | Tests basés sur les propriétés avec fast-check, utilisant une graine aléatoire et un nombre élevé d’exécutions                                                                                       | **Consultatif** |
| `nightly-resilience`   | Seuil de croissance du tas, injection de pannes chaotiques, tests de charge/d’endurance k6                                                                                                           | **Consultatif** |
| `nightly-llm-security` | Protection contre l’injection promptfoo (mode blocage) + sondes garak (ignorées sans secret de fournisseur)                                                                                          | **Consultatif** |
| `nightly-schemathesis` | Fuzzing des contrats OpenAPI (schemathesis) sur une instance OmniRoute active avec `docs/openapi.yaml` — met en évidence les violations de spécification et les erreurs 500 non gérées (Phase 8 B.4) | **Consultatif** |
| `nightly-mutation`     | Score des tests de mutation Stryker sur la voie rapide des tests unitaires — les mutants survivants révèlent les assertions faibles                                                                  | **Consultatif** |
| `nightly-compat`       | Matrice de compatibilité du moteur Node pour l’ensemble des plages `engines.node` prises en charge                                                                                                   | **Consultatif** |

Les valeurs de référence des performances (tas, TTFB, temps de compilation) sont enregistrées, mais ne constituent pas des critères bloquants : voir [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
- **consultatif** — le total global par rapport à la référence figée. Une dérive héritée ne fait jamais
  passer au rouge une PR qui n’y est pour rien ; la dérive est suivie afin d’être corrigée lors de la réconciliation de la version et surveillée par la
  tâche de marge disponible.

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

Chaque contrôle qui ne peut pas échouer en raison de violations préexistantes utilise une liste d’autorisation figée
(par exemple, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). La politique est la suivante :

**Corrigez la cause racine ; n’utilisez la liste d’autorisation que lorsque la violation est préexistante et
ne peut pas être corrigée dans la même PR.**

Lorsque vous ajoutez une entrée à une liste d’autorisation :

1. Incluez un commentaire avec la justification.
2. Faites référence au ticket de suivi (par exemple, `// #3498 — Phase 2 feature, not yet implemented`).
3. Supprimez l’entrée dans la même PR qui corrige la violation — une entrée obsolète qui ne
   masque plus une violation active constitue elle-même un défaut (le contrôle des règles obsolètes 6A.3
   fera échouer le contrôle en cas d’entrée orpheline dans la liste d’autorisation une fois mis en œuvre).

N’ajoutez **pas** d’entrées à la liste d’autorisation pour faire passer les tests plus rapidement. Un contrôle au vert accompagné d’une liste
d’autorisation qui s’allonge donne une fausse impression de qualité.

### Lorsqu’un contrôle échoue sur votre PR

1. **Lisez attentivement la sortie du contrôle** — elle vous indique précisément quel fichier ou symbole a enfreint
   la règle.
2. **Corrigez la violation** — la plupart des contrôles sont des vérifications déterministes du système de fichiers qui réussissent dès que
   le code est correct.
3. **Si la violation est préexistante** (c’est-à-dire que vous ne l’avez pas introduite, mais que le contrôle la
   couvre désormais) : ajoutez une entrée à la liste d’autorisation avec un commentaire de justification et un ticket de suivi.
4. **Si le contrôle est un mécanisme à cliquet** (couverture, avertissements ESLint, duplication, complexité) :
   votre modification a dégradé la métrique. Corrigez le problème sous-jacent ou, dans de rares cas, exécutez
   `npm run quality:ratchet -- --update` si la modification est intentionnelle et que la
   dégradation de la métrique est acceptable — mais expliquez pourquoi dans la description de la PR.
5. **Les contrôles consultatifs** (`continue-on-error: true`) sont informatifs — ils ne bloquent pas
   la fusion, mais apparaissent dans le récapitulatif de la CI. Corrigez-les malgré tout.

---

## Ajout d’une nouvelle garde

1. Créez `scripts/check/check-<name>.mjs` (ou `.ts`). Les gardes de politique se terminent avec le code 0/1.
   Les gardes à seuil progressif émettent une métrique dans `quality-metrics.json` via `collect-metrics.mjs`.
2. Ajoutez `"check:<name>": "node scripts/check/check-<name>.mjs"` à `package.json`, puis
   synchronisez l’alias et sa commande exacte dans `config/quality/gate-manifest.json`.
   Appliquez la même synchronisation lors de la modification ou de la suppression d’un alias de validation existant.
   Exécutez `npm run check:gate-manifest` ; le hook de pré-commit et la classification des modifications dans la CI
   imposent ce contrat.
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
a identifié les candidats à la rationalisation suivants. **Les fusions sont des
modifications mécaniques de la CI ; les basculements/suppressions sont des décisions de
politique réservées à l’opérateur.** Rien de ce qui suit n’est encore appliqué.

**Également non documentés ci-dessus** (consultatifs, signal faible) : la tâche `docs-lint`
(markdownlint + Vale, tâche entière avec `continue-on-error`) et les workflows d’analyse
autonomes `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` figure dans
`quality-baseline.json`, mais n’est pas relié à un cliquet bloquant dans `ci.yml` — la
métrique est actuellement orpheline.

### Fusion / déduplication (mécanique, risque moindre)

Chaque candidat a été validé par rapport à l’état réel des contrôles le 2026-06-17
(vérifier tout en faisant confiance) ; plusieurs fusions « évidentes » se sont avérées
masquer de la dette et ne constituent **pas** des remplacements directs propres.

- **`check:docs-sync` s’exécute deux fois** — de façon autonome dans la tâche `lint`, puis de nouveau dans `check:docs-all` (`docs-sync-strict`) et dans le hook de pré-commit husky. ✅ **TERMINÉ** — invocation autonome supprimée de `lint`.
- **Analyse des CVE** — ❌ **PAS une fusion propre.** `audit:deps` bloque les avis critiques et les audits incomplets sur les cinq lockfiles, tout en signalant les avis de gravité élevée comme des avertissements selon la politique actuelle ; `check:vuln-ratchet` (osv) échoue uniquement en cas de _régression_ par rapport à la référence archivée et rejette les mesures manquantes lorsqu’elles sont requises. Les sémantiques diffèrent — supprimer `audit:deps` ferait perdre le contrôle critique absolu et les justificatifs indépendants d’audit des paquets. Conserver les deux.
- **Détection des cycles** — ✅ **TERMINÉ** (#15159 G-01/G-02). L’ancien texte qualifiait ici `check:cycles` de contrôle « vert et organisé » et justifiait son maintien comme contrôle bloquant parce que `check:circular-deps` (dpdm) signalait 91 cycles. Ce vert était un **faux vert** : `check:cycles` analysait 5 sous-répertoires (450 fichiers), ne reconnaissait que les formes statiques `import|export … from` et ignorait tous les spécificateurs `@/` et `@omniroute/open-sse/` ; il ne pouvait donc pas détecter les cycles liés aux imports dynamiques et aux alias qui dominaient le dépôt. Correction : le contrôle parcourt désormais `src` + `open-sse` (5 023 fichiers), collecte les spécificateurs à partir de l’AST TypeScript (ainsi, `import("…")` est pris en compte, contrairement à `typeof import("…")` en position de type) et résout les `paths` de tsconfig. Il trouve **14** cycles, et non 0. Comme 14 cycles préexistants ne peuvent pas être corrigés dans une PR de contrôle, `check:cycles` est désormais un **cliquet** (`--ratchet`, plafond `metrics.cycles.value = 14` dans `quality-baseline.json`, `direction: down`) — il bloque toute _régression_ et le nombre ne peut que diminuer. La CI exécute `npm run check:cycles:ratchet`. La résorption progressive est intégrée à **A-01**. `check:circular-deps` (dpdm) reste consultatif en tant que second avis plus large.
- **Complexité** — ✅ **TERMINÉ** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`) : un seul parcours ESLint, avec des comptages par ruleId afin que les références de complexité cyclomatique + max-lines et de complexité cognitive restent indépendantes ; les commandes individuelles `check:complexity` / `check:cognitive-complexity` sont conservées pour les mises à jour locales avec `--update`.
- **Anti-hallucination pour `/api`** — ✅ **TERMINÉ** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`) : un seul inventaire du système de fichiers pour `src/app/api` ; openapi-routes + docs-symbols continuent de produire des rapports indépendants ; les commandes individuelles sont conservées pour les exécutions locales.
- **`check:node-runtime` s’exécute dans 11 tâches** — ⚠️ **ROI faible.** Chacune utilise un runner distinct et le contrôle dure moins de 1 s ; économie totale d’environ 10 s, au prix de la perte d’une protection peu coûteuse propre à chaque tâche. Le jeu n’en vaut pas la chandelle.
- **`typecheck:noimplicit:core` dans la tâche lint de la CI** — ✅ **supprimé de la tâche lint** (était consultatif avec `continue-on-error`) ; la surface de types bloquante est `typecheck:core` + `check:type-coverage`. Le script local est conservé.

### Basculer / décider (politique de l’opérateur)

- `check:openapi-security-tiers` (consultatif) — ❌ **PAS directement basculable.** Il se termine avec le code 0, mais avertit que plusieurs routes `traffic-inspector` sous `LOCAL_ONLY_API_PREFIXES` ne comportent pas l’annotation `x-loopback-only: true`. Son application stricte nécessite d’abord l’ajout de ces annotations à `openapi.yaml`.
- `typecheck:noimplicit:core` (consultatif) — largement couvert par le cliquet bloquant `check:type-coverage`. Le transformer en cliquet ou supprimer ce second passage `tsc` redondant.
- `test:vitest:ui` (désormais **bloquant**) — les échecs préexistants sont explicitement exclus dans `vitest.config.ts` avec des commentaires de suivi `// #8618` ; tout nouvel échec fait échouer la tâche.
- `check:secrets` (gitleaks, cliquet bloquant) — le plafond actuel est `metrics.secretFindings` dans `quality-baseline.json`. Toute exception nécessite une entrée justifiée dans `.gitleaks.toml` ; une mesure indisponible est INCOMPLÈTE. L’analyse complète la détection native des secrets de GitHub et `check:public-creds`.
- `check:pr-evidence` (bloquant, recherche du texte libre dans le corps de la PR) — risque élevé de faux positifs ; sa suppression affaiblirait l’application de la Règle stricte nº 18, il s’agit donc d’un véritable choix de politique.
- `semgrep` (autonome, consultatif) — recoupe CodeQL pour les familles OWASP ; relier sa référence à un cliquet ou le supprimer.

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
