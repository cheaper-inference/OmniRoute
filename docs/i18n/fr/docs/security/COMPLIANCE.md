# Compliance & Audit (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Source de vérité :** `src/lib/compliance/`, `src/app/api/compliance/`

OmniRoute enregistre les actions administratives, les événements d'authentification, les modifications du cycle de vie des informations d'identification du fournisseur et les invocations de l'outil MCP dans les tables d'audit basées sur SQLite. Cette page couvre ce qui est enregistré, où il se trouve, combien de temps il est conservé, comment les clés API peuvent se désinscrire et comment interroger les données.

L'implémentation réside dans `src/lib/compliance/index.ts` (T-43 — "Compliance Controls") et `src/lib/compliance/providerAudit.ts`. Les écritures d'audit ne sont jamais lancées : en cas d'échec, l'appel est avalé silencieusement afin que la journalisation d'audit ne puisse pas interrompre le flux de requêtes principal.

## Ce qui est journalisé

### Événements d’audit administratifs (`audit_log`)

Chaque appel à `logAuditEvent({ action, actor, target, details, ... })` produit
une ligne. Les chaînes d’action suivent un modèle `domain.verb` (ou
`domain.verb.outcome`). Les types d’action confirmés dans l’arborescence
incluent :

| Action                               | Source                                   |
| ------------------------------------ | ---------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`        |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`        |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`        |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`        |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`        |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`        |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`       |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`         |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`    |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`    |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`         |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`       |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts`  |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`            |
| `api_key.auth.touch`                 | `src/server/authz/policies/clientApi.ts` |

Chaque entrée capture `action`, `actor` (par défaut `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id` et `timestamp`. Les clés sensibles (`apiKey`, `accessToken`,
`refreshToken`, `password`, tout ce qui correspond à `*token`/`*secret`/`*apikey`,
etc.) sont récursivement masquées par `"[redacted]"` avant l’écriture de la
ligne.

Les lignes `api_key.auth.touch` enregistrent les métadonnées des clés API et
les lectures de découverte réussies (GET/HEAD) qui n’atteignent jamais le
journal des requêtes : quelle clé, à quel moment et le chemin normalisé, avec
regroupement et plafonnement à 1 000 lignes. Les clés avec `noLog` ainsi que la
clé d’environnement sont ignorées. L’adresse IP et l’agent utilisateur de
l’appelant sont ajoutés uniquement lorsque l’indicateur de fonctionnalité
`API_KEY_AUDIT_CLIENT_DETAILS_ENABLED` est activé (désactivé par défaut).

### Appels d’outils MCP (`mcp_tool_audit`)

Chaque invocation d’un outil MCP écrit une ligne via
`open-sse/mcp-server/audit.ts`. Schéma (issu de
`src/lib/db/migrations/002_mcp_a2a_tables.sql`) :

| Colonne          | Remarques                                        |
| ---------------- | ------------------------------------------------ |
| `id`             | auto-incrémentation                              |
| `tool_name`      | identifiant de l’outil MCP                       |
| `input_hash`     | sha256 de l’entrée (aucune charge utile stockée) |
| `output_summary` | résumé court et tronqué                          |
| `duration_ms`    | temps écoulé                                     |
| `api_key_id`     | appelant (nullable)                              |
| `success`        | `1` / `0`                                        |
| `error_code`     | code d’erreur final en cas d’échec               |
| `created_at`     | horodatage ISO                                   |

### Journaux des requêtes / de l’utilisation

Il s’agit de données de télémétrie opérationnelle (et non strictement d’un
audit administratif), mais elles partagent le même pipeline de conservation :

- `usage_history` — synthèse de l’utilisation par requête
- `call_logs` — journal complet par requête (soumis à une limite de lignes, voir ci-dessous)
- `proxy_logs` — journal du trafic du proxy (soumis à une limite de lignes)
- `request_detail_logs` — ancien journal détaillé des requêtes (toujours purgé s’il est présent)

## Schéma de stockage

`audit_log` est créée à la demande par `ensureAuditLogSchema()` lors de la première utilisation :

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

Des index sont créés sur `timestamp`, `action`, `actor`, `resource_type`,
`status` et `request_id`. Les colonnes manquantes dans les anciennes bases de données sont ajoutées via
`ALTER TABLE` à la demande.

## Conservation et nettoyage

Deux périodes de conservation distinctes sont appliquées :

| Variable d'environnement    | Valeur par défaut | S'applique à                                                      |
| --------------------------- | ----------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`               | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`               | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`          | Réduction au nombre maximal de lignes pour `call_logs`            |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`          | Réduction au nombre maximal de lignes pour `proxy_logs`           |

`cleanupExpiredLogs()` exécute le processus de conservation. Elle est appelée au démarrage du serveur
depuis `src/instrumentation-node.ts`. Chaque exécution journalise un
événement d'audit `compliance.cleanup` avec le nombre de suppressions par table. La réduction des journaux
de proxy et d'appels est effectuée par lots (`BATCH_SIZE = 5000`) afin d'éviter les verrouillages prolongés en écriture.

Le nettoyage manuel de l'historique des requêtes est distinct de la conservation. La page des journaux de requêtes
appelle `POST /api/settings/purge-request-history`, qui supprime `call_logs`,
l'ancienne table `request_detail_logs` et les artefacts locaux des requêtes sous
`${DATA_DIR}/call_logs/`.

Les valeurs par défaut sont définies dans `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Désactivation de `noLog` (par clé API )

Les clés API peuvent être signalées afin que leur trafic d'appels en aval ne soit pas enregistré. L'indicateur réside sur la table `api_keys` (`no_log INTEGER DEFAULT 0`) et est reflété dans un ensemble en mémoire pour les recherches hot-path.

```bash
# Create a no-log key (management auth required)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Aides (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — bascule l'entrée en mémoire
- `isNoLog(apiKeyId)` — vérifié sur le chemin de la requête ; revient à une lecture en cache de 30 s depuis `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (env, séparé par des virgules) — préchargé dans l'ensemble en mémoire au démarrage ; utile lorsque vous ne pouvez pas basculer directement la colonne

Les événements d'audit administratif (connexion, changements de fournisseur, appels à l'outil MCP, etc.) sont** pas** affecté par `noLog` — seule la journalisation du trafic par demande est désactivée.

### Désinscription par demande (`x-omniroute-no-log`)

Un client peut désactiver la persistance d’une seule demande d’inférence sans créer de clé dédiée. Envoyez `x-omniroute-no-log: true` sur la demande (`1` et `yes` sont également acceptés, insensibles à la casse). Il s'applique à chaque itinéraire de famille de discussion qui passe par le gestionnaire de discussion : achèvements de chat, réponses, messages, achèvements et chemin compatible Gemini. La ligne du journal des appels est toujours écrite avec son horodatage, son modèle, son fournisseur, son statut, sa durée et le nombre de jetons, mais `request_body`, `response_body`, les résumés de requêtes et les artefacts de pipeline sont omis.

L'en-tête est ORed avec l'indicateur de clé : une clé sans journal reste sans journal quel que soit l'en-tête, et l'en-tête ne peut pas réactiver la journalisation pour une clé sans journal. L'en-tête est supprimé avant que la demande ne soit transmise en amont.

Cet en-tête fait** pas** désactivez l’extraction de mémoire ou le cache sémantique. Envoyez `x-omniroute-no-memory: true` et `x-omniroute-no-cache: true` à côté lorsque la requête ne doit pas non plus conserver le contenu dans ces sous-systèmes.

## API REST

| Point de terminaison        | Méthode | Description                                                     | Authentification |
| --------------------------- | ------- | --------------------------------------------------------------- | ---------------- |
| `/api/compliance/audit-log` | `GET`   | Entrées paginées du journal d’audit administrateur avec filtres | management       |
| `/api/mcp/audit`            | `GET`   | Entrées paginées du journal d’audit des outils MCP              | (open-sse)       |
| `/api/mcp/audit/stats`      | `GET`   | Statistiques agrégées de l’audit MCP                            | (open-sse)       |

Aucun point de terminaison d’exportation CSV n’est actuellement fourni — effectuez l’exportation depuis le tableau de bord ou interrogez directement
la base de données SQLite.

### Interrogation de `/api/compliance/audit-log`

Paramètres de requête pris en charge (tous facultatifs ; les filtres textuels
utilisent tous la correspondance `LIKE %value%`) :

- `action`, `actor`, `target`, `resourceType` (ou `resource_type`),
  `status`, `requestId` (ou `request_id`)
- `from` / `since`, `to` / `until` — horodatages ISO
- `limit` (`50` par défaut, minimum `1`, maximum `500`)
- `offset` (`0` par défaut, maximum `10_000`)

La réponse est un tableau JSON. Les métadonnées de pagination sont renvoyées dans les en-têtes :
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Tableau de bord

Le tableau de bord expose les données d’audit à l’adresse **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). La page comporte deux onglets :

- **Conformité** (`ComplianceTab.tsx`) — événements d’audit administrateur provenant de
  `/api/compliance/audit-log`. Filtrage par type d’événement, niveau de gravité (information / avertissement
  / critique, dérivé de l’action et du statut) et plage de dates. Le niveau de gravité est
  calculé côté client à partir des chaînes d’action et de statut.
- **MCP** (`McpAuditTab.tsx`) — audit des outils MCP provenant de `/api/mcp/audit`, avec
  des filtres par nom d’outil et par réussite/échec.

Les deux onglets utilisent une pagination avec des tailles de page de `50` (conformité) et de `25` (MCP).

## Utilitaires d’audit des identifiants de fournisseur

`src/lib/compliance/providerAudit.ts` fournit des utilitaires de mise en forme utilisés par les
routes de gestion des fournisseurs lorsqu’elles émettent des événements relatifs aux identifiants :

- `summarizeProviderConnectionForAudit(connection)` — supprime `apiKey`,
  `accessToken`, `refreshToken`, `idToken` et
  `providerSpecificData.consoleApiKey` avant que l’instantané de connexion ne soit
  écrit dans `details`.
- `getProviderAuditTarget(connection)` — compose une chaîne stable
  `"<provider>:<name|id>"` pour le champ `target`.
- `extractProviderWarnings(...payloads)` — analyse les réponses du fournisseur à la recherche
  d’avertissements de politique/sécurité (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) et
  remonte jusqu’à 5 occurrences, chacune étant tronquée à 400 caractères.

## Bonnes pratiques

- Marquez avec `noLog: true` les clés d’API traitant des données personnelles identifiables (juridiques, médicales, etc.).
- Ajustez `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` afin de respecter votre
  politique de conservation. Les valeurs par défaut de 7 jours sont prudentes.
- Exportez la table d’audit hors de la plateforme (`sqlite3 dump`) selon la fréquence
  requise par votre programme de conformité — aucun mécanisme d’archivage intégré n’existe.
- Suivez le nombre d’événements `auth.login.failed` et `auth.login.locked` afin de détecter
  les attaques par force brute.
- Lors de l’ajout de nouveaux points de terminaison administrateur, appelez `logAuditEvent({ ... })` avec une chaîne d’action stable
  `domain.verb.outcome` et transmettez le contexte de la requête via
  `getAuditRequestContext(request)` afin que l’adresse IP et le `requestId` soient capturés
  automatiquement.

## Voir aussi

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — masquage des données personnelles, injection de prompt
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — catalogue des outils MCP et portées
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — référence complète des variables d’environnement
- Source : `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
