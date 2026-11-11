# Release-Green: candidate validation and evidence (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green jälgib konkreetset kohustust ja teatab selle kinnitamise tulemustest. [Kvaliteedivärava viide](../architecture/QUALITY_GATES.md) määratleb praegused CI profiilid, nõutavad kontrollid ja vastuvõtupoliitika. Versioonitud [vastuvõtupoliitika](../../config/quality/admission-policy.json) on `Gate / CI` ja `Gate / Quality` käivitatav leping.

## CI ja vaatleja ulatus

`ci.yml` ja `quality.yml` kate tõmbavad päringud põhi- ja vabastamisharudesse. Valitud profiil määrab, millised töökohad kehtivad. Täielik CI sisaldab ka radu, mida tavaline tõmbamistaotlus ei täida. Kiire vaatleja tulemus ei saa neid töid asendada ja lõpetatud töövoo ümbris ei saa asendada oma kviitungeid.

Tootmisehitus kuulub CI. `quality.yml` s ei ole dubleerivaid nõuandeid. Puuduvad artefaktid, tühistatud tööd ja mittetäielikud mõõtmised ei taga edukat nõutavat kontrolli. Enne tulemuste aktsepteerimist kinnitage praegune baas, pea ja kombineeritud kandidaat.

## Kohalik valideerimine

Käivitage vaatleja omandatud tööpuus pärast selle sõltuvuste ettevalmistamist. Kasutage enne ulatuslikku valideerimist [tööpuu ja ressursi protokolli](WORKTREE_ISOLATION.md).

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Kiirprofiil on osaline. Täisprofiil kontrollib oma modelleeritud nõudeid ja säilitab käskude kviitungeid; see ei tõenda kasutuselevõttu ega asenda kohaldatavaid hostitud kontrolle. Aruandes eristatakse täitmise ebaõnnestumist meetrilisest triivimisest. Nõutavad põrkmehhanismid jäävad vastavalt valitud reeglile blokeerima. Ärge tõstke baasjoont ainult mööduva tulemuse saamiseks.

## Igaõhtune ja käsitsi pühkimine

Igaõhtused väljalaske- ja ühilduvuse lahendajad valivad kanoonilise väljalaskeharu. See valik peab vastama töövoo käivitanud harule ja komplektid kasutavad sündmuse muutumatut SHA. Käsitsi täitmiseks valige `release_branch` s kavandatud väljalase ja saatke samale viitele:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Filiaalidevaheline saatmine lükatakse tagasi enne valitud koodi täitmist. Hostitud peamised komplektid kontrollivad enne installimist `main` ja kontrollivad, kas selle SHA vastab endiselt lahendatud sihtmärgile. Kui peamised käigud lahendamise ajal liiguvad, käivitage mittetäielik pühkimine uuel kinnitusel. Ärge kombineerige erinevate kandidaatide komplekti kviitungeid.

## Ebaõnnestumise triaaž ja taastumine

Kasutage juhtumit diagnostilise indeksina, seejärel kontrollige täpset käitamist, katset, ebaõnnestunud sammu ja artefakti. Võrrelge samaväärseid alus- ja kandidaattõendeid, enne kui omistate ebaõnnestumise panustajale. Infrastruktuuri vead, päritud vead, kandidaadi regressioonid ja ootel kinnitused nõuavad erinevaid parandusmeetmeid.

`/green-prs`, `/sweep-reds`, `/validate-release-green` ja `/babysit` oskused koguvad tõendeid ja valmistavad ette parandusi oma dokumenteeritud ulatuses. Hoidke kaastöötaja krediiti, kasutage eraldatud remondiharusid ja kontrollige enne volitatud ühendamist kõiki nõutavaid kontrolle. Ükski automaatne algtaseme või vahejuhtumi sulgemine ei asenda mööduvat praegust kandidaati.
