# Guardrails (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Source de vérité :** `src/lib/guardrails/`
> **Dernière mise à jour :** 2026-10-17 — v3.8.52 (ajout de [Couverture et limites](#coverage-and-limits) :
> quelles routes et quels chemins de réponse les hooks atteignent, les en-têtes de désactivation fusionnés (#16412), le
> mode de blocage d'injection comme limite obligatoire (#16413), et ce qui voit une réponse avant le post-appel)

Les guardrails appliquent des transformations de sécurité, de politique et de contenu à la frontière
entre OmniRoute et les fournisseurs amont. Chaque guardrail peut inspecter (et
éventuellement rejeter, transformer ou annoter) les charges utiles des requêtes (`preCall`) et
les réponses amont (`postCall`).

Le système est **fail-open** : si un guardrail lève une erreur pendant son exécution, le registre
enregistre l'erreur et continue avec le guardrail suivant plutôt que de faire échouer la
requête. Le blocage est une décision explicite (`block: true`), jamais un accident.
La seule exception est une requête interrompue : lorsque le `signal` de l'appelant est interrompu,
un guardrail qui lève une erreur rejette l'exécution du hook au lieu d'être ignoré.

Les hooks ne s'exécutent **pas** sur chaque route ni sur chaque réponse. Lisez
[Couverture et limites](#coverage-and-limits) avant de vous fier à un guardrail en tant que
contrôle de sécurité.

## Guardrails intégrés

Le registre charge automatiquement six guardrails par ordre de priorité à l'import
(voir `registry.ts` → `registerDefaultGuardrails()`) :

| Priorité | Nom                 | Étape(s)       | Fichier               |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Les numéros de priorité inférieurs s'exécutent **en premier**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Le modèle de base GLM 5.3 et `glm-5.3-{low,high,max}` ont des métadonnées
de registre/spécification explicites `supportsVision:false`. Les variantes GLM 5.3 Flash
restent des modèles à vision native. La route `/v1/messages` de Claude Code entre dans la
chaîne de guardrails pré-appel du `handleChat` partagé **avant** la traduction
Claude-vers-OpenAI ; les images imbriquées dans les résultats d'outil `Read` doivent être
décrites ou traitées avant que cette traduction ne les hisse en contenu `image_url`
OpenAI (#17069).

Intercepte les requêtes contenant des images destinées à des **modèles sans vision** et soit
réachemine toute la requête vers un modèle compatible avec la vision, soit remplace les
parties image par des descriptions textuelles produites par un modèle de vision configurable
avant l'appel amont. Cela permet aux fournisseurs texte-seul de gérer de manière transparente
les charges utiles multimodales.

Flux :

1. Ignorer si le modèle cible prend déjà en charge la vision (sauf s'il apparaît dans la
   liste de pontage forcé `isVisionBridgeForcedModel`).
2. Extraire les parties image via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), qui délègue au **détecteur de médias unifié**
   `detectMediaParts()` dans `open-sse/utils/mediaParts.ts` — la
   source de vérité unique partagée avec le filtre de compatibilité combo.
   L'extraction est limitée par liste blanche aux formes que `replaceImageParts` peut réinsérer
   (le contrat extraction↔remplacement) : `image_url` OpenAI, `source.type:"base64"` base64
   Anthropic, `source.type:"url"` URL Anthropic, et `input_image` de l'API Responses.
   Les images correspondantes imbriquées dans les `tool_result.content` de Claude Code
   et les sorties d'outil Responses sont également extraites et remplacées à leurs chemins
   d'origine ; les formes à indicateur seul relèvent du filtre combo et ne sont pas
   extraites.
   Ignorer si aucune n'est trouvée.
3. Résoudre la configuration d'exécution via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) : les nouvelles clés de paramètres
   `modalityBridge*` l'emportent ; les anciennes clés `visionBridge*` restent un **repli
   d'un cycle** (fenêtre de retour arrière). Ignorer avant tout parcours de média lorsque
   le pont est désactivé.
4. Le sélecteur de mode (`modalityBridgeVisionMode`, voir le tableau ci-dessous) décide
   entre réacheminement et description. Le réacheminement retourne `modifiedPayload` avec
   seul `model` échangé, plus le méta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Chemin de description : plafonner les images à `maxImages`, composer le prompt adapté à
   la tâche, consulter le cache de description, appeler le modèle de vision **en parallèle**
   (`Promise.allSettled`), et injecter des parties texte `[Image N]: <description>` à
   leur place. Une description échouée donne `null` : l'image brute est préservée pour
   les cibles inconnues ou compatibles vision (#4012), mais une **cible directe confirmée
   texte-seul** ou un combo sans vision reçoit un stub texte explicite
   `(unavailable — no vision-capable provider connected)` pour
   chaque image non décrite, y compris les échecs partiels et les images au-delà du
   plafond d'appels de description (#17069). Le repli de description de combo en cas
   d'échec total existant reste en place (#8430).
6. Retourner `modifiedPayload` + méta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Sélecteur de mode (`modalityBridgeVisionMode`)

| Mode       | Par défaut | Comportement                                                                                                                                                                                                                                                                                                                                           |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔          | Heuristique héritée, inchangée (#6640/#7204) : les modèles non-combo/`auto/` sont reroutés vers le meilleur modèle de vision, sauf si le modèle d'origine dispose déjà d'identifiants utilisables (auquel cas description) ; les cibles combo font toujours l'objet d'une description.                                                                 |
| `describe` |            | Toujours décrire — le bloc de reroutage est entièrement ignoré ; le modèle choisi par l'utilisateur répond toujours.                                                                                                                                                                                                                                   |
| `reroute`  |            | Forcer le reroutage : la protection conservant le modèle doté d'identifiants est contournée. La protection des identifiants de la **cible** de reroutage s'applique toujours — lorsqu'aucune cible de vision utilisable n'existe, le bridge bloque avec une erreur claire plutôt que de décrire ou d'envoyer des images brutes à une cible texte seul. |

Les modes forcés court-circuitent l'heuristique automatique **avant** son exécution ; le comportement `auto` est identique, octet pour octet, au garde-fou pré-PR-1.

#### Portée de la clé API (`visionBridgeKeyScope.ts`)

Lorsque la clé API de l'appelant restreint `allowedConnections`, les pools de
quota (`allowedQuotas`) ou les modèles (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), le bridge ne
choisit que des modèles de reroutage et de description que la clé est
autorisée à utiliser, sur des connexions que la clé peut utiliser. L'appel de
description passe alors toujours par la boucle locale (self-loop) d'OmniRoute
avec l'en-tête `x-omniroute-self-loop-key-id`, de sorte que la requête de
chat réceptrice applique à nouveau la politique de connexions et de modèles
de cette clé. `enforceApiKeyPolicy()` ne prend en compte cet en-tête qu'en
conjonction avec le bearer de la boucle locale, de sorte qu'il ne peut que
restreindre l'accès, et un id qui ne se résout pas est rejeté.

Si aucun modèle de vision n'est autorisé pour la clé, une **cible confirmée
texte seul** rejette localement la requête d'image avec un HTTP 400 clair au
lieu de transmettre les octets de l'image à un upstream incapable (#17069).
Pour les cibles dont la capacité de vision est inconnue ou native, le chemin
de description conserve son comportement fail-open antérieur (méta
`{ skipped: true, reason: "no_permitted_vision_model" }`). Les requêtes sans
clé, et les clés sans ces restrictions, se comportent exactement comme avant.

#### Prompt de description sensible à la tâche (`modalityBridgeVisionTaskAware`)

Par défaut **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
ajoute le texte du **dernier message utilisateur** (tronqué à 500 caractères)
au prompt de description de base, orientant la description vers ce que
l'utilisateur a réellement demandé (motif codex-vision-proxy) et demandant au
modèle de vision de transcrire le texte visible. Avec le flag désactivé — ou
en l'absence de texte utilisateur — le prompt de base est utilisé tel quel.

La requête compatible OpenAI propre à la boucle locale de description
(`callVisionModelSingle()` dans `visionBridgeHelpers.ts`) demande toujours
`image_url.detail: "high"` — inconditionnellement, pour chaque
appelant/fournisseur, sans dépendre d'aucun signal client. L'échantillonnage
en basse résolution dégrade la précision de l'OCR précisément pour la tâche
de transcription de texte demandée par ce prompt ; l'appel de description
lui-même demande donc toujours un niveau de détail élevé, quel que soit le
niveau de détail utilisé par la requête entrante d'origine. Cela n'affecte
que le corps de la requête interne de description ; cela ne change pas la
façon dont OmniRoute transmet le `image_url.detail` de l'appelant sur la
requête principale — cette valeur par défaut est appliquée séparément, et
uniquement pour les clients OpenCode détectés, dans `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). La branche au format filaire
Anthropic de la boucle locale de description n'a pas de champ `detail` et
n'est affectée par aucune des deux valeurs par défaut.

#### Plafond de sortie de la description (`modalityBridgeVisionMaxChars`)

| Clé                            | Par défaut | Plage            |
| ------------------------------ | ---------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`        | `0` ou 100–50000 |

`0` (par défaut) signifie **aucun plafond** — la description renvoyée par
`callVisionModel()` est transmise sans modification, préservant le
comportement existant. Toute valeur comprise entre 100 et 50000 tronque la
description avec un suffixe `…` avant qu'elle ne soit réinsérée sous la forme
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` dans
`src/lib/guardrails/visionBridge.ts`). Augmentez cette valeur pour les tâches
d'OCR riches en détails où le modèle en aval a besoin de la transcription
complète ; diminuez-la pour limiter la consommation de jetons des modèles de
vision bavards. Le champ du tableau de bord se trouve dans le panneau Avancé
de l'onglet Vision (`modality-bridge-max-chars` dans
`ModalityBridgeVisionTab.tsx`) et ramène toute valeur entre 1 et 99 au
plancher de 100 tout en laissant un `0` explicite inchangé — `0` est une
valeur Zod valide à part entière
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), et pas
simplement la valeur par défaut « non définie ».

#### Cache de description (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL en mémoire pour les sorties de description, partagé à
l'échelle du processus. Clé = `sha256(imageRef + composedPrompt +
configuredBridgeModel)` avec cadrage par préfixe de longueur (aucune
collision aux frontières de champs). La composante modèle est le modèle de
bridge **configuré**, et non le modèle qui a réellement répondu —
`callVisionModel` peut basculer en interne, et une clé par tentative
fragmenterait le cache. Les descriptions échouées ne sont jamais mises en
cache. Paramètres :

| Clé                             | Par défaut | Plage   |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### Normalisation des images distantes (récupération describe/base64 en self-loop)

Lorsque le bridge récupère lui-même une image **distante** — l'auto-appel
describe Anthropic et la conversion base64 au format wire de Claude
(`ensureBase64ImagesForClaudeWire`), tous deux via
`fetchRemoteImageAsDataUri()` dans `visionBridgeHelpers.ts` — l'URI de données
résultant est passé par `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) avant d'être intégré à la requête du
modèle de vision. Les images surdimensionnées sont réduites à un **bord long
de 2048 px** (correspondant à la limite de redimensionnement qu'OpenAI/Anthropic
appliquent déjà côté serveur), ce qui réduit les octets téléversés et la
latence sans changer ce que le modèle de vision voit. Le redimensionnement
utilise `sharp`, chargé via un import dynamique : sur une plateforme où son
binaire natif ne parvient pas à se charger, `normalizeDataUri()` **ne lève
jamais d'erreur** — il se replie sur une transmission directe des octets
d'origine, de sorte que le chemin describe/conversion-base64 continue
toujours de fonctionner. Les octets non-image (une récupération qui n'a pas
renvoyé d'image décodable) sont également transmis tels quels. Cette
normalisation est limitée aux images que le bridge récupère pour son propre
auto-appel — elle n'est jamais appliquée à la charge utile brute transmise
par l'appelant, conformément au principe de mutation strictement opt-in
(règle stricte n° 20).

#### Schéma de paramètres + migration

Les nouvelles clés `modalityBridge*` sont validées par Zod dans
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`) :
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, le trio
`modalityBridgeCache*`, et le groupe `modalityBridgeAudio*` utilisé par
l'Audio Bridge. La migration `141_modality_bridge_settings.sql` copie les
valeurs héritées existantes `visionBridge*` vers les nouvelles clés
correspondantes (idempotente, n'écrase jamais une valeur `modalityBridge*`
définie par l'opérateur) ; les clés héritées restent acceptées en tant que
solution de repli en lecture pendant un cycle de publication.

#### En-tête de transparence + statistiques

Les réponses transformées par describe portent
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(construit par `buildModalityBridgeHeader()` dans
`modalityBridge/bridgeStats.ts`, apposé par `withModalityBridgeHeader()` dans
`src/sse/handlers/chatHelpers.ts`). Les requêtes réacheminées ne reçoivent
**aucun** en-tête — la charge utile n'a pas été touchée et le changement de
modèle est déjà visible dans le champ `model` du corps de la réponse.

`GET /api/modality-bridge/stats` (authentification de gestion, même niveau
que `GET /api/settings`) renvoie les compteurs en mémoire par modalité
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` pour `vision`, `audio` et
`video`. `averageLatencyMs` utilise `latencySamples`, et non l'ensemble des
tentatives, comme dénominateur ; une opération sans mesure de temps ne fabrique
pas un échantillon de zéro milliseconde. `bridged` reste l'alias rétrocompatible
des conversions réussies ; les tentatives échouées ne l'incrémentent pas.
Les compteurs sont réinitialisés au redémarrage du processus, par conception
(télémétrie, pas comptabilité).

#### Configuration du tableau de bord

La page dédiée du tableau de bord est
`/dashboard/settings/modality-bridge`. Ses onglets `Vision`, `Audio` et
`Video` adressables par URL préservent les paramètres de requête lors du
changement de la valeur `tab`. L'onglet Vision expose l'activation, le mode,
la sélection du modèle (y compris la valeur automatique par défaut), les
invites sensibles à la tâche, les limites avancées de
timeout/images/longueur de description/cache, les compteurs d'exécution et
une requête d'exemple encadrée. L'onglet Audio est également actif : il
expose l'activation, un sélecteur de modèle STT uniquement avec Auto, les
limites de timeout/durée maximale de clip, les compteurs audio et un test
d'exemple `input_audio`. L'onglet Video est fonctionnel : il rapporte l'état
d'exécution de FFmpeg/ffprobe — l'un des quatre états d'interface explicites
(`unknown` pendant que la sonde est en cours ou n'a pas pu aboutir,
`restricted` sur un hôte de tableau de bord non-loopback où la sonde est
ignorée côté client, `unavailable` une fois sondé et confirmé absent, ou
`available` avec les versions de FFmpeg/ffprobe) —, persiste les limites
d'activation/modèle/images/vidéo/timeout, filtre le sélecteur de modèle aux
modèles capables de vision et expose les compteurs vidéo.

L'ancienne carte Vision Bridge sous les paramètres IA est un lien de
compatibilité vers la nouvelle page ; elle ne possède plus de second
exemplaire du formulaire. Media Providers relie également les flux de travail
Image-to-Text et Speech-to-Text aux onglets Modality Bridge correspondants
sans supprimer le bac à sable Speech-to-Text existant.

**Contournement d'admission du self-loop :** lorsque l'appel describe passe
par le self-loop `/v1` propre à OmniRoute (modèle de fournisseur non
standard), la sous-requête envoie `x-omniroute-admission-bypass: internal`
et est authentifiée avec l'identifiant self-loop résolu — la sentinelle
locale `sk_omniroute` en mode local, ou la clé d'environnement
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurée par l'opérateur (#1350),
afin que les déploiements avec `REQUIRE_API_KEY=true` puissent toujours
exécuter l'appel describe. Le contournement n'est honoré que pour ces
identifiants exacts, de sorte que les clients externes ne peuvent pas
utiliser l'en-tête pour sauter l'admission.

Les valeurs par défaut héritées résident dans
`src/shared/constants/visionBridgeDefaults.ts` ; les nouvelles valeurs par
défaut de mode/sensibilité à la tâche/cache et le résolveur de paramètres
résident dans `src/shared/constants/modalityBridgeDefaults.ts`. Le garde-fou
expose une option de constructeur `deps` afin que les tests puissent injecter
de fausses implémentations de `getSettings` et `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Intercepte les requêtes de chat porteuses d'audio avant qu'elles n'atteignent
une cible qui n'est pas connue pour accepter l'entrée audio. Il ne réachemine
jamais la requête de chat : les parties audio sont transcrites via le
point de terminaison multipart compatible OpenAI existant et le modèle de
chat choisi continue avec les transcriptions textuelles.

Flux :

1. Résout `supportsAudio` via `getResolvedModelCapabilities()`. Les métadonnées
   explicites du registre de fournisseurs prévalent, suivies des métadonnées
   statiques du modèle, puis de `modalities_input` synchronisé. Une liste
   d'entrées déclarée sans `audio` vaut `false` ; en l'absence de preuve de
   capacité, la valeur reste `null`. `false` et `null` activent tous deux le
   pont conservateur, tandis que `true` le contourne.
2. Résout les paramètres `modalityBridgeAudio*` et extrait les parties audio de
   premier niveau pouvant être extraites par découpe de chaque message via le
   détecteur partagé `detectMediaParts()`. Les formats de transmission pris en
   charge sont `input_audio` d'OpenAI, `audio_url` et
   `source.media_type: "audio/*"`. L'audio imbriqué est détecté pour le routage
   mais n'est pas supprimé par le chemin de découpe. Le travail est plafonné par
   `modalityBridgeAudioMaxClips` ; les parties ultérieures restent intactes.
3. Respecte un `provider/model` configuré, ou laisse `selectAudioBridgeModel()`
   parcourir `AUDIO_TRANSCRIPTION_PROVIDERS` dans l'ordre stable du catalogue et
   sélectionner le premier modèle disposant d'identifiants de fournisseur actifs
   utilisables.
4. `callAudioTranscription()` convertit l'audio base64/data-URI en un `file`
   multipart, ou télécharge une `audio_url` distante via le garde-fou sortant
   limité aux adresses publiques, avec épinglage DNS et une limite de 25 Mo. Il
   envoie ensuite le fichier et le modèle sélectionné en POST vers la boucle
   locale (self-loop) `/v1/audio/transcriptions`, authentifiée avec
   `resolveSelfLoopBearer()`. La route de transcription existante effectue la
   recherche normale des identifiants, la gestion du cooldown et des limites de
   débit, ainsi que la répartition vers les fournisseurs.
5. Les appels réussis remplacent leurs parties par `[Audio N]: <transcript>`.
   Les appels s'exécutent avec `Promise.allSettled` : un échec individuel
   préserve la partie audio d'origine (contrat #4012). Si tous les appels
   échouent et que la cible est avérée `supportsAudio === false`, les parties
   deviennent `[Audio N]: (unavailable — no STT provider connected)` (contrat
   #8430). Pour une cible inconnue (`null`), un résultat entièrement en échec
   reste intact. Une cible avérée texte uniquement, sans identifiant STT
   utilisable, reçoit le même stub explicite sans émettre d'appel réseau.

Les transcriptions réussies utilisent le cache LRU/TTL Modality Bridge à
l'échelle du processus. La clé combine la référence audio, le libellé
d'opération stable `audio-transcription` et le modèle STT sélectionné ; les
échecs ne sont jamais mis en cache. Les tentatives audio mettent à jour les
compteurs partagés `bridged`, `cacheHits`, `failures` et `lastUsedAt`. Les
réponses transformées portent
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` ; les
requêtes non modifiées ne reçoivent pas de segment Audio Bridge.

Les paramètres d'exécution sont stockés en base de données et validés par Zod :

| Clé                           | Valeur par défaut | Plage          |
| ----------------------------- | ----------------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`            | —              |
| `modalityBridgeAudioModel`    | `""`              | Auto ou ID STT |
| `modalityBridgeAudioTimeout`  | `60000`           | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`               | 1–10           |

Le cache partagé reste contrôlé par `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` et `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepte les parties vidéo de premier niveau dans les `messages` de Chat
Completions et l'`input` de l'API Responses avant l'appel d'une cible sans
prise en charge native connue de la vidéo. Les formats pris en charge sont
`input_video`, `video_url`, `video_source`, les URL HTTPS et les URI de données
`data:video/*;base64,...`. Les simples noms de fichiers dans le texte ne sont
pas traités comme des vidéos.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) prend en charge le parcours
de la requête, la vérification des capacités et des politiques, l'agrégation
par requête et la charge utile de la réponse. Le travail par vidéo —
acquisition, cache du résultat complet, description d'une séquence d'images
(qui fusionne toute transcription audio déclarée par l'appelant) et
métriques/abandon/nettoyage par tentative — est masqué derrière
`processVideoPart` dans `videoBridgePipeline.ts`, appelé une fois par partie
vidéo dans la boucle de `preCall`. Ce module définit également les frontières
de ports explicites `VideoMediaBrokerPort` (acquisition des octets et
extraction des images échantillonnées), `VideoAudioTranscriptionPort` (fusion
d'une transcription audio déclarée par l'appelant avec les légendes
échantillonnées) et `VideoDrilldownPort` (la frontière de persistance du
drill-down d'images ; pas encore câblée dans `processVideoPart` — seule la
route séparée `/api/modality-bridge/video/drilldown` écrit aujourd'hui des
entrées de drill-down).

Le chemin de requête public `/v1` n'importe ni n'invoque jamais de
sous-processus. Les vidéos distantes sont téléchargées dans une limite de
50 Mio ; les vidéos base64 en ligne ont un plafond conservateur de 36 Mio
décodés par vidéo afin que l'enveloppe modèle/messages/cadrage puisse rester
dans la limite d'admission des requêtes JSON publiques de 50 Mio. La longueur
en ligne et les estimations de taille décodée sont vérifiées avant allocation.
HTTPS est requis sur l'URL distante initiale et sur chaque redirection, en
utilisant le garde-fou sortant existant limité aux adresses publiques avec
épinglage DNS. Les octets franchissent ensuite la frontière exacte du broker
interne `POST /api/modality-bridge/video/extract`. Cette route est à la fois
`LOCAL_ONLY` et `SPAWN_CAPABLE`, n'accepte qu'une requête authentifiée par
processus provenant d'une boucle locale de confiance, et n'accepte jamais
d'URL, de chemin de système de fichiers, d'exécutable ou de liste d'arguments.
Le pipeline de taille de corps de l'API et le lecteur de corps incrémental du
gestionnaire appliquent indépendamment un plafond d'entrée du broker de 50 Mio.
Sa file d'attente bornée exécute une extraction à la fois, autorise quatre
tâches en attente et plafonne l'entrée en attente à 100 Mio.

À l'intérieur du broker, `ffprobe` lit un fichier local privé ; la liste blanche de formats fixe exclut les formats de listes de lecture et de manifestes. Pour les conteneurs autorisés de la famille MOV, les références de données MOV externes restent désactivées par défaut, et la commande fixe ne les active pas. `ffprobe` et `ffmpeg` utilisent tous deux la liste blanche de protocoles limitée à `file`, un seul thread, des tableaux d'arguments fixes, aucun shell, et des exécutables résolus depuis `PATH`. Les flux de couvertures en image jointe ne sont pas des candidats lisibles. Tous les flux lisibles doivent satisfaire les limites, et un flux par défaut explicite est préféré avant le repli déterministe sur l'index le plus bas. Les vidéos sont limitées à 600 secondes, 8 192 pixels par dimension et 33 554 432 pixels source. FFmpeg échantillonne 1 à 16 images JPEG au point médian, réduit le grand côté à au plus 1 024 pixels sans agrandir les entrées plus petites, et ne reçoit jamais d'URL. L'échantillonnage est `uniform` par défaut. Les politiques optionnelle `scene_aware` et expérimentale `segment_aware` effectuent une passe FFmpeg fixe supplémentaire sur le flux local déjà validé, sélectionnent des horodatages de scène `showinfo` bornés, et reviennent de manière déterministe aux mêmes points médians uniformes en cas d'échec du détecteur, de dépassement de délai, de sortie malformée ou d'un ensemble de candidats vide. Le mode sensible aux segments répartit les échantillons de points médians proportionnellement aux intervalles de scène validés ; les preuves de ce mode et le comportement de repli sont détaillés ci-dessous. Le plafond strict de 16 images est appliqué après la sélection dans chaque politique. Lorsqu'une requête sensible aux scènes ne dispose que d'un budget d'une image, elle utilise le point médian uniforme de la fenêtre active (vidéo complète ou fenêtre de focus) et rapporte `policyEffective: uniform` : une seule image de scène sélectionnée ne peut pas préserver les deux extrémités temporelles. Un appelant peut éventuellement fournir une fenêtre de focus finie (secondes `start`/`end`) ; les bornes sont écrêtées à la durée du média, les fenêtres inversées ou non finies sont rejetées, et toutes les politiques d'échantillonnage ne sont appliquées qu'à l'intérieur de l'intervalle normalisé. La fenêtre résultante est incluse dans les métadonnées d'échantillonnage et dans le préfixe de description non fiable afin que les modèles en aval puissent distinguer un extrait ciblé de la chronologie complète.

Le focus sémantique des légendes est un paramètre séparé et explicite. Le mode d'analyse `full` par défaut conserve l'invite d'image existante et ne transmet jamais le texte de la requête au modèle de légendes. En mode `focused`, le bridge lit uniquement le dernier `text`/`input_text` non vide rédigé par l'utilisateur dans le même conteneur Chat ou Responses, le normalise en NFC, réduit les caractères de contrôle et les espaces, et le limite à 500 points de code Unicode. Un résultat vide retombe sur l'invite `full` exacte. Un indice exploitable est sérialisé en JSON dans un bloc dédié de contexte utilisateur non fiable et ne peut que prioriser des détails observables ; il ne peut pas remplacer l'avertissement distinct contre le suivi d'instructions visibles ou audibles dans le média. Le focus textuel ne déduit jamais `start`/`end` et ne modifie pas l'échantillonneur temporel.

#### FU-07 : preuves structurelles des segments

`segment_aware` utilise une passe de pré-analyse bornée sur le flux vidéo local déjà validé. La chaîne de filtres fixe réduit d'abord à au plus 320 pixels de large, détecte les changements de scène et les intervalles figés, puis échantillonne à 1 image par seconde pour le flou, la luminance moyenne et les informations spatiales/temporelles. La passe est limitée à 600 échantillons structurels, un thread FFmpeg/filtre, les mêmes listes blanches de protocole limité à `file` et de conteneurs, une borne de 1 Mio pour la sortie du processus, et au plus 30 secondes dans le délai/abandon partagé du broker. Elle n'accepte jamais de commande, filtre, chemin ou URL provenant de la requête.

Les valeurs structurelles sont des preuves d'échantillonnage déterministes, pas une compréhension sémantique de la vidéo. Elles ne déduisent ni sujets, ni actions, ni légendes, ni paroles, ni intention de l'utilisateur. Les frontières de scène et de gel forment des segments ; la couverture des gels, le flou, l'exposition, le détail spatial et le changement temporel influencent uniquement la répartition du budget existant de 1 à 16 images. Un segment entièrement figé est plafonné à une image, tandis que les segments non figés se disputent le budget restant. Lorsque les frontières sont plus nombreuses que les images, une couverture uniforme de la chronologie est conservée afin que des coupes rapides en début de vidéo ne puissent pas masquer un long segment final. Les frontières de scène situées à moins de la résolution d'analyse d'une seconde d'une frontière de gel sont fusionnées.

Des filtres manquants, des preuves malformées ou vides, une erreur du détecteur ou le dépassement de délai borné de la pré-analyse débouchent sur un échec ouvert (fail open) vers la politique exacte des points médians uniformes. Un abandon de l'appelant ou une échéance du broker ne bascule pas en mode ouvert : il termine le sous-processus en cours, empêche toute extraction d'images ultérieure, et l'arborescence temporaire privée est supprimée dans le `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` génère des fixtures FFmpeg réelles déterministes pour les économies d'appels de légendes après déduplication, l'allocation du budget pour les mouvements denses, les preuves de flou/exposition/SI-TI, les coupes rapides avec une longue traîne, et les faux positifs de fondu graduel. Il enregistre le temps réel (wall time) de la pré-analyse et, lorsque `/usr/bin/time` est disponible, le CPU enfant et le RSS maximal. Ses vérifications de qualité ne sont que des oracles structurels. La qualité réelle du modèle de légendes reste `HOLD` car ce harnais ne dispose ni d'un point de terminaison autorisé ni d'un juge figé. Les économies monétaires restent également `HOLD` à moins que `--caption-cost-per-call-usd` ne fournisse une estimation positive explicite par appel ; le script ne fabrique jamais aucun de ces résultats.

Chaque frame est limitée à 4 Mio, l'ensemble des frames brutes à 23 Mio, et la
réponse sérialisée du broker à 32 Mio. Un répertoire temporaire privé est
supprimé dans le bloc `finally`. OmniRoute n'intègre pas FFmpeg et n'accepte
pas de chemin d'exécutable personnalisé. Avant la génération des légendes, le
pont applique une passe de déduplication visuelle conservatrice : chaque JPEG
est réduit à un tampon en niveaux de gris de 16×16 et n'est comparé qu'à la
dernière frame conservée. Pour un budget de légendes demandé supérieur à une
frame, l'extraction fournit un pool de candidats borné, d'au plus deux fois ce
budget et jamais plus de 16 frames. Le plafond demandé n'est appliqué qu'après
la déduplication, les premier et dernier candidats sélectionnés étant préservés
lors de la réduction finale lorsque le budget est d'au moins deux. La politique
versionnée `grayscale-16x16-mean-cells-v2` utilise la plus grande valeur entre
le delta moyen de luminance et le ratio de cellules de miniature dont le delta
normalisé est d'au moins 0.05. Le seuil de duplication est la constante 0.04,
choisie pour sa prévisibilité plutôt qu'exposée comme paramètre d'exécution. Ce
signal secondaire à contraste élevé préserve les petits mouvements et les
changements de texte visible qu'une comparaison fondée uniquement sur la moyenne
peut masquer. Les erreurs du comparateur ou du décodeur échouent en mode ouvert
(fail-open) et préservent la couverture. Les métadonnées de sortie distinguent
les candidats extraits, les frames effectivement utilisées et les doublons
visuels écartés.

Une partie vidéo explicitement marquée peut demander une planche contact
horodatée. Le pont construit au maximum une grille JPEG de 4 colonnes et 16
frames. Chaque cellule de 512 pixels incruste son horodatage source dans un
bandeau inférieur à contraste élevé, tandis que les mêmes horodatages restent
présents dans les métadonnées textuelles pour l'association et l'audit en aval.
Le JPEG complet reste plafonné à 32 Mio. Si `sharp` ne parvient pas à décoder
ou à composer la grille, le pont revient aux frames JPEG individuelles ; un
abandon côté client se propage néanmoins à travers l'opération de planche
contact.

Les preuves de promotion sont délibérément distinctes du microbenchmark
synthétique de composition. `scripts/perf/video-bridge-contact-sheet-eval.ts`
définit un harnais A/B versionné par schéma pour de véritables modèles de
vision compatibles OpenAI. Il mesure les tokens rapportés par le fournisseur,
la latence réelle de bout en bout (y compris la composition de la planche), le
nombre d'appels au modèle et la rétention des faits définis dans le manifeste.
Les réponses brutes du modèle ne sont pas écrites dans le rapport ; seules les
empreintes SHA-256 et les identifiants de faits correspondants sont conservés.
Le harnais n'effectue aucun appel réseau ni appel de modèle payant sauf si
`--execute-real` est passé et que `--model`, `OMNIROUTE_BASE_URL` et
`OMNIROUTE_API_KEY` sont configurés. Sans cette exécution réelle explicite, son
verdict lisible par machine reste `HOLD` ; les mesures synthétiques de charge
utile et de nombre d'appels ne constituent pas, à elles seules, une preuve de
promotion.

Les appelants peuvent joindre un tableau `transcript.cues` facultatif à une
partie vidéo prise en charge lorsqu'ils disposent déjà d'un texte aligné.
Chaque cue doit porter un champ `text`, un intervalle fini `start`/`end` compris
dans la durée sondée, et une `source` figurant sur liste blanche (`client`,
`embedded` ou `audio-bridge`) ; `confidence` vaut `1` par défaut et doit rester
entre `0` et `1`. Les cues strictement identiques sont fusionnés. OmniRoute ne
lance jamais de transcription à partir de ces métadonnées : les cues validés
sont copiés dans le résultat décrit avec leur source, leur confiance et leur
intervalle, et sont restitués comme des observations non fiables aux côtés des
légendes de frames. Tout texte invalide, hors limites ou dépourvu de provenance
est rejeté plutôt que mélangé au flux de légendes. Les deux canaux de
transcription du corps de requête normalisent la provenance fournie en
`client`, y compris les étiquettes `embedded` ou `audio-bridge` auto-déclarées.
Seul un adaptateur contrôlé par le serveur peut attribuer ces étiquettes de
confiance via l'argument `trustedSource`, accessible uniquement depuis le
code ; un champ JSON de la requête ne peut pas atteindre cet argument. Le texte
de transcription reste un contenu dérivé du média et non fiable, quelle que
soit sa provenance, et ne doit jamais déterminer l'autorisation.

Un appelant avancé peut fournir une piste `audioTranscript` pour la même
vidéo ; elle est traitée comme du texte fourni par le client, et non comme une
preuve de transcription côté serveur. La couche de fusion exécute les
observations visuelles et audio sous une même échéance et un même signal
d'abandon, les ordonne sur une chronologie commune, fusionne les doublons
exacts et rapporte un résultat partiel lorsqu'un seul côté aboutit. Un
`audioTranscript` invalide dégrade le traitement vers ce résultat partiel — la
description visuelle est conservée et la branche audio enregistre un code
d'échec assaini — au lieu de faire échouer la vidéo entière. La disponibilité
par branche, l'indicateur de résultat partiel et les codes d'échec assainis
sont conservés dans le résultat décrit, dans les métadonnées de garde-fou
(`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), dans les
métadonnées du cache de résultats et dans les compteurs de fusion du pont. Le
chemin Video Bridge par défaut n'invoque pas de reconnaissance vocale et ne
télécharge pas une seconde copie du média ; sans cette piste explicite, il
reste limité à la vidéo seule.

**Conservation des transcriptions (#12150 P1).** Cela s'applique automatiquement chaque fois que le
Video Bridge (lui-même soumis à activation explicite) rend un repère de transcription — il n'existe pas
d'indicateur de conservation distinct. Lorsqu'une requête rend un repère de transcription quelconque (un
`transcript` déclaré par l'appelant ou un `audioTranscript` fusionné), le garde-fou la marque
`videoBridgeObserved` et produit une copie fantôme expurgée de la description vidéo —
un rendu identique dans lequel le corps textuel libre de chaque repère est remplacé par
`[redacted-video-transcript]`, construit en substituant le champ structuré du repère
avant que la chaîne ne soit assemblée (jamais en analysant le texte aplati, de sorte qu'aucun
contenu de repère — hostile ou ordinaire, y compris les corps contenant `]` tels que
`[inaudible]`/`[music]` — ne puisse subsister). Le corps de requête persisté dans le journal d'appels remplace
chaque partie textuelle dérivée de la vidéo par cette copie fantôme expurgée, mise en correspondance par
égalité de contenu ; l'ancre `fullText` est relue à partir de la charge utile finale du garde-fou
pré-appel, de sorte que la correspondance réussit toujours après que des garde-fous ultérieurs de la chaîne
(les masqueurs de PII et d'identifiants, priorités 10/95) réécrivent le texte de description sur place et
après que l'injection du prompt système, du transfert de contexte et de la mémoire a remodelé le tableau de messages.
Le corps envoyé en amont au modèle reste inchangé. Une requête observée ne peuple également
aucune mémoire durable (l'extraction dérivée de la requête comme de la réponse est ignorée),
de sorte que la propre réponse du modèle ne peut pas répercuter de texte de transcription dans Memory.

**Champs vidéo bruts (#12430).** Lorsque le bridge est activé et que la prise en charge native de la vidéo est inconnue ou absente, des champs `transcript`/`audioTranscript` définis activent également `videoBridgeObserved`, même après un échec de description ou une limite `maxVideos`. Les valeurs `null` et les chaînes vides comptent ; les champs absents et les métadonnées non vidéo ne comptent pas. Les copies conservées expurgent ces champs ou omettent la requête, et les caches ainsi que Memory sont contournés.

Sur ces chemins de repli, les repères valides de l'appelant deviennent des parties
`text`/`input_text` prises en charge plutôt que des champs fournisseur non standard. Les deux pistes
fournies dans la requête demeurent des observations `client` non fiables, avec un avertissement explicite
indiquant que la vidéo n'a pas été décrite et que les horodatages n'ont pas été vérifiés par rapport au média.
Les budgets existants de 256 repères/64 Kio au total et par repère s'appliquent aux deux pistes réunies ;
les horodatages doivent respecter le plafond de 600 secondes du broker ainsi que toute fenêtre de
focus fournie. Les pistes invalides sont rejetées, et non transmises comme texte arbitraire ; une piste
sœur valide peut toujours être utilisée, sauf si leur budget combiné est dépassé. Les champs nuls ou vides
n'ajoutent aucun texte. Ce repli n'ajoute ni récupération de média ni transcription.
Les champs d'extension de transcription sont retirés du porteur vidéo de repli et de ses
objets `video_url`/`source`. La liste blanche wire d'OpenAI reste stricte ; les porteurs
vidéo à prise en charge native inconnue demeurent disponibles et les cibles texte-only connues conservent
des marqueurs sûrs. Les copies fantômes d'expurgation structurée protègent le texte de transcription ajouté,
tandis que la requête originale appartenant à l'appelant reste inchangée. Les cibles à prise en charge
native et les bridges désactivés conservent leur comportement de contournement existant.

Les copies conservées supplémentaires utilisent le même signal de requête observée. L'instantané brut
de la requête client avant garde-fous, la requête en attente en mémoire et le journal des requêtes rejetées
précocement remplacent structurellement les champs de transcription dans les parties vidéo ;
les prompts textuels synthétisés par les étapes du pipeline et le transfert de contexte sont expurgés
au niveau du collecteur du corps de requête persisté. Le marqueur persisté `video_content_removed`
fait échouer de manière fermée la continuation par `previous_response_id` plutôt que de reconstruire
un texte qui a été intentionnellement rejeté. Si une requête observée perd sa
copie fantôme d'expurgation par partie avant la journalisation, ou si même l'une des plusieurs copies fantômes
vidéo ne parvient pas à correspondre après des mutations ultérieures de la requête, le corps de requête conservé
est entièrement omis plutôt que de conserver une transcription partiellement expurgée.

Pour une requête observée, une réponse du modèle peut citer n'importe quelle portion de la
transcription sans frontière de repère structurée. Son `responseBody` persisté dans le journal d'appels
est donc remplacé par un marqueur d'omission ; l'artefact détaillé du pipeline (qui peut inclure
les corps amont/client et les fragments de flux) n'est pas conservé. Les caches
sémantique, d'idempotence et de rejeu de raisonnement contournent les lectures et les écritures pour cette
requête. La requête fournisseur et la réponse visible par le client restent inchangées. Les octets de keepalive
précoces sont purgés du tampon temporaire lorsque l'artefact détaillé est omis. L'avertissement
d'EventStream malformé de Kiro ne rapporte que le nombre d'octets de la charge utile, jamais son contenu
ni l'erreur brute de l'analyseur JSON.
Cela ne prétend pas que chaque diagnostic fournisseur/plugin sans rapport a été
audité ; le balayage plus large des collecteurs conservés est suivi dans #11658.

Le cycle de vie interne `/api/modality-bridge/video/drilldown` constitue un substrat de cache
distinct, authentifié par boucle locale/jeton. Chaque opération exige également un
identifiant de principal opaque canonique. Avant qu'un appelant de production ne soit activé, il doit
dériver cet identifiant du tenant authentifié et ne doit jamais transmettre une
valeur choisie par le client. Les clés de cache lient ce principal à des identifiants canoniques de session et
de référence vidéo, ne stockent que leurs clés dérivées par SHA-256, et limitent à la fois les lectures
et la suppression au même principal. Le cache stocke au plus 16 trames JPEG
dérivées par entrée, les fait expirer après dix minutes, et prend en charge des lectures bornées par
`start`/`end` ou une suppression explicite de session.

Chaque principal est limité à 16 entrées et 64 Mio de données JPEG canoniques. Ces
limites sont indépendantes du plafond global de 64 entrées/256 Mio : la pression sur le quota
d'un principal n'évince que les entrées les moins récemment utilisées de ce principal avant que
l'éviction LRU globale ne soit envisagée. Les entrées expirées sont balayées de la comptabilité du principal
comme de la comptabilité globale lors de l'activité du cache, tandis que l'annulation et l'échec de validation
ne valident pas de remplacement partiel.

Le cache rejette le Base64 non canonique, le remplissage excessif, les médias non JPEG, les JPEG mal formés ou tronqués, ainsi que les JPEG produisant un avertissement lors d'un décodage `sharp` borné de l'image complète. Il ré-encode chaque image acceptée en JPEG canonique, déduit la largeur et la hauteur des octets décodés au lieu de se fier aux champs de l'appelant, et écarte tout octet polyglotte en fin de fichier plutôt que de le conserver. Seul le tampon compressé canonique borné est imputé aux deux quotas. La limite de transmission JSON inclut le surcoût du Base64 pour le plafond de 32 Mio de données décodées en entrée. Chaque dérivation stockée enregistre son format/sa résolution JPEG validés, sa politique d'échantillonnage, sa version de dérivation, son heure de création, son hachage de contenu calculé par le serveur, ainsi que la référence parente hachée et le hachage du contenu parent fourni par l'appelant de confiance. L'annulation est vérifiée entre les phases asynchrones de décodage et de hachage, avant l'écriture atomique dans le cache.

Cette tranche ne connecte pas encore de producteur de production à la route et n'offre pas de sélection de variantes multi-résolutions. Le chemin de requête transparent du pont vidéo n'entraîne donc aucun travail supplémentaire, tandis que la dérivation de principal liée au tenant et le cycle de vie multi-résolution complet FU-08 restent des travaux de suivi explicites plutôt qu'un comportement documenté comme terminé.

Les images sont légendées séquentiellement avec le modèle vidéo configuré. Une valeur de remplacement Video vide hérite du paramètre Vision ; si les deux sont vides, le routeur automatique Vision sélectionne le modèle effectif capable de vision. Les légendes réussies remplacent la partie d'origine par un préfixe stable `[Video description:` qui marque également le texte comme une observation non fiable dérivée d'un média et indique aux modèles en aval de ne pas suivre les instructions trouvées dans le média. Les clés de cache des légendes d'images incluent les octets JPEG, le prompt, l'horodatage et le modèle effectif ; seules les légendes réussies sont mises en cache. Les entrées de cache conservent le modèle producteur réel ayant réussi, y compris un modèle de repli ; le pont rapporte `mixed` lorsque différentes images ont été produites par différents modèles. Un succès de cache réutilise cette identité de producteur au lieu de la réétiqueter selon le plan de routage demandé. Le cache de résultats vidéo complets est indexé sur chaque entrée qui modifie la sortie — prompt, modèle effectif, politique d'échantillonnage, nombre d'images, mode d'analyse sémantique, empreinte SHA-256 de l'indice de focalisation normalisé, fenêtre de focalisation, `transcript`, `audioTranscript` et indicateur de planche-contact — de sorte que la modification de l'une de ces dimensions constitue un échec de cache, jamais une réutilisation obsolète. La version de la politique de déduplication visuelle, le seuil et le nombre borné d'images candidates figurent également explicitement dans la clé et les métadonnées du cache de résultats ; un changement de politique ne peut donc pas réutiliser une description vidéo complète obsolète. Les métadonnées v4 du cache de résultats conservent le mode et l'empreinte, jamais la tâche utilisateur brute. Les métadonnées du garde-fou rapportent à la fois les modes d'analyse demandé et effectif ; un mode `focused` demandé sans texte utilisateur exploitable est rapporté comme effectivement `full`.

Le garde-fou extrait chaque partie vidéo prise en charge mais n'en décrit pas plus de `modalityBridgeVideoMaxVideos`. Pour une cible dont il est prouvé que `supportsVideo === false`, les vidéos en échec ou dépassant la limite deviennent des marqueurs textuels sûrs explicites, de sorte qu'aucune vidéo brute ne subsiste. Lorsque la capacité est inconnue, ces parties conservent leur support vidéo ; toute transcription de repli suit la conversion textuelle bornée décrite ci-dessus. Les cibles avec `supportsVideo === true` contournent le pont. Le signal d'abandon de la requête client se propage à travers le téléchargement, la file du broker, les sous-processus et les appels de légendage ; les abandons s'interrompent entre les vidéos et n'exposent jamais le média brut par défaut.

Les paramètres d'exécution sont stockés en base de données et validés par Zod :

| Clé                                 | Valeur par défaut | Plage / comportement                                                                                                       |
| ----------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`           | Moteur d'exécution optionnel, activation explicite (opt-in)                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`          | `full` conserve les légendes génériques ; `focused` utilise le contexte borné et non fiable du dernier message utilisateur |
| `modalityBridgeVideoModel`          | `""`              | Hérite du modèle du pont Vision                                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`               | 1–16                                                                                                                       |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`       | `uniform`, `scene_aware` ou `segment_aware` proportionnel ; en cas d'échec du détecteur, repli sur `uniform`               |
| `modalityBridgeVideoMaxVideos`      | `1`               | 1–4                                                                                                                        |
| `modalityBridgeVideoTimeout`        | `120000`          | 1000–120000 ms                                                                                                             |

Les valeurs de délai vidéo héritées et persistées supérieures à 120 secondes sont ramenées au délai maximal du broker ; les nouvelles écritures de paramètres dépassant cette limite sont rejetées.
`GET /api/modality-bridge/video/runtime` exige une localité loopback estampillée de confiance avant toute authentification ou sonde du moteur d'exécution, puis exige une authentification de gestion. Elle ne retourne que `available`, les versions assainies de FFmpeg/ffprobe, et une raison fixe lorsque le moteur d'exécution est indisponible. Le point de terminaison d'extraction interne n'est pas une API publique de téléversement : la saturation de la file retourne `503` accompagné de `Retry-After`, une déconnexion de l'appelant retourne `499`, et le dépassement du délai fixe du broker retourne `504`. Les réponses converties ajoutent `video->text;model=<visionModel>;parts=<videos>` à l'en-tête central `x-omniroute-modality-bridge` sans supprimer les segments Vision ou Audio.

### Masqueur de PII (`piiMasker.ts`)

S'exécute aux **deux** étapes.

- **`preCall`** clone la charge utile, parcourt `system`, `messages`, `input` et
  `prompt` (y compris les éléments qui sont de simples chaînes), et applique
  `processPII()` (depuis `@/shared/utils/inputSanitizer`) aux champs `content`/`text`
  de type chaîne. Lorsque `PII_REDACTION_ENABLED=true`, les PII détectées sont
  masquées dans la charge utile sortante. Ceci est indépendant de
  `INPUT_SANITIZER_MODE` (qui ne contrôle que la politique d'injection de prompt).
  Lorsque le masquage est désactivé, l'appel enregistre les comptages de détection
  sans réécrire le contenu.
- **`postCall`** effectue un clonage profond de la réponse, exécute
  `sanitizePIIResponse()` ainsi que le masqueur au format de la Responses API
  (`maskResponsesOutput` — couvre `output_text` et `output[].content[].text`).
  Si un masquage a lieu, la réponse modifiée remplace l'originale.

Le garde-fou ne bloque jamais ; il se contente d'annoter (`meta.detections`,
`meta.redacted`) ou de réécrire.

#### Sélection par type, motifs personnalisés et compteurs de détection

**Tableau de bord → Paramètres → Sécurité → Masquage des PII** choisit _ce qui_
est masqué. Il n'active pas le masquage : celui-ci reste contrôlé par
`PII_REDACTION_ENABLED` (requête) et `PII_RESPONSE_SANITIZATION` (réponse + SSE),
tous deux désactivés par défaut.

- **Sélection par type** — les identifiants intégrés sont listés dans
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Si aucun n'est défini,
  tous les types sont concernés (le comportement antérieur à l'existence de ce
  paramètre). Le motif `ssn_us` du moteur de requêtes correspond à `ssn`. Les
  modèles (Minimal, Standard, Financial, Brazilian, USA, Full) ne font que cocher
  les cases dans l'interface.
- **Motifs personnalisés** — jusqu'à 20 motifs regex ou à joker (`*` = jusqu'à 64
  caractères non blancs, `?` = un seul). Les correspondances deviennent
  `[CUSTOM_REDACTED]`. Chaque motif passe par `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`) : 500 caractères au maximum, drapeaux
  limités à `g i m s u`, doit compiler, doit passer `safe-regex` (backtracking
  catastrophique), et ne doit correspondre ni à une chaîne vide ni à un espace
  réservé de masquage. Un motif qui échoue est refusé à l'enregistrement comme au
  test, et une ligne stockée qui échoue est ignorée à l'exécution au lieu d'être
  compilée. Les motifs personnalisés ne s'exécutent que lorsque le masquage est
  activé.
- **Compteurs de détection** — comptages par type (jamais les valeurs
  correspondantes), conservés en mémoire et réinitialisés au redémarrage
  (`src/lib/pii/piiDetectionStats.ts`). Ils n'augmentent que lorsque le masquage
  est activé.

Les paramètres résident dans la table `key_value` (espace de noms `pii_settings`,
`src/lib/db/piiSettings.ts`) et sont lus via un cache de 1 s. API :

| Méthode | Chemin                   | Fonction                                                                           |
| ------- | ------------------------ | ---------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/pii`      | État des indicateurs, `enabledTypes`, `customPatterns`, compteurs de détection     |
| `PUT`   | `/api/settings/pii`      | Remplace `enabledTypes` (`null` = tous) et/ou `customPatterns`                     |
| `POST`  | `/api/settings/pii/test` | Exécute un motif à blanc sur un échantillon de 8 Ko au maximum ; rien n'est stocké |

Les trois exigent une authentification de gestion et valident le corps avec Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Injection de prompt (`promptInjection.ts`)

Détecte les structures malveillantes dans le contenu fourni par l'utilisateur et
applique la politique configurée. Le comportement est piloté par des variables
d'environnement et des options du constructeur :

| Paramètre        | Variable d'env                                                                                        | Valeur par défaut | Effet                                                                                                                                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Activé           | `INPUT_SANITIZER_ENABLED`                                                                             | `true`            | Lorsque `false`, le garde-fou est court-circuité.                                                                                                                                                                                  |
| Mode             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`            | Politique d'injection : `block`, `warn` ou `log`. (`redact` est accepté pour la rétrocompatibilité mais ne supprime **pas** le texte d'injection ; la réécriture des PII de la requête est contrôlée par `PII_REDACTION_ENABLED`.) |
| Seuil de blocage | option `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`            | Sévérité minimale requise pour bloquer. Avec la valeur par défaut, la sévérité moyenne est en observation seule.                                                                                                                   |

**Priorité des modes** (`getMode`) : `options.mode` de l'appelant →
**surcharge par feature flag en base de données** `INJECTION_GUARD_MODE`
(Tableau de bord → Paramètres → Feature Flags) → env `INJECTION_GUARD_MODE` →
env `INPUT_SANITIZER_MODE` → `warn`. Une surcharge depuis le tableau de bord
l'emporte donc sur les variables d'environnement, de sorte que l'interface des
feature flags contrôle le garde-fou en cours d'exécution à chaud (sans
redémarrage). La lecture en base est à sécurité intégrée : si elle échoue, le
garde-fou revient au comportement basé sur l'environnement, et lorsqu'aucune
surcharge n'est définie, le comportement est identique à une résolution par
l'environnement seul.

Sources de détection :

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (ensemble de
   détecteurs partagés utilisé ailleurs dans le pipeline).
2. Les `DEFAULT_GUARD_PATTERNS` intégrés (actuellement `system_override_inline`
   et `markdown_system_block`, tous deux de sévérité `high`).
3. Des `customPatterns` optionnels transmis via les options du constructeur
   (chaînes, regex ou enregistrements `{ name, pattern, severity }`).

Lorsque `mode === "block"` **et** qu'au moins une détection atteint le seuil de
gravité, `preCall` renvoie `{ block: true, message: "Request rejected:
suspicious content detected" }`. En modes `warn`/`log`, le garde-fou journalise
mais laisse passer l'appel. La fonction utilitaire partagée
`evaluatePromptInjection()` est également exportée pour les appelants qui
doivent évaluer des prompts sans passer par le registre.

**Limite d'analyse (v3.8.20) :** le détecteur n'inspecte que les **16 premiers
Ko** du texte de prompt concaténé — `MAX_INJECTION_SCAN_BYTES = 16 * 1024`
(16 384 octets) dans `src/shared/utils/inputSanitizer.ts`. `detectInjection()`
et `evaluatePromptInjection()` appliquent toutes deux `slice(0,
MAX_INJECTION_SCAN_BYTES)` avant d'exécuter la boucle de motifs. Les directives
d'injection se situent près du début d'une entrée, ce qui plafonne donc la
charge CPU/GC des regex sur des charges utiles de plusieurs centaines de Ko
sans affaiblir la détection (cf. #3932, #4041).

### Masqueur d'identifiants (`credentialMasker.ts`)

S'exécute sur les **deux** étapes, en dernier dans la chaîne par défaut
(priorité `95`). Masque les motifs bien connus de clés d'API / de jetons
secrets dans la charge utile sortante (contenu des messages, arguments des
appels d'outils, résultats d'outils) **et** la réponse du fournisseur, de sorte
qu'un identifiant collé dans un prompt (ou renvoyé en écho par un résultat
d'outil) ne soit pas divulgué au fournisseur amont ni renvoyé au client.

- **Activation explicite (opt-in) uniquement**, même convention que le masquage
  des PII (proche de la règle stricte n° 20) : désactivé sauf si
  `settings.credentialRedactionEnabled === true` **ou**
  `CREDENTIAL_REDACTION_ENABLED=true`. Lorsqu'il est désactivé, le garde-fou
  est inerte — il ne bloque jamais et ne réécrit jamais.
- `redactCredentials()` parcourt l'arborescence complète de la charge
  utile/réponse (`walkValue()`, protégée contre la pollution de prototype et
  contre les cycles via `WeakSet`) et remplace les correspondances par un
  marqueur `[REDACTED:<type>]`, en ne clonant que les branches réellement
  modifiées.
- `CREDENTIAL_PATTERNS` couvre les clés de fournisseurs LLM (OpenAI,
  OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), les jetons
  VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), les clés de
  paiement (Stripe, Square), les clés cloud (clé d'accès AWS, Twilio, SendGrid,
  Mailgun), les clés privées / JWT, les chaînes de connexion contenant des
  identifiants (`mongodb://user:pass@...`, etc.), ainsi qu'un motif générique
  de valeur d'en-tête `Authorization`/`x-api-key`/`api-key`/`apikey`. Les clés
  en forme d'en-tête (`authorization`, `x-api-key`, `api-key`, `apikey`) sont
  masquées structurellement (valeur uniquement, le préfixe de schéma comme
  `Bearer `/`Basic ` étant préservé) plutôt que via la regex textuelle
  générique.
- Le garde-fou ne bloque jamais ; il se contente de réécrire
  (`modifiedPayload` / `modifiedResponse`) et d'annoter
  (`meta.credentialsRedacted`, `meta.count`).

Garde anti-régression : `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // true court-circuite la chaîne
  message?: string; // affiché lors du blocage
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

Un garde-fou signale « aucun changement » en renvoyant `void`, `{}` ou
`{ block: false }`. Le renvoi d'un `modifiedPayload`/`modifiedResponse` remplace
la valeur circulant dans la chaîne pour les garde-fous en aval.
`signal?: AbortSignal` propage le cycle de vie de l'appelant dans les garde-fous.
L'abandon d'une requête est l'exception fail-open délibérée : les ponts
multimédias arrêtent le travail et nettoient sans restaurer le média brut vers
une cible connue pour ne pas le prendre en charge.

## Registre (`registry.ts`)

Le singleton `guardrailRegistry` expose :

- `register(guardrail)` — ajoute (ou remplace par nom normalisé) un garde-fou et
  retrie par `priority` croissante.
- `clear()` / `list()` — fonctions utilitaires d'administration.
- `runPreCallHooks(payload, context)` — itère sur les garde-fous actifs, fait
  passer la charge utile à travers `modifiedPayload`, et s'arrête au premier
  `block: true`.
- `runPostCallHooks(response, context)` — même flux côté réponse.
- `resetGuardrailsForTests({ registerDefaults })` — efface l'état et
  réenregistre éventuellement les garde-fous par défaut pour une isolation
  propre des tests.

Les deux exécuteurs renvoient `{ blocked, payload|response, results, guardrail?, message? }`
où `results` est un tableau d'enregistrements `GuardrailExecutionResult` incluant,
pour chaque garde-fou, les champs `blocked`, `skipped`, `modified`, `error` et
`meta`, utiles pour le traçage.

### Désactivation des garde-fous par requête

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agrège une liste
dédupliquée des noms de garde-fous qui doivent être ignorés pour la requête en
cours. Il existe cinq canaux, lus dans cet ordre et fusionnés en une seule
liste (la première occurrence l'emporte lors de la déduplication) :

1. `apiKeyInfo.disabledGuardrails`
2. Corps de la requête `disabledGuardrails` (au niveau racine)
3. Corps de la requête `metadata.disabledGuardrails` (uniquement lorsque `metadata` est un objet)
4. En-tête `x-omniroute-disabled-guardrails`
5. En-tête hérité `x-disabled-guardrails`

Les cinq canaux sont fusionnés, les deux en-têtes inclus : envoyer à la fois
`x-omniroute-disabled-guardrails` et `x-disabled-guardrails` ignore l'union de
leurs listes, et un en-tête moderne vide ne masque plus l'en-tête hérité
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), corrigé dans
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Les valeurs peuvent être des tableaux de chaînes ou une chaîne séparée par des
virgules ; les noms sont épurés des espaces et normalisés en kebab-case
minuscules (`pii_masker` → `pii-masker`), et les entrées vides sont supprimées.
Le résultat est transmis via `context.disabledGuardrails` au registre, qui
ignore les garde-fous correspondants (`skipped: true` dans `results`).

La liste de désactivation n'affecte que le **registre**. Le mode `block` de
l'injection de prompt est une frontière obligatoire : le middleware de
protection contre l'injection (`src/middleware/promptInjectionGuard.ts`) appelle
`evaluatePromptInjection()` sans aucune liste de désactivation contrôlée par
l'appelant (l'appel mort à `resolveDisabledGuardrails({ body })` qu'il
effectuait auparavant a été supprimé dans
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), donc une
requête qui désactive `prompt-injection` est toujours rejetée en mode `block`.
Cela est voulu par conception. Les canaux de désactivation sont contrôlés par
l'appelant (corps de la requête, métadonnées, en-têtes), et un appelant ne doit
pas pouvoir désactiver un contrôle de sécurité défini par l'opérateur
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). L'union des
en-têtes issue de
[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) ne change que
les garde-fous du registre qui sont ignorés ; elle ne permet pas à un client de
contourner le middleware. Les politiques de garde-fous obligatoires par clé et
par groupe sont suivies dans la RFC v4
[#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Voir [Couverture et limites](#coverage-and-limits).

## Ordre d'exécution

Pour chaque requête transitant par `src/sse/handlers/chat.ts` et
`open-sse/handlers/chatCore.ts` (les routes de la famille chat listées sous
[Couverture et limites](#coverage-and-limits)) :

1. `resolveDisabledGuardrails(...)` construit la liste d'exclusion à partir de
   la clé API, du corps de la requête et des en-têtes.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` exécute les garde-fous par
   ordre de priorité croissante :
   - Les garde-fous désactivés sont enregistrés comme `skipped`.
   - Le `preCall` de chaque garde-fou peut réécrire la charge utile via
     `modifiedPayload`.
   - Le premier `block: true` court-circuite la chaîne et le gestionnaire
     renvoie une réponse de rejet par garde-fou.
3. La charge utile (potentiellement réécrite) transite vers le routage combo et
   la distribution en amont.
4. **Réponses non streamées uniquement :** une fois la réponse assemblée,
   `guardrailRegistry.runPostCallHooks(...)` exécute la même chaîne sur la
   réponse. Un `block: true` à ce stade rejette la réponse amont et renvoie HTTP 400. Les réponses streamées ignorent entièrement cette étape.

Les garde-fous qui lèvent une exception sont enregistrés avec
`error: <message>` et journalisés via `logger.warn`, mais la chaîne se poursuit
— fail-open par conception.

## Couverture et limites

Le registre de garde-fous n'est branché que sur le pipeline chat. Ces limites
sont figées par `tests/unit/guardrail-pipeline-wiring-characterization.test.ts`
et `tests/unit/guardrail-pipeline-characterization.test.ts` ; modifiez ces tests
de manière délibérée lorsque le comportement change.

### Où les hooks s'exécutent

| Hook / contrôle                     | S'exécute sur                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `runPreCallHooks`                   | Requêtes traitées par `handleChat` (`src/sse/handlers/chat.ts`) : `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (et `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, et le proxy chat Telegram. Également l'endpoint de test du tableau de bord `/api/guardrails/test`. Un blocage pré-appel renvoie HTTP 400. |
| `runPostCallHooks`                  | Réponses chat **non streamées** uniquement (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Les réponses streamées ne l'atteignent jamais.                                                                                                                                                                                                                                                                                                |
| PII en streaming                    | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), inséré dans le pipeline dans `streamingPipeline.ts` lorsque `PII_RESPONSE_SANITIZATION` est activé. Ce n'est pas un garde-fou, donc les canaux de désactivation ne l'affectent pas.                                                                                                                                                                                                |
| Middleware injection-guard (hérité) | Chaque route `/v1` transportant un prompt, y compris la famille chat (voir [couverture des routes](#injection-guard-route-coverage--red-team-phase-8--block-d)). Injection de prompt uniquement.                                                                                                                                                                                                                                                 |

### Ce qui n'est pas couvert

- **Les routes média, embeddings et données** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) n'atteignent jamais le
  registre. Aucun masquage de PII, masquage d'identifiants ou pont de modalité
  n'y est exécuté. Leur seule vérification est le middleware injection-guard
  hérité.
- **Les réponses streamées** ne bénéficient d'aucun garde-fou post-appel : pas
  de `pii-masker` ni de `credential-masker` post-appel, et aucun blocage
  post-appel. Seule la transformation PII en streaming s'applique (lorsque
  `PII_RESPONSE_SANITIZATION` est activé). Un identifiant renvoyé dans une
  réponse streamée n'est pas masqué.
- **Canaux de désactivation vs. middleware (par conception) :** le middleware
  évalue l'injection de prompt avec son propre appel à
  `evaluatePromptInjection()`, sans transmettre de liste de désactivation
  contrôlée par l'appelant. Le mode `block` est une frontière obligatoire que
  les désactivations contrôlées par l'appelant ne peuvent pas contourner, y
  compris sur les routes de la famille chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Désactiver
  `prompt-injection` ne fait qu'ignorer le garde-fou du registre.

### Ce qui voit une réponse avant le post-appel

Sur le chemin non streamé, l'ordre est le suivant : extraction de la mémoire →
exécution des outils intégrés → garde-fous post-appel → sortie sur blocage
post-appel → stockage dans le cache sémantique.

- **L'extraction de mémoire** et **l'exécution d'outils** voient la réponse avant que les
  garde-fous post-appel puissent la réécrire ou la bloquer. Depuis
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), l'extraction
  de mémoire fait passer le texte extrait par `sanitizePII` lorsque
  `PII_RESPONSE_SANITIZATION` est activé (en streaming comme en non-streaming), mais une
  réponse que le post-appel bloque ensuite a quand même été présentée à la mémoire et
  aux outils.
- **Le cache sémantique** stocke la réponse après le post-appel, il stocke donc la
  réponse réécrite, et une réponse bloquée n'est jamais mise en cache. Les entrées du
  cache sont indexées par clé API.

## Configuration

Variables d'environnement lues par les garde-fous intégrés :

| Variable                              | Utilisée par           | Effet                                                                                                                                                   |
| ------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`     | Définir sur `false` pour désactiver entièrement la détection.                                                                                           |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`     | Politique d'injection : `warn`, `block` ou `log`. La valeur historique `redact` ne réécrit pas le texte d'injection.                                    |
| `INJECTION_GUARD_MODE`                | `prompt-injection`     | Mode du garde-fou d'injection ; également un indicateur de fonctionnalité en base de données qui **remplace** les variables d'environnement (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`     | Gravité minimale rejetée par `MODE=block` : `high` (par défaut), `medium` ou `low`.                                                                     |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`     | Alias historique de `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                                  |
| `PII_REDACTION_ENABLED`               | `pii-masker`           | Lorsque `true`, les PII de la requête sont masquées (indépendamment du mode d'injection).                                                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (en aval) | Contrôle le comportement du masqueur côté réponse.                                                                                                      |

Les garde-fous de Modality Bridge lisent la configuration d'exécution depuis le
magasin de paramètres adossé à la base de données (`getSettings()`), et non
depuis les variables d'environnement. Les clés primaires de Vision sont
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` et
`modalityBridgeCacheMaxEntries`. Les clés historiques
`visionBridge*` ne sont acceptées que comme repli de lecture documenté d'un
cycle ; les écritures du tableau de bord utilisent les clés primaires. Les
valeurs par défaut et le résolveur de repli se trouvent dans
`src/shared/constants/modalityBridgeDefaults.ts`, les constantes historiques
étant conservées dans `src/shared/constants/visionBridgeDefaults.ts`.

Audio utilise `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` et `modalityBridgeAudioMaxClips`, ainsi que les
paramètres partagés `modalityBridgeCache*`. Audio n'a pas de repli de clés
historiques car ces clés ont été introduites avec le schéma Modality Bridge.

Video utilise `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` et
`modalityBridgeVideoTimeout`, ainsi que les paramètres partagés
`modalityBridgeCache*`. Il est désactivé par défaut car FFmpeg/ffprobe sont des
dépendances opérationnelles optionnelles et le légendage des images ajoute de
la latence et un coût de modèle.

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
3. Enregistrez le garde-fou soit au moment de l'import (push depuis
   `registerDefaultGuardrails`), soit en appelant
   `guardrailRegistry.register(...)` à l'exécution — le registre remplace
   tout garde-fou antérieur portant le même nom normalisé.
4. Ajoutez des tests sous `tests/unit/` (exemples existants :
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Tests

Utilisez `resetGuardrailsForTests()` entre les tests pour repartir d'un état
connu. Passez `{ registerDefaults: false }` pour démarrer avec un registre
vide et n'enregistrer que les garde-fous testés. Vision Bridge accepte
l'injection de dépendances (`deps.getSettings`, `deps.callVisionModel`) ;
Audio Bridge expose les points d'extension équivalents pour les paramètres,
les capacités, la sélection du modèle STT, la vérification des identifiants
et la transcription. Les tests peuvent donc exercer les deux flux sans accès
à la base de données ni au réseau.

## Voir aussi

- `src/lib/guardrails/` — implémentation
- `src/shared/utils/inputSanitizer.ts` — détecteur partagé qui alimente la
  détection d'injection de prompt et le masquage des PII
- `src/shared/constants/visionBridgeDefaults.ts` — valeurs par défaut de
  Vision Bridge et liste des modèles à pont forcé
- `src/shared/constants/modalityBridgeDefaults.ts` — valeurs d'exécution par
  défaut partagées Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — couche orthogonale (disjoncteur, cooldowns)
- `docs/reference/ENVIRONMENT.md` — référence complète des variables d'environnement

## Couverture des routes par le garde-fou anti-injection et red team (Phase 8 · Bloc D)

Le garde-fou anti-injection (`createInjectionGuard` / `withInjectionGuard`)
couvre toutes les routes qui acceptent des prompts utilisateur. Il respecte
`INJECTION_GUARD_MODE` (par défaut `warn` = journalisation seule ;
`block` = renvoie HTTP 400 `SECURITY_001`).

| Type             | Routes                                                                                                                                               | Mode par défaut |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Texte (existant) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn            |
| Génératif        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn            |
| Données          | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn            |

L'extraction de texte (`extractMessageContents`) couvre `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red team (nocturne, `nightly-llm-security.yml`) :** promptfoo valide que chaque
route bloque le corpus OWASP-LLM en mode `INJECTION_GUARD_MODE=block` ; garak
exécute des sondes (ignoré sans secret). `moderations` est inclus par cohérence.
Le mode blocage est une frontière obligatoire : `evaluatePromptInjection()`
ignore la liste de désactivation par requête que le middleware lui transmet, de
sorte que `disabledGuardrails` n'exempte **pas** une route de ce contrôle
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Le workflow nocturne (`.github/workflows/nightly-llm-security.yml`, cron +
déclenchement manuel) comporte deux tâches :

- **`promptfoo-guard` (bloquant)** — exécute `promptfoo eval -c promptfooconfig.yaml`
  avec `INJECTION_GUARD_MODE=block`. Chaque cas adversarial (par ex. « ignorez
  toutes les instructions précédentes… », jailbreaks de type DAN) vérifie que la
  réponse contient `error.code === "SECURITY_001"`, c'est-à-dire que le
  garde-fou a effectivement rejeté la requête.
- **`garak` (informatif)** — exécute garak `--probes promptinject,dan,leakreplay`
  contre une instance OmniRoute locale (`http://localhost:20128/v1`).
  Conditionné par un secret de fournisseur (`PROMPTFOO_PROVIDER_KEY`) ; s'ignore
  proprement et est suffixé par `|| true`, de sorte qu'il rapporte ses résultats
  sans faire échouer la CI.

La couverture de l'utilitaire de garde-fou (`createInjectionGuard` /
`withInjectionGuard`) s'étend à chaque route `/v1` portant un prompt ; le texte
du prompt est extrait de
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` par
`extractMessageContents()` dans `src/shared/utils/inputSanitizer.ts`.
