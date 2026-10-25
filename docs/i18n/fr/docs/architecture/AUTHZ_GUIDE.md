# Authorization Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Source de vérité :** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Dernière mise à jour :** 2026-09-22 — les espaces de noms de portée pointent vers MCP-SERVER.md

OmniRoute dispose d'un pipeline d'autorisation sensible aux routes qui filtre chaque requête API. La classification est **déterministe** et **fermée par défaut** — tout ce qui ne peut pas être classifié est considéré comme `MANAGEMENT` et exige une session ou un jeton de niveau gestion. Cette page explique le modèle aux ingénieurs qui maintiennent des routes ou conçoivent de nouveaux points de terminaison.

![Pipeline d'autorisation (3 classes de routes + évaluation des politiques)](../diagrams/exported/authz-pipeline.svg)

> Source : [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Deux modes d'authentification

### 1. Clé d'API (Bearer)

Utilisée pour les API client compatibles OpenAI, Anthropic et Gemini, ainsi que pour quelques routes de gestion lorsque la clé possède la portée `manage`.

```
Authorization: Bearer <api-key>
```

Validée par `isValidApiKey()` / `extractApiKey()` dans `src/sse/services/auth.ts` et réexportée via `src/shared/utils/apiAuth.ts`. Le validateur accepte également les variables d'environnement `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` comme clés de transit persistantes (issue #1350).

### 2. Session du tableau de bord (cookie auth_token)

Pour les pages du tableau de bord et les opérations d'administration.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Un cookie n'est une session que lorsque le JWT est vérifié **et** contient `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Chaque consommateur du cookie (le garde de routes du tableau de bord (`isDashboardSessionAuthenticated()`), le rafraîchissement du pipeline d'autorisation, la poignée de main WebSocket, le serveur en direct, `/api/settings/require-login`, `/api/auth/status`) passe par cet helper. D'autres JWT signés avec `JWT_SECRET` existent (le passthrough de la Cursor CLI émet des jetons `iss "omniroute" / aud "cursor-cli"` pour les détenteurs de clés), mais ne sont jamais des sessions (#13298).

Vérifié par `isDashboardSessionAuthenticated()` dans `src/shared/utils/apiAuth.ts`. Le pipeline rafraîchit automatiquement le JWT lorsqu'il lui reste moins de 7 jours sur sa durée de vie de 30 jours.

Une session peut aussi prendre fin avant ses 30 jours : chaque émetteur passe par `mintDashboardSessionToken` (avec une date d'émission `iat` et un identifiant `jti`), et le vérificateur contrôle deux réglages : `sessionsValidAfter`, défini par un changement de mot de passe afin que toute session émise avant cesse d'être valide (le navigateur qui a changé le mot de passe reçoit un nouveau cookie), et `revokedDashboardSessions`, auquel `POST /api/auth/logout` ajoute le `jti` de la session fermée. Les sessions émises par une version antérieure ne portent aucune de ces revendications et restent valides jusqu'au premier changement de mot de passe. Si les réglages ne peuvent pas être lus, la session n'est pas considérée comme fiable.

Certaines routes de gestion acceptent **l'un ou l'autre** mode : le cookie OU `Bearer <key>` lorsque la clé d'API possède la portée `manage` (ou `admin`). C'est ce qui permet le flux « configurable via des appels d'API » ajouté dans la v3.8.

#### Connexion OIDC optionnelle (#6973)

La connexion administrateur du tableau de bord prend aussi en charge un flux OIDC (OpenID Connect) **optionnel**, en complément de la connexion par mot de passe par défaut. La connexion par mot de passe n'est jamais supprimée, elle est seulement complétée :

- Désactivée sauf si `settings.oidcEnabled === true` **et** que `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` sont tous configurés (Paramètres → Auth).
  `GET /api/auth/oidc/login` renvoie `400` dans le cas contraire.
- `GET /api/auth/oidc/login` découvre l'`authorization_endpoint` à partir de
  `/.well-known/openid-configuration` de l'émetteur (repli : `<issuer>/authorize`), construit
  l'URI de redirection à partir de la requête entrante (en tenant compte de `x-forwarded-proto`)
  et redirige vers l'IdP avec un `state` aléatoire stocké dans un cookie `oidc_state` en
  `httpOnly`.
- `GET /api/auth/oidc/callback` valide `state`, échange le code d'autorisation et vérifie la
  signature du jeton ID via le JWKS de l'émetteur (`createRemoteJWKSet` de `jose`, mis en cache
  par URI de JWKS) avec des contrôles de `issuer`/`audience`. La liste d'autorisation
  `oidcAllowedSubjects` est obligatoire : elle correspond à la revendication `sub` du jeton ou à
  sa revendication `email`. La revendication d'e-mail n'est prise en compte que lorsque
  `email_verified === true`, si bien qu'un e-mail non vérifié chez l'IdP ne peut jamais passer la
  barrière. Sans entrée, le callback refuse toute connexion (`not_configured`).
- En cas de succès, il émet **exactement le même** JWT `auth_token` de 30 jours que la connexion
  par mot de passe (`src/app/api/auth/login/route.ts`), de sorte que le reste du pipeline de
  session du tableau de bord (rafraîchissement automatique, indicateurs du cookie) reste
  inchangé. OIDC ne remplace que la manière dont le cookie est obtenu, pas ce qu'il accorde.
- Tous les réglages `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`,
  `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`)
  figurent dans `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`) :
  `PATCH /api/settings` répond `400 PASSWORD_REQUIRED` à moins que le corps ne contienne le mot
  de passe de gestion sous la forme `currentPassword` (`401 PASSWORD_MISMATCH` s'il est erroné).
  `oidcDisablePasswordLogin` interdit la _connexion_ par mot de passe (`POST /api/auth/login`) mais
  conserve le hachage du mot de passe, et la réauthentification continue de vérifier
  `currentPassword` par rapport à lui.
- `corsOrigins` et `bruteForceProtection` figurent aussi dans `SECURITY_IMPACTING_SETTINGS_KEYS` :
  assouplir l'un des deux affaiblit les défenses de connexion. Ils exigent donc la même
  réauthentification par `currentPassword` (l'onglet Sécurité la demande), et l'import JSON
  les ignore.
- Chaque clé de politique de sécurité (les entrées de `SECURITY_IMPACTING_SETTINGS_KEYS`, chaque
  clé `oidc*` et l'état de session du tableau de bord) est **réservée à l'opérateur** sur
  `PATCH /api/settings` : une clé d'API de portée `manage` ou un jeton d'accès `oma_` reçoit `403`
  même lorsqu'il envoie le bon `currentPassword`, et le refus est audité comme
  `settings.update_failed` avec `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` dans
  `src/lib/api/operatorCredential.ts`). Les réglages ordinaires (thème, préférences d'affichage)
  restent modifiables avec une clé `manage` ou un jeton d'accès `admin`. Toute modification de
  `/api/settings` lui-même (et de `/api/settings/require-login`) exige en outre la portée de jeton
  d'accès `admin` (`ADMIN_MUTATION_EXACT_PATHS` dans `src/server/authz/accessScopes.ts`, correspondance
  exacte du chemin). `GET` reste `read`, et les autres sous-routes `/api/settings/*` (proxys,
  valeurs par défaut des combos, alias de modèles, compression, purges…) conservent la portée
  `write` déduite de la méthode.
- `POST /api/settings/import-json` ne demande pas cette réauthentification ; il supprime donc, avant
  l'écriture, chaque clé de `IMPORT_STRIPPED_SETTINGS_KEYS` (même fichier) : le mot de passe et
  `currentPassword`, chaque entrée de `SECURITY_IMPACTING_SETTINGS_KEYS`, et l'état de session du
  tableau de bord (`sessionsValidAfter`, `revokedDashboardSessions`). Importer une ancienne
  sauvegarde ne peut donc pas ressusciter une session qu'un changement de mot de passe ou une
  déconnexion a déjà terminée.

## Classes de routes

`src/server/authz/types.ts` définit trois classes ; toute route qui ne peut pas être classée de façon déterministe revient à `MANAGEMENT`.

| Classe       | Description                                                                                                                                                                      | Authentification requise                                                                |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `PUBLIC`     | Routes explicitement sûres : connexion, déconnexion, statut, initialisation, vérification de l'état et amorçage de l'onboarding.                                                 | Aucune                                                                                  |
| `CLIENT_API` | Points de terminaison de service des modèles : `/api/v1/*`, `/api/v1beta/*`, ainsi que les alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Clé Bearer lorsque l'indicateur de fonctionnalité `REQUIRE_API_KEY` effectif est activé |
| `MANAGEMENT` | Pages du tableau de bord, paramètres, fournisseurs, clés, points de terminaison d'administration et de diagnostic.                                                               | Session du tableau de bord OU Bearer avec la portée `manage`                            |

Quelques actions de `MANAGEMENT` sont **réservées à l'opérateur** : une clé `manage` ne suffit pas. L'export des identifiants stockés (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), la restauration d'une sauvegarde par-dessus les données en service (`POST /api/db-backups/import`, y compris avec `dryRun=true`, `POST /api/db-backups` avec restauration par identifiant, `POST /api/settings/import-json`), et la suppression des points de restauration (nettoyage par `DELETE /api/db-backups` et `PATCH /api/db-backups`, car la rétention qu'il enregistre pilote l'élagage automatique après chaque sauvegarde) exigent une session du tableau de bord, l'identité de la CLI locale, ou une connexion désactivée. L'émission d'un jeton de synchronisation (`POST /api/sync/tokens`) et la création d'un jeton d'accès CLI de portée `admin` (`POST /api/cli/tokens`) exigent, quel que soit le mode de connexion, une session du tableau de bord ou l'identité de la CLI locale. Les clés d'API de toute portée et les jetons d'accès `oma_` ne sont pas des identifiants opérateur : ils reçoivent `403` chaque fois que l'un de ces identifiants est requis. La vérification se trouve dans `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). La modification des réglages de connexion est également réservée à l'opérateur : `POST /api/settings/require-login` (définir le mot de passe de gestion / activer ou désactiver `requireLogin`) n'accepte ces identifiants qu'une fois un mot de passe existant ; la fenêtre d'amorçage de la première exécution (pas encore de mot de passe) reste inchangée. Une session du tableau de bord doit envoyer `currentPassword` pour remplacer le mot de passe (`403` s'il est absent ou erroné, audité comme `settings.update_failed`). La CLI locale et une instance à connexion désactivée conservent le chemin de récupération et peuvent définir un mot de passe sans cette étape, car tous deux sont liés à l'hôte qui possède le répertoire de données.

## Pipeline

```
Requête entrante → src/proxy.ts
  → runAuthzPipeline() dans src/server/authz/pipeline.ts
    1. Supprimer les en-têtes internes approuvés (x-omniroute-auth-*, x-omniroute-route-class)
    2. Générer l’identifiant de requête, classifier la route via classifyRoute()
    3. Si pathname == "/" → rediriger vers /dashboard
    4. Si un arrêt progressif est en cours et que la route est /api/* → 503
    5. Si la méthode n’est pas GET et que la route est /api/* → appliquer la protection checkBodySize()
    6. Si OPTIONS → pré-vérification CORS 204
    7. Si options.enforce == false → transmettre avec les en-têtes de classe de route
    8. Sinon : POLICIES[routeClass].evaluate(ctx)
       - autoriser → ajouter x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - rejeter   → erreur JSON avec correlation_id (pages du tableau de bord → 302 /login)
```

Les en-têtes internes approuvés (définis dans `src/server/authz/headers.ts`) sont **supprimés des requêtes entrantes** avant la classification — les clients ne peuvent pas préremplir `x-omniroute-auth-*` pour usurper l’identité d’un sujet.

### Contrats des politiques

Chaque classe de route possède une politique dans `src/server/authz/policies/` :

- **`publicPolicy`** (`policies/public.ts`) — renvoie toujours `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrait le jeton Bearer et le valide via `validateApiKey()`. N’autorise l’accès anonyme que lorsque l’indicateur de fonctionnalité effectif `REQUIRE_API_KEY` est désactivé. L’indicateur effectif est résolu par `isRequireApiKeyEnabled()` (`remplacement par l’indicateur de fonctionnalité de la base de données > process.env.REQUIRE_API_KEY > valeur par défaut`), afin que les indicateurs de fonctionnalité du tableau de bord et les variables d’environnement régissent de manière cohérente `/api/v1/*`, `/api/v1beta/*` et leurs alias ; les échecs du résolveur entraînent un refus par défaut. Autorise les requêtes disposant d’une session du tableau de bord sur les routes de l’API cliente (y compris `/api/v1/models`, utilisée par le catalogue de modèles du tableau de bord).
- **`managementPolicy`** (`policies/management.ts`) — accepte une session du tableau de bord, les requêtes internes de synchronisation des modèles (correspondant à `/api/providers/[name]/(sync-models|models)`), ou ignore entièrement l’authentification si `isAuthRequired()` renvoie false. Renvoie 403 (`AUTH_001`) lorsqu’un jeton Bearer est présent mais invalide, et 401 dans les autres cas. Applique également les niveaux de protection des routes (LOCAL_ONLY / ALWAYS_PROTECTED) avant toute branche d’authentification — consultez [Niveaux de protection des routes](../security/ROUTE_GUARD_TIERS.md). Les chemins LOCAL_ONLY figurant dans `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (actuellement : `/api/mcp/`) peuvent être accessibles depuis une adresse hors boucle locale lorsque la clé Bearer possède la portée `manage` ; tous les autres chemins LOCAL_ONLY restent strictement limités à la boucle locale, quelle que soit la portée.

Une politique réussie renvoie `AuthSubject` avec `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Les gestionnaires en aval peuvent le lire via `assertAuth(request, "CLIENT_API")` dans `src/server/authz/assertAuth.ts` au lieu de réexécuter la logique d’authentification.

## Liste des routes publiques

`src/shared/constants/publicApiRoutes.ts` constitue la liste d’autorisation explicite :

La liste est divisée selon la **forme** des routes, et cette séparation est critique (GHSA-74g9-q8f6-793h) : un préfixe est comparé avec `startsWith()`, il correspond donc également à tous les chemins adjacents qui partagent ses premiers caractères.
Utilisé comme préfixe, `/api/usage/om-usage` rendait `/api/usage/om-usage<anything>` PUBLIC, et Next résout cela vers `/api/usage/[connectionId]` — un gestionnaire ne disposant d’aucune authentification propre.

```ts
// Véritables sous-arborescences. Chaque entrée DOIT se terminer par « / » (vérifié par un test unitaire).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // traité comme CLIENT_API dans classify, et non comme public « sans authentification »
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Routes individuelles, comparées EXACTEMENT (avec ou sans barre oblique finale).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Routes individuelles en lecture seule qui bénéficient également de l’assouplissement de l’origine CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Route individuelle en lecture seule SANS l’assouplissement CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Les routes en lecture seule ne sont publiques **que** pour les méthodes sûres. Remarque : `classifyRoute()` exclut `/api/v1/*` et `/api/v1beta/*` du cas par défaut PUBLIC — celles-ci sont toujours classées `CLIENT_API`, afin que la politique de clé Bearer continue de s’appliquer.

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

## Bascule « authentification requise »

`isAuthRequired()` dans `src/shared/utils/apiAuth.ts` décide si **une quelconque** authentification est imposée à une requête :

- `settings.requireLogin === false` → l'authentification est désactivée globalement, à l'exception du niveau toujours protégé (voir [Niveaux du Route Guard](../security/ROUTE_GUARD_TIERS.md)) et des appels qui délivrent un identifiant accepté par celui-ci. Ces appels exigent le même identifiant qu'avec la connexion activée : émettre des jetons de synchronisation, créer des jetons d'accès CLI de n'importe quelle portée, créer une clé d'API de portée `manage`/`admin`, accorder cette portée à une clé, ou régénérer ou révéler une telle clé (`requireCredentialForManagementScopedKey()` dans `src/lib/api/requireManagementAuth.ts`). Les clés réservées à l'inférence restent ouvertes.
- Aucun mot de passe configuré **et** aucune variable d'environnement `INITIAL_PASSWORD` → le mode d'amorçage autorise l'assistant d'onboarding et les requêtes loopback, mais les requêtes réseau exposées exigent toujours des identifiants.
- Toute erreur de base de données → échec fermé (sécurisé par défaut).

L'application des clés d'API client utilise `isRequireApiKeyEnabled()` dans `src/shared/utils/featureFlags.ts`, et non une lecture directe de `process.env.REQUIRE_API_KEY`. Cela compte pour les instances déployées : activer ou désactiver `REQUIRE_API_KEY` dans Dashboard → Feature Flags enregistre une surcharge en base et affecte immédiatement `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` et les autres vérifications d'authentification de l'API client qui partagent ce helper. Si le magasin des feature flags ne peut pas être lu, l'authentification de l'API client échoue en mode fermé et exige une clé.

## Changement incompatible — v3.8.0

Les points de terminaison `/api/v1/agents/tasks/*` et `/api/resilience/model-cooldowns` **nécessitent désormais une authentification de gestion** (commit `588a0333`). Les clients qui envoyaient auparavant une clé d’API normale sans la portée `manage` reçoivent une réponse `403`. Migration : attribuez la portée `manage` à la clé dans le tableau de bord API Keys, ou utilisez une session de tableau de bord authentifiée.

## Changement de comportement — v3.8.2

`/api/mcp/*` (le serveur MCP distant) reste LOCAL_ONLY par défaut, mais accepte désormais les requêtes ne provenant pas de la boucle locale lorsque l’en-tête `Authorization: Bearer <api-key>` comporte la portée `manage`. Cette exception est explicitement contrôlée pour chaque chemin via `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` dans `src/server/authz/routeGuard.ts` ; le préfixe LOCAL_ONLY apparenté `/api/cli-tools/runtime/*` ne peut intentionnellement PAS être contourné, car il peut lancer des sous-processus arbitraires. Les requêtes anonymes vers `/api/mcp/*` ne provenant pas de la boucle locale continuent de renvoyer `403 LOCAL_ONLY` — le comportement par défaut de tout nouveau chemin LOCAL_ONLY reste limité strictement à la boucle locale. Voir [Niveaux de protection des routes](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Tests

- Tests unitaires : `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Liste d’autorisation publique : `tests/unit/public-api-routes.test.ts`.
- Exécution ciblée : `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Débogage

Le pipeline ajoute toujours les en-têtes suivants aux réponses :

```
x-request-id:               <identifiant de corrélation, repris dans les corps d’erreur>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Pour les requêtes authentifiées, les en-têtes de requête en amont (côté gestionnaire) incluent également :

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<4 derniers caractères> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (facultatif)
x-omniroute-auth-scopes:    liste séparée par des virgules
```

Utilisez `assertAuth(req, expectedClass)` dans les gestionnaires — cette fonction lève une `AuthzAssertionError` avec le code `AUTHZ_NOT_INITIALIZED` si le middleware a été contourné (utile pour détecter les régressions de configuration dans les tests).

## Voir aussi

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — marqueur d'authentification par point d'accès
- [COMPLIANCE.md](../security/COMPLIANCE.md) — journal d'audit pour les événements d'authentification
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — trois espaces de noms de portée et catalogue de portée d'outil MCP
- Source : `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
