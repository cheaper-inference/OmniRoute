# Release Checklist (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Dernière mise à jour :** 2026-08-28 — v3.8.51
> Processus de publication simplifié qui exploite les compétences de Claude Code pour l’automatisation.
>
> **Maintenez la file d’attente/branche au vert entre les publications :** consultez [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (famille `/green-prs` + `npm run check:release-green` + `/babysit` + exécution nocturne). L’exécuter
> périodiquement — et en particulier **avant** cette liste de contrôle — permet à la PR de publication de démarrer au vert.

## En bref

```bash
# 1. Incrémenter la version + générer le CHANGELOG (compétence)
/version-bump-cc patch    # ou minor/major

# 2. Exécuter le contrôle qualité localement
npm run check              # lint + tests
npm run test:coverage      # seuil de couverture complet (60/60/60/60)

# 3. Compiler et effectuer les tests de bon fonctionnement
npm run build
npm run test:e2e           # facultatif, mais recommandé

# 4. Générer la publication (compétence)
/generate-release-cc

# 5. Déployer (compétence)
/deploy-vps-both-cc        # ou akamai-cc / local-cc

# 6. Capturer les preuves de publication (compétence)
/capture-release-evidences-cc
```

## npm Trusted Publishing (par défaut depuis la v3.8.51) — mis en scène sur demande, direct comme solution de secours

`npm-publish.yml` publie via** npm Publication de confiance (OIDC)** par défaut : le travail `stage-npm` (hébergé sur github) échange le jeton d'identification GitHub contre un identifiant npm de courte durée pour cette exécution. — pas de jeton npm de longue durée dans les secrets du référentiel, pas d'invite 2FA, provenance attachée. Il s’agit du contournement des sanctions npm maintenant que les jetons qui ignorent 2FA sont retirés ; il restaure le flux entièrement automatique du projet jusqu'à la v3.8.48 tout en gardant la garantie WS1.3 (un token fuité ne peut pas être publié seul — il n'y a pas de token).

**Configuration unique (propriétaire) :** npmjs.com → package `omniroute` → Paramètres → _Trusted Publisher_ → GitHub: propriétaire `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml` (environnement : aucun). Jusqu'à ce que cela existe, l'étape automatique échoue avec `ENEEDAUTH`: re-dispatch avec `publish_mode=staged` (ci-dessous) ou `direct`.

### Publication par étapes (sur demande — `publish_mode=staged`)

Le workflow npm-publish ne publie plus directement : il démarre l'archive tar compressée (`check:pack-boot`) puis exécute `npm stage publish` — les octets exacts sont garés dans le registre,** non installable** jusqu'à ce que le propriétaire l'approuve. La porte humaine 2FA s'est déplacée vers AFTER la preuve, pas avant.

**Flux du propriétaire une fois que le flux de travail passe au vert :**

1. `npm stage list omniroute` — recherche l'identifiant de l'étape (également imprimé dans le résumé du flux de travail).
2. Vérifiez les octets intermédiaires (recommandé) : `npm stage download <id>`, puis installez l'archive tar téléchargée dans un préfixe temporaire et démarrez-la (`npm run check:pack-boot` automatise le même pack → install → boot verdict dans CI).
3. `npm stage approve <id>` — l'invite 2FA IS la publication. `npm stage reject <id>` se défausse.
4. Réseau post-publication : le vérificateur post-publication (WS1.4 du plan v3.8.49) installe la version publiée à partir du registre public dans un conteneur propre et la démarre.

**Solution de repli d'urgence :** `workflow_dispatch` avec `publish_mode=direct` restaure l'héritage `npm publish` immédiat (à utiliser uniquement si la mise en scène elle-même se comporte mal ; notez pourquoi).

**Durcissement unique (propriétaire, npmjs.com) :** configurez l'éditeur de confiance pour `omniroute` en mode étape uniquement afin qu'un jeton de longue durée divulgué ne puisse pas `npm publish` directement depuis n'importe où — CI ne peut que mettre en scène ; uniquement les versions 2FA du propriétaire.

**Playbook des artefacts brisés (inchangé) :** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"` comme réflexe par défaut (minutes, réversible) ; `npm unpublish` uniquement à l'intérieur de la fenêtre 72h/no-dependents et jamais au premier mouvement. Docker: ne réécrivez jamais une balise de version. La restauration — renvoie `latest` au dernier bon résumé.

**Docker Hub `latest` (obligatoire pour chaque publication SemVer stable) :** le workflow `docker-publish` doit baliser** les deux** `X.Y.Z` et, lorsque `should-promote-latest.sh` est d'accord, c'est le SemVer stable le plus élevé, `:latest` avec le** même résumé** . Après le travail : Hub `latest` digest est égal au nouveau SemVer digest et `last_updated` déplacé. Ne laissez pas `:latest` sur une ancienne version pendant que les notes de version parlent de correctifs qui n'existent que sur git. Composer des démarrages rapides, utilisez `:latest`; GitOps devrait continuer à épingler `X.Y.Z`. Voir [les canaux de version Docker](../guides/DOCKER_GUIDE.md#release-channels) et #10317.

**Référentiel d'organisation Docker Hub (`cheaperinference/omniroute`) :** Docker Hub ne peut pas déplacer un référentiel entre les espaces de noms, donc `diegosouzapw/omniroute` conserve son historique d'extraction et chaque version, et le travail `mirror-org-dockerhub` de `docker-publish` copie chaque version publiée (et `:latest` lorsqu'il est promu) de `ghcr.io/cheaper-inference/omniroute` vers le référentiel de l'organisation. Il a besoin des secrets `DOCKERHUB_ORG_USERNAME` / `DOCKERHUB_ORG_TOKEN` ; sans eux, le travail reste vert avec un avertissement « miroir d'organisation Docker Hub ignoré » et les autres registres publient normalement. Pour y publier une version publiée ultérieurement, exécutez** Actions → Mettre en miroir l'image Docker sur l'organisation Docker Hub → Exécuter le workflow** avec `version=X.Y.Z` (et `promote_latest` pour la version stable la plus élevée) : il copie les images existantes, pas de reconstruction.

## Voie rapide pour les correctifs urgents (label `hotfix`)

Une PR portant le label `hotfix` ignore la lourde matrice de CI (E2E en 9 fragments, seuil progressif de couverture,
quality-gate, quality-extended) et conserve les contrôles rapides à fort signal : build,
fragments de tests unitaires, intégration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
et le test rapide de démarrage de l’archive tar (`check:pack-boot`). Objectif : être au vert en ≤15 min au lieu d’environ 33 min.

**Politique d’accès — les quatre conditions sont obligatoires (sur le modèle des voies d’urgence de Chromium/VS Code/Node) :**

1. **Sévérité** : la production est hors service — un artefact publié plante au démarrage / un
   correctif de sécurité / chaque utilisateur de la version est affecté. « Important » ne signifie pas « hors service ».
2. **Autorité** : seul le propriétaire du dépôt applique le label `hotfix`. Le label CONSTITUE
   l’approbation — il ne doit jamais être appliqué de sa propre initiative sur une PR de campagne.
3. **Preuves** : le corps de la PR contient un lien vers la précédente exécution complète au vert (la suite que
   les tâches ignorées valideraient à nouveau), ainsi que vers le test propre au correctif, d’abord en échec puis réussi.
4. **Périmètre** : cherry-pick uniquement — le correctif minimal, sans refactorisation ni modifications annexes.

La surface de couverture/seuil progressif ignorée est validée à nouveau lors de la prochaine exécution complète sur la
branche de release (release continuellement au vert) — cette voie évite uniquement l’ATTENTE, jamais la validation.
Les diffs portant uniquement sur les tests (tous les fichiers sous `tests/`, aucun sous `tests/e2e/`) ignorent automatiquement
la matrice E2E, sans aucun label.

## Liste de contrôle détaillée

### Pré-version

- [ ] Tous PRs ciblés pour cette version sont fusionnés avec `release/vX.Y.0`
- [ ] Tous les éléments Linear/issue ouverts pour cette version sont fermés ou poussés vers le jalon suivant
- [ ] CI vert sur la branche `release/vX.Y.0`
- [ ] Aucun marqueur `TODO(release)` dans le code : `grep -r "TODO(release)" src/ open-sse/`
- [ ] image de base Docker à jour (actuellement `node:24.15.0-trixie-slim`)

### Versions et journal des modifications

- [ ] Exécuter `/version-bump-cc <patch|minor|major>` (compétence Code Claude )
  - Bosses `package.json`, `electron/package.json`
  - Régénère `CHANGELOG.md` à partir des commits git depuis la dernière balise
  - Mises à jour des badges README.md
- [ ] Examinez manuellement CHANGELOG.md et nettoyez les messages de validation si nécessaire
- [ ] Assurez-vous que la dernière section Semver dans `CHANGELOG.md` est égale à la version `package.json`
- [ ] Gardez `## [Unreleased]` comme première section du journal des modifications pour les travaux à venir
- [ ] La mise à jour `docs/openapi.yaml` → `info.version` doit être égale à la version `package.json`

### Qualité du code

- [ ] Erreurs `npm run lint` — 0 (les avertissements sont préexistants)
- [ ] `npm run typecheck:core` — nettoyer
- [ ] `npm run typecheck:noimplicit:core` — propre (strict)
- [ ] `npm run check:cycles:ratchet` — dans le plafond `metrics.cycles` gelé ( `check:cycles` nu sort 1 à n'importe quel cycle, #15281)
- [ ] `npm run check:any-budget:t11` — dans les limites du budget
- [ ] `npm run check:route-validation:t06` — nettoyer
- [ ] `npm run check:node-runtime` — a pris en charge le plancher d'exécution rencontré (`>=22.22.2 <23`, `>=24.0.0 <27`, par `SUPPORTED_NODE_RANGE` dans `src/shared/utils/nodeRuntimeSupport.ts`; aligné avec `package.json` `engines`)

### Essai

- [ ] passe `npm run test:unit` —
- [ ] `npm run test:vitest` — pass (serveur MCP, autoCombo, cache)
- [ ] `npm run test:coverage` — porte 60/60/60/60 satisfait (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (si les changements touchent DB / handlers)
- [ ] `npm run test:combo:matrix` — pass (matrice de stratégie combinée : prouve de manière déterministe les décisions de sélection des 22 stratégies de routage publiques ; s'exécute en touchant le routage combiné, la résolution de stratégie ou la logique de repli)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (fumée en amont réelle fermée ; obtient un instantané DB en lecture seule à partir de VPS `root@192.168.0.15`; frappe les vrais fournisseurs, coûte des crédits ; ne fonctionne jamais dans CI; saute proprement sans la porte)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS live smoke : 7 scénarios HTTP contre le serveur `.15` en direct via plain Node ESM; nécessite `ssh root@192.168.0.15`; creates/deletes uniquement les combos `__live_test__*` ; frappe de vrais fournisseurs ; ne fonctionne jamais en CI)
- [ ] `npm run test:e2e` — pass (UI changements)
- [ ] `npm run test:protocols:e2e` — pass (MCP/A2A changements)
- [ ] passe `npm run test:ecosystem` —

### Hameçons (Husky validé)

Les hooks Husky vivent dans `.husky/` et s'exécutent automatiquement sur les opérations git.

- **pré-engagement :** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pré-poussée :** portes déterministes rapides — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (activées le 13/06/2026). Exclut intentionnellement `test:unit` (lent ; couvert par le travail CI `test-unit` ).
  - Exécutez `npm run test:unit` manuellement avant de pousser les branches de version.

Si un hook échoue : corrigez le problème sous-jacent, ne contournez pas avec `--no-verify`.

### Engagements conventionnels

Tous les commits liés à la version doivent suivre le format `type(scope): subject`.

**Types valides :** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Portées valides :** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Modifications majeures : ajoutez un pied de page `BREAKING CHANGE:` ou `!` après la portée (par exemple `feat(api)!: drop /v0`).

### Documentation

- [ ] `npm run check:docs-sync` passe (auto-exécuté par pré-commit)
- [ ] `npm run check:docs-all` passes (parapluie : docs-sync + docs-counts + env-doc-sync + versions obsolètes + doc-links)
- [ ] `npm run check:env-doc-sync` quitte 0 code — ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env le contrat est intact
- [ ] `npm run check:doc-links` quitte 0 — aucune référence de démarque interne cassée après restructuration
- [ ] `docs/architecture/ARCHITECTURE.md` examiné pour storage/runtime drift
- [ ] `docs/guides/TROUBLESHOOTING.md` examiné pour la variable env et la dérive opérationnelle
- [ ] Si `.env.example` a changé : `docs/reference/ENVIRONMENT.md` mis à jour
- [ ] Si la nouvelle fonctionnalité a un UI: `docs/guides/USER_GUIDE.md` le mentionne
- [ ] Si la nouvelle fonctionnalité a API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` mis à jour
- [ ] Si la nouvelle fonctionnalité est un module : `docs/<MODULE>.md` dédié existe
- [ ] En cas de rupture de changement : `docs/guides/TROUBLESHOOTING.md` a une note de migration

### i18n

- [ ] `npm run i18n:check` quitte l'état de traduction 0 — (`.i18n-state.json`) en synchronisation avec les documents sources (pas de sources dérivées en mode strict ; l'avis en mode avertissement est acceptable pour les retouches de dernière minute du document, mais doit être égal à 0 avant le balisage)
- [ ] `npm run i18n:check-ui-coverage` quitte 0 — dans chaque région UI égale ou supérieure au seuil de couverture de 80 %
- [ ] `npm run i18n:sync-ui:dry` signale 0 clé manquante dans les 66 paramètres régionaux cibles (chaque paramètre régional à l'exception de la source `en` )
- [ ] Si la documentation source en anglais a changé, exécutez `npm run i18n:run` (nécessite `OMNIROUTE_TRANSLATION_API_KEY` dans `.env`) avant de marquer
- [ ] Les contributions à la traduction peuvent être reportées à la prochaine version si elles sont mineures (piste dans CHANGELOG)

### Migrations de bases de données

- [ ] Si `src/lib/db/migrations/` a de nouveaux fichiers :
  - [ ] Chaque migration est idempotente (`CREATE TABLE IF NOT EXISTS`, etc.)
  - [ ] Migrations enveloppées dans des transactions
  - [ ] Numéroté correctement (pas d'espace dans l'ordre)
- [ ] Test sur une nouvelle installation : supprimez `~/.omniroute/omniroute.db` et exécutez `npm run dev`
- [ ] Test sur une installation existante : sauvegardez DB, exécutez la migration, vérifiez le schéma
- [ ] fichiers WAL (`-wal`, `-shm`) gérés correctement si la migration réécrit les tables

### Catalogue des fournisseurs (validé par Zod)

- [ ] `src/shared/constants/providers.ts` Zod valide au moment du chargement
  - [ ] Tous les fournisseurs ont des champs obligatoires (`id`, `label`, `kind`, etc.)
  - [ ] `freeNote` fourni pour les nouveaux fournisseurs gratuits
  - [ ] les fournisseurs OAuth ont `oauthConfig` enregistré dans `src/lib/oauth/constants/oauth.ts`
- [ ] Si nouveau fournisseur ajouté : exécuteur correspondant dans `open-sse/executors/`
- [ ] Si format non OpenAI : traducteur en `open-sse/translator/`
- [ ] Modèles enregistrés dans `open-sse/config/providerRegistry.ts`
- [ ] Les tests unitaires dans `tests/unit/` couvrent la classification et le routage des fournisseurs

### Bureau (Electron)

Si `electron/` a changé :

- [ ] `npm run electron:smoke:packaged` passe
- [ ] Builds testés pour au moins l'un des `:win`, `:mac`, `:linux`
- [ ] Certificats de signature de code non expirés (si signature)
- [ ] la version `electron/package.json` correspond à la racine de `package.json`
- [ ] Pointeur de canal de mise à jour automatique mis à jour en cas de publication sur `stable`

### Disposition de construction

Le référentiel utilise trois répertoires de sortie distincts — jamais les mélanger :

| Annuaire  | But                                                           | Suivi ?         |
| --------- | ------------------------------------------------------------- | --------------- |
| `src/`    | Source de l'application (TypeScript / TSX)                    | Oui             |
| `.build/` | Construire la sortie intermédiaire — `next build` (`distDir`) | Non (gitignoré) |
| `dist/`   | Bundle npm livrable — assemblé par `assembleStandalone`       | Non (gitignoré) |

> **Remarque de l'opérateur :** le répertoire d'images VPS distant reste `/usr/lib/node_modules/omniroute/app/`. Seul le** en dépôt** sortie de construction déplacée (`app/` → `dist/`). Les compétences de déploiement rsynchronisent le contenu `dist/` dans le répertoire `app/` distant — aucune modification de chemin VPS n'est requise.

**Flux de construction unique :**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Est-ce que NOT exécute `npm run build` suivi d'un `npm run build:cli` séparé pour déployer — utilisez `npm run build:release` qui effectue une reconstruction propre de la sentinelle + en une seule commande.

### Validation des artefacts

- [ ] `npm run build:release` réussit et `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` clean — pas `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ou autre résidu local
- [ ] `dist/server.js` existe après la construction
- [ ] Smoke d'exécution packagée locale facultative : `npm run dev:candidate -- validate` après que `npm run dev:candidate -- build` démarre l'archive tar compressée sur un `DATA_DIR` isolé et vérifie `/api/health` + `/v1/models` (voir [Contribution Golden Path](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) )

### Marquage et publication

- [ ] Exécutez `/generate-release-cc` (compétence Code Claude ) :
  - Crée le tag `vX.Y.Z`
  - Pousse la balise et la branche
  - Ouvre la version GitHub avec le corps du journal des modifications
  - Attache les installateurs Electron (si construits)
- [ ] Ou manuellement :
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Déployer

Les compétences de déploiement utilisent le flux rsync léger — no `npm pack`, no `npm i -g`:

- [ ] Utilisez la compétence de déploiement qui correspond à la cible :
  - `/deploy-vps-local-cc` — VPS local (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — les deux
- [ ] Avant le déploiement, confirmez `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] La construction doit s'exécuter là où `node_modules` est réel (caisse principale ou `npm ci`'d worktree — NOT un arbre de travail lié symboliquement)
- [ ] Instance déployée de test de fumée :
  - Ouvrir la chaîne de vérification de la version `/dashboard/health` → correspond à la version
  - Exécuter une requête `/v1/chat/completions` sur un fournisseur connu
  - Vérifier `/api/monitoring/health` renvoie les disjoncteurs `CLOSED`
  - Confirmer la réponse des transports MCP (`/mcp` HTTP, `/mcp-sse` SSE)

### Après la sortie

- [ ] Exécuter `/capture-release-evidences-cc` (compétence Code Claude )
  - Capture WebP screenshots/recordings de nouvelles fonctionnalités
  - Attaché aux notes de version/article de blog
- [ ] Mettre à jour GitHub Discussions / Discord avec l'annonce de sortie
- [ ] Jalon ouvert pour la prochaine version
- [ ] Si c'est critique : épinglez la discussion ou publiez dans `news.json` pour la bannière dans l'application

### Porte de lancement publique du radar

L'annonce Radar est intentionnellement engagée avec `active: false`. L'activation est un changement distinct une fois que chaque élément ci-dessous est mis en évidence :

- [ ] Tous les Radar PRs empilés sont fusionnés et la pointe de sortie CI est verte
- [ ] Déployer et fumer les routes OSS Radar avec `RADAR_ENABLED` toujours désactivé par défaut
- [ ] Fumez `GET /planos`, `/termos`, `/privacidade` et `/reembolso` sur l'hôte radar nommé
- [ ] Opérateur de disques identity/contact/address et examen juridique approuvé par le propriétaire dans le service privé
- [ ] Exercez Stripe Checkout et le webhook signé en mode test uniquement
- [ ] Effectuez une livraison d'e-mails transactionnels cryptés avec le sender/domain approuvé
- [ ] Prouvez la restauration des sauvegardes et une exécution de recherche supervisée et plafonnée au budget
- [ ] Approuver la politique d'examen BRL/PIX avant d'accepter les preuves de don
- [ ] Activez le paiement public uniquement après les portes précédentes, puis activez le nouveau `news.json` ID
- [ ] Vérifiez que la bannière d'accueil utilise une copie localisée et qu'un nouveau ID réapparaît après le rejet d'un ancien ID.

## Tests de fumée des services intégrés (v3.8.4+)

Avant de publier toute version comprenant des modifications des services intégrés, vérifiez les éléments suivants :

### Démarrage avec une base de données neuve (détecte les collisions de migrations — ajouté après le correctif v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — attendez 10 s pour le démarrage
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` renvoie `"9router"` (PAS 404, PAS 500). Confirme que la migration `071_services.sql` a été appliquée et que la ligne a été initialisée.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` renvoie 3 lignes.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` renvoie 2 lignes (confirme que `070_webhooks_kind_metadata.sql` a été appliquée).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` réussit — protège contre de futures collisions.

### 9Router

- [ ] `POST /api/services/9router/install` renvoie 200 avec `installedVersion` en moins de 2 min
- [ ] `POST /api/services/9router/start` renvoie 200 et `state: "running"` en moins de 30 s
- [ ] `GET /api/services/9router/status` indique `health: "healthy"`
- [ ] `POST /v1/chat/completions` avec `"model": "9router/auto/..."` renvoie 200 (routage de bout en bout via 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` affiche l’interface native de 9Router dans le proxy (aucune iframe pointant directement vers `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` renvoie `{ keyRotated: true }` et le service redémarre correctement
- [ ] `POST /api/services/9router/stop` renvoie 200 et `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` renvoie un flux SSE avec un événement `snapshot` contenant les lignes récentes
- [ ] Une installation dans un environnement où `npm` n’est pas présent dans PATH renvoie 500 avec un message d’erreur convivial (sans trace de pile)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` renvoie 200 en moins de 2 min
- [ ] `POST /api/services/cliproxy/start` renvoie 200 et `state: "running"` en moins de 30 s
- [ ] `GET /api/services/cliproxy/status` indique `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` renvoie 200 et `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` renvoie un flux SSE

### Régression de sécurité

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` renvoie `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` renvoie `403 LOCAL_ONLY`
- [ ] Les réponses d’erreur de `/api/services/*` ne contiennent ni `err.stack` ni chemins de fichiers absolus

## Vérifications pour v3.8.0+

Avant de publier toute version v3.8.x, vérifiez également les éléments suivants :

- [ ] `omniroute --tray` démarre sous macOS (systray2 installé dans `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` démarre sous Linux (nécessite DISPLAY ; erreur gérée proprement s’il n’est pas défini)
- [ ] `omniroute --tray` démarre sous Windows (PowerShell NotifyIcon, aucun binaire supplémentaire)
- [ ] `omniroute config tray enable` crée une entrée de démarrage automatique ; la désactivation la supprime
- [ ] `npm install -g omniroute@<this-version>` exécute le script postinstall sans arrêt fatal
- [ ] Le processus de mise à jour conserve les dépendances facultatives : `omniroute update --apply` et le programme de mise à jour automatique
      exécutent `npm install -g … --include=optional` afin que les `optionalDependencies` (better-sqlite3,
      keytar, tls-client et la pile SLM llmlingua : `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) survivent à une mise à jour. Le niveau SLM ultra `modelPath` nécessite également le
      modèle tinybert, téléchargé automatiquement dans `${DATA_DIR}/models/llmlingua` lors de la première utilisation. Le script postinstall
      (`scripts/build/colocateOptionals.mjs`) regroupe ensuite la fermeture facultative SLM dans
      `dist/node_modules` afin que le worker résolve une SEULE instance de `@huggingface/transformers` ^4.2.0
      — la trace autonome n’intègre que transformers, et non les dépendances facultatives importées dynamiquement ;
      sans cela, le worker chargerait llmlingua-2 avec transformers à la racine et le niveau SLM échouerait silencieusement en mode ouvert.
- [ ] `omniroute status` fonctionne sans `.env` (chemin du jeton CLI, boucle locale uniquement)
- [ ] `curl http://localhost:20128/api/shutdown` renvoie 401 (route toujours protégée)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` renvoie 401 (protection de la boucle locale)
- [ ] Le runtime SQLite est résolu vers `bundled` lors de la première exécution (binaire intégré valide pour la plateforme)
- [ ] Le runtime SQLite bascule vers `runtime` lorsque `node_modules/better-sqlite3` est supprimé
- [ ] Le filtre MCP intelligent compresse la sortie réelle de `playwright-mcp browser_snapshot` (réduction ≥50 %)
- [ ] Les 10 fichiers `skills/omniroute*/SKILL.md` sont accessibles publiquement via une URL GitHub brute
- [ ] L’assistant de prise en main affiche l’étape de présentation des niveaux « How It Works » lors d’une nouvelle configuration
- [ ] Le widget de couverture des niveaux du tableau de bord d’accueil affiche les nombres configurés/actifs

---

## 3.9.0 LTS cut (répété en 3.8.58)

Après la v3.8.59, la version suivante est la 3.9.0, et sa pointe devient deux branches de longue durée : `stable/v3` (la ligne LTS v3, npm `latest`) et `develop` (v4, passée à 4.0.0, npm `nightly`). Le modèle branch/channel, le port direct et les étiquettes sont dans [RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md) ; le plan est dans le [ROADMAP](../../ROADMAP.md) (Phase 3). La coupe s'exécute une fois ; 3.8.58 le répète bout à bout sur un fork, et 3.8.59 se termine avec la [liste de contrôle GO/NO-GO](./LTS_GO_NO_GO.md).

### Exécution à sec (lecture seule, sécurisée à tout moment)

```bash
npm run release:dry-run-lts-cut                       # the real cut: 3.9.0 from HEAD, previous tag v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # pin the source commit
```

`scripts/release/dry-run-lts-cut.mjs` n'exécute rien : il lit git et `gh` et imprime la séquence entière des conditions préalables — (la source est résolue, le référentiel source a un historique complet — un clone superficiel ne peut pas pousser `stable/v3`, le côté récepteur rejette le pack au premier parent greffé, donc coupé d'un clone complet ou `git fetch --unshallow origin` en premier — la balise précédente existe, `package.json` est la version cible, un problème `release-freeze` est ouvert, aucun problème `Release branch not green` ouvert sur une branche de version existante — une branche qui n'existe pas signale `?` inconnu, jamais verte la file d'attente omni — obtient la version PRs (G11 : `config/merge-queue/config.json` valide, son `bases` gère la branche de version, `mode` `live`, son étiquette existe), l'ensemble de règles `release/*` bloque toujours la suppression et la poussée forcée, et `stable/v3` et `develop` n'existent pas encore), les deux étapes de branche, qui dorment-workflow les déclencheurs et les conditions `if:` deviennent vrais (et qui restent contrôlés par une variable du référentiel ou épinglés au référentiel canonique), les balises dist attendues (`latest` → 3.9.0, `next` et `nightly` vides) et la restauration. Quittez `0` = `RESULT: READY`, `1` = une condition préalable de blocage a échoué (`✗`), erreur d'utilisation `2` =. `--advisory <id,...>` rétrograde une vérification en avertissement (`!`) sans la masquer.

Exécutez l'essai à sec de la coupe réelle pendant que le gel de la version 3.9.0 est encore ouvert — les branches sont créées après la balise et avant que la phase 12c ne lève le gel.

### 3.8.58 répétition (fork seulement)

```bash
# 1. Dry-run on the current tip with rehearsal parameters
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Execute against a FORK remote (origin, or any remote whose URL is the canonical
#    repository, is refused; every step asks for confirmation on the terminal)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Exercise the dormant workflows in the fork (workflow_dispatch where the dry-run
#    reports a canonical-repository pin), then roll back
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Le commit de développement est construit avec git plumbing (aucun arbre de travail n'est touché) et supprime les cinq mêmes fichiers qu'un commit à ouverture de cycle : `package.json`, `open-sse/package.json`, `electron/package.json`, `package-lock.json` et `docs/openapi.yaml`. La section `[4.0.0]` CHANGELOG et ses miroirs i18n sont ensuite ouverts sur `develop`, avant son premier PR. Le script ne change jamais les balises npm dist — pour répéter celles d'un package de travail.

### Artefact d'aperçu PR (construit une fois, favorise les mêmes octets)

`.github/workflows/preview-artifact.yml` crée une archive tar de production à partir d'une tête PR et valide cette version exacte (#8084 slice (a)). PRs dans le même référentiel uniquement ; rien n'est publié.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # or add the `preview-artifact` label
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # preview install
```

L'exécution effectue `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, emballe l'archive tar, exécute `npm run check:pack-boot` (faux secrets, répertoire de données éphémères), remballe et échoue à moins que le résumé ne soit identique, puis enregistre `artifact-identity.json` (tête SHA, base SHA, hachage de fichier de verrouillage, plateforme, arch, nœud ABI, bundler, politique de construction — `scripts/release/artifact-identity.mjs`) et atteste l'archive tar dans un travail à part. Promouvoir un aperçu signifie installer cette archive tar : ne jamais reconstruire à partir des sources.

### La coupe (3.9.0, après GO)

1. GO enregistré dans [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` imprime `RESULT: READY`.
3. Créez les branches sur `origin` à la main avec les commandes, l'exécution à sec imprime — le script refuse de pousser vers `origin`. Pour réutiliser un commit de développement révisé, exécutez d'abord la répétition `--execute` sur la pointe 3.9.0 contre votre fork ; il imprime les deux SHAs, et les mêmes commits peuvent être poussés :

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Protégez `stable/v3` et `develop` (file d'attente de fusion des ensembles de règles + ) avant l'arrivée du premier PR.
5. Les workflows dormants s'activent selon l'existence d'une branche : `forward-port.yml` (push to `stable/v3`), `validate-stable-pr.yml` (PRs to `stable/v3`) et `nightly-v4-build.yml` (builds `develop`). Avant la mise en ligne, définissez le secret du référentiel `secrets.FORWARD_PORT_TOKEN` (pour que CI s'exécute sur le port forward PRs) ; la publication nocturne reste désactivée jusqu'à ce que le propriétaire définisse la variable du référentiel `vars.NIGHTLY_PUBLISH` sur `true` et que npm Trusted Publishing accepte `nightly-v4-build.yml`. La résolution du canal est `scripts/release/dist-tag.mjs`, le même résolveur `npm-publish.yml` utilise.
6. Vérifiez les chaînes : `npm view omniroute dist-tags --json` affiche `latest` = 3.9.0 et pas `next` / `nightly` jusqu'à la publication de la v4.
7. Rollback, si nécessaire : `git push origin --delete refs/heads/stable/v3 refs/heads/develop` et `npm dist-tag add omniroute@3.8.59 latest`.

---

## Restauration

Si une version publiée présente un problème critique :

1. `gh release edit vX.Y.Z --prerelease` (la marque comme n’étant pas la plus récente)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (uniquement si elle n’a pas encore été adoptée par les utilisateurs)
3. Ou : correctif urgent sur `release/vX.Y.0` → version corrective `vX.Y.(Z+1)`
4. Communiquer immédiatement sur GitHub Discussions et Discord

## Règles strictes

- Ne jamais effectuer de commit directement sur `main`
- Ne jamais utiliser `git push --force` sur les branches `main` ou `release/*`
- Ne jamais ignorer les hooks Husky (`--no-verify`)
- Ne jamais commiter de secrets, d’identifiants ou de fichiers `.env`
- La couverture doit rester ≥60/60/60/60 (instructions/lignes/fonctions/branches)
- Toujours inclure ou mettre à jour les tests lors de la modification du code de production dans `src/`, `open-sse/`, `electron/` ou `bin/`

## Vérification automatisée de la synchronisation

Exécutez localement le contrôle de synchronisation de la documentation avant d’ouvrir une PR :

```bash
npm run check:docs-sync
```

La CI exécute également ce contrôle dans `.github/workflows/ci.yml` (tâche de lint).
