# REASONING_REPLAY (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Source de vérité :** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Dernière mise à jour :** 2026-06-28 — v3.8.40

OmniRoute capture l'assistant `reasoning_content` produit par les modèles en mode réflexion et le relit de manière transparente sur des requêtes multi-tours lorsque le fournisseur en amont l'exige. Cela élimine les erreurs HTTP 400 que les fournisseurs stricts génèrent lorsque l'historique des conversations d'un client ne contient pas le raisonnement du tour précédent.

## Pourquoi cela existe

Plusieurs fournisseurs de modes de pensée rejettent un virage ultérieur à moins que le** Le message précédent de l'assistant inclut le `reasoning_content` original** . L'amont renvoie 400 avec des messages comme :

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Mais les clients typiques (Cursor, Cline, Roo Code, OpenAI SDK) suppriment `reasoning_content` de l'historique qu'ils rejouent. OmniRoute le restaure à partir d'un cache côté serveur afin que la requête vue en amont soit cohérente. Le numéro #1628 a introduit la persistance hybride memory/SQLite afin que le cache survive aux redémarrages du processus.

## Architecture

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), one entry per tool_call.id within the request scope
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(buildToolCallCacheKey(scope, toolCalls[0].id)) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

La capture s'effectue dans `open-sse/handlers/chatCore.ts` (deux sites, sur les deux sites d'appel `cacheReasoningFromAssistantMessage` ). La relecture se produit dans `open-sse/translator/index.ts` après la coercition du schéma mais avant l'expédition.

Les entrées d'appel d'outil sont stockées sous `buildToolCallCacheKey()`, un résumé de la portée de la demande et de l'identifiant d'appel d'outil, de sorte que le même identifiant utilisé par une autre clé ou session API ne sélectionne pas l'entrée. La portée vient de `buildReasoningCacheScope()`: l'identifiant de la clé API, plus la clé de session lorsque la requête en a une. La colonne `tool_call_id` et le tableau de bord affichent donc ce résumé pour ces entrées.

Les tours d'assistant simples (sans appel d'outil) sont saisis différemment : `buildAssistantMessageCacheKey()` digère la portée de la session ainsi que la transcription normalisée au format OpenAI jusqu'à ce tour, car DeepSeek nécessite le raisonnement de _chaque_ tour précédent une fois que `tools` est présent. Pour les cibles Responses-API (par exemple `opencode-go/deepseek-v4-flash`, acheminées vers `/responses`), le corps en amont transporte `input`, pas `messages`, donc `translateRequest()` (`open-sse/translator/index.ts`) rapporte la transcription pivot qu'il a digérée via une option de rappel et les sites de capture digèrent cette même transcription. La passe de relecture des réponses s'exécute sur le pivot OpenAI pour chaque format source, donc les clients de messages Anthropic (réponses Claude → OpenAI → ) sont également relus.

## Stockage — Mémoire hybride + SQLite

Le hot path utilise un `Map` en mémoire (LRU par création) soutenu par une table SQLite pour la récupération après incident et la visibilité du tableau de bord.

| Couche  | Mise en œuvre                                    | But                                                      |
| ------- | ------------------------------------------------ | -------------------------------------------------------- |
| Mémoire | `Map` dans `open-sse/services/reasoningCache.ts` | Recherches rapides, expulse le plus âgé à 200 ans        |
| DB      | table `reasoning_cache` (`src/lib/db/`)          | Persiste après les redémarrages, génère des statistiques |

Les écritures vont aux deux. Les lectures consultent d'abord la mémoire, puis reviennent à DB (les hits DB sont promus en mémoire). les échecs DB ne sont pas fatals — le cache en mémoire continue de servir le chemin chaud.

**Valeurs par défaut :**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Entrées mémoire maximales : `200` (`MAX_MEMORY_ENTRIES`)
- Expulsion : le plus ancien `createdAt` en premier

## Schéma de base de données

Migration : `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Index : `expires_at`, `provider`, `model`, `created_at`. `expires_at` est stocké sous forme de secondes d'époque Unix ; la couche SELECT normalise les valeurs de texte héritées via `EXPIRES_AT_EPOCH_SQL`.

## Détection de fournisseur/modèle

La relecture est activée lorsque `requiresReasoningReplay(provider, model)` renvoie `true`. La fonction vérifie deux listes dans `open-sse/services/reasoningCache.ts`.

**Fournisseur IDs (correspondance exacte, insensible à la casse) :**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Modèles de regex de modèle (insensibles à la casse) :**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` et `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, suffixe `-free` en option)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Ajouter un nouveau provider/model strict signifie l'ajouter à l'une de ces listes et écrire un test unitaire affirmant l'injection de relecture. La description PR doit citer la chaîne 400 exacte en amont qui a motivé le changement.

## REST API

Le cache expose deux points de terminaison sous `src/app/api/cache/reasoning/route.ts`. Les deux nécessitent une authentification de gestion (`isAuthenticated` de `@/shared/utils/apiAuth`).

| Méthode | Point de terminaison                                      | Description                                                       |
| ------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| GET     | `/api/cache/reasoning`                                    | Statistiques + entrées paginées                                   |
| GET     | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Liste filtrée (`limit` lié à `[1, 200]`)                          |
| DELETE  | `/api/cache/reasoning`                                    | Effacez tout (mémoire + DB) et réinitialisez les comptes hit/miss |
| DELETE  | `/api/cache/reasoning?provider=deepseek`                  | Effacer uniquement les entrées pour un fournisseur                |
| DELETE  | `/api/cache/reasoning?toolCallId=call_abc`                | Supprimer une seule entrée                                        |

**Forme de réponse GET :**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Notes opérationnelles

- **Nettoyage :** `cleanupReasoningCache()` purge les entrées de mémoire expirées et exécute `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Les agents de contrôle de santé appellent cela périodiquement.
- **Récupération après incident :** Après un redémarrage, la mémoire est vide mais le DB contient toujours les entrées non expirées. La première recherche pour un `tool_call_id` donné est un hit DB ; les recherches ultérieures sont des accès à la mémoire.
- **Pas de raisonnement, pas de cache :** `cacheReasoningFromAssistantMessage` renvoie `0` lorsque le message de l'assistant n'a pas de champ `reasoning_content` / `reasoning`, donc les réponses non réfléchies ne coûtent rien.
- **L'écriture est également fermée :** les deux sites d'appel dans `chatCore.ts` (sans streaming et streaming) n'appellent `cacheReasoningFromAssistantMessage()` que lorsque `requiresReasoningReplay(provider, model)` est `true` — le même prédicat que le côté lecture vérifie. Les installations qui ne touchent jamais à un fournisseur de relecture cessent de payer pour l'écriture, la mise à jour de l'index et le try/catch sur chaque réponse motivée.
- **Prestataires non stricts :** Lorsque `requiresReasoningReplay` est `false` et que le format cible est OpenAI, le traducteur** bandes** tout champ `reasoning_content` des messages sortants — OpenAI Chat Completions ne l'accepte pas.

## Propriété du raisonnement opaque de Muse

Muse (`muse-code`) renvoie un raisonnement opaque lié à l'appelant (`encrypted_content`). Le relire sous un autre compte ou des informations d'identification rappelées échoue en amont, donc les requêtes OAuth natives utilisent la propriété au niveau de la session au lieu de la rotation par requête (`src/sse/services/museSessionOwnership.ts`, appliquée dans `src/sse/handlers/chat.ts`). Les connexions de clé API explicitement sélectionnées et les configurations de clé API uniquement conservent leur routage existant sans ce mode de propriété.

- Fournissez une session stable ID à chaque tour : `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` ou `x-codex-session-id`; vous pouvez également utiliser `prompt_cache_key`, `session_id`, `conversation_id` ou `metadata.session_id` dans le corps (dans cet ordre de priorité). IDs manquants ou vides renvoient 400 lorsque deux comptes OAuth natifs ou plus sont actifs ; avec un seul compte OAuth il n'y a rien vers lequel effectuer une rotation, donc une telle demande conserve un routage non épinglé. La portée inclut la clé API OmniRoute de l'appelant ID.
- De nouvelles sessions indépendantes se déroulent à tour de rôle sur les comptes OAuth natifs actifs autorisés par la politique de connexion par clé API, classées par connexion ID. Le round-robin ignore les comptes pendant le temps de recharge de la connexion, avec un statut de terminal (`banned`, `expired`, `credits_exhausted`) ou verrouillé par modèle pour le modèle demandé ; Les pannes en amont de Muse enregistrent le temps de recharge et l’état du disjoncteur comme les autres fournisseurs. Une connexion explicitement forcée contourne le round-robin pour une nouvelle session mais ne peut pas remplacer un propriétaire existant.
- Jusqu'à ce que le propriétaire fournisse une réponse positive, une session dont le propriétaire est devenu indisponible est récupérée sur un compte sain. Après la première réponse réussie, la session reste épinglée à ce propriétaire jusqu'à ce qu'elle soit inactive pendant 30 jours (`MUSE_SESSION_IDLE_TTL_MS`).
- Chaque tour de suite et de résultat d'outil reste épinglé au propriétaire de la session : connexion, identité de compte et génération d'informations d'identification d'inférence, vérifiées à nouveau avant les tentatives en amont, y compris les tentatives d'actualisation des informations d'identification. Les réponses aux appels de référence IDs/item et aux appels à l'outil de complétion de chat IDs doivent avoir été enregistrées pour cette session et cette génération.
- Les enregistrements SQLite `key_value` dans l'espace de noms `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) conservent la propriété et le curseur de rotation lors des redémarrages. Chaque réclamation et réponse servie actualise le tampon d'activité de la session ; une session inactive plus longue que `MUSE_SESSION_IDLE_TTL_MS` est élaguée (épingle du propriétaire, indicateur servi et hachages opaque/reference enregistrés), au plus une fois toutes les 10 minutes et par lots délimités, de sorte qu'une relecture ultérieure de son historique échoue en tant que propriétaire inconnu. Les enregistrements contiennent IDs de connexion et des hachages d'identité de compte, d'informations d'identification, de contenu opaque et de références de continuation, et non des secrets ou l'historique des conversations. Les clients doivent conserver et envoyer leur historique complet et leur raisonnement opaque.
- Un raisonnement inconnu ou opaque étranger, un propriétaire manquant, un compte propriétaire indisponible ou un changement de génération avec historique enregistré échoue avec un 4xx/503 — explicite, un basculement entre comptes jamais silencieux et n'a jamais abandonné le raisonnement.
- Une clé de même compte rappelée n'est adoptée que lorsque la session n'a enregistré aucun historique rejouable ; les sessions enregistrées continuent d'échouer fermées jusqu'à ce qu'elles soient recommencées.
- Une réponse vide en amont (`upstream_empty_response` / `empty_response`, rien n'est émis à l'appelant) est réessayée au maximum deux fois sur le même propriétaire, après 0,5 s puis 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Si toutes les tentatives sont vides, le 502 d'origine est renvoyé sans temps de recharge ni marquage de disjoncteur, donc une réponse floue ne verrouille jamais le propriétaire.
- Toutes les requêtes `muse-code` contournent les lectures et écritures du cache sémantique, y compris les écritures en streaming, de sorte que la sortie opaque mise en cache ne peut pas acquérir un propriétaire de session différent.

Gardes de régression : `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` et `tests/unit/chatcore-semantic-cache.test.ts`.

## Voir aussi

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) disjoncteurs —, temps de recharge, verrouillages de modèles
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnostique les 400 en amont
- Source : `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migration : `src/lib/db/migrations/033_create_reasoning_cache.sql`
- itinéraire API : `src/app/api/cache/reasoning/route.ts`
- Numéro d'origine : #1628
