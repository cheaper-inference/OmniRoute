# 🗜️ Prompt Compression Guide — OmniRoute (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automatiškai sutaupykite 15–95 % tinkamo konteksto. Trumpą apžvalgą rasite [README glaudinimo skiltyje](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Apžvalga

OmniRoute įgyvendina modulinį užklausų glaudinimo konvejerį, kuris **proaktyviai** vykdomas prieš užklausoms pasiekiant išorinius teikėjus. Tai reiškia, kad žetonai taupomi skaidriai — jūsų darbo eigos keisti nereikia.

```
Kliento užklausa
  → Glaudinimo strategijos parinkiklis
    → Derinio perrašymas? → Naudoti derinio nuostatą
    → Automatinio aktyvinimo slenkstis? → Naudoti automatinį režimą
    → Numatytasis režimas? → Naudoti visuotinę nuostatą
    → Išjungta? → Praleisti glaudinimą
  → Pasirinktas glaudinimo režimas
    → Išjungtas: neglaudinti
    → Lengvas: saugus tarpų ir formatavimo sutvarkymas (~15 %)
    → Standartinis: perteklinių žodžių šalinimas telegrafiniu stiliumi (~30 %)
    → Agresyvus: istorijos sendinimas ir apibendrinimas (~50 %)
    → Ultra: euristinis genėjimas ir kodo blokų retinimas (~75 %)
    → RTK: komandas atpažįstantis terminalo ir įrankių išvesties filtravimas (60–90 % išorinio srauto diapazonas)
    → Sudėtinis: nuoseklus kelių variklių konvejeris, paprastai RTK, tada Caveman (78–95 % tinkamo turinio diapazonas)
  → Suglaudinta užklausa → Teikėjas
```

---

## Glaudinimo režimai

### Išjungta

Glaudinimas netaikomas. Visi pranešimai perduodami nepakeisti.

### Lite režimas (~15 % sutaupoma, <1 ms delsa)

Saugiausias režimas — formatavimo valymas. Jo įrankių rezultatų sutrumpinimas yra nuostolingas, todėl numatytasis
kelias (be `allow-lossy`, `engine:lite` arba pavadinto derinio parinkties) paleidžia lite režimą su
`compressToolResults: false`: ankstesni įrankių rezultatai pasiekia teikėją nepakeisti.

| Technika                 | Aprašymas                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Sujungia nuoseklias tuščias eilutes ir pašalina eilučių pabaigos tarpus                                         |
| `dedupSystemPrompt`      | Pašalina pasikartojančius sisteminius pranešimus                                                                |
| `compressToolResults`    | Sutrumpina ankstesnius įrankių rezultatus iki lite režimo ribos (nuostolingai: tik su aiškiu užklausos leidimu) |
| `removeRedundantContent` | Pašalina pasikartojančias instrukcijas                                                                          |
| `replaceImageUrls`       | Sutrumpina bazines64 vaizdų duomenų URI                                                                         |

**Geriausiai tinka:** nuolatiniam naudojimui, saugai svarbioms darbo eigoms.

### Standartinis režimas (~30 % sutaupoma)

Įkvėptas [Caveman](https://github.com/JuliusBrussee/caveman) — pašalina užpildančius žodžius ir perteklinę formuluotę, išsaugodamas prasmę:

- Pašalina užpildančius žodžius („please“, „I think“, „basically“, „actually“)
- Sutrumpina perteklines frazes („in order to“ → „to“, „as a result of“ → „because“)
- Pašalina mandagų atsargumą („Would you mind...“, „If you could possibly...“)
- Daugiau nei 30 reguliariųjų reiškinių taisyklių, pritaikytų programavimo užklausoms

**Geriausiai tinka:** kasdienėms programavimo darbo eigoms, sąnaudoms jautrioms komandoms.

### Agresyvus režimas (~50 % sutaupoma)

Išmanus ilgų seansų istorijos valdymas:

- **Pranešimų senėjimas** — senesni pranešimai laipsniškai glaudinami
- **Įrankių rezultatų glaudinimas** — ilgi įrankių rezultatai sutrumpinami arba praleidžiami (pirmosios / paskutinės eilutės,
  eilučių filtravimas pagal atitiktį, JSON raktų glaudinimas)
- **Struktūrinio vientisumo apsaugos** — užtikrina, kad `tool_use` + `tool_result` poros išliktų nuoseklios
- **Konteksto lango suvokimas** — atsižvelgia į konkretaus modelio žetonų ribas

**Geriausiai tinka:** ilgiems derinimo seansams, didelėms kodų bazėms.

### Ultra režimas (~75 % sutaupoma)

Maksimalus glaudinimas žetonams jautriems scenarijams:

- **Heuristinis genėjimas** — pagal balą atliekamas prozos žetonų genėjimas
- **Struktūros išsaugojimas** — aptverti kodo blokai, įterptasis kodas, URL ir identifikatoriai pažymimi ir vėl įterpiami pažodžiui, niekada negenimi
- **Pasirinktinis SLM lygmuo** — sukonfigūravus, nedidelis vietinis modelis gali patikslinti genėjimą
- Nepriklauso nuo agresyvaus režimo: neatlieka pranešimų senėjimo, įrankių rezultatų glaudinimo
  ar atsarginio santraukų kūrimo (tik SLM lygmens klaida gali nukreipti atsarginį perdavimą per agresyvų režimą)

**Geriausiai tinka:** kai nuolat pasiekiate konteksto ribas.

### RTK režimas (60–90 % pradinio srauto)

RTK režimas optimizuotas pertekliniams įrankių rezultatams, pasirodantiems programavimo agento seansuose:

- Aptinka komandų / išvesties klases, pvz., `git status`, `git diff`, `git log`, testų vykdiklius,
  TypeScript/Vite/Webpack kompiliavimą, ESLint/Biome/Prettier, npm audit/įdiegimus, Docker žurnalus, infrastruktūros
  išvestį ir bendrą apvalkalo išvestį
- Taiko JSON filtrų paketus iš `open-sse/services/compression/engines/rtk/filters/`
- Importuoja RTK TOML schemos v1 filtrus iš projekto arba visuotinių `filters.toml` failų, su įterptųjų testų
  patvirtinimu ir projekto failų pasitikėjimo valdymu
- Pateikia 56 integruotus filtrus su įterptais patikros pavyzdžiais
- Pašalina ANSI valdymo sekas, eigos juostas, pasikartojančias eilutes ir neaktualų triukšmą
- Išsaugo triktis, klaidas, įspėjimus, pakeistus failus, santraukas ir ilgų išvesčių pabaigą
- Palaiko pasitikėjimu valdomus projekto filtrus, visuotinius filtrus ir pasirenkamą nuasmenintos neapdorotos išvesties atkūrimą

**Geriausiai tinka:** agento seansams su apvalkalo, kompiliavimo, testavimo, git, grep ir failų išvesties transkripcijomis.

### Sudėtinis režimas (78–95 % tinkamo diapazono)

Sudėtinis režimas deterministine tvarka paleidžia kelis glaudinimo variklius. Numatytoji konvejerio eiga yra:

```txt
RTK -> Caveman
```

Ši tvarka pirmiausia sutraukia terminalo / įrankių išvestį, tada pritaiko Caveman semantinį glaudinimą
likusiai natūralios kalbos užklausai. Sudėtinius konvejerius galima sukonfigūruoti visuotinai arba naudojant
glaudinimo derinius, priskirtus maršrutizavimo deriniams.

**Geriausiai tinka:** mišriam kontekstui su dideliais įrankių žurnalais ir žmogaus instrukcijomis arba asistento santraukomis.

## Pirminių projektų sutaupymo skaičiavimai

OmniRoute dokumentuoja glaudinimo sutaupymą iš dviejų šaltinių: pirminių projektų etaloninių testų ir
pačios OmniRoute variklių kompozicijos.

| Šaltinis | Čia naudojamas pirminio README skaičius                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman  | `~75%` mažiau išvesties tokenų, `65%` vidutinis etaloninių testų išvesties sutaupymas, `22-87%` intervalas ir `~46%` įvesties glaudinimo įrankis |
| RTK      | `60-90%` komandų išvesties sutaupymas; pavyzdinėje sesijoje `~118,000 -> ~23,900` tokenų, arba sutaupyta `79.7%` (`~80%`)                        |

Persidengiančioms įrankių / konteksto naudingosioms apkrovoms numatytasis OmniRoute derinys nuosekliai taiko variklius:

```txt
RTK -> Caveman
```

Bendras sutaupymas yra dauginamasis, o ne sudedamasis:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Šis `78-95%` skaičius taikomas, kai tiek RTK, tiek Caveman gali sumažinti tą pačią įvesties / konteksto naudingąją apkrovą.
Caveman atsakymo išvesties režimas yra atskiras: kai jis įjungtas, naudokite paties Caveman išvesties sutaupymo rodiklius (`65%`
vidurkis, `~75%` pagrindinis rodiklis, `22-87%` intervalas). Bendras atsiskaitymo sutaupymas priklauso nuo jūsų užklausų ir išvesties santykio.

### Ką iš tikrųjų reiškia „tinkamas“

Pagrindinis 15-95% intervalas yra realus, tačiau jis taikomas tik **pertekliniam arba daugžodžiam** turiniui — pasikartojančioms
klaidų eilutėms, kūrimo žurnalui, kuris užverčia tuo pačiu įspėjimu, pernelyg didelei `grep` / failo nuskaitymo išklotinei. Tai
**nereiškia**, kad kiekviena užklausa leidžia tiek sutaupyti.

Patikrinta empiriškai (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): vykdant
`stacked` (RTK + Caveman) su Anthropic formato `tool_result` bloku, kuriame yra 300 vienodų
klaidų eilučių, pasiektas **95.93% tokenų sutaupymas / 96.26% simbolių sutaupymas** — tiksliai reklamuojamame
intervale. Tačiau tą patį apdorojimo procesą pritaikius įprastai, nesikartojančiai įrankio išvesčiai (tvarkingam `grep` atitikmenų sąrašui,
trumpam failo nuskaitymui, įprastam pokalbio tekstui), pagrįstai gaunamas **beveik nulinis sutaupymas**, nes
nėra nieko pasikartojančio, ką būtų galima pašalinti, o `validateCompression()` (`validation.ts`) neleidžia pateikti
perrašytos versijos, kuri pašalintų ar pakeistų kodo blokus, URL, antraštes, versijas arba DIDŽIOSIOMIS RAIDĖMIS užrašytus konstantų identifikatorius.

Tai tikėtinas ir saugus veikimas, o ne klaida: programavimo sesijoje, kurioje daugiausia skaitomi failai arba juose ieškoma naudojant `grep`,
bendras sutaupymas bus nedidelis net ir visiškai įjungus glaudinimą, o sesijoje, kurioje susiduriama su nesėkmingu
ciklu ar daug pranešimų pateikiančiu linteriu, tam srautui bus pasiektas visas 78-95% intervalas. Nelaikykite vienos sesijos
mažo bendro sutaupymo procento įrodymu, kad glaudinimas sukonfigūruotas netinkamai — pirmiausia patikrinkite, ar
pirminė įrankio išvestis iš tiesų buvo perteklinė.

---

## Tokenų sutaupymo vizualizacija

```
Be glaudinimo:        LLM siunčiama 47K tokenų
Su Lite:              siunčiama 40K tokenų          (sutaupyta 15% — saugu, visada įjungta)
Su Standard:          siunčiama 33K tokenų          (sutaupyta 30% — Caveman kalbėsenos taisyklės)
Su Aggressive:        siunčiama 24K tokenų          (sutaupyta 50% — senėjimas + apibendrinimas)
Su Ultra:             siunčiama 12K tokenų          (sutaupyta 75% — euristinis genėjimas)
Su RTK:               siunčiama 19K-5K tokenų       (sutaupyta 60-90% komandų / įrankių išvesčiai)
Su Stacked:           siunčiama 10K-2.5K tokenų     (78-95% tinkamos RTK+Caveman naudingosios apkrovos intervalas)
```

---

## Konfigūracija

### Valdymo skydas

Eikite į `Dashboard → Context & Cache`:

- **Caveman** — režimo pasirinkimas, kalbų paketai, peržiūra ir visuotinės numatytosios nuostatos
- **RTK** — komandų filtrų peržiūra, RTK saugos nuostatos ir filtrų katalogas
- **Compression Combos** — pavadinti variklių konvejeriai, priskirti maršrutizavimo deriniams
- **Auto-Trigger Threshold** — automatiškai įjungia suspaudimą, kai žetonų skaičius viršija slenkstį

### Nepaisymas pagal derinį

Skiltyje `Dashboard → Context & Cache → Compression Combos` priskirkite suspaudimo derinį maršrutizavimo
deriniui:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Taip galite naudoti sudėtinį suspaudimą nemokamiems ir kodavimo tiekėjams, o mokamose
prenumeratose išlaikyti lite režimą.

Šis „Nepaisymas pagal derinį“ yra atskiras valdiklis nuo **maršrutizavimo derinio suspaudimo
režimo** nepaisymo (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — lauko schema taip
pat priima `rtk`, `stacked` ir `omniglyph`) — šis nepaisymas neparenka pavadinto suspaudimo derinio
konvejerio; jis tik nustato `compressionMode` lauką, kurį naudoja
`resolveCompressionPlan`. Jį galima nustatyti derinio kortelėje (`Dashboard → Combos`) arba, nuo
#6760, kiekvienam maršrutizavimo deriniui sąraše „Priskirti maršrutizavimui“, esančiame
`Dashboard → Context & Cache → Compression Combos`, šalia pirmiau aprašyto konvejerio priskyrimo
žymimojo laukelio. Abi sąsajos išsaugo duomenis naudodamos tą patį
`PUT /api/combos/{id}` galinį punktą.

### Nepaisymas pagal užklausą

Siųskite `x-omniroute-compression` užklausos antraštę, kad pakeistumėte suspaudimo planą vienai
užklausai. Jai teikiama aukščiausia pirmenybė — ji turi viršenybę prieš maršrutizavimo derinio
nepaisymą, aktyvų profilį, automatinį paleidimą ir skydelio Default. Nežinomos reikšmės
ignoruojamos (užklausa niekada neatmetama), o visuotinis pagrindinis jungiklis vis tiek valdo viską:
kai suspaudimas visame pasaulyje išjungtas, antraštė negali jo įjungti. Reikšmės:

| Reikšmė       | Poveikis                                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `off`         | Šiai užklausai suspaudimas netaikomas.                                                                                 |
| `default`     | Iš skydelio gautas Default profilis (aktyvus profilis ignoruojamas). Nuostolingieji varikliai lieka išjungti.          |
| `safe`        | Tas pats, kaip nenurodžius antraštės.                                                                                  |
| `allow-lossy` | Išlaikomas šios užklausos operatoriaus planas, įskaitant santraukas, aktualumo filtrus ir stiliaus perrašymus.         |
| `engine:<id>` | Vienas įjungtas variklis, pvz., `engine:rtk`. Tai konkretaus variklio pasirinktinio įjungimo pagal užklausą parinktis. |
| `<combo>`     | Pavadintas derinys, pirmiausia sutapatinamas pagal pavadinimą (neatsižvelgiant į raidžių registrą), tada pagal ID.     |

Be `allow-lossy`, `engine:<id>` arba pavadinto derinio nuostolingieji varikliai netaikomi. Kai
nuostolingasis Default, automatinis paleidimas arba maršrutizavimo nepaisymas sumažinamas,
„OmniRoute“ iš sukonfigūruoto sudėtinio konvejerio išlaiko atpažintus nenuostolinguosius veiksmus
sukonfigūruota tvarka. Į `session-dedup → lite` grįžtama tik tada, kai neišlieka nė vieno
sukonfigūruoto nenuostolingo veiksmo.

Nuostatų skydelio **Effective pipeline** peržiūroje rodomas įprastas ramybės būsenos planas. Kai
gali būti vykdomas automatinis paleidimas, toje pačioje peržiūroje taip pat rodomas sąlyginis
efektyvus konvejeris, kad skydelio ir vykdymo aplinkos be antraštės sprendimai išliktų suderinti.

Pritaikytas planas grąžinamas `X-OmniRoute-Compression: <mode>; source=<source>` atsako
antraštėje, kur `<source>` yra viena iš reikšmių: `request-header`, `routing-override`,
`active-profile`, `auto-trigger`, `default` arba `off`.

### API

```bash
# Gauti suspaudimo nuostatas
curl http://localhost:20128/api/settings/compression

# Atnaujinti suspaudimo nuostatas
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Peržiūrėti konkretų RTK / sudėtinį turinį
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Išvardyti RTK filtrų paketus
curl http://localhost:20128/api/context/rtk/filters

# Tiesiogiai išbandyti RTK su pasirinktiniais komandų metaduomenimis
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Kas apsaugoma

Glaudinimo variklis **visada išsaugo:**

- ✅ Kodo blokus (aptvertus ir įterptinius)
- ✅ URL ir failų kelius
- ✅ JSON struktūras ir struktūrinius duomenis
- ✅ Identifikatorius ir apsaugotus techninius prieigos ženklus
- ✅ Matematines išraiškas
- ✅ Įrankių / funkcijų iškvietimų apibrėžtis
- ✅ Sistemos raginimus (supaprastintuoju režimu)

RTK neapdorotos išvesties atkūrimo funkcija paslepia įprastus API raktus, pateikėjo prieigos ženklus, „Slack“ prieigos ženklus, AWS prieigos raktus,
slaptažodžius, prieigos ženklus ir slaptus duomenis prieš ką nors išsaugant.

---

## Glaudinimo statistika

Kiekvienos suglaudintos užklausos statistika įtraukiama į serverio žurnalus:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Etapų planas

| Etapas    | Režimai                                                                                                                                                                           | Būsena      |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 1 etapas  | Išjungta, supaprastintas                                                                                                                                                          | ✅ Išleista |
| 2 etapas  | Standartinis, agresyvus, „Ultra“                                                                                                                                                  | ✅ Išleista |
| 3 etapas  | RTK, sudėtinis, glaudinimo deriniai                                                                                                                                               | ✅ Išleista |
| 4 etapas  | Išvesties stiliai, SLM lygio „Ultra“, vertinimo infrastruktūra                                                                                                                    | ✅ Išleista |
| 4C etapas | Adaptyvus konteksto biudžetas („reguliatorius“) — skaičiavimo variklis + API (`contextBudget` maršrute `PUT /api/settings/compression`) + režimo / politikos valdikliai skydelyje | ✅ Išleista |

---

## Padėkos

Standartinio režimo glaudinimo taisykles įkvėpė **[Caveman](https://github.com/JuliusBrussee/caveman)**, kurį sukūrė **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — išpopuliarėjęs projektas „kodėl naudoti daug prieigos ženklų, kai užtenka kelių“. „Caveman“ nurodo `~75%` mažesnį išvesties prieigos ženklų skaičių, vidutiniškai `65%` išvesties sutaupymą atliekant etaloninius bandymus, `22-87%` išvesties diapazoną ir `~46%` įvesties glaudinimo įrankį.

RTK režimą įkvėpė **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, kurį sukūrė **[RTK AI](https://github.com/rtk-ai)** — didelio našumo komandų išvesties glaudinimo projektas, skirtas terminalo, kūrimo, testavimo, git ir įrankių išvesties filtravimui. RTK nurodo `60-90%` sutaupymą, o jo README seanso pavyzdyje rodoma, kad sutaupyta `~80%`.

---

## Pažangios suspaudimo sistemos

Be 7 aukščiau aprašytų režimų (šaltinis taip pat priima `codex-responses` ir `omniglyph` režimus, kurių šis vadovas neapima), toliau pateiktose skiltyse aprašomos funkcijos, veikiančios naudojant šiuos režimus arba kartu su jais: Įrankio rezultatų suspaudimas ir progresyvus senėjimas yra agresyvaus variklio 1 ir 2 žingsniai (agresyvus režimas ir `aggressive` žingsnis). Cache-Aware Compression sumažina `aggressive` ir `ultra` į `standard` talpyklos teikėjams, kai glaudinimas įjungtas, o „Caveman“ išvesties režimas ir išvesties stiliai yra pasirenkamos sistemos eilutės, išjungtos pagal numatytuosius nustatymus, kurios formuoja modelio išvestį, o ne suspaudžia užklausą.

### Suspaudimas naudojant talpyklą

Kai kurie teikėjai (pvz., Anthropic su greita talpyklomis) palaiko** greitas kaupimas talpykloje** , kuri leidžia talpykloje išsaugoti raginimo dalis, kad sumažintų išlaidas ir delsą. Kai įjungtas talpyklos kaupimas, iš tikrųjų gali būti agresyvus glaudinimas** skaudėjo** našumą, nes pakeičia talpykloje esančius prieigos raktus, todėl talpykla tampa negaliojanti.

`cachingAware.ts` modulis tai išsprendžia** aptikti talpyklos kontekstą** ir** suspaudimo strategijos koregavimas** atitinkamai.

#### Kaip tai veikia

1. **Aptikti talpyklos kontekstą** — Nuskaito užklausos turinį ir ieško `cache_control` žymeklių
2. **Nustatykite talpyklos tiekėjus** — Patikrina, ar tikslinis teikėjas palaiko talpyklą
3. **Sureguliuokite strategiją** — sumažina `aggressive`/`ultra` į `standard` talpyklos teikėjams
4. **Praleisti sistemos raginimą** — Sistemos raginimai paprastai yra talpykloje, todėl nesuspauskite jų

Strategijos pagalbininkas taip pat grąžina `deterministicOnly` vėliavėlę, bet plano kūrėjas naudoja tik strategiją — šiandien niekas pasroviui neskaito vėliavėlės.

#### Kodo pavyzdys

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kada naudoti

Suspaudimas naudojant talpyklą yra** visada įjungtas** — nereikia konfigūruoti. Jis įsijungia, kai įjungtas glaudinimas, o tikslinis teikėjas palaiko greitą talpyklą (Anthropic, OpenAI ir kt.); aiškūs `cache_control` žymekliai nereikalingi. Vien tik — teikėjas suaktyvina ankstesnės versijos grąžinimą, o vien tik žymekliai to niekada nedaro (žymeklio aptikimas pateikia talpyklos telemetriją, o ne strategijos sprendimą).

OpenRouter skaičiuojamas kaip talpyklos teikėjas tik `anthropic/*` modeliams: Claude kodo užklausos išlaiko savo `cache_control` lūžio taškus (ne daugiau kaip 4), o apsauga apsaugo priešdėlį, o kiekviena kita OpenRouter šeima (`openai/`, `google/`, `qwen/`, ...) lieka išvalyta ir neapsaugota.

### Progresuojantis senėjimas

Ilgi pokalbiai sukaupia daug pranešimų posūkių, tačiau senesni posūkiai tampa mažiau aktualūs. `progressiveAging.ts` modulis** pablogina pranešimus posūkio atstumu** (atstumas matuojamas nuo pokalbio pabaigos). Su pristatytomis numatytomis nuostatomis (`verbatim: 2, light: 2, moderate: 3`):

- **Paskutiniai 2 posūkiai (atstumas ≤ 2)** : Laikė pažodžiui
- **Atstumas 3** : Urvinio žmogaus suspaudimas (užpildo pašalinimas)
- **Atstumas 4 +** : apibendrinti asistento pranešimai; vartotojų pranešimai sumažinami iki pirmosios eilutės, iki 120 simbolių; kiti vaidmenys nepaliesti. Sistemos raginimai, jau pasenę pranešimai ir naujausias vartotojo pranešimas visada saugomi pažodžiui, nepaisant atstumo. Niekas neatsisako iš karto, o `light` juosta nepasiekiama naudojant numatytuosius nustatymus (`light` lygu `verbatim`).

#### Kodo pavyzdys

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### Kada naudoti

Progresuojantis senėjimas yra** visada įjungtas** `aggressive` režimui — tai yra 2 `compressAggressive()` žingsnis. Ultra režimas jo neveikia. Tai ypač veiksminga:

- Ilgai trunkantys kodavimo seansai
- Kelių dienų pokalbiai
- Agento darbo eigos su daugybe įrankių iškvietimų

### Caveman išvesties režimas

Pridedamas Caveman išvesties režimas** sistemos instrukcijas** kurie klausia paties modelio glaustos išvesties — `lite` lygis prašo glaustų atsakymų, kuriuose būtų visi sakiniai, `full` prašo „atsakyti trumpai kaip išmanusis urvinis žmogus“, o `ultra` prašo telegrafinės išvesties; instrukcijos tik klausia, jie negali to garantuoti. Užklausos jas gauna per `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` pirmiausia išsprendžia pasirinkimą naudodamas back-compat tarpiklį (`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`), kuris, nors `outputStyles` tuščias, susieja įjungtą `cavemanOutputMode` su `terse-prose` išvesties stiliumi ties `cavemanOutputMode.intensity` (žr. Back-compat toliau); netuščias `outputStyles` pasirinkimas naudojamas toks, koks yra, o `cavemanOutputMode.enabled` ir `intensity` tada neturi jokio poveikio, o jo `autoClarity` perjungimas vis tiek galioja. `outputMode.ts` turi instrukcijų tekstus (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), turinio apeiti ir vietos pagalbinę priemonę, kurią naudoja injekcija; jo paties `applyCavemanOutputMode()` purkštukas neturi gamybos skambučio.

#### Kaip tai veikia

Šis režimas neglaudina įvesties. Jis prideda instrukcijų bloką prie sistemos raginimo (žr. „Kaip veikia įpurškimas“ toliau), o bet koks užklausai pasirinktas įvesties glaudinimo režimas vis tiek veikia po to korpuse, kuriame dabar yra blokas. Prieš bendrų ribų sąlygą, kuria baigiasi kiekvienas lygis, anglų kalbos `full` lygis yra toks:

> "Atsakykite trumpai kaip išmanusis urvinis žmogus. Numeskite straipsnius (a/an/the), užpildą (just/really/basically/actually/simply), malonumus, apsidraudimą. Fragmentai OK. Trumpi sinonimai (didelis, neišsamus, pataisyti neįgyvendinti). Išsaugokite tikslią techninę medžiagą, kodą, klaidas, URLs, identifikatorius."

Tai ypač gerai veikia:

- Kodo generavimas (terserio išvestis = mažiau žetonų)
- Greiti klausimai ir atsakymai (nereikia išsamių paaiškinimų)
- Paketinis apdorojimas (maksimaliai padidinti pralaidumą)

#### Kada naudoti

Caveman išvesties režimas yra** pasirinkti** . Įjungę glaudinimą (`enabled: true`, pagrindinis jungiklis glaudinimo nustatymų puslapyje), įjunkite jį naudodami `cavemanOutputMode.enabled`; `intensity` pasirenka `lite`, `full` arba `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kompresijos derinys** Išvesties režimas** toggle (`outputMode`, lygis `outputModeIntensity`) nustato tą patį jungiklį užklausoms, kurioms taikomas derinys, o `omniroute_set_compression_engine` MCP įrankis įrašo jį naudodamas loginį `outputMode` argumentą. Netuščias `outputStyles` pasirinkimas turi viršenybę prieš šį jungiklį. Prietaisų skydelyje įgalinant** Trumpa proza** išvesties stilius įveda tą patį bloką (žr. Išvesties stilius toliau).

### Išvesties stiliai (katalogas)

Urvinio žmogaus išvesties režimas yra aukščiau** senas vieno stiliaus kelias** . 4 etapas apibendrino jį į sudaromų išvesties stilių katalogą: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Kiekvienas stilius yra sisteminė instrukcija, kuri prašo paties modelio pigesnės produkcijos; stilius galima įjungti kartu ir jie įvedami katalogo tvarka.

| Stilius                                   | `id`            | Ką tai daro                                                                                                                                                                                                                                                                        | Mokymo kalbos                                 |
| ----------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Trumpa proza                              | `terse-prose`   | Drop filler/articles/hedging; išlaikyti tikslią techninę medžiagą. Tas pats tekstas kaip ir senojo urvinio žmogaus išvesties režimu (nurodyta, nepervesta).                                                                                                                        | lt, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mažiau kodo                               | `less-code`     | YAGNI kopėčios: mažiausias darbinis pakeitimas, jokių neprašytų abstrakcijų.                                                                                                                                                                                                       | lt, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Arklio uodega (tingus vyresnysis kūrėjas) | `ponytail`      | „Geriausias kodas yra niekada neparašytas kodas“: pakartotinis > perrašymas, pagrindinė priežastis > simptomas, trumpiausias darbo skirtumas.                                                                                                                                      | lt, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Turiu ADHD (pirmiausia veiksmas)          | `i-have-adhd`   | Pirmiausia veiksmas (command/path/snippet prieš prozą), sunumeruoti žingsniai, ONE konkretus kitas žingsnis, ne preamble/recap/closers. Pritaikytas iš [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                          | lt, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Neslystantis UI filtras                   | `antislop-ui`   | Kiekviena vizualinė technika turi išlaikyti tikslo testą (hierarchija, tapatybė, skaitomumas); nėra numatytosios gradients/glass/glow, ribojamos paletės, nėra šablonų išdėstymo. Abu anti-slop stiliai prideda be mirusiųjų valdiklių / nefabrikuotų pretenzijų ribą.             | lt, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop kopija ir žmogaus filtras        | `antislop-copy` | Konkreti kopija (be em brūkšnelio, bendras CTAs, populiarūs žodžiai, pokalbių roboto uždarymo priemonės, sugalvoti faktai) ir žmonių taisyklės: WCAG AA kontrastas, matomas fokusavimas, klaviatūros pasiekiamumas, empty/loading/error būsenos, mobiliųjų įrenginių pertvarkymas. | lt, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                          | `terse-cjk`     | `full`/`ultra` atsakymas klasikine kinų kalba (文言); `lite` prašo tik trumpų atsakymų be funkcinių žodžių, malonumų ar pagražinimų.                                                                                                                                               | zh (susijęs su vietomis, žr. toliau)          |

Kiekvienas stilius pristato tris intensyvumo lygius — `lite`, `full`, `ultra` — ir kiekvienas lygis baigiasi bendrų ribų sąlyga (`SHARED_BOUNDARIES` in `outputMode.ts`), kuri tiksliai išlaiko kodo blokus, failų kelius, komandas, klaidas ir URLs. `terse-prose` ir `terse-cjk` lygių tekstai prideda identifikatorių prie šio sąrašo.

`terse-cjk` yra susietas su `zh` dviejose vietose. Suspaudimo nustatymų puslapyje jos eilutė pateikiama tik tada, kai prietaisų skydelio UI kalba yra kinų (`zh-CN` arba `zh-TW`), o `applyOutputStyles()` įveda ją tik tada, kai užklausos išspręsta kalba (žr. Kalbos pasirinkimą toliau) yra `zh`. Paslėpus eilutę išsaugotas `terse-cjk` pasirinkimas neišvalomas: nustatymai API priima bet kokį stiliaus ID, o išsaugojus kitus stilius puslapyje jis išsaugomas. Pateikus užklausą, `applyOutputStyles()` kalbos patikra yra vieninteliai lokalės vartai.

#### Kaip veikia injekcija

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) išsprendžia pasirinkimą pagal katalogą (nežinomi ID ir lokalių neatitinkantys stiliai atmetami, niekada nebūna klaida; pasirinkus, kad stiliaus nėra, tekstas paliekamas nepakitęs, praleidžiamas kaip `no_styles`), sujungia pasirinktas instrukcijas katalogo tvarka, prideda ribų sąlygą** vieną kartą** (plius saugos sąlyga, `SAFETY_BOUNDARIES` arba jos vertimas, kai pasirenkamas `less-code` arba `ponytail` ), ir pradeda bloką su vienu idempotencijos žymekliu (`[OmniRoute Output Styles]`), todėl pakartotinis taikymas yra neveiksmingas. Kai išspręsta kalba (žr. Kalbos pasirinkimą toliau) turi vertimą, vietoj anglų kalbos įvedama lokalizuota instrukcija.

Turinyje su netuščiu `messages` masyvu idempotencijos patikra vykdoma prieš apeinant turinį: kai `[OmniRoute Output Styles]` žymeklis jau yra aukščiausio lygio `system` lauke (eilutė arba turinio bloko masyvas) arba sistemos pranešime su eilutės turiniu, turinys paliekamas nepakeistas kaip `already_applied` ir raktinio žodžio tikrinimas nevykdomas. Kitu atveju turinio apėjimas (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) patikrina paskutinių trijų pranešimų tekstą, neatsižvelgiant į jų vaidmenį, ir praleidžia stilius visam posūkiui, kai tas tekstas atitinka saugos, negrįžtamo veiksmo ar paaiškinimo raktinius žodžius arba tvarka jautrią seką: `first`, `then`, `after that`, `before`, po kurio seka 0 simbolis arba 2. `delete`, `drop`, `migrate`, `rollback` `deploy` `backup` `release` Aplinkkelis veikia, kol** Automatinis aiškumo aplinkkelis** perjungimas (`cavemanOutputMode.autoClarity`, pagal numatytuosius nustatymus įjungtas) įjungtas; išjungus jungiklį praleidžiamas raktinių žodžių patikrinimas.

Kai aplinkkelis leidžia apsisukti, `placeSystemInstruction()` (tas pats failas), kuris niekada nesukuria naujo `messages[0]`, įdeda bloką į pirmąjį, kurį randa:

1. Pagrindinis sistemos pranešimas su eilutės turiniu: blokas pridedamas po jo tekstu.
2. Aukščiausio lygio `system` laukas: blokas pridedamas po eilutės teksto arba kaip naujas teksto blokas pridedamas prie turinio bloko masyvo.
3. Pirmasis vėlesnis sistemos pranešimas su eilutės turiniu: blokas pridedamas po jo tekstu.
4. Nė vienas iš aukščiau paminėtų dalykų: blokas patenka į naują sistemos pranešimą `messages` pabaigoje.

Turinyje be `messages` masyvo (arba su tuščiu), nevykdomas joks turinio apėjimas, o aukščiausio lygio `system` laukas nėra peržiūrimas. Blokas pridedamas po eilutės `instructions` lauko tekstu, nebent tame lauke jau yra `[OmniRoute Output Styles]` žymeklis, tokiu atveju tekstas paliekamas nepakeistas kaip `already_applied`. Kai korpuse nėra eilutės `instructions` lauko, bet yra `input` (eilutė arba masyvas), blokas tampa `instructions`, pakeičiantis bet kokią to lauko turimą ne eilutės reikšmę. Kūnas, kuriame nėra nei eilutės `instructions` lauko, nei eilutės ar masyvo `input` paliekamas nepakeistas ir praleidžiamas kaip `no_messages`.

#### Kaip įjungti

Prietaisų skydelyje:** Suspaudimo kontekstas → Suspaudimo nustatymai** (`/dashboard/context/settings`), Išvesties stilių skiltis: viena eilutė kiekvienam stiliui su on/off perjungikliu ir lygio parinkikliu. Stiliai įvedami, kai pats glaudinimas įjungtas (puslapio pagrindinis perjungimas, `enabled`). The** Automatinis aiškumo aplinkkelis** jungiklis yra ant** Urvinis žmogus** puslapyje (`/dashboard/context/caveman`), jame** Išvesties režimas** kortelę. Programiškai glaudinimo konfigūracija išlaiko pasirinkimą kaip:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Atgalinis suderinimas: kol `outputStyles` tuščias, senasis `cavemanOutputMode.enabled` nustatymas susiejamas su `terse-prose` ties `cavemanOutputMode.intensity`. Tada blokas prasideda `[OmniRoute Output Styles]` žymekliu, kur senasis `applyCavemanOutputMode()` purkštukas parašė `[OmniRoute Caveman Output Mode]`. Po žymekliu tekstas atitinka seną įterpimą en, pt-BR, es, de, fr, it, ru, id ir vi; ja ir zh jame yra vienas papildomas tarpas prieš ribos sakinį. `terse-prose` verčiama į pt-BR, es, de, fr, it, ru, zh, ja, id ir vi, todėl užklausa, kurios išspręsta kalba yra `hu` gauna anglišką tekstą, kur senasis injektorius naudojo vengrišką.

Output-style language selection (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): with `languageConfig.enabled` on, `autoDetect` samples the latest user message in the request's `messages` array that has text (string content, or the `text` of its content parts) and runs the Caveman engine's detector (`detectCompressionLanguage()`) on it. The detector returns `zh` for text with Han characters and no kana; otherwise it returns whichever of `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` and `id` has the most hint matches, and `en` when none match — text it cannot classify gets English, never `defaultLanguage`, and `vi` is never detected although the styles ship `vi` text. A Responses API body keeps its turns in `input`, which is not sampled, so it gets `defaultLanguage`, then English. When no user message in `messages` has text, or with `autoDetect` off, `defaultLanguage` applies, then English. With `languageConfig.enabled` off, the language is English — unless a compression combo applies to the request (a combo assigned to the request's routing combo, or the default compression combo chatCore falls back to for the built-in stacked pipeline): applying a combo turns `languageConfig.enabled` on for that request and sets `defaultLanguage` from the combo's language packs (the saved value if it is one of the combo's packs, otherwise the combo's first pack, which defaults to `en`), while the saved `autoDetect` (on by default) still applies. The Caveman input engine picks its rule-pack language differently — per text part and, with auto-detect off, gated on `enabledPacks`.

Stiliaus × kalbos matrica prisegta `tests/unit/compression/output-styles-i18n-matrix.test.ts`: kiekvienam katalogo stiliui reikalingas įrašas testo `BASELINE_LANGUAGES`; stilius, kuris nėra apribotas lokale, turi pateikti pt-BR vertimą (ši taisyklė netaikoma su lokale ribojamu `terse-cjk` ), nebent jis įrašytas į `KNOWN_ENGLISH_ONLY`, kuriame gali būti tik stiliai be jokių vertimų — sąraše esantis stilius, turintis bet kokį vertimą, neatlaiko testo; ir stilius neišlaiko testo, kai praranda kalbą, kuri yra jo `BASELINE_LANGUAGES` įraše. Norėdami pridėti stilių, žr. [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Įrankio rezultato suspaudimas

`compressToolResult()` `open-sse/services/compression/toolResultCompressor.ts` suglaudina įrankio rezultato tekstą su** 5 strategijos** . Ji bando juos tokia tvarka, o pirma įgalinta strategija, kurios patikrinimas atitinka turinį, nusprendžia rezultatą:

1. **`fileContent`** : 3 ar daugiau eilučių turinys, kuriame bent viena eilutė, neatsižvelgiant į pirmąją įtrauką, prasideda `import `, `export `, `function `, `class `, `const `, `let `, `var ` arba `return ` (raktinis žodis ir tarpas), arba jo `if`, `for` arba `while`, po kurio seka `(` arba ` (` paskutinės 5 eilutės su pažymėtu viduriu.
2. **`grepSearch`** : turinys, turintis bent vieną formos `<path>:<digits>:` eilutę, kai tekstas prieš pirmąjį dvitaškį neturi tarpo, palieka tik tas eilutes, daugiausia 30, o po to skaičiuojamas bet kokių tolesnių atitikmenų skaičius ir atitinkančių failų sąrašas; kas kita eilutė nuleidžiama. Vienos tokios eilutės pakanka strategijai suaktyvinti, todėl žurnalo eilutė, prasidedanti laiko žyma, pvz., `12:30:45` taip pat skaičiuojama.
3. **`shellOutput`** : išvestis, kurioje yra ANSI CSI seka (`ESC[` tada skaitmenys arba kabliataškiai, tada raidė, kaip ir spalvų koduose) arba `$` po kurio yra tarpas bet kurioje teksto vietoje, prarandamos šios sekos (kiti pabėgimai, pvz., `ESC[?25l` arba OSC lango pavadinimo seka, išsaugomi) ir išsaugo paskutines 50 sekančių eilučių. Kadangi šis patikrinimas vykdomas prieš `json` ir `errorMessage`, JSON arba klaidos išvestis, kurioje yra toks `$` niekada jų nepasiekia, kai įjungtas `shellOutput`.
4. **`json`** : apibendrinama daugiau nei 2 000 simbolių JSON naudingoji apkrova, kuri prasideda `{` arba `[` (po pasirenkamo tarpo) ir analizuojama: daugiau nei 7 elementų masyvas išsaugo pirmuosius 5 ir paskutinius 2 elementus bei bendrą skaičių, o objektas išsaugo pirmuosius 20 raktų, o kiekvienas masyvo ilgis yra pakeičiamas įdėtu objektu arba masyvo vertės turėtojas. `_remaining_<N>_keys` `{…N keys}`, skaičiuojantis klavišus, nukritusius po pirmųjų 20. Skaliarinės reikšmės nukopijuojamos visos, todėl —, sudarytas iš 20 ar mažiau raktų, be įdėtųjų reikšmių, tik iš naujo įtraukiamas.
5. **`errorMessage`** : išvestis, kurioje bet kur ir bet kokiomis didžiosiomis raidėmis yra `error:`, `error ` (žodis, po kurio yra tarpas, kaip ir `no error found`), `[error]`, `exception:`, `exception `, `[exception]` arba `traceback` išlaiko pirmąją eilutę, kitas 10 eilučių ir paskutines 3, o tarp jų yra `… [N frames elided] …` žymeklis. Žymeklis pasirodo tik tada, kai po pirmosios eilutės yra daugiau nei 13 eilučių, todėl 14 ar mažiau eilučių klaidų išvestis nesutrumpinama (prie 12 ar 13 eilučių paskutinės 3 kartotinės eilutės jau išsaugotos).

Pasibaigus strategijai, net tokiai, kuri nieko negelbsti, vėlesnės strategijos nebandomos. Kai derinimo strategija neišsaugo apskaičiuotų žetonų (ilgis ÷ 4, suapvalintas aukštyn) — pavyzdžiui, kodo tipo failas, sudarytas iš 25 ar mažiau eilučių, arba daugiau nei 2000 simbolių JSON masyvas su 7 ar mažiau elementų — agresyvus variklis išlaiko pradinį įrankio rezultatą: ir skambinantieji `compressAggressive()` ir `compressAnthropicToolResultBlock()` kai `saved` žemiau, o pats `compressToolResult()` vis tiek grąžina tos strategijos išvestį. Įrankio rezultato veiksmas nėra paskutinis žodis: variklio atsarginė suvestinė vis tiek gali sutrumpinti `tool` arba `function` pranešimą, ilgesnį nei 8 192 simboliai (`maxTokensPerMessage`, 2 048, 4 kartus).

#### Kada naudoti

Įrankio rezultato suspaudimas yra 1 agresyvaus variklio veiksmas (`compressAggressive()` in `open-sse/services/compression/aggressive.ts`), todėl jis veikia agresyviu režimu ir `aggressive` žingsniu sukrautame dujotiekyje. Jis suglaudina OpenAI formos `tool` ir `function` pranešimus ir tekstą Anthropic `tool_result` blokuose. Kiekviena strategija turi savo jungiklį po `aggressive.toolStrategies`, viskas įjungta pagal numatytuosius nustatymus. Prietaisų skydelyje jungikliai yra „Caveman“ puslapyje** Išplėstinė** peržiūrėti, kai įjungtas glaudinimas ir numatytasis režimas yra Agresyvus.

### Sukrautas vamzdynas

Veikia sukrautas režimas** keli varikliai iš eilės** — paprastai pirmiausia RTK (60–90% sutaupoma įrankio išvesties), tada „Caveman“ likusiame tekste (~ sutaupoma 46% įvesties). Sudaryta, tai yra** 78–95 % tinkamas diapazonas** (žr. „Upstream Savings Math“ aukščiau): `1 - (1 - 0.60..0.90) × (1 - 0.46)` vidurkis ≈ 89%.

#### Kaip tai veikia

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Kada naudoti

Naudokite sudėtinį režimą:

- Daug įrankių reikalaujančios darbo eigos (agentinis kodavimas, tyrimai)
- Išlaidoms jautrus paketinis apdorojimas
- Kai reikia maksimaliai sutaupyti žetonų

Sudėtiniai vamzdynai konfigūruojami naudojant visuotinį `stackedPipeline` glaudinimo nustatymą arba per pavadintą glaudinimo kombinaciją, priskirtą maršruto parinkimo deriniui (žr. aukščiau esančią Vieno derinio nepaisymas) — o ne naudojant automatinį derinį `modePack` (šis laukas tik persveria automatinio derinio modelio pasirinkimą, o `stacked` nėra tinkamas paketo pavadinimas).

---

## Glaudinimo derinių perrašos

Galite perrašyti visuotinį glaudinimo režimą **kiekvienam deriniui atskirai**, kad tiksliai pritaikytumėte veikimą
skirtingiems naudojimo atvejams:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Tai naudinga šiais atvejais:

- **Programavimo deriniai**: ilgoms sesijoms naudokite `aggressive` režimą
- **Greitų klausimų ir atsakymų deriniai**: greitiems atsakymams naudokite `lite` režimą
- **Daug įrankių naudojantys deriniai**: didžiausiam sutaupymui naudokite `stacked` režimą
- **Produkciniai deriniai**: spartinančiąją atmintinę naudojantiems teikėjams palikite perrašą išjungtą — visada veikiantis
  spartinančiąją atmintinę įvertinantis koregavimas automatiškai pakeičia `aggressive`/`ultra` į `standard`
  (pasirenkamo `cache-aware` režimo nėra)

---

## Taip pat žr.

- [Aplinkos konfigūracija](../reference/ENVIRONMENT.md) — glaudinimo aplinkos kintamieji
- [Architektūros vadovas](../architecture/ARCHITECTURE.md) — vidinė glaudinimo konvejerio sandara
- [Naudotojo vadovas](../guides/USER_GUIDE.md) — glaudinimo naudojimo pradžia
- [RTK glaudinimas](./RTK_COMPRESSION.md) — RTK filtrai, pasitikėjimo modelis, patikros užkarda, neapdorotos išvesties atkūrimas
- [Glaudinimo moduliai](./COMPRESSION_ENGINES.md) — „Caveman“, RTK, `stacked`, API, MCP, valdymo skydelis
- [Glaudinimo taisyklių formatas](./COMPRESSION_RULES_FORMAT.md) — JSON taisyklių paketo formatas
- [Glaudinimo kalbų paketai](./COMPRESSION_LANGUAGE_PACKS.md) — konkrečioms kalboms skirtos „Caveman“ taisyklės
