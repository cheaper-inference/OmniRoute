# Branching & Release Model (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/BRANCHING_MODEL.md) · 🇪🇹 [am](../../../am/docs/ops/BRANCHING_MODEL.md) · 🇸🇦 [ar](../../../ar/docs/ops/BRANCHING_MODEL.md) · 🇦🇿 [az](../../../az/docs/ops/BRANCHING_MODEL.md) · 🇧🇬 [bg](../../../bg/docs/ops/BRANCHING_MODEL.md) · 🇧🇩 [bn](../../../bn/docs/ops/BRANCHING_MODEL.md) · 🇧🇦 [bs](../../../bs/docs/ops/BRANCHING_MODEL.md) · 🇨🇿 [cs](../../../cs/docs/ops/BRANCHING_MODEL.md) · 🇩🇰 [da](../../../da/docs/ops/BRANCHING_MODEL.md) · 🇩🇪 [de](../../../de/docs/ops/BRANCHING_MODEL.md) · 🇬🇷 [el](../../../el/docs/ops/BRANCHING_MODEL.md) · 🇪🇸 [es](../../../es/docs/ops/BRANCHING_MODEL.md) · 🇪🇪 [et](../../../et/docs/ops/BRANCHING_MODEL.md) · 🇮🇷 [fa](../../../fa/docs/ops/BRANCHING_MODEL.md) · 🇫🇮 [fi](../../../fi/docs/ops/BRANCHING_MODEL.md) · 🇫🇷 [fr](../../../fr/docs/ops/BRANCHING_MODEL.md) · 🇮🇪 [ga](../../../ga/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [gu](../../../gu/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [ha](../../../ha/docs/ops/BRANCHING_MODEL.md) · 🇮🇱 [he](../../../he/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [hi](../../../hi/docs/ops/BRANCHING_MODEL.md) · 🇭🇷 [hr](../../../hr/docs/ops/BRANCHING_MODEL.md) · 🇭🇺 [hu](../../../hu/docs/ops/BRANCHING_MODEL.md) · 🇦🇲 [hy](../../../hy/docs/ops/BRANCHING_MODEL.md) · 🇮🇩 [id](../../../id/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [ig](../../../ig/docs/ops/BRANCHING_MODEL.md) · 🇮🇹 [it](../../../it/docs/ops/BRANCHING_MODEL.md) · 🇯🇵 [ja](../../../ja/docs/ops/BRANCHING_MODEL.md) · 🇬🇪 [ka](../../../ka/docs/ops/BRANCHING_MODEL.md) · 🇰🇭 [km](../../../km/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [kn](../../../kn/docs/ops/BRANCHING_MODEL.md) · 🇰🇷 [ko](../../../ko/docs/ops/BRANCHING_MODEL.md) · 🇱🇹 [lt](../../../lt/docs/ops/BRANCHING_MODEL.md) · 🇱🇻 [lv](../../../lv/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [ml](../../../ml/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [mr](../../../mr/docs/ops/BRANCHING_MODEL.md) · 🇲🇾 [ms](../../../ms/docs/ops/BRANCHING_MODEL.md) · 🇲🇹 [mt](../../../mt/docs/ops/BRANCHING_MODEL.md) · 🇲🇲 [my](../../../my/docs/ops/BRANCHING_MODEL.md) · 🇳🇵 [ne](../../../ne/docs/ops/BRANCHING_MODEL.md) · 🇳🇱 [nl](../../../nl/docs/ops/BRANCHING_MODEL.md) · 🇳🇴 [no](../../../no/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [pa](../../../pa/docs/ops/BRANCHING_MODEL.md) · 🇵🇭 [phi](../../../phi/docs/ops/BRANCHING_MODEL.md) · 🇵🇱 [pl](../../../pl/docs/ops/BRANCHING_MODEL.md) · 🇵🇹 [pt](../../../pt/docs/ops/BRANCHING_MODEL.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/BRANCHING_MODEL.md) · 🇷🇴 [ro](../../../ro/docs/ops/BRANCHING_MODEL.md) · 🇷🇺 [ru](../../../ru/docs/ops/BRANCHING_MODEL.md) · 🇱🇰 [si](../../../si/docs/ops/BRANCHING_MODEL.md) · 🇸🇰 [sk](../../../sk/docs/ops/BRANCHING_MODEL.md) · 🇸🇮 [sl](../../../sl/docs/ops/BRANCHING_MODEL.md) · 🇷🇸 [sr](../../../sr/docs/ops/BRANCHING_MODEL.md) · 🇸🇪 [sv](../../../sv/docs/ops/BRANCHING_MODEL.md) · 🇰🇪 [sw](../../../sw/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [ta](../../../ta/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [te](../../../te/docs/ops/BRANCHING_MODEL.md) · 🇹🇭 [th](../../../th/docs/ops/BRANCHING_MODEL.md) · 🇹🇷 [tr](../../../tr/docs/ops/BRANCHING_MODEL.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/BRANCHING_MODEL.md) · 🇵🇰 [ur](../../../ur/docs/ops/BRANCHING_MODEL.md) · 🇺🇿 [uz](../../../uz/docs/ops/BRANCHING_MODEL.md) · 🇻🇳 [vi](../../../vi/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [yo](../../../yo/docs/ops/BRANCHING_MODEL.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/BRANCHING_MODEL.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/BRANCHING_MODEL.md)

---

OmniRoute ଏକ **ସମାନ୍ତରାଳ-ଚକ୍ର** ରିଲିଜ୍ ମଡେଲ୍ ବ୍ୟବହାର କରେ: ସକ୍ରିୟ ଚକ୍ର ପାଇଁ ଏକ ଉତ୍ସର୍ଗୀକୃତ `release/vX.Y.Z`
ବ୍ରାଞ୍ଚ, ପ୍ରକାଶିତ ଧାରା ପାଇଁ `main`, ଏବଂ ସେହି ଚକ୍ର ରିଲିଜ୍ ହେବାବେଳେ ଏକ ଅପରିବର୍ତ୍ତନୀୟ
`vX.Y.Z` ଟ୍ୟାଗ୍। କମିଟ୍ଗୁଡ଼ିକ `release/*` _ଏବଂ_ `main` ଉଭୟରେ ପହଞ୍ଚୁଥିବା ଦେଖିବା ଆଶାକରାଯାଏ — ଏହା କୌଣସି ଭୁଲ୍ ନୁହେଁ।

ମେଣ୍ଟେନର୍ଙ୍କ ପାଇଁ ବିବରଣୀ `CLAUDE.md` (କଠୋର ନିୟମ #21) ଏବଂ
[RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md)ରେ ଅଛି। ଏହି ପୃଷ୍ଠାଟି ସାର୍ବଜନୀନ ଭାବରେ
ଅବଦାନକାରୀଙ୍କ ପାଇଁ ଉଦ୍ଦିଷ୍ଟ ସାରାଂଶ।

## ଏକ ନଜରରେ

| ରେଫ୍              | ଭୂମିକା                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------- |
| `release/vX.Y.Z`  | **ସକ୍ରିୟ ଚକ୍ର** — ସେହି ସଂସ୍କରଣ ପାଇଁ ଦୈନନ୍ଦିନ ବିକାଶ ଏବଂ PR ମର୍ଜ୍                             |
| `main`            | **ପ୍ରକାଶିତ ଧାରା** — ରିଲିଜ୍ ପ୍ରକାଶିତ ହେବାବେଳେ ସ୍କ୍ୱାଶ୍-ମର୍ଜ୍ ମାଧ୍ୟମରେ ଚକ୍ରଟିକୁ ଗ୍ରହଣ କରେ     |
| `vX.Y.Z` (ଟ୍ୟାଗ୍) | **ପ୍ରକାଶନ ଚିହ୍ନକ** — ରିଲିଜ୍ ସମୟରେ ସୃଷ୍ଟି ହୋଇଥିବା, ଅପରିବର୍ତ୍ତନୀୟ “କ’ଣ ପ୍ରକାଶିତ ହେଲା” ପଏଣ୍ଟର୍ |

```mermaid
flowchart LR
  A["feat/fix ବ୍ରାଞ୍ଚ"] --> B["PR → release/vX.Y.Z"]
  B --> C["release/vX.Y.Z ଟିପ୍"]
  C --> D["ରିଲିଜ୍ PR ସ୍କ୍ୱାଶ୍-ମର୍ଜ୍ ହୁଏ → main"]
  D --> E["ଟ୍ୟାଗ୍ vX.Y.Z"]
  C --> F["ପରବର୍ତ୍ତୀ ଚକ୍ର: ଫ୍ରିଜ୍ ହୋଇଥିବା ଟିପ୍ରୁ release/vX+1 ସୃଷ୍ଟି"]
```

## ମୋ PR କେଉଁଠାକୁ ଲକ୍ଷ୍ୟ କରିବା ଉଚିତ?

**ସକ୍ରିୟ `release/vX.Y.Z` ବ୍ରାଞ୍ଚକୁ ଲକ୍ଷ୍ୟ କରନ୍ତୁ — `main`କୁ ନୁହେଁ।**

1. ସର୍ବୋଚ୍ଚ ଖୋଲା `release/v*` ବ୍ରାଞ୍ଚଟି ଖୋଜନ୍ତୁ (ଲେଖିବା ସମୟର ଉଦାହରଣ:
   `release/v3.8.49`)।
2. ସେହି ଟିପ୍ରୁ ବ୍ରାଞ୍ଚ କରନ୍ତୁ (`git fetch` + checkout / ତାହା ଉପରେ rebase)।
3. **base = ସେହି `release/vX.Y.Z`** ସହିତ PR ଖୋଲନ୍ତୁ।

`main` ଦୈନନ୍ଦିନ ଇଣ୍ଟିଗ୍ରେସନ୍ ବ୍ରାଞ୍ଚ ନୁହେଁ। `main` ବିରୁଦ୍ଧରେ ଖୋଲାଯାଇଥିବା PRଗୁଡ଼ିକୁ
ସାଧାରଣତଃ ମର୍ଜ୍ ପୂର୍ବରୁ ପୁନଃଲକ୍ଷ୍ୟ କରିବାକୁ ପଡ଼େ।

## ଫ୍ରିଜ୍ ମୁକ୍ତ କରନ୍ତୁ (ସମାନ୍ତରାଳ ଚକ୍ର)

ଯେତେବେଳେ ଏକ ରିଲିଜ୍ ପୁନ iled ସମନ୍ୱିତ ହୁଏ, `release-freeze` ନାମକ ଏକ ମାର୍କର ଇସୁ ଖୋଲାଯାଏ। ତାହା** ବିକାଶ ବନ୍ଦ କରେ ନାହିଁ।** :

- ଫ୍ରିଜ୍ ହୋଇଥିବା `release/vX.Y.Z` ସେହି ଜାହାଜ ପାଇଁ ରିଲିଜ୍ କ୍ୟାପଟେନର ଅଟେ।
- ପରବର୍ତ୍ତୀ ଚକ୍ରର `release/vX+1` ଫ୍ରିଜ୍ ଟିପ୍ ଠାରୁ କଟାଯାଇଥାଏ ତେଣୁ ଅବଦାନକାରୀମାନେ ଅବତରଣ କାର୍ଯ୍ୟ ଜାରି ରଖନ୍ତି।
- PRs ଖୋଲନ୍ତୁ ଯାହାକି ଫ୍ରିଜ୍ ଶାଖାକୁ ଟାର୍ଗେଟ୍ କରିବା ଉଚିତ।** retargeted** ସକ୍ରିୟ (ସର୍ବୋଚ୍ଚ) `release/v*` ଶାଖାକୁ।

ଆପଣ ଚାହୁଁଥିବା ଶାଖା ମିଶ୍ରିତ ହେବା ପୂର୍ବରୁ ଏକ ଖୋଲା ଫ୍ରିଜ୍ ଯାଞ୍ଚ କରନ୍ତୁ:

```bash
gh issue list --repo diegosouzapw/OmniRoute --label release-freeze --state open
```

ମେକାନିକ୍ସ ମିଶ୍ରଣ (ମାଲିକ `queue` ଲେବଲ୍ → ମିଶ୍ରଣ) [MERGE_TRAIN.md](./MERGE_TRAIN.md) ରେ ଡକ୍ୟୁମେଣ୍ଟ୍ ହୋଇଛି।

> **2026-11-19: ମିଶ୍ରଣ ମିଶ୍ରଣ କ୍ରମ ଅବସରପ୍ରାପ୍ତ।** (ମାଲିକଙ୍କ ନିଷ୍ପତ୍ତି) `.mergify.yml` ଆଉ ଏକ ଧାଡି ବ୍ୟାଖ୍ୟା କରେ ନାହିଁ ଏବଂ ଏକ ମିଶ୍ରଣ ଅନୁରୋଧକୁ ମିଶ୍ରଣ କିମ୍ବା ପୁନ r ଲିଖନ କରିବା ପାଇଁ ମିଶ୍ରଣ ନିର୍ଦ୍ଦେଶଗୁଡ଼ିକୁ ପ୍ରତ୍ୟାଖ୍ୟାନ କରେ। ରିଲିଜ୍ PRs ରେପୋଜିଟୋରୀ ନିୟମ "ସକ୍ରିୟ ରିଲିଜ୍ ଉପରେ ସବୁଜ ଫାଟକ ଆବଶ୍ୟକ" (`Gate / CI` + `Gate / Quality`) ଅଧୀନରେ ମିଶ୍ରିତ ହୋଇଛି ଯେପର୍ଯ୍ୟନ୍ତ omni-que ଲାଇଭ୍ ମୋଡ୍ ରେ ଚାଲିବ ନାହିଁ, ଏବଂ ଏହା ପରେ omni-queue ମାଧ୍ୟମରେ ( [OMNI_QUEUE.md](./OMNI_QUEUE.md) )। `queue` ଲେବଲ୍ ଆଉ କିଛି ମିଶ୍ରଣ କରେ ନାହିଁ।

## ଏକ ବ୍ରାଞ୍ଚ ଏବଂ ଏକ ଟ୍ୟାଗ୍ ଉଭୟ କାହିଁକି?

| ଆର୍ଟିଫ୍ୟାକ୍ଟ     | ଜୀବନକାଳ           | ଉଦ୍ଦେଶ୍ୟ                                                                     |
| ---------------- | ----------------- | ---------------------------------------------------------------------------- |
| `release/vX.Y.Z` | ପ୍ରକ୍ରିୟାଧୀନ ଚକ୍ର | ସମୀକ୍ଷା ହୋଇଥିବା PRଗୁଡ଼ିକୁ ସଂଗ୍ରହ କରେ, CIକୁ ସବୁଜ ରଖେ ଏବଂ PR ବେସ୍ ଭାବେ କାମ କରେ |
| ଟ୍ୟାଗ୍ `vX.Y.Z`  | ସବୁଦିନ ପାଇଁ       | npm / GitHub Releasesକୁ ପ୍ରକାଶିତ ହୋଇଥିବା ସଠିକ୍ ବିଟ୍ଗୁଡ଼ିକୁ ଚିହ୍ନିତ କରେ       |

ବ୍ରାଞ୍ଚଟି ହେଉଛି କର୍ମଶାଳା; ଟ୍ୟାଗ୍ଟି ହେଉଛି ସିଲ୍ କରାଯାଇଥିବା ପ୍ୟାକେଜ୍। `main`କୁ ସ୍କ୍ୱାଶ୍-ମର୍ଜ୍ କରିବା ପରେ,
ପୂର୍ବ ରିଲିଜ୍ PR ସମାପ୍ତ ହେବା ପାଇଁ ଅପେକ୍ଷା ନକରି ପରବର୍ତ୍ତୀ ଚକ୍ର `release/vX+1`ରେ ଜାରି ରହେ।

## ସମ୍ପର୍କିତ ଡକ୍ୟୁମେଣ୍ଟ

- [CONTRIBUTING.md](../../CONTRIBUTING.md) — ସେଟଅପ୍, ପରୀକ୍ଷା, PR ଯାଞ୍ଚତାଲିକା
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — ପ୍ରକାଶନ-ପୂର୍ବ ବୈଧତା ଯାଞ୍ଚ
- [MERGE_TRAIN.md](./MERGE_TRAIN.md) — ମର୍ଜ୍ କ୍ୟୁ ଏବଂ ଫଲ୍ବ୍ୟାକ୍ ଟ୍ରେନ୍
- [RELEASE_GREEN.md](./RELEASE_GREEN.md) — ରିଲିଜ୍ ଟିପ୍କୁ ସବୁଜ ରଖିବା
