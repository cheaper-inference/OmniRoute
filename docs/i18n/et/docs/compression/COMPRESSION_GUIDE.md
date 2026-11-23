# 🗜️ Prompt Compression Guide — OmniRoute (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Säästke sobiva konteksti puhul automaatselt 15–95%. Kiire ülevaate leiate [README tihendamise jaotisest](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Ülevaade

OmniRoute rakendab modulaarset viipade tihendamise konveierit, mis käivitatakse **ennetavalt** enne päringute edastamist teenusepakkujatele. See tähendab, et tokenite säästmine toimub läbipaistvalt — teie töövoogu pole vaja muuta.

```
Kliendi päring
  → Tihendusstrateegia valija
    → Kombinatsiooni alistus? → Kasuta kombinatsiooni seadistust
    → Automaatse käivitamise lävi? → Kasuta automaatrežiimi
    → Vaikerežiim? → Kasuta üldist seadistust
    → Väljas? → Jäta tihendamine vahele
  → Valitud tihendusrežiim
    → Väljas: tihendamist ei toimu
    → Kerge: turvaline tühimärkide/vorminduse korrastus (~15%)
    → Standardne: Cavemani-stiilis täitesõnade eemaldamine (~30%)
    → Agressiivne: ajaloo vanandamine + kokkuvõtete loomine (~50%)
    → Ultra: heuristiline kärpimine + koodiplokkide hõrendamine (~75%)
    → RTK: käsuteadlik terminali-/tööriistaväljundi filtreerimine (60–90% ülesvooluvahemik)
    → Virnastatud: järjestatud mitme mootoriga konveier, tavaliselt RTK ja seejärel Caveman (78–95% sobivusvahemik)
  → Tihendatud päring → Teenusepakkuja
```

---

## Tihendusrežiimid

### Väljas

Tihendamist ei rakendata. Kõik sõnumid edastatakse muutmata kujul.

### Kerge režiim (~15% säästu, <1ms latentsus)

Kõige turvalisem režiim — semantilisi muudatusi pole, korrastatakse ainult vormindust:

| Tehnika                  | Kirjeldus                                                   |
| ------------------------ | ----------------------------------------------------------- |
| `collapseWhitespace`     | Järjestikuste tühjade ridade ja lõputühikute ühendamine     |
| `dedupSystemPrompt`      | Dubleerivate süsteemisõnumite eemaldamine                   |
| `compressToolResults`    | Paljusõnaliste tööriista-/funktsiooniväljundite tihendamine |
| `removeRedundantContent` | Korduvate juhiste eemaldamine                               |
| `replaceImageUrls`       | Base64-kujutiste andme-URI-de lühendamine                   |

**Sobib kõige paremini:** pidevaks kasutamiseks ja ohutuskriitilisteks töövoogudeks.

### Standardrežiim (~30% säästu)

Inspireeritud projektist [Caveman](https://github.com/JuliusBrussee/caveman) — eemaldab täitesõnu ja paljusõnalisi väljendeid, säilitades samal ajal tähenduse:

- Eemaldab täitesõnad („palun“, „ma arvan“, „põhimõtteliselt“, „tegelikult“)
- Lühendab paljusõnalisi väljendeid („selleks, et“ → „et“, „selle tulemusena“ → „sest“)
- Eemaldab viisaka pehmendamise („Kas teil oleks võimalik...“, „Kui saaksite ehk...“)
- Üle 30 regulaaravaldise reegli, mis on kohandatud programmeerimisviipadele

**Sobib kõige paremini:** igapäevasteks programmeerimistöövoogudeks ja kuluteadlikele meeskondadele.

### Agressiivne režiim (~50% säästu)

Nutikas ajaloo haldamine pikkade seansside jaoks:

- **Sõnumite vanandamine** — vanemaid sõnumeid tihendatakse järjest rohkem
- **Tööriistatulemuste tihendamine** — pikad tööriistaväljundid kärbitakse või jäetakse välja (esimesed/viimased read,
  sobivate ridade filtreerimine, JSON-võtmete tihendamine)
- **Struktuurse tervikluse kaitsed** — tagavad, et `tool_use` + `tool_result` paarid püsivad kooskõlas
- **Kontekstiakna arvestamine** — järgib iga mudeli tokenipiiranguid

**Sobib kõige paremini:** pikkadeks silumisseanssideks ja suurte koodibaaside jaoks.

### Ultra-režiim (~75% säästu)

Maksimaalne tihendamine tokenikriitiliste olukordade jaoks:

- **Heuristiline kärpimine** — proosa skooripõhine tokenite kärpimine
- **Struktuuri säilitamine** — piirdega koodiplokid, reasisesed koodiosad, URL-id ja identifikaatorid
  asendatakse ajutiste tähistega ning taastatakse sõna-sõnalt; neid ei kärbita kunagi
- **Valikuline SLM-aste** — seadistamise korral saab väike kohalik mudel kärpimist täiustada
- Agressiivsest režiimist sõltumatu: see ei kasuta sõnumite vanandamist, tööriistatulemuste tihendamist
  ega varukokkuvõtjat (ainult SLM-astme tõrge võib suunata varutöötluse läbi
  agressiivse režiimi)

**Sobib kõige paremini:** kui jõuate korduvalt kontekstipiiranguteni.

### RTK-režiim (60–90% ülesvooluvahemik)

RTK-režiim on optimeeritud programmeerimisagentide seanssides esinevate paljusõnaliste tööriistaväljundite jaoks:

- Tuvastab käsu-/väljundiklassid, nagu `git status`, `git diff`, `git log`, testikäitajad,
  TypeScripti/Vite'i/Webpacki järgud, ESLint/Biome/Prettier, npm-i auditid/paigaldused, Dockeri logid, taristu
  väljund ja üldine kestaväljund
- Rakendab JSON-filtripakette asukohast `open-sse/services/compression/engines/rtk/filters/`
- Impordib RTK TOML-i skeemi v1 filtrid projekti või üldistest `filters.toml` failidest koos tekstisiseste testide
  valideerimise ja projektifailide usalduspõhise piiramisega
- Sisaldab 55 sisseehitatud filtrit koos tekstisiseste kontrollnäidistega
- Eemaldab ANSI juhtjärjendid, edenemisribad, korduvad read ja mittevajaliku müra
- Säilitab nurjumised, vead, hoiatused, muudetud failid, kokkuvõtted ja pika väljundi lõpuosa
- Toetab usalduspõhiselt piiratud projektifiltreid, üldisi filtreid ja valikulist redigeeritud toorväljundi taastamist

**Sobib kõige paremini:** agendiseanssideks, mis sisaldavad kesta-, järgu-, testi-, git-, grep- ja failiväljundite transkripte.

### Virnastatud režiim (78–95% sobivusvahemik)

Virnastatud režiim käitab mitut tihendusmootorit deterministlikus järjestuses. Vaikekonveier on:

```txt
RTK -> Caveman
```

See järjestus tihendab esmalt terminali-/tööriistaväljundi ning rakendab seejärel ülejäänud
loomulikus keeles viibale Cavemani semantilist lühendamist. Virnastatud konveiereid saab seadistada üldiselt või
marsruutimiskombinatsioonidele määratud tihenduskombinatsioonide kaudu.

**Sobib kõige paremini:** segakonteksti jaoks, mis sisaldab suuri tööriistaloge koos inimese juhiste või assistendi kokkuvõtetega.

---

## Ülesvoo kokkuhoiu arvutus

OmniRoute dokumenteerib tihendamisest saadava kokkuhoiu kahe allika põhjal: ülesvooprojektide võrdlustestid ja
OmniRoute'i enda mootorite kombinatsioon.

| Allikas | Siin kasutatud ülesvoo README näitaja                                                                                              |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` vähem väljundtokeneid, võrdlustestide keskmine väljundisääst `65%`, vahemik `22-87%` ja sisendi tihendamise tööriist `~46%` |
| RTK     | Käsuväljundi sääst `60-90%`; näidisseanss `~118,000 -> ~23,900` tokenit ehk sääst `79.7%` (`~80%`)                                 |

Kattuvate tööriista-/kontekstikoormuste puhul rakendab OmniRoute'i vaikekombinatsioon mootoreid järjestikku:

```txt
RTK -> Caveman
```

Kombineeritud sääst on korrutav, mitte liitev:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Näitaja `78-95%` kehtib siis, kui nii RTK kui ka Caveman saavad vähendada sama sisendi-/kontekstikoormust.
Cavemani vastuse väljundrežiim on eraldiseisev: kui see on lubatud, kasutage Cavemani enda väljundisäästu (keskmiselt `65%`,
põhinäitaja `~75%`, vahemik `22-87%`). Arvelduse kogusääst sõltub teie viipade ja väljundite suhtest.

### Mida „sobiv” tegelikult tähendab

Põhinäitajana esitatud vahemik 15-95% on reaalne, kuid see kehtib ainult **liigse või paljusõnalise** sisu kohta — korduvad
vearead, sama hoiatust massiliselt väljastav koostamislogi või ülemõõduline `grep`-i/faili lugemise väljund. See
**ei** tähenda, et iga päring säästaks nii palju.

Empiiriliselt kontrollitud (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): käitus
`stacked` (RTK + Caveman) Anthropic-vormingus `tool_result`-ploki puhul, mis sisaldas 300 identset
vearida, andis tulemuseks **95.93% tokenisäästu / 96.26% märgisäästu** — täpselt reklaamitud
vahemikus. Kuid sama töötlusahel tavapärase, mittekorduva tööriistaväljundi puhul (puhas `grep`-i vastete loend,
lühike faililugem, tavaline vestlustekst) annab õigesti **nullilähedase säästu**, sest
eemaldatavaid kordusi pole ning `validateCompression()` (`validation.ts`) keeldub edastamast
ümberkirjutust, mis eemaldaks või muudaks koodiplokke, URL-e, pealkirju, versioone või SUURTÄHTEDEGA konstantide identifikaatoreid.

See on oodatud ja turvaline käitumine, mitte viga: kodeerimisseanss, mis peamiselt loeb puhtaid faile või otsib neist `grep`-iga,
annab tagasihoidliku kogusäästu isegi siis, kui tihendamine on täielikult lubatud, samas kui seanss, mis satub tõrkuvasse
tsüklisse või paljusõnalise linteri otsa, saavutab selle liikluse puhul täieliku 78-95% vahemiku. Ärge kasutage ühe seansi
madalat koondsäästu protsenti tõendina, et tihendamine on valesti seadistatud — kontrollige kõigepealt, kas
aluseks olev tööriistaväljund oli tegelikult korduv.

---

## Tokenisäästu visualiseering

```
Ilma tihendamiseta: 47K tokenit saadetud LLM-ile
Lite'iga:           40K tokenit saadetud          (15% säästetud — turvaline, alati aktiivne)
Standardiga:        33K tokenit saadetud          (30% säästetud — caveman-speak'i reeglid)
Aggressive'iga:     24K tokenit saadetud          (50% säästetud — vanandamine + kokkuvõtete tegemine)
Ultraga:            12K tokenit saadetud          (75% säästetud — heuristiline kärpimine)
RTK-ga:             19K-5K tokenit saadetud       (60-90% säästetud käsu-/tööriistaväljundilt)
Stackediga:         10K-2.5K tokenit saadetud     (sobiva RTK+Caveman-sisu puhul vahemik 78-95%)
```

---

## Seadistamine

### Töölaud

Liikuge jaotisse `Dashboard → Context & Cache`:

- **Caveman** — režiimi valimine, keelepaketid, eelvaade ja globaalsed vaikeseaded
- **RTK** — käsufiltri eelvaade, RTK turvaseaded ja filtrikataloog
- **Compression Combos** — nimega mootorikonveierid, mis on määratud marsruutimiskombodele
- **Auto-Trigger Threshold** — tihendamise automaatne aktiveerimine, kui tokenite arv ületab lävendi

### Kombopõhine alistus

Jaotises `Dashboard → Context & Cache → Compression Combos` määrake tihendamiskombo marsruutimiskombole:

```txt
Kombo: "free-tier-fallback"
  Tihendamiskombo: "coding-agent-stack"
  Konveier: RTK -> Caveman
  Sihtmärgid:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

See võimaldab kasutada tasuta/kodeerimisteenuse pakkujatel kihilist tihendamist, säilitades tasuliste
tellimuste puhul lihtrežiimi.

See „kombopõhise alistuse” määrang on erinev juhtelement **marsruutimiskombo tihendusrežiimi**
alistusest (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — välja
skeem aktsepteerib ka väärtusi `rtk`, `stacked` ja `omniglyph`) — see alistus ei vali nimega
tihendamiskombo konveierit, vaid määrab üksnes välja `compressionMode`, mida kasutab
`resolveCompressionPlan`. Selle saab määrata kas kombokaardil (`Dashboard → Combos`) või alates
versioonist #6760 iga marsruutimiskombo kohta loendis „Assign to routing” lehel
`Dashboard → Context & Cache → Compression Combos`, otse eespool kirjeldatud konveieri määramise
märkeruudu kõrval. Mõlemal juhul salvestatakse muudatused sama `PUT /api/combos/{id}` lõpp-punkti kaudu.

### Päringupõhine alistus

Saatke päringu päis `x-omniroute-compression`, et alistada ühe päringu tihendusplaan.
Sellel on kõrgeim prioriteet — see alistab marsruutimiskombo alistuse, aktiivse profiili,
automaatse käivituse ja paneeli vaikesätte. Tundmatuid väärtusi eiratakse (päringut ei lükata kunagi
tagasi) ning globaalne pealüliti kehtib endiselt kõigele: kui tihendamine on globaalselt välja
lülitatud, ei saa päis seda sisse lülitada. Väärtused:

| Väärtus       | Mõju                                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| `off`         | Selle päringu puhul tihendamist ei kasutata.                                                             |
| `default`     | Paneelist tuletatud vaikeprofiil (aktiivset profiili eiratakse). Kadudega mootorid jäävad välja.         |
| `safe`        | Sama mis päise ärajätmine: ainult duplikaatide eemaldamine ja tühimärkide koondamine.                    |
| `allow-lossy` | Säilitab selle päringu operaatoriplaani, sealhulgas kokkuvõtted, asjakohasusfiltrid ja stiilimuudatused. |
| `engine:<id>` | Üks mootor, kui see on lubatud, nt `engine:rtk`. See on selle mootori päringupõhine lubamine.            |
| `<combo>`     | Nimega kombo, mis sobitatakse esmalt nime järgi (tõstutundetult) ja seejärel ID järgi.                   |

Ilma väärtuseta `allow-lossy`, `engine:<id>` või nimega kombota kadudega mootoreid ei rakendata.
Kui tihendamine on sisse lülitatud, rakendatakse päringule endiselt seansi duplikaatide eemaldamist ja tühimärkide koondamist.

Rakendatud plaan tagastatakse vastuse päises `X-OmniRoute-Compression: <mode>; source=<source>`,
kus `<source>` on üks väärtustest `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` või `off`.

### API

```bash
# Tihendusseadete hankimine
curl http://localhost:20128/api/settings/compression

# Tihendusseadete värskendamine
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Konkreetse RTK/stacked andmestiku eelvaade
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK filtrikomplektide loetlemine
curl http://localhost:20128/api/context/rtk/filters

# RTK vahetu testimine valikuliste käsu metaandmetega
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Mida kaitstakse

Tihendusmootor **säilitab alati:**

- ✅ Koodiplokid (eraldatud ja tekstisisesed)
- ✅ URL-id ja failiteed
- ✅ JSON-struktuurid ja struktureeritud andmed
- ✅ Identifikaatorid ja kaitstud tehnilised sõned
- ✅ Matemaatilised avaldised
- ✅ Tööriista-/funktsioonikutsete definitsioonid
- ✅ Süsteemiviibad (Lite-režiimis)

RTK toorväljundi taastamine eemaldab levinud API-võtmed, kandjatõendid, Slacki tõendid, AWS-i juurdepääsuvõtmed,
paroolid, tõendid ja saladused enne, kui midagi püsivalt salvestatakse.

---

## Tihendusstatistika

Iga tihendatud päringu statistika lisatakse serverilogidesse:

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

## Etappide tegevuskava

| Etapp    | Režiimid                                                                                                                                                       | Olek        |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Etapp 1  | Off, Lite                                                                                                                                                      | ✅ Tarnitud |
| Etapp 2  | Standard, Aggressive, Ultra                                                                                                                                    | ✅ Tarnitud |
| Etapp 3  | RTK, Stacked, Compression Combos                                                                                                                               | ✅ Tarnitud |
| Etapp 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                                    | ✅ Tarnitud |
| Etapp 4C | Kohanduv kontekstieelarve („dial”) — arvutusmootor + API (`contextBudget` päringus `PUT /api/settings/compression`) + juhtpaneeli režiimi-/reeglijuhtelemendid | ✅ Tarnitud |

---

## Tänuavaldused

Standard-režiimi tihendusreeglid on inspireeritud projektist **[Caveman](https://github.com/JuliusBrussee/caveman)**, mille autor on **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — viraalne projekt „miks kasutada palju tõendeid, kui vähesed teevad töö ära”. Cavemani andmetel kasutab see `~75%` vähem väljundtõendeid, saavutab võrdlustestides keskmiselt `65%` väljundisäästu, väljundisäästu vahemiku `22-87%` ning pakub `~46%` sisendtihendusega tööriista.

RTK-režiim on inspireeritud projektist **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, mille autor on **[RTK AI](https://github.com/rtk-ai)** — suure jõudlusega käsuväljundi tihendusprojekt terminali-, kooste-, testi-, git- ja tööriistaväljundi filtreerimiseks. RTK andmetel ulatub sääst `60-90%`-ni ning selle README näidisseanss näitab `~80%` säästu.

---

## Täiustatud tihendussüsteemid

Lisaks eespool kirjeldatud seitsmele režiimile (lähtekood aktsepteerib ka režiime `codex-responses` ja
`omniglyph`, mida selles juhendis ei käsitleta) kirjeldavad allolevad jaotised funktsioone,
mis töötavad nende režiimide sees või kõrval: tööriistatulemuste tihendamine ja progressiivne vanandamine
on agressiivse mootori 1. ja 2. samm (agressiivne režiim ning virnastatud konveieri samm
`aggressive`), virnastatud konveier määrab virnastatud režiimi tööpõhimõtte, vahemäluteadlik tihendamine
alandab vahemällu salvestavate pakkujate puhul režiimid `aggressive` ja `ultra` tasemele `standard`, kui tihendamine
on sisse lülitatud, ning koopainimese väljundrežiim ja väljundstiilid on vaikimisi välja lülitatud, soovi korral kasutatavad süsteemiviiba juhised,
mis kujundavad mudeli väljundit selle asemel, et päringut tihendada.

### Vahemäluteadlik tihendamine

Mõned pakkujad (näiteks Anthropic viipade vahemällu salvestamisega) toetavad **viipade vahemällu salvestamist**,
mis võimaldab neil kulude ja latentsuse vähendamiseks viiba osi vahemällu salvestada. Kui
vahemällu salvestamine on lubatud, võib agressiivne tihendamine jõudlust tegelikult **halvendada**,
sest see muudab vahemällu salvestatud sõneüksusi, muutes vahemälu kehtetuks.

Moodul `cachingAware.ts` lahendab selle, **tuvastades vahemällu salvestamise konteksti** ja
**kohandades tihendusstrateegiat** vastavalt.

#### Kuidas see töötab

1. **Vahemällu salvestamise konteksti tuvastamine** — otsib päringu kehast markereid `cache_control`
2. **Vahemällu salvestavate pakkujate tuvastamine** — kontrollib, kas sihtpakkuja toetab vahemällu salvestamist
3. **Strateegia kohandamine** — alandab vahemällu salvestavate pakkujate puhul `aggressive`/`ultra` tasemele `standard`
4. **Süsteemiviiba vahelejätmine** — süsteemiviibad salvestatakse tavaliselt vahemällu, seega neid ei tihendata

Strateegia abifunktsioon tagastab ka lipu `deterministicOnly`, kuid plaani koostaja kasutab
ainult strateegiat — praegu ei loe seda lippu ükski järgnev komponent.

#### Koodinäide

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Vahemälumarker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Millal kasutada

Vahemäluteadlik tihendamine on **alati sisse lülitatud** — seadistamine pole vajalik. See rakendub alati,
kui tihendamine on sisse lülitatud ja sihtpakkuja toetab viipade vahemällu salvestamist (Anthropic, OpenAI
jne); selgesõnalised markerid `cache_control` pole vajalikud — ainuüksi vahemällu salvestav pakkuja
käivitab taseme alandamise, kuid markerid üksi ei tee seda kunagi (markerite tuvastamine edastab andmeid vahemälu
telemeetriale, mitte strateegia valikule).

### Progressiivne vanandamine

Pikkadesse vestlustesse koguneb palju sõnumivoore, kuid vanemad voorud muutuvad vähem
asjakohaseks. Moodul `progressiveAging.ts` **lihtsustab sõnumeid vastavalt voorukaugusele**
(kaugust mõõdetakse vestluse lõpust). Kaasasolevate vaikesätetega
(`verbatim: 2, light: 2, moderate: 3`):

- **Viimased 2 vooru (kaugus ≤ 2)**: säilitatakse sõna-sõnalt
- **Kaugus 3**: koopainimese tihendus (täitesõnade eemaldamine)
- **Kaugus 4+**: assistendi sõnumid võetakse kokku; kasutaja sõnumitest säilitatakse esimene
  rida, maksimaalselt 120 märki; muud rollid jäävad muutmata. Süsteemiviibad, juba vanandatud
  sõnumid ja uusim kasutaja sõnum säilitatakse kaugusest olenemata alati sõna-sõnalt.
  Midagi ei jäeta täielikult välja ja sagedusriba `light`
  pole kaasasolevate vaikesätetega saavutatav (`light` võrdub väärtusega `verbatim`).

#### Koodinäide

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... veel 50 vooru ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // viimased 3 vooru: sõna-sõnalt
  light: 8, // kaugus <= 8: kerge tihendus
  moderate: 20, // kaugus <= 20: koopainimese tihendus
  fullSummary: 5, // tüüp nõuab seda, kuid sagedusribade kood seda ei loe
  // kaugus > 20: võetakse kokku (assistent) / säilitatakse esimene rida (kasutaja)
});

// saved = säästetud sõneüksuste arv
```

#### Millal kasutada

Progressiivne vanandamine on režiimis `aggressive` **alati sisse lülitatud** — see on funktsiooni
`compressAggressive()` 2. samm. Ultra-režiim seda ei rakenda. See on
eriti tõhus järgmistes olukordades:

- Pikaajalised programmeerimisseansid
- Mitmepäevased vestlused
- Paljude tööriistakutsetega agentsed töövood

### Koopainimese väljundrežiim

Koopainimese väljundrežiim lisab **süsteemiviiba juhised**, mis paluvad mudelil endal
anda napp väljund — tase `lite` palub anda sisutihedaid vastuseid, mis säilitavad täislaused, `full`
palub „vastata napilt nagu tark koopainimene” ning `ultra` palub telegraafilist väljundit;
juhised üksnes paluvad seda, mitte ei garanteeri tulemust. Päringud saavad need funktsiooni
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) kaudu:
`open-sse/handlers/chatCore.ts` määrab esmalt valiku tagasiühilduvuse vahekihi abil
(`resolveOutputStyleSelection()` failis
`open-sse/services/compression/outputStyles/backCompat.ts`), mis juhul, kui `outputStyles`
on tühi, vastendab lubatud `cavemanOutputMode`-i väljundstiilile `terse-prose` tasemel
`cavemanOutputMode.intensity` (vt allpool jaotist Tagasiühilduvus); mittetühja `outputStyles`
valikut kasutatakse muutmata kujul ning `cavemanOutputMode.enabled` ja `intensity` ei avalda siis
mõju, kuid selle lüliti `autoClarity` rakendub endiselt. `outputMode.ts` sisaldab
juhiste tekste (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), sisu möödaviiku ja
paigutuse abifunktsiooni, mida sisestamine kasutab; selle enda sisestusfunktsioonil `applyCavemanOutputMode()` pole
tootmiskeskkonnas kasutajat.

#### Kuidas see töötab

See režiim ei tihenda sisendit. See lisab süsteemiviibale juhiste ploki
(vt allpool „Kuidas sisestamine toimib“) ning päringu jaoks valitud sisendi tihendamise režiim
käivitub seejärel endiselt kehal, mis nüüd seda plokki sisaldab. Enne jagatud
piirangute klauslit, millega iga tase lõpeb, kõlab ingliskeelne `full`-tase järgmiselt:

> "Vasta napilt nagu tark koopainimene. Jäta välja artiklid (a/an/the), täitesõnad (just/really/basically/actually/simply), viisakused, ebakindlust väljendavad sõnad. Laused võivad olla katkendlikud. Kasuta lühikesi sünonüüme (big, mitte extensive; fix, mitte implement). Säilita täpselt kogu tehniline sisu, kood, vead, URL-id ja identifikaatorid."

See toimib eriti hästi järgmiste kasutusjuhtude puhul:

- Koodi genereerimine (napim väljund = vähem sõnesid)
- Kiired küsimused ja vastused (põhjalikke selgitusi pole vaja)
- Pakktöötlus (maksimaalne läbilaskevõime)

#### Millal kasutada

Koopainimese väljundrežiim on **valikuline**. Kui tihendamine on sisse lülitatud (`enabled: true`, üldlüliti
lehel Compression Settings), lülitage see sisse sättega `cavemanOutputMode.enabled`; `intensity`
valib `lite`, `full` või `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Tihendamiskombinatsiooni lüliti **Output Mode** (`outputMode`, tase väljal `outputModeIntensity`)
määrab sama lüliti päringutele, millele see kombinatsioon rakendub, ning
MCP-tööriist `omniroute_set_compression_engine` kirjutab selle väärtuse oma tõeväärtusargumendi `outputMode`
kaudu. Mittetühi `outputStyles`-valik on selle lüliti suhtes ülimuslik. Juhtpaneelil
sisestab väljundstiili **Terse prose** lubamine sama ploki (vt allpool „Väljundstiilid“).

### Väljundstiilid (kataloog)

Ülal kirjeldatud koopainimese väljundrežiim on **pärandatud ühe stiili tee**. 4. etapp üldistas selle
kombineeritavate väljundstiilide kataloogiks: `OUTPUT_STYLE_CATALOG` failis
`open-sse/services/compression/outputStyles/catalog.ts`. Iga stiil on süsteemiviiba
juhis, mis palub mudelil endal luua säästlikuma väljundi; stiile saab lubada
koos ning need sisestatakse kataloogi järjekorras.

| Stiil                                   | `id`            | Mida see teeb                                                                                                                                                                                                                                                                                                    | Juhiste keeled                                |
| --------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Napp proosa                             | `terse-prose`   | Eemaldab täitesõnad/artiklid/ebakindlust väljendavad sõnad; säilitab tehnilise sisu täpselt. Sama tekst mis pärandatud koopainimese väljundrežiimis (viidatud, mitte uuesti kirjutatud).                                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Vähem koodi                             | `less-code`     | YAGNI-redel: väikseim toimiv muudatus, soovimata abstraktsioone ei lisata.                                                                                                                                                                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Hobusesaba (laisk vanemarendaja)        | `ponytail`      | „Parim kood on kood, mida pole kunagi kirjutatud“: taaskasutus > ümberkirjutamine, algpõhjus > sümptom, lühim toimiv erinevus.                                                                                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mul on ADHD (tegevus esimesena)         | `i-have-adhd`   | Esmalt tegevus (käsk/tee/koodilõik enne proosat), nummerdatud ja piiratud sammud, ÜKS konkreetne järgmine samm, ei mingit sissejuhatust/kokkuvõtet/lõpusõnu. Kohandatud projektist [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filter                      | `antislop-ui`   | Iga visuaalne tehnika peab läbima eesmärgipärasuse kontrolli (hierarhia, identiteet, loetavus); vaikimisi ei kasutata gradiente/klaasi/helendust, värvipalett on piiratud, mallipaigutusi ei kasutata. Mõlemad antislop-stiilid lisavad piirangu, mis keelab mittetoimivad juhtelemendid ja väljamõeldud väited. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop-teksti- ja inimkesksuse filter | `antislop-copy` | Konkreetne tekst (ei mingeid mõttekriipse, üldisi tegevuskutseid, moesõnu, juturoboti lõpusõnu ega väljamõeldud fakte) ning inimestega seotud reeglid: WCAG AA kontrastsus, nähtav fookus, klaviatuuriga ligipääsetavus, tühjad/laadimis-/veaolekud, mobiilivaate ümberpaigutus.                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Napp CJK (文言)                         | `terse-cjk`     | `full`/`ultra` vastus klassikalises hiina keeles (文言); `lite` palub ainult lühikesi vastuseid ilma funktsioonisõnade, viisakuste või ilustusteta.                                                                                                                                                              | zh (lokaadiga piiratud, vt allpool)           |

Igal stiilil on kolm intensiivsustaset — `lite`, `full`, `ultra` — ning iga tase
lõpeb jagatud piirangute klausliga (`SHARED_BOUNDARIES` failis `outputMode.ts`), mis
säilitab täpselt koodiplokid, failiteed, käsud, vead ja URL-id. Tasemete `terse-prose` ja
`terse-cjk` tekstid lisavad sellesse loendisse ka identifikaatorid.

`terse-cjk` on kahes kohas piiratud lokaadiga `zh`. Leht Compression Settings kuvab
selle rea ainult siis, kui juhtpaneeli kasutajaliidese keel on hiina (`zh-CN` või `zh-TW`), ning
`applyOutputStyles()` sisestab selle ainult siis, kui päringu lahendatud keel (vt allpool „Keele
valimine“) on `zh`. Rea peitmine ei kustuta salvestatud `terse-cjk`-valikut:
seadete API aktsepteerib mis tahes stiili ID-d ning lehel teiste stiilide salvestamine säilitab selle. Päringu
ajal on `applyOutputStyles()` keelekontroll ainus lokaadipiirang.

#### Kuidas sisestamine toimib

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) võrdleb
valikut kataloogiga (tundmatud ID-d ja lokaadile mittevastavad stiilid jäetakse välja,
kuid seda ei käsitleta kunagi veana; valik, mille põhjal ei leita ühtegi stiili, jätab
keha muutmata ja vahelejätmise põhjuseks on `no_styles`), ühendab valitud juhised
kataloogi järjekorras,
lisab piirangute klausli **ühe korra** (ning ohutusklausli, `SAFETY_BOUNDARIES` või selle
tõlke, kui valitud on `less-code` või `ponytail`) ja alustab plokki ühe
idempotentsusmarkeriga (`[OmniRoute Output Styles]`), mistõttu ei tee korduv rakendamine
midagi. Kui tuvastatud keelel (vt allpool jaotist Keele valimine) on tõlge, lisatakse
ingliskeelse juhise asemel lokaliseeritud juhis.

Keha puhul, millel on mittetühi `messages`-massiiv, tehakse idempotentsuse kontroll enne
sisupõhist möödumist: kui marker `[OmniRoute Output Styles]` on juba ülataseme väljal
`system` (string või sisuplokkide massiiv) või stringist sisuga süsteemisõnumis,
jäetakse keha muutmata olekuga `already_applied` ning märksõnu ei kontrollita.
Vastasel juhul kontrollib sisupõhine möödumine (`shouldBypassCavemanOutputMode()`
failis `open-sse/services/compression/outputMode.ts`) kolme viimase sõnumi teksti
olenemata nende rollist ning jätab stiilid kogu vooru jaoks rakendamata, kui tekst
vastab turvalisuse, pöördumatu toimingu või täpsustamise märksõnadele või
järjekorratundlikule jadale: `first`, `then`, `after that`, `before`, `rollback` või
`backup`, millele järgneb 240 märgi jooksul `delete`, `drop`, `migrate`, `deploy` või
`release`. Möödumist rakendatakse ajal, mil lüliti **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, vaikimisi sees) on sisse lülitatud; lüliti
väljalülitamisel jäetakse märksõnade kontroll vahele.

Kui möödumiskontroll lubab vooru jätkata, paigutab `placeSystemInstruction()` (samas
failis), mis ei loo kunagi uut `messages[0]` elementi, ploki esimesse leitud kohta
järgmises järjekorras:

1. Alguses olev stringist sisuga süsteemisõnum: plokk lisatakse selle teksti järele.
2. Ülataseme väli `system`: plokk lisatakse stringi teksti järele või uue tekstiplokina
   sisuplokkide massiivi.
3. Esimene hilisem stringist sisuga süsteemisõnum: plokk lisatakse selle teksti järele.
4. Ükski eespool nimetatutest: plokk lisatakse `messages`-massiivi lõppu uue
   süsteemisõnumina.

Keha puhul, millel puudub `messages`-massiiv (või mille massiiv on tühi), sisupõhist
möödumist ei rakendata ja ülataseme välja `system` ei arvestata. Plokk lisatakse
stringist `instructions`-välja teksti järele, välja arvatud juhul, kui see väli juba
sisaldab markerit `[OmniRoute Output Styles]`; sel juhul jäetakse keha muutmata olekuga
`already_applied`. Kui kehal puudub stringist `instructions`-väli, kuid sellel on
`input` (string või massiiv), saab plokist `instructions`, asendades selle välja
võimaliku mittestringilise väärtuse. Keha, millel pole stringist `instructions`-välja
ega stringist või massiivist `input`-välja, jäetakse muutmata ning vahelejätmise
põhjuseks on `no_messages`.

#### Kuidas lubada

Juhtpaneelil: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), jaotis Output styles: iga stiili jaoks üks rida koos
sisse-/väljalülitamise lüliti ja tasemevalijaga. Stiile lisatakse siis, kui tihendamine
ise on sisse lülitatud (lehe pealüliti `enabled`). Lüliti **Auto-Clarity Bypass** asub
lehel **Caveman** (`/dashboard/context/caveman`) selle kaardil **Output Mode**.
Programmiliselt salvestab tihendamise konfiguratsioon valiku järgmiselt:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Tagasiühilduvus: kuni `outputStyles` on tühi, vastendatakse pärandseadistus
`cavemanOutputMode.enabled` stiilile `terse-prose` tasemega
`cavemanOutputMode.intensity`. Plokk algab siis markeriga
`[OmniRoute Output Styles]`, samas kui pärand-injektor `applyCavemanOutputMode()`
lisas markeri `[OmniRoute Caveman Output Mode]`. Markeri all vastab tekst pärandina
lisatud tekstile keeltes en, pt-BR, es, de, fr, it, ru, id ja vi; keeltes ja ja zh on
enne piirangute klauslit üks lisatühik. `terse-prose` on tõlgitud keeltesse pt-BR, es,
de, fr, it, ru, zh, ja, id ja vi, mistõttu saab päring, mille tuvastatud keel on `hu`,
ingliskeelse teksti, samas kui pärand-injektor kasutas ungarikeelset teksti.

Väljundstiili keele valimine (`resolveOutputStyleLanguage()` failis
`outputStyles/apply.ts`): kui `languageConfig.enabled` on sisse lülitatud, võtab
`autoDetect` näidiseks päringu `messages`-massiivi viimase tekstiga kasutajasõnumi
(stringist sisu või selle sisuosade `text`) ning käivitab selle põhjal Cavemani mootori
tuvastaja (`detectCompressionLanguage()`). Tuvastaja tagastab `zh`, kui tekst sisaldab
hani märke, kuid mitte kana märke; muul juhul tagastab see selle keeltest `it`, `pt-BR`,
`es`, `de`, `fr`, `ru`, `ja`, `hu` ja `id`, millel on kõige rohkem vihjete vasteid,
ning vaste puudumisel `en` — tekst, mida ei õnnestu klassifitseerida, saab inglise
keele, mitte kunagi `defaultLanguage`; samuti ei tuvastata kunagi keelt `vi`, kuigi
stiilidega on kaasas `vi` tekst. Responses API keha hoiab oma voore väljal `input`,
mida näidiseks ei võeta, mistõttu kasutatakse selle puhul esmalt `defaultLanguage` ja
seejärel inglise keelt. Kui üheski `messages`-massiivi kasutajasõnumis pole teksti või
kui `autoDetect` on välja lülitatud, rakendatakse esmalt `defaultLanguage` ja seejärel
inglise keelt. Kui `languageConfig.enabled` on välja lülitatud, on keel inglise keel —
välja arvatud juhul, kui päringule rakendub tihenduskombinatsioon (päringu
marsruutimiskombinatsioonile määratud kombinatsioon või vaikimisi tihenduskombinatsioon,
millele chatCore sisseehitatud virnastatud konveieri puhul taandub): kombinatsiooni
rakendamine lülitab selle päringu jaoks `languageConfig.enabled` sisse ja määrab
`defaultLanguage` väärtuse kombinatsiooni keelepakettide põhjal (salvestatud väärtus,
kui see kuulub kombinatsiooni pakettide hulka, vastasel juhul kombinatsiooni esimene
pakett, mille vaikeväärtus on `en`), samas kui salvestatud `autoDetect` (vaikimisi sees)
jääb endiselt kehtima. Cavemani sisendmootor valib oma reeglipaketi keele teistmoodi —
iga tekstiosa kohta eraldi ning automaattuvastuse väljalülitamisel sõltuvalt
`enabledPacks` väärtusest.

Stiili × keele maatriksi fikseerib
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: iga kataloogistiil vajab kirjet
testi väljal `BASELINE_LANGUAGES`; stiil, mis ei ole lokaadiga piiratud, peab sisaldama
pt-BR tõlget (lokaadiga piiratud `terse-cjk` on sellest reeglist vabastatud), välja arvatud
juhul, kui see on loetletud väljal `KNOWN_ENGLISH_ONLY`, mis võib sisaldada ainult stiile,
millel pole üldse tõlkeid — loetletud stiil, millel on mõni tõlge, põhjustab testi
nurjumise; samuti nurjub stiili test siis, kui see kaotab mõne keele, mis on loetletud
selle kirjes väljal `BASELINE_LANGUAGES`. Stiili lisamise kohta vaadake
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Tööriistatulemuste tihendamine

Funktsioon `compressToolResult()` failis
`open-sse/services/compression/toolResultCompressor.ts`
tihendab tööriistatulemuse teksti **5 strateegia** abil. Neid proovitakse järgmises
järjekorras ning tulemuse määrab esimene lubatud strateegia, mille kontroll sisule
vastab:

1. **`fileContent`**: vähemalt 3-realine sisu, milles vähemalt üks rida algab pärast
   algtaande eiramist tekstiga `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` või `return ` (märksõna koos tühikuga), või tekstiga `if`,
   `for` või `while`, millele järgneb `(` või ` (`, säilitab esimesed 20 ja viimased
   5 rida ning märgib vahelt eemaldatud osa.
2. **`grepSearch`**: sisu, milles on vähemalt üks rida kujul `<path>:<digits>:`,
   kus esimesele koolonile eelnevas tekstis pole tühimärke, säilitab ainult sellised
   read, maksimaalselt 30, millele järgnevad võimalike ülejäänud vastete arv ja vasted
   sisaldavate failide loend; kõik muud read eemaldatakse. Strateegia käivitamiseks
   piisab ühest sellisest reast, mistõttu läheb arvesse ka ajatempliga, näiteks
   `12:30:45`, algav logirida.
3. **`shellOutput`**: väljundist, mis sisaldab ANSI CSI jada (`ESC[`, millele järgnevad
   numbrid või semikoolonid ja seejärel täht, nagu värvikoodides) või `$`-märki, millele
   järgneb tekstis ükskõik kus tühimärk, eemaldatakse need jadad (muud paojadad, nagu
   `ESC[?25l` või OSC aknapealkirja jada, säilitatakse) ning säilitatakse viimased
   50 rida, koondades järjestikused korduvad read. Kuna see kontroll käivitub enne
   strateegiaid `json` ja `errorMessage`, ei jõua sellist `$`-märki sisaldav JSON- või
   veaväljund nendeni, kui `shellOutput` on sisse lülitatud.
4. **`json`**: üle 2000 märgi pikkune JSON-andmestik, mis algab pärast valikulisi
   tühimärke märgiga `{` või `[` ja mida saab sõeluda, võetakse kokku: üle 7 elemendiga
   massiivist säilitatakse esimesed 5 ja viimased 2 elementi ning elementide koguarv,
   objektist aga selle esimesed 20 võtit, kusjuures iga pesastatud objekti või massiivi
   väärtus asendatakse kohatäitjaga `{…N keys}` (massiivi puhul on N selle pikkus) ja
   marker `_remaining_<N>_keys` näitab pärast esimest 20 võtit eemaldatud võtmete arvu.
   Skalaarväärtused kopeeritakse täielikult, mistõttu kuni 20 võtmega objekt, millel
   pole pesastatud väärtusi, ainult taandatakse ümber — minimeeritud objekt pikeneb ja
   jääb muutmata.
5. **`errorMessage`**: väljund, mis sisaldab ükskõik millises kohas ja sõltumata
   tähesuurusest teksti `error:`, `error ` (sõna, millele järgneb tühik, nagu tekstis
   `no error found`), `[error]`, `exception:`, `exception `, `[exception]` või
   `traceback`, säilitab esimese rea, järgmised 10 rida ja viimased 3 rida ning asendab
   nende vahele jäävad read markeriga `… [N frames elided] …`. Marker ilmub ainult
   siis, kui esimesele reale järgneb rohkem kui 13 rida, seega kuni 14-realist
   veaväljundit ei lühendata (12 või 13 rea puhul kordavad viimased 3 juba säilitatud
   ridu).

Pärast strateegia sobivuse tuvastamist ei proovita hilisemaid strateegiaid isegi siis,
kui sobiv strateegia ei säästa midagi. Kui sobiv strateegia ei säästa hinnanguliselt
ühtegi tokenit (pikkus ÷ 4, ümardatuna üles) — näiteks kuni 25-realine koodilaadne fail
või üle 2000 märgi pikkune kuni 7 elemendiga JSON-massiiv — säilitab agressiivne mootor
algse tööriistatulemuse: mõlemad kutsujad (`compressAggressive()` ja
`compressAnthropicToolResultBlock()`) säilitavad algse tulemuse, kui `saved` on 0 või
väiksem, kuid `compressToolResult()` ise tagastab endiselt selle strateegia väljundi.
Tööriistatulemuse etapp pole lõplik: mootori varukokkuvõtja võib endiselt lühendada
`tool`- või `function`-sõnumit, mis on pikem kui 8192 märki (`maxTokensPerMessage`,
2048, korda 4).

#### Millal kasutada

Tööriistatulemuste tihendamine on agressiivse mootori 1. etapp (`compressAggressive()`
failis `open-sse/services/compression/aggressive.ts`), mistõttu käivitatakse see
Aggressive-režiimis ja virnastatud konveieri `aggressive`-etapis. See tihendab OpenAI
vorminguga `tool`- ja `function`-sõnumeid ning Anthropic-vormingu `tool_result`-plokkides
olevat teksti. Igal strateegial on seadistuse `aggressive.toolStrategies` all oma lüliti
ning kõik on vaikimisi sisse lülitatud. Juhtpaneelil asuvad lülitid Cavemani lehe vaates
**Advanced**, kui tihendamine on sisse lülitatud ja vaikerežiim on Aggressive.

### Virnastatud konveier

Virnastatud režiim käitab **mitut mootorit järjest** — tavaliselt esmalt RTK-d
(60–90% sääst tööriistaväljundis) ja seejärel Cavemani allesjäänud tekstil (~46% sisendi
sääst). Kombineerituna annab see **78–95% sobivusvahemiku** (vaadake eespool jaotist
Upstreami säästu arvutus): `1 - (1 - 0.60..0.90) × (1 - 0.46)` annab keskmiselt ≈89%.

#### Kuidas see töötab

```
Sisend (1000 tokenit)
  → RTK (käsuteadlik filter) → 200 tokenit
    → Caveman (täiteteksti eemaldamine) → 108 tokenit
  → Väljund (108 tokenit, ~89% sääst)
```

#### Millal kasutada

Kasutage virnastatud režiimi järgmistes olukordades:

- Tööriistarohked töövood (agentne programmeerimine, uurimistöö)
- Kulutundlik pakktöötlus
- Kui vajate maksimaalset tokenisäästu

Virnastatud konveiereid seadistatakse globaalse tihendussätte `stackedPipeline` kaudu
või marsruutimiskombole määratud nimega tihenduskombinatsiooni kaudu (vaadake eespool
jaotist Kombopõhine ülekirjutamine) — mitte automaatkombinatsiooni `modePack` kaudu
(see väli ainult kaalub automaatkombinatsiooni mudelivalikut ümber ning `stacked` ei ole
kehtiv pakinimi).

---

## Kombinatsioonipõhised tihendamise alistused

Globaalset tihendusrežiimi saab **iga kombinatsiooni jaoks eraldi** alistada, et eri kasutusjuhtude käitumist täpsustada:

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

See on kasulik järgmistel juhtudel:

- **Programmeerimiskombinatsioonid**: pikkade seansside jaoks kasutage režiimi `aggressive`
- **Kiirküsimuste ja -vastuste kombinatsioonid**: kiirete vastuste jaoks kasutage režiimi `lite`
- **Tööriistarohked kombinatsioonid**: maksimaalse kokkuhoiu jaoks kasutage režiimi `stacked`
- **Tootmiskombinatsioonid**: vahemällu salvestavate teenusepakkujate puhul jätke alistus välja — alati aktiivne
  vahemäluteadlik kohandus muudab `aggressive`/`ultra` automaatselt režiimiks `standard`
  (valitavat režiimi `cache-aware` ei ole)

---

## Vaadake ka

- [Keskkonna konfiguratsioon](../reference/ENVIRONMENT.md) — tihendamise keskkonnamuutujad
- [Arhitektuurijuhend](../architecture/ARCHITECTURE.md) — tihenduskonveieri sisemine toimimine
- [Kasutusjuhend](../guides/USER_GUIDE.md) — tihendamisega alustamine
- [RTK tihendamine](./RTK_COMPRESSION.md) — RTK-filtrid, usaldusmudel, kontrollvärav, toorväljundi taastamine
- [Tihendusmootorid](./COMPRESSION_ENGINES.md) — Caveman, RTK, virnastamine, API-d, MCP, juhtpaneel
- [Tihendusreeglite vorming](./COMPRESSION_RULES_FORMAT.md) — JSON-reeglipaketi vorming
- [Tihendamise keelepaketid](./COMPRESSION_LANGUAGE_PACKS.md) — keelepõhised Cavemani reeglid
