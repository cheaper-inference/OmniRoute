# Merge Queue & Manual Merge-Train Runbook (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Laskeutuminen vapautushaaralle

The omni-queue governs landings into `release/vX.Y.Z`. Read the top-level `mode` in `config/merge-queue/config.json` on the default branch before landing a PR. See [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** suorittaa validoinnin ja jättää laskeutumisen manuaaliseen yhdistämiseen. Levitä `omni-queue` hyväksyttyyn PR :hen sen viimeisessä päässä. Tarkista kelpoisuus komennolla `npm run queue -- why <PR>`. Odota tuomiota `npm run queue -- history --base <branch>`-päälle. Jatka `would-land`:llä. Pidä yhdistäminen painettuna `culprit-found` tai `would-dequeue` kohdassa ja korjaa syy.
- **Varjopoikkeukset.** Juna, jolla on vihreä full CI nykyistä pohjakärkeä vasten, voi edetä ilman erillistä jonopäätöstä. Sama poikkeus pätee, kun PR -pää sisältää jo nykyisen pohjakärjen.
- **`live`** käyttää `omni-queue` -tunnistetta laukaisekseen laskeutumisen. Pelkästään jono laskee PR. Jätä yhdistämiskomennot ja suorat työnnät jonoon.

Jokainen laskeutuminen vaatii omistajan luvan ja vaadittavat tarkastukset. Käytä `omni-queue` vasta, kun omistaja on antanut luvan laskeutumiseen. Jonossa oleva PRs joka koskettaa suojattuja polkuja, vaatii myös omistajan `protected-approved` päätöksen kyseiselle PR.

"Vaadi vihreät portit aktiivisessa julkaisussa" -säännöt edellyttävät vihreää `Gate / CI` ja `Gate / Quality` merkkiä päässä. Älä koskaan käytä `--admin` punaisen portin ohittamiseen. Irrotettavat jäädytyslohkot sulautuvat jäätyneeseen haaraan. Katso [kova sääntö 21](HARD_RULES_DETAIL.md). Älä koskaan merkitse, yhdistä tai paina vetopyyntöön, että toinen istunto toimii. Katso [kova sääntö 22](HARD_RULES_DETAIL.md).

## Junan vetopyyntö

1. Aloita junan haara nykyisen vapautuspohjan kärjestä. Integroi tarkat hyväksytyt jäsenpäät yhdistämistoimitusten avulla. Säilytä heidän sitoutumishistoriansa välttämällä squashia ja rebasea.
2. Avaa yksi vetopyyntö junahaaralle. Vahvista tämä PR omalla täydellä CI llä nykyisessä peruskärjessä. Tarkista alustan kärki ja hyväksytyt osat ennen laskeutumista. Päivitä juna ja sen CI kun validoitu ehdokas vaihtuu.
3. Laske juna PR yhdistämissitoumuksella sovellettavaan jonotilaan. Live-tilassa jonon `merge-ff` laskutusmenetelmä säilyttää yhdistämistoimitukset. Alkuperäiset jäsenet ovat tavoitettavissa irrotushaaralta. GitHub merkitsee jäsenen PRs yhdistetyksi ja sitoumukset säilyttävät kirjoittajansa.

Julkinen esimerkki on [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Se yhdisti 18 jäsentä PRs ja saavutti yhdistämissitoumuksen 24.11.2026.

Synkronointi takaisin `main` sta seuraavaan julkaisuhaaraan tapahtuu myös yhdistämistoimituksen kautta. `main` -perinnön säilyttäminen vaaditaan myöhempää synkronointia varten. Katso [Työpuun eristäminen](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Paikallinen yhdistämis-juna-validaattori

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validaattori hakee pohjan ja PR -päät ja yhdistää ne kertakäyttöiseen työpuuhun. Se suorittaa pariteettisarjansa kerran tuloksena olevassa puussa. Epäonnistunut päähaku- tai yhdistämisristiriita poistaa kyseisen PR ja komentosarja jatkuu jäljellä olevalla PRs llä.

- **`--plan`** tulostaa valitun tilan vaiheet ja poistuu luomatta työpuuta tai ottamalla yhteyttä kaukosäätimeen. Yhdistä se `--fast` kanssa tarkistaaksesi nopean suunnitelman.
- **`--fast`** suorittaa yleiset staattiset portit, valitut muutetut `node:test` tiedostot hakemistossa `tests/unit/` ja `npm run test:vitest`. Suorita täydellinen paikallinen vahvistus vähintään kerran päivässä kertyneelle kärjelle, kun käytät pikatilaa.
- **Täysi tila** lisää vain täysin staattiset portit ja suorittaa `npm run test:unit` ja `npm run test:vitest`.

Viallinen staattinen portti ajetaan uudelleen koskemattomalla alustalla, jos perusanturi on käytettävissä. Skripti raportoi perinnöllisistä virheistä ja jatkaa, kun jokainen tunnistettu rikkomusrivi näkyy myös pohjassa ja kokonaismäärä ei ole kasvanut.

| Poistu | Merkitys                                                                                                                              |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `0`    | Tulosti suunnitelman tai viimeisteli sarjan. Sarjan yhteenvedossa luetellaan kaikki periytyneet staattiset viat ja poistetut PRs.     |
| `1`    | Virheelliset argumentit, ei Git checkoutia, epäonnistunut esitarkastus tai ei PR.                                                     |
| `2`    | Sarjan tarkistus epäonnistui, eikä sitä pidetty perinnöllisenä. Käyttäjä voi puolittaa erän, poistaa loukkaavan PR ja ajaa uudelleen. |

Paikallinen passi tarjoaa diagnostisia todisteita vain omistajan asiakirjoista. Jokainen laskeutuminen vaatii edelleen omistajan valtuutuksen, omat vaaditut tarkastukset ja tarvittaessa varjojonon päätöksen.

## Tasoitus

- **per PR.** CI ja Quality Select -tarkistukset muuttuneiden polkujen perusteella. Code PRs suorittaa nopeita laatuportteja ja vaikuttavia testejä erillisillä yksiköillä ja Vitest -töillä CI ssä.
- **per jonoehdokas.** CI ja Quality suorittavat koko profiilin koostetulle ehdokkaalle sen jonossa viite.
- **Vapautusvinkki mukaan.** Release-Green käyttää nopeita kovia portteja työntöillä, jotka vastaavat sen polkusuodattimia. Kolme ajoitettua ajoa päivässä käyttävät täyttä pyyhkäisyä julkaisuhaaralle.
- **Julkaisukohtaisesti.** Täysi CI matriisi sisältää E2E sirpaleet, paketin vahvistuksen, tarball-käynnistyssavun ja kattavuuden tarkistukset. Katso [julkaisun tarkistuslista](RELEASE_CHECKLIST.md).

## Tuoreen kassan edellytykset `merge-train.sh`

Esitarkastus suoritetaan ennen työpuiden luomista. Asenna riippuvuudet `npm ci`:lla. Varmista, että `node_modules/.bin/tsc` on suoritettava ja että `node_modules/node_modules` puuttuu. Tarkista, että `node_modules/.bin/bun --version` onnistuu.

Jos Bun jälkiasennus ohitettiin, suorita `(cd node_modules/bun && node install.js)`. Palveluntarjoajan johdonmukaisuus ja tunnettujen symbolien tarkistukset käyttävät Bun. Validaattori käyttää `npm run check:cycles:ratchet` :tä estoporttina. Itsenäinen `npm run check:cycles` komento on neuvoa-antava.

## Historia

Mergify-yhdistysjono poistettiin käytöstä 19.11.2026.
