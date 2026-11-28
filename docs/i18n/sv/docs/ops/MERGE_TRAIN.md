# Merge Queue & Manual Merge-Train Runbook (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Landar på en släppgren

Omni-kön styr landningar i `release/vX.Y.Z`. Läs toppnivån `mode` i `config/merge-queue/config.json` på standardgrenen innan du landar en PR. Se [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** kör validering och lämnar landning till en manuell sammanslagning. Applicera `omni-queue` på den godkända PR :en vid dess slutliga huvud. Kontrollera behörighet med `npm run queue -- why <PR>`. Vänta på domen för det huvudet i `npm run queue -- history --base <branch>`. Fortsätt på `would-land`. På `culprit-found` eller `would-dequeue` håller du sammanfogningen och åtgärdar orsaken.
- **Skuggundantag.** Ett tåg med grön full CI mot den aktuella basspetsen kan fortsätta utan en separat ködom. Samma undantag gäller när PR huvudet redan innehåller den aktuella basspetsen.
- **`live`** använder `omni-queue` etiketten för att utlösa landning. Enbart kön landar PR. Lämna sammanslagningskommandon och direkt push till kön.

Varje landning kräver ägarens tillstånd och tillämpliga kontroller. Applicera `omni-queue` först efter att ägaren har godkänt landning. Köad PRs som rör skyddade vägar kräver också ägarens `protected-approved` beslut för den PR.

Regeluppsättningen "Kräv gröna grindar på den aktiva utgåvan" kräver grön `Gate / CI` och `Gate / Quality` på huvudet. Använd aldrig `--admin` för att kringgå en röd grind. Ett frigörande frysblock smälter samman i den frusna grenen. Se [hård regel 21](HARD_RULES_DETAIL.md). Märk, sammanfoga eller tryck aldrig till en pull-begäran att en annan session fungerar. Se [hård regel 22](HARD_RULES_DETAIL.md).

## Begäran om tågdragning

1. Starta en tåggren vid den aktuella frigöringsbasspetsen. Integrera de exakta godkända medlemshuvudena med merge commits. Bevara deras engagemanghistoria genom att undvika squash och rebase.
2. Öppna en pull-förfrågan för tåggrenen. Validera den PR med sin egen fullständiga CI på den aktuella basspetsen. Kontrollera igen basspetsen och de godkända medlemshuvudena innan landning. Uppdatera tåget och dess CI när den validerade kandidaten ändras.
3. Landa tåget PR med en merge commit i tillämpligt köläge. I live-läge bevarar köns `merge-ff` landningsmetod sammanslagningsbekräftelserna. De ursprungliga medlemshuvudena blir nåbara från frigöringsgrenen. GitHub markerar medlemmen PRs som sammanfogad och commits behåller sina författare.

Ett offentligt exempel är [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Den kombinerade 18 medlemmar PRs och landade med ett sammanslagningsåtagande 2026-11-24.

En sync-back från `main` till nästa release-gren landar också genom en merge-commit. Att bevara `main` -anor krävs för senare synkroniseringar. Se [Isolering av arbetsträd](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Den lokala sammanslagnings-tågsvalideraren

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validatorn hämtar bas- och PR huvudena och kombinerar dem i ett engångsarbetsträd. Den kör sin paritetssvit en gång på det resulterande trädet. En misslyckad head-hämtnings- eller sammanfogningskonflikt matar ut den PR och skriptet fortsätter med återstående PRs.

- **`--plan`** skriver ut det valda lägets steg och avslutar utan att skapa ett arbetsträd eller kontakta fjärrkontrollen. Kombinera den med `--fast` för att inspektera den snabba planen.
- **`--fast`** kör de vanliga statiska grindarna, de valda ändrade `node:test` filerna under `tests/unit/` och `npm run test:vitest`. Kör en fullständig lokal validering minst en gång om dagen på den ackumulerade spetsen när du använder snabbläge.
- **Fullt läge** lägger till de fullständiga statiska grindarna och kör `npm run test:unit` och `npm run test:vitest`.

En felaktig statisk gate körs om på den orörda basen om bassonden är tillgänglig. Skriptet rapporterar nedärvda misslyckanden och fortsätter när varje identifierad överträdelserad också visas på basen och det totala antalet inte har ökat.

| Utgång | Menande                                                                                                                           |
| ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `0`    | Skrivit ut planen eller slutförde sviten. Svitsammanfattningen listar eventuella ärvda statiska fel och utmatade PRs.             |
| `1`    | Ogiltiga argument, ingen Git-utcheckning, misslyckad preflight eller ingen PR ombord.                                             |
| `2`    | En svitcheck misslyckades och kvalificerade sig inte som ärvd. Operatören kan dela partiet, mata ut den felande PR och köra igen. |

Ett lokalt pass tillhandahåller endast diagnostiska bevis för ägarens underlag. Varje landning kräver fortfarande ägartillstånd, sina egna nödvändiga kontroller och skuggködomen när så är tillämpligt.

## Tiering

- **Per PR.** CI och kvalitetskontroller baserat på de ändrade sökvägarna. Code PRs kör snabba kvalitetsgrindar och påverkade tester, med separata enhets- och Vitest -jobb i CI.
- **Per kökandidat.** CI och Quality kör hela profilen för den sammansatta kandidaten på dess köref.
- **Per släppspets.** Release-Green kör snabba hårda grindar på pushar som matchar dess vägfilter. Tre schemalagda körningar per dag använder full svep för releasegrenen.
- **Per release.** Den fullständiga CI matrisen inkluderar E2E skärvor, paketvalidering, tarball boot smoke och täckningskontroller. Se [releasechecklistan](RELEASE_CHECKLIST.md).

## Färska utcheckningsförutsättningar för `merge-train.sh`

Preflighten körs innan arbetsträd skapas. Installera beroenden med `npm ci`. Bekräfta att `node_modules/.bin/tsc` är körbart och att `node_modules/node_modules` saknas. Kontrollera att `node_modules/.bin/bun --version` lyckas.

Om efterinstallationen av Bun hoppades över, kör `(cd node_modules/bun && node install.js)`. Providerns konsistens och kontroller av kända symboler använder Bun. Validatorn kör `npm run check:cycles:ratchet` som en blockerande grind. Det fristående `npm run check:cycles` kommandot är rådgivande.

## Historia

Mergify-kön togs bort 2026-11-19.
