# Merge Queue & Manual Merge-Train Runbook (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Slijetanje na granu za oslobađanje

Omni-red upravlja slijetanjima u `release/vX.Y.Z`. Pročitajte `mode` najvišeg nivoa u `config/merge-queue/config.json` na zadanoj grani prije nego što slijete PR. Pogledajte [Omni-Red](OMNI_QUEUE.md).

- **`shadow`** pokreće provjeru valjanosti i prepušta slijetanje ručnom spajanju. Nanesite `omni-queue` na odobreni PR na njegovom konačnom vrhu. Provjerite podobnost sa `npm run queue -- why <PR>`. Čekajte presudu za tu glavu u `npm run queue -- history --base <branch>`. Nastavite na `would-land`. Na `culprit-found` ili `would-dequeue` držite stapanje i popravite uzrok.
- **Izuzeci u sjeni.** Voz sa zelenim punim CI u odnosu na trenutni osnovni vrh može nastaviti bez posebne presude u redu čekanja. Isti izuzetak se primjenjuje kada PR glava već sadrži trenutni osnovni vrh.
- **`live`** koristi `omni-queue` oznaku za pokretanje slijetanja. Sam red slijeće PR. Ostavite komande za spajanje i direktna guranja u red čekanja.

Za svako slijetanje potrebno je ovlaštenje vlasnika i odgovarajuće provjere. Primijenite `omni-queue` tek nakon što je vlasnik odobrio slijetanje. PRs u redu koji dodiruje zaštićene staze također zahtijeva `protected-approved` odluku vlasnika za taj PR.

Skup pravila "Zahtijevajte zelene kapije na aktivnom izdanju" zahtijeva zelene `Gate / CI` i `Gate / Quality` na glavi. Nikada nemojte koristiti `--admin` da zaobiđete crvenu kapiju. Zamrznuti blokovi se spajaju u zamrznutu granu. Vidite [tvrdo pravilo 21](HARD_RULES_DETAIL.md). Nikada nemojte označavati, spajati ili gurati zahtjev za povlačenjem da druga sesija radi. Vidi [Tvrdo pravilo 22](HARD_RULES_DETAIL.md).

## Zahtev za povlačenje voza

1. Započnite granu vlaka na vrhu trenutnog izdanja. Integrirajte točno odobrene glave članova koristeći spajanje urezivanja. Sačuvajte njihovu historiju urezivanja izbjegavajući squash i rebase.
2. Otvorite jedan zahtjev za povlačenje za granu vlaka. Potvrdite taj PR s vlastitim punim CI na trenutnoj bazi. Ponovo provjerite vrh baze i odobrene glave članova prije slijetanja. Osvježite voz i njegov CI kada se potvrđeni kandidat promijeni.
3. Slijedite vlak PR sa spajanjem urezivanja pod primjenjivim načinom čekanja. U načinu rada uživo, `merge-ff` metoda slijetanja reda čuva urezivanja spajanja. Originalne glave članova postaju dostupne iz grane izdanja. GitHub označava člana PRs kao spojenog i urezivanja zadržavaju svoje autore.

Javni primjer je [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Kombinirao je PRs od 18 članova i sletio sa spajanjem 24.11.2026.

Sinhronizacija nazad sa `main` na sljedeću granu izdanja također dolazi kroz urezivanje spajanja. Očuvanje `main` porijekla je potrebno za kasnije sinkroniziranje. Pogledajte [Izolacija radnog stabla](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Lokalni validator stapanja

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validator dohvaća osnovne i PR glave i kombinuje ih u jednokratno radno stablo. Pokreće svoj paritetni paket jednom na rezultujućem stablu. Neuspješno preuzimanje glave ili konflikt spajanja izbacuje taj PR i skripta nastavlja s preostalim PRs.

- **`--plan`** ispisuje korake odabranog načina rada i izlazi bez kreiranja radnog stabla ili kontaktiranja daljinskog upravljača. Kombinirajte ga sa `--fast` da biste pregledali brzi plan.
- **`--fast`** pokreće uobičajene statičke kapije, odabrane promijenjene `node:test` datoteke pod `tests/unit/` i `npm run test:vitest`. Pokrenite punu lokalnu provjeru barem jednom dnevno na akumuliranom savjetu kada koristite brzi način rada.
- **Pun način rada** dodaje potpuno samo statičke kapije i pokreće `npm run test:unit` i `npm run test:vitest`.

Neispravna statička kapija se ponovo pokreće na netaknutoj bazi ako je sonda baze dostupna. Skripta izvještava o naslijeđenim greškama i nastavlja se kada se svaka prepoznata linija prekršaja također pojavi na bazi i ukupan broj nije porastao.

| Izađi | Značenje                                                                                                                                                  |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`   | Odštampali plan ili kompletirali paket. Sažetak paketa navodi sve naslijeđene statičke greške i izbačeni PRs.                                             |
| `1`   | Nevažeći argumenti, nema odjavljivanja Git-a, neuspješan preflight ili PR nije uključen.                                                                  |
| `2`   | Provjera paketa nije uspjela i nije se kvalificirala kao naslijeđena. Operator može prepoloviti seriju, izbaciti PR koji je uvredljiv i ponovo pokrenuti. |

Lokalna propusnica daje dijagnostičke dokaze samo za dosije vlasnika. Za svako slijetanje i dalje je potrebno ovlaštenje vlasnika, vlastite potrebne provjere i odluka o redu čekanja u sjeni kada je primjenjivo.

## Tiering

- **Per PR.** CI i kvaliteta odabira provjere na osnovu promijenjenih staza. Code PRs pokreće brze kapije kvaliteta i testiranja sa uticajem, sa odvojenim jedinicama i Vitest poslovima u CI.
- **Po kandidatu u redu.** CI i Quality pokreću puni profil za sastavljenog kandidata na njegovom redu čekanja ref.
- **Po savjetu za otpuštanje.** Release-Green pokreće brze čvrste kapije na pushove koji odgovaraju njegovim filterima putanje. Tri planirana izvođenja dnevno koriste puni pregled za granu izdanja.
- **Po izdanju.** Potpuna CI matrica uključuje E2E fragmente, validaciju paketa, tarball boot dim i provjere pokrivenosti. Pogledajte [kontrolnu listu izdanja](RELEASE_CHECKLIST.md).

## Preduvjeti za svježu odjavu za `merge-train.sh`

Preflight se izvodi prije kreiranja stabala rada. Instalirajte zavisnosti sa `npm ci`. Potvrdite da je `node_modules/.bin/tsc` izvršan i da je `node_modules/node_modules` odsutan. Provjerite je li `node_modules/.bin/bun --version` uspješan.

Ako je Bun postinstall preskočena, pokrenite `(cd node_modules/bun && node install.js)`. Dosljednost dobavljača i provjere poznatih simbola koriste Bun. Validator pokreće `npm run check:cycles:ratchet` kao kapiju za blokiranje. Samostalna naredba `npm run check:cycles` je savjetodavna.

## Istorija

Red spajanja spajanja je povučen 19.11.2026.
