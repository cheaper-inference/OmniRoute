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

### Kandidātu uzņemšana

CI un Quality Gates darbplūsmas katra izsniedz stabilu spriedumu: `Gate / CI` un
`Gate / Quality`. To versijās pārvaldītā uzņemšanas politika uzskaita katru augšupējo
uzdevumu kā obligātu vai konsultatīvu. Piemērojamam obligātajam uzdevumam ir jābeidzas
veiksmīgi: trūkstoši, atcelti, izlaisti, gaidoši un nezināmi rezultāti nevar izveidot PASS.
Derīga tikai dokumentācijas vai tikai kataloga klasifikācija var padarīt koda joslu
nepiemērojamu; melnraksta PR nav pieņemams kandidāts. `hotfix` etiķete neatceļ pierādījumu
prasību.

Abas darbplūsmas aptver PR uz main/release atzariem, nosūtīšanu uz `main`, manuālu palaišanu
un merge-group notikumus. Push, dispatch un merge-group palaiž pilno atlasi. Push uz
`release/**` tās nepalaiž (2026-10-18): katras izmaiņas jau izpildīja matricu savā PR,
un apvienotās kombinācijas izpilde ir Release-Green uzdevums (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Fork un merge group izmanto viesotos izpildītājus uzdevumiem, kuri citādi izvēlētos
pašmitinātus izpildītājus; pirms ieviešanas ir jāpārbauda pietiekama viesoto izpildītāju
kapacitāte.

Parasts PR palaiž ātro atlasi. Uzņemšanas politikas `full-code` un `full-code-e2e` joslas
(E2E, integrācija, pakotnes artefakts, Electron smoke, Bun SQLite, ekosistēmas un protokolu
klienti) tiek palaistas tikai Mergify rindas melnrakstā vai pilnas palaišanas laikā:
`gh workflow run ci.yml --ref <branch>`.

Katrā JSON apliecinājumā ir norādīts izrakstītais SHA, darbplūsmas palaišana un mēģinājums.
CLI noraida izrakstīšanas/notikuma SHA neatbilstību. Darbplūsmas testi piesaista politikas
dalību sprieduma uzdevuma `needs` sarakstam, lai jauna vai noņemta josla nevarētu
nepamanīti pazust. Apliecinājumi aptver pašu darbplūsmu, nevis publicēšanu, izvietošanu vai
esoša konsultatīva skenera iekšējo darbību. Abu pārbaudes nosaukumu aktivizēšana zaru
noteikumos ir atsevišķa administratīva izmaiņa; šo uzdevumu pievienošana pati par sevi
neaizsargā zaru.

### Apvienošanas rinda

Etiķete `queue` nosūta PR uz Mergify rindu (`.mergify.yml`). Mergify atver melnraksta PR uz
`mergify/merge-queue/` atzara, CI tur palaiž pilno atlasi, un sākotnējais PR tiek apvienots,
kad `Gate / CI`, `Gate / Quality` un `Merge integrity (changelog + generated skills)` ir sekmīgi.

Mergify ieraksta savas rindas kopsavilkumu melnraksta aprakstā, un arī citas lietotnes to var
rediģēt. `pull_request` `edited` notikums šādam melnrakstam izmanto savu vienlaicīguma grupu
(`-queue-edit-<run_id>`), tādēļ tas nevar atcelt melnraksta īsto palaišanu, un vārti un
matrica tiek izlaisti. Tiek palaists tikai `Merge integrity`. Izlaistais vārtu uzdevums
izmanto citu pārbaudes nosaukumu, jo Mergify izlaistu `Gate / CI` uztver kā neveiksmīgu
pārbaudi un izņem PR no rindas.

Pēc izņemšanas no rindas push ne vienmēr atkārtoti ievieto PR rindā. Ierakstiet tajā komentāru
`@mergifyio queue`.

### Saglabātie pierādījumi pieņemšanas reduktorā

`scripts/quality/validate-release-acceptance.mjs` reducē iesniegto plānu un tā manifestus;
tas neapstiprina, ka plāns aptver pilnu laidiena cauruļvadu. Tā pārskati skaidri iestata
`releaseAcceptance: false`, pat ja šis plāns ir `VERIFIED`. `release-acceptance.yml`
darbplūsma joprojām izmanto ēnu fiksatorus, nevis reālus būvēšanas, pakotņu, palaišanas vai
promocijas apliecinājumus.

CLI pieprasa `--evidence-root`, lai pārbaudītu saglabātos pierādījumus. Faili tiek atrisināti
kā `<evidence-root>/<artifact_id>/<member>` un jaukti, izmantojot SHA-256. PASS ieraksts
bez pierādījumiem, trūkstošs vai mainīts fails, nedrošs ceļš vai simboliskā saite neļauj
veikt pārbaudi. Trūkstoši faili nav līdzvērtīgi tukšiem veiksmīgiem žurnāliem. Esošās
SHA/run/attempt pārbaudes paliek neatkarīgas: atbilstoši baiti nevar glābt novecojušu
apliecinājumu. Faila integritāte nav izpildes autentiskuma vai artefakta promocijas pierādījums.

### Statiskās skenēšanas inventārs

Versijās pārvaldītais npm aizstājvārdu inventārs un statiskās skenēšanas dalība atrodas
`config/quality/gate-manifest.json`. Palaidiet `npm run check:gate-manifest`, lai pārbaudītu
skriptu nosaukumus un precīzās komandas pret `package.json`; papildinājumi, noņemšana un
komandu novirzes izraisa kļūmi gan lokālajā āķī, gan izmaiņu klasifikācijas uzdevumos CI.
Aizstājvārds nav darbplūsmas uzdevums, matricas instance vai testa gadījums: šos skaitļus
nedrīkst uzrādīt kā savstarpēji aizvietojamus.

Izmantojiet `npm run quality:scan -- --list` vai `npm run quality:scan:fast -- --list`,
lai pārbaudītu atlasītos aizstājvārdus, tos neizpildot. Izpildītājs izsauc npm ieejas punktu,
tādēļ tiek saglabāta tā izpildlaika vide (tostarp Bun, ja tas ir konfigurēts).
Manifests reģistrē ārpus šiem profiliem esošos aizstājvārdus kā atsevišķi izsaucamus, un
uzturēšanas komandas ir aizliegtas tikai lasāmas skenēšanas profilos.

Šie profili aptver tikai statisko skenēšanu. Tie neapliecina produkta testus, pārklājumu,
pakotņu veidošanu, ārējās pārbaudes vai kandidāta pilnu laidiena pieņemšanu. Darbplūsmas
uzņemšana izmanto saistīto `config/quality/admission-policy.json` un
`scripts/quality/admission-verdict.mjs`. Release-observer profili paliek atsevišķi;
neatkarīgi pārbaudiet to piemērojamās pārbaudes un apliecinājumus. Pilnā observer statiskās
komandas ir deklarētas `config/quality/release-green-static-profile.json`, tostarp
`audit:deps`, mutāciju testu atlase un tulkojumu pārbaudes. Ielādētājs pārbauda npm komandas
pret package.json un modelētajām CI/Quality deklarācijām; tas noraida novirzes, nevis izpilda
čaulas tokenus kā argumentus. Obligātā skenera SKIP/INCOMPLETE izvade nevar izveidot PASS.
Profils reģistrē savus ārējos izņēmumus un neaizstāj viesoto pārklājumu, testu matricas,
pakotņu vai izvietošanas pierādījumus. Tālāk sniegtais prozas inventārs ir atsauce, nevis
pierādījums tam, ka vārti faktiski tika palaisti.

Skripti atrodas `scripts/check/` (politikas vārti) un `scripts/quality/` (ratchet dzinējs).
CI patiesais avots ir `.github/workflows/ci.yml`.

### Laidiena PR ātrais ceļš (`quality.yml`)

`.github/workflows/quality.yml` papildina CI uz main/release PR, nosūtīšanā uz `main`,
dispatch un merge group notikumos. PR izmanto pēc ceļiem filtrētas ātrās pārbaudes.
Pastāvīgi atspējotā dublētā būvēšana tika noņemta; reālās būvēšanas/pakotņu/palaišanas
pārbaudes paliek CI. Vienību komplekts un vitest tiek palaisti tikai CI (`Unit Tests (N/8)`
un `Vitest`).

| Darbs                                            | Tvērums                                                                                                                                     | Bloķējošs      |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | Dokumentācijas/koda PR; API dokumentācijas atsauces un docs-all                                                                             | Jā             |
| `Fast Quality Gates`                             | Koda PR; statiskās pārbaudes, tipa pārbaude, paneļa tipa pārbaude, ietekmētie vienību testi, aizmirstie saistīto moduļu testi (informatīvi) |
| `No new ESLint warnings`                         | Koda PR; apspiešanu ņemošs lintera aizsargs                                                                                                 | Jā, arī forkos |
| `Merge integrity (changelog + generated skills)` | Ne-melnraksta PR; izmaiņu žurnāla un ģenerēto prasmju sinhronizācija                                                                        | Jā, arī forkos |

#### Aizmirsto saistīto moduļu testu pārskats

`npm run check:forgotten-sibling-tests` darbojas kā informatīvs `Fast Quality Gates` solis un atkārtoti izmanto
importēšanas atrisinātāju, kas atrodas testu ietekmes kartes pamatā.
Katram mainītajam produkcijas modulim tas ziņo deterministiskas
`changed module/symbol -> static consumer -> candidate sibling test` ķēdes, ja kandidāta
testa nav pull request diffā. Markdown kopsavilkums un JSON rezultāts tiek saglabāti kā
`forgotten-sibling-tests` darbplūsmas artefakts kalibrēšanai pirms jebkādas bloķējošas ieviešanas.

Barelu atkārtotie eksporti un dinamiskie importi ir tikai atrisināšanas diagnostika; tie nekad nerada
bloķējošu atradni. Pārskatītie izņēmumi atrodas
`config/quality/forgotten-sibling-allowlist.json`. Katrā ierakstā jānorāda patērētājs un kandidāta
tests, jāsniedz konkrēts pamatojums un jāietver saite uz GitHub issue vai pull request. Nederīgi ieraksti izraisa drošu
atteici. Izņēmumi nevar apspiest dzēstu kandidāta testu vai diffu, kas pievieno `.skip`/`.todo`;
apgalvojumu vājināšana un cita maskēšana joprojām ir neatkarīgi bloķējošās
`check:test-masking` pārbaudes pārziņā.

### Darbs: `lint`

Darbojas katrā PR uz `main`. Kļūmes gadījumā bloķē sapludināšanu.

| Skripts (`npm run ...`)           | Validē                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Bloķējošs                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `check:node-runtime`              | Node.js versija atrodas atbalstītajā diapazonā                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jā                                                 |
| `check:cycles`                    | Cikliskie importi visā `src/` + `open-sse/` (balstīts uz AST, `tsconfig` `paths` atrisināti). Bare iziet ar kodu 1, ja pastāv kaut viens cikls (kopš #15281 tiek izmantota kļūmju novēršanas pieeja) un uzskaita SCC. `check:cycles:ratchet` (to palaiž CI) bloķē, ja skaits pārsniedz `quality-baseline.json` `metrics.cycles` griestus — pašlaik 14, `direction: down`, tāpēc tas var tikai samazināties (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Jā (ratchet)                                       |
| `check:boundary`                  | `open-sse → src` sasaistes: unikālie failu–faila importi no dzinēja uz lietotni (`scripts/quality/measure-boundary.mjs`; malu saraksts ir v4 kodola/moduļu sadalīšanas novēršanas darbu saraksts). Bare = informatīvs pārskats (tāds pats kā `quality:boundary`). `check:boundary:ratchet` (to palaiž CI, arī `quality.yml` ātro vārtu ratchet ciklā) bloķē, ja skaits pārsniedz `quality-baseline.json` `metrics.boundaryOpenSseToSrc` griestus — sākotnēji iestatīti uz izmērīto 771, `direction: down`; `--update` tos tikai samazina; PR izmaiņām tiek izmantota bāzes relatīvā vērtība (`--base-ref`, skatiet tālāk)                                                                                                                                                                                                                                                                                                                                                                                                                              | Jā (ratchet)                                       |
| `check:route-validation:t06`      | Zod shēmas ir pieejamas visos maršrutos (6. līmeņa politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jā                                                 |
| `check:any-budget:t11`            | `@ts-expect-error // any` count does not exceed budget (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jā                                                 |
| `check:provider-consistency`      | Katram pakalpojumu sniedzējam failā `providers.ts` ir atbilstošs ieraksts failā `providerRegistry.ts` (un otrādi, atļauto saraksta ietvaros)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jā                                                 |
| `check:model-lifecycle`           | Trīs manuāli uzturētās maršrutēšanas tabulas ir savstarpēji konsekventas ar repozitorijā iekļauto dzīves cikla momentuzņēmumu (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nepiešķir vērtējumu nevienam pensionētam identifikatoram, kuru `REGISTRY` var maršrutēt; katrs `BUILT_IN_ALIASES` mērķis atrodas `REGISTRY` un nav pensionēto identifikatoru momentuzņēmumā; katrs pensionētais identifikators, kas joprojām atrodas `REGISTRY`, tiek pārsūtīts vai ir norādīts `allowedRetiredInCatalog`; un neviens `DEFAULT_DEGRADATION_MAP` avots vai mērķis šajā momentuzņēmumā nav atzīmēts kā pensionēts. Tas nepierāda, ka modeli pašlaik apkalpo aktīvs augšupējais pakalpojums. Darbojas bezsaistē — salīdzina ar `config/quality/model-lifecycle.json`, kas manuāli tiek atjaunināts ar `npm run quality:refresh-model-lifecycle` (nepieciešams tīkls; nav integrēts CI). `allowedRetiredInCatalog` ir pakāpeniskas samazināšanas slieksnis: pievienojiet ierakstu tikai kopā ar izsekošanas uzdevumu.                                           | Jā                                                 |
| `check:fetch-targets`             | Katrs `fetch("/api/...")` klienta puses `src/` direktorijā tiek atrisināts līdz reālam `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Jā                                                 |
| `check:deps`                      | Visas `npm install` instalējamās atkarības katrā repozitorija `package.json` failā ir iekļautas failā `dependency-allowlist.json`; tiek atzīmētas jaunas nepiespraustas vai slopsquatotas pakotnes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jā                                                 |
| `audit:deps`                      | Visu piecu neatkarīgo bloķēšanas failu (saknes, Electron, OpenCode spraudņu v1/v2 un pakalpojumu sniedzēja) npm audits. Kritiskie ieteikumi par drošības ievainojamībām bloķē procesu; augstas prioritātes ieteikumi paliek redzami kā brīdinājumi. Trūkstoši vai neveiksmīgi auditi tiek uzskatīti par NEPABEIGTIEM un bloķē procesu; katras darbības jomas bloķēšanas failu jaucējvērtības un pārskati tiek saglabāti.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jā                                                 |
| `check:lockfile`                  | `package-lock.json` integritāte — https reģistrs, integritātes jaucējvērtības, bez resursdatora aizstājējiem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jā                                                 |
| `check:licenses`                  | SPDX licenču atļauju saraksts ražošanas atkarībām                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Jā                                                 |
| `check:tracked-artifacts`         | Nav būvēšanas artefaktu / pievienotu `node_modules` simbolisko saišu (tiek palaista arī husky pre-commit režīmā; pre-push apzināti ir minimāls — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jā                                                 |
| `check:ai-attribution`            | PR komitēs, virsrakstā vai pamattekstā nav AI/bota `Co-Authored-By` piekabes vai AI ģenerēšanas kājenes — stingrais noteikums #16 ( `quality.yml` ātro vārtu ciklā PR→`release/**` — nolasa notikuma lietderīgo slodzi, ārpus PR ir tukšdarbība — un tikai PR paredzētā darbībā `ci.yml` linterī PR→`main`; arī husky `commit-msg` āķī; cilvēku līdzautori ir atļauti; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | Katram Vitest izņēmumam ir norādīta izsekošanas problēma, un tas parādās failā `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jā                                                 |
| `check:file-size`                 | Avota faili (`.ts`/`.tsx` mapēs `src/`, `open-sse/`, `electron/`, `bin/`) nepārsniedz `cap`, bet testu faili (`*.test.ts(x)`) — `testCap`; failu, kas iesaldēti failā `file-size-baseline.json` (`frozen` / `testFrozen`), izmērs nedrīkst pārsniegt tajā reģistrēto izmēru                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jā                                                 |
| `check:error-helper`              | Kļūdu atbildēs izpildītājos/apdarinātājos tiek izmantotas `buildErrorBody()` / `sanitizeErrorMessage()` (Stingrais noteikums #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Jā                                                 |
| `check:migration-numbering`       | Migrācijas SQL faili ir numurēti secīgi, bez izlaidumiem vai dublikātiem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jā                                                 |
| `check:public-creds`              | Ārpus `publicCreds.ts` nav burtisku OAuth `client_id`/`client_secret` vai Firebase tīmekļa atslēgu (Stingrais noteikums #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jā                                                 |
| `check:db-rules`                  | Ārpus `src/lib/db/` moduļiem nav neapstrādāta SQL; no `localDb.ts` netiek veikti mucas importi (Stingrie noteikumi #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jā                                                 |
| `check:known-symbols`             | Pakalpojumu sniedzēju izpildītāji, maršrutēšanas stratēģijas un tulkotāji, kas reģistrēti to nosūtīšanas tabulās, atbilst diskā esošajiem failiem — nav neizmantotu vai nedeklarētu simbolu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jā                                                 |
| `check:route-guard-membership`    | Katrs maršruts, kas palaiž bērnprocesu, tiek klasificēts, izmantojot `isLocalOnlyPath()` (Stingrie noteikumi #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jā                                                 |
| `check:test-discovery`            | Katru `*.test.ts` / `*.spec.ts` failu repozitorijā apkopo vismaz viens testu palaidējs (ratchet: neaprīkoto failu saraksts failā `test-discovery-baseline.json` var tikai sarukt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Jā                                                 |
| `check:test-tla-order`            | Neviens `node:test` fails mapē `tests/unit` nereģistrē testu, nesasniedz augstākā līmeņa `await` un pēc tam nereģistrē vēl citus testus (#18045; ratchet: `test-tla-order-allowlist.json` var tikai sarukt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jā                                                 |
| `check:agent-skills-sync`         | Ģenerētie aģentu prasmju artefakti atbilst to avota katalogam (nav noviržu). Izlaides režīmā tiek pārbaudīta katra prasme; funkcionalitātes PR (`pr` režīmā) pārbauda tikai tās prasmes, kuru ģenerēto tekstu tas maina — skatiet [Ģenerētie faili un atvasinātās bāzes līnijas](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | Pakalpojumu sniedzēju logotipiem/resursiem ir reģistrēts izcelsmes ieraksts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | JSON konfigurācijas faili tiek parsēti un atbilst repozitorija lint noteikumiem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | TypeScript kompilācija bez kļūdām (informatīvi brīdinājumi ir pieļaujami)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jā                                                 |
| `typecheck:noimplicit:core`       | Stingrs `noImplicitAny` — vērsts uz nākotni; daudzām jau esošajām izsaukuma vietām vēl nepieciešamas anotācijas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Ieteikuma pārbaude** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, kas attiecināts uz `src/app/(dashboard)/**` (#7033) — `typecheck:core` atlasītais 27 failu atļautais saraksts neietver nevienu dashboard TSX failu, un arī `next build` nekad neveic tā tipa pārbaudi (`next.config.mjs` iestata `ignoreBuildErrors: true`), tāpēc bāreņidentifikatoru regresijas tur (#6625/#6909) CI bija neredzamas. Veic salīdzināšanu ar iesaldētu katra faila/TS koda skaita bāzlīniju (`config/quality/dashboard-typecheck-baseline.json`, tāds pats novecojušas ievērošanas modelis kā `check:known-symbols`) — vārteju neiztur tikai JAUNI kļūdu skaiti, kas pārsniedz bāzlīnijā norādīto; samaziniet skaitu ar `--update`, kad iepriekš esoša kļūda ir izlabota.                                                                                                                                                                                                                                                                                                                                                      | Jā                                                 |
| `check:build-typecheck`           | Visas lietotnes produkcijas tipa pārbaude, izmantojot `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), ko neaptver ne `typecheck:core` 27 failu atļautais saraksts, ne dashboard vārteja. Veic salīdzināšanu ar `config/quality/build-typecheck-baseline.json`; jauna vai palielināta katra (faila, koda) skaita vērtība izraisa kļūmi, bet mazāks skaits pieprasa veikt ratchet. `--update` atsakās darboties, ja izpildes laikā ir jauns vai palielināts pāris, ja vien netiek nodots `--force-regressions`, un atsakās no jauna apklusināta faila, ja vien netiek nodots `--force-nocheck`; tādējādi bāzlīnijas paplašināšana, lai iegūtu veiksmīgu rezultātu, un pastāvīgas klusēšanas piešķiršana ir divas atsevišķas, apzinātas darbības. Vienkāršs `--force` tiek noraidīts. Tā arī pārbauda, vai būvēšanas tvērumā nav `@ts-nocheck`, salīdzinot ar `config/quality/ts-nocheck-baseline.json`, jo fails, kas to izmanto, neziņo par diagnostiku vispār un citādi būtu neredzams katrai vārtejai. | Jā                                                 |

#### Divas tipa pārbaudes programmas sniedz atšķirīgas atbildes

`typecheck:core` un `check:build-typecheck` kompilē atšķirīgas programmas ar atšķirīgām
opcijām, un viens un tas pats fails vienā var būt bez kļūdām, bet otrā — pilns ar kļūdām.

`tsconfig.build.json` iestata `"strict": false`, tāpēc `noImplicitAny` ir izslēgts. Core
konfigurācija kompilē atlasītu 27 failu atļauto sarakstu ar stingrākām opcijām un seko katra
ieraksta importēšanas grafei, tāpēc faili, kas nekad neparādās būvēšanas programmā, tur
joprojām tiek pārbaudīti.

Tas ir svarīgi, novērtējot, vai fails ir tipizēts: **nulle diagnostikas
`check:build-typecheck` rezultātā nenozīmē, ka kļūdu nav**. Noņemot `@ts-nocheck` no 26
failiem, izrādījās, ka 23 no tiem būvēšanas programmā ir bez kļūdām; sešpadsmit no tiem
stingrajā programmā atklāja aptuveni 120 implicit-any kļūdas. Pirms faila atzīšanas par tīru
pārbaudiet abas programmas.

### Darbs: `quality-gate`

Tiek palaists pēc `test-coverage`. Kļūmes gadījumā bloķē sapludināšanu.

| Skripts                      | Pārbauda                                                                                                                                                                                               | Bloķējošs          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `quality:collect`            | Izveido `quality-metrics.json` (ESLint brīdinājumu skaits, pārklājums no apvienotā shard pārskata)                                                                                                     | Jā (pirms ratchet) |
| `quality:ratchet`            | Katrs rādītājs failā `quality-baseline.json` nav pasliktinājies (ESLint brīdinājumi ≤ bāzlīnijai; pārklājums ≥ bāzlīnijai)                                                                             | Jā                 |
| `check:duplication`          | Koda dublēšanās (jscpd@4) nepārsniedz bāzlīniju failā `quality-baseline.json`                                                                                                                          | Jā                 |
| `check:complexity`           | Faila līmeņa cikliskā sarežģītība nepārsniedz ierobežojumu (kodola ESLint `complexity` + `max-lines-per-function`)                                                                                     | Jā                 |
| `check:cognitive-complexity` | Kognitīvās sarežģītības ratchet (`eslint-plugin-sonarjs`) — atsevišķa ESLint pārbaude; CI abas apvieno vienā `check:complexity-ratchets` darbībā                                                       | Jā                 |
| `check:dead-code`            | Neizmantoto eksportu / failu ratchet (knip) nepasliktinās salīdzinājumā ar bāzlīniju                                                                                                                   | Jā                 |
| `check:compression-budget`   | Saspiešanas etalona budžets — ietaupīto tokenu minimums katram dzinējam nedrīkst pasliktināties                                                                                                        | Jā                 |
| `check:type-coverage`        | Tipizētā procentuālā apjoma ratchet (`type-coverage`) nepasliktinās; lielā mērā ietver `typecheck:noimplicit:core`                                                                                     | Jā                 |
| `check:codeql-ratchet`       | Atvērto CodeQL brīdinājumu skaits nepasliktinās (nolasa, izmantojot `gh api`; bez tokena tiek pieklājīgi izlaists) — atsvaidzināšanas biežumu un manuālo palaidi skatiet tālāk sadaļā “CodeQL ratchet” | Jā                 |
| `check:type-scale-ratchet`   | Kit tipogrāfijas skala: izmēri, kas mazāki par 12 px, un `font-bold` tikai `src/` mapē drīkst tikai samazināties (`typeScaleSubFloorSizes`, `typeScaleFontBold`); arī pre-commit āķī                   | Jā                 |

### Darbs: `quality-extended`

Jaukts darbs bez darba līmeņa `continue-on-error`: darbība, kas nodod `--ratchet`, regresijas gadījumā salīdzinājumā ar `quality-baseline.json` neizdodas un viss darbs neizdodas. Tikai `check:circular-deps` un skeneru instalēšanas darbība ir informatīvas (darbības līmeņa `continue-on-error: true`). Ārējie skeneri tiek instalēti, izmantojot `gh release download`; `check:secrets` pati sevi izlaiž (iziet ar kodu 0), ja gitleaks nav pieejams, savukārt `check:vuln-ratchet`, `check:workflows` un `check:openapi-breaking` neizmērījamas vērtības gadījumā neizdodas.

| Skripts                  | Pārbauda                                                                                                                                                                                                                                                          | Bloķējošs                                          |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `check:circular-deps`    | Nav cirkulāru atkarību (dpdm)                                                                                                                                                                                                                                     | **Informatīvs**                                    |
| `check:bundle-size`      | Pakotnes izmērs nepārsniedz ierobežojumu; arī neizmērāms izmērs izraisa kļūmi                                                                                                                                                                                     | **Bloķējošs ar --ratchet**                         |
| `check:secrets`          | Noslēpumu skenēšana (gitleaks) — tiek izlaista, ja binārais fails nav pieejams                                                                                                                                                                                    | **Bloķējošs ar --ratchet**                         |
| `check:vuln-ratchet`     | Atkarību ievainojamības (osv-scanner) nepasliktinās — `--ratchet` neizmērīta rezultāta gadījumā neizdodas ar INCOMPLETE (izejas kods 2)                                                                                                                           | **Bloķējošs ar --ratchet**                         |
| `check:workflows`        | Darbplūsmu lint pārbaude (actionlint + zizmor); trūkstoši/nederīgi skeneri, nederīgi pārskati vai trūkstoša ratchet bāzlīnija izraisa INCOMPLETE. Derīgi atradumi tiek apstrādāti saskaņā ar izvēlēto stingro, informatīvo vai ratchet politiku                   | Izpilde obligāta; zizmor ratchet CI vidē bloķējošs |
| `check:openapi-breaking` | Publiskais API līgums pret piesaistītajiem notikumu komitiem (PR merge-base, push pirms merge-base, merge-group bāze; ieplānotas/manuālas darbības gadījumā vispirms tiek veikta pirmā vecāka checkout); nepieciešamais mērījums neizmērīšanas gadījumā neizdodas | **Bloķējošs ar --ratchet**                         |

### Darbs: `docs-sync-strict`

Tiek palaists katrā PR uz `main`. Kļūmes gadījumā bloķē sapludināšanu.

| Skripts                        | Validē                                                                                                                                                                                      | Bloķējošs                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Metavārte, kas secīgi palaiž tālāk norādītās 6 apakšvārtes                                                                                                                                  | Jā                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI versiju konsekvence; laidiena režīmā arī 66 `llm.txt` spoguļkopijas un tulkotās CHANGELOG sadaļas (PR režīmā: spoguļkopijas sakrīt)                                     | Jā                         |
| ↳ `check:docs-counts`          | Skaitļi prozā (nodrošinātāju skaits, migrāciju skaits u. c.). Divi režīmi: `pr` funkciju PR, `release` citos gadījumos — skatiet tālāk sadaļu “Atvasinātās vērtības”                        | Jā                         |
| ↳ `check:env-doc-sync`         | Katrs vides mainīgais `.env.example` failā ir dokumentēts dokumentācijas tabulā, un otrādi                                                                                                  | Jā                         |
| ↳ `check:deprecated-versions`  | Dokumentācijā nav novecojušu versiju virkņu                                                                                                                                                 | Jā                         |
| ↳ `check:doc-links`            | Iekšējās Markdown saites dokumentācijā norāda uz reāliem failiem (`[text]`/`(path)` formāts)                                                                                                | Jā                         |
| ↳ `check:fabricated-docs`      | Dokumentācijā minētie maršruti, vides mainīgie, CLI komandas, āķu nosaukumi un failu ceļi eksistē kodbāzē. Stingra vārteja ar `--strict`; bez karoga kļūme ir nebloķējoša.                  | Jā (ar `--strict` CI vidē) |
| `check:cli-i18n`               | CLI `t()` atslēgas eksistē failā `bin/cli/locales/en.json` (abi režīmi); pt-BR / zh-CN / zh-TW atbilstība `en.json` tikai laidiena režīmā                                                   | Jā                         |
| `check:openapi-coverage`       | OpenAPI specifikācija aptver vismaz ratchetētu reālo maršrutu slieksni                                                                                                                      | Jā                         |
| `check:openapi-security-tiers` | Drošības līmeņu anotācijas failā `openapi.yaml` atbilst `routeGuard.ts` klasifikācijām                                                                                                      | **Ieteikuma**              |
| `check:openapi-routes`         | Katrs ceļš failā `openapi.yaml` atbilst reālam `route.ts` (halucināciju novēršana)                                                                                                          | Jā                         |
| `check:docs-symbols`           | Katra `/api/...` atsauce failos `docs/**/*.md` atbilst reālam `route.ts` (halucināciju novēršana)                                                                                           | Jā                         |
| `i18n translation drift`       | `docs/i18n/**` spoguļkopijas pret `.i18n-state.json` — PR gadījumā ieteikuma pārbaude (spoguļkopijas tiek atjauninātas tulkošanas plūsmā), stingra pārbaude push un nakts izpildes gadījumā | **Ieteikuma** PR gadījumā  |

#### Tulkojumu spoguļkopijas ir atvasināti faili (PR režīms pret laidiena režīmu)

Funkciju PR izmaiņas tiek veiktas tikai angļu valodas avotos. `docs/i18n/<locale>/**` spoguļkopijas (tostarp 66
`llm.txt` kopijas un tulkotie `CHANGELOG.md` faili) un `.i18n-state.json` tiek pārrakstīti vienā
darbībā tulkošanas plūsmā (`docs/i18n-*` / `chore/i18n-*` zari, ieplānotais
`i18n-mirror-refresh.yml`) un laidiena laikā (`npm run release:sync-changelog-i18n`). Tādēļ spoguļkopiju
vārtes darbojas divos režīmos, ko nosaka `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`,
pēc tam `OMNIROUTE_GATE_MODE`, pēc tam Actions notikums; lokālas izpildes gadījumā — `release`):

- `check:docs-sync` — izlaides režīmā palaiž visas pārbaudes. PR režīmā saglabā package.json/OpenAPI versiju,
  saknes CHANGELOG virsrakstus un aizstātu dokumentu aizsargpārbaudi, kā arī izdrukā
  `SKIP reason=pr-mode` `llm.txt` spoguļkopijām un tulkotajām CHANGELOG sadaļām —
  ja vien PR neraksta spoguļkopijas: galvenā zars, kas `config/quality/derived-paths/*.json` failos deklarēts kā
  `docs/i18n/**` saimes rakstītājs, palaiž abas pārbaudes striktā režīmā, un, ja diff bāzi
  izdodas atrisināt, izmaiņa, kuras paša diffā rediģēts `docs/i18n/<locale>/llm.txt` vai `CHANGELOG.md`, palaiž
  attiecīgo pārbaudi striktā režīmā. Diff bāzi nevar atrisināt depth-1 checkout režīmā (`docs-sync-strict`
  darbā), tāpēc PR režīms palaiž arī vienu pārbaudi, kurai bāze nav vajadzīga: katrai
  `llm.txt` spoguļkopijai ir jāeksistē, jāsaglabā tās `---` atdalītājs un jāietver vai nu saknes pamatteksts,
  vai pamatteksts, kas kopīgs lielākajai daļai spoguļkopiju. Ja bāze ir mainījusies, visas spoguļkopijas kļūst
  vienādi novecojušas, un pārbaude iziet veiksmīgi; manuāla vienas spoguļkopijas rediģēšana izraisa kļūmi.
  Tulkotajiem `CHANGELOG.md` failiem depth-1 PR checkout režīmā šādas pārbaudes nav.
- Pre-commit āķis palaiž `check-docs-sync.mjs --mode=pr`: commit tiek vērtēts pēc tā, ko tas dara.
  Bez karoga lokāla palaišana notiek izlaides režīmā, un viens sapludināts PR, kas rediģē saknes `llm.txt`,
  bloķētu katru nākamo commit uz šīs bāzes, līdz tiktu palaists vilnis. Tas pats noteikums attiecas uz jebkuru
  režīmatkarīgu vārteju, ko palaiž Husky āķis: āķis padod `--mode=pr`, bet striktā sprieduma pienākums paliek
  izlaides režīma palaišanām (izlaides PR, push uz `main`, vienkārša lokāla palaišana).
- Spoguļsatura vienības testi (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`,
  `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`,
  `docs/*-locales`) — izlaides režīms pārbauda katru lokalizāciju. PR režīms pārbauda tikai tās spoguļkopijas, kas
  saskaņā ar `.i18n-state.json` ir aktuālas attiecībā pret angļu valodas avotu (visa faila jaucējvērtība vai
  reģistrētā tās sadaļas jaucējvērtība, kuru tests piesaista), bet novecojušās izlaiž, norādot iemeslu.
  `target_hash` izcelsmes pārbaudes abos režīmos tiek veiktas katrai lokalizācijai. Aktualitāte tiek noteikta katrai `## `
  sadaļai, ko jauc vienība `run-translation.mjs`; gara sadaļa (šī faila vārteju uzskaite veido aptuveni pusi no tā)
  nozīmē, ka jebkura tās rediģēšana padara šīs spoguļkopijas novecojušas, un to PR režīma apgalvojumi tiek izlaisti
  līdz nākamajam vilnim. Ja avots angļu valodā vairs nesatur enkuru, tiek izmantots visa faila salīdzinājums.
- `i18n translation drift` — konsultatīva PR gadījumā, strikta push, nakts palaišanas un izlaides izveides
  gadījumā, lai novecojusi spoguļkopija nevarētu nonākt izlaidumā.

`scripts/i18n/sync-llm-mirrors.mjs` (eksportēts arī kā `syncLlmMirrors()`, ar `--dry-run`)
pārraksta `llm.txt` spoguļkopijas; izlaides atsvaidzināšana, tulkošanas vilnis un ieplānotā
`i18n-mirror-refresh.yml` palaišana to izpilda (atsvaidzināšana ar sauso palaišanu nosaka novecojušās `llm.txt`
spoguļkopijas, jo novirzes pārskatā tās netiek uzskaitītas, un sinhronizē tās pirms `check:docs-all`).

Divpadsmit README SVG faili, kas atrodas `docs/diagrams/`, tiek ģenerēti (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` ģenerē tos visus atkārtoti). Katram ir baitu salīdzināšanas vienības tests
(`tests/unit/docs/readme-*-svg.test.ts`, darbs `test-unit`), kas izlaides režīmā neizdodas, ja commitā esošais fails
ir novecojis; PR gadījumā `check:generated-artifacts` vērtē SVG, ko PR rediģē, bet bāzes novirze tiek atstāta
izlaides atsvaidzināšanai (skatiet [Ģenerētie faili un atvasinātās bāzes vērtības, kas tiek ierakstītas izlaidē](#generated-files-and-derived-baselines-written-at-release)) — savukārt
`check:docs-counts` nolasa kanoniskos skaitļus no to `<text>` mezgliem — tāpēc kontūru veidošanas solis saglabā katru
kontūrā pārvērsto virkni failā kā neredzamu `<text>`. SVG kanonisko skaitļu pārbaude nolasa failus, kas uzskaitīti
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, kā arī `public/images/tier-flow-dark.svg` un `tier-flow-light.svg`;
apgalvojumi par free-forever, kataloga ierakstu, atkārtotu kopu un vērtēšanas faktoriem arī nolasa
`promise-pillars.svg`, `free-tier-budget.svg` un `strategies-grid.svg`. Skaitļi, ko šie ģeneratori attēlo
(providētāju kopskaits, MCP rīki, maršrutēšanas stratēģijas, free-forever providētāji u. c.), tiek iegūti no faktu
momentuzņēmuma `docs/reference/derived-facts.json`, izmantojot `scripts/docs/readmeFacts.mjs`, nevis no literāļiem,
tāpēc diagrammas atkārtota ģenerēšana jebkurā zarā reproducē commitā esošo failu.
`free-tier-budget.svg` rindas iegūst no tā paša momentuzņēmuma (`code.freeTierBudget`, kataloga kopsavilkuma, ko
reģistrē faktu pārbaude), tāpēc `FREE_MODEL_BUDGETS` izmaiņa sasniedz kartīti nākamajā atsvaidzināšanā, nevis padara CI sarkanu.

### Atvasinātās vērtības: `pr` un `release` vārtejas režīmi

Funkcijas PR nekad neieraksta vērtību, kas ir atkarīga no bāzes stāvokļa: providētāju, migrāciju,
MCP rīku un stratēģiju skaitu, README SVG skaitļus vai faktu momentuzņēmumu. Viens solis pārrēķina tos visus,
un `npm run release:refresh-derived` to palaiž izlaide un nakts atvasināto vērtību atsvaidzināšanas PR. Tāpēc
**starp izlaidēm bāze pēc būtības atpaliek no aktuālā koda**, un vārteja vai tests, kas salīdzinātu koku ar aktuālo
kodu, būtu sarkans katrā PR pēc tam, kad blakus PR pievienojis providētāju. Vārtejas, kas vērtē atvasinātās vērtības,
tāpēc darbojas vienā no diviem režīmiem, ko nosaka `scripts/check/lib/gateMode.mjs` (tiek izmantota pirmā atbilstība):

1. `--mode=pr|release` komandrindā;
2. `OMNIROUTE_GATE_MODE` vides mainīgais (`pr` vai `release`);
3. automātiski, pamatojoties uz GitHub Actions notikumu: `pull_request`, kura head nav `release/v*`,
   `merge_group` vai push uz `omni-queue/**` → `pr`; viss pārējais (push, schedule,
   dispatch, izlaides PR `release/v* → main`, jebkura lokāla palaišana) → `release`.

Ko `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) katrā režīmā atzīst par kļūmi:

| Režīms    | Neizdodas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Nepieciešami aktuālie fakti |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `release` | Katra pārbaude veic stingru vienādības pārbaudi pret no koka apkopotajiem faktiem (tāda ir vārtejas sākotnējā darbība): novecojis skaits, versija, pārklājuma minimums vai SVG skaitlis ir STINGRA novirze                                                                                                                                                                                                                                                                                                                       | Jā                          |
| `pr`      | Tikai izmaiņas, ko veica šis labojums, salīdzinot ar PR bāzi, izmantojot tos pašus apgalvojumu izgūšanas līdzekļus: (1) pārvaldīta vērtība, kas šai pārbaudei un failam bāzē nepastāvēja ("PR rediģēja pārvaldītu skaitli — atjaunojiet rindu atbilstoši bāzes tekstam"); (2) nepieciešams apgalvojums, kas bija bāzē, bet tika pazaudēts galvenajā zarā. Satura invarianti, kuriem fakti nav nepieciešami, tiek izpildīti tāpat kā `release` režīmā; tikai `release` režīmam paredzētās pārbaudes tiek uzskaitītas un izlaistas | Nē                          |

Aģenta instrukciju faili vispār nesatur atvasinātus skaitļus: `AGENTS.md`, `llm.txt` (un tā
`docs/i18n/*/llm.txt` kopijas), bs `AGENTS.md` atzars, `open-sse/services/AGENTS.md`,
`src/shared/constants/agentSkills.ts`, `skills/README.md` un katrs `skills/*/SKILL.md` norāda uz
avotu (piemēram, `ROUTING_STRATEGY_VALUES` failā `src/shared/constants/routingStrategies.ts`) un
tā vietā uz `npm run facts`. Invariants "Nav atvasinātu skaitļu (aģenta instrukciju fails …)"
abos režīmos neizdodas, ja tajā tiek atrasts skaits (nodrošinātāji, migrācijas, MCP rīki un tvērumi,
maršrutēšanas stratēģijas, vērtēšanas faktori, režīmu pakotnes), tāpēc laidiena atsvaidzināšanai
nekad nav jāpārraksta instrukciju fails.

Režīmā `pr` rakstītāja zari var rediģēt pārvaldītās vērtības: `chore/derived-*` (nakts
atsvaidzināšanas PR), `release/v*` un tulkošanas viļņi `docs/i18n-*` un `chore/i18n-*`
(`scripts/check/lib/derivedClaimsDiff.mjs`). Rindas pakešu (`merge_group`, Mergify melnraksti,
`omni-queue/**`) kandidāti netiek vērtēti atkārtoti: tie apkopo PR, kurus vārteja jau novērtēja
pa vienam.

Izejas kodi: `0` tīrs · `1` STINGRA novirze (vai nebūtiska novirze ar `--strict`) vai pārvaldītas
vērtības pārkāpums · `2` infrastruktūras kļūme — koda faktus neizdevās apkopot (`tsx` pārbaude
neizdevās vai iestājās taimauts; taimautu nosaka `OMNIROUTE_FACTS_TIMEOUT_MS`, noklusējums ir
600000 ms) vai arī CI vidē neizdevās atrisināt PR izmaiņu bāzi. Izejas kods 2 nekad nenozīmē
dokumentācijas neatbilstību: palaidiet darbu vēlreiz vai izlabojiet vidi.

Kur tiek palaists katrs režīms:

| Kur                                                                                                      | Režīms                                                                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Funkcijas PR — `ci.yml` uzdevums `docs-sync-strict`, `quality.yml` solis "Docs accuracy"                 | `pr` (automātiski); uzdevums nodod bāzi kā `BASE_SHA` un veic izrakstīšanu ar `fetch-depth: 2`                                                                                                                               |
| `merge_group`, `omni-queue/**` kandidāti, pilns sapludināšanas vilciena vārtejas saraksts                | `pr`                                                                                                                                                                                                                         |
| Laidiena PR (`release/v* → main`), nosūtījumi, ieplānotas un manuālas palaišanas                         | `release`                                                                                                                                                                                                                    |
| Release-Green (`scripts/quality/validate-release-green.mjs`)                                             | HARD vienumi tiek palaisti ar `OMNIROUTE_GATE_MODE=pr` ("vai bāze salūza?"); DRIFT vienums `derived-refresh` izpilda `npm run release:refresh-derived -- --check` (stingrais skats, nekad neizveido sarkanu bāzes rezultātu) |
| Laidiens (`/generate-release` 0a. un 1. fāze; prasmju sasaistes izmaiņas apstiprina atsevišķs īpašnieks) | `npm run release:refresh-derived` ieraksta atvasinātos failus; laidiena PR pašas pārbaudes pēc tam tiek palaistas `release` režīmā                                                                                           |
| `nightly-derived-refresh.yml` (katru dienu, augstākais `release/vX.Y.Z`, izlaižot release-freeze laikā)  | `npm run release:refresh-derived -- --profile=nightly`; ja ir atšķirības, tas uztur ATVĒRTU VIENU PR no `chore/derived-refresh`; nekad nesapludina                                                                           |

Komandas, kas to nodrošina:

- `npm run facts` izdrukā katru atvasināto skaitli JSON formātā (`scripts/release/facts.mjs`).
  `--key=code.mcpTools` izdrukā vienu vērtību, `--snapshot` nolasa apstiprināto momentuzņēmumu,
  nevis aktuālo koku. Iziet ar kodu 2, ja faktus nevar iegūt.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) vienā piegājienā pārrēķina
  atvasinātos failus šādā secībā (soļu identifikatori opcijai `--only=`): `provider-reference`
  (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (momentuzņēmums), `numbers` (skaitījumu vārtu
  pārrakstīšanas plāns tiek piemērots dokumentācijai un pēc tam pārnests uz to
  `docs/i18n/` spoguļiem), `readme-diagrams`, `skills` (ģenerētais `SKILL.md`),
  `e2e-timings` (izlaists, līdz kokā būs `syncE2eTimings`), `ui-keys` (izņem atslēgas, kuras
  `en.json` vairs nesatur, un ar `--rewritten-since=<ref>` — noklusējums `origin/main` — atkārtoti
  ievieto angļu vērtības, kas pārrakstītas kopš pēdējās relīzes), `llm-mirrors` un `verify-generated`
  (pēc ierakstīšanas `check:generated-artifacts` un `check:agent-skills-sync` relīzes režīmā ir
  jāizpildās veiksmīgi; tiek izlaisti režīmā `--check` un tad, ja `--only` tos neietver;
  kļūmes gadījumā iziet ar kodu 2). Solis `changelog` ir jāiespējo (`--with-changelog`) tikai
  relīzes profilā. `--profile=nightly` nekad nemaina versijas apgalvojumu. Ar `-- --check` nekas
  netiek ierakstīts, un tiek iziets ar kodu 1, ja kāds fails tiktu mainīts vai pārvaldītai vērtībai
  būtu nepieciešama manuāla rediģēšana (tiek uzskaitīti abi gadījumi); infrastruktūras kļūmes
  gadījumā iziet ar kodu 2. `--json` rezultātu izdrukā JSON formātā.
- `docs/reference/derived-facts.json` ir faktu momentuzņēmums, ko izmantoja pēdējā atsvaidzināšana.
  To raksta tikai atsvaidzināšanas process. README SVG ģeneratori to nolasa, un PR laikā vienības
  testi salīdzina apstiprināto dokumentāciju un ģenerētos failus ar to — nekad ar aktuālo kodu.
  Komplekta vienīgais salīdzinājums ar aktuālo kodu ir “relīzes atsvaidzināšana noslēdz ciklu”
  failā `tests/unit/check-docs-counts-sync.test.ts`: izmantojot aktuālos faktus, atsvaidzināšanas
  pārrakstīšanas plāna piemērošana atmiņā neatstāj nevienu STRICT novirzi, par kuru tas neziņo,
  un atkārtota plānošana neko nemaina.

Lai to reproducētu lokāli (lokāla palaišana pēc noklusējuma izmanto `release`):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

Ja nav atrisināmas bāzes (nav `BASE_SHA`/`BASE_REF` un lokāla `origin/release/v<version>`), lokāla
`pr` palaišana izdrukā brīdinājumu un izlaiž izmaiņu salīdzināšanu, nevis neizdodas.

### Darbs: `i18n-ui-coverage`

| Skripts                            | Validē                                                                                                                                                                                                        | Bloķējošs                 |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check-ui-keys-coverage` (iegults) | UI i18n atslēgu pārklājums ir ≥ 65%                                                                                                                                                                           | Jā (abos režīmos)         |
| `check:ui-icu`                     | Katrs katra UI kataloga ziņojums tiek kompilēts ar `IntlMessageFormat`                                                                                                                                        | Jā (abos režīmos)         |
| `check-ui-value-drift` (iegults)   | Pārrakstīta angļu **vērtība** neatstāj novecojušu tulkojumu                                                                                                                                                   | Jā (tikai relīzes režīmā) |
| `check-new-key-coverage` (iegults) | **Jauna** angļu atslēga ir iztulkota katrā lokalē — `__MISSING__:` marķieris tiek noraidīts                                                                                                                   | Jā (tikai relīzes režīmā) |
| `check-key-completeness` (iegults) | Katram UI katalogam (un ar `--catalog=cli` — katram CLI katalogam) ir tieši tāds pats atslēgu kopums kā tā `en.json`; `pr` režīmā katrs katalogs, ko PR mainīja, tiek salīdzināts ar sevi sapludināšanas bāzē | Jā (abos režīmos)         |
| `check-translation-ratio`          | Reālo tulkojumu attiecība katrā lokalē (identiski angļu tekstam / vietturi / trūkstoši ieraksti ārpus atļauju saraksta) nedrīkst pārsniegt `config/quality/i18n-translation-baseline.json` + pielaidi         | Jā (tikai relīzes režīmā) |

Nepieciešams `fetch-depth: 0` — vērtību noviržu vārti salīdzina `en.json` ar sapludināšanas bāzi.

**Divi režīmi (kopš 2026-11-13).** Funkcionalitātes PR pievieno vai pārraksta atslēgas failā
`en.json` (un `bin/cli/locales/en.json`) un neaizskar nevienu citu lokalizāciju;
`check:pr-derived-paths` (`pr-test-policy` darbs, `config/quality/derived-paths/translation.json`
saime) neizdodas funkcionalitātes PR, kas to dara. Pārējās lokalizācijas tiek pabeigtas reizi
katrā relīzē ar `release:refresh-derived`, kas izsauc `syncUiKeys()` failā
`scripts/i18n/sync-ui-keys.mjs` (pievieno trūkstošās atslēgas, izņem izņemtās, atzīmē pārrakstītas
angļu valodas tulkojumus ar `rewrittenSinceRef`, iztulko), vai tulkošanas viļņa laikā.
Vārti režīmu nolasa no `scripts/check/lib/gateMode.mjs`: `pr` režīmā (funkcionalitātes PR,
`merge_group`, `omni-queue/**`) iepriekš minētie relīzes režīma vārti izdrukā `SKIP reason=pr-mode`
un iziet ar kodu 0; `release` režīmā (relīzes PR, nosūtīšana uz `main`, `workflow_dispatch`,
lokālas palaišanas) tie darbojas tikpat stingri kā iepriekš, un relīzes PR gadījumā izmaiņu
jutīgie vārti saņem `BASE_REF=origin/main`, tādējādi pārbaudot katru cikla pievienoto vai
pārrakstīto atslēgu. Funkcionalitātes PR rezultātu lokāli var priekšskatīt ar `--mode=pr`.

PR, kas `pr` režīmā joprojām maina lokalizāciju katalogus (tulkošanas vilnis, laidiena atsvaidzināšana, tikai tulkojuma labojums), netiek izlaists: `check-key-completeness` katru mainīto katalogu salīdzina ar to pašu katalogu sapludināšanas bāzē (`scripts/i18n/lib/touched-catalogs.mjs`) un neizdodas, ja katalogs ir zaudējis atslēgu, `en.json` trūkst atslēgas, īsts tulkojums ir pārvērsts par `__MISSING__:` marķieri vai angļu tekstu, vai vērtība vairs neinterpolē angļu virknes vietturus/atzīmes, ja PR šo virkni nav mainījis. Katalogam, kas PR ir jauns, jāietver viss `en.json` atslēgu kopums. Tas attiecībā uz PR skartajiem katalogiem aptver to, ko redzētu attiecību un CLI paritātes vārti.

Lokalizāciju paritātes vienības testi (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) seko tiem pašiem režīmiem, izmantojot `tests/_helpers/localeParityMode.ts`: `pr` režīmā tie izlaiž atslēgu paritātes apgalvojumus un atstāj laidiena atsvaidzināšanai vietturu paritāti tām atslēgām, kuru angļu teksts ir mainījies kopš sapludināšanas bāzes (visām atslēgām, ja vienības testa seklā izgūšana nevar to nolasīt). Šis palīgrīks ir **vienīgais** sankcionētais režīmatkarīgais izlaidums:
`check:test-masking` uzskaita `.skip(` un `{ skip: true }`, bet ne aprēķināto `{ skip: "<reason>" }`, ko tas atgriež, tāpēc `tests/unit/locale-parity-mode.test.ts` fiksē to testu sarakstu, kuriem to atļauts izmantot — jauna testa pievienošana šim sarakstam ir pārskatāma izmaiņa.

#### `check-ui-value-drift` — novecojušu tulkojumu vārti

Uztver vienīgo i18n regresiju, ko pārējie vārti strukturāli nespēj pamanīt: angļu vērtība tiek pārrakstīta, bet tulkojumi, kas atvasināti no _iepriekšējās_ angļu vērtības, paliek nemainīti, tāpēc lietotāji, kas nelieto angļu valodu, turpina lasīt pārliecinoši formulētu, nu jau nepareizu tekstu.

Tas tika ieviests reālai lietošanai. `oauthModal.googleOAuthWarning` tika pārrakstīts, kad tika pievienots Antigravity pieteikšanās palīgs (#5203); **39 no 43 lokalizācijām** saglabāja tekstu, kas operatoriem lika “nokopēt pilno URL un ielīmēt to tālāk” — plūsmu, ko šis nodrošinātājs nespēj pabeigt. Tas palika nepamanīts līdz #8463, jo:

- `sync-ui-keys` aizpilda tikai **trūkstošas** atslēgas, nekad ne tādas, kas ir **novecojušas**;
- `check-ui-keys-coverage` uzskaita atslēgas _esamību_, tāpēc novecojis tulkojums tiek uzskatīts par aptvertu;
- `check-translation-drift` izseko `docs/i18n/<locale>/**.md` dokumentācijas spoguļiem —
  tas nekad nelasa `src/i18n/messages/*.json`. Tas darbojas darbā `docs-sync-strict`: PR gadījumā kā informatīvs, bet push un nakts izpildes gadījumā — stingri; tulkošanas vilnis atsvaidzina spoguļus, nevis funkcionalitātes PR.

**Apzinās atšķirības, nevis balstās uz bāzlīniju.** Tas salīdzina `en.json` sapludināšanas bāzē ar darba koku; katrai atslēgai, kuras angļu vērtība ir mainījusies, jebkura lokalizācija, kurā joprojām ir neaiztikts tulkojums, tiek uzskatīta par novecojušu. Tas apzināti **iesaldē iepriekš pastāvošo parādu** — atšķirība nevar atklāt, no kuras vecās angļu vērtības ir radies ilgstoši pastāvošs tulkojums, tāpēc vārti vērtē tikai to, kam pieskaras pašreizējās izmaiņas. Alternatīva (bāzlīnija ar jaucējvērtību katrai atslēgai) prasītu aptuveni 600 KB lielu ģenerētu failu, kas ir 3× lielāks par lielāko esošo bāzlīniju un mainītos katrā i18n PR.

To var izpildīt divējādi:

1. atjaunināt skartos tulkojumus; vai
2. iestatīt tos uz `__MISSING__:<new english>` — izpildlaiks pēc tam nodrošina laboto angļu tekstu (`src/i18n/request.ts::deepMergeFallback`, #7258), un atslēga tiek ievietota tulkošanas rindā.

Ja virknes **nozīme** ir mainījusies, dodiet priekšroku **atslēgas pārdēvēšanai**: jauna atslēga nevar pārņemt novecojušu tulkojumu. Tā rīkojās #8463.

```bash
npm run i18n:check-value-drift          # stingri (to palaiž CI)
npm run i18n:check-value-drift:warn     # tikai ziņot
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Atgriež kodu 0 ar `SKIP reason=base-unresolved`, ja bāzes katalogu nevar nolasīt (sekla klonēšana bez bāzes atsauces), līdzīgi kā `check-openapi-breaking`. Tikai laidiena režīmā: funkcionalitātes PR pārraksta angļu tekstu un ar to apstājas; laidiena atsvaidzināšana atzīmē aiz sevis atstātos tulkojumus (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, izmantojot to pašu `findStaleTranslations`).

### Darbs: `i18n`

Pilna i18n validācijas matrica (viens darbs katrai lokalizācijai). Viss darbs ir informatīvs.

| Skripts                         | Validē                                   | Bloķējošs                                                |
| ------------------------------- | ---------------------------------------- | -------------------------------------------------------- |
| `validate_translation.py quick` | Tulkojumu pilnīgumu katrai lokalizācijai | **Informatīvs** (`continue-on-error: true` visam darbam) |

### Darbs: `pr-test-policy`

Darbojas tikai pull request gadījumā.

| Skripts                | Validē                                                                                                                                                      | Bloķējošs |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR, kas maina produkcijas kodu mapēs `src/`, `open-sse/`, `electron/` vai `bin/`, jāietver vai jāatjaunina testi (Stingrais noteikums #8)                   | Jā        |
| `check:test-masking`   | Mainītie testa faili nesamazina kopējo apgalvojumu skaitu un nepievieno `assert.ok(true)` tautoloģijas                                                      | Jā        |
| `check:pr-evidence`    | PR aprakstā ir norādīti testa/VPS pierādījumi par izmaiņām (Stingrais noteikums #18 tiek mehāniski īstenots, meklējot PR tekstā — trausli, skatiet Backlog) | Jā        |

### Darbs: `test-vitest`

Darbojas pēc `build`. Kļūmes gadījumā bloķē sapludināšanu.

| Komplektācija    | Validē                                                            | Bloķējošs                                                                                                              |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveri (110 rīki), autoCombo, kešatmiņu — vitest izpildītājs | Jā                                                                                                                     |
| `test:vitest:ui` | UI komponentu testus — vitest izpildītājs                         | **Bloķējošs** — iepriekš pastāvošās kļūmes ir skaidri izslēgtas failā `vitest.config.ts`; jaunas kļūmes pārtrauc darbu |

### Nakts darbplūsmas (ieplānotas, informatīvas)

Tās tiek palaistas pēc cron grafika (un ar `workflow_dispatch`), nekad ne PR. Visas ir informatīvas.

| Darbplūsma             | Validē                                                                                                                                                                     | Bloķējošs       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | fast-check īpašību testus ar nejaušu sēklu + lielu palaišanas reižu skaitu                                                                                                 | **Informatīvs** |
| `nightly-resilience`   | heap pieauguma vārteju, haosa kļūmju ievadīšanu, k6 slodzes/izturības testus                                                                                               | **Informatīvs** |
| `nightly-llm-security` | promptfoo ievades aizsardzību (bloķēšanas režīmā) + garak zondes (tiek izlaistas bez nodrošinātāja noslēpuma)                                                              | **Informatīvs** |
| `nightly-schemathesis` | OpenAPI līguma fuzzēšanu (schemathesis) pret aktīvu OmniRoute, izmantojot `docs/openapi.yaml` — atklāj specifikācijas pārkāpumus / neapstrādātas 500. kļūdas (8. fāze B.4) | **Informatīvs** |
| `nightly-mutation`     | Stryker mutāciju testēšanas rezultātu ātro vienību testu posmā — izdzīvojušās mutācijas atklāj vājus apgalvojumus                                                          | **Informatīvs** |
| `nightly-compat`       | Node dzinēja saderības matricu visos atbalstītajos `engines.node` diapazonos                                                                                               | **Informatīvs** |

Veiktspējas bāzlīnijas (heap, TTFB, būvēšanas laiks) tiek reģistrētas, nevis izmantotas kā vārteja: skatiet [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

## Ātruma fāze (2026-08-30 → v4.0 LTS): katra bāzlīnija atvieglota par 20%

Īpašnieka lēmums (2026-08-30): līdz v4.0 modularizācijai piegādes ātrums ir svarīgāks
par parāda robežas noturēšanu. Katra **skaitliskā** ratcheta bāzlīnija tika atvieglota par 20% vienā
auditējamā piegājienā, un fāze ir deklarēta failā `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Kas mainīts                                                                                                                                                                                                                                                                | Kur                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — skaitļi, kur mazāka vērtība ir labāka, reizināti ar 1.2, procentuālās vērtības, kur lielāka vērtība ir labāka, dalītas ar 1.2 (pārklājuma minimums 60 saglabāts, `eslintErrors` paliek 0, `eslintWarnings` no 0 → 20% no iesaldētā apspiešanas skaita) | `quality-baseline.json` (`_relax_velocity_2026_08_30` piezīmē uzskaitītas visas iepriekšējās → jaunās vērtības) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                                           | `complexity-baseline.json`, `duplication-baseline.json`                                                         |
| `cap`, `testCap`, katra `frozen[*]` / `testFrozen[*]` rindu ierobežojums ×1.2                                                                                                                                                                                              | `file-size-baseline.json`                                                                                       |
| skaits katram failam / katram TS kodam ×1.2                                                                                                                                                                                                                                | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`          |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                                        | `scripts/check/check-openapi-coverage.mjs`                                                                      |
| `--require-tighten` kļūst par informatīvu pārbaudi, kamēr `_policy.requireTighten === false`                                                                                                                                                                               | `scripts/quality/check-quality-ratchet.mjs`                                                                     |
| nakts `bank-ratchet-shrinks` tiek apturēts (tas uzkrātu izmērīto samazinājumu un atceltu iegūto rezervi)                                                                                                                                                                   | `.github/workflows/nightly-release-green.yml`                                                                   |

Atļauju saraksti (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nav** budžeti, un tie netika mainīti. Izpildes/neizpildes politikas vārti (noslēpumi, SQL noteikumi,
dokumentācijas/vides līgums, i18n paritāte, vienību testi) nav mainīti — sarkans tests joprojām ir sarkans tests.

**Rīki**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — vienreizēja
  atvieglošana (`scripts/quality/relax-baselines.mjs`); atsakās darboties otrreiz ar tādu pašu piezīmi.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  izmēra katru skaitlisko vārtu tā, kā to dara CI, un izvada atlikušo rezervi katram vārtam
  (`scripts/quality/baseline-headroom.mjs`). Nakts `baseline-headroom` darbs publicē
  tabulu darbplūsmas izpildes kopsavilkumā un augšupielādē tā JSON/Markdown pārskatu kā
  `baseline-headroom-<run_id>`, saglabājot to 90 dienas. Brīdinājuma un kritiskās rindas identificē
  vārtus, kas atrodas 10% robežās no sava ierobežojuma vai to jau pārsniedz. Pārskatiet šos pārskatus
  kā agrīnu brīdinājumu par budžetu izlietošanu; pārbaudiet pārkāpjošo vārtu `_rebaseline_*` piezīmes.
  Darbs vairs neizveido un neatjaunina pastāvīgu problēmu; #12149 saglabā agrāko pārskatu vēsturi.

**Jaunā koda režīms (Clean-as-You-Code) — kopš 2026-08-30, tikai PR ātrā ceļa režīmā**

`pull_request` notikumos `quality.yml` nodod `--base-ref <PR base SHA>` komandām
`check:file-size`, `check:complexity-ratchets` un `check:dead-code`. Komandām `check:complexity-ratchets` un
`check:dead-code` vārti salīdzina HEAD ar merge-base, **ierobežojot salīdzinājumu ar PR skartajiem failiem**
(`scripts/check/newCodeMode.mjs`: merge-base tiek materializēts pagaidu
`git worktree`, ESLint/knip tiek palaisti tur un HEAD, bet katra faila skaits tiek salīdzināts):

- **bloķējošs** — PR pievienoja ciklomātiskā/kognitīvā sarežģītuma pārkāpumus vai mirušus eksportus failos, kurus tas mainīja
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` žurnālā);
- **informatīvs** — kopējais rezultāts pret iesaldēto bāzlīniju. Mantotā novirze nevainīgu PR nekad nepadara sarkanu; novirze tiek atkārtoti iesaldēta laidiena saskaņošanas laikā un uzraudzīta ar rezervju darbu.

`check:file-size` izmanto bāzes atsauci atbilstoši saviem noteikumiem (`scripts/check/check-file-size.mjs`, #8522):
tas pārbauda katru avota un testa failu kokā, nolasa katra faila rindu skaitu PR bāzē
ar `git show` un neizdodas tikai tad, ja fails pārsniedz lielāko no sava bāzlīnijas griestiem
(`frozen` / `testFrozen` vai `cap` / `testCap` failam, kas neatrodas bāzlīnijā) un tā bāzes izmēra. Fails,
kuram bāzē jau bija novirze, tādējādi nekad nepadara nevainīgu PR sarkanu.

`check:boundary:ratchet` piemēro to pašu noteikumu savam vienīgajam skaitlim
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR notikumu gadījumā gan
`quality.yml` ātrie vārti, gan `ci.yml` lintēšanas uzdevums nodod PR bāzes SHA, bāzes komits
tiek izmērīts no `git archive` eksporta, un PR neizdodas tikai tad, ja tā
`open-sse → src` malu skaits pārsniedz lielāko no `metrics.boundaryOpenSseToSrc` un bāzes skaita.
Par bāzes novirzi virs ierobežojuma tiek ziņots (`base drift herdado`), taču nevainīgs PR tādēļ
nekad netiek atzīmēts kā neveiksmīgs; `push → main` saglabā absolūto ierobežojumu, bet
neatrisināms bāzes SHA ar brīdinājumu atkāpjas uz to.

Omni-queue kandidāts (push uz `omni-queue/**`, skatiet [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md))
saņem tādu pašu apstrādi kā pull request: abas darbplūsmas nodod kandidāta bāzi
(`needs.changes.outputs.candidateBase`) kā `--base-ref`, un arī `check:ts7-diagnostics-ratchet`
tiek palaists pret to. Diviem jaunā koda vārtiem salīdzināšanas bāze ir tieši šis SHA, nevis
augstākā sapludināšanas komita pirmais vecāks, tādēļ tiek novērtēts katrs pakešu pull request.

`workflow_dispatch` palaišanām, release-green sweep un nakts headroom uzdevumam nav PR bāzes,
un tie saglabā absolūto (globālo) salīdzinājumu. Pārklājums, dublēšanās un tipa pārklājums pagaidām
paliek globāli (to rīki nevar pietiekami lēti izveidot katra faila diff) — kandidātiem piemērojama
tāda pati apstrāde.

**Fāzes noslēgšana pie v4.0 (LTS = stingrāks nekā iepriekš, nevis “atgriešanās pie normas”)**

1. Tīrajā `release/v4.0.0` gala stāvoklī: `npm run quality:headroom --json`, lai saglabātu ierakstu, pēc tam
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, kā arī katra tipa pārbaudes vārtu
   `--update` — katra bāzlīnija tiek samazināta līdz izmērītajai vērtībai.
2. Izdzēsiet `_policy` no `quality-baseline.json` (no jauna aktivizē `--require-tighten` un nakts
   uzkrāšanu), atjaunojiet `THRESHOLD = 36` (vai lielāku) failā `check-openapi-coverage.mjs`.
3. Pastipriniet ierobežojumus, pārsniedzot izmērīto tur, kur modularizācija ir devusi rezultātu:
   faila izmēra `cap` atkal iestatiet uz 1000 (vai 800), pārklājuma minimumus palieliniet par 5,
   bet modularizētajām pakotnēm neeksportēto elementu skaitu iestatiet uz 0.

## Ratchet bāzlīnija (`quality-baseline.json`)

Ratchet dzinējs (`scripts/quality/check-quality-ratchet.mjs`) nolasa `quality-baseline.json`
un salīdzina to ar tikko apkopoto `quality-metrics.json`. Jebkura metrika, kas regresē
vairāk par tai pieļaujamo epsilona vērtību, izraisa būvējuma kļūmi.

Pašlaik izsekojamās metrikas:

| Metrika               | Virziens | Nozīme                                        |
| --------------------- | -------- | --------------------------------------------- |
| `eslintWarnings`      | `down`   | ESLint brīdinājumu skaits nedrīkst pieaugt    |
| `coverage.statements` | `up`     | Priekšrakstu pārklājums nedrīkst samazināties |
| `coverage.lines`      | `up`     | Rindu pārklājums nedrīkst samazināties        |
| `coverage.functions`  | `up`     | Funkciju pārklājums nedrīkst samazināties     |
| `coverage.branches`   | `up`     | Zaru pārklājums nedrīkst samazināties         |

Lai atjauninātu bāzlīniju pēc reāla uzlabojuma:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Karodziņš `--update` ieraksta pašlaik izmērītās vērtības failā `quality-baseline.json`.
Uzlabojuma uzkrāšana ir laidiena/naktsdarbu uzdevums, nevis funkcionalitātes PR uzdevums:
`--require-tighten` (Fase 6A.5) neuzkrātu uzlabojumu uzskata par kļūmi tikai laidiena režīmā
(push, schedule, laidiena PR un lokālie palaidieni). Funkcionalitātes PR (`pr` vārtejas režīmā)
tas uzlabojumu parāda kā informāciju un veiksmīgi pabeidzas; regresija izraisa kļūmi abos režīmos.
Ātruma fāzes laikā tas visur ir tikai informatīvs
(`_policy.requireTighten: false`). Skatiet
[Ģenerētie faili un atvasinātās bāzlīnijas, kas tiek ierakstītas laidiena laikā](#generated-files-and-derived-baselines-written-at-release).

### CodeQL ratchet: atsvaidzināšanas biežums un manuālais aktivizētājs

`check:codeql-ratchet` nolasa **repozitorija stāvokli, kas tiek atsvaidzināts pēc grafika, nevis katram PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` ziņo
`state: configured`, `schedule: weekly`: GitHub noklusējuma iestatījumu skenēšana, nevis katram
push veicama analīze. Sekas: pēc tāda PR sapludināšanas, kas NOVĒRŠ brīdinājumus, ratchet
turpina nolasīt veco, lielāko skaitu līdz nākamajai ieplānotajai skenēšanai — tāpēc tas ziņo par
regresiju katrā atvērtajā PR, tostarp paša labojošā PR turpmākajos atjauninājumos, līdz skenēšana
panāk aktuālo stāvokli.

**Manuāla atsvaidzināšana**: `gh workflow run codeql.yml --ref release/vX.Y.Z` atkārtoti palaiž
analīzi un dažu minūšu laikā atkārtoti publicē brīdinājumus. Vispirms izlasiet `.github/workflows/codeql.yml`
— tā galvenē ir paskaidrots, ka tā darbojas tikai ar `workflow_dispatch`, **jo tas konfliktē ar
GitHub “default setup”** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`). `push`/`pull_request`/
`schedule` aktivizētāju atjaunošanai vispirms nepieciešama **īpašnieka darbība**: Settings → Code security →
CodeQL: Default → Advanced. Nepievienojiet `schedule:` aktivizētāju bez šīs pārslēgšanas — tas
tikai radīs kļūmīgus palaidienus.

**Pēc skaita samazināšanās sašauriniet bāzlīniju** — `node scripts/check/check-codeql-ratchet.mjs
--update` ieraksta jauno izmērīto skaitu failā `quality-baseline.json` →
`metrics.codeqlAlerts.value`, lai ratchet klusējot nepieļautu regresiju līdz vecajiem
griestiem. Darbības piemērs (2026-09-02/03): PR #12502 novērsa 7 reālus brīdinājumus
(13 → 6 izmērīti atvērtie brīdinājumi); PR #12530 sašaurināja iesaldēto bāzlīniju no 11 → 6,
lai tā atbilstu faktiskajam stāvoklim; pēc tam atlikušie 6 brīdinājumi ar atsevišķu pamatojumu
tika noraidīti, samazinot atvērto brīdinājumu skaitu līdz 0.

**Brīdinājumu noraidīšana ir operatora lēmums (Hard Rule #14)** — nekad nenoraidiet CodeQL brīdinājumu
bez tehniskā pamatojuma ierakstīšanas noraidīšanas komentārā: `won't fix`, ja to pieprasa
augšupējais protokols, `used in tests`, ja tas ir testa aprīkojums, `false positive`, ja tas ir
sanitizētājs, ko CodeQL nespēj saskatīt (precedents: `docs/security/ERROR_SANITIZATION.md`).

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

## Ģenerētie faili un atvasinātās bāzlīnijas (ierakstītas laidiena laikā)

Plāns 2026-11-13 („atvasinātie skaitļi un teksti tiek atrisināti tikai laidiena laikā”): funkcijas PR maina
**avotu** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, prasmju katalogu,
bezmaksas līmeņa katalogu un jaunu e2e specifikāciju. Tas nepārrēķina no šī avota iegūtos failus
un neieraksta izmērītu uzlabojumu bāzlīnijā. Šie faili tiek pārrakstīti vienreiz, veicot laidiena
atsvaidzināšanu (`release:refresh-derived`) vai nakts atsvaidzināšanas PR. Pirms tam katrs saistītais
PR ietvēra savu pārrēķināto kopiju, kas konfliktēja ar nākamo sapludināšanu (2026-11-13:
30 no 321 atvērtā PR pārrakstīja `PROVIDER_REFERENCE.md`, bet 26–28 pārrakstīja README diagrammas).

**Aizsargs.** `check:pr-derived-paths` (`pr-test-policy` darbs) neiztur funkcijas PR, kas maina
kādas saimes failu no `config/quality/derived-paths/`:

| Saime       | Faili                                                                                                                                                                                | Pārraksta                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; divpadsmit ģenerētie README SVG; `skills/*/references/**`; `SKILL.md` faili, kuriem nav pielāgota bloka | `release:refresh-derived` (fakti), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                    | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                     |

Rakstītāji (`release/v*`, `chore/derived-*` un `chore/bank-ratchet-*` bāzlīnijām) ir atbrīvoti no šī
ierobežojuma; tāpat arī PR, kas maina tikai vienu saimi kopā ar tās pavadošajiem failiem
(`generated` gadījumā — ģeneratoru skriptiem, to testiem, aģenta prasmju ievadēm —
`src/shared/constants/agentSkills.ts`, manuāli rakstīto `skills/**` dokumentāciju,
`docs/openapi.yaml` — un `changelog.d/**`), piemēram, varoņa izkārtojuma izmaiņu kopā ar
pārrēķināto SVG vai prasmju labojumu, kura tests nolasa pārrēķinātos `SKILL.md` failus.
`SKILL.md` fails ar manuāli rakstītu `<!-- skill:custom-start -->` bloku nav šajā saimē:
tā pielāgoto bloku drīkst rediģēt blakus funkcijas izmaiņām.

**Pārbaudes katram vārtu režīmam** (`scripts/check/lib/gateMode.mjs`; palīgs
`scripts/check/lib/derivedArtifactScope.mjs`):

| Pārbaude                                                                         | `release` (push, grafiks, laidiena PR, lokāli)                                   | `pr` (funkcijas PR, rindas pakete)                                                                                                                                                                                 |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:agent-skills-sync`                                                        | Katrai prasmei jāatbilst ģeneratora izvadei                                      | Tikai tām prasmēm, kuru ģenerēto tekstu (ārpus pielāgotā bloka) vai `references/` maina PR; citādi `SKIP reason=pr-mode`                                                                                           |
| `check:generated-artifacts` (README SVG + e2e laiki; nepieciešama pilna vēsture) | Katram SVG jāatbilst tā ģeneratoram; katrai specifikācijai jābūt laika ierakstam | Tikai tos artefaktus, kurus maina PR; pārējiem `SKIP reason=pr-mode`; ja nav diff bāzes → tiek vērtēts katrs artefakts (drošības nolūkā neveiksmīgs rezultāts)                                                     |
| README SVG baitu salīdzināšanas testi (`tests/unit/docs/readme-*-svg.test.ts`)   | Katrs SVG                                                                        | Tikai tas SVG, kuru maina PR, ja bāzi izdodas atrisināt; `test-unit` seklajā PR izrakstā bāzes nav, tāpēc tests tiek izlaists ar `SKIP reason=base-unresolved`, bet `check:generated-artifacts` veic salīdzināšanu |
| e2e laiku pilnīgums (`tests/unit/balance-e2e-shards.test.ts`)                    | Katrai specifikācijai jābūt ierakstam                                            | Tāds pats noteikums kā SVG testiem (jauna specifikācija tiek palaista ar mediānas svaru)                                                                                                                           |
| `check-quality-ratchet.mjs --require-tighten`                                    | Neierakstīts uzlabojums izraisa kļūmi (izņemot `_policy`)                        | Uzlabojums tiek ziņots, bet nekad neizraisa kļūmi; regresija joprojām izraisa kļūmi                                                                                                                                |

Release režīms saglabā tos pašus pārbaudes rezultātus, izejas kodus un ziņojumus, kas šīm pārbaudēm bija pirms sadalīšanas; tiek pievienota ne vairāk kā viena rinda, kurā norādīts noteiktais režīms (`[agent-skills-sync] mode=release (auto: local run)`).
Testi tiek izlaisti, izmantojot node:test opciju `{ skip: releaseOnlyUnlessTouched(...) }`, ko
`check:test-masking` uzskaita tikai pārskata blokā (tā nav ne `.skip(`, ne `{ skip: true }`, tāpēc
tā netiek uzskatīta par stingru izlaišanu). `check:generated-artifacts` tiek palaista tur, kur bāzi var
noteikt: darbā `lint` (`fetch-depth: 0`), uzreiz pēc `check:agent-skills-sync`. Lokāli
`npm run check:generated-artifacts -- --mode=pr` parāda, ko šis solis pārbauda PR gadījumā. `check:docs-counts`
nodrošinātāju kopskaita savstarpējā pārbaude (“Provider reference total (doc vs live modules)”) ir daļa no
skaitīšanas pārbaudes un seko tās pašas režīmiem.

Tīši nav iekļauti nevienā grupā: cilvēku noteiktie politikas faili (`gate-manifest.json`, atļauto saraksti,
`admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) un ierobežojumi, kuru
rediģēšana līdzdarbā ar kodu var būt nepieciešama funkcionalitātes PR (`quality-baseline.json` metrikas
ieraksti, tipa pārbaudes, failu izmēra un sarežģītības bāzes, `eslint-suppressions.json` — pirmsiesniegšanas
ESLint palaišana to saīsina, kad PR novērš iesaldētu pārkāpumu). Arī `src/i18n/routeNamespaces.generated.json`
tiek ģenerēts, bet paliek funkcionalitātes PR: lietotne to importē izpildlaikā, tāpēc tas nevar gaidīt
atsvaidzināšanu.

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

## Atļauju saraksta politika

Katra vārteja, kas nevar neizdoties jau esošu pārkāpumu dēļ, izmanto nemainīgu atļauju sarakstu
(piemēram, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politika ir šāda:

**Novērsiet pamatcēloni; izmantojiet atļauju sarakstu tikai tad, ja pārkāpums ir jau
esošs un to nevar novērst tajā pašā PR.**

Pievienojot ierakstu atļauju sarakstam:

1. Iekļaujiet komentāru ar pamatojumu.
2. Norādiet izsekošanas uzdevumu (piemēram, `// #3498 — Phase 2 feature, not yet implemented`).
3. Noņemiet ierakstu tajā pašā PR, kurā tiek novērsts pārkāpums — novecojis ieraksts, kas vairs
   nenomāc aktīvu pārkāpumu, pats par sevi ir defekts (6A.3 novecojušu ierakstu pārbaude
   neizturēs vārteju, ja tajā būs bāreņa ieraksts atļauju sarakstā, kad tā būs ieviesta).

**Nepievienojiet ierakstus atļauju sarakstam, lai testi izturētu pārbaudi ātrāk.** Veiksmīga
vārtejas pārbaude ar augošu atļauju sarakstu rada maldīgu kvalitātes sajūtu.

### Ja vārteja neizdodas jūsu PR dēļ

1. **Rūpīgi izlasiet vārtejas izvadi** — tā precīzi norāda, kurš fails vai simbols pārkāpa noteikumu.
2. **Novērsiet pārkāpumu** — lielākā daļa vārteju ir deterministiskas failu sistēmas pārbaudes, kas
   iztur pārbaudi, tiklīdz kods ir pareizs.
3. **Ja pārkāpums ir jau esošs** (t. i., jūs to neieviesāt, bet vārteja tagad uz to attiecas):
   pievienojiet atļauju saraksta ierakstu ar pamatojuma komentāru un izsekošanas uzdevumu.
4. **Ja vārteja ir pakāpeniskas uzlabošanas pārbaude** (pārklājums, ESLint brīdinājumi,
   dublēšanās, sarežģītība): jūsu izmaiņas pasliktināja rādītāju. Novērsiet pamatā esošo
   problēmu vai (retos gadījumos) palaidiet `npm run quality:ratchet -- --update`, ja izmaiņas
   ir apzinātas un rādītāja pasliktināšanās ir pieņemama — taču dokumentējiet iemeslu PR aprakstā.
5. **Informatīvās vārtejas** (`continue-on-error: true`) ir paredzētas tikai informācijai —
   tās nebloķē sapludināšanu, bet tiek parādītas CI kopsavilkumā. Tomēr novērsiet arī šīs problēmas.

---

## Jaunas pārbaudes pievienošana

1. Izveidojiet `scripts/check/check-<name>.mjs` (vai `.ts`). Politikas pārbaudes beidz darbu ar kodu 0/1.
   Sprūdrata tipa pārbaudes izvada metriku failā `quality-metrics.json`, izmantojot `collect-metrics.mjs`.
2. Pievienojiet `"check:<name>": "node scripts/check/check-<name>.mjs"` failam `package.json`.
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

## Racionalizācijas neizpildīto darbu saraksts (ROI pārskats — 9. fāze, 3. vilnis)

Šis inventārs tika saskaņots ar `ci.yml` 2026-06-17 (iepriekšējā versijā nebija iekļauti
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Saskaņotās kopas ROI pārskatā
tika identificēti šādi racionalizācijas kandidāti. **Apvienojumi ir mehāniskas CI
izmaiņas; pārslēgšanas/noņemšanas ir politikas lēmumi, kas atstāti operatora ziņā.** Nekas no tālāk minētā vēl nav piemērots.

**Arī iepriekš nedokumentēti** (informatīvi, ar zemu signāla līmeni): `docs-lint` darbs
(markdownlint + Vale, visam darbam `continue-on-error`) un atsevišķās skeneru darbplūsmas
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` atrodas
`quality-baseline.json`, taču nav sasaistīts ar bloķējošu sliekšņa pārbaudi `ci.yml` — metrika
pašlaik nav izmantota.

### Apvienošana / dublikātu novēršana (mehāniski, ar zemāku risku)

Katrs kandidāts tika pārbaudīts pret aktīvo vārtu stāvokli 2026-06-17 (uzticies, bet pārbaudi);
vairāki “acīmredzami” apvienojumi izrādījās slēpjam parādus, un tie **nav tīri aizstājami**.

- **`check:docs-sync` darbojas divreiz** — atsevišķi `lint` darbā un vēlreiz `check:docs-all` iekšienē (`docs-sync-strict`), kā arī husky pirmskomitēšanas āķī. ✅ **PABEIGTS** — atsevišķais `lint` izsaukums noņemts.
- **CVE skenēšana** — ❌ **NAV tīri apvienojama.** `audit:deps` bloķē kritiskus ieteikumus un nepilnīgus auditus visos piecos bloķēšanas failos, savukārt saskaņā ar pašreizējo politiku par augsta līmeņa ieteikumiem ziņo kā par brīdinājumiem; `check:vuln-ratchet` (osv) neizdodas tikai tad, ja salīdzinājumā ar repozitorijā iekļauto bāzlīniju ir regresija, un, ja tas ir nepieciešams, noraida trūkstošus mērījumus. Atšķirīga semantika — `audit:deps` noņemšana zaudētu absolūto kritisko vārtu pārbaudi un neatkarīgos pakotņu audita apliecinājumus. Saglabāt abus.
- **Ciklu noteikšana** — ✅ **PABEIGTS** (#15159 G-01/G-02). Iepriekšējā teksta versija šeit sauca `check:cycles` par “zaļajiem, atlasītajiem” vārtiem un pamatoja tā saglabāšanu kā bloķējošu, jo `check:circular-deps` (dpdm) ziņoja par 91 ciklu. Šis zaļais statuss bija **kļūdaini zaļš**: `check:cycles` skenēja 5 apakšdirektorijas (450 failus), atpazina tikai statiskus `import|export … from` un izmeta visus `@/` un `@omniroute/open-sse/` specifikatorus, tāpēc nespēja pamanīt dinamiskās importēšanas un aliasu ciklus, kas dominēja repozitorijā. Labots: vārti tagad šķērso `src` + `open-sse` (5023 failus), apkopo specifikatorus no TypeScript AST (tādējādi `import("…")` tiek ņemts vērā, bet tipa pozīcijā esošais `typeof import("…")` netiek ņemts vērā) un atrisina tsconfig `paths`. Tiek atrasti **14** cikli, nevis 0. Tā kā 14 iepriekš pastāvošus ciklus vārtu PR ietvaros nevar novērst, `check:cycles` tagad ir **sliekšņa pārbaude** (`--ratchet`, griesti `metrics.cycles.value = 14` failā `quality-baseline.json`, `direction: down`) — tā bloķē jebkādu _regresiju_, un skaits var tikai samazināties. CI palaiž `npm run check:cycles:ratchet`. Samazināšanas darbi tiek veikti kopā ar **A-01**. `check:circular-deps` (dpdm) paliek informatīvs kā plašāks otrais viedoklis.
- **Sarežģītība** — ✅ **PABEIGTS** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): viena ESLint caurskate, skaitīšana pēc ruleId, lai ciklomātiskās sarežģītības + maksimālo rindu un kognitīvās sarežģītības bāzlīnijas paliktu neatkarīgas; atsevišķās `check:complexity` / `check:cognitive-complexity` pārbaudes paliek lokālai `--update` izmantošanai.
- **`/api` pret halucinācijām** — ✅ **PABEIGTS** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): viena FS inventarizācija `src/app/api`, openapi-routes + docs-symbols joprojām ziņo neatkarīgi; atsevišķās pārbaudes paliek lokālai palaišanai.
- **`check:node-runtime` darbojas 11 darbos** — ⚠️ **zems ROI.** Katrs izmanto atsevišķu izpildītāju, un pārbaude ilgst mazāk nekā 1 sekundi; kopējais ietaupījums ir aptuveni 10 sekundes, zaudējot lētu katra darba aizsargmehānismu. Nav vērts radīt šādas izmaiņas.
- **`typecheck:noimplicit:core` CI lint darbā** — ✅ **noņemts no lint darba** (bija informatīvs ar `continue-on-error`); bloķējošo tipu virsmu nodrošina `typecheck:core` + `check:type-coverage`. Lokālais skripts saglabāts.

### Pārslēgt / izlemt (operatora politika)

- `check:openapi-security-tiers` (informatīvs) — ❌ **nav tīri pārslēdzams.** Tas iziet ar kodu 0, bet brīdina, ka vairākām `traffic-inspector` maršrutētām zem `LOCAL_ONLY_API_PREFIXES` trūkst anotācijas `x-loopback-only: true`. Tās ieviešanai vispirms jāpievieno šīs anotācijas `openapi.yaml`.
- `typecheck:noimplicit:core` (informatīvs) — lielā mērā pārklāts ar bloķējošo `check:type-coverage` sliekšņa pārbaudi. Pārslēgt uz sliekšņa pārbaudi vai noņemt lieko otro `tsc` caurlaidi.
- `test:vitest:ui` (tagad **bloķējošs**) — iepriekš pastāvošās kļūmes ir skaidri izslēgtas `vitest.config.ts` ar `// #8618` izsekošanas komentāriem; jaunas kļūmes izraisa darba neizdošanos.
- `check:secrets` (gitleaks, bloķējoša sliekšņa pārbaude, iesaldēta pie 3 dokumentētiem viltus pozitīviem rezultātiem) — iekļaut atļauto sarakstā visus 3, lai sasniegtu 0, vai pazemināt uz informatīvu. Pārklājas ar GitHub sākotnējo noslēpumu skenēšanu + `check:public-creds`.
- `check:pr-evidence` (bloķējošs, meklē tekstu PR pamattekstā) — augsts viltus pozitīvu rezultātu risks; ja to noņem, vājinās Hard Rule #18 izpilde, tāpēc šis ir patiess politikas lēmums.
- `semgrep` (atsevišķs informatīvs) — pārklājas ar CodeQL OWASP grupu pārbaudēs; sasaistīt tā bāzlīniju ar sliekšņa pārbaudi vai noņemt.

## Saistītā dokumentācija

- Piegādes ķēde (izcelsme, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — atslēgu kopu paritātes pārbaude

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, uzdevums `i18n-ui-coverage`).
Salīdzina katra `src/i18n/messages/<locale>.json` lapas atslēgu kopu ar `en.json` un neizdodas,
ja trūkst kādas lapas atslēgas vai ir lieka lapas atslēga neatkarīgi no tā, kad atslēga tika
pievienota. `__MISSING__:` vietturi tiek uzskatīti par esošiem (to saturs ir attiecības pārbaudes
kompetencē). Tā ir absolūts papildinājums abām uz izmaiņām/procentiem balstītajām pārbaudēm:
`check-ui-keys-coverage` nodrošina 80 % slieksni katrai lokalizācijai (43 trūkstošas atslēgas no
aptuveni 13 000 joprojām nozīmē 99,7 %), bet `check-new-key-coverage` vērtē tikai tās atslēgas,
ko PR pievieno `en.json`. Lokalizāciju grupa tiek ģenerēta no tās dienas `en.json`, kad tiek
izveidots zars, un vairākas dienas tiek tulkota, kamēr bāzes versijai tiek pievienotas jaunas
atslēgas; grupas PR pats nepievieno nevienu atslēgu, tāpēc abas pārējās pārbaudes klusēja, kad

1. grupa (#13044) deviņās lokalizācijās nonāca ar 43 trūkstošām atslēgām un 2. grupa (#13660)
   astoņās lokalizācijās — ar 10 trūkstošām (2026-09-15). Sarkano pārbaudi labo ar
   `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra` lapa
   nozīmē, ka avots to ir izņēmis — `sync-ui-keys` to izņem (`--prune-extra` ir noklusējums).
   `--warn` ziņo par problēmām, bet neizraisa kļūmi.
   `--catalog=cli` veic tādu pašu salīdzināšanu `bin/cli/locales` katalogā (`npm run i18n:check-keys:cli`);
   abi soļi atrodas uzdevumā `i18n-ui-coverage`. Absolūtā pārbaude tiek veikta tikai laidiena režīmā:
   funkcionalitātes PR redz `SKIP reason=pr-mode`, un labojums tiek veikts laidiena atsvaidzināšanā
   vai tulkošanas vilnī, nekad funkcionalitātes PR; PR, kas maina lokalizāciju katalogus, tiek
   vērtēts pret sapludināšanas bāzi (skatiet sadaļu “Divi režīmi” pie uzdevuma
   `i18n-ui-coverage`).

#### `check-new-key-coverage` — i18n jauno atslēgu pārbaude

`check-ui-value-drift` līdziniece. Tā uztver angļu vērtību, kas tika **pārrakstīta**,
kamēr tās tulkojumi tika atstāti; šī pārbaude uztver angļu atslēgu, kas tika **pievienota**,
kamēr dažas lokalizācijas to nekad nesaņēma.

`check-ui-keys-coverage` šo gadījumu neredz: tā nodrošina procentuālo slieksni katrai
lokalizācijai, un vienpadsmit trūkstošas atslēgas no aptuveni 13 000 nozīmē 99,9 % pārklājumu.
Procentuāls rādītājs vienai valodai nevar izteikt “šī funkcionalitāte tika izlaista bez tulkojuma” —
visa funkcionalitāte var nonākt jaunā lokalizācijā bez teksta, un rādītājs nekad nemainīsies.

Tajā ietverts incidents: Orchestration Canvas 3. fāzē tās vienpadsmit atslēgas tika iztulkotas
42 tajā laikā pastāvošajās lokalizācijās. Pēc dažām stundām ES valodu grupa (#13044) palielināja
repozitorija lokalizāciju skaitu līdz 51, un deviņas jaunās (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`)
nekad šīs atslēgas nesaņēma. `deepMergeFallback` aizvieto trūkstošu atslēgu ar angļu tekstu,
tāpēc kļūmes veids bija neiztulkota, nevis tukša saskarne — reāla un pēc konstrukcijas klusa.

Tāpat kā līdziniece, šī pārbaude ir **atšķirību apzinīga**, salīdzinot angļu valodu sapludināšanas
bāzē ar darba koku, tāpēc iepriekš pastāvošās nepilnības paliek nemainīgas un pārbaudes
iespējošanai nebija nepieciešama migrācija.

**`__MISSING__:<english>` marķieris to neapmierina (kopš 2026-09-17).** Agrāk tas bija
dokumentētais atlikšanas mehānisms — izpildlaiks izmanto pareizo angļu tekstu — līdz astoņi
funkcionalitātes PR 2026-09-16 pievienoja 61 atslēgu un ievietoja marķieri visās 65 lokalizācijās,
nevis tās iztulkoja: šī pārbaude pieņēma visas, nekas nebloķēja PR, un bloķējošā īstā tulkojumu
attiecības pārbaude pēc tam laidiena gala versijā neizdevās visiem (pt-BR 3,2 % > 2,5 % + 0,5).
Marķieris tagad tiek vērtēts kā trūkstošs tulkojums. Tikai laidiena režīmā kopš 2026-11-13:
funkcionalitātes PR redz `SKIP reason=pr-mode`, bet laidiena PR (`BASE_REF=origin/main`) pārbauda
katru cikla laikā pievienoto atslēgu. Sarkano pārbaudi labo laidiena atsvaidzināšanā vai tulkošanas
vilnī ar `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`,
vai arī visas lokalizācijas paralēli ar `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, drošs atvienota procesa režīmā, atsakās sākt darbu bez
`OMNIROUTE_TRANSLATION_*` vides mainīgajiem). Atslēga, kurai jāpaliek angļu valodā (fiksēts
produkta/dzinēja/karoga nosaukums), jāiekļauj `scripts/i18n/untranslatable-keys.json`, nevis
jāpaslēpj aiz marķiera. `vi` marķierus aizliedz pilnībā
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — apturēto testu pārbaude

Fails `vitest.config.ts` `exclude` sarakstā ir tests, kas netiek palaists, un ikvienam, kas
pārskata koka struktūru, tas izskatās pēc pārklājuma. Aiz komentāra
`// #8618 — pre-existing failure; remove this exclusion when fixed` uzkrājās 62 faili. Problēma #8618
tika aizvērta 2026-08-11, lai gan tās uzskaitītais saraksts pieauga no 45 ierakstiem līdz 62,
un katrs jaunais ieraksts pārņēma komentāru, kas norādīja uz neaktīvu problēmu. Kad saraksts
beidzot tika pārbaudīts failu pa failam (#13204), **51 no 62 izturēja testus pašreizējā kokā bez
izmaiņām avotā**.

Pārbaude pieprasa, lai katrs izņēmums, kas atbilst reālam failam, (a) norādītu izsekošanas
problēmu un (b) būtu iekļauts `config/quality/vitest-exclusions.json` ar izmērīto statusu,
tādējādi tā pievienošana kļūst par pārskatāmu izmaiņu tam paredzētā failā, nevis vēl vienu
rindu 60 ierakstu masīvā. Tā apzināti atkārtoti nepalaiž izslēgtos testus — tas aizņem aptuveni
10 minūtes un pieder periodiskam uzdevumam; inventārs reģistrē, kad katrs tests pēdējo reizi
tika mērīts.
