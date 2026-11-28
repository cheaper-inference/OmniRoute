# Log export (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Export continu et incrémental des journaux d’appels OmniRoute vers un stockage analytique externe.

L’onglet Journaux du tableau de bord conserve l’historique des requêtes dans SQLite (`call_logs`), dont la taille est limitée par
la rotation et la rétention. L’export des journaux transfère ce même ensemble d’enregistrements selon une planification afin qu’il puisse être conservé au-delà de
la base de données locale et être joint à d’autres données. BigQuery est la première destination ; le
pipeline repose sur un registre, ce qui permet d’ajouter d’autres destinations.

---

## 1. Comment ça marche

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Calendrier** — un travail cron `JobRegistry`, `log_export`, par défaut `0 * * * *` (toutes les heures, UTC). Enregistré en `src/lib/initCloudSync.ts`; remplaçable avec `OMNIROUTE_LOG_EXPORT_CRON`. Chaque tique draine chaque** activé** destination, séquentiellement.
- **Cursor** — Le `call_logs.rowid` implicite de SQLite, conservé par destination dans `log_export_destinations.cursor_row_id`. `timestamp` n'est délibérément pas le curseur : les appelants peuvent fournir leur propre valeur, donc une requête lente peut être écrite après une requête plus rapide qui a démarré plus tard, et un curseur d'horodatage l'ignorerait.
- **Traitement par lots** Lignes — `batch_size` par requête (500 par défaut), lignes `max_rows_per_run` par exécution (10 000 par défaut), de sorte qu'un retard important s'écoule sur plusieurs ticks au lieu d'en bloquer un.
- **Livraison** — le curseur n'avance qu'après la résolution de `send()`. Un lot ayant échoué laisse le curseur là où il se trouvait, de sorte que les mêmes lignes sont réessayées lors de l'exécution suivante. La garantie est au moins une fois plus la déduplication côté destination, pas vraie exactement une fois : BigQuery saisit chaque ligne par l'identifiant du journal d'appels, qu'il honore au mieux dans sa propre fenêtre de déduplication.
- **Garde-chevauchement** — le cron tick et `POST .../run` peuvent tirer ensemble. Une destination déjà drainée est ignorée plutôt que drainée deux fois (`skipped: true` dans le résultat de l'exécution), de sorte qu'une exécution simultanée ne peut pas renvoyer un lot ou écrire le curseur à l'envers.
- **Purger la récupération** — si `cursor_row_id` se retrouve au-dessus `MAX(rowid)` (la table entière a été purgée et les rowids redémarrés), le coureur revient à 0 plutôt que de devenir définitivement aveugle.

### Coureur isolé et limites

Chaque destination exécutée sur Node démarre un processus enfant OS distinct et de courte durée (`child_process` avec IPC, pas `worker_threads`). Les lectures du corps, la charge utile JSON parsing/serialization, la destination `prepare()` et le réseau de destination I/O s'exécutent tous là-bas, pas sur la boucle d'événements du serveur. Seuls les messages de configuration et les petits messages de progression traversent IPC; les enregistrements exportés ne reviennent jamais au serveur. La tâche cron et la route Run now conservent le même résultat public et la même protection de chevauchement.

L'enfant ouvre le `DATA_DIR/storage.sqlite` résolu du serveur en lecture seule en utilisant `node:sqlite`, avec `busy_timeout=5000` et `query_only=ON`. Il n'importe aucun singleton DB et n'effectue aucune migration, sauvegarde ou mise à jour SQLite. La comptabilité des artefacts Missing/corrupt (y compris l'artefact corrompu UPDATE) reste uniquement dans le chemin des détails du tableau de bord. Les deux chemins partagent un résolveur de détails pur ; l'exportation utilise des lectures asynchrones du système de fichiers et le même artefact → Legacy Inline → Legacy Disk → aucun ordre de résolution. Une exécution capture le rowid d'insertion maximal lorsque l'enfant ouvre son lecteur ; les insertions ultérieures attendent la prochaine exécution. Il s'agit d'une limite d'insertion, pas d'une transaction SQLite de longue durée : les rédacteurs et les points de contrôle WAL restent libres pendant les attentes du réseau. Updates/deletions de lignes existantes ne sont pas gelées par cette limite.

Après chaque lot accepté, l'enfant attend un accusé de réception. Le serveur conserve d'abord le curseur avec `advanceLogExportCursor`, puis envoie `ack`; aucun prochain lot ne démarre avant lui. Un échec d'envoi, un crash ou un délai d'attente enregistre l'échec sans faire avancer ce lot. Les lots précédemment reconnus restent validés ; tout au plus le lot non accusé de réception peut être réexpédié. Le succès n'est enregistré qu'après `done` et une sortie propre de l'enfant. Les échecs mettent fin à l'enfant avec SIGTERM, passant à SIGKILL après 500 ms, et le programme d'exécution attend la fermeture du processus.

| Variable d'environnement                      | Défaut | But                                      |
| --------------------------------------------- | ------ | ---------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | Limite d'horloge murale par destination  |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | Limite d'ancien espace enfant V8 dans MB |

Les valeurs Invalid/non-positive/non-integer utilisent les valeurs par défaut. Le paramètre de tas n'est pas une limite totale RSS ; de très gros lots peuvent toujours épuiser la mémoire enfant et faire échouer l'exécution en toute sécurité. La valeur par défaut de 1 024 MB laisse une marge pour le lot par défaut de 500 lignes de 512 artefacts KiB avec des corps activés, y compris la sérialisation JSON fragmentée en octets de BigQuery. Cela ne garantit pas la sécurité d'un lot de carrosseries de 10 000 rangées. L'épuisement du tas V8 enregistre un échec exploitable : réduire la taille du lot ou augmenter `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; le curseur reste sur le dernier lot reconnu. Les corps historiques inline/disk ne sont pas couverts par le plafond des artefacts modernes. Les opérateurs doivent budgétiser RSS séparément, en particulier dans les conteneurs à mémoire limitée.

L'enfant hérite uniquement des `DATA_DIR`, `NODE_ENV`, `TZ` explicites (résolution en heure locale du nom de fichier hérité), `ELECTRON_RUN_AS_NODE` lorsqu'il est présent et des entrées sortantes suivantes : `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (et leurs formes minuscules), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`. Un répartiteur Undici global partage la résolution pure du proxy d'environnement du serveur et les règles de contournement de l'hôte local, notamment `NO_PROXY`; il n'importe pas `proxyFetch.ts` ou ses drapeaux DB/feature. Les informations d’identification du proxy sont supprimées de la sortie transférée et des erreurs enregistrées. Les informations d'identification de destination ne voyagent que dans un seul message de démarrage IPC, jamais argv ou environnement ; Le transfert output/error est préfixé et nettoyé. Seul `ExperimentalWarning` est désactivé dans les arguments d'exécution des enfants pour éviter de répéter SQLite de Node avertissant à chaque exécution de cron ; d'autres types d'avertissement restent visibles.

Les modules de destination doivent être importables sans dépendances Next.js/server-only. L'implémentation BigQuery existante répond déjà à ce contrat. Les caches de jetons d’accès ne durent que pour l’exécution enfant, et non pour plusieurs exécutions. Node est le moteur d'exécution pris en charge (moteurs `package.json` ). Il existe un chemin de compatibilité Bun non pris en charge (`bun:sqlite` dans `src/lib/db/core.ts` / adapters et `Dockerfile.bun`), les exportations ne doivent donc pas être interrompues. Sous Bun, les exportations conservent le chemin d'accès en cours précédent et émettent un avertissement unique : l'isolation heap/timeout enfant n'est pas disponible. Utilisez Node pour l'isolation des boucles d'événements et OOM.

Lorsque `includeBodies` est activé, préférez une cadence par minute telle que `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` plutôt que d'accumuler un retard horaire en matière de charge utile. Les limites de lots et de lignes sont toujours liées à chaque exécution. Le démarrage du processus est payé par destination et par exécution ; cela échange un petit coût de démarrage contre l'isolation de la boucle d'événements du serveur, sans réduire l'utilisation totale CPU.

### Charges utiles (invites et complétions)

Par défaut l'export porte uniquement les champs récapitulatifs des Logs** liste** montre. Allumer** Exporter les invites et les réponses** (`includeBodies`) expédie en outre ce que les journaux** détail** Le volet affiche pour chaque appel :

| Champ                            | Ce qu'il contient                                                        |
| -------------------------------- | ------------------------------------------------------------------------ |
| `request_body` / `response_body` | Les charges utiles des appels telles que le tableau de bord les restitue |
| `pipeline_route_decision`        | Quelle cible et quel modèle le routeur a choisi                          |
| `pipeline_client_request`        | La demande brute exactement telle que le client l'a envoyée              |
| `pipeline_openai_request`        | Après traduction dans la forme interne OpenAI                            |
| `pipeline_provider_request`      | Comme effectivement envoyé en amont, dans le dialecte du fournisseur     |
| `pipeline_provider_response`     | La réponse brute en amont                                                |
| `pipeline_client_response`       | Ce qui a été restitué à l'appelant                                       |
| `pipeline_error`                 | Détails de l'erreur au niveau du pipeline pour un appel ayant échoué     |
| `bodies_truncated`               | Vrai lorsqu'un champ ci-dessus atteint `maxBodyBytes`                    |

Il s'agit d'un contenu rapide, donc c'est** désactivé par défaut** et délibérément un choix par destination. Ce qui est livré est ce que le tableau de bord montre, car l'exportation et la résolution des détails du partage `getCallLogById` : les charges utiles sont déjà nettoyées par les PII et rédigées en secret lorsqu'elles sont écrites, et un appel effectué avec une clé `noLog` API ne stocke aucune charge utile, il n'y a donc rien à exporter.

Les charges utiles sont lues par ligne à partir de l'artefact du système de fichiers, de sorte que l'hydratation ne s'exécute que pour les destinations qui l'ont demandé. Un artefact manquant ou corrompu exporte son résumé avec des charges utiles nulles plutôt que de faire échouer le lot et de bloquer le curseur.

`maxBodyBytes` (par défaut 262144) couvre chaque champ. Des charges utiles plus longues sont** tronqué plutôt que supprimé** — une invite coupée répond toujours "ce qui a été demandé" — et la ligne est marquée avec `bodies_truncated`. Les deltas diffusés morceau par morceau ne sont pas exportés ; la réponse assemblée est déjà dans `pipeline_provider_response` et `pipeline_client_response`.

---

## 2. Fichiers

| Élément                                       | Emplacement                                  |
| --------------------------------------------- | -------------------------------------------- |
| Contrat de destination                        | `src/lib/logExport/types.ts`                 |
| Registre                                      | `src/lib/logExport/registry.ts`              |
| Gestion des secrets                           | `src/lib/logExport/secrets.ts`               |
| Exécuteur (IPC parent)                        | `src/lib/logExport/runner.ts`                |
| Cycle de vie du processus                     | `src/lib/logExport/childRunner.ts`           |
| Point d’entrée du processus enfant            | `src/lib/logExport/exportChild.ts`           |
| Ouverture en lecture seule                    | `src/lib/db/logExportReadOnly.ts`            |
| Requêtes et mappage partagés                  | `src/lib/usage/callLogExportQueries.ts`      |
| Résolveur de détails                          | `src/lib/usage/callLogDetailResolver.ts`     |
| Projection API                                | `src/lib/logExport/presenter.ts`             |
| Destination BigQuery                          | `src/lib/logExport/destinations/bigquery.ts` |
| Authentification par compte de service Google | `src/lib/logExport/googleServiceAccount.ts`  |
| Source des journaux d’appels                  | `src/lib/usage/callLogExportSource.ts`       |
| Persistance                                   | `src/lib/db/logExportDestinations.ts`        |
| Tâche cron                                    | `src/lib/jobs/logExportJob.ts`               |
| Couche REST                                   | `src/app/api/log-export/`                    |
| Page du tableau de bord                       | `src/app/(dashboard)/dashboard/log-export/`  |

Schéma : `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Toutes les routes exigent une authentification de gestion (`requireManagementAuth`). Les secrets ne sont jamais renvoyés :
un secret stocké est renvoyé sous la forme de la valeur littérale `__stored__`, et renvoyer cette valeur lors d’une mise à jour
préserve l’identifiant stocké.

La création ou la mise à jour d’une destination dont le type déclare un secret **nécessite
`STORAGE_ENCRYPTION_KEY`**. Sans cette variable, `encrypt()` laisse silencieusement la valeur inchangée ; l’écriture est donc
refusée avec un code 400 plutôt que de stocker un identifiant en clair dans SQLite (la même protection que celle
appliquée par le webhook Telegram).

| Méthode  | Chemin                                   | Objectif                                                                        |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Types de destinations et liste de leurs champs de configuration                 |
| `GET`    | `/api/log-export/destinations`           | Lister les destinations (secrets masqués)                                       |
| `POST`   | `/api/log-export/destinations`           | Créer une destination                                                           |
| `GET`    | `/api/log-export/destinations/{id}`      | Consulter une destination                                                       |
| `PUT`    | `/api/log-export/destinations/{id}`      | Mettre à jour le nom / l’activation / la configuration / le traitement par lots |
| `DELETE` | `/api/log-export/destinations/{id}`      | Supprimer                                                                       |
| `POST`   | `/api/log-export/destinations/{id}/test` | Vérifier les identifiants, sans aucune écriture                                 |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Vider la file maintenant, via le même chemin d’exécution que la tâche planifiée |
| `GET`    | `/api/log-export/status`                 | État du cron, exécutions récentes, éléments en attente par cible                |

`GET /api/log-export/types` permet de rendre l’interface générique : le formulaire du tableau de bord est généré à partir
des descripteurs de champs renvoyés ; une nouvelle destination ne nécessite donc aucune modification de l’interface.

---

## 4. Destination BigQuery

Clés de configuration (`type: "bigquery"`):

| Clé                  | Notes                                                                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Projet GCP contenant l'ensemble de données                                                                                                                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                                                                            |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                                                                            |
| `location`           | Utilisé uniquement lorsque l'ensemble de données doit être créé (valeur par défaut `EU`)                                                                                   |
| `serviceAccountJson` | Clé du compte de service. Secret : chiffrée au repos, jamais renvoyée                                                                                                      |
| `autoCreate`         | Créer l'ensemble de données/la table manquants ; ajouter conditionnellement les colonnes d'éléments de preuve d'utilisation pouvant être nulles (valeur par défaut `true`) |

Le compte de service a besoin de `bigquery.tables.updateData` sur la table cible, ainsi que de
`bigquery.datasets.create` / `bigquery.tables.create` lorsque `autoCreate` est activé.
La mise à jour d'une table existante pour ajouter les deux champs d'éléments de preuve d'utilisation
pouvant être nuls nécessite également `bigquery.tables.update`. Une autorisation manquante
fait échouer l'export sans faire avancer son curseur.

Un lot configuré constitue une unité de **curseur**, et non une unité HTTP : `send()` le divise en
appels insertAll de 500 lignes maximum, de sorte qu'une valeur élevée de `batch_size` ne peut pas
déclencher la limite de requête de 10 Mo de BigQuery. Les statuts transitoires (408/429/500/502/503/504)
font l'objet de trois nouvelles tentatives maximum avec un intervalle exponentiel, en réutilisant
les mêmes insertIds ; les erreurs d'authentification et de schéma sont levées dès la première
tentative plutôt que de consommer l'exécution.

Une table créée quelques instants auparavant n'est pas encore visible par le point de terminaison
de streaming, qui renvoie 404 pendant quelques secondes. Cette erreur 404 fait l'objet de nouvelles
tentatives, mais **uniquement lorsque cette exécution a créé la table** — une table réellement
manquante échoue immédiatement. Notez que recréer une table sous un nom qui vient d'être supprimé
fait refuser par BigQuery les insertions en streaming pendant plusieurs minutes ; c'est une
caractéristique de la suppression suivie d'une recréation. Préférez donc un nouveau nom de table
plutôt que d'en supprimer une puis de la recréer.

**Un échec partiel arrive sous la forme d'une réponse HTTP 200 avec un tableau `insertErrors[]` non vide.** Cela est traité comme un échec et lève une exception, ce qui empêche le curseur
d'avancer au-delà des lignes que BigQuery n'a jamais acceptées ;
`tests/unit/log-export-bigquery.test.ts` verrouille ce comportement.

Le transport utilise une API REST simple : une assertion RS256 autosignée est échangée contre un
jeton d'accès à `https://oauth2.googleapis.com/token`, puis les lignes sont envoyées à
`tabledata.insertAll`. Aucun SDK Google n'est intégré. Les jetons d'accès sont mis en cache
en mémoire par (compte de service, portée).

La table créée contient une colonne pour chaque champ de l'onglet Logs, ainsi que `exported_at`, et
est structurée en fonction de la manière dont les journaux d'appels sont effectivement interrogés :

- **Partitionnement par jour sur `timestamp`**, de sorte qu'une requête limitée à une date ne parcoure
  que les jours concernés.
- **Regroupement par `api_key_name`, `provider`, `model`, `status`** (dans cet ordre), afin qu'un filtrage
  selon l'auteur de l'appel, sa destination ou son échec élimine les blocs à l'intérieur de chaque
  partition. BigQuery autorise au maximum quatre colonnes de regroupement et leur ordre est important :
  un filtre sur `api_key_name` seul élimine des blocs, tandis qu'un filtre sur `status` seul ne le fait pas.
- **Rétention facultative des partitions** via `partitionExpirationDays` (0 conserve tout), appliquée
  lors de la création de la table.

Ces deux paramètres s'appliquent lors de la création. Une table existante conserve la structure
qu'elle possède déjà ; utilisez donc un nouvel identifiant de table pour les adopter.

`tests/unit/log-export-bigquery.test.ts` vérifie que le mappeur et le schéma de la table restent
synchronisés, afin qu'une nouvelle colonne de journal d'appel ne puisse pas être ignorée
silencieusement lors de l'export.

Les lots sont divisés en fonction du **nombre de lignes et du nombre d'octets sérialisés**. Le seul
nombre de lignes ne suffit pas dès que les charges utiles sont exportées : 500 lignes contenant des
invites peuvent représenter plusieurs dizaines de mégaoctets, et insertAll rejette une requête de
plus de 10 Mo. Les blocs se terminent à 500 lignes ou à 9 Mo, selon la première limite atteinte.

---

## 5. Destination de traces OTLP/HTTP

La configuration utilise `type: "otlp-http"`. Il s’agit d’une exportation planifiée, basée sur un curseur, des journaux d’appels persistants, et non du collecteur d’événements de routage en direct à traitement au mieux disponible dans
`open-sse/services/routing/otel.ts`. Elle ne lit ni ne modifie les variables
d’environnement, les minuteurs ou les tampons de ce collecteur. L’activation des deux peut produire deux types indépendants de spans ;
utilisez le scope d’instrumentation `omniroute.log-export` pour distinguer ces spans de journaux d’appels.

| Clé                      | Valeur par défaut / objectif                                                          |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `endpoint`               | URL complète requise des traces HTTP(S) ; aucun suffixe `/v1/traces` n’est ajouté     |
| `headers`                | Lignes facultatives `Name: value` ou objet JSON de chaînes ; chiffrées                |
| `requestHeaderAllowlist` | Vide (désactivé) ; noms/préfixes d’en-têtes client à capturer comme attributs de span |
| `serviceName`            | `omniroute` ; ressource `service.name`                                                |
| `langfuseMapping`        | `false` ; ajoute les attributs de génération/session/utilisateur Langfuse             |
| `identity`               | `pseudonymous`, `keyName` ou `none`                                                   |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                               |
| `timeoutMs`              | `30000` par tentative HTTP                                                            |
| `environment`            | Non défini ; `langfuse.environment` facultatif                                        |

Le tableau de bord générique affiche ces champs. `paths` accepte un tableau d’API ou une zone de texte contenant des chemins exacts séparés par des sauts de ligne ou des virgules. Les embeddings, le reranking et les autres chemins sont ignorés, sauf s’ils sont explicitement autorisés. Les lignes ignorées font tout de même avancer le curseur ; les compteurs `exported`/`exportedTotal` de l’exécuteur existant comptent les lignes source traitées, y compris les lignes filtrées, plutôt que les spans acceptés. Le filtrage est effectué dans le processus enfant, sans modifier le contrat IPC/de curseur.

La validation de l’URL utilise l’assistant sans accès à la base de données `parseAndValidateNonMetadataUrl` de
`src/shared/network/outboundUrlGuard.ts` : la politique `block-metadata`. Elle applique les mêmes vérifications inconditionnelles des métadonnées, du protocole et des identifiants intégrés que le validateur de webhook, avec l’autorisation des URL privées, mais permet délibérément les cibles localhost/LAN sans remplacement par un indicateur de fonctionnalité global. Cela autorise les points de terminaison Langfuse, Phoenix, Tempo et Collector auto-hébergés, y compris les points de terminaison HTTP privés. Les hôtes de métadonnées cloud sont toujours bloqués. Les redirections ne sont pas suivies ; un collecteur ne peut donc pas rediriger des identifiants vers un autre hôte. Comme le garde-fou lexical d’URL existant, ce mécanisme ne verrouille pas la résolution DNS ; configurez uniquement des hôtes contrôlés par l’opérateur. Préférez HTTPS lorsque le point de terminaison ne se trouve pas sur un réseau de confiance.

### Charge utile et distribution

Le JSON OTLP/HTTP (`ExportTraceServiceRequest`, `Content-Type: application/json`) contient un
span CLIENT par ligne autorisée, nommé d’après son chemin de requête exact. Le nommage des chemins distingue
Chat Completions, Responses et Messages sans intégrer de données de modèle ou d’identité dans le nom du span. Les attributs de ressource comprennent `service.name` et la
version `service.version` du package.

Le journaliseur normal des tentatives de chat (`open-sse/handlers/chatCore/attemptLogging.ts`) écrit
`duration = Date.now() - startTime` à la fin et ne fournit pas d’horodatage ;
`saveCallLogOperation` dans `src/lib/usage/callLogs.ts` définit par défaut l’horodatage sur l’heure d’écriture
(de fin). L’exportation définit donc end sur l’horodatage de la ligne et start sur end − duration
(en millisecondes, converties en nanosecondes décimales). Les horodatages historiques fournis par l’appelant
sont également conservés comme heure de fin ; il n’existe pas de distinction par ligne entre le début et la fin. Une durée nulle devient zéro. Les horodatages non valides ou manquants font échouer le lot au lieu de créer des spans non déterministes. `ttftMs` est nullable et est associé à `omniroute.ttft_ms`.

Les attributs comprennent `gen_ai.operation.name="chat"`, le fournisseur, le modèle demandé/de réponse,
les tokens d’entrée/de sortie, les tokens facultatifs de lecture du cache/de création du cache/de raisonnement, le statut HTTP,
le combo, la source du cache, l’étiquette de session et l’identifiant de corrélation. Les valeurs entières OTLP et les horodatages sont des chaînes décimales ; les chaînes, les booléens et les nombres fractionnaires utilisent leurs variantes de valeur OTLP natives. Les spans en erreur ont le statut ERROR et un message de statut nettoyé. L’enregistrement canonique ne contient aucune URL d’hôte en amont ; `server.address` est donc omis plutôt que d’identifier incorrectement le collecteur comme serveur de modèle. Le coût n’est pas exporté.

Seul `includeBodies=true` hydrate le contenu. Avec `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` contiennent le JSON nettoyé du corps de la requête/réponse,
tel qu’il est stocké par OmniRoute (canonisé lorsqu’il peut être analysé), et non un tableau de messages semconv
restructuré. Les corps tronqués ou non JSON restent du texte brut. Avec `langfuseMapping=true`,
les corps sont émis uniquement sous la forme de `langfuse.observation.input` / `langfuse.observation.output` ;
les attributs `gen_ai.*.messages` sont omis afin que chaque corps soit envoyé une seule fois. Les deux modes héritent de `maxBodyBytes` du chemin d’hydratation existant ;
`omniroute.bodies_truncated=true` indique une troncature.
Cette destination n’ajoute aucun instantané supplémentaire du pipeline ni aucune lecture d’artefact non nettoyée ;
la capture facultative des en-têtes de requête utilise l’instantané client hydraté existant décrit ci-dessous.
Utilisez une cadence à la minute, par exemple `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, lors de l’exportation
des corps, plutôt que d’accumuler un retard horaire.

### En-têtes de requête client facultatifs

La capture des en-têtes est **désactivée par défaut**. Définissez `requestHeaderAllowlist` dans la configuration de destination
et activez **Exporter les invites et les réponses** (`includeBodies: true` sur la destination).
La liste d’autorisation accepte un tableau d’API ou une zone de texte contenant des noms séparés par des sauts de ligne ou des virgules :

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Les noms correspondent sans tenir compte de la casse et doivent correspondre exactement, sauf si un seul
`*` terminal sélectionne un préfixe non vide de nom d’en-tête. Un `*` seul, les caractères génériques
intégrés et les noms d’en-tête HTTP non valides sont rejetés. Il y a au maximum 64 sélecteurs, chacun
ayant un nom ou un préfixe de 256 octets ASCII au plus.
Ce paramètre est distinct de `headers`, qui authentifie l’exportateur auprès du collecteur.

La capture lit uniquement `pipeline_client_request`, alimenté par le `clientRawRequest` (ou
`clientRequest` historique) du pipeline détaillé enregistré. Elle ne revient jamais aux en-têtes de
requête du fournisseur. La journalisation détaillée du pipeline doit avoir été activée lors de
l’enregistrement de la requête. Lorsque `includeBodies` est désactivé, ou lorsque le JSON de
l’instantané client est absent, corrompu ou tronqué, aucun attribut d’en-tête n’est émis. Augmenter
`maxBodyBytes` peut éviter la troncature de l’instantané au moment de l’exportation ; cela ne peut pas
restaurer des détails qui n’ont jamais été enregistrés. Un instantané de plus de 1 MiB ou contenant
plus de 256 entrées d’en-tête est ignoré. L’exportation existante des prompts et des réponses reste
activée parallèlement à la capture des en-têtes ; la liste d’autorisation ne fournit pas de mode
d’hydratation limité aux en-têtes.

Les valeurs sélectionnées deviennent des tableaux de chaînes OTLP
`http.request.header.<full lowercase header name>`, même pour une chaîne unique. Par exemple,
`X-OmniRoute-Meta-Team: example-team` devient
`http.request.header.x-omniroute-meta-team` avec
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Le préfixe complet est conservé : il s’agit d’en-têtes ordinaires, sans analyse de champs métier ni
conversion vers `omniroute.metadata.*` ou les métadonnées Langfuse. `langfuseMapping` ne modifie pas
la sémantique des en-têtes. Un `User-Agent` sélectionné ne contenant qu’une seule valeur définit
également le scalaire standard `user_agent.original`. Les virgules à l’intérieur d’une valeur ne
sont pas séparées. Les variantes de casse sont fusionnées dans l’ordre des entrées enregistrées ;
toute variante non valide entraîne l’omission de l’intégralité de cet en-tête. Les attributs sont
classés par nom en minuscules.

`Authorization`, `Proxy-Authorization`, `Cookie`, `Set-Cookie`, les en-têtes de clé d’API, les noms
contenant des marqueurs liés à l’authentification, aux jetons, aux secrets, aux mots de passe ou aux
identifiants, ainsi que les identifiants internes de la passerelle sont toujours exclus, même s’ils
sont sélectionnés ou partiellement masqués dans le stockage. Les motifs d’identifiants connus
réutilisent le détecteur d’identifiants partagé ; les marqueurs de masquage sont omis et non exportés
comme des valeurs sûres. Seules les chaînes et les tableaux non vides de chaînes sont acceptés ;
aucun nombre ni objet n’est converti implicitement. Les noms non valides, les clés de prototype, les
caractères de contrôle (à l’exception de la tabulation horizontale) et les caractères Unicode mal
formés sont ignorés sans faire échouer le lot ni refléter leur contenu dans les erreurs.

Chaque span capture au maximum 32 en-têtes, 16 valeurs par en-tête, 4096 octets UTF-8 par valeur et
16384 octets UTF-8 au total pour les noms et valeurs d’en-tête capturés. Les en-têtes trop volumineux
ou non valides sont entièrement omis, et non tronqués. La sélection constitue une décision de
confidentialité de l’opérateur : des noms apparemment sûrs peuvent tout de même contenir des données
personnelles, et ces limites et détecteurs ne sont pas un outil général de nettoyage des données
personnelles.

### Limites de livraison

Les requêtes sont limitées à 500 spans et 4 MiB de JSON UTF-8, enveloppe comprise.
Chaque span autorisé fait l’objet d’un contrôle de taille avant la première requête d’un lot de
curseur. Un span individuel dépassant la limite n’envoie aucune partie de ce lot et échoue avec
l’instruction de réduire `maxBodyBytes` ; il n’est pas ignoré silencieusement. Le précontrôle ne
conserve que les références aux enregistrements et les comptes d’octets, en supprimant chaque span
ou JSON temporaire ; les spans sont reconstruits pour des blocs de taille limitée au lieu de
conserver une seconde copie sérialisée du lot. Les erreurs HTTP 408/429/5xx, les échecs réseau et
les dépassements de délai font l’objet d’au plus trois tentatives, avec un recul exponentiel de
250/500 ms. Les secondes `Retry-After` ou les dates HTTP peuvent prolonger le délai jusqu’à
5 secondes. Les autres statuts échouent immédiatement. Un rejet partiel OTLP 2xx déclenche
également une erreur au lieu d’accuser réception d’un span perdu ; les accusés de réception JSON
vides ou valides sont acceptés, avec une limite de lecture de la réponse de 64 KiB.

Les erreurs ne contiennent que des faits appartenant à l’exportateur : statut HTTP, classe de
nouvelle tentative, nombre de tentatives et nombre de spans envoyés, ou un libellé fixe indiquant
un échec d’accusé de réception ou de réseau. Les corps de réponse du collecteur, les nombres de
rejets partiels et les en-têtes de réponse ne sont jamais copiés dans les erreurs, les journaux ou
le tableau de bord. Un lot ayant échoué ou n’ayant été accepté que partiellement n’est pas accusé
réception : la destination affiche l’état Échec avec ce statut, le curseur reste au dernier lot
accusé réceptionné et l’exécution suivante renvoie les mêmes lignes. Les statuts permanents
continuent d’échouer jusqu’à la correction du collecteur ou de la configuration. Consultez les
journaux du collecteur pour obtenir les détails de la réponse. Les résumés d’erreur des journaux
d’appels conservent leur propre masquage.
`prepare()` ne provisionne rien ; Test envoie exactement `{"resourceSpans":[]}` et signale le statut
HTTP sans écrire de spans dans le journal des appels.

Les identifiants de trace et de span sont les 32/16 premiers chiffres hexadécimaux de SHA-256
calculé sur `"omniroute.trace\\0" + callLogId` et `"omniroute.span\\0" + callLogId`. Les renvois
utilisent des identifiants identiques. Il ne s’agit pas d’une garantie de déduplication : certains
backends, notamment l’ingestion Langfuse v4, ne dédupliquent pas les spans portant le même
identifiant. Un plantage ou l’échec partiel d’un bloc peut renvoyer au maximum le seul lot de curseur
non accusé réceptionné ; l’intégralité de ce lot peut être dupliquée, et pas uniquement son dernier
bloc HTTP. Choisissez la taille des lots de curseur en tenant compte de ce compromis.

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

Construisez localement la valeur `Authorization` sous forme de Base64 de la chaîne littérale
`public-key:secret-key` (par exemple avec `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Ne collez pas de véritables identifiants dans des journaux, des captures d’écran ou des tickets.
Le mappage définit automatiquement `x-langfuse-ingestion-version: 4` ; `Authorization` doit
toujours être fourni dans `headers`. Les deux en-têtes ainsi que le sel d’identité généré utilisent
le mécanisme existant de champs secrets chiffrés et les espaces réservés d’API ;
`STORAGE_ENCRYPTION_KEY` est requis.

Le mappage ajoute le type/modèle de génération, les détails d’utilisation JSON (entrée/sortie/total et clés
de cache disponibles), les instantanés d’entrée/sortie JSON, les niveaux ERROR/DEFAULT, le message d’état
assaini, le nom de trace, l’identifiant de session, l’environnement facultatif et
`langfuse.observation.metadata.<key>` filtrable pour le fournisseur, le modèle demandé, le chemin, la combinaison, la source
du cache et l’état. `langfuse.observation.completion_start_time` est au format ISO 8601 au
début + TTFT uniquement lorsque le TTFT est connu et compris dans la durée. Aucun attribut de coût n’est envoyé.

Les modes d’identité s’appliquent à `langfuse.user.id` :

- `pseudonymous` (par défaut) : HMAC-SHA256 de l’identifiant interne de la clé API avec un sel de 32 octets aléatoire
  propre à chaque destination. Le sel est généré lors de la création s’il est absent, chiffré
  en tant que `identitySalt`, n’est jamais renvoyé et est conservé lors des modifications. Les identifiants bruts des clés ne sont jamais
  placés dans les attributs des spans. La recréation ou la rotation du sel d’une destination modifie les identités.
- `keyName` : le nom de clé API configuré, révélant intentionnellement ce libellé d’opérateur.
- `none` : aucun identifiant utilisateur. Les balises de session sont toujours exportées lorsqu’elles sont présentes ; ces modes n’anonymisent pas le contenu arbitraire des prompts ni les libellés de session/corrélation fournis par l’opérateur.

### Démarrer sans rétrospection

Lors de la création uniquement, activez **Start from current position (skip existing logs)** ou transmettez
`startFromCurrentPosition: true` au niveau supérieur de la charge utile de l’API de création. Cette option initialise
`cursor_row_id` à la valeur maximale actuelle du rowid des lignes de journaux d’appels conservées, à l’aide des assistants de curseur
existants, sans migration. La valeur par défaut est false (curseur à 0 et rétrospection de l’historique conservé).
Il ne s’agit pas d’un paramètre de réinitialisation du curseur lors d’une mise à jour.

L’ajout partagé de `ttftMs` ajoute également une colonne nullable `ttft_ms` au mappeur BigQuery
et au schéma de la nouvelle table : son test de schéma exige que chaque champ d’enregistrement canonique possède une
colonne. Les tables existantes continuent d’exporter leurs données sans modification : `prepare()` lit le schéma de la table
et omet uniquement `ttft_ms` lorsque cette colonne est absente. Ajoutez la colonne INT64 nullable pour obtenir le TTFT
lors de la prochaine exécution, ou utilisez une nouvelle table. La colonne TTFT facultative ne déclenche pas de mise à jour du schéma. Les colonnes de preuve d’utilisation
suivent le flux de compatibilité conditionnel et opt-in ci-dessous ; les autres champs de ligne conservent une
vérification stricte du schéma.

---

## 6. Ajouter une destination

1. Créez `src/lib/logExport/destinations/<name>.ts` exportant un `LogExportDestinationType` :
   un `configSchema` Zod, un tableau de descripteurs `fields` pour l’interface, `secretFields`, et un
   `createClient(config)` renvoyant `test()` / `prepare()` / `send(records)`.
2. Ajoutez-le au tableau `DESTINATIONS` dans `src/lib/logExport/registry.ts`.
3. Écrivez des tests dans `tests/unit/`.

C’est l’ensemble des modifications à effectuer : la persistance, la tâche cron, la couche REST, le chiffrement des secrets et le
formulaire du tableau de bord lisent tous le registre.

Deux règles pour une nouvelle destination :

- `send()` **doit lever une exception** en cas d’échec partiel. Une résolution réussie signifie « la destination possède ces lignes »,
  et le curseur les dépasse définitivement.
- Une destination qui accepte une URL fournie par l’utilisateur doit la valider avec
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) avant d’effectuer la requête,
  comme le font les webhooks. BigQuery n’en a pas besoin : ses hôtes sont des constantes.

---

## 7. Fonctionnement

- **Tableau de bord** : Intégrations → Exportation des journaux. Ajoutez une destination, exécutez **Tester** pour vérifier les identifiants
  sans écrire de lignes, puis activez-la.
- **Backlog** : chaque carte de destination affiche les lignes en attente et le curseur ; `GET
/api/log-export/status` renvoie les mêmes chiffres ainsi que les 20 dernières exécutions de tâches.
- **L’échec d’une destination n’entraîne pas l’échec des autres** — le résumé de l’exécution enregistre l’état par destination
  dans `last_status` / `last_error`, et l’historique des exécutions conserve le résultat global.
- **La suppression d’une destination supprime son curseur.** Si vous la rajoutez, l’exportation reprend au niveau de l’appel
  conservé le plus ancien, ce qui renvoie les lignes que la destination peut déjà contenir. Sur BigQuery, le `insertId` par ligne
  n’absorbe cela que pendant la fenêtre de déduplication propre à BigQuery ; préférez donc désactiver une destination plutôt que
  de la supprimer.

### Compatibilité du schéma des preuves d’utilisation

Les nouvelles tables BigQuery incluent `usage_evidence` (STRING contenant du JSON) et
`usage_estimated` (BOOL), qui peuvent avoir la valeur NULL. Lorsque `autoCreate` est activé, une table existante peut recevoir
uniquement ces colonnes NULL manquantes. L’exportateur préserve l’intégralité du schéma existant, y compris les métadonnées des
champs, et envoie un PATCH conditionnel à l’aide de l’etag renvoyé. Une modification concurrente du schéma fait échouer
l’exportation au lieu de l’écraser ; l’exécution suivante relit la table.

Lorsque `autoCreate` est désactivé, ajoutez vous-même ces colonnes avant d’exporter des enregistrements
avec des preuves d’utilisation. L’absence de métadonnées de schéma/etag ou l’échec d’une mise à jour empêche également les
insertions contenant des preuves. Le curseur d’exportation n’avance pas en cas d’échec et les preuves ne sont jamais supprimées
silencieusement. La conservation locale des journaux continue de s’appliquer tant qu’une exportation est bloquée ; résolvez donc
l’échec avant l’expiration des lignes sources conservées.
