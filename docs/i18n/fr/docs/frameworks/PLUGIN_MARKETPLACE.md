# Plugin Marketplace (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Source de vérité :** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` et
> `src/app/(dashboard)/dashboard/plugins/`
> **Dernière mise à jour :** 2026-06-28 — v3.8.40

OmniRoute fournit un système de plugins inspiré de WordPress. Les plugins sont des
répertoires autonomes — chacun comprenant un manifeste `plugin.json` et un fichier
d'entrée — qui se greffent au pipeline de requêtes (`onRequest` / `onResponse` /
`onError`) ainsi qu'aux événements du cycle de vie (`onInstall` / `onActivate` /
`onDeactivate` / `onUninstall`).

La **place de marché des plugins** constitue la couche de découverte qui complète
ce système. Elle expose un catalogue consultable de plugins disponibles à
l'installation. Par défaut, le catalogue est un petit registre initial intégré ;
un opérateur peut le faire pointer vers l'URL d'un registre distant personnalisé,
auquel cas la récupération est sécurisée par une protection SSRF avec résolution
DNS (voir [Sécurité](#security)).

Toutes les routes de plugins sont **accessibles uniquement en boucle locale**
(niveau 1 — `LOCAL_ONLY`) : les plugins chargent et exécutent du code dans des
processus enfants ; les routes sont donc inaccessibles depuis une origine autre
que la boucle locale, indépendamment de l'authentification. Consultez
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Comment ça s'adapte Together

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **Couche de registre** — `src/lib/plugins/marketplace.ts`: répertorie/recherche dans le catalogue, en revenant au registre des semences en cas d'échec.
- **Couche de cycle de vie** — `src/lib/plugins/manager.ts` (`pluginManager` singleton) : installer, mettre à niveau, activer, désactiver, désinstaller, analyser, charger au démarrage.
- **Couche manifeste** — `src/lib/plugins/manifest.ts`: schéma Zod + par défaut pour `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: découvre les plugins sur le disque sous le répertoire plugin.
- **Chargeur** — `src/lib/plugins/loader.ts`: génère chaque plugin dans un processus enfant Node.js distinct et gère les appels via IPC. L'enfant n'est pas un bac à sable (voir « Isolement de l'exécution du plugin » ci-dessous).

## Catalogue de la place de marché

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) renvoie une liste
d'objets `MarketplaceEntry` :

| Champ         | Type     | Remarques                                      |
| ------------- | -------- | ---------------------------------------------- |
| `name`        | string   | Nom du plugin en kebab-case                    |
| `version`     | string   | semver                                         |
| `description` | string   | Résumé succinct                                |
| `author`      | string   | Auteur/organisation                            |
| `license`     | string   | Identifiant de licence de type SPDX            |
| `downloadUrl` | string   | URL de téléchargement source (peut être vide)  |
| `repository`  | string?  | URL facultative du dépôt                       |
| `tags`        | string[] | Étiquettes de recherche/filtrage               |
| `downloads`   | number   | Nombre de téléchargements                      |
| `rating`      | number   | 0–5                                            |
| `verified`    | boolean  | Indique si l'entrée est marquée comme vérifiée |
| `lastUpdated` | string   | Chaîne de date au format proche d'ISO          |

Lorsqu'aucune URL de registre personnalisée n'est configurée, le catalogue
correspond au `SEED_REGISTRY` intégré (actuellement `request-logger`,
`rate-limiter`, `cost-tracker` et `theme-manager`). Le registre initial est
toujours disponible : si un registre distant configuré est inaccessible, renvoie
un statut autre que `200` ou un corps non reconnu, `listMarketplacePlugins()`
journalise un avertissement et se rabat sur la liste initiale.

> Remarque : le **catalogue** de la place de marché (navigation/recherche) est
> entièrement intégré, mais l'**installation** en un clic depuis le catalogue
> n'est pas encore implémentée — le bouton « Installer » du tableau de bord pour
> une entrée de la place de marché affiche actuellement un avis indiquant que
> cette fonctionnalité sera bientôt disponible. Pour le moment, l'installation
> s'effectue au moyen du flux d'installation depuis un chemin local
> (`POST /api/plugins`) et de la découverte sur disque (`POST /api/plugins/scan`).

## REST API

Tous les points de terminaison nécessitent une authentification de gestion (`requireManagementAuth`)** et** sont des bouclage uniquement — `/api/plugins` et `/api/plugins/` sont répertoriés dans `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Point de terminaison               | Méthode | Description                                                             |
| ---------------------------------- | ------- | ----------------------------------------------------------------------- |
| `/api/plugins`                     | GET     | Liste des plugins installés (filtre `?status=` en option)               |
| `/api/plugins`                     | POST    | Installer un plugin depuis le répertoire des sources du plugin          |
| `/api/plugins/scan`                | POST    | Scannez le répertoire des plugins et enregistrez de nouveaux plugins    |
| `/api/plugins/marketplace`         | GET     | Répertorier les entrées du catalogue Marketplace                        |
| `/api/plugins/marketplace/install` | POST    | Installer un plugin Marketplace par son nom                             |
| `/api/plugins/[name]`              | GET     | Obtenir les détails du plugin installé                                  |
| `/api/plugins/[name]`              | DELETE  | Désinstaller un plugin                                                  |
| `/api/plugins/[name]/activate`     | POST    | Activer (charger les hooks de registre + )                              |
| `/api/plugins/[name]/deactivate`   | POST    | Désactiver (fire `onDeactivate`, désenregistrer les hooks)              |
| `/api/plugins/[name]/config`       | GET     | Obtenir la configuration du plugin, le schéma de configuration +        |
| `/api/plugins/[name]/config`       | PUT     | Mettre à jour la configuration du plugin (validé par rapport au schéma) |

Le filtre `GET /api/plugins` `status` accepte l'un des `installed` / `active` / `inactive` / `error`. Une valeur non valide renvoie `400`.

### Liste des plugins installés

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installer à partir d'un chemin local

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Le `path` doit être un** absolu** chemin d'accès à un répertoire** dans le répertoire des sources du plugin** : `plugin-sources` à côté de la racine du plugin, donc `~/.omniroute/plugin-sources/` par défaut, ou `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` lorsque cette variable est définie (`getPluginSourcesDir()` dans `src/lib/plugins/installSource.ts`). Copiez ou clonez d'abord le plugin ici. L'installation est refusée avec `400` lorsque le chemin contient `..` ou un octet nul, se trouve en dehors de ce répertoire, se résout en dehors de celui-ci via un lien symbolique, contient un lien symbolique dont la cible est en dehors de lui, ou lorsque le répertoire n'existe pas. Le répertoire source doit contenir un `plugin.json` valide (ou en être le parent). En cas de succès, la réponse est `201` avec la ligne du plugin installé.

Contrairement aux autres routes de plugin, celle-ci nécessite les informations d'identification de gestion (une session de tableau de bord ou une clé API de portée de gestion) même lorsque la connexion est désactivée (`requireLogin=false`) : l'installation de code n'est jamais une action anonyme. La même chose s'applique à `POST /api/plugins/marketplace/install` (corps `{ "name": "<plugin>" }`).

### Parcourez le marché

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Mettre à jour la configuration du plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` valide le corps par rapport au `configSchema` du plugin (déclaré dans le manifeste) avec `validatePluginConfig()` de `src/lib/plugins/manifest.ts`: chaque clé doit être déclarée dans le schéma, les valeurs doivent correspondre au type déclaré, les champs `number` honorent `min`/`max` et les champs `select` doivent correspondre au `enum` déclaré. Toute violation renvoie `400` et rien n'est stocké. Un plugin qui déclare no `configSchema` n'a pas de clés configurables, donc la requête est refusée avec `400` ("Le plugin ne déclare aucune clé configurable").

## Configuration

### Répertoire des plugins

Les plugins se trouvent dans le répertoire de données d’OmniRoute :

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (ou tout autre fichier indiqué par manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) résout ce répertoire en
trois étapes :

1. **`OMNIROUTE_PLUGINS_DIR`**, lorsqu’elle est définie — utilisée telle quelle, indépendamment de la valeur de `HOME`. Il s’agit
   du paramètre explicite pour Docker/K8s, où l’arborescence des plugins est montée par liaison à un chemin
   qui n’a généralement aucun rapport avec le répertoire personnel du conteneur (#11827).
2. `<home>/.omniroute/plugins`, où `<home>` provient des variables d’environnement `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, lorsque le processus n’exporte aucun répertoire personnel.

Le répertoire résolu est journalisé une fois au démarrage sous `scanner.dir_resolved`, en indiquant
l’entrée retenue (`OMNIROUTE_PLUGINS_DIR`, `home` ou `no-home-fallback`) — ainsi, une image
qui aboutit silencieusement à l’étape 3 le signale, au lieu d’indiquer uniquement une liste de plugins vide.
`POST /api/plugins/scan` découvre tout sous-répertoire qui contient un
`plugin.json` valide et l’enregistre ; ce même répertoire est la racine dans laquelle
`pluginManager.install()` copie les plugins, de sorte qu’une substitution déplace conjointement la découverte et
l’installation.

> **`OMNIROUTE_PLUGINS_DIR` n’est pas `OMNIROUTE_PLUGIN_PATH`.** Cette dernière est lue uniquement par
> le chargeur de plugins de commande de la CLI (`bin/cli/plugins.mjs`) afin de trouver les paquets npm
> `omniroute-cmd-*` qui ajoutent des sous-commandes à `omniroute` — elle n’a aucun effet sur l’analyseur d’exécution
> décrit ici. Consultez [PLUGINS.md](./PLUGINS.md) pour cet aspect.

### URL personnalisée du registre de la marketplace

La source du catalogue de la marketplace est lue depuis le paramètre `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` lit `settings.pluginMarketplaceUrl`). Lorsqu’il
est défini sur une URL `http(s)`, `listMarketplacePlugins()` récupère cette URL et accepte
soit un tableau JSON d’entrées au niveau racine, soit un objet contenant un tableau `plugins` ;
les entrées dépourvues d’un `name` de type chaîne sont filtrées. Lorsque le paramètre n’est pas défini (ou lorsque la récupération
échoue à cause de la protection SSRF / renvoie une réponse incorrecte), le registre initial intégré est
utilisé.

L’onglet « Marketplace » du tableau de bord expose un champ pour cette URL (relue depuis
`GET /api/settings`).

> Remarque d’implémentation : l’action « Enregistrer » du tableau de bord envoie
> `pluginMarketplaceUrl` à `PATCH /api/settings`. Au moment de la rédaction, cette
> clé n’est pas déclarée dans `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`) ; vérifiez donc sa persistance dans votre
> version avant de vous y fier — le chemin de **lecture** (`getSettings()` →
> `listMarketplacePlugins()`) prend en compte la clé dès qu’elle est présente dans le magasin
> de paramètres.

## Sécurité

### Bouclage — au niveau de l'itinéraire uniquement

Les plugins exécutent du code dans les processus enfants générés, de sorte que l'intégralité de la surface `/api/plugins` est classée `LOCAL_ONLY` (niveau 1). L'application du bouclage s'exécute sans condition** avant** aucune vérification d'authentification, de sorte qu'un jeton de gestion divulgué atteignant la boîte via un tunnel ne peut toujours pas installer, activer ou désinstaller un plugin. Voir [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) et Hard Rules #15 / #17.

### Registre du marché SSRF Guard

Un registre personnalisé URL est une configuration influençable par les attaquants, donc avant de le récupérer, `listMarketplacePlugins()` l'exécute à travers deux couches :

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Rejette tout ce qui n'est pas `http:` / `https:`.
   - Rejette les hôtes private/loopback/link-local/ULA littéraux (IPv4** et** IPv6, y compris IPv4-mapped) via le canonique `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Résout** les deux** `A` et `AAAA` enregistre et rejette si** n'importe lequel** l'adresse résolue est privée — fermant le contournement de l'adresse IP privée → du nom d'hôte public.
   - **Échec fermé** : un échec de résolution DNS rejette le URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`) : réapplique la garde URL réservée au public au moment de la récupération et** bloque les redirections** (pas de pivot `30x` privé → public).

Un URL qui échoue à l'une ou l'autre couche n'abandonne pas la demande — le marché revient silencieusement au registre de départ intégré et enregistre un avertissement.

> Cette garde a été renforcée dans PR #3774 spécifiquement pour résoudre A + AAAA et utiliser le `isPrivateHost` canonique au lieu d'une vérification IPv4-only.

### Isolation de l'exécution du plugin

> **Les plugins ne sont pas mis en sandbox par défaut.** L'enfant est un processus Node.js ordinaire exécuté en tant qu'utilisateur OmniRoute, sans contexte VM ni indicateur d'autorisation Node.js, de sorte que le code du plugin peut lire et écrire n'importe quel fichier que l'utilisateur peut, exécuter des programmes et accéder au réseau. `requires.permissions` décide uniquement des variables d'environnement que l'enfant reçoit ; les autres autorisations ne sont pas appliquées. L'indicateur de fonctionnalité opt-in `PLUGIN_PERMISSION_MODEL_ENABLED` (désactivé par défaut) exécute chaque plugin sous le modèle d'autorisation Node.js construit à partir de ces autorisations, à l'exception `network`, que Node.js ne peut pas restreindre (voir [`PLUGIN_SDK.md`](./PLUGIN_SDK.md#permission-system) ). Installez uniquement les plugins auxquels vous faites confiance. La limite de processus ci-dessous contient des plantages et des blocages ; ce n'est pas une frontière de sécurité.

- **Isolement des processus** — `loadPlugin()` (`src/lib/plugins/loader.ts`) génère chaque plugin dans un processus enfant Node.js distinct et communique via IPC. Les appels Hook ont un délai d'attente avec une escalade `SIGTERM` → `SIGKILL`.
- **Liste d'autorisation d'environnement** — l'enfant ne reçoit qu'un ensemble de variables d'environnement sur liste autorisée ; l'ensemble plus large n'est accordé que lorsque le manifeste demande l'autorisation `env`.
- **Installer le confinement des sources** — `POST /api/plugins` ne lit que depuis le répertoire des sources du plugin (voir "Installer à partir d'un chemin local") : le chemin est canonique avec `realpath`, doit rester strictement dans ce répertoire, et une arborescence source portant un lien symbolique qui s'y échappe est refusée avant que quoi que ce soit ne soit copié.
- **Confinement du chemin** — install/upgrade/uninstall affirme que le répertoire du plugin et `manifest.main` résolvent** dans** la racine du plugin géré avant toute copie ou suppression récursive (protège contre les chemins DB falsifiés et la traversée `../` dans `manifest.main`). L'activation résout les liens symboliques via `realpath` et refuse de charger un point d'entrée qui échappe au répertoire du plugin.
- **Goupille d'intégrité en option** — un manifeste peut déclarer un champ `integrity` (`sha256-<base64>`, SRI format). Lorsqu'il est présent, le chargeur vérifie le hachage du fichier d'entrée au moment du chargement et refuse de s'activer en cas de non-concordance. Il s'agit d'une détection de falsification facultative,** pas** une limite de sécurité : elle ne limite pas ce qu'un plugin chargé peut faire.
- **Aucune information d'identification client dans les hooks** — le contexte transmis à `onRequest`, `onResponse` et `onError` a les en-têtes `authorization`, `x-api-key`, `proxy-authorization` et `cookie` supprimés, et l'enregistrement de clé API ne contient aucune valeur de clé (`redactPluginContext()` dans `src/lib/plugins/hooks.ts`).

## Manifeste (`plugin.json`)

Validé par `PluginManifestSchema` (`src/lib/plugins/manifest.ts`) :

| Champ              | Taper         | Remarques                                                                |
| ------------------ | ------------- | ------------------------------------------------------------------------ |
| `name`             | chaîne        | Requis; étui kebab (`^[a-z0-9-]+$`), 1 à 100 caractères                  |
| `version`          | chaîne        | Requis; semver (`MAJOR.MINOR.PATCH`)                                     |
| `description`      | chaîne?       | ≤ 500 caractères                                                         |
| `author`           | chaîne?       | ≤ 200 caractères                                                         |
| `license`          | chaîne?       | La valeur par défaut est `MIT`                                           |
| `main`             | chaîne?       | Dossier d'entrée ; par défaut, `index.js`                                |
| `source`           | énumération ? | `local` \| `marketplace` (par défaut `local`)                            |
| `tags`             | chaîne[]?     | Rechercher des balises                                                   |
| `requires`         | objet?        | `{ omniroute?, permissions[] }`                                          |
| `hooks`            | objet?        | Booléens déclarant quels hooks le plugin implémente                      |
| `skills`           | objet[]?      | Définitions de compétences facultatives                                  |
| `enabledByDefault` | booléen ?     | Activer automatiquement lors de l'installation                           |
| `configSchema`     | objet?        | Carte des champs de configuration (`string`/`number`/`boolean`/`select`) |
| `integrity`        | chaîne?       | Code PIN du fichier d'entrée `sha256-<base64>` en option                 |

Les autorisations sont tirées de l'énumération `network` / `file-read` / `file-write` / `env` / `exec`. Seul `env` a un effet d'exécution (une liste autorisée de variables d'environnement légèrement plus grande pour l'enfant) ; les autres sont des déclarations et ne sont pas appliquées.

## Flux du cycle de vie

```
installation (POST /api/plugins, chemin)
  → analyser/valider le manifeste → copier vers la zone de préproduction → vérifier que main se trouve dans le répertoire
  → renommage atomique vers ~/.omniroute/plugins/<name> → insérer une ligne en base de données
  → déclencher onInstall → si enabledByDefault : activer

activation (POST /api/plugins/{name}/activate)
  → vérifier le confinement via realpath → loadPlugin() (lancer un processus enfant)
  → enregistrer les hooks déclarés → status = "active" → déclencher onActivate

désactivation (POST /api/plugins/{name}/deactivate)
  → déclencher onDeactivate (AVANT la désinscription) → désinscrire les hooks
  → arrêter le processus enfant → status = "inactive"

désinstallation (DELETE /api/plugins/{name})
  → désactiver s'il est actif → déclencher onUninstall
  → suppression récursive, avec vérification du confinement, du répertoire du plugin → supprimer la ligne de la base de données
```

La réexécution de `install` sur un répertoire dont la version du manifeste est **strictement
plus récente** que la version installée déclenche une mise à niveau automatique (réinstallation propre ; la configuration est réinitialisée
aux valeurs par défaut). Une version identique ou antérieure est refusée.

## Base de données

Table `plugins` (migration `076_create_plugins.sql`) :

| Colonne         | Type    | Notes                                                            |
| --------------- | ------- | ---------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                             |
| `name`          | TEXT    | Unique                                                           |
| `version`       | TEXT    | semver ; valeur par défaut `1.0.0`                               |
| `description`   | TEXT    | Facultatif                                                       |
| `author`        | TEXT    | Facultatif                                                       |
| `license`       | TEXT    | Valeur par défaut `MIT`                                          |
| `main`          | TEXT    | Fichier d'entrée ; valeur par défaut `index.js`                  |
| `source`        | TEXT    | Valeur par défaut `local`                                        |
| `tags`          | TEXT    | Tableau JSON ; valeur par défaut `[]`                            |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                 |
| `enabled`       | INT     | 0/1 ; valeur par défaut 0                                        |
| `manifest`      | TEXT    | JSON complet du manifeste                                        |
| `config`        | TEXT    | JSON ; valeur par défaut `{}`                                    |
| `config_schema` | TEXT    | JSON ; valeur par défaut `{}`                                    |
| `hooks`         | TEXT    | Tableau JSON des noms de hooks déclarés ; valeur par défaut `[]` |
| `permissions`   | TEXT    | Tableau JSON ; valeur par défaut `[]`                            |
| `plugin_dir`    | TEXT    | Répertoire d'installation absolu                                 |
| `error_message` | TEXT    | Défini lorsque `status = "error"`                                |
| `installed_at`  | TEXT    | `datetime('now')`                                                |
| `updated_at`    | TEXT    | `datetime('now')`                                                |
| `activated_at`  | TEXT    | Défini lors de l'activation                                      |

Les métriques et analyses des plugins sont suivies dans des tables supplémentaires
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Tableau de bord

La page du tableau de bord sur `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) fournit deux onglets :

- **Installé** — répertorie les plugins installés avec leurs hooks déclarés, une bascule activate/deactivate, un bouton de désinstallation et une action "Rechercher les plugins" (`POST /api/plugins/scan`).
- **Marché** — affiche le catalogue de `GET /api/plugins/marketplace` avec un champ pour définir le registre personnalisé URL.

La page affiche toujours un avertissement indiquant que les plugins s'exécutent avec tous les privilèges du processus OmniRoute.

Une page de configuration par plugin se trouve sur `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Voir aussi

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  pourquoi `/api/plugins` est accessible uniquement via l’interface de bouclage (niveau 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — le framework de compétences associé
  (`src/lib/skills/`) ; les plugins peuvent déclarer des compétences dans leur manifeste
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — intégrations sortantes
  pilotées par des événements
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  le modèle `buildErrorBody()` utilisé par chaque route de plugin pour les réponses d’erreur
