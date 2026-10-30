# Quality Gates Reference (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Šis dokuments ir autoritatīvā atsauce visām OmniRoute CI kvalitātes kontrolēm.
Tajā ir aprakstīta katra kontrole, ko tā validē, kurā CI uzdevumā tā tiek izpildīta, vai tā izmanto
pakāpeniski paaugstināmu bāzes līmeni vai izpildes/neizpildes politiku un vai tā bloķē būvējumu vai ir tikai informatīva.

Īsu kopsavilkumu un atļauto elementu saraksta politiku skatiet `AGENTS.md` sadaļā
"Quality Gates & Ratchets". Šīs pašas sistēmas kritisko novērtējumu, brieduma klasifikāciju un no rīkiem neatkarīgu
replikācijas plānu skatiet
[Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Vārtu inventārs un izpildes profili

### Kandidāta pielaišana

Gan CI, gan kvalitātes vārtu darbplūsma izdod stabilu verdiktu: `Gate / CI` un
`Gate / Quality`. To versijotā pielaišanas politika uzskaita katru augšupējo darbu
kā obligātu vai konsultatīvu. Piemērojamam obligātajam darbam jābūt sekmīgam:
trūkstošs, atcelts, izlaists, gaidošs vai nezināms rezultāts nevar apstiprināt PASS.
Derīga klasifikācija, kas attiecas tikai uz dokumentāciju vai tikai uz katalogu, var
padarīt koda izpildes zaru nepiemērojamu; melnraksta PR nav pieņemts kandidāts.
`hotfix` etiķete neatceļ pierādījumu prasību.

Abas darbplūsmas aptver PR uz galvenajiem/laidiena zariem, izmaiņu nosūtīšanu uz
`main`, manuālu palaišanu un apvienošanas grupas notikumus. Izmaiņu nosūtīšana,
manuāla palaišana un apvienošanas grupa izpilda pilno atlasi. Izmaiņu nosūtīšana uz
`release/**` tās nepalaiž (2026-10-18): katrai izmaiņai matrica jau tika izpildīta
tās PR ietvaros, bet apvienotā kombinācija ir Release-Green uzdevums
(`docs/ops/RUNNER_BOX.md` → mitinātais izpildes zars). Atzarojumi un apvienošanas
grupas izmanto mitinātus izpildītājus darbiem, kuri citādi atlasītu pašmitinātus
izpildītājus; pirms ieviešanas jāpārbauda pietiekama mitinātā kapacitāte.

Katra JSON kvīts identificē izņemto SHA, darbplūsmas izpildi un mēģinājumu.
CLI noraida izņemtās versijas/notikuma SHA neatbilstību. Darbplūsmas testi sasaista
politikas dalību ar verdikta darba `needs` sarakstu, lai jauns vai noņemts izpildes
zars nevarētu nemanāmi pazust. Kvītis aptver savu darbplūsmu, nevis publicēšanu, izvietošanu vai esoša konsultatīva skenera iekšējo darbību. Piemērojamo pārbaužu noteikšana par obligātām zaru kārtulās ir atsevišķas administratīvas izmaiņas; to uzdevumu definēšana pati par sevi zaru neaizsargā.

`API Route Typecheck` ir neatkarīga darbplūsmas pārbaude ārpus abiem apkopotajiem spriedumiem un lokālā pilnā novērotāja statiskā profila. Pārbaudiet tās rezultātu atsevišķi precīzajam kandidātam. `.github/workflows/api-route-typecheck.yml` tiek izpildīts PR pieprasījumiem uz `main` vai `release/**`, izmaiņu nosūtīšanai uz jebkuru no šīm zaru saimēm un manuālai palaišanai. Tam nav ceļu filtra. PR bāzes zara maiņa pieprasa jaunu pārbaudi; pamatteksta/virsraksta labojumi izmanto tikai novērošanai paredzēto nosaukumu `Admission not requested / API Route Typecheck` un nevar aizstāt uzņemšanas pārbaudi. Darbplūsma nedeklarē apvienošanas grupas trigeri. Jebkurai apvienošanas rindas ieviešanai, kurai šī pārbaude ir obligāta, vispirms jānodrošina tās izpilde šim notikumam.

### UI izpildes kapacitāte

CI izpilda pilno UI inventāru kā četras `test-vitest` matricas daļas, katru ar ne
vairāk kā diviem darbiniekiem un esošo 15 minūšu darba termiņu. Pirmā daļa izpilda
arī MCP/autoCombo Vitest komplektu. Obligātais darba rezultāts aptver katru matricas
daļu; vienas daļas kļūme vai atcelšana nevar apstiprināt kandidāta pielaišanu.

Nakts novērotājs saglabā atsevišķu precīzā kandidāta kvīti katrai UI daļai, tostarp
MCP izpildei pirmajā kvītī. Nepieciešamas visas četras kvītis, žurnāli un atbilstošas
izpildes identitātes. Lokālais `npm run test:vitest:ui` joprojām atlasa pilno
komplektu; viena `--shard` izpilde ir tikai daļējs pierādījums.

### Vienībtestu pārklājuma apkopošana

Divpadsmit vienībtestu daļas esošās testu izpildes laikā apkopo V8 pārklājumu. Sekmīga
daļa palaiž `scripts/ci/compact-v8-coverage.mjs`, lai saspiestu sākotnējos failus,
neģenerējot starpposma Istanbul pārskatu. Noslēguma Coverage darbs pārbauda visus
divpadsmit manifestus pret kandidāta SHA, izpildlaiku, avota sakni un datu jaucējvērtībām,
pēc tam palaiž c8 pārskatu ģeneratorus un esošos pārklājuma sliekšņus. Ievaddati saglabā
c8 globālo failu nosaukumu secību; iepriekšēja apvienošana pa daļām nav droša jauktam
funkciju/bloku pārklājumam. Trūkstošas, nepareizi veidotas vai nesaderīgas daļas izraisa
pielaišanas kļūmi. Nesekmīgu testu daļu neapstrādātais diagnostikas pārklājums tiek
saglabāts atsevišķi; to nevar iekļaut gala apvienošanā.

### Vienību izpildes progresa ieraksti

Koplietotā komanda `test:unit:ci:shard` reģistrē posmus `primary`, `dashboard` un `serial`,
izmantojot `scripts/ci/unit-progress-reporter.mjs`. Parastais testu pārskats joprojām ir
pieejams. Atsevišķs ieraksts, kurā ir tikai metadati, reģistrē katra faila izpildes sākumu un pabeigšanu,
savukārt 30 sekunžu sirdspuksta ziņojumā ir uzskaitīti joprojām aktīvie faili un to izpildes ilgums. Tajā tiek reģistrēti
tikai atļaušanas sarakstā iekļautie izpildes metadati; testu apraksti, izvade, kļūdu saturs un pilnā
vide netiek serializēta.

CI un Quality saglabā JSONL failus kā `unit-progress-ci-<run>-<attempt>-<shard>` un
`unit-progress-quality-<run>-<attempt>-<shard>`. Darba noildze var nepieļaut vēlāko augšupielādi;
jau nosūtītie sirdspuksta ziņojumi paliek kā diagnostikas pierādījumi. Trūkstoši sirdspuksta ziņojumi var liecināt arī par
bloķētu vai pārtrauktu izpildītāja procesu. Šie ieraksti saglabā esošo testu atlasi,
paralēlismu, termiņus un izejas statusu; tie nav spriedumi par kandidātu pielaidi.

### Saglabātie pierādījumi pieņemšanas rezultātu apkopotājā

`scripts/quality/validate-release-acceptance.mjs` apkopo iesniegto plānu un tā manifestus; tas nepierāda, ka plāns aptver visu laidiena procesu. Tā pārskati skaidri nosaka `releaseAcceptance: false`, pat ja plāna statuss ir `VERIFIED`. Darbplūsma `release-acceptance.yml` joprojām izmanto ēnas režīma testa datus, nevis reālas būvēšanas, pakotnes izveides, palaišanas vai paaugstināšanas kvītis.

CLI pieprasa `--evidence-root`, lai pārbaudītu saglabātos pierādījumus. Faili tiek atrasti ceļā `<evidence-root>/<artifact_id>/<member>`, un tiem aprēķina SHA-256 jaucējvērtību. PASS ieraksts bez pierādījumiem, trūkstošs vai mainīts fails, nedrošs ceļš vai simboliska saite nepieļauj apstiprināšanu. Trūkstoši faili nav līdzvērtīgi tukšiem veiksmīgu izpilžu žurnāliem. Esošās SHA/run/attempt pārbaudes paliek neatkarīgas: vienādi baiti nevar padarīt novecojušu kvīti derīgu. Faila integritāte nepierāda izpildes autentiskumu vai artefakta paaugstināšanu.

### Statiskās skenēšanas inventārs

Versijotais npm aizstājvārdu inventārs un statiskās skenēšanas dalība atrodas
`config/quality/gate-manifest.json`. Palaidiet `npm run check:gate-manifest`, lai
pārbaudītu skriptu nosaukumus un precīzās komandas pret `package.json`; papildinājumi,
noņemšana un komandu novirzes izraisa kļūmi gan lokālajā āķī, gan izmaiņu klasifikācijas
darbos CI vidē. Aizstājvārds nav darbplūsmas darbs, matricas instance vai testa gadījums:
šos skaitļus nedrīkst pasniegt kā savstarpēji aizstājamus.

Izmantojiet `npm run quality:scan -- --list` vai
`npm run quality:scan:fast -- --list`, lai pārskatītu atlasītos aizstājvārdus, tos
neizpildot. Izpildītājs izsauc npm ieejas punktu, tādēļ tiek saglabāta tā izpildvide
(tostarp Bun, kur tas ir konfigurēts). Manifests profilā neiekļautos aizstājvārdus
reģistrē kā atsevišķi izsaucamus, un uzturēšanas komandas ir aizliegtas tikai lasāmos
skenēšanas profilos.

Šie profili aptver tikai statisko skenēšanu. Tie neapliecina produkta testus,
pārklājumu, pakotņu veidošanu, ārējās pārbaudes vai kandidāta pilnīgu apstiprinājumu
laidienam. Darbplūsmas pielaišanai tiek izmantoti saistītais
`config/quality/admission-policy.json` un
`scripts/quality/admission-verdict.mjs`. Laidiena novērotāja profili paliek atsevišķi;
to piemērojamās pārbaudes un kvītis pārskatiet neatkarīgi. Pilnā novērotāja statiskās
komandas ir deklarētas failā `config/quality/release-green-static-profile.json`,
tostarp `audit:deps`, mutāciju testu atlase un tulkojumu pārbaudes. Ielādētājs pārbauda
npm komandas pret package.json un modelētajām CI/Quality deklarācijām; tas noraida
novirzes, nevis izpilda čaulas marķierus kā argumentus. Obligāta skenera
SKIP/INCOMPLETE izvade nevar apstiprināt PASS. Profils reģistrē savus ārējos
izņēmumus un neaizstāj mitinātā pārklājuma, testu matricu, pakotņu vai izvietošanas
pierādījumus. Tālāk esošais tekstuālais inventārs ir atsauce, nevis pierādījums tam,
ka vārti faktiski tika izpildīti.

Skripti atrodas zem `scripts/check/` (politikas vārti) un `scripts/quality/`
(savilkšanas mehānisms). CI patiesības avots ir `.github/workflows/ci.yml`.

### Publicētās bāzes dokumentācijas stāvoklis

`.github/workflows/i18n-base-health.yml` uzrauga dokumentācijas stāvokli pēc atlasītām
izmaiņu nosūtīšanām uz `main` un `release/v*`, kā arī pēc manuālas palaišanas. Tā filtri aptver dokumentāciju,
saknes Markdown failus, `llm.txt`, tulkojumu stāvokli/konfigurāciju un saistītos i18n rīkus.
Vienīgais `Published base documentation health` uzdevums izmanto mitinātu Ubuntu vidi un piecu minūšu
termiņu. Tas veic tikai lasāmu validāciju un izveido diagnostikas apliecinājumu, neveicot
atkarību instalēšanu, tulkošanu vai stāvokļa pārņemšanu.

`scripts/i18n/check-base-health.mjs` pieprasa, lai nebūtu avota jaucējvērtību, trūkstošu mērķu, mērķa jaucējvērtību,
novecojušu tulkojumu un sadaļu kešatmiņas neatbilstību. Tas arī validē pašreizējo pamata
dokumentu/lokalizāciju tvērumu un reģistrēto izcelsmi. Nederīgs konteksts, nepilnīgs pārklājums
vai pārtraukta pārbaudes rīka darbība rada `INCOMPLETE`; apstiprināta novirze rada `FAIL`. Abos
gadījumos tiek atgriezts kļūmi norādošs izejas statuss. Apliecinājums ir piesaistīts izrakstīšanas SHA, darbplūsmai, izpildei un
mēģinājumam, un tiek saglabāts kā `i18n-base-health-<sha>-<run>-<attempt>`.

Šis ir neatkarīgs publicētās bāzes novērojums. Tas nepievieno PR vai
sapludināšanas grupas notikumu, obligātu PR pārbaudi, npm aizstājvārdu vai statiskās skenēšanas profila dalībnieku.
Esošā diferenciālā PR politika un pamatā esošā pārbaudes rīka konsultatīvās klasifikācijas
paliek nodalītas. Veiksmīga augšupielāde nevar pārvērst nesekmīgu stāvokļa rezultātu par PASS.

### Laidiena PR paātrinātais ceļš (`quality.yml`)

`.github/workflows/quality.yml` papildina CI galveno/laidiena zaru PR, izmaiņu
nosūtīšanai uz `main`, manuālai palaišanai un apvienošanas grupām. PR izmanto pēc
ceļiem filtrētas ātrās pārbaudes. Pastāvīgi atspējotā dublētā būvēšana tika noņemta;
īstās būvēšanas/pakotnes/palaišanas pārbaudes paliek CI.

| Uzdevums                                         | Tvērums                                                                                                                                                                                                                              | Bloķējošs                |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `Docs Gates (fast-path)`                         | Dokumentācijas/koda PR; API dokumentācijas atsauces un visa dokumentācija                                                                                                                                                            | Jā                       |
| `Fast Quality Gates`                             | Koda PR; statiskās pārbaudes, tipu pārbaude, informācijas paneļa tipu pārbaude, ietekmētie vienībtesti                                                                                                                               | Jā                       |
| `Forgotten sibling tests`                        | Koda PR; mainītajiem moduļiem tiek izsekoti statiskie patērētāji un iespējamie radniecīgie testi; apkopojuma moduļu un dinamiskās importēšanas ceļi tiek ziņoti kā konsultatīva diagnostika ar atsaucēm uz atļauto izņēmumu sarakstu | **Konsultatīvs**         |
| `Vitest (fast-path)`                             | Koda PR; ātrais vitest testu komplekts                                                                                                                                                                                               | Jā                       |
| `Unit Tests fast-path`                           | Koda PR; 4 daļās sadalīts vienībtestu komplekts                                                                                                                                                                                      | Jā                       |
| `No new ESLint warnings`                         | Koda PR; lintēšanas aizsargpārbaude, kas ņem vērā slāpēšanas norādes                                                                                                                                                                 | Jā, tostarp atzarojumiem |
| `Merge integrity (changelog + generated skills)` | PR, kas nav melnraksti; izmaiņu žurnāla un ģenerēto prasmju sinhronizācija                                                                                                                                                           | Jā, tostarp atzarojumiem |

#### Aizmirsto radniecīgo testu pārskats

`npm run check:forgotten-sibling-tests` atkārtoti izmanto importa atrisinātāju, kas ir testu ietekmes kartes pamatā.
Katram mainītajam produkcijas modulim tas ziņo deterministiskas
`changed module/symbol -> static consumer -> candidate sibling test` ķēdes, ja iespējamais
tests nav iekļauts izmaiņu pieprasījuma atšķirībās. Markdown kopsavilkums un JSON rezultāts tiek saglabāti kā
`forgotten-sibling-tests` darbplūsmas artefakts kalibrēšanai pirms jebkādas bloķējošas ieviešanas.

Apkopojuma moduļu reeksporti un dinamiskie importi ir tikai atrisināšanas diagnostika; tie nekad nerada
bloķējošu konstatējumu. Pārskatītie izņēmumi atrodas failā
`config/quality/forgotten-sibling-allowlist.json`. Katrā ierakstā jānorāda patērētājs un iespējamais
tests, jāsniedz konkrēts pamatojums un jāpievieno saite uz GitHub problēmu vai izmaiņu pieprasījumu. Nepareizi veidoti ieraksti izraisa
kļūmi pēc drošā noklusējuma principa. Izņēmumi nevar ignorēt dzēstu iespējamo testu vai izmaiņas, kas pievieno `.skip`/`.todo`;
apgalvojumu vājināšanu un citu maskēšanu joprojām kontrolē neatkarīgi bloķējošā
`check:test-masking` pārbaude.

### Uzdevums: `lint`

Tiek izpildīts katram PR uz `main`. Kļūmes gadījumā bloķē sapludināšanu.

| Skripts (`npm run ...`)           | Pārbauda                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Bloķējoša                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Node.js versija ir atbalstītajā diapazonā                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jā                                           |
| `check:test-tla-order`            | Nevienā `node:test` failā zem `tests/unit` netiek reģistrēts tests, sasniegts augšējā līmeņa `await` un pēc tam reģistrēti vēl citi testi (#18045; vienvirziena ierobežojums: `test-tla-order-allowlist.json` var tikai sarukt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jā                                           |
| `check:cycles`                    | Cikliskie importi visā `src/` + `open-sse/` (balstīts uz AST, atrisināti tsconfig `paths`). Tieša palaišana atgriež 1, ja pastāv kaut viens cikls (kopš #15281 kļūmes gadījumā pēc noklusējuma bloķē), un uzskaita SCC. `check:cycles:ratchet` (ko palaiž CI) bloķē, ja skaits pārsniedz `quality-baseline.json` definēto `metrics.cycles` augšējo robežu — pašlaik 14, `direction: down`, tāpēc tā var tikai samazināties (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jā (vienvirziena ierobežojums)               |
| `check:boundary`                  | `open-sse → src` saistība: unikāli failu savstarpējie importi no dziņa lietotnē (`scripts/quality/measure-boundary.mjs`; malu saraksts ir v4 kodola/moduļu sadalīšanas novēršanas neizpildīto darbu saraksts). Tieša palaišana = informatīvs pārskats (tāds pats kā `quality:boundary`). `check:boundary:ratchet` (ko palaiž CI un kas ir iekļauts arī `quality.yml` ātro pārbaužu vienvirziena ierobežojumu ciklā) bloķē, ja skaits pārsniedz `quality-baseline.json` definēto `metrics.boundaryOpenSseToSrc` augšējo robežu — sākotnēji iestatīta uz izmērīto vērtību 771, `direction: down`; `--update` to var tikai samazināt; PR gadījumā relatīva pret bāzes zaru (`--base-ref`, skatiet tālāk)                                                                                                                                                                                                                                                                                                                                                      | Jā (vienvirziena ierobežojums)               |
| `check:route-validation:t06`      | Zod shēmas ir visos maršrutos (6. līmeņa politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jā                                           |
| `check:any-budget:t11`            | `@ts-expect-error // any` skaits nepārsniedz budžetu (11. līmeņa kontroles mehānisms)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Jā                                           |
| `check:provider-consistency`      | Katram nodrošinātājam failā `providers.ts` ir atbilstošs ieraksts failā `providerRegistry.ts` (un otrādi — atļauto elementu saraksta ietvaros)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jā                                           |
| `check:model-lifecycle`           | Trīs manuāli uzturētās maršrutēšanas tabulas saglabā atbilstību repozitorijā iekļautajam dzīves cikla momentuzņēmumam (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nepiešķir vērtējumu nevienam ekspluatāciju beigušam identifikatoram, kuru `REGISTRY` var maršrutēt; katrs `BUILT_IN_ALIASES` mērķis ir ietverts `REGISTRY` un nav ekspluatāciju beigušo identifikatoru momentuzņēmumā; katrs ekspluatāciju beigušais identifikators, kas joprojām ir `REGISTRY`, tiek pārsūtīts vai norādīts `allowedRetiredInCatalog`; un neviens `DEFAULT_DEGRADATION_MAP` avots vai mērķis šajā momentuzņēmumā nav atzīmēts kā ekspluatāciju beidzis. Tas nepierāda, ka modeli pašlaik apkalpo aktīvs augšupstraumes pakalpojums. Bezsaistes pārbaude — salīdzina ar `config/quality/model-lifecycle.json`, kas tiek manuāli atjaunināts ar `npm run quality:refresh-model-lifecycle` (nepieciešams tīkls; nav integrēts CI). `allowedRetiredInCatalog` ir pakāpeniskas samazināšanas sprūdrata mehānisms: pievienojiet ierakstu tikai kopā ar izsekošanas uzdevumu. | Jā                                           |
| `check:fetch-targets`             | Katrs `fetch("/api/...")` klienta puses direktorijā `src/` tiek atrisināts uz reālu `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jā                                           |
| `check:deps`                      | Visas ar `npm install` instalējamās atkarības visos repozitorija failos `package.json` ir iekļautas `dependency-allowlist.json`; jaunas atkarības bez fiksētas versijas vai ar iespējami kļūdaini uzrakstītiem pakotņu nosaukumiem tiek atzīmētas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Jā                                           |
| `audit:deps`                      | npm audits visiem pieciem neatkarīgajiem bloķēšanas failiem (saknes, Electron, OpenCode spraudņu v1/v2 un nodrošinātāja). Kritiski drošības ieteikumi bloķē; augstas pakāpes drošības ieteikumi paliek redzami brīdinājumi. Trūkstoši/neizdevušies auditi tiek atzīmēti kā INCOMPLETE un bloķē; katra tvēruma bloķēšanas failu jaucējvērtības un pārskati tiek saglabāti.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jā                                           |
| `check:lockfile`                  | `package-lock.json` integritāte — https reģistrs, integritātes jaucējvērtības, bez resursdatora pārrakstīšanas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jā                                           |
| `check:licenses`                  | SPDX licenču atļauto vērtību saraksts ražošanas atkarībām                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jā                                           |
| `check:tracked-artifacts`         | Nav būvējuma artefaktu / repozitorijā iesniegtu `node_modules` simbolisko saišu (tiek palaists arī husky pirmsiesniegšanas pārbaudē; pirmsnosūtīšanas pārbaude ir apzināti vienkāršota — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jā                                           |
| `check:ai-attribution`            | PR komitos, virsrakstā vai pamattekstā nav AI/robotprogrammas `Co-Authored-By` beigu rindiņas vai AI ģenerēšanas kājenes — stingrais noteikums Nr. 16 (`quality.yml` ātro pārbaužu ciklā PR→`release/**` gadījumiem — nolasa notikuma lietderīgo slodzi, ārpus PR neveic nekādas darbības — un tikai PR paredzētā `ci.yml` lint darbībā PR→`main` gadījumiem; arī husky `commit-msg` āķī; cilvēki kā līdzautori ir atļauti; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | Katram Vitest izņēmumam ir norādīta izsekošanas problēma, un tas ir iekļauts failā `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jā                                           |
| `check:file-size`                 | Avota faili (`.ts`/`.tsx` mapēs `src/`, `open-sse/`, `electron/`, `bin/`) nepārsniedz `cap`, un testa faili (`*.test.ts(x)`) nepārsniedz `testCap`; faili, kas fiksēti failā `file-size-baseline.json` (`frozen` / `testFrozen`), nedrīkst pārsniegt tajā reģistrēto izmēru                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jā                                           |
| `check:error-helper`              | Kļūdu atbildēs izpildītājos/apstrādātājos tiek izmantots `buildErrorBody()` / `sanitizeErrorMessage()` (stingrais noteikums Nr. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jā                                           |
| `check:migration-numbering`       | Migrāciju SQL faili ir secīgi numurēti, bez iztrūkumiem vai dublikātiem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jā                                           |
| `check:public-creds`              | Ārpus `publicCreds.ts` nav literāļu OAuth `client_id`/`client_secret` vai Firebase tīmekļa atslēgu (stingrais noteikums Nr. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jā                                           |
| `check:db-rules`                  | Ārpus `src/lib/db/` moduļiem nav neapstrādātu SQL vaicājumu; nav apkopojošo importu no `localDb.ts` (stingrie noteikumi Nr. 2/Nr. 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jā                                           |
| `check:known-symbols`             | Pakalpojumu sniedzēju izpildītāji, maršrutēšanas stratēģijas un tulkotāji, kas reģistrēti to nosūtīšanas tabulās, atbilst diskā esošajiem failiem — nav nevienam nepiesaistītu vai nedeklarētu simbolu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jā                                           |
| `check:route-guard-membership`    | Katrs maršruts, kas palaiž atvasinātu procesu, ir klasificēts ar `isLocalOnlyPath()` (stingrie noteikumi #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Jā                                           |
| `check:test-discovery`            | Katru repozitorijā esošo `*.test.ts` / `*.spec.ts` failu apkopo vismaz viens testu izpildītājs (sprūdratmehānisms: neiekļauto failu saraksts failā `test-discovery-baseline.json` var tikai sarukt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jā                                           |
| `check:agent-skills-sync`         | Ģenerētie aģenta prasmju artefakti atbilst to avota katalogam (nav noviržu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | Pakalpojumu sniedzēju logotipiem/resursiem ir reģistrēts izcelsmes ieraksts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | JSON konfigurācijas faili tiek parsēti un atbilst repozitorija lintēšanas noteikumiem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | TypeScript kompilācija bez kļūdām (tikai konsultatīvi brīdinājumi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jā                                           |
| `typecheck:noimplicit:core`       | Stingrs `noImplicitAny` — ar skatu nākotnē; daudzām iepriekš pastāvošām izsaukuma vietām joprojām ir nepieciešamas anotācijas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Konsultatīvs** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, kas attiecas tikai uz `src/app/(dashboard)/**` (#7033) — `typecheck:core` rūpīgi atlasītais 27 failu atļauto failu saraksts neietver nevienu informācijas paneļa TSX failu, un arī `next build` nekad neveic tā tipu pārbaudi (`next.config.mjs` iestata `ignoreBuildErrors: true`), tādēļ nesaistītu identifikatoru regresijas šajā daļā (#6625/#6909) CI sistēmai nebija redzamas. Atšķirības tiek salīdzinātas ar fiksētu bāzlīniju, kurā norādīts kļūdu skaits katram failam un TS kodam (`config/quality/dashboard-typecheck-baseline.json`, tāds pats novecojušu ierakstu kontroles modelis kā `check:known-symbols`) — pārbaude neizdodas tikai tad, ja rodas JAUNAS kļūdas, kas pārsniedz bāzlīnijā norādīto skaitu; kad iepriekš pastāvējusi kļūda ir izlabota, samaziniet bāzlīniju ar `--update`.                                                                                                                                                                                                                                        | Jā                                           |

### Uzdevums: `quality-gate`

Tiek izpildīts pēc `test-coverage`. Kļūmes gadījumā bloķē sapludināšanu.

| Skripts                      | Pārbauda                                                                                                                                                                                                                         | Bloķējošs            |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `quality:collect`            | Izveido `quality-metrics.json` (ESLint brīdinājumu skaits, pārklājums no apvienotā segmentu pārskata)                                                                                                                            | Jā (pirms sprūdrata) |
| `quality:ratchet`            | Neviena `quality-baseline.json` metrika nav regresējusi (ESLint brīdinājumi ≤ bāzlīnija; pārklājums ≥ bāzlīnija)                                                                                                                 | Jā                   |
| `check:duplication`          | Koda dublēšanās (`jscpd@4`) nepārsniedz `quality-baseline.json` norādīto bāzlīniju                                                                                                                                               | Jā                   |
| `check:complexity`           | Faila līmeņa ciklomātiskā sarežģītība nepārsniedz ierobežojumu (pamata ESLint `complexity` + `max-lines-per-function`)                                                                                                           | Jā                   |
| `check:cognitive-complexity` | Kognitīvās sarežģītības sprūdrats (`eslint-plugin-sonarjs`) — atsevišķa ESLint pārbaude; CI izpilda abas kopā kā vienu `check:complexity-ratchets` darbību                                                                       | Jā                   |
| `check:dead-code`            | Neizmantoto eksportu/failu sprūdrats (`knip`) nav regresējis salīdzinājumā ar bāzlīniju                                                                                                                                          | Jā                   |
| `check:compression-budget`   | Saspiešanas etalontesta budžets — minimālais marķieru ietaupījums katram dzinim nedrīkst regresēt                                                                                                                                | Jā                   |
| `check:type-coverage`        | Tipizētā koda procentuālā īpatsvara sprūdrats (`type-coverage`) nav regresējis; lielā mērā ietver `typecheck:noimplicit:core`                                                                                                    | Jā                   |
| `check:codeql-ratchet`       | Atvērto CodeQL brīdinājumu skaits nav regresējis (nolasa, izmantojot `gh api`; bez pilnvaras marķiera pārbaude tiek korekti izlaista) — atsvaidzināšanas biežumu un manuālo aktivizēšanu skatiet tālāk sadaļā "CodeQL sprūdrats" | Jā                   |

### Uzdevums: `quality-extended`

Uzdevums bloķē attiecīgos kandidātus. Pakotnes lielums, atrastie noslēpumi, ievainojamību
atradumi, darbplūsmu atradumi un OpenAPI izmaiņas tiek pārbaudītas, izmantojot obligātus sprūdratus.
Ciklisko atkarību diagnostika joprojām ir ieteikuma rakstura. Skeneru instalēšana ir obligāta:
`scripts/ci/install-quality-scanners.sh` nodrošina fiksētu versiju instalēšanu un tālāk nodod
instalēšanas kļūmes. Ja trūkst rīku, pārskati nav derīgi vai nav bāzlīniju,
obligātā skenera pārbaude paliek NEPABEIGTA.

| Skripts                  | Pārbauda                                                                                                                                                                                                                       | Bloķēšana                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| `check:circular-deps`    | Nav ciklisku atkarību (dpdm)                                                                                                                                                                                                   | **Konsultatīva**                          |
| `check:bundle-size`      | Pakotnes lielums nepārsniedz ierobežojumu; ja mērījums nav pieejams, pārbaude neizdodas                                                                                                                                        | **Bloķējoša ar --ratchet**                |
| `check:secrets`          | Gitleaks atradumi nepasliktinās; obligātās skenēšanas noraida trūkstošus rīkus, avotu vai bāzlīniju, nesekmīgas skenēšanas un nederīgus pārskatus                                                                              | **Bloķējoša ar --ratchet**                |
| `check:vuln-ratchet`     | Atkarību ievainojamības nepasliktinās; obligātās skenēšanas noraida trūkstošus rīkus, nederīgus pārskatus vai trūkstošas bāzlīnijas                                                                                            | **Bloķējoša ar --ratchet**                |
| `check:workflows`        | Darbplūsmu lintēšana (actionlint + zizmor); trūkstoši vai bojāti skeneri, nederīgi pārskati vai trūkstoša ratchet bāzlīnija izraisa INCOMPLETE. Derīgajiem atradumiem tiek piemērota atlasītā strict/advisory/ratchet politika | Izpilde obligāta; zizmor ratchet bloķē CI |
| `check:openapi-breaking` | Publiskās API līgums pret piespraustajiem notikumu komitiem (PR merge-base, push before, merge-group base; ieplānotai/manuālai izpildei — izrakstīšanas pirmais vecākelements); obligātā mērījuma kļūme bloķē procesu          | **Bloķējoša ar --ratchet**                |

### Uzdevums: `docs-sync-strict`

Pull requestiem uz `main` vai `release/**` šis darbs tiek izpildīts tikai kandidātiem, kas nav melnraksti (vai atrodas uzticamā rindā) un ir klasificēti kā dokumentācijas vai koda izmaiņas. Tas tiek izpildīts arī CI notikumiem ārpus PR; šī darbplūsmas push palaišana attiecas tikai uz `main`, nevis `release/**`. Solis ar izejas kodu, kas nav nulle, bloķē darbu; tālāk norādītie tikai ziņojamie atradumi un dokumentētie izņēmumi to nebloķē.

| Skripts                        | Pārbauda                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Bloķēšana                                                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-vārteja, kas secīgi izpilda 7 tālāk norādītās apakšvārtejas                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jā                                                                                                                                          |
| ↳ `check:docs-sync`            | Pakotnes/OpenAPI/CHANGELOG versiju saskaņotība, precīzi `llm.txt` spoguļi, tulkotā CHANGELOG sadaļu/izmēra invarianti un aizstātu dokumentu dublikātu neesamība                                                                                                                                                                                                                                                                                                                                              | Jā                                                                                                                                          |
| ↳ `check:docs-frontmatter`     | Kompilētajām dokumentācijas lapām ir derīgi frontmatter virsraksti                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jā                                                                                                                                          |
| ↳ `check:docs-counts`          | Augstas uzticamības skaita invarianti ir stingri; heuristiskās failu skaita pārbaudes tikai brīdina, ja vien skripts nesaņem `--strict` (CI meta-vārteja to nenodod)                                                                                                                                                                                                                                                                                                                                         | Stingrais līmenis bloķē; mīkstais līmenis ir konsultatīvs                                                                                   |
| ↳ `check:env-doc-sync`         | Vides mainīgo nolasījumi pirmkodā, `.env.example` un `docs/reference/ENVIRONMENT.md` sakrīt pēc skaidri noteikto ignore, doc-only un env-only izņēmumu sarakstu piemērošanas                                                                                                                                                                                                                                                                                                                                 | Jā, ārpus dokumentētajiem izņēmumu sarakstiem                                                                                               |
| ↳ `check:deprecated-versions`  | Ziņo par iespējami novecojušām versijām ārpus drošiem vēsturiskiem kontekstiem un novecojušiem atjaunināšanas datumiem, neiekļaujot ignorētos dokumentus                                                                                                                                                                                                                                                                                                                                                     | Konsultatīvi pašreizējā CI konfigurācijā (`--strict` netiek nodots)                                                                         |
| ↳ `check:doc-links`            | Iekšējās markdown saites dokumentācijā norāda uz reāliem failiem (`[text]`/`(path)` formā)                                                                                                                                                                                                                                                                                                                                                                                                                   | Jā                                                                                                                                          |
| ↳ `check:fabricated-docs`      | Dokumentācijā minētie maršruti, vides mainīgie, CLI komandas, āķu nosaukumi un failu ceļi pastāv kodu bāzē. Stingrā vārteja ar `--strict`; bez karodziņa kļūme ir nebloķējoša.                                                                                                                                                                                                                                                                                                                               | Jā (izmantojot `--strict` CI vidē)                                                                                                          |
| `check:cli-i18n`               | Izmantotās CLI `t()` atslēgas pastāv `en`; `pt-BR` saglabā visas augstākā līmeņa sadaļas; `zh-CN` un `zh-TW` satur visas `en` atslēgas                                                                                                                                                                                                                                                                                                                                                                       | Jā                                                                                                                                          |
| `check:openapi-coverage`       | OpenAPI specifikācija aptver vismaz ar ratchet noteikto minimālo reālo maršrutu skaitu                                                                                                                                                                                                                                                                                                                                                                                                                       | Jā                                                                                                                                          |
| `check:openapi-security-tiers` | Deklarētajām `x-loopback-only`/`x-always-protected` anotācijām jābūt pamatotām ar `routeGuard.ts`; parsētāja kļūdas un tiešās pārbaudes neatbilstības bloķē. Apgrieztā pārbaude par trūkstošām `x-loopback-only` anotācijām zem tikai lokāliem prefiksiem brīdina; tikai ar šabloniem definēti maršruti šajā apgrieztajā pārbaudē netiek iekļauti.                                                                                                                                                           | Parsētāja/tiešās pārbaudes bloķē; apgrieztā pārbaude ir konsultatīva                                                                        |
| `check:openapi-routes`         | Katrs `/api...` ceļš failā `openapi.yaml` neatkarīgi no parametru nosaukumiem atbilst reālam maršrutam pēc pamatotā izņēmumu saraksta `KNOWN_STALE_SPEC` piemērošanas; arī novecojuši saraksta ieraksti izraisa kļūmi                                                                                                                                                                                                                                                                                        | Jā                                                                                                                                          |
| `check:docs-symbols`           | Iekšējās `/api/...` URL atsauces kanoniskajos dokumentos, kas nav spoguļi, atbilst reālam maršrutam vai maršrutu saimei; proxy/upstream/vietturu/failu atsauces un pamatoti `KNOWN_STALE_DOC_REFS` ieraksti ir izslēgti, bet novecojuši izņēmumu saraksta ieraksti izraisa kļūmi                                                                                                                                                                                                                             | Jā                                                                                                                                          |
| `i18n translation drift`       | Pārbauda pamatdokumentu avota/mērķa jaucējvērtības un tulkojuma izcelsmi. PR salīdzinājums pieļauj tikai pilnīgi identiskas mantotas kļūmes; jaunas vai nepārbaudītas avota, trūkstoša mērķa, mērķa jaucējvērtības, novecojuša tulkojuma vai sadaļu kešatmiņas neatbilstības bloķē. Ārpus PR salīdzinājuma avota/trūkstoša mērķa/mērķa jaucējvērtības kļūmes bloķē, bet novecojuši tulkojumi un nesaskanīgas sadaļu kešatmiņas paliek tikai brīdinājumi. Vecā formāta sadaļu kešatmiņas neesamība nav kļūme. | Jauna/nepārbaudīta PR novirze bloķē; pilnīgi identiska mantota novirze ir tikai brīdinājums; noteikumi ārpus PR ir atkarīgi no kļūmes veida |

### Uzdevums: `i18n-ui-coverage`

| Skripts                             | Pārbauda                                                                                                                                                                                                  | Bloķējošs     |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (iekļauts) | UI i18n atslēgu pārklājums ir ≥ 65%                                                                                                                                                                       | Jā            |
| `check-ui-value-drift` (iekļauts)   | Pārrakstīta angļu valodas **vērtība** neatstāj novecojušu tulkojumu                                                                                                                                       | Jā            |
| `check-new-key-coverage` (iekļauts) | **Jauna** angļu valodas atslēga ir iztulkota katrā lokalizācijā — marķieris `__MISSING__:` tiek noraidīts                                                                                                 | Jā            |
| `check-translation-ratio`           | Reālo tulkojumu īpatsvars katrā lokalizācijā (angļu valodai identiskas / viettura / trūkstošas lapas ārpus atļauto saraksta) nedrīkst pārsniegt `config/quality/i18n-translation-baseline.json` + rezervi | **Bloķējošs** |

Nepieciešams `fetch-depth: 0` — vērtību izmaiņu vārteja salīdzina `en.json` ar apvienošanas bāzi.

#### `check-ui-value-drift` — novecojušu tulkojumu vārteja

Atklāj vienu i18n regresiju, kuru pārējās vārtejas strukturāli nespēj pamanīt: angļu valodas vērtība
tiek pārrakstīta, bet tulkojumi, kas atvasināti no _iepriekšējā_ angļu valodas teksta, paliek, tāpēc
lietotāji, kuri neizmanto angļu valodu, turpina lasīt pārliecinoši formulētu, bet nu jau nepareizu tekstu.

Tas patiešām nonāca laidienā. `oauthModal.googleOAuthWarning` tika pārrakstīts, kad tika
ieviests Antigravity pieteikšanās palīgs (#5203); **39 no 43 lokalizācijām** saglabāja tekstu, kas
operatoriem norādīja „kopēt pilno URL un ielīmēt to zemāk” — šim nodrošinātājam šādu plūsmu
nav iespējams pabeigt. Tas palika nepamanīts līdz #8463, jo:

- `sync-ui-keys` aizpilda tikai **trūkstošās** atslēgas, bet nekad neaizstāj **novecojušās**;
- `check-ui-keys-coverage` skaita atslēgu _klātbūtni_, tāpēc novecojis tulkojums tiek uzskatīts par segtu;
- `check-translation-drift` izseko `docs/i18n/<locale>/**.md` dokumentācijas spoguļkopijas —
  tas nekad nelasa `src/i18n/messages/*.json`. Bloķējošs uzdevumā `docs-sync-strict` kopš
  2026-09 atkārtotās sinhronizācijas: rediģējiet pamatdokumentu → `npm run i18n:run -- --files=<doc>` (sadaļas līmenī, lēti).

**Ņem vērā izmaiņas, nevis izmanto bāzlīniju.** Tas salīdzina apvienošanas bāzes `en.json` ar
darba koku; katrai atslēgai, kuras angļu valodas vērtība ir mainīta, jebkura lokalizācija, kurā
joprojām ir neskarts tulkojums, tiek uzskatīta par novecojušu. Tas apzināti **iesaldē iepriekš pastāvošo parādu** —
izmaiņu salīdzinājums nevar atklāt, no kura vecā angļu valodas teksta ir radies sen pastāvošs tulkojums, tāpēc vārteja
vērtē tikai to, ko skar pašreizējās izmaiņas. Alternatīva (katras atslēgas jaucējvērtību bāzlīnija) prasītu
aptuveni 600 KB lielu ģenerētu failu, kas būtu 3× lielāks par lielāko esošo bāzlīniju un mainītos katrā i18n PR.

Ir divi veidi, kā to izpildīt:

1. atjaunināt skartos tulkojumus vai
2. iestatīt tiem `__MISSING__:<new english>` — izpildlaikā tad tiek izmantots izlabotais angļu valodas teksts
   (`src/i18n/request.ts::deepMergeFallback`, #7258), un atslēga tiek ievietota tulkošanas rindā.

Ja virknes **nozīme** ir mainījusies, ieteicams **pārdēvēt atslēgu**: jauna atslēga nevar mantot
novecojušu tulkojumu. Šādu pieeju izmantoja #8463.

```bash
npm run i18n:check-value-drift          # stingra pārbaude (to izpilda CI)
npm run i18n:check-value-drift:warn     # tikai pārskats
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Vērtību novirzes un jauno atslēgu pārbaudes izmanto vienu nemainīgu salīdzinājumu no
`scripts/i18n/resolve-ui-diff-base.mjs`. Darbplūsma abām pārbaudēm nodod vienus un tos pašus bāzes, bāzes gala un
kandidāta SHA. PR/bāzes atkārtotas mērķēšanas, izmaiņu nosūtīšanas un apvienošanas grupas izpildes izmanto attiecīgā notikuma
kontekstu. Kandidāta zara manuālai palaišanai ir nepieciešams precīzi tam atbilstošais atvērtais PR vai tieši norādīta
`i18n_base_sha` ievade. Manuāla vai ieplānota `main` vai `release/vX.Y.Z` novērošana
bez šīs ievades salīdzina pēdējo komitu ar tā pirmo vecākkomitu; tā nav visa
mantotā tulkojumu parāda revīzija. Lokālai izsaukšanai nepieciešama tieši norādīta salīdzināšanas bāze,
piemēram, iepriekš minētā `BASE_REF` komanda.

Trūkstošs vai neviennozīmīgs salīdzināšanas konteksts, nenolasāms vai nederīgs obligātais katalogs un
mainīts kandidāts rada rezultātu `INCOMPLETE` ar izejas kodu **2**, arī brīdinājuma režīmā.
Katalogi tiek lasīti, izmantojot `scripts/i18n/read-ui-catalog.mjs`; lasīšanas kļūmju gadījumā
tie netiek aizstāti ar tukšiem objektiem. Ne nepieejama bāze, ne nepilnīga ievade nenodrošina rezultātu PASS.

### Uzdevums: `i18n`

Pilna i18n validācijas matrica (viens uzdevums katrai lokalizācijai). Viss uzdevums ir ieteikuma rakstura.

| Skripts                         | Pārbauda                               | Bloķējošs                                                 |
| ------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Tulkojuma pilnīgumu katrā lokalizācijā | **Ieteikuma** (`continue-on-error: true` visam uzdevumam) |

### Uzdevums: `pr-test-policy`

Darbojas tikai izmaiņu pieprasījumiem.

| Skripts                | Pārbauda                                                                                                                                                   | Bloķējošs |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR, kas maina produkcijas kodu mapēs `src/`, `open-sse/`, `electron/` vai `bin/`, ir jāiekļauj vai jāatjaunina testi (Stingrais noteikums #8)              | Jā        |
| `check:test-masking`   | Mainītie testu faili nesamazina neto apgalvojumu skaitu un nepievieno `assert.ok(true)` tautoloģijas                                                       | Jā        |
| `check:pr-evidence`    | PR aprakstā ir norādīti izmaiņu testēšanas/VPS pierādījumi (automatizē Stingro noteikumu #18, meklējot PR tekstā — trausli, sk. neizdarīto darbu sarakstu) | Jā        |

### Uzdevums: `test-vitest`

Nepieciešams `changes` klasifikācijas darbs. Attiecīgo matricas segmentu kļūme bloķē sapludināšanu.

| Komplekts        | Pārbauda                                                          | Bloķējošs                                                                                                              |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveri (110 rīki), autoCombo, kešatmiņu — vitest izpildītājs | Jā                                                                                                                     |
| `test:vitest:ui` | UI komponentu testus — vitest izpildītājs                         | **Bloķējošs** — iepriekš pastāvējušās kļūmes ir tieši izslēgtas failā `vitest.config.ts`; jaunas kļūmes aptur uzdevumu |

### Nakts darbplūsmas (ieplānotas, konsultatīvas)

Tās tiek palaistas pēc cron grafika (un ar `workflow_dispatch`), nekad PR ietvaros. Visas ir konsultatīvas.

| Darbplūsma             | Pārbauda                                                                                                                                                                            | Bloķējošs        |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | fast-check īpašību testus ar nejaušu sākumvērtību un lielu izpildes reižu skaitu                                                                                                    | **Konsultatīvs** |
| `nightly-resilience`   | kaudzes pieauguma slieksni, haosa kļūmju injicēšanu, k6 slodzes/ilgstošas slodzes testus                                                                                            | **Konsultatīvs** |
| `nightly-llm-security` | promptfoo injekciju aizsardzību (bloķēšanas režīmā) + garak pārbaudes (tiek izlaistas, ja nav pakalpojuma sniedzēja noslēpuma)                                                      | **Konsultatīvs** |
| `nightly-schemathesis` | OpenAPI līguma izplūdušo testēšanu (schemathesis) pret aktīvu OmniRoute, izmantojot `docs/openapi.yaml` — atklāj specifikācijas pārkāpumus / neapstrādātas 500 kļūdas (8. fāze B.4) | **Konsultatīvs** |
| `nightly-mutation`     | Stryker mutāciju testēšanas rezultātu ātrajā vienību testu joslā — izdzīvojušās mutācijas atklāj vājus apgalvojumus                                                                 | **Konsultatīvs** |
| `nightly-compat`       | Node dzinēja saderības matricu visos atbalstītajos `engines.node` diapazonos                                                                                                        | **Konsultatīvs** |

Veiktspējas bāzes rādītāji (kaudze, TTFB, būvēšanas laiks) tiek reģistrēti, bet netiek izmantoti kā izpildes nosacījums: skatiet [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Ātruma posms (2026-08-30 → v4.0 LTS): visas bāzes robežvērtības atvieglotas par 20%

Atbildīgās personas lēmums (2026-08-30): līdz v4.0 modularizācijai piegādes ātrums ir svarīgāks
par tehniskā parāda ierobežošanu. Visas **skaitliskās** sprūdrata bāzes robežvērtības vienā
auditējamā piegājienā tika atvieglotas par 20%, un posms ir deklarēts failā `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Kas mainījās                                                                                                                                                                                                                                      | Kur                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — skaitļi, kuriem mazāka vērtība ir labāka, ×1.2; procenti, kuriem lielāka vērtība ir labāka, ÷1.2 (pārklājuma minimums saglabāts 60, `eslintErrors` paliek 0, `eslintWarnings` 0 → 20% no fiksētā apspiešanas gadījumu skaita) | `quality-baseline.json` (`_relax_velocity_2026_08_30` piezīmē uzskaitītas visas vērtību izmaiņas pirms → pēc) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                  | `complexity-baseline.json`, `duplication-baseline.json`                                                       |
| `cap`, `testCap`, katra `frozen[*]` / `testFrozen[*]` rindu robežvērtība ×1.2                                                                                                                                                                     | `file-size-baseline.json`                                                                                     |
| skaits katram failam / katram TS kodam ×1.2                                                                                                                                                                                                       | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`        |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                               | `scripts/check/check-openapi-coverage.mjs`                                                                    |
| `--require-tighten` kļūst konsultatīvs, kamēr `_policy.requireTighten === false`                                                                                                                                                                  | `scripts/quality/check-quality-ratchet.mjs`                                                                   |
| iknakts `bank-ratchet-shrinks` tiek apturēts (tas saglabātu izmērīto samazinājumu un atceltu rezerves palielinājumu)                                                                                                                              | `.github/workflows/nightly-release-green.yml`                                                                 |

Atļauto vienumu saraksti (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nav** budžeti un netika mainīti. Izpildes/neizpildes politikas vārtejas (noslēpumi, SQL noteikumi,
dokumentācijas/vides līgums, i18n paritāte, vienībtesti) nav mainītas — nesekmīgs tests joprojām ir nesekmīgs tests.

**Rīki**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — vienreizējā
  atvieglošana (`scripts/quality/relax-baselines.mjs`); atsakās darboties divreiz ar vienu un to
  pašu piezīmi.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mēra katru skaitlisko vārteju tāpat kā CI un izvada katras vārtejas atlikušo rezervi
  (`scripts/quality/baseline-headroom.mjs`). Ik nakti izpildāmais `baseline-headroom` uzdevums publicē
  tabulu darbplūsmas izpildes kopsavilkumā un augšupielādē tās JSON/Markdown pārskatu kā
  `baseline-headroom-<run_id>`, saglabājot to 90 dienas. Brīdinājuma un kritiskās rindas norāda vārtejas,
  kuru vērtības ir 10% robežās no to maksimālās robežvērtības vai jau to pārsniedz. Pārskatiet šos pārskatus
  kā agrīnus brīdinājumus par budžetu izlietošanu; pārbaudiet attiecīgās vārtejas `_rebaseline_*` piezīmes. Uzdevums
  vairs neveido un neatjaunina pastāvīgu problēmas pieteikumu; #12149 saglabā agrāko pārskatu vēsturi.

**Jaunā koda režīms (Clean-as-You-Code) — kopš 2026-08-30, tikai PR paātrinātais ceļš**

`pull_request` notikumos `quality.yml` nodod `--base-ref <PR base SHA>` komandām `check:file-size`,
`check:complexity-ratchets` un `check:dead-code`. Vārtejas `check:complexity-ratchets` un
`check:dead-code` salīdzina HEAD ar sapludināšanas bāzi, **ierobežojot pārbaudi līdz failiem, kurus PR
ir mainījis** (`scripts/check/newCodeMode.mjs`: sapludināšanas bāze tiek materializēta pagaidu
`git worktree`, ESLint/knip tiek palaisti tajā un HEAD versijā, un katra faila skaita vērtības tiek salīdzinātas):

- **bloķējošs** — PR mainītajos failos pievienoja ciklomātiskās/kognitīvās sarežģītības pārkāpumus vai neizmantotus eksportus
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` žurnālā);
- **informatīvs** — globālā kopsumma salīdzinājumā ar fiksēto bāzes līmeni. Mantotā novirze nekad neiezīmē
  nevainīgu PR sarkanā krāsā; novirze tiek uzskaitīta labošanai laidiena saskaņošanas laikā, un to uzrauga
  rezerves apjoma uzdevums.

`check:file-size` izmanto bāzes atsauci pēc saviem noteikumiem (`scripts/check/check-file-size.mjs`, #8522):
tas pārbauda katru avota un testa failu kokā, nolasa katra faila rindu skaitu PR bāzē,
izmantojot `git show`, un atzīmē failu kā nesekmīgu tikai tad, ja tas pārsniedz lielāko no tā bāzes griestiem
(`frozen` / `testFrozen` vai `cap` / `testCap` failam, kas nav iekļauts bāzē) un bāzes izmēra.
Tādēļ fails, kuram bāzē jau ir novirze, nekad nepadara nevainīgu PR nesekmīgu.

`check:boundary:ratchet` piemēro to pašu noteikumu savam vienīgajam skaitlim
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR notikumos gan
`quality.yml` ātrās pārbaudes, gan `ci.yml` lintēšanas uzdevums nodod PR bāzes SHA, bāzes komits
tiek izmērīts no `git archive` eksporta, un PR neizdodas tikai tad, ja tā `open-sse → src` malu
skaits pārsniedz lielāko no `metrics.boundaryOpenSseToSrc` un bāzes skaita. Par bāzes novirzi
virs griestiem tiek ziņots (`base drift herdado`), taču tā nekad nepadara nevainīgu PR nesekmīgu;
push → main saglabā absolūtos griestus, un neatrisināms bāzes SHA ar brīdinājumu atkāpjas uz tiem.

`workflow_dispatch` izpildēm, laidiena zaļā statusa pilnajai pārbaudei un iknakts rezerves uzdevumam nav PR bāzes,
tāpēc tie saglabā absolūto (globālo) salīdzinājumu. Pārklājums, dublēšanās un tipu pārklājums pagaidām
paliek globāli (to rīki nevar lēti izveidot katra faila atšķirību) — tie ir kandidāti tādai pašai pieejai.

**Posma noslēgšana versijā v4.0 (LTS = stingrāks nekā iepriekš, nevis „atpakaļ pie ierastā”)**

1. Tīrajā `release/v4.0.0` galotnē: ierakstam palaidiet `npm run quality:headroom --json`, pēc tam
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, kā arī katras tipu pārbaudes barjeras
   `--update` — visas bāzes vērtības samazinās līdz izmērītajai vērtībai.
2. Izdzēsiet `_policy` no `quality-baseline.json` (tas no jauna aktivizē `--require-tighten` un iknakts
   rezerves uzkrāšanu), atjaunojiet `THRESHOLD = 36` (vai augstāku) failā `check-openapi-coverage.mjs`.
3. Padariet ierobežojumus stingrākus par izmērītajiem tur, kur modularizācija ir atmaksājusies: faila izmēra `cap` atkal iestatiet uz 1000
   (vai 800), pārklājuma minimumus palieliniet par 5, bet modularizētajām pakotnēm neizmantoto eksportu skaitu iestatiet uz 0.

## Ratchet bāzes līnija (`quality-baseline.json`)

Ratchet dzinis (`scripts/quality/check-quality-ratchet.mjs`) nolasa `quality-baseline.json`
un salīdzina to ar tikko apkopoto `quality-metrics.json`. Jebkura metrika, kas pasliktinās
vairāk par tai noteikto epsilonu, izraisa būvējuma kļūmi.

Pašlaik izsekotās metrikas:

| Metrika               | Virziens | Nozīme                                     |
| --------------------- | -------- | ------------------------------------------ |
| `eslintWarnings`      | `down`   | ESLint brīdinājumu skaits nedrīkst pieaugt |
| `coverage.statements` | `up`     | Izteikumu pārklājums nedrīkst samazināties |
| `coverage.lines`      | `up`     | Rindu pārklājums nedrīkst samazināties     |
| `coverage.functions`  | `up`     | Funkciju pārklājums nedrīkst samazināties  |
| `coverage.branches`   | `up`     | Zaru pārklājums nedrīkst samazināties      |

Lai pēc reāla uzlabojuma atjauninātu bāzes līniju:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Karodziņš `--update` ieraksta pašreizējās izmērītās vērtības failā `quality-baseline.json`.
Komitojiet šo failu kopā ar izmaiņām, kas uzlaboja metriku. PR, kas uzlabo metriku,
neatjauninot bāzes līniju, tiks konstatēts ar `--require-tighten` (6A.5. fāze,
ieviešana vēl nav pabeigta).

### CodeQL ratchet: atsvaidzināšanas biežums un manuāla palaišana

`check:codeql-ratchet` nolasa **repozitorija stāvokli, kas tiek atsvaidzināts pēc grafika, nevis katram PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` ziņo
`state: configured`, `schedule: weekly`: tas ir GitHub noklusējuma iestatījuma skenējums, nevis
analīze pēc katras izmaiņu nosūtīšanas. Sekas: pēc tam, kad tiek sapludināts PR, kas IZLABO
brīdinājumus, ratchet turpina nolasīt veco, lielāko skaitu, līdz tiek izpildīts nākamais
ieplānotais skenējums, tādēļ tas ziņo par regresiju katrā atvērtajā PR, tostarp paša
labojuma PR turpmākajās izmaiņās, līdz skenējums atjaunina datus.

**Manuāla atsvaidzināšana**: `gh workflow run codeql.yml --ref release/vX.Y.Z` atkārtoti palaiž
analīzi un dažu minūšu laikā atkārtoti publicē brīdinājumus. Vispirms izlasiet
`.github/workflows/codeql.yml` — tā galvenē ir paskaidrots, ka tas izmanto tikai
`workflow_dispatch`, **jo tas konfliktē ar GitHub "default setup"**
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
Lai atjaunotu `push`/`pull_request`/`schedule` trigerus, vispirms nepieciešama
**īpašnieka darbība**: Settings → Code security → CodeQL: Default → Advanced.
Nepievienojiet `schedule:` trigeri bez šīs pārslēgšanas — tas radīs tikai nesekmīgas izpildes.

**Samaziniet bāzes līniju pēc skaita krituma** — `node scripts/check/check-codeql-ratchet.mjs
--update` ieraksta jauno izmērīto skaitu faila `quality-baseline.json` laukā
`metrics.codeqlAlerts.value`, lai ratchet klusējot nepieļautu regresiju atpakaļ līdz
vecajai augšējai robežai. Praktisks piemērs (2026-09-02/03): PR #12502 izlaboja 7 reālus
brīdinājumus (izmērītais atvērto brīdinājumu skaits: 13 → 6); PR #12530 samazināja fiksēto
bāzes līniju no 11 līdz 6, lai tā atbilstu faktiskajam skaitam; atlikušie 6 pēc tam tika
noraidīti, katram brīdinājumam norādot pamatojumu, līdz atvērto brīdinājumu skaits sasniedza 0.

**Par noraidīšanu lemj operators (Stingrais noteikums #14)** — nekad nenoraidiet CodeQL
brīdinājumu, noraidīšanas komentārā nenorādot tehnisko pamatojumu: `won't fix`, ja to
pieprasa augšupstraumes protokols, `used in tests` testa fiksatūrai, `false positive`,
ja izmantots sanitizētājs, ko CodeQL nevar konstatēt (precedents:
`docs/security/ERROR_SANITIZATION.md`).

---

## Testu atkārtošanas politika (WS5.4, v3.8.49)

Atkārtošana tiek konfigurēta katram izpildītājam atsevišķi, nekad globāli — vispārēja atkārtošana pārvērš reālas regresijas
neredzamās nestabilitātēs:

| Izpildītājs      | Politika                                                                                                                       | Kāpēc                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` tikai CI vidē ar `trace: on-first-retry`                                                                          | Pārlūkprogrammas/tīkla laika parametri ir patiesi nedeterministiski; viens atkārtojums ar trasējumu pārvērš nestabilitāti diagnosticējamā artefaktā |
| Vitest           | NAV globālas atkārtošanas. Pierādīti nestabilam testam piešķir tiešu katra testa atkārtošanu (redzama izmaiņās, pārskatīta PR) | Nestabilo testu izolācijas saraksts tiek glabāts repozitorijā un nekad nav necaurredzams                                                            |
| node:test (unit) | Atkārtošanas NAV nekad                                                                                                         | Nestabils vienībtests ir testa kļūda — izlabojiet to, nevis mēģiniet izpildīt vēlreiz                                                               |

Mērķa SLO pēc nestabilitātes telemetrijas ieviešanas (WS5.2/5.3): <1% nestabilitātes līmenis katram testam
(“labot nekavējoties” slieksnis), ≥95% sekmīgas izpildes līmenis katram konveijeram. Nozares atsauces vērtības —
jāpārkalibrē atbilstoši mūsu pašu mērījumiem.

## Laidiena līmeņa sprūdrata novirze (WS5.5, v3.8.49)

Ja sprūdrata ierobežojums (faila lielums, sarežģītība, eslint brīdinājumi) regresē TĪRĀ laidiena
galotnē — proti, to izraisījusi apvienojumu KOMBINĀCIJA un neviens atsevišķs PR neatveido
regresiju savā zarā — labojums ir jāveic **laidiena atbildīgajam vienu reizi laidiena
zarā**: dodiet priekšroku koda izdalīšanai/refaktorēšanai; bāzes līmeni mainiet tikai ar dokumentētu
pamatojuma ierakstu. Nekad neuzveliet kombinācijas novirzi līdzstrādnieka PR un nekad
nemainiet bāzes līmeni katram PR atsevišķi (tas slēpj reālas regresijas). Vispirms nošķiriet cēloni: atveidojiet
kļūdu pret tīro galotni pārbaudes darba kokā, pirms pieņemat, ka to izraisīja jūsu PR.

## Sprūdrata samazinājumu uzkrāšana — lejupvērstais virziens (#8584)

Sprūdrats ir automatizēts tikai daļēji, turklāt nepareizajā daļā. Augšējās robežas **paaugstināšana** ir
manuāla JSON rediģēšana, kas aizņem desmit sekundes un ir ātrākais veids, kā atbloķēt nesekmīgu PR.
Tās **pazemināšanai** kādam ir jāpalaiž `--update` un jākomitē rezultāts — un līdz
`bank-ratchet-shrinks` uzdevuma ieviešanai neviena darbplūsma to nedarīja. Izmērītās sekas
(2026-07-25): 18 fiksēti faili jau sasniedza vai nepārsniedza jauno failu 800 rindu ierobežojumu, sliktākais
gadījums — 132× (`src/shared/validation/schemas.ts`, 19 rindām saglabāts 2,523 ierobežojums);
sarežģītības augšējā robeža pieauga `1794 → 2169` aptuveni 37 bāzes līmeņa maiņas piezīmēs ar tieši vienu
samazinājumu (−1); un frāze “pastiprināt ar `--update` nākamajā ciklā” tika ierakstīta 31 reizi, bet izpildīta
vienreiz. Ierobežojums, kas pārdzīvo kodu, kura dēļ tas tika noteikts, nemanāmi pārvērš katru pabeigto
sadalīšanu izaugsmes rezervē tam, kurš nākamais rediģēs failu.

`nightly-release-green.yml` → uzdevums **`bank-ratchet-shrinks`** noslēdz šo ciklu:

|          |                                                                                                                      |
| -------- | -------------------------------------------------------------------------------------------------------------------- |
| Palaiž   | `schedule` (3× dienā) + `workflow_dispatch` — apzināti **ne** `push`                                                 |
| Mēra     | augstāko `release/vX.Y.Z`, izmantojot tādu pašu atrisināšanu un injekcijas aizsardzību kā `release-green`            |
| Raksta   | `check:file-size --update` un `check:complexity-ratchets --update` (abi pēc uzbūves tikai samazina)                  |
| Pārbauda | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                             |
| Piegādā  | vienu vienmēr aktuālu PR pret laidiena zaru — piespiedu kārtā atjauninātu, nekad neradot atkārtotu paziņojumu lavīnu |

Uzkrāšana tiek veikta paketēs, nevis katrā `push`, jo tai nav latentuma prasības (8 stundu laikā
uzkrāts samazinājums ir pieņemams), savukārt palaišana pēc katras apvienošanas atkārtoti pārbūvētu PR zaru
apvienošanas kampaņu laikā un katru reizi prasītu pilnu ESLint caurskati. Noteikšana joprojām notiek pēc
`push` (`release-green`); tikai uzkrāšana tiek veikta paketēs.

### Drošības pārbaudītājs

Uzdevums bez uzraudzības raksta bāzes līmeņos, tāpēc `verify-ratchet-bank.mjs` padara
to pieņemamu. Tas salīdzina koku pēc `--update` ar `HEAD` un **pārtrauc uzdevumu,
pirms ir izveidots jebkāds komits** — neatverot PR — ja vien katra izmaiņa nav viena no šīm:

- `frozen` / `testFrozen` skaitliska ieraksta **samazināšana** vai **noņemšana**
- `complexity-baseline.json` → `count` **samazināšana**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **samazināšana**

Jebkas cits izraisa kļūmi: skaitļa palielināšana, ieraksta pievienošana, `cap`/`testCap` mainīšana vai
`_rebaseline_*` piezīmes dzēšana/pārrakstīšana (šīs piezīmes ir audita pieraksti par katras
augšējās robežas pastāvēšanas iemeslu un tiek glabātas tajā pašā `frozen` objektā, kur failu ieraksti).
Bots, kas varētu paaugstināt ierobežojumu, būtu nepārprotami sliktāks par pašreizējo situāciju. Regresijas
aizsardzība: `tests/unit/verify-ratchet-bank.test.ts`.

Uzdevums nekad neveic `push` uz `release/*` — PR apvieno cilvēks, tādēļ kļūdains mērījums
nevar nonākt zarā bez pārskatīšanas.

## Atļauto izņēmumu saraksta politika

Katrā pārbaudē, kas nedrīkst neizdoties jau esošu pārkāpumu dēļ, tiek izmantots fiksēts atļauto izņēmumu saraksts
(piemēram, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politika ir šāda:

**Novērsiet pamatcēloni; izmantojiet atļauto izņēmumu sarakstu tikai tad, ja pārkāpums jau pastāvēja un
to nevar novērst tajā pašā PR.**

Pievienojot ierakstu atļauto izņēmumu sarakstam:

1. Iekļaujiet komentāru ar pamatojumu.
2. Norādiet izsekošanas pieteikumu (piemēram, `// #3498 — Phase 2 feature, not yet implemented`).
3. Dzēsiet ierakstu tajā pašā PR, kurā tiek novērsts pārkāpums — novecojis ieraksts, kas vairs
   neapspiež aktīvu pārkāpumu, pats par sevi ir defekts (pēc ieviešanas 6A.3 novecojušo kontroles noteikumu pārbaude
   neizturēs pārbaudi, ja atļauto izņēmumu sarakstā būs palicis bāreņieraksts).

**Nepievienojiet** ierakstus atļauto izņēmumu sarakstam, lai testi tiktu izpildīti ātrāk. Sekmīga pārbaude ar augošu
atļauto izņēmumu sarakstu rada maldīgu kvalitātes iespaidu.

### Ja pārbaude jūsu PR neizdodas

1. **Rūpīgi izlasiet pārbaudes izvadi** — tajā precīzi norādīts, kurš fails vai simbols
   ir pārkāpis noteikumu.
2. **Novērsiet pārkāpumu** — lielākā daļa pārbaužu ir deterministiskas failu sistēmas pārbaudes, kas izdodas, tiklīdz
   kods ir pareizs.
3. **Ja pārkāpums jau pastāvēja** (proti, jūs to neieviesāt, bet pārbaude tagad
   to aptver): pievienojiet ierakstu atļauto izņēmumu sarakstam ar pamatojuma komentāru un izsekošanas pieteikumu.
4. **Ja pārbaude ir sprūdrata tipa** (pārklājums, ESLint brīdinājumi, dublēšanās, sarežģītība):
   jūsu izmaiņas ir pasliktinājušas metriku. Novērsiet pamatproblēmu vai (retos gadījumos) izpildiet
   `npm run quality:ratchet -- --update`, ja izmaiņas ir apzinātas un metrikas
   pasliktināšanās ir pieņemama, taču PR aprakstā dokumentējiet tās iemeslu.
5. **Konsultatīvās pārbaudes** (`continue-on-error: true`) ir informatīvas — tās nebloķē
   sapludināšanu, taču ir redzamas CI kopsavilkumā. Tik un tā novērsiet tajās konstatētās problēmas.

---

## Jaunas pārbaudes pievienošana

1. Izveidojiet `scripts/check/check-<name>.mjs` (vai `.ts`). Politikas pārbaudes beidz darbu ar kodu 0/1.
   Sprūdrata tipa pārbaudes izvada metriku failā `quality-metrics.json`, izmantojot `collect-metrics.mjs`.
2. Pievienojiet `"check:<name>": "node scripts/check/check-<name>.mjs"` failam `package.json` un
   sinhronizējiet aizstājvārdu un tā precīzo komandu failā `config/quality/gate-manifest.json`.
   Veiciet tādu pašu sinhronizāciju, mainot vai noņemot esošu validācijas aizstājvārdu.
   Palaidiet `npm run check:gate-manifest`; pirmskomita āķis un CI izmaiņu klasifikācija
   nodrošina šīs vienošanās ievērošanu.
3. Pievienojiet to `.github/workflows/ci.yml` atbilstošajā uzdevumā
   (politika → `lint` vai `docs-sync-strict`; sprūdrats → `quality-gate`).
4. Ja pārbaudei ir atļauto vienumu saraksts, izmantojiet `reportStaleEntries()` no
   `scripts/check/lib/allowlist.mjs`, lai novecojušie ieraksti tiktu noteikti automātiski.
5. Uzrakstiet testu direktorijā `tests/unit/build/`, kas aptver pārbaudes noteikšanas loģiku.
6. Atjauniniet šo dokumentu (pievienojiet rindu attiecīgā uzdevuma tabulai).

---

## Aģentu rīki: LSP-in-the-loop (pēc izvēles)

Papildus CI pārbaudēm OmniRoute ietver **pēc izvēles izmantojamu** `agent-lsp` sagatavi
(projekta līmeņa `.mcp.json`, Fase 7 Task 15). Izveidojiet `.mcp.json`,
lai kodēšanas aģentiem nodrošinātu piekļuvi TypeScript valodas serverim un tie atrisinātu simbolus /
diagnostikas problēmas **pirms** koda rakstīšanas — tas ir kompilēšanas pirms apgalvošanas papildinājums
`typecheck:core`, kas novērš „izdomātu simbolu” kļūdas jau to rašanās vietā. Tas apzināti
netiek ielādēts automātiski (jūs izvēlaties un pārbaudāt MCP↔LSP tiltu); bojāts ieraksts tikai reģistrē
savienojuma kļūdu un nekad nepārtrauc sesijas.

---

## Racionalizācijas neizpildīto darbu saraksts (ROI pārskatīšana — 9. fāze, 3. vilnis)

Šis uzskaitījums 2026-06-17 tika saskaņots ar `ci.yml` (iepriekšējā versijā nebija iekļauti
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Saskaņotās kopas ROI pārskatīšanā
tika noteikti tālāk minētie racionalizācijas kandidāti. **Apvienošanas ir mehāniskas CI
izmaiņas; režīma maiņa/noņemšana ir operatoram atstāti politikas lēmumi.** Nekas no tālāk
minētā vēl nav ieviests.

**Iepriekš nav dokumentēti arī** (konsultatīvi, zems signāla līmenis): `docs-lint` darbs
(markdownlint + Vale, visam darbam iestatīts `continue-on-error`) un savrupās skenēšanas darbplūsmas
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` ir norādīts
`quality-baseline.json`, taču nav piesaistīts bloķējošam sliekšņa mehānismam failā `ci.yml` — šis rādītājs
pašlaik ir nesaistīts.

### Apvienošana / dublikātu novēršana (mehāniski, zemāks risks)

Katrs kandidāts 2026-06-17 tika pārbaudīts pret aktīvo vārteju stāvokli (uzticies, bet pārbaudi);
vairākas „acīmredzamas” apvienošanas izrādījās tādas, kas slēpj tehnisko parādu, un **nav** tieši aizstājamas.

- **`check:docs-sync` tiek palaists divreiz** — atsevišķi `lint` darbā un vēlreiz `check:docs-all` (`docs-sync-strict`) ietvaros, kā arī husky pirmskomita āķī. ✅ **PABEIGTS** — atsevišķais `lint` izsaukums noņemts.
- **CVE skenēšana** — ❌ **NAV iespējama vienkārša apvienošana.** `audit:deps` bloķē kritiskus drošības ieteikumus un nepabeigtas revīzijas visos piecos bloķēšanas failos, bet saskaņā ar pašreizējo politiku par augsta līmeņa drošības ieteikumiem ziņo kā par brīdinājumiem; `check:vuln-ratchet` (osv) neizdodas tikai tad, ja salīdzinājumā ar repozitorijā saglabāto bāzes līmeni ir notikusi _regresija_, un noraida trūkstošus mērījumus, ja tie ir obligāti. Semantika atšķiras — noņemot `audit:deps`, tiktu zaudēta absolūtā kritisko problēmu vārteja un neatkarīgie pakotņu revīzijas apliecinājumi. Jāsaglabā abi.
- **Ciklu noteikšana** — ✅ **PABEIGTS** (#15159 G-01/G-02). Iepriekšējā tekstā `check:cycles` tika saukts par „zaļo, rūpīgi atlasīto” vārteju, un tā saglabāšana bloķējošā režīmā tika pamatota ar to, ka `check:circular-deps` (dpdm) ziņoja par 91 ciklu. Šis zaļais statuss bija **kļūdaini pozitīvs**: `check:cycles` skenēja 5 apakšdirektorijus (450 failus), atrada tikai statiskus `import|export … from` lietojumus un atmeta katru `@/` un `@omniroute/open-sse/` specifikatoru, tādēļ nespēja konstatēt dinamiskā importa un aizstājvārdu ciklus, kas dominēja repozitorijā. Labots: vārteja tagad apstaigā `src` + `open-sse` (5023 failus), apkopo specifikatorus no TypeScript AST (tādēļ `import("…")` tiek ieskaitīts, bet tipa pozīcijā esošais `typeof import("…")` — netiek) un atrisina tsconfig `paths`. Tā atrod **14** ciklus, nevis 0. Tā kā 14 iepriekš pastāvējušus ciklus nevar novērst vārtejas PR ietvaros, `check:cycles` tagad ir **sliekšņa mehānisms** (`--ratchet`, augšējā robeža `metrics.cycles.value = 14` failā `quality-baseline.json`, `direction: down`) — tas bloķē jebkuru _regresiju_, un skaits var tikai samazināties. CI izpilda `npm run check:cycles:ratchet`. Pakāpeniska samazināšana tiek veikta kopā ar **A-01**. `check:circular-deps` (dpdm) paliek konsultatīvs kā plašāks otrais viedoklis.
- **Sarežģītība** — ✅ **PABEIGTS** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): viena ESLint apstaigāšana, skaitīšana pēc ruleId, lai ciklomātiskās sarežģītības un maksimālā rindu skaita bāzes līmeņi paliktu neatkarīgi no kognitīvās sarežģītības bāzes līmeņa; atsevišķie `check:complexity` / `check:cognitive-complexity` tiek saglabāti lokālai `--update` lietošanai.
- **`/api` antihalucināciju pārbaude** — ✅ **PABEIGTS** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): viena `src/app/api` failu sistēmas inventarizācija; openapi-routes un docs-symbols joprojām ziņo neatkarīgi; atsevišķās pārbaudes tiek saglabātas lokālai palaišanai.
- **`check:node-runtime` tiek palaists 11 darbos** — ⚠️ **zems ROI.** Katram darbam ir atsevišķs izpildītājs, un pārbaude ilgst <1 s; kopējais ietaupījums būtu ~10 s, bet tiktu zaudēta lēta katra darba aizsardzība. Izmaiņu radītā slodze nav tā vērta.
- **`typecheck:noimplicit:core` CI lint pārbaudē** — ✅ **noņemts no lint darba** (bija konsultatīvs `continue-on-error`); bloķējošo tipu tvērumu nodrošina `typecheck:core` + `check:type-coverage`. Lokālais skripts saglabāts.

### Mainīt režīmu / izlemt (operatora politika)

- `check:openapi-security-tiers` (konsultatīvs) — ❌ **NAV iespējams vienkārši pārslēgt.** Tas beidz darbu ar kodu 0, bet brīdina, ka vairākiem `traffic-inspector` maršrutiem zem `LOCAL_ONLY_API_PREFIXES` trūkst anotācijas `x-loopback-only: true`. Lai to padarītu obligātu, vispirms šīs anotācijas jāpievieno failam `openapi.yaml`.
- `typecheck:noimplicit:core` (konsultatīvs) — to lielā mērā aizstāj bloķējošais `check:type-coverage` sliekšņa mehānisms. Pārveidojiet to par sliekšņa mehānismu vai noņemiet lieko otro `tsc` izpildi.
- `test:vitest:ui` (tagad **bloķējošs**) — iepriekš pastāvējušās kļūmes ir nepārprotami izslēgtas failā `vitest.config.ts`, izmantojot `// #8618` izsekošanas komentārus; jaunas kļūmes izraisa darba neizdošanos.
- `check:secrets` (gitleaks, bloķējošs sliekšņa mehānisms) — pašreizējā augšējā robeža ir `metrics.secretFindings` failā `quality-baseline.json`. Katram izņēmumam nepieciešams pamatots `.gitleaks.toml` ieraksts; nepieejams mērījums tiek uzskatīts par NEPILNĪGU. Skenēšana papildina GitHub iebūvēto noslēpumu skenēšanu un `check:public-creds`.
- `check:pr-evidence` (bloķējošs, meklē atbilstības PR apraksta tekstā) — augsts kļūdaini pozitīvu rezultātu risks; tā noņemšana vājinātu stingrā noteikuma Nr. 18 izpildi, tādēļ tas ir īsts politikas lēmums.
- `semgrep` (konsultatīvs, savrups) — OWASP kategorijās pārklājas ar CodeQL; piesaistiet tā bāzes līmeni sliekšņa mehānismam vai noņemiet.

---

## Saistītā dokumentācija

- Piegādes ķēde (izcelsme, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — atslēgu kopu atbilstības vārteja

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, uzdevums `i18n-ui-coverage`).
Salīdzina katra `src/i18n/messages/<locale>.json` gala atslēgu kopu ar `en.json` un konstatē
kļūmi, ja trūkst kādas gala atslēgas vai ir kāda lieka gala atslēga, neatkarīgi no tā, kad atslēga
tika pievienota. `__MISSING__:` vietturi tiek uzskatīti par esošiem (to saturs ir attiecības
vārtejas kompetencē). Tas ir abu uz atšķirībām/procentuālo daļu balstīto vārteju absolūts
papildinājums: `check-ui-keys-coverage` katrai lokalizācijai nosaka 80 % minimumu (43 trūkstošas
atslēgas no ~13 000 joprojām uzrāda 99,7 %), savukārt `check-new-key-coverage` vērtē tikai tās
atslēgas, kuras PR pievieno failam `en.json`. Lokalizāciju pakete tiek ģenerēta no tās dienas
`en.json`, kad tiek izveidots tās zars, un tulkošana turpinās vairākas dienas, kamēr bāzes zarā
joprojām tiek pievienotas atslēgas; paketes PR pats nepievieno nevienu atslēgu, tāpēc abas radniecīgās
vārtejas neko neziņoja, kad 1. paketei (#13044) deviņās lokalizācijās trūka 43 atslēgu un 2. paketei (#13660) astoņās lokalizācijās trūka 10 atslēgu (2026-09-15). Lai novērstu kļūmi,
izmantojiet `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra` gala
atslēga nozīmē, ka avotā tā ir noņemta — izdzēsiet to no lokalizācijas. `--warn` ziņo, neizraisot
kļūmi. `--catalog=cli` veic tādu pašu salīdzināšanu direktorijā `bin/cli/locales`
(`npm run i18n:check-keys:cli`); abas darbības atrodas uzdevumā `i18n-ui-coverage`.

#### `check-new-key-coverage` — jauno atslēgu i18n vārteja

`check-ui-value-drift` radniecīgā vārteja. Tā konstatē gadījumus, kad angļu valodas vērtība ir
**pārrakstīta**, bet tās tulkojumi nav atjaunināti; šī vārteja konstatē gadījumus, kad angļu valodas
atslēga ir **pievienota**, bet dažas lokalizācijas to tā arī nav saņēmušas.

`check-ui-keys-coverage` nevar konstatēt šādas situācijas: tā katrai lokalizācijai nosaka minimālo
procentuālo daļu, un vienpadsmit trūkstošas atslēgas no ~13 000 saglabā pārklājumu 99,9 % līmenī.
Procentuālā daļa katrai valodai nespēj izteikt, ka „šis līdzeklis tika izlaists neiztulkots” — jaunā
lokalizācijā var nonākt vesels līdzeklis bez jebkāda teksta, nemainot šo skaitli.

Incidents, ko tā novērš: Orchestration Canvas 3. posmā tā vienpadsmit atslēgas tika iztulkotas
visās 42 tajā laikā esošajās lokalizācijās. Pēc dažām stundām ES valodu pakete (#13044) palielināja
repozitorijā esošo lokalizāciju skaitu līdz 51, un deviņas jaunās lokalizācijas (`el`, `et`, `ga`,
`hr`, `lt`, `lv`, `mt`, `sl`, `sr`) tās tā arī nesaņēma. `deepMergeFallback` trūkstošas atslēgas
vietā ievieto angļu tekstu, tāpēc kļūmes izpausme bija netulkota, nevis tukša lietotāja saskarne —
reāla un pēc konstrukcijas nemanāma.

Tāpat kā radniecīgā vārteja, tā **ņem vērā atšķirības**, salīdzinot angļu valodu sapludināšanas bāzē
ar darba koku, tāpēc iepriekš pastāvējušie iztrūkumi paliek fiksēti un vārtejas ieslēgšanai nebija
nepieciešama migrācija.

**Marķieris `__MISSING__:<english>` šo prasību neizpilda (kopš 2026-09-17).** Iepriekš tas bija
dokumentētais atlikšanas mehānisms — izpildlaikā tika izmantots pareizais angļu teksts —, līdz astoņi
līdzekļu PR 2026-09-16 pievienoja 61 atslēgu un ievietoja marķieri visās 65 lokalizācijās, nevis tās
iztulkoja: šī vārteja pieņēma ikvienu no tiem, nekas nebloķēja PR, un bloķējošā reālo tulkojumu
attiecības vārteja pēc tam neizturēja pārbaudi laidiena zara galā visiem (pt-BR 3,2 % > 2,5 % + 0,5).
Marķieris tagad tiek uzskatīts par trūkstošu tulkojumu. Lai novērstu kļūmi, izmantojiet
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` vai
visām lokalizācijām paralēli — `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, drošs darbībai atsaistītā režīmā, atsakās sākt darbu bez
`OMNIROUTE_TRANSLATION_*` vides mainīgajiem). Atslēga, kurai jāpaliek angļu valodā (fiksēts
produkta/dzinēja/karoga nosaukums), jāievieto failā `scripts/i18n/untranslatable-keys.json`, un to
nekad nedrīkst slēpt aiz marķiera. `vi` pilnībā aizliedz marķierus
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — atlikto testu vārteja

Fails `vitest.config.ts` sarakstā `exclude` ir tests, kas netiek izpildīts, taču ikvienam, kas
aplūko koku, tas izskatās pēc pārklājuma. Aiz komentāra
`// #8618 — pre-existing failure; remove this exclusion when fixed` bija uzkrājušies sešdesmit divi
faili. Problēma #8618 tika slēgta 2026-08-11, kamēr tās izsekotais saraksts pieauga no 45 līdz
62 ierakstiem, un katrs jaunais ieraksts pārmantoja komentāru, kas norādīja uz slēgtu problēmu.
Kad saraksts beidzot tika pārbaudīts pa vienam failam (#13204), **51 no 62 testiem pašreizējā kokā
izdevās bez jebkādām avota izmaiņām**.

Vārteja pieprasa, lai katrs izņēmums, kas norāda uz reālu failu, (a) nosauktu izsekošanas problēmu
un (b) būtu iekļauts failā `config/quality/vitest-exclusions.json` ar tā izmērīto statusu, tādējādi
jauna izņēmuma pievienošana kļūst par pārskatāmu izmaiņu tam paredzētā failā, nevis vēl vienu rindu
60 ierakstu masīvā. Tā apzināti neizpilda izslēgtos testus atkārtoti — tas aizņem ~10 minūtes un ir
periodiska uzdevuma kompetencē; uzskaitē tiek reģistrēts, kad katrs tests pēdējoreiz tika pārbaudīts.
