# Custom JSON API provider nodes (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Un nœud JSON API personnalisé connecte un point de terminaison métier JSON qui ne parle pas le protocole OpenAI ou Anthropic. OmniRoute remplit un modèle de requête JSON, l'envoie au point de terminaison complet URL, lit la réponse à partir d'un chemin de réponse et la renvoie au client dans son propre format (achèvements de discussion, réponses, messages, ...).

C'est un nœud compatible OpenAI avec `apiType: "custom-json"`; son identifiant a la forme `openai-compatible-custom-json-<suffix>`. Le formulaire du tableau de bord n'est pas encore disponible. Créez et modifiez ces nœuds via le nœud fournisseur API ci-dessous.

## Créer un nœud

`POST /api/provider-nodes` (authentification de gestion) :

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl` est le** complet** point final URL. Rien n'est ajouté (pas `/chat/completions`, pas `/models`) et, contrairement aux autres nœuds compatibles OpenAI, il n'y a pas URL par défaut. Il doit s'agir `http(s)`, sans informations d'identification intégrées ni `#fragment`, et il passe la même garde URL sortante que chaque nœud fournisseur, à la fois lorsque le nœud est enregistré et à chaque demande.
- Un nœud qui envoie la clé de connexion (`authType` `bearer` ou `api-key`, y compris la clé par défaut) doit utiliser `https://`. `http://` simple n'est accepté que pour un hôte de bouclage (`localhost`, `127.0.0.0/8`, `::1`) ou avec `authType: "none"`, qui n'envoie aucune clé. Les adresses privées LAN (`10.x`, `172.16-31.x`, `192.168.x`) ne sont pas exemptées : n'importe qui sur ce réseau peut lire la clé. L'enregistrement d'un tel nœud échoue avec `400`, et un nœud stocké précédemment échoue fermé à chaque demande avec le même message, avant qu'une demande ne soit envoyée. Pour un point de terminaison à clé sur un LAN, placez-le derrière TLS (par exemple un proxy inverse).
- `customJson` est validé avec Zod; les clés inconnues sont rejetées. Chaque champ est facultatif :

| Champ             | Valeurs                                    | Défaut                                                 |
| ----------------- | ------------------------------------------ | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                     | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                | `bearer`                                               |
| `authHeader`      | nom d'en-tête utilisé lorsque `api-key`    | `X-API-Key`                                            |
| `requestTemplate` | objet JSON (≤ 64 KB, profondeur ≤ 32)      | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | chemin de champ, ou `$` pour tout le corps | `choices[0].message.content`                           |

- Le secret reste dans la clé API de la connexion, jamais dans le modèle. `bearer` envoie `Authorization: Bearer <key>`; `api-key` envoie `<authHeader>: <key>`. L'en-tête d'authentification ne peut pas être `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` ou un en-tête saut par saut. Avec `none`, les connexions n'ont pas besoin de clé.
- Les en-têtes statiques supplémentaires utilisent le `customHeaders` habituel du nœud (même validation que tous les autres nœuds compatibles ; les en-têtes d'authentification n'y sont pas autorisés).

`PUT /api/provider-nodes/<id>` accepte le même `customJson` et réécrit `baseUrl` et la configuration sur chaque connexion existante du nœud. Omettre `customJson` conserve la configuration stockée ; passer de `apiType` à `chat` ou `responses` le supprime du nœud et de ses connexions.

Ajoutez ensuite une connexion au nœud comme d'habitude (`POST /api/providers` avec l'identifiant du nœud) et demandez `<prefix>/<model>`, par exemple `biz/assistant-v1`. Le point de terminaison n’expose aucune liste de modèles, ajoutez donc les identifiants de modèle à la main.

## Modèles de demande

Les modèles sont simples JSON. Une valeur de chaîne peut contenir des marqueurs `{{placeholder}}` ; rien n'est évalué ou exécuté et les clés d'objet ne sont jamais remplacées.

| Espace réservé       | Valeur                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------- |
| `{{prompt}}`         | Texte du dernier message utilisateur (parties de texte jointes à des nouvelles lignes) |
| `{{messages}}`       | La conversation au format de chat OpenAI                                               |
| `{{model}}`          | L'identifiant du modèle demandé, sans le préfixe du fournisseur                        |
| `{{stream}}`         | Toujours `false` —, le point final répond avec un seul document JSON                   |
| `{{request.<path>}}` | Un champ de la requête traduite (format de chat OpenAI )                               |

- Une valeur qui correspond exactement à un espace réservé conserve son type JSON (`"{{messages}}"` devient un tableau) ; un espace réservé à l'intérieur d'une chaîne plus longue est inséré sous forme de texte.
- Un espace réservé qui ne résout rien fait échouer la requête avec HTTP 400 au lieu d'envoyer une charge utile incomplète.
- Les chemins utilisent la notation par points et les index numériques (`data.items[0].text`). `__proto__`, `prototype` et `constructor` sont rejetés dans les clés et les chemins.

## Réponses

La valeur de `responsePath` devient la réponse de l'assistant : les chaînes passent, les autres valeurs JSON sont sérialisées. Un champ manquant ou `null`, ou un corps qui n'est pas JSON, renvoie HTTP 502. Les statuts d'erreur en amont sont transmis. Pour les clients de streaming, OmniRoute attend la réponse entière JSON, puis l'émet sous la forme d'un morceau de contenu plus le morceau de fin ; il ne s’agit pas d’un streaming symbolique. Les appels d’outils et les champs d’utilisation ne sont pas mappés.

## Jamais rejoué

Une demande commerciale peut avoir des effets secondaires même en cas d'échec. OmniRoute l'envoie donc une fois :

- aucune nouvelle tentative de transport et aucun suivi de redirection ;
- pas de nouvelle tentative sur une autre connexion (repli du compte) — l'échec est renvoyé tel quel et la connexion n'est pas refroidie ;
- pas de repli vers la cible combo suivante, même pour une réponse vide ou échouée.

Les requêtes client distinctes et les panneaux de fusion qui appellent explicitement plusieurs modèles invoquent toujours le point de terminaison indépendamment.

## Tester un nœud

Enregistrer une connexion, la connexion** Test** Les contrôles de santé des boutons et en arrière-plan n'appellent jamais le point de terminaison : ils valident uniquement la configuration stockée et signalent la connexion comme non vérifiable.

`POST /api/provider-nodes/validate` avec `"apiType": "custom-json"` et les champs de nœud (`baseUrl`, `apiKey`, `customJson`, `customHeaders` et `modelId` facultatifs) envoie exactement une requête réelle, avec `ping` comme dernier texte utilisateur. Il répond `{ "valid": true }` ou au statut amont (jamais au corps amont).

## Stockage

La configuration est stockée dans `provider_nodes.custom_json_config_json` (migration `240_provider_node_custom_json_config.sql`) et copiée dans `providerSpecificData.customJson` de chaque connexion.

Implémentation : `open-sse/utils/customJson.ts` (validation et modèles), `open-sse/executors/customJson.ts` (exécuteur), `open-sse/services/combo/noReplayLatch.ts` et `src/sse/handlers/chat/responsePolicies.ts` (no-replay).
