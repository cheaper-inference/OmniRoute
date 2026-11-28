# Merge Queue & Manual Merge-Train Runbook (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Maandumine vabastusharule

Kogu järjekord reguleerib `release/vX.Y.Z` maandumisi. Enne PR maandumist lugege vaikeharu `config/merge-queue/config.json` ülataseme `mode`. Vaadake jaotist [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** käivitab valideerimise ja jätab maandumise käsitsi ühendamisele. Rakendage `omni-queue` kinnitatud PR -le selle viimases otsas. Kontrollige sobivust `npm run queue -- why <PR>` abil. Oodake selle pea kohta otsust `npm run queue -- history --base <branch>`'s. Jätkake `would-land`. `culprit-found` või `would-dequeue` puhul hoidke liitmist ja kõrvaldage põhjus.
- **Varjude erandid.** Rohelise täis CI -ga rong praeguse baasotsa vastu võib edasi sõita ilma eraldi järjekorraotsuseta. Sama erand kehtib ka siis, kui PR pea sisaldab juba praegust alusotsakut.
- **`live`** kasutab maandumise käivitamiseks silti `omni-queue`. Järjekord üksi maandub PR. Jätke ühendamiskäsud ja suunake tõuke järjekorda.

Iga maandumine nõuab omaniku luba ja asjakohast nõutavat kontrolli. Kandke `omni-queue` peale alles pärast seda, kui omanik on maandumiseks loa andnud. Järjekorras PRs mis puudutab kaitstud teid, nõuab ka selle PR omaniku `protected-approved` otsust.

Reeglikomplekt "Nõua aktiivsel vabastamisel rohelisi väravaid" nõuab peas rohelist `Gate / CI` ja `Gate / Quality`. Ärge kunagi kasutage `--admin` et punasest väravast mööda minna. Vabastavad külmutusplokid sulanduvad külmutatud haruga. Vaata [kõva reeglit 21](HARD_RULES_DETAIL.md). Ärge kunagi sildistage, ühendage ega suruge tõmbetaotlusele, et mõni teine seanss töötab. Vaata [kõva reeglit 22](HARD_RULES_DETAIL.md).

## Rongi tõmbamise taotlus

1. Käivitage rongi haru praeguse vabastusaluse otsast. Integreerige täpsed kinnitatud liikmepead, kasutades liitmiskohustusi. Säilitage nende kohustuste ajalugu, vältides squashi ja rebase'i.
2. Avage üks tõmbetaotlus rongiharu jaoks. Kinnitage see PR oma täieliku CI praegusel baasotsal. Enne maandumist kontrollige uuesti aluse otsa ja heakskiidetud osade päid. Kui valideeritud kandidaat muutub, värskendage rongi ja selle CI.
3. Maandage rong PR koos liitmiskohustusega kehtivas järjekorrarežiimis. Reaalajas režiimis säilitab järjekorra `merge-ff` maandumismeetod liitmiskohustused. Algsed liikmepead muutuvad vabastusharust ligipääsetavaks. GitHub märgib liikme PRs liidetuks ja kohustuste autorid jäävad alles.

Avalik näide on [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). See ühendas 18 liiget PRs ja saavutati ühinemiskohustusega 24.11.2026.

Sünkroonimine `main` -lt järgmisele väljalaskeharule toimub samuti ühendamise kaudu. Hilisemate sünkroonimiste jaoks on vaja säilitada `main` esivanemad. Vt [Tööpuu isoleerimine](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Kohalik ühendamise-rongi validaator

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validaator tõmbab aluse ja PR -pead ning ühendab need ühekordseks tööpuuks. See käivitab saadud puul oma pariteedikomplekti üks kord. Ebaõnnestunud peatoomise või ühendamise konflikt väljutab selle PR ja skript jätkab ülejäänud PRs.

- **`--plan`** prindib valitud režiimi sammud ja väljub tööpuud loomata või kaugjuhtimispuldiga ühendust võtmata. Kiirplaani kontrollimiseks ühendage see `--fast` ga.
- **`--fast`** käitab ühiseid staatilisi väravaid, valitud muudetud `node:test` faile `tests/unit/` all ja `npm run test:vitest`. Kiirrežiimi kasutamisel käivitage kogunenud jootraha täielik kohalik valideerimine vähemalt kord päevas.
- **Täisrežiim** lisab ainult täisväärtuslikud staatilised väravad ja käivitab `npm run test:unit` ja `npm run test:vitest`.

Rike staatiline värav käivitatakse puutumata alusel uuesti, kui baassond on saadaval. Skript teatab päritud tõrgetest ja jätkab, kui iga tuvastatud rikkumise rida kuvatakse ka alusele ja koguarv ei ole kasvanud.

| Välju | Tähendus                                                                                                                                          |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`   | Printis plaani või lõpetas komplekti. Komplekti kokkuvõte loetleb kõik päritud staatilised tõrked ja väljutatud PRs.                              |
| `1`   | Kehtetud argumendid, Git Checkout puudub, eelkontroll ebaõnnestus või PR pole sisse lülitatud.                                                    |
| `2`   | Komplekti kontroll ebaõnnestus ja seda ei kvalifitseerunud päritavaks. Operaator saab partii poolitada, rikkuva PR väljutada ja uuesti käivitada. |

Kohalik pass pakub diagnostilisi tõendeid ainult omaniku toimiku jaoks. Iga maandumine nõuab endiselt omaniku luba, oma nõutud kontrolle ja vajaduse korral varijärjekorra otsust.

## Tasandumine

- **PR kohta.** CI ja kvaliteedivaliku kontrollid muudetud teede põhjal. Kood PRs käivitab kiireid kvaliteediväravaid ja mõjutatud teste, eraldi üksuse ja Vitest töödega CI.
- **Järjekorra kandidaadi kohta.** CI ja Quality käitavad koostatud kandidaadi täielikku profiili oma viitejärjekorras.
- **Vabastamise näpunäide.** Release-Green käivitab tõugetel kiired kõvad väravad, mis vastavad selle teefiltritele. Kolm ajastatud käitamist päevas kasutavad väljalaskeharu täielikku pühkimist.
- **Väljalaske kohta.** Täielik CI maatriks sisaldab E2E -kilde, paketi valideerimist, tarballi alglaadimissuitsu ja leviala kontrolle. Vaadake [vabastamise kontrollnimekirja](RELEASE_CHECKLIST.md).

## Värske väljaregistreerimise eeldused `merge-train.sh` jaoks

Enne tööpuude loomist toimub eelproov. Paigaldage sõltuvused `npm ci` abil. Veenduge, et `node_modules/.bin/tsc` on käivitatav ja `node_modules/node_modules` puudub. Kontrollige, kas `node_modules/.bin/bun --version` õnnestub.

Kui Bun järelinstall jäeti vahele, käivitage `(cd node_modules/bun && node install.js)`. Pakkuja järjepidevuse ja tuntud sümbolite kontrollimisel kasutatakse Bun. Validaator käivitab blokeeriva väravana `npm run check:cycles:ratchet`. Eraldiseisev `npm run check:cycles` käsk on soovituslik.

## Ajalugu

Mergify liitmisjärjekord suleti 2026-11-19.
