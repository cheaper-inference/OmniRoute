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

## Garde-corps intégrés

Le registre charge automatiquement six garde-corps par ordre de priorité lors de l'importation (voir `registry.ts` → `registerDefaultGuardrails()`) :

| Priorité | Nom                 | Étapes)        | Déposer               |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Les numéros de priorité inférieure sont exécutés** d'abord** .

### Pont de vision (`visionBridge.ts`) — Pont de modalité PR-1

Le modèle de base GLM 5.3 et `glm-5.3-{low,high,max}` ont des métadonnées `supportsVision:false` registry/spec explicites. Les variantes GLM 5.3 Flash restent des modèles à vision native. L'itinéraire `/v1/messages` de Claude Code entre dans la chaîne de garde-corps partagée de pré-appel `handleChat`** avant** Traduction de Claude vers OpenAI ; Les images imbriquées des résultats de l'outil `Read` doivent être décrites ou traitées avant que cette traduction ne les transforme en contenu OpenAI `image_url` (#17069).

Intercepte les requêtes porteuses d'images visant à** modèles sans vision** et soit redirige l'intégralité de la demande vers un modèle capable de vision, soit remplace les parties d'image par des descriptions textuelles produites par un modèle de vision configurable avant l'appel en amont. Cela permet aux fournisseurs de texte uniquement de gérer de manière transparente les charges utiles multimodales.

Couler:

1. Ignorer si le modèle cible prend déjà en charge la vision (sauf s'il apparaît dans la liste des ponts forcés `isVisionBridgeForcedModel`).
2. Extraire des parties d'image via `extractImageParts(messages)` (`visionBridgeHelpers.ts`), qui délègue au** détecteur de médias unifié** `detectMediaParts()` dans `open-sse/utils/mediaParts.ts` — la source unique de vérité partagée avec le filtre de compatibilité combo. L'extraction est autorisée pour les formes `replaceImageParts` peut recoller (l'extrait ↔ remplace le contrat) : OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` et Responses API `input_image`. Les images correspondantes imbriquées dans les sorties de l'outil Claude Code `tool_result.content` et Responses sont également extraites et remplacées à leurs chemins d'origine ; Les formes indicatrices uniquement sont des matériaux de filtre combiné et ne sont pas extraites. Ignorer si aucun n'est trouvé.
3. Résoudre la configuration d'exécution via `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) : les nouvelles clés de paramètres `modalityBridge*` gagnent ; les anciennes clés `visionBridge*` restent un** repli en un cycle** (fenêtre de restauration). Ignorer avant toute traversée de média lorsque le pont est désactivé.
4. Le sélecteur de mode (`modalityBridgeVisionMode`, voir le tableau ci-dessous) décide du réacheminement ou de la description. Reroute renvoie `modifiedPayload` avec seulement `model` échangé, plus méta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Décrire le chemin : masquer les images sur `maxImages`, composer l'invite prenant en compte les tâches, consulter le cache de description, appeler le modèle de vision** en parallèle** (`Promise.allSettled`), et injectez des parties de texte `[Image N]: <description>` à leur place. Une description échouée donne `null`: l'image brute est préservée pour les cibles unknown/vision-capable (#4012), mais un** cible directe confirmée contenant uniquement du texte** ou un combo sans vision obtient un talon de texte `(unavailable — no vision-capable provider connected)` explicite pour chaque image non décrite, y compris les échecs partiels et les images au-delà du plafond de description-appel (#17069). Le combo existant en échec décrit la solution de repli reste en place (#8430).
6. Renvoie la méta `modifiedPayload` + (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Sélecteur de mode (`modalityBridgeVisionMode`)

| Mode       | Défaut | Comportement                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Heuristique héritée, intacte (#6640/#7204) : les modèles non combinés/`auto/` sont redirigés vers le meilleur modèle de vision à moins que le modèle d'origine ne dispose déjà d'informations d'identification utilisables (puis décrivez) ; les cibles combo décrivent toujours.                                                                                     |
| `describe` |        | Décrivez toujours — le bloc de redirection est entièrement ignoré ; le modèle choisi par l'utilisateur répond toujours.                                                                                                                                                                                                                                               |
| `reroute`  |        | Forcer le reroutage : la garde du modèle de conservation des informations d'identification est contournée. Le réacheminement-** cible** Credential Guard applique toujours — lorsqu'aucune cible de vision utilisable n'existe, le pont bloque avec une erreur claire plutôt que de décrire ou d'envoyer des images brutes à une cible contenant uniquement du texte. |

Court-circuit en modes forcés** avant** les exécutions heuristiques automatiques ; Le comportement `auto` est identique en octets au garde-corps pre-PR-1.

#### Portée de la clé API (`visionBridgeKeyScope.ts`)

Lorsque la clé API de l'appelant restreint `allowedConnections`, les pools de quotas (`allowedQuotas`) ou les modèles (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), le pont sélectionne uniquement le réacheminement et décrit les modèles que la clé peut utiliser, sur les connexions que la clé peut utiliser. L'appel de description passe ensuite toujours par la boucle automatique OmniRoute avec l'en-tête `x-omniroute-self-loop-key-id`, de sorte que la demande de discussion de réception applique à nouveau la connexion et la politique de modèle de cette clé. `enforceApiKeyPolicy()` honore cet en-tête uniquement avec le support de boucle automatique, il ne peut donc que restreindre l'accès et un identifiant qui ne se résout pas est rejeté.

Si aucun modèle de vision n'est autorisé pour la clé, un** cible de texte uniquement confirmée** rejette la demande d'image localement avec un HTTP 400 clair au lieu de transmettre les octets d'image à un amont incapable (#17069). Pour les cibles avec une capacité de vision inconnue ou native, le chemin de description conserve son précédent comportement d'ouverture en cas d'échec (méta `{ skipped: true, reason: "no_permitted_vision_model" }`). Les requêtes sans clé et les clés sans ces restrictions se comportent exactement comme avant.

#### Invite de description prenant en compte les tâches (`modalityBridgeVisionTaskAware`)

Défaut** vrai** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) ajoute le texte du** dernier message utilisateur** (tronqué à 500 caractères) à l'invite de description de base, orientant la description vers ce que l'utilisateur a réellement demandé (modèle codex-vision-proxy) et demandant au modèle de vision de transcrire le texte visible. Avec le drapeau désactivé — ou aucun texte utilisateur — l'invite de base est utilisée sans modification.

La propre requête compatible OpenAI de la boucle automatique de description (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) demande toujours `image_url.detail: "high"` — sans condition, pour chaque caller/provider, sans déclenchement sur aucun signal client. L'échantillonnage peu détaillé dégrade la précision OCR pour exactement la tâche de transcription de texte demandée par cette invite, de sorte que l'appel de description lui-même demande toujours des détails élevés, quel que soit le niveau de détail utilisé par la requête entrante d'origine. Cela affecte uniquement le corps de la demande de description interne ; cela ne change pas la façon dont OmniRoute transmet le `image_url.detail` de l'appelant sur la requête principale — cette valeur par défaut étant appliquée séparément, et uniquement pour les clients OpenCode détectés, dans `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). La branche au format filaire Anthropic de la boucle automatique de description n'a pas de champ `detail` et n'est affectée par aucun des deux paramètres par défaut.

#### Décrire le plafond de production (`modalityBridgeVisionMaxChars`)

| Clé                            | Défaut | Gamme            |
| ------------------------------ | ------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ou 100-50000 |

`0` (par défaut) signifie** pas de plafond** — la description renvoyée par `callVisionModel()` est transmise sans modification, préservant le comportement existant. Toute valeur comprise entre 100 et 50 000 tronque la description avec un suffixe `…` avant qu'elle ne soit recollée en `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` dans `src/lib/guardrails/visionBridge.ts`). Augmentez cette valeur pour les tâches OCR riches en détails où le modèle en aval a besoin de la transcription complète ; réduisez-le pour limiter l'utilisation des jetons sur les modèles de vision bavards. Le champ du tableau de bord se trouve dans le panneau Avancé de l'onglet Vision (`modality-bridge-max-chars` dans `ModalityBridgeVisionTab.tsx`) et fixe toute valeur comprise entre 1 et 99 jusqu'au niveau 100 tout en laissant un `0` explicite intact. — `0` est une valeur Zod valide à part entière (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), pas simplement la valeur par défaut "non définie".

#### Décrire le cache (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL en mémoire pour les sorties de description, partagé à l'échelle du processus. Clé = `sha256(imageRef + composedPrompt + configuredBridgeModel)` avec cadrage de préfixe de longueur (pas de collisions aux limites du champ). Le composant du modèle est le** configuré** le modèle de pont, et non le modèle qui a réellement répondu — `callVisionModel` peut retomber en interne, et la saisie par tentative fragmenterait le cache. Les descriptions ayant échoué ne sont jamais mises en cache. Paramètres:

| Clé                             | Défaut | Gamme   |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Normalisation d'image à distance (récupération describe/base64 en boucle automatique)

Quand le pont récupère un** télécommande** l'image elle-même — le Anthropic décrit l'auto-appel et la conversion base64 au format claude-wire (`ensureBase64ImagesForClaudeWire`), tous deux via `fetchRemoteImageAsDataUri()` dans `visionBridgeHelpers.ts` — les données résultantes URI sont transmises via `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) avant d'être intégrées dans la demande de modèle de vision. Les images surdimensionnées sont réduites à un** Bord long de 2 048 px** (correspondant au capuchon de redimensionnement OpenAI/Anthropic s'applique déjà côté serveur), ce qui coupe le téléchargement bytes/latency sans changer ce que voit le modèle de vision. Le redimensionnement utilise `sharp`, chargé via une importation dynamique : sur une plateforme où son binaire natif ne parvient pas à se charger, `normalizeDataUri()`** ne jette jamais** — il revient à un relais des octets d'origine, donc le chemin describe/base64-conversion continue de fonctionner. Les octets non-image (une récupération qui n'a pas renvoyé d'image décodable) sont également transmis sans modification. Cette normalisation s'étend aux images que le pont récupère pour son propre — d'auto-appel. Elle n'est jamais appliquée à la charge utile de transfert brute de l'appelant, conformément au principe de mutation opt-in uniquement (Hard Rule #20).

#### Migration du schéma de paramètres +

Les nouvelles clés `modalityBridge*` sont validées par Zod dans `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`) : `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, le trio `modalityBridgeCache*` et le groupe `modalityBridgeAudio*` utilisé par Audio Bridge. La migration `141_modality_bridge_settings.sql` copie les anciennes valeurs `visionBridge*` existantes vers les nouvelles clés correspondantes (idempotente, n'écrase jamais une valeur `modalityBridge*` définie par l'opérateur) ; les clés héritées restent acceptées comme solution de secours en lecture pendant un cycle de version.

#### En-tête de transparence statistiques +

Les réponses transformées par description portent `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (construit par `buildModalityBridgeHeader()` dans `modalityBridge/bridgeStats.ts`, estampillé par `withModalityBridgeHeader()` dans `src/sse/handlers/chatHelpers.ts`). Les requêtes redirigées obtiennent** Non** en-tête — la charge utile n'a pas été modifiée et l'échange de modèle est déjà visible dans le champ `model` du corps de la réponse.

`GET /api/modality-bridge/stats` (authentification de gestion, même niveau que `GET /api/settings`) renvoie les compteurs par modalité en mémoire `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` pour `vision`, `audio` et `video`. `averageLatencyMs` utilise `latencySamples`, pas toutes les tentatives, comme dénominateur ; une opération sans synchronisation ne fabrique pas un échantillon de zéro milliseconde. `bridged` reste l'alias rétrocompatible pour les conversions réussies ; les tentatives infructueuses ne l’incrémentent pas. Les compteurs sont réinitialisés au redémarrage du processus par conception (télémétrie, pas de comptabilité).

#### Configuration du tableau de bord

La page du tableau de bord dédiée est `/dashboard/settings/modality-bridge`. Ses onglets `Vision`, `Audio` et `Video` adressables par URL préservent les paramètres de requête tout en changeant la valeur `tab`. L'onglet Vision expose l'activation, le mode, la sélection de modèle (y compris la valeur par défaut automatique), les invites tenant compte des tâches, les limites timeout/image/description-length/cache avancées, les compteurs d'exécution et un exemple de demande surveillée. L'onglet Audio est également en ligne : il expose l'activation, un sélecteur de modèle STT uniquement avec Auto, des limites timeout/max-clip, des compteurs audio et un exemple de test `input_audio`. L'onglet Vidéo est fonctionnel : il signale l'état d'exécution FFmpeg/ffprobe — l'un des quatre états UI explicites — `unknown` que la sonde est en vol ou n'a pas pu se terminer, `restricted` sur un hôte de tableau de bord enable/model/frame/video/timeout bouclage où la sonde est ignorée côté client, `unavailable` une fois sondé et confirmé manquant, ou `available` avec les versions FFmpeg/ffprobe ). expose les compteurs vidéo.

L'ancienne carte Vision Bridge sous les paramètres AI est un lien de compatibilité vers la nouvelle page ; il ne possède plus de deuxième exemplaire du formulaire. Les fournisseurs de médias relient également les flux de travail Image-to-Text et Speech-to-Text aux onglets Modality Bridge correspondants sans supprimer le terrain de jeu Speech-to-Text existant.

**Contournement d'admission en boucle automatique :** lorsque l'appel de description est acheminé via la propre boucle automatique `/v1` de OmniRoute(modèle de fournisseur non standard), la sous-requête envoie `x-omniroute-admission-bypass: internal` et est authentifiée avec les informations d'identification de boucle automatique résolues — la sentinelle `sk_omniroute` locale en mode local, ou la clé d'env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurée par l'opérateur (#1350) afin que les déploiements `REQUIRE_API_KEY=true` puissent toujours exécuter l'appel de description. Le contournement n'est respecté que pour ces informations d'identification exactes, de sorte que les clients externes ne peuvent pas utiliser l'en-tête pour ignorer l'admission.

Les valeurs par défaut héritées résident dans `src/shared/constants/visionBridgeDefaults.ts`; les nouveaux paramètres par défaut mode/task-aware/cache et le résolveur de paramètres se trouvent dans `src/shared/constants/modalityBridgeDefaults.ts`. Le garde-corps expose une option de constructeur `deps` afin que les tests puissent injecter de fausses implémentations `getSettings` et `callVisionModel`.

### Pont audio (`audioBridge.ts`) Pont de modalité — PR-3

Intercepte les demandes de discussion contenant de l'audio avant qu'elles n'atteignent une cible qui n'est pas connue pour accepter l'entrée audio. Il ne redirige jamais la demande de chat : les parties audio sont transcrites via le point de terminaison multipart existant compatible OpenAI et le modèle de chat choisi continue avec les transcriptions de texte.

Couler:

1. Résolvez `supportsAudio` via `getResolvedModelCapabilities()`. Les métadonnées explicites du registre du fournisseur gagnent, puis les métadonnées du modèle statique, puis synchronisées `modalities_input`. Une liste d'entrée déclarée sans `audio` est `false`; aucune preuve de capacité ne reste `null`. `false` et `null` activent tous deux le pont conservateur, tandis que `true` le contourne.
2. Résolvez les paramètres `modalityBridgeAudio*` et extrayez les parties audio de niveau supérieur pouvant être épissées de chaque message via le détecteur `detectMediaParts()` partagé. Les formes de fils prises en charge sont OpenAI `input_audio`, `audio_url` et `source.media_type: "audio/*"`. L'audio imbriqué est détecté pour le routage mais n'est pas supprimé par le chemin d'épissure. Le travail est plafonné par `modalityBridgeAudioMaxClips`; les parties ultérieures restent intactes.
3. Honorez un `provider/model` configuré ou laissez `selectAudioBridgeModel()` parcourir `AUDIO_TRANSCRIPTION_PROVIDERS` dans un ordre de catalogue stable et sélectionnez le premier modèle avec un identifiant de fournisseur actif utilisable.
4. `callAudioTranscription()` convertit l'audio base64/data-URI en un `file` en plusieurs parties ou télécharge un `audio_url` distant via la garde sortante publique uniquement avec un épinglage DNS et une limite de 25 MB. Il POSTs ensuite le fichier et le modèle sélectionné vers la boucle automatique `/v1/audio/transcriptions` locale, authentifiée avec `resolveSelfLoopBearer()`. La route de transcription existante effectue une recherche normale d'informations d'identification, une gestion cooldown/rate-limit et une répartition des fournisseurs.
5. Les appels réussis remplacent leurs pièces par `[Audio N]: <transcript>`. Appels exécutés avec `Promise.allSettled`: un échec individuel préserve cette partie audio d'origine (contrat #4012 ). Si chaque appel échoue et que la cible est prouvée `supportsAudio === false`, les pièces deviennent `[Audio N]: (unavailable — no STT provider connected)` (contrat #8430 ). Pour une cible inconnue (`null`), un résultat d'échec total reste intact. Une cible texte uniquement éprouvée sans informations d'identification STT utilisables reçoit le même stub explicite sans émettre d'appel réseau.

Les transcriptions réussies utilisent le cache LRU/TTL Modality Bridge à l’échelle du processus. La clé combine la référence audio, l'étiquette d'opération stable `audio-transcription` et le modèle STT sélectionné ; les échecs ne sont jamais mis en cache. Les tentatives audio mettent à jour les compteurs `bridged`, `cacheHits`, `failures` et `lastUsedAt` partagés. Les réponses transformées portent `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; les demandes intactes ne reçoivent pas de segment Audio Bridge.

Les paramètres d'exécution sont sauvegardés sur la base de données et validés par Zod :

| Clé                           | Défaut  | Gamme          |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto ou STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

Le cache partagé reste contrôlé par `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` et `modalityBridgeCacheMaxEntries`.

### Pont vidéo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepte les parties vidéo de niveau supérieur dans les achèvements de chat `messages` et les réponses API `input` avant qu'une cible sans prise en charge vidéo native connue ne soit appelée. Les formes prises en charge sont `input_video`, `video_url`, `video_source`, HTTPS URLs et `data:video/*;base64,...` data URIs. Les noms de fichiers bruts dans le texte ne sont pas traités comme des vidéos.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) possède le parcours des requêtes, la vérification capability/policy, l'agrégation par requête et la charge utile de la réponse. L'acquisition — fonctionne par vidéo, le cache des résultats complets, décrivant une séquence d'images (qui fusionne toute transcription audio déclarée par l'appelant), et par tentative metrics/abort/cleanup — est caché derrière `processVideoPart` dans `videoBridgePipeline.ts`, appelé une fois par partie vidéo dans la boucle de `preCall`. Ce module définit également les limites de port explicites `VideoMediaBrokerPort` (acquisition d'octets et extraction de trames échantillonnées), `VideoAudioTranscriptionPort` (fusion d'une transcription audio déclarée par l'appelant avec les sous-titres échantillonnés) et `VideoDrilldownPort` (la forme héritée du magasin brut). La production STT et la rétention de trame sont composées autour du port de description via `createVideoSttAdapter` et `createVideoDrilldownAdapter`; ce dernier utilise le cycle de vie partagé du handle opaque.

Le chemin de requête public `/v1` n'importe ni n'appelle jamais de sous-processus. Les vidéos distantes sont téléchargées dans une limite de 50 MiB ; Les vidéos base64 en ligne ont un plafond conservateur de 36 MiB décodé par vidéo afin que l'enveloppe model/messages/framing puisse rester dans la limite d'admission publique de la demande JSON de 50 MiB. Les estimations de longueur en ligne et de taille décodée sont vérifiées avant l'allocation. HTTPS est requis sur le URL distant initial et à chaque redirection, en utilisant la garde sortante publique uniquement existante avec épinglage DNS. Les octets traversent ensuite la limite interne exacte du courtier `POST /api/modality-bridge/video/extract`. Cette route est à la fois `LOCAL_ONLY` et `SPAWN_CAPABLE`, n'accepte qu'une demande de bouclage de confiance authentifiée par processus et n'accepte jamais un URL, un chemin de système de fichiers, un exécutable ou une liste d'arguments. Le pipeline de taille de corps API et le lecteur de corps incrémentiel du gestionnaire appliquent indépendamment un plafond d'entrée de courtier de 50 MiB. Sa file d'attente limitée exécute une extraction à la fois, autorise quatre tâches en attente et limite les entrées en attente à 100 MiB.

À l'intérieur du courtier, `ffprobe` lit un fichier local privé ; la liste d'autorisation de format fixe exclut les formats de liste de lecture et de manifeste. Pour les conteneurs de la famille MOV autorisés, les références de données externes MOV restent désactivées par défaut et la commande fixe ne les accepte pas. `ffprobe` et `ffmpeg` utilisent tous deux la liste blanche du protocole `file` -only, un thread, des tableaux d'arguments fixes, aucun shell et des exécutables résolus à partir de `PATH`. Les flux de couverture avec images jointes ne sont pas des candidats jouables. Tous les flux lisibles doivent satisfaire aux limites, et un flux par défaut explicite est préféré avant le repli déterministe de l'indice le plus bas. Les vidéos sont limitées à 600 secondes, 8 192 pixels par dimension et 33 554 432 pixels source. FFmpeg échantillonne 1 à 16 images JPEG médianes, réduit le bord long à 1 024 pixels au maximum sans mise à l'échelle des entrées plus petites et ne reçoit jamais de URL. L'échantillonnage est `uniform` par défaut. Les politiques `scene_aware` facultatives et `segment_aware` expérimentales effectuent un passage FFmpeg fixe supplémentaire sur le flux local déjà validé, sélectionnent les horodatages de scène `showinfo` limités et reviennent de manière déterministe aux mêmes points médians uniformes en cas de défaillance du détecteur, de délai d'attente, de sortie mal formée ou d'un ensemble candidat vide. Le mode sensible aux segments alloue des échantillons médians proportionnellement aux intervalles de scène validés ; Les preuves sensibles aux segments et le comportement de secours sont détaillés ci-dessous. Le plafond strict de 16 images est appliqué après sélection dans chaque police. Lorsqu'une requête prenant en compte la scène n'a qu'un budget d'une seule image, elle utilise le point médian uniforme de la fenêtre de vidéo complète ou de focus active et signale `policyEffective: uniform`: une seule image de scène sélectionnée ne peut pas préserver les deux extrémités temporelles. Un appelant peut éventuellement fournir une fenêtre de focus finie (`start`/`end` secondes) ; les limites sont limitées à la durée du média, les fenêtres inversées ou non finies sont rejetées et toutes les politiques d'échantillonnage sont appliquées uniquement à l'intérieur de l'intervalle normalisé. La fenêtre résultante est incluse dans les métadonnées d'échantillonnage et dans le préfixe de description non fiable afin que les modèles en aval puissent distinguer un extrait ciblé de la chronologie complète.

Le focus de légende sémantique est un paramètre distinct et explicite. Le mode d'analyse `full` par défaut préserve l'invite de cadre existante et ne transmet jamais le texte de la demande au modèle de légende. En mode `focused`, le pont lit uniquement le dernier `text`/`input_text` non vide créé par l'utilisateur à partir du même conteneur Chat ou Responses, le normalise en NFC, réduit les caractères de contrôle et les espaces et le limite à 500 points de code Unicode. Un résultat vide revient à l'invite `full` exacte. Un indice utilisable est sérialisé sous la forme JSON dans un bloc de contexte d'utilisateur non fiable dédié et ne peut donner la priorité qu'aux détails observables ; il ne peut pas ignorer l'avertissement distinct contre le respect des instructions, visible ou audible dans les médias. La focalisation textuelle ne déduit jamais `start`/`end` ni ne modifie l'échantillonneur temporel.

#### preuve du segment structurel FU-07

`segment_aware` utilise une passe de pré-analyse limitée sur le flux vidéo local déjà validé. La chaîne de filtres fixes s'adapte d'abord à une largeur maximale de 320 pixels, détecte les changements de scène et les intervalles figés, puis échantillonne à 1 image par seconde pour les informations de flou, de luminance moyenne et spatial/temporal. Le laissez-passer est limité à 600 échantillons structurels, un thread FFmpeg/filter, le même protocole `file` -only et les mêmes listes autorisées de conteneurs, une limite de sortie de processus 1 MiB et au plus 30 secondes à l'intérieur du abort/deadline. partagé du courtier. Il n'accepte jamais de commande, de filtre, de chemin ou URL de la demande.

Les valeurs structurelles sont des preuves d'échantillonnage déterministes, et non une compréhension sémantique de la vidéo. Ils ne déduisent pas les sujets, les actions, les légendes, les discours ou l'intention de l'utilisateur. Les limites de scène et d'arrêt sur image forment des segments ; la couverture gelée, le flou, l'exposition, les détails spatiaux et le changement temporel n'influencent que la façon dont le budget d'images existant de 1 à 16 est alloué. Un segment entièrement gelé est limité à une image, tandis que les segments non gelés se disputent le budget restant. Lorsque les limites dépassent le nombre d'images, une couverture temporelle uniforme est conservée afin que les premières coupes rapides ne puissent pas masquer un long segment de fin. Les limites de scène dans la résolution d'analyse d'une seconde d'une limite gelée sont fusionnées.

Les filtres manquants, les preuves malformed/empty, une erreur de détecteur ou le délai d'expiration limité de pré-analyse échouent à ouvrir la politique de point médian uniforme exacte. Un abandon de l'appelant ou une date limite de courtier n'échouent pas : il met fin au sous-processus en cours, empêche l'extraction ultérieure de la trame et l'arborescence temporaire privée est supprimée dans `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` génère de véritables montages FFmpeg déterministes pour les économies d'appels de sous-titres post-dédoublonnage, l'allocation budgétaire pour les mouvements denses, les preuves blur/exposure/SI-TI, les coupes rapides avec une longue traîne et les faux positifs à fondu progressif. Il enregistre le temps de mur avant l'analyse et, lorsque `/usr/bin/time` est disponible, CPU enfant et RSS maximal. Ses contrôles de qualité ne sont que des oracles structurels. La qualité réelle du modèle de légende reste `HOLD` car ce harnais n'a pas de point final autorisé ni de juge gelé. Les économies monétaires restent également `HOLD` à moins que `--caption-cost-per-call-usd` ne fournisse une estimation positive explicite par appel ; le script ne fabrique jamais aucun des deux résultats.

Chaque trame est limitée à 4 MiB, toutes les trames brutes ensemble à 23 MiB et la réponse sérialisée du courtier à 32 MiB. Un répertoire temporaire privé est supprimé dans `finally`. OmniRoute ne regroupe pas FFmpeg et n'accepte pas de chemin exécutable personnalisé. Avant le sous-titrage, le pont applique une passe de déduplication visuelle conservatrice : chaque JPEG est réduit à un tampon en niveaux de gris de 16 × 16 et est comparé uniquement à la dernière image retenue. Pour un budget de sous-titres demandé supérieur à une image, l’extraction fournit un pool de candidats limité allant jusqu’à deux fois ce budget et jamais plus de 16 images. Le plafond demandé est appliqué uniquement après la déduplication, les premiers et derniers candidats sélectionnés étant conservés lors de l'éclaircissement final lorsque le budget est d'au moins deux. La politique `grayscale-16x16-mean-cells-v2` versionnée utilise le plus grand du delta de luminance moyen et du ratio de cellules miniatures dont le delta normalisé est d'au moins 0,05. Le seuil de duplication est la constante 0,04, choisie pour des raisons de prévisibilité plutôt que exposée comme paramètre d'exécution. Ce signal secondaire à contraste élevé préserve les petits mouvements et les modifications du texte visible qu'une comparaison moyenne uniquement peut masquer. Les erreurs du comparateur ou du décodeur échouent et maintiennent la couverture. Les métadonnées de sortie séparent les candidats extraits, les images utilisées avec succès et les doublons visuels supprimés.

Une partie vidéo explicitement marquée peut demander une planche contact horodatée. Le pont construit au maximum une grille JPEG de 4 colonnes et 16 images. Chaque cellule de 512 pixels grave son horodatage source dans une bande inférieure à contraste élevé, tandis que les mêmes horodatages restent dans les métadonnées textuelles pour l'association et l'audit en aval. Le JPEG complet reste plafonné à 32 MiB. Si `sharp` ne peut pas décoder ou composer la grille, le pont revient aux images JPEG individuelles ; un abandon client se propage toujours via l'opération de feuille.

Les preuves de promotion sont délibérément distinctes du microbenchmark de composition synthétique. `scripts/perf/video-bridge-contact-sheet-eval.ts` définit un harnais A/B versionné par schéma pour de vrais modèles de vision compatibles OpenAI. Il mesure les jetons signalés par le fournisseur, la latence des murs de bout en bout (y compris la composition des feuilles), le nombre d'appels de modèle et la rétention des faits définis par le manifeste. Les réponses brutes du modèle ne sont pas écrites dans le rapport ; seuls les résumés SHA-256 et les faits correspondants IDs sont conservés. Le harnais n'effectue aucun appel réseau ou modèle payant à moins que `--execute-real` soit transmis et que `--model`, `OMNIROUTE_BASE_URL` et `OMNIROUTE_API_KEY` soient configurés. Sans cette exécution réelle explicite, son verdict lisible par machine reste `HOLD`; Les mesures synthétiques payload/call-count ne constituent pas à elles seules une preuve de promotion.

Les appelants peuvent attacher un tableau `transcript.cues` facultatif à une partie vidéo prise en charge lorsqu'ils possèdent déjà un texte aligné. Chaque signal doit contenir `text`, un intervalle `start`/`end` fini à l'intérieur de la durée sondée et un `source` sur liste blanche (`client`, `embedded` ou `audio-bridge`) ; `confidence` est par défaut `1` et doit rester entre `0` et `1`. Les répliques exactes sont réduites. OmniRoute ne démarre jamais la transcription à partir de ces métadonnées : les indices validés sont copiés dans le résultat décrit avec la source, la confiance et l'intervalle, et sont rendus sous forme d'observations non fiables à côté des légendes des images. Le texte invalide, hors plage ou sans provenance est rejeté plutôt que mélangé au flux de sous-titres. Les deux canaux de transcription du corps de la requête normalisent la provenance fournie en `client`, y compris les étiquettes `embedded` ou `audio-bridge` auto-affirmées. Seul un adaptateur appartenant au serveur peut attribuer ces étiquettes approuvées via l'argument `trustedSource` de code uniquement ; un champ de requête JSON ne peut pas atteindre cet argument. Le texte de transcription reste un contenu dérivé des médias non fiable, quelle que soit sa provenance, et ne doit jamais déterminer l’autorisation.

Un appelant avancé peut fournir une piste `audioTranscript` pour la même vidéo ; il est traité comme un texte fourni par le client et non comme une preuve de transcription sur le serveur. La couture de fusion exécute des observations visuelles et audio sous un même délai et signal d'abandon, les ordonne sur une chronologie commune, réduit les doublons exacts et rapporte un résultat partiel lorsqu'un seul côté réussit. Un `audioTranscript` invalide se dégrade en ce résultat partiel — la description visuelle est conservée et la branche audio enregistre un code d'échec nettoyé — au lieu de faire échouer la vidéo entière. La disponibilité par branche, l'indicateur partiel et les codes d'échec nettoyés sont conservés dans le résultat décrit, dans les métadonnées de garde-corps (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), dans les métadonnées du cache de résultats et dans les compteurs de fusion de pont. Le chemin Video Bridge par défaut n'appelle pas la synthèse vocale ni ne télécharge une deuxième copie multimédia ; sans cette piste explicite, il reste uniquement vidéo.

**Rétention des transcriptions (#12150 P1).** Cela s'applique automatiquement chaque fois que Video Bridge (lui-même opt-in) restitue un signal de transcription — il n'y a pas d'indicateur de rétention distinct. Lorsqu'une requête restitue un signal de transcription (un `transcript` déclaré par l'appelant ou un `audioTranscript` fusionné), le garde-corps le marque `videoBridgeObserved` et produit une ombre rédigée de la description vidéo — un rendu identique dans lequel le corps de texte libre de chaque signal est remplacé par `[redacted-video-transcript]`, construit en substituant le champ de signal structuré avant que la chaîne ne soit assemblée (jamais en analysant le texte aplati, donc aucun contenu de signal — contradictoires ou ordinaires, y compris les corps contenant `]` tels que `[inaudible]`/`[music]` — peuvent survivre). Le corps persistant de la demande du journal des appels remplace chaque partie de texte dérivée de la vidéo par cette ombre rédigée, assortie d'une égalité de contenu ; l'ancre `fullText` est relue à partir de la charge utile de garde-corps pré-appel terminée, de sorte que la correspondance réussit toujours après que les garde-corps de chaîne ultérieurs (les masques PII et d'informations d'identification, priorités 10/95) réécrivent le texte de description en place et après l'injection system-prompt/handoff/memory remodèle le tableau de messages. Le corps envoyé en amont vers le modèle est inchangé. Une requête observée ne remplit également aucune mémoire durable (l’extraction dérivée de la requête et de la réponse est ignorée), de sorte que la propre réponse du modèle ne peut pas faire écho au texte de transcription dans la mémoire.

**Champs vidéo bruts (#12430).** Lorsque le pont est activé et que la prise en charge vidéo native est inconnue ou absente, les champs `transcript`/`audioTranscript` définis activent également `videoBridgeObserved`, même après un échec de description ou une limite `maxVideos`. `null` et les chaînes vides comptent ; Les champs absents et les métadonnées non vidéo ne le sont pas. Les copies conservées suppriment ces champs ou omettent la demande, et caches/Memory sont contournés.

Sur ces chemins de secours, les signaux d'appelant valides deviennent des parties `text`/`input_text` prises en charge plutôt que des champs de fournisseur non standard. Les deux pistes fournies par la demande restent des observations `client` non fiables, avec un avertissement explicite indiquant que la vidéo n'a pas été décrite et que les horodatages n'ont pas été vérifiés par rapport aux médias. Les budgets totaux et par cue 256-cue/64-KiB existants s'appliquent simultanément aux deux pistes ; les horodatages doivent correspondre au plafond de 600 secondes du courtier et à toute fenêtre de focus fournie. Les pistes invalides sont supprimées et ne sont pas transmises sous forme de texte arbitraire ; un frère ou une sœur valide peut toujours être utilisé à moins que son budget combiné ne soit dépassé. Les champs Null/empty n'ajoutent aucun texte. Aucune récupération ou transcription multimédia n’est ajoutée par cette solution de secours. Les champs d'extension de transcription sont supprimés du support vidéo de secours et de ses objets `video_url`/`source`. La liste blanche des fils OpenAI reste stricte ; les supports vidéo natifs inconnus restent disponibles et les cibles textuelles connues conservent des marqueurs sûrs. Les ombres de rédaction structurées protègent le texte de transcription ajouté, tandis que la demande originale appartenant à l'appelant reste inchangée. Les cibles prises en charge en mode natif et les ponts désactivés conservent leur comportement de contournement existant.

Les copies conservées supplémentaires utilisent le même signal de demande observée. L'instantané brut de la demande du client avant le garde-corps, la demande en attente en mémoire et le journal des demandes rejetées anticipées remplacent structurellement les champs de transcription dans les parties vidéo ; les invites de chaîne synthétisées par les étapes du pipeline et le transfert de contexte sont rédigées au niveau du récepteur de corps de demande persistant. Le marqueur `video_content_removed` persistant fait échouer la continuation `previous_response_id` plutôt que de reconstruire le texte qui a été intentionnellement ignoré. Si une requête observée perd son ombre de rédaction par partie avant la journalisation, ou même si l'une des nombreuses ombres vidéo ne correspond pas après des mutations ultérieures de la requête, le corps de la requête conservé est entièrement omis au lieu de conserver une transcription partiellement rédigée.

Pour une requête observée, une réponse de modèle peut citer n'importe quelle partie de la transcription sans limite de signal structurée. Son journal d'appels persistant `responseBody` est donc remplacé par un marqueur d'omission ; l'artefact détaillé du pipeline (qui peut inclure des corps upstream/client et des morceaux de flux) n'est pas conservé. Les caches sémantiques, d'idempotence et de relecture de raisonnement contournent les lectures et les écritures pour cette requête. La demande du fournisseur et la réponse visible par le client restent inchangées. Les premiers octets keepalive sont vidés du tampon temporaire lorsque l'artefact détaillé est omis. L'avertissement EventStream mal formé de Kiro ne signale que le nombre d'octets de charge utile, jamais son contenu ou l'erreur brute de l'analyseur JSON. Cela ne prétend pas que tous les diagnostics provider/plugin non liés ont été audités ; le balayage plus large du puits retenu est suivi dans #11658.

Le cycle de vie interne `/api/modality-bridge/video/drilldown` est un substrat de cache loopback/token-authenticated distinct. Chaque opération nécessite également un principal opaque canonique ID. Avant qu'un appelant de production soit activé, il doit dériver ce ID du locataire authentifié et ne doit jamais transmettre une valeur sélectionnée par le client. Les clés de cache lient ce principal à la session canonique et à la référence vidéo IDs, stockent uniquement leurs clés SHA-256-derived et étendent les lectures et la suppression au même principal. Le cache stocke au maximum 16 trames JPEG dérivées par entrée, les expire après dix minutes et prend en charge les lectures `start`/`end` limitées ou la suppression explicite de session.

Chaque principal est limité à 16 entrées et 64 MiB de données JPEG canoniques. Ces limites sont indépendantes du plafond global 64-entry/256 MiB : la pression du quota principal expulse uniquement les entrées les moins récemment utilisées par ce principal avant que l'expulsion globale LRU ne soit prise en compte. Les entrées expirées sont effacées de la comptabilité principale et globale en fonction de l'activité du cache, tandis que l'annulation et l'échec de validation n'entraînent pas de remplacement partiel.

Le cache rejette les bases 64 non canoniques, les remplissages excessifs, les supports non JPEG, JPEGs mal formés ou tronqués et JPEGs qui produisent un avertissement lors d'un décodage `sharp` d'image complète limité. Il réencode chaque image acceptée en tant que JPEG canonique, dérive la largeur et la hauteur des octets décodés au lieu de faire confiance aux champs de l'appelant et supprime tous les octets polyglottes de fin plutôt que de les conserver. Seul le tampon compressé canonique limité est imputé aux deux quotas. La limite de câblage JSON inclut les frais généraux Base64 pour le plafond d'entrée décodée de 32 MiB. Chaque dérivation stockée enregistre son JPEG format/resolution validé, sa politique d'échantillonnage, sa version de dérivation, son heure de création, son hachage de contenu calculé par le serveur et sa référence parent hachée, ainsi que le hachage du contenu parent de l'appelant de confiance. L'annulation est vérifiée entre les phases decode/hash asynchrones avant la validation du cache atomique.

Le producteur de production réutilise les images de courtier déjà dérivées uniquement après une analyse visuelle réussie, sans deuxième vidéo download/extraction. Cela nécessite l'opérateur `modalityBridgeVideoDrilldownEnabled=true`, un `drilldown: true` strict par partie et un enregistrement de clé API authentifié ID. Les valeurs principal/session déclarées par le client n'établissent jamais la propriété. Sans ces trois conditions, il ne hache pas, ne redimensionne pas et ne conserve pas les images supplémentaires. L’échec de rétention préserve la réponse visuelle utilisable. Les requêtes consenties contournent le cache des résultats de la vidéo entière, de sorte que les résultats mis en cache ne sont jamais relus.

Les réponses JSON et SSE réussies exposent au plus quatre handles opaques dans l’en-tête `x-omniroute-video-drilldown` délimité. Les origines autorisées du navigateur peuvent lire cet en-tête sans élargir la politique d'origine CORS. Les nouveaux descripteurs utilisent `v1.<32-byte random base64url token>` et le registre conserve uniquement leurs hachages SHA-256. L'analyseur reader/header accepte également les anciens jetons de 64 hexadécimaux. Le consommateur public authentifié est `GET /api/v1/video-bridge/drilldown?handle=...`, contrôlé indépendamment par `modalityBridgeVideoDrilldownRemoteEnabled=true`. La fausse persistance explicite révoque l'accès même lorsque la solution de repli de l'environnement `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` hérité est activée. La rétention de la production a l’héritage analogue de repli `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Les deux solutions de secours sont désactivées par défaut.

Le consommateur tire la propriété de la clé authentifiée et applique la politique de clé : GET et DELETE appartiennent tous deux à la catégorie des points de terminaison `video`, y compris les alias `/v1` et `/api/v1`. Les clés avec une liste autorisée de point de terminaison non vide doivent inclure `video`; les clés sans restriction restent compatibles. Le consommateur renvoie le même 404 pour les identifiants de clé inconnus, expirés et autres. Il accepte `variant=preview|standard|detail` (dimension JPEG maximale 320/640/1280, jamais mise à l'échelle), `limit=1..8` (ou l'ancien alias `frames`, jamais les deux), `page` de base zéro et les secondes de mise au point `start`/`end` facultatives. Les clés de requête en double et les fenêtres de focus inversées sont rejetées. Chaque variante renvoyée possède un hachage de son contenu réel et des métadonnées de résolution réelle, liées à la source conservée. Les variantes sont dérivées de la lecture plutôt que stockées sous forme de copies supplémentaires conservées. La réponse JSON, y compris Base64/envelope, est plafonnée à 32 MiB; une page surdimensionnée renvoie 413 et le client doit demander moins de cadres. Lit l'annulation du chèque autour de chaque redimensionnement et revérifie la validité de la poignée avant de revenir. `DELETE` par propriétaire est idempotent ; la suppression ou l'expiration TTL libère la source conservée et la comptabilité d'utilisation.

Le magasin partagé est local au processus : les descripteurs expirent au redémarrage et ne sont pas transférables entre des processus OmniRoute indépendants. Les statistiques de gestion exposent la politique de rétention/à distance efficace et regroupent uniquement entries/bytes conservés, jamais les médias, les références, IDs principaux ou les descripteurs. Le panneau Paramètres vidéo affiche ces valeurs et peut conserver les deux commutateurs de consentement. Cette documentation de mise en œuvre ne constitue pas une preuve de déploiement ou de promotion en direct ; l'acceptation du modèle réel est suivie séparément.

Les images sont sous-titrées séquentiellement avec le modèle vidéo configuré. Un remplacement vidéo vide hérite du paramètre Vision ; si les deux sont vides, le routeur automatique Vision sélectionne le modèle efficace compatible avec la vision. Les légendes réussies remplacent la partie originale par un préfixe `[Video description:` stable qui marque également le texte comme une observation dérivée du média non fiable et indique aux modèles en aval de ne pas suivre les instructions trouvées dans les médias. Les clés de cache de légende de trame incluent les octets JPEG, l'invite, l'horodatage et le modèle effectif ; seules les légendes réussies sont mises en cache. Les entrées du cache conservent le modèle de producteur réussi réel, y compris un modèle de secours ; le pont signale `mixed` lorsque différents cadres ont été produits par différents modèles. Un accès au cache réutilise cette identité de producteur au lieu de la réétiqueter comme plan de routage demandé. Le cache des résultats de la vidéo entière est saisi sur chaque entrée qui modifie l'invite de sortie —, le modèle effectif, la politique d'échantillonnage, le nombre d'images, le mode d'analyse sémantique, l'empreinte SHA-256 de l'indice de focus normalisé, la fenêtre de focus, `transcript`, `audioTranscript` et l'indicateur de feuille de contact —, donc changer l'une de ces dimensions est un manque de cache, jamais une réutilisation obsolète. La version visuelle de la politique de déduplication, le seuil et le nombre limité de trames candidates sont également explicites dans la clé et les métadonnées du cache de résultats ; un changement de politique ne peut donc pas réutiliser une description vidéo complète obsolète. Les métadonnées du cache de résultats v4 conservent le mode et l'empreinte digitale, jamais la tâche brute de l'utilisateur. Les métadonnées Guardrail indiquent à la fois les modes d'analyse demandés et efficaces ; un mode `focused` demandé sans texte utilisateur utilisable est signalé comme effectivement `full`.

Le garde-corps extrait chaque partie vidéo prise en charge mais ne décrit que `modalityBridgeVideoMaxVideos`. Pour une cible dont il est prouvé qu'elle a `supportsVideo === false`, les vidéos ayant échoué et dépassant la limite deviennent des marqueurs de texte sécurisés explicites, de sorte qu'aucune vidéo brute ne survit. Lorsque la capacité est inconnue, ces pièces conservent leur support vidéo ; toute transcription de secours suit la conversion de texte délimitée ci-dessus. Les cibles avec `supportsVideo === true` contournent le pont. Le signal d'abandon de la demande client se propage via le téléchargement, la file d'attente du courtier, les sous-processus et les appels de sous-titres ; les abandons s'arrêtent entre les vidéos et ne manquent jamais d'ouverture aux médias bruts.

Les paramètres d'exécution sont sauvegardés sur la base de données et validés par Zod :

| Clé                                 | Défaut      | Portée / comportement                                                                                               |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime facultatif, opt-in                                                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` préserve les légendes génériques ; `focused` utilise un contexte de dernier utilisateur limité et non fiable |
| `modalityBridgeVideoModel`          | `""`        | Hériter du modèle Vision Bridge                                                                                     |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ou `segment_aware` proportionnel ; la panne du détecteur revient à `uniform`               |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1 000 à 120 000 ms                                                                                                  |

Les valeurs de délai d'expiration vidéo persistantes héritées supérieures à 120 secondes sont limitées à la date limite du courtier ; les nouveaux paramètres écrits au-dessus de cette limite sont rejetés. `GET /api/modality-bridge/video/runtime` nécessite une localité de bouclage estampillée de confiance avant l'authentification ou la vérification d'exécution, puis nécessite une authentification de gestion. Il renvoie uniquement `available`, les versions FFmpeg/ffprobe purifiées et une raison fixe pour laquelle le runtime n'est pas disponible. Le point de terminaison d'extraction interne n'est pas un téléchargement public API: la saturation de la file d'attente renvoie `503` plus `Retry-After`, une déconnexion de l'appelant renvoie `499` et la date limite fixe du courtier renvoie `504`. Les réponses converties ajoutent `video->text;model=<visionModel>;parts=<videos>` à l'en-tête central `x-omniroute-modality-bridge` sans supprimer les segments Vision ou Audio.

### Masque PII (`piiMasker.ts`)

Fonctionne sur** les deux** étapes.

- **`preCall`** clone la charge utile, parcourt `system`, `messages`, `input` et `prompt` (y compris les éléments de chaîne simples) et applique `processPII()` (à partir de `@/shared/utils/inputSanitizer`) aux champs de chaîne `content`/`text`. Lorsque `PII_REDACTION_ENABLED=true`, PII détecté est expurgé dans la charge utile sortante. Ceci est indépendant de `INPUT_SANITIZER_MODE` (qui contrôle uniquement la politique d'injection rapide). Lorsque la rédaction est désactivée, l'appel enregistre les décomptes de détection sans réécrire le contenu.
- **`postCall`** clone en profondeur la réponse, exécute `sanitizePIIResponse()` plus le masqueur de forme Responses-API (`maskResponsesOutput` — couvre `output_text` et `output[].content[].text`). En cas de rédaction, la réponse modifiée remplace l'originale.

Le garde-corps ne bloque jamais ; il annote uniquement (`meta.detections`, `meta.redacted`) ou réécrit.

#### Sélection par type, modèles personnalisés et compteurs de détection

**Tableau de bord → Paramètres → Sécurité → masquage PII** choisit _quoi_ est masqué. Il n'active pas le masquage : c'est toujours `PII_REDACTION_ENABLED` (demande) et `PII_RESPONSE_SANITIZATION` (réponse + SSE), tous deux désactivés par défaut.

- **Sélection par type** — les identifiants intégrés sont répertoriés dans `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Non défini signifie tous les types (le comportement avant que ce paramètre n'existe). Le modèle `ssn_us` du moteur de requêtes correspond à `ssn`. Les modèles (Minimal, Standard, Financial, Brazil, USA, GDPR, POPIA, Full) ne remplissent que les cases à cocher du UI.
- **identifiants GDPR et POPIA** — douze identifiants intégrés couvrant les identifiants personnels EU et sud-africains (tableau ci-dessous). Leurs expressions régulières, validateurs et balises de juridiction se trouvent dans une seule table, `src/shared/utils/piiPatterns.ts`, que consomment à la fois le désinfectant de réponse (`src/lib/piiSanitizer.ts`) et le masqueur de requête (`src/shared/utils/inputSanitizer.ts`). Une correspondance n'est expurgée que lorsque son validateur l'accepte ; une simple série de chiffres ne suffit jamais. Un opérateur qui a enregistré une sélection restreinte avant que ces identifiants n'existent, conserve le comportement qu'il avait jusqu'à ce que les nouveaux identifiants soient cochés.
- **Modèles personnalisés** — jusqu'à 20 modèles d'expressions régulières ou génériques (`*` = jusqu'à 64 caractères autres que des espaces, `?` = un). Les correspondances deviennent `[CUSTOM_REDACTED]`. Chaque modèle passe par `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`) : au maximum 500 caractères, les indicateurs sont limités à `g i m s u`, doivent être compilés, doivent passer `safe-regex` (backtracking catastrophique) et ne doivent pas correspondre à une chaîne vide ou à un espace réservé de rédaction. Un modèle qui échoue est refusé lors de l'enregistrement et du test, et une ligne stockée qui échoue est ignorée au moment de l'exécution au lieu d'être compilée. Les modèles personnalisés ne s'exécutent que lorsque le masquage est activé.
- **Compteurs de détection** — compte par type (valeurs jamais correspondantes), conservé en mémoire et réinitialisé au redémarrage (`src/lib/pii/piiDetectionStats.ts`). Ils ne font qu'augmenter lorsque le masquage est activé.

Les paramètres résident dans la table `key_value` (espace de noms `pii_settings`, `src/lib/db/piiSettings.ts`) et sont lus via un cache 1 s. API:

| Méthode | Chemin                   | But                                                                        |
| ------- | ------------------------ | -------------------------------------------------------------------------- |
| `GET`   | `/api/settings/pii`      | État du pavillon, `enabledTypes`, `customPatterns`, compteurs de détection |
| `PUT`   | `/api/settings/pii`      | Remplacer `enabledTypes` (`null` = all) and/or `customPatterns`            |
| `POST`  | `/api/settings/pii/test` | Exécutez un modèle sur un échantillon d'au plus 8 KB; rien n'est stocké    |

Tous les trois nécessitent une authentification de gestion et valident le corps avec Zod (`src/shared/validation/schemas/piiSettings.ts`). Avec la connexion désactivée (`requireLogin=false`), `GET` et le point de terminaison de test sont ouverts, mais `PUT` a toujours besoin d'une session de tableau de bord, d'une clé `manage` -scope API, d'un jeton d'accès `oma_` avec une portée d'écriture ou supérieure, ou du jeton CLI ou du jeton de service interne envoyé depuis le bouclage.

#### identifiants GDPR (EU) et POPIA (Afrique du Sud)

| Identifiant         | Identifiant                       | Validation                                                                                       |
| ------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------ |
| `iban`              | IBAN                              | Pays connu, longueur exacte pour ce pays, ISO 13616 MOD-97-10                                    |
| `eu_vat`            | numéro EU VAT                     | Préfixe connu de l'État membre et format numérique de cet État (pas de recherche VIES )          |
| `es_dni_nie`        | Espagnol DNI / NIE                | Lettre de contrôle (valeur mod 23) ; NIE est `X/Y/Z` + 7 chiffres                                |
| `it_codice_fiscale` | Code fiscal italien               | Lettre de contrôle des tables de position odd/even                                               |
| `pl_pesel`          | PESEL polonais                    | Somme de contrôle pondérée et date de naissance codée qui existe                                 |
| `nl_bsn`            | BSN néerlandais                   | 11-preuve (poids 9..2, -1)                                                                       |
| `de_steuer_id`      | Carte d'identité allemande Steuer | ISO 7064 Mod 11,10 plus les règles de structure des chiffres (pas de 0 en tête)                  |
| `se_personnummer`   | Numéro de personne suédois        | Luhn sur les dix derniers chiffres et une date de naissance plausible (10 ou 12 chiffres)        |
| `za_id`             | Numéro ID sud-africain            | Luhn sur les 13 chiffres, naissance valide month/day, chiffre de citoyenneté 0 ou 1              |
| `za_phone`          | téléphone sud-africain            | Préfixe `+27` / `27`, ou la forme nationale `0..` écrite avec un espace ou un trait d'union      |
| `za_vat`            | Numéro VAT sud-africain           | 10 chiffres commençant par `4`** et** "VAT" / "BTW" dans les 48 caractères précédant             |
| `za_tax_ref`        | Réf. fiscal sud-africain.         | 10 chiffres commençant par `0`-`3`, Luhn,** et** "tax" / "SARS" dans les 48 caractères précédant |

Étant donné que les formats à chiffres uniquement entrent en collision avec les numéros de commande, les numéros de build et les horodatages, les plus faibles (`za_vat`, `za_tax_ref`) ont besoin du mot-clé, et un numéro `0..` à dix chiffres n'est pas traité comme un numéro de téléphone sud-africain. IBANs (`GB29 NWBK ...`) espacés ne correspondent pas. Sur le chemin de streaming, le signal est recherché uniquement à l'intérieur du bloc actuel. Les identifiants précèdent les modèles téléphoniques génériques, donc un identifiant validé conserve son propre espace réservé (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Les modèles `gdpr` et `popia` sélectionnent respectivement les identifiants EU et sud-africains. Le masquage lui-même reste opt-in (Hard Rule #20) : rien ici ne modifie un indicateur de fonctionnalité par défaut.

### Injection rapide (`promptInjection.ts`)

Détecte les structures contradictoires dans le contenu fourni par l'utilisateur et applique la politique configurée. Le comportement est déterminé par les variables d'environnement et les options du constructeur :

| Paramètre        | Variable d'environnement                                                                              | Défaut | Effet                                                                                                                                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Activé           | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Quand `false`, le garde-corps court-circuite.                                                                                                                                                                                      |
| Mode             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Politique d'injection : `block`, `warn` ou `log`. (`redact` est accepté pour la rétrocompatibilité mais le fait** pas** texte d'injection de bandelette ; la demande de réécriture PII est contrôlée par `PII_REDACTION_ENABLED`.) |
| Seuil de blocage | option `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Gravité minimale requise pour bloquer. Medium est en observation uniquement par défaut.                                                                                                                                            |

**Priorité des modes** (`getMode`) : appelant `options.mode` → `INJECTION_GUARD_MODE`** remplacement de l'indicateur de fonctionnalité DB** (Tableau de bord Paramètres → Indicateurs de fonctionnalités → ) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Un remplacement du tableau de bord l'emporte donc sur les variables d'environnement, de sorte que les Feature Flags UI contrôlent la garde en cours d'exécution en direct (pas de redémarrage). La lecture DB est sécurisée : en cas d'erreur, la garde revient au comportement basé sur l'environnement, et lorsqu'aucun remplacement n'est défini, le comportement est identique à la résolution basée sur l'environnement uniquement.

Sources de détection :

1. `sanitizeRequest()` depuis `@/shared/utils/inputSanitizer` (ensemble de détecteurs partagés utilisé ailleurs dans le pipeline).
2. `DEFAULT_GUARD_PATTERNS` intégré (actuellement `system_override_inline` et `markdown_system_block`, tous deux de gravité `high` ).
3. `customPatterns` facultatif transmis via les options du constructeur (chaînes, regex ou enregistrements `{ name, pattern, severity }` ).

Quand `mode === "block"`** et** au moins une détection atteint le seuil de gravité, `preCall` renvoie `{ block: true, message: "Request rejected: suspicious content detected" }`. En modes `warn`/`log`, le garde-corps enregistre mais autorise l'appel. L'assistant partagé `evaluatePromptInjection()` est également exporté pour les appelants qui doivent évaluer les invites sans passer par le registre.

**Numérisation liée (v3.8.20) :** le détecteur inspecte uniquement le** 16 premiers KB** du texte d'invite joint — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 octets) dans `src/shared/utils/inputSanitizer.ts`. `detectInjection()` et `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` avant d'exécuter la boucle de modèle. Les directives d'injection se trouvent en haut d'une entrée, ce qui limite l'expression régulière CPU/GC sur des charges utiles de plusieurs centaines de Ko sans affaiblir la détection (cf. #3932, #4041).

### Masqueur d'informations d'identification (`credentialMasker.ts`)

Fonctionne sur** les deux** étapes, dernières de la chaîne par défaut (priorité `95`). Rédige les modèles bien connus de clé API/jeton secret de la charge utile sortante (contenu du message, arguments d'appel d'outil, résultats de l'outil)** et** la réponse du fournisseur, de sorte qu'un identifiant collé dans une invite (ou renvoyé par un résultat d'outil) ne soit pas divulgué au fournisseur en amont ou renvoyé au client.

- **Inscription uniquement** , même convention que la rédaction PII (Hard Rule #20-adjacent) : désactivé sauf si `settings.credentialRedactionEnabled === true`** ou** `CREDENTIAL_REDACTION_ENABLED=true`. Lorsqu'il est désactivé, le garde-corps est un — sans opération, il ne bloque jamais et ne réécrit jamais.
- `redactCredentials()` parcourt l'arborescence payload/response complète (`walkValue()`, prototype-pollution-safe, cycle-safe via `WeakSet`) et remplace les correspondances par un espace réservé `[REDACTED:<type>]`, clonant uniquement les branches qui ont réellement changé.
- `CREDENTIAL_PATTERNS` couvre les clés du fournisseur LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), les jetons VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), les clés de paiement (Stripe, Square), les clés cloud (AWS access key, Twilio, SendGrid, Mailgun), les clés privées / JWTs, des chaînes de connexion portant les informations d'identification (`mongodb://user:pass@...`, etc.) et un modèle de valeur d'en-tête générique `Authorization`/`x-api-key`/`api-key`/`apikey`. Les clés en forme d'en-tête (`authorization`, `x-api-key`, `api-key`, `apikey`) sont rédigées structurellement (valeur uniquement, préfixe de schéma comme `Bearer `/`Basic ` préservé) plutôt que via l'expression régulière de texte générique.
- Le garde-corps ne bloque jamais ; il réécrit uniquement (`modifiedPayload` / `modifiedResponse`) et annote (`meta.credentialsRedacted`, `meta.count`).

Garde de régression : `tests/unit/credential-masker-guardrail.test.ts`.

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
