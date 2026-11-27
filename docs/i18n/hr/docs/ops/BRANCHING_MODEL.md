# Branching & Release Model (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/BRANCHING_MODEL.md) · 🇪🇹 [am](../../../am/docs/ops/BRANCHING_MODEL.md) · 🇸🇦 [ar](../../../ar/docs/ops/BRANCHING_MODEL.md) · 🇦🇿 [az](../../../az/docs/ops/BRANCHING_MODEL.md) · 🇧🇬 [bg](../../../bg/docs/ops/BRANCHING_MODEL.md) · 🇧🇩 [bn](../../../bn/docs/ops/BRANCHING_MODEL.md) · 🇧🇦 [bs](../../../bs/docs/ops/BRANCHING_MODEL.md) · 🇨🇿 [cs](../../../cs/docs/ops/BRANCHING_MODEL.md) · 🇩🇰 [da](../../../da/docs/ops/BRANCHING_MODEL.md) · 🇩🇪 [de](../../../de/docs/ops/BRANCHING_MODEL.md) · 🇬🇷 [el](../../../el/docs/ops/BRANCHING_MODEL.md) · 🇪🇸 [es](../../../es/docs/ops/BRANCHING_MODEL.md) · 🇪🇪 [et](../../../et/docs/ops/BRANCHING_MODEL.md) · 🇮🇷 [fa](../../../fa/docs/ops/BRANCHING_MODEL.md) · 🇫🇮 [fi](../../../fi/docs/ops/BRANCHING_MODEL.md) · 🇫🇷 [fr](../../../fr/docs/ops/BRANCHING_MODEL.md) · 🇮🇪 [ga](../../../ga/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [gu](../../../gu/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [ha](../../../ha/docs/ops/BRANCHING_MODEL.md) · 🇮🇱 [he](../../../he/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [hi](../../../hi/docs/ops/BRANCHING_MODEL.md) · 🇭🇺 [hu](../../../hu/docs/ops/BRANCHING_MODEL.md) · 🇦🇲 [hy](../../../hy/docs/ops/BRANCHING_MODEL.md) · 🇮🇩 [id](../../../id/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [ig](../../../ig/docs/ops/BRANCHING_MODEL.md) · 🇮🇹 [it](../../../it/docs/ops/BRANCHING_MODEL.md) · 🇯🇵 [ja](../../../ja/docs/ops/BRANCHING_MODEL.md) · 🇬🇪 [ka](../../../ka/docs/ops/BRANCHING_MODEL.md) · 🇰🇭 [km](../../../km/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [kn](../../../kn/docs/ops/BRANCHING_MODEL.md) · 🇰🇷 [ko](../../../ko/docs/ops/BRANCHING_MODEL.md) · 🇱🇹 [lt](../../../lt/docs/ops/BRANCHING_MODEL.md) · 🇱🇻 [lv](../../../lv/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [ml](../../../ml/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [mr](../../../mr/docs/ops/BRANCHING_MODEL.md) · 🇲🇾 [ms](../../../ms/docs/ops/BRANCHING_MODEL.md) · 🇲🇹 [mt](../../../mt/docs/ops/BRANCHING_MODEL.md) · 🇲🇲 [my](../../../my/docs/ops/BRANCHING_MODEL.md) · 🇳🇵 [ne](../../../ne/docs/ops/BRANCHING_MODEL.md) · 🇳🇱 [nl](../../../nl/docs/ops/BRANCHING_MODEL.md) · 🇳🇴 [no](../../../no/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [or](../../../or/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [pa](../../../pa/docs/ops/BRANCHING_MODEL.md) · 🇵🇭 [phi](../../../phi/docs/ops/BRANCHING_MODEL.md) · 🇵🇱 [pl](../../../pl/docs/ops/BRANCHING_MODEL.md) · 🇵🇹 [pt](../../../pt/docs/ops/BRANCHING_MODEL.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/BRANCHING_MODEL.md) · 🇷🇴 [ro](../../../ro/docs/ops/BRANCHING_MODEL.md) · 🇷🇺 [ru](../../../ru/docs/ops/BRANCHING_MODEL.md) · 🇱🇰 [si](../../../si/docs/ops/BRANCHING_MODEL.md) · 🇸🇰 [sk](../../../sk/docs/ops/BRANCHING_MODEL.md) · 🇸🇮 [sl](../../../sl/docs/ops/BRANCHING_MODEL.md) · 🇷🇸 [sr](../../../sr/docs/ops/BRANCHING_MODEL.md) · 🇸🇪 [sv](../../../sv/docs/ops/BRANCHING_MODEL.md) · 🇰🇪 [sw](../../../sw/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [ta](../../../ta/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [te](../../../te/docs/ops/BRANCHING_MODEL.md) · 🇹🇭 [th](../../../th/docs/ops/BRANCHING_MODEL.md) · 🇹🇷 [tr](../../../tr/docs/ops/BRANCHING_MODEL.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/BRANCHING_MODEL.md) · 🇵🇰 [ur](../../../ur/docs/ops/BRANCHING_MODEL.md) · 🇺🇿 [uz](../../../uz/docs/ops/BRANCHING_MODEL.md) · 🇻🇳 [vi](../../../vi/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [yo](../../../yo/docs/ops/BRANCHING_MODEL.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/BRANCHING_MODEL.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/BRANCHING_MODEL.md)

---

OmniRoute koristi a** paralelni ciklus** model izdanja: namjenska `release/vX.Y.Z` grana za aktivni ciklus, `main` za objavljenu liniju i nepromjenjiva `vX.Y.Z` oznaka kada se taj ciklus pošalje. Očekivano je vidjeti da komit slijeće na `release/*` _i_ na `main` — nije zabuna.

Detalji o održavanju nalaze se u `CLAUDE.md` (Hard Rule #21) i [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md). Ova stranica je javni sažetak za suradnike.

## Ukratko

| Referenca         | Uloga                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| `release/vX.Y.Z`  | **Aktivni ciklus** — svakodnevni razvoj i spajanje PR-ova za tu verziju                             |
| `main`            | **Objavljena linija** — prima ciklus putem squash spajanja kada se izdanje objavi                   |
| `vX.Y.Z` (oznaka) | **Oznaka objave** — nepromjenjiv pokazivač na „ono što je objavljeno”, izrađen u trenutku izdavanja |

```mermaid
flowchart LR
  A["grana feat/fix"] --> B["PR → release/vX.Y.Z"]
  B --> C["vrh grane release/vX.Y.Z"]
  C --> D["PR izdanja spaja se squash postupkom → main"]
  D --> E["Oznaka vX.Y.Z"]
  C --> F["Sljedeći ciklus: release/vX+1 stvara se iz zamrznutog vrha"]
```

## Koju granu treba ciljati moj PR?

**Ciljajte aktivnu granu `release/vX.Y.Z` — ne `main`.**

1. Pronađite najvišu otvorenu granu `release/v*` (primjer u trenutku pisanja:
   `release/v3.8.49`).
2. Izradite granu iz njezina vrha (`git fetch` + checkout / rebase na nju).
3. Otvorite PR s postavkom **base = ta grana `release/vX.Y.Z`**.

`main` nije integracijska grana za svakodnevni rad. PR-ove otvorene prema grani `main`
obično treba preusmjeriti prije spajanja.

## Otpuštanje zamrzavanja (paralelni ciklusi)

Kada se izdanje usklađuje, otvara se problem markera s oznakom `release-freeze`. Da** ne zaustavlja razvoj** :

- Smrznuti `release/vX.Y.Z` pripada kapetanu za oslobađanje tog broda.
- `release/vX+1` sljedećeg ciklusa izrezana je iz smrznutog vrha tako da suradnici nastavljaju raditi na slijetanju.
- Otvoreni PRs koji još uvijek cilja na smrznutu granu trebao bi biti** preusmjereni** na aktivnu (najvišu) `release/v*` granu.

Provjerite postoji li otvoreno zamrzavanje prije nego što pretpostavite da se grana koju želite može spojiti:

```bash
gh issue list --repo diegosouzapw/OmniRoute --label release-freeze --state open
```

Mehanika spajanja (vlasnička oznaka `queue` → Mergify) dokumentirana je u [MERGE_TRAIN.md](./MERGE_TRAIN.md).

> **2026-11-19: Mergify red čekanja za spajanje je povučen** (odluka vlasnika). `.mergify.yml` više ne definira red i odbija naredbe Mergify koje spajaju ili prepisuju zahtjev za povlačenjem. Izdanja PRs spajaju se ručno pod skupom pravila repozitorija "Zahtijevaj zelena vrata na aktivnom izdanju" (`Gate / CI` + `Gate / Quality`) dok se omni-queue ne pokrene u načinu rada uživo, a nakon toga kroz omni-queue ( [OMNI_QUEUE.md](./OMNI_QUEUE.md) ). Oznaka `queue` više ništa ne spaja.

## Zašto i grana i oznaka?

| Artefakt         | Trajanje        | Svrha                                                                       |
| ---------------- | --------------- | --------------------------------------------------------------------------- |
| `release/vX.Y.Z` | Ciklus u tijeku | Prikuplja pregledane PR-ove, održava uspješan CI i služi kao baza za PR-ove |
| Oznaka `vX.Y.Z`  | Zauvijek        | Označava točan sadržaj objavljen na npm-u / u GitHub Releases               |

Grana je radionica; oznaka je zapečaćeni paket. Nakon squash spajanja u
`main`, sljedeći se ciklus nastavlja na grani `release/vX+1` bez čekanja da se dovrši
PR prethodnog izdanja.

## Povezana dokumentacija

- [CONTRIBUTING.md](../../CONTRIBUTING.md) — postavljanje, testovi, kontrolni popis za PR
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — provjera prije objave
- [MERGE_TRAIN.md](./MERGE_TRAIN.md) — red čekanja za spajanje i pričuvni slijed spajanja
- [RELEASE_GREEN.md](./RELEASE_GREEN.md) — održavanje vrha grane izdanja ispravnim
