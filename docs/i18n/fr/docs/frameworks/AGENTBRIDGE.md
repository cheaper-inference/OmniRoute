# AgentBridge (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENTBRIDGE.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENTBRIDGE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENTBRIDGE.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENTBRIDGE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENTBRIDGE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENTBRIDGE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/AGENTBRIDGE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENTBRIDGE.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENTBRIDGE.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENTBRIDGE.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENTBRIDGE.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENTBRIDGE.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENTBRIDGE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENTBRIDGE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENTBRIDGE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENTBRIDGE.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENTBRIDGE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENTBRIDGE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENTBRIDGE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENTBRIDGE.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENTBRIDGE.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENTBRIDGE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENTBRIDGE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENTBRIDGE.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENTBRIDGE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENTBRIDGE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENTBRIDGE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENTBRIDGE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENTBRIDGE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENTBRIDGE.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENTBRIDGE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENTBRIDGE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENTBRIDGE.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENTBRIDGE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENTBRIDGE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENTBRIDGE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENTBRIDGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENTBRIDGE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENTBRIDGE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENTBRIDGE.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENTBRIDGE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENTBRIDGE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENTBRIDGE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENTBRIDGE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENTBRIDGE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENTBRIDGE.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENTBRIDGE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENTBRIDGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENTBRIDGE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENTBRIDGE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENTBRIDGE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENTBRIDGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENTBRIDGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENTBRIDGE.md)

---

AgentBridge est le proxy MITM (Man-in-the-Middle, ou « homme du milieu ») d’OmniRoute qui intercepte le trafic HTTPS des agents d’IA intégrés aux IDE et le réachemine via le moteur de routage unifié d’OmniRoute. Il prend en charge **10 agents d’IDE** — Antigravity, Kiro, GitHub Copilot, GHE Copilot, OpenAI Codex, Cursor, Zed, Claude Code, Open Code et Trae (en cours d’étude) — ce qui fait d’OmniRoute le proxy MITM offrant la couverture la plus étendue du marché pour les assistants de programmation basés sur l’IA.

**Emplacement du tableau de bord :** `/dashboard/tools/agent-bridge`
**Groupe de la barre latérale :** Outils (après Agents cloud)
**Voir aussi :** [`TRAFFIC_INSPECTOR.md`](./TRAFFIC_INSPECTOR.md) — surveillez en temps réel l’ensemble du trafic intercepté ; `docs/security/MITM-TPROXY-DECRYPT.md` (git ; non intégré à `/docs`) — le mode de capture Linux TPROXY avec déchiffrement transparent, piloté par la route `/api/tools/agent-bridge/tproxy`.

---

## §1 Aperçu

### Qu’est-ce que AgentBridge?

Lorsqu'un agent IDE (par exemple, GitHub Copilot, Cursor, Claude Code) effectue un appel API, il se connecte directement au fournisseur AI en amont (OpenAI, Anthropic, etc.). AgentBridge intercepte cette connexion de manière transparente au niveau TLS — sans nécessiter de modification de la configuration de l'agent — et réécrit la requête via OmniRoute.

Cela signifie que vous pouvez :

- **Redirigez n’importe quel agent vers n’importe quel fournisseur** : Copilot parle à OpenAI? Redirigez-le vers Anthropic Claude, Gemini ou l'un des 377 fournisseurs de OmniRoute.
- **Appliquer des mappages de modèles** : `gemini-3-flash` → `claude-sonnet-4.7` de manière transparente au niveau du gestionnaire.
- **Observez tout le trafic des agents** : toute demande interceptée est publiée à l' [Inspecteur de la Circulation](./TRAFFIC_INSPECTOR.md).
- **Appliquer la résilience OmniRoute** : routage combiné, disjoncteurs, solutions de secours et travail de suivi des coûts pour le trafic des agents IDE également.

### Positionnement par rapport au marché

| Fonctionnalité               | 9routeur | anti-API | intercepteur llm | **OmniRoute AgentBridge** |
| ---------------------------- | :------: | :------: | :--------------: | :-----------------------: |
| Antigravity                  |    ✓     |    ✓     |        —         |             ✓             |
| GitHub Copilot               |    ✓     |    ✓     |        —         |             ✓             |
| Kiro (AWS)                   |    ✓     |    ✓     |        —         |             ✓             |
| OpenAI Codex                 |    —     |    ✓     |        —         |             ✓             |
| Cursor IDE                   |    ✓     |    ✓     |        —         |             ✓             |
| Zed Industries               |    —     |    ✓     |        —         |             ✓             |
| Code Claude                  |    —     |    —     |        ✓         |             ✓             |
| Code ouvert                  |    —     |    —     |        ✓         |             ✓             |
| Traé                         |    —     |    —     |        —         |        🔍 enquête         |
| Tableau de bord UI           |    ✓     |    ✗     |        ✗         |             ✓             |
| Inspecteur de la circulation |    ✗     |    ✗     |        ✓         |             ✓             |
| routage OmniRoute            |    ✗     |    ✗     |        ✗         |             ✓             |
| Cartographie du modèle UI    |    ✗     |    ✗     |        ✗         |             ✓             |
| Liste de contournement       |    ✗     |    ✗     |        ✓         |             ✓             |
| Certificat CA en amont       |    ✗     |    ✗     |        ✓         |             ✓             |

---

## §2 Architecture

### 2.1 Vue d’ensemble des composants

```
Agent IDE (VS Code / Cursor / etc.)
    │  HTTPS (port 443)
    ▼
/etc/hosts — 127.0.0.1 api.githubcopilot.com   ← redirection DNS
    │
    ▼
src/mitm/server.cjs  (port 443, processus enfant CJS)
    │  résout la cible selon le SNI de l’en-tête Host
    │  génère un certificat TLS propre à chaque SNI, signé par l’AC AgentBridge
    ├── Correspondance avec la liste de contournement ? → transfert TCP direct (sans déchiffrement)
    ├── Correspondance avec une cible ? → fetch → routeur OmniRoute (port 20128)
    │       └── handler.intercept() — TypeScript
    │               ├── maskSecrets() sur le corps/les en-têtes de la requête
    │               ├── TrafficBuffer.push() — publie dans l’Inspecteur de trafic
    │               └── fetchRouter() → /v1/chat/completions
    └── Aucune correspondance ? → transfert TCP direct (sans déchiffrement)
```

### 2.2 Serveur MITM (`src/mitm/server.cjs`)

Le serveur MITM principal s’exécute en tant que processus enfant CJS Node.js (afin d’éviter de réécrire la base de code CJS existante). Il :

- Écoute sur le port 443 (nécessite des privilèges ou `authbind`/`setcap`)
- Reçoit les tunnels CONNECT du système d’exploitation (via la redirection DNS de `/etc/hosts`)
- Génère des certificats TLS propres à chaque SNI, signés par l’AC AgentBridge (`DATA_DIR/mitm/ca.crt`)
- Résout l’agent cible selon l’en-tête Host via le registre `targets/index.ts`
- Transmet les requêtes à la couche de gestionnaires TypeScript par HTTP vers `http://127.0.0.1:20128`

`TARGET_HOSTS` est chargé depuis `DATA_DIR/mitm/targets.json` (écrit par `targets/index.ts` au démarrage), ce qui permet des mises à jour dynamiques sans redémarrer le serveur CJS.

> **Modèle d’AC racine (#6684).** La description ci-dessus, dans laquelle un certificat propre à chaque SNI est signé par une AC,
> correspond au modèle d’AC racine persistante ajouté dans #6684 (`src/mitm/cert/rootCa.ts` +
> `src/mitm/_internal/rootCaShim.cjs`, réutilisant les mécanismes cryptographiques d’AC/de certificat terminal déjà
> éprouvés pour TPROXY dans `src/mitm/tproxy/dynamicCert.ts`) — il remplace l’ancien
> certificat terminal autosigné statique unique (`src/mitm/cert/generate.ts`, toujours
> limité aux seuls hôtes antigravity) qu’indique la présence d’une simple paire
> `server.crt`/`server.key` sur le disque. **Comportement de migration** : une nouvelle installation (sans
> `server.crt` préexistant) utilise automatiquement le modèle d’AC racine ; une installation qui faisait déjà
> confiance à l’ancien certificat terminal statique continue de l’utiliser jusqu’à ce que l’opérateur définisse
> `MITM_ROOT_CA_ENABLED=true` et redémarre le bridge (`src/mitm/cert/migration.ts`
> est la fonction de décision pure — une AC MITM approuvée capable de signer un certificat terminal pour
> **n’importe quel** hôte est nettement plus puissante que l’ancien certificat terminal à SAN fixes, de sorte que le
> basculement n’est jamais silencieux pour une installation qui lui faisait déjà confiance). Le certificat d’AC est installé
> dans le même emplacement `omniroute-mitm.crt` du magasin de confiance que celui utilisé par l’ancien certificat terminal
> (`cert/install.ts::installCaCert`) — aucun nettoyage lié à une double approbation n’est nécessaire.

### 2.3 Gestionnaire de base (`src/mitm/handlers/base.ts`)

Tous les gestionnaires d’agents étendent `MitmHandlerBase` :

```ts
export abstract class MitmHandlerBase {
  abstract readonly agentId: AgentId;

  abstract intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void>;

  // Assistants protégés : fetchRouter, pipeSSE, hookBufferStart, hookBufferUpdate
}
```

Chaque gestionnaire appelle `hookBufferStart()` avant la transmission par proxy et `hookBufferUpdate()` une fois l’opération terminée. Ces appels ajoutent des entrées `InterceptedRequest` à `globalTrafficBuffer` (voir [Inspecteur de trafic](./TRAFFIC_INSPECTOR.md) §4).

### 2.4 Registre des cibles (`src/mitm/targets/`)

Chaque agent dispose d’un fichier de cible déclaratif :

```ts
// src/mitm/targets/copilot.ts
export const COPILOT_TARGET: MitmTarget = {
  id: "copilot",
  name: "GitHub Copilot",
  hosts: ["api.githubcopilot.com", "copilot-proxy.githubusercontent.com"],
  port: 443,
  endpointPatterns: ["/chat/completions", "/v1/chat/completions"],
  defaultModels: [{ id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" }],
  handler: () => import("../handlers/copilot"),
  riskNoticeKey: "providers.riskNotice.oauth",
};
```

Le registre (`targets/index.ts`) exporte `ALL_TARGETS` et génère `DATA_DIR/mitm/targets.json` au démarrage.

### 2.5 Transfert direct et liste de contournement (`src/mitm/passthrough.ts`)

**Liste de contournement** (vérifiée en premier, avec priorité sur la correspondance avec une cible) :

- Motifs par défaut : hôtes bancaires, `.gov.`, fournisseurs OAuth/SSO (Okta, Auth0), etc.
- Motifs utilisateur : stockés dans la table de base de données `agent_bridge_bypass`
- Les hôtes contournés bénéficient d’un tunnel TCP transparent — le trafic TLS n’est **jamais déchiffré**

**Transfert direct par défaut** (aucune correspondance avec une cible et hôte absent de la liste de contournement) :

- Bénéficie également d’un tunnel TCP — les connexions ne sont jamais interrompues
- Empêche AgentBridge de perturber le trafic HTTPS général du système

Ordre de priorité du routage :

```
liste de contournement → correspondance avec une cible → transfert direct
```

### 2.6 Certificat d’AC en amont (`src/mitm/upstreamTrust.ts`)

Pour les environnements réseau d’entreprise utilisant une AC personnalisée :

```bash
AGENTBRIDGE_UPSTREAM_CA_CERT=/path/to/corporate-ca.pem
```

Lorsque cette variable est définie, elle configure le répartiteur global d’`undici` avec le certificat d’AC supplémentaire, ce qui permet à AgentBridge d’atteindre les fournisseurs en amont via les proxys d’entreprise assurant la terminaison TLS.

### 2.7 Masquage des secrets (`src/mitm/maskSecrets.ts`)

Le scanner indépendant développé en salle blanche est appliqué aux corps des requêtes et aux en-têtes contenant des identifiants
**avant** qu’ils n’entrent dans le tampon de l’Inspecteur de trafic ou dans un quelconque journal. Il effectue un seul parcours linéaire :

- Jetons préfixés par `sk-` / `ak-` / `pk-` (de type OpenAI/Anthropic)
- Identifiants RFC 6750 `Authorization: Bearer <token>`, avec priorité au jeton entier
- Jetons opaques longs génériques (≥40 caractères), y compris les formes contenant des points ou du remplissage

`sanitizeHeaders()` convertit en minuscules les noms conservés, concatène les valeurs de tableaux de manière déterministe, supprime la
liste d’exclusion partagée des en-têtes saut par saut/de cadrage (y compris l’authentification du proxy), masque entièrement `cookie` et
`set-cookie`, et délègue au scanner le traitement des valeurs d’identifiants.

---

## §3 Configuration

### 3.1 Démarrer/arrêter le serveur MITM

Utilisez la carte AgentBridge Server dans `/dashboard/tools/agent-bridge` :

| Action                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Démarrer le serveur       | Lance `src/mitm/server.cjs` sur le port 443. Avec le modèle d’autorité de certification racine, `ca.crt` est créé au premier démarrage et le certificat actif est ajouté aux certificats de confiance lorsqu’un mot de passe sudo est disponible                                                                                                                                                                                                                                                                                                                                                                          |
| Arrêter le serveur        | Arrête proprement le processus enfant                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Redémarrer le serveur     | Arrête puis démarre le serveur (prend en compte les modifications des cibles et un certificat régénéré)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Approuver le certificat   | Installe le certificat actif dans le magasin de certificats de confiance du système d’exploitation : `DATA_DIR/mitm/ca.crt` avec le modèle d’autorité de certification racine, `DATA_DIR/mitm/server.crt` pour une installation héritée utilisant un certificat d’entité finale                                                                                                                                                                                                                                                                                                                                           |
| Télécharger le certificat | Télécharge le certificat actif pour une installation manuelle (`omniroute-mitm-ca.crt` = `ca.crt`, ou `omniroute-mitm.crt` = `server.crt` pour une installation héritée utilisant un certificat d’entité finale)                                                                                                                                                                                                                                                                                                                                                                                                          |
| Régénérer le certificat   | Ne modifie jamais le modèle de certificat. Installation héritée utilisant un certificat d’entité finale : génère de nouveaux `server.crt`/`server.key` (redémarrez le serveur pour qu’il les utilise). Modèle d’autorité de certification racine : renouvelle `ca.crt`/`ca.key` ; cette opération est refusée tant que le serveur est en cours d’exécution. Une ancienne autorité de certification approuvée est d’abord retirée des certificats de confiance (nécessite le mot de passe sudo), sinon le renouvellement est annulé. Les clients doivent ensuite approuver à nouveau la nouvelle autorité de certification |

### 3.2 Approuver le certificat

Le certificat de l’autorité de certification AgentBridge doit être approuvé par le système d’exploitation avant que les IDE puissent accepter la connexion MITM.

**Linux (NSS — Chrome/Firefox) :**

```bash
certutil -A -d sql:$HOME/.pki/nssdb -n "OmniRoute AgentBridge" -t CT,, -i ~/.omniroute/mitm/ca.crt
```

**macOS (Trousseau) :**

```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain ~/.omniroute/mitm/ca.crt
```

**Windows (certmgr) :**

```powershell
certutil -addstore -f Root $env:USERPROFILE\.omniroute\mitm\ca.crt
```

Vous pouvez également utiliser le bouton « Trust Cert » du tableau de bord (il exécute la commande appropriée pour votre système d’exploitation, avec une invite sudo si nécessaire).

#### Les IDE basés sur Electron ignorent le magasin de certificats de confiance du système d’exploitation (`NODE_EXTRA_CA_CERTS`)

Certains IDE — notamment **Antigravity IDE**, ainsi que d’autres applications dérivées d’Electron / VS Code — intègrent
leur propre environnement d’exécution Node.js, qui **ne consulte pas le magasin de certificats de confiance du système d’exploitation** pour les requêtes
`fetch`/HTTPS sortantes. Approuver l’autorité de certification au niveau du système d’exploitation/NSS suffit pour le **backend** natif
de l’IDE (par exemple, un serveur de langage Go qui utilise le paquet d’autorités de certification du système d’exploitation), mais le **frontend Electron**
échouera toujours lors de la connexion TLS — l’application apparaîtra alors comme _déconnectée_ ou affichera une _« erreur de connexion »_,
même si le journal MITM indique que les appels d’amorçage du backend renvoient `200`. Deux étapes sont
nécessaires, et toutes deux sont importantes :

1. Indiquez explicitement l’autorité de certification à l’environnement d’exécution :
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/omniroute-agentbridge-ca.crt
   ```
2. **Lancez l’IDE depuis ce shell.** Le démarrage depuis l’icône du bureau / le Dock / le menu Démarrer
   n’hérite **pas** des variables exportées par le shell, et `~/.config/environment.d/*.conf` ne s’applique qu’après
   une nouvelle connexion à la session graphique. Quittez d’abord complètement l’IDE — le verrou d’instance unique d’Electron implique qu’un second
   lancement se contente de mettre au premier plan le processus existant et que le nouvel environnement est ignoré.

L’approbation par le système d’exploitation et l’étape NSS ci-dessus restent nécessaires (la pile réseau Chromium utilisée par certains flux
d’authentification lit le magasin NSS propre à l’utilisateur et possède ses propres épingles statiques pour `*.googleapis.com`, qu’une
autorité de certification approuvée localement remplace). `NODE_EXTRA_CA_CERTS` couvre en complément le chemin `fetch` de Node.

### 3.3 Routage DNS

Pour chaque agent que vous souhaitez intercepter, ses hôtes d’API doivent être résolus vers `127.0.0.1`. AgentBridge gère automatiquement les entrées de `/etc/hosts` lorsque vous activez ou désactivez le DNS d’un agent dans l’assistant de configuration.

Exemple d’entrées `/etc/hosts` pour GitHub Copilot :

```
127.0.0.1 api.githubcopilot.com
127.0.0.1 copilot-proxy.githubusercontent.com
```

### 3.4 Mappage des modèles

Utilisez la table de mappage des modèles dans la carte de chaque agent pour définir les mappages source → cible :

| Modèle source (natif de l’agent) | Modèle cible (OmniRoute) |
| -------------------------------- | ------------------------ |
| `gpt-4o`                         | `claude-sonnet-4.7`      |
| `*` (caractère générique)        | `claude-haiku-4.7`       |

Le caractère générique `*` associe tout modèle non reconnu à la cible spécifiée. Les mappages sont conservés dans la table `agent_bridge_mappings`.

> **Astuce — découvrez les véritables identifiants de modèle de l’agent.** Un IDE peut envoyer des noms de modèles qui diffèrent de
> leurs libellés dans son interface utilisateur et qui changent entre les versions majeures. Par exemple, **Antigravity 2** envoie
> `gemini-3.1-pro-low`, `gemini-pro-agent` et `gemini-3.1-flash-lite` sur le réseau — et non
> `gemini-2.5-pro`, indiqué dans les anciennes documentations. Envoyez une conversation sans aucune correspondance configurée : le MITM
> journalise la valeur exacte du champ `model:` entrant et transmet la requête. Associez cette valeur littérale, puis
> la requête suivante sera interceptée et acheminée vers votre cible.

### 3.5 Avis relatif aux risques

AgentBridge intercepte les identifiants (jetons OAuth, clés d’API) que l’IDE utilise pour s’authentifier auprès des fournisseurs en amont. Ils sont **masqués avant leur journalisation** (voir §2.7), mais restent visibles par la couche MITM d’OmniRoute. La première activation de chaque agent affiche une fenêtre modale d’avertissement relatif aux risques, qui peut être fermée.

### 3.6 Maintenance et diagnostics

Le tableau de bord comporte une carte **Maintenance et diagnostics** (`AgentBridgeMaintenanceCard`, dans `src/app/(dashboard)/dashboard/tools/agent-bridge/components/`) qui expose les routes MITM opérationnelles auparavant dépourvues d’interface utilisateur. Son sous-titre est : _« Testez automatiquement le pipeline de capture, annulez l’état système résiduel et transférez votre configuration entre plusieurs machines. »_ Les fonctions auxiliaires clientes de la carte se trouvent dans `src/lib/inspector/agentBridgeMaintenanceApi.ts`.

| Bouton                   | Route                                  | Fonction                                                                                                                                                                                                                                            |
| ------------------------ | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Diagnostiquer**        | `GET /api/tools/agent-bridge/diagnose` | Exécute l’autotest du pipeline de capture et affiche un rapport pour chaque contrôle (✓/✗ accompagné d’une suggestion de correction).                                                                                                               |
| **Réparer**              | `POST /api/tools/agent-bridge/repair`  | Annule l’état système MITM orphelin (entrées d’usurpation DNS, autorité de certification racine, proxy système) laissé par un plantage ou un SIGKILL. Idempotent — indique « Rien à réparer » si l’état est propre.                                 |
| **Supprimer l’AC**       | `DELETE /api/tools/agent-bridge/cert`  | Révoque la confiance et supprime l’AC racine MITM du magasin de confiance du système d’exploitation (explicite, idempotent). Affiché uniquement lorsque l’AC est actuellement approuvée ; nécessite une confirmation en ligne « Supprimer l’AC ? ». |
| **Exporter la config.**  | `GET /api/tools/agent-bridge/config`   | Télécharge le fichier JSON de configuration portable (voir §3.7).                                                                                                                                                                                   |
| **Importer une config.** | `POST /api/tools/agent-bridge/config`  | Téléverse un fichier JSON de configuration précédemment exporté (voir §3.7).                                                                                                                                                                        |

Chaque carte d’agent possède également son propre bouton **Restaurer les valeurs par défaut** (`POST
/api/tools/agent-bridge/agents/{id}/reset`) — une annulation en un clic propre à chaque agent, qui supprime l’usurpation uniquement pour les hôtes de cet
agent, efface ses correspondances de modèles enregistrées et réinitialise son état `dns_enabled`/`setup_completed`,
afin que l’IDE communique à nouveau avec le véritable service en amont après un redémarrage complet. Cette action ne modifie **pas** le
serveur MITM partagé ni l’AC racine (d’autres agents peuvent encore en dépendre) — ceux-ci restent accessibles
via la carte Serveur et l’action **Supprimer l’AC** ci-dessus. Sous Windows, elle tente également d’exécuter
`ipconfig /flushdns`, car le client DNS de Windows met en cache les entrées du fichier hosts et, sans cela, ne supprime pas
une usurpation qui vient d’être retirée.

**Contrôles de diagnostic** (`summarizeDiagnostics()` dans `src/mitm/inspector/diagnostics.ts`). La route exécute la sonde avec effets pour chacun d’eux et transmet les valeurs booléennes au synthétiseur pur ; un verdict `healthy` unique ainsi qu’une suggestion pour chaque échec sont renvoyés :

| Nom du contrôle    | Élément vérifié                                                 | Suggestion en cas d’échec                                                                                                                                                     |
| ------------------ | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server-running`   | Le processus du serveur MITM est actif                          | « Le serveur MITM n’est pas en cours d’exécution. Démarrez-le depuis l’onglet AgentBridge. »                                                                                  |
| `server-reachable` | Le serveur MITM accepte les connexions sur son port (sonde TCP) | « Le serveur MITM n’accepte pas les connexions sur son port. Vérifiez que le port est libre et que vous disposez des privilèges nécessaires pour vous y lier. »               |
| `cert-exists`      | Le certificat MITM a été généré sur le disque                   | « Aucun certificat MITM n’a encore été généré. Générez-en un depuis l’onglet AgentBridge. »                                                                                   |
| `cert-trusted`     | L’AC racine MITM figure dans le magasin de confiance du système | « Le magasin du système d’exploitation n’approuve pas l’AC racine MITM ; l’interception TLS échouera donc. Approuvez le certificat depuis l’onglet AgentBridge. »             |
| `dns-configured`   | Les noms d’hôtes cibles sont usurpés dans `/etc/hosts`          | « Les noms d’hôtes cibles ne sont pas usurpés dans /etc/hosts ; le trafic n’atteint donc jamais le proxy. Activez le DNS pour le ou les agents que vous souhaitez capturer. » |

**Bannière d’état orphelin :** lorsque la page détecte un état résiduel laissé par un plantage (usurpation DNS, AC ou proxy système), la carte affiche une bannière orange — _« Une session précédente a laissé un état système résiduel (usurpation DNS, AC ou proxy système). Exécutez Réparer pour le nettoyer. »_ — et met en évidence le bouton **Réparer**. `Repair` est l’équivalent, au niveau de la couche applicative, de l’option `--cleanup` de ProxyBridge (il délègue l’opération à `repairMitm()` dans `src/mitm/manager.ts`).

> L’autorité de certification racine MITM reste installée après un arrêt/redémarrage afin d’éviter des invites sudo
> répétées (le même comportement que mitmproxy/Charles) ; sa suppression nécessite donc une action explicite
> **Supprimer l’AC**, plutôt que de se produire automatiquement lors de l’arrêt.

### 3.7 Importation/exportation de configuration portable

AgentBridge peut sérialiser l’état **configurable par l’opérateur** dans un objet JSON versionné afin de répliquer une configuration sur plusieurs machines. Le sérialiseur est `src/lib/inspector/configPortability.ts` (`exportConfig()` / `importConfig()`), validé par `AgentBridgeConfigSchema`.

L’exportation comprend exactement trois éléments (les valeurs par défaut intégrées ne sont intentionnellement **PAS** exportées, afin que l’importation ne les duplique jamais et n’entre pas en conflit avec elles) :

| Champ            | Source                                                                    | Remarques                                                                         |
| ---------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `bypassPatterns` | motifs de contournement définis par l’utilisateur (`agent_bridge_bypass`) | les motifs par défaut pour les banques, administrations et Okta sont exclus       |
| `customHosts`    | hôtes personnalisés de Traffic Inspector (`inspector_custom_hosts`)       | chacun : `{ host, kind: "llm"\|"app"\|"custom", label? }`                         |
| `agentMappings`  | correspondances de modèles par agent (`agent_bridge_mappings`)            | `{ [agentId]: [{ source, target }] }` pour chaque agent ayant des correspondances |

```jsonc
// GET /api/tools/agent-bridge/config
{
  "version": 1,
  "bypassPatterns": ["*.internal.example.com"],
  "customHosts": [{ "host": "api.example.com", "kind": "llm", "label": null }],
  "agentMappings": {
    "copilot": [{ "source": "gpt-4o", "target": "claude-sonnet-4.7" }],
  },
}
```

**Comportement lors de l’importation** (`POST /api/tools/agent-bridge/config`) : les motifs de contournement et les correspondances par agent sont **entièrement remplacés** ; les hôtes personnalisés sont ajoutés de manière **idempotente** (`INSERT OR IGNORE`). La réponse indique combien d’éléments de chaque type ont été appliqués :

```jsonc
{ "ok": true, "bypassPatterns": 1, "customHosts": 1, "agents": 1 }
```

Ce qui n’est **PAS** inclus dans la configuration : l’état d’exécution du serveur, les chemins des certificats, l’état DNS de chaque agent, le chemin de l’autorité de certification en amont et les paramètres TPROXY — il s’agit d’un état propre à l’hôte ou à l’exécution, et non de préférences portables.

---

## §4 Référence par agent

| #   | Agent              | Statut              | Hôtes interceptés                                                  | Type d’authentification |
| --- | ------------------ | ------------------- | ------------------------------------------------------------------ | ----------------------- |
| 1   | **Antigravity**    | ✅ Pris en charge   | `daily-cloudcode-pa.googleapis.com`, `cloudcode-pa.googleapis.com` | OAuth Firebase          |
| 2   | **Kiro (AWS)**     | ✅ Pris en charge   | `prod.kiro.aws`, `dev.kiro.aws`                                    | AWS SigV4               |
| 3   | **GitHub Copilot** | ✅ Pris en charge   | `api.githubcopilot.com`, `copilot-proxy.githubusercontent.com`     | OAuth GitHub            |
| 4   | **OpenAI Codex**   | ✅ Pris en charge   | `api.openai.com` (chemins Codex), `chatgpt.com`                    | Clé OpenAI              |
| 5   | **Cursor IDE**     | ✅ Pris en charge   | `api2.cursor.sh`, `api.cursor.sh`                                  | OAuth Cursor            |
| 6   | **Zed Industries** | ✅ Pris en charge   | `api.zed.dev`, `llm.zed.dev`                                       | OAuth Zed               |
| 7   | **Claude Code**    | ✅ Pris en charge   | `api.anthropic.com` (sur inscription)                              | Clé Anthropic           |
| 8   | **Open Code**      | ✅ Pris en charge   | `openrouter.ai`, `api.openai.com` (chemins zen)                    | Clé API                 |
| 9   | **Trae**           | 🔍 En cours d’étude | À déterminer — voir §8                                             | À déterminer            |

### Étapes de l’assistant de configuration (par agent)

Chaque fiche d’agent comporte un assistant de configuration en 3 étapes :

1. **Vérifier les prérequis** — Le serveur fonctionne-t-il ? Le certificat est-il approuvé ? L’IDE est-il installé (détection automatique) ?
2. **Activer le DNS** — Ajoute des entrées dans `/etc/hosts` (nécessite sudo). Affiche exactement les lignes qui seront ajoutées.
3. **Mapper les modèles** — Table facultative de mappage des modèles. Les caractères génériques sont acceptés.

### Détection des agents

Pour les agents 1 à 8, AgentBridge tente de détecter automatiquement l’installation de l’IDE :

```ts
export async function detectAgent(agentId: AgentId): Promise<DetectionResult>;
// Renvoie : { installed: boolean, version?: string, path?: string }
```

La détection utilise des chemins propres au système d’exploitation et des vérifications de binaires (par exemple, `code --list-extensions | grep github.copilot` pour Copilot, `~/.config/antigravity/` pour Antigravity).

---

## §5 Sécurité

### Règles strictes appliquées

| Règle                                            | Application                                                                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`                   | Toutes les erreurs des gestionnaires sont nettoyées avant d’être incluses dans une réponse ou un tampon                   |
| **#13** Transmission de l’environnement au shell | Les modifications de `/etc/hosts` utilisent l’option `env` — aucune interpolation de chaînes pour les chemins             |
| **#15 + #17** `isLocalOnlyPath()`                | `/api/tools/agent-bridge/` est LOCAL_ONLY + SPAWN_CAPABLE — l’accès par boucle locale est imposé avant l’authentification |

### Liste de contournement pour les hôtes sensibles

La liste de contournement garantit que les établissements financiers, les fournisseurs OAuth/SSO et les autres hôtes sensibles ne sont **jamais déchiffrés**. Leur trafic TLS transite sous forme de tunnel TCP transparent — OmniRoute n’accède jamais au texte en clair.

Les motifs de contournement par défaut comprennent :

- `*.bank.*`, `*.gov.*` (finance/administration publique)
- `*.okta.com`, `*.auth0.com`, `*.microsoft.com` (SSO/identité)
- `*.apple.com`, `*.icloud.com` (services système Apple)

Les motifs de contournement ajoutés par l’utilisateur sont stockés dans la table `agent_bridge_bypass` et prévalent sur toutes les autres règles.

### Masquage des secrets

La fonction `maskSecrets()` de `src/mitm/maskSecrets.ts` est appliquée :

- À chaque corps de requête avant `TrafficBuffer.push()`
- À chaque en-tête avant sa journalisation ou sa diffusion

Motifs : jetons comportant les préfixes `sk-`/`ak-`/`pk-`, jetons `Bearer` et jetons génériques d’au moins 40 caractères.

### Certificat d’AC en amont

Lorsque `AGENTBRIDGE_UPSTREAM_CA_CERT` est défini, le fichier est lu au démarrage. Si le chemin existe, mais que le fichier est illisible, AgentBridge journalise une erreur explicite et refuse de démarrer (afin d’éviter les défaillances TLS silencieuses dans les environnements d’entreprise).

### Limitations connues

- **Le port 443 nécessite des privilèges** : sous Linux, AgentBridge nécessite l’application de `setcap 'cap_net_bind_service=+ep'` au binaire Node, ou doit être exécuté via `authbind`. L’assistant de configuration affiche des instructions propres au système d’exploitation.
- **Le redémarrage de l’IDE est requis** : après la redirection DNS, l’IDE doit être redémarré afin que la nouvelle résolution d’hôte prenne effet.
- **Jetons OAuth codés en dur** : certains agents (Kiro, Antigravity) stockent localement les jetons d’actualisation OAuth. Ceux-ci sont transparents pour AgentBridge — il voit le jeton Bearer dans chaque requête, lequel est masqué avant la journalisation.
- **Les interfaces Electron nécessitent `NODE_EXTRA_CA_CERTS`** : les IDE dont l’interface s’exécute dans un environnement d’exécution Node/Electron intégré ignorent le magasin de confiance du système d’exploitation/NSS et doivent être lancés depuis un shell dans lequel `NODE_EXTRA_CA_CERTS` est défini (voir §3.2). Symptôme en cas d’absence : le backend de l’IDE s’authentifie (le MITM affiche des réponses `200`), mais l’interface reste déconnectée.
- **Les installations multiples d’un même IDE sont indépendantes** : une installation système (par exemple `/usr/share/antigravity/antigravity`) et une installation « Full » locale à l’utilisateur (par exemple `~/AntigravityIDE_Full/antigravity-ide`) sont des processus distincts dotés de leurs propres environnements d’exécution — chacun doit être relancé avec l’AC injectée. Identifiez l’installation en cours d’exécution grâce au chemin de son binaire avant de la relancer.
- **L’identité est définie par le prompt système de l’agent, et non par le modèle routé** : lorsque vous remappez le modèle d’un agent vers un autre fournisseur, la réponse continue de revendiquer l’identité native de l’agent (par exemple, Antigravity répond « Je fonctionne grâce à Gemini »), car l’IDE l’injecte dans le prompt système. Vérifiez le backend réel dans `call_logs` / `proxy_logs` (`provider`, `model`, `target_format`), plutôt qu’en demandant au modèle qui il est.

---

## §6 Dépannage

### Conflit sur le port 443

Si un autre processus écoute déjà sur le port 443 (serveur web, VPN, etc.) :

```bash
lsof -i :443          # trouver le processus
sudo fuser -k 443/tcp  # forcer son arrêt (à utiliser avec précaution)
```

Vous pouvez également configurer un port non privilégié dans les paramètres d’AgentBridge et mettre en place des règles de redirection `iptables` / `pf`.

### Certificat non approuvé

Si l’IDE affiche des erreurs TLS après le démarrage d’AgentBridge :

1. Vérifiez que le certificat a été installé : `security find-certificate -c "OmniRoute AgentBridge"` (macOS) ou `certutil -L -d sql:$HOME/.pki/nssdb` (Linux/NSS)
2. Certaines applications utilisent leur propre magasin de certificats de confiance (Firefox, Chrome sous Linux). Exécutez de nouveau « Trust Cert » et vérifiez le magasin de certificats propre à NSS/Firefox.
3. Redémarrez l’IDE après avoir approuvé le certificat — les sessions TLS en cours utilisent l’ancien état de confiance.

### IDE déconnecté / « erreur de connexion » malgré une AC approuvée

Symptôme : après avoir redirigé le DNS et approuvé l’AC, un IDE basé sur Electron (par exemple Antigravity)
s’ouvre **déconnecté** ou affiche une erreur d’authentification/de connexion, alors que le journal MITM indique que les
appels d’amorçage (`loadCodeAssist`, `fetchAvailableModels`, …) renvoient `200`.

Cause : l’environnement d’exécution **Node/Electron intégré de l’IDE ignore le magasin de certificats de confiance du système d’exploitation**. Le
backend natif (un serveur de langage Go) fait confiance à l’AC du système d’exploitation et s’authentifie, mais pas le frontend Electron
— l’interface utilisateur considère donc qu’elle est hors ligne.

Solution (les deux étapes) : exportez `NODE_EXTRA_CA_CERTS=<ca.crt>` **et relancez l’IDE depuis ce
shell**, et non depuis l’icône du bureau. Quittez d’abord complètement l’IDE — en raison du verrou d’instance unique d’Electron,
un deuxième lancement ne fait que remettre au premier plan le processus existant et le nouvel environnement est ignoré. Voir §3.2.
Cela correspond à un rapport amont ouvert dans lequel un agent autonome fonctionne via un MITM, tandis que la variante IDE
échoue avec la même configuration.

### DNS non propagé

Vérifiez que `/etc/hosts` a été mis à jour :

```bash
grep "omniroute\|127.0.0.1.*github\|127.0.0.1.*cursor" /etc/hosts
```

Videz le cache DNS :

```bash
# macOS
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# Linux (systemd-resolved)
sudo systemctl restart systemd-resolved
# Windows
ipconfig /flushdns
```

### IDE non détecté

La détection automatique utilise les chemins d’installation courants. Si la détection échoue alors que l’IDE est installé :

- Vérifiez si le binaire de l’IDE se trouve dans un emplacement non standard
- L’assistant de configuration fonctionne tout de même — l’échec de la détection signifie simplement que le badge n’affichera pas le chemin d’installation

### Erreurs du gestionnaire (échec de la requête en amont)

Si AgentBridge intercepte les requêtes, mais qu’elles échouent toutes :

1. Vérifiez qu’au moins un fournisseur est connecté dans `/dashboard/providers`
2. Consultez les journaux du serveur OmniRoute : `APP_LOG_LEVEL=debug` dans `.env`
3. Vérifiez que `OMNIROUTE_BASE_URL` pointe vers le bon point de terminaison du routeur (valeur par défaut : `http://127.0.0.1:20128`)

---

## §7 Référence de l’API

Toutes les routes sont `LOCAL_ONLY` (accessibles uniquement via l’interface de bouclage, restriction appliquée avant l’authentification) et `SPAWN_CAPABLE`. Voir `src/server/authz/routeGuard.ts`.

Chemin de base : `/api/tools/agent-bridge/`

| Méthode             | Chemin                                         | Description                                                                                                                                                            |
| ------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET                 | `/api/tools/agent-bridge/state`                | État global du serveur + détection/état par agent                                                                                                                      |
| GET                 | `/api/tools/agent-bridge/agents`               | Répertorie les agents enregistrés (identifiant, nom, hôtes, viabilité, état)                                                                                           |
| GET                 | `/api/tools/agent-bridge/agents/{id}`          | État d’un agent (configuration de la cible + détection + état stocké)                                                                                                  |
| PATCH               | `/api/tools/agent-bridge/agents/{id}`          | Met à jour `setup_completed` pour l’agent                                                                                                                              |
| GET                 | `/api/tools/agent-bridge/agents/{id}/detect`   | Exécute une sonde de détection pour l’agent (`installed`, `version?`, `path?`)                                                                                         |
| POST                | `/api/tools/agent-bridge/agents/{id}/dns`      | Active/désactive le DNS pour l’agent (`{enabled: boolean}`)                                                                                                            |
| GET                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Mappages de modèles pour l’agent                                                                                                                                       |
| PUT                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Remplace les mappages de modèles                                                                                                                                       |
| POST                | `/api/tools/agent-bridge/agents/{id}/reset`    | Restaure les valeurs par défaut : annule l’usurpation DNS de cet agent, efface ses mappages et réinitialise son état (voir §3.6)                                       |
| POST                | `/api/tools/agent-bridge/server`               | Démarre/arrête/redémarre le serveur (`action: "start"\|"stop"\|"restart"\|"trust-cert"\|"regenerate-cert"`)                                                            |
| GET                 | `/api/tools/agent-bridge/cert`                 | État du certificat (`exists`, `trusted`, `path`)                                                                                                                       |
| POST                | `/api/tools/agent-bridge/cert`                 | Approuve (installe) l’autorité de certification racine MITM                                                                                                            |
| DELETE              | `/api/tools/agent-bridge/cert`                 | Révoque l’approbation (supprime) de l’autorité de certification racine MITM — opération idempotente (voir §3.6)                                                        |
| POST                | `/api/tools/agent-bridge/cert/regenerate`      | Régénère le certificat actif sans modifier le modèle de certificat (feuille héritée ou rotation de l’AC racine — voir §3.1)                                            |
| GET                 | `/api/tools/agent-bridge/cert/download`        | Transmet en continu le certificat PEM actif pour téléchargement (`ca.crt` avec le modèle d’AC racine, `server.crt` avec une installation héritée à certificat feuille) |
| GET                 | `/api/tools/agent-bridge/bypass`               | Répertorie les motifs de contournement (`default` + `user`)                                                                                                            |
| POST                | `/api/tools/agent-bridge/bypass`               | Remplace intégralement les motifs de contournement définis par l’utilisateur                                                                                           |
| DELETE              | `/api/tools/agent-bridge/bypass?pattern=...`   | Supprime un seul motif de contournement défini par l’utilisateur                                                                                                       |
| GET                 | `/api/tools/agent-bridge/diagnose`             | Autotest du pipeline de capture (voir §3.6)                                                                                                                            |
| POST                | `/api/tools/agent-bridge/repair`               | Annule l’état système MITM orphelin (voir §3.6)                                                                                                                        |
| GET                 | `/api/tools/agent-bridge/config`               | Exporte la configuration JSON portable (voir §3.7)                                                                                                                     |
| POST                | `/api/tools/agent-bridge/config`               | Importe la configuration JSON portable (voir §3.7)                                                                                                                     |
| GET                 | `/api/tools/agent-bridge/upstream-ca`          | Obtient le chemin configuré de l’AC en amont                                                                                                                           |
| POST                | `/api/tools/agent-bridge/upstream-ca`          | Valide et conserve le chemin de l’AC en amont                                                                                                                          |
| POST                | `/api/tools/agent-bridge/upstream-ca/test`     | Valide uniquement (simulation) un chemin d’AC en amont — sans le conserver                                                                                             |
| GET / POST / DELETE | `/api/tools/agent-bridge/tproxy`               | Mode de capture TPROXY avec déchiffrement transparent — voir `docs/security/MITM-TPROXY-DECRYPT.md` (git ; non compilé dans `/docs`)                                   |

Schémas OpenAPI complets : `docs/openapi.yaml` → balise `AgentBridge`.

---

## §8 Feuille de route

### Étude de Trae

Trae est un assistant de programmation basé sur l’IA relativement récent. Avant d’implémenter un gestionnaire :

1. Identifier le binaire/l’extension dans les boutiques VS Code / JetBrains ou en tant qu’application autonome
2. Capturer le trafic avec mitmproxy afin de découvrir les hôtes d’API et la structure des points de terminaison
3. Déterminer le mécanisme d’authentification
4. Évaluer la décision de poursuivre ou non en fonction des conditions d’utilisation et de la facilité d’identification de l’API

Jusqu’à la fin de l’étude, la carte Trae du tableau de bord affiche un badge « En cours d’étude » avec un lien « Signaler la viabilité ». Le squelette du gestionnaire situé dans `src/mitm/handlers/trae.ts` lève une erreur structurée `Not yet implemented`.

### Agents en attente (MITM requis — aucune prise en charge d’une URL de base personnalisée)

Les outils suivants ne prennent pas en charge les URL de base personnalisées dans leurs versions actuelles, ce qui fait de MITM la seule méthode d’interception. Leur viabilité reste à évaluer :

- **Windsurf** (Codeium/Cognition)
- **Amp** (Sourcegraph)
- **Amazon Q / Kiro CLI** (AWS Bedrock — distinct de Kiro IDE)
- **Cowork** (application de bureau Anthropic)

Remarque : GitHub Copilot CLI ≥v1.0.19 prend en charge `COPILOT_PROVIDER_BASE_URL` — utilisez une configuration directe plutôt que MITM pour cet outil.
