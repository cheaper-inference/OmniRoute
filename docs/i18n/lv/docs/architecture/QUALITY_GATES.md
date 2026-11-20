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

## Vārtu inventarizācija un izpildes profili

### Kandidātu uzņemšana

Katra CI un Quality Gates darbplūsma rada stabilu spriedumu: `Gate / CI` un `Gate / Quality`. Viņu versijās uzņemšanas politikā ir uzskaitīti visi iepriekšējie darbi pēc nepieciešamības vai ieteikumi. Piemērojamam nepieciešamajam darbam ir jābūt veiksmīgam: trūkstošo, atcelto, izlaisto, gaidošo un nezināmo rezultātu nevar noteikt PASS. Derīga klasifikācija tikai dokumentiem vai tikai katalogam var padarīt koda joslu nepiemērojamu; projekts PR nav pieņemts kandidāts. `hotfix` etiķete neatceļ pierādījumus.

Abas darbplūsmas ietver PRs main/release zaros, pārceļ uz `main`, manuālu nosūtīšanu un grupu sapludināšanu. Push, nosūtīšanas un sapludināšanas grupa izpilda pilnu atlasi. Nospiežot uz `release/**` tās nesāk (2026-10-18): katra izmaiņa jau palaida matricu savā PR, un apvienotā kombinācija ir Release-Green darbs (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks un sapludināšanas grupas izmanto mitinātos skrējējus darbiem, kuros citādi tiek atlasīti pašmitinātie skrējēji; pirms izlaišanas ir jāpārbauda pietiekama mitinātā jauda.

Parasts PR veic ātro atlasi. Uzņemšanas politikas `full-code` un `full-code-e2e` joslas (E2E, integrācija, pakotnes artefakts, Electron smoke, Bun SQLite, ekosistēmas un protokola klienti) darbojas tikai sapludināšanas rindas melnrakstā vai pilnā izpildē: `gh workflow run ci.yml --ref <branch>`.

Katrā JSON kvītī ir norādīts izņemtais SHA, darbplūsmas izpilde un mēģinājums. CLI noraida checkout/event SHA neatbilstību. Darbplūsmas testi saista dalību politikā ar sprieduma darba `needs` sarakstu, tāpēc jauna vai noņemta josla nevar klusībā pazust. Kvītis attiecas uz viņu pašu darbplūsmu, nevis uz publicēšanu, izvietošanu vai esošā konsultatīvā skenera iekšējām ierīcēm. Abu čeku nosaukumu aktivizēšana filiāles noteikumos ir atsevišķa administratīva izmaiņa; šo darbu pievienošana pati par sevi neaizsargā filiāli.

### Apvienot rindu

`queue` etiķete nosūta PR uz sapludināšanas rindu (`.mergify.yml`). Mergify atver PR melnrakstu `mergify/merge-queue/` atzarā, CI palaiž tur pilnu atlasi, un sākotnējais PR tiek sapludināts, kad `Gate / CI`, `Gate / Quality` un `Merge integrity (changelog + generated skills)` tiek nokārtoti.

Mergify ieraksta savu rindas kopsavilkumu melnraksta aprakstā, un arī citas lietotnes var to rediģēt. Šāda melnraksta `pull_request` `edited` notikumam ir sava vienlaicības grupa (`-queue-edit-<run_id>`), tāpēc tas nevar atcelt melnraksta reālo izpildi, un tas izlaiž vārtus un matricu. Tikai `Merge integrity` joprojām darbojas. Izlaistajam vārtu darbam ir cits pārbaudes nosaukums, jo Mergify nolasa izlaisto `Gate / CI` kā neizdevušos pārbaudi un izslēdz PR.

Pēc rindas nosūtīšanas ne vienmēr tiek atjaunots PR. Komentējiet to `@mergifyio queue`.

### Saglabātie pierādījumi pieņemšanas reduktorā

`scripts/quality/validate-release-acceptance.mjs` samazina piegādāto plānu un tā izpausmes; tajā nav noteikts, ka plāns aptver visu atbrīvošanas cauruļvadu. Tās pārskatos ir skaidri noteikts `releaseAcceptance: false`, pat ja šis plāns ir `VERIFIED`. `release-acceptance.yml` darbplūsmā joprojām tiek izmantoti ēnu ķermeņi, nevis īstas versijas, pakotnes, sāknēšanas vai veicināšanas kvītis.

CLI pieprasa, lai `--evidence-root` pārbaudītu saglabātos pierādījumus. Faili tiek atrisināti kā `<evidence-root>/<artifact_id>/<member>` un sajaukti kā SHA-256. PASS ieraksts bez pierādījumiem, trūkstošs vai mainīts fails, nedrošs ceļš vai simboliskā saite neļauj pārbaudīt. Trūkstošie faili nav līdzvērtīgi tukšiem veiksmīgiem žurnāliem. Esošās SHA/run/attempt pārbaudes paliek neatkarīgas: atbilstoši baiti nevar glābt novecojušu kvīti. Faila integritāte nav izpildes autentiskuma vai artefaktu veicināšanas pierādījums.

### Statiskās skenēšanas inventārs

Versionētais npm-alias krājums un statiskās skenēšanas dalība ir pieejama `config/quality/gate-manifest.json`. Palaidiet `npm run check:gate-manifest`, lai pārbaudītu skriptu nosaukumus un precīzas komandas pret `package.json`; papildinājumi, noņemšana un komandu novirzīšana neizdodas gan vietējā āķa, gan izmaiņu klasifikācijas uzdevumos programmā CI. Pseidonīms nav darbplūsmas uzdevums, matricas gadījums vai testa gadījums: šos skaitļus nedrīkst uzrādīt kā savstarpēji aizstājamus.

Izmantojiet `npm run quality:scan -- --list` vai `npm run quality:scan:fast -- --list` lai pārbaudītu atlasītos aizstājvārdus, tos neizpildot. Runner izsauc npm ievades punktu, tāpēc tā izpildlaiks (tostarp Bun ja tas ir konfigurēts) tiek saglabāts. Manifesta ierakstu aizstājvārdi ārpus šiem profiliem ir atsevišķi izsaukti, un uzturēšanas komandas ir aizliegtas tikai lasāmos skenēšanas profilos.

Šie profili aptver tikai statisko skenēšanu. Tie nesertificē produktu testus, pārklājumu, iepakojumu, ārējās pārbaudes vai kandidāta pilnīgu izlaišanas apstiprinājumu. Darbplūsmas uzņemšana izmanto saistītos `config/quality/admission-policy.json` un `scripts/quality/admission-verdict.mjs`. Izlaiduma novērotāju profili paliek atsevišķi; neatkarīgi pārbaudīt savus piemērojamos čekus un kvītis. Pilnas novērotāja statiskās komandas tiek deklarētas `config/quality/release-green-static-profile.json`, ieskaitot `audit:deps`, mutāciju testa atlasi un tulkošanas pārbaudes. Ielādētājs pārbauda npm komandas pret package.json un modelētajām CI/Quality deklarācijām; tas noraida drift, nevis izpilda čaulas marķierus kā argumentus. Nepieciešamā skenera SKIP/INCOMPLETE izvade nevar izveidot PASS. Profilā tiek reģistrēti ārējie izņēmumi, un tas neaizstāj mitināto pārklājumu, testa matricas, pakotnes vai izvietošanas pierādījumus. Tālāk sniegtais prozas saraksts ir atsauce, nevis pierādījums tam, ka vārti patiešām skrēja.

Skripti atrodas zem `scripts/check/` (politikas vārti) un `scripts/quality/` (sprūdrata dzinēja). CI patiesības avots ir `.github/workflows/ci.yml`.

### Atlaidiet PR ātro ceļu (`quality.yml`)

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

`npm run check:forgotten-sibling-tests` darbojas kā `Fast Quality Gates` padomdevēja darbība un atkārtoti izmanto importēšanas atrisinātāju aiz testa ietekmes kartes. Par katru mainīto ražošanas moduli tas ziņo par deterministiskām `changed module/symbol -> static consumer -> candidate sibling test` ķēdēm, ja kandidāta tests nav iekļauts pull-request diff. Markdown kopsavilkums un JSON rezultāts tiek saglabāts kā `forgotten-sibling-tests` darbplūsmas artefakts kalibrēšanai pirms bloķēšanas izlaišanas.

Mucu reeksports un dinamiskais imports ir tikai izšķirtspējas diagnostika; tie nekad nerada bloķējošu atradumu. Pārskatītie izņēmumi dzīvo šeit: `config/quality/forgotten-sibling-allowlist.json`. Katrā ierakstā ir jānosauc patērētāja un kandidāta tests, jāsniedz konkrēts pamatojums un jāsaista GitHub problēma vai izvilkšanas pieprasījums. Nepareizi veidotus ierakstus neizdodas aizvērt. Izņēmumi nevar apspiest dzēstu kandidāta testu vai atšķirību, kas pievieno `.skip`/`.todo`; apgalvojumu vājināšanās un cita maskēšana paliek neatkarīgi bloķējošajiem `check:test-masking` vārtiem.

### Darbs: `lint`

Darbojas katrā PR līdz `main`. Neveiksmes gadījumā bloki tiek apvienoti.

| Skripts (`npm run ...`)           | Validē                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Bloķēšana                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `check:node-runtime`              | Node.js versija atrodas atbalstītajā diapazonā                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jā                                                 |
| `check:cycles`                    | Cikliskie importi visā `src/` + `open-sse/` (balstīts uz AST, `tsconfig` `paths` atrisināti). Bare iziet ar kodu 1, ja pastāv kaut viens cikls (kopš #15281 tiek izmantota kļūmju novēršanas pieeja) un uzskaita SCC. `check:cycles:ratchet` (to palaiž CI) bloķē, ja skaits pārsniedz `quality-baseline.json` `metrics.cycles` griestus — pašlaik 14, `direction: down`, tāpēc tas var tikai samazināties (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jā (ratchet)                                       |
| `check:boundary`                  | `open-sse → src` sasaistes: unikālie failu–faila importi no dzinēja uz lietotni (`scripts/quality/measure-boundary.mjs`; malu saraksts ir v4 kodola/moduļu sadalīšanas novēršanas darbu saraksts). Bare = informatīvs pārskats (tāds pats kā `quality:boundary`). `check:boundary:ratchet` (to palaiž CI, arī `quality.yml` ātro vārtu ratchet ciklā) bloķē, ja skaits pārsniedz `quality-baseline.json` `metrics.boundaryOpenSseToSrc` griestus — sākotnēji iestatīti uz izmērīto 771, `direction: down`; `--update` tos tikai samazina; PR izmaiņām tiek izmantota bāzes relatīvā vērtība (`--base-ref`, skatiet tālāk)                                                                                                                                                                                                                                                                                                                                                                                    | Jā (ratchet)                                       |
| `check:route-validation:t06`      | Zod shēmas ir pieejamas visos maršrutos (6. līmeņa politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jā                                                 |
| `check:any-budget:t11`            | `@ts-expect-error // any` count does not exceed budget (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jā                                                 |
| `check:provider-consistency`      | Katram pakalpojumu sniedzējam failā `providers.ts` ir atbilstošs ieraksts failā `providerRegistry.ts` (un otrādi, atļauto saraksta ietvaros)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jā                                                 |
| `check:model-lifecycle`           | Trīs manuāli uzturētās maršrutēšanas tabulas ir savstarpēji konsekventas ar repozitorijā iekļauto dzīves cikla momentuzņēmumu (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nepiešķir vērtējumu nevienam pensionētam identifikatoram, kuru `REGISTRY` var maršrutēt; katrs `BUILT_IN_ALIASES` mērķis atrodas `REGISTRY` un nav pensionēto identifikatoru momentuzņēmumā; katrs pensionētais identifikators, kas joprojām atrodas `REGISTRY`, tiek pārsūtīts vai ir norādīts `allowedRetiredInCatalog`; un neviens `DEFAULT_DEGRADATION_MAP` avots vai mērķis šajā momentuzņēmumā nav atzīmēts kā pensionēts. Tas nepierāda, ka modeli pašlaik apkalpo aktīvs augšupējais pakalpojums. Darbojas bezsaistē — salīdzina ar `config/quality/model-lifecycle.json`, kas manuāli tiek atjaunināts ar `npm run quality:refresh-model-lifecycle` (nepieciešams tīkls; nav integrēts CI). `allowedRetiredInCatalog` ir pakāpeniskas samazināšanas slieksnis: pievienojiet ierakstu tikai kopā ar izsekošanas uzdevumu. | Jā                                                 |
| `check:fetch-targets`             | Katrs `fetch("/api/...")` klienta puses `src/` direktorijā tiek atrisināts līdz reālam `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jā                                                 |
| `check:deps`                      | Visas `npm install` instalējamās atkarības katrā repozitorija `package.json` failā ir iekļautas failā `dependency-allowlist.json`; tiek atzīmētas jaunas nepiespraustas vai slopsquatotas pakotnes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jā                                                 |
| `audit:deps`                      | Visu piecu neatkarīgo bloķēšanas failu (saknes, Electron, OpenCode spraudņu v1/v2 un pakalpojumu sniedzēja) npm audits. Kritiskie ieteikumi par drošības ievainojamībām bloķē procesu; augstas prioritātes ieteikumi paliek redzami kā brīdinājumi. Trūkstoši vai neveiksmīgi auditi tiek uzskatīti par NEPABEIGTIEM un bloķē procesu; katras darbības jomas bloķēšanas failu jaucējvērtības un pārskati tiek saglabāti.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jā                                                 |
| `check:lockfile`                  | `package-lock.json` integritāte — https reģistrs, integritātes jaucējvērtības, bez resursdatora aizstājējiem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jā                                                 |
| `check:licenses`                  | SPDX licenču atļauju saraksts ražošanas atkarībām                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jā                                                 |
| `check:tracked-artifacts`         | Nav būvēšanas artefaktu / pievienotu `node_modules` simbolisko saišu (tiek palaista arī husky pre-commit režīmā; pre-push apzināti ir minimāls — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Jā                                                 |
| `check:ai-attribution`            | PR komitēs, virsrakstā vai pamattekstā nav AI/bota `Co-Authored-By` piekabes vai AI ģenerēšanas kājenes — stingrais noteikums #16 ( `quality.yml` ātro vārtu ciklā PR→`release/**` — nolasa notikuma lietderīgo slodzi, ārpus PR ir tukšdarbība — un tikai PR paredzētā darbībā `ci.yml` linterī PR→`main`; arī husky `commit-msg` āķī; cilvēku līdzautori ir atļauti; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:vitest-exclusions`         | Katram Vitest izņēmumam ir norādīta izsekošanas problēma, un tas parādās failā `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jā                                                 |
| `check:file-size`                 | Avota faili (`.ts`/`.tsx` mapēs `src/`, `open-sse/`, `electron/`, `bin/`) nepārsniedz `cap`, bet testu faili (`*.test.ts(x)`) — `testCap`; failu, kas iesaldēti failā `file-size-baseline.json` (`frozen` / `testFrozen`), izmērs nedrīkst pārsniegt tajā reģistrēto izmēru                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jā                                                 |
| `check:error-helper`              | Kļūdu atbildēs izpildītājos/apdarinātājos tiek izmantotas `buildErrorBody()` / `sanitizeErrorMessage()` (Stingrais noteikums #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jā                                                 |
| `check:migration-numbering`       | Migrācijas failu nosaukumi: vecā `001`–`241` sērija ir iesaldēta, bet jaunie faili ir `YYYYMMDDHHMMSS_<description>.sql`. Pret PR bāzi tas noraida noņemtu migrāciju, pārdēvētu migrāciju bez saderības ieraksta un neatbilstošu vai rediģētu migrāciju, kuras galīgā shēma nepārvietojas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:public-creds`              | Ārpus `publicCreds.ts` nav burtisku OAuth `client_id`/`client_secret` vai Firebase tīmekļa atslēgu (Stingrais noteikums #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jā                                                 |
| `check:db-rules`                  | Ārpus `src/lib/db/` moduļiem nav neapstrādāta SQL; no `localDb.ts` netiek veikti mucas importi (Stingrie noteikumi #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jā                                                 |
| `check:known-symbols`             | Pakalpojumu sniedzēju izpildītāji, maršrutēšanas stratēģijas un tulkotāji, kas reģistrēti to nosūtīšanas tabulās, atbilst diskā esošajiem failiem — nav neizmantotu vai nedeklarētu simbolu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jā                                                 |
| `check:route-guard-membership`    | Katrs maršruts, kas palaiž bērnprocesu, tiek klasificēts, izmantojot `isLocalOnlyPath()` (Stingrie noteikumi #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jā                                                 |
| `check:test-discovery`            | Katru `*.test.ts` / `*.spec.ts` failu repozitorijā apkopo vismaz viens testu palaidējs (ratchet: neaprīkoto failu saraksts failā `test-discovery-baseline.json` var tikai sarukt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jā                                                 |
| `check:test-tla-order`            | Neviens `node:test` fails mapē `tests/unit` nereģistrē testu, nesasniedz augstākā līmeņa `await` un pēc tam nereģistrē vēl citus testus (#18045; ratchet: `test-tla-order-allowlist.json` var tikai sarukt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jā                                                 |
| `check:agent-skills-sync`         | Ģenerētie aģentu prasmju artefakti atbilst to avota katalogam (bez novirzes). Atbrīvošanas režīms pārbauda katru prasmi; līdzeklis PR (`pr` režīms) pārbauda tikai tās prasmes, kuru ģenerēto tekstu tas rediģē — skatiet [sadaļu Ģenerēti faili un atvasinātās bāzes līnijas](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Pakalpojumu sniedzēju logotipiem/resursiem ir reģistrēts izcelsmes ieraksts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | JSON konfigurācijas faili tiek parsēti un atbilst repozitorija lint noteikumiem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | TypeScript kompilācija bez kļūdām (informatīvi brīdinājumi ir pieļaujami)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jā                                                 |
| `typecheck:noimplicit:core`       | Stingrs `noImplicitAny` — vērsts uz nākotni; daudzām jau esošajām izsaukuma vietām vēl nepieciešamas anotācijas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Ieteikuma pārbaude** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, kas attiecināts uz `src/app/(dashboard)/**` (#7033) — `typecheck:core` atlasītais 27 failu atļautais saraksts neietver nevienu dashboard TSX failu, un arī `next build` nekad neveic tā tipa pārbaudi (`next.config.mjs` iestata `ignoreBuildErrors: true`), tāpēc bāreņidentifikatoru regresijas tur (#6625/#6909) CI bija neredzamas. Veic salīdzināšanu ar iesaldētu katra faila/TS koda skaita bāzlīniju (`config/quality/dashboard-typecheck-baseline.json`, tāds pats novecojušas ievērošanas modelis kā `check:known-symbols`) — vārteju neiztur tikai JAUNI kļūdu skaiti, kas pārsniedz bāzlīnijā norādīto; samaziniet skaitu ar `--update`, kad iepriekš esoša kļūda ir izlabota.                                                                                                                                                                                                                                                                                                            | Jā                                                 |
| `check:build-typecheck`           | Visas lietotnes ražošanas veida pārbaude `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), virsmas `typecheck:core` 27 failu atļaušanas saraksts un informācijas paneļa vārti neaptver. Atšķirības pret `config/quality/build-typecheck-baseline.json`; jauns vai paaugstināts per (fails, kods) skaits neizdodas, mazāks skaits prasa sprūdratu. `--update` atsakās, kamēr izpildē ir jauns vai paaugstināts pāris, ja vien `--force-regressions` nav nokārtots, un noraida tikko apklusināto failu, ja vien `--force-nocheck` nav izturēts, tāpēc bāzes līnijas paplašināšana, lai iegūtu zaļu krāsu, un pastāvīga klusuma piešķiršana ir divas atsevišķas apzinātas darbības. Pliks `--force` tiek noraidīts. Skenē arī `@ts-nocheck` veidošanas tvērumu pret `config/quality/ts-nocheck-baseline.json`, jo fails, kas to izmanto, vispār neziņo par diagnostiku un citādi būtu neredzams visiem vārtiem.                                                    | Jā                                                 |

#### Divas tipa pārbaudes programmas atbild atšķirīgi

`typecheck:core` un `check:build-typecheck` apkopo dažādas programmas ar dažādām opcijām, un viens un tas pats fails var būt tīrs vienā un pilns ar kļūdām otrā.

`tsconfig.build.json` iestata `"strict": false`, tāpēc `noImplicitAny` ir izslēgts. Galvenā konfigurācija apkopo atlasītu 27 failu atļaušanas sarakstu ar stingrākām opcijām un seko katra ieraksta importēšanas diagrammai, tāpēc faili, kas nekad netiek rādīti veidošanas programmā, joprojām tiek pārbaudīti.

Sekas ir svarīgas, vērtējot, vai fails ir drukāts:** nulles diagnostika zem `check:build-typecheck` nenozīmē nulli** . Izņemot `@ts-nocheck` no 26 failiem, 23 no tiem tika parādīti tīri būvēšanas programmā; sešpadsmit no tiem atklāja aptuveni 120 netiešas kļūdas stingrajā. Pirms faila izsaukšanas pārbaudiet abus.

### Darbs: `quality-gate`

Skrien pēc `test-coverage`. Neveiksmes gadījumā bloki tiek apvienoti.

| Skripts                      | Validē                                                                                                                                                                                            | Bloķēšana              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | Izdala `quality-metrics.json` (ESLint brīdinājumu skaits, pārklājums no apvienotā shard ziņojuma)                                                                                                 | Jā (augšpus sprūdrata) |
| `quality:ratchet`            | Katrs `quality-baseline.json` rādītājs nav regresējis (ESLint brīdinājumi ≤ bāzes līnija; pārklājuma ≥ bāzes līnija)                                                                              | Jā                     |
| `check:duplication`          | Koda dublēšana (jscpd@4) nepārsniedz `quality-baseline.json` bāzes līniju                                                                                                                         | Jā                     |
| `check:complexity`           | Faila līmeņa ciklomātiskā sarežģītība nepārsniedz ierobežojumu (core ESLint `complexity` + `max-lines-per-function`)                                                                              | Jā                     |
| `check:cognitive-complexity` | Kognitīvās sarežģītības sprūdrata (`eslint-plugin-sonarjs`) — atsevišķa ESLint caurlaide; CI palaiž abus apvienotus kā vienu `check:complexity-ratchets` soli                                     | Jā                     |
| `check:dead-code`            | Neizmantotā eksporta / failu sprūdrata (knip) neregresē salīdzinājumā ar bāzes līniju                                                                                                             | Jā                     |
| `check:compression-budget`   | Kompresijas etalona budžeta — vienam dzinējam marķiera ietaupījuma zemākās vērtības nedrīkst regresēt                                                                                             | Jā                     |
| `check:type-coverage`        | Procentu tipa sprūdrata (`type-coverage`) neregresē; lielā mērā ietver `typecheck:noimplicit:core`                                                                                                | Jā                     |
| `check:codeql-ratchet`       | Atvērtā CodeQL brīdinājumu skaits neregresē (nolasa, izmantojot `gh api`; gracioza izlaišana bez pilnvaras) — atsvaidzināšanas kadence un manuāls trigeris: skatiet tālāk sadaļu "CodeQL ratchet" | Jā                     |
| `check:type-scale-ratchet`   | Komplekta tipa skala: izmēri, kas mazāki par 12 pikseļiem, un `font-bold` `src/` tikai samazinās (`typeScaleSubFloorSizes`, `typeScaleFontBold`); arī pirmsapņemšanās āķī                         | Jā                     |

### Darbs: `quality-extended`

Jaukts darbs bez darba līmeņa `continue-on-error`: darbība, kas nodod `--ratchet`, regresijas gadījumā salīdzinājumā ar `quality-baseline.json` neizdodas un viss darbs neizdodas. Tikai `check:circular-deps` un skeneru instalēšanas darbība ir informatīvas (darbības līmeņa `continue-on-error: true`). Ārējie skeneri tiek instalēti, izmantojot `gh release download`; `check:secrets` pati sevi izlaiž (iziet ar kodu 0), ja gitleaks nav pieejams, savukārt `check:vuln-ratchet`, `check:workflows` un `check:openapi-breaking` neizmērījamas vērtības gadījumā neizdodas.

| Skripts                  | Validē                                                                                                                                                                                                                         | Bloķēšana                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| `check:circular-deps`    | Nav apļveida atkarību (dpdm)                                                                                                                                                                                                   | **Konsultatīvs**                                     |
| `check:bundle-size`      | Pakas izmērs nepārsniedz vāciņu; neizmērāms izmērs arī neizdodas                                                                                                                                                               | **Bloķēšana ar --ratchet**                           |
| `check:secrets`          | Slepenā skenēšana (gitleaks) — izlaiž, ja nav bināra                                                                                                                                                                           | **Bloķēšana ar --ratchet**                           |
| `check:vuln-ratchet`     | Atkarības ievainojamības (osv-skeneris) neregresē — `--ratchet` neizdodas kā INCOMPLETE (2. izeja), ja tās netiek mērītas                                                                                                      | **Bloķēšana ar --ratchet**                           |
| `check:workflows`        | Darbplūsmas savārstījums (actionlint + zizmor); missing/broken skeneri, nederīgi ziņojumi vai trūkstoša sprūdrata bāzes līnija neizdodas kā INCOMPLETE. Derīgie atradumi atbilst atlasītajai strict/advisory/ratchet politikai | Nepieciešama izpilde; zizmora sprūdrata bloķēšana CI |
| `check:openapi-breaking` | Publisks API līgums pret piespraustām notikumu saistībām (PR sapludināšanas bāze, push pirms, sapludināšanas grupas bāze; scheduled/manual izrakstīšanās pirmais vecākais); nepieciešamais mērījums neizdodas aizvērts         | **Bloķēšana ar --ratchet**                           |

### Darbs: `docs-sync-strict`

Darbojas katrā PR līdz `main`. Neveiksmes gadījumā bloki tiek apvienoti.

| Skripts                        | Validē                                                                                                                                                             | Bloķēšana                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| `check:docs-all`               | Meta vārti, kas secīgi vada 6 apakšvārtus                                                                                                                          | Jā                                 |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI versijas konsekvence; atlaidiet arī 66 `llm.txt` spoguļus un tulkotās CHANGELOG sadaļas (PR režīms: spoguļi piekrīt)                           | Jā                                 |
| ↳ `check:docs-counts`          | Skaiti prozā (pakalpojumu sniedzēju skaits, migrācijas skaits utt.). Divi režīmi: `pr` funkcijā PRs, `release` citur — skatiet tālāk sadaļu "Atvasinātās vērtības" | Jā                                 |
| ↳ `check:env-doc-sync`         | Katrs env var `.env.example` ir dokumentēts dokumentu tabulā un otrādi                                                                                             | Jā                                 |
| ↳ `check:deprecated-versions`  | Dokumentos nav novecojušu versiju virkņu                                                                                                                           | Jā                                 |
| ↳ `check:doc-links`            | Iekšējās atzīmes saites dokumentos veido reālus failus (forma `[text]`/`(path)` )                                                                                  | Jā                                 |
| ↳ `check:fabricated-docs`      | Maršruti, env vars, CLI komandas, āķa nosaukumi un failu ceļi, kas minēti dokumentos, pastāv kodu bāzē. Cietie vārti caur `--strict`; soft-fail bez karoga.        | Jā (izmantojot `--strict` iekš CI) |
| `check:cli-i18n`               | CLI `t()` taustiņi pastāv `bin/cli/locales/en.json` (abos režīmos); pt-BR / zh-CN / zh-TW paritāte ar `en.json` tikai atbrīvošanas režīmā                          | Jā                                 |
| `check:openapi-coverage`       | OpenAPI spec aptver vismaz reālu maršrutu sprūdratu grīdu                                                                                                          | Jā                                 |
| `check:openapi-security-tiers` | Drošības līmeņa anotācijas `openapi.yaml` atbilst `routeGuard.ts` klasifikācijām                                                                                   | **Konsultatīvs**                   |
| `check:openapi-routes`         | Katrs `openapi.yaml` ceļš ved uz īstu `route.ts` (anti-halucināciju)                                                                                               | Jā                                 |
| `check:docs-symbols`           | Katra `/api/...` atsauce `docs/**/*.md` izvēršas par īstu `route.ts` (anti-halucināciju)                                                                           | Jā                                 |
| `i18n translation drift`       | `docs/i18n/**` spoguļi vs `.i18n-state.json` — ieteikums par PRs (spoguļus atsvaidzina tulkošanas vilnis), stingri nospiežot un katru nakti                        | **Konsultatīvs** uz PRs            |

#### Tulkošanas spoguļi ir atvasināti faili (PR režīms pret atbrīvošanas režīmu)

Funkcija PR rediģē tikai angļu valodas avotus. `docs/i18n/<locale>/**` spoguļi (tostarp 66 `llm.txt` kopijas un tulkotie `CHANGELOG.md` faili) un `.i18n-state.json` tiek pārrakstīti vienā solī, izmantojot tulkošanas vilni (`docs/i18n-*` / `chore/i18n-*` atzari, ieplānotais `i18n-mirror-refresh.yml`) un izlaidumu (`npm run release:sync-changelog-i18n`). Tāpēc spoguļvārti darbojas divos režīmos, kurus atrisina `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`, pēc tam `OMNIROUTE_GATE_MODE`, tad notikums Darbības; lokālā izpilde ir `release`):

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
- Spoguļa satura vienību testi (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) — izlaišanas režīms nodrošina katru lokalizāciju. PR režīms apstiprina tikai tos spoguļus, kas ir aktuāli angļu avotā saskaņā ar `.i18n-state.json` (visa faila jaukšana vai sadaļas ierakstītās sadaļas jaucējkrāni, testa tapas), un izlaiž novecojušos spoguļus ar iemeslu. `target_hash` izcelsmes pārbaudes tiek veiktas katrā lokalizācijā abos režīmos. Svaigums ir uz `## ` sadaļu, vienība `run-translation.mjs` jaucējkrāni; gara sadaļa (šī faila vārtu krājums ir aptuveni puse no tā) nozīmē, ka visi tajā veiktie labojumi atstāj novecojušus spoguļus, un to PR režīma apgalvojumi tiek izlaists līdz nākamajam vilnim. Enkurs, ko angļu avotā vairs nesatur, atgriežas pie visa faila salīdzinājuma.
- `i18n translation drift` — ieteikums par PRs, stingri nospiežot, katru nakti un atlaišanas griezumu, tāpēc novecojušu spoguli nevar nosūtīt ar atbrīvošanu.

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

### Atvasinātās vērtības: `pr` un `release` vārtu režīmi

Līdzeklis PR nekad neieraksta vērtību, kas ir atkarīga no tā bāzes stāvokļa: nodrošinātāja, migrācijas, MCP rīka un stratēģijas skaita, README SVG skaitļiem, faktu momentuzņēmuma. Vienā solī tiek pārrēķināti tie visi — `npm run release:refresh-derived`, ko vada laidiens un ikvakara atvasinātā atsvaidzināšanas funkcija PR. Tātad** starp izlaidumiem bāze pēc dizaina ir aiz dzīvā koda** , un vārti vai tests, kas salīdzināja koku ar reāllaika kodu, būtu sarkans katrā PR pēc tam, kad brālis ir pievienojis pakalpojumu sniedzēju. Tāpēc vārti, kas vērtē atvasinātās vērtības, darbojas vienā no diviem režīmiem, kurus atrisina `scripts/check/lib/gateMode.mjs` (uzvaras pirmajā spēlē):

1. `--mode=pr|release` komandrindā;
2. `OMNIROUTE_GATE_MODE` vides mainīgais (`pr` vai `release`);
3. automātisks, no GitHub Actions notikuma: `pull_request`, kura galva nav `release/v*`, `merge_group` vai push uz `omni-queue/**` → `pr`; viss pārējais (push, grafiks, nosūtīšana, izlaidums PR `release/v* → main`, jebkura vietējā palaišana) → `release`.

Kas `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) neizdodas katrā režīmā:

| Režīms    | Neizdevās                                                                                                                                                                                                                                                                                                                                                                                                                | Vajag dzīvus faktus |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `release` | Katra pārbaude, stingra vienlīdzība pret faktiem, kas savākti no koka (vārtu uzvedība vienmēr): novecojis skaits, versija, pārklājuma grīda vai SVG skaitlis ir STRICT novirze                                                                                                                                                                                                                                           | Jā                  |
| `pr`      | Tikai tas, ko izdarīja izmaiņas, atšķīrās pret PR bāzi ar tiem pašiem pretenziju ekstraktoriem: (1) pārvaldītā vērtība, kas neeksistēja šī čeka un faila bāzē (“PR rediģēja pārvaldītu numuru — atjauno rindiņu uz pamata tekstu”); (2) a required claim the base carried and the head lost. Content invariants that need no facts run as in release mode; tiek uzskaitītas tikai izlaišanas pārbaudes un tiek izlaistas | Nē                  |

Pārnēsā aģenta instrukciju faili** nē** atvasinātais skaits vispār: `AGENTS.md`, `llm.txt` (un tā `docs/i18n/*/llm.txt` kopijas), bs `AGENTS.md` fork, `open-sse/services/AGENTS.md`, `src/shared/constants/agentSkills.ts`, `skills/README.md` un katrs `skills/*/SKILL.md` norāda uz avotu (piemēram `ROUTING_STRATEGY_VALUES` `src/shared/constants/routingStrategies.ts`) un tā vietā uz `npm run facts`. Nevariantā "Nav atvasinātu skaitļu (aģenta instrukciju fails…)" abos režīmos neizdodas uzskaitīt (nodrošinātāji, migrācijas, MCP rīki un tvērumi, maršrutēšanas stratēģijas, vērtēšanas faktori, režīmu pakotnes), tāpēc laidiena atsvaidzināšanai nekad nav jāpārraksta instrukciju fails.

Režīmā `pr` rakstītāja zari var rediģēt pārvaldītās vērtības: `chore/derived-*` (nakts
atsvaidzināšanas PR), `release/v*` un tulkošanas viļņi `docs/i18n-*` un `chore/i18n-*`
(`scripts/check/lib/derivedClaimsDiff.mjs`). Rindas pakešu (`merge_group`, Mergify melnraksti,
`omni-queue/**`) kandidāti netiek vērtēti atkārtoti: tie apkopo PR, kurus vārteja jau novērtēja
pa vienam.

Izejas kodi: `0` clean · `1` STRICT novirze (vai mīksta novirze ar `--strict`) vai pārvaldītas vērtības pārkāpums · `2` infrastruktūra — koda faktus nevarēja apkopot (tsx zonde neizdevās vai tai iestājās taimauts; taimauts ir `OMNIROUTE_FACTS_TIMEOUT_MS`, noklusējuma 600000 CI, PR base nevar būt vai atrisināts. 2. izeja nekad nav dokumentācijas atšķirība: atkārtoti palaidiet darbu vai labojiet vidi.

Kur darbojas katrs režīms:

| Kur                                                                                                                   | Režīms                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Funkcija PR — `ci.yml` job `docs-sync-strict`, `quality.yml` solis "Dokumentu precizitāte"                            | `pr` (automātisks); darbs iziet bāzi kā `BASE_SHA` un izrakstās ar `fetch-depth: 2`                                                                                                                     |
| `merge_group`, `omni-queue/**` kandidāti, sapludināšanas vilciena pilns vārtu saraksts                                | `pr`                                                                                                                                                                                                    |
| Atlaidiet PR (`release/v* → main`), grūdienus, plānotos un manuālos skrējienus                                        | `release`                                                                                                                                                                                               |
| Zaļš (`scripts/quality/validate-release-green.mjs`)                                                                   | HARD preces darbojas ar `OMNIROUTE_GATE_MODE=pr` ("vai bāze salūza?"); DRIFT vienums `derived-refresh` palaiž `npm run release:refresh-derived -- --check` (stingrs skats, nekad neatver bāzes sarkanu) |
| Atbrīvošana (`/generate-release` fāze 0a un 1; prasmju vadi ir atsevišķa īpašnieka apstiprināta maiņa)                | `npm run release:refresh-derived` raksta atvasinātos failus; izlaidums PR pārbauda pēc tam `release` režīmā                                                                                             |
| `nightly-derived-refresh.yml` (katru dienu, augstākais `release/vX.Y.Z`, tiek izlaists zem atbrīvošanas-sasaldēšanas) | `npm run release:refresh-derived -- --profile=nightly`; uz diff tas saglabā ONE PR atvērtu no `chore/derived-refresh`; nekad nesaplūst                                                                  |

Aiz tā esošās komandas:

- `npm run facts` izdrukā katru atvasināto skaitli kā JSON (`scripts/release/facts.mjs`). `--key=code.mcpTools` izdrukā vienu vērtību, `--snapshot` nolasa izveidoto momentuzņēmumu dzīvā koka vietā. Iziet 2, ja faktus nevar savākt.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) pārrēķina atvasinātos failus vienā piegājienā šādā secībā ( `--only=` soļu ID): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (momentuzņēmums), `numbers` (skaitīšanas vārtu pārrakstīšanas plāns, kas tiek lietots dokumentiem, pēc tam tiek pārnests uz to `docs/i18n/` spoguļiem ( `SKILL.md`), `readme-diagrams` `skills` (izlaists, līdz koks tiek nosūtīts `syncE2eTimings`), `e2e-timings` (apgriež `en.json` `ui-keys` nomests un, izmantojot `--rewritten-since=<ref>` — noklusējuma `origin/main` — atkārtoti ievieto rindā angļu valodas vērtības, kas ir pārrakstītas kopš pēdējās laidiena; vērtības tiek tulkotas tajā pašā režīmā, ko izpilda vidē konfigurēta aizmugurprogramma vai `.env` atslēga tiek lasīta tikai `OMNIROUTE_TRANSLATION_*`, Google.) Bez aizmugursistēmas tas nekad neieraksta `__MISSING__` marķierus: izlaišanas profils neizdodas, katru nakti izlaiž taustiņus, un `--allow-untranslated` tos ieraksta ar nolūku), `llm-mirrors` un `verify-generated` (pēc rakstīšanas `check:generated-artifacts` un `check:agent-skills-sync` izlaišanas režīmā ir jāiztur; izlaiž `--check` un, kad `--only` to atstāj; kļūme ir izeja). `changelog` darbība ir izvēles iespēja (`--with-changelog`, tikai izlaišanas profils). `--profile=nightly` nekad nepieskaras versijas pretenzijai. Izmantojot `-- --check` tas neko neraksta un iziet no 1, ja kāds fails mainītos vai pārvaldītajai vērtībai ir nepieciešama manuāla rediģēšana (uzskaitot abus); 2. izeja infrastruktūras kļūmes gadījumā. `--json` izdrukā rezultātu kā JSON.
- `docs/reference/derived-facts.json` ir pēdējās atsvaidzināšanas laikā izmantoto faktu momentuzņēmums. To raksta tikai atsvaidzināšana. README SVG ģeneratori to nolasa, un PR laika vienību testi salīdzina izveidotos dokumentus un ar tiem ģenerētos failus, — nekad ar tiešo kodu. Komplekta vienīgais tiešraides salīdzinājums ir “izlaiduma atsvaidzināšana noslēdz ciklu” valodā `tests/unit/check-docs-counts-sync.test.ts`: izmantojot reāllaika faktus, atsvaidzināšanas pārrakstīšanas plāns, kas tiek lietots atmiņā, neatstāj nekādu STRICT novirzi, par kuru tas netiek ziņots, un pārplānošana neko nemaina.

Lai reproducētu lokāli (lokālajai izpildei pēc noklusējuma ir `release`):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

Bez atrisināmas bāzes (bez `BASE_SHA`/`BASE_REF`, bez vietējā `origin/release/v<version>`) vietējā `pr` izpilde izdrukā brīdinājumu un izlaiž atšķirību, nevis neizdodas.

### Darbs: `i18n-ui-coverage`

| Skripts                             | Validē                                                                                                                                                                                                  | Bloķēšana                      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `check-ui-keys-coverage` (iekļauts) | UI i18n atslēgas pārklājums ir ≥ 65%                                                                                                                                                                    | Jā (abi režīmi)                |
| `check:ui-icu`                      | Katrs UI kataloga ziņojums tiek apkopots ar `IntlMessageFormat`                                                                                                                                         | Jā (abi režīmi)                |
| `check-ui-value-drift` (iekļauts)   | Pārrakstīta angļu valoda** vērtību** neatstāj novecojušu tulkojumu                                                                                                                                      | Jā (tikai atbrīvošanas režīmā) |
| `check-new-key-coverage` (iekļauts) | A** jauns** Angļu valodas atslēga tiek tulkota katrā lokalizācijā — `__MISSING__:` marķieris tiek noraidīts                                                                                             | Jā (tikai atbrīvošanas režīmā) |
| `check-key-completeness` (iekļauts) | Katrs UI katalogs (un ar `--catalog=cli` arī katrs CLI katalogs) satur tieši tā `en.json` atslēgu komplektu; `pr` režīmā katrs katalogs PR mainījās pret sevi sapludināšanas bāzē                       | Jā (abi režīmi)                |
| `check-translation-ratio`           | Reālā tulkojuma attiecība uz lokalizāciju (identiski angļu valodai / vietturis / trūkstošās lapas ārpus atļaušanas saraksta) nedrīkst pārsniegt `config/quality/i18n-translation-baseline.json` + slack | Jā (tikai atbrīvošanas režīmā) |

Nepieciešams `fetch-depth: 0` — vērtību novirzes vārti diffs `en.json` pret sapludināšanas bāzi.

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

Lokalitātes paritātes vienību testi (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) seko tiem pašiem režīmiem, izmantojot `tests/_helpers/localeParityMode.ts`: `pr` režīmā tie izlaiž atslēgu paritātes apgalvojumus un atstāj to atslēgu vietturu paritātes atsvaidzināšanu, kuru angļu valoda ir mainījusies kopš sapludināšanas bāzes (katra atslēga, kad vienību pārbaudes uzdevums nevar nolasīt). Šis palīgs ir** tikai** sankcionēta režīma nosacījuma izlaišana: `check:test-masking` skaita `.skip(` un `{ skip: true }`, bet ne aprēķināto `{ skip: "<reason>" }` ko tas atgriež, tāpēc `tests/unit/locale-parity-mode.test.ts` piesprauž to testu sarakstu, kuriem atļauts to izmantot. — pievienošana ir pārskatīta šī saraksta rediģēšana.

#### `check-ui-value-drift` — novecojuši tulkošanas vārti

Uztver vienu i18n regresiju, ko citi vārti strukturāli neredz: angļu valodas vērtība tiek pārrakstīta, un tulkojumi, kas iegūti no _iepriekšējās_ angļu valodas, paliek aiz muguras, tāpēc lietotāji, kas nav angļu valoda, turpina lasīt pārliecinoši formulētu, tagad nepareizu kopiju.

Tas tika nosūtīts pa īstam. `oauthModal.googleOAuthWarning` tika pārrakstīts, kad nolaidās Antigravity login palīgs (#5203);** 39 no 43 vietām** tika saglabāts teksts, kurā operatoriem tika teikts, ka viņi "kopē pilnu URL un ielīmējiet to zemāk" — plūsmu, ko nevar pabeigt šim pakalpojumu sniedzējam. Līdz #8463 tas palika nepamanīts, jo:

- `sync-ui-keys` aizpilda tikai atslēgas, kas ir** prombūtnē** , nekad tādi, kas ir** novecojis** ;
- `check-ui-keys-coverage` skaita taustiņu _presence_, tāpēc novecojušais tulkojums tiek uzskatīts par aptvertu;
- `check-translation-drift` izseko `docs/i18n/<locale>/**.md` dokumentāciju, kas atspoguļo — tā nekad neizlasa `src/i18n/messages/*.json`. Tas darbojas darbā `docs-sync-strict`: konsultatīvi par PRs, stingri uz stumšanas un katru nakti; tulkošanas vilnis atsvaidzina spoguļus, nevis funkciju PR.

**Atšķirības apzinās, neatbalsta sākotnējo stāvokli.** Tas salīdzina `en.json` sapludināšanas bāzē ar darba koku; katrai atslēgai, kuras angļu valodas vērtība ir mainījusies, jebkura lokalizācija, kurā joprojām ir neskarts tulkojums, ir novecojusi. Tas apzināti** iesaldē jau esošos parādus** — a diff nevar atklāt, no kuras vecās angļu valodas nācis ilgstošs tulkojums, tāpēc vārti vērtē tikai to, ko skar pašreizējās izmaiņas. Alternatīva (katras atslēgas jaucējkoda bāzes līnija) izmaksātu ~ 600 KB ģenerētais fails, kas ir 3 × lielākais esošais bāzes līnija, kas maina katru i18n PR.

Divi veidi, kā to apmierināt:

1. atjauniniet ietekmētos tulkojumus vai
2. iestatiet tos uz `__MISSING__:<new english>` — izpildlaikā, pēc tam apkalpo laboto angļu valodu (`src/i18n/request.ts::deepMergeFallback`, #7258) un atslēgu rindas tulkošanai.

Ja aukla ir** nozīmē** mainīts, dod priekšroku** pārdēvējot atslēgu** : jauna atslēga nevar mantot novecojušu tulkojumu. Tas ir izmantotais modelis #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Iziet no 0 ar `SKIP reason=base-unresolved` ja pamata katalogu nevar nolasīt (sekla klons bez bāzes atsauces), atspoguļojot `check-openapi-breaking`. Tikai atbrīvošanas režīms: funkcija PR pārraksta angļu valodu un apstājas tur; izlaiduma atsvaidzināšana atzīmē tulkojumus, ko tas atstāja (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, tas pats `findStaleTranslations`).

### Darbs: `i18n`

Pilna i18n validācijas matrica (viens darbs katrā lokalizācijā). Viss darbs ir konsultatīvs.

| Skripts                         | Validē                                         | Bloķēšana                                                   |
| ------------------------------- | ---------------------------------------------- | ----------------------------------------------------------- |
| `validate_translation.py quick` | Tulkošanas pilnīgums atkarībā no lokalizācijas | **Konsultatīvs** (`continue-on-error: true` par visu darbu) |

### Darbs: `pr-test-policy`

Darbojas tikai vilkšanas pieprasījumos.

| Skripts                | Validē                                                                                                                              | Bloķēšana |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PRs, kas maina ražošanas kodu `src/`, `open-sse/`, `electron/` vai `bin/` ir jāiekļauj vai jāatjaunina testi (Cietais noteikums #8) | Jā        |
| `check:test-masking`   | Mainītie testa faili nesamazina neto apgalvojumu skaitu un nepievieno `assert.ok(true)` tautoloģijas                                | Jā        |
| `check:pr-evidence`    | PR pamatteksts citē test/VPS pierādījumus par izmaiņām (mehānizē Hard Rule #18 grepping PR prose — fragile, skatiet sadaļu Atpakaļ) | Jā        |

### Darbs: `test-vitest`

Skrien pēc `build`. Neveiksmes gadījumā bloki tiek apvienoti.

| Suite            | Validē                                                        | Bloķēšana                                                                                                          |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP serveris (110 rīki), autoCombo, kešatmiņa — vitest runner | Jā                                                                                                                 |
| `test:vitest:ui` | UI komponents pārbauda — vitest runner                        | **Bloķēšana** — iepriekš esošās kļūmes ir nepārprotami izslēgtas `vitest.config.ts`; jaunas neveiksmes nedod darbu |

### Nakts darbplūsmas (plānotas, konsultatīvas)

Tie darbojas pēc cron grafika (un `workflow_dispatch`), nekad ne uz PRs. Visi ir konsultatīvi.

| Darbplūsma             | Validē                                                                                                                                                              | Bloķēšana        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | ātrās pārbaudes īpašību testi ar izlases veida sēklu + augstu palaišanas skaitu                                                                                     | **Konsultatīvs** |
| `nightly-resilience`   | kaudzes augšanas vārti, haosa vainas iesmidzināšana, k6 load/soak                                                                                                   | **Konsultatīvs** |
| `nightly-llm-security` | promptfoo injekcijas aizsargs (bloķēšanas režīms) + garak zondes (izlaists bez pakalpojumu sniedzēja noslēpuma)                                                     | **Konsultatīvs** |
| `nightly-schemathesis` | OpenAPI kontrakta izplūšana (shēma) pret dzīvu OmniRoute, izmantojot `docs/openapi.yaml` — virsmu specifikācijas pārkāpumus / neapstrādātas 500 s (8. gadījums B.4) | **Konsultatīvs** |
| `nightly-mutation`     | Stryker mutāciju pārbaudes rezultāts ātrās vienības joslā — izdzīvojušo mutantu virsmas vāji apgalvojumi                                                            | **Konsultatīvs** |
| `nightly-compat`       | Mezglu dzinēja saderības matrica atbalstītajos `engines.node` diapazonos                                                                                            | **Konsultatīvs** |

Veiktspējas bāzes līnijas (kaudze, TTFB, izveides laiks) tiek reģistrētas, nevis ierobežotas: skatiet [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

## Ģenerētie faili un atvasinātās bāzes līnijas (rakstītas izlaišanas laikā)

Plāns 2026-11-13 ("atvasinātie skaitļi un teksti atrisināti tikai izlaišanas brīdī"): funkcija PR maina** avots** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, prasmju katalogs, brīvā līmeņa katalogs, jauna e2e specifikācija. Tas neatjauno failus, kas aprēķināti no šī avota, un nenosaka izmērītu uzlabojumu bāzes līmenī. Šie faili tiek pārrakstīti vienu reizi, izmantojot laidiena atsvaidzināšanu (`release:refresh-derived`) vai ikvakara atsvaidzināšanu PR. Pirms tam katrs brālis un māsa PR nesa savu reģenerēto kopiju un konfliktēja ar nākamo sapludināšanu (2026.11.13.: 30 no 321 atvērtā PRs pārrakstīja `PROVIDER_REFERENCE.md`, 26–28 pārrakstīja README diagrammas).

**Sargs.** `check:pr-derived-paths` (darbs `pr-test-policy`) nedarbojas PR funkcijā, kas pieskaras ģimenes failam `config/quality/derived-paths/`:

| Ģimene      | Faili                                                                                                                                                                                 | Pārrakstīja                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; divpadsmit ģenerētie README SVGs; `skills/*/references/**`; `SKILL.md` faili, kuriem nav pielāgota bloka | `release:refresh-derived` (fakti), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                     | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                     |

Rakstītāji (`release/v*`, `chore/derived-*` un `chore/bank-ratchet-*` bāzes līnijām) ir atbrīvoti; tāpat ir PR, kas maina tikai vienu saimi un tās pavadoņus ( `generated`: ģeneratora skripti, to testi, aģenta prasmju ievades — `src/shared/constants/agentSkills.ts`, ar roku rakstīti `skills/**` dokumenti, `docs/openapi.yaml` — un `changelog.d/**`), piemēram, varoņa izkārtojuma maiņa ar tās reģenerēto, vai SVG nolasīto labojumu. `SKILL.md` faili. `SKILL.md` ar roku rakstītu `<!-- skill:custom-start -->` bloku nav saimē: tā pielāgotais bloks paliek rediģējams blakus funkcijai.

Bāreņu tīrīšanu nevērtē arī ģimenes: PR var izdzēst `docs/i18n/<locale>/<doc>` ja sapludināšanas bāzē bija šis spogulis, un `<doc>` vairs nepastāv PR galvā, un var rediģēt `.i18n-state.json` tikai, lai izmestu šādus dokumentus no `sources`. Apsargs šos failus uzskaita zem `orphan-cleanup`. Joprojām pastāvoša dokumenta spoguļa dzēšana joprojām ir pārkāpums: nav citu konveijera ierakstu, kas norādīts, un `llm.txt` un `CHANGELOG.md` spoguļiem ir savi rakstītāji.

**Pārbaudes katram vārtu režīmam** (`scripts/check/lib/gateMode.mjs`; palīgs `scripts/check/lib/derivedArtifactScope.mjs`):

| Pārbaudiet                                                                        | `release` (push, grafiks, izlaidums PR, vietējais)                             | `pr` (funkcija PR, rindas grupa)                                                                                                                                                                                |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                         | katrai prasmei jābūt vienādai ar ģeneratora jaudu                              | tikai prasmes, kuru ģenerēto tekstu (ārpus pielāgotā bloka) vai `references/` rediģē PR ; pretējā gadījumā `SKIP reason=pr-mode`                                                                                |
| `check:generated-artifacts` (README SVGs + e2e laiki; nepieciešama pilna vēsture) | katrs SVG ir vienāds ar tā ģeneratoru; katrai specifikācijai ir laika ieraksts | tikai PR rediģētie artefakti; pārējais `SKIP reason=pr-mode`; nav atšķirības bāzes → katrs novērtētais artefakts (neatteices aizvērts)                                                                          |
| README SVG baitu salīdzināšanas testi (`tests/unit/docs/readme-*-svg.test.ts`)    | katru SVG                                                                      | tikai SVG PR rediģē, kad bāze tiek atrisināta; `test-unit` seklajai PR izrakstīšanai nav pamata, tāpēc tests tiek izlaists ar `SKIP reason=base-unresolved` un `check:generated-artifacts` pieder salīdzinājums |
| e2e hronometrāžas pilnīgums (`tests/unit/balance-e2e-shards.test.ts`)             | katrai specifikācijai ir ieraksts                                              | tāds pats noteikums kā SVG testos (jauna specifikācija darbojas ar vidējo svaru)                                                                                                                                |
| `check-quality-ratchet.mjs --require-tighten`                                     | nebanku uzlabojumi neizdodas (ja vien nav `_policy`)                           | ziņots par uzlabojumiem, nekad nav bijis neveiksmes; regresija joprojām neizdodas                                                                                                                               |

Atbrīvošanas režīms saglabā spriedumus, izejas kodus un ziņojumus, kas šīm pārbaudēm bija pirms sadalīšanas; tiek pievienota ne vairāk kā viena rinda, nosaucot atrisināto režīmu (`[agent-skills-sync] mode=release (auto: local run)`). Pārbaudes tiek izlaistas, izmantojot mezgla:testa `{ skip: releaseOnlyUnlessTouched(...) }` opciju, ko `check:test-masking` uzskaita tikai atskaites blokā (tas nav ne `.skip(`, ne `{ skip: true }`, tāpēc tas netiek uzskatīts par stingru izlaišanu). `check:generated-artifacts` darbojas tur, kur bāze ir atrisināma: darbs `lint` (`fetch-depth: 0`), uzreiz pēc `check:agent-skills-sync`. Lokāli `npm run check:generated-artifacts -- --mode=pr` parāda, ko šis solis vērtē uz PR. Pakalpojumu sniedzēja kopsummas `check:docs-counts` salīdzinošā pārbaude (“Pakalpojumu sniedzēja atsauces kopsumma (doc vs tiešraides moduļi)”) ir daļa no skaitīšanas vārtiem, un tā tiek izmantota paša vārtu režīmiem.

Ne ģimenē, ar nolūku: politikas faili, ko izlēmuši cilvēki (`gate-manifest.json`, atļaušanas saraksti, `admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) un griesti, PR ir jārediģē kopā ar kodu (`quality-baseline.json` metrikas ieraksti, typecheck/file-size/complexity bāzes līnijas, `eslint-suppressions.json` — kas tiek apgriezti iepriekš, veicot pārkāpumu a z ESLint run, kad tiek izdarīts a PR zq fro run ). Tiek ģenerēts arī `src/i18n/routeNamespaces.generated.json`, taču tas paliek funkcijā PRs: lietotne to importē izpildes laikā, tāpēc tā nevar gaidīt atsvaidzināšanu.

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
