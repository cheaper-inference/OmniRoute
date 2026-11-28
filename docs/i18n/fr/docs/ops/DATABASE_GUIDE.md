# Database Schema & Operations Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **En bref** : OmniRoute utilise **SQLite avec journalisation WAL** comme stockage principal, avec un chiffrement **AES-256-GCM** au repos pour les champs sensibles. Ce guide couvre le schéma, les migrations, la sauvegarde/restauration et les procédures opérationnelles.

**Sources :**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tables de base)
- `src/lib/db/migrationRunner.ts` — migrations versionnées
- `src/lib/db/migrations/` — 167 fichiers SQL versionnés
- `src/lib/db/encryption.ts` — fonctions utilitaires de chiffrement
- `src/lib/db/backup.ts` — exportation/importation des sauvegardes
- `src/lib/db/healthCheck.ts` — diagnostics d’intégrité

---

## Pourquoi SQLite ?

OmniRoute a choisi SQLite plutôt que PostgreSQL/MySQL pour plusieurs raisons :

| Facteur          | SQLite                                        | PostgreSQL                                       |
| ---------------- | --------------------------------------------- | ------------------------------------------------ |
| **Déploiement**  | Intégré — aucun serveur distinct              | Nécessite la configuration d’un serveur          |
| **Chiffrement**  | Couche applicative (AES-256-GCM)              | TDE intégré                                      |
| **Performances** | Plus rapide pour les charges faibles/moyennes | Meilleur pour les écritures simultanées massives |
| **Concurrence**  | Le mode WAL autorise les lectures simultanées | MVCC complet                                     |
| **Sauvegarde**   | Copie d’un fichier unique                     | `pg_dump` ou instantané du système de fichiers   |
| **Cas d’usage**  | Installation par utilisateur, intégrée        | SaaS mutualisé                                   |

Pour les déploiements **mono-utilisateur et à instance unique** (le principal cas d’usage d’OmniRoute), SQLite est plus simple et plus rapide.

### Journalisation WAL

`core.ts` ouvre la base de données en **mode WAL (Write-Ahead Logging, journalisation anticipée)** :

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL permet des **lectures simultanées** pendant les écritures — un point important pour le tableau de bord, qui exécute des requêtes pendant l’enregistrement des requêtes entrantes.

La taille par défaut du cache est de **65 536 Kio (64 Mio)**. SQLite interprète une valeur négative de
`cache_size` comme une limite supérieure approximative exprimée en Kio et alloue les pages à la demande.
**Paramètres > Système et stockage > Taille du cache** accepte des valeurs entières comprises entre **1 et
1 000 000 Kio** ; l’enregistrement du paramètre l’applique à la connexion active à la base de données,
et OmniRoute restaure la valeur persistée au démarrage.

---

## Emplacement de la base de données

Le fichier SQLite est stocké à l’emplacement suivant :

| SE      | Chemin                                                   |
| ------- | -------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                            |
| macOS   | `~/.omniroute/storage.sqlite`                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                |
| Docker  | `/app/data/storage.sqlite` (configurable via `DATA_DIR`) |

Fichiers associés :

- `storage.sqlite-wal` — journal d’écriture anticipée
- `storage.sqlite-shm` — fichier de mémoire partagée
- `call_logs/` — artefacts des charges utiles des requêtes (si activé)

**Remplacer l’emplacement :**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Architecture des modules de domaine

La base de données d’OmniRoute comporte **110 modules TypeScript de premier niveau** dans `src/lib/db/`. Chaque module de domaine :

- Gère une ou plusieurs tables spécifiques
- Exporte des fonctions CRUD typées
- N’accède jamais aux tables d’un autre module
- Utilise `getDbInstance()` depuis `core.ts` pour accéder à la base de données

### Les 110 modules de base de données de premier niveau

OmniRoute comporte **110 fichiers TypeScript de premier niveau** dans `src/lib/db/`. Vous trouverez ci-dessous un échantillon des principaux modules ; consultez la liste du répertoire pour obtenir la liste complète :

| Module                  | Tables                                                         | Responsabilité                                                                            |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Enregistrement des fournisseurs et identifiants OAuth/clés d’API                          |
| `models.ts`             | `key_value` (données des modèles)                              | Définitions, fonctionnalités et tarification des modèles                                  |
| `combos.ts`             | `combos`                                                       | Configurations et ordre de routage des combinaisons                                       |
| `apiKeys.ts`            | `api_keys`                                                     | Cycle de vie des clés d’API, portées et suivi des quotas                                  |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Configuration système et stockage clé-valeur partagé                                      |
| `backup.ts`             | —                                                              | Opérations d’exportation/importation des sauvegardes                                      |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Configurations des proxys et règles de routage                                            |
| `prompts.ts`            | `prompt_templates`                                             | Modèles de prompts réutilisables et gestion des versions                                  |
| `webhooks.ts`           | `webhooks`                                                     | Abonnements aux webhooks pilotés par des événements et journaux                           |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Journalisation d’audit par requête (facultative, volume élevé)                            |
| `domainState.ts`        | `domain_*` (5 tables)                                          | Budgets de domaine, disjoncteurs, verrouillages, chaînes de repli et historique des coûts |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Clés d’API autorisées pour MCP/A2A                                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historique de l’utilisation des quotas                                                    |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Association des modèles aux combinaisons par défaut                                       |
| `cliToolState.ts`       | `cli_tool_state`                                               | État persistant propre à la CLI                                                           |
| `encryption.ts`         | —                                                              | Utilitaires de chiffrement/déchiffrement des champs                                       |
| `readCache.ts`          | —                                                              | Cache en mémoire pour les opérations à forte intensité de lecture                         |
| `secrets.ts`            | `key_value` (entrées chiffrées)                                | Stockage chiffré des secrets                                                              |
| `stateReset.ts`         | —                                                              | Effacement/réinitialisation de l’état de la base de données pour les tests                |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Contexte de session pour le transfert entre agents                                        |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Suivi de l’utilisation                                                                    |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Configuration de la compression                                                           |

### Limites des modules

Une règle architecturale fondamentale : **les modules n’accèdent pas directement aux tables des autres modules**. Pour utiliser les données d’un autre module, importez la fonction depuis ce module.

```ts
// ❌ INCORRECT : requête SQL directe sur la table d’un autre module
db.prepare("SELECT * FROM provider_connections").all();

// ✅ CORRECT : utiliser la fonction du module providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Cette règle est appliquée lors de la revue de code — il n’existe aucun contrôle statique, mais les violations sont signalées.

---

## Schéma de base (17 tables)

`core.ts` définit les 17 tables de base dans `SCHEMA_SQL`. Celles-ci sont créées par la migration `001_initial_schema.sql` et constituent le schéma principal.

### Tables principales (créées lors de la migration initiale)

| Table                      | Objectif                                       | Colonnes clés                                                           |
| -------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Identifiants des fournisseurs (chiffrés)       | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informations de routage des nœuds fournisseurs | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Stockage clé-valeur générique                  | `namespace`, `key`, `value`                                             |
| `combos`                   | Définitions des combinaisons de routage        | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Clés API pour la passerelle                    | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Métadonnées de la base de données              | `key`, `value`                                                          |
| `usage_history`            | Enregistrements d’utilisation des requêtes     | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Charges utiles et réponses des requêtes        | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Journaux des requêtes du proxy                 | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Chaînes modèle-fournisseur                     | `model`, `chain`                                                        |
| `domain_budgets`           | Budgets de dépenses par domaine                | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historique des réinitialisations de budget     | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Suivi des coûts par domaine                    | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | État de limitation du débit du domaine         | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | État du disjoncteur par domaine                | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache des réponses du LLM                      | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Instantanés historiques des quotas             | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tables supplémentaires (ajoutées par des migrations ultérieures)

Les migrations suivantes ajoutent notamment des tables telles que :

- `cli_tool_state` (migration 011) — état de l’outil CLI
- Tables `mcp_*` — audit du serveur MCP
- Tables `a2a_*` — état des tâches A2A
- Tables `usage_*` — suivi de l’utilisation
- Tables `plugin_*` — système de plugins
- `skill_executions` — historique d’exécution des compétences
- Tables `memory_*` — système de mémoire
- Tables `compression_*` — système de compression
- Tables `webhook_*` — journal de livraison des webhooks
- Tables `acp_*` — protocole client-agent
- Tables `oneproxy_*` — place de marché 1proxy
- `proxy_assignments` — liaisons des portées du proxy
- `detailed_call_artifacts` — métadonnées des artefacts du journal d’appels
- `quota_alert_history` — audit des alertes de quota
- `command_code_auth_sessions` — sessions OAuth de Command Code

La liste complète des quelque 30 tables et plus se trouve dans `src/lib/db/migrations/`.

---

## Migrations

OmniRoute utilise** migrations versionnées et idempotentes** en `src/lib/db/migrations/`. Chaque migration est un seul fichier SQL. Deux formats de dénomination coexistent ; la version enregistrée dans `_omniroute_migrations` est le préfixe numérique.

### Dénomination des migrations

| Format                                              | Exemple                              | Utilisé pour                                                                                                                                                                 |
| --------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (exactement 3 chiffres)       | `241_seen_models.sql`                | L'ancienne série `001`–`241`. Gelé à l'arrivée du format d'horodatage (`240` et `241` ont été fusionnés juste avant) : aucun nouveau fichier ne reçoit de numéro séquentiel. |
| `YYYYMMDDHHMMSS_description.sql` (14 chiffres, UTC) | `20261113120000_add_usage_index.sql` | Chaque migration créée à partir du 2026-11-13.                                                                                                                               |

Pourquoi ce changement : avec les nombres séquentiels, PRs parallèles sélectionnaient le même numéro suivant et tous sauf un devaient renuméroter avant de fusionner. Un horodatage UTC donne à chaque PR sa propre version.

Règles pour le format d'horodatage (appliquées par `npm run check:migration-numbering`, partagées avec le générateur dans `scripts/check/lib/migrationNaming.mjs`) :

- L'horodatage est une date et une heure UTC réelles, pas plus tôt que `20261113000000` et pas plus de 10 minutes dans le futur.
- La description est `snake_case` minuscule commençant par une lettre (`a-z`, `0-9`, un seul `_` entre les mots), d'un maximum de 80 caractères.
- Deux fichiers avec le même horodatage constituent un doublon.
- La règle de non-espacement s'applique uniquement aux anciennes séries : chaque nombre de `001` à `241` doit exister, à l'exception des espaces connus `026`, `055` et `121`. La suppression de `241` (ou de tout ancien fichier) fait échouer la porte. `001` et `241` ne peuvent jamais être ajoutés à la liste autorisée `KNOWN_GAPS`. Les fichiers horodatés ne créent jamais d’espace.
- Chaque entrée dans `src/lib/db/migrations/` doit être un fichier normal avec un nom `.sql` minuscule valide. Un répertoire, un lien symbolique, un fichier `.SQL` ou `.sql.bak`, un fichier caché ou un nom avec un espace échoue à la porte, car le coureur l'ignorerait silencieusement ou planterait au démarrage.

**Appliquer la commande.** Le coureur trie par la valeur numérique du préfixe, pas par texte : les anciens fichiers `001`–`241` d'abord, puis les fichiers horodatés dans l'ordre d'horodatage, puis tous les répertoires avec espace de noms enregistrés avec `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (versions telles que `ee-001`). Une migration en attente est tout fichier dont la version n'est pas dans `_omniroute_migrations`, donc une migration à partir d'une ancienne branche qui fusionne après une plus récente s'applique toujours aux bases de données existantes.

**L'horodatage correspond à l'ordre de création et non à l'ordre de fusion.** Si votre migration dépend d'une table ou d'une colonne créée par une migration avec un** plus récent** horodatage (par exemple, celui d'un autre PR qui a fusionné en premier), une nouvelle base de données exécuterait la vôtre en premier et échouerait. Pendant que votre PR est toujours ouvert, régénérez le nom du fichier avec `npm run db:new-migration` afin qu'il obtienne un horodatage plus récent, ou rendez-le indépendant. `npm run test:migrations:fresh` applique chaque migration à une base de données vide et l'attrape.

### Une migration fusionnée n'est jamais supprimée ni renommée

Une fois qu'un fichier de migration se trouve sur une branche de version ou `main`, il a déjà été exécuté sur les bases de données homologues et de développement, sur les installations VPS et dans la synchronisation Enterprise. Dès lors :

- **Ne le supprimez jamais.** Les nouvelles installations perdraient leur schéma tandis que les bases de données mises à niveau le conserveraient.
- **Ne le renommez jamais.** La version dans `_omniroute_migrations` ne correspondrait plus à un fichier, donc chaque base de données qui l'appliquait déjà l'exécuterait à nouveau. SQL non idempotent duplique ensuite les données ou arrête le démarrage.
- **Besoin d'un schéma différent ?** Créez une nouvelle migration avec `npm run db:new-migration`.

Renommer n'est sûr que pour un fichier qui n'a pas encore été fusionné, ce à quoi font référence les indications de la porte. Une balise de version ne change rien ici : chaque poussée vers une branche `release/v*` publie l'image Docker `:next` et s'exécute sur l'homologue, les installations VPS et la synchronisation Enterprise, de sorte qu'une migration fusionnée s'est exécutée sur de vraies bases de données avant qu'une balise `vX.Y.Z` n'existe. La porte échoue à chaque suppression d'un fichier de base, balisé ou non.

- **Annulation d'une migration fusionnée.** Un `git revert` qui supprime le fichier échoue à la porte. Conservez le fichier et annulez son schéma dans une nouvelle migration : `npm run db:new-migration -- <description>`, avec `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` et ainsi de suite. Les bases de données mises à niveau et fraîches se terminent alors par le même schéma.
- **Le seul renom accepté : une entrée de compatibilité et un contenu identique.** Si un fichier fusionné doit être déplacé (par exemple, deux fichiers fusionnés partagent un horodatage et le runner s'arrête avec une collision de version), renommez le dernier sans toucher à son SQL et ajoutez `{ fromVersion, fromName, toVersion, toName }` à `RENAMED_MIGRATION_COMPATIBILITY` dans `src/lib/db/migrationRunner/constants.ts`. Les bases de données qui appliquaient l'ancienne version voient leur ligne `_omniroute_migrations` déplacée au lieu de réexécuter le fichier. La porte avertit d'un tel changement de nom et exécute toujours la vérification de commutation, quel que soit le nouvel horodatage : les nouvelles installations appliquent le fichier à sa nouvelle position, les bases de données mises à niveau ne le font pas, alors choisissez un nouvel horodatage proche de l'ancien. La porte échoue au changement de nom si le contenu a changé (un changement de schéma est toujours effectué dans une nouvelle migration) ou si le fichier cible de l'entrée n'est pas sur le disque.
- **Ne renommez jamais dans le même horodatage.** Un changement de nom qui conserve l'horodatage et modifie uniquement la description échoue à la porte, avec ou sans entrée. Avec une entrée dont `toVersion` est égal à son `fromVersion`, le coureur supprime l'ancienne ligne `_omniroute_migrations` et applique à nouveau le fichier sur chaque base de données qui l'a déjà exécuté. Sans entrée, le runner ne suit que la version : il ignore le fichier dans ces bases de données (le nouveau contenu n'y est jamais exécuté) et enregistre une erreur de renumérotation à chaque démarrage. Utilisez un autre horodatage plus une entrée de compatibilité, ou conservez le nom.
- **La porte vérifie que le fichier renommé ne s'exécute pas à nouveau.** Pour chaque changement de nom couvert, la porte transmet le nouveau nom de fichier au contrôle de commutation avec `--must-not-apply`. La vérification démarre la base de données mise à niveau avec le véritable exécuteur, et si l'exécuteur applique à nouveau ce fichier (par exemple, parce que l'entrée a une version ou un nom incorrect, ou parce que l'analyseur de texte de la porte lit `constants.ts` différemment de TypeScript), la porte échoue avec `migration renomeada rodaria de novo` et vous demande de vérifier les anciennes et nouvelles versions et noms de l'entrée.

### Ce que la porte vérifie par rapport à la base

Lors des exécutions de requêtes d'extraction et de file d'attente de fusion, `npm run check:migration-numbering` compare `src/lib/db/migrations/` sur le disque avec le même répertoire sur la branche de base. La base est, dans cet ordre : `--base-latest-tag`, `--base <ref>`, la variable `MIGRATION_BASE_REF` ou, lorsque `GITHUB_EVENT_NAME` est `pull_request`, `pull_request_target` ou `merge_group`, le premier parent de la validation de fusion, le `merge_group.base_sha` de la charge utile de l'événement, ou `git merge-base HEAD origin/$GITHUB_BASE_REF`. Dans une demande d'extraction ou une exécution de file d'attente de fusion sans base résoluble, la porte échoue. En dehors CI sans `--base`, il imprime `comparação com a base: pulada (sem --base)` et ignore ces règles.

`--base-latest-tag` se compare à la balise de version la plus récente (`vX.Y.Z` dans l'ordre semver ; les balises suffixées telles que les nocturnes ne comptent pas) qui se trouve dans l'histoire de `HEAD`, avec les mêmes règles que `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) exécute la porte de cette façon, car les exécutions push et planifiées n'ont pas de base de demande d'extraction et une fusion peut atterrir sans une nouvelle exécution CI. Sans balise de version dans l'historique, la porte échoue ; exécutez `git fetch --tags` (dans CI, `actions/checkout` avec `fetch-depth: 0` apporte les balises).

| Modification sur la pull request                                                                                        | Résultat                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Un fichier qui existe sur la base est renommé, avec une entrée `RENAMED_MIGRATION_COMPATIBILITY`                        | **Avertissement** si le contenu est identique, et que le contrôle de commutation s'exécute quel que soit le nouvel horodatage ; il échoue si la nouvelle position modifie le schéma final (annulez le changement de nom ou choisissez un autre nouvel horodatage là où il fait la navette) ou si le coureur applique à nouveau le fichier renommé sur une base de données mise à niveau.** Échec** si le contenu change. |
| Un fichier qui existe sur la base est renommé en gardant son horodatage (seule la description change)                   | **Échec** , avec ou sans entrée : le coureur l'appliquerait à nouveau (avec l'entrée) ou l'ignorerait par version (sans une). Utilisez un autre horodatage plus une entrée de compatibilité, ou conservez le nom.                                                                                                                                                                                                        |
| Un fichier existant sur la base est supprimé ou renommé sans entrée                                                     | **Échec** , que le fichier soit ou non dans une balise de version. Pour l'annuler, restaurez le fichier avec `git checkout <base> -- src/lib/db/migrations/<file>`; pour rétablir son schéma, ajoutez une nouvelle migration avec `DROP ... IF EXISTS`.                                                                                                                                                                  |
| Un fichier qui existe sur la base a un contenu différent                                                                | **Avertissement** (une annotation `::warning` dans GitHub Actions) et la vérification de commutation s'exécute. Cela échoue si la modification modifie le schéma final, car les bases de données mises à niveau n'appliquent plus le fichier modifié : placez la modification dans une nouvelle migration. Une modification inoffensive (un commentaire, `IF NOT EXISTS`) ne fait qu'avertir.                            |
| Un fichier horodaté est ajouté avec un horodatage pas plus récent que le plus récent de la base                         | Exécute le contrôle de commutation, décrit ci-dessous.                                                                                                                                                                                                                                                                                                                                                                   |
| Un fichier `NNN_` ancien format est ajouté avec un numéro en dessous du fichier ancien format le plus récent de la base | **Échec** , même si `KNOWN_GAPS` est édité dans la même pull request : l'ancienne série est figée, créez la migration avec `npm run db:new-migration`. Les fichiers ancien format au-dessus du plus récent de la base (une pull request `release/v*` vers `main` ) sont acceptés.                                                                                                                                        |
| Un fichier dans le désordre, modifié ou renommé contient des instructions `INSERT`, `UPDATE`, `DELETE` ou `REPLACE`     | **Avertissement** : le contrôle de commutation ne compare pas les données, vérifiez donc si l'ordre dans lequel les bases de données mises à niveau et fraîches l'appliquent modifie le résultat.                                                                                                                                                                                                                        |

Une exécution du contrôle de commutation couvre ensemble les fichiers en panne, les fichiers modifiés et renommés.

Le contrôle de commutation (`scripts/check/migration-commutation.ts`) crée deux bases de données temporaires avec le chemin d'installation réel : un** mis à niveau** un (démarrer avec les migrations de base, puis redémarrer sur le même fichier avec les migrations de la pull request) et un** frais** un (un démarrage avec les migrations de la pull request). Il compare les schémas résultants : tables et colonnes (en ignorant l'ordre des colonnes), les contraintes UNIQUE / PRIMARY KEY et FOREIGN KEY, le texte `CREATE TABLE` normalisé de chaque table (qui couvre les contraintes CHECK, les classements, les colonnes générées et les options de table), les index, les déclencheurs et les vues. Les données des lignes ne sont pas comparées. S'ils correspondent, la porte indique que le fichier est en panne mais fait la navette et passe. S'ils diffèrent, la porte échoue avec la différence et un indice pour le cas : pour un fichier dans le désordre, régénérez son nom avec `npm run db:new-migration`, ce qui est sûr car le fichier n'est pas encore fusionné ; pour un fichier de base modifié, restaurer le contenu de base et placer la modification dans une nouvelle migration ; pour un fichier renommé, annulez le changement de nom ou choisissez un autre nouvel horodatage là où il fait la navette, jamais le même horodatage avec un autre nom. Si la vérification elle-même ne peut pas s'exécuter, la porte échoue dans CI et n'avertit que localement. Pour un fichier de base modifié, la base de données mise à niveau est construite avec le contenu de base de ce fichier, et le deuxième démarrage l'ignore car sa version est déjà enregistrée. Pour un fichier renommé, la base de données mise à niveau est construite avec le fichier sous son ancien nom, et le deuxième démarrage déplace sa ligne `_omniroute_migrations` via l'entrée de compatibilité au lieu de l'exécuter à nouveau ; la porte transmet le nouveau nom avec `--must-not-apply`, donc la vérification échoue si le deuxième démarrage l'applique. Si une migration de demande d'extraction ne parvient pas à s'appliquer sur le chemin mis à niveau, c'est-à-dire après chaque migration de base (qu'elle échoue également ou non lors d'une nouvelle installation), la porte signale `migration do PR não aplica` et vous demande de corriger le SQL par rapport au schéma actuel de la base ; si le fichier dépend d'une autre migration de demande d'extraction avec un horodatage ultérieur, régénérez son nom avec `npm run db:new-migration`.

Pour exécuter la même comparaison localement, transmettez explicitement la base, par exemple `npm run check:migration-numbering -- --base origin/<base-branch>` ou `npm run check:migration-numbering -- --base-latest-tag` pour comparer avec la dernière version.

### Conversion d'une migration `NNN` d'un PR ouvert

Une pull request ouverte avant le commutateur peut toujours contenir un fichier séquentiel tel que `242_add_widgets.sql`. Les anciens nombres au-dessus de `241` sont rejetés, alors convertissez-les avant de fusionner :

1. **Renommez le fichier avec le générateur en conservant la description.** Exécutez `npm run db:new-migration -- <same description>` pour obtenir le nouveau nom, déplacez-y le SQL et supprimez l'ancien fichier `NNN_`. La description doit rester identique : l'entrée de compatibilité ci-dessous y correspond.
2. **Ajoutez une entrée de compatibilité si une base de données persistante exécutait l'ancien numéro.** Si une base de données conservée (homologue, un VPS, la propre installation d'un contributeur) a exécuté une construction du PR avec le fichier `NNN_`, ajoutez `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` à `RENAMED_MIGRATION_COMPATIBILITY` dans `src/lib/db/migrationRunner/constants.ts`. C'est** requis pour `237` à `241`** : ces emplacements contiennent désormais les fichiers canoniques `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` et `241_seen_models.sql`, et sans l'entrée, une telle base de données ignore définitivement la migration canonique et exécute à nouveau la migration convertie. Cela fonctionne également pour un emplacement qui reste vide, comme `242`, lorsque la destination est un horodatage. En cas de doute, ajoutez l'entrée. L'endroit où vous l'ajoutez dans le tableau n'a pas d'importance : lorsque l'emplacement cible d'une entrée contient toujours une ligne qu'une autre entrée éloigne (par exemple `237` tenant une ligne PR pendant qu'une ligne `usage_history_calculated_cost` plus ancienne attend de se déplacer dans `237`), le coureur laisse cette entrée attendre que l'emplacement soit libre. Seul un conflit réel, tel qu'un emplacement détenu par une ligne sans mouvement d'entrée, ou deux entrées qui échangent des emplacements, arrête le démarrage avec `Cannot reconcile ...`.
3. **Gardez le SQL idempotent** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), car la migration convertie peut rencontrer une base de données où son schéma existe déjà.
4. **Déplacez les cas spéciaux liés à la version.** Si le PR a ajouté une casse pour son ancien numéro dans `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) ou dans `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), remplacez la clé par le nouvel horodatage.

`tests/unit/db/codex-fence-migration-rename.test.ts` est un exemple fonctionnel de test pour une migration renommée.

### Rétroportages vers les branches avant le changement

Ne sélectionnez jamais et ne rétroportez jamais un fichier `YYYYMMDDHHMMSS_` vers une branche antérieure au commutateur (par exemple une ancienne branche `release/v*` ). Le coureur y trie les noms de fichiers sous forme de texte, donc un fichier horodaté s'exécuterait entre `201_` et `202_` sur une nouvelle base de données, et l'ancienne porte ne comprend pas les préfixes à 14 chiffres. Sur une telle branche, écrivez la modification en tant que fichier `NNN_` suivant de cette branche, idempotent, donc ce n'est pas une opération lorsque la version horodatée arrive plus tard.

### Comment fonctionnent les migrations

Au démarrage, `migrationRunner.ts`:

1. Crée une table `_omniroute_migrations` si elle n'existe pas
2. Requêtes pour les migrations déjà appliquées
3. Applique toutes les nouvelles migrations dans l'ordre, chacune dans une transaction
4. Enregistre chaque migration appliquée avec horodatage

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotence

Les migrations doivent être** idempotent** — les exécuter deux fois devrait être un échec :

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Utilisez généreusement les clauses `IF NOT EXISTS`, `IF EXISTS` et `OR IGNORE` / `OR REPLACE`.

### Ajouter une nouvelle migration

1. **Créez le fichier avec le générateur** : `npm run db:new-migration -- <description>` (par exemple `npm run db:new-migration -- add combo priority`). Il écrit `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` avec l'heure UTC actuelle et un en-tête de commentaire, avance d'une seconde si cet horodatage est pris et n'écrase jamais un fichier. Ne choisissez pas un numéro à la main.
2. **Utilisez DDL en toute sécurité** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Remplissez soigneusement les données** : utilisez `UPDATE ... WHERE ...` pour gérer les lignes existantes
4. **Vérifier l'ordre et le nom** : `npm run test:migrations:fresh` (toutes les migrations sur une base de données vide) et `npm run check:migration-numbering`. Le hook de pré-commit husky exécute `check:migration-numbering` seul lorsque la validation prépare un fichier sous `src/lib/db/migrations/`, donc un nom trié sur le volet ou mal formé (par exemple `242_x.sql`) échoue à la validation localement avec le même message CI imprime. Le hook vérifie uniquement les noms, les doublons et les séries `001`–`241` gelées ; la comparaison avec la base PR (migrations supprimées, renommées ou dans le désordre) fonctionne toujours en CI
5. **Test sur copie** : n'exécutez jamais de migrations non testées en production
6. **Une table créée à partir de code nécessite également une migration** : si un module crée également la table paresseusement (`CREATE TABLE IF NOT EXISTS`, conservé comme chemin d'auto-réparation), une migration doit la créer avec le même DDL. Sinon, une nouvelle installation et une installation mise à niveau se retrouvent avec des schémas différents, selon que ce chemin de code a été exécuté ou non. `tests/unit/db/lazy-table-migration-guard.test.ts` analyse `src/` et `open-sse/` et échoue sur un `CREATE` paresseux sans migration (#20557). Exemple : `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Exemple:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Modifications rétrocompatibles** (par exemple, supprimer des colonnes) sont délicats. OmniRoute prend NOT il en charge la rétrogradation — une fois qu'une migration est appliquée, le changement de schéma est permanent. Planifiez en conséquence.

---

## Chiffrement des données au repos

Les champs sensibles (clés d’API, jetons OAuth, chaînes de connexion) sont chiffrés au repos à l’aide d’**AES-256-GCM**.

### Fonctionnement

```ts
// src/lib/db/encryption.ts (version simplifiée)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Emplacements concernés

- `provider_connections.api_key` — chiffré au niveau de l’application
- `provider_connections.access_token`, `refresh_token`, `id_token` — chiffrés au niveau de l’application
- Entrées `key_value` avec `namespace = "secrets"` — chiffrées au niveau de l’application
- `proxy_registry.auth` — chiffré au niveau de l’application (le cas échéant)

### Clé de chiffrement

La clé de chiffrement est dérivée d’une **phrase secrète** (définie via la variable d’environnement `STORAGE_ENCRYPTION_KEY`) et d’un **sel** (stocké dans la base de données). Les deux sont nécessaires pour déchiffrer les données.

```bash
# Générer une phrase secrète sécurisée
openssl rand -hex 32

# Définir dans .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Critique** : perdre la clé de chiffrement signifie perdre l’accès à toutes les données chiffrées. **Sauvegardez la clé séparément de la base de données**.

### Données NON chiffrées

Pour des raisons de performances, les éléments suivants sont stockés en texte brut :

- Noms d’affichage des fournisseurs
- Définitions des modèles (déjà publiques)
- Règles de routage
- Données d’utilisation (aucune donnée à caractère personnel)

---

## Points d’attention concernant le chiffrement (v3.8.16+)

OmniRoute utilise **`migrateLegacyEncryptedString()`** pour gérer de manière transparente deux mécanismes de chiffrement :

- **Ancien** (avant v3.5.0) : « chiffrement » basé sur XOR (il ne s’agit pas d’un véritable chiffrement)
- **Actuel** : AES-256-GCM avec un vecteur d’initialisation et une balise d’authentification appropriés

L’utilitaire de migration détecte l’ancien format et rechiffre les données avec le nouveau mécanisme lors de la première lecture. Cela signifie que vous pouvez mettre à niveau une ancienne base de données sans perdre les identifiants.

---

## Cache de lecture

Pour les données fréquemment consultées (modèles, fournisseurs, paramètres), `readCache.ts` fournit un **cache en mémoire** :

```ts
// Mis en cache au démarrage, invalidé lors d’une écriture
const providers = await getCachedProviders(); // Rapide, en mémoire
const fresh = await listProviders(); // Lent, interroge la BDD
```

| Entité mise en cache   | Clé de cache   | Durée de vie         |
| ---------------------- | -------------- | -------------------- |
| `models`               | `models:v1`    | Jusqu’à une écriture |
| `provider_connections` | `providers:v1` | Jusqu’à une écriture |
| `settings`             | `settings:v1`  | Jusqu’à une écriture |
| `combos`               | `combos:v1`    | Jusqu’à une écriture |

Le cache est invalidé à chaque écriture dans la table correspondante.

---

## Sauvegarde et récupération

### Sauvegarde manuelle

```bash
# Utiliser la CLI pour créer une sauvegarde locale
omniroute backup create --name pre-migration

# Ou via l’API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Le fichier de sauvegarde comprend :

- Toutes les tables de la BDD (sérialisées au format JSON)
- Les artefacts des journaux d’appels (encodés en base64, facultatifs)
- Les paramètres et secrets (chiffrés)
- La configuration des plugins

### Restauration

```bash
# Via la CLI
omniroute restore pre-migration

# Via l’API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Avertissement** : la restauration écrase l’intégralité de la BDD. Arrêtez d’abord tous les clients.

### Sauvegardes automatisées

```bash
# Activer les sauvegardes quotidiennes automatisées via la CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

La planification est exécutée côté serveur par une tâche en arrière-plan qui s’active toutes les 30 secondes
(par défaut) et évalue l’expression cron par rapport à l’heure locale du serveur.

| Variable                                    | Valeur par défaut | Description                                                                                                                           |
| ------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`           | Intervalle d’activation en ms (minimum : `5000`). Il doit être inférieur à 60 s pour correspondre de manière fiable à la minute cron. |

### Sauvegarde à chaud de SQLite

Pour effectuer une sauvegarde sans interruption d’une BDD active :

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Cette commande utilise l’API de sauvegarde en ligne de SQLite — elle peut être exécutée en toute sécurité pendant qu’OmniRoute fonctionne.

---

## Optimisation des performances

### Mode WAL

WAL est activé par défaut. Pour les charges de travail à écriture élevée, pensez à :

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute ne définit pas `journal_size_limit`. Un point de contrôle déplace les images WAL dans le fichier principal, mais le fichier WAL conserve sa plus grande taille allouée. Le garde `OMNIROUTE_WAL_GUARD_MAX_MB` avertit et exécute uniquement `wal_checkpoint(RESTART)`; ce n'est pas un plafond de la taille d'un disque.

### Index

Index clés de performance (créés automatiquement par les migrations) :

- Recherches de modèles `idx_models_provider` — par fournisseur
- Extension de cible combinée `idx_combo_targets_combo_id` —
- analyse d'utilisation de — `idx_usage_history_api_key_timestamp`
- suivi des quotas `idx_quota_snapshots_api_key_window` —
- `idx_call_logs_timestamp` — requêtes du journal des appels

Pour ajouter un nouvel index, créez une migration :

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O mappé en mémoire

Pour les très grandes bases de données (> 10 Go), le mappage de la mémoire peut être ajusté via SQLite pragma :

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Compactage

Les instances OmniRoute de longue durée bénéficient de `VACUUM` occasionnels :

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Exécutez-le mensuellement pendant les fenêtres à faible trafic. (le mode WAL réduit le besoin, mais ne l'élimine pas.)

---

## Vérification de l’état

`src/lib/db/healthCheck.ts` fournit des **diagnostics d’état au niveau de la base de données** :

Les deux verbes nécessitent une authentification (`401` dans le cas contraire). `GET` effectue uniquement le diagnostic ; `POST` exécute la
même vérification avec `autoRepair` activé.

```bash
GET  /api/db/health   # diagnostiquer
POST /api/db/health   # diagnostiquer + réparer
```

La réponse correspond au `DbHealthCheckResult` produit par `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`) :

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Les budgets de domaine faisaient référence à des clés d’API qui n’existent plus.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Champ             | Signification                                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` lorsque `issues` est vide. `driver` n’a jamais d’incidence sur cette valeur.                                                                                                                   |
| `issues[].type`   | L’une des valeurs suivantes : `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                        |
| `repairedCount`   | Nombre de lignes réparées lors de cette exécution ; toujours égal à `0` lorsque `autoRepair` vaut false.                                                                                              |
| `backupCreated`   | Indique si une sauvegarde a été effectuée avant la réparation.                                                                                                                                        |
| `checkedAt`       | Horodatage ISO commun à l’exécution et à toute note de réparation qu’elle écrit.                                                                                                                      |
| `driver.name`     | Pilote SQLite utilisé pour la base de données vérifiée.                                                                                                                                               |
| `driver.degraded` | `true` lorsque les écritures ne sont pas sauvegardées durablement dans le fichier de base de données — solution de repli WASM `sql.js` (persistance du fichier entier) ou base de données en mémoire. |

La même charge utile est renvoyée par l’outil MCP `omniroute_db_health_check`.

Exécutez `PRAGMA integrity_check` pour détecter toute corruption :

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Devrait afficher : ok
```

Si la commande renvoie autre chose que `ok`, **cessez immédiatement d’utiliser la base de données** et restaurez-la à partir d’une sauvegarde.

---

## Reprise après sinistre

### Scénario 1 : Fichier WAL perdu

Le fichier `-wal` est manquant, mais le fichier `-shm` et la base de données principale sont intacts :

```bash
# Récupération automatique à la prochaine ouverture
omniroute
```

Si SQLite ne parvient pas à effectuer la récupération automatiquement :

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scénario 2 : Fichier principal de la base de données corrompu

Restaurez à partir d’une sauvegarde :

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` télécharge uniquement une archive `.tar.gz` complète depuis un serveur en cours d’exécution
(`GET /api/db-backups/exportAll`, identifiants d’opérateur requis) ; cette commande ne restaure rien.

### Scénario 3 : Clé de chiffrement perdue

**Aucune récupération n’est possible** sans la clé. Les champs chiffrés sont illisibles. Ajoutez à nouveau tous les fournisseurs manuellement avec de nouveaux identifiants.

> **Mesure préventive** : Sauvegardez toujours la clé de chiffrement séparément, idéalement dans un gestionnaire de mots de passe ou un KMS.

### Scénario 4 : Disque plein

SQLite renverra des erreurs `SQLITE_FULL`. Libérez de l’espace disque, puis exécutez :

```bash
# Créer un point de contrôle du WAL afin de libérer de l’espace
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Opérations courantes

### Inspecter une table

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Compter les lignes de toutes les tables

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Réinitialiser (effacer) toutes les données

```bash
# Arrêter d'abord OmniRoute
omniroute stop

# Supprimer le fichier de la base de données
rm ~/.omniroute/storage.sqlite*

# Redémarrer (une base de données vide sera recréée)
omniroute
```

Pour une réinitialisation **sélective** (conserver les fournisseurs, effacer les données d'utilisation) :

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Exporter une seule table

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Dépannage

### « La base de données est verrouillée »

Un autre processus détient un verrou en écriture. Vous pouvez :

- Attendre que l'autre processus se termine (vérifiez avec `lsof | grep storage.sqlite`)
- Arrêter l'autre processus
- Si le problème persiste, redémarrer OmniRoute

### « Échec de la contrainte de clé étrangère »

Un module de domaine enfreint l'intégrité référentielle. Vérifiez :

- Les lignes orphelines dans les tables dépendantes
- Les suppressions en cascade qui ne se sont pas propagées
- Une migration récente ayant modifié une clé étrangère

Exécutez `PRAGMA foreign_key_check;` pour trouver les violations.

### « Mémoire insuffisante »

Les E/S mappées en mémoire de SQLite dépassent la limite du système d'exploitation. Réduisez leur taille à l'aide d'un pragma SQLite :

```sql
PRAGMA mmap_size = 134217728;  -- 128 Mo au lieu de 256 Mo
```

Ou désactivez-les :

```sql
PRAGMA mmap_size = 0;
```

### « Échec de la migration en cours d'exécution »

La migration a été exécutée dans une transaction ; elle devrait donc avoir été annulée. Si ce n'est pas le cas :

1. **Arrêtez OmniRoute** (pour empêcher de nouvelles tentatives)
2. **Vérifiez l'état de la base de données** avec `sqlite3`
3. **Corrigez manuellement** la migration partielle
4. **Relancez** OmniRoute (la migration sera retentée)

Pour éviter ce problème, testez toujours d'abord les migrations sur une copie.

---

## Voir aussi

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tables d'utilisation
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — surveillance de l'état
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — processus de publication
- Source : `src/lib/db/` (plus de 80 fichiers, environ 25 000 lignes de code)
