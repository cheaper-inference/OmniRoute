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

CI un Quality Gates darbplūsmas katra rada stabilu spriedumu: `Gate / CI` un `Gate / Quality`. Viņu versijās uzņemšanas politikā ir uzskaitīti visi iepriekšējie darbi pēc nepieciešamības vai ieteikumi. Piemērojamam nepieciešamajam darbam ir jābūt sekmīgam: trūkstošie, atceltie, izlaistie, gaidošie un nezināmie rezultāti nevar noteikt PASS. Derīga klasifikācija tikai dokumentiem vai tikai katalogam var padarīt koda joslu nepiemērojamu; parasts PR projekts nav pieņemts kandidāts. `hotfix` marķējums neatceļ pierādījumus.

Abas darbplūsmas aptver PRs main/release filiālēs, nospiež uz `main`, manuālu nosūtīšanu un grupu sapludināšanu. Nosūtīšanas, nosūtīšanas un sapludināšanas grupa izpilda pilnu atlasi. Uzticams Mergify rindas melnraksts palaiž arī piemērojamos `full-code`/`full-code-e2e` darbus; parastā PRs izlaist tos. Pirms manuālas sapludināšanas veiciet pilnu nosūtīšanu konkrētajam kandidātam. Nospiežot uz `release/**`, šīs darbplūsmas nesāk; Release-Green novēro apvienoto bāzi atsevišķi (`docs/ops/RUNNER_BOX.md` → Hosted josla). Forks un sapludināšanas grupas izmanto mitinātos skrējējus darbiem, kuros citādi tiek atlasīti pašmitinātie skrējēji; pirms izlaišanas ir jāpārbauda pietiekama mitinātā jauda.

Parasta PR veic ātro atlasi. Uzņemšanas politikas `full-code` un `full-code-e2e` joslas (E2E, integrācija, pakotnes artefakts, Electron dūmi, Bun SQLite, ekosistēmas un protokola klienti) darbojas tikai Mergify rindas melnrakstā vai pilnā izpildē: `gh workflow run ci.yml --ref <branch>`.

Katrs JSON kvīts identificē izņemto SHA, darbplūsmas izpildi un mēģinājumu. CLI noraida checkout/event SHA neatbilstību. Darbplūsmas testi saista dalību politikā ar sprieduma darba `needs` sarakstu, tāpēc jauna vai noņemta josla nevar klusībā pazust. Kvītis attiecas uz viņu pašu darbplūsmu, nevis uz publicēšanu, izvietošanu vai esošā konsultatīvā skenera iekšējiem elementiem. Nozares noteikumos prasīto piemērojamo pārbaužu veikšana ir atsevišķa administratīva izmaiņa; darba vietu noteikšana pati par sevi neaizsargā filiāli.

`API Route Typecheck` ir neatkarīga darbplūsmas pārbaude, kas tiek veikta ārpus apkopotajiem spriedumiem un vietējā pilna novērotāja statiskā profila. Atsevišķi pārbaudiet tā rezultātu konkrētajam kandidātam. `.github/workflows/api-route-typecheck.yml` darbojas ar PRs uz `main` vai `release/**`, pārsūta uz jebkuru filiāļu saimi, manuālu nosūtīšanu un `merge_group` tipa `checks_requested` notikumiem. Tam nav ceļa filtra. Apvienot grupas pārbaudiet `merge_group.head_sha`; citus pasākumus apskatiet `github.sha`. Visos notikumos tiek izmantoti tie paši API diagnostikas vārti un vārtu vienības testi. PR bāzes retargets pieprasa jaunu pārbaudi; body/title labojumos tiek izmantots tikai novērošanas nosaukums `Admission not requested / API Route Typecheck`, un tie nevar aizstāt uzņemšanas pārbaudi.

### Saglabātie pierādījumi pieņemšanas reduktorā

`scripts/quality/validate-release-acceptance.mjs` samazina piegādāto plānu un tā izpausmes; tajā nav noteikts, ka plāns aptver visu izlaišanas cauruļvadu. Tās ziņojumos ir skaidri noteikts `releaseAcceptance: false`, pat ja šis plāns ir `VERIFIED`. `release-acceptance.yml` darbplūsmā joprojām tiek izmantoti ēnu ķermeņi, nevis īstas uzbūves, pakotnes, sāknēšanas vai veicināšanas kvītis.

CLI pieprasa, lai `--evidence-root` pārbaudītu saglabātos pierādījumus. Faili tiek atrisināti kā `<evidence-root>/<artifact_id>/<member>` un jaukti kā SHA-256. PASS ieraksts bez pierādījumiem, trūkstošs vai mainīts fails, nedrošs ceļš vai simboliskā saite neļauj pārbaudīt. Trūkstošie faili nav līdzvērtīgi tukšiem veiksmīgiem žurnāliem. Esošās SHA/run/attempt pārbaudes paliek neatkarīgas: atbilstoši baiti nevar glābt novecojušu kvīti. Faila integritāte nav izpildes autentiskuma vai artefaktu veicināšanas pierādījums.

### DAST patērē verificēto CI būvējumu

Nepieciešamais `dast-smoke` CI darbs izsauc `.github/workflows/dast-smoke.yml` pēc `build`. Tas atbilst tai pašai code/draft atlasei kā būvēšanai, tostarp atbalstītajai dakšai PRs, izlaišanas mērķa PRs un sapludināšanas grupām. Trūkstošs, neizdevies, atcelts vai negaidīti izlaists DAST darbs bloķē `Gate / CI`. Atkārtoti lietojamai darbplūsmai nav neatkarīga PR/dispatch aktivizētāja; manuālā validācija izmanto CI nosūtīšanu, lai būvējums un patērētājs paliktu vienā palaijumā.

`scripts/ci/next-build-provenance.mjs` aizzīmogo visu Next artefaktu ar tā darvas īssavilkumu, repository/event/run, ražotāja mēģinājumu, head/base/checkout/tree, darbplūsmas identitātēm, bloķēšanas failu, precīzu mezgla version/ABI, platformu un komplektētāju. DAST atlasa nemainīgu artefaktu ID no `needs.build.outputs`, pieprasa lejupielādes īssavilkuma verifikāciju un neatkarīgi sajauc ZIP pret ražotāja īssavilkumu, pirms tiek iegūti divi atļautie elementi, izmantojot `scripts/ci/unpack-ci-build.py`. Manifestam un darvas arhīvam ir jāatbilst arī neatkarīgā ražotāja rezultātiem, pirms tiek izvilkts nākamais koks. Tā nekad nemeklē jaunāko veiksmīgo filiāles versiju. Daļēja atkārtošana var atkārtoti izmantot to pašu producenta mēģinājumu, ja tā ID un visas ievades joprojām sakrīt; kvīts reģistrē abus mēģinājumus.

Patērētājs paliek mitinātā Linux skrējējā ar tikai lasīšanas repozitorija atļauju un bez repozitorija noslēpumiem. Tas instalē precīzu ražotāja Node versiju, pēc tam saliek CLI ar `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` noraida trūkstošu savrupu serveri pirms atkāpšanās versijas; parastās vietējās CLI versijas saglabā esošās rezerves. Servera gatavībai, shēmai un promptfoo ir jādarbojas nemainīgā 25 minūšu darba ierobežojumā. Izcelsmes kvīts pierāda ievades identitāti un baitus, nevis veiksmīgu DAST skenēšanu. Artefakta derīguma termiņš, skrējēja pārtraukums vai skenera kļūme paliek nepilnīgi vai neveiksmīgi pierādījumi; tas nevar kļūt PASS izmantojot ieteikumu iesaiņojumu.

### UI izpildes jauda

CI veic pilnu UI uzskaiti kā četras `test-vitest` matricas lauskas, katrā ir ne vairāk kā divi darbinieki uz vienu fragmentu un esošais 15 minūšu darba termiņš. Pirmajā shardā darbojas arī MCP/autoCombo Vitest komplekts. Nepieciešamais darba rezultāts aptver katru matricas kāju; vienas šķembas neveiksme vai atcelšana nevar nodrošināt kandidāta uzņemšanu.

Nakts novērotājs saglabā atsevišķu precīza kandidāta kvīti par katru UI fragmentu, ieskaitot MCP izpildi pirmajā kvītī. Nepieciešamas visas četras kvītis, žurnāli un atbilstošās izpildes identitātes. Vietējais `npm run test:vitest:ui` joprojām atlasa visu komplektu; viens `--shard` palaišana ir tikai daļējs pierādījums.

### Vienību seguma kolekcija

Divpadsmit vienības shards savāc V8 pārklājumu to esošās testa izpildes laikā. Veiksmīga shard palaiž `scripts/ci/compact-v8-coverage.mjs`, lai saspiestu sākotnējos failus, neģenerējot Stambulas starpposma ziņojumu. Pēdējais pārklājuma uzdevums pārbauda visus divpadsmit manifestus attiecībā pret kandidāta SHA, izpildlaika, avota saknes un datu jaucējvārdībām, pēc tam palaiž c8 reportierus un esošos pārklājuma sliekšņus. Ievades saglabā c8 globālo faila nosaukumu secību; jauktam function/block pārklājumam ir nedroša iepriekšēja sapludināšana uz shardu. Trūkstošu, nepareizi veidotu vai nesaderīgu šķembu uzņemšana neizdodas. Neizdevušos testa lauskas atsevišķi saglabā neapstrādātu diagnostikas pārklājumu; tas nevar iekļūt galīgajā sapludināšanā.

### Vienības izpildes progresa kvītis

Kopīgā `test:unit:ci:shard` komanda ieraksta `primary`, `dashboard` un `serial` fāzes, izmantojot `scripts/ci/unit-progress-reporter.mjs`. Parastais testa ziņojums paliek pieejams. Atsevišķā tikai metadatu kvīts reģistrē katra faila sākumu un pabeigšanu, un 30 sekunžu pulss parāda joprojām aktīvus failus un to pagājušo laiku. Tas ieraksta tikai atļauto izpildes metadatus; testu apraksti, izvade, kļūdu korpusi un visa vide netiek serializēti.

CI saglabā JSONL failus kā `unit-progress-ci-<run>-<attempt>-<shard>`. Darba noildze var novērst vēlāku augšupielādi; jau izdalītie sirdspuksti paliek diagnostikas pierādījumi. Trūkstošie sirdspuksti var atspoguļot arī bloķētu vai pārtrauktu skrējēja procesu. Šīs kvītis saglabā esošo pārbaudes atlasi, sakritību, termiņus un izejas statusu; tie nav kandidātu uzņemšanas spriedumi.

### Apvienot rindu

`queue` etiķete nosūta PR uz sapludināšanas rindu (`.mergify.yml`). Mergify atver PR melnrakstu `mergify/merge-queue/` filiālē, CI tajā izpilda pilnu atlasi, un sākotnējais PR tiek apvienots, kad `Gate / CI`, `Gate / Quality` un `Merge integrity (changelog + generated skills)` iztur.

Mergify ieraksta savu rindas kopsavilkumu melnraksta aprakstā. Body/title-only `pull_request` `edited` notikumi izmanto izpildei specifisku vienlaicības grupu un nepārbauda klasifikāciju, netestē matricas, sapludināšanu integritāti vai pielaides spriedumu. Tikai novērošanas čeku nosaukumi nevar aizstāt `Gate / CI` vai `Gate / Quality`. Rediģēšanai, kas maina mērķa bāzi, ir nepieciešama jauna kandidāta validācija.

Pēc izslēgšanas no rindas, push ne vienmēr pieprasa PR rindu. Komentējiet par to `@mergifyio queue`.

### Statiskās skenēšanas inventārs

Versionētais npm-alias krājums un statiskās skenēšanas dalība darbojas pakalpojumā `config/quality/gate-manifest.json`. Palaidiet `npm run check:gate-manifest`, lai pārbaudītu skriptu nosaukumus un precīzas komandas pret `package.json`; papildinājumi, noņemšana un komandu novirzīšana neizdodas gan vietējā āķa, gan izmaiņu klasifikācijas uzdevumos CI. Pseidonīms nav darbplūsmas uzdevums, matricas gadījums vai testa gadījums: šos skaitļus nedrīkst uzrādīt kā savstarpēji aizstājamus.

Izmantojiet `npm run quality:scan -- --list` vai `npm run quality:scan:fast -- --list` lai pārbaudītu atlasītos aizstājvārdus, tos neizpildot. Runner izsauc npm ievades punktu, tāpēc tā izpildlaiks (tostarp Bun ja tas ir konfigurēts) tiek saglabāts. Manifesta ierakstu aizstājvārdi ārpus šiem profiliem ir atsevišķi izsaukti, un uzturēšanas komandas ir aizliegtas tikai lasāmos skenēšanas profilos.

Šie profili aptver tikai statisko skenēšanu. Tie nesertificē produktu testus, pārklājumu, iepakojumu, ārējās pārbaudes vai kandidāta pilnīgu izlaišanas apstiprinājumu. Darbplūsmas uzņemšana izmanto saistītos `config/quality/admission-policy.json` un `scripts/quality/admission-verdict.mjs`. Izlaiduma novērotāju profili paliek atsevišķi; neatkarīgi pārbaudīt savus piemērojamos čekus un kvītis. Pilnas novērotāja statiskās komandas tiek deklarētas `config/quality/release-green-static-profile.json`, ieskaitot `audit:deps`, mutāciju testa atlasi un tulkošanas pārbaudes. Iekrāvējs pārbauda npm komandas pret package.json un modelētajām CI/Quality deklarācijām; tas noraida drift, nevis izpilda čaulas marķierus kā argumentus. Nepieciešamā skenera SKIP/INCOMPLETE izvade nevar izveidot PASS. Profilā tiek reģistrēti ārējie izņēmumi, un tas neaizstāj mitināto pārklājumu, testa matricas, pakotnes vai izvietošanas pierādījumus. Tālāk sniegtais prozas saraksts ir atsauce, nevis pierādījums tam, ka vārti patiešām skrēja.

Skripti darbojas saskaņā ar `scripts/check/` (policy Gates) un `scripts/quality/` (spraudera motoru). CI patiesības avots ir `.github/workflows/ci.yml`.

### Publicētās bāzes dokumentācijas stāvoklis

`.github/workflows/i18n-base-health.yml` novēro dokumentācijas stāvokli pēc atlasītām nosūtīšanas uz `main` un `release/v*` un manuālas nosūtīšanas. Tās filtri aptver dokumentāciju, root Markdown, `llm.txt`, tulkojumu state/configuration un attiecīgos i18n rīkus. Viens `Published base documentation health` darbs izmanto mitinātu Ubuntu un piecu minūšu termiņu. Tā veic tikai lasāmu validāciju un izraksta diagnostikas kvīti bez atkarības instalēšanas, tulkošanas vai stāvokļa pieņemšanas.

`scripts/i18n/check-base-health.mjs` nepieprasa nulles avota jaukšanas, trūkstošā mērķa, mērķa jaukšanas, novecojušas tulkošanas un sadaļas kešatmiņas neatbilstības. Tas arī apstiprina pašreizējo galveno document/locale darbības jomu un tā reģistrēto izcelsmi. Nederīgs konteksts, nepilnīgs pārklājums vai pārtraukts pārbaudītājs rada `INCOMPLETE`; apstiprināta novirze rada `FAIL`. Abi atgriež neveiksmīgas izejas statusu. Kvīts ir saistīta ar izrakstīšanu SHA, darbplūsmu, palaišanu un mēģinājumu, un tā tiek saglabāta kā `i18n-base-health-<sha>-<run>-<attempt>`.

Šis ir neatkarīgs publicētās bāzes novērojums. Tas nepievieno PR vai sapludināšanas grupas notikumu, obligātu PR pārbaudi, npm aizstājvārdu vai statiskās skenēšanas profila dalībnieku. Pamatā esošais pārbaudītājs arī bloķē visas piecas klases absolūtajā režīmā. Parastā PR sagatavošana paliek atsevišķi no uzņemšanas. Veiksmīga augšupielāde nevar pārvērst neveiksmīgu veselības rezultātu par PASS.

Parasta PR izmanto `--preflight` ar `--baseline-evidence` ģenerētu bāzes ziņojumu. Angļu avots var atstāt neapstiprinātu tikai tad, ja pilns tulkojuma ieraksts un faktiskie mērķa baiti nav mainīti no šīs precīzās bāzes. Jaunas mērķa vai sadaļas kešatmiņas neatbilstības joprojām bloķē, un nepilnīgi pierādījumi nevar atļaut sagatavošanu. Ziņojumā `preparationPending` un `mergeReady` tiek atklāti atsevišķi: veiksmīga sagatavošana nepadara neapstiprinātos tulkojumus gatavus sapludināšanai. Pirms uzņemšanas atsvaidziniet ietekmētos spoguļus sastādītajā kandidātā. Uzticamais Mergify rindas kandidāts, `merge_group`, atzaru nospiešana un manuāla CI izpilde izmanto absolūto pārbaudītāju bez `--warn` vai iedzimtas kļūmes piedošanas. Trūkstošās mērķa jaucējkodas un tvērums, kas samazināts ar dzēstiem ierakstītajiem pamatdatnēm, nevar nodrošināt veiksmīgu absolūto spriedumu.

### Izlaidiet PR ātro ceļu (`quality.yml`)

`.github/workflows/quality.yml` papildina CI uz main/release PRs, virza uz `main`, nosūta un apvieno grupas. PRs izmanto ceļa filtrētas ātrās pārbaudes. Tika noņemts pastāvīgi atspējots dublikāts; reālās build/package/boot pārbaudes paliek CI. Vienības komplekts un vitest darbojas tikai CI (`Unit Tests (N/12)` un `Vitest`).

| Darbs                                            | Darbības joma                                                                                                                                                                                                        | Bloķēšana              |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs un docs-all                                                                                                                                                                             | Jā                     |
| `Fast Quality Gates`                             | Kods PRs; statiskās pārbaudes, tipa pārbaude, paneļa tipa pārbaude, ietekmēto vienību testi                                                                                                                          | Jā                     |
| `Forgotten sibling tests`                        | Kods PRs; mainīti moduļi, kas izsekot statiskiem patērētājiem un kandidātu brāļu un māsu testiem; mucas un dinamiskā importa ceļi tiek ziņoti kā konsultatīva diagnostika ar atsaucēm uz atļauju saraksta izņēmumiem | **Konsultatīvs**       |
| `No new ESLint warnings`                         | Kods PRs; slāpēšanas izturīgs pret plūksnām                                                                                                                                                                          | Jā, ieskaitot dakšiņas |
| `Merge integrity (changelog + generated skills)` | PRs bez melnraksta ; izmaiņu žurnāls un ģenerētā prasmju sinhronizācija                                                                                                                                              | Jā, ieskaitot dakšiņas |

#### Aizmirsta brāļu un māsu pārbaužu atskaite

`npm run check:forgotten-sibling-tests` darbojas kā `Fast Quality Gates` padomdevēja darbība un atkārtoti izmanto importēšanas atrisinātāju, kas atrodas aiz testa ietekmes kartes. Par katru mainīto ražošanas moduli tas ziņo par deterministiskām `changed module/symbol -> static consumer -> candidate sibling test` ķēdēm, ja kandidāta tests nav iekļauts pull-request diferenciācijā. Markdown kopsavilkums un JSON rezultāts tiek saglabāts kā `forgotten-sibling-tests` darbplūsmas artefakts kalibrēšanai pirms jebkādas bloķēšanas izlaišanas.

Mucu reeksports un dinamiskais imports ir tikai izšķirtspējas diagnostika; tie nekad nerada bloķējošu atradumu. Atsauksmes par izņēmumiem tiešraidē `config/quality/forgotten-sibling-allowlist.json`. Katrā ierakstā ir jānosauc patērētāja un kandidāta tests, jāsniedz konkrēts pamatojums un jāsaista GitHub problēma vai izvilkšanas pieprasījums. Nepareizi veidotus ierakstus neizdodas aizvērt. Izņēmumi nevar apspiest dzēstu kandidāta testu vai atšķirību, kas pievieno `.skip`/`.todo`; apgalvojumu vājināšanās un cita maskēšana paliek neatkarīgi bloķējošajiem `check:test-masking` vārtiem.

### Darbs: `lint`

Darbojas katrā PR līdz `main`. Neveiksmes gadījumā bloki tiek apvienoti.

| Skripts (`npm run ...`)           | Validē                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Bloķēšana                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:node-runtime`              | Node.js versija ir atbalstītajā diapazonā                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jā                                           |
| `check:cycles`                    | Apļveida importēšana visā `src/` + `open-sse/` (pamatojoties uz AST, tsconfig `paths` atrisināta). Bare iziet no 1 ikreiz, kad pastāv kāds cikls (neatteices aizvērts kopš #15281) un uzskaita SCCs. `check:cycles:ratchet` (ko palaiž CI ) bloķē, ja skaits pārsniedz `metrics.cycles` griestus `quality-baseline.json` — pašlaik 14, `direction: down`, tāpēc tas var tikai nokrist (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jā (sprūdrats)                               |
| `check:boundary`                  | `open-sse → src` savienojums: unikāls failu imports no dzinēja uz lietotni (`scripts/quality/measure-boundary.mjs`; malu saraksts ir v4 core/module-split labošanas uzkrājums). Bare = konsultatīvais ziņojums (tāds pats kā `quality:boundary`). `check:boundary:ratchet` (ko darbojas CI, arī `quality.yml` ātro vārtu sprūdrata cilpā) bloķē, ja skaits pārsniedz `metrics.boundaryOpenSseToSrc` griestus `quality-baseline.json` — kas iesēts pie izmērītā 771, `direction: down`; `--update` to tikai pazemina; bāzes relatīvais PRs (`--base-ref`, skatīt zemāk)                                                                                                                                                                                                                                                                                                                                                                                       | Jā (sprūdrats)                               |
| `check:route-validation:t06`      | Zod shēmas ir pieejamas visos maršrutos (6. līmeņa politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jā                                           |
| `check:any-budget:t11`            | `@ts-expect-error // any` skaits nepārsniedz budžetu (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jā                                           |
| `check:provider-consistency`      | Katram `providers.ts` pakalpojumu sniedzējam ir atbilstošs ieraksts `providerRegistry.ts` (un otrādi, atļauju sarakstā).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jā                                           |
| `check:model-lifecycle`           | Trīs manuāli uzturētās maršrutēšanas tabulas atbilst reģistrētā dzīves cikla momentuzņēmumam (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nenovērtē identitāti, kuru `REGISTRY` varētu maršrutēt; katrs `BUILT_IN_ALIASES` mērķis ir iekļauts `REGISTRY` un nav iekļauts izbeigtā ID momentuzņēmumā; katrs izlietotais ID, kas joprojām atrodas `REGISTRY`, tiek pārsūtīts vai norādīts `allowedRetiredInCatalog`; un neviens `DEFAULT_DEGRADATION_MAP` avots vai mērķis šajā momentuzņēmumā nav izslēgts. Tas nepierāda, ka modeli pašlaik apkalpo tiešraidē augšup pa straumi. Bezsaistes — salīdzina ar `config/quality/model-lifecycle.json`, atsvaidzināts manuāli ar `npm run quality:refresh-model-lifecycle` (tīkls; nav pievienots CI). `allowedRetiredInCatalog` ir nodegošs sprūdrats: pievienojiet ierakstu tikai tad, ja ir izsekošanas problēma.                                                                                               | Jā                                           |
| `check:fetch-targets`             | Katrs `fetch("/api/...")` klienta puses `src/` atrisina reālu `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jā                                           |
| `check:deps`                      | Visi `npm install` -able dep katrā repo `package.json` ir `dependency-allowlist.json`; jaunas atspraustas vai noslīpētas paketes atzīmētas ar karodziņu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Jā                                           |
| `audit:deps`                      | npm audits visiem pieciem neatkarīgiem bloķēšanas failiem (root, Electron, OpenCode spraudņi v1/v2 un nodrošinātājs). Kritisko ieteikumu bloks; augsti ieteikumi joprojām ir redzami brīdinājumi. Missing/failed auditi ir INCOMPLETE un bloki; tiek saglabātas katra tvēruma bloķēšanas jaucējzīmes un atskaites.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jā                                           |
| `check:lockfile`                  | `package-lock.json` integritāte — https reģistrs, integritātes jaucējkodi, nav saimniekdatora ignorēšanas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jā                                           |
| `check:licenses`                  | SPDX licenču atļauju saraksts ražošanas atkarībām                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jā                                           |
| `check:tracked-artifacts`         | Nav izveides artefaktu/noteiktu `node_modules` simbolu saišu (tiek izpildīta arī husky iepriekšējas apstiprināšanas režīmā; pirms nosūtīšanas ir apzināti viegls — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jā                                           |
| `check:ai-attribution`            | Nav AI/bot `Co-Authored-By` piekabes vai AI paaudzes kājenes PR saistībās, virsraksts vai pamatteksts — cietais noteikums #16 ( `quality.yml` ātro vārtu cilpā PR→ `release/**` — nolasa notikuma `commit-msg` slodzi, no-op off PRs — un tikai PR soli `ci.yml` PR→ arī `main`; atļauti līdzautori #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | Katrs Vitest izņēmums nosauc izsekošanas problēmu un parādās `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jā                                           |
| `check:file-size`                 | Avota faili (`.ts`/`.tsx` `src/`, `open-sse/`, `electron/`, `bin/`) paliek `cap` un testa faili (`*.test.ts(x)`) `testCap`; `file-size-baseline.json` (`frozen` / `testFrozen`) iesaldētie faili nedrīkst pārsniegt ierakstīto lielumu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jā                                           |
| `check:error-helper`              | Kļūdu atbildes executors/handlers izmanto `buildErrorBody()` / `sanitizeErrorMessage()` (cietais noteikums #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jā                                           |
| `check:migration-numbering`       | Migrācijas SQL faili ir secīgi numurēti, bez atstarpēm vai dublikātiem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jā                                           |
| `check:public-creds`              | Bez burtiskām OAuth `client_id`/`client_secret` vai Firebase tīmekļa atslēgām ārpus `publicCreds.ts` (cietais noteikums #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jā                                           |
| `check:db-rules`                  | Nav neapstrādātas SQL ārpus `src/lib/db/` moduļiem; bez mucu importa no `localDb.ts` (Cietie noteikumi #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jā                                           |
| `check:known-symbols`             | Pakalpojumu sniedzēju izpildītāji, maršrutēšanas stratēģijas un tulkotāji, kas reģistrēti to nosūtīšanas tabulās, sakrīt ar failiem diskā — bez bāreņiem vai nedeklarētiem simboliem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jā                                           |
| `check:route-guard-membership`    | Katrs maršruts, kas rada bērnu procesu, tiek klasificēts saskaņā ar `isLocalOnlyPath()` (stingrajiem noteikumiem #15/#17).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jā                                           |
| `check:test-discovery`            | Katru repo `*.test.ts` / `*.spec.ts` failu savāc vismaz viens testa dalībnieks (sprūdrats: bāreņu saraksts `test-discovery-baseline.json` var tikai sarukt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jā                                           |
| `check:test-tla-order`            | Neviens `node:test` fails zem `tests/unit` nereģistrē testu, sasniedz augstākā līmeņa `await`, pēc tam reģistrē vairāk (#18045; sprūdrata: `test-tla-order-allowlist.json` var tikai sarukt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jā                                           |
| `check:agent-skills-sync`         | Ģenerētie aģentu prasmju artefakti atbilst to avota katalogam (bez novirzes)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | Pakalpojumu sniedzējam logos/assets ir reģistrēts izcelsmes ieraksts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | JSON konfigurācijas faili tiek analizēti un atbilst repo lint noteikumiem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | TypeScript kompilācija bez kļūdām (tikai ieteikuma brīdinājumi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jā                                           |
| `typecheck:noimplicit:core`       | Stingra `noImplicitAny` — uz nākotni vērsta; daudzām jau esošām zvanu vietnēm joprojām ir nepieciešamas anotācijas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **Konsultatīvs** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` tvērums uz `src/app/(dashboard)/**` (#7033) — `typecheck:core` atlasītajā 27 failu atļaušanas sarakstā nav iekļauts neviens informācijas panelis TSX, un arī `next build` to nekad nepārbauda (`next.config.mjs` iestata `ignoreBuildErrors: true`), tāpēc bezsaimnieka identifikatora regresijas (#6625/#6909 līdz CI) bija neredzamas. Atšķiras pret iesaldētu per-file/per-TS-code skaitīšanas bāzes līniju (`config/quality/dashboard-typecheck-baseline.json`, tāds pats novecojušais izpildes modelis kā `check:known-symbols`) Tikai — NEW kļūdas, kas pārsniedz bāzes līniju skaitu, neatbilst vārtiem; nofiksējiet ar `--update`, kad ir novērsta jau esošā kļūda.                                                                                                                                                                                                                                                                            | Jā                                           |
| `check:build-typecheck`           | Visas lietotnes produkcijas veida pārbaude `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), virsmas `typecheck:core` 27 failu atļaušanas saraksts un informācijas paneļa vārti neaptver. Atšķirības pret `config/quality/build-typecheck-baseline.json`; jauns vai palielināts per (fails, kods) skaits neizdodas, mazāks skaits prasa sprūdratu. `--update` atsakās, kamēr izpildē ir jauns vai paaugstināts pāris, ja vien `--force-regressions` nav izturēts, un atsakās no tikko apklusināta faila, ja vien `--force-nocheck` nav izturēts, tāpēc bāzes līnijas paplašināšana, lai iegūtu zaļo krāsu, un pastāvīga klusuma piešķiršana ir divas atsevišķas apzinātas darbības. Pliks `--force` tiek noraidīts. Skenē arī `@ts-nocheck` veidošanas tvērumu pret `config/quality/ts-nocheck-baseline.json`, jo fails, kas to izmanto, vispār neziņo par diagnostiku un citādi būtu neredzams visiem vārtiem. | Jā                                           |

#### Divas tipa pārbaudes programmas atbild atšķirīgi

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) un `check:build-typecheck` apkopo dažādas programmas ar dažādām opcijām, un viens un tas pats fails var būt tīrs vienā un pilns ar kļūdām otrā.

`tsconfig.build.json` iestata `"strict": false`, tāpēc `noImplicitAny` ir izslēgts. Galvenā konfigurācija apkopo atlasītu 27 failu atļaušanas sarakstu ar stingrākām opcijām un seko katra ieraksta importēšanas diagrammai, tāpēc faili, kas nekad netiek rādīti veidošanas programmā, joprojām tiek pārbaudīti.

Sekas ir svarīgas, vērtējot, vai fails ir drukāts:**nulles diagnostika saskaņā ar `check:build-typecheck` nenozīmē nulli** . `@ts-nocheck` noņemšana no 26 failiem parādīja, ka 23 no tiem ir tīri būvēšanas programmā; sešpadsmit no tiem atklāja aptuveni 120 netiešas kļūdas stingrajā. Pirms faila izsaukšanas pārbaudiet abus.

### Darbs: `quality-gate`

Darbojas pēc `test-coverage`. Neveiksmes gadījumā bloki tiek apvienoti.

| Skripts                      | Validē                                                                                                                                                        | Bloķēšana              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | Izdala `quality-metrics.json` (ESLint brīdinājumu skaits, pārklājums no sapludinātā shard ziņojuma)                                                           | Jā (augšpus sprūdrata) |
| `quality:ratchet`            | Katrs `quality-baseline.json` rādītājs nav regresējis (ESLint brīdinājumi ≤ bāzes līnija; pārklājuma ≥ bāzes līnija)                                          | Jā                     |
| `check:duplication`          | Koda dublēšana (jscpd@4) nepārsniedz `quality-baseline.json` bāzes līmeni                                                                                     | Jā                     |
| `check:complexity`           | Faila līmeņa ciklomātiskā sarežģītība nepārsniedz maksimālo robežu (pamats ESLint `complexity` + `max-lines-per-function`)                                    | Jā                     |
| `check:cognitive-complexity` | Kognitīvās sarežģītības sprūdrata (`eslint-plugin-sonarjs`) — atsevišķa ESLint caurlaide; CI palaiž abus apvienotus kā vienu `check:complexity-ratchets` soli | Jā                     |
| `check:dead-code`            | Neizmantotā eksporta / failu sprūdrata (knip) neregresē salīdzinājumā ar bāzes līniju                                                                         | Jā                     |
| `check:compression-budget`   | Kompresijas etalona budžeta — vienam dzinējam marķiera ietaupījuma zemākās vērtības nedrīkst regresēt                                                         | Jā                     |
| `check:type-coverage`        | Procentuālā tipa sprūdrata (`type-coverage`) neatkāpjas; lielā mērā ietver `typecheck:noimplicit:core`                                                        | Jā                     |

### Darbavietas: `codeql-scan` un `codeql-admission`

`codeql-scan` ražo visas konfigurētās analīzes kategorijas. Kad šis darbs ir veiksmīgs, `codeql-admission` apstiprina precīzas augšupielādes un kandidāta brīdinājuma sprūdratu. Abas ir obligātas `Gate / CI` atkarības, tostarp kandidāti, kas paredzēti tikai dokumentiem. Administratīvās aktivizēšanas un kanāriju prasības ir aprakstītas tālāk sadaļā "CodeQL sprūdrats".

| Skripts                | Validē                                                                                                                                                                                                      | Bloķēšana |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:codeql-ratchet` | Kandidātam ref/SHA un visām konfigurētajām analīzes kategorijām jābūt aktuālām pirms brīdinājuma sprūdrata; trūkst pierādījumu bloku. Globālais krājums paliek atsevišķs — skatiet "CodeQL sprūdrata" tālāk | Jā        |

### Darbs: `quality-extended`

Darbi bloķē attiecīgos kandidātus. Pakas lielums, slepenie atklājumi, ievainojamības konstatējumi, darbplūsmas konstatējumi un OpenAPI izmaiņas tiek pārbaudīti ar nepieciešamajiem sprūdratiem. Cirkulārās atkarības diagnostika joprojām ir konsultatīva. Nepieciešama skenera instalēšana: `scripts/ci/install-quality-scanners.sh` nodrošina piespraustās versijas un izplata instalēšanas kļūmes. Trūkstošie rīki, nederīgi ziņojumi vai trūkstošās bāzes līnijas atstāj nepieciešamo skenera vārtu INCOMPLETE.

| Skripts                  | Validē                                                                                                                                                                                                                            | Bloķēšana                                            |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `check:circular-deps`    | Nav apļveida atkarību (dpdm)                                                                                                                                                                                                      | **Konsultatīvs**                                     |
| `check:bundle-size`      | Pakas izmērs nepārsniedz vāciņu; nepieejams mērījums neizdodas                                                                                                                                                                    | **Bloķēšana ar --ratchet**                           |
| `check:secrets`          | Gitleaks konstatējumi neregresē; nepieciešamie skenējumi noraida trūkstošo tools/source/baseline, neveiksmīgu skenēšanu un nederīgus pārskatus                                                                                    | **Bloķēšana ar --ratchet**                           |
| `check:vuln-ratchet`     | Atkarības ievainojamības neatkāpjas; Nepieciešamie skenējumi noraida trūkstošos rīkus, nederīgus pārskatus vai trūkstošos bāzes rādītājus                                                                                         | **Bloķēšana ar --ratchet**                           |
| `check:workflows`        | Darbplūsmas savārstījums (actionlint + zizmor); missing/broken skeneri, nederīgi ziņojumi vai trūkstošā sprūdrata bāzes līnija neizdodas kā INCOMPLETE. Derīgi konstatējumi atbilst atlasītajai strict/advisory/ratchet politikai | Nepieciešama izpilde; zizmora sprūdrata bloķēšana CI |
| `check:openapi-breaking` | Publisks API līgums pret piespraustām notikumu saistībām (PR sapludināšanas bāze, push pirms, sapludināšanas grupas bāze; scheduled/manual izrakstīšanās pirmais vecākais); nepieciešamais mērījums neizdodas aizvērts            | **Bloķēšana ar --ratchet**                           |

### Darbs: `docs-sync-strict`

Izvilkšanas pieprasījumiem uz `main` vai `release/**` šis darbs tiek izpildīts tikai tiem kandidātiem, kas nav melnraksti (vai uzticamas rindas), kas klasificēti kā dokumentācijas vai koda izmaiņas. Tas darbojas arī ne PR CI pasākumos; šīs darbplūsmas push trigeris attiecas tikai `main`, nevis `release/**`. Solis, kas iziet no nulles, bloķē darbu; tikai ziņojumos ietvertie konstatējumi un tālāk dokumentētie izņēmumi to nedara.

| Skripts                        | Validē                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Bloķēšana                                                                                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta vārti, kas secīgi vada 7 apakšvārtus                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jā                                                                                                                                              |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG versijas konsekvence, precīzi `llm.txt` spoguļi, tulkoti CHANGELOG section/size invarianti un aizstātu dokumentu dublikātu neesamība                                                                                                                                                                                                                                                                                                                    | Jā                                                                                                                                              |
| ↳ `check:docs-frontmatter`     | Apkopotajām dokumentācijas lapām ir derīgi frontmatter nosaukumi                                                                                                                                                                                                                                                                                                                                                                                                                  | Jā                                                                                                                                              |
| ↳ `check:docs-counts`          | Augstas ticamības skaita invarianti ir stingri; heiristiskās failu skaita pārbaudes brīdina tikai tad, ja skripts nesaņem `--strict` ( CI metavārti to neiztur)                                                                                                                                                                                                                                                                                                                   | Stingra līmeņa bloķēšana; mīksta līmeņa konsultācijas                                                                                           |
| ↳ `check:env-doc-sync`         | Avota env nolasījums, `.env.example` un `docs/reference/ENVIRONMENT.md` piekrīt pēc nepārprotami ignorētajiem, tikai dokumentiem un tikai env atļautajiem sarakstiem                                                                                                                                                                                                                                                                                                              | Jā, ārpus dokumentētajiem atļauju sarakstiem                                                                                                    |
| ↳ `check:deprecated-versions`  | Ziņo par iespējamām novecojušām versijām ārpus droša vēsturiskā konteksta un novecojušu atjaunināšanas datumiem, izņemot ignorētos dokumentus                                                                                                                                                                                                                                                                                                                                     | Ieteikums par pašreizējo CI vadu (`--strict` nav izturēts)                                                                                      |
| ↳ `check:doc-links`            | Iekšējās atzīmes saites dokumentos veido reālus failus (`[text]`/`(path)` veidlapa)                                                                                                                                                                                                                                                                                                                                                                                               | Jā                                                                                                                                              |
| ↳ `check:fabricated-docs`      | Maršruti, env vars, CLI komandas, āķa nosaukumi un failu ceļi, kas minēti dokumentos, pastāv kodu bāzē. Cietie vārti caur `--strict`; soft-fail bez karoga.                                                                                                                                                                                                                                                                                                                       | Jā (izmantojot `--strict` pakalpojumā CI)                                                                                                       |
| `check:cli-i18n`               | Lietotās CLI `t()` atslēgas pastāv `en`; `pt-BR` saglabā visas augstākā līmeņa sadaļas; `zh-CN` un `zh-TW` satur katru `en` atslēgu                                                                                                                                                                                                                                                                                                                                               | Jā                                                                                                                                              |
| `check:openapi-coverage`       | OpenAPI specifikācija aptver vismaz reālu maršrutu sprūdratu grīdu                                                                                                                                                                                                                                                                                                                                                                                                                | Jā                                                                                                                                              |
| `check:openapi-security-tiers` | Deklarētās `x-loopback-only`/`x-always-protected` anotācijas ir jāatbalsta `routeGuard.ts`; parsētājs un uz priekšu neatbilstības bloks. Reversā pārbaude par trūkstošo `x-loopback-only` zem tikai lokālajiem prefiksiem brīdina, un maršruti, kuros ir tikai modelis, tiek izslēgti no šīs apgrieztās caurlaides.                                                                                                                                                               | Parser/forward pārbauda bloķēšanu; reversās pārbaudes ieteikums                                                                                 |
| `check:openapi-routes`         | Katrs `/api...` ceļš `openapi.yaml` atrisina parametru nejutīgumu pret reālu maršrutu pēc pamatotā `KNOWN_STALE_SPEC` atļaušanas saraksta; novecojuši atļauju saraksta ieraksti arī neizdodas                                                                                                                                                                                                                                                                                     | Jā                                                                                                                                              |
| `check:docs-symbols`           | Iekšējās `/api/...` URL atsauces kanoniskajos dokumentos, kas nav spoguļattēli, nosaka reālu maršrutu vai maršrutu saimi; proxy/upstream/placeholder/file atsauces un pamatotie `KNOWN_STALE_DOC_REFS` ieraksti tiek izslēgti, un novecojuši atļauju saraksta ieraksti neizdodas                                                                                                                                                                                                  | Jā                                                                                                                                              |
| `i18n translation drift`       | Absolūtai atļaušanai ir nepieciešamas nulles avota, trūkstošā mērķa, mērķa jaukšanas, novecojušas tulkošanas un sadaļas kešatmiņas neatbilstības. Parastā PR sagatavošana var saglabāt precīzus mantotos pierādījumus vai tikai angļu valodā gaidītās izmaiņas ar nemainītu pilnīgu stāvokli un mērķa baitiem; tā ziņojumā atsevišķi pasludina gatavību apvienošanai. Trūkst mērķa jaukšanas un nepilnīgs bāzes pierādījumu bloks. Mantotās sadaļas kešatmiņas trūkums nav kļūme. | Visas piecas klases bloķē queue/base uzņemšanu; parastā sagatavošana atļauj tikai pierādītu mantotu vai tikai angļu valodā neapstiprinātu darbu |

Tiek ģenerēti divpadsmit README SVGs saskaņā ar `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` tos visus atjauno). Katram no tiem ir baitu salīdzināšanas vienību tests (`tests/unit/docs/readme-*-svg.test.ts`, uzdevums `test-unit`), kas neizdodas, ja piesaistītais fails ir novecojis, un `check:docs-counts` nolasa kanoniskos skaitļus no saviem `<text>` mezgliem — tāpēc izklāsta darbība saglabā katru failā esošo kontūru virkni kā neredzamu `<text>`. SVG kanonisko skaitļu pārbaude nolasa failus, kas uzskaitīti `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, kā arī `public/images/tier-flow-dark.svg` un `tier-flow-light.svg`; bezmaksas uz visiem laikiem, kataloga ierakstu, atkārtotu kopu un punktu skaitīšanas faktoru pretenzijas ir arī `promise-pillars.svg`, `free-tier-budget.svg` un `strategies-grid.svg`. `free-tier-budget.svg` ņem savus skaitļus no tiešā kataloga ielādētāja, tāpēc, mainot `FREE_MODEL_BUDGETS` vai nodrošinātāja parādāmo nosaukumu, CI tiek rādīts sarkanā krāsā, līdz šis fails tiek atjaunots.

### Darbs: `i18n-ui-coverage`

| Skripts                             | Validē                                                                                                                                                                                                       | Bloķēšana     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `check-ui-keys-coverage` (iekļauts) | UI i18n atslēgas pārklājums ir ≥ 65%                                                                                                                                                                         | Jā            |
| `check-ui-value-drift` (iekļauts)   | Pārrakstīta angļu valoda **vērtību** neatstāj novecojušu tulkojumu                                                                                                                                           | Jā            |
| `check-new-key-coverage` (iekļauts) | A **jauns** Angļu valodas atslēga tiek tulkota katrā — lokalizācijā, `__MISSING__:` marķieris tiek noraidīts                                                                                                 | Jā            |
| `check-translation-ratio`           | Reālā tulkojuma attiecība uz lokalizāciju (identiski angļu valodai / vietturis / trūkstošās lapas ārpus atļaušanas saraksta) nedrīkst pārsniegt `config/quality/i18n-translation-baseline.json` + atslābumu. | **Bloķēšana** |

Nepieciešams `fetch-depth: 0` — vērtības novirzes vārti atšķir `en.json` pret sapludināšanas bāzi.

#### `check-ui-value-drift` — novecojuši tulkošanas vārti

Uztver vienu i18n regresiju, ko citi vārti strukturāli neredz: angļu valodas vērtība tiek pārrakstīta, un tulkojumi, kas iegūti no _iepriekšējās_ angļu valodas, paliek aiz muguras, tāpēc lietotāji, kas nav angļu valoda, turpina lasīt pārliecinoši formulētu, tagad nepareizu kopiju.

Tas tika nosūtīts pa īstam. `oauthModal.googleOAuthWarning` tika pārrakstīts, kad Antigravity pieteikšanās palīgs nokļuva (#5203);**39 no 43 vietām** turpināja tekstu, kurā operatoriem tika teikts, ka "nokopē pilnu URL un ielīmējiet to zemāk" — plūsmu, ko nevar pabeigt šim pakalpojumu sniedzējam. Līdz #8463 tas palika nepamanīts, jo:

- `sync-ui-keys` aizpilda tikai tās atslēgas **prombūtnē** , nekad tādi, kas ir **novecojis** ;
- `check-ui-keys-coverage` uzskaita atslēgu _presence_, tāpēc novecojušais tulkojums tiek uzskatīts par aptvertu;
- `check-translation-drift` izseko `docs/i18n/<locale>/**.md` dokumentāciju, kas atspoguļo — tā nekad nelasa `src/i18n/messages/*.json`. Darba `docs-sync-strict` bloķēšana kopš 2026. gada 2026. gada atkārtotās sinhronizācijas: rediģējiet pamatdokumentu → `npm run i18n:run -- --files=<doc>` (sadaļas līmenī, lēti).

**Atšķirības apzinās, nav bāzes līnijas atbalstīts.** Tas salīdzina `en.json` sapludināšanas bāzē ar darba koku; katrai atslēgai, kuras angļu valodas vērtība ir mainījusies, jebkura lokalizācija, kurā joprojām ir neskarts tulkojums, ir novecojusi. Tas apzināti **iesaldē jau esošo parādu** — a diff nevar atklāt, no kuras vecās angļu valodas nācis ilgstošs tulkojums, tāpēc vārti vērtē tikai to, ko skar pašreizējās izmaiņas. Alternatīva (katras atslēgas jaucējkoda bāzes līnija) maksātu ~ 600 KB ģenerētu failu, kas ir 3 ×, kas ir lielākais esošais bāzlīnija, kas maina katru i18n PR.

Divi veidi, kā to apmierināt:

1. atjauniniet ietekmētos tulkojumus vai
2. iestatiet tos uz `__MISSING__:<new english>` — izpildlaikā, pēc tam apkalpo laboto angļu valodu (`src/i18n/request.ts::deepMergeFallback`, #7258) un atslēgu rindas tulkošanai.

Ja aukla ir **nozīmē** mainīts, dod priekšroku **pārdēvējot atslēgu** : jauna atslēga nevar mantot novecojušu tulkojumu. Tas ir izmantotais #8463 modelis.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Vērtības novirzes un jauno atslēgu vārtiem ir viens nemainīgs `scripts/i18n/resolve-ui-diff-base.mjs` salīdzinājums. Abām pārbaudēm darbplūsma nodod vienu un to pašu bāzi, pamata galu un kandidāta SHAs. PR/base-retarget, push un sapludināšanas grupu izpilde izmanto savu notikumu kontekstu. Lai nosūtītu kandidātu filiāli, ir nepieciešama precīza tā atvērtā PR vai skaidra `i18n_base_sha` ievade. `main` vai `release/vX.Y.Z` nosūtīšana vai plānotā novērošana bez šīs ievades salīdzina pēdējo saistību ar tās pirmo vecāku; tā nav visu mantoto tulkošanas parādu audits. Vietējai izsaukšanai ir nepieciešama skaidra salīdzināšanas bāze, piemēram, iepriekš minētā komanda `BASE_REF`.

Trūkst vai neskaidrs salīdzināšanas konteksts, nelasāms vai nederīgs obligātais katalogs un mainīts kandidāts rada `INCOMPLETE` ar izejas kodu **2** , tostarp brīdinājuma režīmā. Kataloga lasīšanai izmanto `scripts/i18n/read-ui-catalog.mjs`; lasīšanas kļūmes netiek aizstātas ar tukšiem objektiem. Ne nepieejama bāze, ne nepilnīga ievade neizveido PASS.

### Darbs: `i18n`

Pilna i18n validācijas matrica (viens darbs katrā lokalizācijā). Viss darbs ir konsultatīvs.

| Skripts                         | Validē                                         | Bloķēšana                                                   |
| ------------------------------- | ---------------------------------------------- | ----------------------------------------------------------- |
| `validate_translation.py quick` | Tulkošanas pilnīgums atkarībā no lokalizācijas | **Konsultatīvs** (`continue-on-error: true` par visu darbu) |

### Darbs: `pr-test-policy`

Darbojas tikai vilkšanas pieprasījumos.

| Skripts                | Validē                                                                                                                               | Bloķēšana |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check:pr-test-policy` | PRs, kas maina ražošanas kodu `src/`, `open-sse/`, `electron/` vai `bin/` ir jāiekļauj vai jāatjaunina testi ( #8 cietais noteikums) | Jā        |
| `check:test-masking`   | Mainītie testa faili nesamazina neto apgalvojumu skaitu un nepievieno `assert.ok(true)` tautoloģijas                                 | Jā        |
| `check:pr-evidence`    | PR struktūra citē test/VPS pierādījumus par izmaiņām (mehānizē Hard Rule #18, aptverot PR prozu — trauslo, skatiet atpalicību)       | Jā        |

### Darbs: `test-vitest`

Nepieciešams `changes` klasifikācijas darbs. Piemērojamo matricas lauskas bloku sapludināšana kļūmes gadījumā.

| Suite            | Validē                                                        | Bloķēšana                                                                                                          |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP serveris (110 rīki), autoCombo, kešatmiņa — vitest runner | Jā                                                                                                                 |
| `test:vitest:ui` | UI komponents pārbauda — vitest runner                        | **Bloķēšana** — iepriekš esošās kļūmes ir nepārprotami izslēgtas `vitest.config.ts`; jaunas neveiksmes nedod darbu |

### Nakts darbplūsmas (plānotas, konsultatīvas)

Tie darbojas pēc cron grafika (un `workflow_dispatch`), nevis PRs. Visi ir konsultatīvi.

| Darbplūsma             | Validē                                                                                                                                                         | Bloķēšana        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | ātrās pārbaudes īpašību testi ar nejaušu sēklu + lielu skaitu                                                                                                  | **Konsultatīvs** |
| `nightly-resilience`   | kaudzes augšanas vārti, haosa defektu iesmidzināšana, k6 load/soak                                                                                             | **Konsultatīvs** |
| `nightly-llm-security` | promptfoo injekcijas aizsargs (bloķēšanas režīms) + garak zondes (izlaists bez pakalpojumu sniedzēja noslēpuma)                                                | **Konsultatīvs** |
| `nightly-schemathesis` | OpenAPI līguma izplūde (shēma) pret dzīvu OmniRoute, izmantojot `docs/openapi.yaml` — virsmu specifikācijas pārkāpumus / neapstrādātas 500 s (8. gadījums B.4) | **Konsultatīvs** |
| `nightly-mutation`     | Stryker mutāciju pārbaudes rezultāts ātrās vienības joslā — izdzīvojušie mutanti norāda uz vājiem apgalvojumiem                                                | **Konsultatīvs** |
| `nightly-compat`       | Mezglu dzinēja saderības matrica atbalstītajos `engines.node` diapazonos                                                                                       | **Konsultatīvs** |

Veiktspējas bāzes līnijas (kaudze, TTFB, izveides laiks) tiek reģistrētas, nevis ierobežotas: skatiet [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### CodeQL sprūdrata: kandidātu uzņemšana un repozitorija inventārs

CI pieder kandidātu CodeQL uzņemšana, izmantojot skaidru atkarības ķēdi: `codeql-scan` izsauc četru valodu matricu `codeql.yml`, pēc tam `codeql-admission` palaiž `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` nepieciešami abi rezultāti. Kvalitāte saglabā savas skaitliskās pārbaudes, bet nejautā skenerim, pirms ražotājs ir pabeidzis; `Gate / Quality` vien nav pilnīga kandidāta uzņemšana. CodeQL joprojām ir nepieciešams tikai dokumentiem paredzētiem kandidātiem.

`config/quality/codeql-admission-policy.json` politika atlasa darbības, C/C++, JavaScript/TypeScript un Python, vaicājumu komplekta noklusējuma iestatījumus, attālo draudu modeli un būvēšanas režīmu nav. Ražotāja pirmsflight noraida neapstiprināto aktivizācijas ierakstu un atzarojas ārpus tiešā mērķa saraksta. Pašreizējie mērķi ir galvenie, un release/v3.8.54. kontrakta testi salīdzina šo galīgo sarakstu un uzturēšanas push trigeri ar pakotnes versiju; nākamajam laidienam ir jāpārskata iekļaušana. CI esošais plašākas izlaiduma PR trigeris tiek saglabāts, bet neiesaistīts mērķis ziņo par HOLD pirms ekstrakcijas, nevis iegūst neizmērītu PASS.

Katrs matricas darbs reģistrē savu faktisko SARIF augšupielādi ID, valodu, kategoriju, izpildi un mēģinājumu, zvanītāja darbplūsmas identitāti, notikumu ref/head/base/merge SHA un politikas jaucējkrānu. Atkarīgais darbs lejupielādē tikai šīs darbības kvītis un apstiprina artefaktu īssavilkumus. Tam nepieciešamas visas četras kategorijas, veiksmīgs producents un pabeigta katras precīzas augšupielādes apstrāde. Tas izmanto API filtru sarif_id, nevis jaunāko analīzi, kas atrasta filiālē. Daļēji atkārtojot, var atkārtoti izmantot veiksmīgas kategorijas no tā paša kandidēšanas un kandidāta iepriekšējā mēģinājuma, saglabājot producēšanas mēģinājumu; neveiksmīgs pašreizējais ražotājs nevar atkārtoti izmantot iepriekšējos zaļos pierādījumus.

CodeQL darbība gaida apstrādi, taču tās piespraustā ieviešana var brīdināt un turpināties pēc statusa lasīšanas kļūmes vai izsmeltas gaidīšanas. Tāpēc uzņemšana vēlreiz pārbauda apstrādi. Trūkst kategoriju, gaida apstrāde, neveiksmīgi vai atcelti darbi, novecojusi identitāte, nepilnīga lappušu šķirošana vai nepieejams APIs rada HOLD un iziet 2. Neatkarīga skenera darbplūsma nepaliek fiksēta gaidīšana. Nepārbaudīts PR nevar izturēt, jo brīdinājuma vaicājums atgrieza 0. Izmērītais skaits, kas pārsniedz `metrics.codeqlAlerts.value` iziet no 1; bāzes līnija netiek paaugstināta, lai absorbētu citas filiāles brīdinājumus. [Augšupielādes statusa un analīzes uzmeklēšana](https://docs.github.com/en/rest/code-scanning/code-scanning).

Kvīts ieraksta augšupielādes un analīzes IDs, kategorijas, rīku versijas, ref/SHA, bāzes līniju un brīdinājuma numurus. SARIF identity/result skaits, minimālais noteikumu skaits un precīzi brīdinājumu gadījumi joprojām ir obligāti. Pirms pieņemšanas PR/analysis identitātes tiek atkārtoti pārbaudītas. Šīs pārbaudes nosaka konfigurētu kategoriju pārklājumu, nevis katra izvilktā avota faila uzskaiti. C/C++ bezveidošanas ekstrakcijā nav iekļauts kods, kas ģenerēts projekta izveides laikā. Avotu izslēgšana joprojām ir jāpārskata, un līdzstrādnieku attiecinājumam ir nepieciešami salīdzināmi precīza pamata pierādījumi.

`codeql-maintenance.yml` nodrošina aktīvās izlaišanas push skenēšanu un iknedēļas grafiku, nedublējot PR/main ražotājus. `nightly-codeql-inventory.yml` saglabā repozitorija mēroga bāzes līniju atsevišķi ar `--strict-measurement` un kļūmi, ja mērījums nav pieejams. Vietējā mantojuma kolekcionāra graciozā izlaišana nav kandidātu uzņemšana. Pievilkšana joprojām ir nepārprotama `--update` pēc pārbaudīta zemāka globālā skaita.

Papildu darbplūsmu nedrīkst publicēt, kamēr ir konfigurēta noklusējuma iestatīšana: GitHub noraida šo kombināciju. Tās versijas politika joprojām ir neapstiprināta, līdz tiek nolasīta pārskatītā administratīvā pāreja. Pirms publicēšanas operators piesprauž repozitoriju, head/base/tree, policy/patch/rollback jaucējus un novēroto iestatīšanas stāvokli; `node scripts/quality/codeql-producer.mjs verify-admin-readback` pārbauda piegādātos paredzamos un faktiskos JSON ierakstus. Šis ir tehniskais nodrošinājums, nevis operatora apstiprinājums vai aizstājējs jaunu nolasījumu iegūšanai. PR marķieris nekad nepieprasa administrācijas piekļuvi. Izlaišanai un jebkādām skenera izmaiņām ir nepieciešama atsevišķa nolasīšana, kā arī reāli PR, dakšas un sapludināšanas grupu saderības pierādījumi.

Forks izmanto mitinātus skrējējus, izrakstīšanos bez noturīgiem akreditācijas datiem, bez projekta install/build producentā un mantotiem repozitorija noslēpumiem. GitHub atbalsta SARIF augšupielādi pull_request notikumam ar samazinātu fork marķieri; Pirmreizējā ieguldījuma izpildes apstiprināšana joprojām ir GitHub politika. Nekad neizmantojiet pull_request_target, lai izpildītu neuzticamu kodu. Apstipriniet faktiskās pilnvaras atļaujas, analīzes_key un visas kategoriju vides kontrolētajā kanārijā, pirms uzskatāt, ka migrācija ir pabeigta. [Dakšu augšupielādes noteikumi](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [konfliktējoši iestatīšanas režīmi](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Atlaišana ir operatora aicinājums (Cietais noteikums #14)** — nekad nenoraida CodeQL brīdinājumu, nereģistrējot tehnisko pamatojumu noraidīšanas komentārā: `won't fix` attiecībā uz augšupejas protokola prasību, `used in tests` attiecībā uz testa ierīci, `false positive` dezinfekcijas līdzeklim CodeQL nevar redzēt (precedents: `docs/security/ERROR_SANITIZATION.md`).

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

**Arī iepriekš nav dokumentēti** (informatīvi, ar zemu signāla vērtību): darbs `docs-lint` (markdownlint + Vale, viss darbs ar `continue-on-error`) un atsevišķās skeneru darbplūsmas `semgrep.yml` / `scorecard.yml`. CodeQL tagad ir obligāti ražotāja un pieņemšanas darbi zem `Gate / CI`, ievērojot iepriekš aprakstītās aktivizēšanas prasības. `semgrepFindings: 0` ir failā `quality-baseline.json`, bet failā `ci.yml` nav piesaistīts bloķējošam ratchet — metrika pašlaik ir nepiesaistīta.

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
- `check:pr-evidence` (bloķējošs, meklē atbilstības PR apraksta tekstā) — augsts kļūdaini pozitīvu rezultātu risks; tā noņemšana vājinātu stingrā noteikuma Nr. #18 izpildi, tādēļ tas ir īsts politikas lēmums.
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
