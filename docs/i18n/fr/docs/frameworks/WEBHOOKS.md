# Webhooks (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Source de vérité :** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Dernière mise à jour :** 2026-06-28 — v3.8.40

OmniRoute peut déclencher des webhooks HTTP sur les événements de la plateforme. Utilisez-les pour intégrer Slack, PagerDuty, Datadog, les services d'alerte internes ou tout récepteur HTTP.

Le répartiteur signe chaque livraison avec HMAC-SHA256, réessaye en cas d'échecs transitoires, suit l'état de livraison par webhook et désactive automatiquement les points de terminaison qui continuent d'échouer.

## Événements pris en charge

Le type `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, consommé par `src/lib/webhookDispatcher.ts`) modélise actuellement sept événements :

| Événement                 | Se déclenche quand                                                                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Une demande proxy se termine avec succès                                                                                                                   |
| `request.failed`          | Une requête proxy échoue après tout retries/fallback                                                                                                       |
| `quota.exceeded`          | Une clé API franchit un seuil budget/quota                                                                                                                 |
| `proxy.set_aside`         | Un membre du proxy pool est mis de côté après des refus répétés (transition uniquement)                                                                    |
| `proxy.pool.exhausted`    | Chaque membre d'une portée de pool de proxy est mis de côté                                                                                                |
| `provider.reset_redeemed` | Appliquer automatiquement les réinitialisations en banque, échanger un crédit de réinitialisation ou la réinitialisation de la session hebdomadaire Claude |
| `test.ping`               | Événement synthétique utilisé par le point de terminaison du test                                                                                          |

Les abonnements acceptent le `"*"` littéral pour recevoir chaque événement. Les noms d'événements inconnus dans `events` sont ignorés au moment de la répartition.

> Remarque : le répartiteur API est câblé, mais les sites d'appels de production pour certains événements non `test.ping` sont toujours en cours d'atterrissage. Vérifiez `grep dispatchEvent` pour voir quels chemins appellent actuellement le répartiteur dans votre version.

## Architecture

```
Caller (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filter by webhook.events
    -> for each match (in parallel):
       deliverWebhook(url, payload, secret)
         build payload { event, timestamp, data }
         sign body with HMAC-SHA256 (if secret present)
         POST with 10s timeout
         retry up to 3 times on 5xx / network error
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

La répartition est une tâche facile pour l'appelant : `Promise.allSettled` avale les erreurs par webhook afin qu'un mauvais récepteur ne puisse pas bloquer les autres.

## Signature HMAC

Lorsqu'un webhook possède un `secret`, OmniRoute signe le corps JSON et envoie :

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Les noms d'en-tête utilisent le préfixe `X-Webhook-*` (et non `X-OmniRoute-*`). La valeur de signature est `sha256=<hex>` — vérifiez le préfixe complet.

Si `createWebhook` est appelé sans secret, le module DB en génère un (`whsec_<48 hex>`) donc tous les webhooks sont signés par défaut.

### Vérification sur le récepteur

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Vérifiez toujours par rapport au **brut** corps de la requête, avant toute analyse JSON.

## Politique de nouvelle tentative et d'échec

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Délai d'attente de 10 secondes par tentative (`AbortController`).
- HTTP 2xx compte comme un succès.
- HTTP 3xx/4xx compte comme un statut final non réessayable — enregistré comme livré avec `success = res.ok`.
- HTTP 5xx et les erreurs réseau sont réessayées avec une interruption exponentielle : `2^attempt * 1000 ms` (1s, 2s, 4s).
- Après `maxRetries`, la livraison est enregistrée comme ayant échoué.
- Chaque livraison met à jour `last_triggered_at`, `last_status` et réinitialise ou incrémente `failure_count`.
- Le répartiteur appelle `disableWebhooksWithHighFailures(10)` après chaque diffusion, de sorte que tout webhook avec `failure_count >= 10` est automatiquement désactivé.

## Base de données

Table `webhooks` (migration `011_webhooks.sql`) :

| Colonne             | Taper   | Remarques                                                  |
| ------------------- | ------- | ---------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                       |
| `url`               | TEXT    | Destination URL                                            |
| `events`            | TEXT    | Tableau JSON ; `["*"]` par défaut                          |
| `secret`            | TEXT    | Secret HMAC (généré automatiquement s'il n'est pas fourni) |
| `enabled`           | INT     | 0/1; la valeur par défaut est 1                            |
| `description`       | TEXT    | Étiquette humaine facultative                              |
| `created_at`        | TEXT    | `datetime('now')`                                          |
| `last_triggered_at` | TEXT    | Mis à jour à chaque tentative de livraison                 |
| `last_status`       | INT     | Statut HTTP de la dernière tentative (réseau 0 = )         |
| `failure_count`     | INT     | Se réinitialise à 0 en cas de succès, + 1 en cas d'échec   |

L'historique de livraison est conservé dans la table `webhook_deliveries` dédiée (migration `069_webhook_deliveries.sql`, écrite via `src/lib/db/webhookDeliveries.ts::insertDelivery` à chaque tentative), en plus des compteurs agrégés sur la ligne `webhooks`. Les métadonnées de type (Slack / Discord / Telegram / transformateurs de charge utile personnalisés) ont été ajoutées par `070_webhooks_kind_metadata.sql`.

## REST API

Tous les points de terminaison nécessitent une authentification de gestion (`requireManagementAuth`).

| Point de terminaison            | Méthode | Description                                      |
| ------------------------------- | ------- | ------------------------------------------------ |
| `/api/webhooks`                 | GET     | Liste des webhooks (secrets masqués)             |
| `/api/webhooks`                 | POST    | Créer un webhook                                 |
| `/api/webhooks/[id]`            | GET     | Détail du webhook (secret complet)               |
| `/api/webhooks/[id]`            | PUT     | Mettre à jour les champs                         |
| `/api/webhooks/[id]`            | DELETE  | Retirer                                          |
| `/api/webhooks/[id]/test`       | POST    | Lancez un `test.ping` (aucune tentative)         |
| `/api/webhooks/[id]/deliveries` | GET     | Tentatives de livraison récentes pour un webhook |
| `/api/webhooks/validate-url`    | POST    | Validation URL avant vol (garde SSRF )           |

`GET /api/webhooks` masque le secret de `<first 10 chars>...` pour éviter les fuites sur les pages de listing. Utilisez le `[id]` GET lorsque vous avez réellement besoin du secret.

### Créer un webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

Si `secret` est omis, le serveur génère un secret `whsec_<hex>` et le renvoie dans la réponse.

### Tester le webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Renvoie `{ delivered, status, error }`. Aucune tentative n'est tentée. — est utile pour valider rapidement que le récepteur accepte la charge utile et la signature.

## Tableau de bord

La page du tableau de bord de `/dashboard/webhooks` (voir `src/app/(dashboard)/dashboard/webhooks/page.tsx`) fournit :

- Webhooks Create/edit avec un sélecteur d'événements
- Indicateur d'état (actif/inactif/erreur) basé sur `enabled`, `failure_count` et `last_status`
- Livraison de tests en un clic
- Bascule enable/disable manuelle

## Exemples de charge utile

### demande.terminée

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Les formes de champ pour les événements non `test.ping` sont définies par les sites d'appel qui les émettent ; traiter l'objet `data` comme compatible avec les versions ultérieures (ajouter des champs, ne dépend pas de l'absence).

## Meilleures pratiques

- **Vérifiez la signature sur chaque livraison** contre le corps brut — empêche POSTs usurpé par quiconque devine votre webhook URL.
- **Répondez 2xx dans les 5 secondes ~** — le répartiteur expire à 10 s. Les récepteurs lents réduiront les tentatives et gonfleront `failure_count`.
- **Rendre les gestionnaires idempotents** Les tentatives — et la sémantique de livraison au moins une fois signifient que des doublons sont possibles.
- **Abonnez-vous au minimum** — répertorie uniquement les événements que vous consommez réellement ; `"*"` ajoutera des coûts sur les récepteurs que vous ne contrôlez pas.
- **Regarder `failure_count`** Les points de terminaison — sont automatiquement désactivés après 10 échecs consécutifs ; réinitialisez en appelant `PUT /api/webhooks/[id]` avec `enabled: true` après avoir réparé le récepteur.
- **Faites pivoter les secrets périodiquement** — `PUT` un nouveau `secret`, déployez la nouvelle valeur sur le récepteur et confirmez via le point de terminaison de test.

## Voir aussi

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — gestion complète surface API
- La sémantique du disjoncteur / temps de recharge [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — derrière les pannes du fournisseur a fait surface via `request.failed`
- Source : `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
