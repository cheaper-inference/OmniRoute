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

Les workflows CI et Quality Gates émettent chacun un verdict stable : `Gate / CI` et `Gate / Quality`. Leur politique d'admission versionnée énumère chaque emploi en amont comme requis ou consultatif. Une tâche requise applicable doit réussir : les résultats manquants, annulés, ignorés, en attente et inconnus ne peuvent pas établir PASS. Une classification valide de documents uniquement ou de catalogue uniquement peut rendre une voie de code inapplicable ; un projet ordinaire PR n’est pas un candidat accepté. Un label `hotfix` ne dispense pas de preuves.

Les deux flux de travail couvrent PRs dans les branches main/release, les push vers `main`, la répartition manuelle et les événements de groupe de fusion. Push, dispatch et merge-group exécutent la sélection complète. Un brouillon de file d'attente Mergify fiable exécute également les tâches `full-code`/`full-code-e2e` applicables ; PRs ordinaire les ignore. Avant une fusion manuelle, effectuez une répartition complète sur le candidat exact. Les push vers `release/**` ne démarrent pas ces flux de travail ; Release-Green observe la base fusionnée séparément (voie hébergée `docs/ops/RUNNER_BOX.md` → ). Les forks et les groupes de fusion utilisent des exécuteurs hébergés pour les tâches qui autrement sélectionnent des exécuteurs auto-hébergés ; une capacité hébergée suffisante doit être vérifiée avant le déploiement.

Un PR ordinaire exécute la sélection rapide. Les voies `full-code` et `full-code-e2e` de la politique d'admission (E2E, intégration, artefact de package, Electron smoke, Bun SQLite, clients d'écosystème et de protocole) s'exécutent uniquement sur un brouillon de file d'attente Mergify ou sur une exécution complète : `gh workflow run ci.yml --ref <branch>`.

Chaque reçu JSON identifie le SHA extrait, l'exécution et la tentative de flux de travail. Le CLI rejette une inadéquation checkout/event SHA. Les tests de workflow lient l'adhésion à la stratégie à la liste `needs` de la tâche de verdict afin qu'une voie nouvelle ou supprimée ne puisse pas disparaître silencieusement. Les reçus couvrent leur propre flux de travail, et non la publication, le déploiement ou les éléments internes d'un scanner consultatif existant. Effectuer les vérifications applicables requises dans les règles de la succursale constitue un changement administratif distinct ; définir leurs métiers ne protège pas en soi une branche.

`API Route Typecheck` est une vérification indépendante du flux de travail, en dehors des verdicts globaux et du profil statique de l'observateur local complet. Inspectez son résultat séparément pour le candidat exact. `.github/workflows/api-route-typecheck.yml` s'exécute sur PRs dans `main` ou `release/**`, est transmis aux familles de branches, à la répartition manuelle et aux événements `merge_group` de type `checks_requested`. Il n'a pas de filtre de chemin. Fusionner des groupes consultez `merge_group.head_sha`; d'autres événements consultez `github.sha`. Tous les événements utilisent les mêmes tests de porte de diagnostic API et d'unité de porte. Les reciblages de base PR demandent un nouveau contrôle ; Les modifications body/title utilisent le nom d'observation uniquement `Admission not requested / API Route Typecheck` et ne peuvent pas remplacer le contrôle d'admission.

### Preuve conservée dans le réducteur d'acceptation

`scripts/quality/validate-release-acceptance.mjs` réduit un plan fourni et ses manifestes ; il n’établit pas que le plan couvre l’intégralité du pipeline de libération. Ses rapports définissent explicitement `releaseAcceptance: false`, même lorsque ce plan est `VERIFIED`. Le flux de travail `release-acceptance.yml` utilise toujours des appareils fantômes, et non de véritables reçus de build, de package, de démarrage ou de promotion.

La CLI exige que `--evidence-root` vérifie les preuves conservées. Les fichiers sont résolus en `<evidence-root>/<artifact_id>/<member>` et hachés en SHA-256. Un enregistrement PASS sans preuve, un fichier manquant ou modifié, un chemin dangereux ou un lien symbolique empêche la vérification. Les fichiers manquants ne sont pas équivalents à des journaux de réussite vides. Les contrôles SHA/run/attempt existants restent indépendants : les octets correspondants ne peuvent pas récupérer un reçu périmé. L'intégrité des fichiers ne constitue pas une preuve de l'authenticité de l'exécution ou de la promotion d'un artefact.

### DAST consomme la version CI vérifiée

Le travail `dast-smoke` CI requis appelle `.github/workflows/dast-smoke.yml` après `build`. Il suit la même sélection code/draft que la version, y compris le fork PRs pris en charge, PRs cible de la version et les groupes de fusion. Un travail DAST manquant, échoué, annulé ou ignoré de manière inattendue bloque `Gate / CI`. Le workflow réutilisable n'a pas de déclencheur PR/dispatch indépendant ; la validation manuelle utilise la répartition de CI afin que la build et le consommateur restent en une seule exécution.

`scripts/ci/next-build-provenance.mjs` scelle l'artefact Next complet avec son résumé tar, repository/event/run, la tentative du producteur, head/base/checkout/tree, les identités de flux de travail, le fichier de verrouillage, le nœud exact version/ABI, la plate-forme et le bundler. DAST sélectionne l'artefact immuable ID à partir de `needs.build.outputs`, nécessite une vérification du résumé de téléchargement et hache indépendamment le ZIP par rapport au résumé du producteur avant d'extraire ses deux membres sur liste verte via `scripts/ci/unpack-ci-build.py`. Le manifeste et l'archive tar doivent également correspondre aux sorties du producteur indépendant avant que l'arborescence suivante ne soit extraite. Il ne recherche jamais la dernière version de branche réussie. Une réexécution partielle peut réutiliser cette même tentative de producteur lorsque son ID et toutes les entrées correspondent toujours ; le reçu enregistre les deux tentatives.

Le consommateur reste sur un exécuteur Linux hébergé avec une autorisation de référentiel en lecture seule et aucun secret de référentiel. Il installe la version exacte de Node du producteur, puis assemble le CLI avec `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` rejette un serveur autonome manquant avant toute version de secours ; Les versions CLI locales normales conservent leur solution de repli existante. La préparation du serveur, Schemathesis et promptfoo doivent tous réussir dans la limite inchangée de 25 minutes. Un reçu de provenance prouve l'identité et les octets d'entrée, et non une analyse DAST réussie. L'expiration d'un artefact, une interruption du coureur ou un scanner défaillant restent des preuves incomplètes ou défaillantes ; il ne peut pas devenir PASS via un wrapper consultatif.

### Capacité d’exécution UI

CI gère l'inventaire UI complet sous forme de quatre partitions matricielles `test-vitest`, chacune avec au maximum deux travailleurs par partition et le délai de travail existant de 15 minutes. Le premier fragment exécute également la suite MCP/autoCombo Vitest. Le résultat de travail requis couvre chaque jambe de la matrice ; l’échec ou l’annulation d’un fragment ne peut établir l’admission du candidat.

L'observateur nocturne conserve un reçu de candidat exact distinct pour chaque fragment UI, y compris l'exécution MCP dans le premier reçu. Les quatre reçus, journaux et identités d’exécution correspondantes sont requis. `npm run test:vitest:ui` local sélectionne toujours la suite complète ; une analyse `--shard` n’est qu’une preuve partielle.

### Collecte de couverture unitaire

Les douze fragments unitaires collectent la couverture V8 lors de leur exécution de tests existante. Une partition réussie exécute `scripts/ci/compact-v8-coverage.mjs` pour compresser les fichiers d'origine sans générer de rapport Istanbul intermédiaire. La tâche de couverture finale vérifie les douze manifestes par rapport au SHA candidat, au runtime, à la racine source et aux hachages de données, puis exécute les rapporteurs de c8 et les seuils de couverture existants. Les entrées conservent l'ordre global des noms de fichiers de c8 ; La pré-fusion par fragment n'est pas sûre pour une couverture function/block mixte. Les fragments manquants, mal formés ou incompatibles échouent à l'admission. Les fragments de test ayant échoué conservent séparément la couverture de diagnostic brute ; il ne peut pas entrer dans la fusion finale.

### Reçus d'avancement de l'exécution de l'unité

La commande `test:unit:ci:shard` partagée enregistre les phases `primary`, `dashboard` et `serial` via `scripts/ci/unit-progress-reporter.mjs`. Le rapport de test normal reste disponible. Un reçu distinct contenant uniquement les métadonnées enregistre le début et la fin de chaque fichier, et un battement de cœur de 30 secondes répertorie les fichiers encore actifs et leur temps écoulé. Il enregistre uniquement les métadonnées d'exécution sur liste blanche ; les descriptions des tests, les résultats, les corps d'erreur et l'environnement complet ne sont pas sérialisés.

CI conserve les fichiers JSONL sous le nom `unit-progress-ci-<run>-<attempt>-<shard>`. Un délai d'attente d'une tâche peut empêcher le téléchargement ultérieur ; les battements de coeur déjà émis restent une preuve diagnostique. Des battements de cœur manquants peuvent également refléter un processus d'exécution bloqué ou terminé. Ces reçus préservent la sélection de tests, la simultanéité, les délais et le statut de sortie existants ; ce ne sont pas des verdicts d’admission de candidats.

### Fusionner la file d'attente

L'étiquette `queue` envoie un PR à la file d'attente Mergify (`.mergify.yml`). Mergify ouvre un brouillon PR sur une branche `mergify/merge-queue/`, CI y exécute la sélection complète et le PR d'origine fusionne lorsque `Gate / CI`, `Gate / Quality` et `Merge integrity (changelog + generated skills)` réussissent.

Mergify écrit son résumé de file d'attente dans la description du brouillon. Les événements Body/title-only `pull_request` `edited` utilisent un groupe de concurrence spécifique à l'exécution et ne réexécutent pas la classification, les matrices de test, l'intégrité de fusion ou le verdict d'admission. Les noms de contrôles d'observation uniquement ne peuvent pas remplacer `Gate / CI` ou `Gate / Quality`. Une modification qui modifie la base cible demande une nouvelle validation du candidat.

Après une sortie de file d'attente, un push ne remet pas toujours le PR en file d'attente. Commentez `@mergifyio queue` dessus.

### Inventaire d'analyse statique

L'inventaire npm-alias versionné et l'adhésion à l'analyse statique se trouvent dans `config/quality/gate-manifest.json`. Exécutez `npm run check:gate-manifest` pour valider les noms de script et les commandes exactes par rapport à `package.json`; les ajouts, les suppressions et la dérive des commandes échouent à la fois au hook local et aux tâches de classification des changements dans CI. Un alias n'est pas une tâche de workflow, une instance matricielle ou un scénario de test : ces décomptes ne doivent pas être présentés comme interchangeables.

Utilisez `npm run quality:scan -- --list` ou `npm run quality:scan:fast -- --list` pour inspecter les alias sélectionnés sans les exécuter. Le coureur invoque le point d'entrée npm, de sorte que son environnement d'exécution (y compris Bun lorsqu'il est configuré) est préservé. Le manifeste enregistre les alias en dehors de ces profils comme invoqués séparément, et les commandes de maintenance sont interdites dans les profils d'analyse en lecture seule.

Ces profils couvrent uniquement l'analyse statique. Ils ne certifient pas les tests de produits, la couverture, l'emballage, les contrôles externes ou l'acceptation complète d'un candidat. L'admission au workflow utilise les `config/quality/admission-policy.json` et `scripts/quality/admission-verdict.mjs` liés. Les profils d’observateurs de libération restent distincts ; inspecter leurs chèques et reçus applicables de manière indépendante. Les commandes statiques de l'observateur complet sont déclarées dans `config/quality/release-green-static-profile.json`, y compris `audit:deps`, la sélection des tests de mutation et les contrôles de traduction. Le chargeur valide les commandes npm par rapport aux déclarations package.json et CI/Quality modélisées ; il rejette la dérive au lieu d'exécuter des jetons shell comme arguments. La sortie SKIP/INCOMPLETE du scanner requise ne peut pas établir PASS. Le profil enregistre ses exclusions externes et ne remplace pas la couverture hébergée, les matrices de test, les packages ou les preuves de déploiement. L'inventaire en prose ci-dessous est une référence et non une preuve qu'une porte a réellement fonctionné.

Les scripts vivent sous `scripts/check/` (portes de politique) et `scripts/quality/` (moteur à cliquet). La source de vérité CI est `.github/workflows/ci.yml`.

### État de la documentation de base publiée

`.github/workflows/i18n-base-health.yml` observe l'état de la documentation après des push sélectionnés vers `main` et `release/v*` et lors de l'envoi manuel. Ses filtres couvrent la documentation, le root Markdown, `llm.txt`, la traduction state/configuration et les outils i18n pertinents. Le travail `Published base documentation health` unique utilise Ubuntu hébergé et un délai de cinq minutes. Il effectue une validation en lecture seule et écrit un reçu de diagnostic sans installation de dépendance, traduction ou adoption d'état.

`scripts/i18n/check-base-health.mjs` ne nécessite aucune incohérence de hachage source, de cible manquante, de hachage cible, de traduction obsolète et de cache de section. Il valide également la portée principale actuelle document/locale et sa provenance enregistrée. Un contexte invalide, une couverture incomplète ou un vérificateur interrompu produit `INCOMPLETE`; la dérive confirmée produit `FAIL`. Les deux renvoient un état de sortie d’échec. Le reçu est lié à l'extraction SHA, au workflow, à l'exécution et à la tentative, et est conservé sous le nom `i18n-base-health-<sha>-<run>-<attempt>`.

Il s’agit d’une observation indépendante de la base publiée. Il n'ajoute pas d'événement PR ou de groupe de fusion, de vérification PR requise, d'alias npm ou de membre de profil d'analyse statique. Le vérificateur sous-jacent bloque également les cinq classes en mode absolu. La préparation ordinaire PR reste distincte de l’admission. Un téléchargement réussi ne peut pas transformer un résultat de santé ayant échoué en PASS.

Un PR ordinaire utilise `--preflight` avec un rapport de base généré par `--baseline-evidence`. Il peut laisser une source anglaise en attente uniquement lorsque l'enregistrement complet de la traduction et les octets cibles réels sont inchangés par rapport à cette base exacte. Les nouvelles incohérences de cible ou de cache de section bloquent toujours et des preuves incomplètes ne peuvent pas autoriser la préparation. Le rapport expose `preparationPending` et `mergeReady` séparément : une préparation réussie ne prépare pas les traductions en attente à la fusion. Actualisez les miroirs concernés dans le candidat composé avant l'admission. Le candidat de file d'attente Mergify de confiance, `merge_group`, les poussées de branche et les exécutions manuelles CI utilisent le vérificateur absolu, sans `--warn` ni pardon des échecs hérités. Les hachages cibles manquants et une portée réduite par les fichiers de base enregistrés supprimés ne peuvent pas produire un verdict absolu positif.

### Libérer le chemin rapide PR (`quality.yml`)

`.github/workflows/quality.yml` complète CI sur main/release PRs, pousse vers `main`, répartit et fusionne les groupes. PRs utilise des vérifications rapides filtrées par chemin. La version en double désactivée de façon permanente a été supprimée ; les vrais chèques build/package/boot restent dans CI. La suite d'unités et Vitest fonctionnent uniquement dans CI (`Unit Tests (N/12)` et `Vitest`).

| Emploi                                           | Portée                                                                                                                                                                                                                                                                 | Blocage                        |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; Références des documents API et documents-tous                                                                                                                                                                                                          | Oui                            |
| `Fast Quality Gates`                             | Code PRs; vérifications statiques, vérification de type, vérification de type du tableau de bord, tests unitaires impactés                                                                                                                                             | Oui                            |
| `Forgotten sibling tests`                        | Code PRs; les modules modifiés sont attribués aux consommateurs statiques et aux tests des frères et sœurs candidats ; les chemins d'importation barils et dynamiques sont signalés comme diagnostics consultatifs, avec des exceptions de liste autorisée référencées | **Consultatif**                |
| `No new ESLint warnings`                         | Code PRs; protection anti-peluches sensible aux suppressions                                                                                                                                                                                                           | Oui, y compris les fourchettes |
| `Merge integrity (changelog + generated skills)` | PRs non-projet ; journal des modifications et synchronisation des compétences générées                                                                                                                                                                                 | Oui, y compris les fourchettes |

#### Rapport de tests de frères et sœurs oubliés

`npm run check:forgotten-sibling-tests` s'exécute comme une étape consultative de `Fast Quality Gates` et réutilise le résolveur d'importation derrière la carte test-impact. Pour chaque module de production modifié, il signale les chaînes `changed module/symbol -> static consumer -> candidate sibling test` déterministes lorsque le test candidat est absent du diff pull-request. Le résumé Markdown et le résultat JSON sont conservés en tant qu'artefact de flux de travail `forgotten-sibling-tests` pour l'étalonnage avant tout déploiement de blocage.

Les réexportations de barils et les importations dynamiques sont uniquement des diagnostics de résolution ; ils ne créent jamais de constatation bloquante. Les exceptions examinées sont disponibles dans `config/quality/forgotten-sibling-allowlist.json`. Chaque entrée doit nommer le test consommateur et candidat, donner une justification spécifique et lier un problème GitHub ou une pull request. Les entrées mal formées ne sont pas fermées. Les exceptions ne peuvent pas supprimer un test candidat supprimé ou un diff qui ajoute `.skip`/`.todo`; l'affaiblissement des assertions et autres masquages restent la propriété de la porte `check:test-masking` à blocage indépendant.

### Emploi : `lint`

Fonctionne sur chaque PR à `main`. Les blocs fusionnent en cas d'échec.

| Script (`npm run ...`)            | Valide                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Blocage                                     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | La version Node.js se situe dans la plage prise en charge                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Oui                                         |
| `check:cycles`                    | Importations circulaires dans tout `src/` + `open-sse/` (basé sur AST, tsconfig `paths` résolu). Bare quitte 1 chaque fois qu'un cycle existe (fermé en cas d'échec depuis #15281) et répertorie le SCCs. `check:cycles:ratchet` (ce que CI exécute) se bloque lorsque le nombre dépasse le plafond `metrics.cycles` dans `quality-baseline.json` — actuellement 14, `direction: down`, il ne peut donc que baisser (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oui (cliquet)                               |
| `check:boundary`                  | Couplage `open-sse → src` : importations de fichier à fichier uniques du moteur vers l'application (`scripts/quality/measure-boundary.mjs`; la liste des bords est le backlog de remédiation core/module-split v4). Rapport consultatif = nu (identique à `quality:boundary`). `check:boundary:ratchet` (ce que CI exécute, également dans la boucle à cliquet à portes rapides `quality.yml` ) se bloque lorsque le nombre dépasse le plafond `metrics.boundaryOpenSseToSrc` dans `quality-baseline.json` — ensemencé au 771 mesuré, `direction: down`; `--update` ne fait que le baisser ; base-relative sur PRs (`--base-ref`, voir ci-dessous)                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oui (cliquet)                               |
| `check:route-validation:t06`      | Schémas Zod présents sur toutes les routes (politique de niveau 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oui                                         |
| `check:any-budget:t11`            | Le nombre `@ts-expect-error // any` ne dépasse pas le budget (catraca de niveau 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oui                                         |
| `check:provider-consistency`      | Chaque fournisseur dans `providers.ts` a une entrée correspondante dans `providerRegistry.ts` (et vice-versa, dans la liste verte)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oui                                         |
| `check:model-lifecycle`           | Les trois tables de routage gérées manuellement restent cohérentes avec l'instantané du cycle de vie enregistré (#11503) : `FITNESS_TABLE` (`taskFitness.ts`) n'obtient aucun identifiant retiré que `REGISTRY` peut acheminer ; chaque cible `BUILT_IN_ALIASES` est présente dans `REGISTRY` et absente de l'instantané d'identification retirée ; chaque identifiant retraité encore dans `REGISTRY` est transféré ou répertorié dans `allowedRetiredInCatalog`; et aucune source ou cible `DEFAULT_DEGRADATION_MAP` n'apparaît retirée dans cet instantané. Cela ne prouve pas qu'un modèle soit actuellement servi par un live en amont. — hors ligne se compare à `config/quality/model-lifecycle.json`, actualisé manuellement avec `npm run quality:refresh-model-lifecycle` (réseau ; non câblé dans CI). `allowedRetiredInCatalog` est un cliquet de burn-down : ajoutez une entrée uniquement avec un problème de suivi.                                                                                                                                                              | Oui                                         |
| `check:fetch-targets`             | Chaque `fetch("/api/...")` dans `src/` côté client se résout en un vrai `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oui                                         |
| `check:deps`                      | Tous les dépôts `npm install` -able sur chaque `package.json` du dépôt sont en `dependency-allowlist.json`; nouveaux packages non épinglés ou slopsquattés signalés                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oui                                         |
| `audit:deps`                      | Audit npm des cinq fichiers de verrouillage indépendants (root, Electron, plugins OpenCode, v1/v2 et fournisseur). Blocage des avis critiques ; les avis élevés restent des avertissements visibles. Les audits Missing/failed sont INCOMPLETE et block ; les hachages de verrouillage et les rapports par portée sont conservés.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oui                                         |
| `check:lockfile`                  | Intégrité `package-lock.json` Registre https —, hachages d'intégrité, aucun remplacement d'hôte                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oui                                         |
| `check:licenses`                  | Liste autorisée de licence SPDX pour les dépendances de production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oui                                         |
| `check:tracked-artifacts`         | Aucun artefact de construction / liens symboliques `node_modules` validés (fonctionne également dans le pré-commit husky ; le pré-push est intentionnellement léger — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oui                                         |
| `check:ai-attribution`            | Pas de bande-annonce AI/bot `Co-Authored-By` ou de pied de page de génération IA dans les commits PR, le titre ou le corps — Hard Rule #16 (dans la boucle `quality.yml` fast-gates pour PR→ `release/**` — lit la charge utile de l'événement, aucune opération hors PRs — et une étape PR uniquement dans `ci.yml` lint pour PR→ `main`; également le crochet husky `commit-msg` ; les co-auteurs humains autorisés ; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:vitest-exclusions`         | Chaque exclusion Vitest nomme un problème de suivi et apparaît dans `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oui                                         |
| `check:file-size`                 | Les fichiers sources (`.ts`/`.tsx` dans `src/`, `open-sse/`, `electron/`, `bin/`) restent dans `cap` et les fichiers de test (`*.test.ts(x)`) dans `testCap`; les fichiers gelés dans `file-size-baseline.json` (`frozen` / `testFrozen`) ne doivent pas dépasser leur taille enregistrée                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Oui                                         |
| `check:error-helper`              | Les réponses d'erreur dans executors/handlers utilisent `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Oui                                         |
| `check:migration-numbering`       | Les fichiers de migration SQL sont numérotés de manière séquentielle, sans lacunes ni doublons                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Oui                                         |
| `check:public-creds`              | Pas de clés Web littérales OAuth `client_id`/`client_secret` ou Firebase en dehors de `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oui                                         |
| `check:db-rules`                  | Pas SQL brut en dehors des modules `src/lib/db/` ; pas d'importation de barils de `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oui                                         |
| `check:known-symbols`             | Les exécuteurs du fournisseur, les stratégies de routage et les traducteurs enregistrés dans leurs tables de répartition correspondent aux fichiers sur le disque — aucun symbole orphelin ou non déclaré                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Oui                                         |
| `check:route-guard-membership`    | Chaque route qui génère un processus enfant est classée par `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oui                                         |
| `check:test-discovery`            | Chaque fichier `*.test.ts` / `*.spec.ts` du dépôt est collecté par au moins un exécuteur de test (cliquet : la liste des orphelins dans `test-discovery-baseline.json` ne peut que diminuer)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oui                                         |
| `check:test-tla-order`            | Aucun fichier `node:test` sous `tests/unit` n'enregistre un test, n'atteint un `await` de niveau supérieur, puis n'en enregistre davantage (#18045; cliquet : `test-tla-order-allowlist.json` ne peut que rétrécir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oui                                         |
| `check:agent-skills-sync`         | Les artefacts de compétences d'agent générés correspondent à leur catalogue source (pas de dérive)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Le fournisseur logos/assets comporte une entrée de provenance enregistrée                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | Les fichiers de configuration JSON analysent et satisfont aux règles de repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | Compilation TypeScript sans erreurs (avertissements consultatifs uniquement)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oui                                         |
| `typecheck:noimplicit:core`       | Strict `noImplicitAny` — prospectif ; de nombreux sites d'appel préexistants ont encore besoin d'annotations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **Consultatif** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` étendu à `src/app/(dashboard)/**` (#7033) — La liste autorisée de 27 fichiers de `typecheck:core` n'inclut aucun tableau de bord TSX, et `next build` ne le vérifie jamais non plus (`next.config.mjs` définit `ignoreBuildErrors: true`), donc les régressions d'identifiants orphelins (#6625/#6909) étaient invisibles pour CI. Les différences par rapport à une ligne de base de décompte per-file/per-TS-code gelée (`config/quality/dashboard-typecheck-baseline.json`, même modèle d'application obsolète que `check:known-symbols`) — uniquement Les erreurs NEW au-delà du décompte de base échouent à la porte ; diminuez avec `--update` lorsqu'une erreur préexistante est corrigée.                                                                                                                                                                                                                                                                                                                                                                                         | Oui                                         |
| `check:build-typecheck`           | La vérification du type de production de l'application entière sur `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), la liste autorisée de 27 fichiers de la surface `typecheck:core` et la porte du tableau de bord ne couvrent pas. Diffs par rapport à `config/quality/build-typecheck-baseline.json`; un décompte nouveau ou augmenté par (fichier, code) échoue, un décompte inférieur vous demande de cliqueter. `--update` refuse tant que l'exécution contient une paire nouvelle ou augmentée à moins que `--force-regressions` ne soit transmis, et refuse un fichier nouvellement réduit au silence à moins que `--force-nocheck` ne soit transmis, donc élargir la ligne de base pour passer au vert et accorder un silence permanent sont deux actes délibérés distincts. Un `--force` nu est rejeté. Analyse également la portée de construction de `@ts-nocheck` par rapport à `config/quality/ts-nocheck-baseline.json`, car un fichier qui l'utilise ne signale aucun diagnostic et serait autrement invisible pour chaque porte. | Oui                                         |

#### Deux programmes de vérification de type répondent différemment

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) et `check:build-typecheck` compilent différents programmes sous différentes options, et le même fichier peut être propre dans l'un et plein d'erreurs dans l'autre.

`tsconfig.build.json` définit `"strict": false`, donc `noImplicitAny` est désactivé. La configuration principale compile une liste autorisée de 27 fichiers avec des options plus strictes et suit le graphique d'importation de chaque entrée, de sorte que les fichiers qui n'apparaissent jamais dans le programme de construction y sont toujours vérifiés.

La conséquence est importante pour juger si un fichier est typé :**zéro diagnostic sous `check:build-typecheck` ne signifie pas zéro** . La suppression `@ts-nocheck` de 26 fichiers a montré que 23 d'entre eux étaient propres dans le programme de construction ; seize d’entre elles ont fait apparaître environ 120 erreurs implicites au sens strict. Vérifiez les deux avant d’appeler un fichier propre.

### Emploi : `quality-gate`

S'exécute après `test-coverage`. Les blocs fusionnent en cas d'échec.

| Scénario                     | Valide                                                                                                                                                          | Blocage                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Émet `quality-metrics.json` (nombre d'avertissements ESLint, couverture du rapport de fragment fusionné)                                                        | Oui (en amont du cliquet) |
| `quality:ratchet`            | Chaque métrique de `quality-baseline.json` n'a pas régressé (avertissements ESLint, référence ≤ ; couverture, référence ≥ )                                     | Oui                       |
| `check:duplication`          | La duplication de code (jscpd@4) ne dépasse pas la ligne de base dans `quality-baseline.json`                                                                   | Oui                       |
| `check:complexity`           | La complexité cyclomatique au niveau du fichier ne dépasse pas le plafond (noyau ESLint `complexity` + `max-lines-per-function`)                                | Oui                       |
| `check:cognitive-complexity` | Cliquet de complexité cognitive (`eslint-plugin-sonarjs`) — passe ESLint séparée ; CI exécute les deux fusionnés en une seule étape `check:complexity-ratchets` | Oui                       |
| `check:dead-code`            | Le cliquet des exportations/fichiers inutilisés (knip) ne régresse pas par rapport à la ligne de base                                                           | Oui                       |
| `check:compression-budget`   | Les planchers d'économies de jetons par moteur du budget de référence de compression — ne doivent pas régresser                                                 | Oui                       |
| `check:type-coverage`        | Le cliquet typé en pourcentage (`type-coverage`) ne régresse pas ; englobe largement `typecheck:noimplicit:core`                                                | Oui                       |

### Emplois : `codeql-scan` et `codeql-admission`

`codeql-scan` produit toutes les catégories d'analyse configurées. Une fois cette tâche réussie, `codeql-admission` valide ses téléchargements exacts et le cliquet d'alerte du candidat. Les deux sont des dépendances obligatoires de `Gate / CI`, y compris les candidats uniquement documentaires. Les exigences administratives d'activation et de Canary sont décrites sous « Rchet CodeQL » ci-dessous.

| Scénario               | Valide                                                                                                                                                                                                               | Blocage |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:codeql-ratchet` | Le candidat ref/SHA et toutes les catégories d'analyse configurées doivent être à jour avant le cliquet d'alerte ; blocs de preuves manquants. L'inventaire mondial reste séparé —, voir « Rchet CodeQL » ci-dessous | Oui     |

### Emploi : `quality-extended`

L'emploi bloque les candidats applicables. La taille du paquet, les résultats secrets, les résultats de vulnérabilité, les résultats de flux de travail et les modifications OpenAPI sont vérifiés avec les cliquets requis. Les diagnostics de dépendance circulaire restent consultatifs. L'installation du scanner est requise : `scripts/ci/install-quality-scanners.sh` provisionne les versions épinglées et propage les échecs d'installation. Les outils manquants, les rapports invalides ou les lignes de base manquantes quittent la porte du scanner requise INCOMPLETE.

| Scénario                 | Valide                                                                                                                                                                                                                                                      | Blocage                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | Aucune dépendance circulaire (dpdm)                                                                                                                                                                                                                         | **Consultatif**                                       |
| `check:bundle-size`      | La taille du paquet ne dépasse pas le plafond ; une mesure indisponible échoue                                                                                                                                                                              | **Bloquer avec --ratchet**                            |
| `check:secrets`          | Les conclusions de Gitleaks ne régressent pas ; les analyses requises rejettent tools/source/baseline manquants, les analyses ayant échoué et les rapports invalides                                                                                        | **Bloquer avec --ratchet**                            |
| `check:vuln-ratchet`     | Les vulnérabilités de dépendance ne régressent pas ; les analyses requises rejettent les outils manquants, les rapports invalides ou les références manquantes                                                                                              | **Bloquer avec --ratchet**                            |
| `check:workflows`        | Charpie de flux de travail (actionlint + zizmor); Les scanners missing/broken, les rapports invalides ou la référence de cliquet manquante échouent en tant que INCOMPLETE. Les résultats valides suivent la politique strict/advisory/ratchet sélectionnée | Exécution requise ; blocage du cliquet zizmor dans CI |
| `check:openapi-breaking` | Contrat public API contre les validations d'événements épinglés (base de fusion PR, pousser avant, base de groupe de fusion ; premier parent de récupération scheduled/manual ) ; la mesure requise échoue fermée                                           | **Bloquer avec --ratchet**                            |

### Emploi : `docs-sync-strict`

Pour les demandes d'extraction vers `main` ou `release/**`, cette tâche s'exécute uniquement pour les candidats non brouillons (ou file d'attente approuvée) classés comme modifications de documentation ou de code. Il fonctionne également sur des événements CI non PR ; le déclencheur poussoir de ce flux de travail couvre uniquement `main`, pas `release/**`. Une étape dont la sortie est différente de zéro bloque le travail ; Les conclusions du rapport uniquement et les exemptions documentées ci-dessous ne le font pas.

| Scénario                       | Valide                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Blocage                                                                                                                                                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Méta-porte qui exécute les 7 sous-portes ci-dessous de manière séquentielle                                                                                                                                                                                                                                                                                                                                                                                                                                                | Oui                                                                                                                                                         |
| ↳ `check:docs-sync`            | Cohérence des versions Package/OpenAPI/CHANGELOG, miroirs `llm.txt` exacts, invariants CHANGELOG section/size traduits et absence de documents en double remplacés                                                                                                                                                                                                                                                                                                                                                         | Oui                                                                                                                                                         |
| ↳ `check:docs-frontmatter`     | Les pages de documentation compilées portent des titres de présentation valides                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oui                                                                                                                                                         |
| ↳ `check:docs-counts`          | Les invariants de comptage à confiance élevée sont stricts ; Les vérifications heuristiques du nombre de fichiers n'avertissent que si le script reçoit `--strict` (la méta-porte CI ne le transmet pas)                                                                                                                                                                                                                                                                                                                   | Blocage de niveau strict ; avis sur le niveau souple                                                                                                        |
| ↳ `check:env-doc-sync`         | Les lectures de l'environnement source, `.env.example` et `docs/reference/ENVIRONMENT.md` sont d'accord après les listes d'autorisation explicites ignorées, doc-only et env-only                                                                                                                                                                                                                                                                                                                                          | Oui, en dehors des listes autorisées documentées                                                                                                            |
| ↳ `check:deprecated-versions`  | Signale les versions obsolètes potentielles en dehors des contextes historiques sûrs et des dates de mise à jour obsolètes, à l'exclusion des documents ignorés                                                                                                                                                                                                                                                                                                                                                            | Avis sur le câblage CI actuel (`--strict` n'est pas transmis)                                                                                               |
| ↳ `check:doc-links`            | Les liens de démarque internes dans les documents sont résolus en fichiers réels (formulaire `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                                                           | Oui                                                                                                                                                         |
| ↳ `check:fabricated-docs`      | Les routes, les variables d'environnement, les commandes CLI, les noms de hook et les chemins de fichiers cités dans la documentation existent dans la base de code. Portail dur via `--strict`; soft-fail sans drapeau.                                                                                                                                                                                                                                                                                                   | Oui (via `--strict` dans CI)                                                                                                                                |
| `check:cli-i18n`               | Les clés CLI `t()` utilisées existent dans `en`; `pt-BR` conserve chaque section de niveau supérieur ; `zh-CN` et `zh-TW` contiennent toutes les clés de `en`                                                                                                                                                                                                                                                                                                                                                              | Oui                                                                                                                                                         |
| `check:openapi-coverage`       | La spécification OpenAPI couvre au moins un plancher d'itinéraires réels                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oui                                                                                                                                                         |
| `check:openapi-security-tiers` | Les annotations `x-loopback-only`/`x-always-protected` déclarées doivent être soutenues par `routeGuard.ts`; analyseur et bloc de disparités de transmission. La vérification inversée des `x-loopback-only` manquants sous les préfixes locaux uniquement avertit, et les itinéraires à modèle uniquement sont exclus de cette passe inversée.                                                                                                                                                                            | Blocage des contrôles Parser/forward ; avis de contre-vérification                                                                                          |
| `check:openapi-routes`         | Chaque chemin `/api...` dans `openapi.yaml` se résout de manière insensible aux paramètres en un itinéraire réel après la liste autorisée `KNOWN_STALE_SPEC` justifiée ; Les entrées obsolètes de la liste d'autorisation échouent également                                                                                                                                                                                                                                                                               | Oui                                                                                                                                                         |
| `check:docs-symbols`           | Les références internes `/api/...` URL dans les documents canoniques non miroirs se résolvent en une véritable route ou famille de routes ; Les références proxy/upstream/placeholder/file et les entrées `KNOWN_STALE_DOC_REFS` justifiées sont exclues et les entrées obsolètes de la liste blanche échouent.                                                                                                                                                                                                            | Oui                                                                                                                                                         |
| `i18n translation drift`       | L’admission absolue ne nécessite aucune incohérence de source, de cible manquante, de hachage de cible, de traduction obsolète et de cache de section. La préparation PR ordinaire peut conserver des preuves héritées exactes ou une modification en attente uniquement en anglais avec un état complet et des octets cibles inchangés ; son rapport déclare séparément que la fusion est prête. Hachages cibles manquants et bloc de preuves de base incomplet. Un cache de sections héritées absent n’est pas un échec. | Les cinq classes bloquent l’admission queue/base ; la préparation ordinaire n'autorise que des travaux en attente prouvés, hérités ou en anglais uniquement |

Les douze README SVGs sous `docs/diagrams/` sont générés (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` les régénère tous). Chacun a un test unitaire de comparaison d'octets (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) qui échoue lorsque le fichier validé est périmé, et `check:docs-counts` lit les nombres canoniques à partir de leurs nœuds `<text>` —, c'est pourquoi l'étape de description conserve chaque chaîne décrite dans le fichier comme invisible `<text>`. La vérification des nombres canoniques SVG lit les fichiers répertoriés dans `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) : `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` et `tier-flow-light.svg`; les revendications de gratuité permanente, d'entrée dans le catalogue, de pool récurrent et de facteurs de notation se lisent également comme `promise-pillars.svg`, `free-tier-budget.svg` et `strategies-grid.svg`. `free-tier-budget.svg` tire ses chiffres du chargeur de catalogue en direct, donc un changement vers `FREE_MODEL_BUDGETS` ou vers un nom d'affichage de fournisseur redevient CI jusqu'à ce que ce fichier soit régénéré.

### Emploi : `i18n-ui-coverage`

| Scénario                            | Valide                                                                                                                                                                                                                               | Blocage     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check-ui-keys-coverage` (en ligne) | La couverture clé UI i18n est ≥ 65 %                                                                                                                                                                                                 | Oui         |
| `check-ui-value-drift` (en ligne)   | Un anglais réécrit **valeur** ne laisse aucune traduction périmée derrière                                                                                                                                                           | Oui         |
| `check-new-key-coverage` (en ligne) | UN **nouveau** La clé anglaise est traduite dans chaque locale — un marqueur `__MISSING__:` est rejeté                                                                                                                               | Oui         |
| `check-translation-ratio`           | Le taux de traduction réelle par paramètres régionaux (identique à l'anglais / espace réservé / feuilles manquantes en dehors de la liste autorisée) ne doit pas dépasser la marge `config/quality/i18n-translation-baseline.json` + | **Blocage** |

Nécessite `fetch-depth: 0` — la porte de dérive de valeur compare `en.json` à la base de fusion.

#### Porte de traduction périmée `check-ui-value-drift` —

Détecte la régression i18n que les autres portes ne peuvent structurellement pas voir : une valeur anglaise est réécrite et les traductions dérivées de l'anglais _précédent_ restent en arrière, de sorte que les utilisateurs non anglais continuent de lire une copie rédigée avec confiance et désormais erronée.

Ceci a été expédié pour de vrai. `oauthModal.googleOAuthWarning` a été réécrit lorsque l'assistant de connexion Antigravity a atterri (#5203);**39 sur 43 localités** a conservé le texte indiquant aux opérateurs de « copier le URL complet et de le coller ci-dessous » — un flux qui ne peut pas être complété pour ce fournisseur. Cela est passé inaperçu jusqu'à #8463 car :

- `sync-ui-keys` ne remplit que les clés qui sont **absent** , jamais ceux qui sont **vicié** ;
- `check-ui-keys-coverage` compte la _présence_ de clé, donc une traduction obsolète est considérée comme couverte ;
- `check-translation-drift` suit la documentation `docs/i18n/<locale>/**.md` et reflète — il ne lit jamais `src/i18n/messages/*.json`. Blocage dans le job `docs-sync-strict` depuis la resynchronisation 2026-09 : éditer un core doc → `npm run i18n:run -- --files=<doc>` (au niveau de la section, bon marché).

**Prise en compte des différences, non basée sur une ligne de base.** Il compare `en.json` au niveau de la base de fusion avec l'arbre de travail ; pour chaque clé dont la valeur anglaise a changé, toute langue contenant encore une traduction intacte est périmée. Ceci délibérément **gèle la dette préexistante** — a diff ne peut pas révéler de quel vieil anglais provient une traduction de longue date, donc la porte juge uniquement ce que touche le changement actuel. L'alternative (une référence de hachage par clé) coûterait un fichier généré ~ 600 KB, 3 × la plus grande référence existante, tournant sur chaque i18n PR.

Deux façons de le satisfaire :

1. mettre à jour les traductions concernées, ou
2. définissez-les sur `__MISSING__:<new english>` — le runtime sert ensuite l'anglais corrigé (`src/i18n/request.ts::deepMergeFallback`, #7258) et les files d'attente de clés pour la traduction.

Si la chaîne est **signification** changé, préfère **renommer la clé** : une nouvelle clé ne peut pas hériter d'une traduction obsolète. C'est le modèle utilisé par #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Les portes de dérive de valeur et de nouvelle clé partagent une comparaison immuable de `scripts/i18n/resolve-ui-diff-base.mjs`. Le flux de travail transmet la même base, la même pointe de base et le même SHAs candidat aux deux contrôles. Les exécutions PR/base-retarget, push et merge-group utilisent leur contexte d'événement. L'envoi d'une branche candidate nécessite son PR ouvert exact ou l'entrée `i18n_base_sha` explicite. La répartition ou l'observation planifiée de `main` ou `release/vX.Y.Z` sans cette entrée compare le dernier commit avec son premier parent ; il ne s’agit pas d’un audit de toutes les dettes de traduction héritées. L'invocation locale nécessite une base de comparaison explicite, par exemple la commande `BASE_REF` ci-dessus.

Un contexte de comparaison manquant ou ambigu, un catalogue requis illisible ou invalide et un candidat modifié produisent `INCOMPLETE` avec un code de sortie **2** , y compris en mode avertissement. Les lectures de catalogue utilisent `scripts/i18n/read-ui-catalog.mjs`; les échecs de lecture ne sont pas remplacés par des objets vides. Ni une base indisponible ni une entrée incomplète n'établissent PASS.

### Emploi : `i18n`

Matrice de validation i18n complète (une tâche par région). L'ensemble du travail est consultatif.

| Scénario                        | Valide                                  | Blocage                                                         |
| ------------------------------- | --------------------------------------- | --------------------------------------------------------------- |
| `validate_translation.py quick` | Intégralité de la traduction par langue | **Consultatif** (`continue-on-error: true` sur tout le travail) |

### Emploi : `pr-test-policy`

S'exécute uniquement sur les demandes d'extraction.

| Scénario               | Valide                                                                                                                                       | Blocage |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PRs qui modifie le code de production dans `src/`, `open-sse/`, `electron/` ou `bin/` doit inclure ou mettre à jour des tests (Hard Rule #8) | Oui     |
| `check:test-masking`   | Les fichiers de test modifiés ne réduisent pas le nombre net d'assertions et n'ajoutent pas de tautologies `assert.ok(true)`                 | Oui     |
| `check:pr-evidence`    | L'organisme PR cite des preuves test/VPS pour le changement (mécanise Hard Rule #18 en saisissant la prose PR — fragile, voir Backlog)       | Oui     |

### Emploi : `test-vitest`

Nécessite le travail de classification `changes`. Les fragments de matrice applicables bloquent la fusion en cas d'échec.

| Suite            | Valide                                                     | Blocage                                                                                                                             |
| ---------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Serveur MCP (110 outils), autoCombo, cache — vitest runner | Oui                                                                                                                                 |
| `test:vitest:ui` | Le composant UI teste le coureur — vitest                  | **Blocage** Les échecs préexistants — sont explicitement exclus dans `vitest.config.ts`; de nouveaux échecs font échouer le travail |

### Flux de travail nocturnes (programmés, consultatifs)

Ceux-ci fonctionnent selon un planning cron (et `workflow_dispatch`), jamais sur PRs. Tous sont consultatifs.

| Flux de travail        | Valide                                                                                                                                                                        | Blocage         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | tests de propriété à vérification rapide avec un nombre élevé d'exécutions + de graine aléatoire                                                                              | **Consultatif** |
| `nightly-resilience`   | porte de croissance en tas, injection de fautes de chaos, k6 load/soak                                                                                                        | **Consultatif** |
| `nightly-llm-security` | promptfoo injection guard (mode bloc) Sondes + garak (ignorées sans secret du fournisseur)                                                                                    | **Consultatif** |
| `nightly-schemathesis` | Contrat OpenAPI fuzzing (schémathèse) contre un OmniRoute en direct utilisant des violations de spécifications de surfaces `docs/openapi.yaml` — / 500 non gérés (Fase 8 B.4) | **Consultatif** |
| `nightly-mutation`     | Le score des tests de mutation Stryker sur la voie unitaire rapide des mutants survivants — fait surface, de faibles affirmations                                             | **Consultatif** |
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

### Ratchet CodeQL : admission des candidats et inventaire du référentiel

CI possède l'admission du candidat CodeQL via une chaîne de dépendances explicite : `codeql-scan` appelle la matrice quadrilingue dans `codeql.yml`, puis `codeql-admission` exécute `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` nécessite les deux résultats. La qualité conserve ses propres contrôles numériques mais n'interroge pas le scanner avant que le producteur ait terminé ; `Gate / Quality` à lui seul ne constitue pas une admission complète des candidats. CodeQL reste requis pour les candidats uniquement documentés.

La politique dans `config/quality/codeql-admission-policy.json` sélectionne les actions, C/C++, JavaScript/TypeScript et Python, la suite de requêtes par défaut, le modèle de menace à distance et le mode de construction aucun. Le contrôle en amont du producteur rejette un enregistrement d’activation en attente et bifurque en dehors de la liste de cibles explicites. Les cibles actuelles sont principales et les tests du contrat release/v3.8.54. comparent cette liste finie et le déclencheur de maintenance avec la version du package ; la prochaine version doit être revue lors de l'intégration. Le déclencheur PR à version plus large existant de CI est conservé, mais une cible non intégrée signale HOLD avant l'extraction plutôt que d'obtenir un PASS non mesuré.

Chaque tâche matricielle enregistre son téléchargement SARIF réel ID, sa langue, sa catégorie, son exécution et sa tentative, l'identité du flux de travail de l'appelant, l'événement ref/head/base/merge SHA et le hachage de la politique. Le travail dépendant télécharge uniquement les reçus de cette exécution et valide les résumés d'artefacts. Cela nécessite les quatre catégories, un producteur performant et un traitement complet de chaque téléchargement exact. Il utilise le filtre sarif_id de API, et non la dernière analyse trouvée sur une branche. Les rediffusions partielles peuvent réutiliser les catégories réussies d'une tentative antérieure du même run et du même candidat, en préservant la tentative de production ; un producteur actuel défaillant ne peut pas réutiliser les preuves vertes précédentes.

L'action CodeQL attend le traitement, mais son implémentation épinglée peut avertir et continuer après un échec de lecture de l'état ou une attente épuisée. L'admission vérifie donc à nouveau le traitement. Les catégories manquantes, le traitement en attente, les tâches échouées ou annulées, l'identité obsolète, la pagination incomplète ou APIs indisponible produisent HOLD et quittent 2. Il ne reste aucune attente fixe pour un flux de travail de scanner indépendant. Un PR non analysé ne peut pas passer car une requête d'alerte a renvoyé 0. Un nombre mesuré supérieur `metrics.codeqlAlerts.value` sort 1 ; la ligne de base n'est pas augmentée pour absorber les alertes d'une autre branche. [Statut de téléchargement et recherche d'analyse](https://docs.github.com/en/rest/code-scanning/code-scanning).

Les enregistrements de réception téléchargent et analysent IDs, les catégories, les versions d'outils, ref/SHA, les numéros de référence et d'alerte. Le nombre SARIF identity/result, le nombre minimum de règles et les instances d’alerte exactes restent obligatoires. Les identités PR/analysis sont revérifiées avant d'être acceptées. Ces vérifications établissent une couverture de catégorie configurée, et non un inventaire de chaque fichier source extrait. L'extraction sans build C/C++ n'inclut pas le code généré lors de la construction d'un projet. Les exclusions de sources doivent encore être révisées, et l'attribution des contributeurs nécessite des preuves comparables sur une base exacte.

`codeql-maintenance.yml` fournit des analyses push à version active et le calendrier hebdomadaire sans dupliquer les producteurs PR/main. `nightly-codeql-inventory.yml` maintient la ligne de base à l'échelle du référentiel séparée, avec `--strict-measurement` et un échec lorsque la mesure n'est pas disponible. Le saut gracieux du collectionneur d'héritage local n'est pas une admission de candidat. Le resserrement reste un `--update` explicite après un décompte global inférieur vérifié.

Le workflow avancé ne doit pas être publié lorsque la configuration par défaut est configurée : GitHub rejette cette combinaison. Sa politique versionnée reste en attente jusqu'à ce que la transition administrative révisée soit relue. Avant la publication, un référentiel de broches d'opérateur, les hachages head/base/tree, policy/patch/rollback et l'état de configuration observé ; `node scripts/quality/codeql-producer.mjs verify-admin-readback` vérifie les enregistrements JSON attendus et réels fournis. Il s'agit d'une protection technique, et non d'une approbation de l'opérateur ou d'un remplacement pour récupérer de nouvelles relectures. Le jeton PR ne demande jamais d'accès administrateur. Le déploiement et toute modification du scanner nécessitent une relecture séparée ainsi que de véritables preuves de compatibilité PR, fork et merge-group.

Forks utilise des exécuteurs hébergés, une extraction sans informations d'identification persistantes, aucun projet install/build dans le producteur et aucun secret de référentiel hérité. GitHub prend en charge le téléchargement SARIF pour l'événement pull_request avec son jeton fork réduit ; l’approbation de la première exécution d’une contribution reste la politique GitHub. N'utilisez jamais pull_request_target pour exécuter du code non fiable. Confirmez les autorisations réelles des jetons, Analysis_key et tous les environnements de catégorie dans le canari contrôlé avant de considérer la migration comme terminée. [Règles de téléchargement du fork](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [modes de configuration conflictuels](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Les licenciements sont à la discrétion de l'opérateur (Hard Rule #14)** — ne rejette jamais une alerte CodeQL sans enregistrer la justification technique dans le commentaire de rejet : `won't fix` pour une exigence de protocole en amont, `used in tests` pour un dispositif de test, `false positive` pour un désinfectant CodeQL ne peut pas voir (précédent : `docs/security/ERROR_SANITIZATION.md`).

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
