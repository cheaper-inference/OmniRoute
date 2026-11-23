# Guardrails (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Source de vérité :** `src/lib/guardrails/`
> **Dernière mise à jour :** 2026-08-29 — v3.8.51 (la provenance des transcriptions de Video Bridge est déclarée par l'appelant,
> mais n'est pas encore vérifiée par le serveur — clarification conformément à #11661)

Les garde-fous appliquent les règles de sécurité, les politiques et les transformations de contenu à la frontière
entre OmniRoute et les fournisseurs en amont. Chaque garde-fou peut inspecter (et
éventuellement rejeter, transformer ou annoter) les charges utiles des requêtes (`preCall`) et
les réponses en amont (`postCall`).

Le système est **à tolérance ouverte** : si un garde-fou lève une exception pendant son exécution, le registre
consigne l'erreur et passe au garde-fou suivant au lieu de faire échouer la
requête. Le blocage est une décision explicite (`block: true`), jamais un accident.

## Garde-fous intégrés

Le registre charge automatiquement six garde-fous par ordre de priorité lors de l’importation
(voir `registry.ts` → `registerDefaultGuardrails()`):

| Priorité | Nom                 | Étape(s)       | Fichier               |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Les numéros de priorité les plus faibles s’exécutent **en premier**.

### Passerelle de vision (`visionBridge.ts`) — Passerelle de modalité PR-1

Intercepte les requêtes contenant des images et destinées à des **modèles sans capacités visuelles**, puis
redirige soit l’intégralité de la requête vers un modèle doté de capacités visuelles, soit remplace les
parties contenant des images par des descriptions textuelles produites par un modèle de vision configurable avant
l’appel en amont. Cela permet aux fournisseurs exclusivement textuels de traiter de manière transparente
les charges utiles multimodales.

Déroulement:

1. Ignorer si le modèle cible prend déjà en charge la vision (sauf s’il figure dans la
   liste de pontage forcé `isVisionBridgeForcedModel`).
2. Extraire les parties contenant des images via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), qui délègue au **détecteur de médias unifié**
   `detectMediaParts()` dans `open-sse/utils/mediaParts.ts` — l’unique
   source de vérité partagée avec le filtre de compatibilité combo.
   L’extraction est limitée par liste d’autorisation aux parties de premier niveau dont les formes
   peuvent être réinsérées par `replaceImageParts` (le contrat extraction↔remplacement): OpenAI
   `image_url`, la source base64 d’Anthropic `source.type:"base64"`, l’URL Anthropic
   `source.type:"url"` et `input_image` de l’API Responses. Les correspondances imbriquées et
   les formes servant uniquement d’indicateurs relèvent du filtre combo et ne sont jamais extraites.
   Ignorer si aucune n’est trouvée.
3. Résoudre la configuration d’exécution via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): les nouvelles clés de paramètres `modalityBridge*`
   prévalent; les anciennes clés `visionBridge*` restent une **solution de repli pendant un cycle**
   (fenêtre de restauration). Ignorer avant tout parcours des médias lorsque la
   passerelle est désactivée.
4. Le sélecteur de mode (`modalityBridgeVisionMode`, voir le tableau ci-dessous) choisit entre
   redirection et description. La redirection renvoie `modifiedPayload` avec uniquement `model`
   remplacé, ainsi que les métadonnées `{ rerouted, fromModel, toModel, imagesKept }`.
5. Chemin de description: limiter les images à `maxImages`, composer l’invite tenant compte de la tâche,
   consulter le cache de descriptions, appeler le modèle de vision **en parallèle**
   (`Promise.allSettled`) et injecter à leur place des parties textuelles
   `[Image N]: <description>`. L’échec d’une description produit `null` et la partie image d’origine est
   **préservée** (#4012) — sauf sur le chemin de description combo lorsque toutes les
   descriptions ont échoué, auquel cas un service en amont confirmé comme dépourvu de capacités visuelles reçoit un substitut
   `(indisponible — aucun fournisseur doté de capacités visuelles n’est connecté)` à la place (#8430).
6. Renvoyer `modifiedPayload` et les métadonnées (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Sélecteur de mode (`modalityBridgeVisionMode`)

| Mode       | Par défaut | Comportement                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | Heuristique historique, inchangée (#6640/#7204): les modèles non combo/`auto/` sont redirigés vers le meilleur modèle de vision, sauf si le modèle d’origine dispose déjà d’identifiants utilisables (auquel cas une description est effectuée); les cibles combo sont toujours décrites.                                                                                    |
| `describe` |            | Toujours décrire — le bloc de redirection est entièrement ignoré; le modèle choisi par l’utilisateur fournit toujours la réponse.                                                                                                                                                                                                                                            |
| `reroute`  |            | Forcer la redirection: la protection qui conserve le modèle disposant d’identifiants est contournée. La protection des identifiants de la **cible** de redirection s’applique toujours — lorsqu’aucune cible de vision utilisable n’existe, la requête passe au mode de description afin que les images brutes n’atteignent jamais un backend exclusivement textuel (#8430). |

Les modes forcés court-circuitent l’exécution **avant** l’heuristique automatique; le comportement `auto`
est strictement identique, octet pour octet, à celui du garde-fou antérieur à PR-1.

#### Portée de la clé API (`visionBridgeKeyScope.ts`)

Lorsque la clé API de l’appelant restreint `allowedConnections`, les groupes de quotas
(`allowedQuotas`) ou les modèles (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), la passerelle choisit uniquement
des modèles de redirection et de description que la clé est autorisée à utiliser, sur des connexions que la clé est
autorisée à utiliser. L’appel de description passe alors toujours par la boucle interne d’OmniRoute avec
l’en-tête `x-omniroute-self-loop-key-id`, afin que la requête de chat réceptrice
applique de nouveau la politique de connexion et de modèle de cette clé. `enforceApiKeyPolicy()`
n’honore cet en-tête qu’en présence du jeton bearer de la boucle interne; il ne peut donc que
restreindre l’accès, et un identifiant qui ne peut pas être résolu est rejeté.

Si aucun modèle de vision n’est autorisé pour la clé, le chemin de description s’efface et
la requête est transmise sans modification, avec le même comportement permissif en cas d’échec qu’un garde-fou désactivé
(métadonnées `{ skipped: true, reason: "no_permitted_vision_model" }`).
Les requêtes sans clé et les clés dépourvues de ces restrictions se comportent exactement comme
auparavant.

#### Invite de description tenant compte de la tâche (`modalityBridgeVisionTaskAware`)

Valeur par défaut : **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) ajoute
le texte du **dernier message utilisateur** (tronqué à 500 caractères) à
l’invite de description de base, afin d’orienter la description vers ce que
l’utilisateur a réellement demandé (selon le modèle codex-vision-proxy), et
demande au modèle de vision de transcrire le texte visible. Lorsque l’option
est désactivée — ou en l’absence de texte utilisateur — l’invite de base est
utilisée sans modification.

La requête compatible OpenAI propre à la boucle de description
(`callVisionModelSingle()` dans `visionBridgeHelpers.ts`) demande toujours
`image_url.detail: "high"` — sans condition, pour chaque appelant/fournisseur,
et indépendamment de tout signal du client. L’échantillonnage à faible niveau
de détail dégrade la précision de l’OCR précisément pour la tâche de
transcription de texte demandée par cette invite. L’appel de description
demande donc toujours un niveau de détail élevé, quel que soit le niveau de
détail utilisé par la requête entrante d’origine. Cela affecte uniquement le
corps de la requête interne de description ; cela ne change pas la façon dont
OmniRoute transmet la valeur `image_url.detail` propre à l’appelant dans la
requête principale — cette valeur par défaut est appliquée séparément, et
uniquement pour les clients OpenCode détectés, dans `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). La branche au format de
transmission Anthropic de la boucle de description ne possède aucun champ
`detail` et n’est affectée par aucune de ces valeurs par défaut.

#### Limite de sortie de la description (`modalityBridgeVisionMaxChars`)

| Clé                            | Valeur par défaut | Plage            |
| ------------------------------ | ----------------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`               | `0` ou 100–50000 |

`0` (valeur par défaut) signifie **aucune limite** — la description renvoyée
par `callVisionModel()` est transmise sans modification, ce qui préserve le
comportement existant. Toute valeur comprise entre 100 et 50000 tronque la
description en ajoutant le suffixe `…` avant sa réinsertion sous la forme
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` dans
`src/lib/guardrails/visionBridge.ts`). Augmentez cette valeur pour les tâches
OCR riches en détails, lorsque le modèle en aval a besoin de la transcription
complète ; réduisez-la pour limiter l’utilisation de jetons par les modèles de
vision trop prolixes. Le champ du tableau de bord se trouve dans le panneau
Avancé de l’onglet Vision (`modality-bridge-max-chars` dans
`ModalityBridgeVisionTab.tsx`) et ramène toute valeur comprise entre 1 et 99
au minimum de 100, tout en conservant explicitement la valeur `0` — `0` est
une valeur Zod valide à part entière
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), et non
simplement la valeur par défaut indiquant une absence de configuration.

#### Cache de description (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL en mémoire pour les sorties de description, partagé à
l’échelle du processus. Clé =
`sha256(imageRef + composedPrompt + configuredBridgeModel)` avec encadrement
par préfixe de longueur (aucune collision aux limites des champs). Le
composant modèle correspond au modèle de passerelle **configuré**, et non au
modèle qui a effectivement répondu — `callVisionModel` peut basculer en
interne vers un modèle de secours, et la création d’une clé par tentative
fragmenterait le cache. Les descriptions ayant échoué ne sont jamais mises en
cache. Paramètres :

| Clé                             | Valeur par défaut | Plage   |
| ------------------------------- | ----------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`            | —       |
| `modalityBridgeCacheTtlMinutes` | `60`              | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`             | 10–5000 |

#### Normalisation des images distantes (description en boucle/conversion base64)

Lorsque la passerelle récupère elle-même une image **distante** — pour
l’auto-appel de description Anthropic et pour la conversion en base64 au
format de transmission Claude (`ensureBase64ImagesForClaudeWire`), tous deux
via `fetchRemoteImageAsDataUri()` dans `visionBridgeHelpers.ts` — l’URI de
données obtenu est traité par `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) avant d’être incorporé à la requête du
modèle de vision. Les images surdimensionnées sont réduites afin que leur
**côté le plus long mesure 2048 px** (ce qui correspond à la limite de
redimensionnement déjà appliquée côté serveur par OpenAI/Anthropic), réduisant
ainsi le volume de données transférées et la latence sans modifier ce que voit
le modèle de vision. Le redimensionnement utilise `sharp`, chargé par import
dynamique : sur une plateforme où son binaire natif ne parvient pas à se
charger, `normalizeDataUri()` **ne lève jamais d’exception** — il transmet les
octets d’origine sans modification, de sorte que le chemin de
description/conversion en base64 continue toujours de fonctionner. Les octets
qui ne correspondent pas à une image (lorsqu’une récupération ne renvoie pas
une image décodable) sont également transmis sans modification. Cette
normalisation est limitée aux images que la passerelle récupère pour son
propre auto-appel — elle n’est jamais appliquée à la charge utile brute
transmise telle quelle par l’appelant, conformément au principe de mutation
sur consentement explicite uniquement (règle stricte nº 20).

#### Schéma des paramètres + migration

Les nouvelles clés `modalityBridge*` sont validées par Zod dans
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`) :
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, les trois
clés `modalityBridgeCache*`, ainsi que le groupe `modalityBridgeAudio*`
utilisé par la passerelle audio. La migration
`141_modality_bridge_settings.sql` copie les valeurs existantes des anciennes
clés `visionBridge*` vers les nouvelles clés correspondantes (de manière
idempotente, sans jamais écraser une valeur `modalityBridge*` définie par un
opérateur) ; les anciennes clés restent acceptées comme solution de repli en
lecture pendant un cycle de publication.

#### En-tête de transparence + statistiques

Les réponses transformées par la description comportent
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(construit par `buildModalityBridgeHeader()` dans
`modalityBridge/bridgeStats.ts`, puis ajouté par
`withModalityBridgeHeader()` dans `src/sse/handlers/chatHelpers.ts`).
Les requêtes réacheminées ne reçoivent **aucun** en-tête — la charge utile
n’a pas été modifiée et le changement de modèle est déjà visible dans le
champ `model` du corps de la réponse.

`GET /api/modality-bridge/stats` (authentification de gestion, même niveau que
`GET /api/settings`) renvoie les compteurs en mémoire par modalité
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` pour `vision`, `audio` et
`video`. `averageLatencyMs` utilise `latencySamples`, et non l’ensemble des tentatives,
comme dénominateur ; une opération sans mesure de durée ne crée pas artificiellement
un échantillon de zéro milliseconde. `bridged` reste l’alias rétrocompatible des
conversions réussies ; les tentatives ayant échoué ne l’incrémentent pas.
Les compteurs sont réinitialisés au redémarrage du processus par conception
(télémétrie, et non comptabilité).

#### Configuration du tableau de bord

La page dédiée du tableau de bord est
`/dashboard/settings/modality-bridge`. Ses onglets `Vision`, `Audio`
et `Video`, accessibles par URL, conservent les paramètres de requête lors du changement de
la valeur `tab`. L’onglet Vision permet de configurer l’activation, le mode, la sélection du modèle
(y compris la valeur automatique par défaut), les invites adaptées à la tâche, les limites avancées
de délai d’expiration, d’image, de longueur de description et de cache, les compteurs
d’exécution ainsi qu’un exemple de requête protégé. L’onglet Audio est également opérationnel : il permet de configurer
l’activation, de choisir un modèle STT uniquement avec l’option Auto, de définir les limites de délai d’expiration et de durée maximale
des extraits, d’afficher les compteurs audio et d’exécuter un test d’exemple `input_audio`. L’onglet Video est fonctionnel : il affiche
l’état d’exécution de FFmpeg/ffprobe — l’un des quatre états explicites de l’interface (`unknown` pendant
l’exécution de la détection ou si celle-ci n’a pas pu aboutir, `restricted` sur un hôte de tableau de bord
qui n’utilise pas l’adresse de bouclage et pour lequel la détection est ignorée côté client, `unavailable` après détection
et confirmation de l’absence, ou `available` avec les versions de FFmpeg/ffprobe) —, conserve
les limites d’activation, de modèle, d’images, de vidéo et de délai d’expiration, filtre le sélecteur de modèles afin de n’afficher que les modèles
prenant en charge la vision et présente les compteurs vidéo.

L’ancienne carte Vision Bridge dans les paramètres d’IA est désormais un lien de compatibilité vers la
nouvelle page ; elle ne contient plus une seconde copie du formulaire. Media Providers
fournit également des liens entre les flux de travail Image-to-Text et Speech-to-Text et les onglets correspondants de Modality
Bridge, sans supprimer l’aire de test Speech-to-Text existante.

**Contournement de l’admission pour l’auto-bouclage :** lorsque l’appel de description passe par
le propre auto-bouclage `/v1` d’OmniRoute (modèle de fournisseur non standard), la sous-requête envoie
`x-omniroute-admission-bypass: internal` et est authentifiée avec l’identifiant résolu
pour l’auto-bouclage — la sentinelle locale `sk_omniroute` en mode local, ou la clé d’environnement
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurée par l’opérateur (#1350), afin que
les déploiements avec `REQUIRE_API_KEY=true` puissent toujours exécuter l’appel de description. Le contournement
n’est accepté que pour ces identifiants exacts ; les clients externes ne peuvent donc pas utiliser cet
en-tête pour contourner l’admission.

Les valeurs par défaut historiques se trouvent dans `src/shared/constants/visionBridgeDefaults.ts` ;
les nouvelles valeurs par défaut de mode, d’adaptation à la tâche et de cache, ainsi que le résolveur de paramètres, se trouvent dans
`src/shared/constants/modalityBridgeDefaults.ts`. Le garde-fou expose une
option de constructeur `deps` afin que les tests puissent injecter de fausses implémentations de `getSettings` et
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Intercepte les requêtes de chat contenant de l’audio avant qu’elles n’atteignent une cible dont la prise en charge
des entrées audio n’est pas connue. Il ne réachemine jamais la requête de chat : les parties audio sont
transcrites via le point de terminaison multipartite existant compatible avec OpenAI, et le
modèle de chat choisi poursuit le traitement avec les transcriptions textuelles.

Déroulement :

1. Résoudre `supportsAudio` via `getResolvedModelCapabilities()`. Les métadonnées explicites
   du registre de fournisseurs sont prioritaires, suivies des métadonnées statiques du modèle, puis de
   `modalities_input` synchronisé. Une liste d’entrées déclarée sans `audio` vaut `false` ; en l’absence
   de toute indication de capacité, la valeur reste `null`. `false` et `null` activent tous deux le
   pont conservateur, tandis que `true` le contourne.
2. Résoudre les paramètres `modalityBridgeAudio*` et extraire les parties audio de premier niveau
   pouvant être remplacées dans chaque message via le détecteur partagé `detectMediaParts()`.
   Les formats de transmission pris en charge sont `input_audio` et `audio_url` d’OpenAI, ainsi que
   `source.media_type: "audio/*"`. Les éléments audio imbriqués sont détectés pour le routage, mais ne sont pas
   supprimés par le chemin de remplacement. Le traitement est limité par `modalityBridgeAudioMaxClips` ;
   les parties suivantes restent inchangées.
3. Respecter une valeur `provider/model` configurée, ou laisser `selectAudioBridgeModel()` parcourir
   `AUDIO_TRANSCRIPTION_PROVIDERS` dans l’ordre stable du catalogue et sélectionner le premier
   modèle disposant d’un identifiant de fournisseur actif et utilisable.
4. `callAudioTranscription()` convertit les données audio en base64/URI de données en un
   `file` multipartite, ou télécharge un `audio_url` distant via le garde-fou sortant limité aux ressources publiques,
   avec épinglage DNS et une limite de 25 Mo. Il envoie ensuite par POST le fichier et le modèle sélectionné
   à l’auto-bouclage local `/v1/audio/transcriptions`, authentifié avec
   `resolveSelfLoopBearer()`. La route de transcription existante effectue la recherche normale
   des identifiants, la gestion des périodes de temporisation et des limites de débit, ainsi que la distribution vers le fournisseur.
5. Les appels réussis remplacent leurs parties par `[Audio N]: <transcript>`. Les appels
   sont exécutés avec `Promise.allSettled` : un échec individuel conserve la partie audio
   d’origine correspondante (contrat #4012). Si tous les appels échouent et qu’il est démontré que la cible a
   `supportsAudio === false`, les parties deviennent
   `[Audio N]: (unavailable — no STT provider connected)` (contrat #8430). Pour
   une cible inconnue (`null`), un échec de tous les appels laisse les données inchangées. Une cible dont il est prouvé
   qu’elle est limitée au texte et qui ne dispose d’aucun identifiant STT utilisable reçoit le même
   texte de remplacement explicite sans qu’aucun appel réseau soit effectué.

Les transcriptions réussies utilisent le cache LRU/TTL de Modality Bridge commun à l’ensemble du processus. La
clé combine la référence audio, le libellé d’opération stable `audio-transcription`
et le modèle STT sélectionné ; les échecs ne sont jamais mis en cache. Les tentatives audio mettent à jour
les compteurs partagés `bridged`, `cacheHits`, `failures` et `lastUsedAt`.
Les réponses transformées comportent
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` ; les requêtes
inchangées ne reçoivent pas de segment Audio Bridge.

Les paramètres d’exécution sont stockés en base de données et validés par Zod :

| Clé                           | Valeur par défaut | Plage          |
| ----------------------------- | ----------------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`            | —              |
| `modalityBridgeAudioModel`    | `""`              | Auto ou ID STT |
| `modalityBridgeAudioTimeout`  | `60000`           | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`               | 1–10           |

Le cache partagé reste contrôlé par `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` et `modalityBridgeCacheMaxEntries`.

### Passerelle vidéo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepte les parties vidéo de premier niveau dans les `messages` des Chat Completions et dans l’`input` de l’API Responses avant l’appel d’une cible ne disposant pas d’une prise en charge vidéo native connue.
Les formats pris en charge sont `input_video`, `video_url`, `video_source`, les URL HTTPS
et les URI de données `data:video/*;base64,...`. Les noms de fichiers en texte brut ne sont pas considérés
comme des vidéos.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) gère le parcours de la requête, la
vérification des capacités/politiques, l’agrégation par requête et la charge utile de réponse.
Le traitement de chaque vidéo — l’acquisition, le cache du résultat complet, la description d’une séquence
d’images (qui fusionne toute transcription audio déclarée par l’appelant), ainsi que les
métriques/abandons/nettoyages de chaque tentative — est encapsulé derrière `processVideoPart` dans
`videoBridgePipeline.ts`, appelé une fois par partie vidéo dans la boucle de `preCall`.
Ce module définit également les limites de port explicites `VideoMediaBrokerPort`
(acquisition des octets et extraction des images échantillonnées), `VideoAudioTranscriptionPort`
(fusion d’une transcription audio déclarée par l’appelant avec les légendes échantillonnées) et
`VideoDrilldownPort` (la limite de persistance pour l’exploration détaillée des images ; elle n’est pas encore connectée
à `processVideoPart` — seule la route distincte `/api/modality-bridge/video/drilldown`
écrit actuellement des entrées d’exploration détaillée).

Le chemin de requête public `/v1` n’importe ni n’invoque jamais de sous-processus. Les vidéos distantes
sont téléchargées avec une limite de 50 Mio ; les vidéos base64 intégrées disposent d’une
limite prudente de 36 Mio décodés par vidéo afin que l’enveloppe du modèle, des messages et du cadrage
puisse rester dans la limite publique d’admission des requêtes JSON de 50 Mio. La longueur intégrée
et les estimations de la taille décodée sont vérifiées avant l’allocation. HTTPS est
requis pour l’URL distante initiale et chaque redirection, au moyen de la protection sortante
existante limitée aux ressources publiques avec épinglage DNS. Les octets franchissent ensuite exactement la limite interne
du courtier `POST /api/modality-bridge/video/extract`. Cette route est à la fois
`LOCAL_ONLY` et `SPAWN_CAPABLE`, n’accepte qu’une requête sur boucle locale de confiance,
authentifiée par processus, et n’accepte jamais d’URL, de chemin de système de fichiers, d’exécutable
ou de liste d’arguments. Le pipeline de taille du corps de l’API et le lecteur incrémental du corps
du gestionnaire imposent indépendamment une limite d’entrée du courtier de 50 Mio. Sa file d’attente
bornée exécute une extraction à la fois, autorise quatre tâches en attente et limite les données
d’entrée en attente à 100 Mio.

Dans le courtier, `ffprobe` lit un fichier local privé ; la liste fixe des formats
autorisés exclut les formats de listes de lecture et de manifestes. Pour les conteneurs autorisés de la famille MOV,
les références externes aux données MOV restent désactivées par défaut et la
commande fixe ne les active pas. `ffprobe` et `ffmpeg` utilisent tous deux la liste blanche de protocoles
limitée à `file`, un seul thread, des tableaux d’arguments fixes, aucun shell
et des exécutables résolus à partir de `PATH`. Les flux d’images de couverture jointes ne sont pas
des candidats lisibles. Tous les flux lisibles doivent respecter les limites, et un
flux par défaut explicite est privilégié avant le recours déterministe au flux ayant l’index
le plus bas. Les vidéos sont limitées à 600 secondes, 8 192 pixels par dimension et
33 554 432 pixels source. FFmpeg échantillonne de 1 à 16 images JPEG aux points médians, réduit
le bord long à 1 024 pixels au maximum sans agrandir les entrées plus petites et
ne reçoit jamais d’URL. L’échantillonnage est `uniform` par défaut. Les politiques facultative
`scene_aware` et expérimentale `segment_aware` effectuent une passe FFmpeg fixe supplémentaire
sur le flux local déjà validé, sélectionnent un ensemble borné d’horodatages de scène `showinfo`
et reviennent de manière déterministe aux mêmes points médians uniformes en cas d’échec du détecteur,
de dépassement du délai, de sortie mal formée ou d’ensemble de candidats vide.
Le mode tenant compte des segments alloue les échantillons des points médians proportionnellement aux
intervalles de scène validés ; les éléments probants du mode tenant compte des segments et le comportement de repli sont
détaillés ci-dessous. La limite stricte de 16 images est
appliquée après la sélection pour chaque politique. Lorsqu’une requête tenant compte des scènes ne dispose que d’un
budget d’une seule image, elle utilise le point médian uniforme de la vidéo complète active ou de la fenêtre
de focalisation et indique `policyEffective: uniform` : une seule image de scène sélectionnée
ne peut pas préserver les deux extrémités temporelles. Un appelant peut éventuellement fournir une
fenêtre de focalisation finie (`start`/`end` en secondes) ; les limites sont ramenées à la durée
du média, les fenêtres inversées ou non finies sont rejetées, et toutes les politiques
d’échantillonnage ne sont appliquées qu’au sein de l’intervalle normalisé. La fenêtre obtenue
est incluse dans les métadonnées d’échantillonnage et dans le préfixe de description non fiable
afin que les modèles en aval puissent distinguer un extrait ciblé de la chronologie complète.

La focalisation sémantique des légendes est un paramètre distinct et explicite. Le mode d’analyse
`full` par défaut conserve l’invite d’image existante et ne transmet jamais le texte de la requête
au modèle de légendage. En mode `focused`, la passerelle lit uniquement le dernier
`text`/`input_text` non vide rédigé par l’utilisateur dans le même conteneur Chat ou Responses,
le normalise au format NFC, réduit les caractères de contrôle et les espaces, puis
le limite à 500 points de code Unicode. Un résultat vide entraîne un retour à
l’invite `full` exacte. Un indice utilisable est sérialisé au format JSON dans un bloc dédié
au contexte utilisateur non fiable et peut uniquement donner la priorité aux détails observables ; il
ne peut pas outrepasser l’avertissement distinct interdisant de suivre les instructions visibles
ou audibles dans le média. La focalisation textuelle ne déduit jamais `start`/`end` et ne modifie
pas l’échantillonneur temporel.

#### Éléments probants structurels des segments FU-07

`segment_aware` utilise une passe de préanalyse bornée sur le flux vidéo local déjà validé. La chaîne de filtres fixe réduit d’abord la largeur à 320 pixels au maximum, détecte les changements de scène et les intervalles figés, puis échantillonne à raison de 1 image par seconde afin de mesurer le flou, la luminance moyenne et les informations spatiales/temporelles. La passe est limitée à 600 échantillons structurels, un thread FFmpeg/de filtrage, les mêmes listes d’autorisation de conteneurs et du protocole `file` uniquement, une limite de 1 MiB pour la sortie du processus et au plus 30 secondes dans le délai d’abandon/d’échéance partagé du broker. Elle n’accepte jamais de commande, de filtre, de chemin ni d’URL provenant de la requête.

Les valeurs structurelles constituent des éléments d’échantillonnage déterministes, et non une compréhension sémantique de la vidéo. Elles ne déduisent ni sujets, ni actions, ni légendes, ni paroles, ni intention de l’utilisateur. Les limites de scènes et de périodes figées forment des segments ; la couverture des périodes figées, le flou, l’exposition, le niveau de détail spatial et les variations temporelles influencent uniquement la manière dont le budget existant de 1 à 16 images est alloué. Un segment entièrement figé est limité à une image, tandis que les segments non figés se partagent le budget restant. Lorsque les limites sont plus nombreuses que les images, une couverture uniforme de la chronologie est conservée afin que des coupes rapides au début ne puissent pas masquer un long segment final. Les limites de scènes situées dans la résolution d’analyse de 1 seconde autour d’une limite de période figée sont fusionnées.

Les filtres manquants, les éléments de preuve mal formés/vides, une erreur de détecteur ou l’expiration du délai de préanalyse borné entraînent un repli permissif vers la politique exacte des points médians uniformes. L’abandon par l’appelant ou l’échéance du broker n’entraîne pas de repli permissif : cela met fin au sous-processus en cours, empêche toute extraction d’image ultérieure et l’arborescence temporaire privée est supprimée dans `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` génère des jeux de données FFmpeg réels et déterministes pour mesurer les économies d’appels de légendage après déduplication, l’allocation du budget en cas de mouvement dense, les éléments de preuve relatifs au flou, à l’exposition et à SI-TI, les coupes rapides suivies d’une longue séquence finale, ainsi que les faux positifs dus aux fondus progressifs. Il enregistre le temps réel de préanalyse et, lorsque `/usr/bin/time` est disponible, le temps CPU du processus enfant et le pic de RSS. Ses contrôles de qualité sont uniquement des oracles structurels. La qualité réelle du modèle de légendage reste `HOLD`, car ce banc d’essai ne dispose d’aucun point de terminaison autorisé ni d’aucun évaluateur figé. Les économies financières restent également `HOLD`, sauf si `--caption-cost-per-call-usd` fournit une estimation positive explicite du coût par appel ; le script ne fabrique jamais aucun de ces résultats.

Chaque image est limitée à 4 MiB, l’ensemble des images brutes à 23 MiB et la réponse sérialisée du broker à 32 MiB. Un répertoire temporaire privé est supprimé dans `finally`. OmniRoute n’intègre pas FFmpeg et n’accepte pas de chemin personnalisé vers l’exécutable. Avant le légendage, le bridge applique une passe prudente de déduplication visuelle : chaque JPEG est réduit à un tampon en niveaux de gris de 16×16 et comparé uniquement à la dernière image conservée. Pour un budget de légendage demandé supérieur à une image, l’extraction fournit un ensemble borné de candidats pouvant atteindre deux fois ce budget, sans jamais dépasser 16 images. La limite demandée n’est appliquée qu’après la déduplication, les premier et dernier candidats sélectionnés étant préservés lors de l’éclaircissement final lorsque le budget est d’au moins deux images. La politique versionnée `grayscale-16x16-mean-cells-v2` utilise la plus grande valeur entre l’écart moyen de luminance et la proportion de cellules de la vignette dont l’écart normalisé est au moins égal à 0,05. Le seuil de détection des doublons est la constante 0,04, choisie pour sa prévisibilité plutôt que proposée comme paramètre d’exécution. Ce signal secondaire à contraste élevé préserve les petits mouvements et les modifications de texte visible qu’une comparaison fondée uniquement sur la moyenne peut masquer. Les erreurs du comparateur ou du décodeur entraînent un repli permissif et préservent la couverture. Les métadonnées de sortie distinguent les candidats extraits, les images utilisées avec succès et les doublons visuels écartés.

Une partie vidéo explicitement marquée peut demander une planche-contact horodatée. Le bridge construit une grille JPEG comportant au maximum 4 colonnes et 16 images. Chaque cellule de 512 pixels incruste l’horodatage de sa source dans une bande inférieure à contraste élevé, tandis que les mêmes horodatages restent présents dans les métadonnées textuelles afin de permettre leur association et leur audit en aval. Le JPEG complet reste limité à 32 MiB. Si `sharp` ne peut pas décoder ou composer la grille, le bridge revient aux images JPEG individuelles ; l’abandon par un client continue de se propager pendant l’opération de création de la planche.

Les éléments de preuve pour la promotion sont délibérément séparés du microbenchmark synthétique de composition. `scripts/perf/video-bridge-contact-sheet-eval.ts` définit un banc d’essai A/B à schéma versionné pour de véritables modèles de vision compatibles avec OpenAI. Il mesure les jetons signalés par le fournisseur, la latence réelle de bout en bout, y compris la composition de la planche, le nombre d’appels au modèle et la conservation des faits définis par le manifeste. Les réponses brutes du modèle ne sont pas écrites dans le rapport ; seuls les condensés SHA-256 et les identifiants des faits correspondants sont conservés. Le banc d’essai n’effectue aucun appel réseau ni aucun appel payant à un modèle, sauf si `--execute-real` est transmis et si `--model`, `OMNIROUTE_BASE_URL` et `OMNIROUTE_API_KEY` sont configurés. Sans cette exécution réelle explicite, son verdict lisible par machine reste `HOLD` ; les mesures synthétiques de charge utile et de nombre d’appels ne constituent pas à elles seules des éléments de preuve suffisants pour une promotion.

Les appelants peuvent joindre un tableau facultatif `transcript.cues` à une partie vidéo prise en charge lorsqu’ils disposent déjà d’un texte aligné. Chaque repère doit comporter `text`, un intervalle `start`/`end` fini situé dans la durée analysée et une `source` figurant sur la liste d’autorisation (`client`, `embedded` ou `audio-bridge`) ; `confidence` vaut `1` par défaut et doit rester compris entre `0` et `1`. Les repères strictement identiques sont fusionnés. OmniRoute ne lance jamais de transcription à partir de ces métadonnées : les repères validés sont copiés dans le résultat décrit avec leur source, leur niveau de confiance et leur intervalle, puis présentés comme des observations non fiables aux côtés des légendes des images. Tout texte invalide, hors plage ou dépourvu de provenance est rejeté plutôt qu’intégré au flux de légendes. Les deux canaux de transcription du corps de la requête normalisent la provenance fournie en `client`, y compris les étiquettes `embedded` ou `audio-bridge` autodéclarées. Seul un adaptateur contrôlé par le serveur peut attribuer ces étiquettes fiables au moyen de l’argument réservé au code `trustedSource` ; un champ JSON de la requête ne peut pas atteindre cet argument. Le texte de transcription reste un contenu non fiable dérivé du média, quelle que soit sa provenance, et ne doit jamais déterminer l’autorisation.

Un appelant avancé peut fournir une piste `audioTranscript` pour la même vidéo ;
elle est traitée comme du texte fourni par le client, et non comme une preuve de
transcription par le serveur. La couche de fusion exécute les observations
visuelles et audio avec une échéance et un signal d’abandon communs, les ordonne
sur une chronologie commune, regroupe les doublons exacts et renvoie un résultat
partiel lorsqu’un seul côté aboutit. Une piste `audioTranscript` non valide se
dégrade en ce résultat partiel — la description visuelle est conservée et la
branche audio enregistre un code d’échec assaini — au lieu de faire échouer toute
la vidéo. La disponibilité de chaque branche, l’indicateur de résultat partiel
et les codes d’échec assainis sont conservés dans le résultat décrit, dans les
métadonnées du garde-fou (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), dans les métadonnées du cache de résultats et dans
les compteurs de fusion du pont. Le chemin par défaut du pont vidéo n’appelle
pas de conversion de la parole en texte et ne télécharge pas une seconde copie
du média ; sans cette piste explicite, il reste limité à la vidéo.

**Conservation des transcriptions (#12150 P1).** Cela s’applique automatiquement
chaque fois que le pont vidéo (lui-même facultatif) affiche un repère de
transcription — il n’existe aucun indicateur de conservation distinct. Lorsqu’une
requête affiche un quelconque repère de transcription (un `transcript` déclaré
par l’appelant ou un `audioTranscript` fusionné), le garde-fou le marque comme
`videoBridgeObserved` et produit une copie expurgée de la description vidéo —
un rendu identique dans lequel le corps de texte libre de chaque repère est
remplacé par `[redacted-video-transcript]`, obtenu en substituant le champ
structuré du repère avant l’assemblage de la chaîne (jamais en analysant le texte
aplati, afin qu’aucun contenu de repère — malveillant ou ordinaire, y compris les
corps contenant `]`, tels que `[inaudible]`/`[music]` — ne puisse subsister). Le
corps de requête persisté dans le journal des appels remplace chaque partie
textuelle dérivée de la vidéo par cette copie expurgée, en les faisant
correspondre par égalité de contenu ; l’ancre `fullText` est relue à partir de la
charge utile finalisée du garde-fou précédant l’appel, de sorte que la
correspondance réussit toujours après que des garde-fous ultérieurs de la chaîne
(les dispositifs de masquage des données personnelles et des identifiants,
priorités 10/95) ont réécrit le texte de description sur place, ainsi qu’après
que l’injection de l’invite système, du transfert de contexte ou de la mémoire a
remodelé le tableau de messages. Le corps envoyé en amont au modèle reste
inchangé. Une requête observée ne renseigne également aucune mémoire durable
(l’extraction dérivée tant de la requête que de la réponse est ignorée), de
sorte que la propre réponse du modèle ne peut pas recopier le texte de la
transcription dans la mémoire.

**Champs vidéo bruts (#12430).** Lorsque le pont est activé et que la prise en
charge native de la vidéo est inconnue ou absente, les champs `transcript`/
`audioTranscript` définis activent également `videoBridgeObserved`, même après
un échec de description ou l’atteinte d’une limite `maxVideos`. Les valeurs
`null` et les chaînes vides comptent ; les champs absents et les métadonnées non
vidéo ne comptent pas. Les copies conservées expurgent ces champs ou omettent la
requête, et les caches/la mémoire sont contournés.

Sur ces chemins de repli, les repères valides fournis par l’appelant deviennent
des parties `text`/`input_text` prises en charge plutôt que des champs fournisseur
non standard. Les deux pistes fournies avec la requête restent des observations
`client` non fiables, avec un avertissement explicite indiquant que la vidéo n’a
pas été décrite et que les horodatages n’ont pas été vérifiés par rapport au
média. Les budgets existants de 256 repères/64 Kio au total et par repère
s’appliquent aux deux pistes conjointement ; les horodatages doivent respecter
le plafond de 600 secondes du courtier et toute fenêtre de focalisation fournie.
Les pistes non valides sont supprimées et ne sont pas transmises comme du texte
arbitraire ; une piste sœur valide peut tout de même être utilisée, sauf si leur
budget combiné est dépassé. Les champs nuls/vides n’ajoutent aucun texte. Ce
mécanisme de repli n’ajoute aucune récupération de média ni aucune transcription.
Les champs d’extension de transcription sont supprimés du conteneur vidéo de
repli ainsi que de ses objets `video_url`/`source`. La liste d’autorisation du
protocole OpenAI reste stricte ; les conteneurs vidéo dont la prise en charge
native est inconnue restent disponibles, tandis que les cibles connues comme
étant uniquement textuelles conservent des marqueurs sûrs. Des copies expurgées
structurées protègent le texte de transcription ajouté, tandis que la requête
d’origine appartenant à l’appelant reste inchangée. Les cibles avec prise en
charge native et les ponts désactivés conservent leur comportement de
contournement existant.

Les autres copies conservées utilisent le même signal de requête observée.
L’instantané brut de la requête client antérieur au garde-fou, la requête en
attente en mémoire et le journal des requêtes rejetées précocement remplacent
structurellement les champs de transcription dans les parties vidéo ; les
invites sous forme de chaînes générées par les étapes du pipeline et le
transfert de contexte sont expurgés au niveau du récepteur du corps de requête
persisté. Le marqueur persistant `video_content_removed` fait échouer de manière
sécurisée la continuation `previous_response_id`, plutôt que de reconstruire un
texte qui a été intentionnellement supprimé. Si une requête observée perd sa
copie expurgée propre à chaque partie avant la journalisation, ou si ne serait-ce
qu’une seule copie vidéo parmi plusieurs ne correspond plus après des mutations
ultérieures de la requête, le corps de requête conservé est entièrement omis au
lieu de conserver une transcription partiellement expurgée.

Pour une requête observée, une réponse du modèle peut citer n’importe quelle
partie de la transcription sans limite structurée de repère. Son `responseBody`
persisté dans le journal des appels est donc remplacé par un marqueur d’omission ;
l’artefact détaillé du pipeline (qui peut inclure les corps en amont/du client et
les fragments de flux) n’est pas conservé. Les caches sémantique,
d’idempotence et de relecture du raisonnement contournent les lectures et les
écritures pour cette requête. La requête adressée au fournisseur et la réponse
visible par le client restent inchangées. Les octets de maintien de connexion
précoces sont retirés du tampon temporaire lorsque l’artefact détaillé est omis.
L’avertissement EventStream mal formé de Kiro indique uniquement le nombre
d’octets de la charge utile, jamais son contenu ni l’erreur brute de l’analyseur
JSON.
Cela ne signifie pas que tous les diagnostics sans rapport issus des
fournisseurs/plugins ont été audités ; l’examen plus large des récepteurs de
données conservées est suivi dans #11658.

Le cycle de vie interne de `/api/modality-bridge/video/drilldown` constitue un substrat de cache distinct, accessible en boucle locale et authentifié par jeton. Chaque opération requiert également un ID principal opaque canonique. Avant qu'un appelant de production ne soit activé, il doit dériver cet ID du locataire authentifié et ne doit jamais transmettre une valeur choisie par le client. Les clés de cache lient ce principal aux ID canoniques de session et de référence vidéo, ne stockent que les clés dérivées par SHA-256 et limitent les lectures comme les suppressions au même principal. Le cache stocke au maximum 16 images JPEG dérivées par entrée, les expire après dix minutes et prend en charge les lectures bornées `start`/`end` ou la suppression explicite d'une session.

Chaque principal est limité à 16 entrées et à 64 Mio de données JPEG canoniques. Ces limites sont indépendantes du plafond global de 64 entrées/256 Mio : la pression exercée par le quota d'un principal n'évince que les entrées les moins récemment utilisées de ce principal avant que l'éviction LRU globale ne soit envisagée. Les entrées expirées sont retirées de la comptabilisation du principal et de la comptabilisation globale lors de l'activité du cache, tandis qu'une annulation ou un échec de validation n'enregistre aucun remplacement partiel.

Le cache rejette le Base64 non canonique, le remplissage excessif, les médias non JPEG, les JPEG mal formés ou tronqués, ainsi que les JPEG qui génèrent un avertissement lors d'un décodage `sharp` borné de l'image complète. Il réencode chaque image acceptée sous forme de JPEG canonique, détermine la largeur et la hauteur à partir des octets décodés au lieu de faire confiance aux champs de l'appelant, et supprime tout octet polyglotte final au lieu de le conserver. Seul le tampon compressé canonique borné est imputé aux deux quotas. La limite JSON sur le canal tient compte de la surcharge Base64 pour le plafond d'entrée décodée de 32 Mio. Chaque dérivation stockée consigne le format et la résolution JPEG validés, la politique d'échantillonnage, la version de dérivation, l'heure de création, le hachage de contenu calculé par le serveur, ainsi que la référence parente hachée et le hachage du contenu parent fourni par l'appelant de confiance. L'annulation est vérifiée entre les phases asynchrones de décodage et de hachage, avant l'enregistrement atomique dans le cache.

Cette tranche ne connecte pas encore de producteur de production à la route et ne permet pas la sélection de variantes multirésolutions. Le chemin transparent des requêtes Video Bridge n'entraîne donc aucun travail supplémentaire, tandis que la dérivation du principal liée au locataire et le cycle de vie multirésolution FU-08 complet restent explicitement des travaux de suivi, plutôt que d'être documentés comme un comportement achevé.

Les images sont légendées séquentiellement avec le modèle Video configuré. Une substitution Video vide hérite du paramètre Vision ; si les deux sont vides, l'auto-routeur Vision sélectionne le modèle effectif compatible avec la vision. Les légendes produites remplacent la partie d'origine par un préfixe stable `[Video description:` qui signale également que le texte est une observation non fiable dérivée du média et indique aux modèles en aval de ne pas suivre les instructions présentes dans le média. Les clés du cache de légendes d'images incluent les octets JPEG, l'invite, l'horodatage et le modèle effectif ; seules les légendes produites avec succès sont mises en cache. Les entrées du cache conservent le modèle producteur réellement utilisé avec succès, y compris un modèle de repli ; le pont indique `mixed` lorsque différentes images ont été produites par différents modèles. Un accès réussi au cache réutilise cette identité de producteur au lieu de la réétiqueter comme le plan de routage demandé. Le cache des résultats pour la vidéo entière est indexé sur chaque entrée susceptible de modifier la sortie — l'invite, le modèle effectif, la politique d'échantillonnage, le nombre d'images, le mode d'analyse sémantique, l'empreinte SHA-256 de l'indication de focalisation normalisée, la fenêtre de focalisation, `transcript`, `audioTranscript` et l'indicateur de planche-contact — de sorte que la modification de l'une de ces dimensions provoque une absence dans le cache, jamais la réutilisation d'un résultat obsolète. La version de la politique de déduplication visuelle, son seuil et le nombre borné d'images candidates sont également explicites dans la clé et les métadonnées du cache de résultats ; une modification de la politique ne peut donc pas réutiliser une description obsolète de la vidéo entière. Les métadonnées v4 du cache de résultats conservent le mode et l'empreinte, mais jamais la tâche utilisateur brute. Les métadonnées de garde-fou indiquent à la fois les modes d'analyse demandé et effectif ; un mode `focused` demandé sans texte utilisateur exploitable est signalé comme étant effectivement `full`.

Le garde-fou extrait chaque partie vidéo prise en charge, mais n'en décrit pas plus de `modalityBridgeVideoMaxVideos`. Pour une cible dont il est prouvé que `supportsVideo === false`, les vidéos en échec et celles dépassant la limite deviennent des marqueurs textuels sûrs explicites, afin qu'aucune vidéo brute ne subsiste. Lorsque la capacité est inconnue, ces parties conservent leur conteneur vidéo ; toute transcription de repli suit la conversion textuelle bornée décrite ci-dessus. Les cibles pour lesquelles `supportsVideo === true` contournent le pont. Le signal d'abandon de la requête client se propage au téléchargement, à la file d'attente du courtier, aux sous-processus et aux appels de légendage ; les abandons interrompent le traitement entre les vidéos et ne reviennent jamais par défaut au média brut.

Les paramètres d'exécution sont stockés dans la base de données et validés par Zod :

| Clé                                 | Valeur par défaut | Plage / comportement                                                                                               |
| ----------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`           | Exécution facultative, activation explicite                                                                        |
| `modalityBridgeVideoAnalysisMode`   | `"full"`          | `full` conserve les légendes génériques ; `focused` utilise le contexte borné et non fiable du dernier utilisateur |
| `modalityBridgeVideoModel`          | `""`              | Hérite du modèle Vision Bridge                                                                                     |
| `modalityBridgeVideoFrameCount`     | `8`               | 1–16                                                                                                               |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`       | `uniform`, `scene_aware` ou `segment_aware` proportionnel ; en cas d’échec du détecteur, repli sur `uniform`       |
| `modalityBridgeVideoMaxVideos`      | `1`               | 1–4                                                                                                                |
| `modalityBridgeVideoTimeout`        | `120000`          | 1000–120000 ms                                                                                                     |

Les anciennes valeurs persistées du délai d’expiration Video supérieures à 120 secondes sont plafonnées à
l’échéance du broker ; les nouvelles écritures de paramètres dépassant cette limite sont rejetées.
`GET /api/modality-bridge/video/runtime` exige une localité loopback fiable et marquée
avant l’authentification ou la vérification de l’environnement d’exécution, puis exige une
authentification de gestion. Il renvoie uniquement `available`, les versions assainies de FFmpeg/ffprobe et un motif
fixe lorsque l’environnement d’exécution est indisponible. Le point de terminaison interne d’extraction n’est pas
une API publique de téléversement : la saturation de la file d’attente renvoie `503` avec `Retry-After`, la
déconnexion d’un appelant renvoie `499` et l’échéance fixe du broker renvoie `504`. Les réponses converties ajoutent
`video->text;model=<visionModel>;parts=<videos>` à l’en-tête central
`x-omniroute-modality-bridge` sans supprimer les segments Vision ou Audio.

### Masqueur de PII (`piiMasker.ts`)

S’exécute lors des **deux** étapes.

- **`preCall`** clone la charge utile, parcourt `system`, `messages`, `input` et
  `prompt` (y compris les éléments sous forme de chaînes simples), puis applique `processPII()` (depuis
  `@/shared/utils/inputSanitizer`) aux champs `content`/`text` de type chaîne. Lorsque
  `PII_REDACTION_ENABLED=true`, les PII détectées sont expurgées de la charge utile
  sortante. Ce fonctionnement est indépendant de `INPUT_SANITIZER_MODE` (qui contrôle uniquement
  la politique relative aux injections de prompt). Lorsque l’expurgation est désactivée, l’appel enregistre le nombre
  de détections sans réécrire le contenu.
- **`postCall`** effectue un clone profond de la réponse, exécute `sanitizePIIResponse()` ainsi que
  le masqueur correspondant à la structure de l’API Responses (`maskResponsesOutput` — couvre
  `output_text` et `output[].content[].text`). Si une expurgation est effectuée, la
  réponse modifiée remplace l’originale.

Le garde-fou ne bloque jamais ; il se contente d’annoter (`meta.detections`,
`meta.redacted`) ou de réécrire.

#### Sélection par type, motifs personnalisés et compteurs de détection

**Tableau de bord → Paramètres → Sécurité → Masquage des PII** permet de choisir _ce qui_ est masqué. Cela
n’active pas le masquage : celui-ci dépend toujours de `PII_REDACTION_ENABLED` (requête) et de
`PII_RESPONSE_SANITIZATION` (réponse + SSE), tous deux désactivés par défaut.

- **Sélection par type** — les identifiants intégrés sont répertoriés dans
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Une valeur non définie signifie que tous les
  types sont sélectionnés (comportement antérieur à l’existence de ce paramètre). Le motif
  `ssn_us` du moteur de requêtes correspond à `ssn`. Les modèles (Minimal, Standard, Financial,
  Brazilian, USA, Full) servent uniquement à remplir les cases à cocher de l’interface utilisateur.
- **Motifs personnalisés** — jusqu’à 20 motifs sous forme d’expressions régulières ou de caractères génériques (`*` = jusqu’à 64
  caractères hors espaces, `?` = un caractère). Les correspondances deviennent `[CUSTOM_REDACTED]`.
  Chaque motif passe par `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`) : 500 caractères au maximum, indicateurs limités
  à `g i m s u`, compilation obligatoire, validation obligatoire par `safe-regex` (rétrogradation
  catastrophique) et interdiction de correspondre à une chaîne vide ou à un espace réservé d’expurgation.
  Un motif non valide est refusé lors de l’enregistrement et du test, et une ligne stockée
  non valide est ignorée à l’exécution au lieu d’être compilée. Les motifs personnalisés ne
  s’exécutent que lorsque le masquage est activé.
- **Compteurs de détection** — nombres par type (jamais les valeurs correspondantes), conservés en
  mémoire et réinitialisés au redémarrage (`src/lib/pii/piiDetectionStats.ts`). Ils
  n’augmentent que lorsque le masquage est activé.

Les paramètres sont stockés dans la table `key_value` (espace de noms `pii_settings`,
`src/lib/db/piiSettings.ts`) et lus via un cache de 1 s. API :

| Méthode | Chemin                   | Objectif                                                                       |
| ------- | ------------------------ | ------------------------------------------------------------------------------ |
| `GET`   | `/api/settings/pii`      | État des indicateurs, `enabledTypes`, `customPatterns`, compteurs de détection |
| `PUT`   | `/api/settings/pii`      | Remplacer `enabledTypes` (`null` = tous) et/ou `customPatterns`                |
| `POST`  | `/api/settings/pii/test` | Tester à blanc un motif sur un échantillon de 8 Ko maximum ; rien n’est stocké |

Les trois nécessitent une authentification de gestion et valident le corps avec Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Injection de prompt (`promptInjection.ts`)

Détecte les structures adverses dans le contenu fourni par l’utilisateur et applique la
politique configurée. Le comportement est déterminé par les variables d’environnement et les options du
constructeur :

| Paramètre        | Variable d’environnement                                                                              | Valeur par défaut | Effet                                                                                                                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Activé           | `INPUT_SANITIZER_ENABLED`                                                                             | `true`            | Lorsque la valeur est `false`, le garde-fou court-circuite.                                                                                                                                                                         |
| Mode             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`            | Politique d’injection : `block`, `warn` ou `log`. (`redact` est accepté pour la rétrocompatibilité, mais ne supprime **pas** le texte d’injection ; la réécriture des PII de la requête est contrôlée par `PII_REDACTION_ENABLED`.) |
| Seuil de blocage | Option `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`            | Sévérité minimale requise pour bloquer. Avec la valeur par défaut, la sévérité moyenne est uniquement observée.                                                                                                                     |

**Priorité des modes** (`getMode`) : `options.mode` de l’appelant →
**remplacement par l’indicateur de fonctionnalité en BDD** `INJECTION_GUARD_MODE` (Tableau de bord → Paramètres →
Indicateurs de fonctionnalité) → variable d’environnement `INJECTION_GUARD_MODE` → variable d’environnement `INPUT_SANITIZER_MODE` →
`warn`. Un remplacement effectué depuis le tableau de bord prévaut donc sur les variables d’environnement, ce qui permet à l’interface
des indicateurs de fonctionnalité de contrôler le garde-fou en cours d’exécution (sans redémarrage). La lecture en BDD est à sécurité intégrée :
en cas d’erreur, le garde-fou revient au comportement fondé sur les variables d’environnement et, lorsqu’aucun
remplacement n’est défini, le comportement est identique à une résolution reposant uniquement sur les variables d’environnement.

Sources de détection :

1. `sanitizeRequest()` provenant de `@/shared/utils/inputSanitizer` (ensemble partagé de détecteurs
   utilisé ailleurs dans le pipeline).
2. `DEFAULT_GUARD_PATTERNS` intégrés (actuellement `system_override_inline` et
   `markdown_system_block`, tous deux de sévérité `high`).
3. `customPatterns` facultatifs transmis via les options du constructeur (chaînes, expressions régulières
   ou enregistrements `{ name, pattern, severity }`).

Lorsque `mode === "block"` **et** qu’au moins une détection atteint le seuil de
sévérité, `preCall` renvoie `{ block: true, message: "Request rejected:
suspicious content detected" }`. Dans les modes `warn`/`log`, le garde-fou consigne l’événement, mais
autorise l’appel. La fonction utilitaire partagée `evaluatePromptInjection()` est également exportée
pour les appelants qui doivent évaluer des prompts sans passer par le registre.

**Limite d’analyse (v3.8.20) :** le détecteur inspecte uniquement les **16 premiers Ko** du
texte concaténé des prompts — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 octets) dans
`src/shared/utils/inputSanitizer.ts`. `detectInjection()` et
`evaluatePromptInjection()` appliquent tous deux `slice(0, MAX_INJECTION_SCAN_BYTES)` avant d’exécuter
la boucle de motifs. Les directives d’injection se trouvent près du début d’une entrée ; cette limite
borne donc l’utilisation du processeur et du ramasse-miettes par les expressions régulières sur les charges utiles de plusieurs centaines de Ko sans affaiblir la détection (cf.
#3932, #4041).

### Masqueur d’identifiants (`credentialMasker.ts`)

S’exécute lors des **deux** étapes, en dernier dans la chaîne par défaut (priorité `95`). Masque
les motifs bien connus de clés d’API et de jetons secrets dans la charge utile sortante (contenu des messages,
arguments des appels d’outils, résultats des outils) **ainsi que** dans la réponse du fournisseur, afin qu’un
identifiant collé dans un prompt (ou renvoyé par un résultat d’outil) ne soit transmis
ni au fournisseur en amont ni au client.

- **Sur activation explicite uniquement**, selon la même convention que le masquage des PII (règle absolue adjacente à la règle nº 20) :
  désactivé sauf si `settings.credentialRedactionEnabled === true` **ou**
  `CREDENTIAL_REDACTION_ENABLED=true`. Lorsqu’il est désactivé, le garde-fou ne fait rien —
  il ne bloque et ne réécrit jamais.
- `redactCredentials()` parcourt l’intégralité de l’arborescence de la charge utile/réponse (`walkValue()`,
  avec protection contre la pollution de prototype et contre les cycles via `WeakSet`) et remplace les correspondances par
  un espace réservé `[REDACTED:<type>]`, en clonant uniquement les branches réellement
  modifiées.
- `CREDENTIAL_PATTERNS` couvre les clés des fournisseurs de LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), les jetons VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), les clés de paiement (Stripe, Square), les clés
  cloud (clé d’accès AWS, Twilio, SendGrid, Mailgun), les clés privées/JWT,
  les chaînes de connexion contenant des identifiants (`mongodb://user:pass@...`, etc.), ainsi
  qu’un motif générique de valeur d’en-tête `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Les clés prenant la forme d’en-têtes (`authorization`, `x-api-key`, `api-key`,
  `apikey`) sont masquées structurellement (la valeur uniquement, avec conservation du préfixe de schéma comme
  `Bearer `/`Basic `), plutôt qu’au moyen de l’expression régulière générique appliquée au texte.
- Le garde-fou ne bloque jamais ; il se contente de réécrire (`modifiedPayload` /
  `modifiedResponse`) et d’annoter (`meta.credentialsRedacted`, `meta.count`).

Protection contre les régressions : `tests/unit/credential-masker-guardrail.test.ts`.

## Contrat de base (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true interrompt immédiatement la chaîne
  message?: string; // affiché en cas de blocage
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // renvoyé par preCall pour réécrire la requête
  modifiedResponse?: TValue; // renvoyé par postCall pour réécrire la réponse
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Un garde-fou signale « aucune modification » en renvoyant soit `void`, `{}`, soit
`{ block: false }`. Le renvoi d'un `modifiedPayload`/`modifiedResponse` remplace
la valeur qui parcourt la chaîne pour les garde-fous suivants.
`signal?: AbortSignal` propage le cycle de vie de l'appelant aux garde-fous. L'abandon d'une requête constitue l'exception délibérée au comportement fail-open : les ponts multimédias interrompent leur traitement et effectuent le nettoyage sans restaurer les données multimédias brutes vers une cible dont on sait qu'elle ne les prend pas en charge.

## Registre (`registry.ts`)

Le singleton `guardrailRegistry` expose :

- `register(guardrail)` — ajoute un garde-fou (ou le remplace selon son nom normalisé) et
  retrie les garde-fous par `priority` croissante.
- `clear()` / `list()` — utilitaires d'administration.
- `runPreCallHooks(payload, context)` — parcourt les garde-fous actifs, fait transiter
  le contenu via `modifiedPayload` et s'arrête au premier `block: true`.
- `runPostCallHooks(response, context)` — même flux côté réponse.
- `resetGuardrailsForTests({ registerDefaults })` — efface l'état et, facultativement,
  réenregistre les garde-fous par défaut afin d'assurer une isolation propre des tests.

Les deux exécuteurs renvoient `{ blocked, payload|response, results, guardrail?, message? }`,
où `results` est un tableau d'enregistrements `GuardrailExecutionResult` comprenant
les champs `blocked`, `skipped`, `modified`, `error` et `meta` propres à chaque garde-fou,
utiles pour le traçage.

### Désactivation des garde-fous par requête

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agrège une
liste dédupliquée des noms de garde-fous qui doivent être ignorés pour la
requête actuelle. Sources (toutes facultatives et fusionnées) :

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` dans le corps de la requête (au niveau supérieur)
- `metadata.disabledGuardrails` dans le corps de la requête
- En-tête `x-omniroute-disabled-guardrails` (ou l'ancien
  `x-disabled-guardrails`)

Les valeurs peuvent être des tableaux de chaînes ou une chaîne séparée par des virgules ; les noms sont
normalisés en minuscules au format kebab-case (`pii_masker` → `pii-masker`). Le résultat
est transmis au registre via `context.disabledGuardrails`, qui ignore
les garde-fous correspondants (`skipped: true` dans `results`).

## Ordre d’exécution

Pour chaque requête transitant par `src/sse/handlers/chat.ts` et
`open-sse/handlers/chatCore.ts` :

1. `resolveDisabledGuardrails(...)` construit la liste des éléments à ignorer à partir de la clé API, du corps
   et des en-têtes.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` exécute les garde-fous par ordre croissant
   de priorité :
   - Les garde-fous désactivés sont enregistrés comme `skipped`.
   - La méthode `preCall` de chaque garde-fou peut réécrire la charge utile via `modifiedPayload`.
   - Le premier `block: true` interrompt la chaîne et le gestionnaire renvoie
     une réponse de rejet du garde-fou.
3. La charge utile (potentiellement réécrite) passe dans le routage combiné et l’envoi
   en amont.
4. Une fois la réponse assemblée, `guardrailRegistry.runPostCallHooks(...)`
   exécute la même chaîne sur la réponse. Ici, `block: true` supprime la réponse
   en amont.

Les garde-fous qui lèvent une exception sont enregistrés avec `error: <message>` et consignés via
`logger.warn`, mais la chaîne continue — par conception, les erreurs n’entraînent pas de blocage.

## Configuration

Variables d’environnement lues par les garde-fous intégrés :

| Variable                              | Utilisée par           | Effet                                                                                                                                                              |
| ------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`     | Définissez-la sur `false` pour désactiver entièrement la détection.                                                                                                |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`     | Politique d’injection : `warn`, `block` ou `log`. L’ancienne valeur `redact` ne réécrit pas le texte d’injection.                                                  |
| `INJECTION_GUARD_MODE`                | `prompt-injection`     | Mode du garde-fou contre les injections ; il s’agit également d’un indicateur de fonctionnalité en BDD qui **remplace** les variables d’environnement (BDD > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`     | Gravité minimale rejetée par `MODE=block` : `high` (par défaut), `medium` ou `low`.                                                                                |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`     | Ancien alias de `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                                                 |
| `PII_REDACTION_ENABLED`               | `pii-masker`           | Lorsque la valeur est `true`, les données personnelles de la requête sont masquées (indépendamment du mode d’injection).                                           |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (en aval) | Contrôle le comportement du masqueur côté réponse.                                                                                                                 |

Les garde-fous Modality Bridge lisent la configuration d’exécution depuis le magasin de paramètres
adossé à la BDD (`getSettings()`), et non depuis les variables d’environnement. Les clés principales de Vision sont
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` et
`modalityBridgeCacheMaxEntries`. Les anciennes clés
`visionBridge*` ne sont acceptées que comme mécanisme documenté de repli en lecture pour un cycle ;
les écritures depuis le tableau de bord utilisent les clés principales. Les valeurs par défaut et le résolveur
de repli se trouvent dans `src/shared/constants/modalityBridgeDefaults.ts`, tandis que les anciennes
constantes sont conservées dans `src/shared/constants/visionBridgeDefaults.ts`.

Audio utilise `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` et `modalityBridgeAudioMaxClips`, ainsi que les paramètres partagés
`modalityBridgeCache*`. Audio ne dispose d’aucun mécanisme de repli vers d’anciennes clés, car celles-ci
ont été introduites avec le schéma Modality Bridge.

Video utilise `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` et
`modalityBridgeVideoTimeout`, ainsi que les paramètres partagés `modalityBridgeCache*`.
Il est désactivé par défaut, car FFmpeg/ffprobe sont des dépendances opérationnelles
facultatives et que le sous-titrage des images ajoute de la latence et augmente le coût du modèle.

## Garde-fous personnalisés

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Étapes :

1. Créez `src/lib/guardrails/myGuardrail.ts` en étendant `BaseGuardrail`.
2. Implémentez `preCall` et/ou `postCall`.
3. Enregistrez-le lors de l’importation (ajout depuis `registerDefaultGuardrails`) ou
   appelez `guardrailRegistry.register(...)` à l’exécution — le registre remplace
   tout garde-fou existant portant le même nom normalisé.
4. Ajoutez des tests sous `tests/unit/` (exemples existants :
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Tests

Utilisez `resetGuardrailsForTests()` entre les tests afin de repartir d’un état connu.
Passez `{ registerDefaults: false }` pour commencer avec un registre vide et
n’enregistrer que les garde-fous testés. Vision Bridge accepte l’injection de
dépendances (`deps.getSettings`, `deps.callVisionModel`) ; Audio Bridge expose les
points d’injection équivalents pour les paramètres, les capacités, la sélection du
modèle STT, la vérification des identifiants et la transcription. Les tests peuvent
donc couvrir les deux flux sans accès à une base de données ni au réseau.

## Voir aussi

- `src/lib/guardrails/` — implémentation
- `src/shared/utils/inputSanitizer.ts` — détecteur partagé utilisé pour
  l’injection de prompts et le masquage des informations personnelles
- `src/shared/constants/visionBridgeDefaults.ts` — valeurs par défaut de Vision Bridge et
  liste des modèles pour lesquels le pont est imposé
- `src/shared/constants/modalityBridgeDefaults.ts` — valeurs d’exécution par défaut partagées pour Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — couche orthogonale (disjoncteur, délais de récupération)
- `docs/reference/ENVIRONMENT.md` — référence complète des variables d’environnement

## Couverture des routes par le garde-fou contre les injections et red team (Phase 8 · Bloc D)

Le garde-fou contre les injections (`createInjectionGuard` / `withInjectionGuard`) couvre toutes les routes
qui acceptent des prompts utilisateur. Il respecte `INJECTION_GUARD_MODE` (`warn` par défaut = journalisation uniquement ;
`block` = renvoie une réponse HTTP 400 `SECURITY_001`).

| Type             | Routes                                                                                                                                               | Mode par défaut |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Texte (existant) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn            |
| Génératif        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn            |
| Données          | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn            |

L’extraction de texte (`extractMessageContents`) couvre `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red team (chaque nuit, `nightly-llm-security.yml`) :** promptfoo vérifie que chaque route bloque
le corpus OWASP-LLM lorsque `INJECTION_GUARD_MODE=block` ; garak exécute des sondes (ignorées en l’absence de secret).
`moderations` est inclus par souci de cohérence — les opérateurs utilisant le mode de blocage peuvent l’exempter via
`resolveDisabledGuardrails`.

Le workflow nocturne (`.github/workflows/nightly-llm-security.yml`, tâche cron + déclenchement
manuel) comporte deux jobs :

- **`promptfoo-guard` (bloquant)** — exécute `promptfoo eval -c promptfooconfig.yaml`
  avec `INJECTION_GUARD_MODE=block`. Chaque cas antagoniste (par exemple « ignorer toutes les
  instructions précédentes… », contournements de type DAN) vérifie que la réponse contient
  `error.code === "SECURITY_001"`, c’est-à-dire que le garde-fou a bien rejeté la requête.
- **`garak` (informatif)** — exécute garak avec `--probes promptinject,dan,leakreplay`
  sur une instance OmniRoute locale (`http://localhost:20128/v1`). Son exécution est conditionnée par un
  secret de fournisseur (`PROMPTFOO_PROVIDER_KEY`) ; il est ignoré proprement en son absence et se termine
  par `|| true`, afin de produire un rapport sans faire échouer la CI.

La couverture de l’utilitaire de garde-fou (`createInjectionGuard` / `withInjectionGuard`)
s’étend à toutes les routes `/v1` acceptant des prompts ; le texte du prompt est extrait de
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` par
`extractMessageContents()` dans `src/shared/utils/inputSanitizer.ts`.
