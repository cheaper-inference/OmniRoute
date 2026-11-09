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

Les workflows CI et Quality Gates émettent chacun un verdict stable : `Gate / CI` et `Gate / Quality`. Leur politique d'admission versionnée énumère chaque emploi en amont comme requis ou consultatif. Une tâche requise applicable doit réussir : les résultats manquants, annulés, ignorés, en attente et inconnus ne peuvent pas établir PASS. Une classification valide de documents uniquement ou de catalogue uniquement peut rendre une voie de code inapplicable ; un projet ordinaire PR n'est pas un candidat accepté. Une étiquette `hotfix` ne renonce pas aux preuves.

Les deux flux de travail couvrent PRs dans les branches main/release, les push vers `main`, la répartition manuelle et les événements de groupe de fusion. Push, dispatch et merge-group exécutent la sélection complète. Un brouillon de file d'attente Mergify fiable exécute également les tâches `full-code`/`full-code-e2e` applicables ; PRs ordinaire, ignorez-les. Avant une fusion manuelle, effectuez une répartition complète sur le candidat exact. Les push vers `release/**` ne démarrent pas ces flux de travail ; Release-Green observe la base fusionnée séparément (voie hébergée `docs/ops/RUNNER_BOX.md` → ). Les forks et les groupes de fusion utilisent des exécuteurs hébergés pour les tâches qui autrement sélectionnent des exécuteurs auto-hébergés ; une capacité hébergée suffisante doit être vérifiée avant le déploiement.

Un PR ordinaire exécute la sélection rapide. Les voies `full-code` et `full-code-e2e` de la politique d'admission (E2E, Integration, Package Artefact, Electron Smoke, Bun SQLite, Ecosystem et Protocol Clients) s'exécutent uniquement sur un brouillon de file d'attente Mergify ou sur une exécution complète : `gh workflow run ci.yml --ref <branch>`.

Chaque reçu JSON identifie le SHA extrait, l'exécution et la tentative de flux de travail. Le CLI rejette une inadéquation checkout/event SHA. Les tests de workflow lient l'adhésion à la stratégie à la liste `needs` de la tâche de verdict afin qu'une voie nouvelle ou supprimée ne puisse pas disparaître silencieusement. Les reçus couvrent leur propre flux de travail, et non la publication, le déploiement ou les éléments internes d'un scanner consultatif existant. Effectuer les vérifications applicables requises dans les règles de la succursale constitue un changement administratif distinct ; définir leurs métiers ne protège pas en soi une branche.

`API Route Typecheck` est une vérification de flux de travail indépendante, en dehors des verdicts globaux et du profil statique de l'observateur local complet. Inspectez son résultat séparément pour le candidat exact. `.github/workflows/api-route-typecheck.yml` s'exécute sur PRs dans `main` ou `release/**`, est poussé vers la famille de branches, la répartition manuelle et les événements `merge_group` de type `checks_requested`. Il n'a pas de filtre de chemin. Fusionner les groupes, consultez `merge_group.head_sha`; d'autres événements consultez `github.sha`. Tous les événements utilisent les mêmes tests de porte de diagnostic API et d'unité de porte. Les retargets de base PR demandent une nouvelle vérification ; Les modifications body/title utilisent le nom d'observation uniquement `Admission not requested / API Route Typecheck` et ne peuvent pas remplacer le contrôle d'admission.

### Preuves conservées dans le réducteur d’acceptation

`scripts/quality/validate-release-acceptance.mjs` réduit un plan fourni et ses manifestes ;
il n’établit pas que le plan couvre l’intégralité du pipeline de livraison. Ses rapports
définissent explicitement `releaseAcceptance: false`, même lorsque ce plan est
`VERIFIED`. Le workflow `release-acceptance.yml` utilise encore des fixtures fantômes,
et non de véritables reçus de build, de packaging, de démarrage ou de promotion.

La CLI exige `--evidence-root` pour vérifier les preuves conservées. Les fichiers sont
résolus sous la forme `<evidence-root>/<artifact_id>/<member>` et hachés avec SHA-256. Un
enregistrement PASS sans preuve, un fichier manquant ou modifié, un chemin non sécurisé
ou un lien symbolique empêche la vérification. Les fichiers manquants ne sont pas
équivalents à des journaux vides indiquant une réussite. Les vérifications existantes du
SHA, de l’exécution et de la tentative restent indépendantes : des octets identiques ne
peuvent pas valider un reçu obsolète. L’intégrité des fichiers ne prouve ni
l’authenticité de l’exécution ni la promotion de l’artefact.

### DAST utilise le build CI vérifié

Le job CI obligatoire `dast-smoke` appelle `.github/workflows/dast-smoke.yml` après `build`. Il suit la même sélection de code et de brouillons que le build, y compris les PR de forks pris en charge, les PR ciblant une release et les groupes de fusion. Un job DAST absent, échoué, annulé ou ignoré de façon inattendue bloque `Gate / CI`. Le workflow réutilisable ne possède aucun déclencheur PR ou manuel indépendant ; la validation manuelle passe par le déclenchement de CI, afin que le build et son consommateur restent dans la même exécution.

`scripts/ci/next-build-provenance.mjs` scelle l'artefact Next complet avec son empreinte tar, le dépôt, l'événement et l'exécution, la tentative du producteur, head/base/checkout/tree, les identités des workflows, le lockfile, la version et l'ABI exacts de Node, la plateforme et le bundler. DAST sélectionne l'identifiant immuable de l'artefact dans `needs.build.outputs`, exige la vérification de l'empreinte du téléchargement et calcule indépendamment l'empreinte du ZIP pour la comparer à celle du producteur, avant d'extraire ses deux membres autorisés avec `scripts/ci/unpack-ci-build.py`. Le manifeste et l'archive tar doivent également correspondre aux sorties indépendantes du producteur avant l'extraction de l'arbre Next. Il ne recherche jamais le dernier build réussi d'une branche. Une relance partielle peut réutiliser cette même tentative du producteur si son identifiant et toutes ses entrées correspondent toujours ; le reçu consigne les deux tentatives.

Le consommateur reste sur un runner Linux hébergé, avec un accès au dépôt en lecture seule et sans secrets du dépôt. Il installe la version exacte de Node du producteur, puis assemble la CLI avec `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` rejette l'absence d'un serveur autonome avant tout build de secours ; les builds CLI locaux ordinaires conservent leur mécanisme de secours existant. La disponibilité du serveur, Schemathesis et promptfoo doivent tous réussir dans la limite inchangée de 25 minutes du job. Un reçu de provenance prouve l'identité et les octets des entrées, pas la réussite d'une analyse DAST. L'expiration de l'artefact, l'interruption du runner ou l'échec d'un scanner restent des preuves incomplètes ou d'échec ; un wrapper consultatif ne peut pas les transformer en PASS.

### Capacité d’exécution de l’interface utilisateur

CI exécute l’inventaire complet de l’interface utilisateur sous forme de quatre shards de
matrice `test-vitest`, chacun avec au plus deux workers par shard et la limite existante
de 15 minutes par job. Le premier shard exécute également la suite Vitest MCP/autoCombo.
Le résultat du job obligatoire couvre chaque branche de la matrice ; l’échec ou
l’annulation d’un shard ne permet pas d’établir l’admission du candidat.

L’observateur nocturne conserve un reçu distinct correspondant exactement au candidat
pour chaque shard de l’interface utilisateur, y compris l’exécution MCP dans le premier
reçu. Les quatre reçus, les journaux et les identités d’exécution correspondantes sont
obligatoires. En local, `npm run test:vitest:ui` sélectionne toujours la suite complète ;
une seule exécution avec `--shard` ne constitue qu’une preuve partielle.

### Collecte de la couverture unitaire

Les douze shards unitaires collectent la couverture V8 pendant l’exécution de leurs tests
existants. Un shard réussi exécute `scripts/ci/compact-v8-coverage.mjs` pour compresser
les fichiers d’origine sans générer de rapport Istanbul intermédiaire. Le job final
Coverage vérifie les douze manifestes par rapport au SHA du candidat, au runtime, à la
racine des sources et aux hachages des données, puis exécute les reporters de c8 et les
seuils de couverture existants. Les entrées conservent l’ordre global des noms de
fichiers de c8 ; une pré-fusion par shard n’est pas sûre pour une couverture mixte des
fonctions et des blocs. Les shards manquants, mal formés ou incompatibles font échouer
l’admission. Les shards de test ayant échoué conservent séparément la couverture
diagnostique brute ; celle-ci ne peut pas être intégrée à la fusion finale.

### Reçus de progression de l’exécution des tests unitaires

La commande partagée `test:unit:ci:shard` enregistre les phases `primary`, `dashboard` et `serial`
via `scripts/ci/unit-progress-reporter.mjs`. Le rapport de test habituel reste
disponible. Un reçu distinct contenant uniquement des métadonnées enregistre le début et la fin de chaque fichier,
et un signal périodique toutes les 30 secondes répertorie les fichiers toujours actifs ainsi que leur durée d’exécution. Il enregistre
uniquement les métadonnées d’exécution autorisées ; les descriptions des tests, les sorties, le contenu des erreurs et l’environnement
complet ne sont pas sérialisés.

CI conserve les fichiers JSONL sous le nom `unit-progress-ci-<run>-<attempt>-<shard>`. L’expiration du délai d’une tâche peut empêcher le téléversement ultérieur ;
les signaux périodiques déjà émis restent des éléments de diagnostic. L’absence de signaux périodiques peut également indiquer
un processus d’exécution bloqué ou arrêté. Ces reçus préservent la sélection des tests,
la concurrence, les échéances et le statut de sortie existants ; ils ne constituent pas des décisions d’admission des candidats.

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

L’inventaire versionné des alias npm et l’appartenance aux analyses statiques se trouvent
dans `config/quality/gate-manifest.json`. Exécutez `npm run check:gate-manifest` pour
valider les noms de scripts et les commandes exactes par rapport à `package.json` ; les
ajouts, suppressions et dérives de commandes font échouer à la fois le hook local et les
jobs de classification des modifications dans CI. Un alias n’est ni un job de workflow,
ni une instance de matrice, ni un cas de test : ces décomptes ne doivent pas être
présentés comme interchangeables.

Utilisez `npm run quality:scan -- --list` ou `npm run quality:scan:fast -- --list`
pour examiner les alias sélectionnés sans les exécuter. Le runner appelle le point
d’entrée npm, ce qui préserve son runtime, y compris Bun lorsqu’il est configuré.
Le manifeste enregistre les alias situés en dehors de ces profils comme invoqués
séparément, et les commandes de maintenance sont interdites dans les profils d’analyse
en lecture seule.

Ces profils couvrent uniquement l’analyse statique. Ils ne certifient ni les tests du
produit, ni la couverture, ni le packaging, ni les vérifications externes, ni
l’acceptation complète d’un candidat pour la livraison. L’admission par le workflow
utilise les fichiers liés `config/quality/admission-policy.json` et
`scripts/quality/admission-verdict.mjs`. Les profils de l’observateur de livraison
restent distincts ; examinez indépendamment leurs vérifications applicables et leurs
reçus. Les commandes statiques de l’observateur complet sont déclarées dans
`config/quality/release-green-static-profile.json`, notamment `audit:deps`, la sélection
des tests de mutation et les vérifications de traduction. Le chargeur valide les
commandes npm par rapport à package.json et aux déclarations CI/Quality modélisées ; il
rejette toute dérive au lieu d’exécuter des tokens shell comme arguments. Une sortie
SKIP/INCOMPLETE d’un scanner obligatoire ne peut pas établir un PASS. Le profil consigne
ses exclusions externes et ne remplace pas les preuves hébergées de couverture, de
matrices de tests, de packaging ou de déploiement. L’inventaire textuel ci-dessous est
une référence, et non la preuve qu’une gate a effectivement été exécutée.

Les scripts se trouvent sous `scripts/check/` pour les gates de politique et sous
`scripts/quality/` pour le moteur de ratchet. La source de vérité de CI est
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

### Libérer le chemin rapide PR (`quality.yml`)

`.github/workflows/quality.yml` complète CI sur main/release PRs, pousse vers `main`, répartit et fusionne les groupes. PRs utilise des vérifications rapides filtrées par chemin. La version en double désactivée de façon permanente a été supprimée ; les vrais contrôles build/package/boot restent dans CI. La suite unitaire et vitest fonctionnent uniquement en CI (`Unit Tests (N/8)` et `Vitest`).

| Emploi                                           | Portée                                                                                                                                                                                                                                                            | Blocage                        |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs et docs-all                                                                                                                                                                                                                          | Oui                            |
| `Fast Quality Gates`                             | PRs; vérifications statiques, vérification de type, vérification de type du tableau de bord, tests unitaires impactés                                                                                                                                             | Oui                            |
| `Forgotten sibling tests`                        | PRs; les modules modifiés sont attribués aux consommateurs statiques et aux tests des frères et sœurs candidats ; les chemins d'importation barils et dynamiques sont signalés comme diagnostics consultatifs, avec des exceptions de liste autorisée référencées | **Consultatif**                |
| `No new ESLint warnings`                         | PRs; protection anti-peluches sensible aux suppressions                                                                                                                                                                                                           | Oui, y compris les fourchettes |
| `Merge integrity (changelog + generated skills)` | PRs non brouillon ; journal des modifications et synchronisation des compétences générées                                                                                                                                                                         | Oui, y compris les fourchettes |

#### Rapport de tests de frères et sœurs oubliés

`npm run check:forgotten-sibling-tests` s'exécute comme une étape consultative de `Fast Quality Gates` et réutilise le résolveur d'importation derrière la carte test-impact. Pour chaque module de production modifié, il signale les chaînes `changed module/symbol -> static consumer -> candidate sibling test` déterministes lorsque le test candidat est absent du diff pull-request. Le résumé Markdown et le résultat JSON sont conservés en tant qu'artefact de flux de travail `forgotten-sibling-tests` pour l'étalonnage avant tout déploiement de blocage.

Les réexportations de barils et les importations dynamiques sont uniquement des diagnostics de résolution ; ils ne créent jamais de constatation bloquante. Les exceptions examinées sont disponibles dans `config/quality/forgotten-sibling-allowlist.json`. Chaque entrée doit nommer le test consommateur et candidat, donner une justification spécifique et lier un problème GitHub ou une pull request. Les entrées mal formées ne sont pas fermées. Les exceptions ne peuvent pas supprimer un test candidat supprimé ou un diff qui ajoute `.skip`/`.todo`; l'affaiblissement des assertions et autres masquages restent la propriété de la porte `check:test-masking` bloquant indépendamment.

### Tâche : `lint`

S’exécute sur chaque PR vers `main`. Bloque la fusion en cas d’échec.

| Script (`npm run ...`)            | Valide                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bloquant                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | La version de Node.js se situe dans la plage prise en charge                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Oui                                         |
| `check:cycles`                    | Les imports circulaires dans l’ensemble de `src/` + `open-sse/` (basé sur l’AST, avec résolution des `paths` de tsconfig). La commande seule se termine avec le code 1 dès qu’un cycle existe (échec par défaut depuis #15281) et répertorie les SCC. `check:cycles:ratchet` (ce que la CI exécute) bloque lorsque le nombre dépasse le plafond `metrics.cycles` défini dans `quality-baseline.json` — actuellement 14, `direction: down`, il ne peut donc que diminuer (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Oui (mécanisme à cliquet)                   |
| `check:boundary`                  | Couplage `open-sse → src` : imports uniques de fichier à fichier depuis le moteur vers l’application (`scripts/quality/measure-boundary.mjs` ; la liste des arêtes constitue le backlog de remédiation pour la séparation du cœur/des modules de la v4). Commande seule = rapport consultatif (identique à `quality:boundary`). `check:boundary:ratchet` (ce que la CI exécute, également dans la boucle à cliquet des contrôles rapides de `quality.yml`) bloque lorsque le nombre dépasse le plafond `metrics.boundaryOpenSseToSrc` défini dans `quality-baseline.json` — initialisé à la valeur mesurée de 771, `direction: down` ; `--update` ne peut que l’abaisser ; relatif à la branche de base pour les PR (`--base-ref`, voir ci-dessous)                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oui (mécanisme à cliquet)                   |
| `check:route-validation:t06`      | Présence de schémas Zod sur toutes les routes (politique de niveau 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oui                                         |
| `check:any-budget:t11`            | Le nombre de `@ts-expect-error // any` ne dépasse pas le budget (niveau 11, catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oui                                         |
| `check:provider-consistency`      | Chaque fournisseur dans `providers.ts` possède une entrée correspondante dans `providerRegistry.ts` (et inversement, dans les limites de la liste d’autorisation)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Oui                                         |
| `check:model-lifecycle`           | Les trois tables de routage gérées manuellement restent cohérentes avec l’instantané du cycle de vie archivé (#11503) : `FITNESS_TABLE` (`taskFitness.ts`) n’attribue de score à aucun identifiant retiré que `REGISTRY` peut acheminer ; chaque cible de `BUILT_IN_ALIASES` est présente dans `REGISTRY` et absente de l’instantané des identifiants retirés ; chaque identifiant retiré encore présent dans `REGISTRY` est redirigé ou répertorié dans `allowedRetiredInCatalog` ; et aucune source ni cible de `DEFAULT_DEGRADATION_MAP` n’apparaît comme retirée dans cet instantané. Cela ne prouve pas qu’un modèle est actuellement servi par un service amont actif. Hors ligne — effectue la comparaison avec `config/quality/model-lifecycle.json`, actualisé manuellement avec `npm run quality:refresh-model-lifecycle` (réseau ; non intégré à la CI). `allowedRetiredInCatalog` est un mécanisme à cliquet de réduction progressive : n’ajoutez une entrée qu’avec un ticket de suivi.                                                                                                                                                                                                                             | Oui                                         |
| `check:fetch-targets`             | Chaque `fetch("/api/...")` dans le répertoire client `src/` correspond à un véritable `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oui                                         |
| `check:deps`                      | Toutes les dépendances pouvant être installées avec `npm install` dans chaque `package.json` du dépôt figurent dans `dependency-allowlist.json` ; les nouveaux paquets sans version épinglée ou issus du slopsquatting sont signalés                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oui                                         |
| `audit:deps`                      | Audit npm des cinq fichiers de verrouillage indépendants (racine, Electron, plugins OpenCode v1/v2 et fournisseur). Les avis critiques sont bloquants ; les avis de niveau élevé restent affichés comme avertissements. Les audits manquants ou ayant échoué sont marqués INCOMPLETS et sont bloquants ; les empreintes des fichiers de verrouillage et les rapports sont conservés pour chaque périmètre.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Oui                                         |
| `check:lockfile`                  | Intégrité de `package-lock.json` — registre https, hachages d’intégrité, aucune substitution d’hôte                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oui                                         |
| `check:licenses`                  | Liste d’autorisation des licences SPDX pour les dépendances de production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oui                                         |
| `check:tracked-artifacts`         | Aucun artefact de build / lien symbolique `node_modules` validé (également exécuté dans le pre-commit husky ; le pre-push est intentionnellement léger — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Oui                                         |
| `check:ai-attribution`            | Aucune mention de fin `Co-Authored-By` d’IA/bot ni aucun pied de page indiquant une génération par IA dans les commits, le titre ou le corps de la PR — règle stricte nº #16 (dans la boucle de vérifications rapides de `quality.yml` pour les PR→`release/**` — lit la charge utile de l’événement, sans effet hors des PR — et dans une étape réservée aux PR de la vérification lint de `ci.yml` pour les PR→`main` ; également dans le hook `commit-msg` de husky ; coauteurs humains autorisés ; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Chaque exclusion Vitest indique un ticket de suivi et figure dans `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oui                                         |
| `check:file-size`                 | Les fichiers sources (`.ts`/`.tsx` dans `src/`, `open-sse/`, `electron/`, `bin/`) restent dans la limite `cap` et les fichiers de test (`*.test.ts(x)`) dans la limite `testCap` ; les fichiers gelés dans `file-size-baseline.json` (`frozen` / `testFrozen`) ne doivent pas dépasser leur taille enregistrée                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oui                                         |
| `check:error-helper`              | Les réponses d’erreur dans les exécuteurs/gestionnaires utilisent `buildErrorBody()` / `sanitizeErrorMessage()` (Règle stricte nº #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Oui                                         |
| `check:migration-numbering`       | Les fichiers SQL de migration sont numérotés séquentiellement, sans lacunes ni doublons                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oui                                         |
| `check:public-creds`              | Aucun `client_id`/`client_secret` OAuth littéral ni aucune clé Web Firebase en dehors de `publicCreds.ts` (Règle stricte nº #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oui                                         |
| `check:db-rules`                  | Aucun SQL brut en dehors des modules `src/lib/db/` ; aucune importation depuis le fichier d’agrégation `localDb.ts` (Règles strictes nº #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oui                                         |
| `check:known-symbols`             | Les exécuteurs de fournisseurs, les stratégies de routage et les traducteurs enregistrés dans leurs tables de répartition correspondent aux fichiers présents sur le disque — aucun symbole orphelin ou non déclaré                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oui                                         |
| `check:route-guard-membership`    | Chaque route qui lance un processus enfant est classée par `isLocalOnlyPath()` (Règles strictes nº #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui                                         |
| `check:test-discovery`            | Chaque fichier `*.test.ts` / `*.spec.ts` du dépôt est collecté par au moins un exécuteur de tests (mécanisme à cliquet : la liste des fichiers orphelins dans `test-discovery-baseline.json` ne peut que diminuer)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oui                                         |
| `check:test-tla-order`            | Aucun fichier `node:test` sous `tests/unit` n’enregistre un test, n’atteint un `await` au niveau supérieur, puis n’enregistre d’autres tests (#18045 ; mécanisme à cliquet : `test-tla-order-allowlist.json` ne peut que diminuer)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oui                                         |
| `check:agent-skills-sync`         | Les artefacts générés des compétences d’agent correspondent à leur catalogue source (aucune dérive)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Les logos/ressources des fournisseurs comportent une entrée de provenance enregistrée                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | Les fichiers de configuration JSON sont analysés correctement et respectent les règles de lint du dépôt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | Compilation TypeScript sans erreur (avertissements consultatifs uniquement)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui                                         |
| `typecheck:noimplicit:core`       | Mode strict `noImplicitAny` — objectif à terme ; de nombreux sites d’appel préexistants nécessitent encore des annotations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **Consultatif** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limité à `src/app/(dashboard)/**` (#7033) — la liste d’autorisation soigneusement sélectionnée de 27 fichiers de `typecheck:core` n’inclut aucun fichier TSX du tableau de bord, et `next build` n’effectue jamais non plus de vérification de types sur celui-ci (`next.config.mjs` définit `ignoreBuildErrors: true`) ; les régressions liées aux identifiants orphelins à cet endroit (#6625/#6909) étaient donc invisibles pour la CI. Compare avec une référence figée du nombre d’erreurs par fichier et par code TS (`config/quality/dashboard-typecheck-baseline.json`, selon le même modèle d’application de l’obsolescence que `check:known-symbols`) — seules les NOUVELLES erreurs dépassant le nombre de référence font échouer le contrôle ; abaissez progressivement la référence avec `--update` lorsqu’une erreur préexistante est corrigée.                                                                                                                                                                                                                                                                                                                                                              | Oui                                         |
| `check:build-typecheck`           | Vérification de types de production sur l’ensemble de l’application via `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), que ne couvrent ni la liste d’autorisation de 27 fichiers de `typecheck:core` ni le contrôle du dashboard. Compare les différences avec `config/quality/build-typecheck-baseline.json` ; une nouvelle occurrence ou une augmentation du nombre par paire (fichier, code) fait échouer le contrôle, tandis qu’une diminution vous demande de réduire progressivement la référence. `--update` refuse d’agir tant que l’exécution contient une paire nouvelle ou en hausse, sauf si `--force-regressions` est fourni, et refuse également un fichier nouvellement réduit au silence, sauf si `--force-nocheck` est fourni ; ainsi, élargir la référence pour obtenir un résultat positif et accorder une désactivation permanente sont deux actions délibérées distinctes. Un simple `--force` est refusé. Analyse également le périmètre de build à la recherche de `@ts-nocheck` par rapport à `config/quality/ts-nocheck-baseline.json`, car un fichier qui l’utilise ne signale aucun diagnostic et serait autrement invisible pour tous les contrôles. | Oui                                         |

#### Les deux programmes de vérification de types répondent différemment

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) et `check:build-typecheck` compilent des programmes différents avec des
options différentes, et un même fichier peut être propre dans l’un et contenir de nombreuses
erreurs dans l’autre.

`tsconfig.build.json` définit `"strict": false`, donc `noImplicitAny` est désactivé. La
configuration core compile une liste d’autorisation organisée de 27 fichiers avec des options
plus strictes et suit le graphe d’importation de chaque entrée ; les fichiers qui
n’apparaissent jamais dans le programme de build sont donc tout de même vérifiés ici.

La conséquence est importante lorsqu’il s’agit de déterminer si un fichier est typé : **zéro diagnostic
sous `check:build-typecheck` ne signifie pas zéro erreur**. La suppression de
`@ts-nocheck` de 26 fichiers a montré que 23 d’entre eux étaient propres dans le programme de build ;
seize d’entre eux ont fait apparaître environ 120 erreurs d’implicit-any dans le programme strict.
Vérifiez les deux avant de déclarer un fichier propre.

### Tâche : `quality-gate`

S’exécute après `test-coverage`. Bloque la fusion en cas d’échec.

| Script                       | Vérifie                                                                                                                                                                                | Bloquant                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `quality:collect`            | Génère `quality-metrics.json` (nombre d’avertissements ESLint, couverture issue du rapport fusionné des fragments)                                                                     | Oui (en amont du mécanisme à cliquet) |
| `quality:ratchet`            | Chaque métrique de `quality-baseline.json` n’a pas régressé (avertissements ESLint ≤ référence ; couverture ≥ référence)                                                               | Oui                                   |
| `check:duplication`          | La duplication de code (jscpd@4) ne dépasse pas la référence définie dans `quality-baseline.json`                                                                                      | Oui                                   |
| `check:complexity`           | La complexité cyclomatique au niveau des fichiers ne dépasse pas le plafond (`complexity` d’ESLint core + `max-lines-per-function`)                                                    | Oui                                   |
| `check:cognitive-complexity` | Mécanisme à cliquet pour la complexité cognitive (`eslint-plugin-sonarjs`) — passage ESLint distinct ; la CI exécute les deux ensemble dans l’unique étape `check:complexity-ratchets` | Oui                                   |
| `check:dead-code`            | Le mécanisme à cliquet pour les exports/fichiers inutilisés (knip) ne régresse pas par rapport à la référence                                                                          | Oui                                   |
| `check:compression-budget`   | Budget du benchmark de compression — les seuils minimaux d’économie de jetons propres à chaque moteur ne doivent pas régresser                                                         | Oui                                   |
| `check:type-coverage`        | Le mécanisme à cliquet du pourcentage de code typé (`type-coverage`) ne régresse pas ; remplace en grande partie `typecheck:noimplicit:core`                                           | Oui                                   |

### Jobs : `codeql-scan` et `codeql-admission`

`codeql-scan` produit toutes les catégories d'analyse configurées. Après la réussite de ce job, `codeql-admission` valide ses téléversements exacts et le cliquet d'alertes du candidat. Les deux sont des dépendances obligatoires de `Gate / CI`, y compris pour les candidats ne modifiant que la documentation. Les exigences d'activation administrative et de canari sont décrites sous « Cliquet CodeQL » ci-dessous.

| Script                 | Validation                                                                                                                                                                                                                          | Bloquant |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:codeql-ratchet` | La référence/SHA du candidat et toutes les catégories d'analyse configurées doivent être à jour avant le cliquet d'alertes ; toute preuve manquante bloque. L'inventaire global reste distinct — voir « Cliquet CodeQL » ci-dessous | Oui      |

### Tâche : `quality-extended`

La tâche bloque les candidats concernés. La taille du bundle, les secrets détectés, les
vulnérabilités détectées, les problèmes détectés dans les workflows et les modifications
OpenAPI sont vérifiés à l’aide de mécanismes à cliquet obligatoires.
Les diagnostics de dépendances circulaires restent consultatifs. L’installation des analyseurs
est obligatoire : `scripts/ci/install-quality-scanners.sh` installe les versions épinglées et
propage les échecs d’installation. Les outils manquants, les rapports non valides ou les références
manquantes laissent le contrôle obligatoire des analyseurs dans l’état INCOMPLET.

| Script                   | Vérifie                                                                                                                                                                                                                                                                          | Blocage                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `check:circular-deps`    | Absence de dépendances circulaires (dpdm)                                                                                                                                                                                                                                        | **Informatif**                                             |
| `check:bundle-size`      | La taille du bundle ne dépasse pas la limite ; une mesure indisponible provoque un échec                                                                                                                                                                                         | **Bloquant avec --ratchet**                                |
| `check:secrets`          | Les détections de Gitleaks ne régressent pas ; les analyses obligatoires rejettent les outils, sources ou références manquants, les analyses ayant échoué et les rapports non valides                                                                                            | **Bloquant avec --ratchet**                                |
| `check:vuln-ratchet`     | Les vulnérabilités des dépendances ne régressent pas ; les analyses obligatoires rejettent les outils manquants, les rapports non valides ou les références manquantes                                                                                                           | **Bloquant avec --ratchet**                                |
| `check:workflows`        | Lint des workflows (actionlint + zizmor) ; les scanners manquants/défectueux, les rapports non valides ou l’absence de référence ratchet provoquent un échec avec le statut INCOMPLETE. Les détections valides suivent la politique stricte/informative/ratchet sélectionnée     | Exécution obligatoire ; ratchet zizmor bloquant dans la CI |
| `check:openapi-breaking` | Contrat d’API publique comparé aux commits d’événement épinglés (base de fusion de la PR, état précédent pour un push, base du groupe de fusion ; premier parent du checkout pour les exécutions planifiées/manuelles) ; toute mesure obligatoire indisponible provoque un échec | **Bloquant avec --ratchet**                                |

### Tâche : `docs-sync-strict`

Pour les pull requests vers `main` ou `release/**`, cette tâche ne s’exécute que pour les candidats qui ne sont pas des brouillons (ou qui proviennent d’une file de confiance) et qui sont classés comme modifications de documentation ou de code. Elle s’exécute aussi lors d’événements CI hors PR ; le déclencheur push de ce workflow couvre uniquement `main`, pas `release/**`. Une étape qui se termine avec un code non nul bloque la tâche ; les constats purement informatifs et les exemptions documentées ci-dessous ne la bloquent pas.

| Script                         | Vérifie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Blocage                                                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Méta-contrôle qui exécute séquentiellement les 7 sous-contrôles ci-dessous                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oui                                                                                                                                        |
| ↳ `check:docs-sync`            | Cohérence des versions du paquet/OpenAPI/CHANGELOG, miroirs exacts de `llm.txt`, invariants de sections/taille du CHANGELOG traduit et absence de documents dupliqués devenus caducs                                                                                                                                                                                                                                                                                                                                                                                                   | Oui                                                                                                                                        |
| ↳ `check:docs-frontmatter`     | Les pages de documentation compilées comportent des titres de frontmatter valides                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui                                                                                                                                        |
| ↳ `check:docs-counts`          | Les invariants de comptage à forte fiabilité sont stricts ; les vérifications heuristiques du nombre de fichiers ne font qu’avertir, sauf si le script reçoit `--strict` (le méta-contrôle CI ne le transmet pas)                                                                                                                                                                                                                                                                                                                                                                      | Niveau strict bloquant ; niveau souple informatif                                                                                          |
| ↳ `check:env-doc-sync`         | Les lectures de variables d’environnement dans le code source, `.env.example` et `docs/reference/ENVIRONMENT.md` concordent après application des listes d’exceptions explicites ignore, doc-only et env-only                                                                                                                                                                                                                                                                                                                                                                          | Oui, hors des listes d’exceptions documentées                                                                                              |
| ↳ `check:deprecated-versions`  | Signale les versions potentiellement obsolètes hors des contextes historiques sûrs et les dates de mise à jour anciennes, en excluant les documents ignorés                                                                                                                                                                                                                                                                                                                                                                                                                            | Informatif dans la configuration CI actuelle (`--strict` n’est pas transmis)                                                               |
| ↳ `check:doc-links`            | Les liens Markdown internes de la documentation renvoient vers des fichiers existants (forme `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oui                                                                                                                                        |
| ↳ `check:fabricated-docs`      | Les routes, variables d’environnement, commandes CLI, noms de hooks et chemins de fichiers cités dans la documentation existent dans le code source. Contrôle strict via `--strict` ; échec non bloquant sans cette option.                                                                                                                                                                                                                                                                                                                                                            | Oui (via `--strict` dans la CI)                                                                                                            |
| `check:cli-i18n`               | Les clés CLI `t()` utilisées existent dans `en` ; `pt-BR` conserve toutes les sections de premier niveau ; `zh-CN` et `zh-TW` contiennent toutes les clés de `en`                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui                                                                                                                                        |
| `check:openapi-coverage`       | La spécification OpenAPI couvre au moins un seuil ratchet de routes réelles                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oui                                                                                                                                        |
| `check:openapi-security-tiers` | Les annotations déclarées `x-loopback-only`/`x-always-protected` doivent être étayées par `routeGuard.ts` ; les erreurs d’analyse et les incohérences du contrôle direct sont bloquantes. Le contrôle inverse des `x-loopback-only` manquants sous les préfixes exclusivement locaux émet des avertissements ; les routes définies uniquement par des motifs sont exclues de ce contrôle inverse.                                                                                                                                                                                      | Analyse/contrôles directs bloquants ; contrôle inverse informatif                                                                          |
| `check:openapi-routes`         | Chaque chemin `/api...` de `openapi.yaml` correspond à une route réelle sans tenir compte des noms des paramètres, après application de la liste d’exceptions justifiée `KNOWN_STALE_SPEC` ; les entrées obsolètes de cette liste provoquent aussi un échec                                                                                                                                                                                                                                                                                                                            | Oui                                                                                                                                        |
| `check:docs-symbols`           | Les références URL internes `/api/...` dans les documents canoniques non miroirs correspondent à une route réelle ou à une famille de routes ; les références proxy/amont/espace réservé/fichier et les entrées justifiées `KNOWN_STALE_DOC_REFS` sont exclues, et les entrées obsolètes de la liste provoquent un échec                                                                                                                                                                                                                                                               | Oui                                                                                                                                        |
| `i18n translation drift`       | Vérifie les empreintes source/cible des documents principaux et la provenance de la traduction. La comparaison des PR n’autorise que les échecs hérités identiques ; les incohérences nouvelles ou non vérifiées de source, de cible absente, d’empreinte cible, de traduction obsolète ou de cache de sections bloquent. Hors comparaison des PR, les échecs de source/cible absente/empreinte cible bloquent, tandis que les traductions obsolètes et les caches de sections incohérents restent consultatifs. L’absence d’un cache de sections au format ancien n’est pas un échec. | La dérive nouvelle/non vérifiée en PR bloque ; la dérive héritée identique est consultative ; les règles hors PR dépendent du type d’échec |

Les douze SVG README de `docs/diagrams/` sont générés (`scripts/docs/gen-readme-<name>.mjs` ;
`npm run docs:readme-diagrams` les régénère tous). Chacun dispose d’un test unitaire de comparaison binaire
(`tests/unit/docs/readme-*-svg.test.ts`, tâche `test-unit`) qui échoue lorsque le fichier commité
est obsolète, et `check:docs-counts` lit les nombres canoniques à partir de leurs nœuds `<text>` — c’est pourquoi l’étape de
conversion en contours conserve chaque chaîne convertie en contour dans le fichier sous forme de `<text>` invisible. Le contrôle des nombres canoniques SVG lit les fichiers répertoriés dans
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) : `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, ainsi que `public/images/tier-flow-dark.svg` et `tier-flow-light.svg` ;
les affirmations concernant le niveau gratuit permanent, l’entrée du catalogue, le pool récurrent et les facteurs de score lisent également
`promise-pillars.svg`, `free-tier-budget.svg` et `strategies-grid.svg`. `free-tier-budget.svg`
tire ses chiffres du chargeur de catalogue actif ; par conséquent, toute modification de `FREE_MODEL_BUDGETS` ou d’un nom d’affichage de fournisseur met la CI en échec jusqu’à la régénération de ce fichier.

### Tâche : `i18n-ui-coverage`

| Script                             | Valide                                                                                                                                                                                                                     | Bloquant     |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (intégré) | La couverture des clés i18n de l’interface utilisateur est ≥ 65 %                                                                                                                                                          | Oui          |
| `check-ui-value-drift` (intégré)   | Une **valeur** anglaise réécrite ne laisse subsister aucune traduction obsolète                                                                                                                                            | Oui          |
| `check-new-key-coverage` (intégré) | Une **nouvelle** clé anglaise est traduite dans chaque locale — un marqueur `__MISSING__:` est rejeté                                                                                                                      | Oui          |
| `check-translation-ratio`          | Le ratio de traductions réelles par locale (valeurs identiques à l’anglais / espaces réservés / entrées manquantes hors liste d’autorisation) ne doit pas dépasser `config/quality/i18n-translation-baseline.json` + marge | **Bloquant** |

Nécessite `fetch-depth: 0` — le contrôle de dérive des valeurs compare `en.json` à la base de fusion.

#### `check-ui-value-drift` — barrière des traductions obsolètes

Détecte la seule régression i18n que les autres contrôles ne peuvent structurellement pas voir : une valeur anglaise
est réécrite, mais les traductions dérivées de l’anglais _précédent_ sont conservées, de sorte que
les utilisateurs non anglophones continuent à lire un texte formulé avec assurance, mais désormais erroné.

Cela s’est réellement produit en production. `oauthModal.googleOAuthWarning` a été réécrit lors de l’arrivée
de l’assistant de connexion Antigravity (#5203) ; **39 locales sur 43** ont conservé un texte indiquant aux opérateurs de « copier
l’URL complète et la coller ci-dessous » — un flux qui ne peut pas aboutir pour ce fournisseur. Le problème est
passé inaperçu jusqu’à #8463 parce que :

- `sync-ui-keys` ne complète que les clés **absentes**, jamais celles qui sont **obsolètes** ;
- `check-ui-keys-coverage` compte la _présence_ des clés, une traduction obsolète est donc considérée comme couverte ;
- `check-translation-drift` suit les copies miroir de la documentation `docs/i18n/<locale>/**.md` —
  il ne lit jamais `src/i18n/messages/*.json`. Bloquant dans le job `docs-sync-strict` depuis la
  resynchronisation de 2026-09 : modifier un document principal → `npm run i18n:run -- --files=<doc>` (au niveau de la section, peu coûteux).

**Sensible aux différences, sans référence de base.** Il compare `en.json` à la base de fusion avec
l’arborescence de travail ; pour chaque clé dont la valeur anglaise a changé, toute locale contenant encore une
traduction non modifiée est obsolète. Cela **fige délibérément la dette préexistante** — une différence
ne peut pas révéler de quel ancien texte anglais provient une traduction existant de longue date, le contrôle évalue donc
uniquement ce que la modification actuelle touche. L’autre solution (une référence de hachage par clé) nécessiterait
un fichier généré d’environ 600 KB, trois fois plus volumineux que la plus grande référence existante, et modifié à chaque PR i18n.

Deux façons de satisfaire ce contrôle :

1. mettre à jour les traductions concernées, ou
2. les définir sur `__MISSING__:<new english>` — à l’exécution, le texte anglais corrigé est alors fourni
   (`src/i18n/request.ts::deepMergeFallback`, #7258) et la clé est placée dans la file d’attente de traduction.

Si le **sens** de la chaîne a changé, préférez **renommer la clé** : une nouvelle clé ne peut pas hériter
d’une traduction obsolète. C’est l’approche utilisée par #8463.

```bash
npm run i18n:check-value-drift          # strict (ce que CI exécute)
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

### Job : `test-vitest`

Nécessite la tâche de classification `changes`. Les fragments de matrice applicables bloquent la fusion en cas d’échec.

| Suite            | Valide                                                        | Bloquante                                                                                                                           |
| ---------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Serveur MCP (110 outils), autoCombo, cache — exécuteur vitest | Oui                                                                                                                                 |
| `test:vitest:ui` | Tests des composants d’interface — exécuteur vitest           | **Bloquante** — les échecs préexistants sont explicitement exclus dans `vitest.config.ts` ; tout nouvel échec fait échouer la tâche |

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

### Cliquet CodeQL : admission du candidat et inventaire du dépôt

CI gère l'admission CodeQL du candidat grâce à une chaîne explicite de dépendances : `codeql-scan` appelle la matrice des quatre langages de `codeql.yml`, puis `codeql-admission` exécute `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` exige les deux résultats. Quality conserve ses propres contrôles numériques, mais n'interroge pas le scanner avant la fin du producteur ; `Gate / Quality` seul ne constitue pas une admission complète du candidat. CodeQL reste obligatoire pour les candidats ne modifiant que la documentation.

La politique de `config/quality/codeql-admission-policy.json` sélectionne Actions, C/C++, JavaScript/TypeScript et Python, la suite de requêtes default, le modèle de menace remote et le mode de build none. Le contrôle préalable du producteur rejette une activation en attente et les branches hors de la liste explicite des cibles. Les cibles initiales sont main et release/v3.8.53 ; la release suivante nécessite une intégration révisée. Le déclencheur CI plus large existant pour les PR de release est conservé, mais une cible non intégrée signale HOLD avant l'extraction, au lieu d'obtenir un PASS sans mesure.

Chaque job de la matrice enregistre son véritable identifiant de téléversement SARIF, le langage, la catégorie, l'exécution et la tentative, l'identité du workflow appelant, les référence/head/base/SHA de fusion de l'événement et le hash de politique. Le job dépendant ne télécharge que les reçus de cette exécution et valide les empreintes des artefacts. Il exige les quatre catégories, la réussite du producteur et le traitement terminé de chaque téléversement exact. Il utilise le filtre sarif_id de l'API, pas la dernière analyse trouvée sur une branche. Les relances partielles peuvent réutiliser les catégories réussies d'une tentative précédente de la même exécution et du même candidat, en conservant la tentative productrice ; un producteur actuel en échec ne peut pas réutiliser des preuves vertes antérieures.

L'action CodeQL attend le traitement, mais son implémentation épinglée peut avertir puis continuer après un échec de lecture du statut ou l'épuisement de l'attente. L'admission vérifie donc à nouveau le traitement. Les catégories manquantes, les traitements en attente, les jobs échoués ou annulés, les identités périmées, la pagination incomplète ou les API indisponibles produisent HOLD et le code de sortie 2. Il ne reste aucune attente fixe d'un workflow de scanner indépendant. Une PR non analysée ne peut pas réussir parce qu'une requête d'alertes a renvoyé 0. Un nombre mesuré supérieur à `metrics.codeqlAlerts.value` renvoie le code 1 ; le baseline n'est pas relevé pour absorber les alertes d'une autre branche. [Statut du téléversement et recherche d'analyses](https://docs.github.com/en/rest/code-scanning/code-scanning).

Le reçu enregistre les identifiants de téléversement et d'analyse, les catégories, les versions des outils, la référence/SHA, le baseline et les nombres d'alertes. L'identité SARIF et le nombre de résultats, les nombres minimaux de règles et les instances exactes d'alertes restent obligatoires. Les identités de la PR et de l'analyse sont revérifiées avant acceptation. Ces contrôles établissent la couverture des catégories configurées, pas l'inventaire de chaque fichier source extrait. L'extraction C/C++ sans build n'inclut pas le code généré pendant un build du projet. Les exclusions de sources nécessitent toujours une révision, et l'attribution à un contributeur exige des preuves comparables sur la base exacte.

`codeql-maintenance.yml` assure les analyses des push de la release active et la planification hebdomadaire sans dupliquer les producteurs de PR/main. `nightly-codeql-inventory.yml` maintient un baseline distinct pour l'ensemble du dépôt, avec `--strict-measurement` et un échec lorsque la mesure est indisponible. Le saut toléré du collecteur local historique ne constitue pas une admission du candidat. Le resserrement reste une opération explicite `--update` après vérification d'un nombre global inférieur.

Le workflow Advanced ne doit pas être publié tant que Default Setup est configuré : GitHub rejette cette combinaison. Sa politique versionnée reste en attente jusqu'à la relecture de la transition administrative révisée. Avant publication, un opérateur épingle le dépôt, head/base/tree, les hashes de politique/patch/retour arrière et l'état de configuration observé ; `node scripts/quality/codeql-producer.mjs verify-admin-readback` vérifie les enregistrements JSON attendus et réels fournis. C'est un garde-fou technique, pas une approbation de l'opérateur ni un remplacement de la collecte de relectures fraîches. Le jeton de PR ne demande jamais l'accès Administration. Le déploiement et toute modification du scanner exigent cette relecture séparée ainsi que des preuves réelles de compatibilité PR, fork et groupe de fusion.

Les forks utilisent des runners hébergés, une extraction sans identifiants persistants, aucune installation ni aucun build du projet dans le producteur et aucun secret hérité du dépôt. GitHub prend en charge le téléversement SARIF pour l'événement pull_request avec son jeton de fork restreint ; l'approbation de l'exécution d'une première contribution reste régie par GitHub. N'utilisez jamais pull_request_target pour exécuter du code non fiable. Confirmez les permissions effectives du jeton, analysis_key et tous les environnements de catégories dans le canari contrôlé avant de considérer la migration comme terminée. [Règles de téléversement depuis un fork](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible),
[modes de configuration incompatibles](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Les rejets relèvent de la décision de l’opérateur (Règle stricte nº #14)** — ne rejetez jamais une
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

**Également non documentés ci-dessus** (consultatifs, signal faible) : le job `docs-lint` (markdownlint + Vale, job entier en `continue-on-error`) et les workflows de scanner autonomes `semgrep.yml` / `scorecard.yml`. CodeQL dispose désormais de jobs obligatoires de production et d'admission sous `Gate / CI`, soumis aux exigences d'activation décrites plus haut. `semgrepFindings: 0` figure dans `quality-baseline.json`, mais n'est pas relié à un cliquet bloquant dans `ci.yml` — la métrique est actuellement orpheline.

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
- `check:pr-evidence` (bloquant, recherche du texte libre dans le corps de la PR) — risque élevé de faux positifs ; sa suppression affaiblirait l’application de la Règle stricte nº #18, il s’agit donc d’un véritable choix de politique.
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
