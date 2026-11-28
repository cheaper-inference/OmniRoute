# 🗜️ Prompt Compression Guide — OmniRoute (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Samodejno prihranite 15–95 % pri primernem kontekstu. Za hiter pregled si oglejte [razdelek o stiskanju v datoteki README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pregled

OmniRoute uporablja modularni cevovod za stiskanje pozivov, ki se izvede **proaktivno**, preden zahteve dosežejo ponudnike višje ravni. To pomeni, da se prihranek žetonov doseže pregledno — vašega poteka dela ni treba spreminjati.

```
Zahteva odjemalca
  → Izbirnik strategije stiskanja
    → Preglasitev s kombinacijo? → Uporabi nastavitev kombinacije
    → Prag samodejnega sproženja? → Uporabi samodejni način
    → Privzeti način? → Uporabi globalno nastavitev
    → Off? → Preskoči stiskanje
  → Izbrani način stiskanja
    → Off: Brez stiskanja
    → Lite: Varno čiščenje presledkov/oblikovanja (~15 %)
    → Standard: Odstranjevanje mašil v slogu Caveman (~30 %)
    → Aggressive: Staranje zgodovine + povzemanje (~50 %)
    → Ultra: Hevristično obrezovanje + redčenje blokov kode (~75 %)
    → RTK: Filtriranje terminalskih/izhodnih podatkov orodij z upoštevanjem ukazov (60–90 % pri ponudniku višje ravni)
    → Stacked: Urejen cevovod z več mehanizmi, običajno RTK in nato Caveman (78–95 % primernega obsega)
  → Stisnjena zahteva → Ponudnik
```

---

## Načini stiskanja

### Izklopljeno

Stiskanje se ne uporablja. Vsa sporočila se posredujejo nespremenjena.

### Način Lite (~15 % prihranka, <1 ms zakasnitve)

Najvarnejši način — čiščenje oblikovanja. Njegovo krajšanje rezultatov orodij povzroča izgubo podatkov, zato privzeta pot
(brez opt-in možnosti `allow-lossy`, `engine:lite` ali imenovane kombinacije) uporablja način Lite z
`compressToolResults: false`: prejšnji rezultati orodij dosežejo ponudnika nespremenjeni.

| Tehnika                  | Opis                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `collapseWhitespace`     | Združi zaporedne prazne vrstice in končne presledke                                  |
| `dedupSystemPrompt`      | Odstrani podvojena sistemska sporočila                                               |
| `compressToolResults`    | Skrajša prejšnje rezultate orodij na omejitev Lite (z izgubo: samo z opt-in zahtevo) |
| `removeRedundantContent` | Odstrani ponavljajoča se navodila                                                    |
| `replaceImageUrls`       | Skrajša podatkovne URI-je slik v base64                                              |

**Najprimernejše za:** Vedno vključeno uporabo in delovne tokove, pri katerih je varnost ključnega pomena.

### Standardni način (~30 % prihranka)

Navdihnjen z [Caveman](https://github.com/JuliusBrussee/caveman) — odstrani mašila in besedno obsežne formulacije, pri tem pa ohrani pomen:

- Odstrani mašila (»please«, »I think«, »basically«, »actually«)
- Zgošča obsežne besedne zveze (»in order to« → »to«, »as a result of« → »because«)
- Odstrani vljudnostno omahovanje (»Would you mind...«, »If you could possibly...«)
- Več kot 30 pravil regex, prilagojenih programerskim pozivom

**Najprimernejše za:** Vsakodnevne programerske delovne tokove in ekipe, ki skrbijo za stroške.

### Agresivni način (~50 % prihranka)

Pametno upravljanje zgodovine za dolge seje:

- **Staranje sporočil** — starejša sporočila se postopoma bolj stiskajo
- **Stiskanje rezultatov orodij** — dolgi izhodi orodij se skrajšajo ali izpustijo (prve/zadnje vrstice,
  filtriranje po ujemajočih se vrsticah, zgoščanje ključev JSON)
- **Varovala strukturne celovitosti** — zagotavljajo, da pari `tool_use` + `tool_result` ostanejo skladni
- **Zavedanje kontekstnega okna** — upošteva omejitve žetonov posameznega modela

**Najprimernejše za:** Daljše seje odpravljanja napak in velike kodne zbirke.

### Ultra način (~75 % prihranka)

Največje stiskanje za scenarije, pri katerih so žetoni ključnega pomena:

- **Hevristično obrezovanje** — obrezovanje proze po žetonih na podlagi točk
- **Ohranjanje strukture** — ograjeni bloki kode, vstavljena koda, URL-ji in identifikatorji so označeni in znova vstavljeni dobesedno ter niso nikoli obrezani
- **Izbirna raven SLM** — majhen lokalni model lahko izboljša obrezovanje, ko je konfiguriran
- Neodvisno od agresivnega načina: ne izvaja staranja sporočil, stiskanja rezultatov orodij ali rezervnega povzemalnika (samo napaka ravni SLM lahko preusmeri rezervni prehod skozi agresivni način)

**Najprimernejše za:** Primere, ko večkrat dosežete omejitve konteksta.

### Način RTK (60–90 % obsega upstream)

Način RTK je optimiziran za obsežne izhode orodij, ki se pojavljajo v sejah s programerskimi agenti:

- Zazna razrede ukazov/izhodov, kot so `git status`, `git diff`, `git log`, izvajalniki testov,
  gradnje TypeScript/Vite/Webpack, ESLint/Biome/Prettier, revizije/namestitve npm, dnevniki Dockerja, izhod infrastrukture in generični izhod lupine
- Uporablja pakete filtrov JSON iz `open-sse/services/compression/engines/rtk/filters/`
- Uvaža filtre sheme RTK TOML v1 iz projektnih ali globalnih datotek `filters.toml`, z validacijo vgrajenih testov
  in preverjanjem zaupanja za projektne datoteke
- Vključuje 56 vgrajenih filtrov z vzorci za vgrajeno preverjanje
- Odstrani nadzorna zaporedja ANSI, vrstice napredka, ponovljene vrstice in neuporaben šum
- Ohrani napake, opozorila, spremenjene datoteke, povzetke in konec dolgih izhodov
- Podpira projektne filtre, zaščitene s preverjanjem zaupanja, globalne filtre in izbirno obnovitev neobdelanega izhoda po odstranitvi občutljivih podatkov

**Najprimernejše za:** Seje agentov z dnevniki lupine, gradnje, teste, git, grep in prepise izhodov datotek.

### Zloženi način (78–95 % razpoložljivega obsega)

Zloženi način izvaja več mehanizmov stiskanja v determinističnem vrstnem redu. Privzeti cevovod je:

```txt
RTK -> Caveman
```

Ta vrstni red najprej zgošči izhod terminala/orodja, nato pa uporabi semantično zgoščanje Caveman za
preostali poziv v naravnem jeziku. Zložene cevovode je mogoče konfigurirati globalno ali prek kombinacij stiskanja, dodeljenih usmerjevalnim kombinacijam.

**Najprimernejše za:** Mešani kontekst z obsežnimi dnevniki orodij ter človeškimi navodili ali povzetki pomočnika.

## Izračun prihrankov na podlagi izvornih projektov

OmniRoute dokumentira prihranke zaradi stiskanja iz dveh virov: primerjalnih preizkusov izvornih projektov in
lastne sestave pogonov OmniRoute.

| Vir     | Številka iz izvornega README-ja, uporabljena tukaj                                                                                              |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` manj izhodnih žetonov, `65%` povprečnega prihranka izhoda v primerjalnih preizkusih, razpon `22-87%` in orodje za `~46%` stiskanje vhoda |
| RTK     | `60-90%` prihranka pri izhodu ukazov; vzorčna seja z `~118,000 -> ~23,900` žetoni oziroma `79.7%` prihranka (`~80%`)                            |

Za prekrivajoče se vsebine orodij/konteksta privzeta kombinacija OmniRoute združuje pogona:

```txt
RTK -> Caveman
```

Skupni prihranki so multiplikativni in ne aditivni:

```txt
skupaj   = 1 - (1 - prihranek RTK) * (1 - prihranek vhoda Caveman)
povprečje = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
razpon    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Ta vrednost `78-95%` velja, kadar lahko tako RTK kot Caveman zmanjšata isto vhodno/kontekstno vsebino.
Način izhoda odgovorov Caveman je ločen: ko je omogočen, uporabite Cavemanove lastne prihranke izhoda (`65%`
v povprečju, `~75%` kot glavna navedba, razpon `22-87%`). Skupni prihranki pri obračunavanju so odvisni od razmerja med pozivi in izhodi.

### Kaj dejansko pomeni »primerno«

Glavni navedeni razpon 15-95% je resničen, vendar velja samo za **odvečno ali razvlečeno** vsebino — ponavljajoče se
vrstice napak, dnevnik gradnje, ki nenehno izpisuje isto opozorilo, ali preobsežen izpis `grep`/branja datoteke. To
**ne** pomeni, da vsaka zahteva prihrani toliko.

Empirično preverjeno (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): izvajanje
`stacked` (RTK + Caveman) nad blokom `tool_result` v obliki Anthropic, ki vsebuje 300 enakih
vrstic napak, je doseglo **95.93% prihranka žetonov / 96.26% prihranka znakov** — povsem znotraj oglaševanega
razpona. Toda isti cevovod pri običajnem, neodvečnem izhodu orodja (čistem seznamu zadetkov `grep`,
kratkem branju datoteke, običajnem pogovornem besedilu) pravilno doseže **skoraj ničelne prihranke**, ker
ni ponavljajoče se vsebine, ki bi jo bilo mogoče odstraniti, `validateCompression()` (`validation.ts`) pa zavrne posredovanje
predelane vsebine, ki bi izpustila ali spremenila bloke kode, URL-je, naslove, različice ali identifikatorje konstant, zapisane VELIKIMI ČRKAMI.

To je pričakovano in varno vedenje, ne napaka: seja programiranja, ki večinoma bere/preiskuje čiste datoteke,
bo dosegla skromne skupne prihranke tudi ob popolnoma omogočenem stiskanju, medtem ko bo seja, ki naleti na neuspešno
zanko ali zelo zgovoren linter, za ta promet dosegla celoten razpon 78-95%. Nizkega skupnega odstotka prihranka ene same seje
ne uporabljajte kot dokaz, da je stiskanje napačno konfigurirano — najprej preverite, ali je bil
osnovni izhod orodja dejansko odvečen.

---

## Vizualizacija prihranka žetonov

```
Brez stiskanja:       47K žetonov poslanih LLM-u
Z Lite:               40K žetonov poslanih          (15% prihranka — varno, vedno vklopljeno)
S Standard:           33K žetonov poslanih          (30% prihranka — pravila caveman-speak)
Z Aggressive:         24K žetonov poslanih          (50% prihranka — staranje + povzemanje)
Z Ultra:              12K žetonov poslanih          (75% prihranka — hevristično obrezovanje)
Z RTK:                19K-5K žetonov poslanih       (60-90% prihranka pri izhodu ukazov/orodij)
S Stacked:            10K-2.5K žetonov poslanih     (78-95% razpon RTK+Caveman za primerno vsebino)
```

---

## Konfiguracija

### Nadzorna plošča

Pomaknite se na `Dashboard → Context & Cache`:

- **Caveman** — izbira načina, jezikovni paketi, predogled in globalne privzete nastavitve
- **RTK** — predogled filtrov ukazov, varnostne nastavitve RTK in katalog filtrov
- **Compression Combos** — poimenovani cevovodi mehanizmov, dodeljeni usmerjevalnim kombinacijam
- **Auto-Trigger Threshold** — samodejno vključi stiskanje, ko število žetonov preseže prag

### Prepis na ravni kombinacije

V razdelku `Dashboard → Context & Cache → Compression Combos` dodelite kombinacijo stiskanja
usmerjevalni kombinaciji:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Tako lahko uporabljate večstopenjsko stiskanje pri brezplačnih ponudnikih in ponudnikih za
programiranje, medtem ko pri plačljivih naročninah ohranite lahki način.

Ta dodelitev »Per-Combo Override« je drugačen kontrolnik od prepisa **compression
mode** usmerjevalne kombinacije (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — shema
polja sprejema tudi `rtk`, `stacked` in `omniglyph`) — ta prepis ne izbere poimenovanega cevovoda
kombinacije stiskanja; nastavi le polje `compressionMode`, ki ga upošteva
`resolveCompressionPlan`. Nastavite ga lahko na kartici kombinacije (`Dashboard → Combos`) ali od
različice #6760 naprej za posamezno usmerjevalno kombinacijo na seznamu »Assign to routing« v
`Dashboard → Context & Cache → Compression Combos`, neposredno ob potrditvenem polju za dodelitev
cevovoda, opisanem zgoraj. Obe mesti shranjujeta podatke prek iste končne točke
`PUT /api/combos/{id}`.

### Prepis na ravni zahteve

Pošljite glavo zahteve `x-omniroute-compression`, da prepišete načrt stiskanja za eno samo
zahtevo. Ta ima najvišjo prednost — preglasi prepis usmerjevalne kombinacije, aktivni profil,
samodejni sprožilec in privzeto vrednost na plošči. Neznane vrednosti se prezrejo (zahteva ni nikoli
zavrnjena), globalno glavno stikalo pa še vedno nadzoruje vse: ko je stiskanje globalno izklopljeno,
ga glava ne more vklopiti. Vrednosti:

| Vrednost      | Učinek                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| `off`         | Za to zahtevo ni stiskanja.                                                                                        |
| `default`     | Profil Default, izpeljan iz plošče (prezre aktivni profil). Mehanizmi z izgubami ostanejo izklopljeni.             |
| `safe`        | Enako kot če glavo izpustite.                                                                                      |
| `allow-lossy` | Ohrani operaterski načrt te zahteve, vključno s povzetki, filtri ustreznosti in preoblikovanji sloga.              |
| `engine:<id>` | En sam mehanizem, ko je omogočen, npr. `engine:rtk`. To je izrecna vključitev tega mehanizma za posamezno zahtevo. |
| `<combo>`     | Poimenovana kombinacija, najprej ujemanje po imenu (brez razlikovanja velikih in malih črk), nato po ID-ju.        |

Brez `allow-lossy`, `engine:<id>` ali poimenovane kombinacije se mehanizmi z izgubami ne uporabijo.
Ko se privzeti način z izgubami, samodejni sprožilec ali prepis usmerjanja zniža, OmniRoute
ohrani prepoznane korake brez izgub iz konfiguriranega večstopenjskega cevovoda v konfiguriranem
vrstnem redu. Na `session-dedup → lite` se vrne le, če noben konfiguriran korak brez izgub ne
preživi.

Predogled **Effective pipeline** na plošči Settings prikazuje običajni načrt v mirovanju. Ko se
lahko zažene samodejni sprožilec, isti predogled prikaže tudi njegov pogojni učinkoviti cevovod,
tako da ostaneta razreševanje na plošči in razreševanje izvajalnega okolja brez glave usklajena.

Uporabljeni načrt je vrnjen v odzivni glavi
`X-OmniRoute-Compression: <mode>; source=<source>`, kjer je `<source>` ena od vrednosti
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` ali `off`.

### API

```bash
# Pridobi nastavitve stiskanja
curl http://localhost:20128/api/settings/compression

# Posodobi nastavitve stiskanja
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Predogled določenega RTK/stacked tovora
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Izpiši pakete filtrov RTK
curl http://localhost:20128/api/context/rtk/filters

# Neposredno preizkusi RTK z neobveznimi metapodatki ukaza
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Kaj je zaščiteno

Mehanizem za stiskanje **vedno ohrani:**

- ✅ Bloke kode (ograjene in vrstične)
- ✅ URL-je in poti datotek
- ✅ Strukture JSON in strukturirane podatke
- ✅ Identifikatorje in zaščitene tehnične žetone
- ✅ Matematične izraze
- ✅ Definicije klicev orodij/funkcij
- ✅ Sistemske pozive (v lahkem načinu)

Obnovitev neobdelanega izhoda RTK zakrije običajne ključe API, žetone bearer, žetone Slack, ključe za dostop AWS,
gesla, žetone in skrivnosti, preden se kar koli trajno shrani.

---

## Statistika stiskanja

Vsaka stisnjena zahteva vključuje statistiko v dnevnikih strežnika:

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

## Načrt faz

| Faza    | Načini                                                                                                                                                                      | Stanje    |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Faza 1  | Izklopljeno, lahko                                                                                                                                                          | ✅ Izdano |
| Faza 2  | Standardno, agresivno, ultra                                                                                                                                                | ✅ Izdano |
| Faza 3  | RTK, sestavljeno, kombinacije stiskanja                                                                                                                                     | ✅ Izdano |
| Faza 4  | Slogi izhoda, ultra na ravni SLM, ogrodje za vrednotenje                                                                                                                    | ✅ Izdano |
| Faza 4C | Prilagodljiv proračun konteksta (»gumb«) — računski mehanizem + API (`contextBudget` na `PUT /api/settings/compression`) + kontrolniki načina/pravilnika na nadzorni plošči | ✅ Izdano |

---

## Zahvale

Pravila stiskanja v standardnem načinu se zgledujejo po projektu **[Caveman](https://github.com/JuliusBrussee/caveman)** avtorja **[Juliusa Brusseeja](https://github.com/JuliusBrussee)** (⭐ 51K+) — viralnem projektu »zakaj uporabiti veliko žeton, ko malo žeton naredi trik«. Caveman poroča o `~75%` manj izhodnih žetonih, povprečnem `65%` prihranku izhoda v primerjalnih preizkusih, razponu izhoda `22-87%` in orodju za stiskanje vhoda z `~46%` prihrankom.

Način RTK se zgleduje po projektu **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** organizacije **[RTK AI](https://github.com/rtk-ai)** — visoko zmogljivem projektu za stiskanje izhoda ukazov pri filtriranju izhoda terminala, gradnje, preizkusov, sistema git in orodij. RTK poroča o `60-90%` prihrankih, pri čemer vzorčna seja v njegovi datoteki README prikazuje `~80%` prihranka.

---

## Napredni kompresijski sistemi

Poleg 7 zgoraj opisanih načinov (vir sprejema tudi načina `codex-responses` in `omniglyph`, ki ju ta priročnik ne pokriva), spodnji razdelki pokrivajo funkcije, ki delujejo znotraj ali poleg teh načinov: Stiskanje rezultatov orodja in progresivno staranje sta koraka 1 in 2 agresivnega mehanizma (agresivni način in korak `aggressive` zloženega cevovoda), skladni cevovod deluje način skladnega načina, Cache-Aware Stiskanje zniža `aggressive` in `ultra` na `standard` za ponudnike predpomnjenja, medtem ko je stiskanje vklopljeno, Caveman Output Mode in Output Styles pa sta izbirna navodila sistemskega poziva, privzeto izklopljena, ki oblikujejo izhod modela namesto stiskanja zahteve.

### Stiskanje, ki upošteva predpomnilnik

Nekateri ponudniki (na primer Anthropic s hitrim predpomnjenjem) podpirajo** hitro predpomnjenje** , ki jim omogoča, da predpomnijo dele poziva, da zmanjšajo stroške in zakasnitev. Ko je omogočeno predpomnjenje, lahko agresivno stiskanje dejansko** poškodovati** zmogljivosti, ker spremeni predpomnjene žetone in razveljavi predpomnilnik.

Modul `cachingAware.ts` to rešuje tako, da** zaznavanje konteksta predpomnjenja** in** prilagajanje strategije stiskanja** temu primerno.

#### Kako deluje

1. **Zaznaj kontekst predpomnjenja** — Preišče telo zahteve za oznake `cache_control`
2. **Določite ponudnike predpomnjenja** — Preveri, ali ciljni ponudnik podpira predpomnjenje
3. **Prilagodite strategijo** — Zniža `aggressive`/`ultra` na `standard` za ponudnike predpomnjenja
4. **Preskoči sistemski poziv** — Sistemski pozivi so običajno predpomnjeni, zato jih ne stiskajte

Pomočnik za strategijo vrne tudi zastavico `deterministicOnly`, vendar graditelj načrta porabi samo strategijo — nič nižjega toka danes ne bere zastavice.

#### Primer kode

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

#### Kdaj uporabiti

Stiskanje, ki upošteva predpomnilnik, je** vedno vklopljeno** — konfiguracija ni potrebna. Zažene se vsakič, ko je vklopljeno stiskanje in ciljni ponudnik podpira hitro predpomnjenje (Anthropic, OpenAI itd.); eksplicitni označevalci `cache_control` niso potrebni — ponudnik predpomnjenja sam sproži znižanje, označevalci sami pa nikoli (zaznavanje označevalcev posreduje telemetrijo predpomnilnika, ne odločitev o strategiji).

OpenRouter šteje kot ponudnik predpomnjenja samo za modele `anthropic/*` : zahteve kode Claude ohranijo svoje prekinitvene točke `cache_control` (največ 4) in varovalo ščiti predpono, medtem ko vsaka druga družina OpenRouter (`openai/`, `google/`, `qwen/`, …) ostane odstranjena in nezaščitena.

### Progresivno staranje

V dolgih pogovorih se kopiči veliko obratov sporočil, vendar starejši postanejo manj pomembni. Modul `progressiveAging.ts`** razgradi sporočila glede na razdaljo zavoja** (razdalja merjena od konca pogovora). S poslanimi privzetimi nastavitvami (`verbatim: 2, light: 2, moderate: 3`):

- **Zadnja 2 zavoja (razdalja ≤ 2)** : Ohranjeno dobesedno
- **Razdalja 3** : kompresija Caveman (odstranitev polnila)
- **Razdalja 4 +** : sporočila pomočnika povzeta; uporabniška sporočila zmanjšana na prvo vrstico, omejena na 120 znakov; druge vloge nedotaknjene. Sistemski pozivi, že starana sporočila in najnovejše uporabniško sporočilo se vedno hranijo dobesedno, ne glede na razdaljo. Nič ni takoj opuščeno in pas `light` je nedosegljiv s poslanimi privzetimi vrednostmi (`light` je enako `verbatim`).

#### Primer kode

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

#### Kdaj uporabiti

Progresivno staranje je** vedno vklopljeno** za način `aggressive` — je to 2. korak `compressAggressive()`. Način Ultra ga ne zažene. Še posebej je učinkovit za:

- Dolgotrajne seje kodiranja
- Večdnevni pogovori
- Agentski delovni tokovi s številnimi klici orodij

### Izhodni način Caveman

Dodaja izhodni način Caveman** sistemska navodila** ki od samega modela zahtevajo jedrnat izpis — raven `lite` zahteva jedrnate odgovore, ki ohranjajo polne stavke, `full` od njega zahteva, da se "odzove jedrnato kot pametni jamski človek", `ultra` pa zahteva telegrafski izpis; navodila samo vprašajo, ne morejo zagotoviti. Zahteve jih prejme prek `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` najprej razreši izbor s podstavkom za povratno združljivost (`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`), ki, medtem ko je `outputStyles` prazen, preslika omogočen `cavemanOutputMode` v izhodni slog `terse-prose` pri `cavemanOutputMode.intensity` (glejte Spodaj za nazaj); neprazen izbor `outputStyles` se uporabi kot je, `cavemanOutputMode.enabled` in `intensity` pa potem nimata učinka, medtem ko njegov preklop `autoClarity` še vedno velja. `outputMode.ts` vsebuje besedila navodil (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), obvod vsebine in pomočnik za umestitev, ki ga uporablja vbrizgavanje; lasten injektor `applyCavemanOutputMode()` nima produkcijskega klicatelja.

#### Kako deluje

Ta način ne stisne vnosa. Sistemskemu pozivu doda blok navodil (glejte Kako deluje vbrizgavanje spodaj) in kateri koli način stiskanja vnosa, izbran za zahtevo, se zatem še vedno izvaja v telesu, ki zdaj nosi blok. Pred klavzulo o skupnih mejah, s katero se konča vsaka stopnja, se angleška raven `full` glasi:

> "Odgovorite jedrnato kot pametni jamski človek. Izpustite članke (a/an/the), polnilo (just/really/basically/actually/simply), prijetnosti, varovanje pred tveganjem. Fragmenti OK. Kratke sopomenke (velike, ne obsežne, popravite, ne implementirajte). Naj bodo vse tehnične vsebine, koda, napake, URLs, identifikatorji točni."

To še posebej dobro deluje za:

- Generiranje kode (terser izhod = manj žetonov)
- Hitra vprašanja in odgovori (ni potrebe po podrobnih razlagah)
- Paketna obdelava (povečanje prepustnosti)

#### Kdaj uporabiti

Izhodni način Caveman je** privolitev** . Ko je stiskanje vklopljeno (`enabled: true`, glavni preklopnik na strani z nastavitvami stiskanja), ga vklopite z `cavemanOutputMode.enabled`; `intensity` izbere `lite`, `full` ali `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kompresijska kombinacija** Izhodni način** preklop (`outputMode`, nivo v `outputModeIntensity`) nastavi isto stikalo za zahteve, za katere velja kombinacija, orodje `omniroute_set_compression_engine` MCP pa ga zapiše prek logičnega argumenta `outputMode`. Neprazen izbor `outputStyles` ima prednost pred tem stikalom. Na nadzorni plošči omogočite** Krasna proza** izhodni slog vstavi isti blok (glejte Izhodni slogi spodaj).

### Izhodni slogi (katalog)

Zgornji izhodni način Caveman je** podedovana pot v enem slogu** . 4. faza ga je posplošila v katalog sestavljivih izhodnih slogov: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Vsak slog je navodilo sistemskega poziva, ki od samega modela zahteva cenejši rezultat; sloge je mogoče omogočiti skupaj in so vstavljeni v kataloškem vrstnem redu.

| Slog                                      | `id`            | Kaj počne                                                                                                                                                                                                                                                           | Jeziki poučevanja                             |
| ----------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Krasna proza                              | `terse-prose`   | Spusti filler/articles/hedging; ohraniti natančnost tehnične vsebine. Enako besedilo kot pri podedovanem načinu izpisa jamskega človeka (navedeno, ne ponovno vtipkano).                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Manj kode                                 | `less-code`     | YAGNI lestvica: najmanjša delovna sprememba, brez nezahtevanih abstrakcij.                                                                                                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Čop (leni starejši razvijalec)            | `ponytail`      | "Najboljša koda je koda, ki ni bila nikoli napisana": ponovna uporaba prepisa >, glavni vzrok simptom >, najkrajša delovna razlika.                                                                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Imam ADHD (najprej dejanje)               | `i-have-adhd`   | Najprej dejanje (command/path/snippet pred prozo), oštevilčeni omejeni koraki, ONE konkreten naslednji korak, brez preamble/recap/closers. Prirejeno iz [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Filter proti umazaniji UI                 | `antislop-ui`   | Vsaka vizualna tehnika mora opraviti preizkus namena (hierarhija, identiteta, berljivost); brez privzetega gradients/glass/glow, omejene palete, brez postavitev predloge. Oba sloga proti popuščanju dodajata mejo brez mrtvih kontrol / brez izdelanih zahtevkov. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kopija proti umazaniji in človeški filter | `antislop-copy` | Posebna kopija (brez pomišljaja em, generičnega CTAs, modnih besed, zapiralcev chatbota, izmišljenih dejstev) in pravila za ljudi: kontrast WCAG AA, vidno ostrenje, doseg tipkovnice, stanja empty/loading/error, preoblikovanje mobilnega telefona.               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| kratko CJK (文言)                         | `terse-cjk`     | odgovor `full`/`ultra` v klasični kitajščini (文言); `lite` zahteva samo kratke odgovore brez funkcijskih besed, prijetnosti ali olepševanja.                                                                                                                       | zh (lokalno omejeno, glejte spodaj)           |

Vsak slog vsebuje tri stopnje intenzivnosti — `lite`, `full`, `ultra` — in vsaka raven se konča s klavzulo o skupnih mejah (`SHARED_BOUNDARIES` in `outputMode.ts`), ki ohranja točne bloke kode, poti datotek, ukaze, napake in URLs. Besedili ravni `terse-prose` in `terse-cjk` dodata identifikatorje na ta seznam.

`terse-cjk` je področno omejena na `zh` na dveh mestih. Stran z nastavitvami stiskanja navaja svojo vrstico le, če je jezik UI nadzorne plošče kitajščina (`zh-CN` ali `zh-TW`), `applyOutputStyles()` pa jo vstavi le, če je razrešeni jezik zahteve (glejte Izbira jezika spodaj) `zh`. Skrivanje vrstice ne počisti shranjene izbire `terse-cjk` : nastavitve API sprejmejo poljuben ID sloga, shranjevanje drugih slogov na strani pa ga ohrani. V času zahteve je preverjanje jezika `applyOutputStyles()` edina področna vrata.

#### Kako deluje injekcija

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) razreši izbor glede na katalog (neznani ID-ji in slogi, ki se ne ujemajo s področnimi nastavitvami, so opuščeni, nikoli napaka; izbor, ki se razreši brez sloga, pusti telo nespremenjeno, preskoči kot `no_styles`), združi izbrana navodila v kataloškem vrstnem redu, doda klavzulo o mejah** enkrat** (plus varnostno klavzulo, `SAFETY_BOUNDARIES` ali njen prevod, ko je izbran `less-code` ali `ponytail` ), in začne blok z enim samim markerjem idempotence (`[OmniRoute Output Styles]`), tako da ponovna uporaba ni potrebna. Ko ima razrešeni jezik (glejte Izbira jezika spodaj) prevod, se namesto angleščine vstavi lokalizirano navodilo.

Pri telesu z nepraznim poljem `messages` se preverjanje idempotence izvaja pred obvodom vsebine: ko je oznaka `[OmniRoute Output Styles]` že v polju `system` na najvišji ravni (niz ali polje bloka vsebine) ali v sistemskem sporočilu z vsebino niza, telo ostane nespremenjeno kot `already_applied` in se ne izvaja preverjanje ključnih besed. V nasprotnem primeru obvod vsebine (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) preveri besedilo zadnjih treh sporočil, ne glede na njihovo vlogo, in preskoči sloge za celoten zavoj, ko se to besedilo ujema z njegovimi ključnimi besedami za varnost, nepreklicno dejanje ali pojasnilo ali zaporedjem, ki je občutljivo na vrstni red: `first`, `then`, `after that`, `before`, `rollback` ali `backup` ki mu znotraj 240 znakov sledi `delete`, `drop`, `migrate`, `deploy` ali `release`. Obvoznica poteka, medtem ko je** Auto-Clarity Bypass** preklop (`cavemanOutputMode.autoClarity`, privzeto vklopljen) je vklopljen; če stikalo izklopite, preskočite preverjanje ključnih besed.

Ko obvod dovoli obrat, `placeSystemInstruction()` (ista datoteka), ki nikoli ne ustvari novega `messages[0]`, postavi blok v prvo od teh, ki jih najde:

1. Vodilno sistemsko sporočilo z vsebino niza: blok je dodan za svojim besedilom.
2. Polje `system` na najvišji ravni: blok je dodan za besedilom niza ali dodan kot nov blok besedila v matriko blokov vsebine.
3. Prvo poznejše sistemsko sporočilo z vsebino niza: blok je dodan za svojim besedilom.
4. Nič od naštetega: blok gre v novo sistemsko sporočilo na koncu `messages`.

Na telesu brez matrike `messages` (ali s praznim) se ne zažene noben obvod vsebine in polje `system` na najvišji ravni ni izvedeno. Blok je pripet za besedilom polja `instructions` niza, razen če to polje že vsebuje oznako `[OmniRoute Output Styles]`, v tem primeru ostane telo nespremenjeno kot `already_applied`. Ko telo nima nizovnega polja `instructions`, ampak nosi `input` (niz ali matriko), blok postane `instructions` in nadomesti vse nenizovne vrednosti, ki jih je imelo to polje. Telo brez polja niza `instructions` niti niza ali polja `input` ostane nespremenjeno in preskočeno kot `no_messages`.

#### Kako omogočiti

Na nadzorni plošči:** Kontekst stiskanja → Nastavitve stiskanja** (`/dashboard/context/settings`), Razdelek za izhodne sloge: ena vrstica na slog s preklopom on/off in izbirnikom ravni. Slogi se vstavijo, medtem ko je samo stiskanje vklopljeno (glavni preklop strani, `enabled`). The** Auto-Clarity Bypass** preklop je na** Jamski človek** stran (`/dashboard/context/caveman`), v svoji** Izhodni način** kartico. Programsko konfiguracija stiskanja ohranja izbiro kot:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: medtem ko je `outputStyles` prazen, se podedovana nastavitev `cavemanOutputMode.enabled` preslika v `terse-prose` pri `cavemanOutputMode.intensity`. Blok se nato začne z oznako `[OmniRoute Output Styles]`, kjer je stari injektor `applyCavemanOutputMode()` napisal `[OmniRoute Caveman Output Mode]`. Pod označevalcem se besedilo ujema s podedovano injekcijo v en, pt-BR, es, de, fr, it, ru, id in vi; v ja in zh ima en dodaten presledek pred klavzulo o mejah. `terse-prose` se prevede v pt-BR, es, de, fr, it, ru, zh, ja, id in vi, tako da zahteva, katere razrešeni jezik je `hu` dobi angleško besedilo, kjer je podedovani injektor uporabil svoje madžarsko.

Izbira jezika izhodnega sloga (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): z vklopljenim `languageConfig.enabled` `autoDetect` vzorči najnovejše uporabniško sporočilo v matriki `messages` zahteve, ki vsebuje besedilo (vsebina niza ali `text` njegovih delov vsebine), in na njem zažene detektor motorja Caveman (`detectCompressionLanguage()`). Detektor vrne `zh` za besedilo z znaki Han in brez kana; drugače vrne tisto od `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` in `id` ki ima največ ujemajočih se namigov, in `en` ko se nobeno ne ujema z besedilom — ki ga ne more razvrstiti, dobi angleščino, nikoli `defaultLanguage` in `vi` ni nikoli zaznan, čeprav slogi pošiljajo besedilo `vi`. Telo odgovorov API se spremeni v `input`, ki ni vzorčeno, zato dobi `defaultLanguage`, nato pa angleščino. Če nobeno uporabniško sporočilo v `messages` nima besedila ali če je `autoDetect` izklopljen, velja `defaultLanguage`, nato pa angleščina. Če `languageConfig.enabled` izklopljen, je jezik angleščina — razen če se za zahtevo uporablja kombinacija stiskanja (kombinacija, dodeljena kombinaciji usmerjanja zahteve, ali privzeta kombinacija stiskanja, na katero se chatCore vrne za vgrajeni zloženi cevovod): uporaba kombinacije vklopi `languageConfig.enabled` za to zahtevo in nastavi `defaultLanguage` iz jezikovnih paketov kombinacije (shranjena vrednost, če je eden od paketi kombinacije, sicer prvi paket kombinacije, ki je privzeto `en`), medtem ko shranjeni `autoDetect` (privzeto vklopljen) še vedno velja. Vnosni mehanizem Caveman izbere svoj jezik paketa pravil drugače — za vsak del besedila in z izklopljenim samodejnim zaznavanjem preklopi na `enabledPacks`.

Jezikovna matrika sloga × je pripeta z `tests/unit/compression/output-styles-i18n-matrix.test.ts`: vsak slog kataloga potrebuje vnos v `BASELINE_LANGUAGES` testa; slog, ki ni omejen na področne nastavitve, mora poslati prevod pt-BR ( `terse-cjk` z lokalnimi nastavitvami je izvzet iz tega pravila), razen če je naveden v `KNOWN_ENGLISH_ONLY`, ki lahko vsebuje samo sloge brez prevodov — naveden slog, ki ima kakršen koli prevod, ne uspe opraviti testa; in slog ne uspe na preizkusu, ko izgubi jezik, ki ga navaja njegov vnos `BASELINE_LANGUAGES`. Če želite dodati slog, glejte [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Stiskanje rezultatov orodja

`compressToolResult()` v `open-sse/services/compression/toolResultCompressor.ts` stisne besedilo rezultata orodja z** 5 strategij** . Preizkuša jih v tem vrstnem redu in prva omogočena strategija, katere preverjanje se ujema z vsebino, odloči o rezultatu:

1. **`fileContent`** : vsebina 3 ali več vrstic, v katerih se vsaj ena vrstica, ne glede na začetni zamik, začne z `import `, `export `, `function `, `class `, `const `, `let `, `var ` ali `return ` (ključna beseda in presledek) ali z `if`, `for` ali `while` ki ji sledi `(` ali ` (`, ohrani svojih prvih 20 in zadnjih 5 vrstic, s prečrtanimi sredina označena.
2. **`grepSearch`** : vsebina z vsaj eno vrstico oblike `<path>:<digits>:`, kjer besedilo pred prvim dvopičjem nima presledkov, hrani samo te vrstice, največ 30, ki jim sledi štetje morebitnih nadaljnjih ujemanj in seznam ujemajočih se datotek; vsaka druga vrstica je izpuščena. Ena taka vrstica zadostuje za sprožitev strategije, zato šteje tudi vrstica dnevnika, ki se začne s časovnim žigom, kot je `12:30:45`.
3. **`shellOutput`** : izhod, ki vsebuje zaporedje ANSI CSI (`ESC[` nato števke ali podpičja in nato črko, kot pri barvnih kodah) ali `$` ki mu sledi presledek kjer koli v besedilu, izgubi ta zaporedja (drugi ubežniki, kot je `ESC[?25l` ali zaporedje naslovov okna OSC, se ohranijo) in obdrži svojih zadnjih 50 vrstic, pri čemer so zaporedne ponovljene vrstice strnjene. Ker se to preverjanje izvaja pred `json` in `errorMessage`, JSON ali izhod napake, ki vsebuje tak `$` nikoli ne doseže, ko je `shellOutput` vklopljen.
4. **`json`** : obremenitev JSON z več kot 2000 znaki, ki se začne z `{` ali `[` (po izbirnem presledku) in razčlenjuje, je povzeto: matrika z več kot 7 elementi obdrži svojih prvih 5 in zadnja 2 elementa ter skupno število, objekt pa ohrani svojih prvih 20 ključev, pri čemer je vsak ugnezdeni predmet ali vrednost matrike nadomeščen z oznako mesta `{…N keys}` (za matriko je N njena dolžina) in a `_remaining_<N>_keys` marker, ki šteje ključe, ki so padli mimo prvih 20. Skalarne vrednosti se kopirajo cele, tako da je objekt z 20 ključi ali manj brez ugnezdenih vrednosti le ponovno zamaknjen — pomanjšan pridobi znake in ostane nespremenjen.
5. **`errorMessage`** : izhod, ki kjer koli in v kateri koli veliki črki vsebuje `error:`, `error ` (beseda, ki ji sledi presledek, kot v `no error found`), `[error]`, `exception:`, `exception `, `[exception]` ali `traceback` ohrani svojo prvo vrstico, naslednjih 10 vrstic in zadnje 3, z oznako `… [N frames elided] …` namesto vrstic med njimi. Oznaka se prikaže le, če prvi vrstici sledi več kot 13 vrstic, tako da se izpis napake 14 vrstic ali manj ne skrajša (pri 12 ali 13 vrsticah se zadnje 3 ponavljajoče se vrstice že ohranijo).

Ko se strategija ujema, tudi tista, ki ne prihrani ničesar, se kasnejše strategije ne preizkušajo. Ko strategija ujemanja ne shrani nobenih ocenjenih žetonov (dolžina ÷ 4, zaokroženo navzgor) — na primer kodi podobna datoteka s 25 vrsticami ali manj, ali polje JSON z več kot 2000 znaki s 7 elementi ali manj — agresivni mehanizem ohrani prvotni rezultat orodja: oba klicatelja (`compressAggressive()` in `compressAnthropicToolResultBlock()`) ohranita izvirnik, ko je `saved` 0 ali manj, medtem ko je `compressToolResult()` sam še vedno vrne rezultat te strategije. Korak rezultata orodja ni zadnja beseda: nadomestni povzemalnik mehanizma lahko še vedno skrajša sporočilo `tool` ali `function` daljše od 8192 znakov (`maxTokensPerMessage`, 2048, krat 4).

#### Kdaj uporabiti

Stiskanje rezultatov orodja je 1. korak agresivnega motorja (`compressAggressive()` in `open-sse/services/compression/aggressive.ts`), zato deluje v agresivnem načinu in v koraku `aggressive` zloženega cevovoda. Stisne sporočila `tool` in `function` v obliki OpenAI in besedilo znotraj blokov Anthropic `tool_result`. Vsaka strategija ima svoje stikalo pod `aggressive.toolStrategies`, vse je privzeto vklopljeno. Na nadzorni plošči so stikala na strani Caveman** Napredno** pogled, medtem ko je stiskanje vklopljeno in je privzeti način agresiven.

### Zloženi cevovod

Zažene se zloženi način** več motorjev zaporedoma** — običajno najprej RTK (60-90 % prihranka pri izpisu orodja), nato Caveman pri preostalem besedilu (~ 46 % prihranka pri vnosu). Sestavljeno, to je** 78–95 % primeren razpon** (glej zgornje matematike varčevanja navzgor): `1 - (1 - 0.60..0.90) × (1 - 0.46)` povprečje ≈ 89 %.

#### Kako deluje

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Kdaj uporabiti

Uporabi zložen način za:

- Poteki dela, obremenjeni z orodji (agentsko kodiranje, raziskave)
- Stroškovno občutljiva paketna obdelava
- Ko potrebujete maksimalen prihranek žetonov

Zloženi cevovodi so konfigurirani z globalno nastavitvijo stiskanja `stackedPipeline` ali prek imenovane kombinacije stiskanja, ki je dodeljena kombinaciji usmerjanja (glejte Zgornja preglasitev posamezne kombinacije) — ne prek samodejne kombinacije `modePack` (to polje samo ponovno uteži izbor modela samodejne kombinacije in `stacked` ni veljavno ime paketa).

---

## Preglasitve stiskanja za posamezne kombinacije

Globalni način stiskanja lahko preglasite **za vsako kombinacijo posebej**, da natančno prilagodite delovanje
različnim primerom uporabe:

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

To je uporabno za:

- **Kombinacije za programiranje**: za dolge seje uporabite način `aggressive`
- **Kombinacije za hitra vprašanja in odgovore**: za hitre odzive uporabite način `lite`
- **Kombinacije z intenzivno uporabo orodij**: za največje prihranke uporabite način `stacked`
- **Produkcijske kombinacije**: za ponudnike s predpomnjenjem pustite preglasitev izklopljeno — vedno omogočena
  prilagoditev, ki upošteva predpomnilnik, samodejno zniža `aggressive`/`ultra` na `standard`
  (načina `cache-aware` ni mogoče izbrati)

---

## Glejte tudi

- [Konfiguracija okolja](../reference/ENVIRONMENT.md) — Okoljske spremenljivke za stiskanje
- [Vodnik po arhitekturi](../architecture/ARCHITECTURE.md) — Notranje delovanje cevovoda za stiskanje
- [Uporabniški vodnik](../guides/USER_GUIDE.md) — Uvod v uporabo stiskanja
- [Stiskanje RTK](./RTK_COMPRESSION.md) — Filtri RTK, model zaupanja, preveritvena pregrada in obnovitev neobdelanega izhoda
- [Mehanizmi za stiskanje](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API-ji, MCP in nadzorna plošča
- [Oblika pravil za stiskanje](./COMPRESSION_RULES_FORMAT.md) — Oblika paketov pravil JSON
- [Jezikovni paketi za stiskanje](./COMPRESSION_LANGUAGE_PACKS.md) — Jezikovno specifična pravila Caveman
