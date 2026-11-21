# Branching & Release Model (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/BRANCHING_MODEL.md) · 🇪🇹 [am](../../../am/docs/ops/BRANCHING_MODEL.md) · 🇸🇦 [ar](../../../ar/docs/ops/BRANCHING_MODEL.md) · 🇦🇿 [az](../../../az/docs/ops/BRANCHING_MODEL.md) · 🇧🇬 [bg](../../../bg/docs/ops/BRANCHING_MODEL.md) · 🇧🇩 [bn](../../../bn/docs/ops/BRANCHING_MODEL.md) · 🇧🇦 [bs](../../../bs/docs/ops/BRANCHING_MODEL.md) · 🇨🇿 [cs](../../../cs/docs/ops/BRANCHING_MODEL.md) · 🇩🇰 [da](../../../da/docs/ops/BRANCHING_MODEL.md) · 🇩🇪 [de](../../../de/docs/ops/BRANCHING_MODEL.md) · 🇬🇷 [el](../../../el/docs/ops/BRANCHING_MODEL.md) · 🇪🇸 [es](../../../es/docs/ops/BRANCHING_MODEL.md) · 🇪🇪 [et](../../../et/docs/ops/BRANCHING_MODEL.md) · 🇮🇷 [fa](../../../fa/docs/ops/BRANCHING_MODEL.md) · 🇫🇮 [fi](../../../fi/docs/ops/BRANCHING_MODEL.md) · 🇮🇪 [ga](../../../ga/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [gu](../../../gu/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [ha](../../../ha/docs/ops/BRANCHING_MODEL.md) · 🇮🇱 [he](../../../he/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [hi](../../../hi/docs/ops/BRANCHING_MODEL.md) · 🇭🇷 [hr](../../../hr/docs/ops/BRANCHING_MODEL.md) · 🇭🇺 [hu](../../../hu/docs/ops/BRANCHING_MODEL.md) · 🇦🇲 [hy](../../../hy/docs/ops/BRANCHING_MODEL.md) · 🇮🇩 [id](../../../id/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [ig](../../../ig/docs/ops/BRANCHING_MODEL.md) · 🇮🇹 [it](../../../it/docs/ops/BRANCHING_MODEL.md) · 🇯🇵 [ja](../../../ja/docs/ops/BRANCHING_MODEL.md) · 🇬🇪 [ka](../../../ka/docs/ops/BRANCHING_MODEL.md) · 🇰🇭 [km](../../../km/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [kn](../../../kn/docs/ops/BRANCHING_MODEL.md) · 🇰🇷 [ko](../../../ko/docs/ops/BRANCHING_MODEL.md) · 🇱🇹 [lt](../../../lt/docs/ops/BRANCHING_MODEL.md) · 🇱🇻 [lv](../../../lv/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [ml](../../../ml/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [mr](../../../mr/docs/ops/BRANCHING_MODEL.md) · 🇲🇾 [ms](../../../ms/docs/ops/BRANCHING_MODEL.md) · 🇲🇹 [mt](../../../mt/docs/ops/BRANCHING_MODEL.md) · 🇲🇲 [my](../../../my/docs/ops/BRANCHING_MODEL.md) · 🇳🇵 [ne](../../../ne/docs/ops/BRANCHING_MODEL.md) · 🇳🇱 [nl](../../../nl/docs/ops/BRANCHING_MODEL.md) · 🇳🇴 [no](../../../no/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [or](../../../or/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [pa](../../../pa/docs/ops/BRANCHING_MODEL.md) · 🇵🇭 [phi](../../../phi/docs/ops/BRANCHING_MODEL.md) · 🇵🇱 [pl](../../../pl/docs/ops/BRANCHING_MODEL.md) · 🇵🇹 [pt](../../../pt/docs/ops/BRANCHING_MODEL.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/BRANCHING_MODEL.md) · 🇷🇴 [ro](../../../ro/docs/ops/BRANCHING_MODEL.md) · 🇷🇺 [ru](../../../ru/docs/ops/BRANCHING_MODEL.md) · 🇱🇰 [si](../../../si/docs/ops/BRANCHING_MODEL.md) · 🇸🇰 [sk](../../../sk/docs/ops/BRANCHING_MODEL.md) · 🇸🇮 [sl](../../../sl/docs/ops/BRANCHING_MODEL.md) · 🇷🇸 [sr](../../../sr/docs/ops/BRANCHING_MODEL.md) · 🇸🇪 [sv](../../../sv/docs/ops/BRANCHING_MODEL.md) · 🇰🇪 [sw](../../../sw/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [ta](../../../ta/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [te](../../../te/docs/ops/BRANCHING_MODEL.md) · 🇹🇭 [th](../../../th/docs/ops/BRANCHING_MODEL.md) · 🇹🇷 [tr](../../../tr/docs/ops/BRANCHING_MODEL.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/BRANCHING_MODEL.md) · 🇵🇰 [ur](../../../ur/docs/ops/BRANCHING_MODEL.md) · 🇺🇿 [uz](../../../uz/docs/ops/BRANCHING_MODEL.md) · 🇻🇳 [vi](../../../vi/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [yo](../../../yo/docs/ops/BRANCHING_MODEL.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/BRANCHING_MODEL.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/BRANCHING_MODEL.md)

---

OmniRoute utilise un** cycle parallèle** modèle de version : une branche `release/vX.Y.Z` dédiée pour le cycle actif, `main` pour la ligne publiée et une balise `vX.Y.Z` immuable lorsque ce cycle est expédié. Voir les commits atterrir sur `release/*` _et_ sur `main` est attendu — ce n'est pas une confusion.

Les détails du responsable résident dans `CLAUDE.md` (Hard Rule #21) et [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md). Cette page est le résumé public destiné aux contributeurs.

## En bref

| Référence        | Rôle                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `release/vX.Y.Z` | **Cycle actif** — développement quotidien et fusion des PR pour cette version                                       |
| `main`           | **Lignée publiée** — reçoit le cycle via un squash-merge lors de la publication                                     |
| `vX.Y.Z` (tag)   | **Marqueur de publication** — pointeur immuable indiquant « ce qui a été publié », créé au moment de la publication |

```mermaid
flowchart LR
  A["branche feat/fix"] --> B["PR → release/vX.Y.Z"]
  B --> C["pointe de release/vX.Y.Z"]
  C --> D["Squash-merge de la PR de publication → main"]
  D --> E["Tag vX.Y.Z"]
  C --> F["Cycle suivant : release/vX+1 créée depuis la pointe gelée"]
```

## Quelle branche ma PR doit-elle cibler ?

**Ciblez la branche `release/vX.Y.Z` active — et non `main`.**

1. Repérez la branche `release/v*` ouverte ayant la version la plus élevée (exemple au moment de la rédaction :
   `release/v3.8.49`).
2. Créez votre branche depuis sa pointe (`git fetch` + checkout / rebase sur celle-ci).
3. Ouvrez la PR avec **base = cette branche `release/vX.Y.Z`**.

`main` n’est pas la branche d’intégration quotidienne. Les PR ouvertes vers `main`
doivent généralement être redirigées avant leur fusion.

## Libérer le gel (cycles parallèles)

Lorsqu'une version est rapprochée, un problème de marqueur intitulé `release-freeze` est ouvert. Que** n'arrête pas le développement** :

- Le `release/vX.Y.Z` gelé appartient au capitaine de libération de ce navire.
- Le `release/vX+1` du cycle suivant est coupé de la pointe gelée afin que les contributeurs continuent à travailler.
- PRs ouvert qui cible toujours la branche gelée devrait être** reciblé** à la branche `release/v*` active (la plus élevée).

Recherchez un gel ouvert avant de supposer que la branche souhaitée est fusionnable :

```bash
gh issue list --repo diegosouzapw/OmniRoute --label release-freeze --state open
```

Les mécanismes de fusion (propriétaire `queue` label → Mergify) sont documentés dans [MERGE_TRAIN.md](./MERGE_TRAIN.md).

> **19/11/2026 : la file d'attente de fusion Mergify est supprimée** (décision du propriétaire). `.mergify.yml` ne définit plus de file d'attente et refuse les commandes Mergify qui fusionnent ou réécrivent une pull request. Les versions PRs sont fusionnées manuellement selon l'ensemble de règles du référentiel "Exiger des portes vertes sur la version active" (`Gate / CI` + `Gate / Quality`) jusqu'à ce que la file d'attente omni s'exécute en mode live, et via la file d'attente omni après cela ( [OMNI_QUEUE.md](./OMNI_QUEUE.md) ). Le label `queue` ne fusionne plus rien.

## Pourquoi une branche et un tag ?

| Artefact         | Durée de vie   | Objectif                                                                    |
| ---------------- | -------------- | --------------------------------------------------------------------------- |
| `release/vX.Y.Z` | Cycle en cours | Regroupe les PR approuvées, reste au vert dans la CI et sert de base aux PR |
| Tag `vX.Y.Z`     | Permanent      | Marque exactement les éléments publiés sur npm / GitHub Releases            |

La branche est l’atelier ; le tag est le paquet scellé. Après le squash-merge dans
`main`, le cycle suivant se poursuit sur `release/vX+1` sans attendre la fin de la PR de
publication précédente.

## Documentation connexe

- [CONTRIBUTING.md](../../CONTRIBUTING.md) — configuration, tests, liste de contrôle des PR
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — validation avant publication
- [MERGE_TRAIN.md](./MERGE_TRAIN.md) — file d’attente de fusion et train de secours
- [RELEASE_GREEN.md](./RELEASE_GREEN.md) — maintien au vert de la pointe de la branche de publication
