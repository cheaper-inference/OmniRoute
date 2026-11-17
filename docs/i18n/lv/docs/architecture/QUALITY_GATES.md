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

## Vārteju inventārs un izpildes profili

### Kandidātu pieņemšana

CI un kvalitātes vārtu darbplūsmas katra izveido stabilu spriedumu: `Gate / CI` un
`Gate / Quality`. To versijveidotā pieņemšanas politika uzskaita katru augšupējo
darbu kā obligātu vai konsultatīvu. Piemērojamam obligātajam darbam ir jābūt veiksmīgam:
trūkstoši, atcelti, izlaisti, gaidoši un nezināmi rezultāti nevar izveidot PASS. Derīga
klasifikācija tikai dokumentācijai vai tikai katalogam var padarīt koda joslu nepiemērojamu;
melnraksta PR nav pieņemams kandidāts. Etiķete `hotfix` neatceļ nepieciešamību pēc pierādījumiem.

Abas darbplūsmas aptver PR uz main/release atzariem, nosūtīšanu uz `main`, manuālu palaišanu
un merge-group notikumus. Push, dispatch un merge-group izpilda pilno atlasi. Nosūtīšana uz
`release/**` tās nepalaiž (2026-10-18): katras izmaiņas jau tika palaistas matricā tās PR ietvaros,
un sapludinātās kombinācijas pārbaude ir Release-Green uzdevums (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Fork un merge group izmanto mitinātos izpildītājus tiem darbiem, kuri citādi izvēlētos pašmitinātos
izpildītājus; pirms ieviešanas ir jāpārbauda pietiekama mitināto izpildītāju jauda.

Parasts PR izpilda ātro atlasi. Pieņemšanas politikas `full-code` un `full-code-e2e` joslas
(E2E, integrācija, pakotnes artefakts, Electron smoke, Bun SQLite, ekosistēmas un protokolu klienti)
tiek izpildītas tikai Mergify rindas melnrakstā vai pilnas palaišanas laikā:
`gh workflow run ci.yml --ref <branch>`.

Katrā JSON apliecinājumā ir norādīts izrakstītais SHA, darbplūsmas palaišana un mēģinājums.
CLI noraida izrakstīšanās/notikuma SHA neatbilstību. Darbplūsmas testi piesaista politikas dalību
sprieduma darba `needs` sarakstam, lai jauna vai noņemta josla nevarētu klusi pazust.
Apliecinājumi attiecas uz savu darbplūsmu, nevis publicēšanu, izvietošanu vai esoša konsultatīva
skenera iekšējo darbību. Abu pārbaudes nosaukumu aktivizēšana atzaru noteikumos ir atsevišķa
administratīva izmaiņa; šo darbu pievienošana pati par sevi neaizsargā atzaru.

### Sapludināšanas rinda

Etiķete `queue` nosūta PR uz Mergify rindu (`.mergify.yml`). Mergify atver melnraksta PR uz
`mergify/merge-queue/` atzara, CI tur izpilda pilno atlasi, un sākotnējais PR tiek sapludināts,
kad `Gate / CI`, `Gate / Quality` un `Merge integrity (changelog + generated skills)` ir sekmīgi.

Mergify ieraksta rindas kopsavilkumu melnraksta aprakstā, un arī citas lietotnes to var rediģēt.
`pull_request` `edited` notikums šādam melnrakstam izmanto savu konkurences grupu
(`-queue-edit-<run_id>`), tāpēc tas nevar atcelt īsto melnraksta palaišanu, turklāt izlaiž vārtus un
matricu. Joprojām tiek izpildīta tikai `Merge integrity`. Izlaistajam vārtu darbam ir cits pārbaudes
nosaukums, jo Mergify izlaistu `Gate / CI` interpretē kā nesekmīgu pārbaudi un izņem PR no rindas.

Pēc izņemšanas no rindas push ne vienmēr atkārtoti ievieto PR rindā. Ierakstiet tajā komentāru
`@mergifyio queue`.

### Saglabātie pierādījumi pieņemšanas reduktorā

`scripts/quality/validate-release-acceptance.mjs` reducē piegādāto plānu un tā manifestus;
tas neapstiprina, ka plāns aptver pilnu laidiena konveijeru. Tā atskaites skaidri iestata
`releaseAcceptance: false`, pat ja šis plāns ir `VERIFIED`. `release-acceptance.yml` darbplūsma
joprojām izmanto ēnu testa fiksācijas, nevis reālus būvēšanas, pakotnes, palaišanas vai paaugstināšanas apliecinājumus.

CLI pieprasa `--evidence-root`, lai pārbaudītu saglabātos pierādījumus. Faili tiek atrisināti kā
`<evidence-root>/<artifact_id>/<member>` un jaukoti ar SHA-256. PASS ieraksts bez pierādījumiem,
trūkstošs vai mainīts fails, nedrošs ceļš vai simboliskā saite liedz pārbaudi. Trūkstoši faili nav
līdzvērtīgi tukšiem veiksmīgiem žurnāliem. Esošās SHA/palaišanas/mēģinājuma pārbaudes paliek neatkarīgas:
atbilstoši baiti nevar glābt novecojušu apliecinājumu. Faila integritāte nav izpildes autentiskuma
vai artefakta paaugstināšanas pierādījums.

### Statiskās skenēšanas inventārs

Versijveidotais npm-alias inventārs un statiskās skenēšanas dalība atrodas
`config/quality/gate-manifest.json`. Palaidiet `npm run check:gate-manifest`, lai pārbaudītu
skriptu nosaukumus un precīzas komandas pret `package.json`; papildinājumi, noņemšana un komandu
novirzes izraisa kļūmi gan lokālajā āķī, gan izmaiņu klasifikācijas darbos CI. Alias nav darbplūsmas
darbs, matricas eksemplārs vai testa gadījums: šos skaitļus nedrīkst pasniegt kā savstarpēji aizvietojamus.

Izmantojiet `npm run quality:scan -- --list` vai `npm run quality:scan:fast -- --list`,
lai pārbaudītu atlasītos alias, tos neizpildot. Izpildītājs izsauc npm ieejas punktu, tāpēc tiek
saglabāta tā izpildlaika vide (tostarp Bun, ja tas ir konfigurēts). Manifests reģistrē ārpus šiem
profiliem esošos alias kā atsevišķi izsaucamus, un uzturēšanas komandas ir aizliegtas tikai lasāmos
skenēšanas profilos.

Šie profili aptver tikai statisko skenēšanu. Tie neapliecina produkta testus, pārklājumu, pakotņu
veidošanu, ārējās pārbaudes vai kandidāta pilnīgu laidiena pieņemšanu. Darbplūsmas pieņemšana izmanto
saistīto `config/quality/admission-policy.json` un `scripts/quality/admission-verdict.mjs`.
Laidiena novērotāja profili paliek atsevišķi; neatkarīgi pārbaudiet to piemērojamās pārbaudes un
apliecinājumus. Pilnā novērotāja statiskās komandas ir deklarētas
`config/quality/release-green-static-profile.json`, tostarp `audit:deps`, mutācijas testu atlase
un tulkošanas pārbaudes. Ielādētājs validē npm komandas pret package.json un modelētajām CI/Quality
deklarācijām; tas noraida novirzes, nevis izpilda čaulas tokenus kā argumentus. Obligāta skenera
SKIP/INCOMPLETE izvade nevar izveidot PASS. Profilā ir reģistrēti tā ārējie izņēmumi, un tas
neaizstāj mitināto pārklājumu, testu matricas, pakotnes vai izvietošanas pierādījumus. Tālāk sniegtais
prozas inventārs ir atsauce, nevis pierādījums tam, ka vārteja faktiski darbojās.

Skripti atrodas `scripts/check/` (politikas vārtejas) un `scripts/quality/` (ierobežojumu dzinējs).
CI patiesais avots ir `.github/workflows/ci.yml`.

### Laidiena PR ātrais ceļš (`quality.yml`)

`.github/workflows/quality.yml` papildina CI main/release PR, nosūtīšanai uz `main`,
dispatch un merge group gadījumā. PR izmanto ceļa filtrētās ātrās pārbaudes. Pastāvīgi
atspējotā dublētā būvēšana tika noņemta; reālās būvēšanas/pakotnes/palaišanas pārbaudes paliek CI.
Vienību kopa un vitest tiek izpildīti tikai CI (`Unit Tests (N/8)` un `Vitest`).

| Darbs                                            | Tvērums                                                                                                                                            | Bloķējošs           |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | Dokumentācijas/koda PR; API dokumentācijas atsauces un docs-all                                                                                    | Jā                  |
| `Fast Quality Gates`                             | Koda PR; statiskās pārbaudes, tipa pārbaude, informācijas paneļa tipa pārbaude, ietekmētie vienību testi, aizmirstie saistītie testi (informatīvi) |
| `No new ESLint warnings`                         | Koda PR; lint pārbaudes aizsardzība, kas ņem vērā apspiešanu                                                                                       | Jā, tostarp fork PR |
| `Merge integrity (changelog + generated skills)` | PR, kas nav melnraksts; izmaiņu žurnāla un ģenerēto prasmju sinhronizācija                                                                         | Jā, tostarp fork PR |

#### Aizmirsto saistīto testu pārskats

`npm run check:forgotten-sibling-tests` tiek izpildīts kā informatīvs `Fast Quality Gates` solis un atkārtoti izmanto
importēšanas atrisinātāju, kas atrodas aiz testu ietekmes kartes.
Katram mainītajam produkcijas modulim tas ziņo par deterministiskām
`changed module/symbol -> static consumer -> candidate sibling test` ķēdēm, ja kandidāta
testa nav ievilces pieprasījuma izmaiņu kopā. Markdown kopsavilkums un JSON rezultāts tiek saglabāts kā
`forgotten-sibling-tests` darbplūsmas artefakts kalibrēšanai pirms jebkādas bloķējošas ieviešanas.

Barelu atkārtotie eksporta gadījumi un dinamiskie importi ir tikai atrisināšanas diagnostika; tie nekad nerada
bloķējošu atradni. Pārskatītie izņēmumi atrodas
`config/quality/forgotten-sibling-allowlist.json`. Katrā ierakstā jānorāda patērētājs un kandidāta
tests, jāsniedz konkrēts pamatojums un jāievieto saite uz GitHub problēmu vai izmaiņu pieprasījumu. Nekorekti
ieraksti izraisa drošu noraidīšanu. Izņēmumi nevar apspiest dzēstu kandidāta testu vai diff, kas pievieno `.skip`/`.todo`;
apgalvojumu vājināšana un cita maskēšana joprojām ir patstāvīgi bloķējošā
`check:test-masking` vārtu atbildības jomā.

### Darbs: `lint`

Tiek izpildīts katrā PR uz `main`. Kļūmes gadījumā bloķē sapludināšanu.

| Skripts (`npm run ...`)           | Validē                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Bloķējošs                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `check:node-runtime`              | Node.js versija ir atbalstītajā diapazonā                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jā                                                          |
| `check:cycles`                    | Cikliskie importi visā `src/` + `open-sse/` (balstīts uz AST, atrisinot tsconfig `paths`). Neapstrādāts izpildījums vienmēr beidzas ar kodu 1, ja pastāv kaut viens cikls (fail-closed kopš #15281), un uzskaita SCC. `check:cycles:ratchet` (to palaiž CI) bloķē, ja skaits pārsniedz `metrics.cycles` robežvērtību failā `quality-baseline.json` — pašlaik 14, `direction: down`, tāpēc tā var tikai samazināties (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jā (pakāpeniska samazināšana)                               |
| `check:boundary`                  | `open-sse → src` sasaistes: unikāli importi no faila uz failu no dzinēja uz lietotni (`scripts/quality/measure-boundary.mjs`; malu saraksts ir v4 kodola/moduļu sadalīšanas novēršanas darbu saraksts). Neapstrādāts izpildījums ģenerē tikai informatīvu pārskatu (tāpat kā `quality:boundary`). `check:boundary:ratchet` (to palaiž CI, un tas ir arī `quality.yml` ātro vārtu pakāpeniskās samazināšanas ciklā) bloķē, ja skaits pārsniedz `metrics.boundaryOpenSseToSrc` robežvērtību failā `quality-baseline.json` — sākotnēji iestatīta uz izmērīto vērtību 771, `direction: down`; `--update` to tikai samazina; PR gadījumā tiek izmantota bāzes atsauce (`--base-ref`, skatiet tālāk)                                                                                                                                                                                                                                                                                                                                                                                          | Jā (pakāpeniska samazināšana)                               |
| `check:route-validation:t06`      | Zod shēmas ir pieejamas visos maršrutos (6. līmeņa politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jā                                                          |
| `check:any-budget:t11`            | `@ts-expect-error // any` skaits nepārsniedz budžetu (11. līmeņa turnikets)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jā                                                          |
| `check:provider-consistency`      | Katram `providers.ts` pakalpojumu sniedzējam ir atbilstošs ieraksts `providerRegistry.ts` (un otrādi, atļauto ierakstu saraksta ietvaros)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jā                                                          |
| `check:model-lifecycle`           | Trīs manuāli uzturētās maršrutēšanas tabulas ir savstarpēji konsekventas ar repozitorijā iekļauto dzīves cikla momentuzņēmumu (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nepiešķir vērtējumu nevienam atsauktam ID, kuru var maršrutēt `REGISTRY`; katrs `BUILT_IN_ALIASES` mērķis ir pieejams `REGISTRY` un nav iekļauts atsaukto ID momentuzņēmumā; katrs atsauktais ID, kas joprojām atrodas `REGISTRY`, tiek pāradresēts vai ir uzskaitīts `allowedRetiredInCatalog`; un neviens `DEFAULT_DEGRADATION_MAP` avots vai mērķis šajā momentuzņēmumā nav atzīmēts kā atsaukts. Tas nepierāda, ka modeli pašlaik apkalpo aktīvs augšupējais pakalpojums. Darbojas bezsaistē — salīdzina ar `config/quality/model-lifecycle.json`, kas manuāli atjaunināts ar `npm run quality:refresh-model-lifecycle` (nepieciešams tīkls; nav pieslēgts CI). `allowedRetiredInCatalog` ir samazināšanas sprūdrats: pievienojiet ierakstu tikai kopā ar izsekošanas uzdevumu.                                                                                                                          | Jā                                                          |
| `check:fetch-targets`             | Katrs `fetch("/api/...")` klienta puses `src/` mapē tiek atrisināts līdz reālam `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jā                                                          |
| `check:deps`                      | Visas instalējamās ar `npm install` atkarības katrā repozitorija `package.json` failā ir iekļautas `dependency-allowlist.json`; tiek atzīmētas jaunas nepiespraustas vai ar slopskvoting saistītas pakotnes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jā                                                          |
| `audit:deps`                      | Visu piecu neatkarīgo bloķēšanas failu (saknes, Electron, OpenCode spraudņu v1/v2 un pakalpojumu sniedzēja) npm audits. Kritiski ieteikumi bloķē procesu; augstas prioritātes ieteikumi paliek redzami kā brīdinājumi. Trūkstoši vai neveiksmīgi auditi tiek uzskatīti par NEPABEIGTIEM un bloķē procesu; katras darbības jomas bloķēšanas failu jaucējvērtības un pārskati tiek saglabāti.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jā                                                          |
| `check:lockfile`                  | `package-lock.json` integritāte — https reģistrs, integritātes jaucējvērtības, bez resursdatora aizstāšanas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jā                                                          |
| `check:licenses`                  | SPDX licenču atļaušanas saraksts produkcijas atkarībām                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jā                                                          |
| `check:tracked-artifacts`         | Nav būvēšanas artefaktu / repozitorijā iekļautu `node_modules` simbolisko saišu (tiek palaists arī husky pre-commit; pre-push apzināti ir minimāls — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jā                                                          |
| `check:ai-attribution`            | Nav AI/bota `Co-Authored-By` piekabes vai AI ģenerēšanas kājenes PR komitos, virsrakstā vai pamattekstā — Stingrais noteikums #16 (ātro vārtu ciklā `quality.yml` PR→`release/**` — nolasa notikuma lietderīgo slodzi, ārpus PR nedara neko — un tikai PR paredzētā darbībā `ci.yml` lint pārbaudei PR→`main`; arī husky `commit-msg` āķī; cilvēku līdzautori ir atļauti; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Katrs Vitest izņēmums norāda uz izsekošanas uzdevumu un ir iekļauts `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jā                                                          |
| `check:file-size`                 | Avota faili (`.ts`/`.tsx` mapēs `src/`, `open-sse/`, `electron/`, `bin/`) nepārsniedz `cap`, bet testa faili (`*.test.ts(x)`) — `testCap`; faili, kas iesaldēti failā `file-size-baseline.json` (`frozen` / `testFrozen`), nedrīkst pārsniegt tajos reģistrēto izmēru                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jā                                                          |
| `check:error-helper`              | Kļūdu atbildēs izpildītājos/apstrādātājos tiek izmantotas `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jā                                                          |
| `check:migration-numbering`       | Migrācijas SQL faili ir numurēti secīgi, bez izlaidumiem vai dublikātiem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jā                                                          |
| `check:public-creds`              | Ārpus `publicCreds.ts` nav burtisku OAuth `client_id`/`client_secret` vai Firebase Web atslēgu (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Jā                                                          |
| `check:db-rules`                  | Ārpus `src/lib/db/` moduļiem nav neapstrādāta SQL; no `localDb.ts` netiek importēts, izmantojot barrel-imports (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jā                                                          |
| `check:known-symbols`             | Pakalpojumu sniedzēju izpildītāji, maršrutēšanas stratēģijas un tulkotāji, kas reģistrēti to dispatch tabulās, atbilst diskā esošajiem failiem — nav bāreņu vai nedeklarētu simbolu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jā                                                          |
| `check:route-guard-membership`    | Katrs maršruts, kas palaiž bērnprocesu, tiek klasificēts ar `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jā                                                          |
| `check:test-discovery`            | Katrs `*.test.ts` / `*.spec.ts` fails repozitorijā tiek apkopots vismaz vienā testu izpildprogrammā (ierobežojums: bāreņu failu saraksts failā `test-discovery-baseline.json` var tikai sarukt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jā                                                          |
| `check:test-tla-order`            | Neviens `node:test` fails mapē `tests/unit` nereģistrē testu, sasniedz augstākā līmeņa `await` un pēc tam nereģistrē vēl citus testus (#18045; ierobežojums: `test-tla-order-allowlist.json` var tikai sarukt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Jā                                                          |
| `check:agent-skills-sync`         | Ģenerētie aģentu prasmju artefakti atbilst to avota katalogam (nav noviržu). Izlaides režīmā tiek pārbaudīta katra prasme; funkcionalitātes PR (`pr` režīmā) tiek pārbaudītas tikai tās prasmes, kuru ģenerēto tekstu tas rediģē — skatiet [Ģenerētie faili un atvasinātās bāzes līnijas](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Pakalpojumu sniedzēju logotipiem/resursiem ir reģistrēts izcelsmes ieraksts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | JSON konfigurācijas faili tiek parsēti un atbilst repozitorija lintēšanas noteikumiem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | TypeScript kompilācija bez kļūdām (tikai informatīvi brīdinājumi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jā                                                          |
| `typecheck:noimplicit:core`       | Stingrs `noImplicitAny` — uz nākotni vērsts; daudziem jau esošajiem izsaukumiem joprojām nepieciešamas anotācijas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **Ieteikuma rakstura pārbaude** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, kas attiecināts uz `src/app/(dashboard)/**` (#7033) — `typecheck:core` rūpīgi atlasītais 27 failu atļauto failu saraksts neietver nevienu dashboard TSX failu, un `next build` arī nekad nepārbauda to tipus (`next.config.mjs` iestata `ignoreBuildErrors: true`), tāpēc nepiesaistītu identifikatoru regresijas tur (#6625/#6909) CI bija neredzamas. Izmaiņas tiek salīdzinātas ar iesaldētu katra faila/koda pāra skaita bāzlīniju (`config/quality/dashboard-typecheck-baseline.json`, tāds pats novecojušu pārbaudes rezultātu piemērošanas modelis kā `check:known-symbols`) — vārteju aptur tikai JAUNAS kļūdas, kas pārsniedz bāzlīnijā norādīto skaitu; samaziniet skaitu ar `--update`, kad iepriekš esoša kļūda ir izlabota.                                                                                                                                                                                                                                                                                                                                         | Jā                                                          |
| `check:build-typecheck`           | Visas lietotnes produkcijas tipa pārbaude, izmantojot `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), ko neaptver `typecheck:core` 27 failu atļauto failu saraksts un dashboard vārteja. Izmaiņas tiek salīdzinātas ar `config/quality/build-typecheck-baseline.json`; jauna vai palielināta katra (faila, koda) pāra kļūdu skaita vērtība aptur pārbaudi, bet mazāks skaits liek to samazināt. `--update` atsakās darboties, ja izpildes laikā ir jauns vai palielināts pāris, ja vien nav nodots `--force-regressions`, un atsakās pieņemt no jauna apklusinātu failu, ja vien nav nodots `--force-nocheck`, tāpēc bāzlīnijas paplašināšana, lai iegūtu veiksmīgu rezultātu, un pastāvīga klusēšanas izņēmuma piešķiršana ir divas atsevišķas, apzinātas darbības. Atsevišķs `--force` tiek noraidīts. Tā arī pārbauda, vai būvēšanas tvērumā `@ts-nocheck` atbilst `config/quality/ts-nocheck-baseline.json`, jo fails, kas to izmanto, vispār neziņo par diagnostikas rezultātiem un pretējā gadījumā būtu neredzams visām vārtejām. | Jā                                                          |

#### Divas tipa pārbaudes programmas sniedz atšķirīgas atbildes

`typecheck:core` un `check:build-typecheck` kompilē atšķirīgas programmas ar atšķirīgām
opcijām, un viens un tas pats fails vienā no tām var būt tīrs, bet otrā — pilns ar
kļūdām.

`tsconfig.build.json` iestata `"strict": false`, tāpēc `noImplicitAny` ir izslēgts. Core
konfigurācija kompilē rūpīgi atlasītu 27 failu sarakstu ar stingrākām opcijām un seko
katra ieraksta importu grafei, tāpēc faili, kas būvēšanas programmā nekad neparādās,
tur joprojām tiek pārbaudīti.

Šīs sekas ir svarīgas, vērtējot, vai fails ir tipizēts: **nulle diagnostikas
`check:build-typecheck` rezultātā nenozīmē nulli**. Noņemot `@ts-nocheck` no 26
failiem, 23 no tiem būvēšanas programmā izrādījās tīri; sešpadsmit no tiem stingrajā
programmā atklāja aptuveni 120 netieši piešķirta tipa `any` kļūdas. Pirms faila
atzīšanas par tīru pārbaudiet abas programmas.

### Darbs: `quality-gate`

Darbojas pēc `test-coverage`. Kļūmes gadījumā bloķē sapludināšanu.

| Skripts                      | Validē                                                                                                                                                                                                      | Bloķējošs                |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Izvada `quality-metrics.json` (ESLint brīdinājumu skaitu, pārklājumu no apvienotā shard pārskata)                                                                                                           | Jā (ratchet priekšposms) |
| `quality:ratchet`            | Katra metrika failā `quality-baseline.json` nav pasliktinājusies (ESLint brīdinājumi ≤ bāzlīnijai; pārklājums ≥ bāzlīnijai)                                                                                 | Jā                       |
| `check:duplication`          | Koda dublēšanās (`jscpd@4`) nepārsniedz bāzlīniju failā `quality-baseline.json`                                                                                                                             | Jā                       |
| `check:complexity`           | Faila līmeņa ciklomātiskā sarežģītība nepārsniedz ierobežojumu (ESLint kodola `complexity` + `max-lines-per-function`)                                                                                      | Jā                       |
| `check:cognitive-complexity` | Kognitīvās sarežģītības ratchet (`eslint-plugin-sonarjs`) — atsevišķs ESLint izpildes posms; CI abus apvieno vienā `check:complexity-ratchets` solī                                                         | Jā                       |
| `check:dead-code`            | Neizmantoto eksportu / failu ratchet (knip) nav pasliktinājies salīdzinājumā ar bāzlīniju                                                                                                                   | Jā                       |
| `check:compression-budget`   | Saspiešanas etalona budžets — ietaupīto tokenu minimums katram dzinējam nedrīkst pasliktināties                                                                                                             | Jā                       |
| `check:type-coverage`        | Tipizētā īpatsvara ratchet (`type-coverage`) nav pasliktinājies; lielā mērā ietver `typecheck:noimplicit:core` pārbaudi                                                                                     | Jā                       |
| `check:codeql-ratchet`       | Atvērto CodeQL brīdinājumu skaits nav pasliktinājies (nolasa, izmantojot `gh api`; bez tokena tiek izlaists bez kļūdas) — atsvaidzināšanas biežumu un manuālo palaidi skatiet tālāk sadaļā “CodeQL ratchet” | Jā                       |

### Darbs: `quality-extended`

Viss darbs ir konsultatīvs (`continue-on-error: true`). Uz npm balstītie ratchet testi
tiek izpildīti faktiski; ārējie skeneri tiek instalēti, izmantojot `gh release download`, un
paši sevi izlaiž (iziet ar kodu 0), ja binārais fails vēl nav pieejams.

| Skripts                  | Validē                                                                                                                                                                                                                                               | Bloķējošs                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | Nav cirkulāru atkarību (dpdm)                                                                                                                                                                                                                        | **Konsultatīvs**                                      |
| `check:bundle-size`      | Komplektējuma izmērs nepārsniedz ierobežojumu                                                                                                                                                                                                        | **Konsultatīvs**                                      |
| `check:secrets`          | Noslēpumu skenēšana (gitleaks) — tiek izlaista, ja binārais fails nav pieejams                                                                                                                                                                       | **Konsultatīvs**                                      |
| `check:vuln-ratchet`     | Atkarību ievainojamības (osv-scanner) nepasliktinās — `--ratchet` neizmērīšanas gadījumā neizdodas ar INCOMPLETE (izejas kods 2)                                                                                                                     | **Konsultatīvs**                                      |
| `check:workflows`        | Darbplūsmu lint pārbaude (actionlint + zizmor); trūkstoši/bojāti skeneri, nederīgi pārskati vai trūkstoša ratchet bāzlīnija izraisa statusu INCOMPLETE. Derīgi atradumi tiek apstrādāti saskaņā ar izvēlēto stingro/konsultatīvo/ratchet politiku    | Izpilde obligāta; zizmor ratchet CI vidē ir bloķējošs |
| `check:openapi-breaking` | Publiskās API līgums pret piesaistītajiem notikumu komitiem (PR sapludināšanas bāze, push iepriekšējais stāvoklis, merge-group bāze; plānotajā/manuālajā izpildē vispirms tiek pārbaudīts pirmais vecāks); obligāts mērījums neizdodas slēgtā režīmā | **Bloķējošs ar --ratchet**                            |

### Darbs: `docs-sync-strict`

Tiek palaists katrā PR uz `main`. Neveiksmes gadījumā sapludināšana tiek bloķēta.

| Skripts                        | Validē                                                                                                                                                                            | Bloķējošs                  |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Meta-vārteja, kas secīgi palaiž tālāk norādītās 6 apakšvārtejas                                                                                                                   | Jā                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI versiju konsekvence; izlaides režīmā arī 66 `llm.txt` spoguļkopijas un tulkotās CHANGELOG sadaļas (PR režīmā: spoguļkopijas sakrīt)                           | Jā                         |
| ↳ `check:docs-counts`          | Skaitļi prozā (nodrošinātāju skaits, migrāciju skaits u. c.). Divi režīmi: `pr` funkciju PR, `release` citos gadījumos — skatiet tālāk sadaļu “Atvasinātās vērtības”              | Jā                         |
| ↳ `check:env-doc-sync`         | Katrs vides mainīgais failā `.env.example` ir dokumentēts dokumentācijas tabulā, un otrādi                                                                                        | Jā                         |
| ↳ `check:deprecated-versions`  | Dokumentācijā nav novecojušu versiju virkņu                                                                                                                                       | Jā                         |
| ↳ `check:doc-links`            | Iekšējās Markdown saites dokumentācijā norāda uz reāliem failiem (`[text]`/`(path)` formā)                                                                                        | Jā                         |
| ↳ `check:fabricated-docs`      | Dokumentācijā minētie maršruti, vides mainīgie, CLI komandas, āķu nosaukumi un failu ceļi eksistē kodbāzē. Stingra pārbaude ar `--strict`; bez karoga kļūme ir nebloķējoša.       | Jā (ar `--strict` CI vidē) |
| `check:cli-i18n`               | CLI `t()` atslēgas eksistē failā `bin/cli/locales/en.json` (abos režīmos); pt-BR / zh-CN / zh-TW atbilstība `en.json` tikai izlaides režīmā                                       | Jā                         |
| `check:openapi-coverage`       | OpenAPI specifikācija aptver vismaz noteikto reālo maršrutu minimālo slieksni                                                                                                     | Jā                         |
| `check:openapi-security-tiers` | Drošības līmeņu anotācijas failā `openapi.yaml` atbilst klasifikācijām failā `routeGuard.ts`                                                                                      | **Ieteicoša**              |
| `check:openapi-routes`         | Katrs ceļš failā `openapi.yaml` atbilst reālam `route.ts` (pret halucinācijām vērsta pārbaude)                                                                                    | Jā                         |
| `check:docs-symbols`           | Katra `/api/...` atsauce failos `docs/**/*.md` atbilst reālam `route.ts` (pret halucinācijām vērsta pārbaude)                                                                     | Jā                         |
| `i18n translation drift`       | `docs/i18n/**` spoguļkopijas salīdzinājumā ar `.i18n-state.json` — PR gadījumā ieteicoša (spoguļkopijas atjauno tulkošanas vilnis), stingra pārbaude push un nakts izpildes laikā | **Ieteicoša** PR gadījumā  |

#### Tulkojumu spoguļkopijas ir atvasināti faili (PR režīms pret izlaides režīmu)

Funkciju PR maina tikai angļu valodas avotus. `docs/i18n/<locale>/**` spoguļkopijas (tostarp 66
`llm.txt` kopijas un tulkotie `CHANGELOG.md` faili) un `.i18n-state.json` vienā darbībā pārraksta
tulkošanas vilnis (`docs/i18n-*` / `chore/i18n-*` atzari, ieplānotā
`i18n-mirror-refresh.yml`) un izlaide (`npm run release:sync-changelog-i18n`). Tāpēc spoguļkopiju
vārtejas darbojas divos režīmos, ko nosaka `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`,
pēc tam `OMNIROUTE_GATE_MODE`, pēc tam Actions notikums; lokāla izpilde ir `release`):

- `check:docs-sync` — laidaišanas režīmā izpilda visas pārbaudes. PR režīmā saglabā package.json/OpenAPI versiju,
  saknes CHANGELOG virsrakstus un aizstātu dokumentu aizsargpārbaudi, kā arī izdrukā
  `SKIP reason=pr-mode` `llm.txt` spoguļkopijām un tulkotajām CHANGELOG sadaļām —
  ja vien PR neraksta spoguļkopijas: zara galvene, kas `config/quality/derived-paths/*.json` deklarēta kā
  `docs/i18n/**` saimes rakstītāja, izpilda abas pārbaudes stingri, un, ja diff bāzi var atrisināt,
  izmaiņa, kuras pašas diff rediģē `docs/i18n/<locale>/llm.txt` vai `CHANGELOG.md`, šo pārbaudi izpilda stingri. Diff
  bāzi nevar atrisināt 1. līmeņa checkout (`docs-sync-strict` darbā), tāpēc PR režīmā tiek izpildīta arī viena
  pārbaude, kurai bāze nav vajadzīga: katrai `llm.txt` spoguļkopijai jāeksistē, jāsaglabā tās
  `---` atdalītājs un jāsatur vai nu saknes pamatteksts, vai pamatteksts, kas ir kopīgs lielākajai daļai spoguļkopiju. Bāzes
  pārvietošana atstāj visas spoguļkopijas vienādi novecojušas, un pārbaude tiek izieta; manuāla vienas
  spoguļkopijas rediģēšana izraisa kļūmi. Tulkotajiem `CHANGELOG.md` failiem 1. līmeņa PR checkout
  šādas pārbaudes nav.
- Iepriekšējas nodošanas hooks izpilda `check-docs-sync.mjs --mode=pr`: commit tiek vērtēts pēc tā, ko tas dara.
  Bez karoga lokāla izpilde notiek laidaišanas režīmā, un viens sapludināts PR, kas rediģē saknes `llm.txt`,
  bloķētu katru nākamo commit šajā bāzē, līdz tiktu izpildīts vilnis. Tas pats noteikums attiecas uz jebkuru
  režīmu apzinošu vārtu pārbaudi, ko izpilda Husky hooks: hooks nodod `--mode=pr`, bet stingrais vērtējums
  paliek laidaišanas režīma izpildēm (laidaišanas PR, push uz `main`, vienkārša lokāla izpilde).
- Spoguļsatura vienības testi (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`,
  `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`,
  `docs/*-locales`) — laidaišanas režīmā pārbauda katru lokalizāciju. PR režīmā pārbauda tikai tās spoguļkopijas, kas ir
  aktuālas attiecībā pret avotu angļu valodā saskaņā ar `.i18n-state.json` (visa faila jaucējkods vai
  reģistrētais tās sadaļas jaucējkods, ko tests piesaista), bet novecojušās izlaiž ar iemeslu. `target_hash`
  izcelsmes pārbaudes abos režīmos tiek veiktas katrai lokalizācijai. Aktualitāte tiek noteikta katrai `## `
  sadaļai; vienība `run-translation.mjs` aprēķina jaucējkodu. Gara sadaļa (šī faila vārtu inventārs
  aizņem aptuveni pusi no tā) nozīmē, ka jebkura tajā veikta izmaiņa padara šīs spoguļkopijas novecojušas,
  un to PR režīma pārbaudes tiek izlaistas līdz nākamajam vilnim. Ja avots angļu valodā vairs nesatur enkuru,
  tiek izmantots visa faila salīdzinājums.
- `i18n translation drift` — PR tiek sniegts kā informatīvs paziņojums, bet push, nakts izpildes un
  laidaišanas izveides laikā tiek pārbaudīts stingri, lai novecojusi spoguļkopija nevarētu nonākt laidienā.

`scripts/i18n/sync-llm-mirrors.mjs` (eksportēts arī kā `syncLlmMirrors()`, ar `--dry-run`)
pārraksta `llm.txt` spoguļkopijas; laidiena atsvaidzināšana, tulkošanas vilnis un ieplānotā
`i18n-mirror-refresh.yml` izpilde to palaiž (atsvaidzināšana ar sauso izpildi nosaka novecojušas `llm.txt`
spoguļkopijas, jo novirzes pārskatā tās netiek uzskaitītas, un sinhronizē tās pirms `check:docs-all`).

Divpadsmit README SVG faili mapē `docs/diagrams/` tiek ģenerēti (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` ģenerē tos visus no jauna). Katram ir baitu salīdzināšanas vienības tests
(`tests/unit/docs/readme-*-svg.test.ts`, darbs `test-unit`), kas laidaišanas režīmā neizdodas, ja commitā
iekļautais fails ir novecojis; PR gadījumā `check:generated-artifacts` vērtē SVG, ko rediģē PR, bet bāzes
novirze tiek atstāta laidiena atsvaidzināšanai (skatiet [Ģenerētie faili un atvasinātās bāzes, kas tiek
rakstītas laidiena laikā](#generated-files-and-derived-baselines-written-at-release)) — un `check:docs-counts`
nolasa kanoniskos skaitļus no to `<text>` mezgliem — tāpēc kontūru veidošanas solis saglabā katru kontūrā
pārvērsto virkni failā kā neredzamu `<text>`. SVG kanonisko skaitļu pārbaude nolasa failus, kas uzskaitīti
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, kā arī `public/images/tier-flow-dark.svg` un `tier-flow-light.svg`;
apgalvojumu par bezmaksas lietošanu uz visiem laikiem, kataloga ierakstiem, atkārtoti izmantojamu kopu un
vērtēšanas faktoriem pārbaudes arī nolasa no `promise-pillars.svg`, `free-tier-budget.svg` un
`strategies-grid.svg`. Skaitļi, ko šie ģeneratori attēlo (nodrošinātāju kopskaits, MCP rīki, maršrutēšanas
stratēģijas, nodrošinātāji ar bezmaksas lietošanu uz visiem laikiem u. c.), nāk no faktu momentuzņēmuma
`docs/reference/derived-facts.json`, izmantojot `scripts/docs/readmeFacts.mjs`, nevis no literāļiem, tāpēc
diagrammas atkārtota ģenerēšana jebkurā zarā atveido commitā iekļauto failu. `free-tier-budget.svg` rindas
iegūst no tā paša momentuzņēmuma (`code.freeTierBudget`, kataloga kopsavilkums, ko reģistrē faktu zonde),
tāpēc `FREE_MODEL_BUDGETS` izmaiņas nākamajā atsvaidzināšanas reizē nonāk kartītē, nevis padara CI sarkanu.

### Atvasinātās vērtības: `pr` un `release` vārtu režīmi

Funkcionalitātes PR nekad neieraksta vērtību, kas ir atkarīga no tā bāzes stāvokļa: nodrošinātāju,
migrāciju, MCP rīku un stratēģiju skaitu, README SVG skaitļus vai faktu momentuzņēmumu. Viens solis
pārrēķina tos visus — `npm run release:refresh-derived`; to palaiž laidiena process un nakts
atvasinātās vērtības atsvaidzināšanas PR. Tāpēc **starp laidieniem bāze pēc konstrukcijas atpaliek no
aktīvā koda**, un vārti vai tests, kas salīdzinātu koku ar aktīvo kodu, būtu neveiksmīgs katrā PR pēc tam,
kad kāds blakus PR pievienojis nodrošinātāju. Vārti, kas vērtē atvasinātās vērtības, darbojas vienā no
diviem režīmiem, ko atrisina `scripts/check/lib/gateMode.mjs` (tiek izmantota pirmā atbilstība):

1. `--mode=pr|release` komandrindā;
2. vides mainīgais `OMNIROUTE_GATE_MODE` (`pr` vai `release`);
3. automātiski, pamatojoties uz GitHub Actions notikumu: `pull_request`, kura galvene nav
   `release/v*`, `merge_group` vai push uz `omni-queue/**` → `pr`; viss pārējais (push, grafiks,
   dispatch, laidiena PR `release/v* → main`, jebkura lokāla izpilde) → `release`.

Ko `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) pārbauda katrā režīmā:

| Režīms    | Neatbilstības                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Nepieciešami aktuālie fakti |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `release` | Katra pārbaude — stingra vienādība ar no koka apkopotajiem faktiem (tāda darbība, kāda vārtejai vienmēr bijusi): novecojis skaits, versija, pārklājuma slieksnis vai SVG skaitlis ir STRICT novirze                                                                                                                                                                                                                                                                                                      | Jā                          |
| `pr`      | Tikai tas, ko izmaiņas paveica, salīdzinot ar PR bāzi, izmantojot tos pašus apgalvojumu izvilcējus: (1) pārvaldīta vērtība, kas šai pārbaudei un failam bāzē nepastāvēja (”PR rediģēja pārvaldītu skaitli — atjaunojiet rindu līdz bāzes tekstam”); (2) nepieciešams apgalvojums, kas bija bāzē, bet tika zaudēts galvenajā zarā. Satura invarianti, kuriem nav nepieciešami fakti, tiek izpildīti tāpat kā `release` režīmā; tikai `release` režīmam paredzētās pārbaudes tiek uzskaitītas un izlaistas | Nē                          |

Aģenta instrukciju faili vispār nesatur atvasinātus skaitļus: `AGENTS.md`, `llm.txt` (un tā
`docs/i18n/*/llm.txt` kopijas), bs `AGENTS.md` atzars, `open-sse/services/AGENTS.md`,
`src/shared/constants/agentSkills.ts`, `skills/README.md` un katrs `skills/*/SKILL.md` norāda uz
avotu (piemēram, `ROUTING_STRATEGY_VALUES` failā `src/shared/constants/routingStrategies.ts`) un
uz `npm run facts`. Invariants ”Nav atvasinātu skaitļu (aģenta instrukciju failā …)” abos režīmos
ziņo par neveiksmi, ja tur ir skaitlis (nodrošinātāji, migrācijas, MCP rīki un tvērumi,
maršrutēšanas stratēģijas, vērtēšanas faktori, režīmu pakotnes), tāpēc laidiena atsvaidzināšanai
nekad nav jāpārraksta instrukciju fails.

`pr` režīmā rakstītāja zari drīkst rediģēt pārvaldītās vērtības: `chore/derived-*` (nakts
atsvaidzināšanas PR), `release/v*` un tulkojumu viļņi `docs/i18n-*` un `chore/i18n-*`
(`scripts/check/lib/derivedClaimsDiff.mjs`). Rindas pakotnes (`merge_group`, Mergify melnraksti,
`omni-queue/**`) vairs netiek vērtētas: tās apvieno PR, kurus vārteja jau novērtēja pa vienam.

Izejas kodi: `0` — tīrs · `1` — STRICT novirze (vai viegla novirze ar `--strict`) vai pārvaldītas
vērtības pārkāpums · `2` — infrastruktūras kļūme — koda faktus nevarēja apkopot (`tsx` zonde
neizdevās vai iestājās taimauts; taimautu nosaka `OMNIROUTE_FACTS_TIMEOUT_MS`, noklusējums
600000 ms) vai arī CI vidē PR diff bāzi nevarēja atrisināt. Izejas kods 2 nekad nenozīmē
dokumentācijas atšķirību: palaidiet darbu vēlreiz vai izlabojiet vidi.

Kur tiek izpildīts katrs režīms:

| Kur                                                                                                                     | Režīms                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Funkciju PR — `ci.yml` darbs `docs-sync-strict`, `quality.yml` solis ”Docs accuracy”                                    | `pr` (automātiski); darbs nodod bāzi kā `BASE_SHA` un izveido izrakstu ar `fetch-depth: 2`                                                                                                                       |
| `merge_group`, `omni-queue/**` kandidāti, pilns sapludināšanas vilciena vārtejas saraksts                               | `pr`                                                                                                                                                                                                             |
| Laidiena PR (`release/v* → main`), nosūtīšanas, ieplānotās un manuālās palaišanas                                       | `release`                                                                                                                                                                                                        |
| Release-Green (`scripts/quality/validate-release-green.mjs`)                                                            | HARD vienumi tiek izpildīti ar `OMNIROUTE_GATE_MODE=pr` (”vai bāze to sabojāja?”); DRIFT vienums `derived-refresh` palaiž `npm run release:refresh-derived -- --check` (stingrais skats, nekad neatver base-red) |
| Laidiens (`/generate-release` 0a. un 1. fāze; prasmju savienojums ir atsevišķas izmaiņas, ko apstiprinājis atbildīgais) | `npm run release:refresh-derived` ieraksta atvasinātos failus; laidiena PR paša pārbaudes pēc tam tiek izpildītas `release` režīmā                                                                               |
| `nightly-derived-refresh.yml` (katru dienu, augstākā `release/vX.Y.Z`, izlaists release-freeze laikā)                   | `npm run release:refresh-derived -- --profile=nightly`; ja ir atšķirības, tas uztur ATVĒRTU VIENU PR no `chore/derived-refresh`; nekad nesapludina                                                               |

Komandas, kas to nodrošina:

- `npm run facts` izdrukā katru atvasināto skaitli JSON formātā (`scripts/release/facts.mjs`).
  `--key=code.mcpTools` izdrukā vienu vērtību, bet `--snapshot` nolasa komitēto momentuzņēmumu, nevis
  aktuālo koku. Ja faktus nevar iegūt, tiek iziets ar kodu 2.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) vienā piegājienā pārrēķina
  atvasinātos failus šādā secībā (soļu ID vērtībai `--only=`): `provider-reference`
  (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (momentuzņēmums), `numbers` (skaitļu vārtu
  pārrakstīšanas plāns tiek lietots dokumentācijai un pēc tam pārnests uz to
  `docs/i18n/` spoguļiem), `readme-diagrams`, `skills` (ģenerēts `SKILL.md`), `e2e-timings`
  (izlaists, līdz kokā būs `syncE2eTimings`), `ui-keys` (izņem atslēgas, kuras `en.json` vairs
  nesatur, un ar `--rewritten-since=<ref>` — noklusējums ir `origin/main` — atkārtoti rindā ievieto
  angļu vērtības, kas pārrakstītas kopš pēdējā laidiena), `llm-mirrors` un `verify-generated`
  (pēc ierakstīšanas laidiena režīmā jāizpildās `check:generated-artifacts` un
  `check:agent-skills-sync`; `--check` režīmā un tad, ja `--only` to neietver, šis solis tiek
  izlaists; kļūmes gadījumā tiek iziets ar kodu 2). Solis `changelog` ir jāieslēdz
  (`--with-changelog`), un tas ir pieejams tikai laidiena profilā. `--profile=nightly`
  nekad nemaina versijas apgalvojumu. Ar `-- --check` nekas netiek ierakstīts, un, ja kāds fails
  mainītos vai pārvaldītai vērtībai būtu nepieciešama manuāla rediģēšana, tiek iziets ar kodu 1
  (tiek uzskaitīti abi gadījumi); infrastruktūras kļūmes gadījumā tiek iziets ar kodu 2.
  `--json` rezultātu izdrukā JSON formātā.
- `docs/reference/derived-facts.json` ir faktu momentuzņēmums, ko izmantoja pēdējā atsvaidzināšana. To
  raksta tikai atsvaidzināšanas process. README SVG ģeneratori to nolasa, un PR laikā vienības testi
  komitēto dokumentāciju un ģenerētos failus salīdzina ar to — nekad ne ar aktuālo kodu. Komplektā
  vienīgais salīdzinājums ar aktuālo kodu ir “laidiena atsvaidzināšana aizver ciklu”
  failā `tests/unit/check-docs-counts-sync.test.ts`: izmantojot aktuālos faktus, atsvaidzināšanas
  pārrakstīšanas plāna lietošana atmiņā neatstāj nevienu STRICT novirzi, par kuru tas neziņo, un
  atkārtota plāna izveide neko nemaina.

Lai lokāli atkārtotu (lokālā palaišana pēc noklusējuma izmanto `release`):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

Ja nav atrisināmas bāzes (nav `BASE_SHA`/`BASE_REF` un nav lokāla
`origin/release/v<version>`), lokālā `pr` palaišana izdrukā brīdinājumu un izlaiž atšķirību
pārbaudi, nevis ziņo par kļūmi.

### Darbs: `i18n-ui-coverage`

| Skripts                           | Validē                                                                                                                                                                                                  | Bloķējošs                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check-ui-keys-coverage` (inline) | UI i18n atslēgu pārklājums ir ≥ 65%                                                                                                                                                                     | Jā (abos režīmos)          |
| `check:ui-icu`                    | Katra UI kataloga katrs ziņojums tiek kompilēts ar `IntlMessageFormat`                                                                                                                                  | Jā (abos režīmos)          |
| `check-ui-value-drift` (inline)   | Pārrakstīta angļu **vērtība** neatstāj aiz sevis novecojušu tulkojumu                                                                                                                                   | Jā (tikai laidiena režīmā) |
| `check-new-key-coverage` (inline) | **Jauna** angļu atslēga ir iztulkota katrā lokalizācijā — `__MISSING__:` marķieris tiek noraidīts                                                                                                       | Jā (tikai laidiena režīmā) |
| `check-key-completeness` (inline) | Katrs UI katalogs (un ar `--catalog=cli` — katrs CLI katalogs) satur tieši tādu pašu atslēgu kopu kā tā `en.json`; `pr` režīmā katrs PR mainītais katalogs tiek salīdzināts ar sevi sapludināšanas bāzē | Jā (abos režīmos)          |
| `check-translation-ratio`         | Reālo tulkojumu attiecība katrā lokalizācijā (identiska angļu valodai / viettura / trūkstoša, ārpus atļauju saraksta) nedrīkst pārsniegt `config/quality/i18n-translation-baseline.json` + pielaidi     | Jā (tikai laidiena režīmā) |

Nepieciešams `fetch-depth: 0` — vērtību noviržu vārti salīdzina `en.json` ar sapludināšanas bāzi.

**Divi režīmi (kopš 2026-11-13).** Funkcijas PR pievieno vai pārraksta atslēgas failā `en.json`
(un `bin/cli/locales/en.json`) un neaizskar nevienu citu lokalizāciju;
`check:pr-derived-paths` (darbs `pr-test-policy`, saime
`config/quality/derived-paths/translation.json`) noraida funkcijas PR, kas tā rīkojas. Pārējās
lokalizācijas tiek pabeigtas reizi laidienā ar `release:refresh-derived`, kas izsauc
`syncUiKeys()` failā `scripts/i18n/sync-ui-keys.mjs` (pievieno trūkstošās atslēgas, izņem
dzēstās, ar `rewrittenSinceRef` atzīmē pārrakstītās angļu valodas tulkojumus, iztulko), vai arī
tulkošanas viļņa laikā. Vārti nolasa režīmu no `scripts/check/lib/gateMode.mjs`: `pr` režīmā
(funkcijas PR, `merge_group`, `omni-queue/**`) iepriekš minētie laidiena režīma vārti izdrukā
`SKIP reason=pr-mode` un iziet ar kodu 0; `release` režīmā (laidiena PR, nosūtīšana uz `main`,
`workflow_dispatch`, lokālās palaišanas) tie darbojas tikpat stingri kā iepriekš, un laidiena PR
gadījumā vārti, kas ņem vērā atšķirības, saņem `BASE_REF=origin/main`, tādējādi pārbaudot katru
atslēgu, ko cikls pievienoja vai pārrakstīja. Funkcijas PR rezultāta priekšskatījumu lokāli var
iegūt ar `--mode=pr`.

PR, kas `pr` režīmā joprojām maina lokalizāciju katalogus (tulkojumu vilnis, laidiena atsvaidzināšana vai tikai tulkojumu labojums), netiek izlaists: `check-key-completeness` katru mainīto katalogu salīdzina ar to pašu katalogu sapludināšanas bāzē (`scripts/i18n/lib/touched-catalogs.mjs`) un neizdodas, ja katalogā trūkst kādas atslēgas, kuras tas zaudējis, ja `en.json` trūkst kādas atslēgas, ja īsts tulkojums ir pārvērsts par `__MISSING__:` marķieri vai angļu tekstu, vai arī vērtība vairs neinterpolē angļu virknes vietturus/tagus, kurus PR nav mainījis. Katalogam, kas PR pievienots no jauna, jāietver viss `en.json` atslēgu kopums. Tas aptver to, ko attiecībā uz PR mainītajiem katalogiem redzētu attiecības un CLI atbilstības pārbaudes.

Lokalizāciju atbilstības vienības testi (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) seko tiem pašiem režīmiem, izmantojot `tests/_helpers/localeParityMode.ts`: `pr` režīmā tie izlaiž atslēgu atbilstības apgalvojumus un atstāj laidiena atsvaidzināšanai vietturu atbilstību tām atslēgām, kuru angļu teksts kopš sapludināšanas bāzes ir mainījies (visām atslēgām, ja vienības testa seklā pārbaude nevar to nolasīt). Šis palīgrīks ir **vienīgā** sankcionētā režīmatkarīgā izlaišana: `check:test-masking` uzskaita `.skip(` un `{ skip: true }`, bet ne aprēķināto `{ skip: "<reason>" }`, ko tas atgriež, tāpēc `tests/unit/locale-parity-mode.test.ts` fiksē to testu sarakstu, kuriem atļauts to izmantot — jauna testa pievienošana šim sarakstam ir pārskatāma izmaiņa tajā.

#### `check-ui-value-drift` — novecojušu tulkojumu pārbaude

Atklāj vienīgo i18n regresiju, ko pārējās pārbaudes strukturāli nevar pamanīt: angļu vērtība tiek pārrakstīta, bet tulkojumi, kas iegūti no _iepriekšējās_ angļu vērtības, paliek nemainīti, tāpēc lietotāji, kas neizmanto angļu valodu, turpina lasīt pārliecinoši formulētu, bet tagad nepareizu tekstu.

Tas nonāca produkcijā. `oauthModal.googleOAuthWarning` tika pārrakstīts, kad tika pievienots Antigravity pieteikšanās palīgs (#5203); **39 no 43 lokalizācijām** saglabāja tekstu, kas operatoriem lika “nokopēt pilno URL un ielīmēt to šeit” — darbplūsmu, kuru šim pakalpojumu sniedzējam nav iespējams pabeigt. Tas palika nepamanīts līdz #8463, jo:

- `sync-ui-keys` aizpilda tikai **trūkstošās** atslēgas, nekad neatjaunina **novecojušās**;
- `check-ui-keys-coverage` skaita atslēgas _esamību_, tāpēc novecojis tulkojums tiek uzskatīts par iekļautu;
- `check-translation-drift` seko `docs/i18n/<locale>/**.md` dokumentācijas spoguļiem — tas nekad nelasa `src/i18n/messages/*.json`. Tas darbojas darbā `docs-sync-strict`: PR gadījumā kā informatīva pārbaude, bet push un nakts pārbaudes gadījumā stingri; tulkojumu vilnis atsvaidzina spoguļus, nevis funkcionalitātes PR.

**Apzinās atšķirības, nevis balstās uz bāzes stāvokli.** Tas salīdzina `en.json` sapludināšanas bāzē ar darba koku; katrai atslēgai, kuras angļu vērtība ir mainījusies, jebkura lokalizācija, kurā joprojām ir nemainīts tulkojums, ir novecojusi. Tādējādi apzināti tiek “iesaldēts” iepriekš pastāvošais parāds — atšķirība nevar atklāt, no kuras senākas angļu vērtības radies ilgstoši pastāvošs tulkojums, tāpēc pārbaude vērtē tikai to, kam pieskaras pašreizējās izmaiņas. Alternatīva — katras atslēgas jaucējvērtības bāzes fails — prasītu aptuveni 600 KB lielu ģenerētu failu, kas ir trīs reizes lielāks par lielāko esošo bāzes failu, un radītu izmaiņas katrā i18n PR.

To var izpildīt divos veidos:

1. atjaunināt ietekmētos tulkojumus, vai
2. iestatīt tos uz `__MISSING__:<new english>` — izpildlaiks pēc tam nodrošina laboto angļu tekstu (`src/i18n/request.ts::deepMergeFallback`, #7258), un atslēga tiek ievietota tulkošanas rindā.

Ja virknes **nozīme** ir mainījusies, dodiet priekšroku **atslēgas pārdēvēšanai**: jauna atslēga nevar pārņemt novecojušu tulkojumu. Šādu pieeju izmantoja #8463.

```bash
npm run i18n:check-value-drift          # stingrais režīms (ko palaiž CI)
npm run i18n:check-value-drift:warn     # tikai ziņot
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Atgriež kodu 0 ar `SKIP reason=base-unresolved`, ja bāzes katalogu nevar nolasīt (sekla klona pārbaude bez bāzes ref), atdarinot `check-openapi-breaking`. Tikai laidiena režīmā: funkcionalitātes PR pārraksta angļu tekstu un apstājas; laidiena atsvaidzināšana atzīmē aiz sevis atstātos tulkojumus (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, izmantojot to pašu `findStaleTranslations`).

### Darbs: `i18n`

Pilna i18n validācijas matrica (viens darbs katrai lokalizācijai). Viss darbs ir informatīvs.

| Skripts                         | Validē                                   | Bloķējošs                                                |
| ------------------------------- | ---------------------------------------- | -------------------------------------------------------- |
| `validate_translation.py quick` | Tulkojuma pilnīgumu katrai lokalizācijai | **Informatīvs** (`continue-on-error: true` visam darbam) |

### Darbs: `pr-test-policy`

Darbojas tikai pull request gadījumā.

| Skripts                | Validē                                                                                                                                        | Bloķējošs |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR, kas maina produkcijas kodu mapēs `src/`, `open-sse/`, `electron/` vai `bin/`, jāietver vai jāatjaunina testi (Stingrais noteikums #8)     | Jā        |
| `check:test-masking`   | Mainītie testu faili nesamazina kopējo apgalvojumu skaitu un nepievieno `assert.ok(true)` tautoloģijas                                        | Jā        |
| `check:pr-evidence`    | PR aprakstā ir norādīti testa/VPS pierādījumi par izmaiņām (Stingrā noteikuma #18 realizācija, meklējot PR tekstā — trausli, skatiet Backlog) | Jā        |

### Darbs: `test-vitest`

Darbojas pēc `build`. Kļūmes gadījumā bloķē sapludināšanu.

| Komplekts        | Validē                                                                | Bloķējošs                                                                                                     |
| ---------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveri (110 rīki), autoCombo, kešatmiņu — vitest izpildprogramma | Jā                                                                                                            |
| `test:vitest:ui` | UI komponentu testus — vitest izpildprogramma                         | **Bloķējošs** — iepriekš pastāvošās kļūmes ir skaidri izslēgtas `vitest.config.ts`; jaunas kļūmes aptur darbu |

### Nakts darbplūsmas (ieplānotas, informatīvas)

Tās tiek palaistas pēc cron grafika (un ar `workflow_dispatch`), nekad ne PR. Visas ir informatīvas.

| Darbplūsma             | Validē                                                                                                                                                                          | Bloķējošs       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | fast-check īpašību testus ar nejaušu sākumvērtību un lielu izpildes reižu skaitu                                                                                                | **Informatīvs** |
| `nightly-resilience`   | heap pieauguma vārtus, haosa kļūmju ievadīšanu, k6 slodzes un ilgstošas darbības testus                                                                                         | **Informatīvs** |
| `nightly-llm-security` | promptfoo ievades uzbrukumu aizsardzību (bloķēšanas režīmā) un garak zondes (izlaistas bez pakalpojumu sniedzēja noslēpuma)                                                     | **Informatīvs** |
| `nightly-schemathesis` | OpenAPI līguma fuzzēšanu (schemathesis) pret aktīvu OmniRoute, izmantojot `docs/openapi.yaml` — atklāj specifikācijas pārkāpumus / neapstrādātus 500. kļūdu kodus (8. fāze B.4) | **Informatīvs** |
| `nightly-mutation`     | Stryker mutāciju testēšanas rezultātu ātrajā vienību testu posmā — izdzīvojušās mutācijas atklāj vājus apgalvojumus                                                             | **Informatīvs** |
| `nightly-compat`       | Node dzinēja saderības matricu visos atbalstītajos `engines.node` diapazonos                                                                                                    | **Informatīvs** |

Veiktspējas bāzlīnijas (heap, TTFB, kompilēšanas laiks) tiek reģistrētas, bet netiek izmantotas kā bloķējošs nosacījums: skatiet [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

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
