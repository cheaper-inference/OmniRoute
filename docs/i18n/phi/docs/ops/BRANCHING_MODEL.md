# Branching & Release Model (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/BRANCHING_MODEL.md) · 🇪🇹 [am](../../../am/docs/ops/BRANCHING_MODEL.md) · 🇸🇦 [ar](../../../ar/docs/ops/BRANCHING_MODEL.md) · 🇦🇿 [az](../../../az/docs/ops/BRANCHING_MODEL.md) · 🇧🇬 [bg](../../../bg/docs/ops/BRANCHING_MODEL.md) · 🇧🇩 [bn](../../../bn/docs/ops/BRANCHING_MODEL.md) · 🇧🇦 [bs](../../../bs/docs/ops/BRANCHING_MODEL.md) · 🇨🇿 [cs](../../../cs/docs/ops/BRANCHING_MODEL.md) · 🇩🇰 [da](../../../da/docs/ops/BRANCHING_MODEL.md) · 🇩🇪 [de](../../../de/docs/ops/BRANCHING_MODEL.md) · 🇬🇷 [el](../../../el/docs/ops/BRANCHING_MODEL.md) · 🇪🇸 [es](../../../es/docs/ops/BRANCHING_MODEL.md) · 🇪🇪 [et](../../../et/docs/ops/BRANCHING_MODEL.md) · 🇮🇷 [fa](../../../fa/docs/ops/BRANCHING_MODEL.md) · 🇫🇮 [fi](../../../fi/docs/ops/BRANCHING_MODEL.md) · 🇫🇷 [fr](../../../fr/docs/ops/BRANCHING_MODEL.md) · 🇮🇪 [ga](../../../ga/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [gu](../../../gu/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [ha](../../../ha/docs/ops/BRANCHING_MODEL.md) · 🇮🇱 [he](../../../he/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [hi](../../../hi/docs/ops/BRANCHING_MODEL.md) · 🇭🇷 [hr](../../../hr/docs/ops/BRANCHING_MODEL.md) · 🇭🇺 [hu](../../../hu/docs/ops/BRANCHING_MODEL.md) · 🇦🇲 [hy](../../../hy/docs/ops/BRANCHING_MODEL.md) · 🇮🇩 [id](../../../id/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [ig](../../../ig/docs/ops/BRANCHING_MODEL.md) · 🇮🇹 [it](../../../it/docs/ops/BRANCHING_MODEL.md) · 🇯🇵 [ja](../../../ja/docs/ops/BRANCHING_MODEL.md) · 🇬🇪 [ka](../../../ka/docs/ops/BRANCHING_MODEL.md) · 🇰🇭 [km](../../../km/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [kn](../../../kn/docs/ops/BRANCHING_MODEL.md) · 🇰🇷 [ko](../../../ko/docs/ops/BRANCHING_MODEL.md) · 🇱🇹 [lt](../../../lt/docs/ops/BRANCHING_MODEL.md) · 🇱🇻 [lv](../../../lv/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [ml](../../../ml/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [mr](../../../mr/docs/ops/BRANCHING_MODEL.md) · 🇲🇾 [ms](../../../ms/docs/ops/BRANCHING_MODEL.md) · 🇲🇹 [mt](../../../mt/docs/ops/BRANCHING_MODEL.md) · 🇲🇲 [my](../../../my/docs/ops/BRANCHING_MODEL.md) · 🇳🇵 [ne](../../../ne/docs/ops/BRANCHING_MODEL.md) · 🇳🇱 [nl](../../../nl/docs/ops/BRANCHING_MODEL.md) · 🇳🇴 [no](../../../no/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [or](../../../or/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [pa](../../../pa/docs/ops/BRANCHING_MODEL.md) · 🇵🇱 [pl](../../../pl/docs/ops/BRANCHING_MODEL.md) · 🇵🇹 [pt](../../../pt/docs/ops/BRANCHING_MODEL.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/BRANCHING_MODEL.md) · 🇷🇴 [ro](../../../ro/docs/ops/BRANCHING_MODEL.md) · 🇷🇺 [ru](../../../ru/docs/ops/BRANCHING_MODEL.md) · 🇱🇰 [si](../../../si/docs/ops/BRANCHING_MODEL.md) · 🇸🇰 [sk](../../../sk/docs/ops/BRANCHING_MODEL.md) · 🇸🇮 [sl](../../../sl/docs/ops/BRANCHING_MODEL.md) · 🇷🇸 [sr](../../../sr/docs/ops/BRANCHING_MODEL.md) · 🇸🇪 [sv](../../../sv/docs/ops/BRANCHING_MODEL.md) · 🇰🇪 [sw](../../../sw/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [ta](../../../ta/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [te](../../../te/docs/ops/BRANCHING_MODEL.md) · 🇹🇭 [th](../../../th/docs/ops/BRANCHING_MODEL.md) · 🇹🇷 [tr](../../../tr/docs/ops/BRANCHING_MODEL.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/BRANCHING_MODEL.md) · 🇵🇰 [ur](../../../ur/docs/ops/BRANCHING_MODEL.md) · 🇺🇿 [uz](../../../uz/docs/ops/BRANCHING_MODEL.md) · 🇻🇳 [vi](../../../vi/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [yo](../../../yo/docs/ops/BRANCHING_MODEL.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/BRANCHING_MODEL.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/BRANCHING_MODEL.md)

---

Gumagamit ang OmniRoute ng **parallel-cycle** na modelo ng release: isang nakalaang `release/vX.Y.Z`
na branch para sa aktibong cycle, `main` para sa nailathalang linya, at isang hindi nababagong
`vX.Y.Z` na tag kapag inilabas ang cycle na iyon. Inaasahang may mga commit na napupunta sa `release/*` _at_ sa
`main` — hindi ito pagkakamali.

Makikita ang mga detalye para sa maintainer sa `CLAUDE.md` (Hard Rule #21) at
[RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md). Ang pahinang ito ang pampublikong
buod para sa mga contributor.

## Sa isang tingin

| Ref              | Tungkulin                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| `release/vX.Y.Z` | **Aktibong cycle** — pang-araw-araw na development at mga PR merge para sa bersyong iyon                       |
| `main`           | **Nailathalang linya** — tinatanggap ang cycle sa pamamagitan ng squash-merge kapag inilabas ang release       |
| `vX.Y.Z` (tag)   | **Pananda ng paglalabas** — hindi nababagong pointer sa “kung ano ang inilabas” na ginagawa sa oras ng release |

```mermaid
flowchart LR
  A["feat/fix branch"] --> B["PR → release/vX.Y.Z"]
  B --> C["release/vX.Y.Z tip"]
  C --> D["Release PR squash-merges → main"]
  D --> E["Tag vX.Y.Z"]
  C --> F["Next cycle: release/vX+1 cut from frozen tip"]
```

## Aling branch ang dapat i-target ng aking PR?

**I-target ang aktibong `release/vX.Y.Z` na branch — hindi ang `main`.**

1. Hanapin ang pinakamataas na bukas na `release/v*` branch (halimbawa sa oras ng pagsulat:
   `release/v3.8.49`).
2. Gumawa ng branch mula sa tip na iyon (`git fetch` + checkout / rebase dito).
3. Buksan ang PR na may **base = ang `release/vX.Y.Z` na iyon**.

Ang `main` ay hindi ang pang-araw-araw na integration branch. Ang mga PR na binubuksan laban sa `main`
ay karaniwang kailangang muling i-target bago i-merge.

## Release freeze (parallel cycles)

Kapag ang isang release ay pinagkasundo, isang marker na isyu na may label na `release-freeze` ay magbubukas. yun** hindi humihinto sa pag-unlad** :

- Ang nakapirming `release/vX.Y.Z` ay pag-aari ng release captain para sa barkong iyon.
- Ang `release/vX+1` ng susunod na cycle ay pinutol mula sa nakapirming tip kaya patuloy na gumagana ang mga nag-aambag.
- Buksan ang PRs na tina-target pa rin ang nakapirming sangay dapat** na-retarget** sa aktibong (pinakamataas) na sangay `release/v*`.

Suriin para sa isang bukas na pag-freeze bago ipagpalagay na ang sangay na gusto mo ay maaaring pagsamahin:

```bash
gh issue list --repo diegosouzapw/OmniRoute --label release-freeze --state open
```

→ sa `queue` [MERGE_TRAIN](./MERGE_TRAIN.md).

> **2026-11-19: ang Megify merge queue ay itinigil na** (desisyon ng may-ari). Hindi na tinukoy `.mergify.yml` ang isang queue at tinatanggihan ang mga utos ng Mergify na nagsasama o muling nagsusulat ng isang pull request. Ang release PRs ay pinagsama-sama sa pamamagitan ng kamay sa ilalim ng repository ruleset na "Require green gates on the active release" (`Gate / CI` + `Gate / Quality`) hanggang sa tumakbo ang omni-queue sa live mode, at sa pamamagitan ng omni-queue pagkatapos noon ( [OMNI_QUEUE.md](./OMNI_QUEUE.md) ). Ang `queue` label ay hindi na nagsasama ng anuman.

## Bakit may branch at tag?

| Artifact         | Tagal              | Layunin                                                                                    |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------ |
| `release/vX.Y.Z` | Kasalukuyang cycle | Kinokolekta ang mga nasuring PR, pinananatiling pumapasa sa CI, at nagsisilbing base ng PR |
| Tag `vX.Y.Z`     | Magpakailanman     | Minamarkahan ang eksaktong mga bit na inilabas sa npm / GitHub Releases                    |

Ang branch ang pagawaan; ang tag ang selyadong package. Pagkatapos ng squash-merge sa
`main`, magpapatuloy ang susunod na cycle sa `release/vX+1` nang hindi hinihintay na matapos ang naunang
release PR.

## Mga kaugnay na dokumento

- [CONTRIBUTING.md](../../CONTRIBUTING.md) — setup, mga test, checklist ng PR
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — pagpapatunay bago ang paglalabas
- [MERGE_TRAIN.md](./MERGE_TRAIN.md) — merge queue at fallback train
- [RELEASE_GREEN.md](./RELEASE_GREEN.md) — pagpapanatiling pumapasa ang release tip
