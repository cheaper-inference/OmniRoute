# CORS Configuration & Security (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute contrôle lequel **origines du navigateur** peut lire les réponses d'origines croisées à partir d'une liste blanche unique et centralisée. Le modèle est **fermé par défaut** : aucune origine n'est autorisée jusqu'à ce que vous en choisissiez une. Cette page documente comment la liste blanche est résolue, ce que `CORS_ALLOW_ALL=true` expose réellement (et, surtout, ce qu'il fait **pas** ), comment configurer le développement par rapport à la production en toute sécurité, et l'avertissement d'exécution que le tableau de bord affiche lorsqu'un caractère générique est actif.

**Source de vérité :** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). La liste verte est appliquée une fois, dans le middleware (`src/server/authz/pipeline.ts`) les gestionnaires — par route ne définissent pas eux-mêmes `Access-Control-Allow-Origin`.

## Comment une origine est résolue

Pour chaque requête, le middleware calcule la valeur `Access-Control-Allow-Origin` dans cet ordre :

1. **`CORS_ALLOW_ALL=true`** (ou l'ancien `CORS_ORIGIN=*`) → fait écho `Origin` de l'appelant (ou `*` lorsqu'il n'y a pas d'en-tête `Origin` ), avec `Vary: Origin` pour que les caches restent corrects. Le même point d'étranglement `applyCorsHeaders()` ajoute également `Vary: Accept-Encoding` à chaque réponse 2xx-with-body sur la surface `/v1*`/`/v1beta*` authentifiée par jeton (`relaxForTokenAuth`, RFC 9110 §12.5.5, numéro #6737), afin que les caches downstream/shared puissent distinguer correctement les variantes compressées et non compressées.
2. Sinon, la demande `Origin` est normalisé (minuscules, barre oblique finale supprimée) et comparé au **liste verte fusionnée**:
   - env **`CORS_ALLOWED_ORIGINS`** Liste — séparée par des virgules, et
   - le temps d'exécution **`corsOrigins`** paramètre (Dashboard → Security → _CORS Allowed Origins_), injecté via `setRuntimeAllowedOrigins()` depuis `src/lib/config/runtimeSettings.ts`.
3. Aucune →**aucun en-tête `Access-Control-Allow-Origin` n'est émis** . Le navigateur bloque la lecture multi-origine. Il s’agit de la valeur par défaut prévue pour la fermeture en cas d’échec.

| Variable d'environnement | Signification                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS`   | CSV d'origines exactes à autoriser (recommandé).                                                 |
| `CORS_ALLOW_ALL`         | `true`/`1` → fait écho à n'importe quelle origine (caractère générique). Développeur uniquement. |
| `CORS_ORIGIN`            | Héritage. `*` se comporte comme `CORS_ALLOW_ALL`; une seule valeur est ajoutée à la liste verte. |

## Modèle de menace — ce que `CORS_ALLOW_ALL=true` expose réellement

L'avertissement générique OWASP ("wildcard CORS = n'importe quel site peut appeler votre API") mérite d'être pris au sérieux, mais l'exposition de OmniRoute est **plus étroit que le cas générique** , en raison d'un fait concret de mise en œuvre :

> **Le `applyCorsHeaders()` central n'émet jamais `Access-Control-Allow-Credentials`.** Un navigateur n'exposera pas de réponse d'origine croisée _credentialed_ (portant un cookie) à moins que le serveur n'envoie `Access-Control-Allow-Credentials: true`. Le chemin CORS partagé de OmniRoute ne le fait jamais.

Ce que cela signifie par surface, même avec `CORS_ALLOW_ALL=true`:

| Surface                                    | Mécanisme d'authentification  | Effet du caractère générique CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tableau de bord / MANAGEMENT `/api/*`      | Session de cookies            | L'origine est reprise, mais **sans `Allow-Credentials`** le navigateur **blocs** la lecture accréditée. Un site malveillant d'origine croisée **je ne peux pas lire** vos réponses authentifiées du tableau de bord et le cookie de session n'est pas exposé.                                                                                                                                                                                                                                                                                                                        |
| Client API `/v1/*`, `/v1beta/*`            | Support / en-tête `x-api-key` | Déjà permissif **par conception** (`relaxForTokenAuth`) : les navigateurs n'attachent jamais automatiquement `Authorization`/`x-api-key`, donc la page d'un attaquant ne peut pas fournir votre clé. L'écho détendu nécessite un sujet authentifié (une clé API validée ou une session de tableau de bord), pas seulement un en-tête d'informations d'identification, et n'inclut jamais `Access-Control-Allow-Credentials`. Les réponses anonymes (`REQUIRE_API_KEY=false`) utilisent la liste autorisée d'origine configurée, y compris un opt-in `CORS_ALLOW_ALL=true` explicite. |
| Public en lecture seule (`/api/health`, …) | Aucun                         | Non sensible ; le caractère générique est inoffensif.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

Donc le **résiduel** l'exposition au `CORS_ALLOW_ALL=true` est limitée à : (a) les origines croisées non accréditées **lit** de données déjà non authentifiées, et (b) laisser CORS**laissez-passer avant le vol** sur les routes de gestion — qui nécessitent toujours une authentification qu'une page d'origine croisée ne peut pas fournir. C'est **pas** un vecteur de détournement de session ou de vol d'informations d'identification sur le chemin CORS partagé.

### Une véritable exception — `/api/v1/agents/`

Les routes Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) définissent leur **propre** En-têtes CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) et **faire** émettre `Access-Control-Allow-Origin: <origin>|*` avec `Access-Control-Allow-Credentials: true`. C’est la surface unique où coexistent l’écho d’origine et les références, et c’est **indépendant de `CORS_ALLOW_ALL`** . Ces itinéraires sont authentifiés par la gestion (`requireManagementAuth`); Les opérateurs qui exposent le tableau de bord hors hôte doivent savoir qu'il s'agit du seul endroit où une lecture authentifiée d'origine croisée est autorisée par les en-têtes de réponse. Le resserrement à une liste autorisée explicite est suivi séparément de ces conseils CORS.

## Liste de contrôle de production

- **Ne mettez jamais `CORS_ALLOW_ALL=true` en production.** Laissez-le désactivé.
- Définir un **explicite** liste d'origine — soit la variable d'environnement, soit le champ de l'onglet Sécurité :

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Si OmniRoute s'exécute derrière un proxy inverse/tunnel (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS est **pas** votre seul contrôle — le garde de route de bouclage protège toujours les routes capables d'apparaître (voir [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Ne falsifiez pas `X-Forwarded-For: 127.0.0.1` pour « réparer » un 403 ; qui rouvre la classe RCE, le garde-route ferme.
- Confirmez l'état d'exécution : le tableau de bord affiche un **bannière orange persistante** sous le tableau de bord → Security → Authorization Inventory chaque fois que `CORS_ALLOW_ALL=true` est en ligne et que `/api/settings/authz-inventory` renvoie une enveloppe `cors: { allowAll, allowedOrigins }` que les outils de surveillance peuvent interroger.

## Commodité de développement — autorise des origines locales spécifiques

Vous avez rarement besoin du caractère générique, même en développement. Autorisez uniquement les serveurs de développement que vous utilisez :

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Les origines ne respectent pas la casse et la barre oblique finale est ignorée, donc `http://localhost:3000` et `http://localhost:3000/` sont équivalents. Le même CSV peut être défini au moment de l'exécution dans **Tableau de bord → Sécurité → CORS Origines autorisées** sans redémarrage.

## Clés API vs sessions de cookies

- **Bearer / `x-api-key` (la surface d'inférence `/v1/*` ) :** les navigateurs ne les attachent jamais automatiquement. CORS n'est pas une barrière significative ici. — la clé API est la barrière — c'est pourquoi cette surface est intentionnellement permissive afin que le navigateur et les clients Electron puissent lire les réponses auxquelles ils ont déjà droit. L'écho détendu nécessite un sujet authentifié (une clé API validée ou une session de tableau de bord), pas seulement un en-tête d'informations d'identification, et n'inclut jamais `Access-Control-Allow-Credentials`. Les réponses anonymes (`REQUIRE_API_KEY=false`) utilisent la liste autorisée d'origine configurée, y compris un opt-in `CORS_ALLOW_ALL=true` explicite. Les rejets d'authentification (401) restent lisibles afin que les clients puissent faire apparaître une clé révoquée ou mal saisie (#5242) : le propre 401 du pipeline conserve l'écho, et une route qui refuse la clé elle-même après que le pipeline l'a servie de manière anonyme (`/v1/models` et `/v1beta/models` avec l'authentification de gestion configurée, les routes `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` et auto-combo candidates au niveau du propriétaire) ajoute l'écho à ce 401 via `credentialRejectionHeaders()`. L'écho est saisi sur la requête portant un en-tête d'informations d'identification (`Authorization`, `x-api-key`, `x-goog-api-key` ou le cookie `auth_token` ), et non sur celui d'entre eux sur lequel la route a été vérifiée, et n'est jamais associé à `Access-Control-Allow-Credentials`; le corps est une enveloppe d’erreur fixe. Les routes de gestion sous `/api/v1/` gardées par `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) n'utilisent pas cette exception de rejet d'informations d'identification : avec `REQUIRE_API_KEY=false`, leurs réponses 401/403 suivent la politique d'origine CORS configurée.
- **Session cookie (le tableau de bord) :** protégé par le défaut de fermeture en cas de panne **et** par l'absence de `Access-Control-Allow-Credentials` sur le chemin partagé. Gardez les origines management/dashboard hors de toute configuration permissive ; ils doivent rester exactement fermés.

## Poignées de main WebSocket (`/v1/responses`, `/v1/ws`)

Les navigateurs n'appliquent pas CORS à WebSocket, donc les transports WebSocket qui renvoient la sortie d'inférence vérifient eux-mêmes la poignée de main `Origin` (`src/server/origin/wsOrigin.ts`) : les réponses WebSocket (`/v1/responses`) et, lorsque OmniRoute traverse `npm start` / `npm run dev`, le pont `/v1/ws` et `/api/v1/ws`, qui diffuse `/v1/chat/completions`, `/v1/messages` et `/v1/responses` sous forme de trames. Le pont demande le verdict à `/api/v1/ws?handshake=1` et refuse de procéder à une mise à niveau à moins que cet itinéraire n'ait été vérifié. Les exigences d’authentification s’appliquent toujours séparément. Le contrôle d'origine réussit lorsque :

- il n'a pas d'en-tête `Origin` (Codex CLI, SDKs et autres clients non navigateurs) ;
- le `Origin` est admis par la liste blanche ci-dessus (`CORS_ALLOWED_ORIGINS`, le paramètre `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`) ;
- le `Origin` est l'une des propres origines publiques de OmniRoute(la base publique configurée URL, l'origine transférée d'un proxy de confiance ou un hôte loopback/LAN direct donné sous forme de littéral IP ou `localhost` — les mêmes candidats que ceux utilisés par la vérification des mutations du tableau de bord) ; ou
- il porte une clé API valide, comme sur la surface HTTP `/v1/*`.

Tout le reste obtient `403 ws_origin_forbidden`. Un cookie de session de tableau de bord n'exempte pas un `Origin` étranger, car le navigateur l'attache au socket de n'importe quelle page. `localhost` sur un autre port n'est pas traité comme de même origine ; ajoutez de telles origines de développement à `CORS_ALLOWED_ORIGINS`.

## Exemple : proxy inverse devant OmniRoute

CORS est appliqué par OmniRoute lui-même, donc le proxy devrait généralement **pas** ajoutez ou réécrivez les en-têtes `Access-Control-*` (les doubles en-têtes cassent les navigateurs). Terminez TLS et transférez —, laissez OmniRoute répondre au contrôle en amont :

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

Définissez les origines autorisées du navigateur dans OmniRoute (`CORS_ALLOWED_ORIGINS` ou l'onglet Sécurité), pas dans le proxy.

## Fichiers sources

| Préoccupation                                             | Déposer                                                              |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| Résolution de la liste d'autorisation + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Application middleware (source unique de vérité)          | `src/server/authz/pipeline.ts`                                       |
| Paramètres d'injection d'origine du runtime →             | `src/lib/config/runtimeSettings.ts`                                  |
| Statut d'exécution du tableau de bord                     | `src/app/api/settings/authz-inventory/route.ts`                      |
| Bannière d'avertissement du tableau de bord               | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Champ Origines autorisées CORS                            | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent par route CORS (l'exception)                  | `src/lib/cloudAgent/api.ts`                                          |
| Poignée de main WebSocket vérification `Origin`           | `src/server/origin/wsOrigin.ts`                                      |

## Voir aussi

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) Application du bouclage — pour les itinéraires capables de spawn (un contrôle distinct et complémentaire).
- [Guide d'autorisation](../architecture/AUTHZ_GUIDE.md) — le pipeline d'authentification complet.
