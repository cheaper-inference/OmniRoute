# Quality Gates Reference (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Šis dokumentas yra pagrindinis visų „OmniRoute“ CI kokybės vartų informacijos šaltinis.
Jame aprašomi visi vartai, ką jie tikrina, kurioje CI užduotyje jie vykdomi, ar jiems
taikoma reketo bazinė reikšmė, ar sėkmės / nesėkmės politika, ir ar jie blokuoja komponavimą, ar yra tik rekomendaciniai.

Trumpą santrauką ir leidžiamų išimčių sąrašo politiką rasite `AGENTS.md` skiltyje „Quality Gates & Ratchets“.
Kritinį vertinimą, brandos klasifikaciją ir nuo įrankių nepriklausomą
tos pačios sistemos atkūrimo planą rasite
[kokybės vartų vadove](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Patikrų inventorius ir vykdymo profiliai

### Kandidatų priėmimas

CI ir „Quality Gates“ darbo eigos skleidžia stabilų sprendimą: `Gate / CI` ir `Gate / Quality`. Jų sudarytoje priėmimo politikoje yra išvardijami visi ankstesni darbai, kaip reikalaujama arba patariama. Reikalingas darbas turi būti sėkmingas: trūkstamų, atšauktų, praleistų, laukiančių ir nežinomų rezultatų negalima nustatyti PASS. Dėl galiojančios tik dokumentų arba tik katalogo klasifikacijos kodo juosta gali būti netaikoma; paprastas juodraštis PR nėra priimtas kandidatas. `hotfix` etiketė neatsako įrodinėjimo.

Abi darbo eigos apima PRs į main/release šakas, stumia į `main`, rankinio išsiuntimo ir sujungimo grupės įvykius. Stumti, išsiųsti ir sujungti grupę paleiskite visą pasirinkimą. Patikimas Mergify eilės juodraštis taip pat vykdo atitinkamas `full-code`/`full-code-e2e` užduotis; paprastas PRs praleisti juos. Prieš rankinį sujungimą paleiskite visą konkretaus kandidato siuntimą. Paspaudimai į `release/**` nepaleidžia šios darbo eigos; „Release-Green“ atskirai stebi sujungtą bazę (`docs/ops/RUNNER_BOX.md` → Hosted lane). Šakės ir sujungimo grupės naudoja priglobtus bėgikus darbams, kurie kitu atveju pasirenka savarankiškai priglobtus bėgikus; Prieš išleidžiant turi būti patikrinta, ar yra pakankamai talpyklų.

Įprastas PR vykdo greitą pasirinkimą. Priėmimo politikos `full-code` ir `full-code-e2e` juostos (E2E, integracija, paketo artefaktas, Electron dūmai, Bun SQLite, ekosistemos ir protokolo klientai) veikia tik sujungimo eilės juodraštyje arba visą paleidimą: `gh workflow run ci.yml --ref <branch>`.

Kiekviename JSON kvite nurodomas patikrintas SHA, darbo eigos vykdymas ir bandymas. CLI atmeta checkout/event SHA neatitikimą. Darbo eigos testai susieja politikos narystę su verdikto darbo `needs` sąrašu, todėl nauja arba pašalinta juosta negali tyliai išnykti. Kvitai apima jų pačių darbo eigą, o ne paskelbimą, diegimą ar esamo patariamojo skaitytuvo vidines dalis. Filialo taisyklėse reikalaujamų taikomų patikrinimų atlikimas yra atskiras administracinis pakeitimas; jų darbo vietų apibrėžimas savaime neapsaugo filialo.

`API Route Typecheck` yra nepriklausomas darbo eigos patikrinimas, neatsižvelgiant į bendrus sprendimus ir vietinio pilno stebėtojo statinį profilį. Atskirai patikrinkite jo rezultatą dėl tikslaus kandidato. `.github/workflows/api-route-typecheck.yml` veikia PRs į `main` arba `release/**`, perkelia bet kurią šakų šeimą, rankinį išsiuntimą ir `merge_group` tipo `checks_requested` įvykius. Jame nėra kelio filtro. Sujungti grupes patikrinkite `merge_group.head_sha`; kitus įvykius patikrinkite `github.sha`. Visuose įvykiuose naudojami tie patys API diagnostikos vartų ir vartų bloko testai. PR baziniai pakartotiniai tikslai reikalauja naujo patikrinimo; body/title redagavimai naudoja tik stebėjimo pavadinimą `Admission not requested / API Route Typecheck` ir negali pakeisti priėmimo patikros.

### Išsaugoti įrodymai priėmimo reduktoriuje

`scripts/quality/validate-release-acceptance.mjs` redukuoja pateiktą planą ir jo
manifestus; jis nenustato, ar planas apima visą leidimo konvejerį. Jo ataskaitose
aiškiai nustatoma `releaseAcceptance: false`, net kai tas planas yra `VERIFIED`.
Darbo eiga `release-acceptance.yml` vis dar naudoja imitacinius bandymų duomenis, o ne
tikrus komponavimo, paketų kūrimo, paleidimo ar paaukštinimo kvitus.

Norint patikrinti išsaugotus įrodymus, CLI būtinas parametras `--evidence-root`.
Failai nustatomi kaip `<evidence-root>/<artifact_id>/<member>` ir jų SHA-256 maišos
apskaičiuojamos. PASS įrašas be įrodymų, trūkstamas ar pakeistas failas, nesaugus
kelias arba simbolinė nuoroda neleidžia patvirtinti. Trūkstami failai nėra lygiaverčiai
tuštiems sėkmingo vykdymo žurnalams. Esamos SHA, vykdymo ir bandymo patikros išlieka
nepriklausomos: sutampantys baitai negali ištaisyti pasenusio kvito. Failo vientisumas
neįrodo vykdymo autentiškumo ar artefakto paaukštinimo.

### DAST naudoja patikrintą CI komponavimo rezultatą

Privaloma CI užduotis `dast-smoke` po `build` iškviečia `.github/workflows/dast-smoke.yml`. Ji taiko tokią pačią kodo ir juodraščių atranką kaip komponavimas, įskaitant palaikomus PR iš išsišakojimų, PR į leidimo šaką ir sujungimo grupes. Trūkstama, nesėkminga, atšaukta ar netikėtai praleista DAST užduotis blokuoja `Gate / CI`. Pakartotinai naudojama darbo eiga neturi savarankiško PR ar rankinio paleidimo trigerio; rankinis tikrinimas naudoja CI paleidimą, kad komponuotojas ir vartotojas liktų tame pačiame vykdyme.

`scripts/ci/next-build-provenance.mjs` užantspauduoja visą Next artefaktą su jo tar maišos reikšme, saugykla/įvykiu/vykdymu, gamintojo bandymu, head/base/checkout/tree reikšmėmis, darbo eigų tapatybėmis, priklausomybių užrakto failu, tikslia Node versija ir ABI, platforma bei paketavimo įrankiu. DAST pasirenka nekintamą artefakto ID iš `needs.build.outputs`, reikalauja patikrinti atsisiuntimo maišos reikšmę ir nepriklausomai apskaičiuoja ZIP maišą bei palygina ją su gamintojo reikšme, prieš išskleisdamas du leidžiamus įrašus per `scripts/ci/unpack-ci-build.py`. Manifestas ir tar archyvas taip pat turi atitikti nepriklausomus gamintojo išvesties duomenis prieš išskleidžiant Next medį. Niekada neieškoma naujausio sėkmingo šakos komponavimo. Dalinis pakartotinis vykdymas gali pakartotinai naudoti tą patį gamintojo bandymą, jei jo ID ir visi įvesties duomenys vis dar sutampa; patvirtinimo įrašas išsaugo abu bandymus.

Vartotojas lieka platformos priglobtame Linux vykdiklyje su tik skaitymo teisėmis saugykloje ir be saugyklos paslapčių. Jis įdiegia tikslią gamintojo Node versiją, tada surenka CLI su `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` atmeta trūkstamą autonominį serverį prieš bet kokį atsarginį komponavimą; įprasti vietiniai CLI komponavimai išlaiko esamą atsarginį būdą. Serverio pasirengimas, Schemathesis ir promptfoo turi būti sėkmingi per nepakeistą 25 minučių užduoties ribą. Kilmės patvirtinimo įrašas įrodo įvesties tapatybę ir baitus, o ne sėkmingą DAST skenavimą. Artefakto galiojimo pabaiga, vykdiklio pertrūkis ar skenerio klaida lieka neišsamiais arba nesėkmingais įrodymais; patariamoji apgauba negali jų paversti PASS.

### UI vykdymo pajėgumai

CI vykdo visą UI inventorių kaip keturias `test-vitest` matricos dalis, kiekvienoje
naudodamas ne daugiau kaip po dvi vykdykles ir išlaikydamas esamą 15 minučių užduoties
terminą. Pirmojoje dalyje taip pat vykdomas MCP/autoCombo Vitest rinkinys. Privalomos
užduoties rezultatas apima kiekvieną matricos elementą; vienos dalies nesėkmė arba
atšaukimas negali patvirtinti kandidato priėmimo.

Naktinis stebėtojas išsaugo atskirą tikslaus kandidato kvitą kiekvienai UI daliai,
įskaitant MCP vykdymą pirmajame kvite. Būtini visi keturi kvitai, žurnalai ir
sutampančios vykdymo tapatybės. Vietinė komanda `npm run test:vitest:ui` vis dar
pasirenka visą rinkinį; vienas vykdymas su `--shard` yra tik dalinis įrodymas.

### Vienetinių testų aprėpties rinkimas

Dvylika vienetinių testų dalių renka V8 aprėptį esamo testų vykdymo metu. Sėkminga
dalis paleidžia `scripts/ci/compact-v8-coverage.mjs`, kad suspaustų pradinius failus
negeneruodama tarpinės Istanbul ataskaitos. Galutinė Coverage užduotis patikrina visus
dvylika manifestų pagal kandidato SHA, vykdymo aplinką, šaltinio šaknį ir duomenų maišas,
tada paleidžia c8 ataskaitų generatorius ir taiko esamas aprėpties ribines vertes.
Įvestyse išlaikoma c8 visuotinė failų pavadinimų tvarka; išankstinis dalių sujungimas
yra nesaugus, kai funkcijų ir blokų aprėptis yra mišri. Trūkstamos, netinkamai
suformuotos arba nesuderinamos dalys lemia nepriėmimą. Nesėkmingų testų dalys atskirai
išsaugo neapdorotus diagnostinius aprėpties duomenis; jie negali būti įtraukti į
galutinį sujungimą.

### Modulių vykdymo eigos patvirtinimai

Bendroji `test:unit:ci:shard` komanda registruoja `primary`, `dashboard` ir `serial`
etapus naudodama `scripts/ci/unit-progress-reporter.mjs`. Įprasta testų ataskaita išlieka
pasiekiama. Atskirame, tik metaduomenims skirtame patvirtinime registruojama kiekvieno failo vykdymo pradžia ir pabaiga,
o kas 30 sekundžių siunčiamame aktyvumo signale išvardijami vis dar aktyvūs failai ir jų vykdymo trukmė. Registruojami
tik į leidžiamųjų sąrašą įtraukti vykdymo metaduomenys; testų aprašai, išvestis, klaidų turinys ir visa
aplinka nėra serializuojami.

CI išsaugo JSONL failus pavadinimu `unit-progress-ci-<run>-<attempt>-<shard>`. Pasibaigus užduočiai skirtam laikui, vėlesnis įkėlimas gali neįvykti;
jau išsiųsti aktyvumo signalai išlieka diagnostiniais įrodymais. Aktyvumo signalų nebuvimas taip pat gali reikšti,
kad vykdyklės procesas buvo užblokuotas arba nutrauktas. Šie patvirtinimai išsaugo esamą testų parinkimą,
lygiagretumą, terminus ir baigties būseną; jie nėra sprendimai dėl kandidato priėmimo.

### Sujungimo eilė

Žyma `queue` nusiunčia PR į Mergify eilę (`.mergify.yml`). Mergify atidaro juodraštinį PR
šakoje `mergify/merge-queue/`, CI joje vykdo visą rinkinį, o pradinis PR sujungiamas, kai
`Gate / CI`, `Gate / Quality` ir `Merge integrity (changelog + generated skills)` patikros
būna sėkmingos.

Mergify įrašo eilės suvestinę į juodraščio aprašą, kurį taip pat gali redaguoti kitos
programos. Tokio juodraščio `pull_request` `edited` įvykis gauna atskirą lygiagretumo
grupę (`-queue-edit-<run_id>`), todėl negali atšaukti tikrojo juodraščio vykdymo ir
praleidžia patikrą bei matricą. Vis tiek vykdoma tik `Merge integrity`. Praleista
patikros užduotis turi kitą patikros pavadinimą, nes Mergify praleistą `Gate / CI`
interpretuoja kaip nesėkmingą patikrą ir pašalina PR iš eilės.

Pašalinus PR iš eilės, siuntimas ne visada grąžina jį į eilę. Parašykite jame komentarą
`@mergifyio queue`.

### Statinės analizės inventorius

Versijuojamas npm alternatyviųjų pavadinimų inventorius ir statinės analizės narystė
saugomi `config/quality/gate-manifest.json`. Paleiskite `npm run check:gate-manifest`,
kad pagal `package.json` patikrintumėte scenarijų pavadinimus ir tikslias komandas;
pridėjimai, pašalinimai ir komandų neatitikimai lemia tiek vietinio kablio, tiek
pakeitimų klasifikavimo užduočių CI aplinkoje nesėkmę. Alternatyvusis pavadinimas nėra
darbo eigos užduotis, matricos egzempliorius ar testo atvejis: šių kiekių negalima
pateikti kaip lygiaverčių.

Norėdami nevykdydami peržiūrėti pasirinktus alternatyviuosius pavadinimus, naudokite
`npm run quality:scan -- --list` arba `npm run quality:scan:fast -- --list`.
Vykdyklė iškviečia npm įėjimo tašką, todėl išsaugoma jo vykdymo aplinka, įskaitant Bun,
kai jis sukonfigūruotas. Manifestas registruoja už šių profilių ribų esančius
alternatyviuosius pavadinimus kaip iškviečiamus atskirai, o priežiūros komandos
draudžiamos tik skaitymui skirtuose analizės profiliuose.

Šie profiliai apima tik statinę analizę. Jie nepatvirtina produkto testų, aprėpties,
paketų kūrimo, išorinių patikrų ar viso kandidato leidimo priėmimo. Priėmimas darbo
eigoje naudoja susietus `config/quality/admission-policy.json` ir
`scripts/quality/admission-verdict.mjs`. Leidimo stebėtojo profiliai išlieka atskiri;
jų taikomas patikras ir kvitus tikrinkite atskirai. Viso stebėtojo statinės komandos
aprašytos `config/quality/release-green-static-profile.json`, įskaitant `audit:deps`,
mutacijų testų pasirinkimą ir vertimų patikras. Įkėliklis patikrina npm komandas pagal
package.json ir modeliuotus CI/Quality aprašus; aptikęs neatitikimą jis atmeta įvestį,
užuot vykdęs apvalkalo leksemas kaip argumentus. Privalomo skaitytuvo SKIP/INCOMPLETE
išvestis negali patvirtinti PASS. Profilyje registruojamos jo išorinės išimtys, ir jis
nepakeičia prieglobos aprėpties, testų matricų, paketų ar diegimo įrodymų. Toliau
pateikiamas tekstinis inventorius yra informacinis, o ne įrodymas, kad patikra iš
tikrųjų buvo vykdyta.

Scenarijai yra kataloguose `scripts/check/` (politikos patikros) ir
`scripts/quality/` (progreso fiksavimo mechanizmas). Patikimasis CI informacijos
šaltinis yra `.github/workflows/ci.yml`.

### Paskelbtos bazės dokumentacijos būklė

`.github/workflows/i18n-base-health.yml` stebi dokumentacijos būklę po pasirinktų
siuntimų į `main` ir `release/v*`, taip pat paleidus rankiniu būdu. Jo filtrai apima dokumentaciją,
šakninio katalogo Markdown failus, `llm.txt`, vertimų būseną bei konfigūraciją ir susijusius i18n įrankius.
Vienintelė `Published base documentation health` užduotis naudoja prieglobos paslaugos teikiamą Ubuntu aplinką ir jai
taikomas penkių minučių terminas. Ji atlieka tik skaitomąją patikrą ir įrašo diagnostinį kvitą
nediegdama priklausomybių, neatlikdama vertimo ir neperimdama būsenos.

`scripts/i18n/check-base-health.mjs` reikalauja, kad nebūtų šaltinio maišos, trūkstamų tikslinių failų, tikslinės maišos,
pasenusių vertimų ir skirsnių podėlio neatitikimų. Jis taip pat patikrina dabartinę pagrindinių
dokumentų bei lokalių aprėptį ir užregistruotą jų kilmę. Netinkamas kontekstas, nevisiška aprėptis
arba nutraukta tikrinimo priemonė pateikia `INCOMPLETE`; patvirtintas nuokrypis pateikia `FAIL`. Abiem
atvejais grąžinama nesėkmę žyminti baigimo būsena. Kvitas susiejamas su paimtos versijos SHA, darbo eiga, vykdymu ir
bandymu bei išsaugomas kaip `i18n-base-health-<sha>-<run>-<attempt>`.

Tai yra nepriklausomas paskelbtos bazės stebėjimas. Jis neprideda PR ar
sujungimo grupės įvykio, privalomos PR patikros, npm alternatyvaus pavadinimo ar statinio nuskaitymo profilio nario.
Esama diferencinė PR politika ir pagrindinės tikrinimo priemonės rekomendacinės klasifikacijos
lieka atskiros. Sėkmingas įkėlimas negali nepavykusio būklės rezultato paversti į PASS.

### Atleiskite PR greitąjį kelią (`quality.yml`)

`.github/workflows/quality.yml` papildo CI main/release PRs, stumia į `main`, siunčia ir sujungia grupes. PRs naudokite pagal kelią filtruotus greitus patikrinimus. Buvo pašalintas visam laikui išjungtas dublikatas; tikrieji build/package/boot patikrinimai lieka CI. Vieneto komplektas ir vitest veikia tik CI (`Unit Tests (N/8)` ir `Vitest`).

| Darbas                                           | Taikymo sritis                                                                                                                                                                                                                      | Blokavimas              |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs ir docs-all                                                                                                                                                                                            | Taip                    |
| `Fast Quality Gates`                             | Kodas PRs; statiniai patikrinimai, tipo patikra, prietaisų skydelio tipo patikra, paveikto įrenginio bandymai                                                                                                                       | Taip                    |
| `Forgotten sibling tests`                        | Kodas PRs; pakeisti moduliai, siejami su statiniais vartotojais ir kandidatų brolių ir seserų testais; statinės ir dinaminio importavimo keliai pateikiami kaip patariamoji diagnostika su nurodytomis leidžiamųjų sąrašo išimtimis | **Patariamoji**         |
| `No new ESLint warnings`                         | Kodas PRs; slopinantis pūkelių apsauga                                                                                                                                                                                              | Taip, įskaitant šakutes |
| `Merge integrity (changelog + generated skills)` | Ne skersvėjis PRs; pakeitimų žurnalas ir sugeneruotas įgūdžių sinchronizavimas                                                                                                                                                      | Taip, įskaitant šakutes |

#### Pamirštų brolių ir seserų bandymų ataskaita

`npm run check:forgotten-sibling-tests` veikia kaip patariamasis `Fast Quality Gates` veiksmas ir pakartotinai naudoja importavimo sprendiklį už bandymo poveikio žemėlapio. Kiekvienam pakeistam gamybos moduliui jis praneša apie deterministines `changed module/symbol -> static consumer -> candidate sibling test` grandines, kai kandidato testo nėra ištraukimo užklausos skirtume. Žymėjimo suvestinė ir JSON rezultatas išsaugomi kaip `forgotten-sibling-tests` darbo eigos artefaktas kalibravimui prieš bet kokį blokavimo išleidimą.

Barrelinis reeksportas ir dinaminis importas yra tik skiriamosios gebos diagnostika; jie niekada nesukuria blokuojančio radinio. Apžvelgtos išimtys gyvena `config/quality/forgotten-sibling-allowlist.json`. Kiekvienas įrašas turi įvardyti vartotojo ir kandidato testą, pateikti konkretų pagrindimą ir susieti GitHub problemą arba užklausą. Netinkamai suformuotus įrašus nepavyko uždaryti. Išimtys negali nuslopinti ištrinto kandidato testo arba skirtumo, kuris prideda `.skip`/`.todo`; tvirtinimo susilpnėjimas ir kitas maskavimas lieka nepriklausomai blokuojantiems `check:test-masking` vartams.

### Užduotis: `lint`

Vykdoma kiekvienam į `main` nukreiptam PR. Nesėkmės atveju blokuoja sujungimą.

| Scenarijus (`npm run ...`)        | Tikrina                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Blokuojantis                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `check:node-runtime`              | Ar Node.js versija patenka į palaikomą diapazoną                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Taip                                           |
| `check:cycles`                    | Ciklines importavimo priklausomybes visame `src/` + `open-sse/` (pagrįsta AST, atsižvelgiant į tsconfig `paths`). Tiesioginis paleidimas grąžina išėjimo kodą 1, kai egzistuoja bent vienas ciklas (nuo #15281 klaidos atveju prieiga blokuojama), ir pateikia SCC sąrašą. `check:cycles:ratchet` (paleidžiama CI) blokuoja, kai skaičius viršija `quality-baseline.json` nustatytą `metrics.cycles` viršutinę ribą — šiuo metu 14, `direction: down`, todėl jis gali tik mažėti (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Taip (kartelė)                                 |
| `check:boundary`                  | `open-sse → src` susiejimą: unikalius importavimus tarp failų iš variklio į programą (`scripts/quality/measure-boundary.mjs`; ryšių sąrašas yra v4 branduolio / modulių išskaidymo taisymo darbų sąrašas). Tiesioginis paleidimas = informacinė ataskaita (tokia pati kaip `quality:boundary`). `check:boundary:ratchet` (paleidžiama CI, taip pat `quality.yml` sparčiųjų patikrų kartelės cikle) blokuoja, kai skaičius viršija `quality-baseline.json` nustatytą `metrics.boundaryOpenSseToSrc` viršutinę ribą — pradinė reikšmė nustatyta pagal išmatuotą 771, `direction: down`; `--update` gali ją tik sumažinti; PR atveju skaičiuojama bazinės šakos atžvilgiu (`--base-ref`, žr. toliau)                                                                                                                                                                                                                                                                                                                                                      | Taip (kartelė)                                 |
| `check:route-validation:t06`      | Ar visuose maršrutuose yra Zod schemos (6 lygio politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Taip                                           |
| `check:any-budget:t11`            | `@ts-expect-error // any` skaičius neviršija biudžeto (11 lygio catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Taip                                           |
| `check:provider-consistency`      | Kiekvienas `providers.ts` esantis teikėjas turi atitinkamą įrašą faile `providerRegistry.ts` (ir atvirkščiai, leidžiamųjų sąrašo ribose)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Taip                                           |
| `check:model-lifecycle`           | Trys rankiniu būdu prižiūrimos maršruto parinkimo lentelės išlieka suderintos su saugykloje esančia gyvavimo ciklo momentine kopija (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nevertina nė vieno nebenaudojamo identifikatoriaus, kurį gali nukreipti `REGISTRY`; kiekvienas `BUILT_IN_ALIASES` tikslas yra `REGISTRY` ir jo nėra nebenaudojamų identifikatorių momentinėje kopijoje; kiekvienas nebenaudojamas identifikatorius, vis dar esantis `REGISTRY`, yra persiunčiamas arba nurodytas `allowedRetiredInCatalog`; taip pat nė vienas `DEFAULT_DEGRADATION_MAP` šaltinis ar tikslas toje momentinėje kopijoje nėra pažymėtas kaip nebenaudojamas. Tai neįrodo, kad modelį šiuo metu aptarnauja veikianti išorinė sistema. Veikia neprisijungus — lyginama su `config/quality/model-lifecycle.json`, kuri rankiniu būdu atnaujinama naudojant `npm run quality:refresh-model-lifecycle` (reikalingas tinklas; neįtraukta į CI). `allowedRetiredInCatalog` yra laipsniško mažinimo fiksatorius: įrašą pridėkite tik kartu su sekimo užduotimi. | Taip                                           |
| `check:fetch-targets`             | Kiekviena kliento pusės `src/` esanti `fetch("/api/...")` užklausa nukreipiama į tikrą `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                           |
| `check:deps`                      | Visos priklausomybės, kurias galima įdiegti naudojant `npm install`, iš kiekvieno saugykloje esančio `package.json` yra įtrauktos į `dependency-allowlist.json`; nauji neužfiksuotų versijų arba su rašybos klaidomis imituojami paketai pažymimi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                           |
| `audit:deps`                      | Visų penkių nepriklausomų priklausomybių užrakinimo failų (šakninio, Electron, OpenCode papildinių v1/v2 ir teikėjo) npm auditas. Kritiniai saugumo įspėjimai blokuoja; aukšto lygio įspėjimai lieka matomi kaip perspėjimai. Trūkstami arba nepavykę auditai laikomi NEBAIGTAIS ir blokuoja; išsaugomos kiekvienos srities užrakinimo failų maišos ir ataskaitos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Taip                                           |
| `check:lockfile`                  | `package-lock.json` vientisumas — https registras, vientisumo maišos, jokių prieglobos serverio perrašymų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Taip                                           |
| `check:licenses`                  | SPDX licencijų leidžiamasis sąrašas gamybinėms priklausomybėms                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip                                           |
| `check:tracked-artifacts`         | Jokių kūrimo artefaktų / užregistruotų `node_modules` simbolinių nuorodų (taip pat vykdoma husky pre-commit metu; pre-push sąmoningai paliktas minimalus — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                           |
| `check:ai-attribution`            | PR commit'uose, pavadinime ar apraše negali būti DI / boto `Co-Authored-By` pabaigos eilutės ar DI generavimo poraštės — griežtoji taisyklė Nr. #16 (`quality.yml` sparčiųjų patikrų cikle, skirtame PR→`release/**` — skaito įvykio duomenis, nieko nedaro ne PR atvejais — ir tik PR skirtame `ci.yml` lint žingsnyje, skirtame PR→`main`; taip pat husky `commit-msg` kabliuke; žmonės bendraautoriai leidžiami; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | Kiekvienoje Vitest išimtyje nurodoma sekimo užduotis ir ji pateikiama faile `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                           |
| `check:file-size`                 | Šaltinio failai (`.ts`/`.tsx`, esantys `src/`, `open-sse/`, `electron/`, `bin/`) neturi viršyti `cap`, o testų failai (`*.test.ts(x)`) — `testCap`; faile `file-size-baseline.json` užfiksuoti failai (`frozen` / `testFrozen`) neturi išaugti virš užregistruoto dydžio                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Taip                                           |
| `check:error-helper`              | Klaidų atsakuose vykdyklėse / apdorojimo programose naudojama `buildErrorBody()` / `sanitizeErrorMessage()` (griežtoji taisyklė Nr. #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Taip                                           |
| `check:migration-numbering`       | Migracijų SQL failai numeruojami nuosekliai, be praleistų ar pasikartojančių numerių                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Taip                                           |
| `check:public-creds`              | Už `publicCreds.ts` ribų nėra tiesiogiai įrašytų OAuth `client_id` / `client_secret` ar Firebase žiniatinklio raktų (griežtoji taisyklė Nr. #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Taip                                           |
| `check:db-rules`                  | Už `src/lib/db/` modulių ribų nėra neapdorotų SQL užklausų; nėra bendrųjų importų iš `localDb.ts` (griežtosios taisyklės Nr. #2 / Nr. #5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Taip                                           |
| `check:known-symbols`             | Teikėjų vykdyklės, maršruto parinkimo strategijos ir transformatoriai, užregistruoti jų paskirstymo lentelėse, atitinka diske esančius failus — nėra nesusietų ar nedeklaruotų simbolių                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Taip                                           |
| `check:route-guard-membership`    | Kiekvienas maršrutas, paleidžiantis antrinį procesą, klasifikuojamas naudojant `isLocalOnlyPath()` (griežtosios taisyklės Nr. #15 / Nr. #17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                           |
| `check:test-discovery`            | Kiekvieną saugykloje esantį `*.test.ts` / `*.spec.ts` failą aptinka bent viena testų vykdymo priemonė (fiksatorius: pavienių failų sąrašas faile `test-discovery-baseline.json` gali tik trumpėti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Taip                                           |
| `check:test-tla-order`            | Jokiame `node:test` faile, esančiame `tests/unit`, testas nėra užregistruojamas prieš aukščiausio lygio `await`, o po jo užregistruojama daugiau testų (#18045; fiksatorius: `test-tla-order-allowlist.json` gali tik trumpėti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Taip                                           |
| `check:agent-skills-sync`         | Sugeneruoti agentų įgūdžių artefaktai atitinka jų šaltinio katalogą (nėra nuokrypio)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | Teikėjų logotipai ir ištekliai turi užregistruotą kilmės įrašą                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | JSON konfigūracijos failai sėkmingai analizuojami ir atitinka saugyklos statinės analizės taisykles                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | TypeScript kompiliavimas be klaidų (tik rekomendaciniai įspėjimai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Taip                                           |
| `typecheck:noimplicit:core`       | Griežtas `noImplicitAny` — orientuotas į ateitį; daugeliui anksčiau sukurtų iškvietimo vietų vis dar reikia anotacijų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **Rekomendacinis** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, apribotas `src/app/(dashboard)/**` sritimi (#7033) — `typecheck:core` kruopščiai atrinktame 27 failų leidžiamajame sąraše nėra jokio valdymo skydelio TSX failo, o `next build` taip pat niekada neatlieka jo tipų patikros (`next.config.mjs` nustato `ignoreBuildErrors: true`), todėl ten atsiradusios nebeegzistuojančių identifikatorių regresijos (#6625/#6909) CI sistemai buvo nematomos. Skirtumai tikrinami pagal fiksuotą kiekvieno failo ir TS kodo skaičiaus bazinę reikšmę (`config/quality/dashboard-typecheck-baseline.json`, taikant tą patį pasenusių įrašų kontrolės modelį kaip ir `check:known-symbols`) — patikra nepavyksta tik dėl NAUJŲ klaidų, viršijančių bazinį skaičių; ištaisius anksčiau buvusią klaidą, bazinę reikšmę sumažinkite naudodami `--update`.                                                                                                                                                                                                                                                        | Taip                                           |
| `check:build-typecheck`           | Viso programos produkcinės versijos tipų tikrinimas pagal `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), kurio neapima `typecheck:core` 27 failų leidžiamasis sąrašas ir dashboard vartai. Skirtumai lyginami su `config/quality/build-typecheck-baseline.json`; naujas arba padidėjęs skaičius pagal (failą, kodą) pažeidžia vartus, o mažesnis skaičius prašo jį sumažinti. `--update` atsisako veikti, jei vykdymo metu randama nauja arba padidėjusi pora, nebent perduodama `--force-regressions`, ir atsisako priimti naujai nutildytą failą, nebent perduodama `--force-nocheck`, todėl pradinės reikšmės išplėtimas, kad patikra būtų sėkminga, ir nuolatinio nutildymo suteikimas yra du atskiri sąmoningi veiksmai. Vien tik `--force` atmetama. Be to, kūrimo srityje ieškoma `@ts-nocheck` pagal `config/quality/ts-nocheck-baseline.json`, nes jį naudojantis failas apskritai nepateikia diagnostikos ir kitu atveju būtų nematomas visiems vartams.                                     | Taip                                           |

#### Dvi tipų tikrinimo programos pateikia skirtingus atsakymus

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) ir `check:build-typecheck` kompiliuoja skirtingas programas su skirtingomis
parinktimis, todėl tas pats failas vienoje gali būti tvarkingas, o kitoje turėti daugybę klaidų.

`tsconfig.build.json` nustato `"strict": false`, todėl `noImplicitAny` yra išjungta. Core
konfigūracija kompiliuoja kuruojamą 27 failų leidžiamąjį sąrašą su griežtesnėmis parinktimis ir
seka kiekvieno įrašo importų grafą, todėl failai, kurie niekada nepatenka į kūrimo programą,
vis tiek ten patikrinami.

Tai svarbu sprendžiant, ar failas yra tipiškai tvarkingas: **nulis diagnostikos pranešimų
vykdant `check:build-typecheck` nereiškia nulio**. Pašalinus `@ts-nocheck` iš 26
failų, paaiškėjo, kad 23 iš jų kūrimo programoje yra tvarkingi; šešiolikoje iš jų griežtoje
programoje išryškėjo apie 120 netiesiogiai nustatyto tipo `any` klaidų. Prieš teigdami, kad
failas yra tvarkingas, patikrinkite abi programas.

### Užduotis: `quality-gate`

Vykdoma po `test-coverage`. Nesėkmės atveju blokuoja sujungimą.

| Scenarijus                   | Tikrina                                                                                                                                                                     | Blokuojantis                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `quality:collect`            | Sugeneruoja `quality-metrics.json` („ESLint“ įspėjimų skaičių ir aprėptį iš sujungtos segmentų ataskaitos)                                                                  | Taip (prieš reketinę patikrą) |
| `quality:ratchet`            | Nė viena `quality-baseline.json` metrika nepablogėjo („ESLint“ įspėjimai ≤ bazinė reikšmė; aprėptis ≥ bazinė reikšmė)                                                       | Taip                          |
| `check:duplication`          | Kodo dubliavimas (jscpd@4) neviršija `quality-baseline.json` bazinės reikšmės                                                                                               | Taip                          |
| `check:complexity`           | Failo lygmens ciklomatinis sudėtingumas neviršija ribos (pagrindinės „ESLint“ taisyklės `complexity` ir `max-lines-per-function`)                                           | Taip                          |
| `check:cognitive-complexity` | Kognityvinio sudėtingumo reketinė patikra (`eslint-plugin-sonarjs`) — atskiras „ESLint“ vykdymas; CI abi patikras vykdo kartu viename `check:complexity-ratchets` žingsnyje | Taip                          |
| `check:dead-code`            | Nenaudojamų eksportų / failų reketinė patikra (knip) nepablogėjo, palyginti su bazine reikšme                                                                               | Taip                          |
| `check:compression-budget`   | Glaudinimo našumo testo biudžetas — kiekvieno variklio minimali sutaupytų prieigos raktų riba negali sumažėti                                                               | Taip                          |
| `check:type-coverage`        | Tipizuotos dalies procentinės reikšmės reketinė patikra (`type-coverage`) nepablogėjo; iš esmės apima `typecheck:noimplicit:core`                                           | Taip                          |

### Užduotys: `codeql-scan` ir `codeql-admission`

`codeql-scan` sukuria visas sukonfigūruotas analizės kategorijas. Sėkmingai pasibaigus šiai užduočiai, `codeql-admission` patikrina jos tikslius įkėlimus ir kandidato perspėjimų ratchet ribą. Abi yra privalomos `Gate / CI` priklausomybės, įskaitant kandidatus, keičiančius tik dokumentaciją. Administracinio aktyvinimo ir bandomojo paleidimo reikalavimai aprašyti toliau esančioje skiltyje „CodeQL ratchet“.

| Scenarijus             | Tikrina                                                                                                                                                                                                              | Blokuoja |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:codeql-ratchet` | Kandidato ref/SHA ir visos sukonfigūruotos analizės kategorijos turi būti aktualios prieš perspėjimų ratchet patikrą; trūkstant įrodymų blokuojama. Bendras inventorius lieka atskiras — žr. toliau „CodeQL ratchet“ | Taip     |

### Užduotis: `quality-extended`

Užduotis blokuoja taikomus kandidatus. Paketo dydis, aptiktos paslaptys, aptiktos
pažeidžiamos vietos, darbo eigų radiniai ir „OpenAPI“ pakeitimai tikrinami privalomomis
reketinėmis patikromis. Ciklinių priklausomybių diagnostika lieka rekomendacinė. Skaitytuvų
diegimas yra privalomas: `scripts/ci/install-quality-scanners.sh` įdiegia fiksuotas versijas
ir perduoda diegimo klaidas. Jei trūksta įrankių, ataskaitos netinkamos arba nėra bazinių
reikšmių, privalomo skaitytuvo patikros būsena lieka NEUŽBAIGTA.

| Scenarijus               | Tikrina                                                                                                                                                                                                                                                                                   | Blokavimas                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | Nėra ciklinių priklausomybių (dpdm)                                                                                                                                                                                                                                                       | **Rekomendacinis**                              |
| `check:bundle-size`      | Paketo dydis neviršija ribos; jei matavimas nepasiekiamas, patikra nepavyksta                                                                                                                                                                                                             | **Blokuojantis su --ratchet**                   |
| `check:secrets`          | Gitleaks aptiktų problemų skaičius nedidėja; privalomos patikros atmeta trūkstamus įrankius, šaltinį ar atskaitos tašką, nepavykusias patikras ir netinkamas ataskaitas                                                                                                                   | **Blokuojantis su --ratchet**                   |
| `check:vuln-ratchet`     | Priklausomybių pažeidžiamumų skaičius nedidėja; privalomos patikros atmeta trūkstamus įrankius, netinkamas ataskaitas ar trūkstamus atskaitos taškus                                                                                                                                      | **Blokuojantis su --ratchet**                   |
| `check:workflows`        | Darbo eigų statinė analizė (actionlint + zizmor); dėl trūkstamų ar neveikiančių skaitytuvų, netinkamų ataskaitų arba trūkstamo ratchet atskaitos taško patikra nepavyksta su būsena INCOMPLETE. Tinkami radiniai apdorojami pagal pasirinktą griežtą, rekomendacinę arba ratchet politiką | Vykdymas privalomas; zizmor ratchet blokuoja CI |
| `check:openapi-breaking` | Viešosios API sutarties patikra pagal susietus įvykio commit (PR merge-base, push before, merge-group base; suplanuoto ar rankinio vykdymo atveju pirmiausia paimamas checkout pirmasis pirminis commit); nepavykus privalomam matavimui, patikra blokuojama                              | **Blokuojantis su --ratchet**                   |

### Užduotis: `docs-sync-strict`

Ši užduotis vykdoma į `main` arba `release/**` nukreiptoms įtraukimo užklausoms tik tada, kai kandidatai nėra juodraščiai (arba yra iš patikimos eilės) ir yra priskirti dokumentacijos arba kodo pakeitimams. Ji taip pat vykdoma per CI įvykius, nesusijusius su PR; šios darbo eigos push paleidiklis apima tik `main`, o ne `release/**`. Žingsnis, kuris baigiasi nenuliniu išėjimo kodu, blokuoja užduotį; vien pranešami radiniai ir toliau dokumentuotos išimtys jos neblokuoja.

| Scenarijus                     | Tikrina                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokavimas                                                                                                                                            |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-užkarda, kuri paeiliui vykdo toliau nurodytas 7 papildomas užkardas                                                                                                                                                                                                                                                                                                                                                                                                                  | Taip                                                                                                                                                  |
| ↳ `check:docs-sync`            | Paketo, OpenAPI ir CHANGELOG versijų atitiktis, tikslios `llm.txt` veidrodinės kopijos, išversto CHANGELOG skyrių ir dydžio invariantai bei jau pakeistų pasikartojančių dokumentų nebuvimas                                                                                                                                                                                                                                                                                              | Taip                                                                                                                                                  |
| ↳ `check:docs-frontmatter`     | Sukompiliuoti dokumentacijos puslapiai turi tinkamas frontmatter antraštes                                                                                                                                                                                                                                                                                                                                                                                                                | Taip                                                                                                                                                  |
| ↳ `check:docs-counts`          | Didelio patikimumo skaičiavimo invariantai tikrinami griežtai; euristinės failų skaičiaus patikros tik įspėja, nebent scenarijui perduodama `--strict` parinktis (CI meta-užkarda jos neperduoda)                                                                                                                                                                                                                                                                                         | Griežtasis lygis blokuoja; švelnusis lygis yra rekomendacinis                                                                                         |
| ↳ `check:env-doc-sync`         | Aplinkos kintamųjų skaitymas pirminiame kode, `.env.example` ir `docs/reference/ENVIRONMENT.md` atitinka vienas kitą, pritaikius aiškius išimčių sąrašus ignoruojamiems, tik dokumentacijoje ir tik aplinkoje esantiems kintamiesiems                                                                                                                                                                                                                                                     | Taip, išskyrus dokumentuotuose išimčių sąrašuose nurodytus atvejus                                                                                    |
| ↳ `check:deprecated-versions`  | Praneša apie galimai pasenusias versijas už saugių istorinių kontekstų ribų ir pasenusias atnaujinimo datas, neįtraukiant ignoruojamų dokumentų                                                                                                                                                                                                                                                                                                                                           | Rekomendacinis pagal dabartinę CI konfigūraciją (`--strict` neperduodama)                                                                             |
| ↳ `check:doc-links`            | Vidinės markdown nuorodos dokumentacijoje nurodo esamus failus (`[text]`/`(path)` forma)                                                                                                                                                                                                                                                                                                                                                                                                  | Taip                                                                                                                                                  |
| ↳ `check:fabricated-docs`      | Dokumentacijoje nurodyti maršrutai, aplinkos kintamieji, CLI komandos, hook pavadinimai ir failų keliai egzistuoja kodo bazėje. Griežtas barjeras naudojant `--strict`; be šios vėliavėlės nesėkmė yra neblokuojanti.                                                                                                                                                                                                                                                                     | Taip (CI naudojant `--strict`)                                                                                                                        |
| `check:cli-i18n`               | CLI naudojami `t()` raktai yra `en`; `pt-BR` išsaugo visus aukščiausio lygio skyrius; `zh-CN` ir `zh-TW` turi visus `en` raktus                                                                                                                                                                                                                                                                                                                                                           | Taip                                                                                                                                                  |
| `check:openapi-coverage`       | OpenAPI specifikacija apima bent ratchet nustatytą minimalų tikrųjų maršrutų skaičių                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                                                                                                                                  |
| `check:openapi-security-tiers` | Deklaruotos `x-loopback-only`/`x-always-protected` anotacijos turi būti pagrįstos `routeGuard.ts`; analizatoriaus klaidos ir tiesioginės patikros neatitikimai blokuoja. Atvirkštinė patikra įspėja apie trūkstamą `x-loopback-only` po tik vietinei prieigai skirtais prefiksais, o vien šablonais apibrėžti maršrutai į šią atvirkštinę patikrą neįtraukiami.                                                                                                                           | Analizatoriaus ir tiesioginės patikros blokuoja; atvirkštinė patikra yra rekomendacinė                                                                |
| `check:openapi-routes`         | Kiekvienas `/api...` kelias faile `openapi.yaml` susiejamas su realiu maršrutu neatsižvelgiant į parametrų skirtumus, pritaikius pagrįstą `KNOWN_STALE_SPEC` išimčių sąrašą; pasenę išimčių sąrašo įrašai taip pat sukelia nesėkmę                                                                                                                                                                                                                                                        | Taip                                                                                                                                                  |
| `check:docs-symbols`           | Vidinės `/api/...` URL nuorodos kanoniniuose dokumentuose, kurie nėra veidrodinės kopijos, susiejamos su realiu maršrutu arba maršrutų šeima; tarpinio serverio, aukštesnio lygmens sistemos, vietaženklio ir failo nuorodos bei pagrįsti `KNOWN_STALE_DOC_REFS` įrašai neįtraukiami, o pasenę išimčių sąrašo įrašai sukelia nesėkmę                                                                                                                                                      | Taip                                                                                                                                                  |
| `i18n translation drift`       | Tikrina pagrindinių dokumentų šaltinio/tikslo maišos reikšmes ir vertimo kilmę. PR palyginimas leidžia tik visiškai vienodas paveldėtas klaidas; nauji arba nepatikrinti šaltinio, trūkstamo tikslo, tikslo maišos, pasenusio vertimo ar skyrių podėlio neatitikimai blokuoja. Už PR palyginimo ribų šaltinio/trūkstamo tikslo/tikslo maišos klaidos blokuoja, o pasenę vertimai ir nenuoseklūs skyrių podėliai lieka tik įspėjimai. Senojo formato skyrių podėlio nebuvimas nėra klaida. | Naujas/nepatikrintas PR nuokrypis blokuoja; visiškai vienodas paveldėtas nuokrypis yra tik įspėjimas; taisyklės už PR ribų priklauso nuo klaidos tipo |

Dvylika README SVG failų kataloge `docs/diagrams/` yra sugeneruoti (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` sugeneruoja juos visus iš naujo). Kiekvienas turi baitų palyginimo vieneto testą
(`tests/unit/docs/readme-*-svg.test.ts`, užduotis `test-unit`), kuris nepraeina, kai įrašytas failas yra pasenęs, o
`check:docs-counts` nuskaito kanoninius skaičius iš jų `<text>` mazgų — todėl kontūrų kūrimo žingsnis faile palieka kiekvieną kontūruotą eilutę kaip nematomą `<text>`. SVG kanoninių skaičių tikrinimas nuskaito failus, išvardytus
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, taip pat `public/images/tier-flow-dark.svg` ir `tier-flow-light.svg`;
teiginiams apie nemokamą naudojimą visam laikui, katalogo įrašą, pasikartojantį fondą ir vertinimo veiksnius taip pat nuskaitomi
`promise-pillars.svg`, `free-tier-budget.svg` ir `strategies-grid.svg`. `free-tier-budget.svg`
savo skaičius gauna iš aktyvaus katalogo įkėlimo programos, todėl pakeitus `FREE_MODEL_BUDGETS` arba teikėjo rodomą pavadinimą CI tampa raudonas, kol tas failas nesugeneruojamas iš naujo.

### Užduotis: `i18n-ui-coverage`

| Scenarijus                         | Tikrina                                                                                                                                                                                                                                | Blokuojantis     |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (vidinis) | UI i18n raktų aprėptis yra ≥ 65 %                                                                                                                                                                                                      | Taip             |
| `check-ui-value-drift` (vidinis)   | Perrašius anglišką **reikšmę**, nelieka pasenusio vertimo                                                                                                                                                                              | Taip             |
| `check-new-key-coverage` (vidinis) | **Naujas** angliškas raktas išverstas kiekvienoje lokalėje — žymeklis `__MISSING__:` atmetamas                                                                                                                                         | Taip             |
| `check-translation-ratio`          | Tikrų vertimų santykis kiekvienoje lokalėje (angliškam tekstui identiškos / vietaženklio / trūkstamos reikšmės, neįtrauktos į leidžiamųjų sąrašą) negali viršyti `config/quality/i18n-translation-baseline.json` + leistinos paklaidos | **Blokuojantis** |

Reikalingas `fetch-depth: 0` — reikšmių neatitikimų užkarda lygina `en.json` su sujungimo baze.

#### `check-ui-value-drift` — pasenusio vertimo vartai

Aptinka vieną i18n regresiją, kurios kitos užkardos dėl savo struktūros negali pastebėti: angliška reikšmė
perrašoma, o iš _ankstesnio_ angliško teksto sukurti vertimai paliekami, todėl
ne angliškai skaitantys naudotojai ir toliau mato užtikrintai suformuluotą, bet jau klaidingą tekstą.

Tai iš tiesų pateko į leidimą. `oauthModal.googleOAuthWarning` buvo perrašyta, kai buvo pridėtas „Antigravity“
prisijungimo pagalbininkas (#5203); **39 iš 43 lokalių** liko tekstas, nurodantis operatoriams „nukopijuoti
visą URL ir įklijuoti jį toliau“ — šio tiekėjo atveju taip proceso užbaigti neįmanoma. Tai liko
nepastebėta iki #8463, nes:

- `sync-ui-keys` užpildo tik **nesamus** raktus, bet niekada neatnaujina **pasenusių**;
- `check-ui-keys-coverage` skaičiuoja rakto _buvimą_, todėl pasenęs vertimas laikomas padengtu;
- `check-translation-drift` stebi `docs/i18n/<locale>/**.md` dokumentacijos kopijas —
  jis niekada neskaito `src/i18n/messages/*.json`. Užduotyje `docs-sync-strict` blokuoja nuo
  2026-09 pakartotinio sinchronizavimo: pakeitus pagrindinį dokumentą → `npm run i18n:run -- --files=<doc>` (skilties lygmens, nebrangu).

**Atsižvelgia į skirtumus, o ne į bazinę reikšmę.** Ji palygina sujungimo bazėje esantį `en.json` su
darbine kopija; kiekvieno rakto, kurio angliška reikšmė pasikeitė, lokalė, kurioje vis dar yra
nepakeistas vertimas, laikoma pasenusia. Taip sąmoningai **įšaldoma esama skola** — skirtumas
negali parodyti, iš kurios senos angliškos reikšmės atsirado seniai egzistuojantis vertimas, todėl užkarda vertina
tik tai, ką paliečia dabartinis pakeitimas. Alternatyvai (kiekvieno rakto maišos bazinei reikšmei) reikėtų
maždaug 600 KB sugeneruoto failo, 3 kartus didesnio už didžiausią esamą bazinės reikšmės failą, kuris keistųsi su kiekvienu i18n PR.

Yra du būdai patikrą įvykdyti sėkmingai:

1. atnaujinti paveiktus vertimus arba
2. nustatyti jų reikšmę į `__MISSING__:<new english>` — tada vykdymo aplinka pateikia pataisytą anglišką tekstą
   (`src/i18n/request.ts::deepMergeFallback`, #7258), o raktas įtraukiamas į vertimo eilę.

Jei pasikeitė eilutės **prasmė**, geriau **pervadinti raktą**: naujas raktas negali paveldėti
pasenusio vertimo. Toks šablonas naudotas #8463.

```bash
npm run i18n:check-value-drift          # griežtas režimas (jį vykdo CI)
npm run i18n:check-value-drift:warn     # tik pateikti ataskaitą
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Reikšmių nuokrypio ir naujų raktų patikros naudoja tą patį nekintamą palyginimą iš
`scripts/i18n/resolve-ui-diff-base.mjs`. Darbo eiga abiem patikroms perduoda tas pačias bazės, bazės viršūnės ir
kandidato SHA reikšmes. PR / bazės pakeitimo, „push“ ir sujungimo grupės vykdymai naudoja savo įvykio
kontekstą. Norint iškviesti kandidatinės šakos patikrą, būtina nurodyti tikslų jos atvirą PR arba aiškią
`i18n_base_sha` įvestį. Iškvietus arba pagal tvarkaraštį stebint `main` ar `release/vX.Y.Z`
be šios įvesties, paskutinis įsipareigojimas palyginamas su jo pirmuoju pirminiu įsipareigojimu; tai nėra
visos paveldėtos vertimų techninės skolos auditas. Vietiniam iškvietimui būtina aiškiai nurodyti palyginimo bazę,
pavyzdžiui, pirmiau pateiktoje `BASE_REF` komandoje.

Kai trūksta palyginimo konteksto arba jis dviprasmis, kai būtinas katalogas yra nenuskaitomas ar netinkamas arba
kai kandidatas pasikeičia, pateikiamas rezultatas `INCOMPLETE` su išėjimo kodu **2**, taip pat ir įspėjimo režimu.
Katalogai skaitomi naudojant `scripts/i18n/read-ui-catalog.mjs`; skaitymo klaidos nepakeičiamos
tuščiais objektais. Nei nepasiekiama bazė, nei neišsami įvestis nepatvirtina rezultato PASS.

### Darbas: `i18n`

Visa i18n patvirtinimo matrica (vienoje lokalėje viena užduotis). Visas darbas yra patariamasis.

| Scenarijus                      | Patvirtina                     | Blokavimas                                             |
| ------------------------------- | ------------------------------ | ------------------------------------------------------ |
| `validate_translation.py quick` | Vertimo išsamumas pagal lokalę | **Patariamoji** (`continue-on-error: true` visą darbą) |

### Darbas: `pr-test-policy`

Veikia tik pagal ištraukimo užklausas.

| Scenarijus             | Patvirtina                                                                                                                         | Blokavimas |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs, kurie keičia gamybos kodą `src/`, `open-sse/`, `electron/` arba `bin/` turi apimti arba atnaujinti testus (kieta taisyklė #8) | Taip       |
| `check:test-masking`   | Pakeisti bandomieji failai nesumažina grynojo pareiškimų skaičiaus ir neprideda `assert.ok(true)` tautologijos                     | Taip       |
| `check:pr-evidence`    | PR body cituoja test/VPS pakeitimo įrodymus (mechanizuoja Hard Rule #18 grepping PR prose — fragile, žr. Atsilikimas)              | Taip       |

### Užduotis: `test-vitest`

Reikalinga `changes` klasifikavimo užduotis. Taikomos matricos dalys nesėkmės atveju blokuoja sujungimą.

| Rinkinys         | Tikrina                                                        | Blokuojantis                                                                                                          |
| ---------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serverį (110 įrankių), autoCombo, podėlį — vitest vykdyklė | Taip                                                                                                                  |
| `test:vitest:ui` | UI komponentų testus — vitest vykdyklė                         | **Blokuojantis** — esamos triktys aiškiai neįtrauktos faile `vitest.config.ts`; dėl naujų trikčių užduotis nepavyksta |

### Naktinės darbo eigos (suplanuotos, konsultacinės)

Jie veikia pagal cron tvarkaraštį (ir `workflow_dispatch`), niekada ne pagal PRs. Visi yra patariamieji.

| Darbo eiga             | Tikrina                                                                                                                                                                                             | Blokuojanti       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `nightly-property`     | fast-check savybių testus su atsitiktine pradine reikšme ir dideliu vykdymų skaičiumi                                                                                                               | **Rekomendacinė** |
| `nightly-resilience`   | atminties krūvos augimo ribą, chaoso trikčių įterpimą, k6 apkrovos / ilgalaikės apkrovos testus                                                                                                     | **Rekomendacinė** |
| `nightly-llm-security` | promptfoo įterpimo apsaugą (blokavimo režimu) ir garak patikras (praleidžiamos be teikėjo slaptosios reikšmės)                                                                                      | **Rekomendacinė** |
| `nightly-schemathesis` | OpenAPI sutarties neapibrėžtųjų įvesčių testavimą (schemathesis) veikiančioje OmniRoute naudojant `docs/openapi.yaml` — aptinka specifikacijos pažeidimus / neapdorotas 500 klaidas (8 etapas, B.4) | **Rekomendacinė** |
| `nightly-mutation`     | Stryker mutacinio testavimo įvertį greitojoje modulių testų sekoje — išlikę mutantai atskleidžia silpnus teiginius                                                                                  | **Rekomendacinė** |
| `nightly-compat`       | Node variklio suderinamumo matricą visuose palaikomuose `engines.node` diapazonuose                                                                                                                 | **Rekomendacinė** |

Našumo baziniai rodikliai (atminties krūva, TTFB, komponavimo laikas) registruojami, tačiau pagal juos neblokuojama: žr. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Spartaus vystymo etapas (2026-08-30 → v4.0 LTS): visos bazinės ribos sušvelnintos 20 %

Savininko sprendimas (2026-08-30): iki v4.0 modularizavimo išleidimo sparta yra svarbesnė
už techninės skolos ribojimą. Visos **skaitinės** reketo bazinės ribos buvo sušvelnintos 20 %
vienu audituojamu veiksmu, o etapas deklaruotas faile `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Kas pakeista                                                                                                                                                                                                                      | Kur                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — rodikliai, kuriems mažiau yra geriau, ×1,2, o procentai, kuriems daugiau yra geriau, ÷1,2 (palikta 60 aprėpties apatinė riba, `eslintErrors` lieka 0, `eslintWarnings` 0 → 20 % fiksuoto slopinimų skaičiaus) | `quality-baseline.json` (`_relax_velocity_2026_08_30` pastaboje išvardytos visos ankstesnės → naujos reikšmės) |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                                  | `complexity-baseline.json`, `duplication-baseline.json`                                                        |
| `cap`, `testCap`, kiekviena `frozen[*]` / `testFrozen[*]` eilučių riba ×1,2                                                                                                                                                       | `file-size-baseline.json`                                                                                      |
| kiekvieno failo / kiekvieno TS kodo skaičiai ×1,2                                                                                                                                                                                 | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`         |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                               | `scripts/check/check-openapi-coverage.mjs`                                                                     |
| `--require-tighten` tampa rekomendacinis, kai `_policy.requireTighten === false`                                                                                                                                                  | `scripts/quality/check-quality-ratchet.mjs`                                                                    |
| naktinis `bank-ratchet-shrinks` pristabdomas (jis užfiksuotų išmatuotą sumažėjimą ir panaikintų rezervą)                                                                                                                          | `.github/workflows/nightly-release-green.yml`                                                                  |

Leidžiamųjų sąrašai (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nėra** biudžetai ir nebuvo keičiami. Praėjimo / nepraėjimo strategijos vartai (paslaptys, SQL taisyklės,
dokumentacijos / aplinkos sutartis, i18n atitiktis, vienetų testai) nepasikeitė — nepraėjęs testas tebėra nepraėjęs testas.

**Įrankiai**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — vienkartinis
  sušvelninimas (`scripts/quality/relax-baselines.mjs`); atsisako vykdyti antrą kartą su ta pačia
  pastaba.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  išmatuoja kiekvieną skaitinį vartą taip pat, kaip CI, ir išveda kiekvieno varto likusį rezervą
  (`scripts/quality/baseline-headroom.mjs`). Naktinė `baseline-headroom` užduotis paskelbia
  lentelę darbo eigos vykdymo suvestinėje ir įkelia jos JSON / Markdown ataskaitą kaip
  `baseline-headroom-<run_id>`, saugomą 90 dienų. Įspėjamosios ir kritinės eilutės nurodo vartus,
  kuriems iki ribos liko ne daugiau kaip 10 %, arba vartus, kurie ją jau viršijo. Peržiūrėkite šias
  ataskaitas kaip išankstinį įspėjimą apie eikvojamus biudžetus; patikrinkite atitinkamo varto
  `_rebaseline_*` pastabas. Užduotis nebekuria ir nebeatnaujina nuolatinės problemos; #12149
  išsaugo ankstesnių ataskaitų istoriją.

**Naujo kodo režimas (Clean-as-You-Code) — nuo 2026-08-30, tik spartusis PR kelias**

Per `pull_request` įvykius `quality.yml` perduoda `--base-ref <PR base SHA>` komandoms `check:file-size`,
`check:complexity-ratchets` ir `check:dead-code`. Vykdant `check:complexity-ratchets` ir
`check:dead-code`, vartas palygina HEAD su sujungimo baze, **apsiribodamas tik PR pakeistais failais**
(`scripts/check/newCodeMode.mjs`: sujungimo bazė realizuojama laikiname `git worktree`,
ESLint / knip paleidžiami ten ir HEAD versijoje, tada palyginami kiekvieno failo skaičiai):

- **blokuojama** — PR pridėjo ciklomatinio / kognityvinio sudėtingumo pažeidimų arba nenaudojamų eksportų pakeistuose failuose
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` žurnale);
- **patariamoji** — bendroji visuotinė suma, palyginti su užfiksuota bazine reikšme. Paveldėtas nuokrypis niekada
  nepažymi nekalto PR raudonai; nuokrypis registruojamas, kad būtų ištaisytas derinant leidimą, ir stebimas
  rezervinės talpos užduoties.

`check:file-size` bazinę nuorodą naudoja pagal savo taisykles (`scripts/check/check-file-size.mjs`, #8522):
jis patikrina kiekvieną pirminio kodo ir testų failą medyje, naudodamas `git show` perskaito kiekvieno jų
eilučių skaičių PR bazėje ir pažymi failą kaip nepraėjusį tik tada, kai jis išauga virš didesnės iš šių
reikšmių: jo bazinės viršutinės ribos (`frozen` / `testFrozen` arba `cap` / `testCap`, jei failo nėra
bazinėje konfigūracijoje) ir jo dydžio bazėje. Todėl failas, kuris jau buvo nukrypęs bazėje, niekada
nepadaro niekuo dėto PR nepraėjusio.

`check:boundary:ratchet` tą pačią taisyklę taiko savo vieninteliam skaičiui
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR įvykių metu tiek
`quality.yml` greitosios patikros, tiek `ci.yml` lint užduotis perduoda PR bazės SHA, bazinis
įsipareigojimas išmatuojamas iš `git archive` eksporto, o PR laikomas nesėkmingu tik tada, kai jo
`open-sse → src` briaunų skaičius viršija didesnę iš šių reikšmių: `metrics.boundaryOpenSseToSrc`
arba bazės skaičių. Apie bazės nuokrypį virš ribos pranešama (`base drift herdado`), tačiau dėl jo
nekaltas PR niekada nepažymimas kaip nesėkmingas; push → main išlaiko absoliučią ribą, o jei bazės
SHA nepavyksta nustatyti, pateikus įspėjimą grįžtama prie absoliučios ribos.

`workflow_dispatch` paleidimai, leidimo žalios būsenos patikra ir naktinė rezervo užduotis neturi PR
bazės, todėl išlaiko absoliutųjį (visuotinį) palyginimą. Aprėptis, dubliavimas ir tipų aprėptis kol
kas lieka visuotinės (jų įrankiai negali nebrangiai sugeneruoti kiekvieno failo skirtumo) — ateityje
joms galima taikyti tą patį metodą.

**Etapo užbaigimas ties v4.0 (LTS = griežčiau nei anksčiau, o ne „grįžimas į įprastą būseną“)**

1. Grynoje `release/v4.0.0` viršūnėje: įrašui paleiskite `npm run quality:headroom --json`, tada
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` ir kiekvienos tipų tikrinimo
   patikros `--update` — kiekviena bazinė reikšmė sumažinama iki išmatuotos reikšmės.
2. Pašalinkite `_policy` iš `quality-baseline.json` (taip vėl įjungiami `--require-tighten` ir
   naktinis rezervo kaupimas), atkurkite `THRESHOLD = 36` (ar didesnę reikšmę) faile
   `check-openapi-coverage.mjs`.
3. Ten, kur modularizavimas davė naudos, sugriežtinkite ribas labiau nei išmatuota: failo dydžio
   `cap` grąžinkite į 1000 (arba 800), aprėpties apatines ribas padidinkite 5, o modularizuotų
   paketų nenaudojamų eksportų skaičių nustatykite į 0.

## Reketo bazinė reikšmė (`quality-baseline.json`)

Reketo variklis (`scripts/quality/check-quality-ratchet.mjs`) nuskaito `quality-baseline.json`
ir palygina jį su naujai surinktu `quality-metrics.json`. Jei kuris nors rodiklis pablogėja
daugiau nei leidžiama jo epsilon reikšmė, komponavimas laikomas nesėkmingu.

Šiuo metu stebimi rodikliai:

| Rodiklis              | Kryptis | Reikšmė                                |
| --------------------- | ------- | -------------------------------------- |
| `eslintWarnings`      | `down`  | ESLint įspėjimų skaičius neturi didėti |
| `coverage.statements` | `up`    | Sakinių aprėptis neturi mažėti         |
| `coverage.lines`      | `up`    | Eilučių aprėptis neturi mažėti         |
| `coverage.functions`  | `up`    | Funkcijų aprėptis neturi mažėti        |
| `coverage.branches`   | `up`    | Šakų aprėptis neturi mažėti            |

Norėdami atnaujinti bazinę reikšmę po realaus pagerėjimo:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Žyma `--update` įrašo dabartines išmatuotas reikšmes į `quality-baseline.json`.
Įtraukite šį failą į tą patį pakeitimų įrašą kaip ir rodiklį pagerinusį pakeitimą. PR, kuris pagerina
rodiklį neatnaujindamas bazinės reikšmės, bus aptiktas naudojant `--require-tighten` (6A.5 etapas,
įgyvendinimas dar laukiamas).

### CodeQL reketas: kandidatų priėmimas ir saugyklos inventorius

CI priklauso kandidato CodeQL priėmimas per aiškią priklausomybės grandinę: `codeql-scan` iškviečia keturių kalbų matricą `codeql.yml`, tada `codeql-admission` vykdo `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` reikia abiejų rezultatų. Kokybė išlaiko savo skaitmeninius patikrinimus, bet neužklausia skaitytuvo, kol gamintojas nebaigia; Vien `Gate / Quality` nėra visiškas kandidatų priėmimas. CodeQL tebėra reikalingas kandidatams tik su dokumentais.

Pagal `config/quality/codeql-admission-policy.json` politiką pasirenkami veiksmai, C/C++, JavaScript/TypeScript ir Python, užklausų rinkinio numatytasis nustatymas, nuotolinės grėsmės modelis ir kūrimo režimas nėra. Gamintojas atmeta laukiantį aktyvinimo įrašą ir atsiskiria už aiškaus tikslinio sąrašo ribų. Dabartiniai tikslai yra pagrindiniai, o release/v3.8.54. sutarties testai lygina šį baigtinį sąrašą ir priežiūros paleidimo aktyviklį su paketo versija; reikia peržiūrėti kitą leidimą. Esamas CI platesnės laidos PR aktyviklis išlaikomas, tačiau neįtrauktas tikslas praneša apie HOLD prieš ištraukimą, o ne gaunant neišmatuotą PASS.

Kiekviena matricos užduotis įrašo faktinį SARIF įkėlimą ID, kalbą, kategoriją, paleidimą ir bandymą, skambinančiojo darbo eigos tapatybę, įvykio ref/head/base/merge SHA ir politikos maišą. Priklausoma užduotis atsisiunčia tik šio vykdymo kvitus ir patvirtina artefaktų santraukas. Tam reikalingos visos keturios kategorijos, sėkmingas gamintojas ir baigtas kiekvieno tikslaus įkėlimo apdorojimas. Jis naudoja API sarif_id filtrą, o ne naujausią šakoje rastą analizę. Dalinis kartojimas gali pakartotinai panaudoti sėkmingas kategorijas iš ankstesnio to paties paleidimo ir kandidato bandymo, išsaugant bandymą sukurti; žlugus dabartinis gamintojas negali pakartotinai panaudoti ankstesnių žaliųjų įrodymų.

CodeQL veiksmas laukia, kol bus apdorotas, bet prisegtas jo įgyvendinimas gali įspėti ir tęsti po būsenos nuskaitymo trikties arba išnaudojus laukimą. Todėl priėmimas vėl patvirtina apdorojimą. Trūksta kategorijų, laukiamas apdorojimas, nepavykusios arba atšauktos užduotys, pasenusi tapatybė, nebaigtas puslapių rūšiavimas arba nepasiekiamas APIs sukuria HOLD ir išeina 2. Nelieka fiksuoto laukimo, kol nepriklausoma skaitytuvo darbo eiga. Nenuskaitytas PR negali praeiti, nes įspėjimo užklausa grąžino 0. Išmatuotas skaičius viršija `metrics.codeqlAlerts.value` išeina 1; bazinė linija nėra padidinta, kad būtų galima absorbuoti kito filialo įspėjimus. [Įkėlimo būsenos ir analizės paieška](https://docs.github.com/en/rest/code-scanning/code-scanning).

Kvitas įrašo įkėlimą ir analizę IDs, kategorijas, įrankių versijas, ref/SHA, bazinius ir įspėjimų numerius. SARIF identity/result skaičius, minimalus taisyklių skaičius ir tikslūs įspėjimų atvejai išlieka privalomi. Prieš priimant, PR/analysis tapatybės patikrinamos dar kartą. Šios patikros nustato sukonfigūruotą kategorijos aprėptį, o ne kiekvieno ištraukto šaltinio failo inventorių. C/C++ ištraukimas be kūrimo neapima kodo, sugeneruoto projekto kūrimo metu. Šaltinių išskyrimus vis dar reikia peržiūrėti, o bendraautorių priskyrimui reikia palyginamų tikslių įrodymų.

`codeql-maintenance.yml` teikia aktyvaus išleidimo tiesioginius nuskaitymus ir savaitės tvarkaraštį nedubliuodamas PR/main gamintojų. `nightly-codeql-inventory.yml` saugo visos saugyklos bazinę liniją atskirai, su `--strict-measurement` ir gedimu, kai matavimas nepasiekiamas. Vietinio palikimo kolekcionieriaus grakštus praleidimas nėra kandidatas į priėmimą. Priveržimas išlieka aiškus `--update` po patikrinto mažesnio visuotinio skaičiaus.

Išplėstinė darbo eiga negali būti paskelbta, kol sukonfigūruota numatytoji sąranka: GitHub atmeta šį derinį. Jos versijos politika lieka laukiama, kol bus perskaitytas peržiūrėtas administracinis perėjimas. Prieš paskelbdamas operatorius prisega saugyklą, head/base/tree, policy/patch/rollback maišą ir stebimą sąrankos būseną; `node scripts/quality/codeql-producer.mjs verify-admin-readback` tikrina pateiktus numatomus ir faktinius JSON įrašus. Tai techninė apsauga, o ne operatoriaus patvirtinimas ar pakaitalas, skirtas gauti naujus skaitymus. PR prieigos raktas niekada neprašo administravimo prieigos. Išleidimui ir bet kokiems skaitytuvo pakeitimams reikalingas atskiras skaitymas ir tikri PR, šakutės ir sujungimo grupės suderinamumo įrodymai.

„Forks“ naudoja priglobtus bėgikus, atsiskaitymą be nuolatinių kredencialų, jokio projekto install/build gamintojo ir jokių paveldėtų saugyklos paslapčių. GitHub palaiko „pull_request“ įvykio SARIF įkėlimą su sumažintu šakutės prieigos raktu; Pirmą kartą įnašo vykdymo patvirtinimas išlieka GitHub politika. Niekada nenaudokite pull_request_target, kad vykdytumėte nepatikimą kodą. Prieš manydami, kad perkėlimas baigtas, patvirtinkite faktinius prieigos rakto leidimus, analizės_raktą ir visas kategorijų aplinkas valdomoje kanarėje. [Šakės įkėlimo taisyklės](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [prieštaraujantys sąrankos režimai](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Atleidimas iš darbo yra operatoriaus skambutis (kieta taisyklė #14)** — niekada neatmeta CodeQL įspėjimo neįrašydamas techninio pagrindimo atmetimo komentare: `won't fix` prieš srovę taikomo protokolo reikalavimui, `used in tests` bandymo įtaisui, `false positive` dezinfekavimo priemonei, CodeQL nemato (precedentas: `docs/security/ERROR_SANITIZATION.md`).

---

## Testų pakartojimo politika (WS5.4, v3.8.49)

Pakartojimo politika nustatoma kiekvienai vykdymo priemonei atskirai ir niekada netaikoma visuotinai — visuotinis pakartojimas tikras regresijas paverčia nematomais nestabiliais testais:

| Vykdymo priemonė | Politika                                                                                                                                                  | Kodėl                                                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` tik CI aplinkoje, su `trace: on-first-retry`                                                                                                 | Naršyklės / tinklo laiko parinkimas iš tiesų yra nedeterministinis; vienas pakartojimas su trasavimu nestabilų testą paverčia diagnozuojamu artefaktu |
| Vitest           | JOKIO visuotinio pakartojimo. Patvirtintai nestabiliam testui aiškiai nustatomas individualus pakartojimas (matomas pakeitimų skirtume ir peržiūrimas PR) | Taip karantino sąrašas lieka repozitorijoje ir niekada nebūna nepermatomas                                                                            |
| node:test (unit) | JOKIO pakartojimo, niekada                                                                                                                                | Nestabilus vienetinis testas yra testo klaida — ją ištaisykite, o ne bandykite dar kartą                                                              |

Tiksliniai SLO, kai bus įdiegta nestabilumo telemetrija (WS5.2/5.3): <1 % nestabilumo dažnis vienam testui
(„taisyti dabar“ slenkstis), ≥95 % sėkmingo vykdymo dažnis vienam konvejeriui. Tai pramonės orientacinės vertės —
jas reikia iš naujo sukalibruoti pagal mūsų pačių matavimus.

## Leidimo lygmens kartelės nuokrypis (WS5.5, v3.8.49)

Kai kartelė (failo dydžio, sudėtingumo, eslint įspėjimų) regresuoja GRYNAME leidimo
viršūnės taške, t. y. ją pablogino SUJUNGTŲ pakeitimų VISUMA, o nė vienas atskiras PR
savo šakoje regresijos neatkuria, pataisą turi atlikti **leidimo vadovas, vieną kartą,
leidimo šakoje**: pirmenybę teikite išskyrimui / pertvarkymui; bazinę reikšmę iš naujo
nustatykite tik pateikę dokumentuotą pagrindimo įrašą. Niekada neperkelkite kombinacinio
nuokrypio į pakeitimo autoriaus PR ir niekada iš naujo nenustatykite bazinės reikšmės
kiekvienam PR (tai paslepia tikras regresijas). Pirmiausia atskirkite priežastį: prieš
manydami, kad ją sukėlė jūsų PR, atkurkite nesėkmę pagal gryną viršūnės tašką
bandomajame worktree.

## Kartelės sumažinimų užfiksavimas — mažėjimo kryptis (#8584)

Kartelė automatizuota tik iš dalies, ir būtent netinkama jos dalis. Viršutinės ribos
**didinimas** yra rankinis JSON redagavimas, trunkantis dešimt sekundžių ir greičiausiai
atblokuojantis nesėkmingą PR. Norint ją **sumažinti**, kas nors turi paleisti `--update`
ir įtraukti rezultatą į commit — o iki užduoties `bank-ratchet-shrinks` įdiegimo jokia
darbo eiga to nedarė. Išmatuotos pasekmės (2026-07-25): 18 fiksuotų failų jau neviršijo
naujiems failams taikomos 800 eilučių ribos, o blogiausias neatitikimas siekė 132×
(`src/shared/validation/schemas.ts`, 19 eilučių su 2,523 riba); sudėtingumo viršutinė
riba per maždaug 37 bazinės reikšmės atnaujinimo pastabas pakilo `1794 → 2169`, o
sumažėjo tiksliai vieną kartą (−1); be to, „kitame cikle sugriežtinti naudojant
`--update`“ buvo parašyta 31 kartą, bet įvykdyta vieną kartą. Riba, išliekanti ilgiau
nei ją nulėmęs kodas, kiekvieną užbaigtą išskaidymą tyliai paverčia augimo leidimu tam,
kas failą redaguos vėliau.

`nightly-release-green.yml` → užduotis **`bank-ratchet-shrinks`** uždaro šį ciklą:

|             |                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| Paleidžiama | pagal `schedule` (3× per dieną) + `workflow_dispatch` — sąmoningai **ne** pagal `push`                           |
| Matuoja     | aukščiausią `release/vX.Y.Z`, naudodama tokią pačią skyrą ir įterpimo apsaugą kaip `release-green`               |
| Įrašo       | `check:file-size --update` ir `check:complexity-ratchets --update` (abu dėl savo konstrukcijos gali tik mažinti) |
| Patikrina   | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                         |
| Pateikia    | vieną visada aktualų PR į leidimo šaką — priverstinai atnaujinamą, niekada nekuriantį perteklinių PR             |

Sumažinimai fiksuojami paketais, o ne po kiekvieno push, nes tam nėra delsos reikalavimo
(pakanka sumažinimą užfiksuoti per 8 val.), o vykdant po kiekvieno sujungimo PR šaka būtų
pakartotinai kuriama per sujungimo kampanijas ir kiekvieną kartą reikėtų vykdyti visą
ESLint patikrą. Aptikimas ir toliau vykdomas per push (`release-green`); paketais
atliekamas tik fiksavimas.

### Saugos tikrintuvas

Užduotis bazines reikšmes keičia be priežiūros, todėl būtent `verify-ratchet-bank.mjs`
užtikrina, kad tai būtų priimtina. Jis palygina medį po `--update` su `HEAD` ir
**nutraukia užduotį dar prieš sukuriant bet kokį commit** — neatverdamas jokio PR —
nebent kiekvienas pakeitimas yra vienas iš šių:

- `frozen` / `testFrozen` skaitinė reikšmė **sumažinta** arba **pašalinta**
- `complexity-baseline.json` → `count` **sumažinta**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **sumažinta**

Visa kita laikoma nesėkme: skaičiaus didinimas, įrašo pridėjimas, `cap` / `testCap`
keitimas arba `_rebaseline_*` pastabos ištrynimas / perrašymas (šios pastabos yra audito
seka, paaiškinanti kiekvienos viršutinės ribos priežastį, ir saugomos tame pačiame
`frozen` objekte kaip failų įrašai). Robotas, galintis padidinti ribą, būtų akivaizdžiai
blogesnis už esamą padėtį. Regresijos apsauga: `tests/unit/verify-ratchet-bank.test.ts`.

Užduotis niekada nevykdo push į `release/*` — PR sujungia žmogus, todėl klaidingas
matavimas negali būti įtrauktas be peržiūros.

## Leidžiamųjų sąrašų politika

Kiekviena patikra, kuri negali nepavykti dėl jau egzistuojančių pažeidimų, naudoja užfiksuotą leidžiamųjų sąrašą
(pvz., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Taikoma ši politika:

**Pašalinkite pagrindinę priežastį; leidžiamųjų sąrašą naudokite tik tada, kai pažeidimas jau egzistavo ir
jo negalima ištaisyti tame pačiame PR.**

Pridėdami įrašą į leidžiamųjų sąrašą:

1. Įtraukite komentarą su pagrindimu.
2. Pateikite nuorodą į sekimo užduotį (pvz., `// #3498 — Phase 2 feature, not yet implemented`).
3. Pašalinkite įrašą tame pačiame PR, kuriame ištaisomas pažeidimas — pasenęs įrašas, kuris daugiau
   nebeslopina aktyvaus pažeidimo, pats savaime yra defektas (įgyvendinus 6A.3 pasenusių taisyklių kontrolę,
   patikra nepavyks dėl niekur nenaudojamo leidžiamųjų sąrašo įrašo).

**Nepridėkite** įrašų į leidžiamųjų sąrašą vien tam, kad testai būtų išlaikyti greičiau. Sėkminga patikra su augančiu
leidžiamųjų sąrašu sukuria klaidingą kokybės įspūdį.

### Kai jūsų PR patikra nepavyksta

1. **Atidžiai perskaitykite patikros išvestį** — joje tiksliai nurodoma, kuris failas ar simbolis
   pažeidė taisyklę.
2. **Ištaisykite pažeidimą** — dauguma patikrų yra deterministinės failų sistemos patikros, kurios tampa sėkmingos, kai tik
   kodas ištaisomas.
3. **Jei pažeidimas jau egzistavo** (t. y. jo neįvedėte jūs, tačiau dabar jis patenka į
   patikros aprėptį): pridėkite leidžiamųjų sąrašo įrašą su pagrindimo komentaru ir sekimo užduotimi.
4. **Jei patikra yra slenkstinė** (aprėptis, ESLint įspėjimai, dubliavimas, sudėtingumas):
   dėl jūsų pakeitimo rodiklis pablogėjo. Ištaisykite pagrindinę problemą arba (retais atvejais) paleiskite
   `npm run quality:ratchet -- --update`, jei pakeitimas yra sąmoningas ir rodiklio
   pablogėjimas priimtinas, tačiau PR apraše paaiškinkite kodėl.
5. **Patariamosios patikros** (`continue-on-error: true`) yra informacinės — jos neblokuoja
   sujungimo, tačiau rodomos CI suvestinėje. Vis tiek jas ištaisykite.

---

## Naujos patikros pridėjimas

1. Sukurkite `scripts/check/check-<name>.mjs` (arba `.ts`). Politiką tikrinančios patikros baigiamos kodu 0/1.
   Slenkstinės patikros perduoda metriką į `quality-metrics.json` per `collect-metrics.mjs`.
2. Įtraukite `"check:<name>": "node scripts/check/check-<name>.mjs"` į `package.json` ir
   sinchronizuokite pseudonimą bei tikslią jo komandą faile `config/quality/gate-manifest.json`.
   Taip pat sinchronizuokite keisdami arba pašalindami esamą tikrinimo pseudonimą.
   Paleiskite `npm run check:gate-manifest`; šios sutarties laikymąsi užtikrina „pre-commit“ kabliukas ir CI pakeitimų klasifikavimas.
3. Prijunkite ją `.github/workflows/ci.yml` faile prie tinkamos užduoties
   (politika → `lint` arba `docs-sync-strict`; slenkstinė patikra → `quality-gate`).
4. Jei ji turi leidžiamųjų sąrašą, pritaikykite `reportStaleEntries()` iš
   `scripts/check/lib/allowlist.mjs`, kad pasenę įrašai būtų aptinkami automatiškai.
5. Parašykite testą kataloge `tests/unit/build/`, apimantį patikros aptikimo logiką.
6. Atnaujinkite šį dokumentą (pridėkite eilutę į atitinkamos užduoties lentelę).

---

## Agentų įrankiai: LSP cikle (pasirenkama)

Be CI patikrų, „OmniRoute“ pateikia **pasirenkamą** `agent-lsp` karkasą
(projekto lygmens `.mcp.json`, 7 etapas, 15 užduotis). Sukurkite `.mcp.json`,
kad programavimo agentams būtų pasiekiamas TypeScript kalbos serveris ir jie galėtų išspręsti simbolių /
diagnostikos problemas **prieš** rašydami kodą — tai kompiliavimo prieš teiginį papildinys
`typecheck:core` patikrai, pašalinantis „išgalvotų simbolių“ klaidas jų atsiradimo vietoje. Jis sąmoningai
neįkeliamas automatiškai (MCP↔LSP tarpinį sprendimą pasirenkate ir patikrinate patys); netinkamas įrašas tik užregistruoja
prisijungimo klaidą ir niekada nenutraukia seansų.

---

## Racionalizavimo darbų sąrašas (ROI peržiūra — 9 etapas, 3 banga)

Šis inventorius buvo suderintas su `ci.yml` 2026-06-17 (ankstesnėje versijoje nebuvo
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Suderinto rinkinio ROI peržiūra
nustatė toliau nurodytus racionalizavimo kandidatus. **Sujungimai yra mechaniniai CI
pakeitimai; perjungimai ir atsisakymai yra operatoriui palikti politikos sprendimai.** Niekas iš toliau
nurodytų pakeitimų dar nepritaikyta.

**Taip pat neaprašyta aukščiau** (patariamoji, menko signalo): užduotis `docs-lint` (markdownlint + Vale, visa užduotis su `continue-on-error`) ir atskiros skenerių darbo eigos `semgrep.yml` / `scorecard.yml`. CodeQL dabar turi privalomas gamintojo ir priėmimo užduotis po `Gate / CI`, laikantis aukščiau aprašytų aktyvinimo reikalavimų. `semgrepFindings: 0` yra faile `quality-baseline.json`, tačiau faile `ci.yml` nesusietas su blokuojančiu ratchet — metrika šiuo metu nesusieta.

### Sujungimas / dubliavimo šalinimas (mechaniniai pakeitimai, mažesnė rizika)

Kiekvienas kandidatas buvo patikrintas pagal faktinę patikrų būseną 2026-06-17 (pasitikėk, bet tikrink);
paaiškėjo, kad keli „akivaizdūs“ sujungimai slepia techninę skolą ir **nėra** tiesiogiai pritaikomi pakaitalai.

- **`check:docs-sync` vykdoma du kartus** — atskirai `lint` užduotyje ir dar kartą `check:docs-all` (`docs-sync-strict`) bei husky prieš patvirtinimą vykdomame kabliuke. ✅ **ATLIKTA** — atskiras iškvietimas iš `lint` pašalintas.
- **CVE nuskaitymas** — ❌ **NEGALIMA paprastai sujungti.** `audit:deps` blokuoja kritinius saugos įspėjimus ir nebaigtus auditus visuose penkiuose užraktų failuose, o pagal dabartinę politiką apie aukšto lygio įspėjimus praneša kaip apie perspėjimus; `check:vuln-ratchet` (osv) nesėkmingai baigiasi tik esant _regresijai_, palyginti su saugykloje užfiksuota bazine reikšme, ir atmeta trūkstamus matavimus, kai jie privalomi. Semantika skiriasi — atsisakius `audit:deps` būtų prarasta absoliuti kritinio lygio patikra ir nepriklausomi paketų audito rezultatai. Palikti abu.
- **Ciklų aptikimas** — ✅ **ATLIKTA** (#15159 G-01/G-02). Ankstesniame tekste `check:cycles` buvo vadinama „žalia, kuruojama“ patikra ir jos blokavimas buvo grindžiamas tuo, kad `check:circular-deps` (dpdm) pranešė apie 91 ciklą. Tas žalias rezultatas buvo **klaidingai žalias**: `check:cycles` nuskaitydavo 5 poaplankius (450 failų), atpažindavo tik statinius `import|export … from` ir atmesdavo kiekvieną `@/` bei `@omniroute/open-sse/` specifikatorių, todėl negalėjo aptikti dinaminių importų ir pseudonimų ciklų, kurie dominavo saugykloje. Ištaisyta: dabar patikra pereina per `src` + `open-sse` (5023 failus), renka specifikatorius iš TypeScript AST (todėl `import("…")` įskaičiuojamas, o tipo pozicijoje esantis `typeof import("…")` — ne) ir išsprendžia tsconfig `paths`. Ji aptinka **14** ciklų, o ne 0. Kadangi 14 anksčiau egzistavusių ciklų negalima ištaisyti patikrų PR, `check:cycles` dabar yra **regresijos slenkstis** (`--ratchet`, viršutinė riba `metrics.cycles.value = 14` faile `quality-baseline.json`, `direction: down`) — jis blokuoja bet kokią _regresiją_, o ciklų skaičius gali tik mažėti. CI vykdo `npm run check:cycles:ratchet`. Mažinimo darbai vykdomi kartu su **A-01**. `check:circular-deps` (dpdm) lieka rekomendacinio pobūdžio kaip platesnė nepriklausoma patikra.
- **Sudėtingumas** — ✅ **ATLIKTA** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): vienas ESLint perėjimas, skaičiavimas pagal ruleId, todėl ciklomatinio sudėtingumo bei max-lines ir kognityvinio sudėtingumo bazinės reikšmės išlieka nepriklausomos; atskiros `check:complexity` / `check:cognitive-complexity` paliktos vietiniam `--update`.
- **`/api` apsauga nuo haliucinacijų** — ✅ **ATLIKTA** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): viena `src/app/api` failų sistemos inventorizacija, openapi-routes ir docs-symbols vis dar teikia atskiras ataskaitas; atskiros patikros paliktos vietiniam vykdymui.
- **`check:node-runtime` vykdoma 11 užduočių** — ⚠️ **maža ROI.** Kiekviena užduotis vykdoma atskirame vykdiklyje, o patikra trunka <1 s; bendras sutaupymas būtų ~10 s, tačiau būtų prarasta nebrangi kiekvienos užduoties apsauga. Neverta su tuo susijusių pakeitimų.
- **`typecheck:noimplicit:core` CI lint etape** — ✅ **pašalinta iš lint užduoties** (buvo rekomendacinio pobūdžio `continue-on-error`); blokuojamą tipų aprėptį užtikrina `typecheck:core` + `check:type-coverage`. Vietinis scenarijus paliktas.

### Perjungti / nuspręsti (operatoriaus politika)

- `check:openapi-security-tiers` (rekomendacinio pobūdžio) — ❌ **NEGALIMA paprastai perjungti.** Ji baigiama su kodu 0, tačiau perspėja, kad keli `traffic-inspector` maršrutai, esantys po `LOCAL_ONLY_API_PREFIXES`, neturi `x-loopback-only: true` anotacijos. Norint ją padaryti privalomą, pirmiausia šias anotacijas reikia įtraukti į `openapi.yaml`.
- `typecheck:noimplicit:core` (rekomendacinio pobūdžio) — didžiąja dalimi dubliuojama blokuojančio `check:type-coverage` regresijos slenksčio. Paverskite ją regresijos slenksčiu arba atsisakykite perteklinio antrojo `tsc` vykdymo.
- `test:vitest:ui` (dabar **blokuojanti**) — ankstesnės triktys aiškiai pašalintos iš vykdymo faile `vitest.config.ts`, naudojant `// #8618` sekimo komentarus; dėl naujų trikčių užduotis baigiasi nesėkmingai.
- `check:secrets` (gitleaks, blokuojantis regresijos slenkstis) — dabartinė viršutinė riba yra `metrics.secretFindings` faile `quality-baseline.json`. Bet kokiai išimčiai reikalingas pagrįstas `.gitleaks.toml` įrašas; jei matavimo negalima gauti, rezultatas yra NEUŽBAIGTAS. Nuskaitymas papildo GitHub integruotą paslapčių nuskaitymą ir `check:public-creds`.
- `check:pr-evidence` (blokuojanti, ieško atitikmenų PR aprašo tekste) — didelė klaidingai teigiamų rezultatų rizika; jos atsisakius susilpnėtų griežtosios taisyklės Nr. #18 vykdymo užtikrinimas, todėl tai yra tikras politikos sprendimas.
- `semgrep` (atskira rekomendacinio pobūdžio patikra) — OWASP kategorijų atžvilgiu dubliuoja CodeQL; susiekite jos bazinę reikšmę su regresijos slenksčiu arba jos atsisakykite.

---

## Susijusi dokumentacija

- Tiekimo grandinė (kilmė, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — raktų rinkinių atitikties patikra

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, užduotis `i18n-ui-coverage`).
Palygina kiekvieno `src/i18n/messages/<locale>.json` galinių raktų rinkinį su `en.json` ir patikra
nepavyksta aptikus bet kokį trūkstamą ar perteklinį galinį raktą, neatsižvelgiant į tai, kada jis
buvo pridėtas. `__MISSING__:` vietos rezervavimo žymenys laikomi esamais (jų turinį vertina
santykio patikra). Tai yra absoliutus dviejų pakeitimų skirtumais ir procentais pagrįstų patikrų
papildinys: `check-ui-keys-coverage` kiekvienai lokalei nustato 80 % apatinę ribą (trūkstant 43
raktų iš ~13 000, vis tiek rodoma 99,7 %), o `check-new-key-coverage` vertina tik tuos raktus,
kuriuos PR prideda į `en.json`. Lokalės paketas sugeneruojamas iš tos dienos, kai sukuriama jo
šaka, `en.json` ir verčiamas kelias dienas, nors bazinėje šakoje vis pridedama naujų raktų; pats
paketo PR neprideda jokio rakto, todėl abi giminingos patikros nieko nepranešė, kai 1 paketas
(#13044) buvo sujungtas devyniose lokalėse trūkstant 43 raktų, o 2 paketas (#13660) — aštuoniose
lokalėse trūkstant 10 raktų (2026-09-15). Raudoną būseną ištaisykite naudodami
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra` galinis raktas
reiškia, kad jis pašalintas iš šaltinio — pašalinkite jį iš lokalės. `--warn` pateikia ataskaitą
nesukeldamas nesėkmės. `--catalog=cli` tą patį palyginimą vykdo kataloge `bin/cli/locales`
(`npm run i18n:check-keys:cli`); abu žingsniai yra užduotyje `i18n-ui-coverage`.

#### `check-new-key-coverage` — naujų i18n raktų patikra

Gimininga `check-ui-value-drift` patikra. Pastaroji aptinka atvejį, kai angliška reikšmė buvo
**perrašyta**, tačiau jos vertimai nebuvo atnaujinti; ši patikra aptinka atvejį, kai angliškas
raktas buvo **pridėtas**, tačiau kai kurios lokalės jo negavo.

`check-ui-keys-coverage` negali aptikti šios klasės problemų: ji kiekvienai lokalei nustato
procentinę apatinę ribą, o trūkstant vienuolikos raktų iš ~13 000 aprėptis vis tiek siekia 99,9 %.
Procentinė kiekvienos kalbos reikšmė negali išreikšti „ši funkcija išleista neišversta“ — naujoje
lokalėje gali atsirasti visa funkcija be jokio teksto, o skaičius visiškai nepasikeis.

Incidentas, kurį ji įamžina: 3-iajame „Orchestration Canvas“ etape vienuolika jo raktų buvo
išversti į tuo metu egzistavusias 42 lokales. Po kelių valandų ES kalbų paketas (#13044) padidino
repozitorijos lokalių skaičių iki 51, o devynios naujos lokalės (`el`, `et`, `ga`, `hr`, `lt`,
`lv`, `mt`, `sl`, `sr`) jų taip ir negavo. `deepMergeFallback` vietoje trūkstamo rakto pateikia
anglišką tekstą, todėl problema pasireiškė neišversta, o ne tuščia naudotojo sąsaja — ji buvo
reali ir dėl pačios konstrukcijos nepastebima.

Kaip ir gimininga patikra, ji **atsižvelgia į pakeitimų skirtumus**, lygindama bazinio sujungimo
taško anglų kalbos duomenis su darbiniu medžiu, todėl ankstesnės spragos lieka užfiksuotos ir
įjungiant patikrą nereikėjo jokio perkėlimo.

**`__MISSING__:<english>` žymuo šios patikros netenkina (nuo 2026-09-17).** Anksčiau tai buvo
dokumentuotas atidėjimo būdas — vykdymo metu naudojamas tinkamas angliškas tekstas — kol aštuoni
funkcijų PR 2026-09-16 pridėjo 61 raktą ir, užuot juos išvertę, į visas 65 lokales įrašė šį
žymenį: ši patikra priėmė juos visus, niekas nesustabdė PR, o leidimo šakos viršūnėje privaloma
tikrų vertimų santykio patikra nepavyko visiems (pt-BR 3,2 % > 2,5 % + 0,5). Dabar žymuo
vertinamas kaip trūkstamas vertimas. Raudoną būseną ištaisykite naudodami
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` arba
visas lokales lygiagrečiai apdorodami su `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, saugu vykdyti atsietai, atsisako pradėti be
`OMNIROUTE_TRANSLATION_*` aplinkos kintamųjų). Raktas, kuris privalo likti angliškas
(fiksuotas produkto, variklio ar vėliavėlės pavadinimas), turi būti įtrauktas į
`scripts/i18n/untranslatable-keys.json`, o ne slepiamas už žymens. `vi` visiškai draudžia
žymenis (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — atidėtų testų patikra

Failas, esantis `vitest.config.ts` sąraše `exclude`, yra nevykdomas testas, nors medį skaitančiam
asmeniui jis atrodo kaip aprėpties dalis. Už komentaro
`// #8618 — pre-existing failure; remove this exclusion when fixed` susikaupė šešiasdešimt du
failai. Problema #8618 buvo uždaryta 2026-08-11, o jos stebimas sąrašas išaugo nuo 45 iki 62
įrašų; kiekvienas naujas įrašas paveldėjo komentarą su nuoroda į uždarytą problemą. Kai sąrašas
pagaliau buvo patikrintas failas po failo (#13204), **51 iš 62 failų sėkmingai veikė su esamu
medžiu be jokių šaltinio pakeitimų**.

Patikra reikalauja, kad kiekviena išimtis, nurodanti realų failą, (a) įvardytų stebėjimo problemą
ir (b) būtų įtraukta į `config/quality/vitest-exclusions.json` su išmatuota būsena, kad naujos
išimties pridėjimas būtų peržiūrimas pakeitimas specialiame faile, o ne dar viena eilutė 60 įrašų
masyve. Ji sąmoningai pakartotinai nevykdo neįtrauktų testų — tai trunka ~10 minučių ir turėtų
būti atliekama periodinėje užduotyje; inventoriuje registruojama, kada kiekvienas testas buvo
paskutinį kartą patikrintas.
