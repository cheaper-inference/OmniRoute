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

### Kerge režiim (~15% kokkuhoid, <1 ms latentsus)

Kõige turvalisem režiim — vorminduse korrastamine. Selle tööriistatulemuste kärpimine on kadudega, seega kasutab vaikimisi tee (ilma `allow-lossy`, `engine:lite` või nimega kombinatsiooni lubamiseta) kerget režiimi suvandiga
`compressToolResults: false`: varasemad tööriistatulemused jõuavad teenusepakkujani muutmata kujul.

| Tehnika                  | Kirjeldus                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Järjestikuste tühjade ridade ja lõpus olevate tühikute ühendamine                                  |
| `dedupSystemPrompt`      | Korduvate süsteemisõnumite eemaldamine                                                             |
| `compressToolResults`    | Varasemate tööriistatulemuste kärpimine kerge režiimi piirini (kadudega: ainult päringu lubamisel) |
| `removeRedundantContent` | Korduvate juhiste eemaldamine                                                                      |
| `replaceImageUrls`       | Base64-põhiste pildiandmete URI-de lühendamine                                                     |

**Sobib kõige paremini:** alati aktiivseks kasutuseks, ohutuskriitilisteks töövoogudeks.

### Standardrežiim (~30% kokkuhoid)

Inspireeritud [Cavemanist](https://github.com/JuliusBrussee/caveman) — eemaldab täitesõnad ja liigse sõnastuse, säilitades tähenduse:

- Eemaldab täitesõnad ("please", "I think", "basically", "actually")
- Muudab liigsed fraasid kompaktsemaks ("in order to" → "to", "as a result of" → "because")
- Eemaldab viisakad pehmendused ("Would you mind...", "If you could possibly...")
- 30+ regulaaravaldise reeglit, mis on kohandatud kodeerimisviipade jaoks

**Sobib kõige paremini:** igapäevasteks kodeerimise töövoogudeks, kuluteadlikele meeskondadele.

### Agressiivne režiim (~50% kokkuhoid)

Pikkade sessioonide nutikas ajaloo haldus:

- **Sõnumite vanandamine** — vanemaid sõnumeid tihendatakse järk-järgult
- **Tööriistatulemuste tihendamine** — pikad tööriistaväljundid kärbitakse või jäetakse välja (esimesed/viimased read,
  vastavusridade filtreerimine, JSON-võtmete tihendamine)
- **Struktuurse terviklikkuse kaitsed** — tagab, et `tool_use` + `tool_result` paarid jäävad kooskõlaliseks
- **Kontekstiakna teadlikkus** — arvestab mudelipõhiste märgilimiitidega

**Sobib kõige paremini:** pikemateks silumisessioonideks, suurte koodibaaside jaoks.

### Ülikompaktne režiim (~75% kokkuhoid)

Maksimaalne tihendamine märgikriitiliste olukordade jaoks:

- **Heuristiline kärpimine** — proosa märgipõhine kärpimine skoori alusel
- **Struktuuri säilitamine** — koodiplokid, tekstisisesed koodilõigud, URL-id ja identifikaatorid märgistatakse ning taastatakse sõna-sõnalt, neid ei kärbita kunagi
- **Valikuline SLM-tase** — väike kohalik mudel võib konfigureerimise korral kärpimist täpsustada
- Agressiivsest režiimist sõltumatu: see ei rakenda sõnumite vanandamist, tööriistatulemuste tihendamist ega varukokkuvõtjat (ainult SLM-taseme tõrge võib suunata varukäigu kaudu agressiivsesse režiimi)

**Sobib kõige paremini:** kui konteksti piirangud korduvalt täituvad.

### RTK-režiim (60–90% lähtevahemikust)

RTK-režiim on optimeeritud kodeerimisagendi sessioonides esinevate mahukate tööriistaväljundite jaoks:

- Tuvastab käsu- ja väljundiklassid, nagu `git status`, `git diff`, `git log`, testikäivitajad,
  TypeScripti/Vite'i/Webpacki järgud, ESLinti/Biome'i/Prettieri, npm audit/installid, Dockeri logid, taristu
  väljundi ja üldise shelli väljundi
- Rakendab JSON-filtripakette asukohast `open-sse/services/compression/engines/rtk/filters/`
- Impordib RTK TOML-skeemi v1 filtrid projekti- või globaalsetest failidest `filters.toml`, kasutades reasisese testi
  valideerimist ja projektifailide usalduspõhist juhtimist
- Sisaldab 56 sisseehitatud filtrit koos reasiseste kontrollnäidetega
- Eemaldab ANSI-juhtelemendid, edenemisribad, korduvad read ja tegevusetu müra
- Säilitab tõrked, vead, hoiatused, muudetud failid, kokkuvõtted ja pika väljundi lõpu
- Toetab usalduspõhiseid projektifiltreid, globaalseid filtreid ja valikulist redigeeritud toorväljundi taastamist

**Sobib kõige paremini:** agendi sessioonideks, milles kasutatakse shelli, järke, teste, git-i, grep-i ja failiväljundi transkripte.

### Virnastatud režiim (78–95% sobivast vahemikust)

Virnastatud režiim käivitab mitu tihendusmootorit deterministlikus järjekorras. Vaikimisi töövoog on:

```txt
RTK -> Caveman
```

See järjekord muudab terminali-/tööriistaväljundi esmalt kompaktseks ja rakendab seejärel Cavemani semantilist tihendamist
ülejäänud loomulikus keeles viibale. Virnastatud töövooge saab konfigureerida globaalselt või marsruutimise kombinatsioonidele määratud
tihenduskombinatsioonide kaudu.

**Sobib kõige paremini:** segakontekstile, milles on mahukad tööriistalogid ning inimeste juhised või assistendi kokkuvõtted.

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

## Konfigureerimine

### Juhtpaneel

Liikuge jaotisse `Dashboard → Context & Cache`:

- **Caveman** — režiimi valik, keelepaketid, eelvaade ja globaalsed vaikesätted
- **RTK** — käsufiltrite eelvaade, RTK turvasätted ja filtrikataloog
- **Compression Combos** — marsruutimiskombinatsioonidele määratud nimega mootorikonveierid
- **Auto-Trigger Threshold** — käivitab tihendamise automaatselt, kui tokenite arv ületab läve

### Kombinatsioonipõhine alistamine

Määrake jaotises `Dashboard → Context & Cache → Compression Combos` marsruutimiskombinatsioonile tihendamiskombinatsioon:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

See võimaldab kasutada tasuta-/kodeerimisteenuse pakkujatega virnastatud tihendamist, säilitades tasuliste
tellimuste puhul lihtrežiimi.

See „kombinatsioonipõhine alistamine” on marsruutimiskombinatsiooni **tihendamisrežiimi**
alistamisest (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — välja skeem aktsepteerib
ka väärtusi `rtk`, `stacked` ja `omniglyph`) eraldi juhtelement. See alistamine ei vali nimega
tihendamiskombinatsiooni konveierit, vaid määrab lihtsalt välja `compressionMode` väärtuse, mida
kasutab `resolveCompressionPlan`. Seda saab määrata kas kombinatsioonikaardil (`Dashboard → Combos`)
või alates versioonist #6760 marsruutimiskombinatsiooni kaupa loendis „Assign to routing” jaotises
`Dashboard → Context & Cache → Compression Combos`, otse ülal dokumenteeritud konveieri määramise
märkeruudu kõrval. Mõlemad vaated salvestavad andmed sama `PUT /api/combos/{id}` lõpp-punkti kaudu.

### Päringupõhine alistamine

Saatke päringu päis `x-omniroute-compression`, et alistada tihendusplaan ühe päringu jaoks. Sellel
on kõrgeim prioriteet — see alistab marsruutimiskombinatsiooni alistamise, aktiivse profiili,
automaatse käivituse ja paneeli vaikeväärtuse. Tundmatuid väärtusi eiratakse (päringut ei lükata
kunagi tagasi) ning globaalne pealüliti piirab endiselt kõike: kui tihendamine on globaalselt välja
lülitatud, ei saa päis seda sisse lülitada. Väärtused:

| Väärtus       | Mõju                                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| `off`         | Selle päringu puhul tihendamist ei kasutata.                                                                   |
| `default`     | Paneelist tuletatud vaikeprofiil (aktiivset profiili eiratakse). Kadudega mootorid jäetakse välja.             |
| `safe`        | Sama mis päise väljajätmisel.                                                                                  |
| `allow-lossy` | Säilitab selle päringu operaatoriplaani, sealhulgas kokkuvõtted, asjakohasusfiltrid ja stiili ümberkirjutused. |
| `engine:<id>` | Üksik mootor, kui see on lubatud, näiteks `engine:rtk`. See on selle mootori päringupõhine lubamine.           |
| `<combo>`     | Nimega kombinatsioon, mille vaste leitakse esmalt nime (tõstutundetu) ja seejärel ID järgi.                    |

Kui puudub `allow-lossy`, `engine:<id>` või nimega kombinatsioon, ei rakendata kadudega mootoreid.
Kui kadudega vaikeväärtust, automaatset käivitust või marsruutimise alistamist vähendatakse,
säilitab OmniRoute konfigureeritud virnastatud konveierist tuvastatud kadudeta sammud konfigureeritud
järjekorras. See kasutab `session-dedup → lite` varuvariandina ainult siis, kui ükski konfigureeritud
kadudeta samm ei jää alles.

Seadete paneeli eelvaade **Effective pipeline** näitab tavapärast püsiplaani. Kui automaatne
käivitus on võimalik, näitab sama eelvaade ka selle tingimuslikku efektiivset konveierit, et paneel
ja päiseta käitusaja lahendus jääksid kooskõlla.

Rakendatud plaan kajastatakse vastuse päises
`X-OmniRoute-Compression: <mode>; source=<source>`, kus `<source>` on üks järgmistest:
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` või `off`.

### API

```bash
# Hangi tihendamise seaded
curl http://localhost:20128/api/settings/compression

# Uuenda tihendamise seadeid
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Vaata konkreetse RTK/stacked kasuliku koormuse eelvaadet
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Loetle RTK filtripaketid
curl http://localhost:20128/api/context/rtk/filters

# Testi RTK-d otse koos valikuliste käsu metaandmetega
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

Beyond the 7 modes described above (the source also accepts `codex-responses` and `omniglyph` modes, which this guide does not cover), the sections below cover features that work inside or alongside those modes: Tool Result Compression and Progressive Aging are steps 1 and 2 of the aggressive engine (Aggressive mode and an `aggressive` step of a stacked pipeline), the Stacked Pipeline is how Stacked mode runs, Cache-Aware Compression downgrades `aggressive` and `ultra` to `standard` for caching providers while compression is on, and Caveman Output Mode and Output Styles are opt-in system-prompt instructions, off by default, that shape the model's output instead of compressing the request.

### Vahemälu teadlik pakkimine

Mõned pakkujad (nt kiire vahemällu salvestamisega Anthropic ) toetavad** kiire vahemällu salvestamine** , mis võimaldab neil kulude ja latentsuse vähendamiseks osa viipast vahemällu salvestada. Kui vahemällu salvestamine on lubatud, võib agressiivne tihendamine tegelikult olla** haiget teha** jõudlust, kuna see muudab vahemällu salvestatud märke, muutes vahemälu kehtetuks.

`cachingAware.ts` moodul lahendab selle järgmiselt** vahemällu salvestamise konteksti tuvastamine** ja** tihendusstrateegia kohandamine** vastavalt.

#### Kuidas see toimib

1. **Tuvastage vahemällu salvestamise kontekst** — Skaneerib päringu kehas `cache_control` markereid
2. **Tuvastage vahemälu pakkujad** — Kontrollib, kas sihtpakkuja toetab vahemällu salvestamist
3. **Kohandage strateegiat** — alandab `aggressive`/`ultra` versiooniks `standard` vahemällu salvestamise pakkujate jaoks
4. **Jäta süsteemiviip vahele** — Süsteemiviibad salvestatakse tavaliselt vahemällu, seega ärge neid tihendage

Strateegiaabimees tagastab ka `deterministicOnly` lipu, kuid plaani koostaja tarbib ainult strateegiat — miski allavoolu ei loe täna lippu.

#### Koodi näide

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

#### Millal kasutada

Vahemälu teadlik pakkimine on** alati sees** — pole konfiguratsiooni vaja. See käivitub alati, kui tihendamine on sisse lülitatud ja sihtpakkuja toetab kiiret vahemällu salvestamist (Anthropic, OpenAI jne); selgesõnalisi `cache_control` markereid ei nõuta — vahemällu salvestamise pakkuja üksi käivitab alandamise ja ainult markerid ei tee seda kunagi (markerite tuvastamine toidab vahemälu telemeetriat, mitte strateegiaotsust).

OpenRouter loetakse vahemälu pakkujaks ainult `anthropic/*` mudelite puhul: Claude koodipäringud säilitavad oma `cache_control` katkestuspunktid (maksimaalselt 4) ja valvur kaitseb eesliidet, samas kui kõik teised OpenRouter perekonnad (`openai/`, `google/`, `qwen/`, …) jäävad tühjaks ja valveta.

### Progressiivne vananemine

Pikad vestlused koguvad palju sõnumite pöördeid, kuid vanemad vestlused muutuvad vähem oluliseks. `progressiveAging.ts` moodul** halvendab sõnumeid pöördekauguse võrra** (kaugus mõõdetuna vestluse lõpust). Tarnitud vaikeseadetega (`verbatim: 2, light: 2, moderate: 3`):

- **Viimased 2 pööret (kaugus ≤ 2)** : Sõna-sõnalt
- **Kaugus 3** : Cavemani kokkusurumine (täiteaine eemaldamine)
- **Kaugus 4 +** : abisõnumite kokkuvõte; kasutajateateid vähendatakse nende esimesele reale, maksimaalselt 120 tähemärki; muud rollid puutumata. Süsteemiviipasid, juba vananenud teateid ja uusimat kasutajateadet hoitakse alati sõna-sõnalt, olenemata kaugusest. Midagi ei jäeta otse välja ja `light` riba pole tarnitud vaikeväärtustega (`light` võrdub `verbatim`) kättesaamatu.

#### Koodi näide

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

#### Millal kasutada

Progresseeruv vananemine on** alati sees** `aggressive` režiimi — jaoks on see `compressAggressive()` 2. samm. Ultrarežiim seda ei käivita. See on eriti tõhus:

- Pikaajalised kodeerimisseansid
- Mitmepäevased vestlused
- Agendi töövood paljude tööriistakutsega

### Cavemani väljundrežiim

Koopainimese väljundrežiim lisab** süsteemijuhised** mis küsib mudelilt endalt lühikest väljundit — `lite` tase küsib kokkuvõtlikke vastuseid, mis säilitavad täislaused, `full` palub tal "reageerida lühidalt nagu nutikas koopamees" ja `ultra` küsib telegraafiväljundit; juhised ainult küsivad, nad ei saa seda garanteerida. Päringud saavad need `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) kaudu: `open-sse/handlers/chatCore.ts` lahendab esmalt valiku back-compat shimiga (`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`), mis, kuigi `outputStyles` on tühi, kaardistab lubatud `cavemanOutputMode` `terse-prose` väljundstiiliga `cavemanOutputMode.intensity` juures (vt Back-compat allpool); mittetühja `outputStyles` -valikut kasutatakse sellisel kujul ning `cavemanOutputMode.enabled` ja `intensity` siis ei oma mõju, samas kui selle `autoClarity` lüliti kehtib endiselt. `outputMode.ts` sisaldab juhiste tekste (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), sisu ümbersõitu ja paigutuse abi, mida süstimine kasutab; tema enda `applyCavemanOutputMode()` pihustil pole tootmishelistajat.

#### Kuidas see toimib

See režiim ei tihenda sisendit. See lisab süsteemiviipale käsuploki (vaadake allpool jaotist Kuidas süstimine töötab) ja mis tahes päringu jaoks valitud sisendi tihendusrežiim töötab ka pärast seda plokki kandval kehal. Enne jagatud piiride klauslit, millega iga tase lõpeb, on ingliskeelne `full` tase järgmine:

> "Vastage lühidalt nagu nutikas koopamees. Loobuge artiklitest (a/an/the), täiteainest (just/really/basically/actually/simply), meeldivatest asjadest, maandamisest. Fragmendid OK. Lühikesed sünonüümid (suured mitte ulatuslikud, parandage mitte rakendage). Hoidke kogu tehniline sisu, kood, vead, URLs, identifikaatorid täpsed."

See toimib eriti hästi:

- Koodi genereerimine (terseri väljund = vähem märke)
- Kiired küsimused ja vastused (pole vaja üksikasjalikke selgitusi)
- Paketttöötlus (läbilaskevõime maksimeerimine)

#### Millal kasutada

Cavemani väljundrežiim on** opt-in** . Kui tihendamine on sisse lülitatud (`enabled: true`, tihendussätete lehe põhilüliti), lülitage see sisse nupuga `cavemanOutputMode.enabled`; `intensity` valib `lite`, `full` või `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kombokompositsioon** Väljundrežiim** toggle (`outputMode`, tase `outputModeIntensity`-s ) seab sama lüliti taotluste jaoks, millele kombinatsioon kehtib, ja tööriist `omniroute_set_compression_engine` MCP kirjutab selle läbi oma tõeväärtuse `outputMode` argumendi. Mittetühi `outputStyles` -valik on selle lüliti suhtes ülimuslik. Lubades armatuurlaual** Lühike proosa** väljundstiil sisestab sama ploki (vt allpool väljundstiile).

### Väljundistiilid (kataloog)

Ülaltoodud Cavemani väljundrežiim on** pärand ühe stiili tee** . 4. etapp üldistas selle koostatavate väljundstiilide kataloogiks: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Iga stiil on süsteemiviip, mis küsib mudelilt endalt odavamat väljundit; stiile saab lubada koos ja need sisestatakse kataloogi järjekorras.

| Stiil                             | `id`            | Mida see teeb                                                                                                                                                                                                                                                | Õppekeeled                                    |
| --------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Lühike proosa                     | `terse-prose`   | Tilk filler/articles/hedging; hoida tehnilist sisu täpselt. Sama tekst, mis pärand koopainimese väljundrežiimil (viitatud, mitte uuesti sisestatud).                                                                                                         | et, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Vähem koodi                       | `less-code`     | YAGNI redel: väikseim toimiv muudatus, ei mingeid soovimatuid abstraktsioone.                                                                                                                                                                                | et, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Hobusesaba (laisk vanem arendaja) | `ponytail`      | "Parim kood on kood, mida pole kunagi kirjutatud": > uuesti kirjutamine, algpõhjus > sümptom, lühim töö erinevus.                                                                                                                                            | et, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mul on ADHD (action-first)        | `i-have-adhd`   | Esmalt tegevus (command/path/snippet enne proosat), nummerdatud piiridega sammud, ONE konkreetne järgmine samm, preamble/recap/closers. puudub Kohandatud [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                 | et, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Libisemisvastane UI filter        | `antislop-ui`   | Iga visuaalne tehnika peab läbima eesmärgi testi (hierarhia, identiteet, loetavus); vaikimisi gradients/glass/glow, piiriga palett, mallide paigutus puudub. Mõlemad libisemisvastased stiilid lisavad piirideta-dead-controls / no-fabricated-claims piiri. | et, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop koopia ja inimfilter     | `antislop-copy` | Konkreetne koopia (ilma kriipsuta, üldine CTAs, moesõnad, vestlusrobotite sulgurid, väljamõeldud faktid) pluss inimeste reeglid: WCAG AA kontrast, nähtav fookus, klaviatuuri katvus, empty/loading/error olekud, mobiili reflow.                            | et, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                  | `terse-cjk`     | `full`/`ultra` vastus klassikalises hiina keeles (文言); `lite` küsib ainult lühikesi vastuseid ilma funktsioonisõnadeta, meeldivate sõnade või kaunistusteta.                                                                                               | zh (kohapiiranguga, vt allpool)               |

Igal stiilil on kolm intensiivsuse taset — `lite`, `full`, `ultra` — ja iga tase lõpeb jagatud piiride klausliga (`SHARED_BOUNDARIES` in `outputMode.ts`), mis hoiab koodiplokid, failiteed, käsud, vead ja URLs täpsed. `terse-prose` ja `terse-cjk` taseme tekstid lisavad sellesse loendisse identifikaatorid.

`terse-cjk` on kahes kohas lokaadiga seotud `zh` -ga. Tihendussätete lehel kuvatakse selle rida ainult siis, kui armatuurlaua UI keel on hiina keel (`zh-CN` või `zh-TW`), ja `applyOutputStyles()` sisestab selle ainult siis, kui päringu lahendatud keel (vt Keelevalik allpool) on `zh`. Rea peitmine ei tühjenda salvestatud `terse-cjk` -valikut: sätted API aktsepteerivad mis tahes stiili ID-d ja muude stiilide salvestamine lehel säilitab selle. Taotluse ajal on `applyOutputStyles()` keelekontroll ainus lokaadi värav.

#### Kuidas süstimine toimib

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) lahendab valiku kataloogi alusel (tundmatud ID-d ja lokaadiga mittevastavad stiilid jäetakse välja, mitte kunagi viga; valik, mis lahendab stiili puudumise, jätab keha muutmata, jäetakse vahele kui `no_styles`), ühendab valitud juhised kataloogi järjekorras, lisab piiriklausli** üks kord** (pluss turvaklausel `SAFETY_BOUNDARIES` või selle tõlge, kui `less-code` või `ponytail` on valitud) ja alustab plokki ühe idempotentsusmarkeriga (`[OmniRoute Output Styles]`), nii et uuesti rakendamine on no-op. Kui lahendatud keeles (vt Keelevalik allpool) on tõlge, sisestatakse inglise keele asemel lokaliseeritud käsk.

Mittetühja `messages` massiiviga keha puhul käivitatakse idempotentsuse kontroll enne sisu ümbersõitu: kui `[OmniRoute Output Styles]` marker on juba ülataseme `system` väljal (string või sisuploki massiiv) või stringi sisuga süsteemisõnumis, jäetakse keha `already_applied` na muutmata ja märksõna kontrollimist ei toimu. Vastasel juhul kontrollib sisu ümbersõit (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) kolme viimase sõnumi teksti, olenemata nende rollist, ja jätab kogu pöörde stiilid vahele, kui tekst vastab selle turvalisuse, pöördumatu tegevuse või selgituse märksõnadele või järjestustundlikule jadale: `first`, `then`, `after that`, `before`, `rollback` või 2 sees `backup` `delete`, `drop`, `migrate`, `deploy` või `release`. Möödaviik töötab, kui** Automaatse selguse ümbersõit** toggle (`cavemanOutputMode.autoClarity`, vaikimisi sees) on sees; lüliti väljalülitamine jätab märksõna kontrolli vahele.

Kui möödaviik laseb pöörde läbi, asetab `placeSystemInstruction()` (sama fail), mis ei loo kunagi uut `messages[0]`, ploki esimesse, mille ta leiab:

1. Juhtiv süsteemiteade stringi sisuga: plokk lisatakse selle teksti järele.
2. Tipptaseme `system` väli: plokk lisatakse stringi teksti järele või uue tekstiplokina sisuploki massiivi.
3. Esimene hilisem stringi sisuga süsteemiteade: plokk lisatakse selle teksti järele.
4. Mitte ükski ülaltoodust: plokk läheb `messages` lõpus uude süsteemisõnumisse.

Ilma `messages` massiivita (või tühja massiiviga) keha puhul sisu möödaviigu ei tööta ja tipptasemel `system` välja ei vaadata. Plokk lisatakse stringi välja `instructions` teksti järele, välja arvatud juhul, kui see väli juba sisaldab `[OmniRoute Output Styles]` markerit, mille puhul keha jäetakse muutmata kujul `already_applied`. Kui kehal pole stringi `instructions` välja, kuid see kannab `input` (stringi või massiivi), muutub plokist `instructions`, mis asendab selle väljal oleva mittestringi väärtuse. Keha, millel ei ole stringi `instructions` välja ega stringi või massiivi `input` jäetakse muutmata ja jäetakse vahele kui `no_messages`.

#### Kuidas lubada

Juhtpaneelil:** Tihenduskontekst → Tihendusseaded** (`/dashboard/context/settings`), Väljastusstiilide jaotis: üks rida stiili kohta on/off lüliti ja tasemevalijaga. Stiilid sisestatakse siis, kui tihendamine on sisse lülitatud (lehe põhilüliti, `enabled`). The** Automaatse selguse ümbersõit** lüliti on peal** Koopamees** leht (`/dashboard/context/caveman`), selle** Väljundrežiim** kaardile. Programmiliselt säilitab tihendamise konfiguratsioon valiku järgmiselt:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Tagasiühildumine: kui `outputStyles` on tühi, vastendatakse pärandseade `cavemanOutputMode.enabled` väärtusega `terse-prose` at `cavemanOutputMode.intensity`. Seejärel algab plokk `[OmniRoute Output Styles]` markeriga, kuhu pärand `applyCavemanOutputMode()` pihusti kirjutas `[OmniRoute Caveman Output Mode]`. Markeri all olev tekst vastab pärandsüstile en, pt-BR, es, de, fr, it, ru, id ja vi; ja ja zh sisaldab enne piiriklauslit ühte lisatühikut. `terse-prose` tõlgib pt-BR, es, de, fr, it, ru, zh, ja, id ja vi, nii et päring, mille lahendatud keel on `hu` saab ingliskeelse teksti, kus pärandinjektor kasutas ungari keelt.

Output-style language selection (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): with `languageConfig.enabled` on, `autoDetect` samples the latest user message in the request's `messages` array that has text (string content, or the `text` of its content parts) and runs the Caveman engine's detector (`detectCompressionLanguage()`) on it. The detector returns `zh` for text with Han characters and no kana; otherwise it returns whichever of `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` and `id` has the most hint matches, and `en` when none match — text it cannot classify gets English, never `defaultLanguage`, and `vi` is never detected although the styles ship `vi` text. A Responses API body keeps its turns in `input`, which is not sampled, so it gets `defaultLanguage`, then English. When no user message in `messages` has text, or with `autoDetect` off, `defaultLanguage` applies, then English. With `languageConfig.enabled` off, the language is English — unless a compression combo applies to the request (a combo assigned to the request's routing combo, or the default compression combo chatCore falls back to for the built-in stacked pipeline): applying a combo turns `languageConfig.enabled` on for that request and sets `defaultLanguage` from the combo's language packs (the saved value if it is one of the combo's packs, otherwise the combo's first pack, which defaults to `en`), while the saved `autoDetect` (on by default) still applies. The Caveman input engine picks its rule-pack language differently — per text part and, with auto-detect off, gated on `enabledPacks`.

Stiili × keelemaatriksi kinnitab `tests/unit/compression/output-styles-i18n-matrix.test.ts`: iga kataloogi stiil vajab kirjet testi `BASELINE_LANGUAGES`; stiil, mis ei ole lokaadiga piiratud, peab saatma pt-BR tõlke (lokaadiga `terse-cjk` on sellest reeglist vabastatud), välja arvatud juhul, kui see on loetletud kaustas `KNOWN_ENGLISH_ONLY`, mis võib sisaldada ainult stiile, millel pole üldse tõlkeid — loetletud stiil, millel on tõlge, läbib testi; ja stiil ebaõnnestub testis, kui ta kaotab keele, mille selle `BASELINE_LANGUAGES` kirjes on loetletud. Stiili lisamiseks vaadake [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Tööriista tulemuse tihendamine

`compressToolResult()` `open-sse/services/compression/toolResultCompressor.ts` -s tihendab tööriista-tulemuse teksti koos** 5 strateegiat** . See proovib neid selles järjekorras ja esimene lubatud strateegia, mille kontroll vastab sisule, otsustab tulemuse:

1. **`fileContent`** : 3 või enama rea sisu, milles vähemalt üks rida algab eesmist taanet eirates sõnadega `import `, `export `, `function `, `class `, `const `, `let `, `var ` või `return ` (märksõna pluss tühik) või selle `if`, `for` või `while` või järgneb `(` ` (` või viimased 5 rida, tähistatud keskosaga.
2. **`grepSearch`** : sisu, millel on vähemalt üks rida kujul `<path>:<digits>:`, kus tekstis enne esimest koolonit ei ole tühikuid, säilitatakse ainult need read, maksimaalselt 30, millele järgneb edasiste vastete arv ja sobitatud failide loend; iga teine rida langeb ära. Strateegia käivitamiseks piisab ühest sellisest reast, seega läheb arvesse ka ajatempliga (nt `12:30:45` algav logirida.
3. **`shellOutput`** : väljund, mis sisaldab ANSI CSI jada (`ESC[` siis numbrid või semikoolonid ja täht, nagu värvikoodides) või `$` millele järgneb tühik kõikjal tekstis, kaotab need jadad (muud paoklahvid, nagu `ESC[?25l` või OSC aknapealkirjade jada, jäetakse alles) ja säilitab oma viimased 50 järjestikust rida. Kuna see kontroll jookseb enne `json` ja `errorMessage`, JSON või veaväljund, mis sisaldab sellist `$` ei jõua kunagi nendeni, kui `shellOutput` on sisse lülitatud.
4. **`json`** : üle 2000 tähemärgiga JSON kasulik koormus, mis algab tähega `{` või `[` (pärast valikulist tühikut) ja sõelub, tehakse kokkuvõtlikult: rohkem kui 7 üksusest koosnev massiiv säilitab oma esimesed 5 ja 2 viimast üksust ja koguarvu ning objekt säilitab oma esimesed 20 võtit, kusjuures iga massiivi pikkus on asendatud pesastatud objekti või massiivi väärtusega. ja `{…N keys}` `_remaining_<N>_keys` marker, mis loeb esimesest 20-st kaugemale langenud võtmeid. Skalaarväärtused kopeeritakse tervikuna, nii et 20 või vähema võtmega objekt, millel pole pesastatud väärtusi, taandatakse ainult uuesti. — minimeeritud üks lisab märke ja jääb muutumatuks.
5. **`errorMessage`** : väljund, mis sisaldab kõikjal ja mis tahes tähtedega `error:`, `error ` (sõna, millele järgneb tühik, nagu `no error found`), `[error]`, `exception:`, `exception `, `[exception]` või `traceback` säilitab oma esimese rea, järgmised 10 rida ja viimased 3, nende vahel on `… [N frames elided] …` marker. Marker ilmub ainult siis, kui esimesele reale järgneb rohkem kui 13 rida, seega 14 või vähema rea veaväljundit ei lühendata (12 või 13 rea juures on viimased 3 kordusrida juba alles).

Pärast strateegia vasteid, isegi sellist, mis ei päästa midagi, hilisemaid strateegiaid ei proovita. Kui sobitamisstrateegia ei salvesta hinnangulisi märke (pikkus ÷ 4, ümardatuna) — näiteks kooditaoline fail, milles on 25 rida või vähem, või JSON massiiv, mis on üle 2000 tähemärgi 7 või vähema elemendiga — `compressToolResult()` agressiivne mootor algse tööriista tulemuse: nii helistajad kui ka `compressAggressive()` kui `compressAnthropicToolResultBlock()` allpool, samas kui `saved` ise tagastab endiselt selle strateegia väljundi. Tööriista-tulemuse samm ei ole viimane sõna: mootori varukokkuvõte võib siiski lühendada `tool` või `function` sõnumit, mis on pikem kui 8192 tähemärki (`maxTokensPerMessage`, 2048, korda 4).

#### Millal kasutada

Tööriista tulemuse tihendamine on agressiivse mootori 1. samm (`compressAggressive()` in `open-sse/services/compression/aggressive.ts`), seega töötab see agressiivses režiimis ja virnastatud konveieri `aggressive` etapis. See tihendab OpenAI-kujulisi `tool` ja `function` sõnumeid ning Anthropic `tool_result` plokkides oleva teksti. Igal strateegial on `aggressive.toolStrategies` all oma lüliti, mis kõik on vaikimisi sisse lülitatud. Armatuurlaual asuvad lülitid Cavemani lehel** Täiustatud** kuva, kui tihendamine on sisse lülitatud ja vaikerežiim on Agressiivne.

### Virnastatud torujuhe

Virnastatud režiim töötab** mitu mootorit järjest** — tavaliselt RTK esmalt (60-90% kokkuhoid tööriista väljundilt), seejärel Caveman ülejäänud tekstil (~ 46% sisendi kokkuhoid). Koostatud, see on** 78–95% sobilik vahemik** (vt ülalpool ülesvoolu säästmise matemaatikat): `1 - (1 - 0.60..0.90) × (1 - 0.46)` keskmine ≈ 89%.

#### Kuidas see toimib

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Millal kasutada

Kasutage virnastatud režiimi:

- Tööriistamahukad töövood (agendi kodeerimine, uurimine)
- Kulutundlik partii töötlemine
- Kui vajate maksimaalset märgisäästu

Virnastatud konveierid konfigureeritakse globaalse `stackedPipeline` tihendussätete või marsruutimise kombinatsioonile määratud nimega tihenduskombo kaudu (vt ülalpool Kombo-ülesannet) — mitte automaatse kombineeritud `modePack` kaudu (see väli kaalub ainult automaatse kombineeritud mudeli valikut ja `stacked` ei ole kehtiv paketi nimi).

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
