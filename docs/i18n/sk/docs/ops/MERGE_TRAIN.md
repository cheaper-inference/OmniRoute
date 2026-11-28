# Merge Queue & Manual Merge-Train Runbook (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Pristátie na uvoľňovacej vetve

Všestranný rad riadi pristátia do `release/vX.Y.Z`. Pred pristátím PR si prečítajte `mode` najvyššej úrovne v `config/merge-queue/config.json` na predvolenej vetve. Pozrite si [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** spustí validáciu a ponechá pristátie na manuálne zlúčenie. Aplikujte `omni-queue` na schválený PR na jeho poslednej hlave. Skontrolujte oprávnenosť pomocou `npm run queue -- why <PR>`. Počkajte na verdikt pre tú hlavu v `npm run queue -- history --base <branch>`. Pokračujte ďalej `would-land`. Na `culprit-found` alebo `would-dequeue` podržte zlúčenie a opravte príčinu.
- **Tieňové výnimky.** Vlak so zelenou plnou CI proti aktuálnemu základnému tipu môže pokračovať bez samostatného verdiktu v rade. Rovnaká výnimka platí, keď hlava PR už obsahuje aktuálny základný hrot.
- **`live`** používa označenie `omni-queue` na spustenie pristátia. Samotný front pristane PR. Nechajte príkazy na zlúčenie a priame tlačenie do frontu.

Každé pristátie si vyžaduje povolenie majiteľa a príslušné požadované kontroly. Použite `omni-queue` až potom, čo majiteľ povolil pristátie. PRs zaradené do frontu, ktoré sa dotýka chránených ciest, tiež vyžaduje rozhodnutie vlastníka `protected-approved` pre daný PR.

Sada pravidiel „Vyžadovať zelené brány pri aktívnom vydaní“ vyžaduje zelené `Gate / CI` a `Gate / Quality` na hlave. Nikdy nepoužívajte `--admin` na obídenie červenej brány. Bloky zmrazenia uvoľnenia sa zlúčia do zmrazenej vetvy. Pozri [tvrdé pravidlo 21](HARD_RULES_DETAIL.md). Nikdy neoznačujte, nezlučujte ani netlačte na požiadavku na stiahnutie, že funguje iná relácia. Pozri [tvrdé pravidlo 22](HARD_RULES_DETAIL.md).

## Požiadavka na ťahanie vlaku

1. Začnite vetvu vlaku na aktuálnom základnom tipe vydania. Integrujte presne schválené hlavy členov pomocou zlučovacích potvrdení. Zachovajte ich históriu odovzdania tým, že sa vyhnete squashu a rebase.
2. Otvorte jednu požiadavku na stiahnutie pre vlakovú vetvu. Overte, že PR s jeho vlastným úplným CI na aktuálnom základnom tipe. Pred pristátím znova skontrolujte špičku základne a schválené hlavy členov. Obnovte vlak a jeho CI keď sa overený kandidát zmení.
3. Pristavte vlak PR pomocou zlučovacieho potvrdenia v príslušnom režime frontu. V živom režime metóda pristátia `merge-ff` vo fronte zachováva odovzdania zlúčenia. Hlavy pôvodných členov budú dosiahnuteľné z uvoľňovacej vetvy. GitHub označí člena PRs ako zlúčeného a commity si ponechajú svojich autorov.

Verejným príkladom je [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Kombinovalo 18 členov PRs a pristálo so zlúčením 24. 11. 2026.

Spätná synchronizácia zo `main` do ďalšej vetvy vydania sa tiež uskutoční prostredníctvom odovzdania zlúčenia. Pre neskoršie spätné synchronizácie je potrebné zachovať pôvod `main`. Pozrite si [časť Izolácia pracovného stromu](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Lokálny validátor spojenia vlakov

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validátor získa základňu a hlavy PR a skombinuje ich do jednorazového pracovného stromu. Vo výslednom strome raz spustí svoju paritnú sadu. Neúspešné načítanie hlavy alebo konflikt zlučovania vysunie PR a skript pokračuje so zvyšným PRs.

- **`--plan`** vytlačí kroky zvoleného režimu a ukončí sa bez vytvorenia pracovného stromu alebo kontaktovania diaľkového ovládača. Skombinujte ho so `--fast` a skontrolujte rýchly plán.
- **`--fast`** spustí bežné statické brány, vybraté zmenené súbory `node:test` pod `tests/unit/` a `npm run test:vitest`. Pri použití rýchleho režimu spustite úplné lokálne overenie aspoň raz denne na nahromadenom hrote.
- **Plný režim** pridá iba úplné statické brány a spustí `npm run test:unit` a `npm run test:vitest`.

Zlyhajúca statická brána sa znova spustí na nedotknutej základni, ak je k dispozícii základná sonda. Skript hlási zdedené zlyhania a pokračuje, keď sa každý rozpoznaný priestupkový riadok objaví aj na základni a celkový počet sa nezvýšil.

| VÝCHOD | Význam                                                                                                                                        |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`    | Vytlačil plán alebo dokončil apartmán. Súhrn balíka uvádza všetky zdedené statické zlyhania a vysunuté PRs.                                   |
| `1`    | Neplatné argumenty, žiadna platba v systéme Git, neúspešná kontrola pred výstupom alebo nalodenie PR.                                         |
| `2`    | Kontrola balíka zlyhala a nekvalifikovala sa ako zdedené. Operátor môže dávku rozdeliť na polovicu, vysunúť problematické PR a spustiť znova. |

Miestny preukaz poskytuje diagnostický dôkaz len pre dokumentáciu vlastníka. Každé pristátie si stále vyžaduje autorizáciu vlastníka, svoje vlastné požadované kontroly a prípadne verdikt tieňovej fronty.

## Tiering

- **Za PR.** CI a kontroly kvality vyberú na základe zmenených ciest. Kód PRs spúšťa rýchle brány kvality a nárazové testy so samostatnou jednotkou a úlohami Vitest v CI.
- **Kandidát do poradia.** CI a Quality spustia úplný profil pre zloženého kandidáta na jeho fronte ref.
- **Za tip na uvoľnenie.** Release-Green spúšťa rýchle tvrdé brány na tlaky, ktoré zodpovedajú jej cestným filtrom. Tri naplánované spustenia za deň využívajú úplné zametanie pre vetvu vydania.
- **Za vydanie.** Úplná matica CI obsahuje zlomky E2E, overenie balíka, dym z tarballovej obuvi a kontroly pokrytia. Pozrite si [Kontrolný zoznam vydania](RELEASE_CHECKLIST.md).

## Predpoklady novej pokladne pre `merge-train.sh`

Pred vytvorením pracovných stromov sa spustí predbežná kontrola. Nainštalujte závislosti pomocou `npm ci`. Potvrďte, že `node_modules/.bin/tsc` je spustiteľný a že `node_modules/node_modules` chýba. Skontrolujte, či je `node_modules/.bin/bun --version` úspešný.

Ak bola postinštalácia Bun preskočená, spustite `(cd node_modules/bun && node install.js)`. Kontroly konzistencie poskytovateľa a známych symbolov používajú Bun. Validátor spustí `npm run check:cycles:ratchet` ako blokovaciu bránu. Samostatný príkaz `npm run check:cycles` je odporúčaný.

## História

Zlučovací front Mergify bol zrušený 2026-11-19.
