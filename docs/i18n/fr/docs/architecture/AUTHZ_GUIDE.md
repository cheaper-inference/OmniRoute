# Authorization Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Source de vérité :** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Dernière mise à jour :** 2026-09-22 — les espaces de noms de portée pointent vers MCP-SERVER.md

OmniRoute dispose d'un pipeline d'autorisation sensible aux routes qui filtre chaque requête API. La classification est **déterministe** et **fermée par défaut** — tout ce qui ne peut pas être classifié est considéré comme `MANAGEMENT` et exige une session ou un jeton de niveau gestion. Cette page explique le modèle aux ingénieurs qui maintiennent des routes ou conçoivent de nouveaux points de terminaison.

![Pipeline d'autorisation (3 classes de routes + évaluation des politiques)](../diagrams/exported/authz-pipeline.svg)

> Source : [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Deux modes d’authentification

### 1. Clé API (Bearer)

Utilisé pour les API clientes compatibles avec OpenAI/Anthropic/Gemini et pour quelques routes de gestion lorsque la clé possède la portée `manage`.

```
Authorization: Bearer <api-key>
```

Validé par `isValidApiKey()` / `extractApiKey()` dans `src/sse/services/auth.ts` et réexporté via `src/shared/utils/apiAuth.ts`. Le validateur accepte également les variables d’environnement `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` comme clés de relais persistantes (issue #1350).

### 2. Session du tableau de bord (cookie auth_token)

Pour les pages du tableau de bord et les opérations d’administration.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Un cookie constitue une session uniquement lorsque le JWT est vérifié **et** contient `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Chaque
consommateur du cookie (garde de route du tableau de bord (`isDashboardSessionAuthenticated()`), actualisation du pipeline d’autorisation, négociation WebSocket, serveur live,
`/api/settings/require-login`, `/api/auth/status`) passe par cet utilitaire.
D’autres JWT signés avec `JWT_SECRET` existent — le relais de la CLI Cursor émet des jetons
`iss "omniroute" / aud "cursor-cli"` pour les détenteurs de clés — et ne sont jamais des sessions
(#13298).

Vérifié par `isDashboardSessionAuthenticated()` dans `src/shared/utils/apiAuth.ts`. Le pipeline actualise automatiquement le JWT lorsqu’il lui reste moins de 7 jours sur sa durée de vie de 30 jours.

Une session peut également prendre fin avant l’expiration de ses 30 jours, car chaque émetteur passe par `mintDashboardSessionToken` (un instant d’émission `iat` et un identifiant `jti`) et le vérificateur contrôle deux paramètres : `sessionsValidAfter`, défini lors d’un changement de mot de passe afin que toute session émise avant ce changement cesse d’être vérifiée (le navigateur ayant effectué le changement de mot de passe reçoit un nouveau cookie), et `revokedDashboardSessions`, auquel `POST /api/auth/logout` ajoute le `jti` de la session déconnectée. Les sessions émises par une version antérieure ne contiennent aucun de ces attributs et restent valides jusqu’au premier changement de mot de passe. Si les paramètres ne peuvent pas être lus, la session n’est pas approuvée.

Certaines routes de gestion acceptent **l’un ou l’autre** mode : cookie ou `Bearer <key>` lorsque la clé API possède la portée `manage` (ou `admin`). C’est ce qui permet le flux de travail « configurable via des appels API » ajouté dans la version v3.8.

#### Portail de connexion OIDC facultatif (#6973)

La connexion d’administration du tableau de bord prend également en charge un flux OIDC (OpenID Connect) **activable par l’utilisateur**, en complément de la connexion par mot de passe par défaut — la connexion par mot de passe n’est jamais supprimée, elle est seulement
complétée :

- Désactivé sauf si `settings.oidcEnabled === true` **et** si
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` sont tous configurés (Settings → Auth).
  `GET /api/auth/oidc/login` renvoie `400` dans le cas contraire.
- `GET /api/auth/oidc/login` découvre `authorization_endpoint` depuis le
  `/.well-known/openid-configuration` de l’émetteur (avec repli sur
  `<issuer>/authorize`), construit l’URI de redirection à partir de la requête
  entrante (en tenant compte de `x-forwarded-proto`) et redirige vers l’IdP avec un
  `state` aléatoire stocké dans un cookie `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` valide `state`, échange le code d’autorisation et
  vérifie la signature du jeton ID via le JWKS de l’émetteur
  (`createRemoteJWKSet` de `jose`, mis en cache par URI JWKS), avec vérification de
  `issuer`/`audience`. L’accès au tableau de bord nécessite une liste
  `oidcAllowedSubjects` non vide, une règle `oidcAdmissionClaim`, ou les deux. La
  liste des sujets ne correspond à `sub` ou `email` que lorsque
  `email_verified === true`. La règle de revendication facultative utilise un
  chemin de revendication du jeton ID séparé par des points (par exemple,
  `realm_access.roles`) et un tableau de valeurs acceptées ; la revendication
  résolue doit être un tableau de chaînes contenant au moins une valeur acceptée.
  Si les deux règles sont configurées, elles doivent toutes deux être satisfaites.
  Les revendications manquantes ou malformées entraînent un refus par défaut et,
  sans aucune de ces règles, le callback refuse la connexion
  (`not_configured`). Les configurations existantes basées uniquement sur le sujet
  continuent de fonctionner sans modification.
- Keycloak mappe normalement les rôles du realm dans les jetons d’accès, et pas
  nécessairement dans les jetons ID. Pour exiger le rôle de realm `admin`,
  configurez un mappeur de protocole pour ce client afin d’inclure
  `realm_access.roles` dans son **jeton ID**, puis définissez
  `oidcAdmissionClaim` sur `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Vérifiez la revendication réelle du jeton ID pour ce client avant d’activer
  l’accès basé uniquement sur le rôle ; l’application ne lit pas les rôles des
  jetons d’accès. Le refus du jeton côté IdP peut compléter cette vérification,
  mais ne la remplace pas.
- En cas de succès, il émet exactement le **même** JWT `auth_token` valable 30 jours
  que celui généré par la connexion par mot de passe
  (`src/app/api/auth/login/route.ts`) ; le reste du pipeline de session du tableau
  de bord (actualisation automatique, attributs des cookies) reste donc inchangé —
  OIDC remplace uniquement la manière dont le cookie est émis, et non les droits
  qu’il accorde. Les modifications des rôles ou groupes côté IdP n’invalident pas
  les sessions OmniRoute existantes ; la déconnexion, la rotation du mot de passe
  ou l’expiration de la session déterminent toujours leur durée de vie.
- Chaque paramètre `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) figure dans
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`) : `PATCH /api/settings`
  renvoie `400 PASSWORD_REQUIRED` sauf si le corps contient le mot de passe de
  gestion sous la forme `currentPassword` (`401 PASSWORD_MISMATCH` s’il est
  incorrect). `oidcDisablePasswordLogin` refuse la connexion par mot de passe
  (`POST /api/auth/login`), mais conserve le hachage du mot de passe enregistré ;
  la réauthentification vérifie toujours `currentPassword` par rapport à celui-ci.
- `corsOrigins` et `bruteForceProtection` figurent également dans
  `SECURITY_IMPACTING_SETTINGS_KEYS` : assouplir l’un ou l’autre affaiblit les
  protections de connexion ; ils nécessitent donc la même réauthentification avec
  `currentPassword` (l’onglet Security le demande), et l’importation JSON les
  supprime.
- Chaque clé de stratégie de sécurité — les entrées de
  `SECURITY_IMPACTING_SETTINGS_KEYS`, chaque clé `oidc*` et l’état de session du
  tableau de bord — est réservée à l’opérateur pour `PATCH /api/settings` : une clé
  d’API avec portée de gestion ou un jeton d’accès `oma_` est refusé avec `403`,
  même s’il fournit le bon `currentPassword`, et le refus est audité sous la forme
  de `settings.update_failed` avec `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` dans `src/lib/api/operatorCredential.ts`).
  Les paramètres ordinaires (thème, préférences d’affichage) restent modifiables
  avec une clé `manage` ou un jeton d’accès `admin`. Toute modification de
  `/api/settings` lui-même (ainsi que de `/api/settings/require-login`) nécessite
  également la portée du jeton d’accès `admin`
  (`ADMIN_MUTATION_EXACT_PATHS` dans `src/server/authz/accessScopes.ts`,
  correspondance exacte du chemin) ; `GET` conserve la portée `read`, et les autres
  sous-routes `/api/settings/*` (proxies, valeurs par défaut combinées, alias de
  modèles, compression, purges…) conservent la portée `write` déduite de la méthode.
- `POST /api/settings/import-json` ignore cette réauthentification et supprime donc
  chaque clé de `IMPORT_STRIPPED_SETTINGS_KEYS` (dans le même fichier) avant
  l’écriture : le mot de passe et `currentPassword`, chaque entrée de
  `SECURITY_IMPACTING_SETTINGS_KEYS`, ainsi que l’état de session du tableau de
  bord (`sessionsValidAfter`, `revokedDashboardSessions`). L’importation d’une
  ancienne sauvegarde ne peut donc pas réactiver une session qu’un changement de
  mot de passe ou une déconnexion avait déjà clôturée.

#### Connexion facultative à deux facteurs TOTP (#16619)

Activée depuis Settings → Security ; désactivée jusqu’à ce que l’opérateur
l’active (`src/server/auth/dashboardMfa.ts`).

- **Ce que cela couvre :** la connexion par mot de passe (`POST /api/auth/login`, qui nécessite ensuite
  `POST /api/auth/mfa/verify`) et `omniroute connect` (`POST /api/cli/connect`,
  qui refuse un échange limité au mot de passe et utilise le code comme `totp`).
- **Ce que cela ne couvre pas :** la connexion OIDC / SSO (`/api/auth/oidc/callback`) ne
  demande pas le TOTP OmniRoute. Elle s'appuie sur le second facteur propre au fournisseur
  d'identité ; imposez donc la MFA dans l'IdP si OIDC est activé.
- **Récupération** (appareil perdu, aucun code de récupération restant ou facteur qui ne peut
  plus être vérifié, par exemple après la modification de `STORAGE_ENCRYPTION_KEY`) :
  1. Redémarrez le serveur avec `OMNIROUTE_DISABLE_MFA=true`.
  2. Sur l'hôte lui-même (pair loopback et `Host` loopback, comme
     `http://localhost:20128`), connectez-vous avec le mot de passe. Le second facteur est
     ignoré uniquement pour cette origine ; toutes les autres origines nécessitent toujours le code.
  3. Dans Paramètres → Sécurité → Désactiver, saisissez le mot de passe et laissez le code
     vide. `POST /api/auth/mfa/disable` accepte un corps sans `code` uniquement lorsque
     la variable est définie et que la requête provient de l'hôte ; il exige toujours la
     session du tableau de bord et le mot de passe actuel, et l'opération est auditée sous
     `auth.mfa.disabled` avec `secondFactor: "recovery_switch"`.
  4. Désactivez `OMNIROUTE_DISABLE_MFA`, redémarrez et réinscrivez-vous si nécessaire.

## Classes d'itinéraire

`src/server/authz/types.ts` définit trois classes ; tout itinéraire qui ne peut pas être classé de manière déterministe revient à `MANAGEMENT`.

| Classe       | Description                                                                                                                                                                       | Authentification requise                                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `PUBLIC`     | Itinéraires explicitement sécurisés pour la connexion, la déconnexion, le statut, la santé et l'amorçage d'intégration —.                                                         | Aucun                                                                                       |
| `CLIENT_API` | Points de terminaison de diffusion de modèles — `/api/v1/*`, `/api/v1beta/*`, ainsi que les alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Clé du porteur lorsque l'indicateur de fonctionnalité `REQUIRE_API_KEY` effectif est activé |
| `MANAGEMENT` | Pages du tableau de bord, paramètres, fournisseurs, clés, points de terminaison d'administration et de diagnostic.                                                                | Session de tableau de bord OR Bearer avec portée `manage`                                   |

Quelques actions `MANAGEMENT` sont** réservé à l'opérateur** : une clé `manage` ne suffit pas. L'exportation des informations d'identification stockées (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), la restauration d'une sauvegarde sur les données en direct (`POST /api/db-backups/import` incluant `dryRun=true`, `POST /api/db-backups` restauration par identifiant, `POST /api/settings/import-json`), la destruction des points de restauration (`DELETE /api/db-backups` cleanup et `PATCH /api/db-backups` car la conservation qu'il persiste entraîne l'élagage automatique après chaque sauvegarde) nécessitent une session de tableau de bord, le sujet CLI local ou une connexion désactivée. L'émission d'un jeton de synchronisation (`POST /api/sync/tokens`) et la création d'un jeton d'accès `admin` CLI (`POST /api/cli/tokens`) nécessitent une session de tableau de bord ou le sujet CLI local dans chaque mode de connexion. Les clés API de n'importe quelle portée et les jetons d'accès `oma_` ne sont pas des informations d'identification d'opérateur : ils obtiennent `403` chaque fois que cela est requis. Le chèque réside dans `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). La modification des paramètres de connexion est également réservée à l'opérateur : `POST /api/settings/require-login` (définir le mot de passe de gestion / basculer `requireLogin`) n'accepte que ces informations d'identification une fois qu'un mot de passe existe — la fenêtre d'amorçage de première exécution (pas encore de mot de passe) est inchangée — et une session de tableau de bord doit envoyer `currentPassword` pour remplacer le mot de passe (`403` lorsqu'il est manquant ou erroné, audité comme `settings.update_failed`). Le CLI local et une instance avec connexion désactivée conservent le chemin de récupération et peuvent définir un mot de passe sans celui-ci, car les deux sont liés à l'hôte propriétaire du répertoire de données.

## Pipeline

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

Les en-têtes internes de confiance (définis dans `src/server/authz/headers.ts`) sont** supprimé des demandes entrantes** avant la classification, les clients — ne peuvent pas pré-remplir `x-omniroute-auth-*` pour usurper l'identité d'un sujet.

### Contrats de politique

Chaque classe de route a une politique dans `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — renvoie toujours `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrait Bearer, valide via `validateApiKey()`. Passe à l'anonymat uniquement lorsque l'indicateur de fonctionnalité `REQUIRE_API_KEY` efficace est désactivé. L'indicateur effectif est résolu via `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), de sorte que les indicateurs de fonctionnalités du tableau de bord et les variables d'environnement régissent `/api/v1/*`, `/api/v1beta/*` et les alias de manière cohérente ; les échecs du résolveur échouent. Autorise les requêtes de session de tableau de bord sur les routes API du client (y compris `/api/v1/models`, utilisé par le catalogue de modèles de tableau de bord). Lorsque Entra ID SSO est activé, un porteur qui est structurellement un jeton Entra (trois segments base64url, `RS*` alg, `kid`) est géré par la branche SSO** avant** `validateApiKey()` et son verdict est définitif — il ne passe jamais par le chemin de la clé API ou la branche de dégradation vers anonyme, donc une panne du fournisseur d'identité ne peut pas devenir un accès ouvert. Les clés API statiques ne sont pas affectées. Voir [Entrée ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — accepte la session de tableau de bord, les demandes de synchronisation de modèle internes (correspondantes à `/api/providers/[name]/(sync-models|models)`) ou les ignore complètement si `isAuthRequired()` renvoie false. Renvoie 403 (`AUTH_001`) lorsqu'un jeton Bearer est présent mais invalide, 401 sinon. Applique également les niveaux de garde de route (LOCAL_ONLY / ALWAYS_PROTECTED) avant toute branche d'authentification — voir [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). les chemins LOCAL_ONLY dans `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (aujourd'hui : `/api/mcp/`) sont accessibles depuis le non-bouclage lorsque la clé Bearer porte la portée `manage` ; tous les autres chemins LOCAL_ONLY restent en bouclage strict, quelle que soit la portée.

Une politique réussie renvoie `AuthSubject` avec `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Les gestionnaires en aval peuvent le lire via `assertAuth(request, "CLIENT_API")` dans `src/server/authz/assertAuth.ts` au lieu de réexécuter la logique d'authentification.

## Liste des itinéraires publics

`src/shared/constants/publicApiRoutes.ts` est la liste blanche explicite :

La liste est divisée par** forme** , et la division est porteuse (GHSA-74g9-q8f6-793h) : un préfixe correspond à `startsWith()`, il correspond donc également à chaque chemin adjacent partageant ses caractères principaux. `/api/usage/om-usage` comme préfixe marqué `/api/usage/om-usage<anything>` PUBLIC, et Next résout cela en `/api/usage/[connectionId]` — un gestionnaire sans authentification propre.

```ts
// Genuine subtrees. Every entry MUST end in "/" (asserted by a unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // treated as CLIENT_API in classify, not as "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Single routes, matched EXACTLY (with or without a trailing slash).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // login step 2 for opt-in TOTP; needs the MFA-pending cookie
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Read-only single routes that also take the CORS origin relaxation.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only single route WITHOUT the CORS relaxation.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Les itinéraires en lecture seule sont publics** seulement** pour des méthodes sûres. Remarque : `classifyRoute()` exclut `/api/v1/*` et `/api/v1beta/*` du PUBLIC fall-through — ceux-ci sont toujours `CLIENT_API` donc la politique de clé du porteur s'applique toujours.

## Ajout d’une nouvelle route

### Modèle 1 — Point de terminaison public de l’API cliente (authentification Bearer)

Les routes sous `/api/v1/` et `/api/v1beta/` sont automatiquement classées `CLIENT_API`. Le middleware applique la vérification Bearer ; les gestionnaires de routes n’ont pas besoin de la répéter, mais peuvent lire le sujet si nécessaire.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logique du gestionnaire
}
```

### Modèle 2 — Point de terminaison de gestion (session ou Bearer + manage)

Utilisez `requireManagementAuth()` depuis `src/lib/api/requireManagementAuth.ts` :

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logique du gestionnaire
}
```

`requireManagementAuth()` renvoie `null` en cas de succès, ou une `Response` d’erreur JSON :

- 401 `AUTH_001` « Authentification requise » — aucun identifiant fourni
- 403 — Bearer non valide **ou** Bearer présent, mais la clé ne possède pas la portée `manage` / `admin`

`hasManageScope(scopes)` renvoie true pour `"manage"` ou `"admin"`.

### Modèle 3 — Ajout à la liste d’autorisation publique

Choisissez l’ensemble en fonction de la forme, et non par commodité. Une route individuelle doit être placée dans `PUBLIC_API_ROUTES_EXACT` (ou dans `PUBLIC_READONLY_CORS_API_ROUTES` si elle accepte uniquement GET) ; seule une véritable sous-arborescence doit être placée dans `PUBLIC_API_ROUTE_PREFIXES`, et elle **doit se terminer par `/`**. Placer une route individuelle dans la liste des préfixes publie également tous les chemins adjacents qui partagent ses premiers caractères — y compris les routes sœurs à segment dynamique ajoutées ultérieurement (GHSA-74g9-q8f6-793h). Mettez à jour les tests unitaires dans `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` et `tests/unit/authz/classify.test.ts`.

## Portées

Trois espaces de noms. Chaque vérificateur ne lit que ses propres chaînes. La comparaison côte à côte, y compris pourquoi `manage` échoue `scopeMatches` pour `read:compression` et pourquoi un jeton d'accès `read` ne peut pas `PATCH /api/keys/{id}`, se trouve dans [Trois espaces de noms de portée](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Les clés API contiennent un tableau `scopes` (stocké au format JSON dans `api_keys.scopes`, voir `src/lib/db/apiKeys.ts`).

### Portée de gestion

- `manage` / `admin` — `hasManageScope`. Accès Bearer aux routes de l'API de gestion.
- `mcp:connect`, `self:usage`, `self:account-quota`, et
  `policy:bypass-provider-quota` sont des portées additives à correspondance exacte. Elles se situent
  en dehors de `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` ouvre uniquement la
  découpe non-loopback `/api/mcp/`.

### Portées des outils MCP

Catalogue et règles de correspondance (chaîne identique, ou une portée accordée se terminant par `*`) :
[Portées des outils MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` dans `src/shared/constants/mcpScopes.ts` est le sous-ensemble typé original,
et non le catalogue complet. L'application s'exécute dans
`open-sse/mcp-server/scopeEnforcement.ts` après que `resolveCallerScopeContext()`
résolve les portées à partir des informations d'authentification MCP, des métadonnées de requête ou de `OMNIROUTE_MCP_SCOPES`.
Elle reste désactivée à moins que `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Portées des jetons d'accès

`read` / `write` / `admin` sur les jetons `oma_live_…`, classés par `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Ce classement s'applique uniquement aux identifiants
du jeton d'accès. Voir [Authentification de gestion](../guides/MANAGEMENT-AUTH.md).

## Bascule Authentification requise

`isAuthRequired()` dans `src/shared/utils/apiAuth.ts` décide si** n'importe lequel** l'authentification est appliquée pour une requête :

- L'authentification `settings.requireLogin === false` → est globalement désactivée, à l'exception du niveau toujours protégé (voir [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) ) et des appels qui distribuent un identifiant qu'il accepte, qui nécessitent le même identifiant qu'avec la connexion : émettre des jetons de synchronisation, créer des jetons d'accès CLI à n'importe quelle portée et créer une clé API avec la portée `manage`/`admin`, accorder cette portée à une clé, ou régénérer ou révéler une telle clé (`requireCredentialForManagementScopedKey()` dans `src/lib/api/requireManagementAuth.ts`). Les clés d’inférence uniquement restent ouvertes. L'écriture d'un indicateur de fonctionnalité protégé (`REQUIRE_API_KEY`, les autres indicateurs de sécurité et les indicateurs SSRF / TLS / MCP-scope / sandbox répertoriés dans [Feature Flags](../reference/FEATURE_FLAGS.md#rest-api) ) et l'enregistrement des paramètres de masquage PII (`PUT /api/settings/pii`) continuent également à nécessiter des informations d'identification.
- Aucun mot de passe configuré** et** aucun mode d'amorçage `INITIAL_PASSWORD` env var → n'autorise l'assistant d'intégration et les requêtes de bouclage, mais les requêtes réseau exposées nécessitent toujours des informations d'identification. Exception : l'écriture d'un indicateur de fonctionnalité protégé et l'enregistrement des paramètres de masquage PII (`PUT /api/settings/pii`) nécessitent des informations d'identification même à partir du bouclage, donc le bouclage en lui-même n'est pas suffisant.
- Toute erreur DB → échoue fermée (sécurisée par défaut).

L'application de la clé API du client utilise `isRequireApiKeyEnabled()` dans `src/shared/utils/featureFlags.ts`, pas une lecture directe `process.env.REQUIRE_API_KEY`. Ceci est important pour les instances déployées : l'activation `REQUIRE_API_KEY` dans les indicateurs de fonctionnalité → du tableau de bord stocke un remplacement DB et affecte immédiatement `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` et les autres vérifications d'authentification de l'API client qui partagent cette assistance. Si le magasin d'indicateurs de fonctionnalités ne peut pas être lu, l'authentification API du client échoue et nécessite une clé.

## Changement incompatible — v3.8.0

Les points de terminaison `/api/v1/agents/tasks/*` et `/api/resilience/model-cooldowns` **nécessitent désormais une authentification de gestion** (commit `588a0333`). Les clients qui envoyaient auparavant une clé d’API normale sans la portée `manage` reçoivent une réponse `403`. Migration : attribuez la portée `manage` à la clé dans le tableau de bord API Keys, ou utilisez une session de tableau de bord authentifiée.

## Changement de comportement — v3.8.2

`/api/mcp/*` (le serveur MCP distant) reste LOCAL_ONLY par défaut, mais accepte désormais les requêtes ne provenant pas de la boucle locale lorsque l’en-tête `Authorization: Bearer <api-key>` comporte la portée `manage`. Cette exception est explicitement contrôlée pour chaque chemin via `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` dans `src/server/authz/routeGuard.ts` ; le préfixe LOCAL_ONLY apparenté `/api/cli-tools/runtime/*` ne peut intentionnellement PAS être contourné, car il peut lancer des sous-processus arbitraires. Les requêtes anonymes vers `/api/mcp/*` ne provenant pas de la boucle locale continuent de renvoyer `403 LOCAL_ONLY` — le comportement par défaut de tout nouveau chemin LOCAL_ONLY reste limité strictement à la boucle locale. Voir [Niveaux de protection des routes](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Tests

- Tests unitaires : `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Liste d’autorisation publique : `tests/unit/public-api-routes.test.ts`.
- Exécution ciblée : `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Débogage

Le pipeline marque toujours les réponses avec :

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Pour les requêtes authentifiées, les en-têtes de requête en amont (côté gestionnaire) incluent également :

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Utilisez `assertAuth(req, expectedClass)` dans les gestionnaires — il lance `AuthzAssertionError` avec le code `AUTHZ_NOT_INITIALIZED` si le middleware a été contourné (utile pour détecter les régressions de configuration dans les tests).

## Voir aussi

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — marqueur d'authentification par point d'accès
- [COMPLIANCE.md](../security/COMPLIANCE.md) — journal d'audit pour les événements d'authentification
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — trois espaces de noms de portée et catalogue de portée d'outil MCP
- Source : `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
