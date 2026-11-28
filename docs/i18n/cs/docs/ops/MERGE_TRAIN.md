# Merge Queue & Manual Merge-Train Runbook (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Přistání na uvolňovací větvi

Všestranná fronta řídí přistání do `release/vX.Y.Z`. Před přistáním PR si přečtěte `mode` nejvyšší úrovně v `config/merge-queue/config.json` na výchozí větvi. Viz [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** spustí ověření a ponechá přistání na ruční sloučení. Aplikujte `omni-queue` na schválený PR na jeho konečné hlavě. Ověřte způsobilost pomocí `npm run queue -- why <PR>`. Počkejte na verdikt pro tu hlavu v `npm run queue -- history --base <branch>`. Pokračujte na `would-land`. Na `culprit-found` nebo `would-dequeue` podržte sloučení a opravte příčinu.
- **Stínové výjimky.** Vlak se zelenou plnou CI proti aktuálnímu základnímu tipu může pokračovat bez samostatného verdiktu ve frontě. Stejná výjimka platí, když hlava PR již obsahuje aktuální základní hrot.
- **`live`** používá označení `omni-queue` ke spuštění přistání. Samotná fronta přistane PR. Nechte slučovací příkazy a přímé push do fronty.

Každé přistání vyžaduje povolení vlastníka a příslušné požadované kontroly. Použijte `omni-queue` až poté, co vlastník povolil přistání. PRs zařazené do fronty, které se dotýkají chráněných cest, také vyžadují rozhodnutí vlastníka `protected-approved` pro toto PR.

Sada pravidel „Vyžadovat zelené brány u aktivního vydání“ vyžaduje zelené `Gate / CI` a `Gate / Quality` na hlavě. Nikdy nepoužívejte `--admin` k obcházení červené brány. Bloky zmrazení uvolnění se spojí do zmrazené větve. Viz [tvrdé pravidlo 21](HARD_RULES_DETAIL.md). Nikdy neoznačujte, neslučujte ani neposouvejte požadavek na stažení, že funguje jiná relace. Viz [tvrdé pravidlo 22](HARD_RULES_DETAIL.md).

## Požadavek na přitažení vlaku

1. Spusťte větev vlaku na aktuálním základním tipu vydání. Integrujte přesně schválené hlavy členů pomocí slučovacích commitů. Zachovejte jejich historii odevzdání tím, že se vyhnete squashi a rebase.
2. Otevřete jeden požadavek na stažení pro větev vlaku. Potvrďte toto PR s jeho vlastním úplným CI na aktuálním základním tipu. Před přistáním znovu zkontrolujte špičku základny a schválené hlavy členů. Obnovte vlak a jeho CI, když se ověřený kandidát změní.
3. Přiložte vlak PR pomocí slučovacího odevzdání v příslušném režimu fronty. V živém režimu zachovává metoda přistání `merge-ff` fronty potvrzení sloučení. Hlavy původních členů budou dosažitelné z uvolňovací větve. GitHub označí člena PRs jako sloučený a odevzdání si ponechá své autory.

Veřejným příkladem je [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Kombinovalo 18 členů PRs a přistálo se sloučením 2026-11-24.

Zpětná synchronizace ze `main` do další větve vydání také skončí prostřednictvím začlenění. Pro pozdější zpětné synchronizace je vyžadováno zachování původu `main`. Viz [Izolace pracovního stromu](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Místní validátor sloučení vlaků

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validátor načte základnu a hlavy PR a zkombinuje je do jednorázového pracovního stromu. Jednou spustí svou paritní sadu na výsledném stromu. Neúspěšné načtení hlavy nebo konflikt sloučení vyřadí PR a skript pokračuje se zbývajícím PRs.

- **`--plan`** vytiskne kroky zvoleného režimu a ukončí se bez vytvoření pracovního stromu nebo kontaktování dálkového ovladače. Zkombinujte jej se `--fast` a prohlédněte si rychlý plán.
- **`--fast`** spouští běžné statické brány, vybrané změněné soubory `node:test` pod `tests/unit/` a `npm run test:vitest`. Při použití rychlého režimu spusťte úplnou místní validaci alespoň jednou denně na nashromážděném hrotu.
- **Plný režim** přidá pouze úplné statické brány a spustí `npm run test:unit` a `npm run test:vitest`.

Selhávající statická brána se znovu spustí na nedotčené základně, pokud je k dispozici sonda základny. Skript hlásí zděděná selhání a pokračuje, když se každý rozpoznaný řádek porušení objeví také na základně a celkový počet se nezvýší.

| Výstup | Význam                                                                                                                                 |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `0`    | Vytiskl plán nebo dokončil sadu. Souhrn sady uvádí všechna zděděná statická selhání a vyřazený PRs.                                    |
| `1`    | Neplatné argumenty, žádná pokladna Git, neúspěšná kontrola před výstupem nebo nalodění PR.                                             |
| `2`    | Kontrola sady se nezdařila a nekvalifikovala se jako zděděná. Operátor může dávku rozpůlit, vysunout problematické PR a spustit znovu. |

Místní průkaz poskytuje diagnostický důkaz pouze pro dokumentaci vlastníka. Každé přistání stále vyžaduje autorizaci vlastníka, vlastní požadované kontroly a případně verdikt stínové fronty.

## Tiering

- **Za PR.** CI a Quality vybírají kontroly na základě změněných cest. Kód PRs spouští rychlé kvalitní brány a impaktované testy se samostatnými jednotkami a úlohami Vitest v CI.
- **Kandidát na frontu.** CI a Quality spustí celý profil složeného kandidáta na jeho frontě ref.
- **Za uvolňovací tip.** Release-Green spouští rychlé tvrdé brány na push, které odpovídají jeho filtrům cest. Tři naplánovaná spuštění za den využívají úplné rozmítání pro větev vydání.
- **Za vydání.** Úplná matice CI zahrnuje úlomky E2E, validaci balíčků, kouř z tarballových bot a kontroly pokrytí. Viz [Kontrolní seznam vydání](RELEASE_CHECKLIST.md).

## Předpoklady nové pokladny pro `merge-train.sh`

Před vytvořením pracovních stromů se spustí kontrola před výstupem. Nainstalujte závislosti pomocí `npm ci`. Potvrďte, že `node_modules/.bin/tsc` je spustitelný a že `node_modules/node_modules` chybí. Zkontrolujte, zda `node_modules/.bin/bun --version` uspěl.

Pokud byla postinstalace Bun přeskočena, spusťte `(cd node_modules/bun && node install.js)`. Kontroly konzistence poskytovatele a známých symbolů používají Bun. Validátor spustí `npm run check:cycles:ratchet` jako blokovací bránu. Samostatný příkaz `npm run check:cycles` je doporučený.

## Dějiny

Slučovací fronta Mergify byla vyřazena 19. 11. 2026.
