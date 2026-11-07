# Model Exposure Allow/Deny List (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇦 [bs](../../../bs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Opt-in, désactivé par défaut (`modelVisibilityAllowlist`/`modelVisibilityDenylist` tous deux vides laisse le catalogue `/v1/models` AND chaque octet du pool de candidats `auto/*` est identique). Un frère de `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) pour les opérateurs qui souhaitent une liste de modèles organisée pour des raisons qui n'ont rien à voir avec le coût.

## Pourquoi cela existe

`hidePaidModels` répond "ce modèle est-il gratuit ?" et `hideAutoCombos` répond "les identifiants virtuels `auto/*` devraient-ils être annoncés?" — ne permet pas non plus à un opérateur de gérer un sous-ensemble arbitraire de modèles (par exemple, présenter exactement les modèles qu'un client Claude Code / OpenCode donné devrait voir, indépendamment des prix). # #11481 ajoute cela sous la forme de deux paramètres de tableau de chaînes indépendants et opt-in.

## Paramètres

| Clé                        | Taper      | Défaut | Signification                                                                                  |
| -------------------------- | ---------- | ------ | ---------------------------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`   | Les entrées correspondant à un candidat le masquent du pool catalog/candidate.                 |
| `modelVisibilityAllowlist` | `string[]` | `[]`   | Lorsqu'elles ne sont pas vides, les entrées ONLY correspondant à un candidat restent exposées. |

Les deux acceptent jusqu'à 500 entrées de 200 caractères chacune maximum (validées par Zod dans `src/shared/validation/settingsSchemas.ts`). Une entrée est soit :

- un identifiant de catalogue exact — `"gpt-4o"` (identifiant de modèle nu) ou `"openai/gpt-4o"` (préfixé par le fournisseur), ou
- un modèle global utilisant `*`/`?` — par exemple `"openai/gpt-4*"` ou `"anthropic/*"` — résolu via le même `globToRegex()` matcher partagé (`src/shared/utils/globPattern.ts`) déjà utilisé par les mappages combo par modèle de `ModelRoutingSection` et `freeModels.ts::matchesOnlyPaidModels`.

Priorité : la liste de refus est vérifiée en premier (une entrée refusée est toujours masquée, même si elle correspond également à la liste autorisée) ; lorsque la liste verte n'est pas vide, seules les entrées auxquelles elle correspond survivent.

## Deux points d'étranglement, pas un

La leçon du # #6512 (un filtre de catalogue `hidePaidModels` -only permet toujours `auto/*` de se diriger vers un modèle payant, puisque le pool de candidats combo a été construit indépendamment) s'applique de manière identique ici. Le prédicat correspondant `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) est appelé depuis BOTH:

- `src/app/api/v1/models/catalog.ts` — la liste `/v1/models` elle-même, aux mêmes 5 points d'étranglement par source `shouldHidePaid()` déjà portes ( `PROVIDER_MODELS` statique, lignes de fournisseur synchronisées, lignes personnalisées, lignes sauvegardées par alias, lignes de secours gérées).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — appelé depuis `virtualFactory.ts::buildPreparedPool`, immédiatement après l'appel `filterPaidOnlyCandidates()` équivalent, de sorte qu'un modèle refusé ne peut jamais non plus être sélectionné dans un pool de candidats `auto/*`.

## Qu'est-ce que NOT filtré

Reflète le comportement existant de `hideAutoCombos`: un identifiant de modèle envoyé** explicitement** (pas via `auto/*` et non découvert via la liste du catalogue) n'est jamais bloqué lors de l'expédition — seule l'adhésion advertisement/candidate-pool est filtrée. Ceci est indépendant de `hidePaidModels`; un opérateur peut souhaiter un ensemble organisé pour des raisons qui n'ont rien à voir avec le coût, de sorte que les deux paramètres sont composés comme des filtres AND indépendants, comme la composition multi-drapeaux existante dans `catalog.ts`.

L'exportation des paramètres (`GET /api/settings/export-json`) inclut les deux tableaux textuellement, comme tout autre champ de paramètres — contrairement au filtre d'exportation par étape combinée de `hidePaidModels`, il n'y a aucun risque de réhydratation ici : un identifiant refusé intégré dans une étape combinée exportée est le choix de routage explicite de l'opérateur, et non quelque chose que la limite d'exportation doit supprimer.

## Liste des combos uniquement (`exposeCombosOnly`)

Un booléen distinct, également opt-in et `false` par défaut, pour les déploiements où les combos sont la surface du modèle public et les fournisseurs ne sont que des backends. Lorsqu'il s'agit de `true`, la liste publique (`GET /v1/models`, `GET /v1` et les autres routes de découverte `/v1` construites sur `getUnifiedModelsResponse()`) ne conserve que les lignes avec `owned_by: "combo"`: les combos utilisateur plus les combos `auto/*` intégrés (sauf si `hideAutoCombos` les cache). Il utilise le même test de ligne que le `catalogScope: "combos"` par clé, et les filtres allow/deny/scope d'une clé s'appliquent toujours par-dessus.

Activez-le** Paramètres → Routage → Modèles API listing** , ou avec `PATCH /api/settings {"exposeCombosOnly": true}`.

Comme les listes ci-dessus, cela ne change que la publicité :

- un identifiant `provider/model` explicite est toujours distribué et `GET /v1/models/{id}` le résout toujours ;
- le catalogue du tableau de bord (`GET /api/models/catalog`, utilisé par les sélectionneurs de modèles) n'est pas restreint ;
- il n'est pas reflété dans les pools de candidats `auto/*`, donc les combos `auto/*` conservent leur pool complet.
