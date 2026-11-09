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

## Vārtu uzskaite un izpildes profili

### Kandidātu uzņemšana

Katra CI un Quality Gates darbplūsma rada stabilu spriedumu: `Gate / CI` un `Gate / Quality`. Viņu versijās uzņemšanas politikā ir uzskaitīti visi iepriekšējie darbi pēc nepieciešamības vai ieteikumi. Piemērojamam obligātajam darbam ir jābūt veiksmīgam: trūkstošo, atcelto, izlaisto, gaidošo un nezināmo rezultātu nevar noteikt PASS. Derīga klasifikācija tikai dokumentiem vai tikai katalogam var padarīt koda joslu nepiemērojamu; parasts drafts PR nav pieņemts kandidāts. `hotfix` etiķete neatceļ pierādījumus.

Abas darbplūsmas aptver PRs main/release zaros, nospiež uz `main`, manuālu nosūtīšanu un grupu sapludināšanu. Nosūtīšanas, nosūtīšanas un sapludināšanas grupa izpilda pilnu atlasi. Uzticams Mergify rindas melnraksts palaiž arī piemērojamos `full-code`/`full-code-e2e` darbus; parastā PRs izlaist tos. Pirms manuālas sapludināšanas veiciet pilnu nosūtīšanu konkrētajam kandidātam. Nospiežot uz `release/**`, šīs darbplūsmas netiek sāktas; Release-Green atsevišķi novēro apvienoto bāzi (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks un sapludināšanas grupas izmanto mitinātos skrējējus darbiem, kuros citādi tiek atlasīti pašmitinātie skrējēji; pirms izlaišanas ir jāpārbauda pietiekama mitinātā jauda.

Parasts PR veic ātro atlasi. Uzņemšanas politikas `full-code` un `full-code-e2e` joslas (E2E, integrācija, pakotnes artefakts, Electron smoke, Bun SQLite, ekosistēmas un protokola klienti) darbojas tikai sapludināšanas rindas melnrakstā vai pilnā izpildē: `gh workflow run ci.yml --ref <branch>`.

Katrs JSON kvīts identificē izņemto SHA, darbplūsmas izpildi un mēģinājumu. CLI noraida checkout/event SHA neatbilstību. Darbplūsmas testi saista dalību politikā ar sprieduma darba `needs` sarakstu, tāpēc jauna vai noņemta josla nevar klusībā pazust. Kvītis attiecas uz viņu pašu darbplūsmu, nevis uz publicēšanu, izvietošanu vai esošā konsultatīvā skenera iekšējiem elementiem. Nozares noteikumos prasīto piemērojamo pārbaužu veikšana ir atsevišķa administratīva izmaiņa; darba vietu noteikšana pati par sevi neaizsargā filiāli.

`API Route Typecheck` ir neatkarīga darbplūsmas pārbaude, kas tiek veikta ārpus apkopotajiem spriedumiem un vietējā pilna novērotāja statiskā profila. Atsevišķi pārbaudiet tā rezultātu konkrētajam kandidātam. `.github/workflows/api-route-typecheck.yml` darbojas uz PRs uz `main` vai `release/**`, nospiež uz jebkuru filiāļu saimi, manuālu nosūtīšanu un `merge_group` veida `checks_requested` notikumiem. Tam nav ceļa filtra. Apvienot grupas izbraukšana `merge_group.head_sha`; citus pasākumus apskatiet `github.sha`. Visos notikumos tiek izmantoti tie paši API diagnostikas vārti un vārtu vienības testi. PR bāzes retargets pieprasa jaunu pārbaudi; body/title labojumos tiek izmantots tikai novērošanas nosaukums `Admission not requested / API Route Typecheck`, un tie nevar aizstāt uzņemšanas pārbaudi.

### Saglabātie pierādījumi pieņemšanas reducētājā

`scripts/quality/validate-release-acceptance.mjs` reducē norādīto plānu un tā
manifestus; tas neapstiprina, ka plāns aptver visu laidiena konveijeru. Tā pārskatos
ir nepārprotami iestatīts `releaseAcceptance: false` pat tad, ja šis plāns ir
`VERIFIED`. Darbplūsma `release-acceptance.yml` joprojām izmanto aizstājējtestu
datus, nevis īstus būvējuma, pakotnes, palaišanas vai virzīšanas apliecinājumus.

CLI pieprasa `--evidence-root`, lai pārbaudītu saglabātos pierādījumus. Faili tiek
atrasti kā `<evidence-root>/<artifact_id>/<member>` un tiem tiek aprēķināta SHA-256
jaucējvērtība. PASS ieraksts bez pierādījumiem, trūkstošs vai mainīts fails, nedrošs
ceļš vai simboliskā saite liedz veikt pārbaudi. Trūkstoši faili nav līdzvērtīgi
tukšiem sekmīgas izpildes žurnāliem. Esošās SHA, izpildes gadījuma un mēģinājuma
pārbaudes paliek neatkarīgas: atbilstoši baiti nevar padarīt novecojušu apliecinājumu
derīgu. Failu integritāte nav izpildes autentiskuma vai artefakta virzīšanas
pierādījums.

### DAST izmanto pārbaudīto CI būvējumu

Obligātais CI darbs `dast-smoke` pēc `build` izsauc `.github/workflows/dast-smoke.yml`. Tas ievēro to pašu koda un melnrakstu atlasi kā būvēšana, ieskaitot atbalstītus atzarojumu PR, PR uz laidiena zaru un apvienošanas grupas. Trūkstošs, neveiksmīgs, atcelts vai negaidīti izlaists DAST darbs bloķē `Gate / CI`. Atkārtoti izmantojamajai darbplūsmai nav neatkarīga PR vai manuālas palaišanas trigera; manuāla validēšana izmanto CI palaišanu, lai būvētājs un patērētājs paliktu vienā izpildē.

`scripts/ci/next-build-provenance.mjs` aizzīmogo pilno Next artefaktu ar tā tar kontrolsummu, repozitoriju/notikumu/izpildi, ražotāja mēģinājumu, head/base/checkout/tree vērtībām, darbplūsmu identitātēm, atkarību fiksācijas failu, precīzu Node versiju un ABI, platformu un komplektētāju. DAST izvēlas nemainīgo artefakta ID no `needs.build.outputs`, pieprasa lejupielādes kontrolsummas pārbaudi un neatkarīgi aprēķina ZIP jaucējvērtību, salīdzinot to ar ražotāja kontrolsummu, pirms izpako abus atļautos ierakstus ar `scripts/ci/unpack-ci-build.py`. Arī manifestam un tar arhīvam jāsakrīt ar neatkarīgajiem ražotāja izvadiem pirms Next koka izpakošanas. Tas nekad nemeklē zara jaunāko veiksmīgo būvējumu. Daļēja atkārtota izpilde var izmantot to pašu ražotāja mēģinājumu, ja tā ID un visi ievaddati joprojām sakrīt; apliecinājums reģistrē abus mēģinājumus.

Patērētājs paliek mitinātā Linux izpildītājā ar repozitorija tikai lasīšanas tiesībām un bez repozitorija noslēpumiem. Tas instalē ražotāja precīzo Node versiju un tad saliek CLI ar `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` noraida trūkstošu patstāvīgo serveri pirms jebkādas rezerves būvēšanas; parastie lokālie CLI būvējumi saglabā esošo rezerves darbību. Servera gatavībai, Schemathesis un promptfoo visiem jābūt veiksmīgiem nemainītajā darba 25 minūšu ierobežojumā. Izcelsmes apliecinājums pierāda ievaddatu identitāti un baitus, nevis veiksmīgu DAST skenēšanu. Artefakta termiņa beigas, izpildītāja pārtraukums vai skenera kļūme paliek nepilnīgs vai neveiksmīgs pierādījums; informatīvs aptinums nevar to pārvērst par PASS.

### UI izpildes jauda

CI izpilda visu UI uzskaiti kā četras `test-vitest` matricas daļas, katrā izmantojot
ne vairāk kā divus darbiniekus un saglabājot esošo 15 minūšu uzdevuma termiņu.
Pirmā daļa izpilda arī MCP/autoCombo Vitest komplektu. Obligātā uzdevuma rezultāts
aptver katru matricas elementu; vienas daļas kļūme vai atcelšana nevar apstiprināt
kandidāta pielaidi.

Nakts novērotājs saglabā atsevišķu precīzā kandidāta apliecinājumu katrai UI daļai,
tostarp MCP izpildi pirmajā apliecinājumā. Ir nepieciešami visi četri apliecinājumi,
žurnāli un atbilstošas izpildes identitātes. Lokālais `npm run test:vitest:ui`
joprojām atlasa visu komplektu; viena `--shard` izpilde ir tikai daļējs pierādījums.

### Vienībtestu pārklājuma apkopošana

Divpadsmit vienībtestu daļas apkopo V8 pārklājumu savas esošās testu izpildes laikā.
Sekmīga daļa izpilda `scripts/ci/compact-v8-coverage.mjs`, lai saspiestu sākotnējos
failus, neģenerējot starpposma Istanbul pārskatu. Noslēguma Coverage uzdevums
pārbauda visus divpadsmit manifestus pret kandidāta SHA, izpildlaiku, avota sakni un
datu jaucējvērtībām, pēc tam palaiž c8 pārskatu ģeneratorus un esošos pārklājuma
sliekšņus. Ievaddati saglabā c8 globālo failu nosaukumu secību; iepriekšēja
sapludināšana katrā daļā nav droša jauktam funkciju/bloku pārklājumam. Trūkstošas,
nepareizi veidotas vai nesaderīgas daļas izraisa pielaides kļūmi. Nesekmīgas testu
daļas atsevišķi saglabā neapstrādātu diagnostikas pārklājumu; to nedrīkst iekļaut
galīgajā sapludināšanā.

### Vienību izpildes progresa ieraksti

Koplietotā komanda `test:unit:ci:shard` reģistrē posmus `primary`, `dashboard` un `serial`,
izmantojot `scripts/ci/unit-progress-reporter.mjs`. Parastais testu pārskats joprojām ir
pieejams. Atsevišķs ieraksts, kurā ir tikai metadati, reģistrē katra faila izpildes sākumu un pabeigšanu,
savukārt 30 sekunžu sirdspuksta ziņojumā ir uzskaitīti joprojām aktīvie faili un to izpildes ilgums. Tajā tiek reģistrēti
tikai atļaušanas sarakstā iekļautie izpildes metadati; testu apraksti, izvade, kļūdu saturs un pilnā
vide netiek serializēta.

CI saglabā JSONL failus ar nosaukumu `unit-progress-ci-<run>-<attempt>-<shard>`. Darba noildze var nepieļaut vēlāko augšupielādi;
jau nosūtītie sirdspuksta ziņojumi paliek kā diagnostikas pierādījumi. Trūkstoši sirdspuksta ziņojumi var liecināt arī par
bloķētu vai pārtrauktu izpildītāja procesu. Šie ieraksti saglabā esošo testu atlasi,
paralēlismu, termiņus un izejas statusu; tie nav spriedumi par kandidātu pielaidi.

### Sapludināšanas rinda

Atzīme `queue` nosūta PR uz Mergify rindu (`.mergify.yml`). Mergify atver melnraksta PR
zarā `mergify/merge-queue/`, CI tur izpilda pilno atlasi, un sākotnējais PR tiek sapludināts,
kad pārbaudes `Gate / CI`, `Gate / Quality` un `Merge integrity (changelog + generated skills)` ir sekmīgas.

Mergify ieraksta rindas kopsavilkumu melnraksta aprakstā, un arī citas lietotnes var to rediģēt.
`pull_request` notikumam `edited` šādā melnrakstā tiek piešķirta atsevišķa vienlaicīguma grupa
(`-queue-edit-<run_id>`), lai tas nevarētu atcelt melnraksta faktisko izpildi, un tas izlaiž vārtus un
matricu. Turpina darboties tikai `Merge integrity`. Izlaistajam vārtu uzdevumam ir cits pārbaudes nosaukums,
jo Mergify izlaistu `Gate / CI` uztver kā nesekmīgu pārbaudi un izņem PR no rindas.

Pēc izņemšanas no rindas izmaiņu nosūtīšana ne vienmēr atkārtoti ievieto PR rindā. Pievienojiet tam komentāru `@mergifyio queue`.

### Statiskās skenēšanas inventārs

Versijotā npm aizstājvārdu uzskaite un dalība statiskajā skenēšanā atrodas
`config/quality/gate-manifest.json`. Izpildiet `npm run check:gate-manifest`, lai
pārbaudītu skriptu nosaukumus un precīzas komandas pret `package.json`;
papildinājumi, noņemšana un komandu novirzes izraisa kļūmi gan lokālajā āķī, gan
izmaiņu klasifikācijas uzdevumos CI vidē. Aizstājvārds nav darbplūsmas uzdevums,
matricas instance vai testa gadījums: šos skaitļus nedrīkst attēlot kā savstarpēji
aizstājamus.

Izmantojiet `npm run quality:scan -- --list` vai `npm run quality:scan:fast -- --list`,
lai pārskatītu atlasītos aizstājvārdus, tos neizpildot. Izpildītājs izsauc npm
ieejas punktu, tādēļ tiek saglabāta tā izpildvide (tostarp Bun, kur tas ir
konfigurēts). Manifests reģistrē aizstājvārdus ārpus šiem profiliem kā atsevišķi
izsauktus, un tikai lasāmos skenēšanas profilos uzturēšanas komandas ir aizliegtas.

Šie profili aptver tikai statisko skenēšanu. Tie neapliecina produkta testus,
pārklājumu, pakotņošanu, ārējās pārbaudes vai kandidāta pilnīgu laidiena pieņemšanu.
Darbplūsmas pielaide izmanto saistītos `config/quality/admission-policy.json` un
`scripts/quality/admission-verdict.mjs`. Laidiena novērotāja profili paliek
atsevišķi; pārbaudiet to piemērojamās pārbaudes un apliecinājumus neatkarīgi. Pilnā
novērotāja statiskās komandas ir deklarētas
`config/quality/release-green-static-profile.json`, tostarp `audit:deps`,
mutāciju testu atlase un tulkojumu pārbaudes. Ielādētājs pārbauda npm komandas
pret package.json un modelētajām CI/Quality deklarācijām; tas noraida novirzes,
nevis izpilda čaulas marķierus kā argumentus. Obligāta skenera SKIP/INCOMPLETE
izvade nevar apstiprināt PASS. Profils reģistrē savus ārējos izņēmumus un neaizstāj
mitinātā pārklājuma, testu matricu, pakotņu vai izvietošanas pierādījumus. Tālāk
sniegtā aprakstošā uzskaite ir atsauce, nevis pierādījums tam, ka vārti tiešām tika
izpildīti.

Skripti atrodas zem `scripts/check/` (politikas vārti) un `scripts/quality/`
(slieksnīšu mehānisms). CI patiesības avots ir `.github/workflows/ci.yml`.

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

### Atlaidiet PR ātro ceļu (`quality.yml`)

`.github/workflows/quality.yml` papildina CI uz main/release PRs, pārsūta uz `main`, nosūta un apvieno grupas. PRs izmantojiet ceļa filtrētas ātrās pārbaudes. Tika noņemts pastāvīgi atspējots dublikāts; reālās build/package/boot pārbaudes paliek CI. Vienības komplekts un vitest darbojas tikai CI (`Unit Tests (N/8)` un `Vitest`).

| Darbs                                            | Darbības joma                                                                                                                                                                                                        | Bloķēšana              |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs un docs-all                                                                                                                                                                             | Jā                     |
| `Fast Quality Gates`                             | Kods PRs; statiskās pārbaudes, tipa pārbaude, informācijas paneļa tipa pārbaude, ietekmēto vienību testi                                                                                                             | Jā                     |
| `Forgotten sibling tests`                        | Kods PRs; mainīti moduļi, kas izsekot statiskiem patērētājiem un kandidātu brāļu un māsu testiem; mucas un dinamiskā importa ceļi tiek ziņoti kā konsultatīva diagnostika ar atsaucēm uz atļauju saraksta izņēmumiem | **Konsultatīvs**       |
| `No new ESLint warnings`                         | Kods PRs; slāpēšanas izturīgs pret plūksnām                                                                                                                                                                          | Jā, ieskaitot dakšiņas |
| `Merge integrity (changelog + generated skills)` | PRs bez melnraksta ; izmaiņu žurnāls un ģenerētā prasmju sinhronizācija                                                                                                                                              | Jā, ieskaitot dakšiņas |

#### Aizmirsta brāļu un māsu pārbaužu atskaite

`npm run check:forgotten-sibling-tests` darbojas kā `Fast Quality Gates` padomdevēja darbība un atkārtoti izmanto importēšanas atrisinātāju aiz testa ietekmes kartes. Par katru mainīto ražošanas moduli tas ziņo par deterministiskām `changed module/symbol -> static consumer -> candidate sibling test` ķēdēm, ja kandidāta tests nav iekļauts pull-request diff. Markdown kopsavilkums un JSON rezultāts tiek saglabāts kā `forgotten-sibling-tests` darbplūsmas artefakts kalibrēšanai pirms jebkādas bloķēšanas izlaišanas.

Mucu reeksports un dinamiskais imports ir tikai izšķirtspējas diagnostika; tie nekad nerada bloķējošu atradumu. Pārskatītie izņēmumi dzīvo šeit: `config/quality/forgotten-sibling-allowlist.json`. Katrā ierakstā ir jānosauc patērētāja un kandidāta tests, jāsniedz konkrēts pamatojums un jāsaista GitHub problēma vai izvilkšanas pieprasījums. Nepareizi veidotus ierakstus neizdodas aizvērt. Izņēmumi nevar apspiest dzēstu kandidāta testu vai atšķirību, kas pievieno `.skip`/`.todo`; apgalvojumu vājināšanās un cita maskēšana paliek neatkarīgi bloķējošajiem `check:test-masking` vārtiem.

### Uzdevums: `lint`

Tiek palaists katram PR uz `main`. Kļūmes gadījumā bloķē sapludināšanu.

| Skripts (`npm run ...`)           | Pārbauda                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Bloķējošs                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Node.js versija ir atbalstītajā diapazonā                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jā                                           |
| `check:cycles`                    | Cikliskos importus visā `src/` + `open-sse/` (balstīts uz AST, atrisināti tsconfig `paths`). Pamata variants pabeidz darbu ar kodu 1, ja pastāv kaut viens cikls (kļūmes gadījumā bloķē kopš #15281), un uzskaita SCC. `check:cycles:ratchet` (ko izpilda CI) bloķē, ja skaits pārsniedz `metrics.cycles` robežvērtību failā `quality-baseline.json` — pašlaik 14, `direction: down`, tādēļ tā var tikai samazināties (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jā (sprūdrata pārbaude)                      |
| `check:boundary`                  | `open-sse → src` saistība: unikāli importi no faila uz failu no dzinēja lietojumprogrammā (`scripts/quality/measure-boundary.mjs`; malu saraksts ir v4 kodola/moduļu sadalīšanas labojumu neizpildīto darbu saraksts). Pamata variants = konsultatīvs pārskats (tāds pats kā `quality:boundary`). `check:boundary:ratchet` (ko izpilda CI un arī `quality.yml` ātro pārbaužu sprūdrata cikls) bloķē, ja skaits pārsniedz `metrics.boundaryOpenSseToSrc` robežvērtību failā `quality-baseline.json` — sākotnēji iestatīta uz izmērīto vērtību 771, `direction: down`; `--update` to tikai samazina; PR pārbaudēs attiecībā pret bāzi (`--base-ref`, skatiet tālāk)                                                                                                                                                                                                                                                                                                                                                                        | Jā (sprūdrata pārbaude)                      |
| `check:route-validation:t06`      | Zod shēmu klātbūtni visos maršrutos (6. līmeņa politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jā                                           |
| `check:any-budget:t11`            | `@ts-expect-error // any` skaits nepārsniedz budžetu (11. līmeņa catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jā                                           |
| `check:provider-consistency`      | Katram pakalpojumu sniedzējam failā `providers.ts` ir atbilstošs ieraksts failā `providerRegistry.ts` (un otrādi, atļauto ierakstu saraksta ietvaros)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jā                                           |
| `check:model-lifecycle`           | Trīs manuāli uzturētās maršrutēšanas tabulas saglabā atbilstību repozitorijā iekļautajam dzīves cikla momentuzņēmumam (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nepiešķir vērtējumu nevienam izņemtam ID, uz kuru `REGISTRY` var maršrutēt; katrs `BUILT_IN_ALIASES` mērķis ir atrodams reģistrā `REGISTRY` un nav atrodams izņemto ID momentuzņēmumā; katrs izņemtais ID, kas joprojām atrodas reģistrā `REGISTRY`, tiek pārsūtīts vai ir norādīts sarakstā `allowedRetiredInCatalog`; un neviens `DEFAULT_DEGRADATION_MAP` avots vai mērķis šajā momentuzņēmumā nav atzīmēts kā izņemts. Tas nepierāda, ka modeli pašlaik apkalpo aktīvs augšupstraumes pakalpojums. Bezsaistē — salīdzina ar `config/quality/model-lifecycle.json`, kas tiek manuāli atsvaidzināts ar `npm run quality:refresh-model-lifecycle` (nepieciešams tīkls; nav integrēts CI). `allowedRetiredInCatalog` ir pakāpeniskas samazināšanas sprūdrata mehānisms: pievienojiet ierakstu tikai kopā ar izsekošanas problēmu.                                     | Jā                                           |
| `check:fetch-targets`             | Katrs `fetch("/api/...")` klienta puses direktorijā `src/` norāda uz reālu `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jā                                           |
| `check:deps`                      | Visas ar `npm install` instalējamās atkarības visos repozitorija failos `package.json` ir iekļautas failā `dependency-allowlist.json`; jaunās atkarības bez fiksētām versijām vai ar maldinoši līdzīgiem pakotņu nosaukumiem tiek atzīmētas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jā                                           |
| `audit:deps`                      | Visu piecu neatkarīgo slēgšanas failu (saknes, Electron, OpenCode spraudņu v1/v2 un pakalpojumu sniedzēja) npm audits. Kritiski drošības paziņojumi bloķē; augstas prioritātes drošības paziņojumi paliek redzami kā brīdinājumi. Trūkstoši vai nesekmīgi auditi tiek atzīmēti kā NEPILNĪGI un bloķē; katra tvēruma slēgšanas failu jaucējvērtības un pārskati tiek saglabāti.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jā                                           |
| `check:lockfile`                  | `package-lock.json` integritāte — https reģistrs, integritātes jaucējvērtības, bez resursdatora pārrakstīšanas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jā                                           |
| `check:licenses`                  | SPDX licenču atļauto licenču saraksts produkcijas atkarībām                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jā                                           |
| `check:tracked-artifacts`         | Nav būvējuma artefaktu / repozitorijā iekļautu `node_modules` simbolisko saišu (tiek izpildīta arī husky pirmskomita pārbaude; pirmsnosūtīšanas pārbaude ir apzināti viegla — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jā                                           |
| `check:ai-attribution`            | PR komitos, virsrakstā vai pamattekstā nav MI/bota `Co-Authored-By` noslēguma rindas vai MI ģenerēšanas kājenes — stingrais noteikums Nr. #16 (`quality.yml` ātro pārbaužu ciklā PR→`release/**` gadījumā — nolasa notikuma lietderīgo slodzi, ārpus PR neveic nekādas darbības — un tikai PR paredzētā `ci.yml` lintēšanas solī PR→`main` gadījumā; arī husky `commit-msg` āķī; līdzautori cilvēki ir atļauti; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | Katram Vitest izņēmumam ir norādīta izsekošanas problēma, un tas ir iekļauts failā `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Jā                                           |
| `check:file-size`                 | Avota faili (`.ts`/`.tsx` mapēs `src/`, `open-sse/`, `electron/`, `bin/`) nepārsniedz `cap`, bet testu faili (`*.test.ts(x)`) — `testCap`; faili, kas iesaldēti failā `file-size-baseline.json` (`frozen` / `testFrozen`), nedrīkst pārsniegt tajā reģistrēto izmēru                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jā                                           |
| `check:error-helper`              | Kļūdu atbildēs izpildītājos/apstrādātājos tiek izmantots `buildErrorBody()` / `sanitizeErrorMessage()` (stingrais noteikums Nr. #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jā                                           |
| `check:migration-numbering`       | Migrāciju SQL faili ir secīgi numurēti, bez iztrūkumiem vai dublikātiem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jā                                           |
| `check:public-creds`              | Ārpus `publicCreds.ts` nav literālu OAuth `client_id`/`client_secret` vai Firebase tīmekļa atslēgu (stingrais noteikums Nr. #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jā                                           |
| `check:db-rules`                  | Ārpus `src/lib/db/` moduļiem nav neapstrādāta SQL; nav apkopojuma importu no `localDb.ts` (stingrie noteikumi Nr. #2/Nr. #5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jā                                           |
| `check:known-symbols`             | Pakalpojumu sniedzēju izpildītāji, maršrutēšanas stratēģijas un tulkotāji, kas reģistrēti to nosūtīšanas tabulās, atbilst diskā esošajiem failiem — nav savrupu vai nedeklarētu simbolu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jā                                           |
| `check:route-guard-membership`    | Katrs maršruts, kas palaiž bērnprocesu, ir klasificēts ar `isLocalOnlyPath()` (stingrie noteikumi Nr. #15/Nr. #17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jā                                           |
| `check:test-discovery`            | Katru repozitorijā esošo `*.test.ts` / `*.spec.ts` failu atrod vismaz viens testu izpildītājs (ratchet: bāreņfailu saraksts failā `test-discovery-baseline.json` var tikai sarukt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jā                                           |
| `check:test-tla-order`            | Neviens `node:test` fails mapē `tests/unit` nereģistrē testu, nesasniedz augstākā līmeņa `await` un pēc tam nereģistrē vēl citus testus (#18045; ratchet: atļauto vienumu saraksts failā `test-tla-order-allowlist.json` var tikai sarukt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jā                                           |
| `check:agent-skills-sync`         | Ģenerētie aģentu prasmju artefakti atbilst to avota katalogam (nav noviržu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Nodrošinātāju logotipiem/resursiem ir reģistrēts izcelsmes ieraksts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | JSON konfigurācijas faili tiek parsēti un atbilst repozitorija lintēšanas kārtulām                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | TypeScript kompilācija bez kļūdām (tikai konsultatīvi brīdinājumi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jā                                           |
| `typecheck:noimplicit:core`       | Stingrs `noImplicitAny` — uz nākotni vērsta pārbaude; daudzām jau esošām izsaukuma vietām joprojām nepieciešamas anotācijas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Konsultatīvs** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, kas attiecas tikai uz `src/app/(dashboard)/**` (#7033) — `typecheck:core` rūpīgi atlasītais 27 failu atļauto elementu saraksts neietver nevienu informācijas paneļa TSX failu, un arī `next build` nekad neveic tā tipu pārbaudi (`next.config.mjs` iestata `ignoreBuildErrors: true`), tāpēc nesaistītu identifikatoru regresijas šajā daļā (#6625/#6909) CI sistēmai nebija redzamas. Atšķirības tiek salīdzinātas ar fiksētu bāzes līmeni, kurā norādīts skaits katram failam un TS kodam (`config/quality/dashboard-typecheck-baseline.json`, tāds pats novecojušu ierakstu kontroles modelis kā `check:known-symbols`) — pārbaude neizdodas tikai tad, ja rodas JAUNAS kļūdas, kas pārsniedz bāzes līmeņa skaitu; kad iepriekš pastāvējusi kļūda ir novērsta, pakāpeniski samaziniet bāzes līmeni ar `--update`.                                                                                                                                                                                                             | Jā                                           |
| `check:build-typecheck`           | Visas lietotnes produkcijas tipa pārbaude, izmantojot `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), ko neaptver `typecheck:core` 27 failu atļautais saraksts un dashboard vārteja. Izmaiņas tiek salīdzinātas ar `config/quality/build-typecheck-baseline.json`; jauns vai palielināts katra (faila, koda) skaits pārbaudi pārtrauc, bet mazāks skaits pieprasa veikt samazināšanu. `--update` atsakās darboties, ja izpildē ir jauns vai palielināts pāris, ja vien nav nodots `--force-regressions`, un atsakās no jauna apklusināta faila, ja vien nav nodots `--force-nocheck`, tāpēc bāzlīnijas paplašināšana, lai iegūtu sekmīgu rezultātu, un pastāvīgas klusēšanas piešķiršana ir divas atsevišķas apzinātas darbības. Vienkāršs `--force` tiek noraidīts. Tā arī pārmeklē būvēšanas tvērumu, meklējot `@ts-nocheck`, salīdzinot ar `config/quality/ts-nocheck-baseline.json`, jo fails, kas to izmanto, vispār neziņo par diagnostiku un citādi būtu neredzams visām vārtejām. | Jā                                           |

#### Divas tipa pārbaudes programmas sniedz atšķirīgas atbildes

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) un `check:build-typecheck` kompilē atšķirīgas programmas ar
atšķirīgām opcijām, un viens un tas pats fails vienā no tām var būt tīrs, bet otrā
— pilns kļūdu.

`tsconfig.build.json` iestata `"strict": false`, tāpēc `noImplicitAny` ir izslēgts. Core
konfigurācija kompilē rūpīgi atlasītu 27 failu atļauto sarakstu ar stingrākām
opcijām un seko katra ieraksta importēšanas grafam, tāpēc faili, kas būvēšanas
programmā nekad neparādās, tur joprojām tiek pārbaudīti.

Šī atšķirība ir svarīga, vērtējot, vai fails ir tipizēts: **nulle diagnostikas
zem `check:build-typecheck` nenozīmē nulli**. Noņemot `@ts-nocheck` no 26
failiem, izrādījās, ka 23 no tiem būvēšanas programmā ir tīri; sešpadsmit no
tiem stingrajā programmā atklāja aptuveni 120 implicit-any kļūdu. Pirms faila
atzīšanas par tīru pārbaudiet abas programmas.

### Darbs: `quality-gate`

Tiek izpildīts pēc `test-coverage`. Kļūmes gadījumā bloķē sapludināšanu.

| Skripts                      | Ko pārbauda                                                                                                                                                        | Bloķējošs                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| `quality:collect`            | Izveido `quality-metrics.json` (ESLint brīdinājumu skaits, pārklājums no apvienotā segmentu pārskata)                                                              | Jā (pirms sprūdrata pārbaudes) |
| `quality:ratchet`            | Neviena `quality-baseline.json` metrika nav pasliktinājusies (ESLint brīdinājumi ≤ bāzes līmenis; pārklājums ≥ bāzes līmenis)                                      | Jā                             |
| `check:duplication`          | Koda dublēšanās (`jscpd@4`) nepārsniedz `quality-baseline.json` norādīto bāzes līmeni                                                                              | Jā                             |
| `check:complexity`           | Faila līmeņa ciklomātiskā sarežģītība nepārsniedz robežvērtību (pamata ESLint `complexity` + `max-lines-per-function`)                                             | Jā                             |
| `check:cognitive-complexity` | Kognitīvās sarežģītības sprūdrata pārbaude (`eslint-plugin-sonarjs`) — atsevišķa ESLint pārbaude; CI abas izpilda apvienoti vienā `check:complexity-ratchets` solī | Jā                             |
| `check:dead-code`            | Neizmantoto eksportu/failu sprūdrata pārbaude (`knip`) neuzrāda pasliktinājumu salīdzinājumā ar bāzes līmeni                                                       | Jā                             |
| `check:compression-budget`   | Saspiešanas etalonpārbaudes budžets — katram dzinim noteiktais minimālais marķieru ietaupījums nedrīkst samazināties                                               | Jā                             |
| `check:type-coverage`        | Tipizētā koda procentuālās daļas sprūdrata pārbaude (`type-coverage`) neuzrāda pasliktinājumu; lielā mērā aizstāj `typecheck:noimplicit:core`                      | Jā                             |

### Darbi: `codeql-scan` un `codeql-admission`

`codeql-scan` izveido visas konfigurētās analīzes kategorijas. Pēc šī darba sekmīgas pabeigšanas `codeql-admission` validē tā precīzās augšupielādes un kandidāta brīdinājumu ratchet robežu. Abi ir obligātas `Gate / CI` atkarības, arī kandidātiem ar izmaiņām tikai dokumentācijā. Administratīvās aktivizēšanas un izmēģinājuma prasības ir aprakstītas tālāk sadaļā “CodeQL ratchet”.

| Skripts                | Pārbauda                                                                                                                                                                                                                | Bloķējošs |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:codeql-ratchet` | Kandidāta ref/SHA un visām konfigurētajām analīzes kategorijām jābūt aktuālām pirms brīdinājumu ratchet pārbaudes; trūkstoši pierādījumi bloķē. Kopējā inventarizācija paliek atsevišķa — skatīt tālāk “CodeQL ratchet” | Jā        |

### Darbs: `quality-extended`

Uzdevums bloķē attiecīgos kandidātus. Pakotnes lielums, atrastie noslēpumi, ievainojamību
atradumi, darbplūsmu atradumi un OpenAPI izmaiņas tiek pārbaudītas ar obligātām sprūdrata pārbaudēm.
Ciklisko atkarību diagnostikai joprojām ir ieteikuma raksturs. Skeneru instalēšana ir obligāta:
`scripts/ci/install-quality-scanners.sh` nodrošina fiksētas versijas un tālāk propagē
instalēšanas kļūmes. Ja trūkst rīku, pārskati nav derīgi vai nav bāzes līmeņu,
obligātās skenera pārbaudes statuss paliek INCOMPLETE.

| Skripts                  | Pārbauda                                                                                                                                                                                                                                                            | Bloķēšana                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `check:circular-deps`    | Nav ciklisku atkarību (dpdm)                                                                                                                                                                                                                                        | **Konsultatīva**                                  |
| `check:bundle-size`      | Pakotnes izmērs nepārsniedz ierobežojumu; ja mērījums nav pieejams, pārbaude neizdodas                                                                                                                                                                              | **Bloķējoša ar --ratchet**                        |
| `check:secrets`          | Gitleaks atradumu skaits nepalielinās; obligātās skenēšanas noraida trūkstošus rīkus, avotu vai bāzes līniju, neveiksmīgas skenēšanas un nederīgus pārskatus                                                                                                        | **Bloķējoša ar --ratchet**                        |
| `check:vuln-ratchet`     | Atkarību ievainojamību skaits nepalielinās; obligātās skenēšanas noraida trūkstošus rīkus, nederīgus pārskatus vai trūkstošas bāzes līnijas                                                                                                                         | **Bloķējoša ar --ratchet**                        |
| `check:workflows`        | Darbplūsmu lintēšana (actionlint + zizmor); trūkstoši vai bojāti skeneri, nederīgi pārskati vai trūkstoša ratchet bāzes līnija izraisa statusu INCOMPLETE. Derīgajiem atradumiem piemēro izvēlēto stingro, konsultatīvo vai ratchet politiku                        | Izpilde ir obligāta; zizmor ratchet bloķē CI vidē |
| `check:openapi-breaking` | Publiskās API līgums tiek pārbaudīts pret piesaistītajiem notikumu komitiem (PR sapludināšanas bāze, push iepriekšējais komits, merge-group bāze; ieplānotai/manuālai palaišanai — checkout pirmais vecāks); obligāta mērījuma kļūmes gadījumā piekļuve tiek liegta | **Bloķējoša ar --ratchet**                        |

### Darbs: `docs-sync-strict`

Pull requestiem uz `main` vai `release/**` šis darbs tiek izpildīts tikai kandidātiem, kas nav melnraksti (vai atrodas uzticamā rindā) un ir klasificēti kā dokumentācijas vai koda izmaiņas. Tas tiek izpildīts arī CI notikumiem ārpus PR; šī darbplūsmas push palaišana attiecas tikai uz `main`, nevis `release/**`. Solis ar izejas kodu, kas nav nulle, bloķē darbu; tālāk norādītie tikai ziņojamie atradumi un dokumentētie izņēmumi to nebloķē.

| Skripts                        | Pārbauda                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Bloķēšana                                                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-vārteja, kas secīgi izpilda 7 tālāk norādītās apakšvārtejas                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jā                                                                                                                                          |
| ↳ `check:docs-sync`            | Pakotnes/OpenAPI/CHANGELOG versiju saskaņotība, precīzi `llm.txt` spoguļi, tulkotā CHANGELOG sadaļu/izmēra invarianti un aizstātu dokumentu dublikātu neesamība                                                                                                                                                                                                                                                                                                                                              | Jā                                                                                                                                          |
| ↳ `check:docs-frontmatter`     | Kompilētajām dokumentācijas lapām ir derīgi frontmatter virsraksti                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jā                                                                                                                                          |
| ↳ `check:docs-counts`          | Augstas uzticamības skaita invarianti ir stingri; heuristiskās failu skaita pārbaudes tikai brīdina, ja vien skripts nesaņem `--strict` (CI meta-vārteja to nenodod)                                                                                                                                                                                                                                                                                                                                         | Stingrais līmenis bloķē; mīkstais līmenis ir konsultatīvs                                                                                   |
| ↳ `check:env-doc-sync`         | Vides mainīgo nolasījumi pirmkodā, `.env.example` un `docs/reference/ENVIRONMENT.md` sakrīt pēc skaidri noteikto ignore, doc-only un env-only izņēmumu sarakstu piemērošanas                                                                                                                                                                                                                                                                                                                                 | Jā, ārpus dokumentētajiem izņēmumu sarakstiem                                                                                               |
| ↳ `check:deprecated-versions`  | Ziņo par iespējami novecojušām versijām ārpus drošiem vēsturiskiem kontekstiem un novecojušiem atjaunināšanas datumiem, neiekļaujot ignorētos dokumentus                                                                                                                                                                                                                                                                                                                                                     | Konsultatīvi pašreizējā CI konfigurācijā (`--strict` netiek nodots)                                                                         |
| ↳ `check:doc-links`            | Iekšējās Markdown saites dokumentācijā norāda uz reāliem failiem (`[text]`/`(path)` formā)                                                                                                                                                                                                                                                                                                                                                                                                                   | Jā                                                                                                                                          |
| ↳ `check:fabricated-docs`      | Dokumentācijā minētie maršruti, vides mainīgie, CLI komandas, āķu nosaukumi un failu ceļi pastāv kodu bāzē. Stingra vārteja ar `--strict`; bez karoga kļūme ir nebloķējoša.                                                                                                                                                                                                                                                                                                                                  | Jā (CI vidē ar `--strict`)                                                                                                                  |
| `check:cli-i18n`               | Izmantotās CLI `t()` atslēgas pastāv `en`; `pt-BR` saglabā visas augstākā līmeņa sadaļas; `zh-CN` un `zh-TW` satur visas `en` atslēgas                                                                                                                                                                                                                                                                                                                                                                       | Jā                                                                                                                                          |
| `check:openapi-coverage`       | OpenAPI specifikācija aptver vismaz ratchet noteikto minimālo reālo maršrutu skaitu                                                                                                                                                                                                                                                                                                                                                                                                                          | Jā                                                                                                                                          |
| `check:openapi-security-tiers` | Deklarētajām `x-loopback-only`/`x-always-protected` anotācijām jābūt pamatotām ar `routeGuard.ts`; parsētāja kļūdas un tiešās pārbaudes neatbilstības bloķē. Apgrieztā pārbaude par trūkstošām `x-loopback-only` anotācijām zem tikai lokāliem prefiksiem brīdina; tikai ar šabloniem definēti maršruti šajā apgrieztajā pārbaudē netiek iekļauti.                                                                                                                                                           | Parsētāja/tiešās pārbaudes bloķē; apgrieztā pārbaude ir konsultatīva                                                                        |
| `check:openapi-routes`         | Katrs `/api...` ceļš failā `openapi.yaml` neatkarīgi no parametru nosaukumiem atbilst reālam maršrutam pēc pamatotā izņēmumu saraksta `KNOWN_STALE_SPEC` piemērošanas; arī novecojuši saraksta ieraksti izraisa kļūmi                                                                                                                                                                                                                                                                                        | Jā                                                                                                                                          |
| `check:docs-symbols`           | Iekšējās `/api/...` URL atsauces kanoniskajos dokumentos, kas nav spoguļi, atbilst reālam maršrutam vai maršrutu saimei; proxy/upstream/vietturu/failu atsauces un pamatoti `KNOWN_STALE_DOC_REFS` ieraksti ir izslēgti, bet novecojuši izņēmumu saraksta ieraksti izraisa kļūmi                                                                                                                                                                                                                             | Jā                                                                                                                                          |
| `i18n translation drift`       | Pārbauda pamatdokumentu avota/mērķa jaucējvērtības un tulkojuma izcelsmi. PR salīdzinājums pieļauj tikai pilnīgi identiskas mantotas kļūmes; jaunas vai nepārbaudītas avota, trūkstoša mērķa, mērķa jaucējvērtības, novecojuša tulkojuma vai sadaļu kešatmiņas neatbilstības bloķē. Ārpus PR salīdzinājuma avota/trūkstoša mērķa/mērķa jaucējvērtības kļūmes bloķē, bet novecojuši tulkojumi un nesaskanīgas sadaļu kešatmiņas paliek tikai brīdinājumi. Vecā formāta sadaļu kešatmiņas neesamība nav kļūme. | Jauna/nepārbaudīta PR novirze bloķē; pilnīgi identiska mantota novirze ir tikai brīdinājums; noteikumi ārpus PR ir atkarīgi no kļūmes veida |

Divpadsmit README SVG faili direktorijā `docs/diagrams/` tiek ģenerēti (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` ģenerē tos visus no jauna). Katram no tiem ir baitu salīdzināšanas vienības tests
(`tests/unit/docs/readme-*-svg.test.ts`, darbs `test-unit`), kas neizdodas, ja faila versija repozitorijā ir novecojusi, un `check:docs-counts` nolasa kanoniskos skaitļus no to `<text>` mezgliem — tāpēc kontūru veidošanas darbība saglabā katru kontūrveidoto virkni failā kā neredzamu `<text>`. SVG kanonisko skaitļu pārbaude nolasa failus, kas uzskaitīti
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, kā arī `public/images/tier-flow-dark.svg` un `tier-flow-light.svg`;
arī apgalvojumiem par free-forever, catalog-entry, recurring-pool un scoring-factors tiek nolasīts
`promise-pillars.svg`, `free-tier-budget.svg` un `strategies-grid.svg`. `free-tier-budget.svg`
iegūst savus skaitļus no aktīvā kataloga ielādētāja, tāpēc izmaiņas `FREE_MODEL_BUDGETS` vai nodrošinātāja attēlojamajā nosaukumā izraisa CI kļūmi, līdz fails tiek ģenerēts no jauna.

### Darbs: `i18n-ui-coverage`

| Skripts                             | Pārbauda                                                                                                                                                                                                  | Bloķējošs     |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (iekļauts) | UI i18n atslēgu pārklājums ir ≥ 65%                                                                                                                                                                       | Jā            |
| `check-ui-value-drift` (iekļauts)   | Pārrakstīta angļu valodas **vērtība** neatstāj novecojušus tulkojumus                                                                                                                                     | Jā            |
| `check-new-key-coverage` (iekļauts) | **Jauna** angļu valodas atslēga ir iztulkota katrā lokalizācijā — marķieris `__MISSING__:` tiek noraidīts                                                                                                 | Jā            |
| `check-translation-ratio`           | Reālo tulkojumu īpatsvars katrā lokalizācijā (angļu tekstam identiskas / vietturu / trūkstošas lapas ārpus atļauto saraksta) nedrīkst pārsniegt `config/quality/i18n-translation-baseline.json` + rezervi | **Bloķējošs** |

Nepieciešams `fetch-depth: 0` — vērtību novirzes vārteja salīdzina `en.json` ar apvienošanas bāzi.

#### `check-ui-value-drift` — novecojušu tulkojumu vārteja

Atklāj vienīgo i18n regresijas veidu, ko citas vārtejas strukturāli nespēj pamanīt: angļu valodas vērtība
tiek pārrakstīta, bet no _iepriekšējā_ angļu teksta atvasinātie tulkojumi paliek nemainīti, tāpēc
lietotāji, kuri nelieto angļu valodu, turpina lasīt pārliecinoši formulētu, taču nu jau nepareizu tekstu.

Tas reāli nonāca laidienā. `oauthModal.googleOAuthWarning` tika pārrakstīts, kad tika ieviests Antigravity
pieteikšanās palīgs (#5203); **39 no 43 lokalizācijām** saglabāja tekstu, kas operatoriem lika „nokopēt
pilno URL un ielīmēt to zemāk” — plūsmu, kuru šim nodrošinātājam nav iespējams pabeigt. Tas palika
nepamanīts līdz #8463, jo:

- `sync-ui-keys` aizpilda tikai **neesošas** atslēgas, nevis **novecojušas**;
- `check-ui-keys-coverage` skaita atslēgas _esamību_, tāpēc novecojis tulkojums tiek uzskatīts par pārklātu;
- `check-translation-drift` izseko dokumentācijas spoguļus `docs/i18n/<locale>/**.md` —
  tas nekad nelasa `src/i18n/messages/*.json`. Bloķējošs uzdevumā `docs-sync-strict` kopš
  2026-09 atkārtotās sinhronizācijas: rediģējiet pamatdokumentu → `npm run i18n:run -- --files=<doc>` (sadaļas līmenī, lēti).

**Ņem vērā izmaiņas, nevis balstās uz bāzlīniju.** Tas salīdzina `en.json` apvienošanas bāzē ar
darba koku; katrai atslēgai, kuras angļu valodas vērtība ir mainījusies, jebkura lokalizācija, kurā
joprojām ir neskarts tulkojums, tiek uzskatīta par novecojušu. Tas apzināti **iesaldē iepriekš pastāvošo parādu** — izmaiņu
salīdzinājums nevar atklāt, no kura vecā angļu teksta ir radies sen pastāvošs tulkojums, tāpēc vārteja vērtē
tikai to, ko skar pašreizējās izmaiņas. Alternatīva (katras atslēgas jaucējvērtību bāzlīnija) prasītu
aptuveni 600 KB ģenerētu failu, kas būtu 3× lielāks par lielāko esošo bāzlīniju un mainītos katrā i18n PR.

To var izpildīt divos veidos:

1. atjaunināt skartos tulkojumus vai
2. iestatīt tos uz `__MISSING__:<new english>` — izpildlaikā tad tiek izmantots izlabotais angļu teksts
   (`src/i18n/request.ts::deepMergeFallback`, #7258), un atslēga tiek ievietota tulkošanas rindā.

Ja ir mainījusies virknes **nozīme**, ieteicams **pārdēvēt atslēgu**: jauna atslēga nevar mantot
novecojušu tulkojumu. Šādu pieeju izmantoja #8463.

```bash
npm run i18n:check-value-drift          # stingrā pārbaude (to izpilda CI)
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

Pilna i18n validācijas matrica (viens uzdevums katrai lokalizācijai). Viss uzdevums ir konsultatīvs.

| Skripts                         | Ko validē                              | Bloķējošs                                                    |
| ------------------------------- | -------------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Tulkojuma pilnīgumu katrā lokalizācijā | **Konsultatīvs** (`continue-on-error: true` visam uzdevumam) |

### Uzdevums: `pr-test-policy`

Tiek izpildīts tikai izmaiņu pieprasījumiem.

| Skripts                | Ko validē                                                                                                                                                       | Bloķējošs |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR, kas maina produkcijas kodu direktorijās `src/`, `open-sse/`, `electron/` vai `bin/`, ir jāiekļauj vai jāatjaunina testi (stingrais noteikums #8)            | Jā        |
| `check:test-masking`   | Mainītie testu faili nesamazina kopējo apgalvojumu skaitu un nepievieno `assert.ok(true)` tautoloģijas                                                          | Jā        |
| `check:pr-evidence`    | PR aprakstā ir norādīti izmaiņu testēšanas/VPS pierādījumi (automatizē stingro noteikumu #18, meklējot PR tekstā — trausli; skatiet neizpildīto darbu sarakstu) | Jā        |

### Uzdevums: `test-vitest`

Nepieciešams `changes` klasifikācijas darbs. Attiecīgo matricas segmentu kļūme bloķē sapludināšanu.

| Komplekts        | Pārbauda                                                          | Bloķējošs                                                                                                                      |
| ---------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP serveri (110 rīki), autoCombo, kešatmiņu — vitest izpildītājs | Jā                                                                                                                             |
| `test:vitest:ui` | UI komponentu testus — vitest izpildītājs                         | **Bloķējošs** — iepriekš pastāvošās kļūmes ir skaidri izslēgtas failā `vitest.config.ts`; jaunas kļūmes izraisa uzdevuma kļūmi |

### Nakts darbplūsmas (ieplānotas, konsultatīvas)

Tās tiek izpildītas pēc cron grafika (un ar `workflow_dispatch`), bet nekad PR ietvaros. Visas ir konsultatīvas.

| Darbplūsma             | Pārbauda                                                                                                                                                                         | Bloķēšana        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | fast-check īpašību testus ar nejaušu sākumvērtību un lielu izpildes reižu skaitu                                                                                                 | **Konsultatīva** |
| `nightly-resilience`   | atmiņas kaudzes pieauguma slieksni, haosa kļūmju injicēšanu, k6 slodzes/ilgstošas slodzes testus                                                                                 | **Konsultatīva** |
| `nightly-llm-security` | promptfoo injekciju aizsardzību (bloķēšanas režīmā) + garak pārbaudes (tiek izlaistas bez pakalpojumu sniedzēja noslēpuma)                                                       | **Konsultatīva** |
| `nightly-schemathesis` | OpenAPI līguma fuzz testēšanu (schemathesis) pret aktīvu OmniRoute, izmantojot `docs/openapi.yaml` — atklāj specifikācijas pārkāpumus / neapstrādātas 500. kļūdas (8. posms B.4) | **Konsultatīva** |
| `nightly-mutation`     | Stryker mutāciju testēšanas rezultātu ātro vienībtestu joslā — izdzīvojušās mutācijas atklāj vājas pārbaudes                                                                     | **Konsultatīva** |
| `nightly-compat`       | Node dzinēja saderības matricu visos atbalstītajos `engines.node` diapazonos                                                                                                     | **Konsultatīva** |

Veiktspējas bāzes rādītāji (atmiņas kaudze, TTFB, būvēšanas laiks) tiek reģistrēti, bet netiek izmantoti kā izpildes slieksnis: skatiet [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
