# Log export (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Export continu et incrémentiel des journaux d’appels d’OmniRoute vers un magasin d’analytique externe.

L’onglet du tableau de bord Logs conserve l’historique des requêtes dans SQLite (`call_logs`), avec une taille limitée par la rotation et la rétention. L’exportation des journaux envoie périodiquement le même ensemble d’enregistrements afin qu’il puisse survivre à la base de données locale et être rapproché d’autres données. BigQuery est la première destination ; le pipeline repose sur un registre, ce qui permet d’ajouter d’autres destinations.

---

## 1. Fonctionnement

```
serveur (déchiffrement + validation de la configuration, rapprochement du curseur)
  → démarrage d’IPC → processus OS exportChild isolé
    → storage.sqlite en lecture seule → requête/mappage partagé des journaux d’appels
      → hydratation asynchrone des artefacts → prepare()/send() de la destination
        → IPC du lot → le serveur persiste le curseur → IPC d’acquittement
          → lot suivant ; IPC de fin → le serveur enregistre la réussite
```

- **Planification** — une tâche cron `JobRegistry`, `log_export`, définie par défaut sur
  `0 * * * *` (toutes les heures, UTC). Enregistrée dans `src/lib/initCloudSync.ts` ; peut être
  remplacée par `OMNIROUTE_LOG_EXPORT_CRON`. À chaque déclenchement, toutes les destinations
  **activées** sont traitées séquentiellement.
- **Curseur** — le `call_logs.rowid` implicite de SQLite, persisté par destination dans
  `log_export_destinations.cursor_row_id`. `timestamp` n’est délibérément pas utilisé comme
  curseur : les appelants peuvent fournir leur propre valeur, de sorte qu’une requête lente peut
  être écrite après une requête plus rapide ayant commencé plus tard, et qu’un curseur basé sur
  l’horodatage l’ignorerait.
- **Traitement par lots** — `batch_size` lignes par requête (500 par défaut),
  `max_rows_per_run` lignes par exécution (10000 par défaut), afin qu’un arriéré important soit
  résorbé sur plusieurs déclenchements plutôt que de bloquer une seule exécution.
- **Livraison** — le curseur n’avance qu’après la résolution de `send()`. Un lot en échec laisse
  le curseur à sa position actuelle, de sorte que les mêmes lignes sont réessayées lors de
  l’exécution suivante. La garantie est une livraison au moins une fois avec déduplication côté
  destination, et non une véritable livraison exactement une fois : BigQuery identifie chaque
  ligne par l’identifiant du journal d’appels, qu’il respecte au mieux dans sa propre fenêtre de
  déduplication.
- **Protection contre les chevauchements** — le déclenchement cron et `POST .../run` peuvent se
  produire simultanément. Une destination déjà en cours de traitement est ignorée plutôt que
  traitée deux fois (`skipped: true` dans le résultat de l’exécution), de sorte qu’une exécution
  concurrente ne peut ni renvoyer un lot ni faire reculer le curseur.
- **Récupération après purge** — si `cursor_row_id` devient supérieur à `MAX(rowid)` (la table
  entière a été purgée et les rowid ont redémarré), l’exécuteur revient à 0 plutôt que de rester
  définitivement aveugle.

### Exécuteur isolé et limites

Chaque exécution de destination sur Node démarre un processus enfant OS distinct et de courte
durée (`child_process` avec IPC, et non `worker_threads`). La lecture des corps, l’analyse/la
sérialisation JSON des charges utiles, le `prepare()` de la destination et les E/S réseau de la
destination s’y exécutent intégralement, et non dans la boucle d’événements du serveur.
Seuls la configuration et de petits messages de progression transitent par IPC ; les
enregistrements exportés ne reviennent jamais au serveur. La tâche cron et la route Exécuter
maintenant conservent le même résultat public et la même protection contre les chevauchements.

L’enfant ouvre le fichier `DATA_DIR/storage.sqlite` résolu du serveur en lecture seule avec
`node:sqlite`, avec `busy_timeout=5000` et `query_only=ON`. Il n’importe aucun singleton de base
de données et n’effectue aucune migration, sauvegarde ou mise à jour SQLite. La gestion des
artefacts manquants/corrompus (y compris l’UPDATE d’un artefact corrompu) reste limitée au
parcours détaillé du tableau de bord. Les deux parcours partagent un résolveur de détails pur ;
l’exportation utilise des lectures asynchrones du système de fichiers et le même ordre de
résolution artefact → données inline héritées → disque hérité → aucune donnée. Une exécution
capture le rowid d’insertion maximal lorsque l’enfant ouvre son lecteur ; les insertions
ultérieures attendent l’exécution suivante. Il s’agit d’une limite d’insertion, et non d’une
transaction SQLite de longue durée : les rédacteurs WAL et les points de contrôle restent libres
pendant les attentes réseau. Les mises à jour/suppressions de lignes existantes ne sont pas
figées par cette limite.

Après chaque lot accepté, l’enfant attend un acquittement. Le serveur persiste d’abord le curseur
avec `advanceLogExportCursor`, puis envoie `ack` ; aucun nouveau lot ne démarre avant cela.
Un échec d’envoi, un plantage ou un dépassement de délai enregistre un échec sans faire avancer
ce lot. Les lots précédemment acquittés restent validés ; seul le lot non acquitté peut être
renvoyé. La réussite n’est enregistrée qu’après `done` et une sortie propre de l’enfant. En cas
d’échec, l’enfant est arrêté avec SIGTERM, puis avec SIGKILL après 500 ms si nécessaire, et
l’exécuteur attend la fermeture du processus.

| Variable d’environnement                      | Valeur par défaut | Objectif                                       |
| --------------------------------------------- | ----------------- | ---------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000            | Limite de temps écoulé par destination         |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024              | Limite de l’ancien espace V8 de l’enfant en MB |

Les valeurs non valides, non positives ou non entières utilisent les valeurs par défaut. Le
paramètre de tas ne constitue pas une limite totale de RSS ; des lots très volumineux peuvent
tout de même épuiser la mémoire de l’enfant et faire échouer l’exécution sans compromettre les
données. La valeur par défaut de 1024 MB laisse une marge suffisante pour le lot par défaut de
500 lignes contenant des artefacts de 512 KiB avec les corps activés, y compris la sérialisation
JSON de BigQuery découpée en segments d’octets. Elle ne rend pas sûr un lot de 10000 lignes avec
les corps. L’épuisement du tas V8 enregistre un échec exploitable : réduisez la taille des lots
ou augmentez `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` ; le curseur reste positionné sur le
dernier lot acquitté. Les corps historiques inline/sur disque ne sont pas couverts par la limite
moderne des artefacts. Les opérateurs doivent prévoir séparément la RSS, en particulier dans les
conteneurs à mémoire limitée.

L’enfant hérite uniquement de la valeur résolue de `DATA_DIR`, de `NODE_ENV`, du `TZ` explicite
(résolution en heure locale des noms de fichiers hérités), de `ELECTRON_RUN_AS_NODE` lorsqu’il
est présent, ainsi que des entrées sortantes suivantes : `HTTP_PROXY`, `HTTPS_PROXY`,
`ALL_PROXY`, `NO_PROXY` (et leurs formes en minuscules), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`,
`NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`. Un répartiteur Undici global partage la
résolution pure du proxy d’environnement du serveur ainsi que les règles de contournement des
hôtes locaux, y compris `NO_PROXY` ; il n’importe ni `proxyFetch.ts` ni ses indicateurs de
base de données/fonctionnalités. Les identifiants du proxy sont masqués dans les sorties
transmises et les erreurs enregistrées. Les identifiants de destination ne transitent que dans
un unique message IPC de démarrage, jamais dans argv ni dans l’environnement ; la transmission
des sorties/erreurs est préfixée et assainie. Seul `ExperimentalWarning` est désactivé dans les
arguments d’exécution de l’enfant afin d’éviter de répéter l’avertissement SQLite de Node à
chaque exécution cron ; les autres types d’avertissements restent visibles.

Les modules de destination doivent pouvoir être importés sans dépendances à Next.js ou réservées au serveur. L’implémentation
BigQuery existante respecte déjà ce contrat. Les caches de jetons d’accès ne persistent que pendant l’exécution
enfant, et non entre les exécutions. Node est l’environnement d’exécution pris en charge (`package.json` engines), mais la section
d’installation de Bun du README et `Dockerfile.bun` présentent également un chemin de compatibilité en production utilisant
`bun:sqlite` (`src/lib/db/core.ts` / adaptateurs). Sous Bun, les exportations conservent donc le précédent
chemin en cours de processus et émettent un avertissement unique : l’isolation du tas et des délais d’expiration du processus enfant n’est pas disponible. Utilisez
Node pour isoler la boucle d’événements et les erreurs OOM ; Bun n’est pas considéré ici comme réservé au développement.

Lorsque `includeBodies` est activé, privilégiez une fréquence de l’ordre de la minute, telle que
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, plutôt que d’accumuler un retard horaire de charges utiles.
Les limites de lots et de lignes bornent toujours chaque exécution. Le coût de démarrage du processus est payé par destination et par exécution ;
cela échange un faible coût de démarrage contre l’isolation de la boucle d’événements du serveur, et non contre une réduction de l’utilisation totale du processeur.

### Charges utiles (prompts et complétions)

Par défaut, l’exportation ne contient que les champs récapitulatifs affichés par la **liste** des journaux. L’activation de
**Exporter les prompts et les réponses** (`includeBodies`) transmet également ce que le volet de **détail**
des journaux affiche pour chaque appel :

| Champ                            | Contenu                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------- |
| `request_body` / `response_body` | Les charges utiles de l’appel telles que le tableau de bord les affiche          |
| `pipeline_route_decision`        | La cible et le modèle choisis par le routeur                                     |
| `pipeline_client_request`        | La requête brute exactement telle que le client l’a envoyée                      |
| `pipeline_openai_request`        | Après traduction vers le format OpenAI interne                                   |
| `pipeline_provider_request`      | Telle qu’elle a réellement été envoyée en amont, dans le dialecte du fournisseur |
| `pipeline_provider_response`     | La réponse brute reçue en amont                                                  |
| `pipeline_client_response`       | Ce qui a été renvoyé à l’appelant                                                |
| `pipeline_error`                 | Détails de l’erreur au niveau du pipeline pour un appel ayant échoué             |
| `bodies_truncated`               | Vrai lorsqu’un champ ci-dessus a atteint `maxBodyBytes`                          |

Il s’agit du contenu des prompts ; cette option est donc **désactivée par défaut** et constitue délibérément un choix propre à chaque destination.
Le contenu transmis correspond à ce que le tableau de bord affiche, car l’exportation et `getCallLogById` partagent la même résolution
des détails : les charges utiles sont
déjà nettoyées des informations personnelles et les secrets sont masqués lors de leur écriture. De plus, un appel effectué avec une clé API
`noLog` ne stocke aucune charge utile ; il n’y a donc rien à exporter.

Les charges utiles sont lues ligne par ligne depuis l’artefact du système de fichiers ; l’hydratation n’est donc exécutée que pour les destinations
qui l’ont demandée. Si un artefact est manquant ou corrompu, son récapitulatif est exporté avec des charges utiles nulles,
au lieu de faire échouer le lot et de bloquer le curseur.

`maxBodyBytes` (262144 par défaut) limite la taille de chaque champ. Les charges utiles plus longues sont **tronquées plutôt que
supprimées** — un prompt raccourci permet toujours de savoir « ce qui a été demandé » — et la ligne est signalée avec
`bodies_truncated`. Les deltas diffusés fragment par fragment ne sont pas exportés ; la réponse assemblée se trouve
déjà dans `pipeline_provider_response` et `pipeline_client_response`.

---

## 2. Fichiers

| Élément                    | Emplacement                                  |
| -------------------------- | -------------------------------------------- |
| Contrat de destination     | `src/lib/logExport/types.ts`                 |
| Registre                   | `src/lib/logExport/registry.ts`              |
| Gestion des secrets        | `src/lib/logExport/secrets.ts`               |
| Exécuteur (IPC parent)     | `src/lib/logExport/runner.ts`                |
| Cycle de vie du processus  | `src/lib/logExport/childRunner.ts`           |
| Point d’entrée enfant      | `src/lib/logExport/exportChild.ts`           |
| Ouverture en lecture seule | `src/lib/db/logExportReadOnly.ts`            |
| Requête/mappage partagés   | `src/lib/usage/callLogExportQueries.ts`      |
| Résolveur de détails       | `src/lib/usage/callLogDetailResolver.ts`     |
| Projection API             | `src/lib/logExport/presenter.ts`             |
| Destination BigQuery       | `src/lib/logExport/destinations/bigquery.ts` |
| Authentification Google SA | `src/lib/logExport/googleServiceAccount.ts`  |
| Source du journal d’appels | `src/lib/usage/callLogExportSource.ts`       |
| Persistance                | `src/lib/db/logExportDestinations.ts`        |
| Tâche cron                 | `src/lib/jobs/logExportJob.ts`               |
| Couche REST                | `src/app/api/log-export/`                    |
| Page du tableau de bord    | `src/app/(dashboard)/dashboard/log-export/`  |

Schéma : `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Toutes les routes sont authentifiées pour la gestion (`requireManagementAuth`). Les secrets ne sont jamais renvoyés :
un secret stocké est renvoyé sous la forme littérale `__stored__`, et le renvoi de cette valeur lors d’une mise à jour
conserve l’identifiant stocké.

La création ou la mise à jour d’une destination dont le type déclare un secret **nécessite
`STORAGE_ENCRYPTION_KEY`**. Sans cette variable, `encrypt()` laisse silencieusement les données inchangées ; l’écriture est donc
refusée avec un code 400 plutôt que d’enregistrer un identifiant en clair dans SQLite (la même protection est
appliquée par le webhook Telegram).

| Méthode  | Chemin                                   | Objectif                                                                       |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Types de destinations et liste de leurs champs de configuration                |
| `GET`    | `/api/log-export/destinations`           | Répertorier les destinations (secrets masqués)                                 |
| `POST`   | `/api/log-export/destinations`           | Créer une destination                                                          |
| `GET`    | `/api/log-export/destinations/{id}`      | Lire une destination                                                           |
| `PUT`    | `/api/log-export/destinations/{id}`      | Mettre à jour le nom, l’activation, la configuration ou le traitement par lots |
| `DELETE` | `/api/log-export/destinations/{id}`      | Supprimer                                                                      |
| `POST`   | `/api/log-export/destinations/{id}/test` | Tester les identifiants, sans rien écrire                                      |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Vider maintenant, via le même chemin que l’exécution planifiée                 |
| `GET`    | `/api/log-export/status`                 | État du cron, exécutions récentes et arriéré par cible                         |

`GET /api/log-export/types` est ce qui rend l’interface utilisateur générique : le formulaire du tableau de bord est généré à partir
des descripteurs de champs renvoyés, de sorte qu’une nouvelle destination ne nécessite aucune modification de l’interface utilisateur.

---

## 4. Destination BigQuery

Clés de configuration (`type: "bigquery"`) :

| Clé                  | Remarques                                                                               |
| -------------------- | --------------------------------------------------------------------------------------- |
| `projectId`          | Projet GCP contenant le jeu de données                                                  |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                                         |
| `location`           | Utilisé uniquement lorsque le jeu de données doit être créé (valeur par défaut : `EU`)  |
| `serviceAccountJson` | Clé de compte de service. Secret : chiffrée au repos, jamais renvoyée                   |
| `autoCreate`         | Créer le jeu de données et la table lors du premier export (valeur par défaut : `true`) |

Le compte de service nécessite `bigquery.tables.updateData` sur la table cible, ainsi que
`bigquery.datasets.create` / `bigquery.tables.create` lorsque `autoCreate` est activé.

Un lot configuré est une unité de **curseur**, et non une unité HTTP : `send()` le divise en appels insertAll
de 500 lignes au maximum, de sorte qu’une valeur `batch_size` élevée ne puisse pas dépasser la limite de requête de 10 Mo de BigQuery.
Les statuts transitoires (408/429/500/502/503/504) font l’objet de trois nouvelles tentatives au maximum avec un délai
exponentiel, en réutilisant les mêmes insertIds ; les erreurs d’authentification et de schéma déclenchent une exception dès la première tentative plutôt
que de gaspiller l’exécution.

Une table créée quelques instants auparavant n’est pas encore visible par le point de terminaison de streaming, qui renvoie
une erreur 404 pendant quelques secondes. Cette erreur 404 fait l’objet de nouvelles tentatives, mais **uniquement lorsque cette exécution a créé la table** —
une table réellement absente provoque toujours un échec immédiat. Notez que recréer une table sous un nom qui
a été supprimé récemment conduit BigQuery à refuser les insertions en streaming pendant plusieurs minutes ; il s’agit d’une
propriété de la suppression suivie d’une recréation. Préférez donc un nouveau nom de table plutôt que de supprimer puis recréer une table.

**Un échec partiel arrive sous la forme d’une réponse HTTP 200 avec un tableau `insertErrors[]` non vide.** Il est traité comme
un échec et déclenche une exception, ce qui empêche le curseur d’avancer au-delà des lignes que BigQuery n’a jamais
acceptées ; `tests/unit/log-export-bigquery.test.ts` garantit ce comportement.

Le transport utilise directement REST : une assertion RS256 auto-signée est échangée contre un jeton d’accès à l’adresse
`https://oauth2.googleapis.com/token`, puis les lignes sont envoyées à `tabledata.insertAll`. Aucun SDK Google n’est
inclus. Les jetons d’accès sont mis en cache dans le processus pour chaque paire (compte de service, portée).

La table créée contient une colonne pour chaque champ de l’onglet Journaux, ainsi que `exported_at`, et sa structure est adaptée à
la manière dont les journaux d’appels sont réellement interrogés :

- **Partitionnée par jour sur `timestamp`**, de sorte qu’une requête limitée par date n’analyse que les jours concernés.
- **Regroupée par `api_key_name`, `provider`, `model`, `status`** (dans cet ordre), de sorte qu’un filtrage par
  utilisateur, destination ou statut d’échec élimine des blocs au sein de chaque partition. BigQuery
  autorise au maximum quatre colonnes de regroupement, et leur ordre est important : un filtre uniquement sur `api_key_name`
  élimine des blocs, contrairement à un filtre uniquement sur `status`.
- **Conservation facultative des partitions** via `partitionExpirationDays` (`0` conserve tout), appliquée
  lors de la création de la table.

Les deux paramètres s’appliquent au moment de la création. Une table existante conserve sa disposition actuelle ; indiquez donc comme destination un nouvel identifiant de table si vous souhaitez les adopter.

`tests/unit/log-export-bigquery.test.ts` vérifie que le mappeur et le schéma de la table restent synchronisés, afin qu’une nouvelle colonne du journal des appels ne puisse pas être omise silencieusement lors de l’exportation.

Les lots sont découpés en fonction **à la fois** du nombre de lignes et du nombre d’octets sérialisés. Le nombre de lignes seul ne suffit pas une fois les charges utiles exportées : 500 lignes contenant des prompts peuvent représenter des dizaines de mégaoctets, et insertAll rejette toute requête dépassant 10 MB. Les segments sont clôturés dès qu’ils atteignent 500 lignes ou 9 MB, selon la première limite atteinte.

---

## 5. Destination des traces OTLP/HTTP

La configuration utilise `type: "otlp-http"`. Il s’agit d’un export planifié des journaux
d’appels persistés, avec suivi par curseur, et non du récepteur d’événements de routage
en direct fonctionnant au mieux dans
`open-sse/services/routing/otel.ts`. Il ne lit ni ne modifie les variables d’environnement,
les temporisateurs ou les tampons de ce récepteur. Activer les deux peut produire deux types de spans indépendants ;
utilisez la portée d’instrumentation `omniroute.log-export` pour distinguer ces spans de journaux d’appels.

| Clé                      | Valeur par défaut / rôle                                                                |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `endpoint`               | URL HTTP(S) complète des traces obligatoire ; aucun suffixe `/v1/traces` n’est ajouté   |
| `headers`                | Lignes `Name: value` ou objet JSON de chaînes facultatifs ; chiffrés                    |
| `requestHeaderAllowlist` | Vide (désactivé) ; noms/préfixes des en-têtes client à capturer comme attributs de span |
| `serviceName`            | `omniroute` ; attribut de ressource `service.name`                                      |
| `langfuseMapping`        | `false` ; ajoute les attributs Langfuse de génération/session/utilisateur               |
| `identity`               | `pseudonymous`, `keyName` ou `none`                                                     |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                 |
| `timeoutMs`              | `30000` par tentative HTTP                                                              |
| `environment`            | Non défini ; `langfuse.environment` facultatif                                          |

Le tableau de bord générique affiche ces champs. `paths` accepte un tableau via l’API ou une zone de texte
contenant des chemins exacts séparés par des sauts de ligne ou des virgules. Les chemins d’embeddings, de reclassement et les autres chemins sont
ignorés sauf autorisation explicite. Les lignes ignorées font tout de même avancer le curseur ; les compteurs
`exported`/`exportedTotal` du processus d’exécution existant comptent les lignes source traitées, y compris les lignes filtrées,
plutôt que les spans acceptés. Le filtrage est effectué dans le processus enfant, sans modifier son
contrat IPC/curseur.

La validation des URL utilise la fonction utilitaire `parseAndValidateNonMetadataUrl`, sans accès à la base de données, de
`src/shared/network/outboundUrlGuard.ts` : la politique `block-metadata`. Elle applique les mêmes
vérifications inconditionnelles des métadonnées, du protocole et des identifiants intégrés que le validateur de webhooks avec
les URL privées autorisées, mais autorise délibérément les cibles localhost/LAN sans dérogation globale
par indicateur de fonctionnalité. Cela permet d’utiliser des points de terminaison Langfuse, Phoenix, Tempo et Collector
auto-hébergés, y compris des points de terminaison HTTP privés. Les hôtes de métadonnées cloud sont toujours bloqués.
Les redirections ne sont pas suivies : un collecteur ne peut donc pas rediriger les identifiants vers un autre hôte.
Comme le mécanisme existant de contrôle lexical des URL, ce mécanisme ne fige pas la résolution DNS ; ne configurez que
des hôtes contrôlés par l’opérateur. Privilégiez HTTPS dès lors que le point de terminaison ne se trouve pas sur un réseau de confiance.

### Charge utile et livraison

Le format JSON OTLP/HTTP (`ExportTraceServiceRequest`, `Content-Type: application/json`) transporte un
span CLIENT par ligne autorisée, nommé d’après le chemin exact de sa requête. Ce nommage par chemin distingue
Chat Completions, Responses et Messages sans intégrer de données de modèle ou d’identité dans le
nom du span. Les attributs de ressource comprennent `service.name` et le `service.version` du package.

Le mécanisme habituel de journalisation des tentatives de chat (`open-sse/handlers/chatCore/attemptLogging.ts`) écrit
`duration = Date.now() - startTime` à la fin et ne fournit pas d’horodatage ;
`saveCallLogOperation` dans `src/lib/usage/callLogs.ts` utilise par défaut l’heure d’écriture
(de fin) comme horodatage. L’export définit donc la fin comme l’horodatage de la ligne et le début comme la fin moins la durée
(en millisecondes, converties en nanosecondes décimales). Les horodatages historiques fournis par
l’appelant sont également conservés comme heure de fin ; aucun indicateur de début/fin n’existe au niveau des lignes.
Une durée nulle devient zéro. Les horodatages invalides ou absents font échouer le lot plutôt que de créer
des spans non déterministes. `ttftMs` est nullable et correspond à `omniroute.ttft_ms`.

Les attributs comprennent `gen_ai.operation.name="chat"`, le fournisseur, le modèle demandé et le modèle de réponse,
les tokens d’entrée/sortie, les tokens facultatifs de lecture du cache/de création du cache/de raisonnement, le statut HTTP,
le combo, la source du cache, le tag de session et l’identifiant de corrélation. Les valeurs OTLP entières et les horodatages
sont des chaînes décimales ; les chaînes, les booléens et les nombres fractionnaires utilisent leurs variantes natives de valeurs
OTLP. Les spans d’erreur ont le statut ERROR et un message de statut expurgé. L’enregistrement
canonique ne contient aucune URL d’hôte amont ; `server.address` est donc omis plutôt que de désigner à tort
le collecteur comme serveur du modèle. Le coût n’est pas exporté.

Seul `includeBodies=true` charge le contenu. Avec `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` transportent le JSON expurgé du corps de la requête/réponse
tel qu’il est stocké par OmniRoute (canonisé lorsqu’il peut être analysé), et non un tableau
de messages restructuré selon les conventions sémantiques. Les corps tronqués ou non JSON restent du texte brut. Avec `langfuseMapping=true`,
les corps sont émis uniquement dans `langfuse.observation.input` / `langfuse.observation.output` ;
les attributs `gen_ai.*.messages` sont omis afin que chaque corps ne soit envoyé qu’une seule fois. Les deux modes
héritent de `maxBodyBytes` du mécanisme de chargement existant ;
`omniroute.bodies_truncated=true` signale une troncature.
Cette destination n’ajoute aucun instantané supplémentaire du pipeline ni aucune lecture d’artefact non expurgé ;
la capture facultative des en-têtes de requête utilise l’instantané client chargé existant décrit ci-dessous.
Utilisez une cadence de quelques minutes, telle que `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, lors de l’export
des corps, plutôt que de laisser les données s’accumuler pendant une heure.

### En-têtes facultatifs des requêtes client

La capture des en-têtes est **désactivée par défaut**. Définissez `requestHeaderAllowlist` dans la configuration de la destination
et activez **Exporter les prompts et les réponses** (`includeBodies: true` sur la destination).
La liste d’autorisation accepte un tableau via l’API ou une zone de texte contenant des noms séparés par des sauts de ligne ou des virgules :

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Les noms correspondent exactement et sans tenir compte de la casse, sauf lorsqu’un unique `*` final sélectionne un préfixe
de nom d’en-tête non vide. Un `*` seul, les caractères génériques intégrés et les noms d’en-têtes HTTP invalides sont rejetés.
Il peut y avoir au maximum 64 sélecteurs, chacun ayant un nom/préfixe de 256 octets ASCII au maximum.
Ce paramètre est distinct de `headers`, qui authentifie l’exportateur auprès du collecteur.

La capture lit uniquement `pipeline_client_request`, alimenté à partir de
`clientRawRequest` (ou de l’ancien `clientRequest`) du pipeline détaillé enregistré. Elle ne se rabat jamais sur les en-têtes de requête du fournisseur.
La journalisation détaillée du pipeline doit avoir été activée au moment de l’enregistrement de la requête. Si
`includeBodies` est désactivé, ou si le JSON de l’instantané client est absent, corrompu ou tronqué, aucun attribut
d’en-tête n’est émis. Augmenter `maxBodyBytes` peut éviter la troncature de l’instantané au moment de l’exportation ;
cela ne peut pas restaurer des détails qui n’ont jamais été enregistrés. Un instantané dépassant 1 Mio ou contenant plus de
256 entrées d’en-tête est ignoré. L’exportation existante des prompts/réponses reste activée parallèlement à
la capture des en-têtes ; la liste d’autorisation ne propose pas de mode d’hydratation limité aux en-têtes.

Les valeurs sélectionnées deviennent des tableaux de chaînes OTLP `http.request.header.<full lowercase header name>`,
même pour une chaîne unique. Par exemple, `X-OmniRoute-Meta-Team: example-team` devient
`http.request.header.x-omniroute-meta-team` avec
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Le préfixe complet est conservé : il s’agit d’en-têtes ordinaires, sans analyse de champs métier ni
conversion en métadonnées `omniroute.metadata.*` / Langfuse. `langfuseMapping` ne modifie pas la sémantique
des en-têtes. Un en-tête `User-Agent` sélectionné à valeur unique définit également le scalaire standard
`user_agent.original`. Les virgules au sein d’une valeur ne servent pas de séparateurs. Les variantes de casse sont fusionnées dans l’ordre
des entrées enregistrées ; toute variante invalide entraîne l’omission de l’en-tête entier. Les attributs sont triés par nom en minuscules.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, les en-têtes de clé d’API, les noms contenant
des marqueurs auth/token/secret/password/credential et les identifiants internes de la passerelle sont toujours
exclus, même s’ils sont sélectionnés ou partiellement masqués dans le stockage. Les motifs d’identifiants connus réutilisent
le détecteur d’identifiants partagé ; les marqueurs de masquage sont omis, et non exportés comme des valeurs sûres.
Seuls les chaînes et les tableaux de chaînes non vides sont acceptés ; aucun nombre ni objet n’est converti.
Les noms invalides, les clés de prototype, les caractères de contrôle (sauf la tabulation horizontale) et les séquences Unicode mal formées
sont ignorés sans faire échouer le lot ni reproduire leur contenu dans les erreurs.

Chaque span capture au maximum 32 en-têtes, 16 valeurs par en-tête, 4096 octets UTF-8 par valeur
et 16384 octets UTF-8 au total pour les noms et valeurs des en-têtes capturés. Les en-têtes trop volumineux ou invalides
sont omis intégralement, et non tronqués. La sélection relève d’une décision de l’opérateur en matière de confidentialité : des noms apparemment sûrs
peuvent tout de même contenir des données personnelles, et ces limites/détecteurs ne constituent pas un outil général de suppression des données personnelles.

### Limites de livraison

Les requêtes sont limitées à 500 spans et à 4 Mio de JSON UTF-8, enveloppe comprise.
La taille de chaque span autorisé est vérifiée avant la première requête d’un lot du curseur. Si un
span dépasse à lui seul la limite, aucune partie de ce lot n’est envoyée et l’opération échoue en recommandant de réduire
`maxBodyBytes` ; le span n’est pas supprimé silencieusement. La vérification préalable ne conserve que les références des enregistrements et
les nombres d’octets, en supprimant chaque span/JSON temporaire ; les spans sont reconstruits pour des blocs de taille limitée
plutôt que de conserver une seconde copie sérialisée du lot. Les réponses HTTP 408/429/5xx, les défaillances réseau et les délais d’attente dépassés font l’objet d’au maximum
trois tentatives, avec un délai exponentiel de 250/500 ms entre les tentatives. Les secondes ou les dates HTTP de `Retry-After`
peuvent prolonger ce délai jusqu’à 5 secondes. Les autres statuts entraînent un échec immédiat. Un rejet partiel OTLP 2xx déclenche également une exception au lieu
d’acquitter un span perdu ; les accusés de réception vides ou au format JSON valide sont acceptés, avec une
limite de lecture de réponse de 64 Kio.

Les erreurs contiennent uniquement des informations propres à l’exportateur : statut HTTP, catégorie de nouvelle tentative, nombre de tentatives et de spans
envoyés, ou formulations fixes relatives aux échecs d’accusé de réception/réseau. Les corps de réponse du collecteur,
les décomptes de réussite partielle et les en-têtes de réponse ne sont jamais copiés dans les erreurs, les journaux ni le
tableau de bord. Un lot en échec ou partiellement accepté n’est pas acquitté : la destination affiche
un état d’échec avec ce statut, le curseur reste au dernier lot acquitté et l’exécution suivante
renvoie les mêmes lignes. Les statuts permanents continuent de provoquer des échecs jusqu’à ce que le collecteur ou la configuration
soit corrigé. Consultez les journaux du collecteur pour obtenir les détails des réponses. Les résumés d’erreurs du journal des appels conservent
leur propre mécanisme de masquage.
`prepare()` ne provisionne rien ; le test envoie exactement `{"resourceSpans":[]}` par POST et indique
le statut HTTP sans écrire de spans du journal des appels.

Les identifiants de trace et de span correspondent aux 32/16 premiers chiffres hexadécimaux du SHA-256 de
`"omniroute.trace\0" + callLogId` et de `"omniroute.span\0" + callLogId`. Les renvois portent
des identifiants identiques. Cela ne garantit pas la déduplication : certains backends, notamment l’ingestion de Langfuse
v4, ne dédupliquent pas les spans ayant le même identifiant. Un plantage ou un échec partiel de bloc peut
entraîner le renvoi d’au maximum un lot du curseur non acquitté ; ce lot entier peut être dupliqué,
et pas seulement son dernier bloc HTTP. Choisissez la taille des lots du curseur en tenant compte de ce compromis.

### Exemple Langfuse

Configurez ces champs pour une instance Langfuse auto-hébergée :

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Construisez localement la valeur Authorization en encodant en Base64 la chaîne littérale `public-key:secret-key`
(par exemple avec `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Ne collez pas de véritables identifiants dans les journaux, les captures d’écran ou les tickets. Le mappage définit automatiquement
`x-langfuse-ingestion-version: 4` ; Authorization reste fourni dans `headers`.
Les en-têtes et le sel d’identité généré utilisent tous deux le mécanisme existant de champs secrets chiffrés
et les valeurs de substitution de l’API ; `STORAGE_ENCRYPTION_KEY` est requis.

Le mappage ajoute le type/modèle de génération, les détails d’utilisation au format JSON (entrée/sortie/total et les
clés de cache disponibles), les instantanés JSON des entrées/sorties, le niveau ERROR/DEFAULT, un message d’état assaini,
le nom de la trace, l’identifiant de session, un environnement facultatif et des attributs filtrables
`langfuse.observation.metadata.<key>` pour le fournisseur, le modèle demandé, le chemin, la combinaison, la
source du cache et l’état. `langfuse.observation.completion_start_time` est au format ISO 8601 et correspond à
l’heure de début + TTFT, uniquement lorsque le TTFT est connu et compris dans la durée. Aucun attribut de coût n’est envoyé.

Les modes d’identité s’appliquent à `langfuse.user.id` :

- `pseudonymous` (par défaut) : HMAC-SHA256 de l’identifiant interne de la clé API avec un sel aléatoire
  de 32 octets propre à chaque destination. Le sel est généré à la création s’il est absent, chiffré
  sous `identitySalt`, jamais renvoyé et conservé lors des modifications. Les identifiants bruts des clés ne sont jamais
  placés dans les attributs des spans. La recréation ou la rotation du sel d’une destination modifie les identités.
- `keyName` : le nom configuré de la clé API, qui révèle délibérément ce libellé défini par l’opérateur.
- `none` : aucun identifiant utilisateur. Les balises de session sont toujours exportées lorsqu’elles sont présentes ; ces modes
  n’anonymisent pas le contenu arbitraire des prompts ni les libellés de session/corrélation fournis par l’opérateur.

### Démarrer sans reprise de l’historique

À la création uniquement, activez **Démarrer à partir de la position actuelle (ignorer les journaux existants)** ou transmettez
`startFromCurrentPosition: true` au niveau supérieur du corps de la requête API de création. Cela initialise
`cursor_row_id` avec le rowid maximal actuel des journaux d’appels conservés à l’aide des fonctions utilitaires de curseur
existantes, sans migration. La valeur par défaut est false (curseur à 0 et reprise de l’historique conservé).
Ce paramètre ne permet pas de réinitialiser le curseur lors d’une mise à jour.

L’ajout partagé de `ttftMs` ajoute également une colonne `ttft_ms` acceptant les valeurs nulles au mappeur BigQuery
et au schéma des nouvelles tables : son test de schéma exige que chaque champ d’enregistrement canonique ait une
colonne. Les tables existantes continuent d’être exportées sans changement : `prepare()` lit le schéma de la table et
omet uniquement `ttft_ms` lorsque cette colonne est absente. Ajoutez la colonne INT64 acceptant les valeurs nulles pour obtenir le TTFT
à la prochaine exécution, ou utilisez une nouvelle table. Aucune requête PATCH, modification automatique du schéma ou autorisation
supplémentaire n’est nécessaire ; tous les autres champs des lignes restent soumis à une vérification stricte du schéma.

---

## 6. Ajout d’une destination

1. Créez `src/lib/logExport/destinations/<name>.ts` exportant un `LogExportDestinationType` :
   un `configSchema` Zod, un tableau de descripteurs `fields` pour l’interface utilisateur, des
   `secretFields`, et une fonction `createClient(config)` renvoyant `test()` / `prepare()` / `send(records)`.
2. Ajoutez-la au tableau `DESTINATIONS` dans `src/lib/logExport/registry.ts`.
3. Écrivez des tests sous `tests/unit/`.

C’est l’intégralité de la modification : la persistance, la tâche cron, la couche REST, le chiffrement
des secrets et le formulaire du tableau de bord lisent tous le registre.

Deux règles s’appliquent à une nouvelle destination :

- `send()` **doit lever une exception** en cas d’échec partiel. Une résolution signifie que « la
  destination possède ces lignes », et le curseur les dépasse définitivement.
- Une destination qui accepte une URL fournie par l’utilisateur doit la valider à l’aide de
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) avant d’effectuer
  la requête, de la même manière que les webhooks. BigQuery n’en a pas besoin : ses hôtes sont
  des constantes.

---

## 7. Exploitation

- **Tableau de bord** : Intégrations → Exportation des journaux. Ajoutez une destination, exécutez
  **Tester** pour vérifier les identifiants sans écrire de lignes, puis activez-la.
- **File d’attente** : chaque carte de destination affiche les lignes en attente et le curseur ;
  `GET /api/log-export/status` renvoie les mêmes chiffres, ainsi que les 20 dernières exécutions
  de la tâche.
- **L’échec d’une destination n’entraîne pas celui des autres** — le résumé de l’exécution
  enregistre l’état de chaque destination dans `last_status` / `last_error`, et l’historique des
  exécutions de la tâche conserve le résultat agrégé.
- **La suppression d’une destination supprime son curseur.** Si elle est ajoutée à nouveau, elle
  repart du journal d’appels conservé le plus ancien, ce qui renvoie des lignes que la destination
  contient peut-être déjà. Sur BigQuery, l’`insertId` de chaque ligne n’absorbe ces doublons que
  pendant la propre fenêtre de déduplication de BigQuery ; il est donc préférable de désactiver
  une destination plutôt que de la supprimer.
