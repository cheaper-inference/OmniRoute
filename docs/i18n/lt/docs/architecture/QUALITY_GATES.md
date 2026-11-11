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

## Vartų inventorizacija ir vykdymo profiliai

### Kandidatų priėmimas

Kiekviena CI ir kokybės vartų darbo eigos duoda stabilų verdiktą: `Gate / CI` ir `Gate / Quality`. Jų sudarytoje priėmimo politikoje yra išvardijami visi ankstesni darbai, kaip reikalaujama arba patariama. Atitinkamas būtinas darbas turi būti sėkmingas: trūkstamų, atšauktų, praleistų, laukiančių ir nežinomų rezultatų negalima nustatyti PASS. Dėl galiojančios tik dokumentų arba tik katalogo klasifikacijos kodo juosta gali būti netaikoma; paprastas PR projektas nėra priimtas kandidatas. `hotfix` etiketė neatmeta įrodymų.

Abi darbo eigos apima PRs į main/release filialus, perkelia į `main`, rankinį išsiuntimą ir grupės sujungimo įvykius. Stumti, išsiųsti ir sujungti grupę paleiskite visą pasirinkimą. Patikimas Mergify eilės juodraštis taip pat vykdo atitinkamas `full-code`/`full-code-e2e` užduotis; paprastas PRs praleisti juos. Prieš rankinį sujungimą paleiskite visą konkretaus kandidato siuntimą. Paspaudimai į `release/**` šių darbo eigų nepradeda; „Release-Green“ atskirai stebi sujungtą bazę (`docs/ops/RUNNER_BOX.md` → Hosted juosta). Šakės ir sujungimo grupės naudoja priglobtus bėgikus darbams, kurie kitu atveju pasirenka savarankiškai priglobtus bėgikus; Prieš išleidžiant turi būti patikrintas pakankamas prieglobos pajėgumas.

Įprastas PR vykdo greitą pasirinkimą. Priėmimo politikos `full-code` ir `full-code-e2e` juostos (E2E, integracija, paketo artefaktas, Electron dūmai, Bun SQLite, ekosistemos ir protokolo klientai) veikia tik sujungimo eilės juodraštyje arba visą paleidimą: `gh workflow run ci.yml --ref <branch>`.

Kiekvienas JSON kvitas identifikuoja patikrintą SHA, darbo eigos paleidimą ir bandymą. CLI atmeta checkout/event SHA neatitikimą. Darbo eigos testai susieja politikos narystę su verdikto darbo `needs` sąrašu, todėl nauja arba pašalinta juosta negali tyliai išnykti. Kvitai apima jų pačių darbo eigą, o ne paskelbimą, diegimą ar esamo patariamojo skaitytuvo vidines dalis. Filialo taisyklėse reikalaujamų taikomų patikrinimų atlikimas yra atskiras administracinis pakeitimas; jų darbo vietų apibrėžimas savaime neapsaugo filialo.

`API Route Typecheck` yra nepriklausomas darbo eigos patikrinimas, neatsižvelgiant į bendrus sprendimus ir vietinio pilno stebėtojo statinį profilį. Atskirai patikrinkite jo rezultatą dėl tikslaus kandidato. `.github/workflows/api-route-typecheck.yml` veikia PRs į `main` arba `release/**`, siunčia bet kurią šakų šeimą, neautomatinį išsiuntimą ir `merge_group` tipo `checks_requested` įvykius. Jame nėra kelio filtro. Sujungti grupes patikrinkite `merge_group.head_sha`; kitus renginius patikrinkite `github.sha`. Visuose įvykiuose naudojami tie patys API diagnostikos vartų ir vartų bloko testai. PR baziniai pakartotiniai tikslai reikalauja naujo patikrinimo; body/title redagavimuose naudojamas tik stebėjimo pavadinimas `Admission not requested / API Route Typecheck` ir negali pakeisti priėmimo patikros.

### Priėmimo reduktoriuje išliko įrodymai

`scripts/quality/validate-release-acceptance.mjs` sumažina pateiktą planą ir jo apraiškas; jame nenustatyta, kad planas apima visą išleidimo vamzdyną. Jos ataskaitose aiškiai nustatytas `releaseAcceptance: false`, net kai tas planas yra `VERIFIED`. `release-acceptance.yml` darbo eigoje vis dar naudojami šešėliniai įrenginiai, o ne tikri kūrimo, paketo, įkrovos ar reklamos kvitai.

CLI reikalauja, kad `--evidence-root` patikrintų išsaugotus įrodymus. Failai išsprendžiami kaip `<evidence-root>/<artifact_id>/<member>` ir maišomi kaip SHA-256. PASS įrašas be įrodymų, trūkstamas arba pakeistas failas, nesaugus kelias arba simbolinė nuoroda neleidžia patikrinti. Trūkstami failai nėra lygiaverčiai tuščiiems sėkmingiems žurnalams. Esami SHA/run/attempt patikrinimai išlieka nepriklausomi: atitinkantys baitai negali išgelbėti pasenusio kvito. Failo vientisumas nėra vykdymo autentiškumo ar artefakto reklamavimo įrodymas.

### DAST naudoja patvirtintą CI versiją

Reikalinga `dast-smoke` CI užduotis iškviečia `.github/workflows/dast-smoke.yml` po `build`. Jis atitinka tą patį code/draft pasirinkimą kaip ir kūrimas, įskaitant palaikomą šakę PRs, išleidimo tikslinę PRs ir sujungimo grupes. Trūksta, nepavyko, atšaukta arba netikėtai praleista DAST užduotis blokuoja `Gate / CI`. Daugkartinio naudojimo darbo eiga neturi nepriklausomo PR/dispatch aktyviklio; rankinis patvirtinimas naudoja CI siuntimą, todėl kūrimas ir vartotojas lieka vienu paleidimu.

`scripts/ci/next-build-provenance.mjs` užsandarina visą Next artefaktą su savo tar santrauka, repository/event/run, gamintojo bandymu, head/base/checkout/tree, darbo eigos tapatybėmis, užrakinimo failu, tiksliu mazgu version/ABI, platforma ir rinktuvu. DAST iš `needs.build.outputs` pasirenka nekintamą artefaktą ID, reikalauja atsisiuntimo santraukos patvirtinimo ir nepriklausomai suderina ZIP maišą su gamintojo santrauka prieš ištraukdamas du leistinų sąrašo narius per `scripts/ci/unpack-ci-build.py`. Aprašas ir tar archyvas taip pat turi atitikti nepriklausomo gamintojo išvestis prieš išskleidžiant kitą medį. Ji niekada neieško naujausio sėkmingo filialo. Dalinis paleidimas gali pakartotinai panaudoti tą patį gamintojo bandymą, kai jo ID ir visos įvesties vis tiek sutampa; kvite įrašomi abu bandymai.

Vartotojas lieka prieglobos Linux vykdyklyje, turėdamas tik skaitymo saugyklos leidimą ir be saugyklos paslapčių. Jis įdiegia tikslią gamintojo „Node“ versiją, tada surenka CLI su `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` atmeta trūkstamą atskirą serverį prieš bet kokią atsarginę versiją; Įprastos vietinės CLI versijos išlaiko esamą atsarginę versiją. Serverio parengtis, schema ir greitoji programa turi būti sėkmingi per nepakitusią 25 minučių darbo ribą. Kilmės kvitas patvirtina įvesties tapatybę ir baitus, o ne sėkmingą DAST nuskaitymą. Pasibaigus artefakto galiojimo laikui, nutrūkus bėgikui arba sugedus skaitytuvui lieka neišsamūs arba nepavykę įrodymai; jis negali tapti PASS per patariamąjį paketą.

### UI vykdymo pajėgumas

CI vykdo visą UI inventorių kaip keturias `test-vitest` matricos skeveldras, kurių kiekvienoje yra daugiausia po du darbuotojus ir nustatytas 15 minučių darbo terminas. Pirmoje skeveldrėje taip pat veikia MCP/autoCombo Vitest rinkinys. Reikalingas darbo rezultatas apima kiekvieną matricos koją; vienos skeveldros nesėkmė arba atšaukimas negali patvirtinti kandidato priėmimo.

Naktinis stebėtojas išsaugo atskirą tikslaus kandidato kvitą už kiekvieną UI skeveldrą, įskaitant MCP vykdymą pirmame kvite. Reikalingi visi keturi kvitai, žurnalai ir atitinkamos vykdymo tapatybės. Vietinis `npm run test:vitest:ui` vis tiek pasirenka visą rinkinį; vienas `--shard` paleidimas yra tik dalinis įrodymas.

### Vieneto aprėpties rinkimas

Dvylika vienetų skeveldrų renka V8 aprėptį esamo bandymo vykdymo metu. Sėkmingas skeveldras paleidžia `scripts/ci/compact-v8-coverage.mjs`, kad suglaudintų pradinius failus, nesukurdamas tarpinės Stambulo ataskaitos. Galutinė aprėpties užduotis patikrina visus dvylika apraiškų, palyginti su kandidato SHA, vykdymo laiku, šaltinio šaknies ir duomenų maišais, tada paleidžia c8 reporterius ir esamus aprėpties slenksčius. Įvestys išlaiko C8 visuotinę failų pavadinimų tvarką; Išankstinis sujungimas pagal skeveldrą yra nesaugus, kai taikoma mišri function/block aprėptis. Trūkstamos, netinkamai suformuotos arba nesuderinamos skeveldros neįleidžiamos. Nepavykus bandymo šukės išlaiko neapdorotą diagnostikos aprėptį atskirai; jis negali patekti į galutinį sujungimą.

### Vieneto vykdymo eigos kvitai

Bendra `test:unit:ci:shard` komanda įrašo `primary`, `dashboard` ir `serial` fazes per `scripts/ci/unit-progress-reporter.mjs`. Įprasta bandymo ataskaita lieka prieinama. Atskiras tik metaduomenų kvitas įrašo kiekvieno failo pradžią ir pabaigą, o 30 sekundžių širdies plakimas rodo vis dar aktyvių failų ir jų praėjusio laiko sąrašą. Jis įrašo tik leidžiamų sąrašo vykdymo metaduomenis; testų aprašymai, išvestis, klaidų korpusai ir visa aplinka nėra serijiniai.

CI išlaiko JSONL failus kaip `unit-progress-ci-<run>-<attempt>-<shard>`. Darbo skirtasis laikas gali užkirsti kelią vėlesniam įkėlimui; jau skleidžiami širdies plakimai išlieka diagnostiniais įrodymais. Trūksta širdies plakimų taip pat gali rodyti užblokuotą arba nutrauktą bėgimo procesą. Šie kvitai išsaugo esamą testo pasirinkimą, lygiagretumą, terminus ir išėjimo būseną; jie nėra kandidatų priėmimo verdiktai.

### Sujungti eilę

`queue` etiketė siunčia PR į sujungimo eilę (`.mergify.yml`). Sujungimas atidaro PR juodraštį `mergify/merge-queue/` šakoje, CI ten paleidžia visą pasirinkimą, o pradinis PR sujungiamas, kai praeina `Gate / CI`, `Gate / Quality` ir `Merge integrity (changelog + generated skills)`.

Mergify įrašo savo eilės suvestinę į juodraščio aprašą. Body/title-only `pull_request` `edited` įvykiai naudoja konkrečią vykdymo lygiagretumo grupę ir neperleidžia klasifikacijos, netestuoja matricų, nesujungia vientisumo ar priėmimo verdikto. Tik stebėjimo patikros pavadinimai negali pakeisti `Gate / CI` arba `Gate / Quality`. Redaguojant, pakeičiantį tikslinę bazę, reikia naujo kandidato patvirtinimo.

Nutraukus eilę, stūmimas ne visada sukuria PR. Komentuokite apie tai `@mergifyio queue`.

### Statinio nuskaitymo inventorius

Versijų npm-alias inventorius ir statinio nuskaitymo narystė veikia `config/quality/gate-manifest.json`. Paleiskite `npm run check:gate-manifest`, kad patikrintumėte scenarijų pavadinimus ir tikslias komandas prieš `package.json`; papildymai, pašalinimai ir komandų nukrypimas neveikia tiek vietinio užkabinimo, tiek pakeitimo-klasifikavimo užduočių CI. Pseudonimas nėra darbo eigos užduotis, matricos egzempliorius ar bandomasis atvejis: šie skaičiai neturi būti pateikiami kaip keičiami.

Naudokite `npm run quality:scan -- --list` arba `npm run quality:scan:fast -- --list`, kad patikrintumėte pasirinktus slapyvardžius jų nevykdydami. Vykdytojas iškviečia npm įėjimo tašką, todėl jo vykdymo laikas (įskaitant Bun jei sukonfigūruotas) išsaugomas. Apraše įrašomi slapyvardžiai už tų profilių ribų, kaip atskirai iškviesti, o priežiūros komandos draudžiamos tik skaitomuose nuskaitymo profiliuose.

Šie profiliai apima tik statinį nuskaitymą. Jie nesertifikuoja gaminio bandymų, aprėpties, pakuotės, išorinių patikrinimų ar kandidato visiško išleidimo priėmimo. Darbo eigos priėmimas naudoja susietus `config/quality/admission-policy.json` ir `scripts/quality/admission-verdict.mjs`. Išleidimo ir stebėtojo profiliai lieka atskiri; savarankiškai patikrinti jų taikomus čekius ir kvitus. Visos stebėtojo statinės komandos yra deklaruojamos `config/quality/release-green-static-profile.json`, įskaitant `audit:deps`, mutacijų testo pasirinkimą ir vertimo patikrinimus. Įkroviklis patvirtina npm komandas pagal package.json ir modeliuojamas CI/Quality deklaracijas; jis atmeta dreifą, užuot vykdydamas apvalkalo žetonus kaip argumentus. Reikalinga skaitytuvo SKIP/INCOMPLETE išvestis negali nustatyti PASS. Profilis įrašo išorinius išskyrimus ir nepakeičia priglobtos aprėpties, bandymų matricų, paketo ar diegimo įrodymų. Žemiau pateiktas prozos inventorius yra nuoroda, o ne įrodymas, kad vartai iš tikrųjų bėgo.

Scenarijai veikia pagal `scripts/check/` (politikos vartai) ir `scripts/quality/` (reketo variklį). CI tiesos šaltinis yra `.github/workflows/ci.yml`.

### Paskelbtos bazės dokumentų būklė

`.github/workflows/i18n-base-health.yml` stebi dokumentacijos būklę po pasirinktų siuntimų į `main` ir `release/v*` ir išsiuntimą rankiniu būdu. Jo filtrai apima dokumentus, root Markdown, `llm.txt`, vertimo state/configuration ir atitinkamus i18n įrankius. Vienintelė `Published base documentation health` užduotis naudoja priglobtą Ubuntu ir penkių minučių terminą. Jis atlieka tik skaitymo patvirtinimą ir išrašo diagnostinį kvitą be priklausomybės diegimo, vertimo ar būsenos patvirtinimo.

`scripts/i18n/check-base-health.mjs` reikalauja nulio šaltinio maišos, trūkstamo tikslo, tikslinės maišos, pasenusio vertimo ir sekcijos talpyklos neatitikimų. Ji taip pat patvirtina dabartinę pagrindinę document/locale taikymo sritį ir jos įrašytą kilmę. Neteisingas kontekstas, neužbaigta aprėptis arba nutrūkęs tikrintuvas sukuria `INCOMPLETE`; patvirtintas dreifas gamina `FAIL`. Abu grąžina nesėkmingo išėjimo būseną. Kvitas yra susietas su patikra SHA, darbo eiga, paleidimu ir bandymu ir išsaugomas kaip `i18n-base-health-<sha>-<run>-<attempt>`.

Tai nepriklausomas paskelbtos bazės stebėjimas. Ji neprideda PR arba sujungimo grupės įvykio, būtino PR patikrinimo, npm slapyvardžio ar statinio nuskaitymo profilio nario. Pagrindinis tikrintuvas taip pat blokuoja visas penkias klases absoliučiu režimu. Įprastas PR paruošimas lieka atskiras nuo priėmimo. Sėkmingas įkėlimas negali paversti nepavykusio sveikatos rezultato į PASS.

Įprasta PR naudoja `--preflight` su bazine ataskaita, kurią generuoja `--baseline-evidence`. Anglų kalbos šaltinis gali būti laukiamas tik tada, kai visas vertimo įrašas ir tikrieji tiksliniai baitai nepakito nuo tos tikslios bazės. Nauji tikslo arba sekcijos talpyklos neatitikimai vis dar blokuojami, o neišsamūs įrodymai neleidžia paruošti. Ataskaitoje `preparationPending` ir `mergeReady` pateikiami atskirai: sėkmingas paruošimas nepadaro laukiamų vertimų paruoštų sujungti. Atnaujinkite paveiktus veidrodžius sudarytame kandidate prieš priėmimą. Patikimas Mergify eilės kandidatas, `merge_group`, šakų stūmimai ir neautomatiniai CI vykdymai naudoja absoliučią tikrintuvą be `--warn` arba atleidimo už paveldėtą gedimą. Trūksta tikslinės maišos ir apimtis, kurią sumažino ištrinti įrašyti pagrindiniai failai, negali duoti sėkmingo absoliutaus verdikto.

### Išleiskite PR greitąjį kelią (`quality.yml`)

`.github/workflows/quality.yml` papildo CI main/release PRs, siunčia į `main`, siunčia ir sujungia grupes. PRs naudoja pagal kelią filtruotus greitus patikrinimus. Buvo pašalintas visam laikui išjungtas dublikatas; tikrieji build/package/boot čekiai lieka CI. Vieneto komplektas ir vitest veikia tik CI (`Unit Tests (N/12)` ir `Vitest`).

| Darbas                                           | Taikymo sritis                                                                                                                                                                                                                      | Blokavimas              |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs ir docs-all                                                                                                                                                                                            | Taip                    |
| `Fast Quality Gates`                             | Kodas PRs; statiniai patikrinimai, tipo patikra, prietaisų skydelio tipo patikra, paveikto įrenginio bandymai                                                                                                                       | Taip                    |
| `Forgotten sibling tests`                        | Kodas PRs; pakeisti moduliai, siejami su statiniais vartotojais ir kandidatų brolių ir seserų testais; statinės ir dinaminio importavimo keliai pateikiami kaip patariamoji diagnostika su nurodytomis leidžiamųjų sąrašo išimtimis | **Patariamoji**         |
| `No new ESLint warnings`                         | Kodas PRs; slopinantis pūkelių apsauga                                                                                                                                                                                              | Taip, įskaitant šakutes |
| `Merge integrity (changelog + generated skills)` | Neprojektinis PRs; pakeitimų žurnalas ir sugeneruotas įgūdžių sinchronizavimas                                                                                                                                                      | Taip, įskaitant šakutes |

#### Pamirštų brolių ir seserų bandymų ataskaita

`npm run check:forgotten-sibling-tests` veikia kaip patariamasis `Fast Quality Gates` žingsnis ir pakartotinai naudoja importavimo sprendiklį, esantį už bandymo poveikio žemėlapio. Kiekvienam pakeistam gamybos moduliui jis praneša apie deterministines `changed module/symbol -> static consumer -> candidate sibling test` grandines, kai kandidato testo nėra ištraukimo užklausos skirtume. Pažymėjimo suvestinė ir JSON rezultatas išsaugomi kaip `forgotten-sibling-tests` darbo eigos artefaktas, skirtas kalibruoti prieš bet kokį blokavimą.

Barrelinis reeksportas ir dinaminis importas yra tik skiriamosios gebos diagnostika; jie niekada nesukuria blokuojančio radinio. Apžvelgtos išimtys tiesiogiai `config/quality/forgotten-sibling-allowlist.json`. Kiekvienas įrašas turi įvardyti vartotojo ir kandidato testą, pateikti konkretų pagrindimą ir susieti GitHub problemą arba užklausą. Netinkamai suformuotus įrašus nepavyko uždaryti. Išimtys negali nuslopinti ištrinto kandidato testo arba skirtumo, kuris prideda `.skip`/`.todo`; tvirtinimo susilpnėjimas ir kitas maskavimas lieka nepriklausomai blokuojantiems `check:test-masking` vartams.

### Darbas: `lint`

Veikia kiekviename nuo PR iki `main`. Blokai susijungia sugedus.

| Scenarijus (`npm run ...`)        | Patvirtina                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Blokavimas                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | Node.js versija yra palaikomo diapazono ribose                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                        |
| `check:cycles`                    | Žiedinis importavimas visame `src/` + `open-sse/` (pagrįstas AST, išspręstas tsconfig `paths` ). Bare išeina iš 1, kai egzistuoja koks nors ciklas (nebuvo uždarytas nuo #15281) ir pateikia SCCs sąrašą. `check:cycles:ratchet` (ką veikia CI ) blokuoja, kai skaičius viršija `metrics.cycles` ribas `quality-baseline.json` — šiuo metu yra 14, `direction: down`, todėl gali tik kristi (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip (reketas)                              |
| `check:boundary`                  | `open-sse → src` susiejimas: unikalus failas į failą importuojamas iš variklio į programą (`scripts/quality/measure-boundary.mjs`; kraštų sąrašas yra v4 core/module-split taisymo atsilikimas). Bare = patariamoji ataskaita (ta pati kaip `quality:boundary`). `check:boundary:ratchet` (tai, ką veikia CI, taip pat `quality.yml` greitųjų vartų reketo kilpoje) blokuoja, kai skaičius viršija `metrics.boundaryOpenSseToSrc` ribas `quality-baseline.json` — pasėtoje išmatuotame 771, `direction: down`; `--update` jį tik sumažina; bazinis santykinis PRs (`--base-ref`, žr. toliau)                                                                                                                                                                                                                                                                                                                                                                             | Taip (reketas)                              |
| `check:route-validation:t06`      | Zod schemos pateikiamos visuose maršrutuose (6 pakopos politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip                                        |
| `check:any-budget:t11`            | `@ts-expect-error // any` skaičius neviršija biudžeto (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Taip                                        |
| `check:provider-consistency`      | Kiekvienas `providers.ts` teikėjas turi atitinkamą įrašą `providerRegistry.ts` (ir atvirkščiai, leidžiamajame sąraše)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Taip                                        |
| `check:model-lifecycle`           | Trys rankomis prižiūrimos maršruto parinkimo lentelės išlieka suderintos su užregistruoto gyvavimo ciklo momentine nuotrauka (#11503): `FITNESS_TABLE` (`taskFitness.ts`) neįvertina pašalinto ID, kurį `REGISTRY` galėtų nukreipti; every `BUILT_IN_ALIASES` target is present in `REGISTRY` and absent from the retired-id snapshot; kiekvienas išvestas ID, kuris vis dar yra `REGISTRY` yra persiunčiamas arba įtrauktas į `allowedRetiredInCatalog`; ir toje momentinėje nuotraukoje neatrodo, kad `DEFAULT_DEGRADATION_MAP` šaltinis ar taikinys būtų pašalintas. This does not prove that a model is currently served by a live upstream. Neprisijungęs — lyginamas su `config/quality/model-lifecycle.json`, atnaujintas rankomis naudojant `npm run quality:refresh-model-lifecycle` (tinklas; neprijungtas prie CI). `allowedRetiredInCatalog` is a burn-down ratchet: add an entry only with a tracking issue.                                                | Taip                                        |
| `check:fetch-targets`             | Kiekvienas `fetch("/api/...")` kliento pusės `src/` išsprendžiamas į tikrą `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Taip                                        |
| `check:deps`                      | Visi `npm install` -able dep kiekviename `package.json` atpirkimo sandoryje yra `dependency-allowlist.json`; pažymėtos naujos atsegtos arba sulenktos pakuotės                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                        |
| `audit:deps`                      | npm visų penkių nepriklausomų užrakinimo failų (root, Electron, OpenCode įskiepių v1/v2 ir teikėjo) auditas. Kritinių patarimų blokas; aukšti patarimai išlieka matomais įspėjimais. Missing/failed auditas yra INCOMPLETE ir blokas; Išsaugomos užrakto maišos ir ataskaitos pagal taikymo sritį.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Taip                                        |
| `check:lockfile`                  | `package-lock.json` vientisumas — https registras, vientisumo maišos, nėra pagrindinio kompiuterio nepaisymo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Taip                                        |
| `check:licenses`                  | SPDX licencijų leidimų sąrašas gamybos priklausomybėms                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Taip                                        |
| `check:tracked-artifacts`         | Jokių kūrimo artefaktų / priskirtų `node_modules` simbolių nuorodų (taip pat veikia naudojant „Husky“ išankstinį patvirtinimą; išankstinis paspaudimas yra sąmoningai lengvas — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Taip                                        |
| `check:ai-attribution`            | Nėra AI/bot `Co-Authored-By` anonso arba AI kartos poraštės PR įsipareigojimuose, pavadinimas ar turinys — griežta taisyklė #16 ( `quality.yml` greitųjų vartų cikle, skirta PR→ `release/**` — nuskaito įvykio naudingąją apkrovą, be PRs — ir tik PR veiksmas `ci.yml` → `main` PR taip pat `commit-msg` ; leidžiami bendraautoriai #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | Kiekviename Vitest išskyrime nurodoma stebėjimo problema ir ji rodoma `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Taip                                        |
| `check:file-size`                 | Šaltinio failai (`.ts`/`.tsx` `src/`, `open-sse/`, `electron/`, `bin/`) lieka `cap`, o bandomieji failai (`*.test.ts(x)`) `testCap`; failai, užšaldyti `file-size-baseline.json` (`frozen` / `testFrozen`), neturi viršyti įrašyto dydžio                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Taip                                        |
| `check:error-helper`              | Klaidų atsakymai executors/handlers naudoja `buildErrorBody()` / `sanitizeErrorMessage()` (kieta taisyklė #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                        |
| `check:migration-numbering`       | Perkėlimo SQL failai yra sunumeruoti nuosekliai, nėra spragų ar dublikatų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Taip                                        |
| `check:public-creds`              | Jokių pažodinių OAuth `client_id`/`client_secret` arba „Firebase“ žiniatinklio raktų už `publicCreds.ts` ribų (kieta taisyklė #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Taip                                        |
| `check:db-rules`                  | Nėra neapdoroto SQL už `src/lib/db/` modulių ribų; be statinės importo iš `localDb.ts` (kietos taisyklės #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Taip                                        |
| `check:known-symbols`             | Teikėjų vykdytojai, maršruto parinkimo strategijos ir vertėjai, užregistruoti jų išsiuntimo lentelėse, atitinka — diske esančius failus be našlaičių ar nedeklaruotų simbolių                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Taip                                        |
| `check:route-guard-membership`    | Kiekvienas maršrutas, kuris sukuria antrinį procesą, yra klasifikuojamas pagal `isLocalOnlyPath()` (kietos taisyklės #15/#17).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                        |
| `check:test-discovery`            | Kiekvieną atpirkimo sandoryje esantį `*.test.ts` / `*.spec.ts` failą surenka bent vienas bandomasis vykdytojas (reketas: našlaičių sąrašas `test-discovery-baseline.json` gali tik susitraukti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Taip                                        |
| `check:test-tla-order`            | Joks `node:test` failas, esantis `tests/unit`, neužregistruoja testo, pasiekia aukščiausio lygio `await`, tada registruoja daugiau (#18045; reketas: `test-tla-order-allowlist.json` gali tik susitraukti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Taip                                        |
| `check:agent-skills-sync`         | Sugeneruoti agento įgūdžių artefaktai atitinka jų šaltinio katalogą (nėra dreifo)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:provider-asset-provenance` | Teikėjas logos/assets turi įrašytą kilmės įrašą                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | JSON konfigūracijos failai analizuojami ir atitinka repo lint taisykles                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | TypeScript kompiliavimas be klaidų (tik įspėjamieji įspėjimai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                        |
| `typecheck:noimplicit:core`       | Griežtas `noImplicitAny` — orientuotas į ateitį; daugeliui jau esamų skambučių svetainių vis dar reikia komentarų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Patariamoji** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` taikoma `src/app/(dashboard)/**` (#7033) — `typecheck:core` kuruojamame 27 failų leidimų sąraše nėra jokios informacijos suvestinės TSX, o `next build` niekada jo netikrina (`next.config.mjs` nustato `ignoreBuildErrors: true`), todėl našlaičių identifikatorių regresijos ten (#6625/#6909) buvo CI. Skiriasi nuo fiksuoto per-file/per-TS-code skaičiaus bazinės linijos (`config/quality/dashboard-typecheck-baseline.json`, toks pats pasenusio vykdymo modelis kaip ir `check:known-symbols`) Tik — NEW klaidos, viršijančios bazinį skaičių, neatitinka užtvarų; sumažinkite reketą su `--update` kai ištaisoma esama klaida.                                                                                                                                                                                                                                                                                                                            | Taip                                        |
| `check:build-typecheck`           | Visos programos gamybos tipo patikra per `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), paviršiaus `typecheck:core` 27 failų leidimų sąrašas ir prietaisų skydelio vartai neapima. Skirtumas nuo `config/quality/build-typecheck-baseline.json`; naujas arba padidintas per (failas, kodas) skaičius nepavyksta, mažesnis skaičius prašo reketuoti. `--update` atsisako, kol paleidime yra nauja arba padidinta pora, nebent `--force-regressions` būtų išlaikytas, ir atsisako naujai nutildyto failo, nebent `--force-nocheck` būtų išlaikytas, todėl bazinės linijos išplėtimas, kad būtų žalia spalva, ir nuolatinės tylos suteikimas yra du atskiri sąmoningi veiksmai. Plikas `--force` atmetamas. Taip pat nuskaito `@ts-nocheck` kūrimo apimtį su `config/quality/ts-nocheck-baseline.json`, nes failas, kuriame jis naudojamas, visai nepraneša apie diagnostiką ir kitu atveju būtų nematomas visiems vartams. | Taip                                        |

#### Dvi tipo tikrinimo programos atsako skirtingai

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) ir `check:build-typecheck` sukompiliuoja skirtingas programas pagal skirtingas parinktis, o tas pats failas gali būti švarus viename ir pilnas klaidų kitame.

`tsconfig.build.json` nustato `"strict": false`, todėl `noImplicitAny` išjungtas. Pagrindinė konfigūracija sudaro kuruojamą 27 failų leistinų sąrašą su griežtesnėmis parinktimis ir seka kiekvieno įrašo importavimo grafiką, todėl failai, kurie niekada nerodomi kūrimo programoje, vis tiek yra ten tikrinami.

Sprendžiant, ar failas įvestas, svarbios pasekmės:**nulinė diagnostika pagal `check:build-typecheck` nereiškia nulio** . Pašalinus `@ts-nocheck` iš 26 failų, 23 iš jų buvo švarūs kūrimo programoje; šešiolika iš jų pateikė apie 120 numanomų klaidų – bet kokių griežtų klaidų. Patikrinkite abu prieš iškviesdami failą švarų.

### Darbas: `quality-gate`

Veikia po `test-coverage`. Blokai susijungia sugedus.

| Scenarijus                   | Patvirtina                                                                                                                                                     | Blokavimas          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `quality:collect`            | Skleidžia `quality-metrics.json` (ESLint įspėjimų skaičius, aprėptis iš sujungtos skeveldros ataskaitos)                                                       | Taip (prieš reketą) |
| `quality:ratchet`            | Kiekviena `quality-baseline.json` metrika nebuvo regresuota (ESLint įspėjimai ≤ pradinė linija; aprėpties ≥ bazinė linija)                                     | Taip                |
| `check:duplication`          | Kodo dubliavimas (jscpd@4) neviršija pradinio `quality-baseline.json` lygio                                                                                    | Taip                |
| `check:complexity`           | Failo lygio ciklomatinis sudėtingumas neviršija ribos (pagrindinis ESLint `complexity` + `max-lines-per-function`)                                             | Taip                |
| `check:cognitive-complexity` | Kognityvinio sudėtingumo reketas (`eslint-plugin-sonarjs`) — atskiras ESLint leidimas; CI veikia abu sujungti kaip vienas `check:complexity-ratchets` veiksmas | Taip                |
| `check:dead-code`            | Nepanaudotų eksporto / failų reketas (knip) nesikeičia, palyginti su pradine linija                                                                            | Taip                |
| `check:compression-budget`   | Suspaudimo etaloninio biudžeto — vienam varikliui skirtų žetonų taupymo ribos neturi regresuoti                                                                | Taip                |
| `check:type-coverage`        | Procentinio tipo reketas (`type-coverage`) neregresuoja; daugiausia apima `typecheck:noimplicit:core`                                                          | Taip                |

### Darbai: `codeql-scan` ir `codeql-admission`

`codeql-scan` gamina visas sukonfigūruotas analizės kategorijas. Kai šis darbas bus sėkmingas, `codeql-admission` patvirtina tikslius įkėlimus ir kandidato įspėjimo reketą. Abi yra būtinos `Gate / CI` priklausomybės, įskaitant kandidatus, skirtus tik dokumentams. Administraciniai aktyvinimo ir kanarėlių reikalavimai aprašyti toliau esančioje dalyje „CodeQL reketas“.

| Scenarijus             | Patvirtina                                                                                                                                                                                                  | Blokavimas |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:codeql-ratchet` | Kandidatas ref/SHA ir visos sukonfigūruotos analizės kategorijos turi būti galiojančios prieš perspėjimo reketą; trūkstamų įrodymų blokų. Pasaulinės atsargos lieka atskiros —, žr. "CodeQL reketas" žemiau | Taip       |

### Darbas: `quality-extended`

Darbas blokuoja tinkamus kandidatus. Rinkinio dydis, slapti radiniai, pažeidžiamumo išvados, darbo eigos išvados ir OpenAPI pakeitimai tikrinami naudojant reikiamus reketus. Žiedinės priklausomybės diagnostika išlieka patariamoji. Būtinas skaitytuvo įdiegimas: `scripts/ci/install-quality-scanners.sh` teikia prisegtas versijas ir platina diegimo klaidas. Trūksta įrankių, negaliojančios ataskaitos arba trūksta bazinių linijų palieka reikiamus skaitytuvo vartus INCOMPLETE.

| Scenarijus               | Patvirtina                                                                                                                                                                                                                               | Blokavimas                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `check:circular-deps`    | Nėra žiedinių priklausomybių (dpdm)                                                                                                                                                                                                      | **Patariamoji**                                   |
| `check:bundle-size`      | Ryšulio dydis neviršija dangtelio; nepasiekiamas matavimas nepavyksta                                                                                                                                                                    | **Blokavimas naudojant --ratchet**                |
| `check:secrets`          | „Gitleaks“ išvados neregresuoja; būtini nuskaitymai atmeta trūkstamą tools/source/baseline, nesėkmingus nuskaitymus ir netinkamas ataskaitas                                                                                             | **Blokavimas naudojant --ratchet**                |
| `check:vuln-ratchet`     | Priklausomybės pažeidžiamumas nemažėja; būtini nuskaitymai atmeta trūkstamus įrankius, netinkamas ataskaitas arba trūkstamas bazines linijas                                                                                             | **Blokavimas naudojant --ratchet**                |
| `check:workflows`        | Darbo eigos pūkas (actionlint + zizmor); missing/broken skaitytuvai, netinkamos ataskaitos arba trūkstamos reketo pagrindinės linijos sugenda kaip INCOMPLETE. Galiojantys radiniai atitinka pasirinktą strict/advisory/ratchet politiką | Reikalingas vykdymas; zizmor reketo blokavimas CI |
| `check:openapi-breaking` | Vieša API sutartis dėl prisegtų įvykių įsipareigojimų (PR sujungimo bazė, stumti anksčiau, sujungimo grupės bazė; scheduled/manual patikros pirmasis tėvas); reikalingo matavimo nepavyko uždaryti                                       | **Blokavimas naudojant --ratchet**                |

### Darbas: `docs-sync-strict`

Pateikiant užklausas `main` arba `release/**`, ši užduotis vykdoma tik nejuodraščio (arba patikimos eilės) kandidatams, klasifikuojamiems kaip dokumentacijos arba kodo pakeitimai. Jis taip pat veikia ne PR CI renginiuose; šios darbo eigos paspaudimo paleidiklis apima tik `main`, o ne `release/**`. Žingsnis, kuris baigiasi ne nuliui, užblokuoja užduotį; tik ataskaitoje pateiktos išvados ir toliau pateiktos dokumentais pagrįstos išimtys to nedaro.

| Scenarijus                     | Patvirtina                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Blokavimas                                                                                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Meta vartai, kurie paeiliui paleidžia 7 žemiau esančius vartus                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                                                                                                                             |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG versijos nuoseklumas, tikslūs `llm.txt` veidrodžiai, išversti CHANGELOG section/size invariantai ir pakeistų pasikartojančių dokumentų nebuvimas                                                                                                                                                                                                                                                                                                                          | Taip                                                                                                                                             |
| ↳ `check:docs-frontmatter`     | Sudarytų dokumentų puslapiuose yra galiojantys frontmatter pavadinimai                                                                                                                                                                                                                                                                                                                                                                                                                              | Taip                                                                                                                                             |
| ↳ `check:docs-counts`          | Didelio pasitikėjimo skaičiaus invariantai yra griežti; euristiniai failų skaičiaus patikrinimai tik įspėja, nebent scenarijus gauna `--strict` ( CI metavartai jo nepraleidžia)                                                                                                                                                                                                                                                                                                                    | Griežtas pakopų blokavimas; minkštas patarimas                                                                                                   |
| ↳ `check:env-doc-sync`         | Šaltinis env skaito, `.env.example` ir `docs/reference/ENVIRONMENT.md` sutinka po aiškaus ignoravimo, tik dokumento ir tik env leidžiamųjų sąrašų                                                                                                                                                                                                                                                                                                                                                   | Taip, už dokumentuotų leidžiamųjų sąrašų ribų                                                                                                    |
| ↳ `check:deprecated-versions`  | Praneša apie galimas pasenusias versijas, nepatenkančias į saugų istorinį kontekstą ir pasenusias atnaujinimo datas, neįskaitant ignoruojamų dokumentų                                                                                                                                                                                                                                                                                                                                              | Patarimas dėl dabartinės CI laidų (`--strict` nepradėtas)                                                                                        |
| ↳ `check:doc-links`            | Vidinės žymėjimo nuorodos dokumentuose nukreipiamos į tikrus failus (`[text]`/`(path)` forma)                                                                                                                                                                                                                                                                                                                                                                                                       | Taip                                                                                                                                             |
| ↳ `check:fabricated-docs`      | Maršrutai, env vars, CLI komandos, kablio pavadinimai ir failų keliai, nurodyti dokumentuose, yra kodų bazėje. Kieti vartai per `--strict`; soft-fail be vėliavėlės.                                                                                                                                                                                                                                                                                                                                | Taip (per `--strict` CI)                                                                                                                         |
| `check:cli-i18n`               | Naudoti CLI `t()` raktai egzistuoja `en`; `pt-BR` išlaiko kiekvieną aukščiausio lygio skyrių; `zh-CN` ir `zh-TW` yra kiekvienas `en` raktas                                                                                                                                                                                                                                                                                                                                                         | Taip                                                                                                                                             |
| `check:openapi-coverage`       | OpenAPI specifikacija apima bent jau reketas tikrų maršrutų                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip                                                                                                                                             |
| `check:openapi-security-tiers` | Deklaruojamos `x-loopback-only`/`x-always-protected` anotacijos turi būti paremtos `routeGuard.ts`; analizatoriaus ir persiuntimo neatitikimų blokas. Atvirkštinis patikrinimas, ar nėra `x-loopback-only` naudojant tik vietinius priešdėlius, įspėja, o tik šablono maršrutai neįtraukiami į tą atvirkštinį leidimą.                                                                                                                                                                              | Parser/forward tikrina blokavimą; atvirkštinio patikrinimo patarimas                                                                             |
| `check:openapi-routes`         | Kiekvienas `/api...` kelias `openapi.yaml` nejautrus parametrams nustato tikrąjį maršrutą po pagrįsto `KNOWN_STALE_SPEC` leistinų sąrašo; pasenę leidžiamųjų sąrašo įrašai taip pat nepavyksta                                                                                                                                                                                                                                                                                                      | Taip                                                                                                                                             |
| `check:docs-symbols`           | Vidinės `/api/...` URL nuorodos kanoniniuose neveidrodiniuose dokumentuose nustato tikrą maršrutą arba maršrutų šeimą; proxy/upstream/placeholder/file nuorodos ir pagrįsti `KNOWN_STALE_DOC_REFS` įrašai neįtraukiami, o pasenę leidžiamųjų sąrašo įrašai nepavyksta                                                                                                                                                                                                                               | Taip                                                                                                                                             |
| `i18n translation drift`       | Kad būtų galima visiškai priimti, reikia nulinio šaltinio, trūkstamo tikslo, tikslinės maišos, pasenusio vertimo ir sekcijos talpyklos neatitikimų. Įprastas PR paruošimas gali išlaikyti tikslius paveldėtus įrodymus arba laukiantį pakeitimą tik anglų kalba su nepakeista visa būsena ir tiksliniais baitais; jos ataskaita atskirai deklaruoja pasirengimą susijungti. Trūksta tikslinės maišos ir neužbaigtas bazinių įrodymų blokas. Jei senosios sekcijos talpyklos nėra, tai nėra gedimas. | Visos penkios klasės blokuoja queue/base priėmimą; įprasti ruošimo leidimai tik patvirtintus paveldėtus arba tik anglų kalbos laukiančius darbus |

Sugeneruojami dvylika README SVGs pagal `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` juos visus regeneruoja). Kiekviename iš jų yra baitų palyginimo vieneto testas (`tests/unit/docs/readme-*-svg.test.ts`, užduotis `test-unit`), kuris nepavyksta, kai priskirtas failas yra pasenęs, o `check:docs-counts` nuskaito kanoninius skaičius iš savo `<text>` mazgų — todėl kontūravimo veiksme kiekviena apibūdinta failo eilutė lieka nematoma `<text>`. SVG kanoninių skaičių patikra nuskaito failus, išvardytus `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, taip pat `public/images/tier-flow-dark.svg` ir `tier-flow-light.svg`; teiginiai apie nemokamą amžinai, įvedimą į katalogą, pasikartojantį fondą ir balų koeficientus taip pat skaitomi `promise-pillars.svg`, `free-tier-budget.svg` ir `strategies-grid.svg`. `free-tier-budget.svg` pateikia savo skaičius iš tiesioginio katalogo įkėlimo programos, todėl pakeitus į `FREE_MODEL_BUDGETS` arba tiekėjo rodomą pavadinimą CI bus raudona, kol failas bus iš naujo sugeneruotas.

### Darbas: `i18n-ui-coverage`

| Scenarijus                         | Patvirtina                                                                                                                                                                                                | Blokavimas     |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (įterpta) | UI i18n rakto aprėptis yra ≥ 65 %                                                                                                                                                                         | Taip           |
| `check-ui-value-drift` (įterpta)   | Perrašyta anglų kalba **vertė** nepalieka pasenusio vertimo                                                                                                                                               | Taip           |
| `check-new-key-coverage` (įterpta) | A **naujas** Anglų kalbos raktas išverstas kiekvienoje — lokalėje, `__MISSING__:` žymeklis atmetamas                                                                                                      | Taip           |
| `check-translation-ratio`          | Tikrasis vertimo koeficientas pagal lokalę (identiškas anglų kalbai / rezervuota vieta / trūkstami lapai už leidžiamų sąrašo ribų) neturi viršyti `config/quality/i18n-translation-baseline.json` + slack | **Blokavimas** |

Reikia `fetch-depth: 0` — vertės dreifo vartai skiriasi `en.json` nuo sujungimo pagrindo.

#### `check-ui-value-drift` — pasenę vertimo vartai

Sulaiko vieną i18n regresiją, kurios kiti vartai struktūriškai nemato: angliška reikšmė perrašoma, o vertimai, gauti iš _ankstesnės_ anglų kalbos, pasilieka, todėl ne anglų kalbos vartotojai toliau skaito užtikrintai suformuluotą, dabar neteisingą kopiją.

Tai buvo išsiųsta tikrai. `oauthModal.googleOAuthWarning` buvo perrašytas, kai nusileido Antigravity prisijungimo pagalbininkas (#5203);**39 iš 43 vietovių** išliko tekstas, liepiantis operatoriams „nukopijuoti visą URL ir įklijuoti jį žemiau“ — srautą, kurio negali užbaigti tas teikėjas. Iki #8463 tai buvo nepastebėta, nes:

- `sync-ui-keys` užpildo tik tuos raktus, kurie yra **nėra** , niekada tokių, kurie yra **pasenęs** ;
- `check-ui-keys-coverage` skaičiuoja rakto _buvimą_, todėl pasenęs vertimas vertinamas kaip padengtas;
- `check-translation-drift` seka `docs/i18n/<locale>/**.md` dokumentaciją, atspindinčią — ji niekada neskaito `src/i18n/messages/*.json`. Užblokavimas `docs-sync-strict` nuo 2026–2009 m. pakartotinio sinchronizavimo: redaguokite pagrindinį dokumentą → `npm run i18n:run -- --files=<doc>` (skilties lygio, pigus).

**Atkreipia dėmesį į skirtumus, nepalaikoma pradinio lygio.** Jis lygina `en.json` sujungimo bazėje su darbo medžiu; kiekvienam raktui, kurio anglų kalbos reikšmė pasikeitė, bet kuri lokalė, kurioje vis dar yra nepaliestas vertimas, yra pasenusi. Tai tyčia **įšaldo jau turimą skolą** — a diff negali atskleisti, iš kurios senosios anglų kalbos atėjo senas vertimas, todėl vartai vertina tik tai, ką paliečia dabartinis pakeitimas. Alternatyva (pagrindinė maišos linija kiekvienam raktui) kainuotų ~ 600 KB sugeneruotą failą, 3 × didžiausią esamą bazinę liniją, kuri apimtų kiekvieną i18n PR.

Du būdai jį patenkinti:

1. atnaujinti paveiktus vertimus arba
2. nustatykite juos į `__MISSING__:<new english>` — vykdymo laikas, tada aptarnauja pataisytą anglų kalbą (`src/i18n/request.ts::deepMergeFallback`, #7258) ir pagrindines vertimo eiles.

Jei styga **prasmė** pasikeitė, pirmenybę **rakto pervadinimas** : naujas raktas negali paveldėti pasenusio vertimo. Tai yra naudojamas #8463 modelis.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Vertės slinkimo ir naujų raktų vartai turi vieną nepakeičiamą palyginimą su `scripts/i18n/resolve-ui-diff-base.mjs`. Darbo eiga abiem patikrinimams perduoda tą patį pagrindinį, pagrindinį patarimą ir kandidatinį SHAs. PR/base-retarget, stumti ir sujungti grupes naudoja savo įvykio kontekstą. Norint išsiųsti kandidatą į filialą, reikia tiksliai atidaryti PR arba aiškiai įvesti `i18n_base_sha`. Siuntimas arba suplanuotas `main` arba `release/vX.Y.Z` stebėjimas be šios įvesties palygina paskutinį įpareigojimą su pirmuoju pirminiu; tai nėra visų paveldėtų vertimų skolų auditas. Vietiniam iškvietimui reikalinga aiški palyginimo bazė, pvz., aukščiau pateikta `BASE_REF` komanda.

Trūksta arba dviprasmiškas palyginimo kontekstas, neįskaitomas arba netinkamas privalomas katalogas ir pakeistas kandidatas sukuria `INCOMPLETE` su išėjimo kodu **2** , įskaitant įspėjimo režimą. Katalogo skaitymui naudojamas `scripts/i18n/read-ui-catalog.mjs`; skaitymo gedimai nepakeičiami tuščiais objektais. Nei nepasiekiama bazė, nei nepilna įvestis nesukuria PASS.

### Darbas: `i18n`

Visa i18n patvirtinimo matrica (vienoje lokalėje yra viena užduotis). Visas darbas yra patariamasis.

| Scenarijus                      | Patvirtina                     | Blokavimas                                               |
| ------------------------------- | ------------------------------ | -------------------------------------------------------- |
| `validate_translation.py quick` | Vertimo išsamumas pagal lokalę | **Patariamoji** (`continue-on-error: true` visam darbui) |

### Darbas: `pr-test-policy`

Veikia tik pagal ištraukimo užklausas.

| Scenarijus             | Patvirtina                                                                                                                            | Blokavimas |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs, pakeičiantis gamybos kodą `src/`, `open-sse/`, `electron/` arba `bin/` turi apimti arba atnaujinti testus ( #8 griežta taisyklė) | Taip       |
| `check:test-masking`   | Pakeisti bandymo failai nesumažina grynojo pareiškimų skaičiaus ir neprideda `assert.ok(true)` tautologijos                           | Taip       |
| `check:pr-evidence`    | PR organas cituoja test/VPS pakeitimo įrodymus (mechanizuoja „Hard Rule #18 sugriebdamas PR prozą, — trapią, žr.                      | Taip       |

### Darbas: `test-vitest`

Reikia `changes` klasifikavimo darbo. Taikomos matricos skeveldros blokų sujungimas gedimo atveju.

| Liukso numeris   | Patvirtina                                                      | Blokavimas                                                                                                        |
| ---------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveris (110 įrankių), autoCombo, talpykla — vitest runner | Taip                                                                                                              |
| `test:vitest:ui` | UI komponentas išbando — vitest bėgiką                          | **Blokavimas** Išankstiniai — gedimai yra aiškiai neįtraukti į `vitest.config.ts`; naujos nesėkmės sužlugdo darbą |

### Naktinės darbo eigos (suplanuotos, konsultacinės)

Jie veikia pagal cron tvarkaraštį (ir `workflow_dispatch`), niekada nenaudojant PRs. Visi yra patariamieji.

| Darbo eiga             | Patvirtina                                                                                                                                                             | Blokavimas      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | greito patikrinimo savybių testai su atsitiktiniu sėklų + dideliu paleidimo skaičiumi                                                                                  | **Patariamoji** |
| `nightly-resilience`   | krūvos augimo vartai, chaoso gedimo įpurškimas, k6 load/soak                                                                                                           | **Patariamoji** |
| `nightly-llm-security` | „promptfoo“ įpurškimo apsauga (blokavimo režimas) + garak zondai (praleidžiami be teikėjo paslapties)                                                                  | **Patariamoji** |
| `nightly-schemathesis` | OpenAPI sutarties sumaišymas (schematezė) prieš gyvą OmniRoute naudojant `docs/openapi.yaml` — paviršių specifikacijų pažeidimus / neapdorotus 500 s (8 variantas B.4) | **Patariamoji** |
| `nightly-mutation`     | Strykerio mutacijų testavimo rezultatas per greitą vieneto juostą — išgyvenusių mutantų paviršius yra silpnas                                                          | **Patariamoji** |
| `nightly-compat`       | Mazgo variklio suderinamumo matrica palaikomuose `engines.node` diapazonuose                                                                                           | **Patariamoji** |

Našumo pradinės linijos (krūva, TTFB, kūrimo laikas) įrašomos, o ne apribotos: žr. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
