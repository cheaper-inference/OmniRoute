# Release-Green: candidate validation and evidence (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green ievēro noteiktu apņemšanos un ziņo par tās validācijas rezultātiem. [Kvalitātes vārtu atsauce](../architecture/QUALITY_GATES.md) nosaka pašreizējos CI profilus, nepieciešamās pārbaudes un pieņemšanas politiku. Versionētā uzņemšanas politika `config/quality/admission-policy.json` ir izpildāms līgums `Gate / CI` un `Gate / Quality`.

## CI un novērotāja darbības joma

`ci.yml` un `quality.yml` vāks pārvelk pieprasījumus galvenajā un atbrīvošanas zaros. Atlasītais profils nosaka, kuri darbi tiek piemēroti. Pilna CI ietver arī joslas, kuras neizpilda parasts vilkšanas pieprasījums. Ātrā novērotāja rezultāts nevar aizstāt šos darbus, un pabeigts darbplūsmas iesaiņojums nevar aizstāt tā kvītis.

Ražošanas būve pieder CI. `quality.yml` nav dublikātu konsultatīvo būvējumu. Trūkstošie artefakti, atcelti darbi un nepilnīgi mērījumi nenodrošina veiksmīgu nepieciešamo pārbaudi. Pirms rezultātu pieņemšanas apstipriniet pašreizējo bāzi, galvu un apvienoto kandidātu.

## Vietējā validācija

Palaidiet novērotāju piederošā darbkokā pēc tā atkarību sagatavošanas. Pirms smagas validācijas ievērojiet `docs/ops/WORKTREE_ISOLATION.md` darbkoka un resursu protokolu.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Ātrais profils ir daļējs. Pilns profils pārbauda tā modelētās prasības un saglabā komandu kvītis; tas neapliecina izvietošanu un neaizvieto piemērojamās mitinātās pārbaudes. Pārskatā izpildes kļūme ir nošķirta no metrikas novirzes. Nepieciešamie sprūdrati joprojām bloķējas saskaņā ar atlasīto politiku. Nepaaugstiniet bāzes līniju tikai tāpēc, lai iegūtu garāmejošu rezultātu.

## Nakts un manuāla slaucīšana

Ikvakara izlaišanas un saderības risinātāji atlasa kanoniskās izlaišanas atzaru. Šai atlasei ir jāatbilst filiālei, kas aktivizēja darbplūsmu, un komplekti izmanto notikuma nemainīgo SHA. Manuālai izpildei atlasiet paredzēto versiju `release_branch` un nosūtiet uz to pašu atsauci:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Pirms atlasītā koda izpildes tiek noraidīta starpnozaru nosūtīšana. Mitinātie galvenie komplekti pirms instalēšanas pārbauda `main` un pārbauda, vai tā SHA joprojām atbilst atrisinātajam mērķim. Ja izšķiršanas laikā tiek veiktas galvenās kustības, atkārtoti palaidiet nepilnīgo slaucīšanu jaunajā izpildē. Neapvienojiet komplekta kvītis no dažādiem kandidātiem.

## Neveiksmes šķirošana un atveseļošanās

Izmantojiet incidentu kā diagnostikas indeksu, pēc tam pārbaudiet precīzu darbību, mēģinājumu, neveiksmīgo darbību un artefaktu. Salīdziniet līdzvērtīgus pamata un kandidāta pierādījumus, pirms neveiksmes attiecināt uz līdzautoru. Infrastruktūras kļūdas, iedzimti defekti, kandidātu regresijas un neapstiprinātie apstiprinājumi prasa dažādus risinājumus.

`/green-prs`, `/sweep-reds`, `/validate-release-green` un `/babysit` prasmes savāc pierādījumus un sagatavo labojumus to dokumentētajā jomā. Saglabājiet līdzautora kredītu, izmantojiet izolētas remonta filiāles un pārbaudiet visas nepieciešamās pārbaudes pirms autorizētas apvienošanas. Neviena automātiska rebaseline vai incidentu slēgšana neaizstāj garāmejošu pašreizējo kandidātu.
