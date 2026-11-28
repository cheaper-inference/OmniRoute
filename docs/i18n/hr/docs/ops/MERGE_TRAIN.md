# Merge Queue & Manual Merge-Train Runbook (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Slijetanje na granu za oslobađanje

Omni-queue upravlja slijetanjem u `release/vX.Y.Z`. Pročitajte `mode` najviše razine u `config/merge-queue/config.json` na zadanoj grani prije dohvaćanja PR. Pogledajte [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** pokreće provjeru valjanosti i prepušta slijetanje ručnom spajanju. Primijenite `omni-queue` na odobreni PR na njegovoj konačnoj glavi. Provjerite ispunjavanje uvjeta sa `npm run queue -- why <PR>`. Čekaj presudu za tu glavu u `npm run queue -- history --base <branch>`. Nastavi na `would-land`. Na `culprit-found` ili `would-dequeue` držite spajanje i popravite uzrok.
- **Izuzeci u sjeni.** Vlak sa zelenim punim CI protiv trenutnog osnovnog vrha može nastaviti bez zasebne presude o čekanju. Ista iznimka vrijedi kada PR glava već sadrži trenutni osnovni vrh.
- **`live`** koristi oznaku `omni-queue` za pokretanje slijetanja. Sam red čekanja spušta PR. Ostavite naredbe spajanja i izravna guranja u red čekanja.

Svako slijetanje zahtijeva odobrenje vlasnika i odgovarajuće potrebne provjere. Primijenite `omni-queue` tek nakon što je vlasnik odobrio slijetanje. PRs u redu čekanja koji dodiruje zaštićene staze također zahtijeva `protected-approved` odluku vlasnika za taj PR.

Skup pravila "Zahtijevaj zelena vrata na aktivnom izdanju" zahtijeva zelene `Gate / CI` i `Gate / Quality` na glavi. Nikada nemojte koristiti `--admin` za zaobilaženje crvenih vrata. Blokovi zamrzavanja izdanja spajaju se u smrznutu granu. Vidi [Čvrsto pravilo 21](HARD_RULES_DETAIL.md). Nikada nemojte označavati, spajati ili gurati na zahtjev za povlačenjem da druga sesija radi. Vidi [Čvrsto pravilo 22](HARD_RULES_DETAIL.md).

## Zahtjev za povlačenje vlaka

1. Započni granu vlaka na trenutnom vrhu baze izdanja. Integrirajte točne odobrene glave članova korištenjem obveza spajanja. Sačuvajte njihovu povijest predaja izbjegavajući squash i rebase.
2. Otvorite jedan zahtjev za povlačenje za granu vlaka. Potvrdite taj PR s vlastitim punim CI na trenutnom vrhu baze. Ponovno provjerite vrh baze i odobrene glave članova prije slijetanja. Osvježite vlak i njegov CI kada se validirani kandidat promijeni.
3. Spustite vlak PR s predajom spajanja u primjenjivom načinu čekanja. U načinu rada uživo, `merge-ff` metoda slijetanja reda čekanja čuva predaje spajanja. Izvorne glave članova postaju dostupne iz grane izdanja. GitHub označava člana PRs kao spojenog i urezivanja zadržavaju svoje autore.

Javni primjer je [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Kombinirao je 18 članova PRs i završio s obvezom spajanja 2026-11-24.

Povratak sinkronizacije sa `main` na sljedeću granu izdanja također dolazi kroz predaju spajanja. Očuvanje `main` porijekla potrebno je za kasnije sinkronizacije. Pogledajte [Izolacija radnog stabla](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Lokalni validator niza spajanja

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validator dohvaća bazu i PR glave i kombinira ih u jednokratno radno stablo. Jednom pokreće svoj paritetni paket na rezultirajućem stablu. Neuspjelo dohvaćanje glave ili sukob spajanja izbacuje taj PR i skripta nastavlja s preostalim PRs.

- **`--plan`** ispisuje korake odabranog načina rada i izlazi bez stvaranja radnog stabla ili kontaktiranja daljinskog upravljača. Kombinirajte ga sa `--fast` da provjerite brzi plan.
- **`--fast`** pokreće uobičajena statička vrata, odabrane promijenjene `node:test` datoteke pod `tests/unit/` i `npm run test:vitest`. Pokrenite punu lokalnu provjeru najmanje jednom dnevno na akumuliranoj napojnici kada koristite brzi način.
- **Puni način rada** dodaje puna samo statička vrata i pokreće `npm run test:unit` i `npm run test:vitest`.

Neispravna statička vrata ponovno se izvode na netaknutoj bazi ako je sonda baze dostupna. Skripta izvješćuje o naslijeđenim pogreškama i nastavlja kada se svaki prepoznati redak kršenja također pojavi u bazi, a ukupni broj nije porastao.

| Izlaz | Značenje                                                                                                                                               |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `0`   | Ispisao plan ili dovršio komplet. Sažetak paketa navodi sve naslijeđene statičke greške i izbačene PRs.                                                |
| `1`   | Nevažeći argumenti, nema Git checkout-a, neuspješna pretprovjera ili PR nije upisan.                                                                   |
| `2`   | Provjera paketa nije uspjela i nije se kvalificirala kao naslijeđena. Operater može prepoloviti seriju, izbaciti problematični PR i ponovno pokrenuti. |

Lokalna propusnica pruža dijagnostičke dokaze samo za vlasnički dosje. Svako slijetanje i dalje zahtijeva autorizaciju vlasnika, vlastite potrebne provjere i odluku čekanja u sjeni kada je primjenjivo.

## Razina

- **Po PR.** CI i provjere odabira kvalitete na temelju promijenjenih putanja. Kod PRs pokreće brza vrata kvalitete i utjecajne testove, s odvojenim jedinicama i Vitest poslovima u CI.
- **Po kandidatu u redu.** CI i Quality pokreću puni profil za sastavljenog kandidata na njegovom redu čekanja ref.
- **Po savjetu za izdavanje.** Release-Green pokreće brza tvrda vrata na guranja koja odgovaraju njegovim filtrima putanje. Tri planirana izvođenja po danu koriste puni pregled za granu izdanja.
- **Po izdanju.** Potpuna CI matrica uključuje E2E šardove, provjeru valjanosti paketa, tarball boot smoke i provjere pokrivenosti. Pogledajte [Kontrolni popis izdanja](RELEASE_CHECKLIST.md).

## Preduvjeti za novu naplatu za `merge-train.sh`

Pretprovjera se izvodi prije stvaranja radnih stabala. Instalirajte ovisnosti sa `npm ci`. Potvrdite da je `node_modules/.bin/tsc` izvršni i da `node_modules/node_modules` ne postoji. Provjerite je li `node_modules/.bin/bun --version` uspio.

Ako je postinstalacija Bun preskočena, pokrenite `(cd node_modules/bun && node install.js)`. Dosljednost pružatelja i provjere poznatih simbola koriste Bun. Validator pokreće `npm run check:cycles:ratchet` kao blokirajuća vrata. Samostalna naredba `npm run check:cycles` je savjetodavna.

## Povijest

Red čekanja za spajanje Mergifyja povučen je 19. studenoga 2026.
