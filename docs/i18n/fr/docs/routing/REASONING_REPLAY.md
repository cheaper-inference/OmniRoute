# Reasoning Replay Cache (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Source de vérité :** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Dernière mise à jour :** 2026-06-28 — v3.8.40

OmniRoute capture le `reasoning_content` de l’assistant produit par les modèles en mode réflexion et le réinjecte de manière transparente dans les requêtes à plusieurs tours lorsque le fournisseur en amont l’exige. Cela élimine les erreurs HTTP 400 que les fournisseurs stricts renvoient lorsque l’historique de conversation d’un client ne contient pas le raisonnement du tour précédent.

## Pourquoi ce mécanisme existe

Plusieurs fournisseurs proposant un mode réflexion rejettent un tour de suivi si le **message précédent de l’assistant n’inclut pas le `reasoning_content` d’origine**. Le fournisseur en amont renvoie une erreur 400 accompagnée de messages tels que :

```
Paramètre incorrect : le reasoning_content du mode réflexion doit être renvoyé à l’API.
```

Cependant, les clients habituels (Cursor, Cline, Roo Code, OpenAI SDK) suppriment le `reasoning_content` de l’historique qu’ils renvoient. OmniRoute le restaure à partir d’un cache côté serveur afin que la requête reçue par le fournisseur en amont soit cohérente. Le ticket #1628 a introduit la persistance hybride en mémoire/SQLite afin que le cache survive aux redémarrages du processus.

## Architecture

```
Tour N (génération par l’assistant) :
  → la réponse contient reasoning_content + tool_calls
  → si requiresReasoningReplay(provider, model) : cacheReasoningFromAssistantMessage()
      écrit (mémoire + DB), avec chaque tool_call.id comme clé
  → transmet la réponse au client (qui peut conserver ou non le raisonnement)

Tour N+1 (le client envoie une requête de suivi) :
  → le traducteur détecte : requiresReasoningReplay(provider, model) === true
  → pour chaque message de l’assistant avec tool_calls et sans reasoning_content :
      lookupReasoning(toolCalls[0].id) → mémoire → DB
      succès → msg.reasoning_content = cached; recordReplay()
      échec  → msg.reasoning_content = "" (solution de repli historique pour les anciennes versions de DeepSeek)
  → le service en amont reçoit un historique cohérent → aucune erreur 400
```

La capture s’effectue dans `open-sse/handlers/chatCore.ts` (à deux endroits, aux deux sites d’appel de `cacheReasoningFromAssistantMessage`). La réinjection s’effectue dans `open-sse/translator/index.ts`, après la coercition du schéma, mais avant la répartition.

Les tours de l’assistant ordinaires (sans appel d’outil) utilisent un autre type de clé : `buildAssistantMessageCacheKey()` calcule l’empreinte du périmètre de la session ainsi que de la transcription normalisée au format OpenAI jusqu’à ce tour, car DeepSeek exige le raisonnement de _chaque_ tour précédent dès que `tools` est présent. Pour les cibles de l’API Responses (par exemple `opencode-go/deepseek-v4-flash`, acheminé vers `/responses`), le corps de la requête en amont contient `input`, et non `messages`. Ainsi, `translateRequest()` (`open-sse/translator/index.ts`) transmet, via une option de rappel, la transcription pivot dont il a calculé l’empreinte, et les sites de capture calculent l’empreinte de cette même transcription. La passe de réinjection Responses s’exécute sur le pivot OpenAI pour chaque format source, de sorte que les clients Anthropic Messages (Claude → OpenAI → Responses) bénéficient eux aussi de la réinjection.

## Stockage — Mémoire hybride + SQLite

Le chemin critique utilise une `Map` en mémoire (LRU selon l’ordre de création), adossée à une table SQLite pour la récupération après incident et la visibilité dans le tableau de bord.

| Couche  | Implémentation                                   | Objectif                                                          |
| ------- | ------------------------------------------------ | ----------------------------------------------------------------- |
| Mémoire | `Map` dans `open-sse/services/reasoningCache.ts` | Recherches rapides, éviction des plus anciennes à partir de 200   |
| BDD     | Table `reasoning_cache` (`src/lib/db/`)          | Persistance entre les redémarrages, alimentation des statistiques |

Les écritures sont effectuées dans les deux couches. Les lectures consultent d’abord la mémoire, puis se rabattent sur la BDD (les résultats trouvés dans la BDD sont réintégrés en mémoire). Les défaillances de la BDD ne sont pas fatales — le cache en mémoire continue de servir le chemin critique.

**Valeurs par défaut :**

- TTL : `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Nombre maximal d’entrées en mémoire : `200` (`MAX_MEMORY_ENTRIES`)
- Éviction : les entrées au `createdAt` le plus ancien en premier

## Schéma de la base de données

Migration : `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Index : `expires_at`, `provider`, `model`, `created_at`. `expires_at` est stocké sous forme de secondes depuis l’époque Unix ; la couche SELECT normalise les anciennes valeurs textuelles au moyen de `EXPIRES_AT_EPOCH_SQL`.

## Détection du fournisseur / modèle

La réinjection est activée lorsque `requiresReasoningReplay(provider, model)` renvoie `true`. La fonction vérifie deux listes dans `open-sse/services/reasoningCache.ts`.

**Identifiants de fournisseurs (correspondance exacte, insensible à la casse) :**

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

**Motifs d'expressions régulières pour les modèles (insensibles à la casse) :**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` et `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, suffixe `-free` facultatif)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

L'ajout d'un nouveau fournisseur/modèle strict implique de l'ajouter à l'une de ces listes et d'écrire un test unitaire vérifiant l'injection de la réinjection. La description de la PR doit citer la chaîne d'erreur 400 exacte provenant du service en amont qui a motivé la modification.

## API REST

Le cache expose deux points de terminaison sous `src/app/api/cache/reasoning/route.ts`. Tous deux nécessitent une authentification de gestion (`isAuthenticated` depuis `@/shared/utils/apiAuth`).

| Méthode | Point de terminaison                                      | Description                                                          |
| ------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| GET     | `/api/cache/reasoning`                                    | Statistiques + entrées paginées                                      |
| GET     | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Liste filtrée (`limit` limité à l'intervalle `[1, 200]`)             |
| DELETE  | `/api/cache/reasoning`                                    | Tout effacer (mémoire + BDD) et réinitialiser les compteurs hit/miss |
| DELETE  | `/api/cache/reasoning?provider=deepseek`                  | Effacer uniquement les entrées d'un fournisseur                      |
| DELETE  | `/api/cache/reasoning?toolCallId=call_abc`                | Supprimer une seule entrée                                           |

**Structure de la réponse GET :**

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

- **Nettoyage :** `cleanupReasoningCache()` purge les entrées mémoire expirées et exécute `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Les workers de contrôle d'intégrité l'appellent périodiquement.
- **Récupération après un plantage :** après un redémarrage, la mémoire est vide, mais la BDD conserve les entrées non expirées. La première recherche pour un `tool_call_id` donné produit un hit en BDD ; les recherches suivantes produisent des hits en mémoire.
- **Pas de raisonnement, pas de cache :** `cacheReasoningFromAssistantMessage` renvoie `0` lorsque le message de l'assistant ne contient aucun champ `reasoning_content` / `reasoning`, de sorte que les réponses sans réflexion ne coûtent rien.
- **L'écriture est également conditionnée :** les deux sites d'appel dans `chatCore.ts` (sans streaming et avec streaming) n'appellent `cacheReasoningFromAssistantMessage()` que lorsque `requiresReasoningReplay(provider, model)` vaut `true` — le même prédicat que celui vérifié côté lecture. Les installations qui n'utilisent jamais de fournisseur nécessitant une réinjection n'ont plus à supporter le coût de l'écriture, de la mise à jour de l'index et du bloc try/catch pour chaque réponse contenant un raisonnement.
- **Fournisseurs non stricts :** lorsque `requiresReasoningReplay` vaut `false` et que le format cible est OpenAI, le traducteur **supprime** tout champ `reasoning_content` des messages sortants — OpenAI Chat Completions ne l'accepte pas.

## Propriété du raisonnement opaque de Muse

Muse (`muse-code`) renvoie un raisonnement opaque lié à l'appelant (`encrypted_content`). Le rejouer avec un autre compte ou un identifiant réémis échoue en amont ; les requêtes OAuth natives utilisent donc une attribution de propriété par session au lieu d'une rotation par requête (`src/sse/services/museSessionOwnership.ts`, appliquée dans `src/sse/handlers/chat.ts`). Les connexions par clé d'API explicitement sélectionnées et les configurations utilisant uniquement des clés d'API conservent leur routage existant sans ce mode de propriété.

- Fournissez un ID de session stable à chaque tour : `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` ou `x-codex-session-id` ; vous pouvez aussi utiliser `prompt_cache_key`, `session_id`, `conversation_id` ou `metadata.session_id` dans le corps (dans cet ordre de priorité). Les IDs absents ou vides renvoient 400 lorsque deux comptes OAuth natifs ou plus sont actifs ; avec un seul compte OAuth, il n'existe aucun autre compte vers lequel tourner, donc cette requête conserve un routage sans fixation. Le périmètre inclut l'ID de la clé d'API OmniRoute de l'appelant.
- Les nouvelles sessions indépendantes sont distribuées en round-robin entre les comptes OAuth natifs actifs autorisés par la politique de connexion de la clé d'API, ordonnés par ID de connexion. Le round-robin ignore les comptes en délai d'attente de connexion, avec un état terminal (`banned`, `expired`, `credits_exhausted`) ou verrouillés pour le modèle demandé ; les échecs en amont de Muse enregistrent le délai d'attente et l'état du circuit breaker comme les autres fournisseurs. Une connexion explicitement imposée contourne le round-robin pour une nouvelle session, mais ne peut pas remplacer un propriétaire après qu'il a servi une réponse réussie.
- Tant que le propriétaire n'a pas servi de réponse réussie, une session dont le propriétaire est devenu indisponible est réattribuée à un compte fonctionnel. Après la première réponse réussie, la session reste fixée à ce propriétaire jusqu'à avoir été inactive pendant 30 jours (`MUSE_SESSION_IDLE_TTL_MS`).
- Chaque continuation et chaque tour de résultat d'outil reste fixé au propriétaire de la session : connexion, identité du compte et génération de l'identifiant d'inférence, revérifiées avant les tentatives en amont, y compris les nouvelles tentatives après renouvellement des identifiants. Les IDs d'appel/références d'élément de Responses et les IDs d'appel d'outil de Chat Completions doivent avoir été enregistrés pour cette session et cette génération.
- Les enregistrements SQLite `key_value` de l'espace de noms `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) conservent la propriété et le curseur de rotation entre les redémarrages. Chaque attribution et réponse servie actualise la marque d'activité de la session ; une session inactive plus longtemps que `MUSE_SESSION_IDLE_TTL_MS` est purgée (association du propriétaire, indicateur de réponse servie et hachages enregistrés de contenu opaque/références), au plus une fois toutes les 10 minutes et par lots bornés, de sorte qu'une réexécution ultérieure de son historique est bloquée par sécurité pour propriétaire inconnu. Les enregistrements contiennent des IDs de connexion et des hachages de l'identité du compte, des identifiants, du contenu opaque et des références de continuation, pas de secrets ni d'historique de conversation. Les clients doivent conserver et envoyer leur historique complet et leur raisonnement opaque.
- Un raisonnement opaque inconnu ou étranger, un propriétaire absent, un compte propriétaire indisponible ou un changement de génération avec historique enregistré provoque un blocage par sécurité avec un 4xx/503 explicite : jamais de bascule silencieuse entre comptes et jamais de suppression du raisonnement.
- Une clé réémise du même compte n'est adoptée que si la session n'a enregistré aucun historique rejouable ; les sessions avec des enregistrements continuent d'être bloquées par sécurité jusqu'à être recommencées à neuf.
- Une réponse vide en amont (`upstream_empty_response` / `empty_response`, rien n'étant émis vers l'appelant) fait l'objet d'au plus deux nouvelles tentatives sur le même propriétaire, après 0.5 s puis 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Si toutes les tentatives sont vides, le 502 d'origine est renvoyé sans marquage de délai d'attente ni de circuit breaker, afin qu'une réponse instable ne bloque jamais le propriétaire.
- Toutes les requêtes `muse-code` contournent les lectures et écritures du cache sémantique, y compris les écritures de streaming, afin qu'une sortie opaque en cache ne puisse pas acquérir un autre propriétaire de session.

Protections contre les régressions : `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` et `tests/unit/chatcore-semantic-cache.test.ts`.

## Voir aussi

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — disjoncteurs, délais de récupération, verrouillages de modèles
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnostic des erreurs 400 en amont
- Source : `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migration : `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Route d’API : `src/app/api/cache/reasoning/route.ts`
- Problème d’origine : #1628
