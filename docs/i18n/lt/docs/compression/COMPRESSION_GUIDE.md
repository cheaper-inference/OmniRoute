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

Saugiausias režimas — jokio semantinio pakeitimo, tik formatavimo sutvarkymas:

| Technika                 | Aprašymas                                                      |
| ------------------------ | -------------------------------------------------------------- |
| `collapseWhitespace`     | Sujungia iš eilės einančias tuščias eilutes ir galinius tarpus |
| `dedupSystemPrompt`      | Pašalina pasikartojančius sistemos pranešimus                  |
| `compressToolResults`    | Glaudina išsamias įrankių/funkcijų išvestis                    |
| `removeRedundantContent` | Šalina pasikartojančias instrukcijas                           |
| `replaceImageUrls`       | Sutrumpina base64 paveikslėlių duomenų URI                     |

**Tinka:** Nuolatiniam naudojimui, saugumui jautrioms darbo eigoms.

### Standartinis režimas (~30 % sutaupoma)

Įkvėptas [Caveman](https://github.com/JuliusBrussee/caveman) — pašalina pildomuosius žodžius ir pernešamai ilgas frazes, išsaugodamas prasmę:

- Pašalina pildomuosius žodžius („please", „I think", „basically", „actually")
- Sutrumpina ilgas frazes („in order to" → „to", „as a result of" → „because")
- Šalina mandagius suvelninimus („Would you mind...", „If you could possibly...")
- Daugiau nei 30 reguliariųjų išraiškų taisyklių, pritaikytų programavimo užklausoms

**Tinka:** Kasdienėms programavimo darbo eigoms, išlaidas taupančioms komandoms.

### Agresyvus režimas (~50 % sutaupoma)

Išmanus istorijos valdymas ilgiems seansams:

- **Pranešimų senėjimas** — senesni pranešimai palaipsniui glaudinami
- **Įrankių rezultatų glaudinimas** — ilgos įrankių išvestys apkertamos arba sutrumpinamos (pirmos/paskutinės eilutės, atitikties eilučių filtravimas, JSON raktų glaudinimas)
- **Struktūros vientisumo apsaugos** — užtikrina, kad `tool_use` + `tool_result` poros išliktų nuoseklios
- **Konteksto lango suvokimas** — atsižvelgia į konkretaus modelio žetonų limitus

**Tinka:** Ilgoms derinimo sesijoms, didelėms kodo bazėms.

### Ultra režimas (~75 % sutaupoma)

Maksimalus glaudinimas situacijoms, kai kritiškai svarbūs žetonai:

- **Euristinis retinimas** — prozos žetonų retinimas pagal balus
- **Struktūros išsaugojimas** — apsiremti kodo blokai, įterptasis kodas, URL ir identifikatoriai pažymimi „tombstone" žymėmis ir vėl sujungiami pažodžiui, niekada neišretinami
- **Neprivalomas SLM lygmuo** — sukonfigūravus, nedidelis vietinis modelis gali patobulinti retinimą
- Nepriklausomas nuo Agresyvaus režimo: nevykdo pranešimų senėjimo, įrankių rezultatų glaudinimo ar atsarginio santraukos sudarytojo (tik SLM lygmens gedimas gali nukreipti atsarginį praejimą per agresyvų režimą)

**Tinka:** Kai nuolat susiduriate su konteksto limitais.

### RTK režimas (60–90 % pirminiame apdorojime)

RTK režimas optimizuotas išsamioms įrankių išvestims, pasitaikančioms kodavimo agentų seansuose:

- Atpažįsta komandų/išvesčių klases, tokias kaip `git status`, `git diff`, `git log`, testų paleidimo įrankiai, TypeScript/Vite/Webpack kūrimai, ESLint/Biome/Prettier, npm audit/installs, Docker žurnalai, infrastruktūros išvestis ir bendroji apvalkalo išvestis
- Taiko JSON filtrų paketus iš `open-sse/services/compression/engines/rtk/filters/`
- Importuoja RTK TOML schemos v1 filtrus iš projekto arba globalių `filters.toml` failų, su tikrinimu integruotais testais ir pasitikėjimo patvirtinimu projekto failams
- Pateikiamas su 56 įtaisytaisiais filtrais su integruotais tikrinimo pavyzdžiais
- Pašalina ANSI valdymo sekas, eigos juostas, pasikartojančias eilutes ir neinformatyvų triukšmą
- Išsaugo gedimus, klaidas, įspėjimus, pakeistus failus, santraukas ir ilgų išvesčių pabaigas
- Palaiko projekto filtrus su pasitikėjimo patvirtinimu, globalius filtrus ir neprivalomą redaguotos žalios išvesties atkūrimą

**Tinka:** Agentų seansams su apvalkalo, kūrimo, testavimo, git, grep ir failų išvesčių transkripcijomis.

### Sluoksniuotas režimas (78–95 % tinkamų duomenų diapazonas)

Sluoksniuotas režimas paleidžia kelis glaudinimo variklius deterministine tvarka. Numatytoji vamzdyno seka:

```txt
RTK -> Caveman
```

Ši tvarka pirmiausia sutvarko terminalo/įrankių išvestį, o tada likusiai natūralios kalbos užklausai pritaiko Caveman semantinį glaudinimą. Sluoksniuotus vamzdynus galima konfigūruoti globaliai arba per glaudinimo kombinacijas, priskirtas maršrutizavimo kombinacijoms.

**Tinka:** Mišriam kontekstui su dideliais įrankių žurnalais ir žmogaus instrukcijomis ar asistento santraukomis.

---

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

### Valdymo skydelis

Eikite į `Dashboard → Context & Cache`:

- **Caveman** — režimo pasirinkimas, kalbų paketai, peržiūra ir visuotinės numatytosios nuostatos
- **RTK** — komandų filtro peržiūra, RTK saugos nuostatos ir filtrų katalogas
- **Compression Combos** — įvardyti variklių konvejeriai, priskirti maršruto parinkimo deriniams
- **Auto-Trigger Threshold** — automatiškai įjungia glaudinimą, kai žetonų skaičius viršija slenkstį

### Atskiro derinio perrašymas

Skiltyje `Dashboard → Context & Cache → Compression Combos` priskirkite glaudinimo derinį maršruto
parinkimo deriniui:

```txt
Derinys: "free-tier-fallback"
  Glaudinimo derinys: "coding-agent-stack"
  Konvejeris: RTK -> Caveman
  Paskirties vietos:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Taip galite naudoti pakopinį glaudinimą su nemokamais / programavimui skirtais teikėjais, o mokamose
prenumeratose palikti „Lite“ režimą.

Šis „atskiro derinio perrašymo“ priskyrimas yra atskiras valdiklis nuo **maršruto parinkimo derinio
glaudinimo režimo** perrašymo (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — lauko
schema taip pat priima `rtk`, `stacked` ir `omniglyph`) — šis perrašymas nepasirenka įvardyto
glaudinimo derinio konvejerio; jis tik nustato lauką `compressionMode`, kurį tikrina
`resolveCompressionPlan`. Jį galima nustatyti derinio kortelėje (`Dashboard → Combos`) arba, nuo
#6760, kiekvienam maršruto parinkimo deriniui atskirai sąraše „Assign to routing“, esančiame
`Dashboard → Context & Cache → Compression Combos`, šalia anksčiau aprašyto konvejerio priskyrimo
žymimojo langelio. Abiejų sąsajų pakeitimai išsaugomi per tą patį `PUT /api/combos/{id}` galinį tašką.

### Atskiros užklausos perrašymas

Siųskite užklausos antraštę `x-omniroute-compression`, kad perrašytumėte vienos užklausos glaudinimo
planą. Jai teikiama aukščiausia pirmenybė — ji yra viršesnė už maršruto parinkimo derinio perrašymą,
aktyvų profilį, automatinį suaktyvinimą ir skydelio nuostatą „Default“. Nežinomos reikšmės ignoruojamos
(užklausa niekada neatmetama), o visuotinis pagrindinis jungiklis vis tiek viską valdo: kai glaudinimas
visuotinai išjungtas, antraštė negali jo įjungti. Reikšmės:

| Reikšmė       | Poveikis                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| `off`         | Šiai užklausai glaudinimas netaikomas.                                                                        |
| `default`     | Iš skydelio nustatytas „Default“ profilis (aktyvus profilis ignoruojamas). Nuostolingi varikliai neįjungiami. |
| `safe`        | Tas pats, kaip nenurodyti antraštės: tik dublikatų šalinimas ir tarpų sujungimas.                             |
| `allow-lossy` | Išlaikomas šios užklausos operatoriaus planas, įskaitant santraukas, aktualumo filtrus ir stiliaus keitimus.  |
| `engine:<id>` | Vienas variklis, jei įjungtas, pvz., `engine:rtk`. Taip šis variklis įjungiamas konkrečiai užklausai.         |
| `<combo>`     | Įvardytas derinys, pirmiausia ieškomas pagal pavadinimą (nepaisant raidžių dydžio), tada pagal ID.            |

Nenurodžius `allow-lossy`, `engine:<id>` arba įvardyto derinio, nuostolingi varikliai netaikomi.
Kai glaudinimas įjungtas, užklausai vis tiek taikomas seanso dublikatų šalinimas ir tarpų sujungimas.

Pritaikytas planas grąžinamas atsakymo antraštėje `X-OmniRoute-Compression: <mode>; source=<source>`,
kur `<source>` yra viena iš šių reikšmių: `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` arba `off`.

### API

```bash
# Gauti glaudinimo nuostatas
curl http://localhost:20128/api/settings/compression

# Atnaujinti glaudinimo nuostatas
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Peržiūrėti konkretų RTK / pakopinį naudingąjį turinį
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Išvardyti RTK filtrų paketus
curl http://localhost:20128/api/context/rtk/filters

# Tiesiogiai išbandyti RTK su pasirenkamais komandos metaduomenimis
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

## Pažangios glaudinimo sistemos

Be 7 pirmiau aprašytų režimų (šaltinis taip pat priima `codex-responses` ir
`omniglyph` režimus, kurių šis vadovas neaptaria), tolesniuose skyriuose aprašomos funkcijos,
veikiančios šių režimų viduje arba kartu su jais: įrankių rezultatų glaudinimas ir progresyvus senėjimas
yra agresyviojo variklio 1 ir 2 veiksmai (agresyvusis režimas ir `aggressive` veiksmas
sudėtinėje apdorojimo sekoje), sudėtinė apdorojimo seka nurodo, kaip veikia sudėtinis režimas, podėlio paisantis glaudinimas
pakeičia `aggressive` ir `ultra` į `standard`, kai naudojami podėlį palaikantys teikėjai ir glaudinimas
yra įjungtas, o urvinio žmogaus išvesties režimas ir išvesties stiliai yra pasirenkamos sistemos raginimo instrukcijos,
pagal numatytąsias nuostatas išjungtos, kurios formuoja modelio išvestį, užuot glaudinusios užklausą.

### Podėlio paisantis glaudinimas

Kai kurie teikėjai (pvz., „Anthropic“ su raginimų kaupimu podėlyje) palaiko **raginimų kaupimą podėlyje**,
todėl jie gali išsaugoti dalį raginimo podėlyje, kad sumažintų išlaidas ir delsą. Kai
kaupimas podėlyje įjungtas, agresyvus glaudinimas iš tikrųjų gali **pabloginti** našumą,
nes pakeičia podėlyje saugomas leksemas ir taip padaro podėlį nebegaliojantį.

Modulis `cachingAware.ts` tai išsprendžia **aptikdamas kaupimo podėlyje kontekstą** ir
atitinkamai **pakoreguodamas glaudinimo strategiją**.

#### Kaip tai veikia

1. **Aptinkamas kaupimo podėlyje kontekstas** — užklausos turinyje ieškoma `cache_control` žymų
2. **Nustatomi podėlį palaikantys teikėjai** — tikrinama, ar tikslinis teikėjas palaiko kaupimą podėlyje
3. **Koreguojama strategija** — `aggressive` / `ultra` pakeičiama į `standard`, kai naudojami podėlį palaikantys teikėjai
4. **Praleidžiamas sistemos raginimas** — sistemos raginimai paprastai saugomi podėlyje, todėl jų nereikia glaudinti

Strategijos pagalbinė funkcija taip pat grąžina `deterministicOnly` žymę, tačiau plano kūrimo priemonė naudoja
tik strategiją — šiuo metu joks tolesnis komponentas šios žymės neskaito.

#### Kodo pavyzdys

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Podėlio žyma
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kada naudoti

Podėlio paisantis glaudinimas yra **visada įjungtas** — konfigūruoti nereikia. Jis suaktyvinamas,
kai glaudinimas įjungtas ir tikslinis teikėjas palaiko raginimų kaupimą podėlyje („Anthropic“, „OpenAI“
ir kt.); aiškios `cache_control` žymos nėra būtinos — pakanka vien podėlį palaikančio teikėjo,
kad būtų pereita prie paprastesnės strategijos, o vien žymos to niekada nesukelia (žymų aptikimas naudojamas podėlio
telemetrijai, o ne strategijos sprendimui).

### Progresyvus senėjimas

Ilguose pokalbiuose susikaupia daug pranešimų eilių, tačiau senesnės eilės tampa mažiau
aktualios. Modulis `progressiveAging.ts` **supaprastina pranešimus pagal eilių atstumą**
(atstumas matuojamas nuo pokalbio pabaigos). Su pateikiamomis numatytosiomis nuostatomis
(`verbatim: 2, light: 2, moderate: 3`):

- **Paskutinės 2 eilės (atstumas ≤ 2)**: paliekamos pažodžiui
- **Atstumas 3**: urvinio žmogaus glaudinimas (užpildančio teksto šalinimas)
- **Atstumas 4+**: asistento pranešimai apibendrinami; naudotojo pranešimai sutrumpinami iki pirmosios
  eilutės, neviršijant 120 simbolių; kiti vaidmenys nekeičiami. Sistemos raginimai, jau pasendinti
  pranešimai ir naujausias naudotojo pranešimas visada paliekami pažodžiui, neatsižvelgiant į atstumą.
  Niekas nėra visiškai pašalinama, o `light`
  intervalas nepasiekiamas su pateikiamomis numatytosiomis nuostatomis (`light` lygus `verbatim`).

#### Kodo pavyzdys

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... dar 50 eilių ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // paskutinės 3 eilės: pažodžiui
  light: 8, // atstumas <= 8: lengvas glaudinimas
  moderate: 20, // atstumas <= 20: urvinio žmogaus glaudinimas
  fullSummary: 5, // reikalaujama pagal tipą, bet intervalų parinkimo kodas neskaito
  // atstumas > 20: apibendrinama (asistento) / paliekama pirmoji eilutė (naudotojo)
});

// saved = sutaupytų leksemų skaičius
```

#### Kada naudoti

Progresyvus senėjimas yra **visada įjungtas** naudojant `aggressive` režimą — tai 2-asis
`compressAggressive()` veiksmas. „Ultra“ režimas jo nevykdo. Jis
ypač veiksmingas:

- Ilgai trunkančiose programavimo sesijose
- Kelias dienas trunkančiuose pokalbiuose
- Agentinėse darbo eigose su daugybe įrankių iškvietimų

### Urvinio žmogaus išvesties režimas

Urvinio žmogaus išvesties režimas prideda **sistemos raginimo instrukcijas**, prašančias paties modelio
pateikti glaustą išvestį — `lite` lygis prašo glaustų atsakymų, išlaikant pilnus sakinius, `full`
prašo „atsakyti glaustai kaip protingas urvinis žmogus“, o `ultra` prašo telegrafinės išvesties;
instrukcijos tik prašo, todėl negali to garantuoti. Užklausos jas gauna per
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` pirmiausia nustato pasirinkimą naudodamas atgalinio suderinamumo tarpinį sluoksnį
(`resolveOutputStyleSelection()`, esantį
`open-sse/services/compression/outputStyles/backCompat.ts`), kuris, kol `outputStyles`
yra tuščias, susieja įjungtą `cavemanOutputMode` su `terse-prose` išvesties stiliumi,
naudodamas `cavemanOutputMode.intensity` (žr. toliau esantį skyrių apie atgalinį suderinamumą); netuščias `outputStyles`
pasirinkimas naudojamas toks, koks yra, o `cavemanOutputMode.enabled` ir `intensity` tuomet neturi jokio
poveikio, tačiau jo `autoClarity` jungiklis vis tiek taikomas. Faile `outputMode.ts` yra
instrukcijų tekstai (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), turinio apėjimo ir
išdėstymo pagalbinė funkcija, kurią naudoja įterpimas; jo paties `applyCavemanOutputMode()` įterpimo funkcija
gamybinėje aplinkoje niekur nekviečiama.

#### Kaip tai veikia

Šis režimas neglaudina įvesties. Jis prideda instrukcijų bloką prie sistemos raginimo
(žr. toliau „Kaip veikia įterpimas“), o bet kuris užklausai pasirinktas įvesties glaudinimo režimas
po to vis tiek vykdomas turiniui, kuriame jau yra šis blokas. Prieš bendrą
ribų sąlygą, kuria baigiasi kiekvienas lygis, angliškas `full` lygis yra toks:

> „Atsakyk glaustai kaip protingas urvinis žmogus. Praleisk artikelius (a/an/the), užpildančius žodžius (just/really/basically/actually/simply), mandagumo frazes, išlygas. Fragmentai tinka. Naudok trumpus sinonimus (big, o ne extensive; fix, o ne implement). Tiksliai išlaikyk visą techninę esmę, kodą, klaidas, URL ir identifikatorius.“

Tai ypač gerai veikia:

- Generuojant kodą (glaustesnė išvestis = mažiau žetonų)
- Greitiems klausimams ir atsakymams (nereikia išsamių paaiškinimų)
- Paketiniam apdorojimui (didžiausiam pralaidumui)

#### Kada naudoti

Urvinio žmogaus išvesties režimas yra **pasirenkamas**. Įjungę glaudinimą (`enabled: true`, pagrindinis jungiklis
puslapyje „Compression Settings“), įjunkite jį naudodami `cavemanOutputMode.enabled`; `intensity`
parenka `lite`, `full` arba `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Glaudinimo derinio jungiklis **Output Mode** (`outputMode`, o lygis nurodomas `outputModeIntensity`)
nustato tą patį jungiklį užklausoms, kurioms taikomas tas derinys, o
`omniroute_set_compression_engine` MCP įrankis jį įrašo per loginį argumentą `outputMode`.
Netuščias `outputStyles` pasirinkimas turi pirmenybę prieš šį jungiklį. Valdymo skydelyje įjungus
**Terse prose** išvesties stilių įterpiamas tas pats blokas (žr. toliau „Išvesties stiliai“).

### Išvesties stiliai (katalogas)

Aukščiau aprašytas urvinio žmogaus išvesties režimas yra **senasis vieno stiliaus kelias**. 4-ajame etape jis buvo apibendrintas
į derinamų išvesties stilių katalogą: `OUTPUT_STYLE_CATALOG`, esantį
`open-sse/services/compression/outputStyles/catalog.ts`. Kiekvienas stilius yra sistemos raginimo
instrukcija, nurodanti pačiam modeliui generuoti taupesnę išvestį; stilius galima įjungti
kartu, jie įterpiami katalogo tvarka.

| Stilius                                          | `id`            | Ką jis daro                                                                                                                                                                                                                                                                                                      | Instrukcijų kalbos                            |
| ------------------------------------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Glausta proza                                    | `terse-prose`   | Praleidžia užpildančius žodžius, artikelius ir išlygas; tiksliai išlaiko techninę esmę. Tas pats tekstas kaip senajame urvinio žmogaus išvesties režime (nurodomas per nuorodą, o ne kartojamas).                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mažiau kodo                                      | `less-code`     | YAGNI pakopos: mažiausias veikiantis pakeitimas, jokių neprašytų abstrakcijų.                                                                                                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Arklio uodega (tingus vyresnysis programuotojas) | `ponytail`      | „Geriausias kodas yra niekada neparašytas kodas“: pakartotinis naudojimas > perrašymas, pagrindinė priežastis > simptomas, trumpiausias veikiantis pakeitimų rinkinys.                                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Turiu ADHD (pirmiausia veiksmas)                 | `i-have-adhd`   | Pirmiausia veiksmas (komanda / kelias / fragmentas prieš tekstą), numeruoti ir riboti žingsniai, VIENAS konkretus kitas žingsnis, jokios įžangos, santraukos ar baigiamųjų frazių. Pritaikyta iš [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filtras                              | `antislop-ui`   | Kiekviena vaizdinė technika turi atitikti paskirties kriterijų (hierarchija, tapatybė, įskaitomumas); jokių numatytųjų gradientų, stiklo ar švytėjimo efektų, ribota paletė, jokių šabloninių išdėstymų. Abu antislop stiliai nustato ribą: jokių neveikiančių valdiklių ir išgalvotų teiginių.                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop tekstų ir žmogiškumo filtras            | `antislop-copy` | Konkretus tekstas (be ilgojo brūkšnio, bendrinių raginimų veikti, madingų žodelių, pokalbių roboto baigiamųjų frazių ar išgalvotų faktų) ir žmonėms skirtos taisyklės: WCAG AA kontrastas, matomas fokusas, pasiekiamumas klaviatūra, tuščios, įkėlimo ir klaidos būsenos, prisitaikymas mobiliajame įrenginyje. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Glausta CJK (文言)                               | `terse-cjk`     | `full` / `ultra` atsakymas klasikine kinų kalba (文言); `lite` tik prašo trumpų atsakymų be funkcinių žodžių, mandagumo frazių ar pagražinimų.                                                                                                                                                                   | zh (ribojama pagal lokalę, žr. toliau)        |

Kiekvienas stilius turi tris intensyvumo lygius — `lite`, `full`, `ultra` — ir kiekvienas lygis
baigiasi bendra ribų sąlyga (`SHARED_BOUNDARIES`, esanti `outputMode.ts`), kuri
tiksliai išlaiko kodo blokus, failų kelius, komandas, klaidas ir URL. `terse-prose` ir
`terse-cjk` lygių tekstuose į šį sąrašą taip pat įtraukiami identifikatoriai.

`terse-cjk` ribojamas iki `zh` lokalės dviejose vietose. Puslapyje „Compression Settings“ jo
eilutė rodoma tik tada, kai valdymo skydelio UI kalba yra kinų (`zh-CN` arba `zh-TW`), o
`applyOutputStyles()` jį įterpia tik tada, kai nustatyta užklausos kalba (žr. toliau „Kalbos
pasirinkimas“) yra `zh`. Paslėpus eilutę, išsaugotas `terse-cjk` pasirinkimas neišvalomas:
nustatymų API priima bet kurį stiliaus id, o puslapyje išsaugant kitus stilius jis išlaikomas.
Apdorojant užklausą, `applyOutputStyles()` kalbos patikra yra vienintelis lokalės apribojimas.

#### Kaip veikia įterpimas

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) atrenka
pasirinkimą pagal katalogą (nežinomi ID ir lokalės neatitinkantys stiliai atmetami, tačiau
tai niekada nelaikoma klaida; jei iš pasirinkimo negaunamas nė vienas stilius, turinys
paliekamas nepakeistas ir praleidžiamas kaip `no_styles`), sujungia pasirinktas instrukcijas
katalogo tvarka,
**vieną kartą** prideda ribų sąlygą (taip pat saugos sąlygą, `SAFETY_BOUNDARIES` arba jos
vertimą, kai pasirinktas `less-code` arba `ponytail`) ir pradeda bloką vienu
idempotentiškumo žymekliu (`[OmniRoute Output Styles]`), todėl pakartotinis pritaikymas
nieko nekeičia. Kai nustatyta kalba (žr. toliau pateiktą skiltį „Kalbos pasirinkimas“)
turi vertimą, vietoje angliškos instrukcijos įterpiama lokalizuota instrukcija.

Turinyje su netuščiu `messages` masyvu idempotentiškumo patikra atliekama prieš
turinio apėjimą: kai `[OmniRoute Output Styles]` žymeklis jau yra aukščiausio lygio
`system` lauke (eilutėje arba turinio blokų masyve) arba sistemos pranešime su eilutės
turiniu, turinys paliekamas nepakeistas kaip `already_applied` ir raktažodžiai
netikrinami. Kitu atveju turinio apėjimo funkcija (`shouldBypassCavemanOutputMode()`,
esanti `open-sse/services/compression/outputMode.ts`) patikrina paskutinių trijų
pranešimų tekstą, neatsižvelgdama į jų vaidmenį, ir praleidžia visos užklausos stilius,
kai tas tekstas atitinka saugos, neatšaukiamo veiksmo ar patikslinimo raktažodžius arba
nuo tvarkos priklausomą seką: po `first`, `then`, `after that`, `before`, `rollback`
arba `backup` ne daugiau kaip už 240 simbolių eina `delete`, `drop`, `migrate`, `deploy`
arba `release`. Apėjimas vykdomas, kol įjungtas **Auto-Clarity Bypass** jungiklis
(`cavemanOutputMode.autoClarity`, pagal numatytuosius nustatymus įjungtas); išjungus
jungiklį raktažodžių patikra praleidžiama.

Kai apėjimas leidžia apdoroti užklausą, `placeSystemInstruction()` (tame pačiame faile),
kuri niekada nesukuria naujo `messages[0]`, įdeda bloką į pirmą rastą vietą iš šių:

1. Pradinis sistemos pranešimas su eilutės turiniu: blokas pridedamas po jo tekstu.
2. Aukščiausio lygio `system` laukas: blokas pridedamas po eilutės teksto arba
   įtraukiamas į turinio blokų masyvą kaip naujas teksto blokas.
3. Pirmas vėliau esantis sistemos pranešimas su eilutės turiniu: blokas pridedamas po jo
   tekstu.
4. Nė vienas iš pirmiau nurodytų variantų: blokas įdedamas į naują sistemos pranešimą
   `messages` pabaigoje.

Turinyje be `messages` masyvo (arba su tuščiu masyvu) turinio apėjimas nevykdomas ir
neatsižvelgiama į aukščiausio lygio `system` lauką. Blokas pridedamas po eilutės tipo
`instructions` lauko teksto, nebent tame lauke jau yra `[OmniRoute Output Styles]`
žymeklis – tokiu atveju turinys paliekamas nepakeistas kaip `already_applied`. Kai
turinyje nėra eilutės tipo `instructions` lauko, tačiau yra `input` (eilutė arba masyvas),
blokas tampa `instructions`, pakeisdamas bet kokią tame lauke buvusią ne eilutės tipo
reikšmę. Turinys, kuriame nėra nei eilutės tipo `instructions` lauko, nei eilutės ar
masyvo tipo `input`, paliekamas nepakeistas ir praleidžiamas kaip `no_messages`.

#### Kaip įjungti

Valdymo skydelyje: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), išvesties stilių skiltyje: kiekvienam stiliui skirta
atskira eilutė su įjungimo / išjungimo jungikliu ir lygio parinkikliu. Stiliai įterpiami,
kol įjungtas pats glaudinimas (puslapio pagrindinis jungiklis `enabled`).
**Auto-Clarity Bypass** jungiklis yra **Caveman** puslapio
(`/dashboard/context/caveman`) kortelėje **Output Mode**. Programiškai glaudinimo
konfigūracijoje pasirinkimas išsaugomas taip:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Atgalinis suderinamumas: kol `outputStyles` yra tuščias, senasis
`cavemanOutputMode.enabled` nustatymas susiejamas su `terse-prose`, naudojant
`cavemanOutputMode.intensity`. Tada blokas prasideda `[OmniRoute Output Styles]`
žymekliu, o senasis `applyCavemanOutputMode()` įterpiklis įrašydavo
`[OmniRoute Caveman Output Mode]`. Po žymekliu esantis tekstas sutampa su senuoju
įterptu tekstu en, pt-BR, es, de, fr, it, ru, id ir vi kalbomis; ja ir zh kalbomis prieš
ribų sąlygą yra vienas papildomas tarpas. `terse-prose` išverstas į pt-BR, es, de, fr,
it, ru, zh, ja, id ir vi kalbas, todėl užklausa, kurios nustatyta kalba yra `hu`, gauna
anglišką tekstą, nors senasis įterpiklis naudodavo vengrišką tekstą.

Išvesties stiliaus kalbos pasirinkimas (`resolveOutputStyleLanguage()`, esanti
`outputStyles/apply.ts`): kai `languageConfig.enabled` įjungtas, `autoDetect` paima
naujausią tekstą turintį naudotojo pranešimą iš užklausos `messages` masyvo (eilutės
turinį arba jo turinio dalių `text`) ir perduoda jį „Caveman“ variklio aptikimo funkcijai
(`detectCompressionLanguage()`). Aptikimo funkcija grąžina `zh`, jei tekste yra Han
rašmenų ir nėra kanos; kitu atveju ji grąžina tą iš `it`, `pt-BR`, `es`, `de`, `fr`,
`ru`, `ja`, `hu` ir `id`, kuriai rasta daugiausia užuominų atitikmenų, arba `en`, jei
nerasta nė vieno atitikmens – tekstui, kurio ji negali klasifikuoti, priskiriama anglų
kalba, niekada ne `defaultLanguage`, o `vi` niekada neaptinkama, nors stiliai pateikiami
su `vi` tekstu. „Responses API“ turinys savo dialogo eiles saugo `input`, kuris
nenuskaitomas, todėl jam pritaikoma `defaultLanguage`, o tada anglų kalba. Kai nė vienas
`messages` naudotojo pranešimas neturi teksto arba kai `autoDetect` išjungtas, taikoma
`defaultLanguage`, o tada anglų kalba. Kai `languageConfig.enabled` išjungtas, naudojama
anglų kalba, nebent užklausai taikomas glaudinimo derinys (užklausos maršruto parinkimo
deriniui priskirtas derinys arba numatytasis glaudinimo derinys, kurį `chatCore` naudoja
kaip atsarginį integruotam sudėtiniam konvejeriui): pritaikius derinį, tai užklausai
įjungiamas `languageConfig.enabled` ir `defaultLanguage` nustatoma pagal derinio kalbų
paketus (naudojama išsaugota reikšmė, jei ji yra vienas iš derinio paketų; kitu atveju
naudojamas pirmasis derinio paketas, kurio numatytoji reikšmė yra `en`), o išsaugotas
`autoDetect` nustatymas (pagal numatytuosius nustatymus įjungtas) ir toliau taikomas.
„Caveman“ įvesties variklis savo taisyklių paketo kalbą parenka kitaip – kiekvienai
teksto daliai atskirai, o išjungus automatinį aptikimą, pasirinkimą riboja
`enabledPacks`.

Stiliaus × kalbos matrica yra įtvirtinta faile
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: kiekvienam katalogo stiliui reikia
įrašo testo `BASELINE_LANGUAGES`; pagal lokalę neribojamas stilius turi būti pateikiamas su
pt-BR vertimu (pagal lokalę ribojamam `terse-cjk` ši taisyklė netaikoma), nebent jis yra
įtrauktas į `KNOWN_ENGLISH_ONLY`, kuriame gali būti tik visiškai jokių vertimų neturintys stiliai —
jei į sąrašą įtrauktas stilius turi bent vieną vertimą, testas nepavyksta; be to, stiliaus testas
nepavyksta, kai jis praranda kalbą, nurodytą jo `BASELINE_LANGUAGES` įraše. Kaip pridėti stilių, žr.
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Įrankio rezultato glaudinimas

`compressToolResult()`, esanti `open-sse/services/compression/toolResultCompressor.ts`,
glaudina įrankio rezultato tekstą naudodama **5 strategijas**. Jos išbandomos šia tvarka, o
rezultatą nulemia pirmoji įjungta strategija, kurios patikra atitinka turinį:

1. **`fileContent`**: 3 ar daugiau eilučių turinys, kuriame bent viena eilutė, neatsižvelgiant
   į pradines įtraukas, prasideda `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` arba `return ` (raktažodis ir tarpas), arba `if`,
   `for` ar `while`, po kurio eina `(` arba ` (`, išsaugo pirmąsias 20 ir paskutines 5 eilutes,
   o pašalinta vidurinė dalis pažymima.
2. **`grepSearch`**: turinyje, kuriame yra bent viena `<path>:<digits>:` formos eilutė,
   kurioje prieš pirmąjį dvitaškį esančiame tekste nėra tarpų, išsaugomos tik tokios eilutės,
   daugiausia 30, po jų pateikiamas likusių atitikmenų skaičius ir sutapusių failų sąrašas;
   visos kitos eilutės pašalinamos. Strategijai suaktyvinti pakanka vienos tokios eilutės, todėl
   žurnalo eilutė, prasidedanti laiko žyma, pvz., `12:30:45`, taip pat laikoma atitikmeniu.
3. **`shellOutput`**: išvestyje, kurioje yra ANSI CSI seka (`ESC[`, tada skaitmenys arba
   kabliataškiai, o po jų raidė, kaip spalvų koduose) arba bet kurioje teksto vietoje po `$`
   eina tarpas, šios sekos pašalinamos (kitos valdymo sekos, pvz., `ESC[?25l` arba
   OSC lango pavadinimo seka, išsaugomos), o paskutinės 50 eilučių išsaugomos, sutraukiant
   paeiliui pasikartojančias eilutes. Kadangi ši patikra vykdoma prieš `json` ir `errorMessage`,
   JSON arba klaidos išvestis, kurioje yra toks `$`, jų niekada nepasiekia, kol įjungta
   `shellOutput`.
4. **`json`**: daugiau nei 2 000 simbolių JSON naudingoji apkrova, kuri prasideda `{` arba `[`
   (po nebūtinų tarpų) ir yra sėkmingai išanalizuojama, yra apibendrinama: daugiau nei 7 elementų
   masyve išsaugomi pirmieji 5 bei paskutiniai 2 elementai ir bendras jų skaičius, o objekte
   išsaugomi pirmieji 20 raktų, kiekvieną įdėtojo objekto ar masyvo reikšmę pakeičiant
   `{…N keys}` vietaženkliu (masyvo atveju N yra jo ilgis) ir pridedant
   `_remaining_<N>_keys` žymeklį, nurodantį po pirmųjų 20 pašalintų raktų skaičių.
   Skaliarinės reikšmės nukopijuojamos visos, todėl 20 ar mažiau raktų turintis objektas be
   įdėtųjų reikšmių tik performatuojamas su įtraukomis — suglaudinta jo versija pailgėja
   ir lieka nepakeista.
5. **`errorMessage`**: išvestyje, kurioje bet kur ir neatsižvelgiant į raidžių registrą yra
   `error:`, `error ` (žodis, po kurio eina tarpas, kaip `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` arba `traceback`, išsaugoma pirmoji eilutė,
   kitos 10 eilučių ir paskutinės 3, o tarp jų esančios eilutės pakeičiamos
   `… [N frames elided] …` žymekliu. Žymeklis rodomas tik tada, kai po pirmosios eilutės yra
   daugiau nei 13 eilučių, todėl 14 ar mažiau eilučių klaidos išvestis nesutrumpinama
   (kai yra 12 arba 13 eilučių, paskutinės 3 pakartoja jau išsaugotas eilutes).

Kai strategija atitinka, vėlesnės strategijos nebebandomos, net jei ji nieko nesutaupo.
Kai atitikusi strategija nesutaupo nė vieno apskaičiuoto žetono (ilgis ÷ 4, suapvalinus į
didesnę pusę) — pavyzdžiui, kai į kodą panašus failas turi 25 ar mažiau eilučių arba daugiau
nei 2 000 simbolių JSON masyvas turi 7 ar mažiau elementų — agresyvusis variklis išsaugo
pradinį įrankio rezultatą: abi kviečiančiosios funkcijos (`compressAggressive()` ir
`compressAnthropicToolResultBlock()`) išsaugo originalą, kai `saved` yra 0 arba mažiau,
nors pati `compressToolResult()` vis tiek grąžina tos strategijos išvestį. Įrankio rezultato
etapas nėra galutinis: variklio atsarginis apibendrinimo mechanizmas vis tiek gali sutrumpinti
`tool` arba `function` pranešimą, ilgesnį nei 8 192 simboliai (`maxTokensPerMessage`, 2 048,
padauginta iš 4).

#### Kada naudoti

Įrankio rezultato glaudinimas yra 1-asis agresyviojo variklio etapas (`compressAggressive()`,
esanti `open-sse/services/compression/aggressive.ts`), todėl jis vykdomas agresyviuoju režimu
ir sudėtinio konvejerio `aggressive` etape. Jis glaudina OpenAI formato `tool` bei `function`
pranešimus ir tekstą Anthropic `tool_result` blokuose. Kiekviena strategija turi atskirą
jungiklį skiltyje `aggressive.toolStrategies`; pagal numatytuosius nustatymus visi jie įjungti.
Valdymo skydelyje jungikliai yra Caveman puslapio **Advanced** rodinyje, kai glaudinimas
įjungtas, o numatytasis režimas yra Aggressive.

### Sudėtinis konvejeris

Sudėtinis režimas paleidžia **kelis variklius iš eilės** — paprastai pirmiausia RTK
(60–90 % sutaupoma įrankių išvestyje), tada Caveman likusiam tekstui (~46 % sutaupoma
įvestyje). Juos sujungus gaunamas **78–95 % tinkamo turinio sutaupymo intervalas** (žr.
aukščiau pateiktą „Upstream Savings Math“): `1 - (1 - 0.60..0.90) × (1 - 0.46)` vidutiniškai
sudaro ≈89 %.

#### Kaip tai veikia

```
Įvestis (1000 žetonų)
  → RTK (komandas atpažįstantis filtras) → 200 žetonų
    → Caveman (perteklinio teksto šalinimas) → 108 žetonai
  → Išvestis (108 žetonai, sutaupyta ~89 %)
```

#### Kada naudoti

Naudokite sudėtinį režimą:

- Darbo eigoms, kuriose intensyviai naudojami įrankiai (agentinis programavimas, tyrimai)
- Išlaidoms jautriam paketiniam apdorojimui
- Kai reikia maksimaliai sutaupyti žetonų

Sudėtiniai konvejeriai konfigūruojami naudojant visuotinį `stackedPipeline` glaudinimo
nustatymą arba pavadintą glaudinimo derinį, priskirtą maršruto parinkimo deriniui (žr.
aukščiau pateiktą „Per-Combo Override“) — ne naudojant automatinio derinio `modePack`
(tas laukas tik persveria automatinio derinio modelių pasirinkimą, o `stacked` nėra
leistinas paketo pavadinimas).

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
