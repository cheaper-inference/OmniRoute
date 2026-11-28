# Merge Queue & Manual Merge-Train Runbook (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Leszállás egy elengedő ágon

Az omni-queue szabályozza `release/vX.Y.Z` való leszállást. Olvassa el a legfelső szintű `mode` `config/merge-queue/config.json` -ben az alapértelmezett ágon, mielőtt a PR leállítaná. Lásd: [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** lefuttatja az érvényesítést, és a leszállást kézi egyesítésre hagyja. Alkalmazza `omni-queue` a jóváhagyott PR a végső fejénél. Ellenőrizze a jogosultságot `npm run queue -- why <PR>` segítségével. Várd meg az ítéletet annak a fejnek a `npm run queue -- history --base <branch>`. Folytassa a `would-land`. `culprit-found` vagy `would-dequeue` billentyűn tartsa lenyomva az egyesítést, és javítsa ki az okot.
- **Árnyék kivételek.** A jelenlegi alapcsúcs ellen zöld full CI rendelkező vonat külön soros ítélet nélkül is továbbhaladhat. Ugyanez a kivétel akkor érvényes, ha a PR fej már tartalmazza az aktuális alapcsúcsot.
- **`live`** a `omni-queue` címkét használja a landolás kiváltására. A PR egyedül a sor hozza létre. Hagyja az egyesítési parancsokat és a leküldéseket a sorba irányítsa.

Minden leszálláshoz a tulajdonos engedélye és a szükséges ellenőrzések szükségesek. Csak akkor alkalmazza `omni-queue`, ha a tulajdonos engedélyezte a leszállást. A védett útvonalakat érintő sorban álló PRs esetén a tulajdonos `protected-approved` döntése is szükséges az adott PR.

A "Zöld kapuk megkövetelése az aktív kiadásnál" szabálykészlethez zöld `Gate / CI` és `Gate / Quality` szükséges a fejen. Soha ne használja `--admin` a piros kapu megkerülésére. A kioldó fagyblokkok egyesülnek a fagyott ágba. Lásd [a 21. kemény szabályt](HARD_RULES_DETAIL.md). Soha ne címkézze, egyesítse vagy küldje le lekérésre, hogy egy másik munkamenet működik. Lásd [a 22. kemény szabályt](HARD_RULES_DETAIL.md).

## A vonat vontatási kérelme

1. Indítson el egy vonatágat az aktuális kioldó alapcsúcsnál. Integrálja a pontos jóváhagyott tagfejeket egyesítési véglegesítésekkel. Őrizze meg az elkövetési előzményeket azáltal, hogy kerüli a squash-t és a visszaesést.
2. Nyisson meg egy lehívási kérelmet a vonatághoz. Érvényesítse ezt a PR a saját teljes CI jével az aktuális alapcsúcson. Leszállás előtt ellenőrizze újra az alapcsúcsot és a jóváhagyott tagfejeket. Frissítse a vonatot és annak CI, amikor az érvényesített jelölt megváltozik.
3. Tegye le a vonatot PR összevonási kötelezettséggel a vonatkozó várakozási módban. Élő módban a sor `merge-ff` landing metódusa megőrzi az egyesítési véglegesítéseket. Az eredeti tagfejek elérhetővé válnak a kioldó ágból. GitHub a PRs tagot egyesítettként jelöli meg, és a véglegesítések megtartják szerzőiket.

Nyilvános példa a [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). A 18 tagú PRs egyesítette, és 2026-11-24-én egy egyesülési kötelezettségvállalással kötött ki.

A szinkronizálás `main` ról a következő kiadási ágra szintén egy összevonási véglegesítésen keresztül történik. `main` felmenőinek megőrzése szükséges a későbbi szinkronizáláshoz. Lásd: [Munkafa elkülönítése](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## A helyi egyesítés-vonat érvényesítő

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

A validátor lekéri az alapot és PR fejeket, és egy eldobható munkafában egyesíti őket. Egyszer lefuttatja a paritáskészletét a kapott fán. A sikertelen fejlekérés vagy egyesítési ütközés kidobja a PR, és a szkript a fennmaradó PRs vel folytatódik.

- **`--plan`** kinyomtatja a kiválasztott mód lépéseit és kilép anélkül, hogy munkafát hozna létre vagy a távirányítóval kapcsolatba lépne. Kombinálja `--fast` vel a gyors terv ellenőrzéséhez.
- **`--fast`** futtatja a közös statikus kapukat, a kiválasztott módosított `node:test` fájlokat `tests/unit/` és `npm run test:vitest` alatt. Gyors mód használatakor futtasson legalább naponta egyszer egy teljes helyi ellenőrzést a felhalmozott tippen.
- **Teljes mód** hozzáadja a csak teljesen statikus kapukat, és futtatja `npm run test:unit` és `npm run test:vitest`.

A meghibásodott statikus kapu újrafuttatása az érintetlen alapon, ha az alapszonda elérhető. A szkript jelenti az örökölt hibákat, és akkor folytatja, ha minden felismert szabálysértési sor megjelenik az alapon, és a teljes szám nem nőtt.

| Kijárat | Jelentése                                                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`     | Kinyomtatta a tervet vagy befejezte a csomagot. A csomag összefoglalója felsorolja az örökölt statikus hibákat és a kidobott PRs.               |
| `1`     | Érvénytelen argumentumok, nincs Git checkout, sikertelen elővizsgálat, vagy nincs PR beszállás.                                                 |
| `2`     | Egy csomagellenőrzés sikertelen volt, és nem minősül örököltnek. Az operátor feloszthatja a köteget, kiadhatja a sértő PR, és újra futtathatja. |

A helyi igazolvány csak a tulajdonos dossziéjához nyújt diagnosztikai bizonyítékot. Minden leszálláshoz továbbra is szükség van a tulajdonos engedélyére, a saját kötelező ellenőrzésekre, és adott esetben a shadow queue ítéletére.

## Szintezés

- **Per PR.** CI és a minőségkiválasztás a megváltozott útvonalak alapján ellenőrzi. A Code PRs gyors minőségi kapukat és hatásteszteket futtat, külön egység és Vitest feladatokkal CI ben.
- **Soronkénti jelöltenként.** CI és a Quality lefuttatja a teljes profilt az összeállított jelölt számára a ref. sorában.
- **Kiadási tipp szerint.** A Release-Green gyors, kemény kaput futtat olyan lökések esetén, amelyek megfelelnek az útvonalszűrőinek. Napi három ütemezett futtatás használja a teljes sweepet a kiadási ághoz.
- **Kiadásonként.** A teljes CI mátrix tartalmazza E2E szilánkokat, a csomag érvényesítését, a tarball rendszerindítási füstöt és a lefedettség ellenőrzését. Lásd a [Kiadási ellenőrzőlistát](RELEASE_CHECKLIST.md).

## Friss kijelentkezés előfeltételei `merge-train.sh`-hoz

Az elővizsgálat lefut a munkafák létrehozása előtt. Függőségek telepítése `npm ci` segítségével. Győződjön meg arról, hogy `node_modules/.bin/tsc` végrehajtható, és a `node_modules/node_modules` hiányzik. Ellenőrizze, hogy `node_modules/.bin/bun --version` sikeres-e.

Ha a Bun utólagos telepítése kimaradt, futtassa `(cd node_modules/bun && node install.js)` parancsot. A szolgáltatói konzisztencia és az ismert szimbólumok ellenőrzése Bun használja. Az érvényesítő `npm run check:cycles:ratchet` blokkoló kapuként futtatja. Az önálló `npm run check:cycles` parancs tanácsadó jellegű.

## Történelem

Az Mergify egyesítési várólista 2026-11-19-én megszűnt.
