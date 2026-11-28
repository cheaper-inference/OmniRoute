# Progressive Web App (PWA) Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Installez le tableau de bord OmniRoute en tant qu'application Web progressive pour l'ouvrir depuis votre écran d'accueil ou votre bureau dans une fenêtre autonome. L'application installée a toujours besoin d'une connexion à votre serveur OmniRoute pour la navigation, les données du tableau de bord et les requêtes API. Les ressources statiques mises en cache ne fournissent pas de passerelle hors ligne ni de tableau de bord hors ligne.

## Qu'est-ce qu'un PWA?

Une Progressive Web App utilise le tableau de bord Web avec une icône d'application et une fenêtre séparée. Une fois installé, OmniRoute:

- Se lance depuis votre écran d'accueil ou votre bureau
- S'ouvre en mode autonome, sans la barre d'adresse et les onglets habituels du navigateur
- Met en cache les ressources statiques sélectionnées
- Prend en charge les orientations portrait et paysage

## Installation

Utilisez une adresse HTTPS pour un serveur sur un autre appareil. Lorsque le serveur s'exécute sur le même appareil, `http://localhost:20128` répond également aux exigences d'installation du navigateur. Une adresse `http://YOUR_IP:20128` simple ne répond pas à ces exigences. Les menus et les invites d'installation dépendent du navigateur et du système d'exploitation. Voir [les exigences d'installation de PWA MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Ouvrez votre adresse OmniRoute HTTPS, ou `http://localhost:20128` pour un serveur sur le même téléphone.
2. Ouvrez le**⋮** menu et choisissez** Installer l'application** ou** Ajouter à l'écran d'accueil** , si offert.
3. Confirmez l'invite.
4. Ouvrez OmniRoute depuis l'écran d'accueil.

### iOS (Safari)

1. Ouvrez votre adresse OmniRoute HTTPS dans Safari.
2. Robinet** Partager** →** Ajouter à l'écran d'accueil** .
3. Confirmez le nom et appuyez sur** Ajouter** .
4. Ouvrez OmniRoute depuis l'écran d'accueil.

### Bureau (Chrome/Edge)

1. Ouvrez votre tableau de bord OmniRoute.
2. Utilisez l'icône d'installation du navigateur ou le** Installer l'application** entrée de menu, si elle est proposée.
3. Confirmez l'invite pour ouvrir OmniRoute dans sa propre fenêtre.

## Caractéristiques

### Fenêtre autonome

Le manifeste définit `display: "standalone"` et `start_url: "/dashboard"`. L'application installée ouvre le tableau de bord dans une fenêtre d'application. Les contrôles du navigateur et du système d'exploitation peuvent toujours apparaître ; le manifeste ne demande pas le mode plein écran.

### Actifs mis en cache et exigences réseau

Le [service worker](../../public/sw.js) met en cache les ressources sélectionnées de même origine :

| Demande ou actif                                  | Stratégie         | Comportement                                                                                                                     |
| ------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Ressources de temps d'installation                | Pré-cache         | `/`, `/manifest.webmanifest`, `/icon-512.png` et `/apple-touch-icon.png` sont mis en cache lors de l'installation du travailleur |
| Actifs statiques Next.js (`/_next/`)              | Le réseau d'abord | Les réponses réussies mettent à jour le cache ; une erreur réseau revient à une réponse mise en cache existante                  |
| Autres CSS, JS, images et polices statiques       | Le cache d'abord  | Une réponse existante mise en cache est réutilisée ; les réponses réseau réussies sont mises en cache en cas d'échec             |
| Navigation dans les pages                         | By-pass           | Le navigateur récupère la page directement ; aucune solution de secours hors ligne n'est proposée                                |
| API, tableau de bord et routes d'authentification | By-pass           | Le travailleur n'intercepte ni ne met en cache ces requêtes                                                                      |
| Autres requêtes non statiques                     | Réseau            | Pas de recherche de cache ni de stockage                                                                                         |

Les routes exclues sont `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` et `/login`, sans tenir compte de la casse aux limites du chemin. Les requêtes d’origine croisée et non-GET contournent également le travailleur.

### Page de connectivité

La page `/offline` fournit un message de connectivité, un indicateur online/offline, un** Réessayer la connexion** et un lien vers la page d'état. C'est** pas pré-mis en cache** et le travailleur de service fait** pas** redirigez-y les navigations ayant échoué. Son existence ne rend pas de nouvelles pages accessibles sans le serveur.

### Icônes d'application

Le manifeste annonce ces icônes PNG :

| Déposer                | Taille  | Utiliser                                  |
| ---------------------- | ------- | ----------------------------------------- |
| `icon-192.png`         | 192×192 | Icône générale de l'application           |
| `icon-512.png`         | 512×512 | Icône d'application générale et masquable |
| `apple-touch-icon.png` | 180×180 | Icône de l'écran d'accueil Apple          |

Le navigateur sélectionne l'icône appropriée pour la cible d'installation.

### Inscription automatique

`PwaRegister` enregistre le travailleur en production lorsque le navigateur prend en charge les service Workers. Le mode développement désenregistre les travailleurs et efface les caches pour éviter que les actifs obsolètes n'interfèrent avec le rechargement à chaud. Les invites d'installation restent une décision du navigateur.

## Architecture technique

### Manifeste d'application Web

Next.js génère `/manifest.webmanifest` à partir de [`src/app/manifest.ts`](../../src/app/manifest.ts). Ses paramètres clés sont :

| Paramètre                           | Valeur                                                 |
| ----------------------------------- | ------------------------------------------------------ |
| `short_name`                        | `OmniRoute`                                            |
| `start_url`                         | `/dashboard`                                           |
| `scope`                             | `/`                                                    |
| `display`                           | `standalone`                                           |
| `orientation`                       | `any`                                                  |
| Couleurs d’arrière-plan et de thème | La palette de lumière par défaut de `PWA_THEME_COLORS` |

Le nom et la description du manifeste sont des valeurs statiques dans ce fichier source. Le manifeste installé ne suit pas le paramètre de nom d'instance ou la palette active à chaque visite.

### Employé de service

[`public/sw.js`](../../public/sw.js) n'a pas de dépendance au framework service-worker :

- **Installer:** met en cache les quatre ressources répertoriées ci-dessus et active le nouveau travailleur.
- **Activer:** supprime les anciennes générations de cache et revendique les clients.
- **Aller chercher:** applique les stratégies d’actifs statiques et les exclusions d’itinéraire ci-dessus.
- **Versionnement :** le nom du cache source est `omniroute-pwa-v3`; la version de production tamponne l'identité du cache.
- **Notifications :** gère les événements `push` entrants et concentre ou ouvre une fenêtre lorsque vous cliquez sur une notification.

Les gestionnaires d’événements push à eux seuls n’établissent pas d’abonnement push actif ni de livraison de serveur configurée. Ne présumez pas que les notifications sont activées simplement parce que PWA est installé.

### Métadonnées de mise en page et enregistrement

[`src/app/layout.tsx`](../../src/app/layout.tsx) fournit le lien manifeste, les métadonnées autonomes Apple, les couleurs du thème et `viewport-fit: cover`. Le titre de la page et le titre de l'application Web Apple utilisent le nom de l'instance. La couleur du thème du navigateur en direct suit la palette ; le manifeste d'installation utilise la couleur de lumière par défaut.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) s'exécute sur le client et enregistre `/sw.js` avec le build ID dans son URL. Il détecte les générations de cache incompatibles et peut réinitialiser le travailleur et recharger une fois pour récupérer à partir d'une ancienne installation. L’échec de l’inscription ne bloque pas le tableau de bord.

## Utiliser avec Termux (Android)

1. Démarrez OmniRoute dans Termux : `npx -y omniroute@latest`.
2. Ouvrez Chrome sur le même téléphone : `http://localhost:20128`.
3. Installez le PWA via le menu d'installation du navigateur.
4. Gardez le serveur Termux en marche tout en utilisant le tableau de bord.

Le téléphone héberge à la fois la passerelle et son tableau de bord. Les demandes adressées aux fournisseurs AI distants nécessitent toujours un accès au réseau. Consultez le [guide Termux](TERMUX_GUIDE.md) pour connaître les considérations relatives à la configuration et à la durée de vie du processus Android.

## Utilisation à partir d'autres appareils

Ouvrez l'adresse HTTPS du serveur sur un téléphone, une tablette ou un ordinateur de bureau, puis suivez le flux d'installation de ce navigateur. Le serveur doit rester accessible depuis chaque appareil. Consultez le [guide du tunnel](../ops/TUNNELS_GUIDE.md) pour connaître les options d'accès à distance.

## Personnalisation

### Nom de l'instance

Le** Nom de l'instance** le paramètre modifie les métadonnées du tableau de bord, y compris le titre de la page et le titre de l'application Web Apple. Le manifeste généré utilise un nom statique, ce paramètre ne garantit donc pas qu'une application déjà installée sera renommée.

### Icône de favori personnalisée

Un favicon personnalisé modifie le favicon du navigateur. Le manifeste d'installation annonce toujours les fichiers PNG ci-dessus ; changer le favicon ne remplace pas ces icônes de l’écran d’accueil.

## Limites

- **Connexion au serveur requise :** la navigation dans les pages, l'état du tableau de bord et les requêtes API n'ont pas de solution de secours hors ligne.
- **Pas de synchronisation en arrière-plan :** les actions hors ligne ne sont pas mises en file d'attente pour la relecture.
- **Différences du navigateur :** les menus d'installation, la présentation des fenêtres et la prise en charge des notifications varient selon la plate-forme.
- **Pas de cache de réponse API :** le travailleur exclut API, le tableau de bord et les routes d'authentification.
- **Icônes d'installation statique :** la mise à jour de ces icônes nécessite de modifier les éléments annoncés ; les navigateurs peuvent conserver les métadonnées installées.

## Référence des fichiers

| Déposer                                                                                | But                                                                          |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Manifeste d'application Web généré                                           |
| [public/sw.js](../../public/sw.js)                                                     | Gestionnaires d’événements de mise en cache, d’exclusions et de notification |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Enregistrement de la production et récupération du cache obsolète            |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Page de connectivité, pas une solution de repli automatique hors ligne       |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Métadonnées de la page et paramètres de la fenêtre d'affichage               |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Valeurs de couleur de thème partagées                                        |
| [public/icon-512.png](../../public/icon-512.png)                                       | Icône de l'application 512 × 512                                             |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Icône Apple                                                        |
